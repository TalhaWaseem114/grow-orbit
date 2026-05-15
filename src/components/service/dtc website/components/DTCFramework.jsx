import React, { useEffect, useRef } from "react";
import { ArrowRight, BarChart2 } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500/50"></div>
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-400/80">
      {children}
    </span>
  </div>
);

export default function DTCFramework() {
  const sectionRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the progress bars on scroll
      gsap.from(".progress-bar-fill", {
        width: "0%",
        duration: 2,
        ease: "expo.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: chartRef.current,
          start: "top 85%",
        }
      });

      // Subtle entrance for the heading text
      gsap.from(".text-reveal", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
    <section ref={sectionRef} className="py-20 sm:py-32 bg-zinc-950 text-white relative overflow-hidden">

      {/* Visual Bridge: Subtle top border glow to transition from white hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-950/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-orange-600/5 blur-[120px] sm:blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Content */}
          <div className="text-left">
            <SectionLabel>// LOGIC_STATE: DIVERSIFICATION_PATH</SectionLabel>
            <h2 className="text-reveal text-[42px] sm:text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] sm:leading-[0.88] mb-6 sm:mb-8">
              Freedom from<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light lowercase tracking-normal text-zinc-500">Marketplaces.</span>
            </h2>
            <p className="text-reveal text-zinc-400 text-base sm:text-lg font-light leading-relaxed max-w-lg mb-8 sm:mb-10">
              We engineer standalone e-commerce capabilities—from high-converting frontend experiences to backend fulfillment routing—ensuring your brand operates independently of any single platform.
            </p>

          </div>

          {/* Right: Technical Data Card */}
          <div
            ref={chartRef}
            className="bg-zinc-900/40 rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 border border-white/5 backdrop-blur-md shadow-[0_40px_80px_rgba(0,0,0,0.4)] relative"
          >
            {/* Corner Accent */}
            <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-orange-500 animate-pulse" />

            {/* Card Header */}
            <div className="flex items-center justify-between mb-8 sm:mb-10">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <BarChart2 size={18} className="text-orange-500" />
                </div>
                <div>
                  <span className="block text-white font-bold text-sm sm:text-base tracking-tight">Traffic Diversification</span>
                  <span className="block text-[8px] sm:text-[9px] font-mono text-zinc-500 uppercase tracking-widest">System_Active: v2.0</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-orange-500 font-black text-xl sm:text-2xl tracking-tighter">+42%</span>
                <span className="block text-[8px] sm:text-[9px] font-mono text-zinc-600 uppercase">Growth_Yield</span>
              </div>
            </div>

            {/* BEFORE: Amazon Dependency */}
            <div className="mb-8 sm:mb-10">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-zinc-500">Amazon Dependency</span>
                <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-zinc-400">Baseline</span>
              </div>
              <div className="h-2.5 sm:h-3 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="progress-bar-fill h-full w-[92%] bg-zinc-700 rounded-full" />
              </div>
            </div>

            {/* AFTER: Omnichannel Split */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-orange-500">Omnichannel Split</span>
                <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-zinc-400">Projected</span>
              </div>
              <div className="h-2.5 sm:h-3 w-full bg-white/5 rounded-full overflow-hidden flex">
                <div className="progress-bar-fill h-full w-[55%] bg-orange-500 border-r border-zinc-900" />
                <div className="progress-bar-fill h-full w-[25%] bg-orange-400 border-r border-zinc-900" />
                <div className="progress-bar-fill h-full w-[20%] bg-indigo-500" />
              </div>
            </div>

            {/* Technical Legend */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 border-t border-white/5 pt-6 sm:pt-8">
              <div>
                <span className="block text-zinc-500 font-mono text-[8px] sm:text-[9px] uppercase mb-1">Amazon</span>
                <span className="text-white font-bold text-xs sm:text-sm">55%</span>
              </div>
              <div>
                <span className="block text-zinc-500 font-mono text-[8px] sm:text-[9px] uppercase mb-1">DTC Site</span>
                <span className="text-orange-500 font-bold text-xs sm:text-sm">25%</span>
              </div>
              <div>
                <span className="block text-zinc-500 font-mono text-[8px] sm:text-[9px] uppercase mb-1">Other B2B</span>
                <span className="text-indigo-400 font-bold text-xs sm:text-sm">20%</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    {/* Mid-Page CTA Strip */}
    <div className="bg-zinc-950 py-10 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-white font-black text-xl sm:text-2xl tracking-tighter uppercase">Ready to own your traffic?</p>
        <Link
          href="/get-started"
          className="group flex items-center gap-3 bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-orange-400 transition-all duration-300 no-underline shadow-[0_10px_30px_rgba(249,115,22,0.3)]"
        >
          Book Free Strategy Call
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
    </>
  );
}
