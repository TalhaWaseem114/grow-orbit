"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2, ArrowRight, Star, HeartPulse, BarChart3, Zap,
} from "lucide-react";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-8 h-[2px] bg-orange-500" />
    <span className="font-bold text-[10px] uppercase tracking-[0.4em] text-orange-500">
      {children}
    </span>
  </div>
);

export default function PriceMatrix() {
  const tiers = [
    {
      name: "Essential Support",
      tagline: "Consistent brand maintenance",
      icon: <HeartPulse size={22} />,
      accent: "from-orange-500 to-amber-400",
      features: [
        { label: "Monthly Account Health Review", included: true },
        { label: "Listing Performance Monitoring", included: true },
        { label: "Keyword Ranking Tracking", included: true },
        { label: "Monthly Performance Report", included: true },
        { label: "Email Support (48h SLA)", included: true },
        { label: "PPC Campaign Optimization", included: false },
        { label: "Quarterly Strategy Sessions", included: false },
        { label: "Dedicated Account Manager", included: false },
      ],
      cta: "Get Started",
    },
    {
      name: "Growth Support",
      tagline: "Full-spectrum brand growth",
      icon: <BarChart3 size={22} />,
      accent: "from-rose-500 to-orange-500",
      featured: true,
      features: [
        { label: "Weekly Account Health Review", included: true },
        { label: "Listing Performance Monitoring", included: true },
        { label: "Keyword Ranking Tracking", included: true },
        { label: "Weekly Performance Report", included: true },
        { label: "Priority Support (24h SLA)", included: true },
        { label: "PPC Campaign Optimization", included: true },
        { label: "Quarterly Strategy Sessions", included: true },
        { label: "Dedicated Account Manager", included: false },
      ],
      cta: "Book a Call",
    },
    {
      name: "Enterprise Support",
      tagline: "Total brand command center",
      icon: <Zap size={22} />,
      accent: "from-violet-500 to-orange-400",
      features: [
        { label: "Daily Account Health Review", included: true },
        { label: "Real-time Performance Monitoring", included: true },
        { label: "Keyword Ranking Tracking", included: true },
        { label: "Real-time Dashboard Access", included: true },
        { label: "Direct Slack / Phone Support", included: true },
        { label: "Full PPC & DSP Management", included: true },
        { label: "Monthly Strategy Sessions", included: true },
        { label: "Dedicated Account Manager", included: true },
      ],
      cta: "Contact Us",
    },
  ];

  return (
    <section id="matrix" className="py-20 md:py-32 bg-white relative overflow-hidden border-t border-zinc-100">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mb-12 md:mb-20">
          <SectionLabel>Investment Framework</SectionLabel>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.88] mb-6 md:mb-8 text-zinc-900">
            Choose your<br />
            <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
              support level.
            </span>
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            From monthly check-ins to daily operational command — select the support depth
            that matches your brand's growth stage and ambition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`group relative rounded-[28px] md:rounded-[40px] overflow-hidden transition-all duration-500 ${
                tier.featured
                  ? "ring-1 ring-orange-500/20"
                  : ""
              }`}
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${tier.accent} shrink-0`} />

              <div
                className={`h-full border border-t-0 rounded-b-[28px] md:rounded-b-[40px] p-6 md:p-10 transition-all duration-500 ${
                  tier.featured
                    ? "bg-zinc-950 border-zinc-800"
                    : "bg-white border-zinc-100 group-hover:border-orange-500/15"
                }`}
              >
                {tier.featured && (
                  <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 px-3 py-1.5 rounded-full mb-6">
                    <Star size={9} className="text-orange-400 fill-orange-400" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-400">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shrink-0 ${
                      tier.featured
                        ? "bg-orange-500/15 border border-orange-500/30 text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500"
                        : "bg-zinc-50 border border-zinc-200 text-orange-500 group-hover:border-orange-500/30 group-hover:shadow-lg group-hover:shadow-orange-500/10"
                    }`}
                  >
                    {tier.icon}
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase tracking-[0.3em] ${
                      tier.featured ? "text-orange-400" : "text-orange-500"
                    }`}
                  >
                    {tier.name}
                  </span>
                </div>

                <h3
                  className={`text-xl md:text-2xl font-black uppercase tracking-tight leading-tight mb-3 ${
                    tier.featured
                      ? "text-white"
                      : "text-zinc-900 group-hover:text-orange-500 transition-colors"
                  }`}
                >
                  {tier.tagline}
                </h3>

                <div className="mb-8 mt-4">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest ${
                      tier.featured ? "text-zinc-500" : "text-zinc-400"
                    }`}
                  >
                    Custom pricing · Monthly retainer
                  </span>
                </div>

                <div className="space-y-3.5 mb-10">
                  {tier.features.map((f, j) => (
                    <div
                      key={j}
                      className={`flex items-start gap-3.5 py-1 ${
                        !f.included ? "opacity-40" : ""
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
                        className={`text-[13px] md:text-[14px] font-light leading-snug ${
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
                      : "bg-zinc-900 text-white hover:bg-orange-500"
                  }`}
                >
                  {tier.cta}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] text-zinc-400 font-light mt-12 px-4">
          All support tiers include onboarding, account audit, and strategy kick-off.{" "}
          <Link href="/contact" className="text-orange-500 font-bold hover:underline no-underline block sm:inline mt-2 sm:mt-0">
            Need a custom support package? →
          </Link>
        </p>
      </div>
    </section>
  );
}
