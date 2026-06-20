"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Activity,
  Calendar, Users, SearchCode, TrendingDown, Target, Rocket
} from "lucide-react";

// --- Sub-component: The Primary Gradient Button ---
const LaunchCTAButton = ({ href = "/contact", children }) => (
  <Link
    href={href}
    className="group relative inline-flex justify-center w-full sm:w-auto px-6 sm:px-10 py-4 bg-orange-600 text-white rounded-full font-bold text-[9px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.3em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:scale-[1.02] active:scale-95 no-underline border-none"
  >
    <span className="relative z-10 flex items-center justify-center gap-3 sm:gap-4 w-full">
      {children}
      <ArrowRight size={16} className="group-hover:translate-x-2 transition-all duration-300 text-white" />
    </span>
    {/* Sliding Background */}
    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-orange-400 transition-transform duration-500 ease-in-out"></div>
    {/* Glass Shine Pulse */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[horizontal-scan_2s_linear_infinite]"></div>
  </Link>
);

export default function LaunchCTA() {
  return (
    <div className="w-full pb-10 bg-[#fafafa]">
      <section className="px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-[#0a0a0a] rounded-[40px] py-10 px-6 sm:px-10 lg:px-16 text-left relative overflow-hidden border border-white/5 group shadow-none">

            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />

            {/* Background Large Icon Decor */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.05] translate-x-1/4">
              <Rocket size={600} strokeWidth={0.2} className="text-orange-500" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              {/* Left Column: Content */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-white font-bold text-[9px] uppercase tracking-[0.4em]">Launch Capacity: Open</span>
                </div>

                <h2
                  className="text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-[0.9] text-white uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Stop guessing.<br />
                  <span className="italic font-light block mt-2 tracking-normal text-orange-500 lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                    start dominating.
                  </span>
                </h2>

                <p className="text-zinc-400 font-light mb-10 text-base lg:text-lg leading-relaxed max-w-xl">
                  Most brands get one launch window. We make sure you don't waste it. Book a **15-minute Launch Strategy Session** to engineer your entry—completely free.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-16">
                  <LaunchCTAButton href="/get-started">
                    Get Free Strategy Call
                  </LaunchCTAButton>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Launch Velocity Optimized</span>
                  </div>
                </div>

                {/* Bottom Row Points */}
                <div className="pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    "Full Velocity Roadmap",
                    "A10 Indexing Strategy",
                    "Category Entry Blueprint"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white whitespace-nowrap">
                      <CheckCircle2 size={12} className="text-orange-500/70" strokeWidth={3} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: 15-Minute Strategy Card */}
              <div className="lg:col-span-5 block mt-12 lg:mt-[60px] relative group/card self-start">
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-8 shadow-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-500">

                  {/* Card Glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  {/* Header */}
                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[8px] font-mono text-orange-500/80 uppercase tracking-widest">Session: Launch Strategy</span>
                      </div>
                      <h4 className="text-2xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>Launch Proto</h4>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-inner">
                      <Calendar size={22} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Steps with Timeline spacing */}
                  <div className="space-y-0 relative z-10 before:absolute before:inset-y-3 before:left-[19px] before:w-[2px] before:bg-white/10">
                    {[
                      { icon: <SearchCode size={16} />, title: "1. Market IQ", desc: "Identify competitor voids and gaps." },
                      { icon: <Target size={16} />, title: "2. Visual Stack", desc: "Day-1 conversion with A+ & Images." },
                      { icon: <TrendingDown size={16} />, title: "3. Ad Momentum", desc: "Concentrated A10 indexing pressure.", active: true }
                    ].map((step, i) => (
                      <div key={i} className={`relative flex gap-6 ${i !== 2 ? 'pb-8' : ''} group/step`}>
                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center z-10 transition-all ${step.active ? 'bg-orange-500/20 border-orange-500 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-zinc-900 border-white/10 text-zinc-400 group-hover/step:border-orange-500/50'}`}>
                          {step.icon}
                        </div>
                        <div className="pt-1">
                          <h5 className={`text-[13px] font-bold mb-1.5 uppercase tracking-wide ${step.active ? 'text-orange-400' : 'text-white'}`}>{step.title}</h5>
                          <p className="text-[11px] text-zinc-400 font-light leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Meeting Context Footer (Updated to 15 Mins) */}
                  <div className="mt-8 lg:mt-10 bg-black/40 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-5 relative z-10 backdrop-blur-md">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                       <div className="w-10 h-10 rounded-full border border-white/10 bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
                         <Users size={16} />
                       </div>
                       <div>
                         <p className="text-[11px] font-bold text-white uppercase tracking-widest mb-0.5">Execution Call</p>
                         <p className="text-[10px] text-zinc-500 font-mono">15 Mins • Launch Strategy</p>
                       </div>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-orange-500/10 text-orange-500 text-[10px] font-bold tracking-widest uppercase border border-orange-500/20 w-full sm:w-auto text-center">
                      Free Access
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes horizontal-scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
