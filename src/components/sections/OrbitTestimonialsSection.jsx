"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight, LineChart, Users, ShieldCheck, Zap } from "lucide-react";
import { caseStudyTestimonials } from "@/data/testimonials";

export default function OrbitTestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const testimonialsData = caseStudyTestimonials;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollPosition = scrollRef.current.scrollLeft;
    // Calculate 50% threshold logic based on card width
    const cardWidth = scrollRef.current.children[0]?.offsetWidth + 16 || 336; // 16px gap
    const newIndex = Math.round(scrollPosition / cardWidth);

    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < testimonialsData.length) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section id="testimonials" className="py-32 bg-white border-t border-zinc-100 relative overflow-hidden">
      {/* Background Graphic */}
      <div
        className="absolute top-0 right-0 w-[320px] h-[320px] sm:w-[600px] sm:h-[600px] pointer-events-none translate-x-[20%] translate-y-[0%] sm:-translate-y-[10%] opacity-[0.32] sm:opacity-[0.38] blur-[0.5px]"
        style={{
          maskImage: "radial-gradient(circle at 55% 50%, black 15%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle at 55% 50%, black 15%, transparent 75%)",
        }}
      >
        <Image
          src="/assets/orbit-testimonials-bg-new.jpg"
          alt="Orbit Testimonials Background"
          fill
          sizes="(max-width: 640px) 320px, 600px"
          className="object-contain"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="relative">
          {/* Large Background Watermark (SVG vector) */}
          <div
            aria-hidden="true"
            className="absolute
              top-[30px] right-0 rotate-90 origin-center translate-x-[40%]
              sm:top-[20px] sm:left-0 sm:right-auto sm:rotate-0 sm:origin-center sm:-translate-y-[70%] sm:translate-x-0
              pointer-events-none select-none z-0 overflow-visible"
          >
            <svg
              className="h-[60px] sm:h-[100px] md:h-[160px] w-auto overflow-visible opacity-[0.08]"
              viewBox="0 0 900 140"
              fill="none"
              aria-hidden="true"
            >
              <text
                x="0"
                y="110"
                fill="none"
                stroke="#000"
                strokeWidth="2"
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontWeight: 900,
                  fontSize: "140px",
                  letterSpacing: "-0.05em",
                  textTransform: "uppercase"
                }}
              >
                TESTIMONIALS
              </text>
            </svg>
          </div>

          {/* Section Label — App Style */}
          <div className="relative z-10">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-zinc-900 font-bold">
                06 / Testimonials
              </p>
            </div>
          </div>

          {/* Headline */}
          <h2
            className="relative z-10 text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[1.1] text-zinc-900 mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            BRANDS THAT SCALED <span
              className="italic font-normal text-zinc-500 lowercase tracking-normal"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              with us.
            </span>
          </h2>

          {/* Sub-copy */}
          <p className="relative z-10 text-zinc-600 font-light text-lg leading-relaxed max-w-xl mb-14">
            Real sellers. Documented outcomes. Not a single vanity metric.
          </p>
        </div>

        {/* Testimonial Cards — horizontal scroll on mobile, grid on desktop */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="md:grid md:grid-cols-3 md:gap-6 flex md:flex-none gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide py-8 -my-8 md:py-0 md:my-0 -mx-6 px-6 md:mx-0 md:px-0"
        >
          {testimonialsData.map((t, i) => (
            <Link
              key={i}
              href={t.caseStudyLink}
              prefetch={false}
              className="group relative bg-white rounded-[28px] sm:rounded-[32px] p-7 sm:p-8 border border-zinc-200/80 hover:border-orange-500/40 transition-all duration-500 flex flex-col w-[320px] sm:w-[360px] md:w-auto snap-center shrink-0 overflow-hidden no-underline shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12),0_0_25px_rgba(249,115,22,0.08)] hover:-translate-y-1.5 active:scale-[0.99]"
            >
              {/* Upper Content Group */}
              <div>
                {/* Stars + Verified Seal + Growth Phase Badge */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  {/* Left: 5 Stars + Verified Badge */}
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} size={12} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[8px] font-bold uppercase tracking-wider">
                      <ShieldCheck size={10} className="text-emerald-600" />
                      <span>Verified Data</span>
                    </div>
                  </div>

                  {/* Right: Growth Phase Tag */}
                  {t.status && (
                    <span className="text-[8px] sm:text-[8.5px] font-mono font-bold uppercase tracking-wider text-orange-600 bg-orange-50 border border-orange-200/80 px-2.5 py-1 rounded-full shrink-0">
                      {t.status}
                    </span>
                  )}
                </div>

                {/* Category tag & Headline */}
                <div className="mb-3">
                  <span className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-[0.2em] block mb-1">
                    {t.category}
                  </span>
                  <h3 className="text-[15px] sm:text-[16px] font-black uppercase tracking-tight text-zinc-900 leading-snug group-hover:text-orange-600 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {t.headline[0]} <span className="text-zinc-500 font-bold">- {t.headline[1]}</span>
                  </h3>
                </div>

                {/* Spacious Quote */}
                <p className="text-zinc-600 text-[13px] sm:text-[13.5px] font-normal leading-relaxed italic mb-6 relative">
                  <span className="text-zinc-200 text-3xl absolute -top-3.5 -left-1.5 font-serif select-none pointer-events-none">“</span>
                  <span className="pl-4.5 block">{t.paragraph}</span>
                </p>

                {/* Highlighted Growth Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 py-3.5 border-y border-zinc-100 mb-6 bg-zinc-50/70 rounded-xl px-3">
                  {t.stats.map((stat, si) => {
                    const isGrowth = stat.type === "growth" || stat.val.includes("%") || stat.val.includes("+");
                    return (
                      <div key={si} className={`flex flex-col ${si !== 2 ? "border-r border-zinc-200/60 pr-2" : ""}`}>
                        <span className={`text-[13.5px] sm:text-[14px] font-black leading-none ${isGrowth ? "text-orange-600" : "text-zinc-900"}`}>
                          {stat.val}
                        </span>
                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider mt-1">{stat.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer Row: Author + Sleek Case Study Action Button */}
              <div className="border-t border-zinc-100 pt-5 flex items-center justify-between gap-3 mt-auto">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-200/80 relative">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    {/* Verified founder check badge */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Verified Brand Owner">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <span className="font-extrabold text-[11px] sm:text-xs uppercase tracking-tight text-zinc-900 block leading-tight truncate">
                      {t.name}
                    </span>
                    <span className="text-[9px] sm:text-[9.5px] font-medium text-zinc-500 block leading-none mt-0.5 truncate">
                      {t.role}
                    </span>
                  </div>
                </div>

                {/* Sleek Action Micro-Button */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 group-hover:bg-orange-500 text-zinc-700 group-hover:text-white border border-zinc-200/80 group-hover:border-orange-500 font-bold text-[9.5px] sm:text-[10px] uppercase tracking-wider transition-all duration-300 shrink-0 shadow-2xs group-hover:shadow-[0_4px_12px_rgba(249,115,22,0.3)]">
                  <span>Case Study</span>
                  <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Scroll hint — mobile only */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-4 mb-12">
          {testimonialsData.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? "w-8 bg-orange-500" : "w-4 bg-zinc-200"}`}
            />
          ))}
        </div>

        {/* Global Stats Bar */}
        <div className="mt-8 sm:mt-12 md:mt-20 relative z-10">
          <div className="bg-white border border-zinc-200/80 rounded-2xl md:rounded-[24px] shadow-[0_10px_35px_rgba(0,0,0,0.03)] overflow-hidden">
            {/* 2x2 on mobile, 5 columns on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-5 md:py-7 md:px-8 lg:px-10 md:gap-x-2 lg:gap-x-6">
              {[
                { icon: Users,       val: "80+",   label: "Brands Scaled"   },
                { icon: Zap,         val: "$12M+", label: "Revenue Driven"  },
                { icon: LineChart,   val: "37%",   label: "Avg. Lower ACoS" },
                { icon: Star,        val: "4.9/5", label: "Client Rating"   },
                { icon: ShieldCheck, val: "100%",  label: "Results Focused" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-4 sm:p-5 md:p-0 relative group transition-colors ${
                    idx === 0
                      ? "border-r border-b md:border-r-0 md:border-b-0 border-zinc-100"
                      : idx === 1
                      ? "border-b md:border-b-0 border-zinc-100"
                      : idx === 2
                      ? "border-r md:border-r-0 border-zinc-100"
                      : idx === 3
                      ? ""
                      : "hidden md:flex"
                  }`}
                >
                  {/* Icon */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-500/[0.08] border border-orange-500/15 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-orange-500/[0.14]">
                    <stat.icon size={16} className="text-orange-500" />
                  </div>
                  {/* Text */}
                  <div className="flex flex-col">
                    <span
                      className="text-lg sm:text-xl font-extrabold text-zinc-900 leading-none tracking-tight group-hover:text-orange-500 transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {stat.val}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-zinc-500 uppercase tracking-wider mt-1 group-hover:text-zinc-600 transition-colors">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Trust Footer Bar for 5th Stat */}
            <div className="md:hidden bg-gradient-to-r from-orange-500/[0.04] via-orange-500/[0.07] to-orange-500/[0.04] border-t border-orange-500/15 py-2.5 px-4 flex items-center justify-center gap-2">
              <div className="w-5 h-5 rounded-full bg-orange-500/15 flex items-center justify-center shrink-0">
                <ShieldCheck size={12} className="text-orange-600" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-zinc-900">
                100% Results Focused
              </span>
              <span className="text-zinc-300">•</span>
              <span className="text-[10px] font-bold text-orange-600/90 uppercase tracking-widest">
                Guaranteed
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
