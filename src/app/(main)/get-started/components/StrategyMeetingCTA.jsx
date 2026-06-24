"use client";

import { ArrowRight, PhoneCall, Clock, Search, Target, Lightbulb, ClipboardList, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function StrategyMeetingCTA({ scrollToForm }) {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <section className="py-10 bg-white border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <style>{`
          @keyframes free-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(249,115,22,0.15), 0 0 60px rgba(249,115,22,0.05); }
            50% { box-shadow: 0 0 30px rgba(249,115,22,0.25), 0 0 80px rgba(249,115,22,0.1); }
          }
          @keyframes shimmer-free {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
          @keyframes bounce-arrow {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(6px); }
          }
        `}</style>

        <div
          className="group relative rounded-3xl sm:rounded-[40px] overflow-hidden shadow-[0_0_20px_rgba(249,115,22,0.15),0_0_60px_rgba(249,115,22,0.05)] hover:shadow-2xl transition-shadow duration-500"
        >
          <div className="h-1.5 w-full bg-linear-to-r from-orange-500 via-orange-400 to-amber-400" />
          <div className="relative border border-t-0 border-orange-500/20 rounded-b-3xl sm:rounded-b-[40px] p-5 sm:p-6 lg:p-8 overflow-hidden bg-zinc-950">
            {/* Background Image */}
            <Image
              src="/assets/orbital-cta-bg.png"
              alt="Orbital CTA Background"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-contain opacity-70 pointer-events-none mix-blend-screen scale-x-[-1] right-[25%] absolute"
              style={{ objectPosition: "right center", left: "auto" }}
            />

            {/* Shimmer effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-orange-500/[0.04] to-transparent" style={{ animation: "shimmer-free 4s linear infinite" }} />
            </div>

            {/* Ambient glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)" }} />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)" }} />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

              {/* Left Side */}
              <div className="lg:col-span-7">
                {/* Scarcity Pill */}
                <div className="flex items-start gap-2.5 mb-4 px-3 py-2 rounded-xl sm:rounded-full border border-orange-500/30 bg-orange-500/10 self-stretch sm:self-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shrink-0 mt-1 sm:mt-0" />
                  <span className="text-white font-bold text-[9px] uppercase tracking-[0.25em] sm:tracking-[0.4em] leading-normal sm:leading-none">
                    We onboard only 3–4 brands per month — limited spots open for {currentMonth}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                  <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 px-3 py-1.5 rounded-lg sm:rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-orange-400">100% Free</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg sm:rounded-full">
                    <span className="text-[9px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-zinc-400">No Strings Attached</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 px-3 py-1.5 rounded-lg sm:rounded-full">
                    <span className="text-[9px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-orange-400">Limited Slots</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-5">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500 shrink-0">
                    <PhoneCall size={20} className="sm:hidden" />
                    <PhoneCall size={26} className="hidden sm:block" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-orange-500 mb-1 sm:mb-2">Your journey starts with one conversation.</p>
                    <h3
                      className="text-lg sm:text-2xl lg:text-3xl font-black uppercase tracking-tight leading-tight sm:leading-none text-white"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Free 15-Min Strategy Meeting
                    </h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[11px] sm:text-[12px] font-mono font-bold uppercase tracking-widest text-orange-400">15 min</span>
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-zinc-600">•</span>
                      <span className="text-[10px] sm:text-[11px] font-bold text-zinc-400 line-through">$97 Value</span>
                      <span className="text-[11px] sm:text-[12px] font-black text-orange-400 uppercase">Free</span>
                    </div>
                  </div>
                </div>

                <p className="text-[14px] sm:text-[15px] text-zinc-400 font-light leading-relaxed max-w-xl mb-4">
                  Whether you have a <span className="text-white font-medium">product idea you want to launch</span> or an <span className="text-white font-medium">existing brand you want to scale</span> — this meeting is your starting point. We'll map out exactly where you are, where you want to go, and how to get there.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                  {[
                    "Understand your goals & current stage",
                    "Identify the best path forward for you",
                    "Get a custom roadmap — idea to revenue",
                    "Zero pressure, just clarity",
                  ].map((f, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <CheckCircle2 size={13} className="text-orange-500 shrink-0" />
                      <span className="text-[12px] font-light text-zinc-400">{f}</span>
                    </div>
                  ))}
                </div>

                <p className="text-[13px] text-zinc-500 font-medium italic mb-5 max-w-md">
                  Brand new to Amazon? Already selling? It doesn't matter — we meet you where you are and build from there.
                </p>

                <button
                  onClick={scrollToForm}
                  className="group/btn relative inline-flex items-center gap-4 px-9 py-3.5 bg-linear-to-r from-orange-600 to-orange-400 text-white rounded-xl font-black text-[12px] uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_15px_40px_rgba(249,115,22,0.2)] hover:-translate-y-1"
                >
                  Book My Free Meeting
                  <ArrowRight size={18} className="animate-[bounce-arrow_1.5s_ease-in-out_infinite]" />
                </button>
              </div>

              {/* Right Side - What Happens in 15 Minutes */}
              <div className="lg:col-span-5 w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto relative">
                {/* Glow behind panel */}
                <div className="absolute inset-0 bg-orange-500/10 blur-[60px] rounded-full pointer-events-none" />
                <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.1] rounded-[20px] p-4 space-y-2.5 shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-white/[0.05] to-transparent pointer-events-none" />

                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-orange-500/10 border border-orange-500/20 rounded-xl p-3.5 sm:p-3 gap-2 sm:gap-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse shrink-0" />
                      <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest leading-none pt-[1px]">What Happens in 15 Min</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 pl-5 sm:pl-0">
                      <Clock className="text-orange-400 w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-80" />
                      <span className="text-[8px] sm:text-[9px] font-mono text-zinc-500 uppercase leading-none pt-[1px]">Quick & Focused</span>
                    </div>
                  </div>

                  {/* Steps breakdown */}
                  <div className="space-y-2">
                    <p className="text-[8px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-600 pl-1">Your meeting agenda</p>
                    {[
                      { icon: <Search size={13} />, text: "We learn about your goals, product idea, or existing brand" },
                      { icon: <Target size={13} />, text: "Identify the biggest opportunity to move forward" },
                      { icon: <Lightbulb size={13} />, text: "Share one actionable insight you can use immediately" },
                      { icon: <ClipboardList size={13} />, text: "Map out your next steps — no guesswork" },
                    ].map((item, j) => (
                        <div key={j} className="flex items-center gap-2.5 py-1.5 border-t border-white/5">
                        <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                          {item.icon}
                        </div>
                        <span className="text-[10px] font-medium text-zinc-300 leading-tight">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Who this is for */}
                  <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2.5 space-y-1">
                    <p className="text-[8px] font-mono font-bold uppercase tracking-[0.3em] text-orange-400">Perfect for</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["First-time Sellers", "Product Researchers", "Existing Brands", "DTC → Amazon"].map((tag, j) => (
                        <span key={j} className="text-[8px] font-bold text-zinc-400 bg-white/5 border border-white/10 px-2 py-1 rounded uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Trust signal */}
                  <div className="flex items-center gap-2.5 bg-black/30 rounded-lg px-3 py-2 border border-white/5">
                    <div className="flex -space-x-1.5">
                      {["SM", "JT", "PK"].map((initials, j) => (
                        <div key={j} className="w-6 h-6 rounded-full bg-linear-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-black text-[6px] border border-zinc-950">
                          {initials}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-white">80+ brands started here — from first call to first sale</p>
                      <p className="text-[8px] text-zinc-500">From first call to first sale — we've been there.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap justify-center items-center gap-x-16 gap-y-8 relative z-10">
              {[
                { icon: <Search size={20} />, title: "100% FREE", desc: "No credit card. No catch." },
                { icon: <ClipboardList size={20} />, title: "LIMITED SLOTS", desc: "Only 3-4 brands per month." },
                { icon: <Clock size={20} />, title: "ACT FAST", desc: "Spots fill up every week." },
                { icon: <Target size={20} />, title: "RESULTS DRIVEN", desc: "Strategies built to scale." },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="text-orange-500 shrink-0 opacity-80">{item.icon}</div>
                  <div>
                    <p className="text-[11px] font-black text-white uppercase tracking-[0.1em] mb-1">{item.title}</p>
                    <p className="text-[10px] text-zinc-500 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
