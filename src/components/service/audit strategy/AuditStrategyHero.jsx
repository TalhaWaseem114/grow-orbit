import { useEffect, useRef } from 'react';
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Target,
  ShieldCheck,
  Terminal,
  Shield
} from "lucide-react";
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

export default function AuditStrategyHero() {
  const engineRef = useRef(null);

  useEffect(() => {
    // Premium floating effect for the right-side engine
    gsap.to(engineRef.current, {
      y: -15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Animate the progress bar on load
    gsap.from(".efficiency-bar", {
      width: 0,
      duration: 1.5,
      delay: 0.5,
      ease: "power4.out"
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
      `}</style>

      {/* --- REFINED TECH BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent animate-[vertical-scan_8s_linear_infinite]"></div>
        <div className="absolute top-0 left-0 h-full w-[2px] bg-orange-500/[0.05] animate-[horizontal-scan_12s_linear_infinite]"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(249,115,22,0.04)_0deg,transparent_60deg,transparent_360deg)] animate-[spin_20s_linear_infinite]"></div>

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">

          {/* Left: Content Architecture */}
          <div className="lg:col-span-7 relative">
            {/* Science/Radar Box Overlay */}
            <div className="absolute -inset-10 z-0 pointer-events-none border-l border-t border-zinc-200/50 rounded-tl-[100px] opacity-40">
               <div className="absolute top-0 left-0 w-[1px] h-full bg-orange-500/20 animate-[horizontal-scan_10s_linear_infinite]"></div>
               <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-orange-500 rounded-tl-xl translate-x-[-1px] translate-y-[-1px]"></div>
               <div className="absolute top-0 right-0 w-2 h-2 bg-zinc-200 rounded-full translate-x-1 translate-y-[-4px]"></div>
            </div>

            <div className="relative z-10">
              <SectionLabel>Audit Intelligence Protocol v2.0</SectionLabel>

              <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black tracking-tighter leading-[0.85] mb-10 text-zinc-900 uppercase text-left">
                Stop <br />
                <span className="text-orange-500">Spending.</span> <br />
                <span className="italic font-serif lowercase tracking-tight text-zinc-300">Start Scaling.</span>
              </h1>

              <div className="flex gap-6 mb-12 text-left">
                <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50"></div>
                <div>
                  <div className="text-xl md:text-2xl text-zinc-500 font-light leading-relaxed max-w-xl mb-6">
                    Most Amazon brands waste{' '}
                    <div className="group relative inline-block cursor-help">
                      <span className="text-zinc-900 font-semibold underline decoration-orange-500/30 underline-offset-4 transition-colors hover:text-orange-600">
                        22% of their ad spend
                      </span>
                      <div className="absolute bottom-full left-0 mb-4 w-72 p-1 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                        <div className="relative bg-zinc-950 rounded-2xl p-5 shadow-2xl border border-zinc-800 overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50 animate-[tooltip-scan_2s_linear_infinite]"></div>
                          <div className="flex items-center gap-2 mb-3 text-orange-500">
                            <Activity size={14} />
                            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Diagnostic_Node_A1</span>
                          </div>
                          <div className="space-y-3 text-left">
                            <div className="flex items-start gap-3">
                              <Target size={16} className="text-white mt-0.5" />
                              <div>
                                <p className="text-white text-xs font-bold">Waste Detection</p>
                                <p className="text-zinc-400 text-[10px] leading-tight">Identifying non-converting keyword nodes at 0.04ms latency.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-3 h-3 bg-zinc-950 rotate-45 absolute -bottom-1.5 left-6 border-r border-b border-zinc-800"></div>
                      </div>
                    </div>
                    {' '}on non-converting keywords. Our Audit is the surgical strike that cuts waste.
                  </div>

                  {/* Digital Coordinate Feed */}
                  <div className="flex gap-8 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                     <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        <span>Latency: 0.04ms</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Terminal size={10} className="text-orange-500/50" />
                        <span>Core_Active: TRUE</span>
                     </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-8">
                <HeroButton href="/contact">
                  Book Your Free Diagnostic
                </HeroButton>

                <div className="flex items-center gap-6">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full bg-white border-2 border-[#fafafa] shadow-sm flex items-center justify-center text-[10px] font-bold text-zinc-400 transition-transform hover:translate-y-[-2px]">
                        {i === 4 ? (
                          <span className="text-orange-500 text-[11px]">+140</span>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-zinc-50 flex items-center justify-center">
                            <Activity size={12} className="text-zinc-300" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-mono font-black text-zinc-900 uppercase tracking-widest leading-none mb-1">Audit Status</p>
                    <p className="text-[10px] font-mono text-orange-500 font-bold uppercase tracking-tight">140+ Accounts Analyzed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The Engine Visual (Audit Specific) */}
          <div className="lg:col-span-5 relative hidden lg:block" ref={engineRef}>
            <div className="relative bg-zinc-950 rounded-[40px] p-1 border border-white/10 shadow-[0_80px_100px_-30px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent z-20 pointer-events-none animate-[container-scan_4s_linear_infinite]"></div>

              <div className="bg-zinc-900/50 rounded-[38px] p-10 backdrop-blur-3xl border border-white/5 text-left">
                <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-orange-500/70" />
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.4em]">Audit_Diagnostic_Feed</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Metric Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative group overflow-hidden bg-white/[0.03] p-6 rounded-3xl border border-white/10 hover:border-orange-500/50 transition-colors">
                      <p className="text-[8px] font-mono text-zinc-500 uppercase mb-2">Efficiency_Ratio</p>
                      <p className="text-4xl font-black text-white">85.4<span className="text-orange-500">%</span></p>
                      <div className="absolute -bottom-2 -right-2 opacity-10">
                        <ShieldCheck size={48} className="text-white" />
                      </div>
                    </div>
                    <div className="relative group overflow-hidden bg-white/[0.03] p-6 rounded-3xl border border-white/10 hover:border-orange-500/50 transition-colors">
                      <p className="text-[8px] font-mono text-zinc-500 uppercase mb-2">Waste_Clawed_Back</p>
                      <p className="text-4xl font-black text-white">$2.4<span className="text-orange-500">M</span></p>
                      <div className="absolute -bottom-2 -right-2 opacity-10">
                        <Zap size={48} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Audit Logs */}
                  <div className="p-6 bg-black/60 rounded-3xl border border-white/5 font-mono text-[10px] relative">
                    <div className="flex items-center gap-2 mb-4 text-orange-500/50">
                      <Terminal size={12} />
                      <span className="text-[8px] uppercase tracking-widest">Diagnostic_Protocol</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-zinc-400">
                        <span className="opacity-50">&gt; trace_keyword_waste</span>
                        <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded-md text-[8px] font-bold tracking-tighter">34% REDUCTION FOUND</span>
                      </div>
                      <div className="flex justify-between items-center text-zinc-200">
                        <span>&gt; iso_audit_v2</span>
                        <span className="text-orange-500 animate-pulse">[SCANNING]</span>
                      </div>
                      <div className="flex justify-between items-center text-zinc-400">
                        <span className="opacity-50">&gt; roas_trajectory</span>
                        <span className="text-green-500">2.4x TARGET</span>
                      </div>
                    </div>
                  </div>

                  {/* Efficiency Bar */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                      <span>Optimization Load</span>
                      <span className="text-white">85.4%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="efficiency-bar h-full bg-gradient-to-r from-orange-600 to-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.6)]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background glows for depth */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-[120px]"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-zinc-900/20 rounded-full blur-[80px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
