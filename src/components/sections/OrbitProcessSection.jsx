"use client";

import Image from "next/image";
import { Crosshair, Package, Layers, Rocket, RefreshCw, ArrowRight, ArrowDown, ShieldCheck } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Product Hunting",
    sub: "Market research & demand validation to find high-margin winning products.",
    tags: ["Demand Scoring", "Competitor Gaps"],
    icon: <Crosshair size={24} strokeWidth={1.8} />,
    dark: false,
  },
  {
    num: "02",
    title: "Sourcing & Setup",
    sub: "Direct factory vetting in China, sample validation, and brand registry config.",
    tags: ["Factory Audits", "Zero Middlemen"],
    icon: <Package size={24} strokeWidth={1.8} />,
    dark: false,
  },
  {
    num: "03",
    title: "Launch & Build",
    sub: "World-class 3D renders, high-CTR listing imagery, and aggressive launch PPC.",
    tags: ["3D Renders", "Aggressive PPC"],
    icon: <Layers size={24} strokeWidth={1.8} />,
    dark: false,
  },
  {
    num: "04",
    title: "Scale & Grow",
    sub: "Continuous bid optimization, inventory forecasting, and category dominance.",
    tags: ["Lower ACoS", "Inventory Flow"],
    icon: <Rocket size={24} strokeWidth={1.8} />,
    dark: false,
  },
  {
    num: "∞",
    title: "Evolve",
    sub: "Ongoing account governance, catalog defense, and sustainable brand expansion.",
    tags: ["Weekly Sprints", "Brand Defense"],
    icon: <RefreshCw size={24} strokeWidth={1.8} />,
    dark: true,
  },
];

