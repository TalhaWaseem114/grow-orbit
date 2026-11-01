"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight, Star, TrendingUp, Rocket, Shield, Heart } from "lucide-react";
import HeroMegaMenu from "./HeroMegaMenu";
import LeadForm from "./LeadForm";

const CLIENT_AVATARS = [
  { src: "/assets/marcus-thorne.avif", alt: "Marcus Thorne - Founder, Graffixx" },
  { src: "/assets/elena-martinez.avif", alt: "Elena Martinez - Brand Director, PureForm" },
  { src: "/assets/julian-vane.avif", alt: "Julian Vane - Founder, Kazvoo" },
  { src: "/assets/sarah-jenkins.avif", alt: "Sarah Jenkins - Founder, Dunova" },
];

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

        {/* ── Top Subtle Dark Gradient (smoothly mixes down) ── */}
        <div
          className="absolute top-0 inset-x-0 h-36 sm:h-48 md:h-56 pointer-events-none z-10 bg-gradient-to-b from-black/80 via-black/35 to-transparent"
          aria-hidden="true"
        />

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
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-orange-400/40 bg-gradient-to-r from-[#FF5C00] via-[#FF7A00] to-[#FFA726] px-6 py-2.5 text-white font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.03] hover:brightness-110 hover:shadow-[0_15px_50px_rgba(255,92,0,0.45)] active:scale-95 cursor-pointer outline-none"
            >
              Portfolio
            </button>
          </div>
        </header>

        {/* ── Left — Text Content ── */}
        <div className="relative flex-1 flex flex-col justify-start px-5 md:px-16 lg:px-20 xl:px-28 2xl:px-36 pt-20 sm:pt-20 pb-10 lg:pt-20 lg:pb-12 z-10">
          {/* Subtle low-density texture */}
          <div
            className="absolute inset-0 opacity-[0.16] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage: "radial-gradient(ellipse 95% 85% at 35% 45%, black 40%, transparent 95%)",
              WebkitMaskImage: "radial-gradient(ellipse 95% 85% at 35% 45%, black 40%, transparent 95%)"
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />

          <div className="relative z-10 max-w-2xl fade-up lg:mt-2">
            <div className="relative mb-5 sm:mb-7 -ml-[15px] sm:-ml-6 md:-ml-8 lg:-ml-[50px] translate-y-[3px] sm:translate-y-[10px]">
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
              <div className="absolute left-[4px] sm:left-[5px] top-6 sm:top-7 w-px h-16 sm:h-20 bg-gradient-to-b from-orange-500 via-orange-500/50 to-transparent opacity-40" />
            </div>


            {/* Scarcity Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-5 sm:mb-7 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
              <span className="text-[9px] sm:text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em] whitespace-nowrap">
                Currently Accepting 3-4 Brands &middot; 2 Spots Left
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className="text-white mb-5 sm:mb-7 uppercase text-[42px] sm:text-[62px] md:text-[70px] lg:text-[74px] font-black tracking-tighter leading-[0.95] sm:leading-[0.9]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Turn Amazon<br />
              Into Your<br />
              <span className="bg-gradient-to-b from-[#FF7A00] to-[#FF5C00] bg-clip-text text-transparent">Growth Engine.</span>
            </h1>

            {/* Subtitle */}
            <div className="flex gap-6 mb-7 sm:mb-8 fade-up delay-1">
              <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50 shrink-0" />
              <p className="text-zinc-400 text-[14px] sm:text-[17px] font-light leading-relaxed max-w-xl">
                We build, launch, and scale Amazon brands from $0
                to <span className="text-white font-semibold">$50K-$200K+/month</span> with a proven, profit-first system.
              </p>
            </div>

            {/* CTA Button */}
            <div className="fade-up delay-2 mb-10 flex flex-col items-start lg:hidden">
              <button
                onClick={scrollToForm}
                className="group relative inline-flex w-full lg:w-auto items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-[#FF4E00] via-[#FF7A00] to-[#F29F05] px-6 sm:px-10 py-4.5 sm:py-5 text-white font-black text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.18em] transition-all duration-500 hover:scale-[1.02] shadow-[0_10px_30px_rgba(255,78,0,0.35)] hover:shadow-[0_15px_50px_rgba(255,78,0,0.5)] active:scale-95 border border-white/10"
              >
                {/* Skewed Shimmer Beam */}
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-15deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-15deg)_translateX(100%)]">
                  <div className="relative h-full w-12 bg-white/30" />
                </div>

                {/* Button Content */}
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Book Your Free Strategy Call
                  <ArrowRight size={17} className="group-hover:translate-x-1.5 transition-transform duration-300" strokeWidth={2.5} />
                </span>
              </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 mb-7 sm:mb-9 fade-up delay-3">
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
              <div className="flex flex-row flex-nowrap -space-x-2 sm:-space-x-2.5 shrink-0 items-center">
                {CLIENT_AVATARS.map((avatar, i) => (
                  <div
                    key={i}
                    className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 border-zinc-950 shrink-0 bg-zinc-800 shadow-sm"
                  >
                    <Image
                      src={avatar.src}
                      alt={avatar.alt}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
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

        {/* ── Right — White Form Card Container ── */}
        <div className="relative flex-none w-full lg:w-[44%] xl:w-[40%] 2xl:w-[38%] flex items-start justify-center px-5 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-10 lg:px-8 lg:pb-10 lg:pt-[70px] xl:px-12 xl:pb-10 xl:pt-[72px] z-20 overflow-visible bg-transparent">
          {/* Subtle warm ambient glow behind the card */}
          <div className="absolute top-[20%] right-[10%] w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)" }} />
          <div className="absolute bottom-[20%] left-[10%] w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,122,0,0.04) 0%, transparent 70%)" }} />

          {/* Hand-drawn style orange swooping arrow pointing to the form */}
          <div className="hidden lg:block absolute -left-10 xl:-left-16 top-10 sm:top-12 w-24 sm:w-28 h-24 sm:h-28 pointer-events-none z-30 text-orange-500 opacity-90">
            <svg viewBox="0 0 120 120" fill="none" className="w-full h-full overflow-visible">
              <path
                d="M10 95 C 30 85, 65 60, 95 32"
                stroke="#FF7A00"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M78 32 L 96 30 L 95 48"
                stroke="#FF7A00"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>

          {/* White Form Card */}
          <div
            ref={formRef}
            id="lead-form"
            className="relative z-10 w-full max-w-[460px] bg-white rounded-[28px] sm:rounded-[32px] px-5 py-5 sm:px-7 sm:py-5.5 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7),0_0_50px_rgba(255,255,255,0.05)] border border-white/40 animate-subtle-form"
          >
            {/* Header */}
            <div className="mb-3 sm:mb-3.5">
              <div className="inline-flex items-center bg-[#ffedd5] text-[#ea580c] px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2.5">
                FREE STRATEGY MEETING
              </div>
              <h2
                className="text-[19px] sm:text-[22px] font-black tracking-tight leading-[1.18] uppercase"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span className="text-zinc-950 block">TELL US ABOUT YOUR BRAND.</span>
                <span className="text-[#ff5c00] block mt-0.5">WE'LL SHOW YOU EXACTLY HOW TO SCALE IT.</span>
              </h2>
            </div>

            <LeadForm theme="white" compact={true} />
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent z-20" />
      </section>
    </>
  );
}
