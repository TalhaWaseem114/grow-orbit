import { NextResponse } from "next/server";
import { getDocData, getSubcollectionDocData, updateDocData } from "@/utils/dbHelper";
import crypto from "crypto";

export async function POST(request, context) {
  try {
    const params = await context.params;
    const { id } = params;

    const contractData = await getDocData("contracts", id);
    if (!contractData) {
      return NextResponse.json({ success: false, error: "Contract not found" }, { status: 404 });
    }

    if (["signed", "completed", "void", "expired"].includes(contractData.status)) {
      return NextResponse.json({ success: false, error: "Cannot publish a finalized, voided, or expired contract" }, { status: 400 });
    }

    const currentVersionStr = String(contractData.currentVersion || 1);
    const versionData = await getSubcollectionDocData("contracts", id, "versions", currentVersionStr);
    if (!versionData) {
      return NextResponse.json({ success: false, error: `Current version ${currentVersionStr} not found` }, { status: 400 });
    }

    const shareToken = crypto.randomBytes(32).toString("hex");

    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Unknown";

    const publishLog = {
      event: "Published",
      timestamp: new Date(),
      ip, userAgent, userEmail: "Admin",
      os: "", browser: "",
      meta: { version: contractData.currentVersion }
    };

    const linkLog = {
      event: "Link Generated",
      timestamp: new Date(),
      ip, userAgent, userEmail: "Admin",
      os: "", browser: "",
      meta: { tokenGenerated: true }
    };

    await updateDocData("contracts", id, {
      status: "awaiting_signature",
      shareToken,
      publishedAt: new Date(),
      updatedAt: new Date(),
      renderedHtml: versionData.renderedHtml,
      auditTrail: [...(contractData.auditTrail || []), publishLog, linkLog]
    });

    return NextResponse.json({ success: true, status: "awaiting_signature", shareToken });
  } catch (error) {
    console.error("Send contract error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
