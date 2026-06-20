"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, Check, CheckCircle2, ChevronRight,
  ShieldCheck, Globe, FileText, Search, Zap,
  AlertTriangle, Target, Plus, Minus, Terminal,
  TrendingUp, Award, Star, Activity, Scale,
  Lock, Flag, Users, BadgeCheck, Calendar, SearchCode, TrendingDown
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
function TrademarkHero() {
  const floatRef = useRef(null);

  useEffect(() => {
    if (!floatRef.current) return;
    gsap.to(floatRef.current, { y: -12, duration: 4.5, repeat: -1, yoyo: true, ease: "power1.inOut" });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#fafafa]">
      <style>{`
        @keyframes scan-tm {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; } 90%  { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent animate-[scan-tm_10s_linear_infinite]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="tm-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
            <path d="M120 0 L120 120 M0 120 L120 120" stroke="currentColor" strokeWidth="0.2" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#tm-grid)" />
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
                  Brand Protection · Amazon Brand Registry
                </span>
              </div>

              <h1 className="text-[40px] md:text-7xl lg:text-[80px] font-black tracking-tighter leading-[0.95] md:leading-[0.85] mb-10 text-zinc-900 uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Trademark<br />
                <span className="text-orange-500">Registration</span><br />
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light lowercase tracking-tight text-zinc-300">
                  globally.
                </span>
              </h1>

              <div className="flex gap-6 mb-10">
                <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50" />
                <div>
                  <p className="text-xl md:text-2xl text-zinc-500 font-light leading-relaxed max-w-xl mb-6">
                    A trademark isn't just legal protection — it's your key to Amazon Brand Registry, A+ Content, Brand Story, and the tools that turn your listing into an untouchable sales machine.
                  </p>
                  <div className="flex flex-wrap gap-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>USPTO + International</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={10} className="text-orange-500/50" />
                      <span>Brand Registry Unlocked</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  "Get Brand Registry and Brand Defence",
                  "Defend your brand against hijackers",
                  "Unlock A+ Content & Brand Story",
                  "Stronger ranking protection on high paced keywords",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={15} className="text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-[14px] font-light leading-snug text-zinc-600">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-10">
                <HeroButton href="/contact" className="w-full sm:w-auto">Start My Trademark</HeroButton>
                <a href="#pricing" className="group flex items-center justify-center sm:justify-start gap-3 text-zinc-400 hover:text-zinc-900 font-bold text-[11px] uppercase tracking-widest px-2 py-4 transition-colors no-underline">
                  See Country Pricing <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {[
                  { icon: <Scale size={11} />,      label: "Attorney-Assisted Filing" },
                  { icon: <Globe size={11} />,      label: "7 Countries Available"    },
                  { icon: <ShieldCheck size={11} />,label: "Brand Registry Ready"     },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2">
                    <span className="text-orange-500">{b.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Premium Brand Protection Vault */}
          <div className="lg:col-span-5 relative hidden lg:block self-start lg:mt-[60px] perspective-1000" ref={floatRef}>

            {/* Ambient Lighting - Deep Security Blue & Orange Glow */}
            <div className="absolute -inset-16 bg-gradient-to-br from-orange-500/30 via-transparent to-indigo-500/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Main Console Container */}
            <div className="bg-zinc-950/90 backdrop-blur-3xl rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-white/10 p-6 relative overflow-hidden ring-1 ring-white/5">
               {/* Technical Grid Texture */}
               <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

               <div className="relative z-10">
                 {/* Header Bar - Registry System */}
                 <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <div className="flex items-center gap-4">
                       <div className="flex gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                         <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                         <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                       </div>
                       <div className="h-4 w-px bg-white/10" />
                       <div className="flex items-center gap-2 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
                         <ShieldCheck size={10} className="text-indigo-400" />
                         <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-widest font-bold">Secure</span>
                       </div>
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Lock size={10} className="text-orange-500" /> Brand Registry
                    </span>
                 </div>

                 {/* Official Registration Document UI */}
                 <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/5 rounded-2xl overflow-hidden mb-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)] transform-gpu hover:scale-[1.02] transition-transform duration-500 group relative p-6">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none" />

                    {/* Official Seal Graphic */}
                    <div className="absolute top-6 right-6 opacity-20 pointer-events-none">
                       <Award size={80} className="text-orange-500" strokeWidth={1} />
                    </div>

                    <div className="flex items-center gap-3 mb-5">
                       <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                          <BadgeCheck size={20} className="text-orange-400" />
                       </div>
                       <div>
                          <p className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-0.5">United States Patent & Trademark Office</p>
                          <p className="text-lg font-black text-white leading-none tracking-tight">Official Registration</p>
                       </div>
                    </div>

                    <div className="space-y-3 relative z-10">
                       <div className="flex items-center justify-between bg-zinc-800/50 rounded-lg p-3 border border-white/5">
                          <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Serial Number</span>
                          <span className="text-[11px] font-mono font-bold text-white tracking-widest">97-XXX-XXX</span>
                       </div>
                       <div className="flex items-center justify-between bg-zinc-800/50 rounded-lg p-3 border border-white/5">
                          <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Mark Type</span>
                          <span className="text-[10px] font-bold text-white uppercase tracking-wider">Standard Character</span>
                       </div>

                       {/* Animated Scan Line over Trademark Classes */}
                       <div className="relative bg-indigo-500/10 rounded-lg p-4 border border-indigo-500/20 overflow-hidden mt-2">
                          <style>{`
                            @keyframes scan-tm-line {
                              0% { top: 0%; opacity: 0; }
                              10% { opacity: 1; }
                              90% { opacity: 1; }
                              100% { top: 100%; opacity: 0; }
                            }
                          `}</style>
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-indigo-400 shadow-[0_0_10px_#818cf8] animate-[scan-tm-line_2.5s_linear_infinite]" />
                          <div className="flex justify-between items-center">
                             <div>
                                <span className="text-[8px] font-mono font-bold text-indigo-400 uppercase tracking-widest block mb-1">Protection Scope</span>
                                <span className="text-sm font-black text-white">Class 035 / 009</span>
                             </div>
                             <div className="flex gap-1">
                                <div className="w-1.5 h-4 bg-indigo-500/40 rounded-sm" />
                                <div className="w-1.5 h-6 bg-indigo-500/60 rounded-sm" />
                                <div className="w-1.5 h-8 bg-indigo-500 rounded-sm" />
                                <div className="w-1.5 h-5 bg-indigo-500/50 rounded-sm" />
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Amazon Integration Status */}
                 <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-xl p-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center border border-emerald-500/30">
                             <ShieldCheck size={18} className="text-emerald-400" />
                          </div>
                          <div>
                             <p className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Amazon Integration</p>
                             <div className="flex items-center gap-1.5">
                                <span className="text-sm font-black text-white leading-none">Registry Active</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

               </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -top-6 -right-6 bg-zinc-900/95 backdrop-blur-xl rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/10 z-20 flex items-center gap-3 hover:scale-105 transition-transform duration-300">
               <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                  <Lock size={16} className="text-indigo-400" />
               </div>
               <div>
                  <p className="text-[7px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em] mb-0.5">Asset Security</p>
                  <p className="text-sm font-black text-white leading-none tracking-wide">Hijack Proof</p>
               </div>
            </div>

            <div className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur-xl rounded-3xl p-5 shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-zinc-200 flex items-center gap-4 z-40 animate-[float_6s_ease-in-out_infinite] hover:scale-105 transition-transform duration-300">
               <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100 shadow-inner">
                  <BadgeCheck size={18} className="text-orange-600" />
               </div>
               <div>
                  <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-400 mb-1">Eligibility Status</p>
                  <p className="text-lg font-black text-zinc-900 leading-none tracking-tight">A+ & Brand Story</p>
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
    { v: "7",     l: "Countries Available", i: <Globe size={14} />       },
    { v: "100%",  l: "Attorney-Assisted",   i: <Scale size={14} />       },
    { v: "Brand", l: "Registry Unlocked",   i: <BadgeCheck size={14} />  },
    { v: "Fast",  l: "USPTO Filing",        i: <Zap size={14} />         },
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
              <span className="text-[10px] lg:text-[8px] font-mono text-zinc-600 uppercase tracking-widest">FILING_READY</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   03 — WHY TRADEMARK (sticky left + 4 benefit cards)
   ═══════════════════════════════════════════════ */
function WhyTrademark() {
  const benefits = [
    { icon: <BadgeCheck size={22} />,   title: "Unlock Brand Registry",       desc: "A registered trademark is the only gateway to Amazon Brand Registry — which unlocks A+ Content, Brand Story, Brand Store, and Sponsored Brands advertising." },
    { icon: <ShieldCheck size={22} />,  title: "Remove Hijackers Fast",        desc: "Brand Registry gives you a legal weapon to remove unauthorized sellers, counterfeiters, and listing hijackers directly through Amazon's IP complaint system." },
    { icon: <TrendingUp size={22} />,   title: "Stronger Organic Rankings",    desc: "Amazon's algorithm gives preferential treatment to brand-registered sellers. More control over your listing means more keyword indexing and better organic rank." },
    { icon: <Lock size={22} />,         title: "Own Your Listing Forever",     desc: "Without a trademark, anyone can modify your detail page. Brand Registry gives you editorial ownership — your images, copy, and A+ Content stay yours." },
  ];

  return (
    <section className="py-32 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>Why It Matters</SectionLabel>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-8 text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Your trademark<br />is your<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">brand moat.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-10">
              Every Amazon seller building a real brand needs a trademark. Not for legal protection alone — but for the tools, ranking signals, and listing control that only Brand Registry provides.
            </p>
            <Link href="/contact" className="group flex items-center gap-3 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
              Protect my brand <ArrowRight size={13} />
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
   04 — COUNTRY PRICING
   ═══════════════════════════════════════════════ */
function CountryPricing() {
  const countries = [
    { code: "us", country: "United States",  office: "USPTO",   fee: "$985",   time: "8–10 months",  popular: true,  abbr: "US" },
    { code: "ca", country: "Canada",          office: "CIPO",    fee: "$1,125", time: "18–24 months", popular: false, abbr: "Canada" },
    { code: "eu", country: "European Union",  office: "EUIPO",   fee: "$1,550", time: "4–6 months",   popular: false, abbr: "EU" },
    { code: "de", country: "Germany",         office: "DPMA",    fee: "$990",   time: "3–4 months",   popular: false, abbr: "Germany" },
    { code: "jp", country: "Japan",           office: "JPO",     fee: "$1,350", time: "12–18 months", popular: false, abbr: "Japan" },
    { code: "mx", country: "Mexico",          office: "IMPI",    fee: "$945",   time: "6–12 months",  popular: false, abbr: "Mexico" },
    { code: "gb", country: "United Kingdom",  office: "UKIPO",   fee: "$860",   time: "4 months",     popular: false, abbr: "UK" },
  ];

  return (
    <section id="pricing" className="py-32 bg-[#fafafa] relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <SectionLabel>Trademark Pricing</SectionLabel>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              File in<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">any market.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            Fees include government filing costs and our attorney-assisted filing service. All-in — no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {countries.map((c, i) => (
            <div
              key={i}
              className={`group relative rounded-[32px] overflow-hidden transition-all duration-500 ${
                c.popular ? "ring-1 ring-orange-500/30 shadow-xl shadow-orange-500/10" : ""
              }`}
            >
              {c.popular && <div className="h-1 w-full bg-gradient-to-r from-orange-500 to-amber-400" />}
              <div className={`h-full border p-7 transition-all duration-500 ${
                c.popular
                  ? "bg-zinc-950 border-t-0 border-zinc-800 rounded-b-[32px] hover:border-orange-500/30"
                  : "bg-[#fafafa] border-zinc-100 rounded-[32px] hover:bg-white hover:border-orange-500/20 hover:shadow-xl hover:shadow-zinc-200/50"
              }`}>
                {c.popular && (
                  <div className="inline-flex items-center gap-1.5 bg-orange-500/15 border border-orange-500/30 px-2.5 py-1 rounded-full mb-4">
                    <Star size={8} className="text-orange-400 fill-orange-400" />
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-orange-400">Most Common</span>
                  </div>
                )}

                <div className="flex items-center justify-between mb-5">
                  <img src={`https://flagcdn.com/w40/${c.code}.png`} alt={`${c.country} flag`} className="w-8 rounded-[4px] shadow-sm" />
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${c.popular ? "text-orange-400" : "text-zinc-400"}`}>{c.office}</span>
                </div>

                <h3 className={`text-lg font-black uppercase tracking-tight mb-4 ${c.popular ? "text-white" : "text-zinc-900 group-hover:text-orange-500 transition-colors"}`}>{c.country}</h3>

                <div className={`flex items-center justify-between py-3 border-t ${c.popular ? "border-white/5" : "border-zinc-100"} mb-3`}>
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${c.popular ? "text-zinc-600" : "text-zinc-400"}`}>All-in Fee</span>
                  <span className={`text-xl font-black tracking-tighter ${c.popular ? "text-orange-400" : "text-zinc-900"}`}>{c.fee}</span>
                </div>

                <div className={`flex items-center justify-between py-3 border-t ${c.popular ? "border-white/5" : "border-zinc-100"} mb-5`}>
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${c.popular ? "text-zinc-650" : "text-zinc-400"}`}>Est. Timeline</span>
                  <span className={`text-[11px] font-bold ${c.popular ? "text-zinc-300" : "text-zinc-700"}`}>{c.time}</span>
                </div>

                <Link
                  href="/contact"
                  className={`group/btn w-full flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest py-3 rounded-xl no-underline transition-all duration-300 ${
                    c.popular
                      ? "bg-orange-500 hover:bg-white hover:text-black text-white"
                      : "bg-zinc-50 hover:bg-black hover:text-white text-zinc-700 border border-zinc-200"
                  }`}
                >
                  File in {c.abbr}
                  <ArrowRight size={11} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}

          {/* Not sure CTA card */}
          <div className="group relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-[32px] p-7 flex flex-col justify-between overflow-hidden md:scale-[1.03] z-10 shadow-[0_0_40px_rgba(249,115,22,0.3)] transition-all duration-500 hover:shadow-[0_0_60px_rgba(249,115,22,0.5)]">
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
            <div className="relative z-10">
              <p className="text-white/80 text-[10px] font-mono uppercase tracking-widest mb-3">Not Sure Where?</p>
              <h3 className="text-xl font-black uppercase tracking-tight text-white mb-3 leading-tight">We'll recommend the right market for you.</h3>
              <p className="text-white/70 text-xs font-light leading-relaxed">Filing in the wrong country wastes time and money. We advise on the best trademark strategy for your Amazon market.</p>
            </div>
            <Link href="/contact" className="relative z-10 mt-6 inline-flex items-center gap-2 bg-white text-orange-500 font-black text-[10px] uppercase tracking-widest px-5 py-3 rounded-xl no-underline hover:bg-zinc-900 hover:text-white transition-all duration-300">
              Get Advice <ArrowRight size={11} />
            </Link>
          </div>
        </div>

        {/* Mid-Page CTA Button */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/get-started"
            className="group flex items-center gap-3 bg-orange-500 text-white px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] hover:bg-orange-600 transition-all duration-300 no-underline shadow-[0_20px_40px_rgba(249,115,22,0.3)] hover:scale-[1.02] active:scale-95"
          >
            Start My Trademark
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <p className="text-center text-[11px] text-zinc-400 font-light mt-8">
          All fees include government filing costs + attorney review. Additional classes may apply.{" "}
          <Link href="/contact" className="text-orange-500 font-bold hover:underline">Ask us about multi-class filings →</Link>
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   05 — 3-STEP PROCESS
   ═══════════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    { num: "01", title: "Complete Our Brief",       desc: "Fill out a short questionnaire covering your brand name, logo, product categories, and target countries. Takes under 10 minutes.",  icon: <FileText size={18} />   },
    { num: "02", title: "We Search & Prepare",      desc: "We run a trademark clearance search to check for conflicts, then our attorneys prepare your official filing application.",            icon: <Search size={18} />     },
    { num: "03", title: "Filed & You're Protected", desc: "Once filed, you get your filing receipt immediately. Most clients can apply for Brand Registry within days of the application date.", icon: <BadgeCheck size={18} /> },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-8">
          <div>
            <SectionLabel>The Process</SectionLabel>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Registered in<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">3 simple steps.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-md pb-2">
            We handle the complexity. You handle your business. From brief to filed in days, not weeks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-100 border border-zinc-100 rounded-[40px] shadow-xl shadow-slate-900/5 overflow-hidden">
          {steps.map((item, i) => (
            <div
              key={i}
              className={`group relative bg-[#fafafa] p-10 hover:bg-white transition-all duration-500 flex flex-col ${
                i === 0 ? "rounded-t-[40px] sm:rounded-l-[40px] sm:rounded-tr-none" :
                i === 2 ? "rounded-b-[40px] sm:rounded-r-[40px] sm:rounded-bl-none" : ""
              }`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-center mb-10">
                <div className="w-14 h-14 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                  {item.icon}
                </div>
                <span className="text-5xl font-black text-zinc-100 group-hover:text-orange-50 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.num}</span>
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900 mb-3 group-hover:text-orange-500 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.title}</h3>
              <p className="text-zinc-500 text-sm font-light leading-relaxed flex-1">{item.desc}</p>
              <div className="mt-8 h-px w-8 bg-zinc-100 group-hover:w-full group-hover:bg-orange-500 transition-all duration-700" />

              {i !== steps.length - 1 && (
                <div className="absolute top-1/2 -right-4 w-8 h-px bg-zinc-100 z-40 hidden sm:block group-hover:bg-orange-500/30 transition-colors" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between p-8 bg-[#fafafa] rounded-[32px] border border-zinc-100">
          <div className="flex items-center gap-4 text-zinc-400">
            <Terminal size={16} />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Trademark_Protocol_01-03</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest italic whitespace-nowrap">Brand Registry eligible from filing date</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   06 — FAQ
   ═══════════════════════════════════════════════ */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: "Do I need a trademark to sell on Amazon?",                    a: "No — but without a trademark you cannot enroll in Brand Registry. And without Brand Registry you lose access to A+ Content, Brand Story, Sponsored Brands, counterfeit protection, and listing control. For any serious Amazon brand, a trademark is essential infrastructure, not optional." },
    { q: "Can I apply for Brand Registry before my trademark is approved?", a: "Yes. Amazon accepts pending trademark applications for Brand Registry enrollment in most cases. Once your application is filed, you receive a serial number — and Amazon typically accepts this within a few weeks. This is one of the key reasons to file early, even before your product is ready to launch." },
    { q: "How long does trademark registration take?",                  a: "USPTO (US) typically takes 8–10 months for approval. EU takes 4–6 months. UK is as fast as 4 months. However, your filing date is what matters for Brand Registry — not the approval date. You can usually enroll in Brand Registry within 30–60 days of filing." },
    { q: "Should I file in my name or my business name?",              a: "Both work — Amazon accepts trademarks filed under either individual names or business entities. We recommend filing under a business entity if you have one, as it provides cleaner protection and separates personal liability. If you don't have a business entity, we can advise on setup before filing." },
    { q: "What if my product has 2 color variations — do I need both?", a: "No. One trademark filing covers your brand name regardless of product color or variation. You only need multiple filings if you want to protect different brand names, logos, or if you're expanding into distinct product categories that fall under different trademark classes." },
    { q: "Do I need a lawyer to file a trademark?",                    a: "You can file directly through the USPTO, but mistakes in class selection, descriptions, or specimen submissions are common and can result in rejection or significant delays. Our attorney-assisted service ensures your application is structured correctly from the start — reducing the risk of rejection and wasted filing fees." },
    { q: "What is a trademark class and does my category matter?",     a: "Trademark classes group products and services by category. Amazon sellers typically file in Class 35 (retail services) and the relevant product class. Filing in the wrong class means your trademark doesn't protect your actual products. We handle class selection as part of every filing." },
    { q: "How fast can I get filed after engaging Grow Orbit?",        a: "Most clients are filed within 3–5 business days of completing our brief. The brief takes under 10 minutes. We run a clearance search, prepare the application, and submit — then send you your filing receipt and serial number so you can begin the Brand Registry process immediately." },
  ];

  return (
    <section className="py-32 bg-[#fafafa] border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-10 text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Common<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">questions.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-12">
              The most important questions answered before you start your trademark filing.
            </p>
            <div className="p-6 bg-white rounded-3xl border border-zinc-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Have a specific question?</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Every brand situation is different. Our team can advise on the right filing strategy for your products and markets.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-orange-500 font-bold text-[10px] uppercase tracking-widest hover:gap-3 transition-all no-underline">
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
                    <span className="text-[14px] sm:text-[15px] font-bold text-zinc-900 tracking-tight">{faq.q}</span>
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
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold">More_Questions?</span>
              </div>
              <Link href="/contact" className="flex items-center justify-center sm:justify-start gap-2 group no-underline w-full sm:w-auto">
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
   07 — CTA
   ═══════════════════════════════════════════════ */
const TrademarkCTAButton = ({ href = "/contact", children }) => (
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

function TrademarkCTA() {
  return (
    <div className="w-full pb-10 bg-[#fafafa]">
      <section className="px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-[#0a0a0a] rounded-[40px] py-10 px-6 sm:px-10 lg:px-16 text-left relative overflow-hidden border border-white/5 group shadow-none">

            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />

            {/* Background Large Icon Decor */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.05] translate-x-1/4">
              <ShieldCheck size={600} strokeWidth={0.2} className="text-orange-500" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column: Content */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-white font-bold text-[9px] uppercase tracking-[0.4em]">Filing Slots Available Now</span>
                </div>

                <h2
                  className="text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-[0.9] text-white uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Protect your brand.<br />
                  <span className="italic font-light block mt-2 tracking-normal text-orange-500 lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                    unlock your tools.
                  </span>
                </h2>

                <p className="text-zinc-400 font-light mb-10 text-base lg:text-lg leading-relaxed max-w-xl">
                  Every day without a trademark is a day a competitor can hijack your listing, counterfeit your product, or steal your brand name. File now and lock it down.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-16">
                  <TrademarkCTAButton href="/get-started">
                    Get Free Strategy Call
                  </TrademarkCTAButton>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Brand Registry Ready</span>
                  </div>
                </div>

                {/* Bottom Row Points */}
                <div className="pt-8 border-t border-white/5 flex flex-wrap items-center gap-x-10 gap-y-3">
                  {[
                    "Attorney-Assisted Filing",
                    "A+ Content Ready",
                    "7 Countries Available"
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
                        <span className="text-[8px] font-mono text-orange-500/80 uppercase tracking-widest">Session: Protection</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>Registration Map</h4>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-inner">
                      <Calendar size={18} className="sm:size-[22px]" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Steps with Timeline spacing */}
                  <div className="space-y-0 relative z-10 before:absolute before:inset-y-2 before:left-[15px] sm:before:left-[19px] before:w-[1px] before:bg-white/10">
                    {[
                      { icon: <SearchCode size={14} className="sm:size-4" />, title: "1. Brief & Search", desc: "Identify conflicts and gather filing details." },
                      { icon: <TrendingDown size={14} className="sm:size-4" />, title: "2. Attorney Filing", desc: "Prepare and submit the official application." },
                      { icon: <Target size={14} className="sm:size-4" />, title: "3. Registry Unlock", desc: "Access A+ Content and Brand Protection tools.", active: true }
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
   08 — FOOTER NAV
   ═══════════════════════════════════════════════ */
function FooterNav() {
  return (
    <footer className="py-24 bg-white border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Previous Service</p>
          <Link href="/service/amazon-dsp" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start uppercase">
              <ArrowRight className="mr-3 group-hover:-translate-x-3 transition-transform rotate-180 size-6 md:size-8 shrink-0" />
              Amazon DSP
            </h4>
          </Link>
        </div>
        <div className="hidden md:block w-px h-16 bg-zinc-100" />
        <div className="text-center md:text-right w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Service</p>
          <Link href="/service/product-hunting-sourcing" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end uppercase">
              Product Hunting & Sourcing
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
export default function TrademarkRegistrationPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      document.title = "Amazon Trademark Registration & Brand Protection | Grow Orbit";
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <TrademarkHero />
      <MetricsStrip />
      <WhyTrademark />
      <CountryPricing />
      <HowItWorks />
      <FAQ />
      <TrademarkCTA />
      <FooterNav />
    </div>
  );
}
