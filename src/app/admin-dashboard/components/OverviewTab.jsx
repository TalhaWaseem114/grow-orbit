"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  Users, Briefcase, Activity, TrendingUp, AlertCircle, ArrowUpRight, Calendar,
  Flame, Clock, CheckCircle2, MessageSquare, Terminal, Search, Download, Trash2, RefreshCw
} from "lucide-react";
import { collection, query, orderBy, limit, where, onSnapshot, doc, updateDoc, serverTimestamp, getDocs, writeBatch } from "firebase/firestore";

/* ─────────────────────────────────────────
   HELPERS & CONFIGS
───────────────────────────────────────── */
const STATUS_CONFIG = {
  new:           { label: "New",            color: "#f97316", bg: "rgba(249,115,22,0.12)",  border: "rgba(249,115,22,0.25)" },
  contacted:     { label: "Contacted",      color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.25)" },
  qualified:     { label: "Qualified",      color: "#10b981", bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.25)" },
  hot:           { label: "Hot 🔥",          color: "#ef4444", bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.25)"  },
  proposal_sent: { label: "Proposal Sent",  color: "#a855f7", bg: "rgba(168,85,247,0.12)",  border: "rgba(168,85,247,0.25)" },
  won:           { label: "Won 🎉",          color: "#22c55e", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.25)"  },
  lost:          { label: "Lost ❌",         color: "#ef4444", bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.2)"   },
  cold:          { label: "Cold (New) ❄️",    color: "#22d3ee", bg: "rgba(34,211,238,0.10)",  border: "rgba(34,211,238,0.25)" },
  replied:       { label: "Replied",        color: "#22d3ee", bg: "rgba(34,211,238,0.10)",  border: "rgba(34,211,238,0.25)" },
  archived:      { label: "Archived",       color: "#71717a", bg: "rgba(113,113,122,0.10)", border: "rgba(113,113,122,0.2)"  },
};

const getLogBadgeStyle = (action) => {
  switch (action) {
    case "PROMOTE_ADMIN":
      return { bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.2)", color: "#4ade80" };
    case "REVOKE_ADMIN":
      return { bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.2)", color: "#ef4444" };
    case "UPDATE_PERMISSIONS":
      return { bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.2)", color: "#f97316" };
    case "DELETE_LEAD":
    case "DELETE_USER":
      return { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.25)", color: "#ef4444" };
    case "CLEAR_LOGS":
      return { bg: "rgba(168,85,247,0.1)", border: "rgba(168,85,247,0.2)", color: "#a855f7" };
    case "UPDATE_SETTINGS":
      return { bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.2)", color: "#3b82f6" };
    case "CONVERT_CLIENT":
      return { bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.25)", color: "#22c55e" };
    case "UPDATE_LEAD_STATUS":
      return { bg: "rgba(168,85,247,0.1)", border: "rgba(168,85,247,0.2)", color: "#a855f7" };
    case "NEW_LEAD":
      return { bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.2)", color: "#f97316" };
    case "MEETING_BOOKED":
      return { bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.2)", color: "#22c55e" };
    default:
      return { bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.08)", color: "#a3a3a3" };
  }
};

const fmt = d => d?.toDate ? d.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

