"use client";

import { signOut, onAuthStateChanged } from "firebase/auth";
import {
  collection, deleteDoc, doc, getDocs,
  orderBy, query, getDoc, updateDoc, onSnapshot, arrayUnion, addDoc
} from "firebase/firestore";
import {
  Briefcase, ChevronRight, Globe, Layout, LogOut, Settings,
  Shield, Users, Zap, ExternalLink, MoreHorizontal, Download,
  Home, FileText, Mail, HelpCircle, Receipt, Bell
} from "lucide-react";
import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* Firebase config */
import { db, auth } from "../../firebase/firebaseConfig";

/* Configs and Services */
import { calculateLeadScore } from "@/lib/crmHelpers";

/* Tab Subcomponents */
import OverviewTab from "./components/OverviewTab";
import LeadsTab from "./components/LeadsTab";
import UsersTab from "./components/UsersTab";
import TeamTab from "./components/TeamTab";
import SettingsTab from "./components/SettingsTab";
import BlogManagerTab from "./BlogManagerTab";
import NewsletterTab from "./components/NewsletterTab";
import InvoicesTab from "./components/InvoicesTab";
import ConfirmModal from "./components/ConfirmModal";

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
      {isCollapsed && badge > 0 && (
        <span className="absolute top-1 right-2 min-w-[14px] h-[14px] rounded-full text-[8px] font-black flex items-center justify-center"
          style={{ background: "#f97316", color: "#fff", padding: "0 2px" }}>
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
  const [leadsCollectionName, setLeadsCollectionName] = useState("leads");
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentAdminData, setCurrentAdminData] = useState(null);

  /* Confirm Modal configuration */
  const [confirmModalConfig, setConfirmModalConfig] = useState(null);

  const triggerConfirm = (title, message, onConfirm, isDestructive = false) => {
    setConfirmModalConfig({ title, message, onConfirm, isDestructive });
  };

  /* Audit Trail logging */
  const logActivity = async (action, details) => {
    try {
      const currentAdmin = users.find(u => u.id === auth.currentUser?.uid);
      const name = currentAdmin?.fullName || currentAdmin?.displayName || auth.currentUser?.email || "System";
      await addDoc(collection(db, "activity_logs"), {
        action,
        details,
        adminId: auth.currentUser?.uid || "unknown",
        adminName: name,
        adminEmail: auth.currentUser?.email || "unknown",
        timestamp: new Date()
      });
    } catch (e) {
      console.warn("[logActivity] Failed to write audit log:", e.message);
    }
  };

  /* CRM Filter State variables passed down */
  const [leadSearch, setLeadSearch] = useState("");
  const [leadFilter, setLeadFilter] = useState("all");
  const [leadViewMode, setLeadViewMode] = useState("table");
  const [expandedLead, setExpandedLead] = useState(null);
  const [crmNote, setCrmNote] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [startDate, setStartDate] = useState(() => {
    const now = new Date();
    const past30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    return past30.toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("adminSidebarCollapsed");
      if (saved !== null) {
        setIsSidebarCollapsed(saved === "true");
      }
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("adminSidebarCollapsed", String(next));
      }
      return next;
    });
  };

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

  /* Resolve panels allowed for the current logged-in admin profile */
  const allowedPanels = useMemo(() => {
    if (!currentAdminData) return [];
    return Array.isArray(currentAdminData.allowedPanels) && currentAdminData.allowedPanels.length > 0
      ? currentAdminData.allowedPanels
      : ["overview", "leads", "users", "team", "invoices", "blog", "newsletter", "settings"];
  }, [currentAdminData]);

  /* Persist active tab selection to localStorage */
  useEffect(() => {
    if (typeof window !== "undefined" && allowedPanels.length > 0) {
      const savedTab = localStorage.getItem("adminActiveTab");
      if (savedTab && allowedPanels.includes(savedTab)) {
        setActiveTab(savedTab);
      } else {
        setActiveTab(allowedPanels[0]);
      }
    }
  }, [allowedPanels]);

  useEffect(() => {
    if (typeof window !== "undefined" && allowedPanels.includes(activeTab)) {
      localStorage.setItem("adminActiveTab", activeTab);
    }
  }, [activeTab, allowedPanels]);

  /* Authentication Guard */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) { router.push("/login/"); return; }
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (!snap.exists()) { router.push("/login/"); return; }
        const role = snap.data().role?.trim() || "user";
        if (role === "admin") {
          setCurrentAdminData({ id: snap.id, ...snap.data() });
          setAuthChecking(false);
        } else if (role === "user") {
          router.push("/client-dashboard/");
        } else {
          router.push("/login/");
        }
      } catch { router.push("/login/"); }
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
        const lQ_low = query(collection(db, "leads"), orderBy("createdAt", "desc"));
        const finalSnap = await getDocs(lQ_low);
        setLeadsCollectionName("leads");

        if (finalSnap) {
          const fetchedLeads = finalSnap.docs.map(d => {
            const data = d.data();
            let status = data.status || "new";
            if (status === "new" && data.createdAt) {
              const created = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
              const ageDays = (new Date() - created) / (1000 * 60 * 60 * 24);
              if (ageDays > 7) {
                status = "cold";
              }
            }
            return { ...data, id: d.id, status };
          });
          setLeads(fetchedLeads);
        } else {
          console.warn("[AdminDashboard] Lowercase leads query returned no documents.");
        }
      } catch (e) {
        console.warn("Leads fetch restricted by permissions:", e.message);
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

  /* Real-time lead listener for notifications and booking confirmations */
  const prevLeadCount = useRef(null);
  useEffect(() => {
    if (authChecking) return;
    const lQ = query(collection(db, leadsCollectionName), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(lQ,
      (snapshot) => {
        const rawDocs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

        // Separate booking confirmations from actual leads
        const actualLeads = rawDocs.filter(d => d.type !== "booking_confirmation").map(d => {
          let status = d.status || "new";
          if (status === "new" && d.createdAt) {
            const created = d.createdAt.toDate ? d.createdAt.toDate() : new Date(d.createdAt);
            const ageDays = (new Date() - created) / (1000 * 60 * 60 * 24);
            if (ageDays > 7) {
              status = "cold";
            }
          }
          return { ...d, status };
        });

        // Send browser notification if a new actual lead was appended
        if (prevLeadCount.current !== null && actualLeads.length > prevLeadCount.current) {
          const latest = actualLeads[0];
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
        prevLeadCount.current = actualLeads.length;
        setLeads(actualLeads);
      },
      (error) => {
        console.warn("[AdminDashboard] Real-time Leads snapshot subscription error:", error.message);
      }
    );
    return () => unsub();
  }, [authChecking, leadsCollectionName]);

  /* Real-time client listener */
  useEffect(() => {
    if (authChecking) return;
    const q = query(collection(db, "clients"), orderBy("startDate", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setClients(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => {
      console.warn("[AdminDashboard] Real-time Clients snapshot error:", err.message);
    });
    return () => unsub();
  }, [authChecking]);

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

  const handleLogout = async () => { await signOut(auth); router.push("/login/"); };

  const handleDeleteLead = async (id, skipConfirm = false) => {
    const targetLead = leads.find(l => l.id === id);
    const label = targetLead ? (targetLead.fullName || targetLead.email) : id;
    const executeDelete = async () => {
      try {
        await deleteDoc(doc(db, leadsCollectionName, id));
        setLeads(prev => prev.filter(l => l.id !== id));
        logActivity("DELETE_LEAD", `Deleted lead: "${label}" (${id})`);
      } catch (e) {
        alert("Delete failed: " + e.message);
      }
    };
    if (skipConfirm) {
      await executeDelete();
    } else {
      if (window.confirm(`Are you sure you want to permanently delete lead "${label}"? This action cannot be undone.`)) {
        await executeDelete();
      }
    }
  };

  const handleDeleteUser = async (id) => {
    const targetUser = users.find(u => u.id === id);
    const label = targetUser ? (targetUser.displayName || targetUser.fullName || targetUser.email) : id;
    triggerConfirm("Delete User", `Are you sure you want to permanently delete user account "${label}"? This action cannot be undone.`, async () => {
      try {
        await deleteDoc(doc(db, "users", id));
        setUsers(prev => prev.filter(u => u.id !== id));
        logActivity("DELETE_USER", `Deleted user account: "${label}" (${id})`);
      } catch (e) { alert("Delete failed: " + e.message); }
    }, true);
  };

  const handleRoleChange = async (userId, newRole, currentRole, allowedPanels = null, skipConfirm = false) => {
    if (newRole === currentRole && !allowedPanels) return;
    const targetUser = users.find(u => u.id === userId);
    const label = targetUser ? (targetUser.displayName || targetUser.fullName || targetUser.email) : userId;

    const executeRoleChange = async () => {
      try {
        const updateData = { role: newRole };
        if (newRole === "admin" && allowedPanels) {
          updateData.allowedPanels = allowedPanels;
        } else if (newRole === "user") {
          updateData.allowedPanels = [];
        }
        await updateDoc(doc(db, "users", userId), updateData);
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole, allowedPanels: allowedPanels || u.allowedPanels || [] } : u));

        if (newRole === "admin") {
          const panelsStr = allowedPanels ? allowedPanels.join(", ") : "All";
          logActivity(allowedPanels ? "UPDATE_PERMISSIONS" : "PROMOTE_ADMIN", `Updated role for "${label}" to ADMIN with panel access: [${panelsStr}]`);
        } else {
          logActivity("REVOKE_ADMIN", `Revoked admin role from user "${label}"`);
        }

        if (userId === auth.currentUser?.uid) {
          setCurrentAdminData(prev => prev ? { ...prev, role: newRole, allowedPanels: allowedPanels || prev.allowedPanels || [] } : null);
        }
      } catch (e) { alert("Update failed: " + e.message); }
    };

    if (skipConfirm) {
      await executeRoleChange();
    } else {
      const confirmTitle = newRole === "admin"
        ? (allowedPanels ? "Update Permissions" : "Promote Member")
        : "Revoke Admin Access";
      const confirmMsg = newRole === "admin"
        ? `Are you sure you want to ${allowedPanels ? "update the permissions for" : "promote"} "${label}" to Admin access?`
        : `Are you sure you want to revoke Admin access for "${label}"? They will lose all dashboard permissions.`;

      triggerConfirm(confirmTitle, confirmMsg, executeRoleChange, newRole !== "admin");
    }
  };

  const exportLeads = () => {
    const headers = [
      "Name", "Email", "WhatsApp", "Service", "ASINs", "Retainer",
      "Source", "Status", "Priority", "Assigned To", "Meeting Booked",
      "Follow Up Date", "Date Created", "Notes/Challenge"
    ];

    const rows = leads.map(l => {
      const escapeCsv = (str) => {
        if (str === null || str === undefined || str === "") return '"N/A"';
        const StringStr = String(str);
        return `"${StringStr.replace(/"/g, '""')}"`;
      };

      return [
        escapeCsv(l.fullName),
        escapeCsv(l.email),
        escapeCsv(l.whatsapp),
        escapeCsv(l.requestedService),
        escapeCsv(l.asins),
        escapeCsv(l.monthlyRetainer),
        escapeCsv(l.source || "Direct"),
        escapeCsv(l.status || "new"),
        escapeCsv(l.priority || "normal"),
        escapeCsv(l.assignedName || "Unassigned"),
        escapeCsv(l.meetingBooked ? "Yes" : "No"),
        escapeCsv(l.nextFollowUp || "None"),
        escapeCsv(l.createdAt?.toDate ? l.createdAt.toDate().toLocaleString() : "N/A"),
        escapeCsv(l.notes || l.challenge || "")
      ];
    });

    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
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
      const targetLead = leads.find(l => l.id === leadId);
      const name = targetLead ? (targetLead.fullName || targetLead.email) : leadId;
      const updatedLead = { ...targetLead, status: newStatus };
      const score = calculateLeadScore(updatedLead);
      const now = new Date();

      // Build phase timestamp updates — auto-fill previous phases
      const tsUpdates = {};
      
      // Phase 2: Research Done (qualified)
      if (["qualified", "contacted", "hot", "proposal_sent", "won"].includes(newStatus)) {
        if (!targetLead?.researchCompletedAt) tsUpdates.researchCompletedAt = now;
      }
      // Phase 3: Contacted / Meeting (contacted, hot)
      if (["contacted", "hot", "proposal_sent", "won"].includes(newStatus)) {
        if (!targetLead?.contactedAt) tsUpdates.contactedAt = now;
      }
      // Phase 4: Proposal Sent
      if (["proposal_sent", "won"].includes(newStatus)) {
        if (!targetLead?.proposalSentAt) tsUpdates.proposalSentAt = now;
      }
      // Phase 5: Won/Lost
      if (["won", "lost"].includes(newStatus)) {
        if (!targetLead?.closedAt) tsUpdates.closedAt = now;
      }

      const updatePayload = { status: newStatus, score, ...tsUpdates };
      await updateDoc(doc(db, leadsCollectionName, leadId), updatePayload);
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, ...updatePayload } : l));
      logActivity("UPDATE_LEAD_STATUS", `Changed status for lead "${name}" to ${newStatus.toUpperCase()}`);
    } catch (e) { console.warn("Status change failed:", e.message); }
  };

  const handleAssignLead = async (leadId, adminId, adminName) => {
    try {
      const targetLead = leads.find(l => l.id === leadId);
      const leadName = targetLead ? (targetLead.fullName || targetLead.email) : leadId;
      await updateDoc(doc(db, leadsCollectionName, leadId), { assignedTo: adminId, assignedName: adminName });
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, assignedTo: adminId, assignedName: adminName } : l));
      logActivity("ASSIGN_LEAD_OWNER", adminId ? `Assigned lead "${leadName}" to ${adminName}` : `Unassigned lead "${leadName}"`);
    } catch (e) { console.warn("Owner assignment failed:", e.message); }
  };

  const handleUpdatePriority = async (leadId, priority) => {
    try {
      await updateDoc(doc(db, leadsCollectionName, leadId), { priority });
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, priority } : l));
    } catch (e) { console.warn("Priority update failed:", e.message); }
  };

  const handleUpdateFollowUp = async (leadId, dateString) => {
    try {
      await updateDoc(doc(db, leadsCollectionName, leadId), { nextFollowUp: dateString });
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, nextFollowUp: dateString } : l));
    } catch (e) { console.warn("Follow-up date update failed:", e.message); }
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
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, timeline: [newEntry, ...(l.timeline || [])] } : l));
      return "done";
    } catch (e) { console.warn("Add timeline note failed:", e.message); return "error"; }
  };

  const handleDeleteLeadNote = async (leadId, timestamp) => {
    if (!timestamp) return;
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      const leadRef = doc(db, leadsCollectionName, leadId);
      const leadSnap = await getDoc(leadRef);
      const currentTimeline = leadSnap.data().timeline || [];
      const updatedTimeline = currentTimeline.filter(item => {
        const itemTime = item.timestamp?.toDate ? item.timestamp.toDate().getTime() : new Date(item.timestamp).getTime();
        const targetTime = timestamp?.toDate ? timestamp.toDate().getTime() : new Date(timestamp).getTime();
        return itemTime !== targetTime;
      });
      await updateDoc(leadRef, { timeline: updatedTimeline });
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, timeline: updatedTimeline } : l));
    } catch (e) {
      console.warn("Delete timeline note failed:", e.message);
    }
  };


  const recent3dLeadsCount = useMemo(() => {
    const now = new Date();
    const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
    return (leads || []).filter(l => {
      if (!l.createdAt) return false;
      const created = l.createdAt?.toDate ? l.createdAt.toDate() : new Date(l.createdAt);
      return (now - created) <= threeDaysMs;
    }).length;
  }, [leads]);
  const newLeadsCount = recent3dLeadsCount;

  const recent3dUsersCount = useMemo(() => {
    const now = new Date();
    const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
    return (users || []).filter(u => {
      const created = u.createdAt?.toDate ? u.createdAt.toDate() : (u.createdAt ? new Date(u.createdAt) : null);
      if (!created) return false;
      return (now - created) <= threeDaysMs;
    }).length;
  }, [users]);
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
    <div className="admin-shell" style={{ display: "flex", flexDirection: isMobile ? "column" : "row", height: "100vh", width: "100%", maxWidth: "100vw", background: "#060606", color: "#fff", fontFamily: "'Montserrat', sans-serif", overflow: "hidden" }}>
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
          onClick={toggleSidebar}
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
              <img src="/logo.png" alt="Grow Orbit Logo" style={{ width: 28, height: 28, objectFit: "contain" }} />
            </div>
            {!isSidebarCollapsed && (
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 15, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>ORBIT</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#525252", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 2 }}>Command Centre</div>
              </div>
            )}
          </button>

          <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {isSidebarCollapsed ? <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.06)", margin: "4px auto", borderRadius: 1 }} /> : <div style={{ fontSize: 9, fontWeight: 700, color: "#333", letterSpacing: "0.25em", textTransform: "uppercase", padding: "0 4px", marginBottom: 6 }}>Main</div>}
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
            {allowedPanels.includes("overview") && (
              <SidebarItem id="overview" label="Overview" icon={Globe} activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isSidebarCollapsed} />
            )}

            {/* Management Section */}
            {(allowedPanels.includes("leads") || allowedPanels.includes("users") || allowedPanels.includes("team") || allowedPanels.includes("invoices")) && (
              <>
                {isSidebarCollapsed ? <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.06)", margin: "6px auto", borderRadius: 1 }} /> : <div style={{ fontSize: 9, fontWeight: 700, color: "#333", letterSpacing: "0.25em", textTransform: "uppercase", padding: "0 4px", marginTop: 16, marginBottom: 6 }}>Management</div>}
                {allowedPanels.includes("leads") && (
                  <SidebarItem id="leads" label="Lead Pipeline" icon={Briefcase} activeTab={activeTab} setActiveTab={setActiveTab} badge={recent3dLeadsCount} isCollapsed={isSidebarCollapsed} />
                )}
                {allowedPanels.includes("users") && (
                  <SidebarItem id="users" label="User Directory" icon={Users} activeTab={activeTab} setActiveTab={setActiveTab} badge={recent3dUsersCount} isCollapsed={isSidebarCollapsed} />
                )}
                {allowedPanels.includes("team") && (
                  <SidebarItem id="team" label="Agency Team" icon={Shield} activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isSidebarCollapsed} />
                )}
                {allowedPanels.includes("invoices") && (
                  <SidebarItem id="invoices" label="Invoices & Contracts" icon={Receipt} activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isSidebarCollapsed} />
                )}
              </>
            )}

            {/* Content Section */}
            {(allowedPanels.includes("blog") || allowedPanels.includes("newsletter")) && (
              <>
                {isSidebarCollapsed ? <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.06)", margin: "6px auto", borderRadius: 1 }} /> : <div style={{ fontSize: 9, fontWeight: 700, color: "#333", letterSpacing: "0.25em", textTransform: "uppercase", padding: "0 4px", marginTop: 16, marginBottom: 6 }}>Content</div>}
                {allowedPanels.includes("blog") && (
                  <SidebarItem id="blog" label="Blog Manager" icon={FileText} activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isSidebarCollapsed} />
                )}
                {allowedPanels.includes("newsletter") && (
                  <SidebarItem id="newsletter" label="Email Designer" icon={Mail} activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isSidebarCollapsed} />
                )}
              </>
            )}

            {/* System Section */}
            {allowedPanels.includes("settings") && (
              <>
                {isSidebarCollapsed ? <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.06)", margin: "6px auto", borderRadius: 1 }} /> : <div style={{ fontSize: 9, fontWeight: 700, color: "#333", letterSpacing: "0.25em", textTransform: "uppercase", padding: "0 4px", marginTop: 16, marginBottom: 6 }}>System</div>}
                <SidebarItem id="settings" label="Settings" icon={Settings} activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isSidebarCollapsed} />
              </>
            )}
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
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0, width: "100%" }}>

        {/* Header */}
        <header className="admin-header" style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", borderBottom: "1px solid rgba(255,255,255,0.04)", background: "rgba(6,6,6,0.8)", backdropFilter: "blur(12px)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {isMobile && (
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "white", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", marginRight: 4, flexShrink: 0 }}>
                <img src="/logo.png" alt="Grow Orbit Logo" style={{ width: 20, height: 20, objectFit: "contain" }} />
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
            {/* Notifications Bell Button */}
            <button
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: 10,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#a3a3a3",
                transition: "all 0.15s",
                position: "relative"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
              title="Notifications"
            >
              <Bell size={14} />
              <div style={{
                position: "absolute",
                top: 7,
                right: 7,
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#f97316",
                boxShadow: "0 0 6px #f97316"
              }} />
            </button>

            <div style={{ 
              width: 32, 
              height: 32, 
              borderRadius: "50%", 
              background: "linear-gradient(135deg, #f97316, #ea580c)", 
              border: "1px solid rgba(255,255,255,0.15)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              fontSize: 11, 
              fontWeight: 900, 
              color: "#fff",
              boxShadow: "0 0 10px rgba(249,115,22,0.2)"
            }}>
              {adminInitials}
            </div>
          </div>
        </header>

        {/* Content Viewports */}
        <div className="admin-content" style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh", gap: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid rgba(249,115,22,0.2)", borderTopColor: "#f97316", animation: "spin 1s linear infinite" }} />
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: "#525252" }}>Loading dashboard data…</p>
            </div>
          ) : (
            <>
              {activeTab === "overview" && allowedPanels.includes("overview") && (
                <OverviewTab
                  currentTime={currentTime}
                  users={users}
                  leads={leads}
                  clients={clients}
                  newLeadsCount={newLeadsCount}
                  conversionRate={conversionRate}
                  isMobile={isMobile}
                  setActiveTab={setActiveTab}
                  db={db}
                  currentAdmin={currentAdminData}
                  triggerConfirm={triggerConfirm}
                  logActivity={logActivity}
                />
              )}

              {activeTab === "leads" && allowedPanels.includes("leads") && (
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
                  ownerFilter={ownerFilter}
                  setOwnerFilter={setOwnerFilter}
                  sourceFilter={sourceFilter}
                  setSourceFilter={setSourceFilter}
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
                  handleUpdateFollowUp={handleUpdateFollowUp}
                  handleAddLeadNote={handleAddLeadNote}
                  handleDeleteLeadNote={handleDeleteLeadNote}
                  exportLeads={exportLeads}
                  triggerConfirm={triggerConfirm}
                  logActivity={logActivity}
                  leadsCollectionName={leadsCollectionName}
                />
              )}

              {activeTab === "users" && allowedPanels.includes("users") && (
                <UsersTab
                  users={users}
                  leads={leads}
                  clients={clients}
                  userSearch={userSearch}
                  setUserSearch={setUserSearch}
                  handleDeleteUser={handleDeleteUser}
                  handleDeleteLead={handleDeleteLead}
                  currentUserId={auth.currentUser?.uid}
                />
              )}

              {activeTab === "team" && allowedPanels.includes("team") && (
                <TeamTab
                  users={users}
                  handleRoleChange={handleRoleChange}
                  currentUserId={auth.currentUser?.uid}
                  triggerConfirm={triggerConfirm}
                  logActivity={logActivity}
                />
              )}

              {activeTab === "invoices" && allowedPanels.includes("invoices") && (
                <InvoicesTab
                  isMobile={isMobile}
                  triggerConfirm={triggerConfirm}
                  logActivity={logActivity}
                />
              )}

              {activeTab === "blog" && allowedPanels.includes("blog") && (
                <BlogManagerTab
                  isMobile={isMobile}
                  triggerConfirm={triggerConfirm}
                  logActivity={logActivity}
                />
              )}

              {activeTab === "newsletter" && allowedPanels.includes("newsletter") && (
                <NewsletterTab
                  isMobile={isMobile}
                />
              )}

              {activeTab === "settings" && allowedPanels.includes("settings") && (
                <SettingsTab
                  triggerConfirm={triggerConfirm}
                  logActivity={logActivity}
                />
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
            { id: "newsletter", icon: Mail, label: "Email" },
          ].filter(item => allowedPanels.includes(item.id)).map(item => (
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

            {allowedPanels.includes("team") && (
              <button className={`mobile-menu-item ${activeTab === "team" ? "active" : ""}`}
                onClick={() => { setActiveTab("team"); setMobileMenuOpen(false); }}>
                <Shield size={18} /> Agency Team
              </button>
            )}
            {allowedPanels.includes("invoices") && (
              <button className={`mobile-menu-item ${activeTab === "invoices" ? "active" : ""}`}
                onClick={() => { setActiveTab("invoices"); setMobileMenuOpen(false); }}>
                <Receipt size={18} /> Invoices & Contracts
              </button>
            )}
            {allowedPanels.includes("blog") && (
              <button className={`mobile-menu-item ${activeTab === "blog" ? "active" : ""}`}
                onClick={() => { setActiveTab("blog"); setMobileMenuOpen(false); }}>
                <FileText size={18} /> Blog Manager
              </button>
            )}
            {allowedPanels.includes("settings") && (
              <button className={`mobile-menu-item ${activeTab === "settings" ? "active" : ""}`}
                onClick={() => { setActiveTab("settings"); setMobileMenuOpen(false); }}>
                <Settings size={18} /> Settings
              </button>
            )}

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

      {/* Confirm Modal Overlay */}
      <ConfirmModal
        isOpen={!!confirmModalConfig}
        title={confirmModalConfig?.title || "Confirm Action"}
        message={confirmModalConfig?.message || ""}
        isDestructive={confirmModalConfig?.isDestructive}
        onConfirm={() => {
          if (confirmModalConfig?.onConfirm) confirmModalConfig.onConfirm();
          setConfirmModalConfig(null);
        }}
        onCancel={() => setConfirmModalConfig(null)}
      />
    </div>
  );
}