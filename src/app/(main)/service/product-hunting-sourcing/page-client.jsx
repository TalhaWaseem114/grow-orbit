"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, Check, CheckCircle2, ChevronRight,
  ShieldCheck, Globe, FileText, Search, Zap,
  AlertTriangle, Target, Plus, Minus, Terminal,
  TrendingUp, Award, Star, Activity, Scale,
  Lock, Flag, Users, BadgeCheck, Calendar, SearchCode, TrendingDown,
  Truck, Settings, DollarSign, Layers, Package
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroButton from "@/components/ui/HeroButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
function ProductHuntingHero() {
  const floatRef = useRef(null);

  useEffect(() => {
    if (!floatRef.current) return;
    gsap.to(floatRef.current, { y: -12, duration: 4.5, repeat: -1, yoyo: true, ease: "power1.inOut" });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#fafafa]">
      <style>{`
        @keyframes scan-ph {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; } 90%  { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent animate-[scan-ph_10s_linear_infinite]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="ph-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
            <path d="M120 0 L120 120 M0 120 L120 120" stroke="currentColor" strokeWidth="0.2" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#ph-grid)" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_30%,rgba(249,115,22,0.07),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fafafa] to-[#fafafa]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">

          {/* Left */}
          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-10 z-0 pointer-events-none border-l border-t border-zinc-200/50 rounded-tl-[100px] opacity-40">
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-orange-500 rounded-tl-xl -translate-x-px -translate-y-px" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse shadow-[0_0_8px_#f97316]" />
                  <div className="w-4 h-[1px] bg-orange-500 self-center" />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
                  Market Intelligence · Direct Sourcing
                </span>
              </div>

              <h1 className="text-[40px] md:text-7xl lg:text-[80px] font-black tracking-tighter leading-[0.95] md:leading-[0.85] mb-10 text-zinc-900 uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Product Hunting<br />
                <span className="text-orange-500">& Sourcing</span><br />
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light lowercase tracking-tight text-zinc-300">
                  data-first.
                </span>
              </h1>

              <div className="flex gap-6 mb-10">
                <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50" />
                <div>
                  <p className="text-xl md:text-2xl text-zinc-500 font-light leading-relaxed max-w-xl mb-6">
                    Stop guessing. We uncover high-margin, low-competition Amazon products backed by real search volume data, then source them directly from vetted global factories.
                  </p>
                  <div className="flex flex-wrap gap-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Search Query Performance Audited</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={10} className="text-orange-500/50" />
                      <span>100% Anti-Middleman Sourcing</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  "Scan genuine keyword-to-ASIN gaps",
                  "Secure direct ex-factory pricing",
                  "Utility & design patent clearance",
                  "AQL 2.5 standard quality audits",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={15} className="text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-[14px] font-light leading-snug text-zinc-600">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-10">
                <HeroButton href="/contact?service=product-hunting-sourcing" className="w-full sm:w-auto">Book Sourcing Strategy Call</HeroButton>
                <a href="#packages" className="group flex items-center justify-center sm:justify-start gap-3 text-zinc-400 hover:text-zinc-900 font-bold text-[11px] uppercase tracking-widest px-2 py-4 transition-colors no-underline">
                  View Service Packages <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {[
                  { icon: <SearchCode size={11} />, label: "Helium10 + SQP Analysis" },
                  { icon: <Globe size={11} />,      label: "Direct China/India/Vietnam" },
                  { icon: <Activity size={11} />,   label: "FBA Logistics Setup" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2">
                    <span className="text-orange-500">{b.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sourcing Intelligence Panel */}
          <div className="lg:col-span-5 relative hidden lg:block self-start lg:mt-[20px] perspective-1000" ref={floatRef}>
            
            {/* Ambient Lighting */}
            <div className="absolute -inset-16 bg-gradient-to-br from-orange-500/30 via-transparent to-indigo-500/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Main Console */}
            <div className="bg-zinc-950/95 backdrop-blur-3xl rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-white/10 p-6 relative overflow-hidden ring-1 ring-white/5">
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
                    <div className="flex items-center gap-2 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
                      <SearchCode size={10} className="text-indigo-400" />
                      <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-widest font-bold">Scanning</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Lock size={10} className="text-orange-500" /> Proprietary Data
                  </span>
                </div>

                {/* Sourcing Report Card */}
                <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/5 rounded-2xl overflow-hidden mb-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)] transform-gpu hover:scale-[1.02] transition-transform duration-500 p-6 relative">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none" />

                  <div className="absolute top-6 right-6 opacity-20 pointer-events-none">
                    <TrendingUp size={80} className="text-orange-500" strokeWidth={1} />
                  </div>

                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                      <Target size={20} className="text-orange-400" />
                    </div>
                    <div>
                      <p className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-0.5">Product Intelligence Report</p>
                      <p className="text-md font-black text-white leading-none tracking-tight">Active Opportunities</p>
                    </div>
                  </div>

                  {/* Metrics lines */}
                  <div className="space-y-3 relative z-10 font-mono">
                    <div className="flex items-center justify-between bg-zinc-800/50 rounded-lg p-3 border border-white/5">
                      <span className="text-[9px] text-zinc-400 uppercase tracking-wider">Market Opportunity</span>
                      <span className="text-[12px] font-bold text-emerald-400">88/100 (Strong)</span>
                    </div>

                    <div className="flex items-center justify-between bg-zinc-800/50 rounded-lg p-3 border border-white/5">
                      <span className="text-[9px] text-zinc-400 uppercase tracking-wider">Search Query Volume</span>
                      <span className="text-[11px] font-bold text-white">42,500/mo</span>
                    </div>

                    {/* Scan bar */}
                    <div className="relative bg-orange-500/10 rounded-lg p-4 border border-orange-500/20 overflow-hidden mt-2">
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-orange-400 shadow-[0_0_10px_#f97316] animate-[scan-ph_3s_linear_infinite]" />
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-[8px] font-bold text-orange-400 uppercase tracking-widest block mb-1">Target Landed Cost</span>
                          <span className="text-sm font-black text-white">$6.15 / unit</span>
                        </div>
                        <div>
                          <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest block mb-1 text-right">Net Margin</span>
                          <span className="text-sm font-black text-emerald-400">41.5%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sourcing Validation */}
                <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center border border-emerald-500/30">
                        <Truck size={18} className="text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Supplier Vetting</p>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-white leading-none">Verified Manufacturer</span>
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400">ISO 9001</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -top-6 -right-6 bg-zinc-900/95 backdrop-blur-xl rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/10 z-20 flex items-center gap-3 hover:scale-105 transition-transform duration-300">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                <DollarSign size={16} className="text-orange-400" />
              </div>
              <div>
                <p className="text-[7px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em] mb-0.5">High Margin</p>
                <p className="text-sm font-black text-white leading-none tracking-wide">ROI &gt; 100%</p>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur-xl rounded-3xl p-5 shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-zinc-200 flex items-center gap-4 z-40 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 shadow-inner">
                <BadgeCheck size={18} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-400 mb-1">Risk Clearance</p>
                <p className="text-lg font-black text-zinc-900 leading-none tracking-tight">Patent Cleared</p>
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
    { v: "85+",    l: "Products Launched", i: <Package size={14} /> },
    { v: "32.4%",  l: "Avg Net Margin",    i: <DollarSign size={14} /> },
    { v: "500+",   l: "Vetted Factories",  i: <Globe size={14} /> },
    { v: "AQL 2.5",l: "Defect Standard",   i: <ShieldCheck size={14} /> },
  ];

  return (
    <div className="bg-zinc-900 py-12 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-6 lg:gap-8">
          {stats.map((s, i) => (
            <div key={i} className="group relative flex flex-col border-l border-zinc-800/50 pl-6 sm:pl-8 transition-all duration-500 hover:border-orange-500/40">
              <div className="absolute top-0 left-[-1.5px] w-[3px] h-[3px] bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-orange-500/70 mb-3 group-hover:text-orange-400 transition-colors">{s.i}</div>
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tighter">{s.v}</span>
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mt-1">[ {s.l} ]</span>
            </div>
          ))}
          <Link
            href="/contact?service=product-hunting-sourcing&package=free-analysis"
            className="group relative flex flex-col items-center text-center col-span-2 md:col-span-3 lg:col-span-1 mt-4 lg:mt-0 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/5 lg:border-orange-500/20 lg:pl-8 transition-all duration-500 hover:bg-orange-500/[0.02] no-underline"
          >
            <span className="text-xl sm:text-2xl lg:text-lg font-black text-white uppercase tracking-tighter leading-tight group-hover:text-orange-400 transition-colors flex items-center gap-3">
              Book Strategy Call
              <ArrowRight size={14} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] lg:text-[8px] font-mono text-zinc-600 uppercase tracking-widest">DATA_DRIVEN</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   03 — WHY CHOOSE US
   ═══════════════════════════════════════════════ */
function WhyProductHunting() {
  const benefits = [
    { icon: <SearchCode size={22} />, title: "Hard Data Over Guesswork", desc: "We don't search based on trends or intuition. We audit real search query volume, conversion rates, and competitor click share to identify actual, unfulfilled market needs." },
    { icon: <Globe size={22} />,       title: "Vetted Factory Network", desc: "No trading company markups or Alibaba middlemen. We work directly with over 500 verified manufacturers across China, Vietnam, and India to get raw ex-factory pricing." },
    { icon: <ShieldCheck size={22} />, title: "Rigorous Patent Cleared", desc: "We run deep design and utility patent clearance reviews on every potential opportunity to ensure your brand is protected from instant takedowns or legal liabilities." },
    { icon: <Settings size={22} />,    title: "Complete Supply Chain Control", desc: "From lab test sampling and barcode labeling to custom package design and direct FBA-compliant ocean freight coordination — we handle the entire pipeline." }
  ];

  return (
    <section className="py-32 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>Why It Matters</SectionLabel>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-8 text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Dominance begins<br />before you<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">even order.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-10">
              Most Amazon brands fail because they launch average products in saturated categories. Real brand dominance is engineered at the hunting phase by matching solid factory pricing to validated market keywords.
            </p>
            <Link href="/contact?service=product-hunting-sourcing" className="group flex items-center gap-3 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
              Find my next product <ArrowRight size={13} />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <div key={i} className="group bg-[#fafafa] hover:bg-white rounded-[28px] p-7 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/50">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mb-5 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                  {b.icon}
                </div>
                <h3 className="text-[13px] font-black uppercase tracking-[0.12em] text-zinc-900 mb-2 group-hover:text-orange-500 transition-colors">{b.title}</h3>
                <p className="text-zinc-400 text-xs font-light leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   03b — THE COST OF GUESSING (dark stats section)
   ═══════════════════════════════════════════════ */
function CostOfGuessing() {
  const stats = [
    { val: "67%",  label: "Of first Amazon products fail due to poor research",  color: "text-red-500" },
    { val: "$8K+", label: "Average capital lost on an unsourced product launch", color: "text-amber-500" },
    { val: "3.2x", label: "Higher ROI when products are data-validated first",   color: "text-orange-500" },
  ];

  return (
    <section className="py-28 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-500/[0.06] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-orange-500/[0.04] blur-[120px] rounded-full pointer-events-none" />

      {/* Big watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
        <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-[100px] sm:text-[180px] lg:text-[280px] font-black italic tracking-tighter text-white/[0.02]">
          Risk
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          <div className="lg:col-span-5">
            <SectionLabel light>The Data</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.88] mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              The cost of<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-500 lowercase tracking-normal">guessing.</span>
            </h2>
            <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-md mb-10">
              Most Amazon launches fail not because of bad execution, but because the product was never validated against real market data in the first place.
            </p>
            <Link href="/contact?service=product-hunting-sourcing" className="group flex items-center gap-3 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
              Validate before you invest <ArrowRight size={13} />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {stats.map((s, i) => (
              <div key={i} className="group bg-white/[0.03] hover:bg-white/[0.06] rounded-[28px] p-8 border border-white/[0.06] hover:border-orange-500/20 transition-all duration-500">
                <span className={`text-5xl md:text-6xl font-black tracking-tighter leading-none block mb-4 ${s.color}`}>{s.val}</span>
                <p className="text-zinc-500 text-[11px] font-mono font-bold uppercase tracking-widest leading-relaxed">{s.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   04 — SERVICE PACKAGES
   ═══════════════════════════════════════════════ */
function ServicePackages() {
  const packages = [
    {
      title: "Opportunity Audit",
      subtitle: "Validate your own product idea",
      desc: "You bring the idea, we stress-test it. Includes competitor deep dive, margin/FBA fee breakdown, patent search, and target sourcing cost modeling.",
      cost: "$450",
      delivery: "7 Days",
      popular: false,
      cta: "Audit My Idea"
    },
    {
      title: "Sourcing & Supplier Vetting",
      subtitle: "Find the manufacturer",
      desc: "You know the product, we secure the source. We find 3 verified manufacturers, negotiate contract bids, coordinate samples, and run factory audits.",
      cost: "$850",
      delivery: "14 Days",
      popular: false,
      cta: "Find Vetted Suppliers"
    },
    {
      title: "Full Product Hunt",
      subtitle: "We hunt 3 winning products",
      desc: "We scan the market and present 3 custom-vetted high-opportunity products tailored specifically to your capital, category goals, and target ROI.",
      cost: "$1,200",
      delivery: "21 Days",
      popular: true,
      cta: "Start Sourcing Hunt"
    },
    {
      title: "End-to-End Hunt & Source",
      subtitle: "Complete launch-ready pipeline",
      desc: "From zero to active shipment. Covers the product hunt, supplier negotiations, branding/packaging design, quality testing, and freight logistics.",
      cost: "$2,200",
      delivery: "30 Days",
      popular: false,
      cta: "Launch My Brand"
    }
  ];

  return (
    <section id="packages" className="py-32 bg-[#fafafa] relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <SectionLabel>Service Packages</SectionLabel>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Hunting &<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">sourcing options.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            No long retainers. Pay per project. Transparent pricing with clear deliverables. Choose the tier that matches your stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`group relative rounded-[32px] overflow-hidden transition-all duration-500 ${
                pkg.popular ? "ring-1 ring-orange-500/30 shadow-xl shadow-orange-500/10" : ""
              }`}
            >
              {pkg.popular && <div className="h-1 w-full bg-gradient-to-r from-orange-500 to-amber-400" />}
              <div className={`h-full border p-7 transition-all duration-500 ${
                pkg.popular
                  ? "bg-zinc-950 border-t-0 border-zinc-800 rounded-b-[32px] hover:border-orange-500/30"
                  : "bg-[#fafafa] border-zinc-100 rounded-[32px] hover:bg-white hover:border-orange-500/20 hover:shadow-xl hover:shadow-zinc-200/50"
              }`}>
                {pkg.popular && (
                  <div className="inline-flex items-center gap-1.5 bg-orange-500/15 border border-orange-500/30 px-2.5 py-1 rounded-full mb-4">
                    <Star size={8} className="text-orange-400 fill-orange-400" />
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-orange-400">Most Popular</span>
                  </div>
                )}

                <h3 className={`text-lg font-black uppercase tracking-tight mb-1 ${pkg.popular ? "text-white" : "text-zinc-900 group-hover:text-orange-500 transition-colors"}`}>{pkg.title}</h3>
                <p className={`text-[10px] font-bold uppercase tracking-wider mb-4 ${pkg.popular ? "text-zinc-400" : "text-zinc-400"}`}>{pkg.subtitle}</p>
                <p className={`text-xs font-light leading-relaxed mb-6 h-28 ${pkg.popular ? "text-zinc-400" : "text-zinc-500"}`}>{pkg.desc}</p>

                <div className={`flex items-center justify-between py-3 border-t ${pkg.popular ? "border-white/5" : "border-zinc-100"} mb-3`}>
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${pkg.popular ? "text-zinc-400" : "text-zinc-400"}`}>Deliverable Fee</span>
                  <span className={`text-xl font-black tracking-tighter ${pkg.popular ? "text-orange-400" : "text-zinc-900"}`}>{pkg.cost}</span>
                </div>

                <div className={`flex items-center justify-between py-3 border-t ${pkg.popular ? "border-white/5" : "border-zinc-100"} mb-5`}>
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${pkg.popular ? "text-zinc-400" : "text-zinc-400"}`}>Timeline</span>
                  <span className={`text-[11px] font-bold ${pkg.popular ? "text-zinc-300" : "text-zinc-700"}`}>{pkg.delivery}</span>
                </div>

                <Link
                  href={`/contact?service=product-hunting-sourcing&package=${pkg.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className={`group/btn w-full flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest py-3 rounded-xl no-underline transition-all duration-300 ${
                    pkg.popular
                      ? "bg-orange-500 hover:bg-white hover:text-black text-white"
                      : "bg-zinc-50 hover:bg-black hover:text-white text-zinc-700 border border-zinc-200"
                  }`}
                >
                  {pkg.cta}
                  <ArrowRight size={11} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Custom requirements info */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between p-8 bg-zinc-100 rounded-[32px] gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black uppercase text-zinc-900 tracking-wider">Need Custom Multi-Product Sourcing?</span>
          </div>
          <p className="text-xs text-zinc-500 max-w-xl text-center md:text-left leading-relaxed">
            Launching a cohesive collection or looking to migrate a mature catalog to new manufacturers? We design custom sourcing campaigns tailored for enterprise operations.
          </p>
          <Link href="/contact?service=product-hunting-sourcing&package=custom-sourcing" className="inline-flex items-center gap-2 text-orange-500 font-bold text-[10px] uppercase tracking-widest hover:gap-3 transition-all no-underline shrink-0">
            Consult With Our Sourcing Team <ArrowRight size={12} />
          </Link>
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   04b — COMMON SOURCING MISTAKES
   ═══════════════════════════════════════════════ */
function SourcingMistakes() {
  const mistakes = [
    { icon: <AlertTriangle size={20} />, title: "Alibaba Front-Page Sourcing",   desc: "Picking the first supplier on page one means you're paying trading company markups — often 30–50% above actual factory pricing." },
    { icon: <Scale size={20} />,         title: "Skipping Patent Clearance",     desc: "One design patent infringement can result in a permanent ASIN takedown, legal fees, and total inventory loss with no recourse." },
    { icon: <TrendingDown size={20} />,   title: "Launching Without Search Data", desc: "Products chosen by 'gut feeling' miss keyword demand gaps. Without search query volume validation, you're competing blind." },
    { icon: <Package size={20} />,        title: "No Quality Inspection",        desc: "Shipping without third-party QC means defective units reach FBA, triggering negative reviews that permanently tank your listing." },
  ];

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      {/* Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
        <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-[100px] sm:text-[180px] lg:text-[280px] font-black italic tracking-tighter text-zinc-50">
          Risk
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>What We Eliminate</SectionLabel>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-8 text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Sourcing doesn't<br />have to be<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">a gamble.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-10">
              The four most expensive sourcing mistakes we eliminate in every engagement — and why they compound into total capital loss if left unchecked.
            </p>
            <Link href="/contact?service=product-hunting-sourcing" className="group flex items-center gap-3 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
              Protect my investment <ArrowRight size={13} />
            </Link>
          </div>

          <div className="lg:col-span-7 space-y-5">
            {mistakes.map((p, i) => (
              <div key={i} className="group bg-[#fafafa] hover:bg-white rounded-[28px] p-7 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/50 relative overflow-hidden" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.04)" }}>
                <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                    {p.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[14px] font-black uppercase tracking-tight text-zinc-900 mb-2 group-hover:text-orange-500 transition-colors leading-tight">{p.title}</h3>
                    <p className="text-zinc-500 text-sm font-light leading-relaxed">{p.desc}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-7 right-7 h-px bg-orange-500/0 group-hover:bg-orange-500/20 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   05 — PROCESS FLOW
   ═══════════════════════════════════════════════ */
function SourcingProcess() {
  const steps = [
    { num: "01", title: "Market Gap Audits", desc: "We scan search queries to match keywords with high customer demand against weak product catalogs or outdated listings.", icon: <Search size={18} /> },
    { num: "02", title: "Supplier Vetting & Bidding", desc: "Vetted manufacturers compete for your order. We audit their history, BSCI social standards, and export transaction records.", icon: <Users size={18} /> },
    { num: "03", title: "Sample Consolidation", desc: "We organize lab tests and product modifications, consolidation shipping of samples, and finalize custom packaging details.", icon: <Layers size={18} /> },
    { num: "04", title: "Quality Check & FBA Cargo", desc: "Third-party inspectors execute AQL 2.5 standards inside the factory before shipment. We handle FBA cargo loading and customs clearing.", icon: <Truck size={18} /> }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-8">
          <div>
            <SectionLabel>The Process</SectionLabel>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              How we hunt<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">and source.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-md pb-2">
            No shortcuts. A structured, transparent pipeline engineered to minimize capital risk and protect margins before you place deposit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-zinc-100 rounded-[40px] overflow-hidden" style={{ boxShadow: "0 10px 45px rgba(0,0,0,0.10)" }}>
          {steps.map((item, i) => (
            <div
              key={i}
              className={`group relative bg-[#fafafa] p-8 hover:bg-white transition-all duration-500 flex flex-col ${
                i === 0 ? "rounded-t-[40px] md:rounded-l-[40px] md:rounded-tr-none" :
                i === 3 ? "rounded-b-[40px] md:rounded-r-[40px] md:rounded-bl-none" : ""
              }`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                  {item.icon}
                </div>
                <span className="text-4xl font-black text-zinc-100 group-hover:text-orange-50 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.num}</span>
              </div>
              <h3 className="text-[14px] font-black uppercase tracking-tight text-zinc-900 mb-2 group-hover:text-orange-500 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.title}</h3>
              <p className="text-zinc-500 text-xs font-light leading-relaxed flex-1">{item.desc}</p>
              <div className="mt-8 h-px w-8 bg-zinc-100 group-hover:w-full group-hover:bg-orange-500 transition-all duration-700" />
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between p-8 bg-[#fafafa] rounded-[32px]">
          <div className="flex items-center gap-4 text-zinc-400">
            <Terminal size={16} />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Sourcing_Pipeline_01-04</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest italic">AQL 2.5 defect audits implemented pre-shipment</span>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   06 — FAQ
   ═══════════════════════════════════════════════ */
function SourcingFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: "Do you sign NDAs to protect my product ideas?", a: "Absolutely. We sign strict Non-Disclosure Agreements (NDAs) before you share any brand concept or product specifications. Furthermore, our partner factories are also bound by manufacturing and IP protection agreements to prevent copycats." },
    { q: "What is your target profit margin when hunting?", a: "We target a minimum 30% Net Margin and &gt;100% ROI. In our calculations, we factor in manufacturing cost, packaging, FBA referral commissions, size-tier fulfillment fees, inbound placement fees, estimated monthly storage, and import duties." },
    { q: "How do you verify the legitimacy of a supplier?", a: "We check the manufacturer's credentials, business license, and export records. We verify ISO 9001 and BSCI compliance, transaction histories on trade databases, and cross-reference records. For final selection, we require factory walkthroughs and quality audits." },
    { q: "Who handles the shipping and customs clearance?", a: "We do. We coordinate with vetted freight forwarders to organize shipping (sea, air, FCL, or LCL), prepare documentation, handle export customs clearing, and ensure import duties/bonds are paid so your cargo lands smoothly inside Amazon FBA centers." },
    { q: "How long does the full process take?", a: "A typical full pipeline takes 30–45 days: 2 weeks for data hunting and opportunity selection, 2 weeks for factory bidding and supplier vetting, and 1–2 weeks for sample consolidation, testing, and production deposit authorization." }
  ];

  return (
    <section className="py-32 bg-[#fafafa] border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-10 text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Sourcing<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">questions.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-12">
              Everything you need to know about NDAs, patent checks, supplier vetting, and customs shipping.
            </p>
            <div className="p-6 bg-white rounded-3xl border border-zinc-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Have a custom question?</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                Sourcing is custom to every product's material, weight, and market certifications. Ask our specialists for direct advice.
              </p>
              <Link href="/contact?service=product-hunting-sourcing" className="inline-flex items-center gap-2 text-orange-500 font-bold text-[10px] uppercase tracking-widest hover:gap-3 transition-all no-underline">
                Ask us directly <ChevronRight size={11} />
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
                    : "bg-[#fafafa] border-zinc-100 hover:bg-white hover:border-zinc-200"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-8 py-6 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-mono transition-colors shrink-0 ${openIndex === i ? "text-orange-500" : "text-zinc-300"}`}>0{i + 1}</span>
                    <span className="text-[14px] sm:text-[15px] font-bold text-zinc-900 tracking-tight leading-tight">{faq.q}</span>
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
                  <div className="px-8 pb-8 pt-0 ml-4 sm:ml-10">
                    <div className="text-[13px] sm:text-[14px] text-zinc-500 leading-relaxed font-light border-l-2 border-orange-500/20 pl-6">{faq.a}</div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-6 bg-zinc-900 rounded-[24px] text-white text-center sm:text-left">
              <div className="flex items-center gap-4">
                <Terminal size={16} className="text-orange-500" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold text-zinc-400">More_Questions?</span>
              </div>
              <Link href="/contact?service=product-hunting-sourcing" className="flex items-center justify-center sm:justify-start gap-2 group no-underline w-full sm:w-auto">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">Talk to Our Team</span>
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
   07 — CTA SECTION (Upgraded to Dual Column Sourcing CTA)
   ═══════════════════════════════════════════════ */
const SourcingCTAButton = ({ href = "/contact", children }) => (
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

function SourcingCTA() {
  return (
    <div className="w-full pb-10 bg-[#fafafa]">
      <section className="px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-[#0a0a0a] rounded-[40px] py-10 px-6 sm:px-10 lg:px-16 text-left relative overflow-hidden border border-white/5 group shadow-none">

            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />

            {/* Background Large Icon Decor */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.05] translate-x-1/4">
              <Search size={600} strokeWidth={0.2} className="text-orange-500" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column: Content */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-white font-bold text-[9px] uppercase tracking-[0.4em]">Sourcing Slots Available</span>
                </div>

                <h2
                  className="text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-[0.9] text-white uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Secure your next<br />
                  <span className="italic font-light block mt-2 tracking-normal text-orange-500 lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                    category leader.
                  </span>
                </h2>

                <p className="text-zinc-400 font-light mb-10 text-base lg:text-lg leading-relaxed max-w-xl">
                  Book a free sourcing consultation. We'll outline candidate products, check manufacturer eligibility, and map your landed unit economics.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-16">
                  <SourcingCTAButton href="/contact?service=product-hunting-sourcing&package=consultation">
                    Consult Sourcing Expert
                  </SourcingCTAButton>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Patent Cleared Search</span>
                  </div>
                </div>

                {/* Bottom Row Points */}
                <div className="pt-8 border-t border-white/5 flex flex-wrap items-center gap-x-10 gap-y-3">
                  {[
                    "ISO 9001 Audited Factories",
                    "AQL 2.5 Defect Standard",
                    "BSCI Social Vetting"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white whitespace-nowrap">
                      <CheckCircle2 size={12} className="text-orange-500/70" strokeWidth={3} />
                      {item}
                    </div>
                  ))}
                </div>

              </div>

              {/* Right Column: Roadmap Card */}
              <div className="lg:col-span-5 relative group/card">
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] sm:rounded-[32px] p-5 sm:p-8 shadow-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-500">

                  {/* Card Glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  {/* Header */}
                  <div className="flex justify-between items-start mb-6 sm:mb-10 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[8px] font-mono text-orange-500/80 uppercase tracking-widest">Session: Sourcing</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>Sourcing Map</h4>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-inner">
                      <Calendar size={18} className="sm:size-[22px]" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Steps with Timeline spacing */}
                  <div className="space-y-0 relative z-10 before:absolute before:inset-y-2 before:left-[15px] sm:before:left-[19px] before:w-[1px] before:bg-white/10">
                    {[
                      { icon: <SearchCode size={14} className="sm:size-4" />, title: "1. Market IQ", desc: "Vetting search terms and category voids." },
                      { icon: <TrendingDown size={14} className="sm:size-4" />, title: "2. Supplier Clearance", desc: "Vetting manufacturers and sample bidding." },
                      { icon: <Target size={14} className="sm:size-4" />, title: "3. Logistics Launch", desc: "FBA compliance labeling and ocean freight.", active: true }
                    ].map((step, i) => (
                      <div key={i} className={`relative flex gap-4 sm:gap-6 ${i !== 2 ? 'pb-6 sm:pb-8' : ''} group/step`}>
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center z-10 transition-all ${step.active ? 'bg-orange-500/20 border-orange-500 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-zinc-900 border-white/10 text-zinc-400 group-hover/step:border-orange-500/50'}`}>
                          {step.icon}
                        </div>
                        <div className="pt-0.5 sm:pt-1">
                          <h5 className={`text-[11px] sm:text-[13px] font-bold mb-1 sm:mb-1.5 uppercase tracking-wide ${step.active ? 'text-orange-400' : 'text-white'}`}>{step.title}</h5>
                          <p className="text-[9px] sm:text-[11px] text-zinc-400 font-light leading-relaxed">{step.desc}</p>
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

      <style>{`
        @keyframes horizontal-scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   08 — FOOTER NAV
   ═══════════════════════════════════════════════ */
function FooterNav() {
  return (
    <footer className="py-24 bg-white border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Previous Service</p>
          <Link href="/service/trademark-registration" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start uppercase">
              <ArrowRight className="mr-3 group-hover:-translate-x-3 transition-transform rotate-180 size-6 md:size-8 shrink-0" />
              Trademark Registration
            </h4>
          </Link>
        </div>
        <div className="hidden md:block w-px h-16 bg-zinc-100" />
        <div className="text-center md:text-right w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Service</p>
          <Link href="/service/audit-strategy" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end uppercase">
              Audit & Strategy
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

export default function ProductHuntingPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      document.title = "Amazon Product Hunting & Sourcing | Grow Orbit";
    }
  }, []);

  return (
    <div
      className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <ProductHuntingHero />
      <MetricsStrip />
      <WhyProductHunting />
      <CostOfGuessing />
      <ServicePackages />
      <SourcingMistakes />
      <SourcingProcess />
      <SourcingFAQ />
      <SourcingCTA />
      <FooterNav />
    </div>
  );
}
