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
   04 — WHO THIS DEFENDS  ← NEW SECTION
   ═══════════════════════════════════════════════ */
export default function WhoItsFor() {
  const profiles = [
    {
      icon: <TrendingUp size={22} />,
      tag: "Growth-Stage Brands",
      headline: "You've got momentum. Don't let operations kill it.",
      desc: "Revenue is climbing but your account infrastructure hasn't kept pace. One hijacker or an unnoticed policy flag can unravel months of ranking progress. You need a defense layer before the first crisis hits.",
      signals: ["$300K–$3M annual revenue", "Strong organic velocity", "No active monitoring in place"],
      accent: "from-orange-500 to-amber-400",
    },
    {
      icon: <ShieldCheck size={22} />,
      tag: "Category Leaders",
      headline: "At the top, every competitor targets you.",
      desc: "Maintaining category dominance is a full-time defensive operation. Hijackers, listing suppressions, and TOS traps are not a matter of if — they're a matter of when. We make sure 'when' never becomes 'now'.",
      signals: ["Top 3 BSR in category", "High branded search volume", "Active competitor targeting"],
      accent: "from-rose-500 to-orange-500",
      featured: true,
    },
    {
      icon: <Package size={22} />,
      tag: "Multi-ASIN Operators",
      headline: "Complex catalogs demand systematic protection.",
      desc: "You can't manually monitor 40 ASINs for compliance, inventory drift, and policy flags. Our systems do it automatically — flagging risk across your entire catalog before it becomes a crisis.",
      signals: ["20+ ASIN catalog", "Multiple sub-categories", "FBA + FBM complexity"],
      accent: "from-violet-500 to-orange-400",
    },
  ];

  return (
    <section className="py-32 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <SectionLabel>Ideal_Client_Profile</SectionLabel>
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-6 text-zinc-900"
            >
              Who this<br />
              <span className="italic font-serif text-zinc-300 lowercase tracking-normal">defends.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-sm pb-2">
            Account Operations isn't for every seller. It's built for Amazon brands at the stage where unguarded accounts become the single biggest threat to continued growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {profiles.map((p, i) => (
            <div
              key={i}
              className={`group relative rounded-[40px] overflow-hidden transition-all duration-500 hover:shadow-2xl ${
                p.featured ? "hover:shadow-orange-500/15 ring-1 ring-orange-500/20" : "hover:shadow-zinc-200/80"
              }`}
            >
              <div className={`h-1 w-full bg-gradient-to-r ${p.accent}`} />
              <div className={`h-full border border-t-0 rounded-b-[40px] p-8 lg:p-10 transition-all duration-500 ${
                p.featured ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-100 group-hover:border-orange-500/15"
              }`}>
                {p.featured && (
                  <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 px-3 py-1.5 rounded-full mb-6">
                    <Star size={9} className="text-orange-400 fill-orange-400" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-400">Most Common Fit</span>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    p.featured
                      ? "bg-orange-500/15 border border-orange-500/30 text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500"
                      : "bg-zinc-50 border border-zinc-200 text-orange-500 group-hover:border-orange-500/30 group-hover:shadow-lg group-hover:shadow-orange-500/10"
                  }`}>{p.icon}</div>
                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${p.featured ? "text-orange-400" : "text-orange-500"}`}>{p.tag}</span>
                </div>
                <h3 className={`text-xl font-black uppercase tracking-tight leading-tight mb-4 ${
                  p.featured ? "text-white" : "text-zinc-900 group-hover:text-orange-500 transition-colors"
                }`}>{p.headline}</h3>
                <p className={`text-sm font-light leading-relaxed mb-8 ${p.featured ? "text-zinc-400" : "text-zinc-500"}`}>{p.desc}</p>
                <div className="space-y-2">
                  <p className={`text-[9px] font-black uppercase tracking-[0.3em] mb-3 ${p.featured ? "text-zinc-600" : "text-zinc-400"}`}>You're likely this if —</p>
                  {p.signals.map((s, j) => (
                    <div key={j} className={`flex items-center gap-3 py-2 border-t ${p.featured ? "border-white/5" : "border-zinc-50"}`}>
                      <div className="w-1 h-1 rounded-full bg-orange-500 shrink-0" />
                      <span className={`text-xs font-light ${p.featured ? "text-zinc-500" : "text-zinc-400"}`}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] text-zinc-400 font-light mt-10">
          Not sure if you need this level of defense?{" "}
          <Link href="/service/orbit-diagnostic" className="text-orange-500 font-bold hover:underline">Run an Orbit Diagnostic first →</Link>
        </p>
      </div>
    </section>
  );
}

