"use client";

import React, { useMemo, useState } from "react";
import { Shield, Mail, Clock, Plus, Search, X, UserMinus } from "lucide-react";

const fmt = d => {
  if (!d) return "—";
  if (d.toDate && typeof d.toDate === "function") {
    return d.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
  if (typeof d === "object" && typeof d.seconds === "number") {
    return new Date(d.seconds * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
  const dateObj = new Date(d);
  if (!isNaN(dateObj.getTime())) {
    return dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
  return "—";
};

const PANELS_LIST = [
  { id: "overview", label: "Overview Tab" },
  { id: "leads", label: "Lead Pipeline" },
  { id: "users", label: "User Directory" },
  { id: "team", label: "Agency Team" },
  { id: "invoices", label: "Invoices & Contracts" },
  { id: "blog", label: "Blog Manager" },
  { id: "newsletter", label: "Newsletter Manager" },
  { id: "settings", label: "Settings Tab" }
];

export default function TeamTab({ users, handleRoleChange, currentUserId, triggerConfirm, logActivity }) {
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [showEditAccessModal, setShowEditAccessModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPanels, setSelectedPanels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const currentUser = useMemo(() => users.find(usr => usr.id === currentUserId), [users, currentUserId]);
  const currentUserEmail = currentUser?.email?.toLowerCase() || "";
  const isPrimaryOwner = currentUserEmail === "alisps2025@gmail.com" || currentUserEmail === "talhawaseem114@gmail.com";

  const admins = useMemo(() => {
    const rawAdmins = users.filter(u => u.role?.trim() === "admin");
    return [...rawAdmins].sort((a, b) => {
      const aAllowed = Array.isArray(a.allowedPanels) && a.allowedPanels.length > 0 
        ? a.allowedPanels 
        : PANELS_LIST.map(p => p.id);
      const bAllowed = Array.isArray(b.allowedPanels) && b.allowedPanels.length > 0 
        ? b.allowedPanels 
        : PANELS_LIST.map(p => p.id);
      
      const aIsSuper = aAllowed.length === PANELS_LIST.length;
      const bIsSuper = bAllowed.length === PANELS_LIST.length;
      
      if (aIsSuper && !bIsSuper) return -1;
      if (!aIsSuper && bIsSuper) return 1;
      
      // Secondary sort: alphabetical by display name / email
      const nameA = (a.displayName || a.fullName || a.email || "").toLowerCase();
      const nameB = (b.displayName || b.fullName || b.email || "").toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }, [users]);
  const nonAdmins = useMemo(() => users.filter(u => u.role?.trim() !== "admin"), [users]);

  const filteredNonAdmins = useMemo(() => {
    let res = nonAdmins;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      res = res.filter(u =>
        u.displayName?.toLowerCase().includes(q) ||
        u.fullName?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q)
      );
    }
    return res;
  }, [nonAdmins, searchQuery]);

  return (
    <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 6 }}>System · Staff</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, color: "#fff", display: "flex", alignItems: "center", gap: 12 }}>
            Agency Team
            <span style={{
              fontSize: 12,
              fontWeight: 800,
              color: "#f97316",
              background: "rgba(249,115,22,0.1)",
              border: "1px solid rgba(249,115,22,0.2)",
              padding: "4px 10px",
              borderRadius: 100
            }}>
              {admins.length} Admins
            </span>
          </h1>
          <p style={{ fontSize: 13, color: "#525252", marginTop: 8 }}>Users with full administrative access to the Orbit Command Center.</p>
        </div>
        <button
          onClick={() => setShowPromoteModal(true)}
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
            gap: 8,
            boxShadow: "0 4px 15px rgba(249,115,22,0.25)",
            transition: "all 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
        >
          <Plus size={14} /> Promote Member
        </button>
      </div>

      <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {admins.map(u => {
          const uAllowed = Array.isArray(u.allowedPanels) && u.allowedPanels.length > 0 
            ? u.allowedPanels 
            : PANELS_LIST.map(p => p.id);

          const isSuper = uAllowed.length === PANELS_LIST.length;
          const targetEmail = u.email?.toLowerCase() || "";
          const isTargetOwner = targetEmail === "alisps2025@gmail.com" || targetEmail === "talhawaseem114@gmail.com";

          return (
            <div key={u.id} style={{
              background: isSuper 
                ? "linear-gradient(145deg, rgba(16, 185, 129, 0.04) 0%, #0d0d0d 100%)" 
                : "#0d0d0d",
              border: isSuper 
                ? "1px solid rgba(74, 222, 128, 0.3)" 
                : "1px solid rgba(249, 115, 22, 0.15)",
              borderRadius: 20,
              padding: "24px",
              position: "relative",
              overflow: "hidden",
              boxShadow: isSuper 
                ? "0 12px 40px rgba(16, 185, 129, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.03)" 
                : "none"
            }}>
              {/* Top Accent Bar */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: isSuper 
                  ? "linear-gradient(90deg, #4ade80, #10b981)" 
                  : "linear-gradient(90deg, #f97316, #ea580c)"
              }} />

              <div style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 80,
                height: 80,
                background: isSuper 
                  ? "radial-gradient(circle at top right, rgba(74, 222, 128, 0.15), transparent 70%)" 
                  : "radial-gradient(circle at top right, rgba(249, 115, 22, 0.1), transparent 70%)"
              }} />
              
              {/* Show Revoke/Configure Access buttons if not the current logged-in user and not a protected target owner, AND (is not a Super Admin OR the logged-in user is a Primary Owner) */}
              {currentUserId !== u.id && !isTargetOwner && (isPrimaryOwner || !isSuper) && (
                <div style={{ position: "absolute", top: 20, right: 20, display: "flex", gap: 6, zIndex: 20 }}>
                  <button
                    onClick={() => {
                      setSelectedUser(u);
                      setSelectedPanels(uAllowed);
                      setShowEditAccessModal(true);
                    }}
                    title="Configure Admin Access"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#525252",
                      cursor: "pointer",
                      padding: 6,
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.15s"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = isSuper ? "rgba(74, 222, 128, 0.1)" : "rgba(249, 115, 22, 0.1)";
                      e.currentTarget.style.color = isSuper ? "#4ade80" : "#f97316";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#525252";
                    }}
                  >
                    <Shield size={14} />
                  </button>
                  <button
                    onClick={() => {
                      triggerConfirm(
                        "Revoke Access",
                        `Are you sure you want to revoke Admin access for "${u.displayName || u.fullName || u.email}"? They will lose all dashboard permissions.`,
                        () => handleRoleChange(u.id, "user", "admin", null, true),
                        true
                      );
                    }}
                    title="Revoke Admin Access"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#333",
                      cursor: "pointer",
                      padding: 6,
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.15s"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; e.currentTarget.style.color = "#ef4444"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#333"; }}
                  >
                    <UserMinus size={14} />
                  </button>
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: isSuper 
                    ? "linear-gradient(135deg, #4ade80, #10b981)" 
                    : "linear-gradient(135deg, #f97316, #ea580c)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: 900,
                  color: "#fff",
                  boxShadow: isSuper 
                    ? "0 8px 20px rgba(16, 185, 129, 0.3)" 
                    : "0 8px 20px rgba(249, 115, 22, 0.3)"
                }}>
                  {(u.displayName || u.fullName || "A")[0]}
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
                    {u.displayName || u.fullName || "Admin User"}
                    {currentUserId === u.id && (
                      <span style={{
                        fontSize: 9,
                        fontWeight: 900,
                        background: "rgba(249,115,22,0.2)",
                        color: "#f97316",
                        border: "1px solid rgba(249,115,22,0.3)",
                        borderRadius: 6,
                        padding: "1px 5px",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                      }}>
                        You
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Shield size={12} color={isSuper ? "#4ade80" : "#f97316"} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: isSuper ? "#4ade80" : "#f97316", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                      {isSuper ? "Super Admin" : "Limited Admin"}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Mail size={14} color={isSuper ? "rgba(74, 222, 128, 0.4)" : "#333"} />
                  <span style={{ fontSize: 12, color: "#a3a3a3" }}>{u.email}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Clock size={14} color={isSuper ? "rgba(74, 222, 128, 0.4)" : "#333"} />
                  <span style={{ fontSize: 11, color: "#525252" }}>Granted: {fmt(u.createdAt)}</span>
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.02)", paddingTop: 10 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: "#404040", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Access Permitted:</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {uAllowed.map(id => {
                      const panel = PANELS_LIST.find(p => p.id === id);
                      if (!panel) return null;
                      return (
                        <span key={id} style={{
                          fontSize: 8,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          color: isSuper ? "#4ade80" : "#f97316",
                          background: isSuper ? "rgba(74, 222, 128, 0.08)" : "rgba(249, 115, 22, 0.08)",
                          border: isSuper ? "1px solid rgba(74, 222, 128, 0.15)" : "1px solid rgba(249, 115, 22, 0.15)",
                          borderRadius: 6,
                          padding: "2px 6px"
                        }}>
                          {panel.label.replace(" Tab", "").replace(" Manager", "")}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {admins.length === 0 && (
          <div style={{ padding: "48px 24px", textAlign: "center", color: "#333", fontSize: 12 }}>
            No admin users found.
          </div>
        )}
      </div>

      {/* Promotion Modal Overlay */}
      {showPromoteModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
          padding: 20
        }} onClick={() => setShowPromoteModal(false)}>
          <div style={{
            background: "#0d0d0d",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24,
            width: "100%",
            maxWidth: 480,
            maxHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 24px 50px rgba(0,0,0,0.5)"
          }} onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: "#fff", letterSpacing: "-0.01em" }}>Promote Member</h3>
                <p style={{ fontSize: 11, color: "#525252", marginTop: 4 }}>Select a user to grant admin privileges.</p>
              </div>
              <button onClick={() => setShowPromoteModal(false)} style={{ background: "none", border: "none", color: "#525252", cursor: "pointer", padding: 4 }}>
                <X size={18} />
              </button>
            </div>

            {/* Modal Search Bar */}
            <div style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <Search size={14} color="#525252" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ background: "none", border: "none", color: "#fff", fontSize: 12, fontWeight: 500, width: "100%" }}
              />
            </div>

            {/* Modal Content - List of Users */}
            <div style={{ flex: 1, overflowY: "auto", padding: "12px 24px" }}>
              {filteredNonAdmins.map((u, i) => (
                <div key={u.id} style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: i < filteredNonAdmins.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: "#525252" }}>
                      {(u.displayName || u.fullName || "U")[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{u.displayName || u.fullName || "Anonymous"}</div>
                      <div style={{ fontSize: 11, color: "#525252" }}>{u.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedUser(u);
                      setSelectedPanels(PANELS_LIST.map(p => p.id));
                      setShowEditAccessModal(true);
                      setShowPromoteModal(false);
                      setSearchQuery("");
                    }}
                    style={{
                      background: "rgba(249,115,22,0.1)",
                      border: "1px solid rgba(249,115,22,0.2)",
                      borderRadius: 8,
                      padding: "6px 12px",
                      fontSize: 10,
                      fontWeight: 800,
                      color: "#f97316",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "all 0.15s"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(249,115,22,0.2)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(249,115,22,0.1)"; }}
                  >
                    Promote
                  </button>
                </div>
              ))}
              {filteredNonAdmins.length === 0 && (
                <div style={{ padding: "40px 0", textAlign: "center", color: "#525252", fontSize: 12 }}>
                  {searchQuery ? "No matching users found." : "No non-admin users available to promote."}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Access Configuration Modal */}
      {showEditAccessModal && selectedUser && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: 20
        }} onClick={() => { setShowEditAccessModal(false); setSelectedUser(null); }}>
          <div style={{
            background: "#0d0d0d",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24,
            width: "100%",
            maxWidth: 480,
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 24px 50px rgba(0,0,0,0.5)"
          }} onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: "#fff", letterSpacing: "-0.01em" }}>
                  {selectedUser.role === "admin" ? "Edit Admin Access" : "Promote to Admin"}
                </h3>
                <p style={{ fontSize: 11, color: "#525252", marginTop: 4 }}>
                  Configure panel access permissions for {selectedUser.displayName || selectedUser.fullName || "User"}.
                </p>
              </div>
              <button onClick={() => { setShowEditAccessModal(false); setSelectedUser(null); }} style={{ background: "none", border: "none", color: "#525252", cursor: "pointer", padding: 4 }}>
                <X size={18} />
              </button>
            </div>

            {/* Presets */}
            <div style={{ padding: "16px 24px 0", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: "#404040", textTransform: "uppercase", letterSpacing: "0.08em" }}>Access Templates:</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  { label: "Super Admin", panels: ["overview", "leads", "users", "team", "invoices", "blog", "newsletter", "settings"] },
                  { label: "Sales & Pipeline", panels: ["overview", "leads", "invoices"] },
                  { label: "Content Manager", panels: ["overview", "blog", "newsletter"] },
                  { label: "Finance", panels: ["overview", "invoices"] }
                ].map(preset => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setSelectedPanels(preset.panels)}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 8,
                      padding: "6px 12px",
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.15s"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(249,115,22,0.1)"; e.currentTarget.style.borderColor = "rgba(249,115,22,0.2)"; e.currentTarget.style.color = "#f97316"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#fff"; }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkboxes List */}
            <div style={{ padding: "20px 24px 24px", display: "flex", flexDirection: "column", gap: 12, maxHeight: "45vh", overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <button
                  type="button"
                  onClick={() => setSelectedPanels(PANELS_LIST.map(p => p.id))}
                  style={{ background: "none", border: "none", color: "#f97316", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", cursor: "pointer", padding: 0 }}
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPanels(["overview"])}
                  style={{ background: "none", border: "none", color: "#525252", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", cursor: "pointer", padding: 0 }}
                >
                  Clear Optional
                </button>
              </div>

              {PANELS_LIST.map(p => {
                const checked = selectedPanels.includes(p.id);
                return (
                  <label key={p.id} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    borderRadius: 12,
                    background: checked ? "rgba(249,115,22,0.04)" : "rgba(255,255,255,0.02)",
                    border: `1px solid ${checked ? "rgba(249,115,22,0.2)" : "rgba(255,255,255,0.04)"}`,
                    cursor: "pointer",
                    transition: "all 0.15s"
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: checked ? "#fff" : "#a3a3a3" }}>{p.label}</span>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        if (checked) {
                          if (p.id === "overview") return;
                          setSelectedPanels(selectedPanels.filter(id => id !== p.id));
                        } else {
                          setSelectedPanels([...selectedPanels, p.id]);
                        }
                      }}
                      style={{
                        accentColor: "#f97316",
                        cursor: "pointer",
                        width: 15,
                        height: 15
                      }}
                    />
                  </label>
                );
              })}
            </div>

            {/* Footer Actions */}
            <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "flex-end", gap: 12, background: "rgba(0,0,0,0.2)" }}>
              <button
                onClick={() => { setShowEditAccessModal(false); setSelectedUser(null); }}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 10,
                  padding: "8px 16px",
                  color: "#a3a3a3",
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.15s"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleRoleChange(selectedUser.id, "admin", selectedUser.role || "user", selectedPanels);
                  setShowEditAccessModal(false);
                  setSelectedUser(null);
                }}
                style={{
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                  border: "none",
                  borderRadius: 10,
                  padding: "8px 20px",
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(249,115,22,0.2)",
                  transition: "all 0.15s"
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                {selectedUser.role === "admin" ? "Save Changes" : "Confirm Promotion"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
