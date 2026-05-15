import React from "react";
import Link from "next/link";
import { TrendingUp, BarChart3, Repeat, Activity, ArrowRight } from "lucide-react";

export default function MetricsStrip() {
  const stats = [
    { l: "Brands Supported",  v: "40+",   i: <TrendingUp size={14} /> },
    { l: "CVR Uplift Avg",    v: "+18%",  i: <BarChart3 size={14} /> },
    { l: "Sprint Cadence",    v: "Weekly",i: <Repeat size={14} /> },
    { l: "Monitoring",        v: "24/7",  i: <Activity size={14} /> },
  ];

  return (
    <div className="bg-zinc-900 py-8 md:py-12 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-6 md:gap-8">
          {stats.map((s, idx) => (
            <div key={idx} className="group relative flex flex-col border-l border-zinc-800/50 pl-4 sm:pl-8 transition-all duration-500 hover:border-orange-500/40">
              <div className="absolute top-0 left-[-1.5px] w-[3px] h-[3px] bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-orange-500/70 mb-3 group-hover:text-orange-400 transition-colors">{s.i}</div>
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tighter">{s.v}</span>
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mt-1">[ {s.l} ]</span>
            </div>
          ))}
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
              <span className="text-[10px] lg:text-[8px] font-mono text-zinc-600 uppercase tracking-widest">LOOP_READY</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
