"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight, Star, TrendingUp, Rocket, Shield, Heart } from "lucide-react";
import HeroMegaMenu from "./HeroMegaMenu";
import LeadForm from "./LeadForm";

export default function HeroSectionThemeTwo({ scrollToForm, formRef }) {
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
    <>
      <style>{`
        @keyframes subtle-fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-subtle-form {
          animation: subtle-fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.2s;
        }
      `}</style>
      <section className="relative min-h-screen flex flex-col lg:flex-row items-stretch overflow-hidden bg-zinc-950">

        {/* ── Desktop Navbar ── */}
        <header className="hidden lg:flex absolute top-6 left-8 md:left-16 lg:left-20 right-8 md:right-16 lg:right-20 items-center justify-between z-50">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2 group no-underline shrink-0">
            <Image src="/logo.png" alt="Grow Orbit Logo" width={32} height={32} className="object-contain group-hover:scale-110 transition-transform duration-300" />
            <span className="text-lg font-black tracking-tight uppercase flex gap-1.5 transition-colors">
              <span className="text-white">GROW</span>
              <span className="text-[#F1A52B]">ORBIT</span>
            </span>
          </Link>

          {/* Middle: Menu Items */}
          <nav className="flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors no-underline">Home</Link>
            <div className="relative" ref={servicesRef}>
              <button onMouseEnter={() => setServicesOpen(true)} className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors outline-none bg-transparent border-none cursor-pointer">
                Services
                <ChevronDown size={12} className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180 text-orange-500' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-[100]" onMouseLeave={() => setServicesOpen(false)}>
                  <HeroMegaMenu onClose={() => setServicesOpen(false)} />
                </div>
              )}
            </div>
            <Link href="/case-study" className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors no-underline">Case Study</Link>
          </nav>

          {/* Right: Portfolio Button */}
          <div className="flex items-center shrink-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-orange-500 bg-gradient-to-br from-[#FF4E00] to-[#F29F05] px-6 py-2.5 text-white font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_15px_50px_rgba(255,78,0,0.45)] active:scale-95 cursor-pointer outline-none"
            >
              Portfolio
            </button>
          </div>
        </header>

        {/* ── Left — Text Content ── */}
        <div className="relative flex-1 flex flex-col justify-start px-5 md:px-16 lg:px-20 xl:px-28 2xl:px-36 pt-24 sm:pt-24 pb-16 lg:pt-24 lg:pb-20 z-10">
          {/* Subtle texture */}
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />

          <div className="relative z-10 max-w-2xl fade-up lg:mt-2">
            <div className="relative mb-6 sm:mb-12 -ml-[20px] sm:-ml-6 md:-ml-8 lg:-ml-[50px] translate-y-[5px] sm:translate-y-[20px]">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.6)]" />
                <div className="w-8 sm:w-12 h-px bg-orange-500/30" />
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-orange-500 font-mono text-[9px] sm:text-[11px] font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase whitespace-nowrap">01 / System</span>
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-zinc-800 rounded-full" />
                  <span className="text-zinc-500 font-bold text-[9px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] whitespace-nowrap">Growth Partner</span>
                </div>
              </div>
              {/* Vertical Drop Line with Glow — Optimized for Mobile */}
              <div className="absolute left-[4px] sm:left-[5px] top-6 sm:top-7 w-px h-32 sm:h-48 bg-gradient-to-b from-orange-500 via-orange-500/50 to-transparent opacity-40" />
            </div>


            {/* Scarcity Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6 sm:mb-8 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
              <span className="text-[9px] sm:text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em] whitespace-nowrap">
                Currently Accepting 3-4 Brands &middot; Apply Now
              </span>
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
            <div className="fade-up delay-2 mb-10 flex flex-col items-start lg:hidden">
              <button
                onClick={scrollToForm}
                className="group relative inline-flex w-full lg:w-auto items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#FF4E00] via-[#FF7A00] to-[#F29F05] px-6 sm:px-10 py-4 sm:py-[17px] text-white font-black text-[10px] sm:text-[12px] uppercase tracking-[0.15em] sm:tracking-[0.22em] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_15px_50px_rgba(255,78,0,0.45)] active:scale-95"
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 fade-up delay-4">
              <div className="flex flex-row flex-nowrap -space-x-2.5 shrink-0">
                {[
                  "bg-gradient-to-br from-orange-400 to-orange-600",
                  "bg-gradient-to-br from-blue-400 to-blue-600",
                  "bg-gradient-to-br from-emerald-400 to-emerald-600",
                  "bg-gradient-to-br from-purple-400 to-purple-600",
                  "bg-gradient-to-br from-rose-400 to-rose-600",
                ].map((bg, i) => (
                  <div key={i} className={`w-7 h-7 rounded-full ${bg} border-2 border-zinc-950 flex items-center justify-center text-[8px] font-black text-white shrink-0`}>
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

        {/* ── Right — Image + Form Card ── */}
        <div className="relative flex-none w-full lg:w-[42%] xl:w-[38%] 2xl:w-[35%] flex items-start justify-center px-6 pb-6 pt-12 sm:px-8 sm:pb-8 sm:pt-16 lg:px-10 lg:pb-10 lg:pt-[85px] xl:px-12 xl:pb-12 xl:pt-[85px] z-20 overflow-hidden bg-zinc-950">
          {/* Background image with overlay */}
          <div className="absolute inset-0">
            <Image
              src="/newUpload/strategy-meeting.jpg"
              alt="Amazon growth strategy session"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center opacity-[0.55]"
              priority
              fetchPriority="high"
            />
            {/* Dark overlays for high contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/30 to-transparent hidden lg:block" />
            {/* Cool bluish tint overlay on the background */}
            <div className="absolute inset-0 bg-blue-950/4 mix-blend-color pointer-events-none" />
            {/* Extremely subtle ambient bluish/indigo glows that move behind the glass card */}
            <div className="absolute top-[25%] left-[20%] w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)" }} />
            <div className="absolute bottom-[20%] right-[15%] w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.03) 0%, transparent 70%)" }} />
          </div>

          <div
            ref={formRef}
            id="lead-form"
            className="relative z-10 w-full max-w-[440px] border border-white/10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] px-5 py-6 sm:p-8 rounded-3xl animate-subtle-form overflow-hidden backdrop-blur-md"
            style={{
              background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01)), url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.015'/%3E%3C/svg%3E"), rgba(9, 9, 11, 0.4)`
            }}
          >
            <div className="mb-5">
              <p className="text-orange-500 font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.2em] mb-1.5">
                Free Strategy Meeting
              </p>
              <h3
                className="text-lg sm:text-xl font-black tracking-tight text-white uppercase leading-snug"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Tell us about your brand. <span className="text-orange-500">We'll show you exactly how to scale it.</span>
              </h3>
            </div>

            <LeadForm theme="dark" compact={true} />
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent z-20" />
      </section>
    </>
  );
}
