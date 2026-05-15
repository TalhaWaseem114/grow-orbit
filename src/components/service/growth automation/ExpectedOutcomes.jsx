"use client";

import React from "react";
import { Zap, Clock, Box, BarChart3, TrendingUp, CheckCircle2 } from "lucide-react";
import SectionLabel from "./SectionLabel";

export default function ExpectedOutcomes() {
  const outcomes = [
    {
      icon: <Zap size={24} />,
      metric: "~80%",
      label: "report prep time",
      title: "Faster Decisions",
      desc: "Automated data collection and structured reporting reduces the time from data to decision — replacing hours of manual analysis with immediate visibility.",
      featured: false
    },
    {
      icon: <Clock size={24} />,
      metric: "36h",
      label: "monthly recovery",
      title: "Client Case Study",
      desc: "Client saved 9 hours/week after automation setup. That's 36 hours/month back in their business to focus on product development.",
      featured: true
    },
    {
      icon: <Box size={24} />,
      metric: "~95%",
      label: "forecast accuracy",
      title: "Planned Inventory",
      desc: "Forecasting models built on actual sales data eliminate the guesswork from reorder decisions, reducing both stockouts and excess capital.",
      featured: false
    },
    {
      icon: <TrendingUp size={24} />,
      metric: "24/7",
      label: "bid monitoring",
      title: "Continuous Optimisation",
      desc: "Always-on bid management replaces periodic manual adjustments — campaigns optimize around the clock against live performance data.",
      featured: false,
      wide: true
    },
    {
      icon: <BarChart3 size={24} />,
      metric: "1 View",
      label: "unified dashboard",
      title: "Centralized Visibility",
      desc: "A unified reporting layer across advertising, inventory, pricing, and revenue eliminates tool-switching and creates a single source of truth.",
      featured: false,
      wide: true
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-[#fafafa] relative overflow-hidden border-t border-zinc-100">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-24 gap-8">
          <div>
            <SectionLabel>Expected Outcomes</SectionLabel>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.88] text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Metrics that<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>power scale.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-base md:text-lg font-light max-w-sm leading-relaxed pb-2">
            The primary outcome of automation is operational leverage — your team makes better decisions, faster, with zero manual overhead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {outcomes.map((o, i) => {
            const isLastTwo = i >= outcomes.length - 2;
            return (
              <div
                key={i}
                className={`group relative rounded-[32px] md:rounded-[40px] p-6 sm:p-8 lg:p-10 overflow-hidden border transition-all duration-500 flex flex-col ${
                  o.wide ? "lg:col-span-3 md:col-span-2" : "lg:col-span-2 md:col-span-1"
                } ${
                  o.featured
                    ? "bg-zinc-950 border-zinc-800 text-white hover:shadow-2xl hover:shadow-orange-500/10"
                    : `bg-white ${isLastTwo ? 'border-orange-500/20 shadow-xl shadow-zinc-200/50' : 'border-zinc-100'} hover:border-orange-500/20 hover:shadow-xl hover:shadow-zinc-200/50`
                }`}
              >
                {/* Background HUD effect on hover */}
                <div
                  className={`absolute inset-0 ${isLastTwo ? 'opacity-[0.06]' : 'opacity-0'} group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none ${o.featured ? 'bg-orange-500/20' : ''}`}
                  style={{
                    backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
                    backgroundSize: "8px 8px",
                  }}
                />

                <div className="flex items-start justify-between mb-6 md:mb-8 relative z-10">
                  <div className="text-orange-500">
                    {o.icon}
                  </div>
                  <div className="text-right">
                    <p className={`text-3xl md:text-4xl font-black tracking-tighter leading-none mb-1 ${o.featured ? "text-white" : "text-zinc-900"} group-hover:text-orange-500 transition-colors`}>
                      {o.metric}
                    </p>
                    <p className="font-mono text-[8px] font-bold tracking-[0.25em] text-zinc-400 uppercase">
                      [ {o.label} ]
                    </p>
                  </div>
                </div>

                <div className={`relative z-10 mt-auto pt-6 md:pt-8 border-t transition-colors ${o.featured ? "border-white/10" : `${(isLastTwo) ? 'border-orange-500/10' : 'border-zinc-100 group-hover:border-orange-500/10'}`}`}>
                  <h3 className={`font-black text-lg tracking-tight uppercase mb-3 ${o.featured ? "text-white group-hover:text-orange-400" : "text-zinc-900 group-hover:text-orange-500"} transition-colors leading-none`}>
                    {o.title}
                  </h3>
                  <p className={`text-sm font-light leading-relaxed ${o.featured ? "text-zinc-400 group-hover:text-zinc-300" : "text-zinc-500"} transition-colors`}>
                    {o.desc}
                  </p>
                </div>

                <div className={`absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-orange-500/0 ${isLastTwo ? 'via-orange-500/20' : 'via-orange-500/0'} to-orange-500/0 group-hover:via-orange-500/20 transition-all duration-700`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
