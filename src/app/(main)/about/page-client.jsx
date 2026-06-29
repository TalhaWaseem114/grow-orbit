"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, TrendingUp, Shield,
  Zap, BarChart3, Camera, Search, CheckCircle2,
  Target, Globe, Users, Clock,
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

/* ─── DATA ─── */
const STATS = [
  { val: "80+",   label: "Brands Scaled",      sub: "across 12 niches"         },
  { val: "$12M+", label: "Revenue Managed",     sub: "combined seller accounts"  },
  { val: "8.2x",  label: "Average Peak ROAS",   sub: "across all active accounts"},
  { val: "24/7",  label: "Account Monitoring",  sub: "real-time alert coverage"  },
];

const SERVICES = [
  { icon: <Search size={20} />,    title: "Listing SEO",         desc: "Keyword architecture built for A9 — not humans. We rank for buyer-intent terms, not traffic volume." },
  { icon: <BarChart3 size={20} />, title: "PPC Management",      desc: "4-tier campaign structures. Competitor conquest. ACoS targets hit in 8 weeks, not 8 months." },
  { icon: <Camera size={20} />,    title: "Visual Engineering",  desc: "CTR-tested main images, premium A+ Content, Brand Story. Every pixel earns its place." },
  { icon: <TrendingUp size={20} />,title: "Brand Launch",        desc: "Full-category audit, velocity-first creative stack, honeymoon-period PPC. Page 1 in 60 days." },
  { icon: <Zap size={20} />,       title: "Account Operations",  desc: "Inventory health, case management, suppression recovery. The daily work brands can't afford to ignore." },
  { icon: <Shield size={20} />,    title: "Brand Registry & IP", desc: "Trademark filing, Brand Registry enrollment, hijacker removal. Your brand protected end-to-end." },
];

const TEAM = [
  { name: "Ali", role: "Founder & CEO", img: "/assets/team-ali.png", years: "8 yrs Amazon" },
  { name: "Shahrooz", role: "Head of Growth & PPC", img: "/assets/team-shahrooz.png", years: "6 yrs Strategy" },
  { name: "Talha", role: "Head of Operations & Dev", img: "/assets/team-talha.png", years: "5 yrs Systems" },
  { name: "Ikram", role: "Creative Director", img: "/assets/team-ikram.png", years: "7 yrs Design" },
];

const VALUES = [
  { num: "01", title: "Amazon-Only Focus",         desc: "We work on one platform. That's not a limitation — it's why our results are consistently better than generalist agencies." },
  { num: "02", title: "Systems, Not Services",     desc: "Every engagement builds a self-compounding growth engine. When we leave, the system keeps running." },
  { num: "03", title: "Data Before Action",        desc: "We don't move without category intelligence. Every creative choice, every bid, every keyword is backed by a number." },
  { num: "04", title: "Monthly Agreements Only",   desc: "No 12-month lock-ins. We stay because results keep us here — not because contracts do." },
];

