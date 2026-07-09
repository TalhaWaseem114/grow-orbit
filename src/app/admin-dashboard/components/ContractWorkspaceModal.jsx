"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, Save, Send, Eye, EyeOff, Copy, Check, Loader, FileText, Plus, ChevronDown, Link } from "lucide-react";

// ─── Built-in Templates ───────────────────────────────────────────────────────
const BUILT_IN_TEMPLATES = [
  {
    id: "amazon-full",
    name: "Amazon Full Service",
    category: "Amazon",
    body: `<h2>Service Agreement — Amazon Growth Package</h2>

<p>This Service Agreement is entered into as of <strong>{{contract_date}}</strong> between <strong>Grow Orbit</strong> ("Agency") and <strong>{{client_name}}</strong>, representative of <strong>{{company_name}}</strong> ("Client").</p>

<h3>1. Services</h3>
<p>Grow Orbit will provide the following Amazon services for <strong>{{requested_service}}</strong>:</p>
<ul>
  <li>Full Amazon listing optimization (title, bullets, description, backend keywords)</li>
  <li>A+ Content / Enhanced Brand Content design</li>
  <li>Custom product infographic images (mobile-optimized)</li>
  <li>Keyword research & competitor analysis</li>
  <li>PPC campaign setup & management</li>
  <li>Monthly performance reports</li>
</ul>

<h3>2. Investment</h3>
<p>Monthly retainer: <strong>{{monthly_retainer}}</strong>, billed on a <strong>{{payment_terms}}</strong> basis.</p>

<h3>3. Term</h3>
<p>This agreement begins on <strong>{{start_date}}</strong> and operates on a <strong>{{term_length}}</strong> basis. Either party may terminate with 15 days written notice.</p>

<h3>4. Deliverables Timeline</h3>
<p>Initial deliverables will be provided within 7–10 business days of onboarding. Ongoing work will follow a monthly cycle.</p>

<h3>5. Client Responsibilities</h3>
<p>Client agrees to provide timely access to Amazon Seller Central, product images/assets, and feedback within 3 business days of receiving drafts.</p>

<h3>6. Confidentiality</h3>
<p>Both parties agree to keep all proprietary information confidential and not disclose it to third parties without prior written consent.</p>

<p><em>IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.</em></p>`
  },
  {
    id: "listing-optimization",
    name: "Listing Optimization Only",
    category: "Amazon",
    body: `<h2>Listing Optimization Agreement</h2>

<p>This Agreement is entered into as of <strong>{{contract_date}}</strong> between <strong>Grow Orbit</strong> and <strong>{{client_name}}</strong> of <strong>{{company_name}}</strong>.</p>

<h3>1. Scope of Work</h3>
<p>Grow Orbit will optimize the Amazon listings for <strong>{{requested_service}}</strong>, including:</p>
<ul>
  <li>Keyword-rich title (max 200 characters)</li>
  <li>5 optimized bullet points</li>
  <li>Product description / A+ Content copy</li>
  <li>Backend search terms</li>
  <li>2 rounds of revisions included</li>
</ul>

<h3>2. Investment</h3>
<p>One-time project fee: <strong>{{monthly_retainer}}</strong>, due upon signing. Payment terms: <strong>{{payment_terms}}</strong>.</p>

<h3>3. Delivery</h3>
<p>Work will be delivered within 5–7 business days of receiving all required product information from the Client.</p>

<h3>4. Revisions</h3>
<p>Two rounds of revisions are included. Additional revisions are billed at $50/hour.</p>

<p><em>Both parties agree to the terms above as of <strong>{{contract_date}}</strong>.</em></p>`
  },
  {
    id: "seo-growth",
    name: "SEO & Digital Growth",
    category: "SEO",
    body: `<h2>Digital Growth Service Agreement</h2>

<p>This Agreement is made as of <strong>{{contract_date}}</strong> between <strong>Grow Orbit</strong> and <strong>{{client_name}}</strong> of <strong>{{company_name}}</strong>.</p>

<h3>1. Services Included</h3>
<ul>
  <li>Technical SEO audit & fix implementation</li>
  <li>Monthly content creation (4 blog posts)</li>
  <li>On-page optimization for target keywords</li>
  <li>Google Business Profile management</li>
  <li>Monthly analytics & ranking report</li>
</ul>

<h3>2. Investment</h3>
<p>Monthly retainer: <strong>{{monthly_retainer}}</strong>. Invoiced <strong>{{payment_terms}}</strong>.</p>

<h3>3. Term</h3>
<p>Agreement commences <strong>{{start_date}}</strong>. Minimum 3-month commitment, then <strong>{{term_length}}</strong> thereafter with 30 days' written notice to cancel.</p>

<h3>4. Performance</h3>
<p>SEO results typically take 3–6 months. Grow Orbit does not guarantee specific rankings but commits to industry-best practices and transparent reporting.</p>

<p><em>Agreed by both parties as of <strong>{{contract_date}}</strong>.</em></p>`
  },
  {
    id: "blank",
    name: "Blank — Start from Scratch",
    category: "Custom",
    body: `<h2>Service Agreement</h2>

<p>This Agreement is entered into as of <strong>{{contract_date}}</strong> between <strong>Grow Orbit</strong> and <strong>{{client_name}}</strong> of <strong>{{company_name}}</strong>.</p>

<h3>1. Services</h3>
<p>Describe the services here...</p>

<h3>2. Investment</h3>
<p>Monthly retainer: <strong>{{monthly_retainer}}</strong>. Payment terms: <strong>{{payment_terms}}</strong>.</p>

<h3>3. Term</h3>
<p>Start date: <strong>{{start_date}}</strong>. Duration: <strong>{{term_length}}</strong>.</p>

<p><em>Agreed by both parties as of <strong>{{contract_date}}</strong>.</em></p>`
  }
];

