"use client";

import React from "react";

const results = [
  {
    brand: "MYPRO WORKOUT",
    category: "Workout Supplements",
    color: "#ef4444",
    stats: [
      { val: "+285%", label: "Revenue Growth" },
      { val: "5.8x", label: "ROAS" },
    ],
  },
  {
    brand: "PAMPAS BEAUTY",
    category: "Skincare & Beauty",
    color: "#f97316",
    stats: [
      { val: "+197%", label: "Revenue Growth" },
      { val: "5.2x", label: "ROAS" },
    ],
  },
  {
    brand: "NUTRI+PURE",
    category: "Wellness & Health",
    color: "#22c55e",
    stats: [
      { val: "+156%", label: "Revenue Growth" },
      { val: "4.7x", label: "ROAS" },
    ],
  },
  {
    brand: "COZY COMFORT",
    category: "Home & Kitchen",
    color: "#3b82f6",
    stats: [
      { val: "+132%", label: "Revenue Growth" },
      { val: "4.1x", label: "ROAS" },
    ],
  },
];

export default function ResultsSectionThree() {
  return (
    <section className="py-28" style={{ background: "#050505", fontFamily: "'Montserrat', sans-serif" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-8 h-[1px] bg-orange-500/30" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-orange-500">
              Proven Results
            </span>
            <div className="w-8 h-[1px] bg-orange-500/30" />
          </div>
          <h2 className="text-3xl md:text-[44px] font-[900] text-white tracking-tight leading-[1.1]">
            Real Brands. Real Growth.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {results.map((r, i) => (
            <div
              key={i}
              className="group rounded-3xl bg-white/[0.02] border border-white/[0.05] overflow-hidden hover:border-orange-500/20 transition-all duration-500"
            >
              {/* Image placeholder */}
              <div className="h-44 relative overflow-hidden bg-zinc-900">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
                {/* Colored accent bar */}
                <div
                  className="absolute top-4 left-4 px-2.5 py-1 rounded-md text-[7px] font-black uppercase tracking-widest text-white z-20"
                  style={{ backgroundColor: r.color }}
                >
                  {r.category.split(" ")[0]}
                </div>
                {/* Faint brand watermark */}
                <div className="absolute inset-0 flex items-center justify-center text-white/[0.04] text-5xl font-black italic select-none">
                  {r.brand.split(" ")[0]}
                </div>
              </div>

              {/* Info */}
              <div className="p-7">
                <h3 className="text-[12px] font-[900] text-white uppercase tracking-tight mb-1">
                  {r.brand}
                </h3>
                <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-7">
                  {r.category}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {r.stats.map((s, idx) => (
                    <div key={idx}>
                      <div className="text-xl font-[900] text-white mb-0.5">{s.val}</div>
                      <div className="text-[8px] font-extrabold text-zinc-600 uppercase tracking-widest">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-14 text-center">
          <button className="px-8 py-3.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] font-black text-white uppercase tracking-[0.2em] hover:bg-white/[0.06] transition-all active:scale-95">
            View More Case Studies →
          </button>
        </div>
      </div>
    </section>
  );
}
