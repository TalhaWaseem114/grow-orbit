"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
import PortfolioCard from "./PortfolioCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MasonryGrid({ items }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Grid items
      gsap.fromTo(
        ".portfolio-card",
        { opacity: 0, y: 36, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.75, stagger: 0.07, ease: "expo.out", overwrite: true,
          scrollTrigger: {
            trigger: ".portfolio-card",
            start: "top 95%"
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mb-6">
          <Sparkles size={24} />
        </div>
        <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 mb-2">
          No items yet
        </h3>
        <p className="text-zinc-400 font-light text-sm">
          We are adding more work to this category soon.
        </p>
      </div>
    );
  }

  /* Distribute items across 4 columns with offsets */
  const c1d = items.filter((_, i) => i % 4 === 0);
  const c2d = items.filter((_, i) => i % 4 === 1);
  const c3d = items.filter((_, i) => i % 4 === 2);
  const c4d = items.filter((_, i) => i % 4 === 3);

  return (
    <div ref={containerRef} className="w-full min-h-[400px]">
      {/* Desktop: 4 columns */}
      <div className="hidden md:flex items-start gap-5 w-full">
        <div className="flex-1 flex flex-col gap-5">{c1d.map((item, i) => <PortfolioCard key={item.id} item={item} priority={i === 0} />)}</div>
        <div className="flex-1 flex flex-col gap-5 mt-14">{c2d.map((item, i) => <PortfolioCard key={item.id} item={item} priority={i === 0} />)}</div>
        <div className="flex-1 flex flex-col gap-5 -mt-4">{c3d.map((item, i) => <PortfolioCard key={item.id} item={item} priority={i === 0} />)}</div>
        <div className="flex-1 flex flex-col gap-5 mt-8">{c4d.map((item, i) => <PortfolioCard key={item.id} item={item} priority={i === 0} />)}</div>
      </div>
      {/* Mobile/Tablet: Single or Double based on viewport */}
      <div className="md:hidden flex flex-col gap-6 w-full">
        {items.map((item, i) => <PortfolioCard key={item.id} item={item} priority={i < 2} />)}
      </div>
    </div>
  );
}
