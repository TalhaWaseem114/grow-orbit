"use client";

import Image from "next/image";
import { ArrowRight, Star, TrendingUp, Rocket, Shield, Heart } from "lucide-react";
import LeadForm from "./LeadForm";

const CLIENT_AVATARS = [
  { src: "/assets/marcus-thorne.avif", alt: "Marcus Thorne - Founder, Graffixx" },
  { src: "/assets/elena-martinez.avif", alt: "Elena Martinez - Brand Director, PureForm" },
  { src: "/assets/julian-vane.avif", alt: "Julian Vane - Founder, Kazvoo" },
  { src: "/assets/sarah-jenkins.avif", alt: "Sarah Jenkins - Founder, Dunova" },
];

function ProofStats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-5 sm:mb-9 fade-up delay-3">
      {[
        { icon: TrendingUp, val: "$12M+", label: "Revenue Generated" },
        { icon: Rocket, val: "80+", label: "Brands Launched" },
        { icon: Shield, val: "8.2x", label: "Average ROAS" },
        { icon: Heart, val: "100%", label: "Profit-First Approach" },
      ].map((stat, i) => (
        <div key={i} className="flex items-center gap-2 sm:gap-2.5 transition-transform hover:scale-105 duration-300">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
            <stat.icon size={13} className="text-orange-500" />
          </div>
          <div>
            <p className="text-white text-sm sm:text-lg font-black tracking-tight leading-none mb-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {stat.val}
            </p>
            <p className="text-zinc-500 text-[8px] sm:text-[9px] font-medium uppercase tracking-wider leading-tight">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SocialProof() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 fade-up delay-4">
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
        <p className="text-zinc-500 text-[10px] sm:text-[11px] font-medium">
          Trusted by <span className="text-white font-bold">80+ Amazon brands</span> to scale profitably.
        </p>
      </div>
    </div>
  );
}

export default function HeroSectionThemeTwo({ scrollToForm, formRef, scrolled = false }) {
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
          animation-delay: 0.15s;
        }
      `}</style>
      <section className="relative min-h-screen flex flex-col lg:flex-row items-stretch overflow-hidden bg-zinc-950">

        {/* ── Top Subtle Dark Gradient ── */}
        <div
          className="absolute top-0 inset-x-0 h-36 sm:h-48 md:h-56 pointer-events-none z-10 bg-gradient-to-b from-black/80 via-black/35 to-transparent"
          aria-hidden="true"
        />

        {/* ── Left — Text Content ── */}
        <div className="relative flex-1 flex flex-col justify-start 2xl:justify-center px-4 sm:px-8 md:px-16 lg:px-20 xl:px-28 2xl:px-36 pt-[66px] sm:pt-20 pb-2 lg:pt-28 lg:pb-12 2xl:pt-32 2xl:pb-16 z-10">
          {/* Subtle low-density texture */}
          <div
            className="absolute inset-0 opacity-[0.16] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage: "radial-gradient(ellipse 95% 85% at 35% 45%, black 40%, transparent 95%)",
              WebkitMaskImage: "radial-gradient(ellipse 95% 85% at 35% 45%, black 40%, transparent 95%)",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />

          <div className="relative z-10 max-w-2xl fade-up lg:mt-2">
            {/* Desktop-only System tag */}
            <div className="hidden lg:block relative mb-5 sm:mb-7 -ml-[15px] sm:-ml-6 md:-ml-8 lg:-ml-[50px] translate-y-[3px] sm:translate-y-[10px]">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.6)]" />
                <div className="w-8 sm:w-12 h-px bg-orange-500/30" />
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-orange-500 font-mono text-[9px] sm:text-[11px] font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase whitespace-nowrap">01 / System</span>
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-zinc-800 rounded-full" />
                  <span className="text-zinc-500 font-bold text-[9px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] whitespace-nowrap">Growth Partner</span>
                </div>
              </div>
              <div className="absolute left-[4px] sm:left-[5px] top-6 sm:top-7 w-px h-16 sm:h-20 bg-gradient-to-b from-orange-500 via-orange-500/50 to-transparent opacity-40" />
            </div>

            {/* Desktop Scarcity Pill */}
            <div className="hidden lg:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-5 sm:mb-7 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
              <span className="text-[9px] sm:text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em] whitespace-nowrap">
                Currently Accepting 3-4 Brands &middot; 2 Spots Left
              </span>
            </div>

            {/* Main Heading — Optimized for Instant Mobile Readability */}
            <h1
              className="text-white mb-1.5 sm:mb-3 lg:mb-7 uppercase text-[26px] sm:text-[42px] md:text-[56px] lg:text-[74px] font-black tracking-tighter leading-[1.0] lg:leading-[0.9]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Turn Amazon<br className="hidden sm:inline" />{" "}
              Into Your<br className="hidden sm:inline" />{" "}
              <span className="bg-gradient-to-b from-[#FF7A00] to-[#FF5C00] bg-clip-text text-transparent">Growth Engine.</span>
            </h1>

            {/* Subtitle */}
            <div className="flex gap-4 sm:gap-6 mb-2.5 sm:mb-5 lg:mb-8 fade-up delay-1">
              <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50 shrink-0" />
              <p className="text-zinc-400 text-xs sm:text-base lg:text-[17px] font-light leading-relaxed max-w-xl">
                We build, launch, and scale Amazon brands to{" "}
                <span className="text-white font-semibold">$25K&ndash;$100K+/month</span> in sustainable revenue with a proven, profit-first system.
              </p>
            </div>

            {/* Desktop-only Proof Section (Rendered on left on desktop) */}
            <div className="hidden lg:block">
              <ProofStats />
              <SocialProof />
            </div>
          </div>
        </div>

        {/* ── Right — White Form Card Container (Positioned ABOVE THE FOLD on Mobile) ── */}
        <div className="relative flex-none w-full lg:w-[44%] xl:w-[40%] 2xl:w-[38%] flex flex-col items-center justify-start 2xl:justify-center px-4 pb-6 pt-1 sm:px-8 sm:pb-10 sm:pt-6 lg:px-8 lg:pb-10 lg:pt-[90px] xl:px-12 xl:pb-10 xl:pt-[92px] 2xl:pt-[84px] z-20 overflow-visible bg-transparent">
          {/* Subtle warm ambient glow behind the card */}
          <div className="absolute top-[20%] right-[10%] w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)" }} />
          <div className="absolute bottom-[20%] left-[10%] w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,122,0,0.04) 0%, transparent 70%)" }} />

          {/* White Form Card */}
          <div
            ref={formRef}
            id="lead-form"
            className="relative z-10 w-full max-w-[460px] bg-white rounded-[24px] sm:rounded-[32px] px-4.5 py-4 sm:px-7 sm:py-5.5 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7),0_0_50px_rgba(255,255,255,0.05)] border border-white/40 animate-subtle-form scroll-mt-20 sm:scroll-mt-24"
          >
            {/* Official Amazon Smile Logo Arrow pointing towards the form */}
            <div className="hidden lg:block absolute -left-28 xl:-left-34 top-[165px] xl:top-[172px] w-32 xl:w-36 h-auto pointer-events-none z-30 select-none filter drop-shadow-[0_2px_10px_rgba(255,153,0,0.4)]">
              <svg
                viewBox="80 105 325 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto overflow-visible"
              >
                <path
                  d="m 374.00642,142.18404 c -34.99948,25.79739 -85.72909,39.56123 -129.40634,39.56123 -61.24255,0 -116.37656,-22.65135 -158.08757,-60.32496 -3.2771,-2.96252 -0.34083,-6.9999 3.59171,-4.69283 45.01431,26.19064 100.67269,41.94697 158.16623,41.94697 38.774689,0 81.4295,-8.02237 120.6499,-24.67006 5.92501,-2.51683 10.87999,3.88009 5.08607,8.17965"
                  fill="#FF9900"
                />
                <path
                  d="m 388.55678,125.53635 c -4.45688,-5.71527 -29.57261,-2.70033 -40.84585,-1.36327 -3.43442,0.41947 -3.95874,-2.56925 -0.86517,-4.71905 20.00346,-14.07844 52.82696,-10.01483 56.65462,-5.2958 3.82764,4.74526 -0.99624,37.64741 -19.79373,53.35128 -2.88385,2.41195 -5.63662,1.12734 -4.35198,-2.07113 4.2209,-10.53917 13.68519,-34.16054 9.20211,-39.90203"
                  fill="#FF9900"
                />
              </svg>
            </div>

            {/* Header */}
            <div className="mb-2.5 sm:mb-3.5">
              <div className="inline-flex items-center gap-1.5 bg-[#ffedd5] text-[#ea580c] px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider mb-1.5 sm:mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] animate-pulse" />
                <span>FREE STRATEGY CALL &middot; 2 SPOTS LEFT</span>
              </div>
              <h2
                className="text-[17px] sm:text-[22px] font-black tracking-tight leading-[1.18] uppercase"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span className="text-zinc-950 block">TELL US ABOUT YOUR BRAND.</span>
                <span className="text-[#ff5c00] block mt-0.5">WE'LL SHOW YOU EXACTLY HOW TO SCALE IT.</span>
              </h2>
            </div>

            <LeadForm theme="white" compact={true} />
          </div>

          {/* ── Mobile-Only Proof Section (Positioned Directly Below Form) ── */}
          <div className="lg:hidden w-full max-w-[460px] mt-6 px-1">
            <ProofStats />
            <SocialProof />
          </div>
        </div>

        {/* ── Floating Sticky CTA for Mobile Scrollers ── */}
        <div
          className={`lg:hidden fixed bottom-4 inset-x-4 z-50 transition-all duration-300 transform ${
            scrolled ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"
          }`}
        >
          <button
            type="button"
            onClick={scrollToForm}
            className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF4E00] via-[#FF7A00] to-[#F29F05] text-white font-black text-xs uppercase tracking-wider shadow-[0_12px_35px_rgba(255,92,0,0.55)] border border-white/20 active:scale-95 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Claim Free Strategy Call
            </span>
            <ArrowRight size={15} className="stroke-[2.5]" />
          </button>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent z-20" />
      </section>
    </>
  );
}
