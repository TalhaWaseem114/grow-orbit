"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  X, Save, Send, Eye, EyeOff, Copy, Check, Loader, FileText,
  ArrowLeft, ChevronDown, ChevronRight, Bookmark, ArrowUp, ArrowDown, Plus, RotateCcw
} from "lucide-react";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import {
  DEFAULT_CLAUSES,
  BUILT_IN_TEMPLATES,
  SERVICE_PRESETS,
  VARIABLES,
  formatInvestmentValue,
  formatDate,
  compileContractBody
} from "@/utils/contractHelper";

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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [emailSubject, setEmailSubject] = useState("Action Required: Review & Sign Your Grow Orbit Agreement");
  const [focusedField, setFocusedField] = useState(null);
  const [zoom, setZoom] = useState(0.65);
  const [error, setError] = useState("");

  const [clientDetailsOpen, setClientDetailsOpen] = useState(true);
  const [agreementMetaOpen, setAgreementMetaOpen] = useState(true);
  const [servicesOpen, setServicesOpen] = useState(true);
  const [clausesOpen, setClausesOpen] = useState(true);

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
  const [services, setServices]               = useState([{ name: "", description: "", price: "" }]);

  // Dynamic clauses list state
  const [clauses, setClauses]                 = useState(DEFAULT_CLAUSES);
  const [isSavingDefaults, setIsSavingDefaults] = useState(false);
  const [defaultSaveMessage, setDefaultSaveMessage] = useState("");

  const [signatureType, setSignatureType]     = useState("type");
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

            // Fetch default clauses from Firebase settings if available
            let initialClauses = DEFAULT_CLAUSES;
            try {
              const settingsRes = await fetch("/api/contracts/settings");
              const settingsData = await settingsRes.json();
              if (settingsData.success && Array.isArray(settingsData.clauses) && settingsData.clauses.length > 0) {
                initialClauses = settingsData.clauses;
              }
            } catch (err) {
              console.warn("Could not fetch settings defaults, using fallback:", err);
            }

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
                templateBody: BUILT_IN_TEMPLATES[0].body,
                clauses: initialClauses
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
    if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}$/.test(val.trim())) {
      return val.trim();
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
    if (!d || isNaN(d.getTime())) return "";
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
    setServices(contractData.services && contractData.services.length > 0 ? contractData.services : [{ name: "", description: "", price: "" }]);

    // Load dynamic clauses from contract or legacy fields
    const loadedClauses = (contractData.clauses && Array.isArray(contractData.clauses) && contractData.clauses.length > 0)
      ? contractData.clauses
      : [
          { id: "term-commitment", title: "TERM & COMMITMENT", text: contractData.termCommitmentText || DEFAULT_CLAUSES[0].text },
          { id: "payment-terms", title: "PAYMENT TERMS", text: contractData.paymentTermsText || DEFAULT_CLAUSES[1].text },
          { id: "client-responsibilities", title: "CLIENT RESPONSIBILITIES", text: contractData.clientResponsibilitiesText || DEFAULT_CLAUSES[2].text },
          { id: "confidentiality-termination", title: "CONFIDENTIALITY & TERMINATION", text: contractData.confidentialityTerminationText || DEFAULT_CLAUSES[3].text },
          { id: "governing-law", title: "GOVERNING LAW", text: contractData.governingLawText || DEFAULT_CLAUSES[4].text }
        ];
    setClauses(loadedClauses);
  };

  const isLocked = currentContract ? !["draft", "awaiting_review"].includes(currentContract.status) : false;
  const shareLink = currentContract?.id
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/contract/${currentContract.id}`
    : null;

  const fields = {
    clientName, companyName, clientEmail, clientPhone, requestedService, monthlyRetainer,
    termLength, paymentTerms, contractDate, startDate, location, autoRenewal, services,
    clauses
  };

  // ── Auto-save ──
  const triggerAutoSave = useCallback((extra = {}) => {
    if (!currentContract || isLocked) return;
    setSaveStatus("Saving...");
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(async () => {
      try {
        const payload = {
          clientName, companyName, clientEmail, clientPhone, requestedService, monthlyRetainer,
          termLength, paymentTerms, contractDate, startDate, templateBody, location, autoRenewal, services,
          clauses,
          isAutoSave: true,
          ...extra
        };
        const res = await fetch(`/api/contracts/${currentContract.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          setSaveStatus("Saved");
          setCurrentContract(data.contract);
        }
        else setSaveStatus("Error");
      } catch { setSaveStatus("Error"); }
    }, 1500);
  }, [
    currentContract, clientName, companyName, clientEmail, clientPhone, requestedService, monthlyRetainer,
    termLength, paymentTerms, contractDate, startDate, templateBody, location, autoRenewal, services, isLocked,
    clauses
  ]);

  // ── Save Current Clauses as Default in Firebase ──
  const handleSaveAsDefault = async () => {
    if (isSavingDefaults) return;
    setIsSavingDefaults(true);
    setDefaultSaveMessage("");
    try {
      const res = await fetch("/api/contracts/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clauses })
      });
      const data = await res.json();
      if (data.success) {
        setDefaultSaveMessage("Saved as Firebase Default! ✓");
        setTimeout(() => setDefaultSaveMessage(""), 3500);
      } else {
        setDefaultSaveMessage("Error: " + (data.error || "Failed to save"));
      }
    } catch (err) {
      setDefaultSaveMessage("Failed to save default T&C");
    } finally {
      setIsSavingDefaults(false);
    }
  };

  // ── Load Firebase Default Clauses ──
  const handleLoadFirebaseDefaults = async () => {
    if (isLocked) return;
    if (!window.confirm("Reset this contract's clauses to the defaults stored in Firebase?")) return;
    try {
      const res = await fetch("/api/contracts/settings");
      const data = await res.json();
      if (data.success && Array.isArray(data.clauses) && data.clauses.length > 0) {
        setClauses(data.clauses);
        triggerAutoSave({ clauses: data.clauses });
      } else {
        alert("No custom default clauses found in Firebase.");
      }
    } catch (err) {
      alert("Failed to load defaults from Firebase.");
    }
  };

  // ── Clause Handlers ──
  const handleClauseChange = (idx, key, val) => {
    if (isLocked) return;
    const updated = [...clauses];
    updated[idx] = { ...updated[idx], [key]: val };
    setClauses(updated);
    triggerAutoSave({ clauses: updated });
  };

  const handleAddClause = () => {
    if (isLocked) return;
    const newClause = {
      id: `clause-${Date.now()}`,
      title: `NEW CLAUSE ${clauses.length + 1}`,
      text: "Write clause details here. You can use variables like <strong>{{initial_term}}</strong>."
    };
    const updated = [...clauses, newClause];
    setClauses(updated);
    triggerAutoSave({ clauses: updated });
  };

  const handleRemoveClause = (idx) => {
    if (isLocked) return;
    if (clauses.length <= 1) {
      alert("A contract must have at least one clause.");
      return;
    }
    const updated = clauses.filter((_, i) => i !== idx);
    setClauses(updated);
    triggerAutoSave({ clauses: updated });
  };

  const handleMoveClause = (idx, direction) => {
    if (isLocked) return;
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= clauses.length) return;
    const updated = [...clauses];
    const temp = updated[idx];
    updated[idx] = updated[newIdx];
    updated[newIdx] = temp;
    setClauses(updated);
    triggerAutoSave({ clauses: updated });
  };

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
        body: JSON.stringify({
          clientName, companyName, clientEmail, clientPhone, requestedService, monthlyRetainer,
          termLength, paymentTerms, contractDate, startDate, templateBody, services, location, autoRenewal,
          clauses
        })
      });
      // Then publish
      const res = await fetch(`/api/contracts/${currentContract.id}/send`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        const updated = { ...currentContract, status: "awaiting_signature", shareToken: data.shareToken };
        setCurrentContract(updated);
        setShowSuccessModal(true);
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

  // ── Copy formatted email outreach template ──
  const copyRichEmail = async () => {
    if (!shareLink || !isLocked) return;

    const htmlEmail = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #e2ebf5;
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      color: #333333;
    }
    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
      }
      .email-body {
        padding: 24px 16px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #e2ebf5;">
  <div style="width: 100%; background-color: #e2ebf5; padding: 24px 20px; box-sizing: border-box; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <div class="email-container" style="max-width: 600px; margin: 0 auto; background-color: #f0f4f8; border-radius: 16px; overflow: hidden; box-shadow: none; border: 3px solid #ffffff;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #1f1f1f 0%, #0d0d0d 50%, #050505 100%); padding: 24px 16px; text-align: center; border-bottom: 3px solid #f97316; border-top-left-radius: 13px; border-top-right-radius: 13px;">
        <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto; border-collapse: collapse;">
          <tr>
            <td valign="middle" style="text-align: center; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <div style="font-size: 22px; font-weight: 900; line-height: 1; letter-spacing: 0.03em; color: #ffffff;">
                GROW <span style="color: #f97316;">ORBIT</span>
              </div>
              <div style="font-size: 8px; font-weight: 700; color: #a1a1aa; letter-spacing: 0.12em; text-transform: uppercase; margin-top: 4px; line-height: 1.2;">
                WE RANK. YOU SELL. IT'S THAT SIMPLE.
              </div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Body -->
      <div class="email-body" style="padding: 28px 20px; background-color: #f0f4f8; text-align: left;">
        <h1 style="font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 0; margin-bottom: 20px; line-height: 1.3; letter-spacing: -0.02em; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Growth Partnership Agreement</h1>

        <div style="font-size: 15px; color: #334155; line-height: 1.6; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <p style="font-size: 14px; line-height: 1.6; color: #475569; margin-top: 0; margin-bottom: 16px;">Hi ${clientName || "Partner"},</p>

          <p style="font-size: 14px; line-height: 1.7; color: #4b5563; margin-bottom: 16px;">
            We have successfully drafted our Amazon Growth Partnership Agreement and it is ready for your review and digital signature.
          </p>

          <p style="font-size: 14px; line-height: 1.7; color: #4b5563; margin-bottom: 16px;">
            We are incredibly excited about the opportunity to partner with you and help take your brand's growth to the next level. Let's sign the contract and begin this amazing journey together!
          </p>

          <p style="font-size: 14px; line-height: 1.7; color: #4b5563; margin-bottom: 16px;">
            If you have any questions or queries, please feel free to reply directly to this email.
          </p>

          <p style="font-size: 14px; line-height: 1.7; color: #4b5563; margin-bottom: 24px;">
            Please click the button below to view the full agreement and complete the secure e-signature process:
          </p>

          <!-- CTA Button -->
          <div style="text-align: center; margin-bottom: 28px; margin-top: 16px;">
            <a href="${shareLink}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #f97316, #ea580c); color: #ffffff !important; padding: 14px 36px; min-width: 240px; max-width: 100%; box-sizing: border-box; border-radius: 50px; font-size: 13px; font-weight: 800; text-decoration: none; box-shadow: 0 10px 25px rgba(234, 88, 12, 0.25); border: 3px solid #fdba74; text-transform: uppercase; letter-spacing: 0.06em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: center;">
              ✍️ Review & Sign Agreement
            </a>
          </div>

          <!-- Separator -->
          <div style="height: 1px; background-color: rgba(15, 23, 42, 0.06); margin: 30px 0 24px 0; border-radius: 1px;"></div>

          <p style="font-size: 14px; line-height: 1.7; color: #4b5563; margin-bottom: 20px;">
            Warm regards,<br />
            <strong style="color: #0f172a; font-size: 16px;">The Grow <span style="color: #f97316;">Orbit</span> Team</strong>
          </p>

          <p style="font-size: 11px; color: #94a3b8; line-height: 1.5; margin-top: 24px; border-top: 1px dashed rgba(15, 23, 42, 0.06); padding-top: 16px;">
            This is a secure, legally-binding electronic signature process. If you have any questions, please let us know.
          </p>
        </div>

        <hr style="border: 0; border-top: 1px solid transparent; margin: 36px 0 24px 0;">

        <!-- Footer -->
        <div style="text-align: center; color: #94a3b8; font-size: 11px; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <p style="font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0; margin-bottom: 4px;">Grow Orbit Agency</p>
          <p style="margin: 0; color: #94A3B8;">
            support@groworbitofficial.com &middot; +1 (912) 820-5916
          </p>
          <p style="margin: 4px 0 0; color: #94A3B8;">
            2583 Lundigan Dr, Mississauga, ON L5J 3W2, Canada
          </p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    const plainText = `Hi ${clientName || "Partner"},\n\nI have drafted our Amazon Growth Partnership Agreement and it is ready for your signature. We are incredibly excited to partner with you and help grow your brand. Let's sign this contract and begin this amazing journey together!\n\nReview & Sign Agreement: ${shareLink}\n\nBest regards,\nGrow Orbit Team`;

    try {
      const typeHtml = "text/html";
      const typeText = "text/plain";
      const blobHtml = new Blob([htmlEmail], { type: typeHtml });
      const blobText = new Blob([plainText], { type: typeText });
      const data = [new ClipboardItem({ [typeHtml]: blobHtml, [typeText]: blobText })];
      await navigator.clipboard.write(data);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      navigator.clipboard.writeText(plainText);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
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
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#0a0a0a", overflow: "hidden", color: "#fff", fontFamily: "'Inter', sans-serif" }}>

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

        {/* Reset Template */}
        {!isLocked && (
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to reset this contract to the default template? This will restore the dynamic placeholders (services & clauses) and overwrite manual text edits you made to the template body.")) {
                setTemplateBody(BUILT_IN_TEMPLATES[0].body);
                triggerAutoSave({ templateBody: BUILT_IN_TEMPLATES[0].body });
              }
            }}
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "8px", border: "1px solid rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.05)", color: "#ef4444", cursor: "pointer", fontSize: "11px", fontWeight: 700 }}
          >
            Reset Template
          </button>
        )}

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
            <button onClick={() => setIsEmailModalOpen(true)} disabled={isSending} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 16px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", cursor: "pointer", fontSize: "12px", fontWeight: 800 }}>
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
            <button
              onClick={() => setIsEmailModalOpen(true)}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", cursor: "pointer", fontSize: "11px", fontWeight: 800 }}
            >
              <Send size={13}/>
              Share Email
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
        <div style={{ width: "390px", flexShrink: 0, overflowY: "auto", padding: "20px 20px", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "16px", background: "#121212" }}>

          {isLocked && (
            <div style={{ background: "rgba(234,88,12,0.1)", border: "1px solid rgba(234,88,12,0.3)", borderRadius: "8px", padding: "10px 12px", marginBottom: "8px", display: "flex", gap: "8px", alignItems: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <span style={{ fontSize: "10px", color: "#f97316", fontWeight: 700, lineHeight: 1.2 }}>
                Contract Locked — Awaiting signature or completed.
              </span>
            </div>
          )}

          {/* 1. Client Details */}
          <div
            onClick={() => setClientDetailsOpen(!clientDetailsOpen)}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", paddingBottom: "6px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginTop: "4px" }}
          >
            <span style={{ fontSize: "10px", fontWeight: 800, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Client Details</span>
            {clientDetailsOpen ? <ChevronDown size={14} color="#64748b" /> : <ChevronRight size={14} color="#64748b" />}
          </div>

          {clientDetailsOpen && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>Full Name</div>
                <input type="text" value={clientName} disabled={isLocked} onChange={e => { setClientName(e.target.value); triggerAutoSave({ clientName: e.target.value }); }}
                  onFocus={() => setFocusedField("clientName")}
                  onBlur={() => setFocusedField(null)}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: `1px solid ${focusedField === "clientName" ? "#f97316" : "rgba(255,255,255,0.08)"}`, background: isLocked ? "rgba(255,255,255,0.01)" : (focusedField === "clientName" ? "#0a0a0a" : "rgba(255,255,255,0.03)"), color: isLocked ? "#64748b" : "#f1f5f9", fontSize: "12px", boxSizing: "border-box", outline: "none", transition: "all 0.15s", cursor: isLocked ? "not-allowed" : "text", opacity: isLocked ? 0.6 : 1 }} />
              </div>

              <div>
                <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>Email Address</div>
                <input type="email" value={clientEmail} disabled={isLocked} onChange={e => { setClientEmail(e.target.value); triggerAutoSave({ clientEmail: e.target.value }); }}
                  onFocus={() => setFocusedField("clientEmail")}
                  onBlur={() => setFocusedField(null)}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: `1px solid ${focusedField === "clientEmail" ? "#f97316" : "rgba(255,255,255,0.08)"}`, background: isLocked ? "rgba(255,255,255,0.01)" : (focusedField === "clientEmail" ? "#0a0a0a" : "rgba(255,255,255,0.03)"), color: isLocked ? "#64748b" : "#f1f5f9", fontSize: "12px", boxSizing: "border-box", outline: "none", transition: "all 0.15s", cursor: isLocked ? "not-allowed" : "text", opacity: isLocked ? 0.6 : 1 }} />
              </div>

              <div>
                <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>Company / Brand Name</div>
                <input type="text" value={companyName} disabled={isLocked} onChange={e => { setCompanyName(e.target.value); triggerAutoSave({ companyName: e.target.value }); }}
                  onFocus={() => setFocusedField("companyName")}
                  onBlur={() => setFocusedField(null)}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: `1px solid ${focusedField === "companyName" ? "#f97316" : "rgba(255,255,255,0.08)"}`, background: isLocked ? "rgba(255,255,255,0.01)" : (focusedField === "companyName" ? "#0a0a0a" : "rgba(255,255,255,0.03)"), color: isLocked ? "#64748b" : "#f1f5f9", fontSize: "12px", boxSizing: "border-box", outline: "none", transition: "all 0.15s", cursor: isLocked ? "not-allowed" : "text", opacity: isLocked ? 0.6 : 1 }} />
              </div>

              <div>
                <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>Location</div>
                <select value={location} disabled={isLocked} onChange={e => { setLocation(e.target.value); triggerAutoSave({ location: e.target.value }); }}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: isLocked ? "rgba(255,255,255,0.01)" : "#0a0a0a", color: isLocked ? "#64748b" : "#f1f5f9", fontSize: "12px", outline: "none", cursor: isLocked ? "not-allowed" : "pointer", opacity: isLocked ? 0.6 : 1 }}>
                  {["USA","UK","DE","CA","AU","FR","IT","ES","AE","Global"].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* 2. Agreement Meta */}
          <div
            onClick={() => setAgreementMetaOpen(!agreementMetaOpen)}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", paddingBottom: "6px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginTop: "12px" }}
          >
            <span style={{ fontSize: "10px", fontWeight: 800, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Agreement Meta</span>
            {agreementMetaOpen ? <ChevronDown size={14} color="#64748b" /> : <ChevronRight size={14} color="#64748b" />}
          </div>

          {agreementMetaOpen && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>Agreement Date</div>
                <input type="date" value={contractDate} disabled={isLocked} onChange={e => { setContractDate(e.target.value); triggerAutoSave({ contractDate: e.target.value }); }}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: isLocked ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.03)", color: isLocked ? "#64748b" : "#f1f5f9", fontSize: "12px", boxSizing: "border-box", outline: "none", colorScheme: "dark", cursor: isLocked ? "not-allowed" : "text", opacity: isLocked ? 0.6 : 1 }}/>
              </div>

              <div>
                <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>Initial Term</div>
                <select value={termLength} disabled={isLocked} onChange={e => { setTermLength(e.target.value); triggerAutoSave({ termLength: e.target.value }); }}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: isLocked ? "rgba(255,255,255,0.01)" : "#0a0a0a", color: isLocked ? "#64748b" : "#f1f5f9", fontSize: "12px", outline: "none", cursor: isLocked ? "not-allowed" : "pointer", opacity: isLocked ? 0.6 : 1 }}>
                  {["1 Month","3 Months","6 Months","8 Months","12 Months","Month-to-month","Project-based"].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              <div>
                <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>Monthly Management Fee ($ USD)</div>
                <input type="text" value={monthlyRetainer} disabled={isLocked} onChange={e => { setMonthlyRetainer(e.target.value); triggerAutoSave({ monthlyRetainer: e.target.value }); }}
                  onFocus={() => setFocusedField("monthlyRetainer")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g. 1500 or Will start after 3 months"
                  style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: `1px solid ${focusedField === "monthlyRetainer" ? "#f97316" : "rgba(255,255,255,0.08)"}`, background: isLocked ? "rgba(255,255,255,0.01)" : (focusedField === "monthlyRetainer" ? "#0a0a0a" : "rgba(255,255,255,0.03)"), color: isLocked ? "#64748b" : "#f1f5f9", fontSize: "12px", boxSizing: "border-box", outline: "none", transition: "all 0.15s", cursor: isLocked ? "not-allowed" : "text", opacity: isLocked ? 0.6 : 1 }} />
              </div>

              <div>
                <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>Auto Renewal</div>
                <select value={autoRenewal} disabled={isLocked} onChange={e => { setAutoRenewal(e.target.value); triggerAutoSave({ autoRenewal: e.target.value }); }}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: isLocked ? "rgba(255,255,255,0.01)" : "#090d16", color: isLocked ? "#64748b" : "#f1f5f9", fontSize: "12px", outline: "none", cursor: isLocked ? "not-allowed" : "pointer", opacity: isLocked ? 0.6 : 1 }}>
                  {["Yes, after 1 month","Yes, after 3 months","Yes, after 6 months","Yes, after 8 months","Yes, after 12 months","Yes, month-to-month","No","Custom"].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* 3. Services & Pricing */}
          <div
            onClick={() => setServicesOpen(!servicesOpen)}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", paddingBottom: "6px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginTop: "12px" }}
          >
            <span style={{ fontSize: "10px", fontWeight: 800, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Services & Pricing</span>
            {servicesOpen ? <ChevronDown size={14} color="#64748b" /> : <ChevronRight size={14} color="#64748b" />}
          </div>

          {servicesOpen && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Presets Row */}
              {!isLocked && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "4px" }}>
                  {SERVICE_PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        let updated = [...services];
                        if (updated.length === 1 && !updated[0].name && !updated[0].price && !updated[0].description) {
                          updated[0] = { ...p };
                        } else {
                          updated.push({ ...p });
                        }
                        setServices(updated);
                        triggerAutoSave({ services: updated });
                      }}
                      style={{ padding: "4px 8px", borderRadius: "100px", border: "1px solid rgba(249,115,22,0.2)", background: "rgba(249,115,22,0.05)", color: "#f97316", fontSize: "9px", fontWeight: 600, cursor: "pointer" }}
                    >
                      + {p.name.replace("Amazon ", "").replace(" Account", "").split(" & ")[0]}
                    </button>
                  ))}
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "4px" }}>
                {services.map((svc, idx) => (
                  <div key={idx} style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", background: "rgba(255,255,255,0.01)", display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      <input
                        type="text"
                        placeholder="Service name"
                        value={svc.name}
                        disabled={isLocked}
                        onChange={e => {
                          const updated = [...services];
                          updated[idx] = { ...updated[idx], name: e.target.value };
                          setServices(updated);
                          triggerAutoSave({ services: updated });
                        }}
                        style={{ flex: 1, padding: "6px 8px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.08)", background: isLocked ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.03)", color: isLocked ? "#64748b" : "#f1f5f9", fontSize: "11px", outline: "none", boxSizing: "border-box", cursor: isLocked ? "not-allowed" : "text", opacity: isLocked ? 0.6 : 1 }}
                      />
                      <input
                        type="number"
                        placeholder="$"
                        value={svc.price}
                        disabled={isLocked}
                        onChange={e => {
                          const updated = [...services];
                          updated[idx] = { ...updated[idx], price: e.target.value };
                          setServices(updated);
                          triggerAutoSave({ services: updated });
                        }}
                        style={{ width: "65px", padding: "6px 8px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.08)", background: isLocked ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.03)", color: isLocked ? "#64748b" : "#f1f5f9", fontSize: "11px", outline: "none", boxSizing: "border-box", cursor: isLocked ? "not-allowed" : "text", opacity: isLocked ? 0.6 : 1 }}
                      />
                      {!isLocked && services.length > 1 && (
                        <button
                          onClick={() => {
                            const updated = services.filter((_, i) => i !== idx);
                            setServices(updated);
                            triggerAutoSave({ services: updated });
                          }}
                          style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "14px", fontWeight: 700, padding: "0 4px", flexShrink: 0 }}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Detail (e.g. End-to-end PPC scaling)"
                      value={svc.description || ""}
                      disabled={isLocked}
                      onChange={e => {
                        const updated = [...services];
                        updated[idx] = { ...updated[idx], description: e.target.value };
                        setServices(updated);
                        triggerAutoSave({ services: updated });
                      }}
                      style={{ width: "100%", padding: "4px 6px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.05)", background: isLocked ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.02)", color: isLocked ? "#64748b" : "#94a3b8", fontSize: "9px", outline: "none", boxSizing: "border-box", cursor: isLocked ? "not-allowed" : "text", opacity: isLocked ? 0.6 : 1 }}
                    />
                  </div>
                ))}
              </div>

              {!isLocked && (
                <button
                  onClick={() => {
                    const updated = [...services, { name: "", description: "", price: "" }];
                    setServices(updated);
                    triggerAutoSave({ services: updated });
                  }}
                  style={{ width: "100%", padding: "7px", borderRadius: "8px", border: "1px dashed rgba(249,115,22,0.3)", background: "rgba(249,115,22,0.05)", color: "#f97316", cursor: "pointer", fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                >
                  <Plus size={13} /> Add Service
                </button>
              )}
            </div>
          )}

          {/* 4. Terms & Conditions (Dynamic Clauses) */}
          <div
            onClick={() => setClausesOpen(!clausesOpen)}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", paddingBottom: "6px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginTop: "12px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "10px", fontWeight: 800, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Terms & Conditions</span>
              <span style={{ fontSize: "9px", fontWeight: 700, padding: "1px 6px", borderRadius: "100px", background: "rgba(249,115,22,0.15)", color: "#f97316" }}>{clauses.length}</span>
            </div>
            {clausesOpen ? <ChevronDown size={14} color="#64748b" /> : <ChevronRight size={14} color="#64748b" />}
          </div>

          {clausesOpen && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

              {/* Default T&C Action Buttons */}
              {!isLocked && (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", background: "rgba(255,255,255,0.02)", padding: "10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      onClick={handleSaveAsDefault}
                      disabled={isSavingDefaults}
                      style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "6px 10px", borderRadius: "6px", border: "1px solid rgba(249,115,22,0.3)", background: "rgba(249,115,22,0.1)", color: "#f97316", fontSize: "10px", fontWeight: 700, cursor: "pointer" }}
                    >
                      {isSavingDefaults ? <Loader size={11} className="animate-spin" /> : <Bookmark size={11} />}
                      Save as Default
                    </button>
                    <button
                      onClick={handleLoadFirebaseDefaults}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", padding: "6px 10px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#94a3b8", fontSize: "10px", fontWeight: 600, cursor: "pointer" }}
                      title="Load Firebase Defaults"
                    >
                      <RotateCcw size={11} /> Load Defaults
                    </button>
                  </div>
                  {defaultSaveMessage && (
                    <div style={{ fontSize: "10px", fontWeight: 700, color: defaultSaveMessage.includes("Error") ? "#ef4444" : "#22c55e", textAlign: "center", marginTop: "2px" }}>
                      {defaultSaveMessage}
                    </div>
                  )}
                </div>
              )}

              {/* Clause Cards List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {clauses.map((c, idx) => (
                  <div
                    key={c.id || idx}
                    style={{ padding: "10px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", background: "rgba(255,255,255,0.015)", display: "flex", flexDirection: "column", gap: "6px" }}
                  >
                    {/* Clause Header: Number, Move Up/Down, Remove */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 800, color: "#f97316", background: "rgba(249,115,22,0.1)", padding: "2px 6px", borderRadius: "4px" }}>
                          #{String(idx + 1).padStart(2, "0")}
                        </span>
                        <input
                          type="text"
                          value={c.title}
                          disabled={isLocked}
                          placeholder="Clause Title (e.g. PAYMENT TERMS)"
                          onChange={e => handleClauseChange(idx, "title", e.target.value)}
                          style={{ fontSize: "11px", fontWeight: 700, color: isLocked ? "#64748b" : "#f1f5f9", background: "transparent", border: "none", outline: "none", width: "190px", textTransform: "uppercase" }}
                        />
                      </div>
                      {!isLocked && (
                        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                          <button
                            onClick={() => handleMoveClause(idx, -1)}
                            disabled={idx === 0}
                            style={{ background: "none", border: "none", color: idx === 0 ? "#334155" : "#94a3b8", cursor: idx === 0 ? "not-allowed" : "pointer", padding: "2px" }}
                            title="Move Up"
                          >
                            <ArrowUp size={12} />
                          </button>
                          <button
                            onClick={() => handleMoveClause(idx, 1)}
                            disabled={idx === clauses.length - 1}
                            style={{ background: "none", border: "none", color: idx === clauses.length - 1 ? "#334155" : "#94a3b8", cursor: idx === clauses.length - 1 ? "not-allowed" : "pointer", padding: "2px" }}
                            title="Move Down"
                          >
                            <ArrowDown size={12} />
                          </button>
                          {clauses.length > 1 && (
                            <button
                              onClick={() => handleRemoveClause(idx)}
                              style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", padding: "2px", marginLeft: "4px" }}
                              title="Delete Clause"
                            >
                              <X size={13} />
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Clause Text */}
                    <textarea
                      rows={3}
                      value={c.text}
                      disabled={isLocked}
                      placeholder="Type clause text here..."
                      onChange={e => handleClauseChange(idx, "text", e.target.value)}
                      style={{
                        width: "100%",
                        padding: "6px 8px",
                        borderRadius: "6px",
                        border: "1px solid rgba(255,255,255,0.06)",
                        background: isLocked ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.02)",
                        color: isLocked ? "#64748b" : "#cbd5e1",
                        fontSize: "11px",
                        lineHeight: "1.4",
                        outline: "none",
                        resize: "vertical",
                        boxSizing: "border-box",
                        fontFamily: "inherit"
                      }}
                    />
                  </div>
                ))}
              </div>

              {!isLocked && (
                <button
                  onClick={handleAddClause}
                  style={{ width: "100%", padding: "7px", borderRadius: "8px", border: "1px dashed rgba(249,115,22,0.3)", background: "rgba(249,115,22,0.05)", color: "#f97316", cursor: "pointer", fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                >
                  <Plus size={13} /> Add Clause
                </button>
              )}

            </div>
          )}

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
              <div style={{ width: 1440 * zoom, height: 2100 * zoom, position: "relative", flexShrink: 0, transition: "all 0.2s" }}>
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "1440px",
                  height: "2100px",
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
                  <div style={{ border: "1.5px solid #e2e8f0", borderRadius: "16px", padding: "40px", minHeight: "1000px", background: "#fff", color: "#1e293b", fontFamily: "'Inter', sans-serif" }}>
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
                        <div dangerouslySetInnerHTML={{ __html: compileContractBody(templateBody, fields) }} />
                      </div>
                    ) : (
                      <textarea
                        ref={textareaRef}
                        value={templateBody}
                        disabled={isLocked}
                        onChange={(e) => {
                          setTemplateBody(e.target.value);
                          triggerAutoSave({ templateBody: e.target.value });
                        }}
                        placeholder="Type your contract content here... Use the buttons on the left to insert variables."
                        style={{
                          width: "100%",
                          height: "100%",
                          minHeight: "900px",
                          border: "none",
                          resize: "none",
                          outline: "none",
                          fontFamily: "monospace",
                          fontSize: "13px",
                          lineHeight: "1.6",
                          color: isLocked ? "#94a3b8" : "#334155",
                          background: "transparent",
                          whiteSpace: "pre-wrap",
                          cursor: isLocked ? "not-allowed" : "text",
                          opacity: isLocked ? 0.8 : 1
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
                  <div style={{ border: "1px solid #e2e8f0", borderRadius: "16px", minHeight: "1000px", background: "#fff", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif", overflow: "hidden" }}>

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
                        <p style={{ color: "#e2e8f0", fontSize: "12px", lineHeight: "1.4", margin: 0 }}>Please read the information carefully<br/>and confirm your details below to sign.</p>
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
                        <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px" }}>
                          <div style={{ position: "relative" }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                            <div style={{ position: "absolute", bottom: "-3px", left: "2px", right: "2px", height: "2px", background: "#ea580c" }}></div>
                          </div>
                          <h4 style={{ color: "#0f172a", fontSize: "14px", fontWeight: 800, margin: 0 }}>Electronic Signature</h4>
                        </div>
                        {currentContract?.status === "signed" ? (
                          <div style={{ marginBottom: "16px" }}>
                            <div style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, color: "#22c55e", background: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.2)", padding: "4px 10px", borderRadius: "6px", marginBottom: "16px" }}>
                              Contract Signed & Executed ✍️
                            </div>
                            <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)", padding: "24px", position: "relative", overflow: "hidden", marginBottom: "12px" }}>
                              <div style={{ position: "absolute", top: 0, right: 0, width: "60px", height: "60px", background: "linear-gradient(135deg, transparent 50%, rgba(234,88,12,0.06) 50%)", borderRadius: "0 12px 0 0" }}></div>

                              {currentContract.signature?.method === "type" ? (
                                <>
                                  <div style={{ textAlign: "center", padding: "16px 0" }}>
                                    <div style={{ fontSize: "32px", fontFamily: "'Georgia', 'Times New Roman', serif", fontWeight: 400, color: "#0f172a", letterSpacing: "1px" }}>{currentContract.signature.signatureValue}</div>
                                    <div style={{ width: "180px", height: "3px", background: "linear-gradient(90deg, transparent, #ea580c, transparent)", margin: "10px auto 0", borderRadius: "2px" }}></div>
                                  </div>
                                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "12px" }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
                                    <span style={{ fontSize: "10px", fontWeight: 700, color: "#ea580c", textTransform: "uppercase", letterSpacing: "1.5px" }}>Digitally Signed</span>
                                  </div>
                                </>
                              ) : (
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 0" }}>
                                  <img src={currentContract.signature?.signatureValue} alt="Client Signature" style={{ maxHeight: "110px", maxWidth: "90%", objectFit: "contain" }} />
                                </div>
                              )}
                            </div>
                            <div style={{ fontSize: "12px", color: "#334155", display: "flex", flexDirection: "column", gap: "4px", background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                              <div><strong>Signer:</strong> {currentContract.signature?.signerName || "—"}</div>
                              <div><strong>Email:</strong> {currentContract.signature?.signerEmail || "—"}</div>
                              <div><strong>Date:</strong> {currentContract.signature?.signedAt ? new Date(currentContract.signature.signedAt).toLocaleString() : "—"}</div>
                              {currentContract.signature?.ipAddress && <div><strong>IP:</strong> {currentContract.signature.ipAddress}</div>}
                            </div>
                          </div>
                        ) : (
                          <>
                            <div style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, color: "#ea580c", background: "#fff7ed", border: "1px solid #ffedd5", padding: "4px 10px", borderRadius: "6px", marginBottom: "16px" }}>
                              Client Section (Disabled in Builder)
                            </div>
                            <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "16px" }}>Choose how you'd like to sign</div>

                            {/* Toggle Buttons */}
                            <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                              <div onClick={() => setSignatureType("type")} style={{ flex: 1, padding: "8px 0", background: signatureType === "type" ? "#fff7ed" : "#fff", border: signatureType === "type" ? "1px solid #ea580c" : "1px solid #f1f5f9", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", cursor: "pointer", transition: "all 0.2s" }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={signatureType === "type" ? "#ea580c" : "#0f172a"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
                                <span style={{ fontSize: "12px", fontWeight: 700, color: signatureType === "type" ? "#ea580c" : "#0f172a" }}>Type</span>
                              </div>
                              <div onClick={() => setSignatureType("draw")} style={{ flex: 1, padding: "8px 0", background: signatureType === "draw" ? "#fff7ed" : "#fff", border: signatureType === "draw" ? "1px solid #ea580c" : "1px solid #f1f5f9", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", cursor: "pointer", transition: "all 0.2s" }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={signatureType === "draw" ? "#ea580c" : "#0f172a"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                <span style={{ fontSize: "12px", fontWeight: 700, color: signatureType === "draw" ? "#ea580c" : "#0f172a" }}>Draw</span>
                              </div>
                            </div>

                            {/* Signature Box */}
                            {signatureType === "draw" && (
                              <div style={{ marginBottom: "16px" }}>
                                <div style={{ border: "1px solid #f1f5f9", borderRadius: "8px", height: "130px", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", marginBottom: "8px", cursor: "not-allowed" }}>
                                  <div style={{ fontSize: "16px", color: "#94a3b8", fontWeight: 500 }}>Write signature here</div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#cbd5e1", cursor: "not-allowed", fontSize: "11px", fontWeight: 600 }}>
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                  <span>Clear (Disabled in Builder)</span>
                                </div>
                              </div>
                            )}

                            {signatureType === "type" && (
                              <div style={{ marginBottom: "16px" }}>
                                <div style={{ border: "1.5px solid #e2e8f0", borderRadius: "12px", background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)", padding: "16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                  <div style={{ fontSize: "24px", fontFamily: "'Georgia', 'Times New Roman', serif", fontWeight: 400, color: "#94a3b8", letterSpacing: "1px" }}>{clientName || "Client Name"}</div>
                                  <div style={{ width: "120px", height: "2px", background: "linear-gradient(90deg, transparent, #cbd5e1, transparent)", marginTop: "8px" }}></div>
                                </div>
                              </div>
                            )}

                            {/* Agreement Checkbox */}
                            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "20px", cursor: "not-allowed" }}>
                              <div style={{ width: "20px", height: "20px", borderRadius: "6px", background: "#fff", border: "1px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                              </div>
                              <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 500, lineHeight: "1.5", userSelect: "none" }}>
                                I have read, understood, and agree to be bound by this Agreement.
                              </div>
                            </div>

                            {/* Sign & Complete Button */}
                            <button disabled={true} style={{ width: "100%", background: "#e2e8f0", color: "#94a3b8", border: "none", borderRadius: "8px", padding: "12px", fontSize: "14px", fontWeight: 700, cursor: "not-allowed", marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                              Sign & Complete (Completed by Client)
                            </button>
                          </>
                        )}
                        {/* Secure Badge */}
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#f0fdf4", padding: "12px", borderRadius: "8px", color: "#16a34a" }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
                          <span style={{ fontSize: "11px", fontWeight: 500, lineHeight: "1.4" }}>Your signature is secure and<br/>legally binding.</span>
                        </div>

                        {/* Agency Signature */}
                        <div style={{ marginTop: "32px" }}>
                          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "12px" }}>
                            <div style={{ position: "relative" }}>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
                              <div style={{ position: "absolute", bottom: "-3px", left: "2px", right: "2px", height: "2px", background: "#ea580c" }}></div>
                            </div>
                            <h4 style={{ color: "#0f172a", fontSize: "14px", fontWeight: 800, margin: 0 }}>Agency Digital Signature</h4>
                          </div>

                          <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)", padding: "24px", position: "relative", overflow: "hidden" }}>
                            <div style={{ position: "absolute", top: 0, right: 0, width: "60px", height: "60px", background: "linear-gradient(135deg, transparent 50%, rgba(234,88,12,0.06) 50%)", borderRadius: "0 12px 0 0" }}></div>

                            {/* Digital signature name */}
                            <div style={{ textAlign: "center", padding: "16px 0" }}>
                              <div style={{ fontSize: "32px", fontFamily: "'Georgia', 'Times New Roman', serif", fontWeight: 400, color: "#0f172a", letterSpacing: "1px" }}>Ali Haider</div>
                              <div style={{ width: "180px", height: "3px", background: "linear-gradient(90deg, transparent, #ea580c, transparent)", margin: "10px auto 0", borderRadius: "2px" }}></div>
                            </div>

                            {/* Digital verification badge */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "12px" }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
                              <span style={{ fontSize: "10px", fontWeight: 700, color: "#ea580c", textTransform: "uppercase", letterSpacing: "1.5px" }}>Digitally Signed</span>
                            </div>
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
                      <div style={{ fontSize: "15px", color: "#f8fafc", fontWeight: 800 }}>{formatDate(contractDate)}</div>
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
                      <div style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 500, marginBottom: "4px" }}>Monthly Management Fee</div>
                      <div style={{ fontSize: "15px", color: "#f8fafc", fontWeight: 800 }}>{formatInvestmentValue(monthlyRetainer)}</div>
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

      {/* ── EMAIL TEMPLATE SHARE MODAL ── */}
      {isEmailModalOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(9, 13, 22, 0.8)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999
        }}>
          <div style={{
            background: "#121212",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px",
            padding: "32px",
            width: "600px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            fontFamily: "'Inter', sans-serif"
          }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "16px" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "#fff" }}>Client Outreach Email</h3>
                <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#94a3b8" }}>Send this pre-formatted email to your client to request their signature.</p>
              </div>
              <button
                onClick={() => setIsEmailModalOpen(false)}
                style={{ background: "rgba(255,255,255,0.04)", border: "none", color: "#94a3b8", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }}
              >
                ✕
              </button>
            </div>

            {/* Subject Line */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Subject Line</label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                style={{
                  background: "#090d16",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  color: "#fff",
                  fontSize: "13px",
                  outline: "none"
                }}
              />
            </div>

            {/* Email Preview Card */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Email Preview</label>
              <div style={{
                background: "#090d16",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "12px",
                padding: "20px",
                maxHeight: "220px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                fontSize: "13px",
                color: "#cbd5e1",
                lineHeight: "1.6"
              }}>
                <p style={{ margin: 0 }}>Hi {clientName || "Partner"},</p>
                <p style={{ margin: 0 }}>We have successfully drafted our Amazon Growth Partnership Agreement and it is ready for your review and digital signature.</p>
                <div style={{ padding: "8px 12px", background: "rgba(249,115,22,0.1)", border: "1px dashed rgba(249,115,22,0.3)", borderRadius: "8px", color: "#f97316", fontSize: "12px", fontWeight: 600 }}>
                  ✍️ Link: {shareLink || "Generated upon publish"}
                </div>
                <p style={{ margin: 0 }}>Warm regards,<br /><strong>The Grow Orbit Team</strong></p>
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
              <button
                onClick={() => setIsEmailModalOpen(false)}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#94a3b8",
                  borderRadius: "10px",
                  padding: "10px 18px",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                Close
              </button>
              <button
                onClick={copyRichEmail}
                style={{
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                  border: "none",
                  color: "#fff",
                  borderRadius: "10px",
                  padding: "10px 24px",
                  fontSize: "12px",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                {emailCopied ? <Check size={14} /> : <Copy size={14} />}
                {emailCopied ? "Copied Formatted Email!" : "Copy Full HTML Email"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SUCCESS MODAL AFTER PUBLISH ── */}
      {showSuccessModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(9, 13, 22, 0.85)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999
        }}>
          <div style={{
            background: "#121212",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px",
            padding: "36px",
            width: "500px",
            textAlign: "center",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
            fontFamily: "'Inter', sans-serif"
          }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(34, 197, 94, 0.15)", border: "1px solid rgba(34, 197, 94, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto", color: "#22c55e" }}>
              <Check size={28} />
            </div>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "20px", fontWeight: 800, color: "#fff" }}>Contract Published!</h3>
            <p style={{ margin: "0 0 24px 0", fontSize: "13px", color: "#94a3b8", lineHeight: "1.5" }}>
              The agreement is now locked and ready to be signed by <strong>{clientName || "the client"}</strong>.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                onClick={copyLink}
                style={{
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                  border: "none",
                  color: "#fff",
                  borderRadius: "12px",
                  padding: "12px",
                  fontSize: "13px",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px"
                }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied E-Sign Link!" : "Copy E-Sign Link"}
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setIsEmailModalOpen(true);
                }}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#fff",
                  borderRadius: "12px",
                  padding: "12px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px"
                }}
              >
                <Send size={15} />
                Send Outreach Email
              </button>
              <button
                onClick={() => setShowSuccessModal(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#64748b",
                  fontSize: "12px",
                  cursor: "pointer",
                  marginTop: "6px"
                }}
              >
                Stay in Builder
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ContractBuilderPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#090d16", color: "#fff" }}>
        <Loader className="animate-spin text-orange-500" size={32} />
      </div>
    }>
      <ContractBuilderWorkspace />
    </Suspense>
  );
}
