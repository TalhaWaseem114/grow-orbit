"use client";

import React from 'react';
import ClientLogosMarquee from "@/components/ui/ClientLogosMarquee";

const SectionLabel = ({ children }) => (
  <div className="flex items-center justify-center gap-3 mb-6">
    <div className="w-8 h-[1px] bg-zinc-300" />
    <span className="font-bold text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-400">
      {children}
    </span>
    <div className="w-8 h-[1px] bg-zinc-300" />
  </div>
);

export default function TrustedBrands() {
  const brands = [
    { name: "NovaPeak", tagline: "Supplements" },
    { name: "LunaVibe", tagline: "Beauty" },
    { name: "ArcticFox", tagline: "Outdoors" },
    { name: "PureBloom", tagline: "Skincare" },
    { name: "VoltEdge", tagline: "Consumer Tech" },
    { name: "IronTrail", tagline: "Fitness" },
    { name: "CoralBay", tagline: "Home & Kitchen" },
    { name: "ZenLeaf", tagline: "Wellness" },
    { name: "StridePro", tagline: "Apparel" },
    { name: "BrightPaws", tagline: "Pet Care" },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950 text-orange-400 font-mono text-[10px] font-bold uppercase tracking-[0.25em] mb-6 shadow-sm border border-zinc-800">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Portfolio Alpha
          </div>
          <h2
            className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 uppercase leading-[0.9]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            80+ Brands <span className="text-orange-600">Scaled</span><br />
            <span className="italic font-normal text-zinc-600 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>to new orbits of revenue.</span>
          </h2>
        </div>

        {/* Infinite Marquee */}
        <ClientLogosMarquee isDark={false} bgClass="bg-white" borderClass="" />
      </div>
    </section>
  );
}