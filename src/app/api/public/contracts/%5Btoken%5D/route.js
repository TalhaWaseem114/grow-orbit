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

export async function GET(request, context) {
  try {
    const params = await context.params;
    const { token } = params;

    // Find contract with matching shareToken
    const snapshot = await adminDb.collection("contracts").where("shareToken", "==", token).get();
    
    if (snapshot.empty) {
      return NextResponse.json({ success: false, error: "Contract not found or invalid token" }, { status: 404 });
    }

    const doc = snapshot.docs[0];
    const contract = { id: doc.id, ...doc.data() };

    // Check expiration
    if (contract.expiresAt) {
      const expiresDate = contract.expiresAt.toDate ? contract.expiresAt.toDate() : new Date(contract.expiresAt);
      if (new Date() > expiresDate && contract.status !== "signed" && contract.status !== "completed") {
        // Update status to expired
        await doc.ref.update({ status: "expired" });
        return NextResponse.json({ success: false, error: "This agreement has expired.", expired: true }, { status: 400 });
      }
    }

    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgentStr = request.headers.get("user-agent") || "Unknown";
    const { os, browser } = parseUserAgent(userAgentStr);

    // Track viewed analytics
    const analytics = contract.analytics || {
      firstViewedAt: null,
      lastViewedAt: null,
      viewsCount: 0,
      totalReadingTimeMs: 0
    };

    analytics.viewsCount = (analytics.viewsCount || 0) + 1;
    if (!analytics.firstViewedAt) {
      analytics.firstViewedAt = new Date();
    }
    analytics.lastViewedAt = new Date();

    // Log viewed event
    const viewLog = {
      event: analytics.viewsCount > 1 ? "Viewed Again" : "Viewed",
      timestamp: new Date(),
      ip,
      userAgent: userAgentStr,
      userEmail: "Client Signer",
      os,
      browser,
      meta: { viewsCount: analytics.viewsCount }
    };

    const updateData = {
      analytics,
      auditTrail: [...(contract.auditTrail || []), viewLog]
    };

    // If status is "awaiting_signature", upgrade status to "viewed"
    if (contract.status === "awaiting_signature") {
      updateData.status = "viewed";
    }

    await doc.ref.update(updateData);

    // Return contract data, stripping internal fields (like createdBy, internal notes) for privacy
    const publicContract = {
      id: contract.id,
      contractNumber: contract.contractNumber,
      clientName: contract.clientName,
      companyName: contract.companyName,
      clientEmail: contract.clientEmail,
      requestedService: contract.requestedService,
      monthlyRetainer: contract.monthlyRetainer,
      termLength: contract.termLength,
      paymentTerms: contract.paymentTerms,
      contractDate: contract.contractDate?.toDate() || contract.contractDate,
      startDate: contract.startDate?.toDate() || contract.startDate,
      endDate: contract.endDate?.toDate() || contract.endDate,
      renderedHtml: contract.renderedHtml,
      status: updateData.status || contract.status,
      expiresAt: contract.expiresAt?.toDate() || contract.expiresAt,
      signature: contract.signature
    };

    return NextResponse.json({ success: true, contract: publicContract });
  } catch (error) {
    console.error("Public GET contract error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PATCH handles read time tracking heartbeat
export async function PATCH(request, context) {
  try {
    const params = await context.params;
    const { token } = params;
    const body = await request.json();
    const { durationMs } = body;

    if (!durationMs || typeof durationMs !== "number") {
      return NextResponse.json({ success: false, error: "Invalid duration" }, { status: 400 });
    }

    const snapshot = await adminDb.collection("contracts").where("shareToken", "==", token).get();
    if (snapshot.empty) {
      return NextResponse.json({ success: false, error: "Contract not found" }, { status: 404 });
    }

    const doc = snapshot.docs[0];
    const contract = doc.data();

    // Prevent updates on signed/voided
    if (contract.status === "signed" || contract.status === "completed" || contract.status === "void") {
      return NextResponse.json({ success: true, message: "Contract is finalized, ignoring heartbeat" });
    }

    const analytics = contract.analytics || {
      firstViewedAt: null,
      lastViewedAt: null,
      viewsCount: 0,
      totalReadingTimeMs: 0
    };

    analytics.totalReadingTimeMs = (analytics.totalReadingTimeMs || 0) + durationMs;

    await doc.ref.update({ analytics });

    return NextResponse.json({ success: true, readingTimeMs: analytics.totalReadingTimeMs });
  } catch (error) {
    console.error("Public PATCH contract error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
