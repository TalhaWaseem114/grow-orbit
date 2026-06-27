"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function PortfolioCard({ item, priority = false }) {
  // Get all unique images for this project to use as thumbnail variants
  const previewImages = [];
  const seenSrcs = new Set();

  if (item.src) {
    seenSrcs.add(item.src);
    previewImages.push({ src: item.src });
  }

  (item.gallery || []).forEach(img => {
    if (img && img.src && !seenSrcs.has(img.src)) {
      seenSrcs.add(img.src);
      previewImages.push(img);
    }
  });

  if (item.serviceDetails) {
    Object.values(item.serviceDetails).forEach(svc => {
      if (svc && Array.isArray(svc.images)) {
        svc.images.forEach(img => {
          if (img && img.src && !seenSrcs.has(img.src)) {
            seenSrcs.add(img.src);
            previewImages.push(img);
          }
        });
      }
    });
  }

  const [activeSrc, setActiveSrc] = useState(item.src);

  // Sync state if item changes
  useEffect(() => {
    setActiveSrc(item.src);
  }, [item]);

  return (
    <Link
      href={`/portfolio/${item.id}`}
      prefetch={false}
      className="portfolio-card group block relative overflow-hidden rounded-[20px] sm:rounded-[28px] border border-zinc-200/50 dark:border-zinc-800/80 ease-out hover:-translate-y-2 hover:border-orange-500/30 bg-[#0c0c0e]"
      style={{ transition: "transform 0.5s ease-out, border-color 0.5s ease-out" }}
    >
      {/* Edge-to-Edge Image Container */}
      <div className="relative w-full aspect-square bg-[#fafafa] dark:bg-zinc-950 overflow-hidden">
        <Image
          src={activeSrc}
          alt={item.outcome || "Portfolio Item"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          placeholder={activeSrc?.includes('cloudinary.com/') ? "blur" : "empty"}
          blurDataURL={activeSrc?.includes('cloudinary.com/') ? activeSrc.replace('/upload/', '/upload/w_100,e_blur:1000,q_1,f_auto/') : undefined}
        />

        {/* Text Overlay - Clean white/orange typography on subtle dark gradient */}
        <div className="absolute inset-x-0 bottom-0 pt-8 pb-3 px-3.5 sm:px-4 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/50 to-transparent z-10 flex flex-col gap-0.5 text-white pointer-events-none">
          {/* Brand Name & Niche */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[7.5px] sm:text-[8px] font-mono text-zinc-300 uppercase tracking-widest font-bold">
              {item.brandName} · {item.niche}
            </span>
            <span className="text-[6.5px] font-mono text-zinc-400 uppercase tracking-wider">
              {item.id}
            </span>
          </div>

          {/* Outcome Metric */}
          <h4
            className="text-[12.5px] sm:text-[13.5px] font-black uppercase tracking-tight text-white group-hover:text-orange-400 transition-colors duration-300 flex items-center justify-between pointer-events-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span>{item.outcome}</span>
            <span className="w-5.5 h-5.5 rounded-full bg-white/15 border border-white/10 flex items-center justify-center group-hover:bg-orange-50 group-hover:border-orange-50 group-hover:rotate-45 transition-all duration-500 shrink-0 shadow-sm">
              <ArrowUpRight size={11} className="text-white" />
            </span>
          </h4>
        </div>

        {/* Floating Tag - Top Center Edge */}
        <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 z-20 flex">
          <div className="bg-orange-500/95 text-white text-[7px] font-black uppercase tracking-widest px-3 py-1 rounded-b-xl shadow-[0_2px_8px_rgba(249,115,22,0.3)] border border-orange-400/20 border-t-0 flex items-center justify-center text-center">
            <span>{item.category}{item.services?.includes("A+ Content") ? " / A+" : ""}</span>
          </div>
        </div>
      </div>

      {/* Small dark card body at the bottom just to fit the variant thumbnails */}
      {previewImages.length > 1 && (
        <div className="px-3 pb-3 pt-1.5 sm:pb-4 sm:pt-2 flex items-center justify-center gap-2 flex-wrap z-20 relative">
          {previewImages.slice(0, 4).map((img, idx) => {
            const isSelected = activeSrc === img.src;
            return (
              <div
                key={idx}
                onMouseEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveSrc(img.src);
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveSrc(img.src);
                }}
                className={`relative w-[34px] h-[34px] sm:w-[42px] sm:h-[42px] rounded-lg overflow-hidden border transition-all duration-200 cursor-pointer shrink-0 bg-zinc-950
                  ${isSelected ? "border-orange-500 scale-105 shadow-[0_0_8px_rgba(249,115,22,0.4)]" : "border-white/20 hover:border-white/50"}`}
              >
                <Image
                  src={img.src}
                  alt="Portfolio Thumbnail"
                  fill
                  sizes="(max-width: 640px) 34px, 42px"
                  className="object-cover"
                  placeholder={img.src?.includes('cloudinary.com/') ? "blur" : "empty"}
                  blurDataURL={img.src?.includes('cloudinary.com/') ? img.src.replace('/upload/', '/upload/w_50,e_blur:1000,q_1,f_auto/') : undefined}
                />
              </div>
            );
          })}
          {previewImages.length > 4 && (
            <div className="w-[34px] h-[34px] sm:w-[42px] sm:h-[42px] rounded-lg overflow-hidden border border-white/15 bg-zinc-900/80 flex items-center justify-center shrink-0">
              <span className="text-[10px] sm:text-[12px] font-bold text-zinc-300">
                +{previewImages.length - 4}
              </span>
            </div>
          )}
        </div>
      )}
    </Link>
  );
}
