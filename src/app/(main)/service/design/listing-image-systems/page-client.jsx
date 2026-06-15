"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Zap, Star, StarHalf,
  Award, Package, ChevronRight, Plus, Minus, Terminal, FileText,
  Layers, Paintbrush, Activity, Eye, Target, ImageIcon,
  Camera, BarChart3, Sparkles, Users, Maximize2, Monitor,
  LayoutGrid, Aperture, Frame, ScanLine, Boxes,
  ShoppingBag, MousePointer2, Fingerprint
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroButton from "@/components/ui/HeroButton";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   SHARED
───────────────────────────────────────────── */
const SectionLabel = ({ children, light = false }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500" />
    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.4em] ${
      light ? "text-orange-400" : "text-orange-500/80"
    }`}>
      {children}
    </span>
  </div>
);

const CheckItem = ({ children, light = false }) => (
  <div className="flex items-start gap-3">
    <CheckCircle2 size={15} className="text-orange-500 shrink-0 mt-0.5" />
    <span className={`text-[14px] font-light leading-snug ${light ? "text-zinc-300" : "text-zinc-600"}`}>{children}</span>
  </div>
);

const SectionDots = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.1]"
      style={{
        backgroundImage: "radial-gradient(circle, #fff 1.2px, transparent 1.2px)",
        backgroundSize: "45px 45px",
        WebkitMaskImage: "radial-gradient(circle at 15% 20%, black, transparent 45%), radial-gradient(circle at 85% 25%, black, transparent 45%), radial-gradient(circle at 50% 50%, black, transparent 45%), radial-gradient(circle at 20% 80%, black, transparent 45%), radial-gradient(circle at 80% 85%, black, transparent 45%)",
        maskImage: "radial-gradient(circle at 15% 20%, black, transparent 45%), radial-gradient(circle at 85% 25%, black, transparent 45%), radial-gradient(circle at 50% 50%, black, transparent 45%), radial-gradient(circle at 20% 80%, black, transparent 45%), radial-gradient(circle at 80% 85%, black, transparent 45%)"
      }}
    />
  </div>
);

/* ═══════════════════════════════════════════════
   01 — HERO
   ═══════════════════════════════════════════════ */
function ListingImagesHero() {
  const floatRef = useRef(null);

  useEffect(() => {
    if (!floatRef.current) return;
    gsap.to(floatRef.current, {
      y: -14, duration: 4.5, repeat: -1, yoyo: true, ease: "power1.inOut",
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#fafafa]">
      <style>{`
        @keyframes scan-img {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; } 90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent animate-[scan-img_11s_linear_infinite]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="img-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
            <circle cx="60" cy="60" r="0.5" fill="currentColor" opacity="0.5" />
            <path d="M120 0 L120 120 M0 120 L120 120" stroke="currentColor" strokeWidth="0.2" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#img-grid)" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_30%,rgba(249,115,22,0.07),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fafafa] to-[#fafafa]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

          {/* ── Left ── */}
          <div className="lg:col-span-7 relative">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
                  <div className="w-4 h-[1px] bg-orange-500 self-center" />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
                  Design &amp; Creative Services
                </span>
              </div>

              <h1
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[85px] font-black tracking-tighter leading-[0.9] md:leading-[0.85] mb-8 md:mb-10 text-zinc-900 uppercase text-left"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                High-Impact<br />
                <span className="text-orange-500">Listing</span><br />
                <span className="italic font-light lowercase tracking-tight text-zinc-300" style={{ fontFamily: "'Playfair Display', serif" }}>
                  images.
                </span>
              </h1>

              <div className="flex gap-6 mb-12">
                <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50" />
                <div>
                  <p className="text-lg md:text-[22px] text-zinc-500 font-light leading-relaxed max-w-xl mb-6">
                    On Amazon, you have 1.3 seconds to stop a scroll. Your listing images are the single highest-leverage creative investment you can make — and we design them to convert.
                  </p>
                  <div className="flex flex-wrap gap-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Amazon TOS: Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Camera size={10} className="text-orange-500/50" />
                      <span>7 Images: Fully Optimized</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  "Stop the scroll with a dominant hero shot",
                  "Showcase benefits with infographic images",
                  "Build trust with lifestyle & comparison shots",
                  "Designed for desktop and mobile search results",
                ].map((item, i) => <CheckItem key={i}>{item}</CheckItem>)}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mb-12">
                <HeroButton href="/contact">
                  Elevate My Images
                </HeroButton>
                <a href="#packages" className="group flex items-center justify-center sm:justify-start gap-3 text-zinc-500 hover:text-zinc-900 font-bold text-[11px] uppercase tracking-widest px-2 py-4 transition-colors no-underline">
                  View Packages
                  <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {[
                  { icon: <ShieldCheck size={11} />, label: "Amazon TOS Compliant"     },
                  { icon: <Camera size={11} />,      label: "Up to 7 Listing Images"   },
                  { icon: <Zap size={11} />,         label: "7–10 Day Turnaround"      },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2.5 transition-colors hover:border-orange-500/20">
                    <span className="text-orange-500">{b.icon}</span>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-zinc-600">{b.label}</span>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className="hidden sm:flex sm:items-center gap-8 mt-10 pt-10 border-t border-zinc-100">
                {[
                  { label: "Listings Redesigned",  val: "1,200+" },
                  { label: "Avg CVR Improvement",  val: "+28%"   },
                  { label: "Brands Served",        val: "80+"    },
                  { label: "Scroll Decision",      val: "1.3s"   },
                ].map((t, i) => (
                  <div key={i} className="text-left">
                    <p className="text-xl sm:text-2xl font-black tracking-tighter text-zinc-900 leading-none mb-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>{t.val}</p>
                    <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-zinc-400 leading-tight">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Amazon listing image mockup ── */}
          <div className="lg:col-span-5 relative block mt-16 lg:mt-[70px] self-start" ref={floatRef}>
            <div className="absolute -top-4 -right-4 bg-white rounded-[20px] p-4 border border-zinc-100 z-30 flex gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20"><Camera size={16} /></div>
              <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white shadow-lg shadow-zinc-900/20"><Sparkles size={16} /></div>
            </div>
            <div className="absolute -left-4 -bottom-10 bg-zinc-900 rounded-2xl px-5 py-4 z-30 border border-white/5 min-w-[160px]">
              <p className="text-[7px] font-mono font-bold uppercase tracking-[0.25em] text-zinc-500 mb-1">Conversion Lift</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[8px] font-black text-orange-400 uppercase">AVG</span>
                <span className="text-2xl font-black text-white leading-none">+28%</span>
              </div>
            </div>

            {/* Amazon product listing mockup */}
            <div className="bg-white rounded-[28px] border border-zinc-100 overflow-hidden" role="img" aria-label="Amazon Product Listing Mockup showcasing high-impact optimized images and conversion elements">
              <div className="px-5 py-4 border-b border-zinc-100 flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-400" />
                  <div className="w-3 h-3 rounded-full bg-zinc-200" />
                  <div className="w-3 h-3 rounded-full bg-zinc-200" />
                </div>
                <div className="flex-1 bg-zinc-50 rounded-lg px-4 py-2 flex items-center gap-2">
                  <ShieldCheck size={11} className="text-zinc-300" />
                  <span className="text-[11px] text-zinc-400 font-medium">amazon.com · Product Listing</span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                {/* Main image + thumbnail strip */}
                <div className="grid grid-cols-5 gap-2">
                  {/* Thumbnail strip */}
                  <div className="col-span-1 flex flex-col gap-1.5">
                    {[
                      { src: "/assets/portfolio/lumina bites 1/main image.png", active: true  },
                      { src: "/assets/portfolio/lumina bites 1/2.png", active: false },
                      { src: "/assets/portfolio/lumina bites 1/3.png", active: false },
                      { src: "/assets/portfolio/lumina bites 1/4.png", active: false },
                    ].map((thumb, i) => (
                      <div key={i} className={`aspect-square rounded-lg border-2 ${thumb.active ? "border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.3)]" : "border-transparent"} overflow-hidden bg-white transition-all duration-300`}>
                        <img src={thumb.src} alt="Amazon Product Thumbnail Detail View" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all" />
                      </div>
                    ))}
                  </div>
                  {/* Main image */}
                  <div className="col-span-4 aspect-square rounded-xl bg-white relative overflow-hidden border border-zinc-50 group/hero">
                    <img
                      src="/assets/portfolio/lumina bites 1/main image.png"
                      alt="High-Impact Amazon Listing Main Image Optimization Showcase"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover/hero:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 group-hover/hero:opacity-20 transition-opacity" />
                    {/* Top-left badge */}
                    <div className="absolute top-2 left-2 bg-orange-500 text-white text-[7px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-lg shadow-orange-500/20">#1 Best Seller</div>
                    {/* Image counter */}
                    <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm text-zinc-600 text-[8px] font-bold px-2 py-0.5 rounded-full border border-zinc-100">1 / 7</div>
                  </div>
                </div>

                {/* Rating row */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-2.5 h-2.5 rounded-sm ${i < 4 ? "bg-orange-400" : "bg-zinc-200"}`} />
                    ))}
                  </div>
                  <span className="text-[9px] font-bold text-orange-500">4.7</span>
                  <span className="text-[9px] text-zinc-400">(2,847 ratings)</span>
                </div>

                {/* Image type labels */}
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { label: "Hero Shot",    color: "bg-orange-50 border-orange-200 text-orange-600" },
                    { label: "Lifestyle",    color: "bg-zinc-50 border-zinc-200 text-zinc-500"       },
                    { label: "Infographic",  color: "bg-orange-50 border-orange-200 text-orange-600" },
                    { label: "3D Render",    color: "bg-zinc-50 border-zinc-200 text-zinc-500"       },
                  ].map((t, i) => (
                    <div key={i} className={`px-2 py-1.5 rounded-lg border text-[7px] font-black uppercase tracking-wider text-center ${t.color}`}>{t.label}</div>
                  ))}
                </div>

                {/* Status */}
                <div className="bg-zinc-900 rounded-xl px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">All 7 images optimized</span>
                  </div>
                  <span className="text-[10px] font-black text-orange-400 uppercase">Live</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-[120px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   02 — METRICS STRIP
   ═══════════════════════════════════════════════ */
function MetricsStrip() {
  const stats = [
    { v: "1,200+", l: "Listings Redesigned",  i: <Camera size={14} /> },
    { v: "+28%",   l: "Avg CVR Lift",          i: <TrendingUp size={14} /> },
    { v: "80+",    l: "Brands Served",         i: <Users size={14} /> },
    { v: "7",      l: "Image Slots Optimized", i: <Layers size={14} /> },
  ];

  return (
    <div className="bg-zinc-950 py-12 lg:py-20 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-6 lg:gap-8">
          {stats.map((s, i) => (
            <div key={i} className="group relative flex flex-col border-l border-white/10 pl-6 sm:pl-8 transition-all duration-500 hover:border-orange-500/40">
              <div className="absolute top-0 left-[-1.5px] w-[3px] h-[3px] bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-orange-500/70 mb-3 group-hover:text-orange-400 transition-colors">{s.i}</div>
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tighter">{s.v}</span>
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mt-1">[ {s.l} ]</span>
            </div>
          ))}
          <Link href="/contact" className="group relative flex flex-col items-center text-center lg:items-start lg:text-left border-t lg:border-t-0 lg:border-l border-white/10 lg:border-orange-500/20 px-6 sm:px-8 py-8 lg:py-0 transition-all duration-500 hover:bg-orange-500/[0.02] no-underline col-span-2 lg:col-span-1 mt-8 lg:mt-0">
            <div className="relative w-full flex items-center justify-center lg:justify-start mb-2">
              <span className="text-lg font-black text-white uppercase tracking-tighter leading-tight group-hover:text-orange-400 transition-colors">Get Optimized Images</span>
              <ArrowRight size={16} className="absolute right-0 lg:static lg:ml-3 text-orange-500 group-hover:translate-x-2 transition-transform shrink-0" />
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">IMAGE_SLOTS_OPEN</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   03 — NO SPACE FOR BORING
   ═══════════════════════════════════════════════ */
function NoBoring() {
  const reasons = [
    { icon: <TrendingUp size={22} />,  stat: "+28%",    statLabel: "avg CVR lift",       title: "Dominant Hero Shot",         desc: "+28% CVR = 28% more sales on the same traffic. Your main image is the single biggest lever for conversion — we make it impossible to scroll past." },
    { icon: <Sparkles size={22} />,    stat: "7",       statLabel: "optimized slots",    title: "Infographic Images",          desc: "7 slots = 7 chances to close the sale. Amazon shoppers scan images, not bullet points. We pack your benefits into visual infographics that do the selling for you." },
    { icon: <Eye size={22} />,         stat: "+65%",    statLabel: "engagement rate",    title: "Lifestyle Photography",       desc: "+65% engagement = shoppers spending more time with your listing. Lifestyle images create emotional desire that drives add-to-cart faster than any text." },
    { icon: <BarChart3 size={22} />,   stat: "1.3s",    statLabel: "scroll decision",    title: "Comparison & Feature Shots",  desc: "1.3 seconds — the time a shopper decides whether to click. Comparison shots answer 'why this one?' before the question is even fully formed." },
    { icon: <ShieldCheck size={22} />, stat: "100%",    statLabel: "TOS compliant",      title: "Regulatory Compliance",       desc: "100% compliant = zero suppression risk. Every image is reviewed against Amazon's current TOS — no policy violations, no listing takedowns." },
    { icon: <Maximize2 size={22} />,   stat: "2x",      statLabel: "thumbnail clarity",  title: "Search Thumbnail Optimization",desc: "2x thumbnail clarity = more clicks from search results. We design for the 85×85px mobile thumbnail first, then scale up — not the other way around." },
  ];

  return (
    <section className="py-32 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>The Why</SectionLabel>
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-8 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              There's no space<br />for boring on<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                Amazon.
              </span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-10">
              Shoppers make a purchase decision within 1.3 seconds of seeing your listing. Generic white-background images lose that battle every time. We design images that win it.
            </p>
            <Link href="/contact" className="group flex items-center gap-3 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
              Upgrade my listing images
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <div key={i} className="group bg-[#fafafa] hover:bg-white rounded-[28px] p-6 sm:p-7 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500 shadow-none hover:shadow-orange-500/5">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500 shrink-0">
                    {React.cloneElement(r.icon, { size: 18 })}
                  </div>
                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-black tracking-tighter text-orange-500 leading-none">{r.stat}</span>
                    <p className="text-[12px] font-mono font-bold text-zinc-400 uppercase tracking-widest mt-1">{r.statLabel}</p>
                  </div>
                </div>
                <h3 className="text-[12px] sm:text-[13px] font-black uppercase tracking-[0.12em] text-zinc-900 mb-2 group-hover:text-orange-500 transition-colors">{r.title}</h3>
                <p className="text-zinc-400 text-[11px] sm:text-xs font-light leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   04 — BASIC TO SHOWCASE
   ═══════════════════════════════════════════════ */
function BasicToShowcase() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = (e) => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
    setScrollProgress(progress);
  };

  const imageTypes = [
    { label: "01 Hero / Main Image",       tag: "HERO",        desc: "White background, product dominant, thumbnail-tested. The first impression that determines CTR from search.", img: "/assets/portfolio/lumina bites 1/main image.png" },
    { label: "02 Lifestyle Image",         tag: "LIFESTYLE",   desc: "Product in real-life context. Builds desire and emotional connection before the click.", img: "/assets/portfolio/lumina bites 1/6.png" },
    { label: "03 Feature Infographic",     tag: "INFOGRAPHIC", desc: "Text + visual callouts that communicate benefits without requiring shoppers to read bullet points.", img: "/assets/portfolio/lumina bites 1/3.png" },
    { label: "04 Comparison Shot",         tag: "COMPARISON",  desc: "Positions your product above alternatives. Answers 'why this one?' without a single word of copy.", img: "/assets/portfolio/lumina bites 1/8.png" },
    { label: "05 Dimension / Scale Image", tag: "SCALE",       desc: "Removes size anxiety. Critical for home, kitchen, apparel, and any product where size affects purchase decisions.", img: "/assets/portfolio/lumina bites 1/4.png" },
    { label: "06 How-to / Usage Image",    tag: "USAGE",       desc: "Reduces returns and increases satisfaction. Shows shoppers exactly what they're getting and how to use it.", img: "/assets/portfolio/lumina bites 1/5.png" },
    { label: "07 Social Proof / UGC-Style",tag: "TRUST",       desc: "Rating callouts, review highlights, and authentic-feeling imagery that builds confidence at the final moment.", img: "/assets/portfolio/lumina bites 1/7.png" },
  ];

  return (
    <section className="py-32 bg-zinc-950 text-white relative overflow-hidden">
      {/* Premium Apple-style background glows */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-orange-500/[0.05] blur-[180px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-orange-500/[0.03] blur-[160px] rounded-full pointer-events-none translate-y-1/2" />

      <SectionDots />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="max-w-3xl">
            <SectionLabel light>The Transformation</SectionLabel>
            <h2
              className="text-5xl md:text-[80px] font-black tracking-tighter uppercase leading-[0.85] text-white"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Turn basic<br />images into<br />
              <span className="italic font-light text-orange-500 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                a product showcase.
              </span>
            </h2>
          </div>
          <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-sm pb-2">
            Every one of Amazon's 7 image slots has a specific job to do. We design each one strategically — no wasted slots, no generic filler.
          </p>
        </div>

        {/* Horizontal Scroll for Mobile / Grid for Desktop */}
        <div className="relative group">
          {/* Scroll Arrows - Only visible on hover/touch and only on mobile */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-24 bg-gradient-to-r from-zinc-950 to-transparent z-20 pointer-events-none lg:hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-24 bg-gradient-to-l from-zinc-950 to-transparent z-20 pointer-events-none lg:hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex lg:grid lg:grid-cols-4 gap-4 mb-6 overflow-x-auto lg:overflow-x-visible pb-8 lg:pb-0 no-scrollbar snap-x snap-mandatory lg:snap-none"
          >
            {imageTypes.map((img, i) => (
              <div
                key={i}
                className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-center group/item relative bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/[0.08] hover:border-orange-500/40 rounded-[32px] p-5 sm:p-6 transition-all duration-700 overflow-hidden shadow-none hover:shadow-orange-500/10"
              >
                {/* Glossy Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />
                <div className="absolute -inset-[100%] group-hover/item:inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent transition-all duration-1000 pointer-events-none" />

                {i === 0 && <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600" />}

                <div className="flex items-center justify-between mb-5 relative z-10">
                  <span className="text-[8px] font-mono font-bold text-orange-500 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-full uppercase tracking-widest shadow-[inset_0_0_10px_rgba(249,115,22,0.1)]">{img.tag}</span>
                  <span className="text-[9px] font-mono text-zinc-600 font-medium">{img.label.split(" ")[0]}</span>
                </div>

                {/* Image card with inner glow */}
                <div className={`aspect-square rounded-2xl mb-4 relative overflow-hidden group/card transition-all duration-500 ${i === 0 ? "border border-orange-500/30" : "border border-white/[0.05]"}`}>
                  <img src={img.img} alt="Amazon Listing Image Optimization Detail" className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-1000 opacity-70 group-hover/card:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-white/10 opacity-60 pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                  {i === 0 && <div className="absolute top-3 right-3 bg-orange-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase shadow-lg shadow-orange-500/30 border border-white/20">Active</div>}
                </div>

                <div className="relative z-10">
                  <h4 className="text-[11px] sm:text-[12px] font-black uppercase tracking-[0.15em] text-white/90 mb-2 group-hover/item:text-orange-400 transition-colors leading-tight">{img.label.split(" ").slice(1).join(" ")}</h4>
                  <p className="text-zinc-500 text-[10px] sm:text-[11px] font-light leading-relaxed group-hover/item:text-zinc-300 transition-colors line-clamp-3">{img.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Progress Bar - Mobile Only */}
          <div className="h-[2px] w-full bg-white/5 relative lg:hidden overflow-hidden rounded-full mb-12">
            <div
              className="absolute h-full bg-orange-500 transition-all duration-300 ease-out"
              style={{ width: `${Math.max(10, scrollProgress)}%`, left: `${scrollProgress * 0.9}%` }}
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="group/btn relative inline-flex items-center justify-center px-12 sm:px-16 py-5 bg-orange-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all duration-500 shadow-none hover:shadow-orange-500/20 no-underline whitespace-nowrap"
          >
            Get All 7 Images Designed
            <ArrowRight size={18} className="absolute right-6 sm:right-8 group-hover/btn:translate-x-2 transition-transform duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   05 — PACKAGES
   ═══════════════════════════════════════════════ */
function Packages() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = (e) => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
    setScrollProgress(progress);
  };

  const tiers = [
    {
      name: "Essential",
      tag: "Launch Package",
      desc: "The core images every new listing needs to compete — hero, lifestyle, and key infographics.",
      features: ["Main hero image (white bg)", "1 lifestyle image", "2 infographic images", "Amazon TOS review", "1 revision round"],
      delivery: "5–7 Days",
      ideal: "New listings launching for the first time",
      dark: false,
    },
    {
      name: "Standard",
      tag: "Growth Package",
      desc: "A complete 5-image suite designed to cover every stage of the shopper's decision journey.",
      features: ["Main hero image", "2 lifestyle images", "2 infographic images", "Comparison or scale shot", "2 revision rounds"],
      delivery: "7–10 Days",
      ideal: "Existing listings ready to scale",
      popular: true,
      dark: true,
    },
    {
      name: "Premium",
      tag: "Domination Package",
      desc: "All 7 slots fully optimized — the complete arsenal for category-leading brands.",
      features: ["Main hero + alternate angle", "2 lifestyle images", "2 infographic images", "Comparison + scale shots", "Social proof / trust image", "3 revision rounds", "Mobile thumbnail testing"],
      delivery: "10–14 Days",
      ideal: "Brands competing at the category top",
      dark: false,
    },
  ];

  return (
    <section id="packages" className="py-32 bg-[#fafafa] relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="max-w-3xl">
            <SectionLabel>Packages</SectionLabel>
            <h2
              className="text-5xl md:text-[80px] font-black tracking-tighter uppercase leading-[0.85] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Choose your<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                image package.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-sm pb-2">
            From a core launch set to a full 7-image domination suite — every package is designed to outperform generic listing images.
          </p>
        </div>

        {/* Carousel for Mobile / Grid for Desktop */}
        <div className="relative group">
          {/* Fading Arrows - Only on Mobile */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-32 bg-gradient-to-r from-[#fafafa] to-transparent z-20 pointer-events-none lg:hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-32 bg-gradient-to-l from-[#fafafa] to-transparent z-20 pointer-events-none lg:hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible pb-12 md:pb-0 no-scrollbar snap-x snap-mandatory md:snap-none -mx-2 px-2"
          >
            {tiers.map((tier, i) => (
              <div key={i} className="min-w-[300px] sm:min-w-[340px] md:min-w-0 snap-center relative rounded-[40px] overflow-hidden flex flex-col group/tier">
                {tier.popular && <div className="h-1 w-full bg-gradient-to-r from-orange-500 to-amber-400" />}
                <div className={`flex-1 border p-8 lg:p-10 flex flex-col transition-all duration-500 shadow-none ${
                  tier.popular
                    ? "bg-zinc-950 border-t-0 border-zinc-800 rounded-b-[40px] hover:border-orange-500/30 hover:shadow-orange-500/5"
                    : "bg-white border-zinc-100 rounded-[40px] hover:border-orange-500/20 hover:bg-orange-50/30 hover:shadow-orange-500/5"
                }`}>
                  {tier.popular && (
                    <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 px-3 py-1.5 rounded-full mb-6 self-start">
                      <Star size={9} className="text-orange-400 fill-orange-400" />
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-400">Most Popular</span>
                    </div>
                  )}

                  <span className={`text-[9px] font-mono font-bold uppercase tracking-[0.4em] mb-2 block ${tier.popular ? "text-orange-400" : "text-orange-500"}`}>{tier.tag}</span>
                  <h3 className={`text-3xl font-black tracking-tighter mb-3 ${tier.popular ? "text-white" : "text-zinc-900"}`} style={{ fontFamily: "'Montserrat', sans-serif" }}>{tier.name}</h3>
                  <p className={`text-sm font-light leading-relaxed mb-8 ${tier.popular ? "text-zinc-400" : "text-zinc-500"}`}>
                    {tier.desc}
                    {tier.popular && <span className="block mt-2 font-bold text-orange-400">Best for: brands with 1-3 hero products ready to scale.</span>}
                  </p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 size={14} className="text-orange-500 shrink-0 mt-0.5" />
                        <span className={`text-[13px] font-light ${tier.popular ? "text-zinc-300" : "text-zinc-600"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3">
                    <div className={`flex items-center justify-between py-3 border-t ${tier.popular ? "border-white/5" : "border-zinc-100"}`}>
                      <span className={`text-[10px] font-mono uppercase tracking-widest ${tier.popular ? "text-zinc-600" : "text-zinc-400"}`}>Delivery</span>
                      <span className={`text-[11px] font-bold ${tier.popular ? "text-zinc-300" : "text-zinc-700"}`}>{tier.delivery}</span>
                    </div>
                    <div className={`flex items-center justify-between py-3 border-t ${tier.popular ? "border-white/5 bg-orange-500/5 -mx-2 px-2 rounded-xl" : "border-zinc-50 bg-zinc-50 -mx-2 px-2 rounded-xl"}`}>
                      <span className={`text-[10px] font-mono uppercase tracking-widest ${tier.popular ? "text-zinc-600" : "text-zinc-400"}`}>Pricing</span>
                      <span className="text-[11px] font-bold text-orange-500">Contact for Quote</span>
                    </div>
                    <Link
                      href="/contact"
                      className={`group/btn w-full flex items-center justify-center gap-3 font-bold text-[11px] uppercase tracking-widest py-4 rounded-2xl no-underline transition-all duration-300 ${
                        tier.popular
                          ? "bg-orange-500 hover:bg-white hover:text-black text-white"
                          : "bg-black hover:bg-orange-500 text-white"
                      }`}
                    >
                      Get {tier.name}
                      <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicator - Mobile Only */}
          <div className="h-[2px] w-full bg-zinc-200 relative md:hidden overflow-hidden rounded-full mt-4">
            <div
              className="absolute h-full bg-orange-500 transition-all duration-300 ease-out"
              style={{ width: `${Math.max(10, scrollProgress)}%`, left: `${scrollProgress * 0.9}%` }}
            />
          </div>
        </div>

        {/* Add-on row */}
        <div className="mt-8 bg-white rounded-[32px] border border-zinc-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-orange-500/20 transition-all duration-500">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500">
              <Boxes size={20} />
            </div>
            <div>
              <p className="font-black text-[13px] uppercase tracking-[0.12em] text-zinc-900">3D Rendering Add-On</p>
              <p className="text-zinc-400 text-xs font-light mt-0.5">Photorealistic 3D product renders for any package — no physical samples required.</p>
            </div>
          </div>
          <Link href="/contact" className="shrink-0 flex items-center gap-2 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:gap-4 transition-all no-underline">
            Ask About 3D <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   06 — PORTFOLIO EXAMPLES
   ═══════════════════════════════════════════════ */
function Portfolio() {
  const examples = [
    {
      niche: "Snacks",
      rating: 4.9,
      reviews: "8,342",
      metric: { val: "+80%", label: "SALES LIFT" },
      heroImg: "/assets/portfolio/lumina bites 1/main image.png",
      thumbs: [
        "/assets/portfolio/lumina bites 1/main image.png",
        "/assets/portfolio/lumina bites 1/2.png",
        "/assets/portfolio/lumina bites 1/3.png",
        "/assets/portfolio/lumina bites 1/4.png"
      ]
    },
    {
      niche: "EDC Gear",
      rating: 4.8,
      reviews: "1,245",
      metric: { val: "+65%", label: "CVR LIFT" },
      heroImg: "/assets/portfolio/nexa pouches/main image.png",
      thumbs: [
        "/assets/portfolio/nexa pouches/main image.png",
        "/assets/portfolio/nexa pouches/2.png",
        "/assets/portfolio/nexa pouches/3.png",
        "/assets/portfolio/nexa pouches/4.png"
      ]
    },
    {
      niche: "Home & Auto",
      rating: 4.9,
      reviews: "4,102",
      metric: { val: "+90%", label: "SALES LIFT" },
      heroImg: "/assets/portfolio/kazvo vacume cleaner/main image.png",
      thumbs: [
        "/assets/portfolio/kazvo vacume cleaner/main image.png",
        "/assets/portfolio/kazvo vacume cleaner/2.png",
        "/assets/portfolio/kazvo vacume cleaner/3.png",
        "/assets/portfolio/kazvo vacume cleaner/4.png"
      ]
    },
    {
      niche: "Automotive",
      rating: 4.8,
      reviews: "1,523",
      metric: { val: "+105%", label: "SALES LIFT" },
      heroImg: "/assets/portfolio/kazvo tire inflator/main image.png",
      thumbs: [
        "/assets/portfolio/kazvo tire inflator/main image.png",
        "/assets/portfolio/kazvo tire inflator/2.png",
        "/assets/portfolio/kazvo tire inflator/3.png",
        "/assets/portfolio/kazvo tire inflator/4.png"
      ]
    },
    {
      niche: "DIY & Tools",
      rating: 4.9,
      reviews: "842",
      metric: { val: "+75%", label: "SALES LIFT" },
      heroImg: "/assets/portfolio/kazvo screw set 78/main image.png",
      thumbs: [
        "/assets/portfolio/kazvo screw set 78/main image.png",
        "/assets/portfolio/kazvo screw set 78/2.png",
        "/assets/portfolio/kazvo screw set 78/3.png",
        "/assets/portfolio/kazvo screw set 78/4.png"
      ]
    },
    {
      niche: "Health & Supplements",
      rating: 4.8,
      reviews: "2,104",
      metric: { val: "+130%", label: "SALES LIFT" },
      heroImg: "/assets/portfolio/core vitality suppliments/main image.png",
      thumbs: [
        "/assets/portfolio/core vitality suppliments/main image.png",
        "/assets/portfolio/core vitality suppliments/2.png",
        "/assets/portfolio/core vitality suppliments/3.png",
        "/assets/portfolio/core vitality suppliments/4.png"
      ]
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <SectionLabel>Portfolio</SectionLabel>
            <h2
              className={`text-4xl md:text-[85px] font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.82] text-zinc-900`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Listing images.<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                done right.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-4">
            A curated showcase of high-fidelity, Amazon-optimized visual systems that stop the scroll and close the sale.
          </p>
        </div>

        {/* Responsive Grid for All Screens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {examples.map((ex, i) => (
            <Link
              key={i}
              href="/portfolio?filter=listing-image"
              className="group relative block p-4 bg-zinc-50 border border-zinc-100 rounded-[40px] transition-all duration-700 ease-out no-underline shadow-none hover:shadow-xl hover:shadow-orange-500/5"
            >
               {/* Top Section: Thumbs + Main Image */}
               <div className="flex gap-3 mb-4">

                 {/* Left Thumbs Column */}
                 <div className="w-[20%] flex flex-col gap-2 shrink-0">
                   {ex.thumbs.map((t, idx) => (
                     <div key={idx} className={`bg-white aspect-square rounded-2xl overflow-hidden border-[3px] transition-colors duration-300 ${idx === 0 ? "border-orange-500" : "border-transparent"}`}>
                       <img src={t} alt="Portfolio Thumbnail Showcase" className={`w-full h-full object-contain p-1 rounded-xl ${idx !== 0 && "group-hover:grayscale-0 grayscale-[20%]"}`} />
                     </div>
                   ))}
                 </div>

                 {/* Main Listing Viewport (approx 1:1) */}
                 <div className="flex-1 aspect-square rounded-2xl overflow-hidden relative bg-white border border-zinc-100/50 flex items-center justify-center">
                    <img
                      src={ex.heroImg}
                      alt={ex.niche}
                      className="w-full h-full object-contain p-4 transition-transform duration-[3s] group-hover:scale-105"
                    />

                    {/* Enhanced Hover Overlay (Centered Premium Indicator) */}
                    <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center z-10">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center text-white mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <Eye size={24} />
                      </div>
                      <span className="text-white font-black text-[10px] tracking-[0.4em] uppercase text-center px-6 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        View Listing<br/>Images
                      </span>
                    </div>

                    {/* Top Right Analytics (Metric Pill) */}
                    <div className="absolute top-4 right-4 z-20 bg-zinc-950/90 backdrop-blur-3xl border border-white/10 rounded-2xl p-3 flex flex-col items-center justify-center gap-0.5 shadow-none transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                      <span className="text-orange-500 font-black text-xs tracking-tighter leading-none">{ex.metric.val}</span>
                      <span className="text-[6px] font-bold uppercase tracking-widest text-zinc-500 leading-none">{ex.metric.label}</span>
                    </div>

                    {/* Orange Result Badge (Bottom Left) */}
                    <div className="absolute bottom-4 left-4 z-20 bg-orange-500 text-white rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg shadow-orange-500/20 transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-500">
                      <TrendingUp size={12} />
                      <div className="flex flex-col">
                        <span className="text-[11px] font-black leading-none">{ex.metric.val}</span>
                        <span className="text-[7px] font-bold uppercase tracking-widest leading-none mt-1">{ex.metric.label}</span>
                      </div>
                    </div>

                    {/* Bottom Right Indicator */}
                    <div className="absolute bottom-4 right-4 z-20 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 border border-zinc-100/50">
                      <span className="text-zinc-600 font-bold text-[10px] tracking-wider">1 / 7</span>
                    </div>
                 </div>
               </div>

               {/* Rating Section */}
               <div className="flex items-center gap-2 mb-6 px-1">
                 <div className="flex gap-[2px] text-orange-500">
                    {[...Array(4)].map((_, i) => <Star key={i} size={15} className="fill-orange-500" />)}
                    <StarHalf size={15} className="fill-orange-500 text-orange-500" />
                 </div>
                 <span className="font-extrabold text-orange-500 text-[13px] tracking-tight">{ex.rating}</span>
                 <span className="text-zinc-400 text-[11px] font-medium ml-1">({ex.reviews} ratings)</span>
               </div>

               {/* Buttons Row (Vibrant Reference Style) */}
               <div className="grid grid-cols-4 gap-2 px-0.5 mt-2">
                 <div className="col-span-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full py-2.5 hover:scale-105 transition-all duration-300">
                   <Camera size={11} className="text-white shrink-0" />
                   <span className="text-white font-black text-[7px] uppercase tracking-widest">Hero</span>
                 </div>
                 <div className="col-span-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] rounded-full py-2.5 hover:scale-105 transition-all duration-300">
                   <ShoppingBag size={11} className="text-white shrink-0" />
                   <span className="text-white font-black text-[7px] uppercase tracking-widest">Life</span>
                 </div>
                 <div className="col-span-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#ff2d55] to-[#ff3b30] rounded-full py-2.5 hover:scale-105 transition-all duration-300">
                   <Sparkles size={11} className="text-white shrink-0" />
                   <span className="text-white font-black text-[7px] uppercase tracking-widest">Info</span>
                 </div>
                 <div className="col-span-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#00c7be] to-[#00d2c3] rounded-full py-2.5 hover:scale-105 transition-all duration-300">
                   <Boxes size={11} className="text-white shrink-0" />
                   <span className="text-white font-black text-[7px] uppercase tracking-widest">3D</span>
                 </div>
               </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-6">
          <Link
            href="/portfolio?filter=listing-image"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-4 sm:gap-6 bg-zinc-950 hover:bg-orange-500 text-white px-8 sm:px-10 py-5 rounded-full transition-all duration-500 no-underline shadow-none hover:shadow-orange-500/20"
          >
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] whitespace-nowrap">View All Listing Images</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500 shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════
   06b — WHAT BAD IMAGES COST YOU
   ═══════════════════════════════════════════════ */
function CostCalculator() {
  return (
    <section className="py-16 md:py-24 bg-zinc-950 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      {/* Decorative Orbits & Planets */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Large faint orbits */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/[0.03] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/[0.02] rounded-full" />

        {/* Floating Glowing "Planets" */}
        <div className="absolute top-[15%] left-[10%] w-32 h-32 bg-orange-600/10 blur-[60px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[5%] w-40 h-40 bg-purple-600/10 blur-[80px] rounded-full animate-pulse delay-1000" />

        {/* Orbiting particles (simplified) */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full blur-[1px] animate-[ping_3s_infinite]" />
        <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-orange-500 rounded-full blur-[2px] animate-[pulse_4s_infinite]" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="max-w-[900px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4 bg-white/[0.03] border border-white/10 px-4 py-1.5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <p className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-zinc-400">Conversion Math</p>
          </div>
          <h2
            className="text-[32px] md:text-[70px] font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.85] text-white mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            What bad images<br />
            <span className="italic font-light text-zinc-500 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
              cost you.
            </span>
          </h2>
          <p className="text-zinc-500 text-sm font-light max-w-xl mx-auto leading-relaxed">
            Amazon shoppers decide in <span className="text-white font-bold">1.3 seconds</span>. If your images aren't category-leading, you're paying a "boring tax" on every click.
          </p>
        </div>

        <div className="relative group">
          {/* Card Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-b from-orange-500/20 to-transparent blur-2xl rounded-[48px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          <div className="relative bg-[#080808]/80 border border-white/[0.08] rounded-[48px] p-8 md:p-10 lg:px-14 lg:py-12 backdrop-blur-2xl shadow-2xl">
            <div className="space-y-8">
              {/* Row: Current CTR */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-white/[0.05]">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                    <Activity size={18} className="text-red-400" />
                  </div>
                  <span className="text-zinc-400 text-sm font-medium tracking-wide uppercase">Your current CTR</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-1 w-24 bg-white/5 rounded-full overflow-hidden hidden md:block">
                    <div className="h-full bg-red-500 w-[30%]" />
                  </div>
                  <span className="text-3xl sm:text-4xl font-black text-red-500 tracking-tighter tabular-nums">0.4%</span>
                </div>
              </div>

              {/* Row: Benchmark CTR */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-white/[0.05]">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    <Target size={18} className="text-emerald-400" />
                  </div>
                  <span className="text-zinc-400 text-sm font-medium tracking-wide uppercase">Category average CTR</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-1 w-24 bg-white/5 rounded-full overflow-hidden hidden md:block">
                    <div className="h-full bg-emerald-500 w-[80%]" />
                  </div>
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tighter tabular-nums">1.1%</span>
                </div>
              </div>

              {/* Row: The Gap */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-white/[0.05]">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                    <Zap size={18} className="text-orange-400" />
                  </div>
                  <span className="text-zinc-400 text-sm font-medium tracking-wide uppercase">Opportunity Gap</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-1 w-24 bg-white/5 rounded-full overflow-hidden hidden md:block">
                    <div className="h-full bg-orange-500 w-[63%]" />
                  </div>
                  <span className="text-3xl sm:text-4xl font-black text-orange-500 tracking-tighter tabular-nums">63%</span>
                </div>
              </div>

              {/* The Punchline Impact Card */}
              <div className="relative mt-16 group/punchline">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 via-orange-600/10 to-transparent rounded-[32px] blur-xl opacity-50 group-hover/punchline:opacity-80 transition-opacity duration-700" />

                <div className="relative bg-zinc-950/60 border border-white/10 rounded-[32px] p-8 md:p-12 backdrop-blur-3xl overflow-hidden">
                  {/* Subtle red leak animation */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30 animate-pulse" />

                  <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="text-center md:text-left relative z-10">
                      <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 px-3 py-1 rounded-full mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-red-400">On $10K/mo Ad Spend</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          $6,300<span className="text-red-500/80 text-3xl md:text-5xl ml-1">/mo</span>
                        </p>
                        <p className="text-zinc-500 text-xs font-mono uppercase tracking-[0.3em] mt-3">Monthly Lost Traffic Value</p>
                      </div>
                    </div>

                    <div className="shrink-0 relative z-10 w-full md:w-auto">
                      <Link
                        href="/contact"
                        className="group/btn relative w-full flex items-center justify-center bg-orange-500 hover:bg-white text-white hover:text-black font-black text-[12px] uppercase tracking-[0.2em] px-10 py-5 rounded-2xl no-underline transition-all duration-500 shadow-[0_20px_40px_rgba(249,115,22,0.2)] whitespace-nowrap"
                      >
                        Stop The Leak
                        <ArrowRight size={16} className="absolute right-6 group-hover/btn:translate-x-2 transition-transform duration-500" />
                      </Link>
                      <p className="text-[9px] text-zinc-600 text-center uppercase tracking-widest font-bold mt-4">Immediate Implementation Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   07 — WHO IS THIS FOR
   ═══════════════════════════════════════════════ */
function WhoItsFor() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".signal-block").forEach((block, i) => {
        gsap.fromTo(block,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const signals = [
    {
      index: "01",
      icon: <Fingerprint size={18} />,
      label: "CLICK-THROUGH FRICTION",
      status: "SEARCH INVISIBILITY",
      statusColor: "text-red-500 bg-red-500/10 border-red-500/20",
      headline: "The Sea of Sameness: Your main image is blending in.",
      subline: "CTR diagnostic.",
      body: "If your main hero shot looks exactly like your competitors, you're competing on price, not value. We optimize for the 85x85px mobile thumbnail — using lighting and composition techniques that literally force the shopper's eye to stop on your product first.",
      symptoms: [
        "Ad spend is high but click-through rate (CTR) is below 0.4%",
        "Main image lacks dominant 'stopping power' in mobile search",
        "Competitors with fewer reviews are out-clicking your listing",
      ],
      accentGradient: "from-red-500/80 to-orange-500/80",
    },
    {
      index: "02",
      icon: <Monitor size={18} />,
      label: "DECISION PARALYSIS",
      status: "COGNITIVE OVERLOAD",
      statusColor: "text-orange-500 bg-orange-500/10 border-orange-500/20",
      headline: "The Reading Barrier: Shoppers aren't reading your bullets.",
      subline: "Usability analysis.",
      body: "70% of Amazon shoppers never read a single bullet point. If your images don't communicate your top 3 benefits in under 5 seconds, you're losing the sale. We turn complex data into 'scannable' infographics that remove the friction of thinking.",
      symptoms: [
        "High bounce rate after shoppers land on the listing",
        "Customer questions are asking things already answered in bullets",
        "Shoppers leave because they don't 'get' the value fast enough",
      ],
      featured: true,
      accentGradient: "from-orange-500 to-amber-500",
    },
    {
      index: "03",
      icon: <Zap size={18} />,
      label: "CONVERSION LEAK",
      status: "MOBILE ABANDON",
      statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      headline: "The Gallery Gap: Your mobile story is incomplete.",
      subline: "Funnel x-ray.",
      body: "On mobile, your images ARE your listing. If your gallery doesn't follow a logical 'Sales Stack' — from hero to benefit to lifestyle to social proof — shoppers will bounce before reaching the A+ content. We architect a sequence that builds trust card by card.",
      symptoms: [
        "Low add-to-cart rate from mobile traffic sources",
        "Gallery lacks a cohesive 'story sequence' for shoppers",
        "Lifestyle images feel like generic stock photos, not your brand",
      ],
      accentGradient: "from-emerald-500/80 to-teal-500/80",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 relative z-10">
        <div className="mb-12 lg:mb-20">
          <SectionLabel>Image Diagnostic</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 mt-4">
            <h2
              className="text-3xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              The symptoms<br />
              of weak visuals.
            </h2>
            <p className="text-zinc-500 text-sm lg:text-base font-light leading-relaxed max-w-md lg:text-right">
              Generic images are the most expensive tax on your Amazon business. Identify the friction points in your gallery before they cost you another sale.
            </p>
          </div>
        </div>

        <div className="space-y-0 relative">
          <div className="absolute left-0 lg:left-4 top-0 bottom-0 w-px bg-zinc-100 hidden lg:block" />

          {signals.map((s, i) => {
            const isFeatured = s.featured;
            return (
              <div key={i} className="signal-block relative">
                <div className="absolute -left-16 top-16 hidden xl:block origin-right -rotate-90">
                  <span className="text-[7px] font-mono font-bold text-zinc-300 uppercase tracking-[0.5em]">
                    [VISUAL_SCAN_{s.index}]
                  </span>
                </div>

                <div className={`relative group transition-all duration-700 ${
                  isFeatured
                    ? "bg-zinc-950 rounded-[28px] lg:rounded-[48px] px-5 lg:px-16 py-10 lg:py-20 my-6 lg:my-8 shadow-[0_30px_80px_rgba(0,0,0,0.3)] lg:shadow-[0_50px_120px_rgba(0,0,0,0.4)] ring-1 ring-white/10"
                    : "py-10 lg:py-16 border-b border-zinc-50 last:border-0 lg:pl-8 lg:border-l-2 lg:border-l-transparent hover:border-l-orange-500/40"
                }`}>

                  {isFeatured ? (
                    <>
                      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[48px]">
                        <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-orange-500/5 to-transparent -translate-y-full animate-[scan-vertical_8s_linear_infinite]" />
                        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px]" />
                      </div>
                      <div className="absolute top-5 left-5 lg:top-8 lg:left-8 w-3 h-3 lg:w-4 lg:h-4 border-t-2 border-l-2 border-white/10 hidden sm:block" />
                      <div className="absolute top-5 right-5 lg:top-8 lg:right-8 w-3 h-3 lg:w-4 lg:h-4 border-t-2 border-r-2 border-white/10 hidden sm:block" />
                      <div className="absolute bottom-5 left-5 lg:bottom-8 lg:left-8 w-3 h-3 lg:w-4 lg:h-4 border-b-2 border-l-2 border-white/10 hidden sm:block" />
                      <div className="absolute bottom-5 right-5 lg:bottom-8 lg:right-8 w-3 h-3 lg:w-4 lg:h-4 border-b-2 border-r-2 border-white/10 hidden sm:block" />
                      <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/[0.05] rounded-full blur-[100px] pointer-events-none" />
                    </>
                  ) : (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div className="absolute inset-0 bg-[radial-gradient(#f9731610_1px,transparent_1px)] [background-size:32px_32px]" />
                    </div>
                  )}

                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-2 lg:gap-4 mb-6 lg:mb-8">
                      <div className={`flex items-center gap-2 ${isFeatured ? "text-orange-500" : "text-zinc-300"}`}>
                        <span className="text-[11px] font-black tracking-widest font-mono">[{s.index}]</span>
                      </div>
                      <div className={`h-px w-6 lg:flex-1 lg:max-w-[40px] ${isFeatured ? "bg-white/10" : "bg-zinc-100"}`} />
                      <span className={`text-[8px] lg:text-[9px] font-black tracking-[0.3em] lg:tracking-[0.4em] uppercase ${
                        isFeatured ? "text-white/40" : "text-zinc-400"
                      }`}>
                        {s.label}
                      </span>
                      <div className={`h-px flex-1 hidden lg:block ${isFeatured ? "bg-white/5" : "bg-zinc-50"}`} />
                      <div className={`flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-4 py-1 lg:py-1.5 rounded-full border text-[7px] lg:text-[8px] font-black uppercase tracking-[0.25em] lg:tracking-[0.35em] backdrop-blur-md ml-auto ${s.statusColor}`}>
                        <div className="relative w-1.5 h-1.5">
                          <div className="absolute inset-0 bg-current rounded-full animate-ping opacity-75" />
                          <div className="relative bg-current rounded-full w-full h-full" />
                        </div>
                        {s.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20 items-start">
                      <div className="lg:col-span-5">
                        <div className={`inline-block mb-3 px-2 py-1 rounded text-[7px] font-mono font-bold ${isFeatured ? "bg-white/5 text-zinc-500" : "bg-zinc-100 text-zinc-400"}`}>
                          IMAGE_SIGNAL: {s.subline.toUpperCase()}
                        </div>
                        <h3
                          className={`text-2xl lg:text-[36px] font-black uppercase tracking-tighter leading-[0.95] mb-4 lg:mb-6 ${
                            isFeatured ? "text-white italic" : "text-zinc-900"
                          }`}
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {s.headline}
                        </h3>
                      </div>

                      <div className="lg:col-span-7 lg:pl-10 lg:border-l border-current transition-colors duration-700" style={{ borderColor: isFeatured ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)" }}>
                        <p className={`text-[13px] lg:text-[15px] font-light leading-[1.75] lg:leading-[1.85] mb-5 lg:mb-6 ${
                          isFeatured ? "text-zinc-400" : "text-zinc-500"
                        }`}>
                          {s.body}
                        </p>

                        <div className={`rounded-2xl lg:rounded-3xl p-5 lg:p-8 transition-all duration-700 ${
                          isFeatured
                            ? "bg-white/[0.02] border border-white/10 shadow-inner"
                            : "bg-zinc-50 border border-zinc-100 group-hover:bg-white group-hover:shadow-xl group-hover:shadow-zinc-200/40"
                        }`}>
                          <div className="flex items-center justify-between mb-4">
                            <span className={`text-[9px] font-mono font-black uppercase tracking-[0.4em] ${
                              isFeatured ? "text-orange-500/40" : "text-zinc-300"
                            }`}>
                              CONVERSION_SYMPTOMS
                            </span>
                            <div className={`w-8 h-px ${isFeatured ? "bg-white/10" : "bg-zinc-100"}`} />
                          </div>

                          <div className="space-y-4">
                            {s.symptoms.map((symptom, i) => (
                              <div key={i} className="flex items-start gap-4 group/symptom">
                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${
                                  isFeatured
                                    ? "bg-white/5 border border-white/5 text-orange-400 group-hover/symptom:bg-orange-500 group-hover/symptom:text-white"
                                    : "bg-white border border-zinc-100 text-orange-500/40 group-hover/symptom:border-orange-500 group-hover/symptom:text-orange-500"
                                }`}>
                                  <span className="text-[8px] font-mono font-bold">{i + 1}</span>
                                </div>
                                <span className={`text-[13px] font-medium leading-relaxed transition-colors duration-300 ${
                                  isFeatured ? "text-zinc-500 group-hover/symptom:text-zinc-300" : "text-zinc-600"
                                }`}>
                                  {symptom}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 lg:mt-16 relative">
          <div className="bg-zinc-950 rounded-[24px] lg:rounded-[48px] border border-white/5 p-6 lg:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 lg:gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} className="text-orange-500" />
              </div>
              <div>
                <p className="text-[9px] lg:text-[11px] font-black uppercase tracking-[0.35em] lg:tracking-[0.4em] text-orange-500 mb-1.5">Standardize Your Listing</p>
                <p className="text-zinc-400 text-[13px] lg:text-base font-light leading-relaxed max-w-lg">
                  Stop settling for average CTR. Our Listing Image architecture provides the visual framework for 100% conversion control and dominant search presence.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-white text-zinc-950 w-full md:w-auto px-6 lg:px-10 py-3.5 lg:py-5 rounded-full text-[10px] lg:text-[12px] font-black uppercase tracking-[0.2em] lg:tracking-[0.25em] hover:bg-orange-500 hover:text-white hover:shadow-[0_20px_50px_rgba(249,115,22,0.3)] transition-all duration-500 shrink-0 active:scale-[0.97] no-underline"
            >
              Get Free Image Audit
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   08 — FAQ
   ═══════════════════════════════════════════════ */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: "What do you need to create my listing images?",              a: "We need your product — either sent to our studio or provided as high-resolution studio photos. We also need your brand assets (logo, fonts, colors), competitor references you want to outperform, and a brief about your target customer. We handle everything else from there." },
    { q: "Do I need professional photography or can you work with my existing photos?", a: "Both. If you already have quality product photos, we can use them as the base and build your full image set around them. If the photos are low quality, we'll advise on whether new photography is necessary. In many cases, we can use 3D rendering as an alternative to photography." },
    { q: "Will I get to review and approve the images before they go live?", a: "Absolutely. Every package includes revision rounds where you review the full image set and provide feedback. We refine until you're completely satisfied before delivering final files." },
    { q: "How many images does an Amazon listing support?",             a: "Amazon allows up to 7 images on standard listings, plus a video slot. We recommend using all 7 — each slot has a different conversion job to do, and leaving any empty is leaving money on the table." },
    { q: "What's the difference between a listing image and an A+ Content image?", a: "Listing images appear in the image gallery at the top of your listing and in search results. A+ Content appears below the bullet points. Both matter, but listing images drive click-through from search and are the first thing shoppers evaluate — making them the higher priority." },
    { q: "Can you create 3D renders if I don't have physical samples?", a: "Yes. Our 3D rendering service creates photorealistic product imagery from your CAD files or reference photos — no physical sample required. This is ideal for pre-launch listings or products in development." },
    { q: "How do Amazon-optimized images differ from general product photography?", a: "Amazon-optimized images are designed specifically for the platform: thumbnail-tested at 85×85px, TOS-compliant (correct background, no watermarks, no misleading claims), mobile-first layouts, and strategically sequenced to move shoppers from awareness to purchase decision across all 7 slots." },
  ];

  return (
    <section className="py-32 bg-white border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>FAQ</SectionLabel>
            <h2
              className="text-5xl md:text-[80px] font-black tracking-tighter uppercase leading-[0.85] mb-10 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Frequently<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>asked.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-12">
              Everything you need to know about professional Amazon listing image design before you get started.
            </p>
            <div className="p-6 bg-[#fafafa] rounded-3xl border border-zinc-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Have More Questions?</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Every product and catalog is different. Our team answers every question — no canned responses, no generic advice.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-orange-500 font-bold text-[10px] uppercase tracking-widest hover:gap-3 transition-all no-underline">
                Ask us directly <ChevronRight size={11} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className={`border transition-all duration-500 rounded-[24px] overflow-hidden ${openIndex === i ? "bg-[#fafafa] border-orange-500/30 shadow-none" : "bg-white border-zinc-100 hover:border-zinc-200"}`}>
                <button className="w-full flex items-center justify-between px-6 sm:px-8 py-6 text-left" onClick={() => setOpenIndex(openIndex === i ? -1 : i)}>
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-mono transition-colors shrink-0 ${openIndex === i ? "text-orange-500" : "text-zinc-300"}`}>0{i + 1}</span>
                    <span className="text-[13px] sm:text-[14px] font-bold text-zinc-900 tracking-tight leading-tight">{faq.q}</span>
                  </div>
                  <div className={`shrink-0 w-8 h-8 ml-4 rounded-full flex items-center justify-center transition-all duration-500 ${openIndex === i ? "bg-orange-500 text-white rotate-180" : "bg-zinc-100 text-zinc-400"}`}>
                    {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                <div className="transition-all duration-500 ease-in-out overflow-hidden" style={{ maxHeight: openIndex === i ? "400px" : "0", opacity: openIndex === i ? 1 : 0 }}>
                  <div className="px-6 sm:px-8 pb-8 pt-0 sm:ml-10">
                    <div className="text-[13px] sm:text-[14px] text-zinc-500 leading-relaxed font-light border-l-2 border-orange-500/20 pl-5 sm:pl-6">{faq.a}</div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-8 py-6 bg-zinc-900 rounded-[24px] text-white">
              <div className="flex items-center gap-3">
                <Terminal size={14} className="text-orange-500 shrink-0" />
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold whitespace-nowrap">More_Questions?</span>
              </div>
              <Link href="/contact" className="flex items-center gap-2 group no-underline">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors whitespace-nowrap">Contact Us Directly</span>
                <ChevronRight size={14} className="text-orange-500 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



/* ═══════════════════════════════════════════════
   LISTING IMAGES CTA
   ═══════════════════════════════════════════════ */
const ListingCTAButton = ({ href = "/contact", children }) => (
  <Link
    href={href}
    className="group relative inline-flex justify-center w-full sm:w-auto px-6 sm:px-10 py-4 bg-orange-600 text-white rounded-full font-bold text-[9px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.3em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:scale-[1.02] active:scale-95 no-underline border-none"
  >
    <span className="relative z-10 flex items-center justify-center gap-3 sm:gap-4 w-full">
      {children}
      <ArrowRight size={16} className="group-hover:translate-x-2 transition-all duration-300 text-white" />
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-orange-400 transition-transform duration-500 ease-in-out"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[horizontal-scan_2s_linear_infinite]"></div>
  </Link>
);

function ListingImagesCTA() {
  return (
    <div className="w-full pb-10 bg-[#fafafa]">
      <section className="px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-[#0a0a0a] rounded-[40px] py-14 px-8 lg:px-20 text-left relative overflow-hidden border border-white/5 group shadow-none">

            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />

            {/* Background Large Icon Decor */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.05] translate-x-1/4">
              <Layers size={600} strokeWidth={0.2} className="text-orange-500" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column: Content */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-white font-bold text-[9px] uppercase tracking-[0.4em]">Visual Capacity: Open</span>
                </div>

                <h2
                  className="text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-[0.9] text-white uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Stop losing clicks.<br />
                  <span className="italic font-light block mt-2 tracking-normal text-orange-500 lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                    dominate the scroll.
                  </span>
                </h2>

                <p className="text-zinc-400 font-light mb-10 text-base lg:text-lg leading-relaxed max-w-xl">
                  Average images lead to average conversion. Book a **15-minute Conversion Audit** to transform your listing into a high-octane sales funnel using our 7-image psychological framework.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mb-16">
                  <ListingCTAButton href="/contact">
                    Get Free Strategy Call
                  </ListingCTAButton>
                  <div className="flex items-center justify-center sm:justify-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">CTR Optimization</span>
                  </div>
                </div>

                {/* Bottom Row Points */}
                <div className="pt-8 border-t border-white/5 flex flex-wrap items-center gap-x-10 gap-y-3">
                  {[
                    "Psychology-Driven Layouts",
                    "Feature-Benefit Mapping",
                    "Mobile-First Optimization"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white whitespace-nowrap">
                      <CheckCircle2 size={12} className="text-orange-500/70" strokeWidth={3} />
                      {item}
                    </div>
                  ))}
                </div>

              </div>

              {/* Right Column: 15-Minute Strategy Card */}
              <div className="lg:col-span-5 block mt-12 lg:mt-0 relative group/card">
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-5 sm:p-8 shadow-none overflow-hidden hover:border-orange-500/30 transition-all duration-500">

                  {/* Card Glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  {/* Header */}
                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[8px] font-mono text-orange-500/80 uppercase tracking-widest">Session: Visual Flow</span>
                      </div>
                      <h4 className="text-2xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>Stack Plan</h4>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-inner">
                      <Eye size={22} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Steps with Timeline spacing */}
                  <div className="space-y-0 relative z-10 before:absolute before:inset-y-3 before:left-[19px] before:w-[2px] before:bg-white/10">
                    {[
                      { icon: <MousePointer2 size={16} />, title: "1. Click-Through Audit", desc: "Analyze hero image performance against top-tier competitors." },
                      { icon: <Zap size={16} />, title: "2. Objections Mapping", desc: "Identify key customer doubts to neutralize through infographics." },
                      { icon: <ShoppingBag size={16} />, title: "3. Conversion Stack", desc: "Design the sequence that leads from 'Add to Cart' to 'Buy Now'.", active: true }
                    ].map((step, i) => (
                      <div key={i} className={`relative flex gap-4 sm:gap-6 ${i !== 2 ? 'pb-8' : ''} group/step`}>
                        <div className={`w-10 h-10 shrink-0 rounded-full border flex items-center justify-center z-10 transition-all ${step.active ? 'bg-orange-500/20 border-orange-500 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-zinc-900 border-white/10 text-zinc-400 group-hover/step:border-orange-500/50'}`}>
                          {step.icon}
                        </div>
                        <div className="pt-1">
                          <h5 className={`text-[13px] font-bold mb-1.5 uppercase tracking-wide ${step.active ? 'text-orange-400' : 'text-white'}`}>{step.title}</h5>
                          <p className="text-[11px] text-zinc-400 font-light leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Meeting Context Footer */}
                  <div className="mt-10 bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 relative z-10 backdrop-blur-md">
                    <div className="flex items-center gap-3 sm:gap-4">
                       <div className="w-10 h-10 shrink-0 rounded-full border border-white/10 bg-zinc-800 flex items-center justify-center text-zinc-400">
                         <Users size={16} />
                       </div>
                       <div>
                         <p className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-widest mb-0.5 leading-tight">Analysis Session</p>
                         <p className="text-[9px] sm:text-[10px] text-zinc-500 font-mono">15 Mins • 1-on-1 Discovery</p>
                       </div>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-orange-500/10 text-orange-500 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase border border-orange-500/20 self-stretch sm:self-auto text-center shrink-0">
                      Free Access
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes horizontal-scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}


/* ═══════════════════════════════════════════════
   FOOTER NAV
   ═══════════════════════════════════════════════ */
function FooterNav() {
  return (
    <footer className="py-24 bg-white border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Previous Design Service</p>
          <Link href="/service/design/brand-store" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start uppercase">
              <ArrowRight className="mr-3 group-hover:-translate-x-3 transition-transform rotate-180 size-6 md:size-8 shrink-0" />
              Brand Store
            </h4>
          </Link>
        </div>
        <div className="hidden md:block w-px h-16 bg-zinc-100" />
        <div className="text-center md:text-right w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Design Service</p>
          <Link href="/service/design/enhanced-brand-content" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end uppercase">
              A+ Content
              <ArrowRight className="ml-3 group-hover:translate-x-3 transition-transform size-6 md:size-8 shrink-0" />
            </h4>
          </Link>
        </div>
      </div>
      <div className="mt-16 text-center">
        <Link href="/service" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 transition-colors no-underline">
          <ArrowRight className="rotate-180" size={16} /> Back to All Services
        </Link>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE EXPORT
   ═══════════════════════════════════════════════ */
export default function ListingImagesPage() {
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <ListingImagesHero />
      <MetricsStrip />
      <NoBoring />
      <BasicToShowcase />
      <Packages />
      <Portfolio />
      <CostCalculator />
      <WhoItsFor />
      <FAQ />
      <ListingImagesCTA />
      <FooterNav />
    </div>
  );
}