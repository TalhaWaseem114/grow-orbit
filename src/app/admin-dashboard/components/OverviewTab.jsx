"use client";

import React from "react";
import { 
  Users, Briefcase, Activity, TrendingUp, AlertCircle, ArrowUpRight, Calendar 
} from "lucide-react";

/* ─────────────────────────────────────────
   HELPERS & CONFIGS
───────────────────────────────────────── */
const STATUS_CONFIG = {
  new:      { label: "New",      color: "#f97316", bg: "rgba(249,115,22,0.12)",  border: "rgba(249,115,22,0.25)" },
  replied:  { label: "Replied",  color: "#22d3ee", bg: "rgba(34,211,238,0.10)",  border: "rgba(34,211,238,0.25)" },
  archived: { label: "Archived", color: "#71717a", bg: "rgba(113,113,122,0.10)", border: "rgba(113,113,122,0.2)"  },
  hot:      { label: "Hot 🔥",   color: "#ef4444", bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.25)"  },
};

const fmt = d => d?.toDate ? d.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

/* ─────────────────────────────────────────
   SUBCOMPONENTS
───────────────────────────────────────── */
function StatCard({ title, value, sub, icon: Icon, accent, delta }) {
  return (
    <div className="relative rounded-2xl p-6 overflow-hidden border"
      style={{ 
        background: accent ? "rgba(249,115,22,0.06)" : "#0d0d0d", 
        borderColor: accent ? "rgba(249,115,22,0.2)" : "rgba(255,255,255,0.05)" 
      }}
    >
      {accent && <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.08),transparent_60%)]" />}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accent ? "#f9a06a" : "#525252" }}>{title}</span>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ 
              background: accent ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.04)", 
              color: accent ? "#f97316" : "#525252" 
            }}
          >
            <Icon size={15} />
          </div>
        </div>
        <div className="text-3xl font-black tracking-tight text-white mb-1">{value}</div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium" style={{ color: "#525252" }}>{sub}</span>
          {delta && (
            <span className="text-[9px] font-black flex items-center gap-0.5 text-emerald-400">
              <TrendingUp size={9} /> {delta}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

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
export default function OverviewTab({
  currentTime,
  users,
  leads,
  newLeadsCount,
  conversionRate,
  isMobile,
  setActiveTab
}) {
  return (
    <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Greeting */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div style={{ 
            fontSize: 11, 
            fontWeight: 700, 
            color: "#f97316", 
            letterSpacing: "0.3em", 
            textTransform: "uppercase", 
            marginBottom: 6 
          }}>
            Good {currentTime.getHours() < 12 ? "morning" : currentTime.getHours() < 17 ? "afternoon" : "evening"}
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1 }}>Command Overview</h1>
        </div>
        {newLeadsCount > 0 && (
          <button 
            onClick={() => setActiveTab("leads")} 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 8, 
              background: "rgba(249,115,22,0.12)", 
              border: "1px solid rgba(249,115,22,0.25)", 
              borderRadius: 12, 
              padding: "10px 16px", 
              cursor: "pointer", 
              color: "#f97316" 
            }}
          >
            <AlertCircle size={14} />
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>{newLeadsCount} new leads</span>
            <ArrowUpRight size={13} />
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5, 1fr)", gap: 14 }}>
        <StatCard title="Active Leads"   value={leads.length}  sub="All time enquiries"     icon={Briefcase} accent />
        <StatCard title="New Leads"      value={newLeadsCount} sub="Awaiting response"      icon={Activity} />
        <StatCard title="Booked Meetings" value={leads.filter(l => l.meetingBooked).length} sub="Calendly bookings" icon={Calendar} />
        <StatCard title="Conversion Est" value={conversionRate} sub="Interest-to-Lead ratio" icon={TrendingUp} />
        <StatCard title="Total Users"    value={users.length}  sub="Registered accounts"    icon={Users} />
      </div>

      {/* Recent leads quick view */}
      <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Recent Lead Activity</div>
          <button 
            onClick={() => setActiveTab("leads")} 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 5, 
              fontSize: 10, 
              fontWeight: 700, 
              color: "#f97316", 
              background: "none", 
              border: "none", 
              cursor: "pointer", 
              textTransform: "uppercase", 
              letterSpacing: "0.15em" 
            }}
          >
            View all <ArrowUpRight size={12} />
          </button>
        </div>
        {leads.slice(0, 5).map((lead, i) => (
          <div key={lead.id} style={{ display: "flex", alignItems: "center", gap: isMobile ? 12 : 16, padding: isMobile ? "12px 16px" : "14px 24px", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.03)" : "none" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
            onMouseLeave={e => e.currentTarget.style.background = "none"}
          >
            <div style={{ width: isMobile ? 32 : 36, height: isMobile ? 32 : 36, borderRadius: 10, background: "linear-gradient(135deg, rgba(249,115,22,0.2), rgba(249,115,22,0.05))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? 12 : 13, fontWeight: 900, color: "#f97316", flexShrink: 0 }}>
              {lead.fullName?.[0] || "L"}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{lead.fullName || "Unknown"}</div>
              <div style={{ fontSize: 10, color: "#666", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{lead.requestedService}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
              <StatusBadge status={lead.status || "new"} />
              <div style={{ fontSize: 9, color: "#525252", fontFamily: "monospace" }}>{fmt(lead.createdAt)}</div>
            </div>
          </div>
        ))}
        {leads.length === 0 && (
          <div style={{ padding: "32px 24px", textAlign: "center", color: "#333", fontSize: 12 }}>
            No leads received yet.
          </div>
        )}
      </div>

      {/* Users quick view */}
      <div className="overview-quick-grids" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
        <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: isMobile ? "16px" : "20px 24px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Admin Users</div>
          {users.filter(u => u.role?.trim() === "admin").map(u => (
            <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: isMobile ? 28 : 32, height: isMobile ? 28 : 32, borderRadius: 8, background: "rgba(249,115,22,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#f97316", flexShrink: 0 }}>
                {(u.displayName || u.fullName || "A")[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.displayName || u.fullName || "Admin"}</div>
                <div style={{ fontSize: 9, color: "#666", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.email}</div>
              </div>
            </div>
          ))}
          {users.filter(u => u.role?.trim() === "admin").length === 0 && (
            <p style={{ fontSize: 11, color: "#333" }}>No admin accounts found.</p>
          )}
        </div>
        <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: isMobile ? "16px" : "20px 24px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Lead Sources</div>
          {Object.entries(leads.reduce((acc, l) => { const k = l.source || "Direct"; acc[k] = (acc[k] || 0) + 1; return acc; }, {})).slice(0, 4).map(([src, count]) => (
            <div key={src} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 11, color: "#a3a3a3", fontWeight: 600 }}>{src}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: isMobile ? 40 : 60, height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", background: "#f97316", width: `${leads.length > 0 ? (count / leads.length) * 100 : 0}%`, borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#f97316", minWidth: 16, textAlign: "right" }}>{count}</span>
              </div>
            </div>
          ))}
          {leads.length === 0 && <p style={{ fontSize: 11, color: "#333" }}>No leads yet.</p>}
        </div>
      </div>
    </div>
  );
}
