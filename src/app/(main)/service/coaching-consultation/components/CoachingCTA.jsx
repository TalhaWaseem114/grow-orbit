"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Headphones,
  MessageCircle, Clock, Users, CalendarCheck, Zap
} from "lucide-react";

// --- Sub-component: The Primary Gradient Button ---
const CoachingCTAButton = ({ href = "/contact", children }) => (
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

export default function CoachingCTA() {
  return (
    <div className="w-full pb-10 bg-[#fafafa]">
      <section className="px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-[#0a0a0a] rounded-[32px] sm:rounded-[40px] py-8 sm:py-14 px-5 sm:px-8 lg:px-20 text-left relative overflow-hidden border border-white/5 group shadow-none">

            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />

            {/* Background Large Icon Decor */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.05] translate-x-1/4">
              <Headphones size={600} strokeWidth={0.2} className="text-orange-500" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              {/* Left Column: Content */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-white font-bold text-[9px] uppercase tracking-[0.4em]">Session Slots Available</span>
                </div>

                <h2
                  className="text-[42px] sm:text-4xl lg:text-6xl font-black tracking-tighter mb-6 sm:mb-8 leading-[0.9] text-white uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Stop guessing.<br />
                  <span className="italic font-light block mt-2 tracking-normal text-orange-500 lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                    start scaling.
                  </span>
                </h2>

                <p className="text-zinc-400 font-light mb-10 text-base lg:text-lg leading-relaxed max-w-xl">
                  Book a free 15-minute discovery call with our Amazon strategists. Get clarity on your biggest growth blockers and a clear path forward — no obligations assumed.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-16">
                  <CoachingCTAButton href="/get-started">
                    Get Free Strategy Call
                  </CoachingCTAButton>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Expert Strategists</span>
                  </div>
                </div>

                {/* Bottom Row Points */}
                <div className="pt-8 border-t border-white/5 flex flex-wrap items-center gap-x-6 sm:gap-x-10 gap-y-3">
                  {[
                    "1-on-1 Strategy Sessions",
                    "Actionable Growth Plans",
                    "No Long-Term Commitment"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white whitespace-nowrap">
                      <CheckCircle2 size={12} className="text-orange-500/70 shrink-0" strokeWidth={3} />
                      {item}
                    </div>
                  ))}
                </div>

              </div>

              {/* Right Column: Session Preview Card */}
              <div className="lg:col-span-5 mt-12 lg:mt-[60px] relative group/card self-start">
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 shadow-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-500">

                  {/* Card Glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  {/* Header */}
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[9px] font-mono text-orange-500/80 uppercase tracking-widest">Session: Visual Click</span>
                      </div>
                      <h4 className="text-xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>CTR Audit</h4>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-inner">
                      <Zap size={18} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Steps with Timeline spacing */}
                  <div className="space-y-0 relative z-10 before:absolute before:inset-y-2 before:left-[15px] before:w-[1px] before:bg-white/10">
                    {[
                      { icon: <Zap size={14} />, title: "1. SERP Landscape Scan", desc: "Identify how your image compares to top competitors." },
                      { icon: <MessageCircle size={14} />, title: "2. Visual Feature Analysis", desc: "Guide lighting, composition, and product pop." },
                      { icon: <CalendarCheck size={14} />, title: "3. Winning Roadmap", desc: "Specific action steps for implementing higher-CTR visual changes.", active: true }
                    ].map((step, i) => (
                      <div key={i} className={`relative flex gap-4 ${i !== 2 ? 'pb-6' : ''} group/step`}>
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center z-10 transition-all ${step.active ? 'bg-orange-500 border-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-zinc-900 border-white/10 text-zinc-400'}`}>
                          {step.icon}
                        </div>
                        <div className="pt-0.5">
                          <h5 className={`text-[11px] font-bold mb-1 uppercase tracking-wide ${step.active ? 'text-orange-400' : 'text-white'}`}>{step.title}</h5>
                          <p className="text-[9px] text-zinc-500 font-light leading-relaxed max-w-[200px]">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Meeting Context Footer */}
                  <div className="mt-6 bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-center sm:justify-between gap-4 relative z-10 backdrop-blur-md text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                       <div className="w-10 h-10 rounded-full border border-white/5 bg-zinc-800/50 flex items-center justify-center text-zinc-400">
                         <Users size={16} />
                       </div>
                       <div>
                         <p className="text-[11px] font-bold text-white uppercase tracking-widest mb-0.5">Analysis Session</p>
                         <p className="text-[10px] text-zinc-500 font-mono">15 Mins • 1-on-1 Access</p>
                       </div>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-orange-500/10 text-orange-500 text-[9px] font-bold tracking-[0.2em] uppercase border border-orange-500/20">
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
