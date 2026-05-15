import React from "react";
import { ArrowRight, CheckCircle2, ShoppingBag, Mail, Code2, Figma, BarChart3, Radio } from "lucide-react";
import Link from "next/link";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="flex gap-1">
      <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
      <div className="w-4 h-px bg-orange-500 self-center"></div>
    </div>
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-600/80">
      {children}
    </span>
  </div>
);

export default function DTCTechStack() {
  const items = [
    { label: "Shopify Plus / Hydrogen", icon: <ShoppingBag size={18} /> },
    { label: "Klaviyo Email & SMS", icon: <Mail size={18} /> },
    { label: "Custom Liquid Templating", icon: <Code2 size={18} /> },
    { label: "Figma Design Systems", icon: <Figma size={18} /> },
    { label: "GA4 + Server-Side Tracking", icon: <BarChart3 size={18} /> },
    { label: "Conversion API (Meta / TikTok)", icon: <Radio size={18} /> },
  ];

  return (
    <section className="py-20 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: terminal widget */}
          <div className="relative order-2 lg:order-1">
            <div className="relative z-10 rounded-[32px] sm:rounded-[48px] overflow-hidden border border-zinc-900/10 shadow-2xl bg-zinc-950">
              {/* Window bar */}
              <div className="px-5 sm:px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 sm:w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 sm:w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 sm:w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Commerce Stack · Live</span>
                </div>
              </div>

              {/* Stack rows */}
              <div className="p-5 sm:p-8 space-y-2.5 sm:space-y-3">
                {[
                  { label: "Shopify Plus — Theme deploy", status: "Complete", time: "Live" },
                  { label: "Klaviyo — Welcome flow", status: "Running", time: "Now" },
                  { label: "GA4 — Conversion tracking", status: "Complete", time: "2h ago" },
                  { label: "Figma — Component library", status: "Complete", time: "Shipped" },
                  { label: "CAPI — Server-side events", status: "Complete", time: "1d ago" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-3 sm:gap-4 bg-white/[0.03] border border-white/5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl">
                    <CheckCircle2 size={14} className={row.status === "Running" ? "text-orange-400" : "text-emerald-400"} />
                    <div className="flex-1">
                      <p className="text-white/70 text-[11px] sm:text-xs font-medium leading-tight">{row.label}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-[9px] sm:text-[10px] font-bold ${row.status === "Running" ? "text-orange-400" : "text-emerald-400"}`}>{row.status}</p>
                      <p className="text-[8px] sm:text-[9px] text-white/25">{row.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-5 sm:px-8 pb-5 sm:pb-8">
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl sm:rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-orange-400">Stack Integrity</span>
                  <span className="text-white font-black text-base sm:text-lg">100%</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 sm:w-64 sm:h-64 bg-orange-500/15 blur-3xl rounded-full pointer-events-none"></div>
          </div>

          {/* Right: copy */}
          <div className="space-y-6 sm:space-y-8 order-1 lg:order-2 text-left">
            <SectionLabel>The Commerce Stack</SectionLabel>
            <h2 className="text-[42px] sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] sm:leading-[0.88] text-zinc-900">
              Built with the<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light lowercase tracking-normal text-zinc-300">best to build DTC.</span>
            </h2>
            <p className="text-zinc-500 text-base sm:text-lg font-light leading-relaxed">
              We implement best-in-class commerce tools and integrate them into a unified
              system — every component chosen for performance, scalability, and control.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {items.map((item, i) => (
                <div key={i} className="group flex items-center gap-4 bg-[#fafafa] hover:bg-white border border-zinc-100 hover:border-orange-500/20 rounded-xl sm:rounded-2xl px-5 py-4 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-200/50">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-wide text-zinc-900 leading-tight">{item.label}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <CheckCircle2 size={10} className="text-emerald-500" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Active Deployment</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
