"use client";

import React from "react";
import Image from "next/image";
import { Check, X, ArrowRight } from "lucide-react";

const forYou = [
  "You have a product with real potential",
  "You're doing revenue but growth is stuck",
  "You want a scalable, proven system",
  "You're ready to invest and grow",
];

const notForYou = [
  "You're looking for overnight results",
  "You're running limited-budget experiments",
  "You only want someone to run ads",
  "You're not ready to commit to growth",
];

export default function FitSectionThree({ scrollToForm }) {
  return (
    <section className="py-28" style={{ background: "#050505", fontFamily: "'Montserrat', sans-serif" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="relative rounded-[40px] bg-zinc-900/70 border border-white/[0.05] overflow-hidden">
          {/* Planet background */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-5%] w-[45%] h-[120%]">
              <Image
                src="/assets/planet-bg.png"
                alt="Planet Background"
                fill
                className="object-cover opacity-30 rotate-[25deg] scale-150"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/30 via-zinc-900/90 to-zinc-900" />
          </div>

          <div className="relative z-10 grid lg:grid-cols-3 gap-12 p-12 md:p-16 lg:p-20">
            {/* Col 1: Heading + CTA */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-[40px] font-[900] text-white tracking-tight leading-[1.05] mb-6">
                Are We the
                <br />
                <span className="text-orange-500">Right Fit?</span>
              </h2>
              <p className="text-[13px] text-zinc-500 leading-relaxed mb-10 max-w-[300px]">
                We partner with brands that are serious about Amazon growth and ready to invest in a proven system.
              </p>
              <button
                onClick={scrollToForm}
                className="w-fit px-8 py-4 bg-orange-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 active:scale-95"
              >
                Book a Free Growth Call <ArrowRight size={14} />
              </button>
            </div>

            {/* Col 2: For You */}
            <div>
              <h3 className="text-[11px] font-[900] text-white uppercase tracking-[0.2em] mb-8 pb-4 border-b border-white/[0.06]">
                This is for you if:
              </h3>
              <div className="space-y-5">
                {forYou.map((item, i) => (
                  <div key={i} className="flex gap-3.5 items-start">
                    <div className="w-5 h-5 rounded-md bg-orange-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-orange-500" />
                    </div>
                    <span className="text-[12px] font-semibold text-zinc-300 leading-tight">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Col 3: Not For You */}
            <div>
              <h3 className="text-[11px] font-[900] text-white uppercase tracking-[0.2em] mb-8 pb-4 border-b border-white/[0.06]">
                This is NOT for you if:
              </h3>
              <div className="space-y-5">
                {notForYou.map((item, i) => (
                  <div key={i} className="flex gap-3.5 items-start opacity-60">
                    <div className="w-5 h-5 rounded-md bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X size={12} className="text-red-500" />
                    </div>
                    <span className="text-[12px] font-semibold text-zinc-400 leading-tight">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
