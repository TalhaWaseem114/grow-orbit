import React, { useEffect, useRef } from "react";
import { RefreshCw, BarChart3, TrendingUp, Activity, MessageSquare, ArrowRight, HeartPulse, CheckCircle2, Repeat, ChevronRight, Zap, Calendar, Target } from "lucide-react";
import gsap from "gsap";
import HeroButton from "@/components/ui/HeroButton";
import SectionLabel from "./SectionLabel";

export default function SupportHero() {
  const widgetRef = useRef(null);

  useEffect(() => {
    gsap.to(widgetRef.current, {
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

      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="support-pattern" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
            <circle cx="60" cy="60" r="0.5" fill="currentColor" opacity="0.5" />
            <path d="M120 0 L120 120 M0 120 L120 120" stroke="currentColor" strokeWidth="0.2" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#support-pattern)" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(249,115,22,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fafafa] to-[#fafafa]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left */}
          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-6 md:-inset-10 z-0 pointer-events-none border-l border-t border-zinc-200/50 rounded-tl-[60px] md:rounded-tl-[100px] opacity-40">
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-orange-500 rounded-tl-xl -translate-x-px -translate-y-px" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-zinc-200 rounded-full translate-x-1 -translate-y-1" />
            </div>
            <div className="relative z-10">
              <SectionLabel>Amazon Brand Growth · Ongoing Support</SectionLabel>

              <h1
                className="text-4xl sm:text-6xl md:text-8xl lg:text-[85px] font-black tracking-tighter leading-[0.9] md:leading-[0.85] mb-8 md:mb-10 text-zinc-900 uppercase text-left"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Ongoing <span className="text-orange-500">Support</span><br />
                <span
                  className="italic font-light lowercase tracking-normal text-zinc-300"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  continuity.
                </span>
              </h1>

              <div className="flex gap-6 mb-10 md:mb-12 text-left">
                <div className="w-[2px] bg-gradient-to-b from-orange-500 to-transparent hidden md:block opacity-50" />
                <div>
                  <div className="text-sm sm:text-base md:text-[22px] text-zinc-500 font-light leading-relaxed max-w-xl mb-6">
                    We don't deliver projects and disappear. Our support model sustains category dominance through continuous iteration, weekly audits, and perpetual growth optimization.
                  </div>
                  <div className="flex flex-wrap gap-x-8 gap-y-4 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Sprint_Cycle: Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RefreshCw size={10} className="text-orange-500/50" />
                      <span>Growth_Loop: Engaged</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-10 text-left">
                {[
                  { icon: <RefreshCw size={32} />,    title: "Weekly Sprints",  sub: "Iterative optimization." },
                  { icon: <BarChart3 size={32} />,    title: "KPI Deep-Dives",  sub: "Performance analytics." },
                  { icon: <HeartPulse size={32} />,   title: "Brand Health",    sub: "Continuous monitoring." },
                  { icon: <MessageSquare size={32} />, title: "Direct Access",   sub: "Slack support channel." },
                ].map((h, i) => (
                  <div key={i} className="relative group bg-white rounded-[20px] md:rounded-[24px] p-5 md:p-6 border border-zinc-100 shadow-[0_10px_20px_rgba(0,0,0,0.06)] hover:border-orange-500/20 hover:shadow-lg hover:shadow-zinc-200/50 transition-all duration-300 overflow-hidden text-left">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mb-3" />
                    <p className="text-xs md:text-sm font-black uppercase tracking-widest text-zinc-900 mb-1 leading-tight">{h.title}</p>
                    <p className="text-[11px] text-zinc-400 font-light leading-snug">{h.sub}</p>
                    <div className="absolute bottom-3 right-3 text-zinc-100 group-hover:text-orange-500/10 transition-colors">{h.icon}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:gap-6 mb-12">
                <HeroButton href="/contact">Start Your Cadence</HeroButton>

                <a
                  href="#matrix"
                  className="group flex items-center justify-center sm:justify-start gap-3 text-zinc-400 hover:text-zinc-900 font-bold text-[11px] uppercase tracking-widest px-2 py-4 transition-colors no-underline"
                >
                  View Packages <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Trust micro-badges */}
              <div className="flex flex-wrap items-center gap-3 text-left mb-10 md:mb-12">
                {[
                  { icon: <RefreshCw size={11} />,    label: "Weekly Optimization Sprints" },
                  { icon: <BarChart3 size={11} />,    label: "Data-Driven Decisions" },
                  { icon: <MessageSquare size={11} />, label: "Dedicated Strategy Team" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2">
                    <span className="text-orange-500">{b.icon}</span>
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-600">{b.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-6 sm:gap-10 mt-10 pt-10 border-t border-zinc-100 text-left">
                {[
                  { label: "Accounts Secured", val: "40+" },
                  { label: "Policy Checks/Wk", val: "100+" },
                  { label: "Response SLA",     val: "<14m" },
                ].map((t, i) => (
                  <div key={i} className="min-w-[100px]">
                    <p className="text-xl md:text-2xl font-black tracking-tighter text-zinc-900 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>{t.val}</p>
                    <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-1">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Growth Pulse Dashboard */}
          <div className="lg:col-span-5 relative block mt-0 lg:mt-[70px] scale-[0.95] lg:scale-100 origin-top lg:origin-center" ref={widgetRef}>
            <style>{`
              @keyframes pulse-wave { 0% { transform: scaleX(0); opacity: 1; } 100% { transform: scaleX(1); opacity: 0; } }

              @keyframes sprint-enter { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
              @keyframes growth-fill { from { width: 0; } }

            `}</style>

            {/* Floating card - top right: Growth Yield */}
            <div className="absolute -top-8 -right-2 lg:-right-4 bg-white rounded-[20px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.08)] z-30 border border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-[0_8px_20px_rgba(244,63,94,0.3)]"><TrendingUp size={18} /></div>
                <div>
                  <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Growth</p>
                  <p className="text-lg font-black text-zinc-900 tracking-tighter leading-none">+18%</p>
                </div>
              </div>
            </div>

            {/* Floating card - bottom left: Sprint Cycle */}
            <div className="absolute -left-4 lg:-left-10 bottom-[60px] bg-zinc-900 rounded-2xl px-5 py-4 z-30 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_12px_rgba(244,63,94,0.6)]" />
                <div>
                  <p className="text-[7px] font-mono font-bold uppercase tracking-[0.25em] text-zinc-500">Active Sprint</p>
                  <p className="text-lg sm:text-xl font-black text-white leading-none tracking-tighter">Week 23</p>
                </div>
              </div>
            </div>

            {/* Floating card - bottom right: Cadence */}
            <div className="absolute -right-2 lg:-right-6 bottom-[-30px] bg-white rounded-2xl px-5 py-3.5 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-zinc-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center"><RefreshCw size={14} className="text-rose-500" /></div>
                <div>
                  <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Cadence</p>
                  <p className="text-xs sm:text-sm font-black text-rose-600 tracking-tight leading-none">WEEKLY</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-950 rounded-[32px] shadow-[0_60px_120px_rgba(0,0,0,0.4)] border border-white/[0.08] overflow-hidden relative">
              {/* Top accent — rose/pink for support identity */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent" />

              {/* Header */}
              <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Growth_Cadence_v2</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-[8px] font-mono text-rose-500/70 uppercase tracking-widest">CYCLING</span>
                </div>
              </div>

              <div className="p-6">
                {/* Heartbeat Pulse Visual */}
                <div className="relative h-[120px] flex items-center justify-center mb-6 overflow-hidden">
                  {/* SVG Heartbeat Line */}
                  <svg className="absolute w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
                    <path
                      d="M0,60 L60,60 L80,20 L100,100 L120,40 L140,80 L160,60 L200,60 L220,25 L240,95 L260,45 L280,75 L300,60 L400,60"
                      fill="none"
                      stroke="url(#pulse-grad)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="drop-shadow-[0_0_6px_rgba(244,63,94,0.5)]"
                    />
                    <defs>
                      <linearGradient id="pulse-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(244,63,94,0.2)" />
                        <stop offset="30%" stopColor="#f43f5e" />
                        <stop offset="70%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="rgba(249,115,22,0.2)" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Central pulse core */}
                  <div
                    className="relative z-10 w-[80px] h-[80px] rounded-full flex flex-col items-center justify-center"
                    style={{
                      background: "radial-gradient(circle at 40% 35%, rgba(244,63,94,0.15), rgba(24,24,27,1) 70%)",
                      border: "1px solid rgba(244,63,94,0.25)"
                    }}
                  >
                    <HeartPulse size={18} className="text-rose-400 mb-1" />
                    <p className="text-[7px] font-mono text-rose-500/80 font-black uppercase tracking-widest">GROWTH</p>
                    <p className="text-[13px] font-black text-white uppercase tracking-tighter leading-none">+18%</p>
                  </div>

                  {/* Corner labels */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-[7px] font-mono text-rose-500/70 uppercase tracking-widest font-bold">SPRINT ACTIVE</span>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <span className="text-[7px] font-mono text-zinc-700 uppercase tracking-widest">WEEK 23/52</span>
                  </div>
                </div>

                {/* Sprint Timeline */}
                <div className="bg-white/[0.03] rounded-2xl border border-white/[0.06] p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Sprint Timeline</span>
                    <div className="flex items-center gap-1.5">
                      <RefreshCw size={10} className="text-rose-500/60" />
                      <span className="text-[7px] font-mono text-rose-500/80 uppercase tracking-widest">ITERATING</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { task: "Weekly KPI audit", week: "W23", status: "Running", color: "from-rose-600 to-rose-400", progress: "65%" },
                      { task: "Keyword refresh", week: "W23", status: "Complete", color: "from-emerald-600 to-emerald-400", progress: "100%" },
                      { task: "A+ content update", week: "W22", status: "Complete", color: "from-emerald-600 to-emerald-400", progress: "100%" },
                      { task: "PPC bid review", week: "W23", status: "Running", color: "from-orange-600 to-orange-400", progress: "82%" },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center gap-3" style={{ animation: `sprint-enter 0.4s ease-out ${i * 0.1}s both` }}>
                        <span className="text-[8px] font-mono text-zinc-600 w-8 shrink-0">{s.week}</span>
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.status === "Running" ? "bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.6)]" : "bg-emerald-500"}`} />
                        <span className="text-[9px] font-mono text-zinc-400 w-28 shrink-0 truncate">{s.task}</span>
                        <div className="h-1.5 flex-1 bg-white/[0.04] rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${s.color} rounded-full`} style={{ width: s.progress, animation: `growth-fill 1.5s ease-out ${i * 0.2}s both` }} />
                        </div>
                        <span className="text-[9px] font-mono font-bold text-white w-10 text-right">{s.progress}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: "Sprints Done", value: "23", icon: <Calendar size={12} />, color: "text-rose-400" },
                    { label: "Growth Yield", value: "+18%", icon: <TrendingUp size={12} />, color: "text-emerald-400" },
                    { label: "Tasks/Week", value: "14", icon: <Target size={12} />, color: "text-orange-400" },
                  ].map((m, i) => (
                    <div key={i} className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06] hover:border-rose-500/20 transition-colors group">
                      <div className={`${m.color} mb-2 opacity-60 group-hover:opacity-100 transition-opacity`}>{m.icon}</div>
                      <p className="text-[15px] font-black text-white tracking-tighter leading-none mb-0.5">{m.value}</p>
                      <p className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Growth Momentum Bar */}
                <div className="bg-white/[0.02] rounded-xl border border-white/[0.04] p-3 flex items-center gap-3">
                  <div className="flex items-center gap-2 shrink-0">
                    <HeartPulse size={12} className="text-rose-500/60" />
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Momentum</span>
                  </div>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/[0.04]">
                    <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-rose-600 to-orange-400 shadow-[0_0_12px_rgba(244,63,94,0.4)]" style={{ animation: "growth-fill 2s ease-out both" }} />
                  </div>
                  <span className="text-[9px] font-mono font-black text-rose-400 shrink-0">92%</span>
                </div>
              </div>
            </div>

            {/* Background glows */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-rose-500/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose-500/5 rounded-full blur-[80px] pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
