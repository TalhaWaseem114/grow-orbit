import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      resend: !!process.env.RESEND_API_KEY,
      resendFrom: process.env.RESEND_FROM || "onboarding@resend.dev",
      smtp: !!process.env.SMTP_HOST,
      cloudinary: !!process.env.CLOUDINARY_API_KEY || (!!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || true), // Cloudinary is configured locally in upload-image
      firebase: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      slackWebhook: false // We check client-side since Webhook URL is stored in Firestore
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch system status" }, { status: 500 });
  }
}
