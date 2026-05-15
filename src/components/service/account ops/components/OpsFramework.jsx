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
   05 — FRAMEWORK (DARK)
   ═══════════════════════════════════════════════ */
export default function OpsFramework() {
  const pillars = [
    { step: "01", icon: <Activity size={22} />,   title: "Real-time Detection",  desc: "Proprietary signals monitor buy-box health, pricing shifts, and listing status every 60 seconds.", tag: "MONITOR_LIVE", metric: "60s interval",    hud: "STATUS: SCANNING" },
    { step: "02", icon: <ShieldCheck size={22} />, title: "Policy Vigilance",     desc: "Daily checks against Amazon's ToS and internal policy shifts to preempt account warnings.",         tag: "POLICY_SCAN",  metric: "Daily checks",   hud: "STATUS: SECURE" },
    { step: "03", icon: <Zap size={22} />,         title: "Rapid Neutralization", desc: "Immediate enforcement protocols for unauthorized sellers and IP infringements via Brand Registry.",  tag: "ENFORCE_IP",   metric: "Sub-14m SLA",    hud: "STATUS: READY" },
    { step: "04", icon: <Lock size={22} />,        title: "Asset Protection",     desc: "Robust management of Brand Registry, trademarks, and patents to build a moat around your ASINs.",    tag: "MOAT_BUILD",   metric: "100% ownership", hud: "STATUS: FORTIFIED" },
  ];

  return (
    <section className="py-20 md:py-32 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-500/[0.08] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-20">
          <div>
            <SectionLabel>The Infrastructure</SectionLabel>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              Defense in <br />
              <span className="italic font-serif text-zinc-500 lowercase tracking-normal">depth.</span>
            </h2>
          </div>
          <p className="text-zinc-400 font-light max-w-sm text-sm leading-relaxed pb-2">
            Amazon is a hostile environment. We treat your account as a high-value asset, applying sophisticated risk management protocols to every operational process.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-[28px] md:rounded-[40px] overflow-hidden">
          {pillars.map((p, i) => (
            <div key={i} className="group p-7 md:p-10 bg-zinc-900 hover:bg-orange-500 transition-all duration-700 relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "6px 6px" }} />
              <span className="absolute top-6 right-6 text-white/5 font-black text-5xl group-hover:text-white/15 transition-colors select-none">{p.step}</span>
              <div className="relative z-10 flex flex-col h-full">
                <span className="inline-block self-start font-mono text-[8px] font-bold tracking-widest text-zinc-700 group-hover:text-white/70 border border-zinc-800 group-hover:border-white/30 px-2 py-0.5 rounded-full mb-6 transition-all duration-500 uppercase">{p.tag}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:bg-white mb-6 transition-colors" />
                <div className="text-orange-500 group-hover:text-white transition-colors mb-6">{p.icon}</div>
                <h3 className="text-lg md:text-xl font-bold mb-4 tracking-tight uppercase text-white">{p.title}</h3>
                <p className="text-zinc-500 group-hover:text-white/80 text-[13px] sm:text-sm font-light leading-relaxed mb-6 flex-1">{p.desc}</p>
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

