"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import gsap from "gsap";

export default function HeroThree({ scrollToForm }) {
  const sectionRef = useRef(null);
  const planetRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-fade",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.3 }
      );
      gsap.to(planetRef.current, {
        y: 12,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif", background: "#050505" }}
    >
      {/* ── Background Atmosphere ── */}
      {/* Warm orange ambient glow behind the planet area */}
      <div className="absolute top-0 right-0 w-[60%] h-full pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_45%,rgba(249,115,22,0.06)_0%,transparent_60%)]" />
      </div>
      {/* Subtle radial from bottom-right corner */}
      <div className="absolute bottom-0 right-0 w-[50%] h-[50%] pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_90%,rgba(249,115,22,0.04)_0%,transparent_50%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-6 items-center min-h-screen pt-28 pb-16">

          {/* ════════════ LEFT COLUMN ════════════ */}
          <div className="max-w-[620px]">

            {/* Badge */}
            <div className="hero-fade inline-block px-5 py-2.5 rounded-lg border border-orange-500/25 bg-orange-500/[0.04] mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
                Amazon Growth Engineers
              </span>
            </div>

            {/* Headline — Title Case, "Convert & Scale." in orange italic */}
            <h1 className="hero-fade text-[40px] sm:text-[52px] md:text-[62px] lg:text-[68px] font-[900] text-white leading-[1.08] tracking-[-0.02em] mb-6">
              We Build Amazon
              <br />
              Growth Systems That
              <br />
              <span className="text-orange-500 italic">Convert &amp; Scale.</span>
            </h1>

            {/* Sub-copy */}
            <p className="hero-fade text-[15px] md:text-[16px] text-zinc-400 leading-[1.7] mb-10 max-w-[440px]">
              We design, optimize, and scale every layer of your Amazon business
              — from positioning to profits.
            </p>

            {/* CTAs */}
            <div className="hero-fade flex flex-col sm:flex-row items-start gap-4 mb-12">
              <button
                onClick={scrollToForm}
                className="group px-8 py-4 bg-orange-500 text-white rounded-xl font-black text-[11px] uppercase tracking-[0.15em] flex items-center gap-3 hover:bg-orange-600 transition-all shadow-[0_12px_32px_rgba(249,115,22,0.3)] active:scale-[0.97]"
              >
                Book a Free Growth Call
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-transparent text-white border border-white/15 rounded-xl font-black text-[11px] uppercase tracking-[0.15em] flex items-center hover:bg-white/5 transition-all active:scale-[0.97]">
                See Our Results
              </button>
            </div>

            {/* Trust checkmarks — matching design's ✓ icon style */}
            <div className="hero-fade flex flex-wrap gap-7 items-center">
              {[
                "Data-Driven Strategies",
                "Full-Funnel Expertise",
                "Proven Track Record",
              ].map((label, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-orange-500" />
                  <span className="text-[10px] font-bold text-zinc-400 tracking-wide">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ════════════ RIGHT COLUMN — Planet ════════════ */}
          <div ref={planetRef} className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-[380px] sm:w-[440px] md:w-[500px] lg:w-[540px] aspect-square flex items-center justify-center">

              {/* Orbital rings — warm orange, tilted ellipses */}
              <svg
                className="absolute inset-[-20%] w-[140%] h-[140%] z-0 pointer-events-none"
                viewBox="0 0 600 600"
                fill="none"
              >
                {/* Inner ring — strongest */}
                <ellipse
                  cx="300" cy="300" rx="250" ry="100"
                  stroke="url(#ringGrad)" strokeWidth="1.4"
                  opacity="0.5"
                  transform="rotate(-20 300 300)"
                />
                {/* Outer ring — softer */}
                <ellipse
                  cx="300" cy="300" rx="310" ry="130"
                  stroke="url(#ringGrad)" strokeWidth="0.8"
                  opacity="0.25"
                  transform="rotate(-20 300 300)"
                />
                {/* Innermost ring — subtle */}
                <ellipse
                  cx="300" cy="300" rx="200" ry="80"
                  stroke="url(#ringGrad)" strokeWidth="0.6"
                  opacity="0.15"
                  transform="rotate(-20 300 300)"
                />
                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.1" />
                    <stop offset="30%" stopColor="#f97316" stopOpacity="1" />
                    <stop offset="70%" stopColor="#f97316" stopOpacity="1" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Planet core glow — warm orange halo behind the sphere */}
              <div className="absolute z-[5] w-[340px] md:w-[400px] aspect-square rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.08)_0%,transparent_70%)]" />

              {/* Main planet */}
              <div className="relative z-10 w-[280px] sm:w-[320px] md:w-[360px] aspect-square rounded-full overflow-hidden shadow-[0_0_80px_rgba(249,115,22,0.12)]">
                <Image
                  src="/.netlify/images?url=/assets/planet-bg.png&w=800&fm=avif&q=80"
                  alt="Orbit Planet"
                  fill
                  className="object-cover scale-[1.5] rotate-[15deg]"
                  priority
                  fetchPriority="high"
                />
                {/* Atmosphere overlay — warm dark edge */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-transparent to-orange-500/[0.06]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,transparent_25%,rgba(0,0,0,0.85)_100%)]" />
                {/* Rim light — warm orange on the upper-right edge */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.15)_0%,transparent_60%)]" />
              </div>

              {/* Satellite — small, top-left */}
              <div className="absolute top-[14%] left-[6%] z-20">
                <div className="w-[32px] h-[32px] rounded-full bg-zinc-900 border border-white/[0.06] shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)]" />
              </div>

              {/* Satellite — larger, bottom-right */}
              <div className="absolute bottom-[14%] right-[4%] z-20">
                <div className="w-[48px] h-[48px] rounded-full bg-zinc-900 border border-white/[0.06] shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)]">
                  {/* Tiny orange highlight on top edge */}
                  <div className="absolute top-0 right-1 w-3 h-3 rounded-full bg-orange-500/20 blur-sm" />
                </div>
              </div>

              {/* ── System Active Badge ── */}
              <div className="absolute top-[36%] right-[-6%] z-30 w-[220px] py-4 px-5 rounded-2xl bg-[#111]/95 backdrop-blur-xl border border-white/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-[5px] h-[5px] rounded-full bg-[#4ade80]" />
                  <span className="text-[8px] font-extrabold text-zinc-500 uppercase tracking-[0.2em]">
                    System Active · 24/7
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-white/90 leading-[1.6]">
                  Driving growth across
                  <br />
                  listings, ads &amp; operations.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
