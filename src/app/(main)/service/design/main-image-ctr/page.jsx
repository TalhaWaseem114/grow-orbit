"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Zap, Star,
  Award, Package, ChevronRight, Plus, Minus, Terminal,
  Layers, Paintbrush, Activity, Eye, Target, BarChart3, Sparkles,
  Camera, Maximize2, MousePointerClick, Search, Frame,
  AlertTriangle, Quote, Focus, Users, LayoutGrid, FileText
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

const CheckItem = ({ children, light = false }) => (
  <div className="flex items-start gap-3">
    <CheckCircle2 size={15} className="text-orange-500 shrink-0 mt-0.5" />
    <span className={`text-[14px] font-light leading-snug ${light ? "text-zinc-300" : "text-zinc-600"}`}>
      {children}
    </span>
  </div>
);

/* ═══════════════════════════════════════════════
   01 — HERO
   ═══════════════════════════════════════════════ */
function MainImageHero() {

  const floatRef = useRef(null);

  useEffect(() => {
    if (!floatRef.current) return;
    gsap.to(floatRef.current, {
      y: -14, duration: 4.5, repeat: -1, yoyo: true, ease: "power1.inOut",
    });
  }, []);

  const searchGrid = [
    { yours: false, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop" }, // Shoe
    { yours: true,  img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop" }, // Watch (Yours)
    { yours: false, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop" }, // Headphone
    { yours: false, img: "https://images.unsplash.com/photo-1526170315870-ef68971f21f3?q=80&w=400&auto=format&fit=crop" }, // Camera
    { yours: false, img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=400&auto=format&fit=crop" }, // Shoe 2
    { yours: false, img: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=400&auto=format&fit=crop" }, // Headphone 2
  ];

  const comparisons = [
    { before: "Phone photo, flat angle",     after: "Studio-grade, hero angle"      },
    { before: "Product fills 60% of frame",  after: "Fills 92% — nothing wasted"   },
    { before: "Dull colors, no depth",       after: "Graded, shadow-grounded, pops" },
    { before: "Identical to competitors",    after: "Visually unique in search grid" },
  ];

  return (
    <section className="relative pt-6 pb-0 lg:pt-[101px] lg:pb-40 overflow-hidden bg-white">
      <style>{`
        @keyframes scan-ctr {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes card-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(249,115,22,0); }
          50%     { box-shadow: 0 0 0 8px rgba(249,115,22,0.2); }
        }
        @keyframes badge-float {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-4px); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); opacity: 0.3; }
          50%     { transform: translateY(-20px); opacity: 0.8; }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent animate-[scan-ctr_11s_linear_infinite]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="ctr-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
            <circle cx="60" cy="60" r="0.5" fill="currentColor" opacity="0.5" />
            <path d="M120 0 L120 120 M0 120 L120 120" stroke="currentColor" strokeWidth="0.2" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#ctr-grid)" />
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
                  Design & Creative Services
                </span>
              </div>

              {/* H1 */}
              <h1
                className="text-4xl sm:text-5xl lg:text-[85px] font-black tracking-tighter leading-[0.85] mb-4 text-zinc-900 uppercase"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Main Image<br />
                <span className="text-orange-500">CTR</span><br />
                <span
                  className="italic font-light lowercase tracking-tight text-zinc-300"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  optimization.
                </span>
              </h1>

              {/* Description */}
              <div className="flex gap-6 mb-6">
                <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50" />
                <div>
                  <p className="text-lg text-zinc-500 font-light leading-relaxed max-w-xl mb-4">
                    Your main image is the only asset that wins clicks from Amazon search. We design scroll-stopping hero shots engineered for maximum click-through rate — built to dominate your category's search grid.
                  </p>
                  <p className="text-zinc-900 font-bold text-sm leading-relaxed max-w-xl mb-4 border-l-2 border-orange-500 pl-4 py-1 italic">
                    "Your main image wins or loses the click in 1.3 seconds — before the visitor reads a single word of your listing."
                  </p>
                  <div className="flex flex-wrap gap-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Amazon TOS Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MousePointerClick size={10} className="text-orange-500/50" />
                      <span>CTR-First Design</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  "Pure white background hero optimization",
                  "Thumbnail-first design at 85×85px",
                  "Category-specific competitor analysis",
                  "Split-tested variants for A/B testing",
                ].map((item, i) => <CheckItem key={i}>{item}</CheckItem>)}
              </div>

              {/* Social Proof Line */}
              <div className="mb-6 flex items-center gap-2">
                <div className="flex text-amber-500">
                  <Star size={10} fill="currentColor" />
                  <Star size={10} fill="currentColor" />
                  <Star size={10} fill="currentColor" />
                  <Star size={10} fill="currentColor" />
                  <Star size={10} fill="currentColor" />
                </div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.1em]">
                  "CTR went from <span className="text-orange-500">0.4% to 1.1%</span> in 14 days."
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                <HeroButton href="/contact">
                  Optimize My Main Image
                </HeroButton>
                <a
                  href="#packages"
                  className="group flex items-center justify-center sm:justify-start gap-3 text-zinc-500 hover:text-zinc-900 font-bold text-[11px] uppercase tracking-widest px-2 py-4 transition-colors no-underline"
                >
                  See Packages
                  <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { icon: <ShieldCheck size={11} />,      label: "Amazon TOS Compliant" },
                  { icon: <Maximize2 size={11} />,        label: "Thumbnail Validated"   },
                  { icon: <Zap size={11} />,              label: "5–7 Day Turnaround"    },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2">
                    <span className="text-orange-500">{b.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{b.label}</span>
                  </div>
                ))}
              </div>

              {/* Social proof strip (Hidden on mobile) */}
              <div className="hidden sm:flex items-center gap-8 mt-10 pt-10 border-t border-zinc-100">
                {[
                  { label: "Images Designed", val: "3,500+" },
                  { label: "Avg CTR Lift",      val: "+40%" },
                  { label: "Brands Served",     val: "80+" },
                ].map((t, i) => (
                  <div key={i} className="text-left">
                    <p className="text-2xl font-black tracking-tighter text-zinc-900">{t.val}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: CTR Design Studio ── */}
          <div className="lg:col-span-5 relative hidden lg:block self-start lg:mt-[70px]" ref={floatRef}>

            {/* Deep ambient glow */}
            <div className="absolute -inset-20 pointer-events-none">
              <div className="absolute top-0 right-10 w-[400px] h-[400px] bg-orange-500/[0.12] rounded-full blur-[120px]" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-400/[0.06] rounded-full blur-[100px]" />
            </div>

            {/* ─── Layer 1: Product Canvas (White, front) ─── */}
            <div className="relative z-30 bg-white rounded-[36px] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.12)] border border-zinc-100 overflow-hidden max-w-[460px] mx-auto lg:ml-auto">

              {/* Studio Toolbar */}
              <div className="px-5 py-3 bg-[#fafafa] border-b border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                  </div>
                  <div className="w-px h-3 bg-zinc-200" />
                  <span className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-[0.2em]">CTR Studio Pro</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[7px] font-black text-emerald-600 uppercase tracking-widest">Analyzing</span>
                  </div>
                </div>
              </div>

              {/* Product Canvas Area */}
              <div className="relative p-6">
                {/* Scan Line Animation */}
                <div className="absolute inset-x-6 top-6 bottom-6 overflow-hidden rounded-2xl pointer-events-none z-20">
                  <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-60 animate-[scan-ctr_3s_linear_infinite]" />
                </div>

                {/* The Hero Product Image */}
                <div className="relative bg-gradient-to-br from-zinc-50 to-white rounded-2xl border border-zinc-100 aspect-square flex items-center justify-center overflow-hidden max-h-[320px] mx-auto">
                  <img
                    src={searchGrid.find(s => s.yours)?.img}
                    className="w-3/4 h-3/4 object-contain drop-shadow-2xl"
                    alt="Hero product being optimized"
                  />

                  {/* Corner scan markers */}
                  <div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-orange-500/40 rounded-tl-lg" />
                  <div className="absolute top-3 right-3 w-5 h-5 border-r-2 border-t-2 border-orange-500/40 rounded-tr-lg" />
                  <div className="absolute bottom-3 left-3 w-5 h-5 border-l-2 border-b-2 border-orange-500/40 rounded-bl-lg" />
                  <div className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 border-orange-500/40 rounded-br-lg" />

                  {/* Fill percentage badge */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur-md text-white px-6 py-2.5 rounded-full flex items-center gap-3 shadow-2xl border border-white/10 w-max whitespace-nowrap z-30">
                    <Frame size={12} className="text-orange-400 shrink-0" />
                    <span className="text-[9px] font-black uppercase tracking-[0.25em] whitespace-nowrap">92% Frame Fill</span>
                    <div className="w-px h-3 bg-white/20 shrink-0" />
                    <span className="text-[9px] font-black text-emerald-400 whitespace-nowrap">Optimal</span>
                  </div>
                </div>

                {/* Bottom metrics row */}
                <div className="grid grid-cols-3 gap-2.5 mt-4">
                  {[
                    { label: "CTR Score", val: "9.4", sub: "/10", color: "text-orange-500" },
                    { label: "Thumb Test", val: "Pass", sub: "85px", color: "text-emerald-500" },
                    { label: "Contrast", val: "AAA", sub: "WCAG", color: "text-violet-500" },
                  ].map((m, i) => (
                    <div key={i} className="bg-zinc-50 rounded-xl px-3 py-2.5 border border-zinc-100 text-center">
                      <p className="text-[7px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1">{m.label}</p>
                      <div className="flex items-baseline justify-center gap-0.5">
                        <span className={`text-lg font-black tracking-tighter ${m.color}`}>{m.val}</span>
                        <span className="text-[8px] font-bold text-zinc-400">{m.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── Layer 2: Conversion Diagnostic (Dark, overlapping bottom-right) ─── */}
            <div className="absolute bottom-[-30px] right-[-15px] lg:right-[-30px] z-40 w-[240px] bg-zinc-950 rounded-[28px] p-5 border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[7px] font-mono font-bold text-zinc-600 uppercase tracking-[0.3em] mb-1">Conversion Lift</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-white tracking-tighter leading-none">+40%</span>
                    <span className="text-[9px] font-black text-emerald-400 uppercase">↑ Avg</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <TrendingUp size={16} className="text-orange-500" />
                </div>
              </div>

              {/* Mini bar chart */}
              <div className="flex items-end gap-1.5 h-10 mb-4">
                {[25, 40, 30, 55, 45, 70, 85, 100].map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-sm transition-all ${i >= 6 ? "bg-gradient-to-t from-orange-500 to-amber-400" : "bg-white/10"}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Live tracking</span>
                </div>
                <span className="text-[8px] font-black text-orange-400 uppercase tracking-wider">2.4x Reach</span>
              </div>
            </div>

            {/* ─── Layer 3: Search Grid Dominance (floating top-left) ─── */}
            <div className="absolute top-[-20px] left-[-50px] lg:left-[-80px] z-40 bg-white rounded-[20px] p-3.5 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.1)] border border-zinc-100 w-[150px]">
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-5 h-5 rounded-md bg-orange-500 flex items-center justify-center">
                  <Search size={9} className="text-white" />
                </div>
                <span className="text-[7px] font-black text-zinc-500 uppercase tracking-widest">Grid Position</span>
              </div>

              {/* Mini 3x2 grid */}
              <div className="grid grid-cols-3 gap-1 mb-2.5">
                {searchGrid.slice(0, 6).map((item, i) => (
                  <div
                    key={i}
                    className={`relative aspect-square rounded-md overflow-hidden ${
                      item.yours
                        ? "ring-2 ring-orange-500 shadow-[0_4px_12px_rgba(249,115,22,0.3)]"
                        : "opacity-25 grayscale"
                    }`}
                  >
                    <Image
                      src={item.img}
                      alt="Competitor Search Result Comparison"
                      fill
                      priority={i === 1 && item.yours}
                      className="object-cover"
                      sizes="50px"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[7px] font-bold text-zinc-400 uppercase tracking-wider">Visibility</span>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[8px] font-black text-emerald-600 uppercase">#1 Click</span>
                </div>
              </div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-orange-500/25 rounded-full"
                  style={{
                    top: `${15 + Math.random() * 70}%`,
                    left: `${10 + Math.random() * 80}%`,
                    animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 3}s`
                  }}
                />
              ))}
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
    { v: "3,500+",  l: "Images Designed",      i: <Camera size={14} />           },
    { v: "+40%",    l: "Avg CTR Lift",         i: <TrendingUp size={14} />        },
    { v: "80+",     l: "Brands Served",        i: <Users size={14} />             },
    { v: "5",       l: "Day Turnaround",       i: <Zap size={14} />               },
  ];

  return (
    <div className="bg-zinc-900 pt-16 pb-6 md:py-12 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-8 lg:gap-8">
          {stats.map((s, i) => (
            <div key={i} className="group relative flex flex-col border-l border-zinc-800/50 pl-6 sm:pl-8 transition-all duration-500 hover:border-orange-500/40">
              <div className="absolute top-0 left-[-1.5px] w-[3px] h-[3px] bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-orange-500/70 mb-3 group-hover:text-orange-400 transition-colors">{s.i}</div>
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tighter">{s.v}</span>
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mt-1">[ {s.l} ]</span>
            </div>
          ))}
          <Link href="/contact" className="group relative flex flex-col items-center text-center lg:items-start lg:text-left border-t lg:border-t-0 lg:border-l border-white/10 lg:border-orange-500/20 px-6 sm:px-8 pt-8 pb-4 lg:py-0 transition-all duration-500 hover:bg-orange-500/[0.02] no-underline col-span-2 lg:col-span-1 mt-8 lg:mt-0">
            <div className="relative w-full flex items-center justify-center lg:justify-start mb-2">
              <span className="text-xl sm:text-lg font-black text-white uppercase tracking-tighter leading-tight group-hover:text-orange-400 transition-colors">Get Started</span>
              <ArrowRight size={16} className="absolute right-0 lg:static lg:ml-3 text-orange-500 group-hover:translate-x-2 transition-transform shrink-0" />
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">CTR_SLOTS_OPEN</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   03 — WHY CTR MATTERS
   ═══════════════════════════════════════════════ */
function WhyCTRMatters() {
  const reasons = [
    { icon: <MousePointerClick size={22} />, stat: "+40%",  statLabel: "avg CTR lift",    title: "Win the Click in Search",         desc: "Your main image is the ONLY visual shoppers see in search results. A professional, optimized hero shot is the difference between a click and a scroll-past." },
    { icon: <Search size={22} />,            stat: "85px",  statLabel: "thumbnail test",  title: "Thumbnail-First Design",          desc: "Most shoppers browse on mobile where your image shrinks to 85×85px. We design for the thumbnail first, then scale up — not the other way around." },
    { icon: <Eye size={22} />,               stat: "1.3s",  statLabel: "decision window", title: "Stop the Scroll",                 desc: "Amazon shoppers decide in 1.3 seconds whether to click. Your hero image needs to communicate value, quality, and differentiation instantly." },
    { icon: <BarChart3 size={22} />,         stat: "2x",    statLabel: "organic reach",   title: "Double Your Organic Traffic",     desc: "Higher CTR means more clicks from the same impressions. Amazon's algorithm rewards high-CTR listings with better organic placement — compounding results." },
    { icon: <ShieldCheck size={22} />,       stat: "100%",  statLabel: "TOS compliant",   title: "Amazon Compliant Design",         desc: "Pure white background, no text overlays, no badges. We maximize visual impact within Amazon's strict main image guidelines — zero suppression risk." },
    { icon: <TrendingUp size={22} />,        stat: "+15%",  statLabel: "CVR boost",       title: "First Impression = Conversion",   desc: "A strong main image sets quality expectations from the start. When shoppers click expecting a premium product, they convert at higher rates." },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>The Science</SectionLabel>
            <h2
              className="text-5xl md:text-[80px] font-black tracking-tighter uppercase leading-[0.82] mb-6 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Why your main<br />image decides<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                everything.
              </span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-8">
              Your main image is responsible for 80% of your listing's click-through rate. If you're not winning clicks from search, nothing else in your listing matters.
            </p>
            <Link href="/contact" className="group flex items-center gap-3 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
              Optimize my main image
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <div key={i} className="group bg-[#fafafa] hover:bg-white rounded-[28px] p-7 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/50">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500 shrink-0">
                    {r.icon}
                  </div>
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
   04 — BEFORE / AFTER SHOWCASE
   ═══════════════════════════════════════════════ */
function BeforeAfterShowcase() {
  const transformations = [
    {
      niche: "Electronics & Tech",
      tag: "Smartwatch Angle",
      before: { label: "Standard flat angle", note: "Supplier stock photo", img: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=400&auto=format&fit=crop" },
      after:  { label: "High-CTR hero angle", note: "+42% CTR lift", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop" },
      accentB: "bg-zinc-100",
      accentA: "bg-orange-50",
      icon: <Sparkles size={20} />,
    },
    {
      niche: "Home & Kitchen",
      tag: "Product Styling",
      before: { label: "Unlit product shot", note: "Blends into background", img: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=400&auto=format&fit=crop" },
      after:  { label: "Prop-styled hero", note: "2.3x search clicks", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=400&auto=format&fit=crop" },
      accentB: "bg-zinc-100",
      accentA: "bg-orange-50",
      icon: <Camera size={20} />,
    },
    {
      niche: "Health & Supplements",
      tag: "Bottle Rendering",
      before: { label: "Low-fill composition", note: "Unclear branding", img: "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=400&auto=format&fit=crop" },
      after:  { label: "Premium label depth", note: "+34% CTR boost", img: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=400&auto=format&fit=crop" },
      accentB: "bg-zinc-100",
      accentA: "bg-orange-50",
      icon: <TrendingUp size={20} />,
    },
    {
      niche: "Pet Products",
      tag: "Lifestyle Hero",
      before: { label: "Basic phone photo", note: "Lacks quality trust", img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=400&auto=format&fit=crop" },
      after:  { label: "Professional lifestyle", note: "3.8x ROAS growth", img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=400&auto=format&fit=crop" },
      accentB: "bg-zinc-100",
      accentA: "bg-orange-50",
      icon: <Eye size={20} />,
    },
  ];

  return (
    <section className="py-24 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="mb-16">
          <SectionLabel>Real Results</SectionLabel>
          <h2
            className="text-5xl md:text-[80px] font-black tracking-tighter uppercase leading-[0.82] mb-6 text-zinc-900"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Click through rate:<br />
            <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
              making every click count.
            </span>
          </h2>
          <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-2xl">
            These aren't mock-ups. These are real transformations across product categories — same listings, same keywords, same ad spend. Only the main image changed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {transformations.map((t, i) => (
            <Link
              key={i}
              href="/portfolio?filter=Main Image CTR"
              className="group bg-white rounded-[32px] border border-zinc-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.1)] hover:border-orange-500/20 transition-all duration-500 overflow-hidden no-underline block"
            >
              {/* Header */}
              <div className="px-7 pt-7 pb-5 border-b border-zinc-50 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono font-bold text-orange-500 uppercase tracking-[0.3em]">{t.tag}</span>
                  <h4 className="font-black text-[14px] uppercase tracking-tight text-zinc-900 mt-0.5 group-hover:text-orange-500 transition-colors">{t.niche}</h4>
                </div>
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500 shrink-0">
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
                  <div className="aspect-square mb-4 relative overflow-hidden rounded-2xl border border-zinc-100 shadow-sm">
                    <img src={t.before.img} className="w-full h-full object-cover" alt="Before" />
                    <div className="absolute top-2 left-2 bg-red-100 text-red-500 text-[7px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">Before</div>
                  </div>
                  <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-wide mb-1">{t.before.label}</p>
                  <p className="text-[10px] text-red-500/70 font-light">{t.before.note}</p>
                </div>
                {/* After */}
                <div className="p-3.5">
                  <div className="aspect-square mb-4 relative overflow-hidden rounded-2xl border border-orange-100 shadow-sm">
                    <img src={t.after.img} className="w-full h-full object-cover" alt="After" />
                    <div className="absolute top-2 left-2 bg-orange-500 text-white text-[7px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full z-10">After</div>

                    {/* Results Badge Overlay */}
                    <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-md border border-orange-500/30 px-2 py-1 rounded-lg shadow-lg z-20 flex items-center gap-1.5 group-hover:scale-105 transition-transform">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                      <span className="text-[8px] font-black text-orange-500 uppercase tracking-tighter leading-none">{t.after.note}</span>
                    </div>

                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-orange-500/20 rounded-full blur-xl" />
                  </div>
                  <p className="text-[11px] font-bold text-zinc-900 uppercase tracking-wide mb-1">{t.after.label}</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={10} className="text-emerald-500" />
                    <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest leading-none mt-0.5">Performance Verified</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-zinc-400 text-sm font-light mb-6">Results vary. Average CTR improvement across 3,500+ images designed: 40%.</p>
          <Link
            href="/portfolio?filter=Main Image CTR"
            className="inline-flex items-center gap-3 bg-black hover:bg-orange-500 transition-all duration-300 text-white font-black text-[11px] uppercase tracking-widest px-8 py-4 rounded-full no-underline"
          >
            See More CTR Results
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   05 — WHAT MAKES A WINNING MAIN IMAGE (dark)
   ═══════════════════════════════════════════════ */
function WinningMainImage() {
  const elements = [
    { tag: "ANGLE",  label: "Strategic Product Angle",      desc: "We select the exact angle that maximizes visual appeal, shows key features, and creates the strongest silhouette at thumbnail size." },
    { tag: "SCALE",  label: "Proportional Scaling",         desc: "Your product should fill 85–95% of the frame. Too small and it disappears in search. Too large and it looks cramped." },
    { tag: "SHADOW", label: "Contact Shadow & Depth",       desc: "A subtle natural shadow grounds the product in 3D — making your listing pop against flat, shadowless competitor images." },
    { tag: "COLOR",  label: "Color Correction & Grading",   desc: "True-to-life colors that POP on screen. We enhance saturation and contrast within Amazon's guidelines." },
    { tag: "DETAIL", label: "Texture & Detail Enhancement", desc: "We enhance every surface detail — fabric weaves, metal finishes, ingredient textures — so shoppers feel the quality." },
    { tag: "TEST",   label: "Thumbnail Validation",         desc: "Every design validated at 85×85px, 150×150px, and full-size. If it doesn't pass the thumbnail test, it doesn't ship. Period." },
  ];

  return (
    <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-500/[0.08] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-orange-500/[0.04] blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <SectionLabel light>The Formula</SectionLabel>
            <h2
              className="text-5xl md:text-[80px] font-black tracking-tighter uppercase leading-[0.82]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              What makes a main<br />image{" "}
              <span className="italic font-light text-zinc-500 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                click-worthy.
              </span>
            </h2>
          </div>
          <p className="text-zinc-400 font-light max-w-sm text-sm leading-relaxed pb-2">
            Every element of your main image is engineered for one goal: winning the click in Amazon search.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {elements.map((m, i) => (
            <div key={i} className="group bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-orange-500/30 rounded-[28px] p-7 transition-all duration-500">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[8px] font-mono font-bold text-orange-500 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-full uppercase tracking-widest">{m.tag}</span>
                <div className="h-px flex-1 bg-white/5 group-hover:bg-orange-500/20 transition-colors" />
              </div>
              <h4 className="text-[13px] font-black uppercase tracking-[0.12em] text-white mb-3 group-hover:text-orange-400 transition-colors">{m.label}</h4>
              <p className="text-zinc-500 text-xs font-light leading-relaxed group-hover:text-zinc-400 transition-colors">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Cost/Benefit split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-[32px] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle size={16} className="text-red-400" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400">Cost of a Bad Main Image</span>
            </div>
            <div className="space-y-3">
              {[
                "Every impression without a click is wasted ad spend",
                "Low CTR directly suppresses your organic ranking",
                "Shoppers never see your great content, price, or reviews",
                "Competitors win sales you deserved to close",
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500/60 shrink-0 mt-1.5" />
                  <span className="text-sm font-light text-zinc-500">{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-500/[0.06] border border-orange-500/20 rounded-[32px] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center shrink-0">
                <TrendingUp size={16} className="text-orange-400" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Result of a Great Main Image</span>
            </div>
            <div className="space-y-3">
              {[
                "More clicks from the same impressions — free extra traffic",
                "Higher CTR signals quality to Amazon's A9/A10 algorithm",
                "PPC costs drop as Quality Score improves",
                "Compounding organic rank gains week over week",
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                  <span className="text-sm font-light text-zinc-400">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-flex items-center gap-4 px-6 sm:px-10 py-5 bg-orange-500 text-white rounded-2xl font-black text-[10px] sm:text-[11px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 shadow-[0_15px_40px_rgba(249,115,22,0.3)] no-underline whitespace-nowrap"
          >
            Get My Main Image Designed
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   06 — WHAT'S INCLUDED
   ═══════════════════════════════════════════════ */
function WhatsIncluded() {
  const deliverables = [
    { icon: <Camera size={20} />,       title: "Hero Shot Design",      desc: "Professional main image design from your product photos or 3D renders — angle-optimized and background-perfect." },
    { icon: <Search size={20} />,       title: "Competitor Analysis",   desc: "We analyze the top 20 search results in your category to ensure your main image stands out in the exact grid you compete in." },
    { icon: <Maximize2 size={20} />,    title: "Thumbnail Testing",     desc: "Every design validated at 85×85px, 150×150px, and full-size to guarantee performance across all devices." },
    { icon: <Paintbrush size={20} />,   title: "Color Correction",      desc: "True-to-life color grading that makes your product pop on screen while accurately representing the physical product." },
    { icon: <Frame size={20} />,        title: "Background Perfection", desc: "Pure white (#FFFFFF) meeting Amazon's strict requirements — no gray tones, no clipping shadows on white." },
    { icon: <CheckCircle2 size={20} />, title: "Upload-Ready Files",    desc: "2000×2000px minimum, JPEG, sRGB — every technical spec handled so you can upload immediately after delivery." },
  ];

  return (
    <section className="py-24 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <div className="lg:sticky lg:top-24">
            <SectionLabel>What You Get</SectionLabel>
            <h2
              className="text-5xl md:text-[80px] font-black tracking-tighter uppercase leading-[0.82] mb-6 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Everything in<br />your CTR<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                package.
              </span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-8">
              One complete package covers competitor analysis, hero shot design, thumbnail testing, and upload-ready delivery.
            </p>

            <div className="bg-zinc-950 rounded-[28px] p-6 border border-white/5">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-orange-400">How It Works</span>
              </div>
              <div className="space-y-4">
                {[
                  "Send us your product photos or samples",
                  "We analyze your category's top search results",
                  "Design, optimize & thumbnail-test your hero shot",
                  "Upload-ready main image delivered in 5–7 days",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[9px] font-mono font-black text-orange-500 shrink-0 mt-0.5">0{i + 1}</span>
                    <span className="text-zinc-400 text-[13px] font-light leading-snug">{step}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-white/5">
                <Link href="/contact" className="group flex items-center gap-3 text-orange-400 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
                  Start your project <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {deliverables.map((d, i) => (
              <div key={i} className="group bg-white rounded-[28px] p-6 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/50">
                <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mb-5 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500 shrink-0">
                  {d.icon}
                </div>
                <h4 className="font-black text-[12px] uppercase tracking-[0.12em] text-zinc-900 mb-2 group-hover:text-orange-500 transition-colors">{d.title}</h4>
                <p className="text-zinc-400 text-xs font-light leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   07 — PACKAGES
   ═══════════════════════════════════════════════ */
function Packages() {
  const tiers = [
    {
      name: "Single",
      tag: "Starter",
      desc: "One hero image, fully optimized — perfect for testing or refreshing your top-selling ASIN.",
      features: ["1 main image design", "Competitor analysis", "Thumbnail validation", "Color correction", "1 revision round", "Upload-ready delivery"],
      delivery: "3–5 Days",
    },
    {
      name: "Bundle",
      tag: "Growth",
      desc: "3 main images for your top ASINs — consistent brand quality across your best-selling products.",
      features: ["3 main image designs", "Category-level competitor analysis", "A/B thumbnail variant included", "Color correction & grading", "2 revision rounds", "Upload-ready delivery"],
      delivery: "5–7 Days",
      popular: true,
    },
    {
      name: "Catalog",
      tag: "Scale",
      desc: "Full catalog main image overhaul — consistent, category-dominating hero shots across every ASIN.",
      features: ["7+ main image designs", "Full category audit", "Brand-consistent style system", "Thumbnail testing suite", "3D rendering support", "3 revision rounds", "Dedicated designer"],
      delivery: "10–14 Days",
    },
  ];

  return (
    <section id="packages" className="py-24 bg-white relative overflow-hidden scroll-mt-24">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <SectionLabel>Packages</SectionLabel>
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Choose your<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                CTR package.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            From a single hero shot to a full catalog overhaul — every package is designed to maximize your click-through rate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <div key={i} className="relative rounded-[40px] overflow-hidden flex flex-col">
              {tier.popular && (
                <div className="h-1 w-full bg-gradient-to-r from-orange-500 to-amber-400 shrink-0" />
              )}
              <div className={`flex-1 border p-8 lg:p-10 flex flex-col transition-all duration-500 ${
                tier.popular
                  ? "bg-zinc-950 border-t-0 border-zinc-800 rounded-b-[40px] hover:border-orange-500/30"
                  : "bg-[#fafafa] border-zinc-100 rounded-[40px] hover:border-orange-500/20 hover:shadow-2xl hover:shadow-zinc-200/60 hover:bg-white"
              }`}>
                {tier.popular && (
                  <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 px-3 py-1.5 rounded-full mb-6 self-start">
                    <Star size={9} className="text-orange-400 fill-orange-400" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-400">Most Popular</span>
                  </div>
                )}

                <span className={`text-[9px] font-mono font-bold uppercase tracking-[0.4em] mb-2 block ${tier.popular ? "text-orange-400" : "text-orange-500"}`}>{tier.tag}</span>
                <h3
                  className={`text-3xl font-black tracking-tighter mb-3 ${tier.popular ? "text-white" : "text-zinc-900"}`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {tier.name}
                </h3>
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
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${tier.popular ? "text-zinc-600" : "text-zinc-400"}`}>Delivery</span>
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
                    Get {tier.name}
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
   09 — WHO IT'S FOR
   ═══════════════════════════════════════════════ */
function WhoItsFor() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const blocks = gsap.utils.toArray(".signal-block");
      const ctx = gsap.context(() => {
        blocks.forEach((block) => {
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
    }
  }, []);

  const signals = [
    {
      index: "01",
      icon: <Eye size={18} />,
      label: "SKIMMING FATIGUE",
      status: "SHOPPER DROP-OFF",
      statusColor: "text-red-500 bg-red-500/10 border-red-500/20",
      headline: "The 1.3 Second Rule: You're losing the click before they read.",
      subline: "Visual diagnostic.",
      body: "Shoppers scan search results at lightning speed. If your main image doesn't pop, create instant quality trust, and communicate your product type in under 1.3 seconds, you're invisible. We optimize lighting, angles, and scale to dominate the first impression.",
      symptoms: [
        "Click-through rate (CTR) is below category average in Seller Central",
        "Impressions are high but page views remain stagnant",
        "Product looks dull or small compared to top-ranking competitors",
      ],
      accentGradient: "from-red-500/80 to-orange-500/80",
    },
    {
      index: "02",
      icon: <Target size={18} />,
      label: "AUTHORITY DEFICIT",
      status: "TRUST COLLAPSE",
      statusColor: "text-orange-500 bg-orange-500/10 border-orange-500/20",
      headline: "The Commodity Trap: You look like a generic reseller.",
      subline: "Authority analysis.",
      body: "In a grid of 20+ similar products, if your image looks like a basic factory photo, you're competing on price alone. We use studio-grade grading and grounding shadows to create a 'Premium Gap' that justifies your price point instantly.",
      symptoms: [
        "High bounce rate because the first impression feels 'cheap'",
        "Shoppers only buy when you run aggressive discounts",
        "Competitors with fewer reviews are winning more clicks",
      ],
      featured: true,
      accentGradient: "from-orange-500 to-amber-500",
    },
    {
      index: "03",
      icon: <Zap size={18} />,
      label: "CONVERSION LEAK",
      status: "MOBILE ABANDON",
      statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      headline: "The Thumbnail Gap: Your mobile story is invisible.",
      subline: "Funnel x-ray.",
      body: "Most shoppers browse on mobile where your image is tiny. If your product doesn't fill the frame correctly or loses detail at 85px, you've already lost. We architect 'Thumbnail-First' hero shots that maintain peak clarity on every device.",
      symptoms: [
        "Low mobile conversion rate compared to desktop performance",
        "Mobile search placement is dropping despite good keywords",
        "Product details are blurred or lost in mobile search results",
      ],
      accentGradient: "from-emerald-500/80 to-teal-500/80",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 lg:py-32 bg-[#fafafa] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 relative z-10">
        <div className="mb-12 lg:mb-20">
          <SectionLabel>CTR Diagnostic</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 mt-4">
            <h2
              className="text-3xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              The symptoms<br />
              of a weak hero shot.
            </h2>
            <p className="text-zinc-500 text-sm lg:text-base font-light leading-relaxed max-w-md lg:text-right">
              Your main image is the most expensive real estate you own. Identify the friction points in your CTR before they cost you another click.
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
                    [CTR_SCAN_{s.index}]
                  </span>
                </div>

                <div className={`relative group transition-all duration-700 ${
                  isFeatured
                    ? "bg-zinc-950 rounded-[28px] lg:rounded-[48px] px-5 lg:px-16 py-10 lg:py-20 my-6 lg:my-8 shadow-[0_30px_80px_rgba(0,0,0,0.3)] lg:shadow-[0_50px_120px_rgba(0,0,0,0.4)] ring-1 ring-white/10"
                    : "py-10 lg:py-16 lg:pl-8 lg:border-l-2 lg:border-l-transparent"
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
                          CTR_SIGNAL: {s.subline.toUpperCase()}
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
                <p className="text-[9px] lg:text-[11px] font-black uppercase tracking-[0.35em] lg:tracking-[0.4em] text-orange-500 mb-1.5">Standardize Your CTR</p>
                <p className="text-zinc-400 text-[13px] lg:text-base font-light leading-relaxed max-w-lg">
                  Stop being a commodity in the search grid. Our CTR-first architecture provides the visual framework for 100% aesthetic authority and click dominance.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-white text-zinc-950 w-full md:w-auto px-6 lg:px-10 py-3.5 lg:py-5 rounded-full text-[10px] lg:text-[12px] font-black uppercase tracking-[0.2em] lg:tracking-[0.25em] hover:bg-orange-500 hover:text-white hover:shadow-[0_20px_50px_rgba(249,115,22,0.3)] transition-all duration-500 shrink-0 active:scale-[0.97] no-underline"
            >
              Get Free Image Audit
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}



/* ═══════════════════════════════════════════════
   10 — FAQ
   ═══════════════════════════════════════════════ */
function OurProcess() {
  const steps = [
    { num: "01", title: "SERP Analysis",      desc: "We analyze the top 20 search results in your category to identify the exact visual gap your brand needs to fill.", icon: <Search size={18} /> },
    { num: "02", title: "Angle Optimization",  desc: "Studio-grade angle selection and framing designed specifically for high performance at small thumbnail sizes.",    icon: <LayoutGrid size={18} /> },
    { num: "03", title: "Visual Engineering", desc: "Advanced lighting, color grading, and contact shadows that create a 'Premium Gap' against generic competitor shots.", icon: <Sparkles size={18} /> },
    { num: "04", title: "Thumbnail Validation", desc: "Rigorous testing at every Amazon device resolution to ensure your hero shot dominates the search grid. Period.",  icon: <Maximize2 size={18} /> },
  ];

  return (
    <section className="pt-16 pb-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Our Process</SectionLabel>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-zinc-900 leading-[0.9] uppercase">
              How it{" "}
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-zinc-300 italic font-light lowercase tracking-normal">works.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            A clear, structured process — from SERP analysis to thumbnail validation. Transparent at every stage.
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

        <div className="mt-12 flex items-center justify-between p-8 bg-[#fafafa] rounded-[32px] border border-zinc-100">
          <div className="flex items-center gap-4 text-zinc-400">
            <Terminal size={16} />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em]">CTR_Launch_Protocol_01-04</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest italic">Engineered for click dominance</span>
          </div>
        </div>
      </div>
    </section>
  );
}


function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: "What are Amazon's main image requirements?",              a: "Your main image must have a pure white background (RGB 255,255,255), show only the product with no props, text, logos, or watermarks, fill at least 85% of the frame, be minimum 1000px on the longest side (we deliver 2000×2000px), and be a professional photograph — no illustrations for the main image slot." },
    { q: "How much can a main image really impact my CTR?",         a: "Based on our data across 3,500+ projects, clients typically see a 25–60% improvement in click-through rate after a professional main image optimization. CTR directly impacts your organic ranking, PPC efficiency, and total revenue — making it the highest-ROI design investment on Amazon." },
    { q: "What do you need from us to get started?",               a: "We need your existing product photos (front, back, and angle shots), your ASIN or product listing URL, and your target keywords so we can analyze the search results. If you don't have professional photography, we can work with samples or create 3D renders." },
    { q: "Do you do product photography or just editing?",          a: "Both. We can optimize existing product photos through angle selection, color correction, shadow work, and background perfection. For sellers who need new photography, we offer full studio sessions including 3D rendering for products where physical photography is limiting." },
    { q: "What about lifestyle images and secondary slots?",        a: "This service focuses on the main image (slot 1) because it has the highest impact on CTR. For all 7 listing image slots, lifestyle photography, and infographic design, see our Listing Image Systems service." },
    { q: "How do you test at thumbnail size?",                      a: "Every design goes through our thumbnail validation process: we check at 85×85px (mobile search), 150×150px (desktop search), and 300×300px (cart and recommendations). If the product isn't clearly identifiable and compelling at thumbnail size, we iterate until it is." },
    { q: "Can you help with A/B testing my main image?",            a: "Absolutely. We deliver multiple variants designed for Amazon's Manage Your Experiments tool. We structure variants with specific hypotheses (angle, shadow, fill ratio) so you can run meaningful split tests and identify your highest-CTR version with confidence." },
    { q: "What's the turnaround time?",                            a: "Standard turnaround is 3–5 days for Single, 5–7 days for Bundle, and 10–14 days for Catalog-level work. Rush delivery in 48 hours is available for an additional fee. Every project includes revision rounds to ensure complete satisfaction before delivery." },
  ];

  return (
    <section className="py-24 bg-[#fafafa] border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>FAQ</SectionLabel>
            <h2
              className="text-5xl md:text-[80px] font-black tracking-tighter uppercase leading-[0.85] mb-6 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Frequently<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>asked.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-8">
              Everything you need to know about main image CTR optimization before getting started.
            </p>
            <div className="p-6 bg-white rounded-3xl border border-zinc-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Have More Questions?</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Every product and category is different. Our designers will discuss your specific situation directly.
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
                    : "bg-white border-zinc-100 hover:border-zinc-200"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-8 py-6 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-mono transition-colors shrink-0 ${openIndex === i ? "text-orange-500" : "text-zinc-300"}`}>
                      0{i + 1}
                    </span>
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
                  <div className="px-6 sm:px-8 pb-8 pt-0">
                    <div className="text-[13px] sm:text-[14px] text-zinc-500 leading-relaxed font-light border-l-2 border-orange-500/20 pl-4 sm:pl-6">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center sm:justify-between px-6 sm:px-8 py-8 sm:py-6 bg-zinc-900 rounded-[24px] text-white gap-6">
              <div className="flex items-center gap-4">
                <Terminal size={16} className="text-orange-500" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold">More_Questions?</span>
              </div>
              <Link href="/contact" className="flex items-center gap-2 group no-underline">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">Contact Us</span>
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
   MAIN IMAGE CTR CTA
   ═══════════════════════════════════════════════ */
const CtrCTAButton = ({ href = "/contact", children }) => (
  <Link
    href={href}
    className="group relative inline-flex items-center justify-center w-full sm:w-auto px-12 sm:px-16 py-4 bg-orange-600 text-white rounded-full font-bold text-[9px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.3em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:scale-[1.02] active:scale-95 no-underline border-none"
  >
    <span className="relative z-10 flex items-center justify-center w-full whitespace-nowrap">
      {children}
      <ArrowRight size={16} className="absolute right-0 group-hover:translate-x-2 transition-all duration-300 text-white shrink-0" />
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-orange-400 transition-transform duration-500 ease-in-out"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[horizontal-scan_2s_linear_infinite]"></div>
  </Link>
);

function MainImageCtrCTA() {
  return (
    <div className="w-full pb-16 bg-[#fafafa]">
      <section className="px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-[#0a0a0a] rounded-[40px] py-14 px-8 lg:px-20 text-left relative overflow-hidden border border-white/5 group shadow-none">

            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />

            {/* Background Large Icon Decor - MousePointerClick for CTR focus */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.05] translate-x-1/4">
              <MousePointerClick size={600} strokeWidth={0.2} className="text-orange-500" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column: Content */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-white font-bold text-[9px] uppercase tracking-[0.4em]">CTR Analysis: Open</span>
                </div>

                <h2
                  className="text-4xl lg:text-6xl font-black tracking-tighter mb-6 leading-[0.9] text-white uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Stop losing clicks.<br />
                  <span className="italic font-light block mt-2 tracking-normal text-orange-500 lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                    dominate the SERPs.
                  </span>
                </h2>

                <p className="text-zinc-400 font-light mb-8 lg:text-xl leading-relaxed max-w-xl">
                  Every search impression without a click is lost revenue to a competitor. Book a **15-minute Main Image Audit** to analyze your CTR against the category and apply our winning visual formula.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-8 sm:mb-16">
                  <CtrCTAButton href="/get-started">
                    Get Free Strategy Call
                  </CtrCTAButton>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Capture Market Share</span>
                  </div>
                </div>

                {/* Bottom Row Points */}
                <div className="pt-8 border-t border-white/5 flex flex-wrap items-center gap-x-10 gap-y-3">
                  {[
                    "Click-Through Gap Audit",
                    "Visual Competitive Analysis",
                    "Strategic Image Optimizations"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white whitespace-nowrap">
                      <CheckCircle2 size={12} className="text-orange-500/70" strokeWidth={3} />
                      {item}
                    </div>
                  ))}
                </div>

              </div>

              {/* Right Column: 15-Minute Strategy Card */}
              <div className="lg:col-span-5 block relative group/card mt-12 lg:mt-0">
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-500">

                  {/* Card Glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  {/* Header */}
                  <div className="flex justify-between items-start mb-8 sm:mb-10 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shrink-0" />
                        <span className="text-[8px] font-mono text-orange-500/80 uppercase tracking-widest">Session: Visual Click</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>CTR Audit</h4>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-inner shrink-0">
                      <Zap size={22} strokeWidth={1.5} className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>

                  {/* Steps with Timeline spacing */}
                  <div className="space-y-0 relative z-10 before:absolute before:inset-y-3 before:left-[19px] before:w-[2px] before:bg-white/10">
                    {[
                      { icon: <Focus size={16} />, title: "1. SERP Landscape Scan", desc: "Identify how your image compares to top competitors on critical keywords." },
                      { icon: <MousePointerClick size={16} />, title: "2. Visual Feature Analysis", desc: "Grade lighting, composition, and product 'pop' against standards." },
                      { icon: <Target size={16} />, title: "3. Winning Roadmap", desc: "Specific action steps for implementing higher-CTR visual changes.", active: true }
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

                  {/* Meeting Context Footer */}
                  <div className="mt-8 sm:mt-10 bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10 backdrop-blur-md">
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                       <div className="w-10 h-10 rounded-full border border-white/10 bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
                         <Users size={16} />
                       </div>
                       <div className="flex-1">
                         <p className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-widest mb-0.5">Analysis Session</p>
                         <p className="text-[9px] sm:text-[10px] text-zinc-500 font-mono">15 Mins • 1-on-1 Access</p>
                       </div>
                    </div>
                    <div className="w-full sm:w-auto px-4 py-2 rounded-xl bg-orange-500/10 text-orange-500 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase border border-orange-500/20 text-center shrink-0">
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
          <Link href="/service/design/enhanced-brand-content" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start uppercase">
              <ArrowRight className="mr-3 group-hover:-translate-x-3 transition-transform rotate-180 size-6 md:size-8 shrink-0" />
              EBC A+ Design
            </h4>
          </Link>
        </div>
        <div className="hidden md:block w-px h-16 bg-zinc-100" />
        <div className="text-center md:text-right w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Design Service</p>
          <Link href="/service/design/full-listing-optimization" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end uppercase">
              Full Listing<br />Optimization
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
export default function MainImageCTRPage() {
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <MainImageHero />
      <MetricsStrip />
      <WhyCTRMatters />
      <BeforeAfterShowcase />
      <WinningMainImage />
      <WhatsIncluded />
      <Packages />
      <WhoItsFor />
      <OurProcess />
      <FAQ />
      <FooterNav />
    </div>
  );
}