"use client";

import React from "react";
import ClientLogosMarquee from "@/components/ui/ClientLogosMarquee";

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
        <ClientLogosMarquee isDark={true} bgClass="bg-[#050505]" borderClass="border-y border-white/[0.04]" />
      </div>
    </section>
  );
}
