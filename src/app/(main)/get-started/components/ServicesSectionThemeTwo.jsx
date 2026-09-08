"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Package, Rocket, Paintbrush, BarChart3, Activity, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Search,
    number: "01",
    title: "Product Hunting",
    description: "Find high-demand, low-competition products with 30%+ margin potential.",
    stat: "30%+",
    statLabel: "Margin Potential",
  },
  {
    icon: Package,
    number: "02",
    title: "Sourcing & Setup",
    description: "Secure factory-direct pricing with verified suppliers and compliant setup.",
    stat: "0%",
    statLabel: "Risk Sourcing",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Brand Launch",
    description: "Launch with high-converting listings and keyword-optimized content.",
    stat: "2X",
    statLabel: "Faster Rankings",
  },
  {
    icon: Paintbrush,
    number: "04",
    title: "Creative & A+",
    description: "Convert more shoppers with scroll-stopping visuals and compelling A+ content.",
    stat: "25-40%",
    statLabel: "Higher Conversion",
  },
  {
    icon: BarChart3,
    number: "05",
    title: "PPC & Ranking",
    description: "Maximize ROI with data-driven PPC strategies and organic rank growth.",
    stat: "40%",
    statLabel: "ACOS Reduction",
  },
  {
    icon: Activity,
    number: "06",
    title: "Full Account Mgmt",
    description: "End-to-end management to scale your brand past $100K/month.",
    stat: "$100K+",
    statLabel: "Monthly Scaling",
  },
];

/* ── Shared Card Component ── */
function ServiceCard({ service, className = "" }) {
  return (
    <div
      className={`group relative bg-white border border-zinc-100 rounded-2xl p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:shadow-orange-500/5 hover:border-orange-500/20 transition-all duration-500 cursor-default active:scale-[0.98] ${className}`}
    >
      {/* Icon + Number row */}
      <div className="flex items-start justify-between mb-5">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-500 shadow-[0_0_15px_rgba(249,115,22,0.1)] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]">
          <service.icon size={15} className="text-orange-500 group-hover:text-white transition-colors duration-500" />
        </div>
        <span className="text-zinc-500 font-mono text-[10px] sm:text-[11px] font-bold tracking-wider">{service.number}</span>
      </div>

      {/* Title */}
      <h3
        className="text-zinc-900 text-[11px] sm:text-[13px] font-extrabold uppercase tracking-tight mb-2 leading-tight h-[2.4em] flex items-center"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-zinc-600 text-[11px] font-normal leading-relaxed mb-4">
        {service.description}
      </p>

      {/* Stat (WCAG Large Text >=18.66px bold: 20px font-black passes 3.0:1 threshold with orange-600) */}
      <div className="mt-auto pt-3 border-t border-zinc-100">
        <p
          className="text-orange-600 text-[20px] sm:text-2xl font-black tracking-tight leading-none mb-0.5"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {service.stat}
        </p>
        <p className="text-zinc-500 text-[9px] font-semibold uppercase tracking-wider">
          {service.statLabel}
        </p>
      </div>
    </div>
  );
}

export default function ServicesSectionThemeTwo() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.children[0]?.offsetWidth + 12 || 280; // 12px gap
    const newIndex = Math.round(container.scrollLeft / cardWidth);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < services.length) {
      setActiveIndex(newIndex);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  return (
    <section className="relative bg-white py-20 sm:py-28 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        {/* Large Background Watermark (SVG vector - exempt from text contrast) */}
        <div
          aria-hidden="true"
          className="absolute top-[30px] right-0 rotate-90 origin-center translate-x-[40%] sm:top-[-120px] sm:left-[30px] sm:translate-x-0 sm:rotate-0 sm:origin-center sm:translate-y-0 pointer-events-none select-none z-0 overflow-visible"
        >
          <svg
            className="h-[60px] sm:h-[100px] md:h-[160px] w-auto overflow-visible opacity-[0.08]"
            viewBox="0 0 680 140"
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
              SERVICES
            </text>
          </svg>
        </div>
        {/* ── Header Area ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 sm:mb-20">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-zinc-900 font-bold">
                02 / What We Do
              </p>
            </div>

            {/* Main Heading */}
            <h2
              className="text-zinc-900 text-3xl sm:text-4xl md:text-[44px] font-black uppercase tracking-tighter leading-[1.1] mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Every Lever That <span
                className="text-zinc-500 italic font-normal lowercase tracking-normal text-[32px] sm:text-[38px] md:text-[46px]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                moves revenue.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-zinc-500 text-sm sm:text-[15px] font-light leading-relaxed max-w-md">
              A full-funnel Amazon growth system built to increase visibility, boost conversion, and scale profitably.
            </p>
          </div>

          {/* Right side — CTA */}
          <div className="flex items-center gap-8 mt-8 lg:mt-0">
            <Link
              href="/service"
              className="group inline-flex items-center gap-2 text-zinc-900 hover:text-orange-500 font-bold text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 no-underline whitespace-nowrap"
            >
              See All 18 Services
              <ArrowUpRight size={14} className="text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* ── MOBILE: Horizontal Snap Carousel (< lg) ── */}
        <div className="lg:hidden -mx-6 sm:-mx-8">
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 sm:px-8 scroll-pl-6 sm:scroll-pl-8 pb-2"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {services.map((service, i) => (
              <div
                key={i}
                className="snap-start shrink-0"
                style={{ width: "min(75vw, 280px)" }}
              >
                <ServiceCard service={service} className="h-full" />
              </div>
            ))}
            {/* Trailing spacer so last card can snap fully */}
            <div className="shrink-0 w-3 sm:w-5" aria-hidden="true" />
          </div>

          {/* Scroll indicator dots */}
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {services.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-6 bg-orange-500" : "w-2 bg-zinc-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── DESKTOP: 6-Column Grid (lg+) ── */}
        <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
