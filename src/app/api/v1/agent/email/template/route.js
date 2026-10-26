import { NextResponse } from "next/server";

// Security verification for Muse AI agent
function verifyAgentAuth(request) {
  const authHeader = request.headers.get("authorization") || "";
  const apiKeyHeader = request.headers.get("x-api-key") || "";
  const { searchParams } = new URL(request.url);
  const queryKey = searchParams.get("apiKey") || searchParams.get("token") || "";

  let providedKey = "";
  if (authHeader.startsWith("Bearer ")) {
    providedKey = authHeader.substring(7).trim();
  } else if (apiKeyHeader) {
    providedKey = apiKeyHeader.trim();
  } else if (queryKey) {
    providedKey = queryKey.trim();
  }

  const validKey = process.env.MUSE_AI_API_KEY || process.env.AGENT_API_KEY || "groworbit_muse_live_key_2026";
  return providedKey && providedKey === validKey;
}

/**
 * Compiles structured email components into the official Grow Orbit Bulletproof HTML Email Template
 */
function compileGrowOrbitEmail({
  subject = "Grow Orbit — Strategy Update",
  previewText = "",
  recipientName = "",
  badge = "GROWTH STRATEGY",
  headline = "",
  intro = "",
  keyInsight = "",
  highlightCards = [],
  body = "",
  ctaText = "Book a Strategy Call",
  ctaUrl = "https://www.groworbitofficial.com/get-started/",
  includeMeetingCard = true,
  signOffName = "The Grow Orbit Team",
  signOffRole = "Amazon Growth Agency",
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.groworbitofficial.com";
  const logoUrl = `${siteUrl}/logo.png`;

  // Process intro text / body into paragraphs
  let bodyHtml = "";

  if (recipientName) {
    bodyHtml += `<p style="font-size: 14px; line-height: 1.6; color: #475569; margin-top: 0; margin-bottom: 20px; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Hi ${recipientName},</p>`;
  }

  if (intro) {
    const introParagraphs = Array.isArray(intro) ? intro : intro.split(/\n\s*\n|\n/);
    introParagraphs.forEach((p) => {
      const trimmed = p.trim();
      if (trimmed) {
        bodyHtml += `<p style="font-size: 14px; line-height: 1.7; color: #334155; margin-bottom: 20px; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">${trimmed}</p>`;
      }
    });
  }

  // Key Insight Card (Warm Orange Accent Box)
  if (keyInsight) {
    bodyHtml += `
<!-- Key Insight Card -->
<div style="background-color: #fff7ed; border: 1px solid #ffedd5; border-left: 4px solid #f97316; border-radius: 8px; padding: 18px 20px; margin-bottom: 24px;">
  <p style="font-size: 11px; font-weight: 800; color: #ea580c; text-transform: uppercase; letter-spacing: 1px; margin-top: 0; margin-bottom: 8px; font-family: 'Montserrat', sans-serif;">
    &#128161; KEY STRATEGIC INSIGHT
  </p>
  <p style="font-size: 13.5px; line-height: 1.65; color: #431407; margin: 0; font-family: 'Montserrat', sans-serif;">
    ${keyInsight}
  </p>
</div>`;
  }

  // Highlights / Features / Executive Summary Table
  if (Array.isArray(highlightCards) && highlightCards.length > 0) {
    bodyHtml += `
<!-- Executive Summary Table (Bulletproof for Gmail / Outlook / Apple Mail) -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
  <tr>
    <td bgcolor="#f8fafc" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #f97316; border-radius: 8px; padding: 20px 24px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 13.5px; line-height: 1.8; color: #334155; border-collapse: collapse; margin: 0; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">`;

    highlightCards.forEach((card, idx) => {
      const isLast = idx === highlightCards.length - 1;
      const icon = card.icon || "&#10004;";
      const title = card.title || card.label || "";
      const desc = card.desc || card.value || "";

      bodyHtml += `
        <tr>
          <td style="padding-bottom: ${isLast ? '0' : '12px'}; vertical-align: top; width: 34px; font-size: 16px; font-family: sans-serif;">
            ${icon}
          </td>
          <td style="padding-bottom: ${isLast ? '0' : '12px'}; vertical-align: top; color: #334155; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            ${title ? `<strong style="color: #0f172a;">${title}:</strong> ` : ""}${desc}
          </td>
        </tr>`;
    });

    bodyHtml += `
      </table>
    </td>
  </tr>
</table>`;
  }

  // Additional raw body if provided
  if (body) {
    const rawLines = body.split(/\n\s*\n|\n/);
    rawLines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed) {
        if (trimmed.startsWith("<")) {
          bodyHtml += trimmed;
        } else {
          bodyHtml += `<p style="font-size: 14px; line-height: 1.7; color: #334155; margin-bottom: 20px; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">${trimmed}</p>`;
        }
      }
    });
  }

  // Bulletproof CTA Button (Gmail / Outlook compatible table button)
  if (ctaText && ctaUrl) {
    bodyHtml += `
<!-- Bulletproof CTA Button -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 28px; margin-bottom: 28px;">
  <tr>
    <td align="center">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center" bgcolor="#f97316" style="background-color: #f97316; border: 3px solid #fed7aa; padding: 14px 40px; border-radius: 50px; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <a href="${ctaUrl}" target="_blank" style="color: #ffffff !important; text-decoration: none !important; display: inline-block; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; line-height: 1.2; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              ${ctaText}
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
  }

  // Contact & Meeting Card (Direct Calendly & WhatsApp access)
  if (includeMeetingCard) {
    bodyHtml += `
<!-- Contact & Direct Schedule Card -->
<div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px;">
  <p style="font-size: 13px; line-height: 1.6; color: #334155; margin-top: 0; margin-bottom: 10px; font-family: 'Montserrat', sans-serif;">
    Have questions or want to review this together?
  </p>
  <p style="font-size: 13px; margin-top: 0; margin-bottom: 6px; font-family: 'Montserrat', sans-serif;">
    &#128197; <strong>Schedule a Call:</strong> <a href="${siteUrl}/get-started/" target="_blank" style="color: #f97316; text-decoration: underline; font-weight: 600;">Book 20–30 Min Strategy Call</a>
  </p>
  <p style="font-size: 13px; margin: 0; font-family: 'Montserrat', sans-serif;">
    &#128241; <strong>Direct WhatsApp:</strong> <strong style="color: #f97316;">+1 (912) 820-5916</strong>
  </p>
</div>`;
  }

  // Sign-off
  if (signOffName) {
    bodyHtml += `
<p style="font-size: 14px; line-height: 1.7; color: #334155; margin-top: 24px; margin-bottom: 4px; font-family: 'Montserrat', sans-serif;">
  Warm regards,
</p>
<p style="font-size: 14px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 2px; font-family: 'Montserrat', sans-serif;">
  ${signOffName}
</p>
${signOffRole ? `<p style="font-size: 12px; color: #64748b; margin-top: 0; margin-bottom: 24px; font-family: 'Montserrat', sans-serif;">${signOffRole}</p>` : ""}`;
  }

  // Complete HTML document wrapper
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
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
      padding: 30px 10px;
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
      max-height: 40px;
      max-width: 80%;
      object-fit: contain;
      display: inline-block;
    }
    .badge {
      display: inline-block;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #f97316;
      background-color: #fff7ed;
      border: 1px solid #ffedd5;
      padding: 4px 10px;
      border-radius: 20px;
      margin-bottom: 12px;
    }
    .headline {
      font-size: 22px;
      font-weight: 800;
      color: #0f172a;
      margin-top: 0;
      margin-bottom: 20px;
      line-height: 1.3;
      letter-spacing: -0.3px;
    }
    .content {
      padding: 36px 28px;
    }
    .divider {
      border: 0;
      border-top: 1px solid #edf2f7;
      margin: 32px 0 20px 0;
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
  ${previewText ? `<div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">${previewText}</div>` : ""}
  <div class="wrapper">
    <div class="container">
      <!-- Dark Brand Header -->
      <div class="header">
        <a href="${siteUrl}" target="_blank" style="text-decoration: none;">
          <img src="${logoUrl}" alt="Grow Orbit" style="border: 0; display: inline-block;">
        </a>
      </div>

      <!-- Main Body Content -->
      <div class="content">
        ${badge ? `<div><span class="badge">${badge}</span></div>` : ""}
        ${headline ? `<h1 class="headline">${headline}</h1>` : ""}
        ${bodyHtml}

        <hr class="divider">

        <!-- Branded Footer -->
        <div class="footer">
          <p class="footer-title">Grow Orbit Agency</p>
          <p>Amazon Brand Launch &bull; Listing Visuals &bull; PPC Architecture</p>
          <p style="margin-top: 8px;">
            <a href="${siteUrl}" style="color: #f97316; text-decoration: none; font-weight: 600;">groworbitofficial.com</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

  return fullHtml;
}

