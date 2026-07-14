"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Quote, Mail, Globe, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function CeoSourcingSection() {
  const [activeImage, setActiveImage] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef(null);

  const handleScroll = () => {
    const container = carouselRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const progress = maxScroll > 0 ? (container.scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(progress);
    setCanScrollLeft(container.scrollLeft > 2);
    setCanScrollRight(container.scrollLeft < maxScroll - 2);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      handleScroll();
    }, 100);
    window.addEventListener("resize", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const sourcingPics = [
    {
      img: "https://res.cloudinary.com/dciggvulg/image/upload/v1784040764/grow_orbit_ceo_pics/2.avif",
      title: "Guangzhou Sourcing Fair",
      desc: "Meeting with suppliers to inspect product catalogs and verify manufacturing credentials."
    },
    {
      img: "https://res.cloudinary.com/dciggvulg/image/upload/v1784040765/grow_orbit_ceo_pics/3.avif",
      title: "Supplier Partnership Agreement",
      desc: "Securing exclusive distribution rights and direct supply contracts for our clients' brands."
    },
    {
      img: "https://res.cloudinary.com/dciggvulg/image/upload/v1784040766/grow_orbit_ceo_pics/4.avif",
      title: "Quality Check at Minstar Factory",
      desc: "On-site quality audit of raw materials and strict inspection of production lines."
    },
    {
      img: "https://res.cloudinary.com/dciggvulg/image/upload/v1784040767/grow_orbit_ceo_pics/5.avif",
      title: "Supplier Factory Visit",
      desc: "Fostering long-term supplier relationships directly on the manufacturing shop floor."
    },
    {
      img: "https://res.cloudinary.com/dciggvulg/image/upload/v1784040768/grow_orbit_ceo_pics/6.avif",
      title: "Sourcing Welcome Ceremony",
      desc: "Establishing close strategic ties to ensure priority production scheduling."
    },
    {
      img: "https://res.cloudinary.com/dciggvulg/image/upload/v1784040769/grow_orbit_ceo_pics/7.avif",
      title: "Sourcing Center, China",
      desc: "Reviewing logistics hubs and checking packaging durability on-site."
    },
    {
      img: "https://res.cloudinary.com/dciggvulg/image/upload/v1784040771/grow_orbit_ceo_pics/8.avif",
      title: "Relationship Building Dinner",
      desc: "Developing strong supplier relationships beyond business discussions for better negotiations."
    }
  ];

  return (
    <section className="py-20 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-orange-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-orange-500/[0.01] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* CEO MESSAGE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-16">
          
          {/* Left Side: CEO Image Container */}
          <div className="lg:col-span-5 flex justify-center">
            <div 
              className="relative group w-full max-w-[400px] aspect-[4/5] rounded-[36px] overflow-hidden bg-zinc-900 transition-all duration-300 hover:scale-[1.01]"
              style={{
                border: "3px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.5), -10px -10px 30px rgba(255, 255, 255, 0.02)"
              }}
            >
              <Image
                src="https://res.cloudinary.com/dciggvulg/image/upload/v1784040763/grow_orbit_ceo_pics/ali.avif"
                alt="Coach Ali Haider - CEO & Founder"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-all duration-750 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                <p className="text-white font-black text-sm uppercase tracking-wider">Coach Ali Haider</p>
                <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mt-1">CEO, Grow Orbit</p>
              </div>
            </div>
          </div>

          {/* Right Side: CEO Message Text (Shorter & Dark Theme) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-6">
              <Quote size={12} className="rotate-180" /> Partner Message
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black font-montserrat tracking-tight text-white uppercase leading-tight mb-8">
              Sourcing & Scaling <br/>
              <span className="text-orange-500 italic font-light normal-case" style={{ fontFamily: "'Playfair Display', serif" }}>At the Source.</span>
            </h2>

            <div className="space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
              <p>
                Hey, I'm Ali. I didn't start selling on Amazon because I wanted to look at spreadsheets. I started because I wanted to <span className="text-white font-semibold">build something out of nothing</span>.
              </p>
              <p>
                At Grow Orbit, we study what works, drop the hype, and show you where the current runs. We physically visit factories in China, verify quality, and manage logistics firsthand so you can scale safely. If you're ready to grow your brand with a team that acts like partners, let's talk.
              </p>
            </div>

            {/* CEO Sign-off */}
            <div className="mt-10 pt-8 border-t border-zinc-800 flex items-center justify-between">
              <div>
                <p className="font-montserrat font-black text-white uppercase tracking-tight text-lg">Coach Ali Haider</p>
                <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mt-1">CEO</p>
              </div>
              <div className="flex gap-3">
                <a
                  href="mailto:support@groworbitofficial.com"
                  className="w-10 h-10 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white transition-all duration-300"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* China Sourcing Trip Gallery - Spanning Full Width */}
        <div className="mt-12 pt-10 border-t border-zinc-800">
          <style>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-500 font-bold uppercase tracking-wider text-[9px] mb-4">
            <Globe size={10} /> Sourcing Trip Highlights
          </div>
          
          {/* Carousel Slider Wrapper with Left/Right floating overlay arrows */}
          <div className="relative group/carousel mb-5 -mr-6 sm:-mr-12 pr-6 sm:pr-12">
            {/* Left Floating Arrow */}
            <button
              type="button"
              onClick={() => {
                carouselRef.current?.scrollBy({ left: -320, behavior: "smooth" });
              }}
              className={`absolute left-2 sm:-left-6 lg:-left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-zinc-950/80 hover:bg-orange-500 border border-white/10 flex items-center justify-center text-white/90 hover:text-white transition-all duration-300 z-35 shadow-lg ${
                canScrollLeft ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-90"
              }`}
              title="Previous"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Horizontal Sourcing Carousel Slider (Going off-screen) */}
            <div 
              ref={carouselRef}
              onScroll={handleScroll}
              className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth select-none no-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {sourcingPics.map((pic, i) => (
                <div 
                  key={i} 
                  className="min-w-[220px] sm:min-w-[280px] md:min-w-[300px] aspect-[3/4] relative rounded-[28px] overflow-hidden bg-zinc-900 group cursor-pointer snap-start transition-all duration-300 hover:scale-[1.01]"
                  onClick={() => setActiveImage(pic)}
                  style={{
                    border: "3px solid rgba(255, 255, 255, 0.15)",
                    boxShadow: "8px 8px 24px rgba(0, 0, 0, 0.6), -8px -8px 24px rgba(255, 255, 255, 0.01)"
                  }}
                >
                  <Image
                    src={pic.img}
                    alt={pic.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 300px"
                    className="object-cover transition-transform duration-750 ease-out group-hover:scale-105"
                  />
                  {/* Gradient overlay to show text in bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
                  
                  {/* Text badge at bottom */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <p className="text-white font-montserrat font-semibold text-[11px] sm:text-xs uppercase tracking-tight leading-tight">
                      {pic.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Fade Mask (aligned with visible screen edge to prevent sharp cuts) */}
            <div className="absolute right-6 sm:right-12 top-0 bottom-6 w-16 sm:w-24 bg-gradient-to-l from-zinc-950/50 to-transparent pointer-events-none z-30" />

            {/* Right Floating Arrow */}
            <button
              type="button"
              onClick={() => {
                carouselRef.current?.scrollBy({ left: 320, behavior: "smooth" });
              }}
              className={`absolute right-8 sm:right-16 lg:right-20 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-zinc-950/80 hover:bg-orange-500 border border-white/10 flex items-center justify-center text-white/90 hover:text-white transition-all duration-300 z-35 shadow-lg ${
                canScrollRight ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-90"
              }`}
              title="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Minimal Custom Slider Controls */}
          <div className="flex items-center gap-6 max-w-sm mb-6">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  carouselRef.current?.scrollBy({ left: -320, behavior: "smooth" });
                }}
                className="w-8 h-8 rounded-full border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-200 bg-zinc-900"
              >
                <ArrowLeft size={13} />
              </button>
              <button
                type="button"
                onClick={() => {
                  carouselRef.current?.scrollBy({ left: 320, behavior: "smooth" });
                }}
                className="w-8 h-8 rounded-full border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-200 bg-zinc-900"
              >
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Minimal Scroll Progress Bar */}
            <div className="flex-1 max-w-[120px] h-[2px] bg-zinc-800 rounded-full overflow-hidden relative">
              <div 
                className="absolute top-0 bottom-0 left-0 bg-orange-500 rounded-full transition-all duration-100"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
            <strong className="text-zinc-200 font-semibold">Direct Sourcing & Inspection:</strong> Ali regularly conducts on-site factory audits and supplier visits in major sourcing hubs across China (including Shenzhen and Guangzhou) to verify manufacturing standards, check product durability, and negotiate optimal pricing directly with factory owners.
          </p>
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div 
            className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-4 sm:p-6 backdrop-blur-sm transition-all duration-300"
            onClick={() => setActiveImage(null)}
          >
            <div className="relative max-w-2xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full max-h-[70vh] flex items-center justify-center bg-zinc-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <button 
                  className="absolute top-4 right-4 text-white hover:scale-105 bg-black/60 hover:bg-zinc-900 border border-white/15 w-8 h-8 rounded-full flex items-center justify-center text-lg font-light focus:outline-none transition-all z-40"
                  onClick={() => setActiveImage(null)}
                >
                  &times;
                </button>
                <img
                  src={activeImage.img}
                  alt={activeImage.title}
                  className="max-h-[70vh] max-w-full object-contain"
                />
              </div>
              <div className="text-center mt-4 max-w-xl px-2">
                <h4 className="text-white font-montserrat font-black uppercase tracking-tight text-base sm:text-lg">
                  {activeImage.title}
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm mt-1.5 font-light leading-relaxed">
                  {activeImage.desc}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent z-20" />
    </section>
  );
}
