import { NextResponse } from "next/server";
import { queryDocs, updateDocData } from "@/utils/dbHelper";

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

    const contracts = await queryDocs("contracts", "shareToken", "==", token);
    
    if (contracts.length === 0) {
      return NextResponse.json({ success: false, error: "Contract not found" }, { status: 404 });
    }

    const contract = contracts[0];

    // STRICT IMMUTABILITY check
    if (contract.status === "signed" || contract.status === "completed" || contract.status === "void") {
      return NextResponse.json({ success: false, error: "Contract is locked" }, { status: 400 });
    }

    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgentStr = request.headers.get("user-agent") || "Unknown";
    const { os, browser } = parseUserAgent(userAgentStr);

    const consentLog = {
      event: "Consent Ticked",
      timestamp: new Date(),
      ip,
      userAgent: userAgentStr,
      userEmail: "Client Signer",
      os,
      browser,
      meta: { consentText: "Consent to electronic signature accepted" }
    };

    await updateDocData("contracts", contract.id, {
      auditTrail: [...(contract.auditTrail || []), consentLog]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Public POST consent error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
