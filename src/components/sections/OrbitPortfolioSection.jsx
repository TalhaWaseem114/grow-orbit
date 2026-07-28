"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { PORTFOLIO_ITEMS } from "@/data/portfolioData";
import MasonryGrid from "@/components/portfolio/MasonryGrid";
import PortfolioFilters from "@/components/portfolio/PortfolioFilters";

export default function OrbitPortfolioSection({ initialCategory = "all", isGetStarted = false }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory.toLowerCase() === "all" ? "all" : initialCategory);
  const [activeMaterial, setActiveMaterial] = useState("All Materials");
  const [activeNiche, setActiveNiche] = useState("All Categories");

  /* Use first 12 items from shared data for better filtering variety */
  const limit = isGetStarted ? 12 : 16;
  const filteredPortfolio = PORTFOLIO_ITEMS.slice(0, limit).filter((item) => {
    const matchCategory = activeCategory === "all" || item.category === activeCategory || (item.services && item.services.includes(activeCategory));
    const matchMaterial = activeMaterial === "All Materials" || (item.materials && item.materials.some((mat) => mat.toLowerCase().includes(activeMaterial.toLowerCase())));
    const matchNiche = activeNiche === "All Categories" || item.niche === activeNiche;
    return matchCategory && matchMaterial && matchNiche;
  });

  return (
    <section id="portfolio" className="py-28 bg-[#fafafa] border-t border-zinc-100 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="relative">
          {/* Large Background Watermark */}
          <div
            className="absolute top-[30px] right-0 rotate-90 origin-center translate-x-[40%] sm:top-[20px] sm:left-0 sm:right-auto sm:rotate-0 sm:origin-center sm:-translate-y-[70%] sm:translate-x-0 font-black text-[45px] sm:text-[80px] md:text-[140px] uppercase tracking-tighter opacity-[0.09] pointer-events-none select-none whitespace-nowrap z-0"
            style={{
              fontFamily: "Arial, sans-serif",
              WebkitTextStroke: "1.5px rgb(0, 0, 0)",
              color: "transparent"
            }}
          >
            PORTFOLIO
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 relative z-10">
            <div className="max-w-xl">
              {/* Eyebrow — App Style */}
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-orange-600 mb-3 font-bold flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-orange-500" />03 / Portfolio</p>
              <h2
                className="text-zinc-900 text-3xl sm:text-4xl md:text-[44px] font-black uppercase tracking-tighter leading-[1.1] mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Our Work in <span className="text-zinc-700 italic font-normal lowercase tracking-normal text-[32px] sm:text-[38px] md:text-[46px]" style={{ fontFamily: "'Playfair Display', serif" }}>Real-Time.</span>
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
        <div className="md:hidden sticky top-[12px] z-[40] mb-6 px-2">
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

        {/* Filters */}
        <div className="relative z-30 mb-8 -mx-6 sm:mx-0">
          <PortfolioFilters 
            activeKey={activeCategory}
            activeMaterial={activeMaterial}
            activeNiche={activeNiche}
            onCategorySelect={setActiveCategory}
            onMaterialSelect={setActiveMaterial}
            onNicheSelect={setActiveNiche}
            isSticky={false}
          />
        </div>

        {/* Grid Section */}
        <div className="w-full relative z-10">
          <MasonryGrid items={filteredPortfolio} />
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
                <p className="text-zinc-600 text-[12px] sm:text-[13px] font-normal">Whether you're launching or scaling — great visuals aren't optional.</p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
                <Link href="/portfolio" prefetch={false} className="flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-black text-[10px] uppercase tracking-widest px-6 py-3.5 rounded-2xl no-underline transition-all duration-300">
                  Explore More Work <ArrowUpRight size={12} />
                </Link>
                <Link href="/get-started" prefetch={false} className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm uppercase tracking-widest px-7 py-3.5 rounded-2xl no-underline transition-all duration-300 shadow-md">
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
