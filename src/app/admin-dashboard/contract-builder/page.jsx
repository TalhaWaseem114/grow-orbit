"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, Save, Send, Eye, EyeOff, Copy, Check, Loader, FileText, ArrowLeft } from "lucide-react";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// ─── Built-in Templates ───────────────────────────────────────────────────────
const BUILT_IN_TEMPLATES = [
  {
    id: "amazon-full",
    name: "Amazon Growth Partnership",
    category: "Amazon",
    body: `<h2>AMAZON GROWTH PARTNERSHIP AGREEMENT</h2>
<p>This Agreement is made between Grow Orbit ("Agency") and the Client ("Client") on the date above.</p>

<h3>1. SCOPE OF SERVICES</h3>
<p>Grow Orbit will provide the Amazon growth services as outlined in the Statement of Work (SOW) attached to this agreement.</p>

<h3>2. TERM & COMMITMENT</h3>
<p>The initial term of this agreement is <strong>{{initial_term}}</strong> from the agreement date. After the initial term, the agreement will renew automatically on a month-to-month basis unless either party provides 30 days written notice.</p>

<h3>3. MONTHLY INVESTMENT</h3>
<p>Client agrees to pay the monthly retainer fee as specified in the SOW. Payment is due in advance on the 1st of each month.</p>

<h3>4. CLIENT RESPONSIBILITIES</h3>
<p>Client agrees to provide necessary access to Amazon Seller Central, Advertising Console, Brand Registry and other relevant accounts required to perform the services.</p>

<h3>5. PERFORMANCE & EXPECTATIONS</h3>
<p>While Grow Orbit will use best efforts and proven strategies to grow your Amazon business, results may vary based on market conditions, inventory, competition and other factors outside our control.</p>

<h3>6. CONFIDENTIALITY</h3>
<p>Both parties agree to keep confidential all non-public information shared during the course of this agreement.</p>

<h3>7. TERMINATION</h3>
<p>Either party may terminate this agreement with 30 days written notice after the initial term. Outstanding payments are due upon termination.</p>

<h3>8. GOVERNING LAW</h3>
<p>This agreement shall be governed by and construed in accordance with the laws of the jurisdiction in which Grow Orbit is registered.</p>

<p><em>IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.</em></p>`
  }
];

// ─── Variable chips ────────────────────────────────────────────────────────────
const VARIABLES = [
  { label: "Client Name",  tag: "{{client_name}}" },
  { label: "Company",      tag: "{{company_name}}" },
  { label: "Email",        tag: "{{client_email}}" },
  { label: "Location",     tag: "{{location}}" },
  { label: "Initial Term", tag: "{{initial_term}}" },
  { label: "Monthly Inv",  tag: "{{monthly_investment}}" },
  { label: "Auto Renewal", tag: "{{auto_renewal}}" },
  { label: "Date",         tag: "{{contract_date}}" },
];

