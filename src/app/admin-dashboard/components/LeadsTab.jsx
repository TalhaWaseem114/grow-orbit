"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  LayoutGrid, List, KanbanSquare, Download, Search, Calendar, ChevronRight,
  Phone, Mail, Trash2, History, AlertCircle, X, RotateCcw, Inbox, HelpCircle,
  Copy, Check, Bell, ClipboardCheck, Send, Trophy, XCircle, Maximize2, Minimize2, Clock
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
  new:           { label: "Lead In",          color: "#f97316", bg: "rgba(249,115,22,0.12)",  border: "rgba(249,115,22,0.25)" },
  contacted:     { label: "Contacted",        color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.25)" },
  qualified:     { label: "Researched",       color: "#10b981", bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.25)" },
  hot:           { label: "Meeting Booked 🔥", color: "#ef4444", bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.25)"  },
  proposal_sent: { label: "Proposal Sent",    color: "#a855f7", bg: "rgba(168,85,247,0.12)",  border: "rgba(168,85,247,0.25)" },
  won:           { label: "Won 🎉",            color: "#22c55e", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.25)"  },
  lost:          { label: "Lost ❌",           color: "#ef4444", bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.2)"   },
  cold:          { label: "Cold ❄️",           color: "#22d3ee", bg: "rgba(34,211,238,0.10)",  border: "rgba(34,211,238,0.25)" },
  // Fallbacks
  replied:       { label: "Replied",          color: "#22d3ee", bg: "rgba(34,211,238,0.10)",  border: "rgba(34,211,238,0.25)" },
};

/* ─────── Alphabet Initial Solid Gradient Generator ─────── */
const ALPHABET_GRADIENTS = [
  "linear-gradient(135deg, #f97316, #ea580c)", // A - Solid Orange
  "linear-gradient(135deg, #3b82f6, #1d4ed8)", // B - Solid Blue
  "linear-gradient(135deg, #10b981, #047857)", // C - Solid Emerald
  "linear-gradient(135deg, #8b5cf6, #6d28d9)", // D - Solid Purple
  "linear-gradient(135deg, #ec4899, #be185d)", // E - Solid Pink
  "linear-gradient(135deg, #06b6d4, #0e7490)", // F - Solid Cyan
  "linear-gradient(135deg, #f59e0b, #b45309)", // G - Solid Amber
  "linear-gradient(135deg, #6366f1, #4338ca)", // H - Solid Indigo
  "linear-gradient(135deg, #14b8a6, #0f766e)", // I - Solid Teal
  "linear-gradient(135deg, #f43f5e, #be123c)", // J - Solid Rose
  "linear-gradient(135deg, #84cc16, #4d7c0f)", // K - Solid Lime
  "linear-gradient(135deg, #d946ef, #a21caf)", // L - Solid Fuchsia
  "linear-gradient(135deg, #0284c7, #0369a1)", // M - Solid Sky
  "linear-gradient(135deg, #eab308, #a16207)", // N - Solid Yellow
  "linear-gradient(135deg, #a855f7, #7e22ce)", // O - Solid Violet
  "linear-gradient(135deg, #34d399, #059669)", // P - Solid Mint
  "linear-gradient(135deg, #fb923c, #c2410c)", // Q - Solid Apricot
  "linear-gradient(135deg, #60a5fa, #1e40af)", // R - Solid Light Blue
  "linear-gradient(135deg, #f472b6, #9d174d)", // S - Solid Soft Pink
  "linear-gradient(135deg, #a78bfa, #5b21b6)", // T - Solid Lavender
  "linear-gradient(135deg, #38bdf8, #0284c7)", // U - Solid Ocean
  "linear-gradient(135deg, #4ade80, #15803d)", // V - Solid Bright Green
  "linear-gradient(135deg, #fbbf24, #b45309)", // W - Solid Gold
  "linear-gradient(135deg, #f87171, #b91c1c)", // X - Solid Coral
  "linear-gradient(135deg, #c084fc, #6b21a8)", // Y - Solid Lilac
  "linear-gradient(135deg, #2dd4bf, #0f766e)", // Z - Solid Turquoise
];

const getAlphabetGradient = (name) => {
  if (!name || typeof name !== "string") return ALPHABET_GRADIENTS[0];
  const char = name.trim()[0];
  if (!char) return ALPHABET_GRADIENTS[0];
  const code = char.toUpperCase().charCodeAt(0) - 65;
  if (code >= 0 && code < 26) {
    return ALPHABET_GRADIENTS[code];
  }
  return ALPHABET_GRADIENTS[0];
};

/* ─────── Pipeline Phase Config ─────── */
const PIPELINE_PHASES = [
  { key: "lead_in",        label: "Lead In",          statusMatch: ["new", "cold"],       icon: "Inbox",          color: "#f97316", linearLevel: 0, tsField: null },
  { key: "meeting_booked", label: "Meeting Booked",   statusMatch: ["hot"],               icon: "Calendar",       color: "#ef4444", linearLevel: null, isOptional: true, tsField: null },
  { key: "research",       label: "Researched",       statusMatch: ["qualified"],         icon: "ClipboardCheck", color: "#10b981", linearLevel: 1, tsField: "researchCompletedAt" },
  { key: "contact",        label: "Contacted",        statusMatch: ["contacted", "replied"], icon: "Phone",      color: "#3b82f6", linearLevel: 2, tsField: "contactedAt" },
  { key: "proposal",       label: "Proposal Sent",    statusMatch: ["proposal_sent"],     icon: "Send",           color: "#a855f7", linearLevel: 3, tsField: "proposalSentAt" },
  { key: "outcome",        label: "Won / Lost",       statusMatch: ["won", "lost"],       icon: "Trophy",         color: "#22c55e", linearLevel: 4, tsField: "closedAt" },
];

const getLinearLevel = (status) => {
  if (["new", "cold"].includes(status)) return 0;
  if (status === "qualified") return 1;
  if (["contacted", "replied"].includes(status)) return 2;
  if (status === "proposal_sent") return 3;
  if (["won", "lost"].includes(status)) return 4;
  return 0;
};

