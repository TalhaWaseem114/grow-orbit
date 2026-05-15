"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2, ArrowRight, Star, ShieldCheck, ShieldAlert, Zap,
} from "lucide-react";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-8 h-px bg-orange-500" />
    <span className="font-bold text-[10px] font-mono uppercase tracking-[0.4em] text-orange-500">
      {children}
    </span>
  </div>
);

export default function PriceMatrix() {
  const tiers = [
    {
      name: "Essential Shield",
      tagline: "Foundational account protection",
      icon: <ShieldCheck size={22} />,
      accent: "from-orange-500 to-amber-400",
      features: [
        { label: "24/7 Account Health Monitoring", included: true },
        { label: "Buy Box & Hijacker Alerts", included: true },
        { label: "5 Case Reconciliations / Mo", included: true },
        { label: "Suppressed Listing Recovery", included: true },
        { label: "Basic Category Compliance", included: true },
        { label: "Full-Spectrum Case Management", included: false },
        { label: "Unlimited Shipment Reconciliations", included: false },
        { label: "IP / Brand Protection", included: false },
      ],
      cta: "Get Protected",
    },
    {
      name: "Growth Defense",
      tagline: "Complete operational security",
      icon: <ShieldAlert size={22} />,
      accent: "from-rose-500 to-orange-500",
      featured: true,
      features: [
        { label: "24/7 Account Health Monitoring", included: true },
        { label: "Buy Box & Hijacker Alerts", included: true },
        { label: "Unlimited Case Reconciliations", included: true },
        { label: "Suppressed Listing Recovery", included: true },
        { label: "Full-Spectrum Case Management", included: true },
        { label: "IP / Brand Protection", included: true },
        { label: "MAP Price Monitoring", included: true },
        { label: "Dedicated Account Strategist", included: false },
      ],
      cta: "Fortify Account",
    },
    {
      name: "Enterprise Ops",
      tagline: "Total account autopilot",
      icon: <Zap size={22} />,
      accent: "from-violet-500 to-orange-400",
      features: [
        { label: "Multi-Account Centralized Ops", included: true },
        { label: "Dedicated Account Strategist", included: true },
        { label: "Real-Time Risk Mitigation", included: true },
        { label: "Strategic Supply Chain Advisory", included: true },
        { label: "Custom API Integrations", included: true },
        { label: "IP / Brand Protection", included: true },
        { label: "Priority 1-Hour Response", included: true },
        { label: "Unlimited Everything", included: true },
      ],
      cta: "Enterprise Access",
    },
  ];

  return (
    <section id="matrix" className="py-20 md:py-32 bg-[#fafafa] relative overflow-hidden text-left border-t border-zinc-100">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mb-12 md:mb-20">
          <SectionLabel>Investment Framework</SectionLabel>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.88] mb-6 md:mb-8 text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Choose your<br />
            <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
              defense level.
            </span>
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            From foundational account safety to comprehensive enterprise-grade operations — 
            choose the tier that perfectly matches your current scale and risk profile.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`group relative rounded-[28px] md:rounded-[40px] overflow-hidden transition-all duration-500 flex flex-col ${
                tier.featured
                  ? "hover:shadow-2xl hover:shadow-orange-500/20 ring-1 ring-orange-500/20"
                  : "hover:shadow-xl hover:shadow-zinc-200/80"
              }`}
            >
              <div className={`h-1 w-full bg-linear-to-r ${tier.accent} shrink-0`} />

              <div
                className={`flex-1 border border-t-0 rounded-b-[28px] md:rounded-b-[40px] p-6 md:p-8 lg:p-10 transition-all duration-500 flex flex-col ${
                  tier.featured
                    ? "bg-zinc-950 border-zinc-800"
                    : "bg-white border-zinc-100 group-hover:border-orange-500/15"
                }`}
              >
                {tier.featured && (
                  <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full mb-6 self-start">
                    <Star size={9} className="text-orange-500 fill-orange-500" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-500">
                      Most Selected
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      tier.featured
                        ? "bg-orange-500/10 border border-orange-500/20 text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500"
                        : "bg-orange-50 border border-orange-100 text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500"
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
                  className={`text-xl font-bold uppercase tracking-tight leading-tight mb-2 ${
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
                    Custom pricing · Security & Health focus
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
          Account Ops fees are typically structured as a monthly retainer based on catalog size and marketplace count.{" "}
          <Link href="/contact" className="text-orange-500 font-bold hover:underline no-underline">
            Request an operational diagnostic →
          </Link>
        </p>
      </div>
    </section>
  );
}
