"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight, Sparkles, Ban } from "lucide-react";

export default function WhoItsFor() {
  return (
    <section className="bg-zinc-950 py-20 sm:py-28 px-6 lg:px-12 relative overflow-hidden">
      {/* ── Apple-Style Ambient Lighting ── */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[160px] pointer-events-none" />
      
      {/* ── Subtle Grid Texture ── */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/[0.06] pb-10 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-[1px] bg-zinc-700" />
              <span className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-[10px] font-mono">Partnership Criteria</span>
            </div>
            <h2 className="text-[44px] xs:text-[56px] md:text-[72px] font-black leading-[0.85] tracking-tighter text-white uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Who we work <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-zinc-100 to-zinc-500 italic font-light normal-case" style={{ fontFamily: "'Playfair Display', serif" }}>best with.</span>
            </h2>
          </div>
          <div className="max-w-md md:pb-4">
            <p className="text-white text-xl font-semibold tracking-tight mb-3">
              Quality over quantity. Always.
            </p>
            <p className="text-zinc-500 text-base font-light leading-relaxed">
              We only partner with brands where our system is guaranteed to drive compounding results.
            </p>
          </div>
        </div>

        {/* ── GLOSSY BENTO CARDS ── */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* FOR YOU — Glossy Glass */}
          <div className="relative group">
            {/* Top highlight line */}
            <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent z-20" />
            
            <div className="relative h-full bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-2xl rounded-[36px] p-7 sm:p-10 border border-white/[0.08] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:border-emerald-500/20 overflow-hidden">
              {/* Subtle Inner Glow */}
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-[20px] bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-[0_8px_20px_rgba(16,185,129,0.3)]" aria-hidden="true">
                  <Sparkles size={26} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Ideal Partner
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-emerald-500/80 text-[10px] font-mono font-bold uppercase tracking-[0.2em]">Compound Path Enabled</span>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                {[
                  { t: "Established Product Value", d: "You have a validated product with real market demand." },
                  { t: "Growth Inconsistency", d: "You’re doing revenue but need a predictable system to scale." },
                  { t: "Systemic Understanding", d: "You value a holistic approach (Creative + SEO + PPC)." },
                  { t: "Long-Term Commitment", d: "You’re ready to invest in building a sustainable engine." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group/item">
                    <div className="mt-1.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 transition-all duration-500 group-hover/item:scale-110 group-hover/item:bg-emerald-500/30" aria-hidden="true">
                      <CheckCircle2 size={12} className="text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base mb-0.5 tracking-tight">{item.t}</h4>
                      <p className="text-zinc-500 leading-relaxed font-light text-sm">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* NOT FOR YOU — Matte Glass */}
          <div className="relative group">
            {/* Top highlight line */}
            <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-red-400/20 to-transparent z-20" />

            <div className="relative h-full bg-white/[0.02] backdrop-blur-md rounded-[36px] p-7 sm:p-10 border border-white/[0.05] shadow-2xl transition-all duration-700 group-hover:border-red-500/10 overflow-hidden">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-[20px] bg-zinc-800 flex items-center justify-center border border-white/5" aria-hidden="true">
                  <Ban size={26} className="text-zinc-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-zinc-400 uppercase tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Not a fit
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-red-500/40 text-[10px] font-mono font-bold uppercase tracking-[0.2em]">Mismatch Profile</span>
                  </div>
                </div>
              </div>

              <div className="space-y-5 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                {[
                  { t: "Short-Term Trend Chasing", d: "You’re looking for dropshipping quick wins or hacks." },
                  { t: "Ads-Only Mindset", d: "You expect PPC alone to fix bad products or conversion." },
                  { t: "Brand Resistance", d: "You aren't ready to invest in high-end creative or positioning." },
                  { t: "Minimal Commitment", d: "You're testing with low budget or zero strategic commitment." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="mt-1.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-500/5 flex items-center justify-center border border-red-500/10" aria-hidden="true">
                      <XCircle size={12} className="text-red-500/40" />
                    </div>
                    <div>
                      <h4 className="text-zinc-300 font-bold text-base mb-0.5 tracking-tight">{item.t}</h4>
                      <p className="text-zinc-600 leading-relaxed font-light text-sm">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── FOOTER CTA ── */}
        <div className="mt-20 flex flex-col items-center">
          <p className="text-zinc-500 text-base font-light mb-10 text-center max-w-xl">
            If this aligns with your vision, we’ll show you exactly how our system would approach your brand.
          </p>
          
          <Link
            href="/contact"
            prefetch={false}
            className="group relative flex items-center gap-4 sm:gap-8 px-6 sm:px-10 py-6 rounded-[20px] bg-white text-black hover:bg-zinc-100 transition-all duration-500 shadow-[0_20px_50px_rgba(255,255,255,0.1)] overflow-hidden w-full sm:w-auto justify-center no-underline focus-visible:ring-4 focus-visible:ring-orange-500/50 outline-none"
          >
            <div className="relative z-10 flex items-center gap-4 sm:gap-6">
              <span className="uppercase tracking-[0.15em] sm:tracking-[0.4em] text-[9px] sm:text-[10px] font-black whitespace-nowrap">Get your growth breakdown</span>
              <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shrink-0">
                <ArrowRight size={16} className="text-white" />
              </div>
            </div>
            {/* Specular Sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </Link>
          
          <div className="mt-10 flex items-center gap-3">
             <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
             <p className="text-zinc-600 text-[9px] font-mono uppercase tracking-[0.3em]">
               2 Strategy slots available this week
             </p>
          </div>
        </div>
      </div>
    </section>
  );
}
