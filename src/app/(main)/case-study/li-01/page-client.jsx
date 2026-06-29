"use client";

import React, { useState, useLayoutEffect } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, TrendingUp, Search, Zap,
  BarChart3, Camera, CheckCircle2, Layers, ExternalLink,
  XCircle, Star, Palette, Package, Award, Layout,
  MousePointerClick, ShoppingCart,
} from "lucide-react";
import SellerCentralShowcase from "../../get-started/components/SellerCentralShowcase";

const SectionLabel = ({ children, light = false }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500" />
    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.4em] ${light ? "text-orange-400" : "text-orange-500/80"}`}>{children}</span>
  </div>
);

function Lightbox({ image, onClose }) {
  useLayoutEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[200] bg-black/96 backdrop-blur-xl flex items-center justify-center p-6" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"><XCircle size={18} /></button>
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
    phase: "01", week: "Wk 1–2", label: "Category Intelligence & Keyword Architecture",
    action: "Mapped 340+ buyer-intent keywords across 3 personas. Found a 'color accuracy' content gap untouched by every top-5 competitor — built the entire keyword architecture around it.",
    metric: "Keyword Coverage", before: "~12 active", after: "340+ ranked", kpi: "+168%", kpiLabel: "search visibility",
    barPct: 20, icon: <Search size={16} />, color: "from-zinc-700 to-zinc-600",
  },
  {
    phase: "02", week: "Wk 3–4", label: "Main Image CTR Engineering",
    action: "Ran 6 simultaneous image variants. Color-fan spread on a warm background outperformed white by 168%. In a row of 8 identical white squares, one warm image captures 100% of eye movement.",
    metric: "Click-Through Rate", before: "2.1% CTR", after: "5.6% CTR", kpi: "+168%", kpiLabel: "more clicks, same budget",
    barPct: 45, icon: <MousePointerClick size={16} />, color: "from-orange-600 to-orange-500",
  },
  {
    phase: "03", week: "Wk 5–6", label: "A+ Content — Conversion Defense Layer",
    action: "7 modules eliminated every buyer 'what if' before it formed. Bleed resistance, nib detail, paper compatibility — all answered visually. The buyer who reaches your A+ Content is interested but not sold. We closed that gap.",
    metric: "Conversion Rate", before: "4.2% CVR", after: "8.7% CVR", kpi: "+107%", kpiLabel: "more buyers per click",
    barPct: 62, icon: <ShoppingCart size={16} />, color: "from-violet-600 to-violet-500",
  },
  {
    phase: "04", week: "Wk 7–8", label: "Profit-First PPC Architecture",
    action: "4-tier campaign build: auto harvest → exact match → competitor conquest → category defense. 3 rounds of negative keyword mining. ACoS compressed from 38% at launch to 11% — without cutting ad spend.",
    metric: "Advertising Cost of Sales", before: "38% ACoS", after: "11% ACoS", kpi: "−71%", kpiLabel: "ad waste eliminated",
    barPct: 80, icon: <BarChart3 size={16} />, color: "from-emerald-600 to-emerald-500",
  },
  {
    phase: "05", week: "Wk 9–10", label: "Organic Page 1 Dominance",
    action: "#1 New Release by day 58. Page 1 organic rank for 'alcohol markers 48 pack', 'professional art markers set', and 'dual tip alcohol markers' — 3 of the 5 highest-volume terms in the entire category.",
    metric: "Monthly Revenue", before: "$0", after: "$28,400", kpi: "$28.4K/mo", kpiLabel: "at day 60",
    barPct: 100, icon: <TrendingUp size={16} />, color: "from-orange-500 to-amber-400",
  },
];




function PhasePerformanceDashboard() {
  return (
    <div className="bg-zinc-950 rounded-[24px] sm:rounded-[40px] p-5 sm:p-6 md:p-14 border border-white/5 relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <SectionLabel light>60-Day Execution — What Each Phase Moved</SectionLabel>
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
                  <h3 className="font-black text-base uppercase tracking-tight mb-2 text-white group-hover:text-orange-400 transition-colors duration-300">
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
                      <span className="text-orange-500 text-sm font-bold">→</span>
                      <span className="text-white text-sm font-black">{p.after}</span>
                    </div>
                  </div>
                  <div className={`rounded-xl px-4 py-2.5 text-center bg-gradient-to-br ${p.color} shadow-lg`}>
                    <p className="font-black text-lg tracking-tighter leading-none text-white">{p.kpi}</p>
                    <p className="text-[8px] font-bold uppercase tracking-widest mt-1 text-white/80">{p.kpiLabel}</p>
                  </div>
                </div>
              </div>

              {/* NEW: Trajectory Track */}
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
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${p.color} ring-[3px] ring-zinc-950 shadow-[0_0_15px_rgba(249,115,22,0.5)]`} />
                  <span className="text-[9px] font-bold font-mono text-white uppercase tracking-widest mt-2 whitespace-nowrap">
                    Result
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Revenue Ladder - Remains Unchanged */}
        <div className="pt-10 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.3em] mb-1">Cumulative Revenue — Day 1 to Day 60</p>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight">$0 → $28,400/month</h3>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl px-5 py-3 text-center self-start sm:self-auto">
              <p className="text-orange-400 font-black text-2xl tracking-tighter">8.2x</p>
              <p className="text-[8px] font-mono text-orange-400/60 uppercase tracking-widest">Peak ROAS</p>
            </div>
          </div>

          <div className="flex items-end gap-1 sm:gap-2 h-[120px] sm:h-[100px]">
            {[
              { label: "Day 1",  rev: "$0",      pct: 0,   note: "Launch" },
              { label: "Wk 2",   rev: "$840",    pct: 3,   note: "Indexed" },
              { label: "Wk 4",   rev: "$3.2K",   pct: 11,  note: "+CTR" },
              { label: "Wk 6",   rev: "$8.6K",   pct: 30,  note: "+CVR" },
              { label: "Wk 8",   rev: "$16.4K",  pct: 58,  note: "+PPC" },
              { label: "Wk 10",  rev: "$28.4K",  pct: 100, note: "Page 1" },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group cursor-default">
                <p className={`text-[8px] md:text-[10px] font-black uppercase tracking-tight transition-colors ${bar.pct === 100 ? "text-orange-400" : "text-zinc-500 group-hover:text-zinc-300"}`}>
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
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1782560175/grow_orbit_portfolio/assets/portfolio/graffixx/main_images.jpg", label: "Hero Image" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1782560179/grow_orbit_portfolio/assets/portfolio/graffixx/whats_included.jpg", label: "What's Included" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1782560177/grow_orbit_portfolio/assets/portfolio/graffixx/shades.jpg", label: "Color Shades" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1782560178/grow_orbit_portfolio/assets/portfolio/graffixx/tips.jpg", label: "Dual Tips" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1782560173/grow_orbit_portfolio/assets/portfolio/graffixx/image_versatality.jpg", label: "Versatility" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1782560174/grow_orbit_portfolio/assets/portfolio/graffixx/lifestyle_cartoon.jpg", label: "Lifestyle Art" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1782560172/grow_orbit_portfolio/assets/portfolio/graffixx/collage.jpg", label: "Art Collage" },
  ],
  aPlus: [
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1782560176/grow_orbit_portfolio/assets/portfolio/graffixx/new_banner.jpg", label: "Brand Header" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1782560163/grow_orbit_portfolio/assets/portfolio/graffixx/Artboard_1_copy.jpg", label: "Blending Tutorial" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1782560164/grow_orbit_portfolio/assets/portfolio/graffixx/Artboard_2_1.jpg", label: "Artist Lifestyle" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1782560166/grow_orbit_portfolio/assets/portfolio/graffixx/Artboard_3_1.jpg", label: "Butterfly Art" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1782560167/grow_orbit_portfolio/assets/portfolio/graffixx/Artboard_4_1.jpg", label: "Leaves Art" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1782560168/grow_orbit_portfolio/assets/portfolio/graffixx/Artboard_5_1.jpg", label: "Pomegranate Art" },
  ],
  brandStory: [
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1782560169/grow_orbit_portfolio/assets/portfolio/graffixx/Artboard_6_1.jpg", label: "Violet Art" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1782560171/grow_orbit_portfolio/assets/portfolio/graffixx/Artboard_7_1.jpg", label: "Ocean Glass Art" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1782560160/grow_orbit_portfolio/assets/portfolio/graffixx/Artboard_1_copy_4.jpg", label: "Swatches" },
  ],
};

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
export default function CaseStudyGraffixx() {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [activeListingImg, setActiveListingImg] = useState(0);

  return (
    <main className="min-h-screen bg-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {lightboxImage && <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />}

      {/* HERO */}
      <div className="bg-zinc-950 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(249,115,22,0.10),transparent_55%)]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/case-study" className="flex items-center gap-2 text-zinc-500 hover:text-orange-400 transition-colors no-underline text-[10px] font-bold uppercase tracking-widest">
              <ArrowLeft size={14} /> Case Studies
            </Link>
            <div className="w-1 h-1 rounded-full bg-zinc-700" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-400">Case Study · Graffixx</span>
          </div>
          <div className="lg:max-w-[900px]">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
              <Palette size={12} className="text-orange-400" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-orange-400">Art Supplies · USA · Zero to Page 1</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-[88px] font-black tracking-tighter leading-[0.85] text-white uppercase mb-6">
              $28K/month.<br />
              <span className="text-orange-500 italic font-light lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>60 days. Zero history.</span>
            </h1>
            <p className="text-zinc-400 text-xl font-light max-w-2xl leading-relaxed">
              Graffixx entered one of Amazon's most crowded visual categories with no reviews, no ranking, no brand recognition. We built a system that made all of that irrelevant.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5 mt-14">
            {[
              { label: "Revenue · Day 60",   val: "$28,400/mo",     icon: <TrendingUp size={14} /> },
              { label: "Time to Page 1",     val: "58 Days",        icon: <Zap size={14} /> },
              { label: "CTR Lift",           val: "+168%",          icon: <MousePointerClick size={14} /> },
              { label: "ACoS Achieved",      val: "11%",            icon: <BarChart3 size={14} /> },
              { label: "Peak ROAS",          val: "8.2x",           icon: <Award size={14} /> },
              { label: "Category Badge",     val: "#1 New Release", icon: <Package size={14} /> },
            ].map((s, i) => (
              <div key={i} className="bg-zinc-900/40 p-5 group hover:bg-orange-500/5 transition-colors">
                <div className="flex items-center gap-2 text-zinc-500 mb-2 group-hover:text-orange-400 transition-colors">
                  {s.icon}
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em]">{s.label}</span>
                </div>
                <p className="text-xl md:text-2xl font-black text-white tracking-tighter">{s.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 space-y-20">

        {/* Problem / Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-zinc-100 p-6 sm:p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-zinc-900 rounded-l-[24px] sm:rounded-l-[32px]" />
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight uppercase leading-tight">200 competitors.<br />All looking identical.</h2>
            <p className="text-zinc-500 text-base font-light leading-relaxed">
              The alcohol markers category is a visual commodity trap. Every listing shows the same white background, the same "48 colors, dual tip" headline. Buyers can't tell products apart — so they default to whoever has the most reviews. A new brand entering that environment has exactly one weapon: a better visual system than everyone else.
            </p>
          </div>
          <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-zinc-100 p-6 sm:p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-500 rounded-l-[24px] sm:rounded-l-[32px]" />
            <SectionLabel>Our Answer</SectionLabel>
            <h2 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight uppercase leading-tight">Build the system<br />that forces the click.</h2>
            <p className="text-zinc-700 text-base font-light leading-relaxed">
              We rebuilt the listing around one insight: the buyer decides in 0.3 seconds whether to click, and 8 seconds whether to buy. We engineered every pixel around those two moments — a CTR-optimized hero that stops the scroll, and A+ Content that removes every purchase objection before the buyer can articulate it.
            </p>
          </div>
        </div>

        {/* CTA banner */}
        <div className="bg-zinc-950 rounded-[36px] p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.08),transparent_55%)]" />
          <div className="relative z-10 max-w-xl">
            <p className="text-orange-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-2">Sound familiar?</p>
            <h2 className="text-white text-3xl font-black tracking-tighter uppercase mb-2 leading-tight">Is your listing invisible in search?</h2>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">If your CTR is below 3% or ACoS above 25%, the problem isn't your product. It's the system around it. We'll audit your listing in 15 minutes and show you exactly what's bleeding revenue.</p>
          </div>
          <Link href="/contact" className="relative z-10 shrink-0 bg-orange-500 text-white px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-white hover:text-zinc-900 transition-all shadow-xl no-underline whitespace-nowrap">
            Book Free Strategy Call
          </Link>
        </div>

        {/* Before vs After */}
        <div className="bg-zinc-950 rounded-[24px] sm:rounded-[40px] p-6 sm:p-10 md:p-14 border border-white/5 relative overflow-hidden">
          <SectionLabel light>Day 1 vs Day 60</SectionLabel>
          <h2 className="text-white text-2xl sm:text-3xl font-black uppercase tracking-tight mb-10 -mt-2">The exact numbers that changed.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-red-400 font-black text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center text-[9px] text-red-400">✕</span> Day 1 State
              </h3>
              <ul className="space-y-3">
                {[["CTR","2.1%","below category average"],["CVR","4.2%","losing to brands with 1,000+ reviews"],["ACoS","38%","burning launch budget"],["Organic Rank","Page 8+","zero indexation"],["Revenue","$0","pure ad dependency"]].map(([label,val,note],i) => (
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
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center"><CheckCircle2 size={9} className="text-emerald-400" /></span> Day 60 State
              </h3>
              <ul className="space-y-3">
                {[["CTR","5.6%","+168% — color fan image stops the scroll"],["CVR","8.7%","+107% — A+ answers every objection"],["ACoS","11%","−71% — 4-tier PPC at full profit"],["Organic Rank","Page 1","3 of 5 top category terms"],["Revenue","$28.4K/mo","8.2x ROAS, sustainable engine"]].map(([label,val,note],i) => (
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

        {/* Listing Images */}
        <div>
          <SectionLabel>The Image That Broke The Category</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-8 md:p-10 rounded-[40px] border border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <div className="lg:col-span-1 hidden lg:flex flex-col gap-3">
              {visualProof.listingImages.map((img, i) => (
                <button key={i} onClick={() => setActiveListingImg(i)} className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeListingImg === i ? "border-orange-500" : "border-zinc-200 hover:border-zinc-400"}`}>
                  <img src={img.src} className="w-full h-full object-cover" alt="Case Study Thumbnail" />
                </button>
              ))}
            </div>
            <div className="lg:col-span-6 relative aspect-square rounded-[28px] overflow-hidden bg-zinc-50 border border-zinc-100 cursor-pointer group" onClick={() => setLightboxImage(visualProof.listingImages[activeListingImg])}>
              <img src={visualProof.listingImages[activeListingImg].src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Case Study Final Image Proof" />
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={10} /> Expand
              </div>
              <div className="absolute bottom-4 left-4 bg-orange-500 text-white text-[9px] font-black uppercase px-3 py-1 rounded-lg">{visualProof.listingImages[activeListingImg].label}</div>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center">
              <h2 className="text-2xl font-black tracking-tighter uppercase mb-3 leading-tight">Every competitor<br />used white. We didn't.</h2>
              <p className="text-zinc-500 text-sm font-light leading-relaxed mb-6">
                In a search row of 8 identical white product squares, one warm, color-rich image captures 100% of eye movement. That single visual decision drove 168% more clicks — before a single keyword was changed.
              </p>
              <div className="space-y-3">
                {[["Color fan hero","+168% CTR vs white background"],["Nib close-up","Answers #1 buyer question before they ask"],["Ink swatch sheet","Eliminates 'will it bleed?' visually"],["Artist lifestyle","Shifts perception from budget to professional"]].map(([label,result],i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0 mt-0.5"><CheckCircle2 size={11} /></div>
                    <div>
                      <span className="text-zinc-900 font-black text-[11px] uppercase tracking-widest">{label}</span>
                      <span className="text-zinc-400 text-[11px] font-light ml-2">{result}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* A+ Content */}
        <div>
          <SectionLabel>A+ Content · Where Most Brands Lose the Sale</SectionLabel>
          <div className="rounded-[24px] sm:rounded-[40px] overflow-hidden border border-zinc-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <div className="bg-zinc-50 border-b border-zinc-200 px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-zinc-300" /><div className="w-2.5 h-2.5 rounded-full bg-zinc-300" /><div className="w-2.5 h-2.5 rounded-full bg-zinc-300" /></div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-tight ml-4 hidden sm:inline">amazon.com › dp · Graffixx A+ Content</span>
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
            <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>each one measurable.</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: <MousePointerClick size={18} />, label: "CTR Engineering",   desc: "+168% · Image Strategy" },
              { icon: <Search size={18} />,            label: "Keyword Dominance", desc: "Page 1 · 3 Top Terms" },
              { icon: <Layers size={18} />,            label: "A+ Conversion",     desc: "+107% CVR · 7 Modules" },
              { icon: <Layout size={18} />,            label: "Brand Authority",   desc: "+15% CVR · Trust Layer" },
              { icon: <BarChart3 size={18} />,         label: "PPC Efficiency",    desc: "11% ACoS · 8.2x ROAS" },
            ].map((s, i) => (
              <div key={i} className="group bg-zinc-50 hover:bg-orange-500 rounded-2xl p-5 border border-zinc-100 hover:border-orange-500 transition-all duration-500 text-center cursor-default">
                <div className="text-orange-500 group-hover:text-white transition-colors flex justify-center mb-3">{s.icon}</div>
                <p className="font-black text-[11px] uppercase tracking-tight text-zinc-700 group-hover:text-white transition-colors leading-tight mb-1">{s.label}</p>
                <p className="text-[9px] text-zinc-500 group-hover:text-white/70 transition-colors font-bold uppercase tracking-wider">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PHASE DASHBOARD */}
        <PhasePerformanceDashboard />

        {/* Testimonial */}
        <div className="bg-white rounded-[32px] border border-zinc-100 p-10 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-12">
            <div className="max-w-3xl">
              <SectionLabel>Client Voice</SectionLabel>
              
              <div className="space-y-12">
                {/* Primary Testimonial */}
                <div>
                  <div className="flex gap-1 mb-5">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-orange-500 fill-orange-500" />)}</div>
                  <p className="text-zinc-700 text-2xl md:text-[32px] font-light italic leading-tight mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                    "We launched with zero Amazon history and zero reviews. Grow Orbit built the entire visual system and we hit Page 1 in 58 days with an 8.2x ROAS. They built a brand that looked like it owned the category from day one."
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md grayscale hover:grayscale-0 transition-all duration-500 flex-shrink-0">
                      <img 
                        src="/assets/marcus-vance.avif" 
                        alt="Marcus Thorne" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <span className="font-black text-[13px] uppercase tracking-tight text-zinc-900 block leading-tight">
                        Marcus Thorne
                      </span>
                      <span className="text-[10px] font-medium text-zinc-500 block">
                        Founder, Graffixx Brand
                      </span>
                    </div>
                  </div>
                </div>

                {/* Secondary Testimonial / Impact Strip */}
                <div className="pt-10 border-t border-zinc-100 grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-zinc-500 text-base font-light italic leading-relaxed mb-4">
                      "The visual gap between us and the competitors was so wide that buyers didn't even care about our low review count. The system just worked."
                    </p>
                    <p className="text-zinc-900 font-bold text-[10px] uppercase tracking-widest">— Marketing Director</p>
                  </div>
                  <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-orange-500 fill-orange-500" />)}</div>
                       <span className="text-zinc-900 font-black text-[10px] uppercase tracking-widest">Category Impact</span>
                    </div>
                    <p className="text-zinc-500 text-[11px] leading-relaxed">
                      Maintained a 4.8-star average across the first 500 units. The conversion design didn't just sell products; it set expectations that the product actually met.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="shrink-0 xl:text-right w-full xl:w-auto pt-10 xl:pt-0">
              <div className="inline-block">
                <p className="text-[100px] md:text-[140px] font-black text-orange-500 tracking-tighter leading-none">8.2<span className="text-[60px] md:text-[90px]">x</span></p>
                <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-[0.3em] mt-2 mb-8">Peak ROAS · Month 2</p>
                <div className="rounded-2xl overflow-hidden border border-zinc-200 shadow-xl max-w-[240px] mx-auto xl:ml-auto">
                   <img src="/images/saler centeral screens/1.jpg" alt="Seller Central Results" width="400" height="250" className="w-full h-auto" />
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
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-zinc-400">
                  Interactive Profit Planning
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-zinc-900 tracking-tight leading-tight">
                Evaluate Your Own Amazon Margins
              </h2>
              <p className="text-zinc-500 text-sm font-light mt-1.5 leading-relaxed">
                The scaling strategy used for Graffixx started with precise margin modeling. Run your own numbers using our free, interactive Amazon seller calculators.
              </p>
            </div>
            <div className="shrink-0 flex flex-wrap gap-3">
              <Link href="/amazon-tools/profit-calculator" className="bg-zinc-900 text-white hover:bg-orange-500 hover:text-white px-5 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all no-underline shadow-md inline-flex items-center gap-2">
                Profit Calculator <ArrowRight size={12} />
              </Link>
              <Link href="/amazon-tools/fba-fee-calculator" className="bg-white text-zinc-900 border border-zinc-200 hover:border-orange-500 hover:text-orange-500 px-5 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all no-underline shadow-sm inline-flex items-center gap-2">
                FBA Fee Calculator <ArrowRight size={12} />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-zinc-200/60 pt-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 mt-0.5"><TrendingUp size={14} /></div>
              <div>
                <h3 className="font-black text-[11px] uppercase tracking-tight text-zinc-900 leading-tight mb-0.5">Model True Margins</h3>
                <p className="text-[10px] text-zinc-400 font-light leading-snug">Factor in CPC, dynamic FBA fulfillment fees, and referral cuts.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 mt-0.5"><Zap size={14} /></div>
              <div>
                <h3 className="font-black text-[11px] uppercase tracking-tight text-zinc-900 leading-tight mb-0.5">Predict Breakeven ACoS</h3>
                <p className="text-[10px] text-zinc-400 font-light leading-snug">Determine exactly how high your ad spend can go before bleeding cash.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 mt-0.5"><Package size={14} /></div>
              <div>
                <h3 className="font-black text-[11px] uppercase tracking-tight text-zinc-900 leading-tight mb-0.5">Optimize FBA Tiering</h3>
                <p className="text-[10px] text-zinc-400 font-light leading-snug">Minimize shipping fees by designing package dimensions strategically.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="pt-10 border-t border-zinc-100 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 text-center sm:text-left">
          <Link href="/case-study" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 font-bold text-[10px] uppercase tracking-widest transition-colors no-underline">
            <ArrowLeft size={14} /> All Case Studies
          </Link>
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 w-full sm:w-auto">
            <Link href="/get-started" className="bg-zinc-900 text-white px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-orange-500 transition-all no-underline shadow-lg text-center w-full sm:w-auto">Scale My Brand Like This</Link>
            <Link href="/case-study/li-02" className="group flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest text-zinc-900 hover:text-orange-500 transition-colors no-underline">
              Next — Kazvoo Electronics <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
      <SellerCentralShowcase
        unitsSold12mo="742.9K"
        growthVsLastYear="112%"
        buyBoxRate="99%"
        highlightIndex={0}
      />
    </main>
  );
}