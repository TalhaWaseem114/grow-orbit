"use client";

import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import {
  collection, deleteDoc, doc, getDocs,
  orderBy, query, getDoc, updateDoc, onSnapshot,
} from "firebase/firestore";
import {
  BarChart2, Briefcase, ChevronRight, Clock,
  Globe, Layout, LogOut, Mail, Settings,
  Shield, Trash2, Users, Zap, Phone,
  TrendingUp, ArrowUpRight, Search, Filter,
  CheckCircle, Circle, AlertCircle, Star,
  ExternalLink, MoreHorizontal, Activity, Calendar, Home, Download,
  LayoutGrid, List, MessageSquare, UserPlus, Flag, History,
  Eye, EyeOff, Save, Loader2, ToggleRight,
} from "lucide-react";
import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { app, db, auth } from "../../firebase/firebaseConfig";
import { THEMES, DEFAULT_THEME, ALL_SECTIONS } from "@/lib/experimentConfig";
import { fetchExperimentConfig, saveActiveTheme } from "@/lib/experimentService";

/* ─────────────────────────────────────────
   HELPERS
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

const fmt = d => d?.toDate ? d.toDate().toLocaleDateString("en-US",{ month:"short", day:"numeric", year:"numeric" }) : "—";
const fmtTime = d => d?.toDate ? d.toDate().toLocaleTimeString("en-US",{ hour:"2-digit", minute:"2-digit" }) : "";

/* ─────────────────────────────────────────
   SIDEBAR ITEM
───────────────────────────────────────── */
function SidebarItem({ id, label, icon: Icon, activeTab, setActiveTab, badge, isCollapsed }) {
  const active = activeTab === id;
  return (
    <button
      onClick={() => setActiveTab(id)}
      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-bold transition-all duration-200 relative group"
      style={{
        background: active ? "rgba(249,115,22,0.15)" : "transparent",
        color: active ? "#f97316" : "#525252",
        border: active ? "1px solid rgba(249,115,22,0.2)" : "1px solid transparent",
        justifyContent: isCollapsed ? "center" : "flex-start",
        padding: isCollapsed ? "10px" : "10px 16px",
      }}
      title={isCollapsed ? label : ""}
    >
      <Icon size={15} />
      {!isCollapsed && <span className="flex-1 text-left tracking-wider uppercase">{label}</span>}
      {!isCollapsed && badge > 0 && (
        <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full"
          style={{ background: active ? "#f97316" : "rgba(249,115,22,0.2)", color: active ? "#fff" : "#f97316" }}>
          {badge}
        </span>
      )}
      {active && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-orange-500 rounded-l" />}
    </button>
  );
}

/* ─────────────────────────────────────────
   STAT CARD
───────────────────────────────────────── */
function StatCard({ title, value, sub, icon: Icon, accent, delta }) {
  return (
    <div className="relative rounded-2xl p-6 overflow-hidden border"
      style={{ background: accent ? "rgba(249,115,22,0.06)" : "#0d0d0d", borderColor: accent ? "rgba(249,115,22,0.2)" : "rgba(255,255,255,0.05)" }}>
      {accent && <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.08),transparent_60%)]" />}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accent ? "#f9a06a" : "#525252" }}>{title}</span>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: accent ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.04)", color: accent ? "#f97316" : "#525252" }}>
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

/* ─────────────────────────────────────────
   STATUS BADGE
───────────────────────────────────────── */
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
   MAIN PAGE
───────────────────────────────────────── */
export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [leadSearch, setLeadSearch] = useState("");
  const [leadFilter, setLeadFilter] = useState("all");
  const [leadViewMode, setLeadViewMode] = useState("cards"); // 'cards' | 'table'
  const [expandedLead, setExpandedLead] = useState(null);
  const [crmNote, setCrmNote] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTheme, setActiveTheme] = useState(DEFAULT_THEME);
  const [liveTheme, setLiveTheme] = useState(DEFAULT_THEME);
  const [activeSections, setActiveSections] = useState(THEMES[DEFAULT_THEME].defaultSections);
  const [liveSections, setLiveSections] = useState(THEMES[DEFAULT_THEME].defaultSections);
  const [themeSaving, setThemeSaving] = useState(false);
  const [themeSaved, setThemeSaved] = useState(false);
  const [configExpandedTheme, setConfigExpandedTheme] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const startInputRef = useRef(null);
  const endInputRef = useRef(null);

  /* Mobile detection */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Auth guard */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) { router.push("/"); return; }
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (!snap.exists() || snap.data().role?.trim() !== "admin") { router.push("/"); return; }
        setAuthChecking(false);
      } catch { router.push("/"); }
    });
    return () => unsub();
  }, [router]);

  /* Clock */
  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  /* Fetch */
  useEffect(() => {
    const fetch_ = async () => {
      setLoading(true);
      try {
        const uSnap = await getDocs(collection(db, "users"));
        setUsers(uSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        const lQ = query(collection(db, "leads"), orderBy("createdAt", "desc"));
        const lSnap = await getDocs(lQ);
        setLeads(lSnap.docs.map(d => ({ id: d.id, status: "new", ...d.data() })));
        // Fetch active theme and sections
        const { layoutId, activeSections } = await fetchExperimentConfig();
        setActiveTheme(layoutId);
        setLiveTheme(layoutId);
        setActiveSections(activeSections);
        setLiveSections(activeSections);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetch_();
  }, []);

  /* Request notification permission on admin load */
  useEffect(() => {
    if (authChecking) return;
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, [authChecking]);

  /* Real-time lead listener for notifications */
  const prevLeadCount = useRef(null);
  useEffect(() => {
    if (authChecking) return;
    const lQ = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(lQ, (snapshot) => {
      const newLeads = snapshot.docs.map(d => ({ id: d.id, status: "new", ...d.data() }));

      // Check if a NEW lead was added (not first load)
      if (prevLeadCount.current !== null && newLeads.length > prevLeadCount.current) {
        const latest = newLeads[0];
        // Browser notification
        if ("Notification" in window && Notification.permission === "granted") {
          const n = new Notification("🚀 New Lead — Grow Orbit", {
            body: `${latest.fullName || "Someone"} just enquired about ${latest.requestedService || "your services"}`,
            icon: "/logo.png",
            badge: "/logo.png",
            tag: "new-lead-" + latest.id,
            requireInteraction: true,
          });
          n.onclick = () => {
            window.focus();
            setActiveTab("leads");
            n.close();
          };
        }
      }
      prevLeadCount.current = newLeads.length;
      setLeads(newLeads);
    });
    return () => unsub();
  }, [authChecking]);

  /* PWA Install Logic */
  useEffect(() => {
    // Check if already installed
    if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) {
      setShowInstallBtn(false);
    } else {
      setShowInstallBtn(true);
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) {
      // Fallback instruction if browser blocks the automatic prompt
      alert("To install this app:\n\nAndroid: Tap the 3 dots (⋮) in Chrome and select 'Install app' or 'Add to Home screen'.\n\niOS: Tap the Share button (square with arrow) in Safari and select 'Add to Home Screen'.");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setShowInstallBtn(false);
    }
  };

  const handleLogout = async () => { await signOut(auth); router.push("/login"); };

  const handleDeleteLead = async (id) => {
    if (!window.confirm("Permanently delete this lead?")) return;
    try {
      await deleteDoc(doc(db, "leads", id));
      setLeads(leads.filter(l => l.id !== id));
    } catch (e) { alert("Delete failed: " + e.message); }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Permanently delete this user?")) return;
    try {
      await deleteDoc(doc(db, "users", id));
      setUsers(users.filter(u => u.id !== id));
    } catch (e) { alert("Delete failed: " + e.message); }
  };

  const handleRoleChange = async (userId, newRole, currentRole) => {
    if (newRole === currentRole) return;
    if (!window.confirm(`Change role to ${newRole.toUpperCase()}?`)) return;
    try {
      await updateDoc(doc(db, "users", userId), { role: newRole });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (e) { alert("Update failed: " + e.message); }
  };

  const exportLeads = () => {
    const headers = ["Name", "Email", "WhatsApp", "Service", "Source", "Status", "Date", "Notes"];
    const rows = leads.map(l => [
      l.fullName || "N/A",
      l.email || "N/A",
      l.whatsapp || "N/A",
      l.requestedService || "N/A",
      l.source || "Direct",
      l.status || "new",
      l.createdAt?.toDate ? l.createdAt.toDate().toLocaleString() : "N/A",
      `"${(l.notes || l.challenge || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `Orbit_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      await updateDoc(doc(db, "leads", leadId), { status: newStatus });
      setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    } catch (e) { console.error(e); }
  };

  const handleAssignLead = async (leadId, adminId, adminName) => {
    try {
      await updateDoc(doc(db, "leads", leadId), { assignedTo: adminId, assignedName: adminName });
      setLeads(leads.map(l => l.id === leadId ? { ...l, assignedTo: adminId, assignedName: adminName } : l));
    } catch (e) { console.error(e); }
  };

  const handleUpdatePriority = async (leadId, priority) => {
    try {
      await updateDoc(doc(db, "leads", leadId), { priority });
      setLeads(leads.map(l => l.id === leadId ? { ...l, priority } : l));
    } catch (e) { console.error(e); }
  };

  const handleAddLeadNote = async (leadId, noteText) => {
    if (!noteText.trim()) return "";
    try {
      const newEntry = {
        text: noteText,
        timestamp: new Date(), // Firebase will handle conversion if needed, or we use serverTimestamp
        adminName: currentAdmin?.fullName || currentAdmin?.displayName || "Admin",
        adminId: auth.currentUser?.uid
      };
      const leadRef = doc(db, "leads", leadId);
      const leadSnap = await getDoc(leadRef);
      const currentTimeline = leadSnap.data().timeline || [];

      await updateDoc(leadRef, { timeline: [newEntry, ...currentTimeline] });
      setLeads(leads.map(l => l.id === leadId ? { ...l, timeline: [newEntry, ...(l.timeline || [])] } : l));
      return "done";
    } catch (e) { console.error(e); return "error"; }
  };

  /* Filtered leads */
  const filteredLeads = useMemo(() => {
    let res = leads;
    if (leadFilter !== "all") res = res.filter(l => (l.status || "new") === leadFilter);
    if (priorityFilter !== "all") res = res.filter(l => (l.priority || "low") === priorityFilter);
    if (priorityFilter !== "all") res = res.filter(l => (l.priority || "low") === priorityFilter);

    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      res = res.filter(l => l.createdAt?.toDate && l.createdAt.toDate() >= start);
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      res = res.filter(l => l.createdAt?.toDate && l.createdAt.toDate() <= end);
    }

    if (leadSearch) {
      const s = leadSearch.toLowerCase();
      res = res.filter(l =>
        l.fullName?.toLowerCase().includes(s) ||
        l.email?.toLowerCase().includes(s) ||
        l.requestedService?.toLowerCase().includes(s)
      );
    }
    return res;
  }, [leads, leadFilter, leadSearch, startDate, endDate]);

  const filteredUsers = useMemo(() => {
    if (!userSearch) return users;
    const s = userSearch.toLowerCase();
    return users.filter(u =>
      (u.displayName || u.fullName || "").toLowerCase().includes(s) ||
      u.email?.toLowerCase().includes(s)
    );
  }, [users, userSearch]);

  const newLeadsCount = leads.filter(l => (l.status || "new") === "new").length;
  const currentAdmin = users.find(u => u.id === auth.currentUser?.uid);
  const adminInitials = currentAdmin?.displayName
    ? currentAdmin.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : currentAdmin?.fullName
      ? currentAdmin.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : (currentAdmin?.email?.[0] || auth.currentUser?.email?.[0] || "A").toUpperCase();

  const convertedCount = leads.filter(l => l.status === "hot" || l.status === "replied").length;
  const conversionRate = leads.length > 0
    ? ((convertedCount / leads.length) * 100).toFixed(1) + "%"
    : "0%";

  /* Loading state */
  if (authChecking) return (
    <div className="h-screen flex flex-col items-center justify-center" style={{ background: "#060606" }}>
      <div className="relative">
        <div className="w-14 h-14 rounded-full border-2 border-orange-500/20 animate-spin"
          style={{ borderTopColor: "#f97316" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Zap size={18} className="text-orange-500" />
        </div>
      </div>
      <p className="mt-5 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Verifying Access</p>
    </div>
  );

  const timeStr = currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const dateStr = currentTime.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <div className="admin-shell" style={{ display: "flex", flexDirection: isMobile ? "column" : "row", height: "100vh", background: "#060606", color: "#fff", fontFamily: "'Montserrat', sans-serif", overflow: "hidden" }}>
      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(249,115,22,0.4); }
        .tab-content { animation: fadeSlide 0.25s ease; }
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input, select, textarea { font-family: 'Montserrat', sans-serif; }
        input:focus, select:focus { outline: none; }

        /* ── MOBILE BOTTOM NAV ── */
        .mobile-bottom-nav {
          display: none;
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 200;
          background: rgba(9,9,9,0.95); backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 6px 8px calc(6px + env(safe-area-inset-bottom));
        }
        .mobile-bottom-nav-inner { display: flex; justify-content: space-around; align-items: center; }
        .mob-nav-btn {
          display: flex; flex-direction: column; align-items: center; gap: 3px;
          background: none; border: none; cursor: pointer; padding: 6px 10px; border-radius: 12px;
          color: #525252; font-size: 8px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em;
          transition: all 0.2s; min-width: 56px; position: relative;
        }
        .mob-nav-btn.active { color: #f97316; }
        .mob-nav-btn.active::before {
          content: ''; position: absolute; top: -6px; left: 50%; transform: translateX(-50%);
          width: 20px; height: 3px; border-radius: 2px; background: #f97316;
        }
        .mob-nav-badge {
          position: absolute; top: 2px; right: 6px;
          min-width: 16px; height: 16px; border-radius: 100px;
          background: #ef4444; color: #fff; font-size: 8px; font-weight: 900;
          display: flex; align-items: center; justify-content: center; padding: 0 4px;
        }

        /* ── MOBILE OVERLAY MENU ── */
        .mobile-menu-overlay {
          display: none; position: fixed; inset: 0; z-index: 300;
          background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
        }
        .mobile-menu-panel {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: #0a0a0a; border-top-left-radius: 28px; border-top-right-radius: 28px;
          padding: 20px 20px calc(20px + env(safe-area-inset-bottom));
          border-top: 1px solid rgba(255,255,255,0.08);
          max-height: 60vh; overflow-y: auto;
          animation: slideUp 0.3s ease;
        }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .mobile-menu-item {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 16px; border-radius: 14px; background: none; border: none;
          color: #a3a3a3; font-size: 13px; font-weight: 700; cursor: pointer; width: 100%;
          text-transform: uppercase; letter-spacing: 0.08em; transition: all 0.2s;
        }
        .mobile-menu-item.active { background: rgba(249,115,22,0.12); color: #f97316; }

        /* ── RESPONSIVE ── */
        @media (max-width: 767px) {
          .admin-sidebar { display: none !important; }
          .admin-header { padding: 0 16px !important; height: 56px !important; }
          .mobile-bottom-nav { display: block; }
          .admin-content { padding: 16px !important; padding-bottom: 90px !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
          .leads-header { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .leads-controls { flex-direction: column !important; gap: 8px !important; }
          .leads-filters { flex-wrap: nowrap !important; overflow-x: auto !important; padding-bottom: 4px !important; -webkit-overflow-scrolling: touch; }
          .leads-filters::-webkit-scrollbar { display: none; }
          .leads-priority-filter { display: none !important; }
          .leads-date-filter { display: none !important; }
          .lead-card-header { padding: 12px 14px !important; gap: 10px !important; }
          .lead-card-header .lead-avatar { width: 38px !important; height: 38px !important; border-radius: 10px !important; }
          .lead-badges { flex-wrap: wrap !important; gap: 4px !important; }
          .lead-right-info { display: none !important; }
          .lead-expanded { padding: 14px !important; }
          .lead-expanded-grid { grid-template-columns: 1fr !important; }
          .lead-crm-bar { flex-direction: column !important; gap: 10px !important; }
          .lead-crm-bar > div { width: 100% !important; }
          .users-header { flex-direction: column !important; gap: 12px !important; }
          .users-search { width: 100% !important; }
          .users-table-head { display: none !important; }
          .users-row { grid-template-columns: 1fr auto !important; gap: 8px !important; padding: 12px 14px !important; }
          .users-role-cell, .users-date-cell { display: none !important; }
          .team-grid { grid-template-columns: 1fr !important; }
          .cms-header { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .cms-themes-grid { grid-template-columns: 1fr !important; }
          .cms-theme-card { padding: 20px !important; border-radius: 20px !important; }
          .cms-section-controls-grid { grid-template-columns: 1fr !important; }
          .overview-quick-grids { grid-template-columns: 1fr !important; }
          .lead-view-toggle, .lead-export-btn { display: none !important; }
        }
      `}</style>

      {/* ═══════════════ SIDEBAR ═══════════════ */}
      <aside className="admin-sidebar" style={{
        width: isSidebarCollapsed ? 80 : 280,
        background: "#090909",
        borderRight: "1px solid rgba(255,255,255,0.04)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        position: "relative",
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      }}>
        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          style={{
            position: "absolute",
            right: -12,
            top: 28,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "#f97316",
            border: "4px solid #060606",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 100,
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            transition: "transform 0.3s"
          }}
        >
          <ChevronRight size={14} color="#fff" style={{ transform: isSidebarCollapsed ? "none" : "rotate(180deg)", transition: "transform 0.3s" }} />
        </button>

        {/* Logo */}
        <div style={{ padding: isSidebarCollapsed ? "28px 10px 24px" : "28px 20px 24px" }}>
          <button
            onClick={() => setActiveTab("overview")}
            style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 32, width: "100%", justifyContent: isSidebarCollapsed ? "center" : "flex-start" }}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(0,0,0,0.1)", flexShrink: 0, overflow: "hidden" }}>
              <img src="/logo.png" alt="Logo" style={{ width: 28, height: 28, objectFit: "contain" }} />
            </div>
            {!isSidebarCollapsed && (
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 15, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>ORBIT</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#525252", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 2 }}>Command Centre</div>
              </div>
            )}
          </button>

          <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {!isSidebarCollapsed && <div style={{ fontSize: 9, fontWeight: 700, color: "#333", letterSpacing: "0.25em", textTransform: "uppercase", padding: "0 4px", marginBottom: 6 }}>Main</div>}
            <Link
              href="/"
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12, padding: isSidebarCollapsed ? "10px" : "10px 16px", borderRadius: 12,
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)",
                cursor: "pointer", color: "#a3a3a3", textDecoration: "none", marginBottom: 16, transition: "all 0.2s",
                justifyContent: isSidebarCollapsed ? "center" : "flex-start"
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "#a3a3a3"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)"; }}
              title={isSidebarCollapsed ? "Back to Website" : ""}
            >
              <Home size={14} />
              {!isSidebarCollapsed && <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Back to Website</span>}
              {!isSidebarCollapsed && <ExternalLink size={12} style={{ marginLeft: "auto", opacity: 0.5 }} />}
            </Link>
            <SidebarItem id="overview"   label="Overview"      icon={Globe}    activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isSidebarCollapsed} />
            {!isSidebarCollapsed && <div style={{ fontSize: 9, fontWeight: 700, color: "#333", letterSpacing: "0.25em", textTransform: "uppercase", padding: "0 4px", marginTop: 16, marginBottom: 6 }}>Management</div>}
            <SidebarItem id="leads" label="Lead Pipeline" icon={Briefcase} activeTab={activeTab} setActiveTab={setActiveTab} badge={newLeadsCount} isCollapsed={isSidebarCollapsed} />
            <SidebarItem id="users" label="User Directory" icon={Users}    activeTab={activeTab} setActiveTab={setActiveTab} badge={users.length} isCollapsed={isSidebarCollapsed} />
            <SidebarItem id="team"  label="Agency Team"   icon={Shield}   activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isSidebarCollapsed} />
            {!isSidebarCollapsed && <div style={{ fontSize: 9, fontWeight: 700, color: "#333", letterSpacing: "0.25em", textTransform: "uppercase", padding: "0 4px", marginTop: 16, marginBottom: 6 }}>System</div>}
            <SidebarItem id="cms"      label="Site Layout" icon={Layout}   activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isSidebarCollapsed} />
            <SidebarItem id="settings" label="Settings"    icon={Settings} activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isSidebarCollapsed} />
          </nav>
        </div>

        {/* Sidebar bottom */}
        <div style={{ marginTop: "auto", padding: isSidebarCollapsed ? "16px 10px" : "16px 20px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          {!isSidebarCollapsed ? (
            <div style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.12)", borderRadius: 12, padding: "10px 14px", marginBottom: 12 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: "#f97316", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>System Status</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.6)" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#4ade80" }}>All Systems Online</span>
              </div>
            </div>
          ) : (
             <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }} title="All Systems Online">
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px rgba(74,222,128,0.6)" }} />
             </div>
          )}
          <button
            onClick={handleLogout}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, background: "none", border: "none", cursor: "pointer", color: "#525252", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", justifyContent: isSidebarCollapsed ? "center" : "flex-start" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#525252"; }}
            title={isSidebarCollapsed ? "Sign Out" : ""}
          >
            <LogOut size={14} /> {!isSidebarCollapsed && "Sign Out"}
          </button>

          {showInstallBtn && (
            <button
              onClick={handleInstallApp}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px",
                marginTop: 12,
                borderRadius: 14,
                background: "linear-gradient(135deg, rgba(249,115,22,0.2), rgba(249,115,22,0.1))",
                border: "1px solid rgba(249,115,22,0.3)",
                cursor: "pointer",
                color: "#f97316",
                fontSize: 10,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                justifyContent: isSidebarCollapsed ? "center" : "flex-start",
                boxShadow: "0 4px 15px rgba(249,115,22,0.1)"
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(249,115,22,0.25)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(249,115,22,0.2), rgba(249,115,22,0.1))"; }}
            >
              <Download size={14} /> {!isSidebarCollapsed && "Install App"}
            </button>
          )}
        </div>
      </aside>

      {/* ═══════════════ MAIN ═══════════════ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Header */}
        <header className="admin-header" style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", borderBottom: "1px solid rgba(255,255,255,0.04)", background: "rgba(6,6,6,0.8)", backdropFilter: "blur(12px)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {isMobile && (
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "white", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", marginRight: 4, flexShrink: 0 }}>
                <img src="/logo.png" alt="Logo" style={{ width: 20, height: 20, objectFit: "contain" }} />
              </div>
            )}
            {!isMobile && <span style={{ fontSize: 10, fontWeight: 700, color: "#f97316", letterSpacing: "0.3em", textTransform: "uppercase" }}>Orbit OS</span>}
            {!isMobile && <ChevronRight size={12} color="#333" />}
            <span style={{ fontSize: isMobile ? 15 : 13, fontWeight: 800, color: "#fff", textTransform: "capitalize" }}>{activeTab.replace("-", " ")}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 14 }}>
            {/* Live indicator — hidden on mobile */}
            {!isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 100, padding: "6px 14px" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#d4d4d4", fontFamily: "monospace" }}>{timeStr}</span>
                <span style={{ fontSize: 10, color: "#525252", fontFamily: "monospace" }}>{dateStr}</span>
              </div>
            )}
            {/* Avatar */}
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #3f3f46, #1f1f23)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "#f97316" }}>
              {adminInitials}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="admin-content" style={{ flex: 1, overflowY: "auto", padding: "32px" }}>

          {/* ── OVERVIEW ── */}
          {activeTab === "overview" && (
            <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Greeting */}
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#f97316", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 6 }}>Good {currentTime.getHours() < 12 ? "morning" : currentTime.getHours() < 17 ? "afternoon" : "evening"}</div>
                  <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1 }}>Command Overview</h1>
                </div>
                {newLeadsCount > 0 && (
                  <button onClick={() => setActiveTab("leads")} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: 12, padding: "10px 16px", cursor: "pointer", color: "#f97316" }}>
                    <AlertCircle size={14} />
                    <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>{newLeadsCount} new leads</span>
                    <ArrowUpRight size={13} />
                  </button>
                )}
              </div>

              {/* Stats */}
              <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
                <StatCard title="Total Users"    value={users.length}  sub="Registered accounts"    icon={Users}    delta="+2 this week" />
                <StatCard title="Active Leads"   value={leads.length}  sub="All time enquiries"     icon={Briefcase} accent />
                <StatCard title="New Leads"      value={newLeadsCount} sub="Awaiting response"      icon={Activity} />
                <StatCard title="Conversion Est" value={conversionRate} sub="Interest-to-Lead ratio" icon={TrendingUp} />
              </div>

              {/* Recent leads quick view */}
              <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, overflow: "hidden" }}>
                <div style={{ padding: "20px 24px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Recent Lead Activity</div>
                  <button onClick={() => setActiveTab("leads")} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 700, color: "#f97316", background: "none", border: "none", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.15em" }}>
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
              </div>

              {/* Users quick view */}
              {/* Two-col grids — stack on mobile */}
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
                          <div style={{ height: "100%", background: "#f97316", width: `${(count / leads.length) * 100}%`, borderRadius: 2 }} />
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#f97316", minWidth: 16, textAlign: "right" }}>{count}</span>
                      </div>
                    </div>
                  ))}
                  {leads.length === 0 && <p style={{ fontSize: 11, color: "#333" }}>No leads yet.</p>}
                </div>
              </div>
            </div>
          )}

          {/* ── LEAD PIPELINE ── */}
          {activeTab === "leads" && (
            <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Header */}
              <div className="leads-header" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 6 }}>CRM · Inbound</div>
                  <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>Lead Pipeline</h1>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  {/* View Toggle */}
                  <div className="lead-view-toggle" style={{ display: "flex", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 2 }}>
                    <button
                      onClick={() => setLeadViewMode("cards")}
                      style={{ padding: "6px 10px", borderRadius: 8, border: "none", cursor: "pointer", background: leadViewMode === "cards" ? "#f97316" : "transparent", color: leadViewMode === "cards" ? "#fff" : "#525252", transition: "all 0.2s", display: "flex" }}
                    >
                      <LayoutGrid size={14} />
                    </button>
                    <button
                      onClick={() => setLeadViewMode("table")}
                      style={{ padding: "6px 10px", borderRadius: 8, border: "none", cursor: "pointer", background: leadViewMode === "table" ? "#f97316" : "transparent", color: leadViewMode === "table" ? "#fff" : "#525252", transition: "all 0.2s", display: "flex" }}
                    >
                      <List size={14} />
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

              {/* Search + Filter bar */}
              <div className="leads-controls" style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "10px 16px" }}>
                  <Search size={14} color="#525252" />
                  <input
                    type="text"
                    placeholder="Search leads by name, email, or service…"
                    value={leadSearch}
                    onChange={e => setLeadSearch(e.target.value)}
                    style={{ flex: 1, background: "none", border: "none", color: "#fff", fontSize: 12, fontWeight: 500 }}
                  />
                </div>
                <div className="leads-filters" style={{ display: "flex", gap: 6 }}>
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

              {/* Date Filter Bar */}
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
                leadViewMode === "cards" ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {filteredLeads.map(lead => {
                    const isOpen = expandedLead === lead.id;
                    const status = lead.status || "new";
                    const priority = lead.priority || "low";
                    const cfg = STATUS_CONFIG[status];
                    const pCfg = PRIORITY_CONFIG[priority];

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
                          {/* Avatar */}
                          <div className="lead-avatar" style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${cfg.color}33, ${cfg.color}11)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 900, color: cfg.color, flexShrink: 0 }}>
                            {lead.fullName?.[0] || "L"}
                          </div>
                          {/* Info */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div className="lead-badges" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                              <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{lead.fullName || "Unknown"}</span>
                              <StatusBadge status={status} />
                              {lead.priority === "high" && (
                                <span style={{ fontSize: 9, fontWeight: 700, color: PRIORITY_CONFIG.high.color, background: PRIORITY_CONFIG.high.bg, border: `1px solid ${PRIORITY_CONFIG.high.border}`, borderRadius: 100, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                                  HIGH PRIORITY
                                </span>
                              )}
                              <span style={{ fontSize: 9, fontWeight: 700, color: "#525252", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 100, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                                {lead.source || "Direct"}
                              </span>
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
                                    const admin = users.find(u => u.uid === e.target.value);
                                    handleAssignLead(lead.id, e.target.value, admin?.fullName || admin?.displayName || "Admin");
                                  }}
                                  style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "8px 12px", color: "#fff", fontSize: 11, fontWeight: 600, outline: "none" }}
                                >
                                  <option value="">Unassigned</option>
                                  {users.filter(u => u.role === "admin").map(u => (
                                    <option key={u.uid} value={u.uid}>{u.fullName || u.displayName || u.email}</option>
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
                              <td style={{ padding: "14px 24px" }}><StatusBadge status={status} /></td>
                              <td style={{ padding: "14px 24px" }}>
                                {lead.priority === "high" ? (
                                  <span style={{ fontSize: 9, fontWeight: 900, color: PRIORITY_CONFIG.high.color, textTransform: "uppercase" }}>High</span>
                                ) : (
                                  <span style={{ fontSize: 9, fontWeight: 700, color: "#333", textTransform: "uppercase" }}>{lead.priority || "Low"}</span>
                                )}
                              </td>
                              <td style={{ padding: "14px 24px" }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{lead.fullName || "Unknown"}</div>
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
          )}

          {/* ── USER DIRECTORY ── */}
          {activeTab === "users" && (
            <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="users-header" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 6 }}>IAM · Accounts</div>
                  <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>User Directory</h1>
                </div>
                <div className="users-search" style={{ display: "flex", alignItems: "center", gap: 10, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "8px 14px" }}>
                  <Search size={13} color="#525252" />
                  <input type="text" placeholder="Search users…" value={userSearch} onChange={e => setUserSearch(e.target.value)}
                    style={{ background: "none", border: "none", color: "#fff", fontSize: 12, fontWeight: 500, width: 200 }} />
                </div>
              </div>

              <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, overflow: "hidden" }}>
                {/* Table head */}
                <div className="users-table-head" style={{ display: "grid", gridTemplateColumns: "1fr 140px 130px 80px", padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 9, fontWeight: 700, color: "#333", textTransform: "uppercase", letterSpacing: "0.25em" }}>
                  <span>Identity</span><span>Role</span><span>Joined</span><span style={{ textAlign: "right" }}>Action</span>
                </div>
                {/* Rows */}
                {filteredUsers.map((u, i) => (
                  <div key={u.id}
                    className="users-row"
                    style={{ display: "grid", gridTemplateColumns: "1fr 140px 130px 80px", padding: "14px 24px", borderBottom: i < filteredUsers.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none", alignItems: "center", transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}
                  >
                    {/* Identity */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: u.role?.trim() === "admin" ? "rgba(249,115,22,0.12)" : "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: u.role?.trim() === "admin" ? "#f97316" : "#525252" }}>
                        {(u.displayName || u.fullName || "U")[0]}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{u.displayName || u.fullName || "Anonymous"}</div>
                        <div style={{ fontSize: 11, color: "#525252" }}>{u.email}</div>
                      </div>
                    </div>
                    {/* Role select */}
                    <div className="users-role-cell">
                      <select
                        value={u.role?.trim() || "user"}
                        onChange={e => handleRoleChange(u.id, e.target.value, u.role?.trim() || "user")}
                        style={{ background: u.role?.trim() === "admin" ? "rgba(249,115,22,0.1)" : "rgba(255,255,255,0.04)", border: `1px solid ${u.role?.trim() === "admin" ? "rgba(249,115,22,0.25)" : "rgba(255,255,255,0.08)"}`, color: u.role?.trim() === "admin" ? "#f97316" : "#a3a3a3", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", borderRadius: 8, padding: "6px 10px", cursor: "pointer", width: 100 }}
                      >
                        <option value="user" style={{ background: "#111", color: "#fff" }}>USER</option>
                        <option value="admin" style={{ background: "#111", color: "#fff" }}>ADMIN</option>
                      </select>
                    </div>
                    {/* Joined */}
                    <div className="users-date-cell" style={{ fontSize: 11, color: "#404040", fontFamily: "monospace" }}>{fmt(u.createdAt)}</div>
                    {/* Delete */}
                    <div style={{ textAlign: "right" }}>
                      <button onClick={() => handleDeleteUser(u.id)}
                        style={{ width: 32, height: 32, borderRadius: 8, background: "transparent", border: "1px solid transparent", color: "#333", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.2)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#333"; e.currentTarget.style.borderColor = "transparent"; }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                {filteredUsers.length === 0 && (
                  <div style={{ padding: "48px 24px", textAlign: "center", color: "#333" }}>
                    <p style={{ fontSize: 12 }}>No users found.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── AGENCY TEAM ── */}
          {activeTab === "team" && (
            <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 6 }}>System · Staff</div>
                <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>Agency Team</h1>
                <p style={{ fontSize: 13, color: "#525252", marginTop: 8 }}>Users with full administrative access to the Orbit Command Center.</p>
              </div>

              <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
                {users.filter(u => u.role?.trim() === "admin").map(u => (
                  <div key={u.id} style={{ background: "#0d0d0d", border: "1px solid rgba(249,115,22,0.15)", borderRadius: 20, padding: "24px", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: "radial-gradient(circle at top right, rgba(249,115,22,0.1), transparent 70%)" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                      <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, #f97316, #ea580c)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: "#fff", boxShadow: "0 8px 20px rgba(249,115,22,0.3)" }}>
                        {(u.displayName || u.fullName || "A")[0]}
                      </div>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{u.displayName || u.fullName || "Admin User"}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <Shield size={12} color="#f97316" />
                          <span style={{ fontSize: 10, fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.15em" }}>Senior Admin</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 16 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Mail size={14} color="#333" />
                        <span style={{ fontSize: 12, color: "#a3a3a3" }}>{u.email}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Clock size={14} color="#333" />
                        <span style={{ fontSize: 11, color: "#525252" }}>Granted: {fmt(u.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SITE LAYOUT (Theme Switcher) ── */}
          {activeTab === "cms" && (
            <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div className="cms-header" style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "flex-end", justifyContent: "space-between", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 6 }}>System · Pages</div>
                  <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>Site Layout</h1>
                  <p style={{ fontSize: 13, color: "#525252", marginTop: 8 }}>Control which theme is live on the <strong style={{ color: "#a3a3a3" }}>/get-started</strong> landing page.</p>
                </div>
                <button
                  onClick={async () => {
                    setThemeSaving(true);
                    console.log("[Admin] Publishing live theme:", activeTheme, activeSections);
                    const ok = await saveActiveTheme(activeTheme, activeSections);
                    if (ok) {
                      setLiveTheme(activeTheme);
                      setLiveSections(activeSections);
                      setThemeSaved(true);
                      setTimeout(() => {
                        setThemeSaved(false);
                        setThemeSaving(false);
                      }, 2000);
                    } else {
                      setThemeSaving(false);
                      alert("Failed to publish theme. Check console.");
                    }
                  }}
                  disabled={themeSaving || (activeTheme === liveTheme && JSON.stringify(activeSections) === JSON.stringify(liveSections))}
                  style={{
                    display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, border: "none", cursor: (themeSaving || (activeTheme === liveTheme && JSON.stringify(activeSections) === JSON.stringify(liveSections))) ? "not-allowed" : "pointer",
                    fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", transition: "all 0.3s",
                    background: themeSaved ? "rgba(74,222,128,0.15)" : (activeTheme === liveTheme && JSON.stringify(activeSections) === JSON.stringify(liveSections)) ? "rgba(255,255,255,0.04)" : "#f97316",
                    color: themeSaved ? "#4ade80" : (activeTheme === liveTheme && JSON.stringify(activeSections) === JSON.stringify(liveSections)) ? "#525252" : "#fff",
                    width: isMobile ? "100%" : "auto", justifyContent: isMobile ? "center" : "flex-start"
                  }}
                >
                  {themeSaving ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : themeSaved ? <CheckCircle size={13} /> : <Save size={13} />}
                  {themeSaving ? "Publishing..." : themeSaved ? "Live!" : "Publish Live"}
                </button>
              </div>

              {(activeTheme !== liveTheme || JSON.stringify(activeSections) !== JSON.stringify(liveSections)) && !themeSaved && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 12, padding: "10px 16px" }}>
                  <AlertCircle size={14} color="#f97316" flexShrink={0} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#f97316" }}>Unsaved changes detected. Click "Publish Live" to update the website.</span>
                </div>
              )}

              {/* Theme Cards */}
              <div className="cms-themes-grid" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, alignItems: "flex-start" }}>
                {Object.entries(THEMES).map(([key, theme]) => {
                  const isSelected = activeTheme === key;
                  const isLive = liveTheme === key;
                  return (
                    <div
                      key={key}
                      onClick={() => {
                        setActiveTheme(key);
                        setActiveSections(isLive ? liveSections : theme.defaultSections);
                        setThemeSaved(false);
                      }}
                      style={{
                        textAlign: "left", padding: isMobile ? 24 : 32, borderRadius: isMobile ? 20 : 28, border: `2px solid ${isSelected ? "rgba(249,115,22,0.5)" : "rgba(255,255,255,0.05)"}`,
                        background: isSelected ? "rgba(249,115,22,0.1)" : "#0d0d0d", cursor: "pointer", position: "relative", overflow: "hidden",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: isSelected ? "0 20px 50px rgba(249,115,22,0.15)" : "none",
                        transform: isSelected && !isMobile ? "translateY(-4px)" : "none"
                      }}
                    >
                      {isLive && (
                        <div style={{ position: "absolute", top: isMobile ? 16 : 24, right: isMobile ? 16 : 24, display: "flex", alignItems: "center", gap: 6, background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 100, padding: "5px 12px" }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
                          <span style={{ fontSize: 8, fontWeight: 900, color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.2em" }}>Active Live</span>
                        </div>
                      )}
                      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, paddingRight: isLive && isMobile ? 90 : 0 }}>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${isSelected ? "#f97316" : "#333"}`, background: isSelected ? "#f97316" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", flexShrink: 0 }}>
                          {isSelected && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fff" }} />}
                        </div>
                        <span style={{ fontSize: isMobile ? 16 : 18, fontWeight: 900, color: isSelected ? "#fff" : "#a3a3a3", textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 1.2 }}>{theme.name}</span>
                      </div>

                      <p style={{ fontSize: 13, color: isSelected ? "#d4d4d4" : "#525252", lineHeight: 1.6, fontWeight: 400, marginBottom: 24 }}>
                        {theme.description}
                      </p>

                      <div style={{ marginBottom: 16 }}>
                         <button
                           onClick={(e) => {
                             e.stopPropagation();
                             setConfigExpandedTheme(configExpandedTheme === key ? null : key);
                           }}
                           style={{
                             display: "flex", alignItems: "center", gap: 8, background: isSelected ? "rgba(249,115,22,0.1)" : "rgba(255,255,255,0.03)",
                             border: `1px solid ${isSelected ? "rgba(249,115,22,0.2)" : "rgba(255,255,255,0.05)"}`,
                             padding: "10px 16px", borderRadius: 12, color: isSelected ? "#f97316" : "#737373", fontSize: 11, fontWeight: 700, cursor: "pointer",
                             transition: "all 0.2s", width: "100%", justifyContent: "center"
                           }}
                         >
                           {configExpandedTheme === key ? <EyeOff size={14} /> : <Settings size={14} />}
                           {configExpandedTheme === key ? "Hide Section Controls" : "Configure Section Layout"}
                         </button>
                      </div>

                      {configExpandedTheme === key && (
                        <div style={{ marginBottom: 24, padding: "20px", background: "rgba(255,255,255,0.02)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.03)", animation: "fadeIn 0.3s ease-out" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                          <p style={{ fontSize: 9, fontWeight: 800, color: isSelected ? "#f97316" : "#333", textTransform: "uppercase", letterSpacing: "0.25em" }}>Section Toggle Controls</p>
                          {isSelected && (activeTheme !== liveTheme || JSON.stringify(activeSections) !== JSON.stringify(liveSections)) && (
                             <button
                               onClick={async (e) => {
                                 e.stopPropagation();
                                 setThemeSaving(true);
                                 const ok = await saveActiveTheme(activeTheme, activeSections);
                                 if (ok) {
                                   setLiveTheme(activeTheme);
                                   setLiveSections(activeSections);
                                   setThemeSaved(true);
                                   setTimeout(() => { setThemeSaved(false); setThemeSaving(false); }, 2000);
                                 } else {
                                   setThemeSaving(false);
                                 }
                               }}
                               style={{
                                 background: "#f97316", color: "#fff", border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 8, fontWeight: 800, cursor: "pointer", textTransform: "uppercase"
                               }}
                             >
                               Apply Changes
                             </button>
                          )}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px" }}>
                          {ALL_SECTIONS.map((section) => {
                            const sectionValue = activeSections[section.id];
                            const isSectionActive = sectionValue !== false;

                            return (
                              <div key={section.id} style={{ opacity: isSelected ? 1 : 0.4, transition: "opacity 0.3s" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: section.variants && isSectionActive ? 6 : 0 }}>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (!isSelected) {
                                        setActiveTheme(key);
                                        setActiveSections(isLive ? liveSections : theme.defaultSections);
                                        const base = isLive ? liveSections : theme.defaultSections;
                                        setActiveSections({ ...base, [section.id]: !base[section.id] });
                                      } else {
                                        // If it's a variant-based section, we toggle between false and the first variant or previous value
                                        if (section.variants && !isSectionActive) {
                                          setActiveSections(prev => ({ ...prev, [section.id]: section.variants[0].id }));
                                        } else {
                                          setActiveSections(prev => ({ ...prev, [section.id]: !isSectionActive }));
                                        }
                                      }
                                      setThemeSaved(false);
                                    }}
                                    style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                                  >
                                    <div style={{
                                      width: 24, height: 12, borderRadius: 100, position: "relative",
                                      background: isSectionActive ? "#f97316" : "#222",
                                      transition: "all 0.3s"
                                    }}>
                                      <div style={{
                                        width: 8, height: 8, borderRadius: "50%", background: "#fff",
                                        position: "absolute", top: 2,
                                        left: isSectionActive ? 14 : 2,
                                        transition: "all 0.3s"
                                      }} />
                                    </div>
                                    <span style={{ fontSize: 10, fontWeight: 600, color: isSectionActive ? "#a3a3a3" : "#333" }}>{section.label}</span>
                                  </button>
                                </div>

                                {section.variants && isSectionActive && (
                                  <select
                                    onClick={(e) => e.stopPropagation()}
                                    value={typeof sectionValue === "string" ? sectionValue : section.variants[0].id}
                                    onChange={(e) => {
                                      if (!isSelected) return;
                                      setActiveSections(prev => ({ ...prev, [section.id]: e.target.value }));
                                      setThemeSaved(false);
                                    }}
                                    disabled={!isSelected}
                                    style={{
                                      width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                                      borderRadius: 6, padding: "4px 8px", color: "#a3a3a3", fontSize: 9, fontWeight: 600, outline: "none",
                                      cursor: isSelected ? "pointer" : "default"
                                    }}
                                  >
                                    {section.variants.map(v => (
                                      <option key={v.id} value={v.id} style={{ background: "#111", color: "#fff" }}>{v.label}</option>
                                    ))}
                                  </select>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      )}

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 16 }}>
                        <p style={{ fontSize: 9, color: "#262626", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.15em" }}>Target File: {theme.file}</p>
                        <div style={{ fontSize: 8, fontWeight: 800, color: isSelected ? "#f97316" : "#333", background: isSelected ? "rgba(249,115,22,0.1)" : "rgba(255,255,255,0.02)", padding: "4px 8px", borderRadius: 4, textTransform: "uppercase" }}>
                          ID: {key}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Preview Link */}
              <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "stretch" : "center", justifyContent: "space-between", gap: 16, padding: "16px 20px", background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <ToggleRight size={16} color="#f97316" />
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 2 }}>Preview Page</p>
                    <p style={{ fontSize: 10, color: "#525252", fontFamily: "monospace" }}>Open /get-started to see the active layout</p>
                  </div>
                </div>
                <Link href="/get-started" target="_blank" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px 16px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", textDecoration: "none", transition: "all 0.2s" }}>
                  Open Page <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          )}

          {/* ── SETTINGS PLACEHOLDER ── */}
          {activeTab === "settings" && (
            <div className="tab-content" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh", gap: 16, color: "#2a2a2a" }}>
              <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Settings size={26} color="#2a2a2a" />
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", marginBottom: 6 }}>Module Restricted</p>
                <p style={{ fontSize: 10, color: "#222", letterSpacing: "0.15em", textTransform: "uppercase" }}>Build in progress · Authorized access only</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══════════════ MOBILE BOTTOM NAV ═══════════════ */}
      <div className="mobile-bottom-nav">
        <div className="mobile-bottom-nav-inner">
          {[
            { id: "overview", icon: Globe, label: "Home" },
            { id: "leads", icon: Briefcase, label: "Leads", badge: newLeadsCount },
            { id: "users", icon: Users, label: "Users" },
            { id: "cms", icon: Layout, label: "CMS" },
          ].map(item => (
            <button
              key={item.id}
              className={`mob-nav-btn ${activeTab === item.id ? "active" : ""}`}
              onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
            >
              {item.badge > 0 && <span className="mob-nav-badge">{item.badge}</span>}
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
          <button
            className={`mob-nav-btn ${mobileMenuOpen ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <MoreHorizontal size={20} />
            <span>More</span>
          </button>
        </div>
      </div>

      {/* ═══════════════ MOBILE MENU OVERLAY ═══════════════ */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" style={{ display: "block" }} onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-panel" onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)", margin: "0 auto 20px" }} />
            <Link href="/" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}
              style={{ color: "#fff", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, marginBottom: 8 }}>
              <Home size={18} /> Back to Website
              <ExternalLink size={14} style={{ marginLeft: "auto", opacity: 0.4 }} />
            </Link>
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "4px 0 12px" }} />
            <button className={`mobile-menu-item ${activeTab === "team" ? "active" : ""}`}
              onClick={() => { setActiveTab("team"); setMobileMenuOpen(false); }}>
              <Shield size={18} /> Agency Team
            </button>
            <button className={`mobile-menu-item ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => { setActiveTab("settings"); setMobileMenuOpen(false); }}>
              <Settings size={18} /> Settings
            </button>
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "12px 0" }} />
            {showInstallBtn && (
              <button className="mobile-menu-item" onClick={() => { handleInstallApp(); setMobileMenuOpen(false); }}
                style={{ color: "#f97316" }}>
                <Download size={18} /> Install App
              </button>
            )}
            <button className="mobile-menu-item" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
              style={{ color: "#ef4444" }}>
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}