"use client";

import React from "react";
import Link from "next/link";
import { 
  AlertCircle, Loader2, CheckCircle, Save, EyeOff, Settings, 
  ToggleRight, ExternalLink 
} from "lucide-react";
import { THEMES, ALL_SECTIONS } from "@/lib/experimentConfig";
import { saveActiveTheme } from "@/lib/experimentService";

export default function CmsTab({
  activeTheme,
  setActiveTheme,
  liveTheme,
  setLiveTheme,
  activeSections,
  setActiveSections,
  liveSections,
  setLiveSections,
  themeSaving,
  setThemeSaving,
  themeSaved,
  setThemeSaved,
  configExpandedTheme,
  setConfigExpandedTheme,
  isMobile
}) {
  return (
    <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div className="cms-header" style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "flex-end", justifyContent: "space-between", gap: 16 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 6 }}>System · Pages</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, color: "#fff" }}>Site Layout</h1>
          <p style={{ fontSize: 13, color: "#525252", marginTop: 8 }}>Control which theme is live on the <strong style={{ color: "#a3a3a3" }}>/get-started</strong> landing page.</p>
        </div>
        <button
          onClick={async () => {
            setThemeSaving(true);
            const ok = await saveActiveTheme(activeTheme, activeSections);
            if (ok) {
              setLiveTheme(activeTheme);
              setLiveSections(activeSections);
              setThemeSaved(true);
              setTimeout(() => {
                setThemeSaved(false);
                setThemeSaving(false);
              }, 2000);
            } else {
              setThemeSaving(false);
              alert("Failed to publish theme. Check console.");
            }
          }}
          disabled={themeSaving || (activeTheme === liveTheme && JSON.stringify(activeSections) === JSON.stringify(liveSections))}
          style={{
            display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, border: "none", cursor: (themeSaving || (activeTheme === liveTheme && JSON.stringify(activeSections) === JSON.stringify(liveSections))) ? "not-allowed" : "pointer",
            fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", transition: "all 0.3s",
            background: themeSaved ? "rgba(74,222,128,0.15)" : (activeTheme === liveTheme && JSON.stringify(activeSections) === JSON.stringify(liveSections)) ? "rgba(255,255,255,0.04)" : "#f97316",
            color: themeSaved ? "#4ade80" : (activeTheme === liveTheme && JSON.stringify(activeSections) === JSON.stringify(liveSections)) ? "#525252" : "#fff",
            width: isMobile ? "100%" : "auto", justifyContent: isMobile ? "center" : "flex-start"
          }}
        >
          {themeSaving ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : themeSaved ? <CheckCircle size={13} /> : <Save size={13} />}
          {themeSaving ? "Publishing..." : themeSaved ? "Live!" : "Publish Live"}
        </button>
      </div>

      {(activeTheme !== liveTheme || JSON.stringify(activeSections) !== JSON.stringify(liveSections)) && !themeSaved && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 12, padding: "10px 16px" }}>
          <AlertCircle size={14} color="#f97316" flexShrink={0} />
          <span style={{ fontSize: 11, fontWeight: 600, color: "#f97316" }}>Unsaved changes detected. Click "Publish Live" to update the website.</span>
        </div>
      )}

      {/* Theme Cards */}
      <div className="cms-themes-grid" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, alignItems: "flex-start" }}>
        {Object.entries(THEMES).map(([key, theme]) => {
          const isSelected = activeTheme === key;
          const isLive = liveTheme === key;
          return (
            <div
              key={key}
              onClick={() => {
                setActiveTheme(key);
                setActiveSections(isLive ? liveSections : theme.defaultSections);
                setThemeSaved(false);
              }}
              style={{
                textAlign: "left", padding: isMobile ? 24 : 32, borderRadius: isMobile ? 20 : 28, border: `2px solid ${isSelected ? "rgba(249,115,22,0.5)" : "rgba(255,255,255,0.05)"}`,
                background: isSelected ? "rgba(249,115,22,0.1)" : "#0d0d0d", cursor: "pointer", position: "relative", overflow: "hidden",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: isSelected ? "0 20px 50px rgba(249,115,22,0.15)" : "none",
                transform: isSelected && !isMobile ? "translateY(-4px)" : "none"
              }}
            >
              {isLive && (
                <div style={{ position: "absolute", top: isMobile ? 16 : 24, right: isMobile ? 16 : 24, display: "flex", alignItems: "center", gap: 6, background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 100, padding: "5px 12px" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
                  <span style={{ fontSize: 8, fontWeight: 900, color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.2em" }}>Active Live</span>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, paddingRight: isLive && isMobile ? 90 : 0 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${isSelected ? "#f97316" : "#333"}`, background: isSelected ? "#f97316" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", flexShrink: 0 }}>
                  {isSelected && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fff" }} />}
                </div>
                <span style={{ fontSize: isMobile ? 16 : 18, fontWeight: 900, color: isSelected ? "#fff" : "#a3a3a3", textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 1.2 }}>{theme.name}</span>
              </div>

              <p style={{ fontSize: 13, color: isSelected ? "#d4d4d4" : "#525252", lineHeight: 1.6, fontWeight: 400, marginBottom: 24 }}>
                {theme.description}
              </p>

              <div style={{ marginBottom: 16 }}>
                 <button
                   onClick={(e) => {
                     e.stopPropagation();
                     setConfigExpandedTheme(configExpandedTheme === key ? null : key);
                   }}
                   style={{
                     display: "flex", alignItems: "center", gap: 8, background: isSelected ? "rgba(249,115,22,0.1)" : "rgba(255,255,255,0.03)",
                     border: `1px solid ${isSelected ? "rgba(249,115,22,0.2)" : "rgba(255,255,255,0.05)"}`,
                     padding: "10px 16px", borderRadius: 12, color: isSelected ? "#f97316" : "#737373", fontSize: 11, fontWeight: 700, cursor: "pointer",
                     transition: "all 0.2s", width: "100%", justifyContent: "center"
                   }}
                 >
                   {configExpandedTheme === key ? <EyeOff size={14} /> : <Settings size={14} />}
                   {configExpandedTheme === key ? "Hide Section Controls" : "Configure Section Layout"}
                 </button>
              </div>

              {configExpandedTheme === key && (
                <div style={{ marginBottom: 24, padding: "20px", background: "rgba(255,255,255,0.02)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.03)", animation: "fadeIn 0.3s ease-out" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <p style={{ fontSize: 9, fontWeight: 800, color: isSelected ? "#f97316" : "#333", textTransform: "uppercase", letterSpacing: "0.25em" }}>Section Toggle Controls</p>
                  {isSelected && (activeTheme !== liveTheme || JSON.stringify(activeSections) !== JSON.stringify(liveSections)) && (
                     <button
                       onClick={async (e) => {
                         e.stopPropagation();
                         setThemeSaving(true);
                         const ok = await saveActiveTheme(activeTheme, activeSections);
                         if (ok) {
                           setLiveTheme(activeTheme);
                           setLiveSections(activeSections);
                           setThemeSaved(true);
                           setTimeout(() => { setThemeSaved(false); setThemeSaving(false); }, 2000);
                         } else {
                           setThemeSaving(false);
                         }
                       }}
                       style={{
                         background: "#f97316", color: "#fff", border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 8, fontWeight: 800, cursor: "pointer", textTransform: "uppercase"
                       }}
                     >
                       Apply Changes
                     </button>
                  )}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px" }}>
                  {ALL_SECTIONS.map((section) => {
                    const sectionValue = activeSections[section.id];
                    const isSectionActive = sectionValue !== false;

                    return (
                      <div key={section.id} style={{ opacity: isSelected ? 1 : 0.4, transition: "opacity 0.3s" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: section.variants && isSectionActive ? 6 : 0 }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isSelected) {
                                setActiveTheme(key);
                                setActiveSections(isLive ? liveSections : theme.defaultSections);
                                const base = isLive ? liveSections : theme.defaultSections;
                                setActiveSections({ ...base, [section.id]: !base[section.id] });
                              } else {
                                if (section.variants && !isSectionActive) {
                                  setActiveSections(prev => ({ ...prev, [section.id]: section.variants[0].id }));
                                } else {
                                  setActiveSections(prev => ({ ...prev, [section.id]: !isSectionActive }));
                                }
                              }
                              setThemeSaved(false);
                            }}
                            style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                          >
                            <div style={{
                              width: 24, height: 12, borderRadius: 100, position: "relative",
                              background: isSectionActive ? "#f97316" : "#222",
                              transition: "all 0.3s"
                            }}>
                              <div style={{
                                width: 8, height: 8, borderRadius: "50%", background: "#fff",
                                position: "absolute", top: 2,
                                left: isSectionActive ? 14 : 2,
                                transition: "all 0.3s"
                              }} />
                            </div>
                            <span style={{ fontSize: 10, fontWeight: 600, color: isSectionActive ? "#a3a3a3" : "#333" }}>{section.label}</span>
                          </button>
                        </div>

                        {section.variants && isSectionActive && (
                          <select
                            onClick={(e) => e.stopPropagation()}
                            value={typeof sectionValue === "string" ? sectionValue : section.variants[0].id}
                            onChange={(e) => {
                              if (!isSelected) return;
                              setActiveSections(prev => ({ ...prev, [section.id]: e.target.value }));
                              setThemeSaved(false);
                            }}
                            disabled={!isSelected}
                            style={{
                              width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                              borderRadius: 6, padding: "4px 8px", color: "#a3a3a3", fontSize: 9, fontWeight: 600, outline: "none",
                              cursor: isSelected ? "pointer" : "default"
                            }}
                          >
                            {section.variants.map(v => (
                              <option key={v.id} value={v.id} style={{ background: "#111", color: "#fff" }}>{v.label}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              )}

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 16 }}>
                <p style={{ fontSize: 9, color: "#262626", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.15em" }}>Target File: {theme.file}</p>
                <div style={{ fontSize: 8, fontWeight: 800, color: isSelected ? "#f97316" : "#333", background: isSelected ? "rgba(249,115,22,0.1)" : "rgba(255,255,255,0.02)", padding: "4px 8px", borderRadius: 4, textTransform: "uppercase" }}>
                  ID: {key}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview Link */}
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "stretch" : "center", justifyContent: "space-between", gap: 16, padding: "16px 20px", background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ToggleRight size={16} color="#f97316" />
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 2 }}>Preview Page</p>
            <p style={{ fontSize: 10, color: "#525252", fontFamily: "monospace" }}>Open /get-started to see the active layout</p>
          </div>
        </div>
        <Link href="/get-started" target="_blank" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px 16px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", textDecoration: "none", transition: "all 0.2s" }}>
          Open Page <ExternalLink size={12} />
        </Link>
      </div>
    </div>
  );
}
