"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, ChevronRight, Star, Terminal,
  ArrowUpRight, Palette, BookMarked, Store, Image as ImageIcon,
  PenTool, MousePointerClick, ListChecks, Layers, Eye,
  Sparkles, Wand2, Monitor, Zap, Frame, Layout, MousePointer2,
  Focus
} from "lucide-react";
import gsap from "gsap";
import HeroButton from "@/components/ui/HeroButton";

/* ─────────────────────────────────────────────
   SHARED
───────────────────────────────────────────── */
const SectionLabel = ({ children, light = false }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500" />
    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.4em] ${light ? "text-orange-400" : "text-orange-500/80"}`}>
      {children}
    </span>
  </div>
);

/* ═══════════════════════════════════════════════
   01 — HERO
   ═══════════════════════════════════════════════ */
function DesignHero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    // Elegant floating animation
    gsap.to(canvasRef.current, {
      y: -12,
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-zinc-950">
      <style>{`
        @keyframes scan-design {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; } 90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes shimmer-btn {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      {/* Background System */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.04] to-transparent animate-[scan-design_10s_linear_infinite]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="design-grid-dark" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill="none" stroke="#fff" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#design-grid-dark)" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(249,115,22,0.08),transparent_60%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left: Branding & Action */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
              <div className="w-6 h-[1px] bg-orange-500/50" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
                Design & Creative Studio
              </span>
            </div>

            <h1
              className="text-6xl md:text-7xl lg:text-[85px] font-black tracking-tighter leading-[0.85] mb-8 text-white uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Design &<br />
              <span className="text-orange-500">Creative</span><br />
              <span className="italic font-light lowercase tracking-tight text-zinc-500" style={{ fontFamily: "'Playfair Display', serif" }}>
                studio.
              </span>
            </h1>

            <div className="flex gap-6 mb-10">
              <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50" />
              <div>
                <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-xl mb-6">
                  Buyers don't read first — they see. We engineer every pixel of your A+ content and imagery to stop the scroll and secure the sale.
                </p>
                <div className="flex flex-wrap gap-6 font-mono text-[9px] text-zinc-600 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Creative Pipeline Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={10} className="text-orange-500/50" />
                    <span>Premium Conversion Focus</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 mb-12">
              <Link href="/contact" className="group relative overflow-hidden flex items-center justify-center gap-3 bg-gradient-to-r from-orange-600 to-orange-400 hover:scale-[1.02] active:scale-95 transition-all duration-300 text-white font-black text-[11px] uppercase tracking-[0.25em] px-10 py-4 rounded-full no-underline shadow-[0_10px_40px_rgba(249,115,22,0.4)] w-full sm:w-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer-btn_2s_linear_infinite]" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Get Free Design Audit
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link href="/portfolio" className="group flex items-center justify-center sm:justify-start gap-3 text-zinc-500 hover:text-white font-bold text-[11px] uppercase tracking-widest px-2 py-4 transition-colors no-underline w-full sm:w-auto">
                View Showcase <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Bottom Stats */}
            <div className="flex flex-wrap items-center gap-10 pt-10 border-t border-white/5">
              {[
                { label: "Projects Delivered", val: "2,400+" },
                { label: "Avg CTR Increase", val: "+42%" },
                { label: "Brands Styled", val: "80+" },
              ].map((t, i) => (
                <div key={i}>
                  <p className="text-4xl font-black tracking-tighter text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>{t.val}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{t.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Creative Pipeline Visual */}
          <div className="lg:col-span-5 relative hidden lg:block self-start lg:mt-[60px]" ref={canvasRef}>
            {/* Floating Palette Badge */}
            <div className="absolute -top-4 -left-6 bg-zinc-900 rounded-[20px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-30 border border-white/5">
              <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                <Palette size={20} />
              </div>
            </div>

            {/* The Design Console */}
            <div className="bg-zinc-900/90 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden">
              <div className="px-6 py-5 border-b border-white/5 flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                </div>
                <div className="flex-1 bg-black/30 rounded-lg px-4 py-1.5 flex items-center gap-2 border border-white/5">
                  <Focus size={11} className="text-zinc-500" />
                  <span className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase font-bold">creative_render.engine</span>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Active Assets List */}
                <div className="space-y-2">
                  <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-3">Asset Processing Stack</p>
                  {[
                    { icon: <ImageIcon size={14} />, label: "3D Product Renders", status: "Rendered" },
                    { icon: <Layout size={14} />, label: "A+ Premium Layouts", status: "Live" },
                    { icon: <MousePointer2 size={14} />, label: "CTR Optimized Main Img", status: "Success" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 border-l-2 border-l-orange-500/50">
                      <div className="text-zinc-500">{s.icon}</div>
                      <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wide">{s.label}</span>
                      <span className="ml-auto text-[8px] font-mono text-emerald-500 uppercase font-black">{s.status}</span>
                    </div>
                  ))}
                </div>

                {/* Engagement Visualization */}
                <div className="bg-black/40 rounded-2xl p-5 border border-white/5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Post-Design CTR Lift</span>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-orange-500 animate-ping" />
                      <span className="text-[10px] font-black text-white">+42.8%</span>
                    </div>
                  </div>
                  <div className="flex items-end gap-2 h-20">
                    {[20, 35, 25, 45, 30, 60, 50, 80, 70, 100].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t-sm transition-all duration-700 ${i > 7 ? 'bg-orange-500' : 'bg-zinc-800'}`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-3">
                    <span className="text-[7px] text-zinc-600 font-mono uppercase">Raw Asset</span>
                    <span className="text-[7px] text-orange-500 font-mono uppercase font-bold">Orbit Optimized</span>
                  </div>
                </div>

                <div className="bg-orange-500/5 border border-orange-500/10 rounded-xl px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={12} className="text-orange-500" />
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">Ready for Brand Launch</span>
                  </div>
                  <span className="text-[10px] font-black text-orange-400 uppercase">Studio</span>
                </div>
              </div>
            </div>

            {/* Subtle floating shadow for 3D effect */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-orange-500/10 blur-[60px] rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   02 — SERVICE CARDS GRID
   ═══════════════════════════════════════════════ */
function ServiceCards() {
  const services = [
    {
      icon: <Palette size={22} />,
      title: "Brand Guidelines",
      desc: "Complete visual identity systems — logo usage, color palettes, typography, and brand asset rules that ensure consistency across every touchpoint.",
      href: "/service/design/brand-guidelines",
      features: ["Logo system & usage rules", "Color palette definition", "Typography hierarchy", "Asset library"],
      tag: "Identity",
    },
    {
      icon: <BookMarked size={22} />,
      title: "Brand Story",
      desc: "Compelling Amazon Brand Story modules that build emotional connection, communicate your mission, and drive purchase intent below the fold.",
      href: "/service/design/brand-story",
      features: ["Narrative positioning", "Visual storytelling", "Module design", "Mobile optimization"],
      tag: "Narrative",
    },
    {
      icon: <Store size={22} />,
      title: "Brand Store",
      desc: "Custom Amazon storefronts designed as immersive brand destinations — with strategic page architecture to guide shoppers toward conversion.",
      href: "/service/design/brand-store",
      features: ["Multi-page architecture", "Hero & lifestyle imagery", "Product categorization", "Conversion flow design"],
      tag: "Storefront",
    },
    {
      icon: <ImageIcon size={22} />,
      title: "Listing Images",
      desc: "Photorealistic 3D renders, lifestyle photography, and infographic systems designed to stop the scroll and communicate value in seconds.",
      href: "/service/design/listing-image-systems",
      features: ["3D product rendering", "Lifestyle compositions", "Infographic slides", "Comparison charts"],
      tag: "Visuals",
    },
    {
      icon: <PenTool size={22} />,
      title: "Enhanced Brand Content A+",
      desc: "Premium A+ Content pages with custom modules, brand storytelling, and conversion-optimized layouts that increase average order value.",
      href: "/service/design/enhanced-brand-content",
      features: ["Premium A+ modules", "Cross-sell integration", "Comparison tables", "Brand story integration"],
      tag: "A+ Content",
    },
    {
      icon: <MousePointerClick size={22} />,
      title: "Main Image CTR",
      desc: "Click-through rate optimization for your main product image — the single most important visual on Amazon. Engineered for scroll-stopping impact.",
      href: "/service/design/main-image-ctr",
      features: ["CTR-optimized design", "A/B test variants", "Angle & lighting study", "Competitor differentiation"],
      tag: "CTR",
    },
    {
      icon: <ListChecks size={22} />,
      title: "Full Listing Optimization",
      desc: "Complete visual and copy overhaul — combining SEO copywriting, image systems, A+ content, and brand story into one cohesive listing experience.",
      href: "/service/design/full-listing-optimization",
      features: ["Full image suite", "SEO copywriting", "A+ Content design", "Brand story setup"],
      tag: "Complete",
    },
  ];

  return (
    <section id="services" className="py-32 bg-white relative scroll-mt-24">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Creative Services</SectionLabel>
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Visuals that<br />
              <span
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="italic font-light text-zinc-300 lowercase tracking-normal"
              >
                sell.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            Seven creative services — each designed to maximize visual impact and drive conversion on the world's largest marketplace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Link
              key={i}
              href={s.href}
              className="group relative bg-[#fafafa] hover:bg-white rounded-[32px] p-8 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-200/50 no-underline flex flex-col overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-orange-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                  {s.icon}
                </div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-orange-500/60 group-hover:text-orange-500 transition-colors">
                  {s.tag}
                </span>
              </div>

              <h3
                className="text-lg font-black uppercase tracking-tight text-zinc-900 mb-3 group-hover:text-orange-500 transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {s.title}
              </h3>

              <p className="text-zinc-500 text-[13px] font-light leading-relaxed mb-6 flex-1">
                {s.desc}
              </p>

              <div className="space-y-2 mb-6">
                {s.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <CheckCircle2 size={12} className="text-orange-500/60 shrink-0" />
                    <span className="text-[11px] text-zinc-400 font-light">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-orange-500 font-bold text-[10px] uppercase tracking-widest mt-auto pt-5 border-t border-zinc-100 group-hover:gap-4 transition-all">
                View Service <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}

          {/* Portfolio CTA Card */}
          <div className="group relative bg-zinc-950 rounded-[32px] p-8 overflow-hidden flex flex-col justify-between min-h-[300px]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-[80px] group-hover:bg-orange-500/20 transition-all duration-700 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-500/10 rounded-full blur-[60px] pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-500">View_Portfolio</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                See Our<br />Work
              </h3>
              <p className="text-zinc-500 text-sm font-light leading-relaxed mb-8">
                Browse 2,400+ projects — from 3D renders and A+ pages to full brand identity systems.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="relative z-10 w-full flex items-center justify-center gap-3 bg-orange-500 text-white py-4 rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 shadow-[0_8px_30px_rgba(249,115,22,0.3)] no-underline"
            >
              Explore Portfolio <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   03 — PRICING PACKAGES
   ═══════════════════════════════════════════════ */
function PricingPackages() {
  const packages = [
    {
      name: "Single Asset",
      tag: "Per Project",
      desc: "Need one specific deliverable? Choose any individual creative service — from a main image redesign to a full A+ page.",
      services: [
        "Any single service from the list",
        "Dedicated designer assigned",
        "2 rounds of revisions included",
        "Source files delivered",
        "Amazon-compliant output",
      ],
      delivery: "5–7 Days",
      ideal: "Quick fixes, single ASIN",
    },
    {
      name: "Visual Suite",
      tag: "Most Popular",
      desc: "A complete visual overhaul for one product listing — images, A+ content, and main image CTR optimization bundled together.",
      services: [
        "7 listing images (3D + lifestyle)",
        "Main Image CTR optimization",
        "Premium A+ Content page",
        "Brand Story module",
        "3 rounds of revisions",
        "Source files + style guide",
        "Mobile-first responsive design",
      ],
      delivery: "10–14 Days",
      ideal: "Per listing, full visual refresh",
      popular: true,
    },
    {
      name: "Brand Identity",
      tag: "Complete System",
      desc: "Full brand visual identity — from guidelines to storefront — everything your Amazon brand needs to look, feel, and convert like a premium brand.",
      services: [
        "Everything in Visual Suite",
        "Brand Guidelines document",
        "Amazon Brand Store (3+ pages)",
        "Brand Story integration",
        "Cross-ASIN visual consistency",
        "Storefront hero banners",
        "Product photography direction",
        "Ongoing creative retainer option",
      ],
      delivery: "3–4 Weeks",
      ideal: "Full brand, multi-ASIN",
    },
  ];

  return (
    <section id="packages" className="py-32 bg-[#fafafa] relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Creative Packages</SectionLabel>
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Choose your<br />
              <span
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="italic font-light text-zinc-300 lowercase tracking-normal"
              >
                creative tier.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            From a single asset to a complete brand identity system — pick the scope that matches your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <div key={i} className="relative rounded-[40px] overflow-hidden flex flex-col">
              {pkg.popular && <div className="h-1 w-full bg-linear-to-r from-orange-500 to-amber-400 shrink-0" />}
              <div className={`flex-1 border p-8 lg:p-10 flex flex-col transition-all duration-500 ${
                pkg.popular
                  ? "bg-zinc-950 border-t-0 border-zinc-800 rounded-b-[40px] hover:border-orange-500/30"
                  : "bg-white border-zinc-100 rounded-[40px] hover:border-orange-500/20 hover:shadow-2xl hover:shadow-zinc-200/60"
              }`}>
                {pkg.popular && (
                  <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 px-3 py-1.5 rounded-full mb-6 self-start">
                    <Star size={9} className="text-orange-400 fill-orange-400" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-400">Most Popular</span>
                  </div>
                )}
                <span className={`text-[9px] font-mono font-bold uppercase tracking-[0.4em] mb-2 block ${pkg.popular ? "text-orange-400" : "text-orange-500"}`}>{pkg.tag}</span>
                <h3 className={`text-3xl font-black tracking-tighter mb-3 ${pkg.popular ? "text-white" : "text-zinc-900"}`} style={{ fontFamily: "'Montserrat', sans-serif" }}>{pkg.name}</h3>
                <p className={`text-sm font-light leading-relaxed mb-8 ${pkg.popular ? "text-zinc-400" : "text-zinc-500"}`}>{pkg.desc}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.services.map((s, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 size={14} className="text-orange-500 shrink-0 mt-0.5" />
                      <span className={`text-[13px] font-light ${pkg.popular ? "text-zinc-300" : "text-zinc-600"}`}>{s}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <div className={`flex items-center justify-between py-3 border-t ${pkg.popular ? "border-white/5" : "border-zinc-100"}`}>
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${pkg.popular ? "text-zinc-600" : "text-zinc-400"}`}>Ideal For</span>
                    <span className={`text-[11px] font-bold ${pkg.popular ? "text-zinc-300" : "text-zinc-700"}`}>{pkg.ideal}</span>
                  </div>
                  <div className={`flex items-center justify-between py-3 border-t ${pkg.popular ? "border-white/5" : "border-zinc-100"}`}>
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${pkg.popular ? "text-zinc-600" : "text-zinc-400"}`}>Timeline</span>
                    <span className={`text-[11px] font-bold ${pkg.popular ? "text-zinc-300" : "text-zinc-700"}`}>{pkg.delivery}</span>
                  </div>
                  <div className={`flex items-center justify-between py-3 border-t rounded-xl px-3 -mx-3 ${pkg.popular ? "border-white/5 bg-orange-500/5" : "border-zinc-50 bg-zinc-50/50"}`}>
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${pkg.popular ? "text-zinc-600" : "text-zinc-400"}`}>Pricing</span>
                    <span className="text-[11px] font-bold text-orange-500">Contact for Quote</span>
                  </div>
                  <Link
                    href="/contact"
                    className={`group/btn w-full flex items-center justify-center gap-3 font-bold text-[11px] uppercase tracking-widest py-4 rounded-2xl no-underline transition-all duration-300 ${
                      pkg.popular
                        ? "bg-orange-500 hover:bg-white hover:text-black text-white shadow-[0_8px_30px_rgba(249,115,22,0.3)]"
                        : "bg-black hover:bg-orange-500 text-white"
                    }`}
                  >
                    Get Started
                    <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   04 — WHY OUR DESIGN (trust section)
   ═══════════════════════════════════════════════ */
function WhyOurDesign() {
  const reasons = [
    { icon: <Eye size={20} />,        title: "Conversion-First",     desc: "Every design decision is made to increase click-through rate, session duration, and conversions — not just look pretty." },
    { icon: <Sparkles size={20} />,   title: "Premium Quality",      desc: "Photorealistic 3D rendering, custom illustrations, and editorial-grade layouts that make your brand look like a category leader." },
    { icon: <Monitor size={20} />,    title: "Amazon-Native",        desc: "We design within Amazon's exact specs and constraints. No guesswork, no rejected uploads, no pixel compromises." },
    { icon: <Wand2 size={20} />,      title: "Brand Consistency",    desc: "Every asset we create ties into a cohesive visual system — so your brand looks unified across listings, A+, store, and ads." },
  ];

  return (
    <section className="py-32 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-500/8 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="lg:sticky lg:top-32">
            <SectionLabel light>Why Our Design</SectionLabel>
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-8"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Designed for<br />
              <span
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="italic font-light text-zinc-500 lowercase tracking-normal"
              >
                the algorithm.
              </span>
            </h2>
            <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-lg mb-12">
              Amazon rewards listings that convert. Great visuals don't just attract attention — they signal quality to buyers and signal performance to the algorithm. Every asset we create is engineered for both.
            </p>
            <Link href="/portfolio" className="group flex items-center gap-3 text-orange-400 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
              See our work <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <div key={i} className="group bg-white/4 hover:bg-white/8 border border-white/6 hover:border-orange-500/30 rounded-[28px] p-7 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-5 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                  {r.icon}
                </div>
                <h3 className="text-[13px] font-black uppercase tracking-[0.12em] text-white mb-2 group-hover:text-orange-400 transition-colors">{r.title}</h3>
                <p className="text-zinc-500 text-xs font-light leading-relaxed group-hover:text-zinc-400 transition-colors">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   05 — HOW WE WORK (process overview)
   ═══════════════════════════════════════════════ */
function DesignProcess() {
  const steps = [
    { num: "01", title: "Creative Brief",     desc: "We study your brand, competitors, and target audience. You fill out a simple brief — we handle the rest.",  icon: <Frame size={18} /> },
    { num: "02", title: "Concept & Design",   desc: "Our design team creates initial concepts. You get visual mockups for review before any final production.", icon: <Wand2 size={18} /> },
    { num: "03", title: "Revisions & Polish",  desc: "Unlimited revisions within scope. We refine every detail until the design matches your brand perfectly.", icon: <Sparkles size={18} /> },
    { num: "04", title: "Delivery & Upload",   desc: "Final files delivered in all required formats. We can upload directly to Seller Central or hand off to your team.", icon: <Zap size={18} /> },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Our Process</SectionLabel>
            <h2
              className="text-5xl lg:text-7xl font-black tracking-tighter text-zinc-900 leading-[0.9] uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              How we{" "}
              <span className="text-zinc-300 italic font-light lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>design.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            From brief to delivery — a streamlined creative process that respects your time and exceeds your expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-100 border border-zinc-100 rounded-[40px] shadow-2xl shadow-zinc-200/50 overflow-hidden">
          {steps.map((item, i) => (
            <div
              key={i}
              style={{ zIndex: steps.length - i }}
              className={`group relative bg-white p-8 hover:bg-zinc-50 transition-all duration-500 h-full flex flex-col ${
                i === 0 ? "rounded-t-[40px] lg:rounded-l-[40px] lg:rounded-tr-none" :
                i === steps.length - 1 ? "rounded-b-[40px] lg:rounded-r-[40px] lg:rounded-bl-none" : ""
              }`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-orange-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-center mb-8">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">{item.icon}</div>
                <div className="text-[10px] font-mono font-black text-zinc-300 group-hover:text-orange-500 transition-colors">{item.num}</div>
              </div>
              <div className="grow">
                <h3 className="text-[13px] font-black uppercase tracking-[0.15em] text-zinc-900 mb-3 group-hover:text-orange-500 transition-colors">{item.title}</h3>
                <p className="text-[13px] text-zinc-500 leading-relaxed font-light">{item.desc}</p>
              </div>
              {i !== steps.length - 1 && (
                <>
                  <div className="absolute top-1/2 -right-4 w-8 h-px bg-zinc-100 z-40 hidden lg:block group-hover:bg-orange-500/30 transition-colors" />
                  <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-white border border-zinc-100 rounded-full z-50 hidden lg:flex items-center justify-center group-hover:border-orange-500 group-hover:scale-110 transition-all duration-500 shadow-sm">
                    <ChevronRight size={12} className="text-zinc-300 group-hover:text-orange-500" />
                  </div>
                </>
              )}
              <div className="mt-8 h-px w-8 bg-zinc-100 group-hover:w-full group-hover:bg-orange-500 transition-all duration-700" />
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between p-8 bg-[#fafafa] rounded-[32px] border border-zinc-100">
          <div className="flex items-center gap-4 text-zinc-400">
            <Terminal size={16} className="text-orange-500/60" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Creative_Pipeline_01-04</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest italic whitespace-nowrap">Avg Turnaround: 7 Business Days</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   06 — CTA
   ═══════════════════════════════════════════════ */
function DesignCTA() {
  return (
    <section className="py-32 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
        <span className="text-[180px] lg:text-[300px] font-black tracking-tighter text-zinc-100/60" style={{ fontFamily: "'Playfair Display', serif" }}>Design</span>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-12 relative z-10 text-center">
        <SectionLabel>Start Creating</SectionLabel>
        <h2
          className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-8 text-zinc-900"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Your brand deserves<br />
          <span
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="italic font-light text-zinc-300 lowercase tracking-normal"
          >
            better visuals.
          </span>
        </h2>
        <p className="text-zinc-500 text-lg font-light leading-relaxed mb-12 max-w-xl mx-auto">
          Book a free creative consultation. We'll review your current listings, identify the biggest visual opportunities, and show you exactly what premium design can do for your conversion rate.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            href="/contact"
            className="inline-flex items-center gap-4 px-10 py-5 bg-zinc-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-orange-500 transition-all duration-500 shadow-xl no-underline"
          >
            Book Free Design Audit
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 text-zinc-400 hover:text-zinc-900 font-bold text-[11px] uppercase tracking-widest transition-colors no-underline"
          >
            View Portfolio <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   07 — FOOTER NAV
   ═══════════════════════════════════════════════ */
function FooterNav() {
  return (
    <footer className="py-24 bg-white border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Amazon Services */}
          <div className="text-center md:text-left w-full md:w-1/3">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Also Explore</p>
            <Link href="/service/amazon-services" className="group inline-block no-underline text-zinc-900">
              <h4 className="text-2xl md:text-3xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start uppercase">
                <ArrowRight className="mr-3 group-hover:-translate-x-3 transition-transform rotate-180 size-6 shrink-0" />
                Amazon Services
              </h4>
            </Link>
          </div>

          {/* All Services */}
          <div className="text-center w-full md:w-1/3">
            <Link href="/service" className="group inline-flex flex-col items-center no-underline text-zinc-400 hover:text-zinc-900 transition-colors">
              <div className="w-10 h-10 rounded-full border border-zinc-100 flex items-center justify-center mb-3 group-hover:border-orange-500 group-hover:text-orange-500 transition-all">
                <ArrowRight className="-rotate-90" size={16} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">All Services</span>
            </Link>
          </div>

          {/* Portfolio */}
          <div className="text-center md:text-right w-full md:w-1/3">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Our Work</p>
            <Link href="/portfolio" className="group inline-block no-underline text-zinc-900">
              <h4 className="text-2xl md:text-3xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end uppercase">
                Portfolio
                <ArrowRight className="ml-3 group-hover:translate-x-3 transition-transform size-6 shrink-0" />
              </h4>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE EXPORT
   ═══════════════════════════════════════════════ */
export default function DesignCreativePage() {
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <DesignHero />
      <ServiceCards />
      <PricingPackages />
      <WhyOurDesign />
      <DesignProcess />
      <DesignCTA />
      <FooterNav />
    </div>
  );
}
