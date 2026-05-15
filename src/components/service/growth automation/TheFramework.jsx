"use client";

import React from "react";
import { RefreshCw, Terminal, Layout, Database } from "lucide-react";
import SectionLabel from "./SectionLabel";

export default function TheFramework() {
  const workflows = [
    {
      icon: <RefreshCw size={22} />,
      title: "Inventory Forecasting",
      desc: "Algorithmic stock management with Predictive Ad Throttling and OOS Rank Protection — forecasting lead times and sales velocity to prevent overstock and stockout compounding before they happen.",
      step: "01",
      metric: "98.2% accuracy",
      hud: "LOGIC_STATE: ACTIVE",
      tag: "INDEX_SYNC: 01"
    },
    {
      icon: <Terminal size={22} />,
      title: "Automated Reporting",
      desc: "Custom dashboards aggregating Dynamic COGS Tracking and Contribution Margin Modeling — P&L, ACOS, velocity, and margin unified into one always-live source of truth.",
      step: "02",
      metric: "Zero manual pulls",
      hud: "OPTIMIZATION_PATH: 02",
      tag: "INDEX_SYNC: 02"
    },
    {
      icon: <Layout size={22} />,
      title: "Dynamic Pricing",
      desc: "Real-time pricing adjustments driving Autonomous Rank Defense through keyword saturation logic — protecting Buy Box and maximizing contribution margin around the clock.",
      step: "03",
      metric: "+6.2% buy box",
      hud: "OPTIMIZATION_PATH: 03",
      tag: "INDEX_SYNC: 03"
    },
    {
      icon: <Database size={22} />,
      title: "Catalog Sync",
      desc: "Centralized product data pipelines ensuring structural integrity across all listings, variants, and marketplaces — zero human oversight required once the system is live.",
      step: "04",
      metric: "Multi-market ready",
      hud: "LOGIC_STATE: NOMINAL",
      tag: "INDEX_SYNC: 04"
    },
  ];

  return (
    <section className="py-32 bg-zinc-950 text-white relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-600/8 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-orange-600/4 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <SectionLabel light>The Sequence</SectionLabel>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Built for <span className="text-orange-500">Autonomous</span><br />
              <span className="italic font-light text-zinc-500 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                 operational scale.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 font-light max-w-sm text-sm leading-relaxed">
            We don't believe in manual work. We build proprietary protocols that run, adjust, and optimize while you focus on the brand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-[40px] overflow-hidden border border-white/5 shadow-2xl">
          {workflows.map((w, i) => (
            <div
              key={i}
              className="group p-10 bg-zinc-900 hover:bg-orange-500 transition-all duration-700 relative overflow-hidden h-full flex flex-col"
            >
              {/* Dense dot grid — visible on hover only */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                  backgroundSize: "6px 6px",
                }}
              />

              {/* Step watermark */}
              <span className="absolute top-6 right-6 text-white/5 font-black text-5xl group-hover:text-white/15 transition-colors select-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {w.step}
              </span>

              <div className="relative z-10 flex flex-col h-full flex-1">
                {/* INDEX_SYNC tag */}
                <span className="inline-block self-start font-mono text-[8px] font-bold tracking-widest text-zinc-700 group-hover:text-white/70 border border-zinc-800 group-hover:border-white/30 px-2 py-0.5 rounded-full mb-6 transition-all duration-500">
                  {w.tag}
                </span>

                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:bg-white mb-6 transition-colors shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                <div className="text-orange-500 group-hover:text-white transition-colors mb-6">{w.icon}</div>
                
                <h3 className="text-xl font-bold mb-4 tracking-tight uppercase text-white leading-none">
                  {w.title}
                </h3>
                
                <p className="text-zinc-500 group-hover:text-white/80 text-sm font-light leading-relaxed mb-8 flex-1">
                  {w.desc}
                </p>
                
                <div className="mt-auto">
                   <div className="h-px w-8 bg-orange-500 group-hover:bg-white/40 mb-4 transition-all duration-500" />
                   <span className="text-[10px] font-bold tracking-widest uppercase text-orange-500 group-hover:text-white/90 transition-colors font-mono">
                     {w.metric}
                   </span>
                </div>

                {/* HUD label bottom-right */}
                <span className="absolute bottom-4 right-5 font-mono text-[7px] text-zinc-800 group-hover:text-white/20 tracking-widest transition-colors select-none">
                  {w.hud}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
