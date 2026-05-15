"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, TrendingUp,
  Zap, Star, ChevronRight, Plus, Minus, Terminal, Activity,
  Search, Layers, Target, AlertCircle, Calendar, BarChart3,
  Layout, TrendingDown, DollarSign, Shield, SearchCode,
  MapPin, FileText, Users, Package, Award,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "./SectionLabel";
import CheckItem from "./CheckItem";

export default function Methodology() {
  const stats = [
    { label: "Waste Recovery",  val: "22.4%",  desc: "Identifying and reallocating non-performing spend from bleed-keywords.",         subLabel: "Avg. $4.2K Salvaged",  protocol: "PPC-01",  dark: true    },
    { label: "Organic Lift",    val: "14 Days", desc: "Mean timeframe to witness structural ranking index improvements post-audit.",     subLabel: "A9 Index Reset",       protocol: "SEO-04",  orange: true  },
    { label: "Data Depth",      val: "5,000+",  desc: "Individual data points scrutinized per unique diagnostic cycle.",                 subLabel: "ML Pattern Scan",      protocol: "DATA-09", light: true   },
    { label: "Net Profit",      val: "+12.5%",  desc: "Typical increase in contribution margin after full strategy deployment.",         subLabel: "Post-Audit Yield",     protocol: "FIN-02",  lighter: true },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "24px 24px", maskImage: "radial-gradient(ellipse at center, black, transparent 80%)" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left */}
          <div className="relative">
            <div className="absolute -top-16 -left-10 text-[220px] font-black text-orange-500 opacity-[0.03] select-none leading-none">01</div>
            <div className="relative z-10">
              <SectionLabel>Methodology Phase</SectionLabel>
              <h2
                className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85] mb-8 text-zinc-900"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                We don't just<br />
                <span className="text-zinc-300">"Optimize."</span><br />
                We{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-orange-500 italic font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Deconstruct.
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-orange-200 z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                </span>
              </h2>
              <div className="text-zinc-900 font-bold text-sm sm:text-base uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                <div className="w-8 h-px bg-orange-500" />
                We find an average of $4.2K in monthly waste in the first audit.
              </div>
              <p className="text-zinc-500 text-base leading-relaxed mb-12 font-light max-w-xl">
                A standard agency audit is a superficial scan. An <span className="text-zinc-900 font-semibold">Orbit Diagnostic</span> is a 72-hour autopsy of your account's logic — every keyword, every campaign structure, every organic ranking signal.
              </p>

              <div className="space-y-8">
                {[
                  { icon: <Search size={20} />,  title: "Search Intent Mapping",    desc: "Isolating 'High-Intent' clusters from 'General Awareness' traffic to ensure every dollar reaches a buyer, not a browser." },
                  { icon: <Layers size={20} />,  title: "Listing Architecture",     desc: "Resolving backend canonical errors and A9 indexing conflicts that silently suppress your organic reach." },
                  { icon: <Target size={20} />,  title: "Competitor Deconstruction",desc: "Reverse-engineering the exact traffic sources of your top 5 competitors to build your conquesting roadmap." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center group-hover:bg-orange-500 transition-all duration-500 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-[15px] uppercase tracking-tight text-zinc-900 mb-1 group-hover:text-orange-500 transition-colors">{item.title}</h4>
                      <p className="text-zinc-500 text-sm font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: bento stats - Removed heavy shadows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] flex flex-col justify-between min-h-[240px] sm:min-h-[280px] hover:-translate-y-2 transition-all duration-500 group ${
                  s.dark    ? "bg-zinc-950 text-white shadow-none" :
                  s.orange  ? "bg-orange-500 text-white shadow-none" :
                  "bg-[#fafafa] text-zinc-900 border border-zinc-100 shadow-none"
                } ${i === 1 ? "sm:mt-8" : ""} ${i === 2 ? "sm:-mt-8" : ""}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[8px] font-mono tracking-[0.2em] px-2 py-1 border rounded-md uppercase ${
                      s.dark || s.orange ? "border-current opacity-40" : "border-zinc-200 text-zinc-500"
                    }`}>{s.protocol}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${s.dark || s.orange ? "opacity-40" : "text-zinc-400"}`}>Active</span>
                  </div>
                  <p className="font-black text-4xl sm:text-5xl mb-1 tracking-tighter">{s.val}</p>
                  <p className={`text-[11px] font-black uppercase tracking-[0.2em] ${s.dark || s.orange ? "opacity-70" : "text-zinc-600"}`}>{s.label}</p>
                </div>
                <div>
                  <p className={`text-[12px] leading-relaxed mb-3 font-light ${s.dark || s.orange ? "opacity-60" : "text-zinc-500"}`}>{s.desc}</p>
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${s.orange ? "text-white/60" : "text-orange-500/60"}`}>{s.subLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
