"use client";

import React, { useLayoutEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight, ArrowUpRight, Search,
  LayoutGrid, Layers, BookOpen, Store,
  Camera, Sparkles, TrendingUp
} from "lucide-react";
import gsap from "gsap";

import {
  PORTFOLIO_ITEMS, FILTERS as FILTERS_DATA, FILTER_STATS,
  MATERIALS
} from "@/data/portfolioData";
import MasonryGrid from "@/components/portfolio/MasonryGrid";
import PortfolioFilters from "@/components/portfolio/PortfolioFilters";

/* ═══════════════════════════════════════════════
   Hydrate filter icons from data module
   ═══════════════════════════════════════════════ */
const ICON_MAP = { LayoutGrid, Camera, Layers, Search, BookOpen, Store, Sparkles };
const FILTERS = FILTERS_DATA.map(f => ({
  ...f,
  icon: (() => { const I = ICON_MAP[f.icon]; return I ? <I size={13} /> : <LayoutGrid size={13} />; })(),
}));

const NICHES = ["All Categories", ...new Set(PORTFOLIO_ITEMS.map(item => item.niche))].sort();

/* ═══════════════════════════════════════════════
   DOT MATRIX ARROW ACCENT
   ═══════════════════════════════════════════════ */
function DotMatrixArrow() {
  const cols = 7;
  const rows = 9;
  
  const isActive = (r, c) => {
    // Shaft: solid vertical bar of width 3 (col 2, 3, 4) for rows 0 to 4
    if (r >= 0 && r <= 4 && c >= 2 && c <= 4) return true;
    
    // Arrowhead: a filled triangle pointing down from Row 5 to Row 8
    if (r === 5 && c >= 0 && c <= 6) return true;
    if (r === 6 && c >= 1 && c <= 5) return true;
    if (r === 7 && c >= 2 && c <= 4) return true;
    if (r === 8 && c === 3) return true;
    
    return false;
  };

  return (
    <svg width="168" height="216" viewBox="0 0 168 216" fill="none" className="opacity-60">
      <style>{`
        @keyframes arrow-flow-down {
          0%, 40%, 100% { fill: rgba(249, 115, 22, 0.25); }
          15% { fill: rgba(249, 115, 22, 0.9); }
        }
        .dot-active { animation: arrow-flow-down 1.6s infinite ease-in-out; }
      `}</style>
      {Array.from({ length: rows }).map((_, r) => (
        Array.from({ length: cols }).map((_, c) => {
          const active = isActive(r, c);
          return (
            <circle
              key={`${r}-${c}`}
              cx={c * 24 + 12}
              cy={r * 24 + 12}
              r={active ? 2.2 : 1}
              fill={active ? "rgba(249, 115, 22, 0.25)" : "rgba(255, 255, 255, 0.05)"}
              className={active ? "dot-active" : ""}
              style={active ? { animationDelay: `${r * 0.12}s` } : undefined}
            />
          );
        })
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   INNER PAGE — uses useSearchParams
   ═══════════════════════════════════════════════ */
function PortfolioPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawFilter = searchParams.get("filter") || "all";
  const rawMaterial = searchParams.get("material") || "All Materials";
  const activeMaterial = MATERIALS.includes(rawMaterial) ? rawMaterial : "All Materials";
  const rawNiche = searchParams.get("niche") || "All Categories";
  const activeNiche = NICHES.includes(rawNiche) ? rawNiche : "All Categories";

  const heroRef = useRef(null);

  useLayoutEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      // Hero content
      gsap.fromTo(".hero-el",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: "expo.out", delay: 0.2 }
      );

      // Featured stat badges
      gsap.fromTo(".hero-badge-card",
        { opacity: 0, scale: 0.95, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, stagger: 0.08, ease: "expo.out", delay: 0.5 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  /* normalise — map URL slug back to category key */
  const activeKey = FILTERS.find(f =>
    f.key.toLowerCase().replace(/\s+/g, "-") === rawFilter ||
    f.key === rawFilter ||
    rawFilter === "all" && f.key === "all"
  )?.key || "all";

  const filteredItems = PORTFOLIO_ITEMS.filter(item => {
    const matchCat = activeKey === "all" || item.category === activeKey || (item.services && item.services.includes(activeKey));
    const matchMat = activeMaterial === "All Materials" || item.materials?.some(m => m.toLowerCase().includes(activeMaterial.toLowerCase()));
    const matchNiche = activeNiche === "All Categories" || item.niche === activeNiche;
    return matchCat && matchMat && matchNiche;
  });

  const activeFilter = FILTERS.find(f => f.key === activeKey);

  function handleCategorySelect(key) {
    const slug = key === "all" ? "all" : encodeURIComponent(key.toLowerCase().replace(/\s+/g, "-"));
    const matParam = activeMaterial !== "All Materials" ? `&material=${encodeURIComponent(activeMaterial)}` : "";
    const nicheParam = activeNiche !== "All Categories" ? `&niche=${encodeURIComponent(activeNiche)}` : "";
    router.push(`/portfolio?filter=${slug}${matParam}${nicheParam}`, { scroll: false });
  }

  function handleMaterialSelect(mat) {
    const slug = activeKey === "all" ? "all" : encodeURIComponent(activeKey.toLowerCase().replace(/\s+/g, "-"));
    const matParam = mat !== "All Materials" ? `&material=${encodeURIComponent(mat)}` : "";
    const nicheParam = activeNiche !== "All Categories" ? `&niche=${encodeURIComponent(activeNiche)}` : "";
    router.push(`/portfolio?filter=${slug}${matParam}${nicheParam}`, { scroll: false });
  }

  function handleNicheSelect(niche) {
    const slug = activeKey === "all" ? "all" : encodeURIComponent(activeKey.toLowerCase().replace(/\s+/g, "-"));
    const matParam = activeMaterial !== "All Materials" ? `&material=${encodeURIComponent(activeMaterial)}` : "";
    const nicheParam = niche !== "All Categories" ? `&niche=${encodeURIComponent(niche)}` : "";
    router.push(`/portfolio?filter=${slug}${matParam}${nicheParam}`, { scroll: false });
  }

  function clearAllFilters() {
    router.push(`/portfolio`, { scroll: false });
  }

  return (
    <div
      className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="bg-zinc-950 pt-[100px] sm:pt-[80px] pb-10 relative overflow-hidden"
        style={{ contain: "layout style paint" }}
      >
        <style>{`
          @keyframes scan-portfolio { 0% { transform: translateY(-100%); } 50% { transform: translateY(100%); } 100% { transform: translateY(-100%); } }
          .hero-accent-text { text-shadow: 0 0 40px rgba(249,115,22,0.15); }
        `}</style>

        {/* Technical Blueprint Grid Accents */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.015] to-transparent pointer-events-none" style={{ animation: "scan-portfolio 16s linear infinite", willChange: "transform" }} />

        {/* Fine engineering alignment lines */}
        <div className="absolute top-0 bottom-0 left-[12%] w-[1px] bg-white/[0.02] pointer-events-none" />
        <div className="absolute top-0 bottom-0 left-[48%] w-[1px] bg-white/[0.02] pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-[20%] w-[1px] bg-white/[0.02] pointer-events-none" />

        {/* Telemetry Accents */}
        <div className="absolute top-28 left-8 font-mono text-[7px] text-zinc-500/40 tracking-[0.25em] uppercase select-none hidden lg:block pointer-events-none">
          [SYS_PROTOCOL.LOC] 40.7128° N / 74.0060° W
        </div>
        <div className="absolute top-28 right-8 font-mono text-[7px] text-zinc-500/40 tracking-[0.25em] uppercase select-none hidden lg:block pointer-events-none">
          [CREATIVE_LAB.V4] SYS_ACTIVE
        </div>
        <div className="absolute bottom-8 left-8 font-mono text-[7px] text-zinc-500/40 tracking-[0.25em] uppercase select-none hidden lg:block pointer-events-none">
          [METRIC_INTEGRITY] OK_100%
        </div>

        {/* Dot Matrix Orange Chevron Arrows */}
        <div className="absolute left-[72px] top-[144px] hidden xl:block pointer-events-none select-none">
          <DotMatrixArrow />
        </div>
        <div className="absolute right-[72px] top-[144px] hidden xl:block pointer-events-none select-none">
          <DotMatrixArrow />
        </div>

        {/* PORTFOLIO watermark */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[10%] font-black text-[90px] sm:text-[160px] md:text-[260px] uppercase tracking-tighter pointer-events-none select-none opacity-[0.015] whitespace-nowrap"
          style={{ fontFamily: "'Montserrat', sans-serif", WebkitTextStroke: "1.5px #fff", color: "transparent" }}
        >
          ENGINEERED
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 flex justify-center">
          <div className="flex flex-col items-center w-full max-w-4xl">
            <div className="lg:mt-[15px] flex flex-col items-center">
              
              {/* Protocol Badge Chip */}
              <div className="hero-el flex justify-center items-center mb-6">
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-white/[0.06] shadow-lg">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  <span className="font-mono text-[8px] font-extrabold uppercase tracking-[0.3em] text-orange-400">
                    Creative Output Protocol // ACTIVE
                  </span>
                </div>
              </div>

              {/* Enhanced Title */}
              <h1
                className="hero-el text-[36px] sm:text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9] sm:leading-[0.82] mb-6 sm:mb-8 text-center"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span className="bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                  Built for brands
                </span>
                <br />
                <span 
                  style={{ fontFamily: "'Playfair Display', serif" }} 
                  className="italic font-light bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 bg-clip-text text-transparent lowercase tracking-tight drop-shadow-[0_2px_15px_rgba(249,115,22,0.2)]"
                >
                  built to last.
                </span>
              </h1>

              {/* Subtitle */}
              <div className="hero-el flex justify-center mb-8">
                <p className="text-zinc-300 font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl text-center">
                  We build revenue-driving visual systems. Every pixel below was <span className="text-white font-medium hero-accent-text">engineered to solve a specific conversion leak</span> — across listing images, A+ Content, Brand Stories, and full brand builds.
                </p>
              </div>

              {/* High-Fidelity Glassmorphic Stat Cards */}
              <div className="hero-el flex flex-wrap justify-center items-center gap-4 mb-10 w-full">
                
                {/* Stat Card 1: Brands Scaled */}
                <div className="hero-badge-card flex items-center gap-3 bg-zinc-900/70 border border-white/[0.05] rounded-2xl px-5 py-3.5 hover:border-orange-500/30 hover:bg-zinc-900/80 transition-colors duration-300 group/badge">
                  <svg className="w-6 h-6 text-orange-500/70 group-hover/badge:text-orange-500 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="5" r="2.5" fill="currentColor" />
                    <circle cx="5" cy="18" r="2" />
                    <circle cx="19" cy="18" r="2" />
                    <line x1="12" y1="7.5" x2="6.5" y2="16.5" strokeDasharray="2 2" />
                    <line x1="12" y1="7.5" x2="17.5" y2="16.5" strokeDasharray="2 2" />
                    <line x1="7" y1="18" x2="17" y2="18" strokeDasharray="1 1" />
                  </svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[15px] font-black text-orange-500 tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>50+</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400 mt-0.5">Brands Scaled</span>
                  </div>
                </div>

                {/* Stat Card 2: Avg CVR Lift */}
                <div className="hero-badge-card flex items-center gap-3 bg-zinc-900/70 border border-white/[0.05] rounded-2xl px-5 py-3.5 hover:border-orange-500/30 hover:bg-zinc-900/80 transition-colors duration-300 group/badge">
                  <svg className="w-10 h-6 text-emerald-500" viewBox="0 0 40 24" fill="none">
                    <path d="M2 18 Q 10 16, 18 10 T 38 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M2 18 Q 10 16, 18 10 T 38 4 L 38 22 L 2 22 Z" fill="url(#spark-grad)" opacity="0.15" />
                    <circle cx="38" cy="4" r="2.5" fill="#10b981" />
                    <defs>
                      <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[15px] font-black text-orange-500 tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>+84%</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400 mt-0.5">Avg CVR Lift</span>
                  </div>
                </div>

                {/* Stat Card 3: Delivery Rate */}
                <div className="hero-badge-card flex items-center gap-3 bg-zinc-900/70 border border-white/[0.05] rounded-2xl px-5 py-3.5 hover:border-orange-500/30 hover:bg-zinc-900/80 transition-colors duration-300 group/badge">
                  <svg className="w-6 h-6 text-orange-500" viewBox="0 0 36 36">
                    <path
                      className="text-zinc-800"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-orange-500"
                      strokeWidth="3"
                      strokeDasharray="100, 100"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path d="M13 18.5 l 3.5 3.5 l 7 -7" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[15px] font-black text-orange-500 tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>100%</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400 mt-0.5">Delivery Rate</span>
                  </div>
                </div>

              </div>

              {/* Digital coordinate feed */}
              <div className="hero-el flex flex-wrap justify-center gap-x-8 gap-y-2 font-mono text-[9px] text-zinc-500 uppercase tracking-widest pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Lab_Status: Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={10} className="text-orange-500/50" />
                  <span>Output_Rate: 98.7%</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── SHARED PORTFOLIO FILTERS ── */}
      <PortfolioFilters
        activeKey={activeKey}
        activeMaterial={activeMaterial}
        activeNiche={activeNiche}
        onCategorySelect={handleCategorySelect}
        onMaterialSelect={handleMaterialSelect}
        onNicheSelect={handleNicheSelect}
        isSticky={true}
      />

      {/* ── ACTIVE FILTER CONTEXT BAR ── */}
      {(activeKey !== "all" || activeMaterial !== "All Materials" || activeNiche !== "All Categories") && (
        <div className="bg-orange-500/[0.06] border-b border-orange-500/10">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="text-orange-500">{activeFilter?.icon || <LayoutGrid size={13} />}</span>
              <div>
                <span className="text-sm font-black text-zinc-900 uppercase tracking-tight">
                  {activeFilter?.label || "All Work"}
                  {activeMaterial !== "All Materials" ? ` · ${activeMaterial}` : ""}
                  {activeNiche !== "All Categories" ? ` · ${activeNiche}` : ""}
                </span>
                <span className="text-zinc-400 text-sm font-light ml-3">
                  — {filteredItems.length} project{filteredItems.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
            <button
              onClick={clearAllFilters}
              className="text-[10px] font-bold text-zinc-400 hover:text-zinc-900 uppercase tracking-widest transition-colors flex items-center gap-1.5"
            >
              ← View all work
            </button>
          </div>
        </div>
      )}

      {/* ── GRID ── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <MasonryGrid items={filteredItems} key={activeKey} />
      </div>

      {/* ── CATEGORY QUICK LINKS (when viewing All) ── */}
      {activeKey === "all" && (
        <div className="bg-white border-t border-zinc-100 py-16">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-[2px] bg-orange-500" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
                Browse by Service
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {FILTERS.filter(f => f.key !== "all").map((f) => {
                const count = PORTFOLIO_ITEMS.filter(item => item.category === f.key).length;
                const slug = encodeURIComponent(f.key.toLowerCase().replace(/\s+/g, "-"));
                return (
                  <Link
                    key={f.key}
                    href={`/portfolio?filter=${slug}`}
                    prefetch={false}
                    className="group relative bg-[#fafafa] hover:bg-zinc-950 border border-zinc-100 hover:border-orange-500/20 rounded-[24px] p-5 flex flex-col gap-3 transition-all duration-500 no-underline overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                      {f.icon}
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-tight text-zinc-900 group-hover:text-white transition-colors leading-tight mb-1">
                        {f.label}
                      </p>
                      <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
                        {count} project{count !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── BOTTOM CTA BANNER ── */}
      <div className="bg-[#fafafa] border-t border-zinc-100 py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-zinc-100 bg-white">
            {/* Dark stat row */}
            <div className="bg-zinc-950 px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-orange-500 font-black text-3xl tracking-tighter">+68%</span>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 leading-tight">
                    Higher<br />Conversion
                  </p>
                </div>
              </div>
              <div className="w-px h-10 bg-white/[0.06] hidden sm:block shrink-0" />
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                Amazon listings with{" "}
                <span className="text-white font-medium">3D renders, premium A+ Content, and Brand Stores</span>{" "}
                consistently convert 40–68% more than standard photography and text descriptions.
              </p>
            </div>

            {/* CTA row */}
            <div className="px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
              <div>
                <p className="font-black text-zinc-900 uppercase tracking-tight text-[15px] mb-1">
                  Ready to add your brand to this list?
                </p>
                <p className="text-zinc-400 text-sm font-light">
                  Book a free 15-min strategy call — we'll audit your current creative and show you exactly what is holding your listing back.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
                <Link
                  href="/portfolio?filter=full-brand-package"
                  prefetch={false}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-black text-[10px] uppercase tracking-widest px-6 py-3.5 rounded-2xl no-underline transition-all duration-300 whitespace-nowrap"
                >
                  See Full Packages <ArrowUpRight size={12} />
                </Link>
                <Link
                  href="/contact"
                  prefetch={false}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-500 hover:bg-zinc-900 text-white font-black text-[10px] uppercase tracking-widest px-6 py-3.5 rounded-2xl no-underline transition-all duration-300 whitespace-nowrap"
                >
                  Book Free Call <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE EXPORT — Suspense wraps useSearchParams
   ═══════════════════════════════════════════════ */
export default function PortfolioPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Loading portfolio</p>
        </div>
      </div>
    }>
      <PortfolioPageInner />
    </Suspense>
  );
}
