import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BarChart3, Layout, Search, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function MarketFriction() {
  const containerRef = useRef(null)

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll('.friction-card')

    gsap.fromTo(cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    )
  }, [])

  return (
         <section className="py-24 bg-[#FAFAFA] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:items-end mb-16">
            <h2 
              className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.88] lg:w-1/2 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Why most brands <br /> fail to <br className="hidden sm:block" /><span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>escape gravity.</span>
            </h2>
            <p className="text-slate-500 font-light lg:w-1/2 text-lg">
              Launch failure is rarely about the product; it's about friction. Without technical precision, the Amazon algorithm ignores your entry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" ref={containerRef}>
            {[
              { title: "Zero Velocity", desc: "Listings that sit dormant because they lack initial sales-signals.", icon: <Zap size={20}/> },
              { title: "Indexing Gaps", desc: "Missing the 'semantic links' that connect you to high-volume buyers.", icon: <Search size={20}/> },
              { title: "Ad Spend Bleed", desc: "High CPCs caused by poor relevance scores and low-quality listings.", icon: <BarChart3 size={20}/> },
              { title: "Brand Dilution", desc: "Generic visuals that fail to command a premium price over competitors.", icon: <Layout size={20}/> }
            ].map((card, i) => (
              <div key={i} className="friction-card group p-10 bg-white border border-slate-100 rounded-[32px] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-all duration-500 hover:border-orange-500/20">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-orange-600 mb-8 font-bold italic shadow-inner group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                  {React.cloneElement(card.icon, { className: "group-hover:scale-110 transition-transform duration-500" })}
                </div>
                <h4 className="font-bold text-lg mb-3 tracking-tight group-hover:text-orange-600 transition-colors">{card.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-light">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  )
}
