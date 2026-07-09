import { NextResponse } from "next/server";
import { getDocData, getNextSequenceNumber, addDocData, setSubcollectionDoc } from "@/utils/dbHelper";

export async function POST(request, context) {
  try {
    const params = await context.params;
    const { id } = params;

    const sourceData = await getDocData("contracts", id);
    if (!sourceData) {
      return NextResponse.json({ success: false, error: "Contract not found" }, { status: 404 });
    }

    const seqNum = await getNextSequenceNumber();
    const year = new Date().getFullYear();
    const contractNumber = `GO-${year}-${String(seqNum).padStart(4, "0")}`;

    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Unknown";

    const initialAuditLog = {
      event: "Contract Created (Duplicated)",
      timestamp: new Date(),
      ip, userAgent, userEmail: "Admin",
      os: "", browser: "",
      meta: { duplicatedFrom: id, version: 1 }
    };

    const contentFields = {
      clientName: sourceData.clientName || "",
      companyName: sourceData.companyName || "",
      clientEmail: sourceData.clientEmail || "",
      clientPhone: sourceData.clientPhone || "",
      requestedService: sourceData.requestedService || "",
      monthlyRetainer: Number(sourceData.monthlyRetainer) || 0,
      termLength: sourceData.termLength || "Month-to-month",
      paymentTerms: sourceData.paymentTerms || "Net 15",
      contractDate: new Date(),
      startDate: new Date(),
      endDate: sourceData.endDate ? new Date(sourceData.endDate) : null,
      notes: sourceData.notes || "",
      templateBody: sourceData.templateBody || ""
    };

    const duplicateContractData = {
      ...contentFields,
      contractNumber,
      leadId: sourceData.leadId,
      createdBy: "system",
      createdByName: "Admin",
      status: "draft",
      currentVersion: 1,
      templateId: sourceData.templateId || "custom",
      expiresAt: sourceData.expiresAt ? new Date(sourceData.expiresAt) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: null,
      signedAt: null,
      voidReason: null,
      shareToken: null,
      signature: null,
      finalPdfUrl: null,
      analytics: { firstViewedAt: null, lastViewedAt: null, viewsCount: 0, totalReadingTimeMs: 0 },
      auditTrail: [initialAuditLog]
    };

    const newId = await addDocData("contracts", duplicateContractData);

    const versionData = {
      versionNumber: 1,
      content: contentFields,
      renderedHtml: sourceData.renderedHtml || "",
      createdAt: new Date(),
      createdBy: "system",
      createdByName: "Admin"
    };
    
    await setSubcollectionDoc("contracts", newId, "versions", "1", versionData);

    return NextResponse.json({ success: true, contract: { id: newId, ...duplicateContractData } });
  } catch (error) {
    console.error("Duplicate contract error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
