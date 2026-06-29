"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Search, BarChart3, Zap, Settings,
  Palette, Shield, Globe, Star, ChevronRight, Activity,
  TrendingUp, Package, Users, Layers, Camera, FileText,
  Target, Monitor, Radio, Gavel, BookOpen, Layout,
  MousePointerClick, Sparkles, Award, Cpu, HeartHandshake,
} from "lucide-react";

/* ─────────────────────────────────────────────
   SERVICE DATA
───────────────────────────────────────────── */
const categories = [
  { id: "all",     label: "All Services",      count: 19 },
  { id: "amazon",  label: "Amazon Services",   count: 8  },
  { id: "design",  label: "Design & Creative", count: 7  },
  { id: "full",    label: "Full Service",       count: 4  },
];

const services = [
  /* ── AMAZON SERVICES ── */
  {
    id: "product-hunting-sourcing",
    category: "amazon",
    categoryLabel: "Amazon Services",
    icon: <Search size={22} />,
    title: "Product Hunting & Sourcing",
    subtitle: "Find winning products",
    desc: "Discover high-margin, low-competition products and connect with reliable manufacturers for scalable sourcing.",
    href: "/service/product-hunting-sourcing",
    tags: ["Product Research", "Sourcing", "FBA"],
    stat: { val: "100%", label: "data driven" },
    highlight: true,
  },
  {
    id: "audit-strategy",
    category: "amazon",
    categoryLabel: "Amazon Services",
    icon: <Search size={22} />,
    title: "Audit & Strategy",
    subtitle: "Deep-dive account diagnostics",
    desc: "72-hour surgical account autopsy. We identify wasted spend, ranking gaps, and competitor blind spots — and hand you a 24-month execution blueprint.",
    href: "/service/audit-strategy",
    tags: ["PPC", "SEO", "Strategy"],
    stat: { val: "$4.2K", label: "avg waste found" },
    highlight: false,
  },
  {
    id: "brand-launch",
    category: "amazon",
    categoryLabel: "Amazon Services",
    icon: <Zap size={22} />,
    title: "Brand Launch Setup",
    subtitle: "End-to-end Amazon launch",
    desc: "From first listing to first sale — a fully managed launch covering listings, PPC structure, Brand Registry, and day-one velocity strategy.",
    href: "/service/brand-launch",
    tags: ["Launch", "PPC", "Brand Registry"],
    stat: { val: "90 Days", label: "to full velocity" },
    highlight: false,
  },
  {
    id: "listing-optimization",
    category: "amazon",
    categoryLabel: "Amazon Services",
    icon: <TrendingUp size={22} />,
    title: "Listing Optimization",
    subtitle: "SEO & keyword ranking",
    desc: "Full listing overhaul — title, bullets, description, backend keywords, and A9 indexing — built to rank for the terms that convert, not just the ones with volume.",
    href: "/service/listing-optimization",
    tags: ["SEO", "Keywords", "Rankings"],
    stat: { val: "+31%", label: "avg organic lift" },
    highlight: false,
  },
  {
    id: "ppc-efficiency",
    category: "amazon",
    categoryLabel: "Amazon Services",
    icon: <BarChart3 size={22} />,
    title: "PPC Efficiency",
    subtitle: "Profitable ad scaling",
    desc: "We turn your ad account into a precision engine — eliminating wasted spend, building campaign architecture, and scaling ROAS systematically.",
    href: "/service/ppc-efficiency",
    tags: ["PPC", "ROAS", "Ad Spend"],
    stat: { val: "+40%", label: "avg ROAS lift" },
    highlight: true,
  },
  {
    id: "growth-automation",
    category: "amazon",
    categoryLabel: "Amazon Services",
    icon: <Cpu size={22} />,
    title: "Growth Automation",
    subtitle: "Automate repetitive tasks",
    desc: "We build automated workflows that handle repricing, inventory alerts, reorder triggers, and review requests — giving you back hours every week.",
    href: "/service/growth-automation",
    tags: ["Automation", "Efficiency", "Scale"],
    stat: { val: "8h+", label: "saved per week" },
    highlight: false,
  },
  {
    id: "account-ops",
    category: "amazon",
    categoryLabel: "Amazon Services",
    icon: <Settings size={22} />,
    title: "Account Operations",
    subtitle: "Full account management",
    desc: "Day-to-day Amazon account management — listing health, suppression recovery, case management, and proactive account defense.",
    href: "/service/account-ops",
    tags: ["Management", "Defense", "Health"],
    stat: { val: "0",    label: "suppression risk" },
    highlight: false,
  },
  {
    id: "ongoing-support",
    category: "amazon",
    categoryLabel: "Amazon Services",
    icon: <Activity size={22} />,
    title: "Ongoing Support",
    subtitle: "Continuous optimization",
    desc: "Monthly optimization retainer — weekly performance analysis, strategy pivots, and a dedicated team that keeps your account growing every cycle.",
    href: "/service/ongoing-support",
    tags: ["Retainer", "Monthly", "Optimization"],
    stat: { val: "7 Days", label: "review cycle" },
    highlight: false,
  },

  /* ── DESIGN & CREATIVE ── */
  {
    id: "brand-guidelines",
    category: "design",
    categoryLabel: "Design & Creative",
    icon: <Palette size={22} />,
    title: "Brand Guidelines",
    subtitle: "Visual identity systems",
    desc: "A complete brand identity system — logo rules, color palette, typography, and usage standards that make every asset instantly recognizable.",
    href: "/service/design/brand-guidelines",
    tags: ["Branding", "Identity", "Design"],
    stat: { val: "100%", label: "brand consistency" },
    highlight: false,
  },
  {
    id: "brand-story",
    category: "design",
    categoryLabel: "Design & Creative",
    icon: <BookOpen size={22} />,
    title: "Brand Story",
    subtitle: "Narrative & positioning",
    desc: "Strategic Amazon Brand Story modules that build trust, showcase your catalog, and convert browsers into loyal customers — above your A+ Content.",
    href: "/service/design/brand-story",
    tags: ["Brand Story", "Conversion", "Design"],
    stat: { val: "+22%", label: "avg CVR lift" },
    highlight: false,
  },
  {
    id: "brand-store",
    category: "design",
    categoryLabel: "Design & Creative",
    icon: <Layout size={22} />,
    title: "Brand Store",
    subtitle: "Custom Amazon storefronts",
    desc: "A professionally designed Amazon Brand Store with custom sub-pages, product architecture, and vanity URL — zero competitor ads, all your products.",
    href: "/service/design/brand-store",
    tags: ["Brand Store", "Design", "Vanity URL"],
    stat: { val: "+35%", label: "avg sales lift" },
    highlight: false,
  },
  {
    id: "listing-images",
    category: "design",
    categoryLabel: "Design & Creative",
    icon: <Camera size={22} />,
    title: "Listing Images",
    subtitle: "3D renders & photography",
    desc: "All 7 image slots designed for conversion — hero shots, lifestyle photography, infographics, comparison images, and 3D renders.",
    href: "/service/design/listing-image-systems",
    tags: ["Photography", "Design", "Images"],
    stat: { val: "+28%", label: "avg CVR lift" },
    highlight: true,
  },
  {
    id: "ebc-aplus",
    category: "design",
    categoryLabel: "Design & Creative",
    icon: <Sparkles size={22} />,
    title: "Enhanced Brand Content A+",
    subtitle: "Premium A+ page design",
    desc: "Visually-led A+ Content modules that tell your brand story below the fold — comparison charts, feature callouts, and lifestyle imagery that converts.",
    href: "/service/design/enhanced-brand-content",
    tags: ["A+ Content", "EBC", "Design"],
    stat: { val: "+18%", label: "avg conv. lift" },
    highlight: false,
  },
  {
    id: "main-image-ctr",
    category: "design",
    categoryLabel: "Design & Creative",
    icon: <MousePointerClick size={22} />,
    title: "Main Image CTR",
    subtitle: "Click-through optimization",
    desc: "Your main image wins or loses the click in 1.3 seconds. We design hero shots engineered for your specific search grid — thumbnail-tested and category-dominant.",
    href: "/service/design/main-image-ctr",
    tags: ["CTR", "Main Image", "Search"],
    stat: { val: "+40%", label: "avg CTR lift" },
    highlight: false,
  },
  {
    id: "full-listing-optimization",
    category: "design",
    categoryLabel: "Design & Creative",
    icon: <Layers size={22} />,
    title: "Full Listing Optimization",
    subtitle: "Complete listing overhaul",
    desc: "Every visual element of your listing — main image, secondary images, A+ Content, and Brand Story — rebuilt as a unified conversion system.",
    href: "/service/design/full-listing-optimization",
    tags: ["Full Overhaul", "Design", "Conversion"],
    stat: { val: "7 Slots", label: "fully optimized" },
    highlight: false,
  },

  /* ── FULL SERVICE ── */
  {
    id: "full-amazon-management",
    category: "full",
    categoryLabel: "Full Service",
    icon: <Award size={22} />,
    title: "Full Amazon Management",
    subtitle: "Complete hands-off management",
    desc: "We run your entire Amazon operation — PPC, SEO, listings, design, account health, and strategy. You focus on your product. We handle everything else.",
    href: "/service/full/amazon-management",
    tags: ["Full Management", "Hands-off", "Scale"],
    stat: { val: "100%", label: "handled for you" },
    highlight: true,
  },
  {
    id: "sops",
    category: "full",
    categoryLabel: "Full Service",
    icon: <FileText size={22} />,
    title: "SOPs",
    subtitle: "Standard operating procedures",
    desc: "Custom Amazon SOPs built for your team — covering every workflow from listing management to PPC optimization, ready for delegation or hiring.",
    href: "/service/sop",
    tags: ["Documentation", "Systems", "Delegation"],
    stat: { val: "30+", label: "workflow templates" },
    highlight: false,
  },
  {
    id: "coaching",
    category: "full",
    categoryLabel: "Full Service",
    icon: <HeartHandshake size={22} />,
    title: "Coaching & Consultation",
    subtitle: "1-on-1 expert strategy",
    desc: "Direct access to our senior strategists for 1-on-1 coaching sessions. Get answers, validate decisions, and get a tailored action plan in a single call.",
    href: "/service/coaching-consultation",
    tags: ["Coaching", "1-on-1", "Strategy"],
    stat: { val: "4.9★", label: "Rating" },
    highlight: false,
  },
  /* ── OTHER ── */
  {
    id: "dtc-website",
    category: "full",
    categoryLabel: "Other Services",
    icon: <Monitor size={22} />,
    title: "DTC Website",
    subtitle: "Custom e-commerce platforms",
    desc: "A conversion-optimized DTC website built to capture the customers your Amazon brand has earned — Shopify, headless, or custom stack.",
    href: "/service/dtc-website",
    tags: ["Website", "DTC", "Shopify"],
    stat: { val: "+143%", label: "CVR Lift" },
    highlight: false,
  },
  {
    id: "amazon-dsp",
    category: "full",
    categoryLabel: "Other Services",
    icon: <Radio size={22} />,
    title: "Amazon DSP",
    subtitle: "Demand-side platform ads",
    desc: "Programmatic advertising that reaches your audience on and off Amazon — display, video, and audio ads targeting real purchase behavior.",
    href: "/service/amazon-dsp",
    tags: ["DSP", "Programmatic", "Advertising"],
    stat: { val: "+34%", label: "avg ROAS lift" },
    highlight: false,
  },
  {
    id: "trademark",
    category: "full",
    categoryLabel: "Other Services",
    icon: <Gavel size={22} />,
    title: "Trademark Registration",
    subtitle: "Brand Registry & IP",
    desc: "Protect your brand in 7 countries and unlock Amazon Brand Registry — the key to A+ Content, Brand Stories, and hijacker protection.",
    href: "/service/trademark-registration",
    tags: ["Trademark", "Legal", "Brand Registry"],
    stat: { val: "7", label: "countries covered" },
    highlight: false,
  },
];

