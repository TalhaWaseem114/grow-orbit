"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  Users, Briefcase, Activity, TrendingUp, AlertCircle, ArrowUpRight, Calendar,
  Flame, Clock, CheckCircle2, MessageSquare, Terminal, Search, Download, Trash2, RefreshCw, Mail, Phone,
  Filter, ChevronDown, ChevronUp, RotateCcw
} from "lucide-react";
import { collection, query, orderBy, limit, where, onSnapshot, doc, updateDoc, serverTimestamp, getDocs, writeBatch, deleteDoc, getDoc } from "firebase/firestore";

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

/* ─────── Standalone Countdown Timer Calculation Helper ─────── */
const getCountdownTimer = (dueDate, dueTime) => {
  if (!dueDate) return { isPast: false, label: "Scheduled", hours: null, minutes: null };
  const hasTime = Boolean(dueTime && String(dueTime).trim() !== "");
  const now = new Date();

  if (hasTime) {
    const targetIso = `${dueDate}T${dueTime}:00`;
    const targetTime = new Date(targetIso).getTime();
    const nowTime = now.getTime();
    if (isNaN(targetTime)) return { isPast: false, label: "Invalid", hours: null, minutes: null };

    const diffMs = targetTime - nowTime;
    const isPast = diffMs <= 0;
    const absMin = Math.floor(Math.abs(diffMs) / (1000 * 60));
    const hours = Math.floor(absMin / 60);
    const minutes = absMin % 60;

    return {
      isPast,
      hours,
      minutes,
      label: isPast ? `${hours}h ${minutes}m ago` : `${hours}h ${minutes}m`
    };
  } else {
    const todayStr = now.toISOString().split("T")[0];
    const targetDate = new Date(`${dueDate}T00:00:00`);
    const currentDate = new Date(`${todayStr}T00:00:00`);
    const dayDiffMs = targetDate.getTime() - currentDate.getTime();
    const dayDiff = Math.round(dayDiffMs / (1000 * 60 * 60 * 24));

    if (dayDiff < 0) {
      return { isPast: true, hours: Math.abs(dayDiff) * 24, minutes: 0, label: `${Math.abs(dayDiff)}d ago` };
    } else if (dayDiff === 0) {
      return { isPast: false, hours: 12, minutes: 0, label: "Today" };
    } else {
      return { isPast: false, hours: dayDiff * 24, minutes: 0, label: `${dayDiff}d left` };
    }
  }
};