/**
 * GET /api/v1/agent/email/template
 * Returns the exact Grow Orbit Email Design Specification & JSON Schema for Muse AI
 */
export async function GET(request) {
  if (!verifyAgentAuth(request)) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized. Missing or invalid Muse AI API key.",
      },
      { status: 401 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.groworbitofficial.com";

  return NextResponse.json(
    {
      success: true,
      agent: "Muse AI",
      templateSystem: "Grow Orbit Master Email Design System",
      brandSpecs: {
        fontFamily: "'Montserrat', sans-serif",
        colors: {
          headerBackground: "#0A0A0B",
          primaryAccent: "#f97316 (Grow Orbit Orange)",
          accentBorder: "#fed7aa",
          cardBackground: "#ffffff",
          outerCanvas: "#f6f9fc",
          insightBoxBackground: "#fff7ed",
          summaryTableBackground: "#f8fafc",
          darkText: "#0f172a",
          bodyText: "#334155",
        },
        logoUrl: `${siteUrl}/logo.png`,
        components: [
          "Header with official Grow Orbit logo",
          "Orange category badge",
          "Bold Montserrat headline",
          "Formatted body text with comfortable 1.7 line-height",
          "Key Insight highlight card with 💡 emoji and orange left border",
          "Executive Summary / Feature comparison table",
          "Bulletproof pill-shaped CTA button (Outlook / Gmail optimized)",
          "Direct WhatsApp (+1 (912) 820-5916) & Calendly scheduling card",
          "Agency footer with official website links",
        ],
      },
      howToUse: {
        description: "Send a POST request to this endpoint with your email content in JSON format. The server will compile your content into the official Grow Orbit HTML template and return the production-ready HTML code.",
        examplePayload: {
          recipientName: "Amir Baig",
          subject: "Amazon 3D Product Rendering: Why Brands are Switching in 2026",
          previewText: "Cut photography costs by 60% with CAD assets",
          badge: "VISUAL ASSET STRATEGY",
          headline: "Transform Your Amazon Listing Visuals",
          intro: "I wanted to share a quick strategic breakdown of why consumer brands are moving away from traditional studio shoots toward unified 3D rendering pipelines.\n\nOver a brand's operating lifecycle, 3D assets eliminate prototype shipping, studio rental delays, and physical sample damage.",
          keyInsight: "Across top-performing listings, 3D CAD modeling reduces future label and colorway variation costs from $250+ down to $35–$75 per render.",
          highlightCards: [
            { icon: "🚀", title: "Pure White Hero Renders", desc: "100% Amazon TOS compliant (RGB 255), zero glare, 85%+ frame fill" },
            { icon: "📐", title: "CAD Retopology & Shaders", desc: "Digital realism for brushed metals, plastics, and transparent glass" },
            { icon: "⚡", title: "Instant Variant Turnaround", desc: "Swap packaging artwork and re-render in 48 hours without shipping samples" }
          ],
          ctaText: "Book Free 3D Strategy Session",
          ctaUrl: "https://www.groworbitofficial.com/get-started/",
          includeMeetingCard: true,
          signOffName: "Talha Waseem",
          signOffRole: "Technical Strategist | Grow Orbit",
        },
      },
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/json",
      },
    }
  );
}

