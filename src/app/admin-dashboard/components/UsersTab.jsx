"use client";

import React, { useMemo } from "react";
import { Search, Trash2 } from "lucide-react";

const fmt = d => d?.toDate ? d.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

export default function UsersTab({
  users,
  userSearch,
  setUserSearch,
  handleRoleChange,
  handleDeleteUser
}) {
  const filteredUsers = useMemo(() => {
    let res = users;
    if (userSearch.trim()) {
      const q = userSearch.toLowerCase();
      res = res.filter(u => 
        u.displayName?.toLowerCase().includes(q) || 
        u.fullName?.toLowerCase().includes(q) || 
        u.email?.toLowerCase().includes(q)
      );
    }
    return res;
  }, [users, userSearch]);

  return (
    <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="users-header" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 6 }}>IAM · Accounts</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, color: "#fff" }}>User Directory</h1>
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
  );
}
