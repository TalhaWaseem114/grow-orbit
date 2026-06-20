"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Search, Image as ImageIcon, PenTool, LayoutGrid,
  TrendingUp, BarChart3, ChevronRight, Plus, Minus, Terminal,
  Target, Zap, ShieldCheck, FileText, Activity, Star, Store,
  Sparkles, Camera, Eye, Quote, Award, Package, MousePointer2,
  Layers, Layout, RefreshCw, Video, BookOpen, Globe, Users, Gauge, FileEdit, ShoppingBag, Boxes, StarHalf
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroButton from "@/components/ui/HeroButton";

// --- Sub-component: The Primary Gradient Button ---
const OptimizationCTAButton = ({ href = "/contact", children }) => (
  <Link
    href={href}
    className="group relative inline-flex justify-center w-full sm:w-auto px-6 sm:px-10 py-4 bg-orange-600 text-white rounded-full font-bold text-[9px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.3em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:scale-[1.02] active:scale-95 no-underline border-none"
  >
    <span className="relative z-10 flex items-center justify-center gap-3 sm:gap-4 w-full">
      {children}
      <ArrowRight size={16} className="group-hover:translate-x-2 transition-all duration-300 text-white" />
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-orange-400 transition-transform duration-500 ease-in-out"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[horizontal-scan_2s_linear_infinite]"></div>
  </Link>
);

