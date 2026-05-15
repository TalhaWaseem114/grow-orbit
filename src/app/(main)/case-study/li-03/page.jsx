"use client";

import React, { useState, useLayoutEffect } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, TrendingUp, Search, Zap,
  BarChart3, CheckCircle2, Layers, ExternalLink,
  XCircle, Star, Award, Layout,
  MousePointerClick, ShoppingCart, Moon, Shield,
} from "lucide-react";

const SectionLabel = ({ children, light = false }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-violet-500" />
    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.4em] ${light ? "text-violet-400" : "text-violet-500/80"}`}>
      {children}
    </span>
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
    label: "Price-Gap Intelligence & Positioning Architecture",
    action: "Gravity Blanket owns the $249 premium slot. Generic imports flood the $25–$35 range. At $69 with verified glass bead fill and a 15-year warranty, Dunova occupied a 'premium-without-absurd-pricing' position that nobody was communicating properly. We built every decision around that gap.",
    metric: "Market Position",
    before: "Unknown brand",
    after: "$69 premium anchor",
    kpi: "0 → 1",
    kpiLabel: "positioning defined",
    barPct: 16,
    icon: <Search size={16} />,
    color: "from-zinc-700 to-zinc-600",
  },
  {
    phase: "02",
    week: "Wk 3–4",
    label: "Lifestyle-First Main Image CTR System",
    action: "Every weighted blanket competitor shot the product flat on a bed. We photographed a woman wrapped in the blanket — soft bedroom light, peaceful expression, warm tones. In search results, 7 flat product shots and one human moment. CTR lifted 156% in 9 days. The category had never seen a lifestyle-led main image.",
    metric: "Click-Through Rate",
    before: "1.8% CTR",
    after: "4.6% CTR",
    kpi: "+156%",
    kpiLabel: "lifestyle vs flat product",
    barPct: 40,
    icon: <MousePointerClick size={16} />,
    color: "from-violet-600 to-violet-500",
  },
  {
    phase: "03",
    week: "Wk 5–6",
    label: "Tactile Trust A+ Content Build",
    action: "Weighted blankets have a core trust problem: buyers can't feel the weight through a screen. We built 8 A+ modules around the sensory experience — bead-fill density cross-sections, GSM comparison charts, temperature regulation diagrams, and a sleep phase graphic linking deep pressure stimulation to cortisol reduction. CVR tripled in 11 days.",
    metric: "Conversion Rate",
    before: "3.4% CVR",
    after: "10.2% CVR",
    kpi: "+200%",
    kpiLabel: "tactile education converts",
    barPct: 62,
    icon: <ShoppingCart size={16} />,
    color: "from-violet-600 to-violet-500",
  },
  {
    phase: "04",
    week: "Wk 7–9",
    label: "Sleep & Anxiety PPC Keyword Architecture",
    action: "Built 5-tier PPC stack: high-intent sleep terms, anxiety relief terms, gift occasion terms (Mother's Day / Christmas clusters), competitor conquest against Gravity and YnM, and a separate retargeting campaign for 'weighted blanket adults 15lb' — the exact phrase Gravity owns organically. ACoS dropped from 47% to 13% by week 9.",
    metric: "Advertising Cost of Sales",
    before: "47% ACoS",
    after: "13% ACoS",
    kpi: "−72%",
    kpiLabel: "ad waste eliminated",
    barPct: 80,
    icon: <BarChart3 size={16} />,
    color: "from-emerald-600 to-emerald-500",
  },
  {
    phase: "05",
    week: "Wk 10–12",
    label: "Page 1 Organic Rank & Gift Season Timing",
    action: "Page 1 for 'weighted blanket for anxiety adults', 'heavy blanket 15lb', and 'cooling weighted blanket queen'. Launch timed to land page 1 status 3 weeks before peak gifting window. Combined with a Subscribe & Save setup that drove 41% of buyers to recurring orders. $52,400 monthly revenue by day 85.",
    metric: "Monthly Revenue",
    before: "$0",
    after: "$52,400",
    kpi: "$52.4K/mo",
    kpiLabel: "at day 85",
    barPct: 100,
    icon: <TrendingUp size={16} />,
    color: "from-violet-500 to-amber-400",
  },
];

function PhasePerformanceDashboard() {
  return (
    <div className="bg-zinc-950 rounded-[24px] sm:rounded-[40px] p-5 sm:p-6 md:p-14 border border-white/5 relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <SectionLabel light>85-Day Execution — What Each Phase Moved</SectionLabel>
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
                  <h4 className="font-black text-base uppercase tracking-tight mb-2 text-white group-hover:text-violet-400 transition-colors duration-300">
                    {p.label}
                  </h4>
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
                      <span className="text-violet-500 text-sm font-bold">→</span>
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
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${p.color} ring-[3px] ring-zinc-950 shadow-[0_0_15px_rgba(139,92,246,0.5)]`} />
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
              <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.3em] mb-1">Cumulative Revenue — Day 1 to Day 85</p>
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">$0 → $52,400/month</h3>
            </div>
            <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl px-5 py-3 text-center self-start sm:self-auto">
              <p className="text-violet-400 font-black text-2xl tracking-tighter">9.1x</p>
              <p className="text-[8px] font-mono text-violet-400/60 uppercase tracking-widest">Peak ROAS</p>
            </div>
          </div>

          <div className="flex items-end gap-1 sm:gap-2 h-[120px] sm:h-[100px]">
            {[
              { label: "Day 1",  rev: "$0",      pct: 0   },
              { label: "Wk 3",  rev: "$920",    pct: 2   },
              { label: "Wk 5",  rev: "$6.1K",   pct: 12  },
              { label: "Wk 7",  rev: "$17K",    pct: 32  },
              { label: "Wk 10", rev: "$33K",    pct: 63  },
              { label: "Wk 12", rev: "$52.4K",  pct: 100 },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group cursor-default">
                <p className={`text-[8px] md:text-[10px] font-black uppercase tracking-tight transition-colors ${bar.pct === 100 ? "text-violet-400" : "text-zinc-500 group-hover:text-zinc-300"}`}>
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
    { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop", label: "Lifestyle Hero — Wrapped & Warm" },
    { src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",   label: "Bead Fill Cross-Section" },
    { src: "https://images.unsplash.com/photo-1588776814546-ec7e1a7a6a7e?q=80&w=800&auto=format&fit=crop", label: "Weight Distribution Diagram" },
    { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop", label: "Gifting Lifestyle Scene" },
  ],
  aPlus: [
    { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop", label: "Deep Sleep Hero Banner" },
    { src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",   label: "Glass Bead Fill Module" },
  ],
  brandStory: [
    { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop", label: "The Rest Standard" },
    { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop", label: "Crafted for Calm" },
  ],
};

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
export default function CaseStudyDunova() {
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
      <div className="bg-zinc-950 pt-28 sm:pt-32 pb-14 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgba(139,92,246,0.10),transparent_55%)]" />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 relative z-10">

          <div className="flex items-center gap-3 mb-8">
            <Link href="/case-study" className="flex items-center gap-2 text-zinc-500 hover:text-violet-400 transition-colors no-underline text-[10px] font-bold uppercase tracking-widest">
              <ArrowLeft size={14} /> Case Studies
            </Link>
            <div className="w-1 h-1 rounded-full bg-zinc-700" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-violet-400">Case Study · Dunova</span>
          </div>

          <div className="lg:max-w-[900px]">
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-2 mb-6">
              <Moon size={12} className="text-violet-400" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-violet-400">Home & Sleep · Weighted Blanket · USA Launch</span>
            </div>
            <h1 className="text-[36px] sm:text-5xl md:text-[88px] font-black tracking-tighter leading-[0.88] text-white uppercase mb-5 sm:mb-6">
              $52K/month.<br />
              <span className="text-violet-500 italic font-light lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                outselling gravity.
              </span>
            </h1>
            <p className="text-zinc-400 text-base sm:text-xl font-light max-w-2xl leading-relaxed">
              Dunova launched a premium weighted blanket against the brand that invented the category.
              No history, no reviews, no PR budget. Just a smarter visual system — and $52,400 per month by day 85.
            </p>
          </div>

          {/* Snapshot bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-px bg-white/5 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 mt-10 sm:mt-14">
            {[
              { label: "Revenue · Day 85",  val: "$52,400/mo",     icon: <TrendingUp size={14} /> },
              { label: "Timeline",          val: "85 Days",        icon: <Zap size={14} /> },
              { label: "CTR Lift",          val: "+156%",          icon: <MousePointerClick size={14} /> },
              { label: "CVR Achieved",      val: "10.2%",          icon: <ShoppingCart size={14} /> },
              { label: "ACoS Achieved",     val: "13%",            icon: <BarChart3 size={14} /> },
              { label: "Peak ROAS",         val: "9.1x",           icon: <Award size={14} /> },
            ].map((s, i) => (
              <div key={i} className="bg-zinc-900/40 p-3.5 sm:p-5 group hover:bg-violet-500/5 transition-colors">
                <div className="flex items-center gap-2 text-zinc-500 mb-2 group-hover:text-violet-400 transition-colors">
                  {s.icon}
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em]">{s.label}</span>
                </div>
                <p className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tighter">{s.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 py-12 sm:py-20 space-y-12 sm:space-y-20">

        {/* Problem / Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-zinc-100 p-6 sm:p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-zinc-900 rounded-l-[32px]" />
            <SectionLabel>The Problem</SectionLabel>
            <h3 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight uppercase leading-tight">
              Selling a tactile product to buyers who can't touch it.
            </h3>
            <p className="text-zinc-500 text-base font-light leading-relaxed">
              A weighted blanket lives or dies on how it feels. The gentle pressure, the warmth, the weight distribution — none of that translates in a flat product photo on a white background. Gravity Blanket solves this with $15 million in brand recognition. New brands have nothing. So they race each other to $34.99 and wonder why margins disappear.
            </p>
          </div>
          <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-zinc-100 p-6 sm:p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-violet-500 rounded-l-[32px]" />
            <SectionLabel>Our Answer</SectionLabel>
            <h3 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight uppercase leading-tight">
              Make the buyer feel it before they buy it.
            </h3>
            <p className="text-zinc-700 text-base font-light leading-relaxed">
              We couldn't let them touch it. So we showed them everything else — the lifestyle moment it creates, the science behind why it works, and the engineering that makes it different. Every visual asset was built to transfer the sensory experience through a screen. That's not photography. That's conversion architecture.
            </p>
          </div>
        </div>

        {/* CTA banner */}
        <div className="bg-zinc-950 rounded-[24px] sm:rounded-[36px] p-6 sm:p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.08),transparent_55%)]" />
          <div className="relative z-10 max-w-xl">
            <p className="text-violet-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-2">Selling something tactile?</p>
            <h4 className="text-white text-2xl sm:text-3xl font-black tracking-tighter uppercase mb-2 leading-tight">
              If buyers can't feel it,<br />your listing has to.
            </h4>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              Home goods, textiles, furniture, wellness — tactile categories have the highest conversion upside on Amazon because most brands never solve the sensory gap. We will show you exactly how to close it in 15 minutes, free.
            </p>
          </div>
          <Link href="/contact" className="relative z-10 shrink-0 bg-violet-500 text-white px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-white hover:text-zinc-900 transition-all shadow-xl no-underline whitespace-nowrap w-full sm:w-auto text-center">
            Book Free Strategy Call
          </Link>
        </div>

        {/* Before vs After */}
        <div className="bg-zinc-950 rounded-[24px] sm:rounded-[40px] p-5 sm:p-10 md:p-14 border border-white/5 relative overflow-hidden">
          <SectionLabel light>Day 1 vs Day 85</SectionLabel>
          <h3 className="text-white text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 sm:mb-10 -mt-2">The exact numbers that changed.</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            <div>
              <h4 className="text-red-400 font-black text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center text-[9px] text-red-400">✕</span>
                Day 1 State
              </h4>
              <ul className="space-y-3">
                {[
                  ["CTR",          "1.8%",    "flat product shot, lost in sea of identical thumbnails"],
                  ["CVR",          "3.4%",    "buyers interested but couldn't justify $69 without feeling it"],
                  ["ACoS",         "47%",     "broad match keywords, no sleep intent architecture"],
                  ["Organic Rank", "Page 10+","zero indexation for sleep and anxiety terms"],
                  ["Revenue",      "$0",      "100% ad spend, no organic support, no gifting traffic"],
                ].map(([label, val, note], i) => (
                  <li key={i} className="flex flex-col sm:flex-row items-start gap-1.5 sm:gap-4 bg-white/[0.03] rounded-xl px-4 py-3 border border-white/[0.04]">
                    <div className="flex items-center gap-3 sm:contents">
                      <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest w-20 shrink-0 pt-0.5">{label}</span>
                      <span className="text-red-400 font-black text-sm w-16 shrink-0">{val}</span>
                    </div>
                    <span className="text-zinc-600 text-[11px] font-light">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-400 font-black text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 size={9} className="text-emerald-400" />
                </span>
                Day 85 State
              </h4>
              <ul className="space-y-3">
                {[
                  ["CTR",          "4.6%",       "+156% — lifestyle shot the only human image in search"],
                  ["CVR",          "10.2%",      "+200% — bead fill + science modules closed the gap"],
                  ["ACoS",         "13%",        "−72% — sleep intent + gifting clusters at full profit"],
                  ["Organic Rank", "Page 1",     "3 top anxiety & sleep terms, combined 80K searches/mo"],
                  ["Revenue",      "$52.4K/mo",  "9.1x ROAS, 41% on Subscribe & Save for recurring LTV"],
                ].map(([label, val, note], i) => (
                  <li key={i} className="flex flex-col sm:flex-row items-start gap-1.5 sm:gap-4 bg-white/[0.03] rounded-xl px-4 py-3 border border-white/[0.04]">
                    <div className="flex items-center gap-3 sm:contents">
                      <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest w-20 shrink-0 pt-0.5">{label}</span>
                      <span className="text-emerald-400 font-black text-sm w-16 shrink-0">{val}</span>
                    </div>
                    <span className="text-zinc-400 text-[11px] font-light">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ─── LISTING IMAGES ─── */}
        <div>
          <SectionLabel>The Image That Made Buyers Feel It</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 bg-white p-5 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[40px] border border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <div className="lg:col-span-1 hidden lg:flex flex-col gap-3">
              {visualProof.listingImages.map((img, i) => (
                <button key={i} onClick={() => setActiveListingImg(i)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeListingImg === i ? "border-violet-500" : "border-zinc-200 hover:border-zinc-400"}`}>
                  <img src={img.src} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
            <div className="lg:col-span-6 relative aspect-square rounded-[28px] overflow-hidden bg-zinc-50 border border-zinc-100 cursor-pointer group" onClick={() => setLightboxImage(visualProof.listingImages[activeListingImg])}>
              <img src={visualProof.listingImages[activeListingImg].src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={10} /> Expand
              </div>
              <div className="absolute bottom-4 left-4 bg-violet-500 text-white text-[9px] font-black uppercase px-3 py-1 rounded-lg">
                {visualProof.listingImages[activeListingImg].label}
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center">
              <h3 className="text-2xl font-black tracking-tighter uppercase mb-3 leading-tight">
                Everyone shot the blanket.<br />We shot the moment.
              </h3>
              <p className="text-zinc-500 text-sm font-light leading-relaxed mb-6">
                In a search row of 8 flat product shots, a single human moment — soft bedroom light, a person fully wrapped and at peace — is the only thumbnail that creates an emotional response. That's not just design preference. It's the reason the CTR hit 4.6% in a category where 1.8% was the baseline. The buyer didn't see a blanket. They saw themselves.
              </p>
              <div className="space-y-3">
                {[
                  ["Lifestyle hero",         "+156% CTR — only human image in category search"],
                  ["Bead fill cross-section","Translates the tactile density buyers can't feel"],
                  ["Weight distribution map","Makes the 'even pressure' claim visual and believable"],
                  ["Gifting lifestyle",      "Unlocks the second buyer intent: holiday gift searches"],
                ].map(([label, result], i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-500 shrink-0 mt-0.5">
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
          <SectionLabel>A+ Content · Selling What Buyers Can't Touch</SectionLabel>
          <div className="rounded-[24px] sm:rounded-[40px] overflow-hidden border border-zinc-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <div className="bg-zinc-50 border-b border-zinc-200 px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-tight ml-4 hidden sm:inline">amazon.com › dp · Dunova A+ Content</span>
              </div>
              <span className="text-[9px] font-black text-violet-500 uppercase tracking-widest bg-violet-50 border border-violet-100 px-3 py-1 rounded-full">A+ Preview</span>
            </div>
            <div className="divide-y divide-zinc-100">
              <div className="relative cursor-pointer group overflow-hidden" style={{ height: "260px" }} onClick={() => setLightboxImage(visualProof.aPlus[0])}>
                <img src={visualProof.aPlus[0].src} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-end p-5 sm:p-10">
                  <div className="text-white">
                    <p className="text-[10px] font-mono text-violet-300 uppercase tracking-[0.3em] mb-2">Module 01 · Hero Banner</p>
                    <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight">Deeper Sleep. Less Anxiety. Proven Calm.</h4>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm text-white text-[8px] font-bold uppercase px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                    <ExternalLink size={9} /> Expand
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 sm:p-10 flex flex-col justify-center">
                  <p className="text-[9px] font-mono text-violet-500 uppercase tracking-widest mb-2">Module 02 · The Science of Weight</p>
                  <h4 className="text-xl font-black uppercase tracking-tight mb-4 text-zinc-900">
                    A buyer can't feel 15lbs through a screen.<br />So we made them understand it.
                  </h4>
                  <p className="text-zinc-500 text-sm font-light leading-relaxed mb-6">
                    Deep Pressure Stimulation is the clinical mechanism behind every weighted blanket claim. Instead of saying "reduces anxiety," we showed the cortisol reduction pathway. Instead of "even weight distribution," we cross-sectioned the glass bead grid. Instead of "premium fill," we displayed the GSM count against competitors. The buyer didn't need to trust us — the data did that for us.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Glass Bead Fill", "15-Year Warranty", "OEKO-TEX Certified"].map((t, i) => (
                      <span key={i} className="text-[9px] font-bold uppercase tracking-widest border border-zinc-200 px-3 py-1 rounded-lg text-zinc-400">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="relative cursor-pointer group overflow-hidden" style={{ minHeight: "240px" }} onClick={() => setLightboxImage(visualProof.aPlus[1])}>
                  <img src={visualProof.aPlus[1].src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                </div>
              </div>
            </div>
            <div className="bg-violet-500 text-white p-4 text-center text-[10px] font-bold uppercase tracking-widest">
              6 additional weight guide, material, size comparison & gifting modules on the live listing
            </div>
          </div>
        </div>

        {/* ─── BRAND STORY ─── */}
        <div>
          <SectionLabel>Brand Story · Rest Is Not a Luxury</SectionLabel>
          <div className="bg-zinc-950 rounded-[24px] sm:rounded-[40px] p-6 sm:p-10 lg:p-14 border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.18]">
              <img src={visualProof.brandStory[0].src} className="w-full h-full object-cover blur-3xl" alt="" />
            </div>
            <div className="absolute inset-0 bg-zinc-950/65" />
            <div className="relative z-10 flex flex-col lg:flex-row items-start gap-12">
              <div className="max-w-lg">
                <div className="w-14 h-14 rounded-full bg-violet-500 flex items-center justify-center mb-8 shadow-2xl">
                  <Moon size={26} className="text-white" />
                </div>
                <h3 className="text-white text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter uppercase mb-4 leading-none">
                  Dunova.<br />
                  <span className="text-violet-500">Sleep built</span><br />
                  <span className="italic font-light text-zinc-400 lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>on science.</span>
                </h3>
                <p className="text-zinc-400 text-base font-light italic leading-relaxed mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  "Positioning Dunova as a sleep-science brand rather than a home goods brand changed who clicked, who bought, and who stayed. Buyers who came through a clinical keyword are buying for a specific reason. They don't return the product. That's why our return rate held at 3.2% — in a category where 12% is industry average."
                </p>
                <Link href="/contact" className="bg-white text-zinc-900 px-7 py-3.5 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-violet-500 hover:text-white transition-all no-underline shadow-xl inline-block">
                  Build My Brand Authority
                </Link>
              </div>
              <div className="flex-1 w-full flex flex-col gap-4">
                <div className="flex items-center justify-between lg:hidden px-1">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    Brand Assets <span className="w-8 h-px bg-white/10" />
                  </p>
                  <p className="text-[10px] font-mono text-violet-400 uppercase tracking-widest animate-pulse">
                    Slide to next →
                  </p>
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 w-full snap-x snap-mandatory">
                  {visualProof.brandStory.map((img, i) => (
                    <div key={i} className="shrink-0 w-[85%] sm:w-64 lg:flex-1 rounded-2xl overflow-hidden border border-white/10 relative group cursor-pointer snap-center" style={{ height: "360px" }} onClick={() => setLightboxImage(img)}>
                      <img src={img.src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5">
                        <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-violet-400 mb-1">Asset 0{i + 1}</p>
                        <h4 className="text-white font-black text-sm uppercase tracking-tight">{img.label}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Levers */}
        <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-zinc-100 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          <SectionLabel>What Actually Moved the Needle</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase leading-[0.9] text-zinc-900 mb-8 sm:mb-10">
            5 levers.<br />
            <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
              each one measurable.
            </span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {[
              { icon: <MousePointerClick size={18} />, label: "Lifestyle CTR",       desc: "+156% · Human vs flat product" },
              { icon: <Search size={18} />,            label: "Sleep Intent SEO",    desc: "Page 1 · 3 anxiety terms" },
              { icon: <Layers size={18} />,            label: "Tactile A+",          desc: "+200% CVR · Science layer" },
              { icon: <Shield size={18} />,            label: "Gift Positioning",    desc: "41% Subscribe & Save rate" },
              { icon: <BarChart3 size={18} />,         label: "PPC Architecture",    desc: "47% → 13% ACoS · 9.1x ROAS" },
            ].map((s, i) => (
              <div key={i} className="group bg-zinc-50 hover:bg-violet-500 rounded-2xl p-5 border border-zinc-100 hover:border-violet-500 transition-all duration-500 text-center cursor-default">
                <div className="text-violet-500 group-hover:text-white transition-colors flex justify-center mb-3">{s.icon}</div>
                <p className="font-black text-[11px] uppercase tracking-tight text-zinc-700 group-hover:text-white transition-colors leading-tight mb-1">{s.label}</p>
                <p className="text-[9px] text-zinc-500 group-hover:text-white/70 transition-colors font-bold uppercase tracking-wider">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Phase Dashboard */}
        <PhasePerformanceDashboard />

        {/* Testimonial */}
        <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-zinc-100 p-6 sm:p-10 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-12">
            <div className="max-w-3xl">
              <SectionLabel>Client Voice</SectionLabel>
              
              <div className="space-y-12">
                {/* Primary Testimonial */}
                <div>
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-violet-500 fill-violet-500" />)}
                  </div>
                  <p className="text-zinc-700 text-xl sm:text-2xl md:text-[32px] font-light italic leading-tight mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                    "We were competing against a brand with a $15 million marketing budget and the patent on the category name. Grow Orbit told us to stop competing on price and start competing on proof. We went from invisible to $52K a month in less than 90 days."
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md grayscale hover:grayscale-0 transition-all duration-500 flex-shrink-0">
                      <img 
                        src="https://randomuser.me/api/portraits/women/68.jpg" 
                        alt="Sarah Chen" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <span className="font-black text-[13px] uppercase tracking-tight text-zinc-900 block leading-tight">
                        Sarah Chen
                      </span>
                      <span className="text-[10px] font-medium text-zinc-500 block">
                        Founder, Dunova Sleep Co.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Secondary Testimonial / Impact Strip */}
                <div className="pt-10 border-t border-zinc-100 grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-zinc-500 text-base font-light italic leading-relaxed mb-4">
                      "The science layer we added to the A+ content was the turning point. It shifted us from a 'choice' to a 'solution' for buyers."
                    </p>
                    <p className="text-zinc-900 font-bold text-[10px] uppercase tracking-widest">— Director of Ops</p>
                  </div>
                  <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-violet-500 fill-violet-500" />)}</div>
                       <span className="text-zinc-900 font-black text-[10px] uppercase tracking-widest">Growth Retention</span>
                    </div>
                    <p className="text-zinc-500 text-[11px] leading-relaxed">
                      Maintained a 3.2% return rate—nearly 4x better than category average. High trust conversion translates to low regret purchases.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="shrink-0 xl:text-right w-full xl:w-auto pt-10 xl:pt-0">
              <div className="inline-block">
                <p className="text-[70px] sm:text-[100px] md:text-[140px] font-black text-violet-500 tracking-tighter leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  9.1<span className="text-[42px] sm:text-[60px] md:text-[90px]">x</span>
                </p>
                <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-[0.3em] mt-2">Peak ROAS · Day 85</p>
                <div className="mt-8 flex items-center justify-center xl:justify-end gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500" />
                   <span className="text-[10px] font-black text-zinc-900 uppercase tracking-widest">Verified Scaling</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="pt-10 border-t border-zinc-100 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6">
          <Link href="/case-study" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 font-bold text-[10px] uppercase tracking-widest transition-colors no-underline">
            <ArrowLeft size={14} /> All Case Studies
          </Link>
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 w-full sm:w-auto">
            <Link href="/get-started" className="bg-zinc-900 text-white px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-violet-500 transition-all no-underline shadow-lg text-center w-full sm:w-auto">
              Scale My Brand Like This
            </Link>
            <Link href="/case-study/li-01" className="group flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest text-zinc-900 hover:text-violet-500 transition-colors no-underline">
              Next — Graffixx Full Optimization
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
