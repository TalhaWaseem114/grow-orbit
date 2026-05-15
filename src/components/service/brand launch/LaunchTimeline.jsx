import React, { useEffect, useRef } from 'react'
import {
  ShieldCheck,
} from 'lucide-react';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LaunchTimeline() {
  const containerRef = useRef(null)

  useEffect(() => {
    const steps = containerRef.current.querySelectorAll('.timeline-step')

    gsap.fromTo(steps,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    )
  }, [])

  return (
    <section className="py-32 px-6 lg:px-8 bg-white overflow-hidden relative">

  {/* Subliminal Dots Pattern (Left Anchor) */}
  <div
    className="absolute top-0 left-0 w-1/3 h-full opacity-[0.15] pointer-events-none z-0"
    style={{
      backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
      backgroundSize: '24px 24px',
      maskImage: 'linear-gradient(to right, black, transparent)',
      WebkitMaskImage: 'linear-gradient(to right, black, transparent)' // For Safari compatibility
    }}
  />

  <div className="max-w-7xl mx-auto relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
      {/* LEFT COLUMN: THE PROTOCOL */}
      <div className="relative">
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="w-10 h-[1px] bg-orange-500"></span>
          <span className="text-orange-600 font-bold text-[10px] uppercase tracking-[0.5em]">System Protocol</span>
        </div>

        <h2 className="text-5xl lg:text-6xl font-bold tracking-tighter mb-12 text-[#111]">
          Launch <br />
          <span className="text-zinc-300 italic font-serif">Engineering.</span>
        </h2>

        {/* Vertical Timeline */}
        <div className="space-y-0 relative" ref={containerRef}>
          {/* Animated Line Connector */}
          <div className="absolute left-[19px] top-2 bottom-2 w-[1px] bg-zinc-100">
            <div className="w-full h-1/2 bg-gradient-to-b from-orange-500 to-transparent"></div>
          </div>

          {[
            { phase: "Intelligence", desc: "Mapping competitor keyword voids and semantic gaps." },
            { phase: "Positioning", desc: "Establishing your unique authority angle for the A10 algorithm." },
            { phase: "Listing Build", desc: "Engineering high-conversion, SEO-compliant listing metadata." },
            { phase: "Launch Execution", desc: "Strategic PPC pressure-testing and velocity spikes." },
            { phase: "Scale Orbit", desc: "Stabilizing organic rank dominance and defensive positioning." }
          ].map((step, i) => (
            <div key={i} className="timeline-step group flex gap-8 pb-12 last:pb-0 relative z-10">
              {/* Number Circle */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-[10px] font-black text-zinc-400 group-hover:border-orange-500 group-hover:text-orange-500 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-500 shadow-sm overflow-hidden relative">
                <div className="absolute inset-0 bg-orange-500 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-10 transition-all duration-500"></div>
                0{i + 1}
              </div>

              <div className="pt-1">
                <h4 className="text-lg font-bold tracking-tight mb-1 text-[#111] group-hover:text-orange-600 transition-colors">
                  {step.phase}
                </h4>
                <p className="text-zinc-500 font-light text-sm max-w-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: THE DATA TERMINAL */}
      <div className="relative">
        {/* Decorative Background Element (Light Grey Tilt) */}
        <div className="absolute -inset-4 bg-zinc-50 rounded-[54px] -rotate-1 scale-105"></div>

        <div className="relative bg-[#111] rounded-[48px] p-10 lg:p-16 text-white overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)]">
          {/* Orange Corner Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-orange-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
              </div>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">Mission_Report.exe</span>
            </div>

            <h3 className="text-3xl font-bold tracking-tighter mb-6 text-white">The Outcome.</h3>

            <p className="text-zinc-400 font-light mb-12 leading-relaxed italic">
              "We don't measure effort. We measure <span className="text-white font-medium">escape velocity</span>—the exact moment your organic sales overtake ad-driven volume."
            </p>

            <div className="space-y-4">
              {[
                "60% Faster Indexing",
                "Top 10 Category Placement",
                "Minimized Ad Waste"
              ].map((txt, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                    <ShieldCheck className="text-orange-500" size={18} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">{txt}</span>
                </div>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase font-bold">Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <p className="text-[11px] text-zinc-300 font-mono tracking-widest uppercase">ORBIT_STABLE</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase font-bold">Altitude</p>
                <p className="text-[11px] text-zinc-300 font-mono tracking-widest uppercase">35,786 KM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
  )
}
