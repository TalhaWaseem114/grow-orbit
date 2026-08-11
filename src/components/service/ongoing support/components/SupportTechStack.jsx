"use client";

import React from "react";
import { CheckCircle2, Terminal as TerminalIcon } from "lucide-react";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-6 h-[1.5px] bg-orange-500" />
    <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-orange-600/90">
      {children}
    </span>
  </div>
);

export default function SupportTechStack() {
  const tools = [
    { name: "Amazon Seller Central", cat: "OPS",   status: "CONNECTED", pulse: "bg-emerald-500" },
    { name: "Helium 10 Suite",        cat: "INTEL", status: "STREAMING", pulse: "bg-orange-500" },
    { name: "Data Dive Analytics",    cat: "DATA",  status: "LIVE",      pulse: "bg-emerald-500" },
    { name: "Slack Enterprise",       cat: "COMMS", status: "DIRECT",    pulse: "bg-emerald-500" },
    { name: "Notion Playbooks",       cat: "DOCS",  status: "SYNCED",    pulse: "bg-blue-500" },
    { name: "Splitly / PickFu",       cat: "A/B",   status: "TESTING",   pulse: "bg-amber-500" },
  ];

  return (
    <section id="matrix" className="w-full bg-white overflow-hidden scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Left: Terminal Side */}
        <div className="bg-[#050505] p-6 sm:p-10 lg:px-20 relative min-h-[480px] md:min-h-[580px] flex flex-col justify-center overflow-hidden">

          {/* Background Grid */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
               style={{ backgroundImage: `linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

          {/* Glow and Scanline Effects */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

          <style>{`
          `}</style>

          {/* New Element: The Scanning Radar Line (Optimized static variant) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            <div className="absolute w-full h-[1.5px] bg-orange-500/15 shadow-[0_0_15px_rgba(249,115,22,0.4)] top-1/2" />
          </div>

          <div className="relative z-10 w-full max-w-3xl">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                </div>
                <span className="ml-2 text-[8px] sm:text-[9px] font-mono text-zinc-500 uppercase tracking-[0.2em] sm:tracking-[0.3em] flex items-center gap-2">
                  <TerminalIcon size={12} className="text-orange-500" />
                  stack_v4.0.7 — status: nominal
                </span>
              </div>
            </div>

            {/* List Body */}
            <div className="font-mono text-[11px] leading-none">
              <div className="space-y-1">
                {tools.map((t, i) => (
                  <div key={i} className="flex items-center gap-4 sm:gap-6 py-3.5 group hover:bg-white/[0.03] rounded-xl px-4 -mx-4 transition-all duration-300 relative z-10">
                    <span className="text-zinc-700 font-bold w-4 hidden sm:block">0{i+1}</span>
                    <span className="text-zinc-200 text-xs sm:text-[13px] flex-1 group-hover:text-orange-400 transition-colors tracking-tight font-medium uppercase truncate">{t.name}</span>

                    <div className="hidden md:flex items-end gap-1 h-3 w-10 opacity-20 group-hover:opacity-60">
                        {[20, 60, 40, 80].map((h, idx) => (
                            <div key={idx} className="w-1 bg-orange-500" style={{ height: `${h}%` }} />
                        ))}
                    </div>

                    <span className="hidden sm:block text-zinc-600 text-[8px] font-bold border border-zinc-800 px-1.5 py-0.5 rounded uppercase tracking-widest">{t.cat}</span>

                    <div className="flex items-center gap-2 sm:gap-3 min-w-[80px] sm:min-w-[110px] justify-end">
                      <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${t.pulse} shadow-[0_0_10px_rgba(16,185,129,0.3)] animate-pulse`} />
                      <span className="text-zinc-400 group-hover:text-white text-[8px] sm:text-[9px] font-black tracking-widest transition-colors">{t.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Input */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-orange-500/80 flex items-center gap-3">
                  <span className="text-zinc-500 uppercase tracking-widest text-[8px] sm:text-[9px]">$ initialize_global_sync...</span>
                  <span className="w-2 h-4 bg-orange-500/80 inline-block" />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Side */}
        <div className="bg-white p-8 sm:p-12 lg:p-20 flex flex-col justify-center relative min-h-[480px] md:min-h-[580px]">
          <div className="absolute top-0 left-0 w-full lg:w-[2px] h-[2px] lg:h-full bg-gradient-to-r lg:bg-gradient-to-b from-orange-500 via-orange-500/10 to-transparent" />

          <div className="max-w-xl mx-auto lg:mx-0">
            <SectionLabel>Infrastructure Efficiency</SectionLabel>

            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.88] mb-6 text-zinc-900"
                style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Built for<br />
              <span className="text-zinc-200 italic font-light lowercase"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                Velocity.
              </span>
            </h2>

            <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed mb-8">
              We deploy an infrastructure designed to detect <span className="text-orange-600 font-medium">market shifts</span> before they impact your bottom line.
            </p>

            <div className="grid grid-cols-1 gap-3">
              {[
                "Dedicated strategy pods per vertical",
                "Weekly algorithmic KPI deep-dives",
                "Direct encrypted communication (24/7)",
                "Proactive search-intent monitoring",
              ].map((t, i) => (
                <div key={i} className="group flex items-center justify-between p-3 sm:p-4 rounded-xl border border-zinc-100 bg-zinc-50/40 hover:border-orange-500/20 hover:bg-white hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-orange-500/5 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                      <CheckCircle2 size={13} />
                    </div>
                    <span className="text-[10px] sm:text-[12px] font-bold uppercase tracking-tight text-zinc-800">{t}</span>
                  </div>
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-zinc-200 group-hover:bg-orange-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}