/**
 * POST /api/v1/agent/email/template
 * Takes structured content from Muse AI and compiles it into the pixel-perfect Grow Orbit HTML email
 */
export async function POST(request) {
  if (!verifyAgentAuth(request)) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized. Missing or invalid Muse AI API key.",
      },
      { status: 401 }
    );
  }

  try {
    let payload = {};
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const {
      subject = "Grow Orbit — Growth Strategy Update",
      previewText = "",
      recipientName = "",
      badge = "GROWTH STRATEGY",
      headline = "",
      intro = "",
      keyInsight = "",
      highlightCards = [],
      body = "",
      ctaText = "Book a Strategy Call",
      ctaUrl = "https://www.groworbitofficial.com/get-started/",
      includeMeetingCard = true,
      signOffName = "The Grow Orbit Team",
      signOffRole = "Amazon Growth Agency",
    } = payload;

    // Compile into official Grow Orbit bulletproof HTML
    const compiledHtml = compileGrowOrbitEmail({
      subject,
      previewText,
      recipientName,
      badge,
      headline: headline || subject,
      intro,
      keyInsight,
      highlightCards,
      body,
      ctaText,
      ctaUrl,
      includeMeetingCard,
      signOffName,
      signOffRole,
    });

    return NextResponse.json(
      {
        success: true,
        agent: "Muse AI",
        format: "Grow Orbit Branded HTML",
        subject: subject,
        previewText: previewText || "",
        compiledHtml: compiledHtml,
        htmlLength: compiledHtml.length,
        instructionsForMuse: "You can send this exact 'compiledHtml' to your client or email service provider, or preview it directly.",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("[MuseAI Email Template Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to compile Grow Orbit email template",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
