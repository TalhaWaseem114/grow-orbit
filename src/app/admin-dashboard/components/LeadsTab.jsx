"use client";

import React, { useMemo, useRef, useState } from "react";
import { 
  LayoutGrid, List, KanbanSquare, Download, Search, Calendar, ChevronRight, 
  Phone, Mail, Trash2, History, AlertCircle 
} from "lucide-react";

import KanbanBoard from "./KanbanBoard";

/* ─────────────────────────────────────────
   CONFIGS & HELPERS
───────────────────────────────────────── */
const STATUS_CONFIG = {
  new:      { label: "New",      color: "#f97316", bg: "rgba(249,115,22,0.12)",  border: "rgba(249,115,22,0.25)" },
  replied:  { label: "Replied",  color: "#22d3ee", bg: "rgba(34,211,238,0.10)",  border: "rgba(34,211,238,0.25)" },
  archived: { label: "Archived", color: "#71717a", bg: "rgba(113,113,122,0.10)", border: "rgba(113,113,122,0.2)"  },
  hot:      { label: "Hot 🔥",   color: "#ef4444", bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.25)"  },
};

const PRIORITY_CONFIG = {
  high:   { label: "High Priority", color: "#ef4444", bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.25)" },
  medium: { label: "Medium",        color: "#f97316", bg: "rgba(249,115,22,0.12)",  border: "rgba(249,115,22,0.25)" },
  low:    { label: "Low",           color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.25)" },
};

