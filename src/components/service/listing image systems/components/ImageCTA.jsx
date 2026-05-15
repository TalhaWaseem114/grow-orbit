import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ImageCTA() {
  return (
    <section className="py-20 bg-white px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="relative bg-zinc-950 rounded-[48px] overflow-hidden px-8 py-20 md:px-20 flex flex-col items-center text-center">
          {/* Radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/15 blur-[100px] rounded-full pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-10">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Visual Pipeline: Ready</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.88] mb-8 text-white">
              Engineer your<br />
              <span className="italic font-serif lowercase tracking-normal text-zinc-500">visuals.</span>
            </h2>

            <p className="text-zinc-400 text-lg font-light max-w-xl mx-auto mb-12">
              Stop leaving conversions on the table with mediocre imagery. Let us build a visual system that sells while you sleep.
            </p>

            <p className="text-[10px] md:text-[11px] italic text-zinc-500 mb-6 flex items-center justify-center gap-2">
              <span className="text-orange-500 not-italic">★★★★★</span>
              "Joined as Listing Images. Revenue up 38% in 60 days." — Beauty Brand
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 to-orange-400 text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:shadow-[0_0_60px_rgba(249,115,22,0.5)] transition-all active:scale-95 no-underline"
            >
              Start Your Visual Audit
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
