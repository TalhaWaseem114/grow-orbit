import { NextResponse } from "next/server";
import { verifyAdmin, queryDocs, getAllDocs, addDocData, getNextInvoiceSequenceNumber } from "@/utils/dbHelper";

export async function GET(request) {
  try {
    // Optional admin verification, but we can verify to be safe
    try {
      const admin = await verifyAdmin(request);
      if (!admin) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
      }
    } catch (e) {
      return NextResponse.json({ success: false, error: e.message }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get("leadId");

    let invoices;
    if (leadId) {
      invoices = await queryDocs("invoices", "leadId", "==", leadId);
    } else {
      invoices = await getAllDocs("invoices");
    }

    // Sort by createdAt descending
    invoices.sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
      return dateB - dateA;
    });

    return NextResponse.json({ success: true, invoices });
  } catch (error) {
    console.error("GET invoices error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    let admin;
    try {
      admin = await verifyAdmin(request);
      if (!admin) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
      }
    } catch (e) {
      return NextResponse.json({ success: false, error: e.message }, { status: 401 });
    }

    const body = await request.json();
    const {
      leadId,
      clientName,
      companyName,
      clientEmail,
      clientAddress,
      issueDate,
      dueDate,
      currency,
      items,
      taxRate,
      discount,
      notes,
      status
    } = body;

    if (!leadId) {
      return NextResponse.json({ success: false, error: "Missing leadId" }, { status: 400 });
    }

    const now = new Date();
    const year = now.getFullYear();
    const dateStr = String(now.getDate()).padStart(2, "0");
    const monthStr = String(now.getMonth() + 1).padStart(2, "0");
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const invoiceNumber = body.invoiceNumber || `GO-INV-${year}-${dateStr}-${monthStr}-${randomNum}`;

    const invoiceData = {
      invoiceNumber,
      leadId,
      clientName: clientName || "",
      companyName: companyName || "",
      clientEmail: clientEmail || "",
      clientAddress: clientAddress || "",
      issueDate: issueDate || now.toISOString().split("T")[0],
      dueDate: dueDate || now.toISOString().split("T")[0],
      status: status || "draft",
      currency: currency || "USD",
      items: items || [],
      taxRate: Number(taxRate) || 0,
      discount: Number(discount) || 0,
      notes: notes || "",
      agreementId: body.agreementId || "",
      startDate: body.startDate || "",
      paymentTerms: body.paymentTerms || "",
      clientLabel1: body.clientLabel1 || "",
      clientLabel2: body.clientLabel2 || "",
      bankName: body.bankName || "",
      bankAccountName: body.bankAccountName || "",
      bankAccountNumber: body.bankAccountNumber || "",
      bankRoutingNumber: body.bankRoutingNumber || "",
      bankSwiftBic: body.bankSwiftBic || "",
      paypalEmail: body.paypalEmail || "",
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      createdBy: admin.uid
    };

    const docId = await addDocData("invoices", invoiceData);

    return NextResponse.json({ success: true, id: docId, invoiceNumber, invoice: { id: docId, ...invoiceData } });
  } catch (error) {
    console.error("POST invoices error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
