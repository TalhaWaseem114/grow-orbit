import React from "react";
import { BarChart3, Zap, Fingerprint, CheckCircle2 } from "lucide-react";

export default function SupportFramework() {
  const pillars = [
    { icon: <BarChart3 size={24} />,    title: "KPI Deep-Dives",  metric: "Weekly", desc: "Granular performance reviews identifying micro-fluctuations in ranking, conversion, and yield across every SKU." },
    { icon: <Zap size={24} />,          title: "Continuous Testing",   metric: "Active", desc: "Always-on A/B testing of images, copy, and ad placements to squeeze every percentage of potential growth." },
  ];

  return (
    <section className="py-20 md:py-32 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)" }} />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-24 text-left">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-[2px] bg-orange-500" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-400">Strategic Continuity</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-4">
              Iterate or<br />
              <span className="italic font-light lowercase tracking-normal text-zinc-500" style={{ fontFamily: "'Playfair Display', serif" }}>evaporate.</span>
            </h2>
          </div>
          <p className="text-zinc-400 font-light max-w-sm text-sm md:text-base leading-relaxed pb-2">
            Standing still on Amazon is moving backward. We provide the high-velocity iteration required to stay ahead of the curve and maintain category dominance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.12] hover:border-orange-500/40 rounded-[32px] md:rounded-[40px] p-10 md:p-14 transition-all duration-700 overflow-hidden backdrop-blur-xl shadow-2xl text-left"
            >
              {/* Glossy Surface Reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none group-hover:opacity-150 transition-opacity duration-700" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500 shadow-inner">
                    {p.icon}
                  </div>
                  <span className="text-4xl font-black text-white/5 group-hover:text-orange-500/30 transition-colors select-none">0{i + 1}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-orange-400 transition-colors leading-tight">{p.title}</h3>
                <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed mb-10 group-hover:text-zinc-300 transition-colors">{p.desc}</p>

                <div className="mt-auto flex items-center gap-4 pt-8 border-t border-white/5">
                  <span className="text-3xl font-black text-orange-500">{p.metric}</span>
                  <div className="h-px flex-1 bg-white/5" />
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest whitespace-nowrap">Core_Process</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
