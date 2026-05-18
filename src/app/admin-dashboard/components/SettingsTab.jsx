"use client";

import React from "react";
import { Settings } from "lucide-react";

export default function SettingsTab() {
  return (
    <div className="tab-content" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh", gap: 16, color: "#2a2a2a" }}>
      <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Settings size={26} color="#2a2a2a" />
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", marginBottom: 6 }}>Module Restricted</p>
        <p style={{ fontSize: 10, color: "#222", letterSpacing: "0.15em", textTransform: "uppercase" }}>Build in progress · Authorized access only</p>
      </div>
    </div>
  );
}
