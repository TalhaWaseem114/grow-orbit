"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2, ArrowRight, Star, Layout, Layers, Zap,
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
      name: "Starter Website",
      tagline: "Professional brand presence",
      icon: <Layout size={22} />,
      accent: "from-orange-500 to-amber-400",
      features: [
        { label: "Custom Homepage Design", included: true },
        { label: "Up to 5 Core Pages", included: true },
        { label: "Mobile-Responsive Layout", included: true },
        { label: "Basic SEO Setup", included: true },
        { label: "Contact Form Integration", included: true },
        { label: "E-commerce / Shopify Integration", included: false },
        { label: "Blog & Content System", included: false },
        { label: "Ongoing Design Retainer", included: false },
      ],
      cta: "Get Started",
    },
    {
      name: "Growth Website",
      tagline: "Full-stack brand engine",
      icon: <Layers size={22} />,
      accent: "from-rose-500 to-orange-500",
      featured: true,
      features: [
        { label: "Custom Homepage Design", included: true },
        { label: "Up to 12 Core Pages", included: true },
        { label: "Mobile-Responsive Layout", included: true },
        { label: "Advanced SEO & Analytics", included: true },
        { label: "Contact Form + CRM Integration", included: true },
        { label: "E-commerce / Shopify Integration", included: true },
        { label: "Blog & Content System", included: true },
        { label: "Ongoing Design Retainer", included: false },
      ],
      cta: "Book a Call",
    },
    {
      name: "Enterprise Website",
      tagline: "Total digital command center",
      icon: <Zap size={22} />,
      accent: "from-violet-500 to-orange-400",
      features: [
        { label: "Custom Homepage Design", included: true },
        { label: "Unlimited Pages", included: true },
        { label: "Mobile-Responsive Layout", included: true },
        { label: "Advanced SEO & Analytics", included: true },
        { label: "Full CRM & Marketing Automation", included: true },
        { label: "E-commerce / Shopify Integration", included: true },
        { label: "Blog & Content System", included: true },
        { label: "Ongoing Design Retainer", included: true },
      ],
      cta: "Contact Us",
    },
  ];

  return (
    <section className="py-32 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mb-20">
          <SectionLabel>Investment Framework</SectionLabel>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-8 text-zinc-900">
            Choose your<br />
            <span className="italic font-serif text-zinc-300 lowercase tracking-normal">
              website tier.
            </span>
          </h2>
          <p className="text-zinc-500 text-lg font-light leading-relaxed">
            From a polished brand landing page to a full-scale e-commerce engine —
            every tier is designed to convert browsers into buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`group relative rounded-[40px] overflow-hidden transition-all duration-500 hover:shadow-2xl ${
                tier.featured
                  ? "hover:shadow-orange-500/15 ring-1 ring-orange-500/20"
                  : "hover:shadow-zinc-200/80"
              }`}
            >
              <div className={`h-1 w-full bg-gradient-to-r ${tier.accent}`} />

              <div
                className={`h-full border border-t-0 rounded-b-[40px] p-8 lg:p-10 transition-all duration-500 ${
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

                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
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
                    Custom pricing · Project-based
                  </span>
                </div>

                <div className="space-y-3 mb-10">
                  {tier.features.map((f, j) => (
                    <div
                      key={j}
                      className={`flex items-center gap-3 py-1 ${
                        !f.included ? "opacity-40" : ""
                      }`}
                    >
                      <CheckCircle2
                        size={14}
                        className={
                          f.included
                            ? "text-orange-500 shrink-0"
                            : tier.featured
                            ? "text-zinc-700 shrink-0"
                            : "text-zinc-300 shrink-0"
                        }
                      />
                      <span
                        className={`text-[13px] font-light ${
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
                  className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 no-underline ${
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

        <p className="text-center text-[11px] text-zinc-400 font-light mt-10">
          All tiers include responsive design, launch support, and 30-day post-launch warranty.{" "}
          <Link href="/contact" className="text-orange-500 font-bold hover:underline">
            Need enterprise-level build? →
          </Link>
        </p>
      </div>
    </section>
  );
}
