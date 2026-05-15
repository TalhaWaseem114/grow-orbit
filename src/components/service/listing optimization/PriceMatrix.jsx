"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2, ArrowRight, Star, Search, BarChart3, Zap,
} from "lucide-react";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-8 h-[2px] bg-orange-500" />
    <span className="font-bold text-[10px] font-mono uppercase tracking-[0.4em] text-orange-500">
      {children}
    </span>
  </div>
);

export default function PriceMatrix() {
  const tiers = [
    {
      name: "Essential SEO",
      tagline: "Clarity on what's broken",
      icon: <Search size={22} />,
      accent: "from-orange-500 to-amber-400",
      features: [
        { label: "Full Listing Audit (Up to 5 ASINs)", included: true },
        { label: "Keyword Gap Analysis", included: true },
        { label: "Backend Search Term Optimization", included: true },
        { label: "Title & Bullet Point Rewrite", included: true },
        { label: "Competitor Benchmarking (Top 3)", included: true },
        { label: "A+ Content Optimization", included: false },
        { label: "Quarterly Re-optimization Cycles", included: false },
        { label: "Dedicated SEO Strategist", included: false },
      ],
      cta: "Get Started",
    },
    {
      name: "Growth SEO",
      tagline: "Full-spectrum optimization",
      icon: <BarChart3 size={22} />,
      accent: "from-rose-500 to-orange-500",
      featured: true,
      features: [
        { label: "Full Listing Audit (Up to 15 ASINs)", included: true },
        { label: "Keyword Gap Analysis", included: true },
        { label: "Backend Search Term Optimization", included: true },
        { label: "Title & Bullet Point Rewrite", included: true },
        { label: "Competitor Benchmarking (Top 10)", included: true },
        { label: "A+ Content Optimization", included: true },
        { label: "Quarterly Re-optimization Cycles", included: true },
        { label: "Dedicated SEO Strategist", included: false },
      ],
      cta: "Book a Call",
    },
    {
      name: "Domination SEO",
      tagline: "Total search authority",
      icon: <Zap size={22} />,
      accent: "from-violet-500 to-orange-400",
      features: [
        { label: "Full Listing Audit (Unlimited ASINs)", included: true },
        { label: "Keyword Gap Analysis", included: true },
        { label: "Backend Search Term Optimization", included: true },
        { label: "Title & Bullet Point Rewrite", included: true },
        { label: "Competitor Benchmarking (Full Category)", included: true },
        { label: "A+ Content Optimization", included: true },
        { label: "Monthly Re-optimization Cycles", included: true },
        { label: "Dedicated SEO Strategist", included: true },
      ],
      cta: "Contact Us",
    },
  ];

  return (
    <section id="packages" className="py-32 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mb-20">
          <SectionLabel>Investment Framework</SectionLabel>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-8 text-zinc-900">
            Choose your<br />
            <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
              optimization depth.
            </span>
          </h2>
          <p className="text-zinc-500 text-lg font-light leading-relaxed">
            Every tier delivers complete, data-driven listing optimization. The only difference
            is the scale of coverage and the intensity of ongoing support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`group relative rounded-[40px] overflow-hidden transition-all duration-500 flex flex-col ${
                tier.featured
                  ? "hover:shadow-2xl hover:shadow-orange-500/20 ring-1 ring-orange-500/20"
                  : "hover:shadow-xl hover:shadow-zinc-200/80"
              }`}
            >
              <div className={`h-1 w-full bg-linear-to-r ${tier.accent} shrink-0`} />

              <div
                className={`flex-1 border border-t-0 rounded-b-[40px] p-8 lg:p-10 transition-all duration-500 flex flex-col ${
                  tier.featured
                    ? "bg-zinc-950 border-zinc-800"
                    : "bg-white border-zinc-100 group-hover:border-orange-500/15"
                }`}
              >
                {tier.featured && (
                  <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full mb-6 self-start">
                    <Star size={9} className="text-orange-500 fill-orange-500" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-500">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      tier.featured
                        ? "bg-orange-500/10 border border-orange-500/20 text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500"
                        : "bg-zinc-50 border border-zinc-200 text-orange-500 group-hover:border-orange-500/30 group-hover:shadow-lg group-hover:shadow-orange-500/10"
                    }`}
                  >
                    {tier.icon}
                  </div>
                  <span
                    className={`text-[10px] font-black font-mono uppercase tracking-[0.3em] ${
                      tier.featured ? "text-orange-400" : "text-orange-500"
                    }`}
                  >
                    {tier.name}
                  </span>
                </div>

                <h3
                  className={`text-xl font-black uppercase tracking-tight leading-tight mb-2 ${
                    tier.featured
                      ? "text-white"
                      : "text-zinc-900 group-hover:text-orange-500 transition-colors"
                  }`}
                >
                  {tier.tagline}
                </h3>

                <div className="mb-8 mt-4">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-widest ${
                      tier.featured ? "text-zinc-500" : "text-zinc-400"
                    }`}
                  >
                    Custom pricing · Tailored to catalog size
                  </span>
                </div>

                <div className="space-y-4 mb-10 flex-1">
                  {tier.features.map((f, j) => (
                    <div
                      key={j}
                      className={`flex items-start gap-4 py-1 ${
                        !f.included ? "opacity-30" : ""
                      }`}
                    >
                      <CheckCircle2
                        size={16}
                        className={
                          f.included
                            ? "text-orange-500 shrink-0 mt-0.5"
                            : tier.featured
                            ? "text-zinc-700 shrink-0 mt-0.5"
                            : "text-zinc-300 shrink-0 mt-0.5"
                        }
                      />
                      <span
                        className={`text-[13px] font-light leading-snug ${
                          tier.featured ? "text-zinc-400" : "text-zinc-500"
                        } ${!f.included ? "line-through" : ""}`}
                      >
                        {f.label}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 no-underline ${
                    tier.featured
                      ? "bg-orange-500 text-white hover:bg-white hover:text-zinc-900"
                      : "bg-zinc-900 text-white hover:bg-orange-500 shadow-lg shadow-zinc-900/5 hover:shadow-orange-500/20"
                  }`}
                >
                  {tier.cta}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] text-zinc-400 font-light mt-12">
          All tiers include a complete listing audit delivered within 10 business days.{" "}
          <Link href="/contact" className="text-orange-500 font-bold hover:underline no-underline">
            Need something custom? →
          </Link>
        </p>
      </div>
    </section>
  );
}

