import React from "react";
import { Globe, ShoppingCart, TrendingUp, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MetricsStrip() {
  const stats = [
    { l: "Storefronts Built", v: "40+", i: <Globe size={14} /> },
    { l: "Avg AOV Lift", v: "+32%", i: <ShoppingCart size={14} /> },
    { l: "Conversion Rate", v: "4.8%", i: <TrendingUp size={14} /> },
    { l: "Load Speed", v: "<2s", i: <Zap size={14} /> }
  ];

  return (
    <div className="bg-zinc-900 py-12 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] mask-radial-faded" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">
          {stats.map((s, idx) => (
            <div key={idx} className="group relative flex flex-col border-l border-zinc-800/50 pl-8 transition-all duration-500 hover:border-orange-500/40">
              {/* Technical Node Indicator */}
              <div className="absolute top-0 left-[-1.5px] w-[3px] h-[3px] bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="text-orange-500/70 mb-3 group-hover:text-orange-500 transition-colors">
                {s.i}
              </div>
              <span className="text-4xl font-black text-white tracking-tighter">
                {s.v}
              </span>
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mt-1">
                [ {s.l} ]
              </span>
            </div>
          ))}

          {/* FINAL ACTION NODE */}
          <Link
            href="/get-started"
            className="group relative flex flex-col border-l border-orange-500/20 pl-8 transition-all duration-500 hover:bg-orange-500/[0.02]"
          >
            <div className="text-orange-500 mb-3 group-hover:translate-x-1 transition-transform">
              <ArrowRight size={14} />
            </div>
            <span className="text-lg font-black text-white uppercase tracking-tighter leading-tight group-hover:text-orange-500 transition-colors">
              Start Your <br />Build
            </span>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
                BUILD_PIPELINE_OPEN
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