// ─── Variable chips ────────────────────────────────────────────────────────────
const VARIABLES = [
  { label: "Client Name",  tag: "{{client_name}}" },
  { label: "Company",      tag: "{{company_name}}" },
  { label: "Email",        tag: "{{client_email}}" },
  { label: "Phone",        tag: "{{client_phone}}" },
  { label: "Service",      tag: "{{requested_service}}" },
  { label: "Retainer $",   tag: "{{monthly_retainer}}" },
  { label: "Term",         tag: "{{term_length}}" },
  { label: "Payments",     tag: "{{payment_terms}}" },
  { label: "Date",         tag: "{{contract_date}}" },
  { label: "Start Date",   tag: "{{start_date}}" },
  { label: "End Date",     tag: "{{end_date}}" },
];

function compilePreview(body, fields) {
  const fmt = (v) => {
    if (!v) return "—";
    const d = new Date(v);
    return isNaN(d) ? v : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };
  return (body || "")
    .split("{{client_name}}").join(fields.clientName || "—")
    .split("{{company_name}}").join(fields.companyName || "—")
    .split("{{client_email}}").join(fields.clientEmail || "—")
    .split("{{client_phone}}").join(fields.clientPhone || "—")
    .split("{{requested_service}}").join(fields.requestedService || "—")
    .split("{{monthly_retainer}}").join(fields.monthlyRetainer ? `$${fields.monthlyRetainer}` : "—")
    .split("{{term_length}}").join(fields.termLength || "—")
    .split("{{payment_terms}}").join(fields.paymentTerms || "—")
    .split("{{contract_date}}").join(fmt(fields.contractDate))
    .split("{{start_date}}").join(fmt(fields.startDate))
    .split("{{end_date}}").join(fmt(fields.endDate));
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ContractWorkspaceModal({ contract, onClose, onRefreshLeads }) {
  const [currentContract, setCurrentContract] = useState(contract);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState("editor"); // "editor" | "templates"
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied] = useState(false);

  // Contract fields
  const [clientName, setClientName]           = useState(contract.clientName || "");
  const [companyName, setCompanyName]         = useState(contract.companyName || "");
  const [clientEmail, setClientEmail]         = useState(contract.clientEmail || "");
  const [clientPhone, setClientPhone]         = useState(contract.clientPhone || "");
  const [requestedService, setRequestedService] = useState(contract.requestedService || "");
  const [monthlyRetainer, setMonthlyRetainer] = useState(contract.monthlyRetainer || "");
  const [termLength, setTermLength]           = useState(contract.termLength || "Month-to-month");
  const [paymentTerms, setPaymentTerms]       = useState(contract.paymentTerms || "Net 15");
  const [contractDate, setContractDate]       = useState(
    contract.contractDate ? new Date(contract.contractDate?.toDate?.() || contract.contractDate).toISOString().substring(0,10) : new Date().toISOString().substring(0,10)
  );
  const [startDate, setStartDate]             = useState(
    contract.startDate ? new Date(contract.startDate?.toDate?.() || contract.startDate).toISOString().substring(0,10) : ""
  );
  const [templateBody, setTemplateBody]       = useState(contract.templateBody || BUILT_IN_TEMPLATES[0].body);

  const textareaRef = useRef(null);
  const autoSaveTimer = useRef(null);
  const isLocked = !["draft", "awaiting_review"].includes(currentContract.status);
  const shareLink = currentContract.shareToken
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/sign/${currentContract.shareToken}`
    : null;

  const fields = { clientName, companyName, clientEmail, clientPhone, requestedService, monthlyRetainer, termLength, paymentTerms, contractDate, startDate };

  // ── Auto-save ──
  const triggerAutoSave = useCallback((extra = {}) => {
    if (isLocked) return;
    setSaveStatus("Saving...");
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/contracts/${currentContract.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clientName, companyName, clientEmail, clientPhone, requestedService, monthlyRetainer, termLength, paymentTerms, contractDate, startDate, templateBody, isAutoSave: true, ...extra })
        });
        const data = await res.json();
        if (data.success) { setSaveStatus("Saved"); setCurrentContract(data.contract); onRefreshLeads?.(); }
        else setSaveStatus("Error");
      } catch { setSaveStatus("Error"); }
    }, 2500);
  }, [currentContract.id, clientName, companyName, clientEmail, clientPhone, requestedService, monthlyRetainer, termLength, paymentTerms, contractDate, startDate, templateBody, isLocked]);

  // ── Insert variable at cursor ──
  const insertVar = (tag) => {
    const el = textareaRef.current;
    if (!el) return;
    const s = el.selectionStart, e = el.selectionEnd;
    const newVal = templateBody.substring(0, s) + tag + templateBody.substring(e);
    setTemplateBody(newVal);
    setTimeout(() => { el.focus(); el.selectionStart = el.selectionEnd = s + tag.length; }, 0);
    triggerAutoSave({ templateBody: newVal });
  };

  // ── Apply built-in template ──
  const applyTemplate = (tpl) => {
    if (isLocked) return;
    setTemplateBody(tpl.body);
    setActiveTab("editor");
    triggerAutoSave({ templateBody: tpl.body });
  };

  // ── Publish / Send for signature ──
  const handlePublish = async () => {
    if (!window.confirm("This will lock the contract and generate a signing link. Continue?")) return;
    setIsSending(true);
    try {
      // Save first
      await fetch(`/api/contracts/${currentContract.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName, companyName, clientEmail, clientPhone, requestedService, monthlyRetainer, termLength, paymentTerms, contractDate, startDate, templateBody })
      });
      // Then publish
      const res = await fetch(`/api/contracts/${currentContract.id}/send`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        const updated = { ...currentContract, status: "awaiting_signature", shareToken: data.shareToken };
        setCurrentContract(updated);
        onRefreshLeads?.();
      } else {
        alert("Failed: " + data.error);
      }
    } catch (e) { alert("Error: " + e.message); }
    finally { setIsSending(false); }
  };

  // ── Copy link ──
  const copyLink = () => {
    if (!shareLink) return;
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusCfg = {
    draft: { label: "Draft", color: "#71717a" },
    awaiting_review: { label: "In Review", color: "#f97316" },
    awaiting_signature: { label: "Awaiting Signature", color: "#eab308" },
    viewed: { label: "Viewed", color: "#3b82f6" },
    signed: { label: "Signed ✍️", color: "#22c55e" },
    void: { label: "Voided", color: "#64748b" },
  }[currentContract.status] || { label: currentContract.status, color: "#71717a" };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ background: "#0f172a", borderRadius: "20px", width: "100%", maxWidth: "1100px", height: "90vh", display: "flex", flexDirection: "column", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
          <FileText size={18} color="#f97316" />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "15px" }}>{currentContract.contractNumber}</span>
              <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "20px", background: `${statusCfg.color}22`, color: statusCfg.color, border: `1px solid ${statusCfg.color}44` }}>{statusCfg.label}</span>
              {!isLocked && <span style={{ fontSize: "12px", color: saveStatus === "Saved" ? "#22c55e" : saveStatus === "Saving..." ? "#eab308" : "#ef4444" }}>{saveStatus}</span>}
            </div>
            <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>{clientName || "—"} · {companyName || "—"}</div>
          </div>

          {/* Tab switcher */}
          <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: "10px", padding: "3px", gap: "2px" }}>
            {[["editor","Editor"],["templates","Templates"]].map(([id, label]) => (
              <button key={id} onClick={() => setActiveTab(id)} style={{ padding: "6px 14px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600, background: activeTab === id ? "#f97316" : "transparent", color: activeTab === id ? "#fff" : "#94a3b8", transition: "all 0.15s" }}>{label}</button>
            ))}
          </div>

          {/* Preview toggle */}
          <button onClick={() => setPreviewMode(p => !p)} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: previewMode ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.05)", color: previewMode ? "#f97316" : "#94a3b8", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>
            {previewMode ? <EyeOff size={14}/> : <Eye size={14}/>}
            {previewMode ? "Edit" : "Preview"}
          </button>

          {/* Send / Share button */}
          {!isLocked ? (
            <button onClick={handlePublish} disabled={isSending} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 18px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", cursor: "pointer", fontSize: "13px", fontWeight: 700 }}>
              {isSending ? <Loader size={14} style={{ animation: "spin 1s linear infinite" }}/> : <Send size={14}/>}
              Send for Signature
            </button>
          ) : shareLink && (
            <button onClick={copyLink} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "8px", border: "1px solid rgba(249,115,22,0.3)", background: "rgba(249,115,22,0.1)", color: "#f97316", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>
              {copied ? <Check size={14}/> : <Copy size={14}/>}
              {copied ? "Copied!" : "Copy Link"}
            </button>
          )}

          <button onClick={onClose} style={{ padding: "6px", borderRadius: "8px", border: "none", background: "rgba(255,255,255,0.05)", color: "#94a3b8", cursor: "pointer" }}>
            <X size={18}/>
          </button>
        </div>

        {/* ── Body ── */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

          {/* ── Templates Tab ── */}
          {activeTab === "templates" && (
            <div style={{ width: "100%", overflowY: "auto", padding: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "16px", alignContent: "start" }}>
              <div style={{ gridColumn: "1/-1", color: "#94a3b8", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>Choose a Template to Start</div>
              {BUILT_IN_TEMPLATES.map(tpl => (
                <div key={tpl.id} onClick={() => !isLocked && applyTemplate(tpl)} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "20px", cursor: isLocked ? "not-allowed" : "pointer", transition: "all 0.2s", opacity: isLocked ? 0.5 : 1 }}
                  onMouseEnter={e => { if (!isLocked) e.currentTarget.style.borderColor = "#f97316"; e.currentTarget.style.background = "rgba(249,115,22,0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: "#f97316", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>{tpl.category}</div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#f1f5f9", marginBottom: "8px" }}>{tpl.name}</div>
                  <div style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.5 }}>{tpl.body.replace(/<[^>]+>/g,"").substring(0,100)}...</div>
                  <button style={{ marginTop: "14px", width: "100%", padding: "8px", borderRadius: "8px", border: "none", background: isLocked ? "#334155" : "#f97316", color: "#fff", fontWeight: 700, fontSize: "12px", cursor: isLocked ? "not-allowed" : "pointer" }}>
                    {isLocked ? "Locked" : "Use This Template →"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ── Editor Tab ── */}
          {activeTab === "editor" && (
            <>
              {/* Left: Fields */}
              <div style={{ width: "240px", flexShrink: 0, overflowY: "auto", padding: "16px", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "10px" }}>
                
                <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>Client Details</div>
                
                {[
                  ["Client Name", clientName, setClientName, "text"],
                  ["Company", companyName, setCompanyName, "text"],
                  ["Email", clientEmail, setClientEmail, "email"],
                  ["Phone", clientPhone, setClientPhone, "text"],
                  ["Service", requestedService, setRequestedService, "text"],
                  ["Retainer ($)", monthlyRetainer, setMonthlyRetainer, "number"],
                ].map(([label, val, setter, type]) => (
                  <div key={label}>
                    <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 600, marginBottom: "4px" }}>{label}</div>
                    <input type={type} value={val} disabled={isLocked} onChange={e => { setter(e.target.value); triggerAutoSave({ [label.toLowerCase().replace(/\s/g,"")]: e.target.value }); }}
                      style={{ width: "100%", padding: "7px 10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: "#f1f5f9", fontSize: "12px", boxSizing: "border-box", opacity: isLocked ? 0.6 : 1 }}/>
                  </div>
                ))}

                <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "8px", marginBottom: "2px" }}>Terms</div>

                <div>
                  <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 600, marginBottom: "4px" }}>Term Length</div>
                  <select value={termLength} disabled={isLocked} onChange={e => { setTermLength(e.target.value); triggerAutoSave({ termLength: e.target.value }); }}
                    style={{ width: "100%", padding: "7px 10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: "#0f172a", color: "#f1f5f9", fontSize: "12px" }}>
                    {["Month-to-month","3 months","6 months","12 months","Project-based"].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div>
                  <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 600, marginBottom: "4px" }}>Payment Terms</div>
                  <select value={paymentTerms} disabled={isLocked} onChange={e => { setPaymentTerms(e.target.value); triggerAutoSave({ paymentTerms: e.target.value }); }}
                    style={{ width: "100%", padding: "7px 10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: "#0f172a", color: "#f1f5f9", fontSize: "12px" }}>
                    {["Net 7","Net 15","Net 30","50% upfront / 50% delivery","100% upfront"].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div>
                  <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 600, marginBottom: "4px" }}>Contract Date</div>
                  <input type="date" value={contractDate} disabled={isLocked} onChange={e => { setContractDate(e.target.value); triggerAutoSave({ contractDate: e.target.value }); }}
                    style={{ width: "100%", padding: "7px 10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: "#f1f5f9", fontSize: "12px", boxSizing: "border-box" }}/>
                </div>

                <div>
                  <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 600, marginBottom: "4px" }}>Start Date</div>
                  <input type="date" value={startDate} disabled={isLocked} onChange={e => { setStartDate(e.target.value); triggerAutoSave({ startDate: e.target.value }); }}
                    style={{ width: "100%", padding: "7px 10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: "#f1f5f9", fontSize: "12px", boxSizing: "border-box" }}/>
                </div>

                {/* Insert Variables */}
                {!isLocked && (
                  <>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "8px", marginBottom: "4px" }}>Insert into Contract</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                      {VARIABLES.map(v => (
                        <button key={v.tag} onClick={() => insertVar(v.tag)}
                          style={{ padding: "4px 8px", borderRadius: "6px", border: "1px solid rgba(249,115,22,0.25)", background: "rgba(249,115,22,0.08)", color: "#f97316", fontSize: "10px", fontWeight: 600, cursor: "pointer" }}>
                          + {v.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* Share link (if published) */}
                {shareLink && (
                  <div style={{ marginTop: "8px", padding: "10px", borderRadius: "10px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
                    <div style={{ fontSize: "10px", color: "#22c55e", fontWeight: 700, marginBottom: "6px" }}>SIGNING LINK</div>
                    <div style={{ fontSize: "10px", color: "#94a3b8", wordBreak: "break-all", marginBottom: "8px" }}>{shareLink}</div>
                    <button onClick={copyLink} style={{ width: "100%", padding: "6px", borderRadius: "6px", border: "none", background: "#22c55e", color: "#fff", fontWeight: 700, fontSize: "11px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                      {copied ? <Check size={11}/> : <Copy size={11}/>} {copied ? "Copied!" : "Copy Link"}
                    </button>
                  </div>
                )}
              </div>

              {/* Center: Editor / Preview */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                {previewMode ? (
                  /* Preview */
                  <div style={{ flex: 1, overflowY: "auto", padding: "32px 40px", background: "#f8fafc" }}>
                    <div style={{ maxWidth: "680px", margin: "0 auto", background: "#fff", borderRadius: "12px", padding: "48px 48px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", fontFamily: "Georgia, serif" }}>
                      {/* Letterhead */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px", paddingBottom: "20px", borderBottom: "2px solid #f97316" }}>
                        <div>
                          <div style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "0.05em", color: "#0f172a" }}>GROW <span style={{ color: "#f97316" }}>ORBIT</span></div>
                          <div style={{ fontSize: "10px", color: "#94a3b8", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "2px" }}>Digital Growth Agency</div>
                        </div>
                        <div style={{ textAlign: "right", fontSize: "11px", color: "#64748b" }}>
                          <div style={{ fontWeight: 700, color: "#0f172a" }}>{currentContract.contractNumber}</div>
                          <div>Status: {statusCfg.label}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: "14px", lineHeight: 1.8, color: "#334155" }} dangerouslySetInnerHTML={{ __html: compilePreview(templateBody, fields) }} />
                      <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid #e2e8f0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", fontSize: "13px", color: "#475569" }}>
                        <div>
                          <div style={{ fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Client Signature</div>
                          <div style={{ height: "48px", borderBottom: "2px solid #cbd5e1", marginBottom: "8px" }}></div>
                          <div>{clientName || "Client Name"}</div>
                          <div style={{ color: "#94a3b8" }}>{companyName || "Company"}</div>
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Grow Orbit Signature</div>
                          <div style={{ height: "48px", borderBottom: "2px solid #cbd5e1", marginBottom: "8px" }}></div>
                          <div>Authorized Representative</div>
                          <div style={{ color: "#94a3b8" }}>Grow Orbit Agency</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Editor */
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                      <span style={{ fontSize: "11px", color: "#64748b" }}>HTML Editor — use the variable buttons on the left to insert fields</span>
                    </div>
                    <textarea
                      ref={textareaRef}
                      value={templateBody}
                      disabled={isLocked}
                      onChange={e => { setTemplateBody(e.target.value); triggerAutoSave({ templateBody: e.target.value }); }}
                      spellCheck={false}
                      style={{ flex: 1, resize: "none", border: "none", outline: "none", background: "#070e1a", color: "#94a3b8", fontFamily: "'Fira Code','Cascadia Code',monospace", fontSize: "12px", lineHeight: 1.7, padding: "20px", opacity: isLocked ? 0.6 : 1, cursor: isLocked ? "not-allowed" : "text" }}
                      placeholder="Start typing your contract or pick a template from the Templates tab..."
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