const fmt = d => d?.toDate ? d.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
const fmtTime = d => d?.toDate ? d.toDate().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : "";

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.new;
  return (
    <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
      style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}>
      {cfg.label}
    </span>
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
  exportLeads
}) {
  const startInputRef = useRef(null);
  const endInputRef = useRef(null);

  /* Bulk Actions State */
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [isPerformingBulkAction, setIsPerformingBulkAction] = useState(false);

  const toggleLeadSelection = (leadId) => {
    setSelectedLeads(prev => prev.includes(leadId) ? prev.filter(id => id !== leadId) : [...prev, leadId]);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) setSelectedLeads(filteredLeads.map(l => l.id));
    else setSelectedLeads([]);
  };

  const performBulkAction = async (actionType, value = null) => {
    if (!selectedLeads.length || isPerformingBulkAction) return;
    setIsPerformingBulkAction(true);
    try {
      if (actionType === "delete") {
        if (!window.confirm(`Are you sure you want to delete ${selectedLeads.length} leads?`)) return;
        await Promise.all(selectedLeads.map(id => handleDeleteLead(id)));
      } else if (actionType === "status") {
        await Promise.all(selectedLeads.map(id => handleStatusChange(id, value)));
      } else if (actionType === "assign") {
        const admin = users.find(u => u.uid === value || u.id === value);
        await Promise.all(selectedLeads.map(id => handleAssignLead(id, value, admin?.fullName || admin?.displayName || "Admin")));
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
    if (leadFilter !== "all") res = res.filter(l => (l.status || "new") === leadFilter);
    if (priorityFilter !== "all") res = res.filter(l => (l.priority || "low") === priorityFilter);
    if (ownerFilter !== "all") {
      if (ownerFilter === "unassigned") res = res.filter(l => !l.assignedTo);
      else res = res.filter(l => l.assignedTo === ownerFilter);
    }
    if (sourceFilter !== "all") {
      res = res.filter(l => (l.source || "Direct") === sourceFilter);
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

    return res;
  }, [leads, leadFilter, priorityFilter, ownerFilter, sourceFilter, leadSearch, startDate, endDate]);

  return (
    <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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
          </div>

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

      {/* Search + Filter bar */}
      <div className="leads-controls" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <div style={{ flex: "1 1 300px", display: "flex", alignItems: "center", gap: 10, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "10px 16px" }}>
          <Search size={14} color="#525252" />
          <input
            type="text"
            placeholder="Search leads by name, email, or service…"
            value={leadSearch}
            onChange={e => setLeadSearch(e.target.value)}
            style={{ flex: 1, background: "none", border: "none", color: "#fff", fontSize: 12, fontWeight: 500, outline: "none" }}
          />
        </div>
        <div className="leads-filters" style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["all", "new", "hot", "replied", "archived"].map(f => (
            <button key={f} onClick={() => setLeadFilter(f)}
              style={{ padding: "8px 14px", borderRadius: 10, border: "1px solid", cursor: "pointer", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", transition: "all 0.15s",
                background: leadFilter === f ? (f === "all" ? "rgba(255,255,255,0.08)" : STATUS_CONFIG[f]?.bg || "rgba(255,255,255,0.08)") : "transparent",
                color: leadFilter === f ? (f === "all" ? "#fff" : STATUS_CONFIG[f]?.color || "#fff") : "#525252",
                borderColor: leadFilter === f ? (f === "all" ? "rgba(255,255,255,0.15)" : STATUS_CONFIG[f]?.border || "rgba(255,255,255,0.1)") : "rgba(255,255,255,0.04)",
              }}
            >
              {f === "all" ? `All (${leads.length})` : f}
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
        {/* Owner Filter */}
        <select
          value={ownerFilter}
          onChange={e => setOwnerFilter(e.target.value)}
          style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "8px 16px", color: "#fff", fontSize: 11, fontWeight: 700, outline: "none", cursor: "pointer" }}
        >
          <option value="all">All Owners</option>
          <option value="unassigned">Unassigned</option>
          {users.filter(u => u.role === "admin").map(u => (
            <option key={u.id || u.uid} value={u.id || u.uid}>{u.fullName || u.displayName || u.email}</option>
          ))}
        </select>

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
              <option value="replied">Replied</option>
              <option value="hot">Hot 🔥</option>
              <option value="archived">Archived</option>
            </select>
            <select
              onChange={(e) => { if(e.target.value) performBulkAction("assign", e.target.value); e.target.value = ""; }}
              style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 10px", color: "#fff", fontSize: 10, outline: "none", cursor: "pointer" }}
            >
              <option value="">Assign Owner...</option>
              {users.filter(u => u.role === "admin").map(u => (
                <option key={u.id || u.uid} value={u.id || u.uid}>{u.fullName || u.displayName || u.email}</option>
              ))}
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
        <div style={{ textAlign: "center", padding: "60px 0", color: "#333" }}>
          <p style={{ fontSize: 12, fontWeight: 600 }}>No leads match this filter.</p>
        </div>
      ) : (
        leadViewMode === "kanban" ? (
          <KanbanBoard 
            leads={filteredLeads}
            handleStatusChange={handleStatusChange}
            setExpandedLead={setExpandedLead}
            setLeadViewMode={setLeadViewMode}
          />
        ) : leadViewMode === "cards" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filteredLeads.map(lead => {
              const isOpen = expandedLead === lead.id;
              const status = lead.status || "new";
              const priority = lead.priority || "low";
              const cfg = STATUS_CONFIG[status];

              return (
                <div key={lead.id} style={{ background: "#0d0d0d", border: `1px solid ${isOpen ? cfg.border : "rgba(255,255,255,0.05)"}`, borderRadius: 18, overflow: "hidden", transition: "border-color 0.2s" }}>
                  {/* Card header — always visible */}
                  <div
                    className="lead-card-header"
                    onClick={() => { setExpandedLead(isOpen ? null : lead.id); setCrmNote(""); }}
                    style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}
                  >
                    {/* Checkbox */}
                    <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 8 }}>
                      <input
                        type="checkbox"
                        checked={selectedLeads.includes(lead.id)}
                        onChange={() => toggleLeadSelection(lead.id)}
                        onClick={e => e.stopPropagation()}
                        style={{ width: 16, height: 16, accentColor: "#f97316", cursor: "pointer" }}
                      />
                    </div>
                    {/* Avatar */}
                    <div className="lead-avatar" style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${cfg.color}33, ${cfg.color}11)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 900, color: cfg.color, flexShrink: 0 }}>
                      {lead.fullName?.[0] || "L"}
                    </div>
                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="lead-badges" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{lead.fullName || "Unknown"}</span>
                        <StatusBadge status={status} />
                        {lead.meetingBooked && (
                          <span style={{ fontSize: 9, fontWeight: 700, color: "#10b981", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 100, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                            🗓️ Booked
                          </span>
                        )}
                        {lead.priority === "high" && (
                          <span style={{ fontSize: 9, fontWeight: 700, color: PRIORITY_CONFIG.high.color, background: PRIORITY_CONFIG.high.bg, border: `1px solid ${PRIORITY_CONFIG.high.border}`, borderRadius: 100, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                            HIGH PRIORITY
                          </span>
                        )}
                        <span style={{ fontSize: 9, fontWeight: 700, color: "#525252", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 100, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                          {lead.source || "Direct"}
                        </span>
                        {lead.nextFollowUp && new Date(lead.nextFollowUp) < new Date(new Date().setHours(0,0,0,0)) && status !== "archived" && status !== "hot" && (
                           <span style={{ fontSize: 9, fontWeight: 800, color: "#ef4444", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 100, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                             ⏰ OVERDUE
                           </span>
                        )}
                        {lead.whatsapp && lead.whatsapp !== "N/A" && (
                          <span style={{ fontSize: 9, fontWeight: 700, color: "#4ade80", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 100, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                            WA
                          </span>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                        <span style={{ fontSize: 11, color: "#525252" }}>{lead.email}</span>
                        {lead.assignedName && (
                          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#4ade80" }} />
                            <span style={{ fontSize: 9, fontWeight: 700, color: "#a3a3a3", textTransform: "uppercase" }}>Owned by {lead.assignedName}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Right */}
                    <div className="lead-right-info" style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 10, color: "#333", fontFamily: "monospace" }}>{fmt(lead.createdAt)}</div>
                        <div style={{ fontSize: 10, color: "#2a2a2a", fontFamily: "monospace" }}>{fmtTime(lead.createdAt)}</div>
                      </div>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "none" }}>
                        <ChevronRight size={14} color="#525252" />
                      </div>
                    </div>
                  </div>

                  {/* Expanded */}
                  {isOpen && (
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
                      <div className="lead-expanded-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20 }}>
                        {/* Left Side: History & Activity */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                          <div style={{ fontSize: 10, fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
                            <History size={14} color="#f97316" /> ACTIVITY TIMELINE
                          </div>

                          {/* Add Note Box */}
                          <div style={{ background: "rgba(249,115,22,0.03)", border: "1px solid rgba(249,115,22,0.1)", borderRadius: 12, padding: 12 }}>
                            <textarea
                              placeholder="Log a call, email update, or internal note..."
                              value={crmNote}
                              onChange={(e) => setCrmNote(e.target.value)}
                              style={{ width: "100%", background: "none", border: "none", color: "#fff", fontSize: 12, resize: "none", height: 60, outline: "none", marginBottom: 8 }}
                            />
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                              <button
                                onClick={async () => {
                                  const res = await handleAddLeadNote(lead.id, crmNote);
                                  if (res === "done") setCrmNote("");
                                }}
                                style={{ background: "#f97316", color: "#fff", border: "none", padding: "6px 14px", borderRadius: 8, fontSize: 10, fontWeight: 800, textTransform: "uppercase", cursor: "pointer" }}
                              >
                                Add Update
                              </button>
                            </div>
                          </div>

                          {/* Timeline Items */}
                          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 300, overflowY: "auto", paddingRight: 8 }}>
                            {(lead.timeline || []).length === 0 ? (
                              <div style={{ padding: "20px 0", textAlign: "center", border: "1px dashed rgba(255,255,255,0.05)", borderRadius: 12 }}>
                                <div style={{ fontSize: 10, color: "#333", fontWeight: 700 }}>NO UPDATES LOGGED YET</div>
                              </div>
                            ) : (
                              lead.timeline.map((item, idx) => (
                                <div key={idx} style={{ position: "relative", paddingLeft: 16, borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
                                  <div style={{ position: "absolute", left: -4, top: 4, width: 7, height: 7, borderRadius: "50%", background: "#f97316", border: "2px solid #0d0d0d" }} />
                                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                    <span style={{ fontSize: 10, fontWeight: 800, color: "#fff" }}>{item.adminName}</span>
                                    <span style={{ fontSize: 9, color: "#333", fontFamily: "monospace" }}>{fmt(item.timestamp)} {fmtTime(item.timestamp)}</span>
                                  </div>
                                  <div style={{ fontSize: 11, color: "#a3a3a3", lineHeight: 1.5, background: "rgba(255,255,255,0.02)", padding: "8px 12px", borderRadius: "0 10px 10px 10px" }}>
                                    {item.text}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* Right Side: Brief & Actions */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 12, padding: "14px 16px" }}>
                            <div style={{ fontSize: 9, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 8 }}>Inbound Brief</div>
                            <p style={{ fontSize: 12, color: "#a3a3a3", lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>
                              "{lead.notes || lead.challenge || "No brief provided."}"
                            </p>
                          </div>

                          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 12, padding: "14px 16px" }}>
                            <div style={{ fontSize: 9, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 8 }}>Quick Connect</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                              {lead.whatsapp && lead.whatsapp !== "N/A" && (
                                <a href={`https://wa.me/${lead.whatsapp.replace(/\D/g,"")}`} target="_blank" rel="noreferrer"
                                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px", borderRadius: 10, background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.1)", color: "#4ade80", fontSize: 11, fontWeight: 700, textDecoration: "none" }}>
                                  <Phone size={12} /> {lead.whatsapp}
                                </a>
                              )}
                              <a href={`mailto:${lead.email}`}
                                style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", color: "#fff", fontSize: 11, fontWeight: 700, textDecoration: "none" }}>
                                  <Mail size={12} /> {lead.email}
                              </a>
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
                              {lead.nextFollowUp && new Date(lead.nextFollowUp) < new Date(new Date().setHours(0,0,0,0)) && status !== "archived" && (
                                <span style={{ fontSize: 9, fontWeight: 800, color: "#ef4444", background: "rgba(239,68,68,0.1)", padding: "4px 8px", borderRadius: 6, textTransform: "uppercase" }}>
                                  Overdue
                               </span>
                              )}
                            </div>
                          </div>

                          {/* Pipeline Status */}
                          <div style={{ marginTop: "auto" }}>
                            <div style={{ fontSize: 9, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 8 }}>Move Stage</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                              {["new", "hot", "replied", "archived"].map(s => (
                                <button key={s} onClick={() => handleStatusChange(lead.id, s)}
                                  style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid", cursor: "pointer", fontSize: 9, fontWeight: 700, textTransform: "uppercase", transition: "all 0.15s",
                                    background: status === s ? STATUS_CONFIG[s].bg : "transparent",
                                    color: status === s ? STATUS_CONFIG[s].color : "#525252",
                                    borderColor: status === s ? STATUS_CONFIG[s].border : "rgba(255,255,255,0.06)",
                                  }}
                                >{s}</button>
                              ))}
                              <button onClick={() => handleDeleteLead(lead.id)}
                                style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 18, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <th style={{ padding: "16px 24px", width: 40, textAlign: "center" }}>
                    <input type="checkbox" onChange={handleSelectAll} checked={filteredLeads.length > 0 && selectedLeads.length === filteredLeads.length} style={{ accentColor: "#f97316", cursor: "pointer" }} />
                  </th>
                  <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 10, fontWeight: 900, color: "#333", textTransform: "uppercase", letterSpacing: "0.2em" }}>Status</th>
                  <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 10, fontWeight: 900, color: "#333", textTransform: "uppercase", letterSpacing: "0.2em" }}>Prio</th>
                  <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 10, fontWeight: 900, color: "#333", textTransform: "uppercase", letterSpacing: "0.2em" }}>Client</th>
                  <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 10, fontWeight: 900, color: "#333", textTransform: "uppercase", letterSpacing: "0.2em" }}>Owner</th>
                  <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 10, fontWeight: 900, color: "#333", textTransform: "uppercase", letterSpacing: "0.2em" }}>Service</th>
                  <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 10, fontWeight: 900, color: "#333", textTransform: "uppercase", letterSpacing: "0.2em" }}>Source</th>
                  <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 10, fontWeight: 900, color: "#333", textTransform: "uppercase", letterSpacing: "0.2em" }}>Date</th>
                  <th style={{ padding: "16px 24px", textAlign: "right", fontSize: 10, fontWeight: 900, color: "#333", textTransform: "uppercase", letterSpacing: "0.2em" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map(lead => {
                  const status = lead.status || "new";
                  return (
                    <tr key={lead.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.01)"} onMouseLeave={e => e.currentTarget.style.background = "none"}>
                      <td style={{ padding: "14px 24px", textAlign: "center" }}>
                        <input type="checkbox" checked={selectedLeads.includes(lead.id)} onChange={() => toggleLeadSelection(lead.id)} style={{ accentColor: "#f97316", cursor: "pointer" }} />
                      </td>
                      <td style={{ padding: "14px 24px" }}><StatusBadge status={status} /></td>
                      <td style={{ padding: "14px 24px" }}>
                        {lead.priority === "high" ? (
                          <span style={{ fontSize: 9, fontWeight: 900, color: PRIORITY_CONFIG.high.color, textTransform: "uppercase" }}>High</span>
                        ) : (
                          <span style={{ fontSize: 9, fontWeight: 700, color: "#333", textTransform: "uppercase" }}>{lead.priority || "Low"}</span>
                        )}
                      </td>
                      <td style={{ padding: "14px 24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{lead.fullName || "Unknown"}</span>
                          {lead.nextFollowUp && new Date(lead.nextFollowUp) < new Date(new Date().setHours(0,0,0,0)) && status !== "archived" && status !== "hot" && (
                             <span style={{ fontSize: 9, fontWeight: 800, color: "#ef4444", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 100, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                               ⏰ OVERDUE
                             </span>
                          )}
                          {lead.meetingBooked && (
                            <span style={{ fontSize: 8, fontWeight: 800, color: "#10b981", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", padding: "1.5px 5.5px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              Booked
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: 11, color: "#525252" }}>{lead.email}</div>
                      </td>
                      <td style={{ padding: "14px 24px" }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: lead.assignedName ? "#fff" : "#333" }}>
                          {lead.assignedName || "Unassigned"}
                        </span>
                      </td>
                      <td style={{ padding: "14px 24px" }}>
                        <span style={{ fontSize: 10, fontWeight: 800, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.05em", background: "rgba(249,115,22,0.05)", padding: "4px 10px", borderRadius: 6 }}>
                          {lead.requestedService || "General"}
                        </span>
                      </td>
                      <td style={{ padding: "14px 24px" }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#a3a3a3" }}>{lead.source || "Inbound"}</span>
                      </td>
                      <td style={{ padding: "14px 24px" }}>
                        <div style={{ fontSize: 11, color: "#fff", fontFamily: "monospace" }}>{fmt(lead.createdAt)}</div>
                        <div style={{ fontSize: 9, color: "#333", fontFamily: "monospace" }}>{fmtTime(lead.createdAt)}</div>
                      </td>
                      <td style={{ padding: "14px 24px", textAlign: "right" }}>
                        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                          <button onClick={() => { setLeadViewMode("cards"); setExpandedLead(lead.id); }} style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", color: "#a3a3a3", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>VIEW</button>
                          <button onClick={() => handleDeleteLead(lead.id)} style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={12} /></button>
                        </div>
                      </td>
                    </tr>
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
