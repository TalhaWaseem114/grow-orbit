"use client";

import React, { memo } from 'react';
import { Sparkles, Activity, Shield, TrendingUp, Target, Rocket } from 'lucide-react';

const BRANDS = [
  { name: "Brava", src: "/assets/gemini-logos/brava.avif" },
  { name: "Coda", src: "/assets/gemini-logos/coda.avif" },
  { name: "Cognit", src: "/assets/gemini-logos/cognit.avif" },
  { name: "Digit", src: "/assets/gemini-logos/digit.avif" },
  { name: "Ethos", src: "/assets/gemini-logos/ethos.avif" },
  { name: "Flint", src: "/assets/gemini-logos/flint.avif" },
  { name: "Flow", src: "/assets/gemini-logos/flow.avif" },
  { name: "Fluent", src: "/assets/gemini-logos/fluent.avif" },
  { name: "NovaPeak", src: "/assets/gemini-logos/novapeak.avif" },
  { name: "PureBloom", src: "/assets/gemini-logos/purebloom.avif" }
];

const ClientLogosMarquee = ({ 
  bgClass = "bg-[#0A0A0B]", 
  borderClass = "border-b border-white/5",
  isDark = false
}) => {
  const renderBrandItems = (isClone = false) => (
    <div
      className="flex items-center"
      aria-hidden={isClone ? "true" : "false"}
    >
      {BRANDS.map((brand, index) => (
        <div
          key={`${isClone ? 'clone' : 'orig'}-${brand.name}-${index}`}
          className="flex items-center justify-center mx-6 sm:mx-8 md:mx-10 flex-shrink-0 select-none group/brand"
        >
          <img 
            src={brand.src}
            alt={brand.name}
            loading="lazy"
            decoding="async"
            width="160"
            height="48"
            className="h-8 sm:h-9 md:h-10 w-auto max-w-none object-contain mix-blend-multiply opacity-85 group-hover/brand:opacity-100 group-hover/brand:scale-105 transition-all duration-300"
          />
        </div>
      ))}
    </div>
  );

  // Determine fade gradient color based on dark/light mode
  const gradientColor = isDark ? "#0A0A0B" : "#ffffff";

  return (
    <div className={`relative overflow-hidden ${bgClass} py-3 sm:py-4 flex ${borderClass} pause-marquee-on-hover cursor-pointer group`}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
      `}</style>
      
      {/* Decorative vertical bounds */}
      <div 
        className="absolute top-0 bottom-0 left-0 w-24 z-10 pointer-events-none" 
        style={{ backgroundImage: `linear-gradient(to right, ${gradientColor}, transparent)` }} 
      />
      <div 
        className="absolute top-0 bottom-0 right-0 w-24 z-10 pointer-events-none" 
        style={{ backgroundImage: `linear-gradient(to left, ${gradientColor}, transparent)` }} 
      />

      <div className="flex animate-marquee whitespace-nowrap w-max">
        {renderBrandItems(false)}
        {renderBrandItems(true)}
      </div>
    </div>
  );
};

export default memo(ClientLogosMarquee);
