"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Save, ArrowLeft, Download, User, MapPin, Mail, Phone, Globe, Check,
  FileText, ShieldCheck, Printer, RefreshCw, Building, Trash2,
  ZoomIn, ZoomOut, Maximize2
} from "lucide-react";
import { db, auth } from "@/firebase/firebaseConfig";
import { doc, getDoc, setDoc, addDoc, collection, getDocs, query, orderBy } from "firebase/firestore";
import Link from "next/link";

const CURRENCY_OPTIONS = ["USD", "GBP", "EUR", "PKR", "AED", "CAD", "AUD"];
const PAYMENT_METHODS = [
  "Bank Transfer",
  "Wire / SWIFT Remittance",
  "ACH / Direct Deposit",
  "Credit / Debit Card",
  "Wise (TransferWise)",
  "Payoneer",
  "Other"
];

const fmtCurrency = (amount, currency = "USD") => {
  const symbols = { USD: "$", GBP: "£", EUR: "€", PKR: "Rs", AED: "AED ", CAD: "C$", AUD: "A$" };
  const sym = symbols[currency] || "$";
  return `${sym}${Number(amount || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatDateStr = (dateStr, longFormat = false) => {
  if (!dateStr) return "—";
  try {
    const parts = String(dateStr).split("-");
    if (parts.length === 3) {
      const [y, m, d] = parts.map(Number);
      if (y && m && d) {
        const dt = new Date(y, m - 1, d);
        return dt.toLocaleDateString("en-US", {
          month: longFormat ? "long" : "short",
          day: "numeric",
          year: "numeric"
        });
      }
    }
    return dateStr;
  } catch (e) {
    return dateStr;
  }
};

function ReceiptBuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const receiptId = searchParams.get("id");
  const invoiceId = searchParams.get("invoiceId");
  const leadId = searchParams.get("leadId");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [zoom, setZoom] = useState(0.72);
  const [invoicesList, setInvoicesList] = useState([]);

  // Core Receipt State matching the invoice dimensions and template
  const [receiptNumber, setReceiptNumber] = useState(() => {
    const d = new Date();
    const year = d.getFullYear();
    const dateStr = String(d.getDate()).padStart(2, "0");
    const monthStr = String(d.getMonth() + 1).padStart(2, "0");
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `GO-PR-${year}-${dateStr}-${monthStr}-${randomNum}`;
  });

  const [clientName, setClientName] = useState("Amir Baig");
  const [clientEmail, setClientEmail] = useState("amir124@gmail.com");
  const [companyName, setCompanyName] = useState("Amir Baig");
  const [clientAddress, setClientAddress] = useState("USA");

  const [serviceTitle, setServiceTitle] = useState("Full Amazon Account Management & Brand Launch");
  const [serviceDescription, setServiceDescription] = useState(
    "Product Hunting & Sourcing, High-Converting 3D Renders & Graphics, Brand Storefront & A+ Content, SEO Copywriting, and Launch PPC Management (Installment 1 of 3)."
  );

  const [receiptDate, setReceiptDate] = useState("2026-08-28");
  const [paymentDate, setPaymentDate] = useState("2026-08-28");
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [transactionRef, setTransactionRef] = useState("");

  const [invoiceNumber, setInvoiceNumber] = useState("GO-INV-2026-28-08-9881");
  const [invoiceDate, setInvoiceDate] = useState("2026-08-28");
  const [totalDue, setTotalDue] = useState(8500);
  const [paidAmount, setPaidAmount] = useState(3000);
  const [currency, setCurrency] = useState("USD");
  const [status, setStatus] = useState("PAID");

  const [signatoryName, setSignatoryName] = useState("Ali Haider");
  const [signatoryTitle, setSignatoryTitle] = useState("Accounts Manager");

  const [notes, setNotes] = useState(
    "Thank you for partnering with Grow Orbit.\nThis official receipt confirms payment of $3,000.00 USD (Installment 1 of 3) toward the full Amazon Brand Launch package ($8,500.00 USD total) as per Agreement #GO-2026-25-08-5936.\nRemaining balance of $5,500.00 USD is scheduled across subsequent milestones."
  );

  const [companyPhone, setCompanyPhone] = useState("+1 (302) 823-6826");
  const [companyAddress, setCompanyAddress] = useState("2025 Lexington Dr, Mississauga, ON L5J 3V2, Canada");
  const [companyWebsite, setCompanyWebsite] = useState("www.groworbitofficial.com");
  const [companyEmail, setCompanyEmail] = useState("support@groworbitofficial.com");

  // Load existing data or pre-fill from Invoice / Lead
  useEffect(() => {
    const init = async () => {
      try {
        const invSnap = await getDocs(query(collection(db, "invoices"), orderBy("createdAt", "desc")));
        setInvoicesList(invSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.warn("Could not fetch invoices list:", e);
      }

      if (receiptId) {
        try {
          const snap = await getDoc(doc(db, "receipts", receiptId));
          if (snap.exists()) {
            const data = snap.data();
            if (data.receiptNumber) setReceiptNumber(data.receiptNumber);
            if (data.clientName) setClientName(data.clientName);
            if (data.clientEmail) setClientEmail(data.clientEmail);
            if (data.companyName) setCompanyName(data.companyName);
            if (data.clientAddress) setClientAddress(data.clientAddress);
            if (data.serviceTitle) setServiceTitle(data.serviceTitle);
            if (data.serviceDescription) setServiceDescription(data.serviceDescription);
            if (data.receiptDate) setReceiptDate(data.receiptDate);
            if (data.paymentDate) setPaymentDate(data.paymentDate);
            if (data.paymentMethod) setPaymentMethod(data.paymentMethod);
            if (data.transactionRef) setTransactionRef(data.transactionRef);
            if (data.invoiceNumber) setInvoiceNumber(data.invoiceNumber);
            if (data.invoiceDate) setInvoiceDate(data.invoiceDate);
            if (data.totalDue !== undefined) setTotalDue(Number(data.totalDue));
            if (data.paidAmount !== undefined) setPaidAmount(Number(data.paidAmount));
            if (data.currency) setCurrency(data.currency);
            if (data.status) setStatus(data.status);
            if (data.signatoryName) setSignatoryName(data.signatoryName);
            if (data.signatoryTitle) setSignatoryTitle(data.signatoryTitle);
            if (data.notes) setNotes(data.notes);
            if (data.companyPhone) setCompanyPhone(data.companyPhone);
            if (data.companyAddress) setCompanyAddress(data.companyAddress);
            if (data.companyWebsite) setCompanyWebsite(data.companyWebsite);
            if (data.companyEmail) setCompanyEmail(data.companyEmail);
          }
        } catch (e) {
          console.error("Failed to load receipt:", e);
        }
      } else if (invoiceId) {
        try {
          const snap = await getDoc(doc(db, "invoices", invoiceId));
          if (snap.exists()) {
            const inv = snap.data();
            if (inv.invoiceNumber) {
              setInvoiceNumber(inv.invoiceNumber);
              const numPart = inv.invoiceNumber.split("-").pop() || "9881";
              const now = new Date();
              const year = now.getFullYear();
              const dateStr = String(now.getDate()).padStart(2, "0");
              const monthStr = String(now.getMonth() + 1).padStart(2, "0");
              setReceiptNumber(`GO-PR-${year}-${dateStr}-${monthStr}-${numPart}`);
            }
            if (inv.clientName) setClientName(inv.clientName);
            if (inv.clientEmail) setClientEmail(inv.clientEmail);
            if (inv.companyName) setCompanyName(inv.companyName);
            if (inv.clientAddress) setClientAddress(inv.clientAddress);
            if (inv.issueDate) setInvoiceDate(inv.issueDate);
            if (inv.currency) setCurrency(inv.currency);

            const items = inv.items || [];
            const subtotal = items.reduce((acc, it) => acc + (Number(it.price) || 0) * (Number(it.quantity) || 1), 0);
            const discount = Number(inv.discount) || 0;
            const tax = (subtotal - discount) * ((Number(inv.taxRate) || 0) / 100);
            const calcTotal = subtotal - discount + tax;
            
            // If it's Amir Baig or has 8500 total in contract, preserve total due
            if (inv.clientName?.toLowerCase().includes("amir") || inv.notes?.includes("8,500")) {
              setTotalDue(8500);
              setPaidAmount(calcTotal || 3000);
            } else {
              setTotalDue(calcTotal || 3000);
              setPaidAmount(calcTotal || 3000);
            }

            if (items[0]?.name) {
              setServiceTitle(items[0].name.replace(/\(Installment.*?\)/i, "").trim() || "Full Amazon Account Management & Brand Launch");
              setServiceDescription(items[0].description || "Comprehensive Amazon account management & growth services as per agreement.");
            }
          }
        } catch (e) {
          console.error("Failed to populate from invoice:", e);
        }
      } else if (leadId) {
        try {
          const snap = await getDoc(doc(db, "leads", leadId));
          if (snap.exists()) {
            const data = snap.data();
            if (data.fullName) setClientName(data.fullName);
            if (data.email) setClientEmail(data.email);
            if (data.companyName) setCompanyName(data.companyName);
            if (data.location) setClientAddress(data.location);
          }
        } catch (e) {
          console.error("Failed to load lead:", e);
        }
      }

      setLoading(false);
    };

    init();
  }, [receiptId, invoiceId, leadId]);

  // Financial balance
  const balance = Math.max(0, (Number(totalDue) || 0) - (Number(paidAmount) || 0));

  // Populate from Invoice Selection Dropdown
  const handleSelectInvoice = (inv) => {
    if (!inv) return;
    if (inv.invoiceNumber) {
      setInvoiceNumber(inv.invoiceNumber);
      const numPart = inv.invoiceNumber.split("-").pop() || "9881";
      const now = new Date();
      const year = now.getFullYear();
      const dateStr = String(now.getDate()).padStart(2, "0");
      const monthStr = String(now.getMonth() + 1).padStart(2, "0");
      setReceiptNumber(`GO-PR-${year}-${dateStr}-${monthStr}-${numPart}`);
    }
    if (inv.clientName) setClientName(inv.clientName);
    if (inv.clientEmail) setClientEmail(inv.clientEmail);
    if (inv.companyName) setCompanyName(inv.companyName);
    if (inv.clientAddress) setClientAddress(inv.clientAddress);
    if (inv.issueDate) setInvoiceDate(inv.issueDate);
    if (inv.currency) setCurrency(inv.currency);

    const items = inv.items || [];
    const subtotal = items.reduce((acc, it) => acc + (Number(it.price) || 0) * (Number(it.quantity) || 1), 0);
    const discount = Number(inv.discount) || 0;
    const tax = (subtotal - discount) * ((Number(inv.taxRate) || 0) / 100);
    const calcTotal = subtotal - discount + tax;

    if (inv.clientName?.toLowerCase().includes("amir") || inv.notes?.includes("8,500")) {
      setTotalDue(8500);
      setPaidAmount(calcTotal || 3000);
    } else {
      setTotalDue(calcTotal || 3000);
      setPaidAmount(calcTotal || 3000);
    }

    if (items[0]?.name) {
      setServiceTitle(items[0].name.replace(/\(Installment.*?\)/i, "").trim() || "Full Amazon Account Management & Brand Launch");
      setServiceDescription(items[0].description || "Comprehensive Amazon account management & growth services as per agreement.");
    }
  };

  // Save / Update Handler
  const handleSaveReceipt = async () => {
    try {
      setSaving(true);
      const now = new Date().toISOString();

      const payload = {
        receiptNumber: receiptNumber.startsWith("#") ? receiptNumber : `#${receiptNumber}`,
        clientName,
        clientEmail,
        companyName,
        clientAddress,
        serviceTitle,
        serviceDescription,
        receiptDate,
        paymentDate,
        paymentMethod,
        transactionRef,
        invoiceNumber,
        invoiceDate,
        totalDue: Number(totalDue) || 0,
        paidAmount: Number(paidAmount) || 0,
        balance: Number(balance) || 0,
        currency,
        status: status || "completed",
        signatoryName,
        signatoryTitle,
        notes,
        companyPhone,
        companyAddress,
        companyWebsite,
        companyEmail,
        updatedAt: now,
      };

      if (receiptId) {
        await setDoc(doc(db, "receipts", receiptId), payload, { merge: true });
        alert("Payment Receipt updated successfully!");
      } else {
        payload.createdAt = now;
        payload.createdBy = auth.currentUser?.uid || "admin";
        const docRef = await addDoc(collection(db, "receipts"), payload);
        alert("Payment Receipt created successfully!");
        router.push(`/admin-dashboard/receipt-builder?id=${docRef.id}`);
      }
    } catch (e) {
      alert("Failed to save receipt: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleClearData = () => {
    if (!window.confirm("Are you sure you want to clear all the receipt fields?")) return;
    setClientName("");
    setClientEmail("");
    setCompanyName("");
    setClientAddress("");
    setServiceTitle("");
    setServiceDescription("");
    setTransactionRef("");
    setInvoiceNumber("");
    setTotalDue(0);
    setPaidAmount(0);
    setNotes("");
  };

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `Grow Orbit receipt (${cleanReceiptNum})`;
    setTimeout(() => {
      window.print();
      document.title = originalTitle;
    }, 100);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#06090e", color: "#94a3b8" }}>
        <RefreshCw size={24} className="animate-spin" style={{ marginRight: 10 }} /> Loading Payment Receipt Studio...
      </div>
    );
  }

  const cleanReceiptNum = receiptNumber.startsWith("#") ? receiptNumber : `#${receiptNumber}`;

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #printable-receipt, #printable-receipt * { visibility: visible !important; }
          #print-wrapper { transform: none !important; position: static !important; }
          #printable-receipt {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 1055px !important;
            min-height: 1391px !important;
            height: 1391px !important;
            margin: 0 !important;
            padding: 60px 55px 45px !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            transform: none !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          @page { size: 1055px 1391px; margin: 0; }
        }
      `}</style>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#070a12", color: "#fff", fontFamily: "var(--font-montserrat), sans-serif", overflow: "hidden" }}>
      {/* Top Studio Navbar */}
      <div style={{ height: 60, borderBottom: "1px solid rgba(255,255,255,0.08)", background: "#0b0f19", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={() => router.push("/admin-dashboard?tab=invoices")}
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#a1a1aa", borderRadius: 8, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 12, fontWeight: 700 }}
          >
            <ArrowLeft size={14} /> Back to Hub
          </button>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#ea580c" }}>RECEIPT STUDIO:</span> {cleanReceiptNum}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            type="button"
            onClick={handleClearData}
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", borderRadius: 8, padding: "8px 14px", display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 800, cursor: "pointer" }}
            title="Clear All Fields"
          >
            <Trash2 size={13} /> Clear Form
          </button>

          <button
            onClick={handlePrint}
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", borderRadius: 8, padding: "8px 16px", display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
            title="Print or Save as PDF"
          >
            <Printer size={14} /> Print / PDF
          </button>

          <button
            onClick={handleSaveReceipt}
            disabled={saving}
            style={{ background: "#ea580c", color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px", display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 800, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.06em" }}
          >
            <Save size={14} /> {saving ? "Saving..." : receiptId ? "Update Receipt" : "Save Receipt"}
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        
        {/* Left Form Controls Sidebar */}
        <div className="custom-scrollbar" style={{ width: 440, borderRight: "1px solid rgba(255,255,255,0.08)", background: "#090d16", padding: 22, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
          
          {/* Quick Clear Action */}
          <div>
            <button
              type="button"
              onClick={handleClearData}
              style={{ width: "100%", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)", color: "#ef4444", borderRadius: 8, padding: "8px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
            >
              <Trash2 size={13} /> Clear Form & Start Blank
            </button>
          </div>

          {/* Quick Pre-fill from existing Invoice */}
          {invoicesList.length > 0 && (
            <div style={{ background: "#0e1526", border: "1px solid rgba(234,88,12,0.25)", borderRadius: 10, padding: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 10, color: "#ea580c", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 4 }}>
                <Building size={12} /> Auto-fill from Invoice
              </label>
              <select
                onChange={(e) => {
                  const selected = invoicesList.find(i => i.id === e.target.value);
                  if (selected) handleSelectInvoice(selected);
                }}
                defaultValue=""
                style={{ background: "#080b12", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "7px 10px", color: "#fff", fontSize: 11, outline: "none" }}
              >
                <option value="" disabled>-- Select an existing invoice --</option>
                {invoicesList.map(inv => (
                  <option key={inv.id} value={inv.id}>
                    {inv.invoiceNumber} — {inv.clientName} ({fmtCurrency(inv.items?.[0]?.price || 3000, inv.currency || "USD")})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Receipt Info Card */}
          <div style={{ background: "#0d121f", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#ea580c", letterSpacing: "0.08em", textTransform: "uppercase" }}>Receipt Reference</div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700 }}>Receipt #</label>
                <input
                  type="text"
                  value={receiptNumber}
                  onChange={e => setReceiptNumber(e.target.value)}
                  style={{ background: "#080b12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "6px 8px", color: "#ea580c", fontSize: 11, fontWeight: 700, outline: "none" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700 }}>Receipt Date</label>
                <input
                  type="date"
                  value={receiptDate}
                  onChange={e => setReceiptDate(e.target.value)}
                  style={{ background: "#080b12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "6px 8px", color: "#fff", fontSize: 11, outline: "none" }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700 }}>Payment Date</label>
                <input
                  type="date"
                  value={paymentDate}
                  onChange={e => setPaymentDate(e.target.value)}
                  style={{ background: "#080b12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "6px 8px", color: "#fff", fontSize: 11, outline: "none" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700 }}>Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value)}
                  style={{ background: "#080b12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "6px 8px", color: "#fff", fontSize: 11, outline: "none" }}
                >
                  {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700 }}>Transaction / Reference ID</label>
              <input
                type="text"
                value={transactionRef}
                onChange={e => setTransactionRef(e.target.value)}
                placeholder="e.g. TRX12987654321"
                style={{ background: "#080b12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "6px 8px", color: "#fff", fontSize: 11, outline: "none" }}
              />
            </div>
          </div>

          {/* Client Details */}
          <div style={{ background: "#0d121f", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#ea580c", letterSpacing: "0.08em", textTransform: "uppercase" }}>Received From (Client)</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700 }}>Client Full Name</label>
              <input
                type="text"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                style={{ background: "#080b12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "6px 8px", color: "#fff", fontSize: 11, outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700 }}>Company / Tag</label>
              <input
                type="text"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                style={{ background: "#080b12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "6px 8px", color: "#fff", fontSize: 11, outline: "none" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700 }}>Client Email</label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={e => setClientEmail(e.target.value)}
                  style={{ background: "#080b12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "6px 8px", color: "#fff", fontSize: 11, outline: "none" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700 }}>Country / Region</label>
                <input
                  type="text"
                  value={clientAddress}
                  onChange={e => setClientAddress(e.target.value)}
                  style={{ background: "#080b12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "6px 8px", color: "#fff", fontSize: 11, outline: "none" }}
                />
              </div>
            </div>
          </div>

          {/* Service Scope */}
          <div style={{ background: "#0d121f", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#ea580c", letterSpacing: "0.08em", textTransform: "uppercase" }}>Service Information</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700 }}>Service Title</label>
              <input
                type="text"
                value={serviceTitle}
                onChange={e => setServiceTitle(e.target.value)}
                style={{ background: "#080b12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "6px 8px", color: "#fff", fontSize: 11, outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700 }}>Service Description</label>
              <textarea
                rows={3}
                value={serviceDescription}
                onChange={e => setServiceDescription(e.target.value)}
                style={{ background: "#080b12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "6px 8px", color: "#fff", fontSize: 11, outline: "none", resize: "none" }}
              />
            </div>
          </div>

          {/* Invoice Summary & Settlement */}
          <div style={{ background: "#0d121f", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#ea580c", letterSpacing: "0.08em", textTransform: "uppercase" }}>Invoice Financial Settlement</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700 }}>Invoice #</label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={e => setInvoiceNumber(e.target.value)}
                  placeholder="e.g. GO-INV-2026-01-09-9881"
                  style={{ background: "#080b12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "6px 8px", color: "#fff", fontSize: 11, outline: "none" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700 }}>Invoice Date</label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={e => setInvoiceDate(e.target.value)}
                  style={{ background: "#080b12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "6px 8px", color: "#fff", fontSize: 11, outline: "none" }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700 }}>Total Due</label>
                <input
                  type="number"
                  value={totalDue}
                  onChange={e => setTotalDue(e.target.value)}
                  style={{ background: "#080b12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "6px 8px", color: "#ea580c", fontSize: 11, fontWeight: 700, outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700 }}>Paid Amount</label>
                <input
                  type="number"
                  value={paidAmount}
                  onChange={e => setPaidAmount(e.target.value)}
                  style={{ background: "#080b12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "6px 8px", color: "#10b981", fontSize: 11, fontWeight: 700, outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700 }}>Currency</label>
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                  style={{ background: "#080b12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "6px 8px", color: "#fff", fontSize: 11, outline: "none" }}
                >
                  {CURRENCY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Signatory & Notes */}
          <div style={{ background: "#0d121f", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#ea580c", letterSpacing: "0.08em", textTransform: "uppercase" }}>Signatory & Notes</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700 }}>Signatory Name</label>
                <input
                  type="text"
                  value={signatoryName}
                  onChange={e => setSignatoryName(e.target.value)}
                  style={{ background: "#080b12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "6px 8px", color: "#fff", fontSize: 11, outline: "none" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700 }}>Signatory Title</label>
                <input
                  type="text"
                  value={signatoryTitle}
                  onChange={e => setSignatoryTitle(e.target.value)}
                  style={{ background: "#080b12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "6px 8px", color: "#fff", fontSize: 11, outline: "none" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <label style={{ fontSize: 10, color: "#71717a", fontWeight: 700 }}>Receipt Notes</label>
              <textarea
                rows={3}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                style={{ background: "#080b12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "6px 8px", color: "#fff", fontSize: 11, outline: "none", resize: "none" }}
              />
            </div>
          </div>

        </div>

        {/* Right Live Preview Column matching Invoice Dimensions */}
        <div className="custom-scrollbar" style={{ flex: 1, overflow: "auto", background: "#0b0f19", padding: "40px", display: "flex", justifyContent: "center", alignItems: "flex-start", position: "relative" }}>
          
          {/* Floating Zoom Controls */}
          <div style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(15, 23, 42, 0.9)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            padding: "6px 12px",
            zIndex: 50,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)"
          }}>
            <button
              onClick={() => setZoom(prev => Math.max(0.4, Number((prev - 0.05).toFixed(2))))}
              style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", padding: 4 }}
              title="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#f8fafc", minWidth: "40px", textAlign: "center" }}>
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(prev => Math.min(1.2, Number((prev + 0.05).toFixed(2))))}
              style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", padding: 4 }}
              title="Zoom In"
            >
              <ZoomIn size={16} />
            </button>
            <div style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.15)", margin: "0 2px" }} />
            <button
              onClick={() => setZoom(0.72)}
              style={{ background: "transparent", border: "none", color: "#ea580c", fontSize: "10px", fontWeight: "800", cursor: "pointer", padding: "2px 4px" }}
              title="Reset Zoom"
            >
              RESET
            </button>
          </div>

          {/* Scale wrapper */}
          <div style={{
            width: `${1055 * zoom}px`,
            height: `${1491 * zoom}px`,
            position: "relative",
            transition: "width 0.2s, height 0.2s"
          }}>
            <div id="print-wrapper" style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
              width: "1055px",
              minHeight: "1491px",
              transition: "transform 0.2s",
              position: "absolute",
              top: 0,
              left: 0
            }}>

              {/* Exact High-Def A4 Sheet matching Invoice Dimensions */}
              <div
                id="printable-receipt"
                style={{
                  width: "1055px",
                  minHeight: "1391px",
                  background: "#ffffff",
                  padding: "60px 55px 45px",
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
                }}
              >
                {/* Exact Invoice Header Section */}
                <div style={{
                  position: "relative",
                  height: "175px",
                  margin: "-60px -55px 0",
                  overflow: "hidden"
                }}>
                  {/* Wave Banner Graphic from Invoice */}
                  <div style={{ position: "absolute", top: 0, right: 0, width: "580px", height: "160px", zIndex: 1, pointerEvents: "none" }}>
                    <img src="/header-curve.png" alt="Header Graphic" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "right top" }} />
                  </div>

                  {/* Header Title Overlay */}
                  <div style={{ position: "absolute", top: 42, right: 50, textAlign: "right", zIndex: 2 }}>
                    <div style={{ fontSize: "22px", fontWeight: "900", color: "#f97316", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-montserrat)", whiteSpace: "nowrap" }}>
                      PAYMENT RECEIPT
                    </div>
                    <div style={{ fontSize: "12px", fontWeight: "800", color: "#ffffff", marginTop: 4, letterSpacing: "0.8px", fontFamily: "var(--font-montserrat)", whiteSpace: "nowrap" }}>
                      {cleanReceiptNum}
                    </div>
                  </div>

                  {/* Logo & Tagline */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, position: "absolute", top: "65px", left: "55px", zIndex: 2 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <img
                        src="/logo.png"
                        alt="Grow Orbit Logo"
                        style={{ width: "48px", height: "48px", objectFit: "contain" }}
                      />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "center", lineHeight: 1 }}>
                          <span style={{ fontSize: "26px", fontWeight: "900", color: "#0f172a", letterSpacing: "1px", fontFamily: "var(--font-montserrat)" }}>GROW&nbsp;</span>
                          <span style={{ fontSize: "26px", fontWeight: "900", color: "#f97316", letterSpacing: "1px", fontFamily: "var(--font-montserrat)" }}>ORBIT</span>
                        </div>
                        <div style={{ fontSize: "8.5px", color: "#64748b", fontWeight: "800", letterSpacing: "1px", marginTop: "6px" }}>
                          WE RANK. YOU SELL. IT'S THAT SIMPLE.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Edge-to-Edge Dashed Orange Line with Black End Half-Circle Cutouts */}
                <div style={{ position: "relative", margin: "20px -55px 24px", height: "0px" }}>
                  <div style={{
                    position: "absolute",
                    left: "-16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "#0b0f19",
                    zIndex: 5
                  }} />
                  <div style={{ borderTop: "3px dashed #f97316", width: "100%" }} />
                  <div style={{
                    position: "absolute",
                    right: "-16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "#0b0f19",
                    zIndex: 5
                  }} />
                </div>

                {/* Thank You Banner (Larger with Top & Bottom Spacing) */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  marginTop: "16px",
                  marginBottom: "40px",
                  padding: "4px 0"
                }}>
                  <div style={{
                    width: "62px",
                    height: "62px",
                    borderRadius: "50%",
                    background: "#ffedd5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 4px 14px rgba(249,115,22,0.18)"
                  }}>
                    <div style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "#0f172a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff"
                    }}>
                      <Check size={19} strokeWidth={3.5} />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ fontSize: "24px", fontWeight: "900", color: "#0f172a", letterSpacing: "-0.01em", fontFamily: "var(--font-montserrat)" }}>
                      Thank You!
                    </div>
                    <div style={{ fontSize: "16px", fontWeight: "800", color: "#1e293b" }}>
                      We have received your payment.
                    </div>
                    <div style={{ fontSize: "12.5px", color: "#64748b", fontWeight: "500" }}>
                      Here's your official payment receipt for your records.
                    </div>
                  </div>
                </div>

                {/* Three-Column Metadata Block (Clean Icons instead of emojis) */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "32px",
                  gap: "20px"
                }}>
                  {/* 1. Received From Column */}
                  <div style={{ width: "32%", display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: "10.5px", fontWeight: "900", color: "#ea580c", textTransform: "uppercase", marginBottom: "12px", letterSpacing: "1px", fontFamily: "var(--font-montserrat)" }}>
                      RECEIVED FROM
                    </div>
                    <div style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", marginBottom: "8px", fontFamily: "var(--font-montserrat)" }}>
                      {clientName || "Valued Client"}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#475569", fontSize: "12px" }}>
                        <Building size={14} color="#0f172a" strokeWidth={2.2} style={{ flexShrink: 0 }} />
                        <span style={{ fontWeight: "600" }}>{companyName || clientName || "Valued Partner"}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#475569", fontSize: "12px" }}>
                        <MapPin size={14} color="#0f172a" strokeWidth={2.2} style={{ flexShrink: 0 }} />
                        <span style={{ fontWeight: "600" }}>{clientAddress || "USA"}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#475569", fontSize: "12px" }}>
                        <Mail size={14} color="#0f172a" strokeWidth={2.2} style={{ flexShrink: 0 }} />
                        <span style={{ fontWeight: "500" }}>{clientEmail || "client@domain.com"}</span>
                      </div>
                    </div>
                  </div>

                  {/* 2. Service Scope Column */}
                  <div style={{ width: "36%", display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: "10.5px", fontWeight: "900", color: "#f97316", textTransform: "uppercase", marginBottom: "12px", letterSpacing: "1px", fontFamily: "var(--font-montserrat)" }}>
                      SERVICE
                    </div>
                    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#fff7ed", border: "1.5px solid #ffedd5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                        <span style={{ fontSize: "20px", fontWeight: "900", color: "#0f172a", fontFamily: "sans-serif" }}>a</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ fontSize: "13.5px", fontWeight: "800", color: "#0f172a", fontFamily: "var(--font-montserrat)" }}>
                          {serviceTitle}
                        </div>
                        <div style={{ fontSize: "11px", color: "#64748b", lineHeight: "1.45", marginTop: "4px", fontWeight: "500" }}>
                          {serviceDescription}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. Payment Details Column */}
                  <div style={{ width: "32%", display: "flex", flexDirection: "column", borderLeft: "1.5px solid #ffedd5", paddingLeft: "20px" }}>
                    <div style={{ fontSize: "10.5px", fontWeight: "900", color: "#f97316", textTransform: "uppercase", marginBottom: "12px", letterSpacing: "1px", fontFamily: "var(--font-montserrat)" }}>
                      PAYMENT DETAILS
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px" }}>
                        <span style={{ fontWeight: "800", color: "#0f172a", textTransform: "uppercase", fontSize: "10.5px" }}>RECEIPT DATE</span>
                        <span style={{ color: "#475569", fontWeight: "600" }}>{formatDateStr(receiptDate)}</span>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px" }}>
                        <span style={{ fontWeight: "800", color: "#0f172a", textTransform: "uppercase", fontSize: "10.5px" }}>PAYMENT DATE</span>
                        <span style={{ color: "#475569", fontWeight: "600" }}>{formatDateStr(paymentDate)}</span>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px" }}>
                        <span style={{ fontWeight: "800", color: "#0f172a", textTransform: "uppercase", fontSize: "10.5px" }}>PAYMENT METHOD</span>
                        <span style={{ color: "#475569", fontWeight: "600" }}>{paymentMethod}</span>
                      </div>

                      {transactionRef ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 4 }}>
                          <span style={{ fontWeight: "800", color: "#0f172a", textTransform: "uppercase", fontSize: "10px" }}>REFERENCE / TRANSACTION ID</span>
                          <span style={{ color: "#0f172a", fontWeight: "800", fontSize: "11.5px", letterSpacing: "0.03em" }}>{transactionRef}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* INVOICE SUMMARY Box */}
                <div style={{ border: "1.5px solid #f1f5f9", borderRadius: "12px", padding: "20px 24px", marginBottom: 28, background: "#ffffff" }}>
                  <div style={{ fontSize: "11px", fontWeight: "900", color: "#ea580c", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
                    INVOICE SUMMARY
                  </div>

                  {/* Table Headers */}
                  <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr 1.3fr 1.3fr 1fr", gap: 10, fontSize: "10px", fontWeight: "900", color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.04em", paddingBottom: 12, borderBottom: "1.5px solid #f1f5f9" }}>
                    <div>INVOICE #</div>
                    <div>INVOICE DATE</div>
                    <div style={{ textAlign: "right" }}>TOTAL DUE ({currency})</div>
                    <div style={{ textAlign: "right" }}>PAID AMOUNT ({currency})</div>
                    <div style={{ textAlign: "center" }}>STATUS</div>
                  </div>

                  {/* Table Data Row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr 1.3fr 1.3fr 1fr", gap: 10, alignItems: "center", padding: "16px 0 20px 0", fontSize: "12px", fontWeight: "700" }}>
                    <div style={{ color: "#475569", fontWeight: "700", fontSize: "11.5px" }}>{invoiceNumber}</div>
                    <div style={{ color: "#64748b", fontSize: "11.5px" }}>{formatDateStr(invoiceDate)}</div>
                    <div style={{ textAlign: "right", color: "#ea580c", fontWeight: "900", fontSize: "13px" }}>{fmtCurrency(totalDue, currency)}</div>
                    <div style={{ textAlign: "right", color: "#16a34a", fontWeight: "900", fontSize: "13px" }}>{fmtCurrency(paidAmount, currency)}</div>
                    <div style={{ textAlign: "center" }}>
                      <span style={{ fontSize: "10px", fontWeight: "900", color: "#16a34a", background: "#dcfce7", padding: "4px 14px", borderRadius: "100px", letterSpacing: "0.06em", display: "inline-block" }}>
                        PAID
                      </span>
                    </div>
                  </div>

                  {/* Gray Payment Received Sub-Card */}
                  <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "20px 24px", display: "flex", alignItems: "center", border: "1px solid #f1f5f9" }}>
                    
                    {/* Payment Received Green Box */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                      <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#86efac", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                        <Check size={22} strokeWidth={3.5} color="#15803d" />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ fontSize: "11.5px", fontWeight: "900", color: "#0f172a", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                          PAYMENT RECEIVED
                        </div>
                        <div style={{ fontSize: "11.5px", color: "#475569" }}>
                          We confirm that we have received the payment of
                        </div>
                        <div style={{ fontSize: "17px", fontWeight: "900", color: "#16a34a", letterSpacing: "-0.01em", margin: "1px 0" }}>
                          {fmtCurrency(paidAmount, currency)} {currency}
                        </div>
                        <div style={{ fontSize: "11.5px", color: "#475569" }}>
                          for Invoice <strong style={{ color: "#0f172a" }}>#{invoiceNumber.replace(/^#/, "")}</strong>.
                        </div>
                        <div style={{ fontSize: "10.5px", color: "#64748b", marginTop: 2 }}>
                          This payment has been successfully processed.
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* NOTES Card (Dark Navy Bar with Orbit Pattern) */}
                <div style={{
                  background: "#0f172a",
                  color: "#ffffff",
                  borderRadius: "12px",
                  padding: "20px 24px",
                  position: "relative",
                  overflow: "hidden",
                  marginBottom: 28,
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start"
                }}>
                  {/* Concentric Orange Orbit Arcs on right side */}
                  <div style={{ position: "absolute", right: -30, top: -40, width: 220, height: 220, pointerEvents: "none", opacity: 0.2 }}>
                    <svg viewBox="0 0 200 200" width="220" height="220">
                      <circle cx="100" cy="100" r="40" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx="100" cy="100" r="70" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="4 4" />
                      <circle cx="100" cy="100" r="95" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="5 5" />
                    </svg>
                  </div>

                  {/* Icon on Left */}
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <FileText size={20} color="#fff" />
                  </div>

                  {/* Notes Body */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, zIndex: 1, flex: 1 }}>
                    <div style={{ fontSize: "11px", fontWeight: "900", color: "#ea580c", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      NOTES
                    </div>
                    <div style={{ fontSize: "11px", color: "#f1f5f9", lineHeight: 1.6, whiteSpace: "pre-line", fontWeight: "500" }}>
                      {notes}
                    </div>
                    <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: 4, fontWeight: "600" }}>
                      Receipt issued on {formatDateStr(paymentDate, true)}.
                    </div>
                  </div>
                </div>

                {/* Bottom Footer Section */}
                <div style={{ marginTop: "auto", paddingTop: 20, borderTop: "1.5px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  
                  {/* Left: Grow Orbit Logo & Brand Text */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img
                      src="/logo.png"
                      alt="Grow Orbit Logo"
                      style={{ width: "34px", height: "34px", objectFit: "contain" }}
                    />
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ fontSize: "17px", fontWeight: "900", color: "#0f172a", letterSpacing: "0.5px", fontFamily: "var(--font-montserrat)" }}>GROW&nbsp;</span>
                      <span style={{ fontSize: "17px", fontWeight: "900", color: "#f97316", letterSpacing: "0.5px", fontFamily: "var(--font-montserrat)" }}>ORBIT</span>
                    </div>
                  </div>

                  {/* Middle: Contact Columns center */}
                  <div style={{ display: "flex", alignItems: "center", padding: "0 20px", borderLeft: "1px solid #fed7aa", borderRight: "1px solid #fed7aa" }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px", fontSize: "10.5px", color: "#0f172a", fontWeight: "600", paddingRight: "20px", borderRight: "1px solid #fed7aa" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Globe size={13} color="#ea580c" strokeWidth={2.2} style={{ flexShrink: 0 }} />
                        <span style={{ whiteSpace: "nowrap" }}>{companyWebsite}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Mail size={13} color="#ea580c" strokeWidth={2.2} style={{ flexShrink: 0 }} />
                        <span style={{ whiteSpace: "nowrap" }}>{companyEmail}</span>
                      </div>
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px", fontSize: "10.5px", color: "#0f172a", fontWeight: "600", paddingLeft: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Phone size={13} color="#ea580c" strokeWidth={2.2} style={{ flexShrink: 0 }} />
                        <span style={{ whiteSpace: "nowrap" }}>{companyPhone}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <MapPin size={13} color="#ea580c" strokeWidth={2.2} style={{ flexShrink: 0 }} />
                        <span style={{ whiteSpace: "nowrap" }}>{companyAddress}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Digital Signature Card (Exact Invoice Design) */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{
                      position: "relative",
                      overflow: "hidden",
                      width: "185px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      padding: "14px 16px 12px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
                    }}>
                      {/* Top-Right Decorative Corner Shape Accent */}
                      <div style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "65px",
                        height: "65px",
                        pointerEvents: "none"
                      }}>
                        <svg width="65" height="65" viewBox="0 0 65 65" fill="none">
                          <path d="M65 0 H20 L65 50 Z" fill="#f6e7e0" />
                        </svg>
                      </div>

                      {/* Signature Text in Classic Serif Font */}
                      <div style={{
                        fontSize: "20px",
                        fontFamily: "'Georgia', 'Times New Roman', serif",
                        fontWeight: 400,
                        color: "#0f172a",
                        letterSpacing: "0.5px",
                        marginBottom: "6px"
                      }}>
                        {signatoryName || "Ali Haider"}
                      </div>

                      {/* Orange Horizontal Radial Gradient Line */}
                      <div style={{
                        width: "100px",
                        height: "2px",
                        background: "radial-gradient(ellipse at center, #ea580c 0%, rgba(234,88,12,0) 75%)",
                        marginBottom: "10px"
                      }} />

                      {/* Digitally Signed Badge */}
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <ShieldCheck size={12} strokeWidth={2.5} color="#ea580c" />
                        <span style={{ fontSize: "7.5px", fontWeight: "800", color: "#ea580c", textTransform: "uppercase", letterSpacing: "0.8px", fontFamily: "var(--font-montserrat)" }}>
                          DIGITALLY SIGNED
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
    </>
  );
}

export default function ReceiptBuilderPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#070a12", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading Payment Receipt Studio...</div>}>
      <ReceiptBuilderContent />
    </Suspense>
  );
}
