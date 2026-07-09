"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  X, Save, Send, Eye, Copy, Trash2, Loader, FileText, History, 
  Calendar, Check, ExternalLink, Lock, RefreshCw, AlertTriangle, Play
} from "lucide-react";
import { auth } from "../../../firebase/firebaseConfig";

const CONTRACT_STATUS_CONFIG = {
  draft: { label: "Draft", color: "#71717a", bg: "rgba(113,113,122,0.15)", border: "rgba(113,113,122,0.25)" },
  awaiting_review: { label: "Awaiting Review", color: "#f97316", bg: "rgba(249,115,22,0.15)", border: "rgba(249,115,22,0.25)" },
  awaiting_signature: { label: "Awaiting Signature", color: "#eab308", bg: "rgba(234,179,8,0.15)", border: "rgba(234,179,8,0.25)" },
  viewed: { label: "Viewed 👁️", color: "#3b82f6", bg: "rgba(59,130,246,0.15)", border: "rgba(59,130,246,0.25)" },
  signed: { label: "Signed ✍️", color: "#22c55e", bg: "rgba(34,197,94,0.15)", border: "rgba(34,197,94,0.25)" },
  expired: { label: "Expired ⏳", color: "#ef4444", bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.25)" },
  void: { label: "Voided 🚫", color: "#64748b", bg: "rgba(100,116,139,0.15)", border: "rgba(100,116,139,0.25)" },
  completed: { label: "Completed 🎉", color: "#10b981", bg: "rgba(16,185,129,0.15)", border: "rgba(16,185,129,0.25)" }
};

