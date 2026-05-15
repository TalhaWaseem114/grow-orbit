"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Globe,
  Monitor, Users, MousePointer2, RefreshCcw, TrendingUp
} from "lucide-react";

// --- Sub-component: The Primary Gradient Button ---
const DtcCTAButton = ({ href = "/contact", children }) => (
  <Link
    href={href}
    className="group relative flex sm:inline-flex w-full sm:w-auto px-8 sm:px-10 py-4 bg-orange-600 text-white rounded-full font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:scale-[1.02] active:scale-95 no-underline border-none shadow-none items-center justify-center"
  >
    <span className="relative z-10 flex items-center justify-center gap-3 sm:gap-4">
      {children}
      <ArrowRight size={16} className="group-hover:translate-x-2 transition-all duration-300 text-white" />
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-orange-400 transition-transform duration-500 ease-in-out"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[horizontal-scan_2s_linear_infinite]"></div>
  </Link>
);

export default function DtcWebsiteCTA() {
  return (
    <div className="w-full pb-6 sm:pb-10 bg-[#fafafa]">
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-[#0a0a0a] rounded-[32px] sm:rounded-[40px] py-10 sm:py-14 px-6 sm:px-8 lg:px-20 text-left relative overflow-hidden border border-white/5 group shadow-none">

            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />

            {/* Background Large Icon Decor */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.05] translate-x-1/4">
              <Globe size={400} strokeWidth={0.2} className="text-orange-500 lg:size-[600px]" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column: Content */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-white font-bold text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.4em]">Audit Slots: 2 Available</span>
                </div>

                <h2
                  className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tighter mb-6 sm:mb-8 leading-[0.9] text-white uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Stop renting customers.<br />
                  <span className="italic font-light block mt-2 tracking-normal text-orange-500 lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                    own the experience.
                  </span>
                </h2>

                <p className="text-zinc-400 font-light mb-8 sm:mb-10 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
                  Marketplaces own your data; you should own your destiny. Book a **15-minute DTC Growth Audit** to identify conversion leaks and build a high-LTV digital flagship.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-10 sm:mb-16 w-full">
                  <div className="w-full sm:w-auto">
                    <DtcCTAButton href="/get-started">
                      Get Free Strategy Call
                    </DtcCTAButton>
                  </div>
                  <div className="flex items-center gap-3 pl-1 sm:pl-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Performance UX</span>
                  </div>
                </div>

                {/* Bottom Row Points */}
                <div className="pt-8 border-t border-white/5 flex flex-wrap items-center gap-x-10 gap-y-3">
                  {[
                    "Conversion Rate Optimization",
                    "Retention & LTV Strategy",
                    "Tech Stack Consolidation"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white whitespace-nowrap">
                      <CheckCircle2 size={12} className="text-orange-500/70" strokeWidth={3} />
                      {item}
                    </div>
                  ))}
                </div>

              </div>

              {/* Right Column: 15-Minute Strategy Card */}
              <div className="lg:col-span-5 relative group/card mt-8 lg:mt-0">
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-500 text-left">

                  {/* Card Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  {/* Header */}
                  <div className="flex justify-between items-start mb-8 sm:mb-10 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[8px] font-mono text-orange-500/80 uppercase tracking-widest">Session: DTC Scaling</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>Growth Map</h4>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.1)]">
                      <Monitor size={18} className="sm:size-[22px]" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Steps with Timeline spacing */}
                  <div className="space-y-0 relative z-10 before:absolute before:inset-y-2 before:left-[15px] sm:before:left-[19px] before:w-[1px] before:bg-white/10">
                    {[
                      { icon: <MousePointer2 size={14} className="sm:size-4" />, title: "1. Friction Analysis", desc: "Identify the exact step where 70% of your mobile traffic bounces." },
                      { icon: <RefreshCcw size={14} className="sm:size-4" />, title: "2. Retention Loop", desc: "Audit your post-purchase flow to drive repeat customer behavior." },
                      { icon: <TrendingUp size={14} className="sm:size-4" />, title: "3. Scaling Roadmap", desc: "Infrastructure updates designed to handle 10x your current volume.", active: true }
                    ].map((step, i) => (
                      <div key={i} className={`relative flex gap-4 sm:gap-6 ${i !== 2 ? 'pb-6 sm:pb-8' : ''} group/step`}>
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center z-10 transition-all ${step.active ? 'bg-orange-500 border-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-zinc-900 border-white/10 text-zinc-400 group-hover/step:border-orange-500/50'}`}>
                          {step.icon}
                        </div>
                        <div className="pt-0.5 sm:pt-1">
                          <h5 className={`text-[11px] sm:text-[13px] font-bold mb-1 sm:mb-1.5 uppercase tracking-wide ${step.active ? 'text-orange-400' : 'text-white'}`}>{step.title}</h5>
                          <p className="text-[9px] sm:text-[11px] text-zinc-500 font-light leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Meeting Context Footer */}
                  <div className="mt-10 sm:mt-12 bg-black/40 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col xs:flex-row items-center justify-between gap-5 relative z-10 backdrop-blur-md">
                    <div className="flex items-center gap-4 w-full xs:w-auto">
                       <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
                         <Users size={16} className="sm:size-[18px]" />
                       </div>
                       <div>
                         <p className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-widest mb-0.5">Foundational Session</p>
                         <p className="text-[9px] sm:text-[10px] text-zinc-500 font-mono">15 Mins • Live Site Review</p>
                       </div>
                    </div>
                    <div className="w-full xs:w-auto text-center px-4 py-2 rounded-xl bg-orange-500/10 text-orange-500 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase border border-orange-500/20">
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
