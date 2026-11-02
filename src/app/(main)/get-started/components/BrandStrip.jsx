"use client";

import React from "react";
import {
  HeartPulse,
  Home,
  PawPrint,
  Sparkles,
  Zap,
  Mountain,
  Shirt,
} from "lucide-react";

const CATEGORIES = [
  { name: "Supplements & Health", icon: HeartPulse },
  { name: "Home & Kitchen", icon: Home },
  { name: "Pet Supplies", icon: PawPrint },
  { name: "Beauty & Skincare", icon: Sparkles },
  { name: "Consumer Tech", icon: Zap },
  { name: "Sports & Outdoors", icon: Mountain },
  { name: "Apparel & Fashion", icon: Shirt },
];

export default function BrandStrip() {
  return (
    <section className="bg-gradient-to-r from-orange-600 via-[#ff6a00] to-orange-500 py-10 sm:py-14 relative overflow-hidden border-t border-white/20 border-b border-orange-700/40 shadow-inner">
      {/* Background Geometric Dot Matrix */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1.2px, transparent 1.2px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Subtle Ambient Radial Light Highlights */}
      <div className="absolute -top-24 left-1/4 w-96 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Eyebrow Header */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="w-8 sm:w-12 h-px bg-white/30 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <p className="text-center text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-[0.35em] text-white drop-shadow-sm">
              Trusted Across 7 Core Amazon Categories
            </p>
          </div>
          <div className="w-8 sm:w-12 h-px bg-white/30 hidden sm:block" />
        </div>

        {/* Retouched Interactive Category Pills */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto no-scrollbar pb-2 sm:pb-0 snap-x snap-mandatory lg:flex-wrap lg:justify-center">
          {CATEGORIES.map((cat, i) => (
            <div
              key={i}
              className="group relative flex items-center justify-center gap-2 px-4.5 sm:px-5 py-2.5 sm:py-3 rounded-full border border-white/35 bg-white/15 backdrop-blur-md hover:bg-white hover:border-white transition-all duration-300 cursor-default overflow-hidden shrink-0 snap-center lg:snap-align-none shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.18)] hover:scale-[1.03] active:scale-98"
            >
              {/* Shimmer sweep effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

              {/* Category Icon */}
              <cat.icon
                size={14}
                className="relative z-10 text-white/95 group-hover:text-orange-600 transition-colors duration-300 shrink-0 group-hover:scale-110"
              />

              {/* Category Name */}
              <span className="relative z-10 text-[10px] sm:text-xs font-black leading-none uppercase tracking-[0.16em] whitespace-nowrap text-white group-hover:text-orange-600 transition-colors duration-300 drop-shadow-xs">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
