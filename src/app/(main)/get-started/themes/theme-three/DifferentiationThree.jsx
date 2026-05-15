"use client";

import React from "react";
import { CheckCircle2, Settings, Target, Palette, BarChart3, PieChart } from "lucide-react";

const checkpoints = [
  "Full-Funnel Amazon Expertise",
  "Data-Backed Decision Making",
  "Transparent Communication",
  "Committed to Your Growth",
];

function OrbitNode({ icon: Icon, label, x, y }) {
  return (
    <div
      className="absolute flex flex-col items-center gap-2 group"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
    >
      <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-zinc-500 group-hover:text-orange-500 group-hover:border-orange-500/40 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all duration-300">
        <Icon size={18} strokeWidth={1.8} />
      </div>
      <span className="text-[9px] font-extrabold text-zinc-600 uppercase tracking-widest group-hover:text-zinc-300 transition-colors whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export default function DifferentiationThree() {
  return (
    <section className="py-28 overflow-hidden" style={{ background: "#050505", fontFamily: "'Montserrat', sans-serif" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* ── Left copy ── */}
          <div>
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-8 h-[1px] bg-orange-500/30" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-orange-500">
                Why Grow Orbit
              </span>
              <div className="w-8 h-[1px] bg-orange-500/30" />
            </div>

            <h2 className="text-3xl md:text-[48px] font-[900] text-white tracking-tight leading-[1.05] mb-7">
              We Don't Run Ads.
              <br />
              We <span className="text-orange-500 italic">Engineer Growth.</span>
            </h2>

            <p className="text-[15px] text-zinc-500 leading-relaxed mb-10 max-w-[460px]">
              Most agencies focus on one piece. We connect every piece to build a
              compounding growth engine.
            </p>

            <div className="space-y-4">
              {checkpoints.map((item, i) => (
                <div key={i} className="flex items-center gap-3.5">
                  <CheckCircle2 size={16} className="text-orange-500 flex-shrink-0" />
                  <span className="text-[12px] font-bold text-zinc-300 tracking-wide">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right orbital diagram ── */}
          <div className="relative flex items-center justify-center h-[460px]">
            {/* Rings */}
            <div className="absolute w-[300px] h-[300px] rounded-full border border-white/[0.04]" />
            <div className="absolute w-[400px] h-[400px] rounded-full border border-white/[0.03]" />

            {/* Center G */}
            <div className="relative z-20 w-[110px] h-[110px] rounded-full bg-zinc-900 border-[3px] border-orange-500 flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.2)]">
              <span className="text-[44px] font-[900] text-orange-500">G</span>
            </div>

            {/* Nodes */}
            <OrbitNode icon={Target} label="Strategy" x={78} y={15} />
            <OrbitNode icon={Settings} label="Operations" x={50} y={5} />
            <OrbitNode icon={Palette} label="Creative" x={90} y={55} />
            <OrbitNode icon={PieChart} label="Analytics" x={75} y={88} />
            <OrbitNode icon={BarChart3} label="PPC" x={22} y={85} />
          </div>
        </div>
      </div>
    </section>
  );
}
