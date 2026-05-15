import React from "react";
import { Search, Target, Zap, BarChart, Terminal, ShieldCheck, Activity } from "lucide-react";

// Use a local SectionLabel consistent with the growth automation style
const SectionLabel = ({ children, light = false }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className={`w-8 h-[2px] ${light ? "bg-orange-500/50" : "bg-orange-500"}`}></div>
    <span className={`font-bold text-[10px] font-mono uppercase tracking-[0.4em] block ${light ? "text-orange-400" : "text-orange-500"}`}>
      {children}
    </span>
  </div>
);

export default function FrameworkSection() {
  const steps = [
    {
      step: "01",
      tag: "INDEX_SYNC: 01",
      icon: <Search size={22} />,
      title: "Intelligence & Architecture",
      desc: "Deep research into search demand clusters merged with algorithmic title construction and semantic keyword placement for the A10 crawler.",
      metric: "98.6% Indexation",
      hud: "FOUNDATION: ACTIVE"
    },
    {
      step: "02",
      tag: "INDEX_SYNC: 02",
      icon: <Target size={22} />,
      title: "Conversion Logic",
      desc: "Psychology-driven bullet point logic, messaging alignment, and A+ content modules engineered to reduce bounce rates and friction.",
      metric: "+45% CVR Lift",
      hud: "INTENT_MAPPING: ACTIVE"
    },
    {
      step: "03",
      tag: "INDEX_SYNC: 03",
      icon: <Zap size={22} />,
      title: "Velocity Strategy",
      desc: "Coordination of organic ranking momentum and paid traffic strategy to ensure your listing earns visibility for free over the long term.",
      metric: "CPC Efficiency",
      hud: "VELOCITY_CHECK: ACTIVE"
    },
    {
      step: "04",
      tag: "INDEX_SYNC: 04",
      icon: <BarChart size={22} />,
      title: "Iterative Refinement",
      desc: "Always-on monitoring and data-driven iterative optimization to maintain category dominance as market dynamics shift.",
      metric: "Live Optimization",
      hud: "ITERATIVE_LOOP: STABLE"
    }
  ];

  return (
    <section className="py-32 bg-zinc-950 text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-600/8 blur-[160px] rounded-full pointer-events-none"></div>
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <SectionLabel light>The Grow Orbit Framework</SectionLabel>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              Built for <span className="text-orange-500">Market</span><br />Dominance.
            </h2>
          </div>
          <p className="text-zinc-500 font-light max-w-sm text-sm leading-relaxed">
            A phase-locked tactical methodology designed to achieve and sustain algorithmic dominance in modern marketplaces.
          </p>
        </div>

        {/* Process Grid: Now using 4 columns for consistency across service pages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-[40px] overflow-hidden">
          {steps.map((w, i) => (
            <div
              key={i}
              className="group p-10 bg-zinc-900 hover:bg-orange-500 transition-all duration-700 relative overflow-hidden flex flex-col min-h-[440px]"
            >
              {/* Dense dot grid — visible on hover only */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                  backgroundSize: "6px 6px",
                }}
              ></div>

              {/* Step watermark */}
              <span className="absolute top-6 right-6 text-white/5 font-black text-5xl group-hover:text-white/15 transition-colors select-none">{w.step}</span>

              {/* Orange glow border on hover */}
              <div className="absolute inset-0 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shadow-[inset_0_0_0_1px_rgba(249,115,22,0.3)]"></div>

              <div className="relative z-10 flex flex-col h-full">
                {/* ID tag */}
                <span className="inline-block self-start font-mono text-[8px] font-bold tracking-widest text-zinc-700 group-hover:text-white/70 border border-zinc-800 group-hover:border-white/30 px-2 py-0.5 rounded-full mb-6 transition-all duration-500">
                  {w.tag}
                </span>

                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:bg-white mb-6 transition-colors shadow-[0_0_8px_rgba(249,115,22,1)]"></div>
                <div className="text-orange-500 group-hover:text-white transition-colors mb-6">{w.icon}</div>
                <h3 className="text-xl font-bold mb-4 tracking-tight uppercase text-white">{w.title}</h3>
                <p className="text-zinc-500 group-hover:text-white/80 text-sm font-light leading-relaxed mb-6 flex-1">{w.desc}</p>
                <span className="text-[10px] font-bold tracking-widest uppercase text-orange-500 group-hover:text-white/70 transition-colors font-mono">{w.metric}</span>

                {/* HUD label bottom-right */}
                <span className="absolute bottom-4 right-5 font-mono text-[7px] text-zinc-800 group-hover:text-white/20 tracking-widest transition-colors select-none">
                  {w.hud}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

