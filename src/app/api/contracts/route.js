import { NextResponse } from "next/server";
import { queryDocs, addDocData, setSubcollectionDoc, getNextSequenceNumber } from "@/utils/dbHelper";

function buildServicesHtml(services, monthlyRetainer) {
  const items = (services && services.length > 0) ? services : [];
  if (items.length === 0 && !monthlyRetainer) return "";

  let rows = "";
  let total = 0;
  items.forEach((s, i) => {
    const price = Number(s.price) || 0;
    total += price;
    rows += `
      <tr>
        <td style="padding: 14px 16px; font-size: 13px; color: #334155; border-bottom: 1px solid #f1f5f9;">${i + 1}</td>
        <td style="padding: 14px 16px; font-size: 13px; color: #0f172a; font-weight: 600; border-bottom: 1px solid #f1f5f9;">${s.name || "—"}</td>
        <td style="padding: 14px 16px; font-size: 13px; color: #0f172a; font-weight: 700; text-align: right; border-bottom: 1px solid #f1f5f9;">$${price.toLocaleString()}</td>
      </tr>`;
  });

  if (total === 0 && monthlyRetainer) total = Number(monthlyRetainer);

  return `
    <div style="margin: 8px 0 32px 0;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
        <div style="flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: #fff7ed; border-radius: 10px; width: 40px; height: 40px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        </div>
        <div>
          <div style="font-size: 15px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.02em;">Services & Pricing</div>
          <div style="font-size: 11px; color: #64748b;">The following services are included in this agreement</div>
        </div>
      </div>
      <table style="width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <thead>
          <tr style="background: #0f172a;">
            <th style="padding: 12px 16px; font-size: 11px; font-weight: 700; color: #94a3b8; text-align: left; text-transform: uppercase; letter-spacing: 0.05em; width: 50px;">#</th>
            <th style="padding: 12px 16px; font-size: 11px; font-weight: 700; color: #94a3b8; text-align: left; text-transform: uppercase; letter-spacing: 0.05em;">Service</th>
            <th style="padding: 12px 16px; font-size: 11px; font-weight: 700; color: #94a3b8; text-align: right; text-transform: uppercase; letter-spacing: 0.05em; width: 120px;">Price</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
        <tfoot>
          <tr style="background: #f8fafc;">
            <td colspan="2" style="padding: 14px 16px; font-size: 14px; font-weight: 800; color: #0f172a; text-align: right;">Total Monthly Investment</td>
            <td style="padding: 14px 16px; font-size: 16px; font-weight: 800; color: #ea580c; text-align: right;">$${total.toLocaleString()} USD</td>
          </tr>
        </tfoot>
      </table>
    </div>`;
}

