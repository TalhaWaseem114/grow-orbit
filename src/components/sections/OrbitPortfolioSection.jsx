"use client";

import { useState, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { PORTFOLIO_ITEMS } from "@/data/portfolioData";

export default function OrbitPortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeMaterial, setActiveMaterial] = useState("All Materials");
  const [activeNiche, setActiveNiche] = useState("All Categories");
  const [isNicheOpen, setIsNicheOpen] = useState(false);
  const containerRef = useRef(null);

  /* Use first 12 items from shared data for better filtering variety */
  const portfolioItems = PORTFOLIO_ITEMS.slice(0, 16).map(p => ({
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
    const isDark = item.category === "A+ Content" || item.id.includes("ap-");
    return (
      <Link href={`/portfolio/${item.id}`} key={`${item.id}-${index}`} prefetch={false} className="portfolio-card w-full will-change-[transform,opacity,filter] no-underline block">
        <div className={`group relative rounded-[20px] sm:rounded-[28px] border border-zinc-100 overflow-hidden flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-500 scale-[0.99] hover:scale-100 ${isDark ? "bg-zinc-950 text-white" : "bg-white text-zinc-950"}`}>

          {/* IMAGE CONTAINER */}
          <div className="relative w-full overflow-hidden bg-zinc-100 aspect-[4/3]">
            <img
              src={item.src}
              alt={item.brandName}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />

            {/* Materials tag TR */}
            <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1.5">
              {item.materials.map((mat, i) => (
                <div key={i} className="bg-black/40 backdrop-blur-md border border-white/20 text-white rounded-md px-1.5 py-0.5 text-[6.5px] font-bold uppercase tracking-widest shadow-sm">
                  {mat}
                </div>
              ))}
            </div>

            {/* Badge TL */}
            <div className="absolute top-2.5 left-2.5 bg-orange-500 text-white rounded-lg sm:rounded-xl px-2 sm:px-2.5 py-1 sm:py-1.5 shadow-lg z-10 flex flex-col items-center justify-center min-w-[48px] sm:min-w-[56px]">
              <span className="font-black text-[9px] sm:text-[13px] leading-none block tracking-tighter">{item.badgeValue}</span>
              <span className="font-bold text-[5px] sm:text-[6px] uppercase tracking-wider block mt-[2px] opacity-90">{item.badgeLabel}</span>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div className="p-3 sm:p-6 flex flex-col gap-1.5 sm:gap-2 relative">
            <h4 className="text-orange-500 font-black text-base sm:text-[22px] uppercase tracking-tighter leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {item.outcome}
            </h4>

            <p className={`text-[8px] sm:text-[11px] font-bold uppercase tracking-widest ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
              {item.niche}
            </p>

            {/* Service Badges (New style matching main portfolio) */}
            <div className="flex flex-wrap gap-1 mt-1 sm:mt-2">
              {item.services?.map((svc, i) => (
                <span key={i} className={`text-[6px] sm:text-[8px] font-bold uppercase tracking-[0.12em] px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg border whitespace-nowrap transition-all duration-300 ${isDark ? "border-white/[0.08] text-zinc-500 hover:text-zinc-300 hover:border-white/20" : "border-zinc-200 text-zinc-400 hover:text-zinc-600 hover:border-zinc-400"}`}>
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
    <section className="py-28 bg-[#fafafa] border-t border-zinc-100 relative">
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
          <Link
            href="/portfolio"
            prefetch={false}
            className="group flex justify-center items-center gap-2 w-full bg-zinc-900 hover:bg-orange-500 text-white font-bold text-[11px] uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 no-underline shadow-[0_15px_35px_rgba(0,0,0,0.2)]"
          >
            View Full Portfolio <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300" />
          </Link>
        </div>

        {/* Filter Navigation */}
        <div className="mb-10 sm:mb-16 w-full flex flex-col items-center gap-4 relative z-20 px-2">
          <div className="w-full sm:w-auto bg-white/80 backdrop-blur-xl border border-white/40 p-1.5 sm:p-2.5 rounded-2xl sm:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex flex-col transition-all duration-500">
            {/* Service Filter */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:flex-wrap sm:justify-center px-1 sm:px-0 relative mb-1 sm:mb-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 whitespace-nowrap px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-[8.5px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-300 active:scale-[0.98] ${activeCategory === cat.id ? "bg-black text-white shadow-lg" : "text-zinc-400 hover:text-zinc-900 bg-black/5 sm:bg-transparent"}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Secondary Filters Grid */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 border-t border-zinc-100 pt-2 sm:pt-4">
              {/* Material Filter */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto px-1 sm:px-0">
                {materialsList.map((mat) => (
                  <button key={mat} onClick={() => setActiveMaterial(mat)} className={`shrink-0 whitespace-nowrap px-3 sm:px-3 py-1.5 sm:py-1 rounded-full text-[8px] sm:text-[8px] font-bold uppercase tracking-widest transition-all duration-300 border ${activeMaterial === mat ? "bg-white text-orange-500 border-orange-100 shadow-[0_4px_10px_rgba(249,115,22,0.1)]" : "bg-transparent text-zinc-400 border-transparent hover:border-zinc-200 hover:text-zinc-600 hover:bg-black/5"}`}>{mat}</button>
                ))}
              </div>

              {/* Niche Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsNicheOpen(!isNicheOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 sm:py-1 rounded-full font-bold text-[8px] sm:text-[8px] uppercase tracking-widest transition-all duration-300 bg-zinc-50 text-zinc-600 border border-zinc-200 hover:border-orange-500"
                >
                  {activeNiche}
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isNicheOpen ? "rotate-180" : ""}`}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>

                {isNicheOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsNicheOpen(false)} />
                    <div className="absolute left-1/2 sm:left-auto sm:right-0 -translate-x-1/2 sm:translate-x-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-zinc-100 overflow-hidden py-2 z-50 max-h-60 overflow-y-auto">
                      {nichesList.map((niche) => (
                        <button
                          key={niche}
                          onClick={() => { setActiveNiche(niche); setIsNicheOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-[9px] font-bold uppercase tracking-widest transition-colors ${activeNiche === niche ? "text-orange-500 bg-orange-50" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}`}
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
        </div>

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
                <div className="flex md:hidden items-start gap-2 w-full">
                  <div className="flex-[0.5] flex flex-col gap-2">{col1_mobile.map((item, i) => renderCard(item, i))}</div>
                  <div className="flex-[0.5] flex flex-col gap-2 mt-4">{col2_mobile.map((item, i) => renderCard(item, i))}</div>
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
