export const DEFAULT_CLAUSES = [
  {
    id: "term-commitment",
    title: "TERM & COMMITMENT",
    text: "The initial term is <strong>{{initial_term}}</strong>, renewing monthly. Either party may terminate with 30 days written notice."
  },
  {
    id: "payment-terms",
    title: "PAYMENT TERMS",
    text: "Payment will be initiated immediately upon contract signature binding. Subsequent monthly investments are processed on the 1st of each billing cycle."
  },
  {
    id: "client-responsibilities",
    title: "CLIENT RESPONSIBILITIES",
    text: "Client will provide necessary access (Seller Central, Ads, Brand Registry). Performance depends on inventory, market, and factors beyond Agency control."
  },
  {
    id: "confidentiality-termination",
    title: "CONFIDENTIALITY & TERMINATION",
    text: "Both parties agree to keep all non-public information confidential. Agreements can be terminated with 30 days written notice after the initial term."
  },
  {
    id: "governing-law",
    title: "GOVERNING LAW",
    text: "This agreement is governed by the laws of the jurisdiction where Grow Orbit is registered."
  }
];

export const BUILT_IN_TEMPLATES = [
  {
    id: "amazon-full",
    name: "Amazon Growth Partnership",
    category: "Amazon",
    body: `<h2>AMAZON GROWTH PARTNERSHIP AGREEMENT</h2>
<p>This Agreement is made between Grow Orbit ("Agency") and <strong>{{client_name}}</strong>.</p>

{{services_list}}

{{clauses_list}}

<p><em>IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.</em></p>`
  }
];

export const SERVICE_PRESETS = [
  { name: "Full Amazon Account Management & Brand Launch", description: "Comprehensive end-to-end management covering Product Hunting & Opportunity Analysis, Supplier Sourcing & Manufacturing Coordination, Graphic Listing Images & 3D Renders, Brand Storefront & Premium A+ Design, SEO Copywriting, and Launch PPC Management. Term: 8 Months or first inventory sell-through.", price: "8500" },
  { name: "Full Account Management", description: "End-to-end management of inventory, listing optimization, PPC, and daily store operations.", price: "2500" },
  { name: "Amazon PPC Management", description: "Optimization, monitoring, and scaling of Sponsored Products, Brands, Display, and Video campaigns.", price: "1500" },
  { name: "SEO & Listing Optimization", description: "In-depth keyword research, rewriting titles, bullet points, and backend search terms.", price: "500" },
  { name: "Brand Store & A+ Design", description: "Design, layout, and implementation of premium A+ Content and customized storefront.", price: "800" },
  { name: "Account Audit & Strategy", description: "In-depth account analysis, PPC auditing, inventory check, and custom growth road map.", price: "1000" }
];

export const VARIABLES = [
  { label: "Client Name",  tag: "{{client_name}}" },
  { label: "Company",      tag: "{{company_name}}" },
  { label: "Email",        tag: "{{client_email}}" },
  { label: "Location",     tag: "{{location}}" },
  { label: "Initial Term", tag: "{{initial_term}}" },
  { label: "Monthly Inv",  tag: "{{monthly_investment}}" },
  { label: "Auto Renewal", tag: "{{auto_renewal}}" },
  { label: "Date",         tag: "{{contract_date}}" },
  { label: "Services",     tag: "{{services_list}}" },
  { label: "Terms & Conditions", tag: "{{clauses_list}}" }
];

export function formatRetainerValue(val) {
  if (!val) return "—";
  const clean = String(val).trim().replace(/[\$,]/g, "");
  const num = Number(clean);
  return (!isNaN(num) && clean !== "") ? `$${num.toLocaleString()}` : val;
}

export function formatInvestmentValue(val) {
  if (!val) return "—";
  const clean = String(val).trim().replace(/[\$,]/g, "");
  const num = Number(clean);
  return (!isNaN(num) && clean !== "") ? `$${num.toLocaleString()} USD` : val;
}

export function formatDate(val) {
  if (!val) return "—";
  if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}$/.test(val.trim())) {
    const [y, m, d] = val.trim().split("-");
    const dateObj = new Date(Number(y), Number(m) - 1, Number(d));
    return dateObj.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }
  let d = null;
  if (val instanceof Date) {
    d = val;
  } else if (typeof val === "object") {
    if (typeof val.toDate === "function") {
      d = val.toDate();
    } else {
      const seconds = val.seconds !== undefined ? val.seconds : val._seconds;
      if (seconds !== undefined) {
        d = new Date(seconds * 1000);
      }
    }
  } else {
    d = new Date(val);
  }
  return (d && !isNaN(d.getTime()))
    ? d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : String(val);
}

