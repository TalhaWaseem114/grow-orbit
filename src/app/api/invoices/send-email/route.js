import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/firebase/firebaseAdmin";

// Branded HTML email template for invoices
function generateInvoiceEmailHtml({ clientName, invoiceNumber, amount, dueDate, gDriveLink, customMessage }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.groworbitofficial.com";
  
  const rawHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice ${invoiceNumber} - Grow Orbit</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f6f9fc;
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      color: #333333;
    }
    .wrapper {
      width: 100%;
      background-color: #f6f9fc;
      padding: 40px 10px;
      box-sizing: border-box;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #e1e8ed;
    }
    .header {
      background-color: #0A0A0B;
      padding: 24px 20px;
      text-align: center;
      border-bottom: 3px solid #f97316;
    }
    .header-title {
      font-size: 22px;
      font-weight: 900;
      line-height: 1;
      letter-spacing: 0.03em;
      color: #ffffff;
      margin: 0;
    }
    .header-subtitle {
      font-size: 8px;
      font-weight: 700;
      color: #a1a1aa;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-top: 4px;
    }
    .content {
      padding: 40px 30px;
    }
    .headline {
      font-size: 20px;
      font-weight: 800;
      color: #111111;
      margin-top: 0;
      margin-bottom: 20px;
      line-height: 1.3;
    }
    .body-text {
      font-size: 15px;
      color: #4A5568;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .details-card {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 24px;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 14px;
    }
    .detail-row:last-child {
      margin-bottom: 0;
      border-top: 1px solid #e2e8f0;
      padding-top: 8px;
      font-weight: 700;
    }
    .detail-label {
      color: #718096;
    }
    .detail-value {
      color: #1a202c;
    }
    .cta-container {
      text-align: center;
      margin: 30px 0 10px;
    }
    .cta-button {
      background-color: #f97316;
      color: #ffffff !important;
      padding: 12px 28px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
      display: inline-block;
      box-shadow: 0 4px 10px rgba(249, 115, 22, 0.2);
    }
    .divider {
      border: 0;
      border-top: 1px solid #edf2f7;
      margin: 30px 0 20px;
    }
    .footer {
      text-align: center;
      color: #a0aec0;
      font-size: 11px;
      line-height: 1.5;
    }
    .footer-title {
      font-weight: 700;
      color: #718096;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h2 class="header-title">GROW <span style="color:#f97316">ORBIT</span></h2>
        <div class="header-subtitle">WE RANK. YOU SELL. IT'S THAT SIMPLE.</div>
      </div>
      <div class="content">
        <h1 class="headline">Invoice Received</h1>
        <p class="body-text">Hi ${clientName || "Partner"},</p>
        
        <p class="body-text">
          ${customMessage || "We have prepared your invoice for recent services. You can view the document and keep track of payment details by clicking the button below."}
        </p>
        
        <div class="details-card">
          <div class="detail-row">
            <span class="detail-label">Invoice Number</span>
            <span class="detail-value">${invoiceNumber}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Due Date</span>
            <span class="detail-value">${dueDate}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Amount Due</span>
            <span class="detail-value">${amount}</span>
          </div>
        </div>
        
        <div class="cta-container">
          <a href="${gDriveLink}" class="cta-button" target="_blank">View Invoice on Google Drive</a>
        </div>
        
        <hr class="divider">
        
        <div class="footer">
          <p class="footer-title">Grow Orbit Agency</p>
          <p>support@groworbitofficial.com</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
  return rawHtml;
}

export async function POST(request) {
  try {
    // Verify admin token
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, error: "Unauthorized: Missing token" }, { status: 401 });
    }
    const token = authHeader.substring(7);
    try {
      const decodedToken = await adminAuth.verifyIdToken(token);
      const userSnap = await adminDb.collection("users").doc(decodedToken.uid).get();
      if (!userSnap.exists || userSnap.data()?.role !== "admin") {
        return NextResponse.json({ success: false, error: "Forbidden: Admins only" }, { status: 403 });
      }
    } catch (authErr) {
      return NextResponse.json({ success: false, error: "Unauthorized: Invalid token" }, { status: 401 });
    }

    const body = await request.json();
    const {
      to,
      subject,
      clientName,
      invoiceNumber,
      amount,
      dueDate,
      gDriveLink,
      customMessage
    } = body;

    if (!to || !gDriveLink || !invoiceNumber) {
      return NextResponse.json({ success: false, error: "Missing required fields (to, gDriveLink, invoiceNumber)" }, { status: 400 });
    }

    const htmlContent = generateInvoiceEmailHtml({
      clientName,
      invoiceNumber,
      amount,
      dueDate,
      gDriveLink,
      customMessage
    });

    // Detect Resend API Configuration
    if (process.env.RESEND_API_KEY) {
      const fromEmail = process.env.RESEND_FROM || "onboarding@resend.dev";
      const isSandbox = fromEmail.includes("onboarding@resend.dev");

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: to,
          subject: subject || `Invoice ${invoiceNumber} from Grow Orbit`,
          html: htmlContent,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Resend API returned an error");
      }

      return NextResponse.json({
        success: true,
        provider: "resend",
        message: `Email sent successfully to ${to} via Resend.`,
        id: data.id
      });
    }

    // Fallback: Simulation mode
    console.log("=========================================");
    console.log("[SendInvoiceEmail] SIMULATION MODE ACTIVE (No credentials in env)");
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`GDrive Link: ${gDriveLink}`);
    console.log("=========================================");

    return NextResponse.json({
      success: true,
      provider: "mock",
      message: `[MOCK MODE] Email sent successfully to ${to}. Add RESEND_API_KEY to send live emails.`,
    });

  } catch (error) {
    console.error("Error in send-email API route for invoices:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to send email" }, { status: 500 });
  }
}
