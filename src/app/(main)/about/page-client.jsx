"use client";

import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, ArrowUpRight, TrendingUp, Shield,
  Zap, BarChart3, Camera, Search, CheckCircle2,
  Target, Globe, Users, Clock, Award, Quote,
  ChevronLeft, ChevronRight, X, ExternalLink, Mail
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* ─── HELPERS ─── */
const SectionLabel = ({ children, light = false }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500" />
    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.4em] ${light ? "text-orange-400" : "text-orange-500/80"}`}>
      {children}
    </span>
  </div>
);

const optimizeCloudinaryUrl = (url, width = 600) => {
  if (!url || typeof url !== "string") return url;
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
  }
  return url;
};

/* ─── DATA ─── */
const STATS = [
  { val: "140+",  label: "Brands Scaled",      sub: "across 12 major niches"    },
  { val: "$32M+", label: "Revenue Managed",     sub: "combined seller accounts"  },
  { val: "8.2x",  label: "Average Peak ROAS",   sub: "across all active accounts"},
  { val: "24/7",  label: "Account Monitoring",  sub: "real-time alert defense"   },
];

const PILLARS = [
  {
    num: "01",
    tag: "CONVERSION ENGINE",
    title: "Visual Engineering & Creative CRO",
    desc: "We replace flat photographs with photorealistic 3D product renders, objection-killing 7-image gallery stacks, and immersive Brand Story modules engineered to command premium prices and maximize Unit Session Percentage.",
    metrics: "+38% Avg CVR Lift",
    icon: <Camera size={22} className="text-orange-500" />
  },
  {
    num: "02",
    tag: "ALGORITHMIC TRAFFIC",
    title: "Algorithmic PPC & Bid Architecture",
    desc: "4-tier campaign isolation: Root, Exact Conquest, Brand Defense, and Search Query Performance (SQP) harvesting. Day-parted bid adjustments and strict unit-economic controls that protect your net margins.",
    metrics: "-38% Avg ACoS",
    icon: <BarChart3 size={22} className="text-orange-500" />
  },
  {
    num: "03",
    tag: "ACCOUNT SECURITY",
    title: "Account Defense & Global Expansion",
    desc: "Complete operational shielding: 24/7 listing suppression alerts, inventory velocity forecasting, hijacker removal, Brand Registry defense, and synchronized international rollout across US, CA, UK, EU, and JP.",
    metrics: "99.9% Buy Box Uptime",
    icon: <Shield size={22} className="text-orange-500" />
  }
];

const SOURCING_PICS = [
  {
    img: "https://res.cloudinary.com/dciggvulg/image/upload/v1784040764/grow_orbit_ceo_pics/2.avif",
    title: "Guangzhou Sourcing Expo",
    desc: "Vetting new suppliers, inspecting product catalogs, and verifying manufacturer credentials on the ground."
  },
  {
    img: "https://res.cloudinary.com/dciggvulg/image/upload/v1784040765/grow_orbit_ceo_pics/3.avif",
    title: "Direct Factory Contract Deal",
    desc: "Negotiating direct supply terms and securing favorable pricing without middleman markups."
  },
  {
    img: "https://res.cloudinary.com/dciggvulg/image/upload/v1784040766/grow_orbit_ceo_pics/4.avif",
    title: "Minstar Factory Quality Audit",
    desc: "Inspecting raw materials, tooling standards, and quality control procedures on the assembly floor."
  },
  {
    img: "https://res.cloudinary.com/dciggvulg/image/upload/v1784040767/grow_orbit_ceo_pics/5.avif",
    title: "On-Site Production Inspection",
    desc: "Reviewing manufacturing capacity and building long-term ties directly on the factory floor."
  },
  {
    img: "https://res.cloudinary.com/dciggvulg/image/upload/v1784040768/grow_orbit_ceo_pics/6.avif",
    title: "Executive Supplier Partnership",
    desc: "Establishing strategic manufacturer partnerships to lock in priority production scheduling."
  },
  {
    img: "https://res.cloudinary.com/dciggvulg/image/upload/v1784040769/grow_orbit_ceo_pics/7.avif",
    title: "Transit Between Supplier Hubs",
    desc: "Traveling across manufacturing cities by high-speed rail for back-to-back factory audits."
  },
  {
    img: "https://res.cloudinary.com/dciggvulg/image/upload/v1784040771/grow_orbit_ceo_pics/8.avif",
    title: "Strategic Supplier Dinner",
    desc: "Building trusted executive relationships with factory owners for priority lead times and negotiation leverage."
  }
];

const VALUES = [
  { num: "01", title: "Amazon-Only Focus", desc: "We dedicate 100% of our focus to Amazon. That is not a limitation: it is why our mathematical models and conversion benchmarks consistently outpace generalist agencies." },
  { num: "02", title: "Systems, Not Silos", desc: "Every engagement builds a self-compounding growth flywheel. PPC search-term insights directly shape creative CRO, while improved conversion velocity lowers blended acquisition costs." },
  { num: "03", title: "Unit Economics Before Spend", desc: "We never scale advertising into a leaky bucket. Before increasing daily campaign budgets, we ensure the listing commands superior CTR, CVR, and Buy Box stability." },
  { num: "04", title: "Month-to-Month Agreements", desc: "No predatory 12-month lock-in contracts. We stay partnered with brands because verified performance keeps us there: not legal handcuffs." },
];

const PROOF_CASES = [
  {
    brand: "Graffixx",
    category: "Art Supplies",
    stat: "+112% MoM Growth",
    sub: "742.9K units sold within 12 months",
    quote: "Grow Orbit revamped our visual gallery and restructured our PPC. Our daily sales jumped to $6.7K/day consistently.",
    author: "Marcus Thorne, Founder",
    link: "/case-study/li-01"
  },
  {
    brand: "Kazvoo",
    category: "Consumer Electronics",
    stat: "52% to 18% ACoS",
    sub: "CVR lifted from 3.1% to 9.4%",
    quote: "Through technical 3D renders and premium A+ Content, they completely turned around our unit economics.",
    author: "Julian Vane, Founder",
    link: "/case-study/li-02"
  },
  {
    brand: "Dunova",
    category: "Home & Sleep",
    stat: "+96% MoM Growth",
    sub: "812.7K yearly units achieved",
    quote: "They run Amazon like a cohesive operating system. Our listings dominate top-of-search in a crowded category.",
    author: "Sarah Jenkins, Founder",
    link: "/case-study/li-03"
  }
];

/* ════════════════════════════════════════════
   PAGE
════════════════════════════════════════════ */
export default function AboutPage() {
  const heroRef = useRef(null);
  const carouselRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const offset = direction === "left" ? -400 : 400;
    carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") setActiveImage(null);
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activeImage]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-in",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "expo.out", delay: 0.2 }
      );
      gsap.utils.toArray(".scroll-in").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="min-h-screen bg-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <style>{`
        .no-scrollbar::-webkit-scrollbar{display:none;}
        .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none;}
        @keyframes radar-spin { 100% { transform: rotate(360deg); } }
        @keyframes ops-breathe { 0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.05); } 50% { box-shadow: 0 0 60px 20px rgba(249,115,22,0.08); } }
        @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 0.5; } 100% { transform: scale(1.3); opacity: 0; } }
        @keyframes data-stream { 0% { transform: translateY(-100%); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(100%); opacity: 0; } }
      `}</style>

      {/* ═══════════════════════════════════
          HERO: OPERATIONS COMMAND CENTRE
      ═══════════════════════════════════ */}
      <section className="bg-zinc-950 pt-[100px] sm:pt-[110px] pb-20 sm:pb-24 relative overflow-hidden">
        {/* Layered Background Details */}
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,rgba(249,115,22,0.14),transparent_60%)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

        {/* OPERATIONS Watermark */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[10%] font-black text-[80px] sm:text-[140px] md:text-[220px] uppercase tracking-tighter pointer-events-none select-none opacity-[0.03] whitespace-nowrap"
          style={{ fontFamily: "Arial, sans-serif", WebkitTextStroke: "1.5px #fff", color: "transparent" }}
        >
          OPERATIONS
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Heading and Thesis */}
            <div className="lg:col-span-7 lg:mt-[20px]">
              <div className="hero-in flex items-center gap-3 mb-8">
                <div className="flex gap-1 items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                  <div className="w-6 h-[1.5px] bg-orange-500" />
                </div>
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.45em] text-orange-400">
                  The Operations Command Centre
                </span>
              </div>

              <h1 className="hero-in text-[44px] sm:text-[64px] md:text-[84px] font-black tracking-tighter leading-[0.9] text-white uppercase mb-6 sm:mb-8">
                The engine<br />behind{" "}
                <span className="text-orange-500 italic font-light lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                  top-tier brands.
                </span>
              </h1>

              <div className="hero-in flex gap-6 mb-10">
                <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-60" />
                <p className="text-zinc-400 font-light text-sm sm:text-lg leading-relaxed max-w-xl">
                  We are the full-stack Amazon growth partner. We manage daily operations, aggressively scale PPC, and <span className="text-white font-medium">engineer the visuals</span> so you can focus on building an enduring category leader.
                </p>
              </div>

              {/* Trust badges */}
              <div className="hero-in flex flex-wrap items-center gap-3 mb-10">
                {[
                  { val: "140+", label: "Brands Scaled" },
                  { val: "$32M+", label: "Revenue Managed" },
                  { val: "8.2x", label: "Avg Peak ROAS" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.08] rounded-full px-4 py-2">
                    <span className="text-[13px] font-black text-orange-400 tracking-tighter">{b.val}</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">{b.label}</span>
                  </div>
                ))}
              </div>

              <div className="hero-in flex flex-col sm:flex-row gap-4">
                <Link
                  href="/get-started"
                  className="flex items-center justify-center gap-3 bg-orange-500 hover:bg-white hover:text-zinc-950 text-white font-black text-[11px] uppercase tracking-widest px-8 py-5 sm:py-4 rounded-full transition-all duration-300 shadow-[0_8px_30px_rgba(249,115,22,0.35)] no-underline w-full sm:w-fit"
                >
                  Work With Us <ArrowRight size={14} />
                </Link>
                <Link
                  href="/case-study"
                  className="flex items-center justify-center gap-3 border border-white/10 hover:border-orange-500/40 text-zinc-300 hover:text-white font-bold text-[11px] uppercase tracking-widest px-8 py-5 sm:py-4 rounded-full transition-all duration-300 no-underline w-full sm:w-fit"
                >
                  View Case Studies <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Column: Interactive Ops Dashboard */}
            <div className="hero-in lg:col-span-5 relative block mt-8 lg:mt-[30px] scale-[0.96] sm:scale-100 origin-top lg:origin-center">
              
              {/* Floating Metric Card: Top Right */}
              <div className="absolute -top-7 -right-2 lg:-right-4 bg-white rounded-[22px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.25)] z-30 border border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-[0_8px_20px_rgba(16,185,129,0.3)]">
                    <Shield size={18} />
                  </div>
                  <div>
                    <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Buy Box Uptime</p>
                    <p className="text-lg font-black text-zinc-900 tracking-tighter leading-none">99.9%</p>
                  </div>
                </div>
              </div>

              {/* Floating Metric Card: Bottom Left */}
              <div className="absolute -left-4 lg:-left-8 bottom-[70px] bg-zinc-900 rounded-2xl px-5 py-4 z-30 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
                  <div>
                    <p className="text-[7px] font-mono font-bold uppercase tracking-[0.25em] text-zinc-400">Avg 90-Day ACoS</p>
                    <p className="text-lg sm:text-xl font-black text-white leading-none tracking-tighter">14%</p>
                  </div>
                </div>
              </div>

              {/* Main Dashboard Widget */}
              <div className="bg-zinc-950 rounded-[32px] shadow-[0_60px_120px_rgba(0,0,0,0.6)] border border-white/[0.08] overflow-hidden relative" style={{ animation: "ops-breathe 6s ease-in-out infinite" }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

                {/* Dashboard Header */}
                <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-orange-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.2em]">Ops_Terminal_v2</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest font-bold">LIVE TELEMETRY</span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Radar Visual */}
                  <div className="relative h-[180px] flex items-center justify-center mb-6 overflow-hidden rounded-2xl bg-white/[0.015] border border-white/[0.04]">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                    <div className="absolute w-[140px] h-[140px] rounded-full border border-orange-500/20" />
                    <div className="absolute w-[80px] h-[80px] rounded-full border border-orange-500/30" />
                    
                    <div className="absolute w-[140px] h-[140px] rounded-full overflow-hidden">
                      <div className="absolute top-1/2 left-1/2 w-full h-full origin-top-left bg-gradient-to-br from-orange-500/40 to-transparent" style={{ animation: "radar-spin 4s linear infinite" }} />
                    </div>

                    <div className="absolute top-[30px] right-[40px] w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                    <div className="absolute bottom-[40px] left-[50px] w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
                    <div className="absolute top-[80px] left-[30px] w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]" />

                    <div className="relative z-10 w-12 h-12 bg-zinc-900 rounded-full border border-orange-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                      <Globe size={20} className="text-orange-500" />
                      <div className="absolute inset-0 rounded-full border border-orange-500/50" style={{ animation: "pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
                    </div>

                    <div className="absolute right-4 top-0 bottom-0 w-[1px] bg-white/5">
                      <div className="w-full h-10 bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent" style={{ animation: "data-stream 3s linear infinite" }} />
                    </div>
                  </div>

                  {/* Operational Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {[
                      { label: "Active Brands", count: "140+", color: "text-white" },
                      { label: "Rev Managed", count: "$32M+", color: "text-orange-400" },
                    ].map((svc, i) => (
                      <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center">
                        <p className={`text-xl font-black tracking-tighter leading-none mb-1 ${svc.color}`}>{svc.count}</p>
                        <p className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest">{svc.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* System Log */}
                  <div className="bg-black/50 rounded-xl border border-white/[0.04] p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-bold">System Telemetry Log</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[7px] font-mono text-emerald-400 uppercase tracking-widest">Active</span>
                      </div>
                    </div>
                    <div className="space-y-2 font-mono text-[9px]">
                      {[
                        { action: "PPC_BID_DEFENSE", target: "Top_Of_Search_ASINs", status: "text-emerald-400" },
                        { action: "SQP_HARVEST", target: "High_Intent_Queries", status: "text-orange-400" },
                        { action: "SUPPRESSION_CHECK", target: "Zero_Flagged_ASINs", status: "text-amber-400" },
                      ].map((log, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="text-zinc-400"><span className="text-orange-500">›</span> {log.action}</span>
                          <span className={`font-bold ${log.status}`}>{log.target}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Terminal Footer */}
                <div className="px-6 py-4 border-t border-white/[0.05] flex justify-between items-center">
                  <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest">ALL REGIONS NOMINAL (US | CA | UK | EU)</span>
                  <span className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest">GROW_ORBIT_OS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          HERO IMAGE STRIP
      ═══════════════════════════════════ */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 -mt-8 mb-0 relative z-10 scroll-in">
        <div className="relative rounded-[32px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.12)] border border-zinc-200 bg-zinc-900 h-[320px] md:h-[420px]">
          <Image
            src="/images/about/ecommerce-amazon-agency-war-room.avif"
            alt="Grow Orbit executive strategy meeting reviewing e-commerce metrics"
            fill
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/85 via-zinc-950/30 to-transparent" />
          <div className="absolute bottom-8 left-6 sm:left-10 z-10">
            <p className="text-orange-400 text-[9px] font-mono uppercase tracking-[0.4em] mb-2 font-bold">Total Client Scale</p>
            <p className="text-white font-black text-2xl sm:text-3xl uppercase tracking-tight leading-tight">
              Managing over <span className="text-orange-400">$32M+</span> in<br />annual Amazon revenue.
            </p>
          </div>
          <div className="absolute top-6 right-6 sm:right-8 flex flex-col gap-2 z-10">
            {[
              { label: "Amazon-Only Agency", color: "#f97316" },
              { label: "Monthly Rolling Agreements", color: "#4ade80" },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3.5 py-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: b.color }} />
                <span className="text-[9px] font-bold uppercase tracking-widest text-white">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════
          STATS ROW
      ═══════════════════════════════════ */}
      <section className="py-16 sm:py-20 px-6 lg:px-12 scroll-in">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-zinc-950 rounded-[32px] overflow-hidden border border-white/5 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06]">
              {STATS.map((s, i) => (
                <div key={i} className="p-6 sm:p-10 group hover:bg-orange-500/5 transition-colors duration-500 text-center">
                  <p className="font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tighter mb-1 group-hover:text-orange-400 transition-colors">
                    {s.val}
                  </p>
                  <p className="text-zinc-200 font-black text-[9px] sm:text-[11px] uppercase tracking-widest mb-1">{s.label}</p>
                  <p className="text-zinc-500 text-[8px] sm:text-[9px] font-mono uppercase tracking-widest">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          LEADERSHIP & PRACTITIONER SPOTLIGHT
      ═══════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-6 lg:px-12 bg-white border-y border-zinc-200/60 scroll-in">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-16">
            <SectionLabel>Leadership & Foundations</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-zinc-950">
              Built by operators,<br />
              <span className="italic font-light text-zinc-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                not pitch artists.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* CEO Image Container */}
            <div className="lg:col-span-5 flex justify-center">
              <div 
                className="relative group w-full max-w-[420px] aspect-[4/5] rounded-[36px] overflow-hidden bg-zinc-100 transition-all duration-300 shadow-[0_25px_60px_rgba(0,0,0,0.12)] border-2 border-white"
              >
                <Image
                  src={optimizeCloudinaryUrl("https://res.cloudinary.com/dciggvulg/image/upload/v1784040763/grow_orbit_ceo_pics/ali.avif", 600)}
                  alt="Coach Ali Haider - Founder & CEO of Grow Orbit"
                  fill
                  sizes="(max-width: 640px) 90vw, 420px"
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl">
                  <p className="text-white font-black text-base uppercase tracking-wider">Coach Ali Haider</p>
                  <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mt-0.5">Founder & CEO, Grow Orbit</p>
                </div>
              </div>
            </div>

            {/* CEO Message & Mission */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 font-bold uppercase tracking-[0.2em] text-[10px] mb-6">
                <Quote size={12} className="rotate-180 text-orange-600" /> Founder's Directive
              </div>
              
              <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase leading-tight mb-8">
                Moving Through Amazon <br/>
                <span className="text-orange-600 italic font-light normal-case" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Like Water.
                </span>
              </h3>

              <div className="space-y-5 text-zinc-600 text-base sm:text-lg leading-relaxed font-light">
                <p>
                  I didn't start selling on Amazon because someone showed me a laptop screen full of vanity numbers. I started because I watched ordinary people <span className="text-zinc-950 font-semibold">build tangible wealth out of raw conviction</span>, and I wanted to master every gear inside the engine.
                </p>
                <p>
                  Most agencies treat Amazon like an isolated spreadsheet. They run PPC campaigns that burn budget because they never looked at whether the product's creative was ready to convert. Or they outsource listing work to junior freelancers who have never inspected an assembly line or negotiated a supplier contract.
                </p>
                <p>
                  Grow Orbit was founded on the opposite philosophy: <span className="text-zinc-950 font-semibold">move like water</span>. Find the path of least resistance. Combine on-the-ground manufacturing truth with ruthless algorithmic PPC and high-converting visual engineering. When every system is aligned under one roof, growth isn't an accident: it is an inevitability.
                </p>
              </div>

              {/* Founder Sign-off */}
              <div className="mt-8 pt-6 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-black text-zinc-950 uppercase tracking-tight text-lg">Coach Ali Haider</p>
                  <span className="inline-block px-2.5 py-0.5 rounded bg-zinc-950 text-orange-400 text-[10px] font-mono font-bold uppercase tracking-widest mt-1">Founder & CEO</span>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href="/get-started"
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-zinc-900 text-white text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-colors no-underline"
                  >
                    Schedule Strategy Call <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════
          ON-THE-GROUND GLOBAL SOURCING
      ═══════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-12 bg-[#fafafa] scroll-in">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <SectionLabel>Global Footprint & Supply Chain</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] text-zinc-950">
                On the ground.<br />
                <span className="italic font-light text-zinc-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Inside the factories.
                </span>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollCarousel("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className="w-11 h-11 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel("right")}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className="w-11 h-11 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex gap-6 overflow-x-auto no-scrollbar pb-6 pt-2 snap-x snap-mandatory"
          >
            {SOURCING_PICS.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImage(item)}
                className="group relative min-w-[280px] sm:min-w-[340px] md:min-w-[380px] h-[460px] rounded-[28px] overflow-hidden bg-zinc-900 border border-zinc-200 cursor-pointer snap-start transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
              >
                <Image
                  src={optimizeCloudinaryUrl(item.img, 700)}
                  alt={item.title}
                  fill
                  sizes="380px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-full px-3 py-1 border border-white/10 text-[9px] font-mono text-white uppercase tracking-widest">
                  Verified Trip
                </div>

                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <h4 className="text-white font-black text-lg uppercase tracking-tight mb-2 group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-zinc-300 text-xs font-light leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Modal for Sourcing Photos */}
      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-orange-500 transition-colors"
            >
              <X size={18} />
            </button>
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={optimizeCloudinaryUrl(activeImage.img, 1200)}
                alt={activeImage.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-6 sm:p-8 bg-zinc-950 text-white">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-2 text-white">
                {activeImage.title}
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
                {activeImage.desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════
          THE 3-PILLAR OPERATING SYSTEM
      ═══════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-12 bg-white border-y border-zinc-200/60 scroll-in">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <SectionLabel>The Grow Orbit Methodology</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] text-zinc-950">
                The three-pillar<br />
                <span className="italic font-light text-zinc-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                  operating system.
                </span>
              </h2>
            </div>
            <p className="text-zinc-500 font-light max-w-sm md:text-right text-sm leading-relaxed">
              We eliminated fragmented vendor silos. Every creative decision directly empowers PPC ranking efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PILLARS.map((p, i) => (
              <div
                key={i}
                className="group relative bg-[#fafafa] border border-zinc-200/80 rounded-[32px] p-8 sm:p-10 hover:border-orange-500/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs font-bold text-orange-600 uppercase tracking-widest">{p.tag}</span>
                    <span className="font-mono text-xs font-black text-zinc-300 uppercase tracking-[0.3em]">{p.num}</span>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-500">
                    {p.icon}
                  </div>

                  <h3 className="font-black text-xl uppercase tracking-tight text-zinc-950 mb-3">{p.title}</h3>
                  <p className="text-zinc-600 text-sm font-light leading-relaxed mb-6">{p.desc}</p>
                </div>

                <div className="pt-6 border-t border-zinc-200 flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-bold">Standard Outcome</span>
                  <span className="text-xs font-black uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                    {p.metrics}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════
          OPERATIONAL EXCELLENCE SPLIT
      ═══════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-12 scroll-in">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Left image card */}
            <div className="relative rounded-[32px] overflow-hidden min-h-[500px] border border-zinc-200 shadow-lg">
              <Image
                src="/images/about/amazon-operations-command-station.avif"
                alt="Grow Orbit Amazon Seller Central and PPC command center dashboard"
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover min-h-[350px] lg:min-h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-5">
                  <p className="text-[9px] font-mono text-orange-400 uppercase tracking-[0.3em] mb-3 font-bold">The Full Service Advantage</p>
                  <div className="space-y-2.5">
                    {[
                      "Listing Management & Conversion Optimisation",
                      "PPC Bid Architecture at Multi-Region Scale",
                      "Global Commerce: US, CA, UK, EU & JP Active",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <CheckCircle2 size={13} className="text-orange-500 shrink-0" />
                        <span className="text-white text-[11px] font-bold uppercase tracking-widest">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right content card */}
            <div className="bg-white rounded-[32px] border border-zinc-200/80 p-10 md:p-14 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
              <div>
                <SectionLabel>Our Edge</SectionLabel>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] text-zinc-950 mb-6">
                  Operational<br />
                  <span className="italic font-light text-zinc-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Excellence.
                  </span>
                </h2>
                <p className="text-zinc-600 text-base font-light leading-relaxed mb-8">
                  We do not just optimize listings: we engineer brand equity. By synchronizing factory supply chain realities with high-converting 3D creative and disciplined PPC bid structures, we force organic rank acceleration without margin erosion.
                </p>

                {/* Metric progress rows */}
                <div className="space-y-5 mb-10">
                  {[
                    { label: "Average ACoS Reduction at 90 days",  val: "-38%",   width: "88%" },
                    { label: "ASINs reaching Page 1 in 60 days",    val: "84%",    width: "84%" },
                    { label: "Client retention after 6 months",     val: "89%",    width: "89%" },
                    { label: "Average revenue lift in 90 days",     val: "+38%",   width: "85%" },
                  ].map((m, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className="flex-1 order-3 sm:order-1 h-[4px] bg-zinc-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                          style={{ width: m.width }}
                        />
                      </div>
                      <div className="flex items-center justify-between sm:contents order-2">
                        <span className="text-zinc-950 font-black text-sm sm:w-20 text-right shrink-0">{m.val}</span>
                        <span className="text-zinc-400 text-[9px] font-mono uppercase tracking-widest sm:w-56 shrink-0">{m.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Audited Growth Metric</span>
                <Link
                  href="/case-study"
                  className="inline-flex items-center gap-1.5 text-orange-600 hover:text-zinc-950 font-bold text-xs uppercase tracking-wider no-underline transition-colors"
                >
                  Inspect Case Studies <ArrowRight size={13} />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          VALUES / OPERATING PRINCIPLES
      ═══════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-12 bg-white border-y border-zinc-200/60 scroll-in">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Sticky Left Column */}
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <SectionLabel>How We Operate</SectionLabel>
              <h2 className="text-4xl font-black tracking-tighter uppercase leading-[0.9] text-zinc-950 mb-6">
                Why brands<br />
                <span className="italic font-light text-zinc-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                  stay.
                </span>
              </h2>
              <p className="text-zinc-600 text-sm font-light leading-relaxed mb-8">
                Every agency promises results. These are the operating principles that explain why 89% of our brand partners are still with us after six months.
              </p>
              <Link
                href="/case-study"
                className="inline-flex items-center gap-2 text-orange-600 font-black text-[11px] uppercase tracking-widest hover:gap-4 transition-all no-underline"
              >
                See the proof <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right Column: Values */}
            <div className="lg:col-span-8 space-y-4">
              {VALUES.map((v, i) => (
                <div
                  key={i}
                  className="group bg-[#fafafa] border border-zinc-200/80 rounded-[24px] p-6 sm:p-8 hover:border-orange-500/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all duration-500 cursor-default"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-[0.3em] shrink-0 mt-1">{v.num}</span>
                    <div className="flex-1">
                      <h3 className="font-black text-zinc-950 uppercase tracking-tight text-base mb-2">{v.title}</h3>
                      <p className="text-zinc-600 text-sm font-light leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          CLIENT PROOF STRIP
      ═══════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-12 bg-zinc-950 text-white scroll-in">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel light>Audited Primary Proof</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              Verified results across<br />
              <span className="italic font-light text-orange-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                published case studies.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROOF_CASES.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/[0.03] border border-white/[0.08] rounded-[28px] p-8 flex flex-col justify-between hover:border-orange-500/30 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">{item.brand}</span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{item.category}</span>
                  </div>

                  <p className="text-2xl font-black text-orange-400 tracking-tight mb-1">{item.stat}</p>
                  <p className="text-zinc-400 text-xs font-mono uppercase tracking-wider mb-6">{item.sub}</p>

                  <p className="text-zinc-300 text-sm font-light leading-relaxed italic mb-6">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{item.author}</span>
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-1 text-orange-400 hover:text-white text-xs font-bold uppercase tracking-wider no-underline transition-colors"
                  >
                    View Case <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════
          CTA STRIP
      ═══════════════════════════════════ */}
      <section className="py-12 sm:py-20 px-6 lg:px-12 scroll-in">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-zinc-950 rounded-[32px] sm:rounded-[40px] p-10 sm:p-20 relative overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(249,115,22,0.12),transparent_65%)]" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
              <div className="max-w-xl">
                <p className="text-orange-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-4 font-bold">Done managing. Time to grow.</p>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white leading-[0.88] mb-4">
                  Stop managing.<br />
                  <span className="italic font-light text-zinc-500" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Start growing.
                  </span>
                </h2>
                <p className="text-zinc-400 text-base font-light leading-relaxed">
                  If your brand is ready to offload daily Amazon friction and unlock 7-figure velocity, Grow Orbit is your next operations command centre.
                </p>
              </div>
              <div className="flex flex-col items-stretch gap-3 shrink-0 w-full md:w-fit">
                <Link
                  href="/get-started"
                  className="flex items-center justify-center gap-3 bg-orange-500 hover:bg-white hover:text-zinc-950 text-white font-black text-[11px] uppercase tracking-widest px-10 py-5 rounded-full transition-all duration-300 shadow-[0_8px_30px_rgba(249,115,22,0.4)] no-underline whitespace-nowrap w-full"
                >
                  Book Free Strategy Call <ArrowRight size={14} />
                </Link>
                <Link
                  href="/case-study"
                  className="flex items-center justify-center gap-2 border border-white/10 hover:border-white/25 text-zinc-300 hover:text-white font-bold text-[11px] uppercase tracking-widest px-10 py-5 sm:py-4 rounded-full transition-all duration-300 no-underline whitespace-nowrap w-full"
                >
                  View Case Studies <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
