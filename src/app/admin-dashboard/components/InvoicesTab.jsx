"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Plus, Search, Download, Trash2, Edit3, Eye, X, Copy, Check, ExternalLink, FileText, AlertCircle, RefreshCw
} from "lucide-react";
import { db } from "../../../firebase/firebaseConfig";
import {
  collection, query, orderBy, onSnapshot, doc, deleteDoc
} from "firebase/firestore";
import Link from "next/link";

const INVOICE_STATUS_CONFIG = {
  draft:     { label: "Draft",     color: "#a3a3a3", bg: "rgba(163,163,163,0.12)", border: "rgba(163,163,163,0.25)" },
  sent:      { label: "Sent",      color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.25)" },
  paid:      { label: "Paid",      color: "#22c55e", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.25)" },
  overdue:   { label: "Overdue",   color: "#ef4444", bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.25)" },
  cancelled: { label: "Cancelled", color: "#71717a", bg: "rgba(113,113,122,0.10)", border: "rgba(113,113,122,0.2)" },
};

const CONTRACT_STATUS_CONFIG = {
  draft:              { label: "Draft",              color: "#a3a3a3", bg: "rgba(163,163,163,0.12)", border: "rgba(163,163,163,0.2)" },
  awaiting_signature: { label: "Awaiting Signature", color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.2)" },
  viewed:             { label: "Viewed",             color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.2)" },
  signed:             { label: "Signed",             color: "#10b981", bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.2)" },
  completed:          { label: "Completed",          color: "#10b981", bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.2)" },
  void:               { label: "Void",               color: "#ef4444", bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.2)" },
};

