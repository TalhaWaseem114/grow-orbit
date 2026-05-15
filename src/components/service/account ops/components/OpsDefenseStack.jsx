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
   06 — WHAT WE PROTECT (merged from LogisticsOps + OpsTechStack)
   Both sections listed the exact same 6 items — now one
   tighter split: sticky terminal left + card grid right
   ═══════════════════════════════════════════════ */
export default function OpsDefenseStack() {
  const deliverables = [
    { icon: <ShieldHalf size={20} />, title: "Brand Registry Defense",      desc: "Full enrollment and ongoing management of Brand Registry, including trademark filing assistance.",      tag: "BRAND_REG",  prevents: "Prevents counterfeits & listing hijacks" },
    { icon: <Package size={20} />,    title: "Inventory Optimization",       desc: "Demand forecasting, reorder management, and FBA coordination to eliminate stock-out events.",           tag: "INVENTORY",  prevents: "Prevents ranking loss from OOS events" },
    { icon: <Globe size={20} />,      title: "Global Compliance Monitoring", desc: "Policy tracking across NA, EU, and APAC marketplaces with proactive alert systems.",                    tag: "COMPLIANCE", prevents: "Prevents region-specific account warnings" },
    { icon: <Search size={20} />,     title: "TOS Change Detection",         desc: "Automated scanning of Amazon's Terms of Service with instant alerts on policy changes.",                 tag: "TOS_SCAN",   prevents: "Prevents violations from unnoticed TOS updates" },
    { icon: <Gavel size={20} />,      title: "Automated C&D Protocols",      desc: "Streamlined cease-and-desist workflows for IP violations with integrated legal documentation.",          tag: "LEGAL_OPS",  prevents: "Prevents IP theft and unauthorized resellers" },
    { icon: <HeartPulse size={20} />, title: "Account Health Scoring",       desc: "Real-time dashboard tracking every account health metric with predictive risk scoring.",                 tag: "HEALTH_KPI", prevents: "Prevents surprise suspensions & warnings" },
  ];

  const monitoringItems = [
    "Buy-Box Status & Health",
    "Listing Suppression Risk",
    "Pricing Shifts & Parity",
    "Unauthorized Seller Presence",
    "Feedback & Review Velocity",
    "IP & Trademark Violations",
    "FBA Shipment Reconciliation",
    "TOS & Policy Warnings",
    "Account Health Index",
    "Competitor Listing Moves"
  ];

  return (
    <section className="py-20 md:py-32 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,rgba(249,115,22,0.08),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left — sticky terminal */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <SectionLabel>Security Framework</SectionLabel>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.88] mb-6">
              What we<br />
              <span className="italic font-light text-zinc-500 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>shield.</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-10 max-w-md">
              A comprehensive operational moat. We manage the high-stakes defensive workflows that allow your brand to scale without fragile operational foundations.
            </p>

            {/* Monitor Daily Checklist */}
            <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 mb-12">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest font-bold">What We Monitor Daily</span>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  {monitoringItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                       <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                          <CheckCircle2 size={12} strokeWidth={3} />
                       </div>
                       <span className="text-[11px] font-bold text-white/70 uppercase tracking-tight leading-none">{item}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-zinc-900/50 backdrop-blur-xl">
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-white/30">Defense_Core: Active</span>
                </div>
              </div>
              <div className="p-6 space-y-2.5">
                {[
                  { label: "Buy-box — Health scan",      status: "Active",   time: "Live"   },
                  { label: "Hijacker — Detection core",   status: "Running",  time: "Now"    },
                  { label: "Compliance — Policy check",   status: "Complete", time: "2h ago" },
                  { label: "Brand Registry — IP shield", status: "Complete", time: "Active" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/2 border border-white/5 p-3.5 rounded-xl">
                    <CheckCircle2 size={14} className={row.status === "Running" ? "text-orange-500" : "text-emerald-400"} />
                    <p className="text-white/70 text-[11px] font-mono flex-1">{row.label}</p>
                    <div className="text-right">
                      <p className={`text-[10px] font-mono font-bold ${row.status === "Running" ? "text-orange-500" : "text-emerald-400"}`}>{row.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — card grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {deliverables.map((d, i) => (
              <div key={i} className="group bg-white/[0.02] hover:bg-orange-500 transition-all duration-700 rounded-[32px] p-8 border border-white/5 hover:border-orange-500 relative overflow-hidden flex flex-col justify-between min-h-[280px]">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "6px 6px" }} />
                
                <div>
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 group-hover:bg-white group-hover:text-orange-500 group-hover:border-white transition-all">{d.icon}</div>
                    <span className="font-mono text-[9px] text-zinc-500 group-hover:text-white/50 uppercase tracking-widest">{d.tag}</span>
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-3">{d.title}</h3>
                  <p className="text-zinc-500 group-hover:text-white/80 text-[13px] font-light leading-relaxed mb-6">{d.desc}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-orange-500 group-hover:bg-white shrink-0" />
                  <span className="text-[10px] font-bold text-orange-500/70 group-hover:text-white uppercase tracking-wide leading-tight">{d.prevents}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