function compilePreview(body, fields) {
  const fmt = (v) => {
    if (!v) return "—";
    const d = new Date(v);
    return isNaN(d) ? v : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };
  let html = (body || "")
    .split("{{client_name}}").join(fields.clientName || "—")
    .split("{{company_name}}").join(fields.companyName || "—")
    .split("{{client_email}}").join(fields.clientEmail || "—")
    .split("{{client_phone}}").join(fields.clientPhone || "—")
    .split("{{requested_service}}").join(fields.requestedService || "—")
    .split("{{monthly_retainer}}").join(fields.monthlyRetainer ? `$${Number(fields.monthlyRetainer).toLocaleString()}` : "—")
    .split("{{term_length}}").join(fields.termLength || "—")
    .split("{{payment_terms}}").join(fields.paymentTerms || "—")
    .split("{{location}}").join(fields.location || "—")
    .split("{{auto_renewal}}").join(fields.autoRenewal || "—")
    .split("{{monthly_investment}}").join(fields.monthlyRetainer ? `$${Number(fields.monthlyRetainer).toLocaleString()} USD` : "—")
    .split("{{initial_term}}").join(fields.termLength || "—")
    .split("{{contract_date}}").join(fmt(fields.contractDate))
    .split("{{start_date}}").join(fmt(fields.startDate))
    .split("{{end_date}}").join(fmt(fields.endDate));

  // Auto-format clauses
  html = html.replace(/<h3>(\d+)\.\s*(.*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g, (match, number, title, text) => {
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
          <div style="font-size: 13px; line-height: 1.6; color: #334155;">${text}</div>
        </div>
      </div>
    `;
  });

  return html;
}

// ─── HTML Syntax Highlighter ──────────────────────────────────
const highlightHtml = (code) => {
  if (!code) return "";
  
  let escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
  
  const regex = /(&lt;!--[\s\S]*?--&gt;)/g;
  const tagRegex = /(&lt;\/?[a-zA-Z0-9\-]+(?:[\s\S]*?)&gt;)/g;
  
  let highlighted = escaped.replace(regex, '<span style="color: #71717a; font-style: italic;">$1</span>');
  
  return highlighted.replace(tagRegex, (match) => {
    let highlightedTag = match;
    highlightedTag = highlightedTag.replace(/(\s[a-zA-Z0-9\-]+=)/g, '<span style="color: #fb923c;">$1</span>');
    highlightedTag = highlightedTag.replace(/&quot;([\s\S]*?)&quot;/g, (m, content) => {
      if (content.includes(":")) {
        const declarations = content.split(";");
        const highlightedDeclarations = declarations.map(decl => {
          const colonIdx = decl.indexOf(":");
          if (colonIdx === -1) return decl;
          const prop = decl.substring(0, colonIdx);
          const val = decl.substring(colonIdx + 1);
          return `<span style="color: #38bdf8;">${prop}</span>:<span style="color: #a3e635;">${val}</span>`;
        });
        return `&quot;${highlightedDeclarations.join(";")}&quot;`;
      }
      return `<span style="color: #a3e635;">&quot;${content}&quot;</span>`;
    });
    highlightedTag = highlightedTag.replace(/&#x27;([\s\S]*?)&#x27;/g, '<span style="color: #a3e635;">&#x27;$1&#x27;</span>');
    highlightedTag = highlightedTag.replace(/^(&lt;\/?[a-zA-Z0-9\-]+)/, '<span style="color: #f43f5e; font-weight: bold;">$1</span>');
    highlightedTag = highlightedTag.replace(/(&gt;)$/, '<span style="color: #f43f5e; font-weight: bold;">$1</span>');
    return highlightedTag;
  });
};

const CodeEditor = ({ value, onChange, onFocus, onBlur, placeholder, id, refTextarea, rows }) => {
  const handleScroll = (e) => {
    const backdrop = document.getElementById(`${id}-backdrop`);
    if (backdrop) {
      backdrop.scrollTop = e.target.scrollTop;
      backdrop.scrollLeft = e.target.scrollLeft;
    }
  };

  const highlighted = highlightHtml(value);

  const editorStyles = {
    fontFamily: "ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, monospace",
    fontSize: "12px",
    lineHeight: "1.6",
    tabSize: 2,
    whiteSpace: "pre-wrap",
    wordBreak: "break-all",
    padding: "16px",
    margin: 0,
    border: "none",
    boxSizing: "border-box",
    width: "100%",
    height: "100%",
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: rows ? `${rows * 20}px` : "200px" }}>
      <div 
        id={`${id}-backdrop`}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          color: "#e4e4e7",
          background: "transparent",
          ...editorStyles
        }}
        dangerouslySetInnerHTML={{ __html: highlighted + "\n\n" }}
      />
      <textarea
        id={id}
        ref={refTextarea}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onScroll={handleScroll}
        placeholder={placeholder}
        rows={rows}
        style={{
          position: "relative",
          display: "block",
          color: "transparent",
          caretColor: "#fff",
          background: "transparent",
          resize: "none",
          outline: "none",
          overflowY: "auto",
          ...editorStyles
        }}
      />
    </div>
  );
};

function ContractBuilderWorkspace() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contractId = searchParams.get("id");
  const leadId = searchParams.get("leadId");

  const [currentContract, setCurrentContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState(true);
  const [activeTab, setActiveTab] = useState("editor"); // "editor" | "templates"
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [zoom, setZoom] = useState(0.65);
  const [error, setError] = useState("");

  // Contract fields
  const [clientName, setClientName]           = useState("");
  const [companyName, setCompanyName]         = useState("");
  const [clientEmail, setClientEmail]         = useState("");
  const [clientPhone, setClientPhone]         = useState("");
  const [requestedService, setRequestedService] = useState("");
  const [monthlyRetainer, setMonthlyRetainer] = useState("");
  const [termLength, setTermLength]           = useState("3 Months");
  const [paymentTerms, setPaymentTerms]       = useState("Net 15");
  const [location, setLocation]               = useState("USA");
  const [autoRenewal, setAutoRenewal]         = useState("Yes, after 3 months");
  const [contractDate, setContractDate]       = useState("");
  const [startDate, setStartDate]             = useState("");
  const [templateBody, setTemplateBody]       = useState("");

  const [signatureType, setSignatureType]     = useState("draw");
  const [typedSignature, setTypedSignature]   = useState("");
  const [uploadedSignature, setUploadedSignature] = useState(null);
  const [agreedToTerms, setAgreedToTerms]     = useState(true);

  const textareaRef = useRef(null);
  const autoSaveTimer = useRef(null);
  const fileInputRef = useRef(null);

  // Load contract or create new draft on mount
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        if (contractId) {
          // Load existing contract
          const res = await fetch(`/api/contracts/${contractId}`);
          const data = await res.json();
          if (data.success) {
            initializeFields(data.contract);
          } else {
            setError(data.error || "Contract not found.");
          }
        } else if (leadId) {
          // Creating a new contract from a lead
          const leadDocRef = doc(db, "leads", leadId);
          const leadSnap = await getDoc(leadDocRef);
          
          if (leadSnap.exists()) {
            const leadData = leadSnap.data();
            
            // Create contract draft in database first
            const res = await fetch("/api/contracts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                leadId: leadId,
                clientName: leadData.fullName || "",
                companyName: leadData.companyName || leadData.company || "",
                clientEmail: leadData.email || "",
                clientPhone: leadData.phone || "",
                requestedService: leadData.requestedService || "",
                monthlyRetainer: leadData.budget || "1500",
                termLength: "6 Months",
                paymentTerms: "Net 30",
                location: leadData.location || "USA",
                autoRenewal: "Yes, after 3 months",
                templateBody: BUILT_IN_TEMPLATES[0].body
              })
            });
            
            const data = await res.json();
            if (data.success) {
              // Redirect to url with the new contract ID
              router.replace(`/admin-dashboard/contract-builder?id=${data.contract.id}`);
              return;
            } else {
              setError(data.error || "Failed to create contract draft.");
            }
          } else {
            setError("Lead not found.");
          }
        } else {
          setError("No contract or lead ID specified.");
        }
      } catch (err) {
        console.error("Error in loadData:", err);
        setError("An error occurred while loading the contract data.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [contractId, leadId, router]);

  const parseDateToInputString = (val) => {
    if (!val) return "";
    let d = null;
    if (val instanceof Date) {
      d = val;
    } else if (typeof val === "object") {
      const seconds = val.seconds !== undefined ? val.seconds : val._seconds;
      if (seconds !== undefined) {
        d = new Date(seconds * 1000);
      }
    } else {
      d = new Date(val);
    }
    return d && !isNaN(d.getTime()) ? d.toISOString().substring(0, 10) : "";
  };

  const initializeFields = (contractData) => {
    setCurrentContract(contractData);
    setClientName(contractData.clientName || "");
    setCompanyName(contractData.companyName || "");
    setClientEmail(contractData.clientEmail || "");
    setClientPhone(contractData.clientPhone || "");
    setRequestedService(contractData.requestedService || "");
    setMonthlyRetainer(contractData.monthlyRetainer || "");
    setTermLength(contractData.termLength || "3 Months");
    setPaymentTerms(contractData.paymentTerms || "Net 15");
    setLocation(contractData.location || "USA");
    setAutoRenewal(contractData.autoRenewal || "Yes, after 3 months");
    setContractDate(
      parseDateToInputString(contractData.contractDate) || new Date().toISOString().substring(0,10)
    );
    setStartDate(
      parseDateToInputString(contractData.startDate) || ""
    );
    setTemplateBody(contractData.templateBody || BUILT_IN_TEMPLATES[0].body);
  };

  const isLocked = currentContract ? !["draft", "awaiting_review"].includes(currentContract.status) : false;
  const shareLink = currentContract?.id
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/contract/${currentContract.id}`
    : null;

  const fields = { clientName, companyName, clientEmail, clientPhone, requestedService, monthlyRetainer, termLength, paymentTerms, contractDate, startDate, location, autoRenewal };

  // ── Auto-save ──
  const triggerAutoSave = useCallback((extra = {}) => {
    if (!currentContract || isLocked) return;
    setSaveStatus("Saving...");
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/contracts/${currentContract.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clientName, companyName, clientEmail, clientPhone, requestedService, monthlyRetainer, termLength, paymentTerms, contractDate, startDate, templateBody, location, autoRenewal, isAutoSave: true, ...extra })
        });
        const data = await res.json();
        if (data.success) { 
          setSaveStatus("Saved"); 
          setCurrentContract(data.contract); 
        }
        else setSaveStatus("Error");
      } catch { setSaveStatus("Error"); }
    }, 1500);
  }, [currentContract, clientName, companyName, clientEmail, clientPhone, requestedService, monthlyRetainer, termLength, paymentTerms, contractDate, startDate, templateBody, location, autoRenewal, isLocked]);

  // ── Insert variable tag at cursor ──
  const insertVar = (tag) => {
    const el = textareaRef.current;
    if (!el) return;
    const s = el.selectionStart, e = el.selectionEnd;
    const newVal = templateBody.substring(0, s) + tag + templateBody.substring(e);
    setTemplateBody(newVal);
    setTimeout(() => { el.focus(); el.selectionStart = el.selectionEnd = s + tag.length; }, 0);
    triggerAutoSave({ templateBody: newVal });
  };

  // ── Apply template (with compiled variables) ──
  const applyTemplate = (tpl) => {
    if (isLocked) return;
    const compiled = compilePreview(tpl.body, fields);
    setTemplateBody(compiled);
    setActiveTab("editor");
    triggerAutoSave({ templateBody: compiled });
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
        router.push(`/contract/${currentContract.id}`);
      } else {
        alert("Failed to send: " + data.error);
      }
    } catch (e) { alert("Error: " + e.message); }
    finally { setIsSending(false); }
  };

  // ── Copy e-sign link ──
  const copyLink = () => {
    if (!shareLink) return;
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#090d16", color: "#fff" }}>
        <Loader className="animate-spin text-orange-500" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#090d16", color: "#fff", gap: 12 }}>
        <p style={{ color: "#ef4444", fontWeight: 600 }}>{error}</p>
        <button onClick={() => router.push("/admin-dashboard")} style={{ background: "#f97316", border: "none", color: "#fff", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontWeight: 700 }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!currentContract) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#090d16", color: "#fff", gap: 12 }}>
        <p>No contract found or generated.</p>
        <button onClick={() => router.push("/admin-dashboard")} style={{ background: "#f97316", border: "none", color: "#fff", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontWeight: 700 }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const statusCfg = {
    draft: { label: "Draft", color: "#71717a" },
    awaiting_review: { label: "In Review", color: "#f97316" },
    awaiting_signature: { label: "Awaiting Signature", color: "#eab308" },
    viewed: { label: "Viewed", color: "#3b82f6" },
    signed: { label: "Signed ✍️", color: "#22c55e" },
    void: { label: "Voided", color: "#64748b" },
  }[currentContract.status] || { label: currentContract.status, color: "#71717a" };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#0a0a0a", overflow: "hidden", color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      
      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0, background: "#121212" }}>
        <button 
          onClick={() => router.push("/admin-dashboard")}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#94a3b8", cursor: "pointer", fontSize: "11px", fontWeight: 700 }}
        >
          <ArrowLeft size={14} /> Back
        </button>

        <FileText size={18} color="#f97316" />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: "#f1f5f9", fontWeight: 800, fontSize: "14px" }}>{currentContract.contractNumber}</span>
            <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "100px", background: `${statusCfg.color}20`, color: statusCfg.color, border: `1px solid ${statusCfg.color}35` }}>{statusCfg.label}</span>
            {!isLocked && <span style={{ fontSize: "11px", color: saveStatus === "Saved" ? "#22c55e" : saveStatus === "Saving..." ? "#eab308" : "#ef4444" }}>{saveStatus}</span>}
          </div>
          <div style={{ fontSize: "11px", color: "#64748b", marginTop: "1px" }}>{clientName || "—"} · {companyName || "—"}</div>
        </div>

        {/* Preview toggle */}
        <button onClick={() => setPreviewMode(p => !p)} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: previewMode ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.03)", color: previewMode ? "#f97316" : "#94a3b8", cursor: "pointer", fontSize: "11px", fontWeight: 700 }}>
          {previewMode ? <EyeOff size={13}/> : <Eye size={13}/>}
          {previewMode ? "Edit Mode" : "Live Preview"}
        </button>

        {/* Action Buttons */}
        {!isLocked ? (
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={handlePublish} disabled={isSending} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#fff", cursor: "pointer", fontSize: "12px", fontWeight: 700 }}>
              {isSending ? <Loader size={13} className="animate-spin" /> : <Save size={13}/>}
              Publish Contract
            </button>
            <button onClick={() => alert("Email modal would open here")} disabled={isSending} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 16px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", cursor: "pointer", fontSize: "12px", fontWeight: 800 }}>
              <Send size={13}/>
              Send via Email
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "8px" }}>
            <button 
              onClick={() => router.push(`/contract/${currentContract.id}`)}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "8px", border: "1px solid rgba(249,115,22,0.3)", background: "rgba(249,115,22,0.1)", color: "#f97316", cursor: "pointer", fontSize: "11px", fontWeight: 700 }}
            >
              <Eye size={13}/>
              View Contract Page
            </button>
            {shareLink && (
              <button onClick={copyLink} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#94a3b8", cursor: "pointer", fontSize: "11px", fontWeight: 700 }}>
                {copied ? <Check size={13}/> : <Copy size={13}/>}
                {copied ? "Copied Link!" : "Copy E-Sign Link"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Body Workspace ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Left: Input Fields */}
        <div style={{ width: "320px", flexShrink: 0, overflowY: "auto", padding: "20px 24px", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "12px", background: "#121212" }}>
          
          <div style={{ fontSize: "9px", fontWeight: 800, color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>Client Details</div>
          
          <div>
            <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>Full Name</div>
            <input type="text" value={clientName} disabled={isLocked} onChange={e => { setClientName(e.target.value); triggerAutoSave({ clientName: e.target.value }); }}
              onFocus={() => setFocusedField("clientName")}
              onBlur={() => setFocusedField(null)}
              style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: `1px solid ${focusedField === "clientName" ? "#f97316" : "rgba(255,255,255,0.08)"}`, background: focusedField === "clientName" ? "#0a0a0a" : "rgba(255,255,255,0.03)", color: "#f1f5f9", fontSize: "12px", boxSizing: "border-box", outline: "none", transition: "all 0.15s" }} />
          </div>

          <div>
            <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>Email Address</div>
            <input type="email" value={clientEmail} disabled={isLocked} onChange={e => { setClientEmail(e.target.value); triggerAutoSave({ clientEmail: e.target.value }); }}
              onFocus={() => setFocusedField("clientEmail")}
              onBlur={() => setFocusedField(null)}
              style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: `1px solid ${focusedField === "clientEmail" ? "#f97316" : "rgba(255,255,255,0.08)"}`, background: focusedField === "clientEmail" ? "#0a0a0a" : "rgba(255,255,255,0.03)", color: "#f1f5f9", fontSize: "12px", boxSizing: "border-box", outline: "none", transition: "all 0.15s" }} />
          </div>

          <div>
            <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>Company / Brand Name</div>
            <input type="text" value={companyName} disabled={isLocked} onChange={e => { setCompanyName(e.target.value); triggerAutoSave({ companyName: e.target.value }); }}
              onFocus={() => setFocusedField("companyName")}
              onBlur={() => setFocusedField(null)}
              style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: `1px solid ${focusedField === "companyName" ? "#f97316" : "rgba(255,255,255,0.08)"}`, background: focusedField === "companyName" ? "#0a0a0a" : "rgba(255,255,255,0.03)", color: "#f1f5f9", fontSize: "12px", boxSizing: "border-box", outline: "none", transition: "all 0.15s" }} />
          </div>

          <div>
            <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>Location</div>
            <select value={location} disabled={isLocked} onChange={e => { setLocation(e.target.value); triggerAutoSave({ location: e.target.value }); }}
              style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: "#0a0a0a", color: "#f1f5f9", fontSize: "12px", outline: "none" }}>
              {["USA","UK","DE","CA","AU","FR","IT","ES","AE","Global"].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div style={{ fontSize: "9px", fontWeight: 800, color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "12px", marginBottom: "4px" }}>Agreement Meta</div>

          <div>
            <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>Agreement Date</div>
            <input type="date" value={contractDate} disabled={isLocked} onChange={e => { setContractDate(e.target.value); triggerAutoSave({ contractDate: e.target.value }); }}
              style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#f1f5f9", fontSize: "12px", boxSizing: "border-box", outline: "none", colorScheme: "dark" }}/>
          </div>

          <div>
            <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>Initial Term</div>
            <select value={termLength} disabled={isLocked} onChange={e => { setTermLength(e.target.value); triggerAutoSave({ termLength: e.target.value }); }}
              style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: "#0a0a0a", color: "#f1f5f9", fontSize: "12px", outline: "none" }}>
              {["3 Months","6 Months","12 Months","Month-to-month","Project-based"].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div>
            <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>Monthly Investment ($ USD)</div>
            <input type="number" value={monthlyRetainer} disabled={isLocked} onChange={e => { setMonthlyRetainer(e.target.value); triggerAutoSave({ monthlyRetainer: e.target.value }); }}
              onFocus={() => setFocusedField("monthlyRetainer")}
              onBlur={() => setFocusedField(null)}
              style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: `1px solid ${focusedField === "monthlyRetainer" ? "#f97316" : "rgba(255,255,255,0.08)"}`, background: focusedField === "monthlyRetainer" ? "#0a0a0a" : "rgba(255,255,255,0.03)", color: "#f1f5f9", fontSize: "12px", boxSizing: "border-box", outline: "none", transition: "all 0.15s" }} />
          </div>

          <div>
            <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>Auto Renewal</div>
            <select value={autoRenewal} disabled={isLocked} onChange={e => { setAutoRenewal(e.target.value); triggerAutoSave({ autoRenewal: e.target.value }); }}
              style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: "#090d16", color: "#f1f5f9", fontSize: "12px", outline: "none" }}>
              {["Yes, after 3 months","Yes, month-to-month","No","Custom"].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>


        </div>

        {/* Center & Right: Editor / Preview Pane */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden", background: "#0a0a0a" }}>
            {/* Letterhead Preview */}
            <div style={{ flex: 1, overflowY: "auto", padding: "40px", background: "#121212", position: "relative", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
              
              {/* Zoom Controls Overlay */}
              <div style={{ position: "fixed", bottom: "32px", right: "32px", display: "flex", alignItems: "center", gap: "12px", background: "#1e293b", padding: "10px 16px", borderRadius: "100px", zIndex: 50, boxShadow: "0 4px 24px rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <button onClick={() => setZoom(z => Math.max(0.2, z - 0.1))} style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>-</button>
                <span style={{ color: "#fff", fontSize: "13px", fontWeight: 700, minWidth: "48px", textAlign: "center" }}>{Math.round(zoom * 100)}%</span>
                <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>+</button>
              </div>

              {/* Scaled Container Wrapper */}
              <div style={{ width: 1440 * zoom, height: 1930 * zoom, position: "relative", flexShrink: 0, transition: "all 0.2s" }}>
                <div style={{ 
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "1440px", 
                  height: "1930px", 
                  background: "#fff", 
                  borderRadius: "24px", 
                  overflow: "hidden",
                  padding: "80px 80px", 
                  boxShadow: "0 10px 40px rgba(0,0,0,0.5)", 
                  fontFamily: "'Inter', sans-serif",
                  transform: `scale(${zoom})`,
                  transformOrigin: "top left",
                  transition: "transform 0.2s"
                }}>

                {/* Brand Banner */}
                <div style={{ 
                  display: "flex", 
                  alignItems: "stretch", 
                  justifyContent: "space-between",
                  margin: "-80px -80px 48px -80px", 
                  height: "160px",
                  position: "relative",
                  background: "#fff",
                  borderBottom: "1px solid #e2e8f0"
                }}>
                  {/* Left Content */}
                  <div style={{ display: "flex", alignItems: "center", padding: "0 80px", zIndex: 2 }}>
                    {/* Logo */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <img src="/logo.png" alt="Grow Orbit Logo" style={{ height: "48px", objectFit: "contain" }} />
                      <span style={{ fontSize: "22px", fontWeight: 900, fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.5px" }}><span style={{ color: "#1e293b" }}>GROW</span> <span style={{ color: "#ea580c" }}>ORBIT</span></span>
                    </div>
                    
                    {/* Divider */}
                    <div style={{ width: "2px", height: "56px", background: "#e2e8f0", margin: "0 32px" }}></div>
                    
                    {/* Title & ID */}
                    <div>
                      <div style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a", marginBottom: "4px", fontFamily: "'Montserrat', sans-serif" }}>Contract for Amazon Growth Partnership</div>
                      <div style={{ fontSize: "14px", color: "#64748b", fontWeight: 500 }}>Contract ID: <span style={{ color: "#f97316" }}>{currentContract?.contractNumber || "—"}</span></div>
                    </div>
                  </div>

                  {/* Right Dark Section */}
                  <div style={{ 
                    position: "absolute", 
                    top: 0, 
                    right: 0, 
                    bottom: 0, 
                    width: "calc(40% - 30px)", 
                    background: "#0f172a", 
                    clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: "80px",
                    zIndex: 1
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                      <div style={{ width: "56px", height: "56px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                          <path d="M9 12l2 2 4-4"/>
                        </svg>
                      </div>
                      <div style={{ fontSize: "18px", color: "#fff", fontWeight: 700, lineHeight: 1.4 }}>
                        Secure & Legally<br/>Binding Agreement
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Stepper */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "48px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", width: "100%", maxWidth: "800px", justifyContent: "space-between", position: "relative" }}>
                    
                    {/* Connecting Lines */}
                    <div style={{ position: "absolute", top: "24px", left: "12%", right: "12%", height: "2px", background: "#f1f5f9", zIndex: 0 }}></div>

                    {/* Step 1 */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1, gap: "12px", width: "120px" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#f97316", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 700, boxShadow: "0 0 0 4px #fff" }}>1</div>
                      <div style={{ color: "#f97316", fontSize: "15px", fontWeight: 600, textAlign: "center" }}>Review Contract</div>
                    </div>

                    {/* Step 2 */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1, gap: "12px", width: "120px" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#f8fafc", color: "#475569", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 600, boxShadow: "0 0 0 4px #fff" }}>2</div>
                      <div style={{ color: "#64748b", fontSize: "15px", fontWeight: 500, textAlign: "center" }}>Your Details</div>
                    </div>

                    {/* Step 3 */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1, gap: "12px", width: "120px" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#f8fafc", color: "#475569", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 600, boxShadow: "0 0 0 4px #fff" }}>3</div>
                      <div style={{ color: "#64748b", fontSize: "15px", fontWeight: 500, textAlign: "center" }}>Sign Contract</div>
                    </div>

                    {/* Step 4 */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1, gap: "12px", width: "120px" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#f8fafc", color: "#475569", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 600, boxShadow: "0 0 0 4px #fff" }}>4</div>
                      <div style={{ color: "#64748b", fontSize: "15px", fontWeight: 500, textAlign: "center" }}>Completed</div>
                    </div>

                  </div>
                </div>


                {/* 2-Column Document Layout */}
                <div style={{ display: "grid", gridTemplateColumns: "820px 420px", gap: "40px" }}>
                  
                  {/* Left Column (Contract Details) */}
                  <div style={{ border: "1.5px solid #e2e8f0", borderRadius: "16px", padding: "40px", minHeight: "800px", background: "#fff", color: "#1e293b", fontFamily: "'Inter', sans-serif" }}>
                    {previewMode ? (
                      <div className="contract-preview-container">
                        <style>{`
                          .contract-preview-container h2 { text-align: left; font-size: 20px; font-weight: 800; letter-spacing: 0.02em; margin-bottom: 24px; color: #0f172a; text-transform: uppercase; position: relative; padding-bottom: 16px; }
                          .contract-preview-container h2::after { content: ''; position: absolute; left: 0; bottom: 0; width: 40px; height: 3px; background: #ea580c; }
                          .contract-preview-container h3 { font-size: 14px; font-weight: 700; margin-bottom: 6px; margin-top: 24px; color: #1e293b; text-transform: uppercase; }
                          .contract-preview-container p { font-size: 13px; line-height: 1.6; margin-bottom: 24px; color: #334155; }
                          .contract-preview-container strong { font-weight: 700; color: #f97316; }
                          .contract-preview-container em { font-style: italic; color: #64748b; }
                        `}</style>
                        <div dangerouslySetInnerHTML={{ __html: compilePreview(templateBody, fields) }} />
                      </div>
                    ) : (
                      <textarea
                        ref={textareaRef}
                        value={templateBody}
                        onChange={(e) => {
                          setTemplateBody(e.target.value);
                          triggerAutoSave({ templateBody: e.target.value });
                        }}
                        placeholder="Type your contract content here... Use the buttons on the left to insert variables."
                        style={{
                          width: "100%",
                          height: "100%",
                          minHeight: "700px",
                          border: "none",
                          resize: "none",
                          outline: "none",
                          fontFamily: "monospace",
                          fontSize: "13px",
                          lineHeight: "1.6",
                          color: "#334155",
                          background: "transparent",
                          whiteSpace: "pre-wrap"
                        }}
                      />
                    )}


                    {/* Disclaimer Box */}
                    <div style={{ marginTop: "32px", padding: "20px 24px", background: "#fff7ed", borderRadius: "12px", display: "flex", gap: "20px", alignItems: "flex-start" }}>
                      <div style={{ color: "#ea580c", flexShrink: 0, marginTop: "2px" }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                          <path d="M9 12l2 2 4-4"/>
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", marginBottom: "4px" }}>By signing below</div>
                        <div style={{ fontSize: "12px", color: "#334155", lineHeight: "1.6" }}>
                          You acknowledge that you have read, understood and agree to be bound by this Agreement. Your electronic signature has the same legal effect as your handwritten signature.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column (Client Information) */}
                  <div style={{ border: "1px solid #e2e8f0", borderRadius: "16px", minHeight: "800px", background: "#fff", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif", overflow: "hidden" }}>
                    
                    {/* Header */}
                    <div style={{ background: "#0f172a", padding: "36px 24px", display: "flex", gap: "16px", alignItems: "center" }}>
                      <div style={{ flexShrink: 0, width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #ea580c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                          <text x="12" y="15" fill="#ea580c" stroke="none" fontSize="10" fontWeight="bold" textAnchor="middle">2</text>
                        </svg>
                      </div>
                      <div>
                        <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>Client Information</h3>
                        <p style={{ color: "#e2e8f0", fontSize: "12px", lineHeight: "1.4", margin: 0 }}>Please provide the required<br/>information and sign below.</p>
                      </div>
                    </div>

                    <div style={{ padding: "24px", display: "flex", flexDirection: "column" }}>
                      {/* Client Details Section */}
                      <div style={{ marginBottom: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
                        {/* Full Name */}
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>Full Name</label>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #f1f5f9", borderRadius: "8px", padding: "10px 14px", background: "#fff" }}>
                            <span style={{ fontSize: "13px", color: "#0f172a", fontWeight: 500 }}>{clientName || "—"}</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                        </div>

                        {/* Email Address */}
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>Email Address</label>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #f1f5f9", borderRadius: "8px", padding: "10px 14px", background: "#fff" }}>
                            <span style={{ fontSize: "13px", color: "#0f172a", fontWeight: 500 }}>{clientEmail || "—"}</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                        </div>

                        {/* Company / Brand Name */}
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>Company / Brand Name</label>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #f1f5f9", borderRadius: "8px", padding: "10px 14px", background: "#fff" }}>
                            <span style={{ fontSize: "13px", color: "#0f172a", fontWeight: 500 }}>{companyName || "—"}</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                        </div>

                        {/* Location */}
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>Location</label>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #f1f5f9", borderRadius: "8px", padding: "10px 14px", background: "#fff" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <img src="https://flagcdn.com/w20/us.png" alt="USA" style={{ width: "16px", height: "12px", objectFit: "cover", borderRadius: "2px" }} />
                              <span style={{ fontSize: "13px", color: "#0f172a", fontWeight: 500 }}>{location || "USA"}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr style={{ borderTop: "1px solid #f1f5f9", borderBottom: "none", margin: "0 0 32px 0" }} />

                      {/* Electronic Signature Section */}
                      <div>
                        <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px" }}>
                          <div style={{ position: "relative" }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                            <div style={{ position: "absolute", bottom: "-3px", left: "2px", right: "2px", height: "2px", background: "#ea580c" }}></div>
                          </div>
                          <h4 style={{ color: "#0f172a", fontSize: "14px", fontWeight: 800, margin: 0 }}>Electronic Signature</h4>
                        </div>
                        <div style={{ fontSize: "12px", color: "#334155", marginBottom: "16px" }}>Choose how you'd like to sign</div>
                        
                        {/* Toggle Buttons */}
                        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                          <div onClick={() => setSignatureType("draw")} style={{ flex: 1, padding: "8px 0", background: signatureType === "draw" ? "#fff7ed" : "#fff", border: signatureType === "draw" ? "1px solid #ea580c" : "1px solid #f1f5f9", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", cursor: "pointer", transition: "all 0.2s" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={signatureType === "draw" ? "#ea580c" : "#0f172a"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                            <span style={{ fontSize: "12px", fontWeight: 700, color: signatureType === "draw" ? "#0f172a" : "#0f172a" }}>Draw</span>
                          </div>
                          <div onClick={() => setSignatureType("type")} style={{ flex: 1, padding: "8px 0", background: signatureType === "type" ? "#fff7ed" : "#fff", border: signatureType === "type" ? "1px solid #ea580c" : "1px solid #f1f5f9", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", cursor: "pointer", transition: "all 0.2s" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={signatureType === "type" ? "#ea580c" : "#0f172a"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
                            <span style={{ fontSize: "12px", fontWeight: 700, color: signatureType === "type" ? "#0f172a" : "#0f172a" }}>Type</span>
                          </div>
                          <div onClick={() => setSignatureType("upload")} style={{ flex: 1, padding: "8px 0", background: signatureType === "upload" ? "#fff7ed" : "#fff", border: signatureType === "upload" ? "1px solid #ea580c" : "1px solid #f1f5f9", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", cursor: "pointer", transition: "all 0.2s" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={signatureType === "upload" ? "#ea580c" : "#0f172a"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                            <span style={{ fontSize: "12px", fontWeight: 700, color: signatureType === "upload" ? "#0f172a" : "#0f172a" }}>Upload</span>
                          </div>
                        </div>

                        {/* Signature Box */}
                        {signatureType === "draw" && (
                          <div style={{ marginBottom: "16px" }}>
                            <div style={{ border: "1px solid #f1f5f9", borderRadius: "8px", height: "130px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", marginBottom: "8px" }}>
                              <div style={{ fontSize: "40px", fontFamily: "'Brush Script MT', cursive, sans-serif", color: "#0f172a" }}>Viral Patel</div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#ea580c", cursor: "pointer", fontSize: "11px", fontWeight: 600 }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                              <span>Clear</span>
                            </div>
                          </div>
                        )}

                        {signatureType === "type" && (
                          <div style={{ marginBottom: "16px" }}>
                            <input 
                              type="text" 
                              value={typedSignature} 
                              onChange={(e) => setTypedSignature(e.target.value)} 
                              placeholder="e.g. Viral Patel"
                              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #f1f5f9", fontSize: "22px", fontFamily: "'Brush Script MT', cursive, sans-serif", outline: "none", color: "#0f172a", background: "#fff" }} 
                            />
                          </div>
                        )}

                        {signatureType === "upload" && (
                          <div style={{ marginBottom: "16px" }}>
                            <input 
                              type="file" 
                              ref={fileInputRef} 
                              accept="image/*" 
                              style={{ display: "none" }} 
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setUploadedSignature(URL.createObjectURL(e.target.files[0]));
                                }
                              }} 
                            />
                            {!uploadedSignature ? (
                              <div onClick={() => fileInputRef.current?.click()} style={{ border: "2px dashed #cbd5e1", borderRadius: "8px", height: "150px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "#fff", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "#94a3b8"} onMouseLeave={e => e.currentTarget.style.borderColor = "#cbd5e1"}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "8px" }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                <div style={{ fontSize: "12px", color: "#475569", fontWeight: 600 }}>Click to browse image</div>
                              </div>
                            ) : (
                              <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", height: "150px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                <img src={uploadedSignature} alt="Uploaded Signature" style={{ maxHeight: "100px", maxWidth: "90%", objectFit: "contain" }} />
                                <button onClick={() => setUploadedSignature(null)} style={{ position: "absolute", top: "8px", right: "8px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>✕</button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Agreement Checkbox */}
                        <div onClick={() => setAgreedToTerms(!agreedToTerms)} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "20px", cursor: "pointer" }}>
                          <div style={{ width: "20px", height: "20px", borderRadius: "6px", background: agreedToTerms ? "#ea580c" : "#fff", border: agreedToTerms ? "1px solid #ea580c" : "1px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px", transition: "all 0.2s" }}>
                            {agreedToTerms && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                          </div>
                          <div style={{ fontSize: "12px", color: "#0f172a", fontWeight: 500, lineHeight: "1.5", userSelect: "none" }}>
                            I have read, understood, and agree to be bound by this Agreement.
                          </div>
                        </div>

                        {/* Sign & Complete Button */}
                        <button style={{ width: "100%", background: agreedToTerms ? "#f97316" : "#fed7aa", color: "#fff", border: "none", borderRadius: "8px", padding: "12px", fontSize: "14px", fontWeight: 700, cursor: agreedToTerms ? "pointer" : "not-allowed", marginBottom: "16px", boxShadow: agreedToTerms ? "0 4px 14px rgba(249, 115, 22, 0.3)" : "none", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                          Sign & Complete
                        </button>

                        {/* Secure Badge */}
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#f0fdf4", padding: "12px", borderRadius: "8px", color: "#16a34a" }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
                          <span style={{ fontSize: "11px", fontWeight: 500, lineHeight: "1.4" }}>Your signature is secure and<br/>legally binding.</span>
                        </div>

                        {/* Agency Signature */}
                        <div style={{ marginTop: "32px" }}>
                          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "12px" }}>
                            <div style={{ position: "relative" }}>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                              <div style={{ position: "absolute", bottom: "-3px", left: "2px", right: "2px", height: "2px", background: "#ea580c" }}></div>
                            </div>
                            <h4 style={{ color: "#0f172a", fontSize: "14px", fontWeight: 800, margin: 0 }}>Agency Signature</h4>
                          </div>

                          <div style={{ border: "1px solid #f1f5f9", borderRadius: "8px", height: "130px", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                            <div style={{ fontSize: "40px", fontFamily: "'Brush Script MT', cursive, sans-serif", color: "#0f172a" }}>Ali Haider</div>
                          </div>
                          
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
                            <div>
                              <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>Ali Haider</div>
                              <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>Chief Executive Officer, Grow Orbit</div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#16a34a" }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                              <span style={{ fontSize: "11px", fontWeight: 600 }}>Pre-signed</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Horizontal Summary Bar */}
                <div style={{ marginTop: "40px", background: "#0f172a", borderRadius: "16px", padding: "32px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "'Inter', sans-serif" }}>
                  
                  {/* Item 1: Agreement Date */}
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <div>
                      <div style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 500, marginBottom: "4px" }}>Agreement Date</div>
                      <div style={{ fontSize: "15px", color: "#f8fafc", fontWeight: 800 }}>{contractDate ? new Date(contractDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—"}</div>
                    </div>
                  </div>

                  <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.1)" }}></div>

                  {/* Item 2: Initial Term */}
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <div>
                      <div style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 500, marginBottom: "4px" }}>Initial Term</div>
                      <div style={{ fontSize: "15px", color: "#f8fafc", fontWeight: 800 }}>{termLength || "—"}</div>
                    </div>
                  </div>

                  <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.1)" }}></div>

                  {/* Item 3: Monthly Investment */}
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                    <div>
                      <div style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 500, marginBottom: "4px" }}>Monthly Investment</div>
                      <div style={{ fontSize: "15px", color: "#f8fafc", fontWeight: 800 }}>{monthlyRetainer ? `$${Number(monthlyRetainer).toLocaleString()} USD` : "—"}</div>
                    </div>
                  </div>

                  <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.1)" }}></div>

                  {/* Item 4: Auto Renewal */}
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                    <div>
                      <div style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 500, marginBottom: "4px" }}>Auto Renewal</div>
                      <div style={{ fontSize: "15px", color: "#f8fafc", fontWeight: 800 }}>{autoRenewal || "—"}</div>
                    </div>
                  </div>

                </div>

                {/* Footer Disclaimer */}
                <div style={{ marginTop: "32px", textAlign: "center", fontFamily: "'Inter', sans-serif" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#64748b", fontSize: "14px", fontWeight: 500, marginBottom: "8px" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
                    This is a legally binding agreement. All signatures are secure and verifiable.
                  </div>
                  <div style={{ color: "#64748b", fontSize: "13px" }}>
                    Powered by <span style={{ color: "#f97316", fontWeight: 600 }}>Grow Orbit</span> Secure Contracts
                  </div>
                </div>
                
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

// Parent Wrapper with Suspense boundary
export default function ContractBuilderPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a", color: "#fff" }}>
        <Loader className="animate-spin text-orange-500" size={32} />
      </div>
    }>
      <ContractBuilderWorkspace />
    </Suspense>
  );
}

