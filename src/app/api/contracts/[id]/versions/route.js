import { NextResponse } from "next/server";
import { getSubcollectionDocs, getDocData, setSubcollectionDoc, updateDocData } from "@/utils/dbHelper";

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

    const contentFields = {
      clientName: contractData.clientName || "",
      companyName: contractData.companyName || "",
      clientEmail: contractData.clientEmail || "",
      clientPhone: contractData.clientPhone || "",
      requestedService: contractData.requestedService || "",
      monthlyRetainer: Number(contractData.monthlyRetainer) || 0,
      termLength: contractData.termLength || "Month-to-month",
      paymentTerms: contractData.paymentTerms || "Net 15",
      contractDate: contractData.contractDate ? new Date(contractData.contractDate) : new Date(),
      startDate: contractData.startDate ? new Date(contractData.startDate) : new Date(),
      endDate: contractData.endDate ? new Date(contractData.endDate) : null,
      notes: contractData.notes || "",
      templateBody: contractData.templateBody || ""
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
