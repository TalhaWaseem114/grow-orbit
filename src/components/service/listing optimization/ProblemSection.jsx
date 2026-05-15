import React from 'react';
import Link from 'next/link';
import {
  SearchX, ZapOff, ShieldAlert, Unlink, Activity, BarChart3, ArrowRight
} from 'lucide-react';

export default function WhyBrandsFail() {
  const failurePoints = [
    { label: "Indexation Ghosting", icon: <SearchX size={20} />, stat: "70%", statLabel: "Visibility Loss", desc: "Name recognition doesn't trigger the A10 crawler. Without technical backend mapping, you remain invisible." },
    { label: "Marketing Efficiency", icon: <ZapOff size={20} />, stat: "7x", statLabel: "PPC Waste", desc: "Traditional creative fails on Amazon. If you don't answer shopper intent immediately, they bounce to competitors." },
    { label: "Listing Leakage", icon: <ShieldAlert size={20} />, stat: "38%", statLabel: "CVR Drop", desc: "Ad spend often masks organic decay. You are paying for visibility that a structured listing would earn for free." },
    { label: "Category Displacement", icon: <Activity size={20} />, stat: "Rank", statLabel: "Volatility", desc: "Smaller brands outrank legacy giants not through product quality, but through superior algorithmic scaffolding." },
    { label: "Waste Recovery", icon: <BarChart3 size={20} />, stat: "141g", statLabel: "Daily Drift", desc: "Scaling 7-figure brands on 1-figure insights. Without keyword-level tracking, strategy is guesswork." }
  ];

  return (
    <section className="py-32 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: Sticky Header */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-center gap-3 mb-6 font-mono">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
                <div className="w-4 h-px bg-orange-500 self-center"></div>
              </div>
              <span className="text-orange-500 font-bold text-[10px] uppercase tracking-[0.4em] block">
                Post-Mortem Analysis
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-8 text-zinc-900">
              Why big<br />brands<br />
              {/* Refined color for the italicized text */}
              <span className="italic font-light text-zinc-200 lowercase tracking-normal" style={{ fontFamily: 'serif' }}>
                fail on amazon.
              </span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-10">
              The algorithm rewards technical logic over legacy reputation. Here is where the traditional brand model breaks and revenue vanishes.
            </p>
            <Link
              href="/contact"
              className="group relative inline-flex justify-center w-full sm:w-auto px-6 sm:px-10 py-4 bg-orange-600 text-white rounded-full font-bold text-[9px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.3em] overflow-hidden transition-all active:scale-95 no-underline"
            >
              <span className="relative z-10 flex items-center justify-center gap-3 sm:gap-4 w-full">
                Request Infrastructure Audit
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-all duration-300 text-white" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-orange-600/90 to-orange-400 transition-transform duration-500 ease-in-out"></div>
            </Link>
          </div>

          {/* Right Column: Corrected Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {failurePoints.map((item, i) => (
              <div
                key={i}
                className={`relative bg-[#fafafa] border border-zinc-100 rounded-[32px] p-8 overflow-hidden hover:border-orange-500/30 transition-all duration-500 ${
                  i === 4 ? "sm:col-span-2" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-5">
                  {/* Icon Box: Refined size and shadow */}
                  <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                    {item.icon}
                  </div>

                  {/* Stat: Refined size and tracking to match reference */}
                  <div className="text-right">
                    <span className="text-4xl font-black tracking-tighter text-orange-500 leading-none">
                      {item.stat}
                    </span>
                    <p className="text-[12px] font-mono text-zinc-900 font-black uppercase tracking-widest mt-1">
                      {item.statLabel}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-[13px] font-black uppercase tracking-[0.12em] text-zinc-900 mb-2 group-hover:text-orange-500 transition-colors">
                    {item.label}
                  </h3>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}