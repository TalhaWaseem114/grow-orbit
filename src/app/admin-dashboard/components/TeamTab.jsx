"use client";

import React from "react";
import { Shield, Mail, Clock } from "lucide-react";

const fmt = d => d?.toDate ? d.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

export default function TeamTab({ users }) {
  const admins = users.filter(u => u.role?.trim() === "admin");

  return (
    <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 6 }}>System · Staff</div>
        <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, color: "#fff" }}>Agency Team</h1>
        <p style={{ fontSize: 13, color: "#525252", marginTop: 8 }}>Users with full administrative access to the Orbit Command Center.</p>
      </div>

      <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {admins.map(u => (
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
        {admins.length === 0 && (
          <div style={{ padding: "48px 24px", textAlign: "center", color: "#333", fontSize: 12 }}>
            No admin users found.
          </div>
        )}
      </div>
    </div>
  );
}
