"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { 
  LayoutGrid, List, KanbanSquare, Download, Search, Calendar, ChevronRight, 
  Phone, Mail, Trash2, History, AlertCircle, X, RotateCcw, Inbox, HelpCircle,
  Copy, Check
} from "lucide-react";

import KanbanBoard from "./KanbanBoard";
import CrmDocumentationModal from "./CrmDocumentationModal";
import { calculateLeadScore, getScoreCategory, calculateLeadPriority } from "@/lib/crmHelpers";
import { db, auth } from "../../../firebase/firebaseConfig";
import { collection, query, where, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

/* ─────────────────────────────────────────
   CONFIGS & HELPERS
───────────────────────────────────────── */
const STATUS_CONFIG = {
  new:           { label: "New",            color: "#f97316", bg: "rgba(249,115,22,0.12)",  border: "rgba(249,115,22,0.25)" },
  contacted:     { label: "Contacted",      color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.25)" },
  qualified:     { label: "Qualified",      color: "#10b981", bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.25)" },
  hot:           { label: "Hot (Booked) 🔥", color: "#ef4444", bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.25)"  },
  proposal_sent: { label: "Proposal Sent",  color: "#a855f7", bg: "rgba(168,85,247,0.12)",  border: "rgba(168,85,247,0.25)" },
  won:           { label: "Won 🎉",          color: "#22c55e", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.25)"  },
  lost:          { label: "Lost ❌",         color: "#ef4444", bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.2)"   },
  cold:          { label: "Cold (New) ❄️",    color: "#22d3ee", bg: "rgba(34,211,238,0.10)",  border: "rgba(34,211,238,0.25)" },
  // Fallbacks
  replied:       { label: "Replied",        color: "#22d3ee", bg: "rgba(34,211,238,0.10)",  border: "rgba(34,211,238,0.25)" },
  archived:      { label: "Archived",       color: "#71717a", bg: "rgba(113,113,122,0.10)", border: "rgba(113,113,122,0.2)"  },
};

const PRIORITY_CONFIG = {
  high:   { label: "High Priority", color: "#ef4444", bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.25)" },
  medium: { label: "Medium",        color: "#f97316", bg: "rgba(249,115,22,0.12)",  border: "rgba(249,115,22,0.25)" },
  low:    { label: "Low",           color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.25)" },
};

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

const fmt = d => d?.toDate ? d.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
const fmtTime = d => d?.toDate ? d.toDate().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : "";

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.new;
  return (
    <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
      style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`, whiteSpace: "nowrap" }}>
      {cfg.label}
    </span>
  );
}

/* ─────────────────────────────────────────
   LEAD EXPANDED DETAIL PANEL
───────────────────────────────────────── */
function LeadDetailPanel({
  lead,
  users,
  currentAdmin,
  crmNote,
  setCrmNote,
  handleAssignLead,
  handleUpdatePriority,
  handleAddLeadNote,
  handleDeleteLeadNote,
  handleUpdateFollowUp,
  leadsCollectionName,
  handleStatusChange,
  handleDeleteLead,
  logActivity
}) {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [addingTask, setAddingTask] = useState(false);
  const [convertingClient, setConvertingClient] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, field) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 1500);
  };

  const [estValue, setEstValue] = useState(lead.estimatedDealValue || "");
  const [retainer, setRetainer] = useState(lead.monthlyRetainer || "");
  const [winProb, setWinProb] = useState(lead.winProbability || "");

  // Contract states
  const [contracts, setContracts] = useState([]);
  const [loadingContracts, setLoadingContracts] = useState(false);

  const fetchContracts = async () => {
    if (!lead.id) return;
    setLoadingContracts(true);
    try {
      const res = await fetch(`/api/contracts?leadId=${lead.id}`);
      const data = await res.json();
      if (data.success) {
        setContracts(data.contracts);
      }
    } catch (err) {
      console.warn("Failed to load lead contracts:", err);
    } finally {
      setLoadingContracts(false);
    }
  };

  useEffect(() => {
    setContracts([]);
    fetchContracts();
  }, [lead.id]);

  const handleGenerateNewContract = () => {
    if (!lead.id) return;
    router.push(`/admin-dashboard/contract-builder?leadId=${lead.id}`);
  };

  const handleDeleteContract = async (contractId, contractNum) => {
    if (!window.confirm(`Are you sure you want to permanently delete contract ${contractNum}?`)) return;
    try {
      const res = await fetch(`/api/contracts/${contractId}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        alert("Contract deleted successfully!");
        fetchContracts();
      } else {
        alert("Failed to delete contract: " + data.error);
      }
    } catch (err) {
      alert("Error deleting contract: " + err.message);
    }
  };



  useEffect(() => {
    setEstValue(lead.estimatedDealValue || "");
    setRetainer(lead.monthlyRetainer || "");
    setWinProb(lead.winProbability || "");
  }, [lead.id, lead.estimatedDealValue, lead.monthlyRetainer, lead.winProbability]);

  useEffect(() => {
    if (!lead.id) {
      setTasks([]);
      return;
    }
    const q = query(
      collection(db, "tasks"), 
      where("leadId", "==", lead.id),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => {
      console.warn("Failed to listen to tasks:", err);
    });
    return () => unsub();
  }, [lead.id]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !lead.id) return;
    setAddingTask(true);
    try {
      await addDoc(collection(db, "tasks"), {
        leadId: lead.id,
        title: newTaskTitle.trim(),
        status: "pending",
        assignedTo: currentAdmin?.id || currentAdmin?.uid || "unassigned",
        dueDate: newTaskDueDate || null,
        createdAt: serverTimestamp()
      });
      setNewTaskTitle("");
      setNewTaskDueDate("");
    } catch (err) {
      console.warn("Failed to add task:", err);
    } finally {
      setAddingTask(false);
    }
  };

  const handleToggleTask = async (taskId, currentStatus) => {
    try {
      const newStatus = currentStatus === "pending" ? "completed" : "pending";
      await updateDoc(doc(db, "tasks", taskId), {
        status: newStatus,
        completedAt: newStatus === "completed" ? serverTimestamp() : null
      });
    } catch (err) {
      console.warn("Failed to toggle task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
    } catch (err) {
      console.warn("Failed to delete task:", err);
    }
  };

  const handleConvertClient = async () => {
    if (convertingClient) return;
    setConvertingClient(true);
    try {
      const clientData = {
        leadId: lead.id,
        name: lead.fullName || "N/A",
        email: lead.email || "",
        phone: lead.whatsapp || "N/A",
        servicesPurchased: lead.requestedService || "Not specified",
        accountManager: lead.assignedName || "Unassigned",
        monthlyRetainer: Number(lead.monthlyRetainer) || 0,
        startDate: serverTimestamp(),
        notes: lead.notes || ""
      };
      await addDoc(collection(db, "clients"), clientData);
      await updateDoc(doc(db, leadsCollectionName || "leads", lead.id), { convertedToClient: true });
      if (logActivity) {
        logActivity("CONVERT_CLIENT", `Converted lead "${lead.fullName}" to active client.`);
      }
    } catch (err) {
      console.error("Conversion failed:", err);
      alert("Failed to convert lead to client: " + err.message);
    } finally {
      setConvertingClient(false);
    }
  };

  const status = lead.status || "new";

  return (
    <div className="lead-expanded" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "20px" }}>
      {/* CRM Controls Bar */}
      <div className="lead-crm-bar" style={{ display: "flex", gap: 12, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.02)", marginBottom: 16 }}>
        {/* Assignee Select */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>Assign Owner</div>
          <select
            value={lead.assignedTo || ""}
            onChange={(e) => {
              const admin = users.find(u => u.uid === e.target.value || u.id === e.target.value);
              handleAssignLead(lead.id, e.target.value, admin?.fullName || admin?.displayName || "Admin");
            }}
            style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "8px 12px", color: "#fff", fontSize: 11, fontWeight: 600, outline: "none" }}
          >
            <option value="">Unassigned</option>
            {users.filter(u => u.role === "admin").map(u => (
              <option key={u.id || u.uid} value={u.id || u.uid}>{u.fullName || u.displayName || u.email}</option>
            ))}
          </select>
        </div>
        {/* Priority Select */}
        <div style={{ width: 140 }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>Priority Level</div>
          <div style={{ display: "flex", background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 3, border: "1px solid rgba(255,255,255,0.06)" }}>
            {["low", "medium", "high"].map(p => (
              <button key={p} onClick={() => handleUpdatePriority(lead.id, p)}
                style={{ flex: 1, padding: "6px 0", borderRadius: 8, border: "none", fontSize: 8, fontWeight: 900, textTransform: "uppercase", cursor: "pointer",
                  background: lead.priority === p ? PRIORITY_CONFIG[p].color : "transparent",
                  color: lead.priority === p ? "#fff" : "#525252",
                  transition: "all 0.2s"
                }}
              >
                {p[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="lead-expanded-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24 }}>
        {/* Left Side: Brief & Activity */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Inbound Brief */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 14, padding: "16px 20px" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 8 }}>Inbound Brief</div>
            <p style={{ fontSize: 12, color: "#e2e8f0", lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>
              "{lead.notes || lead.challenge || "No brief provided."}"
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: 8, letterSpacing: "0.05em" }}>
              <History size={14} color="#f97316" /> ACTIVITY TIMELINE
            </div>

            {/* Add Note Box */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 14, padding: 14 }}>
              <textarea
                placeholder="Log a call, email update, or internal note..."
                value={crmNote}
                onChange={(e) => setCrmNote(e.target.value)}
                style={{ width: "100%", background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 10, color: "#fff", fontSize: 12, resize: "none", height: 70, outline: "none", boxSizing: "border-box", marginBottom: 10 }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={async () => {
                    const res = await handleAddLeadNote(lead.id, crmNote);
                    if (res === "done") setCrmNote("");
                  }}
                  style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 8, fontSize: 10, fontWeight: 800, textTransform: "uppercase", cursor: "pointer", boxShadow: "0 4px 12px rgba(249,115,22,0.2)" }}
                >
                  Add Update
                </button>
              </div>
            </div>

            {/* Timeline Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 380, overflowY: "auto", paddingRight: 8 }}>
              {(lead.timeline || []).length === 0 ? (
                <div style={{ padding: "30px 0", textAlign: "center", border: "1px dashed rgba(255,255,255,0.05)", borderRadius: 14 }}>
                  <div style={{ fontSize: 10, color: "#525252", fontWeight: 700, letterSpacing: "0.05em" }}>NO UPDATES LOGGED YET</div>
                </div>
              ) : (
                lead.timeline.map((item, idx) => (
                  <div key={idx} style={{ position: "relative", paddingLeft: 20, borderLeft: "2px solid rgba(249,115,22,0.25)" }}>
                    <div style={{ position: "absolute", left: -5, top: 12, width: 8, height: 8, borderRadius: "50%", background: "#f97316", boxShadow: "0 0 8px #f97316" }} />
                    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: "#f1f5f9" }}>{item.adminName}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 9, color: "#71717a", fontFamily: "monospace" }}>{fmt(item.timestamp)} {fmtTime(item.timestamp)}</span>
                          <button
                            onClick={() => handleDeleteLeadNote?.(lead.id, item.timestamp)}
                            style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", opacity: 0.6, display: "flex", alignItems: "center", padding: 0 }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = 0.6}
                            title="Delete note"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </div>
                      <div style={{ fontSize: 12, color: "#cbd5e1", lineHeight: 1.6 }}>
                        {item.text}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Quick Connect, Follow Up & Contracts */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 8 }}>Quick Connect</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {lead.whatsapp && lead.whatsapp !== "N/A" && (
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <a href={`https://wa.me/${lead.whatsapp.replace(/\D/g,"")}`} target="_blank" rel="noreferrer"
                    style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "10px", borderRadius: 10, background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.1)", color: "#4ade80", fontSize: 11, fontWeight: 700, textDecoration: "none" }}>
                    <Phone size={12} /> {lead.whatsapp}
                  </a>
                  <button onClick={() => handleCopy(lead.whatsapp, 'phone')}
                    title="Copy Phone Number"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", color: "#a3a3a3", cursor: "pointer", outline: "none", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#a3a3a3'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>
                    {copiedField === 'phone' ? <Check size={12} style={{ color: '#4ade80' }} /> : <Copy size={12} />}
                  </button>
                </div>
              )}
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <a href={`mailto:${lead.email}`}
                  style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "10px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", color: "#fff", fontSize: 11, fontWeight: 700, textDecoration: "none" }}>
                    <Mail size={12} /> {lead.email}
                </a>
                <button onClick={() => handleCopy(lead.email, 'email')}
                  title="Copy Email Address"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", color: "#a3a3a3", cursor: "pointer", outline: "none", transition: "all 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#a3a3a3'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>
                  {copiedField === 'email' ? <Check size={12} style={{ color: '#4ade80' }} /> : <Copy size={12} />}
                </button>
              </div>
            </div>
          </div>

          {/* Next Follow Up */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 8 }}>Next Follow Up</div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input 
                type="date"
                value={lead.nextFollowUp || ""}
                onChange={(e) => handleUpdateFollowUp(lead.id, e.target.value)}
                style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 10px", color: "#fff", fontSize: 11, outline: "none", cursor: "pointer", colorScheme: "dark" }}
              />
              {lead.nextFollowUp && new Date(lead.nextFollowUp) < new Date(new Date().setHours(0,0,0,0)) && status !== "won" && status !== "lost" && (
                <span style={{ fontSize: 9, fontWeight: 800, color: "#ef4444", background: "rgba(239,68,68,0.1)", padding: "4px 8px", borderRadius: 6, textTransform: "uppercase" }}>
                  Overdue
               </span>
              )}
            </div>
          </div>



          {/* Contract Summary Card Widget */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Digital Contracts</span>
              {loadingContracts && <Loader size={10} className="animate-spin text-zinc-500" />}
            </div>
            
            {contracts.length === 0 ? (
              <div>
                <div style={{ fontSize: 10, color: "#525252", fontStyle: "italic", marginBottom: 8 }}>No contracts drafted yet.</div>
                <button
                  type="button"
                  onClick={handleGenerateNewContract}
                  style={{ width: "100%", background: "#f97316", color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 10, fontWeight: 800, cursor: "pointer", textTransform: "uppercase" }}
                >
                  Generate Contract
                </button>
              </div>
            ) : (
              <div>
                {contracts.map(contract => {
                  const statusCfg = CONTRACT_STATUS_CONFIG[contract.status] || CONTRACT_STATUS_CONFIG.draft;
                  const expiresStr = contract.expiresAt 
                    ? new Date(contract.expiresAt.toDate ? contract.expiresAt.toDate() : contract.expiresAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                    : "Never";

                  return (
                    <div key={contract.id} style={{ display: "flex", flexDirection: "column", gap: 8, background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 8, padding: "10px", marginBottom: 6 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: "#fff" }}>{contract.contractNumber}</span>
                        <span style={{ fontSize: 8, fontWeight: 900, textTransform: "uppercase", color: statusCfg.color, background: statusCfg.bg, border: `1px solid ${statusCfg.border}`, padding: "2px 6px", borderRadius: 4 }}>
                          {statusCfg.label}
                        </span>
                      </div>
                      
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: 9, color: "#737373" }}>
                        <div>Created: <span style={{ color: "#fff", fontWeight: 600 }}>{fmt(contract.createdAt)}</span></div>
                        <div>Expires: <span style={{ color: "#fff", fontWeight: 600 }}>{expiresStr}</span></div>
                        <div>Viewed: <span style={{ color: "#fff", fontWeight: 600 }}>{contract.analytics?.viewsCount > 0 ? "Yes" : "No"}</span></div>
                        <div>Signed: <span style={{ color: "#fff", fontWeight: 600 }}>{contract.status === "signed" ? "Yes" : "No"}</span></div>
                      </div>

                      <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                        <button
                          type="button"
                          onClick={() => {
                            if (["draft", "awaiting_review"].includes(contract.status)) {
                              router.push(`/admin-dashboard/contract-builder?id=${contract.id}`);
                            } else {
                              router.push(`/contract/${contract.id}`);
                            }
                          }}
                          style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", borderRadius: 6, padding: "5px 10px", fontSize: 9, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                        >
                          {["draft", "awaiting_review"].includes(contract.status) ? "Manage Agreement" : "View Agreement"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteContract(contract.id, contract.contractNumber)}
                          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#ef4444", borderRadius: 6, padding: "5px 8px", fontSize: 9, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                          title="Delete Contract"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
                
                <button
                  type="button"
                  onClick={handleGenerateNewContract}
                  style={{ width: "100%", background: "none", border: "1.5px dashed rgba(255,255,255,0.1)", color: "#a3a3a3", borderRadius: 8, padding: "6px 12px", fontSize: 9, fontWeight: 800, cursor: "pointer", transition: "all 0.2s", marginTop: 4 }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#f97316'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#a3a3a3'; }}
                >
                  + Create New Version/Draft
                </button>
              </div>
            )}
          </div>

          {/* Tasks Checklist Widget */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 8 }}>Actionable Tasks</div>
            
            <form onSubmit={handleAddTask} style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
              <div style={{ display: "flex", gap: 6 }}>
                <input 
                  type="text"
                  placeholder="Add new task..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  style={{ flex: 1, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 10px", color: "#fff", fontSize: 11, outline: "none" }}
                />
                <button 
                  type="submit"
                  disabled={addingTask || !newTaskTitle.trim()}
                  style={{ background: "#f97316", color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 10, fontWeight: 800, cursor: "pointer", textTransform: "uppercase" }}
                >
                  {addingTask ? "..." : "Add"}
                </button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.05em" }}>Due Date:</span>
                <input 
                  type="date"
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
                  style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "4px 8px", color: "#fff", fontSize: 10, outline: "none", cursor: "pointer", colorScheme: "dark" }}
                />
              </div>
            </form>

            <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 150, overflowY: "auto" }}>
              {tasks.length === 0 ? (
                <div style={{ fontSize: 10, color: "#525252", fontStyle: "italic", padding: "6px 0" }}>No tasks added.</div>
              ) : (
                tasks.map(t => (
                  <div key={t.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 8, padding: "6px 8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                      <div 
                        onClick={() => handleToggleTask(t.id, t.status)}
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: 3,
                          border: `1.5px solid ${t.status === "completed" ? "#f97316" : "rgba(255,255,255,0.25)"}`,
                          background: t.status === "completed" ? "#f97316" : "rgba(255,255,255,0.02)",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          flexShrink: 0
                        }}
                      >
                        {t.status === "completed" && (
                          <svg width="8" height="6" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 4L4 6.5L8.5 1.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span style={{ fontSize: 11, color: t.status === "completed" ? "#525252" : "#fff", textDecoration: t.status === "completed" ? "line-through" : "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {t.title}
                      </span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => handleDeleteTask(t.id)}
                      style={{ background: "none", border: "none", color: "#525252", cursor: "pointer", fontSize: 10, padding: 0 }}
                      onMouseEnter={e => e.currentTarget.style.color = "#ef4444"}
                      onMouseLeave={e => e.currentTarget.style.color = "#525252"}
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Client Conversion Widget */}
          {status === "won" && (
            <div style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 8 }}>Client Lifecycle</div>
              {lead.convertedToClient ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#22c55e", fontSize: 11, fontWeight: 800 }}>
                  🎉 Converted to Active Client
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleConvertClient}
                  disabled={convertingClient}
                  style={{ width: "100%", background: "#22c55e", color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 11, fontWeight: 900, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center", display: "block" }}
                >
                  {convertingClient ? "Converting..." : "Convert to Active Client"}
                </button>
              )}
            </div>
          )}

          {/* Pipeline Status */}
          <div style={{ marginTop: "10px" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 8 }}>Move Stage</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["new", "contacted", "qualified", "hot", "proposal_sent", "won", "lost"].map(s => (
                <button key={s} onClick={() => handleStatusChange(lead.id, s)}
                  style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid", cursor: "pointer", fontSize: 9, fontWeight: 700, textTransform: "uppercase", transition: "all 0.15s",
                    background: status === s ? STATUS_CONFIG[s].bg : "transparent",
                    color: status === s ? STATUS_CONFIG[s].color : "#525252",
                    borderColor: status === s ? STATUS_CONFIG[s].border : "rgba(255,255,255,0.06)",
                  }}
                >{s}</button>
              ))}
              <button onClick={() => handleDeleteLead(lead.id)}
                style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={14} /></button>
            </div>
          </div>
        </div>
      </div>
      {/* Contract Workspace Modal removed: migrated to full-page route */}
    </div>
  );
}

