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
    const body = await request.json();
    const { reason } = body;

    if (!reason || !reason.trim()) {
      return NextResponse.json({ success: false, error: "Voiding reason is required" }, { status: 400 });
    }

    const contractRef = adminDb.collection("contracts").doc(id);
    const contractSnap = await contractRef.get();

    if (!contractSnap.exists) {
      return NextResponse.json({ success: false, error: "Contract not found" }, { status: 404 });
    }

    const contractData = contractSnap.data();

    if (contractData.status === "void") {
      return NextResponse.json({ success: false, error: "Contract is already voided" }, { status: 400 });
    }

    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Unknown";

    const voidLog = {
      event: "Voided",
      timestamp: new Date(),
      ip,
      userAgent,
      userEmail: adminUser.email || "System",
      os: "",
      browser: "",
      meta: { reason: reason.trim() }
    };

    await contractRef.update({
      status: "void",
      shareToken: null, // Invalidate share token immediately
      voidReason: reason.trim(),
      updatedAt: new Date(),
      auditTrail: [...(contractData.auditTrail || []), voidLog]
    });

    return NextResponse.json({
      success: true,
      status: "void",
      voidReason: reason.trim()
    });
  } catch (error) {
    console.error("Void contract error:", error);
    const status = error.message.includes("Unauthorized") ? 401 : error.message.includes("Forbidden") ? 403 : 500;
    return NextResponse.json({ success: false, error: error.message }, { status });
  }
}
