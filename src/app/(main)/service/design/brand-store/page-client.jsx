"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ServicePricing from "@/components/sections/ServicePricing";
import {
  ArrowRight, CheckCircle2, ShieldCheck, Users, TrendingUp,
  BarChart3, Zap, Sparkles, Eye, Star, Award, Package,
  ChevronRight, Plus, Minus, Terminal, FileText, Layers,
  Paintbrush, Activity, Layout, ShoppingCart, Heart,
  Target, Globe, Repeat, BookOpen, Monitor, LayoutGrid,
  Link as LinkIcon, Image as ImageIcon,
  Store, MousePointer2, ShoppingBag, Search, Fingerprint
} from "lucide-react";
import HeroButton from "@/components/ui/HeroButton";

// --- Sub-component: The Primary Gradient Button ---
const StoreCTAButton = ({ href = "/contact", children }) => (
  <Link
    href={href}
    className="group relative inline-flex justify-center w-full sm:w-auto px-6 sm:px-10 py-4 bg-orange-600 text-white rounded-full font-bold text-[9px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.3em] overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95 no-underline border-none shadow-none"
  >
    <span className="relative z-10 flex items-center justify-center gap-3 sm:gap-4 w-full text-white">
      {children}
      <ArrowRight size={16} className="group-hover:translate-x-2 transition-all duration-300" />
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-orange-400 transition-transform duration-500 ease-in-out"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[horizontal-scan_2s_linear_infinite]"></div>
  </Link>
);

