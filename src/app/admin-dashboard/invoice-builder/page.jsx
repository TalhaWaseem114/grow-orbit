"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, Save, Download, Loader, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore";

const CURRENCY_OPTIONS = ["USD", "GBP", "EUR", "PKR", "AED", "CAD", "AUD"];
const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "paid", label: "Paid" },
  { value: "overdue", label: "Overdue" },
  { value: "cancelled", label: "Cancelled" }
];

const DEFAULT_NOTES = `Payment Details:
Bank Name: Chase Bank
Account Name: Grow Orbit LLC
Account Number: 1234567890
Routing/SWIFT: 098765432

Payment is due within 30 days of the invoice date. Please include the invoice number with your payment.`;

const fmtCurrency = (amount, currency = "USD") => {
  const symbols = { USD: "$", GBP: "£", EUR: "€", PKR: "Rs", AED: "AED ", CAD: "C$", AUD: "A$" };
  const sym = symbols[currency] || "$";
  return `${sym}${Number(amount || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const getServiceIcon = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("account") || n.includes("management")) {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    );
  }
  if (n.includes("research") || n.includes("product")) {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    );
  }
  if (n.includes("ppc") || n.includes("ad") || n.includes("marketing") || n.includes("campaign")) {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    );
  }
  if (n.includes("optim") || n.includes("listing") || n.includes("seo")) {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    );
  }
  if (n.includes("creative") || n.includes("content") || n.includes("design") || n.includes("store")) {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
      </svg>
    );
  }
  if (n.includes("report") || n.includes("strategy") || n.includes("consult")) {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
      </svg>
    );
  }
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  );
};

const getDeliverables = (item) => {
  const nameLower = (item.name || "").toLowerCase();
  if (nameLower.includes("account") || nameLower.includes("management")) {
    return ["Account Health Monitoring", "Performance Optimization", "Policy & Compliance Management"];
  }
  if (nameLower.includes("research") || nameLower.includes("product")) {
    return ["Market & Competitor Research", "High-Converting Product Ideas", "Keyword Opportunity Report"];
  }
  if (nameLower.includes("ppc") || nameLower.includes("ad") || nameLower.includes("campaign")) {
    return ["Campaign Setup & Optimization", "Bid Management", "ACOS & TACOS Optimization"];
  }
  if (nameLower.includes("optim") || nameLower.includes("listing") || nameLower.includes("seo")) {
    return ["Title, Bullets & Description", "Backend Keywords", "SEO Optimization"];
  }
  if (nameLower.includes("creative") || nameLower.includes("content") || nameLower.includes("design") || nameLower.includes("store")) {
    return ["A+ Content Design", "Brand Store (Basic)", "Infographic Images"];
  }
  if (nameLower.includes("report") || nameLower.includes("strategy") || nameLower.includes("consult")) {
    return ["Monthly Performance Report", "Competitor Analysis", "Strategy Call (Monthly)"];
  }
  
  if (item.description) {
    const lines = item.description.split(/[\n;]/).map(l => l.trim().replace(/^[-*✓✓✓\s]+/, "")).filter(Boolean);
    if (lines.length > 1) {
      return lines.slice(0, 3);
    }
  }
  return ["Premium Agency Service Delivery", "Direct Strategy & Consultations", "Account Performance Audits"];
};

function InvoiceBuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get("id");
  const leadId = searchParams.get("leadId");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [zoom, setZoom] = useState(0.65);

  const [invoice, setInvoice] = useState(null);

  // Form State
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [status, setStatus] = useState("draft");
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState(DEFAULT_NOTES);
  const [agreementId, setAgreementId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("Net 14 Days");
  const [clientLabel1, setClientLabel1] = useState("Valued Partner");
  const [clientLabel2, setClientLabel2] = useState("Business Client");
  const [items, setItems] = useState([
    { id: Date.now(), name: "Full Account Management", description: "Monthly retainer for store operations and optimizations.", quantity: 1, price: 1500 }
  ]);

  // Next auto-sequenced number preview
  const [invoiceNumberPreview, setInvoiceNumberPreview] = useState("GO-INV-2026-XXXX");

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      const now = new Date();
      const todayStr = now.toISOString().split("T")[0];
      
      // Default dates
      setIssueDate(todayStr);
      
      const future = new Date();
      future.setDate(now.getDate() + 30);
      setDueDate(future.toISOString().split("T")[0]);

      if (invoiceId) {
        // Fetch existing invoice
        try {
          const docRef = doc(db, "invoices", invoiceId);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            const data = snap.id ? { id: snap.id, ...snap.data() } : snap.data();
            setInvoice(data);
            setInvoiceNumberPreview(data.invoiceNumber);
            setClientName(data.clientName || "");
            setClientEmail(data.clientEmail || "");
            setCompanyName(data.companyName || "");
            setClientAddress(data.clientAddress || "");
            setIssueDate(data.issueDate || todayStr);
            setDueDate(data.dueDate || "");
            setCurrency(data.currency || "USD");
            setStatus(data.status || "draft");
            setTaxRate(Number(data.taxRate) || 0);
            setDiscount(Number(data.discount) || 0);
            setNotes(data.notes || "");
            setAgreementId(data.agreementId || "");
            setStartDate(data.startDate || "");
            setPaymentTerms(data.paymentTerms || "Net 14 Days");
            setClientLabel1(data.clientLabel1 || "Valued Partner");
            setClientLabel2(data.clientLabel2 || "Business Client");
            if (data.items && data.items.length > 0) {
              setItems(data.items.map((it, idx) => ({ ...it, id: it.id || Date.now() + idx })));
            }
          }
        } catch (e) {
          console.error("Failed to load invoice:", e);
        }
      } else if (leadId) {
        // Pre-populate client info from Lead
        try {
          const docRef = doc(db, "leads", leadId);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            const data = snap.data();
            setClientName(data.fullName || "");
            setClientEmail(data.email || "");
            setCompanyName(data.companyName || "");
            setClientAddress(data.location || "");
          }
        } catch (e) {
          console.error("Failed to load lead details:", e);
        }
      }

      // Fetch next preview invoice number
      try {
        const token = localStorage.getItem("adminToken") || "";
        const res = await fetch("/api/invoices", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const d = await res.json();
        if (d.success) {
          // Calculate next preview number
          const year = now.getFullYear();
          const existing = d.invoices
            .map(inv => {
              const match = inv.invoiceNumber?.match(/GO-INV-\d{4}-(\d+)/);
              return match ? parseInt(match[1], 10) : 0;
            })
            .filter(n => n > 0);
          const next = existing.length > 0 ? Math.max(...existing) + 1 : 1;
          if (!invoiceId) {
            setInvoiceNumberPreview(`GO-INV-${year}-${String(next).padStart(4, "0")}`);
          }
        }
      } catch (err) {
        console.warn("Failed to generate preview invoice number:", err);
      }

      setLoading(false);
    };

    initData();
  }, [invoiceId, leadId]);

  // Calculation helpers
  const subtotal = items.reduce((acc, it) => acc + (Number(it.price) || 0) * (Number(it.quantity) || 1), 0);
  const discountAmount = Number(discount) || 0;
  const taxAmount = (subtotal - discountAmount) * ((Number(taxRate) || 0) / 100);
  const total = subtotal - discountAmount + taxAmount;

  const handleAddItem = () => {
    setItems([
      ...items,
      { id: Date.now(), name: "Custom Service", description: "Provide details of the service...", quantity: 1, price: 100 }
    ]);
  };

  const handleRemoveItem = (id) => {
    if (items.length === 1) return;
    setItems(items.filter(it => it.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(it => {
      if (it.id === id) {
        return { ...it, [field]: value };
      }
      return it;
    }));
  };

  const handleSaveInvoice = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("adminToken") || "";
      const payload = {
        leadId: leadId || invoice?.leadId || "manual_invoice",
        clientName,
        clientEmail,
        companyName,
        clientAddress,
        issueDate,
        dueDate,
        currency,
        status,
        taxRate,
        discount,
        notes,
        agreementId,
        startDate,
        paymentTerms,
        clientLabel1,
        clientLabel2,
        items: items.map(({ name, description, quantity, price }) => ({ name, description, quantity: Number(quantity), price: Number(price) }))
      };

      let res;
      if (invoiceId) {
        // Edit Mode
        res = await fetch(`/api/invoices/${invoiceId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      } else {
        // New Mode
        res = await fetch("/api/invoices", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json();
      if (data.success) {
        alert(invoiceId ? "Invoice updated successfully!" : "Invoice created successfully!");
        router.push("/admin-dashboard");
      } else {
        alert("Failed to save invoice: " + data.error);
      }
    } catch (err) {
      alert("Error saving invoice: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#090d16", color: "#94a3b8" }}>
        <Loader size={32} className="animate-spin" style={{ marginRight: 8 }} /> Loading invoice builder workspace...
      </div>
    );
  }

  const currencySymbol = { USD: "$", GBP: "£", EUR: "€", PKR: "Rs", AED: "AED ", CAD: "C$", AUD: "A$" }[currency] || "$";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#090d16", overflow: "hidden" }}>
      {/* Top Header */}
      <div style={{ height: "69px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#0a0e17", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={() => router.push("/admin-dashboard")}
            style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center" }}
            title="Back to Dashboard"
          >
            <ArrowLeft size={18} />
          </button>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#ea580c", tracking: "0.2em", textTransform: "uppercase" }}>Visual Invoice Builder</div>
            <h1 style={{ fontSize: 16, fontWeight: 850, color: "#fff", margin: 0 }}>
              {invoiceId ? `Editing Invoice ${invoiceNumberPreview}` : `New Invoice Drafting`}
            </h1>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Zoom controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "3px 8px", background: "rgba(255,255,255,0.02)" }}>
            <button 
              onClick={() => setZoom(z => Math.max(0.35, z - 0.05))} 
              style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "16px", fontWeight: "bold", padding: "0 4px" }}
            >
              -
            </button>
            <span style={{ fontSize: "11px", color: "#f1f5f9", minWidth: "36px", textAlign: "center", fontWeight: 700 }}>
              {Math.round(zoom * 100)}%
            </span>
            <button 
              onClick={() => setZoom(z => Math.min(1.2, z + 0.05))} 
              style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "16px", fontWeight: "bold", padding: "0 4px" }}
            >
              +
            </button>
          </div>

          {/* Download PDF button (only when editing/saved) */}
          {invoiceId && (
            <a
              href={`/api/invoices/${invoiceId}/pdf`}
              download
              style={{ textDecoration: "none" }}
            >
              <button
                style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#fff", cursor: "pointer", fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: "8px" }}
              >
                <Download size={13} /> Download PDF
              </button>
            </a>
          )}

          {/* Save Button */}
          <button
            onClick={handleSaveInvoice}
            disabled={saving}
            style={{ border: "none", background: "#ea580c", color: "#fff", cursor: "pointer", fontSize: "11px", fontWeight: 800, display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: "8px" }}
          >
            {saving ? <Loader size={13} className="animate-spin" /> : <Save size={13} />}
            {invoiceId ? "Update & Save" : "Save Invoice"}
          </button>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        
        {/* Left Form Editor Column */}
        <div style={{ width: "480px", borderRight: "1px solid rgba(255,255,255,0.06)", background: "#0a0e17", display: "flex", flexDirection: "column", overflowY: "auto", padding: "24px" }}>
          
          {/* Client Metas Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 12, padding: "16px", marginBottom: 20 }}>
            <h2 style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#ea580c", letterSpacing: "0.15em", margin: 0 }}>Client & Billing Info</h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Client Full Name</label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Client Email Address</label>
              <input
                type="email"
                placeholder="e.g. john@company.com"
                value={clientEmail}
                onChange={e => setClientEmail(e.target.value)}
                style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Company Name</label>
              <input
                type="text"
                placeholder="e.g. Acme Corp"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Billing Address</label>
              <input
                type="text"
                placeholder="e.g. London, UK"
                value={clientAddress}
                onChange={e => setClientAddress(e.target.value)}
                style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Client Label 1</label>
                <input
                  type="text"
                  placeholder="e.g. Valued Partner"
                  value={clientLabel1}
                  onChange={e => setClientLabel1(e.target.value)}
                  style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Client Label 2</label>
                <input
                  type="text"
                  placeholder="e.g. Business Client"
                  value={clientLabel2}
                  onChange={e => setClientLabel2(e.target.value)}
                  style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                />
              </div>
            </div>
          </div>

          {/* Invoice Metas Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 12, padding: "16px", marginBottom: 20 }}>
            <h2 style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#ea580c", letterSpacing: "0.15em", margin: 0 }}>Invoice Parameters</h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Issue Date</label>
                <input
                  type="date"
                  value={issueDate}
                  onChange={e => setIssueDate(e.target.value)}
                  style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                  style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Currency</label>
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                  style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                >
                  {CURRENCY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Status</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                >
                  {STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Agreement ID</label>
                <input
                  type="text"
                  placeholder="e.g. GO-2024-0587"
                  value={agreementId}
                  onChange={e => setAgreementId(e.target.value)}
                  style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Contract Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Payment Terms</label>
              <input
                type="text"
                placeholder="e.g. Net 14 Days"
                value={paymentTerms}
                onChange={e => setPaymentTerms(e.target.value)}
                style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
              />
            </div>
          </div>

          {/* Line Items Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 12, padding: "16px", marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#ea580c", letterSpacing: "0.15em", margin: 0 }}>Line Items</h2>
              <button
                type="button"
                onClick={handleAddItem}
                style={{ background: "rgba(234,88,12,0.1)", border: "1px solid rgba(234,88,12,0.2)", borderRadius: 6, padding: "4px 8px", color: "#ea580c", fontSize: 9, fontWeight: 850, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                <Plus size={10} /> Add Item
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {items.map((item, idx) => (
                <div key={item.id} style={{ borderBottom: idx < items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", paddingBottom: idx < items.length - 1 ? 12 : 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: "#71717a", width: 14 }}>{idx + 1}</span>
                    <input
                      type="text"
                      placeholder="Service Name"
                      value={item.name}
                      onChange={e => handleItemChange(item.id, "name", e.target.value)}
                      style={{ flex: 1, background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px 10px", color: "#fff", fontSize: 11, outline: "none" }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={items.length === 1}
                      style={{ background: "none", border: "none", color: items.length === 1 ? "#525252" : "#ef4444", cursor: items.length === 1 ? "not-allowed" : "pointer" }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Short description (optional)..."
                    value={item.description || ""}
                    onChange={e => handleItemChange(item.id, "description", e.target.value)}
                    style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px 10px", color: "#fff", fontSize: 10, outline: "none", marginLeft: 22 }}
                  />

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginLeft: 22 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      <label style={{ fontSize: 9, color: "#525252", fontWeight: 700 }}>Qty</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={e => handleItemChange(item.id, "quantity", Math.max(1, parseInt(e.target.value, 10) || 1))}
                        style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px 10px", color: "#fff", fontSize: 11, outline: "none" }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      <label style={{ fontSize: 9, color: "#525252", fontWeight: 700 }}>Rate ({currencySymbol})</label>
                      <input
                        type="number"
                        min="0"
                        value={item.price}
                        onChange={e => handleItemChange(item.id, "price", Math.max(0, parseFloat(e.target.value) || 0))}
                        style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px 10px", color: "#fff", fontSize: 11, outline: "none" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Adjustments & Notes */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 12, padding: "16px", marginBottom: 24 }}>
            <h2 style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#ea580c", letterSpacing: "0.15em", margin: 0 }}>Taxes, Discounts & Payment Notes</h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Discount Amount ({currencySymbol})</label>
                <input
                  type="number"
                  min="0"
                  value={discount}
                  onChange={e => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
                  style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Tax Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={taxRate}
                  onChange={e => setTaxRate(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                  style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700, textTransform: "uppercase" }}>Payment Notes & Details</label>
              <textarea
                rows="6"
                value={notes}
onChange={e => setNotes(e.target.value)}
                  style={{ background: "#0d111a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 11, fontFamily: "monospace", outline: "none", resize: "vertical", lineHeight: 1.4 }}
                />
              </div>
            </div>
          </div>

          {/* Right Live Preview Column */}
        <div style={{ flex: 1, overflow: "auto", background: "#0b0f19", padding: "40px", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
          <div style={{ transform: `scale(${zoom})`, transformOrigin: "top center", width: "794px", minHeight: "1123px", transition: "transform 0.2s" }}>
            
            {/* A4 Sheet Container */}
            <div style={{
              width: "794px",
              minHeight: "1123px",
              background: "#fff",
              padding: "50px 45px 35px",
              boxSizing: "border-box",
              color: "#1e293b",
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              fontSize: "11px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden"
            }}>
              
              {/* Top Curved Diagonal Banner (Right Corner) */}
              <div style={{ position: "absolute", top: 0, right: 0, width: "360px", height: "135px", zIndex: 1, pointerEvents: "none" }}>
                <svg width="360" height="135" viewBox="0 0 360 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 0 C 170 70, 90 135, 0 135 L 360 135 L 360 0 Z" fill="#0f172a" />
                  <path d="M100 0 C 170 70, 90 135, 0 135" stroke="#f97316" strokeWidth="5" fill="none" />
                </svg>
              </div>

              {/* Invoice Number & Label inside Top Banner */}
              <div style={{ position: "absolute", top: 28, right: 40, textAlign: "right", zIndex: 2 }}>
                <div style={{ fontSize: "28px", fontWeight: "900", color: "#fff", letterSpacing: "2.5px", textTransform: "uppercase", fontFamily: "sans-serif" }}>INVOICE</div>
                <div style={{ fontSize: "14px", fontWeight: "800", color: "#f97316", marginTop: 4, letterSpacing: "0.5px" }}>#{invoiceNumberPreview}</div>
              </div>

              {/* Header Logo & Tagline (Top Left) */}
              <div style={{ display: "flex", flexDirection: "column", gap: 3, zIndex: 2, position: "relative", marginBottom: 35, width: "300px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <img
                    src="/logo.png"
                    alt="Grow Orbit Logo"
                    style={{ width: "35px", height: "35px", objectFit: "contain" }}
                  />
                  <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.9 }}>
                    <span style={{ fontSize: "16px", fontWeight: "900", color: "#0f172a", letterSpacing: "1.5px" }}>GROW</span>
                    <span style={{ fontSize: "16px", fontWeight: "900", color: "#f97316", letterSpacing: "1.5px" }}>ORBIT</span>
                  </div>
                </div>
                <div style={{ fontSize: "9px", color: "#64748b", fontWeight: "700", letterSpacing: "0.8px", paddingLeft: 2, marginTop: 4 }}>
                  Amazon Growth. Your Orbit.
                </div>
              </div>

              {/* Three-Column Metadata Block */}
              <div style={{
                borderTop: "2px solid #f97316",
                paddingTop: "16px",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "28px",
                gap: "16px"
              }}>
                {/* 1. Billed To Column */}
                <div style={{ width: "32%", display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: "9px", fontWeight: "900", color: "#ef4444", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "1px" }}>BILLED TO</div>
                  <div style={{ fontSize: "13px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>{companyName || clientName || "Valued Client"}</div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#475569", fontSize: "10px" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      <span style={{ fontWeight: "600" }}>{clientLabel1 || "Valued Partner"}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#475569", fontSize: "10px" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span style={{ fontWeight: "600" }}>{clientLabel2 || "Business Client"}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#475569", fontSize: "10px" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      <span style={{ fontWeight: "500", textDecoration: "none" }}>{clientEmail || "support@groworbitofficial.com"}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Service Partnership Column */}
                <div style={{ width: "36%", display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: "9px", fontWeight: "900", color: "#f97316", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "1px" }}>SERVICE</div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#ffedd5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="3"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/></svg>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ fontSize: "11px", fontWeight: "800", color: "#0f172a" }}>Amazon Growth Partnership</div>
                      <div style={{ fontSize: "9px", color: "#64748b", lineHeight: "1.3", marginTop: "4px", fontWeight: "500" }}>
                        Comprehensive Amazon account management & growth services as per agreement.
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Dates & ID Column */}
                <div style={{
                  width: "28%",
                  borderLeft: "1.5px solid rgba(249,115,22,0.2)",
                  paddingLeft: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px"
                }}>
                  {[
                    { label: "INVOICE DATE", val: issueDate ? new Date(issueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—" },
                    { label: "DUE DATE", val: dueDate ? new Date(dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—" },
                    { label: "PAYMENT TERMS", val: paymentTerms || "Net 14 Days" },
                    { label: "AGREEMENT ID", val: agreementId || "GO-2026-XXXX" },
                    { label: "START DATE", val: startDate ? new Date(startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : (issueDate ? new Date(issueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—") }
                  ].map((row, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "9px" }}>
                      <span style={{ fontWeight: "800", color: "#0f172a", letterSpacing: "0.5px" }}>{row.label}</span>
                      <span style={{ color: "#475569", fontWeight: "600" }}>{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items Table */}
              <div style={{ display: "flex", flexDirection: "column", marginBottom: "22px" }}>
                {/* Header row */}
                <div style={{ display: "flex", background: "#0f172a", borderRadius: "6px", overflow: "hidden", alignItems: "center", height: "30px" }}>
                  <div style={{ width: "6%", padding: "0 10px", color: "#fff", fontSize: "9px", fontWeight: "900", letterSpacing: "0.5px" }}>#</div>
                  <div style={{ width: "34%", padding: "0 10px", color: "#fff", fontSize: "9px", fontWeight: "900", letterSpacing: "0.5px" }}>DESCRIPTION</div>
                  <div style={{ width: "35%", padding: "0 10px", color: "#fff", fontSize: "9px", fontWeight: "900", letterSpacing: "0.5px" }}>DELIVERABLES</div>
                  <div style={{ width: "7%", padding: "0 10px", color: "#fff", fontSize: "9px", fontWeight: "900", letterSpacing: "0.5px", textAlign: "center" }}>QTY</div>
                  <div style={{ width: "13%", padding: "0 10px", color: "#fff", fontSize: "9px", fontWeight: "900", letterSpacing: "0.5px", textAlign: "right" }}>RATE ({currency})</div>
                  <div style={{ width: "15%", padding: "0 14px", color: "#fff", fontSize: "9px", fontWeight: "900", letterSpacing: "0.5px", textAlign: "right", background: "#f97316", display: "flex", height: "100%", alignItems: "center", justifyContent: "flex-end" }}>AMOUNT ({currency})</div>
                </div>

                {/* Body Rows */}
                {items.map((item, idx) => {
                  const qty = Number(item.quantity) || 1;
                  const rate = Number(item.price) || 0;
                  const itemTotal = qty * rate;
                  const deliverables = getDeliverables(item);

                  return (
                    <div key={item.id} style={{ display: "flex", borderBottom: "1px solid #f1f5f9", padding: "12px 0", alignItems: "stretch" }}>
                      {/* 1. Index */}
                      <div style={{ width: "6%", padding: "0 10px", fontWeight: "800", color: "#64748b", fontSize: "11px", display: "flex", alignItems: "center" }}>
                        {String(idx + 1).padStart(2, "0")}
                      </div>

                      {/* 2. Description Card */}
                      <div style={{ width: "34%", padding: "0 10px", display: "flex", gap: "10px", alignItems: "center" }}>
                        <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#fff7ed", border: "1px solid #ffedd5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {getServiceIcon(item.name)}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <div style={{ fontWeight: "800", color: "#0f172a", fontSize: "11px" }}>{item.name || "Custom Service"}</div>
                          {item.description && <div style={{ color: "#64748b", fontSize: "9px", marginTop: "2px", lineHeight: "1.3" }}>{item.description}</div>}
                        </div>
                      </div>

                      {/* 3. Deliverables Column */}
                      <div style={{ width: "35%", padding: "0 10px", display: "flex", flexDirection: "column", gap: "4px", justifyContent: "center" }}>
                        {deliverables.map((del, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "9px", color: "#475569", fontWeight: "600" }}>
                            <span style={{ color: "#f97316", fontWeight: "800" }}>✓</span>
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>

                      {/* 4. Qty */}
                      <div style={{ width: "7%", padding: "0 10px", textAlign: "center", fontWeight: "700", color: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {qty}
                      </div>

                      {/* 5. Rate */}
                      <div style={{ width: "13%", padding: "0 10px", textAlign: "right", fontWeight: "700", color: "#0f172a", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                        {fmtCurrency(rate, currency)}
                      </div>

                      {/* 6. Amount */}
                      <div style={{ width: "15%", padding: "0 14px", textAlign: "right", fontWeight: "800", color: "#f97316", display: "flex", alignItems: "center", justifyContent: "flex-end", fontSize: "11px" }}>
                        {fmtCurrency(itemTotal, currency)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Notes & Totals Layout */}
              <div style={{ display: "flex", justifyContent: "space-between", gap: "20px", marginBottom: "26px" }}>
                {/* Notes box on the left */}
                <div style={{ width: "56%", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", gap: "10px", background: "rgba(249,115,22,0.02)", border: "1px solid rgba(249,115,22,0.08)", borderRadius: "8px", padding: "12px 14px", alignItems: "flex-start" }}>
                    <div style={{ marginTop: 1 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                      <div style={{ fontSize: "9px", fontWeight: "900", color: "#f97316", letterSpacing: "0.5px" }}>NOTES</div>
                      <pre style={{ margin: 0, padding: 0, fontSize: "9px", color: "#64748b", fontFamily: "inherit", whiteSpace: "pre-wrap", lineHeight: "1.4", fontWeight: "500" }}>
                        {notes || "Thank you for choosing Grow Orbit. We appreciate your trust and look forward to helping you achieve exceptional growth on Amazon."}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Totals table on the right */}
                <div style={{ width: "38%", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", fontWeight: "700" }}>
                    <span style={{ color: "#64748b" }}>SUBTOTAL</span>
                    <span style={{ color: "#0f172a" }}>{fmtCurrency(subtotal, currency)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", fontWeight: "700" }}>
                    <span style={{ color: "#64748b" }}>DISCOUNT</span>
                    <span style={{ color: discountAmount > 0 ? "#ef4444" : "#0f172a" }}>
                      {discountAmount > 0 ? `-${fmtCurrency(discountAmount, currency)}` : fmtCurrency(0, currency)}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", fontWeight: "700" }}>
                    <span style={{ color: "#64748b" }}>TAX ({taxRate}%)</span>
                    <span style={{ color: "#0f172a" }}>{fmtCurrency(taxAmount, currency)}</span>
                  </div>

                  {/* Total Due with Orange blocks */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#ffedd5",
                    borderRadius: "6px",
                    overflow: "hidden",
                    border: "1px solid rgba(249,115,22,0.15)",
                    marginTop: "4px"
                  }}>
                    <span style={{ color: "#f97316", fontSize: "9px", fontWeight: "900", paddingLeft: "12px", letterSpacing: "0.5px" }}>TOTAL DUE ({currency})</span>
                    <span style={{ background: "#f97316", color: "#fff", padding: "8px 14px", fontSize: "12px", fontWeight: "900", minWidth: "90px", textAlign: "right" }}>
                      {fmtCurrency(total, currency)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Methods Card */}
              <div style={{
                border: "1px solid #ffedd5",
                background: "#fff",
                borderRadius: "12px",
                padding: "14px 18px",
                display: "flex",
                flexDirection: "column",
                marginBottom: "24px"
              }}>
                <div style={{ fontSize: "9px", fontWeight: "900", color: "#f97316", letterSpacing: "1px", marginBottom: "10px" }}>PAYMENT METHODS</div>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {/* Left: Bank details */}
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#f8fafc", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5"><rect x="3" y="21" width="18" height="2"/><path d="M19 21v-8M5 21v-8M9 21v-8M13 21v-8"/><path d="M3 13h18L12 3z"/></svg>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", fontSize: "9px", lineHeight: "1.4" }}>
                      <div style={{ fontWeight: "800", color: "#0f172a" }}>BANK TRANSFER</div>
                      <div style={{ color: "#64748b" }}>Bank Name: <span style={{ fontWeight: "700", color: "#475569" }}>Wise (TransferWise)</span></div>
                      <div style={{ color: "#64748b" }}>Account Name: <span style={{ fontWeight: "700", color: "#475569" }}>Grow Orbit LLC</span></div>
                      <div style={{ color: "#64748b" }}>Account Number: <span style={{ fontWeight: "700", color: "#475569" }}>831245678</span></div>
                      <div style={{ color: "#64748b" }}>Routing Number: <span style={{ fontWeight: "700", color: "#475569" }}>026073150</span></div>
                      <div style={{ color: "#64748b" }}>SWIFT / BIC: <span style={{ fontWeight: "700", color: "#475569" }}>TRWIBEB1XXX</span></div>
                    </div>
                  </div>

                  {/* Center: PayPal details */}
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#eff6ff", border: "1px solid #dbeafe", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "12px", fontWeight: "900", color: "#1d4ed8", fontStyle: "italic" }}>P</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", fontSize: "9px", lineHeight: "1.4" }}>
                      <div style={{ fontWeight: "800", color: "#0f172a" }}>PAYPAL</div>
                      <div style={{ color: "#64748b" }}>Recipient: <span style={{ fontWeight: "750", color: "#1d4ed8" }}>support@groworbitofficial.com</span></div>
                    </div>
                  </div>

                  {/* Right: Small Info Cards */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {/* Due Date Card */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "6px 12px", minWidth: "160px" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: "7.5px", fontWeight: "800", color: "#64748b" }}>DUE DATE</span>
                        <span style={{ fontSize: "10px", fontWeight: "800", color: "#0f172a" }}>{dueDate ? new Date(dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}</span>
                      </div>
                    </div>
                    {/* Amount Due Card */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fff7ed", border: "1px solid #ffedd5", borderRadius: "8px", padding: "6px 12px", minWidth: "160px" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><path d="M16 12H12a2 2 0 0 1 0-4h2M10 16h4a2 2 0 0 0 0-4h-2"/></svg>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: "7.5px", fontWeight: "800", color: "#f97316" }}>AMOUNT DUE</span>
                        <span style={{ fontSize: "11px", fontWeight: "900", color: "#ea580c" }}>{fmtCurrency(total, currency)} {currency}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Brand Footer */}
              <div style={{
                marginTop: "auto",
                borderTop: "1.5px solid #f1f5f9",
                paddingTop: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                {/* Logo left */}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <img
                    src="/logo.png"
                    alt="Grow Orbit Logo"
                    style={{ width: "22px", height: "22px", objectFit: "contain" }}
                  />
                  <span style={{ fontSize: "11px", fontWeight: "900", color: "#0f172a", letterSpacing: "0.5px" }}>GROW ORBIT</span>
                </div>

                {/* Contact Columns center */}
                <div style={{ display: "flex", gap: "24px", fontSize: "8.5px", color: "#64748b", fontWeight: "600" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span>🌐 www.groworbitofficial.com</span>
                    <span>✉ support@groworbitofficial.com</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span>📞 +1 (912) 820-5916</span>
                    <span>📍 2583 Lundigan Dr, Mississauga, ON, Canada</span>
                  </div>
                </div>

                {/* Handwritten signature Ali right */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <svg width="55" height="22" viewBox="0 0 100 40" fill="none">
                    <path d="M10 28 C 30 10, 42 6, 50 24 C 62 44, 70 8, 80 18 C 90 32, 92 12, 98 20" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontSize: "10px", fontWeight: "900", color: "#0f172a" }}>Ali</span>
                  <span style={{ fontSize: "7px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>Founder & CEO, Grow Orbit LLC</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default function InvoiceBuilderPage() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#090d16", color: "#94a3b8" }}>
        <Loader size={32} className="animate-spin" style={{ marginRight: 8 }} /> Loading workspace...
      </div>
    }>
      <InvoiceBuilderContent />
    </Suspense>
  );
}
