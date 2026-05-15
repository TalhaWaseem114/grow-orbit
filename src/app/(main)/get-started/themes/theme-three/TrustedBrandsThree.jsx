"use client";

import React from "react";

const brands = [
  { name: "MYPRO", category: "Workout" },
  { name: "Pampas", category: "Beauty" },
  { name: "nutri·pure", category: "Wellness" },
  { name: "aegte", category: "Lifestyle" },
  { name: "VELVORA", category: "Home" },
  { name: "COZY", category: "Comfort" },
];

export default function TrustedBrandsThree() {
  return (
    <section
      className="py-14 border-t border-white/[0.04]"
      style={{ background: "#050505", fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Label */}
        <div className="text-center mb-10">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.5em] text-zinc-600">
            Trusted by Growing Brands
          </span>
        </div>

        {/* Brand names with sub-labels */}
        <div className="flex flex-wrap justify-center items-start gap-10 md:gap-14 lg:gap-20">
          {brands.map((b, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 group cursor-default">
              <span
                className="text-xl md:text-2xl lg:text-[28px] font-extrabold tracking-tight text-white/20 group-hover:text-white/50 transition-all duration-500 uppercase"
              >
                {b.name}
              </span>
              <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-[0.25em] group-hover:text-zinc-500 transition-colors">
                {b.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
