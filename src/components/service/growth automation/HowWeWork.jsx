"use client";

import React from "react";
import { Search, Layers, Terminal, LineChart, ChevronRight } from "lucide-react";
import SectionLabel from "./SectionLabel";

export default function HowWeWork() {
  const steps = [
    {
      num: "01",
      title: "Account Audit",
      desc: "We run a full operational teardown of your Amazon account — inventory health, pricing gaps, reporting stack, and workflow inefficiencies. This is your automation blueprint.",
      icon: <Search size={18} />
    },
    {
      num: "02",
      title: "Stack Architecture",
      desc: "We design and build the custom SaaS integrations, API connections, and automation scripts that form the backbone of your new operating system.",
      icon: <Layers size={18} />
    },
    {
      num: "03",
      title: "Live Deployment",
      desc: "Every automation is deployed in stages, tested against real data, and calibrated for your specific brand — zero disruption to live sales.",
      icon: <Terminal size={18} />
    },
    {
      num: "04",
      title: "Ongoing Optimization",
      desc: "Our systems don't set-and-forget. We monitor, tune, and expand automation coverage each month as your catalogue and volume grows.",
      icon: <LineChart size={18} />
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden text-left">
      {/* Top Gradient Border - Consistent with other service pages */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent" />
      
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-24 gap-8">
          <div className="max-w-2xl">
            <SectionLabel>The Process</SectionLabel>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-zinc-900 leading-[0.9] mb-6 md:mb-8 uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              How we<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>manage systems.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-base md:text-lg font-light max-w-sm leading-relaxed pb-2">
            A transparent, repeatable methodology — not a black box. You always know exactly what we're building and why.
          </p>
        </div>

        {/* PROCESS PIPELINE */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-100 border border-zinc-100 rounded-[32px] md:rounded-[40px] shadow-xl shadow-slate-900/5 relative overflow-hidden">
            {steps.map((item, i) => (
              <div
                key={i}
                style={{ zIndex: steps.length - i }}
                className={`group relative bg-white p-8 hover:bg-zinc-50 transition-all duration-500 h-full flex flex-col ${
                  // Mobile rounding (1 col)
                  i === 0 ? 'rounded-t-[32px] md:rounded-none' : 
                  i === steps.length - 1 ? 'rounded-b-[32px] md:rounded-none' : ''
                } ${
                  // Tablet rounding (2 cols)
                  i === 0 ? 'md:rounded-tl-[40px]' : 
                  i === 1 ? 'md:rounded-tr-[40px] lg:rounded-none' : 
                  i === 2 ? 'md:rounded-bl-[40px] lg:rounded-none' : 
                  i === 3 ? 'md:rounded-br-[40px]' : ''
                } ${
                  // Desktop rounding (4 cols)
                  i === 0 ? 'lg:rounded-l-[40px] lg:rounded-tr-none' : 
                  i === 3 ? 'lg:rounded-r-[40px] lg:rounded-bl-none' : ''
                }`}
              >
                {/* Visual Accent Top */}
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-orange-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Step Marker */}
                <div className="flex justify-between items-center mb-8 md:mb-10">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                    {item.icon}
                  </div>
                  <div className="text-[10px] font-mono font-black text-zinc-300 group-hover:text-orange-500 transition-colors tracking-widest leading-none">
                    0{i + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-[13px] font-black uppercase tracking-[0.2em] text-zinc-900 mb-4 group-hover:text-orange-500 transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-zinc-500 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                {/* Desktop Direction Indicator */}
                {i !== steps.length - 1 && (
                  <>
                    <div className="absolute top-1/2 -right-4 w-8 h-px bg-zinc-100 z-40 hidden lg:block group-hover:bg-orange-500/30 transition-colors" />
                    <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-white border border-zinc-100 rounded-full z-50 hidden lg:flex items-center justify-center group-hover:border-orange-500 group-hover:scale-110 transition-all duration-500 shadow-sm">
                      <ChevronRight size={12} className="text-zinc-300 group-hover:text-orange-500" />
                    </div>
                  </>
                )}

                {/* Bottom Accent */}
                <div className="mt-8 h-px w-8 bg-zinc-100 group-hover:w-full group-hover:bg-orange-500 transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>

        {/* SECTION FOOTER LOGIC - Exact parity with PPC page */}
        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-between p-6 md:p-8 bg-[#fafafa] rounded-[24px] md:rounded-[32px] border border-zinc-100 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 text-zinc-400">
                <Terminal size={16} className="text-orange-500/60" />
                <span className="text-[8px] md:text-[10px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.4em]">Automation_Optimisation_Protocol_01-04</span>
            </div>
            <div className="flex items-center gap-3 mt-5 sm:mt-0">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[9px] md:text-[10px] font-black text-zinc-900 uppercase tracking-[0.2em] italic whitespace-nowrap">Systems active & monitored</span>
            </div>
        </div>

      </div>
    </section>
  );
}
