"use client";

import React from "react";
import { ArrowRight, CheckCircle2, Terminal } from "lucide-react";
import Link from "next/link";
import SectionLabel from "./SectionLabel";

export default function AutomationStack() {
  const items = [
    { label: "Custom API Integrations" },
    { label: "Multi-Marketplace Sync" },
    { label: "P&L Automation" },
    { label: "Restock Alert Systems" },
    { label: "Competitor Price Monitoring" },
    { label: "Auto-generated SKU Reports" },
  ];

  const terminalRows = [
    { label: "Inventory sync — ASIN B08XYZ", status: "Complete", time: "2s ago" },
    { label: "Price adjustment — 14 SKUs",   status: "Running",  time: "Now"    },
    { label: "Restock alert — SKU #4419",    status: "Triggered", time: "4m ago" },
    { label: "P&L report — Week 23",         status: "Complete", time: "1h ago"  },
    { label: "Catalog sync — EU marketplace", status: "Complete", time: "2h ago" },
  ];

  return (
    <section className="py-20 md:py-32 bg-zinc-950 text-white relative overflow-hidden border-t border-white/5">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

          {/* Left: terminal widget */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-zinc-900/50 backdrop-blur-xl">
              {/* Window bar */}
              <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between bg-zinc-900/80">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                  <div className="w-2 h-2 rounded-full bg-green-500/60" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-[0.3em]">automation_stack_v2.0</span>
                  <div className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
                </div>
              </div>

              {/* Workflow rows - Compacted */}
              <div className="p-5 md:p-6 space-y-2">
                {terminalRows.slice(0, 4).map((row, i) => (
                  <div key={i} className="group flex items-center gap-3 bg-white/2 border border-white/5 p-3 rounded-xl hover:bg-white/4 transition-all">
                    <CheckCircle2 size={13} className={row.status === "Running" ? "text-orange-500" : "text-emerald-400"} />
                    <div className="flex-1">
                      <p className="text-white/70 text-[10px] font-mono">{row.label}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-[9px] font-bold font-mono ${row.status === "Running" ? "text-orange-500" : "text-emerald-400"}`}>{row.status}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* MANUAL VS AUTOMATED TOGGLE VISUAL - Compacted */}
              <div className="px-5 md:px-6 pb-6">
                <div className="bg-white/[0.03] rounded-[20px] border border-white/5 p-4">
                   <div className="flex items-center justify-between mb-3">
                      <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest">Efficiency_Toggle_Matrix</span>
                      <div className="flex items-center gap-3 text-[7px] font-mono uppercase tracking-widest">
                         <span className="text-zinc-500">Manual</span>
                         <span className="text-orange-500">Automated</span>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: "Inventory", active: true },
                        { label: "Bidding", active: true },
                        { label: "Reports", active: true },
                        { label: "Pricing", active: true }
                      ].map((t, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-white/2 border border-white/5">
                           <span className="text-[8px] font-bold text-white/80 uppercase tracking-tight">{t.label}</span>
                           <div className={`w-8 h-4 rounded-full relative transition-colors duration-500 ${t.active ? 'bg-orange-500' : 'bg-zinc-800'}`}>
                              <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-500 ${t.active ? 'left-4.5' : 'left-0.5'}`} />
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              <div className="px-5 md:px-6 pb-5 md:pb-6">
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl px-5 py-4 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <Terminal size={12} className="text-orange-500" />
                     <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-orange-400">Automated Freedom</span>
                   </div>
                  <span className="text-white font-black text-lg font-mono tracking-tighter">99.9%<span className="text-orange-500/50 text-[10px] ml-1 select-none">Efficiency</span></span>
                </div>
              </div>
            </div>
            
            {/* Background glows */}
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
          </div>

          {/* Right: copy */}
          <div className="lg:col-span-6 space-y-8 md:space-y-10">
            <div>
               <SectionLabel light>The Automation Stack</SectionLabel>
               <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.85] text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                 Built to run<br />
                 <span className="italic font-light text-zinc-500 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                   while you sleep.
                 </span>
               </h2>
            </div>
            
            <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed max-w-xl">
              Systems that compound every week. We implement customized operational stacks and proprietary scripts that bridge
              Amazon's fragmented data and your growth objectives. The result is total operational
              freedom.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 py-8 border-y border-white/10">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-orange-500 transition-colors shrink-0" />
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest group-hover:text-orange-500 transition-colors">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <Link href="/contact" className="group inline-flex items-center justify-center gap-4 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.1em] sm:tracking-[0.3em] text-white bg-orange-500 w-full sm:w-auto px-4 sm:px-10 py-4 sm:py-5 rounded-2xl hover:bg-white hover:text-black transition-all duration-500 no-underline shadow-2xl shadow-orange-500/20 whitespace-nowrap">
              Secure My Strategy Call
              <ArrowRight size={13} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