function OverviewMiniCalendar({ leads }) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [hoveredDay, setHoveredDay] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null); // { dateStr, date, leads: [], meetings: [] }

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 (Sun) to 6 (Sat)

  const daysArray = Array.from({ length: 42 }, (_, i) => {
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
  const { leadsMap, meetingsMap } = React.useMemo(() => {
    const lMap = {};
    const mMap = {};

    (leads || []).forEach(l => {
      if (l.createdAt?.toDate) {
        const dStr = l.createdAt.toDate().toDateString();
        if (!lMap[dStr]) lMap[dStr] = [];
        lMap[dStr].push(l);
      }
      if (l.meetingBooked) {
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
    <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em" }}>Activity Calendar</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {!isCurrentMonth && (
            <button
              onClick={() => setCurrentDate(new Date())}
              style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 6, cursor: "pointer", color: "#f97316", padding: "3px 8px", fontSize: 9, fontWeight: 800, transition: "all 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(249,115,22,0.15)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(249,115,22,0.1)"}
            >
              Today
            </button>
          )}
          <button
            onClick={handlePrevMonth}
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 6, cursor: "pointer", color: "#a3a3a3", display: "flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, fontSize: 10, fontWeight: 900, transition: "all 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
          >
            ◀
          </button>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", minWidth: 90, textAlign: "center", letterSpacing: "0.05em" }}>{monthName} {currentYear}</div>
          <button
            onClick={handleNextMonth}
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 6, cursor: "pointer", color: "#a3a3a3", display: "flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, fontSize: 10, fontWeight: 900, transition: "all 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
          >
            ▶
          </button>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, fontSize: 10, color: "#a3a3a3", fontWeight: 600 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ padding: "0 4px", height: 14, borderRadius: 4, background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", color: "#f97316", fontSize: 8, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>L</div> New Leads
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ padding: "0 4px", height: 14, borderRadius: 4, background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e", fontSize: 8, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>M</div> Meetings
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, flex: 1 }}>
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
          <div key={d} style={{ textAlign: "center", fontSize: 9, fontWeight: 800, color: "#525252", paddingBottom: 8 }}>{d}</div>
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
                aspectRatio: "1",
                background: day ? (hoveredDay === i ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)") : "transparent",
                border: isToday ? "1px solid rgba(249,115,22,0.5)" : "1px solid rgba(255,255,255,0.02)",
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "4px 2px",
                position: "relative",
                cursor: day ? "pointer" : "default",
                transition: "all 0.15s ease"
              }}
            >
              {day && (
                <>
                  <span style={{ fontSize: 10, fontWeight: 700, color: isToday ? "#f97316" : "#a3a3a3" }}>{day}</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: "auto", paddingBottom: 2, width: "100%", justifyContent: "center" }}>
                    {leadsCount > 0 && <div style={{ minWidth: 16, padding: "0 3px", height: 14, borderRadius: 4, background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", color: "#f97316", fontSize: 8, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }} title={`${leadsCount} leads`}>{leadsCount}L</div>}
                    {meetingsCount > 0 && <div style={{ minWidth: 16, padding: "0 3px", height: 14, borderRadius: 4, background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e", fontSize: 8, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }} title={`${meetingsCount} meetings`}>{meetingsCount}M</div>}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal Overlay */}
      {selectedDay && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: 16,
          boxSizing: "border-box"
        }}>
          <div style={{
            background: "#0d0d0d",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            width: "100%",
            maxWidth: 480,
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 24px 48px rgba(0,0,0,0.8)",
            overflow: "hidden"
          }}>
            {/* Modal Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Calendar size={16} color="#f97316" />
                <span style={{ fontSize: 13, fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {selectedDay.date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <button
                onClick={() => setSelectedDay(null)}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8, cursor: "pointer", color: "#a3a3a3", display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, fontSize: 12, fontWeight: 900, transition: "all 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: 20, overflowY: "auto", display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Leads Section */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", color: "#f97316", fontSize: 8, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>L</div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#a3a3a3", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    New Leads ({selectedDay.leads.length})
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {selectedDay.leads.length === 0 ? (
                    <div style={{ fontSize: 11, color: "#525252", fontStyle: "italic", padding: "10px 0" }}>
                      No new leads generated on this day.
                    </div>
                  ) : (
                    selectedDay.leads.map(l => (
                      <div key={l.id} style={{ padding: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {l.fullName || "Unknown Lead"}
                          </div>
                          <div style={{ fontSize: 10, color: "#525252", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {l.email || "No Email"} &middot; {l.source || "Direct"}
                          </div>
                        </div>
                        <StatusBadge status={l.status || "new"} />
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Meetings Section */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e", fontSize: 8, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>M</div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#a3a3a3", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Meetings Scheduled ({selectedDay.meetings.length})
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {selectedDay.meetings.length === 0 ? (
                    <div style={{ fontSize: 11, color: "#525252", fontStyle: "italic", padding: "10px 0" }}>
                      No strategy sessions scheduled on this day.
                    </div>
                  ) : (
                    selectedDay.meetings.map(m => (
                      <div key={m.id} style={{ padding: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {m.fullName || "Unknown Lead"}
                          </div>
                          <div style={{ fontSize: 10, color: "#525252", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {m.email || "No Email"} &middot; {m.followUpDate ? new Date(m.followUpDate).toLocaleDateString() : "Scheduled"}
                          </div>
                        </div>
                        <StatusBadge status={m.status || "new"} />
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div style={{ padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "flex-end", background: "rgba(255,255,255,0.01)" }}>
              <button
                onClick={() => setSelectedDay(null)}
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
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

/* Animated count-up hook */
function useCountUp(target, duration = 600) {
  const [value, setValue] = useState(0);
  const prevTarget = useRef(0);
  useEffect(() => {
    const start = prevTarget.current;
    const diff = target - start;
    if (diff === 0) return;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + diff * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    prevTarget.current = target;
  }, [target, duration]);
  return value;
}

/* ─────────────────────────────────────────
   SUBCOMPONENTS
───────────────────────────────────────── */
function StatCard({ title, value, sub, icon: Icon, accent, delta, sparkData }) {
  const isNumeric = typeof value === "number";
  const animatedValue = useCountUp(isNumeric ? value : 0);
  const displayValue = isNumeric ? animatedValue : value;

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
        <div className="text-3xl font-black tracking-tight text-white mb-1">{displayValue}</div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium" style={{ color: "#525252" }}>{sub}</span>
          {delta && (
            <span className="text-[9px] font-black flex items-center gap-0.5 text-emerald-400">
              <TrendingUp size={9} /> {delta}
            </span>
          )}
        </div>
        {/* Sparkline bar */}
        {sparkData && sparkData.length > 0 && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 2, marginTop: 12, height: 20 }}>
            {sparkData.map((v, i) => {
              const max = Math.max(...sparkData, 1);
              return (
                <div key={i} style={{
                  flex: 1,
                  height: `${Math.max((v / max) * 100, 8)}%`,
                  background: accent ? "rgba(249,115,22,0.4)" : "rgba(255,255,255,0.08)",
                  borderRadius: 2,
                  transition: "height 0.4s ease",
                  minHeight: 2
                }} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

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
   MAIN COMPONENT
───────────────────────────────────────── */
export default function OverviewTab({
  currentTime,
  users,
  leads: rawLeads,
  clients,
  newLeadsCount: propsNewLeadsCount,
  conversionRate: propsConversionRate,
  isMobile,
  setActiveTab,
  db,
  currentAdmin,
  triggerConfirm,
  logActivity
}) {
  const [activityLogs, setActivityLogs] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [dateRange, setDateRange] = useState("all");
  const [logSearch, setLogSearch] = useState("");

  const leads = React.useMemo(() => {
    if (dateRange === "all") return rawLeads || [];

    const now = new Date();
    const rangeMap = { "7d": 7, "30d": 30 };

    return (rawLeads || []).filter(l => {
      if (!l.createdAt?.toDate) return true;
      const created = l.createdAt.toDate();

      if (dateRange === "this_month") {
        return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
      }

      const daysAgo = (now - created) / (1000 * 60 * 60 * 24);
      return daysAgo <= rangeMap[dateRange];
    });
  }, [rawLeads, dateRange]);

  const newLeadsCount = leads.filter(l => (l.status || "new") === "new").length;
  const convertedCount = leads.filter(l => l.status === "hot" || l.status === "replied").length;
  const conversionRate = leads.length > 0
    ? ((convertedCount / leads.length) * 100).toFixed(1) + "%"
    : "0%";

  const hotLeadsCount = leads.filter(l => (l.status || "new") === "hot").length;
  const overdueLeads = leads.filter(l =>
    l.nextFollowUp &&
    new Date(l.nextFollowUp) < new Date(new Date().setHours(0,0,0,0)) &&
    l.status !== "won" && l.status !== "lost"
  );

  const todayStr = new Date().toISOString().split("T")[0];
  const followUpsToday = leads.filter(l => l.nextFollowUp === todayStr && l.status !== "won" && l.status !== "lost");

  // Real-time listener for logs & my tasks
  useEffect(() => {
    if (!db) return;
    const logsQ = query(collection(db, "activity_logs"), orderBy("timestamp", "desc"), limit(50));
    const unsubLogs = onSnapshot(logsQ, (snap) => {
      setActivityLogs(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, err => console.warn(err));

    const adminId = currentAdmin?.id || currentAdmin?.uid;
    if (adminId) {
      const tasksQ = query(
        collection(db, "tasks"),
        where("assignedTo", "==", adminId),
        where("status", "==", "pending")
      );
      const unsubTasks = onSnapshot(tasksQ, (snap) => {
        setMyTasks(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }, err => console.warn(err));
      return () => { unsubLogs(); unsubTasks(); };
    }
    return () => unsubLogs();
  }, [db, currentAdmin]);

  // Combine DB activity logs with Leads and Meetings
  const mergedTimeline = React.useMemo(() => {
    let timeline = [...activityLogs];

    leads.forEach(l => {
      // Add NEW_LEAD event
      if (l.createdAt) {
        timeline.push({
          id: `lead_${l.id}_created`,
          action: "NEW_LEAD",
          details: `New lead generated: ${l.fullName || l.email || "Unknown"} (${l.source || "Direct"})`,
          timestamp: l.createdAt,
          adminName: l.source || "System"
        });
      }

      // Add MEETING_BOOKED event if meetingBooked is true
      if (l.meetingBooked) {
        if (l.followUpDate) {
          const d = new Date(l.followUpDate);
          if (!isNaN(d.valueOf())) {
            timeline.push({
              id: `lead_${l.id}_meeting`,
              action: "MEETING_BOOKED",
              details: `Meeting booked with ${l.fullName || l.email || "Unknown"}`,
              timestamp: { toDate: () => d },
              adminName: "System"
            });
          }
        } else if (l.createdAt) {
          timeline.push({
            id: `lead_${l.id}_meeting`,
            action: "MEETING_BOOKED",
            details: `Meeting booked with ${l.fullName || l.email || "Unknown"}`,
            timestamp: l.createdAt,
            adminName: "System"
          });
        }
      }
    });

    // Sort descending by timestamp
    timeline.sort((a, b) => {
      const timeA = a.timestamp?.toDate ? a.timestamp.toDate().getTime() : 0;
      const timeB = b.timestamp?.toDate ? b.timestamp.toDate().getTime() : 0;
      return timeB - timeA;
    });

    return timeline.slice(0, 100);
  }, [activityLogs, leads]);

  // Filter timeline based on search query
  const filteredTimeline = React.useMemo(() => {
    if (!logSearch.trim()) return mergedTimeline;
    const q = logSearch.toLowerCase();
    return mergedTimeline.filter(log =>
      log.action?.toLowerCase().includes(q) ||
      log.adminName?.toLowerCase().includes(q) ||
      log.details?.toLowerCase().includes(q)
    );
  }, [mergedTimeline, logSearch]);

  // Group logs by Date (with robust parsing)
  const groupedTimeline = React.useMemo(() => {
    const groups = {};
    filteredTimeline.forEach(log => {
      let dateObj;
      const t = log.timestamp;
      if (!t) return;
      if (t.toDate && typeof t.toDate === "function") {
        dateObj = t.toDate();
      } else if (typeof t === "object" && typeof t.seconds === "number") {
        dateObj = new Date(t.seconds * 1000);
      } else {
        dateObj = new Date(t);
      }

      if (isNaN(dateObj.getTime())) return;

      const dateStr = dateObj.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric"
      });
      if (!groups[dateStr]) groups[dateStr] = [];
      groups[dateStr].push(log);
    });
    return groups;
  }, [filteredTimeline]);

  const exportLogsToCSV = () => {
    const headers = ["Timestamp", "Action", "Admin User", "Details"];
    const rows = filteredTimeline.map(log => {
      let timeStr = "—";
      if (log.timestamp) {
        let dateObj;
        const t = log.timestamp;
        if (t.toDate && typeof t.toDate === "function") {
          dateObj = t.toDate();
        } else if (typeof t === "object" && typeof t.seconds === "number") {
          dateObj = new Date(t.seconds * 1000);
        } else {
          dateObj = new Date(t);
        }
        if (!isNaN(dateObj.getTime())) {
          timeStr = dateObj.toLocaleString();
        }
      }
      return [
        timeStr,
        log.action || "—",
        log.adminName || "—",
        `"${(log.details || "").replace(/"/g, '""')}"`
      ];
    });

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `Orbit_Overview_Activity_Logs_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearLogs = () => {
    if (!triggerConfirm || !logActivity) {
      const ok = window.confirm("Are you sure you want to delete all activity logs from the database? This action is permanent.");
      if (ok) {
        clearDbLogs();
      }
      return;
    }
    triggerConfirm(
      "Clear System Logs",
      "Are you sure you want to delete all activity logs from the database? This action is permanent.",
      async () => {
        await clearDbLogs();
      },
      true
    );
  };

  const clearDbLogs = async () => {
    try {
      const snap = await getDocs(collection(db, "activity_logs"));
      const batch = writeBatch(db);
      snap.docs.forEach(d => {
        batch.delete(d.ref);
      });
      await batch.commit();
      if (logActivity) {
        await logActivity("CLEAR_LOGS", "Cleared the system activity audit log");
      }
    } catch (e) {
      alert("Failed to clear logs: " + e.message);
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
      console.warn("Failed to toggle task from overview:", err);
    }
  };



  // Sales leaderboard computations
  const leaderboard = React.useMemo(() => {
    const admins = users.filter(u => u.role?.trim() === "admin");
    return admins.map(admin => {
      const adminId = admin.id || admin.uid;
      const adminLeads = leads.filter(l => l.assignedTo === adminId);
      const assignedCount = adminLeads.length;
      const bookingsCount = adminLeads.filter(l => l.meetingBooked).length;
      const wonCount = adminLeads.filter(l => l.status === "won").length;
      const conversionRate = assignedCount > 0 ? Math.round((wonCount / assignedCount) * 100) : 0;
      return {
        name: admin.fullName || admin.displayName || admin.email || "Admin",
        assigned: assignedCount,
        bookings: bookingsCount,
        won: wonCount,
        conversionRate
      };
    }).sort((a, b) => b.won - a.won || b.conversionRate - a.conversionRate);
  }, [users, leads]);

  /* Build 7-day sparkline data */
  const last7Days = React.useMemo(() => {
    const counts = Array(7).fill(0);
    const now = new Date();
    leads.forEach(l => {
      if (!l.createdAt?.toDate) return;
      const created = l.createdAt.toDate();
      const daysAgo = Math.floor((now - created) / (1000 * 60 * 60 * 24));
      if (daysAgo >= 0 && daysAgo < 7) counts[6 - daysAgo]++;
    });
    return counts;
  }, [leads]);

  return (
    <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Greeting */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
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
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <select
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: "10px 16px",
              color: "#a3a3a3",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              cursor: "pointer",
              outline: "none",
              appearance: "none",
              marginRight: 4
            }}
          >
            <option value="all" style={{ background: "#0d0d0d", color: "#fff" }}>All-Time</option>
            <option value="7d" style={{ background: "#0d0d0d", color: "#fff" }}>Last 7 Days</option>
            <option value="30d" style={{ background: "#0d0d0d", color: "#fff" }}>Last 30 Days</option>
            <option value="this_month" style={{ background: "#0d0d0d", color: "#fff" }}>This Month</option>
          </select>
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
                color: "#f97316",
                transition: "all 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(249,115,22,0.18)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(249,115,22,0.12)"}
            >
              <AlertCircle size={14} />
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>{newLeadsCount} new</span>
              <ArrowUpRight size={13} />
            </button>
          )}
          {hotLeadsCount > 0 && (
            <button
              onClick={() => setActiveTab("leads")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: 12,
                padding: "10px 16px",
                cursor: "pointer",
                color: "#ef4444",
                transition: "all 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.15)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
            >
              <Flame size={14} />
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>{hotLeadsCount} hot</span>
              <ArrowUpRight size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Follow-ups Alert Banner */}
      {(overdueLeads.length > 0 || followUpsToday.length > 0) && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {overdueLeads.length > 0 && (
            <button
              onClick={() => setActiveTab("leads")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 20px",
                background: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: 16,
                cursor: "pointer",
                transition: "all 0.2s",
                width: "100%",
                textAlign: "left"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.06)"}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(239,68,68,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0
              }}>
                <Clock size={16} color="#ef4444" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#ef4444", marginBottom: 2 }}>
                  {overdueLeads.length} Overdue Follow-up{overdueLeads.length !== 1 ? "s" : ""}
                </div>
                <div style={{ fontSize: 11, color: "#a3a3a3" }}>
                  Action required: {overdueLeads.slice(0, 3).map(l => l.fullName || l.email).join(", ")}{overdueLeads.length > 3 ? ` +${overdueLeads.length - 3} more` : ""}
                </div>
              </div>
              <ArrowUpRight size={16} color="#ef4444" style={{ flexShrink: 0 }} />
            </button>
          )}

          {followUpsToday.length > 0 && (
            <button
              onClick={() => setActiveTab("leads")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 20px",
                background: "rgba(249,115,22,0.06)",
                border: "1px solid rgba(249,115,22,0.2)",
                borderRadius: 16,
                cursor: "pointer",
                transition: "all 0.2s",
                width: "100%",
                textAlign: "left"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(249,115,22,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(249,115,22,0.06)"}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(249,115,22,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0
              }}>
                <Calendar size={16} color="#f97316" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#f97316", marginBottom: 2 }}>
                  {followUpsToday.length} Follow-up{followUpsToday.length !== 1 ? "s" : ""} Due Today
                </div>
                <div style={{ fontSize: 11, color: "#a3a3a3" }}>
                  Schedule outreach: {followUpsToday.slice(0, 3).map(l => l.fullName || l.email).join(", ")}{followUpsToday.length > 3 ? ` +${followUpsToday.length - 3} more` : ""}
                </div>
              </div>
              <ArrowUpRight size={16} color="#f97316" style={{ flexShrink: 0 }} />
            </button>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5, 1fr)", gap: 14 }}>
        <StatCard title="Active Leads"   value={leads.length}  sub="All time enquiries"     icon={Briefcase} accent sparkData={last7Days} />
        <StatCard title="New Leads"      value={newLeadsCount} sub="Awaiting response"      icon={Activity} />
        <StatCard title="Booked Meetings" value={leads.filter(l => l.meetingBooked).length} sub="Calendly bookings" icon={Calendar} />
        <StatCard title="Conversion Est" value={conversionRate} sub="Interest-to-Lead ratio" icon={TrendingUp} />
        <StatCard title="Total Users"    value={users.length}  sub="Registered accounts"    icon={Users} />
      </div>



      {/* Visual Analytics Funnel & Services Chart */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr", gap: 14 }}>
        {/* Pipeline Conversion Funnel */}
        <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: isMobile ? "16px" : "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em" }}>Lead Conversion Funnel</div>
          {(() => {
            const total = leads.length;
            const meetings = leads.filter(l => l.meetingBooked).length;
            const won = leads.filter(l => l.status === "won").length;

            const r2 = total > 0 ? (meetings / total) : 0;
            const r3 = total > 0 ? (won / total) : 0;

            // Stage 1 (top): Inbound Leads (fixed baseline)
            const w1_top = 180;
            const w1_bottom = 120;

            // Stage 2 (middle): Meetings Booked
            const w2_top = Math.max(40, 120 * r2);
            const w2_bottom = w2_top * 0.6;

            // Dynamic widths for fully rounded pills (capsules)
            const w1 = 170;
            const w2 = Math.max(48, 170 * r2);
            const w3 = Math.max(32, 170 * r3);

            // Flow connector paths with smooth curves and no sharp corners
            const connector1 = `M ${100 - w1/2} 22 C ${100 - w1/2} 38, ${100 - w2/2} 38, ${100 - w2/2} 58 L ${100 + w2/2} 58 C ${100 + w2/2} 38, ${100 + w1/2} 38, ${100 + w1/2} 22 Z`;
            const connector2 = `M ${100 - w2/2} 62 C ${100 - w2/2} 78, ${100 - w3/2} 78, ${100 - w3/2} 98 L ${100 + w3/2} 98 C ${100 + w3/2} 78, ${100 + w2/2} 78, ${100 + w2/2} 62 Z`;

            return (
              <div style={{ display: "flex", alignItems: "center", gap: 24, flex: 1, minHeight: 180, flexWrap: "wrap" }}>
                {/* SVG Funnel Graphic */}
                <div style={{ flex: "1 1 200px", maxWidth: 280 }}>
                  <svg viewBox="0 0 200 130" style={{ width: "100%", height: "auto" }}>
                    <defs>
                      <linearGradient id="funnel-grad-1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#ea580c" stopOpacity="0.9" />
                      </linearGradient>
                      <linearGradient id="funnel-grad-2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#0891b2" stopOpacity="0.9" />
                      </linearGradient>
                      <linearGradient id="funnel-grad-3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
                      </linearGradient>
                      <linearGradient id="conn-grad-1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.15" />
                      </linearGradient>
                      <linearGradient id="conn-grad-2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.15" />
                      </linearGradient>
                      <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.3" />
                      </filter>
                    </defs>

                    {/* Smooth Liquid Connections */}
                    <path d={connector1} fill="url(#conn-grad-1)" style={{ transition: "all 0.4s ease" }} />
                    <path d={connector2} fill="url(#conn-grad-2)" style={{ transition: "all 0.4s ease" }} />

                    {/* Stage 1 Capsule (Inbound Leads) */}
                    <g filter="url(#glow-filter)" style={{ transition: "all 0.4s ease" }}>
                      <rect x={100 - w1/2} y={10} width={w1} height={24} rx={12} fill="url(#funnel-grad-1)" style={{ transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }} />
                      <rect x={100 - w1/2 + 2} y={12} width={w1 - 4} height={8} rx={4} fill="rgba(255, 255, 255, 0.15)" style={{ transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }} />
                      <text x="100" y="26" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="800" letterSpacing="0.05em" style={{ userSelect: "none" }}>{total} LEADS</text>
                    </g>

                    {/* Stage 2 Capsule (Meetings Booked) */}
                    <g filter="url(#glow-filter)" style={{ transition: "all 0.4s ease" }}>
                      <rect x={100 - w2/2} y={50} width={w2} height={24} rx={12} fill="url(#funnel-grad-2)" style={{ transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }} />
                      <rect x={100 - w2/2 + 2} y={52} width={Math.max(0, w2 - 4)} height={8} rx={4} fill="rgba(255, 255, 255, 0.15)" style={{ transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }} />
                      <text x="100" y="66" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800" letterSpacing="0.05em" style={{ userSelect: "none" }}>
                        {w2 > 80 ? `${meetings} MEETINGS` : meetings}
                      </text>
                    </g>

                    {/* Stage 3 Capsule (Closed Deals - Won) */}
                    <g filter="url(#glow-filter)" style={{ transition: "all 0.4s ease" }}>
                      <rect x={100 - w3/2} y={90} width={w3} height={24} rx={12} fill="url(#funnel-grad-3)" style={{ transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }} />
                      <rect x={100 - w3/2 + 2} y={92} width={Math.max(0, w3 - 4)} height={8} rx={4} fill="rgba(255, 255, 255, 0.15)" style={{ transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }} />
                      <text x="100" y="106" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800" letterSpacing="0.05em" style={{ userSelect: "none" }}>
                        {w3 > 80 ? `${won} WON` : won}
                      </text>
                    </g>
                  </svg>
                </div>
                {/* Funnel Stats Details */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1, minWidth: 150 }}>
                  {[
                    { label: "Inbound Leads", count: total, pct: 100, color: "#f97316" },
                    {
                      label: "Meetings Booked",
                      count: meetings,
                      pct: total ? Math.round((meetings / total) * 100) : 0,
                      color: "#22d3ee"
                    },
                    {
                      label: "Closed Deals (Won)",
                      count: won,
                      pct: total ? Math.round((won / total) * 100) : 0,
                      color: "#10b981"
                    }
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color }} />
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{item.label}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8, paddingLeft: 16 }}>
                        <span style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>{item.count}</span>
                        <span style={{ fontSize: 10, color: "#525252" }}>({item.pct}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>

        {/* Service Popularity Breakdown */}
        <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: isMobile ? "16px" : "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em" }}>Popular Services</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "center", flex: 1 }}>
            {Object.entries(
              leads.reduce((acc, l) => {
                const s = l.requestedService || "General enquiry";
                acc[s] = (acc[s] || 0) + 1;
                return acc;
              }, {})
            )
              .sort((a, b) => b[1] - a[1])
              .slice(0, 4)
              .map(([service, count]) => {
                const percent = leads.length ? Math.round((count / leads.length) * 100) : 0;
                return (
                  <div key={service} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600 }}>
                      <span style={{ color: "#a3a3a3", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "80%" }}>{service}</span>
                      <span style={{ color: "#f97316", fontWeight: 700 }}>{count} ({percent}%)</span>
                    </div>
                    <div style={{ width: "100%", height: 5, background: "rgba(255,255,255,0.03)", borderRadius: 10, overflow: "hidden" }}>
                      <div style={{ height: "100%", background: "linear-gradient(90deg, #f97316, #ea580c)", width: `${percent}%`, borderRadius: 10, transition: "width 0.4s ease" }} />
                    </div>
                  </div>
                );
              })}
            {leads.length === 0 && (
              <div style={{ textAlign: "center", color: "#3f3f46", fontSize: 11, padding: "20px 0" }}>
                No services tracked yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* My Pending Tasks Checklist (Spans Full Width) */}
      <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CheckCircle2 size={14} color="#f97316" />
            <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.2em" }}>My Pending Tasks</div>
          </div>
          <div style={{ fontSize: 10, fontWeight: 800, background: "rgba(249,115,22,0.1)", color: "#f97316", padding: "2px 6px", borderRadius: 6 }}>{myTasks.length} pending</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 150, overflowY: "auto", paddingRight: 4 }}>
          {myTasks.map((task) => (
            <div key={task.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.02)", borderRadius: 10 }}>
              <input
                type="checkbox"
                checked={task.status === "completed"}
                onChange={() => handleToggleTask(task.id, task.status)}
                style={{ marginTop: 2, accentColor: "#f97316", cursor: "pointer" }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#fff", textDecoration: task.status === "completed" ? "line-through" : "none", opacity: task.status === "completed" ? 0.5 : 1 }}>
                  {task.title}
                </div>
                {task.description && (
                  <div style={{ fontSize: 9, color: "#71717a", marginTop: 2 }}>
                    {task.description}
                  </div>
                )}
                {task.dueDate && (
                  <div style={{ fontSize: 8, color: "#525252", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                    <Clock size={8} /> Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
          {myTasks.length === 0 && (
            <div style={{ textAlign: "center", padding: "20px 0", fontSize: 11, color: "#3f3f46" }}>
              No pending tasks. You're all caught up!
            </div>
          )}
        </div>
      </div>

      {/* 2-Column Layout */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>

        {/* Left Column (50%) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Lead Sources */}
          <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: "20px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Lead Sources</div>
            {Object.entries(leads.reduce((acc, l) => { const k = l.source || "Direct"; acc[k] = (acc[k] || 0) + 1; return acc; }, {})).slice(0, 4).map(([src, count]) => (
              <div key={src} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 11, color: "#a3a3a3", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "60%" }}>{src}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 50, height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", background: "#f97316", width: `${leads.length > 0 ? (count / leads.length) * 100 : 0}%`, borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#f97316", minWidth: 16, textAlign: "right" }}>{count}</span>
                </div>
              </div>
            ))}
            {leads.length === 0 && <p style={{ fontSize: 11, color: "#3f3f46" }}>No leads yet.</p>}
          </div>
          {/* Admin list */}
          <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: "20px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Admin Users</div>
            {users.filter(u => u.role?.trim() === "admin").map(u => (
              <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(249,115,22,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#f97316", flexShrink: 0 }}>
                  {(u.displayName || u.fullName || "A")[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.displayName || u.fullName || "Admin"}</div>
                    {u.allowedPanels?.length >= 8 && (
                      <div style={{ fontSize: 8, fontWeight: 800, background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)", padding: "2px 6px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.05em", flexShrink: 0 }}>Super</div>
                    )}
                  </div>
                  <div style={{ fontSize: 9, color: "#525252", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.email}</div>
                </div>
              </div>
            ))}
            {users.filter(u => u.role?.trim() === "admin").length === 0 && (
              <p style={{ fontSize: 11, color: "#3f3f46" }}>No admin accounts found.</p>
            )}
          </div>


          {/* Mini Calendar for leads & meetings */}
          <OverviewMiniCalendar leads={leads} />
        </div>

        {/* Right Column (50%): Activity Feed & Recent Leads */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Recent audit activity feed */}
          <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: "20px", display: "flex", flexDirection: "column", gap: 16, flex: 1, minHeight: 400 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Activity size={16} color="#f97316" />
                <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.2em" }}>Activity Timeline</div>
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                {/* Export CSV */}
                <button
                  onClick={exportLogsToCSV}
                  disabled={filteredTimeline.length === 0}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 10,
                    padding: "6px 12px",
                    fontSize: 10,
                    fontWeight: 800,
                    color: "#a3a3a3",
                    cursor: filteredTimeline.length === 0 ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    transition: "all 0.15s"
                  }}
                  onMouseEnter={e => { if (filteredTimeline.length > 0) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  <Download size={12} /> Export CSV
                </button>

                {/* Clear (only deletes activity_logs collection) */}
                {activityLogs.length > 0 && (
                  <button
                    onClick={handleClearLogs}
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(239,68,68,0.2)",
                      borderRadius: 10,
                      padding: "6px 12px",
                      fontSize: 10,
                      fontWeight: 800,
                      color: "#ef4444",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      transition: "all 0.15s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <Trash2 size={12} /> Clear
                  </button>
                )}
              </div>
            </div>

            {/* Search Logs */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "8px 12px" }}>
              <Search size={13} color="#525252" />
              <input
                type="text"
                placeholder="Search audit trail by action, admin, details..."
                value={logSearch}
                onChange={e => setLogSearch(e.target.value)}
                style={{ background: "none", border: "none", color: "#fff", fontSize: 11, fontWeight: 500, width: "100%", outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxHeight: 520, overflowY: "auto", paddingRight: 8, paddingLeft: 8, paddingBottom: 20 }}>
              {filteredTimeline.length === 0 ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "150px", color: "#3f3f46", fontSize: 11, fontStyle: "italic" }}>
                  {logSearch ? "No matching logs found." : "No recent activity."}
                </div>
              ) : (
                Object.entries(groupedTimeline).map(([dateStr, dayLogs]) => (
                  <div key={dateStr} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {/* Sticky Date Label */}
                    <div style={{
                      fontSize: 9,
                      fontWeight: 900,
                      color: "#f97316",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      padding: "8px 0 4px",
                      borderBottom: "1px dashed rgba(249,115,22,0.15)",
                      position: "sticky",
                      top: 0,
                      background: "#0d0d0d",
                      zIndex: 10,
                      marginBottom: 8
                    }}>
                      {dateStr}
                    </div>

                    <div style={{ position: "relative", paddingLeft: 16, borderLeft: "2px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: 20 }}>
                      {dayLogs.map((log) => {
                        const badge = getLogBadgeStyle(log.action);
                        let time = "—";
                        if (log.timestamp) {
                          let dateObj;
                          const t = log.timestamp;
                          if (t.toDate && typeof t.toDate === "function") {
                            dateObj = t.toDate();
                          } else if (typeof t === "object" && typeof t.seconds === "number") {
                            dateObj = new Date(t.seconds * 1000);
                          } else {
                            dateObj = new Date(t);
                          }
                          if (!isNaN(dateObj.getTime())) {
                            time = dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
                          }
                        }

                        return (
                          <div key={log.id} style={{ position: "relative", display: "flex", flexDirection: "column", gap: 6 }}>
                            {/* Timeline Node */}
                            <div style={{ position: "absolute", left: -21, top: 4, width: 8, height: 8, borderRadius: "50%", background: badge.color, boxShadow: `0 0 8px ${badge.color}`, border: "2px solid #0d0d0d" }} />

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                              <span style={{
                                background: badge.bg,
                                border: `1px solid ${badge.border}`,
                                color: badge.color,
                                fontSize: 9,
                                fontWeight: 800,
                                borderRadius: 6,
                                padding: "2px 6px",
                                letterSpacing: "0.05em",
                                display: "inline-flex",
                                alignItems: "center"
                              }}>
                                {log.action.replace(/_/g, " ")}
                              </span>
                              <span style={{ color: "#525252", fontSize: 9, fontWeight: 600 }}>
                                {time}
                              </span>
                            </div>
                            <div style={{ color: "#d4d4d8", fontSize: 11, lineHeight: 1.5, fontWeight: 500 }}>
                              {log.details}
                            </div>
                            <div style={{ color: "#71717a", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                              <span style={{ width: 14, height: 14, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8 }}>
                                {(log.adminName || "A")[0].toUpperCase()}
                              </span>
                              {log.adminName || "System"}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent leads activity list */}
          <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>Recent Lead Activity</div>
              <button
                onClick={() => setActiveTab("leads")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  fontSize: 8,
                  fontWeight: 900,
                  color: "#f97316",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em"
                }}
              >
                View all <ArrowUpRight size={10} />
              </button>
            </div>
            {leads.slice(0, 5).map((lead, i) => (
              <div key={lead.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.03)" : "none" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                onMouseLeave={e => e.currentTarget.style.background = "none"}
              >
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, rgba(249,115,22,0.2), rgba(249,115,22,0.05))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "#f97316", flexShrink: 0 }}>
                  {lead.fullName?.[0] || "L"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{lead.fullName || "Unknown"}</div>
                  <div style={{ fontSize: 9, color: "#525252", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{lead.requestedService}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                  <StatusBadge status={lead.status || "new"} />
                  <div style={{ fontSize: 8, color: "#3f3f46", fontFamily: "monospace" }}>{fmt(lead.createdAt)}</div>
                </div>
              </div>
            ))}
            {leads.length === 0 && (
              <div style={{ padding: "24px 20px", textAlign: "center", color: "#333", fontSize: 11 }}>
                No leads received yet.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Performance Analytics Trend Chart */}
      <OverviewPerformanceChart leads={leads} />
    </div>
  );
}

/* ─────────────────────────────────────────
   PERFORMANCE TREND CHART COMPONENT
───────────────────────────────────────── */
function OverviewPerformanceChart({ leads }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [viewRange, setViewRange] = useState(15);
  const [timeOffset, setTimeOffset] = useState(0); // offset days back in time

  const analyticsData = useMemo(() => {
    const dates = [];
    for (let i = viewRange - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - (i + timeOffset));
      dates.push({
        dateObj: d,
        dateStr: d.toDateString(),
        label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      });
    }

    const lCountMap = {};
    const mMap = {};
    (leads || []).forEach(l => {
      if (l.createdAt?.toDate) {
        const dStr = l.createdAt.toDate().toDateString();
        if (!lCountMap[dStr]) lCountMap[dStr] = 0;
        lCountMap[dStr]++;
      }
      if (l.meetingBooked) {
        if (l.followUpDate) {
          const mDate = new Date(l.followUpDate);
          if (!isNaN(mDate.getTime())) {
            const mDateStr = mDate.toDateString();
            if (!mMap[mDateStr]) mMap[mDateStr] = 0;
            mMap[mDateStr]++;
          }
        } else if (l.createdAt?.toDate) {
          const dStr = l.createdAt.toDate().toDateString();
          if (!mMap[dStr]) mMap[dStr] = 0;
          mMap[dStr]++;
        }
      }
    });

    return dates.map(d => ({
      label: d.label,
      leads: lCountMap[d.dateStr] || 0,
      meetings: mMap[d.dateStr] || 0
    }));
  }, [leads, viewRange, timeOffset]);

  const maxVal = useMemo(() => {
    let max = 0;
    analyticsData.forEach(d => {
      if (d.leads > max) max = d.leads;
      if (d.meetings > max) max = d.meetings;
    });
    return Math.max(max + 1, 4);
  }, [analyticsData]);

  const handleRangeChange = (range) => {
    setViewRange(range);
    setTimeOffset(0);
    setHoveredPoint(null);
  };

  const handlePrevTimeline = () => {
    setTimeOffset(prev => prev + viewRange);
    setHoveredPoint(null);
  };

  const handleNextTimeline = () => {
    setTimeOffset(prev => Math.max(0, prev - viewRange));
    setHoveredPoint(null);
  };

  const handleTodayReset = () => {
    setTimeOffset(0);
    setHoveredPoint(null);
  };

  const chartWidth = 900;
  const chartHeight = 200;
  const startX = 60;
  const startY = 30;
  const endY = 230;

  const getCurvePath = (key) => {
    if (analyticsData.length === 0) return "";
    const points = analyticsData.map((d, i) => {
      const x = startX + (i * (chartWidth / (analyticsData.length - 1)));
      const y = endY - (d[key] / maxVal) * chartHeight;
      return { x, y };
    });

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const cpX1 = points[i].x + (points[i+1].x - points[i].x) / 3;
      const cpY1 = points[i].y;
      const cpX2 = points[i].x + 2 * (points[i+1].x - points[i].x) / 3;
      const cpY2 = points[i+1].y;
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${points[i+1].x} ${points[i+1].y}`;
    }
    return path;
  };

  const leadsPath = getCurvePath("leads");
  const meetingsPath = getCurvePath("meetings");

  const getAreaPath = (curvePath) => {
    if (!curvePath) return "";
    const lastX = startX + chartWidth;
    return `${curvePath} L ${lastX} ${endY} L ${startX} ${endY} Z`;
  };

  const leadsArea = getAreaPath(leadsPath);
  const meetingsArea = getAreaPath(meetingsPath);

  // Y-axis grid ticks (4 segments)
  const yTicks = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: "24px", marginTop: 14, display: "flex", flexDirection: "column", gap: 20, position: "relative" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em" }}>Lead Acquisition & Bookings Trend</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>Daily Activity Performance</div>
        </div>

        {/* Dynamic Controls Panel */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          {/* Time Range Selector */}
          <div style={{ display: "flex", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: 2 }}>
            {[7, 15, 30].map(range => (
              <button
                key={range}
                onClick={() => handleRangeChange(range)}
                style={{
                  background: viewRange === range ? "#f97316" : "transparent",
                  border: "none",
                  borderRadius: 8,
                  padding: "4px 10px",
                  fontSize: 10,
                  fontWeight: 800,
                  color: viewRange === range ? "#fff" : "#a3a3a3",
                  cursor: "pointer",
                  transition: "all 0.15s"
                }}
              >
                {range}D
              </button>
            ))}
          </div>

          {/* Timeline Shifter Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button
              onClick={handlePrevTimeline}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: 10,
                fontWeight: 800,
                color: "#a3a3a3",
                cursor: "pointer",
                transition: "all 0.15s",
                display: "flex",
                alignItems: "center",
                gap: 4
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
            >
              ◀ Back
            </button>

            {timeOffset > 0 && (
              <button
                onClick={handleTodayReset}
                style={{
                  background: "rgba(249,115,22,0.1)",
                  border: "1px solid rgba(249,115,22,0.2)",
                  borderRadius: 8,
                  padding: "6px 12px",
                  fontSize: 10,
                  fontWeight: 800,
                  color: "#f97316",
                  cursor: "pointer",
                  transition: "all 0.15s"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(249,115,22,0.15)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(249,115,22,0.1)"}
              >
                Reset
              </button>
            )}

            <button
              onClick={handleNextTimeline}
              disabled={timeOffset === 0}
              style={{
                background: timeOffset === 0 ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: 10,
                fontWeight: 800,
                color: timeOffset === 0 ? "#444" : "#a3a3a3",
                cursor: timeOffset === 0 ? "not-allowed" : "pointer",
                transition: "all 0.15s",
                display: "flex",
                alignItems: "center",
                gap: 4
              }}
              onMouseEnter={e => { if (timeOffset > 0) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={e => { if (timeOffset > 0) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
            >
              Forward ▶
            </button>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 12, fontSize: 10, fontWeight: 800, marginLeft: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f97316", boxShadow: "0 0 6px #f97316" }} />
              <span style={{ color: "#a3a3a3" }}>Leads</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
              <span style={{ color: "#a3a3a3" }}>Meetings</span>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div style={{ position: "relative", width: "100%", overflowX: "auto" }}>
        <svg viewBox="0 0 1000 270" style={{ width: "100%", height: "auto", minWidth: 700 }}>
          <defs>
            {/* Area Fills Gradients */}
            <linearGradient id="leads-area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.00" />
            </linearGradient>
            <linearGradient id="meetings-area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Grid lines & Y Axis Ticks */}
          {yTicks.map((t, idx) => {
            const y = endY - t * chartHeight;
            const val = Math.round(t * maxVal);
            return (
              <g key={idx}>
                <line x1={startX} y1={y} x2={startX + chartWidth} y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth={1} />
                <text x={startX - 15} y={y + 4} textAnchor="end" fill="#525252" style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace" }}>
                  {val}
                </text>
              </g>
            );
          })}

          {/* X Axis Line */}
          <line x1={startX} y1={endY} x2={startX + chartWidth} y2={endY} stroke="rgba(255,255,255,0.08)" strokeWidth={1.5} />

          {/* Glowing Area Fills */}
          <path d={leadsArea} fill="url(#leads-area-grad)" />
          <path d={meetingsArea} fill="url(#meetings-area-grad)" />

          {/* Curve Lines */}
          <path d={leadsPath} fill="none" stroke="#f97316" strokeWidth={3} strokeLinecap="round" />
          <path d={meetingsPath} fill="none" stroke="#22c55e" strokeWidth={3} strokeLinecap="round" />

          {/* Date Labels (X Axis Ticks) */}
          {analyticsData.map((d, i) => {
            const isLabelVisible =
              viewRange === 7 ||
              (viewRange === 15 && i % 2 === 0) ||
              (viewRange === 30 && i % 4 === 0) ||
              i === analyticsData.length - 1;

            if (!isLabelVisible) return null;

            const x = startX + i * (chartWidth / (analyticsData.length - 1));
            return (
              <text key={i} x={x} y={endY + 20} textAnchor="middle" fill="#525252" style={{ fontSize: 9, fontWeight: 800 }}>
                {d.label}
              </text>
            );
          })}

          {/* Hover Guide Indicator */}
          {hoveredPoint !== null && (() => {
            const d = analyticsData[hoveredPoint];
            const x = startX + hoveredPoint * (chartWidth / (analyticsData.length - 1));
            const yLeads = endY - (d.leads / maxVal) * chartHeight;
            const yMeetings = endY - (d.meetings / maxVal) * chartHeight;

            return (
              <g>
                <line x1={x} y1={startY} x2={x} y2={endY} stroke="rgba(255,255,255,0.15)" strokeWidth={1} strokeDasharray="4 4" />

                {/* Leads Dot */}
                <circle cx={x} cy={yLeads} r={7} fill="#f97316" stroke="#0d0d0d" strokeWidth={2} style={{ filter: "drop-shadow(0 0 6px #f97316)" }} />

                {/* Meetings Dot */}
                <circle cx={x} cy={yMeetings} r={7} fill="#22c55e" stroke="#0d0d0d" strokeWidth={2} style={{ filter: "drop-shadow(0 0 6px #22c55e)" }} />
              </g>
            );
          })()}

          {/* Interactive Mouse Hover Segments */}
          {analyticsData.map((d, i) => {
            const x = startX + i * (chartWidth / (analyticsData.length - 1));
            const segmentWidth = chartWidth / (analyticsData.length - 1);
            return (
              <rect
                key={i}
                x={x - segmentWidth / 2}
                y={startY}
                width={segmentWidth}
                height={chartHeight + 20}
                fill="transparent"
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHoveredPoint(i)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            );
          })}
        </svg>

        {/* Floating Glassmorphic Tooltip */}
        {hoveredPoint !== null && (() => {
          const d = analyticsData[hoveredPoint];
          const x = startX + hoveredPoint * (chartWidth / (analyticsData.length - 1));

          // Position relative percentage left
          const pctLeft = (x / 1000) * 100;

          return (
            <div style={{
              position: "absolute",
              left: `${pctLeft}%`,
              transform: "translateX(-50%)",
              bottom: "78%",
              background: "rgba(13, 13, 13, 0.9)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "10px 14px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              zIndex: 50,
              pointerEvents: "none",
              minWidth: 130,
              boxSizing: "border-box"
            }}>
              <div style={{ fontSize: 9, fontWeight: 900, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {d.label}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 10, color: "#a3a3a3", fontWeight: 600 }}>Leads:</span>
                  <span style={{ fontSize: 11, color: "#fff", fontWeight: 800 }}>{d.leads}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 10, color: "#a3a3a3", fontWeight: 600 }}>Bookings:</span>
                  <span style={{ fontSize: 11, color: "#22c55e", fontWeight: 800 }}>{d.meetings}</span>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}