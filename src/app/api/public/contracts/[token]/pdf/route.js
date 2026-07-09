import React from "react";
import { renderToStream } from "@react-pdf/renderer";
import { ContractPdfDocument } from "@/utils/contractPdfGenerator";
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

export async function GET(request, context) {
  const params = await context.params;
  const { token } = params;

  try {
    const contracts = await queryDocs("contracts", "shareToken", "==", token);
    
    if (contracts.length === 0) {
      return new Response("Contract not found or invalid token", { status: 404 });
    }

    const contract = contracts[0];

    let watermark = "";
    if (contract.status === "draft") {
      watermark = "DRAFT";
    } else if (contract.status === "awaiting_signature" || contract.status === "viewed") {
      watermark = "AWAITING SIGNATURE";
    } else if (contract.status === "void") {
      watermark = "VOIDED";
    }

    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgentStr = request.headers.get("user-agent") || "Unknown";
    const { os, browser } = parseUserAgent(userAgentStr);

    const downloadLog = {
      event: "PDF Downloaded",
      timestamp: new Date(),
      ip,
      userAgent: userAgentStr,
      userEmail: "Client Signer",
      os,
      browser,
      meta: { role: "client" }
    };

    await updateDocData("contracts", contract.id, {
      auditTrail: [...(contract.auditTrail || []), downloadLog]
    });

    const pdfStream = await renderToStream(
      <ContractPdfDocument contract={contract} watermark={watermark} />
    );

    const chunks = [];
    for await (const chunk of pdfStream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Contract-${contract.contractNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Public PDF API Error:", error);
    return new Response(`PDF generation failed: ${error.message}`, { status: 500 });
  }
}
