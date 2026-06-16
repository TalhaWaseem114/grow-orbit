"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight, Star, TrendingUp, Rocket, Shield, Heart, X, Play } from "lucide-react";
import HeroMegaMenu from "../HeroMegaMenu";

export default function HeroSectionThemeTwo({ scrollToForm }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (videoOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [videoOpen]);

  return (
    <>
      <section className="relative min-h-screen flex flex-col lg:flex-row items-stretch overflow-hidden bg-zinc-950">

        {/* ── Left — Text Content ── */}
        <div className="relative flex-1 flex flex-col justify-center px-5 md:px-16 lg:px-20 pt-24 sm:pt-28 pb-16 lg:py-0 z-10">
          {/* Subtle texture */}
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />

          {/* ── Desktop Navbar ── */}
          <header className="hidden lg:flex absolute top-6 left-8 md:left-16 lg:left-20 right-8 md:right-16 lg:right-20 items-center justify-between z-50">
            <Link href="/" className="flex items-center gap-2 group no-underline">
              <Image src="/logo.png" alt="Grow Orbit Logo" width={32} height={32} className="object-contain group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg font-black tracking-tight uppercase flex gap-1.5 transition-colors">
                <span className="text-white">GROW</span>
                <span className="text-[#F1A52B]">ORBIT</span>
              </span>
            </Link>
            <nav className="flex items-center gap-6 ml-auto">
              <Link href="/" className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors no-underline">Home</Link>
              <Link href="/portfolio" className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors no-underline">Portfolio</Link>
              <Link href="/case-study" className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors no-underline">Case Study</Link>
              <div className="relative" ref={servicesRef}>
                <button onMouseEnter={() => setServicesOpen(true)} className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors outline-none">
                  Services
                  <ChevronDown size={12} className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180 text-orange-500' : ''}`} />
                </button>
                {servicesOpen && (
                  <div className="absolute top-full right-[-350px] mt-4 z-100" onMouseLeave={() => setServicesOpen(false)}>
                    <HeroMegaMenu onClose={() => setServicesOpen(false)} />
                  </div>
                )}
              </div>
            </nav>
          </header>

          <div className="relative z-10 max-w-2xl fade-up lg:mt-10">
            <div className="relative mb-6 sm:mb-12 -ml-[20px] sm:-ml-6 md:-ml-8 lg:-ml-[50px] -translate-y-[10px] sm:translate-y-[5px]">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.6)] animate-pulse" />
                <div className="w-8 sm:w-12 h-px bg-orange-500/30" />
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-orange-500 font-mono text-[9px] sm:text-[11px] font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase whitespace-nowrap">01 / System</span>
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-zinc-800 rounded-full" />
                  <span className="text-zinc-500 font-bold text-[9px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] whitespace-nowrap">Growth Partner</span>
                </div>
              </div>
              {/* Vertical Drop Line with Glow — Optimized for Mobile */}
              <div className="absolute left-[4px] sm:left-[5px] top-6 sm:top-7 w-px h-32 sm:h-48 bg-gradient-to-b from-orange-500 via-orange-500/50 to-transparent opacity-40">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-orange-500/20 blur-xl rounded-full" />
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

            {/* Main Heading */}
            <h1
              className="text-white mb-6 sm:mb-8 uppercase text-[40px] sm:text-6xl md:text-[68px] lg:text-[72px] font-black tracking-tighter leading-[0.95] sm:leading-[0.9]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Turn Amazon<br />
              Into Your<br />
              <span className="bg-gradient-to-b from-[#FF7A00] to-[#FF5C00] bg-clip-text text-transparent">Growth Engine.</span>
            </h1>

            {/* Subtitle */}
            <div className="flex gap-6 mb-8 sm:mb-10 fade-up delay-1">
              <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50 shrink-0" />
              <p className="text-zinc-400 text-[14px] sm:text-[17px] font-light leading-relaxed max-w-xl">
                We build, launch, and scale Amazon brands from $0
                to <span className="text-white font-semibold">$50K–$200K+/month</span> with a proven, profit-first system.
              </p>
            </div>

            {/* CTA Button */}
            <div className="fade-up delay-2 mb-10 flex flex-col items-start">
              {/* Scarcity Signal */}
              <div className="flex items-center gap-2 mb-4 px-1">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <p className="text-[10px] sm:text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                  Currently accepting 3-4 brands <span className="mx-1 opacity-30">·</span> Apply Now
                </p>
              </div>
              <button
                onClick={scrollToForm}
                className="group relative inline-flex w-full lg:w-auto items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#FF4E00] to-[#F29F05] px-6 sm:px-10 py-4 sm:py-[17px] text-white font-black text-[10px] sm:text-[12px] uppercase tracking-[0.15em] sm:tracking-[0.22em] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_15px_50px_rgba(255,78,0,0.45)] active:scale-95"
              >
                {/* Skewed Shimmer Beam */}
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-15deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-15deg)_translateX(100%)]">
                  <div className="relative h-full w-12 bg-white/30" />
                </div>

                {/* Button Content */}
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Book Your Free Strategy Call
                  <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </button>
            </div>

            {/* Stats Row */}
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

            {/* Social Proof Strip */}
            <div className="flex items-center gap-4 fade-up delay-4">
              <div className="flex -space-x-2.5">
                {[
                  "bg-gradient-to-br from-orange-400 to-orange-600",
                  "bg-gradient-to-br from-blue-400 to-blue-600",
                  "bg-gradient-to-br from-emerald-400 to-emerald-600",
                  "bg-gradient-to-br from-purple-400 to-purple-600",
                  "bg-gradient-to-br from-rose-400 to-rose-600",
                ].map((bg, i) => (
                  <div key={i} className={`w-7 h-7 rounded-full ${bg} border-2 border-zinc-950 flex items-center justify-center text-[8px] font-black text-white`}>
                    {["S", "A", "M", "R", "K"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-zinc-500 text-[10px] font-medium">
                  Trusted by <span className="text-white font-bold">80+ Amazon brands</span> to scale profitably.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right — Image + Play Button ── */}
        <div className="relative flex-none w-full lg:w-[42%] xl:w-[45%] min-h-[400px] lg:min-h-0 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
              alt="Amazon growth strategy session"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Overlay gradients */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/30 to-transparent z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-transparent to-transparent z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent z-[1]" />



          {/* Play Button — Center */}
          <button
            onClick={() => setVideoOpen(true)}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center group cursor-pointer"
          >
            <div className="relative">
              {/* Pulse rings */}
              <div className="absolute inset-0 w-24 h-24 rounded-full border border-white/20 animate-ping" style={{ animationDuration: "3s" }} />
              <div className="absolute -inset-4 w-32 h-32 rounded-full border border-white/10 animate-ping" style={{ animationDuration: "4s", animationDelay: "0.5s" }} />

              {/* Button itself */}
              <div className="relative w-24 h-24 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/25 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500 shadow-2xl">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.3)] group-hover:shadow-[0_12px_40px_rgba(249,115,22,0.3)] transition-shadow duration-500">
                  <Play size={24} className="text-orange-500 fill-orange-500 ml-1" />
                </div>
              </div>
            </div>
            <p className="mt-6 text-white font-bold uppercase tracking-[0.3em] text-[10px] drop-shadow-lg">Watch The Breakdown</p>
          </button>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent z-20" />
      </section>

      {/* ── Video Modal ── */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          onClick={() => setVideoOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" style={{ animation: "fadeIn 0.3s ease" }} />

          {/* Modal content */}
          <div
            className="relative z-10 w-[90vw] max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "scaleIn 0.35s ease" }}
          >
            {/* Close button */}
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
            >
              <X size={18} />
            </button>

            {/* Video player */}
            <video
              autoPlay
              controls
              playsInline
              className="w-full h-full object-cover bg-black"
            >
              {/* Replace this with your actual video URL */}
              <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Modal animations */}
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes scaleIn {
              from { opacity: 0; transform: scale(0.9); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
