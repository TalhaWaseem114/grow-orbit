"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Plus, Search, Filter, Download, Trash2, Edit3, Eye, X, ChevronDown,
  FileText, DollarSign, Clock, AlertCircle, CheckCircle2, Send, Printer,
  ArrowLeft, Copy, Check, LayoutGrid, List, Settings, Save
} from "lucide-react";
import { db, auth } from "../../../firebase/firebaseConfig";
import {
  collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, getDocs, setDoc, getDoc
} from "firebase/firestore";

/* ─────────────────────────────────────────
   STATUS CONFIG
───────────────────────────────────────── */
const STATUS_CONFIG = {
  draft:     { label: "Draft",     color: "#a3a3a3", bg: "rgba(163,163,163,0.12)", border: "rgba(163,163,163,0.25)" },
  sent:      { label: "Sent",      color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.25)" },
  paid:      { label: "Paid",      color: "#22c55e", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.25)" },
  overdue:   { label: "Overdue",   color: "#ef4444", bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.25)" },
  cancelled: { label: "Cancelled", color: "#71717a", bg: "rgba(113,113,122,0.10)", border: "rgba(113,113,122,0.2)" },
};

const CURRENCY_OPTIONS = ["USD", "GBP", "EUR", "PKR", "AED", "CAD", "AUD"];

const SERVICE_PRESETS = [
  "Product Hunting & Research",
  "Product Sourcing & Setup",
  "Brand Launch (Full)",
  "Listing Optimization",
  "PPC / Ads Management",
  "A+ Content & Creative",
  "Full Account Management",
  "Strategy Session",
  "Custom Service",
];

const GROW_ORBIT_INFO = {
  name: "Grow Orbit",
  tagline: "Amazon Growth Agency",
  address: "Lahore, Pakistan",
  email: "hello@groworbit.co",
  website: "www.groworbit.co",
};

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
const fmt = (d) => {
  if (!d) return "—";
  const date = d.toDate ? d.toDate() : new Date(d);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const fmtShort = (d) => {
  if (!d) return "—";
  const date = d.toDate ? d.toDate() : new Date(d);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const fmtCurrency = (amount, currency = "USD") => {
  const symbols = { USD: "$", GBP: "£", EUR: "€", PKR: "Rs", AED: "AED ", CAD: "C$", AUD: "A$" };
  const sym = symbols[currency] || "$";
  return `${sym}${Number(amount || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const generateInvoiceNumber = (existingInvoices) => {
  const year = new Date().getFullYear();
  const existing = existingInvoices
    .map(inv => {
      const match = inv.invoiceNumber?.match(/GO-\d{4}-(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    })
    .filter(n => n > 0);
  const next = existing.length > 0 ? Math.max(...existing) + 1 : 1;
  return `GO-${year}-${String(next).padStart(4, "0")}`;
};

const isOverdue = (inv) => {
  if (inv.status === "paid" || inv.status === "cancelled" || inv.status === "draft") return false;
  if (!inv.dueDate) return false;
  const due = inv.dueDate.toDate ? inv.dueDate.toDate() : new Date(inv.dueDate);
  return due < new Date();
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.draft;
  return (
    <span style={{
      fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.12em",
      padding: "4px 10px", borderRadius: 100, whiteSpace: "nowrap",
      color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`
    }}>
      {cfg.label}
    </span>
  );
}

/* ─────────────────────────────────────────
   EMPTY LINE ITEM
───────────────────────────────────────── */
const emptyItem = () => ({ id: Date.now(), description: "", qty: 1, rate: 0 });

