import React from "react";
import { renderToStream } from "@react-pdf/renderer";
import { ReceiptPdfDocument } from "@/utils/receiptPdfGenerator";
import { getDocData } from "@/utils/dbHelper";

export async function GET(request, context) {
  try {
    const params = await context.params;
    const { id } = params;

    const receipt = await getDocData("receipts", id);
    if (!receipt) {
      return new Response("Receipt not found", { status: 404 });
    }

    const pdfStream = await renderToStream(
      <ReceiptPdfDocument receipt={receipt} />
    );

    const chunks = [];
    for await (const chunk of pdfStream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    const cleanNum = (receipt.receiptNumber || `GO-PR-${id}`).replace(/[#\s]/g, "-");

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Grow Orbit Payment Receipt ${cleanNum}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Receipt PDF API Error:", error);
    return new Response(`PDF generation failed: ${error.message}`, { status: 500 });
  }
}
