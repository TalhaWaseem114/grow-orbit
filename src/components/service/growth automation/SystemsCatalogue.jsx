"use client";

import React from "react";
import { Target, Box, Search, ShieldCheck, Activity, Bell } from "lucide-react";
import SectionLabel from "./SectionLabel";

const systems = [
  {
    icon: <Target size={22} />,
    type: "BID_ENGINE",
    title: "PPC Bid Automation",
    desc: "Rule-based bid adjustments that respond to ACOS thresholds, conversion data, and daypart performance around the clock."
  },
  {
    icon: <Box size={22} />,
    type: "SUPPLY_CHAIN",
    title: "Inventory Forecasting",
    desc: "Demand models built on SKU-level sales velocity, seasonality, and supplier lead times — eliminating stockout and overstock risk."
  },
  {
    icon: <Search size={22} />,
    type: "RANK_MONITOR",
    title: "Keyword Rank Monitoring",
    desc: "Automated daily tracking of keyword position movement with structured reporting on ranking gains, losses, and opportunities."
  },
  {
    icon: <ShieldCheck size={22} />,
    type: "RECON_LAYER",
    title: "Competitor Surveillance",
    desc: "Real-time tracking of competitor pricing shifts, BSR movements, and promotional activity across your product categories."
  },
  {
    icon: <Activity size={22} />,
    type: "REPORTING",
    title: "Performance Dashboards",
    desc: "Centralised data pipelines consolidating advertising, inventory, and margin data into a single operational source of truth."
  },
  {
    icon: <Bell size={22} />,
    type: "ALERT_BASED",
    title: "Operational Alerts",
    desc: "Automated triggers for low inventory, ACOS spikes, ranking drops, or Buy Box losses — before they become critical."
  },
];

export default function SystemsCatalogue() {
  return (
    <section className="py-20 md:py-32 bg-[#fafafa] relative overflow-hidden border-t border-zinc-100">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-24 gap-8">
          <div className="max-w-2xl">
            <SectionLabel>System Catalogue</SectionLabel>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-zinc-900 leading-[0.9] mb-6 md:mb-8 uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Systems we<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>build for you.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-base md:text-lg font-light max-w-sm leading-relaxed pb-2">
            Purpose-built for the Amazon ecosystem — proprietary protocols engineered for operational efficiency and autonomous scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((s, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-[32px] md:rounded-[40px] p-6 sm:p-8 lg:p-10 border border-zinc-100 hover:border-orange-500/20 hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 overflow-hidden h-full flex flex-col"
            >
              {/* Corner dot-grid texture on hover */}
              <div
                className="absolute inset-0 rounded-[40px] opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                  backgroundSize: "6px 6px",
                }}
              />

              <div className="flex items-start justify-between mb-10 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                  {s.icon}
                </div>
                <span className="font-mono text-[9px] font-bold tracking-[0.3em] text-zinc-400 uppercase">
                  [ SYS_TYPE: {s.type} ]
                </span>
              </div>

              <h3 className="font-black text-xl uppercase tracking-tighter text-zinc-900 mb-4 leading-none relative z-10 group-hover:text-orange-500 transition-colors">
                {s.title}
              </h3>

              <p className="text-zinc-500 text-sm font-light leading-relaxed relative z-10 flex-1">
                {s.desc}
              </p>

              <div className="mt-8 h-px w-8 bg-zinc-200 group-hover:w-full group-hover:bg-orange-500/20 transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