function compileContractBody(body, content) {
  let text = body || "";
  
  const formatDate = (val) => {
    if (!val) return "—";
    const d = new Date(val);
    return isNaN(d.getTime()) ? val : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const replacements = {
    "{{client_name}}": content.clientName || "—",
    "{{company_name}}": content.companyName || "—",
    "{{client_email}}": content.clientEmail || "—",
    "{{client_phone}}": content.clientPhone || "—",
    "{{requested_service}}": content.requestedService || "—",
    "{{monthly_retainer}}": content.monthlyRetainer ? `$${Number(content.monthlyRetainer).toLocaleString()}` : "—",
    "{{term_length}}": content.termLength || "—",
    "{{payment_terms}}": content.paymentTerms || "—",
    "{{location}}": content.location || "—",
    "{{auto_renewal}}": content.autoRenewal || "—",
    "{{monthly_investment}}": content.monthlyRetainer ? `$${Number(content.monthlyRetainer).toLocaleString()} USD` : "—",
    "{{initial_term}}": content.termLength || "—",
    "{{contract_date}}": formatDate(content.contractDate),
    "{{start_date}}": formatDate(content.startDate),
    "{{end_date}}": formatDate(content.endDate),
    "{{services_list}}": buildServicesHtml(content.services, content.monthlyRetainer),
  };

  Object.entries(replacements).forEach(([placeholder, value]) => {
    text = text.split(placeholder).join(value);
  });

  // Auto-format clauses
  text = text.replace(/<h3>(\d+)\.\s*(.*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g, (match, number, title, paragraphText) => {
    let iconPath = '';
    switch(number) {
      case '1': iconPath = '<path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'; break;
      case '2': iconPath = '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'; break;
      case '3': iconPath = '<circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/>'; break;
      case '4': iconPath = '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'; break;
      case '5': iconPath = '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'; break;
      case '6': iconPath = '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'; break;
      case '7': iconPath = '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>'; break;
      case '8': iconPath = '<path d="M14 13.5V16.5l-4 4-4-4 4-4h3"/><path d="M14 13.5L20 7.5a2.12 2.12 0 0 0-3-3l-6 6"/><path d="M15.5 15l2 2"/><path d="M8.5 8l-2-2"/>'; break;
      default: iconPath = '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>';
    }

    const paddedNumber = number.padStart(2, '0');
    
    return `
      <div style="display: flex; gap: 24px; padding: 24px 0; border-bottom: 1px solid #f1f5f9;">
        <div style="flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; background: #fff7ed; border-radius: 12px; padding: 12px 16px; width: 85px; height: 48px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${iconPath}
          </svg>
          <span style="color: #ea580c; font-weight: 800; font-size: 15px;">${paddedNumber}</span>
        </div>
        <div>
          <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.02em;">${title}</div>
          <div style="font-size: 13px; line-height: 1.6; color: #334155;">${paragraphText}</div>
        </div>
      </div>
    `;
  });

  return text;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get("leadId");

    if (!leadId) {
      return NextResponse.json({ success: false, error: "Missing leadId parameter" }, { status: 400 });
    }

    const contracts = await queryDocs("contracts", "leadId", "==", leadId);
    
    contracts.sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
      return dateB - dateA;
    });

    return NextResponse.json({ success: true, contracts });
  } catch (error) {
    console.error("GET contracts error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      leadId,
      clientName,
      companyName,
      clientEmail,
      clientPhone,
      requestedService,
      monthlyRetainer,
      termLength,
      paymentTerms,
      templateBody,
      expirationDays,
      customExpirationDate,
      location,
      autoRenewal,
      services
    } = body;

    if (!leadId) {
      return NextResponse.json({ success: false, error: "Missing leadId" }, { status: 400 });
    }

    const seqNum = await getNextSequenceNumber();
    const year = new Date().getFullYear();
    const contractNumber = `GO-${year}-${String(seqNum).padStart(4, "0")}`;

    let expiresAt = null;
    if (expirationDays && expirationDays !== "none") {
      if (expirationDays === "custom" && customExpirationDate) {
        expiresAt = new Date(customExpirationDate);
      } else {
        const days = parseInt(expirationDays, 10);
        const date = new Date();
        date.setDate(date.getDate() + days);
        expiresAt = date;
      }
    }

    const contentFields = {
      clientName: clientName || "",
      companyName: companyName || "",
      clientEmail: clientEmail || "",
      clientPhone: clientPhone || "",
      requestedService: requestedService || "",
      monthlyRetainer: Number(monthlyRetainer) || 0,
      termLength: termLength || "3 Months",
      paymentTerms: paymentTerms || "Net 15",
      location: location || "USA",
      autoRenewal: autoRenewal || "Yes, after 3 months",
      contractDate: new Date(),
      startDate: new Date(),
      endDate: null,
      notes: "",
      templateBody: templateBody || "",
      services: services || []
    };

    const renderedHtml = compileContractBody(contentFields.templateBody, contentFields);

    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Unknown";

    const initialAuditLog = {
      event: "Contract Created",
      timestamp: new Date(),
      ip,
      userAgent,
      userEmail: "Admin",
      os: "",
      browser: "",
      meta: { version: 1 }
    };

    const newContractData = {
      ...contentFields,
      contractNumber,
      leadId,
      createdBy: "system",
      createdByName: "Admin",
      status: "draft",
      currentVersion: 1,
      templateId: "custom",
      expiresAt,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: null,
      signedAt: null,
      voidReason: null,
      shareToken: null,
      signature: null,
      finalPdfUrl: null,
      analytics: {
        firstViewedAt: null,
        lastViewedAt: null,
        viewsCount: 0,
        totalReadingTimeMs: 0
      },
      auditTrail: [initialAuditLog]
    };

    const newId = await addDocData("contracts", newContractData);

    const versionData = {
      versionNumber: 1,
      content: contentFields,
      renderedHtml,
      createdAt: new Date(),
      createdBy: "system",
      createdByName: "Admin"
    };

    await setSubcollectionDoc("contracts", newId, "versions", "1", versionData);

    return NextResponse.json({
      success: true,
      contract: { id: newId, ...newContractData }
    });
  } catch (error) {
    console.error("POST contract error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
