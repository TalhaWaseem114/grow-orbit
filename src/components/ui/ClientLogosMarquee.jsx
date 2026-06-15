"use client";

import React, { memo } from 'react';
import { Sparkles, Activity, Shield, TrendingUp, Target, Rocket } from 'lucide-react';

const BRANDS = [
  { name: "NovaPeak", niche: "Supplements", icon: <Target size={14} className="text-orange-500" /> },
  { name: "LunaVibe", niche: "Beauty & Care", icon: <Sparkles size={14} className="text-orange-500" /> },
  { name: "ArcticFox", niche: "Outdoors", icon: <Rocket size={14} className="text-orange-500" /> },
  { name: "VoltEdge", niche: "Consumer Tech", icon: <Activity size={14} className="text-orange-500" /> },
  { name: "IronTrail", niche: "Fitness", icon: <Shield size={14} className="text-orange-500" /> },
  { name: "CoralBay", niche: "Home Goods", icon: <TrendingUp size={14} className="text-orange-500" /> }
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
          className="flex items-center gap-4 mx-8 sm:mx-14 flex-shrink-0 select-none group/brand"
        >
          {/* Logo Icon Wrapper */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
            isDark 
              ? "bg-white/[0.02] border border-white/5 group-hover/brand:border-orange-500/30 group-hover/brand:bg-orange-500/[0.03]" 
              : "bg-zinc-50 border border-zinc-100 group-hover/brand:border-orange-500/20 group-hover/brand:bg-orange-50"
          }`}>
            {brand.icon}
          </div>
          {/* Brand details */}
          <div className="flex flex-col text-left">
            <span className={`text-sm font-black tracking-tighter transition-colors duration-300 uppercase font-sans ${
              isDark ? "text-zinc-300 group-hover/brand:text-white" : "text-zinc-700 group-hover/brand:text-zinc-950"
            }`}>
              {brand.name}
            </span>
            <span className={`text-[7.5px] font-mono font-bold tracking-widest transition-colors duration-300 uppercase mt-0.5 ${
              isDark ? "text-zinc-600 group-hover/brand:text-orange-500" : "text-zinc-400 group-hover/brand:text-orange-500"
            }`}>
              {brand.niche}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  // Determine fade gradient color based on dark/light mode
  const gradientColor = isDark ? "#0A0A0B" : "#ffffff";

  return (
    <div className={`relative overflow-hidden ${bgClass} py-3 sm:py-4 flex ${borderClass} pause-marquee-on-hover cursor-pointer group`}>
      <style>{`
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 26s linear infinite;
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

      <div className="flex animate-marquee-reverse whitespace-nowrap w-max">
        {renderBrandItems(false)}
        {renderBrandItems(true)}
      </div>
    </div>
  );
};

export default memo(ClientLogosMarquee);
