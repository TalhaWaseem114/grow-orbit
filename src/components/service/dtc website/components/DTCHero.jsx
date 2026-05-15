import React, { useRef, useEffect } from "react";
import {
  ArrowRight, Monitor, Mail, Search, BarChart2,
  Globe, Activity, Terminal, Layout, ChevronRight
} from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import HeroButton from "@/components/ui/HeroButton";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="flex gap-1">
      <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
      <div className="w-4 h-[1px] bg-orange-500 self-center"></div>
    </div>
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-600/80">
      {children}
    </span>
  </div>
);

export default function DTCHero() {
  const engineRef = useRef(null);

  useEffect(() => {
    gsap.to(engineRef.current, {
      y: -15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#fafafa]">
      <style>{`
        @keyframes vertical-scan {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes container-scan {
          0% { top: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      {/* --- TECH BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent animate-[vertical-scan_8s_linear_infinite]"></div>
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dtc-pattern" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
            <circle cx="60" cy="60" r="0.5" fill="currentColor" opacity="0.5" />
            <path d="M120 0 L120 120 M0 120 L120 120" stroke="currentColor" strokeWidth="0.2" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dtc-pattern)" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(249,115,22,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fafafa] to-[#fafafa]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">

          {/* Left: Content Architecture */}
          <div className="lg:col-span-7 relative">
            {/* Corner Markers */}
            <div className="absolute -inset-10 z-0 pointer-events-none border-l border-t border-zinc-200/50 rounded-tl-[100px] opacity-40">
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-orange-500 rounded-tl-xl -translate-x-px -translate-y-px"></div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-zinc-200 rounded-full translate-x-1 -translate-y-1"></div>
            </div>
            <div className="relative z-10 text-left">
              <SectionLabel>System Core: Commerce Architecture v2.0</SectionLabel>

              <h1
                className="text-4xl sm:text-6xl md:text-8xl lg:text-[85px] font-black tracking-tighter leading-[0.9] sm:leading-[0.85] mb-8 sm:mb-10 text-zinc-900 uppercase text-left"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                DTC <span className="text-orange-500">Website</span><br />
                <span
                  className="italic font-light lowercase tracking-tight text-zinc-300"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  architecture.
                </span>
              </h1>

              <div className="flex gap-4 sm:gap-6 mb-8 sm:mb-12 text-left">
                <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50" />
                <div>
                  <div className="text-base sm:text-lg md:text-[22px] text-zinc-500 font-light leading-relaxed max-w-xl mb-6">
                    <span className="text-zinc-900 font-semibold block mb-3">Amazon takes 15-40% of every sale. Your DTC store takes 0%.</span>
                    We build Shopify stores that convert — owned traffic, zero Amazon fees, full brand control. Most clients see 3x CVR within 90 days.
                  </div>
                  <div className="flex flex-wrap gap-4 sm:gap-8 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Build Pipeline: Open</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Terminal size={10} className="text-orange-500/50" />
                      <span>Commerce_Core: Active</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2×2 Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-left">
                {[
                  { icon: <Monitor size={40} />,   title: "Shopify Plus",      sub: "Custom storefront build." },
                  { icon: <Mail size={40} />,      title: "Lifecycle Flows",   sub: "Email & SMS automation." },
                  { icon: <Search size={40} />,    title: "SEO Architecture",  sub: "Organic traffic engine." },
                  { icon: <BarChart2 size={40} />, title: "Analytics Layer",   sub: "Full attribution clarity." },
                ].map((h, i) => (
                  <div key={i} className="relative group bg-white rounded-[24px] p-5 border border-zinc-100 hover:border-orange-500/20 hover:shadow-lg hover:shadow-zinc-200/50 transition-all duration-300 overflow-hidden text-left">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mb-3" />
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-900 mb-1 leading-tight">{h.title}</p>
                    <p className="text-[11px] text-zinc-400 font-light leading-snug">{h.sub}</p>
                    <div className="absolute bottom-3 right-3 text-zinc-100 group-hover:text-orange-500/10 transition-colors">
                      {h.icon}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-12 w-full">
                <HeroButton href="/get-started" className="w-full sm:w-auto">Start Your Build</HeroButton>

                <a
                  href="#packages"
                  className="group flex items-center justify-center sm:justify-start gap-3 text-zinc-400 hover:text-zinc-900 font-bold text-[11px] uppercase tracking-widest px-2 py-4 transition-colors no-underline w-full sm:w-auto"
                >
                  View Packages <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Trust micro-badges */}
              <div className="flex flex-wrap items-center gap-3 text-left mb-10">
                {[
                  { icon: <Globe size={11} />,       label: "Shopify Experts" },
                  { icon: <Layout size={11} />,      label: "Custom Themes" },
                  { icon: <BarChart2 size={11} />,   label: "Conversion Optimized" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2">
                    <span className="text-orange-500">{b.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{b.label}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:flex sm:items-center gap-8 sm:gap-10 pt-10 border-t border-zinc-100 text-left">
                {[
                  { label: "Active Builds",    val: "15+" },
                  { label: "Uptime SLA",       val: "99.9%" },
                  { label: "Stores Launched",  val: "40+" },
                ].map((t, i) => (
                  <div key={i} className={i === 2 ? "col-span-2 sm:col-auto" : ""}>
                    <p className="text-xl sm:text-2xl font-black tracking-tighter text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>{t.val}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Stylized Commerce Architecture Engine ── */}
          <div className="lg:col-span-5 relative hidden lg:block self-start lg:mt-[70px]" ref={engineRef}>
            
            {/* Enhanced Ambient Backglow */}
            <div className="absolute -inset-16 bg-gradient-to-br from-orange-500/30 via-transparent to-blue-500/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Main Console Container */}
            <div className="bg-zinc-950/90 backdrop-blur-3xl rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-white/10 p-6 relative overflow-hidden ring-1 ring-white/5">
               {/* Enhanced Grid Texture & Noise */}
               <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

               <div className="relative z-10">
                 {/* Header Bar */}
                 <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <div className="flex items-center gap-4">
                       <div className="flex gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                         <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                         <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                       </div>
                       <div className="h-4 w-px bg-white/10" />
                       <div className="flex items-center gap-2 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                         <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Shopify Core Live</span>
                       </div>
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Monitor size={10} className="text-zinc-600" /> Storefront v2.4
                    </span>
                 </div>

                 {/* Browser Frame — Highly Stylized */}
                 <div className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden mb-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)] transform-gpu hover:scale-[1.02] transition-transform duration-500 group relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    
                    {/* Browser Chrome */}
                    <div className="bg-zinc-950/80 border-b border-white/5 px-4 py-2.5 flex items-center gap-3">
                       <Globe size={10} className="text-zinc-600" />
                       <div className="flex-1 bg-zinc-900/80 rounded-md h-6 border border-white/5 flex items-center px-3 shadow-inner">
                         <span className="text-[8px] font-mono text-zinc-500 font-medium tracking-wide">https://<span className="text-white">yourbrand</span>.com</span>
                       </div>
                       <Layout size={10} className="text-zinc-600" />
                    </div>

                    {/* eCommerce UI Mockup - Premium */}
                    <div className="relative p-5 bg-gradient-to-br from-zinc-800 to-zinc-900 overflow-hidden">
                       <div className="absolute right-0 top-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                       {/* Nav */}
                       <div className="flex justify-between items-center mb-5 relative z-10">
                          <div className="w-16 h-2.5 bg-white/20 rounded-sm shadow-sm" />
                          <div className="flex gap-2">
                             <div className="w-6 h-1.5 bg-white/10 rounded-full" />
                             <div className="w-6 h-1.5 bg-white/10 rounded-full" />
                          </div>
                       </div>

                       {/* Hero Section */}
                       <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl p-5 mb-5 border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden group-hover:border-orange-500/20 transition-colors duration-500">
                          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                          <div className="relative z-10">
                             <div className="w-3/4 h-3 bg-white/90 rounded-sm mb-3 shadow-sm" />
                             <div className="w-1/2 h-2 bg-white/40 rounded-sm mb-5" />
                             <div className="w-20 h-7 bg-orange-500 rounded-md flex items-center justify-center shadow-[0_4px_14px_rgba(249,115,22,0.4)] hover:bg-orange-400 transition-colors cursor-pointer">
                               <span className="text-[7px] font-black uppercase text-white tracking-widest">Shop All</span>
                             </div>
                          </div>
                       </div>

                       {/* Product Grid */}
                       <div className="grid grid-cols-2 gap-4 relative z-10">
                          {[1, 2].map((i) => (
                             <div key={i} className="bg-zinc-800/40 backdrop-blur-sm border border-white/5 rounded-xl p-3 hover:border-white/10 transition-colors relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                <div className="bg-zinc-700/50 w-full h-14 rounded-lg mb-3 flex items-center justify-center shadow-inner relative overflow-hidden">
                                   <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/5" />
                                   <Activity size={12} className="text-zinc-500" />
                                </div>
                                <div className="w-3/4 h-1.5 bg-white/60 rounded-sm mb-2" />
                                <div className="w-1/3 h-1.5 bg-orange-400/80 rounded-sm" />
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>

                 {/* Real-Time Metrics Pipeline */}
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-xl p-4 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
                       <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                       <p className="text-[7px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                         <BarChart2 size={10} className="text-emerald-500" /> Conversion Rate
                       </p>
                       <div className="flex items-end gap-2 mb-3">
                         <span className="text-2xl font-black text-white leading-none tracking-tighter">4.2%</span>
                         <span className="text-[8px] font-bold text-emerald-400 mb-0.5 uppercase bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">+1.4% Lift</span>
                       </div>
                       <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                         <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 w-[65%] rounded-full relative">
                            <div className="absolute top-0 right-0 w-2 h-full bg-white/30 rounded-full blur-[1px]" />
                         </div>
                       </div>
                    </div>
                    
                    <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-xl p-4 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
                       <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                       <p className="text-[7px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                         <Search size={10} className="text-orange-500" /> Page Speed
                       </p>
                       <div className="flex items-end gap-2 mb-3">
                         <span className="text-2xl font-black text-white leading-none tracking-tighter">1.2s</span>
                         <span className="text-[8px] font-bold text-orange-400 mb-0.5 uppercase bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20">A-Grade</span>
                       </div>
                       <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                         <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 w-[90%] rounded-full relative">
                            <div className="absolute top-0 right-0 w-2 h-full bg-white/30 rounded-full blur-[1px]" />
                         </div>
                       </div>
                    </div>
                 </div>
               </div>
            </div>

            {/* Floating Side Badge - Stylized */}
            <div className="absolute top-1/4 -right-8 bg-zinc-900/95 backdrop-blur-xl rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/10 z-20 flex flex-col items-center justify-center min-w-[100px] hover:scale-105 transition-transform duration-300">
               <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mb-2 border border-blue-500/30">
                  <Activity size={12} className="text-blue-400" />
               </div>
               <p className="text-[7px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em] mb-1 text-center">Zero Amazon</p>
               <p className="text-sm font-black text-white leading-none text-center tracking-wide">FEES</p>
            </div>

            {/* Bottom Floating Badge - Stylized */}
            <div className="absolute -bottom-6 sm:-bottom-10 left-4 sm:-left-6 bg-white/95 backdrop-blur-xl rounded-3xl p-5 shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-zinc-200 flex items-center gap-4 z-40 animate-[float_6s_ease-in-out_infinite] hover:scale-105 transition-transform duration-300">
               <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 shadow-inner">
                  <Terminal size={18} className="text-emerald-600" />
               </div>
               <div>
                  <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-400 mb-1">Custom Build</p>
                  <p className="text-lg font-black text-zinc-900 leading-none tracking-tight">Headless Ready</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
