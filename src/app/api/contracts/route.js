import { NextResponse } from "next/server";
import { queryDocs, addDocData, setSubcollectionDoc, getNextSequenceNumber } from "@/utils/dbHelper";

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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get("leadId");

    if (!leadId) {
      return NextResponse.json({ success: false, error: "Missing leadId parameter" }, { status: 400 });
    }

    const contracts = await queryDocs("contracts", "leadId", "==", leadId);
    
    contracts.sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
      return dateB - dateA;
    });

    return NextResponse.json({ success: true, contracts });
  } catch (error) {
    console.error("GET contracts error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      leadId,
      clientName,
      companyName,
      clientEmail,
      clientPhone,
      requestedService,
      monthlyRetainer,
      termLength,
      paymentTerms,
      templateBody,
      expirationDays,
      customExpirationDate
    } = body;

    if (!leadId) {
      return NextResponse.json({ success: false, error: "Missing leadId" }, { status: 400 });
    }

    const seqNum = await getNextSequenceNumber();
    const year = new Date().getFullYear();
    const contractNumber = `GO-${year}-${String(seqNum).padStart(4, "0")}`;

    let expiresAt = null;
    if (expirationDays && expirationDays !== "none") {
      if (expirationDays === "custom" && customExpirationDate) {
        expiresAt = new Date(customExpirationDate);
      } else {
        const days = parseInt(expirationDays, 10);
        const date = new Date();
        date.setDate(date.getDate() + days);
        expiresAt = date;
      }
    }

    const contentFields = {
      clientName: clientName || "",
      companyName: companyName || "",
      clientEmail: clientEmail || "",
      clientPhone: clientPhone || "",
      requestedService: requestedService || "",
      monthlyRetainer: Number(monthlyRetainer) || 0,
      termLength: termLength || "Month-to-month",
      paymentTerms: paymentTerms || "Net 15",
      contractDate: new Date(),
      startDate: new Date(),
      endDate: null,
      notes: "",
      templateBody: templateBody || ""
    };

    const renderedHtml = compileContractBody(contentFields.templateBody, contentFields);

    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Unknown";

    const initialAuditLog = {
      event: "Contract Created",
      timestamp: new Date(),
      ip,
      userAgent,
      userEmail: "Admin",
      os: "",
      browser: "",
      meta: { version: 1 }
    };

    const newContractData = {
      ...contentFields,
      contractNumber,
      leadId,
      createdBy: "system",
      createdByName: "Admin",
      status: "draft",
      currentVersion: 1,
      templateId: "custom",
      expiresAt,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: null,
      signedAt: null,
      voidReason: null,
      shareToken: null,
      signature: null,
      finalPdfUrl: null,
      analytics: {
        firstViewedAt: null,
        lastViewedAt: null,
        viewsCount: 0,
        totalReadingTimeMs: 0
      },
      auditTrail: [initialAuditLog]
    };

    const newId = await addDocData("contracts", newContractData);

    const versionData = {
      versionNumber: 1,
      content: contentFields,
      renderedHtml,
      createdAt: new Date(),
      createdBy: "system",
      createdByName: "Admin"
    };

    await setSubcollectionDoc("contracts", newId, "versions", "1", versionData);

    return NextResponse.json({
      success: true,
      contract: { id: newId, ...newContractData }
    });
  } catch (error) {
    console.error("POST contract error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