const LINEAR_STATUS_MAP = {
  0: "new",
  1: "qualified",
  2: "contacted",
  3: "proposal_sent",
  4: "won",
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

const INVOICE_STATUS_CONFIG = {
  draft:     { label: "Draft",     color: "#a3a3a3", bg: "rgba(163,163,163,0.12)", border: "rgba(163,163,163,0.25)" },
  sent:      { label: "Sent",      color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.25)" },
  paid:      { label: "Paid",      color: "#22c55e", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.25)" },
  overdue:   { label: "Overdue",   color: "#ef4444", bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.25)" },
  cancelled: { label: "Cancelled", color: "#71717a", bg: "rgba(113,113,122,0.10)", border: "rgba(113,113,122,0.2)" },
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
   PIPELINE TIMELINE TRACKER
───────────────────────────────────────── */
const phaseIcons = { Inbox, Calendar, ClipboardCheck, Phone, Send, Trophy };

function PipelineTimeline({ lead, handleStatusChange }) {
  const status = lead.status || "new";
  const currentLinearLevel = getLinearLevel(status);
  const isFinal = status === "won" || status === "lost";
  const hasMeeting = Boolean(lead.meetingBooked || status === "hot");

  const fmtTs = (ts) => {
    if (!ts) return null;
    const d = ts?.toDate ? ts.toDate() : (ts instanceof Date ? ts : new Date(ts));
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const handleAdvanceClick = (targetLevel) => {
    if (isFinal) return;
    if (targetLevel === 4) {
      handleStatusChange(lead.id, "won");
    } else {
      const targetStatus = LINEAR_STATUS_MAP[targetLevel];
      if (targetStatus) handleStatusChange(lead.id, targetStatus);
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 9, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 12 }}>Pipeline Progress</div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 0, position: "relative" }}>
        {PIPELINE_PHASES.map((phase, idx) => {
          const IconComp = phaseIcons[phase.icon] || Inbox;

          // For the optional Meeting Booked phase:
          if (phase.isOptional) {
            return (
              <div key={phase.key} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}
                title={hasMeeting ? "Meeting scheduled by lead" : "No meeting booked (Optional step)"}
              >
                {/* Connector line before circle */}
                <div style={{
                  position: "absolute", top: 16, right: "50%", width: "100%", height: 2,
                  background: hasMeeting ? "linear-gradient(to right, #f97316, #ef4444)" : "rgba(255,255,255,0.06)",
                  zIndex: 0
                }} />

                {/* Circle */}
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: hasMeeting ? "rgba(239,68,68,0.18)" : "rgba(255,255,255,0.03)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  zIndex: 1, position: "relative",
                  boxShadow: hasMeeting ? "0 0 12px rgba(239,68,68,0.35)" : "none",
                  border: hasMeeting ? "2px solid #ef4444" : "1.5px dashed rgba(255,255,255,0.15)",
                  transition: "all 0.3s ease"
                }}>
                  <IconComp size={14} color={hasMeeting ? "#ef4444" : "#525252"} />
                </div>

                {/* Label */}
                <div style={{
                  marginTop: 8, fontSize: 9, fontWeight: hasMeeting ? 900 : 600,
                  color: hasMeeting ? "#ef4444" : "#525252",
                  textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center",
                  lineHeight: 1.3, maxWidth: 90
                }}>
                  {hasMeeting ? "Meeting Booked 🔥" : "Meeting (Optional)"}
                </div>

                {/* Subtext */}
                <div style={{ fontSize: 8, color: hasMeeting ? "#ef4444" : "#525252", marginTop: 3, fontWeight: 700 }}>
                  {hasMeeting ? "● BOOKED" : "SKIPPED"}
                </div>
              </div>
            );
          }

          // For standard linear phases (0, 1, 2, 3, 4):
          const lvl = phase.linearLevel;
          const isCompleted = lvl < currentLinearLevel;
          const isActive = lvl === currentLinearLevel;
          const isFuture = lvl > currentLinearLevel;
          const ts = lead[phase.tsField];
          const isWon = status === "won" && lvl === 4;
          const isLost = status === "lost" && lvl === 4;
          const circleColor = isCompleted ? "#22c55e" : isActive ? phase.color : isLost ? "#ef4444" : "rgba(255,255,255,0.08)";
          const circleGlow = isActive ? `0 0 16px ${phase.color}44` : isCompleted ? "0 0 8px rgba(34,197,94,0.3)" : "none";

          return (
            <div key={phase.key} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative", cursor: isFuture && !isFinal ? "pointer" : "default" }}
              onClick={() => isFuture && handleAdvanceClick(lvl)}
              title={isFuture && !isFinal ? `Advance to ${phase.label}` : ""}
            >
              {/* Connector line before circle */}
              {idx > 0 && (
                <div style={{
                  position: "absolute", top: 16, right: "50%", width: "100%", height: 2,
                  background: isCompleted || isActive ? `linear-gradient(to right, #22c55e, ${isActive ? phase.color : '#22c55e'})` : "rgba(255,255,255,0.06)",
                  zIndex: 0,
                  transition: "all 0.4s ease"
                }} />
              )}

              {/* Circle */}
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: circleColor,
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 1, position: "relative",
                boxShadow: circleGlow,
                border: isActive ? `2px solid ${phase.color}` : isFuture ? "2px solid rgba(255,255,255,0.08)" : "2px solid #22c55e",
                transition: "all 0.3s ease",
                animation: isActive ? "timelinePulse 2s infinite" : "none"
              }}>
                {isCompleted ? (
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1.5 5L5.5 9L12.5 1" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : (
                  <IconComp size={14} color={isActive ? "#fff" : isFuture ? "#525252" : "#fff"} />
                )}
              </div>

              {/* Label */}
              <div style={{
                marginTop: 8, fontSize: 9, fontWeight: isActive ? 900 : 700,
                color: isCompleted ? "#22c55e" : isActive ? phase.color : "#525252",
                textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center",
                lineHeight: 1.3, maxWidth: 90
              }}>
                {lvl === 4 && isLost ? "Lost ❌" : lvl === 4 && isWon ? "Won 🎉" : phase.label}
              </div>

              {/* Timestamp */}
              {(isCompleted || isActive) && ts && (
                <div style={{ fontSize: 8, color: "#737373", marginTop: 3, fontFamily: "monospace" }}>
                  {fmtTs(ts)}
                </div>
              )}
              {isActive && !ts && (
                <div style={{ fontSize: 8, color: phase.color, marginTop: 3, fontWeight: 700 }}>● CURRENT</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Won / Lost toggle for final phase */}
      {currentLinearLevel === 4 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
          <button onClick={() => handleStatusChange(lead.id, "won")}
            style={{ padding: "6px 16px", borderRadius: 8, border: `1.5px solid ${status === "won" ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.06)"}`, background: status === "won" ? "rgba(34,197,94,0.15)" : "transparent", color: status === "won" ? "#22c55e" : "#525252", fontSize: 9, fontWeight: 900, cursor: "pointer", textTransform: "uppercase", transition: "all 0.2s" }}
          >🎉 Won</button>
          <button onClick={() => handleStatusChange(lead.id, "lost")}
            style={{ padding: "6px 16px", borderRadius: 8, border: `1.5px solid ${status === "lost" ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.06)"}`, background: status === "lost" ? "rgba(239,68,68,0.15)" : "transparent", color: status === "lost" ? "#ef4444" : "#525252", fontSize: 9, fontWeight: 900, cursor: "pointer", textTransform: "uppercase", transition: "all 0.2s" }}
          >❌ Lost</button>
        </div>
      )}

      {/* Quick advance buttons when not at outcome */}
      {!isFinal && currentLinearLevel < 4 && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10, gap: 6 }}>
          <button onClick={() => handleAdvanceClick(currentLinearLevel + 1)}
            style={{ padding: "5px 14px", borderRadius: 8, background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", border: "none", fontSize: 9, fontWeight: 800, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.05em", boxShadow: "0 2px 8px rgba(249,115,22,0.25)", transition: "all 0.2s" }}
          >
            Advance to → {PIPELINE_PHASES.find(p => p.linearLevel === currentLinearLevel + 1)?.label}
          </button>
          <button onClick={() => handleStatusChange(lead.id, "lost")}
            style={{ padding: "5px 12px", borderRadius: 8, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", color: "#ef4444", fontSize: 9, fontWeight: 800, cursor: "pointer", textTransform: "uppercase" }}
          >
            Mark Lost
          </button>
        </div>
      )}

      <style>{`
        @keyframes timelinePulse {
          0%, 100% { box-shadow: 0 0 8px rgba(249,115,22,0.3); }
          50% { box-shadow: 0 0 20px rgba(249,115,22,0.5); }
        }
      `}</style>
    </div>
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
  logActivity,
  setFullScreenModalLead,
  isFullScreen,
  setActiveTab
}) {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [addingTask, setAddingTask] = useState(false);
  const [convertingClient, setConvertingClient] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [entryType, setEntryType] = useState("note"); // note, task, alert, followup
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [isSavingEntry, setIsSavingEntry] = useState(false);

  const uniqueTimeline = useMemo(() => {
    const list = [...(lead.timeline || [])];
    const dismissed = Array.isArray(lead.dismissedTasks) ? lead.dismissedTasks : [];

    // Auto-inject dynamic system action items (2-hour follow-up for fresh leads & 24-hour research for booked meetings)
    let leadCreatedDate = null;
    if (lead.createdAt) {
      leadCreatedDate = lead.createdAt.toDate ? lead.createdAt.toDate() : new Date(lead.createdAt.seconds ? lead.createdAt.seconds * 1000 : lead.createdAt);
    }
    const now = new Date();

    if (leadCreatedDate && !isNaN(leadCreatedDate)) {
      const timeDiffMs = now.getTime() - leadCreatedDate.getTime();
      const isMeetingBooked = Boolean(lead.meetingBooked || lead.status === "meeting_booked");

      const isResDismissed = dismissed.includes(`recent_meeting_res_${lead.id}`) ||
                             dismissed.includes(`sys_24h_research_${lead.id}`) ||
                             dismissed.includes(`Task: Conduct client background & account research`) ||
                             dismissed.some(d => typeof d === "string" && d.includes("background & account research"));

      const isFuDismissed = dismissed.includes(`recent_lead_fu_${lead.id}`) ||
                            dismissed.includes(`sys_2h_followup_${lead.id}`) ||
                            dismissed.includes(`Action Item: Set follow-up email within 2 hours`) ||
                            dismissed.some(d => typeof d === "string" && d.includes("follow-up email within 2 hours"));

      if (isMeetingBooked && !isResDismissed && timeDiffMs >= 0 && timeDiffMs <= 24 * 60 * 60 * 1000) {
        const due1d = new Date(leadCreatedDate.getTime() + 24 * 60 * 60 * 1000);
        list.unshift({
          id: `recent_meeting_res_${lead.id}`,
          type: "task",
          text: "Task: Conduct client background & account research",
          dueDate: due1d.toISOString().split("T")[0],
          dueTime: due1d.toTimeString().slice(0, 5),
          timestamp: leadCreatedDate,
          adminName: "System",
          isSystemGenerated: true
        });
      } else if (!isMeetingBooked && !isFuDismissed && (lead.status === "new" || !lead.status) && timeDiffMs >= 0 && timeDiffMs <= 2 * 60 * 60 * 1000) {
        const due2h = new Date(leadCreatedDate.getTime() + 2 * 60 * 60 * 1000);
        list.unshift({
          id: `recent_lead_fu_${lead.id}`,
          type: "followup",
          text: "Action Item: Set follow-up email within 2 hours",
          dueDate: due2h.toISOString().split("T")[0],
          dueTime: due2h.toTimeString().slice(0, 5),
          timestamp: leadCreatedDate,
          adminName: "System",
          isSystemGenerated: true
        });
      }
    }

    const seen = new Set();
    return list.filter(item => {
      const textVal = item.text || item.title || "";
      if (dismissed.includes(item.id) || dismissed.includes(textVal)) return false;
      const key = item.id || `${textVal}_${item.timestamp?.seconds || item.timestamp}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [lead.timeline, lead.dismissedTasks, lead.createdAt, lead.meetingBooked, lead.status, lead.id]);

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

  // Invoice states
  const [invoices, setInvoices] = useState([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);

  const fetchInvoices = async () => {
    if (!lead.id) return;
    setLoadingInvoices(true);
    try {
      const res = await fetch(`/api/invoices?leadId=${lead.id}`);
      const data = await res.json();
      if (data.success) {
        setInvoices(data.invoices);
      }
    } catch (err) {
      console.warn("Failed to load lead invoices:", err);
    } finally {
      setLoadingInvoices(false);
    }
  };

  useEffect(() => {
    setContracts([]);
    setInvoices([]);
    fetchContracts();
    fetchInvoices();
  }, [lead.id]);

  const handleGenerateNewContract = () => {
    if (!lead.id) return;
    router.push(`/admin-dashboard/contract-builder?leadId=${lead.id}`);
  };

  const handleGenerateNewInvoice = () => {
    if (!lead.id) return;
    router.push(`/admin-dashboard/invoice-builder?leadId=${lead.id}`);
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

  const handleDeleteInvoice = async (invoiceId, invoiceNum) => {
    if (!window.confirm(`Are you sure you want to permanently delete invoice ${invoiceNum}?`)) return;
    try {
      const res = await fetch(`/api/invoices/${invoiceId}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        alert("Invoice deleted successfully!");
        fetchInvoices();
      } else {
        alert("Failed to delete invoice: " + data.error);
      }
    } catch (err) {
      alert("Error deleting invoice: " + err.message);
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
    <div className="lead-expanded" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "20px", background: "rgba(10, 10, 12, 0.4)", borderRadius: "0 0 16px 16px" }}>
      {/* Hero Control Bar & Pipeline Tracker */}
      <div style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: "16px 20px", marginBottom: 20 }}>
        <PipelineTimeline lead={lead} handleStatusChange={handleStatusChange} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.03)", marginTop: 14, flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Source: <span style={{ color: "#f97316" }}>{lead.source || "Landing Page Form"}</span>
            </span>
            <span style={{ color: "rgba(255,255,255,0.1)" }}>•</span>
            <span style={{ fontSize: 10, color: "#71717a" }}>
              Submitted: <span style={{ color: "#e4e4e7" }}>{fmt(lead.createdAt)}</span>
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Priority Selector */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 9, fontWeight: 800, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.1em" }}>Priority:</span>
              <div style={{ display: "flex", background: "#09090b", borderRadius: 8, padding: 2, border: "1px solid rgba(255,255,255,0.08)" }}>
                {["low", "medium", "high"].map(p => (
                  <button key={p} onClick={() => handleUpdatePriority(lead.id, p)}
                    style={{ padding: "4px 10px", borderRadius: 6, border: "none", fontSize: 9, fontWeight: 900, textTransform: "uppercase", cursor: "pointer",
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

            {/* Quick Action Delete */}
            <button
              onClick={() => handleDeleteLead(lead.id)}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)", color: "#ef4444", cursor: "pointer", fontSize: 9, fontWeight: 800, textTransform: "uppercase", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.16)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.08)"}
            >
              <Trash2 size={12} /> Delete
            </button>

            {/* Full Screen Modal Toggle Button */}
            {!isFullScreen && setFullScreenModalLead && (
              <button
                type="button"
                onClick={() => setFullScreenModalLead(lead)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  borderRadius: 8,
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "#a1a1aa",
                  cursor: "pointer",
                  fontSize: 9,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(249, 115, 22, 0.14)";
                  e.currentTarget.style.border = "1px solid rgba(249, 115, 22, 0.3)";
                  e.currentTarget.style.color = "#f97316";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                  e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.color = "#a1a1aa";
                }}
                title="Open Client Detail in Full Screen Modal"
              >
                <Maximize2 size={12} /> Full Screen
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="lead-expanded-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 20 }}>
        {/* Left Side: Brief & Activity */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Inbound Brief */}
          <div style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)", borderLeft: "4px solid #f97316", borderRadius: 14, padding: "16px 20px" }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
              <span>💬</span> Inbound Brief &amp; Requirements
            </div>
            <p style={{ fontSize: 13, color: "#e4e4e7", lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>
              "{lead.notes || lead.challenge || "No brief message provided."}"
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: 8, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <History size={14} color="#f97316" /> Activity Timeline &amp; Notes Log
            </div>

            {/* Action & Task Creator Hub */}
            <div style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Type Switcher Tabs */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", background: "#08080a", padding: 4, borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)" }}>
                {[
                  { id: "note", label: "📝 Note", color: "#f97316" },
                  { id: "task", label: "⏰ Reminder Task", color: "#a855f7" },
                  { id: "alert", label: "🔔 Urgent Alert", color: "#ef4444" },
                  { id: "followup", label: "📅 Next Follow-Up", color: "#3b82f6" }
                ].map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setEntryType(type.id)}
                    style={{
                      flex: 1,
                      padding: "6px 10px",
                      borderRadius: 8,
                      border: "none",
                      fontSize: 10,
                      fontWeight: 800,
                      cursor: "pointer",
                      transition: "all 0.15s",
                      background: entryType === type.id ? type.color : "transparent",
                      color: entryType === type.id ? "#ffffff" : "#71717a",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {/* Note Preset Tags */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {["📞 Call Log", "📧 Email Sent", "📝 Meeting Notes", "💡 Strategy Note", "⚡ Action Item"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      if (!crmNote.includes(tag)) {
                        setCrmNote(prev => prev ? `${tag}: ${prev}` : `${tag}: `);
                      }
                    }}
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 6, padding: "3px 8px", color: "#a1a1aa", fontSize: 9, fontWeight: 700, cursor: "pointer", transition: "all 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)"; e.currentTarget.style.color = "#f97316"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#a1a1aa"; }}
                  >
                    + {tag}
                  </button>
                ))}
              </div>

              <textarea
                placeholder={
                  entryType === "task" ? "Describe task/reminder for this client..." :
                  entryType === "alert" ? "Describe urgent notification or alert..." :
                  entryType === "followup" ? "Log follow-up objective and notes..." :
                  "Log a call, email update, or internal note..."
                }
                value={crmNote}
                onChange={(e) => setCrmNote(e.target.value)}
                style={{ width: "100%", background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: 12, color: "#fff", fontSize: 12, resize: "none", height: 75, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
              />

              {/* Date & Time Selector Row for Tasks / Alerts / Follow-Ups */}
              {entryType !== "note" && (
                <div style={{ display: "flex", gap: 10, alignItems: "center", background: "rgba(255,255,255,0.02)", padding: "8px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
                    <Calendar size={13} color="#f97316" />
                    <span style={{ fontSize: 9, fontWeight: 800, color: "#a1a1aa", textTransform: "uppercase" }}>Due Date:</span>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={e => setDueDate(e.target.value)}
                      style={{ background: "none", border: "none", color: "#fff", fontSize: 11, fontWeight: 700, outline: "none", cursor: "pointer", colorScheme: "dark" }}
                    />
                  </div>
                  <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.1)" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
                    <Clock size={13} color="#a855f7" />
                    <span style={{ fontSize: 9, fontWeight: 800, color: "#a1a1aa", textTransform: "uppercase" }}>Time:</span>
                    <input
                      type="time"
                      value={dueTime}
                      onChange={e => setDueTime(e.target.value)}
                      style={{ background: "none", border: "none", color: "#fff", fontSize: 11, fontWeight: 700, outline: "none", cursor: "pointer", colorScheme: "dark" }}
                    />
                  </div>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  disabled={isSavingEntry}
                  onClick={async () => {
                    if (!crmNote.trim()) return;
                    setIsSavingEntry(true);
                    const res = await handleAddLeadNote(lead.id, crmNote, entryType, dueDate, dueTime);
                    setIsSavingEntry(false);
                    if (res === "done") {
                      setCrmNote("");
                      setDueDate("");
                      setDueTime("");
                    }
                  }}
                  style={{
                    background: entryType === "alert" ? "#ef4444" : entryType === "task" ? "#a855f7" : entryType === "followup" ? "#3b82f6" : "linear-gradient(135deg,#f97316,#ea580c)",
                    color: "#fff",
                    border: "none",
                    padding: "8px 20px",
                    borderRadius: 8,
                    fontSize: 10,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                  }}
                >
                  {isSavingEntry ? "Saving..." : entryType === "task" ? "Create Reminder Task" : entryType === "alert" ? "Trigger Alert" : entryType === "followup" ? "Schedule Follow-Up" : "Save Note"}
                </button>
              </div>
            </div>

            {/* Timeline Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 380, overflowY: "auto", paddingRight: 6 }}>
              {uniqueTimeline.length === 0 ? (
                <div style={{ padding: "30px 0", textAlign: "center", border: "1px dashed rgba(255,255,255,0.05)", borderRadius: 14 }}>
                  <div style={{ fontSize: 10, color: "#525252", fontWeight: 700, letterSpacing: "0.05em" }}>NO UPDATES LOGGED YET</div>
                </div>
              ) : (
                uniqueTimeline.map((item, idx) => {
                  const itemColor = item.type === "alert" ? "#ef4444" : item.type === "task" ? "#a855f7" : item.type === "followup" ? "#3b82f6" : "#f97316";
                  return (
                    <div key={idx} style={{ position: "relative", paddingLeft: 20, borderLeft: `2px solid ${itemColor}` }}>
                      <div style={{ position: "absolute", left: -5, top: 12, width: 8, height: 8, borderRadius: "50%", background: itemColor, boxShadow: `0 0 8px ${itemColor}` }} />
                      <div style={{ background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 11, fontWeight: 800, color: "#f1f5f9" }}>{item.adminName}</span>
                            {item.type && item.type !== "note" && (
                              <span style={{ fontSize: 8, fontWeight: 900, textTransform: "uppercase", padding: "1px 6px", borderRadius: 4, background: `${itemColor}15`, color: itemColor, border: `1px solid ${itemColor}30` }}>
                                {item.type}
                              </span>
                            )}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 9, color: "#71717a", fontFamily: "monospace" }}>{fmt(item.timestamp)} {fmtTime(item.timestamp)}</span>
                            {!item.isSystemGenerated && (
                              <button
                                onClick={() => handleDeleteLeadNote?.(lead.id, item.timestamp)}
                                style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", opacity: 0.6, display: "flex", alignItems: "center", padding: 0 }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = 0.6}
                                title="Delete entry"
                              >
                                <Trash2 size={11} />
                              </button>
                            )}
                          </div>
                        </div>
                        <div style={{ fontSize: 12, color: "#cbd5e1", lineHeight: 1.6 }}>
                          {item.text}
                        </div>
                        {(item.dueDate || item.dueTime) && (
                          <div style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 8px", background: "rgba(255,255,255,0.03)", borderRadius: 6, border: "1px solid rgba(255,255,255,0.05)", fontSize: 10, color: "#a1a1aa" }}>
                              <Clock size={11} color={itemColor} />
                              <span>Scheduled Due: <strong style={{ color: "#fff" }}>{item.dueDate || "Today"} {item.dueTime || ""}</strong></span>
                            </div>

                            {setActiveTab && (item.type === "followup" || (item.text && (item.text.toLowerCase().includes("email") || item.text.toLowerCase().includes("follow-up")))) && (
                              <button
                                type="button"
                                onClick={() => setActiveTab("newsletter")}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 5,
                                  padding: "3px 8px",
                                  borderRadius: 6,
                                  background: "rgba(249, 115, 22, 0.12)",
                                  border: "1px solid rgba(249, 115, 22, 0.3)",
                                  color: "#f97316",
                                  fontSize: 9,
                                  fontWeight: 800,
                                  cursor: "pointer",
                                  transition: "all 0.2s ease"
                                }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.background = "#f97316";
                                  e.currentTarget.style.color = "#ffffff";
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.background = "rgba(249, 115, 22, 0.12)";
                                  e.currentTarget.style.color = "#f97316";
                                }}
                                title="Open Email Designer to craft your follow-up email"
                              >
                                <Mail size={11} /> Email Designer →
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Quick Connect, Actionable Tasks & Commercials */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Quick Connect */}
          <div style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 14, padding: "14px 16px" }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 10 }}>Quick Connect</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {lead.whatsapp && lead.whatsapp !== "N/A" && (
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <a href={`https://wa.me/${lead.whatsapp.replace(/\D/g,"")}`} target="_blank" rel="noreferrer"
                    style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)", color: "#4ade80", fontSize: 11, fontWeight: 700, textDecoration: "none" }}>
                    <Phone size={13} /> {lead.whatsapp}
                  </a>
                  <button onClick={() => handleCopy(lead.whatsapp, 'phone')}
                    title="Copy Phone Number"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "#a3a3a3", cursor: "pointer", outline: "none", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#a3a3a3'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>
                    {copiedField === 'phone' ? <Check size={13} style={{ color: '#4ade80' }} /> : <Copy size={13} />}
                  </button>
                </div>
              )}
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <a href={`mailto:${lead.email}`}
                  style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "#fff", fontSize: 11, fontWeight: 700, textDecoration: "none" }}>
                    <Mail size={13} /> {lead.email}
                </a>
                <button onClick={() => handleCopy(lead.email, 'email')}
                  title="Copy Email Address"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "#a3a3a3", cursor: "pointer", outline: "none", transition: "all 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#a3a3a3'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>
                  {copiedField === 'email' ? <Check size={13} style={{ color: '#4ade80' }} /> : <Copy size={13} />}
                </button>
              </div>
              {setActiveTab && (
                <button
                  type="button"
                  onClick={() => setActiveTab("newsletter")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: 10,
                    background: "linear-gradient(135deg, rgba(249, 115, 22, 0.18), rgba(249, 115, 22, 0.08))",
                    border: "1px solid rgba(249, 115, 22, 0.35)",
                    color: "#f97316",
                    fontSize: 10,
                    fontWeight: 800,
                    cursor: "pointer",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#f97316";
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "linear-gradient(135deg, rgba(249, 115, 22, 0.18), rgba(249, 115, 22, 0.08))";
                    e.currentTarget.style.color = "#f97316";
                  }}
                  title="Launch Email Designer to draft follow-up templates"
                >
                  <Mail size={12} /> Launch Email Designer →
                </button>
              )}
            </div>
          </div>



          {/* Commercial Hub: Digital Contracts */}
          <div style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 14, padding: "14px 16px" }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Digital Contracts</span>
              {loadingContracts && <Loader size={10} className="animate-spin text-zinc-500" />}
            </div>

            {contracts.length === 0 ? (
              <div>
                <div style={{ fontSize: 10, color: "#525252", fontStyle: "italic", marginBottom: 10 }}>No agreements drafted yet.</div>
                <button
                  type="button"
                  onClick={handleGenerateNewContract}
                  style={{ width: "100%", background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", border: "none", borderRadius: 8, padding: "8px 12px", fontSize: 10, fontWeight: 800, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.05em" }}
                >
                  + Generate Contract
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
                    <div key={contract.id} style={{ display: "flex", flexDirection: "column", gap: 8, background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 12px", marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: "#fff" }}>{contract.contractNumber}</span>
                        <span style={{ fontSize: 8, fontWeight: 900, textTransform: "uppercase", color: statusCfg.color, background: statusCfg.bg, border: `1px solid ${statusCfg.border}`, padding: "2px 6px", borderRadius: 4 }}>
                          {statusCfg.label}
                        </span>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: 9, color: "#71717a" }}>
                        <div>Created: <span style={{ color: "#fff", fontWeight: 600 }}>{fmt(contract.createdAt)}</span></div>
                        <div>Expires: <span style={{ color: "#fff", fontWeight: 600 }}>{expiresStr}</span></div>
                      </div>

                      <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                        <button
                          type="button"
                          onClick={() => {
                            router.push(`/admin-dashboard/contract-builder?id=${contract.id}`);
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

          {/* Lead Invoices */}
          <div style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 14, padding: "14px 16px" }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 10 }}>
              Lead Invoices
            </div>
            <button
              type="button"
              onClick={handleGenerateNewInvoice}
              style={{ width: "100%", background: "linear-gradient(135deg,#ea580c,#c2410c)", color: "#fff", border: "none", borderRadius: 8, padding: "8px 12px", fontSize: 10, fontWeight: 800, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.05em" }}
            >
              + Generate Invoice
            </button>
          </div>

          {/* Client Conversion Widget */}
          {status === "won" && (
            <div style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 14, padding: "14px 16px" }}>
              <div style={{ fontSize: 9, fontWeight: 800, color: "#22c55e", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>Client Lifecycle</div>
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
          {/* Quick Actions Delete Lead */}
          <div style={{ marginTop: "6px", display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button onClick={() => handleDeleteLead(lead.id)}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", color: "#ef4444", cursor: "pointer", fontSize: 9, fontWeight: 800, textTransform: "uppercase" }}><Trash2 size={12} /> Delete Lead</button>
          </div>
        </div>
      </div>
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
  handleDeleteLeadNote,
  handleUpdateFollowUp,
  leadsCollectionName,
  handleStatusChange,
  handleDeleteLead,
  logActivity,
  expandedLead,
  setExpandedLead,
  setFullScreenModalLead,
  setActiveTab
}) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [hoveredDay, setHoveredDay] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null); // { dateStr, date, leads: [], meetings: [] }
  const panelRef = useRef(null);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const daysArray = Array.from({ length: Math.ceil((firstDay + daysInMonth) / 7) * 7 }, (_, i) => {
    const day = i - firstDay + 1;
    if (day > 0 && day <= daysInMonth) return day;
    return null;
  });

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Pre-bucket leads and meetings by date string for O(1) lookups
  const { leadsMap, meetingsMap } = useMemo(() => {
    const lMap = {};
    const mMap = {};

    (leads || []).forEach(l => {
      if (l.type === "booking_confirmation") return;
      if (l.createdAt?.toDate) {
        const dStr = l.createdAt.toDate().toDateString();
        if (!lMap[dStr]) lMap[dStr] = [];
        lMap[dStr].push(l);
      } else if (l.createdAt) {
        const dStr = new Date(l.createdAt).toDateString();
        if (!lMap[dStr]) lMap[dStr] = [];
        lMap[dStr].push(l);
      }

      if (l.meetingBooked || l.status === "hot") {
        if (l.followUpDate) {
          const mDate = new Date(l.followUpDate);
          if (!isNaN(mDate.getTime())) {
            const mDateStr = mDate.toDateString();
            if (!mMap[mDateStr]) mMap[mDateStr] = [];
            mMap[mDateStr].push(l);
          }
        } else if (l.createdAt?.toDate) {
          const dStr = l.createdAt.toDate().toDateString();
          if (!mMap[dStr]) mMap[dStr] = [];
          mMap[dStr].push(l);
        } else if (l.createdAt) {
          const dStr = new Date(l.createdAt).toDateString();
          if (!mMap[dStr]) mMap[dStr] = [];
          mMap[dStr].push(l);
        }
      }
    });
    return { leadsMap: lMap, meetingsMap: mMap };
  }, [leads]);

  const getDayData = (day) => {
    if (!day) return { leads: [], meetings: [] };
    const dateStr = new Date(currentYear, currentMonth, day).toDateString();
    return {
      leads: leadsMap[dateStr] || [],
      meetings: meetingsMap[dateStr] || []
    };
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Notice & Calendly Quick Access Banner */}
      <div style={{
        background: "rgba(249,115,22,0.08)",
        border: "1px solid rgba(249,115,22,0.18)",
        borderRadius: 14,
        padding: "12px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <AlertCircle size={16} color="#f97316" />
          <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>
            Please see Calendly for exact live meeting schedules &amp; booking timestamps.
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
            padding: "7px 16px",
            borderRadius: 8,
            fontSize: 10,
            fontWeight: 800,
            textTransform: "uppercase",
            textDecoration: "none",
            letterSpacing: "0.05em",
            transition: "all 0.2s ease",
            boxShadow: "0 4px 12px rgba(249,115,22,0.25)"
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#ea580c"}
          onMouseLeave={e => e.currentTarget.style.background = "#f97316"}
        >
          View Scheduled Meetings 🔗
        </a>
      </div>

      {/* Main Calendar Card Container */}
      <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: "20px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Calendar Header Bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", letterSpacing: "0.05em" }}>
              {monthName} {currentYear}
            </div>
            {/* Badges Legend */}
            <div style={{ display: "flex", gap: 10, fontSize: 10, color: "#a3a3a3", fontWeight: 600 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ padding: "0 5px", height: 16, borderRadius: 4, background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", color: "#f97316", fontSize: 9, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>L</div> New Leads
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ padding: "0 5px", height: 16, borderRadius: 4, background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e", fontSize: 9, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>M</div> Meetings
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => { setCurrentDate(new Date()); setSelectedDay(null); }}
              style={{
                background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                color: "#ffffff",
                padding: "6px 14px",
                fontSize: 10,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                boxShadow: "0 2px 10px rgba(249,115,22,0.35)",
                transition: "all 0.15s ease"
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              title="Reset calendar view to current month"
            >
              Today / Reset
            </button>
            <button
              onClick={handlePrevMonth}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 6, cursor: "pointer", color: "#a3a3a3", display: "flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, fontSize: 11, fontWeight: 900, transition: "all 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
            >
              ◀
            </button>
            <button
              onClick={handleNextMonth}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 6, cursor: "pointer", color: "#a3a3a3", display: "flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, fontSize: 11, fontWeight: 900, transition: "all 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
            >
              ▶
            </button>
          </div>
        </div>

        {/* 7-column Calendar Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
            <div key={d} style={{ textAlign: "center", fontSize: 9, fontWeight: 800, color: "#525252", paddingBottom: 6, textTransform: "uppercase" }}>{d}</div>
          ))}

          {daysArray.map((day, i) => {
            const { leads: dayLeads, meetings: dayMeetings } = getDayData(day);
            const leadsCount = dayLeads.length;
            const meetingsCount = dayMeetings.length;

            const isToday = day &&
              day === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear();

            return (
              <div
                key={i}
                onMouseEnter={() => day && setHoveredDay(i)}
                onMouseLeave={() => day && setHoveredDay(null)}
                onClick={() => {
                  if (!day) return;
                  const dateObj = new Date(currentYear, currentMonth, day);
                  const dateStr = dateObj.toDateString();
                  setSelectedDay({
                    dateStr,
                    date: dateObj,
                    leads: dayLeads,
                    meetings: dayMeetings
                  });
                }}
                style={{
                  minHeight: 105,
                  background: day ? (hoveredDay === i ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.015)") : "transparent",
                  border: isToday ? "1.5px solid rgba(249,115,22,0.6)" : "1px solid rgba(255,255,255,0.03)",
                  borderRadius: 12,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  position: "relative",
                  cursor: day ? "pointer" : "default",
                  transition: "all 0.15s ease",
                  boxShadow: isToday ? "0 0 12px rgba(249,115,22,0.15)" : "none"
                }}
              >
                {day && (
                  <>
                    <span style={{ fontSize: 11, fontWeight: 800, color: isToday ? "#f97316" : "#a3a3a3" }}>{day}</span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: "auto", width: "100%", justifyContent: "flex-start" }}>
                      {leadsCount > 0 && (
                        <div style={{ padding: "1px 6px", height: 16, borderRadius: 5, background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", color: "#f97316", fontSize: 9, fontWeight: 900, display: "flex", alignItems: "center", gap: 3 }} title={`${leadsCount} new leads`}>
                          <span>{leadsCount}</span><span>L</span>
                        </div>
                      )}
                      {meetingsCount > 0 && (
                        <div style={{ padding: "1px 6px", height: 16, borderRadius: 5, background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e", fontSize: 9, fontWeight: 900, display: "flex", alignItems: "center", gap: 3 }} title={`${meetingsCount} booked meetings`}>
                          <span>{meetingsCount}</span><span>M</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Day Modal Overlay */}
      {selectedDay && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
          padding: 16,
          boxSizing: "border-box"
        }}>
          <div
            ref={panelRef}
            style={{
              background: "#0d0d0d",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              width: "100%",
              maxWidth: 980,
              maxHeight: "88vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 24px 48px rgba(0,0,0,0.9)",
              overflow: "hidden"
            }}
          >
            {/* Modal Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 22px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Calendar size={16} color="#f97316" />
                <span style={{ fontSize: 13, fontWeight: 900, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {selectedDay.date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <button
                onClick={() => { setSelectedDay(null); setExpandedLead(null); }}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, cursor: "pointer", color: "#a3a3a3", display: "flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, fontSize: 12, fontWeight: 900, transition: "all 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: 22, overflowY: "auto", display: "flex", flexDirection: "column", gap: 20 }}>
              {/* New Inbound Leads Section */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 5, background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", color: "#f97316", fontSize: 9, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>L</div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    New Inbound Leads ({selectedDay.leads.length})
                  </span>
                </div>

                {selectedDay.leads.length === 0 ? (
                  <div style={{ fontSize: 11, color: "#525252", fontStyle: "italic", padding: "6px 0" }}>No new leads created on this date.</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {selectedDay.leads.map(lead => {
                      const isLeadOpen = expandedLead === lead.id;
                      const status = lead.status || "new";
                      const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.new;

                      return (
                        <div key={lead.id} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${isLeadOpen ? cfg.border : "rgba(255,255,255,0.04)"}`, borderRadius: 12, overflow: "hidden" }}>
                          <div
                            onClick={() => setExpandedLead(isLeadOpen ? null : lead.id)}
                            style={{ padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", background: isLeadOpen ? "rgba(255,255,255,0.03)" : "transparent" }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              {/* Avatar Initial Badge */}
                              <div style={{
                                width: 30,
                                height: 30,
                                borderRadius: 8,
                                background: getAlphabetGradient(lead.fullName),
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 12,
                                fontWeight: 900,
                                color: "#fff",
                                border: "2px solid #000"
                              }}>
                                {lead.fullName ? lead.fullName.trim()[0].toUpperCase() : "L"}
                              </div>
                              <div>
                                <div style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>{lead.fullName || "Unknown Lead"}</div>
                                <div style={{ fontSize: 10, color: "#71717a" }}>{lead.email} &bull; {lead.requestedService || "Direct Enquiry"}</div>
                              </div>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <StatusBadge status={status} />
                              <ChevronRight size={14} style={{ transform: isLeadOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s", color: "#525252" }} />
                            </div>
                          </div>

                          {/* Lead Expansion Detail */}
                          {isLeadOpen && (
                            <div style={{ padding: 16, borderTop: "1px solid rgba(255,255,255,0.05)", background: "#08080a" }}>
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
                                setFullScreenModalLead={setFullScreenModalLead}
                                setActiveTab={setActiveTab}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Booked Meetings / Appointments Section */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 5, background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e", fontSize: 9, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>M</div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Booked Meetings &amp; Scheduled Appointments ({selectedDay.meetings.length})
                  </span>
                </div>

                {selectedDay.meetings.length === 0 ? (
                  <div style={{ fontSize: 11, color: "#525252", fontStyle: "italic", padding: "6px 0" }}>No meetings booked on this date.</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {selectedDay.meetings.map(m => (
                      <div key={m.id} style={{ padding: "12px 14px", background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{
                            width: 30,
                            height: 30,
                            borderRadius: 8,
                            background: getAlphabetGradient(m.fullName),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 12,
                            fontWeight: 900,
                            color: "#fff",
                            border: "2px solid #000"
                          }}>
                            {m.fullName ? m.fullName.trim()[0].toUpperCase() : "M"}
                          </div>
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>{m.fullName || "Scheduled Meeting"}</div>
                            <div style={{ fontSize: 10, color: "#4ade80" }}>{m.requestedService || "Discovery Call"} &bull; {m.email}</div>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <a
                            href="https://calendly.com/app/scheduled_events/user/me"
                            target="_blank"
                            rel="noreferrer"
                            style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e", padding: "5px 12px", borderRadius: 6, fontSize: 9, fontWeight: 800, textDecoration: "none" }}
                          >
                            Open Calendly 🔗
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "flex-end", background: "rgba(255,255,255,0.01)" }}>
              <button
                onClick={() => { setSelectedDay(null); setExpandedLead(null); }}
                style={{
                  background: "#f97316",
                  border: "none",
                  borderRadius: 10,
                  padding: "8px 16px",
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#fff",
                  cursor: "pointer",
                  transition: "all 0.15s"
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                Close Panel
              </button>
            </div>
          </div>
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
  leadsCollectionName,
  setActiveTab
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
  const [fullScreenModalLead, setFullScreenModalLead] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setFullScreenModalLead(null);
        if (setExpandedLead) setExpandedLead(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setExpandedLead]);

  // Auto-scroll to the target expanded lead row when navigating from Overview tab
  useEffect(() => {
    if (expandedLead) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`lead-row-${expandedLead}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [expandedLead]);



  // Compute lead counts per status dynamically for visual filters
  const countsByStatus = useMemo(() => {
    const counts = { all: (leads || []).length };
    ["new", "hot", "qualified", "contacted", "proposal_sent", "won", "lost"].forEach(f => {
      counts[f] = (leads || []).filter(l => {
        const s = l.status || "new";
        if (s === "replied" && f === "contacted") return true;
        if (s === "cold" && f === "new") return true;
        if (s === "archived" && f === "new") return true;
        return s === f;
      }).length;
    });
    return counts;
  }, [leads]);

  // Compute recent (last 3 days) counts for Lead In & Meeting Booked
  const recent3dCounts = useMemo(() => {
    const now = new Date();
    const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
    const isRecent = (l) => {
      if (!l.createdAt) return false;
      const created = l.createdAt?.toDate ? l.createdAt.toDate() : new Date(l.createdAt);
      return (now - created) <= threeDaysMs;
    };

    return {
      new: (leads || []).filter(l => (l.status === "new" || l.status === "cold") && isRecent(l)).length,
      hot: (leads || []).filter(l => (l.status === "hot" || l.meetingBooked) && isRecent(l)).length,
    };
  }, [leads]);

  const applyDatePreset = (preset) => {
    if (preset === "ALL") {
      setStartDate("");
      setEndDate("");
      return;
    }
    const now = new Date();
    const endDateStr = now.toISOString().split("T")[0];
    let days = 7;
    if (preset === "1W") days = 7;
    if (preset === "1M") days = 30;
    if (preset === "3M") days = 90;
    if (preset === "6M") days = 180;
    if (preset === "1Y") days = 365;

    const pastDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    const startDateStr = pastDate.toISOString().split("T")[0];

    setStartDate(startDateStr);
    setEndDate(endDateStr);
  };

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
        if (s === "cold" && leadFilter === "new") return true;
        if (s === "archived" && leadFilter === "new") return true;
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
          {/* View Toggle (3 Views: List, Kanban, Calendar) */}
          <div className="lead-view-toggle" style={{ display: "flex", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 2 }}>
            <button
              onClick={() => setLeadViewMode("table")}
              style={{ padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", background: (leadViewMode === "table" || leadViewMode === "cards") ? "#f97316" : "transparent", color: (leadViewMode === "table" || leadViewMode === "cards") ? "#fff" : "#525252", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700 }}
              title="List View"
            >
              <List size={14} /> List
            </button>
            <button
              onClick={() => setLeadViewMode("kanban")}
              style={{ padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", background: leadViewMode === "kanban" ? "#f97316" : "transparent", color: leadViewMode === "kanban" ? "#fff" : "#525252", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700 }}
              title="Kanban Board"
            >
              <KanbanSquare size={14} /> Kanban
            </button>
            <button
              onClick={() => setLeadViewMode("calendar")}
              style={{ padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", background: leadViewMode === "calendar" ? "#f97316" : "transparent", color: leadViewMode === "calendar" ? "#fff" : "#525252", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700 }}
              title="Calendar View"
            >
              <Calendar size={14} /> Calendar
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
        </div>
      </div>

      {/* Analytics Mini-Dashboard */}
      <div className="leads-analytics" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
        <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.005) 100%)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "16px 20px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#a3a3a3", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Total Leads</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#fff" }}>{filteredLeads.length}</div>
        </div>
        <div style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0.01) 100%)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 16, padding: "16px 20px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Meetings Booked</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#10b981" }}>{filteredLeads.filter(l => l.meetingBooked).length}</div>
        </div>
        <div style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(249,115,22,0.01) 100%)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 16, padding: "16px 20px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Conversion Rate</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#f97316" }}>
            {filteredLeads.length ? Math.round((filteredLeads.filter(l => l.meetingBooked).length / filteredLeads.length) * 100) : 0}%
          </div>
        </div>
        {/* Needs Attention stat */}
        {(() => {
          const overdueCount = filteredLeads.filter(l => {
            const s = l.status || "new";
            if (s !== "new" && s !== "cold") return false;
            const created = l.createdAt?.toDate ? l.createdAt.toDate() : new Date();
            return (new Date() - created) / (1000 * 60 * 60) > 24;
          }).length;
          return overdueCount > 0 ? (
            <div style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(239,68,68,0.01) 100%)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 16, padding: "16px 20px", position: "relative" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                <Bell size={12} /> Needs Attention
              </div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#ef4444" }}>{overdueCount}</div>
              <div style={{ fontSize: 9, color: "#a3a3a3", marginTop: 2 }}>Research overdue (&gt;24h)</div>
            </div>
          ) : null;
        })()}
      </div>

      {leadViewMode !== "calendar" && (
        <>
          <div className="leads-controls" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {/* Search Bar Row with Integrated Priority Filter */}
        <div style={{ flex: 1, minWidth: "280px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "6px 8px 6px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
            <Search size={14} color="#525252" />
            <input
              type="text"
              placeholder="Search leads by name, email, or service…"
              value={leadSearch}
              onChange={e => setLeadSearch(e.target.value)}
              style={{ flex: 1, background: "none", border: "none", color: "#fff", fontSize: 12, fontWeight: 500, outline: "none" }}
            />
          </div>

          {/* Integrated Priority Filter */}
          <div className="leads-priority-filter" style={{ display: "flex", gap: 3, background: "rgba(255,255,255,0.03)", padding: "3px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)" }}>
            {["all", "low", "medium", "high"].map(p => (
              <button key={p} onClick={() => setPriorityFilter(p)}
                style={{
                  padding: "5px 11px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", transition: "all 0.15s",
                  background: priorityFilter === p ? (p === "all" ? "rgba(255,255,255,0.15)" : PRIORITY_CONFIG[p].bg) : "transparent",
                  color: priorityFilter === p ? (p === "all" ? "#fff" : PRIORITY_CONFIG[p].color) : "#525252",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Pipeline Stepper Filter Bar */}
        <div className="leads-filters" style={{ display: "flex", alignItems: "center", gap: 6, width: "100%", padding: "8px 12px", borderRadius: 14, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", overflowX: "auto", whiteSpace: "nowrap", scrollbarWidth: "none" }}>
          {/* Master ALL Filter Button */}
          <button
            onClick={() => setLeadFilter("all")}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              border: `1px solid ${leadFilter === "all" ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.06)"}`,
              cursor: "pointer",
              fontSize: 11,
              fontWeight: leadFilter === "all" ? 900 : 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              transition: "all 0.2s ease",
              background: leadFilter === "all" ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.02)",
              color: leadFilter === "all" ? "#fff" : "#71717a",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              flexShrink: 0
            }}
          >
            <span>All</span>
            <span style={{ fontSize: 9, fontWeight: 900, padding: "1px 6px", borderRadius: 100, background: leadFilter === "all" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)", color: "#fff" }}>
              {countsByStatus.all}
            </span>
          </button>

          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.08)", margin: "0 4px", flexShrink: 0 }} />

          {/* Sequential Phase Stepper Bar */}
          {["new", "hot", "qualified", "contacted", "proposal_sent", "won", "lost"].map((f, idx) => {
            const isSelected = leadFilter === f;
            const cfg = STATUS_CONFIG[f] || STATUS_CONFIG.new;
            const count = countsByStatus[f] || 0;

            return (
              <React.Fragment key={f}>
                {idx > 0 && (
                  <ChevronRight size={13} color="rgba(255,255,255,0.2)" style={{ margin: "0 1px", flexShrink: 0 }} />
                )}
                <button
                  onClick={() => setLeadFilter(f)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    border: `1px solid ${isSelected ? `${cfg.color}66` : "rgba(255,255,255,0.05)"}`,
                    cursor: "pointer",
                    fontSize: 10,
                    fontWeight: isSelected ? 900 : 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    transition: "all 0.2s ease",
                    background: isSelected ? `${cfg.color}15` : "rgba(255,255,255,0.02)",
                    color: cfg.color,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    boxShadow: isSelected ? `0 0 12px ${cfg.color}25` : "none",
                    flexShrink: 0
                  }}
                  onMouseEnter={e => {
                    if (!isSelected) {
                      e.currentTarget.style.background = `${cfg.color}10`;
                      e.currentTarget.style.borderColor = `${cfg.color}40`;
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                    }
                  }}
                >
                  {/* Step Number Badge */}
                  <span style={{
                    fontSize: 8,
                    fontWeight: 900,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: isSelected ? cfg.color : "rgba(255,255,255,0.08)",
                    color: isSelected ? "#000000" : cfg.color,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </span>

                  {/* Step Label */}
                  <span>{cfg.label}</span>

                  {/* Count Pill */}
                  <span style={{
                    fontSize: 9,
                    fontWeight: 900,
                    padding: "1px 6px",
                    borderRadius: 100,
                    background: isSelected ? `${cfg.color}30` : "rgba(255,255,255,0.06)",
                    color: isSelected ? "#ffffff" : "#a3a3a3"
                  }}>
                    {count}
                  </span>

                  {/* Recent Indicator Badges */}
                  {f === "new" && recent3dCounts.new > 0 && (
                    <span style={{ fontSize: 8, fontWeight: 900, background: "rgba(34,211,238,0.18)", color: "#22d3ee", border: "1px solid rgba(34,211,238,0.4)", borderRadius: 100, padding: "1px 5px", letterSpacing: "0.05em", animation: "pulse 2s infinite", flexShrink: 0 }}>
                      ✨ +{recent3dCounts.new} NEW
                    </span>
                  )}
                  {f === "hot" && recent3dCounts.hot > 0 && (
                    <span style={{ fontSize: 8, fontWeight: 900, background: "rgba(34,211,238,0.18)", color: "#22d3ee", border: "1px solid rgba(34,211,238,0.4)", borderRadius: 100, padding: "1px 5px", letterSpacing: "0.05em", animation: "pulse 2s infinite", flexShrink: 0 }}>
                      ✨ +{recent3dCounts.hot} NEW
                    </span>
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Advanced Filters (Date Preset Bar & Sort) */}
      <div className="leads-advanced-filters" style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <div className="leads-date-filter" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {/* Quick Date Range Preset Buttons (ALL, 1W, 1M, 3M, 6M, 1Y) */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "#0d0d0d",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12,
            padding: "3px 5px",
            flexWrap: "nowrap"
          }}>
            {(() => {
              // Determine active preset
              let activePreset = "ALL";
              if (!startDate && !endDate) {
                activePreset = "ALL";
              } else if (startDate && endDate) {
                const start = new Date(startDate);
                const end = new Date(endDate);
                const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24));
                if (diffDays >= 6 && diffDays <= 8) activePreset = "1W";
                else if (diffDays >= 28 && diffDays <= 32) activePreset = "1M";
                else if (diffDays >= 88 && diffDays <= 92) activePreset = "3M";
                else if (diffDays >= 175 && diffDays <= 185) activePreset = "6M";
                else if (diffDays >= 360 && diffDays <= 370) activePreset = "1Y";
                else activePreset = "CUSTOM";
              } else {
                activePreset = "CUSTOM";
              }

              const presets = [
                { label: "ALL", preset: "ALL" },
                { label: "1W", preset: "1W" },
                { label: "1M", preset: "1M" },
                { label: "3M", preset: "3M" },
                { label: "6M", preset: "6M" },
                { label: "1Y", preset: "1Y" },
              ];

              if (activePreset === "CUSTOM") {
                presets.push({ label: "CUSTOM", preset: "CUSTOM" });
              }

              return presets.map(({ label, preset }) => {
                const isPresetActive = activePreset === preset;

                return (
                  <button
                    key={preset}
                    onClick={() => {
                      if (preset !== "CUSTOM") {
                        applyDatePreset(preset);
                      }
                    }}
                    style={{
                      background: isPresetActive ? "#f97316" : "rgba(255,255,255,0.03)",
                      color: isPresetActive ? "#ffffff" : "#a3a3a3",
                      border: `1px solid ${isPresetActive ? "#f97316" : "rgba(255,255,255,0.04)"}`,
                      borderRadius: 8,
                      padding: "5px 10px",
                      fontSize: 10,
                      fontWeight: isPresetActive ? 900 : 700,
                      letterSpacing: "0.05em",
                      cursor: preset === "CUSTOM" ? "default" : "pointer",
                      transition: "all 0.15s ease",
                      boxShadow: isPresetActive ? "0 0 10px rgba(249,115,22,0.3)" : "none"
                    }}
                    onMouseEnter={e => {
                      if (!isPresetActive && preset !== "CUSTOM") {
                        e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                        e.currentTarget.style.color = "#fff";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isPresetActive && preset !== "CUSTOM") {
                        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                        e.currentTarget.style.color = "#a3a3a3";
                      }
                    }}
                  >
                    {label}
                  </button>
                );
              });
            })()}
          </div>

          {/* Grouped From & To Date Picker Unit */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "#0d0d0d",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12,
            padding: "8px 16px",
            transition: "border-color 0.2s"
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
          >
            {/* From Date picker part */}
            <div
              onClick={() => startInputRef.current?.showPicker()}
              style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
            >
              <Calendar size={14} color="#525252" style={{ marginRight: 2 }} />
              <span style={{ fontSize: 9, fontWeight: 800, color: "#a3a3a3", textTransform: "uppercase", letterSpacing: "0.1em" }}>From</span>
              <input
                ref={startInputRef}
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                style={{ background: "none", border: "none", color: "#fff", fontSize: 11, fontWeight: 700, outline: "none", cursor: "pointer", colorScheme: "dark" }}
              />
            </div>

            {/* Separator Divider Line */}
            <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.1)" }} />

            {/* To Date picker part */}
            <div
              onClick={() => endInputRef.current?.showPicker()}
              style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
            >
              <Calendar size={14} color="#525252" style={{ marginRight: 2 }} />
              <span style={{ fontSize: 9, fontWeight: 800, color: "#a3a3a3", textTransform: "uppercase", letterSpacing: "0.1em" }}>To</span>
              <input
                ref={endInputRef}
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                style={{ background: "none", border: "none", color: "#fff", fontSize: 11, fontWeight: 700, outline: "none", cursor: "pointer", colorScheme: "dark" }}
              />
            </div>
          </div>

          {(startDate || endDate) && (
            <button
              onClick={() => { setStartDate(""); setEndDate(""); }}
              style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", color: "#ef4444", fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", cursor: "pointer", padding: "8px 16px", borderRadius: 10, marginLeft: 2, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
            >
              Reset Dates
            </button>
          )}
        </div>

        {/* Sort Order Selector */}
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "8px 16px", color: "#fff", fontSize: 11, fontWeight: 700, outline: "none", cursor: "pointer", marginLeft: "auto" }}
        >
          <option value="desc">Sort: New to Old</option>
          <option value="asc">Sort: Old to New</option>
        </select>
      </div>

      {/* Reset All Filters Pill */}
      {(leadSearch || leadFilter !== "all" || priorityFilter !== "all" || ownerFilter !== "all" || sourceFilter !== "all" || sortOrder !== "desc") && (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => { setLeadSearch(""); setLeadFilter("all"); setPriorityFilter("all"); setOwnerFilter("all"); setSourceFilter("all"); setSortOrder("desc"); }}
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
              sourceFilter !== "all" && "Source"
            ].filter(Boolean).join(" · ")}
          </span>
        </div>
      )}
      </>
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
              <option value="new">Lead In</option>
              <option value="qualified">Researched</option>
              <option value="contacted">Contacted</option>
              <option value="hot">Meeting Booked 🔥</option>
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
            setFullScreenModalLead={setFullScreenModalLead}
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
            handleDeleteLeadNote={handleDeleteLeadNote}
            handleUpdateFollowUp={handleUpdateFollowUp}
            leadsCollectionName={leadsCollectionName}
            handleStatusChange={handleStatusChange}
            handleDeleteLead={handleDeleteLead}
            logActivity={logActivity}
            expandedLead={expandedLead}
            setExpandedLead={setExpandedLead}
            setFullScreenModalLead={setFullScreenModalLead}
            setActiveTab={setActiveTab}
          />
        ) : (
          <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 18, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1150 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <th style={{ padding: "16px 8px", width: 30, textAlign: "center" }}></th>
                  <th style={{ padding: "16px 12px", textAlign: "left", fontSize: 10, fontWeight: 900, color: "#333", textTransform: "uppercase", letterSpacing: "0.2em", whiteSpace: "nowrap", width: 240 }}>Status</th>
                  <th style={{ padding: "16px 8px", textAlign: "left", fontSize: 10, fontWeight: 900, color: "#333", textTransform: "uppercase", letterSpacing: "0.2em", whiteSpace: "nowrap", width: 60 }}>Prio</th>
                  <th style={{ padding: "16px 16px", textAlign: "left", fontSize: 10, fontWeight: 900, color: "#333", textTransform: "uppercase", letterSpacing: "0.2em", minWidth: 220 }}>Client</th>
                  <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 10, fontWeight: 900, color: "#333", textTransform: "uppercase", letterSpacing: "0.2em", minWidth: 280 }}>Service &amp; Source</th>
                  <th style={{ padding: "16px 12px", textAlign: "left", fontSize: 10, fontWeight: 900, color: "#333", textTransform: "uppercase", letterSpacing: "0.2em", whiteSpace: "nowrap", width: 100 }}>Date</th>
                  <th style={{ padding: "16px 24px", textAlign: "right", fontSize: 10, fontWeight: 900, color: "#333", textTransform: "uppercase", letterSpacing: "0.2em", whiteSpace: "nowrap", width: 140 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map(lead => {
                  const status = lead.status || "new";
                  const created = lead.createdAt?.toDate ? lead.createdAt.toDate() : new Date();
                  const ageDays = (new Date() - created) / (1000 * 60 * 60 * 24);
                  const isTableOpen = expandedLead === lead.id;
                  return (
                    <React.Fragment key={lead.id}>
                      <tr
                        id={`lead-row-${lead.id}`}
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.02)", cursor: "pointer", transition: "background 0.2s" }}
                        onClick={() => { setExpandedLead(isTableOpen ? null : lead.id); setCrmNote(""); }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.01)"}
                        onMouseLeave={e => e.currentTarget.style.background = "none"}
                      >
                      <td style={{ padding: "14px 8px", textAlign: "center" }}>
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
                      <td style={{ padding: "14px 12px", whiteSpace: "nowrap", width: 240 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "nowrap" }}>
                          <StatusBadge status={status} />
                          {((status === "new" || status === "cold" || status === "hot" || lead.meetingBooked) && ageDays <= 3) && (
                            <span style={{ fontSize: 8, fontWeight: 900, color: "#22d3ee", background: "rgba(34,211,238,0.15)", border: "1px solid rgba(34,211,238,0.4)", borderRadius: 100, padding: "2px 7px", textTransform: "uppercase", letterSpacing: "0.05em", animation: "pulse 2s infinite", whiteSpace: "nowrap", flexShrink: 0 }}>
                              ✨ NEW
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: "14px 8px", whiteSpace: "nowrap", width: 60 }}>
                        {lead.priority === "high" ? (
                          <span style={{ fontSize: 9, fontWeight: 900, color: PRIORITY_CONFIG.high.color, textTransform: "uppercase" }}>High</span>
                        ) : (
                          <span style={{ fontSize: 9, fontWeight: 700, color: "#333", textTransform: "uppercase" }}>{lead.priority || "Low"}</span>
                        )}
                      </td>
                      <td style={{ padding: "14px 16px", minWidth: 240, whiteSpace: "nowrap" }}>
                        {(() => {
                          const letterGradient = getAlphabetGradient(lead.fullName);
                          return (
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              {/* First Name Initial Avatar Box */}
                              <div style={{
                                width: 32,
                                height: 32,
                                borderRadius: 8,
                                background: letterGradient,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 13,
                                fontWeight: 900,
                                color: "#ffffff",
                                flexShrink: 0,
                                boxShadow: "0 3px 10px rgba(0,0,0,0.3)"
                              }}>
                                {lead.fullName ? lead.fullName.trim()[0].toUpperCase() : "L"}
                              </div>

                              <div style={{ display: "flex", flexDirection: "column", gap: 2, overflow: "hidden" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, overflow: "hidden" }}>
                                  <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{lead.fullName || "Unknown"}</span>
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
                                <div style={{ fontSize: 11, color: "#737373", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{lead.email}</div>
                              </div>
                            </div>
                          );
                        })()}
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
                        <div style={{ fontSize: 9, color: "#737373", fontFamily: "monospace" }}>{fmtTime(lead.createdAt)}</div>
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
                          {(status === "new" || status === "cold") && ageDays > 1 && (
                            <span style={{
                              fontSize: 8, fontWeight: 900, color: "#ef4444",
                              background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)",
                              borderRadius: 4, padding: "1px 4px", textTransform: "uppercase",
                              animation: "pulse 2s infinite"
                            }}>
                              OVERDUE
                            </span>
                          )}
                          {(status === "contacted" || status === "qualified") && ageDays > 3 && (
                            <span style={{
                              fontSize: 8, fontWeight: 900, color: "#a855f7",
                              background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.25)",
                              borderRadius: 4, padding: "1px 4px", textTransform: "uppercase"
                            }}>
                              PROPOSAL
                            </span>
                          )}
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
                      <td style={{ padding: "14px 24px", textAlign: "right", whiteSpace: "nowrap", width: 160 }}>
                        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", alignItems: "center" }}>
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
                              fontSize: 12,
                              transition: "all 0.15s"
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = "rgba(56,189,248,0.15)"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "rgba(56,189,248,0.08)"; }}
                            title="Email Outreach"
                          >
                            <Mail size={14} />
                          </a>
                          <button onClick={(e) => { e.stopPropagation(); handleDeleteLead(lead.id); }} style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={12} /></button>
                          {/* Animated Arrow Chevron */}
                          <div style={{
                            width: 26,
                            height: 26,
                            borderRadius: 8,
                            background: isTableOpen ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.03)",
                            border: `1px solid ${isTableOpen ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.06)"}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s ease",
                            transform: isTableOpen ? "rotate(90deg)" : "none",
                            color: isTableOpen ? "#f97316" : "#525252"
                          }}>
                            <ChevronRight size={14} />
                          </div>
                        </div>
                      </td>
                    </tr>
                    {isTableOpen && (
                      <tr>
                        <td colSpan={7} style={{
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
                            setFullScreenModalLead={setFullScreenModalLead}
                            setActiveTab={setActiveTab}
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

      {/* Full Screen Client Detail Modal */}
      {fullScreenModalLead && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999999,
          background: "rgba(9, 9, 11, 0.96)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        }}>
          {/* Modal Header Bar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 32px",
            background: "#0d0d0d",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.6)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: getAlphabetGradient(fullScreenModalLead.fullName),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 900,
                color: "#ffffff",
                border: "3px solid #000000",
                boxShadow: "0 4px 12px #000000"
              }}>
                {fullScreenModalLead.fullName ? fullScreenModalLead.fullName.trim()[0].toUpperCase() : "L"}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
                    {fullScreenModalLead.fullName || "Client Detail View"}
                  </h2>
                  <StatusBadge status={fullScreenModalLead.status || "new"} />
                </div>
                <div style={{ fontSize: 11, color: "#71717a", marginTop: 2 }}>
                  {fullScreenModalLead.email} &bull; {fullScreenModalLead.requestedService || "Direct Lead"}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button
                type="button"
                onClick={() => {
                  setFullScreenModalLead(null);
                  if (setExpandedLead) setExpandedLead(null);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 18px",
                  borderRadius: 10,
                  background: "rgba(239,68,68,0.12)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#ef4444",
                  fontSize: 11,
                  fontWeight: 800,
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.25)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.12)"}
              >
                <Minimize2 size={14} /> Exit Full Screen (Esc)
              </button>
            </div>
          </div>

          {/* Modal Content Area */}
          <div style={{ flex: 1, overflowY: "auto", padding: "28px 40px" }}>
            <div style={{ maxWidth: 1440, margin: "0 auto" }}>
              <LeadDetailPanel
                lead={fullScreenModalLead}
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
                handleDeleteLead={(id) => { handleDeleteLead(id); setFullScreenModalLead(null); }}
                logActivity={logActivity}
                isFullScreen={true}
                setActiveTab={setActiveTab}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