export default function ContractWorkspaceModal({ contract, onClose, onRefreshLeads }) {
  const [currentContract, setCurrentContract] = useState(contract);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [templateCategory, setTemplateCategory] = useState("Amazon Services");
  
  // Editor States
  const [clientName, setClientName] = useState(contract.clientName || "");
  const [companyName, setCompanyName] = useState(contract.companyName || "");
  const [clientEmail, setClientEmail] = useState(contract.clientEmail || "");
  const [clientPhone, setClientPhone] = useState(contract.clientPhone || "");
  const [requestedService, setRequestedService] = useState(contract.requestedService || "");
  const [monthlyRetainer, setMonthlyRetainer] = useState(contract.monthlyRetainer || 0);
  const [termLength, setTermLength] = useState(contract.termLength || "Month-to-month");
  const [paymentTerms, setPaymentTerms] = useState(contract.paymentTerms || "Net 15");
  const [contractDate, setContractDate] = useState(contract.contractDate ? new Date(contract.contractDate.toDate ? contract.contractDate.toDate() : contract.contractDate).toISOString().substring(0, 10) : "");
  const [startDate, setStartDate] = useState(contract.startDate ? new Date(contract.startDate.toDate ? contract.startDate.toDate() : contract.startDate).toISOString().substring(0, 10) : "");
  const [endDate, setEndDate] = useState(contract.endDate ? new Date(contract.endDate.toDate ? contract.endDate.toDate() : contract.endDate).toISOString().substring(0, 10) : "");
  const [notes, setNotes] = useState(contract.notes || "");
  const [templateBody, setTemplateBody] = useState(contract.templateBody || "");
  
  const [expirationDays, setExpirationDays] = useState(contract.expiresAt ? "custom" : "none");
  const [customExpirationDate, setCustomExpirationDate] = useState(contract.expiresAt ? new Date(contract.expiresAt.toDate ? contract.expiresAt.toDate() : contract.expiresAt).toISOString().substring(0, 10) : "");

  // Versioning and UI Modes
  const [versions, setVersions] = useState([]);
  const [selectedVersionNum, setSelectedVersionNum] = useState(contract.currentVersion || 1);
  const [previewMode, setPreviewMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [isSaving, setIsSaving] = useState(false);
  const [isVoiding, setIsVoiding] = useState(false);
  const [voidReason, setVoidReason] = useState("");
  
  // Sharing & Copying
  const [copiedLink, setCopiedLink] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [regeneratingLink, setRegeneratingLink] = useState(false);

  const textareaRef = useRef(null);
  const autoSaveTimeoutRef = useRef(null);

  const isLocked = !["draft", "awaiting_review"].includes(currentContract.status);

  // Fetch templates and versions on mount
  useEffect(() => {
    fetchTemplates();
    fetchVersions();
  }, [currentContract.id]);

  const fetchTemplates = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch("/api/contracts/templates", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setTemplates(data.templates);
      }
    } catch (err) {
      console.warn("Failed to load templates", err);
    }
  };

  const fetchVersions = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(`/api/contracts/${currentContract.id}/versions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setVersions(data.versions);
      }
    } catch (err) {
      console.warn("Failed to load versions", err);
    }
  };

  // Auto save trigger
  const triggerAutoSave = (updatedFields) => {
    if (isLocked) return;
    setSaveStatus("Saving...");
    if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);

    autoSaveTimeoutRef.current = setTimeout(async () => {
      try {
        const token = await auth.currentUser?.getIdToken();
        const res = await fetch(`/api/contracts/${currentContract.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            clientName, companyName, clientEmail, clientPhone,
            requestedService, monthlyRetainer, termLength, paymentTerms,
            contractDate, startDate, endDate, notes, templateBody,
            expirationDays, customExpirationDate,
            isAutoSave: true,
            ...updatedFields
          })
        });
        const data = await res.json();
        if (data.success) {
          setSaveStatus("Saved just now");
          setCurrentContract(data.contract);
          onRefreshLeads();
        } else {
          setSaveStatus("Error saving");
        }
      } catch (err) {
        setSaveStatus("Error saving");
      }
    }, 4000); // 4 seconds debounce
  };

  // Apply template body
  const handleSelectTemplate = (templateId) => {
    if (isLocked) return;
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setTemplateBody(template.body);
      triggerAutoSave({ templateBody: template.body, templateId });
    }
  };

  // Variable Picker insertion
  const insertVariable = (variable) => {
    if (isLocked) return;
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);

    const newText = before + variable + after;
    setTemplateBody(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + variable.length;
    }, 0);

    triggerAutoSave({ templateBody: newText });
  };

  // Save manual new version
  const handleSaveNewVersion = async () => {
    if (isLocked) return;
    setIsSaving(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      // First auto-save any changes
      await fetch(`/api/contracts/${currentContract.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          clientName, companyName, clientEmail, clientPhone,
          requestedService, monthlyRetainer, termLength, paymentTerms,
          contractDate, startDate, endDate, notes, templateBody,
          expirationDays, customExpirationDate
        })
      });

      // Then trigger version snapshot
      const res = await fetch(`/api/contracts/${currentContract.id}/versions`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        alert(`Successfully saved Version ${data.currentVersion}`);
        fetchVersions();
        setSelectedVersionNum(data.currentVersion);
        // Refresh contract
        const conRes = await fetch(`/api/contracts?leadId=${currentContract.leadId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const conData = await conRes.json();
        if (conData.success) {
          const fresh = conData.contracts.find(c => c.id === currentContract.id);
          if (fresh) setCurrentContract(fresh);
        }
        onRefreshLeads();
      }
    } catch (err) {
      alert("Failed to save new version: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Load old version snapshot (read-only preview or replace)
  const handleLoadVersion = (versionNum) => {
    const version = versions.find(v => v.versionNumber === Number(versionNum));
    if (version) {
      setSelectedVersionNum(Number(versionNum));
      if (!isLocked) {
        if (confirm(`Do you want to restore the editor content to Version ${versionNum}? Current unsaved draft changes will be overwritten.`)) {
          const c = version.content;
          setClientName(c.clientName || "");
          setCompanyName(c.companyName || "");
          setClientEmail(c.clientEmail || "");
          setClientPhone(c.clientPhone || "");
          setRequestedService(c.requestedService || "");
          setMonthlyRetainer(c.monthlyRetainer || 0);
          setTermLength(c.termLength || "");
          setPaymentTerms(c.paymentTerms || "");
          setContractDate(c.contractDate ? new Date(c.contractDate).toISOString().substring(0, 10) : "");
          setStartDate(c.startDate ? new Date(c.startDate).toISOString().substring(0, 10) : "");
          setEndDate(c.endDate ? new Date(c.endDate).toISOString().substring(0, 10) : "");
          setNotes(c.notes || "");
          setTemplateBody(c.templateBody || "");
          
          triggerAutoSave({
            clientName: c.clientName,
            companyName: c.companyName,
            clientEmail: c.clientEmail,
            clientPhone: c.clientPhone,
            requestedService: c.requestedService,
            monthlyRetainer: c.monthlyRetainer,
            termLength: c.termLength,
            paymentTerms: c.paymentTerms,
            contractDate: c.contractDate,
            startDate: c.startDate,
            endDate: c.endDate,
            notes: c.notes,
            templateBody: c.templateBody
          });
        }
      }
    }
  };

  // Publish / Send for Signature
  const handlePublishContract = async () => {
    if (isLocked) return;
    if (!confirm("Are you sure you want to lock this contract and publish it? The content will become immutable, and a secure public signing link will be generated.")) return;
    
    setIsSaving(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      // Auto-save current
      await fetch(`/api/contracts/${currentContract.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          clientName, companyName, clientEmail, clientPhone,
          requestedService, monthlyRetainer, termLength, paymentTerms,
          contractDate, startDate, endDate, notes, templateBody,
          expirationDays, customExpirationDate
        })
      });

      const res = await fetch(`/api/contracts/${currentContract.id}/send`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        alert("Contract published successfully!");
        // Refresh contract
        const conRes = await fetch(`/api/contracts?leadId=${currentContract.leadId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const conData = await conRes.json();
        if (conData.success) {
          const fresh = conData.contracts.find(c => c.id === currentContract.id);
          if (fresh) setCurrentContract(fresh);
        }
        onRefreshLeads();
      } else {
        alert("Error publishing: " + data.error);
      }
    } catch (err) {
      alert("Failed to publish: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Void Contract
  const handleVoidContract = async () => {
    if (!voidReason.trim()) {
      alert("Voiding reason is required");
      return;
    }
    setIsVoiding(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(`/api/contracts/${currentContract.id}/void`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ reason: voidReason })
      });
      const data = await res.json();
      if (data.success) {
        alert("Contract voided successfully!");
        setVoidReason("");
        // Refresh contract
        const conRes = await fetch(`/api/contracts?leadId=${currentContract.leadId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const conData = await conRes.json();
        if (conData.success) {
          const fresh = conData.contracts.find(c => c.id === currentContract.id);
          if (fresh) setCurrentContract(fresh);
        }
        onRefreshLeads();
      }
    } catch (err) {
      alert("Failed to void contract: " + err.message);
    } finally {
      setIsVoiding(false);
    }
  };

  // Duplicate Contract
  const handleDuplicateContract = async () => {
    setIsSaving(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(`/api/contracts/${currentContract.id}/duplicate`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        alert("Contract duplicated into a new Draft!");
        setCurrentContract(data.contract);
        // Reset local editor fields
        const c = data.contract;
        setClientName(c.clientName || "");
        setCompanyName(c.companyName || "");
        setClientEmail(c.clientEmail || "");
        setClientPhone(c.clientPhone || "");
        setRequestedService(c.requestedService || "");
        setMonthlyRetainer(c.monthlyRetainer || 0);
        setTermLength(c.termLength || "");
        setPaymentTerms(c.paymentTerms || "");
        setContractDate(c.contractDate ? new Date(c.contractDate).toISOString().substring(0, 10) : "");
        setStartDate(c.startDate ? new Date(c.startDate).toISOString().substring(0, 10) : "");
        setEndDate(c.endDate ? new Date(c.endDate).toISOString().substring(0, 10) : "");
        setNotes(c.notes || "");
        setTemplateBody(c.templateBody || "");
        setSelectedVersionNum(1);
        setVersions([]);
        onRefreshLeads();
      }
    } catch (err) {
      alert("Failed to duplicate: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Regenerate signing token
  const handleRegenerateLink = async () => {
    if (!confirm("Are you sure you want to generate a new signing link? The previous link will become immediately invalid.")) return;
    setRegeneratingLink(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(`/api/contracts/${currentContract.id}/send`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        alert("New signing link generated successfully.");
        // Refresh contract
        const conRes = await fetch(`/api/contracts?leadId=${currentContract.leadId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const conData = await conRes.json();
        if (conData.success) {
          const fresh = conData.contracts.find(c => c.id === currentContract.id);
          if (fresh) setCurrentContract(fresh);
        }
        onRefreshLeads();
      }
    } catch (err) {
      alert("Failed to regenerate link: " + err.message);
    } finally {
      setRegeneratingLink(false);
    }
  };

  // Copy Link helper
  const handleCopyLink = () => {
    if (!currentContract.shareToken) return;
    const url = `${window.location.origin}/sign/${currentContract.shareToken}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Compile Copy Email contents
  const handleOpenEmailModal = () => {
    const link = `${window.location.origin}/sign/${currentContract.shareToken}`;
    const subject = `Service Agreement Ready for Review - ${companyName || clientName} (${currentContract.contractNumber})`;
    const body = `Hi ${clientName},\n\nWe have finalized your customized Brand Growth Strategy and Service Agreement based on our recent discussion of your products.\n\nYou can review the agreement, sign it electronically, and download a copy here:\n${link}\n\nIf you have any questions or would like to make revisions, please reach out.\n\nWarm regards,\nThe Grow Orbit Team`;
    
    setEmailSubject(subject);
    setEmailBody(body);
    setShowEmailModal(true);
  };

  const copyEmailSubject = () => {
    navigator.clipboard.writeText(emailSubject);
    setCopiedSubject(true);
    setTimeout(() => setCopiedSubject(false), 2000);
  };

  const copyEmailBody = () => {
    navigator.clipboard.writeText(emailBody);
    setCopiedBody(true);
    setTimeout(() => setCopiedBody(false), 2000);
  };

  const copyAllEmail = () => {
    navigator.clipboard.writeText(`Subject: ${emailSubject}\n\n${emailBody}`);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const statusCfg = CONTRACT_STATUS_CONFIG[currentContract.status] || CONTRACT_STATUS_CONFIG.draft;

  // Simple compiler preview helper
  const getCompiledPreview = () => {
    let text = templateBody || "";
    const formatDate = (val) => {
      if (!val) return "—";
      const d = new Date(val);
      return isNaN(d.getTime()) ? val : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    };

    const replacements = {
      "{{client_name}}": clientName || "—",
      "{{company_name}}": companyName || "—",
      "{{client_email}}": clientEmail || "—",
      "{{client_phone}}": clientPhone || "—",
      "{{requested_service}}": requestedService || "—",
      "{{monthly_retainer}}": monthlyRetainer ? `$${monthlyRetainer}` : "—",
      "{{term_length}}": termLength || "—",
      "{{payment_terms}}": paymentTerms || "—",
      "{{contract_date}}": formatDate(contractDate),
      "{{start_date}}": formatDate(startDate),
      "{{end_date}}": formatDate(endDate),
    };

    Object.entries(replacements).forEach(([placeholder, value]) => {
      text = text.split(placeholder).join(value);
    });

    return text;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" style={{ color: "#fff" }}>
      <div className="relative w-full max-w-[95%] h-[92vh] bg-[#0d0d0d] border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-bottom border-white/5 bg-[#141414]">
          <div className="flex items-center gap-3">
            <FileText size={20} className="text-orange-500" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-wide uppercase">{currentContract.contractNumber}</span>
                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full" 
                  style={{ color: statusCfg.color, background: statusCfg.bg, border: `1px solid ${statusCfg.border}` }}>
                  {statusCfg.label}
                </span>
              </div>
              <div className="text-[10px] text-zinc-500">Lead: {clientName} ({companyName})</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-zinc-400">
              Auto-Save: <span className="text-zinc-500">{saveStatus}</span>
            </span>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-all">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Main Grid */}
        <div className="flex-1 grid grid-cols-[300px_1fr_300px] overflow-hidden">
          
          {/* LEFT PANEL - Options & Variables */}
          <div className="border-r border-white/5 bg-[#0f0f0f] overflow-y-auto p-5 flex flex-col gap-5">
            
            {/* Category / Template Selector */}
            <div>
              <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">Template Library</div>
              <select 
                value={templateCategory} 
                onChange={(e) => setTemplateCategory(e.target.value)}
                className="w-full bg-[#161616] border border-white/10 rounded-lg p-2 text-[11px] mb-2 outline-none"
              >
                <option value="Amazon Services">Amazon Services</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Marketing">Marketing</option>
                <option value="Consulting">Consulting</option>
              </select>
              
              <select 
                value={selectedTemplate}
                onChange={(e) => { setSelectedTemplate(e.target.value); handleSelectTemplate(e.target.value); }}
                disabled={isLocked}
                className="w-full bg-[#161616] border border-white/10 rounded-lg p-2 text-[11px] outline-none"
              >
                <option value="">Select template...</option>
                {templates.filter(t => t.category === templateCategory).map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            {/* Merge Field Variables Picker */}
            <div>
              <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">Insert Merge Fields</div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: "Client Name", var: "{{client_name}}" },
                  { label: "Company", var: "{{company_name}}" },
                  { label: "Email", var: "{{client_email}}" },
                  { label: "Phone", var: "{{client_phone}}" },
                  { label: "Services", var: "{{requested_service}}" },
                  { label: "Retainer ($)", var: "{{monthly_retainer}}" },
                  { label: "Term", var: "{{term_length}}" },
                  { label: "Payments", var: "{{payment_terms}}" },
                  { label: "Contract Date", var: "{{contract_date}}" },
                  { label: "Start Date", var: "{{start_date}}" },
                  { label: "End Date", var: "{{end_date}}" }
                ].map((field, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => insertVariable(field.var)}
                    disabled={isLocked}
                    className="bg-[#1a1a1a] hover:bg-white/5 border border-white/5 text-[9px] font-bold p-2 rounded-lg text-left truncate transition-all outline-none"
                  >
                    {field.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Structured Contract Fields Form */}
            <div className="flex flex-col gap-3 border-t border-white/5 pt-4">
              <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Contract Properties</div>
              
              <div>
                <label className="text-[8px] font-bold text-zinc-400 uppercase block mb-1">Client Full Name</label>
                <input 
                  type="text" 
                  value={clientName} 
                  onChange={(e) => { setClientName(e.target.value); triggerAutoSave({ clientName: e.target.value }); }}
                  disabled={isLocked}
                  className="w-full bg-[#141414] border border-white/5 rounded-lg p-2 text-[11px] outline-none"
                />
              </div>

              <div>
                <label className="text-[8px] font-bold text-zinc-400 uppercase block mb-1">Company Name</label>
                <input 
                  type="text" 
                  value={companyName} 
                  onChange={(e) => { setCompanyName(e.target.value); triggerAutoSave({ companyName: e.target.value }); }}
                  disabled={isLocked}
                  className="w-full bg-[#141414] border border-white/5 rounded-lg p-2 text-[11px] outline-none"
                />
              </div>

              <div>
                <label className="text-[8px] font-bold text-zinc-400 uppercase block mb-1">Client Email</label>
                <input 
                  type="email" 
                  value={clientEmail} 
                  onChange={(e) => { setClientEmail(e.target.value); triggerAutoSave({ clientEmail: e.target.value }); }}
                  disabled={isLocked}
                  className="w-full bg-[#141414] border border-white/5 rounded-lg p-2 text-[11px] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[8px] font-bold text-zinc-400 uppercase block mb-1">Monthly Retainer ($)</label>
                  <input 
                    type="number" 
                    value={monthlyRetainer} 
                    onChange={(e) => { setMonthlyRetainer(Number(e.target.value)); triggerAutoSave({ monthlyRetainer: Number(e.target.value) }); }}
                    disabled={isLocked}
                    className="w-full bg-[#141414] border border-white/5 rounded-lg p-2 text-[11px] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[8px] font-bold text-zinc-400 uppercase block mb-1">Term Length</label>
                  <input 
                    type="text" 
                    value={termLength} 
                    onChange={(e) => { setTermLength(e.target.value); triggerAutoSave({ termLength: e.target.value }); }}
                    disabled={isLocked}
                    className="w-full bg-[#141414] border border-white/5 rounded-lg p-2 text-[11px] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[8px] font-bold text-zinc-400 uppercase block mb-1">Start Date</label>
                  <input 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => { setStartDate(e.target.value); triggerAutoSave({ startDate: e.target.value }); }}
                    disabled={isLocked}
                    className="w-full bg-[#141414] border border-white/5 rounded-lg p-2 text-[11px] outline-none color-scheme-dark"
                  />
                </div>
                <div>
                  <label className="text-[8px] font-bold text-zinc-400 uppercase block mb-1">End Date</label>
                  <input 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => { setEndDate(e.target.value); triggerAutoSave({ endDate: e.target.value }); }}
                    disabled={isLocked}
                    className="w-full bg-[#141414] border border-white/5 rounded-lg p-2 text-[11px] outline-none color-scheme-dark"
                  />
                </div>
              </div>

              {/* Expiration Settings */}
              <div>
                <label className="text-[8px] font-bold text-zinc-400 uppercase block mb-1">Agreement Expiration</label>
                <select 
                  value={expirationDays} 
                  onChange={(e) => { setExpirationDays(e.target.value); triggerAutoSave({ expirationDays: e.target.value }); }}
                  disabled={isLocked}
                  className="w-full bg-[#141414] border border-white/5 rounded-lg p-2 text-[11px] mb-2 outline-none"
                >
                  <option value="none">No Expiration</option>
                  <option value="7">7 Days</option>
                  <option value="14">14 Days</option>
                  <option value="30">30 Days</option>
                  <option value="custom">Custom Date</option>
                </select>
                {expirationDays === "custom" && (
                  <input 
                    type="date" 
                    value={customExpirationDate} 
                    onChange={(e) => { setCustomExpirationDate(e.target.value); triggerAutoSave({ customExpirationDate: e.target.value }); }}
                    disabled={isLocked}
                    className="w-full bg-[#141414] border border-white/5 rounded-lg p-2 text-[11px] outline-none color-scheme-dark"
                  />
                )}
              </div>

              {/* Internal Notes */}
              <div>
                <label className="text-[8px] font-bold text-zinc-400 uppercase block mb-1">Private Internal Notes</label>
                <textarea 
                  placeholder="Only visible to admins..."
                  value={notes} 
                  onChange={(e) => { setNotes(e.target.value); triggerAutoSave({ notes: e.target.value }); }}
                  className="w-full bg-[#141414] border border-white/5 rounded-lg p-2 text-[11px] outline-none h-16 resize-none"
                />
              </div>

            </div>

          </div>

          {/* CENTER PANEL - Document Editor */}
          <div className="flex flex-col bg-[#111111] overflow-hidden relative">
            
            {/* Watermark Overlay in Editor */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none opacity-[0.02]">
              <span className="text-9xl font-black tracking-widest rotate-[-45deg] uppercase">
                {currentContract.status === "draft" ? "DRAFT" : currentContract.status === "signed" ? "SIGNED" : "AWAITING SIGNATURE"}
              </span>
            </div>

            {/* Sticky Actions Toolbar */}
            <div className="z-10 flex items-center justify-between px-6 py-3 border-b border-white/5 bg-[#141414]">
              <div className="flex gap-2">
                <button 
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all outline-none ${previewMode ? "bg-orange-500 text-white" : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"}`}
                >
                  <Eye size={12} /> {previewMode ? "Editor Mode" : "Preview Document"}
                </button>
                
                {!isLocked && (
                  <button 
                    onClick={handleSaveNewVersion}
                    disabled={isSaving}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded-lg text-[10px] font-bold transition-all outline-none"
                  >
                    {isSaving ? <Loader size={12} className="animate-spin" /> : <Save size={12} />} Create Version
                  </button>
                )}

                <button 
                  onClick={handleDuplicateContract}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded-lg text-[10px] font-bold transition-all outline-none"
                >
                  Duplicate Contract
                </button>
              </div>

              <div className="flex gap-2">
                {!isLocked && (
                  <button 
                    onClick={handlePublishContract}
                    disabled={isSaving}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-[10px] font-extrabold uppercase tracking-wide transition-all outline-none"
                  >
                    {isSaving ? <Loader size={12} className="animate-spin" /> : <Send size={12} />} Publish & Send
                  </button>
                )}

                {currentContract.status === "signed" && (
                  <a 
                    href={`/api/contracts/${currentContract.id}/pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-[10px] font-extrabold uppercase tracking-wide transition-all outline-none text-decoration-none"
                  >
                    Download Executed PDF
                  </a>
                )}
              </div>
            </div>

            {/* Document Work Area */}
            <div className="flex-1 overflow-y-auto p-8 flex justify-center z-10">
              {previewMode ? (
                /* Document Preview Mode */
                <div className="w-full max-w-[800px] min-h-[842px] bg-white text-[#1e293b] p-12 rounded-xl shadow-lg flex flex-col font-serif" style={{ color: "#1e293b" }}>
                  <div className="flex justify-between items-center border-b border-zinc-200 pb-6 mb-8 font-sans">
                    <span className="font-bold text-md tracking-widest text-[#0f172a]">GROW ORBIT</span>
                    <span className="text-[10px] font-bold text-zinc-400">{currentContract.contractNumber}</span>
                  </div>
                  
                  <div className="flex-1 text-[12px] leading-relaxed">
                    <div dangerouslySetInnerHTML={{ __html: getCompiledPreview() }} />
                  </div>
                  
                  {/* Embedded signatures in preview */}
                  <div className="flex justify-between items-center border-t border-zinc-200 pt-8 mt-12 font-sans text-[11px]">
                    <div className="w-[45%]">
                      <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Grow Orbit Representative</div>
                      <div className="border-b border-zinc-300 py-3 mb-1 font-serif italic text-lg text-zinc-800">Grow Orbit Team</div>
                      <div className="text-[9px] text-zinc-400">Date: {new Date().toLocaleDateString()}</div>
                    </div>

                    <div className="w-[45%]">
                      <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Client Signatory</div>
                      <div className="border-b border-zinc-300 py-3 mb-1 min-h-[40px] flex items-center">
                        {currentContract.status === "signed" && currentContract.signature ? (
                          currentContract.signature.method === "typed" ? (
                            <span className="font-serif italic text-lg text-zinc-800">{currentContract.signature.signatureValue}</span>
                          ) : (
                            <img src={currentContract.signature.signatureValue} alt="client signature" className="max-h-[35px] max-w-full object-contain" />
                          )
                        ) : (
                          <span className="text-zinc-300 italic text-[10px]">Awaiting signature...</span>
                        )}
                      </div>
                      <div className="text-[9px] text-zinc-400">
                        Date: {currentContract.status === "signed" ? new Date(currentContract.signedAt?.toDate ? currentContract.signedAt.toDate() : currentContract.signedAt).toLocaleDateString() : "Pending"}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Rich Editor Text Area */
                <div className="w-full max-w-[800px] h-full flex flex-col bg-[#141414] border border-white/5 rounded-xl shadow-lg overflow-hidden">
                  <div className="px-4 py-2 bg-[#1a1a1a] border-b border-white/5 text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
                    HTML Contract Document Text Editor
                  </div>
                  <textarea
                    ref={textareaRef}
                    disabled={isLocked}
                    value={templateBody}
                    onChange={(e) => { setTemplateBody(e.target.value); triggerAutoSave({ templateBody: e.target.value }); }}
                    className="flex-1 bg-transparent text-zinc-300 p-6 font-mono text-[12px] leading-relaxed outline-none border-none resize-none h-full"
                    placeholder="Enter agreement terms here using HTML tags like <p>, <h2>, <ul>, <li>..."
                  />
                </div>
              )}
            </div>

          </div>

          {/* RIGHT PANEL - Timeline, Versions, Sharing */}
          <div className="border-l border-white/5 bg-[#0f0f0f] overflow-y-auto p-5 flex flex-col gap-6">
            
            {/* Version History Dropdown */}
            <div>
              <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex justify-between items-center">
                <span>Version History</span>
                <span className="text-zinc-600 font-bold text-[8px]">v{currentContract.currentVersion} active</span>
              </div>
              <select 
                value={selectedVersionNum}
                onChange={(e) => handleLoadVersion(e.target.value)}
                className="w-full bg-[#161616] border border-white/10 rounded-lg p-2 text-[11px] outline-none"
              >
                {versions.map(v => (
                  <option key={v.versionNumber} value={v.versionNumber}>
                    Version {v.versionNumber} ({new Date(v.createdAt?.toDate ? v.createdAt.toDate() : v.createdAt).toLocaleDateString()})
                  </option>
                ))}
              </select>
            </div>

            {/* Public Link Sharing & Email Generation */}
            {currentContract.shareToken && (
              <div className="border-t border-white/5 pt-4">
                <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">Secure Link & Sharing</div>
                <div className="flex flex-col gap-2">
                  <div className="bg-[#141414] border border-white/5 rounded-lg p-2 text-[10px] text-zinc-400 break-all select-all font-mono">
                    {window.location.origin}/sign/{currentContract.shareToken}
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={handleCopyLink}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded-lg text-[10px] font-bold transition-all outline-none"
                    >
                      {copiedLink ? <Check size={12} className="text-green-500" /> : <Copy size={12} />} {copiedLink ? "Copied" : "Copy Link"}
                    </button>
                    
                    <button 
                      onClick={handleOpenEmailModal}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-lg text-[10px] font-bold transition-all outline-none"
                    >
                      Generate Email
                    </button>
                  </div>

                  {!isLocked && (
                    <button 
                      onClick={handleRegenerateLink}
                      disabled={regeneratingLink}
                      className="flex items-center justify-center gap-1.5 py-1.5 text-zinc-500 hover:text-zinc-300 text-[9px] font-bold transition-all outline-none mt-1"
                    >
                      <RefreshCw size={10} className={regeneratingLink ? "animate-spin" : ""} /> Regenerate Link
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Read Analytics */}
            {currentContract.shareToken && (
              <div className="border-t border-white/5 pt-4">
                <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">Read Analytics</div>
                <div className="bg-[#141414] border border-white/5 rounded-xl p-3 flex flex-col gap-2.5 text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Total Views</span>
                    <span className="font-bold text-white">{currentContract.analytics?.viewsCount || 0} Times</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">First View</span>
                    <span className="font-bold text-white">
                      {currentContract.analytics?.firstViewedAt ? new Date(currentContract.analytics.firstViewedAt.toDate ? currentContract.analytics.firstViewedAt.toDate() : currentContract.analytics.firstViewedAt).toLocaleDateString() : "Never"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Last View</span>
                    <span className="font-bold text-white">
                      {currentContract.analytics?.lastViewedAt ? new Date(currentContract.analytics.lastViewedAt.toDate ? currentContract.analytics.lastViewedAt.toDate() : currentContract.analytics.lastViewedAt).toLocaleDateString() : "Never"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Reading Time</span>
                    <span className="font-bold text-white">
                      {currentContract.analytics?.totalReadingTimeMs 
                        ? `${Math.floor(currentContract.analytics.totalReadingTimeMs / 60000)}m ${Math.floor((currentContract.analytics.totalReadingTimeMs % 60000) / 1000)}s`
                        : "0s"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Logs Timeline */}
            <div className="border-t border-white/5 pt-4 flex-1 flex flex-col min-h-0">
              <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3">Activity Timeline</div>
              <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1">
                {(currentContract.auditTrail || []).slice().reverse().map((log, idx) => (
                  <div key={idx} className="relative pl-3 border-l border-white/10 text-[10px]">
                    <div className="absolute left-[-3.5px] top-1 w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <div className="flex justify-between font-bold text-zinc-300">
                      <span>{log.event}</span>
                      <span className="text-[8px] text-zinc-500 font-mono">
                        {new Date(log.timestamp?.toDate ? log.timestamp.toDate() : log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="text-[8px] text-zinc-500 mt-0.5">
                      By: {log.userEmail || "System"} • IP: {log.ip || "—"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Void Contract Actions Panel */}
            {currentContract.status !== "void" && (
              <div className="border-t border-white/5 pt-4">
                <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">Void Contract</div>
                <input 
                  type="text"
                  placeholder="Enter reason to void..."
                  value={voidReason}
                  onChange={(e) => setVoidReason(e.target.value)}
                  className="w-full bg-[#141414] border border-white/5 rounded-lg p-2 text-[10px] mb-2 outline-none"
                />
                <button
                  onClick={handleVoidContract}
                  disabled={isVoiding || !voidReason.trim()}
                  className="w-full py-2 bg-red-600/10 hover:bg-red-600/20 border border-red-500/10 hover:border-red-500/20 text-red-500 rounded-lg text-[10px] font-extrabold uppercase transition-all outline-none"
                >
                  {isVoiding ? "Voiding..." : "Void Agreement"}
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* GENERATE EMAIL COPY MODAL */}
      {showEmailModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-[600px] bg-[#141414] border border-white/10 rounded-xl p-6 flex flex-col gap-4 shadow-2xl">
            
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-sm uppercase tracking-wide">Generate Email Copy</span>
              <button onClick={() => setShowEmailModal(false)} className="p-1 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-all">
                <X size={16} />
              </button>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Email Subject</label>
                <button onClick={copyEmailSubject} className="text-[9px] text-orange-500 hover:underline flex items-center gap-1">
                  {copiedSubject ? <Check size={10} /> : <Copy size={10} />} {copiedSubject ? "Copied" : "Copy Subject"}
                </button>
              </div>
              <input 
                type="text" 
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="w-full bg-[#0d0d0d] border border-white/5 rounded-lg p-2 text-[11px] outline-none text-zinc-300"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Email Body</label>
                <button onClick={copyEmailBody} className="text-[9px] text-orange-500 hover:underline flex items-center gap-1">
                  {copiedBody ? <Check size={10} /> : <Copy size={10} />} {copiedBody ? "Copied" : "Copy Body"}
                </button>
              </div>
              <textarea 
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="w-full bg-[#0d0d0d] border border-white/5 rounded-lg p-3 text-[11px] outline-none text-zinc-300 h-64 resize-none leading-relaxed"
              />
            </div>

            <div className="flex justify-end gap-2 border-t border-white/5 pt-4 mt-2">
              <button 
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-zinc-300 rounded-lg text-[10px] font-bold transition-all outline-none"
              >
                Close
              </button>
              <button 
                onClick={copyAllEmail}
                className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all outline-none"
              >
                {copiedAll ? "Copied All!" : "Copy Full Email"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
