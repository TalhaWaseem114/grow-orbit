"use client";

import React from "react";
import { Radar, ShieldCheck, Activity, Scale, ChevronRight, Terminal } from "lucide-react";
import SectionLabel from "./SectionLabel";

export default function HowWeWork() {
  const steps = [
    { 
      num: "01", 
      icon: <Radar size={18} />,       
      title: "Audit & Assess",   
      desc: "Full account audit identifying every vulnerability, policy risk, and operational gap. We map your current exposure." 
    },
    { 
      num: "02", 
      icon: <ShieldCheck size={18} />,  
      title: "Fortify & Shield", 
      desc: "Implement Brand Registry, IP protections, and automated monitoring across all ASINs to prevent hijackers." 
    },
    { 
      num: "03", 
      icon: <Activity size={18} />,     
      title: "Monitor & Defend", 
      desc: "24/7 real-time monitoring with sub-14-minute response time for critical account health threats." 
    },
    { 
      num: "04", 
      icon: <Scale size={18} />,        
      title: "Report & Scale",   
      desc: "Weekly intelligence reports and strategic recommendations to expand and reinforce your marketplace defense." 
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden text-left border-t border-zinc-100">
      {/* Top Gradient Border - Consistent with premium Orbit design */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-24 gap-8">
          <div className="max-w-2xl">
            <SectionLabel>Security Pipeline</SectionLabel>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 leading-[0.9] mb-6 md:mb-8 uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              How we{" "}
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>operate.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm sm:text-base md:text-lg font-light max-w-sm leading-relaxed pb-2">
            A precise, rapid-response protocol designed to neutralize threats before they impact your brand's revenue.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-100 border border-zinc-100 rounded-[28px] md:rounded-[40px] shadow-xl shadow-slate-900/5 relative overflow-hidden">
            {steps.map((item, i) => (
              <div
                key={i}
                style={{ zIndex: steps.length - i }}
                className={`group relative bg-white p-7 md:p-8 hover:bg-zinc-50 transition-all duration-500 h-full flex flex-col ${
                  i === 0 ? 'rounded-t-[28px] md:rounded-t-[40px] lg:rounded-l-[40px] lg:rounded-tr-none' :
                  i === steps.length - 1 ? 'rounded-b-[28px] md:rounded-b-[40px] lg:rounded-r-[40px] lg:rounded-bl-none' : ""
                }`}
              >
                {/* Visual Accent Top */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex justify-between items-center mb-10">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                    {item.icon}
                  </div>
                  <div className="text-[10px] font-mono font-black text-zinc-300 group-hover:text-orange-500 transition-colors tracking-widest leading-none">
                    0{i + 1}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-900 mb-4 group-hover:text-orange-500 transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-[13px] text-zinc-500 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                {i !== steps.length - 1 && (
                  <>
                    <div className="absolute top-1/2 -right-4 w-8 h-px bg-zinc-100 z-40 hidden lg:block group-hover:bg-orange-500/30 transition-colors" />
                    <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-white border border-zinc-100 rounded-full z-50 hidden lg:flex items-center justify-center group-hover:border-orange-500 group-hover:scale-110 transition-all duration-500 shadow-sm">
                      <ChevronRight size={12} className="text-zinc-300 group-hover:text-orange-500" />
                    </div>
                  </>
                )}

                <div className="mt-8 h-px w-8 bg-zinc-100 group-hover:w-full group-hover:bg-orange-500 transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>

        {/* SECTION FOOTER - Exact parity with premium Orbit pages */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between p-6 md:p-8 bg-[#fafafa] rounded-[24px] md:rounded-[32px] border border-zinc-100">
            <div className="flex items-center gap-4 text-zinc-400">
                <Terminal size={16} className="text-orange-500/60" />
                <span className="text-[8px] md:text-[10px] font-mono uppercase tracking-[0.4em]">Protocol_Sequence_01-04</span>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] md:text-[10px] font-black text-zinc-900 uppercase tracking-[0.2em] italic whitespace-nowrap">Defense systems active</span>
            </div>
        </div>
      </div>
    </section>
  );
}
