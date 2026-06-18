"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, isDestructive = false }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.7)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: 20
    }} onClick={onCancel}>
      <div style={{
        background: "#0d0d0d",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 24,
        width: "100%",
        maxWidth: 400,
        overflow: "hidden",
        boxShadow: "0 24px 50px rgba(0,0,0,0.5)",
        animation: "confirmFadeIn 0.2s ease"
      }} onClick={e => e.stopPropagation()}>
        <style>{`
          @keyframes confirmFadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <AlertTriangle size={16} color={isDestructive ? "#ef4444" : "#f97316"} />
            <span style={{ fontSize: 13, fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", textTransform: "uppercase" }}>{title}</span>
          </div>
          <button onClick={onCancel} style={{ background: "none", border: "none", color: "#525252", cursor: "pointer", padding: 4 }}>
            <X size={16} />
          </button>
        </div>

        {/* Message body */}
        <div style={{ padding: "20px 24px", fontSize: 13, color: "#a3a3a3", lineHeight: 1.5 }}>
          {message}
        </div>

        {/* Footer Actions */}
        <div style={{ padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "flex-end", gap: 10, background: "rgba(0,0,0,0.2)" }}>
          <button
            onClick={onCancel}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
              padding: "7px 14px",
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
            onClick={onConfirm}
            style={{
              background: isDestructive
                ? "linear-gradient(135deg, #ef4444, #dc2626)"
                : "linear-gradient(135deg, #f97316, #ea580c)",
              border: "none",
              borderRadius: 10,
              padding: "7px 16px",
              color: "#fff",
              fontSize: 11,
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: `0 4px 15px ${isDestructive ? "rgba(239,68,68,0.2)" : "rgba(249,115,22,0.2)"}`,
              transition: "all 0.15s"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
