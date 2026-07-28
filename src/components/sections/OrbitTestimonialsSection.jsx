"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Quote, ArrowRight, Zap, Clock, Target, LineChart, Percent, Flame, Users, ShieldCheck } from "lucide-react";
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
    <section className="py-32 bg-white border-t border-zinc-100 relative overflow-hidden">
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
          {/* Large Background Watermark */}
          <div
            className="absolute
              top-[30px] right-0 rotate-90 origin-center translate-x-[40%]
              sm:top-[20px] sm:left-0 sm:right-auto sm:rotate-0 sm:origin-center sm:-translate-y-[70%] sm:translate-x-0
              font-black text-[45px] sm:text-[80px] md:text-[140px] uppercase tracking-tighter opacity-[0.09] pointer-events-none select-none whitespace-nowrap"
            style={{
              fontFamily: "Arial, sans-serif",
              WebkitTextStroke: "1.5px #000",
              color: "transparent"
            }}
          >
            TESTIMONIALS
          </div>

          {/* Section Label — App Style */}
          <div className="relative z-10">
            {/* Eyebrow — App Style */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-950 text-orange-400 font-mono text-[10px] font-bold uppercase tracking-[0.25em] mb-3"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />06 / Testimonials</div>
          </div>

          {/* Headline */}
          <h2
            className="relative z-10 text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[1.1] text-zinc-900 mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            BRANDS THAT SCALED <span
              className="italic font-light text-zinc-400 lowercase tracking-normal"
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
              className="group relative bg-white rounded-[32px] p-8 md:p-10 border border-zinc-100 hover:border-orange-500/25 transition-all duration-500 flex flex-col w-[320px] sm:w-[360px] md:w-auto snap-center shrink-0 overflow-hidden no-underline"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.08), 0 8px 24px -8px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 40px 70px -10px rgba(0,0,0,0.12), 0 16px 36px -12px rgba(249,115,22,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(0,0,0,0.08), 0 8px 24px -8px rgba(0,0,0,0.04)";
              }}
            >
              {/* Upper Content Group */}
              <div>
                {/* Stars + Category Badge */}
                <div className="flex items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} size={13} className="text-orange-500 fill-orange-500" />
                      ))}
                    </div>
                    <span className="text-[12px] font-bold text-zinc-900 ml-1">5.0</span>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-orange-800 bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-full">
                    {t.category}
                  </span>
                </div>

                {/* Punchy Review Headline */}
                <h3 className="text-[15px] sm:text-[16px] font-black uppercase tracking-tight text-zinc-900 mb-3 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {t.headline[0]} <span className="text-zinc-950 font-black">— {t.headline[1]}</span>
                </h3>

                {/* Spacious Quote */}
                <p className="text-zinc-600 text-[13.5px] sm:text-[14px] font-normal leading-relaxed italic mb-6 relative">
                  <span className="text-zinc-200 text-3xl absolute -top-3.5 -left-1.5 font-serif select-none pointer-events-none">“</span>
                  <span className="pl-4.5 block">{t.paragraph}</span>
                </p>

                {/* Spacious, Clean Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 py-4 border-y border-zinc-100/80 mb-6">
                  {t.stats.map((stat, si) => (
                    <div key={si} className={`flex flex-col ${si !== 2 ? "border-r border-zinc-100" : ""}`}>
                      <span className="text-[13px] font-black text-zinc-900 leading-none">{stat.val}</span>
                      <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider mt-1">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Row: Author + Explicit Case Study Link */}
              <div className="border-t border-zinc-100 pt-6 flex items-center justify-between gap-4 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-100 relative shrink-0">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-extrabold text-[11px] uppercase tracking-wider text-zinc-900 block leading-tight mb-0.5">
                      {t.name}
                    </span>
                    <span className="text-[9px] font-medium text-zinc-500 block leading-none">
                      {t.role}
                    </span>
                  </div>
                </div>

                {/* Explicit Text Link */}
                <span className="flex items-center gap-1.5 text-zinc-900 font-extrabold text-[11px] uppercase tracking-widest transition-colors duration-300 group-hover:text-orange-500 shrink-0">
                  Read Case Study
                  <ArrowRight size={12} className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1" />
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
        <div className="mt-20 relative z-10">
          <div
            className="bg-white border border-zinc-100/80 rounded-[24px] py-7 px-6 md:px-8 lg:px-10 grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4 md:gap-x-2 lg:gap-x-6 shadow-[0_12px_40px_rgba(0,0,0,0.015)]"
          >
            {[
              { icon: Users,      val: "80+",   label: "Brands Scaled"      },
              { icon: Zap,        val: "$12M+", label: "Revenue Driven"     },
              { icon: LineChart,  val: "37%",   label: "Avg. Lower ACoS"    },
              { icon: Star,       val: "4.9/5", label: "Client Rating"      },
              { icon: ShieldCheck, val: "100%",  label: "Results Focused"    },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 relative group ${
                  idx === 4 ? "col-span-2 md:col-span-1 justify-center md:justify-start" : ""
                }`}
              >
                {/* Icon (No shadow, soft pill BG) */}
                <div className="w-10 h-10 rounded-xl bg-orange-500/[0.07] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-orange-500/[0.12]">
                  <stat.icon size={16} className="text-orange-500" />
                </div>
                {/* Text */}
                <div className="flex flex-col">
                  <span className="text-lg md:text-xl font-extrabold text-zinc-900 leading-none tracking-tight group-hover:text-orange-500 transition-colors">
                    {stat.val}
                  </span>
                  <span className="text-[10px] font-medium text-zinc-600 uppercase tracking-wider mt-1 group-hover:text-zinc-500 transition-colors">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
