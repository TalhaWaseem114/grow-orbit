"use client";
import React, { useEffect, useState, useMemo } from "react";
import { collection, query, orderBy, limit, getDocs, writeBatch, doc, getDoc, setDoc, where } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { Shield, Clock, Trash2, RefreshCw, Activity, Terminal, Save, Sliders, ToggleLeft, ToggleRight, Search, Download, Database, Image as ImageIcon, Cpu } from "lucide-react";

const getBadgeStyle = (action) => {
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
    case "SEND_NEWSLETTER":
      return { bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)", color: "#10b981" };
    default:
      return { bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.08)", color: "#a3a3a3" };
  }
};

export default function SettingsTab({ triggerConfirm, logActivity }) {
  const [logs, setLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [logSearch, setLogSearch] = useState("");

  // System settings state variables
  const [settings, setSettings] = useState({
    leadNotificationWebhook: "",
  });
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [originalWebhook, setOriginalWebhook] = useState("");

  // System usage & configuration state variables
  const [dbConnectionStatus, setDbConnectionStatus] = useState("checking"); // "checking" | "connected" | "error"
  const [systemConfig, setSystemConfig] = useState({
    resend: false,
    smtp: false,
    cloudinary: false,
    firebase: false
  });
  const [loadingConfig, setLoadingConfig] = useState(true);

  // Fetch system status configurations
  const fetchUsageAndConfig = async () => {
    setLoadingConfig(true);
    try {
      const res = await fetch("/api/system-status");
      if (res.ok) {
        const data = await res.json();
        setSystemConfig(data);
      }
    } catch (e) {
      console.warn("Failed to fetch system config status:", e);
    } finally {
      setLoadingConfig(false);
    }
  };

  // One-time fetch of activity logs
  const fetchLogs = async () => {
    setLoadingLogs(true);
    try {
      const q = query(collection(db, "activity_logs"), orderBy("timestamp", "desc"), limit(100));
      const snapshot = await getDocs(q);
      setLogs(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.warn("Failed to fetch logs:", err.message);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    fetchUsageAndConfig();
  }, []);

  // One-time fetch of global settings
  useEffect(() => {
    const fetchSettings = async () => {
      setDbConnectionStatus("checking");
      try {
        const docRef = doc(db, "settings", "global");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSettings(prev => ({
            ...prev,
            ...data
          }));
          setOriginalWebhook(data.leadNotificationWebhook || "");
        }
        setDbConnectionStatus("connected");
      } catch (err) {
        console.warn("Failed to load settings:", err.message);
        setDbConnectionStatus("error");
      } finally {
        setLoadingSettings(false);
      }
    };
    fetchSettings();
  }, []);

  // Search/filter logs
  const filteredLogs = useMemo(() => {
    let res = logs;
    if (logSearch.trim()) {
      const q = logSearch.toLowerCase();
      res = res.filter(log => 
        log.action?.toLowerCase().includes(q) ||
        log.adminName?.toLowerCase().includes(q) ||
        log.details?.toLowerCase().includes(q)
      );
    }
    return res;
  }, [logs, logSearch]);

  // Group logs by Date (with robust parsing)
  const groupedLogs = useMemo(() => {
    const groups = {};
    filteredLogs.forEach(log => {
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
  }, [filteredLogs]);

  const handleUnlock = () => {
    triggerConfirm(
      "Unlock Discord Webhook",
      "Are you sure you want to unlock the Discord Webhook URL for editing? Changing this will alter where system notifications are sent.",
      () => {
        setIsLocked(false);
      }
    );
  };

  const handleLockAndDiscard = () => {
    setSettings(prev => ({
      ...prev,
      leadNotificationWebhook: originalWebhook
    }));
    setIsLocked(true);
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const docRef = doc(db, "settings", "global");
      await setDoc(docRef, {
        ...settings,
        updatedAt: new Date()
      }, { merge: true });

      logActivity("UPDATE_SETTINGS", "Updated global system configurations");
      setOriginalWebhook(settings.leadNotificationWebhook || "");
      setIsLocked(true);
      alert("Settings saved successfully!");
    } catch (err) {
      alert("Failed to save settings: " + err.message);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleClearLogs = async () => {
    triggerConfirm("Clear Audit Logs", "Are you sure you want to permanently delete all activity logs? This action cannot be undone.", async () => {
      try {
        const snap = await getDocs(collection(db, "activity_logs"));
        const batch = writeBatch(db);
        snap.docs.forEach(d => {
          batch.delete(d.ref);
        });
        await batch.commit();
        setLogs([]);
        logActivity("CLEAR_LOGS", "Cleared the system activity audit log");
      } catch (e) {
        alert("Failed to clear logs: " + e.message);
      }
    }, true);
  };

  const exportLogsToCSV = () => {
    const headers = ["Timestamp", "Action", "Admin User", "Admin Email", "Details"];
    const rows = logs.map(log => {
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
        log.adminEmail || "—",
        `"${(log.details || "").replace(/"/g, '""')}"`
      ];
    });

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `Orbit_System_Audit_Logs_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 6 }}>System · Configuration</div>
        <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, color: "#fff" }}>System Settings</h1>
        <p style={{ fontSize: 13, color: "#525252", marginTop: 8 }}>Configure global rules, integration webhooks, and audit real-time system logs.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, alignItems: "start" }}>
        
        {/* SYSTEM HEALTH & QUOTAS CARD */}
        <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 24, padding: "24px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Cpu size={18} color="#f97316" />
              <h3 style={{ fontSize: 14, fontWeight: 800, color: "#fff", textTransform: "uppercase" }}>System Usage & Quotas</h3>
            </div>
            <button 
              onClick={fetchUsageAndConfig}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              title="Refresh quota status"
            >
              <RefreshCw size={14} color="#a3a3a3" />
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Firestore Health & Quotas */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 16, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
                  <Database size={14} color="#f97316" /> Database (Firestore)
                </span>
                <span style={{ 
                  fontSize: 9, fontWeight: 800, 
                  background: "rgba(74,222,128,0.1)",
                  color: "#4ade80",
                  borderRadius: 6, padding: "2px 6px"
                }}>
                  Active
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                  <span style={{ color: "#a3a3a3" }}>Daily Read Limit:</span>
                  <span style={{ color: "#22c55e", fontWeight: 700 }}>50,000 / day</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                  <span style={{ color: "#a3a3a3" }}>Daily Write Limit:</span>
                  <span style={{ color: "#22c55e", fontWeight: 700 }}>20,000 / day</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                  <span style={{ color: "#a3a3a3" }}>Database Connection:</span>
                  <span style={{ color: dbConnectionStatus === "checking" ? "#a3a3a3" : (dbConnectionStatus === "connected" ? "#4ade80" : "#ef4444"), fontWeight: 700 }}>
                    {dbConnectionStatus === "checking" ? "Checking..." : (dbConnectionStatus === "connected" ? "Read Successful" : "Permission Blocked")}
                  </span>
                </div>
              </div>
              
              <div style={{ marginTop: 10, textAlign: "right" }}>
                <a 
                  href="https://console.firebase.google.com/u/0/project/groworbit-9b75a/usage" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ fontSize: 10, color: "#f97316", textDecoration: "none", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}
                  onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                  onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
                >
                  View Firebase Console Usage ↗
                </a>
              </div>
              
              {dbConnectionStatus === "error" && (
                <div style={{ marginTop: 10, padding: "8px 10px", borderRadius: 8, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", fontSize: 10, color: "#f87171", lineHeight: 1.3 }}>
                  Warning: Cannot connect to Firestore. Please check your Firebase security rules.
                </div>
              )}
            </div>

            {/* Cloudinary Status */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 16, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
                  <ImageIcon size={14} color="#f97316" /> Image Hosting
                </span>
                <span style={{ 
                  fontSize: 9, fontWeight: 800, 
                  background: systemConfig.cloudinary ? "rgba(74,222,128,0.1)" : "rgba(115,115,115,0.1)",
                  color: systemConfig.cloudinary ? "#4ade80" : "#a3a3a3",
                  borderRadius: 6, padding: "2px 6px"
                }}>
                  {loadingConfig ? "Checking..." : (systemConfig.cloudinary ? "Connected" : "Not Configured")}
                </span>
              </div>
              <p style={{ fontSize: 9, color: "#525252", margin: 0, lineHeight: 1.3 }}>
                Used to host header images uploaded in your newsletter campaigns.
              </p>
              <div style={{ marginTop: 10, textAlign: "right" }}>
                <a 
                  href="https://console.cloudinary.com/app/c-546f67fb2bd0d1456f0690c5d5a087/home/usage-reports" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ fontSize: 10, color: "#f97316", textDecoration: "none", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}
                  onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                  onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
                >
                  View Cloudinary Console Usage ↗
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* COLUMN 2: SETTINGS & ANALYTICS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* GLOBAL PREFERENCES CARD */}
          <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 24, padding: "24px", display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Sliders size={18} color="#f97316" />
              <h3 style={{ fontSize: 14, fontWeight: 800, color: "#fff", textTransform: "uppercase" }}>Global Preferences</h3>
            </div>

            {loadingSettings ? (
              <div style={{ fontSize: 12, color: "#525252", padding: "20px 0" }}>Loading preferences...</div>
            ) : (
              <form onSubmit={handleSaveSettings} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <label style={{ fontSize: 9, fontWeight: 700, color: "#737373", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      Lead Notifications Discord Webhook
                    </label>
                    <button
                      type="button"
                      onClick={isLocked ? handleUnlock : handleLockAndDiscard}
                      style={{
                        background: "none",
                        border: "none",
                        color: isLocked ? "#f97316" : "#ef4444",
                        fontSize: 10,
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        padding: 0
                      }}
                    >
                      {isLocked ? (
                        <>
                          <Shield size={12} /> Unlock to Edit
                        </>
                      ) : (
                        <>
                          <Save size={12} /> Lock & Discard
                        </>
                      )}
                    </button>
                  </div>
                  <input
                    type={isLocked ? "password" : "text"}
                    readOnly={isLocked}
                    value={settings.leadNotificationWebhook}
                    onChange={e => setSettings({ ...settings, leadNotificationWebhook: e.target.value })}
                    placeholder="https://discord.com/api/webhooks/..."
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 12,
                      padding: "10px 14px",
                      color: "#fff",
                      fontSize: 12,
                      opacity: isLocked ? 0.6 : 1,
                      cursor: isLocked ? "not-allowed" : "text",
                      fontFamily: isLocked ? "monospace" : "inherit"
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={savingSettings}
                  style={{
                    background: "linear-gradient(135deg, #f97316, #ea580c)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 12,
                    padding: "10px 18px",
                    fontSize: 12,
                    fontWeight: 800,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    boxShadow: "0 4px 15px rgba(249,115,22,0.2)",
                    marginTop: 8,
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <Save size={14} />
                  {savingSettings ? "Saving..." : "Save Settings"}
                </button>
              </form>
            )}
          </div>

          {/* GOOGLE ANALYTICS CARD */}
          <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 24, padding: "24px", display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Activity size={18} color="#f97316" />
              <h3 style={{ fontSize: 14, fontWeight: 800, color: "#fff", textTransform: "uppercase" }}>Web Traffic & Analytics</h3>
            </div>

            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 16, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#fff" }}>
                  Google Analytics 4
                </span>
                <span style={{ 
                  fontSize: 9, fontWeight: 800, 
                  background: "rgba(74,222,128,0.1)",
                  color: "#4ade80",
                  borderRadius: 6, padding: "2px 6px"
                }}>
                  Active
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                  <span style={{ color: "#a3a3a3" }}>Measurement ID:</span>
                  <span style={{ color: "#fff", fontWeight: 700 }}>G-6TGTYN8XX4</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                  <span style={{ color: "#a3a3a3" }}>Tracking Status:</span>
                  <span style={{ color: "#4ade80", fontWeight: 700 }}>Active & Recording</span>
                </div>
              </div>

              <p style={{ fontSize: 10, color: "#525252", margin: "0 0 14px 0", lineHeight: 1.4 }}>
                Use the Google Analytics console to track real-time active users, bounce rates, traffic acquisition channels, and conversion events.
              </p>

              <div style={{ textAlign: "right" }}>
                <a 
                  href="https://analytics.google.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ fontSize: 11, color: "#f97316", textDecoration: "none", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}
                  onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                  onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
                >
                  Open Google Analytics Console ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* AUDIT LOGS CARD */}
        <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 24, padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Terminal size={18} color="#f97316" />
              <h3 style={{ fontSize: 14, fontWeight: 800, color: "#fff", textTransform: "uppercase" }}>System Audit Trail</h3>
            </div>
            
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                onClick={fetchLogs}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  padding: "6px 12px",
                  fontSize: 10,
                  fontWeight: 800,
                  color: "#a3a3a3",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "all 0.15s"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <RefreshCw size={12} /> Refresh
              </button>

              <button
                onClick={exportLogsToCSV}
                disabled={logs.length === 0}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  padding: "6px 12px",
                  fontSize: 10,
                  fontWeight: 800,
                  color: "#a3a3a3",
                  cursor: logs.length === 0 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "all 0.15s"
                }}
                onMouseEnter={e => { if (logs.length > 0) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                <Download size={12} /> Export CSV
              </button>

              {logs.length > 0 && (
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

          <div style={{
            background: "#060606",
            border: "1px solid rgba(255,255,255,0.03)",
            borderRadius: 16,
            height: "400px",
            overflowY: "auto",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}>
            {loadingLogs ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#525252", fontSize: 11 }}>
                Loading log stream...
              </div>
            ) : filteredLogs.length === 0 ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#3f3f46", fontSize: 11 }}>
                {logSearch ? "No matching logs found." : "No events recorded in system log."}
              </div>
            ) : (
              Object.entries(groupedLogs).map(([dateStr, dayLogs]) => (
                <div key={dateStr} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {/* Date grouping label */}
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
                    background: "#060606",
                    zIndex: 10,
                    marginBottom: 8
                  }}>
                    {dateStr}
                  </div>

                  <div style={{ position: "relative", paddingLeft: 16, borderLeft: "2px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: 20 }}>
                    {dayLogs.map(log => {
                      const badge = getBadgeStyle(log.action);
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
                          <div style={{ position: "absolute", left: -21, top: 4, width: 8, height: 8, borderRadius: "50%", background: badge.color, boxShadow: `0 0 8px ${badge.color}`, border: "2px solid #060606" }} />
                          
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
  );
}
