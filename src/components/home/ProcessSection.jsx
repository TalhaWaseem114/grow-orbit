"use client";

import React from 'react';
import { Crosshair, Package, Layers, Rocket, ArrowRight, RefreshCw } from 'lucide-react';

const steps = [
  {
    icon: <Crosshair size={22} strokeWidth={1.5} className="text-orange-500" />,
    num: "01",
    title: "Product Hunting",
    desc: "Market research, niche analysis, and demand validation to identify high-potential products before you invest a single dollar.",
  },
  {
    icon: <Package size={22} strokeWidth={1.5} className="text-orange-500" />,
    num: "02",
    title: "Sourcing & Setup",
    desc: "Supplier vetting, brand registry, account setup, and full backend configuration so your entire foundation is built right.",
  },
  {
    icon: <Layers size={22} strokeWidth={1.5} className="text-orange-500" />,
    num: "03",
    title: "Launch & Build",
    desc: "Listing creation, A+ content, main images, PPC campaigns, and brand store, crafted to convert from day one.",
  },
  {
    icon: <Rocket size={22} strokeWidth={1.5} className="text-orange-500" />,
    num: "04",
    title: "Scale & Grow",
    desc: "Ongoing optimization, inventory management, expansion strategies, and weekly reporting to drive profitable, sustainable growth.",
  },
];

const loopSteps = [
  { num: "01", title: "RESEARCH", subtitle: "Market + data" },
  { num: "02", title: "BUILD", subtitle: "Listing + creatives" },
  { num: "03", title: "LAUNCH", subtitle: "Ads + ranking" },
  { num: "04", title: "SCALE", subtitle: "Expand + grow" },
  { isDark: true, title: "EVOLVE", subtitle: "Continuous" },
];

