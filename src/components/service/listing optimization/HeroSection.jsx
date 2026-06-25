import React, { useEffect, useRef } from 'react';
import Link from "next/link";
import {
  Search,
  Layers,
  Target,
  TrendingUp,
  Activity,
  Zap,
  Database,
  BarChart,
  Terminal,
  ShieldCheck,
  Globe,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import gsap from 'gsap';
import HeroButton from "@/components/ui/HeroButton";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-8 text-left">
    <div className="flex gap-1">
      <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
      <div className="w-4 h-px bg-orange-500 self-center"></div>
    </div>
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500">
      {children}
    </span>
  </div>
);

const ListingOptimizationHero = () => {
  const engineRef = useRef(null);
  const [logIndex, setLogIndex] = React.useState(0);

  useEffect(() => {
    // Sequential log boot
    const logInterval = setInterval(() => {
      setLogIndex(prev => (prev + 1) % 5);
    }, 2500);

    return () => clearInterval(logInterval);
  }, []);

  useEffect(() => {
    // Premium floating effect for the right-side engine
    gsap.to(engineRef.current, {
      y: -8,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#fafafa]">
      <style>{`
        @keyframes tooltip-scan {
          0% { transform: translateY(0); opacity: 0.5; }
          100% { transform: translateY(180px); opacity: 0; }
        }
      `}</style>

      {/* --- TOP PROGRESS BAR --- */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-orange-500/10 z-50 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 h-full bg-orange-500 opacity-50"></div>
      </div>

      {/* --- REFINED TECH BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent"></div>
        <div className="absolute top-0 left-0 h-full w-[2px] bg-orange-500/[0.05]"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(249,115,22,0.04)_0deg,transparent_60deg,transparent_360deg)] opacity-50"></div>

        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="tech-pattern" width="120" height="120" patternUnits="userSpaceOnUse">
             <circle cx="2" cy="2" r="1" fill="currentColor" />
             <circle cx="60" cy="60" r="0.5" fill="currentColor" opacity="0.5" />
             <path d="M0 0 L10 10 M110 110 L120 120 M120 0 L110 10 M0 120 L10 110" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
             <path d="M120 0 L120 120 M0 120 L120 120" stroke="currentColor" strokeWidth="0.2" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#tech-pattern)" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(249,115,22,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fafafa] to-[#fafafa]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left: Content Architecture */}
          <div className="lg:col-span-7 relative">
            {/* Science/Radar Box Overlay */}
            <div className="absolute -inset-10 z-0 pointer-events-none border-l border-t border-zinc-200/50 rounded-tl-[100px] opacity-40">
               <div className="absolute top-0 left-0 w-[1px] h-full bg-orange-500/20"></div>
               <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-orange-500 rounded-tl-xl translate-x-[-1px] translate-y-[-1px]"></div>
               <div className="absolute top-0 right-0 w-2 h-2 bg-zinc-200 rounded-full translate-x-1 translate-y-[-4px]"></div>
            </div>

            <div className="relative z-10">
              <SectionLabel>Search Dominance Protocol v3.0</SectionLabel>

              <h1
                className="text-5xl sm:text-6xl md:text-8xl lg:text-[85px] break-words font-black tracking-tighter leading-[0.85] mb-10 text-zinc-900 uppercase text-left"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Amazon SEO <br />
                <span
                  className="italic font-light lowercase tracking-tight text-zinc-300"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Listing Logic.
                </span>
              </h1>

              <div className="flex gap-6 mb-12 text-left">
                <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50"></div>
                <div>
                <div className="text-lg md:text-[22px] text-zinc-500 font-light leading-relaxed max-w-xl mb-6">
                    Rank for the terms that convert — not just the ones with volume. We translate the A10 algorithm into a growth system aligned with our{' '}
                    <div className="group relative inline-block cursor-help">
                      <div className="text-zinc-900 font-semibold underline decoration-orange-500/30 underline-offset-4 transition-colors hover:text-orange-500">
                        A10 Velocity Protocol
                      </div>
                      <div className="absolute bottom-full left-0 mb-4 w-72 p-1 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                        <Link href="/contact" className="relative bg-zinc-950 rounded-2xl p-5 shadow-2xl border border-zinc-800 overflow-hidden block">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50 animate-[tooltip-scan_2s_linear_infinite]"></div>
                          <div className="flex items-center gap-2 mb-3 text-orange-500">
                            <Activity size={14} />
                            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Protocol_SEO_X3</span>
                          </div>
                          <div className="space-y-3 text-left">
                            <div className="flex items-start gap-3">
                              <Search size={16} className="text-white mt-0.5" />
                              <div>
                                <p className="text-white text-xs font-bold">Crawl Optimization</p>
                                <p className="text-zinc-400 text-[10px] leading-tight mb-3">Direct API mapping to force indexing of high-intent nodes.</p>
                                <div className="flex items-center gap-1.5 text-orange-500 text-[9px] font-bold uppercase tracking-widest">
                                  <span>Secure Access</span>
                                  <ArrowRight size={10} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div className="w-3 h-3 bg-zinc-950 rotate-45 absolute -bottom-1.5 left-6 border-r border-b border-zinc-800"></div>
                      </div>
                    </div>
                    {' '}insuring your brand captures the top 1% from day one.
                </div>

                  {/* Digital Coordinate Feed */}
                  <div className="flex gap-8 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                     <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        <span>SEO_Crawl: ACTIVE</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Database size={10} className="text-orange-500/50" />
                        <span>Index_Sync: 100%</span>
                     </div>
                  </div>
                </div>
              </div>

              {/* 4-item highlight cards — 2×2 grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  { icon: <Search size={40} />,     title: "Keyword Intel",  sub: "A10 mapping & deep indexation."      },
                  { icon: <Layers size={40} />,     title: "Architecture",   sub: "Structural crawler/A10 integrity."   },
                  { icon: <Target size={40} />,     title: "Conversion",     sub: "Psych-led benefit driven copy."      },
                  { icon: <TrendingUp size={40} />, title: "Momentum",       sub: "Organic BSR growth protocols."       },
                ].map((h, i) => (
                  <div key={i} className="relative group bg-white rounded-[24px] p-5 border border-zinc-100 hover:border-orange-500/20 hover:shadow-lg hover:shadow-zinc-200/50 transition-all duration-300 overflow-hidden text-left">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mb-3"></div>
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-900 mb-1 leading-tight">{h.title}</p>
                    <p className="text-[11px] text-zinc-400 font-light leading-snug">{h.sub}</p>
                    <div className="absolute bottom-3 right-3 text-zinc-100 group-hover:text-orange-500/10 transition-colors">
                      {h.icon}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-12">
                <HeroButton href="/contact">
                  Secure Top-Tier Ranking
                </HeroButton>

                <a
                  href="#packages"
                  className="group flex items-center gap-3 text-zinc-400 hover:text-zinc-900 font-bold text-[11px] uppercase tracking-widest px-2 py-4 transition-colors no-underline"
                >
                  View Packages <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </a>

              </div>

              <div className="flex flex-wrap items-center gap-3">
                {[
                  { icon: <ShieldCheck size={11} />, label: "A10 Rank Integrity" },
                  { icon: <Activity size={11} />,    label: "Algorithmic Precision" },
                  { icon: <Zap size={11} />,         label: "Direct BSR Impact" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2">
                    <span className="text-orange-500">{b.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{b.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-10 mt-10 pt-10 border-t border-zinc-100">
                {[
                  { label: "Avg Traffic Lift",    val: "+340%" },
                  { label: "Indexation Sync",     val: "100%"  },
                  { label: "Keywords Targeted",   val: "10k+"  },
                ].map((t, i) => (
                  <div key={i}>
                    <p className="text-xl font-black tracking-tighter text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>{t.val}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Search Matrix Dashboard */}
          <div className="lg:col-span-5 relative block mt-0 lg:mt-[70px] scale-[0.95] sm:scale-100 origin-top lg:origin-center" ref={engineRef}>
            <style>{`
              @keyframes rank-fill { from { width: 0; } }
              @keyframes crawl-enter { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }
            `}</style>

            {/* Floating card - top right */}
            <div className="absolute -top-8 -right-2 lg:-right-4 bg-white rounded-[20px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.08)] z-30 border border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white shadow-[0_8px_20px_rgba(245,158,11,0.3)]"><TrendingUp size={18} /></div>
                <div>
                  <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Visibility</p>
                  <p className="text-lg font-black text-zinc-900 tracking-tighter leading-none">+340%</p>
                </div>
              </div>
            </div>

            {/* Floating card - bottom left */}
            <div className="absolute -left-4 lg:-left-10 bottom-[60px] bg-zinc-900 rounded-2xl px-5 py-4 z-30 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
                <div>
                  <p className="text-[7px] font-mono font-bold uppercase tracking-[0.25em] text-zinc-500">Keywords Indexed</p>
                  <p className="text-lg sm:text-xl font-black text-white leading-none tracking-tighter">10K+</p>
                </div>
              </div>
            </div>

            {/* Floating card - bottom right */}
            <div className="absolute -right-2 lg:-right-6 bottom-[-30px] bg-white rounded-2xl px-5 py-3.5 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-zinc-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center"><Search size={14} className="text-amber-500" /></div>
                <div>
                  <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Main KW</p>
                  <p className="text-xs sm:text-sm font-black text-amber-600 tracking-tight leading-none">#1 Rank</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-950 rounded-[32px] shadow-[0_60px_120px_rgba(0,0,0,0.4)] border border-white/[0.08] overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

              <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.2em]">A10_Search_Matrix</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[8px] font-mono text-amber-500/70 uppercase tracking-widest">CRAWLING</span>
                </div>
              </div>

              <div className="p-6">
                {/* Keyword Constellation */}
                <div className="relative h-[170px] flex items-center justify-center mb-6">
                  <div className="absolute w-[170px] h-[170px] rounded-full border border-dashed border-white/[0.06]" />
                  <svg className="absolute w-[140px] h-[140px]" viewBox="0 0 140 140">
                    <circle cx="70" cy="70" r="64" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
                    <circle cx="70" cy="70" r="64" fill="none" stroke="url(#seo-grad)" strokeWidth="2.5" strokeDasharray="402" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 70 70)" className="drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                    <defs>
                      <linearGradient id="seo-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#eab308" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute w-[100px] h-[100px] rounded-full border border-white/[0.08]" />

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div style={{ transform: "rotate(45deg) translateX(85px) rotate(-45deg)" }}>
                      <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_16px_rgba(245,158,11,0.8),0_0_40px_rgba(245,158,11,0.3)]" />
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div style={{ transform: "rotate(-135deg) translateX(85px) rotate(135deg)" }}>
                      <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.8)]" />
                    </div>
                  </div>

                  <div className="relative w-[80px] h-[80px] rounded-full flex flex-col items-center justify-center z-10" style={{ background: "radial-gradient(circle at 40% 35%, rgba(245,158,11,0.15), rgba(24,24,27,1) 70%)", border: "1px solid rgba(245,158,11,0.2)" }}>
                    <Search size={18} className="text-amber-400 mb-1" />
                    <p className="text-[7px] font-mono text-amber-500/80 font-black uppercase tracking-widest">INDEX</p>
                    <p className="text-[13px] font-black text-white uppercase tracking-tighter leading-none">100%</p>
                  </div>

                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-[7px] font-mono text-amber-500/70 uppercase tracking-widest font-bold">A10 SYNCED</span>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <span className="text-[7px] font-mono text-zinc-700 uppercase tracking-widest">10K+ TERMS</span>
                  </div>
                </div>

                {/* Rank Ladder */}
                <div className="bg-white/[0.03] rounded-2xl border border-white/[0.06] p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Rank Ladder</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[7px] font-mono text-emerald-500/80 uppercase tracking-widest">PAGE 1</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { kw: "Main Keyword", rank: "#1", pct: "100%", color: "from-amber-600 to-amber-400" },
                      { kw: "Long-Tail Semantic", rank: "#2", pct: "95%", color: "from-amber-600 to-yellow-400" },
                      { kw: "Category BSR", rank: "#11", pct: "70%", color: "from-orange-600 to-orange-400" },
                      { kw: "Competitor Term", rank: "#4", pct: "88%", color: "from-emerald-600 to-emerald-400" },
                    ].map((r, i) => (
                      <div key={i} className="flex items-center gap-3" style={{ animation: `crawl-enter 0.4s ease-out ${i * 0.1}s both` }}>
                        <span className="text-[9px] font-mono text-zinc-400 w-28 shrink-0 truncate">{r.kw}</span>
                        <div className="h-1.5 flex-1 bg-white/[0.04] rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${r.color} rounded-full`} style={{ width: r.pct, animation: `rank-fill 1.5s ease-out ${i * 0.2}s both` }} />
                        </div>
                        <span className="text-[10px] font-mono font-black text-white w-6 text-right">{r.rank}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SEO Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: "Traffic Lift", value: "+340%", icon: <TrendingUp size={12} />, color: "text-amber-400" },
                    { label: "Indexation", value: "100%", icon: <Database size={12} />, color: "text-emerald-400" },
                    { label: "Velocity", value: "240%", icon: <Zap size={12} />, color: "text-orange-400" },
                  ].map((m, i) => (
                    <div key={i} className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06] hover:border-amber-500/20 transition-colors group">
                      <div className={`${m.color} mb-2 opacity-60 group-hover:opacity-100 transition-opacity`}>{m.icon}</div>
                      <p className="text-[15px] font-black text-white tracking-tighter leading-none mb-0.5">{m.value}</p>
                      <p className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Crawl Status Bar */}
                <div className="bg-white/[0.02] rounded-xl border border-white/[0.04] p-3 flex items-center gap-3">
                  <div className="flex items-center gap-2 shrink-0">
                    <Search size={12} className="text-amber-500/60" />
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Crawl Depth</span>
                  </div>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/[0.04]">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-amber-600 to-yellow-400 shadow-[0_0_12px_rgba(245,158,11,0.4)]" style={{ animation: "rank-fill 2s ease-out both" }} />
                  </div>
                  <span className="text-[9px] font-mono font-black text-amber-400 shrink-0">100%</span>
                </div>
              </div>
            </div>

            <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingOptimizationHero;
