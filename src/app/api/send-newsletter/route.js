import { NextResponse } from "next/server";

// Beautiful responsive HTML email template generator
function generateEmailHtml({ subject, headerImage, headline, body }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.groworbitofficial.com";
  
  // Format body text to preserve newlines as HTML line breaks
  const formattedBody = body.replace(/\n/g, "<br />");

  // Determine logo URL (fallback to default public logo if none provided or relative)
  let logoUrl = "/logo.png";
  if (headerImage) {
    logoUrl = headerImage.trim();
  }
  const absoluteLogoUrl = logoUrl.startsWith("http") 
    ? logoUrl 
    : `${siteUrl}${logoUrl.startsWith("/") ? "" : "/"}${logoUrl}`;

  const rawHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f6f9fc;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      color: #333333;
    }
    .wrapper {
      width: 100%;
      background-color: #f6f9fc;
      padding: 40px 10px;
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
    }
    .header img {
      max-height: 44px;
      max-width: 80%;
      object-fit: contain;
      display: inline-block;
    }
    .header-fallback {
      font-size: 20px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin: 0;
    }
    .content {
      padding: 40px 30px;
    }
    .headline {
      font-size: 22px;
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
      margin-bottom: 30px;
    }
    .cta-container {
      text-align: center;
      margin: 35px 0 15px;
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
      margin: 35px 0 20px 0;
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
        ${absoluteLogoUrl ? `<img src="${absoluteLogoUrl}" alt="Grow Orbit">` : `<h2 class="header-fallback">GROW <span style="color:#f97316">ORBIT</span></h2>`}
      </div>
      <div class="content">
        ${headline ? `<h1 class="headline">${headline}</h1>` : ""}
        <div class="body-text">${formattedBody}</div>
        
        <div class="cta-container">
          <a href="${siteUrl}/get-started/book-meeting" class="cta-button" target="_blank">Book a Strategy Call</a>
        </div>
        
        <hr class="divider">
        
        <div class="footer">
          <p class="footer-title">Grow Orbit Agency</p>
          <p>123 Commerce St, Suite 100, New York, NY</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  // Optimize Cloudinary URLs in the compiled HTML to load instantly and prevent failures on mobile devices (e.g. Gmail proxy)
  const optimizedHtml = rawHtml.replace(
    /https:\/\/res\.cloudinary\.com\/([^/]+)\/image\/upload\/(v\d+)/g,
    "https://res.cloudinary.com/$1/image/upload/f_auto,q_auto,w_600/$2"
  );

  return optimizedHtml;
}

export async function POST(request) {
  try {
    const { subject, headerImage, headline, body, recipients } = await request.json();

    if (!subject || !body || !recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json({ error: "Missing required fields or recipients list" }, { status: 400 });
    }

    const htmlContent = generateEmailHtml({ subject, headerImage, headline, body });

    // 1. Detect Resend Configuration
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
          to: isSandbox ? recipients : [fromEmail], // Sandbox requires the registered email to be in 'to'
          ...(isSandbox ? {} : { bcc: recipients }),  // Use 'bcc' for privacy in production
          subject: subject,
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
        message: `Broadcasted successfully to ${recipients.length} recipients via Resend.`,
        id: data.id 
      });
    }

    // 2. Fallback: Mock Mode
    console.log("=========================================");
    console.log("[SendNewsletter] MOCK MODE ACTIVE (No credentials set in env)");
    console.log(`Subject: ${subject}`);
    console.log(`Recipients count: ${recipients.length}`);
    console.log(`Recipients list: ${recipients.join(", ")}`);
    console.log("=========================================");

    return NextResponse.json({
      success: true,
      provider: "mock",
      message: `[MOCK MODE] Campaign simulated successfully to ${recipients.length} recipients. Add RESEND_API_KEY environment variable to send live emails.`,
    });

  } catch (error) {
    console.error("Error in send-newsletter API route:", error);
    return NextResponse.json({ error: error.message || "Failed to broadcast newsletter" }, { status: 500 });
  }
}
