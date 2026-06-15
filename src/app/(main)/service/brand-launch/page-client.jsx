"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, Check, CheckCircle2, ChevronRight,
  Target, Zap, Search, BarChart3, Layout, Package,
  Layers, Globe, Compass, ShieldCheck, Terminal, Star,
  TrendingUp, Award, Plus, Minus, Rocket, Activity,
  Radio, LayoutGrid, FileText, PenTool, Store, Camera,
  RefreshCw, AlertCircle,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroButton from "@/components/ui/HeroButton";

const ProcessSection = dynamic(() => import("@/components/service/brand launch/ProcessSection"), { ssr: false });
const PriceMatrix = dynamic(() => import("@/components/service/brand launch/PriceMatrix"), { ssr: false });
import LaunchCTA from "./components/LaunchCTA";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
   Orbit-themed: Brand Core with two satellites
   ═══════════════════════════════════════════════ */
function BrandLaunchHero() {
  const floatRef = useRef(null);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    if (!floatRef.current) return;
    gsap.to(floatRef.current, { y: -14, duration: 4.5, repeat: -1, yoyo: true, ease: "power1.inOut" });
    const logInterval = setInterval(() => setLogIndex(prev => (prev + 1) % 4), 2800);
    return () => clearInterval(logInterval);
  }, []);

  const logs = [
    { cmd: "> initiate_launch_node",   result: "[SUCCESS]",  resultColor: "text-emerald-400" },
    { cmd: "> keyword_matrix_loaded",  result: "2,400 terms", resultColor: "text-white"       },
    { cmd: "> launch_velocity_boost",  result: "ACTIVE",      resultColor: "text-orange-400"  },
    { cmd: "> organic_velocity",       result: "CLIMBING",    resultColor: "text-orange-400"  },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#fafafa]">
      <style>{`
        @keyframes scan-launch {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes orbit-inner {
          from { transform: rotate(0deg) translateX(68px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(68px) rotate(-360deg); }
        }
        @keyframes orbit-outer {
          from { transform: rotate(0deg) translateX(108px) rotate(0deg); }
          to   { transform: rotate(-360deg) translateX(108px) rotate(360deg); }
        }
        @keyframes core-breathe {
          0%,100% { box-shadow: 0 0 40px rgba(249,115,22,0.2), inset 0 0 20px rgba(249,115,22,0.08); }
          50%     { box-shadow: 0 0 70px rgba(249,115,22,0.4), inset 0 0 30px rgba(249,115,22,0.18); }
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent animate-[scan-launch_10s_linear_infinite]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="launch-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
            <circle cx="60" cy="60" r="0.5" fill="currentColor" opacity="0.5" />
            <path d="M120 0 L120 120 M0 120 L120 120" stroke="currentColor" strokeWidth="0.2" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#launch-grid)" />
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
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
                  <div className="w-4 h-[1px] bg-orange-500 self-center" />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
                  Amazon Brand Launch · Market Entry
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[85px] font-black tracking-tighter leading-[0.85] mb-10 text-zinc-900 uppercase break-words" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Stop Guessing Your<br />
                <span className="text-orange-500">Launch.</span><br />
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light lowercase tracking-tight text-zinc-300">
                  Engineer It.
                </span>
              </h1>

              <div className="flex gap-6 mb-12">
                <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50" />
                <div>
                  <p className="text-lg md:text-[22px] text-zinc-500 font-light leading-relaxed max-w-xl mb-6">
                    Most brands launch and disappear. We engineer your Amazon entry to capture the A10 algorithm's launch velocity window — positioning your product for top-of-page organic rank from day one.
                  </p>
                  <div className="flex flex-wrap gap-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Mission_Clock: T-Minus_0</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Terminal size={10} className="text-orange-500/50" />
                      <span>Core_Sync: 100%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  "Full keyword matrix & SEO setup",
                  "High-CTR main image + listing images",
                  "A+ Content & Brand Story launch-ready",
                  "PPC launch structure & bid strategy",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={15} className="text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-[14px] font-light leading-snug text-zinc-600">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-12">
                <HeroButton href="/contact" className="w-full sm:w-auto justify-center">
                  Begin Launch Sequence
                </HeroButton>
                <a
                  href="#packages"
                  className="group flex items-center justify-center sm:justify-start gap-3 text-zinc-400 hover:text-zinc-900 font-bold text-[11px] uppercase tracking-widest px-2 py-4 transition-colors no-underline"
                >
                  View Packages <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { icon: <Target size={11} />,     label: "A10 Algorithm Ready"     },
                  { icon: <Zap size={11} />,         label: "60% Faster Indexing"     },
                  { icon: <ShieldCheck size={11} />, label: "Launch Velocity Locked" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2">
                    <span className="text-orange-500">{b.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{b.label}</span>
                  </div>
                ))}
              </div>

              {/* Proof strip */}
              <div className="flex items-center gap-10 mt-10 pt-10 border-t border-zinc-100">
                {[
                  { label: "Brands Launched",    val: "80+"  },
                  { label: "Avg Organic Lift",   val: "+60%"  },
                  { label: "Page 1 in 30 Days",  val: "84%"   },
                ].map((t, i) => (
                  <div key={i}>
                    <p className="text-xl font-black tracking-tighter text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>{t.val}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Launch Mission Control */}
          <div className="lg:col-span-5 relative block mt-0 lg:mt-[70px] scale-[0.95] sm:scale-100 origin-top lg:origin-center" ref={floatRef}>
            {/* Floating metric cards */}
            <div className="absolute -top-8 -right-2 lg:-right-4 bg-white rounded-[20px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.08)] z-30 border border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-[0_8px_20px_rgba(249,115,22,0.3)]"><TrendingUp size={18} /></div>
                <div>
                  <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Organic Rank</p>
                  <p className="text-lg font-black text-zinc-900 tracking-tighter leading-none">Page 1</p>
                </div>
              </div>
            </div>
            <div className="absolute -left-4 lg:-left-10 bottom-[60px] bg-zinc-900 rounded-2xl px-5 py-4 z-30 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
                <div>
                  <p className="text-[7px] font-mono font-bold uppercase tracking-[0.25em] text-zinc-500">Launch Velocity</p>
                  <p className="text-lg sm:text-xl font-black text-white leading-none tracking-tighter">+312%</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-2 lg:-right-6 bottom-[-30px] bg-white rounded-2xl px-5 py-3.5 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-zinc-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center"><Check size={14} className="text-emerald-500" /></div>
                <div>
                  <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">A10 Sync</p>
                  <p className="text-xs sm:text-sm font-black text-emerald-600 tracking-tight leading-none">LOCKED</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-950 rounded-[32px] shadow-[0_60px_120px_rgba(0,0,0,0.4)] border border-white/[0.08] overflow-hidden relative">
              {/* Accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

              {/* Header */}
              <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Launch_Mission_Control</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-mono text-emerald-500/70 uppercase tracking-widest">LIVE</span>
                </div>
              </div>

              <div className="p-6">
                {/* Central Launch Visual */}
                <div className="relative h-[200px] flex items-center justify-center mb-6">
                  {/* Outer ring - dashed */}
                  <div className="absolute w-[190px] h-[190px] rounded-full border border-dashed border-white/[0.06]" />
                  {/* Middle ring - SVG progress */}
                  <svg className="absolute w-[160px] h-[160px]" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="74" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
                    <circle cx="80" cy="80" r="74" fill="none" stroke="url(#launch-grad)" strokeWidth="2.5" strokeDasharray="465" strokeDashoffset="140" strokeLinecap="round" transform="rotate(-90 80 80)" className="drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                    <defs>
                      <linearGradient id="launch-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#fbbf24" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* Inner ring */}
                  <div className="absolute w-[120px] h-[120px] rounded-full border border-white/[0.08]" />

                  {/* Orbiting dots */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div style={{ animation: "orbit-outer 12s linear infinite" }}>
                      <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_16px_rgba(249,115,22,0.8),0_0_40px_rgba(249,115,22,0.3)]" />
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div style={{ animation: "orbit-inner 8s linear infinite" }}>
                      <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
                    </div>
                  </div>

                  {/* Central core */}
                  <div
                    className="relative w-[90px] h-[90px] rounded-full flex flex-col items-center justify-center z-10"
                    style={{
                      animation: "core-breathe 4s ease-in-out infinite",
                      background: "radial-gradient(circle at 40% 35%, rgba(249,115,22,0.15), rgba(24,24,27,1) 70%)",
                      border: "1px solid rgba(249,115,22,0.2)"
                    }}
                  >
                    <Rocket size={20} className="text-orange-500 mb-1" />
                    <p className="text-[8px] font-mono text-orange-500/80 font-black uppercase tracking-widest">LAUNCH</p>
                    <p className="text-[14px] font-black text-white uppercase tracking-tighter leading-none">READY</p>
                  </div>

                  {/* Corner badges */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[7px] font-mono text-emerald-500/70 uppercase tracking-widest font-bold">ALL SYSTEMS GO</span>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <span className="text-[7px] font-mono text-zinc-700 uppercase tracking-widest">T-0:00:00</span>
                  </div>
                </div>

                {/* Live metrics grid */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: "Keywords", value: "2,400+", icon: <Search size={12} />, color: "text-orange-500" },
                    { label: "Index Rate", value: "98.7%", icon: <Target size={12} />, color: "text-emerald-500" },
                    { label: "BSR Delta", value: "-847", icon: <TrendingUp size={12} />, color: "text-amber-400" },
                  ].map((m, i) => (
                    <div key={i} className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06] hover:border-orange-500/20 transition-colors group">
                      <div className={`${m.color} mb-2 opacity-60 group-hover:opacity-100 transition-opacity`}>{m.icon}</div>
                      <p className="text-[15px] font-black text-white tracking-tighter leading-none mb-0.5">{m.value}</p>
                      <p className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Terminal logs - compact */}
                <div className="bg-black/30 rounded-xl border border-white/[0.04] p-3.5 font-mono text-[10px] mb-4">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2 text-orange-500/40">
                      <Terminal size={10} />
                      <span className="text-[7px] uppercase tracking-[0.3em] font-black">PROTOCOL_LOG</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
                      <span className="text-[7px] text-zinc-700 uppercase tracking-widest">STREAMING</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {logs.map((log, i) => (
                      <div
                        key={i}
                        className={`flex justify-between items-center transition-all duration-500 ${logIndex >= i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
                      >
                        <span className="text-zinc-600">{log.cmd}</span>
                        <span className={`font-bold text-[9px] ${log.resultColor}`}>{log.result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress bars */}
                <div className="space-y-2">
                  {[
                    { label: "Velocity Score",  val: "72%", pct: 72, color: "from-orange-600 to-orange-400" },
                    { label: "Authority Index", val: "91%", pct: 91, color: "from-emerald-600 to-emerald-400" },
                  ].map((bar, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 bg-white/[0.02] rounded-lg border border-white/[0.04]">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-bold w-24 shrink-0">{bar.label}</span>
                      <div className="h-1.5 flex-1 bg-white/[0.04] rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${bar.color} rounded-full shadow-[0_0_8px_rgba(249,115,22,0.3)]`} style={{ width: bar.val }} />
                      </div>
                      <span className="text-[10px] font-mono font-black text-white w-8 text-right">{bar.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Background glows */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
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
    { v: "80+",   l: "Brands Launched",    i: <Rocket size={14} />     },
    { v: "+60%",  l: "Avg Organic Lift",   i: <TrendingUp size={14} /> },
    { v: "84%",   l: "Page 1 in 30 Days",  i: <Target size={14} />     },
    { v: "A10",   l: "Algorithm Matched",  i: <Activity size={14} />   },
  ];

  return (
    <div className="bg-zinc-900 py-12 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">
          {stats.map((s, i) => (
            <div key={i} className="group relative flex flex-col border-l border-zinc-800/50 pl-8 transition-all duration-500 hover:border-orange-500/40">
              <div className="absolute top-0 left-[-1.5px] w-[3px] h-[3px] bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-orange-500/70 mb-3 group-hover:text-orange-400 transition-colors">{s.i}</div>
              <span className="text-4xl font-black text-white tracking-tighter">{s.v}</span>
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mt-1">[ {s.l} ]</span>
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
              <span className="text-[10px] lg:text-[8px] font-mono text-zinc-600 uppercase tracking-widest">SLOTS_OPEN</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   03 — WHY BRANDS FAIL (Market Friction)
   ═══════════════════════════════════════════════ */
function MarketFriction() {
  const reasons = [
    { icon: <Zap size={22} />,      title: "Zero Velocity",      desc: "Listings that sit dormant because they lack the initial sales-signal structure required to trigger the A10 discovery loop." },
    { icon: <Search size={22} />,   title: "Indexing Gaps",      desc: "Missing the semantic keyword links that connect your ASIN to high-volume, high-intent buyer searches in your category." },
    { icon: <BarChart3 size={22} />,title: "Ad Spend Bleed",     desc: "High CPCs caused by poor relevance scores and low listing quality — paying premium rates for clicks your competitors get for free." },
    { icon: <Layout size={22} />,   title: "Brand Dilution",     desc: "Generic visuals that look like every other listing, failing to command a premium price or build category brand authority." },
    { icon: <Star size={22} />,     title: "Review Deserts",     desc: "Launching with zero social proof, making it impossible to convert the expensive traffic you've paid for through PPC." },
    { icon: <Layers size={22} />,   title: "Category Mismatch",  desc: "Critical flat-file errors or category mismatches that cause Amazon to suppress your listing from relevant search results." },
  ];

  return (
    <section className="py-32 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-8 text-zinc-900 break-words">
              Why most brands<br />fail to<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">escape gravity.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-10">
              Launch failure is rarely about the product. It's about friction. Without technical precision from day one, the Amazon algorithm ignores your entry entirely.
            </p>

            <div className="space-y-6 mb-10">
              {[
                { val: "73%", label: "of new ASINs never reach page 1" },
                { val: "$8K-$15K", label: "Average failed launch costs" },
                { val: "30 Days", label: "Page 1 ranking window closes" }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-2xl font-black text-orange-500 tracking-tighter">{stat.val}</span>
                  <div className="w-[1px] h-4 bg-zinc-200" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{stat.label}</span>
                </div>
              ))}
            </div>

            <Link href="/contact" className="group flex items-center gap-3 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
              Fix my launch strategy <ArrowRight size={13} />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <div key={i} className="group bg-[#fafafa] hover:bg-white rounded-[28px] p-6 md:p-7 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/50">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mb-5 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                  {r.icon}
                </div>
                <h3 className="text-[15px] lg:text-[13px] font-black uppercase tracking-[0.12em] text-zinc-900 mb-2 group-hover:text-orange-500 transition-colors">{r.title}</h3>
                <p className="text-zinc-400 text-[13px] lg:text-xs font-light leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   04 — LAUNCH FRAMEWORK (mapped from growth automation)
   ═══════════════════════════════════════════════ */
function LaunchFramework() {
  const workflows = [
    {
      icon: <Search size={22} />,
      title: "Market Intelligence",
      desc: "Deep keyword indexing and search intent mapping to identify competitor voids and category whitespace you can dominate from day one.",
      step: "01",
      metric: "Day-1 Indexing",
      hud: "SEO_STATE: ACTIVE",
      tag: "INDEX_SYNC: 01"
    },
    {
      icon: <Layout size={22} />,
      title: "Listing Conversion Architecture",
      desc: "Structuring the visual hierarchy—Main Images, A+ Content, and copy—to aggressively convert search traffic during the critical launch velocity window.",
      step: "02",
      metric: "Top Tier CVR",
      hud: "OPTIMIZATION_PATH: 02",
      tag: "VISUAL_SYNC: 02"
    },
    {
      icon: <Zap size={22} />,
      title: "PPC Velocity Injection",
      desc: "Deploying concentrated ad spend on exact and phrase match campaigns to force algorithmic relevancy and train Amazon's algorithm to rank your ASIN.",
      step: "03",
      metric: "Sales Velocity",
      hud: "AD_ENGINE: RUNNING",
      tag: "TRAFFIC_SYNC: 03"
    },
    {
      icon: <RefreshCw size={22} />,
      title: "Inventory & Logistics Planning",
      desc: "Forecasting initial stock requirements and FBA distribution to ensure uninterrupted availability while the listing climbs organic ranks.",
      step: "04",
      metric: "Stock Stability",
      hud: "LOGIC_STATE: NOMINAL",
      tag: "OPS_SYNC: 04"
    },
  ];

  return (
    <section className="py-32 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-600/8 blur-[160px] rounded-full pointer-events-none"></div>
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <SectionLabel light>The Launch Framework</SectionLabel>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] break-words" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Engineered for <br /><span className="text-orange-500">Market</span> Dominance.
            </h2>
          </div>
          <p className="text-zinc-500 font-light max-w-sm text-base leading-relaxed">
            We don't leave launches to chance. We deploy a unified system of data, visual hierarchy, and ad momentum to force algorithmic ranking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-[40px] overflow-hidden">
          {workflows.map((w, i) => (
            <div
              key={i}
              className="group p-6 md:p-10 bg-zinc-900 hover:bg-orange-500 transition-all duration-700 relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                  backgroundSize: "6px 6px",
                }}
              ></div>

              <span className="absolute top-6 right-6 text-white/5 font-black text-5xl group-hover:text-white/15 transition-colors select-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>{w.step}</span>

              <div className="absolute inset-0 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shadow-[inset_0_0_0_1px_rgba(249,115,22,0.3)]"></div>

              <div className="relative z-10 flex flex-col h-full">
                <span className="inline-block self-start font-mono text-[8px] font-bold tracking-widest text-zinc-700 group-hover:text-white/70 border border-zinc-800 group-hover:border-white/30 px-2 py-0.5 rounded-full mb-6 transition-all duration-500">
                  {w.tag}
                </span>

                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:bg-white mb-6 transition-colors shadow-[0_0_8px_rgba(249,115,22,1)]"></div>
                <div className="text-orange-500 group-hover:text-white transition-colors mb-6">{w.icon}</div>
                <h3 className="text-xl font-bold mb-4 tracking-tight uppercase text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>{w.title}</h3>
                <p className="text-zinc-500 group-hover:text-white/80 text-sm font-light leading-relaxed mb-6 flex-1">{w.desc}</p>
                <span className="text-[10px] font-bold tracking-widest uppercase text-orange-500 group-hover:text-white/70 transition-colors font-mono">{w.metric}</span>

                <span className="absolute bottom-4 right-5 font-mono text-[7px] text-zinc-800 group-hover:text-white/20 tracking-widest transition-colors select-none">
                  {w.hud}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   04 — LAUNCH COMPARISON (Before/After)
   ═══════════════════════════════════════════════ */
function LaunchComparison() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>The Orbit Delta</SectionLabel>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Listing<br />
              <span className="text-zinc-300">Before.</span><br />
              <span className="italic font-light text-orange-500 lowercase tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                after orbit.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 font-light text-lg max-w-sm leading-relaxed pb-2">
            A visual and technical comparison of standard market entry versus the Orbit Launch System.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Traditional */}
          <div className="bg-[#fafafa] rounded-[40px] p-8 lg:p-12 border border-zinc-100 flex flex-col h-full">
            <h4 className="text-red-500 font-black text-[10px] uppercase tracking-[0.3em] mb-10 flex items-center gap-2">
              <AlertCircle size={14} /> Traditional Launch
            </h4>
            <div className="space-y-8 flex-1">
              {[
                { title: "Surface-Level SEO", desc: "Generic titles and bullet points that miss 60%+ of category search volume." },
                { title: "Static Visuals", desc: "Basic product shots that look identical to competitors. Zero brand authority." },
                { title: "Passive PPC", desc: "Auto-campaign reliance with no strategy to force organic rank velocity." },
                { title: "Backend Data Gaps", desc: "Hidden errors in flat files and category nodes that cause suppressed indexing." },
                { title: "The Honeymoon Miss", desc: "Reliance on 'wait and see' which misses the critical 30-day honeymoon window." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-200 mt-2 shrink-0" />
                  <div>
                    <h5 className="font-bold text-[15px] lg:text-sm text-zinc-400 uppercase tracking-tight mb-1">{item.title}</h5>
                    <p className="text-zinc-400 text-[13px] lg:text-xs font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Orbit */}
          <div className="bg-zinc-950 rounded-[40px] p-8 lg:p-12 border border-white/5 relative overflow-hidden group flex flex-col h-full">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-400" />
            <h4 className="text-orange-500 font-black text-[10px] uppercase tracking-[0.3em] mb-10 flex items-center gap-2">
              <CheckCircle2 size={14} /> Orbit Engineering
            </h4>
            <div className="space-y-8 relative z-10 flex-1">
              {[
                { title: "Semantic Matrix", desc: "2,400+ keywords mapped into a technical SEO architecture for Day-1 indexing." },
                { title: "Visual Conversion Funnel", desc: "High-CTR main image and 6 strategic secondary images designed to command a premium." },
                { title: "Velocity Injection", desc: "Aggressive PPC pressure-testing to force the A10 algorithm to rank your ASIN immediately." },
                { title: "Algorithm Sync", desc: "100% data coverage in flat files to ensure perfect category A9 synchronization." },
                { title: "Escape Velocity Spike", desc: "Strategic sales spikes to force rank and lock in permanent organic placement." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle2 size={16} className="text-orange-500 mt-0.5 shrink-0" />
                  <div>
                    <h5 className="font-bold text-[15px] lg:text-sm text-white uppercase tracking-tight mb-1 group-hover:text-orange-500 transition-colors">{item.title}</h5>
                    <p className="text-zinc-400 text-[13px] lg:text-xs font-light leading-relaxed group-hover:text-zinc-300 transition-colors">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-[60px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   07 — TESTIMONIAL (Specific Launch Result)
   ═══════════════════════════════════════════════ */
function LaunchTestimonial() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="bg-[#fafafa] rounded-[40px] p-8 lg:p-16 border border-zinc-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/[0.03] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-8">
              <div className="flex gap-1 mb-8">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} className="text-orange-500 fill-orange-500" />)}
              </div>
              <blockquote className="text-2xl lg:text-3xl font-bold tracking-tight text-zinc-900 leading-tight mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                "We had launched 3 products before on our own with zero success. With the Orbit Launch System, we hit <span className="text-orange-500">Page 1 for our main keyword in 11 days</span> and maintained a 28% organic sales ratio from month one."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-200 border-2 border-orange-500/20 shadow-lg">
                  <img
                    src="https://randomuser.me/api/portraits/men/44.jpg"
                    alt="KAZVOO Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[13px] font-black uppercase tracking-widest text-zinc-900">Kazvoo Electronics</p>
                  <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">Founder, KAZVOO</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 lg:border-l lg:border-zinc-200 lg:pl-12">
              <div className="flex flex-row lg:flex-col justify-between lg:justify-start gap-8 lg:gap-6">
                <div>
                  <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1">ACoS Reduction</p>
                  <p className="text-3xl font-black text-zinc-900 tracking-tighter">-34%</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1">Profit Growth</p>
                  <p className="text-3xl font-black text-orange-500 tracking-tighter">2.7x</p>
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
   05 — WHAT'S INCLUDED (deliverables grid)
   ═══════════════════════════════════════════════ */
function Deliverables() {
  const items = [
    { label: "Market Intelligence & Validation", icon: <Search size={22} />,     id: "SEQ-01", wide: true,  desc: "Phase 1: Deep category analysis, competitor keyword voids, and semantic mapping to identify high-velocity entry points." },
    { label: "Keyword Architecture & Matrix",    icon: <Terminal size={22} />,   id: "SEQ-02", wide: false, desc: "Phase 1: Technical 2,400+ term matrix across root, long-tail, and backend fields for Day-1 indexing." },
    { label: "Listing Conversion SEO",          icon: <Layers size={22} />,     id: "SEQ-03", wide: false, desc: "Phase 2: Title, bullets, and A9-compliant metadata engineered for maximum search-to-cart conversion." },
    { label: "Visual Conversion Funnel",        icon: <Camera size={22} />,     id: "SEQ-04", wide: false, desc: "Phase 3: High-CTR main image + 6 secondary images designed as a cohesive psychological sales funnel." },
    { label: "A+ & Brand Story Stack",          icon: <Layout size={22} />,     id: "SEQ-05", wide: false, desc: "Phase 3: Full module build-out including mobile-optimized A+ Content and category Brand Story." },
    { label: "Velocity PPC Injection",          icon: <Zap size={22} />,        id: "SEQ-06", wide: true,  desc: "Phase 4: Concentrated ad pressure on exact/phrase match to force algorithmic relevancy and organic rank spikes." },
    { label: "Brand Storefront Setup",          icon: <Globe size={22} />,      id: "SEQ-07", wide: true,  desc: "Phase 5: Multi-page category destination build-out with catalog navigation and shoppable collections." },
    { label: "Launch Logistics Advisory",       icon: <BarChart3 size={22} />,  id: "SEQ-08", wide: true,  desc: "Continuous: FBA first-shipment planning, inventory forecasting, and IPI/stock stability monitoring." },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      {/* Background ORBIT text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
        <span className="text-[200px] lg:text-[320px] font-black tracking-tighter text-zinc-100/50">ORBIT</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Launch Manifest</SectionLabel>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900 break-words">
              Everything in<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">your launch kit.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            Every deliverable in the Brand Launch Setup is built together as one system — not a collection of disconnected assets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className={`group relative bg-[#fafafa] hover:bg-zinc-950 border border-zinc-200 rounded-[32px] p-6 md:p-8 transition-all duration-500 overflow-hidden ${item.wide ? "md:col-span-2" : "md:col-span-1"}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-12">
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-300 group-hover:text-orange-500/50 transition-colors uppercase tracking-widest">Unit_{item.id}</span>
                </div>
                <h4 className="text-[15px] lg:text-sm font-black uppercase tracking-[0.15em] text-zinc-800 group-hover:text-white transition-colors mb-2">{item.label}</h4>
                <p className="text-[13px] lg:text-xs text-zinc-500 group-hover:text-zinc-400 font-light leading-relaxed transition-colors">{item.desc}</p>
              </div>

              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   06 — PACKAGES (with pricing)
   ═══════════════════════════════════════════════ */
function Packages() {
  const tiers = [
    {
      name: "Launchpad",
      tag: "Foundation",
      desc: "Core SEO, listing build, and keyword matrix — the minimum viable launch configuration for new ASINs.",
      features: [
        "Market & competitor analysis",
        "2,400+ keyword matrix",
        "Title, bullets & backend SEO",
        "FBA first-shipment planning",
        "Category node optimisation",
        "1 revision round",
      ],
      delivery: "5–7 Days",
    },
    {
      name: "Orbit Entry",
      tag: "Most Popular",
      desc: "The complete launch system — SEO, visuals, A+ Content, and PPC structure deployed as one unified strategy.",
      features: [
        "Everything in Launchpad",
        "Main image + 6 secondary images",
        "Standard A+ Content (5 modules)",
        "Brand Story carousel",
        "PPC launch campaign architecture",
        "Negative keyword mapping",
        "2 revision rounds",
      ],
      delivery: "10–14 Days",
      popular: true,
    },
    {
      name: "Full Orbit",
      tag: "Premium",
      desc: "Maximum market entry authority — including Brand Storefront, video, and 90-day post-launch monitoring.",
      features: [
        "Everything in Orbit Entry",
        "Premium A+ Content (7 modules)",
        "Amazon shoppable video",
        "Full Brand Storefront build",
        "90-day organic monitoring",
        "Monthly performance report",
        "3 revision rounds",
        "Dedicated launch manager",
      ],
      delivery: "3–4 Weeks",
    },
  ];

  return (
    <section id="packages" className="py-32 bg-[#fafafa] relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Pricing Tiers</SectionLabel>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900 break-words">
              Choose your<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">launch orbit.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            Every tier is a complete system — not a menu of line items. Choose the altitude that matches your ambition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <div key={i} className="relative rounded-[40px] overflow-hidden flex flex-col">
              {tier.popular && <div className="h-1 w-full bg-gradient-to-r from-orange-500 to-amber-400 shrink-0" />}
              <div className={`flex-1 border p-6 md:p-8 lg:p-10 flex flex-col transition-all duration-500 ${
                tier.popular
                  ? "bg-zinc-950 border-t-0 border-zinc-800 rounded-b-[40px] hover:border-orange-500/30"
                  : "bg-white border-zinc-100 rounded-[40px] hover:border-orange-500/20 hover:shadow-2xl hover:shadow-zinc-200/60"
              }`}>
                {tier.popular && (
                  <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 px-3 py-1.5 rounded-full mb-6 self-start">
                    <Star size={9} className="text-orange-400 fill-orange-400" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-400">Most Popular</span>
                  </div>
                )}
                <span className={`text-[9px] font-mono font-bold uppercase tracking-[0.4em] mb-2 block ${tier.popular ? "text-orange-400" : "text-orange-500"}`}>{tier.tag}</span>
                <h3 className={`text-3xl font-black tracking-tighter mb-3 ${tier.popular ? "text-white" : "text-zinc-900"}`}>{tier.name}</h3>
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
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${tier.popular ? "text-zinc-600" : "text-zinc-400"}`}>Delivery</span>
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
                    Begin Launch Sequence
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
   07 — WHO IT'S FOR
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
      icon: <Rocket size={18} />,
      label: "LAUNCH ANOMALY",
      status: "ZERO VELOCITY",
      statusColor: "text-red-500 bg-red-500/10 border-red-500/20",
      headline: "The Ghost Town Effect: Amazon doesn't know you exist.",
      subline: "Algorithmic visibility diagnostic.",
      body: "You've uploaded your product, but it's sitting on page 10. You have zero reviews, zero sales history, and zero algorithmic 'trust.' Every day you sit dormant, you're losing the critical 30-day honeymoon window where Amazon is most likely to give you a ranking boost.",
      symptoms: [
        "New ASIN launched with zero organic keyword indexing",
        "Conversion rate (USP) is effectively 0% due to lack of social proof",
        "Product is invisible for primary high-volume category searches",
      ],
      accentGradient: "from-red-500/80 to-orange-500/80",
    },
    {
      index: "02",
      icon: <Zap size={18} />,
      label: "TRAFFIC PRESSURE",
      status: "BUDGET BURN",
      statusColor: "text-orange-500 bg-orange-500/10 border-orange-500/20",
      headline: "The Ad-Spend Burn: Buying traffic that won't convert.",
      subline: "Launch efficiency analysis.",
      body: "You're running auto-campaigns to 'see what sticks,' but it's just draining your bank account. Without a technical keyword matrix, your PPC relevance score is low, forcing you to pay 3x more for clicks than your established competitors. You're funding a launch, not a business.",
      symptoms: [
        "ACoS exceeding 100% with no clear path to profitability",
        "High CPCs caused by poor listing-to-keyword relevance",
        "Lack of a surgical exact-match strategy for core keywords",
      ],
      featured: true,
      accentGradient: "from-orange-500 to-amber-500",
    },
    {
      index: "03",
      icon: <Compass size={18} />,
      label: "RANKING BLINDSPOT",
      status: "WINDOW CLOSING",
      statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      headline: "The Honeymoon Miss: The 30-day window is closing.",
      subline: "Opportunity cost diagnostic.",
      body: "The first 30 days are the easiest time to rank on Amazon. Once that window closes, the algorithm 'locks in' your rank based on initial performance. If you launch with sub-par images or incomplete SEO, you're handicapping your brand for the rest of its lifecycle.",
      symptoms: [
        "Approaching the end of the 30-80 day launch window",
        "Initial sales velocity has peaked and is beginning to decline",
        "Competitors are out-ranking you for terms you should own",
      ],
      accentGradient: "from-emerald-500/80 to-teal-500/80",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 relative z-10">
        <div className="mb-12 lg:mb-20">
          <SectionLabel>Launch Diagnostic</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 mt-4">
            <h2
              className="text-3xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Don't launch<br />
              blindfolded.
            </h2>
            <p className="text-zinc-500 text-sm lg:text-base font-light leading-relaxed max-w-md lg:text-right">
              Every failed Amazon launch follows the same three patterns. We identify the friction points before they cost you your market share.
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
                    [LAUNCH_SIGNAL_{s.index}]
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
                          LAUNCH_SCAN: {s.subline.toUpperCase()}
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
                              LAUNCH_SYMPTOMS
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
                <Rocket size={16} className="text-orange-500" />
              </div>
              <div>
                <p className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.35em] lg:tracking-[0.4em] text-orange-500 mb-1.5">Begin Launch Sequence</p>
                <p className="text-zinc-400 text-[13px] lg:text-sm font-light leading-relaxed max-w-lg">
                  Don't waste your honeymoon window. Engineer your market entry with surgical precision.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-white text-zinc-950 w-full md:w-auto px-6 lg:px-8 py-3.5 lg:py-4 rounded-full text-[10px] lg:text-[11px] font-black uppercase tracking-[0.2em] lg:tracking-[0.25em] hover:bg-orange-500 hover:text-white hover:shadow-[0_20px_50px_rgba(249,115,22,0.3)] transition-all duration-500 shrink-0 active:scale-[0.97] no-underline"
            >
              Request My Launch Strategy
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   08 — FAQ
   ═══════════════════════════════════════════════ */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: "What is the Amazon A10 algorithm launch velocity window?",                a: "Every new ASIN receives a period of elevated algorithmic visibility immediately after launch — typically 2–8 weeks. During this window, Amazon actively promotes the new listing to gauge buyer engagement. If your listing is fully optimized before launch, this translates to rapid organic rank gains that compound permanently. If you're unoptimized, that window closes and recovery takes months." },
    { q: "How long does the Brand Launch Setup take to complete?",            a: "The Launchpad tier typically completes in 5–7 business days. Orbit Entry takes 10–14 days. Full Orbit takes 3–4 weeks due to the Brand Storefront and video components. We strongly advise beginning the process 3–4 weeks before your product arrives at FBA to ensure your listing is live and indexed before your first inventory goes active." },
    { q: "Can you help if my product is already live but underperforming?",  a: "Yes — while Brand Launch Setup is designed for new entries, the methodology applies equally to existing ASINs that launched poorly. We treat it as a full re-launch: audit the current listing's indexing gaps, rebuild the keyword matrix, refresh the visual stack, and re-submit everything to trigger a fresh crawl cycle." },
    { q: "Do I need Brand Registry to use this service?",                     a: "Brand Registry is required for A+ Content, Brand Story, and Brand Storefront — included in the Orbit Entry and Full Orbit tiers. The Launchpad tier works without Brand Registry. If you're not yet enrolled, we can advise on the application process, which typically takes 2–6 weeks from trademark registration." },
    { q: "What PPC structure do you build?",                                  a: "We build a three-campaign launch structure: an exact match campaign targeting your top 20 highest-intent terms, a phrase match campaign for secondary discovery terms, and an auto campaign to mine new search term data. We include negative keyword lists mapped to irrelevant traffic patterns to ensure your launch budget is spent only on buyers." },
    { q: "How do you measure launch success?",                                a: "We track five core KPIs during the first 30 days: organic keyword rank velocity, click-through rate from search, conversion rate, ACoS (ad cost of sales), and organic-to-paid sales ratio. A successful launch shows organic sales beginning to exceed paid sales in units by day 21–30. We share a weekly performance report throughout the launch window." },
  ];

  return (
    <section className="py-32 bg-[#fafafa] border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>FAQ_Protocol</SectionLabel>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-10 text-zinc-900 break-words">
              Frequently<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">asked.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-12">
              Everything you need to know about the Brand Launch Setup process before initiating your market entry.
            </p>
            <div className="p-6 bg-white rounded-3xl border border-zinc-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Mission Debrief Available</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Every launch is unique. Our team provides a free 15-minute strategy session to map out your specific market entry approach.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-orange-500 font-bold text-[10px] uppercase tracking-widest hover:gap-3 transition-all no-underline">
                Book free session <ChevronRight size={11} />
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
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-mono transition-colors shrink-0 ${openIndex === i ? "text-orange-500" : "text-zinc-300"}`}>0{i + 1}</span>
                    <span className="text-[14px] font-bold text-zinc-900 tracking-tight">{faq.q}</span>
                  </div>
                  <div className={`shrink-0 w-8 h-8 ml-4 rounded-full flex items-center justify-center transition-all duration-500 ${
                    openIndex === i ? "bg-orange-500 text-white rotate-180" : "bg-zinc-100 text-zinc-400"
                  }`}>
                    {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                <div
                  className="transition-all duration-500 ease-in-out overflow-hidden"
                  style={{ maxHeight: openIndex === i ? "400px" : "0", opacity: openIndex === i ? 1 : 0 }}
                >
                  <div className="px-6 sm:px-8 pb-8 pt-0 ml-0 sm:ml-10 mt-2 sm:mt-0">
                    <div className="text-[14px] text-zinc-500 leading-relaxed font-light border-l-2 border-orange-500/20 pl-4 sm:pl-6">{faq.a}</div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 px-6 sm:px-8 py-6 bg-zinc-900 rounded-[24px] text-white text-center sm:text-left">
              <div className="flex items-center gap-4">
                <Terminal size={16} className="text-orange-500" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold">More_Questions?</span>
              </div>
              <Link href="/contact" className="flex items-center justify-center sm:justify-start gap-2 group no-underline w-full sm:w-auto">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">Book a Strategy Call</span>
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
   09 — CTA (Launch-themed)
   ═══════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════
   10 — FOOTER NAV
   ═══════════════════════════════════════════════ */
function FooterNav() {
  return (
    <footer className="py-24 bg-white border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Previous Service</p>
          <Link href="/service/audit-strategy" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start uppercase">
              <ArrowRight className="mr-3 group-hover:-translate-x-3 transition-transform rotate-180 size-6 md:size-6 md:size-8 shrink-0" />
              Audit & Strategy
            </h4>
          </Link>
        </div>
        <div className="hidden md:block w-px h-16 bg-zinc-100" />
        <div className="text-center md:text-right w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Service</p>
          <Link href="/service/listing-optimization" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end uppercase">
              Listing Optimization
              <ArrowRight className="ml-3 group-hover:translate-x-3 transition-transform size-6 md:size-6 md:size-8 shrink-0" />
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
export default function BrandLaunchPage() {
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <BrandLaunchHero />
      <MetricsStrip />
      <MarketFriction />
      <div className="bg-white py-4">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="h-px w-full bg-linear-to-r from-transparent via-zinc-200 to-transparent" />
        </div>
      </div>
      <LaunchComparison />
      <PriceMatrix />
      <div className="bg-[#fafafa] py-4">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="h-px w-full bg-linear-to-r from-transparent via-zinc-200 to-transparent" />
        </div>
      </div>
      <LaunchFramework />
      <Deliverables />
      <WhoItsFor />
      <ProcessSection />
      <div className="bg-white py-4">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="h-px w-full bg-linear-to-r from-transparent via-zinc-200 to-transparent" />
        </div>
      </div>
      <LaunchTestimonial />
      <FAQ />
      <LaunchCTA />
      <FooterNav />
    </div>
  );
}