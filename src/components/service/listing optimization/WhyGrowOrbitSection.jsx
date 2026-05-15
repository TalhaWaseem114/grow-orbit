import React from 'react';
import Link from "next/link";
import {
  ShieldCheck,
  Compass,
  Award,
  RefreshCcw,
  Terminal,
  CheckCircle2,
  ChevronRight,
  Activity
} from 'lucide-react';

// Local SectionLabel for self-containment
const LocalSectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6 font-mono">
    <div className="flex gap-1">
      <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
      <div className="w-4 h-px bg-orange-500 self-center"></div>
    </div>
    <span className="text-orange-500 font-bold text-[10px] uppercase tracking-[0.4em] block">
      {children}
    </span>
  </div>
);


export default function WhyGrowOrbitSection() {
  const values = [
    { icon: <ShieldCheck size={18} />, title: "System-based optimization", body: "Every action follows a documented framework." },
    { icon: <Compass size={18} />, title: "Data over assumptions", body: "Decisions grounded in research and metrics." },
    { icon: <Award size={18} />, title: "Amazon-native expertise", body: "Deep familiarity with A9/A10 algorithm behavior." },
    { icon: <RefreshCcw size={18} />, title: "Continuous refinement", body: "Optimization isn't a one-time event." },
  ];

  const stats = [
    { num: "5-Phase", label: "Optimization framework applied to every engagement" },
    { num: "100%", label: "Amazon-native focus" },
    { num: "Ongoing", label: "Performance monitoring" },
    { num: "Audit-First", label: "Every engagement begins with full diagnostic" },
  ];

  return (
    <section className="py-32 bg-zinc-950 relative overflow-hidden text-left border-t border-white/5">
      {/* BACKGROUND DECORATION: Orbital Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/3 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/2 rounded-full pointer-events-none" />

      {/* Atmospheric Glow */}
      <div className="absolute -bottom-64 -left-64 w-[800px] h-[800px] bg-orange-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT COLUMN: NARRATIVE */}
          <div>
            <LocalSectionLabel>Why Grow Orbit</LocalSectionLabel>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-white leading-[0.9] mb-8 uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Structured <br />expertise, <br />
              <span className="text-zinc-500 italic font-light lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>not generalist services.</span>
            </h2>
            <div className="text-xl text-zinc-400 font-light leading-relaxed mb-12 max-w-xl">
              Most Amazon agencies apply generic e-commerce principles to a platform with distinct mechanics. Our practice is built <span className="text-white font-medium italic">exclusively</span> around Amazon.
            </div>

            <div className="grid sm:grid-cols-2 gap-y-10 gap-x-8">
              {values.map((val, i) => (
                <div key={i} className="group">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                      {val.icon}
                    </div>
                    <div className="text-[11px] sm:text-[13px] font-black text-white uppercase tracking-widest flex-1 break-words leading-snug">{val.title}</div>
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-500 leading-relaxed pl-14 font-light pr-2">
                    {val.body}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: DATA CARDS */}
          <div className="relative">
            {/* Aesthetic Glow */}
            <div className="absolute -inset-4 bg-orange-500/10 blur-3xl rounded-full opacity-30"></div>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-6 sm:p-8 bg-white/3 border border-white/10 rounded-[32px] backdrop-blur-sm hover:border-orange-500/50 transition-all duration-500 group overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-3xl sm:text-4xl font-black text-white tracking-tighter group-hover:text-orange-500 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {stat.num}
                    </div>
                    <div className="w-8 h-8 shrink-0 rounded-lg bg-white/5 flex items-center justify-center text-zinc-600 group-hover:text-orange-500 group-hover:bg-orange-500/10 transition-all">
                      <CheckCircle2 size={14} />
                    </div>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-zinc-500 leading-relaxed font-bold uppercase tracking-wider sm:tracking-widest break-words">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* INTEGRITY TAG */}
            <Link href="/contact" className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-6 bg-orange-500 rounded-3xl group/tag hover:shadow-[0_20px_40px_rgba(249,115,22,0.3)] transition-all duration-500 cursor-pointer no-underline gap-4 sm:gap-0">
              <div className="flex items-center gap-4 text-white justify-center sm:justify-start">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-black/10 flex items-center justify-center">
                  <Terminal size={18} />
                </div>
                <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] break-words">Protocol_Active</div>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/20 px-4 py-3 sm:py-2 rounded-full backdrop-blur-md border border-white/10">
                <div className="w-1.5 h-1.5 shrink-0 rounded-full bg-white animate-pulse" />
                <span className="text-[9px] font-bold text-white uppercase tracking-[0.2em] break-words text-center">Real-time Optimization</span>
              </div>
            </Link>
          </div>

        </div>

        {/* SECTION FOOTER */}
        <div className="mt-32 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.5em]">
            Practice_Focus: Amazon_Exclusive
          </div>
          <Link href="/contact" className="flex items-center gap-4 group cursor-pointer no-underline">
            <span className="text-[11px] font-black text-white uppercase tracking-widest group-hover:text-orange-500 transition-colors underline-offset-8">Secure Your Tier-1 Ranking</span>
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-orange-500 group-hover:border-orange-500 transition-all">
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
