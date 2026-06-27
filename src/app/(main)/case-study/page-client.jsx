"use client";

import Image from "next/image";
import {
  Activity, ArrowRight, ArrowUpRight, Globe,
  Layers, Zap, CheckCircle2, TrendingUp,
  MousePointerClick, BarChart3, Award, Palette,
  Moon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const montserrat = { fontFamily: "'Montserrat', sans-serif" };
const serif      = { fontFamily: "'Playfair Display', serif" };

/* ════════════════════════════════════════════
   DATA — all three real case studies
════════════════════════════════════════════ */
const projects = [
  {
    id: "li-01",
    brand: "Graffixx",
    category: "Art Supplies · USA Launch",
    title: "$28K/month in 60 days. Zero history. Zero reviews.",
    growth: "$28K/mo",
    metric: "Revenue at Day 60",
    unitsSold12mo: "742.9K",
    image: "https://res.cloudinary.com/dciggvulg/image/upload/v1782560175/grow_orbit_portfolio/assets/portfolio/graffixx/main_images.jpg",
    sellerCentralImage: "/images/saler centeral screens/1.jpg",
    niche: "Alcohol Markers · Art & Hobby",
    accentColor: "#f97316",
    icon: <Palette size={14} />,
    problem: "The alcohol markers category is a visual commodity trap — 200 competitors, identical white backgrounds, same headline. A new brand with zero reviews has one opening: a better visual system than everyone else.",
    solution: "Visual-first launch architecture built around the buyer's 0.3-second click decision. Color-fan hero image on an orange background stopped the scroll and forced the click. A+ Content answered 'will it bleed?' before buyers could ask it.",
    hook: "The Image That Broke the Category",
    hookDesc: "Every competitor used white backgrounds. We used orange — because in a search row of 8 identical white squares, one warm, color-rich image captures 100% of eye movement. That single formatting decision drove 168% more clicks before a single keyword was touched.",
    stats: [
      { label: "Timeline",    val: "60 Days",     icon: <Zap size={14} className="text-orange-500" /> },
      { label: "Market",      val: "Amazon USA",  icon: <Globe size={14} className="text-orange-500" /> },
      { label: "CTR Lift",    val: "+168%",       icon: <MousePointerClick size={14} className="text-orange-500" /> },
    ],
    analytics: {
      growth:    "$28.4K",
      peakRoas:  "8.2x",
      ctrLift:   "+168%",
      acos:      "11%",
      dataScale: [0, 2, 8, 22, 45, 62, 74, 88, 95, 100],
    },
    drivers: [
      { t: "CTR Engineering",   d: "Color-fan hero on orange bg — +168% CTR vs every white-background competitor on day one." },
      { t: "Keyword Dominance", d: "340+ buyer-intent keywords mapped. Page 1 rank for 3 of the 5 highest-volume category terms." },
      { t: "A+ Conversion",     d: "7 modules answered bleed resistance, nib detail, paper compatibility — CVR doubled from 4.2% to 8.7%." },
    ],
  },
  {
    id: "li-02",
    brand: "Kazvoo",
    category: "Consumer Electronics · Grooming",
    title: "Beating Philips with zero reviews. ACoS 52% to 18%.",
    growth: "$47K/mo",
    metric: "Revenue at Day 90",
    unitsSold12mo: "1.15M",
    image: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872137/grow_orbit_portfolio/kazvo_nose_trimmer/main_image.jpg",
    sellerCentralImage: "/images/saler centeral screens/2.jpg",
    niche: "Nose Trimmer · Grooming Electronics",
    accentColor: "#22d3ee",
    icon: <Activity size={14} />,
    problem: "Philips Norelco has 80,000 reviews. Panasonic has a decade of category authority. A new brand at $24.99 with zero history has one move: make the specs undeniable before the buyer ever reaches the review count.",
    solution: "Spec-forward positioning with conversion-engineered listing architecture. We didn't compete on brand — we competed on IPX7 waterproofing, 90-min battery, and USB-C charging. Visual architecture made those specs impossible to ignore.",
    hook: "Everyone Used White. We Used Black.",
    hookDesc: "In a search row of 8 identical white-background trimmers, a single dark matte image is the only thing the eye stops on. That one formatting decision drove 142% more clicks before a single keyword or bid was changed.",
    stats: [
      { label: "Timeline",    val: "90 Days",   icon: <Zap size={14} className="text-cyan-400" /> },
      { label: "ACoS",        val: "18%",       icon: <BarChart3 size={14} className="text-cyan-400" /> },
      { label: "CVR Lift",    val: "+203%",     icon: <TrendingUp size={14} className="text-cyan-400" /> },
    ],
    analytics: {
      growth:    "$47.2K",
      peakRoas:  "6.1x",
      ctrLift:   "+142%",
      acos:      "18%",
      dataScale: [0, 1, 5, 14, 30, 52, 70, 84, 94, 100],
    },
    drivers: [
      { t: "Dark BG Disruption",  d: "Matte black hero — +142% CTR. Only dark image in a white-background category." },
      { t: "Competitor Conquest", d: "11 PPC campaigns targeting Philips, Panasonic, Wahl. ACoS from 52% to 18% in 12 weeks." },
      { t: "Spec-First A+",       d: "IPX7 / 90-min battery / USB-C visualised in 7 modules. CVR went 3.1% → 9.4%." },
    ],
  },
  {
    id: "li-03",
    brand: "Lumina Bites",
    category: "Grocery & Gourmet · Snacks",
    title: "112% MoM Growth. 742K Units Sold.",
    growth: "+112%",
    metric: "MoM Growth",
    unitsSold12mo: "742K",
    image: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872013/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/main_image.jpg",
    sellerCentralImage: "/images/saler centeral screens/3.jpg",
    niche: "Premium Cookies · Grocery",
    accentColor: "#f59e0b",
    icon: <Layers size={14} />,
    problem: "Lumina Bites had delicious, high-quality cookies, but their product images didn't convey the premium taste and texture. They needed visuals that highlighted the quality and crunch.",
    solution: "We created a full suite of listing images that showcased the cookies in lifestyle settings, highlighted the premium ingredients, and used engaging typography to emphasize the texture and taste. Optimized specifically for mobile browsing.",
    hook: "Taste Through the Screen",
    hookDesc: "We used high-contrast lighting and extreme close-ups of the ingredients to make the cookies look irresistible, instantly raising the perceived value and conversion rate.",
    stats: [
      { label: "Timeline",       val: "14 Days",    icon: <Zap size={14} className="text-amber-500" /> },
      { label: "Daily Sales",    val: "$6K+",       icon: <Award size={14} className="text-amber-500" /> },
      { label: "Buy Box",        val: "99%",        icon: <CheckCircle2 size={14} className="text-amber-500" /> },
    ],
    analytics: {
      growth:    "+112%",
      peakRoas:  "5.8x",
      ctrLift:   "+85%",
      acos:      "15%",
      dataScale: [0, 1, 6, 17, 36, 58, 72, 88, 96, 100],
    },
    drivers: [
      { t: "Ingredient Visuals",  d: "Close-up shots of premium ingredients to justify a higher price point." },
      { t: "Texture Highlights",  d: "Lighting optimized to show crunch and freshness." },
      { t: "Mobile Optimization", d: "Large typography and clear messaging designed for small screens." },
    ],
  },
];

/* ════════════════════════════════════════════
   PAGE
════════════════════════════════════════════ */
export default function CaseStudyIndex() {
  const [active, setActive] = useState(projects[0]);
  const acc = active.accentColor;

  return (
    <main className="bg-[#fafafa] text-zinc-900 min-h-screen pb-24">

      {/* ── HERO ── */}
      <section className="relative pt-[90px] sm:pt-[70px] pb-20 sm:pb-32 px-6 overflow-hidden">
        {/* Background Layers */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(249,115,22,0.1),transparent_70%)]" />

        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] border border-zinc-100 mb-12">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[9px]">
              Conversion-Driven Case Studies
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[104px] font-black tracking-tight leading-[1.05] sm:leading-[0.9] mb-10 uppercase text-zinc-900" style={montserrat}>
            <span className="block font-black text-zinc-400/30 text-[20px] sm:text-[32px] tracking-[0.2em] mb-4">From</span>
            Low-Converting<br />
            Listings to{" "}
            <span className="italic font-light text-orange-500" style={serif}>$120K/month</span>
            <br />in 90 Days.
          </h1>

          <p className="text-base sm:text-lg text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed">
            We don't just build assets; we build revenue systems. Every result below is verified performance data from real client launches.
          </p>
        </div>
      </section>

      {/* ── PROJECT GRID ── */}
      <section className="px-6 mb-28">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((project) => (
            <Link href={`/case-study/${project.id}`} key={project.id} className="group cursor-pointer block no-underline">
              <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.06)] border border-zinc-100 bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 aspect-[2/3] sm:aspect-[5/8] flex flex-col">

                {/* Upper part: Product Image */}
                <div className="relative w-full h-1/2 overflow-hidden border-b border-zinc-100">
                  <Image
                    src={project.image}
                    alt={project.brand}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Bottom part: Seller Central Image */}
                <div className="relative w-full flex-1 overflow-hidden rounded-t-[24px] sm:rounded-t-[32px] z-10 -mt-6 sm:-mt-8 border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.15)]">
                  <Image
                    src={project.sellerCentralImage}
                    alt={`${project.brand} Seller Central`}
                    fill
                    className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Very light overlay to keep screenshot extremely clear and bright */}
                  <div className="absolute inset-0 bg-black/[0.04] group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Category badge */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
                  <div className="flex items-center justify-center gap-1.5 bg-black/70 backdrop-blur-xl border border-white/10 border-t-0 rounded-b-[20px] px-5 py-1.5 shadow-xl">
                    <span style={{ color: project.accentColor }} className="shrink-0">{project.icon}</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-white/90 whitespace-nowrap">{project.category}</span>
                  </div>
                </div>

                {/* Redesigned Floating Info Overlay Card (Glassmorphic) */}
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/90 backdrop-blur-md border border-white/10 p-4 sm:p-5 rounded-[24px] text-white z-20 flex flex-col shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: project.accentColor }}>{project.brand}</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-white/50">{project.niche.split(' · ')[0]}</span>
                  </div>
                  <h3 className="text-xs sm:text-[13px] font-bold leading-snug mb-3 tracking-tight text-white/90 group-hover:text-white transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center justify-between pt-2.5 border-t border-white/15">
                    <div className="flex gap-5">
                      <div>
                        <span className="text-lg sm:text-xl font-black tracking-tighter text-white">{project.growth}</span>
                        <p className="text-[7px] uppercase tracking-widest text-white/50 mt-0.5 font-mono">{project.metric}</p>
                      </div>
                      <div>
                        <span className="text-lg sm:text-xl font-black tracking-tighter" style={{ color: project.accentColor }}>{project.unitsSold12mo}</span>
                        <p className="text-[7px] uppercase tracking-widest text-white/50 mt-0.5 font-mono">Units Sold (12mo)</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-all border border-white/20 group-hover:bg-white/20">
                      <ArrowUpRight size={14} className="text-white" />
                    </div>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── INTERACTIVE DEEP DIVE ── */}
      <section className="px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto bg-white rounded-[32px] sm:rounded-[50px] p-6 sm:p-16 border border-zinc-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] relative overflow-hidden">

          {/* Tab selector */}
          <div className="flex flex-wrap items-center gap-3 mb-10 border-b border-zinc-100 pb-6 sm:pb-8">
            <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 w-full sm:w-auto mb-2 sm:mb-0">Case Study:</span>
            {projects.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p)}
                className="flex-1 sm:flex-none px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap"
                style={active.id === p.id
                  ? { background: p.accentColor, color: "#fff", boxShadow: `0 8px 24px ${p.accentColor}40` }
                  : { background: "#f4f4f5", color: "#a1a1aa" }
                }
              >
                {p.brand}
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-16 relative z-10">

            {/* ── LEFT: Sidebar ── */}
            <div className="lg:w-[340px] shrink-0 space-y-8">

              {/* Brand + niche */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3 font-mono" style={{ color: acc }}>
                  Deep Dive: {active.brand}
                </p>
                <h2 className="text-5xl font-black tracking-tighter leading-none" style={serif}>
                  {active.brand.split(" ")[0]}.
                </h2>
                <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-3 font-mono">
                  {active.niche}
                </p>
              </div>

              {/* Stats */}
              <div className="space-y-0 divide-y divide-zinc-100">
                {active.stats.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2 font-mono">
                      {item.icon} {item.label}
                    </span>
                    <span className="text-sm font-black tracking-tight">{item.val}</span>
                  </div>
                ))}
              </div>

              {/* Analytics card */}
              <div className="bg-zinc-950 text-white p-7 rounded-[32px] relative overflow-hidden group shadow-2xl border border-white/5">
                <div className="absolute inset-0 opacity-[.03]"
                  style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "18px 18px" }} />
                <div className="absolute inset-0"
                  style={{ background: `radial-gradient(circle at 80% 20%, ${acc}15, transparent 60%)` }} />
                <div className="relative z-10">
                  <Activity style={{ color: acc }} size={22} className="mb-4" />
                  <div className="text-5xl font-black tracking-tighter mb-0.5">{active.analytics.growth}</div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 font-mono mb-6">{active.metric}</p>

                  {/* Revenue bars */}
                  <div className="h-14 flex items-end gap-[3px] mb-6">
                    {active.analytics.dataScale.map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm transition-all duration-700"
                        style={{
                          height: `${(h / Math.max(...active.analytics.dataScale)) * 100}%`,
                          background: h === Math.max(...active.analytics.dataScale)
                            ? acc
                            : `${acc}30`,
                        }} />
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-5 border-t border-white/10">
                    <div>
                      <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mb-1 font-mono">Peak ROAS</p>
                      <p className="text-sm font-black" style={{ color: acc }}>{active.analytics.peakRoas}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mb-1 font-mono">CTR Lift</p>
                      <p className="text-sm font-black text-white">{active.analytics.ctrLift}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mb-1 font-mono">ACoS</p>
                      <p className="text-sm font-black text-white">{active.analytics.acos}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mb-1 font-mono">Revenue</p>
                      <p className="text-sm font-black text-white">{active.analytics.growth}/mo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Strategy ── */}
            <div className="flex-1 space-y-12 min-w-0">

              {/* Problem / Solution */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-zinc-50 p-8 rounded-[32px] relative overflow-hidden border border-zinc-100">
                  <div className="absolute top-0 left-0 w-1 h-full bg-zinc-900 rounded-l-[32px]" />
                  <h5 className="text-[10px] font-black uppercase tracking-widest mb-3 font-mono text-zinc-500">The Problem</h5>
                  <p className="text-sm text-zinc-500 leading-relaxed font-light">{active.problem}</p>
                </div>
                <div className="p-8 rounded-[32px] relative overflow-hidden border"
                  style={{ background: `${acc}08`, borderColor: `${acc}20` }}>
                  <div className="absolute top-0 left-0 w-1 h-full rounded-l-[32px]" style={{ background: acc }} />
                  <h5 className="text-[10px] font-black uppercase tracking-widest mb-3 font-mono" style={{ color: acc }}>The Solution</h5>
                  <p className="text-sm text-zinc-700 leading-relaxed font-medium">{active.solution}</p>
                </div>
              </div>

              {/* Hook */}
              <div>
                <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase leading-tight">{active.hook}</h3>
                <p className="text-zinc-500 font-light leading-relaxed text-base">{active.hookDesc}</p>
              </div>

              {/* Drivers */}
              <div className="pt-8 border-t border-zinc-100">
                <h3 className="text-xl font-black mb-6 uppercase tracking-tight">Core Outcome Drivers</h3>
                <div className="grid gap-3">
                  {active.drivers.map((item, i) => (
                    <div key={i} className="flex items-start gap-5 p-4 rounded-2xl hover:bg-zinc-50 transition-all group cursor-default">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 transition-all group-hover:text-white"
                        style={{ ...(true && { }) }}
                        onMouseEnter={e => { e.currentTarget.style.background = acc; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "#f4f4f5"; }}>
                        <span className="text-[10px] font-black text-zinc-500 group-hover:text-white transition-colors">{i + 1}</span>
                      </div>
                      <div>
                        <p className="text-sm font-black text-zinc-900 mb-0.5">{item.t}</p>
                        <p className="text-[13px] text-zinc-500 leading-relaxed font-light">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA links */}
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 pt-4">
                <Link
                  href={`/case-study/${active.id}`}
                  className="inline-flex items-center gap-3 font-black text-[11px] uppercase tracking-[0.3em] group no-underline text-center"
                  style={{ color: acc }}
                >
                  View Full Result Roadmap
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <div className="hidden sm:block h-3 w-px bg-zinc-200 mx-2" />
                <Link
                  href="/get-started"
                  className="inline-flex items-center gap-3 text-zinc-900 font-black text-[11px] uppercase tracking-[0.3em] group no-underline"
                >
                  Book Free Strategy Call
                  <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20 sm:mt-28 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-orange-500 font-mono text-[9px] font-bold uppercase tracking-[0.4em] mb-4 sm:mb-6">Ready to be next?</p>
          <h2 className="text-[34px] sm:text-5xl md:text-6xl font-black mb-10 tracking-tighter uppercase leading-[0.85] sm:leading-[0.88]">
            Ready to scale your<br />
            <span className="italic font-light text-zinc-300" style={serif}>Amazon brand?</span>
          </h2>
          <Link
            href="/get-started"
            className="w-full sm:w-auto bg-zinc-900 text-white px-10 sm:px-12 py-4 sm:py-5 rounded-full font-black text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] hover:bg-orange-500 transition-all inline-flex items-center justify-center gap-4 shadow-2xl no-underline group"
          >
            Book Free Strategy Call
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}