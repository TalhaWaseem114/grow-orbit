"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, Activity, Users,
  ChevronRight, Zap, TrendingUp, Star, Box, Search,
  Rocket, Shield, Heart
} from "lucide-react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: isMobile ? 0.8 : 1.2 } });

      // 1. Initial State
      gsap.set(".progress-bar-fill", { width: 0 });
      gsap.set(".target-bar-fill", { width: 0 });
      gsap.set(".target-node-fill", { left: "0%" });

      // 2. Left side staggered entrance
      tl.from(".animate-content > *", {
        y: isMobile ? 20 : 40,
        opacity: 0,
        stagger: 0.1,
        clearProps: "transform,opacity"
      }, "+=0.2");

      // 3. Right side - Fast & dynamic Entrance
      tl.from(engineRef.current, {
        y: 30,
        opacity: 0,
        duration: isMobile ? 0.8 : 1.0,
        ease: "power3.out",
        clearProps: "transform,opacity"
      }, "-=1.2");

      // 4. Target Line Animation (Bar & Node in Sync)
      tl.to(".target-bar-fill", {
        width: "85%",
        duration: isMobile ? 1.0 : 1.2,
        ease: "expo.out"
      }, "-=1.0");
      tl.to(".target-node-fill", {
        left: "85%",
        duration: isMobile ? 1.0 : 1.2,
        ease: "expo.out"
      }, "<");

      if (!isMobile) {
        // 5. Service Bars filling animation
        tl.to(".progress-bar-fill", {
          width: (i, target) => target.dataset.width || "0%",
          duration: 1.2,
          stagger: 0.1,
          ease: "expo.out"
        }, "-=1.0");

        // 6. Mini Stats (Bottom)
        tl.from(".animate-stats > *", {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          clearProps: "transform,opacity"
        }, "-=1.8");

        // 7. Continuous Floating Motion
        gsap.to(engineRef.current, {
          y: -15,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
      } else {
         // Simpler mobile animations
         gsap.set(".progress-bar-fill", { width: (i, target) => target.dataset.width || "0%" });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-zinc-950"
    >
      <style>{`
        @keyframes scan-mgmt {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; } 90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes shimmer-btn {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Atmospheric Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.04] to-transparent animate-[scan-mgmt_9s_linear_infinite]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="mgmt-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#fff" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#mgmt-grid)" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(249,115,22,0.12),transparent_55%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* LEFT: FULL BUSINESS CONTENT */}
          <div className="lg:col-span-7 animate-content text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
              <div className="w-6 h-[1px] bg-orange-500/50" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">Full Amazon Management</span>
            </div>

            <h1
              className="text-[44px] xs:text-[54px] sm:text-[68px] md:text-[76px] lg:text-[90px] font-black tracking-tighter leading-[0.9] mb-6 md:mb-8 text-white uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Scale your<br />
              <span className="text-orange-500">Revenue.</span><br />
              <span
                className="italic font-light lowercase tracking-tight text-zinc-500"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                zero guesswork.
              </span>
            </h1>

            <div className="flex flex-col lg:flex-row gap-6 mb-10 items-center lg:items-start">
              <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden lg:block opacity-50 shrink-0" />
              <div>
                <p className="text-lg sm:text-xl text-zinc-400 font-light leading-relaxed max-w-xl mb-6 mx-auto lg:mx-0">
                  We run your entire Amazon operation — ads, SEO, listings, and core creative —
                  so you can focus on building your brand instead of managing it.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 font-mono text-[9px] text-zinc-600 uppercase tracking-widest">
                   <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                     <span>Infrastructure_Live</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <Activity size={10} className="text-orange-500/50" />
                     <span>Weekly Strategy Reviews</span>
                   </div>
                </div>
              </div>
            </div>


            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 px-1">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <p className="text-[9px] sm:text-[11px] font-bold text-zinc-400 uppercase tracking-[0.1em] sm:tracking-[0.2em]">
                Currently Accepting 3-4 Brands <span className="mx-1 opacity-30">··</span> Apply Now
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 sm:gap-6 mb-10">
              <Link
                href="/get-started"
                prefetch={false}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#FF4E00] to-[#F29F05] px-8 sm:px-12 py-4 sm:py-5 text-white font-black text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.25em] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_15px_50px_rgba(255,78,0,0.45)] active:scale-95 whitespace-nowrap no-underline focus-visible:ring-4 focus-visible:ring-orange-500/50 outline-none"
              >
                {/* Skewed Shimmer Beam */}
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-15deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-15deg)_translateX(100%)]">
                  <div className="relative h-full w-12 bg-white/30" />
                </div>

                {/* Button Content */}
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Book Free Strategy Call
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" aria-hidden="true" />
                </span>
              </Link>
              <a
                href="#services-grid"
                className="group flex items-center justify-center gap-3 text-zinc-500 hover:text-white font-bold text-[11px] uppercase tracking-widest px-2 py-4 transition-colors no-underline focus-visible:text-white outline-none"
              >
                View Services <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </a>
            </div>

            {/* Trusted & Verified Section - Recreated from Reference */}
            <div className="mb-6 -mt-[20px] flex flex-col items-center lg:items-start">
              <div className="flex items-center gap-3 mb-4 w-full lg:w-auto">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600 whitespace-nowrap">Trusted & Verified By</span>
                <div className="h-px bg-white/5 flex-1" />
              </div>

              <div className="grid grid-cols-2 lg:flex lg:flex-nowrap justify-center lg:justify-start gap-2 w-full lg:w-auto px-1 sm:px-0">
                {[
                  {
                    title: "Amazon Ads",
                    sub: "VERIFIED PARTNER",
                    logo: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange-500 sm:w-5 sm:h-5">
                        <path d="M17.5 13.5C14.5 16.5 9.5 16.5 6.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M17.5 13.5L16 12.5M17.5 13.5L19 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    ),
                    subColor: "text-orange-600"
                  },
                  {
                    title: "Amazon SPN",
                    sub: "SERVICE PROVIDER",
                    logo: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange-500 sm:w-5 sm:h-5">
                        <path d="M17.5 13.5C14.5 16.5 9.5 16.5 6.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M17.5 13.5L16 12.5M17.5 13.5L19 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    ),
                    subColor: "text-orange-600"
                  },
                  {
                    title: "Helium 10",
                    sub: "CERTIFIED PARTNER",
                    logo: (
                      <div className="w-4 h-4 sm:w-6 sm:h-6 rounded bg-[#00AEEF] flex items-center justify-center text-[6px] sm:text-[8px] font-black text-white">H10</div>
                    ),
                    subColor: "text-[#00AEEF]"
                  },
                  {
                    title: "Clutch.co",
                    sub: "4.9 ★ VERIFIED",
                    logo: (
                      <div className="flex gap-[1px] sm:gap-0.5" aria-hidden="true">
                        {[1, 2, 3].map(s => <Star key={s} size={6} className="text-orange-400 fill-orange-400 sm:w-[8px] sm:h-[8px]" />)}
                        <Star size={6} className="text-zinc-700 fill-zinc-700 sm:w-[8px] sm:h-[8px]" />
                      </div>
                    ),
                    subColor: "text-emerald-500"
                  }
                ].map((b, i) => (
                  <div
                    key={i}
                    className="relative group flex items-center gap-1.5 sm:gap-3 bg-[#0a0a0a] border border-white/10 rounded-xl sm:rounded-2xl px-2.5 sm:px-3.5 py-2 sm:py-2.5 transition-all hover:border-white/20 w-full lg:w-auto"
                  >
                    {/* Subtle Internal Grid Pattern */}
                    <div className="absolute inset-0 opacity-[0.1] pointer-events-none rounded-xl sm:rounded-2xl overflow-hidden"
                         style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '8px 8px' }} />

                    <div className="relative z-10 shrink-0 flex items-center justify-center">
                      {b.logo}
                    </div>

                    <div className="relative z-10 flex flex-col flex-1 min-w-0">
                      <span className="text-white text-[10px] sm:text-[12px] font-bold tracking-tight leading-none mb-0.5 sm:mb-1 truncate">
                        {b.title}
                      </span>
                      <span className={`${b.subColor} text-[7px] sm:text-[8px] font-black uppercase tracking-wider truncate`}>
                        {b.sub}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: THE ORBIT VELOCITY ENGINE */}
          <div className="lg:col-span-5 relative group mt-10 lg:mt-[40px] scale-100 sm:scale-100 origin-top lg:origin-center" ref={engineRef}>

  {/* Outer Floating Accent (Top-Left) */}
  <div className="absolute -top-4 -left-4 lg:-top-10 lg:-left-10 w-24 h-24 border-t-2 border-l-2 border-orange-500/20 rounded-tl-[40px] pointer-events-none" />

  {/* Hyper-realistic Glow Background */}
  <div className="absolute -inset-10 bg-orange-600/10 blur-[120px] rounded-full opacity-50" />

  <div className="relative bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[45px] p-2 shadow-2xl overflow-hidden group/shell">
    {/* High-end Gloss Refraction */}
    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 opacity-40" />

    <div className="bg-[#050505]/80 backdrop-blur-2xl rounded-[38px] p-8 border border-white/5 relative overflow-hidden">

      {/* Top Console Bar */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500/20" />
          </div>
          <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-[0.3em]">Live_Feed_Active</span>
        </div>
        <div className="px-3 py-1 bg-emerald-500/5 border border-emerald-500/20 rounded-full flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-500 text-[8px] font-black uppercase tracking-tighter">Sync: 9ms</span>
        </div>
      </div>

      {/* Mini Metrics Row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "Revenue", val: "$127K", change: "+23%", up: true },
          { label: "ACoS", val: "18.4%", change: "-12%", up: false },
          { label: "Sessions", val: "34.2K", change: "+8%", up: true },
        ].map((m, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl px-2 py-2 text-center">
            <p className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest mb-1">{m.label}</p>
            <p className="text-lg font-black text-white tracking-tighter leading-none mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{m.val}</p>
            <p className={`text-[8px] font-bold ${m.up ? "text-emerald-400" : "text-emerald-400"}`}>
              {m.change} <span className="text-zinc-600">30d</span>
            </p>
          </div>
        ))}
      </div>

      {/* SYMBOLIC GROWTH CHART */}
      <div className="relative h-32 w-full mb-6 bg-zinc-900/20 rounded-3xl border border-white/5 overflow-hidden group/chart">
        <div className="absolute inset-0 opacity-[0.15]"
             style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path
            d="M 0 90 L 50 82 L 100 88 L 150 50 L 200 62 L 250 25 L 320 38 L 400 8 L 400 100 L 0 100 Z"
            fill="url(#areaGrad)"
            opacity="0.15"
          />
          <path
            d="M 0 90 L 50 82 L 100 88 L 150 50 L 200 62 L 250 25 L 320 38 L 400 8"
            fill="none"
            stroke="#f97316"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-[dash_4s_linear_infinite]"
            style={{
              strokeDasharray: '1000',
              strokeDashoffset: '1000',
              filter: 'drop-shadow(0 0 8px rgba(249,115,22,0.6))'
            }}
          />
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute top-5 left-6">
          <div className="text-[10px] font-mono text-zinc-600 uppercase mb-1">Scaling_Factor</div>
          <div className="text-2xl font-black text-white italic">AGGRESSIVE</div>
        </div>

        <div className="absolute bottom-3 right-6 flex items-center gap-2">
          <TrendingUp size={12} className="text-orange-500" />
          <span className="text-white font-mono text-[10px] font-bold tracking-tighter">Velocity Optimized</span>
        </div>
      </div>

      {/* TARGET LINE GIMMICK (Restored per request) */}
      <div className="mb-6 relative px-1">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Revenue Baseline Target</span>
          <span className="text-[9px] font-black text-white uppercase tracking-tighter bg-white/10 px-2 py-0.5 rounded">124% to Goal</span>
        </div>
        <div className="relative w-full h-1.5 bg-black/50 rounded-full border border-white/5">
          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-700 via-orange-500 to-yellow-400 rounded-full shadow-[0_0_12px_rgba(249,115,22,0.6)] target-bar-fill" />
          {/* Node positioned exactly at the end of the 85% width */}
          <div className="absolute top-1/2 -translate-y-1/2 left-[85%] -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white] animate-pulse border-2 border-orange-500 z-10 target-node-fill" />
        </div>
      </div>

      {/* COMPACT SERVICE MATRIX */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {[
          { name: "SEO", status: "Ranking High", icon: <Search size={10} />, progress: "90%", gradient: "from-emerald-500 to-emerald-400", colSpan: 1 },
          { name: "PPC", status: "8.4x ROAS", icon: <Zap size={10} />, progress: "75%", gradient: "from-orange-500 to-orange-400", colSpan: 1 },
          { name: "Inventory Log", status: "In-Stock", icon: <Box size={10} />, progress: "100%", gradient: "from-blue-500 to-blue-400", colSpan: 2 }
        ].map((service, i) => (
          <div key={i} className={`flex flex-col px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-300 ${service.colSpan === 2 ? 'col-span-2' : 'col-span-1'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 shrink-0">
                  {service.icon}
                </div>
                <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-wide truncate">{service.name}</span>
              </div>
              <div className="text-[7px] font-mono font-bold text-zinc-400 bg-black/40 px-1.5 py-0.5 rounded border border-white/5 shrink-0 ml-1">
                {service.status}
              </div>
            </div>
            <div className="w-full h-[2px] bg-zinc-900/80 rounded-full overflow-hidden relative mt-auto">
              <div
                className={`absolute top-0 left-0 h-full bg-gradient-to-r ${service.gradient} progress-bar-fill`}
                data-width={service.progress}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Account Health Ticker */}
      <div className="flex items-center justify-between px-3 py-2 bg-white/[0.02] border border-white/5 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Account Health</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-black text-emerald-400 uppercase tracking-tight">Excellent</span>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(b => (
              <div key={b} className={`w-1 h-3 rounded-sm ${b <= 4 ? "bg-emerald-500" : "bg-emerald-500/30"}`} />
            ))}
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
</div>























        {/* Bottom Mini Stats — Spanned Full Width */}
        <div className="mt-8 sm:mt-4 pt-8 border-t border-white/5 overflow-x-visible w-full">
          <div className="grid grid-cols-2 lg:flex lg:flex-nowrap items-start lg:items-center justify-between gap-x-4 sm:gap-x-8 gap-y-10 w-full animate-stats">
            {[
              { label: "Revenue Generated", val: "$12M+", icon: <TrendingUp size={20} /> },
              { label: "Brands Launched", val: "80+", icon: <Rocket size={20} /> },
              { label: "Average ROAS", val: "8.2x", icon: <Shield size={20} /> },
              { label: "Profit-First Approach", val: "100%", icon: <Heart size={20} /> },
              { label: "Client Rating", val: "4.9★", icon: <Star size={20} />, desktopOnly: true },
            ].map((t, i, arr) => (
              <React.Fragment key={i}>
                <div className={`flex items-center gap-4 group/stat ${t.desktopOnly ? "hidden xl:flex" : ""}`}>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-orange-500/5 border border-white/10 flex items-center justify-center text-orange-500 group-hover/stat:border-orange-500/30 group-hover/stat:bg-orange-500/10 transition-all duration-300">
                    {t.icon}
                  </div>
                  <div>
                    <p
                      className="text-2xl sm:text-3xl font-black tracking-tighter text-white leading-none mb-1"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {t.val}
                    </p>
                    <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-600 leading-tight">
                      {t.label}
                    </p>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div className={`hidden lg:block w-px h-10 bg-white/5 ${t.desktopOnly || arr[i+1]?.desktopOnly ? "!hidden xl:!block" : ""}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}