export default function ProcessSection() {
  const montserrat = { fontFamily: "'Montserrat', sans-serif" };
  const playfair = { fontFamily: "'Playfair Display', serif" };

  return (
    <section className="bg-white py-32 px-6 lg:px-10 overflow-hidden" style={montserrat}>
      <div className="max-w-[1400px] mx-auto">

        {/* Top Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-32 gap-10">
          <div>
            <h2 className="text-5xl md:text-[72px] font-montserrat font-black leading-none tracking-tighter text-zinc-950 uppercase">
              FROM IDEA TO <span className="italic font-light text-zinc-300 normal-case" style={playfair}>revenue.</span>
            </h2>
          </div>
          <div className="max-w-sm mb-2">
            <p className="text-gray-400 text-[18px] font-light leading-relaxed">
              We handle everything from finding the right product to building a brand that sells at scale on Amazon.
            </p>
          </div>
        </div>

        {/* CADENCE / HORIZONTAL TIMELINE */}
        <div className="relative mb-40 lg:px-8">
          {/* Horizontal Connection Line */}
          <div className="hidden md:block absolute top-[48px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-orange-200 to-transparent z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10 w-full">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">

                {/* Visual Node */}
                <div className="relative mb-8">
                  {/* Outer dashed ring */}
                  <div className="absolute inset-[-12px] rounded-full border border-dashed border-gray-200 group-hover:border-orange-300 group-hover:rotate-45 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"></div>

                  {/* Main Circle */}
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 relative z-10 group-hover:-translate-y-1 transition-transform duration-500">
                    {step.icon}
                  </div>

                  {/* Number pill */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full border border-gray-100 text-[9px] font-black tracking-widest text-gray-400 shadow-sm z-20 group-hover:text-orange-500 group-hover:border-orange-200 transition-colors duration-300">
                    {step.num}
                  </div>

                  {/* Optional Decoration on Node 3 like reference */}
                  {idx === 2 && (
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mb-1"></div>
                      <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <h3 className="font-montserrat font-black text-[13px] uppercase tracking-[0.2em] text-zinc-950 mb-3 group-hover:text-orange-500 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-400 font-light text-[11px] leading-relaxed max-w-[240px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* GROWTH LOOP PANEL */}
        <div className="bg-[#FAFAFA] rounded-[40px] px-8 py-14 md:p-20 border border-gray-100 relative shadow-2xl shadow-black-[0.02] flex flex-col pt-16">
          {/* Subtle Orange Glow Decoration */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[40px] pointer-events-none">
            <div className="absolute w-[500px] h-[500px] bg-orange-500/5 blur-[100px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* Panel Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-24 relative z-10 gap-6">
            <div className="flex items-center gap-3 text-[10px] font-black tracking-[0.3em] uppercase">
              <span className="text-orange-500 font-mono text-[14px] leading-none mb-0.5">{">_"}</span>
              <span className="text-zinc-400">BRAND_LIFECYCLE</span>
              <span className="text-zinc-300">-</span>
              <span className="text-zinc-500">END_TO_END</span>
            </div>
            <div className="flex items-center gap-2.5 self-start sm:self-auto bg-emerald-50/50 px-4 py-1.5 rounded-full border border-emerald-100/50">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
              <span className="text-[9px] font-black tracking-[0.2em] uppercase text-zinc-900">End-to-End Operations Active</span>
            </div>
          </div>

          {/* Flow Container */}
          <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">

            <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12 lg:gap-4 relative">

              {/* Desktop connecting lines */}
              <div className="hidden lg:block absolute top-[40px] left-[10%] right-[10%] h-[1px] bg-gray-200 z-0"></div>

              {loopSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center relative z-10 group w-full lg:w-auto">

                  {/* Square Node */}
                  <div className={`w-20 h-20 rounded-[20px] flex flex-col items-center justify-center text-center shadow-lg transition-transform duration-700 ease-out group-hover:-translate-y-3 ${
                    step.isDark
                      ? 'bg-zinc-950 text-white shadow-zinc-950/20'
                      : 'bg-orange-500 text-white shadow-orange-500/30'
                  }`}>
                    {step.isDark ? (
                      <RefreshCw size={24} className="text-white group-hover:rotate-180 transition-transform duration-700" />
                    ) : (
                      <span className="font-montserrat font-black text-[15px]">{step.num}</span>
                    )}
                  </div>

                  {/* Decorative orbital accent on hovering node 3 (Test) matching screenshot */}
                  {idx === 2 && (
                    <div className="absolute top-0 right-0 w-8 h-8 rounded-full border border-orange-300 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 pointer-events-none"></div>
                  )}

                  {/* Mobile connecting arrow (only between items) */}
                  {idx !== loopSteps.length - 1 && (
                    <div className="lg:hidden mt-10 mb-[-10px] text-orange-200">
                      <ArrowRight size={24} className="rotate-90" />
                    </div>
                  )}

                  {/* Desktop connecting arrows (on the lines) */}
                  {idx !== loopSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-[32px] -right-[50%] translate-x-1/2 text-orange-300/60 bg-[#FAFAFA] px-2 z-10">
                      <ArrowRight size={14} />
                    </div>
                  )}

                  <div className="mt-8 text-center max-w-[120px]">
                    <h4 className={`font-montserrat font-black text-[13px] uppercase tracking-[0.15em] mb-1.5 ${step.isDark ? 'text-zinc-950' : 'text-zinc-950'}`}>
                      {step.title}
                    </h4>
                    <span className="text-[10px] font-light text-zinc-400 block tracking-wider lowercase">
                      {step.subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Loop Back Connecting Lines and Badge (Desktop) */}
            <div className="hidden lg:block w-[75%] mx-auto mt-6 relative h-[60px]">
              {/* Bottom horizontal line */}
              <div className="absolute top-1/2 left-0 right-0 h-[1px] border-t border-dashed border-orange-200/80"></div>
              {/* Left vertical line */}
              <div className="absolute bottom-1/2 left-0 w-[1px] h-[70px] border-l border-dashed border-orange-200/80"></div>
              {/* Right vertical line */}
              <div className="absolute bottom-1/2 right-0 w-[1px] h-[70px] border-r border-dashed border-orange-200/80"></div>

              {/* Central Floating Badge */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-[#FFF3E0] text-orange-500 border border-orange-200 px-6 py-2 rounded-full font-bold text-[9.5px] uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm transition-transform duration-500 hover:scale-105 cursor-default">
                <RefreshCw size={13} strokeWidth={2.5} />
                Continuous Brand Evolution
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
