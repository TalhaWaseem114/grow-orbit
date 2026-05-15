import React from "react";
import { Code2, Palette, ShoppingCart, Mail, Search, BarChart2 } from "lucide-react";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="flex gap-1">
      <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
      <div className="w-4 h-px bg-orange-500 self-center"></div>
    </div>
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-600/80">
      {children}
    </span>
  </div>
);

const deliverables = [
  {
    icon: <Code2 size={22} />,
    type: "SHOPIFY_BUILD",
    title: "Shopify Plus Architecture",
    desc: "Custom theme development with Liquid templating, metafields, and section-based architecture for full editorial control."
  },
  {
    icon: <Palette size={22} />,
    type: "UI_UX_DESIGN",
    title: "UI / UX Design",
    desc: "Complete design system with responsive layouts, typography scale, and component library — from wireframes to pixel-perfect production."
  },
  {
    icon: <ShoppingCart size={22} />,
    type: "CHECKOUT_OPT",
    title: "Checkout Optimization",
    desc: "Conversion-focused checkout with one-click upsells, trust signals, abandoned cart recovery, and payment gateway optimization."
  },
  {
    icon: <Mail size={22} />,
    type: "LIFECYCLE_AUTO",
    title: "Email & SMS Flows",
    desc: "Klaviyo-powered lifecycle automation — welcome series, post-purchase sequences, win-back campaigns, and VIP segmentation."
  },
  {
    icon: <Search size={22} />,
    type: "SEO_ENGINE",
    title: "SEO Architecture",
    desc: "Technical SEO foundation with structured data, sitemap optimization, meta strategy, and page speed engineering for organic discovery."
  },
  {
    icon: <BarChart2 size={22} />,
    type: "ANALYTICS_LAYER",
    title: "Analytics & Tracking",
    desc: "Server-side tracking, conversion API setup, GA4 configuration, and attribution modeling for complete marketing visibility."
  },
];

export default function Deliverables() {
  return (
    <section className="py-20 sm:py-32 bg-[#fafafa] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-xl mb-12 sm:mb-20 text-left">
          <SectionLabel>Deliverables Catalogue</SectionLabel>
          <h2 className="text-[42px] sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] sm:leading-[0.88] mb-6 text-zinc-900">
            WHAT YOU<br />
            <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light lowercase tracking-normal text-zinc-300">GET.</span>
          </h2>
          <p className="text-zinc-500 text-base sm:text-lg font-light leading-relaxed">
            Every engagement produces tangible, production-ready outputs — not decks and strategy docs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {deliverables.map((s, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 border border-zinc-100 hover:border-orange-500/20 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-500 overflow-hidden text-left"
            >
              <div
                className="absolute inset-0 rounded-[24px] sm:rounded-[32px] opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                  backgroundSize: "6px 6px",
                }}
              />

              <div className="flex items-start justify-between mb-5 sm:mb-6 relative z-10">
                <span className="text-orange-500">{s.icon}</span>
                <span className="font-mono text-[8px] font-bold tracking-widest text-zinc-300 uppercase">
                  SYS_TYPE: {s.type}
                </span>
              </div>

              <h3 className="font-black text-base sm:text-lg uppercase tracking-tight text-zinc-900 mb-3 leading-tight relative z-10">
                {s.title}
              </h3>

              <p className="text-zinc-400 text-[13px] sm:text-sm font-light leading-relaxed relative z-10">
                {s.desc}
              </p>

              <div className="absolute bottom-0 left-8 right-8 h-px bg-orange-500/0 group-hover:bg-orange-500/20 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
