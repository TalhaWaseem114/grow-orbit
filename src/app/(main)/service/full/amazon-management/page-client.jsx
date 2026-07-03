"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, ChevronRight, Plus, Minus, Terminal,
  TrendingUp, Zap, Star, Target, Users, BarChart3, Shield,
  Search, Layers, Camera, FileText, Palette, Layout, BookOpen,
  MousePointerClick, Sparkles, Award, Cpu, Settings, Activity,
  Globe, Radio, Gavel, Package, HeartHandshake, X, Check,
  AlertTriangle, Monitor, Heart, Rocket,
} from "lucide-react";


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

/* ─────────────────────────────────────────────
   PACKAGE DATA
───────────────────────────────────────────── */
const packages = [
  {
    id: "starter",
    name: "Orbit Starter",
    tagline: "Amazon Operations",
    desc: "Full Amazon account management — PPC, SEO, listings, and account health. Everything you need to grow profitably on Amazon without the overhead.",
    color: "zinc",
    popular: false,
    services: [
      /* Amazon Services */
      { label: "PPC Campaign Management",       included: true  },
      { label: "Listing SEO Optimization",      included: true  },
      { label: "Account Health Monitoring",     included: true  },
      { label: "Keyword Research & Tracking",   included: true  },
      { label: "Competitor Analysis",           included: true  },
      { label: "Weekly Performance Reports",    included: true  },
      { label: "Audit & Strategy (Quarterly)",  included: true  },
      /* Design Services */
      { label: "Listing Image Design",          included: false },
      { label: "A+ Content / EBC Design",       included: false },
      { label: "Brand Story Module",            included: false },
      { label: "Brand Store Design",            included: false },
      { label: "Main Image CTR Optimization",   included: false },
      /* Full Service */
      { label: "Brand Guidelines",              included: false },
      { label: "Growth Automation",             included: false },
      { label: "Dedicated Account Strategist",  included: false },
      { label: "Priority Slack Access",         included: false },
    ],
  },
  {
    id: "growth",
    name: "Orbit Growth",
    tagline: "Amazon + Design",
    desc: "The complete sales machine — Amazon management plus full creative. Every listing, image, and content asset optimized as a unified conversion system.",
    color: "orange",
    popular: true,
    services: [
      { label: "PPC Campaign Management",       included: true  },
      { label: "Listing SEO Optimization",      included: true  },
      { label: "Account Health Monitoring",     included: true  },
      { label: "Keyword Research & Tracking",   included: true  },
      { label: "Competitor Analysis",           included: true  },
      { label: "Weekly Performance Reports",    included: true  },
      { label: "Audit & Strategy (Quarterly)",  included: true  },
      { label: "Listing Image Design",          included: true  },
      { label: "A+ Content / EBC Design",       included: true  },
      { label: "Brand Story Module",            included: true  },
      { label: "Brand Store Design",            included: true  },
      { label: "Main Image CTR Optimization",   included: true  },
      { label: "Brand Guidelines",              included: false },
      { label: "Growth Automation",             included: false },
      { label: "Dedicated Account Strategist",  included: false },
      { label: "Priority Slack Access",         included: false },
    ],
  },
  {
    id: "complete",
    name: "Orbit Complete",
    tagline: "Everything — Hands-Off",
    desc: "The full orbit. Every Amazon service, every design asset, automation systems, a dedicated strategist, and direct priority access. You run your business. We run your Amazon.",
    color: "dark",
    popular: false,
    services: [
      { label: "PPC Campaign Management",       included: true },
      { label: "Listing SEO Optimization",      included: true },
      { label: "Account Health Monitoring",     included: true },
      { label: "Keyword Research & Tracking",   included: true },
      { label: "Competitor Analysis",           included: true },
      { label: "Weekly Performance Reports",    included: true },
      { label: "Audit & Strategy (Quarterly)",  included: true },
      { label: "Listing Image Design",          included: true },
      { label: "A+ Content / EBC Design",       included: true },
      { label: "Brand Story Module",            included: true },
      { label: "Brand Store Design",            included: true },
      { label: "Main Image CTR Optimization",   included: true },
      { label: "Brand Guidelines",              included: true },
      { label: "Growth Automation",             included: true },
      { label: "Dedicated Account Strategist",  included: true },
      { label: "Priority Slack Access",         included: true },
    ],
  },
];

