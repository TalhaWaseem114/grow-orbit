import React from "react";
import { Search, Layers, Terminal, Rocket, ChevronRight } from "lucide-react";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="flex gap-1">
      <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
      <div className="w-4 h-px bg-orange-500 self-center"></div>
    </div>
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-600/80">
      {children}
    </span>
  </div>
);

export default function HowWeWork() {
  const steps = [
    {
      num: "01",
      title: "Discovery & Strategy",
      desc: "We audit your brand, market positioning, customer base, and competitive landscape. This produces a detailed commerce strategy document and UX brief.",
      icon: <Search size={18} />
    },
    {
      num: "02",
      title: "Architecture Design",
      desc: "We design the complete storefront — from information architecture and wireframes to full high-fidelity UI in Figma, with a complete component system.",
      icon: <Layers size={18} />
    },
    {
      num: "03",
      title: "Storefront Build",
      desc: "Custom Shopify Plus development with Liquid templating, third-party integrations, lifecycle automation, and full analytics setup — tested and QA'd.",
      icon: <Terminal size={18} />
    },
    {
      num: "04",
      title: "Launch & Optimize",
      desc: "Staged deployment, DNS migration, speed optimization, and post-launch monitoring. We continue to optimize conversion and performance monthly.",
      icon: <Rocket size={18} />
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-white relative overflow-hidden text-left">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 gap-8">
          <div className="max-w-2xl text-left">
            <SectionLabel>How We Work</SectionLabel>
            <h2 className="text-[42px] sm:text-5xl lg:text-7xl font-black tracking-tighter text-[#111] leading-[0.9] mb-6 sm:mb-8 uppercase">
              From audit to <br />
              <span className="font-playfair text-zinc-300 italic font-light lowercase tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>launch day.</span>
            </h2>
          </div>
          <div className="text-zinc-500 text-base sm:text-lg font-light max-w-sm leading-relaxed pb-2 text-left">
            A clear, sequential process with defined inputs and outputs at every stage of the engagement lifecycle.
          </div>
        </div>

        {/* PROCESS PIPELINE */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-100 border border-zinc-100 rounded-[32px] sm:rounded-[40px] shadow-xl shadow-slate-900/5 relative overflow-hidden">
            {steps.map((item, i) => (
              <div
                key={i}
                style={{ zIndex: steps.length - i }}
                className={`group relative bg-white p-5 sm:p-8 hover:bg-zinc-50 transition-all duration-500 h-full flex flex-col ${
                  i === 0 ? 'sm:rounded-tl-[32px] sm:rounded-tr-none lg:rounded-l-[40px] lg:rounded-tr-none' :
                  i === steps.length - 1 ? 'sm:rounded-br-[32px] sm:rounded-bl-none lg:rounded-r-[40px] lg:rounded-bl-none' : ''
                }`}
              >
                {/* Step Marker */}
                <div className="flex justify-between items-center mb-6 sm:mb-8">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                    {item.icon}
                  </div>
                  <div className="text-[10px] font-mono font-black text-zinc-300 group-hover:text-orange-500 transition-colors">
                    {item.num}
                  </div>
                </div>

                {/* Content */}
                <div className="grow">
                  <h3 className="text-[13px] font-black uppercase tracking-[0.2em] text-zinc-900 mb-3 sm:mb-4 group-hover:text-orange-500 transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <div className="text-xs sm:text-[13px] text-zinc-500 leading-relaxed font-light">
                    {item.desc}
                  </div>
                </div>

                {/* Desktop Direction Indicator */}
                {i !== steps.length - 1 && (
                  <>
                    <div className="absolute top-1/2 -right-4 w-8 h-px bg-zinc-100 z-40 hidden lg:block group-hover:bg-orange-500/30 transition-colors"></div>
                    <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-white border border-zinc-100 rounded-full z-50 hidden lg:flex items-center justify-center group-hover:border-orange-500 group-hover:scale-110 transition-all duration-500 shadow-sm">
                      <ChevronRight size={12} className="text-zinc-300 group-hover:text-orange-500" />
                    </div>
                  </>
                )}

                {/* Bottom Accent */}
                <div className="mt-8 h-px w-8 bg-zinc-100 group-hover:w-full group-hover:bg-orange-500 transition-all duration-700"></div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION FOOTER */}
        <div className="mt-6 sm:mt-12 flex items-center justify-between p-5 sm:p-8 bg-zinc-50 rounded-[20px] sm:rounded-[32px] border border-zinc-100">
          <div className="flex items-center gap-2.5 sm:gap-4 text-zinc-400">
            <Terminal size={14} className="sm:size-4" />
            <span className="text-[7px] sm:text-[10px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.4em]">Workflow_Linear_Sync_01-04</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[7px] sm:text-[10px] font-bold text-zinc-900 uppercase tracking-widest italic whitespace-nowrap">Ready for Deployment</span>
          </div>
        </div>

      </div>
    </section>
  );
}
