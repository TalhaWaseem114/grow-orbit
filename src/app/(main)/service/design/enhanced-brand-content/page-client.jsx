"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Zap, Star,
  Award, Package, ChevronRight, Plus, Minus, Terminal, FileText,
  Layers, Paintbrush, Activity, Eye, Target, X,
  BarChart3, Sparkles, Users, LayoutGrid, Boxes, Fingerprint,
  Image as ImageIcon,
  Layout, PenTool
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroButton from "@/components/ui/HeroButton";

// --- Sub-component: The Primary Gradient Button ---
const EbcCTAButton = ({ href = "/contact", children }) => (
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

function EnhancedContentCTA() {
  return (
    <div className="w-full pb-10 bg-[#fafafa]">
      <section className="px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-[#0a0a0a] rounded-[40px] py-14 px-8 lg:px-20 text-left relative overflow-hidden border border-white/5 group shadow-none">

            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />

            {/* Background Large Icon Decor */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.05] translate-x-1/4">
              <Sparkles size={600} strokeWidth={0.2} className="text-orange-500" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              {/* Left Column: Content */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-white font-bold text-[9px] uppercase tracking-[0.4em]">A+ Content Capacity: Open</span>
                </div>

                <h2
                  className="text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-[0.9] text-white uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Stop settling for text.<br />
                  <span className="italic font-light block mt-2 tracking-normal text-orange-500 lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                    narrate your value.
                  </span>
                </h2>

                <p className="text-zinc-400 font-light mb-10 text-base lg:text-lg leading-relaxed max-w-xl">
                  Basic product descriptions don't sell. Book a **15-minute A+ Strategy Session** to turn dry specs into an immersive brand experience that drives a 10-20% lift in conversion rates.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-16">
                  <EbcCTAButton href="/get-started">
                    Get Free Strategy Call
                  </EbcCTAButton>
                  <div className="flex items-center justify-center sm:justify-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Premium Conversion Lift</span>
                  </div>
                </div>

                {/* Bottom Row Points */}
                <div className="pt-8 border-t border-white/5 flex flex-wrap items-center gap-x-10 gap-y-3">
                  {[
                    "Cross-Sell Module Strategy",
                    "SEO-Optimized Copywriting",
                    "Brand Story Integration"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white whitespace-nowrap">
                      <CheckCircle2 size={12} className="text-orange-500/70" strokeWidth={3} />
                      {item}
                    </div>
                  ))}
                </div>

              </div>

              {/* Right Column: 15-Minute Strategy Card */}
              <div className="lg:col-span-5 block mt-12 lg:mt-[60px] relative group/card self-start">
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-5 sm:p-8 shadow-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-500">

                  {/* Card Glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  {/* Header */}
                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[8px] font-mono text-orange-500/80 uppercase tracking-widest">Session: EBC Blueprint</span>
                      </div>
                      <h4 className="text-2xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>A+ System</h4>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-inner">
                      <Layout size={22} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Steps with Timeline spacing */}
                  <div className="space-y-0 relative z-10 before:absolute before:inset-y-3 before:left-[19px] before:w-[2px] before:bg-white/10">
                    {[
                      { icon: <FileText size={16} />, title: "1. Narrative Audit", desc: "Analyze current text-to-image ratios and storytelling gaps." },
                      { icon: <PenTool size={16} />, title: "2. Module Selection", desc: "Strategically pick Amazon modules that best showcase your USP." },
                      { icon: <BarChart3 size={16} />, title: "3. Conversion Deployment", desc: "Execute the design and copy that drives clicks to the cart.", active: true }
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
                         <p className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-widest mb-0.5 leading-tight">Deployment Session</p>
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

gsap.registerPlugin(ScrollTrigger);

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

const CheckItem = ({ children, light = false }) => (
  <div className="flex items-start gap-3">
    <CheckCircle2 size={15} className="text-orange-500 shrink-0 mt-0.5" />
    <span className={`text-[14px] font-light leading-snug ${light ? "text-zinc-300" : "text-zinc-600"}`}>{children}</span>
  </div>
);

/* ═══════════════════════════════════════════════
   01 — HERO
   ═══════════════════════════════════════════════ */
function EBCHero() {
  const floatRef = useRef(null);

  useEffect(() => {
    if (!floatRef.current) return;
    gsap.to(floatRef.current, { y: -14, duration: 4.5, repeat: -1, yoyo: true, ease: "power1.inOut" });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-[106px] pb-16 overflow-hidden bg-[#fafafa]">
      <style>{`
        @keyframes scan-ebc {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent animate-[scan-ebc_11s_linear_infinite]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="ebc-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
            <circle cx="60" cy="60" r="0.5" fill="currentColor" opacity="0.5" />
            <path d="M120 0 L120 120 M0 120 L120 120" stroke="currentColor" strokeWidth="0.2" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#ebc-grid)" />
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
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
                  <div className="w-4 h-[1px] bg-orange-500 self-center" />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
                  Design &amp; Creative Services
                </span>
              </div>

              <h1 className="text-[32px] sm:text-6xl md:text-7xl lg:text-[85px] font-black tracking-tighter leading-[0.9] md:leading-[0.85] mb-8 md:mb-10 text-zinc-900 uppercase text-left">
                Enhanced<br />
                <span className="text-orange-500">Brand Content</span><br />
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light lowercase tracking-tight text-zinc-300">
                  that converts.
                </span>
              </h1>

              <div className="flex gap-6 mb-12">
                <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50" />
                <div>
                  <p className="text-lg md:text-[22px] text-zinc-500 font-light leading-relaxed max-w-xl mb-6">
                    Stop losing sales to blank product descriptions. We craft scroll-stopping Enhanced Brand Content that educates, persuades, and converts — turning every listing into a branded storefront.
                  </p>
                  <div className="flex flex-wrap gap-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Brand Registry Required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LayoutGrid size={10} className="text-orange-500/50" />
                      <span>Standard + Premium A+</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  "Rich media modules & comparison charts",
                  "SEO-optimized alt text on every image",
                  "Copywriting & brand messaging included",
                  "Desktop & mobile responsive design",
                ].map((item, i) => <CheckItem key={i}>{item}</CheckItem>)}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mb-12">
                <HeroButton href="/contact">
                  Get My EBC Designed
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
                  { icon: <ShieldCheck size={11} />, label: "Brand Registry 2.0 Ready" },
                  { icon: <Layers size={11} />,      label: "Standard & Premium A+"    },
                  { icon: <Zap size={11} />,         label: "10–14 Day Delivery"        },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2">
                    <span className="text-orange-500">{b.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{b.label}</span>
                  </div>
                ))}
              </div>

              {/* Social proof strip */}
              <div className="hidden sm:flex sm:items-center gap-8 mt-10 pt-10 border-t border-zinc-100">
                {[
                  { label: "EBC Projects Delivered", val: "600+" },
                  { label: "Avg Sales Lift",          val: "+20%" },
                  { label: "Brands Served",           val: "80+" },
                ].map((t, i) => (
                  <div key={i} className="text-left">
                    <p className="text-2xl font-black tracking-tighter text-zinc-900 leading-none mb-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>{t.val}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 leading-tight">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — A+ Content Composer Visual */}
          <div className="lg:col-span-5 relative block mt-16 lg:mt-[60px] self-start">
            <div className="relative scale-[0.82] sm:scale-[0.95] lg:scale-100 origin-top sm:origin-top-right">

              {/* Ambient Glows */}
              <div className="absolute -inset-16 z-0 pointer-events-none">
                <div className="absolute top-1/4 right-0 w-72 h-72 bg-orange-500/15 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/3 left-0 w-56 h-56 bg-amber-400/8 rounded-full blur-[80px]" />
              </div>

              {/* Floating A+ Grade Badge */}
              <div className="absolute -right-3 -top-3 z-40">
                <div className="w-[72px] h-[72px] rounded-[22px] bg-orange-500 flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(249,115,22,0.5)] border-2 border-orange-400/40">
                  <span className="text-[28px] font-black text-white leading-none tracking-tighter">A+</span>
                  <span className="text-[6px] font-mono text-white/70 uppercase tracking-widest mt-0.5">Content</span>
                </div>
              </div>

              {/* ── CARD 1: Content Module Architect (Dark) ── */}
              <div className="relative z-10 bg-[#0a0a0a] rounded-[28px] border border-white/[0.08] shadow-[0_40px_80px_rgba(0,0,0,0.3)] overflow-hidden">

                {/* Subtle grid overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(249,115,22,0.4) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

                {/* App Header Bar */}
                <div className="relative z-10 px-5 py-3.5 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  </div>
                  <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.3em]">A+_Content_Studio</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[6px] font-mono text-emerald-500/70 uppercase tracking-widest">Live</span>
                  </div>
                </div>

                {/* Module Architecture Body */}
                <div className="relative z-10 p-5 space-y-3">

                  {/* Module: Hero Banner Preview */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/5.5] border border-orange-500/15 group/hero">
                    <img
                      src="https://res.cloudinary.com/dciggvulg/image/upload/v1781271681/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-1.png"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/hero:scale-110"
                      alt="Premium A+ Hero Design"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1 border border-white/10">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-[6px] font-black text-white/90 uppercase tracking-widest">Deployed</span>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 text-[6px] font-mono text-white/50 uppercase tracking-widest bg-black/20 px-1.5 py-0.5 rounded">1464 × 600px</div>
                  </div>

                  {/* Module: 3-Column Feature Grid */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { icon: <Star size={12} />, label: "Quality", img: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872024/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-2.jpg" },
                        { icon: <ShieldCheck size={12} />, label: "Trust", img: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872025/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-3.jpg" },
                        { icon: <Zap size={12} />, label: "Design", img: "https://res.cloudinary.com/dciggvulg/image/upload/v1781271686/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-4.png" }
                      ].map((f, i) => (
                        <div key={i} className="group/feat relative aspect-[4/3] bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden hover:border-orange-500/40 transition-all duration-500">
                          <img src={f.img} className="w-full h-full object-cover object-top opacity-60 group-hover/feat:scale-125 group-hover/feat:opacity-100 transition-all duration-700" alt={`${f.label} Feature Highlight`} />
                          <div className="absolute top-1.5 left-1.5 bg-black/50 backdrop-blur-sm rounded px-1.5 py-0.5 border border-white/10">
                            <span className="text-[5px] font-black text-white/90 uppercase tracking-widest">{f.label}</span>
                          </div>
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-lg bg-orange-500/80 backdrop-blur-sm flex items-center justify-center text-white scale-0 group-hover/feat:scale-100 transition-transform">
                             {React.cloneElement(f.icon, { size: 10 })}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[7px] font-black text-zinc-600 uppercase tracking-[0.2em]">Feature_Grid</span>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                        <span className="text-[6px] font-mono text-emerald-500/70">Active</span>
                      </div>
                    </div>
                  </div>

                  {/* Module: Comparison Matrix */}
                  <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <BarChart3 size={10} className="text-orange-500/60" />
                        <span className="text-[7px] font-black text-zinc-500 uppercase tracking-[0.2em]">Comparison_Matrix</span>
                      </div>
                      <span className="text-[6px] font-mono text-orange-500/40 uppercase tracking-widest">Module_04</span>
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { label: "Your Brand", w: "92%", active: true },
                        { label: "Competitor A", w: "48%", active: false },
                        { label: "Competitor B", w: "31%", active: false }
                      ].map((bar, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className={`text-[7px] font-mono w-20 truncate ${bar.active ? 'text-orange-400 font-bold' : 'text-zinc-700'}`}>{bar.label}</span>
                          <div className="flex-1 h-2 bg-white/[0.03] rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-1000 ${bar.active ? 'bg-gradient-to-r from-orange-600 to-amber-400 shadow-[0_0_12px_rgba(249,115,22,0.3)]' : 'bg-zinc-800'}`} style={{ width: bar.w }} />
                          </div>
                          <span className={`text-[7px] font-black w-8 text-right ${bar.active ? 'text-orange-400' : 'text-zinc-700'}`}>{bar.w}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Module Status Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Layers size={10} className="text-zinc-600" />
                        <span className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest">4 Modules</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={10} className="text-emerald-500/60" />
                        <span className="text-[7px] font-mono text-emerald-500/60 uppercase tracking-widest">3 Active</span>
                      </div>
                    </div>
                    <span className="text-[7px] font-mono text-zinc-700 uppercase tracking-widest">v2.4</span>
                  </div>
                </div>
              </div>

              {/* ── CARD 2: Live Impact Dashboard (Light, Overlapping) ── */}
              <div className="relative z-20 -mt-10 ml-6 mr-2 bg-white/95 rounded-[24px] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.12)] border border-zinc-100 overflow-hidden" style={{ backdropFilter: "blur(20px)" }}>

                {/* Dashboard Header */}
                <div className="px-5 py-3 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Activity size={11} className="text-emerald-500" />
                    <span className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.2em]">Content Impact</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[7px] font-mono text-emerald-600 font-bold uppercase tracking-widest">Real-time</span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="p-5">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: <TrendingUp size={14} />, label: "Sales Lift", value: "+20%", accent: true },
                      { icon: <Eye size={14} />, label: "Time on Page", value: "+45s", accent: false },
                      { icon: <ShieldCheck size={14} />, label: "Trust Index", value: "97", accent: false }
                    ].map((m, i) => (
                      <div key={i} className="text-center group">
                        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center mx-auto mb-2.5 transition-all ${m.accent ? 'bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/30' : 'bg-orange-50 border-orange-100 text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-400'}`}>
                          {m.icon}
                        </div>
                        <p className={`text-base font-black tracking-tighter leading-none mb-1 ${m.accent ? 'text-orange-500' : 'text-zinc-900'}`}>{m.value}</p>
                        <p className="text-[7px] font-bold text-zinc-400 uppercase tracking-widest">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Content Authority Bar */}
                  <div className="mt-4 pt-4 border-t border-zinc-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[7px] font-black text-zinc-400 uppercase tracking-widest">Content Authority Score</span>
                      <span className="text-[8px] font-mono text-orange-500 font-bold">92/100</span>
                    </div>
                    <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full w-[92%] shadow-[0_0_12px_rgba(249,115,22,0.3)]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Module Toolbar */}
              <div className="absolute -left-5 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
                <div className="bg-white rounded-2xl p-2 shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-zinc-100 space-y-1.5">
                  {[<Layout size={14} />, <LayoutGrid size={14} />, <BarChart3 size={14} />, <PenTool size={14} />].map((icon, i) => (
                    <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${i === 0 ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30' : 'bg-zinc-50 text-zinc-400 hover:text-orange-500 hover:bg-orange-50'}`}>
                      {icon}
                    </div>
                  ))}
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
    { v: "600+", l: "EBC Projects Delivered", i: <LayoutGrid size={14} /> },
    { v: "+20%", l: "Avg Sales Lift",         i: <TrendingUp size={14} /> },
    { v: "80+",  l: "Brands Served",           i: <Users size={14} />      },
    { v: "10",   l: "Day Turnaround",         i: <Zap size={14} />        },
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
          <Link href="/contact" className="group relative flex flex-col items-center text-center lg:items-start lg:text-left border-t lg:border-t-0 lg:border-l border-white/10 lg:border-orange-500/20 px-6 sm:px-8 py-8 lg:py-0 transition-all duration-500 hover:bg-orange-500/[0.02] no-underline col-span-2 lg:col-span-1 mt-8 lg:mt-0">
            <div className="relative w-full flex items-center justify-center lg:justify-start mb-2">
              <span className="text-lg font-black text-white uppercase tracking-tighter leading-tight group-hover:text-orange-400 transition-colors">Get Content Designed</span>
              <ArrowRight size={16} className="absolute right-0 lg:static lg:ml-3 text-orange-500 group-hover:translate-x-2 transition-transform shrink-0" />
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">EBC_SLOTS_OPEN</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   03 — WHY EBC MATTERS
   ═══════════════════════════════════════════════ */
function WhyEBCMatters() {
  const reasons = [
    { icon: <TrendingUp size={22} />,   stat: "+20%", statLabel: "avg sales lift",    title: "Boost Conversions Instantly",    desc: "Enhanced Brand Content turns plain text descriptions into immersive brand experiences that build trust and reduce purchase hesitation." },
    { icon: <ShieldCheck size={22} />,  stat: "100%", statLabel: "brand trust",       title: "Build Brand Credibility",         desc: "Professional EBC modules signal premium quality. Shoppers perceive brands with rich content as more trustworthy and worth the price." },
    { icon: <Eye size={22} />,          stat: "+45%", statLabel: "time on page",      title: "Capture Attention Longer",        desc: "Visual modules keep shoppers scrolling through your story instead of bouncing to competitors. More time on page means more conversions." },
    { icon: <BarChart3 size={22} />,    stat: "2.5x", statLabel: "detail retention",  title: "Communicate Complex Value",       desc: "Some products need more than bullet points. EBC lets you explain features, show use-cases, and address objections with rich visuals." },
    { icon: <Activity size={22} />,     stat: "-35%", statLabel: "fewer returns",     title: "Reduce Returns & ACoS",           desc: "Clear visual demonstrations set proper expectations. When customers understand what they're buying, return rates plummet." },
    { icon: <Target size={22} />,       stat: "SEO",  statLabel: "image alt text",    title: "Hidden SEO Advantage",            desc: "Every EBC image carries alt-text that Amazon indexes. We optimize every module for discoverability, compounding your organic ranking." },
  ];

  return (
    <section className="py-32 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>The Impact</SectionLabel>
            <h2 className="text-5xl md:text-[80px] font-black tracking-tighter uppercase leading-[0.82] mb-10 text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Why brands<br />invest in<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">EBC.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-12">
              Shoppers who see Enhanced Brand Content are significantly more likely to purchase. It's not optional anymore — it's the baseline for competing on Amazon.
            </p>
            <Link href="/contact" className="group flex items-center gap-3 bg-zinc-950 text-white px-8 py-4 rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:bg-orange-500 transition-all no-underline w-fit">
              Upgrade my listing
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-6 items-start">
            {/* Masonry Column 1 */}
            <div className="flex-1 flex flex-col gap-6 w-full">
              {reasons.filter((_, i) => i % 2 === 0).map((r, i) => (
                <div key={i} className="group bg-[#fafafa] hover:bg-white rounded-[32px] p-8 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-orange-500/5">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500 shrink-0">
                      {React.cloneElement(r.icon, { size: 22 })}
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black tracking-tighter text-orange-500 leading-none">{r.stat}</span>
                      <p className="text-[12px] font-bold font-mono text-zinc-900 uppercase tracking-widest mt-1.5">{r.statLabel}</p>
                    </div>
                  </div>
                  <h3 className="text-[14px] font-black uppercase tracking-[0.12em] text-zinc-900 mb-3 group-hover:text-orange-500 transition-colors">{r.title}</h3>
                  <p className="text-zinc-400 text-sm font-light leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>

            {/* Masonry Column 2 - Staggered */}
            <div className="flex-1 flex flex-col gap-6 sm:pt-16 w-full">
              {reasons.filter((_, i) => i % 2 !== 0).map((r, i) => (
                <div key={i} className="group bg-[#fafafa] hover:bg-white rounded-[32px] p-8 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-orange-500/5">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500 shrink-0">
                      {React.cloneElement(r.icon, { size: 22 })}
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black tracking-tighter text-orange-500 leading-none">{r.stat}</span>
                      <p className="text-[12px] font-bold font-mono text-zinc-900 uppercase tracking-widest mt-1.5">{r.statLabel}</p>
                    </div>
                  </div>
                  <h3 className="text-[14px] font-black uppercase tracking-[0.12em] text-zinc-900 mb-3 group-hover:text-orange-500 transition-colors">{r.title}</h3>
                  <p className="text-zinc-400 text-sm font-light leading-relaxed">{r.desc}</p>
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
   04 — MODULE TYPES (dark)
   ═══════════════════════════════════════════════ */
function ModuleTypes() {
  const modules = [
    { tag: "BANNER",  label: "Full-Width Banner",        desc: "Hero-style imagery that spans the entire content area. Sets the tone for your brand story and grabs immediate attention.", img: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872063/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-1.jpg" },
    { tag: "CALLOUT", label: "Technical Callout",        desc: "Detailed x-ray or diagram views highlighting internal components and core technologies to build product trust.", img: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872064/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-10.jpg" },
    { tag: "LIFESTYLE", label: "In-Use Context",         desc: "High-impact lifestyle photography showing the product in action, helping customers visualize ownership.", img: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872112/grow_orbit_portfolio/neogrid_hand_grip/aplus-5.jpg" },
    { tag: "STORY",   label: "Image & Text Overlay",     desc: "Lifestyle imagery with integrated copywriting that communicates your brand values and product story.", img: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872024/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-2.jpg" },
    { tag: "SIDEBAR", label: "Image & Sidebar",          desc: "Split-screen layout pairing detailed visuals with key specifications, ideal for technical products.", img: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872069/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-5.jpg" },
    { tag: "BRAND",   label: "Brand Story Header",       desc: "A premium brand showcase above A+ Content — builds trust, establishes authority, and cross-sells your catalog.", img: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872128/grow_orbit_portfolio/kazvo_nose_trimmer/aplus-1.jpg" },
  ];

  return (
    <section className="py-32 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-500/[0.08] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-orange-500/[0.04] blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <SectionLabel light>Module Library</SectionLabel>
            <h2 className="text-5xl md:text-[80px] font-black tracking-tighter uppercase leading-[0.82]">
              The building blocks<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-500 lowercase tracking-normal">of great EBC.</span>
            </h2>
          </div>
          <p className="text-zinc-400 font-light max-w-sm text-lg leading-relaxed pb-2">
            Every module we design serves a conversion purpose. We architect these into your A+ Content to maximize shopper engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m, i) => (
            <div key={i} className="group bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-orange-500/30 rounded-[32px] p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/5">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[9px] font-mono font-black text-orange-500 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full uppercase tracking-widest">{m.tag}</span>
                <div className="h-px flex-1 bg-white/5 group-hover:bg-orange-500/20 transition-colors" />
              </div>
              <div className="aspect-[244/100] rounded-2xl overflow-hidden mb-6 border border-white/5">
                <img src={m.img} alt={`${m.label} Amazon EBC Module Example`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-50 group-hover:opacity-100" />
              </div>
              <h4 className="text-[14px] font-black uppercase tracking-[0.12em] text-white mb-3 group-hover:text-orange-400 transition-colors">{m.label}</h4>
              <p className="text-zinc-500 text-sm font-light leading-relaxed group-hover:text-zinc-400 transition-colors">{m.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/contact"
            className="inline-flex items-center gap-4 px-10 py-5 bg-orange-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all duration-500 shadow-[0_15px_40px_rgba(249,115,22,0.3)] no-underline"
          >
            Design My EBC Modules
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   05 — PACKAGES
   ═══════════════════════════════════════════════ */
function Packages() {
  const tiers = [
    {
      name: "Standard A+",
      tag: "Essential",
      desc: "Professional EBC with up to 5 modules — the baseline for any brand serious about conversion.",
      features: ["Up to 5 content modules", "Custom graphic design", "Conversion copywriting", "SEO alt-text optimization", "1 revision round", "Upload-ready delivery"],
      delivery: "10–14 Days",
    },
    {
      name: "Premium A+",
      tag: "Advanced",
      desc: "Full-width interactive modules with video, hotspots, and carousels for brands eligible for Premium A+.",
      features: ["Up to 7 premium modules", "Interactive hotspot modules", "Video integration support", "Enhanced comparison tables", "Brand story carousel", "2 revision rounds", "Seller Central upload"],
      delivery: "14–21 Days",
      popular: true,
    },
    {
      name: "Catalog EBC",
      tag: "Scale",
      desc: "Consistent EBC across your entire product catalog — templated design systems for multi-ASIN brands.",
      features: ["Bulk ASIN coverage", "Templated design system", "Brand story module", "Cross-sell strategy", "Dedicated designer", "3 revision rounds"],
      delivery: "3–4 Weeks",
    },
  ];

  return (
    <section id="packages" className="py-32 bg-[#fafafa] relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Packages</SectionLabel>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900">
              Choose your<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">EBC package.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            From a single listing upgrade to full catalog coverage — every package includes design, copywriting, and delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <div key={i} className="relative rounded-[40px] overflow-hidden flex flex-col">
              {tier.popular && <div className="h-1 w-full bg-gradient-to-r from-orange-500 to-amber-400 shrink-0" />}
              <div className={`flex-1 border p-8 lg:p-10 flex flex-col transition-all duration-500 ${
                tier.popular
                  ? "bg-zinc-950 border-t-0 border-zinc-800 rounded-b-[40px] hover:border-orange-500/30"
                  : "bg-white border-zinc-100 rounded-[40px] hover:border-orange-500/20 hover:bg-orange-50/30"
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
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${tier.popular ? "text-zinc-600" : "text-zinc-400"}`}>Delivery</span>
                    <span className={`text-[11px] font-bold ${tier.popular ? "text-zinc-300" : "text-zinc-700"}`}>{tier.delivery}</span>
                  </div>
                  <div className={`flex items-center justify-between py-3 border-t rounded-xl px-3 -mx-3 ${tier.popular ? "border-white/5 bg-orange-500/5" : "border-zinc-50 bg-zinc-50/50"}`}>
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${tier.popular ? "text-zinc-600" : "text-zinc-400"}`}>Pricing</span>
                    <span className="text-[11px] font-bold text-orange-500">Contact for Quote</span>
                  </div>
                  <Link href="/contact"
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
   05.5 — BEFORE / AFTER COMPARISON
   ═══════════════════════════════════════════════ */
function BeforeAfterComparison() {
  const beforeMetrics = [
    { label: "Conversion Rate", value: "8.2%", color: "text-red-400" },
    { label: "Time on Page", value: "12s", color: "text-red-400" },
    { label: "Return Rate", value: "18%", color: "text-red-400" },
    { label: "Brand Perception", value: "Low", color: "text-red-400" },
  ];

  const afterMetrics = [
    { label: "Conversion Rate", value: "14.7%", color: "text-emerald-400" },
    { label: "Time on Page", value: "48s", color: "text-emerald-400" },
    { label: "Return Rate", value: "6%", color: "text-emerald-400" },
    { label: "Brand Perception", value: "Premium", color: "text-emerald-400" },
  ];

  return (
    <section className="py-24 md:py-32 bg-zinc-950 relative overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/[0.04] blur-[180px] rounded-full" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/[0.04] blur-[180px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-8">
          <div>
            <SectionLabel light>The Proof</SectionLabel>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Same product.<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-500 lowercase tracking-normal">Different story.</span>
            </h2>
          </div>
          <p className="text-zinc-400 text-lg font-light max-w-sm leading-relaxed pb-2">
            This is the same listing, same product, same price. The only variable is Enhanced Brand Content. The CVR difference speaks for itself.
          </p>
        </div>

        {/* Split Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-12">

          {/* BEFORE Card */}
          <div className="group relative rounded-[40px] overflow-hidden border border-red-500/10 hover:border-red-500/30 transition-all duration-700">
            {/* Red danger stripe */}
            <div className="h-1 w-full bg-gradient-to-r from-red-600 to-red-400" />
            <div className="bg-[#0c0c0c] p-8 lg:p-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <X size={18} className="text-red-400" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-black text-red-400 uppercase tracking-[0.3em] block">Before</span>
                    <span className="text-[11px] text-zinc-600 font-light">Without A+ Content</span>
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20">
                  <span className="text-[9px] font-black uppercase tracking-widest text-red-400">8.2% CVR</span>
                </div>
              </div>

              {/* Mock listing - plain text only */}
              <div className="rounded-3xl border border-white/5 bg-[#111] overflow-hidden mb-8">
                {/* Product title area */}
                <div className="p-6 border-b border-white/5">
                  <div className="h-3 w-3/4 bg-white/10 rounded-full mb-3" />
                  <div className="h-2.5 w-1/2 bg-white/5 rounded-full mb-5" />
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => <div key={j} className="w-2.5 h-2.5 rounded-sm bg-amber-500/40" />)}
                    </div>
                    <span className="text-[9px] text-zinc-600">142 ratings</span>
                  </div>
                  <div className="h-3 w-20 bg-white/10 rounded-full" />
                </div>

                {/* Plain text description - boring */}
                <div className="p-6">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 mb-4">Product Description</div>
                  <div className="space-y-2.5">
                    {[...Array(6)].map((_, j) => (
                      <div key={j} className="h-2 rounded-full bg-white/[0.04]" style={{ width: `${85 - j * 8}%` }} />
                    ))}
                  </div>
                  <div className="mt-6 space-y-2">
                    {["Feature 1: Basic product description text", "Feature 2: Plain unformatted bullet point", "Feature 3: No visual differentiation"].map((f, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-zinc-700 mt-1.5 shrink-0" />
                        <span className="text-[10px] text-zinc-600 font-light">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3">
                {beforeMetrics.map((m, i) => (
                  <div key={i} className="bg-red-500/[0.04] border border-red-500/10 rounded-2xl p-4 text-center">
                    <span className={`text-xl font-black tracking-tighter ${m.color} block`}>{m.value}</span>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 mt-1 block">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AFTER Card */}
          <div className="group relative rounded-[40px] overflow-hidden border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-700">
            {/* Green success stripe */}
            <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-emerald-300" />
            <div className="bg-[#0c0c0c] p-8 lg:p-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-black text-emerald-400 uppercase tracking-[0.3em] block">After</span>
                    <span className="text-[11px] text-zinc-600 font-light">With Professional A+ Content</span>
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">14.7% CVR</span>
                </div>
              </div>

              {/* Mock listing - rich A+ Content */}
              <div className="rounded-3xl border border-white/5 bg-[#111] overflow-hidden mb-8">
                {/* Hero banner module */}
                <div className="aspect-[16/6] relative overflow-hidden">
                  <img src="https://res.cloudinary.com/dciggvulg/image/upload/v1781271681/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-1.png" alt="Nexa Pouches A+ Content" className="w-full h-full object-cover opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <div className="h-3 w-2/3 bg-white/20 rounded-full mb-2" />
                    <div className="h-2 w-1/3 bg-orange-500/30 rounded-full" />
                  </div>
                </div>

                {/* Feature grid module */}
                <div className="p-5 border-t border-white/5">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: <ShieldCheck size={14} />, label: "Lab Tested" },
                      { icon: <Award size={14} />, label: "Award Winning" },
                      { icon: <Zap size={14} />, label: "Fast Acting" },
                    ].map((f, j) => (
                      <div key={j} className="text-center p-3 bg-white/[0.03] rounded-xl border border-white/5">
                        <div className="text-orange-500 flex justify-center mb-2">{f.icon}</div>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">{f.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comparison strip */}
                <div className="px-5 pb-5">
                  <div className="bg-orange-500/5 border border-orange-500/10 rounded-xl p-3 flex items-center justify-between">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-500">Comparison Module</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-1 rounded-full bg-orange-500" />
                      <div className="w-4 h-1 rounded-full bg-zinc-700" />
                      <div className="w-4 h-1 rounded-full bg-zinc-700" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3">
                {afterMetrics.map((m, i) => (
                  <div key={i} className="bg-emerald-500/[0.04] border border-emerald-500/10 rounded-2xl p-4 text-center">
                    <span className={`text-xl font-black tracking-tighter ${m.color} block`}>{m.value}</span>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 mt-1 block">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CVR Impact Strip */}
        <div className="bg-[#111] border border-white/5 rounded-[32px] p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-[0_10px_30px_rgba(249,115,22,0.3)]">
              <TrendingUp size={28} />
            </div>
            <div>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-4xl md:text-5xl font-black tracking-tighter text-white">+79%</span>
                <span className="text-[12px] font-bold font-mono text-orange-500 uppercase tracking-widest">CVR Increase</span>
              </div>
              <p className="text-zinc-500 text-sm font-light">Average conversion rate lift when upgrading from plain text to professional A+ Content</p>
            </div>
          </div>
          <Link href="/contact" className="group flex items-center gap-3 bg-orange-500 hover:bg-white hover:text-black text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all duration-500 shadow-[0_10px_30px_rgba(249,115,22,0.25)] no-underline shrink-0">
            Get My A+ Content
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   06 — PORTFOLIO (niche showcase)
   ═══════════════════════════════════════════════ */
function Portfolio() {
  const examples = [
    {
      id: "EB-01",
      niche: "EDC Gear",
      images: [
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872022/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-1.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872024/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-2.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872025/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-3.jpg"
      ],
      stats: ["+65% CVR", "3.2x ROAS"],
      tags: ["Lifestyle Imagery", "Feature Breakdown"],
      accent: "bg-orange-600",
      metric: { val: "3.2X", label: "ROAS LIFT", icon: <TrendingUp size={10} /> }
    },
    {
      id: "EB-02",
      niche: "Home & Auto",
      images: [
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872044/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/aplus-1.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872045/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/aplus-2.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872047/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/aplus-3.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872048/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/aplus-4.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872049/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/aplus-5.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872050/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/aplus-6.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872052/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/aplus-7.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872053/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/aplus-8.jpg"
      ],
      stats: ["+90% Sales", "4.5x ROAS"],
      tags: ["High-Tech Infographics", "Cinematic Dark"],
      accent: "bg-orange-600",
      metric: { val: "4.5X", label: "ROAS LIFT", icon: <TrendingUp size={10} /> }
    },
    {
      id: "EB-03",
      niche: "Automotive",
      images: [
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872063/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-1.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872065/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-2.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872066/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-3.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872068/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-4.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872069/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-5.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872070/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-6.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872071/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-7.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872073/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-8.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872074/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-9.jpg",
        "https://res.cloudinary.com/dciggvulg/image/upload/v1781872064/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-10.jpg"
      ],
      stats: ["+105% Sales", "3.8x ROAS"],
      tags: ["Cinematic Dark", "Feature Callouts"],
      accent: "bg-orange-500",
      metric: { val: "3.8X", label: "ROAS LIFT", icon: <TrendingUp size={10} /> }
    },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Portfolio</SectionLabel>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900">
              EBC design<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">across niches.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            We've built high-converting Enhanced Brand Content across every major Amazon category. Each design is built from the ground up — no templates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {examples.map((ex, i) => (
            <Link
              key={i}
              href="/portfolio/?filter=a%2B-content"
              className="group relative block p-5 bg-[#f0f4f8] rounded-[36px] transition-all duration-700 ease-out no-underline border border-transparent shadow-[10px_10px_20px_#d2dbe6,-10px_-10px_20px_#ffffff] hover:shadow-[16px_16px_32px_#d2dbe6,-16px_-16px_32px_#ffffff]"
            >
              {/* Header with Badges */}
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1 bg-white/40 backdrop-blur-sm border border-white/45 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.02)] px-2.5 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-[6px] font-black uppercase tracking-widest text-orange-500">A+ Content</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-white/40 backdrop-blur-sm border border-white/45 shadow-sm hidden sm:block">
                    <span className="text-[7px] font-bold text-zinc-500 uppercase tracking-widest leading-none block">Ref: {ex.id}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-white/50 backdrop-blur-md border border-white/60 shadow-[0_2px_10px_rgba(0,0,0,0.03)] px-3 py-1.5 rounded-xl">
                  <div className={`w-5 h-5 rounded flex items-center justify-center text-white/90 ${ex.accent} shrink-0`}>
                    {ex.metric.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-zinc-800 font-black text-xs tracking-tight leading-none block">{ex.metric.val}</span>
                    <span className="text-zinc-500 text-[6px] font-bold uppercase tracking-widest leading-none block mt-0.5">{ex.metric.label}</span>
                  </div>
                </div>
              </div>

              {/* Image stack layout - Full uncropped view */}
              <div className="relative rounded-2xl overflow-hidden flex flex-col gap-0 bg-white/90 backdrop-blur-md border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.03)] h-[400px] overflow-y-auto no-scrollbar group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-700">
                <img src={ex.images[0]} alt={`${ex.niche} A+ Content Header`} className="w-full h-auto block" />
                <img src={ex.images[1]} alt={`${ex.niche} A+ Content Module`} className="w-full h-auto block" />
                <img src={ex.images[2]} alt={`${ex.niche} A+ Content Footer`} className="w-full h-auto block" />
              </div>

              {/* Card info */}
              <div className="mt-5 px-2">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-black text-zinc-800 uppercase tracking-tight text-[13px] group-hover:text-orange-500 transition-colors">{ex.niche}</h4>
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500/30 group-hover:bg-orange-500 transition-colors animate-pulse" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {ex.tags.map((tag, j) => (
                    <span key={j} className="text-[7px] font-bold uppercase tracking-widest text-zinc-500 bg-white/40 backdrop-blur-sm border border-white/60 shadow-sm px-2.5 py-1 rounded-full transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Want to see more of our A+ design work?</p>
          <Link
            href="/portfolio/?filter=a%2B-content"
            className="inline-flex items-center gap-3 bg-zinc-950 hover:bg-orange-500 transition-all duration-500 text-white font-black text-[12px] uppercase tracking-[0.2em] px-10 py-5 rounded-full no-underline shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-orange-500/20"
          >
            View All A+ Content
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   07 — WHO IS THIS FOR
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
      headline: "The Reading Barrier: Shoppers aren't reading your specs.",
      subline: "Retention diagnostic.",
      body: "Without visual hierarchy, 70% of potential buyers bounce within seconds. We architect a module sequence that breaks down complex features into 'scannable' visual bites—ensuring your USP is understood before they stop scrolling.",
      symptoms: [
        "Average time on listing is below category standard",
        "High bounce rate despite high-quality traffic",
        "Shoppers are missing critical product compatibility details",
      ],
      accentGradient: "from-red-500/80 to-orange-500/80",
    },
    {
      index: "02",
      icon: <Fingerprint size={18} />,
      label: "CONVERSION FRICTION",
      status: "MOBILE ABANDON",
      statusColor: "text-orange-500 bg-orange-500/10 border-orange-500/20",
      headline: "The Thumb-Scroll Gap: Your mobile story is incomplete.",
      subline: "Mobile UX analysis.",
      body: "If your A+ Content isn't built for the vertical swipe, it doesn't exist. We optimize module density and typographic scale specifically for the Amazon Mobile App—converting shoppers where 80% of sales actually happen.",
      symptoms: [
        "Add-to-cart rate is significantly lower on mobile vs desktop",
        "Text modules are unreadable without manual zooming",
        "Call-to-action modules are buried too deep in the layout",
      ],
      featured: true,
      accentGradient: "from-orange-500 to-amber-500",
    },
    {
      index: "03",
      icon: <ShieldCheck size={18} />,
      label: "AUTHORITY DEFICIT",
      status: "COMMODITY RISK",
      statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      headline: "Brand Dilution: Generic modules signal a generic product.",
      subline: "Authority x-ray.",
      body: "Standard templates tell the shopper you're a reseller, not a brand. We build custom-designed EBC systems that establish instant category authority, allowing you to defend premium pricing against lower-cost competitors.",
      symptoms: [
        "Price sensitivity is the #1 reason for lost sales",
        "Competitors with lower-quality products have 'cleaner' A+ Content",
        "Brand identity feels disconnected from your packaging or website",
      ],
      accentGradient: "from-emerald-500/80 to-teal-500/80",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 lg:py-32 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 relative z-10">
        <div className="mb-12 lg:mb-20">
          <SectionLabel>EBC Diagnostic</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 mt-4">
            <h2
              className="text-3xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Identify the<br />
              conversion bleed.
            </h2>
            <p className="text-zinc-500 text-sm lg:text-base font-light leading-relaxed max-w-md lg:text-right">
              A+ Content isn't about looking pretty—it's about removing the psychological friction that stops a shopper from clicking 'Add to Cart.'
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
                    [CONTENT_SCAN_{s.index}]
                  </span>
                </div>

                <div className={`relative group transition-all duration-700 ${
                  isFeatured
                    ? "bg-zinc-950 rounded-[28px] lg:rounded-[48px] px-5 lg:px-16 py-10 lg:py-20 my-6 lg:my-8 shadow-[0_30px_80_rgba(0,0,0,0.3)] lg:shadow-[0_50px_120px_rgba(0,0,0,0.4)] ring-1 ring-white/10"
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
                          CONTENT_SIGNAL: {s.subline.toUpperCase()}
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
                <Zap size={20} className="text-orange-500" />
              </div>
              <div>
                <p className="text-[9px] lg:text-[11px] font-black uppercase tracking-[0.35em] lg:tracking-[0.4em] text-orange-500 mb-1.5">Standardize Your Performance</p>
                <p className="text-zinc-400 text-[13px] lg:text-base font-light leading-relaxed max-w-lg">
                  Stop settling for commodity content. Our A+ architecture provides the psychological framework for 100% conversion authority.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-white text-zinc-950 w-full md:w-auto px-6 lg:px-10 py-3.5 lg:py-5 rounded-full text-[10px] lg:text-[12px] font-black uppercase tracking-[0.2em] lg:tracking-[0.25em] hover:bg-orange-500 hover:text-white hover:shadow-[0_20px_50px_rgba(249,115,22,0.3)] transition-all duration-500 shrink-0 active:scale-[0.97] no-underline"
            >
              Get Free Conversion Audit
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>


      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   08 — THE PROCESS
   ═══════════════════════════════════════════════ */
function OurProcess() {
  const steps = [
    { num: "01", title: "Brand Discovery",    desc: "We review your brand assets, competitor EBC, and product positioning to map out a module strategy.",              icon: <FileText size={18} />     },
    { num: "02", title: "Module Architecture", desc: "We blueprint the exact module types, content hierarchy, and visual flow before a single pixel is designed.",      icon: <LayoutGrid size={18} />    },
    { num: "03", title: "Design & Copy",       desc: "Custom graphics and conversion-focused copywriting built around your brand voice and product story.",              icon: <Sparkles size={18} />      },
    { num: "04", title: "Revise & Deliver",    desc: "Revision rounds until it's perfect — then upload-ready files delivered directly or uploaded by our team.",        icon: <CheckCircle2 size={18} />  },
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
            A clear, structured process — from brand discovery to final delivery. Transparent at every stage.
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

        <div className="mt-12 flex items-center justify-between p-8 bg-[#fafafa] rounded-[32px] border border-zinc-100">
          <div className="flex items-center gap-4 text-zinc-400">
            <Terminal size={16} />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em]">EBC_Build_Process_01-04</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest italic">Collaborative from start to delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   09 — FAQ
   ═══════════════════════════════════════════════ */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: "What is Enhanced Brand Content (EBC)?",                              a: "Enhanced Brand Content — now called A+ Content by Amazon — lets Brand Registry sellers replace their plain-text product descriptions with rich media modules including images, comparison charts, and formatted text. It's the most effective way to tell your brand story and boost conversion rates on Amazon." },
    { q: "What's the difference between Standard and Premium A+ Content?",    a: "Standard A+ offers up to 5 modules from a library of 17 layouts. Premium A+ (A++) unlocks 7 modules from 19 layouts, including interactive hotspots, video modules, and full-width content. Premium requires a published Brand Story on all ASINs and 15 approved A+ submissions in 12 months." },
    { q: "How does EBC impact my Amazon SEO?",                                 a: "While indexation of A+ body text is debated, image alt-text IS indexed by search engines. More importantly, EBC drives higher conversion rates and sales velocity — which are Amazon's top two ranking factors on the A9/A10 algorithm." },
    { q: "What do you need from us to start?",                                 a: "We need your brand assets (logo, fonts, colors), high-resolution product images, brand story or mission statement, and any competitor references. If you don't have professional photography, we can work with existing images and enhance them for module design." },
    { q: "Can you handle the Seller Central upload?",                          a: "Yes. Once designs are approved, we can either deliver upload-ready assets for your team, or our specialists handle the entire Seller Central submission and ASIN mapping — included in Premium and Catalog packages." },
    { q: "How many ASINs can one EBC design cover?",                           a: "A single EBC design can be applied to multiple ASINs with similar products. Our packages include mapping to up to 100 SKUs. For unique product lines that need distinct content, we offer multi-ASIN design systems at scale." },
    { q: "What is the typical turnaround time?",                               a: "Standard turnaround is 10–14 business days for Standard A+ and 14–21 days for Premium A+. This includes research, module architecture, custom design, copywriting, and revision rounds. Rush delivery is available." },
    { q: "Do you offer revisions?",                                            a: "Every package includes revision rounds — 1 for Standard, 2 for Premium, and 3 for Catalog. We don't deliver until you're 100% satisfied with the design, copywriting, and overall brand presentation." },
  ];

  return (
    <section className="py-32 bg-[#fafafa] border-t border-zinc-100">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>FAQ_Protocol</SectionLabel>
            <h2 className="text-5xl md:text-[80px] font-black tracking-tighter uppercase leading-[0.85] mb-10 text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Frequently<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">asked.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-12">
              Everything you need to know about Enhanced Brand Content before getting started.
            </p>
            <div className="p-6 bg-white rounded-3xl border border-zinc-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Have More Questions?</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Every product and catalog is different. Our team answers every question — no canned responses.
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
                    : "bg-white/60 border-zinc-100 hover:border-zinc-200"
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

            <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-center justify-between px-6 sm:px-8 py-8 sm:py-6 bg-zinc-900 rounded-[24px] text-white gap-6 text-center sm:text-left">
              <div className="flex items-center gap-4">
                <Terminal size={16} className="text-orange-500" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold">More_Questions?</span>
              </div>
              <Link href="/contact" className="flex items-center justify-center sm:justify-end gap-2 group no-underline">
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
   11 — FOOTER NAV
   ═══════════════════════════════════════════════ */
function FooterNav() {
  return (
    <footer className="py-24 bg-white border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Previous Design Service</p>
          <Link href="/service/design/listing-image-systems" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start uppercase">
              <ArrowRight className="mr-3 group-hover:-translate-x-3 transition-transform rotate-180 size-6 md:size-8 shrink-0" />
              Listing Images
            </h4>
          </Link>
        </div>
        <div className="hidden md:block w-px h-16 bg-zinc-100" />
        <div className="text-center md:text-right w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Service</p>
          <Link href="/service/design/main-image-ctr" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end uppercase">
              Main Image CTR
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
export default function EnhancedBrandContentPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white">
      <EBCHero />
      <MetricsStrip />
      <WhyEBCMatters />
      <ModuleTypes />
      <Packages />
      <BeforeAfterComparison />
      <Portfolio />
      <WhoItsFor />
      <OurProcess />
      <FAQ />
      <EnhancedContentCTA />
      <FooterNav />
    </div>
  );
}
