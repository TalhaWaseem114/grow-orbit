import React, { useRef, useEffect } from "react";
import {
  ArrowRight, Terminal, Cpu, Layers, CheckCircle2,
  Activity, ChevronRight, Target, Search, BarChart2, Box, Gauge, ShieldCheck, Zap
} from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import SectionLabel from "./SectionLabel";
import HeroButton from "@/components/ui/HeroButton";

export default function AutomationHero() {
  const engineRef = useRef(null);

  useEffect(() => {
    gsap.to(engineRef.current, { y: -12, duration: 4, repeat: -1, yoyo: true, ease: "power1.inOut" });
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

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-linear-to-b from-transparent via-orange-500/[0.03] to-transparent animate-[vertical-scan_8s_linear_infinite]"></div>
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="auto-pattern" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
            <circle cx="60" cy="60" r="0.5" fill="currentColor" opacity="0.5" />
            <path d="M120 0 L120 120 M0 120 L120 120" stroke="currentColor" strokeWidth="0.2" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#auto-pattern)" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(249,115,22,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#fafafa] to-[#fafafa]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left */}
          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-6 md:-inset-10 z-0 pointer-events-none border-l border-t border-zinc-200/50 rounded-tl-[60px] md:rounded-tl-[100px] opacity-40">
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-orange-500 rounded-tl-xl -translate-x-px -translate-y-px"></div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-zinc-200 rounded-full translate-x-1 -translate-y-1"></div>
            </div>
            <div className="relative z-10">
              <SectionLabel>System Core: Automation Protocol v1.0</SectionLabel>

              <h1
                className="text-4xl sm:text-6xl md:text-8xl lg:text-[85px] font-black tracking-tighter leading-[0.9] md:leading-[0.85] mb-8 md:mb-10 text-zinc-900 uppercase text-left"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Stop Running <br />
                <span className="text-orange-500">Your Amazon</span> <br />
                <span
                  className="italic font-light lowercase tracking-tight text-zinc-300"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Manually.
                </span>
              </h1>

              <div className="flex gap-4 md:gap-6 mb-10 md:mb-12 text-left">
                <div className="w-[2px] bg-linear-to-b from-orange-500 to-transparent hidden md:block opacity-50"></div>
                <div>
                  <div className="text-base md:text-[22px] text-zinc-600 font-light leading-relaxed max-w-xl mb-6">
                    <span className="text-zinc-900 font-bold">Automate the work. Keep the growth.</span> We build proprietary operating systems that handle the heavy lifting of inventory, pricing, and reporting — so you can scale without scaling headcount.
                  </div>
                  {/* Digital Coordinate Feed */}
                  <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                       <span>All Systems: Online</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Terminal size={10} className="text-orange-500/50" />
                       <span>Automation_Core: Active</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4-item highlight cards — 2×2 grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  { icon: <Target size={40} />,   title: "PPC Automation",        sub: "Bid engine & spend control."         },
                  { icon: <Box size={40} />,       title: "Inventory Forecasting", sub: "Restock & stockout prevention."      },
                  { icon: <Search size={40} />,    title: "Keyword Monitoring",    sub: "Rank tracking & alert systems."      },
                  { icon: <BarChart2 size={40} />, title: "Performance Reports",   sub: "Unified data & P&L dashboards."      },
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

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:gap-6 mb-10 md:mb-12">
                <HeroButton
                  href="/contact"
                  className="w-full sm:w-auto text-center justify-center"
                >
                  Automate My Brand
                </HeroButton>

                <a
                  href="#matrix"
                  className="group flex items-center justify-center sm:justify-start gap-3 text-zinc-400 hover:text-zinc-900 font-bold text-[11px] uppercase tracking-widest px-2 py-4 transition-colors no-underline"
                >
                  View Packages <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-left mb-10">
                {[
                  { icon: <ShieldCheck size={11} />, label: "Error Prevention" },
                  { icon: <Activity size={11} />,    label: "Always-On execution" },
                  { icon: <Zap size={11} />,         label: "Workflow Sync" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2">
                    <span className="text-orange-500">{b.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{b.label}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:flex sm:items-center gap-x-10 gap-y-8 mt-10 pt-10 border-t border-zinc-100 text-left">
                {[
                  { label: "Hours Saved/Mo",   val: "200+"  },
                  { label: "Data Integrity",   val: "100%" },
                  { label: "Active Workflows", val: "50+" },
                ].map((t, i) => (
                  <div key={i} className={i === 2 ? "col-span-2 sm:col-span-1" : ""}>
                    <p className="text-xl md:text-2xl font-black tracking-tighter text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>{t.val}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Automation Neural Grid */}
          <div className="lg:col-span-5 relative block mt-0 lg:mt-[70px] scale-[0.95] sm:scale-100 origin-top lg:origin-center" ref={engineRef}>
            <style>{`
              @keyframes node-pulse { 0%, 100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.4); opacity: 1; } }
              @keyframes data-flow { 0% { transform: translateX(-100%); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateX(100%); opacity: 0; } }
              @keyframes hex-breathe { 0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.1); } 50% { box-shadow: 0 0 40px 12px rgba(249,115,22,0.08); } }
              @keyframes pipeline-fill { from { width: 0; } }
              @keyframes workflow-enter { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>

            {/* Floating card - top right: Uptime */}
            <div className="absolute -top-8 -right-2 lg:-right-4 bg-white rounded-[20px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.08)] z-30 border border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white shadow-[0_8px_20px_rgba(139,92,246,0.3)]"><Activity size={18} /></div>
                <div>
                  <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Uptime</p>
                  <p className="text-lg font-black text-zinc-900 tracking-tighter leading-none">99.9%</p>
                </div>
              </div>
            </div>

            {/* Floating card - bottom left: Hours saved */}
            <div className="absolute -left-4 lg:-left-10 bottom-[60px] bg-zinc-900 rounded-2xl px-5 py-4 z-30 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse shadow-[0_0_12px_rgba(139,92,246,0.6)]" />
                <div>
                  <p className="text-[7px] font-mono font-bold uppercase tracking-[0.25em] text-zinc-500">Hours Saved/Mo</p>
                  <p className="text-lg sm:text-xl font-black text-white leading-none tracking-tighter">200+</p>
                </div>
              </div>
            </div>

            {/* Floating card - bottom right: Workflows */}
            <div className="absolute -right-2 lg:-right-6 bottom-[-30px] bg-white rounded-2xl px-5 py-3.5 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-zinc-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center"><Cpu size={14} className="text-violet-500" /></div>
                <div>
                  <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Workflows</p>
                  <p className="text-xs sm:text-sm font-black text-violet-600 tracking-tight leading-none">50+ Active</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-950 rounded-[32px] shadow-[0_60px_120px_rgba(0,0,0,0.4)] border border-white/[0.08] overflow-hidden relative">
              {/* Top accent — violet for automation identity */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

              {/* Header */}
              <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Automation_Core_v2</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                  <span className="text-[8px] font-mono text-violet-500/70 uppercase tracking-widest">ALL SYSTEMS</span>
                </div>
              </div>

              <div className="p-6">
                {/* System Nodes — interconnected visual */}
                <div className="relative h-[160px] flex items-center justify-center mb-6">
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="xMidYMid meet">
                    <line x1="80" y1="80" x2="200" y2="40" stroke="rgba(139,92,246,0.15)" strokeWidth="1" />
                    <line x1="80" y1="80" x2="200" y2="120" stroke="rgba(139,92,246,0.15)" strokeWidth="1" />
                    <line x1="200" y1="40" x2="320" y2="80" stroke="rgba(139,92,246,0.15)" strokeWidth="1" />
                    <line x1="200" y1="120" x2="320" y2="80" stroke="rgba(139,92,246,0.15)" strokeWidth="1" />
                    <line x1="200" y1="40" x2="200" y2="120" stroke="rgba(139,92,246,0.08)" strokeWidth="1" strokeDasharray="4 4" />
                  </svg>

                  {/* Node: Input */}
                  <div className="absolute left-[12%] top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center" style={{ animation: "hex-breathe 3s ease-in-out infinite" }}>
                      <Layers size={18} className="text-orange-500" />
                    </div>
                    <span className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest">Input</span>
                  </div>

                  {/* Node: Process Top */}
                  <div className="absolute left-[42%] top-[10%] flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center" style={{ animation: "hex-breathe 3s ease-in-out 0.5s infinite" }}>
                      <Cpu size={16} className="text-violet-400" />
                    </div>
                    <span className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest">PPC</span>
                  </div>

                  {/* Node: Process Bottom */}
                  <div className="absolute left-[42%] bottom-[10%] flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center" style={{ animation: "hex-breathe 3s ease-in-out 1s infinite" }}>
                      <Box size={16} className="text-violet-400" />
                    </div>
                    <span className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest">Inventory</span>
                  </div>

                  {/* Node: Output */}
                  <div className="absolute right-[12%] top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center" style={{ animation: "hex-breathe 3s ease-in-out 1.5s infinite" }}>
                      <Gauge size={18} className="text-emerald-400" />
                    </div>
                    <span className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest">Output</span>
                  </div>

                  {/* Animated data particles */}
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="absolute left-[20%] top-1/2 -translate-y-1/2 pointer-events-none" style={{ animation: `data-flow 3s ease-in-out ${i * 1}s infinite` }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                    </div>
                  ))}
                </div>

                {/* Active Workflow Pipeline */}
                <div className="bg-white/[0.03] rounded-2xl border border-white/[0.06] p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Workflow Pipeline</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                      <span className="text-[7px] font-mono text-violet-500/80 uppercase tracking-widest">4 ACTIVE</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: "PPC Bid Engine", progress: "92%", status: "Running", color: "from-violet-600 to-violet-400" },
                      { name: "Inventory Sync", progress: "100%", status: "Complete", color: "from-emerald-600 to-emerald-400" },
                      { name: "Price Adjustment", progress: "67%", status: "Running", color: "from-orange-600 to-orange-400" },
                      { name: "P&L Report Gen", progress: "100%", status: "Complete", color: "from-emerald-600 to-emerald-400" },
                    ].map((w, i) => (
                      <div key={i} className="flex items-center gap-3" style={{ animation: `workflow-enter 0.4s ease-out ${i * 0.1}s both` }}>
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${w.status === "Running" ? "bg-violet-500 shadow-[0_0_6px_rgba(139,92,246,0.6)]" : "bg-emerald-500"}`} style={w.status === "Running" ? { animation: `node-pulse 2s ease-in-out ${i * 0.3}s infinite` } : {}} />
                        <span className="text-[9px] font-mono text-zinc-400 w-24 shrink-0 truncate">{w.name}</span>
                        <div className="h-1.5 flex-1 bg-white/[0.04] rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${w.color} rounded-full`} style={{ width: w.progress, animation: `pipeline-fill 1.5s ease-out ${i * 0.2}s both` }} />
                        </div>
                        <span className="text-[9px] font-mono font-bold text-white w-8 text-right">{w.progress}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live System Metrics — 3 columns */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: "Tasks/Day", value: "847", icon: <Zap size={12} />, color: "text-violet-400" },
                    { label: "Accuracy", value: "100%", icon: <ShieldCheck size={12} />, color: "text-emerald-400" },
                    { label: "Latency", value: "0.04s", icon: <Gauge size={12} />, color: "text-orange-400" },
                  ].map((m, i) => (
                    <div key={i} className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06] hover:border-violet-500/20 transition-colors group">
                      <div className={`${m.color} mb-2 opacity-60 group-hover:opacity-100 transition-opacity`}>{m.icon}</div>
                      <p className="text-[15px] font-black text-white tracking-tighter leading-none mb-0.5">{m.value}</p>
                      <p className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* System Health Bar */}
                <div className="bg-white/[0.02] rounded-xl border border-white/[0.04] p-3 flex items-center gap-3">
                  <div className="flex items-center gap-2 shrink-0">
                    <Cpu size={12} className="text-violet-500/60" />
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-bold">System Health</span>
                  </div>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/[0.04]">
                    <div className="h-full w-[99.9%] rounded-full bg-gradient-to-r from-violet-600 to-emerald-400 shadow-[0_0_12px_rgba(139,92,246,0.4)]" style={{ animation: "pipeline-fill 2s ease-out both" }} />
                  </div>
                  <span className="text-[9px] font-mono font-black text-emerald-400 shrink-0">99.9%</span>
                </div>
              </div>
            </div>

            {/* Background glows */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-violet-500/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-500/5 rounded-full blur-[80px] pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