/* ════════════════════════════════════════════
   PAGE
════════════════════════════════════════════ */
export default function AboutPage() {
  const heroRef = useRef(null);
  const [hoveredTeam, setHoveredTeam] = useState(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-in",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "expo.out", delay: 0.2 }
      );
      gsap.utils.toArray(".scroll-in").forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true }
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
      `}</style>

      {/* ═══════════════════════════════════
          HERO
      ═══════════════════════════════════ */}
      <section className="bg-zinc-950 pt-[80px] sm:pt-[60px] pb-20 sm:pb-24 relative overflow-hidden">
        <style>{`
          @keyframes radar-spin { 100% { transform: rotate(360deg); } }
          @keyframes ping-slow { 75%, 100% { transform: scale(2); opacity: 0; } }
          @keyframes ops-breathe { 0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.05); } 50% { box-shadow: 0 0 60px 20px rgba(249,115,22,0.08); } }
          @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 0.5; } 100% { transform: scale(1.3); opacity: 0; } }
          @keyframes data-stream { 0% { transform: translateY(-100%); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(100%); opacity: 0; } }
        `}</style>

        {/* Advanced Layered Background */}
        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,rgba(249,115,22,0.12),transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full" />
        
        {/* OPERATIONS watermark */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[10%] font-black text-[80px] sm:text-[140px] md:text-[220px] uppercase tracking-tighter pointer-events-none select-none opacity-[0.03] whitespace-nowrap"
          style={{ fontFamily: "Arial, sans-serif", WebkitTextStroke: "1.5px #fff", color: "transparent" }}
        >
          OPERATIONS
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7 lg:mt-[40px]">
              <div className="hero-in flex items-center gap-3 mb-8">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
                  <div className="w-6 h-[1px] bg-orange-500 self-center" />
                </div>
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.5em] text-orange-400">
                  The Operations Command Centre
                </span>
              </div>

              <h1 className="hero-in text-[44px] sm:text-[64px] md:text-[88px] font-black tracking-tighter leading-[0.9] sm:leading-[0.85] text-white uppercase mb-6 sm:mb-8">
                The engine<br />behind{" "}
                <span className="text-orange-500 italic font-light lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                  top-tier brands.
                </span>
              </h1>

              <div className="hero-in flex gap-6 mb-10">
                <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50" />
                <p className="text-zinc-400 font-light text-sm sm:text-lg leading-relaxed max-w-xl">
                  We are the full-stack Amazon growth partner. We manage the daily operations, aggressively scale the PPC, and <span className="text-white font-medium">engineer the visuals</span> — so you can focus on scaling the business.
                </p>
              </div>

              {/* Trust badges */}
              <div className="hero-in flex flex-wrap items-center gap-3 mb-10">
                {[
                  { val: "80+", label: "Brands Scaled" },
                  { val: "$12M+", label: "Revenue Managed" },
                  { val: "8.2x", label: "Avg Peak ROAS" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.08] rounded-full px-4 py-2">
                    <span className="text-[13px] font-black text-orange-500 tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>{b.val}</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">{b.label}</span>
                  </div>
                ))}
              </div>

              <div className="hero-in flex flex-col sm:flex-row gap-4">
                <Link href="/get-started" className="flex items-center justify-center gap-3 bg-orange-500 hover:bg-white hover:text-zinc-900 text-white font-black text-[11px] uppercase tracking-widest px-8 py-5 sm:py-4 rounded-full transition-all duration-300 shadow-[0_8px_30px_rgba(249,115,22,0.35)] no-underline w-full sm:w-fit">
                  Work With Us <ArrowRight size={14} />
                </Link>
                <Link href="/case-study" className="flex items-center justify-center gap-3 border border-white/10 hover:border-orange-500/40 text-zinc-400 hover:text-white font-bold text-[11px] uppercase tracking-widest px-8 py-5 sm:py-4 rounded-full transition-all duration-300 no-underline w-full sm:w-fit">
                  View Results <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right: Ops Dashboard */}
            <div className="hero-in lg:col-span-5 relative block mt-10 lg:mt-[70px] scale-[0.95] sm:scale-100 origin-top lg:origin-center">
              
              {/* Floating metric card — top right */}
              <div className="absolute -top-8 -right-2 lg:-right-4 bg-white rounded-[20px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.08)] z-30 border border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-[0_8px_20px_rgba(16,185,129,0.3)]"><Shield size={18} /></div>
                  <div>
                    <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Uptime</p>
                    <p className="text-lg font-black text-zinc-900 tracking-tighter leading-none">24/7</p>
                  </div>
                </div>
              </div>

              {/* Floating metric card — bottom left */}
              <div className="absolute -left-4 lg:-left-10 bottom-[80px] bg-zinc-900 rounded-2xl px-5 py-4 z-30 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_12px_rgba(249,115,22,0.6)]" />
                  <div>
                    <p className="text-[7px] font-mono font-bold uppercase tracking-[0.25em] text-zinc-500">Avg 90-Day ACoS</p>
                    <p className="text-lg sm:text-xl font-black text-white leading-none tracking-tighter">14%</p>
                  </div>
                </div>
              </div>

              {/* Main Dashboard */}
              <div className="bg-zinc-950 rounded-[32px] shadow-[0_60px_120px_rgba(0,0,0,0.4)] border border-white/[0.08] overflow-hidden relative" style={{ animation: "ops-breathe 6s ease-in-out infinite" }}>
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

                {/* Header */}
                <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-orange-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                    </div>
                    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Ops_Terminal_v2</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-mono text-emerald-500/70 uppercase tracking-widest">SYS_ONLINE</span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Radar/Network Visual */}
                  <div className="relative h-[180px] flex items-center justify-center mb-6 overflow-hidden rounded-2xl bg-white/[0.01] border border-white/[0.02]">
                    {/* Grid background for radar */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                    
                    {/* Radar Circles */}
                    <div className="absolute w-[140px] h-[140px] rounded-full border border-orange-500/20" />
                    <div className="absolute w-[80px] h-[80px] rounded-full border border-orange-500/30" />
                    
                    {/* Radar Sweep */}
                    <div className="absolute w-[140px] h-[140px] rounded-full overflow-hidden">
                       <div className="absolute top-1/2 left-1/2 w-full h-full origin-top-left bg-gradient-to-br from-orange-500/40 to-transparent" style={{ animation: "radar-spin 4s linear infinite" }} />
                    </div>

                    {/* Ping Dots */}
                    <div className="absolute top-[30px] right-[40px] w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                    <div className="absolute bottom-[40px] left-[50px] w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
                    <div className="absolute top-[80px] left-[30px] w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]" />

                    {/* Center node */}
                    <div className="relative z-10 w-12 h-12 bg-zinc-900 rounded-full border border-orange-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                      <Globe size={20} className="text-orange-500" />
                      <div className="absolute inset-0 rounded-full border border-orange-500/50" style={{ animation: "pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
                    </div>

                    {/* Data streams overlay */}
                    <div className="absolute right-4 top-0 bottom-0 w-[1px] bg-white/5">
                      <div className="w-full h-10 bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent" style={{ animation: "data-stream 3s linear infinite" }} />
                    </div>
                  </div>

                  {/* Operational Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {[
                      { label: "Active Brands", count: "40+", color: "text-white" },
                      { label: "Rev Managed", count: "$12M+", color: "text-orange-500" },
                    ].map((svc, i) => (
                      <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center hover:border-orange-500/20 transition-all">
                        <p className={`text-xl font-black tracking-tighter leading-none mb-1 ${svc.color}`}>{svc.count}</p>
                        <p className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest">{svc.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* System Log */}
                  <div className="bg-black/40 rounded-xl border border-white/[0.04] p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">System Log</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[7px] font-mono text-emerald-500/60 uppercase tracking-widest">Monitoring</span>
                      </div>
                    </div>
                    <div className="space-y-2 font-mono text-[9px]">
                      {[
                        { action: "PPC_BID_ADJUST", target: "Campaign_Alpha", status: "text-emerald-400" },
                        { action: "INV_SYNC", target: "FBA_Warehouses", status: "text-orange-400" },
                        { action: "SEO_INDEX", target: "Top_10_ASINs", status: "text-amber-400" },
                      ].map((log, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="text-zinc-500"><span className="text-orange-500/70">›</span> {log.action}</span>
                          <span className={`font-bold ${log.status}`}>{log.target}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-white/[0.05] flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-[8px] font-mono text-emerald-500/70 uppercase tracking-widest">ALL SYSTEMS NOMINAL</span>
                  </div>
                  <span className="text-[7px] font-mono text-zinc-700 uppercase tracking-widest">OP_ID_ORBIT_SYS</span>
                </div>
              </div>

              {/* Ambient glow */}
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          HERO IMAGE STRIP
      ═══════════════════════════════════ */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 -mt-8 mb-0 relative z-10 scroll-in">
        <div className="relative rounded-[32px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.12)] border border-zinc-100">
          <img
            src="/newUpload/strategy-meeting.jpg"
            alt="Grow Orbit team at work"
            className="w-full object-cover"
            style={{ height: "300px", mdHeight: "420px" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/20 to-transparent" />
          <div className="absolute bottom-8 left-10">
            <p className="text-white/50 text-[9px] font-mono uppercase tracking-[0.4em] mb-2">What we manage</p>
            <p className="text-white font-black text-2xl uppercase tracking-tight leading-tight">
              Managing over <span className="text-orange-500">$12M+</span> in<br />annual Amazon revenue.
            </p>
          </div>
          {/* floating badges */}
          <div className="absolute top-6 right-8 flex flex-col gap-2">
            {[
              { label: "Amazon-Only Agency",  color: "#f97316" },
              { label: "Monthly Agreements",  color: "#4ade80" },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2 bg-black/50 backdrop-blur-md border rounded-full px-3 py-1.5"
                style={{ borderColor: `${b.color}30` }}>
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
      <section className="py-20 px-6 lg:px-12 scroll-in">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-zinc-950 rounded-[32px] overflow-hidden border border-white/5">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06]">
              {STATS.map((s, i) => (
                <div key={i} className="p-6 sm:p-10 group hover:bg-orange-500/5 transition-colors duration-500 text-center border-white/[0.06]">
                  <p className="font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tighter mb-1 group-hover:text-orange-400 transition-colors">
                    {s.val}
                  </p>
                  <p className="text-zinc-300 font-black text-[9px] sm:text-[11px] uppercase tracking-widest mb-1">{s.label}</p>
                  <p className="text-zinc-600 text-[8px] sm:text-[9px] font-mono uppercase tracking-widest">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SERVICES GRID
      ═══════════════════════════════════ */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 scroll-in">
            <div>
              <SectionLabel>Infrastructure</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] text-zinc-900">
                Everything you need<br />
                <span className="italic font-light text-zinc-300" style={{ fontFamily: "'Playfair Display', serif" }}>
                  to scale on Amazon.
                </span>
              </h2>
            </div>
            <p className="text-zinc-500 font-light max-w-xs md:text-right text-sm leading-relaxed">
              One agency. One platform. Every lever that moves revenue — owned, operated, and optimised.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 scroll-in">
            {SERVICES.map((s, i) => (
              <div key={i} className="group bg-white border border-zinc-100 rounded-[28px] p-8 hover:border-orange-500/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-5 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                  {s.icon}
                </div>
                <h3 className="font-black text-[15px] uppercase tracking-tight text-zinc-900 mb-2">{s.title}</h3>
                <p className="text-zinc-500 text-sm font-light leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          OPERATIONAL EXCELLENCE SPLIT
      ═══════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch scroll-in">
            {/* Left image */}
            <div className="relative rounded-[32px] overflow-hidden min-h-[500px]">
              <img
                src="/assets/operational-excellence-dashboard.png"
                alt="Operational excellence"
                className="w-full h-full object-cover min-h-[350px] lg:min-h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-5">
                  <p className="text-[9px] font-mono text-orange-400 uppercase tracking-[0.3em] mb-3">The Full Service Advantage</p>
                  <div className="space-y-2">
                    {[
                      "Listing Management & Optimisation",
                      "PPC Bid Architecture at Scale",
                      "Global Commerce: CA, UK, EU listed",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <CheckCircle2 size={12} className="text-orange-500 shrink-0" />
                        <span className="text-white text-[11px] font-bold uppercase tracking-widest">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right content */}
            <div className="bg-white rounded-[32px] border border-zinc-100 p-10 md:p-14 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
              <div>
                <SectionLabel>Our Edge</SectionLabel>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] text-zinc-900 mb-6">
                  Operational<br />
                  <span className="italic font-light text-zinc-300" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Excellence.
                  </span>
                </h2>
                <p className="text-zinc-500 text-base font-light leading-relaxed mb-8">
                  We don't just optimise listings, we optimise businesses. By aligning your supply chain efficiency with high-octane marketing and elite visuals, we create a feedback loop that forces unparalleled growth.
                </p>

                {/* Metric rows */}
                <div className="space-y-4 mb-10">
                  {[
                    { label: "Average ACoS at 90 days",      val: "14%",   width: "86%" },
                    { label: "Brands hitting page 1",         val: "94%",   width: "94%" },
                    { label: "Client retention after 6 months", val: "89%", width: "89%" },
                    { label: "Avg time to first page 1 rank", val: "58 days", width: "78%" },
                  ].map((m, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className="flex-1 order-3 sm:order-1 h-[3px] bg-zinc-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                          style={{ width: m.width }} />
                      </div>
                      <div className="flex items-center justify-between sm:contents order-2">
                        <span className="text-zinc-900 font-black text-sm sm:w-20 text-right shrink-0">{m.val}</span>
                        <span className="text-zinc-400 text-[9px] font-mono uppercase tracking-widest sm:w-52 shrink-0">{m.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          TEAM
      ═══════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-12 scroll-in">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <SectionLabel>The Collective</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] text-zinc-900">
                The minds<br />
                <span className="italic font-light text-zinc-300" style={{ fontFamily: "'Playfair Display', serif" }}>
                  behind the orbit.
                </span>
              </h2>
            </div>
            <p className="text-zinc-500 font-light max-w-xs md:text-right text-sm leading-relaxed">
              Amazon specialists only. No generalists, no interns managing your account.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {TEAM.map((member, i) => (
              <div
                key={i}
                className="group cursor-default"
                onMouseEnter={() => setHoveredTeam(i)}
                onMouseLeave={() => setHoveredTeam(null)}
              >
                <div className="relative rounded-[24px] overflow-hidden mb-3 sm:mb-4 aspect-[3/4]">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Hover badge */}
                  <div className={`absolute bottom-4 left-4 right-4 transition-all duration-500 ${hoveredTeam === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                    <div className="bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full inline-block">
                      {member.years}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-black text-zinc-900 uppercase tracking-tight text-sm leading-tight">{member.name}</h4>
                  <p className="text-zinc-400 text-[10px] font-mono uppercase tracking-widest mt-0.5">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          VALUES / PRINCIPLES
      ═══════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-12 scroll-in">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Sticky left */}
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <SectionLabel>How We Operate</SectionLabel>
              <h2 className="text-4xl font-black tracking-tighter uppercase leading-[0.9] text-zinc-900 mb-6">
                Why brands<br />
                <span className="italic font-light text-zinc-300" style={{ fontFamily: "'Playfair Display', serif" }}>
                  stay.
                </span>
              </h2>
              <p className="text-zinc-500 text-sm font-light leading-relaxed mb-8">
                Every agency promises results. These are the operating principles that explain why 89% of our clients are still with us after six months.
              </p>
              <Link href="/case-study" className="flex items-center gap-2 text-orange-500 font-black text-[11px] uppercase tracking-widest hover:gap-4 transition-all no-underline">
                See the proof <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right values */}
            <div className="lg:col-span-8 space-y-4">
              {VALUES.map((v, i) => (
                <div key={i} className="group bg-white border border-zinc-100 rounded-[24px] p-6 sm:p-8 hover:border-orange-500/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all duration-500 cursor-default">
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span className="text-[9px] font-mono font-bold text-zinc-300 uppercase tracking-[0.3em] shrink-0 mt-1">{v.num}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <h3 className="font-black text-zinc-900 uppercase tracking-tight text-sm">{v.title}</h3>
                      </div>
                      <p className="text-zinc-500 text-sm font-light leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          CTA STRIP
      ═══════════════════════════════════ */}
      <section className="py-10 sm:py-20 px-6 lg:px-12 scroll-in">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-zinc-950 rounded-[32px] sm:rounded-[40px] p-10 sm:p-20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(249,115,22,0.10),transparent_65%)]" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
              <div className="max-w-xl">
                <p className="text-orange-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-4">Done managing. Time to grow.</p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white leading-[0.88] mb-4">
                  Stop managing.<br />
                  <span className="italic font-light text-zinc-500" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Start growing.
                  </span>
                </h2>
                <p className="text-zinc-400 text-base font-light leading-relaxed">
                  If your brand is ready to offload operations and unlock 7-figure growth, Grow Orbit is your next command centre.
                </p>
              </div>
              <div className="flex flex-col items-stretch gap-3 shrink-0 w-full md:w-fit">
                <Link href="/get-started" className="flex items-center justify-center gap-3 bg-orange-500 hover:bg-white hover:text-zinc-900 text-white font-black text-[11px] uppercase tracking-widest px-10 py-5 rounded-full transition-all duration-300 shadow-[0_8px_30px_rgba(249,115,22,0.4)] no-underline whitespace-nowrap w-full">
                  Book Free Strategy Call <ArrowRight size={14} />
                </Link>
                <Link href="/case-study" className="flex items-center justify-center gap-2 border border-white/10 hover:border-white/25 text-zinc-400 hover:text-white font-bold text-[11px] uppercase tracking-widest px-10 py-5 sm:py-4 rounded-full transition-all duration-300 no-underline whitespace-nowrap w-full">
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