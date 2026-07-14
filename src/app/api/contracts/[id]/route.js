import { NextResponse } from "next/server";
import { 
  getDocData, updateDocData, deleteDocData, setSubcollectionDoc, getSubcollectionDocs 
} from "@/utils/dbHelper";

function formatRetainerValue(val) {
  if (!val) return "—";
  const clean = String(val).trim().replace(/[\$,]/g, "");
  const num = Number(clean);
  return (!isNaN(num) && clean !== "") ? `$${num.toLocaleString()}` : val;
}

function formatInvestmentValue(val) {
  if (!val) return "—";
  const clean = String(val).trim().replace(/[\$,]/g, "");
  const num = Number(clean);
  return (!isNaN(num) && clean !== "") ? `$${num.toLocaleString()} USD` : val;
}

function buildServicesHtml(services, monthlyRetainer) {
  const items = (services && services.length > 0) ? services : [];
  if (items.length === 0 && !monthlyRetainer) return "";

  let rows = "";
  let total = 0;
  items.forEach((s, i) => {
    const price = Number(s.price) || 0;
    total += price;
    const descHtml = s.description ? `<div style="font-size: 11px; color: #64748b; font-weight: 400; margin-top: 4px; line-height: 1.4;">${s.description}</div>` : "";
    rows += `
      <tr>
        <td style="padding: 14px 16px; font-size: 13px; color: #334155; border-bottom: 1px solid #f1f5f9; vertical-align: top;">${i + 1}</td>
        <td style="padding: 14px 16px; font-size: 13px; color: #0f172a; font-weight: 600; border-bottom: 1px solid #f1f5f9; vertical-align: top;">
          <div>${s.name || "—"}</div>
          ${descHtml}
        </td>
        <td style="padding: 14px 16px; font-size: 13px; color: #0f172a; font-weight: 700; text-align: right; border-bottom: 1px solid #f1f5f9; vertical-align: top;">$${price.toLocaleString()}</td>
      </tr>`;
  });

  if (total === 0 && monthlyRetainer) {
    const clean = String(monthlyRetainer).trim().replace(/[\$,]/g, "");
    const num = Number(clean);
    total = (!isNaN(num) && clean !== "") ? num : 0;
  }

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
            <td colspan="2" style="padding: 14px 16px; font-size: 14px; font-weight: 800; color: #0f172a; text-align: right;">Total Amount</td>
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
    "{{term_commitment}}": content.termCommitmentText || "The initial term is <strong>{{initial_term}}</strong>, renewing monthly. Either party may terminate with 30 days written notice.",
    "{{payment_terms_text}}": content.paymentTermsText || "Payment will be initiated immediately upon contract signature binding. Subsequent monthly investments are processed on the 1st of each billing cycle.",
    "{{client_responsibilities}}": content.clientResponsibilitiesText || "Client will provide necessary access (Seller Central, Ads, Brand Registry). Performance depends on inventory, market, and factors beyond Agency control.",
    "{{confidentiality_termination}}": content.confidentialityTerminationText || "Both parties agree to keep all non-public information confidential. Agreements can be terminated with 30 days written notice after the initial term.",
    "{{governing_law}}": content.governingLawText || "This agreement is governed by the laws of the jurisdiction where Grow Orbit is registered.",
    "{{client_name}}": content.clientName || "—",
    "{{company_name}}": content.companyName || "—",
    "{{client_email}}": content.clientEmail || "—",
    "{{client_phone}}": content.clientPhone || "—",
    "{{requested_service}}": content.requestedService || "—",
    "{{monthly_retainer}}": formatRetainerValue(content.monthlyRetainer),
    "{{term_length}}": content.termLength || "—",
    "{{payment_terms}}": content.paymentTerms || "—",
    "{{location}}": content.location || "—",
    "{{auto_renewal}}": content.autoRenewal || "—",
    "{{monthly_investment}}": formatInvestmentValue(content.monthlyRetainer),
    "{{initial_term}}": content.termLength || "—",
    "{{contract_date}}": formatDate(content.contractDate),
    "{{start_date}}": formatDate(content.startDate),
    "{{end_date}}": formatDate(content.endDate),
    "{{services_list}}": buildServicesHtml(content.services, content.monthlyRetainer),
  };

  // Fallback for older contracts that had "and the Client" instead of placeholders
  if (!text.includes("{{client_name}}")) {
    const clientStr = content.companyName 
      ? `<strong>${content.clientName || "—"}</strong> of <strong>${content.companyName}</strong>`
      : `<strong>${content.clientName || "—"}</strong>`;
    text = text
      .replace(/and\s+the\s+Client\s*\("Client"\)/gi, `and ${clientStr} ("Client")`)
      .replace(/and\s+the\s+Client\s*\(“Client”\)/gi, `and ${clientStr} ("Client")`);
  }

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

