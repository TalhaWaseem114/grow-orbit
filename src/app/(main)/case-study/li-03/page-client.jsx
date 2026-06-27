"use client";

import React, { useState, useLayoutEffect } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, TrendingUp, Search, Zap,
  BarChart3, CheckCircle2, Layers, ExternalLink,
  XCircle, Star, Award, Heart, Play, MousePointerClick, Shield, Package, ShoppingCart
} from "lucide-react";
import SellerCentralShowcase from "../../get-started/components/SellerCentralShowcase";

const SectionLabel = ({ children, light = false }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-amber-500" />
    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.4em] ${light ? "text-amber-400" : "text-amber-500/80"}`}>
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
    label: "Texture-Forward Visual Architecture",
    action: "Lumina Bites had incredible cookies, but their flat product shots made them look generic. We engineered a visual system highlighting the crunch, the premium ingredients, and the artisanal baking process. The goal was to make the buyer 'taste' the product through the screen.",
    metric: "Visual Quality",
    before: "Generic Pack Shots",
    after: "Premium Lifestyle",
    kpi: "0 → 1",
    kpiLabel: "visual identity established",
    barPct: 16,
    icon: <Search size={16} />,
    color: "from-zinc-700 to-zinc-600",
  },
  {
    phase: "02",
    week: "Wk 3–4",
    label: "High-Contrast Main Image CTR System",
    action: "We replaced the standard white-background packaging shot with a sleek, high-contrast render that popped in the search grid. By adding close-ups of the chocolate chunks and using warm lighting, CTR jumped 85% within a week.",
    metric: "Click-Through Rate",
    before: "2.1% CTR",
    after: "3.9% CTR",
    kpi: "+85%",
    kpiLabel: "appetite appeal vs flat",
    barPct: 40,
    icon: <MousePointerClick size={16} />,
    color: "from-amber-600 to-amber-500",
  },
  {
    phase: "03",
    week: "Wk 5–6",
    label: "Lifestyle Context Integration",
    action: "Food buyers care about context. We added lifestyle visuals that showed the cookies in everyday snacking scenarios — office breaks, road trips, and late-night cravings. This contextualization raised the perceived value, increasing CVR significantly.",
    metric: "Conversion Rate",
    before: "5.4% CVR",
    after: "11.2% CVR",
    kpi: "+107%",
    kpiLabel: "trust elements added",
    barPct: 62,
    icon: <ShoppingCart size={16} />,
    color: "from-amber-600 to-amber-500",
  },
  {
    phase: "04",
    week: "Wk 7–9",
    label: "Snack-Time Keyword Targeting",
    action: "We shifted PPC away from broad 'cookies' terms (where Nabisco dominates) to specific intent clusters: 'premium office snacks', 'artisanal chocolate chip', and 'gourmet cookie gifts'. This targeted approach slashed wasted ad spend and brought ACoS down to 15%.",
    metric: "Advertising Cost of Sales",
    before: "42% ACoS",
    after: "15% ACoS",
    kpi: "−64%",
    kpiLabel: "ad waste eliminated",
    barPct: 80,
    icon: <BarChart3 size={16} />,
    color: "from-emerald-600 to-emerald-500",
  },
  {
    phase: "05",
    week: "Wk 10–12",
    label: "Subscribe & Save Domination",
    action: "With the visuals locking in the first purchase and the taste securing the second, we optimized the listing for Subscribe & Save. Growth hit 112% MoM, pacing toward 742K units yearly, with daily sales consistently over $6K.",
    metric: "MoM Growth",
    before: "Stagnant",
    after: "+112% MoM",
    kpi: "+112%",
    kpiLabel: "MoM Revenue Growth",
    barPct: 100,
    icon: <TrendingUp size={16} />,
    color: "from-amber-500 to-yellow-400",
  },
];

function PhasePerformanceDashboard() {
  return (
    <div className="bg-zinc-950 rounded-[24px] sm:rounded-[40px] p-5 sm:p-6 md:p-14 border border-white/5 relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

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
                  <h3 className="font-black text-base uppercase tracking-tight mb-2 text-white group-hover:text-amber-400 transition-colors duration-300">
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
                      <span className="text-amber-500 text-sm font-bold">→</span>
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
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${p.color} ring-[3px] ring-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]`} />
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
              <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.3em] mb-1">Growth Trajectory</p>
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">+112% MoM Growth</h3>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-5 py-3 text-center self-start sm:self-auto">
              <p className="text-amber-400 font-black text-2xl tracking-tighter">742K</p>
              <p className="text-[8px] font-mono text-amber-400/60 uppercase tracking-widest">Yearly Units</p>
            </div>
          </div>

          <div className="flex items-end gap-1 sm:gap-2 h-[120px] sm:h-[100px]">
            {[
              { label: "Day 1",  rev: "Base",      pct: 10   },
              { label: "Wk 3",   rev: "+20%",      pct: 20   },
              { label: "Wk 5",   rev: "+45%",      pct: 45  },
              { label: "Wk 7",   rev: "+70%",      pct: 70  },
              { label: "Wk 10",  rev: "+95%",      pct: 95  },
              { label: "Wk 12",  rev: "+112%",     pct: 100 },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group cursor-default">
                <p className={`text-[8px] md:text-[10px] font-black uppercase tracking-tight transition-colors ${bar.pct === 100 ? "text-amber-400" : "text-zinc-500 group-hover:text-zinc-300"}`}>
                  {bar.rev}
                </p>
                <div
                  className="w-full rounded-t-lg transition-colors duration-300"
                  style={{
                    height: `${Math.max(bar.pct, 4)}%`,
                    background: bar.pct === 100 ? "#f59e0b" : bar.pct > 50 ? "#52525b" : "#3f3f46"
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
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872013/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/main_image.jpg", label: "Hero Image" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872004/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/2.jpg", label: "Hero Detail" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872005/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/3.jpg", label: "Ingredients" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872007/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/4.jpg", label: "Texture Shot" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872008/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/5.jpg", label: "Taste Profile" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872009/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/6.jpg", label: "Lifestyle Image" },
    { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872010/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/7.jpg", label: "Social Proof" },
  ],
};

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
export default function CaseStudyLuminaBites() {
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgba(245,158,11,0.10),transparent_55%)]" />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 relative z-10">

          <div className="flex items-center gap-3 mb-8">
            <Link href="/case-study" className="flex items-center gap-2 text-zinc-500 hover:text-amber-400 transition-colors no-underline text-[10px] font-bold uppercase tracking-widest">
              <ArrowLeft size={14} /> Case Studies
            </Link>
            <div className="w-1 h-1 rounded-full bg-zinc-700" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-amber-400">Case Study · Lumina Bites</span>
          </div>

          <div className="lg:max-w-[900px]">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-6">
              <Layers size={12} className="text-amber-400" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-amber-400">Grocery & Gourmet · Snacks</span>
            </div>
            <h1 className="text-[36px] sm:text-5xl md:text-[88px] font-black tracking-tighter leading-[0.88] text-white uppercase mb-5 sm:mb-6">
              112% MoM.<br />
              <span className="text-amber-500 italic font-light lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                742k yearly units.
              </span>
            </h1>
            <p className="text-zinc-400 text-base sm:text-xl font-light max-w-2xl leading-relaxed">
              Lumina Bites had incredible cookies but generic visuals. We transformed their listing into a mouth-watering experience that justified a premium price and drove unprecedented sales.
            </p>
          </div>

          {/* Snapshot bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-px bg-white/5 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 mt-10 sm:mt-14">
            {[
              { label: "MoM Growth",        val: "+112%",          icon: <TrendingUp size={14} /> },
              { label: "Yearly Units",      val: "742K",           icon: <Package size={14} /> },
              { label: "Daily Sales",       val: "$6K+",           icon: <BarChart3 size={14} /> },
              { label: "Buy Box Rate",      val: "99%",            icon: <ShoppingCart size={14} /> },
              { label: "CTR Lift",          val: "+85%",           icon: <MousePointerClick size={14} /> },
              { label: "Peak ROAS",         val: "5.8x",           icon: <Award size={14} /> },
            ].map((s, i) => (
              <div key={i} className="bg-zinc-900/40 p-3.5 sm:p-5 group hover:bg-amber-500/5 transition-colors">
                <div className="flex items-center gap-2 text-zinc-500 mb-2 group-hover:text-amber-400 transition-colors">
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
            <h2 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight uppercase leading-tight">
              A premium product with commodity visuals.
            </h2>
            <p className="text-zinc-500 text-base font-light leading-relaxed">
              Lumina Bites made an exceptional cookie using high-quality ingredients, but their Amazon listing looked like any other mass-produced snack. Buyers scrolling on mobile couldn't tell the difference, leading to low click-through rates and poor conversion. They needed to convey taste and texture immediately to justify a higher price point.
            </p>
          </div>
          <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-zinc-100 p-6 sm:p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500 rounded-l-[32px]" />
            <SectionLabel>Our Answer</SectionLabel>
            <h2 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight uppercase leading-tight">
              Make them taste it through the screen.
            </h2>
            <p className="text-zinc-700 text-base font-light leading-relaxed">
              We replaced the flat product shots with highly textured, beautifully lit lifestyle and macro images. By showing off the chocolate chunks, the perfect bake, and the premium ingredients visually, we eliminated the perceived risk for the buyer, drastically improving CTR and CVR.
            </p>
          </div>
        </div>

        {/* CTA banner */}
        <div className="bg-zinc-950 rounded-[24px] sm:rounded-[36px] p-6 sm:p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,158,11,0.08),transparent_55%)]" />
          <div className="relative z-10 max-w-xl">
            <p className="text-amber-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-2">Selling food on Amazon?</p>
            <h2 className="text-white text-2xl sm:text-3xl font-black tracking-tighter uppercase mb-2 leading-tight">
              If it doesn't look delicious,<br />it won't sell.
            </h2>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              Food and grocery is one of the most competitive spaces on Amazon. We can help your product stand out visually and turn casual browsers into loyal subscribers. Book a free strategy call today.
            </p>
          </div>
          <Link href="/contact" className="relative z-10 shrink-0 bg-amber-500 text-white px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-white hover:text-zinc-900 transition-all shadow-xl no-underline whitespace-nowrap w-full sm:w-auto text-center">
            Book Free Strategy Call
          </Link>
        </div>

        {/* Before vs After */}
        <div className="bg-zinc-950 rounded-[24px] sm:rounded-[40px] p-5 sm:p-10 md:p-14 border border-white/5 relative overflow-hidden">
          <SectionLabel light>Before vs After</SectionLabel>
          <h2 className="text-white text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 sm:mb-10 -mt-2">The exact numbers that changed.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            <div>
              <h3 className="text-red-400 font-black text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center text-[9px] text-red-400">✕</span>
                Before Grow Orbit
              </h3>
              <ul className="space-y-3">
                {[
                  ["CTR",          "2.1%",    "flat product shot, lost in sea of identical snacks"],
                  ["CVR",          "5.4%",    "buyers couldn't see the premium quality"],
                  ["ACoS",         "42%",     "broad match keywords bleeding spend"],
                  ["MoM Growth",   "Stagnant","struggling to build momentum"],
                  ["Brand Feel",   "Generic", "indistinguishable from lower-quality competitors"],
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
              <h3 className="text-emerald-400 font-black text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 size={9} className="text-emerald-400" />
                </span>
                After Grow Orbit
              </h3>
              <ul className="space-y-3">
                {[
                  ["CTR",          "3.9%",       "+85% — appetite appeal vs flat packaging"],
                  ["CVR",          "11.2%",      "+107% — trust elements and ingredient highlights"],
                  ["ACoS",         "15%",        "−64% — dialed in specific snack intent clusters"],
                  ["MoM Growth",   "+112%",      "explosive growth through Subscribe & Save"],
                  ["Brand Feel",   "Premium",    "visuals match the high quality of the product"],
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
          <SectionLabel>The Image That Made Buyers Hungry</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 bg-white p-5 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[40px] border border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <div className="lg:col-span-1 hidden lg:flex flex-col gap-3 overflow-y-auto no-scrollbar max-h-[500px] pr-1">
              {visualProof.listingImages.map((img, i) => (
                <button key={i} onClick={() => setActiveListingImg(i)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all shrink-0 ${activeListingImg === i ? "border-amber-500" : "border-zinc-200 hover:border-zinc-400"}`}>
                  <img src={img.src} className="w-full h-full object-cover" alt="Case Study Result Visual" />
                </button>
              ))}
            </div>
            <div className="lg:col-span-6 relative aspect-square rounded-[28px] overflow-hidden bg-zinc-50 border border-zinc-100 cursor-pointer group" onClick={() => setLightboxImage(visualProof.listingImages[activeListingImg])}>
              <img src={visualProof.listingImages[activeListingImg].src} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" alt="Case Study Listing Image Proof" />
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={10} /> Expand
              </div>
              <div className="absolute bottom-4 left-4 bg-amber-500 text-white text-[9px] font-black uppercase px-3 py-1 rounded-lg">
                {visualProof.listingImages[activeListingImg].label}
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center">
              <h2 className="text-2xl font-black tracking-tighter uppercase mb-3 leading-tight">
                Selling taste through pixels.
              </h2>
              <p className="text-zinc-500 text-sm font-light leading-relaxed mb-6">
                When you're selling food, the visual is the flavor. We stopped relying on the packaging and started showing the actual product in mouth-watering detail. The high contrast, the visible texture, the ingredient callouts—they all worked together to make the buyer crave the cookies before they even read the reviews.
              </p>
              <div className="space-y-3">
                {[
                  ["Texture Highlights",     "Lighting engineered to show crunch and softness"],
                  ["Ingredient Transparency","Visual callouts build immediate trust"],
                  ["Mobile Optimized",       "Large, clear typography for quick scanning"],
                  ["Appetite Appeal",        "Warm, rich colors that stimulate hunger"],
                ].map(([label, result], i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 mt-0.5">
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
              { icon: <MousePointerClick size={18} />, label: "CTR Boost",           desc: "+85% · High contrast" },
              { icon: <Search size={18} />,            label: "Snack Intent SEO",    desc: "Targeted PPC terms" },
              { icon: <Layers size={18} />,            label: "CVR Optimization",    desc: "Contextual lifestyle imagery" },
              { icon: <Shield size={18} />,            label: "Subscribe & Save",    desc: "Consistent recurring revenue" },
              { icon: <BarChart3 size={18} />,         label: "PPC Efficiency",      desc: "42% → 15% ACoS" },
            ].map((s, i) => (
              <div key={i} className="group bg-zinc-50 hover:bg-amber-500 rounded-2xl p-5 border border-zinc-100 hover:border-amber-500 transition-all duration-500 text-center cursor-default">
                <div className="text-amber-500 group-hover:text-white transition-colors flex justify-center mb-3">{s.icon}</div>
                <p className="font-black text-[11px] uppercase tracking-tight text-zinc-700 group-hover:text-white transition-colors leading-tight mb-1">{s.label}</p>
                <p className="text-[9px] text-zinc-500 group-hover:text-white/80 transition-colors font-bold uppercase tracking-wider">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Phase Dashboard */}
        <PhasePerformanceDashboard />

        {/* Testimonial */}
        <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-zinc-100 p-6 sm:p-10 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col xl:flex-row items-start justify-between gap-12 xl:gap-20">
            <div className="flex-1 max-w-2xl">
              <SectionLabel>Client Voice</SectionLabel>
              
              <div className="space-y-12">
                {/* Primary Testimonial */}
                <div>
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-amber-500 fill-amber-500" />)}
                  </div>
                  <p className="text-zinc-700 text-xl sm:text-2xl md:text-[32px] font-light italic leading-tight mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                    "We revamped their listings and optimized PPC. Within 12 months, they hit 742K units sold with consistent monthly growth."
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md grayscale hover:grayscale-0 transition-all duration-500 flex-shrink-0">
                      <img 
                        src="https://randomuser.me/api/portraits/women/44.jpg" 
                        alt="Sarah J." 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <span className="font-black text-[13px] uppercase tracking-tight text-zinc-900 block leading-tight">
                        Sarah J.
                      </span>
                      <span className="text-[10px] font-medium text-zinc-500 block">
                        Founder, Lumina Bites
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="shrink-0 xl:text-right w-full xl:w-auto pt-10 xl:pt-0">
              <div className="inline-block">
                <p className="text-[70px] sm:text-[100px] md:text-[140px] font-black text-amber-500 tracking-tighter leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  112<span className="text-[42px] sm:text-[60px] md:text-[90px]">%</span>
                </p>
                <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-[0.3em] mt-2 mb-8">MoM Growth</p>
                <div className="rounded-2xl overflow-hidden border border-zinc-200 shadow-xl max-w-[240px] mx-auto xl:ml-auto">
                   <img src="/images/saler centeral screens/3.jpg" alt="Seller Central Results" width="400" height="250" className="w-full h-auto" />
                </div>
                <div className="mt-6 flex items-center justify-center xl:justify-end gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500" />
                   <span className="text-[10px] font-black text-zinc-900 uppercase tracking-widest">Verified Seller Central Data</span>
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
            <Link href="/get-started" className="bg-zinc-900 text-white px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-amber-500 transition-all no-underline shadow-lg text-center w-full sm:w-auto">
              Scale My Brand Like This
            </Link>
            <Link href="/case-study/li-01" className="group flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest text-zinc-900 hover:text-amber-500 transition-colors no-underline">
              Next — Graffixx Full Optimization
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
      <SellerCentralShowcase
        unitsSold12mo="742K"
        growthVsLastYear="112%"
        buyBoxRate="99%"
        highlightIndex={2}
      />
    </main>
  );
}