export default function OrbitProcessSection({ scrollToForm }) {
  return (
    <section
      id="process"
      className="py-20 sm:py-28 bg-[#fafafa] border-t border-zinc-100 relative overflow-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <style>{`
        @keyframes arrow-pulse {
          0%,100% { opacity: 0.35; transform: translateX(0px);  }
          50%      { opacity: 1;   transform: translateX(4px);  }
        }
        @keyframes arrow-pulse-v {
          0%,100% { opacity: 0.35; transform: translateY(0px);  }
          50%      { opacity: 1;   transform: translateY(4px);  }
        }
        .a1 { animation: arrow-pulse 2s ease-in-out infinite 0.0s; }
        .a2 { animation: arrow-pulse 2s ease-in-out infinite 0.4s; }
        .a3 { animation: arrow-pulse 2s ease-in-out infinite 0.8s; }
        .a4 { animation: arrow-pulse 2s ease-in-out infinite 1.2s; }
        .md-v-a1 { animation: arrow-pulse-v 2s ease-in-out infinite 0.0s; }
        .md-v-a2 { animation: arrow-pulse-v 2s ease-in-out infinite 0.4s; }
        .md-v-a3 { animation: arrow-pulse-v 2s ease-in-out infinite 0.8s; }
        .md-v-a4 { animation: arrow-pulse-v 2s ease-in-out infinite 1.2s; }

        @keyframes spin-once {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        .tile:hover .orbit-spin {
          animation: spin-once 0.8s cubic-bezier(0.23,1,0.32,1) forwards;
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="relative">
          {/* Large Background Watermark (SVG vector) */}
          <div
            aria-hidden="true"
            className="absolute
              top-[30px] right-0 rotate-90 origin-center translate-x-[40%]
              sm:top-[20px] sm:left-0 sm:right-auto sm:rotate-0 sm:origin-center sm:-translate-y-[70%] sm:translate-x-0
              pointer-events-none select-none z-0 overflow-visible"
          >
            <svg
              className="h-[60px] sm:h-[100px] md:h-[160px] w-auto overflow-visible opacity-[0.08]"
              viewBox="0 0 650 140"
              fill="none"
              aria-hidden="true"
            >
              <text
                x="0"
                y="110"
                fill="none"
                stroke="#000"
                strokeWidth="2"
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontWeight: 900,
                  fontSize: "140px",
                  letterSpacing: "-0.05em",
                  textTransform: "uppercase"
                }}
              >
                PROCESS
              </text>
            </svg>
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-zinc-900 font-bold">
                  05 / Our Process
                </p>
              </div>
              <h2
                className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[1.1] text-zinc-900"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                From Idea To <span className="italic font-normal text-zinc-500 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>Revenue.</span>
              </h2>
            </div>
            <p className="text-zinc-600 text-sm font-normal max-w-[270px] leading-relaxed md:pb-2">
              One end-to-end system from product hunting to scaling your brand to $50K-$200K/mo.
            </p>
          </div>
        </div>

        {/* Single unified card */}
        <div className="bg-white rounded-[24px] sm:rounded-[36px] border border-zinc-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">

          {/* Top gradient bar */}
          <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600" />

          {/* Status Header */}
          <div className="flex items-center justify-between px-4 sm:px-10 py-3.5 sm:py-4 border-b border-zinc-100 gap-2 bg-zinc-50/50">
            <div className="flex items-center gap-2 font-mono text-[8px] sm:text-[9.5px] font-black tracking-[0.2em] sm:tracking-[0.25em] uppercase text-zinc-700 shrink-1 truncate">
              <span className="text-orange-600 text-[11px] sm:text-[13px] leading-none font-bold">{">_"}</span>
              <span className="truncate">5-STAGE_EXECUTION_ENGINE</span>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-emerald-200/80 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[7px] sm:text-[8.5px] font-bold tracking-[0.15em] uppercase text-emerald-800 whitespace-nowrap">100% Done-For-You</span>
            </div>
          </div>

          {/* ── DESKTOP (md+): horizontal flow ── */}
          <div className="hidden md:block px-6 lg:px-12 pt-14 pb-12">

            {/* Tiles + arrows row */}
            <div className="flex items-start justify-between">
              {steps.map((s, i) => (
                <div key={i} className="flex items-start">

                  {/* Tile */}
                  <div className="tile flex flex-col items-center group cursor-default max-w-[210px] p-2 rounded-2xl hover:bg-orange-50/30 transition-all duration-300">
                    {/* Planet Wrapper */}
                    <div className="relative mb-6 mt-2">
                      {/* Dashed Orbit Ring */}
                      <div className={`absolute inset-[-10px] lg:inset-[-12px] rounded-full border border-dashed transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] orbit-spin ${
                        s.dark 
                          ? 'border-zinc-700 group-hover:border-orange-500/60' 
                          : 'border-orange-300/60 group-hover:border-orange-500'
                      }`} 
                      />
                      
                      {/* Ambient soft glow behind planet */}
                      <div className={`absolute inset-0 rounded-full blur-md transition-all duration-500 -z-10 ${
                        s.dark
                          ? 'bg-zinc-800/40 group-hover:bg-orange-500/20'
                          : 'bg-orange-500/25 group-hover:bg-orange-500/40 group-hover:blur-lg'
                      }`} />

                      {/* Core Planet */}
                      <div className={`
                        relative w-[74px] h-[74px] lg:w-[86px] lg:h-[86px]
                        rounded-full flex items-center justify-center
                        z-10
                        group-hover:-translate-y-1.5 transition-all duration-500 ease-out
                        ${s.dark
                          ? "bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white shadow-[0_12px_28px_rgba(0,0,0,0.3)] group-hover:shadow-[0_20px_35px_rgba(249,115,22,0.2)] border border-zinc-700/80 group-hover:border-orange-500/50"
                          : "bg-gradient-to-br from-orange-500 via-[#ff6a00] to-orange-600 text-white shadow-[0_12px_28px_rgba(249,115,22,0.28)] group-hover:shadow-[0_20px_35px_rgba(249,115,22,0.4)] border border-white/25"
                        }
                      `}>
                        {/* Concentric inner hairline ring */}
                        <div className="absolute inset-1.5 rounded-full border border-white/15 pointer-events-none" />
                        <span className="text-white drop-shadow-xs">
                          {s.icon}
                        </span>
                      </div>

                      {/* Num badge (pinned to orbit) */}
                      <div className={`absolute -bottom-5 lg:-bottom-6 left-1/2 -translate-x-1/2 z-20 bg-white border rounded-full w-6 h-6 flex items-center justify-center shadow-xs transition-all duration-500 group-hover:scale-110 ${
                        s.dark ? "border-zinc-300 group-hover:border-orange-400" : "border-orange-200 group-hover:border-orange-500"
                      }`}>
                        <span className={`text-[8px] font-black font-mono tracking-widest ${
                          s.dark ? "text-zinc-700 group-hover:text-orange-500" : "text-orange-600"
                        }`}>
                          {s.num}
                        </span>
                      </div>
                    </div>

                    {/* Labels */}
                    <div className="mt-2 text-center flex flex-col items-center">
                      <p className="font-black text-[11.5px] lg:text-[12.5px] uppercase tracking-[0.1em] text-zinc-900 group-hover:text-orange-600 transition-colors duration-300 leading-tight mb-2 pt-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {s.title}
                      </p>
                      <p className="text-[11px] font-normal text-zinc-600 leading-relaxed max-w-[170px] mx-auto px-1">
                        {s.sub}
                      </p>

                      {/* Deliverables micro-tags */}
                      <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5 max-w-[185px]">
                        {s.tags.map((tag, ti) => (
                          <span
                            key={ti}
                            className="text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200/70 group-hover:bg-orange-50 group-hover:text-orange-700 group-hover:border-orange-200 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Propulsion beam connector between planets */}
                  {i < steps.length - 1 && (
                    <div className={`flex items-center gap-1 mt-10 lg:mt-11 px-1 lg:px-2 a${i + 1} shrink-0`}>
                      <div className="w-5 lg:w-9 h-[1.5px] bg-gradient-to-r from-orange-400/80 via-orange-400/50 to-orange-300/20" />
                      <ArrowRight
                        size={13}
                        strokeWidth={2.5}
                        className={i === steps.length - 2 ? "text-zinc-600" : "text-orange-500"}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Loop banner */}
            <div className="mt-12 flex items-center gap-4">
              <div className="flex-1 h-px border-t border-dashed border-orange-200/70" />
              <div className="flex items-center gap-2 bg-gradient-to-r from-zinc-950 to-zinc-900 border border-orange-500/20 rounded-full px-5 py-2 shrink-0 shadow-sm">
                <RefreshCw size={11} strokeWidth={2.5} className="text-orange-400 animate-spin-slow" />
                <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-orange-400">Continuous Brand Evolution Cycle</span>
              </div>
              <div className="flex-1 h-px border-t border-dashed border-orange-200/70" />
            </div>
          </div>

          {/* ── MOBILE (< md): vertical flow ── */}
          <div className="md:hidden px-5 sm:px-6 py-8 sm:py-10">
            <div className="relative">
              {/* Vertical dashed rail */}
              <div className="absolute left-6 top-10 bottom-14 w-px border-l border-dashed border-orange-300/40 z-0" />

              <div className="space-y-8">
                {steps.map((s, i) => (
                  <div key={i} className="relative z-10">

                    {/* Row */}
                    <div className="flex items-start gap-4 sm:gap-5">
                      {/* Tile Wrapper */}
                      <div className="relative shrink-0 mt-1">
                        {/* Orbit Ring (Mobile) */}
                        <div className={`absolute inset-[-6px] rounded-full border border-dashed transition-all duration-700 ${
                          s.dark ? "border-zinc-700" : "border-orange-300/60"
                        }`} />
                        
                        {/* Core Planet */}
                        <div className={`
                          relative z-10 w-12 h-12 rounded-full
                          flex items-center justify-center
                          ${s.dark
                            ? "bg-gradient-to-br from-zinc-900 to-black text-white shadow-[0_6px_16px_rgba(0,0,0,0.2)] border border-zinc-700"
                            : "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-[0_6px_16px_rgba(249,115,22,0.25)] border border-white/20"
                          }
                        `}>
                          <span className="scale-[0.8]">{s.icon}</span>
                        </div>

                        {/* Num badge (pinned to orbit) */}
                        <div className="absolute -bottom-1 -right-1 z-20 bg-white border border-zinc-200 rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
                          <span className={`text-[6.5px] font-black font-mono tracking-widest ${s.dark ? "text-zinc-700" : "text-orange-600"}`}>
                            {s.num}
                          </span>
                        </div>
                      </div>
                      
                      {/* Text */}
                      <div className="flex-1">
                        <p className="font-black text-[12px] uppercase tracking-wide text-zinc-900 mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          {s.title}
                        </p>
                        <p className="text-[11px] font-normal text-zinc-600 leading-relaxed mb-2">
                          {s.sub}
                        </p>
                        {/* Deliverables tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {s.tags.map((tag, ti) => (
                            <span
                              key={ti}
                              className="text-[7.5px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Compact Vertical Arrow (dots + arrow) */}
                    {i < steps.length - 1 && (
                      <div className={`w-12 py-1 flex flex-col items-center gap-1 md-v-a${i + 1}`}>
                         <div className={`w-1 h-1 rounded-full ${i === steps.length - 2 ? "bg-zinc-600" : "bg-orange-400"}`} />
                         <div className={`w-1 h-1 rounded-full ${i === steps.length - 2 ? "bg-zinc-400" : "bg-orange-300"}`} />
                         <ArrowDown
                           size={12}
                           strokeWidth={2.5}
                           className={i === steps.length - 2 ? "text-zinc-600" : "text-orange-500"}
                         />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Loop badge (Mobile) */}
              <div className="mt-14 flex justify-center">
                <div className="flex items-center gap-2 bg-zinc-950 border border-orange-500/20 rounded-full px-5 py-2.5 shadow-sm">
                  <RefreshCw size={11} strokeWidth={2.5} className="text-orange-400 shrink-0 animate-spin-slow" />
                  <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-orange-400 whitespace-nowrap">Continuous Evolution Cycle</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upgraded Strategist CTA strip */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-5 bg-gradient-to-r from-zinc-950 via-[#101114] to-zinc-950 border border-zinc-800/90 rounded-[24px] p-5 sm:px-8 sm:py-6 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2.5 shrink-0">
              <div className="w-10 h-10 rounded-full border-2 border-zinc-900 overflow-hidden relative shadow-md">
                <Image src="/assets/marcus-thorne.avif" alt="Strategist Lead" fill sizes="40px" className="object-cover" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-zinc-900 overflow-hidden relative shadow-md">
                <Image src="/assets/julian-vane.avif" alt="Creative Director" fill sizes="40px" className="object-cover" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-400">Strategist Assigned Within 24h</span>
              </div>
              <p className="text-[12.5px] sm:text-[13.5px] font-bold text-white tracking-tight leading-snug">
                Every step managed by your dedicated Grow Orbit brand lead.
              </p>
            </div>
          </div>

          <button
            onClick={scrollToForm}
            className="group w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-500 text-white font-black text-[10px] sm:text-[10.5px] uppercase tracking-[0.2em] px-7 py-4 rounded-xl transition-all duration-300 no-underline shadow-[0_6px_20px_rgba(249,115,22,0.35)] hover:shadow-[0_8px_25px_rgba(249,115,22,0.5)] hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            <span>Start The Process</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
