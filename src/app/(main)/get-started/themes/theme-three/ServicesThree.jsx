"use client";

import React from "react";
import { Settings, Palette, BarChart3, TrendingUp, PieChart } from "lucide-react";

const services = [
  {
    icon: Settings,
    title: "Amazon Strategy",
    desc: "We analyze, position, and build a winning roadmap tailored to your brand's category and competition.",
  },
  {
    icon: Palette,
    title: "Listing & Creative",
    desc: "High-converting listings, A+ content, brand stores, and visual assets that turn browsers into buyers.",
  },
  {
    icon: BarChart3,
    title: "PPC & Advertising",
    desc: "Data-driven Sponsored Products, Brands & Display campaigns engineered for maximum ROAS.",
  },
  {
    icon: TrendingUp,
    title: "Operations & Scale",
    desc: "Inventory management, logistics optimization, and account health monitoring for sustainable scaling.",
  },
  {
    icon: PieChart,
    title: "Analytics & Growth",
    desc: "Advanced dashboards, competitive intelligence, and strategic insights that power smarter decisions.",
  },
];

export default function ServicesThree() {
  return (
    <section className="py-28" style={{ background: "#050505", fontFamily: "'Montserrat', sans-serif" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-8 h-[1px] bg-orange-500/30" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-orange-500">
              What We Do
            </span>
            <div className="w-8 h-[1px] bg-orange-500/30" />
          </div>
          <h2 className="text-3xl md:text-[44px] font-[900] text-white tracking-tight leading-[1.1]">
            End-to-End Amazon Growth Solutions
          </h2>
        </div>

        {/* 5-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {services.map((s, i) => (
            <div
              key={i}
              className="group p-7 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-orange-500/25 hover:bg-white/[0.04] transition-all duration-500 flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-orange-500 mb-7 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-[0_12px_30px_rgba(249,115,22,0.25)] transition-all duration-500">
                <s.icon size={24} strokeWidth={1.8} />
              </div>

              <h3 className="text-[13px] font-[900] text-white uppercase tracking-tight mb-3">
                {s.title}
              </h3>

              <p className="text-[11px] text-zinc-500 leading-[1.7] font-medium">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
