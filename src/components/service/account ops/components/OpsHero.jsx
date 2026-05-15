import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, ShieldCheck, Bell, Lock, ShieldAlert, AlertCircle,
  TrendingDown, EyeOff, Activity, Zap, CheckCircle2,
  Package, Globe, Search, Gavel, HeartPulse, BarChart3,
  ShieldHalf, Radar, Scale, ChevronRight, Terminal,
  Plus, Minus, TrendingUp, Star
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroButton from "@/components/ui/HeroButton";

import SectionLabel from "./SectionLabel";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);
/* ═══════════════════════════════════════════════
   01 — HERO
   ═══════════════════════════════════════════════ */
export default function OpsHero() {
  const engineRef = useRef(null);

  useEffect(() => {
    gsap.to(engineRef.current, {
      y: -15, duration: 4, repeat: -1, yoyo: true, ease: "power1.inOut",
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#fafafa]">
      <style>{`
        @keyframes vertical-scan-orange {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent animate-[vertical-scan-orange_8s_linear_infinite]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="ops-pattern" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
            <circle cx="60" cy="60" r="0.5" fill="currentColor" opacity="0.5" />
            <path d="M120 0 L120 120 M0 120 L120 120" stroke="currentColor" strokeWidth="0.2" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#ops-pattern)" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(79,70,229,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fafafa] to-[#fafafa]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left */}
          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-6 md:-inset-10 z-0 pointer-events-none border-l border-t border-zinc-200/50 rounded-tl-[60px] md:rounded-tl-[100px] opacity-40">
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-orange-500 rounded-tl-xl -translate-x-px -translate-y-px" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-zinc-200 rounded-full translate-x-1 -translate-y-1" />
            </div>
            <div className="relative z-10">
              <SectionLabel>Strategic Defense System</SectionLabel>

              <h1
                className="text-4xl sm:text-6xl md:text-8xl lg:text-[85px] font-black tracking-tighter leading-[0.9] md:leading-[0.85] mb-8 md:mb-10 text-zinc-900 uppercase text-left"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Account <span className="text-orange-500">Operations</span> <br />
                <span
                  className="italic font-light lowercase tracking-tight text-zinc-300"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  defense.
                </span>
              </h1>

              <div className="flex gap-6 mb-10 md:mb-12 text-left">
                <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50" />
                <div>
                  <p className="text-base sm:text-lg md:text-[22px] text-zinc-900 font-bold leading-relaxed max-w-xl mb-4">
                    Your account runs. Nothing breaks.
                  </p>
                  <p className="text-base sm:text-lg md:text-[18px] text-zinc-500 font-light leading-relaxed max-w-xl mb-6">
                    Protecting your brand's health is our highest priority. We provide full-service operational defense, from monitoring metrics to managing high-stakes logistical workflows.
                  </p>
                  <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Monitoring: Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={10} className="text-orange-500/50" />
                      <span>Defense_Core: Engaged</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-left">
                {[
                  { icon: <ShieldCheck size={32} />, title: "24/7 Monitoring",   sub: "Continuous health check." },
                  { icon: <Bell size={32} />,        title: "Real-time Alerts",  sub: "Instant threat detection." },
                  { icon: <Lock size={32} />,        title: "Policy Protection", sub: "TOS compliance engine." },
                  { icon: <Activity size={32} />,    title: "Metrics Tracking",  sub: "Performance analytics." },
                ].map((h, i) => (
                  <div key={i} className="relative group bg-white rounded-[20px] md:rounded-[24px] p-5 border border-zinc-100 hover:border-orange-500/20 hover:shadow-lg hover:shadow-zinc-200/50 transition-all duration-300 overflow-hidden text-left">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mb-3" />
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-900 mb-1 leading-tight">{h.title}</p>
                    <p className="text-[11px] text-zinc-400 font-light leading-snug">{h.sub}</p>
                    <div className="absolute bottom-3 right-3 text-zinc-100 group-hover:text-orange-500/10 transition-colors">{h.icon}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:gap-6 mb-12">
                <HeroButton
                  href="/contact"
                  className="w-full sm:w-auto text-center justify-center"
                >
                  Secure Your Account
                </HeroButton>

                <a
                  href="#packages"
                  className="group flex items-center justify-center sm:justify-start gap-3 text-zinc-400 hover:text-zinc-900 font-bold text-[11px] uppercase tracking-widest px-2 py-4 transition-colors no-underline"
                >
                  View Packages <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Trust micro-badges */}
              <div className="flex flex-wrap items-center gap-3 text-left">
                {[
                  { icon: <ShieldCheck size={11} />, label: "Amazon Specialists" },
                  { icon: <Activity size={11} />,    label: "Account Monitoring" },
                  { icon: <Lock size={11} />,        label: "Compliance Experts" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2">
                    <span className="text-orange-500">{b.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{b.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-x-10 gap-y-6 mt-10 pt-10 border-t border-zinc-100 text-left">
                {[
                  { label: "Accounts Secured", val: "40+" },
                  { label: "Policy Checks/Wk", val: "100+" },
                  { label: "Response SLA",     val: "<14m" },
                ].map((t, i) => (
                  <div key={i} className="min-w-[100px]">
                    <p className="text-xl font-black tracking-tighter text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>{t.val}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Security Fortress Dashboard */}
          <div className="lg:col-span-5 relative block mt-0 lg:mt-[70px] scale-[0.95] lg:scale-100 origin-top lg:origin-center" ref={engineRef}>
            <style>{`
              @keyframes shield-sweep { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
              @keyframes threat-ping { 0%, 100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.6); opacity: 0; } }
              @keyframes shield-breathe { 0%, 100% { box-shadow: 0 0 0 0 rgba(6,182,212,0.1); } 50% { box-shadow: 0 0 40px 15px rgba(6,182,212,0.08); } }
              @keyframes status-slide { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }
              @keyframes bar-fill { from { width: 0; } }
            `}</style>

            {/* Floating card - top right: Security Score */}
            <div className="absolute -top-8 -right-2 lg:-right-4 bg-white rounded-[20px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.08)] z-30 border border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white shadow-[0_8px_20px_rgba(6,182,212,0.3)]"><ShieldCheck size={18} /></div>
                <div>
                  <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Security</p>
                  <p className="text-lg font-black text-zinc-900 tracking-tighter leading-none">99.8%</p>
                </div>
              </div>
            </div>

            {/* Floating card - bottom left: Threats Blocked */}
            <div className="absolute -left-4 lg:-left-10 bottom-[60px] bg-zinc-900 rounded-2xl px-5 py-4 z-30 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
                <div>
                  <p className="text-[7px] font-mono font-bold uppercase tracking-[0.25em] text-zinc-500">Threats Blocked</p>
                  <p className="text-lg sm:text-xl font-black text-white leading-none tracking-tighter">247</p>
                </div>
              </div>
            </div>

            {/* Floating card - bottom right: Response SLA */}
            <div className="absolute -right-2 lg:-right-6 bottom-[-30px] bg-white rounded-2xl px-5 py-3.5 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-zinc-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center"><Zap size={14} className="text-cyan-500" /></div>
                <div>
                  <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Response</p>
                  <p className="text-xs sm:text-sm font-black text-cyan-600 tracking-tight leading-none">&lt;14 min</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-950 rounded-[32px] shadow-[0_60px_120px_rgba(0,0,0,0.4)] border border-white/[0.08] overflow-hidden relative">
              {/* Top accent — cyan for security identity */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

              {/* Header */}
              <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Defense_Shield_v3</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-[8px] font-mono text-cyan-500/70 uppercase tracking-widest">ARMED</span>
                </div>
              </div>

              <div className="p-6">
                {/* Shield Defense Rings */}
                <div className="relative h-[180px] flex items-center justify-center mb-6">
                  {/* Outer ring */}
                  <div className="absolute w-[170px] h-[170px] rounded-full border border-dashed border-white/[0.06]" />
                  {/* Scanner sweep */}
                  <svg className="absolute w-[170px] h-[170px]" viewBox="0 0 170 170" style={{ animation: "shield-sweep 8s linear infinite" }}>
                    <defs>
                      <linearGradient id="ops-sweep-grad" x1="50%" y1="0%" x2="50%" y2="100%">
                        <stop offset="0%" stopColor="rgba(6,182,212,0.3)" />
                        <stop offset="100%" stopColor="rgba(6,182,212,0)" />
                      </linearGradient>
                    </defs>
                    <path d="M85,85 L85,0 A85,85,0,0,1,170,85 Z" fill="url(#ops-sweep-grad)" opacity="0.3" />
                  </svg>
                  {/* Middle ring - SVG arc */}
                  <svg className="absolute w-[140px] h-[140px]" viewBox="0 0 140 140">
                    <circle cx="70" cy="70" r="64" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
                    <circle cx="70" cy="70" r="64" fill="none" stroke="url(#ops-shield-arc-grad)" strokeWidth="2.5" strokeDasharray="402" strokeDashoffset="8" strokeLinecap="round" transform="rotate(-90 70 70)" className="drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                    <defs>
                      <linearGradient id="ops-shield-arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#14b8a6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* Inner ring */}
                  <div className="absolute w-[100px] h-[100px] rounded-full border border-white/[0.08]" />

                  {/* Threat ping dots */}
                  <div className="absolute top-[15%] right-[20%]">
                    <div className="w-2 h-2 rounded-full bg-red-500" style={{ animation: "threat-ping 3s ease-out 0s infinite" }} />
                  </div>
                  <div className="absolute bottom-[25%] left-[18%]">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" style={{ animation: "threat-ping 3s ease-out 1.5s infinite" }} />
                  </div>

                  {/* Central Shield Core */}
                  <div
                    className="relative w-[80px] h-[80px] rounded-full flex flex-col items-center justify-center z-10"
                    style={{
                      animation: "shield-breathe 4s ease-in-out infinite",
                      background: "radial-gradient(circle at 40% 35%, rgba(6,182,212,0.12), rgba(24,24,27,1) 70%)",
                      border: "1px solid rgba(6,182,212,0.25)"
                    }}
                  >
                    <Lock size={18} className="text-cyan-400 mb-1" />
                    <p className="text-[7px] font-mono text-cyan-500/80 font-black uppercase tracking-widest">SHIELD</p>
                    <p className="text-[13px] font-black text-white uppercase tracking-tighter leading-none">ACTIVE</p>
                  </div>

                  {/* Corner labels */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-[7px] font-mono text-cyan-500/70 uppercase tracking-widest font-bold">PERIMETER SECURE</span>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <span className="text-[7px] font-mono text-zinc-700 uppercase tracking-widest">24/7 WATCH</span>
                  </div>
                </div>

                {/* Live Threat Log */}
                <div className="bg-white/[0.03] rounded-2xl border border-white/[0.06] p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Threat Monitor</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[7px] font-mono text-emerald-500/80 uppercase tracking-widest">ALL CLEAR</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { event: "Hijacker scan — B08XYZ", result: "BLOCKED", severity: "text-red-400", bg: "bg-red-500" },
                      { event: "Policy audit — 14 SKUs", result: "SCANNING", severity: "text-cyan-400 animate-pulse", bg: "bg-cyan-500" },
                      { event: "TOS compliance check", result: "PASSED", severity: "text-emerald-400", bg: "bg-emerald-500" },
                      { event: "Suppression monitor", result: "CLEAR", severity: "text-emerald-400", bg: "bg-emerald-500" },
                    ].map((t, i) => (
                      <div key={i} className="flex items-center gap-3 py-2 border-b border-white/[0.03] last:border-0" style={{ animation: `status-slide 0.4s ease-out ${i * 0.1}s both` }}>
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${t.bg}`} />
                        <span className="text-[9px] font-mono text-zinc-400 flex-1 truncate">{t.event}</span>
                        <span className={`text-[8px] font-mono font-bold ${t.severity}`}>{t.result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Account Health Segments */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: "Health Score", value: "99.8%", icon: <HeartPulse size={12} />, color: "text-cyan-400" },
                    { label: "Policy Risk", value: "0.2%", icon: <ShieldAlert size={12} />, color: "text-emerald-400" },
                    { label: "Scans/Week", value: "100+", icon: <Radar size={12} />, color: "text-orange-400" },
                  ].map((m, i) => (
                    <div key={i} className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06] hover:border-cyan-500/20 transition-colors group">
                      <div className={`${m.color} mb-2 opacity-60 group-hover:opacity-100 transition-opacity`}>{m.icon}</div>
                      <p className="text-[15px] font-black text-white tracking-tighter leading-none mb-0.5">{m.value}</p>
                      <p className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Defense Layers Bar */}
                <div className="bg-white/[0.02] rounded-xl border border-white/[0.04] p-3 flex items-center gap-3">
                  <div className="flex items-center gap-2 shrink-0">
                    <ShieldHalf size={12} className="text-cyan-500/60" />
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Defense Layer</span>
                  </div>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/[0.04]">
                    <div className="h-full w-[99.8%] rounded-full bg-gradient-to-r from-cyan-600 to-teal-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]" style={{ animation: "bar-fill 2s ease-out both" }} />
                  </div>
                  <span className="text-[9px] font-mono font-black text-cyan-400 shrink-0">99.8%</span>
                </div>
              </div>
            </div>

            {/* Background glows */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-500/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
