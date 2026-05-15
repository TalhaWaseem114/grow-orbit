"use client";

import React, { useRef, useEffect } from "react";
import {
  TrendingDown, Award, Package, AlertTriangle,
  ArrowRight, Activity, Search, Crosshair,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "./SectionLabel";

gsap.registerPlugin(ScrollTrigger);

export default function WhoItsFor() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".signal-block").forEach((block, i) => {
        gsap.fromTo(block,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const signals = [
    {
      index: "01",
      icon: <TrendingDown size={18} />,
      label: "SIGNAL DETECTED",
      status: "HIGH PRIORITY",
      statusColor: "text-red-500 bg-red-500/10 border-red-500/20",
      headline: "Your ad spend is climbing. Your profit isn't.",
      subline: "The budget leak pattern.",
      body: "You're pouring more into PPC every month — but the returns are flatlining. ACoS creeps up, ROAS stays stuck, and you can't tell which campaigns are feeding growth versus burning cash. This isn't a scaling problem. It's a visibility problem.",
      symptoms: [
        "TACoS rising without proportional revenue growth",
        "No clear boundary between organic and paid attribution",
        "Budget increases that don't move the profitability needle",
      ],
      accentGradient: "from-red-500/80 to-orange-500/80",
    },
    {
      index: "02",
      icon: <Activity size={18} />,
      label: "PATTERN IDENTIFIED",
      status: "CRITICAL",
      statusColor: "text-orange-500 bg-orange-500/10 border-orange-500/20",
      headline: "Revenue hit 7 figures. Margin didn't follow.",
      subline: "The silent margin erosion.",
      body: "You've scaled past six figures — maybe well past it. The top line looks strong. But underneath, something is quietly compressing your margin. Too many campaigns. Unclear attribution. Spend that's grown organically into chaos. You don't need more tactics. You need a structural x-ray.",
      symptoms: [
        "$500K–$5M in annual Amazon revenue with shrinking net margin",
        "Campaign sprawl with no clear performance hierarchy",
        "Growth that's outpaced your operational infrastructure",
      ],
      featured: true,
      accentGradient: "from-orange-500 to-amber-500",
    },
    {
      index: "03",
      icon: <Crosshair size={18} />,
      label: "PRE-LAUNCH SCAN",
      status: "ADVISORY",
      statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      headline: "You haven't launched yet. Good. Read this first.",
      subline: "The preventive diagnostic.",
      body: "The most expensive mistake on Amazon is launching blind. Before you commit a single dollar to advertising, we map the entire competitive landscape — keyword territories, pricing architecture, content benchmarks — so your first move is a calculated strike, not a guess.",
      symptoms: [
        "Preparing to enter a competitive Amazon category",
        "Need to avoid the 'spray and pray' launch pattern",
        "Want a data-backed keyword and positioning foundation before day one",
      ],
      accentGradient: "from-emerald-500/80 to-teal-500/80",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 lg:py-32 bg-white relative overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 relative z-10">

        {/* ── Section Header ── */}
        <div className="mb-12 lg:mb-20">
          <SectionLabel>Who This Is For</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 mt-4">
            <h2
              className="text-3xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              We've seen your<br />
              pattern before.
            </h2>
            <p className="text-zinc-400 text-sm lg:text-base font-light leading-relaxed max-w-md lg:text-right">
              Every underperforming Amazon account leaves the same diagnostic fingerprints. Here are the three we find most often — and what they mean.
            </p>
          </div>
        </div>

        {/* ── Diagnostic Signal Blocks ── */}
        <div className="space-y-0 relative">
          {/* Vertical axis line */}
          <div className="absolute left-0 lg:left-4 top-0 bottom-0 w-px bg-zinc-100 hidden lg:block" />

          {signals.map((s, i) => {
            const isFeatured = s.featured;

            return (
              <div key={i} className="signal-block relative">
                {/* Tech Annotation */}
                <div className="absolute -left-16 top-16 hidden xl:block origin-right -rotate-90">
                  <span className="text-[7px] font-mono font-bold text-zinc-300 uppercase tracking-[0.5em]">
                    [DATA_STREAM_{s.index}]
                  </span>
                </div>

                <div className={`relative group transition-all duration-700 ${
                  isFeatured
                    ? "bg-zinc-950 rounded-[28px] lg:rounded-[48px] px-5 lg:px-16 py-10 lg:py-20 my-6 lg:my-8 shadow-[0_30px_80px_rgba(0,0,0,0.3)] lg:shadow-[0_50px_120px_rgba(0,0,0,0.4)] ring-1 ring-white/10"
                    : "py-10 lg:py-16 border-b border-zinc-50 last:border-0 lg:pl-8 lg:border-l-2 lg:border-l-transparent hover:border-l-orange-500/40"
                }`}>

                  {/* High-Tech Background Elements */}
                  {isFeatured ? (
                    <>
                      {/* Scanning Line Animation */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[48px]">
                        <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-orange-500/5 to-transparent -translate-y-full animate-[scan-vertical_8s_linear_infinite]" />
                        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px]" />
                      </div>
                      
                      {/* Corner Brackets */}
                      <div className="absolute top-5 left-5 lg:top-8 lg:left-8 w-3 h-3 lg:w-4 lg:h-4 border-t-2 border-l-2 border-white/10 hidden sm:block" />
                      <div className="absolute top-5 right-5 lg:top-8 lg:right-8 w-3 h-3 lg:w-4 lg:h-4 border-t-2 border-r-2 border-white/10 hidden sm:block" />
                      <div className="absolute bottom-5 left-5 lg:bottom-8 lg:left-8 w-3 h-3 lg:w-4 lg:h-4 border-b-2 border-l-2 border-white/10 hidden sm:block" />
                      <div className="absolute bottom-5 right-5 lg:bottom-8 lg:right-8 w-3 h-3 lg:w-4 lg:h-4 border-b-2 border-r-2 border-white/10 hidden sm:block" />

                      <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/[0.05] rounded-full blur-[100px] pointer-events-none" />
                    </>
                  ) : (
                    /* Subtle grid on hover for light blocks */
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div className="absolute inset-0 bg-[radial-gradient(#f43f5e10_1px,transparent_1px)] [background-size:32px_32px]" />
                    </div>
                  )}

                  <div className="relative z-10">
                    {/* Top metadata row — stacks on mobile */}
                    <div className="flex flex-wrap items-center gap-2 lg:gap-4 mb-6 lg:mb-8">
                      <div className={`flex items-center gap-2 ${isFeatured ? "text-orange-500" : "text-zinc-300"}`}>
                        <span className="text-[11px] font-black tracking-widest font-mono">[{s.index}]</span>
                      </div>
                      <div className={`h-px w-6 lg:flex-1 lg:max-w-[40px] ${isFeatured ? "bg-white/10" : "bg-zinc-100"}`} />
                      
                      <span className={`text-[8px] lg:text-[9px] font-black tracking-[0.3em] lg:tracking-[0.4em] uppercase ${
                        isFeatured ? "text-white/40" : "text-zinc-400"
                      }`}>
                        {s.label}
                      </span>
                      
                      <div className={`h-px flex-1 hidden lg:block ${isFeatured ? "bg-white/5" : "bg-zinc-50"}`} />
                      
                      {/* Dynamic Status */}
                      <div className={`flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-4 py-1 lg:py-1.5 rounded-full border text-[7px] lg:text-[8px] font-black uppercase tracking-[0.25em] lg:tracking-[0.35em] backdrop-blur-md ml-auto ${s.statusColor}`}>
                        <div className="relative w-1.5 h-1.5">
                          <div className="absolute inset-0 bg-current rounded-full animate-ping opacity-75" />
                          <div className="relative bg-current rounded-full w-full h-full" />
                        </div>
                        {s.status}
                      </div>
                    </div>

                    {/* Main content: 2-column editorial */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20 items-start">
                      {/* Left: Headline + Technical Stats */}
                      <div className="lg:col-span-5">
                        <div className={`inline-block mb-3 px-2 py-1 rounded text-[7px] font-mono font-bold ${isFeatured ? "bg-white/5 text-zinc-500" : "bg-zinc-100 text-zinc-400"}`}>
                          SCAN_TYPE: {s.subline.toUpperCase()}
                        </div>
                        <h3
                          className={`text-2xl lg:text-[40px] font-black uppercase tracking-tighter leading-[0.95] mb-4 lg:mb-6 ${
                            isFeatured ? "text-white italic" : "text-zinc-900"
                          }`}
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {s.headline}
                        </h3>
                      </div>

                      {/* Right: Body + Symptoms */}
                      <div className="lg:col-span-7 lg:pl-10 lg:border-l border-current transition-colors duration-700" style={{ borderColor: isFeatured ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)" }}>
                        <p className={`text-[13px] lg:text-[15px] font-light leading-[1.75] lg:leading-[1.85] mb-5 lg:mb-6 ${
                          isFeatured ? "text-zinc-400" : "text-zinc-500"
                        }`}>
                          {s.body}
                        </p>

                        {/* Symptoms with refined technical styling */}
                        <div className={`rounded-2xl lg:rounded-3xl p-5 lg:p-8 transition-all duration-700 ${
                          isFeatured 
                            ? "bg-white/[0.02] border border-white/10 shadow-inner" 
                            : "bg-zinc-50 border border-zinc-100 group-hover:bg-white group-hover:shadow-xl group-hover:shadow-zinc-200/40"
                        }`}>
                          <div className="flex items-center justify-between mb-4">
                            <span className={`text-[9px] font-mono font-black uppercase tracking-[0.4em] ${
                              isFeatured ? "text-orange-500/40" : "text-zinc-300"
                            }`}>
                              CRITICAL_SYMPTOMS
                            </span>
                            <div className={`w-8 h-px ${isFeatured ? "bg-white/10" : "bg-zinc-100"}`} />
                          </div>
                          
                          <div className="space-y-4">
                            {s.symptoms.map((symptom, j) => (
                              <div key={j} className="flex items-start gap-4 group/symptom">
                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${
                                  isFeatured 
                                    ? "bg-white/5 border border-white/5 text-orange-400 group-hover/symptom:bg-orange-500 group-hover/symptom:text-white" 
                                    : "bg-white border border-zinc-100 text-orange-500/40 group-hover/symptom:border-orange-500 group-hover/symptom:text-orange-500"
                                }`}>
                                  <span className="text-[8px] font-mono font-bold">{j + 1}</span>
                                </div>
                                <span className={`text-[13px] font-medium leading-relaxed transition-colors duration-300 ${
                                  isFeatured ? "text-zinc-500 group-hover/symptom:text-zinc-300" : "text-zinc-600"
                                }`}>
                                  {symptom}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA Strip ── */}
        <div className="mt-12 lg:mt-16 relative">
          <div className="bg-zinc-50 rounded-[24px] lg:rounded-[32px] border border-zinc-100 p-6 lg:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 lg:gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                <Search size={16} className="text-orange-500" />
              </div>
              <div>
                <p className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.35em] lg:tracking-[0.4em] text-orange-500 mb-1.5">Sound familiar?</p>
                <p className="text-zinc-600 text-[13px] lg:text-sm font-light leading-relaxed max-w-lg">
                  If any of these patterns match your situation, the Orbit Diagnostic was built for you.
                </p>
              </div>
            </div>
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-zinc-950 text-white w-full md:w-auto px-6 lg:px-8 py-3.5 lg:py-4 rounded-full text-[10px] lg:text-[11px] font-black uppercase tracking-[0.2em] lg:tracking-[0.25em] hover:bg-orange-500 hover:shadow-[0_20px_50px_rgba(249,115,22,0.3)] transition-all duration-500 shrink-0 active:scale-[0.97]"
            >
              Request Your Diagnostic
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
