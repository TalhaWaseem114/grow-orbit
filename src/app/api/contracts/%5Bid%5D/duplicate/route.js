import { NextResponse } from "next/server";
import { adminDb, adminAuth } from "@/firebase/firebaseAdmin";

async function verifyAdmin(request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized: Missing token");
  }
  const token = authHeader.substring(7);
  const decodedToken = await adminAuth.verifyIdToken(token);
  const userSnap = await adminDb.collection("users").doc(decodedToken.uid).get();
  
  if (!userSnap.exists || userSnap.data()?.role !== "admin") {
    throw new Error("Forbidden: Admins only");
  }
  return userSnap.data();
}

export async function POST(request, context) {
  try {
    const adminUser = await verifyAdmin(request);
    const params = await context.params;
    const { id } = params;

    const sourceContractRef = adminDb.collection("contracts").doc(id);
    const sourceSnap = await sourceContractRef.get();

    if (!sourceSnap.exists) {
      return NextResponse.json({ success: false, error: "Contract not found" }, { status: 404 });
    }

    const sourceData = sourceSnap.data();

    // Determine serial contract number atomically via Firestore transaction
    const counterRef = adminDb.collection("counters").doc("contracts");
    let seqNum = 1;
    await adminDb.runTransaction(async (transaction) => {
      const counterDoc = await transaction.get(counterRef);
      if (!counterDoc.exists) {
        transaction.set(counterRef, { count: 1 });
      } else {
        seqNum = (counterDoc.data().count || 0) + 1;
        transaction.update(counterRef, { count: seqNum });
      }
    });

    const year = new Date().getFullYear();
    const contractNumber = `GO-${year}-${String(seqNum).padStart(4, "0")}`;

    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Unknown";

    const initialAuditLog = {
      event: "Contract Created (Duplicated)",
      timestamp: new Date(),
      ip,
      userAgent,
      userEmail: adminUser.email || "System",
      os: "",
      browser: "",
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
      endDate: sourceData.endDate ? sourceData.endDate.toDate() : null,
      notes: sourceData.notes || "",
      templateBody: sourceData.templateBody || ""
    };

    const duplicateContractData = {
      ...contentFields,
      contractNumber,
      leadId: sourceData.leadId,
      createdBy: adminUser.uid || adminUser.id || "system",
      createdByName: adminUser.fullName || adminUser.displayName || "Admin",
      status: "draft",
      currentVersion: 1,
      templateId: sourceData.templateId || "custom",
      expiresAt: sourceData.expiresAt || null,
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

    // Save duplicated contract
    const newContractRef = await adminDb.collection("contracts").add(duplicateContractData);

    // Save initial version snapshot
    const versionData = {
      versionNumber: 1,
      content: contentFields,
      renderedHtml: sourceData.renderedHtml || "",
      createdAt: new Date(),
      createdBy: adminUser.uid || adminUser.id || "system",
      createdByName: adminUser.fullName || adminUser.displayName || "Admin"
    };
    await newContractRef.collection("versions").doc("1").set(versionData);

    return NextResponse.json({
      success: true,
      contract: { id: newContractRef.id, ...duplicateContractData }
    });
  } catch (error) {
    console.error("Duplicate contract error:", error);
    const status = error.message.includes("Unauthorized") ? 401 : error.message.includes("Forbidden") ? 403 : 500;
    return NextResponse.json({ success: false, error: error.message }, { status });
  }
}
