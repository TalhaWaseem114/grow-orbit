"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Zap, Lock } from "lucide-react";

export default function FooterCTAThree({ scrollToForm }) {
  return (
    <section className="relative py-32 overflow-hidden" style={{ background: "#050505", fontFamily: "'Montserrat', sans-serif" }}>
      {/* Planet BG */}
      <div className="absolute bottom-[-25%] right-[-8%] w-[55%] aspect-square pointer-events-none z-0 opacity-50">
        <Image
          src="/assets/planet-bg.png"
          alt="Planet Background"
          fill
          className="object-contain rotate-[-40deg] scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#050505]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        <div className="max-w-[680px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-8 h-[1px] bg-orange-500/30" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-orange-500">
              Ready to Orbit?
            </span>
            <div className="w-8 h-[1px] bg-orange-500/30" />
          </div>

          <h2 className="text-4xl md:text-[56px] font-[900] text-white leading-[1.05] tracking-tight mb-7">
            Let's Build Your Amazon
            <br />
            <span className="text-orange-500">Growth Engine.</span>
          </h2>

          <p className="text-[15px] text-zinc-400 leading-relaxed mb-11 max-w-[520px]">
            Book a free strategy call and discover how we can 2X – 10X your
            Amazon growth with our proven system.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={scrollToForm}
              className="px-9 py-[18px] bg-orange-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.18em] flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-[0_16px_40px_rgba(249,115,22,0.25)] active:scale-[0.97]"
            >
              Book a Free Growth Call <ArrowRight size={16} />
            </button>
            <button className="px-9 py-[18px] bg-transparent text-white border border-white/15 rounded-2xl font-black text-[11px] uppercase tracking-[0.18em] flex items-center justify-center hover:bg-white/5 transition-all active:scale-[0.97]">
              See Our Results
            </button>
          </div>

          {/* Trust points */}
          <div className="flex flex-wrap gap-6 items-center">
            {[
              { icon: ShieldCheck, label: "Custom Growth Plan" },
              { icon: Zap, label: "No Obligation" },
              { icon: Lock, label: "100% Confidential" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <item.icon size={14} className="text-orange-500" />
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mini Footer */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-28 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Grow Orbit" className="w-5 h-5 object-contain" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest">
            Grow <span className="text-orange-500">Orbit</span>
          </span>
        </div>
        <p className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">
          © 2026 Grow Orbit Inc. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service"].map((link) => (
            <span
              key={link}
              className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest cursor-pointer hover:text-white transition-colors"
            >
              {link}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
