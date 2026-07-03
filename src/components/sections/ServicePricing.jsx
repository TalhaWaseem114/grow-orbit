"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

/* ═══════════════════════════════════════════════
   STATIC TIER DATA
   ═══════════════════════════════════════════════ */

const AMAZON_SUITE = {
  title: "All Amazon Services",
  subtitle: "Complete Amazon Growth Engine",
  description:
    "Get full-stack Amazon management. Product research, sourcing, PPC optimization, listing SEO, day-to-day operations, automation, and ongoing support.",
  deliverables: [
    "Product research & factory sourcing",
    "Full-scale PPC management & ROAS scaling",
    "Listing SEO & keyword index optimization",
    "Day-to-day operations & account health defense",
    "Weekly performance reporting & strategy pivots",
  ],
  price: 1000,
  savings: 1400,
  timeline: "Ongoing",
  ctaLabel: "Get Amazon Growth Suite",
  ctaHref: "/contact?package=amazon-suite",
};

const ELITE_COMPLETE = {
  title: "Elite Complete Package",
  subtitle: "Amazon Services + Full Design Suite",
  description:
    "Everything in the Amazon Suite plus all creative design services. Listing images, A+ content, custom Brand Store, guidelines, and priority communication.",
  deliverables: [
    "Everything in Amazon Growth Suite",
    "All 7 listing image slots (renders/photos)",
    "A+ Content (EBC) & Brand Story design",
    "Custom Amazon storefront & guidelines",
    "Main image CTR testing & optimization",
    "Priority support with direct Slack channel",
  ],
  price: 1500,
  savings: 3000,
  timeline: "Ongoing",
  ctaLabel: "Get Elite Complete",
  ctaHref: "/contact?package=elite-complete",
};

/* ═══════════════════════════════════════════════
   PRICING CARD
   ═══════════════════════════════════════════════ */
