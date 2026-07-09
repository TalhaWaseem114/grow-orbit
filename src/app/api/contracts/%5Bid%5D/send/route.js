import { NextResponse } from "next/server";
import { adminDb, adminAuth } from "@/firebase/firebaseAdmin";
import crypto from "crypto";

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

    const contractRef = adminDb.collection("contracts").doc(id);
    const contractSnap = await contractRef.get();

    if (!contractSnap.exists) {
      return NextResponse.json({ success: false, error: "Contract not found" }, { status: 404 });
    }

    const contractData = contractSnap.data();

    // Block if already signed or void
    if (contractData.status === "signed" || contractData.status === "void" || contractData.status === "completed") {
      return NextResponse.json({ success: false, error: "Cannot send a finalized or voided contract" }, { status: 400 });
    }

    // Get current version HTML
    const currentVersionStr = String(contractData.currentVersion || 1);
    const versionSnap = await contractRef.collection("versions").doc(currentVersionStr).get();
    if (!versionSnap.exists) {
      return NextResponse.json({ success: false, error: `Current version ${currentVersionStr} not found` }, { status: 400 });
    }

    const versionData = versionSnap.data();

    // Generate random secure token
    const shareToken = crypto.randomBytes(32).toString("hex");

    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Unknown";

    const publishLog = {
      event: "Published",
      timestamp: new Date(),
      ip,
      userAgent,
      userEmail: adminUser.email || "System",
      os: "",
      browser: "",
      meta: { version: contractData.currentVersion }
    };

    const linkLog = {
      event: "Link Generated",
      timestamp: new Date(),
      ip,
      userAgent,
      userEmail: adminUser.email || "System",
      os: "",
      browser: "",
      meta: { tokenGenerated: true }
    };

    await contractRef.update({
      status: "awaiting_signature",
      shareToken,
      publishedAt: new Date(),
      updatedAt: new Date(),
      renderedHtml: versionData.renderedHtml, // Lock the snapshot HTML on the parent
      auditTrail: [...(contractData.auditTrail || []), publishLog, linkLog]
    });

    return NextResponse.json({
      success: true,
      status: "awaiting_signature",
      shareToken
    });
  } catch (error) {
    console.error("Send contract error:", error);
    const status = error.message.includes("Unauthorized") ? 401 : error.message.includes("Forbidden") ? 403 : 500;
    return NextResponse.json({ success: false, error: error.message }, { status });
  }
}
