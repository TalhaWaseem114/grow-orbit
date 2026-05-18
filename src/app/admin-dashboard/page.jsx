"use client";

import { signOut, onAuthStateChanged } from "firebase/auth";
import {
  collection, deleteDoc, doc, getDocs,
  orderBy, query, getDoc, updateDoc, onSnapshot
} from "firebase/firestore";
import {
  Briefcase, ChevronRight, Globe, Layout, LogOut, Settings,
  Shield, Users, Zap, ExternalLink, MoreHorizontal, Download, 
  Home, FileText
} from "lucide-react";
import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* Firebase config */
import { db, auth } from "../../firebase/firebaseConfig";

/* Configs and Services */
import { THEMES, DEFAULT_THEME } from "@/lib/experimentConfig";
import { fetchExperimentConfig } from "@/lib/experimentService";

/* Tab Subcomponents */
import OverviewTab from "./components/OverviewTab";
import LeadsTab from "./components/LeadsTab";
import UsersTab from "./components/UsersTab";
import TeamTab from "./components/TeamTab";
import CmsTab from "./components/CmsTab";
import SettingsTab from "./components/SettingsTab";
import BlogManagerTab from "./BlogManagerTab";

/* ─────────────────────────────────────────
   SIDEBAR ITEM HELPER
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
   MAIN DASHBOARD COMPONENT
───────────────────────────────────────── */
export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [leadsCollectionName, setLeadsCollectionName] = useState("Leads");
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  /* CRM Filter State variables passed down */
  const [leadSearch, setLeadSearch] = useState("");
  const [leadFilter, setLeadFilter] = useState("all");
  const [leadViewMode, setLeadViewMode] = useState("cards");
  const [expandedLead, setExpandedLead] = useState(null);
  const [crmNote, setCrmNote] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  /* CMS Theme Builder State variables passed down */
  const [activeTheme, setActiveTheme] = useState(DEFAULT_THEME);
  const [liveTheme, setLiveTheme] = useState(DEFAULT_THEME);
  const [activeSections, setActiveSections] = useState(THEMES[DEFAULT_THEME].defaultSections);
  const [liveSections, setLiveSections] = useState(THEMES[DEFAULT_THEME].defaultSections);
  const [themeSaving, setThemeSaving] = useState(false);
  const [themeSaved, setThemeSaved] = useState(false);
  const [configExpandedTheme, setConfigExpandedTheme] = useState(null);

  /* PWA/Responsive state variables */
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* Mobile viewport check */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Authentication Guard */
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

  /* Running Clock */
  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  /* Database Fetch mounting pipeline */
  useEffect(() => {
    if (authChecking) return;
    const fetch_ = async () => {
      setLoading(true);

      // 1. Fetch Users
      try {
        const uSnap = await getDocs(collection(db, "users"));
        setUsers(uSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.warn("Users fetch restricted by permissions:", e.message);
      }

      // 2. Fetch Leads
      try {
        let lSnap_cap = null;
        try {
          const lQ_cap = query(collection(db, "Leads"), orderBy("createdAt", "desc"));
          lSnap_cap = await getDocs(lQ_cap);
        } catch (capErr) {
          console.warn("[AdminDashboard] Capitalized 'Leads' query failed or blocked:", capErr.message);
        }

        let lSnap_low = null;
        try {
          const lQ_low = query(collection(db, "leads"), orderBy("createdAt", "desc"));
          lSnap_low = await getDocs(lQ_low);
        } catch (lowErr) {
          console.warn("[AdminDashboard] Lowercase 'leads' query failed or blocked:", lowErr.message);
        }

        // Determine which one succeeded and has documents
        const lowCount = lSnap_low ? lSnap_low.docs.length : 0;
        const capCount = lSnap_cap ? lSnap_cap.docs.length : 0;

        const chosenCollection = lowCount > 0 ? "leads" : (capCount > 0 ? "Leads" : (lSnap_low ? "leads" : "Leads"));
        setLeadsCollectionName(chosenCollection);

        const finalSnap = chosenCollection === "leads" ? lSnap_low : lSnap_cap;
        if (finalSnap) {
          const fetchedLeads = finalSnap.docs.map(d => ({ id: d.id, status: "new", ...d.data() }));
          setLeads(fetchedLeads);
        } else {
          console.warn("[AdminDashboard] Both leads queries were blocked or returned null.");
        }
      } catch (e) {
        console.warn("Leads fetch restricted by permissions:", e.message);
      }

      // 3. Fetch CMS Configuration
      try {
        const { layoutId, activeSections } = await fetchExperimentConfig();
        setActiveTheme(layoutId);
        setLiveTheme(layoutId);
        setActiveSections(activeSections);
        setLiveSections(activeSections);
      } catch (e) {
        console.warn("Experiment Config fetch failed:", e.message);
      }

      setLoading(false);
    };
    fetch_();
  }, [authChecking]);

  /* Native Browser push notifications channel */
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
    const lQ = query(collection(db, leadsCollectionName), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(lQ,
      (snapshot) => {
        const newLeads = snapshot.docs.map(d => ({ id: d.id, status: "new", ...d.data() }));

        // Send browser notification if a new lead was appended
        if (prevLeadCount.current !== null && newLeads.length > prevLeadCount.current) {
          const latest = newLeads[0];
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
      },
      (error) => {
        console.warn("[AdminDashboard] Real-time Leads snapshot subscription error:", error.message);
      }
    );
    return () => unsub();
  }, [authChecking, leadsCollectionName]);

  /* Progressive Web App Install handler */
  useEffect(() => {
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
      await deleteDoc(doc(db, leadsCollectionName, id));
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
      await updateDoc(doc(db, leadsCollectionName, leadId), { status: newStatus });
      setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    } catch (e) { console.warn("Status change failed:", e.message); }
  };

  const handleAssignLead = async (leadId, adminId, adminName) => {
    try {
      await updateDoc(doc(db, leadsCollectionName, leadId), { assignedTo: adminId, assignedName: adminName });
      setLeads(leads.map(l => l.id === leadId ? { ...l, assignedTo: adminId, assignedName: adminName } : l));
    } catch (e) { console.warn("Owner assignment failed:", e.message); }
  };

  const handleUpdatePriority = async (leadId, priority) => {
    try {
      await updateDoc(doc(db, leadsCollectionName, leadId), { priority });
      setLeads(leads.map(l => l.id === leadId ? { ...l, priority } : l));
    } catch (e) { console.warn("Priority update failed:", e.message); }
  };

  const handleAddLeadNote = async (leadId, noteText) => {
    if (!noteText.trim()) return "";
    try {
      const newEntry = {
        text: noteText,
        timestamp: new Date(),
        adminName: currentAdmin?.fullName || currentAdmin?.displayName || "Admin",
        adminId: auth.currentUser?.uid
      };
      const leadRef = doc(db, leadsCollectionName, leadId);
      const leadSnap = await getDoc(leadRef);
      const currentTimeline = leadSnap.data().timeline || [];

      await updateDoc(leadRef, { timeline: [newEntry, ...currentTimeline] });
      setLeads(leads.map(l => l.id === leadId ? { ...l, timeline: [newEntry, ...(l.timeline || [])] } : l));
      return "done";
    } catch (e) { console.warn("Add timeline note failed:", e.message); return "error"; }
  };

  const newLeadsCount = leads.filter(l => (l.status || "new") === "new").length;
  const currentAdmin = users.find(u => u.id === auth.currentUser?.uid);
  const adminInitials = currentAdmin?.displayName
    ? currentAdmin.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : currentAdmin?.fullName
      ? currentAdmin.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : (auth.currentUser?.email?.[0] || "A").toUpperCase();

  const convertedCount = leads.filter(l => l.status === "hot" || l.status === "replied").length;
  const conversionRate = leads.length > 0
    ? ((convertedCount / leads.length) * 100).toFixed(1) + "%"
    : "0%";

  /* Auth loading check visual overlay */
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
            {!isSidebarCollapsed && <div style={{ fontSize: 9, fontWeight: 700, color: "#333", letterSpacing: "0.25em", textTransform: "uppercase", padding: "0 4px", marginTop: 16, marginBottom: 6 }}>Content</div>}
            <SidebarItem id="blog"  label="Blog Manager" icon={FileText}  activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isSidebarCollapsed} />
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

      {/* ═══════════════ MAIN CONTENT ═══════════════ */}
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
            {!isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 100, padding: "6px 14px" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#d4d4d4", fontFamily: "monospace" }}>{timeStr}</span>
                <span style={{ fontSize: 10, color: "#525252", fontFamily: "monospace" }}>{dateStr}</span>
              </div>
            )}
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #3f3f46, #1f1f23)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "#f97316" }}>
              {adminInitials}
            </div>
          </div>
        </header>

        {/* Content Viewports */}
        <div className="admin-content" style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", items: "center", justifyContent: "center", height: "60vh", gap: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid rgba(249,115,22,0.2)", borderTopColor: "#f97316", animation: "spin 1s linear infinite" }} />
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: "#525252" }}>Loading dashboard data…</p>
            </div>
          ) : (
            <>
              {activeTab === "overview" && (
                <OverviewTab 
                  currentTime={currentTime}
                  users={users}
                  leads={leads}
                  newLeadsCount={newLeadsCount}
                  conversionRate={conversionRate}
                  isMobile={isMobile}
                  setActiveTab={setActiveTab}
                />
              )}

              {activeTab === "leads" && (
                <LeadsTab 
                  leads={leads}
                  users={users}
                  loading={loading}
                  leadSearch={leadSearch}
                  setLeadSearch={setLeadSearch}
                  leadFilter={leadFilter}
                  setLeadFilter={setLeadFilter}
                  priorityFilter={priorityFilter}
                  setPriorityFilter={setPriorityFilter}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  leadViewMode={leadViewMode}
                  setLeadViewMode={setLeadViewMode}
                  expandedLead={expandedLead}
                  setExpandedLead={setExpandedLead}
                  crmNote={crmNote}
                  setCrmNote={setCrmNote}
                  newLeadsCount={newLeadsCount}
                  currentAdmin={currentAdmin}
                  handleDeleteLead={handleDeleteLead}
                  handleStatusChange={handleStatusChange}
                  handleAssignLead={handleAssignLead}
                  handleUpdatePriority={handleUpdatePriority}
                  handleAddLeadNote={handleAddLeadNote}
                  exportLeads={exportLeads}
                />
              )}

              {activeTab === "users" && (
                <UsersTab 
                  users={users}
                  userSearch={userSearch}
                  setUserSearch={setUserSearch}
                  handleRoleChange={handleRoleChange}
                  handleDeleteUser={handleDeleteUser}
                />
              )}

              {activeTab === "team" && (
                <TeamTab 
                  users={users}
                />
              )}

              {activeTab === "cms" && (
                <CmsTab 
                  activeTheme={activeTheme}
                  setActiveTheme={setActiveTheme}
                  liveTheme={liveTheme}
                  setLiveTheme={setLiveTheme}
                  activeSections={activeSections}
                  setActiveSections={setActiveSections}
                  liveSections={liveSections}
                  setLiveSections={setLiveSections}
                  themeSaving={themeSaving}
                  setThemeSaving={setThemeSaving}
                  themeSaved={themeSaved}
                  setThemeSaved={setThemeSaved}
                  configExpandedTheme={configExpandedTheme}
                  setConfigExpandedTheme={setConfigExpandedTheme}
                  isMobile={isMobile}
                />
              )}

              {activeTab === "blog" && (
                <BlogManagerTab 
                  isMobile={isMobile}
                />
              )}

              {activeTab === "settings" && (
                <SettingsTab />
              )}
            </>
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
            <button className={`mobile-menu-item ${activeTab === "blog" ? "active" : ""}`}
              onClick={() => { setActiveTab("blog"); setMobileMenuOpen(false); }}>
              <FileText size={18} /> Blog Manager
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