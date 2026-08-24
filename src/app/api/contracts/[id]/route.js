import { NextResponse } from "next/server";
import { 
  getDocData, updateDocData, deleteDocData, setSubcollectionDoc, getSubcollectionDocs 
} from "@/utils/dbHelper";
import { DEFAULT_CLAUSES, compileContractBody } from "@/utils/contractHelper";

export async function GET(request, context) {
  try {
    const params = await context.params;
    const { id } = params;

    const contractData = await getDocData("contracts", id);
    if (!contractData) {
      return NextResponse.json({ success: false, error: "Contract not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, contract: { id, ...contractData } });
  } catch (error) {
    console.error("GET contract error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
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
      expirationDays, customExpirationDate, status,
      location, autoRenewal, services, clauses,
      termCommitmentText, paymentTermsText, clientResponsibilitiesText,
      confidentialityTerminationText, governingLawText
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

    const currentClauses = clauses !== undefined 
      ? clauses 
      : (contractData.clauses && Array.isArray(contractData.clauses) && contractData.clauses.length > 0
          ? contractData.clauses
          : DEFAULT_CLAUSES);

    let parsedContractDate = contractData.contractDate ? (contractData.contractDate.toDate ? contractData.contractDate.toDate() : new Date(contractData.contractDate)) : new Date();
    if (contractDate) {
      if (typeof contractDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(contractDate.trim())) {
        const [y, m, d] = contractDate.trim().split("-");
        parsedContractDate = new Date(Number(y), Number(m) - 1, Number(d), 12, 0, 0);
      } else {
        parsedContractDate = new Date(contractDate);
      }
    }

    let parsedStartDate = contractData.startDate ? (contractData.startDate.toDate ? contractData.startDate.toDate() : new Date(contractData.startDate)) : new Date();
    if (startDate) {
      if (typeof startDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(startDate.trim())) {
        const [y, m, d] = startDate.trim().split("-");
        parsedStartDate = new Date(Number(y), Number(m) - 1, Number(d), 12, 0, 0);
      } else {
        parsedStartDate = new Date(startDate);
      }
    }

    const contentFields = {
      clientName: clientName !== undefined ? clientName : (contractData.clientName || ""),
      companyName: companyName !== undefined ? companyName : (contractData.companyName || ""),
      clientEmail: clientEmail !== undefined ? clientEmail : (contractData.clientEmail || ""),
      clientPhone: clientPhone !== undefined ? clientPhone : (contractData.clientPhone || ""),
      requestedService: requestedService !== undefined ? requestedService : (contractData.requestedService || ""),
      monthlyRetainer: monthlyRetainer !== undefined ? (monthlyRetainer !== null ? String(monthlyRetainer) : "") : (contractData.monthlyRetainer !== undefined && contractData.monthlyRetainer !== null ? String(contractData.monthlyRetainer) : ""),
      termLength: termLength !== undefined ? termLength : (contractData.termLength || "3 Months"),
      paymentTerms: paymentTerms !== undefined ? paymentTerms : (contractData.paymentTerms || "Net 15"),
      location: location !== undefined ? location : (contractData.location || "USA"),
      autoRenewal: autoRenewal !== undefined ? autoRenewal : (contractData.autoRenewal || "Yes, after 3 months"),
      contractDate: parsedContractDate,
      startDate: parsedStartDate,
      endDate: endDate ? new Date(endDate) : (contractData.endDate ? new Date(contractData.endDate) : null),
      notes: notes !== undefined ? notes : (contractData.notes || ""),
      templateBody: templateBody !== undefined ? templateBody : (contractData.templateBody || ""),
      services: services !== undefined ? services : (contractData.services || []),
      clauses: currentClauses,
      termCommitmentText: termCommitmentText !== undefined ? termCommitmentText : (contractData.termCommitmentText || currentClauses[0]?.text || ""),
      paymentTermsText: paymentTermsText !== undefined ? paymentTermsText : (contractData.paymentTermsText || currentClauses[1]?.text || ""),
      clientResponsibilitiesText: clientResponsibilitiesText !== undefined ? clientResponsibilitiesText : (contractData.clientResponsibilitiesText || currentClauses[2]?.text || ""),
      confidentialityTerminationText: confidentialityTerminationText !== undefined ? confidentialityTerminationText : (contractData.confidentialityTerminationText || currentClauses[3]?.text || ""),
      governingLawText: governingLawText !== undefined ? governingLawText : (contractData.governingLawText || currentClauses[4]?.text || "")
    };

    const renderedHtml = compileContractBody(contentFields.templateBody, contentFields);

    const updateData = { ...contentFields, renderedHtml, expiresAt, updatedAt: new Date() };

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
