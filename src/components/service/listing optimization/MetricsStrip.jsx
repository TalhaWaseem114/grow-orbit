"use client";

import React from "react";
import {
  Target,
  TrendingUp,
  BarChart3,
  Search,
  Zap,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function MetricsStrip() {
  const stats = [
    {
      v: "+84%",
      l: "Organic Rank",
      i: <TrendingUp size={14} />,
      d: "Average keyword position lift"
    },
    {
      v: "+65%",
      l: "Search CTR",
      i: <Target size={14} />,
      d: "Click-through rate optimization"
    },
    {
      v: "-22%",
      l: "Ad Dependency",
      i: <Zap size={14} />,
      d: "Reduced reliance on PPC spend"
    },
    {
      v: "A10",
      l: "Algorithm Ready",
      i: <Search size={14} />,
      d: "Full indexation infrastructure"
    },
    {
      v: "CTR/CVR",
      l: "Performance Focus",
      i: <BarChart3 size={14} />,
      d: "Data-driven conversion logic"
    },
  ];

  return (
    <div className="bg-zinc-950 py-12 border-y border-white/5 relative overflow-hidden text-left">
      {/* Decorative background grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 lg:gap-8 items-center">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`group relative flex-col border-l border-zinc-800/50 pl-8 transition-all duration-500 hover:border-orange-500/40 ${i === 4 ? 'hidden lg:flex' : 'flex'}`}
            >
              <div className="absolute top-0 left-[-1.5px] w-[3px] h-[3px] bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="text-orange-500/70 mb-3 group-hover:text-orange-400 transition-colors">
                {s.i}
              </div>

              <span className="text-4xl font-black text-white tracking-tighter leading-none mb-1">
                {s.v}
              </span>

              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-2">
                [ {s.l} ]
              </span>

              <p className="text-[9px] text-zinc-600 font-light leading-tight opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                {s.d}
              </p>
            </div>
          ))}

          {/* Quick CTA cell */}
          <Link
            href="/get-started"
            className="group relative flex flex-col items-center text-center col-span-2 md:col-span-3 lg:col-span-1 mt-4 lg:mt-0 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/5 lg:border-orange-500/20 lg:pl-8 transition-all duration-500 hover:bg-orange-500/[0.02] no-underline"
          >
            <span className="text-xl sm:text-2xl lg:text-lg font-black text-white uppercase tracking-tighter leading-tight group-hover:text-orange-400 transition-colors flex items-center gap-3">
              Get Strategy Call
              <ArrowRight size={20} className="text-orange-500 group-hover:translate-x-2 transition-transform hidden sm:block lg:hidden" />
              <ArrowRight size={14} className="text-orange-500 group-hover:translate-x-1 transition-transform sm:hidden lg:block" />
            </span>

            <div className="flex items-center gap-2 mt-2">
              <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] lg:text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
                DIAGNOSTIC_FREE
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