const fmtDate = (d) => {
  if (!d) return "—";
  const date = d.toDate ? d.toDate() : new Date(d);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const fmtCurrency = (amount, currency = "USD") => {
  const symbols = { USD: "$", GBP: "£", EUR: "€", PKR: "Rs", AED: "AED ", CAD: "C$", AUD: "A$" };
  const sym = symbols[currency] || "$";
  return `${sym}${Number(amount || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatRetainerValue = (val) => {
  if (!val) return "—";
  const clean = String(val).trim().replace(/[\$,]/g, "");
  const num = Number(clean);
  return (!isNaN(num) && clean !== "") ? `$${num.toLocaleString()}` : val;
};

export default function InvoicesTab() {
  const [activeSegment, setActiveSegment] = useState("invoices"); // "invoices" | "contracts"
  const [invoices, setInvoices] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [invoiceFilter, setInvoiceFilter] = useState("all"); // "all", "draft", "sent", "paid", "overdue", "cancelled"
  const [contractFilter, setContractFilter] = useState("all"); // "all", "draft", "awaiting_signature", "viewed", "signed", "void"
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    // 1. Listen to Invoices
    const qInvoices = query(collection(db, "invoices"), orderBy("createdAt", "desc"));
    const unsubInvoices = onSnapshot(qInvoices, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInvoices(data);
      setLoading(false);
    }, (err) => {
      console.error("Error loading invoices:", err);
      setLoading(false);
    });

    // 2. Listen to Contracts
    const qContracts = query(collection(db, "contracts"), orderBy("createdAt", "desc"));
    const unsubContracts = onSnapshot(qContracts, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContracts(data);
    }, (err) => {
      console.error("Error loading contracts:", err);
    });

    return () => {
      unsubInvoices();
      unsubContracts();
    };
  }, []);

  // Filtered Invoices
  const filteredInvoices = useMemo(() => {
    let res = invoices;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      res = res.filter(inv =>
        inv.invoiceNumber?.toLowerCase().includes(q) ||
        inv.clientName?.toLowerCase().includes(q) ||
        inv.companyName?.toLowerCase().includes(q)
      );
    }
    if (invoiceFilter !== "all") {
      res = res.filter(inv => inv.status === invoiceFilter);
    }
    return res;
  }, [invoices, searchQuery, invoiceFilter]);

  // Filtered Contracts
  const filteredContracts = useMemo(() => {
    let res = contracts;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      res = res.filter(c =>
        c.contractNumber?.toLowerCase().includes(q) ||
        c.clientName?.toLowerCase().includes(q) ||
        c.companyName?.toLowerCase().includes(q)
      );
    }
    if (contractFilter !== "all") {
      res = res.filter(c => c.status === contractFilter);
    }
    return res;
  }, [contracts, searchQuery, contractFilter]);

  // Delete handlers
  const handleDeleteInvoice = async (id, num) => {
    if (!window.confirm(`Are you sure you want to permanently delete invoice ${num}?`)) return;
    try {
      await deleteDoc(doc(db, "invoices", id));
      alert("Invoice deleted successfully!");
    } catch (e) {
      alert("Failed to delete invoice: " + e.message);
    }
  };

  const handleDeleteContract = async (id, num) => {
    if (!window.confirm(`Are you sure you want to permanently delete contract ${num}?`)) return;
    try {
      await deleteDoc(doc(db, "contracts", id));
      alert("Contract deleted successfully!");
    } catch (e) {
      alert("Failed to delete contract: " + e.message);
    }
  };

  // Copy helper
  const handleCopyLink = (contractId) => {
    const link = `${window.location.origin}/contract/${contractId}/`;
    navigator.clipboard.writeText(link).then(() => {
      setCopiedId(contractId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const getInvoiceTotal = (inv) => {
    const items = inv.items || [];
    const subtotal = items.reduce((acc, it) => acc + (Number(it.price) || 0) * (Number(it.quantity) || 1), 0);
    const discountAmount = Number(inv.discount) || 0;
    const taxAmount = (subtotal - discountAmount) * ((Number(inv.taxRate) || 0) / 100);
    return subtotal - discountAmount + taxAmount;
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300, color: "#94a3b8" }}>
        <RefreshCw size={24} className="animate-spin" style={{ marginRight: 8 }} /> Loading billing workspace...
      </div>
    );
  }

  return (
    <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header & Search */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#ea580c", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 6 }}>GROW ORBIT · BILLING HUB</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, color: "#fff" }}>
            {activeSegment === "invoices" ? "Invoices Manager" : "Contracts Manager"}
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Search bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "8px 14px" }}>
            <Search size={13} color="#525252" />
            <input
              type="text"
              placeholder={activeSegment === "invoices" ? "Search invoices…" : "Search contracts…"}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ background: "none", border: "none", color: "#fff", fontSize: 12, fontWeight: 500, width: 220, outline: "none" }}
            />
          </div>

          {/* Quick Create buttons */}
          {activeSegment === "invoices" ? (
            <Link href="/admin-dashboard/invoice-builder" style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#ea580c", color: "#fff", border: "none", borderRadius: 12, padding: "10px 16px", fontSize: 11, fontWeight: 800, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                <Plus size={14} /> New Invoice
              </div>
            </Link>
          ) : (
            <Link href="/admin-dashboard/contract-builder" style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#3b82f6", color: "#fff", border: "none", borderRadius: 12, padding: "10px 16px", fontSize: 11, fontWeight: 800, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                <Plus size={14} /> New Contract
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Segment Selector Toggle */}
      <div style={{ display: "flex", gap: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 3, width: "fit-content" }}>
        <button
          onClick={() => { setActiveSegment("invoices"); setSearchQuery(""); }}
          style={{ padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em",
            background: activeSegment === "invoices" ? "#ea580c" : "transparent",
            color: activeSegment === "invoices" ? "#fff" : "#71717a",
            transition: "all 0.2s"
          }}
        >
          Invoices ({invoices.length})
        </button>
        <button
          onClick={() => { setActiveSegment("contracts"); setSearchQuery(""); }}
          style={{ padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em",
            background: activeSegment === "contracts" ? "#3b82f6" : "transparent",
            color: activeSegment === "contracts" ? "#fff" : "#71717a",
            transition: "all 0.2s"
          }}
        >
          Contracts ({contracts.length})
        </button>
      </div>

      {/* Invoice Segment View */}
      {activeSegment === "invoices" ? (
        <>
          {/* Status Filters */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: 12 }}>
            {["all", "draft", "sent", "paid", "overdue", "cancelled"].map((st) => {
              const count = st === "all" ? invoices.length : invoices.filter(i => i.status === st).length;
              const cfg = INVOICE_STATUS_CONFIG[st] || { label: "All", color: "#94a3b8" };
              const isSelected = invoiceFilter === st;

              return (
                <button
                  key={st}
                  onClick={() => setInvoiceFilter(st)}
                  style={{
                    padding: "6px 12px", borderRadius: 10, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", border: "1px solid", cursor: "pointer",
                    background: isSelected ? (st === "all" ? "rgba(255,255,255,0.08)" : cfg.bg) : "transparent",
                    color: isSelected ? cfg.color : "#525252",
                    borderColor: isSelected ? cfg.color : "rgba(255,255,255,0.04)",
                    transition: "all 0.15s"
                  }}
                >
                  {cfg.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Invoices List Table */}
          {filteredInvoices.length === 0 ? (
            <div style={{ padding: "40px 20px", textAlign: "center", border: "1px dashed rgba(255,255,255,0.06)", borderRadius: 16 }}>
              <FileText size={32} color="#525252" style={{ margin: "0 auto 12px auto" }} />
              <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 4 }}>No invoices found</div>
              <div style={{ fontSize: 11, color: "#525252" }}>Try creating a new invoice or relaxing filters.</div>
            </div>
          ) : (
            <div style={{ overflowX: "auto", background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textPosition: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}>
                    <th style={{ padding: "14px 16px", fontSize: 10, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.08em", width: 140 }}>Invoice #</th>
                    <th style={{ padding: "14px 16px", fontSize: 10, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.08em" }}>Client / Company</th>
                    <th style={{ padding: "14px 16px", fontSize: 10, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.08em", width: 120 }}>Issue Date</th>
                    <th style={{ padding: "14px 16px", fontSize: 10, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.08em", width: 120 }}>Due Date</th>
                    <th style={{ padding: "14px 16px", fontSize: 10, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.08em", width: 140, textAlign: "right" }}>Total Amount</th>
                    <th style={{ padding: "14px 16px", fontSize: 10, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.08em", width: 130, textAlign: "center" }}>Status</th>
                    <th style={{ padding: "14px 16px", fontSize: 10, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.08em", width: 140, textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((inv) => {
                    const statusCfg = INVOICE_STATUS_CONFIG[inv.status] || INVOICE_STATUS_CONFIG.draft;
                    const total = getInvoiceTotal(inv);

                    return (
                      <tr key={inv.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", transition: "background 0.2s" }} className="table-row-hover">
                        <td style={{ padding: "16px", fontSize: 11, fontWeight: 800, color: "#ea580c" }}>{inv.invoiceNumber}</td>
                        <td style={{ padding: "16px" }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{inv.clientName || "—"}</div>
                          <div style={{ fontSize: 10, color: "#525252", marginTop: 2 }}>{inv.companyName || inv.clientEmail}</div>
                        </td>
                        <td style={{ padding: "16px", fontSize: 11, color: "#e4e4e7" }}>{fmtDate(inv.issueDate)}</td>
                        <td style={{ padding: "16px", fontSize: 11, color: "#e4e4e7" }}>{fmtDate(inv.dueDate)}</td>
                        <td style={{ padding: "16px", fontSize: 12, fontWeight: 800, color: "#fff", textAlign: "right" }}>{fmtCurrency(total, inv.currency)}</td>
                        <td style={{ padding: "16px", textAlign: "center" }}>
                          <span style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", padding: "4px 10px", borderRadius: 100, border: `1px solid ${statusCfg.color}`, color: statusCfg.color, background: statusCfg.bg }}>
                            {statusCfg.label}
                          </span>
                        </td>
                        <td style={{ padding: "16px", textAlign: "right" }}>
                          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", alignItems: "center" }}>
                            {/* Download PDF button */}
                            <a
                              href={`/api/invoices/${inv.id}/pdf`}
                              download
                              title="Download Invoice PDF"
                              style={{ display: "flex", alignItems: "center", justifyPosition: "center", width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", color: "#c0c0c0", cursor: "pointer", transition: "all 0.2s" }}
                            >
                              <Download size={12} style={{ margin: "auto" }} />
                            </a>

                            {/* Edit Button */}
                            <Link href={`/admin-dashboard/invoice-builder?id=${inv.id}`} title="Edit Invoice">
                              <div style={{ display: "flex", alignItems: "center", justifyPosition: "center", width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", color: "#a3a3a3", cursor: "pointer", transition: "all 0.2s" }}>
                                <Edit3 size={12} style={{ margin: "auto" }} />
                              </div>
                            </Link>

                            {/* Delete button */}
                            <button
                              onClick={() => handleDeleteInvoice(inv.id, inv.invoiceNumber)}
                              title="Delete Invoice"
                              style={{ display: "flex", alignItems: "center", justifyPosition: "center", width: 28, height: 28, borderRadius: 8, background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.1)", color: "#ef4444", cursor: "pointer", transition: "all 0.2s" }}
                            >
                              <Trash2 size={12} style={{ margin: "auto" }} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Contracts Segment View */}
          {/* Status Filters */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: 12 }}>
            {["all", "draft", "awaiting_signature", "viewed", "signed", "void"].map((st) => {
              const count = st === "all" ? contracts.length : contracts.filter(c => c.status === st).length;
              const cfg = CONTRACT_STATUS_CONFIG[st] || { label: "All", color: "#94a3b8" };
              const isSelected = contractFilter === st;

              return (
                <button
                  key={st}
                  onClick={() => setContractFilter(st)}
                  style={{
                    padding: "6px 12px", borderRadius: 10, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", border: "1px solid", cursor: "pointer",
                    background: isSelected ? (st === "all" ? "rgba(255,255,255,0.08)" : cfg.bg) : "transparent",
                    color: isSelected ? cfg.color : "#525252",
                    borderColor: isSelected ? cfg.color : "rgba(255,255,255,0.04)",
                    transition: "all 0.15s"
                  }}
                >
                  {cfg.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Contracts List Table */}
          {filteredContracts.length === 0 ? (
            <div style={{ padding: "40px 20px", textAlign: "center", border: "1px dashed rgba(255,255,255,0.06)", borderRadius: 16 }}>
              <AlertCircle size={32} color="#525252" style={{ margin: "0 auto 12px auto" }} />
              <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 4 }}>No contracts found</div>
              <div style={{ fontSize: 11, color: "#525252" }}>Try creating a new contract or relaxing filters.</div>
            </div>
          ) : (
            <div style={{ overflowX: "auto", background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textPosition: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}>
                    <th style={{ padding: "14px 16px", fontSize: 10, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.08em", width: 180 }}>Contract ID</th>
                    <th style={{ padding: "14px 16px", fontSize: 10, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.08em" }}>Client / Company</th>
                    <th style={{ padding: "14px 16px", fontSize: 10, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.08em", width: 140 }}>Service Scope</th>
                    <th style={{ padding: "14px 16px", fontSize: 10, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.08em", width: 130 }}>Monthly Retainer</th>
                    <th style={{ padding: "14px 16px", fontSize: 10, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.08em", width: 120 }}>Date Created</th>
                    <th style={{ padding: "14px 16px", fontSize: 10, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.08em", width: 140, textAlign: "center" }}>Status</th>
                    <th style={{ padding: "14px 16px", fontSize: 10, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.08em", width: 160, textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContracts.map((c) => {
                    const statusCfg = CONTRACT_STATUS_CONFIG[c.status] || CONTRACT_STATUS_CONFIG.draft;
                    const retainer = c.monthlyRetainer || "—";

                    return (
                      <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", transition: "background 0.2s" }} className="table-row-hover">
                        <td style={{ padding: "16px", fontSize: 11, fontWeight: 800, color: "#3b82f6" }}>{c.contractNumber}</td>
                        <td style={{ padding: "16px" }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{c.clientName || "—"}</div>
                          <div style={{ fontSize: 10, color: "#525252", marginTop: 2 }}>{c.companyName || c.clientEmail}</div>
                        </td>
                        <td style={{ padding: "16px", fontSize: 11, color: "#e4e4e7" }}>{c.requestedService || "Custom Service"}</td>
                        <td style={{ padding: "16px", fontSize: 11, fontWeight: 700, color: "#fff" }}>
                          {formatRetainerValue(c.monthlyRetainer)}
                        </td>
                        <td style={{ padding: "16px", fontSize: 11, color: "#e4e4e7" }}>{fmtDate(c.createdAt)}</td>
                        <td style={{ padding: "16px", textAlign: "center" }}>
                          <span style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", padding: "4px 10px", borderRadius: 100, border: `1px solid ${statusCfg.color}`, color: statusCfg.color, background: statusCfg.bg, whiteSpace: "nowrap" }}>
                            {statusCfg.label}
                          </span>
                        </td>
                        <td style={{ padding: "16px", textAlign: "right" }}>
                          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", alignItems: "center" }}>
                            {/* Copy Public Link */}
                            <button
                              onClick={() => handleCopyLink(c.id)}
                              title="Copy Public Contract Link"
                              style={{ display: "flex", alignItems: "center", justifyPosition: "center", width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", color: copiedId === c.id ? "#22c55e" : "#c0c0c0", cursor: "pointer", transition: "all 0.2s" }}
                            >
                              {copiedId === c.id ? <Check size={12} style={{ margin: "auto" }} /> : <Copy size={12} style={{ margin: "auto" }} />}
                            </button>

                            {/* View Public Page */}
                            <a
                              href={`/contract/${c.id}/`}
                              target="_blank"
                              rel="noreferrer"
                              title="View Public Page"
                              style={{ display: "flex", alignItems: "center", justifyPosition: "center", width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", color: "#c0c0c0", cursor: "pointer" }}
                            >
                              <ExternalLink size={12} style={{ margin: "auto" }} />
                            </a>

                            {/* Download PDF */}
                            <a
                              href={`/api/contracts/${c.id}/pdf`}
                              download
                              title="Download PDF"
                              style={{ display: "flex", alignItems: "center", justifyPosition: "center", width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", color: "#c0c0c0", cursor: "pointer" }}
                            >
                              <Download size={12} style={{ margin: "auto" }} />
                            </a>

                            {/* Edit */}
                            <Link href={`/admin-dashboard/contract-builder?id=${c.id}`} title="Edit Contract">
                              <div style={{ display: "flex", alignItems: "center", justifyPosition: "center", width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", color: "#a3a3a3", cursor: "pointer" }}>
                                <Edit3 size={12} style={{ margin: "auto" }} />
                              </div>
                            </Link>

                            {/* Delete */}
                            <button
                              onClick={() => handleDeleteContract(c.id, c.contractNumber)}
                              title="Delete Contract"
                              style={{ display: "flex", alignItems: "center", justifyPosition: "center", width: 28, height: 28, borderRadius: 8, background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.1)", color: "#ef4444", cursor: "pointer" }}
                            >
                              <Trash2 size={12} style={{ margin: "auto" }} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
