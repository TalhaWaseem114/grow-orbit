"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Save, ChevronRight, ArrowLeft,
  CheckCircle2, Loader2, Layout, ToggleRight,
} from "lucide-react";
import { THEMES, DEFAULT_THEME } from "@/lib/experimentConfig";
import Image from "next/image";
import { fetchExperimentConfig, saveActiveTheme } from "@/lib/experimentService";

export default function ExperimentsPage() {
  const [activeTheme, setActiveTheme] = useState(DEFAULT_THEME);
  const [liveTheme, setLiveTheme] = useState(DEFAULT_THEME);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const { layoutId } = await fetchExperimentConfig();
      setActiveTheme(layoutId);
      setLiveTheme(layoutId);
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const success = await saveActiveTheme(activeTheme);
    setSaving(false);
    if (success) {
      setSaved(true);
      setLiveTheme(activeTheme);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const hasChanges = activeTheme !== liveTheme;

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex items-center gap-4 text-zinc-400">
          <Loader2 size={24} className="animate-spin text-orange-500" />
          <span className="text-sm font-mono uppercase tracking-widest">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-zinc-950 text-white selection:bg-orange-500 selection:text-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >

      {/* Header */}
      <header className="border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/get-started" className="text-zinc-500 hover:text-white transition-colors no-underline">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <div className="relative w-7 h-7">
                  <Image
                    src="/logo.png"
                    alt="Grow Orbit Logo"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-sm font-black uppercase tracking-[0.2em] leading-none">Site Layout Control</h1>
                  <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mt-1">
                    /get-started page · Themes
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {hasChanges && (
              <span className="text-[9px] font-mono text-orange-400 uppercase tracking-widest animate-pulse">
                Unsaved
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all duration-300 ${
                saved
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : hasChanges
                  ? "bg-orange-500 text-white hover:bg-orange-400 shadow-lg shadow-orange-500/20"
                  : "bg-white/5 text-zinc-600 cursor-not-allowed border border-white/5"
              }`}
            >
              {saving ? (
                <Loader2 size={12} className="animate-spin" />
              ) : saved ? (
                <CheckCircle2 size={12} />
              ) : (
                <Save size={12} />
              )}
              {saving ? "Saving..." : saved ? "Live!" : "Publish Live"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Theme Cards */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Layout size={14} className="text-orange-500" />
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">Choose Theme</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(THEMES).map(([key, theme]) => {
              const isSelected = activeTheme === key;
              const isLive = liveTheme === key;
              const isExperimental = key === "theme-3";

              return (
                <button
                  key={key}
                  onClick={() => { setActiveTheme(key); setSaved(false); }}
                  className={`group text-left p-7 rounded-[28px] border-2 transition-all duration-500 relative overflow-hidden flex flex-col h-full ${
                    isSelected
                      ? "bg-orange-500/10 border-orange-500/50 shadow-2xl shadow-orange-500/10"
                      : "bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]"
                  }`}
                >
                  {/* Live Badge */}
                  {isLive && (
                    <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-emerald-400">Live Now</span>
                    </div>
                  )}

                  {/* Experimental Badge */}
                  {isExperimental && !isLive && (
                    <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30">
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-orange-400">Experiment</span>
                    </div>
                  )}

                  {/* Selected Radio */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                      isSelected ? "border-orange-500 bg-orange-500" : "border-zinc-700"
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className={`text-sm lg:text-lg font-black uppercase tracking-tight ${
                      isSelected ? "text-orange-400" : "text-white"
                    }`}>
                      {theme.name}
                    </span>
                  </div>

                  <p className="text-[12px] text-zinc-500 leading-relaxed font-light ml-9 flex-grow">
                    {theme.description}
                  </p>

                  <p className="ml-9 mt-4 text-[9px] font-mono text-zinc-700 uppercase tracking-widest">
                    File: {theme.file}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preview Link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white/[0.02] rounded-2xl border border-white/5">
          <div className="flex items-center gap-4">
            <ToggleRight size={16} className="text-orange-500" />
            <div>
              <p className="text-xs font-bold text-white">Preview Changes</p>
              <p className="text-[10px] text-zinc-600 font-mono">Open the landing page to see your selected theme live</p>
            </div>
          </div>
          <Link
            href="/get-started"
            target="_blank"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all no-underline"
          >
            Open Page <ChevronRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
