"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, Target, Users, ShieldCheck,
  BarChart3, TrendingUp, Award, Activity, RefreshCw,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyChooseUs() {
  const sectionRef = useRef(null);

  useEffect(() => {
    // GSAP animations removed for maximum performance optimization
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-zinc-950 relative overflow-hidden py-16 sm:py-28 border-t border-white/5"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* ── Background texture ── */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />
      {/* ── Orange ambient glow ── */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-orange-500/[0.07] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-[2px] bg-orange-500" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-400">
                Why Orbit
              </span>
            </div>
            <h2
               className="text-4xl xs:text-5xl sm:text-7xl lg:text-[80px] font-black tracking-tighter uppercase leading-[0.88] text-white"
               style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Not just an<br />
              <span className="text-orange-500">agency.</span><br />
              <span
                className="italic font-light text-zinc-600 lowercase tracking-normal"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                a growth system.
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-5 max-w-sm md:pb-3">
            <p className="text-zinc-400 text-[15px] font-medium leading-relaxed">
              <strong className="text-white font-bold tracking-tight">Most brands fail because they fix one thing.</strong><br />
              <span className="mt-2 block">We rebuild the entire growth system:</span>
            </p>
            
            {/* Simple Flow Diagram */}
            <div className="flex flex-wrap items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 font-mono bg-orange-500/[0.08] border border-orange-500/20 px-3.5 py-2.5 rounded-xl w-fit shadow-[0_0_20px_rgba(249,115,22,0.05)]">
              <span>Traffic</span>
              <ArrowRight size={12} className="text-orange-500/50" />
              <span>Conversion</span>
              <ArrowRight size={12} className="text-orange-500/50" />
              <span>Retention</span>
            </div>

            <p className="text-zinc-500 text-[15px] italic tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
              That’s why results compound — not spike.
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════
            BENTO GRID — asymmetric layout
            Row 1: Wide stat | Medium | Tall dark
            Row 2: Tall dark  | Wide stat | Medium
        ═══════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">

          {/* ── CELL 1: Stat hero — "6 Systems" ── */}
          <div className="bento-cell md:col-span-5 bg-orange-500 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-black/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full min-h-[200px] justify-between">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white">
                  <Activity size={22} />
                </div>
                <span className="text-[10px] font-mono font-bold text-orange-200 uppercase tracking-widest">01</span>
              </div>
              <div>
                <p
                  className="text-[72px] font-black text-white tracking-tighter leading-none mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  6
                </p>
                <h3 className="font-black text-[15px] uppercase tracking-tight text-white mb-2">
                  Systems Running as One
                </h3>
                <p className="text-orange-100/70 text-[12px] font-light leading-relaxed">
                  SEO, PPC, creative, and account ops simultaneously — each system feeding data back into the others.
                </p>
              </div>
            </div>
          </div>

          {/* ── CELL 2: Dedicated Team ── */}
          <div className="bento-cell md:col-span-4 bg-white/[0.04] hover:bg-white/[0.08] border border-white/8 hover:border-orange-500/30 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 relative overflow-hidden group hover:-translate-y-1 transition-all duration-500">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/0 to-transparent group-hover:via-orange-500/30 transition-all duration-500" />
            <div className="relative z-10 flex flex-col h-full min-h-[200px] justify-between">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                  <Users size={22} />
                </div>
                <span className="text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-widest group-hover:text-orange-500/50 transition-colors">02</span>
              </div>
              <div>
                <h3 className="font-black text-[15px] uppercase tracking-tight text-white mb-2 group-hover:text-orange-400 transition-colors">
                  Dedicated Team Assigned
                </h3>
                <p className="text-zinc-500 text-[12px] font-light leading-relaxed group-hover:text-zinc-400 transition-colors">
                  Named account manager, PPC specialist, creative lead. Your brand is a priority — not a ticket.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">1 Business Day Response</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── CELL 3: Data First — Tall dark card ── */}
          <div className="bento-cell md:col-span-3 md:row-span-2 bg-zinc-900 border border-white/8 hover:border-orange-500/30 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 relative overflow-hidden group hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between min-h-[300px] sm:min-h-[440px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(249,115,22,0.07),transparent_60%)] pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                  <Target size={22} />
                </div>
                <span className="text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-widest group-hover:text-orange-500/50 transition-colors">03</span>
              </div>
              <h3 className="font-black text-[16px] uppercase tracking-tight text-white mb-3 group-hover:text-orange-400 transition-colors leading-tight">
                Data Before Action — Always
              </h3>
              <p className="text-zinc-500 text-[12px] font-light leading-relaxed group-hover:text-zinc-400 transition-colors">
                Every engagement starts with a full 72-hour account audit. We diagnose before we prescribe. No template strategies — every plan built from your actual data.
              </p>
            </div>
            {/* Big stat at bottom */}
            <div className="relative z-10 mt-6 pt-6 border-t border-white/5">
              <p
                className="text-[52px] font-black text-orange-500 tracking-tighter leading-none"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Week 1
              </p>
              <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-1">Full audit complete</p>
            </div>
          </div>

          {/* ── CELL 4: Weekly Reports ── */}
          <div className="bento-cell md:col-span-4 bg-white/[0.04] hover:bg-white/[0.08] border border-white/8 hover:border-orange-500/30 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 relative overflow-hidden group hover:-translate-y-1 transition-all duration-500">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/0 to-transparent group-hover:via-orange-500/30 transition-all duration-500" />
            <div className="relative z-10 flex flex-col h-full min-h-[200px] justify-between">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                  <TrendingUp size={22} />
                </div>
                <span className="text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-widest group-hover:text-orange-500/50 transition-colors">04</span>
              </div>
              <div>
                <h3 className="font-black text-[15px] uppercase tracking-tight text-white mb-2 group-hover:text-orange-400 transition-colors">
                  Weekly Reports, Every Monday
                </h3>
                <p className="text-zinc-500 text-[12px] font-light leading-relaxed group-hover:text-zinc-400 transition-colors">
                  Organic rank, ACoS, revenue, and the exact actions taken — with the reasoning documented every week.
                </p>
              </div>
            </div>
          </div>

          {/* ── CELL 5: Amazon Only — Stat hero ── */}
          <div className="bento-cell md:col-span-5 bg-zinc-900 border border-white/8 hover:border-orange-500/30 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 relative overflow-hidden group hover:-translate-y-1 transition-all duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.08),transparent_60%)] pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full min-h-[200px] justify-between">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                  <ShieldCheck size={22} />
                </div>
                <span className="text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-widest group-hover:text-orange-500/50 transition-colors">05</span>
              </div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-black text-[15px] uppercase tracking-tight text-white mb-2 group-hover:text-orange-400 transition-colors">
                    Amazon-Only Specialists
                  </h3>
                  <p className="text-zinc-500 text-[12px] font-light leading-relaxed group-hover:text-zinc-400 transition-colors max-w-[200px]">
                    We don't do Google, Meta, or Shopify. Amazon is all we do. That depth is why we outperform generalists.
                  </p>
                </div>
                <p
                  className="text-[64px] font-black text-orange-500/20 group-hover:text-orange-500/40 tracking-tighter leading-none shrink-0 transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  100%
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ── CELL 6: No Lock-In — full width bottom card ── */}
        <div className="bento-cell bg-white/[0.04] hover:bg-white/[0.07] border border-white/8 hover:border-orange-500/30 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 relative overflow-hidden group hover:-translate-y-1 transition-all duration-500">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/0 to-transparent group-hover:via-orange-500/30 transition-all duration-500" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.04),transparent_70%)] pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                <RefreshCw size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest group-hover:text-orange-500/50 transition-colors">06</span>
                </div>
                <h3 className="font-black text-[15px] uppercase tracking-tight text-white mb-1 group-hover:text-orange-400 transition-colors">
                  Month-to-Month. No Lock-In Contracts.
                </h3>
                <p className="text-zinc-500 text-[12px] font-light leading-relaxed group-hover:text-zinc-400 transition-colors max-w-2xl">
                  No 6-month retainer traps. No exit penalties. We earn your business every single month based on performance. Confidence in results makes lock-in unnecessary.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              prefetch={false}
              className="group/btn shrink-0 flex items-center justify-center gap-3 bg-orange-500 hover:bg-white hover:text-zinc-900 text-white font-black text-[11px] uppercase tracking-[0.2em] px-7 py-4 rounded-[18px] sm:rounded-2xl transition-all duration-300 no-underline shadow-[0_8px_25px_rgba(249,115,22,0.3)] w-full md:w-auto"
            >
              Start This Month
              <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ── Proof stat strip ── */}
        <div className="mt-16 pt-12 border-t border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { val: "$12M+", sub: "Revenue Managed",       i: <BarChart3 size={13} />  },
              { val: "80+",   sub: "Brands Scaled",          i: <Users size={13} />      },
              { val: "+38%",  sub: "Avg Revenue Lift",       i: <TrendingUp size={13} /> },
              { val: "14%",   sub: "Avg Client ACoS",        i: <Target size={13} />     },
              { val: "85%",   sub: "Hit Page 1 in 60d",      i: <Award size={13} />      },
            ].map((s, i) => (
              <div key={i} className="group flex flex-col border-l border-zinc-800/60 pl-6 hover:border-orange-500/40 transition-colors duration-500">
                <div className="text-orange-500/60 mb-2 group-hover:text-orange-400 transition-colors">{s.i}</div>
                <span className="text-3xl font-black text-white tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.val}</span>
                <span className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-widest mt-1">{s.sub}</span>
              </div>
            ))}

            {/* CTA column */}
            <Link href="/contact" prefetch={false} className="group flex flex-col border-l border-orange-500/20 pl-6 hover:bg-orange-500/[0.02] transition-all no-underline">
              <div className="text-orange-500 mb-2 group-hover:translate-x-1 transition-transform">
                <ArrowRight size={14} />
              </div>
              <span className="text-base font-black text-white uppercase tracking-tighter leading-tight group-hover:text-orange-400 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Strategy<br />Call
              </span>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">SLOTS_OPEN</span>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}