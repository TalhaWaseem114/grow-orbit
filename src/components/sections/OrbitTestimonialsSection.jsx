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
      <div className="absolute top-0 right-0 w-[320px] h-[320px] sm:w-[600px] sm:h-[600px] pointer-events-none translate-x-[20%] translate-y-[0%] sm:-translate-y-[10%] opacity-60 sm:opacity-100 blur-[0.5px]">
        <Image
          src="/assets/orbit-testimonials-bg.png"
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
              font-black text-[45px] sm:text-[80px] md:text-[140px] uppercase tracking-tighter opacity-[0.05] pointer-events-none select-none whitespace-nowrap"
            style={{
              fontFamily: "'Oswald', sans-serif",
              WebkitTextStroke: "1.5px #000",
              color: "transparent"
            }}
          >
            TESTIMONIALS
          </div>

          {/* Section Label — App Style */}
          <div className="relative z-10 flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
              04 / CLIENT RESULTS
            </span>
          </div>

          {/* Headline */}
          <h2
            className="relative z-10 text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[1.1] text-zinc-900 mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            BRANDS THAT SCALED <span
              className="italic font-light text-zinc-300 lowercase tracking-normal"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              with us.
            </span>
          </h2>

          {/* Sub-copy */}
          <p className="relative z-10 text-zinc-500 font-light text-lg leading-relaxed max-w-xl mb-14">
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
            <div
              key={i}
              className="group relative bg-white rounded-[32px] p-7 md:p-8 border border-zinc-100 hover:border-orange-500/10 transition-all duration-700 flex flex-col w-[320px] sm:w-[360px] md:w-auto snap-center shrink-0 overflow-hidden"
              style={{
                boxShadow: "0 10px 30px rgba(0,0,0,0.04), 0 4px 10px rgba(0,0,0,0.01)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 30px 60px rgba(0,0,0,0.08), 0 10px 20px rgba(249,115,22,0.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.04), 0 4px 10px rgba(0,0,0,0.01)";
              }}
            >
              {/* Background Quote Icon */}
              <Quote
                size={80}
                className="absolute top-10 right-6 text-orange-500 fill-orange-500 opacity-[0.03] pointer-events-none rotate-12"
              />

              {/* Top Row: Badge + Rating */}
              <div className="relative z-10 flex items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-2 bg-orange-500/5 border border-orange-500/10 rounded-full px-3.5 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[9px] font-black text-zinc-900 tracking-wider uppercase">
                    {t.status} <span className="mx-1 text-zinc-300">|</span> {t.category}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={12} className="text-orange-500 fill-orange-500" />
                    ))}
                  </div>
                  <span className="text-[12px] font-black text-zinc-900">{t.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Headline */}
              <div className="relative z-10 mb-4">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-zinc-900 uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {t.headline[0]}<br />
                  <span className="text-orange-500">{t.headline[1]}</span>
                </h3>
              </div>

              {/* Paragraph */}
              <p className="relative z-10 text-zinc-500 text-[14px] leading-relaxed mb-8 line-clamp-3">
                {t.paragraph}
              </p>

              {/* Stats Block */}
              <div className="relative z-10 bg-zinc-50/50 border border-zinc-100 rounded-2xl p-5 grid grid-cols-3 gap-2 mb-6">
                {t.stats.map((stat, si) => (
                  <div key={si} className={`flex flex-col items-center text-center ${si !== 2 ? "border-r border-zinc-200" : ""}`}>
                    <div className="mb-2 text-orange-500">
                      {stat.type === 'roas' && <Flame size={16} />}
                      {stat.type === 'days' && <Clock size={16} />}
                      {stat.type === 'revenue' && <Zap size={16} />}
                      {stat.type === 'acos' && <Percent size={16} />}
                      {stat.type === 'profit' && <LineChart size={16} />}
                      {stat.type === 'growth' && <Target size={16} />}
                      {stat.type === 'rank' && <Target size={16} />}
                      {stat.type === 'spend' && <LineChart size={16} />}
                    </div>
                    <span className="text-[13px] font-black text-zinc-900 leading-none mb-1.5">{stat.val}</span>
                    <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="relative z-10 mt-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md grayscale hover:grayscale-0 transition-all duration-500 relative shrink-0">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                      placeholder={typeof t.image === 'string' && t.image.includes('cloudinary.com/') ? "blur" : "empty"}
                      blurDataURL={typeof t.image === 'string' && t.image.includes('cloudinary.com/') ? t.image.replace('/upload/', '/upload/w_100,e_blur:1000,q_1,f_auto/') : undefined}
                    />
                  </div>
                  <div>
                    <span className="font-black text-[12px] uppercase tracking-tight text-zinc-900 block leading-tight">
                      {t.name}
                    </span>
                    <span className="text-[10px] font-medium text-zinc-500 block">
                      {t.role}
                    </span>
                  </div>
                </div>

                <Link
                  href={t.caseStudyLink}
                  prefetch={false}
                  className="flex items-center gap-2 text-orange-500 font-black text-[10px] uppercase tracking-[0.15em] hover:gap-3 transition-all no-underline group/link"
                >
                  View Case Study
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
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
            className="bg-zinc-50 border border-zinc-100 rounded-3xl py-10 px-4 md:px-10 md:py-8 grid grid-cols-2 md:flex md:flex-nowrap items-center justify-between gap-x-2 gap-y-10 md:gap-4"
            style={{
              boxShadow: "none"
            }}
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
                className={`flex items-center gap-3 sm:gap-4 relative group ${idx === 4 ? "col-span-2 justify-center md:col-span-1 md:justify-start" : ""}`}
              >
                {/* Icon */}
                <div className={`rounded-full bg-zinc-900 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300 ${idx === 4 ? "w-11 h-11 sm:w-12 sm:h-12" : "w-10 h-10 sm:w-12 sm:h-12"}`}>
                  <stat.icon size={idx === 4 ? 18 : 16} className="text-orange-500" />
                </div>
                {/* Text */}
                <div className="flex flex-col">
                  <span className={`${idx === 4 ? "text-[18px] sm:text-[20px]" : "text-[16px] sm:text-[18px]"} md:text-[22px] font-black text-zinc-900 leading-tight uppercase`}>
                    {stat.val}
                  </span>
                  <span className={`${idx === 4 ? "text-[9px] sm:text-[10px]" : "text-[8px] sm:text-[9px]"} md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap`}>
                    {stat.label}
                  </span>
                </div>
                {/* Divider */}
                {idx < 4 && idx % 2 === 0 && (
                  <div className="hidden sm:block md:hidden absolute -right-2 top-1/2 -translate-y-1/2 w-px h-10 bg-orange-500/10" />
                )}
                {idx < 4 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-px h-10 bg-orange-500/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
