"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, ChevronRight, Plus, Minus, Terminal,
  TrendingUp, TrendingDown, Zap, Star, Target, Users, BarChart3, Shield,
  Monitor, Repeat, Globe, ShoppingCart, Eye, Award,
  MousePointerClick, Activity, Package, Radio, Calendar, SearchCode
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroButton from "@/components/ui/HeroButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────
   SHARED
───────────────────────────────────────────── */
const SectionLabel = ({ children, light = false }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500" />
    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.4em] ${
      light ? "text-orange-400" : "text-orange-500/80"
    }`}>{children}</span>
  </div>
);

const CheckItem = ({ children, light = false }) => (
  <div className="flex items-start gap-3">
    <CheckCircle2 size={15} className="text-orange-500 shrink-0 mt-0.5" />
    <span className={`text-[14px] font-light leading-snug ${light ? "text-zinc-300" : "text-zinc-600"}`}>{children}</span>
  </div>
);

/* ═══════════════════════════════════════════════
   01 — HERO
   ═══════════════════════════════════════════════ */
function DSPHero() {
  const floatRef = useRef(null);
  useEffect(() => {
    if (!floatRef.current) return;
    gsap.to(floatRef.current, { y: -12, duration: 4.5, repeat: -1, yoyo: true, ease: "power1.inOut" });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#fafafa]">
      <style>{`
        @keyframes shimmer-btn {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dsp-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
            <circle cx="60" cy="60" r="0.5" fill="currentColor" opacity="0.5" />
            <path d="M120 0 L120 120 M0 120 L120 120" stroke="currentColor" strokeWidth="0.2" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dsp-grid)" />
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
                <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
                <div className="w-4 h-[1px] bg-orange-500" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">Advertising Services</span>
              </div>

              <h1
                className="text-[42px] sm:text-6xl md:text-7xl lg:text-[85px] font-black tracking-tighter leading-[0.9] lg:leading-[0.85] mb-8 lg:mb-10 text-zinc-900 uppercase"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Amazon<br />
                <span className="text-orange-500">DSP</span><br />
                <span className="italic font-light lowercase tracking-tight text-zinc-300" style={{ fontFamily: "'Playfair Display', serif" }}>
                  advertising.
                </span>
              </h1>

              <div className="flex gap-6 mb-12">
                <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50" />
                <div>
                  <p className="text-lg md:text-[22px] text-zinc-500 font-light leading-relaxed max-w-xl mb-6">
                    <strong className="text-zinc-900 font-semibold block mb-3">DSP lets you reach Amazon shoppers on Google, Instagram, and 2,000+ other sites — using Amazon's purchase data.</strong>
                    Reach the right shoppers before they ever search. Reach Amazon shoppers who already viewed your category — and convert them at 3x the rate of standard PPC.
                  </p>
                  <div className="flex flex-wrap gap-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Programmatic Buying</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe size={10} className="text-orange-500/50" />
                      <span>On & Off Amazon</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  "Target by behavior, not just search terms",
                  "Re-engage past visitors and cart abandoners",
                  "Run ads on Amazon, IMDb, Twitch & beyond",
                  "Certified DSP experts managing every campaign",
                ].map((item, i) => <CheckItem key={i}>{item}</CheckItem>)}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mb-12">
                <HeroButton href="/get-started" className="w-full sm:w-auto">
                  Schedule My Discovery Call
                </HeroButton>
                <a href="#compare" className="group flex justify-center items-center gap-3 text-zinc-400 hover:text-zinc-900 font-bold text-[11px] uppercase tracking-widest px-2 py-4 transition-colors no-underline">
                  DSP vs PPC <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {[
                  { icon: <Award size={11} />,         label: "Certified DSP Experts" },
                  { icon: <Globe size={11} />,          label: "On & Off Amazon Reach"  },
                  { icon: <BarChart3 size={11} />,      label: "Real-Time Optimization"  },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2">
                    <span className="text-orange-500">{b.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{b.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-10 mt-10 pt-10 border-t border-zinc-100">
                {[
                  { label: "Managed Spend",   val: "$50M+" },
                  { label: "ROAS Improvement",  val: "+34%"   },
                  { label: "Channels Covered",  val: "8+"     },
                ].map((t, i) => (
                  <div key={i} className="text-left w-[45%] sm:w-auto">
                    <p className="text-xl sm:text-2xl font-black tracking-tighter text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>{t.val}</p>
                    <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Premium DSP Campaign Architecture */}
          <div className="lg:col-span-5 relative hidden lg:block self-start lg:mt-[60px] perspective-1000" ref={floatRef}>

            {/* Ambient Lighting */}
            <div className="absolute -inset-16 bg-gradient-to-br from-orange-500/30 via-transparent to-amber-500/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Main Console Container */}
            <div className="bg-zinc-950/90 backdrop-blur-3xl rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-white/10 p-6 relative overflow-hidden ring-1 ring-white/5">
               {/* Enhanced Grid Texture & Noise */}
               <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

               <div className="relative z-10">
                 {/* Header Bar */}
                 <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <div className="flex items-center gap-4">
                       <div className="flex gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                         <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                         <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                       </div>
                       <div className="h-4 w-px bg-white/10" />
                       <div className="flex items-center gap-2 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                         <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest font-bold">DSP Active</span>
                       </div>
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Radio size={10} className="text-orange-500" /> Advertising Console
                    </span>
                 </div>

                 {/* Browser Frame — Highly Stylized */}
                 <div className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden mb-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)] transform-gpu hover:scale-[1.02] transition-transform duration-500 group relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    {/* Browser Chrome */}
                    <div className="bg-zinc-950/80 border-b border-white/5 px-4 py-2.5 flex items-center gap-3">
                       <Globe size={10} className="text-zinc-600" />
                       <div className="flex-1 bg-zinc-900/80 rounded-md h-6 border border-white/5 flex items-center px-3 shadow-inner">
                         <span className="text-[8px] font-mono text-zinc-500 font-medium tracking-wide">advertising.amazon.com/<span className="text-white">dsp</span></span>
                       </div>
                       <Target size={10} className="text-zinc-600" />
                    </div>

                    {/* DSP Dashboard Mockup - Premium */}
                    <div className="relative p-5 bg-gradient-to-br from-zinc-800 to-zinc-900 overflow-hidden">
                       <div className="absolute right-0 top-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                       {/* Top Metrics Row */}
                       <div className="grid grid-cols-3 gap-3 mb-5 relative z-10">
                          {[
                            { label: "ROAS", val: "4.8x", color: "text-emerald-400" },
                            { label: "Impressions", val: "2.4M", color: "text-white" },
                            { label: "CTR", val: "1.2%", color: "text-white" }
                          ].map((m, i) => (
                             <div key={i} className="bg-zinc-800/60 backdrop-blur-sm border border-white/5 rounded-xl p-3 hover:border-white/10 transition-colors relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                <p className="text-[6px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-1">{m.label}</p>
                                <p className={`text-lg font-black tracking-tight ${m.color}`}>{m.val}</p>
                             </div>
                          ))}
                       </div>

                       {/* Targeting Engine Graphic */}
                       <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl p-4 mb-4 border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden group-hover:border-orange-500/20 transition-colors duration-500">
                          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                          <div className="flex justify-between items-center mb-3">
                             <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Active Segments</span>
                             <div className="bg-orange-500/20 px-2 py-0.5 rounded text-[6px] font-bold text-orange-400 uppercase tracking-widest">Live Optimization</div>
                          </div>

                          <div className="space-y-3 relative z-10">
                             {[
                               { label: "In-Market: Competitors", pct: 84 },
                               { label: "Retarget: Cart Abandoners", pct: 62 },
                               { label: "Lookalike: Past Purchasers", pct: 45 },
                             ].map((seg, i) => (
                               <div key={i} className="relative">
                                 <div className="flex justify-between mb-1">
                                   <span className="text-[9px] font-bold text-zinc-300">{seg.label}</span>
                                   <span className="text-[9px] font-black text-orange-500">{seg.pct}%</span>
                                 </div>
                                 <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                                   <div className="h-full bg-gradient-to-r from-orange-600 to-amber-400 rounded-full relative" style={{ width: `${seg.pct}%` }}>
                                      <div className="absolute top-0 right-0 w-2 h-full bg-white/30 rounded-full blur-[1px]" />
                                   </div>
                                 </div>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Network Reach */}
                 <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-xl p-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="flex -space-x-2">
                             <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center border-2 border-zinc-900 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)] z-30">A</div>
                             <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center border-2 border-zinc-900 text-white z-20"><Activity size={10} /></div>
                             <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center border-2 border-zinc-900 text-white z-10"><Monitor size={10} /></div>
                          </div>
                          <div>
                             <p className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Programmatic Reach</p>
                             <p className="text-sm font-black text-white leading-none">Omnichannel Ads</p>
                          </div>
                       </div>
                       <div className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/5">
                          <ArrowRight size={12} className="text-zinc-300" />
                       </div>
                    </div>
                 </div>

               </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -top-6 -right-6 bg-zinc-900/95 backdrop-blur-xl rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/10 z-20 flex items-center gap-3 hover:scale-105 transition-transform duration-300">
               <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                  <Target size={16} className="text-orange-400" />
               </div>
               <div>
                  <p className="text-[7px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em] mb-0.5">Targeting Data</p>
                  <p className="text-sm font-black text-white leading-none tracking-wide">1st-Party</p>
               </div>
            </div>

            <div className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur-xl rounded-3xl p-5 shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-zinc-200 flex items-center gap-4 z-40 animate-[float_6s_ease-in-out_infinite] hover:scale-105 transition-transform duration-300">
               <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 shadow-inner">
                  <TrendingUp size={18} className="text-emerald-600" />
               </div>
               <div>
                  <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-400 mb-1">Avg Performance</p>
                  <p className="text-lg font-black text-zinc-900 leading-none tracking-tight">3x Higher ROAS</p>
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
    { v: "$50M+", l: "Managed Spend",      i: <BarChart3 size={14} /> },
    { v: "+34%",   l: "Avg ROAS Lift",       i: <TrendingUp size={14} /> },
    { v: "8+",     l: "Ad Channels",         i: <Globe size={14} /> },
    { v: "2.4M",   l: "Monthly Impressions", i: <Eye size={14} /> },
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
              <span className="text-[10px] lg:text-[8px] font-mono text-zinc-600 uppercase tracking-widest">DSP_SLOTS_OPEN</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   03 — WHAT IS AMAZON DSP
   ═══════════════════════════════════════════════ */
function WhatIsDSP() {
  const adTypes = [
    { icon: <Monitor size={20} />,    title: "Display Ads (DPA)",      desc: "Shown on streaming TV (OTT) or the top, right, and third-party sites. A9 auto-placement, avoiding guesswork on targeting." },
    { icon: <TrendingUp size={20} />, title: "Dynamic e-Commerce",     desc: "A rich, product ad format driving up to 3x in-store products, optimizing campaigns based on Amazon shopping signals." },
    { icon: <Radio size={20} />,      title: "Audio Ads",              desc: "Non-skippable ads on Amazon Music, Alexa, Fire, and radio — enhancing brand awareness at every moment." },
    { icon: <Eye size={20} />,        title: "Video Ads (OLV)",        desc: "Out-stream video ads shown off Amazon. Brand-safe placements on premium publisher sites, IMDb, and Twitch." },
  ];

  return (
    <section className="py-20 lg:py-32 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>The Platform</SectionLabel>
            <h2
              className="text-[42px] sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] lg:leading-[0.88] mb-6 sm:mb-8 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              What is<br className="hidden sm:block" /> Amazon<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>DSP?</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed mb-6">
              Amazon DSP (Demand-Side Platform) is Amazon's programmatic advertising platform. It lets you buy display, video, and audio ads — reaching your exact customers based on real shopping behavior, both on and off Amazon.
            </p>
            <p className="text-zinc-500 text-base font-light leading-relaxed mb-10">
              Unlike PPC which targets keywords in search, DSP targets <span className="text-zinc-900 font-semibold">people</span> — by what they browse, buy, and watch. It's the most powerful way to build brand awareness and retarget shoppers at scale.
            </p>
            <Link href="/contact" className="group flex items-center gap-3 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
              Learn how DSP fits your strategy
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {adTypes.map((t, i) => (
              <div key={i} className="group bg-[#fafafa] hover:bg-white rounded-[28px] p-7 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/50">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mb-5 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                  {t.icon}
                </div>
                <h3 className="text-[13px] font-black uppercase tracking-[0.12em] text-zinc-900 mb-2 group-hover:text-orange-500 transition-colors">{t.title}</h3>
                <p className="text-zinc-400 text-xs font-light leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   04 — HOW DSP GENERATES SALES (dark)
   ═══════════════════════════════════════════════ */
function HowDSPWorks() {
  const capabilities = [
    {
      icon: <Target size={22} />,
      title: "Advanced Targeting",
      points: [
        "Target by in-market behavior, purchase history, and lifestyle",
        "Exclude already-converted customers automatically",
        "Serve different creatives to mobile vs desktop users",
        "Reach multiple Amazon accounts in the same household",
      ],
    },
    {
      icon: <Users size={22} />,
      title: "Custom Audiences",
      points: [
        "Build lookalike audiences from your best customers",
        "Re-engage product page visitors who didn't buy",
        "Target competitors' category shoppers directly",
        "Create purchase-intent audiences with Amazon signals",
      ],
    },
    {
      icon: <Repeat size={22} />,
      title: "Dynamic Targeting",
      points: [
        "Auto-adjust ad delivery in real-time to market changes",
        "Daypart targeting — serve ads at peak conversion hours",
        "Frequency cap control — never over-expose your audience",
        "Adapt targeting to ensure ads reach the right shoppers",
      ],
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-orange-500/[0.07] blur-[160px] rounded-full pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-20 gap-8">
          <div>
            <SectionLabel light>The Mechanics</SectionLabel>
            <h2
              className="text-[42px] sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] lg:leading-[0.88]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              How DSP<br />
              <span className="italic font-light text-zinc-600 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                generates sales.
              </span>
            </h2>
          </div>
          <p className="text-zinc-400 text-lg font-light max-w-md pb-2">
            DSP doesn't just show ads — it reaches the exact right people, at the right time, with the right message. Three targeting systems work together to drive measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => (
            <div key={i} className="group bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-orange-500/30 rounded-[32px] p-8 transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-6 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                {cap.icon}
              </div>
              <h3 className="text-[15px] font-black uppercase tracking-[0.12em] text-white mb-6 group-hover:text-orange-400 transition-colors">{cap.title}</h3>
              <ul className="space-y-3">
                {cap.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-orange-500 shrink-0 mt-2" />
                    <span className="text-zinc-400 text-[13px] font-light leading-snug group-hover:text-zinc-300 transition-colors">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   05 — 6 KEY ADVANTAGES
   ═══════════════════════════════════════════════ */
function KeyAdvantages() {
  const features = [
    { icon: <MousePointerClick size={22} />, title: "Hyper-Targeted Advertising", desc: "Target audiences based on Amazon's first-party shopping data — the most valuable targeting data on the internet. Reach the exact shoppers most likely to buy." },
    { icon: <Monitor size={22} />,           title: "Seamless Cross-Device Reach", desc: "Reach your customers on desktop, mobile, Fire TV, and Alexa — maintaining consistent brand messaging at every touchpoint across their day." },
    { icon: <Eye size={22} />,              title: "Engaging, High-Impact Formats", desc: "From rich display to full-motion video and audio — DSP creatives are designed to stop the scroll and drive action at every stage of the funnel." },
    { icon: <BarChart3 size={22} />,         title: "Data-Driven Real-Time Optimization", desc: "Amazon DSP provides granular analytics so you can constantly improve targeting, creatives, and bid strategy based on what's actually converting." },
    { icon: <ShoppingCart size={22} />,      title: "Fully Integrated Amazon Solution", desc: "DSP connects directly to your Amazon catalog. Sponsored Products, Stores, and DSP work as one — amplifying every campaign with the full Amazon ecosystem." },
    { icon: <Shield size={22} />,            title: "Full Control & Brand Safety",  desc: "You decide exactly where your ads appear. Our team manages brand safety settings, frequency caps, and placement exclusions to protect your brand at all times." },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-20 gap-8">
          <div>
            <SectionLabel>Why DSP</SectionLabel>
            <h2
              className="text-[42px] sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] lg:leading-[0.88] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Maximize ad reach<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                with Amazon DSP.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            Six reasons why DSP is essential for any brand serious about scaling on Amazon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div key={i} className="group bg-white rounded-[28px] p-8 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/50">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mb-6 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                {f.icon}
              </div>
              <h3 className="text-[13px] font-black uppercase tracking-[0.12em] text-zinc-900 mb-3 group-hover:text-orange-500 transition-colors">{f.title}</h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   06 — DSP vs PPC COMPARISON
   ═══════════════════════════════════════════════ */
function DSPvsPPC() {
  return (
    <section id="compare" className="py-20 lg:py-32 bg-white relative scroll-mt-24">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-20 gap-8">
          <div>
            <SectionLabel>Comparison</SectionLabel>
            <h2
              className="text-[42px] sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] lg:leading-[0.88] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Amazon PPC<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                vs. Amazon DSP.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-md pb-2">
            PPC and DSP aren't competitors — they're complements. Here's what each does best, and why the most effective Amazon brands use both.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {/* PPC */}
          <div className="bg-[#fafafa] rounded-[32px] border border-zinc-100 p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-500">
                <MousePointerClick size={18} />
              </div>
              <div>
                <h3 className="font-black text-[14px] uppercase tracking-wide text-zinc-900">Amazon PPC</h3>
                <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">Sponsored Ads</p>
              </div>
            </div>
            <p className="text-zinc-500 text-sm font-light leading-relaxed mb-8">
              PPC is the foundation of Amazon advertising — reach shoppers who are actively searching for your product. High intent, direct conversion, essential for every seller.
            </p>
            <div className="space-y-3 mb-8">
              {[
                "Keyword-based targeting in Amazon search",
                "Sponsored Products, Brands, and Display",
                "Pay only when someone clicks",
                "Immediate visibility and sales velocity",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={14} className="text-zinc-400 shrink-0" />
                  <span className="text-zinc-500 text-sm font-light">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-zinc-100 rounded-xl px-4 py-3 inline-flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Best For: Search-Intent Traffic</span>
            </div>
          </div>

          {/* DSP */}
          <div className="relative bg-zinc-950 rounded-[32px] border border-zinc-800 p-10 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-400" />
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Radio size={18} />
              </div>
              <div>
                <h3 className="font-black text-[14px] uppercase tracking-wide text-white">Amazon DSP</h3>
                <p className="text-[10px] text-orange-400 font-mono uppercase tracking-widest">Demand-Side Platform</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm font-light leading-relaxed mb-8">
              DSP reaches shoppers before they search — by targeting people based on their behavior, not just keywords. Essential for brand building, retargeting, and scaling beyond search.
            </p>
            <div className="space-y-3 mb-8">
              {[
                "Audience-based targeting on & off Amazon",
                "Display, video, audio, and OTT ad formats",
                "Retarget past visitors and cart abandoners",
                "Build brand awareness at the top of the funnel",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={14} className="text-orange-500 shrink-0" />
                  <span className="text-zinc-300 text-sm font-light">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-orange-500/15 border border-orange-500/30 rounded-xl px-4 py-3 inline-flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">Best For: Audience-Based Reach</span>
            </div>
          </div>
        </div>

        {/* Bottom callout */}
        <div className="bg-[#fafafa] rounded-[28px] border border-zinc-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0">
              <Zap size={20} />
            </div>
            <div>
              <p className="font-black text-[13px] uppercase tracking-[0.12em] text-zinc-900">Best Strategy: Run Both Together</p>
              <p className="text-zinc-400 text-xs font-light mt-0.5">PPC captures demand. DSP creates it. Brands using both see significantly higher total ROAS than either alone.</p>
            </div>
          </div>
          <Link href="/contact" className="shrink-0 flex items-center gap-2 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:gap-4 transition-all no-underline">
            Build My Strategy <ArrowRight size={13} />
          </Link>
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
      icon: <Activity size={18} />,
      label: "LEAK DETECTED",
      status: "REVENUE RECOVERY",
      statusColor: "text-red-500 bg-red-500/10 border-red-500/20",
      headline: "The Retargeting Gap: High traffic, low conversion.",
      subline: "Funnel leak diagnostic.",
      body: "You're spending thousands to drive traffic to your listings, but 97% of shoppers leave without buying. They're 'in-market,' but they've been distracted. Without DSP retargeting, that traffic is lost forever. We find them on Instagram, Twitch, and 2,000+ premium sites to bring them back to close the sale.",
      symptoms: [
        "High 'Detail Page View' volume with stagnant conversion rates",
        "Large gap between total site visitors and total units sold",
        "No current strategy for re-engaging cart abandoners off-Amazon",
      ],
      accentGradient: "from-red-500/80 to-orange-500/80",
    },
    {
      index: "02",
      icon: <Zap size={18} />,
      label: "CEILING IDENTIFIED",
      status: "SCALING PHASE",
      statusColor: "text-orange-500 bg-orange-500/10 border-orange-500/20",
      headline: "The PPC Ceiling: You've maxed out search intent.",
      subline: "Growth plateau analysis.",
      body: "You've optimized every keyword. Your PPC is efficient. But you've hit a wall. You're fighting for the same 10% of shoppers who are already searching for your product. DSP lets you scale past search by targeting the 90% who are 'in-market' but haven't typed your keyword yet.",
      symptoms: [
        "Consistent $30K+/month PPC spend with flatlining ROAS",
        "Dominating top-of-search but unable to increase total volume",
        "High dependency on search-term discovery for new customer acquisition",
      ],
      featured: true,
      accentGradient: "from-orange-500 to-amber-500",
    },
    {
      index: "03",
      icon: <Globe size={18} />,
      label: "NETWORK SCAN",
      status: "OMNICHANNEL",
      statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      headline: "The Awareness Blindspot: Missing 80% of the journey.",
      subline: "Market reach diagnostic.",
      body: "Shoppers don't live on Amazon. They're watching Streaming TV, reading news, and browsing social media. If you're only advertising on Amazon, you're invisible for 80% of the customer journey. We use Amazon's first-party purchase data to reach them exactly where they spend their time.",
      symptoms: [
        "Brand search volume is stagnant or declining",
        "Competitors are winning the 'Top of Mind' battle in your category",
        "Need for high-impact Video (OTT) or Streaming TV awareness",
      ],
      accentGradient: "from-emerald-500/80 to-teal-500/80",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 relative z-10">
        <div className="mb-12 lg:mb-20">
          <SectionLabel>DSP Readiness</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 mt-4">
            <h2
              className="text-3xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Is your brand<br />
              DSP ready?
            </h2>
            <p className="text-zinc-500 text-sm lg:text-base font-light leading-relaxed max-w-md lg:text-right">
              DSP isn't for every brand. It's a high-precision instrument for those ready to scale past the limits of search.
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
                    [DSP_SIGNAL_{s.index}]
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
                          DSP_DIAGNOSTIC: {s.subline.toUpperCase()}
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
                              REACH_METRICS
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
                <Target size={16} className="text-orange-500" />
              </div>
              <div>
                <p className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.35em] lg:tracking-[0.4em] text-orange-500 mb-1.5">Scale Your Reach</p>
                <p className="text-zinc-400 text-[13px] lg:text-sm font-light leading-relaxed max-w-lg">
                  If your brand matches these scaling signals, Amazon DSP is the key to unlocking your next $1M in revenue.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-white text-zinc-950 w-full md:w-auto px-6 lg:px-8 py-3.5 lg:py-4 rounded-full text-[10px] lg:text-[11px] font-black uppercase tracking-[0.2em] lg:tracking-[0.25em] hover:bg-orange-500 hover:text-white hover:shadow-[0_20px_50px_rgba(249,115,22,0.3)] transition-all duration-500 shrink-0 active:scale-[0.97] no-underline"
            >
              Request My DSP Strategy
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
    { q: "Who can use Amazon DSP?",                                          a: "Amazon DSP is available to brands selling on Amazon who meet minimum ad spend thresholds, and to advertisers who want to reach Amazon audiences even if they don't sell on Amazon. We manage DSP on your behalf as a certified partner — you don't need direct Amazon DSP access." },
    { q: "How do I get started on an Amazon DSP?",                          a: "Start with a discovery call where we review your current ad strategy, catalog, and goals. We then build a DSP campaign structure tailored to your audience, budget, and funnel stage. Most campaigns are live within 1–2 weeks of onboarding." },
    { q: "How much should I spend on an Amazon DSP budget?",                a: "We recommend a minimum of $10,000/month for DSP to generate meaningful data and results. Smaller budgets often don't reach enough audience size for the algorithm to optimize effectively. Many of our clients spend $30,000–$100,000/month as they scale." },
    { q: "Do I need Seller Central or Vendor Central to use Amazon DSP?",  a: "Not necessarily — DSP can be used to drive traffic to Amazon product pages, your own website, or both. However, Seller Central or Vendor Central access is needed for full Amazon DSP integration and to leverage Amazon's shopping data for targeting." },
    { q: "Will I have real-time updates on my Amazon DSP campaigns?",       a: "Yes. We provide regular reporting dashboards and updates covering impressions, clicks, detail page views, conversions, ROAS, and new-to-brand metrics. For larger accounts we offer weekly strategy calls." },
    { q: "Can I target my competitors' customers with Amazon DSP?",         a: "Yes — this is one of DSP's most powerful capabilities. We can target shoppers who have viewed or purchased from competitor products, or who are in-market for your category but haven't discovered your brand yet." },
    { q: "I am not meeting my winning sales goals — can DSP help?",         a: "DSP alone won't fix a conversion problem — if your listings, images, or pricing aren't competitive, DSP will drive traffic that doesn't convert. We always recommend auditing your listing performance first. If your conversion foundation is solid, DSP can significantly accelerate volume." },
    { q: "What creative assets do I need for Amazon DSP?",                  a: "For display ads, Amazon can auto-generate creatives from your product listings. For higher-impact campaigns, we recommend custom display creatives, lifestyle imagery, and if budget allows, short video assets (15–30 seconds). We can advise on creative production as part of onboarding." },
  ];

  return (
    <section className="py-20 lg:py-32 bg-white border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <SectionLabel>FAQ</SectionLabel>
            <h2
              className="text-[42px] sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] lg:leading-[0.88] mb-6 sm:mb-10 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Frequently<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>asked.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-12">
              Everything you need to know about Amazon DSP before getting started.
            </p>
            <div className="p-6 bg-[#fafafa] rounded-3xl border border-zinc-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Is DSP Right for You?</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Not every brand is ready for DSP. Book a free discovery call and we'll tell you honestly whether DSP fits your current stage.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-orange-500 font-bold text-[10px] uppercase tracking-widest hover:gap-3 transition-all no-underline">
                Book Discovery Call <ChevronRight size={11} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className={`border transition-all duration-500 rounded-[24px] overflow-hidden ${openIndex === i ? "bg-[#fafafa] border-orange-500/30 shadow-xl shadow-orange-500/5" : "bg-white border-zinc-100 hover:border-zinc-200"}`}>
                <button className="w-full flex items-center justify-between px-8 py-6 text-left" onClick={() => setOpenIndex(openIndex === i ? -1 : i)}>
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-mono transition-colors shrink-0 ${openIndex === i ? "text-orange-500" : "text-zinc-300"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[14px] sm:text-[15px] font-bold text-zinc-900 tracking-tight">{faq.q}</span>
                  </div>
                  <div className={`shrink-0 w-8 h-8 ml-4 rounded-full flex items-center justify-center transition-all duration-500 ${openIndex === i ? "bg-orange-500 text-white rotate-180" : "bg-zinc-100 text-zinc-400"}`}>
                    {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                <div className="transition-all duration-500 ease-in-out overflow-hidden" style={{ maxHeight: openIndex === i ? "400px" : "0", opacity: openIndex === i ? 1 : 0 }}>
                  <div className="px-8 pb-8 pt-0 ml-4 sm:ml-10">
                    <div className="text-[13px] sm:text-[14px] text-zinc-500 leading-relaxed font-light border-l-2 border-orange-500/20 pl-5">{faq.a}</div>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-6 bg-zinc-900 rounded-[24px] text-white text-center sm:text-left">
              <div className="flex items-center gap-4">
                <Terminal size={16} className="text-orange-500" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold">More_Questions?</span>
              </div>
              <Link href="/contact" className="flex items-center justify-center sm:justify-start gap-2 group no-underline w-full sm:w-auto">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">Speak to an Expert</span>
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
   09 — CTA
   ═══════════════════════════════════════════════ */
const DspCTAButton = ({ href = "/get-started", children }) => (
  <Link
    href={href}
    className="group relative inline-flex justify-center w-full sm:w-auto px-6 sm:px-10 py-4 bg-orange-600 text-white rounded-full font-bold text-[9px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.3em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:scale-[1.02] active:scale-95 no-underline border-none"
  >
    <span className="relative z-10 flex items-center justify-center gap-3 sm:gap-4 w-full">
      {children}
      <ArrowRight size={16} className="group-hover:translate-x-2 transition-all duration-300 text-white" />
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-orange-400 transition-transform duration-500 ease-in-out"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[horizontal-scan_2s_linear_infinite]"></div>
  </Link>
);

function DSPCTA() {
  return (
    <div className="w-full pb-10 bg-[#fafafa]">
      <section className="px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-[#0a0a0a] rounded-[40px] py-14 px-8 lg:px-20 text-left relative overflow-hidden border border-white/5 group shadow-none">

            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />

            {/* Background Large Icon Decor */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.05] translate-x-1/4">
              <Radio size={600} strokeWidth={0.2} className="text-orange-500" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column: Content */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-white font-bold text-[9px] uppercase tracking-[0.4em]">DSP Campaigns: Accepting Clients</span>
                </div>

                <h2
                  className="text-[42px] sm:text-4xl lg:text-6xl font-black tracking-tighter mb-6 sm:mb-8 leading-[0.9] text-white uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Smarter ads.<br />
                  <span className="italic font-light block mt-2 tracking-normal text-orange-500 lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                    better sales.
                  </span>
                </h2>

                <p className="text-zinc-400 font-light mb-10 text-base lg:text-lg leading-relaxed max-w-xl">
                  Stop limiting your reach to search. Amazon DSP puts your brand in front of the right audience — wherever they are on the internet.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-16">
                  <DspCTAButton href="/get-started">
                    Get Free Strategy Call
                  </DspCTAButton>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Programmatic Excellence</span>
                  </div>
                </div>

                {/* Bottom Row Points */}
                <div className="pt-8 border-t border-white/5 flex flex-wrap items-center gap-x-10 gap-y-3">
                  {[
                    "Audience Scoping Audit",
                    "Cross-Channel Reach",
                    "Precision Attribution"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white whitespace-nowrap">
                      <CheckCircle2 size={12} className="text-orange-500/70" strokeWidth={3} />
                      {item}
                    </div>
                  ))}
                </div>

              </div>

              {/* Right Column: 15-Minute Strategy Card */}
              <div className="lg:col-span-5 relative group/card">
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] sm:rounded-[32px] p-5 sm:p-8 shadow-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-500">

                  {/* Card Glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  {/* Header */}
                  <div className="flex justify-between items-start mb-6 sm:mb-10 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[8px] font-mono text-orange-500/80 uppercase tracking-widest">Session: Diagnostic</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>Growth Map</h4>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-inner">
                      <Calendar size={18} className="sm:size-[22px]" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Steps with Timeline spacing */}
                  <div className="space-y-0 relative z-10 before:absolute before:inset-y-2 before:left-[15px] sm:before:left-[19px] before:w-[1px] before:bg-white/10">
                    {[
                      { icon: <SearchCode size={14} className="sm:size-4" />, title: "1. Audience Discovery", desc: "Identify your highest-intent segments and competitors." },
                      { icon: <TrendingDown size={14} className="sm:size-4" />, title: "2. Strategic Scoping", desc: "Define cross-channel reach and attribution goals." },
                      { icon: <Target size={14} className="sm:size-4" />, title: "3. Precision Execution", desc: "Deliver a prioritized programmatic roadmap.", active: true }
                    ].map((step, i) => (
                      <div key={i} className={`relative flex gap-4 sm:gap-6 ${i !== 2 ? 'pb-6 sm:pb-8' : ''} group/step`}>
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center z-10 transition-all ${step.active ? 'bg-orange-500 border-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-zinc-900 border-white/10 text-zinc-400 group-hover/step:border-orange-500/50'}`}>
                          {step.icon}
                        </div>
                        <div className="pt-0.5 sm:pt-1">
                          <h5 className={`text-[11px] sm:text-[13px] font-bold mb-1 sm:mb-1.5 uppercase tracking-wide ${step.active ? 'text-orange-400' : 'text-white'}`}>{step.title}</h5>
                          <p className="text-[9px] sm:text-[11px] text-zinc-500 font-light leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Meeting Context Footer */}
                  <div className="mt-8 sm:mt-10 bg-black/40 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col xs:flex-row items-center justify-between gap-5 relative z-10 backdrop-blur-md">
                    <div className="flex items-center gap-4 w-full xs:w-auto">
                       <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
                         <Users size={16} className="sm:size-[18px]" />
                       </div>
                       <div>
                         <p className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-widest mb-0.5">Strategy Session</p>
                         <p className="text-[9px] sm:text-[10px] text-zinc-500 font-mono">15 Mins • 1-on-1 Discovery</p>
                       </div>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-orange-500/10 text-orange-500 text-[9px] font-bold tracking-[0.2em] uppercase border border-orange-500/20 w-full xs:w-auto text-center">
                      Free Access
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes horizontal-scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   FOOTER NAV
   ═══════════════════════════════════════════════ */
function FooterNav() {
  return (
    <footer className="py-16 lg:py-24 bg-white border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-10 lg:gap-12">
        <div className="text-center md:text-left w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Previous Service</p>
          <Link href="/service/dtc-website" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start uppercase">
              <ArrowRight className="mr-3 group-hover:-translate-x-3 transition-transform rotate-180 size-6 md:size-8 shrink-0" />
              DTC Website
            </h4>
          </Link>
        </div>
        <div className="hidden md:block w-px h-16 bg-zinc-100" />
        <div className="text-center md:text-right w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Service</p>
          <Link href="/service/trademark-registration" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end uppercase">
              Trademark Registration
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
export default function AmazonDSPPage() {
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <DSPHero />
      <MetricsStrip />
      <WhatIsDSP />
      <HowDSPWorks />
      <KeyAdvantages />
      <DSPvsPPC />
      <WhoItsFor />
      <FAQ />
      <DSPCTA />
      <FooterNav />
    </div>
  );
}
