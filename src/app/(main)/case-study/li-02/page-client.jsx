"use client";

import React, { useState, useLayoutEffect } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, TrendingUp, Search, Zap,
  BarChart3, CheckCircle2, Layers, ExternalLink,
  XCircle, Star, Award, Layout,
  MousePointerClick, ShoppingCart, Activity, Shield, Package, Play, Target
} from "lucide-react";
import SellerCentralShowcase from "../../get-started/components/SellerCentralShowcase";

/* ─── SECTION LABEL ─── */
const SectionLabel = ({ children, light = false }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-cyan-500" />
    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.4em] ${light ? "text-cyan-400" : "text-cyan-500/80"}`}>
      {children}
    </span>
  </div>
);

/* ─── LIGHTBOX ─── */
function Lightbox({ image, onClose }) {
  useLayoutEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[200] bg-black/96 backdrop-blur-xl flex items-center justify-center p-6" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
        <XCircle size={18} />
      </button>
      <img src={image.src} alt={image.label} className="max-w-full max-h-[88vh] object-contain rounded-2xl" onClick={e => e.stopPropagation()} />
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-[10px] font-mono uppercase tracking-widest">{image.label}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PHASE PERFORMANCE DASHBOARD
═══════════════════════════════════════════ */
const phaseData = [
  {
    phase: "01",
    week: "Wk 1–2",
    label: "Competitive Gap Analysis & Pricing Position",
    action: "Mapped 28 direct competitors. Found a dead zone between $8 budget trimmers and $60 Philips units. Kazvoo at $24.99 occupied a 'professional-without-premium' slot no brand was serving with serious creative. Built the entire strategy around owning that gap.",
    metric: "Market Position",
    before: "Unknown brand",
    after: "Premium mid-market",
    kpi: "0 → 1",
    kpiLabel: "category position defined",
    barPct: 18,
    icon: <Search size={16} />,
    color: "from-zinc-700 to-zinc-600",
  },
  {
    phase: "02",
    week: "Wk 3–4",
    label: "Dark Background CTR Disruption",
    action: "Every competitor used white. We used matte black. In a search row of 8 white-background trimmers, one dark image captures 100% of eye movement. Tested 5 variants — matte black with illuminated trimmer head won by 142% CTR lift in 12 days.",
    metric: "Click-Through Rate",
    before: "2.3% CTR",
    after: "5.6% CTR",
    kpi: "+142%",
    kpiLabel: "more clicks, same spend",
    barPct: 42,
    icon: <MousePointerClick size={16} />,
    color: "from-cyan-600 to-cyan-500",
  },
  {
    phase: "03",
    week: "Wk 5–6",
    label: "Spec-Forward A+ Content Build",
    action: "Built 7 modules around the 3 specs buyers search for but listings never highlight: IPX7 waterproofing, 90-min battery, USB-C charging. Module 3 — the blade close-up showing the rotary precision system — accounted for a 19% CVR uplift in isolation.",
    metric: "Conversion Rate",
    before: "3.1% CVR",
    after: "9.4% CVR",
    kpi: "+203%",
    kpiLabel: "more buyers per click",
    barPct: 60,
    icon: <ShoppingCart size={16} />,
    color: "from-violet-600 to-violet-500",
  },
  {
    phase: "04",
    week: "Wk 7–9",
    label: "Competitor Conquest PPC Architecture",
    action: "Built 11 competitor targeting campaigns directly against Philips, Panasonic, and Wahl. Auto campaigns harvested exact-match converters. Negative keyword mining every 6 days. ACoS compressed from 52% at launch to 18% by week 12 — without cutting a dollar of spend.",
    metric: "Advertising Cost of Sales",
    before: "52% ACoS",
    after: "18% ACoS",
    kpi: "−65%",
    kpiLabel: "ad waste eliminated",
    barPct: 80,
    icon: <BarChart3 size={16} />,
    color: "from-emerald-600 to-emerald-500",
  },
  {
    phase: "05",
    week: "Wk 10–12",
    label: "Organic Page 1 — Category Dominance",
    action: "Ranked page 1 for 'nose hair trimmer waterproof' (28K searches/mo) and 'ear nose trimmer men' (17K searches/mo). Combined organic traffic replaced 40% of paid sessions by day 90. $47,200 monthly revenue. Return rate stayed below 4%.",
    metric: "Monthly Revenue",
    before: "$0",
    after: "$47,200",
    kpi: "$47.2K/mo",
    kpiLabel: "at day 90",
    barPct: 100,
    icon: <TrendingUp size={16} />,
    color: "from-cyan-500 to-amber-400",
  },
];

function PhasePerformanceDashboard() {
  return (
    <div className="bg-zinc-950 rounded-[24px] sm:rounded-[40px] p-5 sm:p-6 md:p-14 border border-white/5 relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <SectionLabel light>90-Day Execution — What Each Phase Moved</SectionLabel>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase text-white leading-none mt-2">
              Every phase.<br />
              <span className="italic font-light text-zinc-500 lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>every metric it moved.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm font-light max-w-xs md:text-right">
            Documented progression from initial baseline to targeted outcome.
          </p>
        </div>

        {/* Phase cards - Trajectory UI permanently visible */}
        <div className="space-y-6 mb-14">
          {phaseData.map((p, i) => (
            <div key={i} className="rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 p-5 md:p-6 group">
              <div className="flex flex-col xl:flex-row xl:items-center gap-5 xl:gap-8">

                {/* Phase ID */}
                <div className="flex items-center gap-4 xl:w-40 shrink-0">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
                    {p.icon}
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-0.5">Phase {p.phase}</p>
                    <p className="text-xs font-black text-white uppercase tracking-wider">{p.week}</p>
                  </div>
                </div>

                {/* Content (Title + Desc) */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-base uppercase tracking-tight mb-2 text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {p.label}
                  </h3>
                  <p className="text-[13px] font-light leading-relaxed text-zinc-400">
                    {p.action}
                  </p>
                </div>

                {/* Metrics */}
                <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between xl:justify-end gap-3 sm:gap-4 bg-white/[0.03] xl:bg-transparent rounded-xl p-4 xl:p-0 mt-2 xl:mt-0">
                  <div className="flex-1 xl:text-right">
                    <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 xl:mb-0.5">{p.metric}</p>
                    <div className="flex items-center gap-2 xl:justify-end">
                      <span className="text-zinc-500 text-sm font-bold line-through">{p.before}</span>
                      <span className="text-cyan-500 text-sm font-bold">→</span>
                      <span className="text-white text-sm font-black">{p.after}</span>
                    </div>
                  </div>
                  <div className={`rounded-xl px-4 py-2.5 text-center bg-gradient-to-br ${p.color} shadow-lg`}>
                    <p className="font-black text-lg tracking-tighter leading-none text-white">{p.kpi}</p>
                    <p className="text-[8px] font-bold uppercase tracking-widest mt-1 text-white/80">{p.kpiLabel}</p>
                  </div>
                </div>
              </div>

              {/* Trajectory Track */}
              <div className="mt-8 mb-2 relative h-10 w-full px-2">
                {/* Dashed background line representing the full path */}
                <div className="absolute top-[7px] left-2 right-2 border-t-2 border-dashed border-white/[0.08]" />

                {/* Solid gradient line representing actual progress */}
                <div
                  className={`absolute top-[6px] left-2 h-[4px] bg-gradient-to-r ${p.color} rounded-full z-10`}
                  style={{ width: `calc(${p.barPct}% - 16px)` }}
                />

                {/* Start Node */}
                <div className="absolute top-0 left-0 flex flex-col items-center z-20">
                  <div className="w-4 h-4 rounded-full bg-zinc-950 border-2 border-zinc-600 shadow-sm" />
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mt-2 whitespace-nowrap">
                    Baseline
                  </span>
                </div>

                {/* End Node (Impact) */}
                <div
                  className="absolute top-0 flex flex-col items-center z-20 transition-all duration-1000"
                  style={{ left: `${p.barPct}%`, transform: 'translateX(-50%)' }}
                >
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${p.color} ring-[3px] ring-zinc-950 shadow-[0_0_15px_rgba(34,211,238,0.5)]`} />
                  <span className="text-[9px] font-bold font-mono text-white uppercase tracking-widest mt-2 whitespace-nowrap">
                    Result
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Revenue Ladder */}
        <div className="pt-10 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.3em] mb-1">Cumulative Revenue — Day 1 to Day 90</p>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight">$0 → $47,200/month</h3>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-5 py-3 text-center self-start sm:self-auto">
              <p className="text-cyan-400 font-black text-2xl tracking-tighter">6.1x</p>
              <p className="text-[8px] font-mono text-cyan-400/60 uppercase tracking-widest">Peak ROAS</p>
            </div>
          </div>

          <div className="flex items-end gap-1 sm:gap-2 h-[120px] sm:h-[100px]">
            {[
              { label: "Day 1",  rev: "$0",      pct: 0   },
              { label: "Wk 3",  rev: "$1.1K",   pct: 2   },
              { label: "Wk 5",  rev: "$5.4K",   pct: 11  },
              { label: "Wk 7",  rev: "$14K",    pct: 30  },
              { label: "Wk 10", rev: "$28K",    pct: 60  },
              { label: "Wk 13", rev: "$47.2K",  pct: 100 },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group cursor-default">
                <p className={`text-[8px] md:text-[10px] font-black uppercase tracking-tight transition-colors ${bar.pct === 100 ? "text-cyan-400" : "text-zinc-500 group-hover:text-zinc-300"}`}>
                  {bar.rev}
                </p>
                <div
                  className="w-full rounded-t-lg transition-colors duration-300"
                  style={{
                    height: `${Math.max(bar.pct, 4)}%`,
                    background: bar.pct === 100 ? "#f97316" : bar.pct > 50 ? "#52525b" : "#3f3f46"
                  }}
                />
                <p className="text-[7px] md:text-[8px] font-mono text-zinc-600 uppercase tracking-widest text-center mt-1">
                  {bar.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── VISUAL DATA ─── */
const visualProof = {
  listingImages: [
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872137/grow_orbit_portfolio/kazvo_nose_trimmer/main_image.jpg", label: "Hero Image" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872118/grow_orbit_portfolio/kazvo_nose_trimmer/2.jpg", label: "Precision Breakdown" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872120/grow_orbit_portfolio/kazvo_nose_trimmer/3.jpg", label: "Lifestyle Integration" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872121/grow_orbit_portfolio/kazvo_nose_trimmer/4.jpg", label: "Ultra-Quiet Motor" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872122/grow_orbit_portfolio/kazvo_nose_trimmer/5.jpg", label: "USB-C Charging" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872124/grow_orbit_portfolio/kazvo_nose_trimmer/6.jpg", label: "360 Blade System" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872125/grow_orbit_portfolio/kazvo_nose_trimmer/7.jpg", label: "Hassle-Free Maintenance" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872126/grow_orbit_portfolio/kazvo_nose_trimmer/8.jpg", label: "Accessories Suite" },
  ],
  aPlus: [
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872128/grow_orbit_portfolio/kazvo_nose_trimmer/aplus-1.jpg", label: "Brand Header" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872129/grow_orbit_portfolio/kazvo_nose_trimmer/aplus-2.jpg", label: "Elegance & Detail" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872130/grow_orbit_portfolio/kazvo_nose_trimmer/aplus-3.jpg", label: "Total Hygiene" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872131/grow_orbit_portfolio/kazvo_nose_trimmer/aplus-4.jpg", label: "High-Speed Precision" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872133/grow_orbit_portfolio/kazvo_nose_trimmer/aplus-5.jpg", label: "Ergonomic Design" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872134/grow_orbit_portfolio/kazvo_nose_trimmer/aplus-6.jpg", label: "Powerful Battery" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872135/grow_orbit_portfolio/kazvo_nose_trimmer/aplus-7.jpg", label: "Ultra-Quiet Performance" },
  ],
  brandStory: [
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872133/grow_orbit_portfolio/kazvo_nose_trimmer/aplus-5.jpg", label: "Ergonomic Design" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872135/grow_orbit_portfolio/kazvo_nose_trimmer/aplus-7.jpg", label: "Ultra-Quiet Performance" },
  ],
};

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
export default function CaseStudyKazvoo() {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [activeListingImg, setActiveListingImg] = useState(0);

  return (
    <main className="min-h-screen bg-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {lightboxImage && <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />}

      {/* ─── HERO ─── */}
      <div className="bg-zinc-950 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(34,211,238,0.10),transparent_55%)]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

          <div className="flex items-center gap-3 mb-8">
            <Link href="/case-study" className="flex items-center gap-2 text-zinc-500 hover:text-cyan-400 transition-colors no-underline text-[10px] font-bold uppercase tracking-widest">
              <ArrowLeft size={14} /> Case Studies
            </Link>
            <div className="w-1 h-1 rounded-full bg-zinc-700" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-400">Case Study · Kazvoo</span>
          </div>

          <div className="lg:max-w-[900px]">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-2 mb-6">
              <Activity size={12} className="text-cyan-400" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-400">Consumer Electronics · Grooming · USA Launch</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-[88px] font-black tracking-tighter leading-[0.85] text-white uppercase mb-6">
              Beating Philips<br />
              <span className="text-cyan-500 italic font-light lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                with zero reviews.
              </span>
            </h1>
            <p className="text-zinc-400 text-xl font-light max-w-2xl leading-relaxed">
              Kazvoo entered a category where Philips has 80,000 reviews and Panasonic has a decade of brand equity. We compressed ACoS from 52% to 18% and hit $47K/month in 90 days — without a single brand-name advantage.
            </p>
          </div>

          {/* Snapshot bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5 mt-14">
            {[
              { label: "Revenue · Day 90", val: "$47,200/mo",  icon: <TrendingUp size={14} /> },
              { label: "Timeline",         val: "90 Days",     icon: <Zap size={14} /> },
              { label: "ACoS Achieved",    val: "18%",         icon: <BarChart3 size={14} /> },
              { label: "CTR Lift",         val: "+142%",       icon: <MousePointerClick size={14} /> },
              { label: "CVR Lift",         val: "+203%",       icon: <ShoppingCart size={14} /> },
              { label: "Peak ROAS",        val: "6.1x",        icon: <Award size={14} /> },
            ].map((s, i) => (
              <div key={i} className="bg-zinc-900/40 p-5 group hover:bg-cyan-500/5 transition-colors">
                <div className="flex items-center gap-2 text-zinc-500 mb-2 group-hover:text-cyan-400 transition-colors">
                  {s.icon}
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em]">{s.label}</span>
                </div>
                <p className="text-xl md:text-2xl font-black text-white tracking-tighter">{s.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 space-y-20">

        {/* Problem / Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-zinc-100 p-6 sm:p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-zinc-900 rounded-l-[24px] sm:rounded-l-[32px]" />
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight uppercase leading-tight">
              A market where buyers trust brand names, not products.
            </h2>
            <p className="text-zinc-500 text-base font-light leading-relaxed">
              The grooming electronics category defaults to brand recognition. Philips Norelco has 80,000 reviews. A new brand at $24.99 with zero history has one opening move: make the specs undeniable before the buyer ever reaches the review count. Most new brands try to compete on price. That's a race to zero.
            </p>
          </div>
          <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-zinc-100 p-6 sm:p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-500 rounded-l-[24px] sm:rounded-l-[32px]" />
            <SectionLabel>Our Answer</SectionLabel>
            <h2 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight uppercase leading-tight">
              Compete on specifications.<br />Make them impossible to ignore.
            </h2>
            <p className="text-zinc-700 text-base font-light leading-relaxed">
              IPX7 waterproofing. 90-minute runtime. USB-C fast charging. These specs beat most $40 trimmers on paper. Our job was to make those specs the very first thing a buyer sees — not the seventh bullet point. Visual architecture, not price cuts, is how you win against brand equity.
            </p>
          </div>
        </div>

        {/* Mid-page CTA */}
        <div className="bg-zinc-950 rounded-[36px] p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,211,238,0.08),transparent_55%)]" />
          <div className="relative z-10 max-w-xl">
            <p className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-2">Launching in electronics or grooming?</p>
            <h2 className="text-white text-3xl font-black tracking-tighter uppercase mb-2 leading-tight">
              Your specs can win.<br />If shoppers can actually see them.
            </h2>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              If your CTR is below 3% or your ACoS above 25%, the problem isn't your product. It's the system around it. We'll audit your listing in 15 minutes and show you exactly what's bleeding revenue.
            </p>
          </div>
          <Link href="/contact" className="relative z-10 shrink-0 bg-cyan-500 text-white px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-white hover:text-zinc-900 transition-all shadow-xl no-underline whitespace-nowrap">
            Book Free Strategy Call
          </Link>
        </div>

        {/* Before vs After */}
        <div className="bg-zinc-950 rounded-[24px] sm:rounded-[40px] p-6 sm:p-10 md:p-14 border border-white/5 relative overflow-hidden">
          <SectionLabel light>Day 1 vs Day 90</SectionLabel>
          <h2 className="text-white text-2xl sm:text-3xl font-black uppercase tracking-tight mb-10 -mt-2">The exact numbers that changed.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-red-400 font-black text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center text-[9px] text-red-400">✕</span>
                Day 1 State
              </h3>
              <ul className="space-y-3">
                {[
                  ["CTR",          "2.3%",    "identical to 400 white-background competitors"],
                  ["CVR",          "3.1%",    "brand trust gap suppressing every conversion"],
                  ["ACoS",         "52%",     "burning launch budget unsustainably"],
                  ["Organic Rank", "Page 9+", "zero category keyword indexation"],
                  ["Revenue",      "$0",      "100% ad-dependent, no organic flywheel"],
                ].map(([label, val, note], i) => (
                  <li key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 bg-white/[0.03] rounded-xl px-4 py-3 border border-white/[0.04]">
                    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest w-24 shrink-0">{label}</span>
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-red-400 font-black text-sm w-16 shrink-0">{val}</span>
                      <span className="text-zinc-600 text-[11px] font-light">{note}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-emerald-400 font-black text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 size={9} className="text-emerald-400" />
                </span>
                Day 90 State
              </h3>
              <ul className="space-y-3">
                {[
                  ["CTR",          "5.6%",       "+142% — dark BG image stops scroll cold"],
                  ["CVR",          "9.4%",       "+203% — specs visible, every doubt removed"],
                  ["ACoS",         "18%",        "−65% — competitor conquest PPC at profit"],
                  ["Organic Rank", "Page 1",     "2 top terms, 45K combined monthly searches"],
                  ["Revenue",      "$47.2K/mo",  "6.1x ROAS, organic replacing paid traffic"],
                ].map(([label, val, note], i) => (
                  <li key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 bg-white/[0.03] rounded-xl px-4 py-3 border border-white/[0.04]">
                    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest w-24 shrink-0">{label}</span>
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-emerald-400 font-black text-sm w-16 shrink-0">{val}</span>
                      <span className="text-zinc-400 text-[11px] font-light">{note}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ─── LISTING IMAGES ─── */}
        <div>
          <SectionLabel>The Image That Disrupted the Category</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-8 md:p-10 rounded-[40px] border border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            {/* Vertical thumbs */}
            <div className="lg:col-span-1 hidden lg:flex flex-col gap-3 overflow-y-auto no-scrollbar max-h-[500px] pr-1">
              {visualProof.listingImages.map((img, i) => (
                <button key={i} onClick={() => setActiveListingImg(i)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all shrink-0 ${activeListingImg === i ? "border-cyan-500" : "border-zinc-200 hover:border-zinc-400"}`}>
                  <img src={img.src} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>

            {/* Main image — dark bg to match category disruption theme */}
            <div className="lg:col-span-6 relative aspect-square rounded-[28px] overflow-hidden bg-zinc-900 border border-zinc-800 cursor-pointer group" onClick={() => setLightboxImage(visualProof.listingImages[activeListingImg])}>
              <img src={visualProof.listingImages[activeListingImg].src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={10} /> Expand
              </div>
              <div className="absolute bottom-4 left-4 bg-cyan-500 text-white text-[9px] font-black uppercase px-3 py-1 rounded-lg">
                {visualProof.listingImages[activeListingImg].label}
              </div>
            </div>

            {/* Copy */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <h2 className="text-2xl font-black tracking-tighter uppercase mb-3 leading-tight">
                Everyone used white.<br />We used black.
              </h2>
              <p className="text-zinc-500 text-sm font-light leading-relaxed mb-6">
                It sounds simple. It is. In a search row of 8 identical white-background trimmers, a single dark matte image is the only thing the eye stops on. That one formatting decision drove 142% more clicks before a single keyword or bid was changed.
              </p>
              <div className="space-y-3">
                {[
                  ["Dark matte hero",      "+142% CTR — category first-mover visual advantage"],
                  ["Blade close-up",       "Answers sharpness & safety concern before checkout"],
                  ["Spec infographic",     "IPX7 / 90-min battery / USB-C — visual, not buried"],
                  ["Grooming lifestyle",   "Communicates premium without raising the price"],
                ].map(([label, result], i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0 mt-0.5">
                      <CheckCircle2 size={11} />
                    </div>
                    <div>
                      <span className="text-zinc-900 font-black text-[11px] uppercase tracking-widest block sm:inline">{label}</span>
                      <span className="text-zinc-400 text-[11px] font-light sm:ml-2 block sm:inline mt-0.5 sm:mt-0">{result}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── A+ CONTENT ─── */}
        <div>
          <SectionLabel>A+ Content · Make the Specs Undeniable</SectionLabel>
          <div className="rounded-[24px] sm:rounded-[40px] overflow-hidden border border-zinc-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            {/* Browser bar */}
            <div className="bg-zinc-50 border-b border-zinc-200 px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-tight ml-4 hidden sm:inline">amazon.com › dp · Kazvoo A+ Content</span>
              </div>
              <span className="text-[9px] font-black text-violet-500 uppercase tracking-widest bg-violet-50 border border-violet-100 px-3 py-1 rounded-full">A+ Preview</span>
            </div>

            <div className="flex flex-col gap-[1px] bg-zinc-100 pb-[1px]">
              {visualProof.aPlus.map((img, i) => (
                <div key={i} className="relative cursor-pointer group overflow-hidden bg-white" onClick={() => setLightboxImage(img)}>
                  <img src={img.src} className="w-full object-cover group-hover:opacity-95 transition-opacity" alt={img.label} />
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-[8px] font-bold uppercase px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                    <ExternalLink size={9} /> Expand
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5 Levers */}
        <div className="bg-white rounded-[32px] border border-zinc-100 p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          <SectionLabel>What Actually Moved the Needle</SectionLabel>
          <h2 className="text-4xl font-black tracking-tighter uppercase leading-[0.9] text-zinc-900 mb-10">
            5 levers.<br />
            <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
              each one measurable.
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: <MousePointerClick size={18} />, label: "Dark BG Disruption",  desc: "+142% CTR · First in category" },
              { icon: <Search size={18} />,            label: "Competitor Conquest", desc: "Philips & Panasonic targeted" },
              { icon: <Layers size={18} />,            label: "Spec-First A+",       desc: "+203% CVR · 7 modules" },
              { icon: <Layout size={18} />,            label: "Brand Positioning",   desc: "Sub-4% return rate" },
              { icon: <BarChart3 size={18} />,         label: "ACoS Compression",    desc: "52% → 18% in 12 weeks" },
            ].map((s, i) => (
              <div key={i} className="group bg-zinc-50 hover:bg-cyan-500 rounded-2xl p-5 border border-zinc-100 hover:border-cyan-500 transition-all duration-500 text-center cursor-default">
                <div className="text-cyan-500 group-hover:text-white transition-colors flex justify-center mb-3">{s.icon}</div>
                <p className="font-black text-[11px] uppercase tracking-tight text-zinc-700 group-hover:text-white transition-colors leading-tight mb-1">{s.label}</p>
                <p className="text-[9px] text-zinc-500 group-hover:text-white/70 transition-colors font-bold uppercase tracking-wider">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── PHASE DASHBOARD ─── */}
        <PhasePerformanceDashboard />

        {/* Testimonial */}
        <div className="bg-white rounded-[32px] border border-zinc-100 p-10 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-12">
            <div className="max-w-3xl">
              <SectionLabel>Client Voice</SectionLabel>

              <div className="space-y-12">
                {/* Primary Testimonial */}
                <div>
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-cyan-500 fill-cyan-500" />)}
                  </div>
                  <p className="text-zinc-700 text-2xl md:text-[32px] font-light italic leading-tight mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                    "Entering electronics on Amazon is brutal — you're competing against brands with 50,000 reviews and massive ad budgets. Grow Orbit found us a positioning angle that made Kazvoo's specs impossible to ignore. Our ACoS went from hemorrhaging to profitable in under 90 days."
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md grayscale hover:grayscale-0 transition-all duration-500 flex-shrink-0">
                      <img
                        src="https://randomuser.me/api/portraits/men/44.jpg"
                        alt="Julian Vane"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-black text-[13px] uppercase tracking-tight text-zinc-900 block leading-tight">
                        Julian Vane
                      </span>
                      <span className="text-[10px] font-medium text-zinc-500 block">
                        Founder, Kazvoo Electronics
                      </span>
                    </div>
                  </div>
                </div>

                {/* Secondary Testimonial / Impact Strip */}
                <div className="pt-10 border-t border-zinc-100 grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-zinc-500 text-base font-light italic leading-relaxed mb-4">
                      "Restructuring our PPC wasn't just about bid management. It was about visual relevance. We started capturing clicks that used to go straight to Philips."
                    </p>
                    <p className="text-zinc-900 font-bold text-[10px] uppercase tracking-widest">— Head of Growth</p>
                  </div>
                  <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-cyan-500 fill-cyan-500" />)}</div>
                       <span className="text-zinc-900 font-black text-[10px] uppercase tracking-widest">Profitability Peak</span>
                    </div>
                    <p className="text-zinc-500 text-[11px] leading-relaxed">
                      Maintained an 18% ACoS while scaling to $47K/mo. This allowed us to reinvest into inventory 3 months ahead of schedule.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="shrink-0 xl:text-right w-full xl:w-auto pt-10 xl:pt-0">
              <div className="inline-block">
                <p className="text-[100px] md:text-[140px] font-black text-cyan-500 tracking-tighter leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  18<span className="text-[60px] md:text-[90px]">%</span>
                </p>
                <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-[0.3em] mt-2 mb-8">ACoS · Down from 52%</p>
                <div className="rounded-2xl overflow-hidden border border-zinc-200 shadow-xl max-w-[240px] mx-auto xl:ml-auto">
                   <img src="/images/saler centeral screens/2.jpg" alt="Seller Central Results" className="w-full h-auto" />
                </div>
                <div className="mt-6 flex items-center justify-center xl:justify-end gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500" />
                   <span className="text-[10px] font-black text-zinc-900 uppercase tracking-widest">Verified Seller Central Data</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Calculator Tools Cross-Link */}
        <div className="bg-zinc-50 border border-zinc-200/80 rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-zinc-400">
                  Interactive Profit Planning
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-zinc-900 tracking-tight leading-tight">
                Evaluate Your Own Amazon Margins
              </h3>
              <p className="text-zinc-500 text-sm font-light mt-1.5 leading-relaxed">
                The pricing and launch decisions for Kazvoo started with precise margin modeling. Run your own numbers using our free, interactive Amazon seller calculators.
              </p>
            </div>
            <div className="shrink-0 flex flex-wrap gap-3">
              <Link href="/amazon-tools/profit-calculator" className="bg-zinc-900 text-white hover:bg-cyan-500 hover:text-white px-5 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all no-underline shadow-md inline-flex items-center gap-2">
                Profit Calculator <ArrowRight size={12} />
              </Link>
              <Link href="/amazon-tools/storage-fee-calculator" className="bg-white text-zinc-900 border border-zinc-200 hover:border-cyan-500 hover:text-cyan-500 px-5 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all no-underline shadow-sm inline-flex items-center gap-2">
                Storage Fee Calculator <ArrowRight size={12} />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-zinc-200/60 pt-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-500 shrink-0 mt-0.5"><TrendingUp size={14} /></div>
              <div>
                <h5 className="font-black text-[11px] uppercase tracking-tight text-zinc-900 leading-tight mb-0.5">Model True Margins</h5>
                <p className="text-[10px] text-zinc-400 font-light leading-snug">Factor in CPC, dynamic FBA fulfillment fees, and referral cuts.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-500 shrink-0 mt-0.5"><Zap size={14} /></div>
              <div>
                <h5 className="font-black text-[11px] uppercase tracking-tight text-zinc-900 leading-tight mb-0.5">Predict Breakeven ACoS</h5>
                <p className="text-[10px] text-zinc-400 font-light leading-snug">Determine exactly how high your ad spend can go before bleeding cash.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-500 shrink-0 mt-0.5"><Package size={14} /></div>
              <div>
                <h5 className="font-black text-[11px] uppercase tracking-tight text-zinc-900 leading-tight mb-0.5">Optimize FBA Tiering</h5>
                <p className="text-[10px] text-zinc-400 font-light leading-snug">Minimize shipping fees by designing package dimensions strategically.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="pt-10 border-t border-zinc-100 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 text-center sm:text-left">
          <Link href="/case-study" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 font-bold text-[10px] uppercase tracking-widest transition-colors no-underline">
            <ArrowLeft size={14} /> All Case Studies
          </Link>
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 w-full sm:w-auto">
            <Link href="/get-started" className="bg-zinc-900 text-white px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-cyan-500 transition-all no-underline shadow-lg text-center w-full sm:w-auto">
              Scale My Brand Like This
            </Link>
            <Link href="/case-study/li-03" className="group flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest text-zinc-900 hover:text-cyan-500 transition-colors no-underline">
              Next — Dunova Sleep Case Study
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
      <SellerCentralShowcase
        unitsSold12mo="1.15M"
        growthVsLastYear="135%"
        buyBoxRate="99%"
        highlightIndex={1}
      />
    </main>
  );
}
