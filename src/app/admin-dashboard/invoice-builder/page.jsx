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
            <div style={{ width: "794px", minHeight: "1123px", background: "#fff", padding: "60px", boxSizing: "border-box", color: "#334155", fontFamily: "Arial, sans-serif", fontSize: "11px", boxShadow: "0 10px 40px rgba(0,0,0,0.4)", borderRadius: "8px", display: "flex", flexDirection: "column" }}>
              
              {/* Header logo block */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1.5px solid #e2e8f0", paddingBottom: "12px", marginBottom: "20px" }}>
                <span style={{ fontSize: "18px", fontWeight: "900", color: "#0f172a", letterSpacing: "1.5px" }}>GROW ORBIT</span>
                <span style={{ fontSize: "15px", fontWeight: "900", color: "#ea580c", letterSpacing: "1px" }}>INVOICE</span>
              </div>

              {/* Title Section */}
              <div style={{ marginBottom: "24px" }}>
                <div style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a" }}>GROW ORBIT LLC</div>
                <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>Invoice #: {invoiceNumberPreview}</div>
              </div>

              {/* Metadata Details Grid */}
              <div style={{ display: "flex", justifyContent: "space-between", gap: "20px", marginBottom: "30px" }}>
                {/* From Column */}
                <div style={{ width: "30%" }}>
                  <div style={{ fontSize: "9px", fontWeight: "800", color: "#94a3b8", textTransform: "uppercase", marginBottom: "6px", letterSpacing: "0.5px" }}>From</div>
                  <div style={{ fontWeight: "700", color: "#0f172a", marginBottom: "3px" }}>Grow Orbit LLC</div>
                  <div style={{ color: "#64748b", marginBottom: "2px" }}>Amazon Growth Agency</div>
                  <div style={{ color: "#64748b", marginBottom: "2px" }}>hello@groworbit.co</div>
                  <div style={{ color: "#64748b" }}>www.groworbit.co</div>
                </div>

                {/* To Column */}
                <div style={{ width: "30%" }}>
                  <div style={{ fontSize: "9px", fontWeight: "800", color: "#94a3b8", textTransform: "uppercase", marginBottom: "6px", letterSpacing: "0.5px" }}>Billing To</div>
                  {companyName ? <div style={{ fontWeight: "700", color: "#0f172a", marginBottom: "3px" }}>{companyName}</div> : null}
                  <div style={{ color: "#64748b", marginBottom: "2px" }}>Attn: {clientName || "—"}</div>
                  <div style={{ color: "#64748b", marginBottom: "2px" }}>Email: {clientEmail || "—"}</div>
                  {clientAddress ? <div style={{ color: "#64748b" }}>{clientAddress}</div> : null}
                </div>

                {/* Details Column */}
                <div style={{ width: "30%" }}>
                  <div style={{ fontSize: "9px", fontWeight: "800", color: "#94a3b8", textTransform: "uppercase", marginBottom: "6px", letterSpacing: "0.5px" }}>Invoice Details</div>
                  <div style={{ color: "#64748b", marginBottom: "3px" }}>Date Issued: <span style={{ color: "#0f172a", fontWeight: "600" }}>{issueDate || "—"}</span></div>
                  <div style={{ color: "#64748b", marginBottom: "3px" }}>Due Date: <span style={{ color: "#0f172a", fontWeight: "600" }}>{dueDate || "—"}</span></div>
                  <div style={{ color: "#64748b", marginBottom: "3px" }}>Status: <span style={{ color: status === "paid" ? "#22c55e" : status === "overdue" ? "#ef4444" : "#ea580c", fontWeight: "800", textTransform: "uppercase" }}>{status}</span></div>
                  <div style={{ color: "#64748b" }}>Currency: <span style={{ color: "#0f172a", fontWeight: "600" }}>{currency}</span></div>
                </div>
              </div>

              {/* Items Table */}
              <div style={{ display: "flex", flexDirection: "column", marginBottom: "24px" }}>
                {/* Header row */}
                <div style={{ display: "flex", background: "#0f172a", padding: "8px 12px", borderRadius: "6px", color: "#fff", fontWeight: "bold", fontSize: "9px", letterSpacing: "0.5px" }}>
                  <div style={{ width: "8%" }}>#</div>
                  <div style={{ width: "52%" }}>Service / Description</div>
                  <div style={{ width: "10%", textAlign: "center" }}>Qty</div>
                  <div style={{ width: "15%", textAlign: "right" }}>Rate</div>
                  <div style={{ width: "15%", textAlign: "right" }}>Amount</div>
                </div>

                {/* Body rows */}
                {items.map((item, idx) => {
                  const qty = Number(item.quantity) || 1;
                  const rate = Number(item.price) || 0;
                  const itemTotal = qty * rate;

                  return (
                    <div key={item.id} style={{ display: "flex", borderBottom: "1px solid #f1f5f9", padding: "12px 12px", alignItems: "center" }}>
                      <div style={{ width: "8%", fontWeight: "700", color: "#64748b" }}>{idx + 1}</div>
                      <div style={{ width: "52%" }}>
                        <div style={{ fontWeight: "700", color: "#0f172a" }}>{item.name || "Custom Service"}</div>
                        {item.description ? <div style={{ color: "#64748b", fontSize: "9px", marginTop: "3px", lineHeight: "1.4" }}>{item.description}</div> : null}
                      </div>
                      <div style={{ width: "10%", textAlign: "center", fontWeight: "600" }}>{qty}</div>
                      <div style={{ width: "15%", textAlign: "right" }}>{fmtCurrency(rate, currency)}</div>
                      <div style={{ width: "15%", textAlign: "right", fontWeight: "700", color: "#0f172a" }}>{fmtCurrency(itemTotal, currency)}</div>
                    </div>
                  );
                })}
              </div>

              {/* Totals Calculation section */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "30px" }}>
                <div style={{ width: "40%", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px" }}>
                    <span style={{ color: "#64748b" }}>Subtotal:</span>
                    <span style={{ fontWeight: "600", color: "#0f172a" }}>{fmtCurrency(subtotal, currency)}</span>
                  </div>

                  {discountAmount > 0 ? (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px" }}>
                      <span style={{ color: "#64748b" }}>Discount:</span>
                      <span style={{ fontWeight: "600", color: "#ef4444" }}>-{fmtCurrency(discountAmount, currency)}</span>
                    </div>
                  ) : null}

                  {Number(taxRate) > 0 ? (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px" }}>
                      <span style={{ color: "#64748b" }}>Tax ({taxRate}%):</span>
                      <span style={{ fontWeight: "600", color: "#0f172a" }}>{fmtCurrency(taxAmount, currency)}</span>
                    </div>
                  ) : null}

                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1.5px solid #e2e8f0", paddingTop: "8px", marginTop: "4px", fontSize: "13px", fontWeight: "800", color: "#ea580c" }}>
                    <span>Total Due:</span>
                    <span>{fmtCurrency(total, currency)}</span>
                  </div>
                </div>
              </div>

              {/* Payment details notes */}
              {notes ? (
                <div style={{ marginTop: "auto", paddingTop: "15px", borderTop: "1.5px solid #e2e8f0" }}>
                  <div style={{ fontSize: "9px", fontWeight: "800", color: "#94a3b8", textTransform: "uppercase", marginBottom: "6px", letterSpacing: "0.5px" }}>Payment Instructions</div>
                  <pre style={{ margin: 0, padding: 0, fontSize: "9px", color: "#64748b", fontFamily: "Arial, sans-serif", whiteSpace: "pre-line", lineHeight: "1.4" }}>
                    {notes}
                  </pre>
                </div>
              ) : null}

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
