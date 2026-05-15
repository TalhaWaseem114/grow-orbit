"use client";

import React from "react";
import { Search, Zap, Fingerprint, MessageSquare, Repeat, BarChart3 } from "lucide-react";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500" />
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
      {children}
    </span>
  </div>
);

export default function SupportCycles() {
  const deliverables = [
    { icon: <Search size={20} />,       title: "Weekly Performance Audits",   desc: "Deep-dive KPI reviews with granular ranking, conversion, and market share analysis.",               accent: "from-orange-500 to-amber-400" },
    { icon: <Zap size={20} />,          title: "Dynamic Split Testing",        desc: "Continuous A/B testing of images, copy, pricing, and ad placements.",                               accent: "from-rose-500 to-orange-400" },
    { icon: <Fingerprint size={20} />,  title: "Competitor Intelligence",      desc: "Real-time tracking of competitor moves, pricing shifts, and algorithm changes.",                    accent: "from-violet-500 to-orange-400" },
    { icon: <MessageSquare size={20} />, title: "Dedicated Slack Channel",      desc: "Unfiltered access to lead strategists via dedicated communication channels.",                        accent: "from-orange-500 to-yellow-400" },
    { icon: <Repeat size={20} />,       title: "Algorithm Adaptation",         desc: "Proactive monitoring and rapid response to Amazon algorithm updates.",                             accent: "from-emerald-500 to-orange-400" },
    { icon: <BarChart3 size={20} />,    title: "Executive Reporting",           desc: "Weekly executive reports with strategic recommendations and trajectory analysis.",                  accent: "from-orange-500 to-red-400" },
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden text-left">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-24 gap-12">
          <div className="max-w-2xl">
            <SectionLabel>Weekly_Output_Stack</SectionLabel>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 leading-[0.9] mb-6 md:mb-8 uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              The Growth Stack —<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>What You Get Every Week.</span>
            </h2>
          </div>
          
          {/* Visual Timeline Card */}
          <div className="flex-1 lg:max-w-md bg-zinc-950 rounded-[32px] p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[60px] rounded-full pointer-events-none" />
             <div className="flex flex-col gap-6 relative z-10">
                {[
                  { time: "MON", label: "Executive Weekly Audit", desc: "Monday morning performance snapshot delivered to Slack." },
                  { time: "WEEK", label: "Ongoing Optimization",  desc: "Continuous bidding, copy, and creative iteration." },
                  { time: "MO",   label: "Strategy Alignment",    desc: "Monthly deep-dive call with lead strategist." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                     <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-[8px] font-black text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                           {item.time}
                        </div>
                        {i < 2 && <div className="w-[1px] h-full bg-gradient-to-b from-orange-500/40 to-transparent" />}
                     </div>
                     <div className="pb-2">
                        <p className="text-[11px] font-black uppercase tracking-widest text-white mb-1">{item.label}</p>
                        <p className="text-[10px] text-zinc-500 font-light leading-relaxed">{item.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-5">
          {deliverables.map((d, i) => (
            <div
              key={i}
              className={`group relative rounded-[28px] md:rounded-[32px] overflow-hidden transition-all duration-700 bg-white border border-zinc-100
                shadow-[0_20px_40px_-20px_rgba(0,0,0,0.06)] md:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]
                hover:shadow-[0_40px_80px_-20px_rgba(249,115,22,0.18)] md:hover:shadow-[0_80px_150px_-20px_rgba(249,115,22,0.22)]
                ${i % 2 === 0 ? 'lg:translate-y-0' : 'lg:translate-y-12'}
              `}
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${d.accent}`} />
              <div className="bg-white rounded-b-[28px] md:rounded-b-[32px] p-8 md:p-10 relative">
                <div className="absolute -top-px left-8 w-px h-8 bg-gradient-to-b from-orange-500/40 to-transparent" />

                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white border border-zinc-200 group-hover:border-orange-500/30 flex items-center justify-center text-orange-500 transition-all group-hover:shadow-lg group-hover:shadow-orange-500/10">
                      {d.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-zinc-900 text-white text-[9px] font-black flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="flex-1 h-px bg-zinc-100 group-hover:bg-orange-500/20 transition-colors" />
                </div>

                <h3 className="text-sm md:text-base font-black uppercase tracking-tight text-zinc-900 mb-3 group-hover:text-orange-500 transition-colors leading-tight">
                  {d.title}
                </h3>
                <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed">
                  {d.desc}
                </p>

                <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">SYSTEM_ACTIVE</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}