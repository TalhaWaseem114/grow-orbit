"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, ShieldCheck, Users, TrendingUp,
  BarChart3, Zap, Sparkles, Eye, Star, Award, Package,
  ChevronRight, Plus, Minus, Terminal, FileText, Layers,
  Paintbrush, Activity, Target, Globe, Repeat, BookOpen,
  Monitor, Headphones, MessageCircle, Clock, CalendarCheck,
  Video, Brain, Search, Shield, Rocket, DollarSign,
  LineChart, Settings, UserCheck, PhoneCall, ClipboardList,
  Lightbulb, TrendingDown, AlertTriangle, Quote
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroButton from "@/components/ui/HeroButton";
import CoachingCTA from "./components/CoachingCTA";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   SHARED
───────────────────────────────────────────── */
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

const CheckItem = ({ children, light = false }) => (
  <div className="flex items-start gap-3">
    <CheckCircle2 size={15} className="text-orange-500 shrink-0 mt-0.5" />
    <span className={`text-[14px] font-light leading-snug ${light ? "text-zinc-300" : "text-zinc-600"}`}>{children}</span>
  </div>
);

/* ═══════════════════════════════════════════════
   01 — HERO
   ═══════════════════════════════════════════════ */
function CoachingHero() {
  const floatRef = useRef(null);

  useEffect(() => {
    if (!floatRef.current) return;
    gsap.to(floatRef.current, {
      y: -14, duration: 4.5, repeat: -1, yoyo: true, ease: "power1.inOut",
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#fafafa]">
      <style>{`
        @keyframes scan-coaching {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-linear-to-b from-transparent via-orange-500/[0.03] to-transparent animate-[scan-coaching_11s_linear_infinite]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="coaching-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
            <circle cx="60" cy="60" r="0.5" fill="currentColor" opacity="0.5" />
            <path d="M120 0 L120 120 M0 120 L120 120" stroke="currentColor" strokeWidth="0.2" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#coaching-grid)" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_30%,rgba(249,115,22,0.07),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fafafa] to-[#fafafa]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

          {/* ── Left ── */}
          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-10 z-0 pointer-events-none border-l border-t border-zinc-200/50 rounded-tl-[100px] opacity-40">
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-orange-500 rounded-tl-xl -translate-x-px -translate-y-px" />
            </div>
            <div className="relative z-10">

              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
                  <div className="w-4 h-[1px] bg-orange-500 self-center" />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
                  Expert Amazon Guidance
                </span>
              </div>

              <h1
                className="text-[42px] sm:text-6xl md:text-7xl lg:text-[85px] font-black tracking-tighter leading-[0.9] lg:leading-[0.85] mb-8 lg:mb-10 text-zinc-900 uppercase"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Coaching &<br />
                <span className="text-orange-500">Consultation</span><br />
                <span
                  className="italic font-light lowercase tracking-tight text-zinc-300"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  sessions.
                </span>
              </h1>

              <div className="flex gap-6 mb-12">
                <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50" />
                <div>
                  <p className="text-lg md:text-[22px] text-zinc-500 font-light leading-relaxed max-w-xl mb-6">
                    Stop guessing and start growing. Get answers that have helped brands go from $0 to $50K/month — in 60 minutes. Every session provides direct, 1-on-1 access to Amazon strategists who've scaled brands from $0 to $10M+.
                  </p>
                  <div className="flex flex-wrap gap-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Sessions: 1-on-1 Only</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video size={10} className="text-orange-500/50" />
                      <span>Video Call Format</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  "Personalized strategy for your brand",
                  "Actionable plans you can implement today",
                  "No long-term contracts required",
                  "Expert guidance across all Amazon areas",
                ].map((item, i) => <CheckItem key={i}>{item}</CheckItem>)}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mb-12">
                <HeroButton href="/get-started" className="w-full sm:w-auto">
                  Book a Free Discovery Call
                </HeroButton>
                <a
                  href="#session-types"
                  className="group flex justify-center items-center gap-3 text-zinc-500 hover:text-zinc-900 font-bold text-[11px] uppercase tracking-widest px-2 py-4 transition-colors no-underline"
                >
                  View Session Types
                  <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {[
                  { icon: <ShieldCheck size={11} />, label: "100% Confidential" },
                  { icon: <Video size={11} />,       label: "HD Video Sessions" },
                  { icon: <Zap size={11} />,         label: "24hr Booking Window" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2">
                    <span className="text-orange-500">{b.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{b.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-8 mt-10 pt-10 border-t border-zinc-100">
                {[
                  { label: "Sessions Delivered", val: "500+" },
                  { label: "Avg Client Rating",  val: "4.9/5" },
                  { label: "Topics Covered",     val: "30+" },
                ].map((t, i) => (
                  <div key={i} className="text-left w-[45%] sm:w-auto">
                    <p className="text-xl sm:text-2xl font-black tracking-tighter text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>{t.val}</p>
                    <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Premium Diagnostics Room ── */}
          <div className="lg:col-span-5 relative hidden lg:block self-start lg:mt-[60px]" ref={floatRef}>
            {/* Ambient Backglow */}
            <div className="absolute -inset-10 bg-gradient-to-br from-orange-500/20 via-transparent to-orange-500/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Main War Room UI */}
            <div className="bg-zinc-950/90 backdrop-blur-3xl rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.15)] border border-white/10 p-6 relative overflow-hidden">
               {/* Internal Grid */}
               <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
               
               <div className="relative z-10 flex flex-col gap-6">
                 {/* Header */}
                 <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                       <div className="flex gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                         <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                         <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                       </div>
                       <div className="flex items-center gap-2 bg-orange-500/10 px-2 py-1 rounded-md border border-orange-500/20">
                         <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                         <span className="text-[8px] font-mono text-orange-400 uppercase tracking-widest font-bold">Live Strategy</span>
                       </div>
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Room 04</span>
                 </div>

                 {/* Video & Data Split */}
                 <div className="grid grid-cols-2 gap-4">
                    {/* Strategist Feed Feed */}
                    <div className="bg-zinc-900 border border-white/5 rounded-2xl p-4 relative overflow-hidden group">
                       <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />
                       <div className="flex flex-col items-center justify-center py-4">
                          <div className="relative mb-3">
                             <div className="absolute -inset-2 bg-orange-500/20 rounded-full blur-md animate-pulse" />
                             <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-orange-500/50 flex items-center justify-center relative z-10">
                                <Video size={24} className="text-orange-500" />
                             </div>
                          </div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-white mb-0.5">Strategist Feed</p>
                          <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Transmitting</p>
                       </div>
                    </div>

                    {/* Revenue Projection */}
                    <div className="bg-white border border-zinc-200 rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between shadow-inner">
                       <div>
                          <p className="text-[8px] font-mono font-bold uppercase tracking-widest text-zinc-400 mb-1">Projected Lift</p>
                          <p className="text-2xl font-black text-zinc-900 leading-none">+$50K<span className="text-orange-500 text-lg">/mo</span></p>
                       </div>
                       <div className="mt-4 flex items-end gap-1 h-12">
                          {[30, 45, 35, 60, 50, 80, 100].map((h, i) => (
                             <div key={i} className="flex-1 bg-gradient-to-t from-orange-500 to-amber-400 rounded-t-sm transition-all duration-1000" style={{ height: `${h}%`, opacity: i === 6 ? 1 : 0.4 }} />
                          ))}
                       </div>
                    </div>
                 </div>

                 {/* Real-time Insights Feed */}
                 <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Terminal size={10} /> Live Action Items
                    </p>
                    <div className="space-y-2">
                       {[
                         { text: "Restructure exact match PPC bids", status: "Analyzed" },
                         { text: "Optimize Hero Image for mobile CTR", status: "Generating" },
                         { text: "Implement 15% Subscribe & Save tier", status: "Pending" }
                       ].map((item, i) => (
                         <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900 border border-white/5">
                            <div className="flex items-center gap-2">
                               <CheckCircle2 size={12} className={i === 0 ? "text-emerald-500" : i === 1 ? "text-orange-500 animate-pulse" : "text-zinc-600"} />
                               <span className={`text-[10px] font-medium ${i < 2 ? "text-white" : "text-zinc-500"}`}>{item.text}</span>
                            </div>
                            <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:block">{item.status}</span>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Footer Stats */}
                 <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                       <div className="flex -space-x-2">
                          <div className="w-6 h-6 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center text-[8px] font-bold text-white">GO</div>
                          <div className="w-6 h-6 rounded-full border-2 border-zinc-950 bg-zinc-700 flex items-center justify-center text-[8px] font-bold text-white">YOU</div>
                       </div>
                       <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest ml-2">Secure Link</span>
                    </div>
                    <div className="text-right">
                       <span className="text-[9px] font-bold text-orange-500 uppercase tracking-widest">Recording Active</span>
                    </div>
                 </div>
               </div>
            </div>
            
            {/* Floating Side Badge */}
            <div className="absolute top-20 -right-8 bg-zinc-900 rounded-xl px-4 py-3 shadow-2xl border border-white/10 z-20 flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Star size={12} className="text-emerald-500 fill-emerald-500" />
               </div>
               <div>
                  <p className="text-[7px] font-mono font-bold text-zinc-500 uppercase tracking-[0.25em] mb-0.5">Avg Rating</p>
                  <p className="text-sm font-black text-white leading-none">4.9 / 5.0</p>
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
    { v: "500+",  l: "Sessions Delivered",  i: <Headphones size={14} /> },
    { v: "4.9",   l: "Avg Client Rating",   i: <Star size={14} /> },
    { v: "30+",   l: "Topics Covered",      i: <Brain size={14} /> },
    { v: "1:1",   l: "Sessions Only",       i: <UserCheck size={14} /> },
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
          <Link href="/get-started" className="group relative flex flex-col md:border-l border-orange-500/20 md:pl-6 lg:pl-8 transition-all duration-500 hover:bg-orange-500/[0.02] no-underline col-span-2 md:col-span-1 items-center justify-center md:items-start text-center md:text-left py-6 md:py-0 border-t border-zinc-800/50 md:border-t-0 mt-2 md:mt-0">
            <div className="text-orange-500 mb-3 group-hover:translate-x-1 transition-transform hidden md:block"><ArrowRight size={14} /></div>
            <span className="text-xl md:text-lg font-black text-white uppercase tracking-tighter leading-tight group-hover:text-orange-400 transition-colors">Book<br className="hidden md:block" /> Now</span>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
              <div className="w-1.5 h-1.5 md:w-1 md:h-1 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[9px] md:text-[8px] font-mono text-zinc-500 md:text-zinc-600 uppercase tracking-widest">SLOTS_AVAILABLE</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   03 — SESSION TYPES
   ═══════════════════════════════════════════════ */
function SessionTypes() {
  const tiers = [
    {
      name: "Power Call",
      duration: "30 min",
      tag: "Quick Wins",
      desc: "A focused, high-intensity session for brands that need fast answers to specific questions. Perfect for quick audits, urgent decisions, or a second opinion on strategy.",
      features: ["One focused topic deep-dive", "Screen-sharing & live analysis", "Recorded session for reference", "Follow-up summary email", "24hr email support post-session"],
      ideal: "Sellers needing a quick expert opinion on a specific challenge",
      icon: <Zap size={22} />,
    },
    {
      name: "Deep Dive",
      duration: "60 min",
      tag: "Most Popular",
      desc: "Our most popular session. Enough time to properly diagnose problems, map out strategy, and leave with a clear action plan you can start executing immediately.",
      features: ["Multi-topic coverage", "Account audit & analysis", "Competitor landscape review", "Prioritized action plan", "Recorded session + transcript", "48hr email support post-session", "Implementation checklist"],
      ideal: "Brands ready to identify and fix their biggest growth blockers",
      icon: <Brain size={22} />,
      popular: true,
    },
    {
      name: "Growth Sprint",
      duration: "90 min",
      tag: "Maximum Impact",
      desc: "The most comprehensive session we offer. Covers full-account strategy, multi-channel planning, and builds a complete 90-day growth roadmap tailored to your brand.",
      features: ["Full account strategy review", "PPC + organic growth planning", "Catalog expansion roadmap", "Brand positioning analysis", "90-day prioritized action plan", "Recorded session + transcript", "72hr email support post-session", "2 follow-up check-in emails"],
      ideal: "Scaling brands that want a complete strategic overhaul",
      icon: <Rocket size={22} />,
    },
  ];

  return (
    <section id="session-types" className="py-20 lg:py-32 bg-white relative scroll-mt-24">
      <style>{`
        @keyframes free-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(249,115,22,0.15), 0 0 60px rgba(249,115,22,0.05); }
          50% { box-shadow: 0 0 30px rgba(249,115,22,0.25), 0 0 80px rgba(249,115,22,0.1); }
        }
        @keyframes shimmer-free {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes bounce-arrow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
      `}</style>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-20 gap-8">
          <div>
            <SectionLabel>Session Types</SectionLabel>
            <h2
              className="text-[42px] sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] lg:leading-[0.88] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Choose your<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                session format.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            Every session is private, recorded, and built around your exact needs. No templates, no scripts — just expert strategy.
          </p>
        </div>

        {/* ── FREE 15-MIN DISCOVERY CARD (Full Width) ── */}
        <div className="mb-8">
          <div
            className="group relative rounded-[40px] overflow-hidden transition-all duration-500 hover:shadow-2xl"
            style={{ animation: "free-glow 3s ease-in-out infinite" }}
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400" />
            <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 border border-t-0 border-orange-500/20 rounded-b-[40px] p-8 lg:p-10 overflow-hidden">

              {/* Shimmer effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/[0.04] to-transparent" style={{ animation: "shimmer-free 4s linear infinite" }} />
              </div>

              {/* Ambient glow */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                {/* Left Side */}
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 px-4 py-2 rounded-full">
                      <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">100% Free</span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">No Credit Card Required</span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 px-3 py-1.5 rounded-full">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-400">Limited Slots This Week</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500 shrink-0">
                      <PhoneCall size={26} />
                    </div>
                    <div>
                      <h3
                        className="text-2xl lg:text-3xl font-black uppercase tracking-tight leading-none text-white"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Free Discovery Call
                      </h3>
                      <div className="flex items-center flex-wrap gap-2 sm:gap-3 mt-1.5">
                        <span className="text-[11px] sm:text-[12px] font-mono font-bold uppercase tracking-widest text-orange-400">15 min</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">•</span>
                        <span className="text-[10px] sm:text-[11px] font-bold text-zinc-400 line-through whitespace-nowrap">$97 Value</span>
                        <span className="text-[11px] sm:text-[12px] font-black text-orange-400 uppercase">Free</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[15px] text-zinc-400 font-light leading-relaxed max-w-xl mb-6">
                    Not sure where to start? <span className="text-white font-medium">Grab a free 15-minute strategy call</span> with our Amazon experts. We'll diagnose your biggest growth blocker, give you one actionable insight you can use today, and show you the fastest path to scale — zero commitment, zero pressure.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                    {[
                      "Identify your #1 growth blocker",
                      "Get one actionable insight free",
                      "Zero obligation, zero pressure",
                      "Talk to a real Amazon expert",
                    ].map((f, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <CheckCircle2 size={13} className="text-orange-500 shrink-0" />
                        <span className="text-[12px] font-light text-zinc-400">{f}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/get-started"
                    className="group/btn relative w-full sm:w-auto inline-flex items-center justify-center gap-4 px-6 sm:px-10 py-5 bg-orange-500 text-white rounded-2xl font-black text-[10px] sm:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-orange-400 transition-all duration-300 no-underline shadow-[0_15px_40px_rgba(249,115,22,0.3)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.4)]"
                  >
                    Claim Your Free Session
                    <ArrowRight size={18} className="animate-[bounce-arrow_1.5s_ease-in-out_infinite] shrink-0" />
                  </Link>
                </div>

                {/* Right Side - Social Proof */}
                <div className="lg:col-span-5 hidden lg:block">
                  <div className="bg-white/[0.04] border border-white/[0.08] rounded-[28px] p-6 space-y-5">

                    {/* Urgency counter */}
                    <div className="flex items-center justify-between bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[11px] font-black text-orange-400 uppercase tracking-wider">Slots This Week</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-white">4</span>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">/10 left</span>
                      </div>
                    </div>

                    {/* What you get breakdown */}
                    <div className="space-y-3">
                      <p className="text-[8px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-600">In 15 minutes you'll get</p>
                      {[
                        { icon: <Search size={14} />, text: "Quick account health diagnostic" },
                        { icon: <Target size={14} />, text: "Your #1 revenue opportunity identified" },
                        { icon: <Lightbulb size={14} />, text: "One actionable tip you can use today" },
                        { icon: <ClipboardList size={14} />, text: "Clear next-steps recommendation" },
                      ].map((item, j) => (
                        <div key={j} className="flex items-center gap-3 py-2.5 border-t border-white/5">
                          <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                            {item.icon}
                          </div>
                          <span className="text-[11px] font-medium text-zinc-300">{item.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Trust signal */}
                    <div className="flex items-center gap-3 bg-black/30 rounded-xl px-4 py-3 border border-white/5">
                      <div className="flex -space-x-2">
                        {["SM", "JT", "PK"].map((initials, j) => (
                          <div key={j} className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-black text-[7px] border-2 border-zinc-950">
                            {initials}
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-white">127 discovery calls this month</p>
                        <p className="text-[9px] text-zinc-500">82% converted to paid sessions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── PAID SESSION CARDS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {tiers.map((t, i) => (
            <div
              key={i}
              className={`group relative rounded-[40px] overflow-hidden transition-all duration-500 hover:shadow-2xl ${
                t.popular ? "hover:shadow-orange-500/15 ring-1 ring-orange-500/20" : "hover:shadow-zinc-200/80"
              }`}
            >
              <div className={`h-1 w-full ${t.popular ? "bg-gradient-to-r from-orange-500 to-amber-400" : "bg-gradient-to-r from-zinc-200 to-zinc-100"}`} />
              <div className={`h-full border border-t-0 rounded-b-[40px] p-8 lg:p-10 transition-all duration-500 ${
                t.popular ? "bg-zinc-950 border-zinc-800" : "bg-[#fafafa] border-zinc-100 group-hover:border-orange-500/15"
              }`}>
                {t.popular && (
                  <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 px-3 py-1.5 rounded-full mb-6">
                    <Star size={9} className="text-orange-400 fill-orange-400" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-400">{t.tag}</span>
                  </div>
                )}
                {!t.popular && (
                  <span className="inline-block text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">{t.tag}</span>
                )}

                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    t.popular
                      ? "bg-orange-500/15 border border-orange-500/30 text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500"
                      : "bg-zinc-100 border border-zinc-200 text-orange-500 group-hover:border-orange-500/30"
                  }`}>{t.icon}</div>
                  <div>
                    <h3 className={`text-xl font-black uppercase tracking-tight leading-none ${
                      t.popular ? "text-white" : "text-zinc-900 group-hover:text-orange-500 transition-colors"
                    }`}>{t.name}</h3>
                    <span className={`text-[11px] font-mono font-bold uppercase tracking-widest ${t.popular ? "text-orange-400" : "text-orange-500"}`}>{t.duration}</span>
                  </div>
                </div>

                <p className={`text-sm font-light leading-relaxed mb-8 ${t.popular ? "text-zinc-400" : "text-zinc-500"}`}>{t.desc}</p>

                <div className="space-y-2.5 mb-8">
                  {t.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <CheckCircle2 size={13} className="text-orange-500 shrink-0" />
                      <span className={`text-[12px] font-light ${t.popular ? "text-zinc-400" : "text-zinc-500"}`}>{f}</span>
                    </div>
                  ))}
                </div>

                <div className={`rounded-2xl p-4 mb-8 ${t.popular ? "bg-white/5 border border-white/10" : "bg-white border border-zinc-100"}`}>
                  <p className={`text-[8px] font-mono font-bold uppercase tracking-[0.3em] mb-2 ${t.popular ? "text-zinc-600" : "text-zinc-400"}`}>Ideal For</p>
                  <p className={`text-[12px] font-light leading-snug ${t.popular ? "text-zinc-400" : "text-zinc-500"}`}>{t.ideal}</p>
                </div>

                <Link
                  href="/get-started"
                  className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-[11px] uppercase tracking-widest transition-all duration-300 no-underline ${
                    t.popular
                      ? "bg-orange-500 text-white hover:bg-orange-400"
                      : "bg-zinc-900 text-white hover:bg-orange-500"
                  }`}
                >
                  Book {t.name}
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   04 — WHAT WE COVER (Topics Grid — dark)
   ═══════════════════════════════════════════════ */
function TopicsGrid() {
  const topics = [
    { icon: <Target size={20} />,      title: "PPC Strategy",           desc: "Campaign structure, bidding strategy, ACOS targets, and budget allocation optimized for your specific margins." },
    { icon: <Search size={20} />,      title: "Listing Optimization",   desc: "SEO-driven titles, bullets, backend keywords, and A+ Content strategy that ranks and converts." },
    { icon: <Rocket size={20} />,      title: "Product Launch",         desc: "Launch sequencing, initial review strategy, keyword ranking plans, and promotional calendars." },
    { icon: <Shield size={20} />,      title: "Account Health",         desc: "Policy compliance, IP protection, appeal strategies, and preventative measures for account security." },
    { icon: <Package size={20} />,     title: "Catalog Expansion",      desc: "New product validation, market sizing, competitive gap analysis, and variation strategy." },
    { icon: <BarChart3 size={20} />,   title: "Advertising Audit",      desc: "Full PPC audit covering wasted spend, missed keywords, campaign architecture, and optimization roadmap." },
    { icon: <Eye size={20} />,         title: "Competitor Analysis",    desc: "Deep competitor intelligence — pricing, keywords, ad strategy, listing quality, and market positioning." },
    { icon: <LineChart size={20} />,   title: "Growth Roadmap",         desc: "90-day strategic plan covering all channels: organic, PPC, external traffic, and brand building." },
  ];

  return (
    <section className="py-20 lg:py-32 bg-zinc-950 text-white relative">
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-500/[0.08] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          <div className="lg:sticky lg:top-32">
            <SectionLabel light>What We Cover</SectionLabel>
            <h2
              className="text-[42px] sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] lg:leading-[0.88] mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Every Amazon<br />challenge,<br />
              <span className="italic font-light text-zinc-500 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                covered.
              </span>
            </h2>
            <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-lg mb-12">
              Our strategists have deep expertise across every area of Amazon selling. Whatever's holding your brand back, we've solved it before — and we'll solve it for you.
            </p>
            <Link href="/get-started" className="group flex items-center gap-3 text-orange-400 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
              Book a session <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topics.map((t, i) => (
              <div key={i} className="group flex gap-4 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-orange-500/30 rounded-[24px] p-5 transition-all duration-500">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                  {t.icon}
                </div>
                <div>
                  <h4 className="text-[12px] font-black uppercase tracking-[0.1em] text-white mb-1.5 group-hover:text-orange-400 transition-colors">{t.title}</h4>
                  <p className="text-zinc-500 text-[11px] font-light leading-relaxed group-hover:text-zinc-400 transition-colors">{t.desc}</p>
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
   05 — HOW SESSIONS WORK (Process)
   ═══════════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    { num: "01", title: "Book Your Session",    desc: "Pick your session type, choose a time slot, and tell us what you want to focus on. We'll match you with the right strategist.",  icon: <CalendarCheck size={18} /> },
    { num: "02", title: "Pre-Session Brief",    desc: "You'll receive a quick prep form. Share your goals, challenges, and any data — so we hit the ground running from minute one.", icon: <ClipboardList size={18} /> },
    { num: "03", title: "Live Strategy Session", desc: "1-on-1 video call with your strategist. Screen sharing, live analysis, and real-time problem solving — recorded for your reference.", icon: <Video size={18} /> },
    { num: "04", title: "Action Plan Delivery",  desc: "Within 24 hours you receive a written summary, prioritized action items, and implementation checklist you can execute immediately.", icon: <CheckCircle2 size={18} /> },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-20 gap-8">
          <div>
            <SectionLabel>Our Process</SectionLabel>
            <h2
              className="text-[42px] sm:text-5xl lg:text-7xl font-black tracking-tighter text-zinc-900 leading-[0.9] uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              How it{" "}
              <span className="text-zinc-300 italic font-light lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>works.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            From booking to action plan — a streamlined four-step process designed to maximize every minute.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-100 border border-zinc-100 rounded-[40px] shadow-2xl shadow-zinc-200/50 overflow-hidden">
          {steps.map((item, i) => (
            <div
              key={i}
              style={{ zIndex: steps.length - i }}
              className={`group relative bg-white p-8 hover:bg-zinc-50 transition-all duration-500 h-full flex flex-col ${
                i === 0 ? "rounded-t-[40px] lg:rounded-l-[40px] lg:rounded-tr-none" :
                i === steps.length - 1 ? "rounded-b-[40px] lg:rounded-r-[40px] lg:rounded-bl-none" : ""
              }`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-orange-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-tl-[4px]" />
              <div className="flex justify-between items-center mb-8">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">{item.icon}</div>
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

        <div className="mt-12 flex items-center justify-between p-8 bg-white rounded-[32px] border border-zinc-100 shadow-none">
          <div className="flex items-center gap-4 text-zinc-400">
            <Terminal size={16} />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Session_Process_01-04</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest italic">Every minute is maximized</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   06 — WHO THIS IS FOR
   ═══════════════════════════════════════════════ */



/* ═══════════════════════════════════════════════
   08 — FAQ
   ═══════════════════════════════════════════════ */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: "What happens during a coaching session?", a: "Every session is a private, 1-on-1 video call with one of our Amazon strategists. We share screens, analyze your account data in real-time, discuss your challenges, and build a prioritized action plan together. Every session is recorded so you can reference it later." },
    { q: "Do I need to prepare anything before the session?", a: "After booking, you'll receive a short prep form asking about your goals, challenges, and focus areas. You can also share access to your Seller Central account (optional but recommended) so we can provide data-driven guidance during the session." },
    { q: "How is this different from hiring an agency?", a: "Coaching sessions give you expert strategy WITHOUT the ongoing retainer commitment. You get the same caliber of advice, but you maintain full control of execution. It's perfect for sellers who have a team but need strategic direction, or who want a second opinion before making big decisions." },
    { q: "Can I book multiple sessions over time?", a: "Absolutely. Many of our clients book monthly or quarterly sessions as a strategic check-in. There's no subscription — just book when you need us. We maintain notes from previous sessions so there's no ramp-up time." },
    { q: "What topics can we cover in a session?", a: "Virtually anything Amazon-related: PPC strategy, listing optimization, product launches, account health, catalog expansion, competitor analysis, brand building, international expansion, and more. If it's related to selling on Amazon, we can help." },
    { q: "Will I get a recording and action items after the session?", a: "Yes. Every session is recorded and shared within 24 hours. You'll also receive a written summary with prioritized action items and an implementation checklist — so you know exactly what to do next." },
    { q: "Is there a free option to try before committing?", a: "Yes — we offer a free 15-minute discovery call. It's a quick conversation to understand your situation, answer questions, and determine which session type would give you the most value. No pressure, no obligation." },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#fafafa] border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <SectionLabel>FAQ</SectionLabel>
            <h2
              className="text-[42px] sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] lg:leading-[0.88] mb-8 lg:mb-10 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Frequently<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>asked.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-12">
              Everything you need to know about our coaching sessions before booking.
            </p>
            <div className="p-6 bg-white rounded-3xl border border-zinc-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Have More Questions?</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Every seller's situation is unique. Our team answers every question directly — no canned responses.
              </p>
              <Link href="/get-started" className="inline-flex items-center gap-2 text-orange-500 font-bold text-[10px] uppercase tracking-widest hover:gap-3 transition-all no-underline">
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
                    : "bg-white/50 border-zinc-100 hover:border-zinc-200"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-6 sm:px-8 py-6 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-mono transition-colors shrink-0 ${openIndex === i ? "text-orange-500" : "text-zinc-300"}`}>0{i + 1}</span>
                    <span className="text-[13px] sm:text-[14px] font-bold text-zinc-900 tracking-tight">{faq.q}</span>
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
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 ml-8 sm:ml-10">
                    <div className="text-[13px] sm:text-[14px] text-zinc-500 leading-relaxed font-light border-l-2 border-orange-500/20 pl-4 sm:pl-6">{faq.a}</div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center sm:justify-between px-6 sm:px-8 py-6 sm:py-6 bg-zinc-900 rounded-[24px] text-white gap-4 sm:gap-0">
              <div className="flex items-center gap-3 sm:gap-4">
                <Terminal size={16} className="text-orange-500 shrink-0" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold">More_Questions?</span>
              </div>
              <Link href="/get-started" className="flex items-center gap-2 group no-underline">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">Contact Us Directly</span>
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
   FOOTER NAV
   ═══════════════════════════════════════════════ */
function FooterNav() {
  return (
    <footer className="py-24 bg-white border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Previous Service */}
          <div className="text-center md:text-left w-full md:w-1/3">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Previous Service</p>
            <Link href="/service/sop" className="group inline-block no-underline text-zinc-900">
              <h4 className="text-2xl md:text-3xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start uppercase">
                <ArrowRight className="mr-3 group-hover:-translate-x-3 transition-transform rotate-180 size-6 shrink-0" />
                SOPs
              </h4>
            </Link>
          </div>

          {/* All Services */}
          <div className="text-center w-full md:w-1/3">
            <Link href="/service" className="group inline-flex flex-col items-center no-underline text-zinc-400 hover:text-zinc-900 transition-colors">
              <div className="w-10 h-10 rounded-full border border-zinc-100 flex items-center justify-center mb-3 group-hover:border-orange-500 group-hover:text-orange-500 transition-all">
                <ArrowRight className="-rotate-90" size={16} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">All Services</span>
            </Link>
          </div>

          {/* Next Service */}
          <div className="text-center md:text-right w-full md:w-1/3">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Service</p>
            <Link href="/service/dtc-website" className="group inline-block no-underline text-zinc-900">
              <h4 className="text-2xl md:text-3xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end uppercase">
                DTC Website
                <ArrowRight className="ml-3 group-hover:translate-x-3 transition-transform size-6 shrink-0" />
              </h4>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE EXPORT
   ═══════════════════════════════════════════════ */
export default function CoachingConsultationPage() {
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <CoachingHero />
      <MetricsStrip />
      <SessionTypes />
      <TopicsGrid />
      <HowItWorks />
      <FAQ />
      <CoachingCTA />
      <FooterNav />
    </div>
  );
}
