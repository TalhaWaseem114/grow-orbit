"use client";

import React from 'react';

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
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-orange-500/30" />
            <span className="font-bold text-[10px] font-mono uppercase tracking-[0.5em] text-orange-500">
              Portfolio Alpha
            </span>
            <div className="w-12 h-[1px] bg-orange-500/30" />
          </div>
          <h2
            className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 uppercase leading-[0.9]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            80+ Brands <span className="text-orange-500">Scaled</span><br />
            <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>to new orbits of revenue.</span>
          </h2>
        </div>

        {/* Infinite Marquee */}
        <div className="relative">
          {/* Masking Gradients for smooth fade */}


          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 15s linear infinite;
            }
            @media (min-width: 768px) {
              .animate-marquee {
                animation-duration: 35s;
              }
            }
            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="flex whitespace-nowrap animate-marquee">
            {/* Double the array for seamless looping */}
            {[...brands, ...brands].map((brand, i) => (
              <div
                key={i}
                className="flex items-center gap-6 mx-16 group cursor-default"
              >
                {/* Brand Icon - Premium Glass style */}
                <div className="w-16 h-16 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-300 font-black text-xl group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 group-hover:shadow-[0_20px_40px_rgba(249,115,22,0.2)] transition-all duration-500 rotate-3 group-hover:rotate-0">
                  {brand.name.charAt(0)}
                </div>

                {/* Brand Name */}
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-zinc-200 group-hover:text-zinc-900 transition-colors duration-500 tracking-tighter uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {brand.name}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-300 group-hover:text-orange-500 transition-colors duration-500 font-bold">
                    {brand.tagline}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}