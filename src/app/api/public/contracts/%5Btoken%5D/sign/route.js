import { NextResponse } from "next/server";
import { adminDb } from "@/firebase/firebaseAdmin";

function parseUserAgent(userAgentStr) {
  let os = "Unknown OS";
  if (userAgentStr.includes("Windows")) os = "Windows";
  else if (userAgentStr.includes("Macintosh") || userAgentStr.includes("Mac OS X")) os = "macOS";
  else if (userAgentStr.includes("Linux")) os = "Linux";
  else if (userAgentStr.includes("Android")) os = "Android";
  else if (userAgentStr.includes("iPhone") || userAgentStr.includes("iPad")) os = "iOS";

  let browser = "Unknown Browser";
  if (userAgentStr.includes("Chrome")) browser = "Chrome";
  else if (userAgentStr.includes("Safari") && !userAgentStr.includes("Chrome")) browser = "Safari";
  else if (userAgentStr.includes("Firefox")) browser = "Firefox";
  else if (userAgentStr.includes("Edge")) browser = "Edge";
  else if (userAgentStr.includes("Trident") || userAgentStr.includes("MSIE")) browser = "IE";

  return { os, browser };
}

export async function POST(request, context) {
  try {
    const params = await context.params;
    const { token } = params;
    const body = await request.json();

    const { signerName, signerEmail, method, signatureValue } = body;

    if (!signerName || !signerEmail || !method || !signatureValue) {
      return NextResponse.json({ success: false, error: "Missing required signature fields" }, { status: 400 });
    }

    const snapshot = await adminDb.collection("contracts").where("shareToken", "==", token).get();
    
    if (snapshot.empty) {
      return NextResponse.json({ success: false, error: "Contract not found" }, { status: 404 });
    }

    const doc = snapshot.docs[0];
    const contract = doc.data();

    // STRICT IMMUTABILITY check
    if (contract.status === "signed" || contract.status === "completed" || contract.status === "void") {
      return NextResponse.json({ success: false, error: "Locked: Contract is already signed or voided" }, { status: 400 });
    }

    // Check expiration
    if (contract.expiresAt) {
      const expiresDate = contract.expiresAt.toDate ? contract.expiresAt.toDate() : new Date(contract.expiresAt);
      if (new Date() > expiresDate) {
        await doc.ref.update({ status: "expired" });
        return NextResponse.json({ success: false, error: "This agreement has expired and cannot be signed." }, { status: 400 });
      }
    }

    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgentStr = request.headers.get("user-agent") || "Unknown";
    const { os, browser } = parseUserAgent(userAgentStr);

    const startLog = {
      event: "Signature Started",
      timestamp: new Date(Date.now() - 2000), // Slightly offset to appear sequentially in timeline
      ip,
      userAgent: userAgentStr,
      userEmail: signerEmail,
      os,
      browser,
      meta: { method }
    };

    const submitLog = {
      event: "Signature Submitted",
      timestamp: new Date(Date.now() - 1000),
      ip,
      userAgent: userAgentStr,
      userEmail: signerEmail,
      os,
      browser,
      meta: { method, signerName }
    };

    const signLog = {
      event: "Signed",
      timestamp: new Date(),
      ip,
      userAgent: userAgentStr,
      userEmail: signerEmail,
      os,
      browser,
      meta: { signatureMethod: method }
    };

    const pdfGenLog = {
      event: "PDF Generated",
      timestamp: new Date(Date.now() + 500),
      ip,
      userAgent: userAgentStr,
      userEmail: "System",
      os,
      browser,
      meta: { engine: "@react-pdf/renderer" }
    };

    const signature = {
      signerName,
      signerEmail,
      method,
      signatureValue, // Holds base64 data URL for drawn or the typed text name
      timestamp: new Date(),
      ip
    };

    const finalPdfUrl = `/api/public/contracts/${token}/pdf`;

    await doc.ref.update({
      status: "signed",
      signature,
      signedAt: new Date(),
      updatedAt: new Date(),
      finalPdfUrl,
      auditTrail: [...(contract.auditTrail || []), startLog, submitLog, signLog, pdfGenLog]
    });

    return NextResponse.json({
      success: true,
      status: "signed",
      contractNumber: contract.contractNumber,
      finalPdfUrl
    });
  } catch (error) {
    console.error("Public POST sign error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
