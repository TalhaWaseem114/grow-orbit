"use client";

import React, { memo } from 'react';
import { Sparkles, Activity, Shield, TrendingUp, Target, Rocket } from 'lucide-react';

const BRANDS = [
  { name: "Brava", src: "/assets/campany logos/brava.jpg" },
  { name: "Coda", src: "/assets/campany logos/coda.avif" },
  { name: "Cognit", src: "/assets/campany logos/cognit.jpg" },
  { name: "Digit", src: "/assets/campany logos/digit.jpg" },
  { name: "Ethos", src: "/assets/campany logos/ethos.jpg" },
  { name: "Flint", src: "/assets/campany logos/flint.jpg" },
  { name: "Flow", src: "/assets/campany logos/flow.avif" },
  { name: "Fluent", src: "/assets/campany logos/fluent.jpg" }
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
          className="flex items-center justify-center mx-12 sm:mx-16 md:mx-20 flex-shrink-0 select-none group/brand"
        >
          <img 
            src={brand.src}
            alt={brand.name}
            loading="lazy"
            decoding="async"
            width="200"
            height="100"
            className="h-16 sm:h-20 md:h-24 w-auto max-w-none object-contain rounded-xl overflow-hidden"
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
