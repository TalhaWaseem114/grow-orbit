import React from "react";
import { Search, Zap, Repeat, MessageSquare, Terminal, ArrowRight, RefreshCw } from "lucide-react";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500" />
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
      {children}
    </span>
  </div>
);

export default function HowWeWork() {
  const steps = [
    { num: "01", title: "Weekly Audit",   desc: "Deep-dive performance reviews identifying micro-fluctuations in ranking, conversion, and market share.", icon: <Search size={20} /> },
    { num: "02", title: "Rapid Execute",  desc: "Immediate implementation of optimizations across listings, keywords, and bidding strategies.",           icon: <Zap size={20} /> },
    { num: "03", title: "Split Testing",  desc: "Continuous A/B testing of images, copy, and ad placements to win every click and conversion.",          icon: <Repeat size={20} /> },
    { num: "04", title: "Strategy Sync",  desc: "Direct access to lead strategists for full performance review and vision alignment every week.",         icon: <MessageSquare size={20} /> },
  ];

  return (
    <section className="py-20 md:py-32 bg-[#fafafa] relative overflow-hidden text-left">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-20 text-left">
          <div className="max-w-2xl">
            <SectionLabel>Optimization_Sprint</SectionLabel>
            <h2 
              className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.88] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              The Weekly Cadence — <br className="hidden sm:block" />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>What Happens Every 7 Days</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-base md:text-lg font-light leading-relaxed max-w-sm pb-2">
            A clear, sequential process with defined inputs and outputs at every stage.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-[72px] left-0 right-0 h-px z-0">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 relative z-10">
            {steps.map((item, i) => (
              <div key={i} className="group text-center relative">
                <div className="relative mx-auto w-[120px] h-[120px] md:w-[144px] md:h-[144px] mb-6 md:mb-10 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-zinc-200 group-hover:border-orange-500/40 transition-all duration-700 group-hover:scale-110" />
                  <div className="absolute inset-2 rounded-full border border-zinc-100 group-hover:border-orange-500/20 transition-all duration-700" />
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border border-zinc-200 group-hover:bg-orange-500 group-hover:border-orange-500 flex items-center justify-center text-orange-500 group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-[0_0_40px_rgba(249,115,22,0.3)]">
                    {item.icon}
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white border border-zinc-200 group-hover:border-orange-500 group-hover:bg-orange-500 rounded-full w-8 h-8 flex items-center justify-center text-[10px] font-black text-zinc-400 group-hover:text-white transition-all shadow-sm">
                    {item.num}
                  </div>
                </div>
                <h3 className="text-[13px] font-black uppercase tracking-[0.2em] text-zinc-900 mb-2 md:mb-3 group-hover:text-orange-500 transition-colors">{item.title}</h3>
                <p className="text-[12px] md:text-[13px] text-zinc-500 leading-relaxed font-light max-w-[220px] mx-auto">{item.desc}</p>
                {i !== steps.length - 1 && <div className="sm:hidden w-px h-8 bg-zinc-200 mx-auto mt-6" />}
              </div>
            ))}
          </div>
        </div>

        {/* Visual Growth Loop Diagram */}
        <div className="mt-16 md:mt-20 relative">
          <div className="bg-white border border-zinc-100 rounded-[32px] md:rounded-[40px] p-6 md:p-10 shadow-[0_45px_100px_-20px_rgba(0,0,0,0.06)] overflow-hidden relative">
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <Terminal size={16} className="text-orange-500" />
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] sm:tracking-[0.4em] text-zinc-400">Growth_Loop · Perpetual</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] sm:text-[10px] font-bold text-zinc-900 uppercase tracking-widest">Growth Loop Active</span>
                </div>
              </div>

              {/* Loop nodes */}
              <div className="flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 scrollbar-hide">
                {[
                  { label: "Analyze",  sub: "KPIs + market", color: "bg-orange-500", num: "01" },
                  { label: "Optimize", sub: "Copy + bids",   color: "bg-orange-500", num: "02" },
                  { label: "Test",     sub: "A/B split",     color: "bg-orange-500", num: "03" },
                  { label: "Scale",    sub: "Double down",   color: "bg-orange-500", num: "04" },
                  { label: "Repeat",   sub: "Every 7 days",  color: "bg-zinc-900",   num: "↺"  },
                ].map((node, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col items-center gap-2 shrink-0 min-w-[70px] sm:flex-1">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl ${node.color} flex flex-col items-center justify-center shadow-lg ${node.color === "bg-orange-500" ? "shadow-orange-500/20" : "shadow-zinc-900/20"}`}>
                        <span className="text-white font-black text-[9px] sm:text-[10px] uppercase tracking-widest">{node.num}</span>
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-tight text-zinc-900 text-center">{node.label}</span>
                      <span className="text-[8px] sm:text-[9px] font-light text-zinc-400 text-center leading-tight">{node.sub}</span>
                    </div>
                    {i < 4 && (
                      <div className="flex items-center mt-[-20px] shrink-0">
                        <div className="w-4 md:w-8 h-px bg-zinc-200" />
                        <ArrowRight size={10} className={`shrink-0 ${i === 3 ? "text-orange-500" : "text-zinc-300"}`} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Loop back arrow */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-orange-500/60" />
                <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/5 border border-orange-500/20 rounded-full shrink-0">
                  <RefreshCw size={12} className="text-orange-500" />
                  <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] text-orange-500">Loops back every 7 days</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-orange-500/30 to-orange-500/60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