export async function GET(request, context) {
  try {
    const params = await context.params;
    const { id } = params;

    const contractData = await getDocData("contracts", id);
    if (!contractData) {
      return NextResponse.json({ success: false, error: "Contract not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, contract: { id, ...contractData } });
  } catch (error) {
    console.error("GET contract error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, context) {
  try {
    const params = await context.params;
    const { id } = params;
    const body = await request.json();

    const contractData = await getDocData("contracts", id);
    if (!contractData) {
      return NextResponse.json({ success: false, error: "Contract not found" }, { status: 404 });
    }

    const {
      clientName, companyName, clientEmail, clientPhone,
      requestedService, monthlyRetainer, termLength, paymentTerms,
      contractDate, startDate, endDate, notes, templateBody,
      expirationDays, customExpirationDate, status,
      location, autoRenewal, services,
      termCommitmentText, paymentTermsText, clientResponsibilitiesText,
      confidentialityTerminationText, governingLawText
    } = body;

    let expiresAt = contractData.expiresAt || null;
    if (expirationDays) {
      if (expirationDays === "none") {
        expiresAt = null;
      } else if (expirationDays !== "custom") {
        const days = parseInt(expirationDays, 10);
        const date = new Date();
        date.setDate(date.getDate() + days);
        expiresAt = date;
      } else if (expirationDays === "custom" && customExpirationDate) {
        expiresAt = new Date(customExpirationDate);
      }
    }

    const contentFields = {
      clientName: clientName !== undefined ? clientName : (contractData.clientName || ""),
      companyName: companyName !== undefined ? companyName : (contractData.companyName || ""),
      clientEmail: clientEmail !== undefined ? clientEmail : (contractData.clientEmail || ""),
      clientPhone: clientPhone !== undefined ? clientPhone : (contractData.clientPhone || ""),
      requestedService: requestedService !== undefined ? requestedService : (contractData.requestedService || ""),
      monthlyRetainer: monthlyRetainer !== undefined ? (monthlyRetainer !== null ? String(monthlyRetainer) : "") : (contractData.monthlyRetainer !== undefined && contractData.monthlyRetainer !== null ? String(contractData.monthlyRetainer) : ""),
      termLength: termLength !== undefined ? termLength : (contractData.termLength || "3 Months"),
      paymentTerms: paymentTerms !== undefined ? paymentTerms : (contractData.paymentTerms || "Net 15"),
      location: location !== undefined ? location : (contractData.location || "USA"),
      autoRenewal: autoRenewal !== undefined ? autoRenewal : (contractData.autoRenewal || "Yes, after 3 months"),
      contractDate: contractDate ? new Date(contractDate) : (contractData.contractDate ? new Date(contractData.contractDate) : new Date()),
      startDate: startDate ? new Date(startDate) : (contractData.startDate ? new Date(contractData.startDate) : new Date()),
      endDate: endDate ? new Date(endDate) : (contractData.endDate ? new Date(contractData.endDate) : null),
      notes: notes !== undefined ? notes : (contractData.notes || ""),
      templateBody: templateBody !== undefined ? templateBody : (contractData.templateBody || ""),
      services: services !== undefined ? services : (contractData.services || []),
      termCommitmentText: termCommitmentText !== undefined ? termCommitmentText : (contractData.termCommitmentText || ""),
      paymentTermsText: paymentTermsText !== undefined ? paymentTermsText : (contractData.paymentTermsText || ""),
      clientResponsibilitiesText: clientResponsibilitiesText !== undefined ? clientResponsibilitiesText : (contractData.clientResponsibilitiesText || ""),
      confidentialityTerminationText: confidentialityTerminationText !== undefined ? confidentialityTerminationText : (contractData.confidentialityTerminationText || ""),
      governingLawText: governingLawText !== undefined ? governingLawText : (contractData.governingLawText || "")
    };

    const renderedHtml = compileContractBody(contentFields.templateBody, contentFields);

    const updateData = { ...contentFields, renderedHtml, expiresAt, updatedAt: new Date() };

    if (status && ["draft", "awaiting_review"].includes(status)) {
      updateData.status = status;
    }

    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Unknown";

    const editLog = {
      event: body.isAutoSave ? "Auto Saved" : "Edited",
      timestamp: new Date(),
      ip, userAgent,
      userEmail: "Admin",
      os: "", browser: "",
      meta: { version: contractData.currentVersion }
    };

    await updateDocData("contracts", id, {
      ...updateData,
      auditTrail: [...(contractData.auditTrail || []), editLog]
    });

    const currentVersionStr = String(contractData.currentVersion);
    const versionData = {
      versionNumber: contractData.currentVersion,
      content: contentFields,
      renderedHtml,
      updatedAt: new Date(),
      createdBy: "system",
      createdByName: "Admin"
    };

    await setSubcollectionDoc("contracts", id, "versions", currentVersionStr, versionData);

    return NextResponse.json({ success: true, contract: { id, ...contractData, ...updateData } });
  } catch (error) {
    console.error("PATCH contract error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const params = await context.params;
    const { id } = params;

    const contractData = await getDocData("contracts", id);
    if (!contractData) {
      return NextResponse.json({ success: false, error: "Contract not found" }, { status: 404 });
    }

    const versions = await getSubcollectionDocs("contracts", id, "versions");
    for (const ver of versions) {
      await deleteDocData(`contracts/${id}/versions`, ver.id);
    }

    await deleteDocData("contracts", id);

    return NextResponse.json({ success: true, message: "Contract deleted successfully" });
  } catch (error) {
    console.error("DELETE contract error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
