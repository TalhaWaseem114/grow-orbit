"use client";

import { Search, Package, Rocket, Image as ImageIcon, BarChart3, Settings, ArrowUpRight } from "lucide-react";
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
    icon: ImageIcon,
    number: "04",
    title: "Creative & A+",
    description: "Convert more shoppers with scroll-stopping visuals and compelling A+ content.",
    stat: "25–40%",
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
    icon: Settings,
    number: "06",
    title: "Full Account Mgmt",
    description: "End-to-end management to scale your brand past $100K/month.",
    stat: "$100K+",
    statLabel: "Monthly Scaling",
  },
];

export default function ServicesSectionThemeTwo() {
  return (
    <section className="relative bg-white py-20 sm:py-28 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        {/* Large Background Watermark */}
        <div
          className="absolute top-[30px] right-0 rotate-90 origin-center translate-x-[40%] sm:top-[-120px] sm:left-[30px] sm:translate-x-0 sm:rotate-0 sm:origin-center sm:translate-y-0 font-black text-[45px] sm:text-[80px] md:text-[140px] uppercase tracking-tighter opacity-[0.05] pointer-events-none select-none whitespace-nowrap z-0"
          style={{
            fontFamily: "'Oswald', sans-serif",
            WebkitTextStroke: "1.5px #000",
            color: "transparent"
          }}
        >
          SERVICES
        </div>
        {/* ── Header Area ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 sm:mb-20">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-orange-500/80 mb-3">02 / What We Do</p>

            {/* Main Heading */}
            <h2
              className="text-zinc-900 text-3xl sm:text-4xl md:text-[44px] font-black uppercase tracking-tighter leading-[1.1] mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Every Lever That <span
                className="text-zinc-300 italic font-normal lowercase tracking-normal text-[32px] sm:text-[38px] md:text-[46px]"
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

          {/* Right side — Orbital graphic + CTA */}
          <div className="flex items-center gap-8 mt-8 lg:mt-0">


            <Link
              href="/service"
              className="group flex items-center gap-2 text-orange-500 font-bold text-[11px] uppercase tracking-[0.2em] hover:text-orange-600 transition-colors no-underline whitespace-nowrap"
            >
              See All 18 Services
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* ── Service Cards Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 sm:gap-3">
          {services.map((service, i) => (
            <div
              key={i}
              className="group relative bg-white border border-zinc-100 rounded-2xl p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:shadow-orange-500/5 hover:border-orange-500/20 transition-all duration-500 cursor-default active:scale-[0.98]"
            >
              {/* Icon + Number row */}
              <div className="flex items-start justify-between mb-5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-500 shadow-[0_0_15px_rgba(249,115,22,0.1)] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                  <service.icon size={15} className="text-orange-500 group-hover:text-white transition-colors duration-500" />
                </div>
                <span className="text-orange-500/40 text-[9px] sm:text-[11px] font-bold tracking-wider">{service.number}</span>
              </div>

              {/* Title */}
              <h3
                className="text-zinc-900 text-[11px] sm:text-[13px] font-extrabold uppercase tracking-tight mb-2 leading-tight h-[2.4em] flex items-center"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-500 text-[11px] font-light leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Stat */}
              <div className="mt-auto pt-3 border-t border-zinc-100">
                <p
                  className="text-orange-500 text-lg sm:text-xl font-black tracking-tight leading-none mb-0.5"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {service.stat}
                </p>
                <p className="text-zinc-400 text-[9px] font-medium uppercase tracking-wider">
                  {service.statLabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