function FullListingHeroCTA() {
  return (
    <div className="w-full pb-10 bg-white">
      <section className="px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-[#0a0a0a] rounded-[40px] py-14 px-8 lg:px-20 text-left relative overflow-hidden border border-white/5 group shadow-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-white font-bold text-[9px] uppercase tracking-[0.4em]">Optimization Slot: Available</span>
                </div>
                <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-[0.9] text-white uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Stop leaving rank.<br />
                  <span className="italic font-light block mt-2 tracking-normal text-orange-500 lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                    start dominating.
                  </span>
                </h2>
                <p className="text-zinc-400 font-light mb-10 text-base lg:text-lg leading-relaxed max-w-xl">
                  SEO alone doesn't sell, and copy alone doesn't rank. Book a **15-minute Listing Diagnostics** to bridge the gap between discoverability and high-velocity sales.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-16">
                  <OptimizationCTAButton href="/get-started">
                    Get Free Strategy Call
                  </OptimizationCTAButton>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Full-Stack Growth</span>
                  </div>
                </div>
                <div className="pt-8 border-t border-white/5 flex flex-wrap items-center gap-x-10 gap-y-3">
                  {["Organic Keyword Mapping", "Psychological Sales Copy", "Backend Algorithm Sync"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white whitespace-nowrap">
                      <CheckCircle2 size={12} className="text-orange-500/70" strokeWidth={3} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 block relative group/card mt-12 lg:mt-[60px] self-start">
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-500">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[8px] font-mono text-orange-500/80 uppercase tracking-widest">Session: Listing Audit</span>
                      </div>
                      <h4 className="text-2xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>Growth Plan</h4>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-inner">
                      <Gauge size={22} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="space-y-0 relative z-10 before:absolute before:inset-y-3 before:left-[19px] before:w-[2px] before:bg-white/10">
                    {[
                      { icon: <Search size={16} />, title: "1. Indexing Audit", desc: "Identify which high-volume keywords you're failing to rank for." },
                      { icon: <FileEdit size={16} />, title: "2. Conversion Check", desc: "Evaluate your copy’s ability to handle objections and close." },
                      { icon: <Zap size={16} />, title: "3. Velocity Roadmap", desc: "Deploy changes to capture both the algorithm and the buyer.", active: true }
                    ].map((step, i) => (
                      <div key={i} className={`relative flex gap-4 sm:gap-6 ${i !== 2 ? 'pb-6 sm:pb-8' : ''} group/step`}>
                        <div className={`w-10 h-10 shrink-0 rounded-full border flex items-center justify-center z-10 transition-all ${step.active ? 'bg-orange-500/20 border-orange-500 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-zinc-900 border-white/10 text-zinc-400 group-hover/step:border-orange-500/50'}`}>
                          {step.icon}
                        </div>
                        <div className="pt-1">
                          <h5 className={`text-[11px] sm:text-[13px] font-bold mb-1 sm:mb-1.5 uppercase tracking-wide ${step.active ? 'text-orange-400' : 'text-white'}`}>{step.title}</h5>
                          <p className="text-[10px] sm:text-[11px] text-zinc-400 font-light leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 sm:mt-10 bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10 backdrop-blur-md">
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                       <div className="w-10 h-10 rounded-full border border-white/10 bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0"><Users size={16} /></div>
                       <div className="flex-1"><p className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-widest mb-0.5">Strategy Session</p><p className="text-[9px] sm:text-[10px] text-zinc-500 font-mono">15 Mins • 1-on-1 Discovery</p></div>
                    </div>
                    <div className="w-full sm:w-auto px-4 py-2 rounded-xl bg-orange-500/10 text-orange-500 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase border border-orange-500/20 text-center shrink-0">Free Access</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style jsx global>{`@keyframes horizontal-scan { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }`}</style>
    </div>
  );
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────
   SHARED
───────────────────────────────────────────── */
const SectionLabel = ({ children, light = false }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500" />
    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.4em] ${light ? "text-orange-400" : "text-orange-500/80"}`} style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {children}
    </span>
  </div>
);

/* ═══════════════════════════════════════════════
   01 — HERO
   Concept: "Listing Anatomy" — 6 layers of a full
   optimized listing shown as a connected system
   ═══════════════════════════════════════════════ */
function FullListingHero() {
  /* The 6 pillars shown as stacked anatomy rows */
  const anatomy = [
    { tag: "01", label: "Title & Keywords",       status: "Indexed",   active: true  },
    { tag: "02", label: "Main Image CTR",          status: "+40% CTR",  active: true  },
    { tag: "03", label: "Bullet Points / Copy",    status: "Optimized", active: true  },
    { tag: "04", label: "A+ Content",              status: "Published", active: false },
    { tag: "05", label: "Brand Story",             status: "Live",      active: false },
    { tag: "06", label: "Brand Storefront",        status: "Built",     active: false },
  ];

  return (
    <section className="relative min-h-[100svh] lg:min-h-screen flex items-center pt-16 pb-24 lg:pt-12 lg:pb-16 overflow-hidden bg-[#fafafa]">
      <style>{`
        @keyframes scan-full {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes row-enter {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent animate-[scan-full_10s_linear_infinite]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="full-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
            <path d="M120 0 L120 120 M0 120 L120 120" stroke="currentColor" strokeWidth="0.2" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#full-grid)" />
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
                  Amazon Listing Services
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-[42px] sm:text-6xl md:text-7xl lg:text-[85px] font-black tracking-tighter leading-[0.85] mb-10 text-zinc-900 uppercase">
                Full Listing<br />
                <span className="text-orange-500">Optimization</span><br />
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light lowercase tracking-tight text-zinc-300">
                  system.
                </span>
              </h1>

              <div className="flex gap-6 mb-12">
                <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50" />
                <div>
                  <p className="text-lg md:text-[22px] text-zinc-500 font-light leading-relaxed max-w-xl mb-6">
                    SEO, design, copywriting, A+ content, brand story, and storefront — built as one complete system. When every layer of your listing is engineered together, the result is a compound growth engine that outpaces competitors on autopilot.
                  </p>
                  <div className="flex flex-wrap gap-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>SEO + Design + Copy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Search size={10} className="text-orange-500/50" />
                      <span>A9 Algorithm Matched</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  "Deep keyword research & backend SEO",
                  "Main image + 6 secondary listing images",
                  "Conversion-focused bullet copywriting",
                  "A+ Content, Brand Story & Storefront",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={15} className="text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-[14px] font-light leading-snug text-zinc-600">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-12">
                <HeroButton href="/contact">
                  Optimize My Listing
                </HeroButton>
                <a
                  href="#packages"
                  className="group flex items-center justify-center sm:justify-start gap-3 text-zinc-500 hover:text-zinc-900 font-bold text-[11px] uppercase tracking-widest px-2 py-4 transition-colors no-underline w-full sm:w-auto"
                >
                  See Packages <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { icon: <Search size={11} />,      label: "A9 Algorithm Ready"   },
                  { icon: <Target size={11} />,      label: "CTR & CVR Focus"       },
                  { icon: <ShieldCheck size={11} />, label: "TOS Compliant"         },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2">
                    <span className="text-orange-500">{b.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{b.label}</span>
                  </div>
                ))}
              </div>

              {/* Proof strip */}
              <div className="hidden sm:flex items-center gap-10 mt-10 pt-10 border-t border-zinc-100">
                {[
                  { label: "SKUs Optimized",      val: "1,200+" },
                  { label: "Avg Conversion Lift", val: "+45%"   },
                  { label: "Brands Served",       val: "80+"    },
                ].map((t, i) => (
                  <div key={i}>
                    <p className="text-2xl font-black tracking-tighter text-zinc-900">{t.val}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Synergy Protocol Visual */}
          <div className="lg:col-span-5 relative block mt-[-20px] lg:mt-[60px] h-[680px] sm:h-[760px] lg:h-auto self-start w-full max-w-[340px] sm:max-w-md mx-auto lg:max-w-none lg:mx-0">

            <div className="relative transform scale-[0.85] sm:scale-95 lg:scale-100 origin-top lg:origin-center">
              <div className="relative -space-y-40 sm:-space-y-32">

                {/* Layer 1: Dark "Synergy Protocol" Node Network */}
                <div className="relative z-10 bg-[#0a0a0a] rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 pb-40 sm:pb-32 border border-white/10 overflow-hidden min-h-[300px] shadow-2xl">
                   <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(249,115,22,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.15) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                   <div className="absolute top-0 right-0 w-60 h-60 bg-orange-500/8 rounded-full blur-[100px] pointer-events-none" />

                   <div className="relative z-10">
                     <div className="flex items-center justify-between mb-7">
                        <div className="flex flex-col gap-1.5">
                           <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Synergy_Protocol</span>
                           </div>
                           <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest leading-none">Mode: Full_Stack_Deploy</div>
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500">
                           <Layers size={18} />
                        </div>
                     </div>

                     {/* 6-Node Interconnected Grid */}
                     <div className="relative mb-6">
                       <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 130" preserveAspectRatio="xMidYMid meet">
                         <line x1="55" y1="42" x2="160" y2="42" stroke="rgba(249,115,22,0.2)" strokeWidth="0.8" strokeDasharray="4 3" />
                         <line x1="160" y1="42" x2="265" y2="42" stroke="rgba(249,115,22,0.2)" strokeWidth="0.8" strokeDasharray="4 3" />
                         <line x1="55" y1="98" x2="160" y2="98" stroke="rgba(249,115,22,0.12)" strokeWidth="0.8" strokeDasharray="4 3" />
                         <line x1="160" y1="98" x2="265" y2="98" stroke="rgba(249,115,22,0.12)" strokeWidth="0.8" strokeDasharray="4 3" />
                         <line x1="55" y1="42" x2="55" y2="98" stroke="rgba(249,115,22,0.1)" strokeWidth="0.8" strokeDasharray="3 4" />
                         <line x1="160" y1="42" x2="160" y2="98" stroke="rgba(249,115,22,0.15)" strokeWidth="0.8" strokeDasharray="3 4" />
                         <line x1="265" y1="42" x2="265" y2="98" stroke="rgba(249,115,22,0.1)" strokeWidth="0.8" strokeDasharray="3 4" />
                         <line x1="55" y1="42" x2="160" y2="98" stroke="rgba(249,115,22,0.06)" strokeWidth="0.5" strokeDasharray="2 6" />
                         <line x1="160" y1="42" x2="265" y2="98" stroke="rgba(249,115,22,0.06)" strokeWidth="0.5" strokeDasharray="2 6" />
                         <line x1="265" y1="42" x2="160" y2="98" stroke="rgba(249,115,22,0.06)" strokeWidth="0.5" strokeDasharray="2 6" />
                       </svg>

                       <div className="grid grid-cols-3 gap-3 relative z-10">
                         {[
                           { icon: <Search size={14} />, label: "SEO", hot: true },
                           { icon: <Camera size={14} />, label: "Images", hot: true },
                           { icon: <PenTool size={14} />, label: "Copy", hot: true },
                           { icon: <LayoutGrid size={14} />, label: "A+", hot: false },
                           { icon: <BookOpen size={14} />, label: "Story", hot: false },
                           { icon: <Store size={14} />, label: "Store", hot: false },
                         ].map((node, i) => (
                           <div key={i} className="flex flex-col items-center gap-2 py-3">
                             <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                               node.hot
                                 ? 'bg-orange-500/20 border-orange-500/40 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.25)]'
                                 : 'bg-white/5 border-white/10 text-zinc-500'
                             }`}>
                               {node.icon}
                             </div>
                             <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{node.label}</span>
                           </div>
                         ))}
                       </div>
                     </div>

                     {/* Compound Synergy Bar */}
                     <div className="bg-white/[0.04] rounded-2xl p-4 border border-white/5">
                        <div className="flex items-center justify-between mb-2.5">
                           <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Compound Synergy</span>
                           <span className="text-[9px] font-mono text-orange-500 font-bold">6/6 Active</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-2.5">
                           <div className="h-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 rounded-full w-full" />
                        </div>
                        <div className="flex items-center justify-between">
                           <span className="text-[8px] font-mono text-zinc-600">Growth_Multiplier</span>
                           <span className="text-[10px] font-black text-emerald-500">4.7x</span>
                        </div>
                     </div>
                   </div>
                </div>

                {/* Layer 2: Light "Coverage Dashboard" Card */}
                <div
                  className="relative z-20 bg-white/90 rounded-[32px] sm:rounded-[44px] shadow-[0_40px_80px_rgba(0,0,0,0.15)] border border-white/50 overflow-hidden"
                  style={{ backdropFilter: "blur(32px)", WebkitBackdropFilter: "blur(32px)" }}
                >
                  <div className="px-6 py-4 border-b border-zinc-100 bg-white/30 flex items-center gap-6" style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
                    <div className="flex gap-2.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-orange-400/80" />
                      <div className="w-3.5 h-3.5 rounded-full bg-zinc-200" />
                      <div className="w-3.5 h-3.5 rounded-full bg-zinc-200" />
                    </div>
                    <div className="flex-1 bg-white/60 rounded-2xl px-5 py-2.5 flex items-center gap-3 border border-zinc-200/30">
                      <Search size={10} className="text-zinc-300" />
                      <span className="text-[8.5px] text-zinc-400 font-black uppercase tracking-[0.2em]">groworbit / optimization_matrix</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-[0.2em]">Optimization Coverage</p>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[8px] font-mono text-emerald-600 uppercase tracking-widest">All Systems Go</span>
                      </div>
                    </div>

                    {/* 2x3 Metric Tile Grid */}
                    <div className="grid grid-cols-2 gap-1.5 mb-3.5">
                      {[
                        { icon: <Search size={13} />, label: "Keywords", metric: "2,400+", sub: "Indexed", fill: 100 },
                        { icon: <Camera size={13} />, label: "Images", metric: "+40%", sub: "CTR Lift", fill: 95 },
                        { icon: <PenTool size={13} />, label: "Copy", metric: "Top 3", sub: "Rank", fill: 92 },
                        { icon: <LayoutGrid size={13} />, label: "A+ Content", metric: "+20%", sub: "CVR", fill: 88 },
                        { icon: <BookOpen size={13} />, label: "Brand Story", metric: "Live", sub: "Active", fill: 85 },
                        { icon: <Store size={13} />, label: "Storefront", metric: "Built", sub: "Deployed", fill: 80 },
                      ].map((tile, i) => (
                        <div key={i} className="bg-zinc-50/80 rounded-xl p-2.5 border border-zinc-100 hover:border-orange-200/50 transition-all">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-lg bg-white border border-zinc-100 flex items-center justify-center text-orange-500 shrink-0">{tile.icon}</div>
                            <div className="min-w-0">
                              <p className="text-[10px] font-black uppercase tracking-tight text-zinc-800 truncate">{tile.label}</p>
                              <p className="text-[7px] font-mono text-zinc-400 truncate">{tile.sub}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" style={{ width: `${tile.fill}%` }} />
                            </div>
                            <span className="text-[9px] font-black text-orange-500 shrink-0">{tile.metric}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Score Strip */}
                    <div className="bg-zinc-950/90 rounded-[24px] sm:rounded-[28px] px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between border border-white/5 shadow-2xl" style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                           <Activity size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <div className="min-w-0">
                           <p className="text-[8px] sm:text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-0.5 truncate">Listing Power</p>
                           <p className="text-[13px] sm:text-xl font-black text-white tracking-tighter uppercase leading-none truncate">Fully Optimized</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                         <span className="text-xl sm:text-3xl font-black text-orange-500 leading-none">100%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layer 3: Floating Revenue Impact Card */}
                <div
                  className="hidden sm:block relative z-30 bg-white/92 rounded-[32px] p-7 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-white/50 max-w-[220px] transition-all duration-700"
                  style={{ transform: "translateY(-110px) translateX(-120px)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
                >
                   <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shadow-inner shrink-0">
                        <TrendingUp size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">Revenue Impact</span>
                        <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest leading-none">Verified Result</span>
                      </div>
                   </div>
                   <div className="flex items-baseline gap-2 mb-1">
                     <span className="text-4xl font-black text-zinc-900 tracking-tighter leading-none">+45%</span>
                     <span className="text-[11px] font-black text-orange-500 uppercase">Avg Lift</span>
                   </div>
                   <div className="mt-5 pt-5 border-t border-zinc-100">
                      <div className="flex items-center justify-between">
                         <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.15em]">Organic reach</span>
                         <span className="text-[10px] font-black text-emerald-600">2.4x Multiplier</span>
                      </div>
                   </div>
                </div>

              </div>
            </div>

            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10">
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[160px]" />
               <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-orange-400/5 rounded-full blur-[120px]" />
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
    { v: "1,200+", l: "SKUs Optimized",       i: <Target size={14} />     },
    { v: "+45%",   l: "Avg Conversion Lift",   i: <TrendingUp size={14} /> },
    { v: "80+",    l: "Brands Served",         i: <Users size={14} />      },
    { v: "10-14",  l: "Day Delivery",          i: <Zap size={14} />        },
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
          <Link href="/contact" className="group relative flex flex-col items-center sm:items-start justify-center sm:justify-start col-span-2 lg:col-span-1 border-t lg:border-t-0 lg:border-l border-orange-500/20 pt-8 lg:pt-0 lg:pl-8 transition-all duration-500 hover:bg-orange-500/[0.02] no-underline">
            <div className="text-orange-500 mb-3 group-hover:translate-x-1 transition-transform hidden lg:block"><ArrowRight size={14} /></div>
            <span className="text-lg font-black text-white uppercase tracking-tighter leading-tight group-hover:text-orange-400 transition-colors whitespace-nowrap flex items-center gap-2">
              Get Optimized
              <ArrowRight size={14} className="lg:hidden" />
            </span>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">FREE_ANALYSIS</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   03 — WHY FULL OPTIMIZATION MATTERS
   ═══════════════════════════════════════════════ */
function WhyItMatters() {
  const reasons = [
    { icon: <MousePointer2 size={22} />,  stat: "80%",    statLabel: "decision power",  title: "Visual Predetermination",  desc: "Shoppers decide to stay or bounce within 3 seconds of clicking. Your listing's visual hierarchy is the only thing controlling that decision." },
    { icon: <TrendingUp size={22} />,     stat: "4.5x",   statLabel: "conversion lift", title: "Trust Architecture",       desc: "A professionally optimized listing removes subconscious purchase barriers, making the transition from 'browsing' to 'buying' seamless." },
    { icon: <Zap size={22} />,            stat: "92%",    statLabel: "ad efficiency",   title: "PPC Performance",          desc: "Higher organic conversion means your ad spend works harder. Stop dumping money into a leaky funnel and start scaling with confidence." },
    { icon: <FileText size={22} />,       stat: "100%",   statLabel: "index rate",      title: "SEO Depth",                desc: "Mapping thousands of search terms into a readable, persuasive format that robots can index and humans can't stop reading." },
    { icon: <ShieldCheck size={22} />,    stat: "Zero",   statLabel: "customer doubt",  title: "Brand Authority",          desc: "Matching your design quality to your product quality. When the listing looks premium, the product price becomes irrelevant." },
    { icon: <Activity size={22} />,       stat: "Top 1%", statLabel: "CTR mastery",     title: "Click Dominance",          desc: "Winning the click in search is just step one. We build long-term organic authority that compounds week over week." },
  ];

  return (
    <section className="py-32 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>The Science</SectionLabel>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-8 text-zinc-900">
              Why full<br />optimization<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">decides everything.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-10">
              On Amazon, you aren't just selling a product — you're selling a listing. If your listing isn't engineered for conversion, you're leaving 70% of your revenue on the table.
            </p>
            <Link href="/contact" className="group flex items-center gap-3 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
              Scale my listing performance <ArrowRight size={13} />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <div key={i} className="group bg-[#fafafa] hover:bg-white rounded-[28px] p-7 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/50">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">{r.icon}</div>
                  <div className="text-right">
                    <span className="text-2xl font-black tracking-tighter text-orange-500 leading-none">{r.stat}</span>
                    <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest mt-0.5">{r.statLabel}</p>
                  </div>
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
   04 — THE 6 PILLARS (dark bento)
   ═══════════════════════════════════════════════ */
function SixPillars() {
  const pillars = [
    { icon: <Search size={24} />,      title: "SEO & Keyword Architecture", metric: "100%",  tag: "INDEX",  desc: "Deep algorithmic keyword research covering root terms, long-tail phrases, backend 250-byte fields, Spanish translations and misspellings — every search surface indexed." },
    { icon: <Camera size={24} />,      title: "Professional Images",        metric: "+40%",  tag: "CTR",    desc: "Thumbnail-validated main image plus 6–7 secondary images including lifestyle shots, infographics, size charts, and feature callouts — designed to convert." },
    { icon: <PenTool size={24} />,     title: "Conversion Copywriting",     metric: "Top 3", tag: "RANK",   desc: "Benefit-first bullet points, keyword-seeded titles, and a product description that reads like a brand story — not a spec sheet." },
    { icon: <LayoutGrid size={24} />,  title: "A+ Content",                 metric: "+20%",  tag: "CVR",    desc: "Rich visual modules replacing your flat text description — comparison charts, feature grids, lifestyle banners, and brand headers that elevate perceived value." },
    { icon: <BookOpen size={24} />,    title: "Brand Story",                metric: "Trust", tag: "BRAND",  desc: "Amazon's Brand Story carousel that appears above all your A+ Content — building credibility, cross-selling your catalog, and cementing brand identity." },
    { icon: <Store size={24} />,       title: "Brand Storefront",           metric: "Scale", tag: "STORE",  desc: "A complete brand headquarters on Amazon — custom-built storefront with navigation, category pages, and product collections that turn browsers into loyal buyers." },
    { icon: <Video size={24} />,       title: "Premium Listing Video",      metric: "+25%",  tag: "VIDEO",  desc: "Amazon Shoppable Video creation — high-production shorts that play directly in your image block and 'Video' section, dramatically reducing bounce rates." },
  ];

  return (
    <section className="py-32 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-500/[0.08] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-orange-500/[0.04] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <SectionLabel light>The Ecosystem</SectionLabel>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              Seven layers.<br />One complete<br />
              <span className="italic font-serif text-zinc-500 lowercase tracking-normal">listing system.</span>
            </h2>
          </div>
          <p className="text-zinc-400 font-light max-w-sm text-sm leading-relaxed pb-2">
            Each layer reinforces the others. SEO without great images loses clicks. Great images without A+ lose the sale. We deploy all seven together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Large featured first pillar */}
          <div className="lg:row-span-2 group relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-[40px] p-10 lg:p-14 flex flex-col justify-between overflow-hidden min-h-[400px]">
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1.5px, transparent 1.5px)", backgroundSize: "20px 20px" }} />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Layer 01 — Foundation
              </div>
              <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
                {pillars[0].icon}
              </div>
              <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tight mb-4">{pillars[0].title}</h3>
              <p className="text-white/80 text-base font-light leading-relaxed max-w-sm">{pillars[0].desc}</p>
            </div>
            <div className="relative z-10 mt-8 flex items-center justify-between border-t border-white/20 pt-6">
              <span className="text-5xl font-black text-white/90 tracking-tighter">{pillars[0].metric}</span>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/50">Index_Rate</span>
            </div>
          </div>

          {/* Remaining 6 pillars */}
          {pillars.slice(1).map((p, i) => (
            <div key={i} className={`group relative bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-orange-500/30 rounded-[32px] p-8 transition-all duration-500 overflow-hidden ${i === 4 ? "lg:col-span-2" : ""}`}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/5 rounded-full blur-[60px] -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">{p.icon}</div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-white/10 group-hover:text-orange-500/30 transition-colors select-none">{String(i + 2).padStart(2, "0")}</span>
                  </div>
                </div>
                <span className="text-[8px] font-mono font-bold text-orange-500 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full uppercase tracking-widest self-start mb-3">{p.tag}</span>
                <h3 className="text-sm font-black uppercase tracking-tight mb-3 group-hover:text-orange-400 transition-colors">{p.title}</h3>
                <p className="text-zinc-500 text-xs font-light leading-relaxed flex-1 group-hover:text-zinc-400 transition-colors">{p.desc}</p>
                <div className="mt-4 flex items-center gap-3 pt-4 border-t border-white/5">
                  <span className="text-lg font-black text-orange-500">{p.metric}</span>
                  <div className="h-px flex-1 bg-white/5" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
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
   05 — THE PROCESS (4 steps)
   ═══════════════════════════════════════════════ */
function OurProcess() {
  const steps = [
    { num: "01", title: "Keyword Discovery & SEO",     desc: "Deep keyword research covering your full search universe — root terms, long-tail phrases, competitor gaps, and backend fields — building a foundation for sustained ranking.",   icon: <Search size={18} />      },
    { num: "02", title: "Design & Media Creation",     desc: "Compelling main image, 6 secondary images, A+ content modules, and Brand Story — all created together as a cohesive visual system that converts at every scroll depth.",     icon: <Camera size={18} />      },
    { num: "03", title: "Strategic Copywriting",       desc: "Keyword-seeded titles, benefit-first bullet points, and product descriptions written for both the A9 algorithm and the human psychology of purchase decisions.",            icon: <PenTool size={18} />     },
    { num: "04", title: "Deployment & Optimisation",   desc: "Clean integration into your Seller Central account — correct category nodes, backend search terms, image sequencing, and A+ publishing — then ongoing monitoring.",          icon: <CheckCircle2 size={18} /> },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>The Process</SectionLabel>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-zinc-900 leading-[0.9] uppercase">
              A proven plan to<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-zinc-300 italic font-light lowercase tracking-normal">increase sales.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            An effective Amazon listing grabs attention, connects emotionally, highlights features, and feeds a compounding loop of more exposure and more sales.
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
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-tl-[4px]" />
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

        <div className="mt-12 flex items-center justify-between p-8 bg-white rounded-[32px] border border-zinc-100">
          <div className="flex items-center gap-4 text-zinc-400">
            <Terminal size={16} />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Optimization_Protocol_01-04</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest italic whitespace-nowrap">Collaborative from brief to launch</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   06 — BEFORE / AFTER RESULTS
   ═══════════════════════════════════════════════ */
function RealResults() {
  const transformations = [
    {
      id: "li-06",
      niche: "Supplements & Health",
      tag: "Listing Setup",
      before: { label: "Standard photos", note: "Cluttered, amateur lighting", img: "/images/before/supplements_before.png" },
      after: { label: "Premium 3D Rendering", note: "+45% CVR Lift", img: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872097/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/main_image.jpg" },
      icon: <Sparkles size={20} />
    },
    {
      id: "li-03",
      niche: "Home & Kitchen",
      tag: "Full Optimization",
      before: { label: "Basic descriptions", note: "Text unreadable on mobile", img: "/images/before/vacuum_before.png" },
      after: { label: "Lifestyle infographs", note: "+32% Organic Sales", img: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872054/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/main_image.jpg" },
      icon: <Search size={20} />
    },
    {
      id: "li-04",
      niche: "Automotive Tools",
      tag: "Visual Refresh",
      before: { label: "Amateur photography", note: "No benefit-first imagery", img: "/images/before/tire_before.png" },
      after: { label: "Emotion-led lifestyle", note: "+61% CTR In Search", img: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872075/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/main_image.jpg" },
      icon: <TrendingUp size={20} />
    },
    {
      id: "li-02",
      niche: "EDC Gear",
      tag: "Premium Overhaul",
      before: { label: "Inconsistent branding", note: "No premium brand feel", img: "/images/before/nexa_before.png" },
      after: { label: "High-end studio assets", note: "+28% Revenue Jump", img: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872034/grow_orbit_portfolio/assets/portfolio/nexa_pouches/main_image.jpg" },
      icon: <Camera size={20} />
    },
  ];

  return (
    <section className="py-32 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Real Results</SectionLabel>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900">
              Making every<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">listing count.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            Same product, same keywords, same ad spend. Only the listing changed. These are real transformations by our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
          {transformations.map((t, i) => (
            <Link
              key={i}
              href={`/portfolio/${t.id}`}
              className="group bg-white rounded-[32px] border border-zinc-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.1)] hover:border-orange-500/20 transition-all duration-500 overflow-hidden no-underline block"
            >
              {/* Header */}
              <div className="px-7 pt-7 pb-5 border-b border-zinc-50 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono font-bold text-orange-500 uppercase tracking-[0.3em]">{t.tag}</span>
                  <h4 className="font-black text-[14px] uppercase tracking-tight text-zinc-900 mt-0.5 group-hover:text-orange-500 transition-colors">{t.niche}</h4>
                </div>
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                  {t.icon}
                </div>
              </div>

              {/* Before / After split */}
              <div className="grid grid-cols-2 gap-0 relative">
                {/* Connector Arrow */}
                <div className="absolute top-[calc(40%-10px)] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-white shadow-[0_8px_20px_rgba(0,0,0,0.1)] border border-zinc-100 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform duration-500">
                   <ArrowRight size={12} strokeWidth={3} />
                </div>

                {/* Before */}
                <div className="p-3.5 border-r border-zinc-50">
                  <div className="aspect-[4/3] mb-4 relative overflow-hidden rounded-2xl border border-zinc-100 shadow-sm">
                    <img src={t.before.img} className="w-full h-full object-cover" alt="Before" />
                    <div className="absolute top-2 left-2 bg-red-100 text-red-500 text-[7px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">Before</div>
                  </div>
                  <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-wide mb-1">{t.before.label}</p>
                  <p className="text-[10px] text-zinc-400 font-light">{t.before.note}</p>
                </div>
                {/* After */}
                <div className="p-3.5">
                  <div className="aspect-[4/3] mb-4 relative overflow-hidden rounded-2xl border border-orange-100 shadow-sm">
                    <img src={t.after.img} className="w-full h-full object-cover" alt="After" />
                    <div className="absolute top-2 left-2 bg-orange-500 text-white text-[7px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">Optimized</div>
                  </div>
                  <p className="text-[11px] font-bold text-zinc-900 uppercase tracking-wide mb-1">{t.after.label}</p>
                  <p className="text-[10px] text-emerald-600 font-bold">{t.after.note}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
           <Link
            href="/portfolio"
             className="inline-flex items-center gap-3 bg-black hover:bg-orange-500 transition-all duration-300 text-white font-black text-[11px] uppercase tracking-widest px-8 py-4 rounded-full no-underline"
           >
             View Full Portfolio <ArrowRight size={14} />
           </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   07 — THE CONVERSION FORMULA (dark)
   ═══════════════════════════════════════════════ */
function ConversionFormula() {
  const elements = [
    { tag: "SEO",    label: "Headline Architecture",       desc: "We don't just write titles—we engineer Headline Architecture that captures 4x more search volume by indexing for high-intent long-tail keywords without sacrificing CTR or brand authority." },
    { tag: "LOGIC",  label: "Conversion Logic",          desc: "Instead of generic layouts, we structure bullets to answer the 3 specific objections 87% of shoppers have before they buy—eliminating hesitation at the point of sale." },
    { tag: "VISUAL", label: "Visual Narrative",           desc: "Beyond pretty pictures, we build a Visual Narrative that guides the shopper's eye from the 'hook' image to the 'proof' modules, ensuring a zero-friction path to the cart." },
    { tag: "TRUST",  label: "Trust Engineering",          desc: "We deploy Trust Engineering by embedding 12+ cognitive triggers (like social proof and scarcity) into the image stack to reduce bounce rates and increase add-to-cart rates by 28% on average." },
    { tag: "VOC",    label: "Review Mining",              desc: "We extract 'Voice of Customer' data from thousands of competitor reviews to identify what buyers actually value, using their own language to sell your product back to them." },
    { tag: "MOBILE", label: "Mobile-First Design",        desc: "80% of Amazon clicks happen on mobile. We validate every pixel for the mobile viewport, ensuring your listing looks premium and readable even as a tiny thumbnail on a smartphone." },
  ];

  return (
    <section className="py-32 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-500/[0.08] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-orange-500/[0.04] blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <SectionLabel light>The Formula</SectionLabel>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88]">
              What makes a listing<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-500 lowercase tracking-normal">truly convert.</span>
            </h2>
          </div>
          <p className="text-zinc-400 font-light max-w-sm text-sm leading-relaxed pb-2">
            A high-performance listing isn't a collection of images and text — it's a conversion engine built on data, design, and psychology working together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {elements.map((e, i) => (
            <div key={i} className="group bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-orange-500/30 rounded-[28px] p-7 transition-all duration-500">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[8px] font-mono font-bold text-orange-500 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-full uppercase tracking-widest">{e.tag}</span>
                <div className="h-px flex-1 bg-white/5 group-hover:bg-orange-500/20 transition-colors" />
              </div>
              <h4 className="text-[13px] font-black uppercase tracking-[0.12em] text-white mb-3 group-hover:text-orange-400 transition-colors">{e.label}</h4>
              <p className="text-zinc-500 text-xs font-light leading-relaxed group-hover:text-zinc-400 transition-colors">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   08 — PACKAGES
   ═══════════════════════════════════════════════ */
function Packages() {
  const tiers = [
    {
      name: "Basic Setup",
      tag: "Foundation",
      desc: "Core SEO and copywriting — ensures your product indexes and ranks for foundational keywords with zero fluff.",
      features: [
        "Title & keyword optimisation",
        "5 conversion-focused bullet points",
        "Backend search terms (250 bytes)",
        "Category node audit & fix",
        "Competitor keyword gap report",
        "1 revision round",
      ],
      delivery: "3–5 Days",
    },
    {
      name: "Advanced Combo",
      tag: "Most Popular",
      desc: "The perfect balance of text and visual — replaces flat assets with high-converting designs that double your listing's impact.",
      features: [
        "Everything in Basic Setup",
        "Main image CTR optimisation",
        "Up to 6 secondary listing images",
        "Standard A+ Content (5 modules)",
        "Image alt-text SEO optimisation",
        "Mobile-first validation",
        "2 revision rounds",
      ],
      delivery: "10–14 Days",
      popular: true,
    },
    {
      name: "Full Scale",
      tag: "Premium",
      desc: "The complete listing transformation — including video and Brand Store integration for maximum category authority.",
      features: [
        "Everything in Advanced Combo",
        "Premium A+ Content (7 modules)",
        "Amazon shoppable video creation",
        "Brand Story carousel build",
        "Brand Store page design & setup",
        "3 revision rounds",
        "Dedicated strategy manager",
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
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900">
              Choose your<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">level of scale.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            From basic keyword mapping to a complete visual overhaul — every tier is a complete system, not a collection of individual deliverables.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <div key={i} className="relative rounded-[40px] overflow-hidden flex flex-col">
              {tier.popular && <div className="h-1 w-full bg-gradient-to-r from-orange-500 to-amber-400 shrink-0" />}
              <div className={`flex-1 border p-8 lg:p-10 flex flex-col transition-all duration-500 ${
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
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${tier.popular ? "text-zinc-600" : "text-zinc-400"}`}>Turnaround</span>
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
                    Start Optimization
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
   09 — PORTFOLIO
   ═══════════════════════════════════════════════ */
function Portfolio() {
  const examples = [
    {
      id: "li-06",
      niche: "Health & Supplements",
      rating: 4.8,
      reviews: "2,104",
      metric: { val: "+130%", label: "SALES LIFT" },
      heroImg: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872097/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/main_image.jpg",
      thumbs: [
        "/images/before/supplements_before.png",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872097/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/main_image.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872086/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/3.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872088/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/4.jpg"
      ]
    },
    {
      id: "li-02",
      niche: "EDC Gear",
      rating: 4.8,
      reviews: "1,245",
      metric: { val: "+65%", label: "CVR LIFT" },
      heroImg: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872034/grow_orbit_portfolio/assets/portfolio/nexa_pouches/main_image.jpg",
      thumbs: [
        "/images/before/nexa_before.png",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872034/grow_orbit_portfolio/assets/portfolio/nexa_pouches/main_image.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872016/grow_orbit_portfolio/assets/portfolio/nexa_pouches/3.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872017/grow_orbit_portfolio/assets/portfolio/nexa_pouches/4.jpg"
      ]
    },
    {
      id: "li-03",
      niche: "Home & Auto",
      rating: 4.9,
      reviews: "4,102",
      metric: { val: "+90%", label: "SALES LIFT" },
      heroImg: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872054/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/main_image.jpg",
      thumbs: [
        "/images/before/vacuum_before.png",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872054/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/main_image.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872036/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/2.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872037/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/3.jpg"
      ]
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <SectionLabel>Portfolio</SectionLabel>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Listings done<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                right.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-4">
            A curated showcase of high-fidelity, Amazon-optimized visual systems that stop the scroll and close the sale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {examples.map((ex, i) => (
            <Link
              key={i}
              href={`/portfolio/${ex.id}`}
              className="group relative block p-5 bg-[#f0f4f8] rounded-[36px] transition-all duration-700 ease-out no-underline border border-transparent shadow-[10px_10px_20px_#d2dbe6,-10px_-10px_20px_#ffffff] hover:shadow-[16px_16px_32px_#d2dbe6,-16px_-16px_32px_#ffffff]"
            >
               {/* Card Header (Category & Status) */}
               <div className="flex items-center justify-between mb-4 px-1">
                 <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-zinc-500 uppercase">{ex.niche}</span>
                 <div className="flex items-center gap-1 bg-white/40 backdrop-blur-sm border border-white/45 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.02)] px-2.5 py-1 rounded-full">
                   <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                   <span className="text-[6px] font-black uppercase tracking-widest text-orange-500">Optimized</span>
                 </div>
               </div>

               {/* Top Section: Thumbs + Main Image */}
               <div className="flex gap-3 mb-4">

                 {/* Left Thumbs Column */}
                 <div className="w-[20%] flex flex-col gap-2 shrink-0">
                   {/* BEFORE THUMBNAIL */}
                   <div className="aspect-square rounded-2xl overflow-hidden border-[3px] border-red-500/30 bg-red-50 relative group/before">
                     <img src={ex.thumbs[0]} className="w-full h-full object-cover p-0 opacity-80" />
                     <div className="absolute inset-0 bg-red-500/10" />
                     <div className="absolute bottom-1 left-0 right-0 flex justify-center">
                       <span className="text-[5px] font-black text-red-600 bg-white/90 px-1 rounded-sm uppercase tracking-widest">Before</span>
                     </div>
                   </div>

                   {/* OTHER THUMBNAILS */}
                   {ex.thumbs.slice(1).map((t, idx) => (
                     <div key={idx} className="aspect-square rounded-2xl overflow-hidden border border-white/45 bg-white/30 backdrop-blur-md shadow-sm">
                       <img src={t} alt="Thumbnail" className="w-full h-full object-contain p-1 rounded-xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-300" />
                     </div>
                   ))}
                 </div>

                 {/* Main Listing Viewport (approx 1:1) */}
                 <div className="flex-1 aspect-square rounded-2xl overflow-hidden relative bg-white/90 backdrop-blur-md border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.03)] flex items-center justify-center">
                    <img
                      src={ex.heroImg}
                      alt={ex.niche}
                      className="w-full h-full object-cover p-0 transition-transform duration-[3s] group-hover:scale-105"
                    />

                    {/* Enhanced Hover Overlay (Centered Premium Indicator) */}
                    <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center z-10">
                      <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center text-white mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <Eye size={20} />
                      </div>
                      <span className="text-white font-black text-[8px] tracking-[0.3em] uppercase text-center px-4 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        View Details
                      </span>
                    </div>

                    {/* Top Right Analytics (Metric Pill) */}
                    <div className="absolute top-3 right-3 z-20 bg-zinc-950/90 backdrop-blur-3xl border border-white/10 rounded-xl p-2 flex flex-col items-center justify-center gap-0.5 shadow-none transform transition-transform duration-500 group-hover:translate-y-[-2px]">
                      <span className="text-orange-500 font-black text-xs tracking-tighter leading-none">{ex.metric.val}</span>
                      <span className="text-[5px] font-bold uppercase tracking-widest text-zinc-500 leading-none">{ex.metric.label}</span>
                    </div>

                    {/* Bottom Right Indicator */}
                    <div className="absolute bottom-3 right-3 z-20 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 border border-zinc-100/50">
                      <span className="text-zinc-600 font-bold text-[8px] tracking-wider">1 / 7</span>
                    </div>
                 </div>
               </div>

               {/* Rating Section */}
               <div className="flex items-center gap-2 mb-4 px-1">
                 <div className="flex gap-[2px] text-orange-500">
                    {[...Array(4)].map((_, idx) => <Star key={idx} size={13} className="fill-orange-500" />)}
                    <StarHalf size={13} className="fill-orange-500 text-orange-500" />
                 </div>
                 <span className="font-extrabold text-orange-500 text-[12px] tracking-tight">{ex.rating}</span>
                 <span className="text-zinc-500 text-[10px] font-medium ml-1">({ex.reviews} ratings)</span>
               </div>

               {/* Premium Neumorphic Feature Tags Grid */}
               <div className="grid grid-cols-4 gap-1.5 mt-4 px-0.5 border-t border-white/40 pt-4">
                 {[
                   { label: "Hero", icon: <Camera size={11} />, colorClass: "text-blue-500" },
                   { label: "Lifestyle", icon: <ShoppingBag size={11} />, colorClass: "text-emerald-500" },
                   { label: "Infographic", icon: <Sparkles size={11} />, colorClass: "text-violet-500" },
                   { label: "3D Render", icon: <Boxes size={11} />, colorClass: "text-orange-500" },
                 ].map((tag, j) => (
                   <div key={j} className="col-span-1 flex flex-col items-center justify-center py-2.5 rounded-2xl bg-white/35 backdrop-blur-md border border-white/30 shadow-[0_4px_12px_rgba(0,0,0,0.01)] group-hover:bg-white/50 group-hover:border-orange-500/15 transition-all duration-300">
                     <div className={`${tag.colorClass} mb-1 transition-transform duration-300 group-hover:scale-110`}>
                       {tag.icon}
                     </div>
                     <span className="text-zinc-500 group-hover:text-zinc-950 font-bold text-[7px] sm:text-[8px] uppercase tracking-widest transition-colors leading-none">{tag.label}</span>
                   </div>
                 ))}
               </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Link
            href="/portfolio"
             className="inline-flex items-center gap-3 bg-black hover:bg-orange-500 transition-all duration-300 text-white font-black text-[11px] uppercase tracking-widest px-8 py-4 rounded-full no-underline"
          >
            View All Listing Images
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   10 — SOCIAL PROOF
   ═══════════════════════════════════════════════ */
function SocialProof() {
  const testimonials = [
    { quote: "Our sales tripled within 30 days of the full optimization. The keyword depth combined with the new visual hierarchy changed everything for our supplement line.", name: "Marcus T.", role: "Health Brand Owner",    result: "3x Sales Lift" },
    { quote: "I thought my listing was fine. Then Grow Orbit showed me the mobile-first validation. After the fix, our conversion rate jumped by 40% in the first week.", name: "Sarah J.", role: "Home Goods Seller",       result: "+40% CVR" },
    { quote: "The most robust listing optimization I've seen. They didn't just 'edit' — they re-architected the entire brand presence on Amazon from the ground up.", name: "James R.", role: "Tech Category Leader",   result: "BSR Top 50" },
  ];

  return (
    <section className="py-32 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Sellers Are Saying</SectionLabel>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900">
              Helping brands<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">dominate Amazon.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            Real results from brands that stopped accepting mediocrity and optimized for the win.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="group bg-white rounded-[32px] p-8 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500 hover:shadow-2xl flex flex-col">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => <Star key={j} size={14} className="text-orange-500 fill-orange-500" />)}
              </div>
              <div className="relative flex-1 mb-8">
                <Quote size={20} className="text-orange-500/20 absolute -top-1 -left-1" />
                <p className="text-zinc-600 text-[14px] font-light leading-relaxed pl-4 italic">"{t.quote}"</p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-zinc-50">
                <div>
                  <p className="font-black text-[13px] uppercase tracking-tight text-zinc-900">{t.name}</p>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">{t.role}</p>
                </div>
                <div className="bg-orange-50 border border-orange-100 rounded-xl px-3 py-2 text-right">
                  <p className="text-[9px] font-mono text-orange-500 font-bold uppercase tracking-widest">{t.result}</p>
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
   11 — WHO IT'S FOR
   ═══════════════════════════════════════════════ */
function WhoItsFor() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let ctx = gsap.context(() => {
        const blocks = gsap.utils.toArray(".signal-block");
        blocks.forEach((block) => {
          gsap.fromTo(
            block,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: block,
                start: "top 85%",
              },
            }
          );
        });
      }, sectionRef);
      return () => ctx.revert();
    }
  }, []);

  const signals = [
    {
      index: "01",
      icon: <TrendingUp size={18} />,
      label: "STAGNANT VELOCITY",
      status: "MARKET CAP CEILING",
      statusColor: "text-red-500 bg-red-500/10 border-red-500/20",
      headline: "The Growth Plateau: Your ad spend is working, but your organic isn't.",
      subline: "Velocity diagnostic.",
      body: "When you rely solely on PPC, you're renting your rank. We re-engineer your listing's SEO and conversion architecture to force organic momentum—breaking the ceiling that generic listings can't pass.",
      symptoms: [
        "Plateaued sales despite increasing ad spend",
        "High ACoS with stagnant organic market share",
        "Competitors with 'cheaper' products outranking you"
      ],
      accentGradient: "from-orange-500 to-amber-400",
    },
    {
      index: "02",
      icon: <Award size={18} />,
      label: "LAUNCH VOLATILITY",
      status: "FIRST-MOVER RISK",
      statusColor: "text-orange-500 bg-orange-500/10 border-orange-500/20",
      headline: "The Launch Gap: You're entering a category, not dominating it.",
      subline: "Market entry analysis.",
      body: "Launching with a 'good' listing is a gamble. We ensure you enter with a 'perfect' system—syncing every layer of the PDP to capture maximum early velocity and lock in page 1 real estate before the competition reacts.",
      symptoms: [
        "Preparing a new ASIN for a high-competition niche",
        "Critical need for immediate social proof and sales velocity",
        "Zero established organic brand footprint"
      ],
      featured: true,
      accentGradient: "from-rose-500 to-orange-500",
    },
    {
      index: "03",
      icon: <Package size={18} />,
      label: "CATALOG FRAGMENTATION",
      status: "AUTHORITY DILUTION",
      statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      headline: "The Brand Disconnect: Your listings feel like individual products, not a brand.",
      subline: "Authority x-ray.",
      body: "Inconsistency across your catalog loses the cross-sell and dilutes perceived value. We build a cohesive visual and narrative system that bridges your storefront and every PDP—turning one-time buyers into loyal brand fans.",
      symptoms: [
        "Inconsistent listing quality across different SKUs",
        "High bounce rate between products in your storefront",
        "No clear visual identity across your PDP stack"
      ],
      accentGradient: "from-violet-500 to-orange-400",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 relative z-10">
        <div className="mb-12 lg:mb-20">
          <SectionLabel>Optimization Diagnostic</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 mt-4">
            <h2
              className="text-3xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Identify the<br />
              performance gap.
            </h2>
            <p className="text-zinc-500 text-sm lg:text-base font-light leading-relaxed max-w-md lg:text-right">
              Optimization isn't a checklist—it's a system. If your SEO and visual strategy aren't speaking the same language, your sales velocity will never hit peak potential.
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
                    [SYSTEM_SCAN_{s.index}]
                  </span>
                </div>

                <div className={`relative group transition-all duration-700 ${
                  isFeatured
                    ? "bg-zinc-950 rounded-[28px] lg:rounded-[48px] px-5 lg:px-16 py-10 lg:py-20 my-6 lg:my-8 shadow-[0_30px_80px_rgba(0,0,0,0.3)] lg:shadow-[0_50px_120px_rgba(0,0,0,0.4)] ring-1 ring-white/10"
                    : "py-10 lg:py-16 border-b border-zinc-50 last:border-0 lg:pl-8 lg:border-l-2 lg:border-l-transparent"
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
                          SYSTEM_SIGNAL: {s.subline.toUpperCase()}
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
                        <p className={`text-[13px] lg:text-[15px] font-light leading-[1.75] lg:leading-[1.85] mb-5 lg:mb-8 ${
                          isFeatured ? "text-zinc-400" : "text-zinc-500"
                        }`}>
                          {s.body}
                        </p>

                        <div className={`rounded-2xl lg:rounded-3xl p-5 lg:p-8 transition-all duration-700 ${
                          isFeatured
                            ? "bg-white/[0.02] border border-white/10 shadow-inner"
                            : "bg-white border border-zinc-200/60 group-hover:shadow-xl group-hover:shadow-zinc-200/40"
                        }`}>
                          <div className="flex items-center justify-between mb-4">
                            <span className={`text-[9px] font-mono font-black uppercase tracking-[0.4em] ${
                              isFeatured ? "text-orange-500/40" : "text-zinc-300"
                            }`}>
                              CONVERSION_SYMPTOMS
                            </span>
                            <div className={`w-8 h-px ${isFeatured ? "bg-white/10" : "bg-zinc-100"}`} />
                          </div>

                          <div className="space-y-4">
                            {s.symptoms.map((symptom, i) => (
                              <div key={i} className="flex items-start gap-4 group/symptom">
                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${
                                  isFeatured
                                    ? "bg-white/5 border border-white/5 text-orange-400 group-hover/symptom:bg-orange-500 group-hover/symptom:text-white"
                                    : "bg-white border border-zinc-100 text-orange-500/40 group-hover/symptom:border-orange-500 group-hover/symptom:text-orange-500"
                                }`}>
                                  <span className="text-[8px] font-mono font-bold">{i + 1}</span>
                                </div>
                                <span className={`text-[12px] font-bold leading-relaxed transition-colors duration-300 uppercase tracking-tight ${
                                  isFeatured ? "text-zinc-500 group-hover/symptom:text-zinc-300" : "text-zinc-700"
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
      </div>
    </section>
  );
}

function FullListingOptimizationCTA() {
  return (
    <div className="bg-white py-12 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 relative">
        <div className="bg-zinc-950 rounded-[24px] lg:rounded-[48px] border border-white/5 p-6 lg:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 lg:gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} className="text-orange-500" />
            </div>
            <div>
              <p className="text-[9px] lg:text-[11px] font-black uppercase tracking-[0.35em] lg:tracking-[0.4em] text-orange-500 mb-1.5">Standardize Your Listing</p>
              <p className="text-zinc-400 text-[13px] lg:text-base font-light leading-relaxed max-w-lg">
                Stop being a commodity in the search grid. Our conversion-first architecture provides the framework for 100% aesthetic authority and sales dominance.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-3 bg-white text-zinc-950 w-full md:w-auto px-6 lg:px-10 py-3.5 lg:py-5 rounded-full text-[10px] lg:text-[12px] font-black uppercase tracking-[0.2em] lg:tracking-[0.25em] hover:bg-orange-500 hover:text-white hover:shadow-[0_20px_50px_rgba(249,115,22,0.3)] transition-all duration-500 shrink-0 active:scale-[0.97] no-underline"
          >
            Get Free Listing Audit
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════
   12 — FAQ
   ═══════════════════════════════════════════════ */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: "How do I know if my product is right for full optimization?",                a: "If your product has search demand, good margins, and solves a real problem, it's a great fit. Our free SEO audit determines the exact search volume and competition level for your specific niche — whether you're launching new or refreshing an existing ASIN." },
    { q: "Do you guarantee increases in traffic or conversion?",                       a: "While Amazon's algorithm is always evolving, our proven process of combining aggressive keyword indexing with high-converting visuals consistently drives significant lifts in CTR, CVR, and BSR for our clients. The data speaks: 1,200+ SKUs optimized with an average +45% conversion lift." },
    { q: "How quickly will I see results after going live?",                           a: "Organic ranking shifts typically begin within 7–14 days as Amazon re-indexes your backend keywords. CTR and CVR improvements are visible much faster — often within 48–72 hours of uploading the new images and copy as shoppers begin responding to the improved listing." },
    { q: "Is this service for new products or existing listings?",                     a: "Both. For launches, we build your listing from scratch to enter the market with maximum organic and paid velocity. For existing listings, we run a full audit, identify every gap, and rebuild only what's underperforming — surgical precision on an established ASIN." },
    { q: "Do I need Brand Registry for the full optimization service?",                a: "Brand Registry is required for A+ Content, Brand Story, and Brand Storefront — the top three layers of our Full Scale tier. Basic Setup and keyword optimization are available without Brand Registry. We can also advise on the Brand Registry application process." },
    { q: "Is continuous optimization necessary over time?",                            a: "Yes. Amazon is a highly competitive, dynamic marketplace. Competitors shift strategies, search trends evolve, and Amazon frequently updates the A9/A10 algorithm. Ongoing optimization through our Ongoing Support service ensures your listing maintains rank and defends market share." },
  ];

  return (
    <section className="py-32 bg-[#fafafa] border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>FAQ_Protocol</SectionLabel>
            <h2 className="text-5xl md:text-[80px] font-black tracking-tighter uppercase leading-[0.85] mb-10 text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Frequently<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">asked.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-12">
              Answers to the most common questions about our full listing optimization process and what to expect.
            </p>
            <div className="p-6 bg-white rounded-3xl border border-zinc-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Free Listing Audit</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Every catalog is unique. Our team reviews your top listings and advises the best optimization path — at no cost, no obligation.
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
                  className="w-full flex items-center justify-between px-8 py-6 text-left"
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
                  <div className="px-6 sm:px-8 pb-8 pt-0 ml-0 sm:ml-10">
                    <div className="text-[13px] sm:text-[14px] text-zinc-500 leading-relaxed font-light border-l-2 border-orange-500/20 pl-4 sm:pl-6">{faq.a}</div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 px-6 sm:px-8 py-5 sm:py-6 bg-zinc-900 rounded-[24px] text-white">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center sm:justify-start">
                <Terminal size={16} className="text-orange-500 shrink-0" />
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold">Free_Listing_Audit</span>
              </div>
              <Link href="/contact" className="flex items-center justify-center gap-2 group no-underline w-full sm:w-auto py-3 sm:py-0 bg-white/5 sm:bg-transparent border border-white/10 sm:border-transparent rounded-xl sm:rounded-none transition-all hover:bg-white/10 sm:hover:bg-transparent">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 sm:text-zinc-400 group-hover:text-white transition-colors">Request Audit</span>
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
   13 — CTA
   ═══════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════
   14 — FOOTER NAV
   ═══════════════════════════════════════════════ */
function FooterNav() {
  return (
    <footer className="py-24 bg-white border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Previous Service</p>
          <Link href="/service/design/main-image-ctr" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start uppercase">
              <ArrowRight className="mr-3 group-hover:-translate-x-3 transition-transform rotate-180 size-6 md:size-8 shrink-0" />
              Main Image CTR
            </h4>
          </Link>
        </div>
        <div className="hidden md:block w-px h-16 bg-zinc-100" />
        <div className="text-center md:text-right w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Service</p>
          <Link href="/service" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end uppercase">
              All Services
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
export default function FullListingOptimizationPage() {
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white">
      <FullListingHero />
      <MetricsStrip />
      <WhyItMatters />
      <SixPillars />
      <RealResults />
      <ConversionFormula />
      <Packages />
      <Portfolio />
      {/* <SocialProof /> */}
      <OurProcess />
      <WhoItsFor />
      <FAQ />
      <FooterNav />
    </div>
  );
}