/* ─────── Circular SVG Progress Ring Timer ─────── */
const CircularTimerProgress = ({ dueDate, dueTime, typeColor, isCompleted }) => {
  if (isCompleted) {
    return (
      <div
        title="Completed Task"
        style={{
          position: "relative",
          width: 58,
          height: 58,
          borderRadius: "50%",
          background: "rgba(34,197,94,0.12)",
          border: "2px dashed #22c55e",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 0 14px rgba(34,197,94,0.3)"
        }}
      >
        <CheckCircle2 size={16} color="#22c55e" />
        <span style={{ fontSize: 9, fontWeight: 900, color: "#22c55e", marginTop: 2, letterSpacing: "0.05em" }}>DONE</span>
      </div>
    );
  }
  if (!dueDate) return null;

  try {
    const hasTime = Boolean(dueTime && String(dueTime).trim() !== "");
    const now = new Date();

    let diffMs = 0;
    let isOverdue = false;
    let line1 = "";
    let line2 = "";
    let fullText = "";

    if (hasTime) {
      // EXACT TIME SPECIFIED (e.g. 16:25)
      const targetIso = `${dueDate}T${dueTime}:00`;
      const targetTime = new Date(targetIso).getTime();
      const nowTime = now.getTime();

      if (isNaN(targetTime)) return null;

      diffMs = targetTime - nowTime;
      isOverdue = diffMs <= 0;

      if (isOverdue) {
        const pastMin = Math.floor(Math.abs(diffMs) / (1000 * 60));
        const totalHours = Math.floor(pastMin / 60);
        const mins = pastMin % 60;

        if (totalHours >= 24) {
          const days = Math.floor(totalHours / 24);
          const remHours = totalHours % 24;
          line1 = `-${days}d`;
          line2 = `${remHours}h`;
        } else if (totalHours > 0) {
          line1 = `-${totalHours}h`;
          line2 = `${mins}m`;
        } else {
          line1 = `-${mins}m`;
          line2 = "ago";
        }
        fullText = `Overdue: ${totalHours}h ${mins}m ago`;
      } else {
        const totalMin = Math.floor(diffMs / (1000 * 60));
        const totalHours = Math.floor(totalMin / 60);
        const mins = totalMin % 60;

        if (totalHours >= 24) {
          const days = Math.floor(totalHours / 24);
          const remHours = totalHours % 24;
          line1 = `${days}d`;
          line2 = `${remHours}h`;
        } else {
          line1 = `${totalHours}h`;
          line2 = `${mins}m`;
        }
        fullText = `Due in ${totalHours}h ${mins}m`;
      }
    } else {
      // DATE-ONLY SPECIFIED (No fake time!)
      const todayStr = now.toISOString().split("T")[0];
      const targetDate = new Date(`${dueDate}T00:00:00`);
      const currentDate = new Date(`${todayStr}T00:00:00`);
      const dayDiffMs = targetDate.getTime() - currentDate.getTime();
      const dayDiff = Math.round(dayDiffMs / (1000 * 60 * 60 * 24));

      if (dayDiff < 0) {
        isOverdue = true;
        line1 = `-${Math.abs(dayDiff)}d`;
        line2 = "past";
        fullText = `Overdue by ${Math.abs(dayDiff)} day(s)`;
      } else if (dayDiff === 0) {
        line1 = "Today";
        line2 = "Due";
        fullText = "Due Today";
      } else if (dayDiff === 1) {
        line1 = "1d";
        line2 = "left";
        fullText = "Due Tomorrow";
      } else {
        line1 = `${dayDiff}d`;
        line2 = "left";
        fullText = `Due in ${dayDiff} days`;
      }

      diffMs = Math.max(0, dayDiff * 24 * 60 * 60 * 1000);
    }

    // Dynamic scale timeframe window (2h for short tasks, 24h for daily, 48h for long-term)
    let totalWindowMs = 24 * 60 * 60 * 1000;
    if (diffMs <= 2 * 60 * 60 * 1000) {
      totalWindowMs = 2 * 60 * 60 * 1000;
    } else if (diffMs <= 24 * 60 * 60 * 1000) {
      totalWindowMs = 24 * 60 * 60 * 1000;
    } else {
      totalWindowMs = 48 * 60 * 60 * 1000;
    }

    const clampedMs = Math.max(0, Math.min(diffMs, totalWindowMs));
    let progressPercent = isOverdue ? 100 : (clampedMs / totalWindowMs) * 100;
    if (!isOverdue && progressPercent > 0 && progressPercent < 20) {
      progressPercent = 20; // Keep glowing arc ring stroke clearly visible when active
    }

    const radius = 22;
    const strokeWidth = 4;
    const circumference = 2 * Math.PI * radius; // ~138.23
    const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

    const ringColor = isOverdue
      ? "#ef4444"
      : progressPercent <= 30 || line1 === "Today"
      ? "#f59e0b"
      : typeColor || "#a855f7";

    return (
      <div
        title={fullText}
        style={{
          position: "relative",
          width: 58,
          height: 58,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }}
      >
        <svg width={58} height={58} style={{ transform: "rotate(-90deg)" }}>
          {/* Background Circle Track */}
          <circle
            cx={29}
            cy={29}
            r={radius}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={strokeWidth}
            fill="rgba(0,0,0,0.5)"
          />
          {/* Animated Progress Ring Stroke */}
          <circle
            cx={29}
            cy={29}
            r={radius}
            stroke={ringColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.4s ease, stroke 0.3s ease",
              filter: `drop-shadow(0 0 5px ${ringColor}90)`
            }}
          />
        </svg>
        {/* Center 2-Line Text inside Circle */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1.05,
            fontFamily: "monospace",
            textAlign: "center"
          }}
        >
          <span style={{ fontSize: line1 === "Today" ? 10 : 11, fontWeight: 900, color: isOverdue ? "#f87171" : "#ffffff" }}>
            {line1}
          </span>
          <span style={{ fontSize: 9, fontWeight: 800, color: isOverdue ? "#fca5a5" : "rgba(255,255,255,0.75)" }}>
            {line2}
          </span>
        </div>
      </div>
    );
  } catch (e) {
    return null;
  }
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
    case "CLIENT_NOTE":
    case "NOTE":
      return { bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.25)", color: "#f97316" };
    case "TASK":
    case "REMINDER":
      return { bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.25)", color: "#a855f7" };
    case "ALERT":
      return { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.25)", color: "#ef4444" };
    case "FOLLOWUP":
      return { bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.25)", color: "#3b82f6" };
    case "ADD_NOTE_TASK":
      return { bg: "rgba(14,165,233,0.12)", border: "rgba(14,165,233,0.25)", color: "#0ea5e9" };
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5 }}>
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
          <div key={d} style={{ textAlign: "center", fontSize: 10, fontWeight: 800, color: "#525252", paddingBottom: 6 }}>{d}</div>
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
                width: "100%",
                aspectRatio: "1",
                background: day ? (hoveredDay === i ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.02)") : "rgba(255,255,255,0.005)",
                border: isToday ? "1.5px solid #f97316" : day ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(255,255,255,0.015)",
                borderRadius: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 4px",
                position: "relative",
                cursor: day ? "pointer" : "default",
                transition: "all 0.15s ease",
                boxShadow: isToday ? "0 0 12px rgba(249,115,22,0.25)" : "none"
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
  setExpandedLead,
  db,
  currentAdmin,
  triggerConfirm,
  logActivity
}) {
  const [activityLogs, setActivityLogs] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [dateRange, setDateRange] = useState("all");
  const [logSearch, setLogSearch] = useState("");
  const [feedFilter, setFeedFilter] = useState("all"); // all, notes, tasks, alerts, followup, system
  const [taskFilter, setTaskFilter] = useState("all"); // all, task, alert, followup, note
  const [isPendingTasksOpen, setIsPendingTasksOpen] = useState(false);
  const [completedTaskIds, setCompletedTaskIds] = useState(new Set());
  const [deletedTaskIds, setDeletedTaskIds] = useState(new Set());
  const [activeDoneMenuId, setActiveDoneMenuId] = useState(null);

  // Delete single item from Firestore database & lead timeline
  const handleDeleteItemFromDb = async (item, leadId) => {
    if (!db) return;
    try {
      if (item.dbTask || item.id?.startsWith("dbtask_")) {
        try { await deleteDoc(doc(db, "tasks", item.id)); } catch (e) {}
      }

      const targetLeadId = item.leadId || leadId;
      if (targetLeadId) {
        const leadRef = doc(db, "leads", targetLeadId);
        const leadSnap = await getDoc(leadRef);
        if (leadSnap.exists()) {
          const currentTimeline = leadSnap.data().timeline || [];
          const updatedTimeline = currentTimeline.filter(t => {
            const rawId = item.id ? item.id.replace(`item_${targetLeadId}_`, "").replace(`tl_${targetLeadId}_`, "") : null;
            if (t.id && rawId && (t.id === rawId || t.id === item.id)) return false;
            const tText = (t.text || t.title || t.details || "").trim();
            const itemText = (item.title || "").trim();
            if (tText && itemText && tText === itemText) return false;
            return true;
          });
          await updateDoc(leadRef, { timeline: updatedTimeline });
        }
      }
    } catch (err) {
      console.warn("Delete item from Firestore failed:", err);
    }
  };

  // Clear all items for a lead group from Firestore database & timeline
  const handleClearAllGroupItemsFromDb = async (group) => {
    if (!db || !group) return;
    try {
      const targetLeadId = group.leadId;
      if (targetLeadId) {
        const leadRef = doc(db, "leads", targetLeadId);
        const leadSnap = await getDoc(leadRef);
        if (leadSnap.exists()) {
          await updateDoc(leadRef, { timeline: [] });
        }
      }
      if (Array.isArray(group.items)) {
        group.items.forEach(async (item) => {
          if (item.dbTask) {
            try { await deleteDoc(doc(db, "tasks", item.id)); } catch (e) {}
          }
        });
      }
    } catch (err) {
      console.warn("Clear group items from Firestore failed:", err);
    }
  };

  // Client Task Groups Data & Dynamic Summary Metrics (Linked to Real Firestore Leads)
  const taskGroupsData = useMemo(() => {
    const todayStr = new Date().toISOString().split("T")[0];

    const groups = (rawLeads || []).map((lead) => {
      const clientName = (lead.fullName || lead.name || lead.companyName || lead.email?.split("@")[0] || "Client").trim();
      const email = lead.email || "No email provided";
      const phone = lead.phone || lead.phoneNumber || "No phone provided";
      const status = lead.status || "new";
      const service = lead.selectedService || lead.service || lead.servicesRequested || "Full Account Management";

      // Helper function to identify system submission clutter, Calendly bookings & inbound notes
      const isSystemClutter = (text, entry) => {
        if (entry?.type === "system" || entry?.action === "system") return true;
        if (!text || typeof text !== "string") return true;
        const lower = text.toLowerCase().trim();
        return (
          lower.includes("calendly") ||
          lower.includes("meeting successfully scheduled") ||
          lower.includes("meeting scheduled") ||
          lower.includes("booked") ||
          lower.includes("submitted via") ||
          lower.includes("no message") ||
          lower.includes("initial lead action") ||
          lower.includes("landing page") ||
          lower.includes("inbound") ||
          lower === "no message provided"
        );
      };

      const items = [];

      // 1. Map real lead timeline entries if available (ONLY manually created admin items)
      if (Array.isArray(lead.timeline) && lead.timeline.length > 0) {
        lead.timeline.forEach((entry, idx) => {
          const rawText = (entry.text || entry.title || entry.details || "").trim();
          if (isSystemClutter(rawText, entry)) return;

          let dDate = entry.dueDate || null;
          let dTime = entry.dueTime || null;

          if (!dDate && entry.timestamp) {
            try {
              const tDate = entry.timestamp.toDate ? entry.timestamp.toDate() : new Date(entry.timestamp.seconds ? entry.timestamp.seconds * 1000 : entry.timestamp);
              if (!isNaN(tDate)) {
                dDate = tDate.toISOString().split("T")[0];
                dTime = tDate.toTimeString().slice(0, 5);
              }
            } catch (e) {}
          }

          const rawType = (entry.type || entry.action || "note").toString().toLowerCase().trim();
          let normType = "note";
          if (rawType.includes("task") || rawType.includes("reminder")) normType = "task";
          else if (rawType.includes("alert")) normType = "alert";
          else if (rawType.includes("followup") || rawType.includes("follow_up")) normType = "followup";

          items.push({
            id: entry.id ? `item_${lead.id}_${entry.id}` : `tl_${lead.id}_${idx}`,
            type: normType,
            title: rawText,
            dueDate: dDate || todayStr,
            dueTime: dTime || null,
            isCompleted: Boolean(entry.isCompleted)
          });
        });
      }

      // 2. Map recent new lead & meeting reminders (ONLY for fresh leads created within last 2 hours for unbooked leads, and 24h for booked meetings)
      let leadCreatedDate = null;
      if (lead.createdAt) {
        leadCreatedDate = lead.createdAt.toDate ? lead.createdAt.toDate() : new Date(lead.createdAt.seconds ? lead.createdAt.seconds * 1000 : lead.createdAt);
      }
      const now = new Date();

      if (leadCreatedDate && !isNaN(leadCreatedDate)) {
        const timeDiffMs = now.getTime() - leadCreatedDate.getTime();
        const isMeetingBooked = Boolean(lead.meetingBooked || lead.status === "meeting_booked");

        if (isMeetingBooked && timeDiffMs >= 0 && timeDiffMs <= 24 * 60 * 60 * 1000) {
          // New meeting booked within last 24h: 1-day (24h) timer to do account/client background research
          const due1d = new Date(leadCreatedDate.getTime() + 24 * 60 * 60 * 1000);
          items.push({
            id: `recent_meeting_res_${lead.id}`,
            type: "task",
            title: `Task: Conduct client background & account research`,
            dueDate: due1d.toISOString().split("T")[0],
            dueTime: due1d.toTimeString().slice(0, 5),
            isCompleted: false
          });
        } else if (!isMeetingBooked && (lead.status === "new" || !lead.status) && timeDiffMs >= 0 && timeDiffMs <= 2 * 60 * 60 * 1000) {
          // Brand new inbound lead (unbooked) created within last 2 hours: 2-hour reminder to set follow-up email
          const due2h = new Date(leadCreatedDate.getTime() + 2 * 60 * 60 * 1000);
          items.push({
            id: `recent_lead_fu_${lead.id}`,
            type: "followup",
            title: `Action Item: Set follow-up email within 2 hours`,
            dueDate: due2h.toISOString().split("T")[0],
            dueTime: due2h.toTimeString().slice(0, 5),
            isCompleted: false
          });
        }
      }

      const rawNotes = (lead.notes || lead.challenge || lead.message || "").trim();
      const isClutterNote = rawNotes.toLowerCase().includes("no message") || rawNotes.toLowerCase().includes("submitted via");
      const notes = isClutterNote ? "" : rawNotes;

      return {
        clientName,
        email,
        phone,
        status,
        service,
        leadId: lead.id,
        notes,
        items
      };
    });

    let totalPending = 0;
    let overdueCount = 0;
    let todayCount = 0;
    let taskCount = 0;
    let alertCount = 0;
    let followupCount = 0;
    let noteCount = 0;
    let nearestItem = null;
    let smallestFutureDiff = Infinity;

    groups.forEach(g => {
      g.items.forEach(item => {
        if (deletedTaskIds.has(item.id)) return;
        const isDone = completedTaskIds.has(item.id);

        if (!isDone) {
          totalPending++;
          if (item.type === "task") taskCount++;
          if (item.type === "alert") alertCount++;
          if (item.type === "followup") followupCount++;
          if (item.type === "note") noteCount++;

          const timer = getCountdownTimer(item.dueDate, item.dueTime);
          if (timer.isPast) {
            overdueCount++;
          } else {
            // Check if due today
            if (item.dueDate === todayStr || timer.label === "Today" || (timer.hours != null && timer.hours < 24)) {
              todayCount++;
            }
            // Check for nearest task
            if (timer.hours != null) {
              const totalMins = timer.hours * 60 + timer.minutes;
              if (totalMins < smallestFutureDiff) {
                smallestFutureDiff = totalMins;
                nearestItem = { ...item, clientName: g.clientName, timer };
              }
            }
          }
        }
      });
    });

    return {
      groups,
      totalPending,
      overdueCount,
      todayCount,
      taskCount,
      alertCount,
      followupCount,
      noteCount,
      nearestItem
    };
  }, [rawLeads, completedTaskIds, deletedTaskIds]);

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
  const bookedMeetingsCount = leads.filter(l => Boolean(l.meetingBooked || l.status === "hot" || l.status === "meeting_booked")).length;
  const conversionRate = leads.length > 0
    ? ((bookedMeetingsCount / leads.length) * 100).toFixed(1) + "%"
    : "0%";

  const hotLeadsCount = leads.filter(l => (l.status || "new") === "hot").length;
  const overdueLeads = leads.filter(l =>
    l.nextFollowUp &&
    new Date(l.nextFollowUp) < new Date(new Date().setHours(0,0,0,0)) &&
    l.status !== "won" && l.status !== "lost"
  );

  const todayStr = new Date().toISOString().split("T")[0];
  const followUpsToday = leads.filter(l => l.nextFollowUp === todayStr && l.status !== "won" && l.status !== "lost");

  const [isRefreshingLogs, setIsRefreshingLogs] = useState(false);

  // One-time fetch per 24 hours for activity logs (to minimize Firebase reads)
  const fetchActivityLogs = async (forceRefresh = false) => {
    if (!db) return;
    
    // Skip auto-fetch if logs were already fetched within the last 24 hours (unless manually refreshed)
    if (!forceRefresh && typeof window !== "undefined") {
      const lastFetched = localStorage.getItem("orbit_logs_last_fetched");
      if (lastFetched) {
        const timePassed = Date.now() - parseInt(lastFetched, 10);
        const twentyFourHours = 24 * 60 * 60 * 1000;
        if (!isNaN(timePassed) && timePassed < twentyFourHours) {
          return; // 24-hour rate limit active
        }
      }
    }

    setIsRefreshingLogs(true);
    try {
      const logsQ = query(collection(db, "activity_logs"), orderBy("timestamp", "desc"), limit(50));
      const snap = await getDocs(logsQ);
      const fetchedLogs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setActivityLogs(fetchedLogs);
      if (typeof window !== "undefined") {
        localStorage.setItem("orbit_logs_last_fetched", Date.now().toString());
      }
    } catch (err) {
      console.warn("Fetch activity logs failed:", err);
    } finally {
      setIsRefreshingLogs(false);
    }
  };

  // Check 24-hour rule on mount
  useEffect(() => {
    fetchActivityLogs(false);
  }, [db]);

  // Real-time listener strictly for my tasks
  useEffect(() => {
    if (!db) return;
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
      return () => unsubTasks();
    }
  }, [db, currentAdmin]);

  // Clear all activity logs from Firestore database & state
  const handleClearActivityLogs = async () => {
    const clearAction = async () => {
      try {
        if (db) {
          const snap = await getDocs(collection(db, "activity_logs"));
          if (!snap.empty) {
            const batch = writeBatch(db);
            snap.docs.forEach(docSnap => batch.delete(docSnap.ref));
            await batch.commit();
          }
        }
        setActivityLogs([]);
        if (typeof window !== "undefined") {
          localStorage.removeItem("orbit_logs_last_fetched");
        }
        if (typeof logActivity === "function") {
          logActivity("CLEAR_LOGS", "Cleared the audit feed logs");
        }
      } catch (err) {
        console.warn("Failed to clear activity logs:", err);
      }
    };

    if (triggerConfirm) {
      triggerConfirm(
        "Clear Audit Logs",
        "Are you sure you want to permanently delete all activity logs from the audit feed? This action cannot be undone.",
        clearAction,
        true
      );
    } else if (typeof window !== "undefined" && window.confirm("Are you sure you want to clear all activity logs?")) {
      clearAction();
    }
  };

  // Sort and filter real activity logs for the Audit Feed
  const mergedTimeline = React.useMemo(() => {
    const finalTimeline = [...activityLogs];

    // Sort descending by timestamp
    finalTimeline.sort((a, b) => {
      const timeA = a.timestamp?.toDate ? a.timestamp.toDate().getTime() : new Date(a.timestamp || 0).getTime();
      const timeB = b.timestamp?.toDate ? b.timestamp.toDate().getTime() : new Date(b.timestamp || 0).getTime();
      return timeB - timeA;
    });

    return finalTimeline.slice(0, 150);
  }, [activityLogs]);

  // Combine DB tasks with Lead Timeline Tasks & Scheduled Reminders
  const allPendingTasks = React.useMemo(() => {
    const list = [];
    const seenIds = new Set();

    // 1. Add tasks from DB 'tasks' collection
    (myTasks || []).forEach(t => {
      if (t.status === "completed" || t.isCompleted) return;

      const linkedLead = t.leadId ? (rawLeads || []).find(l => l.id === t.leadId) : null;
      const clientNameStr = (
        (typeof t.clientName === "string" && t.clientName.trim()) ||
        (linkedLead ? (linkedLead.fullName || linkedLead.email) : null) ||
        "General Admin Tasks"
      ).trim();

      const titleStr = (
        (typeof t.title === "string" && t.title.trim()) ||
        (typeof t.text === "string" && t.text.trim()) ||
        (typeof t.details === "string" && t.details.trim()) ||
        (typeof t.task === "string" && t.task.trim()) ||
        ""
      ).trim();

      if (!titleStr) return; // Skip empty tasks

      const rawType = (t.type || "task").toString().toLowerCase();
      const normType = rawType.includes("alert") ? "alert" : rawType.includes("follow") ? "followup" : rawType.includes("note") ? "note" : "task";

      list.push({
        id: t.id || `dbtask_${Math.random()}`,
        leadId: t.leadId || null,
        clientName: clientNameStr,
        title: titleStr,
        type: normType,
        dueDate: t.dueDate || "Today",
        dueTime: t.dueTime || "",
        dbTask: true
      });
    });

    // 2. Add pending tasks/reminders/alerts/followups from lead timelines
    (rawLeads || []).forEach(l => {
      const clientNameStr = (typeof l.fullName === "string" && l.fullName.trim()) ? l.fullName.trim() : ((typeof l.email === "string" && l.email.trim()) ? l.email.trim() : "Client");

      if (l.timeline && Array.isArray(l.timeline)) {
        l.timeline.forEach(t => {
          if (t.isCompleted) return;

          let rawType = (t.type || t.action || "task").toString().toLowerCase().trim();
          if (rawType.includes("note")) rawType = "note";
          else if (rawType.includes("task") || rawType.includes("reminder")) rawType = "task";
          else if (rawType.includes("alert")) rawType = "alert";
          else if (rawType.includes("followup") || rawType.includes("follow_up")) rawType = "followup";
          else rawType = "note";

          const textVal = (
            (typeof t.text === "string" && t.text.trim()) ||
            (typeof t.title === "string" && t.title.trim()) ||
            (typeof t.note === "string" && t.note.trim()) ||
            (typeof t.details === "string" && t.details.trim()) ||
            ""
          ).trim();

          if (!textVal) return;
          if (t.type === "system" || t.action === "system") return;
          const lowerVal = textVal.toLowerCase();
          if (
            lowerVal.includes("calendly") ||
            lowerVal.includes("meeting successfully scheduled") ||
            lowerVal.includes("meeting scheduled") ||
            lowerVal.includes("booked") ||
            lowerVal.includes("submitted via") ||
            lowerVal.includes("no message") ||
            lowerVal.includes("initial lead action") ||
            lowerVal.includes("landing page") ||
            lowerVal.includes("inbound") ||
            lowerVal === "no message provided"
          ) return;

          const itemId = t.id || `lead_t_${l.id}_${t.timestamp || Math.random()}`;
          if (!list.some(existing => existing.id === itemId)) {
            list.push({
              id: itemId,
              leadId: l.id,
              clientName: clientNameStr,
              title: textVal,
              type: rawType,
              dueDate: t.dueDate || l.nextFollowUp || "Today",
              dueTime: t.dueTime || "",
              dbTask: false
            });
          }
        });
      }

      // Add recent lead (<2h) or meeting (<24h) action items to pending tasks
      let leadCreatedDate = null;
      if (l.createdAt) {
        leadCreatedDate = l.createdAt.toDate ? l.createdAt.toDate() : new Date(l.createdAt.seconds ? l.createdAt.seconds * 1000 : l.createdAt);
      }
      const now = new Date();

      if (leadCreatedDate && !isNaN(leadCreatedDate)) {
        const timeDiffMs = now.getTime() - leadCreatedDate.getTime();
        const isMeetingBooked = Boolean(l.meetingBooked || l.status === "meeting_booked");

        if (isMeetingBooked && timeDiffMs >= 0 && timeDiffMs <= 24 * 60 * 60 * 1000) {
          const due1d = new Date(leadCreatedDate.getTime() + 24 * 60 * 60 * 1000);
          const recId = `recent_meeting_res_${l.id}`;
          if (!list.some(existing => existing.id === recId)) {
            list.push({
              id: recId,
              leadId: l.id,
              clientName: clientNameStr,
              title: `Task: Conduct client background & account research`,
              type: "task",
              dueDate: due1d.toISOString().split("T")[0],
              dueTime: due1d.toTimeString().slice(0, 5),
              dbTask: false
            });
          }
        } else if (!isMeetingBooked && (l.status === "new" || !l.status) && timeDiffMs >= 0 && timeDiffMs <= 2 * 60 * 60 * 1000) {
          const due2h = new Date(leadCreatedDate.getTime() + 2 * 60 * 60 * 1000);
          const recId = `recent_lead_fu_${l.id}`;
          if (!list.some(existing => existing.id === recId)) {
            list.push({
              id: recId,
              leadId: l.id,
              clientName: clientNameStr,
              title: `Action Item: Set follow-up email within 2 hours`,
              type: "followup",
              dueDate: due2h.toISOString().split("T")[0],
              dueTime: due2h.toTimeString().slice(0, 5),
              dbTask: false
            });
          }
        }
      }
    });

    return list;
  }, [myTasks, rawLeads]);

  // Filter timeline based on search query & feedFilter
  const filteredTimeline = React.useMemo(() => {
    let list = mergedTimeline;
    if (feedFilter !== "all") {
      if (feedFilter === "notes") list = list.filter(l => l.action === "CLIENT_NOTE" || l.action === "NOTE");
      else if (feedFilter === "tasks") list = list.filter(l => l.action === "TASK" || l.action === "REMINDER");
      else if (feedFilter === "alerts") list = list.filter(l => l.action === "ALERT");
      else if (feedFilter === "followup") list = list.filter(l => l.action === "FOLLOWUP");
      else if (feedFilter === "system") list = list.filter(l => ["NEW_LEAD", "MEETING_BOOKED"].includes(l.action));
    }
    if (!logSearch.trim()) return list;
    const q = logSearch.toLowerCase();
    return list.filter(log =>
      log.action?.toLowerCase().includes(q) ||
      log.adminName?.toLowerCase().includes(q) ||
      log.details?.toLowerCase().includes(q)
    );
  }, [mergedTimeline, logSearch, feedFilter]);

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
        <StatCard title="Booked Meetings" value={bookedMeetingsCount} sub="Calendly bookings" icon={Calendar} />
        <StatCard title="Conversion Est" value={conversionRate} sub="Meetings-to-Lead ratio" icon={TrendingUp} />
        <StatCard title="Total Users"    value={users.length}  sub="Registered accounts"    icon={Users} />
      </div>

      {/* Visual Analytics Funnel, Services Chart & Lead Sources Row */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1.5fr 1.5fr", gap: 14 }}>
        {/* Pipeline Conversion Funnel */}
        <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: isMobile ? "16px" : "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em" }}>Lead Conversion Funnel</div>
          {(() => {
            const total = leads.length;
            const meetings = bookedMeetingsCount;
            const won = leads.filter(l => l.status === "won").length;

            const r2 = total > 0 ? (meetings / total) : 0;
            const r3 = total > 0 ? (won / total) : 0;

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
              .map(([service, count], idx) => {
                const percent = leads.length ? Math.round((count / leads.length) * 100) : 0;

                // Determine gradient by ranked index
                const progressGradients = [
                  "linear-gradient(90deg, #f97316, #ea580c)", // 1st: Theme Orange
                  "linear-gradient(90deg, #fbbf24, #d97706)", // 2nd: Yellowish/Golden
                  "linear-gradient(90deg, #a855f7, #7c3aed)", // 3rd: Purple
                  "linear-gradient(90deg, #ef4444, #b91c1c)"  // 4th: Reddish
                ];
                const activeGrad = progressGradients[idx] || progressGradients[3];

                return (
                  <div key={service} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600 }}>
                      <span style={{ color: "#a3a3a3", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "80%" }}>{service}</span>
                      <span style={{ color: "#f97316", fontWeight: 700 }}>{count} ({percent}%)</span>
                    </div>
                    <div style={{ width: "100%", height: 5, background: "rgba(255,255,255,0.03)", borderRadius: 10, overflow: "hidden" }}>
                      <div style={{ height: "100%", background: activeGrad, width: `${percent}%`, borderRadius: 10, transition: "width 0.4s ease" }} />
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

        {/* Lead Sources */}
        <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: isMobile ? "16px" : "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em" }}>Lead Sources</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "center", flex: 1 }}>
            {Object.entries(leads.reduce((acc, l) => { const k = l.source || "Direct"; acc[k] = (acc[k] || 0) + 1; return acc; }, {})).slice(0, 4).map(([src, count], idx) => {
              const percent = leads.length ? Math.round((count / leads.length) * 100) : 0;

              const progressGradients = [
                "linear-gradient(90deg, #f97316, #ea580c)", // 1st: Theme Orange
                "linear-gradient(90deg, #fbbf24, #d97706)", // 2nd: Yellowish/Golden
                "linear-gradient(90deg, #a855f7, #7c3aed)", // 3rd: Purple
                "linear-gradient(90deg, #ef4444, #b91c1c)"  // 4th: Reddish
              ];
              const activeGrad = progressGradients[idx] || progressGradients[3];

              return (
                <div key={src} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600 }}>
                    <span style={{ fontSize: 11, color: "#a3a3a3", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "80%" }}>{src}</span>
                    <span style={{ color: "#f97316", fontWeight: 700 }}>{count} ({percent}%)</span>
                  </div>
                  <div style={{ width: "100%", height: 5, background: "rgba(255,255,255,0.03)", borderRadius: 10, overflow: "hidden" }}>
                    <div style={{ height: "100%", background: activeGrad, width: `${percent}%`, borderRadius: 10, transition: "width 0.4s ease" }} />
                  </div>
                </div>
              );
            })}
            {leads.length === 0 && <p style={{ fontSize: 11, color: "#3f3f46" }}>No leads yet.</p>}
          </div>
        </div>
      </div>

      {/* Task & Reminders Metric Overview Cards Bar (4-Column Real Metrics Row) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 14,
          width: "100%"
        }}
      >
        {[
          {
            title: "Pending Tasks",
            value: String(taskGroupsData.totalPending),
            sub: `${taskGroupsData.groups.length} Client Groups`,
            subColor: "#a855f7",
            color: "#a855f7",
            icon: CheckCircle2,
            filterKey: "all"
          },
          {
            title: "Overdue Items",
            value: String(taskGroupsData.overdueCount),
            sub: "Action required",
            subColor: "#ef4444",
            color: "#ef4444",
            icon: AlertCircle,
            filterKey: "overdue"
          },
          {
            title: "Nearest Task",
            value: taskGroupsData.nearestItem ? `In ${taskGroupsData.nearestItem.timer.hours}h ${taskGroupsData.nearestItem.timer.minutes}m` : "None",
            sub: taskGroupsData.nearestItem ? `${taskGroupsData.nearestItem.clientName} • ${taskGroupsData.nearestItem.title.replace(/^[^:]+:\s*/, '')}` : "All caught up!",
            subColor: "#f97316",
            color: "#f97316",
            icon: Clock,
            filterKey: "nearest"
          },
          {
            title: "Due Today",
            value: String(taskGroupsData.todayCount),
            sub: "Scheduled for today",
            subColor: "#3b82f6",
            color: "#3b82f6",
            icon: Calendar,
            filterKey: "today"
          }
        ].map((card, idx) => {
          const IconComp = card.icon;
          const isActive = taskFilter === card.filterKey;
          return (
            <div
              key={idx}
              onClick={() => {
                setTaskFilter(card.filterKey);
                setIsPendingTasksOpen(true);
              }}
              style={{
                background: isActive
                  ? `radial-gradient(circle at 0% 0%, ${card.color}28 0%, #161622 50%, #0c0c12 100%)`
                  : `radial-gradient(circle at 0% 0%, ${card.color}1a 0%, #111116 50%, #09090c 100%)`,
                border: isActive ? `1.5px solid ${card.color}` : "1px solid rgba(255, 255, 255, 0.07)",
                borderRadius: 16,
                padding: "14px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                boxShadow: isActive ? `0 6px 20px rgba(0,0,0,0.6), 0 0 16px ${card.color}30` : "0 4px 14px rgba(0, 0, 0, 0.4)",
                transition: "all 0.25s ease",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-2px)";
                if (!isActive) {
                  e.currentTarget.style.background = `radial-gradient(circle at 0% 0%, ${card.color}25 0%, #13131a 50%, #0a0a0d 100%)`;
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
                  e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.6), 0 0 16px ${card.color}20`;
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0px)";
                if (!isActive) {
                  e.currentTarget.style.background = `radial-gradient(circle at 0% 0%, ${card.color}1a 0%, #111116 50%, #09090c 100%)`;
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(0, 0, 0, 0.4)";
                }
              }}
            >
              {/* Top Row: Icon + Title */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: `${card.color}15`,
                    border: `1px solid ${card.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: card.color,
                    flexShrink: 0
                  }}
                >
                  <IconComp size={16} color={card.color} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#a1a1aa", letterSpacing: "0.02em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {card.title}
                </span>
              </div>

              {/* Middle Row: Main Stat Value */}
              <div style={{ fontSize: 20, fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em" }}>
                {card.value}
              </div>

              {/* Bottom Row: Subtext */}
              <div style={{ display: "flex", alignItems: "center", marginTop: "auto" }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: card.subColor, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {card.sub}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* My Pending Client Tasks & Scheduled Reminders Widget (FULL WIDTH & COLLAPSIBLE) */}
      <div style={{ position: "relative", zIndex: 5, background: "#0c0c0e", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column", width: "100%", marginBottom: 14, boxShadow: "0 10px 30px rgba(0,0,0,0.6)", transition: "all 0.3s ease" }}>
        {/* COLLAPSIBLE HEADER BAR */}
        <div
          onClick={() => setIsPendingTasksOpen(!isPendingTasksOpen)}
          style={{
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: isPendingTasksOpen ? "1px solid rgba(255,255,255,0.04)" : "none",
            background: "rgba(255,255,255,0.02)",
            flexWrap: "wrap",
            gap: 10,
            cursor: "pointer",
            userSelect: "none"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Clock size={16} color="#a855f7" />
            <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.15em" }}>My Pending Tasks &amp; Scheduled Reminders</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }} onClick={e => e.stopPropagation()}>
            {/* Task Type Filter Dropdown Pill Button */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
                borderRadius: 12,
                padding: "6px 14px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                transition: "all 0.2s ease"
              }}
            >
              <Filter size={13} color="#a855f7" style={{ flexShrink: 0 }} />
              <select
                value={taskFilter}
                onChange={(e) => setTaskFilter(e.target.value)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#ffffff",
                  fontSize: 11,
                  fontWeight: 800,
                  cursor: "pointer",
                  outline: "none",
                  fontFamily: "inherit",
                  letterSpacing: "0.02em"
                }}
              >
                <option value="all" style={{ background: "#14141c", color: "#ffffff" }}>All Task Types ({taskGroupsData.totalPending})</option>
                <option value="overdue" style={{ background: "#14141c", color: "#ef4444" }}>🚨 Overdue Items ({taskGroupsData.overdueCount})</option>
                <option value="nearest" style={{ background: "#14141c", color: "#f97316" }}>⏱️ Nearest Task ({taskGroupsData.nearestItem ? `In ${taskGroupsData.nearestItem.timer.hours}h ${taskGroupsData.nearestItem.timer.minutes}m` : "None"})</option>
                <option value="today" style={{ background: "#14141c", color: "#3b82f6" }}>📅 Due Today ({taskGroupsData.todayCount})</option>
                <option value="task" style={{ background: "#14141c", color: "#a855f7" }}>📋 Tasks Only ({taskGroupsData.taskCount})</option>
                <option value="alert" style={{ background: "#14141c", color: "#ef4444" }}>🚨 Alerts Only ({taskGroupsData.alertCount})</option>
                <option value="followup" style={{ background: "#14141c", color: "#3b82f6" }}>📅 Follow-ups ({taskGroupsData.followupCount})</option>
                <option value="note" style={{ background: "#14141c", color: "#f97316" }}>📝 Notes Only ({taskGroupsData.noteCount})</option>
              </select>
            </div>

            {/* Pending Count Badge */}
            <span style={{ fontSize: 10, fontWeight: 800, color: "#a855f7", background: "rgba(168,85,247,0.12)", padding: "6px 14px", borderRadius: 100, border: "1px solid rgba(168,85,247,0.28)", letterSpacing: "0.02em" }}>
              {taskFilter === "all" ? `${taskGroupsData.groups.length} Client Groups • ${taskGroupsData.totalPending} Pending Items` : `Filter: ${taskFilter.toUpperCase()}`}
            </span>

            {/* Collapse / Expand Toggle Button */}
            <div
              onClick={() => setIsPendingTasksOpen(!isPendingTasksOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 30,
                height: 30,
                borderRadius: 10,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "#a855f7",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              {isPendingTasksOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>
        </div>

        {/* WIDGET CONTENT BODY */}
        {isPendingTasksOpen && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: 16, maxHeight: 580, overflowY: "auto", background: "#08080a" }}>
          {taskGroupsData.groups.length === 0 ? (
            <div style={{ padding: "36px 20px", textAlign: "center", background: "#0c0c0f", borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)" }}>
              <Inbox size={32} color="#71717a" style={{ margin: "0 auto 10px auto" }} />
              <div style={{ fontSize: 13, fontWeight: 700, color: "#e4e4e7" }}>No Active Client Tasks or Notes</div>
              <div style={{ fontSize: 11, color: "#71717a", marginTop: 4 }}>Add a new lead or create timeline notes in the Leads tab to track real client actions here.</div>
            </div>
          ) : (
            taskGroupsData.groups.map((group, gIdx) => {
            const activeClientItems = group.items.filter(t => !deletedTaskIds.has(t.id));
            if (activeClientItems.length === 0) return null;

            const grad = getAlphabetGradient(group.clientName);
            const initial = group.clientName?.[0]?.toUpperCase() || "C";

            return (
              <div
                key={group.leadId || `${group.clientName}_${group.email}_${gIdx}`}
                style={{
                  background: "#0c0c0f",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 16,
                  padding: "18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  flexShrink: 0,
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
                  transition: "all 0.2s ease"
                }}
              >
                {/* TOP CENTERED INBOUND BRIEF / INQUIRY MESSAGE BANNER */}
                <div
                  style={{
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    borderRadius: 10,
                    padding: "8px 16px",
                    textAlign: "center",
                    fontSize: 11,
                    color: group.notes ? "#e4e4e7" : "#71717a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.5)"
                  }}
                >
                  <span style={{ fontWeight: 800, color: "#f97316", textTransform: "uppercase", fontSize: 9, letterSpacing: "0.06em", flexShrink: 0 }}>
                    Inbound Brief:
                  </span>
                  <span style={{ fontStyle: group.notes ? "italic" : "normal", fontWeight: group.notes ? 500 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {group.notes ? `"${group.notes}"` : "No initial inquiry message provided"}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: 20,
                    width: "100%"
                  }}
                >
                  {/* LEFT COLUMN: Neumorphic Client Profile Box */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    width: isMobile ? "100%" : 255,
                    background: "#111115",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 14,
                    padding: 14,
                    flexShrink: 0,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
                  }}
                >
                  {/* Header: Avatar, Name, Pending Count & Clear All Button */}
                  <div
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}
                  >
                    <div
                      onClick={() => {
                        if (group.leadId && setExpandedLead) {
                          setExpandedLead(group.leadId);
                        }
                        setActiveTab("leads");
                      }}
                      style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flex: 1, minWidth: 0 }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 12,
                          background: grad,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 15,
                          fontWeight: 900,
                          color: "#fff",
                          boxShadow: "4px 4px 10px rgba(0,0,0,0.5), inset 1px 1px 2px rgba(255,255,255,0.3)",
                          border: "1px solid rgba(255,255,255,0.18)",
                          flexShrink: 0
                        }}
                      >
                        {initial}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2, overflow: "hidden" }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {group.clientName}
                        </span>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                          <span style={{ fontSize: 9, fontWeight: 800, color: "#a855f7", background: "rgba(168,85,247,0.15)", padding: "2px 8px", borderRadius: 100, border: "1px solid rgba(168,85,247,0.3)" }}>
                            {activeClientItems.length} Pending
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Delete / Clear All Tasks for User Button */}
                    <button
                      type="button"
                      title={`Clear all tasks and notifications for ${group.clientName}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        const performClear = () => {
                          const idsToDelete = group.items.map(item => item.id);
                          setDeletedTaskIds(prev => {
                            const next = new Set(prev);
                            idsToDelete.forEach(id => next.add(id));
                            return next;
                          });
                          handleClearAllGroupItemsFromDb(group);
                        };

                        if (triggerConfirm) {
                          triggerConfirm(
                            "Clear Client Tasks",
                            `Are you sure you want to clear all tasks, alerts, and reminders for "${group.clientName}"? This action cannot be undone.`,
                            performClear,
                            true
                          );
                        } else if (typeof window !== "undefined" && window.confirm(`Are you sure you want to clear all tasks and reminders for ${group.clientName}?`)) {
                          performClear();
                        }
                      }}
                      style={{
                        background: "rgba(239, 68, 68, 0.12)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        borderRadius: 8,
                        width: 28,
                        height: 28,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: "#ef4444",
                        transition: "all 0.2s ease",
                        flexShrink: 0,
                        marginLeft: 6
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(239, 68, 68, 0.25)";
                        e.currentTarget.style.color = "#ffffff";
                        e.currentTarget.style.borderColor = "#ef4444";
                        e.currentTarget.style.boxShadow = "0 0 10px rgba(239, 68, 68, 0.4)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "rgba(239, 68, 68, 0.12)";
                        e.currentTarget.style.color = "#ef4444";
                        e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.3)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  {/* Contact Details Panel (Embedded Down) */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      padding: "10px 12px",
                      minHeight: 65,
                      background: "rgba(0, 0, 0, 0.25)",
                      borderRadius: 10,
                      border: "none",
                      boxShadow: "none"
                    }}
                  >
                    <div style={{ fontSize: 8, fontWeight: 900, color: "#a855f7", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      Contact Details
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "#e4e4e7", overflow: "hidden" }}>
                      <Mail size={12} color="#a855f7" style={{ flexShrink: 0 }} />
                      <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 500 }}>
                        {group.email}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "#e4e4e7" }}>
                      <Phone size={12} color="#a855f7" style={{ flexShrink: 0 }} />
                      <span style={{ fontWeight: 500 }}>{group.phone}</span>
                    </div>
                  </div>

                  {/* Neumorphic Extruded Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (group.leadId && setExpandedLead) {
                        setExpandedLead(group.leadId);
                      }
                      setActiveTab("leads");
                    }}
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: "#f97316",
                      background: "linear-gradient(145deg, #1c1c24, #14141a)",
                      border: "1px solid rgba(249,115,22,0.35)",
                      padding: "8px 12px",
                      borderRadius: 8,
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.2s ease",
                      letterSpacing: "0.02em",
                      boxShadow: "3px 3px 8px #0a0a0d, -2px -2px 6px rgba(255,255,255,0.03)"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "linear-gradient(145deg, #f97316, #ea580c)";
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.boxShadow = "4px 4px 12px rgba(249,115,22,0.4), -2px -2px 8px rgba(255,255,255,0.05)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "linear-gradient(145deg, #1c1c24, #14141a)";
                      e.currentTarget.style.color = "#f97316";
                      e.currentTarget.style.boxShadow = "3px 3px 8px #0a0a0d, -2px -2px 6px rgba(255,255,255,0.03)";
                    }}
                  >
                  View Lead Profile →
                  </button>
                </div>

                {/* VERTICAL DIVIDER LINE */}
                {!isMobile && (
                  <div style={{ width: 1, minHeight: 60, background: "rgba(255,255,255,0.06)", alignSelf: "stretch", boxShadow: "1px 0 0 rgba(0,0,0,0.5)" }} />
                )}

                {/* RIGHT COLUMN: 2x2 Grid Layout of Neumorphic Items */}
                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                    gap: 12
                  }}
                >
                  {group.items
                    .filter(t => !deletedTaskIds.has(t.id))
                    .filter(t => {
                      if (taskFilter === "all") return true;
                      if (taskFilter === "task" || taskFilter === "alert" || taskFilter === "followup" || taskFilter === "note") {
                        return t.type === taskFilter;
                      }
                      const isCompleted = completedTaskIds.has(t.id);
                      if (isCompleted) return taskFilter === "all";

                      const countdown = getCountdownTimer(t.dueDate, t.dueTime);
                      if (taskFilter === "overdue") {
                        return countdown.isPast;
                      }
                      if (taskFilter === "today") {
                        const todayStr = new Date().toISOString().split("T")[0];
                        return t.dueDate === todayStr || countdown.label === "Today" || (countdown.hours != null && countdown.hours < 24 && !countdown.isPast);
                      }
                      if (taskFilter === "nearest") {
                        return (countdown.hours != null && countdown.hours < 12 && !countdown.isPast);
                      }
                      return true;
                    }).map((t) => {
                      const isAlert = t.type === "alert";
                      const isTask = t.type === "task";
                      const isFollowup = t.type === "followup";
                      const isItemCompleted = completedTaskIds.has(t.id);

                      const typeColor = isItemCompleted ? "#22c55e" : isAlert ? "#ef4444" : isTask ? "#a855f7" : isFollowup ? "#3b82f6" : "#f97316";
                      const TypeIcon = isItemCompleted ? CheckCircle2 : isAlert ? AlertCircle : isTask ? CheckCircle2 : isFollowup ? Calendar : MessageSquare;
                      const typeLabel = isItemCompleted ? "COMPLETED" : isAlert ? "ALERT" : isTask ? "TASK" : isFollowup ? "FOLLOW-UP" : "NOTE";

                      return (
                        <div
                          key={t.id}
                          style={{
                            padding: "14px 16px",
                            background: isItemCompleted ? "linear-gradient(135deg, rgba(34,197,94,0.06) 0%, #090e0b 100%)" : "linear-gradient(135deg, #141419 0%, #0c0c0f 100%)",
                            border: isItemCompleted ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(255, 255, 255, 0.06)",
                            borderLeft: isItemCompleted ? "4px solid #22c55e" : "4px solid rgba(255, 255, 255, 0.14)",
                            borderRadius: 14,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            gap: 12,
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
                            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                            cursor: "pointer",
                            opacity: isItemCompleted ? 0.8 : 1
                          }}
                          onClick={() => {
                            if (group.leadId && setExpandedLead) {
                              setExpandedLead(group.leadId);
                            }
                            setActiveTab("leads");
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = isItemCompleted ? "linear-gradient(135deg, rgba(34,197,94,0.12) 0%, #0d1510 100%)" : "linear-gradient(135deg, #191920 0%, #101014 100%)";
                            e.currentTarget.style.borderLeftColor = typeColor;
                            e.currentTarget.style.boxShadow = `0 6px 20px rgba(0,0,0,0.6), 0 0 16px ${typeColor}25`;
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                            e.currentTarget.style.transform = "translateY(-2px)";
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = isItemCompleted ? "linear-gradient(135deg, rgba(34,197,94,0.06) 0%, #090e0b 100%)" : "linear-gradient(135deg, #141419 0%, #0c0c0f 100%)";
                            e.currentTarget.style.borderLeftColor = isItemCompleted ? "#22c55e" : "rgba(255, 255, 255, 0.14)";
                            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.4)";
                            e.currentTarget.style.borderColor = isItemCompleted ? "rgba(34,197,94,0.25)" : "rgba(255, 255, 255, 0.06)";
                            e.currentTarget.style.transform = "translateY(0px)";
                          }}
                        >
                          {/* Top Header: Badge + Mark Done Button Menu */}
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, position: "relative" }}>
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 5,
                                fontSize: 9,
                                fontWeight: 900,
                                textTransform: "uppercase",
                                padding: "4px 10px",
                                borderRadius: 8,
                                background: `${typeColor}18`,
                                color: typeColor,
                                border: `1px solid ${typeColor}35`,
                                letterSpacing: "0.03em"
                              }}
                            >
                              <TypeIcon size={12} color={typeColor} style={{ flexShrink: 0 }} />
                              <span>{typeLabel}</span>
                            </div>

                            {/* Done / Options Dropdown Popover Button */}
                            <div style={{ position: "relative" }} onClick={e => e.stopPropagation()}>
                              <button
                                type="button"
                                onClick={() => setActiveDoneMenuId(activeDoneMenuId === t.id ? null : t.id)}
                                style={{
                                  background: isItemCompleted ? "rgba(34,197,94,0.2)" : "linear-gradient(145deg, rgba(34,197,94,0.2), rgba(34,197,94,0.08))",
                                  border: "1px solid rgba(34,197,94,0.35)",
                                  color: "#4ade80",
                                  borderRadius: 8,
                                  padding: "4px 9px",
                                  fontSize: 9,
                                  fontWeight: 800,
                                  cursor: "pointer",
                                  boxShadow: "2px 2px 5px #08080b, -1px -1px 4px rgba(255,255,255,0.03)",
                                  transition: "all 0.2s ease",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 4,
                                  flexShrink: 0
                                }}
                              >
                                <CheckCircle2 size={10} style={{ flexShrink: 0 }} />
                                <span>{isItemCompleted ? "Completed" : "Done"}</span>
                                <ChevronDown size={10} />
                              </button>

                              {/* Action Popover Menu */}
                              {activeDoneMenuId === t.id && (
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "100%",
                                    right: 0,
                                    marginTop: 6,
                                    background: "#14141c",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    borderRadius: 12,
                                    padding: 6,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 4,
                                    zIndex: 60,
                                    boxShadow: "0 10px 24px rgba(0,0,0,0.8)",
                                    minWidth: 155
                                  }}
                                >
                                  {!isItemCompleted ? (
                                    <button
                                      onClick={() => {
                                        setCompletedTaskIds(prev => new Set(prev).add(t.id));
                                        setActiveDoneMenuId(null);
                                      }}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        padding: "8px 10px",
                                        borderRadius: 8,
                                        background: "rgba(34,197,94,0.1)",
                                        border: "none",
                                        color: "#4ade80",
                                        fontSize: 10,
                                        fontWeight: 800,
                                        cursor: "pointer",
                                        textAlign: "left"
                                      }}
                                    >
                                      <CheckCircle2 size={12} color="#22c55e" />
                                      <span>Keep & Mark Done</span>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        setCompletedTaskIds(prev => {
                                          const next = new Set(prev);
                                          next.delete(t.id);
                                          return next;
                                        });
                                        setActiveDoneMenuId(null);
                                      }}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        padding: "8px 10px",
                                        borderRadius: 8,
                                        background: "rgba(59,130,246,0.1)",
                                        border: "none",
                                        color: "#60a5fa",
                                        fontSize: 10,
                                        fontWeight: 800,
                                        cursor: "pointer",
                                        textAlign: "left"
                                      }}
                                    >
                                      <RotateCcw size={12} color="#3b82f6" />
                                      <span>Re-open Task</span>
                                    </button>
                                  )}

                                  <button
                                    onClick={() => {
                                      if (setActiveTab) setActiveTab("newsletter");
                                      setActiveDoneMenuId(null);
                                    }}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 8,
                                      padding: "8px 10px",
                                      borderRadius: 8,
                                      background: "rgba(249,115,22,0.1)",
                                      border: "none",
                                      color: "#f97316",
                                      fontSize: 10,
                                      fontWeight: 800,
                                      cursor: "pointer",
                                      textAlign: "left"
                                    }}
                                  >
                                    <Mail size={12} color="#f97316" />
                                    <span>Open Email Designer</span>
                                  </button>

                                  <button
                                    onClick={() => {
                                      setDeletedTaskIds(prev => new Set(prev).add(t.id));
                                      setActiveDoneMenuId(null);
                                      handleDeleteItemFromDb(t, group.leadId);
                                    }}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 8,
                                      padding: "8px 10px",
                                      borderRadius: 8,
                                      background: "rgba(239,68,68,0.1)",
                                      border: "none",
                                      color: "#f87171",
                                      fontSize: 10,
                                      fontWeight: 800,
                                      cursor: "pointer",
                                      textAlign: "left"
                                    }}
                                  >
                                    <Trash2 size={12} color="#ef4444" />
                                    <span>Delete Item</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Middle & Bottom: Title, Date + Circular Progress Ring */}
                          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 10, paddingTop: 4 }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, minWidth: 0 }}>
                              <div
                                style={{
                                  fontSize: 12,
                                  color: isItemCompleted ? "#a1a1aa" : "#ffffff",
                                  fontWeight: 700,
                                  lineHeight: "1.4",
                                  letterSpacing: "-0.01em",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  textDecoration: isItemCompleted ? "line-through" : "none"
                                }}
                              >
                                {t.title}
                              </div>

                              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "#71717a", fontFamily: "monospace" }}>
                                <Clock size={11} color="#71717a" style={{ flexShrink: 0 }} />
                                <span>Due: {t.dueDate} {t.dueTime ? `at ${t.dueTime}` : ""}</span>
                              </div>

                              {/* Direct Launch Email Designer Button for Follow-ups / Email Tasks */}
                              {(isFollowup || (t.title && (t.title.toLowerCase().includes("email") || t.title.toLowerCase().includes("follow-up")))) && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (setActiveTab) setActiveTab("newsletter");
                                  }}
                                  style={{
                                    marginTop: 4,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 5,
                                    padding: "5px 10px",
                                    borderRadius: 6,
                                    background: "linear-gradient(135deg, rgba(249, 115, 22, 0.25), rgba(249, 115, 22, 0.12))",
                                    border: "1px solid rgba(249, 115, 22, 0.4)",
                                    color: "#f97316",
                                    fontSize: 10,
                                    fontWeight: 800,
                                    cursor: "pointer",
                                    width: "fit-content",
                                    transition: "all 0.2s ease",
                                    boxShadow: "0 2px 6px rgba(249, 115, 22, 0.2)"
                                  }}
                                  onMouseEnter={e => {
                                    e.currentTarget.style.background = "#f97316";
                                    e.currentTarget.style.color = "#ffffff";
                                  }}
                                  onMouseLeave={e => {
                                    e.currentTarget.style.background = "linear-gradient(135deg, rgba(249, 115, 22, 0.25), rgba(249, 115, 22, 0.12))";
                                    e.currentTarget.style.color = "#f97316";
                                  }}
                                  title="Launch Email Designer directly to compose follow-up"
                                >
                                  <Mail size={11} /> Open Email Designer →
                                </button>
                              )}
                            </div>

                            {/* CIRCULAR TIMER PROGRESS RING */}
                            <CircularTimerProgress dueDate={t.dueDate} dueTime={t.dueTime} typeColor={typeColor} isCompleted={isItemCompleted} />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            );
          })
        )}
      </div>
        )}
      </div>

      {/* 2-Column Layout */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>

        {/* Left Column (50%) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Mini Calendar for leads & meetings */}
          <OverviewMiniCalendar leads={leads} />

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
            {leads.slice(0, 5).map((lead, i) => {
              const name = lead.fullName || "Unknown";

              return (
                <div key={lead.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.03)" : "none" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}
                >
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: getAlphabetGradient(name), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "#fff", border: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
                    {name[0].toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</div>
                    <div style={{ fontSize: 9, color: "#525252", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{lead.requestedService}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                    <StatusBadge status={lead.status || "new"} />
                    <div style={{ fontSize: 8, color: "#3f3f46", fontFamily: "monospace" }}>{fmt(lead.createdAt)}</div>
                  </div>
                </div>
              );
            })}
            {leads.length === 0 && (
              <div style={{ padding: "24px 20px", textAlign: "center", color: "#333", fontSize: 11 }}>
                No leads received yet.
              </div>
            )}
          </div>
        </div>

        {/* Right Column (50%): Activity Feed & Recent Leads */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Admin list */}
          <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: "20px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Admin Users</div>
            {users.filter(u => u.role?.trim() === "admin").map(u => {
              const name = u.displayName || u.fullName || "Admin";

              return (
                <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: getAlphabetGradient(name), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#fff", border: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
                    {name[0].toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</div>
                      {u.allowedPanels?.length >= 8 && (
                        <div style={{ fontSize: 8, fontWeight: 800, background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)", padding: "2px 6px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.05em", flexShrink: 0 }}>Super</div>
                      )}
                    </div>
                    <div style={{ fontSize: 9, color: "#525252", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.email}</div>
                  </div>
                </div>
              );
            })}
            {users.filter(u => u.role?.trim() === "admin").length === 0 && (
              <p style={{ fontSize: 11, color: "#3f3f46" }}>No admin accounts found.</p>
            )}
          </div>

          {/* Live Client Intelligence & Audit Feed */}
          <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: "20px", display: "flex", flexDirection: "column", gap: 14, flex: 1, minHeight: 580 }}>
            {/* Header Title & Actions */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 10px #22c55e", animation: "pulse 2s infinite" }} />
                <div style={{ fontSize: 12, fontWeight: 900, color: "#fff", textTransform: "uppercase", letterSpacing: "0.15em", display: "flex", alignItems: "center", gap: 6 }}>
                  <Activity size={15} color="#f97316" /> Live Client Intelligence &amp; Audit Feed
                </div>
                <span style={{ fontSize: 9, fontWeight: 800, color: "#f97316", background: "rgba(249,115,22,0.12)", padding: "2px 8px", borderRadius: 100, border: "1px solid rgba(249,115,22,0.25)" }}>
                  {filteredTimeline.length} Logs
                </span>
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                {/* Refresh Logs Button */}
                <button
                  type="button"
                  onClick={() => fetchActivityLogs(true)}
                  disabled={isRefreshingLogs}
                  title="Fetch latest activity logs on demand"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 10,
                    padding: "6px 12px",
                    fontSize: 10,
                    fontWeight: 800,
                    color: "#a3a3a3",
                    cursor: isRefreshingLogs ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    transition: "all 0.15s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                >
                  <RefreshCw size={12} color="#f97316" />
                  {isRefreshingLogs ? "Fetching..." : "Refresh Logs"}
                </button>

                {/* Export CSV Button */}
                <button
                  onClick={exportLogsToCSV}
                  disabled={filteredTimeline.length === 0}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
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
                  onMouseEnter={e => { if (filteredTimeline.length > 0) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                >
                  <Download size={12} /> Export CSV
                </button>

                {/* Clear All Logs Button */}
                {activityLogs.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearActivityLogs}
                    title="Permanently clear system activity logs"
                    style={{
                      background: "rgba(239, 68, 68, 0.12)",
                      border: "1px solid rgba(239, 68, 68, 0.25)",
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
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(239, 68, 68, 0.25)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(239, 68, 68, 0.12)"}
                  >
                    <Trash2 size={12} color="#ef4444" /> Clear Logs
                  </button>
                )}

                <div style={{ fontSize: 9, fontWeight: 800, color: "#4ade80", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", padding: "5px 10px", borderRadius: 10, display: "flex", alignItems: "center", gap: 4 }}>
                  🔒 Protected History
                </div>
              </div>
            </div>

            {/* Type Filter Pills Row */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", background: "#08080a", padding: 4, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
              {[
                { id: "all", label: "ALL" },
                { id: "notes", label: "📝 Notes" },
                { id: "tasks", label: "⏰ Tasks" },
                { id: "alerts", label: "🔔 Alerts" },
                { id: "followup", label: "📅 Follow-Ups" },
                { id: "system", label: "⚡ System" }
              ].map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFeedFilter(f.id)}
                  style={{
                    flex: 1,
                    padding: "5px 10px",
                    borderRadius: 8,
                    border: "none",
                    fontSize: 9,
                    fontWeight: 800,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    background: feedFilter === f.id ? "linear-gradient(135deg, #f97316, #ea580c)" : "transparent",
                    color: feedFilter === f.id ? "#ffffff" : "#71717a",
                    whiteSpace: "nowrap"
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "8px 12px" }}>
              <Search size={13} color="#525252" />
              <input
                type="text"
                placeholder="Search audit feed by client name, action, admin, notes..."
                value={logSearch}
                onChange={e => setLogSearch(e.target.value)}
                style={{ background: "none", border: "none", color: "#fff", fontSize: 11, fontWeight: 500, width: "100%", outline: "none" }}
              />
            </div>

            {/* Expanded Feed List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxHeight: 680, overflowY: "auto", paddingRight: 8, paddingLeft: 8, paddingBottom: 20 }}>
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
                      {dayLogs.map((log, idx) => {
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
                          <div key={log.id ? `${log.id}_${idx}` : idx} style={{ position: "relative", display: "flex", flexDirection: "column", gap: 6 }}>
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