"use client";

import React, { memo } from 'react';
import { Sparkles, Activity, Shield, TrendingUp, Target, Rocket } from 'lucide-react';

const BRANDS = [
  { name: "Brava", src: "/assets/brand-logos/brava.svg" },
  { name: "Coda", src: "/assets/brand-logos/coda.svg" },
  { name: "Cognit", src: "/assets/brand-logos/cognit.svg" },
  { name: "Digit", src: "/assets/brand-logos/digit.svg" },
  { name: "Ethos", src: "/assets/brand-logos/ethos.svg" },
  { name: "Flint", src: "/assets/brand-logos/flint.svg" },
  { name: "Flow", src: "/assets/brand-logos/flow.svg" },
  { name: "Fluent", src: "/assets/brand-logos/fluent.svg" },
  { name: "NovaPeak", src: "/assets/brand-logos/novapeak.svg" },
  { name: "PureBloom", src: "/assets/brand-logos/purebloom.svg" }
];

const ClientLogosMarquee = ({ 
  bgClass = "bg-[#0A0A0B]", 
  borderClass = "border-b border-white/5",
  isDark = true
}) => {
  const renderBrandItems = (isClone = false) => (
    <div
      className="flex items-center"
      aria-hidden={isClone ? "true" : "false"}
    >
      {BRANDS.map((brand, index) => (
        <div
          key={`${isClone ? 'clone' : 'orig'}-${brand.name}-${index}`}
          className="flex items-center justify-center mx-8 sm:mx-12 md:mx-14 flex-shrink-0 select-none group/brand"
        >
          <img 
            src={brand.src}
            alt={brand.name}
            loading="lazy"
            decoding="async"
            width="170"
            height="44"
            className={`h-7 sm:h-8 md:h-9 w-auto max-w-none object-contain transition-all duration-300 ${
              isDark 
                ? "brightness-0 invert opacity-60 group-hover/brand:opacity-100" 
                : "opacity-80 group-hover/brand:opacity-100 group-hover/brand:scale-105"
            }`}
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