/* All services mapped */
const serviceGroups = [
  {
    label: "Amazon Services",
    color: "orange",
    items: [
      { icon: <BarChart3 size={16} />,     title: "PPC Efficiency",        desc: "Campaign architecture, bid management, waste elimination."  },
      { icon: <Search size={16} />,        title: "Listing Optimization",  desc: "Title, bullets, backend keywords, A9 indexing."             },
      { icon: <Target size={16} />,        title: "Audit & Strategy",      desc: "72-hour account audit, 24-month roadmap delivery."          },
      { icon: <Zap size={16} />,           title: "Brand Launch Setup",    desc: "End-to-end launch: listings, PPC, Brand Registry."          },
      { icon: <Cpu size={16} />,           title: "Growth Automation",     desc: "Repricing, inventory alerts, review request workflows."      },
      { icon: <Settings size={16} />,      title: "Account Ops",           desc: "Case management, suppression recovery, account defense."    },
      { icon: <Activity size={16} />,      title: "Ongoing Support",       desc: "Weekly optimization cycles, performance tracking."          },
    ],
  },
  {
    label: "Design & Creative",
    color: "violet",
    items: [
      { icon: <Camera size={16} />,        title: "Listing Images",        desc: "Hero shots, lifestyle, infographics, 3D renders."            },
      { icon: <Sparkles size={16} />,      title: "Enhanced Brand Content A+", desc: "Conversion-focused A+ modules below the fold."          },
      { icon: <BookOpen size={16} />,      title: "Brand Story",           desc: "Above-the-fold brand narrative and catalog cross-sell."      },
      { icon: <Layout size={16} />,        title: "Brand Store",           desc: "Custom storefront with sub-pages and vanity URL."           },
      { icon: <MousePointerClick size={16}/>,title: "Main Image CTR",     desc: "Hero image engineered to dominate the search grid."         },
      { icon: <Palette size={16} />,       title: "Brand Guidelines",      desc: "Logo, color, typography, and usage standards."              },
      { icon: <Layers size={16} />,        title: "Full Listing Optimization",desc: "All 7 image slots rebuilt as a conversion system."       },
    ],
  },
  {
    label: "Full Service & Other",
    color: "emerald",
    items: [
      { icon: <Award size={16} />,         title: "Full Amazon Management", desc: "Dedicated team running every aspect of your account."      },
      { icon: <FileText size={16} />,      title: "SOPs",                  desc: "Custom workflow documentation for delegation."              },
      { icon: <HeartHandshake size={16} />,title: "Coaching",              desc: "1-on-1 strategy sessions with senior Amazon experts."       },
      { icon: <Monitor size={16} />,       title: "DTC Website",           desc: "Shopify or custom e-commerce for off-Amazon revenue."       },
      { icon: <Radio size={16} />,         title: "Amazon DSP",            desc: "Programmatic ads on and off Amazon."                        },
      { icon: <Gavel size={16} />,         title: "Trademark Registration", desc: "Brand Registry filing across 7 countries."                 },
    ],
  },
];

/* ═══════════════════════════════════════════════
   01 — HERO
   ═══════════════════════════════════════════════ */
