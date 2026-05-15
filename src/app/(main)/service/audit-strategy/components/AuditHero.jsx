"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, TrendingUp,
  Zap, Star, ChevronRight, Plus, Minus, Terminal, Activity,
  Search, Layers, Target, AlertCircle, Calendar, BarChart3,
  Layout, TrendingDown, DollarSign, Shield, SearchCode,
  MapPin, FileText, Users, Package, Award,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "./SectionLabel";
import CheckItem from "./CheckItem";
import HeroButton from "@/components/ui/HeroButton";

export default function AuditHero() {
  const engineRef = useRef(null);

  useEffect(() => {
    if (!engineRef.current) return;
    
    // Floating animation for the whole engine
    gsap.to(engineRef.current, {
      y: -15, duration: 4, repeat: -1, yoyo: true, ease: "power1.inOut",
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#fafafa]">
      <style>{`
        @keyframes vertical-scan {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes container-scan {
          0%   { top: 0%; opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-linear-to-b from-transparent via-orange-500/[0.03] to-transparent animate-[vertical-scan_8s_linear_infinite]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="audit-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
            <circle cx="60" cy="60" r="0.5" fill="currentColor" opacity="0.5" />
            <path d="M120 0 L120 120 M0 120 L120 120" stroke="currentColor" strokeWidth="0.2" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#audit-grid)" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(249,115,22,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#fafafa] to-[#fafafa]" />
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
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
                  <div className="w-4 h-[1px] bg-orange-500 self-center" />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
                  Audit Intelligence Protocol
                </span>
              </div>

              <h1
                className="text-5xl md:text-7xl lg:text-[85px] font-black tracking-tighter leading-[0.9] mb-10 text-zinc-900 uppercase"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Stop<br />
                <span className="text-orange-500">Spending.</span><br />
                <span
                  className="italic font-light lowercase tracking-tight text-zinc-300"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  start scaling.
                </span>
              </h1>

              <div className="flex gap-6 mb-12">
                <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50" />
                <div>
                  <p className="text-lg md:text-[22px] text-zinc-500 font-light leading-relaxed max-w-xl mb-6">
                    Most Amazon brands waste <span className="text-zinc-900 font-semibold">22% of their ad spend</span> on non-converting keywords. Our Orbit Diagnostic is the surgical strike that cuts waste and rebuilds your account for scalable profit.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                       <span>Latency: 0.04ms</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Terminal size={10} className="text-orange-500/50" />
                       <span>Core_Active: TRUE</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  "72-hour deep-dive account autopsy",
                  "Identify wasted spend & untapped keywords",
                  "Competitor reverse-engineering report",
                  "24-month execution roadmap delivered",
                ].map((item, i) => <CheckItem key={i}>{item}</CheckItem>)}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mb-12">
                <HeroButton href="/contact" className="w-full flex justify-center sm:inline-flex sm:w-auto">
                  Book Your Free Diagnostic
                </HeroButton>
                <a href="#packages" className="group flex items-center justify-center gap-3 text-zinc-400 hover:text-zinc-900 font-bold text-[11px] uppercase tracking-widest px-2 py-4 transition-colors no-underline">
                  View Packages <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {[
                  { icon: <Shield size={11} />,      label: "Guaranteed $10K+ Insight" },
                  { icon: <Activity size={11} />,    label: "72-Hour Delivery"          },
                  { icon: <Zap size={11} />,         label: "150+ Audits Performed"    },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2">
                    <span className="text-orange-500">{b.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{b.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-10 mt-10 pt-10 border-t border-zinc-100">
                {[
                  { label: "Audits Performed",   val: "150+"   },
                  { label: "Avg Waste Recovery",  val: "$4.2K"  },
                  { label: "ROAS Lift (avg)",     val: "+2.4x"  },
                ].map((t, i) => (
                  <div key={i}>
                    <p className="text-xl font-black tracking-tighter text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>{t.val}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Diagnostic Mission Control */}
          <div className="lg:col-span-5 relative block mt-0 lg:mt-[70px] scale-[0.95] sm:scale-100 origin-top lg:origin-center" ref={engineRef}>
            <style>{`
              @keyframes orbit-scan-outer { 0% { transform: rotate(0deg) translateX(95px) rotate(0deg); } 100% { transform: rotate(360deg) translateX(95px) rotate(-360deg); } }
              @keyframes orbit-scan-inner { 0% { transform: rotate(0deg) translateX(60px) rotate(0deg); } 100% { transform: rotate(-360deg) translateX(60px) rotate(360deg); } }
              @keyframes core-scan { 0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.15); } 50% { box-shadow: 0 0 30px 8px rgba(249,115,22,0.12); } }
              @keyframes radar-sweep { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
              @keyframes log-stream { 0% { opacity: 0; transform: translateX(-8px); } 100% { opacity: 1; transform: translateX(0); } }
            `}</style>

            {/* Floating metric card - top right */}
            <div className="absolute -top-8 -right-2 lg:-right-4 bg-white rounded-[20px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.08)] z-30 border border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-[0_8px_20px_rgba(249,115,22,0.3)]"><TrendingUp size={18} /></div>
                <div>
                  <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">ROAS Lift</p>
                  <p className="text-lg font-black text-zinc-900 tracking-tighter leading-none">+2.4x</p>
                </div>
              </div>
            </div>

            {/* Floating metric card - bottom left */}
            <div className="absolute -left-4 lg:-left-10 bottom-[60px] bg-zinc-900 rounded-2xl px-5 py-4 z-30 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
                <div>
                  <p className="text-[7px] font-mono font-bold uppercase tracking-[0.25em] text-zinc-500">Waste Recovered</p>
                  <p className="text-lg sm:text-xl font-black text-white leading-none tracking-tighter">$2.4M</p>
                </div>
              </div>
            </div>

            {/* Floating metric card - bottom right */}
            <div className="absolute -right-2 lg:-right-6 bottom-[-30px] bg-white rounded-2xl px-5 py-3.5 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-zinc-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center"><AlertCircle size={14} className="text-red-500" /></div>
                <div>
                  <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Waste Found</p>
                  <p className="text-xs sm:text-sm font-black text-red-600 tracking-tight leading-none">-34%</p>
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
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Audit_Diagnostic_v3</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-mono text-emerald-500/70 uppercase tracking-widest">LIVE</span>
                </div>
              </div>

              <div className="p-6">
                {/* Central Diagnostic Visual — radar ring */}
                <div className="relative h-[200px] flex items-center justify-center mb-6">
                  {/* Outer ring - dashed */}
                  <div className="absolute w-[190px] h-[190px] rounded-full border border-dashed border-white/[0.06]" />
                  {/* Middle ring - SVG progress */}
                  <svg className="absolute w-[160px] h-[160px]" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="74" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
                    <circle cx="80" cy="80" r="74" fill="none" stroke="url(#audit-grad)" strokeWidth="2.5" strokeDasharray="465" strokeDashoffset="70" strokeLinecap="round" transform="rotate(-90 80 80)" className="audit-circle-ring drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                    <defs>
                      <linearGradient id="audit-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="50%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#fbbf24" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* Inner ring */}
                  <div className="absolute w-[120px] h-[120px] rounded-full border border-white/[0.08]" />

                  {/* Orbiting dots */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div style={{ animation: "orbit-scan-outer 10s linear infinite" }}>
                      <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_16px_rgba(239,68,68,0.8),0_0_40px_rgba(239,68,68,0.3)]" />
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div style={{ animation: "orbit-scan-inner 7s linear infinite" }}>
                      <div className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.8)]" />
                    </div>
                  </div>

                  {/* Central core — Shield */}
                  <div
                    className="relative w-[90px] h-[90px] rounded-full flex flex-col items-center justify-center z-10"
                    style={{
                      animation: "core-scan 3s ease-in-out infinite",
                      background: "radial-gradient(circle at 40% 35%, rgba(239,68,68,0.12), rgba(24,24,27,1) 70%)",
                      border: "1px solid rgba(249,115,22,0.2)"
                    }}
                  >
                    <SearchCode size={20} className="text-orange-500 mb-1" />
                    <p className="text-[8px] font-mono text-orange-500/80 font-black uppercase tracking-widest">AUDIT</p>
                    <p className="text-[14px] font-black text-white uppercase tracking-tighter leading-none">85.4%</p>
                  </div>

                  {/* Corner badges */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[7px] font-mono text-red-500/70 uppercase tracking-widest font-bold">WASTE DETECTED</span>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <span className="text-[7px] font-mono text-zinc-700 uppercase tracking-widest">SCAN: 85.4%</span>
                  </div>
                </div>

                {/* Live metrics grid */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: "Wasted Spend", value: "$4.2K", icon: <DollarSign size={12} />, color: "text-red-500" },
                    { label: "Efficiency", value: "85.4%", icon: <Shield size={12} />, color: "text-orange-500" },
                    { label: "Competitors", value: "5", icon: <Target size={12} />, color: "text-amber-400" },
                  ].map((m, i) => (
                    <div key={i} className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06] hover:border-orange-500/20 transition-colors group">
                      <div className={`${m.color} mb-2 opacity-60 group-hover:opacity-100 transition-opacity`}>{m.icon}</div>
                      <p className="text-[15px] font-black text-white tracking-tighter leading-none mb-0.5">{m.value}</p>
                      <p className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Diagnostic logs — streaming */}
                <div className="bg-black/30 rounded-xl border border-white/[0.04] p-3.5 font-mono text-[10px] mb-4">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2 text-orange-500/40">
                      <Terminal size={10} />
                      <span className="text-[7px] uppercase tracking-[0.3em] font-black">DIAGNOSTIC_LOG</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
                      <span className="text-[7px] text-zinc-700 uppercase tracking-widest">STREAMING</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { cmd: "> trace_keyword_waste", result: "34% WASTE", resultColor: "text-red-400" },
                      { cmd: "> iso_audit_v2", result: "[SCANNING]", resultColor: "text-orange-500 animate-pulse" },
                      { cmd: "> roas_trajectory", result: "2.4x TARGET", resultColor: "text-emerald-400" },
                      { cmd: "> competitor_map", result: "5 RIVALS", resultColor: "text-orange-400" },
                    ].map((log, i) => (
                      <div key={i} className="flex justify-between items-center" style={{ animation: `log-stream 0.5s ease-out ${i * 0.15}s both` }}>
                        <span className="text-zinc-600">{log.cmd}</span>
                        <span className={`font-bold text-[9px] ${log.resultColor}`}>{log.result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress bars */}
                <div className="space-y-2">
                  {[
                    { label: "Scan Progress", val: "85%", pct: 85, color: "from-orange-600 to-orange-400" },
                    { label: "Waste Index",   val: "34%", pct: 34, color: "from-red-600 to-red-400" },
                    { label: "ROAS Signal",   val: "91%", pct: 91, color: "from-emerald-600 to-emerald-400" },
                  ].map((bar, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 bg-white/[0.02] rounded-lg border border-white/[0.04]">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-bold w-24 shrink-0">{bar.label}</span>
                      <div className="h-1.5 flex-1 bg-white/[0.04] rounded-full overflow-hidden">
                        <div className={`efficiency-bar h-full bg-gradient-to-r ${bar.color} rounded-full shadow-[0_0_8px_rgba(249,115,22,0.3)]`} style={{ width: bar.val }} />
                      </div>
                      <span className="text-[10px] font-mono font-black text-white w-8 text-right">{bar.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Background glows */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-500/5 rounded-full blur-[80px] pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