/* ─────────────────────────────────────────
   LEAD PIPELINE CALENDAR VIEW
───────────────────────────────────────── */
function LeadCalendarView({
  leads,
  users,
  currentAdmin,
  crmNote,
  setCrmNote,
  handleAssignLead,
  handleUpdatePriority,
  handleAddLeadNote,
  handleUpdateFollowUp,
  leadsCollectionName,
  handleStatusChange,
  handleDeleteLead,
  logActivity,
  expandedLead,
  setExpandedLead
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (selectedDateStr && panelRef.current) {
      setTimeout(() => {
        panelRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [selectedDateStr]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get start day of month and number of days
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  // Group leads by local date string "YYYY-MM-DD"
  const statsByDate = useMemo(() => {
    const stats = {};
    leads.forEach(lead => {
      if (lead.type === "booking_confirmation") return;
      const createdDate = lead.createdAt?.toDate 
        ? lead.createdAt.toDate() 
        : (lead.createdAt ? new Date(lead.createdAt) : null);
      if (createdDate) {
        const y = createdDate.getFullYear();
        const m = String(createdDate.getMonth() + 1).padStart(2, "0");
        const d = String(createdDate.getDate()).padStart(2, "0");
        const dateStr = `${y}-${m}-${d}`;
        if (!stats[dateStr]) {
          stats[dateStr] = { leads: 0, bookings: 0 };
        }
        stats[dateStr].leads++;
        if (lead.meetingBooked) {
          stats[dateStr].bookings++;
        }
      }
    });
    return stats;
  }, [leads]);

  const dayLeads = useMemo(() => {
    if (!selectedDateStr) return [];
    return leads.filter(lead => {
      if (lead.type === "booking_confirmation") return false;
      const createdDate = lead.createdAt?.toDate 
        ? lead.createdAt.toDate() 
        : (lead.createdAt ? new Date(lead.createdAt) : null);
      if (!createdDate) return false;
      const y = createdDate.getFullYear();
      const m = String(createdDate.getMonth() + 1).padStart(2, "0");
      const d = String(createdDate.getDate()).padStart(2, "0");
      const dateStr = `${y}-${m}-${d}`;
      return dateStr === selectedDateStr;
    });
  }, [leads, selectedDateStr]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDateStr(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDateStr(null);
  };

  // Generate calendar grid array
  const cells = [];
  // Add empty placeholders for days before first of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push({ day: null, dateStr: null });
  }
  // Add actual days of the month
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ day: d, dateStr });
  }
  // Pad grid to full weeks (multiples of 7)
  const totalCellsNeeded = Math.ceil(cells.length / 7) * 7;
  while (cells.length < totalCellsNeeded) {
    cells.push({ day: null, dateStr: null });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Notice Banner */}
      <div style={{ 
        background: "rgba(249,115,22,0.08)", 
        border: "1px solid rgba(249,115,22,0.18)", 
        borderRadius: 12, 
        padding: "12px 16px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        flexWrap: "wrap",
        gap: 12
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <AlertCircle size={16} color="#f97316" />
          <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>
            Please see Calendly for exact meeting dates and times.
          </span>
        </div>
        <a 
          href="https://calendly.com/app/scheduled_events/user/me" 
          target="_blank" 
          rel="noreferrer"
          style={{ 
            background: "#f97316", 
            color: "#fff", 
            border: "none", 
            padding: "6px 14px", 
            borderRadius: 8, 
            fontSize: 10, 
            fontWeight: 800, 
            textTransform: "uppercase", 
            textDecoration: "none",
            letterSpacing: "0.05em",
            transition: "all 0.2s" 
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#ea580c"}
          onMouseLeave={e => e.currentTarget.style.background = "#f97316"}
        >
          View Scheduled Meetings 🔗
        </a>
      </div>

      {/* Calendar header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "12px 20px", borderRadius: 14 }}>
        <h2 style={{ fontSize: 16, fontWeight: 900, color: "#fff", margin: 0 }}>
          {monthNames[month]} {year}
        </h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button 
            onClick={handlePrevMonth}
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
          >
            ← Previous
          </button>
          <button 
            onClick={handleNextMonth}
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
          >
            Next →
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, overflow: "hidden", padding: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
          {/* Weekday headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} style={{ textAlign: "center", fontSize: 9, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.1em", padding: "8px 0" }}>
              {day}
            </div>
          ))}

          {/* Day cells */}
          {cells.map((cell, idx) => {
            const dayStats = cell.dateStr ? statsByDate[cell.dateStr] : null;
            const hasLeads = dayStats && dayStats.leads > 0;
            const hasBookings = dayStats && dayStats.bookings > 0;
            
            const isToday = cell.day && 
                            new Date().getDate() === cell.day && 
                            new Date().getMonth() === month && 
                            new Date().getFullYear() === year;

            const isSelected = cell.dateStr === selectedDateStr;

            return (
              <div 
                key={idx} 
                onClick={() => {
                  if (cell.day) {
                    setSelectedDateStr(isSelected ? null : cell.dateStr);
                  }
                }}
                style={{ 
                  aspectRatio: "1.2/1",
                  background: isSelected ? "linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0.05) 100%)" : (isToday ? "linear-gradient(135deg, rgba(249,115,22,0.05) 0%, rgba(255,255,255,0.01) 100%)" : (cell.day ? "rgba(255,255,255,0.015)" : "transparent")), 
                  border: `1.5px solid ${isSelected ? "#f97316" : (isToday ? "rgba(249,115,22,0.3)" : (cell.day ? "rgba(255,255,255,0.04)" : "transparent"))}`, 
                  borderRadius: 14, 
                  padding: "10px", 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "space-between",
                  minHeight: 70,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: cell.day ? "pointer" : "default",
                  boxShadow: isSelected ? "0 8px 24px rgba(249,115,22,0.2), inset 0 0 0 1px rgba(249,115,22,0.5)" : "none",
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseEnter={e => {
                  if (cell.day && !isSelected) {
                    e.currentTarget.style.background = isToday ? "linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(255,255,255,0.03) 100%)" : "rgba(255,255,255,0.04)";
                    e.currentTarget.style.borderColor = isToday ? "rgba(249,115,22,0.4)" : "rgba(255,255,255,0.1)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={e => {
                  if (cell.day && !isSelected) {
                    e.currentTarget.style.background = isToday ? "linear-gradient(135deg, rgba(249,115,22,0.05) 0%, rgba(255,255,255,0.01) 100%)" : "rgba(255,255,255,0.015)";
                    e.currentTarget.style.borderColor = isToday ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.04)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                {cell.day ? (
                  <>
                    <span style={{ fontSize: 11, fontWeight: 800, color: isSelected ? "#fff" : (isToday ? "#f97316" : "#a3a3a3") }}>
                      {cell.day}
                    </span>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {hasLeads && (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "4px 8px" }}>
                          <span style={{ fontSize: 10, color: "#a3a3a3", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>LEADS:</span>
                          <span style={{ fontSize: 12, color: "#fff", fontWeight: 900 }}>{dayStats.leads}</span>
                        </div>
                      )}
                      {hasBookings && (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 8, padding: "4px 8px" }}>
                          <span style={{ fontSize: 10, color: "#10b981", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>BOOKED:</span>
                          <span style={{ fontSize: 12, color: "#10b981", fontWeight: 900 }}>{dayStats.bookings}</span>
                        </div>
                      )}
                    </div>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Panel */}
      {selectedDateStr && (
        <div ref={panelRef} style={{ background: "linear-gradient(180deg, #111111 0%, #0a0a0a 100%)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 20, marginTop: 16, boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 900, color: "#fff", textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>
              📅 Leads for {new Date(selectedDateStr + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </h3>
            <button 
              onClick={() => { setSelectedDateStr(null); setExpandedLead(null); }}
              style={{ background: "none", border: "none", color: "#525252", cursor: "pointer", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}
              onMouseEnter={e => e.currentTarget.style.color = "#fff"}
              onMouseLeave={e => e.currentTarget.style.color = "#525252"}
            >
              Close Panel ✕
            </button>
          </div>
          
          {dayLeads.length === 0 ? (
            <div style={{ color: "#525252", fontStyle: "italic", fontSize: 11, fontWeight: 600 }}>No leads received on this day.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {dayLeads.map(lead => {
                const isLeadOpen = expandedLead === lead.id;
                const status = lead.status || "new";
                const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.new;
                return (
                  <div key={lead.id} style={{ background: "rgba(255,255,255,0.01)", border: `1px solid ${isLeadOpen ? cfg.border : "rgba(255,255,255,0.03)"}`, borderRadius: 14, overflow: "hidden", transition: "all 0.2s" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", gap: 12, flexWrap: "wrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 8, background: `linear-gradient(135deg, ${cfg.color}33, ${cfg.color}11)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: cfg.color }}>
                          {lead.fullName?.[0] || "L"}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{lead.fullName || "Unknown"}</span>
                          <span style={{ fontSize: 10, color: "#525252" }}>{lead.email}</span>
                        </div>
                      </div>
                      
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <StatusBadge status={status} />
                        <span style={{ fontSize: 10, color: "#f97316", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>{lead.requestedService || "General enquiry"}</span>
                        
                        <div style={{ display: "flex", gap: 6 }}>
                          {lead.whatsapp && lead.whatsapp !== "N/A" && (
                            <a 
                              href={`https://wa.me/${lead.whatsapp.replace(/\D/g,"")}?text=${encodeURIComponent(
                                `Hi ${lead.fullName || ""}, I'm reaching out from Grow Orbit regarding your interest in ${lead.requestedService || "our services"}. I'd love to connect and see how we can help you scale!`
                              )}`} 
                              target="_blank" 
                              rel="noreferrer"
                              style={{ width: 26, height: 26, borderRadius: 6, background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.15)", color: "#4ade80", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
                              onMouseEnter={e => { e.currentTarget.style.background = "rgba(74,222,128,0.15)"; }}
                              onMouseLeave={e => { e.currentTarget.style.background = "rgba(74,222,128,0.08)"; }}
                              title="WhatsApp outreach"
                            >
                              <Phone size={11} />
                            </a>
                          )}
                          <a 
                            href={`mailto:${lead.email}`}
                            style={{ width: 26, height: 26, borderRadius: 6, background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.15)", color: "#38bdf8", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
                            onMouseEnter={e => { e.currentTarget.style.background = "rgba(56,189,248,0.15)"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "rgba(56,189,248,0.08)"; }}
                            title="Email outreach"
                          >
                            <Mail size={11} />
                          </a>
                          <button 
                            onClick={() => { setExpandedLead(isLeadOpen ? null : lead.id); setCrmNote(""); }}
                            style={{ padding: "5px 10px", borderRadius: 8, background: isLeadOpen ? "#f97316" : "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", color: isLeadOpen ? "#fff" : "#a3a3a3", fontSize: 9, fontWeight: 700, cursor: "pointer" }}
                          >
                            {isLeadOpen ? "CLOSE" : "VIEW"}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {isLeadOpen && (
                      <div style={{ borderTop: "1px solid rgba(255,255,255,0.03)", background: "rgba(255,255,255,0.005)" }}>
                        <LeadDetailPanel
                          lead={lead}
                          users={users}
                          currentAdmin={currentAdmin}
                          crmNote={crmNote}
                          setCrmNote={setCrmNote}
                          handleAssignLead={handleAssignLead}
                          handleUpdatePriority={handleUpdatePriority}
                          handleAddLeadNote={handleAddLeadNote}
                          handleDeleteLeadNote={handleDeleteLeadNote}
                          handleUpdateFollowUp={handleUpdateFollowUp}
                          leadsCollectionName={leadsCollectionName}
                          handleStatusChange={handleStatusChange}
                          handleDeleteLead={handleDeleteLead}
                          logActivity={logActivity}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function LeadsTab({
  leads,
  users,
  loading,
  leadSearch,
  setLeadSearch,
  leadFilter,
  setLeadFilter,
  priorityFilter,
  setPriorityFilter,
  ownerFilter,
  setOwnerFilter,
  sourceFilter,
  setSourceFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  leadViewMode,
  setLeadViewMode,
  expandedLead,
  setExpandedLead,
  crmNote,
  setCrmNote,
  newLeadsCount,
  currentAdmin,
  handleDeleteLead,
  handleStatusChange,
  handleAssignLead,
  handleUpdatePriority,
  handleUpdateFollowUp,
  handleAddLeadNote,
  handleDeleteLeadNote,
  exportLeads,
  triggerConfirm,
  logActivity,
  leadsCollectionName
}) {
  const startInputRef = useRef(null);
  const endInputRef = useRef(null);

  /* Follow Up filter state */
  const [followUpFilter, setFollowUpFilter] = useState("all");

  /* Sorting state */
  const [sortOrder, setSortOrder] = useState("desc");

  /* Bulk Actions State */
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [isPerformingBulkAction, setIsPerformingBulkAction] = useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);

  // Compute lead counts per status dynamically for visual filters
  const countsByStatus = useMemo(() => {
    const counts = { all: (leads || []).length };
    ["new", "contacted", "qualified", "hot", "proposal_sent", "won", "lost"].forEach(f => {
      counts[f] = (leads || []).filter(l => {
        const s = l.status || "new";
        if (s === "replied" && f === "contacted") return true;
        if (s === "archived" && f === "lost") return true;
        if (s === "cold" && f === "lost") return true;
        return s === f;
      }).length;
    });
    return counts;
  }, [leads]);

  const toggleLeadSelection = (leadId) => {
    setSelectedLeads(prev => prev.includes(leadId) ? prev.filter(id => id !== leadId) : [...prev, leadId]);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) setSelectedLeads(filteredLeads.map(l => l.id));
    else setSelectedLeads([]);
  };

  const performBulkAction = async (actionType, value = null) => {
    if (!selectedLeads.length || isPerformingBulkAction) return;
    if (actionType === "delete") {
      triggerConfirm(
        "Delete Leads",
        `Are you sure you want to permanently delete ${selectedLeads.length} selected leads? This action cannot be undone.`,
        async () => {
          setIsPerformingBulkAction(true);
          try {
            await Promise.all(selectedLeads.map(id => handleDeleteLead(id, true)));
            logActivity("BULK_DELETE_LEADS", `Permanently deleted ${selectedLeads.length} leads`);
            setSelectedLeads([]);
          } catch (err) {
            console.error("Bulk delete failed:", err);
          } finally {
            setIsPerformingBulkAction(false);
          }
        },
        true
      );
      return;
    }

    setIsPerformingBulkAction(true);
    try {
      if (actionType === "status") {
        await Promise.all(selectedLeads.map(id => handleStatusChange(id, value)));
        logActivity("BULK_STATUS_CHANGE", `Updated status to "${value}" for ${selectedLeads.length} leads`);
      } else if (actionType === "assign") {
        const admin = users.find(u => u.uid === value || u.id === value);
        const adminName = admin?.fullName || admin?.displayName || "Admin";
        await Promise.all(selectedLeads.map(id => handleAssignLead(id, value, adminName)));
        logActivity("BULK_ASSIGN_OWNER", `Assigned ${selectedLeads.length} leads to owner: "${adminName}"`);
      }
      setSelectedLeads([]);
    } catch (err) {
      console.error("Bulk action failed:", err);
      alert("Some bulk actions failed. Check console.");
    } finally {
      setIsPerformingBulkAction(false);
    }
  };

  /* Filtered leads internal computation to offload from page.jsx */
  const filteredLeads = useMemo(() => {
    let res = leads;
    if (leadFilter !== "all") {
      res = res.filter(l => {
        const s = l.status || "new";
        if (s === "replied" && leadFilter === "contacted") return true;
        if (s === "archived" && leadFilter === "lost") return true;
        if (s === "cold" && leadFilter === "lost") return true;
        return s === leadFilter;
      });
    }
    if (priorityFilter !== "all") res = res.filter(l => (l.priority || "low") === priorityFilter);
    if (ownerFilter !== "all") {
      if (ownerFilter === "unassigned") res = res.filter(l => !l.assignedTo);
      else res = res.filter(l => l.assignedTo === ownerFilter);
    }
    if (sourceFilter !== "all") {
      res = res.filter(l => (l.source || "Direct") === sourceFilter);
    }

    // Follow up filter
    if (followUpFilter === "today") {
      const todayStr = new Date().toISOString().split("T")[0];
      res = res.filter(l => l.nextFollowUp === todayStr);
    } else if (followUpFilter === "overdue") {
      const todayStr = new Date().toISOString().split("T")[0];
      res = res.filter(l => l.nextFollowUp && l.nextFollowUp < todayStr && l.status !== "won" && l.status !== "lost");
    } else if (followUpFilter === "upcoming") {
      const todayStr = new Date().toISOString().split("T")[0];
      res = res.filter(l => l.nextFollowUp && l.nextFollowUp > todayStr);
    }

    // Search query match
    if (leadSearch.trim()) {
      const q = leadSearch.toLowerCase();
      res = res.filter(l => 
        l.fullName?.toLowerCase().includes(q) || 
        l.email?.toLowerCase().includes(q) || 
        l.requestedService?.toLowerCase().includes(q)
      );
    }

    // Date boundary match
    if (startDate) {
      const sDate = new Date(startDate);
      sDate.setHours(0, 0, 0, 0);
      res = res.filter(l => l.createdAt?.toDate && l.createdAt.toDate() >= sDate);
    }
    if (endDate) {
      const eDate = new Date(endDate);
      eDate.setHours(23, 59, 59, 999);
      res = res.filter(l => l.createdAt?.toDate && l.createdAt.toDate() <= eDate);
    }

    // Sort by date based on sortOrder
    const sortedRes = [...res];
    sortedRes.sort((a, b) => {
      const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : (a.createdAt ? new Date(a.createdAt).getTime() : 0);
      const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : (b.createdAt ? new Date(b.createdAt).getTime() : 0);
      return sortOrder === "asc" ? aTime - bTime : bTime - aTime;
    });

    return sortedRes;
  }, [leads, leadFilter, priorityFilter, ownerFilter, sourceFilter, followUpFilter, leadSearch, startDate, endDate, sortOrder]);

  return (
    <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <CrmDocumentationModal isOpen={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} />
      {/* Header */}
      <div className="leads-header" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 6 }}>CRM · Inbound</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, color: "#fff" }}>Lead Pipeline</h1>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {/* View Toggle */}
          <div className="lead-view-toggle" style={{ display: "flex", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 2 }}>
            <button
              onClick={() => setLeadViewMode("cards")}
              style={{ padding: "6px 10px", borderRadius: 8, border: "none", cursor: "pointer", background: leadViewMode === "cards" ? "#f97316" : "transparent", color: leadViewMode === "cards" ? "#fff" : "#525252", transition: "all 0.2s", display: "flex" }}
              title="Cards View"
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setLeadViewMode("table")}
              style={{ padding: "6px 10px", borderRadius: 8, border: "none", cursor: "pointer", background: leadViewMode === "table" ? "#f97316" : "transparent", color: leadViewMode === "table" ? "#fff" : "#525252", transition: "all 0.2s", display: "flex" }}
              title="Table View"
            >
              <List size={14} />
            </button>
            <button
              onClick={() => setLeadViewMode("kanban")}
              style={{ padding: "6px 10px", borderRadius: 8, border: "none", cursor: "pointer", background: leadViewMode === "kanban" ? "#f97316" : "transparent", color: leadViewMode === "kanban" ? "#fff" : "#525252", transition: "all 0.2s", display: "flex" }}
              title="Kanban Board"
            >
              <KanbanSquare size={14} />
            </button>
            <button
              onClick={() => setLeadViewMode("calendar")}
              style={{ padding: "6px 10px", borderRadius: 8, border: "none", cursor: "pointer", background: leadViewMode === "calendar" ? "#f97316" : "transparent", color: leadViewMode === "calendar" ? "#fff" : "#525252", transition: "all 0.2s", display: "flex" }}
              title="Calendar View"
            >
              <Calendar size={14} />
            </button>
          </div>

          <button
            className="crm-manual-btn"
            onClick={() => setIsDocModalOpen(true)}
            style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 10, padding: "7px 14px", cursor: "pointer", color: "#f97316", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(249,115,22,0.15)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(249,115,22,0.1)"; }}
          >
            <HelpCircle size={14} />
            CRM Manual
          </button>
          <button
            className="lead-export-btn"
            onClick={exportLeads}
            style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "7px 14px", cursor: "pointer", color: "#a3a3a3", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#a3a3a3"; }}
          >
            <Download size={14} />
            Export CSV
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.18)", borderRadius: 10, padding: "7px 12px" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f97316", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.15em" }}>{newLeadsCount} Unread</span>
          </div>
        </div>
      </div>

      {/* Analytics Mini-Dashboard */}
      <div className="leads-analytics" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "16px 20px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#a3a3a3", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Total Leads</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#fff" }}>{filteredLeads.length}</div>
        </div>
        <div style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 16, padding: "16px 20px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Meetings Booked</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#10b981" }}>{filteredLeads.filter(l => l.meetingBooked).length}</div>
        </div>
        <div style={{ background: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 16, padding: "16px 20px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Conversion Rate</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#f97316" }}>
            {filteredLeads.length ? Math.round((filteredLeads.filter(l => l.meetingBooked).length / filteredLeads.length) * 100) : 0}%
          </div>
        </div>
      </div>

      <div className="leads-controls" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <div style={{ flex: 1, minWidth: "280px", display: "flex", alignItems: "center", gap: 10, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "10px 16px" }}>
          <Search size={14} color="#525252" />
          <input
            type="text"
            placeholder="Search leads by name, email, or service…"
            value={leadSearch}
            onChange={e => setLeadSearch(e.target.value)}
            style={{ flex: 1, background: "none", border: "none", color: "#fff", fontSize: 12, fontWeight: 500, outline: "none" }}
          />
        </div>
         <div className="leads-filters" style={{ display: "flex", gap: 6, flexWrap: "wrap", width: "100%", maxWidth: "100%" }}>
          {["all", "new", "contacted", "qualified", "hot", "proposal_sent", "won", "lost"].map(f => (
            <button key={f} onClick={() => setLeadFilter(f)}
              style={{ padding: "8px 14px", borderRadius: 10, border: "1px solid", cursor: "pointer", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", transition: "all 0.15s",
                background: leadFilter === f ? (f === "all" ? "rgba(255,255,255,0.08)" : STATUS_CONFIG[f]?.bg || "rgba(255,255,255,0.08)") : "transparent",
                color: leadFilter === f ? (f === "all" ? "#fff" : STATUS_CONFIG[f]?.color || "#fff") : "#525252",
                borderColor: leadFilter === f ? (f === "all" ? "rgba(255,255,255,0.15)" : STATUS_CONFIG[f]?.border || "rgba(255,255,255,0.1)") : "rgba(255,255,255,0.04)",
              }}
            >
              {f === "all" ? `All (${countsByStatus.all})` : `${STATUS_CONFIG[f]?.label || f} (${countsByStatus[f]})`}
            </button>
          ))}
        </div>

        {/* Priority Filter */}
        <div className="leads-priority-filter" style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.02)", padding: "4px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.04)" }}>
          {["all", "low", "medium", "high"].map(p => (
            <button key={p} onClick={() => setPriorityFilter(p)}
              style={{
                padding: "6px 12px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", transition: "all 0.15s",
                background: priorityFilter === p ? (p === "all" ? "rgba(255,255,255,0.15)" : PRIORITY_CONFIG[p].bg) : "transparent",
                color: priorityFilter === p ? (p === "all" ? "#fff" : PRIORITY_CONFIG[p].color) : "#525252",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters (Date, Owner, Source) */}
      <div className="leads-advanced-filters" style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        {/* Source Filter */}
        <select
          value={sourceFilter}
          onChange={e => setSourceFilter(e.target.value)}
          style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "8px 16px", color: "#fff", fontSize: 11, fontWeight: 700, outline: "none", cursor: "pointer" }}
        >
          <option value="all">All Sources</option>
          <option value="Landing Page Form">Landing Page Form</option>
          <option value="Design & Creative Landing Page">Design & Creative Landing Page</option>
          <option value="Design & Creative Bottom Form">Design & Creative Bottom Form</option>
          <option value="Direct">Direct</option>
        </select>

        {/* Follow Up Filter */}
        <select
          value={followUpFilter}
          onChange={e => setFollowUpFilter(e.target.value)}
          style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "8px 16px", color: "#fff", fontSize: 11, fontWeight: 700, outline: "none", cursor: "pointer" }}
        >
          <option value="all">All Follow-ups</option>
          <option value="today">Due Today</option>
          <option value="overdue">Overdue</option>
          <option value="upcoming">Upcoming</option>
        </select>

        {/* Sort Order Selector */}
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "8px 16px", color: "#fff", fontSize: 11, fontWeight: 700, outline: "none", cursor: "pointer" }}
        >
          <option value="desc">Sort: New to Old</option>
          <option value="asc">Sort: Old to New</option>
        </select>

        <div className="leads-date-filter" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div
            onClick={() => startInputRef.current?.showPicker()}
            style={{ display: "flex", alignItems: "center", gap: 12, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "8px 16px", cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
          >
            <Calendar size={14} color="#525252" />
            <span style={{ fontSize: 9, fontWeight: 800, color: "#a3a3a3", textTransform: "uppercase", letterSpacing: "0.15em" }}>From</span>
            <input
              ref={startInputRef}
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              style={{ background: "none", border: "none", color: "#fff", fontSize: 11, fontWeight: 700, outline: "none", cursor: "pointer", colorScheme: "dark" }}
            />
          </div>

          <div
            onClick={() => endInputRef.current?.showPicker()}
            style={{ display: "flex", alignItems: "center", gap: 12, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "8px 16px", cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
          >
            <Calendar size={14} color="#525252" />
            <span style={{ fontSize: 9, fontWeight: 800, color: "#a3a3a3", textTransform: "uppercase", letterSpacing: "0.15em" }}>To</span>
            <input
              ref={endInputRef}
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              style={{ background: "none", border: "none", color: "#fff", fontSize: 11, fontWeight: 700, outline: "none", cursor: "pointer", colorScheme: "dark" }}
            />
          </div>

          {(startDate || endDate) && (
            <button
              onClick={() => { setStartDate(""); setEndDate(""); }}
              style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", color: "#ef4444", fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", cursor: "pointer", padding: "8px 16px", borderRadius: 10, marginLeft: 6, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
            >
              Reset Dates
            </button>
          )}
        </div>
      </div>

      {/* Reset All Filters Pill */}
      {(leadSearch || leadFilter !== "all" || priorityFilter !== "all" || ownerFilter !== "all" || sourceFilter !== "all" || startDate || endDate || sortOrder !== "desc") && (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => { setLeadSearch(""); setLeadFilter("all"); setPriorityFilter("all"); setOwnerFilter("all"); setSourceFilter("all"); setStartDate(""); setEndDate(""); setSortOrder("desc"); }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.15)",
              borderRadius: 100, padding: "6px 14px", cursor: "pointer",
              color: "#f97316", fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(249,115,22,0.15)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(249,115,22,0.08)"}
          >
            <X size={10} /> Reset All Filters
          </button>
          <span style={{ fontSize: 9, color: "#525252", fontWeight: 700 }}>
            {[
              leadSearch && "Search",
              leadFilter !== "all" && `Status: ${leadFilter}`,
              priorityFilter !== "all" && `Priority: ${priorityFilter}`,
              ownerFilter !== "all" && "Owner",
              sourceFilter !== "all" && "Source",
              (startDate || endDate) && "Date range"
            ].filter(Boolean).join(" · ")}
          </span>
        </div>
      )}

      {/* Bulk Action Toolbar */}
      {selectedLeads.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 12, padding: "10px 16px", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {selectedLeads.length} Selected
            </span>
            <div style={{ width: 1, height: 16, background: "rgba(249,115,22,0.2)" }} />
            <button onClick={() => setSelectedLeads([])} style={{ background: "none", border: "none", color: "#a3a3a3", fontSize: 10, cursor: "pointer", textDecoration: "underline" }}>Clear</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <select
              onChange={(e) => { if(e.target.value) performBulkAction("status", e.target.value); e.target.value = ""; }}
              style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 10px", color: "#fff", fontSize: 10, outline: "none", cursor: "pointer" }}
            >
              <option value="">Change Status...</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="hot">Hot 🔥</option>
              <option value="proposal_sent">Proposal Sent</option>
              <option value="won">Won 🎉</option>
              <option value="lost">Lost ❌</option>
            </select>
            <button
              onClick={() => performBulkAction("delete")}
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", borderRadius: 8, padding: "6px 10px", fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
            >
              <Trash2 size={12} /> Delete
            </button>
          </div>
        </div>
      )}

      {/* Lead cards */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#333" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid rgba(249,115,22,0.2)", borderTopColor: "#f97316", animation: "spin 1s linear infinite", margin: "0 auto 12px" }} />
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em" }}>Loading pipeline…</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 20px", color: "#333" }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(249,115,22,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Inbox size={24} color="#f97316" />
          </div>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#a3a3a3", marginBottom: 4 }}>No leads match your filters</p>
          <p style={{ fontSize: 11, color: "#525252", marginBottom: 16 }}>Try adjusting your search, status, or date range</p>
          {(leadSearch || leadFilter !== "all" || priorityFilter !== "all" || ownerFilter !== "all" || sourceFilter !== "all" || startDate || endDate || sortOrder !== "desc") && (
            <button
              onClick={() => { setLeadSearch(""); setLeadFilter("all"); setPriorityFilter("all"); setOwnerFilter("all"); setSourceFilter("all"); setStartDate(""); setEndDate(""); setSortOrder("desc"); }}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 10, padding: "8px 16px", cursor: "pointer", color: "#f97316", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}
            >
              <RotateCcw size={12} /> Clear All Filters
            </button>
          )}
        </div>
      ) : (
        leadViewMode === "kanban" ? (
          <KanbanBoard 
            leads={filteredLeads}
            handleStatusChange={handleStatusChange}
            setExpandedLead={setExpandedLead}
            setLeadViewMode={setLeadViewMode}
          />
        ) : leadViewMode === "calendar" ? (
          <LeadCalendarView 
            leads={filteredLeads}
            users={users}
            currentAdmin={currentAdmin}
            crmNote={crmNote}
            setCrmNote={setCrmNote}
            handleAssignLead={handleAssignLead}
            handleUpdatePriority={handleUpdatePriority}
            handleAddLeadNote={handleAddLeadNote}
            handleUpdateFollowUp={handleUpdateFollowUp}
            leadsCollectionName={leadsCollectionName}
            handleStatusChange={handleStatusChange}
            handleDeleteLead={handleDeleteLead}
            logActivity={logActivity}
            expandedLead={expandedLead}
            setExpandedLead={setExpandedLead}
          />
        ) : leadViewMode === "cards" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filteredLeads.map(lead => {
              const isOpen = expandedLead === lead.id;
              const status = lead.status || "new";
              const priority = calculateLeadPriority(lead);
              const cfg = STATUS_CONFIG[status];
              const isOverdue = lead.nextFollowUp && new Date(lead.nextFollowUp) < new Date(new Date().setHours(0,0,0,0)) && status !== "archived" && status !== "hot";
              
              // Calculate lead age in days
              const created = lead.createdAt?.toDate ? lead.createdAt.toDate() : new Date();
              const ageDays = (new Date() - created) / (1000 * 60 * 60 * 24);

              return (
                <div key={lead.id} style={{ 
                  background: "#0d0d0d", 
                  border: `1px solid ${isOpen ? cfg.border : (isOverdue ? "rgba(239,68,68,0.35)" : "rgba(255,255,255,0.05)")}`, 
                  boxShadow: isOverdue && !isOpen ? "0 0 12px rgba(239,68,68,0.05)" : "none",
                  borderRadius: 18, 
                  overflow: "hidden", 
                  transition: "all 0.2s" 
                }}>
                  {/* Card header — always visible */}
                  <div
                    className="lead-card-header"
                    onClick={() => { setExpandedLead(isOpen ? null : lead.id); setCrmNote(""); }}
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "space-between", 
                      padding: "16px 20px", 
                      cursor: "pointer",
                      gap: 16,
                      flexWrap: "wrap"
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}
                  >
                    {/* Column 1: Selection, Avatar, and Basic Info */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 220, flex: "0 0 250px" }}>
                      {/* Checkbox */}
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLeadSelection(lead.id);
                        }}
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 4,
                          border: `1.5px solid ${selectedLeads.includes(lead.id) ? "#f97316" : "rgba(255,255,255,0.25)"}`,
                          background: selectedLeads.includes(lead.id) ? "#f97316" : "rgba(255,255,255,0.02)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          flexShrink: 0
                        }}
                      >
                        {selectedLeads.includes(lead.id) && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 4L4 6.5L8.5 1.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>

                      {/* Avatar */}
                      <div className="lead-avatar" style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${cfg.color}33, ${cfg.color}11)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: cfg.color, flexShrink: 0 }}>
                        {lead.fullName?.[0] || "L"}
                      </div>

                      {/* Name & Email */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{lead.fullName || "Unknown"}</span>
                        <span style={{ fontSize: 11, color: "#525252", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{lead.email}</span>
                      </div>
                    </div>

                    {/* Column 2: Status, Priority and Score Badges */}
                    <div style={{ flex: "1 1 180px", minWidth: 150, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <StatusBadge status={status} />

                      {/* 
                      <span style={{ 
                        fontSize: 9, 
                        fontWeight: 900, 
                        color: getScoreCategory(calculateLeadScore(lead)).color, 
                        background: getScoreCategory(calculateLeadScore(lead)).bg, 
                        border: `1px solid ${getScoreCategory(calculateLeadScore(lead)).border}`, 
                        borderRadius: 100, 
                        padding: "2px 8px", 
                        textTransform: "uppercase", 
                        letterSpacing: "0.12em" 
                      }}>
                        Score: {calculateLeadScore(lead)}
                      </span>
                      */}
                      {lead.meetingBooked && (
                        <span style={{ fontSize: 9, fontWeight: 700, color: "#10b981", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 100, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                          Booked
                        </span>
                      )}
                      {lead.priority === "high" && (
                        <span style={{ fontSize: 9, fontWeight: 700, color: PRIORITY_CONFIG.high.color, background: PRIORITY_CONFIG.high.bg, border: `1px solid ${PRIORITY_CONFIG.high.border}`, borderRadius: 100, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                          High Priority
                        </span>
                      )}
                    </div>

                    {/* Column 3: Lead Context (Source, Age & Alerts) */}
                    <div style={{ flex: "1 1 180px", minWidth: 140, display: "flex", flexDirection: "column", gap: 4 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 9, fontWeight: 800, color: "#a3a3a3", textTransform: "uppercase", letterSpacing: "0.05em", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 100, padding: "2px 8px" }}>
                          {lead.source || "Direct"}
                        </span>
                        <span style={{ 
                          fontSize: 9, 
                          fontWeight: 700, 
                          color: ageDays > 2 ? "#ef4444" : "#525252", 
                          background: "rgba(255,255,255,0.03)", 
                          border: `1px solid ${ageDays > 2 ? "rgba(239,68,68,0.25)" : "rgba(255,255,255,0.06)"}`,
                          borderRadius: 100, 
                          padding: "2px 8px", 
                          textTransform: "uppercase", 
                          letterSpacing: "0.12em",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 3
                        }}>
                          {ageDays > 2 && "⚠️ "}Age: {ageDays.toFixed(1)}d
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        {ageDays > 7 && (
                          <span style={{ fontSize: 8, fontWeight: 900, color: "#22d3ee", background: "rgba(34,211,238,0.10)", border: "1px solid rgba(34,211,238,0.25)", borderRadius: 100, padding: "1px 6px", textTransform: "uppercase" }}>
                            Cold Risk ❄️
                          </span>
                        )}
                        {lead.nextFollowUp && new Date(lead.nextFollowUp) < new Date(new Date().setHours(0,0,0,0)) && status !== "archived" && status !== "hot" && (
                          <span style={{ fontSize: 8, fontWeight: 800, color: "#ef4444", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 100, padding: "1px 6px", textTransform: "uppercase" }}>
                            Overdue
                          </span>
                        )}
                      </div>
                    </div>



                    {/* Column 5: Direct Outreach and Dates */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                      {/* Outreach */}
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {lead.whatsapp && lead.whatsapp !== "N/A" && (
                          <a
                            href={`https://wa.me/${lead.whatsapp.replace(/\D/g,"")}?text=${encodeURIComponent(
                              `Hi ${lead.fullName || ""}, I'm reaching out from Grow Orbit regarding your interest in ${lead.requestedService || "our services"}. I'd love to connect and see how we can help you scale!`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            onClick={e => e.stopPropagation()}
                            style={{ 
                              width: 28, 
                              height: 28, 
                              borderRadius: 8, 
                              background: "rgba(74,222,128,0.08)", 
                              border: "1px solid rgba(74,222,128,0.15)", 
                              color: "#4ade80", 
                              display: "flex", 
                              alignItems: "center", 
                              justifyContent: "center", 
                              textDecoration: "none",
                              transition: "all 0.15s"
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = "rgba(74,222,128,0.15)"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "rgba(74,222,128,0.08)"; }}
                            title="Send WhatsApp Message"
                          >
                            <Phone size={12} />
                          </a>
                        )}
                        <a
                          href={`mailto:${lead.email}`}
                          onClick={e => e.stopPropagation()}
                          style={{ 
                            width: 28, 
                            height: 28, 
                            borderRadius: 8, 
                            background: "rgba(56,189,248,0.08)", 
                            border: "1px solid rgba(56,189,248,0.15)", 
                            color: "#38bdf8", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center", 
                            textDecoration: "none",
                            transition: "all 0.15s"
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = "rgba(56,189,248,0.15)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "rgba(56,189,248,0.08)"; }}
                          title="Send Email"
                        >
                          <Mail size={12} />
                        </a>
                      </div>

                      {/* Timestamp */}
                      <div style={{ textAlign: "right", minWidth: 70, display: "flex", flexDirection: "column", gap: 1 }}>
                        <span style={{ fontSize: 9, color: "#525252", fontWeight: 700 }}>{fmt(lead.createdAt)}</span>
                        <span style={{ fontSize: 8, color: "#3f3f46", fontWeight: 500 }}>{fmtTime(lead.createdAt)}</span>
                      </div>

                      {/* Expand Chevron */}
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "none" }}>
                        <ChevronRight size={14} color="#525252" />
                      </div>
                    </div>
                  </div>

                  {/* Expanded */}
                  {isOpen && (
                    <LeadDetailPanel
                      lead={lead}
                      users={users}
                      currentAdmin={currentAdmin}
                      crmNote={crmNote}
                      setCrmNote={setCrmNote}
                      handleAssignLead={handleAssignLead}
                      handleUpdatePriority={handleUpdatePriority}
                      handleAddLeadNote={handleAddLeadNote}
                      handleDeleteLeadNote={handleDeleteLeadNote}
                      handleUpdateFollowUp={handleUpdateFollowUp}
                      leadsCollectionName={leadsCollectionName}
                      handleStatusChange={handleStatusChange}
                      handleDeleteLead={handleDeleteLead}
                      logActivity={logActivity}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 18, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1150 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <th style={{ padding: "16px 8px", width: 30, textAlign: "center" }}>
                    <div 
                      onClick={() => {
                        const allSelected = filteredLeads.length > 0 && selectedLeads.length === filteredLeads.length;
                        if (allSelected) {
                          setSelectedLeads([]);
                        } else {
                          setSelectedLeads(filteredLeads.map(l => l.id));
                        }
                      }}
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 4,
                        border: `1.5px solid ${filteredLeads.length > 0 && selectedLeads.length === filteredLeads.length ? "#f97316" : "rgba(255,255,255,0.25)"}`,
                        background: filteredLeads.length > 0 && selectedLeads.length === filteredLeads.length ? "#f97316" : "rgba(255,255,255,0.02)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {filteredLeads.length > 0 && selectedLeads.length === filteredLeads.length && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.5 4L4 6.5L8.5 1.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </th>
                  <th style={{ padding: "16px 12px", textAlign: "left", fontSize: 10, fontWeight: 900, color: "#333", textTransform: "uppercase", letterSpacing: "0.2em", whiteSpace: "nowrap", width: 130 }}>Status</th>
                  <th style={{ padding: "16px 8px", textAlign: "left", fontSize: 10, fontWeight: 900, color: "#333", textTransform: "uppercase", letterSpacing: "0.2em", whiteSpace: "nowrap", width: 60 }}>Prio</th>
                  <th style={{ padding: "16px 16px", textAlign: "left", fontSize: 10, fontWeight: 900, color: "#333", textTransform: "uppercase", letterSpacing: "0.2em", minWidth: 220 }}>Client</th>
                  <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 10, fontWeight: 900, color: "#333", textTransform: "uppercase", letterSpacing: "0.2em", minWidth: 280 }}>Service & Source</th>
                  <th style={{ padding: "16px 12px", textAlign: "left", fontSize: 10, fontWeight: 900, color: "#333", textTransform: "uppercase", letterSpacing: "0.2em", whiteSpace: "nowrap", width: 100 }}>Date</th>
                  <th style={{ padding: "16px 24px", textAlign: "right", fontSize: 10, fontWeight: 900, color: "#333", textTransform: "uppercase", letterSpacing: "0.2em", whiteSpace: "nowrap", width: 140 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map(lead => {
                  const status = lead.status || "new";
                  // Calculate lead age in days
                  const created = lead.createdAt?.toDate ? lead.createdAt.toDate() : new Date();
                  const ageDays = (new Date() - created) / (1000 * 60 * 60 * 24);
                  const isTableOpen = expandedLead === lead.id;
                  return (
                    <React.Fragment key={lead.id}>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.02)", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.01)"} onMouseLeave={e => e.currentTarget.style.background = "none"}>
                      <td style={{ padding: "14px 8px", textAlign: "center" }}>
                        <div 
                          onClick={() => toggleLeadSelection(lead.id)}
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: 4,
                            border: `1.5px solid ${selectedLeads.includes(lead.id) ? "#f97316" : "rgba(255,255,255,0.25)"}`,
                            background: selectedLeads.includes(lead.id) ? "#f97316" : "rgba(255,255,255,0.02)",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            margin: "0 auto"
                          }}
                        >
                          {selectedLeads.includes(lead.id) && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.5 4L4 6.5L8.5 1.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: "14px 12px", whiteSpace: "nowrap", width: 130 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <StatusBadge status={status} />

                        </div>
                      </td>
                      <td style={{ padding: "14px 8px", whiteSpace: "nowrap", width: 60 }}>
                        {lead.priority === "high" ? (
                          <span style={{ fontSize: 9, fontWeight: 900, color: PRIORITY_CONFIG.high.color, textTransform: "uppercase" }}>High</span>
                        ) : (
                          <span style={{ fontSize: 9, fontWeight: 700, color: "#333", textTransform: "uppercase" }}>{lead.priority || "Low"}</span>
                        )}
                      </td>
                      <td style={{ padding: "14px 16px", minWidth: 220, whiteSpace: "nowrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, overflow: "hidden" }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{lead.fullName || "Unknown"}</span>
                          {/* 
                          <span style={{ 
                            fontSize: 8, 
                            fontWeight: 900, 
                            color: getScoreCategory(calculateLeadScore(lead)).color, 
                            background: getScoreCategory(calculateLeadScore(lead)).bg, 
                            border: `1px solid ${getScoreCategory(calculateLeadScore(lead)).border}`, 
                            borderRadius: 100, 
                            padding: "1.5px 5.5px",
                            flexShrink: 0
                          }} title={`Lead Score: ${calculateLeadScore(lead)}`}>
                            {calculateLeadScore(lead)}
                          </span>
                          */}
                          {lead.nextFollowUp && new Date(lead.nextFollowUp) < new Date(new Date().setHours(0,0,0,0)) && status !== "archived" && status !== "hot" && (
                             <span style={{ fontSize: 9, fontWeight: 800, color: "#ef4444", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 100, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.12em", flexShrink: 0 }}>
                               ⏰ OVERDUE
                             </span>
                          )}
                          {lead.meetingBooked && (
                            <span style={{ fontSize: 8, fontWeight: 800, color: "#10b981", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", padding: "1.5px 5.5px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.05em", flexShrink: 0 }}>
                              Booked
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: 11, color: "#525252", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{lead.email}</div>
                      </td>
                      <td style={{ padding: "14px 24px", minWidth: 280, whiteSpace: "nowrap" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                          <span style={{ 
                            fontSize: 10, 
                            fontWeight: 800, 
                            color: "#f97316", 
                            textTransform: "uppercase", 
                            letterSpacing: "0.05em", 
                            maxWidth: "100%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "inline-block",
                            whiteSpace: "nowrap"
                          }} title={lead.requestedService || "General"}>
                            {lead.requestedService || "General"}
                          </span>
                          <span style={{ 
                            fontSize: 10, 
                            fontWeight: 750, 
                            color: "#525252",
                            maxWidth: "100%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "inline-block",
                            whiteSpace: "nowrap" 
                          }} title={lead.source || "Inbound"}>
                            {lead.source || "Inbound"}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 24px", whiteSpace: "nowrap", width: 120 }}>
                        <div style={{ fontSize: 11, color: "#fff", fontFamily: "monospace" }}>{fmt(lead.createdAt)}</div>
                        <div style={{ fontSize: 9, color: "#333", fontFamily: "monospace" }}>{fmtTime(lead.createdAt)}</div>
                        <div style={{ 
                          fontSize: 9, 
                          fontWeight: 700, 
                          color: ageDays > 2 ? "#ef4444" : "#525252", 
                          marginTop: 4,
                          display: "flex",
                          alignItems: "center",
                          gap: 3
                        }}>
                          {ageDays > 2 && "⚠️ "}{ageDays.toFixed(1)}d old
                          {ageDays > 7 && (
                            <span style={{ 
                              fontSize: 8, 
                              fontWeight: 900, 
                              color: "#22d3ee", 
                              background: "rgba(34,211,238,0.10)", 
                              border: "1px solid rgba(34,211,238,0.25)", 
                              borderRadius: 4, 
                              padding: "1px 4px", 
                              textTransform: "uppercase"
                            }}>
                              COLD ❄️
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: "14px 24px", textAlign: "right", whiteSpace: "nowrap", width: 140 }}>
                        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", alignItems: "center" }}>
                          {lead.whatsapp && lead.whatsapp !== "N/A" && (
                            <a 
                              href={`https://wa.me/${lead.whatsapp.replace(/\D/g,"")}?text=${encodeURIComponent(
                                `Hi ${lead.fullName || ""}, I'm reaching out from Grow Orbit regarding your interest in ${lead.requestedService || "our services"}. I'd love to connect and see how we can help you scale!`
                              )}`} 
                              target="_blank" 
                              rel="noreferrer"
                              style={{ 
                                width: 28, 
                                height: 28, 
                                borderRadius: 8, 
                                background: "rgba(74,222,128,0.08)", 
                                border: "1px solid rgba(74,222,128,0.15)", 
                                color: "#4ade80", 
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "center", 
                                textDecoration: "none",
                                fontSize: 12,
                                transition: "all 0.15s"
                              }}
                              onMouseEnter={e => { e.currentTarget.style.background = "rgba(74,222,128,0.15)"; }}
                              onMouseLeave={e => { e.currentTarget.style.background = "rgba(74,222,128,0.08)"; }}
                              title="WhatsApp Outreach"
                            >
                              <Phone size={14} />
                            </a>
                          )}
                          <a 
                            href={`mailto:${lead.email}`} 
                            style={{ 
                              width: 28, 
                              height: 28, 
                              borderRadius: 8, 
                              background: "rgba(56,189,248,0.08)", 
                              border: "1px solid rgba(56,189,248,0.15)", 
                              color: "#38bdf8", 
                              display: "flex", 
                              alignItems: "center", 
                              justifyContent: "center", 
                              textDecoration: "none",
                              fontSize: 12,
                              transition: "all 0.15s"
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = "rgba(56,189,248,0.15)"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "rgba(56,189,248,0.08)"; }}
                            title="Email Outreach"
                          >
                            <Mail size={14} />
                          </a>
                          <button onClick={() => { setExpandedLead(isTableOpen ? null : lead.id); setCrmNote(""); }} style={{ padding: "6px 10px", borderRadius: 8, background: isTableOpen ? "#f97316" : "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", color: isTableOpen ? "#fff" : "#a3a3a3", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>
                            {isTableOpen ? "CLOSE" : "VIEW"}
                          </button>
                          <button onClick={() => handleDeleteLead(lead.id)} style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={12} /></button>
                        </div>
                      </td>
                    </tr>
                    {isTableOpen && (
                      <tr>
                        <td colSpan={8} style={{ 
                          padding: "20px 24px", 
                          background: "rgba(255,255,255,0.01)", 
                          borderBottom: "1px solid rgba(255,255,255,0.04)"
                        }}>
                          <LeadDetailPanel
                            lead={lead}
                            users={users}
                            currentAdmin={currentAdmin}
                            crmNote={crmNote}
                            setCrmNote={setCrmNote}
                            handleAssignLead={handleAssignLead}
                            handleUpdatePriority={handleUpdatePriority}
                            handleAddLeadNote={handleAddLeadNote}
                            handleDeleteLeadNote={handleDeleteLeadNote}
                            handleUpdateFollowUp={handleUpdateFollowUp}
                            leadsCollectionName={leadsCollectionName}
                            handleStatusChange={handleStatusChange}
                            handleDeleteLead={handleDeleteLead}
                            logActivity={logActivity}
                          />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}
