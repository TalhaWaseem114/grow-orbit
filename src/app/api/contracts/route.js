import { NextResponse } from "next/server";
import { queryDocs, addDocData, setSubcollectionDoc, getDocData } from "@/utils/dbHelper";
import { DEFAULT_CLAUSES, compileContractBody } from "@/utils/contractHelper";

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
      contractDate,
      startDate,
      endDate,
      notes,
      templateBody,
      expirationDays,
      customExpirationDate,
      location,
      autoRenewal,
      services,
      clauses,
      termCommitmentText,
      paymentTermsText,
      clientResponsibilitiesText,
      confidentialityTerminationText,
      governingLawText
    } = body;

    if (!leadId) {
      return NextResponse.json({ success: false, error: "Missing leadId" }, { status: 400 });
    }

    const now = new Date();
    const year = now.getFullYear();
    const dateStr = String(now.getDate()).padStart(2, "0");
    const monthStr = String(now.getMonth() + 1).padStart(2, "0");
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const contractNumber = `GO-${year}-${dateStr}-${monthStr}-${randomNum}`;

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

    // Determine initial clauses: use provided clauses or fetch from Firebase settings
    let initialClauses = clauses;
    if (!Array.isArray(initialClauses) || initialClauses.length === 0) {
      try {
        const settingsDoc = await getDocData("settings", "contractDefaults");
        if (settingsDoc && Array.isArray(settingsDoc.clauses) && settingsDoc.clauses.length > 0) {
          initialClauses = settingsDoc.clauses;
        } else {
          initialClauses = DEFAULT_CLAUSES;
        }
      } catch {
        initialClauses = DEFAULT_CLAUSES;
      }
    }

    let parsedContractDate = new Date();
    if (contractDate) {
      if (typeof contractDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(contractDate.trim())) {
        const [y, m, d] = contractDate.trim().split("-");
        parsedContractDate = new Date(Number(y), Number(m) - 1, Number(d), 12, 0, 0);
      } else {
        parsedContractDate = new Date(contractDate);
      }
    }

    let parsedStartDate = new Date();
    if (startDate) {
      if (typeof startDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(startDate.trim())) {
        const [y, m, d] = startDate.trim().split("-");
        parsedStartDate = new Date(Number(y), Number(m) - 1, Number(d), 12, 0, 0);
      } else {
        parsedStartDate = new Date(startDate);
      }
    }

    const contentFields = {
      clientName: clientName || "",
      companyName: companyName || "",
      clientEmail: clientEmail || "",
      clientPhone: clientPhone || "",
      requestedService: requestedService || "",
      monthlyRetainer: monthlyRetainer !== undefined && monthlyRetainer !== null ? String(monthlyRetainer) : "",
      termLength: termLength || "3 Months",
      paymentTerms: paymentTerms || "Net 15",
      location: location || "USA",
      autoRenewal: autoRenewal || "Yes, after 3 months",
      contractDate: parsedContractDate,
      startDate: parsedStartDate,
      endDate: endDate ? new Date(endDate) : null,
      notes: notes || "",
      templateBody: templateBody || "",
      services: services || [],
      clauses: initialClauses,
      termCommitmentText: termCommitmentText || initialClauses[0]?.text || "",
      paymentTermsText: paymentTermsText || initialClauses[1]?.text || "",
      clientResponsibilitiesText: clientResponsibilitiesText || initialClauses[2]?.text || "",
      confidentialityTerminationText: confidentialityTerminationText || initialClauses[3]?.text || "",
      governingLawText: governingLawText || initialClauses[4]?.text || ""
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
      renderedHtml,
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
