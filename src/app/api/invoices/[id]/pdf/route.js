import React from "react";
import { renderToStream } from "@react-pdf/renderer";
import { InvoicePdfDocument } from "@/utils/invoicePdfGenerator";
import { getDocData } from "@/utils/dbHelper";

export async function GET(request, context) {
  try {
    const params = await context.params;
    const { id } = params;

    const invoice = await getDocData("invoices", id);
    if (!invoice) {
      return new Response("Invoice not found", { status: 404 });
    }

    const pdfStream = await renderToStream(
      <InvoicePdfDocument invoice={invoice} />
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
        "Content-Disposition": `attachment; filename="Grow Orbit Invoice ${invoice.invoiceNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Invoice PDF API Error:", error);
    return new Response(`PDF generation failed: ${error.message}`, { status: 500 });
  }
}
