import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import {
  Search,
  Layers,
  Zap,
  Globe,
  Compass,
  BarChart3,
  Layout,
  Package
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger)

export default function Deliverables() {
  const containerRef = useRef(null)
  const orbitRef = useRef(null)

  useEffect(() => {
    // Staggered entrance for cards
    const cards = containerRef.current.querySelectorAll('.deliverable-card')
    gsap.fromTo(cards,
      { opacity: 0, scale: 0.95, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    )

    // Slow orbit rotation
    gsap.to(orbitRef.current, {
      rotate: 360,
      duration: 100,
      repeat: -1,
      ease: "none"
    })
  }, [])

  return (
    <section className="py-24 bg-white relative overflow-hidden">

      {/* --- VISIBLE ORBIT BACKGROUND PATTERN --- */}
      <div className="absolute inset-0 z-0 pointer-events-none" ref={orbitRef}>

        {/* Large Central Orbiting Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-zinc-100 rounded-full opacity-100"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] border border-zinc-50 rounded-full opacity-100"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] border border-zinc-50 rounded-full opacity-100"></div>

        {/* Technical Data Crosshairs */}
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-zinc-50"></div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-zinc-50"></div>

        {/* High Visibility Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
            <span className="text-[250px] lg:text-[400px] font-black tracking-tighter text-slate-100/40">
              ORBIT
            </span>
        </div>
      </div>

      {/* STANDARD 1400PX CONTAINER */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-400">Inventory v2.0 // Archive</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter text-[#111]">
              The Launch <br />
              <span className="text-orange-500 italic font-serif">Manifest.</span>
            </h2>
          </div>

          <div className="lg:max-w-xs text-right hidden lg:block border-l border-zinc-100 pl-8">
            <p className="text-[10px] font-mono text-zinc-400 leading-relaxed uppercase tracking-widest">
              Ref: ORBIT-DR-2026<br />
              Launch Protocol: A10-V<br />
              Status: Deployment Ready
            </p>
          </div>
        </div>

        {/* The Interactive Blueprint Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4" ref={containerRef}>
          {[
            { label: "Product Validation", icon: <Package size={24}/>, id: "01", span: "md:col-span-2" },
            { label: "Keyword Research", icon: <Search size={24}/>, id: "02", span: "md:col-span-1" },
            { label: "Listing SEO", icon: <Layers size={24}/>, id: "03", span: "md:col-span-1" },
            { label: "Image Strategy", icon: <Compass size={24}/>, id: "04", span: "md:col-span-1" },
            { label: "A+ Planning", icon: <Layout size={24}/>, id: "05", span: "md:col-span-1" },
            { label: "PPC Structure", icon: <Zap size={24}/>, id: "06", span: "md:col-span-2" },
            { label: "Brand Store", icon: <Globe size={24}/>, id: "07", span: "md:col-span-2" },
            { label: "FBA Planning", icon: <BarChart3 size={24}/>, id: "08", span: "md:col-span-2" }
          ].map((item, i) => (
            <div
              key={i}
              className={`${item.span} deliverable-card group relative bg-[#fafafa]/80 backdrop-blur-sm border border-zinc-200 rounded-[32px] p-8 lg:p-10 transition-all duration-700 hover:bg-[#111] overflow-hidden`}
            >
              {/* Internal Blueprint Grid (Only visible on card hover) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                   style={{ backgroundImage: `radial-gradient(white 1px, transparent 1px)`, backgroundSize: '16px 16px' }}></div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="p-4 rounded-2xl bg-white border border-zinc-100 text-zinc-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-400 transition-all duration-500 shadow-sm">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-300 group-hover:text-orange-500/50 transition-colors uppercase tracking-widest">
                    Unit_{item.id}
                  </span>
                </div>

                <div className="mt-16">
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-800 group-hover:text-white transition-colors mb-2">
                    {item.label}
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="h-[2px] w-0 bg-orange-500 group-hover:w-8 transition-all duration-700 delay-100"></div>
                    <span className="text-[9px] font-mono text-zinc-400 group-hover:text-zinc-500 uppercase opacity-0 group-hover:opacity-100 transition-all">
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Light glow on hover */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
