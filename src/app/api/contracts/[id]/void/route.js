import { NextResponse } from "next/server";
import { getDocData, updateDocData } from "@/utils/dbHelper";

export async function POST(request, context) {
  try {
    const params = await context.params;
    const { id } = params;
    const body = await request.json();
    const { reason } = body;

    if (!reason || !reason.trim()) {
      return NextResponse.json({ success: false, error: "Voiding reason is required" }, { status: 400 });
    }

    const contractData = await getDocData("contracts", id);
    if (!contractData) {
      return NextResponse.json({ success: false, error: "Contract not found" }, { status: 404 });
    }

    if (contractData.status === "void") {
      return NextResponse.json({ success: false, error: "Contract is already voided" }, { status: 400 });
    }

    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Unknown";

    const voidLog = {
      event: "Voided",
      timestamp: new Date(),
      ip, userAgent, userEmail: "Admin",
      os: "", browser: "",
      meta: { reason: reason.trim() }
    };

    await updateDocData("contracts", id, {
      status: "void",
      shareToken: null,
      voidReason: reason.trim(),
      updatedAt: new Date(),
      auditTrail: [...(contractData.auditTrail || []), voidLog]
    });

    return NextResponse.json({ success: true, status: "void", voidReason: reason.trim() });
  } catch (error) {
    console.error("Void contract error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
