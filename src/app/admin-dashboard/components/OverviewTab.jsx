"use client";

import React, { useEffect, useState, useRef } from "react";
import { 
  Users, Briefcase, Activity, TrendingUp, AlertCircle, ArrowUpRight, Calendar,
  Flame, Clock, CheckCircle2, MessageSquare, Terminal
} from "lucide-react";
import { collection, query, orderBy, limit, where, onSnapshot, doc, updateDoc, serverTimestamp } from "firebase/firestore";

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
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 (Sun) to 6 (Sat)
  
  const daysArray = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDay + 1;
    if (day > 0 && day <= daysInMonth) return day;
    return null;
  });

  const getDayData = (day) => {
    if (!day) return { leads: 0, meetings: 0 };
    const dateStr = new Date(currentYear, currentMonth, day).toDateString();
    
    let leadCount = 0;
    let meetingCount = 0;
    
    leads.forEach(l => {
      if (l.createdAt?.toDate && l.createdAt.toDate().toDateString() === dateStr) {
        leadCount++;
      }
      if (l.meetingBooked) {
        if (l.followUpDate) {
          const mDate = new Date(l.followUpDate);
          if (mDate.toDateString() === dateStr) {
            meetingCount++;
          }
        } else if (l.createdAt?.toDate && l.createdAt.toDate().toDateString() === dateStr) {
           meetingCount++;
        }
      }
    });
    return { leads: leadCount, meetings: meetingCount };
  };

  const monthName = today.toLocaleString('default', { month: 'long' });

  return (
    <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em" }}>Activity Calendar</div>
        <div style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>{monthName} {currentYear}</div>
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
          const { leads, meetings } = getDayData(day);
          const isToday = day === today.getDate();
          
          return (
            <div key={i} style={{ 
              aspectRatio: "1", 
              background: day ? "rgba(255,255,255,0.02)" : "transparent",
              border: isToday ? "1px solid rgba(249,115,22,0.5)" : "1px solid rgba(255,255,255,0.02)",
              borderRadius: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "4px 2px",
              position: "relative"
            }}>
              {day && (
                <>
                  <span style={{ fontSize: 10, fontWeight: 700, color: isToday ? "#f97316" : "#a3a3a3" }}>{day}</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: "auto", paddingBottom: 2, width: "100%", justifyContent: "center" }}>
                    {leads > 0 && <div style={{ minWidth: 16, padding: "0 3px", height: 14, borderRadius: 4, background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", color: "#f97316", fontSize: 8, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }} title={`${leads} leads`}>{leads}L</div>}
                    {meetings > 0 && <div style={{ minWidth: 16, padding: "0 3px", height: 14, borderRadius: 4, background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e", fontSize: 8, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }} title={`${meetings} meetings`}>{meetings}M</div>}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
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
  currentAdmin
}) {
  const [activityLogs, setActivityLogs] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [dateRange, setDateRange] = useState("all");

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

    return timeline.slice(0, 50);
  }, [activityLogs, leads]);

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
                display: "flex", alignItems: "center", justifyContext: "center", justifyContent: "center",
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
                display: "flex", alignItems: "center", justifyContext: "center", justifyContent: "center",
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
          <div style={{ display: "flex", alignItems: "center", gap: 24, flex: 1, minHeight: 180, flexWrap: "wrap" }}>
            {/* SVG Funnel Graphic */}
            <div style={{ flex: "1 1 200px", maxWidth: 280 }}>
              <svg viewBox="0 0 200 160" style={{ width: "100%", height: "auto" }}>
                <defs>
                  <linearGradient id="funnel-grad-1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#ea580c" stopOpacity="0.85" />
                  </linearGradient>
                  <linearGradient id="funnel-grad-2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#0891b2" stopOpacity="0.85" />
                  </linearGradient>
                  <linearGradient id="funnel-grad-3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.85" />
                  </linearGradient>
                </defs>
                <polygon points="10,10 190,10 160,50 40,50" fill="url(#funnel-grad-1)" style={{ transition: "all 0.3s ease" }} />
                <polygon points="43,55 157,55 130,95 70,95" fill="url(#funnel-grad-2)" style={{ transition: "all 0.3s ease" }} />
                <polygon points="73,100 127,100 110,140 90,140" fill="url(#funnel-grad-3)" style={{ transition: "all 0.3s ease" }} />
              </svg>
            </div>
            {/* Funnel Stats Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1, minWidth: 150 }}>
              {[
                { label: "Inbound Leads", count: leads.length, pct: 100, color: "#f97316" },
                { 
                  label: "Replied / Active", 
                  count: leads.filter(l => l.status === "replied" || l.status === "contacted" || l.status === "qualified" || l.status === "hot" || l.meetingBooked).length,
                  pct: leads.length ? Math.round((leads.filter(l => l.status === "replied" || l.status === "contacted" || l.status === "qualified" || l.status === "hot" || l.meetingBooked).length / leads.length) * 100) : 0, 
                  color: "#22d3ee" 
                },
                { 
                  label: "Meetings Booked", 
                  count: leads.filter(l => l.meetingBooked).length,
                  pct: leads.length ? Math.round((leads.filter(l => l.meetingBooked).length / leads.length) * 100) : 0, 
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
            <div style={{ display: "flex", alignItems: "center", justifyContext: "space-between", gap: 8, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Activity size={16} color="#f97316" />
                <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.2em" }}>Activity Timeline</div>
              </div>
              <div style={{ fontSize: 10, color: "#525252", marginLeft: "auto", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Live Updates</div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxHeight: 500, overflowY: "auto", paddingRight: 8, paddingLeft: 8 }}>
              {mergedTimeline.length === 0 ? (
                <div style={{ fontSize: 11, color: "#3f3f46", fontStyle: "italic", padding: "10px 0" }}>No recent activity.</div>
              ) : (
                <div style={{ position: "relative", paddingLeft: 16, borderLeft: "2px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: 20 }}>
                  {mergedTimeline.map((log, idx) => {
                    const badge = getLogBadgeStyle(log.action);
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
                            {log.timestamp?.toDate ? log.timestamp.toDate().toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "Just now"}
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
    </div>
  );
}