import React, { useEffect, useRef, useState } from 'react';
import {
  Zap,
  BarChart3,
  Target,
  Terminal,
} from 'lucide-react';
import gsap from 'gsap';
import HeroButton from "@/components/ui/HeroButton";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-8 text-left">
    <div className="flex gap-1">
      <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
      <div className="w-4 h-[1px] bg-orange-500 self-center"></div>
    </div>
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-600/80">
      {children}
    </span>
  </div>
);

const BrandLaunchHero = () => {
  const engineRef = useRef(null);

  const [coordinates, setCoordinates] = useState({ lat: "45.28", lng: "123.45" });
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    // Premium floating effect for the right-side engine
    gsap.to(engineRef.current, {
      y: -8,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Simulated coordinate drift for tracking feel
    const coordInterval = setInterval(() => {
      setCoordinates({
        lat: (45.28 + (Math.random() * 0.05)).toFixed(2),
        lng: (123.45 + (Math.random() * 0.05)).toFixed(2)
      });
    }, 2000);

    // Dynamic log cycle
    const logInterval = setInterval(() => {
      setLogIndex(prev => (prev + 1) % 4);
    }, 3000);

    return () => {
      clearInterval(coordInterval);
      clearInterval(logInterval);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#fafafa]">
      <style>{`
        @keyframes vertical-scan {
          0% { top: 0%; transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; transform: translateY(0%); opacity: 0; }
        }
        @keyframes tooltip-scan {
          0% { transform: translateY(0); opacity: 0.5; }
          100% { transform: translateY(180px); opacity: 0; }
        }
        @keyframes container-scan {
          0% { top: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes orbit-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes hud-orbit-inner {
          from { transform: rotate(360deg) translateY(72px) rotate(-360deg); }
          to { transform: rotate(0deg) translateY(72px) rotate(0deg); }
        }
        @keyframes hud-orbit-outer {
          from { transform: rotate(0deg) translateY(112px) rotate(0deg); }
          to { transform: rotate(360deg) translateY(112px) rotate(-360deg); }
        }
        @keyframes core-pulse {
          0% { box-shadow: 0 0 50px rgba(249,115,22,0.2), inset 0 0 20px rgba(249,115,22,0.1); transform: scale(1); }
          50% { box-shadow: 0 0 70px rgba(249,115,22,0.4), inset 0 0 30px rgba(249,115,22,0.2); transform: scale(1.05); }
          100% { box-shadow: 0 0 50px rgba(249,115,22,0.2), inset 0 0 20px rgba(249,115,22,0.1); transform: scale(1); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; filter: blur(20px); }
          50% { opacity: 0.6; filter: blur(30px); }
        }
      `}</style>

      {/* --- REFINED TECH BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent"></div>
        <div className="absolute top-0 left-0 h-full w-[2px] bg-orange-500/[0.05]"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(249,115,22,0.04)_0deg,transparent_60deg,transparent_360deg)]"></div>

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left: Content Architecture */}
          <div className="lg:col-span-7 relative text-left">
            <div className="absolute -inset-10 z-0 pointer-events-none border-l border-t border-zinc-200/50 rounded-tl-[100px] opacity-40">
               <div className="absolute top-0 left-0 w-[1px] h-full bg-orange-500/20"></div>
               <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-orange-500 rounded-tl-xl translate-x-[-1px] translate-y-[-1px]"></div>
               <div className="absolute top-0 right-0 w-2 h-2 bg-zinc-200 rounded-full translate-x-1 translate-y-[-4px]"></div>
            </div>

            <div className="relative z-10">
              <SectionLabel>Market Entry Protocol v4.0</SectionLabel>

              <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black tracking-tighter leading-[0.85] mb-10 text-zinc-900 uppercase">
                Launch Your <br />
                <span className="italic font-serif lowercase tracking-tight text-zinc-300">Brand Legacy.</span>
              </h1>

              <div className="flex gap-6 mb-12">
                <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50"></div>
                <div>
                  <div className="text-xl md:text-2xl text-zinc-500 font-light leading-relaxed max-w-xl mb-6">
                    We don't just "go live." We engineer an algorithmic breakthrough by aligning your brand with our{' '}
                    <div className="group relative inline-block cursor-help">
                      <span className="text-zinc-900 font-semibold underline decoration-orange-500/30 underline-offset-4 transition-colors hover:text-orange-600">
                        A10 Velocity Protocol
                      </span>
                      <div className="absolute bottom-full left-0 mb-4 w-72 p-1 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                        <div className="relative bg-zinc-950 rounded-2xl p-5 shadow-2xl border border-zinc-800 overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
                          <div className="flex items-center gap-2 mb-3 text-orange-500">
                            <Target size={14} />
                            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Protocol_Launch_X1</span>
                          </div>
                          <div className="space-y-3 text-left">
                            <div className="flex items-start gap-3">
                              <Target size={16} className="text-white mt-0.5" />
                              <div className="space-y-1">
                                <p className="text-white text-xs font-bold">Aggressive Indexing</p>
                                <p className="text-zinc-400 text-[10px] leading-tight">Force-crawling brand nodes for 24hr organic visibility.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-3 h-3 bg-zinc-950 rotate-45 absolute -bottom-1.5 left-6 border-r border-b border-zinc-800"></div>
                      </div>
                    </div>
                    {' '}insuring your products capture the top 1% from day one.
                  </div>

                  <div className="flex gap-8 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                     <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        <span>Mission_Clock: T-Minus_0</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Terminal size={10} className="text-orange-500/50" />
                        <span>Core_Sync: 100%</span>
                     </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-8 mb-12">
                <HeroButton href="/contact">Begin Launch Sequence</HeroButton>

                <div className="flex items-center gap-6">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full bg-white border-2 border-[#fafafa] shadow-sm flex items-center justify-center text-[10px] font-bold text-zinc-400 transition-transform hover:translate-y-[-2px]">
                        {i === 4 ? (
                          <span className="text-orange-500 text-[11px]">GO</span>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-zinc-50 flex items-center justify-center">
                            <Target size={12} className="text-zinc-300" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-black text-zinc-900 uppercase tracking-widest leading-none mb-1 text-left">Launch Status</p>
                    <p className="text-[10px] font-mono text-orange-500 font-bold uppercase tracking-tight">Mission_Ready: ACTIVE</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 border-t border-zinc-200/50 pt-10">
                <div>
                  <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-2">Efficiency</p>
                  <p className="text-sm text-zinc-500 font-light">60% faster organic indexing compared to standard listings.</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-2">Authority</p>
                  <p className="text-sm text-zinc-500 font-light">Immediate algorithmic "Honeymoon" status for top-tier rank.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The Engine Visual (Updated with no rocket and bigger text) */}
          <div className="lg:col-span-5 relative hidden lg:block max-h-[600px]" ref={engineRef}>
            <div className="relative bg-zinc-950 rounded-[40px] p-1 border border-white/10 shadow-[0_80px_100px_-30px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent z-20 pointer-events-none"></div>

              <div className="bg-zinc-900/50 rounded-[38px] p-8 backdrop-blur-3xl border border-white/5 text-left">
                <div className="flex justify-between items-center mb-5 pb-3.5 border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Target size={14} className="text-orange-500/70" />
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.4em]">Launch_Control_Feed</span>
                  </div>
                </div>

                <div className="space-y-4">
                   {/* The Mission Hub: Updated with orbiting HUD planets */}
                   <div className="relative h-56 flex items-center justify-center">

                     {/* Outer Orbit (Orbit 2) - Enlarged radius */}
                     <div className="absolute w-56 h-56 rounded-full border border-white/[0.03]" />

                     {/* HUD Planet - Outer (DATA_FEED) */}
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       <div className="absolute w-16 h-16 flex items-center justify-center">
                         <div className="relative w-full h-full rounded-full bg-zinc-950/80 backdrop-blur-xl border border-orange-500/30 flex flex-col items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                           {/* HUD Brackets Decor */}
                           <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-white/20"></div>
                           <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-white/20"></div>

                           <span className="text-[6px] font-mono text-zinc-500 uppercase tracking-[0.2em] leading-none mb-1.5 relative z-10">DATA_FEED</span>
                           <div className="flex flex-col items-center relative z-10">
                              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse mb-1 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                              <span className="text-[8px] font-black text-white tracking-widest uppercase">LIVE</span>
                           </div>
                         </div>
                         {/* Coordinate Label */}
                         <div className="absolute top-full mt-2 text-[5px] font-mono text-zinc-500 whitespace-nowrap">
                           LAT: {coordinates.lat} / LNG: {coordinates.lng}
                         </div>
                       </div>
                     </div>

                     {/* Inner Orbit (Orbit 1) */}
                     <div className="absolute w-36 h-36 rounded-full border border-white/5" />

                     {/* HUD Planet - Inner (ASSET_SYNC) */}
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       <div className="absolute w-14 h-14 flex items-center justify-center">
                         <div className="relative w-full h-full rounded-full bg-zinc-950/80 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.4)]">
                           {/* HUD Brackets Decor */}
                           <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-white/20"></div>
                           <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-white/20"></div>

                           <span className="text-[6px] font-mono text-zinc-500 uppercase tracking-[0.2em] leading-none mb-1.5 relative z-10">ASSET_SYNC</span>
                           <span className="text-[9px] font-black text-white leading-none relative z-10">READY</span>
                         </div>
                       </div>
                     </div>

                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-zinc-950 to-zinc-800 border border-white/10 flex flex-col items-center justify-center group overflow-hidden shadow-[0_0_50px_rgba(249,115,22,0.25),inset_0_0_20px_rgba(249,115,22,0.1)]">
                       {/* Core Internal Glow */}
                       <div className="absolute inset-0 blur-2xl opacity-60"></div>

                      <div className="relative z-10 flex flex-col items-center justify-center mt-2">
                        <div className="text-center">
                          {/* Text sizes slightly increased */}
                          <p className="text-[10px] font-mono text-orange-500 font-black uppercase tracking-[0.2em] mb-0.5">BRAND</p>
                          <p className="text-[14px] font-mono text-white font-black uppercase tracking-[0.3em]">CORE</p>
                        </div>
                      </div>
                    </div>

                    {/* Mission Status Label */}
                    <div className="absolute top-0 left-0 flex items-center gap-2">
                       <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                       <span className="text-[8px] font-mono text-white uppercase tracking-widest font-black">MISSION GO</span>
                    </div>
                  </div>

                   {/* Terminal Logs (Animated Feed) */}
                   <div className="p-4 bg-black/40 rounded-2xl border border-white/5 font-mono text-[10px] relative group overflow-hidden">
                     <div className="absolute inset-0 pointer-events-none opacity-20">
                       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent h-[50%] animate-[scanline_3s_linear_infinite]"></div>
                     </div>
                     <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/10 to-transparent" />
                     <div className="flex items-center gap-2 mb-2.5 text-orange-500/50">
                       <Terminal size={12} />
                       <span className="text-[8px] uppercase tracking-[0.3em] font-black">PROTOCOL_LOGS_V4.0</span>
                     </div>
                     <div className="space-y-2.5 h-[64px] overflow-hidden">
                       <div className={`flex justify-between items-center text-zinc-400 transition-all duration-500 ${logIndex >= 0 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                         <span className="opacity-70">&gt; initiate_launch_node</span>
                         <span className="text-green-500 font-bold">[SUCCESS]</span>
                       </div>
                       <div className={`flex justify-between items-center text-zinc-300 transition-all duration-500 ${logIndex >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                         <span>&gt; orbital_sync_complete</span>
                         <span>100%</span>
                       </div>
                       <div className={`flex justify-between items-center text-zinc-400 transition-all duration-500 ${logIndex >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                         <span className="opacity-70">&gt; honeymoon_boost</span>
                         <span className="text-orange-500 animate-pulse">ACTIVE</span>
                       </div>
                       <div className={`flex justify-between items-center text-zinc-500 transition-all duration-500 ${logIndex >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                         <span className="opacity-70">&gt; telemetry_link</span>
                         <span className="animate-pulse">CONNECTED</span>
                       </div>
                     </div>
                   </div>

                  {/* Data Rows (Untouched) */}
                  <div className="space-y-2.5">
                    <div className="group relative p-3.5 bg-white/[0.02] rounded-xl border border-white/5 hover:border-orange-500/30 transition-all">
                       <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                             <Zap size={10} className="text-orange-500" />
                             <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-black">Velocity</span>
                          </div>
                          <span className="text-[9px] font-mono text-zinc-500">0.82 M_Share</span>
                       </div>
                       <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full w-[65%] bg-gradient-to-r from-orange-600 to-orange-400" />
                       </div>
                    </div>

                    <div className="group relative p-3.5 bg-white/[0.02] rounded-xl border border-white/5 hover:border-orange-500/30 transition-all">
                       <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                             <BarChart3 size={10} className="text-orange-500" />
                             <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-black">Stabilizer</span>
                          </div>
                          <span className="text-[9px] font-mono text-zinc-500">A10 Active</span>
                       </div>
                       <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full w-[88%] bg-gradient-to-r from-orange-600 to-orange-400" />
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-10 -right-10 w-60 h-60 bg-orange-500/10 rounded-full blur-[120px]"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-zinc-900/20 rounded-full blur-[80px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandLaunchHero;
