"use client";

import React, { useState } from "react";
import { calculateLeadScore, getScoreCategory, calculateLeadPriority } from "@/lib/crmHelpers";
import { Phone, Mail } from "lucide-react";

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
  archived:      { label: "Archived",         color: "#71717a", bg: "rgba(113,113,122,0.10)", border: "rgba(113,113,122,0.2)"  },
};

export default function KanbanBoard({ 
  leads, 
  handleStatusChange, 
  setExpandedLead, 
  setLeadViewMode 
}) {
  const columns = ["new", "hot", "qualified", "contacted", "proposal_sent", "won", "lost"];
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [draggingId, setDraggingId] = useState(null);

  const handleDragStart = (e, leadId) => {
    e.dataTransfer.setData("leadId", leadId);
    setDraggingId(leadId);
    requestAnimationFrame(() => { e.target.style.opacity = "0.4"; });
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
    setDraggingId(null);
    setDragOverColumn(null);
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    setDragOverColumn(null);
    const leadId = e.dataTransfer.getData("leadId");
    if (leadId) {
      handleStatusChange(leadId, targetStatus);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ 
      display: "flex", 
      gap: 16, 
      overflowX: "auto", 
      paddingBottom: 16, 
      minHeight: "65vh",
      alignItems: "flex-start"
    }}>
      <style>{`
        @keyframes badgePop {
          0% { transform: scale(0.8); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      {columns.map(status => {
        const columnLeads = leads.filter(l => {
          const s = l.status || "new";
          if (s === "replied" && status === "contacted") return true;
          if (s === "cold" && status === "new") return true;
          if (s === "archived" && status === "new") return true;
          return s === status;
        });
        const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.new;

        // Calculate Average Age in days
        const avgAge = columnLeads.length
          ? (columnLeads.reduce((acc, l) => {
              const created = l.createdAt?.toDate ? l.createdAt.toDate() : new Date();
              const days = (new Date() - created) / (1000 * 60 * 60 * 24);
              return acc + days;
            }, 0) / columnLeads.length).toFixed(1)
          : null;

        // Count Overdue leads in column
        const overdueCount = columnLeads.filter(l => 
          l.nextFollowUp && 
          new Date(l.nextFollowUp) < new Date(new Date().setHours(0,0,0,0)) && 
          status !== "won" && status !== "lost"
        ).length;

        // Calculate total column revenue value
        const totalValue = columnLeads.reduce((acc, l) => acc + (Number(l.estimatedDealValue) || 0), 0);
        
        return (
          <div 
            key={status}
            onDrop={(e) => handleDrop(e, status)}
            onDragOver={handleDragOver}
            onDragEnter={() => setDragOverColumn(status)}
            onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setDragOverColumn(null); }}
            style={{
              flex: "0 0 280px",
              background: dragOverColumn === status ? `${cfg.color}0A` : "rgba(255,255,255,0.02)",
              border: `1px solid ${dragOverColumn === status ? cfg.color + "40" : "rgba(255,255,255,0.05)"}`,
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              transition: "all 0.2s ease"
            }}
          >
            {/* Column Header */}
            <div style={{ 
              padding: "16px", 
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              flexDirection: "column",
              gap: 6
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: cfg.color }} />
                  <h3 style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "#fff" }}>
                    {cfg.label}
                  </h3>
                </div>
                <span 
                  key={columnLeads.length}
                  style={{ 
                    fontSize: 9, 
                    fontWeight: 700, 
                    color: "#a3a3a3", 
                    background: "rgba(255,255,255,0.05)", 
                    padding: "2px 8px", 
                    borderRadius: 100,
                    animation: "badgePop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) both"
                  }}
                >
                  {columnLeads.length}
                </span>
              </div>
              {/* Additional Column Stats */}
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                {avgAge !== null && (
                  <span style={{ 
                    fontSize: 9, 
                    color: Number(avgAge) > 2 ? "#ef4444" : "#525252", 
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 3
                  }}>
                    {Number(avgAge) > 2 && "⚠️ "}Age: {avgAge}d
                  </span>
                )}
                {totalValue > 0 && (
                  <span style={{ fontSize: 9, color: "#a3a3a3", fontWeight: 750 }}>
                    ${totalValue.toLocaleString()}
                  </span>
                )}
                {overdueCount > 0 && (
                  <span style={{ 
                    fontSize: 8, 
                    fontWeight: 900, 
                    color: "#ef4444", 
                    background: "rgba(239,68,68,0.1)", 
                    border: "1px solid rgba(239,68,68,0.2)", 
                    padding: "1px 6px", 
                    borderRadius: 6,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                  }}>
                    ⚠️ {overdueCount} Overdue
                  </span>
                )}
              </div>
            </div>

            {/* Column Body */}
            <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10, flex: 1, minHeight: 100 }}>
              {columnLeads.map(lead => {
                const isOverdue = lead.nextFollowUp && new Date(lead.nextFollowUp) < new Date(new Date().setHours(0,0,0,0)) && status !== "won" && status !== "lost";
                const score = calculateLeadScore(lead);
                const scoreCat = getScoreCategory(score);
                
                // Calculate lead age in days
                const created = lead.createdAt?.toDate ? lead.createdAt.toDate() : new Date();
                const ageDays = (new Date() - created) / (1000 * 60 * 60 * 24);
                const priority = calculateLeadPriority(lead);
                
                return (
                  <div 
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead.id)}
                    onDragEnd={handleDragEnd}
                    onClick={() => {
                      setExpandedLead(lead.id);
                      setLeadViewMode("cards"); // Switch to cards to show expansion
                    }}
                    style={{
                      background: "#0d0d0d",
                      border: `1px solid ${isOverdue ? "rgba(239,68,68,0.35)" : "rgba(255,255,255,0.08)"}`,
                      boxShadow: isOverdue ? "0 0 10px rgba(239,68,68,0.05)" : "none",
                      borderRadius: 12,
                      padding: 12,
                      cursor: "grab",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = isOverdue ? "#ef4444" : cfg.color}
                    onMouseLeave={e => e.currentTarget.style.borderColor = isOverdue ? "rgba(239,68,68,0.35)" : "rgba(255,255,255,0.08)"}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{lead.fullName || "Unknown"}</span>
                        {isOverdue && (
                           <span style={{ fontSize: 8, fontWeight: 800, color: "#ef4444", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 100, padding: "2px 6px", textTransform: "uppercase" }}>
                             ⏰
                           </span>
                        )}
                      </div>
                      {priority === "high" && (
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444" }} title="High Priority" />
                      )}
                    </div>
                    
                    <div style={{ fontSize: 10, color: "#a3a3a3", marginBottom: 8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {lead.requestedService || lead.email}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color: "#525252", background: "rgba(255,255,255,0.03)", padding: "2px 6px", borderRadius: 4, textTransform: "uppercase" }}>
                          {lead.source || "Direct"}
                        </span>
                        {/* 
                        <span style={{ 
                          fontSize: 8, 
                          fontWeight: 900, 
                          color: scoreCat.color, 
                          background: scoreCat.bg, 
                          border: `1px solid ${scoreCat.border}`, 
                          padding: "1px 5px", 
                          borderRadius: 4 
                        }} title={`Lead Score: ${score}`}>
                          {score}
                        </span>
                        */}
                        {/* Individual Lead Card Age */}
                        <span style={{ 
                          fontSize: 9, 
                          fontWeight: 700, 
                          color: ageDays > 2 ? "#ef4444" : "#525252", 
                          display: "inline-flex", 
                          alignItems: "center", 
                          gap: 3 
                        }}>
                          {ageDays > 2 && "⚠️ "}Age: {ageDays.toFixed(1)}d
                        </span>
                        {/* Cold Risk Warning Badge */}
                        {ageDays > 7 && (
                          <span style={{ 
                            fontSize: 8, 
                            fontWeight: 900, 
                            color: "#22d3ee", 
                            background: "rgba(34,211,238,0.10)", 
                            border: "1px solid rgba(34,211,238,0.25)", 
                            borderRadius: 4, 
                            padding: "2px 6px", 
                            textTransform: "uppercase", 
                            letterSpacing: "0.05em" 
                          }}>
                            COLD RISK ❄️
                          </span>
                        )}
                      </div>
                      
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        {lead.whatsapp && lead.whatsapp !== "N/A" && (
                          <a 
                            href={`https://wa.me/${lead.whatsapp.replace(/\D/g,"")}?text=${encodeURIComponent(
                              `Hi ${lead.fullName || ""}, I'm reaching out from Grow Orbit regarding your interest in ${lead.requestedService || "our services"}. I'd love to connect and see how we can help you scale!`
                            )}`}
                            target="_blank" 
                            rel="noreferrer"
                            onClick={e => e.stopPropagation()}
                            style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", cursor: "pointer", color: "#4ade80", transition: "opacity 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.opacity = 0.7}
                            onMouseLeave={e => e.currentTarget.style.opacity = 1}
                            title="WhatsApp Outreach"
                          >
                            <Phone size={12} />
                          </a>
                        )}
                        <a 
                          href={`mailto:${lead.email}`}
                          onClick={e => e.stopPropagation()}
                          style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", cursor: "pointer", color: "#38bdf8", transition: "opacity 0.2s" }}
                          onMouseEnter={e => e.currentTarget.style.opacity = 0.7}
                          onMouseLeave={e => e.currentTarget.style.opacity = 1}
                          title="Email Outreach"
                        >
                          <Mail size={12} />
                        </a>
                        {lead.assignedName && (
                          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#333", color: "#fff", fontSize: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }} title={`Assigned to ${lead.assignedName}`}>
                            {lead.assignedName[0]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {columnLeads.length === 0 && (
                <div style={{ textAlign: "center", padding: "20px 0", color: "#525252", fontSize: 10, fontWeight: 600 }}>
                  No leads
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
