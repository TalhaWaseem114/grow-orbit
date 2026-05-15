import React from 'react';
import { Check, ArrowRight, Globe } from "lucide-react";
import Link from "next/link";

export default function DTCCTA() {
  const steps = [
    "Discovery & Strategy",
    "Design & Build",
    "Launch & Optimize"
  ];

  return (
    <div className="w-full pb-16 bg-[#fafafa]">
      <section className="px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0a0a0a] rounded-[40px] py-16 px-8 lg:px-16 text-center relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-white/5 transition-colors duration-500 hover:border-orange-500/20 group">

            {/* STATIC BACKGROUND GLOW */}
            <div className="absolute inset-0 bg-gradient-radial from-orange-500/10 via-transparent to-transparent pointer-events-none" />

            {/* STATIC CORE ICON */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <Globe size={250} strokeWidth={0.5} className="text-orange-500 opacity-10" />
            </div>

            {/* CONTENT */}
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="text-white font-bold text-[9px] uppercase tracking-[0.4em]">
                  Commerce: Ready
                </span>
              </div>

              <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter mb-6 leading-[1.05] text-white">
                Own Your <br />
                <span className="italic font-serif block mt-2 tracking-tight text-orange-500">
                  Platform.
                </span>
              </h2>

              <p className="text-gray-400 font-light mb-10 text-base leading-relaxed max-w-lg mx-auto">
                Book a consultation to evaluate your DTC potential. We'll map out the architecture,
                identify quick wins, and build a roadmap from marketplace dependency to channel independence.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-4 px-10 py-5 bg-orange-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all duration-500 shadow-[0_15px_40px_rgba(249,115,22,0.3)]"
              >
                Discuss Your Strategy
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>

              <div className="mt-12 pt-8 border-t border-white/8 flex flex-wrap justify-center gap-x-10 gap-y-4">
                {steps.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 transition-all duration-500 hover:text-zinc-200">
                    <Check size={14} className="text-orange-500" strokeWidth={4} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .bg-gradient-radial {
          background-image: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 70%);
        }
      `}} />
    </div>
  );
}
