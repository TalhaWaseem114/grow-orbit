"use client";

import React from "react";
import { Search, BarChart4, MapIcon, Zap, ChevronRight, Terminal } from "lucide-react";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-8 h-[2px] bg-orange-500" />
    <span className="font-bold text-[10px] font-mono uppercase tracking-[0.4em] text-orange-500">
      {children}
    </span>
  </div>
);

export default function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Diagnostic Discovery",
      desc: "We perform a full-spectrum deep dive into your listing health, established keyword authority, and competitive positioning to identify low-hanging revenue leaks.",
      icon: <Search size={18} />,
    },
    {
      num: "02",
      title: "Intelligence Analysis",
      desc: "Every metric is cross-referenced against category logic. We identify search demand clusters and conversion gaps that are currently being ignored by the algorithm.",
      icon: <BarChart4 size={18} />,
    },
    {
      num: "03",
      title: "Optimization Blueprint",
      desc: "A prioritized optimization roadmap is built — sequencing high-velocity title changes, backend infrastructure mapping, and benefit-led conversion logic.",
      icon: <MapIcon size={18} />,
    },
    {
      num: "04",
      title: "Deployment & Handoff",
      desc: "The final listing assets are deployed to Seller Central with full performance tracking active. We hand off a comprehensive performance report with next-step ranking plays.",
      icon: <Zap size={18} />,
    },
  ];

  return (
    <section id="how-we-work" className="py-32 bg-white relative overflow-hidden text-left border-t border-zinc-100">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Our Protocol</SectionLabel>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-zinc-900 leading-[0.9] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              How we<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                deploy dominance.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            A phase-locked tactical methodology designed to achieve and sustain algorithmic dominance in modern marketplaces.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-100 border border-zinc-100 rounded-[40px] shadow-xl shadow-slate-900/5 overflow-hidden">
          {steps.map((item, i) => (
            <div
              key={i}
              style={{ zIndex: steps.length - i }}
              className={`group relative bg-white p-8 hover:bg-zinc-50 transition-all duration-500 h-full flex flex-col ${
                i === 0
                  ? "rounded-t-[40px] lg:rounded-l-[40px] lg:rounded-tr-none"
                  : i === steps.length - 1
                  ? "rounded-b-[40px] lg:rounded-r-[40px] lg:rounded-bl-none"
                  : ""
              }`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-orange-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-tl-[4px]" />
              <div className="flex justify-between items-center mb-8">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                  {item.icon}
                </div>
                <div className="text-[10px] font-mono font-black text-zinc-300 group-hover:text-orange-500 transition-colors">
                  {item.num}
                </div>
              </div>

              <div className="grow">
                <h3 className="text-[13px] font-black uppercase tracking-[0.15em] text-zinc-900 mb-3 group-hover:text-orange-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[13px] text-zinc-500 leading-relaxed font-light">
                  {item.desc}
                </p>
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

        <div className="mt-12 flex items-center justify-between p-8 bg-[#fafafa] rounded-[32px] border border-zinc-100 transition-all duration-500">
          <div className="flex items-center gap-4 text-zinc-400">
            <Terminal size={16} />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em]">
              Deployment_Pipeline_01-04
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest italic whitespace-nowrap">
              Protocol Ready for 2026 Listing Deployment
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

