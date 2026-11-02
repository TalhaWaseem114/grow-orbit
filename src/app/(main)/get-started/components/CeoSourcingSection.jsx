"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Quote, Mail, Globe, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, MapPin, ShieldCheck, Plane } from "lucide-react";

export default function CeoSourcingSection({ scrollToForm }) {
  const [activeImage, setActiveImage] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") setActiveImage(null);
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activeImage]);

  const handleScroll = () => {
    if (typeof window === "undefined") return;
    window.requestAnimationFrame(() => {
      const container = carouselRef.current;
      if (!container) return;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const progress = maxScroll > 0 ? (container.scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
      setCanScrollLeft(container.scrollLeft > 2);
      setCanScrollRight(container.scrollLeft < maxScroll - 2);
    });
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

  // Cloudinary image optimization helper (auto format AVIF/WebP, auto quality, & max width capping)
  const optimizeCloudinaryUrl = (url, width = 600) => {
    if (!url || typeof url !== "string") return url;
    if (url.includes("cloudinary.com") && !url.includes("f_auto,q_auto")) {
      return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
    }
    return url;
  };

  const sourcingPics = [
    {
      img: "https://res.cloudinary.com/dciggvulg/image/upload/v1784040764/grow_orbit_ceo_pics/2.avif",
      title: "Guangzhou Sourcing Expo",
      desc: "Vetting new suppliers, inspecting product catalogs, and verifying manufacturer credentials on the ground."
    },
    {
      img: "https://res.cloudinary.com/dciggvulg/image/upload/v1784040765/grow_orbit_ceo_pics/3.avif",
      title: "Direct Factory Contract Deal",
      desc: "Negotiating direct supply terms and securing favorable pricing without middleman markups."
    },
    {
      img: "https://res.cloudinary.com/dciggvulg/image/upload/v1784040766/grow_orbit_ceo_pics/4.avif",
      title: "Minstar Factory Quality Audit",
      desc: "Inspecting raw materials, tooling standards, and quality control procedures on the assembly floor."
    },
    {
      img: "https://res.cloudinary.com/dciggvulg/image/upload/v1784040767/grow_orbit_ceo_pics/5.avif",
      title: "On-Site Production Inspection",
      desc: "Reviewing manufacturing capacity and building long-term ties directly on the factory floor."
    },
    {
      img: "https://res.cloudinary.com/dciggvulg/image/upload/v1784040768/grow_orbit_ceo_pics/6.avif",
      title: "Executive Supplier Partnership",
      desc: "Establishing strategic manufacturer partnerships to lock in priority production scheduling."
    },
    {
      img: "https://res.cloudinary.com/dciggvulg/image/upload/v1784040769/grow_orbit_ceo_pics/7.avif",
      title: "Transit Between Supplier Hubs",
      desc: "Traveling across manufacturing cities by high-speed rail for back-to-back factory audits."
    },
    {
      img: "https://res.cloudinary.com/dciggvulg/image/upload/v1784040771/grow_orbit_ceo_pics/8.avif",
      title: "Strategic Supplier Dinner",
      desc: "Building trusted executive relationships with factory owners for priority lead times and negotiation leverage."
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

          {/* Left Side: CEO Image Container with seamless bottom gradient & warm ambient glow */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[400px] flex items-center justify-center">
              {/* Balanced Warm Ambient Glow behind the card */}
              <div
                className="absolute -inset-6 sm:-inset-10 rounded-full blur-[75px] opacity-70 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at center, rgba(249, 115, 22, 0.32) 0%, rgba(234, 88, 12, 0.16) 45%, transparent 72%)",
                }}
              />
              <div className="absolute -top-6 -left-6 w-56 h-56 bg-orange-500/20 rounded-full blur-[60px] pointer-events-none" />

              {/* CEO Image Card */}
              <div
                className="relative z-10 group w-full aspect-[4/5] rounded-[32px] overflow-hidden bg-zinc-900 transition-all duration-500 hover:scale-[1.01]"
                style={{
                  border: "4px solid rgba(255, 255, 255, 0.15)",
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(249, 115, 22, 0.15)",
                }}
              >
              <Image
                src={optimizeCloudinaryUrl("https://res.cloudinary.com/dciggvulg/image/upload/v1784040763/grow_orbit_ceo_pics/ali.avif", 600)}
                alt="Coach Ali Haider - CEO & Founder"
                fill
                sizes="(max-width: 640px) 90vw, 400px"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />

              {/* Seamless Dark Gradient Rising from the Bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 via-35% to-transparent pointer-events-none" />

              {/* Clean text right on the gradient (no clunky box) */}
              <div className="absolute bottom-6 left-7 right-7 z-10">
                <p className="text-white font-montserrat font-black text-xl sm:text-2xl uppercase tracking-tight leading-none drop-shadow-md">
                  Coach Ali Haider
                </p>
                <p className="text-orange-500 text-xs sm:text-sm font-bold uppercase tracking-widest mt-1.5 drop-shadow">
                  CEO, Grow Orbit
                </p>
              </div>
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
                At Grow Orbit, we drop the hype and <span className="text-white font-semibold">build winning brands</span>. Whether launching from <span className="text-white font-semibold">ground zero</span> or <span className="text-white font-semibold">scaling an established store</span>, we physically visit factories in China and handle logistics firsthand so you can <span className="text-white font-semibold">launch and scale safely</span>. Ready to build or expand? Let's talk.
              </p>
            </div>

            {/* "Verified On-The-Ground" Trust Badges (Borderless) */}
            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 text-zinc-200 hover:text-white hover:bg-zinc-800/80 text-xs font-semibold tracking-tight transition-colors">
                <MapPin size={13} className="text-orange-400 shrink-0" />
                <span>Direct Factory Audits</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 text-zinc-200 hover:text-white hover:bg-zinc-800/80 text-xs font-semibold tracking-tight transition-colors">
                <ShieldCheck size={13} className="text-orange-400 shrink-0" />
                <span>Zero Middleman Markups</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 text-zinc-200 hover:text-white hover:bg-zinc-800/80 text-xs font-semibold tracking-tight transition-colors">
                <Plane size={13} className="text-orange-400 shrink-0" />
                <span>Annual Sourcing Trips</span>
              </div>
            </div>

            {/* CEO Sign-off & Direct Call CTA */}
            <div className="mt-8 pt-7 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <p className="font-montserrat font-black text-white uppercase tracking-tight text-lg">Coach Ali Haider</p>
                <p className="text-orange-500 text-xs font-bold tracking-widest uppercase mt-0.5">CEO & Founder, Grow Orbit</p>
              </div>
              <div className="flex items-center gap-3">
                {scrollToForm && (
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_6px_25px_rgba(249,115,22,0.45)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <span>Talk To Ali (Free 15-Min Call)</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
                <a
                  href="mailto:support@groworbitofficial.com"
                  aria-label="Email support"
                  className="w-10 h-10 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white transition-all duration-300"
                  title="Email Coach Ali"
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
              aria-label="Previous image"
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
                    border: "3px solid rgba(255, 255, 255, 0.07)",
                    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.6)"
                  }}
                >
                  <Image
                    src={optimizeCloudinaryUrl(pic.img, 400)}
                    alt={pic.title}
                    fill
                    sizes="(max-width: 640px) 220px, 280px"
                    loading="lazy"
                    decoding="async"
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
              aria-label="Next image"
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
                aria-label="Previous image"
                className="w-8 h-8 rounded-full border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-200 bg-zinc-900"
              >
                <ArrowLeft size={13} />
              </button>
              <button
                type="button"
                onClick={() => {
                  carouselRef.current?.scrollBy({ left: 320, behavior: "smooth" });
                }}
                aria-label="Next image"
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

        {/* Lightbox Modal rendered via Portal to escape all stacking contexts */}
        {mounted && activeImage && createPortal(
          <div
            className="fixed inset-0 bg-black/95 z-[999999] flex flex-col items-center justify-center p-4 sm:p-6 backdrop-blur-md transition-all duration-300"
            onClick={() => setActiveImage(null)}
          >
            <div className="relative max-w-2xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full max-h-[75vh] flex items-center justify-center bg-zinc-950 rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                <button
                  className="absolute top-4 right-4 text-white hover:text-orange-400 bg-black/70 hover:bg-zinc-900 border border-white/20 w-9 h-9 rounded-full flex items-center justify-center text-xl font-light focus:outline-none transition-all z-40 cursor-pointer"
                  onClick={() => setActiveImage(null)}
                  aria-label="Close modal"
                >
                  &times;
                </button>
                <img
                  src={activeImage.img}
                  alt={activeImage.title}
                  className="max-h-[75vh] max-w-full object-contain"
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
          </div>,
          document.body
        )}

      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent z-20" />
    </section>
  );
}
