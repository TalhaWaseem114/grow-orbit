"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, X, SlidersHorizontal, Check, RotateCcw } from "lucide-react";
import gsap from "gsap";
import { PORTFOLIO_ITEMS } from "@/data/portfolioData";

export default function OrbitPortfolioSection({ initialCategory = "All", isGetStarted = false }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);
  const [activeMaterial, setActiveMaterial] = useState("All Materials");
  const [activeNiche, setActiveNiche] = useState("All Categories");
  const [isNicheOpen, setIsNicheOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Disable body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileDrawerOpen]);

  const containerRef = useRef(null);

  /* Use first 12 items from shared data for better filtering variety */
  const limit = isGetStarted ? 12 : 16;
  const portfolioItems = PORTFOLIO_ITEMS.slice(0, limit).map(p => ({
    id: p.id,
    src: p.src,
    category: p.category,
    niche: p.niche,
    brandName: p.brandName,
    outcome: p.outcome,
    services: p.services || [],
    badgeValue: p.badge.value,
    badgeLabel: p.badge.label.toUpperCase(),
    tags: p.tags.slice(0, 2).map(t => t.toUpperCase()),
    materials: p.materials || [],
    isDark: p.isDark,
  }));

  const categories = [
    { id: "All", label: "All" },
    { id: "Full Brand Package", label: "Full Brand Package" },
    { id: "Listing Images", label: "Listing Images" },
    { id: "A+ Content", label: "A+ Content" },
    { id: "Brand Story", label: "Brand Story" },
    { id: "Main Image CTR", label: "Main Image CTR" }
  ];
  const materialsList = ["All Materials", "Plastic", "Steel", "Glass", "Wood", "Cardboard"];
  const nichesList = ["All Categories", ...new Set(PORTFOLIO_ITEMS.map(item => item.niche))].sort();

  const filteredPortfolio = portfolioItems.filter((item) => {
    const matchCategory = activeCategory === "All" || item.category === activeCategory || (item.services && item.services.includes(activeCategory));
    const matchMaterial = activeMaterial === "All Materials" || item.materials.some((mat) => mat.toLowerCase().includes(activeMaterial.toLowerCase()));
    const matchNiche = activeNiche === "All Categories" || item.niche === activeNiche;
    return matchCategory && matchMaterial && matchNiche;
  });

  const hasActiveFilters = activeCategory !== "All" || activeMaterial !== "All Materials" || activeNiche !== "All Categories";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".portfolio-card",
        {
          opacity: 0,
          y: 40,
          filter: "blur(10px)",
          scale: 0.98
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "expo.out",
          overwrite: true
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeCategory, activeMaterial, activeNiche]);

  const renderCard = (item, index) => {
    const isDark = item.isDark !== undefined ? item.isDark : (item.category === "A+ Content" || item.id.includes("ap-"));
    return (
      <Link href={`/portfolio/${item.id}`} key={`${item.id}-${index}`} prefetch={false} className="portfolio-card group relative will-change-[transform,opacity,filter] no-underline block">
        <div className={`relative rounded-[24px] sm:rounded-[28px] overflow-hidden flex flex-col transition-all duration-500
          shadow-[0_15px_40px_-10px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.12)] hover:-translate-y-1
          ${isDark
            ? "bg-zinc-950 border border-white/[0.07]"
            : "bg-white border border-zinc-100"
          }`}
        >
          {/* IMAGE CONTAINER */}
          <div className="relative w-full overflow-hidden bg-zinc-100/50 flex items-center justify-center aspect-square">
            <img
              src={item.src}
              alt={item.brandName}
              loading="lazy"
              decoding="async"
              className="w-full h-full block group-hover:scale-105 transition-transform duration-700 ease-out object-contain"
            />
            
            {/* Materials tag TR */}
            <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1.5">
              {item.materials?.map((mat, i) => (
                <span key={i} className="bg-black/40 backdrop-blur-md border border-white/20 text-white rounded-md px-1.5 py-0.5 text-[6px] font-bold uppercase tracking-widest shadow-sm">
                  {mat}
                </span>
              ))}
            </div>

            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          <div className="p-4 sm:p-5 flex flex-col gap-1.5 relative">
            <h3 className="text-orange-500 font-black text-xl sm:text-[22px] uppercase tracking-tighter leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {item.outcome}
            </h3>

            <p className={`text-[10px] sm:text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
              {item.niche}
            </p>

            {/* Service Badges */}
            <div className="flex flex-wrap gap-1 mt-auto pt-1">
              {item.services?.map((svc, i) => (
                <span key={i} className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.12em] px-2 py-1 rounded-lg border whitespace-nowrap transition-all duration-300 ${isDark ? "border-white/[0.08] text-zinc-500 hover:text-zinc-300 hover:border-white/20" : "border-zinc-200 text-zinc-400 hover:text-zinc-600 hover:border-zinc-400"}`}>
                  {svc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section id="portfolio" className="py-28 bg-[#fafafa] border-t border-zinc-100 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="relative">
          {/* Large Background Watermark */}
          <div
            className="absolute top-[30px] right-0 rotate-90 origin-center translate-x-[40%] sm:top-[20px] sm:left-0 sm:right-auto sm:rotate-0 sm:origin-center sm:-translate-y-[70%] sm:translate-x-0 font-black text-[45px] sm:text-[80px] md:text-[140px] uppercase tracking-tighter opacity-[0.05] pointer-events-none select-none whitespace-nowrap z-0"
            style={{
              fontFamily: "'Oswald', sans-serif",
              WebkitTextStroke: "1.5px rgb(0, 0, 0)",
              color: "transparent"
            }}
          >
            PORTFOLIO
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 relative z-10">
            <div className="max-w-xl">
              {/* Eyebrow — App Style */}
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-orange-500/80 mb-3">03 / Portfolio</p>
              <h2
                className="text-zinc-900 text-3xl sm:text-4xl md:text-[44px] font-black uppercase tracking-tighter leading-[1.1] mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Our Work in <span className="text-zinc-300 italic font-normal lowercase tracking-normal text-[32px] sm:text-[38px] md:text-[46px]" style={{ fontFamily: "'Playfair Display', serif" }}>Real-Time.</span>
              </h2>
            </div>
            {/* Desktop version - hidden on mobile */}
            <Link
              href="/portfolio"
              prefetch={false}
              className="hidden md:flex group shrink-0 justify-center items-center gap-2 w-auto bg-zinc-900 hover:bg-orange-500 text-white font-bold text-[11px] uppercase tracking-widest px-8 py-3 rounded-full transition-all duration-300 no-underline shadow-[0_10px_20px_rgba(0,0,0,0.05)] active:scale-[0.98]"
            >
              View Full Portfolio <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Mobile Sticky version */}
        <div className="md:hidden sticky top-[74px] z-[40] mb-6 px-2">
          <button
            onClick={() => {
              const portfolioSection = document.getElementById("portfolio");
              if (portfolioSection) {
                portfolioSection.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="group flex justify-center items-center gap-2 w-full bg-zinc-900 hover:bg-orange-500 text-white font-bold text-[11px] uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 no-underline shadow-[0_15px_35px_rgba(0,0,0,0.2)]"
          >
            View Full Portfolio <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300" />
          </button>
        </div>

        {/* Desktop Filter Navigation */}
        <nav className="hidden md:flex mb-16 w-full flex-col items-center gap-4 relative z-20 px-2" aria-label="Desktop Portfolio Filter Navigation">
          <div className="w-auto bg-white/80 backdrop-blur-xl border border-white/40 p-2.5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex flex-col transition-all duration-500">
            {/* Service Filter */}
            <div className="flex items-center gap-1 flex-wrap justify-center relative mb-2" aria-label="Filter by Service Type">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 whitespace-nowrap px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 relative after:absolute after:-inset-y-1.5 after:-inset-x-1 ${activeCategory === cat.id ? "bg-black text-white shadow-lg" : "text-zinc-400 hover:text-zinc-900 bg-transparent"}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Secondary Filters Grid */}
            <div className="flex flex-row items-center justify-center gap-6 border-t border-zinc-100 pt-4">
              {/* Material Filter */}
              <div className="flex items-center gap-1" aria-label="Filter by Material">
                {materialsList.map((mat) => (
                  <button key={mat} onClick={() => setActiveMaterial(mat)} className={`shrink-0 whitespace-nowrap px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 relative after:absolute after:-inset-y-2.5 after:-inset-x-1 ${activeMaterial === mat ? "bg-white text-orange-500 border-orange-100 shadow-[0_4px_10px_rgba(249,115,22,0.1)]" : "bg-transparent text-zinc-400 border-transparent hover:border-zinc-200 hover:text-zinc-600 hover:bg-black/5"}`}>{mat}</button>
                ))}
              </div>

              {/* Niche Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsNicheOpen(!isNicheOpen)}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-[8px] uppercase tracking-widest transition-all duration-300 bg-zinc-50 text-zinc-600 border border-zinc-200 hover:border-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 relative after:absolute after:-inset-y-2 after:-inset-x-1"
                  aria-haspopup="listbox"
                  aria-expanded={isNicheOpen}
                  aria-label="Filter by product category niche"
                >
                  {activeNiche}
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isNicheOpen ? "rotate-180" : ""}`} aria-hidden="true">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>

                {isNicheOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsNicheOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-zinc-100 overflow-hidden py-2 z-50 max-h-60 overflow-y-auto" role="listbox">
                      {nichesList.map((niche) => (
                        <button
                          key={niche}
                          onClick={() => { setActiveNiche(niche); setIsNicheOpen(false); }}
                          role="option"
                          aria-selected={activeNiche === niche}
                          className={`w-full text-left px-4 py-2.5 text-[9px] font-bold uppercase tracking-widest transition-colors focus-visible:bg-orange-50 focus-visible:text-orange-500 focus-visible:outline-none ${activeNiche === niche ? "text-orange-500 bg-orange-50" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}`}
                        >
                          {niche}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Filter Summary Bar */}
        <div className="md:hidden w-full mt-8 mb-14 relative z-20 px-2" aria-label="Mobile Portfolio Filter Summary">
          <div className="bg-white border border-zinc-100 rounded-2xl py-4 px-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex items-center justify-between gap-4">
            {/* Active filters summary */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 flex-1 pr-3">
              {!hasActiveFilters ? (
                <div className="flex items-center gap-2 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-zinc-500 font-black text-[11px] uppercase tracking-widest">All Projects</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 flex-nowrap">
                  {activeCategory !== "All" && (
                    <span className="bg-zinc-900 text-white rounded-full px-3 py-1.5 text-[9px] font-black uppercase tracking-wider whitespace-nowrap shrink-0 shadow-sm">
                      {activeCategory.split(" ").map(w => w[0]).join("").toUpperCase()}
                    </span>
                  )}
                  {activeMaterial !== "All Materials" && (
                    <span className="bg-orange-500 text-white rounded-full px-3 py-1.5 text-[9px] font-black uppercase tracking-wider whitespace-nowrap shrink-0 shadow-sm">
                      {activeMaterial}
                    </span>
                  )}
                  {activeNiche !== "All Categories" && (
                    <span className="bg-zinc-100 text-zinc-800 rounded-full px-3 py-1.5 text-[9px] font-black uppercase tracking-wider border border-zinc-200 whitespace-nowrap shrink-0 shadow-sm">
                      {activeNiche.replace("All Categories", "All")}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Main Filters Toggle Button */}
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="shrink-0 flex items-center gap-2 bg-zinc-950 hover:bg-orange-500 text-white rounded-full px-5 py-2.5 text-[10px] font-black uppercase tracking-widest shadow-md transition-all duration-300 active:scale-[0.97]"
            >
              <SlidersHorizontal size={12} className="text-orange-500" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-4.5 h-4.5 rounded-full bg-orange-500 text-white text-[8px] flex items-center justify-center font-bold px-1 min-w-[18px]">
                  { (activeCategory !== "All" ? 1 : 0) + (activeMaterial !== "All Materials" ? 1 : 0) + (activeNiche !== "All Categories" ? 1 : 0) }
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Up Drawer Modal */}
        {isMobileDrawerOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setIsMobileDrawerOpen(false)}
            />
            {/* Bottom Sheet */}
            <div 
              className="absolute bottom-0 inset-x-0 bg-white rounded-t-[32px] shadow-2xl flex flex-col max-h-[85vh] z-10 transition-transform duration-300 animate-slide-up pb-24"
            >
              {/* Drag Indicator */}
              <div className="w-12 h-1 bg-zinc-200 rounded-full mx-auto my-3 shrink-0" />
              
              {/* Header */}
              <div className="flex items-center justify-between px-6 pb-4 border-b border-zinc-100 shrink-0">
                <h3 className="text-zinc-900 font-black text-sm uppercase tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>Filters</h3>
                <button 
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Service Type */}
                <div className="space-y-3">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Service Type</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => {
                      const isActive = activeCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={`w-full py-3 px-3 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all duration-200 active:scale-[0.98] border text-center ${
                            isActive 
                              ? "bg-black text-white border-black shadow-md" 
                              : "bg-zinc-50 text-zinc-500 border-zinc-100 hover:bg-zinc-100 hover:text-zinc-800"
                          }`}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Material */}
                <div className="space-y-3">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Material</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {materialsList.map((mat) => {
                      const isActive = activeMaterial === mat;
                      return (
                        <button
                          key={mat}
                          onClick={() => setActiveMaterial(mat)}
                          className={`w-full py-3 px-2 rounded-xl text-[9px] font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] border text-center ${
                            isActive 
                              ? "bg-orange-500 text-white border-orange-500 shadow-sm" 
                              : "bg-zinc-50 text-zinc-500 border-zinc-100 hover:bg-zinc-100 hover:text-zinc-800"
                          }`}
                        >
                          {mat.replace("All Materials", "All")}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Niche Categories */}
                <div className="space-y-3">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Product Category / Niche</h4>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                    {nichesList.map((niche) => {
                      const isActive = activeNiche === niche;
                      return (
                        <button
                          key={niche}
                          onClick={() => setActiveNiche(niche)}
                          className={`w-full py-3 px-3 rounded-xl text-[9px] font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] border text-left flex items-center justify-between ${
                            isActive 
                              ? "bg-orange-50 text-orange-600 border-orange-200" 
                              : "bg-zinc-50 text-zinc-500 border-zinc-100 hover:bg-zinc-100 hover:text-zinc-800"
                          }`}
                        >
                          <span className="truncate">{niche}</span>
                          {isActive && <Check size={10} className="text-orange-500 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-white border-t border-zinc-100 p-4 flex items-center gap-3 shrink-0">
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setActiveMaterial("All Materials");
                    setActiveNiche("All Categories");
                  }}
                  className="flex-1 py-3.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-[0.97]"
                >
                  <RotateCcw size={12} />
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="flex-[2] py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-[0.97] flex items-center justify-center gap-1.5"
                >
                  Apply Filters
                </button>
              </div>
            </div>

            <style>{`
              @keyframes slideUp {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
              }
              .animate-slide-up {
                animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }
            `}</style>
          </div>
        )}

        {/* Grid Section */}
        <div ref={containerRef} className="w-full min-h-[400px] sm:min-h-[600px] relative z-10">
          {(() => {
            const col1_desktop = filteredPortfolio.filter((_, i) => i % 4 === 0);
            const col2_desktop = filteredPortfolio.filter((_, i) => i % 4 === 1);
            const col3_desktop = filteredPortfolio.filter((_, i) => i % 4 === 2);
            const col4_desktop = filteredPortfolio.filter((_, i) => i % 4 === 3);

            const col1_mobile = filteredPortfolio.filter((_, i) => i % 2 === 0);
            const col2_mobile = filteredPortfolio.filter((_, i) => i % 2 === 1);

            return (
              <div className="w-full">
                <div className="hidden md:flex items-start gap-6 w-full">
                  <div className="flex-1 flex flex-col gap-6">{col1_desktop.map((item, i) => renderCard(item, i))}</div>
                  <div className="flex-1 flex flex-col gap-6 mt-12">{col2_desktop.map((item, i) => renderCard(item, i))}</div>
                  <div className="flex-1 flex flex-col gap-6 -mt-4">{col3_desktop.map((item, i) => renderCard(item, i))}</div>
                  <div className="flex-1 flex flex-col gap-6 mt-8">{col4_desktop.map((item, i) => renderCard(item, i))}</div>
                </div>
                <div className="flex md:hidden flex-col gap-4 w-full">
                  {filteredPortfolio.map((item, i) => renderCard(item, i))}
                </div>
              </div>
            );
          })()}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 relative z-10">
          <div className="rounded-[24px] sm:rounded-[32px] border border-zinc-100 bg-white overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.03)] mb-8">
            <div className="bg-zinc-950 px-5 sm:px-8 py-5 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-orange-500 font-black text-xl sm:text-2xl tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>+68%</span>
                <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 leading-tight">Higher<br />Conversion</span>
              </div>
              <p className="text-zinc-400 text-[11px] sm:text-[12px] font-light leading-relaxed">
                Amazon listings with <span className="text-white font-medium">3D renders and infographics</span> convert up to 68% more than standard photography alone.
              </p>
            </div>
            <div className="px-5 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <p className="font-black text-zinc-900 uppercase tracking-tight text-[13px] sm:text-[14px] mb-1">This is what winning listings look like.</p>
                <p className="text-zinc-400 text-[12px] sm:text-[13px] font-light">Whether you're launching or scaling — great visuals aren't optional.</p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
                <Link href="/portfolio" prefetch={false} className="flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-black text-[10px] uppercase tracking-widest px-6 py-3.5 rounded-2xl no-underline transition-all duration-300">
                  Explore More Work <ArrowUpRight size={12} />
                </Link>
                <Link href="/get-started" prefetch={false} className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-black text-white font-black text-[10px] uppercase tracking-widest px-6 py-3.5 rounded-2xl no-underline transition-all duration-300">
                  Talk to Us <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
