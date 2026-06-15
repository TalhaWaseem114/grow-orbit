"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, ClipboardCheck, Rocket, Search, BarChart3,
  Cpu, Globe, LifeBuoy, CheckCircle2, ChevronRight,
  Star, Terminal, Target, Zap, ShieldCheck, TrendingUp,
  Activity, Package, DollarSign, ArrowUpRight, Settings, LineChart,
  Layers,
} from "lucide-react";
import gsap from "gsap";
import HeroButton from "@/components/ui/HeroButton";
const WhoItsFor = dynamic(() => import("@/components/service/amazon services/WhoItsFor"), { ssr: false });

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
function AmazonServicesHero() {
  const terminalRef = useRef(null);

  useEffect(() => {
    if (!terminalRef.current) return;
    // The floating animation for the right-side visual
    gsap.to(terminalRef.current, {
      y: -15,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-zinc-950">
      {/* Global Scoped Styles for Animations */}
      <style>{`
        @keyframes scan-amz {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; } 90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes shimmer-btn {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      {/* Background Layer (Copied from Management Style) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.04] to-transparent animate-[scan-amz_9s_linear_infinite]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="amz-grid-dark" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#fff" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#amz-grid-dark)" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(249,115,22,0.1),transparent_55%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left Column: Content */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
              <div className="w-6 h-[1px] bg-orange-500/50" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
                Amazon Growth Services
              </span>
            </div>

            <div className="mb-6 inline-flex">
              <Link
                href="/amazon-services-landing"
                className="group flex items-center gap-2.5 bg-orange-500/10 border border-orange-500/20 hover:border-orange-500/40 text-orange-500 px-4 py-2 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-widest no-underline transition-all duration-300 shadow-[0_4px_20px_rgba(249,115,22,0.05)]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Looking for our Specialized Amazon Landing Page?
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <h1
              className="text-6xl md:text-7xl lg:text-[85px] font-black tracking-tighter leading-[0.85] mb-8 text-white uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Amazon<br />
              <span className="text-orange-500">Services</span><br />
              <span className="italic font-light lowercase tracking-tight text-zinc-500" style={{ fontFamily: "'Playfair Display', serif" }}>
                suite.
              </span>
            </h1>

            <div className="flex gap-6 mb-10">
              <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50" />
              <div>
                <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-xl mb-6">
                  Every service is engineered to move your Amazon brand from invisible to dominant. Choose what you need, or combine them into a custom growth stack.
                </p>
                <div className="flex flex-wrap gap-6 font-mono text-[9px] text-zinc-600 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>7 Core Services Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Terminal size={10} className="text-orange-500/50" />
                    <span>Full Amazon Stack</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 mb-12">
              <Link href="/contact" className="group relative overflow-hidden flex items-center justify-center gap-3 bg-gradient-to-r from-orange-600 to-orange-400 hover:scale-[1.02] active:scale-95 transition-all duration-300 text-white font-black text-[11px] uppercase tracking-[0.25em] px-10 py-4 rounded-full no-underline shadow-[0_10px_40px_rgba(249,115,22,0.4)] w-full sm:w-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer-btn_2s_linear_infinite]" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Book Free Strategy Call
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <a href="#services" className="group flex items-center justify-center sm:justify-start gap-3 text-zinc-500 hover:text-white font-bold text-[11px] uppercase tracking-widest px-2 py-4 transition-colors no-underline w-full sm:w-auto">
                Explore Services <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Bottom Stats (Dark Mode Styling) */}
            <div className="flex flex-wrap items-center gap-10 pt-10 border-t border-white/5">
              {[
                { label: "Brands Managed", val: "80+" },
                { label: "Revenue Generated", val: "$12M+" },
                { label: "Avg Organic Lift", val: "+60%" },
              ].map((t, i) => (
                <div key={i}>
                  <p className="text-4xl font-black tracking-tighter text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>{t.val}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{t.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Component (The "Service Stack" Terminal) */}
          <div className="lg:col-span-5 relative block mt-14 lg:mt-[60px] scale-[0.95] sm:scale-100 origin-top lg:origin-center" ref={terminalRef}>
            {/* Floating Badges */}
            <div className="absolute -top-4 -right-4 bg-zinc-900 rounded-[20px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-30 border border-white/5">
              <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                <Zap size={20} fill="currentColor" />
              </div>
            </div>

            {/* The Glass Console */}
            <div className="bg-zinc-900/80 backdrop-blur-xl rounded-[28px] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden">
              <div className="px-5 py-4 border-b border-white/5 flex items-center gap-4 bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                </div>
                <div className="flex-1 bg-black/20 rounded-lg px-4 py-1.5 flex items-center gap-2 border border-white/5">
                  <Layers size={10} className="text-zinc-500" />
                  <span className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase">service_stack.config</span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Simulated Service Deployment List */}
                <div className="space-y-2">
                  <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.2em] mb-3">Core Modules Available</p>
                  {[
                    { icon: <Search size={14} />, label: "SEO & Keyword Ranking", status: "Ready", color: "text-emerald-500" },
                    { icon: <BarChart3 size={14} />, label: "PPC Management", status: "Active", color: "text-orange-500" },
                    { icon: <Layers size={14} />, label: "A+ Content Design", status: "Ready", color: "text-emerald-500" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 group hover:bg-white/[0.06] transition-colors">
                      <div className="text-orange-500 opacity-60 group-hover:opacity-100 transition-opacity">{s.icon}</div>
                      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wide">{s.label}</span>
                      <div className="ml-auto flex items-center gap-2">
                        <div className={`w-1 h-1 rounded-full animate-pulse ${s.color === 'text-emerald-500' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                        <span className={`text-[9px] font-mono ${s.color}`}>{s.status}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Growth Chart Mockup */}
                <div className="bg-black/40 rounded-2xl p-4 border border-white/5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Global Reach Lift</span>
                    <span className="text-[10px] font-black text-orange-400">OPTIMIZED</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-16">
                    {[40, 30, 55, 45, 70, 60, 85, 75, 95, 80, 100].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t-sm transition-all duration-1000 ${i === 10 ? 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'bg-white/10'}`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 py-2 border-t border-white/5">
                  <span className="text-[9px] font-mono text-zinc-600 uppercase">System Status:</span>
                  <span className="text-[9px] font-mono text-emerald-500 uppercase">Operational</span>
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
   02 — SERVICE CARDS GRID
   ═══════════════════════════════════════════════ */
function ServiceCards() {
  const services = [
    {
      icon: <ClipboardCheck size={22} />,
      title: "Audit & Strategy",
      desc: "Deep-dive listing and ad account inspections to uncover hidden revenue leaks and build a data-backed growth roadmap.",
      href: "/service/audit-strategy",
      features: ["PPC waste identification", "Listing conversion audit", "Competitor gap analysis", "Growth roadmap"],
      tag: "Insight",
    },
    {
      icon: <Rocket size={22} />,
      title: "Brand Launch Setup",
      desc: "End-to-end Amazon launch structure — SEO, listing architecture, PPC strategy, and FBA logistics from day one.",
      href: "/service/brand-launch",
      features: ["Keyword matrix & SEO", "A+ Content setup", "PPC launch structure", "FBA shipment planning"],
      tag: "Launch",
    },
    {
      icon: <Search size={22} />,
      title: "Listing Optimization",
      desc: "Precision SEO copywriting, backend keyword optimization, and index tracking to push your listings to page one.",
      href: "/service/listing-optimization",
      features: ["SEO copywriting", "Backend optimization", "Index tracking", "Keyword gap analysis"],
      tag: "Visibility",
    },
    {
      icon: <BarChart3 size={22} />,
      title: "PPC Efficiency",
      desc: "Campaign architecture, bid optimization, and search term harvesting engineered for predictable ACoS and compounding ROAS.",
      href: "/service/ppc-efficiency",
      features: ["Bid optimization", "Search term harvesting", "Negative keyword mining", "Weekly management"],
      tag: "Growth",
    },
    {
      icon: <Cpu size={22} />,
      title: "Growth Automation",
      desc: "Automate repetitive operations — from dynamic pricing to inventory triggers and automated review workflows.",
      href: "/service/growth-automation",
      features: ["Dynamic pricing", "Inventory triggers", "Automated reviews", "Data dashboards"],
      tag: "Efficiency",
    },
    {
      icon: <Globe size={22} />,
      title: "Account Ops",
      desc: "Full account management — daily monitoring, inventory forecasting, case management, and performance reporting.",
      href: "/service/account-ops",
      features: ["Daily monitoring", "Inventory planning", "Policy compliance", "Performance reports"],
      tag: "Full Ops",
    },
    {
      icon: <LifeBuoy size={22} />,
      title: "Ongoing Support",
      desc: "Continuous optimization cycles, A/B testing, trend analysis, and priority support to keep your brand ahead.",
      href: "/service/ongoing-support",
      features: ["A/B split testing", "Trend analysis", "Feature updates", "Priority support"],
      tag: "Partnership",
    },
  ];

  return (
    <section id="services" className="py-32 bg-white relative scroll-mt-24">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Our Amazon Services</SectionLabel>
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Every lever,<br />
              <span
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="italic font-light text-zinc-300 lowercase tracking-normal"
              >
                covered.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            Seven specialized services — each built to solve a specific Amazon growth challenge with measurable results.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Link
              key={i}
              href={s.href}
              className="group relative bg-[#fafafa] hover:bg-white rounded-[32px] p-8 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-200/50 no-underline flex flex-col overflow-hidden"
            >
              {/* Top accent on hover */}
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

          {/* CTA Card */}
          <div className="group relative bg-zinc-950 rounded-[32px] p-8 overflow-hidden flex flex-col justify-between min-h-[300px]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-[80px] group-hover:bg-orange-500/20 transition-all duration-700 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-500">Custom_Stack</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Need a Custom<br />Package?
              </h3>
              <p className="text-zinc-500 text-sm font-light leading-relaxed mb-8">
                Combine any services into a tailored growth stack built for your exact stage and budget.
              </p>
            </div>
            <Link
              href="/contact"
              className="relative z-10 w-full flex items-center justify-center gap-3 bg-orange-500 text-white py-4 rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 shadow-[0_8px_30px_rgba(249,115,22,0.3)] no-underline"
            >
              Talk to a Strategist <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   03 — HOW WE WORK (process)
   ═══════════════════════════════════════════════ */
function HowWeWork() {
  const steps = [
    { num: "01", title: "Discovery & Audit",    desc: "We start with a deep-dive audit of your Amazon account — listings, PPC, competitors, and operations. Every growth lever and revenue leak is mapped.",  icon: <Search size={18} /> },
    { num: "02", title: "Strategy & Roadmap",   desc: "Based on the audit, we build a prioritized growth roadmap with clear milestones, timelines, and projected impact for each initiative.",  icon: <Target size={18} /> },
    { num: "03", title: "Execution & Launch",   desc: "Our specialists implement — from listing optimization and PPC campaigns to automation setup and account operations. You approve, we execute.",  icon: <Settings size={18} /> },
    { num: "04", title: "Optimize & Scale",     desc: "Continuous weekly optimization cycles with transparent reporting. We iterate, test, and compound results month over month.",  icon: <LineChart size={18} /> },
  ];

  return (
    <section className="py-32 bg-[#fafafa] relative overflow-hidden">
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
              <span className="text-zinc-300 italic font-light lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>operate.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            A proven four-phase system — from discovery to scale. Transparent, measurable, and built for compounding results.
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

        <div className="mt-12 flex items-center justify-between p-8 bg-white rounded-[32px] border border-zinc-100">
          <div className="flex items-center gap-4 text-zinc-400">
            <Terminal size={16} className="text-orange-500/60" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Growth_Pipeline_01-04</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest italic whitespace-nowrap">Proven Across 80+ Amazon Brands</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   04 — PRICING PACKAGES
   ═══════════════════════════════════════════════ */
function PricingPackages() {
  const packages = [
    {
      name: "Starter",
      tag: "Foundation",
      desc: "Perfect for new Amazon sellers who need core setup and initial optimization to launch with confidence.",
      services: [
        "Audit & Strategy (one-time)",
        "Listing Optimization (up to 5 ASINs)",
        "PPC Launch Structure",
        "Keyword Research & Matrix",
        "Monthly Performance Report",
      ],
      delivery: "2–3 Weeks",
      ideal: "New sellers, 1–5 ASINs",
    },
    {
      name: "Growth",
      tag: "Most Popular",
      desc: "For scaling brands that need ongoing management, advanced PPC, and continuous listing optimization.",
      services: [
        "Everything in Starter",
        "Ongoing PPC Management",
        "Listing Optimization (up to 15 ASINs)",
        "A+ Content Strategy",
        "Monthly Strategy Reviews",
        "Dedicated Account Manager",
        "Slack Direct Access",
      ],
      delivery: "Ongoing Monthly",
      ideal: "Scaling brands, 5–30 ASINs",
      popular: true,
    },
    {
      name: "Enterprise",
      tag: "Full Stack",
      desc: "Complete Amazon operations — from daily account management to growth automation and strategic advisory.",
      services: [
        "Everything in Growth",
        "Full Account Operations",
        "Growth Automation Setup",
        "Inventory Forecasting",
        "Competitor Intelligence",
        "Brand Protection Monitoring",
        "Weekly Strategy Sessions",
        "Priority Support Channel",
      ],
      delivery: "Ongoing Monthly",
      ideal: "Established brands, 30+ ASINs",
    },
  ];

  return (
    <section id="packages" className="py-32 bg-[#fafafa] relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>Pricing Tiers</SectionLabel>
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Choose your<br />
              <span
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="italic font-light text-zinc-300 lowercase tracking-normal"
              >
                growth tier.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed pb-2">
            Every package is a complete system — not a menu of line items. Choose the level that matches your ambition.
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
   04 — WHY GROW ORBIT (trust section)
   ═══════════════════════════════════════════════ */
function WhyGrowOrbit() {
  const reasons = [
    { icon: <Target size={20} />,      title: "Data-Driven",         desc: "Every decision is backed by real data from your account — not assumptions, not industry averages." },
    { icon: <ShieldCheck size={20} />,  title: "Amazon Specialists",  desc: "We only work on Amazon. No diluted attention across platforms — pure Amazon expertise." },
    { icon: <TrendingUp size={20} />,   title: "Measurable Results",  desc: "Monthly reporting with real metrics: TACoS, organic share, conversion rate, and revenue growth." },
    { icon: <Activity size={20} />,     title: "Always Optimizing",   desc: "Weekly account reviews, bid adjustments, and strategic pivots — not set-and-forget management." },
  ];

  return (
    <section className="py-32 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-500/8 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="lg:sticky lg:top-32">
            <SectionLabel light>Why Grow Orbit</SectionLabel>
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-8"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Built for<br />
              <span
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="italic font-light text-zinc-500 lowercase tracking-normal"
              >
                Amazon sellers.
              </span>
            </h2>
            <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-lg mb-12">
              We don't dabble in Amazon — it's all we do. Every team member, every system, and every process is built specifically for Amazon brand growth.
            </p>
            <Link href="/contact" className="group flex items-center gap-3 text-orange-400 font-bold text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
              Start growing <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <div key={i} className="group bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-orange-500/30 rounded-[28px] p-7 transition-all duration-500">
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
   05 — CTA
   ═══════════════════════════════════════════════ */
function AmazonCTA() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
        <span className="text-[180px] lg:text-[300px] font-black tracking-tighter text-zinc-50" style={{ fontFamily: "'Montserrat', sans-serif" }}>ORBIT</span>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-12 relative z-10 text-center">
        <SectionLabel>Ready to Scale?</SectionLabel>
        <h2
          className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-8 text-zinc-900"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Let's build your<br />
          <span
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="italic font-light text-zinc-300 lowercase tracking-normal"
          >
            growth engine.
          </span>
        </h2>
        <p className="text-zinc-500 text-lg font-light leading-relaxed mb-12 max-w-xl mx-auto">
          Book a free strategy call with our team. We'll review your current Amazon position and map out the exact services that will move the needle for your brand.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            href="/contact"
            className="inline-flex items-center gap-4 px-10 py-5 bg-zinc-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-orange-500 transition-all duration-500 shadow-xl no-underline"
          >
            Book Free Strategy Call
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/service"
            className="inline-flex items-center gap-3 text-zinc-400 hover:text-zinc-900 font-bold text-[11px] uppercase tracking-widest transition-colors no-underline"
          >
            View All Services <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   06 — FOOTER NAV
   ═══════════════════════════════════════════════ */
function FooterNav() {
  return (
    <footer className="py-24 bg-white border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Design & Creative */}
          <div className="text-center md:text-left w-full md:w-1/3">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Also Explore</p>
            <Link href="/service/design-creative" className="group inline-block no-underline text-zinc-900">
              <h4 className="text-2xl md:text-3xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start uppercase">
                <ArrowRight className="mr-3 group-hover:-translate-x-3 transition-transform rotate-180 size-6 shrink-0" />
                Design & Creative
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

          {/* Contact */}
          <div className="text-center md:text-right w-full md:w-1/3">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Get Started</p>
            <Link href="/contact" className="group inline-block no-underline text-zinc-900">
              <h4 className="text-2xl md:text-3xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end uppercase">
                Contact Us
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
export default function AmazonServicesPage() {
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <AmazonServicesHero />
      <ServiceCards />
      <PricingPackages />
      <WhyGrowOrbit />
      <WhoItsFor />
      <HowWeWork />
      <AmazonCTA />
      <FooterNav />
    </div>
  );
}
