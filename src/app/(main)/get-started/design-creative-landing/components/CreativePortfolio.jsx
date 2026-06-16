"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Eye, Box, FileImage, Layers, LayoutGrid, Award } from "lucide-react";
import { PORTFOLIO_ITEMS } from "@/data/portfolioData";

export default function CreativePortfolio() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Listing Images", "A+ Content", "3D Renders"];

  // Filter items based on active tab using real database fields
  const getFilteredItems = () => {
    const allDesignItems = PORTFOLIO_ITEMS.filter(item => 
      item.category === "Listing Images" || 
      item.services?.some(s => ["Listing Images", "A+ Content", "Brand Story"].includes(s))
    );

    if (activeTab === "All") {
      return allDesignItems.slice(0, 8); // Display top 8 real items
    }
    if (activeTab === "Listing Images") {
      return allDesignItems.filter(item => 
        item.category === "Listing Images" || item.services?.includes("Listing Images")
      ).slice(0, 8);
    }
    if (activeTab === "A+ Content") {
      return allDesignItems.filter(item => 
        item.services?.includes("A+ Content")
      ).slice(0, 8);
    }
    if (activeTab === "3D Renders") {
      return allDesignItems.filter(item => 
        item.tags?.some(tag => tag.toLowerCase().includes("3d"))
      ).slice(0, 8);
    }
    return allDesignItems.slice(0, 8);
  };

  const filteredItems = getFilteredItems();

  const getGlowColor = (idx) => {
    const glows = [
      "from-orange-500/20 to-transparent",
      "from-blue-500/20 to-transparent",
      "from-violet-500/20 to-transparent",
      "from-emerald-500/20 to-transparent",
      "from-yellow-500/20 to-transparent",
      "from-purple-500/20 to-transparent",
      "from-red-500/20 to-transparent",
      "from-indigo-500/20 to-transparent",
    ];
    return glows[idx % glows.length];
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          OUR PRODUCT GRAPHICS WORK
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <p className="text-zinc-500 text-xs sm:text-sm font-light">
            Creative, Strategic, Result-Driven.
          </p>
          <span className="text-zinc-600 font-mono text-xs">|</span>
          <Link
            href="/portfolio"
            className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-500 hover:text-white transition-colors no-underline"
          >
            VIEW ALL PORTFOLIO →
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
              activeTab === tab
                ? "bg-orange-500 text-white shadow-[0_4px_15px_rgba(249,115,22,0.3)]"
                : "bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item, idx) => (
          <Link
            href={`/portfolio/${item.id}`}
            key={item.id}
            className="group relative bg-zinc-900/40 border border-zinc-900 hover:border-orange-500/30 rounded-2xl overflow-hidden transition-all duration-500 flex flex-col justify-between no-underline"
          >
            {/* Visual View */}
            <div className="relative w-full aspect-square overflow-hidden bg-zinc-950">
              {/* Glow Accent */}
              <div className={`absolute -inset-1 bg-gradient-to-t ${getGlowColor(idx)} opacity-50 blur-lg group-hover:scale-105 transition-transform duration-700`} />

              {/* Tag / Badge Overlay */}
              <div className="absolute top-3 left-3 z-20 bg-zinc-950/80 backdrop-blur border border-white/5 px-2.5 py-1 rounded-lg">
                <span className="text-[8px] font-mono font-black text-orange-500 tracking-wider uppercase">
                  {item.niche}
                </span>
              </div>

              {item.badge && (
                <div className="absolute top-3 right-3 z-20 bg-orange-500 text-white px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider">
                  {item.badge.value} LIFT
                </div>
              )}

              {/* Portfolio Image */}
              <Image
                src={item.src}
                alt={item.brandName}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-all duration-700 opacity-80 group-hover:opacity-100"
              />

              {/* Cover Overlay on Hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                <div className="w-10 h-10 rounded-full bg-white/90 text-zinc-950 flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <Eye size={16} />
                </div>
              </div>
            </div>

            {/* Description View */}
            <div className="p-5 border-t border-zinc-900/60 bg-zinc-950/20 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-mono font-black text-zinc-500 uppercase tracking-widest mb-1 truncate">
                  {item.tags?.slice(0, 2).join(" | ")}
                </h4>
                <h3 className="text-sm font-black text-white uppercase tracking-tight mb-3 group-hover:text-orange-500 transition-colors">
                  {item.brandName} Overhaul
                </h3>
              </div>
              
              {/* Stats pill */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-900/40">
                <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                  <Award size={10} className="text-orange-500" /> Outcome:
                </span>
                <span className="text-[9px] font-mono font-black text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded">
                  {item.outcome}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Social Proof note */}
      <div className="text-center mt-10">
        <p className="text-zinc-600 text-[10px] sm:text-xs font-mono uppercase tracking-widest">
          More than <span className="text-orange-500 font-bold">500+ brands</span> scaled with our product graphics.
        </p>
      </div>
    </div>
  );
}
