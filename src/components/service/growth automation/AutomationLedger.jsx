"use client";

import React from "react";
import { Gauge, Cpu, Layers, Activity, ArrowRight, Share2 } from "lucide-react";
import Link from "next/link";

export default function AutomationLedger() {
  const stats = [
    { v: "+114%", l: "Avg Revenue Lift",    i: <Gauge size={14} /> },
    { v: "24/7",  l: "System Monitoring",   i: <Cpu size={14} /> },
    { v: "160h",  l: "Monthly Time Saved",  i: <Layers size={14} /> },
    { v: "50+",   l: "Active Workflows",    i: <Activity size={14} /> },
  ];

  return (
    <div id="matrix" className="bg-zinc-950 py-24 md:py-32 border-y border-white/5 relative overflow-hidden scroll-mt-24">
      {/* Ambient Color Blossoms */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.03),transparent_70%)]" />
      </div>

      {/* Precision Grid Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left: 2x2 Stats Grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-x-12 gap-y-16">
              {stats.map((s, i) => (
                <div key={i} className="group relative flex flex-col transition-all duration-500">
                  <div className="text-orange-500 mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                    {s.i}
                  </div>
                  <span className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none mb-4 group-hover:text-orange-500 transition-colors">
                    {s.v}
                  </span>
                  <div className="h-px w-8 bg-orange-500/40 group-hover:w-full transition-all duration-700 mb-4" />
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-[0.4em]">
                    {s.l}
                  </span>
                </div>
              ))}
            </div>

            {/* Strategy Call Link */}
            <div className="mt-20 pt-10 border-t border-white/10">
              <Link 
                href="/get-started" 
                className="group inline-flex items-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] sm:tracking-[0.5em] text-white hover:text-orange-500 transition-all duration-500 no-underline whitespace-nowrap"
              >
                <div className="flex items-center gap-3">
                   <div className="w-10 h-[1px] bg-orange-500 transition-all duration-500 group-hover:w-16" />
                   <span>Secure My Strategy Call</span>
                </div>
                <ArrowRight size={14} className="group-hover:translate-x-3 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right: Time Saved Calculator Card (Compact Glossy UI) */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900/40 backdrop-blur-3xl rounded-[40px] p-8 md:p-10 border border-white/10 relative overflow-hidden group/calc shadow-[0_50px_100px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)]">
               
               {/* Glossy Reflection Layer */}
               <div className="absolute inset-0 bg-linear-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none" />
               <div className="absolute -inset-full bg-linear-to-r from-transparent via-white/[0.05] to-transparent rotate-[35deg] translate-x-[-100%] group-hover/calc:translate-x-[100%] transition-transform duration-[2000ms] ease-in-out pointer-events-none" />
               
               <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 blur-[100px] -translate-y-1/2 translate-x-1/2" />
               
               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                     <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,1)]" />
                        <span className="text-[8px] font-mono text-zinc-300 uppercase tracking-[0.4em] font-black">Efficiency_Diagnostics</span>
                     </div>
                     <div className="text-[7px] font-mono text-zinc-600 uppercase tracking-[0.2em] border border-white/5 px-2 py-0.5 rounded-full">v2.4.1</div>
                  </div>
                  
                  <div className="space-y-5 mb-10">
                     {[
                       { l: "PPC Automation", v: "3h", desc: "Algorithmic execution" },
                       { l: "Inventory Alerts", v: "2h", desc: "Predictive restock" },
                       { l: "Review Requests", v: "1.5h", desc: "Workflow logic" },
                       { l: "Repricing", v: "2h", desc: "Market sync" }
                     ].map((item, idx) => (
                       <div key={idx} className="flex justify-between items-end group/item pb-4 border-b border-white/[0.08] last:border-0 last:pb-0">
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.2em] font-black text-white mb-1 group-hover/item:text-orange-400 transition-colors">{item.l}</p>
                            <p className="text-[9px] text-zinc-400 font-mono italic tracking-wide leading-none">{item.desc}</p>
                          </div>
                          <div className="text-right">
                             <div className="relative inline-block">
                                <span className="text-xl font-black text-white tracking-tighter">+{item.v}</span>
                                <div className="absolute -top-1 -right-2 w-1 h-1 bg-orange-500 rounded-full blur-[1px] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                             </div>
                             <p className="text-[7px] font-mono text-orange-500/50 uppercase tracking-widest mt-0.5">Recovery</p>
                          </div>
                       </div>
                     ))}
                  </div>
                  
                  <div className="pt-8 border-t border-white/10 flex justify-between items-center bg-linear-to-b from-white/[0.03] to-transparent rounded-b-[40px] -mx-10 -mb-10 px-10 pb-10 mt-0">
                     <div>
                        <p className="text-[9px] font-mono text-zinc-300 uppercase tracking-[0.4em] mb-1.5 font-black">Weekly_Recovery</p>
                        <p className="text-zinc-500 text-[10px] font-light italic">Net operational lift.</p>
                     </div>
                     <div className="flex items-baseline gap-1 relative">
                        <div className="absolute -inset-8 bg-orange-500/20 blur-3xl rounded-full opacity-50" />
                        <span className="text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none relative">8.5</span>
                        <span className="text-3xl font-light text-orange-500 tracking-tighter relative ml-1">h</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