/* ─────────────────────────────────────────
   INVOICE FORM COMPONENT
───────────────────────────────────────── */
function InvoiceForm({ invoice, allInvoices, clients, onSave, onCancel, currentAdmin, logActivity, invoiceSettings }) {
  const isEdit = !!invoice;
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    invoiceNumber: invoice?.invoiceNumber || generateInvoiceNumber(allInvoices),
    clientName: invoice?.clientName || "",
    clientEmail: invoice?.clientEmail || "",
    clientAddress: invoice?.clientAddress || "",
    issueDate: invoice?.issueDate
      ? (invoice.issueDate.toDate ? invoice.issueDate.toDate().toISOString().split("T")[0] : new Date(invoice.issueDate).toISOString().split("T")[0])
      : new Date().toISOString().split("T")[0],
    dueDate: invoice?.dueDate
      ? (invoice.dueDate.toDate ? invoice.dueDate.toDate().toISOString().split("T")[0] : new Date(invoice.dueDate).toISOString().split("T")[0])
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    currency: invoice?.currency || "USD",
    taxRate: invoice?.taxRate ?? (invoiceSettings?.defaultTaxRate || 0),
    discount: invoice?.discount ?? 0,
    notes: invoice?.notes || invoiceSettings?.defaultNotes || "Payment Details:\nBank Name: \nAccount Name: \nAccount Number: \nRouting/SWIFT: \n\nPayment is due within 30 days of the invoice date. Please include the invoice number with your payment.",
  });

  const [items, setItems] = useState(
    invoice?.items?.length > 0
      ? invoice.items.map((it, i) => ({ ...it, id: i }))
      : [emptyItem()]
  );

  const [showClientSuggestions, setShowClientSuggestions] = useState(false);
  const clientInputRef = useRef(null);

  // Sync settings dynamically once they are loaded from Firestore if creating a new invoice
  useEffect(() => {
    if (!isEdit && invoiceSettings) {
      setForm(prev => ({
        ...prev,
        taxRate: prev.taxRate || invoiceSettings.defaultTaxRate || 0,
        notes: prev.notes === "Payment Details:\nBank Name: \nAccount Name: \nAccount Number: \nRouting/SWIFT: \n\nPayment is due within 30 days of the invoice date. Please include the invoice number with your payment."
          ? (invoiceSettings.defaultNotes || prev.notes)
          : prev.notes
      }));
    }
  }, [invoiceSettings, isEdit]);

  const filteredClients = useMemo(() => {
    if (!form.clientName.trim()) return clients;
    const q = form.clientName.toLowerCase();
    return clients.filter(c =>
      c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q)
    );
  }, [clients, form.clientName]);

  const selectClient = (client) => {
    setForm(prev => ({
      ...prev,
      clientName: client.name || "",
      clientEmail: client.email || "",
      clientAddress: client.address || "",
    }));
    setShowClientSuggestions(false);
  };

  const handleFillDummyData = () => {
    setForm(prev => ({
      ...prev,
      clientName: "Acme Corp Ltd",
      clientEmail: "finance@acme.com",
      clientAddress: "123 Innovation Way, Tech District, USA",
      taxRate: 5,
      discount: 100,
      notes: "Payment Details:\nBank Name: Chase Bank\nAccount Name: Grow Orbit LLC\nAccount Number: 1234567890\nRouting Number: 098765432\n\nThis is a test invoice containing sample services.",
    }));
    setItems([
      { id: Date.now(), description: "Full Account Management - Monthly Retainer", qty: 1, rate: 1500 },
      { id: Date.now() + 1, description: "Listing Optimization & A+ Content Design", qty: 2, rate: 450 }
    ]);
  };

  const updateItem = (id, field, value) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, [field]: value } : it));
  };

  const addItem = () => setItems(prev => [...prev, emptyItem()]);
  const removeItem = (id) => setItems(prev => prev.length > 1 ? prev.filter(it => it.id !== id) : prev);

  const subtotal = items.reduce((sum, it) => sum + (Number(it.qty) || 0) * (Number(it.rate) || 0), 0);
  const taxAmount = subtotal * (Number(form.taxRate) || 0) / 100;
  const total = subtotal + taxAmount - (Number(form.discount) || 0);

  const handleSave = async (status = "draft") => {
    if (!form.clientName.trim()) { alert("Please enter a client name."); return; }
    if (items.every(it => !it.description.trim())) { alert("Please add at least one line item."); return; }

    setSaving(true);
    try {
      const cleanItems = items
        .filter(it => it.description.trim())
        .map(({ id, ...rest }) => ({ ...rest, qty: Number(rest.qty) || 0, rate: Number(rest.rate) || 0 }));

      const data = {
        invoiceNumber: form.invoiceNumber,
        status,
        clientName: form.clientName.trim(),
        clientEmail: form.clientEmail.trim(),
        clientAddress: form.clientAddress.trim(),
        items: cleanItems,
        subtotal,
        taxRate: Number(form.taxRate) || 0,
        taxAmount,
        discount: Number(form.discount) || 0,
        total,
        currency: form.currency,
        issueDate: new Date(form.issueDate),
        dueDate: new Date(form.dueDate),
        paidDate: status === "paid" ? serverTimestamp() : (invoice?.paidDate || null),
        notes: form.notes.trim(),
        updatedAt: serverTimestamp(),
      };

      if (isEdit) {
        await updateDoc(doc(db, "invoices", invoice.id), data);
        logActivity("UPDATE_INVOICE", `Updated invoice ${form.invoiceNumber} for "${form.clientName}" — ${fmtCurrency(total, form.currency)}`);
      } else {
        data.createdBy = auth.currentUser?.uid || "unknown";
        data.createdByName = currentAdmin?.fullName || currentAdmin?.displayName || auth.currentUser?.email || "Admin";
        data.createdAt = serverTimestamp();
        await addDoc(collection(db, "invoices"), data);
        logActivity("CREATE_INVOICE", `Created invoice ${form.invoiceNumber} for "${form.clientName}" — ${fmtCurrency(total, form.currency)}`);
      }
      onSave();
    } catch (err) {
      console.error("Invoice save failed:", err);
      alert("Failed to save invoice: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  /* ── Input styles ── */
  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 12, fontWeight: 500,
    outline: "none", fontFamily: "'Montserrat', sans-serif", transition: "border-color 0.2s",
  };
  const labelStyle = {
    fontSize: 9, fontWeight: 700, color: "#525252", textTransform: "uppercase",
    letterSpacing: "0.15em", marginBottom: 6, display: "block",
  };
  const sectionHeaderStyle = {
    fontSize: 10, fontWeight: 800, color: "#f97316", textTransform: "uppercase",
    letterSpacing: "0.2em", marginBottom: 14,
  };

  return (
    <div className="tab-content" style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={onCancel} style={{
            width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center",
            justifyContent: "center", cursor: "pointer", color: "#a3a3a3", flexShrink: 0,
          }}>
            <ArrowLeft size={16} />
          </button>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              {isEdit ? "Edit Invoice" : "New Invoice"}
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1, marginTop: 4 }}>
              {form.invoiceNumber}
            </h1>
          </div>
        </div>
        <button
          type="button"
          onClick={handleFillDummyData}
          style={{
            padding: "8px 16px", borderRadius: 10, background: "rgba(249,115,22,0.1)",
            border: "1px solid rgba(249,115,22,0.25)", color: "#f97316", fontSize: 10,
            fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer",
          }}
        >
          Fill Dummy Data
        </button>
      </div>

      {/* ── Client Details ── */}
      <div style={{ ...sectionHeaderStyle }}>Bill To</div>
      <div style={{
        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
        borderRadius: 16, padding: 20, marginBottom: 24,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div style={{ position: "relative" }}>
            <label style={labelStyle}>Client Name *</label>
            <input
              ref={clientInputRef}
              style={inputStyle}
              value={form.clientName}
              onChange={e => { setForm(prev => ({ ...prev, clientName: e.target.value })); setShowClientSuggestions(true); }}
              onFocus={() => setShowClientSuggestions(true)}
              onBlur={() => setTimeout(() => setShowClientSuggestions(false), 200)}
              placeholder="Enter or select client..."
            />
            {showClientSuggestions && filteredClients.length > 0 && (
              <div style={{
                position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50, marginTop: 4,
                background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
                maxHeight: 180, overflowY: "auto", boxShadow: "0 8px 30px rgba(0,0,0,0.5)"
              }}>
                {filteredClients.map((c, i) => (
                  <button key={i} onMouseDown={() => selectClient(c)} style={{
                    width: "100%", display: "flex", flexDirection: "column", gap: 2, padding: "10px 14px",
                    background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.04)",
                    cursor: "pointer", textAlign: "left", color: "#d4d4d4",
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{c.name}</span>
                    <span style={{ fontSize: 10, color: "#525252" }}>{c.email}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <label style={labelStyle}>Client Email</label>
            <input style={inputStyle} value={form.clientEmail} onChange={e => setForm(prev => ({ ...prev, clientEmail: e.target.value }))} placeholder="client@company.com" />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Billing Address</label>
            <input style={inputStyle} value={form.clientAddress} onChange={e => setForm(prev => ({ ...prev, clientAddress: e.target.value }))} placeholder="Street, City, Country" />
          </div>
        </div>
      </div>

      {/* ── Invoice Details ── */}
      <div style={{ ...sectionHeaderStyle }}>Invoice Details</div>
      <div style={{
        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
        borderRadius: 16, padding: 20, marginBottom: 24,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14 }}>
          <div>
            <label style={labelStyle}>Invoice #</label>
            <input style={{ ...inputStyle, color: "#525252" }} value={form.invoiceNumber} readOnly />
          </div>
          <div>
            <label style={labelStyle}>Issue Date</label>
            <input type="date" style={inputStyle} value={form.issueDate} onChange={e => setForm(prev => ({ ...prev, issueDate: e.target.value }))} />
          </div>
          <div>
            <label style={labelStyle}>Due Date</label>
            <input type="date" style={inputStyle} value={form.dueDate} onChange={e => setForm(prev => ({ ...prev, dueDate: e.target.value }))} />
          </div>
          <div>
            <label style={labelStyle}>Currency</label>
            <select style={{ ...inputStyle, cursor: "pointer" }} value={form.currency} onChange={e => setForm(prev => ({ ...prev, currency: e.target.value }))}>
              {CURRENCY_OPTIONS.map(c => <option key={c} value={c} style={{ background: "#111" }}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* ── Line Items ── */}
      <div style={{ ...sectionHeaderStyle }}>Line Items</div>
      <div style={{
        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
        borderRadius: 16, padding: 20, marginBottom: 24,
      }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 80px 120px 120px 40px", gap: 10, marginBottom: 10 }}>
          <span style={labelStyle}>Description</span>
          <span style={labelStyle}>Qty</span>
          <span style={labelStyle}>Rate</span>
          <span style={labelStyle}>Amount</span>
          <span />
        </div>

        {items.map((item) => (
          <div key={item.id} style={{ display: "grid", gridTemplateColumns: "2fr 80px 120px 120px 40px", gap: 10, marginBottom: 8, alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <input
                style={inputStyle}
                value={item.description}
                onChange={e => updateItem(item.id, "description", e.target.value)}
                placeholder="Service description..."
                list={`presets-${item.id}`}
              />
              <datalist id={`presets-${item.id}`}>
                {SERVICE_PRESETS.map(s => <option key={s} value={s} />)}
              </datalist>
            </div>
            <input
              type="number"
              min="0"
              style={{ ...inputStyle, textAlign: "center" }}
              value={item.qty}
              onChange={e => updateItem(item.id, "qty", e.target.value)}
            />
            <input
              type="number"
              min="0"
              step="0.01"
              style={inputStyle}
              value={item.rate}
              onChange={e => updateItem(item.id, "rate", e.target.value)}
            />
            <div style={{
              padding: "10px 14px", fontSize: 12, fontWeight: 700, color: "#d4d4d4",
              background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.04)",
            }}>
              {fmtCurrency((Number(item.qty) || 0) * (Number(item.rate) || 0), form.currency)}
            </div>
            <button onClick={() => removeItem(item.id)} style={{
              background: "none", border: "none", cursor: "pointer", color: "#525252",
              display: "flex", alignItems: "center", justifyContent: "center", padding: 4,
            }}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}

        <button onClick={addItem} style={{
          display: "flex", alignItems: "center", gap: 8, marginTop: 12, padding: "8px 16px",
          borderRadius: 10, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.15)",
          color: "#f97316", fontSize: 10, fontWeight: 800, textTransform: "uppercase",
          letterSpacing: "0.1em", cursor: "pointer",
        }}>
          <Plus size={12} /> Add Line Item
        </button>

        {/* Totals */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 20, paddingTop: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, width: 320 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#525252", flex: 1, textAlign: "right" }}>Subtotal</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#d4d4d4", width: 140, textAlign: "right" }}>{fmtCurrency(subtotal, form.currency)}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, width: 320 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#525252", flex: 1, textAlign: "right" }}>Tax</span>
              <input
                type="number" min="0" max="100" step="0.5"
                style={{ ...inputStyle, width: 60, textAlign: "center", padding: "6px 8px", fontSize: 11 }}
                value={form.taxRate}
                onChange={e => setForm(prev => ({ ...prev, taxRate: e.target.value }))}
              />
              <span style={{ fontSize: 10, color: "#525252" }}>%</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#d4d4d4", width: 100, textAlign: "right" }}>{fmtCurrency(taxAmount, form.currency)}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, width: 320 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#525252", flex: 1, textAlign: "right" }}>Discount</span>
              <input
                type="number" min="0" step="0.01"
                style={{ ...inputStyle, width: 100, textAlign: "center", padding: "6px 8px", fontSize: 11 }}
                value={form.discount}
                onChange={e => setForm(prev => ({ ...prev, discount: e.target.value }))}
              />
              <span style={{ fontSize: 13, fontWeight: 700, color: "#d4d4d4", width: 100, textAlign: "right" }}>-{fmtCurrency(Number(form.discount) || 0, form.currency)}</span>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 20, width: 320,
              borderTop: "2px solid rgba(249,115,22,0.3)", paddingTop: 12, marginTop: 4,
            }}>
              <span style={{ fontSize: 12, fontWeight: 900, color: "#f97316", flex: 1, textAlign: "right", textTransform: "uppercase", letterSpacing: "0.1em" }}>Total</span>
              <span style={{ fontSize: 18, fontWeight: 900, color: "#fff", width: 140, textAlign: "right" }}>{fmtCurrency(total, form.currency)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Notes / Terms ── */}
      <div style={{ ...sectionHeaderStyle }}>Notes & Terms</div>
      <div style={{
        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
        borderRadius: 16, padding: 20, marginBottom: 32,
      }}>
        <textarea
          style={{ ...inputStyle, minHeight: 160, resize: "vertical", lineHeight: 1.6 }}
          value={form.notes}
          onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Payment terms, bank details, or any notes..."
        />
      </div>

      {/* ── Action Buttons ── */}
      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", paddingBottom: 40 }}>
        <button onClick={onCancel} disabled={saving} style={{
          padding: "12px 24px", borderRadius: 12, background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)", color: "#a3a3a3", fontSize: 11,
          fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer",
        }}>
          Cancel
        </button>

        {isEdit ? (
          // EDIT MODE BUTTONS
          invoice.status === "draft" ? (
            <>
              <button onClick={() => handleSave("draft")} disabled={saving} style={{
                padding: "12px 24px", borderRadius: 12, background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 11,
                fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer",
              }}>
                {saving ? "Saving..." : "Save Draft"}
              </button>
              <button onClick={() => handleSave("sent")} disabled={saving} style={{
                padding: "12px 24px", borderRadius: 12, background: "linear-gradient(135deg, #f97316, #ea580c)",
                border: "none", color: "#fff", fontSize: 11, fontWeight: 800, textTransform: "uppercase",
                letterSpacing: "0.1em", cursor: "pointer", boxShadow: "0 4px 15px rgba(249,115,22,0.3)",
              }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Send size={13} /> {saving ? "Saving..." : "Save & Send"}
                </span>
              </button>
            </>
          ) : invoice.status === "sent" ? (
            <>
              <button onClick={() => handleSave("sent")} disabled={saving} style={{
                padding: "12px 24px", borderRadius: 12, background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 11,
                fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer",
              }}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button onClick={() => handleSave("paid")} disabled={saving} style={{
                padding: "12px 24px", borderRadius: 12, background: "linear-gradient(135deg, #22c55e, #16a34a)",
                border: "none", color: "#fff", fontSize: 11, fontWeight: 800, textTransform: "uppercase",
                letterSpacing: "0.1em", cursor: "pointer", boxShadow: "0 4px 15px rgba(34,197,94,0.3)",
              }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CheckCircle2 size={13} /> {saving ? "Saving..." : "Mark Paid & Save"}
                </span>
              </button>
            </>
          ) : (
            <button onClick={() => handleSave(invoice.status)} disabled={saving} style={{
              padding: "12px 24px", borderRadius: 12, background: "linear-gradient(135deg, #f97316, #ea580c)",
              border: "none", color: "#fff", fontSize: 11, fontWeight: 800, textTransform: "uppercase",
              letterSpacing: "0.1em", cursor: "pointer", boxShadow: "0 4px 15px rgba(249,115,22,0.3)",
            }}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          )
        ) : (
          // NEW INVOICE MODE BUTTONS
          <>
            <button onClick={() => handleSave("draft")} disabled={saving} style={{
              padding: "12px 24px", borderRadius: 12, background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 11,
              fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer",
            }}>
              {saving ? "Saving..." : "Save as Draft"}
            </button>
            <button onClick={() => handleSave("sent")} disabled={saving} style={{
              padding: "12px 24px", borderRadius: 12, background: "linear-gradient(135deg, #f97316, #ea580c)",
              border: "none", color: "#fff", fontSize: 11, fontWeight: 800, textTransform: "uppercase",
              letterSpacing: "0.1em", cursor: "pointer", boxShadow: "0 4px 15px rgba(249,115,22,0.3)",
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Send size={13} /> {saving ? "Saving..." : "Create & Send"}
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   INVOICE PREVIEW / PRINT COMPONENT
───────────────────────────────────────── */
function InvoicePrintPreview({ invoice, onClose, invoiceSettings }) {
  const printRef = useRef(null);

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice ${invoice.invoiceNumber}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          @page { size: A4; margin: 0; }
          body {
            font-family: 'Segoe UI', -apple-system, sans-serif;
            color: #1a1a1a; background: #fff;
            padding: 48px; line-height: 1.5;
          }
          .inv-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
          .inv-logo { display: flex; align-items: center; gap: 12px; }
          .inv-logo-icon { width: 40px; height: 40px; background: #f97316; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 900; font-size: 18px; }
          .inv-company-name { font-size: 22px; font-weight: 900; letter-spacing: -0.02em; }
          .inv-company-sub { font-size: 10px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 0.15em; }
          .inv-title { text-align: right; }
          .inv-title h1 { font-size: 28px; font-weight: 900; color: #f97316; text-transform: uppercase; letter-spacing: 0.1em; }
          .inv-title p { font-size: 13px; color: #666; margin-top: 4px; }
          .inv-meta { display: flex; justify-content: space-between; margin-bottom: 36px; }
          .inv-meta-block h3 { font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2em; color: #999; margin-bottom: 8px; }
          .inv-meta-block p { font-size: 13px; color: #333; line-height: 1.6; }
          .inv-meta-block p strong { color: #111; }
          .inv-table { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
          .inv-table thead th { font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; color: #999; padding: 12px 16px; border-bottom: 2px solid #f0f0f0; text-align: left; }
          .inv-table thead th:last-child, .inv-table thead th:nth-child(3), .inv-table thead th:nth-child(2) { text-align: right; }
          .inv-table tbody td { font-size: 13px; padding: 14px 16px; border-bottom: 1px solid #f5f5f5; color: #333; }
          .inv-table tbody td:last-child, .inv-table tbody td:nth-child(3), .inv-table tbody td:nth-child(2) { text-align: right; font-variant-numeric: tabular-nums; }
          .inv-table tbody td:first-child { font-weight: 600; }
          .inv-totals { display: flex; justify-content: flex-end; }
          .inv-totals-box { width: 280px; }
          .inv-totals-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; color: #555; }
          .inv-totals-row.total { border-top: 2px solid #f97316; padding-top: 12px; margin-top: 8px; font-size: 18px; font-weight: 900; color: #111; }
          .inv-notes { margin-top: 40px; padding-top: 24px; border-top: 1px solid #f0f0f0; }
          .inv-notes h3 { font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2em; color: #999; margin-bottom: 8px; }
          .inv-notes p { font-size: 12px; color: #666; white-space: pre-line; line-height: 1.7; }
          .inv-footer { margin-top: 48px; text-align: center; font-size: 11px; color: #bbb; }
          .inv-status { display: inline-block; padding: 4px 14px; border-radius: 100px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; }
          .inv-status.paid { background: #dcfce7; color: #16a34a; }
          .inv-status.sent { background: #dbeafe; color: #2563eb; }
          .inv-status.draft { background: #f4f4f5; color: #71717a; }
          .inv-status.overdue { background: #fee2e2; color: #dc2626; }
          .inv-status.cancelled { background: #f4f4f5; color: #a1a1aa; }
        </style>
      </head>
      <body>${content.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 300);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.85)",
      backdropFilter: "blur(8px)", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      {/* Toolbar */}
      <div style={{
        display: "flex", gap: 12, marginBottom: 16, alignItems: "center",
      }}>
        <button onClick={handlePrint} style={{
          display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12,
          background: "linear-gradient(135deg, #f97316, #ea580c)", border: "none", color: "#fff",
          fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em",
          cursor: "pointer", boxShadow: "0 4px 15px rgba(249,115,22,0.3)",
        }}>
          <Printer size={14} /> Download PDF
        </button>
        <button onClick={onClose} style={{
          display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 12,
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
          color: "#fff", fontSize: 11, fontWeight: 800, textTransform: "uppercase",
          letterSpacing: "0.1em", cursor: "pointer",
        }}>
          <X size={14} /> Close
        </button>
      </div>

      {/* Preview */}
      <div style={{
        background: "#fff", borderRadius: 16, width: "100%", maxWidth: 800,
        maxHeight: "80vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      }}>
        <div ref={printRef} style={{ padding: 48, color: "#1a1a1a", fontFamily: "'Segoe UI', -apple-system, sans-serif" }}>
          {/* Print Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 40, height: 40, background: "#f97316", borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 900, fontSize: 18,
              }}>G</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em", color: "#111" }}>{invoiceSettings?.companyName || GROW_ORBIT_INFO.name}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.15em" }}>{invoiceSettings?.tagline || GROW_ORBIT_INFO.tagline}</div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <h1 style={{ fontSize: 28, fontWeight: 900, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.1em" }}>Invoice</h1>
              <p style={{ fontSize: 13, color: "#666", marginTop: 4 }}>{invoice.invoiceNumber}</p>
              <span className={`inv-status ${invoice.status}`} style={{
                display: "inline-block", padding: "4px 14px", borderRadius: 100, fontSize: 10,
                fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 8,
                background: STATUS_CONFIG[invoice.status]?.bg || "#f4f4f5",
                color: STATUS_CONFIG[invoice.status]?.color || "#71717a",
              }}>{invoice.status}</span>
            </div>
          </div>

          {/* Meta */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 36 }}>
            <div>
              <h3 style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", color: "#999", marginBottom: 8 }}>Bill To</h3>
              <p style={{ fontSize: 13, color: "#333", lineHeight: 1.6 }}>
                <strong style={{ color: "#111" }}>{invoice.clientName}</strong><br />
                {invoice.clientEmail && <>{invoice.clientEmail}<br /></>}
                {invoice.clientAddress && <>{invoice.clientAddress}</>}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <h3 style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", color: "#999", marginBottom: 8 }}>Invoice Details</h3>
              <p style={{ fontSize: 13, color: "#333", lineHeight: 1.6 }}>
                Issue Date: <strong>{fmt(invoice.issueDate)}</strong><br />
                Due Date: <strong>{fmt(invoice.dueDate)}</strong><br />
                Currency: <strong>{invoice.currency || "USD"}</strong>
              </p>
            </div>
          </div>

          {/* Line Items Table */}
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 32 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
                <th style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "#999", padding: "12px 16px", textAlign: "left" }}>Description</th>
                <th style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "#999", padding: "12px 16px", textAlign: "right" }}>Qty</th>
                <th style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "#999", padding: "12px 16px", textAlign: "right" }}>Rate</th>
                <th style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "#999", padding: "12px 16px", textAlign: "right" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {(invoice.items || []).map((item, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f5f5f5" }}>
                  <td style={{ fontSize: 13, padding: "14px 16px", color: "#333", fontWeight: 600 }}>{item.description}</td>
                  <td style={{ fontSize: 13, padding: "14px 16px", color: "#333", textAlign: "right" }}>{item.qty}</td>
                  <td style={{ fontSize: 13, padding: "14px 16px", color: "#333", textAlign: "right" }}>{fmtCurrency(item.rate, invoice.currency)}</td>
                  <td style={{ fontSize: 13, padding: "14px 16px", color: "#333", textAlign: "right" }}>{fmtCurrency((item.qty || 0) * (item.rate || 0), invoice.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ width: 280 }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13, color: "#555" }}>
                <span>Subtotal</span><span>{fmtCurrency(invoice.subtotal, invoice.currency)}</span>
              </div>
              {invoice.taxRate > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13, color: "#555" }}>
                  <span>Tax ({invoice.taxRate}%)</span><span>{fmtCurrency(invoice.taxAmount, invoice.currency)}</span>
                </div>
              )}
              {invoice.discount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13, color: "#555" }}>
                  <span>Discount</span><span>-{fmtCurrency(invoice.discount, invoice.currency)}</span>
                </div>
              )}
              <div style={{
                display: "flex", justifyContent: "space-between", borderTop: "2px solid #f97316",
                paddingTop: 12, marginTop: 8, fontSize: 18, fontWeight: 900, color: "#111",
              }}>
                <span>Total</span><span>{fmtCurrency(invoice.total, invoice.currency)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid #f0f0f0" }}>
              <h3 style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", color: "#999", marginBottom: 8 }}>Notes & Terms</h3>
              <p style={{ fontSize: 12, color: "#666", whiteSpace: "pre-line", lineHeight: 1.7 }}>{invoice.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div style={{ marginTop: 48, textAlign: "center", fontSize: 11, color: "#bbb" }}>
            Thank you for your business · {invoiceSettings?.website || GROW_ORBIT_INFO.website} · {invoiceSettings?.email || GROW_ORBIT_INFO.email}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN INVOICES TAB
───────────────────────────────────────── */
export default function InvoicesTab({ isMobile, triggerConfirm, logActivity }) {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list"); // "list" | "form"
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [previewInvoice, setPreviewInvoice] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [layoutMode, setLayoutMode] = useState("list"); // "list" | "card"
  const [showSettings, setShowSettings] = useState(false);
  const [invoiceSettings, setInvoiceSettings] = useState(null);

  /* Fetch invoice settings */
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const snap = await getDoc(doc(db, "settings", "invoiceSettings"));
        if (snap.exists()) {
          setInvoiceSettings(snap.data());
        }
      } catch (err) {
        console.warn("[InvoicesTab] Settings fetch failed:", err.message);
      }
    };
    fetchSettings();
  }, []);

  /* Real-time invoice listener */
  useEffect(() => {
    const q = query(collection(db, "invoices"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(d => {
        const data = { id: d.id, ...d.data() };
        // Auto-mark overdue
        if (isOverdue(data) && data.status === "sent") {
          data.status = "overdue";
        }
        return data;
      });
      setInvoices(docs);
      setLoading(false);
    }, (err) => {
      console.warn("[InvoicesTab] Snapshot error:", err.message);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  /* Fetch clients for autocomplete */
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const snap = await getDocs(collection(db, "clients"));
        setClients(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.warn("[InvoicesTab] Clients fetch failed:", err.message);
      }
    };
    fetchClients();
  }, []);

  const currentAdmin = useMemo(() => {
    const user = auth.currentUser;
    return user ? { uid: user.uid, email: user.email, displayName: user.displayName } : null;
  }, []);

  /* Filtered invoices */
  const filtered = useMemo(() => {
    let result = invoices;
    if (statusFilter !== "all") {
      result = result.filter(inv => inv.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(inv =>
        inv.clientName?.toLowerCase().includes(q) ||
        inv.invoiceNumber?.toLowerCase().includes(q) ||
        inv.clientEmail?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [invoices, statusFilter, search]);

  /* Stats */
  const stats = useMemo(() => {
    const totalRevenue = invoices.filter(i => i.status === "paid").reduce((s, i) => s + (i.total || 0), 0);
    const unpaidAmount = invoices.filter(i => i.status === "sent" || i.status === "overdue").reduce((s, i) => s + (i.total || 0), 0);
    const overdueCount = invoices.filter(i => i.status === "overdue" || (i.status === "sent" && isOverdue(i))).length;
    return { total: invoices.length, totalRevenue, unpaidAmount, overdueCount };
  }, [invoices]);

  /* Handlers */
  const handleDelete = (inv) => {
    triggerConfirm(
      "Delete Invoice",
      `Are you sure you want to permanently delete invoice "${inv.invoiceNumber}" for ${inv.clientName}? This action cannot be undone.`,
      async () => {
        try {
          await deleteDoc(doc(db, "invoices", inv.id));
          logActivity("DELETE_INVOICE", `Deleted invoice ${inv.invoiceNumber} for "${inv.clientName}"`);
        } catch (err) {
          alert("Delete failed: " + err.message);
        }
      },
      true
    );
  };

  const handleMarkPaid = (inv) => {
    triggerConfirm(
      "Mark as Paid",
      `Confirm that invoice "${inv.invoiceNumber}" (${fmtCurrency(inv.total, inv.currency)}) from ${inv.clientName} has been paid?`,
      async () => {
        try {
          await updateDoc(doc(db, "invoices", inv.id), { status: "paid", paidDate: serverTimestamp(), updatedAt: serverTimestamp() });
          logActivity("MARK_INVOICE_PAID", `Marked invoice ${inv.invoiceNumber} as paid — ${fmtCurrency(inv.total, inv.currency)}`);
        } catch (err) {
          alert("Status update failed: " + err.message);
        }
      },
      false
    );
  };

  const handleStatusChange = async (inv, newStatus) => {
    try {
      const update = { status: newStatus, updatedAt: serverTimestamp() };
      if (newStatus === "paid") update.paidDate = serverTimestamp();
      await updateDoc(doc(db, "invoices", inv.id), update);
      logActivity("UPDATE_INVOICE_STATUS", `Changed invoice ${inv.invoiceNumber} status to ${newStatus.toUpperCase()}`);
    } catch (err) {
      alert("Status update failed: " + err.message);
    }
  };

  const openForm = (inv = null) => {
    setEditingInvoice(inv);
    setView("form");
  };

  const closeForm = () => {
    setEditingInvoice(null);
    setView("list");
  };

  /* Loading state */
  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50vh", gap: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid rgba(249,115,22,0.2)", borderTopColor: "#f97316", animation: "spin 1s linear infinite" }} />
        <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: "#525252" }}>Loading invoices…</p>
      </div>
    );
  }

  /* Form view */
  if (view === "form") {
    return (
      <>
        <InvoiceForm
          invoice={editingInvoice}
          allInvoices={invoices}
          clients={clients}
          onSave={closeForm}
          onCancel={closeForm}
          currentAdmin={currentAdmin}
          logActivity={logActivity}
          invoiceSettings={invoiceSettings}
        />
        {previewInvoice && <InvoicePrintPreview invoice={previewInvoice} onClose={() => setPreviewInvoice(null)} invoiceSettings={invoiceSettings} />}
      </>
    );
  }

  /* ── LIST VIEW ── */
  const statCardStyle = (color) => ({
    background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
    borderRadius: 16, padding: isMobile ? "14px 16px" : "18px 22px", flex: 1, minWidth: isMobile ? "45%" : 0,
  });

  return (
    <div className="tab-content">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 6 }}>Finance · Billing</div>
          <h1 style={{ fontSize: isMobile ? 22 : 26, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, color: "#fff", display: "flex", alignItems: "center", gap: 12 }}>
            Invoices
            <span style={{
              fontSize: 12, fontWeight: 800, color: "#f97316",
              background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)",
              padding: "4px 10px", borderRadius: 100,
            }}>
              {invoices.length}
            </span>
          </h1>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => setShowSettings(true)} style={{
            display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 14,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff",
            fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer",
          }}>
            <Settings size={14} /> Settings
          </button>
          <button onClick={() => openForm()} style={{
            display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 14,
            background: "linear-gradient(135deg, #f97316, #ea580c)", border: "none", color: "#fff",
            fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em",
            cursor: "pointer", boxShadow: "0 4px 15px rgba(249,115,22,0.3)", flexShrink: 0,
          }}>
            <Plus size={14} /> New Invoice
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "flex", gap: isMobile ? 10 : 14, marginBottom: 24, flexWrap: "wrap" }}>
        <div style={statCardStyle()}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>Total Invoices</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#fff" }}>{stats.total}</div>
        </div>
        <div style={statCardStyle()}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>Revenue Collected</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#22c55e" }}>{fmtCurrency(stats.totalRevenue)}</div>
        </div>
        <div style={statCardStyle()}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>Unpaid</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#f97316" }}>{fmtCurrency(stats.unpaidAmount)}</div>
        </div>
        <div style={statCardStyle()}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>Overdue</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: stats.overdueCount > 0 ? "#ef4444" : "#d4d4d4" }}>{stats.overdueCount}</div>
        </div>
      </div>

      {/* Search + Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 240, display: "flex", gap: 10 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#525252" }} />
            <input
              placeholder="Search by client or invoice #..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12, padding: "10px 14px 10px 38px", color: "#fff", fontSize: 12,
                fontWeight: 500, outline: "none", fontFamily: "'Montserrat', sans-serif",
              }}
            />
          </div>
          <div style={{ display: "flex", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 3 }}>
            <button
              onClick={() => setLayoutMode("list")}
              title="List View"
              style={{
                width: 32, height: 32, borderRadius: 8, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                background: layoutMode === "list" ? "rgba(249,115,22,0.15)" : "transparent",
                color: layoutMode === "list" ? "#f97316" : "#525252",
              }}
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setLayoutMode("card")}
              title="Card View"
              style={{
                width: 32, height: 32, borderRadius: 8, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                background: layoutMode === "card" ? "rgba(249,115,22,0.15)" : "transparent",
                color: layoutMode === "card" ? "#f97316" : "#525252",
              }}
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["all", "draft", "sent", "paid", "overdue", "cancelled"].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} style={{
              padding: "7px 14px", borderRadius: 10, fontSize: 10, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer",
              border: statusFilter === s ? "1px solid rgba(249,115,22,0.3)" : "1px solid rgba(255,255,255,0.06)",
              background: statusFilter === s ? "rgba(249,115,22,0.12)" : "rgba(255,255,255,0.03)",
              color: statusFilter === s ? "#f97316" : "#525252",
            }}>
              {s === "all" ? "All" : STATUS_CONFIG[s]?.label || s}
            </button>
          ))}
        </div>
      </div>

      {/* Invoice List */}
      {filtered.length === 0 ? (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", justify5Content: "center",
          height: "30vh", gap: 12, color: "#333",
        }}>
          <FileText size={40} strokeWidth={1} />
          <p style={{ fontSize: 12, fontWeight: 700, color: "#525252" }}>
            {search || statusFilter !== "all" ? "No invoices match your filters" : "No invoices yet"}
          </p>
          {!search && statusFilter === "all" && (
            <button onClick={() => openForm()} style={{
              padding: "10px 20px", borderRadius: 12, background: "rgba(249,115,22,0.1)",
              border: "1px solid rgba(249,115,22,0.2)", color: "#f97316", fontSize: 10,
              fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer",
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Plus size={12} /> Create Your First Invoice</span>
            </button>
          )}
        </div>
      ) : layoutMode === "list" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {/* Table header (desktop) */}
          {!isMobile && (
            <div style={{
              display: "grid", gridTemplateColumns: "140px 1.5fr 1fr 120px 100px 190px",
              gap: 16, padding: "0 20px", marginBottom: 6,
            }}>
              <span style={{ fontSize: 9, fontWeight: 800, color: "#404040", textTransform: "uppercase", letterSpacing: "0.15em" }}>Invoice #</span>
              <span style={{ fontSize: 9, fontWeight: 800, color: "#404040", textTransform: "uppercase", letterSpacing: "0.15em" }}>Client / Email</span>
              <span style={{ fontSize: 9, fontWeight: 800, color: "#404040", textTransform: "uppercase", letterSpacing: "0.15em", textAlign: "right" }}>Amount</span>
              <span style={{ fontSize: 9, fontWeight: 800, color: "#404040", textTransform: "uppercase", letterSpacing: "0.15em", textAlign: "center" }}>Status</span>
              <span style={{ fontSize: 9, fontWeight: 800, color: "#404040", textTransform: "uppercase", letterSpacing: "0.15em" }}>Due Date</span>
              <span style={{ fontSize: 9, fontWeight: 800, color: "#404040", textTransform: "uppercase", letterSpacing: "0.15em", textAlign: "right" }}>Actions</span>
            </div>
          )}

          {filtered.map(inv => {
            const displayStatus = isOverdue(inv) && inv.status === "sent" ? "overdue" : inv.status;

            if (isMobile) {
              /* ── Mobile Card ── */
              return (
                <div key={inv.id} style={{
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
                  borderRadius: 16, padding: 16,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, color: "#f97316", fontFamily: "monospace" }}>{inv.invoiceNumber}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginTop: 2 }}>{inv.clientName}</div>
                    </div>
                    <StatusBadge status={displayStatus} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>{fmtCurrency(inv.total, inv.currency)}</div>
                      <div style={{ fontSize: 10, color: "#525252", marginTop: 2 }}>Due {fmtShort(inv.dueDate)}</div>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => setPreviewInvoice(inv)} style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#a3a3a3" }}><Eye size={14} /></button>
                      {(displayStatus === "draft" || displayStatus === "sent") && <button onClick={() => openForm(inv)} style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#a3a3a3" }}><Edit3 size={14} /></button>}
                      {(displayStatus === "sent" || displayStatus === "overdue") && <button onClick={() => handleMarkPaid(inv)} style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#22c55e" }}><CheckCircle2 size={14} /></button>}
                      <button onClick={() => handleDelete(inv)} style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#ef4444" }}><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              );
            }

            /* ── Polished Desktop Row ── */
            return (
              <div key={inv.id} style={{
                display: "grid", gridTemplateColumns: "140px 1.5fr 1fr 120px 100px 190px",
                gap: 16, alignItems: "center", padding: "16px 20px", borderRadius: 16,
                background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.03)",
                transition: "all 0.2s ease",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(249,115,22,0.2)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.035)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.015)";
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 800, color: "#f97316", fontFamily: "monospace" }}>{inv.invoiceNumber}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{inv.clientName}</div>
                  <div style={{ fontSize: 11, color: "#525252", marginTop: 2 }}>{inv.clientEmail}</div>
                </div>
                <span style={{ fontSize: 14, fontWeight: 900, color: "#fff", textAlign: "right" }}>{fmtCurrency(inv.total, inv.currency)}</span>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <StatusBadge status={displayStatus} />
                </div>
                <span style={{ fontSize: 12, color: isOverdue(inv) ? "#ef4444" : "#a3a3a3", fontWeight: isOverdue(inv) ? 700 : 500 }}>{fmt(inv.dueDate)}</span>
                <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", alignItems: "center" }}>
                  <button onClick={() => setPreviewInvoice(inv)} title="Preview & Download" style={{
                    width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center",
                    justifyContent: "center", cursor: "pointer", color: "#a3a3a3", transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#a3a3a3"; }}
                  ><Eye size={14} /></button>
                  {(displayStatus === "draft" || displayStatus === "sent") && (
                    <button onClick={() => openForm(inv)} title="Edit" style={{
                      width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center",
                      justifyContent: "center", cursor: "pointer", color: "#a3a3a3", transition: "all 0.2s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#a3a3a3"; }}
                    ><Edit3 size={14} /></button>
                  )}
                  {(displayStatus === "sent" || displayStatus === "overdue") && (
                    <button onClick={() => handleMarkPaid(inv)} title="Mark Paid" style={{
                      width: 32, height: 32, borderRadius: 8, background: "rgba(34,197,94,0.1)",
                      border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center",
                      justifyContent: "center", cursor: "pointer", color: "#22c55e", transition: "all 0.2s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(34,197,94,0.2)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(34,197,94,0.1)"; }}
                    ><CheckCircle2 size={14} /></button>
                  )}
                  <select
                    value={displayStatus}
                    onChange={e => handleStatusChange(inv, e.target.value)}
                    style={{
                      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 8, color: "#a3a3a3", fontSize: 9, fontWeight: 700, padding: "0 8px",
                      height: 32, cursor: "pointer", outline: "none", fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    {Object.keys(STATUS_CONFIG).map(s => (
                      <option key={s} value={s} style={{ background: "#111" }}>{STATUS_CONFIG[s].label}</option>
                    ))}
                  </select>
                  <button onClick={() => handleDelete(inv)} title="Delete" style={{
                    width: 32, height: 32, borderRadius: 8, background: "rgba(239,68,68,0.06)",
                    border: "1px solid rgba(239,68,68,0.15)", display: "flex", alignItems: "center",
                    justifyContent: "center", cursor: "pointer", color: "#ef4444", transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.06)"; }}
                  ><Trash2 size={14} /></button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ── Premium Card Layout Mode ── */
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {filtered.map(inv => {
            const displayStatus = isOverdue(inv) && inv.status === "sent" ? "overdue" : inv.status;

            return (
              <div key={inv.id} style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.04)",
                borderRadius: 16,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                minHeight: 230,
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.035)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.4), 0 0 1px 1px rgba(249,115,22,0.15)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#f97316", fontFamily: "monospace" }}>{inv.invoiceNumber}</span>
                  <StatusBadge status={displayStatus} />
                </div>

                {/* Client Info */}
                <div style={{ marginBottom: 14 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "-0.01em" }}>{inv.clientName}</h3>
                  <p style={{ fontSize: 11, color: "#525252", margin: "4px 0 0", wordBreak: "break-all" }}>{inv.clientEmail || "No email address"}</p>
                </div>

                {/* Bottom Stats */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 14, marginTop: "auto" }}>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 800, color: "#404040", textTransform: "uppercase", letterSpacing: "0.1em" }}>Due Date</div>
                    <div style={{ fontSize: 12, color: isOverdue(inv) ? "#ef4444" : "#a3a3a3", fontWeight: isOverdue(inv) ? 700 : 500, marginTop: 4 }}>{fmtShort(inv.dueDate)}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 9, fontWeight: 800, color: "#404040", textTransform: "uppercase", letterSpacing: "0.1em" }}>Total</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", marginTop: 2 }}>{fmtCurrency(inv.total, inv.currency)}</div>
                  </div>
                </div>

                {/* Card Actions */}
                <div style={{ display: "flex", gap: 6, marginTop: 14, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 14, justifyContent: "flex-end", alignItems: "center" }}>
                  <button onClick={() => setPreviewInvoice(inv)} title="Preview & Download" style={{
                    width: 30, height: 30, borderRadius: 8, background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center",
                    justifyContent: "center", cursor: "pointer", color: "#a3a3a3",
                  }}><Eye size={13} /></button>
                  {(displayStatus === "draft" || displayStatus === "sent") && (
                    <button onClick={() => openForm(inv)} title="Edit" style={{
                      width: 30, height: 30, borderRadius: 8, background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center",
                      justifyContent: "center", cursor: "pointer", color: "#a3a3a3",
                    }}><Edit3 size={13} /></button>
                  )}
                  {(displayStatus === "sent" || displayStatus === "overdue") && (
                    <button onClick={() => handleMarkPaid(inv)} title="Mark Paid" style={{
                      width: 30, height: 30, borderRadius: 8, background: "rgba(34,197,94,0.1)",
                      border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center",
                      justifyContent: "center", cursor: "pointer", color: "#22c55e",
                    }}><CheckCircle2 size={13} /></button>
                  )}
                  <select
                    value={displayStatus}
                    onChange={e => handleStatusChange(inv, e.target.value)}
                    style={{
                      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 8, color: "#a3a3a3", fontSize: 9, fontWeight: 700, padding: "0 4px",
                      height: 30, cursor: "pointer", outline: "none", fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    {Object.keys(STATUS_CONFIG).map(s => (
                      <option key={s} value={s} style={{ background: "#111" }}>{STATUS_CONFIG[s].label}</option>
                    ))}
                  </select>
                  <button onClick={() => handleDelete(inv)} title="Delete" style={{
                    width: 30, height: 30, borderRadius: 8, background: "rgba(239,68,68,0.06)",
                    border: "1px solid rgba(239,68,68,0.15)", display: "flex", alignItems: "center",
                    justifyContent: "center", cursor: "pointer", color: "#ef4444",
                  }}><Trash2 size={13} /></button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Modal */}
      {previewInvoice && <InvoicePrintPreview invoice={previewInvoice} onClose={() => setPreviewInvoice(null)} invoiceSettings={invoiceSettings} />}

      {/* Settings Modal */}
      {showSettings && (
        <InvoiceSettingsModal
          onClose={() => setShowSettings(false)}
          settings={invoiceSettings}
          setSettings={setInvoiceSettings}
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   INVOICE SETTINGS MODAL
───────────────────────────────────────── */
function InvoiceSettingsModal({ onClose, settings, setSettings }) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(settings || {
    companyName: GROW_ORBIT_INFO.name,
    tagline: GROW_ORBIT_INFO.tagline,
    address: GROW_ORBIT_INFO.address,
    email: GROW_ORBIT_INFO.email,
    website: GROW_ORBIT_INFO.website,
    defaultTaxRate: 0,
    defaultNotes: "Payment Details:\nBank Name: \nAccount Name: \nAccount Number: \nRouting/SWIFT: \n\nPayment is due within 30 days of the invoice date. Please include the invoice number with your payment.",
  });

  // Ensure fields match dynamic settings when component mounts or settings update
  useEffect(() => {
    if (settings) {
      setForm(prev => ({
        companyName: settings.companyName || GROW_ORBIT_INFO.name,
        tagline: settings.tagline || GROW_ORBIT_INFO.tagline,
        address: settings.address || GROW_ORBIT_INFO.address,
        email: settings.email || GROW_ORBIT_INFO.email,
        website: settings.website || GROW_ORBIT_INFO.website,
        defaultTaxRate: settings.defaultTaxRate ?? 0,
        defaultNotes: settings.defaultNotes || "Payment Details:\nBank Name: \nAccount Name: \nAccount Number: \nRouting/SWIFT: \n\nPayment is due within 30 days of the invoice date. Please include the invoice number with your payment.",
      }));
    }
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "invoiceSettings"), form);
      setSettings(form);
      onClose();
    } catch (e) {
      console.error(e);
      alert("Failed to save settings");
    }
    setSaving(false);
  };

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 12, fontWeight: 500,
    outline: "none", fontFamily: "'Montserrat', sans-serif", transition: "border-color 0.2s",
  };
  const labelStyle = {
    fontSize: 9, fontWeight: 700, color: "#525252", textTransform: "uppercase",
    letterSpacing: "0.15em", marginBottom: 6, display: "block",
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.85)",
      backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20
    }}>
      <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, width: "100%", maxWidth: 600, padding: 32, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
        <h2 style={{ fontSize: 18, fontWeight: 900, color: "#fff", marginBottom: 24, letterSpacing: "-0.02em" }}>Invoice Settings</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>Company Name</label>
            <input style={inputStyle} value={form.companyName} onChange={e => setForm(p => ({...p, companyName: e.target.value}))} />
          </div>
          <div>
            <label style={labelStyle}>Tagline</label>
            <input style={inputStyle} value={form.tagline} onChange={e => setForm(p => ({...p, tagline: e.target.value}))} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Address</label>
            <input style={inputStyle} value={form.address} onChange={e => setForm(p => ({...p, address: e.target.value}))} />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input style={inputStyle} value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} />
          </div>
          <div>
            <label style={labelStyle}>Website</label>
            <input style={inputStyle} value={form.website} onChange={e => setForm(p => ({...p, website: e.target.value}))} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
          <div>
            <label style={labelStyle}>Default Tax Rate (%)</label>
            <input type="number" step="0.1" style={{ ...inputStyle, width: 120 }} value={form.defaultTaxRate} onChange={e => setForm(p => ({...p, defaultTaxRate: Number(e.target.value) || 0}))} />
          </div>
          <div>
            <label style={labelStyle}>Default Notes & Payment Details</label>
            <textarea style={{ ...inputStyle, minHeight: 120, resize: "vertical", lineHeight: 1.6 }} value={form.defaultNotes} onChange={e => setForm(p => ({...p, defaultNotes: e.target.value}))} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 32 }}>
          <button onClick={onClose} disabled={saving} style={{
            padding: "10px 20px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff", cursor: "pointer", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em"
          }}>Cancel</button>
          <button onClick={handleSave} disabled={saving} style={{
            padding: "10px 20px", borderRadius: 10, background: "linear-gradient(135deg, #f97316, #ea580c)", border: "none",
            color: "#fff", cursor: "pointer", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em",
            display: "flex", alignItems: "center", gap: 8
          }}>
            <Save size={14} /> {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
