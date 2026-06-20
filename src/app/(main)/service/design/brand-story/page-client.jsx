"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, ShieldCheck, Users, TrendingUp,
  MessageSquare, Repeat, Zap, Sparkles, Eye, Star, Award,
  ChevronRight, Plus, Minus, Terminal, FileText, Layers,
  BarChart3, Paintbrush, Activity, Package, BookOpen,
  Layout, ShoppingCart, Heart, Target, Feather, PenTool, Lightbulb,
  ArrowUpRight, Search, Fingerprint
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroButton from "@/components/ui/HeroButton";

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

const CheckItem = ({ children }) => (
  <div className="flex items-start gap-3">
    <CheckCircle2 size={15} className="text-orange-500 shrink-0 mt-0.5" />
    <span className="text-zinc-600 text-[14px] leading-snug">{children}</span>
  </div>
);

/* ═══════════════════════════════════════════════
   01 — HERO
   ═══════════════════════════════════════════════ */
function BrandStoryHero() {
  const floatRef = useRef(null);

  useEffect(() => {
    if (!floatRef.current) return;
    gsap.to(floatRef.current, {
      y: -14, duration: 4.5, repeat: -1, yoyo: true, ease: "power1.inOut",
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-[#fafafa]">
      <style>{`
        @keyframes scan-story {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent animate-[scan-story_11s_linear_infinite]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="story-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
            <circle cx="60" cy="60" r="0.5" fill="currentColor" opacity="0.5" />
            <path d="M120 0 L120 120 M0 120 L120 120" stroke="currentColor" strokeWidth="0.2" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#story-grid)" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_30%,rgba(249,115,22,0.07),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fafafa] to-[#fafafa]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full -mt-4 lg:-mt-6">
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
                  Design &amp; Creative Services
                </span>
              </div>

              <h1
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[85px] font-black tracking-tighter leading-[0.9] md:leading-[0.85] mb-8 md:mb-10 text-zinc-900 uppercase text-left"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Amazon<br />
                <span className="text-orange-500">Brand Story</span><br />
                <span
                  className="italic font-light lowercase tracking-tight text-zinc-300"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  design.
                </span>
              </h1>

              <div className="flex gap-6 mb-12">
                <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50" />
                <div>
                  <p className="text-sm sm:text-base md:text-[22px] text-zinc-500 font-light leading-relaxed max-w-xl mb-6">
                    Every shopper wants to know who they're buying from. We craft compelling Brand Story modules that build trust, drive cross-selling, and convert browsers into loyal buyers.
                  </p>
                  <div className="flex flex-wrap gap-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Brand Registry: Required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen size={10} className="text-orange-500/50" />
                      <span>Storytelling: Strategic</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  "Establish brand authority & trust",
                  "Increase cross-selling across your catalog",
                  "Boost Brand Registry conversion rates",
                  "Appear above A+ Content on every listing",
                ].map((item, i) => (
                  <CheckItem key={i}>{item}</CheckItem>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mb-12">
                <HeroButton href="/contact">
                  Launch Your Brand Story
                </HeroButton>
                <a
                  href="#examples"
                  className="group flex items-center justify-center sm:justify-start gap-3 text-zinc-500 hover:text-zinc-900 font-bold text-[11px] uppercase tracking-widest px-2 py-4 transition-colors no-underline"
                >
                  See Examples
                  <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { icon: <ShieldCheck size={11} />, label: "Brand Registry 2.0 Ready"   },
                  { icon: <Layers size={11} />,      label: "Desktop & Mobile Optimized" },
                  { icon: <Zap size={11} />,         label: "7–10 Day Delivery"          },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2">
                    <span className="text-orange-500">{b.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{b.label}</span>
                  </div>
                ))}
              </div>

              {/* Trust signal row */}
              <div className="hidden sm:flex items-center gap-8 mt-10 pt-10 border-t border-zinc-100">
                {[
                  { label: "Stories Built",   val: "150+"  },
                  { label: "Avg CVR Lift",    val: "+22%"  },
                  { label: "Brands Served",   val: "80+"   },
                ].map((t, i) => (
                  <div key={i} className="text-left">
                    <p className="text-2xl font-black tracking-tighter text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>{t.val}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Brand Story mockup ── */}
          <div className="lg:col-span-5 relative mt-16 lg:mt-[60px] self-start perspective-1000" ref={floatRef}>

            <div className="absolute -top-4 -right-4 bg-white rounded-[20px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-30 flex gap-2.5 animate-[float-slow_6s_ease-in-out_infinite]">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white"><BookOpen size={16} /></div>
              <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white"><Layout size={16} /></div>
            </div>
            <div className="absolute -left-4 -bottom-10 bg-zinc-900 rounded-2xl px-5 py-4 z-30 shadow-[0_30px_60px_rgba(0,0,0,0.4)] min-w-[160px] animate-[float-med_7s_ease-in-out_infinite_reverse]">
              <p className="text-[7px] font-mono font-bold uppercase tracking-[0.25em] text-zinc-500 mb-1">Conversion Lift</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[8px] font-black text-orange-400 uppercase">AVG</span>
                <span className="text-2xl font-black text-white leading-none">+22%</span>
              </div>
            </div>

            {/* Main Glass Canvas Wrapper */}
            <div className="relative bg-white/70 backdrop-blur-3xl rounded-[40px] border border-white shadow-[0_40px_100px_rgba(0,0,0,0.08)] ring-1 ring-zinc-100 p-2 lg:p-3 z-20">

              {/* Original Amazon-style Brand Story mockup */}
              <div className="bg-white rounded-[32px] border border-zinc-100/50 shadow-sm overflow-hidden relative" role="img" aria-label="Amazon Brand Story Carousel Mockup showcasing premium storytelling and brand equity builders">
                <div className="px-5 py-4 border-b border-zinc-100 flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-400" />
                    <div className="w-3 h-3 rounded-full bg-zinc-200" />
                    <div className="w-3 h-3 rounded-full bg-zinc-200" />
                  </div>
                  <div className="flex-1 bg-zinc-50 rounded-lg px-4 py-2 flex items-center gap-2">
                    <ShoppingCart size={11} className="text-zinc-300" />
                    <span className="text-[11px] text-zinc-400 font-medium">amazon.com · Brand Story</span>
                  </div>
                </div>

                <div className="p-4">
                  {/* Simulated Brand Story hero banner */}
                  <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-5 mb-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/25 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/10 rounded-full blur-xl pointer-events-none" />

                    {/* Hero section */}
                    <img
                      src="https://res.cloudinary.com/dciggvulg/image/upload/v1781271681/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-1.png"
                      alt="Nexa Premium Amazon Brand Story Design Showcase"
                      className="absolute inset-0 w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                    <div className="relative z-10">
                      <p className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Brand Story · Hero Module</p>
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
                          <span className="text-white font-black text-[10px]">GO</span>
                        </div>
                        <div>
                          <div className="h-2.5 w-28 bg-white/30 rounded-sm mb-1.5" />
                          <div className="h-1.5 w-20 bg-white/15 rounded-sm" />
                        </div>
                      </div>
                      {/* Wide banner bar */}
                      <div className="h-16 rounded-xl bg-white/5 border border-white/10 mb-3 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center px-4 gap-3">
                          <img
                            src="https://res.cloudinary.com/dciggvulg/image/upload/v1781271686/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-4.png"
                            alt="Product"
                            className="w-10 h-10 rounded-lg object-cover bg-white/10 p-1"
                          />
                          <div className="space-y-1.5 flex-1">
                            <div className="h-2 w-24 bg-white/25 rounded-sm" />
                            <div className="h-1.5 w-32 bg-white/15 rounded-sm" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card modules row */}
                  <p className="text-[7px] font-mono text-zinc-400 uppercase tracking-widest mb-2 px-1">Product Card Modules</p>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {[
                      { label: "About Us",     src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781271670/grow_orbit_portfolio/assets/portfolio/nexa_pouches/2.png" },
                      { label: "Our Story",    src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781271672/grow_orbit_portfolio/assets/portfolio/nexa_pouches/3.png" },
                      { label: "Best Seller",  src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781271674/grow_orbit_portfolio/assets/portfolio/nexa_pouches/4.png" },
                      { label: "New Tech",     src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781271676/grow_orbit_portfolio/assets/portfolio/nexa_pouches/5.png" },
                    ].map((card, i) => (
                      <div key={i} className={`rounded-xl border p-2 bg-zinc-50 border-zinc-100`}>
                        <div className="aspect-square rounded-lg bg-white mb-1.5 overflow-hidden border border-zinc-100/50">
                          <img src={card.src} alt={card.label} className="w-full h-full object-cover" />
                        </div>
                        <div className="h-1.5 w-full bg-zinc-200/80 rounded-sm mb-1" />
                        <div className="h-1 w-2/3 bg-zinc-200/50 rounded-sm" />
                      </div>
                    ))}
                  </div>

                  {/* Status bar */}
                  <div className="bg-zinc-900 rounded-xl px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">Live on Amazon</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-white">4 Modules</span>
                      <div className="w-px h-3 bg-zinc-700" />
                      <span className="text-[10px] font-bold text-orange-400 uppercase">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-[120px]" />
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
    { v: "150+",  l: "Stories Developed",     i: <BookOpen size={14} /> },
    { v: "+22%",  l: "Avg Conversion Lift",   i: <TrendingUp size={14} /> },
    { v: "80+",   l: "Brands Served",         i: <Users size={14} /> },
    { v: "7",     l: "Day Turnaround",        i: <Zap size={14} /> },
  ];

  return (
    <div className="bg-zinc-900 py-10 md:py-12 border-y border-white/5 relative overflow-hidden">
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
              Start Project
              <ArrowRight size={14} className="md:hidden" />
            </span>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">STORY_SLOTS_OPEN</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   03 — WHY EVERY LISTING NEEDS A BRAND STORY
   ═══════════════════════════════════════════════ */
function WhyBrandStory() {
  const reasons = [
    {
      icon: <TrendingUp size={22} />,
      stat: "+22%",
      statLabel: "avg CVR lift",
      title: "Higher Conversion",
      desc: "Brand Stories rank above your product description. Shoppers who engage with Brand Stories convert at measurably higher rates.",
    },
    {
      icon: <ShoppingCart size={22} />,
      stat: "3.2x",
      statLabel: "catalog visits",
      title: "Catalog Cross-Selling",
      desc: "Strategic product card modules keep shoppers inside your brand ecosystem, driving cross-catalog traffic automatically.",
    },
    {
      icon: <Heart size={22} />,
      stat: "+48%",
      statLabel: "brand trust",
      title: "Emotional Connection",
      desc: "Share your mission, values, and origin story. Customers who connect with a brand emotionally are 3x more likely to return.",
    },
    {
      icon: <ShieldCheck size={22} />,
      stat: "100%",
      statLabel: "brand registry",
      title: "Brand Protection",
      desc: "Establish yourself as a legitimate, registered brand — making it significantly harder for knock-offs to compete for shopper attention.",
    },
    {
      icon: <Layers size={22} />,
      stat: "5.24",
      statLabel: "avg units/order",
      title: "Increased Cart Size",
      desc: "By showcasing your entire brand family, you encourage multi-unit purchases and increase the lifetime value of every customer.",
    },
    {
      icon: <Zap size={22} />,
      stat: "↑72%",
      statLabel: "brand recall",
      title: "Market Authority",
      desc: "Differentiate yourself from 'commodity' sellers. A professional story makes your brand the memorable choice in a crowded search result.",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-20">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>The Why</SectionLabel>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.88] mb-6 md:mb-8 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Why every listing needs<br />
              <span className="text-orange-500">
                a brand story
              </span>
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-md mb-8 md:mb-10">
              In a sea of generic listings, your Brand Story is the anchor that prevents shoppers from drifting away to competitors. It's premium real estate on Amazon — and most sellers leave it empty.
            </p>
            <Link href="/contact" className="group flex items-center gap-3 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
              Get my Brand Story built
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <div key={i} className="group bg-[#fafafa] hover:bg-white rounded-[28px] p-6 sm:p-7 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500 shrink-0">
                    {React.cloneElement(r.icon, { size: 18 })}
                  </div>
                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-black tracking-tighter text-orange-500 leading-none">{r.stat}</span>
                    <p className="text-[12px] font-mono font-bold text-zinc-400 uppercase tracking-widest mt-1">{r.statLabel}</p>
                  </div>
                </div>
                <h3 className="text-[12px] sm:text-[13px] font-black uppercase tracking-[0.12em] text-zinc-900 mb-2 group-hover:text-orange-500 transition-colors">{r.title}</h3>
                <p className="text-zinc-400 text-[11px] sm:text-xs font-light leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   03b — CLIENT PROOF (testimonial strip)
   ═══════════════════════════════════════════════ */
function ClientProof() {
  return (
    <section className="py-16 md:py-20 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.08),transparent_60%)] pointer-events-none" />
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12 relative z-10 text-center">
        <div className="flex justify-center mb-8">
          <div className="flex gap-1">
            {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-orange-400 fill-orange-400" />)}
          </div>
        </div>
        <blockquote
          className="text-xl sm:text-2xl md:text-3xl font-light text-white leading-relaxed mb-10 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-orange-500 text-4xl leading-none align-top mr-1">&ldquo;</span>
          Our conversion rate jumped 18% in the first 30 days after upgrading our listings with premium visuals and design. It was the best investment we ever made.
          <span className="text-orange-500 text-4xl leading-none align-bottom ml-1">&rdquo;</span>
        </blockquote>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-orange-500/30 shadow-lg grayscale hover:grayscale-0 transition-all duration-500">
              <img src="https://randomuser.me/api/portraits/men/44.jpg" alt="Kazvoo Electronics" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <p className="text-[13px] font-bold text-white tracking-tight uppercase">KAZVOO ELECTRONICS</p>
              <p className="text-[11px] text-zinc-500 font-light">Founder · Consumer Electronics</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <CheckCircle2 size={10} className="text-emerald-500" />
            <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Verified Grow Orbit Client</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   04 — ENGAGE & CONVERT (dark section)
   ═══════════════════════════════════════════════ */
function EngageAndConvert() {
  const features = [
    { icon: <Target size={20} />,      title: "Strategic Positioning",      desc: "Located above A+ Content and product descriptions — capturing attention exactly when buyers are looking for validation before purchase." },
    { icon: <Layout size={20} />,      title: "Custom Card Modules",         desc: "We design every card — About Us, catalog highlights, bestseller spotlights — for maximum visual impact and click-through." },
    { icon: <ShoppingCart size={20} />,title: "Visual Catalog Integration",  desc: "Strategic cross-selling blocks that automatically drive traffic to your other Amazon listings and expand the buyer's cart size." },
    { icon: <ShieldCheck size={20} />, title: "Brand Registry 2.0 Ready",   desc: "Fully compliant with Amazon's latest Brand Story architecture, optimized for both desktop and mobile viewing experiences." },
  ];

  return (
    <section className="py-20 md:py-32 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-500/[0.08] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left — terminal mockup */}
          <div className="relative order-2 lg:order-1">
            <div className="rounded-[40px] overflow-hidden border border-white/5 shadow-2xl bg-zinc-900">
              {/* Browser bar */}
              <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Amazon · Brand Story Module</span>
                </div>
              </div>

              {/* Simulated Amazon Brand Story */}
              <div className="p-6 space-y-4">
                {/* Background hero */}
                <div className="relative rounded-2xl overflow-hidden bg-zinc-900 h-36 border border-white/5">
                  <img
                    src="https://res.cloudinary.com/dciggvulg/image/upload/v1781872045/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/aplus-2.jpg"
                    alt="Brand Story Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/40 to-transparent" />
                  <div className="absolute inset-4 flex items-center gap-4 relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
                      <Sparkles size={22} className="text-orange-400" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="h-2.5 w-32 bg-white/40 rounded-sm" />
                      <div className="h-1.5 w-48 bg-white/20 rounded-sm" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 z-10">
                    <div className="bg-orange-500 text-white text-[7px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-lg">Brand Story</div>
                  </div>
                </div>

                {/* Card modules */}
                <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest px-1">Product Card Modules</p>
                <div className="grid grid-cols-4 gap-2.5">
                  {[
                    { title: "About Us",     src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781271698/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/2.png" },
                    { title: "Our Story",    src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781271700/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/3.png" },
                    { title: "Best Seller",  src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781271702/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/4.png" },
                    { title: "Shop All",     src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781271704/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/5.png" },
                  ].map((card, i) => (
                    <div key={i} className={`rounded-xl bg-zinc-800/50 border border-white/5 p-2 group/card hover:border-orange-500/30 transition-colors`}>
                      <div className="aspect-square rounded-lg bg-zinc-900 mb-2 overflow-hidden">
                        <img src={card.src} alt="Card" className="w-full h-full object-cover opacity-80 group-hover/card:opacity-100 transition-opacity" />
                      </div>
                      <div className="h-1.5 w-full bg-white/20 rounded-sm mb-1" />
                      <div className="h-1 w-2/3 bg-white/10 rounded-sm" />
                    </div>
                  ))}
                </div>

                {/* Footer bar */}
                <div className="bg-zinc-950 rounded-xl px-5 py-3 flex items-center justify-between border border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">All modules active</span>
                  </div>
                  <span className="text-[10px] font-black text-orange-400 uppercase tracking-wider">Live</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Right — feature list */}
          <div className="order-1 lg:order-2">
            <SectionLabel light>The Mechanics</SectionLabel>
            <h2
              className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] mb-12"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Engage & convert<br />with{" "}
              <span className="italic font-light text-zinc-500 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                storytelling.
              </span>
            </h2>

            <div className="space-y-6">
              {features.map((f, i) => (
                <div key={i} className="group flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                    {f.icon}
                  </div>
                  <div className="pt-1">
                    <h4 className="text-[13px] font-black uppercase tracking-[0.15em] text-white mb-2 group-hover:text-orange-400 transition-colors">{f.title}</h4>
                    <p className="text-zinc-500 text-sm font-light leading-relaxed group-hover:text-zinc-400 transition-colors">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   05 — WHAT'S INCLUDED
   ═══════════════════════════════════════════════ */
function WhatIsIncluded() {
  const deliverables = [
    { icon: <Paintbrush size={20} />, title: "Hero Background Module",   desc: "Full-width custom background that defines your brand aesthetic and atmosphere across all listings." },
    { icon: <Layout size={20} />,     title: "4+ Custom Card Modules",   desc: "About Us, catalog highlights, bestseller spotlights, mission statements — all designed for click-through." },
    { icon: <ShoppingCart size={20} />,title: "Cross-Sell Integration",  desc: "Strategic product placement within the story to drive traffic across your entire catalog." },
    { icon: <FileText size={20} />,   title: "Custom Copywriting",        desc: "Brand voice-aligned copy for every module — from headline to micro-copy and call-to-action." },
    { icon: <Activity size={20} />,   title: "Mobile Optimization",       desc: "Every module designed and tested for both desktop and mobile viewing for maximum reach." },
    { icon: <CheckCircle2 size={20} />,title: "Upload-Ready Files",       desc: "All files delivered in Amazon-compliant formats with a step-by-step upload guide included." },
  ];

  return (
    <section className="py-20 md:py-32 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left — sticky */}
          <div className="lg:sticky lg:top-24">
            <SectionLabel>What's Included</SectionLabel>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.88] mb-6 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Everything in<br />your brand<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                story package.
              </span>
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-md mb-8 md:mb-10">
              One complete package covers everything you need — design, copy, modules, and delivery — so you can go live with confidence.
            </p>

            {/* Process callout */}
            <div className="bg-zinc-950 rounded-[28px] p-6 border border-white/5">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-orange-400">How It Works</span>
              </div>
              <div className="space-y-4">
                {[
                  "We receive your brand assets & questionnaire",
                  "Our team crafts the copy and visual strategy",
                  "Design review + revision rounds",
                  "Amazon-ready files delivered in 7 days",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[9px] font-mono font-black text-orange-500 shrink-0 mt-0.5">0{i + 1}</span>
                    <span className="text-zinc-400 text-[13px] font-light leading-snug">{step}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-white/5 flex justify-center lg:justify-start">
                <Link href="/contact" className="group flex items-center gap-3 text-orange-400 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
                  Start your project
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right — deliverable cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {deliverables.map((d, i) => (
              <div key={i} className="group bg-white rounded-[32px] p-5 sm:p-6 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mb-4 sm:mb-5 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500 shrink-0">
                  {React.cloneElement(d.icon, { size: 16 })}
                </div>
                <h4 className="font-black text-[11px] sm:text-[12px] uppercase tracking-[0.12em] text-zinc-900 mb-2 group-hover:text-orange-500 transition-colors">{d.title}</h4>
                <p className="text-zinc-400 text-[11px] sm:text-xs font-light leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   06 — PORTFOLIO / EXAMPLES
   ═══════════════════════════════════════════════ */
function ExamplesGallery() {
  const examples = [
    {
      portfolioId: "li-02",
      niche: "EDC Gear",
      images: [
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872034/grow_orbit_portfolio/assets/portfolio/nexa_pouches/main_image.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872021/grow_orbit_portfolio/assets/portfolio/nexa_pouches/7.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872019/grow_orbit_portfolio/assets/portfolio/nexa_pouches/5.jpg"
      ],
      tags: ["Technical", "Product Cards", "Core Values"],
      accent: "bg-amber-500"
    },
    {
      portfolioId: "li-03",
      niche: "Home & Auto",
      images: [
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872054/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/main_image.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872038/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/4.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872040/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/5.jpg"
      ],
      tags: ["Power", "Narrative", "Benefits"],
      accent: "bg-zinc-700"
    },
    {
      portfolioId: "li-04",
      niche: "Automotive",
      images: [
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872075/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/main_image.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872060/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/5.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872061/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/6.jpg"
      ],
      tags: ["Emergency", "Versatility", "Reliability"],
      accent: "bg-orange-500"
    },
  ];

  return (
    <section id="examples" className="py-20 md:py-32 bg-white relative overflow-hidden scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Portfolio</SectionLabel>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.88] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Captivate more<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                Amazon shoppers.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm sm:text-base md:text-lg font-light max-w-sm leading-relaxed pb-2">
            Browse our Brand Story work across categories — from home goods to supplements and everything in between.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {examples.map((ex, i) => (
            <Link
              key={i}
              href={`/portfolio/${ex.portfolioId}`}
              className="group relative rounded-[32px] overflow-hidden border border-zinc-100 bg-zinc-950 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-700 no-underline block"
            >
              {/* Image sequence layout - Mimicking Amazon Brand Story horizontal module */}
              <div className="relative overflow-hidden flex gap-3 p-3 bg-[#0a0a0a] group-hover:bg-[#050505] transition-colors duration-700">
                {/* 01: Hero / Brand Intro */}
                <div className="flex-1 aspect-square relative rounded-xl overflow-hidden shadow-md border border-white/5 transition-all duration-700 group-hover:scale-[1.02]">
                  <img src={ex.images[0]} alt={`${ex.niche} Brand Story Hero Showcase`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* 02: About / Story Card */}
                <div className="flex-1 aspect-square relative rounded-xl overflow-hidden shadow-md border border-white/5 transition-all duration-700 group-hover:scale-[1.02]">
                  <img src={ex.images[1]} alt={`${ex.niche} Brand Story Detail Module`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* 03: Product / Detail Card */}
                <div className="flex-[0.5] aspect-[1/2] relative rounded-xl overflow-hidden shadow-md border border-white/5 transition-all duration-700 group-hover:scale-[1.02]">
                  <img src={ex.images[2]} alt={`${ex.niche} Brand Story Product Card`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Animated Edge Light (Horizontal Scan) */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:animate-[horizontal-scan_3s_linear_infinite] pointer-events-none" />

                {/* Hover overlay - Subtle Glassmorphism */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-zinc-950/40 backdrop-blur-[2px] z-30 pointer-events-none">
                  <div className="text-center transform scale-90 group-hover:scale-100 transition-transform duration-500">
                    <div className={`w-14 h-14 rounded-2xl ${ex.accent} text-white flex items-center justify-center mx-auto mb-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20`}>
                      <BookOpen size={24} />
                    </div>
                    <div className="relative inline-block">
                       <p className="text-[11px] font-black uppercase tracking-[0.4em] text-white">View Project</p>
                       <div className="absolute -bottom-2 inset-x-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card info */}
              <div className="p-6 border-t border-white/5 bg-zinc-950">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-black text-white uppercase tracking-tight text-[13px] group-hover:text-orange-500 transition-colors">{ex.niche}</h4>
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500/30 group-hover:bg-orange-500 transition-colors animate-pulse" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {ex.tags.map((tag, j) => (
                    <span key={j} className="text-[8px] font-bold uppercase tracking-widest text-zinc-500 border border-white/5 group-hover:border-orange-500/20 px-2 rounded-lg transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Want to see more of our design work?</p>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 bg-zinc-950 hover:bg-orange-500 transition-all duration-500 text-white font-black text-[12px] uppercase tracking-[0.2em] px-10 py-5 rounded-full no-underline shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-orange-500/20"
          >
            View Portfolio
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   07 — WHO THIS IS FOR
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
      icon: <Fingerprint size={18} />,
      label: "COMMODITY TRAP",
      status: "PRICE WAR",
      statusColor: "text-red-500 bg-red-500/10 border-red-500/20",
      headline: "The Amazon Commodity: You're just a row in a search result.",
      subline: "Authority diagnostic.",
      body: "If your brand doesn't have a soul, you're competing on price alone. Shoppers see a product, not a partner. We use the Brand Story module to inject your mission and heritage directly into the listing, instantly differentiating you from the factory-direct flood.",
      symptoms: [
        "Shoppers frequently ask questions that your brand mission should answer",
        "High advertising cost of sales (ACOS) due to zero brand recall",
        "Market share is easily stolen by lower-priced generic alternatives",
      ],
      accentGradient: "from-red-500/80 to-orange-500/80",
    },
    {
      index: "02",
      icon: <Users size={18} />,
      label: "TRUST DEFICIT",
      status: "CREDIBILITY GAP",
      statusColor: "text-orange-500 bg-orange-500/10 border-orange-500/20",
      headline: "The Ghost Brand: Shoppers don't know who you are.",
      subline: "Connection analysis.",
      body: "Anonymous buying is the default on Amazon. Without a 'Meet the Founder' or 'Our Mission' module, you're a stranger. We build the emotional bridge that turns a skeptical browser into a loyal advocate by humanizing your operations.",
      symptoms: [
        "Low repeat purchase rate compared to category averages",
        "Zero engagement on social media or off-Amazon channels",
        "Brand name searches are stagnant or non-existent",
      ],
      featured: true,
      accentGradient: "from-orange-500 to-amber-500",
    },
    {
      index: "03",
      icon: <Zap size={18} />,
      label: "CONVERSION LEAK",
      status: "REVENUE DRAIN",
      statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      headline: "The Empty Real Estate: Wasting the top-tier A+ placement.",
      subline: "Placement x-ray.",
      body: "The Brand Story module sits ABOVE your regular A+ content. Leaving it empty is like owning a billboard and not putting a poster on it. We architect high-converting card modules that drive shoppers deeper into your catalog before they even scroll.",
      symptoms: [
        "High bounce rate on product detail pages (PDPs)",
        "Shoppers leave your listing to 'see similar products' from competitors",
        "Underutilized cross-selling opportunities across your ASIN catalog",
      ],
      accentGradient: "from-emerald-500/80 to-teal-500/80",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 relative z-10">
        <div className="mb-12 lg:mb-20">
          <SectionLabel>Story Diagnostic</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 mt-4">
            <h2
              className="text-3xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              The symptoms<br />
              of a silent brand.
            </h2>
            <p className="text-zinc-500 text-sm lg:text-base font-light leading-relaxed max-w-md lg:text-right">
              If your listings feel anonymous, your conversion rate is capped. Identify the gaps in your narrative before they turn into permanent market erosion.
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
                    [STORY_SCAN_{s.index}]
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
                          STORY_SIGNAL: {s.subline.toUpperCase()}
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
                              NARRATIVE_SYMPTOMS
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
                <p className="text-[9px] lg:text-[11px] font-black uppercase tracking-[0.35em] lg:tracking-[0.4em] text-orange-500 mb-1.5">Standardize Your Narrative</p>
                <p className="text-zinc-400 text-[13px] lg:text-base font-light leading-relaxed max-w-lg">
                  Stop being a commodity. Our Brand Story architecture provides the emotional framework for 100% aesthetic consistency and catalog cross-selling.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-white text-zinc-950 w-full md:w-auto px-6 lg:px-10 py-3.5 lg:py-5 rounded-full text-[10px] lg:text-[12px] font-black uppercase tracking-[0.2em] lg:tracking-[0.25em] hover:bg-orange-500 hover:text-white hover:shadow-[0_20px_50px_rgba(249,115,22,0.3)] transition-all duration-500 shrink-0 active:scale-[0.97] no-underline"
            >
              Get Free Story Audit
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

/* ═══════════════════════════════════════════════
   08 — FAQ
   ═══════════════════════════════════════════════ */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: "What do you need from me to get started?",                   a: "We need your high-resolution brand assets (logo, fonts, color codes), product photography or access to your Amazon listing images, and a completed brand questionnaire. We handle all the copywriting and strategic module design." },
    { q: "How do I add the Brand Story to my Amazon listings?",        a: "Brand Story is added through Seller Central via the A+ Content Manager. Once our design is complete, we provide all Amazon-compliant files plus a step-by-step upload guide so you or your team can go live immediately." },
    { q: "Do I get to approve the design before it goes live?",        a: "Absolutely. We work through a structured review process — you see the design before any files are finalized. You can provide feedback on the storytelling flow, visual style, and module content before we deliver the final assets." },
    { q: "How many modules and cards are included?",                   a: "Our package includes the main hero background module plus up to 4 custom product cards — typically an About Us, a catalog highlight, a bestseller spotlight, and a brand mission card. Additional modules can be added." },
    { q: "Will the Brand Story replace my product description or A+?", a: "No. The Brand Story is its own distinct section that appears above your product description and A+ Content. It's additional premium real estate, not a replacement — which means your listings gain a completely new conversion layer." },
    { q: "Do I need Brand Registry to use Brand Story?",               a: "Yes. Amazon Brand Story is exclusively available to Brand Registry members. If you haven't enrolled yet, we can advise on the requirements — and once you're approved, we can typically have your Brand Story live within 7 days." },
    { q: "How long does the whole process take?",                      a: "From receiving your brand assets to delivering the final upload-ready files, our standard turnaround is 7 days. Rush projects can be accommodated — contact us to discuss timelines." },
  ];

  return (
    <section className="py-20 md:py-32 bg-white border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>FAQ</SectionLabel>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.88] mb-6 md:mb-10 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              FREQUENTLY<br />
              <span
                className="italic font-light lowercase tracking-normal text-zinc-300"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                asked.
              </span>
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-md mb-8 md:mb-12">
              Everything you need to know about professional Amazon Brand Story design before getting started.
            </p>
            <div className="p-6 bg-[#fafafa] rounded-3xl border border-zinc-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Still Have Questions?</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Every brand is different. If your situation isn't covered here, our team will answer any question directly.
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
                    ? "bg-[#fafafa] border-orange-500/30 shadow-xl shadow-orange-500/5"
                    : "bg-white border-zinc-100 hover:border-zinc-200"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-6 sm:px-8 py-5 sm:py-6 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className={`text-[9px] sm:text-[10px] font-mono transition-colors shrink-0 ${openIndex === i ? "text-orange-500" : "text-zinc-300"}`}>
                      0{i + 1}
                    </span>
                    <span className="text-sm sm:text-[14px] font-bold text-zinc-900 tracking-tight leading-snug">{faq.q}</span>
                  </div>
                  <div className={`shrink-0 w-8 h-8 ml-4 rounded-full flex items-center justify-center transition-all duration-500 ${
                    openIndex === i ? "bg-orange-500 text-white rotate-180" : "bg-zinc-100 text-zinc-400"
                  }`}>
                    {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                <div
                  className="transition-all duration-500 ease-in-out overflow-hidden"
                  style={{ maxHeight: openIndex === i ? "500px" : "0", opacity: openIndex === i ? 1 : 0 }}
                >
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 sm:ml-10">
                    <div className="text-[13px] sm:text-[14px] text-zinc-500 leading-relaxed font-light border-l-2 border-orange-500/20 pl-5 sm:pl-6">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-5 px-6 sm:px-8 py-6 bg-zinc-900 rounded-[32px] text-white text-center sm:text-left">
              <div className="flex items-center gap-4">
                <Terminal size={16} className="text-orange-500" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold">More_Questions?</span>
              </div>
              <Link href="/contact" className="flex items-center gap-2 group no-underline w-full sm:w-auto justify-center sm:justify-start">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">Contact Us Directly</span>
                <ChevronRight size={14} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



/* ═══════════════════════════════════════════════
   BRAND STORY CTA
   ═══════════════════════════════════════════════ */
const StoryCTAButton = ({ href = "/contact", children }) => (
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

function BrandStoryCTA() {
  return (
    <div className="w-full bg-[#fafafa]">
      <section className="px-0 md:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-[#0a0a0a] rounded-none md:rounded-[40px] py-14 px-8 lg:px-20 text-left relative overflow-hidden border-y md:border border-white/5 group shadow-none">

            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />

            {/* Background Large Icon Decor */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.05] translate-x-1/4">
              <Feather size={600} strokeWidth={0.2} className="text-orange-500" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column: Content */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-white font-bold text-[9px] uppercase tracking-[0.4em]">Narrative Capacity: Open</span>
                </div>

                <h2
                  className="text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-[0.9] text-white uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Stop selling commodities.<br />
                  <span className="italic font-light block mt-2 tracking-normal text-orange-500 lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                    build a connection.
                  </span>
                </h2>

                <p className="text-zinc-400 font-light mb-10 text-base lg:text-lg leading-relaxed max-w-xl">
                  Without a compelling narrative, you're just another brand competing on price. Book a **15-minute Story Discovery** to unearth the core narrative that turns casual buyers into loyal advocates.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-16">
                  <StoryCTAButton href="/get-started">
                    Get Free Strategy Call
                  </StoryCTAButton>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Authentic Messaging</span>
                  </div>
                </div>

                {/* Bottom Row Points */}
                <div className="pt-8 border-t border-white/5 flex flex-wrap items-center gap-x-10 gap-y-3">
                  {[
                    "Origin Story Mapping",
                    "Core Values & Mission",
                    "Brand Voice & Tone"
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
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-5 sm:p-8 shadow-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-500">

                  {/* Card Glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  {/* Header */}
                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[8px] font-mono text-orange-500/80 uppercase tracking-widest">Session: Story Arc</span>
                      </div>
                      <h4 className="text-2xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>Narrative</h4>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-inner">
                      <BookOpen size={22} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Steps with Timeline spacing */}
                  <div className="space-y-0 relative z-10 before:absolute before:inset-y-3 before:left-[19px] before:w-[2px] before:bg-white/10">
                    {[
                      { icon: <Lightbulb size={16} />, title: "1. Core Extraction", desc: "Uncover the authentic 'why' behind your brand's existence." },
                      { icon: <MessageSquare size={16} />, title: "2. Voice Alignment", desc: "Define the exact tone that resonates with your target audience." },
                      { icon: <PenTool size={16} />, title: "3. Story Playbook", desc: "A cohesive narrative framework ready to deploy across all channels.", active: true }
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

                  {/* Meeting Context Footer */}
                  <div className="mt-10 bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 relative z-10 backdrop-blur-md">
                    <div className="flex items-center gap-3 sm:gap-4">
                       <div className="w-10 h-10 shrink-0 rounded-full border border-white/10 bg-zinc-800 flex items-center justify-center text-zinc-400">
                         <Users size={16} />
                       </div>
                       <div>
                         <p className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-widest mb-0.5 leading-tight">Strategy Session</p>
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


/* ═══════════════════════════════════════════════
   FOOTER NAV
   ═══════════════════════════════════════════════ */
function FooterNav() {
  return (
    <footer className="py-24 bg-white border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Previous Design Service</p>
          <Link href="/service/design/brand-guidelines" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start uppercase">
              <ArrowRight className="mr-3 group-hover:-translate-x-3 transition-transform rotate-180 size-5 md:size-8 shrink-0" />
              Brand Guidelines
            </h4>
          </Link>
        </div>
        <div className="hidden md:block w-px h-16 bg-zinc-100" />
        <div className="text-center md:text-right w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Design Service</p>
          <Link href="/service/design/brand-store" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end uppercase">
              Brand Store
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

/* ═══════════════════════════════════════════════
   MAIN PAGE EXPORT
   ═══════════════════════════════════════════════ */
export default function BrandStoryPage() {
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <BrandStoryHero />
      <MetricsStrip />
      <WhyBrandStory />
      <EngageAndConvert />
      <WhatIsIncluded />
      <ExamplesGallery />
      <ClientProof />
      <WhoItsFor />
      <FAQ />
      <BrandStoryCTA />
      <FooterNav />
    </div>
  );
}