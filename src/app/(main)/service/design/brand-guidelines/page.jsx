"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, ArrowRight, Palette, ShieldCheck, Users, Clock, Sparkles, TrendingUp, FileText, Eye, Type, MessageSquare, Paintbrush, ChevronRight, Plus, Minus, Terminal, Star, Layers, Zap, Repeat, Activity, Image as ImageIcon, BookOpen, Fingerprint, Layout, AlertTriangle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SectionLabel = ({ children, light = false }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500" />
    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.4em] ${
      light ? "text-orange-400" : "text-orange-500/80"
    }`}>
      {children}
    </span>
  </div>
);

const CheckRow = ({ children, light = false }) => (
  <li className="flex items-start gap-3 text-[14px]">
    <CheckCircle2 size={15} className="text-orange-500 shrink-0 mt-0.5" />
    <span className={light ? "text-zinc-300" : "text-zinc-600"}>{children}</span>
  </li>
);

function BrandHero() {
  const floatRef = useRef(null);

  useEffect(() => {
    if (!floatRef.current) return;
    gsap.to(floatRef.current, {
      y: -12, duration: 4.5, repeat: -1, yoyo: true, ease: "power1.inOut",
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-[#fafafa]">
      <style>{`
        @keyframes scan-brand {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent animate-[scan-brand_10s_linear_infinite]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="brand-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
            <circle cx="60" cy="60" r="0.5" fill="currentColor" opacity="0.5" />
            <path d="M120 0 L120 120 M0 120 L120 120" stroke="currentColor" strokeWidth="0.2" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#brand-grid)" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(249,115,22,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fafafa] to-[#fafafa]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full -mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

          {/* ── Left ── */}
          <div className="lg:col-span-7 relative text-left flex flex-col items-start">
            <div className="absolute -inset-10 z-0 pointer-events-none border-l border-t border-zinc-200/50 rounded-tl-[100px] opacity-40 hidden lg:block">
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-orange-500 rounded-tl-xl -translate-x-px -translate-y-px" />
            </div>

            <div className="relative z-10 w-full flex flex-col items-start">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
                  <div className="w-4 h-[1px] bg-orange-500 self-center" />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
                  Design & Creative Services
                </span>
              </div>

              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[85px] font-black tracking-tighter leading-[0.85] mb-8 md:mb-10 text-zinc-900 uppercase"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Stop looking<br />
                <span className="text-orange-500">generic.</span><br />
                <span
                  className="italic font-light lowercase tracking-tight text-zinc-300"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Your brand, built to convert.
                </span>
              </h1>

              <div className="flex flex-col md:flex-row gap-6 mb-12">
                <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50" />
                <div className="flex flex-col items-start">
                  <p className="text-lg md:text-[22px] text-zinc-500 font-light leading-relaxed max-w-xl mb-6">
                    Build your brand your way. Get the guidelines you need to define and communicate your brand's identity on Amazon and beyond — with total consistency across every touchpoint.
                  </p>
                  <div className="flex flex-wrap gap-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Strategy: Included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Palette size={10} className="text-orange-500/50" />
                      <span>Deliverables: Comprehensive</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini feature grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 w-full text-left">
                {[
                  { icon: <Paintbrush size={14} />,    title: "Logo Usage",     sub: "Proper logo placement, sizing, color variations, and clear-space rules for every context." },
                  { icon: <Palette size={14} />,       title: "Color Palette",   sub: "Primary, secondary, and accent colors with hex, RGB, and CMYK values for perfect reproduction." },
                  { icon: <Type size={14} />,          title: "Typography",      sub: "Selected brand fonts, hierarchy, and sizing for digital, print, and platform-specific use." },
                  { icon: <MessageSquare size={14} />, title: "Voice & Tone",    sub: "Guidelines for your brand's verbal identity across all customer touchpoints and channels." },
                ].map((h, i) => (
                  <div key={i} className="group bg-white rounded-[28px] p-6 border border-zinc-100 hover:border-orange-500/20 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                        {h.icon}
                      </div>
                      <p className="text-[12px] font-black uppercase tracking-widest text-zinc-900 leading-tight group-hover:text-orange-500 transition-colors">{h.title}</p>
                    </div>
                    <p className="text-[11px] text-zinc-500 font-light leading-relaxed">{h.sub}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12 w-full max-w-lg lg:max-w-none">
                <HeroButton href="/contact">
                  Get Your Brand Kit
                </HeroButton>
                <Link
                  href="#packages"
                  className="group flex items-center justify-center gap-3 text-zinc-500 hover:text-zinc-900 font-bold text-[11px] uppercase tracking-widest w-full sm:w-auto px-6 py-5 border border-zinc-200 rounded-full transition-colors no-underline"
                >
                  View Packages
                  <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-3 w-full">
                {[
                  { icon: <ShieldCheck size={11} />, label: "Amazon Brand Registry Ready" },
                  { icon: <Layers size={11} />,      label: "Multi-Platform Guidelines"  },
                  { icon: <Zap size={11} />,         label: "2–6 Week Delivery"           },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2 w-auto">
                    <span className="text-orange-500">{b.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Premium Brand Architecture System ── */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-[70px] self-start perspective-1000" ref={floatRef}>

            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-orange-500/15 via-rose-500/5 to-transparent blur-[80px] -z-10 rounded-full animate-pulse duration-[4s]" />

            {/* Floating Top Left: Asset Sync Badge */}
            <div className="absolute -top-6 -left-6 z-40 bg-white/90 backdrop-blur-xl border border-zinc-100 p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-[float-slow_6s_ease-in-out_infinite]">
              <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center text-white shadow-inner">
                <Layout size={18} />
              </div>
              <div className="pr-2">
                <p className="text-[8px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-400 mb-0.5">Brand Core</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[11px] font-black text-zinc-900 uppercase tracking-tight">System Synced</p>
                </div>
              </div>
            </div>

            {/* Floating Bottom Right: Color Matrix */}
            <div className="absolute -bottom-8 -right-4 z-40 bg-zinc-950/90 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-2xl animate-[float-med_7s_ease-in-out_infinite_reverse]">
              <div className="flex justify-between items-center mb-3">
                <p className="text-[8px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-500">Global Palette</p>
                <div className="flex gap-0.5">
                  <div className="w-1 h-1 bg-white/20 rounded-full" />
                  <div className="w-1 h-1 bg-white/20 rounded-full" />
                </div>
              </div>
              <div className="flex gap-3">
                {[
                  { c: "bg-orange-500", shadow: "shadow-[0_0_15px_rgba(249,115,22,0.4)]", hex: "#F97316" },
                  { c: "bg-rose-500", shadow: "shadow-[0_0_15px_rgba(244,63,94,0.4)]", hex: "#F43F5E" },
                  { c: "bg-violet-500", shadow: "shadow-[0_0_15px_rgba(139,92,246,0.4)]", hex: "#8B5CF6" },
                  { c: "bg-zinc-100", shadow: "shadow-[0_0_15px_rgba(255,255,255,0.4)]", hex: "#FAFAFA" }
                ].map((color, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5">
                    <div className={`w-8 h-8 rounded-full ${color.c} ${color.shadow} border-2 border-zinc-800`} />
                    <span className="text-[6px] font-mono uppercase text-zinc-400 tracking-wider">{color.hex}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Glass Canvas */}
            <div className="relative bg-white/70 backdrop-blur-3xl rounded-[40px] border border-white shadow-[0_40px_100px_rgba(0,0,0,0.08)] overflow-hidden ring-1 ring-zinc-100 p-2">

              <div className="bg-white rounded-[32px] overflow-hidden border border-zinc-100/50 shadow-sm relative">

                {/* Header Bar */}
                <div className="px-5 py-4 border-b border-zinc-50 flex items-center justify-between bg-zinc-50/50">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-zinc-100 shadow-sm">
                    <Paintbrush size={10} className="text-orange-500" />
                    <span className="text-[9px] font-mono text-zinc-500 tracking-widest uppercase font-bold">Identity_Guidelines.pdf</span>
                  </div>
                </div>

                {/* Cover Image Section */}
                <div className="relative h-48 w-full group overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
                    alt="Brand Geometry"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                  {/* Dynamic Logo Construction */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <div className="absolute inset-0 border border-white/20 rounded-full animate-[spin_10s_linear_infinite]" />
                      <div className="absolute inset-2 border border-orange-500/40 rounded-full border-dashed animate-[spin_15s_linear_infinite_reverse]" />
                      <div className="w-12 h-12 bg-white backdrop-blur-md rounded-xl rotate-45 shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center transition-transform duration-500 group-hover:rotate-90">
                        <span className="text-zinc-900 font-black text-xl -rotate-45 group-hover:-rotate-90 transition-transform duration-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>A</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-mono text-white/80 uppercase tracking-widest mb-1">KAZVOO V.2</p>
                      <p className="text-lg font-black text-white uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Master Brand Book</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      <ChevronRight size={16} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Typography Engine Section */}
                <div className="p-6 bg-white relative overflow-hidden">

                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

                  <div className="relative z-10 flex flex-col gap-5">

                    {/* Typographic Spec */}
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0 shadow-inner">
                        <Type size={20} className="text-zinc-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Primary Typeface</p>
                          <span className="text-[9px] font-mono text-orange-500 bg-orange-50 px-2 py-0.5 rounded uppercase">Verified</span>
                        </div>
                        <p className="text-3xl font-black text-zinc-900 tracking-tighter leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>Montserrat</p>

                        {/* Alphabet Display */}
                        <div className="mt-2 mb-1 w-full overflow-hidden whitespace-nowrap opacity-60">
                          <span className="text-[9px] font-mono tracking-[0.25em] text-zinc-800 font-semibold">
                            A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
                          </span>
                        </div>

                        {/* Dynamic Weight Bar */}
                        <div className="mt-2 flex gap-1 h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                          <div className="w-[20%] h-full bg-zinc-300" />
                          <div className="w-[30%] h-full bg-zinc-500" />
                          <div className="w-[50%] h-full bg-zinc-900" />
                        </div>
                        <div className="flex justify-between mt-1 px-1">
                          <span className="text-[7px] font-mono text-zinc-400">Light</span>
                          <span className="text-[7px] font-mono text-zinc-400">Regular</span>
                          <span className="text-[7px] font-mono text-zinc-900 font-bold">Black</span>
                        </div>
                      </div>
                    </div>

                    {/* Component Grid */}
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-800 flex items-center gap-3 group relative overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-6 h-6 rounded-md bg-zinc-800 flex items-center justify-center shrink-0">
                          <ShieldCheck size={12} className="text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Ruleset</p>
                          <p className="text-[10px] font-bold text-white uppercase tracking-tight">Logo Usage</p>
                        </div>
                      </div>
                      <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-200 flex items-center gap-3 group cursor-pointer hover:bg-white hover:border-orange-500/30 hover:shadow-lg transition-all duration-300">
                        <div className="w-6 h-6 rounded-md bg-white shadow-sm flex items-center justify-center shrink-0">
                          <MessageSquare size={12} className="text-orange-500" />
                        </div>
                        <div>
                          <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Guidelines</p>
                          <p className="text-[10px] font-bold text-zinc-900 uppercase tracking-tight">Voice & Tone</p>
                        </div>
                      </div>
                    </div>

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

function MetricsStrip() {
  const stats = [
    { v: "2–6",  l: "Week Delivery",          i: <Clock size={14} /> },
    { v: "100%", l: "Original Custom Work",   i: <ShieldCheck size={14} /> },
    { v: "3+",   l: "Revision Rounds",        i: <Repeat size={14} /> },
    { v: "5",    l: "Core Deliverables",      i: <Layers size={14} /> },
  ];

  return (
    <div className="bg-zinc-900 py-12 md:py-20 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8 lg:gap-8">
          {stats.map((s, i) => (
            <div key={i} className="group relative flex flex-col border-l border-zinc-800/50 pl-8 transition-all duration-500 hover:border-orange-500/40">
              <div className="absolute top-0 left-[-1.5px] w-[3px] h-[3px] bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-orange-500/70 mb-3 group-hover:text-orange-400 transition-colors">{s.i}</div>
              <span className="text-3xl md:text-4xl font-black text-white tracking-tighter">{s.v}</span>
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mt-1">[ {s.l} ]</span>
            </div>
          ))}
          <Link href="/contact" className="group relative flex flex-col items-center md:items-start justify-center md:justify-start col-span-2 md:col-span-1 border-t md:border-t-0 md:border-l border-orange-500/20 pt-8 md:pt-0 md:pl-8 transition-all duration-500 hover:bg-orange-500/[0.02] no-underline">
            <div className="text-orange-500 mb-3 group-hover:translate-x-1 transition-transform hidden md:block"><ArrowRight size={14} /></div>
            <span className="text-lg font-black text-white uppercase tracking-tighter leading-tight group-hover:text-orange-400 transition-colors whitespace-nowrap flex items-center gap-2">
              Get Started
              <ArrowRight size={14} className="md:hidden" />
            </span>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">BRAND_KIT_READY</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function WhyItMatters() {
  const benefits = [
    { icon: <TrendingUp size={22} />,  title: "Higher Revenue Yield",      desc: "Brands with a consistent visual identity see 33% higher revenue. Consistency isn't just about looks; it's a direct driver of your bottom line." },
    { icon: <ShieldCheck size={22} />, title: "The Trust Factor",          desc: "Consistent branding increases trust by 81%. Customers are far more likely to buy from a brand that looks professional across all touchpoints." },
    { icon: <Eye size={22} />,         title: "Visual Psychology",         desc: "90% of purchasing decisions are made subconsciously based on visuals. Your brand guidelines ensure you win that split-second choice." },
    { icon: <Clock size={22} />,       title: "Save Time & Resources",     desc: "Brand guidelines streamline content creation with clear frameworks for design and messaging. No more guesswork, ever." },
    { icon: <Users size={22} />,       title: "Empower Your Team",         desc: "Equip everyone in your business with the tools and knowledge to represent your brand accurately and consistently." },
    { icon: <Layers size={22} />,      title: "Multi-Channel Ready",       desc: "Guidelines ensure your brand translates perfectly from Amazon listings to DTC websites, packaging, and social media." },
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>Why It Matters</SectionLabel>
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] mb-8 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Why Amazon<br />sellers need<br />
              <span
                className="italic font-light text-zinc-300 uppercase tracking-normal"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                brand guidelines.
              </span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-10">
              A scattered brand presence confuses customers, while consistency turns them into loyal, repeat buyers who recognize you across every platform.
            </p>
            <Link href="/contact" className="group flex items-center gap-3 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
              Build my brand identity
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <div key={i} className="group bg-[#fafafa] hover:bg-white rounded-[28px] p-6 sm:p-8 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/50 flex items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                  {b.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-[13px] font-black uppercase tracking-[0.12em] text-zinc-900 mb-2 group-hover:text-orange-500 transition-colors">{b.title}</h3>
                  <p className="text-zinc-400 text-[12px] sm:text-xs font-light leading-relaxed">{b.desc}</p>
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
   BEFORE / AFTER — visual proof
   ═══════════════════════════════════════════════ */
function BeforeAfter() {
  return (
    <section className="py-20 md:py-32 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Visual Proof</SectionLabel>
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] text-zinc-900 mb-8"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Same product.<br />
              <span
                className="italic font-light text-zinc-300 lowercase tracking-normal"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                different perception.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            One listing looks like every other seller. The other looks like a brand worth paying more for. Brand guidelines are the difference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 max-w-6xl mx-auto items-stretch">

          {/* ── BEFORE card ── */}
          <div className="relative group flex flex-col h-full">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0 z-20">
              <div className="flex items-center gap-2 bg-zinc-900 text-white px-6 py-2.5 rounded-full shadow-xl whitespace-nowrap">
                <AlertTriangle size={12} className="text-red-400" />
                <span className="text-[10px] font-black uppercase tracking-widest">Before — No Guidelines</span>
              </div>
            </div>

            <div className="bg-white rounded-[32px] border-2 border-red-200/60 p-6 md:p-8 relative overflow-hidden transition-all duration-500 flex flex-col h-full">
              {/* Fake listing header */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-16 h-16 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0 border border-zinc-200">
                  <span className="text-zinc-400 text-[18px] font-bold">AB</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-zinc-500 leading-tight mb-1" style={{ fontFamily: "Times New Roman, serif" }}>
                    Generic Organic Face Cream — No Brand Identity System Applied
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex gap-0.5">
                      {[1,2,3,4].map(s => <Star key={s} size={10} className="text-zinc-300 fill-zinc-300" />)}
                    </div>
                    <span className="text-[10px] text-zinc-400">4.1 (238)</span>
                  </div>
                </div>
              </div>

              {/* Fake image grid — chaotic */}
              <div className="grid grid-cols-3 gap-1.5 mb-8 flex-grow">
                <div className="aspect-square rounded-lg overflow-hidden col-span-2 row-span-2 border border-zinc-100 relative group/img">
                  <img
                    src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop"
                    alt="Generic Product"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                    <ImageIcon size={24} className="text-white/30" />
                  </div>
                </div>
                <div className="aspect-square rounded-lg overflow-hidden border border-zinc-100">
                  <img
                    src="https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=400&auto=format&fit=crop"
                    alt="Messy Shot"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden border border-zinc-100">
                  <img
                    src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=400&auto=format&fit=crop"
                    alt="Generic Shot"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Status Details */}
              <div className="space-y-2 mb-8">
                {[
                  "Inconsistent Typography Usage",
                  "Undefined Color Palette",
                  "Generic Market Perception",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-300 shrink-0" />
                    <span className="text-[11px] font-medium text-zinc-400 tracking-tight">{text}</span>
                  </div>
                ))}
              </div>

              {/* Market Status Box — Mirrors After Card */}
              <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 mt-auto">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-4">Market Status</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { v: "Low", l: "Retention" },
                    { v: "None", l: "Loyalty" },
                    { v: "Price", l: "Driven" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <span className="text-lg font-black text-zinc-400 tracking-tighter block">{stat.v}</span>
                      <span className="text-[8px] font-mono text-zinc-400/70 uppercase tracking-widest">{stat.l}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Red diagonal overlay */}
              <div className="absolute top-4 right-4 opacity-20">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200">
                  <AlertTriangle size={16} className="text-zinc-300" />
                </div>
              </div>
            </div>
          </div>

          {/* ── AFTER card ── */}
          <div className="relative group flex flex-col h-full">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0 z-20">
              <div className="flex items-center gap-2 bg-orange-500 text-white px-6 py-2.5 rounded-full shadow-xl shadow-orange-500/30 whitespace-nowrap">
                <CheckCircle2 size={12} />
                <span className="text-[10px] font-black uppercase tracking-widest">After — Brand Guidelines Applied</span>
              </div>
            </div>

            <div className="bg-white rounded-[32px] border-2 border-orange-200/60 p-6 md:p-8 relative overflow-hidden shadow-xl shadow-orange-500/5 group-hover:shadow-2xl group-hover:shadow-orange-500/10 transition-all duration-500 flex flex-col h-full">
              {/* Fake listing header — polished */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-16 h-16 rounded-xl bg-zinc-900 flex items-center justify-center shrink-0 shadow-md">
                  <span className="text-orange-500 text-[16px] font-black tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>KAZVOO</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-zinc-900 leading-tight mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    KAZVOO™ Organic Face Cream — Advanced Hydration Complex
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => <Star key={s} size={10} className="text-orange-400 fill-orange-400" />)}
                    </div>
                    <span className="text-[10px] text-zinc-400 font-medium">4.8 (1,247)</span>
                  </div>
                </div>
              </div>

              {/* Fake image grid — cohesive */}
              <div className="grid grid-cols-3 gap-1.5 mb-8 flex-grow">
                <div className="aspect-square rounded-lg overflow-hidden col-span-2 row-span-2 relative group/img shadow-lg border border-zinc-100">
                  <img
                    src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop"
                    alt="Branded Product"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white text-[10px] font-black tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>KAZVOO™</span>
                  </div>
                </div>
                <div className="aspect-square rounded-lg overflow-hidden border border-zinc-100 shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=400&auto=format&fit=crop"
                    alt="Detail Shot"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden border border-zinc-100 shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400&auto=format&fit=crop"
                    alt="Lifestyle Shot"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Work Done — Realistic Info */}
              <div className="space-y-2 mb-8">
                {[
                  "Standardized Typography & Hierarchy",
                  "Custom Branded Color System",
                  "High-Authority Visual Language",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={12} className="text-orange-500 shrink-0" />
                    <span className="text-[11px] font-bold text-zinc-800 tracking-tight">{text}</span>
                  </div>
                ))}
              </div>

              {/* Brand Impact Box */}
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mt-auto">
                <p className="text-[9px] font-black uppercase tracking-widest text-emerald-600 mb-4">Brand Impact</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { v: "+33%", l: "Revenue" },
                    { v: "+81%", l: "Trust" },
                    { v: "4.8★", l: "Rating" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <span className="text-lg font-black text-emerald-600 tracking-tighter block">{stat.v}</span>
                      <span className="text-[8px] font-mono text-emerald-500/70 uppercase tracking-widest">{stat.l}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Glow accent */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Bottom verdict */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
          <div className="flex items-center gap-3 bg-white border border-zinc-100 rounded-full px-6 py-3">
            <Eye size={14} className="text-orange-500" />
            <span className="text-[11px] font-black uppercase tracking-widest text-zinc-900">Same product. Same price. Different trust level.</span>
          </div>
          <Link href="/contact" className="group flex items-center gap-2 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:gap-4 transition-all no-underline">
            Get this transformation <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhatAreGuidelines() {
  const elements = [
    { icon: <Paintbrush size={20} />,    title: "Logo Usage",    desc: "Proper logo placement, sizing, color variations, and clear-space rules for every context — print, digital, and Amazon listings." },
    { icon: <Palette size={20} />,       title: "Color Palette", desc: "Primary, secondary, and accent colors with hex, RGB, and CMYK values for perfect reproduction across all media formats." },
    { icon: <Type size={20} />,          title: "Typography",    desc: "Defined fonts for headlines, body text, and UI elements to maintain a unified visual language across all touchpoints." },
    { icon: <Eye size={20} />,           title: "Imagery Style", desc: "Preferred photography styles, illustrations, and graphic elements that reflect your brand personality and connect with buyers." },
    { icon: <MessageSquare size={20} />, title: "Voice & Tone",  desc: "Guidelines for language, tone, and messaging style across every customer touchpoint — listings, emails, packaging, and ads." },
  ];

  return (
    <section className="py-20 md:py-32 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — sticky explanation + terminal */}
          <div className="lg:sticky lg:top-32 flex flex-col items-center lg:items-start text-center lg:text-left">
            <SectionLabel>The Deliverables</SectionLabel>
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] mb-8 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              What you get<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>in full.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-10">
              Brand guidelines are a roadmap for using your brand effectively. They outline the visual and verbal elements that define your brand, ensuring a consistent and professional experience across every customer touchpoint.
            </p>

            {/* Terminal deliverables list - Edge to edge on mobile */}
            <div className="rounded-3xl md:rounded-[40px] overflow-hidden border border-zinc-900/10 shadow-xl bg-zinc-950 -mx-6 md:mx-0">
              <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">brand_guidelines_v1.0</span>
                </div>
              </div>
              <div className="p-5 space-y-2">
                {[
                  { file: "logo-system.pdf",      size: "2.4 MB", status: "Ready"     },
                  { file: "color-palette.ase",    size: "180 KB", status: "Ready"     },
                  { file: "typography-guide.pdf", size: "1.1 MB", status: "Ready"     },
                  { file: "imagery-style.pdf",    size: "3.2 MB", status: "In Review" },
                  { file: "voice-tone-doc.pdf",   size: "890 KB", status: "Draft"     },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/3 border border-white/5 p-3 rounded-2xl">
                    <FileText size={14} className={row.status === "Ready" ? "text-emerald-400" : "text-orange-400"} />
                    <span className="text-white/70 text-[12px] font-mono flex-1">{row.file}</span>
                    <span className="text-zinc-600 text-[10px] font-mono">{row.size}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${row.status === "Ready" ? "text-emerald-400" : "text-orange-400"}`}>{row.status}</span>
                  </div>
                ))}
              </div>
              <div className="px-5 pb-5">
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl px-4 py-3 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-orange-400">Brand Package</span>
                  <span className="text-white font-black text-lg">100% Complete</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — element cards */}
          <div className="space-y-6 mt-12 lg:mt-0">
            {elements.map((el, i) => (
              <div key={i} className="group flex items-start gap-4 sm:gap-6 bg-white rounded-[32px] p-6 sm:p-8 border border-zinc-100 shadow-[0_10px_20px_rgba(0,0,0,0.04)] hover:border-orange-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/50">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                  {React.cloneElement(el.icon, { size: 18 })}
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-[13px] sm:text-[14px] uppercase tracking-[0.12em] text-zinc-900 mb-2 group-hover:text-orange-500 transition-colors">{el.title}</h4>
                  <p className="text-zinc-500 text-[12px] sm:text-[13px] font-light leading-relaxed">{el.desc}</p>
                </div>
                <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-1 hidden sm:block">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                </div>
              </div>
            ))}

            <div className="mt-12 flex justify-center lg:justify-start">
              <Link href="/contact" className="group flex items-center gap-3 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
                Get your brand guidelines
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  const rows = [
    { category: "Brand Questionnaire",                   starter: true,      pro: true       },
    { category: "Research & Brand Strategy",             starter: false,     pro: true       },
    { category: "Competitive Analysis",                  starter: false,     pro: true       },
    { category: "Logo Design (Primary)",                 starter: true,      pro: true       },
    { category: "Logo Variations (Light / Dark / Icon)", starter: false,     pro: true       },
    { category: "Advanced Logo Usage Guide",             starter: false,     pro: true       },
    { category: "Color Palette (Hex + RGB)",             starter: true,      pro: true       },
    { category: "Extended Colors (CMYK + Pantone)",      starter: false,     pro: true       },
    { category: "Primary Typography",                    starter: true,      pro: true       },
    { category: "Full Typography Scale + Hierarchy",     starter: false,     pro: true       },
    { category: "Core Usage Guidelines",                 starter: true,      pro: true       },
    { category: "Imagery & Photography Style Guide",     starter: false,     pro: true       },
    { category: "Voice & Tone Documentation",            starter: false,     pro: true       },
    { category: "Sub-Brand Guidelines",                  starter: false,     pro: true       },
    { category: "Brand Applications Toolkit",            starter: false,     pro: true       },
    { category: "Revision Rounds",                       starter: "1",       pro: "3+"       },
    { category: "Delivery Timeline",                     starter: "2–3 wks", pro: "4–6 wks"  },
  ];

  return (
    <section className="py-20 md:py-32 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <SectionLabel light>Package Comparison</SectionLabel>
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Starter vs<br />
              <span
                className="italic font-light text-zinc-500 lowercase tracking-normal"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                professional.
              </span>
            </h2>
          </div>
          <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
            <p className="text-zinc-400 font-light max-w-sm text-lg leading-relaxed pb-2">
              See exactly what you get in each package — line by line, feature by feature.
            </p>
          </div>
        </div>

        {/* Slide hint for mobile - moved to right corner above table */}
        <div className="flex justify-end mb-4 md:hidden">
          <style>{`
            @keyframes slide-hint {
              0% { transform: translateX(-4px); opacity: 0; }
              50% { opacity: 1; }
              100% { transform: translateX(4px); opacity: 0; }
            }
            .animate-slide-hint {
              animation: slide-hint 2s ease-in-out infinite;
            }
          `}</style>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <span className="text-[8px] font-bold uppercase tracking-widest text-orange-400">Slide to view</span>
            <div className="flex items-center">
              <ChevronRight size={10} className="text-orange-500 animate-slide-hint" />
              <ChevronRight size={10} className="text-orange-500 animate-slide-hint [animation-delay:0.3s] -ml-1" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto pb-8 -mx-6 px-6 lg:mx-0 lg:px-0">
          <div className="min-w-[700px] rounded-[40px] overflow-hidden border border-white/5">
            {/* Header */}
            <div className="grid grid-cols-[1fr_180px_180px] bg-zinc-900">
              <div className="p-6 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Feature</div>
              <div className="p-6 text-center border-l border-white/5">
                <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Starter</p>
                <p className="text-xl font-black text-white leading-tight">Brand Starter</p>
              </div>
              <div className="p-6 text-center border-l border-orange-500/20 bg-orange-500/[0.06] relative">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-orange-500" />
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-full">
                  <span className="bg-orange-500 text-white text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">Popular</span>
                </div>
                <p className="text-[9px] font-mono text-orange-400 uppercase tracking-widest mt-2 mb-1">Complete</p>
                <p className="text-xl font-black text-white leading-tight">Brand Complete</p>
              </div>
            </div>

            {/* Data rows */}
            {rows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1fr_180px_180px] border-t border-white/5 transition-colors hover:bg-white/[0.02] ${
                  i % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900/30"
                }`}
              >
                <div className="px-6 py-4 text-zinc-400 text-[13px] font-light">{row.category}</div>
                <div className="px-6 py-4 flex items-center justify-center border-l border-white/5">
                  {typeof row.starter === "boolean" ? (
                    row.starter
                      ? <CheckCircle2 size={16} className="text-emerald-400" />
                      : <div className="w-4 h-[2px] bg-zinc-700 rounded-full" />
                  ) : (
                    <span className="text-[12px] font-bold text-zinc-300">{row.starter}</span>
                  )}
                </div>
                <div className="px-6 py-4 flex items-center justify-center border-l border-orange-500/10 bg-orange-500/[0.03]">
                  {typeof row.pro === "boolean" ? (
                    row.pro
                      ? <CheckCircle2 size={16} className="text-orange-400" />
                      : <div className="w-4 h-[2px] bg-zinc-700 rounded-full" />
                  ) : (
                    <span className="text-[12px] font-bold text-orange-400">{row.pro}</span>
                  )}
                </div>
              </div>
            ))}

            {/* CTA row */}
            <div className="grid grid-cols-[1fr_180px_180px] border-t border-white/5 bg-zinc-900">
              <div className="p-6" />
              <div className="p-4 border-l border-white/5 flex items-center justify-center">
                <Link
                  href="/contact"
                  className="text-center text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-400 px-4 py-3 rounded-xl transition-all no-underline"
                >
                  Get Starter
                </Link>
              </div>
              <div className="p-4 border-l border-orange-500/20 flex items-center justify-center bg-orange-500/[0.05]">
                <Link
                  href="/contact"
                  className="text-center text-[10px] font-black uppercase tracking-widest text-white bg-orange-500 hover:bg-white hover:text-black px-4 py-3 rounded-xl transition-all no-underline"
                >
                  Get Complete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const starterFeatures = [
    "Logo design & primary variations",
    "Color palette (Hex + RGB)",
    "Primary typography system",
    "Core usage guidelines",
    "Deliverables pack (PDF + source files)",
    "1 revision round",
  ];

  const proFeatures = [
    "Everything in Starter",
    "In-depth research & brand strategy",
    "Advanced logo guidelines & sub-marks",
    "Full typography scale + hierarchy",
    "Imagery & photography style guide",
    "Voice & tone documentation",
    "Sub-brand guidelines",
    "Brand applications toolkit",
    "3 revision rounds",
  ];

  return (
    <section id="packages" className="py-20 md:py-32 bg-white relative overflow-hidden scroll-mt-24">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Packages</SectionLabel>
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Choose your<br />
              <span
                className="italic font-light text-zinc-300 lowercase tracking-normal"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                brand kit.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            Two comprehensive packages designed to match your brand ambitions — from foundational identity to a complete brand system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="group relative bg-[#fafafa] rounded-[40px] border border-zinc-100 p-8 lg:p-12 flex flex-col hover:border-orange-500/20 hover:bg-white hover:shadow-2xl hover:shadow-zinc-200/60 transition-all duration-500">
            <div className="mb-10">
              <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-orange-500 mb-2 block">Starter Package</span>
              <h3
                className="text-3xl lg:text-4xl font-black tracking-tighter text-zinc-900 mb-2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Brand Starter
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <Star size={12} className="text-orange-500" />
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Foundational Authority</span>
              </div>
              <p className="text-zinc-500 text-base font-light leading-relaxed">
                Foundational brand identity. Ideal for Amazon sellers launching or refreshing their brand presence.
              </p>
            </div>

            <ul className="space-y-4 mb-12 flex-1">
              {starterFeatures.map((f, i) => <CheckRow key={i}>{f}</CheckRow>)}
            </ul>

            <div className="space-y-4 pt-8 border-t border-zinc-100">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Typical Delivery</span>
                <span className="text-[11px] font-bold text-zinc-700">2–3 Weeks</span>
              </div>
              <div className="bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Pricing</span>
                <span className="text-2xl font-black text-zinc-900 tracking-tighter">$1,800</span>
              </div>
              <Link
                href="/contact"
                className="group/btn w-full flex items-center justify-center gap-3 bg-black hover:bg-orange-500 transition-all duration-300 text-white font-bold text-[11px] uppercase tracking-widest py-5 rounded-2xl no-underline"
              >
                Get Starter Kit
                <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="relative rounded-[40px] overflow-hidden flex flex-col">
            <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 to-amber-400 shrink-0" />
            <div className="relative flex-1 bg-zinc-950 border border-t-0 border-zinc-800 rounded-b-[40px] p-8 lg:p-12 flex flex-col hover:border-orange-500/30 transition-all duration-500">
              <div className="absolute top-6 right-8">
                <div className="inline-flex items-center gap-1.5 bg-orange-500/15 border border-orange-500/30 px-3 py-1.5 rounded-full">
                  <Star size={9} className="text-orange-400 fill-orange-400" />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-400">Most Popular</span>
                </div>
              </div>

              <div className="mb-10">
                <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-orange-400 mb-2 block">Complete Package</span>
                <h3
                  className="text-3xl lg:text-4xl font-black tracking-tighter text-white mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Brand Complete
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={12} className="text-emerald-400" />
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">+18% Avg. Conversion Lift</span>
                </div>
                <p className="text-zinc-400 text-base font-light leading-relaxed">
                  Complete brand system with in-depth research and polished presence across every touchpoint.
                </p>
              </div>

              <ul className="space-y-4 mb-12 flex-1">
                {proFeatures.map((f, i) => <CheckRow key={i} light>{f}</CheckRow>)}
              </ul>

              <div className="space-y-4 pt-8 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Typical Delivery</span>
                  <span className="text-[11px] font-bold text-zinc-300">4–6 Weeks</span>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl px-6 py-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Pricing</span>
                  <span className="text-2xl font-black text-white tracking-tighter">$4,000</span>
                </div>
                <Link
                  href="/contact"
                  className="group/btn w-full flex items-center justify-center gap-3 bg-orange-500 hover:bg-white hover:text-black transition-all duration-300 text-white font-bold text-[11px] uppercase tracking-widest py-5 rounded-2xl no-underline shadow-[0_8px_30px_rgba(249,115,22,0.3)]"
                >
                  Get Complete Kit
                  <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoTrustSection() {
  const cards = [
    {
      icon: <Paintbrush size={28} className="text-orange-500" />,
      title: "Professional design service",
      desc: "We handle the hard work of logo design, crafting a perfect fit for your brand and audience, complete with a comprehensive Brand Guideline.",
      accent: "from-orange-500 to-amber-400"
    },
    {
      icon: <Users size={28} className="text-orange-500" />,
      title: "Trust with consistency",
      desc: "Brand guidelines ensure consistent, professional marketing—from Amazon listings to social media—boosting trust and sales.",
      accent: "from-rose-500 to-orange-400"
    },
    {
      icon: <Layers size={28} className="text-orange-500" />,
      title: "Strong logo, stronger brand",
      desc: "A strong logo is essential for brand consistency, helping shoppers recognize your business, whether on Amazon or social media.",
      accent: "from-violet-500 to-orange-400"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mb-16">
          <SectionLabel>Logo Design</SectionLabel>
          <h2
            className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 mb-8 uppercase leading-[0.85]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Your Brand,<br/>
            <span className="text-orange-500">Consistent</span> on<br/>
            <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>Every Platform.</span>
          </h2>
          <p className="text-zinc-500 text-lg font-light leading-relaxed">
            Great logos aren't accidents. They require research to understand your audience and hard work to craft a design that truly resonates. But who has the time for that? We can do the hard work for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <div
              key={i}
              className={`group relative rounded-[28px] md:rounded-[32px] overflow-hidden transition-all duration-700 bg-white border border-zinc-100
                shadow-[0_20px_40px_-20px_rgba(0,0,0,0.06)] md:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]
                hover:shadow-[0_40px_80px_-20px_rgba(249,115,22,0.18)] md:hover:shadow-[0_80px_150px_-20px_rgba(249,115,22,0.22)]
                ${i === 1 ? 'lg:translate-y-12' : 'lg:translate-y-0'}
              `}
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${c.accent}`} />
              <div className="bg-white rounded-b-[28px] md:rounded-b-[32px] p-8 md:p-10 relative overflow-hidden">
                <div className="absolute -top-px left-8 w-px h-8 bg-gradient-to-b from-orange-500/40 to-transparent" />

                {/* Background Graphic */}
                <div className="absolute right-[-40px] bottom-[-40px] opacity-[0.03] group-hover:opacity-[0.1] transition-all duration-700 pointer-events-none rotate-12 group-hover:rotate-0">
                   {React.cloneElement(c.icon, { size: 200 })}
                </div>

                <div className="flex items-center gap-4 mb-6 md:mb-8 relative z-10">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white border border-zinc-200 group-hover:border-orange-500/30 flex items-center justify-center text-orange-500 transition-all group-hover:shadow-lg group-hover:shadow-orange-500/10">
                      {React.cloneElement(c.icon, { size: 24 })}
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-zinc-900 text-white text-[9px] font-black flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="flex-1 h-px bg-zinc-100 group-hover:bg-orange-500/20 transition-colors" />
                </div>

                <h3 className="text-sm md:text-base font-black uppercase tracking-tight text-zinc-900 mb-3 group-hover:text-orange-500 transition-colors leading-tight relative z-10">
                  {c.title}
                </h3>
                <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed relative z-10">
                  {c.desc}
                </p>

                <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 relative z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">SYSTEM_ACTIVE</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
      icon: <Fingerprint size={18} />,
      label: "IDENTITY DRIFT",
      status: "VISUAL CHAOS",
      statusColor: "text-red-500 bg-red-500/10 border-red-500/20",
      headline: "The Font Chaos: Your brand has no single source of truth.",
      subline: "Consistency diagnostic.",
      body: "Using different fonts, mismatched colors, and varying logo placements across your listings, social media, and packaging is eroding buyer trust. You look like a reseller, not a brand. We define a rigid visual framework that ensures every single touchpoint looks and feels like it came from the same master source.",
      symptoms: [
        "Inconsistent use of 3+ different font families across assets",
        "Non-standardized hex codes leading to varying brand colors",
        "Conflicting logo variations used without clear hierarchy",
      ],
      accentGradient: "from-red-500/80 to-orange-500/80",
    },
    {
      index: "02",
      icon: <Layers size={18} />,
      label: "GENERIC PERCEPTION",
      status: "MARKET BLEND",
      statusColor: "text-orange-500 bg-orange-500/10 border-orange-500/20",
      headline: "The Sea of Sameness: You look just like your competitors.",
      subline: "Perception analysis.",
      body: "If a shopper covers your logo, would they still know it's your brand? Most Amazon products are visually interchangeable with 50 others. This 'Market Blend' forces you to compete on price alone. We build a unique aesthetic DNA that commands premium positioning and makes your brand immediately recognizable.",
      symptoms: [
        "Brand assets are indistinguishable from category competitors",
        "High dependency on discount-driven customer acquisition",
        "Low brand-search volume relative to total sales volume",
      ],
      featured: true,
      accentGradient: "from-orange-500 to-amber-500",
    },
    {
      index: "03",
      icon: <Zap size={18} />,
      label: "SCALING FRICTION",
      status: "PROCESS LEAK",
      statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      headline: "The Launch bottleneck: Restarting design from scratch.",
      subline: "Efficiency x-ray.",
      body: "Every new product launch or ad campaign becomes a weeks-long struggle of 'what should this look like?' This design-lag is costing you market speed. We deliver a modular guideline system that allows your team to deploy new high-fidelity assets in minutes, not days, with 100% brand accuracy.",
      symptoms: [
        "Excessive time spent on design revisions for new assets",
        "Frequent 'off-brand' output from internal or external teams",
        "Lack of a centralized asset library and usage rulebook",
      ],
      accentGradient: "from-emerald-500/80 to-teal-500/80",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 relative z-10">
        <div className="mb-12 lg:mb-20">
          <SectionLabel>Identity Diagnostic</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 mt-4">
            <h2
              className="text-3xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              The fingerprints<br />
              of a weak brand.
            </h2>
            <p className="text-zinc-500 text-sm lg:text-base font-light leading-relaxed max-w-md lg:text-right">
              Most Amazon brands fail to scale because they lack a unified visual language. If you recognize these patterns, your brand authority is leaking.
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
                    [IDENTITY_SCAN_{s.index}]
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
                          BRAND_SIGNAL: {s.subline.toUpperCase()}
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
                              IDENTITY_SYMPTOMS
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
          <div className="bg-zinc-950 rounded-[24px] lg:rounded-[48px] border border-white/5 p-6 lg:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 lg:gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} className="text-orange-500" />
              </div>
              <div>
                <p className="text-[9px] lg:text-[11px] font-black uppercase tracking-[0.35em] lg:tracking-[0.4em] text-orange-500 mb-1.5">Standardize Your Identity</p>
                <p className="text-zinc-400 text-[13px] lg:text-base font-light leading-relaxed max-w-lg">
                  Stop the visual bleed. Our brand guidelines provide the scientific framework for 100% aesthetic consistency across your entire ecosystem.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-white text-zinc-950 w-full md:w-auto px-6 lg:px-10 py-3.5 lg:py-5 rounded-full text-[10px] lg:text-[12px] font-black uppercase tracking-[0.2em] lg:tracking-[0.25em] hover:bg-orange-500 hover:text-white hover:shadow-[0_20px_50px_rgba(249,115,22,0.3)] transition-all duration-500 shrink-0 active:scale-[0.97] no-underline"
            >
              Get Free Brand Audit
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* --- Gradient Divider --- */}
        <div className="mt-20 lg:mt-32 h-px w-full bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      </div>
    </section>
  );
}

function OurProcess() {
  const steps = [
    { num: "01", title: "Brand Questionnaire", desc: "We send a comprehensive questionnaire covering your industry, audience, competitors, and visual preferences.",        icon: <FileText size={18} /> },
    { num: "02", title: "Research & Strategy",  desc: "Competitive landscape analysis and brand positioning to ensure your identity stands out in your category.",         icon: <TrendingUp size={18} /> },
    { num: "03", title: "Design & Build",        desc: "Logo, color, typography, and guidelines built around your positioning, audience, and platform requirements.",       icon: <Paintbrush size={18} /> },
    { num: "04", title: "Review & Deliver",      desc: "Revision rounds until everything is perfect, then final delivery in all required file formats.",                    icon: <CheckCircle2 size={18} /> },
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Our Process</SectionLabel>
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 leading-[0.85] uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              HOW IT{" "}
              <span
                className="text-zinc-300 italic font-light uppercase tracking-normal"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                works.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            A clear, collaborative process — from brand discovery to final delivery. You're involved and in control at every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-100 border border-zinc-100 rounded-[40px] shadow-xl shadow-slate-900/5 overflow-hidden">
          {steps.map((item, i) => (
            <div
              key={i}
              style={{ zIndex: steps.length - i }}
              className={`group relative bg-white p-8 md:p-10 hover:bg-zinc-50 transition-all duration-500 h-full flex flex-col ${
                i === 0 ? "rounded-t-[40px] lg:rounded-l-[40px] lg:rounded-tr-none" :
                i === steps.length - 1 ? "rounded-b-[40px] lg:rounded-r-[40px] lg:rounded-bl-none" : ""
              }`}
            >
              <div className="flex justify-between items-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
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

        <div className="mt-12 flex items-center justify-between p-8 bg-[#fafafa] rounded-[32px] border border-zinc-100 ">
          <div className="flex items-center gap-4 text-zinc-400">
            <Terminal size={16} />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Brand_Process_01-04</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest italic">Collaborative from start to finish</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: "What are the key steps involved in your branding process?",  a: "Our process includes: gathering information via a detailed questionnaire, research and competitive analysis, defining brand elements (values, mission, personality), logo design, establishing voice and tone guidelines, typography selection, color palette creation, brand application across platforms, and final review with your approval." },
    { q: "How do you initiate the branding process?",                  a: "We start by sending you a comprehensive brand questionnaire to understand your industry, competitors, target audience, and visual preferences. This forms the foundation of your brand identity." },
    { q: "What information do you gather from clients?",               a: "We learn about your brand story, target audience demographics, brand personality and values, competitive landscape, visual preferences (colors, fonts, imagery), existing brand assets, and your plans for using the brand across platforms." },
    { q: "What's the difference between Starter and Pro packages?",    a: "The Starter package covers foundational elements — logo, color palette, typography, and basic usage guidelines. The Pro package adds in-depth research and strategy, advanced logo guidelines, extended brand elements, imagery style guides, voice and tone documentation, and sub-brand guidelines." },
    { q: "How long does the branding process take?",                   a: "The Starter package typically takes 2–3 weeks. The Pro package, with its deeper research and expanded deliverables, takes 4–6 weeks. Both include revision rounds to ensure your complete satisfaction." },
    { q: "Do you offer revisions?",                                    a: "Absolutely. Both packages include dedicated revision rounds. We work closely with you to refine every element until it perfectly represents your brand vision." },
    { q: "Will the guidelines work for platforms beyond Amazon?",      a: "Yes. Our brand guidelines are designed to be platform-agnostic and work across Amazon, your DTC website, social media, packaging, print, and any other channel you operate on." },
  ];

  return (
    <section className="py-20 md:py-32 bg-[#fafafa] border-t border-zinc-100">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>FAQ</SectionLabel>
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] mb-10 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              FREQUENTLY<br />
              <span
                className="italic font-light text-zinc-300 uppercase tracking-normal"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                asked.
              </span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-12">
              Everything you need to know about our brand guidelines service before getting started.
            </p>
            <div className="p-8 bg-white rounded-[32px] border border-zinc-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Have More Questions?</span>
              </div>
              <p className="text-sm text-zinc-500 font-light leading-relaxed mb-6">
                Every brand is unique. If you have a specific question not covered here, our team is ready to answer it directly.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:gap-3 transition-all no-underline">
                Ask us directly <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border transition-all duration-500 rounded-[32px] overflow-hidden ${
                  openIndex === i
                    ? "bg-white border-orange-500/30 shadow-xl shadow-orange-500/5"
                    : "bg-white/60 border-zinc-100 hover:border-zinc-200"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-6 sm:px-8 py-6 sm:py-7 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    <span className={`text-[10px] sm:text-[11px] font-mono transition-colors shrink-0 ${openIndex === i ? "text-orange-500" : "text-zinc-300"}`}>
                      0{i + 1}
                    </span>
                    <span className="text-sm sm:text-[15px] font-bold text-zinc-900 tracking-tight leading-snug">{faq.q}</span>
                  </div>
                  <div className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 ml-4 rounded-full flex items-center justify-center transition-all duration-500 ${
                    openIndex === i ? "bg-orange-500 text-white rotate-180" : "bg-zinc-100 text-zinc-400"
                  }`}>
                    {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                <div
                  className="transition-all duration-500 ease-in-out overflow-hidden"
                  style={{ maxHeight: openIndex === i ? "500px" : "0", opacity: openIndex === i ? 1 : 0 }}
                >
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 sm:ml-12">
                    <div className="text-[14px] sm:text-[15px] text-zinc-500 leading-relaxed font-light border-l-2 border-orange-500/20 pl-5 sm:pl-8">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-8 bg-zinc-900 rounded-[32px] text-white text-center sm:text-left">
              <div className="flex items-center gap-4">
                <Terminal size={18} className="text-orange-500" />
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.3em] font-bold">More_Questions?</span>
              </div>
              <Link href="/contact" className="flex items-center gap-3 group no-underline w-full sm:w-auto justify-center sm:justify-start">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">Contact Us Directly</span>
                <ChevronRight size={16} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const HeroButton = ({ href = "/contact", children }) => (
  <Link
    href={href}
    className="group relative flex justify-center w-full sm:w-auto px-10 py-5 bg-zinc-900 text-white rounded-full font-bold text-[11px] uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:scale-[1.02] active:scale-95 no-underline border-none"
  >
    <span className="relative z-10 flex items-center gap-4">
      {children}
      <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-zinc-900 transition-transform duration-500 ease-in-out"></div>
  </Link>
);

const BrandCTAButton = ({ href = "/contact", children }) => (
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

function BrandGuidelineCTA() {
  return (
    <div className="w-full bg-[#fafafa] py-10">
      <section className="px-0 md:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-[#0a0a0a] rounded-none md:rounded-[40px] py-20 px-8 lg:px-20 text-left relative overflow-hidden border-y md:border border-white/5 group shadow-none">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />

            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.05] translate-x-1/4">
              <Palette size={600} strokeWidth={0.2} className="text-orange-500" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-white font-bold text-[9px] uppercase tracking-[0.4em]">Design Capacity: Open</span>
                </div>

                <h2
                  className="text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-[0.85] text-white uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Stop looking generic.<br />
                  <span className="italic font-light block mt-2 tracking-normal text-orange-500 lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                    own your aesthetic.
                  </span>
                </h2>

                <p className="text-zinc-400 font-light mb-10 text-lg md:text-xl leading-relaxed max-w-xl">
                  Every inconsistent touchpoint erodes buyer trust and conversion rates. Book a **15-minute Brand Discovery** to map out a cohesive visual identity that commands premium pricing.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-16">
                  <BrandCTAButton href="/get-started">
                    Get Free Strategy Call
                  </BrandCTAButton>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Scalable Assets</span>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-wrap items-center gap-x-10 gap-y-3">
                  {[
                    "Visual Identity Systems",
                    "Typography & Color Theory",
                    "Asset Usage Rulebooks"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white whitespace-nowrap">
                      <CheckCircle2 size={12} className="text-orange-500/70" strokeWidth={3} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 block mt-12 lg:mt-0 relative group/card">
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-5 sm:p-8 shadow-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-500">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[8px] font-mono text-orange-500/80 uppercase tracking-widest">Session: Brand Spec</span>
                      </div>
                      <h4 className="text-2xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>Blueprint</h4>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-inner">
                      <BookOpen size={22} strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="space-y-0 relative z-10 before:absolute before:inset-y-3 before:left-[19px] before:w-[2px] before:bg-white/10">
                    {[
                      { icon: <Fingerprint size={16} />, title: "1. Visual Audit", desc: "Identify inconsistencies in your current visual presence." },
                      { icon: <Layout size={16} />, title: "2. Core Formulation", desc: "Define logo marks, typography, and color systems." },
                      { icon: <Sparkles size={16} />, title: "3. Playbook Delivery", desc: "Receive a structured guide for flawless execution.", active: true }
                    ].map((step, i) => (
                      <div key={i} className={`relative flex gap-4 sm:gap-6 ${i !== 2 ? 'pb-8' : ''} group/step`}>
                        <div className={`w-10 h-10 shrink-0 rounded-full border flex items-center justify-center z-10 transition-all ${step.active ? 'bg-orange-500/20 border-orange-500 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-zinc-900 border-white/10 text-zinc-400 group-hover/step:border-orange-500/50'}`}>
                          {step.icon}
                        </div>
                        <div className="pt-1">
                          <h5 className={`text-[13px] font-bold mb-1.5 uppercase tracking-wide ${step.active ? 'text-orange-400' : 'text-white'}`}>{step.title}</h5>
                          <p className="text-[11px] text-zinc-400 font-light leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 relative z-10 backdrop-blur-md">
                    <div className="flex items-center gap-3 sm:gap-4">
                       <div className="w-10 h-10 shrink-0 rounded-full border border-white/10 bg-zinc-800 flex items-center justify-center text-zinc-400">
                         <Users size={16} />
                       </div>
                       <div>
                         <p className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-widest mb-0.5 leading-tight">Creative Session</p>
                         <p className="text-[9px] sm:text-[10px] text-zinc-500 font-mono">15 Mins • 1-on-1 Discovery</p>
                       </div>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-orange-500/10 text-orange-500 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase border border-orange-500/20 self-stretch sm:self-auto text-center shrink-0">
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

function FooterNav() {
  return (
    <footer className="py-24 bg-white border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Previous Service</p>
          <Link href="/service/ongoing-support" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start uppercase">
              <ArrowRight className="mr-3 group-hover:-translate-x-3 transition-transform rotate-180 size-5 md:size-8 shrink-0" />
              Ongoing Support
            </h4>
          </Link>
        </div>
        <div className="hidden md:block w-px h-16 bg-zinc-100" />
        <div className="text-center md:text-right w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Design Service</p>
          <Link href="/service/design/brand-story" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end uppercase">
              Brand Story
              <ArrowRight className="ml-3 group-hover:translate-x-3 transition-transform size-5 md:size-8 shrink-0" />
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

export default function BrandGuidelinesPage() {
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <BrandHero />
      <MetricsStrip />
      <WhyItMatters />
      <BeforeAfter />
      <WhatAreGuidelines />
      <ComparisonTable />
      <Pricing />
      <LogoTrustSection />
      <WhoItsFor />
      <OurProcess />
      <FAQ />
      <BrandGuidelineCTA />
      <FooterNav />
    </div>
  );
}
