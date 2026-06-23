"use client";

import React, { useLayoutEffect, useRef, useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight, ArrowUpRight, Search,
  LayoutGrid, Layers, BookOpen, Store,
  Camera, Sparkles, ChevronDown, TrendingUp
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  PORTFOLIO_ITEMS, FILTERS as FILTERS_DATA, FILTER_STATS,
  MATERIALS,
} from "@/data/portfolioData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ═══════════════════════════════════════════════
   Hydrate filter icons from data module
   ═══════════════════════════════════════════════ */
const ICON_MAP = { LayoutGrid, Camera, Layers, Search, BookOpen, Store, Sparkles };
const FILTERS = FILTERS_DATA.map(f => ({
  ...f,
  icon: (() => { const I = ICON_MAP[f.icon]; return I ? <I size={13} /> : <LayoutGrid size={13} />; })(),
}));

/* ═══════════════════════════════════════════════
   CARD COMPONENT
   ═══════════════════════════════════════════════ */
function PortfolioCard({ item }) {
  // Get all unique images for this project to use as thumbnail variants
  const previewImages = [];
  const seenSrcs = new Set();

  if (item.src) {
    seenSrcs.add(item.src);
    previewImages.push({ src: item.src });
  }

  (item.gallery || []).forEach(img => {
    if (img && img.src && !seenSrcs.has(img.src)) {
      seenSrcs.add(img.src);
      previewImages.push(img);
    }
  });

  if (item.serviceDetails) {
    Object.values(item.serviceDetails).forEach(svc => {
      if (svc && Array.isArray(svc.images)) {
        svc.images.forEach(img => {
          if (img && img.src && !seenSrcs.has(img.src)) {
            seenSrcs.add(img.src);
            previewImages.push(img);
          }
        });
      }
    });
  }

  const [activeSrc, setActiveSrc] = useState(item.src);

  // Sync state if item changes
  useEffect(() => {
    setActiveSrc(item.src);
  }, [item]);

  return (
    <Link
      href={`/portfolio/${item.id}`}
      prefetch={false}
      className="portfolio-card group block relative overflow-hidden rounded-[20px] sm:rounded-[28px] border border-zinc-200/50 dark:border-zinc-800/80 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-orange-500/30 hover:shadow-[0_20px_40px_rgba(249,115,22,0.06)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.45)] bg-[#0c0c0e]"
    >
      {/* Edge-to-Edge Image Container */}
      <div className="relative w-full aspect-square bg-[#fafafa] dark:bg-zinc-950 overflow-hidden">
        <img
          src={activeSrc}
          alt={item.outcome}
          loading="lazy"
          className="w-full h-full block object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
        />

        {/* Text Overlay - Clean white/orange typography on subtle dark gradient */}
        <div className="absolute inset-x-0 bottom-0 pt-8 pb-3 px-3.5 sm:px-4 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/50 to-transparent z-10 flex flex-col gap-0.5 text-white pointer-events-none">
          {/* Brand Name & Niche */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[7.5px] sm:text-[8px] font-mono text-zinc-300 uppercase tracking-widest font-bold">
              {item.brandName} · {item.niche}
            </span>
            <span className="text-[6.5px] font-mono text-zinc-400 uppercase tracking-wider">
              {item.id}
            </span>
          </div>

          {/* Outcome Metric */}
          <h4
            className="text-[12.5px] sm:text-[13.5px] font-black uppercase tracking-tight text-white group-hover:text-orange-400 transition-colors duration-300 flex items-center justify-between pointer-events-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span>{item.outcome}</span>
            <span className="w-5.5 h-5.5 rounded-full bg-white/15 border border-white/10 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:rotate-45 transition-all duration-500 shrink-0 shadow-sm">
              <ArrowUpRight size={11} className="text-white" />
            </span>
          </h4>
        </div>

        {/* Floating Tag - Top Left */}
        <div className="absolute top-2 left-3 z-20">
          <span className="bg-orange-500/95 backdrop-blur-sm text-white text-[7px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-[0_2px_8px_rgba(249,115,22,0.3)] border border-orange-400/20">
            {item.category}
          </span>
        </div>
      </div>

      {/* Small dark card body at the bottom just to fit the variant thumbnails */}
      {previewImages.length > 1 && (
        <div className="px-2 pb-2.5 pt-0.5 sm:pb-3 sm:pt-1 flex items-center justify-center gap-1.5 flex-wrap z-20 relative">
          {previewImages.slice(0, 5).map((img, idx) => {
            const isSelected = activeSrc === img.src;
            return (
              <div
                key={idx}
                onMouseEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveSrc(img.src);
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveSrc(img.src);
                }}
                className={`w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] rounded-md overflow-hidden border transition-all duration-200 cursor-pointer shrink-0 bg-zinc-950
                  ${isSelected ? "border-orange-500 scale-105 shadow-[0_0_8px_rgba(249,115,22,0.4)]" : "border-white/20 hover:border-white/50"}`}
              >
                <img
                  src={img.src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
          {previewImages.length > 5 && (
            <div className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] rounded-md overflow-hidden border border-white/15 bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="text-[7.5px] sm:text-[9px] font-bold text-zinc-300">
                +{previewImages.length - 5}
              </span>
            </div>
          )}
        </div>
      )}
    </Link>
  );
}

/* ═══════════════════════════════════════════════
   MASONRY GRID
   ═══════════════════════════════════════════════ */
function MasonryGrid({ items }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Hero content
      gsap.fromTo(".hero-el",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: "expo.out", delay: 0.2 }
      );

      // Featured stat card
      gsap.fromTo(".hero-stat-card",
        { opacity: 0, scale: 0.9, x: 20 },
        { opacity: 1, scale: 1, x: 0, duration: 1.5, ease: "power4.out", delay: 0.4 }
      );

      // Grid items
      gsap.fromTo(
        ".portfolio-card",
        { opacity: 0, y: 36, filter: "blur(8px)", scale: 0.97 },
        {
          opacity: 1, y: 0, filter: "blur(0px)", scale: 1,
          duration: 0.75, stagger: 0.07, ease: "expo.out", overwrite: true,
          scrollTrigger: {
            trigger: ".portfolio-card",
            start: "top 95%"
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mb-6">
          <Sparkles size={24} />
        </div>
        <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 mb-2">
          No items yet
        </h3>
        <p className="text-zinc-400 font-light text-sm">
          We are adding more work to this category soon.
        </p>
      </div>
    );
  }

  /* Distribute items across 4 columns with offsets */
  const c1d = items.filter((_, i) => i % 4 === 0);
  const c2d = items.filter((_, i) => i % 4 === 1);
  const c3d = items.filter((_, i) => i % 4 === 2);
  const c4d = items.filter((_, i) => i % 4 === 3);
  const c1m = items.filter((_, i) => i % 2 === 0);
  const c2m = items.filter((_, i) => i % 2 === 1);

  return (
    <div ref={containerRef} className="w-full min-h-[400px]">
      {/* Desktop: 4 columns */}
      <div className="hidden md:flex items-start gap-5 w-full">
        <div className="flex-1 flex flex-col gap-5">{c1d.map(item => <PortfolioCard key={item.id} item={item} />)}</div>
        <div className="flex-1 flex flex-col gap-5 mt-14">{c2d.map(item => <PortfolioCard key={item.id} item={item} />)}</div>
        <div className="flex-1 flex flex-col gap-5 -mt-4">{c3d.map(item => <PortfolioCard key={item.id} item={item} />)}</div>
        <div className="flex-1 flex flex-col gap-5 mt-8">{c4d.map(item => <PortfolioCard key={item.id} item={item} />)}</div>
      </div>
      {/* Mobile/Tablet: Single or Double based on viewport */}
      <div className="md:hidden flex flex-col gap-6 w-full">
        {items.map(item => <PortfolioCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}

// Extract unique niches from portfolio data
const NICHES = ["All Categories", ...new Set(PORTFOLIO_ITEMS.map(item => item.niche))].sort();

/* ═══════════════════════════════════════════════
   NICHE DROPDOWN (PRODUCT CATEGORY)
   ═══════════════════════════════════════════════ */
function NicheDropdown({ activeNiche, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.18em] transition-all duration-300 bg-white/50 backdrop-blur-sm text-zinc-900 border border-zinc-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:border-orange-500 hover:text-orange-500 whitespace-nowrap"
      >
        {activeNiche}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-zinc-100 overflow-hidden py-2 z-50 max-h-80 overflow-y-auto">
            {NICHES.map((niche) => {
              const isActive = activeNiche === niche;
              return (
                <button
                  key={niche}
                  onClick={() => { onSelect(niche); setIsOpen(false); }}
                  className={`w-full text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${isActive ? "text-orange-500 bg-orange-50/50" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}`}
                >
                  {niche}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   FILTER BAR
   ═══════════════════════════════════════════════ */
function FilterBar({ activeKey, onSelect }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0 sm:flex-wrap">
      {FILTERS.map((f) => {
        const isActive = activeKey === f.key;
        return (
          <button
            key={f.key}
            onClick={() => onSelect(f.key)}
            className={`shrink-0 flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.18em] transition-all duration-300 whitespace-nowrap border
              ${isActive
                ? "bg-zinc-900 text-white border-zinc-900 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)]"
                : "bg-white text-zinc-400 border-zinc-200 hover:text-zinc-900 hover:border-zinc-400"
              }`}
          >
            <span className={isActive ? "text-orange-400" : "text-zinc-400"}>{f.icon}</span>
            {f.label}
            {f.key === "Full Brand Package" && (
               <span className="bg-orange-500 text-white text-[7px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded-full ml-1">
                 Complete
               </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MATERIAL FILTER
   ═══════════════════════════════════════════════ */
function MaterialFilterBar({ activeMaterial, onSelect }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0 px-1 sm:px-0 mt-1.5 sm:mt-3 sm:flex-wrap">
      {MATERIALS.map((mat) => {
        const isActive = activeMaterial === mat;
        return (
             <button
               key={mat}
               onClick={() => onSelect(mat)}
               className={`shrink-0 whitespace-nowrap px-4 py-1.5 rounded-full text-[8.5px] sm:text-[9px] font-bold uppercase tracking-widest transition-all duration-300 border
                 ${isActive
                   ? "bg-white text-orange-500 border-orange-100 shadow-[0_4px_10px_rgba(249,115,22,0.1)]"
                   : "bg-transparent text-zinc-400 border-transparent hover:border-zinc-200 hover:text-zinc-600 hover:bg-black/5"
                 }`}
             >
               {mat}
             </button>
        )
      })}
    </div>
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

  const stats = FILTER_STATS[activeKey] || FILTER_STATS["all"];
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
      <section className="bg-zinc-950 pt-[80px] sm:pt-[60px] pb-20 relative overflow-hidden">
        <style>{`
          @keyframes spectrum-bar { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }
          @keyframes creative-orbit { 0% { transform: rotate(0deg) translateX(110px) rotate(0deg); } 100% { transform: rotate(360deg) translateX(110px) rotate(-360deg); } }
          @keyframes creative-orbit-inner { 0% { transform: rotate(0deg) translateX(70px) rotate(0deg); } 100% { transform: rotate(-360deg) translateX(70px) rotate(360deg); } }
          @keyframes lab-breathe { 0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.08); } 50% { box-shadow: 0 0 50px 15px rgba(249,115,22,0.04); } }
          @keyframes tile-enter { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes scan-portfolio { 0% { transform: translateY(-100%); opacity:0; } 10% { opacity:1; } 90% { opacity:1; } 100% { transform: translateY(100vh); opacity:0; } }
        `}</style>

        {/* Technical Blueprint Grid Accents */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(249,115,22,0.1),transparent_70%)]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.02] to-transparent pointer-events-none" style={{ animation: "scan-portfolio 12s linear infinite" }} />

        {/* Fine engineering alignment lines */}
        <div className="absolute top-0 bottom-0 left-[15%] w-[1px] bg-white/[0.03] pointer-events-none" />
        <div className="absolute top-0 bottom-0 left-[45%] w-[1px] bg-white/[0.03] pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-[25%] w-[1px] bg-white/[0.03] pointer-events-none" />

        {/* PORTFOLIO watermark */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[10%] font-black text-[90px] sm:text-[160px] md:text-[260px] uppercase tracking-tighter pointer-events-none select-none opacity-[0.02] whitespace-nowrap"
          style={{ fontFamily: "'Montserrat', sans-serif", WebkitTextStroke: "1px #fff", color: "transparent" }}
        >
          ENGINEERED
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7 lg:mt-[40px]">
              <div className="hero-el flex items-center gap-3 mb-8">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
                  <div className="w-6 h-[1px] bg-orange-500 self-center" />
                </div>
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.5em] text-orange-400">
                  Creative Output Protocol
                </span>
              </div>
              <h1
                className="hero-el text-[36px] sm:text-7xl lg:text-[88px] font-black tracking-tighter uppercase leading-[0.9] sm:leading-[0.82] mb-6 sm:mb-8 text-white"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Built for brands<br />
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-orange-500 lowercase tracking-tight">
                  built to last.
                </span>
              </h1>

              <div className="hero-el flex gap-6 mb-10">
                <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50" />
                <p className="text-zinc-400 font-light text-sm sm:text-lg leading-relaxed max-w-xl">
                  We build revenue-driving visual systems. Every pixel below was <span className="text-white font-medium">engineered to solve a specific conversion leak</span> — across listing images, A+ Content, Brand Stories, and full brand builds.
                </p>
              </div>

              {/* Trust badges - Styled to match current visual layout */}
              <div className="hero-el flex flex-wrap items-center gap-3 mb-10">
                {[
                  { val: "50+", label: "Brands Scaled" },
                  { val: "+84%", label: "Avg CVR Lift" },
                  { val: "100%", label: "Delivery Rate" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-zinc-900/40 border border-zinc-800/60 rounded-full px-4 py-2 hover:border-orange-500/20 transition-all duration-300">
                    <span className="text-[13px] font-black text-orange-500 tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>{b.val}</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">{b.label}</span>
                  </div>
                ))}
              </div>

              {/* Digital coordinate feed */}
              <div className="hero-el flex flex-wrap gap-x-8 gap-y-2 font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
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

            {/* Right: Creative Lab Dashboard */}
            <div className="lg:col-span-5 relative block mt-0 lg:mt-[70px] scale-[0.95] sm:scale-100 origin-top lg:origin-center">

              {/* Floating metric card — top right - Frosted Dark theme */}
              <div className="absolute -top-8 -right-2 lg:-right-4 bg-[#0c0c0e]/90 backdrop-blur-md rounded-[20px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-30 border border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-[0_8px_20px_rgba(249,115,22,0.35)]"><Sparkles size={18} /></div>
                  <div>
                    <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Output</p>
                    <p className="text-lg font-black text-white tracking-tighter leading-none">240+</p>
                  </div>
                </div>
              </div>

              {/* Floating metric card — bottom left - Frosted Dark theme */}
              <div className="absolute -left-4 lg:-left-10 bottom-[60px] bg-[#0c0c0e]/95 backdrop-blur-md rounded-2xl px-5 py-4 z-30 shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
                  <div>
                    <p className="text-[7px] font-mono font-bold uppercase tracking-[0.25em] text-zinc-500">Avg CVR Lift</p>
                    <p className="text-lg sm:text-xl font-black text-white leading-none tracking-tighter">+84%</p>
                  </div>
                </div>
              </div>

              {/* Main Dashboard - Frosted Card */}
              <div className="hero-stat-card bg-[#0c0c0e]/95 backdrop-blur-md rounded-[32px] shadow-[0_60px_120px_rgba(0,0,0,0.6)] border border-zinc-800/80 overflow-hidden relative" style={{ animation: "lab-breathe 6s ease-in-out infinite" }}>
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

                {/* Header */}
                <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-orange-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                    </div>
                    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Creative_Lab_v4</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-mono text-emerald-500/70 uppercase tracking-widest">LIVE</span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Creative Spectrum Analyzer */}
                  <div className="relative h-[180px] flex items-center justify-center mb-6">
                    {/* Outer orbit ring */}
                    <div className="absolute w-[220px] h-[220px] rounded-full border border-dashed border-white/[0.06]" />
                    <svg className="absolute w-[190px] h-[190px]" viewBox="0 0 190 190">
                      <circle cx="95" cy="95" r="90" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" />
                      <circle cx="95" cy="95" r="90" fill="none" stroke="url(#portfolio-grad)" strokeWidth="2" strokeDasharray="565" strokeDashoffset="85" strokeLinecap="round" transform="rotate(-90 95 95)" className="drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                      <defs>
                        <linearGradient id="portfolio-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f97316" />
                          <stop offset="50%" stopColor="#fbbf24" />
                          <stop offset="100%" stopColor="#f97316" />
                        </linearGradient>
                      </defs>
                    </svg>
                    {/* Inner ring */}
                    <div className="absolute w-[140px] h-[140px] rounded-full border border-white/[0.08]" />

                    {/* Orbiting dots */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div style={{ animation: "creative-orbit 12s linear infinite" }}>
                        <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_16px_rgba(249,115,22,0.8),0_0_40px_rgba(249,115,22,0.3)]" />
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div style={{ animation: "creative-orbit-inner 8s linear infinite" }}>
                        <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
                      </div>
                    </div>

                    {/* Center core */}
                    <div className="relative z-10 flex flex-col items-center">
                      <span className="text-3xl font-black text-white tracking-tighter leading-none">500+</span>
                      <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Projects</span>
                    </div>

                    {/* Spectrum bars around the core */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-end gap-[3px]">
                      {[0.4,0.7,1,0.6,0.9,0.5,0.8,1,0.3,0.7,0.6,0.9,0.4,0.8,0.5].map((h, i) => (
                        <div key={i} className="w-[3px] bg-gradient-to-t from-orange-500/60 to-orange-300/30 rounded-full origin-bottom" style={{ height: `${h * 28}px`, animation: `spectrum-bar ${1.5 + i * 0.15}s ease-in-out infinite`, animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                  </div>

                  {/* Service Output Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {[
                      { label: "Listing Images", count: "86", color: "text-orange-500" },
                      { label: "A+ Content", count: "54", color: "text-amber-400" },
                      { label: "Brand Stores", count: "32", color: "text-emerald-400" },
                    ].map((svc, i) => (
                      <div key={i} className="bg-zinc-900/30 border border-zinc-800/60 rounded-xl p-3 text-center hover:border-orange-500/20 transition-all" style={{ animation: `tile-enter 0.5s ease-out ${0.3 + i * 0.1}s both` }}>
                        <p className={`text-lg font-black tracking-tighter leading-none mb-1 ${svc.color}`}>{svc.count}</p>
                        <p className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest">{svc.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recent output log */}
                  <div className="bg-[#08080a] rounded-xl border border-zinc-850 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Recent Output</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[7px] font-mono text-emerald-500/60 uppercase tracking-widest">Streaming</span>
                      </div>
                    </div>
                    <div className="space-y-2 font-mono text-[9px]">
                      {[
                        { cmd: "brand_build", client: "NovaBiotics", result: "+820%", status: "text-emerald-400" },
                        { cmd: "listing_img", client: "PawPure", result: "4.6x ROAS", status: "text-orange-400" },
                        { cmd: "a_plus", client: "GlowVeil", result: "+78%", status: "text-amber-400" },
                        { cmd: "store_build", client: "Summit Gear", result: "+82% CTR", status: "text-emerald-400" },
                      ].map((log, i) => (
                        <div key={i} className="flex justify-between items-center" style={{ animation: `tile-enter 0.4s ease-out ${0.6 + i * 0.12}s both` }}>
                          <span className="text-zinc-500"><span className="text-orange-500/70">›</span> {log.cmd}(<span className="text-zinc-400">{log.client}</span>)</span>
                          <span className={`font-bold ${log.status}`}>{log.result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-white/[0.05] flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">{filteredItems.length} Projects Loaded</span>
                  </div>
                  <span className="text-[7px] font-mono text-zinc-700 uppercase tracking-widest">Lab_ID_ORBIT_CRE</span>
                </div>
              </div>

              {/* Ambient glow */}
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/8 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY FILTER BAR ── */}
      <div className="sticky top-0 sm:relative sm:top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-zinc-100 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.05)] sm:shadow-none transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-4 flex flex-col gap-2 sm:gap-3">
          {/* Row 1: Primary Tabs */}
          <FilterBar activeKey={activeKey} onSelect={handleCategorySelect} />

          <div className="w-full h-px bg-zinc-100/50 hidden sm:block"/>

          {/* Row 2: Secondary Metadata Filters */}
          <div className="flex items-center justify-between gap-3 overflow-x-auto no-scrollbar sm:overflow-visible">
            <div className="flex items-center gap-3 min-w-0">
               <div className="sm:hidden shrink-0">
                 <NicheDropdown activeNiche={activeNiche} onSelect={handleNicheSelect} />
               </div>
               <div className="hidden sm:block h-3 w-px bg-zinc-200" />
               <MaterialFilterBar activeMaterial={activeMaterial} onSelect={handleMaterialSelect} />
            </div>

            <div className="hidden sm:block shrink-0">
              <NicheDropdown activeNiche={activeNiche} onSelect={handleNicheSelect} />
            </div>
          </div>
        </div>
      </div>

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