/* ─────────────────────────────────────────────
   SERVICE CARD
───────────────────────────────────────────── */
function ServiceCard({ service }) {
  return (
    <Link
      href={service.href}
      className="group relative flex flex-col bg-white rounded-[28px] border border-zinc-100 hover:border-orange-500/25 hover:shadow-2xl hover:shadow-zinc-200/60 transition-all duration-500 overflow-hidden no-underline"
    >
      {service.highlight && (
        <div className="h-[2px] w-full bg-linear-to-r from-orange-500 to-amber-400" />
      )}

      <div className="p-7 flex flex-col flex-1">
        {/* Top row */}
        <div className="flex items-start justify-between mb-5">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
            service.highlight
              ? "bg-orange-500 text-white"
              : "bg-orange-50 border border-orange-100 text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500"
          }`}>
            {service.icon}
          </div>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <ArrowUpRight size={16} className="text-orange-500" />
          </div>
        </div>

        {/* Category label */}
        <span className="text-[9px] font-mono font-bold uppercase tracking-[0.35em] text-orange-500/60 mb-2">
          {service.categoryLabel}
        </span>

        {/* Title */}
        <h3
          className="text-[17px] font-black uppercase tracking-tight text-zinc-900 mb-1 group-hover:text-orange-500 transition-colors leading-tight"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {service.title}
        </h3>
        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4">{service.subtitle}</p>

        {/* Description */}
        <p className="text-zinc-500 text-[13px] font-light leading-relaxed flex-1 mb-6">
          {service.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {service.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 border border-zinc-100 group-hover:border-orange-500/20 px-2.5 py-1 rounded-lg transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stat row */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-50 group-hover:border-orange-500/10 transition-colors">
          <div>
            <span
              className="text-xl font-black tracking-tighter text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {service.stat.val}
            </span>
            <span className="text-[10px] font-mono text-zinc-400 ml-2 uppercase tracking-widest">
              {service.stat.label}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-orange-500 font-bold text-[10px] uppercase tracking-widest">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">View</span>
            <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   FEATURED CARD (tall, for highlights)
───────────────────────────────────────────── */
function FeaturedCard({ service, isFullWidth = false }) {
  if (isFullWidth) {
    return (
      <Link
        href={service.href}
        className="group relative flex flex-col md:flex-row bg-gradient-to-br from-zinc-900 via-zinc-950 to-black rounded-[28px] border border-zinc-800/80 hover:border-orange-500/50 hover:shadow-[0_0_50px_rgba(249,115,22,0.12)] transition-all duration-500 overflow-hidden no-underline ring-1 ring-orange-500/10 w-full hover:-translate-y-0.5"
      >
        {/* Glowing border top */}
        <div className="h-[2px] w-full absolute top-0 left-0 bg-linear-to-r from-orange-500 via-amber-400 to-orange-500" />
        
        {/* Soft corner radial glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/[0.03] blur-[80px] rounded-full pointer-events-none" />

        {/* Content Section (Left side) */}
        <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500 shadow-[0_0_15px_rgba(249,115,22,0.15)] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                {service.icon}
              </div>
              <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-full">
                <Star size={9} className="text-orange-400 fill-orange-400 animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-[0.25em] text-orange-400">Flagship Service</span>
              </div>
            </div>

            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.35em] text-orange-400/60 mb-2.5 block">
              {service.categoryLabel}
            </span>
            <h3
              className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-orange-400 transition-colors leading-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {service.title}
            </h3>
            <p className="text-[11px] font-bold text-orange-500/80 uppercase tracking-widest mb-4">{service.subtitle}</p>
            <p className="text-zinc-400 text-sm sm:text-[15px] font-light leading-relaxed max-w-2xl mb-6">{service.desc}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag, i) => (
              <span key={i} className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 bg-white/[0.02] border border-zinc-800 group-hover:border-orange-500/30 px-3 py-1.5 rounded-xl transition-all">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Stats Section (Right side on desktop) */}
        <div className="p-8 sm:p-10 md:w-[320px] shrink-0 bg-white/[0.01] border-t md:border-t-0 md:border-l border-zinc-800/60 flex flex-col justify-center items-start md:items-center text-left md:text-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-500/[0.01] pointer-events-none" />
          <div className="mb-6 md:mb-8">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">Performance Guarantee</span>
            <span 
              className="text-5xl sm:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)] block"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {service.stat.val}
            </span>
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mt-2 block">
              {service.stat.label}
            </span>
          </div>

          <div className="inline-flex items-center gap-2.5 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-full font-bold text-[10px] uppercase tracking-widest group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white transition-all duration-300 w-full md:w-auto justify-center">
            <span>Explore Flagship</span>
            <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </Link>
    );
  }

  // Standard premium FeaturedCard
  return (
    <Link
      href={service.href}
      className="group relative flex flex-col bg-gradient-to-br from-zinc-900 via-zinc-950 to-black rounded-[28px] border border-zinc-800/80 hover:border-orange-500/50 hover:shadow-[0_0_40px_rgba(249,115,22,0.08)] transition-all duration-500 overflow-hidden no-underline ring-1 ring-orange-500/15 flex-1 hover:-translate-y-1"
    >
      <div className="h-[2px] w-full bg-linear-to-r from-orange-500 to-amber-400" />
      
      {/* Corner radial glow */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-orange-500/[0.02] blur-[40px] rounded-full pointer-events-none" />

      <div className="p-7 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-start justify-between mb-6">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500 shadow-[0_0_15px_rgba(249,115,22,0.1)] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.25)]">
              {service.icon}
            </div>
            <div className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full">
              <Star size={8} className="text-orange-400 fill-orange-400" />
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-orange-400">Featured</span>
            </div>
          </div>

          <span className="text-[9px] font-mono font-bold uppercase tracking-[0.35em] text-orange-400/60 mb-2 block">
            {service.categoryLabel}
          </span>
          <h3
            className="text-[18px] font-black uppercase tracking-tight text-white mb-1 group-hover:text-orange-400 transition-colors leading-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {service.title}
          </h3>
          <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-4">{service.subtitle}</p>
          <p className="text-zinc-400 text-[13px] font-light leading-relaxed mb-6">{service.desc}</p>
        </div>

        <div>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {service.tags.map((tag, i) => (
              <span key={i} className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 border border-zinc-800/80 group-hover:border-orange-500/25 px-2.5 py-1 rounded-lg transition-colors">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/[0.05] group-hover:border-orange-500/10 transition-colors">
            <div>
              <span 
                className="text-2xl font-black tracking-tighter text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.2)]" 
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {service.stat.val}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 ml-2 uppercase tracking-widest">
                {service.stat.label}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-orange-400 font-bold text-[10px] uppercase tracking-widest">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">View</span>
              <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function AllServicesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  const filtered = services.filter((s) => {
    const matchCat = activeCategory === "all" || s.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const highlights = filtered.filter((s) => s.highlight);
  const regular = filtered.filter((s) => !s.highlight);

  return (
    <div
      className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .card-appear { animation: fade-up 0.35s ease both; }
      `}</style>

      {/* ── PAGE HEADER ── */}
      <div className="pt-32 pb-24 bg-zinc-950 relative overflow-hidden border-b border-white/5">
        <style>{`
          @keyframes float-slow {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(1deg); }
          }
          @keyframes float-med {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(-1deg); }
          }
          @keyframes orbit-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
        
        {/* Deep Dark Ambient Lighting */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/[0.04] blur-[150px] rounded-full translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-500/[0.03] blur-[150px] rounded-full -translate-x-1/3 translate-y-1/4" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.02] mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
            <pattern id="svc-grid-dark" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#svc-grid-dark)" />
          </svg>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Left Column: Typography */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse shadow-[0_0_8px_#f97316]" />
                <div className="w-6 h-[1px] bg-orange-500" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-400">
                  The Full Orbit Suite
                </span>
              </div>

              <h1
                className="text-[46px] sm:text-6xl md:text-7xl lg:text-[85px] font-black tracking-tighter leading-[0.85] text-white uppercase mb-8"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Every service<br />
                <span className="text-orange-500 relative inline-block">
                  you need
                  <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-orange-500/20 rounded-full" />
                </span> to<br />
                <span
                  className="italic font-light lowercase tracking-tight text-zinc-500"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  win on Amazon.
                </span>
              </h1>

              <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-xl mb-12">
                From your first listing to full account management — a complete catalog of services designed to drive measurable growth.
              </p>

              {/* Quick stats (Dark mode adapted) */}
              <div className="flex flex-wrap gap-8 sm:gap-12">
                {[
                  { val: "18",   label: "Specialized Services" },
                  { val: "3",    label: "Core Categories"      },
                  { val: "80+",  label: "Brands Scaled"        },
                ].map((s, i) => (
                  <div key={i} className="text-left">
                    <p className="text-3xl font-black tracking-tighter text-white mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.val}</p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-zinc-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Premium Visual "Constellation" */}
            <div className="lg:col-span-5 relative hidden lg:flex justify-center items-center h-[400px] lg:h-[500px] perspective-1000 lg:mt-[60px] self-start">
               
               {/* Central Core */}
               <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 absolute z-20 flex items-center justify-center shadow-[0_0_60px_rgba(249,115,22,0.4)] ring-4 ring-zinc-950">
                  <Award size={40} className="text-white" />
               </div>

               {/* Orbital Rings */}
               <div className="w-[280px] h-[280px] rounded-full border border-white/5 absolute animate-[orbit-spin_20s_linear_infinite]" />
               <div className="w-[420px] h-[420px] rounded-full border border-white/5 absolute animate-[orbit-spin_30s_linear_infinite_reverse]" />
               
               {/* Floating Cards (Design) */}
               <div className="absolute top-10 left-0 bg-zinc-900/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl z-30 shadow-2xl flex items-center gap-3 animate-[float-slow_6s_ease-in-out_infinite]">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center border border-violet-500/30">
                     <Palette size={20} />
                  </div>
                  <div>
                    <p className="text-[8px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-0.5">Creative</p>
                    <p className="text-[11px] font-black uppercase text-white">Listing Assets</p>
                  </div>
               </div>

               {/* Floating Cards (Amazon) */}
               <div className="absolute bottom-12 right-0 bg-zinc-900/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl z-30 shadow-2xl flex items-center gap-3 animate-[float-med_7s_ease-in-out_infinite]">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                     <BarChart3 size={20} />
                  </div>
                  <div>
                    <p className="text-[8px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-0.5">Amazon</p>
                    <p className="text-[11px] font-black uppercase text-white">PPC Efficiency</p>
                  </div>
               </div>

               {/* Floating Cards (Other) */}
               <div className="absolute -top-4 right-10 bg-zinc-900/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl z-30 shadow-2xl flex items-center gap-3 animate-[float-slow_5s_ease-in-out_infinite_reverse]">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                     <Globe size={20} />
                  </div>
                  <div>
                    <p className="text-[8px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-0.5">Scale</p>
                    <p className="text-[11px] font-black uppercase text-white">DTC & Off-Amazon</p>
                  </div>
               </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── STICKY FILTER BAR ── */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-zinc-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">

            {/* Category tabs */}
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0 -mx-6 px-6 sm:mx-0 sm:px-0 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex shrink-0 items-center gap-2 px-4 py-2 sm:py-2.5 rounded-full sm:rounded-xl font-bold text-[10px] sm:text-[11px] uppercase tracking-widest transition-all duration-300 border ${
                    activeCategory === cat.id
                      ? "bg-zinc-900 text-white border-zinc-900 shadow-lg"
                      : "bg-transparent text-zinc-500 border-zinc-200/50 hover:text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  {cat.label}
                  <span className={`text-[9px] font-black rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center transition-colors ${
                    activeCategory === cat.id ? "bg-orange-500 text-white" : "bg-zinc-100 text-zinc-500"
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative shrink-0 w-full sm:w-auto">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services..."
                className="w-full sm:w-56 pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-100 rounded-xl text-[12px] font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500/40 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── SERVICES GRID ── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">

        {/* Results count */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-8 sm:mb-10">
          <div className="flex items-start sm:items-center gap-3 w-full sm:w-auto">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1 sm:mt-0" />
            <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-400 break-words leading-relaxed">
              {filtered.length} service{filtered.length !== 1 ? "s" : ""}
              {activeCategory !== "all" && ` in ${categories.find(c => c.id === activeCategory)?.label}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
          </div>
          {(activeCategory !== "all" || searchQuery) && (
            <button
              onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
              className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-orange-500 transition-colors"
            >
              Clear filters ×
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4 opacity-30">🔍</div>
            <p className="text-zinc-500 text-lg font-light">No services match your search.</p>
            <button onClick={() => { setActiveCategory("all"); setSearchQuery(""); }} className="mt-4 text-orange-500 font-bold text-[11px] uppercase tracking-widest hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <>
             {/* Featured / highlight cards */}
             {highlights.length > 0 && (
               <div className="mb-6 space-y-5">
                 <div className={`grid gap-5 ${
                   highlights.length === 1 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" :
                   highlights.length === 2 ? "grid-cols-1 md:grid-cols-2" :
                   "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                 }`}>
                   {highlights.slice(0, 3).map((s, i) => (
                     <div key={s.id} className="card-appear" style={{ animationDelay: `${i * 0.06}s` }}>
                       <FeaturedCard service={s} />
                     </div>
                   ))}
                   {/* Fill remaining slots in highlights row with regular cards if ≤2 highlights */}
                   {highlights.length < 3 && regular.slice(0, 3 - highlights.length).map((s, i) => (
                     <div key={s.id} className="card-appear" style={{ animationDelay: `${(i + highlights.length) * 0.06}s` }}>
                       <ServiceCard service={s} />
                     </div>
                   ))}
                 </div>

                 {/* Remaining highlights (e.g. 4th card) rendered full-width */}
                 {highlights.slice(3).map((s, i) => (
                   <div key={s.id} className="card-appear w-full" style={{ animationDelay: `${(i + 3) * 0.06}s` }}>
                     <FeaturedCard service={s} isFullWidth={true} />
                   </div>
                 ))}
               </div>
             )}

            {/* Regular cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {(highlights.length > 0 ? regular.slice(Math.max(0, 3 - highlights.length)) : regular).map((s, i) => (
                <div key={s.id} className="card-appear" style={{ animationDelay: `${i * 0.04}s` }}>
                  <ServiceCard service={s} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── CATEGORY QUICK LINKS ── */}
      <div className="bg-white border-t border-zinc-100 py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                cat: "amazon",
                icon: <TrendingUp size={24} />,
                label: "Amazon Services",
                desc: "Everything you need to dominate Amazon search results and scale profitably.",
                count: 8,
                color: "from-orange-500 to-amber-400",
              },
              {
                cat: "design",
                icon: <Palette size={24} />,
                label: "Design & Creative",
                desc: "Premium visual assets engineered to convert browsers into loyal buyers.",
                count: 7,
                color: "from-violet-500 to-orange-400",
              },
              {
                cat: "full",
                icon: <Award size={24} />,
                label: "Full Service & Other",
                desc: "Complete hands-off management and advanced multi-channel growth strategies.",
                count: 7,
                color: "from-rose-500 to-orange-500",
              },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => { setActiveCategory(item.cat); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="group text-left bg-[#fafafa] hover:bg-white rounded-[28px] p-8 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/60"
              >
                <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${item.color} flex items-center justify-center text-white mb-5`}>
                  {item.icon}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-black text-[14px] uppercase tracking-tight text-zinc-900 group-hover:text-orange-500 transition-colors">
                    {item.label}
                  </h3>
                  <span className="text-[9px] font-black text-orange-500 bg-orange-50 border border-orange-100 px-1.5 py-0.5 rounded-md">
                    {item.count}
                  </span>
                </div>
                <p className="text-zinc-500 text-sm font-light leading-relaxed mb-4">{item.desc}</p>
                <div className="flex items-center gap-2 text-orange-500 font-bold text-[10px] uppercase tracking-widest group-hover:gap-3 transition-all">
                  Browse Category <ArrowRight size={12} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA STRIP ── */}
      <div className="pb-16 bg-[#fafafa]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="bg-[#0a0a0a] rounded-[32px] sm:rounded-[36px] py-10 sm:py-14 px-6 sm:px-8 lg:px-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden border border-white/5 hover:border-orange-500/20 transition-colors duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.08),transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
              <Sparkles size={280} strokeWidth={0.3} className="text-orange-500 opacity-[0.04] -mr-20 hidden sm:block" />
            </div>

            <div className="relative z-10 w-full md:w-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-white font-bold text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                  ● Currently onboarding 3–4 brands · Limited slots this month
                </span>
              </div>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-white uppercase leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Book a free strategy call.<br />
                <span className="italic font-light text-orange-500 lowercase block mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  We'll map the right path.
                </span>
              </h2>
            </div>

            <div className="relative z-10 shrink-0 w-full md:w-auto mt-2 md:mt-0">
              <Link
                href="/contact"
                className="inline-flex justify-center items-center gap-4 px-6 sm:px-8 py-4 sm:py-4 bg-orange-500 text-white rounded-full sm:rounded-2xl font-black text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-white hover:text-black transition-all duration-500 shadow-[0_10px_30px_rgba(249,115,22,0.3)] no-underline w-full md:w-auto"
              >
                Book Free Strategy Call
                <ArrowRight size={14} className="sm:w-4 sm:h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
