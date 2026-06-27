"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, Check, CheckCircle2, ChevronRight,
  Target, Zap, Search, BarChart3, TrendingUp, TrendingDown,
  ShieldCheck, Terminal, Star, Activity, Plus, Minus,
  AlertTriangle, DollarSign, Settings, RefreshCw, Eye,
  LayoutGrid, PenTool, LineChart, Award, Package, MousePointerClick,
} from "lucide-react";
import HeroButton from "@/components/ui/HeroButton";
import PPCEfficiencyCTA from "./components/PPCEfficiencyCTA";

/* ─────────────────────────────────────────────
   SHARED
───────────────────────────────────────────── */
const SectionLabel = ({ children, light = false }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500" />
    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.4em] ${light ? "text-orange-400" : "text-orange-500/80"}`}>
      {children}
    </span>
  </div>
);

/* ═══════════════════════════════════════════════
   01 — HERO
   ═══════════════════════════════════════════════ */
function PPCHero() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick(p => p + 1), 2000);
    return () => clearInterval(t);
  }, []);

  const liveRows = [
    { campaign: "Exact_Brand_Core",   spend: "$28.40",  acos: "8.2%",   status: "text-emerald-400" },
    { campaign: "Phrase_Category_01", spend: "$51.20",  acos: "14.6%",  status: "text-orange-400"  },
    { campaign: "Auto_Discovery",     spend: "$19.80",  acos: "22.1%",  status: "text-zinc-400"    },
    { campaign: "SP_Competitor",      spend: "$34.50",  acos: "11.3%",  status: "text-emerald-400" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#fafafa]">
      <style>{`
        @keyframes scan-ppc {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes bar-grow {
          from { width: 0; }
        }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-linear-to-b from-transparent via-orange-500/[0.03] to-transparent animate-[scan-ppc_10s_linear_infinite]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="ppc-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
            <circle cx="60" cy="60" r="0.5" fill="currentColor" opacity="0.5" />
            <path d="M120 0 L120 120 M0 120 L120 120" stroke="currentColor" strokeWidth="0.2" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#ppc-grid)" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_30%,rgba(249,115,22,0.07),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fafafa] to-[#fafafa]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

          {/* Left */}
          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-10 z-0 pointer-events-none border-l border-t border-zinc-200/50 rounded-tl-[100px] opacity-40">
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-orange-500 rounded-tl-xl -translate-x-px -translate-y-px" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-zinc-200 rounded-full translate-x-1 -translate-y-1" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
                  <div className="w-4 h-px bg-orange-500 self-center" />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
                  Amazon PPC Management
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-[80px] font-black tracking-tighter leading-[0.85] mb-10 text-zinc-900 uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                PPC<br />
                <span className="text-orange-500">Efficiency</span><br />
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light lowercase tracking-tight text-zinc-300">
                  tuning.
                </span>
              </h1>

              <div className="flex gap-6 mb-10">
                <div className="w-[2px] bg-linear-to-b from-orange-500 to-transparent hidden md:block opacity-50" />
                <div>
                  <p className="text-xl md:text-2xl text-zinc-500 font-light leading-relaxed max-w-xl mb-6">
                    Most Amazon sellers overpay for every sale. We engineer your ad campaigns for predictable ACoS, compound organic rank growth, and a return on ad spend that compounds — not bleeds.
                  </p>
                  <div className="flex flex-wrap gap-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>ACoS: Controlled</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 size={10} className="text-orange-500/50" />
                      <span>ROAS: Climbing</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  "Full campaign architecture build & audit",
                  "Bid optimisation & ACoS control",
                  "Negative keyword mining & expansion",
                  "Search term harvesting & rank intent",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={15} className="text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-[14px] font-light leading-snug text-zinc-600">{item}</span>
                  </div>
                ))}
              </div>

            {/* Updated Button Container */}
<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-12">
  <HeroButton
    href="/contact"
    className="w-full sm:w-auto text-center justify-center"
  >
    Cut My Wasted Spend
  </HeroButton>

  <a
    href="#packages"
    className="group flex items-center justify-center sm:justify-start gap-3 text-zinc-400 hover:text-zinc-900 font-bold text-[11px] uppercase tracking-widest px-2 py-4 transition-colors no-underline"
  >
    View Packages
    <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
  </a>
