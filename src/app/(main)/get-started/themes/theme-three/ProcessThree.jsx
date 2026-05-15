"use client";

import React from "react";
import { Search, Target, Rocket, BarChart3, TrendingUp } from "lucide-react";

const steps = [
  { icon: Search, title: "Discover", desc: "Deep-dive into your brand, market & competitor landscape." },
  { icon: Target, title: "Strategize", desc: "Build a data-backed growth plan tailored to your goals." },
  { icon: Rocket, title: "Execute", desc: "Implement across listings, SEO, creative & ad campaigns." },
  { icon: BarChart3, title: "Optimize", desc: "Continuously test, analyze & improve performance metrics." },
  { icon: TrendingUp, title: "Scale", desc: "Accelerate results with compounding growth systems." },
];

export default function ProcessThree() {
  return (
    <section className="py-28" style={{ background: "#050505", fontFamily: "'Montserrat', sans-serif" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-8 h-[1px] bg-orange-500/30" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-orange-500">
              Our Process
            </span>
            <div className="w-8 h-[1px] bg-orange-500/30" />
          </div>
          <h2 className="text-3xl md:text-[44px] font-[900] text-white tracking-tight leading-[1.1]">
            A Proven System for Consistent Growth
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal connector */}
          <div className="absolute top-[46px] left-[10%] right-[10%] h-[1px] bg-white/[0.06] hidden lg:block z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                {/* Icon box */}
                <div className="w-[92px] h-[92px] rounded-[28px] bg-zinc-900 border border-white/[0.06] flex items-center justify-center text-orange-500 mb-7 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 group-hover:shadow-[0_16px_40px_rgba(249,115,22,0.2)] transition-all duration-500 relative">
                  <step.icon size={34} strokeWidth={1.6} />
                </div>

                <h3 className="text-[14px] font-[900] text-white uppercase tracking-tight mb-3 group-hover:text-orange-500 transition-colors">
                  {step.title}
                </h3>
                <p className="text-[11px] text-zinc-500 leading-[1.7] font-medium max-w-[180px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
