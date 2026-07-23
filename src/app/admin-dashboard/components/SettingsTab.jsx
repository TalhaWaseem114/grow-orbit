"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { Shield, Save, Sliders, ToggleLeft, ToggleRight, Database, Image as ImageIcon, Cpu, RefreshCw, Activity } from "lucide-react";

export default function SettingsTab({ triggerConfirm, logActivity }) {
  // System settings state variables
  const [settings, setSettings] = useState({
    leadNotificationWebhook: "",
  });
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [originalWebhook, setOriginalWebhook] = useState("");

  // System usage & configuration state variables
  const [dbConnectionStatus, setDbConnectionStatus] = useState("checking");
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

  useEffect(() => {
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

  return (
    <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 6 }}>System · Configuration</div>
        <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, color: "#fff" }}>System Settings</h1>
        <p style={{ fontSize: 13, color: "#525252", marginTop: 8 }}>Configure global rules, system usage quotas, and web analytics.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24, alignItems: "start" }}>
        
        {/* SYSTEM HEALTH & QUOTAS CARD */}
        <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 24, padding: "24px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Cpu size={18} color="#f97316" />
              <h3 style={{ fontSize: 14, fontWeight: 800, color: "#fff", textTransform: "uppercase" }}>System Usage &amp; Quotas</h3>
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
                  background: dbConnectionStatus === "connected" ? "rgba(74,222,128,0.1)" : dbConnectionStatus === "error" ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.05)", 
                  color: dbConnectionStatus === "connected" ? "#4ade80" : dbConnectionStatus === "error" ? "#ef4444" : "#a3a3a3", 
                  padding: "2px 8px", borderRadius: 100, border: `1px solid ${dbConnectionStatus === "connected" ? "rgba(74,222,128,0.2)" : dbConnectionStatus === "error" ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.1)"}` 
                }}>
                  {dbConnectionStatus === "connected" ? "Active" : dbConnectionStatus === "error" ? "Connection Error" : "Checking..."}
                </span>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10 }}>
                  <span style={{ color: "#737373" }}>Daily Read Limit:</span>
                  <span style={{ color: "#4ade80", fontFamily: "monospace", fontWeight: 700 }}>50,000 / day</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10 }}>
                  <span style={{ color: "#737373" }}>Daily Write Limit:</span>
                  <span style={{ color: "#4ade80", fontFamily: "monospace", fontWeight: 700 }}>20,000 / day</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10 }}>
                  <span style={{ color: "#737373" }}>Database Connection:</span>
                  <span style={{ color: dbConnectionStatus === "connected" ? "#4ade80" : "#ef4444", fontWeight: 700 }}>
                    {dbConnectionStatus === "connected" ? "Read Successful" : dbConnectionStatus === "error" ? "Disconnected" : "Connecting..."}
                  </span>
                </div>
              </div>
              <div style={{ marginTop: 12, textAlign: "right" }}>
                <a 
                  href="https://console.firebase.google.com/" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ fontSize: 9, color: "#f97316", fontWeight: 700, textDecoration: "none" }}
                  onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                  onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
                >
                  View Firebase Console Usage ↗
                </a>
              </div>
            </div>

            {/* Cloudinary Image Hosting */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 16, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
                  <ImageIcon size={14} color="#f97316" /> Image Hosting
                </span>
                <span style={{ 
                  fontSize: 9, fontWeight: 800, 
                  background: systemConfig.cloudinary ? "rgba(74,222,128,0.1)" : "rgba(239,68,68,0.1)", 
                  color: systemConfig.cloudinary ? "#4ade80" : "#ef4444", 
                  padding: "2px 8px", borderRadius: 100, border: `1px solid ${systemConfig.cloudinary ? "rgba(74,222,128,0.2)" : "rgba(239,68,68,0.2)"}` 
                }}>
                  {loadingConfig ? "Checking..." : systemConfig.cloudinary ? "Connected" : "Not Configured"}
                </span>
              </div>
              <p style={{ fontSize: 10, color: "#737373", margin: "0 0 12px 0", lineHeight: 1.4 }}>
                Used to host header images uploaded in your newsletter campaigns.
              </p>
              <div style={{ textAlign: "right" }}>
                <a 
                  href="https://console.cloudinary.com/" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ fontSize: 9, color: "#f97316", fontWeight: 700, textDecoration: "none" }}
                  onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                  onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
                >
                  View Cloudinary Console Usage ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* GLOBAL PREFERENCES & WEB TRAFFIC CARDS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* DISCORD WEBHOOK CARD */}
          <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 24, padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Sliders size={18} color="#f97316" />
                <h3 style={{ fontSize: 14, fontWeight: 800, color: "#fff", textTransform: "uppercase" }}>Global Preferences</h3>
              </div>
              {isLocked && (
                <button
                  type="button"
                  onClick={handleUnlock}
                  style={{ fontSize: 10, color: "#f97316", background: "none", border: "none", cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}
                >
                  <Shield size={12} /> Unlock to Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveSettings} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: "#737373", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                  Lead Notifications Discord Webhook
                </label>
                <input
                  type="url"
                  placeholder="https://discord.com/api/webhooks/..."
                  value={settings.leadNotificationWebhook}
                  disabled={isLocked}
                  onChange={e => setSettings({ ...settings, leadNotificationWebhook: e.target.value })}
                  style={{
                    width: "100%",
                    background: isLocked ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isLocked ? "rgba(255,255,255,0.05)" : "rgba(249,115,22,0.4)"}`,
                    borderRadius: 12,
                    padding: "10px 14px",
                    color: isLocked ? "#737373" : "#fff",
                    fontSize: 11,
                    fontFamily: "monospace",
                    outline: "none",
                    transition: "all 0.2s"
                  }}
                />
              </div>

              {!isLocked && (
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    type="submit"
                    disabled={savingSettings}
                    style={{
                      flex: 1,
                      background: "#f97316",
                      border: "none",
                      borderRadius: 12,
                      padding: "10px",
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 800,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6
                    }}
                  >
                    <Save size={13} /> {savingSettings ? "Saving..." : "Save Settings"}
                  </button>
                  <button
                    type="button"
                    onClick={handleLockAndDiscard}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 12,
                      padding: "10px 16px",
                      color: "#a3a3a3",
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* WEB TRAFFIC & ANALYTICS CARD */}
          <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 24, padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Activity size={18} color="#f97316" />
              <h3 style={{ fontSize: 14, fontWeight: 800, color: "#fff", textTransform: "uppercase" }}>Web Traffic &amp; Analytics</h3>
            </div>

            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 16, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#fff" }}>Google Analytics 4</span>
                <span style={{ fontSize: 9, fontWeight: 800, background: "rgba(74,222,128,0.1)", color: "#4ade80", padding: "2px 8px", borderRadius: 100, border: "1px solid rgba(74,222,128,0.2)" }}>
                  Active
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 6 }}>
                <span style={{ color: "#737373" }}>Measurement ID:</span>
                <span style={{ color: "#fff", fontFamily: "monospace", fontWeight: 700 }}>G-6TGTYN8XX4</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10 }}>
                <span style={{ color: "#737373" }}>Tracking Status:</span>
                <span style={{ color: "#4ade80", fontWeight: 700 }}>Active &amp; Recording</span>
              </div>
              <p style={{ fontSize: 10, color: "#737373", margin: "12px 0 12px 0", lineHeight: 1.4 }}>
                Use the Google Analytics console to track real-time active users, bounce rates, traffic acquisition channels, and conversion events.
              </p>
              <div style={{ textAlign: "right" }}>
                <a 
                  href="https://analytics.google.com/" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ fontSize: 9, color: "#f97316", fontWeight: 700, textDecoration: "none" }}
                  onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                  onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
                >
                  Open Google Analytics Console ↗
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
