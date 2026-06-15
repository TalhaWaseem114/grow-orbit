"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, Check, CheckCircle2, ChevronRight,
  FileText, Users, Zap, ShieldCheck, Terminal,
  TrendingUp, BarChart3, BookOpen, Settings,
  Target, Activity, Star, ClipboardList,
  RefreshCw, AlertTriangle, Package, Search,
  CheckCheck, XCircle, Plus, Minus,
} from "lucide-react";
import gsap from "gsap";
import HeroButton from "@/components/ui/HeroButton";

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
function SOPHero() {
  const floatRef = useRef(null);

  useEffect(() => {
    if (!floatRef.current) return;
    gsap.to(floatRef.current, { y: -12, duration: 4.5, repeat: -1, yoyo: true, ease: "power1.inOut" });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#fafafa]">
      <style>{`
        @keyframes scan-sop {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; } 90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent animate-[scan-sop_10s_linear_infinite]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="sop-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
            <path d="M120 0 L120 120 M0 120 L120 120" stroke="currentColor" strokeWidth="0.2" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#sop-grid)" />
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
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
                  <div className="w-4 h-[1px] bg-orange-500 self-center" />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
                  Amazon Operational Systems
                </span>
              </div>

              <h1 className="text-[42px] sm:text-5xl md:text-7xl lg:text-[80px] font-black tracking-tighter leading-[0.9] lg:leading-[0.85] mb-8 lg:mb-10 text-zinc-900 uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Amazon<br />
                <span className="text-orange-500 inline-flex items-baseline gap-2 sm:gap-3">
                  SOPs
                  <span className="text-[12px] sm:text-[16px] md:text-[22px] font-medium tracking-tight text-zinc-300 normal-case italic whitespace-nowrap" style={{ fontFamily: "'Playfair Display', serif" }}>
                    (Standard Operating Procedures)
                  </span>
                </span><br />
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light lowercase tracking-tight text-zinc-300">
                  that scale.
                </span>
              </h1>

              <div className="flex gap-6 mb-10">
                <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50" />
                <div>
                  <p className="text-xl md:text-2xl text-zinc-500 font-light leading-relaxed max-w-xl mb-6">
                    The playbooks, checklists, and operating procedures we've built managing $12M+ in Amazon sales — yours to implement, customise, and hand to your team.
                  </p>
                  <div className="flex flex-wrap gap-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Proven_Processes: Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Terminal size={10} className="text-orange-500/50" />
                      <span>Team_Ready: Yes</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  "Developed from managing 80+ growth-focused brands",
                  "Ready to deploy to your team today",
                  "Covers listing, PPC, ops & logistics",
                  "Amazon-compliant, constantly updated",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={15} className="text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-[14px] font-light leading-snug text-zinc-600">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mb-10">
                <HeroButton href="/contact">Get The SOP Bundle</HeroButton>
                <a href="#whats-included" className="group flex justify-center items-center gap-3 text-zinc-400 hover:text-zinc-900 font-bold text-[11px] uppercase tracking-widest px-2 py-4 transition-colors no-underline">
                  See What's Included <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {[
                  { icon: <BookOpen size={11} />,     label: "60+ Documented Processes" },
                  { icon: <Users size={11} />,        label: "Team-Ready Templates"      },
                  { icon: <RefreshCw size={11} />,    label: "Regularly Updated"         },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2">
                    <span className="text-orange-500">{b.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Systems Orchestrator Widget */}
          <div className="lg:col-span-5 relative hidden lg:block self-start lg:mt-[50px]" ref={floatRef}>
            <style>{`
              @keyframes dash-flow {
                to { stroke-dashoffset: -20; }
              }
              @keyframes pulse-node {
                0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.4); }
                50% { box-shadow: 0 0 20px 10px rgba(249,115,22,0); }
              }
            `}</style>
            
            {/* Ambient Backglow */}
            <div className="absolute -inset-10 bg-gradient-to-br from-orange-500/20 via-transparent to-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="bg-white/90 backdrop-blur-3xl rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.12)] border border-white p-8 relative overflow-hidden">
               {/* Blueprint Grid */}
               <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
               
               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h4 className="text-[14px] font-black uppercase tracking-widest text-zinc-900 mb-1">Growth Engine</h4>
                      <p className="text-[9px] font-mono font-bold uppercase text-orange-500 tracking-[0.2em]">Live Orchestration</p>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[8px] font-mono text-emerald-700 uppercase tracking-widest font-bold">Systems Synced</span>
                    </div>
                  </div>

                  {/* Flow Diagram */}
                  <div className="relative h-[280px] w-full">
                     {/* Connecting Lines */}
                     <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 0 }}>
                        <path d="M 20 50 L 50 15 L 80 50 L 50 85 Z" fill="none" stroke="rgba(249,115,22,0.3)" strokeWidth="0.5" strokeDasharray="2 2" style={{ animation: 'dash-flow 1s linear infinite' }} />
                        <path d="M 50 15 L 50 85" fill="none" stroke="rgba(249,115,22,0.3)" strokeWidth="0.5" strokeDasharray="2 2" style={{ animation: 'dash-flow 1s linear infinite' }} />
                        <path d="M 20 50 L 80 50" fill="none" stroke="rgba(249,115,22,0.3)" strokeWidth="0.5" strokeDasharray="2 2" style={{ animation: 'dash-flow 1s linear infinite' }} />
                     </svg>

                     {/* Top Node */}
                     <div className="absolute top-[15%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white border border-orange-500/30 rounded-[18px] p-3 shadow-xl w-[150px] z-10 transition-transform hover:scale-105 cursor-default">
                        <div className="flex items-center gap-2 mb-2">
                           <div className="w-6 h-6 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500"><Search size={12} /></div>
                           <span className="text-[9px] font-black uppercase text-zinc-900 tracking-tighter">SEO & Rank</span>
                        </div>
                        <div className="h-1 bg-zinc-100 rounded-full overflow-hidden">
                           <div className="h-full bg-orange-500 w-[100%]" />
                        </div>
                     </div>

                     {/* Left Node */}
                     <div className="absolute top-[50%] left-[18%] -translate-x-1/2 -translate-y-1/2 bg-white border border-zinc-200 rounded-[18px] p-3 shadow-xl w-[150px] z-10 transition-transform hover:scale-105 cursor-default">
                        <div className="flex items-center gap-2 mb-2">
                           <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500"><Target size={12} /></div>
                           <span className="text-[9px] font-black uppercase text-zinc-900 tracking-tighter">Conversion UI</span>
                        </div>
                        <div className="h-1 bg-zinc-100 rounded-full overflow-hidden">
                           <div className="h-full bg-amber-500 w-[100%]" />
                        </div>
                     </div>

                     {/* Right Node */}
                     <div className="absolute top-[50%] left-[82%] -translate-x-1/2 -translate-y-1/2 bg-white border border-zinc-200 rounded-[18px] p-3 shadow-xl w-[150px] z-10 transition-transform hover:scale-105 cursor-default">
                        <div className="flex items-center gap-2 mb-2">
                           <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500"><TrendingUp size={12} /></div>
                           <span className="text-[9px] font-black uppercase text-zinc-900 tracking-tighter">PPC Engine</span>
                        </div>
                        <div className="h-1 bg-zinc-100 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-500 w-[100%]" />
                        </div>
                     </div>

                     {/* Bottom Node */}
                     <div className="absolute top-[85%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-zinc-900 border border-zinc-800 rounded-[18px] p-3.5 shadow-2xl w-[160px] z-20" style={{ animation: "pulse-node 3s infinite" }}>
                        <div className="flex items-center gap-2 mb-2">
                           <div className="w-6 h-6 rounded-lg bg-orange-500 flex items-center justify-center text-white"><Package size={12} /></div>
                           <span className="text-[10px] font-black uppercase text-white tracking-tighter">FBA Logistics</span>
                        </div>
                        <div className="flex justify-between items-center text-[8px] font-mono text-zinc-400">
                           <span>DEPLOYING...</span>
                           <span className="text-orange-400 font-bold">85%</span>
                        </div>
                     </div>

                     {/* Center Core */}
                     <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white border-4 border-orange-500/20 rounded-full flex items-center justify-center z-10 shadow-[0_0_40px_rgba(249,115,22,0.3)]">
                        <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-white">
                           <Settings size={14} className="animate-[spin_4s_linear_infinite]" />
                        </div>
                     </div>
                  </div>

                  {/* Footer Stats */}
                  <div className="mt-8 flex justify-between items-center pt-6 border-t border-zinc-200">
                     <div>
                        <p className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1">Standardized Processes</p>
                        <p className="text-2xl font-black text-zinc-900 leading-none">60<span className="text-orange-500">+</span></p>
                     </div>
                     <div className="text-right">
                        <p className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1">Implementation Time</p>
                        <p className="text-2xl font-black text-zinc-900 leading-none">Instant</p>
                     </div>
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
   02 — METRICS STRIP
   ═══════════════════════════════════════════════ */
function MetricsStrip() {
  const stats = [
    { v: "250+",  l: "Processes Documented", i: <FileText size={14} />    },
    { v: "$12M+", l: "In Sales Managed",    i: <TrendingUp size={14} />  },
    { v: "80+",   l: "Brands Scaled",       i: <Users size={14} />       },
    { v: "Team",  l: "Ready Templates",     i: <CheckCheck size={14} />  },
  ];

  return (
    <div className="bg-zinc-900 py-12 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-8">
          {stats.map((s, i) => (
            <div key={i} className="group relative flex flex-col border-l border-zinc-800/50 pl-6 sm:pl-8 transition-all duration-500 hover:border-orange-500/40">
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
              <span className="text-[10px] lg:text-[8px] font-mono text-zinc-600 uppercase tracking-widest">INSTANT_ACCESS</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   03 — WHAT'S INCLUDED (4-card bento)
   ═══════════════════════════════════════════════ */
function WhatsIncluded() {
  const categories = [
    {
      icon: <Search size={24} />,
      title: "Listing & SEO SOPs",
      metric: "24 SOPs",
      tag: "LISTING_OPS",
      desc: "Step-by-step listing build, keyword matrix setup, A+ Content publishing, image upload sequences, and listing quality audits — built from optimising 1,200+ SKUs.",
      items: ["Keyword research workflow", "Title & bullet formatting guide", "A+ Content publishing checklist", "Listing audit framework"],
    },
    {
      icon: <BarChart3 size={24} />,
      title: "PPC & Advertising SOPs",
      metric: "18 SOPs",
      tag: "AD_OPS",
      desc: "Campaign build sequences, weekly bid optimisation workflows, search term harvesting protocols, and ACoS monitoring checklists proven across 60+ ad accounts.",
      items: ["Campaign structure blueprint", "Weekly bid adjustment SOP", "Search term harvest workflow", "ACoS reporting template"],
      featured: true,
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Account Health & Ops SOPs",
      metric: "12 SOPs",
      tag: "ACCOUNT_OPS",
      desc: "Daily account health monitoring, hijacker removal protocols, policy violation response, case management, and suspension prevention checklists.",
      items: ["Daily health audit checklist", "Hijacker removal protocol", "Case escalation workflow", "Suspension prevention guide"],
    },
    {
      icon: <Package size={24} />,
      title: "Inventory & Logistics SOPs",
      metric: "16 SOPs",
      tag: "LOGISTICS",
      desc: "FBA shipment workflows, reorder timing frameworks, demand forecasting templates, multi-warehouse management, and IPI monitoring processes.",
      items: ["FBA shipment SOP", "Reorder point calculator", "Demand forecast template", "IPI monitoring workflow"],
    },
  ];

  return (
    <section id="whats-included" className="py-20 lg:py-32 bg-zinc-950 text-white relative overflow-hidden scroll-mt-24">
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-500/[0.08] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-orange-500/[0.04] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <SectionLabel light>SOP Library</SectionLabel>
            <h2 className="text-[42px] sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Four systems.<br />Every process<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-500 lowercase tracking-normal">documented.</span>
            </h2>
          </div>
          <p className="text-zinc-400 font-light max-w-sm text-sm leading-relaxed pb-2">
            These aren't generic templates. These are the exact operational playbooks we use daily to manage millions in active client revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Featured large card */}
          <div className="lg:row-span-1 group relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-[40px] p-10 lg:p-12 flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle, #fff 1.5px, transparent 1.5px)", backgroundSize: "20px 20px" }} />
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Most Used
              </div>
              <div className="w-14 h-14 rounded-3xl bg-white/20 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                {categories[1].icon}
              </div>
              <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tight mb-3">{categories[1].title}</h3>
              <p className="text-white/80 text-sm font-light leading-relaxed mb-6 max-w-sm">{categories[1].desc}</p>
              <ul className="space-y-2">
                {categories[1].items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-white/70 text-xs font-light">
                    <CheckCircle2 size={12} className="text-white/60 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative z-10 mt-8 flex items-center justify-between border-t border-white/20 pt-5">
              <span className="text-4xl font-black text-white/90 tracking-tighter">{categories[1].metric}</span>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/50">{categories[1].tag}</span>
            </div>
          </div>

          {/* 3 smaller cards */}
          <div className="grid grid-cols-1 gap-4">
            {[categories[0], categories[2], categories[3]].map((cat, i) => (
              <div key={i} className="group relative bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-orange-500/30 rounded-[28px] p-7 transition-all duration-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500 shrink-0">
                    {cat.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-black uppercase tracking-tight text-white group-hover:text-orange-400 transition-colors">{cat.title}</h3>
                      <span className="text-[9px] font-mono text-orange-500 font-bold ml-3 shrink-0">{cat.metric}</span>
                    </div>
                    <p className="text-zinc-500 text-xs font-light leading-relaxed group-hover:text-zinc-400 transition-colors">{cat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   04 — WHY SOPs MATTER (sticky + 4 cards)
   ═══════════════════════════════════════════════ */
function WhySOPs() {
  const reasons = [
    { icon: <Users size={22} />,       title: "Empower Your Team",       desc: "Stop being the bottleneck. SOPs let your VA, ops manager, or agency execute at your standard without you on every decision." },
    { icon: <Zap size={22} />,         title: "Eliminate Costly Errors",  desc: "Inconsistency costs Amazon sellers thousands in suppressed listings, wasted ad spend, and avoidable account flags. SOPs make errors structurally impossible." },
    { icon: <TrendingUp size={22} />,  title: "Scale Without Chaos",     desc: "Growing from 5 to 50 ASINs without documented processes creates exponential chaos. SOPs are the infrastructure that makes scale sustainable." },
    { icon: <Activity size={22} />,    title: "Train Faster, Hire Better",desc: "New hires get up to speed in days, not months. A documented system is your most valuable onboarding tool — and it never takes a sick day." },
  ];

  return (
    <section className="py-20 lg:py-32 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>Why It Matters</SectionLabel>
            <h2 className="text-[42px] sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] lg:leading-[0.88] mb-8 text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Your business<br />needs a<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">blueprint.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-10">
              Every Amazon business that scales past $1M shares one thing: documented systems. Every one that stays stuck shares another: they're still doing everything from memory.
            </p>
            <Link href="/contact" className="group flex items-center gap-3 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
              Get the playbook <ArrowRight size={13} />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <div key={i} className="relative group bg-[#fafafa] hover:bg-white rounded-[24px] p-5 border border-zinc-100 hover:border-orange-500/20 hover:shadow-lg hover:shadow-zinc-200/50 transition-all duration-300 overflow-hidden text-left">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mb-5 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                  {r.icon}
                </div>
                <h3 className="text-[13px] font-black uppercase tracking-[0.12em] text-zinc-900 mb-2 group-hover:text-orange-500 transition-colors">{r.title}</h3>
                <p className="text-zinc-400 text-xs font-light leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   05 — GROW ORBIT SOPs vs DIY (comparison split)
   ═══════════════════════════════════════════════ */
function ComparisonSection() {
  const ourSide = [
    "Built from $12M+ in real Amazon sales data",
    "Amazon-compliant — updated when policies change",
    "Ready to hand to your team immediately",
    "Covers every critical operational area",
    "Refined daily across 50+ active brands",
  ];

  const diyProblems = [
    "Time-consuming — weeks to develop from scratch",
    "Risk of missing Amazon-specific compliance nuances",
    "Inconsistent format — hard for teams to follow",
    "Gaps in critical areas you don't know are critical",
    "Requires constant revision as Amazon evolves",
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-20">
          <div>
            <SectionLabel>The Comparison</SectionLabel>
            <h2 className="text-[42px] sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] lg:leading-[0.88] text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Grow Orbit SOPs<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">vs building your own.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            Why spend weeks building from scratch when you can plug into systems proven across $12M+ in Amazon sales?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Grow Orbit side */}
          <div className="relative rounded-[40px] overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-orange-500 to-amber-400" />
            <div className="bg-zinc-950 border border-t-0 border-zinc-800 rounded-b-[40px] p-10">
              <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 px-3 py-1.5 rounded-full mb-6">
                <Star size={9} className="text-orange-400 fill-orange-400" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-400">Grow Orbit SOPs</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-8">Proven systems.<br />Plug in and run.</h3>
              <ul className="space-y-4">
                {ourSide.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={13} className="text-emerald-400" />
                    </div>
                    <span className="text-zinc-300 text-sm font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* DIY side */}
          <div className="bg-[#fafafa] border border-zinc-200 rounded-[40px] p-10">
            <div className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded-full mb-6">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">Building Your Own</span>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-zinc-900 mb-8">Starting from<br />scratch.</h3>
            <ul className="space-y-4">
              {diyProblems.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <XCircle size={13} className="text-red-400" />
                  </div>
                  <span className="text-zinc-500 text-sm font-light leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 lg:mt-16 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-4 px-6 sm:px-10 py-5 bg-orange-500 text-white rounded-2xl font-black text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-black transition-all duration-500 shadow-[0_15px_40px_rgba(249,115,22,0.3)] w-full sm:w-auto no-underline"
          >
            Get the Full SOP Bundle <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// --- Sub-component: The Primary Gradient Button ---
const SOPCTAButton = ({ href = "/contact", children }) => (
  <Link
    href={href}
    className="group relative inline-flex justify-center w-full sm:w-auto px-6 sm:px-10 py-4 bg-orange-600 text-white rounded-full font-bold text-[9px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.3em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:scale-[1.02] active:scale-95 no-underline border-none shadow-none"
  >
    <span className="relative z-10 flex items-center justify-center gap-3 sm:gap-4 w-full">
      {children}
      <ArrowRight size={16} className="group-hover:translate-x-2 transition-all duration-300 text-white" />
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-orange-400 transition-transform duration-500 ease-in-out"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[horizontal-scan_2s_linear_infinite]"></div>
  </Link>
);

/* ═══════════════════════════════════════════════
   06 — CTA
   ═══════════════════════════════════════════════ */
function SOPCTA() {
  return (
    <div className="w-full pb-20 bg-[#fafafa]">
      <section className="px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-[#0a0a0a] rounded-[48px] py-16 px-8 lg:px-20 text-left relative overflow-hidden border border-white/5 group shadow-none">

            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />

            {/* Background Large Icon Decor */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.05] translate-x-1/4">
              <ClipboardList size={600} strokeWidth={0.2} className="text-orange-500" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column: Content */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-white font-bold text-[9px] uppercase tracking-[0.4em]">60+ Processes. Team-Ready.</span>
                </div>

                <h2
                  className="text-[36px] sm:text-4xl lg:text-6xl font-black tracking-tighter mb-6 sm:mb-8 leading-[0.95] sm:leading-[0.9] text-white uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Manage your business<br />
                  <span className="italic font-light block mt-2 tracking-normal text-orange-500 lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                    with absolute confidence.
                  </span>
                </h2>

                <p className="text-zinc-400 font-light mb-10 text-base lg:text-lg leading-relaxed max-w-xl">
                  Stop reinventing the grid. Get the operational playbooks built from $12M+ in Amazon sales — and implement them in your business this week.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-16">
                   <SOPCTAButton href="/get-started">
                    Get Free Strategy Call
                  </SOPCTAButton>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Immediate Integration</span>
                  </div>
                </div>

                {/* Bottom Row Points */}
                <div className="pt-8 border-t border-white/5 flex flex-wrap items-center gap-x-10 gap-y-3">
                  {[
                    "60+ Documented Processes",
                    "Team-Ready Templates",
                    "Amazon Compliant"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white whitespace-nowrap">
                      <CheckCircle2 size={12} className="text-orange-500/70" strokeWidth={3} />
                      {item}
                    </div>
                  ))}
                </div>

              </div>

              {/* Right Column: Strategy Card */}
              <div className="lg:col-span-5 relative group/card mt-12 lg:mt-0">
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-8 shadow-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-500">

                  {/* Card Glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  {/* Header */}
                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[8px] font-mono text-orange-500/80 uppercase tracking-widest">Session: System Ops</span>
                      </div>
                      <h4 className="text-2xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>SOP Blueprint</h4>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-inner">
                      <ClipboardList size={22} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Steps with Timeline spacing */}
                  <div className="space-y-0 relative z-10 before:absolute before:inset-y-3 before:left-[19px] before:w-[2px] before:bg-white/10">
                    {[
                      { icon: <Search size={16} />, title: "1. Operational Audit", desc: "Identify bottleneck processes in your current workflow." },
                      { icon: <Settings size={16} />, title: "2. System Mapping", desc: "Map exact playbooks to your unique team structure." },
                      { icon: <BookOpen size={16} />, title: "3. Library Delivery", desc: "Receive full integration access to 60+ proven SOPs.", active: true }
                    ].map((step, i) => (
                      <div key={i} className={`relative flex gap-4 sm:gap-6 ${i !== 2 ? 'pb-8' : ''} group/step`}>
                        <div className={`w-10 h-10 shrink-0 rounded-full border flex items-center justify-center z-10 transition-all ${step.active ? 'bg-orange-500/20 border-orange-500 text-orange-500 shadow-[0_0_15_rgba(249,115,22,0.3)]' : 'bg-zinc-900 border-white/10 text-zinc-400 group-hover/step:border-orange-500/50'}`}>
                          {step.icon}
                        </div>
                        <div className="pt-1">
                          <h5 className={`text-[13px] font-bold mb-1.5 uppercase tracking-wide ${step.active ? 'text-orange-400' : 'text-white'}`}>{step.title}</h5>
                          <p className="text-[11px] text-zinc-400 font-light leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Meeting Context Footer */}
                  <div className="mt-8 lg:mt-10 bg-black/40 border border-white/10 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 relative z-10 backdrop-blur-md">
                    <div className="flex items-center gap-3 sm:gap-4">
                       <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full border border-white/10 bg-zinc-800 flex items-center justify-center text-zinc-400">
                         <Users size={14} className="sm:w-4 sm:h-4" />
                       </div>
                       <div>
                         <p className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-widest mb-0.5 whitespace-nowrap">Strategy Session</p>
                         <p className="text-[9px] sm:text-[10px] text-zinc-500 font-mono whitespace-nowrap">15 Mins • 1-on-1 Access</p>
                       </div>
                    </div>
                    <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-orange-500/10 text-orange-500 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase border border-orange-500/20 text-center w-full sm:w-auto">
                      Standard Issue
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


/* ═══════════════════════════════════════════════
   07 — FOOTER NAV
   ═══════════════════════════════════════════════ */
function FooterNav() {
  return (
    <footer className="py-24 bg-white border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">All Services</p>
          <Link href="/service" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start uppercase">
              <ArrowRight className="mr-3 group-hover:-translate-x-3 transition-transform rotate-180 size-6 md:size-8 shrink-0" />
              Overview
            </h4>
          </Link>
        </div>
        <div className="hidden md:block w-px h-16 bg-zinc-100" />
        <div className="text-center md:text-right w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Get Started</p>
          <Link href="/service/coaching-consultation" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end uppercase">
              Coaching & Consultation
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
export default function SOPsPage() {
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <SOPHero />
      <MetricsStrip />
      <WhatsIncluded />
      <WhySOPs />
      <ComparisonSection />
      <SOPCTA />
      <FooterNav />
    </div>
  );
}
