import { NextResponse } from "next/server";
import { getSubcollectionDocs, getDocData, setSubcollectionDoc, updateDocData } from "@/utils/dbHelper";
import { DEFAULT_CLAUSES, compileContractBody } from "@/utils/contractHelper";

export async function GET(request, context) {
  try {
    const params = await context.params;
    const { id } = params;

    const versions = await getSubcollectionDocs("contracts", id, "versions");
    versions.sort((a, b) => a.versionNumber - b.versionNumber);

    return NextResponse.json({ success: true, versions });
  } catch (error) {
    console.error("GET versions error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request, context) {
  try {
    const params = await context.params;
    const { id } = params;

    const contractData = await getDocData("contracts", id);
    if (!contractData) {
      return NextResponse.json({ success: false, error: "Contract not found" }, { status: 404 });
    }

    const nextVersion = (contractData.currentVersion || 1) + 1;

    const currentClauses = contractData.clauses && Array.isArray(contractData.clauses) && contractData.clauses.length > 0
      ? contractData.clauses
      : DEFAULT_CLAUSES;

    const contentFields = {
      clientName: contractData.clientName || "",
      companyName: contractData.companyName || "",
      clientEmail: contractData.clientEmail || "",
      clientPhone: contractData.clientPhone || "",
      requestedService: contractData.requestedService || "",
      monthlyRetainer: contractData.monthlyRetainer !== undefined && contractData.monthlyRetainer !== null ? String(contractData.monthlyRetainer) : "",
      termLength: contractData.termLength || "Month-to-month",
      paymentTerms: contractData.paymentTerms || "Net 15",
      contractDate: contractData.contractDate ? new Date(contractData.contractDate) : new Date(),
      startDate: contractData.startDate ? new Date(contractData.startDate) : new Date(),
      endDate: contractData.endDate ? new Date(contractData.endDate) : null,
      notes: contractData.notes || "",
      templateBody: contractData.templateBody || "",
      location: contractData.location || "USA",
      autoRenewal: contractData.autoRenewal || "Yes, after 3 months",
      services: contractData.services || [],
      clauses: currentClauses,
      termCommitmentText: contractData.termCommitmentText || currentClauses[0]?.text || "",
      paymentTermsText: contractData.paymentTermsText || currentClauses[1]?.text || "",
      clientResponsibilitiesText: contractData.clientResponsibilitiesText || currentClauses[2]?.text || "",
      confidentialityTerminationText: contractData.confidentialityTerminationText || currentClauses[3]?.text || "",
      governingLawText: contractData.governingLawText || currentClauses[4]?.text || ""
    };

    const renderedHtml = compileContractBody(contentFields.templateBody, contentFields);

    const versionData = {
      versionNumber: nextVersion,
      content: contentFields,
      renderedHtml,
      createdAt: new Date(),
      createdBy: "system",
      createdByName: "Admin"
    };

    await setSubcollectionDoc("contracts", id, "versions", String(nextVersion), versionData);

    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Unknown";

    const versionLog = {
      event: `Created Version ${nextVersion}`,
      timestamp: new Date(),
      ip, userAgent, userEmail: "Admin",
      os: "", browser: "",
      meta: { version: nextVersion }
    };

    await updateDocData("contracts", id, {
      renderedHtml,
      currentVersion: nextVersion,
      updatedAt: new Date(),
      auditTrail: [...(contractData.auditTrail || []), versionLog]
    });

    return NextResponse.json({ success: true, currentVersion: nextVersion, version: versionData });
  } catch (error) {
    console.error("POST version error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
