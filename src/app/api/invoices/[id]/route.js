import { NextResponse } from "next/server";
import { verifyAdmin, getDocData, updateDocData, deleteDocData } from "@/utils/dbHelper";

export async function GET(request, context) {
  try {
    try {
      const admin = await verifyAdmin(request);
      if (!admin) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
      }
    } catch (e) {
      return NextResponse.json({ success: false, error: e.message }, { status: 401 });
    }

    const params = await context.params;
    const { id } = params;

    const invoice = await getDocData("invoices", id);
    if (!invoice) {
      return NextResponse.json({ success: false, error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, invoice });
  } catch (error) {
    console.error("GET single invoice error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, context) {
  try {
    try {
      const admin = await verifyAdmin(request);
      if (!admin) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
      }
    } catch (e) {
      return NextResponse.json({ success: false, error: e.message }, { status: 401 });
    }

    const params = await context.params;
    const { id } = params;
    const body = await request.json();

    const invoice = await getDocData("invoices", id);
    if (!invoice) {
      return NextResponse.json({ success: false, error: "Invoice not found" }, { status: 404 });
    }

    const now = new Date();
    const updateData = {
      ...body,
      updatedAt: now.toISOString()
    };

    // Clean data (prevent overwriting system generated fields if not needed)
    delete updateData.id;
    delete updateData.createdAt;

    await updateDocData("invoices", id, updateData);

    return NextResponse.json({ success: true, invoice: { ...invoice, ...updateData } });
  } catch (error) {
    console.error("PATCH invoice error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    try {
      const admin = await verifyAdmin(request);
      if (!admin) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
      }
    } catch (e) {
      return NextResponse.json({ success: false, error: e.message }, { status: 401 });
    }

    const params = await context.params;
    const { id } = params;

    const invoice = await getDocData("invoices", id);
    if (!invoice) {
      return NextResponse.json({ success: false, error: "Invoice not found" }, { status: 404 });
    }

    await deleteDocData("invoices", id);

    return NextResponse.json({ success: true, message: "Invoice deleted successfully" });
  } catch (error) {
    console.error("DELETE invoice error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
