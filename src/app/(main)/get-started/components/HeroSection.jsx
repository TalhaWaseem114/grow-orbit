"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, CheckCircle2, ArrowRight, Star, TrendingUp, Rocket, Shield, Heart } from "lucide-react";
import HeroMegaMenu from "../HeroMegaMenu";
import LeadForm from "./LeadForm";

export default function HeroSection({ scrollToForm, formRef }) {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-stretch overflow-hidden bg-zinc-950">

      {/* Left — statement */}
      <div className="relative bg-zinc-950 flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-20 pt-20 sm:pt-24 pb-16 lg:py-0 z-10">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />

        {/* ── Custom Hero Navbar (Desktop Only) ── */}
        <header className="hidden lg:flex absolute top-6 left-8 md:left-16 lg:left-20 right-8 md:right-16 lg:right-20 items-center justify-between z-50">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group no-underline">
            <Image
              src="/logo.png"
              alt="Grow Orbit Logo"
              width={32}
              height={32}
              className="object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-lg font-black tracking-tight uppercase flex gap-1.5 transition-colors">
              <span className="text-white">GROW</span>
              <span className="text-[#F1A52B]">ORBIT</span>
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-10">
            <Link href="/" className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors no-underline">
              Home
            </Link>
            {/* Service Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onMouseEnter={() => setServicesOpen(true)}
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors outline-none"
              >
                Services
                <ChevronDown size={12} className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180 text-orange-500' : ''}`} />
              </button>

              {/* Hero Mega Menu — Centered under button */}
              {servicesOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-[100]"
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <HeroMegaMenu onClose={() => setServicesOpen(false)} />
                </div>
              )}
            </div>

            <Link href="/portfolio" className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors no-underline">
              Portfolio
            </Link>
            <Link href="/case-study" className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors no-underline">
              Case Study
            </Link>
          </nav>
        </header>

        <div className="relative z-10 max-w-2xl xl:max-w-3xl fade-up mt-2 sm:mt-[20px]">
          {/* Eyebrow */}
          <div className="relative mb-10 sm:mb-12 -ml-4 sm:-ml-6 md:-ml-8 lg:-ml-[50px] translate-y-[5px]">
            <div className="flex items-center gap-4">
              <div className="w-2.5 h-2.5 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.6)] animate-pulse" />
              <div className="w-12 h-px bg-orange-500/30" />
              <div className="flex items-center gap-3">
                <span className="text-orange-500 font-mono text-[10px] sm:text-[11px] font-black tracking-[0.4em] uppercase">01 / System</span>
                <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full" />
                <span className="text-zinc-500 font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.4em]">Growth Partner</span>
              </div>
            </div>
            {/* Vertical Drop Line with Glow */}
            <div className="absolute left-[5px] top-7 w-px h-32 bg-gradient-to-b from-orange-500 via-orange-500/50 to-transparent opacity-40 hidden sm:block">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-orange-500/20 blur-xl rounded-full" />
            </div>
          </div>

          {/* Specialized Landing Selector */}
          <div className="mb-8 flex flex-wrap gap-2.5 items-center justify-start">
            <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider">Explore Specializations:</span>
            <Link
              href="/get-started/amazon-services-landing"
              className="group flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 hover:border-orange-500/40 text-orange-500 px-3.5 py-1.5 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-wider no-underline transition-all duration-300 shadow-[0_4px_12px_rgba(249,115,22,0.05)]"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500"></span>
              </span>
              Amazon PPC &amp; Operations
            </Link>
            <Link
              href="/get-started/design-creative-landing"
              className="group flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 hover:border-violet-500/40 text-violet-400 px-3.5 py-1.5 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-wider no-underline transition-all duration-300 shadow-[0_4px_12px_rgba(139,92,246,0.05)]"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-500"></span>
              </span>
              Visual Design &amp; A+
            </Link>
          </div>

          <h1
            className="text-white mb-5 sm:mb-6 uppercase text-[38px] sm:text-5xl md:text-6xl lg:text-[72px] font-black tracking-tighter leading-[0.9] sm:leading-[0.85]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            We build &amp;<br />
            Scale <span className="text-orange-500">Amazon</span><br />
            Brands to<br />
            <span className="text-orange-500 italic font-medium lowercase tracking-normal text-[42px] sm:text-6xl md:text-[75px] lg:text-[85px] block mt-2 sm:mt-4 whitespace-nowrap" style={{ fontFamily: "'Playfair Display', serif" }}>$50k–$200k/mo.</span>
          </h1>

          <div className="flex gap-6 mb-8 sm:mb-10 fade-up delay-1">
            <div className="relative hidden md:block shrink-0">
              <div className="w-[2px] h-full bg-gradient-to-b from-orange-500 to-transparent opacity-50" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-orange-500/5 blur-lg rounded-full" />
            </div>
            <p className="text-zinc-400 text-[14px] sm:text-[17px] font-light leading-relaxed max-w-md">
              From product hunting to launch, optimization, and aggressive scaling — we've taken 80+ brands from zero to profitable monthly revenue on Amazon.
            </p>
          </div>

          <div className="flex flex-col items-start gap-6 mb-[43px] fade-up delay-2">
            <div className="flex flex-col sm:flex-row flex-wrap gap-x-5 gap-y-2">
              <span className="flex items-center gap-2 text-zinc-400 text-[12px] font-light"><CheckCircle2 size={12} className="text-orange-500 shrink-0" /> End-to-end Amazon agency</span>
              <span className="flex items-center gap-2 text-zinc-400 text-[12px] font-light"><CheckCircle2 size={12} className="text-orange-500 shrink-0" /> New sellers & existing brands</span>
              <span className="flex items-center gap-2 text-zinc-400 text-[12px] font-light"><CheckCircle2 size={12} className="text-orange-500 shrink-0" /> 80+ brands launched & scaled</span>
            </div>


            {/* Scarcity Signal */}
            <div className="flex items-center gap-2 mb-4 px-1">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <p className="text-[10px] sm:text-[11px] font-bold text-zinc-400 uppercase tracking-[0.1em] sm:tracking-[0.2em]">
                We onboard 3–4 brands/month <span className="mx-1 opacity-30">·</span> Currently accepting applications
              </p>
            </div>

            <button
              onClick={scrollToForm}
              className="group relative inline-flex w-full sm:w-auto items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#FF4E00] to-[#F29F05] px-8 sm:px-12 py-4 sm:py-5 text-white font-black text-[11px] sm:text-[13px] uppercase tracking-[0.25em] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_15px_50px_rgba(255,78,0,0.45)] active:scale-95 whitespace-nowrap"
            >
              {/* Skewed Shimmer Beam */}
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-15deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-15deg)_translateX(100%)]">
                <div className="relative h-full w-12 bg-white/30" />
              </div>

              {/* Button Content */}
              <span className="relative z-10 flex items-center justify-center gap-3">
                Book My Free 15-Min Call
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6 mb-10 fade-up delay-3">
            {[
              { icon: TrendingUp, val: "$12M+", label: "Revenue Generated" },
              { icon: Rocket,     val: "80+",   label: "Brands Launched"   },
              { icon: Shield,     val: "8.2x",  label: "Average ROAS"     },
              { icon: Heart,      val: "100%",  label: "Profit-First Approach" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2.5 transition-transform hover:scale-105 duration-300">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                  <stat.icon size={14} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-white text-base sm:text-lg font-black tracking-tight leading-none mb-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>{stat.val}</p>
                  <p className="text-zinc-500 text-[8px] sm:text-[9px] font-medium uppercase tracking-wider leading-tight">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Partner Badges Strip */}
          <div className="mt-8 fade-up delay-4 mb-3">
            <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.35em] mb-4">Trusted &amp; Verified By</p>
            <div className="grid grid-cols-2 md:flex md:flex-nowrap items-center gap-2 sm:gap-3 lg:overflow-x-visible pb-2 lg:pb-0">
              {/* Amazon Ads Partner */}
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl p-2 sm:px-3 sm:py-2.5 hover:border-orange-500/30 hover:bg-white/[0.06] transition-all duration-300 group/badge h-full w-full">
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF9900] shrink-0" fill="currentColor">
                  <path d="M14.4 14.1c-1.6 1.2-3.9 1.8-5.9 1.8-2.8 0-5.3-1-7.2-2.8-.1-.1 0-.3.2-.2 2 1.2 4.6 1.9 7.1 1.9 1.8 0 3.7-.4 5.4-1.1.3-.1.5.2.4.4z"/>
                  <path d="M15.1 13.3c-.2-.3-1.5-.1-2.1-.1-.2 0-.2-.1-.1-.3.9-.7 2.6-.5 2.8-.3.2.3 0 2-.9 2.8-.1.1-.3.1-.2-.1.2-.6.7-2 .5-2z"/>
                </svg>
                <div className="leading-none flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-zinc-300 tracking-wide group-hover/badge:text-white transition-colors truncate">Amazon Ads</p>
                  <p className="text-[7px] sm:text-[8px] font-black text-orange-500/70 uppercase tracking-wider sm:tracking-[0.15em] group-hover/badge:text-orange-400 transition-colors truncate">Verified Partner</p>
                </div>
              </div>

              {/* Amazon SPN */}
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl p-2 sm:px-3 sm:py-2.5 hover:border-orange-500/30 hover:bg-white/[0.06] transition-all duration-300 group/badge h-full w-full">
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF9900] shrink-0" fill="currentColor">
                  <path d="M14.4 14.1c-1.6 1.2-3.9 1.8-5.9 1.8-2.8 0-5.3-1-7.2-2.8-.1-.1 0-.3.2-.2 2 1.2 4.6 1.9 7.1 1.9 1.8 0 3.7-.4 5.4-1.1.3-.1.5.2.4.4z"/>
                  <path d="M15.1 13.3c-.2-.3-1.5-.1-2.1-.1-.2 0-.2-.1-.1-.3.9-.7 2.6-.5 2.8-.3.2.3 0 2-.9 2.8-.1.1-.3.1-.2-.1.2-.6.7-2 .5-2z"/>
                </svg>
                <div className="leading-none flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-zinc-300 tracking-wide group-hover/badge:text-white transition-colors truncate">Amazon SPN</p>
                  <p className="text-[7px] sm:text-[8px] font-black text-orange-500/70 uppercase tracking-wider sm:tracking-[0.15em] group-hover/badge:text-orange-400 transition-colors truncate">Service Provider</p>
                </div>
              </div>

              {/* Helium 10 */}
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl p-2 sm:px-3 sm:py-2.5 hover:border-blue-500/30 hover:bg-white/[0.06] transition-all duration-300 group/badge h-full w-full">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shrink-0">
                  <span className="text-[6px] sm:text-[8px] font-black text-white leading-none">H10</span>
                </div>
                <div className="leading-none flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-zinc-300 tracking-wide group-hover/badge:text-white transition-colors truncate">Helium 10</p>
                  <p className="text-[7px] sm:text-[8px] font-black text-blue-400/70 uppercase tracking-wider sm:tracking-[0.15em] group-hover/badge:text-blue-400 transition-colors truncate">Certified Partner</p>
                </div>
              </div>

              {/* Clutch */}
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl p-2 sm:px-3 sm:py-2.5 hover:border-emerald-500/30 hover:bg-white/[0.06] transition-all duration-300 group/badge h-full w-full">
                <div className="flex items-center gap-px sm:gap-0.5 shrink-0">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={6} className={`sm:w-2 sm:h-2 ${j < 4 ? "text-amber-400 fill-amber-400" : "text-amber-400/40 fill-amber-400/40"}`} />
                  ))}
                </div>
                <div className="leading-none flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-zinc-300 tracking-wide group-hover/badge:text-white transition-colors truncate">Clutch.co</p>
                  <p className="text-[7px] sm:text-[8px] font-black text-emerald-400/70 uppercase tracking-wider sm:tracking-[0.15em] group-hover/badge:text-emerald-400 transition-colors truncate">4.9 ★ Verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div
        ref={formRef}
        id="lead-form"
        className="relative bg-white flex-none w-full lg:w-[480px] flex flex-col justify-center px-8 md:px-12 py-16 border-l border-zinc-100 shadow-[-40px_0_80px_rgba(0,0,0,0.06)] lg:rounded-l-[32px]"
      >
        <div className="max-w-sm mx-auto w-full fade-up delay-2">
          <div className="mb-8">
            <p className="text-orange-500 font-bold text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3">Only 2 spots remaining for {currentMonth} onboarding</p>
            <h2
              className="text-2xl font-black tracking-tighter text-zinc-900 mb-2 uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Book Your Free<br /><span className="text-orange-500">15-Min</span> Meeting
            </h2>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              Tell us where you are — we'll show you a clear path to grow. No pitch, just strategy.
            </p>
          </div>

          <LeadForm />
        </div>
      </div>
    </section>
  );
}
