"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutGrid, Camera, Layers, Search, BookOpen, Store, Sparkles,
  SlidersHorizontal, X, RotateCcw, Check
} from "lucide-react";
import {
  PORTFOLIO_ITEMS, FILTERS as FILTERS_DATA, MATERIALS
} from "@/data/portfolioData";

/* Hydrate filter icons from data module */
const ICON_MAP = { LayoutGrid, Camera, Layers, Search, BookOpen, Store, Sparkles };
const FILTERS = FILTERS_DATA.map(f => ({
  ...f,
  icon: (() => { const I = ICON_MAP[f.icon]; return I ? <I size={13} /> : <LayoutGrid size={13} />; })(),
}));

const NICHES = ["All Categories", ...new Set(PORTFOLIO_ITEMS.map(item => item.niche))].sort();

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

export default function PortfolioFilters({
  activeKey, activeMaterial, activeNiche,
  onCategorySelect, onMaterialSelect, onNicheSelect,
  isSticky = true
}) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [tempCategory, setTempCategory] = useState(activeKey);
  const [tempMaterial, setTempMaterial] = useState(activeMaterial);
  const [tempNiche, setTempNiche] = useState(activeNiche);

  // Sync temp state when drawer opens
  useEffect(() => {
    if (isMobileDrawerOpen) {
      setTempCategory(activeKey);
      setTempMaterial(activeMaterial);
      setTempNiche(activeNiche);
    }
  }, [isMobileDrawerOpen, activeKey, activeMaterial, activeNiche]);

  // Disable body scroll when drawer is open
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

  function applyMobileFilters() {
    onCategorySelect(tempCategory);
    onMaterialSelect(tempMaterial);
    onNicheSelect(tempNiche);
    setIsMobileDrawerOpen(false);
  }

  const activeFilter = FILTERS.find(f => f.key === activeKey);

  return (
    <>
      {/* ── STICKY FILTER BAR ── */}
      <div className={`${isSticky ? "sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-zinc-100 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.05)] sm:shadow-none" : "w-full mb-8"} transition-all duration-300`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-4 flex flex-col gap-2 sm:gap-3">
          {/* ── MOBILE: Compact Filter Summary Bar ── */}
          <div className="sm:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-900 text-white font-bold text-[10px] uppercase tracking-[0.15em] transition-all duration-300 shadow-lg active:scale-95 shrink-0"
            >
              <SlidersHorizontal size={13} />
              Filters
              {(activeKey !== "all" || activeMaterial !== "All Materials" || activeNiche !== "All Categories") && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white text-[9px] font-black">
                  {(activeKey !== "all" ? 1 : 0) + (activeMaterial !== "All Materials" ? 1 : 0) + (activeNiche !== "All Categories" ? 1 : 0)}
                </span>
              )}
            </button>

            {/* Active filter chips preview */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1">
              {activeKey !== "all" && (
                <span className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-[9px] font-bold uppercase tracking-wide">
                  {activeFilter?.label || activeKey}
                  <button onClick={() => onCategorySelect("all")} className="ml-0.5 hover:text-orange-800 transition-colors"><X size={10} /></button>
                </span>
              )}
              {activeMaterial !== "All Materials" && (
                <span className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-[9px] font-bold uppercase tracking-wide">
                  {activeMaterial}
                  <button onClick={() => onMaterialSelect("All Materials")} className="ml-0.5 hover:text-zinc-900 transition-colors"><X size={10} /></button>
                </span>
              )}
              {activeNiche !== "All Categories" && (
                <span className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-[9px] font-bold uppercase tracking-wide">
                  {activeNiche}
                  <button onClick={() => onNicheSelect("All Categories")} className="ml-0.5 hover:text-zinc-900 transition-colors"><X size={10} /></button>
                </span>
              )}
            </div>
          </div>

          {/* ── DESKTOP: Original filter rows ── */}
          <div className="hidden sm:block">
            <FilterBar activeKey={activeKey} onSelect={onCategorySelect} />
          </div>

          <div className="w-full h-px bg-zinc-100/50 hidden sm:block"/>

          {/* Row 2: Secondary Metadata Filters (desktop only) */}
          <div className="hidden sm:flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
               <div className="h-3 w-px bg-zinc-200" />
               <MaterialFilterBar activeMaterial={activeMaterial} onSelect={onMaterialSelect} />
            </div>
            <div className="shrink-0">
              <NicheDropdown activeNiche={activeNiche} onSelect={onNicheSelect} />
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE FILTER BOTTOM SHEET DRAWER ── */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-[100] sm:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[28px] shadow-[0_-20px_60px_rgba(0,0,0,0.15)] max-h-[85vh] flex flex-col"
            style={{ animation: "slideUpDrawer 0.35s cubic-bezier(0.32, 0.72, 0, 1) forwards" }}
          >
            <style>{`
              @keyframes slideUpDrawer {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
              }
            `}</style>

            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-zinc-300" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <SlidersHorizontal size={16} className="text-zinc-900" />
                <h3 className="text-[14px] font-black uppercase tracking-tight text-zinc-900">Filters</h3>
              </div>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition-colors"
              >
                <X size={14} className="text-zinc-600" />
              </button>
            </div>

            {/* Scrollable Filter Sections */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-7">
              {/* Section: Service Type */}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3">Service Type</p>
                <div className="flex flex-wrap gap-2">
                  {FILTERS.map((f) => {
                    const isSelected = tempCategory === f.key;
                    const count = f.key === "all"
                      ? PORTFOLIO_ITEMS.length
                      : PORTFOLIO_ITEMS.filter(item => item.category === f.key || (item.services && item.services.includes(f.key))).length;
                    return (
                      <button
                        key={f.key}
                        onClick={() => setTempCategory(f.key)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-wide transition-all duration-300 border
                          ${isSelected
                            ? "bg-zinc-900 text-white border-zinc-900 shadow-md"
                            : "bg-zinc-50 text-zinc-500 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900"
                          }`}
                      >
                        <span className={isSelected ? "text-orange-400" : "text-zinc-400"}>{f.icon}</span>
                        {f.label}
                        <span className={`text-[8px] font-mono ${isSelected ? "text-zinc-400" : "text-zinc-300"}`}>{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section: Material */}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3">Material</p>
                <div className="flex flex-wrap gap-2">
                  {MATERIALS.map((mat) => {
                    const isSelected = tempMaterial === mat;
                    return (
                      <button
                        key={mat}
                        onClick={() => setTempMaterial(mat)}
                        className={`px-4 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-wide transition-all duration-300 border
                          ${isSelected
                            ? "bg-orange-500 text-white border-orange-500 shadow-md"
                            : "bg-zinc-50 text-zinc-500 border-zinc-200 hover:border-orange-300 hover:text-orange-600"
                          }`}
                      >
                        {mat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section: Product Category */}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3">Product Category</p>
                <div className="flex flex-wrap gap-2">
                  {NICHES.map((niche) => {
                    const isSelected = tempNiche === niche;
                    return (
                      <button
                        key={niche}
                        onClick={() => setTempNiche(niche)}
                        className={`px-4 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-wide transition-all duration-300 border
                          ${isSelected
                            ? "bg-zinc-900 text-white border-zinc-900 shadow-md"
                            : "bg-zinc-50 text-zinc-500 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900"
                          }`}
                      >
                        {isSelected && <Check size={12} className="inline mr-1.5" />}
                        {niche}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="border-t border-zinc-100 px-6 py-4 flex items-center gap-3 bg-white safe-area-bottom">
              <button
                onClick={() => {
                  setTempCategory("all");
                  setTempMaterial("All Materials");
                  setTempNiche("All Categories");
                }}
                className="flex items-center justify-center gap-2 flex-1 py-3 rounded-2xl border border-zinc-200 text-zinc-600 font-bold text-[10px] uppercase tracking-widest transition-all duration-300 hover:bg-zinc-50 active:scale-95"
              >
                <RotateCcw size={12} />
                Reset
              </button>
              <button
                onClick={applyMobileFilters}
                className="flex items-center justify-center gap-2 flex-[2] py-3 rounded-2xl bg-orange-500 text-white font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-orange-500/25 transition-all duration-300 hover:bg-orange-600 active:scale-95"
              >
                <Check size={12} />
                Show {(() => {
                  const count = PORTFOLIO_ITEMS.filter(item => {
                    const matchCat = tempCategory === "all" || item.category === tempCategory || (item.services && item.services.includes(tempCategory));
                    const matchMat = tempMaterial === "All Materials" || item.materials?.some(m => m.toLowerCase().includes(tempMaterial.toLowerCase()));
                    const matchNiche = tempNiche === "All Categories" || item.niche === tempNiche;
                    return matchCat && matchMat && matchNiche;
                  }).length;
                  return count;
                })()} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
