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
   03 — THE PROBLEM
   FIX: removed broken bg-linear-to-b gradient → clean bg-white + top accent
   ═══════════════════════════════════════════════ */
export default function TheProblem() {
  const problems = [
    { num: "01", icon: <ShieldAlert size={20} />, riskType: "HIJACKER_CHAOS", title: "Hijacker Chaos",        desc: "Unauthorized sellers on your listings erode buy-box percentage and destroy brand reputation with counterfeit goods." },
    { num: "02", icon: <AlertCircle size={20} />, riskType: "SUPPRESSION",    title: "Suppression Risk",     desc: "Amazon's bots can suppress high-volume listings for minor policy nuances. Without 24/7 vigilance, revenue vanishes." },
    { num: "03", icon: <TrendingDown size={20} />,riskType: "INVENTORY",      title: "Inventory Gaps",       desc: "Out-of-stock events are penalized by the A9 algorithm for months. We manage the logistics that prevent stock-outs." },
    { num: "04", icon: <EyeOff size={20} />,      riskType: "COMPLIANCE",     title: "Compliance Blindness", desc: "TOS changes are frequent and unannounced. Missing one update can lead to account-level warnings or suspension." },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-orange-50/60 via-orange-50/30 to-white relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-start">
          <div className="lg:sticky lg:top-32">
            <SectionLabel>The Diagnostic</SectionLabel>
            <h2
              className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.88] mb-6 md:mb-8 text-zinc-900"
            >
              WHAT BREAKS<br />
              <span className="italic font-light lowercase tracking-normal text-zinc-300" style={{ fontFamily: "'Playfair Display', serif" }}>
                when nobody's watching.
              </span>
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-md mb-8">
              Success on Amazon creates its own problems. As you scale, your brand becomes a target for hijackers and a victim of complex policy traps.
            </p>
            <div className="inline-flex items-center gap-2.5 bg-orange-500 text-white px-5 py-2.5 rounded-full">
              <ShieldAlert size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Active Defense Required</span>
            </div>
          </div>

          <div className="space-y-4 md:space-y-5">
            {problems.map((p, i) => (
              <div key={i} className="group bg-white rounded-[20px] md:rounded-[32px] p-8 md:p-8 border border-zinc-100/80 shadow-[0_10px_20px_rgba(0,0,0,0.06)] hover:border-orange-500/20 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden">
                <div className="flex items-center justify-between mb-5 sm:mb-5">
                  <span className="font-mono text-[8px] font-bold tracking-widest text-zinc-300 uppercase">RISK_TYPE: {p.riskType}</span>
                  <span className="font-mono text-[9px] font-bold text-orange-500 tracking-widest">{p.num}</span>
                </div>
                <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-4 mb-4 sm:mb-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">{p.icon}</div>
                  <div className="pt-1.5">
                    <h3 className="font-black text-base md:text-[17px] uppercase tracking-tight text-zinc-900 leading-tight group-hover:text-orange-500 transition-colors">{p.title}</h3>
                  </div>
                </div>
                <p className="text-zinc-500 text-[11px] sm:text-xs md:text-[13px] font-light leading-relaxed pl-0 sm:pl-14">{p.desc}</p>
                <div className="absolute bottom-0 left-7 right-7 h-px bg-orange-500/0 group-hover:bg-orange-500/20 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