function ManagementHero() {

  return (
    <section className="relative min-h-[100svh] lg:min-h-screen flex items-center pt-32 pb-16 lg:pt-24 lg:pb-16 overflow-hidden bg-zinc-950">
      <style>{`
        @keyframes scan-mgmt {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; } 90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes shimmer-btn {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.04] to-transparent animate-[scan-mgmt_9s_linear_infinite]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="mgmt-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#fff" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#mgmt-grid)" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(249,115,22,0.12),transparent_55%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
              <div className="w-4 h-[1px] bg-orange-500" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">Full Amazon Management</span>
            </div>

            <h1
              className="text-[42px] sm:text-6xl md:text-7xl lg:text-[85px] font-black tracking-tighter leading-[0.85] mb-8 text-white uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Full Account<br />
              <span className="text-orange-500">Management.</span><br />
              <span className="italic font-light lowercase tracking-tight text-zinc-500" style={{ fontFamily: "'Playfair Display', serif" }}>
                zero guesswork.
              </span>
            </h1>

            <div className="flex gap-6 mb-10">
              <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50" />
              <div>
                <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-xl mb-6">
                  We run your entire Amazon operation — ads, SEO, listings, creative, and account health — so you can focus on building your business instead of managing it.
                </p>
                <div className="flex flex-wrap gap-6 font-mono text-[9px] text-zinc-600 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Dedicated Team Assigned</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity size={10} className="text-orange-500/50" />
                    <span>Weekly Strategy Reviews</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {[
                "Every service bundled — one team, one strategy",
                "Dedicated account strategist assigned to you",
                "Weekly reporting and monthly growth reviews",
                "Cancel anytime — results-first commitment",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={15} className="text-orange-500 shrink-0 mt-0.5" />
                  <span className="text-zinc-400 text-[14px] font-light leading-snug">{item}</span>
                </div>
              ))}
            </div>

            {/* Scarcity Pill */}
            <div className="flex items-center gap-2 mb-6 px-1">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <p className="text-[10px] sm:text-[11px] font-bold text-zinc-400 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                Only 2 management slots available for May <span className="mx-1 opacity-30">··</span> Apply Now
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 mb-8">
              <Link href="/get-started" className="group relative overflow-hidden flex justify-center items-center gap-3 w-full sm:w-auto bg-gradient-to-r from-orange-600 to-orange-400 hover:scale-[1.02] active:scale-95 transition-all duration-300 text-white font-black text-[11px] uppercase tracking-[0.25em] px-10 py-4 rounded-full no-underline shadow-[0_10px_40px_rgba(249,115,22,0.4)]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer-btn_2s_linear_infinite]" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Book Free Strategy Call
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <a href="#packages" className="group flex items-center justify-center sm:justify-start gap-3 w-full sm:w-auto text-zinc-500 hover:text-white font-bold text-[11px] uppercase tracking-widest px-2 py-4 transition-colors no-underline">
                View Packages <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {[
                { icon: <Shield size={11} />,    label: "No Long-Term Lock-In"      },
                { icon: <Users size={11} />,     label: "Dedicated Strategist"       },
                { icon: <Activity size={11} />,  label: "Weekly Performance Reports" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                  <span className="text-orange-500">{b.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Premium Operations Command Center */}
          <div className="lg:col-span-5 relative hidden lg:block self-start lg:mt-[60px] perspective-1000 animate-float">
            
            {/* Ambient Lighting - Deep Growth Orange & Purple Glow */}
            <div className="absolute -inset-16 bg-gradient-to-br from-orange-500/30 via-transparent to-violet-500/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Main Console Container */}
            <div className="bg-zinc-950/90 backdrop-blur-3xl rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-white/10 p-6 relative overflow-hidden ring-1 ring-white/5">
               {/* Technical Grid Texture */}
               <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

               <div className="relative z-10">
                 {/* Header Bar - Command Center */}
                 <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <div className="flex items-center gap-4">
                       <div className="flex gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                         <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                         <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                       </div>
                       <div className="h-4 w-px bg-white/10" />
                       <div className="flex items-center gap-2 bg-orange-500/10 px-2.5 py-1 rounded-md border border-orange-500/20">
                         <Terminal size={10} className="text-orange-400" />
                         <span className="text-[8px] font-mono text-orange-400 uppercase tracking-widest font-bold">Orbit_OS</span>
                       </div>
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Target size={10} className="text-emerald-500" /> Account Management
                    </span>
                 </div>

                 {/* Core Operations Engine */}
                 <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/5 rounded-2xl overflow-hidden mb-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)] transform-gpu hover:scale-[1.02] transition-transform duration-500 group relative p-5">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none" />
                    
                    {/* Abstract Core Visual */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex justify-between items-center mb-6 relative z-10">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                             <Cpu size={20} className="text-orange-400" />
                          </div>
                          <div>
                             <p className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-0.5">Central Processing</p>
                             <p className="text-lg font-black text-white leading-none tracking-tight">Growth Engine</p>
                          </div>
                       </div>
                       <div className="bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                          <span className="text-[7px] font-mono font-bold text-emerald-400 uppercase tracking-widest">Optimizing</span>
                       </div>
                    </div>

                    {/* Active Modules Network */}
                    <div className="space-y-2.5 relative z-10">
                       {[
                         { icon: <BarChart3 size={12} />, label: "PPC Automation", stat: "Active", color: "orange" },
                         { icon: <Search size={12} />, label: "SEO Indexing", stat: "Synced", color: "emerald" },
                         { icon: <Palette size={12} />, label: "Creative Conversion", stat: "Deployed", color: "violet" }
                       ].map((mod, i) => (
                         <div key={i} className={`flex items-center justify-between bg-zinc-800/40 rounded-lg p-2.5 border border-white/5 hover:border-${mod.color}-500/30 transition-colors`}>
                            <div className="flex items-center gap-2.5">
                               <div className={`w-6 h-6 rounded-md bg-${mod.color}-500/20 flex items-center justify-center text-${mod.color}-400`}>
                                 {mod.icon}
                               </div>
                               <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider">{mod.label}</span>
                            </div>
                            <span className={`text-[8px] font-mono font-bold text-${mod.color}-400 uppercase tracking-widest`}>{mod.stat}</span>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Real-time Metric Visualizer */}
                 <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-xl p-4 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    
                    <div className="flex justify-between items-center mb-3">
                       <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Revenue Velocity</span>
                       <span className="text-[9px] font-black text-emerald-400">+124%</span>
                    </div>
                    
                    {/* Animated Bar Chart */}
                    <div className="flex items-end gap-1 h-10 mt-1 relative z-10">
                       {[25, 30, 20, 45, 35, 60, 50, 80, 75, 95, 85, 100].map((h, i) => (
                         <div key={i} className="flex-1 rounded-[2px] bg-white/10 group-hover:bg-white/20 transition-all duration-300 relative overflow-hidden" style={{ height: `${h}%` }}>
                            {i === 11 && <div className="absolute inset-0 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]" />}
                         </div>
                       ))}
                    </div>
                 </div>

               </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -top-6 -right-6 bg-zinc-900/95 backdrop-blur-xl rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/10 z-20 flex items-center gap-3 hover:scale-105 transition-transform duration-300">
               <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                  <Globe size={16} className="text-orange-400" />
               </div>
               <div>
                  <p className="text-[7px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em] mb-0.5">Coverage</p>
                  <p className="text-sm font-black text-white leading-none tracking-wide">Omnichannel</p>
               </div>
            </div>

            <div className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur-xl rounded-3xl p-5 shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-zinc-200 flex items-center gap-4 z-40 animate-[float_6s_ease-in-out_infinite] hover:scale-105 transition-transform duration-300">
               <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 shadow-inner">
                  <TrendingUp size={18} className="text-emerald-600" />
               </div>
               <div>
                  <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-400 mb-1">Growth Output</p>
                  <p className="text-lg font-black text-zinc-900 leading-none tracking-tight">Maximized ROI</p>
               </div>
            </div>

          </div>
        </div>

        {/* Full-Width Metrics Matrix */}
        <div className="mt-20 pt-10 border-t border-white/5 w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4 md:gap-x-8">
            {[
              { icon: <TrendingUp size={18} />, val: "$12M+", label: "Revenue Generated" },
              { icon: <Rocket size={18} />,     val: "80+",   label: "Brands Launched" },
              { icon: <Shield size={18} />,     val: "8.2x",  label: "Average ROAS" },
              { icon: <Heart size={18} />,      val: "100%",  label: "Profit-First Approach" },
              { icon: <Star size={18} />,       val: "4.9★",  label: "Client Rating" },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-4">
                {/* Icon Box */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#17110e] border border-orange-500/10 flex items-center justify-center text-orange-500 shrink-0 shadow-inner">
                  {m.icon}
                </div>
                {/* Data */}
                <div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-black tracking-tighter text-white leading-none mb-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {m.val}
                  </p>
                  <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-zinc-500 leading-tight">
                    {m.label}
                  </p>
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
   02 — THE PROBLEM (why piecemeal fails)
   ═══════════════════════════════════════════════ */
function TheProblem() {
  const problems = [
    { icon: <AlertTriangle size={20} />, title: "Fragmented execution",     desc: "When PPC, SEO, and creative are handled separately — or by different people — they work against each other. Your ad budget drives traffic to listings that don't convert." },
    { icon: <TrendingUp size={20} />,   title: "No single source of truth", desc: "Without one team seeing the full picture, reporting is inconsistent, decisions are made in silos, and nobody is accountable for your actual revenue outcome." },
    { icon: <Settings size={20} />,     title: "You're the project manager", desc: "Briefing multiple freelancers, chasing deliverables, and coordinating strategy takes 10–15 hours a week — hours you could spend on product and brand growth." },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#fafafa] relative">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <SectionLabel>The Problem</SectionLabel>
            <h2
              className="text-[42px] md:text-[64px] lg:text-[72px] font-black tracking-tighter uppercase leading-[0.85] mb-8 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Piecemeal<br />management<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                costs you more.
              </span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-4">
              Most Amazon brands either do everything themselves — burning 20+ hours a week — or hire several disconnected specialists who don't coordinate.
            </p>
            <div className="flex items-center gap-3 mb-10 p-4 bg-red-50 border border-red-100 rounded-2xl">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
              <p className="text-[12px] font-bold text-red-600 leading-snug">
                Brands managing services separately waste an average of 23% more budget on coordination gaps.
              </p>
            </div>
            <Link href="#packages" className="group flex items-center gap-3 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
              See our management packages
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {problems.map((p, i) => (
              <div key={i} className="group bg-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 border border-zinc-100 hover:border-red-200 transition-all duration-500">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-400 shrink-0 group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all duration-500">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-[14px] uppercase tracking-tight text-zinc-900 mb-2">{p.title}</h3>
                    <p className="text-zinc-500 text-sm font-light leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* The fix callout */}
            <div className="relative bg-zinc-950 rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 border border-orange-500/20 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-orange-500 to-amber-400" />
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                  <Award size={20} className="w-5 h-5 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-black text-[14px] uppercase tracking-tight text-white mb-2">The Orbit Solution</h3>
                  <p className="text-zinc-400 text-sm font-light leading-relaxed">One team, one strategy, one point of accountability. Every service works together under a unified growth system — and you have one conversation, not five.</p>
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
   03 — WHAT'S INCLUDED (service map)
   ═══════════════════════════════════════════════ */
function WhatIsIncluded() {
  const colorMap = {
    orange:  { dot: "bg-orange-500",  badge: "bg-orange-50 text-orange-500 border-orange-100", icon: "bg-orange-50 text-orange-500 group-hover:bg-orange-500"  },
    violet:  { dot: "bg-violet-500",  badge: "bg-violet-50 text-violet-600 border-violet-100", icon: "bg-violet-50 text-violet-500 group-hover:bg-violet-500"   },
    emerald: { dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-600 border-emerald-100", icon: "bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500" },
  };

  return (
    <section className="py-24 lg:py-32 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <SectionLabel>Everything Included</SectionLabel>
            <h2
              className="text-[42px] md:text-[80px] font-black tracking-tighter uppercase leading-[0.85] mb-8 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              20+ services.<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                one unified strategy.
              </span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-10">
              Every service is available under our management. Depending on your package, services are activated strategically — in the right order, at the right time.
            </p>
            <Link href="#packages" className="group flex items-center gap-3 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
              View packages & pricing
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="lg:col-span-7 space-y-5">
            {serviceGroups.map((group, gi) => {
              const c = colorMap[group.color];
              return (
                <div key={gi} className="bg-[#fafafa] rounded-[32px] border border-zinc-100 overflow-hidden">
                  <div className="px-8 py-5 border-b border-zinc-100 flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${c.dot}`} />
                    <span className="font-black text-[11px] uppercase tracking-[0.3em] text-zinc-900">{group.label}</span>
                    <span className={`ml-auto text-[9px] font-black uppercase tracking-widest border px-2 py-0.5 rounded-full ${c.badge}`}>
                      {group.items.length} services
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-100">
                    {group.items.map((item, ii) => (
                      <div key={ii} className="group bg-[#fafafa] hover:bg-white p-6 transition-all duration-300">
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 transition-all duration-500 group-hover:text-white ${c.icon} border-zinc-100 group-hover:border-transparent`}>
                          {item.icon}
                        </div>
                        <h4 className="font-black text-[12px] uppercase tracking-tight text-zinc-900 mb-1 group-hover:text-orange-500 transition-colors">{item.title}</h4>
                        <p className="text-zinc-400 text-[11px] font-light leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   05 — HOW WE WORK (onboarding)
   ═══════════════════════════════════════════════ */
function HowWeWork() {
  const steps = [
    { num: "01", icon: <Search size={18} />,    title: "Discovery & Audit",       desc: "We start with a full account audit — understanding your catalog, current performance, and goals before touching a single campaign." },
    { num: "02", icon: <Target size={18} />,    title: "Strategy & Roadmap",      desc: "A 90-day launch plan and 24-month roadmap are built. Every service activated in the correct order — no wasted motion, no guesswork." },
    { num: "03", icon: <Settings size={18} />,  title: "Activation & Execution",  desc: "Your dedicated team activates each service systematically — PPC first for revenue, then SEO and creative to compound results." },
    { num: "04", icon: <BarChart3 size={18} />, title: "Review & Scale",           desc: "Weekly performance reviews. Monthly strategy calls. Quarterly full audits. Your account never stops improving." },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Our Process</SectionLabel>
            <h2
              className="text-[42px] md:text-6xl lg:text-[80px] font-black tracking-tighter text-zinc-900 leading-[0.85] uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              How we{" "}
              <span className="text-zinc-300 italic font-light lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>work.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            From first call to full account management — a structured onboarding that gets you results in the first 30 days.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-100 rounded-[40px] overflow-hidden border border-zinc-100 shadow-2xl shadow-zinc-200/50">
          {steps.map((item, i) => (
            <div key={i}
              style={{ zIndex: steps.length - i }}
              className={`group relative bg-white p-8 hover:bg-zinc-50 transition-all duration-500 flex flex-col h-full ${
                i === 0 ? "rounded-t-[40px] lg:rounded-l-[40px] lg:rounded-tr-none" :
                i === steps.length - 1 ? "rounded-b-[40px] lg:rounded-r-[40px] lg:rounded-bl-none" : ""
              }`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-tl-[4px]" />
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

        {/* Terminal Footer */}
        <div className="mt-12 flex items-center justify-between p-8 bg-white rounded-[32px] border border-zinc-100">
          <div className="flex items-center gap-4 text-zinc-400">
            <Terminal size={16} className="text-orange-500" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em]">
              Management_Onboarding_01-04
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest italic whitespace-nowrap">
              Predictive Scaling Framework v4.2
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   06 — WHO IT'S FOR
   ═══════════════════════════════════════════════ */
function WhoItsFor() {
  const profiles = [
    {
      icon: <TrendingUp size={22} />,
      tag: "Scaling Brands",
      headline: "You're growing but the operations aren't keeping up.",
      desc: "Revenue is there but profitability isn't following. PPC is overspending. Listings aren't converting. You need a team that runs the whole machine while you focus on scaling.",
      signals: ["$300K–$5M annual Amazon revenue", "Running ads but unclear on true ROI", "Spending 15+ hours/week managing the account"],
      accent: "from-orange-500 to-amber-400",
    },
    {
      icon: <Award size={22} />,
      tag: "Busy Brand Owners",
      headline: "You've outgrown DIY. Time to delegate everything.",
      desc: "You know your Amazon account is underperforming but you don't have the bandwidth to fix it. You need one team that takes full ownership — and you need results, not excuses. This is our most common entry point.",
      signals: ["Time-poor founders and operators", "Tried freelancers but struggled with coordination", "Ready to invest in hands-off management"],
      accent: "from-rose-500 to-orange-500",
      featured: true,
    },
    {
      icon: <Package size={22} />,
      tag: "Multi-Product Catalogs",
      headline: "Dozens of ASINs need a systematic approach.",
      desc: "Managing 20+ products with different PPC structures, listing needs, and creative requirements is a full-time job. We build the system so every ASIN gets the attention it deserves.",
      signals: ["10+ active ASINs across multiple categories", "Inconsistent performance across catalog", "Wants brand-level consistency at scale"],
      accent: "from-violet-500 to-orange-400",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Perfect For</SectionLabel>
            <h2
              className="text-[42px] md:text-6xl lg:text-[80px] font-black tracking-tighter uppercase leading-[0.85] mb-6 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Full management<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                for every stage.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-sm pb-2">
            Whether you're scaling fast, time-poor, or managing a complex catalog — full management is the highest-leverage decision you can make for your Amazon business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {profiles.map((p, i) => (
            <div key={i} className={`group relative rounded-[40px] overflow-hidden transition-all duration-500 hover:shadow-2xl ${p.featured ? "hover:shadow-orange-500/15 ring-1 ring-orange-500/20" : "hover:shadow-zinc-200/80"}`}>
              <div className={`h-1 w-full bg-linear-to-r ${p.accent}`} />
              <div className={`h-full border border-t-0 rounded-b-[40px] p-8 lg:p-10 transition-all duration-500 ${p.featured ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-100 group-hover:border-orange-500/15"}`}>
                {p.featured && (
                  <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 px-3 py-1.5 rounded-full mb-6">
                    <Star size={9} className="text-orange-400 fill-orange-400" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-400">Most Common</span>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${p.featured ? "bg-orange-500/15 border border-orange-500/30 text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500" : "bg-zinc-50 border border-zinc-200 text-orange-500 group-hover:border-orange-500/30"}`}>{p.icon}</div>
                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${p.featured ? "text-orange-400" : "text-orange-500"}`}>{p.tag}</span>
                </div>
                <h3 className={`text-lg font-black uppercase tracking-tight leading-tight mb-4 ${p.featured ? "text-white" : "text-zinc-900 group-hover:text-orange-500 transition-colors"}`}>{p.headline}</h3>
                <p className={`text-sm font-light leading-relaxed mb-8 ${p.featured ? "text-zinc-400" : "text-zinc-500"}`}>{p.desc}</p>
                <div className="space-y-2">
                  <p className={`text-[9px] font-black uppercase tracking-[0.3em] mb-3 ${p.featured ? "text-zinc-600" : "text-zinc-400"}`}>This is you if —</p>
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
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   07 — FAQ
   ═══════════════════════════════════════════════ */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [
    { q: "What's included in Full Amazon Management?",                   a: "Depending on your package, full management covers: PPC campaign management, listing SEO, account health monitoring, competitor tracking, weekly reporting, creative services (listing images, A+, Brand Story, Brand Store), growth automation, and a dedicated account strategist. The Orbit Complete tier includes every service we offer." },
    { q: "Do I need to sign a long-term contract?",                      a: "No. We operate on a monthly retainer basis with no mandatory lock-in period. We earn your business every month through results. Most clients stay with us long-term because the results justify it — not because they're trapped in a contract." },
    { q: "How quickly will I see results?",                              a: "PPC improvements are typically visible within the first 2–4 weeks. Organic SEO and listing improvements take 30–90 days to fully materialize. Creative changes (images, A+) impact conversion immediately upon going live. Most clients see measurable revenue improvement within 45–60 days." },
    { q: "Who will actually be managing my account?",                    a: "You're assigned a dedicated account strategist who is your single point of contact. They're supported by PPC specialists, SEO experts, and our creative team. You never get passed around — one person owns your account's performance." },
    { q: "What size brand is this right for?",                           a: "Our management packages are best suited for brands doing $10,000–$10M+ in Amazon revenue. Smaller brands typically benefit most from our Audit & Strategy or individual services first. Larger brands often work with us on Orbit Complete for full-scale management." },
    { q: "How do reporting and communication work?",                     a: "You receive weekly performance reports covering all key metrics (revenue, ROAS, BSR, organic rank). Monthly strategy calls review progress against goals and adjust the roadmap. Orbit Complete clients get Priority Slack access for async communication throughout the week." },
    { q: "Can you take over an account that's already being managed?",  a: "Yes — this is one of our most common onboarding scenarios. We conduct a full audit first, identify what's working and what isn't, then build a transition plan. Handovers are managed smoothly with zero disruption to your active campaigns or listings." },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>FAQ</SectionLabel>
            <h2
              className="text-[42px] md:text-6xl lg:text-[80px] font-black tracking-tighter uppercase leading-[0.85] mb-10 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Frequently<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>asked.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-12">
              Everything you need to know about full Amazon account management before getting started.
            </p>
            <div className="p-6 bg-[#fafafa] rounded-3xl border border-zinc-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Not sure which package?</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Book a free 30-minute strategy call. We'll review your account and recommend the right tier — no pressure.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-orange-500 font-bold text-[10px] uppercase tracking-widest hover:gap-3 transition-all no-underline">
                Book Free Call <ChevronRight size={11} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className={`border transition-all duration-500 rounded-[24px] overflow-hidden ${openIndex === i ? "bg-[#fafafa] border-orange-500/30 shadow-xl shadow-orange-500/5" : "bg-white border-zinc-100 hover:border-zinc-200"}`}>
                <button className="w-full flex items-center justify-between px-8 py-6 text-left" onClick={() => setOpenIndex(openIndex === i ? -1 : i)}>
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-mono transition-colors shrink-0 ${openIndex === i ? "text-orange-500" : "text-zinc-300"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[14px] font-bold text-zinc-900 tracking-tight">{faq.q}</span>
                  </div>
                  <div className={`shrink-0 w-8 h-8 ml-4 rounded-full flex items-center justify-center transition-all duration-500 ${openIndex === i ? "bg-orange-500 text-white rotate-180" : "bg-zinc-100 text-zinc-400"}`}>
                    {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                <div className="transition-all duration-500 ease-in-out overflow-hidden" style={{ maxHeight: openIndex === i ? "400px" : "0", opacity: openIndex === i ? 1 : 0 }}>
                  <div className="px-6 sm:px-8 pb-8 pt-0 ml-0 sm:ml-10 mt-2 sm:mt-0">
                    <div className="text-[14px] text-zinc-500 leading-relaxed font-light border-l-2 border-orange-500/20 pl-4 sm:pl-6">{faq.a}</div>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-0 px-6 sm:px-8 py-6 bg-zinc-900 rounded-[24px] text-white">
              <div className="flex items-center gap-3 sm:gap-4">
                <Terminal size={16} className="text-orange-500 shrink-0" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold text-center sm:text-left">More_Questions?</span>
              </div>
              <Link href="/contact" className="flex items-center justify-center gap-2 group no-underline w-full sm:w-auto bg-white/5 sm:bg-transparent py-3 sm:py-0 rounded-xl sm:rounded-none">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 sm:text-zinc-400 group-hover:text-white transition-colors">Book a Strategy Call</span>
                <ChevronRight size={14} className="text-orange-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Sub-component: The Primary Gradient Button ---
const ManagementCTAButton = ({ href = "/contact", children }) => (
  <Link
    href={href}
    className="group relative inline-flex justify-center w-full sm:w-auto px-4 sm:px-10 py-4 bg-orange-600 text-white rounded-full font-bold text-[10px] sm:text-[11px] uppercase tracking-widest sm:tracking-[0.3em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:scale-[1.02] active:scale-95 no-underline border-none shadow-none"
  >
    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-4 w-full">
      {children}
      <ArrowRight size={16} className="group-hover:translate-x-2 transition-all duration-300 text-white" />
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-orange-400 transition-transform duration-500 ease-in-out"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[horizontal-scan_2s_linear_infinite]"></div>
  </Link>
);

/* ═══════════════════════════════════════════════
   08 — CTA
   ═══════════════════════════════════════════════ */
function ManagementCTA() {
  return (
    <div className="w-full pb-16 bg-[#fafafa]">
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-[#0a0a0a] rounded-[32px] sm:rounded-[40px] py-10 px-6 sm:px-10 lg:px-16 text-left relative overflow-hidden border border-white/5 group shadow-none">

            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />

            {/* Background Large Icon Decor */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.05] translate-x-1/4">
              <Activity size={600} strokeWidth={0.2} className="text-orange-500" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column: Content */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-white font-bold text-[9px] uppercase tracking-[0.4em]">Management Slots: Open Now</span>
                </div>

                <h2
                  className="text-[42px] md:text-5xl lg:text-6xl font-black tracking-tighter mb-8 leading-[0.9] text-white uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Stop managing.<br />
                  <span className="italic font-light block mt-2 tracking-normal text-orange-500 lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                    start scaling.
                  </span>
                </h2>

                <p className="text-zinc-400 font-light mb-10 text-base lg:text-lg leading-relaxed max-w-xl">
                  Book a free strategy call. We'll audit your account, identify your biggest opportunities, and recommend the right management package — no commitment required.
                </p>

                <p className="text-[10px] md:text-[11px] italic text-zinc-500 mb-4 flex items-center gap-2">
                  <span className="text-orange-500 not-italic">★★★★★</span>
                  "Joined as Full Management. Revenue up 38% in 60 days." — Home Decor Brand
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-16">
                  <ManagementCTAButton href="/get-started">
                    Get Free Strategy Call
                  </ManagementCTAButton>

                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Results in 30 Days</span>
                  </div>
                </div>

                {/* Bottom Row Points */}
                <div className="pt-8 border-t border-white/5 flex flex-wrap items-center gap-x-10 gap-y-3">
                  {[
                    "Free Account Audit Included",
                    "Dedicated Strategist Assigned",
                    "No Long-Term Lock-In"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white whitespace-nowrap">
                      <CheckCircle2 size={12} className="text-orange-500/70" strokeWidth={3} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Information Card */}
              <div className="lg:col-span-5 block mt-12 lg:mt-0 relative group/card">
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-500">

                  {/* Card Glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  {/* Header */}
                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[8px] font-mono text-orange-500/80 uppercase tracking-widest">Session: Evaluation</span>
                      </div>
                      <h4 className="text-2xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>Growth Audit</h4>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-inner">
                      <TrendingUp size={22} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Steps with Timeline spacing */}
                  <div className="space-y-0 relative z-10 before:absolute before:inset-y-3 before:left-[19px] before:w-[2px] before:bg-white/10">
                    {[
                      { icon: <Search size={16} />, title: "1. Account Analysis", desc: "We review your exact setup & bleed." },
                      { icon: <Target size={16} />, title: "2. Gap Assessment", desc: "Pinpoint where competitors are winning." },
                      { icon: <Activity size={16} />, title: "3. Action Roadmap", desc: "A tailored path for the next 90 days.", active: true }
                    ].map((step, i) => (
                      <div key={i} className={`relative flex gap-6 ${i !== 2 ? 'pb-8' : ''} group/step`}>
                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center z-10 transition-all ${step.active ? 'bg-orange-500/20 border-orange-500 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-zinc-900 border-white/10 text-zinc-400 group-hover/step:border-orange-500/50'}`}>
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
                  <div className="mt-10 bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between relative z-10 backdrop-blur-md gap-4 sm:gap-0">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full border border-white/10 bg-zinc-800 flex items-center justify-center text-zinc-400">
                         <Users size={16} />
                       </div>
                       <div>
                         <p className="text-[11px] font-bold text-white uppercase tracking-widest mb-0.5">Strategy Session</p>
                         <p className="text-[10px] text-zinc-500 font-mono">30 Mins • Strategy Discovery</p>
                       </div>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-orange-500/10 text-orange-500 text-[10px] font-bold tracking-widest uppercase border border-orange-500/20 whitespace-nowrap w-full sm:w-auto text-center">
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
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">All Services</p>
          <Link href="/service" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start uppercase">
              <ArrowRight className="mr-3 group-hover:-translate-x-3 transition-transform rotate-180 size-6 md:size-8 shrink-0" />
              All Services
            </h4>
          </Link>
        </div>
        <div className="hidden md:block w-px h-16 bg-zinc-100" />
        <div className="text-center md:text-right w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Service</p>
          <Link href="/service/sop" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end uppercase">
              <div className="flex flex-col items-center md:items-end leading-tight">
                <span>SOPS</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 mt-1">Standard Operating Procedures</span>
              </div>
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
export default function FullAmazonManagementPage() {
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen selection:bg-orange-500 selection:text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <ManagementHero />
      <TheProblem />
      <WhatIsIncluded />
      <HowWeWork />
      <div className="bg-[#fafafa] py-4">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="h-px w-full bg-linear-to-r from-transparent via-zinc-200 to-transparent" />
        </div>
      </div>
      <WhoItsFor />
      <FAQ />
      <ManagementCTA />
      <FooterNav />
    </div>
  );
}