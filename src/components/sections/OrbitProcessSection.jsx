"use client";

import { Crosshair, Package, Layers, Rocket, RefreshCw, ArrowRight, ArrowDown } from "lucide-react";

const steps = [
  { num: "01", title: "Product Hunting", sub: "Market research & demand validation to find winning products.", icon: <Crosshair size={24} strokeWidth={1.5} />, dark: false },
  { num: "02", title: "Sourcing & Setup", sub: "Supplier vetting, brand registry, and full backend config.", icon: <Package size={24} strokeWidth={1.5} />, dark: false },
  { num: "03", title: "Launch & Build", sub: "Listings, A+ content, PPC campaigns — built to convert.", icon: <Layers size={24} strokeWidth={1.5} />, dark: false },
  { num: "04", title: "Scale & Grow", sub: "Optimization, inventory, expansion — sustainable growth.", icon: <Rocket size={24} strokeWidth={1.5} />, dark: false },
  { num: "∞", title: "Evolve", sub: "Continuous account optimization and brand management.", icon: <RefreshCw size={24} strokeWidth={1.5} />, dark: true },
];

export default function OrbitProcessSection({ scrollToForm }) {
  return (
    <section
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
          {/* Large Background Watermark */}
          <div
            className="absolute
              top-[30px] right-0 rotate-90 origin-center translate-x-[40%]
              sm:top-[20px] sm:left-0 sm:right-auto sm:rotate-0 sm:origin-center sm:-translate-y-[70%] sm:translate-x-0
              font-black text-[45px] sm:text-[80px] md:text-[140px] uppercase tracking-tighter opacity-[0.05] pointer-events-none select-none whitespace-nowrap"
            style={{
              fontFamily: "'Oswald', sans-serif",
              WebkitTextStroke: "1.5px #000",
              color: "transparent"
            }}
          >
            PROCESS
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-orange-500/80 mb-3">05 / Our Process</p>
              <h2
                className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[1.1] text-zinc-900"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                From Idea To <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>Revenue.</span>
              </h2>
            </div>
            <p className="text-zinc-400 text-sm font-light max-w-[260px] leading-relaxed md:pb-2">
              One end-to-end system — from product hunting to scaling your brand to $50K–$200K/mo.
            </p>
          </div>
        </div>

        {/* Single unified card */}
        <div className="bg-white rounded-[24px] sm:rounded-[36px] border border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden">

          {/* Top gradient bar */}
          <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-amber-400 to-zinc-900" />

          <div className="flex items-center justify-between px-4 sm:px-10 py-3 sm:py-4 border-b border-zinc-50 gap-2">
            <div className="flex items-center gap-1.5 font-mono text-[7px] sm:text-[9px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase text-zinc-400 shrink-1 truncate">
              <span className="text-orange-500 text-[10px] sm:text-[13px] leading-none">{">_"}</span>
              <span className="truncate">BRAND_LIFECYCLE</span>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-emerald-100 shrink-0">
              <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[6px] sm:text-[8px] font-black tracking-[0.1em] sm:tracking-[0.2em] uppercase text-zinc-700 whitespace-nowrap">Active Proxy</span>
            </div>
          </div>

          {/* ── DESKTOP (md+): horizontal flow ── */}
          <div className="hidden md:block px-8 lg:px-16 pt-14 pb-10">

            {/* Tiles + arrows row */}
            <div className="flex items-start justify-between">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center">

                  {/* Tile */}
                  <div className="tile flex flex-col items-center group cursor-default max-w-[200px]">
                    {/* Planet Wrapper */}
                    <div className="relative mb-6 mt-2">
                      {/* Dashed Orbit Ring */}
                      <div className={`absolute inset-[-10px] lg:inset-[-12px] rounded-full border border-dashed transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] orbit-spin
                        ${s.dark 
                          ? 'border-zinc-800 group-hover:border-zinc-400' 
                          : 'border-zinc-200 group-hover:border-orange-500'
                        }`} 
                      />
                      
                       {/* Core Planet */}
                      <div className={`
                        relative w-[72px] h-[72px] lg:w-[84px] lg:h-[84px]
                        rounded-full flex items-center justify-center
                        z-10
                        group-hover:-translate-y-1 transition-transform duration-500 ease-out
                        ${s.dark
                          ? "bg-zinc-950 text-white shadow-[0_12px_24px_rgba(0,0,0,0.12)] group-hover:shadow-[0_20px_32px_rgba(0,0,0,0.2)]"
                          : "bg-orange-500 text-white shadow-[0_12px_24px_rgba(249,115,22,0.15)] group-hover:shadow-[0_20px_32px_rgba(249,115,22,0.25)]"
                        }
                      `}>
                        <span className="text-white">
                          {s.icon}
                        </span>
                      </div>

                      {/* Num badge (pinned to orbit) */}
                      <div className={`absolute -bottom-5 lg:-bottom-6 left-1/2 -translate-x-1/2 z-20 bg-white border rounded-full w-6 h-6 flex items-center justify-center shadow-sm transition-all duration-500 ${s.dark ? "border-zinc-200" : "border-zinc-100 group-hover:border-orange-200"}`}>
                        <span className={`text-[8px] font-black tracking-widest ${s.dark ? "text-zinc-500" : "text-zinc-400 group-hover:text-orange-500"}`}>
                          {s.num}
                        </span>
                      </div>
                    </div>

                    {/* Labels */}
                    <div className="mt-2 text-center flex flex-col items-center">
                      <p className="font-black text-[11px] lg:text-[12px] uppercase tracking-[0.1em] text-zinc-900 group-hover:text-orange-500 transition-colors duration-300 leading-tight mb-2 pt-2">
                        {s.title}
                      </p>
                      <p className="text-[10px] font-light text-zinc-400 leading-relaxed max-w-[170px] mx-auto px-4">
                        {s.sub}
                      </p>
                    </div>
                  </div>

                  {/* Arrow between tiles (dots + arrow) - Compact */}
                  {i < steps.length - 1 && (
                    <div className={`flex items-center gap-1 mt-[-60px] px-1 lg:px-2 a${i + 1}`}>
                      <div className={`w-1 h-1 rounded-full ${i === steps.length - 2 ? "bg-zinc-600" : "bg-orange-400"}`} />
                      <div className={`w-1 h-1 rounded-full ${i === steps.length - 2 ? "bg-zinc-400" : "bg-orange-300"}`} />
                      <ArrowRight
                        size={14}
                        strokeWidth={2.5}
                        className={i === steps.length - 2 ? "text-zinc-600" : "text-orange-500"}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Loop banner */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex-1 h-px border-t border-dashed border-orange-200/60" />
              <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-5 py-2 shrink-0">
                <RefreshCw size={11} strokeWidth={2.5} className="text-orange-500" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-600">Continuous Brand Evolution</span>
              </div>
              <div className="flex-1 h-px border-t border-dashed border-orange-200/60" />
            </div>
          </div>

          {/* ── MOBILE (< md): vertical flow ── */}
          <div className="md:hidden px-4 sm:px-6 py-8 sm:py-10">
            <div className="relative">
              {/* Vertical dashed rail */}
              <div className="absolute left-6 top-10 bottom-14 w-px border-l border-dashed border-zinc-100 z-0" />

              <div className="space-y-8">
                {steps.map((s, i) => (
                  <div key={i} className="relative z-10">

                    {/* Row */}
                    <div className="flex items-start gap-5">
                      {/* Tile Wrapper */}
                      <div className="relative shrink-0 mt-1">
                        {/* Orbit Ring (Mobile) */}
                        <div className={`absolute inset-[-6px] rounded-full border border-dashed transition-all duration-700
                          ${s.dark ? "border-zinc-800" : "border-zinc-200"}
                        `} />
                        {/* Core Planet */}
                        <div className={`
                          relative z-10 w-12 h-12 rounded-full
                          flex items-center justify-center
                          ${s.dark
                            ? "bg-zinc-950 text-white shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
                            : "bg-orange-500 text-white shadow-[0_6px_16px_rgba(249,115,22,0.15)]"
                          }
                        `}>
                          <span className="scale-[0.8]">{s.icon}</span>
                        </div>

                        {/* Num badge (pinned to orbit) */}
                        <div className={`absolute -bottom-1 -right-1 z-20 bg-white border rounded-full w-4 h-4 flex items-center justify-center shadow-xs ${s.dark ? "border-zinc-200" : "border-zinc-100"}`}>
                          <span className={`text-[6px] font-black tracking-widest ${s.dark ? "text-zinc-500" : "text-orange-500"}`}>
                            {s.num}
                          </span>
                        </div>
                      </div>
                      
                      {/* Text */}
                      <div className="flex-1">
                        <p className="font-black text-[11px] uppercase tracking-widest text-zinc-900 mb-1">
                          {s.title}
                        </p>
                        <p className="text-[10px] font-light text-zinc-400 leading-relaxed">
                          {s.sub}
                        </p>
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
                <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-5 py-2.5">
                  <RefreshCw size={11} strokeWidth={2.5} className="text-orange-500 shrink-0" />
                  <span className="text-[9px] font-black uppercase tracking-[0.1em] text-orange-600 whitespace-nowrap">Continuous Brand Evolution</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA strip */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-900 rounded-[24px] px-7 py-5">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <p className="text-[12px] font-bold text-white uppercase tracking-tight text-center sm:text-left">
              Every step managed by a dedicated Grow Orbit strategist.
            </p>
          </div>
          <button
            onClick={scrollToForm}
            className="group shrink-0 flex items-center gap-2.5 bg-orange-500 hover:bg-white hover:text-zinc-900 text-white font-black text-[10px] uppercase tracking-[0.2em] px-6 py-3 rounded-xl transition-all duration-300 no-underline"
          >
            Start The Process
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
