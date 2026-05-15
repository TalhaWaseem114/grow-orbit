"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, TrendingDown,
  Calendar, Gauge, Zap, BarChart3, ShieldAlert
} from "lucide-react";

// --- Sub-component: The Primary Gradient Button ---
const AuditCTAButton = ({ href = "/contact", children }) => (
  <Link
    href={href}
    className="group relative inline-flex justify-center w-full sm:w-auto px-6 sm:px-10 py-4 bg-orange-600 text-white rounded-full font-bold text-[9px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.3em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:scale-[1.02] active:scale-95 no-underline border-none"
  >
    <span className="relative z-10 flex items-center justify-center gap-3 sm:gap-4 w-full">
      {children}
      <ArrowRight size={16} className="group-hover:translate-x-2 transition-all duration-300 text-white" />
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-orange-400 transition-transform duration-500 ease-in-out"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[horizontal-scan_2s_linear_infinite]"></div>
  </Link>
);

export default function PPCEfficiencyCTA() {
  return (
    <div className="w-full pb-10 bg-[#fafafa]">
      <section className="px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Main Container - Approved py-14 height */}
          <div className="bg-[#0a0a0a] rounded-[40px] py-10 px-6 sm:px-10 lg:px-16 text-left relative overflow-hidden border border-white/5 group shadow-none">

            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />

            {/* Background Large Icon Decor */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.05] translate-x-1/4">
              <TrendingDown size={600} strokeWidth={0.2} className="text-orange-500" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column: Content */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-white font-bold text-[9px] uppercase tracking-[0.4em]">Audit Status: Priority Access</span>
                </div>

                <h2
                  className="text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-[0.9] text-white uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Kill the waste.<br />
                  <span className="italic font-light block mt-2 tracking-normal text-orange-500 lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                    keep the profit.
                  </span>
                </h2>

                <p className="text-zinc-400 font-light mb-10 text-base lg:text-lg leading-relaxed max-w-xl">
                  Is your PPC eating your margins? Book a **15-minute Efficiency Diagnostic** to find exactly where your budget is being bled by non-performing search terms.
                </p>

                <p className="text-[10px] md:text-[11px] italic text-zinc-500 mb-4 flex items-center gap-2">
                  <span className="text-orange-500 not-italic">★★★★★</span>
                  "Joined as PPC Efficiency. Revenue up 38% in 60 days." — Kitchen Brand
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-16">
                  <AuditCTAButton href="/get-started">
                    Cut My Wasted Spend
                  </AuditCTAButton>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Immediate ACOS Impact</span>
                  </div>
                </div>

                {/* Bottom Row Points */}
                <div className="pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    "Negative Keyword Isolation",
                    "ACOS vs. TACoS Analysis",
                    "Placement Bid Strategy"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white whitespace-nowrap">
                      <CheckCircle2 size={12} className="text-orange-500/70" strokeWidth={3} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: 15-Minute Diagnostic Card */}
              <div className="lg:col-span-5 block mt-12 lg:mt-0 relative group/card">
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-8 shadow-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-500">

                  {/* Card Glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  {/* Header */}
                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[8px] font-mono text-orange-500/80 uppercase tracking-widest">Efficiency Focus</span>
                      </div>
                      <h4 className="text-2xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>Audit Agenda</h4>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-inner">
                      <Gauge size={22} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Steps with FIXED Timeline Alignment */}
                  <div className="space-y-0 relative z-10 before:absolute before:inset-y-3 before:left-[19.5px] before:w-[1px] before:bg-white/10">

                    {[
                      {
                        icon: <ShieldAlert size={16} />,
                        title: "1. Bleed Detection",
                        desc: "Identifying high-spend, zero-conversion keywords."
                      },
                      {
                        icon: <BarChart3 size={16} />,
                        title: "2. Semantic Gaps",
                        desc: "Finding where Amazon is misinterpreting your intent."
                      },
                      {
                        icon: <Zap size={16} />,
                        title: "3. Scaling Trigger",
                        desc: "Setting parameters for risk-free algorithmic scaling.",
                        active: true
                      }
                    ].map((step, i) => (
                      <div key={i} className={`relative flex gap-6 ${i !== 2 ? 'pb-8' : ''} group/step`}>
                        {/* Centered Icon Container - shrink-0 prevents the circle from squishing */}
                        <div className={`w-10 h-10 shrink-0 rounded-full border flex items-center justify-center z-10 transition-all duration-300 ${
                          step.active
                          ? 'bg-orange-500/20 border-orange-500 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                          : 'bg-zinc-900 border-white/10 text-zinc-400 group-hover/step:border-orange-500/50'
                        }`}>
                          {step.icon}
                        </div>

                        <div className="pt-1">
                          <h5 className={`text-[13px] font-bold mb-1.5 uppercase tracking-wide ${step.active ? 'text-orange-400' : 'text-white'}`}>
                            {step.title}
                          </h5>
                          <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Meeting Context Footer */}
                  <div className="mt-10 bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between relative z-10 backdrop-blur-md gap-4 sm:gap-0">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full border border-white/10 bg-zinc-800 flex items-center justify-center text-zinc-400">
                         <Calendar size={16} />
                       </div>
                       <div>
                         <p className="text-[11px] font-bold text-white uppercase tracking-widest mb-0.5">Rapid Spend Review</p>
                         <p className="text-[10px] text-zinc-500 font-mono">15 Mins • 1-on-1 Access</p>
                       </div>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-orange-500/10 text-orange-500 text-[10px] font-bold tracking-widest uppercase border border-orange-500/20 whitespace-nowrap w-full sm:w-auto text-center">
                      $0.00
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