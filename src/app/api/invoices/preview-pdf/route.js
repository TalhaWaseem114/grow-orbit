import React from "react";
import { renderToStream } from "@react-pdf/renderer";
import { InvoicePdfDocument } from "@/utils/invoicePdfGenerator";

export async function POST(request) {
  try {
    const invoiceData = await request.json();

    const pdfStream = await renderToStream(
      <InvoicePdfDocument invoice={invoiceData} />
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
        "Content-Disposition": `attachment; filename="Grow Orbit Invoice ${invoiceData.invoiceNumber || 'Preview'}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Preview PDF API Error:", error);
    return new Response(`PDF generation failed: ${error.message}`, { status: 500 });
  }
}