export function buildServicesHtml(services, monthlyRetainer) {
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

const CLAUSE_ICONS = [
  '<path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  '<circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/>',
  '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  '<path d="M14 13.5V16.5l-4 4-4-4 4-4h3"/><path d="M14 13.5L20 7.5a2.12 2.12 0 0 0-3-3l-6 6"/><path d="M15.5 15l2 2"/><path d="M8.5 8l-2-2"/>'
];

export function buildClausesHtml(clauses, content = {}) {
  const items = Array.isArray(clauses) && clauses.length > 0 ? clauses : DEFAULT_CLAUSES;

  return items.map((clause, idx) => {
    const num = idx + 1;
    const paddedNumber = String(num).padStart(2, "0");
    const iconPath = CLAUSE_ICONS[idx % CLAUSE_ICONS.length] || CLAUSE_ICONS[0];

    let text = clause.text || "";
    if (content) {
      text = text
        .split("{{initial_term}}").join(content.termLength || "—")
        .split("{{term_length}}").join(content.termLength || "—")
        .split("{{client_name}}").join(content.clientName || "—")
        .split("{{company_name}}").join(content.companyName || "—")
        .split("{{monthly_investment}}").join(formatInvestmentValue(content.monthlyRetainer))
        .split("{{auto_renewal}}").join(content.autoRenewal || "—")
        .split("{{payment_terms}}").join(content.paymentTerms || "—");
    }

    return `
      <div style="display: flex; gap: 24px; padding: 24px 0; border-bottom: 1px solid #f1f5f9;">
        <div style="flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; background: #fff7ed; border-radius: 12px; padding: 12px 16px; width: 85px; height: 48px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${iconPath}
          </svg>
          <span style="color: #ea580c; font-weight: 800; font-size: 15px;">${paddedNumber}</span>
        </div>
        <div style="flex: 1;">
          <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.02em;">${clause.title || `Clause ${num}`}</div>
          <div style="font-size: 13px; line-height: 1.6; color: #334155;">${text}</div>
        </div>
      </div>
    `;
  }).join("\n");
}

export function migrateToPlaceholders(body) {
  if (!body) return "";
  let updated = body;

  // Replace legacy full clause blocks with {{clauses_list}} if they match default template patterns
  const hasLegacyClausesPattern = /<h3>1\.\s*TERM\s*&\s*COMMITMENT<\/h3>/i.test(updated) &&
    /<h3>5\.\s*GOVERNING\s*LAW<\/h3>/i.test(updated);

  if (hasLegacyClausesPattern && !updated.includes("{{clauses_list}}")) {
    updated = updated.replace(
      /<h3>1\.\s*TERM\s*&\s*COMMITMENT<\/h3>[\s\S]*?<h3>5\.\s*GOVERNING\s*LAW<\/h3>\s*<p>[\s\S]*?<\/p>/i,
      "{{clauses_list}}"
    );
  }

  // 1. Term & Commitment
  updated = updated.replace(
    /The\s+initial\s+term\s+is\s+<strong>\{\{initial_term\}\}<\/strong>,\s*renewing\s+monthly\.\s*Either\s+party\s+may\s+terminate\s+with\s+30\s+days\s+written\s+notice\./gi,
    "{{term_commitment}}"
  );
  updated = updated.replace(
    /The\s+initial\s+term\s+is\s+<strong>6\s+Months<\/strong>,\s*renewing\s+monthly\.\s*Either\s+party\s+may\s+terminate\s+with\s+30\s+days\s+written\s+notice\./gi,
    "{{term_commitment}}"
  );
  updated = updated.replace(
    /The\s+initial\s+term\s+is\s+<strong>3\s+Months<\/strong>,\s*renewing\s+monthly\.\s*Either\s+party\s+may\s+terminate\s+with\s+30\s+days\s+written\s+notice\./gi,
    "{{term_commitment}}"
  );

  // 2. Payment Terms
  updated = updated.replace(
    /Payment\s+will\s+be\s+initiated\s+immediately\s+upon\s+contract\s+signature\s+binding\.\s*Subsequent\s+monthly\s+investments\s+are\s+processed\s+on\s+the\s+1st\s+of\s+each\s+billing\s+cycle\./gi,
    "{{payment_terms_text}}"
  );

  // 3. Client Responsibilities
  updated = updated.replace(
    /Client\s+will\s+provide\s+necessary\s+access\s*\(Seller\s+Central,\s*Ads,\s*Brand\s+Registry\)\.\s*Performance\s+depends\s+on\s+inventory,\s*market,\s*and\s+factors\s+beyond\s+Agency\s+control\./gi,
    "{{client_responsibilities}}"
  );

  // 4. Confidentiality & Termination
  updated = updated.replace(
    /Both\s+parties\s+agree\s+to\s+keep\s+all\s+non-public\s+information\s+confidential\.\s*Agreements\s+can\s+be\s+terminated\s+with\s+30\s+days\s+written\s+notice\s+after\s+the\s+initial\s+term\./gi,
    "{{confidentiality_termination}}"
  );

  // 5. Governing Law
  updated = updated.replace(
    /This\s+agreement\s+is\s+governed\s+by\s+the\s+laws\s+of\s+the\s+jurisdiction\s+where\s+Grow\s+Orbit\s+is\s+registered\./gi,
    "{{governing_law}}"
  );

  return updated;
}

export function compileContractBody(body, content = {}) {
  let text = body || "";
  text = migrateToPlaceholders(text);

  const formatDate = (val) => {
    if (!val) return "—";
    const d = new Date(val);
    return isNaN(d.getTime()) ? val : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  // Clean up legacy intro line patterns
  text = text.replace(
    /and\s+<strong>\{\{client_name\}\}<\/strong>\s+of\s+<strong>\{\{company_name\}\}<\/strong>\s*\("Client"\)\s*on\s+the\s+date\s+above\./gi,
    'and <strong>{{client_name}}</strong>.'
  );
  text = text.replace(
    /and\s+<strong>\{\{client_name\}\}<\/strong>\s+of\s+—\s*\("Client"\)\s*on\s+the\s+date\s+above\./gi,
    'and <strong>{{client_name}}</strong>.'
  );
  text = text.replace(
    /and\s+<strong>\{\{client_name\}\}<\/strong>\s+of\s+<strong>—<\/strong>\s*\("Client"\)\s*on\s+the\s+date\s+above\./gi,
    'and <strong>{{client_name}}</strong>.'
  );
  text = text.replace(
    /and\s+the\s+Client\s*\("Client"\)\s*on\s+the\s+date\s+above\./gi,
    'and <strong>{{client_name}}</strong>.'
  );
  text = text.replace(
    /and\s+the\s+Client\s*\("Client"\)/gi,
    'and <strong>{{client_name}}</strong>'
  );

  // Handle dynamic clauses list
  const clauses = Array.isArray(content.clauses) && content.clauses.length > 0 
    ? content.clauses 
    : DEFAULT_CLAUSES;

  const clausesHtml = buildClausesHtml(clauses, content);

  const replacements = {
    "{{clauses_list}}": clausesHtml,
    "{{term_commitment}}": content.termCommitmentText || clauses[0]?.text || "The initial term is <strong>{{initial_term}}</strong>, renewing monthly. Either party may terminate with 30 days written notice.",
    "{{payment_terms_text}}": content.paymentTermsText || clauses[1]?.text || "Payment will be initiated immediately upon contract signature binding. Subsequent monthly investments are processed on the 1st of each billing cycle.",
    "{{client_responsibilities}}": content.clientResponsibilitiesText || clauses[2]?.text || "Client will provide necessary access (Seller Central, Ads, Brand Registry). Performance depends on inventory, market, and factors beyond Agency control.",
    "{{confidentiality_termination}}": content.confidentialityTerminationText || clauses[3]?.text || "Both parties agree to keep all non-public information confidential. Agreements can be terminated with 30 days written notice after the initial term.",
    "{{governing_law}}": content.governingLawText || clauses[4]?.text || "This agreement is governed by the laws of the jurisdiction where Grow Orbit is registered.",
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

  Object.entries(replacements).forEach(([placeholder, value]) => {
    text = text.split(placeholder).join(value);
  });

  // Auto-format any remaining raw <h3> clauses if present
  text = text.replace(/<h3>(\d+)\.\s*(.*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g, (match, number, title, paragraphText) => {
    const num = parseInt(number, 10) || 1;
    const iconPath = CLAUSE_ICONS[(num - 1) % CLAUSE_ICONS.length] || CLAUSE_ICONS[0];
    const paddedNumber = String(num).padStart(2, "0");

    return `
      <div style="display: flex; gap: 24px; padding: 24px 0; border-bottom: 1px solid #f1f5f9;">
        <div style="flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; background: #fff7ed; border-radius: 12px; padding: 12px 16px; width: 85px; height: 48px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${iconPath}
          </svg>
          <span style="color: #ea580c; font-weight: 800; font-size: 15px;">${paddedNumber}</span>
        </div>
        <div style="flex: 1;">
          <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.02em;">${title}</div>
          <div style="font-size: 13px; line-height: 1.6; color: #334155;">${paragraphText}</div>
        </div>
      </div>
    `;
  });

  return text;
}
