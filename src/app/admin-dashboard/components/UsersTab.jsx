"use client";

import React, { useMemo, useState } from "react";
import { Search, Trash2, ShieldAlert, Shield, Phone, Mail, UserCheck, DollarSign, Calendar, FileText } from "lucide-react";

const fmt = d => d?.toDate ? d.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

export default function UsersTab({
  users,
  leads,
  clients = [],
  userSearch,
  setUserSearch,
  handleDeleteUser,
  handleDeleteLead,
  currentUserId
}) {
  const [typeFilter, setTypeFilter] = useState("all"); // "all", "auth_user", "form_lead"
  const [activeSegment, setActiveSegment] = useState("users"); // "users" | "clients"

  // 1. Combine users and form leads into a unified identities array
  const combinedIdentities = useMemo(() => {
    const registered = (users || []).map(u => ({
      id: u.id,
      email: u.email,
      name: u.displayName || u.fullName || "Anonymous User",
      role: u.role?.trim() || "user",
      createdAt: u.createdAt,
      type: "auth_user",
      isRegistered: true
    }));

    const formLeads = (leads || []).map(l => ({
      id: l.id,
      email: l.email,
      name: l.fullName || "Anonymous Lead",
      role: null,
      createdAt: l.createdAt,
      type: "form_lead",
      isRegistered: false
    }));

    const authEmails = new Set(registered.map(u => u.email?.toLowerCase()).filter(Boolean));
    const uniqueFormLeads = formLeads.filter(l => !authEmails.has(l.email?.toLowerCase()));

    return [...registered, ...uniqueFormLeads];
  }, [users, leads]);

  // 2. Filter identities based on search and type selection
  const filteredIdentities = useMemo(() => {
    let res = combinedIdentities;
    if (userSearch.trim()) {
      const q = userSearch.toLowerCase();
      res = res.filter(u => 
        u.name?.toLowerCase().includes(q) || 
        u.email?.toLowerCase().includes(q)
      );
    }
    if (typeFilter !== "all") {
      res = res.filter(u => u.type === typeFilter);
    }
    return [...res].sort((a, b) => {
      const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
      const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
      return bTime - aTime;
    });
  }, [combinedIdentities, userSearch, typeFilter]);

  // 3. Filter clients based on search
  const filteredClients = useMemo(() => {
    let res = clients || [];
    if (userSearch.trim()) {
      const q = userSearch.toLowerCase();
      res = res.filter(c => 
        c.name?.toLowerCase().includes(q) || 
        c.email?.toLowerCase().includes(q) ||
        c.servicesPurchased?.toLowerCase().includes(q) ||
        c.accountManager?.toLowerCase().includes(q)
      );
    }
    return [...res].sort((a, b) => {
      const aTime = a.startDate?.toDate ? a.startDate.toDate().getTime() : 0;
      const bTime = b.startDate?.toDate ? b.startDate.toDate().getTime() : 0;
      return bTime - aTime;
    });
  }, [clients, userSearch]);

  return (
    <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header & Search */}
      <div className="users-header" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 6 }}>IAM · Directory</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, color: "#fff" }}>
            {activeSegment === "users" ? "User Directory" : "Active Client Accounts"}
          </h1>
        </div>
        <div className="users-search" style={{ display: "flex", alignItems: "center", gap: 10, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "8px 14px" }}>
          <Search size={13} color="#525252" />
          <input 
            type="text" 
            placeholder={activeSegment === "users" ? "Search directory…" : "Search clients…"} 
            value={userSearch} 
            onChange={e => setUserSearch(e.target.value)}
            style={{ background: "none", border: "none", color: "#fff", fontSize: 12, fontWeight: 500, width: 200, outline: "none" }} 
          />
        </div>
      </div>

      {/* Segment Selector Toggle */}
      <div style={{ display: "flex", gap: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 3, width: "fit-content" }}>
        <button
          onClick={() => { setActiveSegment("users"); setUserSearch(""); }}
          style={{ padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em",
            background: activeSegment === "users" ? "#f97316" : "transparent",
            color: activeSegment === "users" ? "#fff" : "#525252",
            transition: "all 0.2s"
          }}
        >
          Users & Leads ({combinedIdentities.length})
        </button>
        <button
          onClick={() => { setActiveSegment("clients"); setUserSearch(""); }}
          style={{ padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em",
            background: activeSegment === "clients" ? "#22c55e" : "transparent",
            color: activeSegment === "clients" ? "#fff" : "#525252",
            transition: "all 0.2s"
          }}
        >
          Active Clients ({clients.length})
        </button>
      </div>

      {activeSegment === "users" ? (
        <>
          {/* Filter Tabs */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: 12 }}>
            <button
              onClick={() => setTypeFilter("all")}
              style={{
                padding: "8px 16px", borderRadius: 10, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", border: "1px solid", cursor: "pointer",
                background: typeFilter === "all" ? "rgba(255,255,255,0.08)" : "transparent",
                color: typeFilter === "all" ? "#fff" : "#525252",
                borderColor: typeFilter === "all" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.04)",
                transition: "all 0.15s"
              }}
            >
              All ({combinedIdentities.length})
            </button>
            <button
              onClick={() => setTypeFilter("auth_user")}
              style={{
                padding: "8px 16px", borderRadius: 10, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", border: "1px solid", cursor: "pointer",
                background: typeFilter === "auth_user" ? "rgba(59,130,246,0.1)" : "transparent",
                color: typeFilter === "auth_user" ? "#3b82f6" : "#525252",
                borderColor: typeFilter === "auth_user" ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.04)",
                transition: "all 0.15s"
              }}
            >
              Auth Users ({combinedIdentities.filter(u => u.type === "auth_user").length})
            </button>
            <button
              onClick={() => setTypeFilter("form_lead")}
              style={{
                padding: "8px 16px", borderRadius: 10, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", border: "1px solid", cursor: "pointer",
                background: typeFilter === "form_lead" ? "rgba(249,115,22,0.08)" : "transparent",
                color: typeFilter === "form_lead" ? "#f97316" : "#525252",
                borderColor: typeFilter === "form_lead" ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.04)",
                transition: "all 0.15s"
              }}
            >
              Form Leads ({combinedIdentities.filter(u => u.type === "form_lead").length})
            </button>
          </div>

          {/* Directory Table */}
          <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, overflow: "hidden" }}>
            {/* Table head */}
            <div className="users-table-head" style={{ display: "grid", gridTemplateColumns: "1fr 140px 130px 80px", padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 9, fontWeight: 700, color: "#333", textTransform: "uppercase", letterSpacing: "0.25em" }}>
              <span>Identity</span><span>Role / Access</span><span>Date Created</span><span style={{ textAlign: "right" }}>Action</span>
            </div>
            {/* Rows */}
            {filteredIdentities.map((u, i) => (
              <div key={u.id}
                className="users-row"
                style={{ display: "grid", gridTemplateColumns: "1fr 140px 130px 80px", padding: "14px 24px", borderBottom: i < filteredIdentities.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none", alignItems: "center", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                onMouseLeave={e => e.currentTarget.style.background = "none"}
              >
                {/* Identity */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: u.type === "auth_user" 
                      ? (u.role === "admin" ? "rgba(249,115,22,0.12)" : "rgba(59,130,246,0.12)") 
                      : "rgba(255,255,255,0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 900,
                    color: u.type === "auth_user" 
                      ? (u.role === "admin" ? "#f97316" : "#3b82f6") 
                      : "#525252",
                    flexShrink: 0
                  }}>
                    {(u.name || "U")[0]}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{u.name}</span>
                      {u.type === "auth_user" ? (
                        <span style={{ fontSize: 8, fontWeight: 700, color: "#3b82f6", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: 6, padding: "1px 5px" }}>
                          Auth User
                        </span>
                      ) : (
                        <span style={{ fontSize: 8, fontWeight: 700, color: "#f97316", background: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.1)", borderRadius: 6, padding: "1px 5px" }}>
                          Form Lead
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 11, color: "#525252", marginTop: 2, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{u.email}</div>
                  </div>
                </div>
                {/* Role / Access */}
                <div className="users-role-cell">
                  {u.type === "auth_user" ? (
                    <span
                      style={{
                        background: u.role === "admin" ? "rgba(249,115,22,0.1)" : "rgba(59,130,246,0.1)",
                        border: `1px solid ${u.role === "admin" ? "rgba(249,115,22,0.25)" : "rgba(59,130,246,0.2)"}`,
                        color: u.role === "admin" ? "#f97316" : "#3b82f6",
                        fontSize: 9,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        borderRadius: 8,
                        padding: "4px 8px",
                        display: "inline-block",
                        textAlign: "center",
                        minWidth: 80
                      }}
                    >
                      {u.role}
                    </span>
                  ) : (
                    <span style={{ fontSize: 10, color: "#3f3f46", fontStyle: "italic", display: "flex", alignItems: "center", gap: 4 }}>
                      Guest Account
                    </span>
                  )}
                </div>
                {/* Joined */}
                <div className="users-date-cell" style={{ fontSize: 11, color: "#404040", fontFamily: "monospace" }}>{fmt(u.createdAt)}</div>
                {/* Delete */}
                <div style={{ textAlign: "right" }}>
                  {u.id === currentUserId ? (
                    <span style={{ fontSize: 8, fontWeight: 700, color: "#525252", background: "rgba(255,255,255,0.04)", padding: "4px 8px", borderRadius: 6, textTransform: "uppercase" }}>You</span>
                  ) : u.role === "admin" ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4 }} title="Demote from Team panel first">
                      <Shield size={13} color="#f97316" />
                      <span style={{ fontSize: 8, fontWeight: 700, color: "#525252", textTransform: "uppercase" }}>Protected</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        if (u.type === "auth_user") {
                          handleDeleteUser(u.id);
                        } else {
                          handleDeleteLead(u.id);
                        }
                      }}
                      style={{ width: 32, height: 32, borderRadius: 8, background: "transparent", border: "1px solid transparent", color: "#333", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.2)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#333"; e.currentTarget.style.borderColor = "transparent"; }}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {filteredIdentities.length === 0 && (
              <div style={{ padding: "48px 24px", textAlign: "center", color: "#333" }}>
                <p style={{ fontSize: 12 }}>No directory entries match search or filter settings.</p>
              </div>
            )}
          </div>
        </>
      ) : (
        /* ACTIVE CLIENTS VIEW */
        <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, overflow: "hidden" }}>
          {/* Table head */}
          <div className="users-table-head" style={{ display: "grid", gridTemplateColumns: "1.2fr 130px 140px 140px 110px 120px", padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 9, fontWeight: 700, color: "#333", textTransform: "uppercase", letterSpacing: "0.25em" }}>
            <span>Client Info</span>
            <span>WhatsApp</span>
            <span>Services Purchased</span>
            <span>Account Manager</span>
            <span>Retainer</span>
            <span>Start Date</span>
          </div>

          {filteredClients.map((client, i) => (
            <div key={client.id}
              style={{ display: "grid", gridTemplateColumns: "1.2fr 130px 140px 140px 110px 120px", padding: "16px 24px", borderBottom: i < filteredClients.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none", alignItems: "center", transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.01)"}
              onMouseLeave={e => e.currentTarget.style.background = "none"}
            >
              {/* Client Info */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: "#22c55e", flexShrink: 0 }}>
                  <UserCheck size={16} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{client.name}</div>
                  <div style={{ fontSize: 11, color: "#525252", marginTop: 2, display: "flex", alignItems: "center", gap: 4, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                    <Mail size={10} /> {client.email}
                  </div>
                </div>
              </div>

              {/* WhatsApp Phone */}
              <div style={{ fontSize: 11, color: "#a3a3a3", display: "flex", alignItems: "center", gap: 6 }}>
                {client.phone && client.phone !== "N/A" ? (
                  <a href={`https://wa.me/${client.phone.replace(/\D/g,"")}`} target="_blank" rel="noreferrer" style={{ color: "#4ade80", textDecoration: "none", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                    <Phone size={11} /> {client.phone}
                  </a>
                ) : (
                  <span style={{ color: "#3f3f46" }}>—</span>
                )}
              </div>

              {/* Services Purchased */}
              <div style={{ minWidth: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: "#f97316", textTransform: "uppercase", background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.15)", borderRadius: 6, padding: "3px 8px", display: "inline-block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: "100%" }} title={client.servicesPurchased}>
                  {client.servicesPurchased}
                </span>
              </div>

              {/* Account Manager */}
              <div style={{ fontSize: 11, color: "#fff", fontWeight: 600 }}>
                {client.accountManager || "Unassigned"}
              </div>

              {/* Monthly Retainer */}
              <div style={{ fontSize: 12, color: "#22c55e", fontWeight: 800, display: "flex", alignItems: "center" }}>
                <DollarSign size={12} style={{ marginRight: 1 }} />
                {(Number(client.monthlyRetainer) || 0).toLocaleString()}/mo
              </div>

              {/* Start Date */}
              <div style={{ fontSize: 11, color: "#404040", fontFamily: "monospace", display: "flex", alignItems: "center", gap: 4 }}>
                <Calendar size={11} />
                {fmt(client.startDate)}
              </div>
            </div>
          ))}

          {filteredClients.length === 0 && (
            <div style={{ padding: "48px 24px", textAlign: "center", color: "#333" }}>
              <p style={{ fontSize: 12 }}>{userSearch ? "No active clients match search settings." : "No leads converted to active clients yet."}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
