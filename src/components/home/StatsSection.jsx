"use client";

import React from "react";
import Link from "next/link";
import { Activity, Zap, BarChart3, TrendingUp, ArrowRight } from "lucide-react";

export default function StatsSection() {
  const stats = [
    { v: "1,200+", l: "Listings Optimized", i: <Activity size={14} /> },
    { v: "80+",    l: "Brands Scaled",      i: <Zap size={14} /> },
    { v: "$500K+", l: "Monthly Ad Spend",   i: <BarChart3 size={14} /> },
    { v: "$12M+",  l: "Revenue Managed",    i: <TrendingUp size={14} /> },
  ];

  return (
    <section className="bg-zinc-950 py-16 border-y border-white/5 relative overflow-hidden">
      {/* Signature Orbit Dot Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", 
          backgroundSize: "24px 24px" 
        }} 
      />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 sm:gap-y-12 gap-x-4 sm:gap-x-8 lg:gap-x-4">
          
          {stats.map((s, i) => (
            <div 
              key={i} 
              className="group relative flex flex-col border-l border-zinc-800/50 pl-4 sm:pl-8 transition-all duration-500 hover:border-orange-500/40"
            >
              {/* Active Indicator Dot */}
              <div className="absolute top-0 left-[-1.5px] w-[3px] h-[3px] bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Icon */}
              <div className="text-orange-500/70 mb-3 sm:mb-4 group-hover:text-orange-400 group-hover:scale-110 transition-all duration-500">
                {s.i}
              </div>
              
              {/* Value */}
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter font-montserrat leading-none">
                {s.v}
              </span>
              
              {/* Label */}
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em] mt-2 block">
                [ {s.l} ]
              </span>
            </div>
          ))}

          {/* CTA Item Card */}
          <Link 
            href="/portfolio" 
            className="group relative flex flex-col border-l border-orange-500/20 pl-4 sm:pl-8 transition-all duration-500 hover:bg-orange-500/[0.02] no-underline"
          >
            <div className="text-orange-500 mb-3 sm:mb-4 group-hover:translate-x-2 transition-transform duration-500">
              <ArrowRight size={16} />
            </div>
            
            <span className="text-base sm:text-lg md:text-xl font-black text-white uppercase tracking-tighter leading-tight group-hover:text-orange-400 transition-colors font-montserrat">
              View Our<br />Portfolio
            </span>
            
            <div className="flex items-center gap-2 mt-3">
              <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
                LIVE_CASE_STUDIES
              </span>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