</div>

              <div className="flex flex-wrap items-center gap-3">
                {[
                  { icon: <Target size={11} />,     label: "A10 Algorithm Synced"  },
                  { icon: <DollarSign size={11} />, label: "ACoS Reduction Focus"  },
                  { icon: <ShieldCheck size={11} />,label: "No Wasted Spend"       },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2">
                    <span className="text-orange-500">{b.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{b.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-10 mt-10 pt-10 border-t border-zinc-100">
                {[
                  { label: "Ad Accounts Managed", val: "80+"  },
                  { label: "Avg ACoS Reduction",  val: "-38%"  },
                  { label: "Avg ROAS Lift",        val: "2.4x"  },
                ].map((t, i) => (
                  <div key={i}>
                    <p className="text-xl font-black tracking-tighter text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>{t.val}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: PPC Ad Engine Dashboard */}
          <div className="lg:col-span-5 relative block mt-0 lg:mt-[70px] scale-[0.95] sm:scale-100 origin-top lg:origin-center self-start animate-float">
            <style>{`
              @keyframes gauge-fill { from { stroke-dashoffset: 283; } }
              @keyframes pulse-line { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
              @keyframes bar-rise { from { transform: scaleY(0); } to { transform: scaleY(1); } }
              @keyframes spend-flow { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
              @keyframes metric-pop { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            `}</style>

            {/* Floating card - top right: ROAS */}
            <div className="absolute -top-8 -right-2 lg:-right-4 bg-white rounded-[20px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.08)] z-30 border border-zinc-100" style={{ animation: "metric-pop 0.6s ease-out both" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center text-white shadow-[0_8px_20px_rgba(16,185,129,0.3)]"><TrendingUp size={18} /></div>
                <div>
                  <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">ROAS</p>
                  <p className="text-lg font-black text-zinc-900 tracking-tighter leading-none">12.1x</p>
                </div>
              </div>
            </div>

            {/* Floating card - bottom left: TACoS */}
            <div className="absolute -left-4 lg:-left-10 bottom-[60px] bg-zinc-900 rounded-2xl px-5 py-4 z-30 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
                <div>
                  <p className="text-[7px] font-mono font-bold uppercase tracking-[0.25em] text-zinc-500">TACoS Achieved</p>
                  <p className="text-lg sm:text-xl font-black text-white leading-none tracking-tighter">8.2%</p>
                </div>
              </div>
            </div>

            {/* Floating card - bottom right: ACoS Delta */}
            <div className="absolute -right-2 lg:-right-6 bottom-[-30px] bg-white rounded-2xl px-5 py-3.5 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-zinc-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center"><TrendingDown size={14} className="text-emerald-500" /></div>
                <div>
                  <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">ACoS Cut</p>
                  <p className="text-xs sm:text-sm font-black text-emerald-600 tracking-tight leading-none">-38%</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-950 rounded-[32px] shadow-[0_60px_120px_rgba(0,0,0,0.4)] border border-white/[0.08] overflow-hidden relative">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

              {/* Header */}
              <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.2em]">PPC_Engine_v4</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-mono text-emerald-500/70 uppercase tracking-widest">OPTIMISING</span>
                </div>
              </div>

              <div className="p-6">
                {/* Radial ACoS Gauge + Spend Overview */}
                <div className="flex items-center gap-6 mb-6">
                  {/* Radial Gauge */}
                  <div className="relative w-[120px] h-[120px] shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
                      <circle cx="60" cy="60" r="50" fill="none" stroke="url(#ppc-gauge-grad)" strokeWidth="8" strokeDasharray="314" strokeDashoffset="51" strokeLinecap="round" className="drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]" style={{ animation: "gauge-fill 2s ease-out both" }} />
                      <defs>
                        <linearGradient id="ppc-gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#f97316" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-[22px] font-black text-white leading-none tracking-tighter">8.2<span className="text-emerald-500 text-[14px]">%</span></p>
                      <p className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5">ACoS</p>
                    </div>
                  </div>

                  {/* Key metrics stack */}
                  <div className="flex-1 space-y-2.5">
                    {[
                      { label: "Daily Spend", value: "$133", change: "-12%", positive: true },
                      { label: "Revenue", value: "$1,621", change: "+24%", positive: true },
                      { label: "Impressions", value: "48.2K", change: "+18%", positive: true },
                    ].map((m, i) => (
                      <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/[0.04] last:border-0">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">{m.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-black text-white tracking-tighter">{m.value}</span>
                          <span className={`text-[8px] font-bold ${m.positive ? "text-emerald-400" : "text-red-400"}`}>{m.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 30-Day Performance Bars — animated */}
                <div className="bg-white/[0.03] rounded-2xl border border-white/[0.06] p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-bold">30-Day ACoS Trend</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[7px] font-mono text-emerald-500/80 uppercase tracking-widest">DECLINING</span>
                    </div>
                  </div>
                  <div className="flex items-end gap-[3px] h-14">
                    {[38, 35, 32, 28, 24, 22, 20, 18, 16, 14, 12, 11, 10, 9, 8].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-sm origin-bottom ${i === 14 ? "bg-gradient-to-t from-orange-500 to-amber-400 shadow-[0_0_8px_rgba(249,115,22,0.4)]" : i >= 10 ? "bg-emerald-500/40" : "bg-white/[0.08]"}`}
                        style={{ height: `${(h / 38) * 100}%`, animation: `bar-rise 0.5s ease-out ${i * 0.05}s both` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[7px] font-mono text-zinc-700">38% <span className="text-zinc-600">start</span></span>
                    <span className="text-[7px] font-mono text-orange-500 font-bold">8.2% <span className="text-zinc-600">current</span></span>
                  </div>
                </div>

                {/* Campaign Status Cards */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[7px] font-mono text-zinc-600 uppercase tracking-[0.2em] font-bold">Active Campaigns</p>
                    <p className="text-[7px] font-mono text-zinc-700 uppercase tracking-widest">4 Running</p>
                  </div>
                  {[
                    { name: "Exact_Brand_Core", spend: "$28.40", acos: "4.1%", status: "emerald" },
                    { name: "Phrase_Category_01", spend: "$51.20", acos: "14.6%", status: "orange" },
                    { name: "SP_Competitor_Rank", spend: "$34.50", acos: "11.3%", status: "emerald" },
                    { name: "Auto_Discovery", spend: "$19.80", acos: "22.1%", status: "zinc" },
                  ].map((c, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.05] rounded-xl px-3.5 py-2.5 hover:border-emerald-500/20 transition-colors group">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.status === "emerald" ? "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" : c.status === "orange" ? "bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.6)]" : "bg-zinc-600"}`} style={{ animation: `pulse-line 2s ease-in-out ${i * 0.3}s infinite` }} />
                      <span className="text-[10px] font-mono text-zinc-400 flex-1 truncate group-hover:text-zinc-300 transition-colors">{c.name}</span>
                      <span className="text-[9px] font-mono text-zinc-600">{c.spend}</span>
                      <span className={`text-[9px] font-mono font-bold ${c.status === "emerald" ? "text-emerald-400" : c.status === "orange" ? "text-orange-400" : "text-zinc-500"}`}>{c.acos}</span>
                    </div>
                  ))}
                </div>

                {/* Spend Flow Indicator */}
                <div className="bg-white/[0.02] rounded-xl border border-white/[0.04] p-3 flex items-center gap-3">
                  <div className="flex items-center gap-2 shrink-0">
                    <DollarSign size={12} className="text-orange-500/60" />
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Spend Flow</span>
                  </div>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/[0.04]">
                    <div
                      className="h-full w-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.6), rgba(249,115,22,0.6), transparent)",
                        backgroundSize: "200% 100%",
                        animation: "spend-flow 3s linear infinite"
                      }}
                    />
                  </div>
                  <span className="text-[9px] font-mono font-black text-emerald-400 shrink-0">EFFICIENT</span>
                </div>
              </div>
            </div>

            {/* Background glows */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   02 — METRICS STRIP
   ═══════════════════════════════════════════════ */
function MetricsStrip() {
  const stats = [
    { v: "80+",  l: "Ad Accounts Managed", i: <LayoutGrid size={14} />  },
    { v: "-38%",  l: "Avg ACoS Reduction",  i: <TrendingDown size={14} />},
    { v: "2.4x",  l: "Avg ROAS Lift",       i: <TrendingUp size={14} />  },
    { v: "24/7",  l: "Bid Monitoring",      i: <Activity size={14} />    },
  ];

  return (
    <div className="bg-zinc-900 py-12 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">
          {stats.map((s, i) => (
            <div key={i} className="group relative flex flex-col border-l border-zinc-800/50 pl-4 sm:pl-8 transition-all duration-500 hover:border-orange-500/40">
              <div className="absolute top-0 left-[-1.5px] w-[3px] h-[3px] bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-orange-500/70 mb-3 group-hover:text-orange-400 transition-colors">{s.i}</div>
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tighter">{s.v}</span>
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mt-1">[ {s.l} ]</span>
            </div>
          ))}
          <Link
            href="/get-started"
            className="group relative flex flex-col items-center text-center col-span-2 md:col-span-3 lg:col-span-1 mt-4 lg:mt-0 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/5 lg:border-orange-500/20 lg:pl-8 transition-all duration-500 hover:bg-orange-500/[0.02] no-underline"
          >
            <span className="text-xl sm:text-2xl lg:text-lg font-black text-white uppercase tracking-tighter leading-tight group-hover:text-orange-400 transition-colors flex items-center gap-3">
              Get Strategy Call
              <ArrowRight size={20} className="text-orange-500 group-hover:translate-x-2 transition-transform hidden sm:block lg:hidden" />
              <ArrowRight size={14} className="text-orange-500 group-hover:translate-x-1 transition-transform sm:hidden lg:block" />
            </span>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] lg:text-[8px] font-mono text-zinc-600 uppercase tracking-widest">PPC_AUDIT_FREE</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   03 — PACKAGES
   ═══════════════════════════════════════════════ */
function Packages() {
  const tiers = [
    {
      name: "PPC Audit",
      tag: "One-Time",
      desc: "A full forensic review of your existing campaigns — identifying every ACoS bleed, indexing gap, and structural flaw.",
      features: [
        "Full campaign structure audit",
        "ACoS & TACoS analysis by ASIN",
        "Wasted spend identification",
        "Keyword gap & bleed report",
        "Competitor targeting review",
        "Written action plan delivered",
      ],
      delivery: "3–5 Days",
    },
    {
      name: "PPC Management",
      tag: "Most Popular",
      desc: "Ongoing weekly bid optimisation, campaign management, and search term harvesting for predictable, compounding results.",
      features: [
        "Everything in PPC Audit",
        "Weekly bid optimisation",
        "Search term harvesting & negatives",
        "New campaign architecture",
        "Monthly performance reports",
        "Dedicated PPC strategist",
        "Slack direct access",
      ],
      delivery: "Ongoing Monthly",
      popular: true,
    },
    {
      name: "Full PPC Build",
      tag: "Launch Ready",
      desc: "Complete campaign architecture from zero — built for new ASINs or brands relaunching with a clean ad account slate.",
      features: [
        "New ad account structure",
        "Exact + phrase + auto campaigns",
        "ASIN targeting & competitor SP",
        "Sponsored Brands setup",
        "Sponsored Display setup",
        "DSP audience strategy (if eligible)",
        "Negative keyword foundation",
        "Launch-month intensive management",
      ],
      delivery: "7–10 Days Build",
    },
  ];

  return (
    <section id="packages" className="py-32 bg-[#fafafa] relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Pricing Tiers</SectionLabel>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Choose your<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">PPC tier.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-base sm:text-lg font-light max-w-sm leading-relaxed pb-2">
            Whether you need a one-time audit or fully managed ongoing PPC, every tier is built around one metric: your profitability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <div key={i} className="relative rounded-[40px] overflow-hidden flex flex-col">
              {tier.popular && <div className="h-1 w-full bg-linear-to-r from-orange-500 to-amber-400 shrink-0" />}
              <div className={`flex-1 border p-6 sm:p-8 lg:p-10 flex flex-col transition-all duration-500 ${
                tier.popular
                  ? "bg-zinc-950 border-t-0 border-zinc-800 rounded-b-[40px] hover:border-orange-500/30"
                  : "bg-white border-zinc-100 rounded-[40px] hover:border-orange-500/20 hover:shadow-2xl hover:shadow-zinc-200/60 shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
              }`}>
                {tier.popular && (
                  <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 px-3 py-1.5 rounded-full mb-6 self-start">
                    <Star size={9} className="text-orange-400 fill-orange-400" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-400">Most Popular</span>
                  </div>
                )}
                <span className={`text-[9px] font-mono font-bold uppercase tracking-[0.4em] mb-2 block ${tier.popular ? "text-orange-400" : "text-orange-500"}`}>{tier.tag}</span>
                <h3 className={`text-3xl font-black tracking-tighter mb-3 ${tier.popular ? "text-white" : "text-zinc-900"}`} style={{ fontFamily: "'Montserrat', sans-serif" }}>{tier.name}</h3>
                <p className={`text-sm font-light leading-relaxed mb-8 ${tier.popular ? "text-zinc-400" : "text-zinc-500"}`}>{tier.desc}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 size={14} className="text-orange-500 shrink-0 mt-0.5" />
                      <span className={`text-[13px] font-light ${tier.popular ? "text-zinc-300" : "text-zinc-600"}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-3">
                  <div className={`flex items-center justify-between py-3 border-t ${tier.popular ? "border-white/5" : "border-zinc-100"}`}>
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${tier.popular ? "text-zinc-600" : "text-zinc-400"}`}>Timeline</span>
                    <span className={`text-[11px] font-bold ${tier.popular ? "text-zinc-300" : "text-zinc-700"}`}>{tier.delivery}</span>
                  </div>
                  <div className={`flex items-center justify-between py-3 border-t rounded-xl px-3 -mx-3 ${tier.popular ? "border-white/5 bg-orange-500/5" : "border-zinc-50 bg-zinc-50/50"}`}>
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${tier.popular ? "text-zinc-600" : "text-zinc-400"}`}>Pricing</span>
                    <span className="text-[11px] font-bold text-orange-500">Contact for Quote</span>
                  </div>
                  <Link
                    href="/contact"
                    className={`group/btn w-full flex items-center justify-center gap-3 font-bold text-[11px] uppercase tracking-widest py-4 rounded-2xl no-underline transition-all duration-300 ${
                      tier.popular
                        ? "bg-orange-500 hover:bg-white hover:text-black text-white shadow-[0_8px_30px_rgba(249,115,22,0.3)]"
                        : "bg-black hover:bg-orange-500 text-white"
                    }`}
                  >
                    Cut My Wasted Spend
                    <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   04 — WHERE THE MONEY LEAKS (data-centric stats)
   ═══════════════════════════════════════════════ */
function WhereItLeaks() {
  const stats = [
    { val: "84%",  label: "Of Amazon sellers overpay per click",               color: "text-red-500"    },
    { val: "0.8x", label: "Is the average unmanaged ROAS on Amazon",            color: "text-amber-500"  },
    { val: "8.4x", label: "Is what properly managed campaigns return on average",color: "text-orange-500" },
  ];

  return (
    <section className="py-32 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>The Data</SectionLabel>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-6 sm:mb-8 text-zinc-900">
              Where the<br />money<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">actually goes.</span>
            </h2>
            <p className="text-zinc-500 text-base sm:text-lg font-light leading-relaxed max-w-md mb-8 sm:mb-10">
              Unmanaged PPC is the single largest drain on Amazon seller profitability. These aren't estimates — they're patterns we see in every new account audit we run.
            </p>
            <Link href="/contact" className="group flex items-center gap-3 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
              Audit my campaigns <ArrowRight size={13} />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              {stats.map((s, i) => (
                <div key={i} className="group bg-[#fafafa] hover:bg-white rounded-[24px] sm:rounded-[32px] p-8 sm:p-8 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/50 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <span className={`text-6xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none ${s.color}`}>{s.val}</span>
                    <p className="text-zinc-600 text-[13px] sm:text-[11px] font-mono font-bold uppercase tracking-widest leading-tight sm:pb-2 sm:max-w-[120px]">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* NEW ROAS CHART VISUAL */}
            <div className="bg-zinc-950 rounded-[40px] p-8 border border-white/10 relative overflow-hidden h-full flex flex-col justify-center min-h-[400px]">
               <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Live_ROAS_Analytics</span>
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                     <span className="text-[10px] font-mono text-orange-500 uppercase tracking-widest font-bold">Optimized</span>
                  </div>
               </div>

               <div className="flex items-end gap-3 h-48 mb-8">
                  {[12, 18, 25, 38, 55, 75, 95].map((h, i) => (
                    <div key={i} className="flex-1 h-full flex flex-col justify-end items-center gap-3 group/bar">
                       <div className="w-full bg-white/5 rounded-t-lg relative overflow-hidden h-full">
                          <div
                            className={`absolute bottom-0 left-0 right-0 bg-orange-500 transition-all duration-1000 ${i === 6 ? 'opacity-100' : 'opacity-20 group-hover/bar:opacity-40'}`}
                            style={{ height: `${h}%` }}
                          />
                       </div>
                       <span className="text-[8px] font-mono text-zinc-600 shrink-0">D{i*5}</span>
                    </div>
                  ))}
               </div>

               <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div className="space-y-1">
                     <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Target ROAS</p>
                     <p className="text-2xl font-black text-white tracking-tighter leading-none">8.4x</p>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="text-right space-y-1">
                     <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Efficiency Lift</p>
                     <p className="text-2xl font-black text-emerald-400 tracking-tighter leading-none">+240%</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   05 — BUILT FOR PREDICTABILITY (dark 4-col hover grid)
   ═══════════════════════════════════════════════ */
function BuiltForPredictability() {
  const pillars = [
    { step: "01", icon: <Search size={22} />,       title: "Search Term Precision",  desc: "Mining every search report to find converting terms, eliminate wasted spend, and build a negative keyword list that gets smarter every week.", tag: "KEYWORD_INTEL",  metric: "Weekly harvest",    hud: "STATUS: MINING" },
    { step: "02", icon: <Settings size={22} />,     title: "Bid Architecture",       desc: "Dynamic bid adjustments by time, device, and placement — ensuring your budget is concentrated where and when your buyers actually convert.",    tag: "BID_ENGINE",    metric: "24/7 Adjusted",     hud: "STATUS: OPTIMISING" },
    { step: "03", icon: <Target size={22} />,       title: "Campaign Structure",     desc: "Single-keyword ad groups, ASIN isolation, and campaign segmentation that gives you surgical control over spend, ACoS, and rank intent.",        tag: "STRUCTURE_OPS", metric: "Granular control",  hud: "STATUS: ACTIVE" },
    { step: "04", icon: <LineChart size={22} />,    title: "Organic Rank Leverage",  desc: "Using PPC velocity to accelerate organic rank, then pulling back ad spend as organic sales compound — making every ad dollar work twice.",    tag: "RANK_LEVER",    metric: "Dual-channel ROI",  hud: "STATUS: COMPOUNDING" },
  ];

  return (
    <section className="py-32 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-500/[0.08] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-orange-500/[0.04] blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <SectionLabel light>The System</SectionLabel>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Built for PPC<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-500 lowercase tracking-normal">predictability.</span>
            </h2>
          </div>
          <p className="text-zinc-400 font-light max-w-sm text-sm leading-relaxed pb-2">
            Amazon PPC isn't a guessing game. We treat it as an engineering problem — with systems, data, and compounding feedback loops.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-[40px] overflow-hidden">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="group p-8 sm:p-10 bg-zinc-900 hover:bg-orange-500 transition-all duration-700 relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "6px 6px" }}
              />
              <span className="absolute top-6 right-6 text-white/5 font-black text-4xl sm:text-5xl group-hover:text-white/15 transition-colors select-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>{p.step}</span>
              <div className="relative z-10 flex flex-col h-full">
                <span className="inline-block self-start font-mono text-[8px] font-bold tracking-widest text-zinc-700 group-hover:text-white/70 border border-zinc-800 group-hover:border-white/30 px-2 py-0.5 rounded-full mb-6 transition-all duration-500 uppercase">{p.tag}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:bg-white mb-6 transition-colors" />
                <div className="text-orange-500 group-hover:text-white transition-colors mb-6">{p.icon}</div>
                <h3 className="text-xl font-bold mb-4 tracking-tight uppercase text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>{p.title}</h3>
                <p className="text-zinc-500 group-hover:text-white/80 text-sm font-light leading-relaxed mb-6 flex-1">{p.desc}</p>
                <span className="text-[10px] font-bold tracking-widest uppercase text-orange-500 group-hover:text-white/70 transition-colors font-mono">{p.metric}</span>
                <span className="absolute bottom-4 right-5 font-mono text-[7px] text-zinc-800 group-hover:text-white/20 tracking-widest transition-colors select-none">{p.hud}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   06 — CAMPAIGN STRUCTURE (split: terminal + features)
   ═══════════════════════════════════════════════ */
function CampaignStructure() {
  const campaigns = [
    { type: "Sponsored Products · Exact",  status: "LIVE",     note: "Brand + high-intent terms" },
    { type: "Sponsored Products · Phrase", status: "LIVE",     note: "Category discovery"         },
    { type: "Sponsored Products · Auto",   status: "HARVEST",  note: "Mining new search terms"    },
    { type: "Sponsored Brands · Video",    status: "ACTIVE",   note: "Top-of-search ownership"    },
    { type: "Sponsored Display · ASIN",    status: "RUNNING",  note: "Competitor conquest"        },
    { type: "Negative Keywords",           status: "UPDATED",  note: "1,240 blocked terms"        },
  ];

  return (
    <section className="py-0 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: terminal */}
        <div className="bg-zinc-950 p-10 lg:p-16 relative min-h-[600px] flex flex-col justify-center">
          <style>{`
            @keyframes ppc-terminal-blink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
            @keyframes ppc-scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(600px); } }
          `}</style>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute left-0 right-0 h-px bg-orange-500/20" style={{ animation: "ppc-scan 4s linear infinite" }} />
          </div>
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)" }} />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70 shrink-0" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 shrink-0" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70 shrink-0" />
              <span className="ml-2 sm:ml-4 text-[9px] font-mono text-zinc-700 uppercase tracking-widest break-all">campaign_stack_v3.0 — live</span>
            </div>
            <div className="font-mono text-[12px] leading-loose">
              <p className="text-zinc-600 mb-4"># ACTIVE CAMPAIGN STRUCTURE</p>
              {campaigns.map((c, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-3 sm:py-2 hover:bg-white/[0.02] rounded-lg px-2 -mx-2 transition-colors group">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500 shrink-0">→</span>
                    <span className="text-zinc-300 flex-1 text-[11px]">{c.type}</span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:flex-1 pl-4 sm:pl-0">
                    <span className="text-zinc-700 text-[8px] font-bold tracking-widest truncate">{c.note}</span>
                    <span className="flex items-center gap-1.5 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-emerald-500/80 text-[8px] font-bold tracking-widest">{c.status}</span>
                    </span>
                  </div>
                </div>
              ))}
              <p className="text-orange-500/40 mt-6 flex items-center gap-2">
                <span>$</span>
                <span className="text-zinc-500">all_campaigns_profitable</span>
                <span className="w-2 h-4 bg-orange-500/60 inline-block" style={{ animation: "ppc-terminal-blink 1s step-end infinite" }} />
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="bg-white p-10 lg:p-16 flex flex-col justify-center relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-orange-500 via-orange-500/20 to-transparent" />
          <SectionLabel>Campaign Architecture</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.88] mb-6 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Structured for<br />
            <span className="text-zinc-200 italic font-light lowercase"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
              profit.
            </span>
          </h2>
          <p className="text-zinc-500 text-base font-light leading-relaxed mb-8">
            Every campaign type serves a specific purpose in the funnel. We build a layered structure where each campaign feeds data back into the others.
          </p>
          <div className="grid grid-cols-1 gap-3">
            {[
              "Exact match campaigns isolate your best terms for maximum control",
              "Auto campaigns continuously mine new converting search terms",
              "Negative lists prevent the same wasted spend week after week",
              "Bid time-of-day rules concentrate spend when your buyers convert",
            ].map((t, i) => (
              <div key={i} className="group flex items-center justify-between p-4 rounded-xl border border-zinc-100 bg-zinc-50 hover:border-orange-500/20 hover:bg-white hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/5 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="text-[12px] font-bold uppercase tracking-tight text-zinc-800">{t}</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 group-hover:bg-orange-500 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   07 — PPC DOES NOT (what we avoid)
   ═══════════════════════════════════════════════ */
function PPCDoesNot() {
  const problems = [
    { icon: <AlertTriangle size={20} />, title: "Set-and-Forget Management",  desc: "Campaigns left on autopilot accumulate wasted spend, stale bids, and irrelevant search terms month after month. We review and adjust weekly — without exception." },
    { icon: <DollarSign size={20} />,    title: "Broad Match Keyword Bleed",  desc: "Broad match keywords on Amazon are one of the fastest ways to burn budget. We build tight match type strategies that keep every dollar accountable." },
    { icon: <Eye size={20} />,           title: "Ignoring Organic Signals",   desc: "PPC exists to serve organic rank — not replace it. Every campaign we build is designed to accelerate organic velocity, not create an ad dependency." },
    { icon: <RefreshCw size={20} />,     title: "Chasing ACoS Alone",         desc: "ACoS doesn't tell the full story. We optimise for TACoS (total ad cost of sale) — the only metric that captures how PPC and organic sales interact." },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent" />
      {/* Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
        <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-[100px] sm:text-[180px] lg:text-[300px] font-black italic tracking-tighter text-zinc-50">
          PPC
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>What We Avoid</SectionLabel>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-6 sm:mb-8 text-zinc-900">
              PPC does not<br />have to bleed<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">budget to work.</span>
            </h2>
            <p className="text-zinc-500 text-base sm:text-lg font-light leading-relaxed max-w-md mb-8 sm:mb-10">
              The four most common PPC mistakes we fix in every account we audit — and why they compound over time into catastrophic profit losses.
            </p>
            <Link href="/contact" className="group flex items-center gap-3 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
              Fix my PPC <ArrowRight size={13} />
            </Link>
          </div>

          <div className="lg:col-span-7 space-y-5">
            {problems.map((p, i) => (
              <div key={i} className="group bg-[#fafafa] hover:bg-white rounded-[32px] p-8 sm:p-7 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/50 relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
                <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                    {p.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[14px] font-black uppercase tracking-tight text-zinc-900 mb-2 group-hover:text-orange-500 transition-colors leading-tight">{p.title}</h3>
                    <p className="text-zinc-500 text-sm font-light leading-relaxed">{p.desc}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-7 right-7 h-px bg-orange-500/0 group-hover:bg-orange-500/20 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   08 — METRICS THAT SCALE (outcomes)
   ═══════════════════════════════════════════════ */
function MetricsThatScale() {
  const sectionRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const outcomes = [
    { icon: <TrendingDown size={18} />, metric: "-38%",  sub: "avg ACoS drop",    title: "ACoS Control",         desc: "Systematic bid pruning and negative expansion brings ACoS under target within 30–60 days on every account we manage.",                 dark: false },
    { icon: <TrendingUp size={18} />,   metric: "2.4x",  sub: "avg ROAS lift",    title: "ROAS Expansion",       desc: "As wasted spend is eliminated and converting terms are scaled, ROAS compounds week over week without increasing total budget.",    dark: true  },
    { icon: <Search size={18} />,       metric: "+60%",  sub: "organic share",    title: "Organic Velocity",     desc: "PPC-driven sales velocity accelerates organic rank, shifting your sales mix toward free organic traffic over 60–90 days.",        dark: false },
    { icon: <BarChart3 size={18} />,    metric: "TACoS", sub: "the real metric",  title: "Total Profitability",  desc: "We optimize for total ad cost of sale — the only metric that captures the real relationship between paid and organic performance.", dark: false },
    { icon: <Activity size={18} />,     metric: "24/7",  sub: "monitoring",       title: "Always Watching",      desc: "Automated alerts and weekly manual review ensure no campaign drifts off target without being caught and corrected immediately.",   dark: false },
  ];

  return (
    <section ref={sectionRef} className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Expected Outcomes</SectionLabel>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Metrics that actually tell you<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">what's working.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            Every improvement is measurable, trackable, and reported. No vague "better performance" — actual numbers that appear in your Seller Central account.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
          {/* Featured dark card */}
          <div
            className={`ppc-outcome-card lg:col-span-3 group relative bg-zinc-950 rounded-[40px] p-10 overflow-hidden text-white transition-all duration-[800ms] ease-out hover:shadow-2xl hover:shadow-orange-500/10 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[40px]"
            }`}
            style={{ transitionDelay: "120ms" }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-orange-500/5 blur-[80px] group-hover:bg-orange-500/15 transition-all duration-700 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                  {outcomes[1].icon}
                </div>
                <span className="text-[8px] font-mono font-black tracking-[0.3em] text-zinc-700 uppercase">{outcomes[1].sub}</span>
              </div>
              <span className="text-6xl sm:text-7xl font-black tracking-tighter text-white leading-none">{outcomes[1].metric}</span>
              <h3 className="text-sm font-black uppercase tracking-[0.15em] text-orange-400 mb-3 mt-4">{outcomes[1].title}</h3>
              <p className="text-zinc-500 text-sm font-light leading-relaxed group-hover:text-zinc-400 transition-colors">{outcomes[1].desc}</p>
            </div>
          </div>

          {/* Other outcome cards */}
          {[outcomes[0], ...outcomes.slice(2)].map((o, i) => (
            <div
              key={i}
              className={`ppc-outcome-card group relative rounded-[40px] p-8 overflow-hidden border transition-all duration-[800ms] ease-out hover:shadow-xl hover:shadow-zinc-200/50 flex flex-col ${
                i === 0 ? "lg:col-span-3" : "lg:col-span-2"
              } bg-white border-zinc-100 hover:border-orange-500/20 shadow-[0_10px_40px_rgba(0,0,0,0.06)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[40px]"
              }`}
              style={{ transitionDelay: `${i === 0 ? 0 : (i + 1) * 120}ms` }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-orange-550 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                  {o.icon}
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-zinc-900 tracking-tighter leading-none group-hover:text-orange-500 transition-colors">{o.metric}</p>
                  <p className="font-mono text-[8px] font-bold tracking-[0.2em] text-zinc-400 uppercase mt-1">{o.sub}</p>
                </div>
              </div>
              <div className="mt-auto pt-5 border-t border-zinc-100 group-hover:border-orange-500/10 transition-colors">
                <h3 className="font-black text-sm tracking-tight uppercase text-zinc-900 group-hover:text-orange-500 transition-colors mb-2">{o.title}</h3>
                <p className="text-zinc-500 text-xs font-light leading-relaxed">{o.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   09 — HOW WE WORK (4-step process)
   ═══════════════════════════════════════════════ */
function HowWeWork() {
  const steps = [
    { num: "01", title: "Full Account Audit",    desc: "We dig into every campaign, ad group, search term report, and bid setting — mapping every dollar of wasted spend before touching anything.",  icon: <Search size={18} />       },
    { num: "02", title: "Rebuild Architecture",  desc: "Restructure campaigns from the ground up: exact/phrase/auto separation, ASIN isolation, and negative keyword foundations set correctly.",      icon: <Settings size={18} />     },
    { num: "03", title: "Weekly Optimisation",   desc: "Bid adjustments, search term harvesting, new negative additions, and campaign scaling decisions — executed every 7 days without exception.",   icon: <RefreshCw size={18} />    },
    { num: "04", title: "Report & Scale",        desc: "Monthly performance reports with TACoS trends, organic share growth, and a 30-day forward strategy — so you always know exactly what's happening.",icon: <BarChart3 size={18} />    },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>The Process</SectionLabel>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-zinc-900 leading-[0.9] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              How we<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-zinc-300 italic font-light lowercase tracking-normal">manage PPC.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            A transparent, repeatable system — not a black box. You always know exactly what we're doing and why.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-100 border border-zinc-100 rounded-[40px] shadow-xl shadow-slate-900/5 overflow-hidden">
          {steps.map((item, i) => (
            <div
              key={i}
              style={{ zIndex: steps.length - i }}
              className={`group relative bg-white p-8 hover:bg-zinc-50 transition-all duration-500 h-full flex flex-col ${
                i === 0 ? "rounded-t-[40px] lg:rounded-l-[40px] lg:rounded-tr-none" :
                i === steps.length - 1 ? "rounded-b-[40px] lg:rounded-r-[40px] lg:rounded-bl-none" : ""
              }`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-orange-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-center mb-8">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                  {item.icon}
                </div>
                <div className="text-[10px] font-mono font-black text-zinc-300 group-hover:text-orange-500 transition-colors">{item.num}</div>
              </div>
              <div className="grow">
                <h3 className="text-[13px] font-black uppercase tracking-[0.15em] text-zinc-900 mb-3 group-hover:text-orange-500 transition-colors">{item.title}</h3>
                <p className="text-[13px] text-zinc-500 leading-relaxed font-light">{item.desc}</p>
              </div>
              {i !== steps.length - 1 && (
                <>
                  <div className="absolute top-1/2 -right-4 w-8 h-px bg-zinc-100 z-40 hidden lg:block group-hover:bg-orange-500/30 transition-colors" />
                  <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-white border border-zinc-100 rounded-full z-50 hidden lg:flex items-center justify-center group-hover:border-orange-500 group-hover:scale-110 transition-all duration-500 shadow-sm">
                    <ChevronRight size={12} className="text-zinc-300 group-hover:text-orange-500" />
                  </div>
                </>
              )}
              <div className="mt-8 h-px w-8 bg-zinc-100 group-hover:w-full group-hover:bg-orange-500 transition-all duration-700" />
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 sm:p-8 bg-[#fafafa] rounded-[24px] sm:rounded-[32px] border border-zinc-100 gap-4 sm:gap-0">
          <div className="flex items-center gap-3 sm:gap-4 text-zinc-400">
            <Terminal size={14} className="shrink-0" />
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.4em]">PPC_Optimisation_Protocol_01-04</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[9px] sm:text-[10px] font-bold text-zinc-900 uppercase tracking-widest italic whitespace-nowrap">Campaigns active & monitored</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   10 — FAQ
   ═══════════════════════════════════════════════ */
function WhoItsFor() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".signal-block").forEach((block, i) => {
        gsap.fromTo(block,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const signals = [
    {
      index: "01",
      icon: <TrendingDown size={18} />,
      label: "WASTE DETECTED",
      status: "CRITICAL BLEED",
      statusColor: "text-red-500 bg-red-500/10 border-red-500/20",
      headline: "The Profit Bleed: High ACoS is killing your margin.",
      subline: "Efficiency diagnostic.",
      body: "Your ad spend is growing faster than your revenue. You're bidding on broad terms that 'feel' right, but the data shows they never convert. Every click is an expense, not an investment. We find the keywords that are draining your bank account and cut them with surgical precision.",
      symptoms: [
        "ACoS consistently exceeding your break-even profit margin",
        "Significant spend on keywords with 0% conversion rate",
        "High percentage of budget allocated to non-performing search terms",
      ],
      accentGradient: "from-red-500/80 to-orange-500/80",
    },
    {
      index: "02",
      icon: <Activity size={18} />,
      label: "RANK ANOMALY",
      status: "AD DEPENDENCY",
      statusColor: "text-orange-500 bg-orange-500/10 border-orange-500/20",
      headline: "The Rank Trap: You're paying for every single sale.",
      subline: "Attribution analysis.",
      body: "You have strong sales volume, but the moment you lower your ad spend, your revenue disappears. This is an ad-dependency trap. Your PPC isn't feeding your organic rank; it's replacing it. We restructure your campaigns to force organic velocity, shifting the sales mix toward free traffic.",
      symptoms: [
        "TACoS is high and remains stagnant regardless of spend changes",
        "Low organic visibility for primary high-volume keywords",
        "Immediate revenue drop-off when PPC budgets are capped",
      ],
      featured: true,
      accentGradient: "from-orange-500 to-amber-500",
    },
    {
      index: "03",
      icon: <Settings size={18} />,
      label: "STRUCTURAL FLAW",
      status: "ACCOUNT CHAOS",
      statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      headline: "The Architecture Chaos: Competing with yourself.",
      subline: "Structural x-ray.",
      body: "Overlapping campaigns, multiple match types for the same keyword, and 'loose' targeting are driving up your bid prices. You're effectively bidding against your own campaigns. We implement a clean, scientific architecture that isolates performance and eliminates internal competition.",
      symptoms: [
        "Duplicate keyword targets across different campaign types",
        "Unclear reporting where spend is difficult to track by ASIN",
        "Lack of a formal negative keyword harvesting process",
      ],
      accentGradient: "from-emerald-500/80 to-teal-500/80",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 relative z-10">
        <div className="mb-12 lg:mb-20">
          <SectionLabel>PPC Diagnostic</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 mt-4">
            <h2
              className="text-3xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              The fingerprints<br />
              of wasted spend.
            </h2>
            <p className="text-zinc-500 text-sm lg:text-base font-light leading-relaxed max-w-md lg:text-right">
              Most Amazon ad accounts suffer from the same three structural flaws. If you recognize these patterns, your ACoS can be fixed.
            </p>
          </div>
        </div>

        <div className="space-y-0 relative">
          <div className="absolute left-0 lg:left-4 top-0 bottom-0 w-px bg-zinc-100 hidden lg:block" />

          {signals.map((s, i) => {
            const isFeatured = s.featured;
            return (
              <div key={i} className="signal-block relative">
                <div className="absolute -left-16 top-16 hidden xl:block origin-right -rotate-90">
                  <span className="text-[7px] font-mono font-bold text-zinc-300 uppercase tracking-[0.5em]">
                    [PPC_SCAN_{s.index}]
                  </span>
                </div>

                <div className={`relative group transition-all duration-700 ${
                  isFeatured
                    ? "bg-zinc-950 rounded-[28px] lg:rounded-[48px] px-5 lg:px-16 py-10 lg:py-20 my-6 lg:my-8 shadow-[0_30px_80px_rgba(0,0,0,0.3)] lg:shadow-[0_50px_120px_rgba(0,0,0,0.4)] ring-1 ring-white/10"
                    : "py-10 lg:py-16 border-b border-zinc-50 last:border-0 lg:pl-8 lg:border-l-2 lg:border-l-transparent hover:border-l-orange-500/40"
                }`}>

                  {isFeatured ? (
                    <>
                      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[48px]">
                        <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-orange-500/5 to-transparent -translate-y-full animate-[scan-vertical_8s_linear_infinite]" />
                        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px]" />
                      </div>
                      <div className="absolute top-5 left-5 lg:top-8 lg:left-8 w-3 h-3 lg:w-4 lg:h-4 border-t-2 border-l-2 border-white/10 hidden sm:block" />
                      <div className="absolute top-5 right-5 lg:top-8 lg:right-8 w-3 h-3 lg:w-4 lg:h-4 border-t-2 border-r-2 border-white/10 hidden sm:block" />
                      <div className="absolute bottom-5 left-5 lg:bottom-8 lg:left-8 w-3 h-3 lg:w-4 lg:h-4 border-b-2 border-l-2 border-white/10 hidden sm:block" />
                      <div className="absolute bottom-5 right-5 lg:bottom-8 lg:right-8 w-3 h-3 lg:w-4 lg:h-4 border-b-2 border-r-2 border-white/10 hidden sm:block" />
                      <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/[0.05] rounded-full blur-[100px] pointer-events-none" />
                    </>
                  ) : (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div className="absolute inset-0 bg-[radial-gradient(#f9731610_1px,transparent_1px)] [background-size:32px_32px]" />
                    </div>
                  )}

                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-2 lg:gap-4 mb-6 lg:mb-8">
                      <div className={`flex items-center gap-2 ${isFeatured ? "text-orange-500" : "text-zinc-300"}`}>
                        <span className="text-[11px] font-black tracking-widest font-mono">[{s.index}]</span>
                      </div>
                      <div className={`h-px w-6 lg:flex-1 lg:max-w-[40px] ${isFeatured ? "bg-white/10" : "bg-zinc-100"}`} />
                      <span className={`text-[8px] lg:text-[9px] font-black tracking-[0.3em] lg:tracking-[0.4em] uppercase ${
                        isFeatured ? "text-white/40" : "text-zinc-400"
                      }`}>
                        {s.label}
                      </span>
                      <div className={`h-px flex-1 hidden lg:block ${isFeatured ? "bg-white/5" : "bg-zinc-50"}`} />
                      <div className={`flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-4 py-1 lg:py-1.5 rounded-full border text-[7px] lg:text-[8px] font-black uppercase tracking-[0.25em] lg:tracking-[0.35em] backdrop-blur-md ml-auto ${s.statusColor}`}>
                        <div className="relative w-1.5 h-1.5">
                          <div className="absolute inset-0 bg-current rounded-full animate-ping opacity-75" />
                          <div className="relative bg-current rounded-full w-full h-full" />
                        </div>
                        {s.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20 items-start">
                      <div className="lg:col-span-5">
                        <div className={`inline-block mb-3 px-2 py-1 rounded text-[7px] font-mono font-bold ${isFeatured ? "bg-white/5 text-zinc-500" : "bg-zinc-100 text-zinc-400"}`}>
                          PPC_SIGNAL: {s.subline.toUpperCase()}
                        </div>
                        <h3
                          className={`text-2xl lg:text-[36px] font-black uppercase tracking-tighter leading-[0.95] mb-4 lg:mb-6 ${
                            isFeatured ? "text-white italic" : "text-zinc-900"
                          }`}
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {s.headline}
                        </h3>
                      </div>

                      <div className="lg:col-span-7 lg:pl-10 lg:border-l border-current transition-colors duration-700" style={{ borderColor: isFeatured ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)" }}>
                        <p className={`text-[13px] lg:text-[15px] font-light leading-[1.75] lg:leading-[1.85] mb-5 lg:mb-6 ${
                          isFeatured ? "text-zinc-400" : "text-zinc-500"
                        }`}>
                          {s.body}
                        </p>

                        <div className={`rounded-2xl lg:rounded-3xl p-5 lg:p-8 transition-all duration-700 ${
                          isFeatured 
                            ? "bg-white/[0.02] border border-white/10 shadow-inner" 
                            : "bg-zinc-50 border border-zinc-100 group-hover:bg-white group-hover:shadow-xl group-hover:shadow-zinc-200/40"
                        }`}>
                          <div className="flex items-center justify-between mb-4">
                            <span className={`text-[9px] font-mono font-black uppercase tracking-[0.4em] ${
                              isFeatured ? "text-orange-500/40" : "text-zinc-300"
                            }`}>
                              EFFICIENCY_SYMPTOMS
                            </span>
                            <div className={`w-8 h-px ${isFeatured ? "bg-white/10" : "bg-zinc-100"}`} />
                          </div>
                          
                          <div className="space-y-4">
                            {s.symptoms.map((symptom, j) => (
                              <div key={j} className="flex items-start gap-4 group/symptom">
                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${
                                  isFeatured 
                                    ? "bg-white/5 border border-white/5 text-orange-400 group-hover/symptom:bg-orange-500 group-hover/symptom:text-white" 
                                    : "bg-white border border-zinc-100 text-orange-500/40 group-hover/symptom:border-orange-500 group-hover/symptom:text-orange-500"
                                }`}>
                                  <span className="text-[8px] font-mono font-bold">{j + 1}</span>
                                </div>
                                <span className={`text-[13px] font-medium leading-relaxed transition-colors duration-300 ${
                                  isFeatured ? "text-zinc-500 group-hover/symptom:text-zinc-300" : "text-zinc-600"
                                }`}>
                                  {symptom}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 lg:mt-16 relative">
          <div className="bg-zinc-950 rounded-[24px] lg:rounded-[32px] border border-white/5 p-6 lg:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 lg:gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                <BarChart3 size={16} className="text-orange-500" />
              </div>
              <div>
                <p className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.35em] lg:tracking-[0.4em] text-orange-500 mb-1.5">Audit Your Spend</p>
                <p className="text-zinc-400 text-[13px] lg:text-sm font-light leading-relaxed max-w-lg">
                  Stop the bleed today. Our forensic PPC audit identifies every dollar of wasted spend in your account.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-white text-zinc-950 w-full md:w-auto px-6 lg:px-8 py-3.5 lg:py-4 rounded-full text-[10px] lg:text-[11px] font-black uppercase tracking-[0.2em] lg:tracking-[0.25em] hover:bg-orange-500 hover:text-white hover:shadow-[0_20px_50px_rgba(249,115,22,0.3)] transition-all duration-500 shrink-0 active:scale-[0.97] no-underline"
            >
              Get Free PPC Audit
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: "What is ACoS and why does it matter?",                                  a: "ACoS (Advertising Cost of Sale) is your ad spend divided by ad revenue, expressed as a percentage. Your target ACoS is determined by your profit margin — you want ACoS to sit below your break-even point. Most sellers don't know their break-even ACoS, which is why they bleed money. We calculate this before touching a single campaign." },
    { q: "What's the difference between ACoS and TACoS?",                         a: "ACoS only measures ad-driven revenue. TACoS (Total ACoS) divides your total ad spend by your total revenue — including organic sales. As PPC drives organic rank, TACoS falls even if ACoS stays flat. TACoS is the metric that tells you whether your advertising is building a sustainable, profitable business or just keeping you afloat." },
    { q: "How long does it take to see results from PPC management?",              a: "Most accounts show measurable ACoS improvement within 4–6 weeks of restructuring. Organic rank improvements from PPC velocity typically appear in weeks 6–12. We give every new account a 90-day baseline before drawing firm conclusions — but you'll see the data moving in the right direction within the first 30 days." },
    { q: "Do you need access to my Seller Central account?",                      a: "Yes. We use Amazon's Advertising API access, which requires granting our agency account manager access to your advertising console. We do not need payment method access or any permissions beyond campaign management. A full list of permissions required is provided before we start." },
    { q: "Can you manage PPC for a new product with no sales history?",           a: "Yes — launch PPC is actually where we have the most impact. We build a launch-specific campaign structure designed to create rapid sales velocity and force early organic rank gains during the A10 honeymoon window. New ASINs get a distinct strategy from established listings." },
    { q: "What reporting do I receive?",                                          a: "Monthly performance reports covering: TACoS trend, ACoS by campaign, search term wins and negatives added, organic rank movement for target keywords, and a 30-day forward plan. You also get Slack access to your account manager for any questions between reports." },
  ];

  return (
    <section className="py-32 bg-[#fafafa] border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>FAQ_Protocol</SectionLabel>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-6 lg:mb-10 text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Common<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">questions.</span>
            </h2>
            <p className="text-base sm:text-lg text-zinc-500 font-light leading-relaxed max-w-md mb-8 lg:mb-12">
              Get clarity on how Amazon PPC management actually works — and what to expect before you commit.
            </p>
            <div className="p-6 bg-white rounded-3xl border border-zinc-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Free PPC Audit Available</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                We review your top 3 campaigns and give you a clear picture of where money is being wasted — at no cost, no obligation.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-orange-500 font-bold text-[10px] uppercase tracking-widest hover:gap-3 transition-all no-underline">
                Request free audit <ChevronRight size={11} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border transition-all duration-500 rounded-[24px] overflow-hidden ${
                  openIndex === i
                    ? "bg-white border-orange-500/30 shadow-xl shadow-orange-500/5"
                    : "bg-white border-zinc-100 hover:border-zinc-200"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-6 sm:px-8 py-5 sm:py-6 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 pr-2 sm:pr-4">
                    <span className={`text-[9px] sm:text-[10px] font-mono transition-colors shrink-0 mt-1 sm:mt-0 ${openIndex === i ? "text-orange-500" : "text-zinc-300"}`}>0{i + 1}</span>
                    <span className="text-[13px] sm:text-[14px] font-bold text-zinc-900 tracking-tight flex-1 break-words leading-snug">{faq.q}</span>
                  </div>
                  <div className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                    openIndex === i ? "bg-orange-500 text-white rotate-180" : "bg-zinc-100 text-zinc-400"
                  }`}>
                    {openIndex === i ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>
                <div
                  className="transition-all duration-500 ease-in-out overflow-hidden"
                  style={{ maxHeight: openIndex === i ? "400px" : "0", opacity: openIndex === i ? 1 : 0 }}
                >
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 ml-0 sm:ml-10">
                    <div className="text-[13px] sm:text-[14px] text-zinc-500 leading-relaxed font-light border-l-2 border-orange-500/20 pl-4 sm:pl-6">{faq.a}</div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 px-6 sm:px-8 py-6 bg-zinc-900 rounded-[20px] sm:rounded-[24px] text-white text-center sm:text-left">
              <div className="flex items-center gap-4">
                <Terminal size={14} className="text-orange-500 shrink-0" />
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold">More_Questions?</span>
              </div>
              <Link href="/contact" className="flex items-center justify-center sm:justify-start gap-2 group no-underline w-full sm:w-auto">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">Cut My Wasted Spend</span>
                <ChevronRight size={14} className="text-orange-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   11 — CTA
   ═══════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════
   12 — FOOTER NAV
   ═══════════════════════════════════════════════ */
function FooterNav() {
  return (
    <footer className="py-24 bg-white border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Previous Service</p>
          <Link href="/service/listing-optimization" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start uppercase">
              <ArrowRight className="mr-3 group-hover:-translate-x-3 transition-transform rotate-180 size-6 md:size-8 shrink-0" />
              Listing Optimization
            </h4>
          </Link>
        </div>
        <div className="hidden md:block w-px h-16 bg-zinc-100" />
        <div className="text-center md:text-right w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Service</p>
          <Link href="/service/growth-automation" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end uppercase">
              Growth Automation
              <ArrowRight className="ml-3 group-hover:translate-x-3 transition-transform size-6 md:size-8 shrink-0" />
            </h4>
          </Link>
        </div>
      </div>
      <div className="mt-16 text-center">
        <Link href="/service" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 transition-colors no-underline">
          <ArrowRight className="rotate-180" size={16} /> Back to All Services
        </Link>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE EXPORT
   ═══════════════════════════════════════════════ */
export default function PPCEfficiencyPage() {
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <PPCHero />
      <MetricsStrip />
      <WhereItLeaks />
      <Packages />
      <BuiltForPredictability />
      <CampaignStructure />
      <PPCDoesNot />
      <MetricsThatScale />
      <WhoItsFor />
      <HowWeWork />
      <FAQ />
      <PPCEfficiencyCTA />
      <FooterNav />
    </div>
  );
}