function PricingCard({
  title,
  subtitle,
  description,
  deliverables = [],
  price,
  savings,
  timeline,
  ctaLabel,
  ctaHref,
  isPopular = false,
  delay = "0s",
}) {
  return (
    <div
      className={`
        group relative flex flex-col rounded-[32px] transition-all duration-500 hover:-translate-y-1.5
        opacity-0 animate-[pricing-up_0.7s_cubic-bezier(0.23,1,0.32,1)_forwards]
        ${isPopular
          ? "bg-zinc-950 text-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] lg:scale-[1.03] z-20 border border-orange-500/20"
          : "bg-white text-zinc-900 shadow-[0_8px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.08)] z-10 border border-zinc-100"
        }
      `}
      style={{ animationDelay: delay }}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
          <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[8px] font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full shadow-lg shadow-orange-500/20 whitespace-nowrap">
            <Star size={9} fill="currentColor" />
            Most Popular
          </div>
        </div>
      )}

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-8 sm:p-10">
        {/* Header */}
        <div className="mb-6">
          <span
            className={`font-mono text-[9px] font-bold uppercase tracking-[0.2em] block mb-2 ${
              isPopular ? "text-orange-400" : "text-orange-500"
            }`}
          >
            {subtitle}
          </span>
          <h3
            className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {title}
          </h3>
        </div>

        {/* Description */}
        <p
          className={`text-[13px] font-light leading-relaxed mb-8 ${
            isPopular ? "text-zinc-400" : "text-zinc-500"
          }`}
        >
          {description}
        </p>

        {/* Deliverables Checklist */}
        {deliverables.length > 0 && (
          <div className="space-y-3 mb-8 flex-1">
            <span
              className={`font-mono text-[8px] font-bold uppercase tracking-widest block mb-4 ${
                isPopular ? "text-zinc-500" : "text-zinc-450"
              }`}
            >
              Key Deliverables
            </span>
            {deliverables.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span
                  className={`text-[12px] font-bold shrink-0 mt-0.5 ${
                    isPopular ? "text-orange-400" : "text-orange-500"
                  }`}
                >
                  ✓
                </span>
                <span
                  className={`text-[12px] font-light leading-relaxed ${
                    isPopular ? "text-zinc-300" : "text-zinc-600"
                  }`}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Price & Timeline Rows */}
        <div
          className={`border-t pt-6 mb-8 space-y-4 ${
            isPopular ? "border-zinc-800" : "border-zinc-100"
          }`}
        >
          {/* Deliverable Fee Row */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              Deliverable Fee
            </span>
            <div className="text-right">
              <span
                className={`text-2xl sm:text-3xl font-black tracking-tight ${
                  isPopular ? "text-orange-400" : "text-zinc-900"
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                ${price.toLocaleString()}
              </span>
              <span className={`text-[10px] font-medium ml-0.5 ${isPopular ? "text-zinc-500" : "text-zinc-400"}`}>
                /mo
              </span>
              {savings && (
                <span className="block text-[9px] font-bold text-emerald-500 tracking-wide mt-1">
                  Save ${savings.toLocaleString()}/mo
                </span>
              )}
            </div>
          </div>

          {/* Timeline Row */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              Timeline
            </span>
            <span
              className={`text-[12px] font-bold ${
                isPopular ? "text-zinc-300" : "text-zinc-700"
              }`}
            >
              {timeline}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={ctaHref}
          className={`
            group/btn flex items-center justify-center gap-3 w-full py-4 rounded-full
            font-bold text-[10px] uppercase tracking-[0.2em] no-underline transition-all duration-350 active:scale-95
            ${isPopular
              ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20"
              : "border border-zinc-200 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white text-zinc-900"
            }
          `}
        >
          {ctaLabel}
          <ArrowRight
            size={12}
            className="group-hover/btn:translate-x-1.5 transition-transform duration-300"
          />
        </Link>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SECTION LABEL
   ═══════════════════════════════════════════════ */
const SectionLabel = ({ children }) => (
  <div className="flex items-center justify-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500/30" />
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
      {children}
    </span>
    <div className="w-6 h-[2px] bg-orange-500/30" />
  </div>
);

/* ═══════════════════════════════════════════════
   MAIN EXPORT — ServicePricing
   ═══════════════════════════════════════════════ */
export default function ServicePricing({
  serviceName = "This Service",
  serviceSlug = "contact",
  serviceSubtitle = "Individual service",
  serviceDescription = "Expert execution for this specific service.",
  serviceDeliverables = [],
  serviceTimeline = "7 Days",
  serviceCtaLabel = "Get Started",
}) {
  return (
    <section className="relative py-28 bg-[#fafafa] overflow-hidden">
      {/* ── Keyframe Animations ── */}
      <style>{`
        @keyframes pricing-up {
          0%   { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Background Elements ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-orange-500/[0.02] via-transparent to-indigo-500/[0.01] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* ── Section Header ── */}
        <div className="text-center mb-20">
          <SectionLabel>Pricing & Packages</SectionLabel>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-6 text-zinc-900"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Transparent pricing<br />
            <span
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="italic font-light text-zinc-300 lowercase tracking-normal"
            >
              with clear deliverables.
            </span>
          </h2>
          <p className="text-zinc-500 text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto">
            Choose the tier that matches your stage. No long-term lock-ins. Pay per project or bundle for maximum efficiency.
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch max-w-[1200px] mx-auto pt-6">

          {/* Card 1: Individual Service (Dynamic) */}
          <PricingCard
            title={serviceName}
            subtitle={serviceSubtitle}
            description={serviceDescription}
            deliverables={serviceDeliverables}
            price={300}
            timeline={serviceTimeline}
            ctaLabel={serviceCtaLabel}
            ctaHref={`/contact?service=${serviceSlug}`}
            delay="0.1s"
          />

          {/* Card 2: All Amazon Services (Static — Most Popular) */}
          <PricingCard
            title={AMAZON_SUITE.title}
            subtitle={AMAZON_SUITE.subtitle}
            description={AMAZON_SUITE.description}
            deliverables={AMAZON_SUITE.deliverables}
            price={AMAZON_SUITE.price}
            savings={AMAZON_SUITE.savings}
            timeline={AMAZON_SUITE.timeline}
            ctaLabel={AMAZON_SUITE.ctaLabel}
            ctaHref={AMAZON_SUITE.ctaHref}
            isPopular
            delay="0.25s"
          />

          {/* Card 3: Elite Complete — Amazon + Design (Static) */}
          <PricingCard
            title={ELITE_COMPLETE.title}
            subtitle={ELITE_COMPLETE.subtitle}
            description={ELITE_COMPLETE.description}
            deliverables={ELITE_COMPLETE.deliverables}
            price={ELITE_COMPLETE.price}
            savings={ELITE_COMPLETE.savings}
            timeline={ELITE_COMPLETE.timeline}
            ctaLabel={ELITE_COMPLETE.ctaLabel}
            ctaHref={ELITE_COMPLETE.ctaHref}
            delay="0.4s"
          />

        </div>

        {/* ── Custom Rates & Consultation Section ── */}
        <div className="mt-20 flex justify-center">
          <div className="w-full max-w-[750px] bg-white border border-zinc-155 rounded-[32px] p-8 sm:p-12 text-center shadow-[0_10px_35px_rgba(0,0,0,0.02)]">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 block mb-3">
              Custom Requirements?
            </span>
            <h3
              className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Get a Customized Rate
            </h3>
            <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-lg mx-auto mb-8">
              Need to mix match services, scale across multiple ASINs, or looking for special volume pricing? Let's engineer a solution that works for you.
            </p>
            <Link
              href="/contact?type=custom"
              className="group/custom inline-flex items-center gap-3 bg-zinc-950 hover:bg-zinc-800 text-white px-8 py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] no-underline transition-all duration-300"
            >
              Contact for Better Rates
              <ArrowRight size={12} className="group-hover/custom:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
