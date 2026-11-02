"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";

export default function SellerCentralShowcase({
  unitsSold12mo = "1.15M+",
  growthVsLastYear = "135%",
  buyBoxRate = "99%",
  highlightIndex = 1,
}) {
  const [activeScreen, setActiveScreen] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeScreen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") setActiveScreen(null);
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activeScreen]);

  const screens = [
    {
      src: "/images/saler centeral screens/1.jpg",
      alt: "Amazon Seller Central: Graffixx 61K units sold",
      index: 0,
    },
    {
      src: "/images/saler centeral screens/2.jpg",
      alt: "Amazon Seller Central: Kazvoo 88K units sold",
      index: 1,
    },
    {
      src: "/images/saler centeral screens/3.jpg",
      alt: "Amazon Seller Central: Dunova 67K units sold",
      index: 2,
    },
  ];

  return (
    <section
      className="py-16 sm:py-24 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/8 rounded-full blur-[180px]" />
      </div>

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2.5 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-orange-400 font-bold uppercase tracking-[0.2em] text-[10px]">
              Real Client Dashboards
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-white uppercase mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Numbers that{" "}
            <span
              className="italic font-light text-zinc-400 normal-case tracking-normal"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              speak volumes.
            </span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-light max-w-xl mx-auto leading-relaxed">
            Live Seller Central screenshots from brands we manage, showing growth you can see, not just hear about.
          </p>
        </div>

        {/* Screenshots row */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-6 lg:gap-8">
          {screens.map((screen) => {
            const isHighlighted = screen.index === highlightIndex;
            return (
              <div
                key={screen.index}
                className={
                  isHighlighted
                    ? "w-[40%] sm:w-[34%] max-w-[280px] shrink-0 -mt-5 sm:-mt-6"
                    : "w-[26%] sm:w-[26%] max-w-[220px] shrink-0"
                }
              >
                <div
                  onClick={() => setActiveScreen(screen)}
                  className={
                    isHighlighted
                      ? "group rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-orange-500/30 shadow-[0_30px_80px_rgba(249,115,22,0.15),0_20px_60px_rgba(0,0,0,0.5)] hover:border-orange-500/60 transition-all duration-500 hover:-translate-y-2 relative cursor-pointer"
                      : "group rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:border-orange-500/40 transition-all duration-500 hover:-translate-y-1 relative cursor-pointer"
                  }
                  title="Click to view full dashboard"
                >
                  {isHighlighted && (
                    <div className="absolute -inset-px bg-gradient-to-b from-orange-500/20 via-transparent to-orange-500/10 rounded-3xl pointer-events-none" />
                  )}
                  <Image
                    src={screen.src}
                    alt={screen.alt}
                    width={390}
                    height={844}
                    className={`w-full h-auto transition-transform duration-700 ease-out group-hover:scale-102 ${isHighlighted ? "relative z-10" : ""}`}
                    quality={90}
                    loading="lazy"
                    sizes={
                      isHighlighted
                        ? "(max-width: 640px) 40vw, 280px"
                        : "(max-width: 640px) 26vw, 220px"
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom stats callout */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-10 sm:mt-14">
          {[
            { stat: unitsSold12mo, label: "Units Sold (12mo)" },
            { stat: growthVsLastYear, label: "Growth vs Last Year" },
            { stat: buyBoxRate, label: "Buy Box Rate" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-white tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {item.stat}
              </p>
              <p className="text-[9px] sm:text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal rendered via Portal to escape all stacking contexts */}
      {mounted && activeScreen && createPortal(
        <div
          className="fixed inset-0 bg-black/95 z-[999999] flex flex-col items-center justify-center p-4 sm:p-6 backdrop-blur-md transition-all duration-300"
          onClick={() => setActiveScreen(null)}
        >
          <div
            className="relative max-w-sm sm:max-w-md w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute -top-12 right-0 text-white hover:text-orange-400 bg-white/10 hover:bg-white/20 border border-white/15 w-9 h-9 rounded-full flex items-center justify-center transition-all z-40 cursor-pointer"
              onClick={() => setActiveScreen(null)}
              aria-label="Close dashboard modal"
            >
              <X size={18} />
            </button>

            {/* High-Resolution Screenshot Container */}
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(249,115,22,0.2)] bg-zinc-950">
              <img
                src={activeScreen.src}
                alt={activeScreen.alt}
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>

            {/* Verification Pill & Title */}
            <div className="text-center mt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Verified Seller Central Data
              </div>
              <p className="text-zinc-300 text-xs sm:text-sm font-medium">
                {activeScreen.alt}
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
