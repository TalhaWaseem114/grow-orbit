import React from "react";
import { renderToStream } from "@react-pdf/renderer";
import { ContractPdfDocument } from "@/utils/contractPdfGenerator";
import { getDocData } from "@/utils/dbHelper";

export async function GET(request, context) {
  const params = await context.params;
  const { id } = params;

  try {
    const contract = await getDocData("contracts", id);
    if (!contract) {
      return new Response("Contract not found", { status: 404 });
    }
    
    let watermark = "";
    if (contract.status === "draft") {
      watermark = "DRAFT";
    } else if (contract.status === "awaiting_signature" || contract.status === "viewed") {
      watermark = "AWAITING SIGNATURE";
    } else if (contract.status === "void") {
      watermark = "VOIDED";
    }

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
    console.error("PDF API Error:", error);
    return new Response(`PDF generation failed: ${error.message}`, { status: 500 });
  }
}
