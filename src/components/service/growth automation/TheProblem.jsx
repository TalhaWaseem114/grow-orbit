import React from "react";
import { Package, DollarSign, Database, ShieldAlert } from "lucide-react";
import SectionLabel from "./SectionLabel";

export default function TheProblem() {
  const problems = [
    {
      num: "01",
      riskType: "INVENTORY",
      title: "Inventory Blindspots",
      desc: "Manual stock tracking leads to stockouts that kill rank and overstock that kills cash flow. Both are preventable. Most brands are still doing it by hand.",
      icon: <Package size={20} />,
    },
    {
      num: "02",
      riskType: "PRICING",
      title: "Pricing Left on the Table",
      desc: "Static pricing means you're constantly losing the Buy Box to competitors who update in real-time. Every hour of delay is margin you don't recover.",
      icon: <DollarSign size={20} />,
    },
    {
      num: "03",
      riskType: "DATA_SILOS",
      title: "Data Fragmentation",
      desc: "Your P&L, ad data, and sales velocity live in five different tools. No single source of truth means every decision is a guess.",
      icon: <Database size={20} />,
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-linear-to-b from-orange-50/60 via-orange-50/30 to-white relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Sticky Heading */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <SectionLabel>The Diagnostic</SectionLabel>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.88] mb-6 md:mb-8 text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Where growth<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                gets stuck without automation.
              </span>
            </h2>
            <p className="text-zinc-500 text-base md:text-lg font-light leading-relaxed max-w-md mb-8 md:mb-10">
              Most 7-figure Amazon brands hit a ceiling not because of traffic or conversion — but because their operations can't keep up. The bottleneck is internal.
            </p>
            <div className="inline-flex items-center gap-3 bg-orange-500 text-white px-6 py-3 rounded-full border border-orange-400 shadow-xl">
              <ShieldAlert size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.25em]">Systems Upgrade Required</span>
            </div>
          </div>

          {/* Right Column: Problem Cards */}
          <div className="lg:col-span-7 space-y-4 md:space-y-5 mt-12 lg:mt-0">
            {problems.map((p, i) => (
              <div 
                key={i} 
                className="group bg-white rounded-[24px] md:rounded-[32px] p-8 md:p-8 lg:p-10 border border-zinc-100 hover:border-orange-500/20 shadow-[0_10px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden"
              >
                {/* Top row: meta info */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[8px] font-bold tracking-[0.3em] text-zinc-300 uppercase">
                    ERROR_TYPE: {p.riskType}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-orange-500 tracking-widest">{p.num}</span>
                </div>
                
                {/* Icon + Title Row */}
                <div className="flex flex-col sm:flex-row items-start gap-5 mb-4 sm:mb-3">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                    {p.icon}
                  </div>
                  <div className="pt-1 md:pt-1.5">
                    <h3 className="font-black text-[16px] md:text-[17px] uppercase tracking-tight text-zinc-900 group-hover:text-orange-500 transition-colors leading-tight">
                      {p.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-500 text-[13px] font-light leading-relaxed pl-0 sm:pl-14 md:pl-16">
                  {p.desc}
                </p>
                
                {/* Bottom hover accent */}
                <div className="absolute bottom-0 left-10 right-10 h-px bg-orange-500/0 group-hover:bg-orange-500/20 transition-all duration-500" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