function BrandStoreCTA() {
  return (
    <div className="w-full pb-10 bg-[#fafafa]">
      <section className="px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-[#0a0a0a] rounded-[40px] py-14 px-8 lg:px-20 text-left relative overflow-hidden border border-white/5 group shadow-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.05] translate-x-1/4">
              <Store size={600} strokeWidth={0.2} className="text-orange-500" />
            </div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-white font-bold text-[9px] uppercase tracking-[0.4em]">Storefront Capacity: Open</span>
                </div>
                <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-[0.9] text-white uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Stop wasting traffic.<br />
                  <span className="italic font-light block mt-2 tracking-normal text-orange-500 lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                    build a destination.
                  </span>
                </h2>
                <p className="text-zinc-400 font-light mb-10 text-base lg:text-lg leading-relaxed max-w-xl">
                  A basic storefront is a missed opportunity for cross-selling. Book a **15-minute Storefront Discovery** to design a high-converting brand destination that increases Units Per Order (UPO).
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-16">
                  <div className="flex-1 w-full">
                    <StoreCTAButton href="/get-started">
                      Get Free Strategy Call
                    </StoreCTAButton>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Enhanced Conversion</span>
                  </div>
                </div>
                <div className="pt-8 border-t border-white/5 flex flex-wrap items-center gap-x-10 gap-y-3">
                  {["Multi-Page Architecture", "Cross-Sell Optimization", "Dynamic UX Elements"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white whitespace-nowrap">
                      <CheckCircle2 size={12} className="text-orange-500/70" strokeWidth={3} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 block mt-12 lg:mt-[60px] relative group/card self-start">
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-5 sm:p-8 shadow-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-500">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[8px] font-mono text-orange-500/80 uppercase tracking-widest">Session: Store UX</span>
                      </div>
                      <h4 className="text-2xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>UX Blueprint</h4>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-inner">
                      <Layout size={22} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="space-y-0 relative z-10 before:absolute before:inset-y-3 before:left-[19px] before:w-[2px] before:bg-white/10">
                    {[
                      { icon: <MousePointer2 size={16} />, title: "1. Navigation Mapping", desc: "Reduce friction and guide customers to your hero products." },
                      { icon: <ShoppingBag size={16} />, title: "2. Basket Building", desc: "Strategically place sub-collections to drive organic cross-sells." },
                      { icon: <BarChart3 size={16} />, title: "3. Conversion Roadmap", desc: "Integrate video and interactive modules to boost dwell time.", active: true }
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
                       <div className="w-10 h-10 rounded-full border border-white/10 bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0"><Users size={16} /></div>
                       <div><p className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-widest mb-0.5 leading-tight">Architectural Session</p><p className="text-[9px] sm:text-[10px] text-zinc-500 font-mono">15 Mins • 1-on-1 Discovery</p></div>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-orange-500/10 text-orange-500 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase border border-orange-500/20 self-stretch sm:self-auto text-center shrink-0">Free Access</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style jsx global>{`
        @keyframes horizontal-scan { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes loading-bar { 0% { transform: translateX(-100%); } 50% { transform: translateX(0); } 100% { transform: translateX(100%); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}



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
function BrandStoreHero() {

  return (
    <section className="relative min-h-screen flex items-center pt-16 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-[#fafafa]">
      <style>{`
        @keyframes scan-store {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent animate-[scan-store_11s_linear_infinite]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="store-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
            <circle cx="60" cy="60" r="0.5" fill="currentColor" opacity="0.5" />
            <path d="M120 0 L120 120 M0 120 L120 120" stroke="currentColor" strokeWidth="0.2" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#store-grid)" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_30%,rgba(249,115,22,0.07),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fafafa] to-[#fafafa]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full -mt-5">
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
                <span className="text-orange-500">Brand Store</span><br />
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
                  <p className="text-lg md:text-[22px] text-zinc-500 font-light leading-relaxed max-w-xl mb-6">
                    Your own Amazon storefront — zero competitor ads, full brand control, and a vanity URL that actually converts.
                  </p>
                  <div className="flex flex-wrap gap-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Brand Registry: Required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Monitor size={10} className="text-orange-500/50" />
                      <span>Custom Sub-Pages: Included</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  "Guide shoppers with a strategic design",
                  "Turn your Store into a sales machine",
                  "Build customer confidence and trust",
                  "Earn a vanity URL (amazon.com/brandname)",
                ].map((item, i) => <CheckItem key={i}>{item}</CheckItem>)}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mb-12">
                <HeroButton href="/contact">
                  Get My Brand Store
                </HeroButton>
                <a
                  href="#examples"
                  className="group flex items-center justify-center sm:justify-start gap-3 text-zinc-500 hover:text-zinc-900 font-bold text-[11px] uppercase tracking-widest px-2 py-4 transition-colors no-underline"
                >
                  View Store Examples
                  <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { icon: <ShieldCheck size={11} />, label: "No Competitor Ads"           },
                  { icon: <LinkIcon size={11} />,    label: "Vanity URL Included"          },
                  { icon: <Zap size={11} />,         label: "Custom Sub-Category Pages"    },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2">
                    <span className="text-orange-500">{b.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{b.label}</span>
                  </div>
                ))}
              </div>

              {/* Trust signals */}
              <div className="hidden sm:flex items-center gap-8 mt-10 pt-10 border-t border-zinc-100">
                {[
                  { label: "Brand Stores Built",  val: "200+"  },
                  { label: "Avg Sales Uplift",    val: "+35%"  },
                  { label: "Brands Served",       val: "80+"   },
                ].map((t, i) => (
                  <div key={i} className="text-left">
                    <p className="text-2xl font-black tracking-tighter text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>{t.val}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Brand Store Mockup ── */}
          <div className="lg:col-span-5 relative mt-[-20px] lg:mt-[60px] self-start animate-float">
            <div className="absolute -top-4 -right-4 bg-white rounded-[20px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-30 flex gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white"><Monitor size={16} /></div>
              <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white"><LayoutGrid size={16} /></div>
            </div>
            <div className="absolute -left-4 -bottom-10 bg-zinc-900 rounded-2xl px-5 py-4 z-30 shadow-[0_30px_60px_rgba(0,0,0,0.4)] min-w-[160px]">
              <p className="text-[7px] font-mono font-bold uppercase tracking-[0.25em] text-zinc-500 mb-1">Sales Uplift</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[8px] font-black text-orange-400 uppercase">AVG</span>
                <span className="text-2xl font-black text-white leading-none">+35%</span>
              </div>
            </div>

            {/* Main Glass Canvas (Outer Screen) */}
            <div className="relative bg-white/70 backdrop-blur-3xl rounded-[40px] border border-white shadow-[0_40px_100px_rgba(0,0,0,0.08)] overflow-hidden ring-1 ring-zinc-100 p-3">
              {/* Storefront mockup */}
              <div className="bg-white rounded-[32px] shadow-sm border border-zinc-100 overflow-hidden" role="img" aria-label="Amazon Brand Storefront UX/UI Mockup showcasing multi-page architecture and premium brand destination design">
              {/* Browser bar */}
              <div className="px-5 py-4 border-b border-zinc-100 flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-400" />
                  <div className="w-3 h-3 rounded-full bg-zinc-200" />
                  <div className="w-3 h-3 rounded-full bg-zinc-200" />
                </div>
                <div className="flex-1 bg-zinc-50 rounded-lg px-4 py-2 flex items-center gap-2">
                  <Globe size={11} className="text-zinc-300" />
                  <span className="text-[11px] text-zinc-400 font-medium">amazon.com/<span className="text-orange-500">yourbrand</span></span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                {/* Hero banner */}
                <div className="relative rounded-2xl overflow-hidden bg-zinc-900 h-28">
                  <img
                    src="https://res.cloudinary.com/dciggvulg/image/upload/v1781872054/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/main_image.jpg"
                    alt="Premium Amazon Brand Storefront UX Design Showcase"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/80 to-transparent" />
                  <div className="absolute inset-0 flex items-center px-5">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-white uppercase tracking-tighter">KAZVO PREMIUM</p>
                      <p className="text-[7px] text-zinc-300 font-light max-w-[120px] leading-tight">Engineered for clean air. Designed for your home.</p>
                      <div className="h-2 w-12 bg-orange-500 rounded-sm mt-1" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-[7px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">Brand Store</div>
                </div>

                 {/* Nav tabs */}
                 <div className="flex gap-2">
                   {["Home", "All Products", "New Arrivals", "Best Sellers"].map((tab, i) => (
                     <div key={i} className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider ${i === 0 ? "bg-orange-500 text-white" : "bg-zinc-50 text-zinc-400 border border-zinc-100"}`}>
                       {tab}
                     </div>
                   ))}
                 </div>

                 <p className="text-[7px] font-mono text-zinc-400 uppercase tracking-widest px-1">Featured Collections</p>
                 <div className="grid grid-cols-3 gap-2">
                   {[
                     { title: "4-in-1 Vacuum", price: "$89.99", src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872054/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/main_image.jpg" },
                     { title: "Tire Inflator", price: "$69.99", src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872075/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/main_image.jpg" },
                     { title: "78pc Tool Kit", price: "$49.99", src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872083/grow_orbit_portfolio/assets/portfolio/kazvo_screw_set_78/main_image.jpg" },
                   ].map((product, i) => (
                     <div key={i} className="rounded-xl border border-zinc-100 overflow-hidden bg-white shadow-[0_8px_40px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
                       <div className="aspect-square bg-zinc-50 relative overflow-hidden">
                         <img src={product.src} alt={product.title} className="w-full h-full object-cover" />
                       </div>
                       <div className="p-2">
                         <p className="text-[7px] font-black text-zinc-900 uppercase tracking-tight mb-0.5 leading-tight truncate">{product.title}</p>
                         <p className="text-[6px] font-bold text-orange-500 uppercase tracking-widest leading-none">{product.price}</p>
                       </div>
                     </div>
                   ))}
                </div>

                {/* Footer bar */}
                <div className="bg-zinc-900 rounded-xl px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">Store Live</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-white">3 Sub-Pages</span>
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
    { v: "200+",  l: "Brand Stores Built",   i: <Monitor size={14} /> },
    { v: "+35%",  l: "Avg Sales Lift",        i: <TrendingUp size={14} /> },
    { v: "80+",   l: "Brands Served",         i: <Users size={14} /> },
    { v: "10+",   l: "Custom Sub-Pages",      i: <LayoutGrid size={14} /> },
  ];

  return (
    <div className="bg-zinc-900 py-12 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-8 lg:gap-8">
          {stats.map((s, i) => (
            <div key={i} className="group relative flex flex-col border-l border-zinc-800/50 pl-8 transition-all duration-500 hover:border-orange-500/40">
              <div className="absolute top-0 left-[-1.5px] w-[3px] h-[3px] bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-orange-500/70 mb-3 group-hover:text-orange-400 transition-colors">{s.i}</div>
              <span className="text-4xl font-black text-white tracking-tighter">{s.v}</span>
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mt-1">[ {s.l} ]</span>
            </div>
          ))}
          <Link href="/contact" className="group relative flex flex-col items-center lg:items-start justify-center lg:justify-start col-span-2 lg:col-span-1 border-t lg:border-t-0 lg:border-l border-orange-500/20 pt-8 lg:pt-0 lg:pl-8 transition-all duration-500 hover:bg-orange-500/[0.02] no-underline">
            <div className="text-orange-500 mb-3 group-hover:translate-x-1 transition-transform hidden lg:block"><ArrowRight size={14} /></div>
            <span className="text-lg font-black text-white uppercase tracking-tighter leading-tight group-hover:text-orange-400 transition-colors whitespace-nowrap flex items-center gap-2">
              Get Started
              <ArrowRight size={14} className="lg:hidden" />
            </span>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">STORE_SLOTS_OPEN</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   02b — TRAFFIC COMPARISON STRIP
   ═══════════════════════════════════════════════ */
function TrafficComparison() {
  return (
    <section className="py-14 md:py-16 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[900px] mx-auto px-6 lg:px-12">
        <p className="text-center text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-zinc-400 mb-8">
          Where does your traffic land?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Standard Listing */}
          <div className="relative rounded-[24px] border border-red-200/60 bg-red-50/30 p-6 sm:p-8 text-center overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-red-500" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400 mb-3">Standard Listing</p>
            <p className="text-4xl sm:text-5xl font-black tracking-tighter text-red-500 leading-none mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>100%</p>
            <p className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest">Competitor Ad Exposure</p>
            <p className="text-[11px] text-zinc-400 font-light mt-3 leading-relaxed max-w-[220px] mx-auto">
              Every product page shows sponsored ads from your direct competitors.
            </p>
          </div>
          {/* Brand Store */}
          <div className="relative rounded-[24px] border border-emerald-200/60 bg-emerald-50/30 p-6 sm:p-8 text-center overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-500" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-3">Brand Store</p>
            <p className="text-4xl sm:text-5xl font-black tracking-tighter text-emerald-600 leading-none mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>0%</p>
            <p className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest">Competitor Ads</p>
            <p className="text-[11px] text-zinc-400 font-light mt-3 leading-relaxed max-w-[220px] mx-auto">
              Your storefront. Your products. Zero distractions. Every visitor is yours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   03 — WHY BRAND STORES MATTER
   ═══════════════════════════════════════════════ */
function WhyBrandStores() {
  const reasons = [
    {
      icon: <ShieldCheck size={22} />,
      stat: "0",
      statLabel: "distractions",
      title: "No Competitor Ads",
      desc: "Unlike product listings, your Brand Store shows zero competitor ads. Every shopper who lands here is 100% focused on your products.",
    },
    {
      icon: <TrendingUp size={22} />,
      stat: "+35%",
      statLabel: "sales uplift",
      title: "Higher Conversion Rate",
      desc: "Amazon data shows that brands with optimized Stores see an average 35% lift in attributed sales compared to those without.",
    },
    {
      icon: <LinkIcon size={22} />,
      stat: "1",
      statLabel: "Vanity URL",
      title: "Custom Brand Link",
      desc: "Get a permanent amazon.com/yourbrand URL. A professional vanity URL is included with every Store design we build.",
    },
    {
      icon: <LayoutGrid size={22} />,
      stat: "∞",
      statLabel: "custom architecture",
      title: "Multi-Page Experience",
      desc: "Organize your catalog into strategic sub-pages. Guide shoppers through your brand story and product lines without friction.",
    },
    {
      icon: <Monitor size={22} />,
      stat: "100%",
      statLabel: "mobile optimised",
      title: "Responsive Design",
      desc: "Over 60% of Amazon traffic is mobile. Every module we design is pixel-perfect and conversion-tested for handheld devices.",
    },
    {
      icon: <BarChart3 size={22} />,
      stat: "24/7",
      statLabel: "data tracking",
      title: "Analytics Dashboard",
      desc: "Full integration with Amazon Store Insights. Track every click, visit, and dollar of revenue driven by your storefront.",
    },
  ];

  return (
    <section className="py-32 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>Why It Matters</SectionLabel>
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-8 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Why Brand<br />Stores matter<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                on Amazon.
              </span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-10">
              Present your brand and products effectively, and create a more engaging shopping experience. Your Brand Store is the only place on Amazon where your brand exists without interference.
            </p>
            <Link href="/contact" className="group flex items-center gap-3 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
              Build my Brand Store
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <div key={i} className="group bg-[#fafafa] hover:bg-white rounded-[28px] p-6 sm:p-7 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500 shadow-none hover:shadow-orange-500/5">
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
   04 — SHOWCASE YOUR BRAND (dark split section)
   ═══════════════════════════════════════════════ */
function ShowcaseSection() {
  const features = [
    { icon: <Paintbrush size={20} />,  title: "Customized Page Templates",     desc: "Every page layout — homepage, category pages, and product spotlights — custom designed to reflect your brand identity and conversion goals." },
    { icon: <ImageIcon size={20} />,   title: "Image Editing & Enhancement",   desc: "We optimize and edit your product photography specifically for Store dimensions, ensuring every image looks premium at every breakpoint." },
    { icon: <LayoutGrid size={20} />,  title: "Professional Store Design",     desc: "Strategic layout architecture that guides shoppers through your catalog, highlights bestsellers, and reduces bounce rates." },
    { icon: <LinkIcon size={20} />,    title: "Vanity URL Creation",           desc: "We handle the amazon.com/brandname URL setup — a permanent, shareable link you can use in every marketing channel." },
    { icon: <Monitor size={20} />,     title: "Mobile-First Optimization",     desc: "Over 60% of Amazon shoppers are on mobile. Every Store we build is tested and optimized for flawless mobile performance." },
    { icon: <BarChart3 size={20} />,   title: "Analytics Configuration",       desc: "We configure Store insights tracking so you know exactly which pages drive sales, which products perform, and where to optimize." },
  ];

  return (
    <section className="py-24 bg-zinc-950 text-white relative">
      {/* Background clipping layer to allow sticky visuals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-500/[0.08] blur-[160px] rounded-full" />
        <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-orange-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left: feature branding */}
          <div className="lg:py-10">
            <SectionLabel light>What We Build</SectionLabel>
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-8"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Showcase your<br />brand on<br />
              <span className="italic font-light text-zinc-500 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                Amazon.
              </span>
            </h2>
            <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-lg mb-12">
              With years of Amazon Brand Store expertise, we know exactly what makes a Store drive sales. We design custom Stores that boost visibility, drive conversions, and keep customers focused on your catalog.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              {/* Masonry Column 1 */}
              <div className="flex-1 flex flex-col gap-4 w-full">
                {features.filter((_, i) => i % 2 === 0).map((f, i) => (
                  <div key={i} className="group flex gap-4 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-orange-500/30 rounded-[28px] p-5 sm:p-6 transition-all duration-500">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                      {React.cloneElement(f.icon, { size: 18 })}
                    </div>
                    <div>
                      <h4 className="text-[11px] sm:text-[12px] font-black uppercase tracking-[0.12em] text-white mb-2 group-hover:text-orange-400 transition-colors">{f.title}</h4>
                      <p className="text-zinc-500 text-[10px] sm:text-[11px] font-light leading-relaxed group-hover:text-zinc-400 transition-colors">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Masonry Column 2 - Staggered */}
              <div className="flex-1 flex flex-col gap-4 sm:pt-10 w-full">
                {features.filter((_, i) => i % 2 !== 0).map((f, i) => (
                  <div key={i} className="group flex gap-4 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-orange-500/30 rounded-[28px] p-5 sm:p-6 transition-all duration-500">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                      {React.cloneElement(f.icon, { size: 18 })}
                    </div>
                    <div>
                      <h4 className="text-[11px] sm:text-[12px] font-black uppercase tracking-[0.12em] text-white mb-2 group-hover:text-orange-400 transition-colors">{f.title}</h4>
                      <p className="text-zinc-500 text-[10px] sm:text-[11px] font-light leading-relaxed group-hover:text-zinc-400 transition-colors">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Store architecture visual - Now Sticky & Compact */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-[40px] overflow-hidden border border-white/5 shadow-2xl bg-zinc-900">
              <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">amazon.com/yourbrand · Store Builder</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Hero banner */}
                <div className="relative rounded-2xl overflow-hidden bg-zinc-800 h-24">
                  <img src="https://res.cloudinary.com/dciggvulg/image/upload/v1781872045/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/aplus-2.jpg" className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Kazvo Vacuum Cleaner Banner" />
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/40 to-transparent" />
                  <div className="absolute inset-3 flex items-end justify-between gap-3">
                    <div className="space-y-1.5 flex-1 relative z-10">
                      <div className="h-2.5 w-24 bg-white/60 rounded-sm" />
                      <div className="h-1.5 w-32 bg-white/30 rounded-sm" />
                    </div>
                    <div className="bg-orange-500 text-white text-[7px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full relative z-10">Shop Now</div>
                  </div>
                  <div className="absolute top-2 right-2 text-[6px] font-mono text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20 uppercase tracking-wider z-10">Hero</div>
                </div>

                 {/* Navigation row */}
                 <div className="flex gap-1.5 items-center">
                   <span className="text-[6px] font-mono text-zinc-600 uppercase tracking-widest mr-1">Nav:</span>
                   {["Home", "All", "Cleaning", "Automotive"].map((tab, i) => (
                     <div key={i} className={`px-2 py-1 rounded-lg text-[7px] font-bold ${i === 0 ? "bg-orange-500 text-white" : "bg-white/5 text-zinc-500 border border-white/10"}`}>{tab}</div>
                   ))}
                 </div>

                 {/* Product tiles */}
                 <p className="text-[6px] font-mono text-zinc-700 uppercase tracking-widest px-1">Featured Grid</p>
                 <div className="grid grid-cols-4 gap-1.5">
                   {[
                     { label: "Vacuum", src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872054/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/main_image.jpg", highlight: true },
                     { label: "Inflator", src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872075/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/main_image.jpg", highlight: false },
                     { label: "Tool Kit", src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872083/grow_orbit_portfolio/assets/portfolio/kazvo_screw_set_78/main_image.jpg", highlight: false },
                     { label: "Trimmer", src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872137/grow_orbit_portfolio/kazvo_nose_trimmer/main_image.jpg", highlight: true },
                   ].map((tile, i) => (
                     <div key={i} className={`rounded-lg border overflow-hidden transition-all duration-500 hover:scale-105 ${tile.highlight ? "border-orange-500/30 bg-orange-500/5" : "border-white/5 bg-white/3"}`}>
                       <div className="aspect-square bg-white relative">
                         <img src={tile.src} alt="Brand Store Navigation Tile" className="w-full h-full object-contain p-1.5" />
                         {tile.highlight && <div className="absolute top-0.5 left-0.5 bg-orange-500 text-white text-[4px] font-black px-1 py-0.5 rounded-full uppercase">HOT</div>}
                       </div>
                       <div className="p-1 px-1.5 bg-zinc-950/20">
                         <div className="h-1 w-full bg-white/20 rounded-sm mb-1" />
                         <div className="h-0.5 w-2/3 bg-white/10 rounded-sm" />
                       </div>
                     </div>
                   ))}
                </div>

                {/* Sub-pages row */}
                <div className="bg-zinc-950/60 rounded-xl p-3 border border-white/5">
                  <p className="text-[6.5px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Sub-Category Hubs</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: "Cleaning Tech", image: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872053/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/aplus-8.jpg" },
                      { name: "Auto Gear", image: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872065/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-2.jpg" },
                      { name: "DIY & Tools", image: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872079/grow_orbit_portfolio/assets/portfolio/kazvo_screw_set_78/4.jpg" }
                    ].map((pg, i) => (
                      <div key={i} className="relative rounded-lg overflow-hidden aspect-[2/1] border border-white/5 hover:border-orange-500/30 transition-all cursor-pointer group/sub">
                        <img src={pg.image} alt={pg.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/sub:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                        <div className="absolute bottom-1.5 inset-x-1 text-center">
                          <span className="text-[5.5px] sm:text-[6.5px] font-black text-white uppercase tracking-wider block leading-tight">{pg.name}</span>
                        </div>
                      </div>
                    ))}
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

/* ═══════════════════════════════════════════════
   05 — PORTFOLIO / EXAMPLES
   ═══════════════════════════════════════════════ */
function ExamplesGallery() {
  const stores = [
    {
      id: "ST-01",
      portfolioId: "li-02",
      niche: "EDC Gear",
      heroImage: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872022/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-1.jpg",
      gridProducts: [
        { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872015/grow_orbit_portfolio/assets/portfolio/nexa_pouches/2.jpg" },
        { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872016/grow_orbit_portfolio/assets/portfolio/nexa_pouches/3.jpg" },
        { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872017/grow_orbit_portfolio/assets/portfolio/nexa_pouches/4.jpg" },
        { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872019/grow_orbit_portfolio/assets/portfolio/nexa_pouches/5.jpg" }
      ],
      tags: ["Multi-Category", "Lifestyle", "Featured Products"],
      accent: "bg-amber-500",
      metric: { val: "+65%", label: "CTR LIFT", icon: <TrendingUp size={10} /> }
    },
    {
      id: "ST-02",
      portfolioId: "li-06",
      niche: "Health & Supplements",
      heroImage: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872086/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/3.jpg",
      gridProducts: [
        { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872088/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/4.jpg" },
        { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872091/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/6.jpg" },
        { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872093/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/7.jpg" },
        { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872084/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/10.jpg" }
      ],
      tags: ["Trust-Building", "Science",   "Comparison Table"],
      accent: "bg-orange-500",
      metric: { val: "+45%", label: "CONVERSION", icon: <TrendingUp size={10} /> }
    },
    {
      id: "ST-03",
      portfolioId: "li-03",
      niche: "Personal Care & Home",
      heroImage: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872128/grow_orbit_portfolio/kazvo_nose_trimmer/aplus-1.jpg",
      gridProducts: [
        { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872137/grow_orbit_portfolio/kazvo_nose_trimmer/main_image.jpg" }, // Nose Trimmer
        { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872054/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/main_image.jpg" }, // Vacuum Cleaner
        { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872075/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/main_image.jpg" }, // Tire Inflator
        { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872083/grow_orbit_portfolio/assets/portfolio/kazvo_screw_set_78/main_image.jpg" } // Screwdriver Set
      ],
      tags: ["Cross-Selling", "Multi-Product", "Brand Consistency"],
      accent: "bg-zinc-700",
      metric: { val: "3.1x", label: "ROAS LIFT", icon: <BarChart3 size={10} /> }
    },
  ];

  return (
    <section id="examples" className="py-32 bg-[#f0f4f8] relative overflow-hidden scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Portfolio</SectionLabel>
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Stores{" "}
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                we've built.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            See how our clients are using Brand Stores to grow their businesses — across every niche and category.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stores.map((store, i) => (
            <Link
              key={i}
              href={`/portfolio/${store.portfolioId}`}
              className="group relative block p-5 bg-[#f0f4f8] rounded-[36px] transition-all duration-700 ease-out no-underline border border-transparent shadow-[10px_10px_20px_#d2dbe6,-10px_-10px_20px_#ffffff] hover:shadow-[16px_16px_32px_#d2dbe6,-16px_-16px_32px_#ffffff]"
            >
               {/* Mini Brand Store Dashboard Layout */}
               <div className={`aspect-[16/10] relative overflow-hidden flex flex-col p-3 rounded-2xl border ${
                 i === 1
                   ? "bg-zinc-900 border-white/10 shadow-[inset_2px_2px_10px_rgba(0,0,0,0.8),inset_-2px_-2px_5px_rgba(255,255,255,0.05)]"
                   : "bg-white/70 border-white/50 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.03),inset_-2px_-2px_5px_rgba(255,255,255,0.7)]"
               }`} style={{ perspective: "1500px" }}>

                 {/* 01: Mini Browser Bar / Store Nav */}
                 <div className={`flex items-center justify-between px-3 py-2 backdrop-blur-sm rounded-xl border mb-2 transform group-hover:translate-z-5 transition-transform duration-700 ${
                   i === 1 ? 'bg-white/5 border-white/10' : 'bg-white/40 border-white/45'
                 }`}>
                   <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-orange-500/80 animate-pulse" />
                     <span className={`text-[7px] font-mono uppercase tracking-widest ${i === 1 ? 'text-zinc-400' : 'text-zinc-500'}`}>Store Builder</span>
                   </div>
                   <div className="flex gap-3">
                     {["Home", "Shop", "About"].map((tab, j) => (
                       <span key={j} className={`text-[6px] font-bold uppercase tracking-tight ${j === 0 ? "text-orange-500" : (i === 1 ? "text-zinc-500" : "text-zinc-400")}`}>{tab}</span>
                     ))}
                   </div>
                 </div>

                 {/* 02: Hero Banner Module */}
                 <div className="h-28 relative rounded-xl overflow-hidden border border-white/50 group-hover:border-orange-500/30 transition-all duration-700 transform group-hover:translate-z-10 mb-2 shadow-sm">
                   <img src={store.heroImage} alt="Brand Store Hero Image Showcase" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" />
                   <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent opacity-60" />
                   {/* Reference Badge Removed */}
                 </div>

                 {/* 03: Product Modules Grid */}
                 <div className="flex-1 grid grid-cols-4 gap-2 transform group-hover:translate-z-2 transition-transform duration-700 delay-75">
                   {store.gridProducts.map((prod, j) => (
                     <div key={j} className={`relative rounded-lg overflow-hidden group/mod shadow-sm border ${
                       i === 1 ? 'bg-white/5 border-white/10' : 'bg-white/40 border-white/45'
                     }`}>
                        <img
                         src={prod.src}
                         alt="Brand Store Secondary Showcase"
                         className="w-full h-full object-cover opacity-80 group-hover/mod:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className={`absolute bottom-1.5 left-1.5 h-1 w-2/3 rounded-sm ${i === 1 ? 'bg-white/20' : 'bg-white/40'}`} />
                     </div>
                   ))}
                 </div>

                 {/* Performance Pill Badge */}
                 <div className="absolute top-10 right-10 z-40 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                   <div className="bg-white/95 backdrop-blur-md border border-white/60 rounded-2xl px-3 py-2.5 shadow-[0_15px_30px_rgba(0,0,0,0.08)] flex items-center gap-3 group-hover:border-orange-500/30 transition-all duration-500">
                     <div className={`w-8 h-8 rounded-lg ${store.accent} flex items-center justify-center text-white shadow-inner`}>
                       {store.metric.icon}
                     </div>
                     <div>
                       <span className="text-zinc-900 font-black text-sm tracking-tighter leading-none block mb-0.5">{store.metric.val}</span>
                       <span className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest leading-none block">{store.metric.label}</span>
                     </div>
                   </div>
                 </div>

                 {/* Hover overlay - Subtle Details */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-white/10 backdrop-blur-[2px] z-30 pointer-events-none">
                   <div className="text-center transform scale-90 group-hover:scale-100 transition-transform duration-500 translate-y-4">
                     <div className="relative inline-block px-4 py-2 bg-orange-500 rounded-full shadow-lg">
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white">Full Experience</p>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Card info */}
               <div className="p-6 border-t border-white/40 mt-2">
                 <div className="flex items-center justify-between mb-3">
                   <h4 className="font-black text-zinc-900 uppercase tracking-tight text-[13px] group-hover:text-orange-500 transition-colors">{store.niche}</h4>
                   <div className="w-1.5 h-1.5 rounded-full bg-orange-500/30 group-hover:bg-orange-500 transition-colors animate-pulse" />
                 </div>
                 <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap pb-1">
                   {store.tags.map((tag, j) => (
                     <span key={j} className="shrink-0 text-[8px] font-bold uppercase tracking-widest text-zinc-500 bg-white/35 backdrop-blur-md border border-white/30 shadow-[0_4px_12px_rgba(0,0,0,0.01)] group-hover:bg-white/50 group-hover:border-orange-500/15 px-2.5 py-1.5 rounded-xl transition-all">
                       {tag}
                     </span>
                   ))}
                 </div>
               </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Want to see more of our portfolio work?</p>
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
   06 — WHO IS THIS FOR
   ═══════════════════════════════════════════════ */
function WhoItsFor() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const blocks = document.querySelectorAll(".signal-block");
    blocks.forEach(block => observer.observe(block));

    return () => observer.disconnect();
  }, []);

  const signals = [
    {
      index: "01",
      icon: <Fingerprint size={18} />,
      label: "CONVERSION FRICTION",
      status: "NAVIGATION LAG",
      statusColor: "text-red-500 bg-red-500/10 border-red-500/20",
      headline: "The Storefront Maze: Your navigation is a dead end.",
      subline: "UX diagnostic.",
      body: "Most Amazon Stores are just dumped catalogs with zero funnel logic. If a shopper has to think twice about how to find your bestsellers, they've already bounced. We architect multi-page hubs that guide shoppers from broad interest to specific purchase intent with zero friction.",
      symptoms: [
        "High store bounce rate (over 50%) on the home page",
        "Low average units per order (UPO) from store traffic",
        "Zero traffic flowing to your high-margin sub-category pages",
      ],
      accentGradient: "from-red-500/80 to-orange-500/80",
    },
    {
      index: "02",
      icon: <Monitor size={18} />,
      label: "COMPETITOR LEAK",
      status: "VISITOR DRAIN",
      statusColor: "text-orange-500 bg-orange-500/10 border-orange-500/20",
      headline: "The Exit Ramp: Your store is sending traffic to competitors.",
      subline: "Engagement analysis.",
      body: "Amazon's default interface is designed to keep shoppers browsing OTHER brands. Your Store is the only sanctuary where competitor ads are banned. If you don't maximize this 'Ad-Free Zone' with compelling content, shoppers will retreat back to the ad-heavy search results.",
      symptoms: [
        "Low 'Store Orders' attributed in your Amazon Insights dashboard",
        "Minimal dwell time (shoppers leave in under 30 seconds)",
        "Static, text-heavy pages that fail to compete with mobile distractions",
      ],
      featured: true,
      accentGradient: "from-orange-500 to-amber-500",
    },
    {
      index: "03",
      icon: <Zap size={18} />,
      label: "IDENTITY VACUUM",
      status: "TEMPLATE BLEND",
      statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      headline: "The Template Trap: You look like every other generic brand.",
      subline: "Authority x-ray.",
      body: "Using Amazon's basic 'drag-and-drop' modules without custom creative is a conversion killer. You're an authority, not a template. We use custom-coded graphics and lifestyle video integration to build a 'Brand Destination' that commands premium pricing.",
      symptoms: [
        "Storefront is visually indistinguishable from lower-priced rivals",
        "Lack of high-fidelity video or interactive content modules",
        "Zero 'Social Proof' or 'Brand Mission' elements in the UX flow",
      ],
      accentGradient: "from-emerald-500/80 to-teal-500/80",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 lg:py-32 bg-white relative overflow-hidden">
      <style>{`
        .signal-block {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .signal-block.revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 relative z-10">
        <div className="mb-12 lg:mb-20">
          <SectionLabel>Store Diagnostic</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 mt-4">
            <h2
              className="text-3xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              The symptoms<br />
              of a weak destination.
            </h2>
            <p className="text-zinc-500 text-sm lg:text-base font-light leading-relaxed max-w-md lg:text-right">
              A basic storefront is a missed opportunity. Identify the leaks in your store's architecture before they cost you your most valuable traffic.
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
                    [STORE_SCAN_{s.index}]
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
                          STORE_SIGNAL: {s.subline.toUpperCase()}
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
                              ARCHITECTURE_SYMPTOMS
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
                <p className="text-[9px] lg:text-[11px] font-black uppercase tracking-[0.35em] lg:tracking-[0.4em] text-orange-500 mb-1.5">Standardize Your Destination</p>
                <p className="text-zinc-400 text-[13px] lg:text-base font-light leading-relaxed max-w-lg">
                  Stop settling for basic templates. Our Storefront architecture provides the conversion framework for 100% brand control and catalog discovery.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-white text-zinc-950 w-full md:w-auto px-6 lg:px-10 py-3.5 lg:py-5 rounded-full text-[10px] lg:text-[12px] font-black uppercase tracking-[0.2em] lg:tracking-[0.25em] hover:bg-orange-500 hover:text-white hover:shadow-[0_20px_50px_rgba(249,115,22,0.3)] transition-all duration-500 shrink-0 active:scale-[0.97] no-underline"
            >
              Get Free Store Audit
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   07 — PACKAGES / PRICING
   ═══════════════════════════════════════════════ */
// Packages removed

/* ═══════════════════════════════════════════════
   08 — THE PROCESS
   ═══════════════════════════════════════════════ */
function OurProcess() {
  const steps = [
    { num: "01", title: "Brand Discovery",    desc: "We review your catalog, brand assets, and goals. You complete a quick questionnaire covering target audience and Store objectives.",  icon: <FileText size={18} /> },
    { num: "02", title: "Strategy & Sitemap", desc: "We architect your Store structure — homepage, sub-category pages, and product spotlights — for maximum navigation clarity and conversion.", icon: <LayoutGrid size={18} /> },
    { num: "03", title: "Design & Build",     desc: "Full Store design: custom templates, image editing, copy, vanity URL setup, and mobile optimization for every page.",                    icon: <Paintbrush size={18} /> },
    { num: "04", title: "Review & Launch",    desc: "You review and approve. We finalize assets, configure analytics, and provide a complete upload guide so you can go live confidently.",  icon: <CheckCircle2 size={18} /> },
  ];

  return (
    <section className="pt-16 pb-32 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Our Process</SectionLabel>
            <h2
              className="text-5xl lg:text-7xl font-black tracking-tighter text-zinc-900 leading-[0.9] uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              How it{" "}
              <span className="text-zinc-300 italic font-light lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>works.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            From brand discovery to a live Amazon Store — a clear, collaborative four-step process.
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

        <div className="mt-12 flex items-center justify-between p-8 bg-zinc-50 rounded-[32px] border border-zinc-100">
          <div className="flex items-center gap-4 text-zinc-400">
            <Terminal size={16} />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Store_Build_Process_01-04</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest italic">Collaborative from strategy to launch</span>
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
    { q: "Why is the Amazon Brand Store homepage so important?",        a: "Your homepage is the first thing shoppers see when they visit your Store. It sets the tone for your entire brand, showcases your bestsellers, and determines whether visitors explore further or leave. A well-designed homepage significantly increases pages-per-visit and conversion." },
    { q: "How do I find an Amazon Brand Store?",                         a: "Shoppers can find your Store through your vanity URL (amazon.com/yourbrand), via the brand name link on any of your product listings, or through Sponsored Brand ads. We help you set up and optimize all of these entry points." },
    { q: "Are Amazon Brand Store and Amazon Storefront the same thing?", a: "Yes — they're the same thing. Amazon has used both names at different times. Whether you see 'Brand Store' or 'Storefront', it refers to your dedicated branded pages within Amazon, accessible to all Brand Registry members." },
    { q: "How do I check my Amazon Brand Store metrics?",               a: "Metrics are available in Seller Central under 'Stores' → 'Manage Stores' → 'Insights'. You can track daily visitors, page views, sales attributed to the Store, and units sold. We configure this tracking as part of every Store build." },
    { q: "How does a well-designed Brand Store increase sales?",         a: "A professional Store keeps shoppers on your brand longer, reduces competitor exposure, enables strategic cross-selling through sub-category pages, and builds the trust that pushes hesitant buyers to convert. Brands with optimized Stores consistently see 20–40% higher revenue per visitor." },
    { q: "What are the key elements of a high-performing Amazon Brand Store?", a: "The highest-converting Stores have: a compelling hero banner with clear value proposition, intuitive navigation with sub-category pages, strategically placed bestseller and new arrival sections, lifestyle imagery that supports the brand story, mobile-optimized layouts, and a vanity URL for external traffic." },
    { q: "How does a strong Brand Store impact my SEO and discoverability?", a: "Amazon indexes your Store for internal search, and your vanity URL helps with external Google SEO. Running Sponsored Brand ads that point to your Store (rather than individual listings) also improves organic ranking signals for your entire catalog." },
  ];

  return (
    <section className="py-32 bg-[#fafafa] border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>FAQ</SectionLabel>
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-10 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Frequently<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>asked.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-12">
              Everything you need to know about Amazon Brand Store design before getting started.
            </p>
            <div className="p-6 bg-white rounded-3xl border border-zinc-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Have More Questions?</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Every catalog and brand has different needs. Our team answers every question directly — no canned responses.
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
                className={`border transition-all duration-500 rounded-[24px] overflow-hidden shadow-none ${
                  openIndex === i
                    ? "bg-white border-orange-500/30 shadow-orange-500/5"
                    : "bg-white/50 border-zinc-100 hover:border-zinc-200"
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
                  <div className="px-6 sm:px-8 pb-8 pt-0">
                    <div className="text-[13px] sm:text-[14px] text-zinc-500 leading-relaxed font-light border-l-2 border-orange-500/20 pl-4 sm:pl-6">{faq.a}</div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between px-6 sm:px-8 py-6 bg-zinc-900 rounded-[24px] text-white gap-6">
              <div className="flex items-center justify-center gap-4">
                <Terminal size={16} className="text-orange-500" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold">More_Questions?</span>
              </div>
              <Link href="/contact" className="flex items-center justify-center sm:justify-end gap-2 group no-underline">
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
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Previous Design Service</p>
          <Link href="/service/design/brand-story" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start uppercase">
              <ArrowRight className="mr-3 group-hover:-translate-x-3 transition-transform rotate-180 size-6 md:size-8 shrink-0" />
              Brand Story
            </h4>
          </Link>
        </div>
        <div className="hidden md:block w-px h-16 bg-zinc-100" />
        <div className="text-center md:text-right w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Design Service</p>
          <Link href="/service/design/listing-image-systems" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end uppercase">
              Listing Images
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
export default function BrandStorePage() {
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <BrandStoreHero />
      <MetricsStrip />
      <WhyBrandStores />
      <ShowcaseSection />
      <ExamplesGallery />
      <TrafficComparison />
      <WhoItsFor />
      <OurProcess />

      <ServicePricing
        serviceName="Brand Store"
        serviceSlug="design/brand-store"
        serviceSubtitle="Custom Amazon storefronts"
        serviceDescription="A professionally designed Amazon Brand Store with custom sub-pages, product architecture, and vanity URL — zero competitor ads, all your products."
        serviceDeliverables={[
          "Custom home page design",
          "Visual catalog architecture pages",
          "Vanity URL storefront config",
          "Competitor ad blocker design",
          "Multi-page store navigation"
        ]}
        serviceTimeline="21 Days"
        serviceCtaLabel="Design Brand Store"
      />

      <FAQ />
      <BrandStoreCTA />
      <FooterNav />
    </div>
  );
}