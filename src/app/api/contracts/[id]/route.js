import { NextResponse } from "next/server";
import { 
  getDocData, updateDocData, deleteDocData, setSubcollectionDoc, getSubcollectionDocs 
} from "@/utils/dbHelper";

function compileContractBody(body, content) {
  let text = body || "";
  
  const formatDate = (val) => {
    if (!val) return "—";
    const d = new Date(val);
    return isNaN(d.getTime()) ? val : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const replacements = {
    "{{client_name}}": content.clientName || "—",
    "{{company_name}}": content.companyName || "—",
    "{{client_email}}": content.clientEmail || "—",
    "{{client_phone}}": content.clientPhone || "—",
    "{{requested_service}}": content.requestedService || "—",
    "{{monthly_retainer}}": content.monthlyRetainer ? `$${content.monthlyRetainer}` : "—",
    "{{term_length}}": content.termLength || "—",
    "{{payment_terms}}": content.paymentTerms || "—",
    "{{contract_date}}": formatDate(content.contractDate),
    "{{start_date}}": formatDate(content.startDate),
    "{{end_date}}": formatDate(content.endDate),
  };

  Object.entries(replacements).forEach(([placeholder, value]) => {
    text = text.split(placeholder).join(value);
  });

  return text;
}

export async function PATCH(request, context) {
  try {
    const params = await context.params;
    const { id } = params;
    const body = await request.json();

    const contractData = await getDocData("contracts", id);
    if (!contractData) {
      return NextResponse.json({ success: false, error: "Contract not found" }, { status: 404 });
    }

    const {
      clientName, companyName, clientEmail, clientPhone,
      requestedService, monthlyRetainer, termLength, paymentTerms,
      contractDate, startDate, endDate, notes, templateBody,
      expirationDays, customExpirationDate, status
    } = body;

    let expiresAt = contractData.expiresAt || null;
    if (expirationDays) {
      if (expirationDays === "none") {
        expiresAt = null;
      } else if (expirationDays !== "custom") {
        const days = parseInt(expirationDays, 10);
        const date = new Date();
        date.setDate(date.getDate() + days);
        expiresAt = date;
      } else if (expirationDays === "custom" && customExpirationDate) {
        expiresAt = new Date(customExpirationDate);
      }
    }

    const contentFields = {
      clientName: clientName !== undefined ? clientName : (contractData.clientName || ""),
      companyName: companyName !== undefined ? companyName : (contractData.companyName || ""),
      clientEmail: clientEmail !== undefined ? clientEmail : (contractData.clientEmail || ""),
      clientPhone: clientPhone !== undefined ? clientPhone : (contractData.clientPhone || ""),
      requestedService: requestedService !== undefined ? requestedService : (contractData.requestedService || ""),
      monthlyRetainer: monthlyRetainer !== undefined ? Number(monthlyRetainer) : (contractData.monthlyRetainer || 0),
      termLength: termLength !== undefined ? termLength : (contractData.termLength || "Month-to-month"),
      paymentTerms: paymentTerms !== undefined ? paymentTerms : (contractData.paymentTerms || "Net 15"),
      contractDate: contractDate ? new Date(contractDate) : (contractData.contractDate ? new Date(contractData.contractDate) : new Date()),
      startDate: startDate ? new Date(startDate) : (contractData.startDate ? new Date(contractData.startDate) : new Date()),
      endDate: endDate ? new Date(endDate) : (contractData.endDate ? new Date(contractData.endDate) : null),
      notes: notes !== undefined ? notes : (contractData.notes || ""),
      templateBody: templateBody !== undefined ? templateBody : (contractData.templateBody || "")
    };

    const renderedHtml = compileContractBody(contentFields.templateBody, contentFields);

    const updateData = { ...contentFields, expiresAt, updatedAt: new Date() };

    if (status && ["draft", "awaiting_review"].includes(status)) {
      updateData.status = status;
    }

    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Unknown";

    const editLog = {
      event: body.isAutoSave ? "Auto Saved" : "Edited",
      timestamp: new Date(),
      ip, userAgent,
      userEmail: "Admin",
      os: "", browser: "",
      meta: { version: contractData.currentVersion }
    };

    await updateDocData("contracts", id, {
      ...updateData,
      auditTrail: [...(contractData.auditTrail || []), editLog]
    });

    const currentVersionStr = String(contractData.currentVersion);
    const versionData = {
      versionNumber: contractData.currentVersion,
      content: contentFields,
      renderedHtml,
      updatedAt: new Date(),
      createdBy: "system",
      createdByName: "Admin"
    };

    await setSubcollectionDoc("contracts", id, "versions", currentVersionStr, versionData);

    return NextResponse.json({ success: true, contract: { id, ...contractData, ...updateData } });
  } catch (error) {
    console.error("PATCH contract error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const params = await context.params;
    const { id } = params;

    const contractData = await getDocData("contracts", id);
    if (!contractData) {
      return NextResponse.json({ success: false, error: "Contract not found" }, { status: 404 });
    }

    const versions = await getSubcollectionDocs("contracts", id, "versions");
    for (const ver of versions) {
      await deleteDocData(`contracts/${id}/versions`, ver.id);
    }

    await deleteDocData("contracts", id);

    return NextResponse.json({ success: true, message: "Contract deleted successfully" });
  } catch (error) {
    console.error("DELETE contract error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
