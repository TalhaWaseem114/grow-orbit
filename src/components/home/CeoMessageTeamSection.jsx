"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Quote, Linkedin, Mail, Globe, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function CeoMessageTeamSection() {
  const [activeImage, setActiveImage] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef(null);

  const optimizeCloudinaryUrl = (url, width = 600) => {
    if (!url || typeof url !== "string") return url;
    if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
      return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
    }
    return url;
  };

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

  const teamMembers = [
    {
      name: "Alex Rivera",
      role: "Head of Strategy",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
      linkedin: "#",
    },
    {
      name: "Sarah Chen",
      role: "Lead Creative Director",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
      linkedin: "#",
    },
    {
      name: "Marcus Vane",
      role: "Senior PPC Specialist",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
      linkedin: "#",
    },
    {
      name: "Elena Ross",
      role: "Operations Manager",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1974&auto=format&fit=crop",
      linkedin: "#",
    },
    {
      name: "Daniel Kim",
      role: "DTC Tech Lead",
      img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop",
      linkedin: "#",
    },
  ];

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
    <section className="bg-zinc-50 py-20 sm:py-28 px-6 sm:px-12 relative overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-orange-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-orange-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* CEO MESSAGE SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-16">
          
          {/* Left Side: CEO Image Container */}
          <div className="lg:col-span-5 flex justify-center">
            <div 
              className="relative group w-full max-w-[420px] aspect-[4/5] rounded-[36px] overflow-hidden bg-zinc-200 transition-all duration-300 hover:scale-[1.01]"
              style={{
                border: "3px solid #ffffff",
                boxShadow: "10px 10px 20px rgba(166, 180, 200, 0.35), -10px -10px 20px rgba(255, 255, 255, 1)"
              }}
            >
              <Image
                src={optimizeCloudinaryUrl("https://res.cloudinary.com/dciggvulg/image/upload/v1784040763/grow_orbit_ceo_pics/ali.avif", 800)}
                alt="Coach Ali Haider - CEO & Founder"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover transition-all duration-750 group-hover:scale-105"
                priority
              />
              {/* Image Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
              
              {/* Badge overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                <p className="text-white font-black text-sm uppercase tracking-wider">Coach Ali Haider</p>
                <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mt-1">CEO, Grow Orbit</p>
              </div>
            </div>
          </div>

          {/* Right Side: CEO Message Text */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-6">
              <Quote size={12} className="rotate-180" /> Leadership Message
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black font-montserrat tracking-tight text-zinc-950 uppercase leading-tight mb-8">
              Moving Through Amazon <br/>
              <span className="text-orange-500 italic font-light normal-case" style={{ fontFamily: "'Playfair Display', serif" }}>Like Water.</span>
            </h2>

            <div className="space-y-6 text-zinc-600 text-base sm:text-lg leading-relaxed font-light">
              <p>
                Hey, I'm Ali. I didn't start selling on Amazon because someone showed me a laptop screen full of numbers. I started because I watched ordinary people <span className="text-zinc-950 font-semibold">build something out of nothing</span>, and I wanted to know exactly how.
              </p>
              <p>
                So I studied them. I kept what worked, dropped the hype, and began <span className="text-zinc-950 font-semibold">moving like water</span>: no fixed shape, just finding the path of least resistance. When my first product generated a few hundred dollars a month hands-off, it taught me that <span className="text-zinc-950 font-semibold">income doesn't have to trade hours for dollars</span>. It can just... flow.
              </p>
              <p>
                That belief built the team around me. We aren't here to give you a textbook guru pitch. We are here to <span className="text-zinc-950 font-semibold">show you where the current runs</span>, and help you move through Amazon the same way, being patient, adaptive, and <span className="text-zinc-950 font-semibold">unstoppable</span>. If that sounds like the freedom you've been looking for, let's talk.
              </p>
            </div>

            {/* CEO Sign-off */}
            <div className="mt-10 pt-8 border-t border-zinc-200 flex items-center justify-between">
              <div>
                <p className="font-montserrat font-black text-zinc-950 uppercase tracking-tight text-lg">Coach Ali Haider</p>
                <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mt-1">CEO</p>
              </div>
              <div className="flex gap-3">
                <a
                  href="mailto:support@groworbitofficial.com"
                  className="w-10 h-10 rounded-xl bg-white hover:bg-zinc-900 border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-white transition-all duration-300"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* China Sourcing Trip Gallery - Spanning Full Width under both columns */}
        <div className="mt-12 pt-10 border-t border-zinc-200/80">
          <style>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 font-bold uppercase tracking-wider text-[9px] mb-4">
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
                  className="min-w-[220px] sm:min-w-[280px] md:min-w-[300px] aspect-[3/4] relative rounded-[28px] overflow-hidden bg-zinc-100 group cursor-pointer snap-start transition-all duration-300 hover:scale-[1.01]"
                  onClick={() => setActiveImage(pic)}
                  style={{
                    border: "3px solid #ffffff",
                    boxShadow: "8px 8px 16px rgba(166, 180, 200, 0.35), -8px -8px 16px rgba(255, 255, 255, 1)"
                  }}
                >
                  <Image
                    src={optimizeCloudinaryUrl(pic.img, 500)}
                    alt={pic.title}
                    fill
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 220px, 300px"
                    className="object-cover transition-transform duration-750 ease-out group-hover:scale-105"
                  />
                  {/* Gradient overlay to show text in bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                  
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
            <div className="absolute right-6 sm:right-12 top-0 bottom-6 w-16 sm:w-24 bg-gradient-to-l from-zinc-50/50 to-transparent pointer-events-none z-30" />

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
                className="w-8 h-8 rounded-full border border-zinc-200 hover:border-zinc-400 flex items-center justify-center text-zinc-500 hover:text-zinc-800 transition-all duration-200 bg-white"
              >
                <ArrowLeft size={13} />
              </button>
              <button
                type="button"
                onClick={() => {
                  carouselRef.current?.scrollBy({ left: 320, behavior: "smooth" });
                }}
                className="w-8 h-8 rounded-full border border-zinc-200 hover:border-zinc-400 flex items-center justify-center text-zinc-500 hover:text-zinc-800 transition-all duration-200 bg-white"
              >
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Minimal Scroll Progress Bar */}
            <div className="flex-1 max-w-[120px] h-[2px] bg-zinc-200 rounded-full overflow-hidden relative">
              <div 
                className="absolute top-0 bottom-0 left-0 bg-orange-500 rounded-full transition-all duration-100"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-light">
            <strong className="text-zinc-800 font-semibold">Direct Sourcing & Inspection:</strong> Ali regularly conducts on-site factory audits and supplier visits in major sourcing hubs across China (including Shenzhen and Guangzhou) to verify manufacturing standards, check product durability, and negotiate optimal pricing directly with factory owners.
          </p>
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div 
            className="fixed inset-0 bg-zinc-955/95 z-[100] flex flex-col items-center justify-center p-4 sm:p-6 backdrop-blur-sm transition-all duration-300"
            onClick={() => setActiveImage(null)}
          >
            <div className="relative max-w-2xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full max-h-[70vh] flex items-center justify-center bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
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

        {/* TEAM CARDS SECTION - Styled as a continuation of CEO section */}
        {/*
        <div className="pt-16 border-t border-zinc-200/80">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="flex flex-col group"
              >
                <div className="relative aspect-square rounded-[24px] overflow-hidden bg-zinc-100 border border-zinc-200/30">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-5px] group-hover:translate-y-0">
                    <a
                      href={member.linkedin}
                      className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Linkedin size={14} />
                    </a>
                  </div>
                </div>

                <div className="mt-4 text-center sm:text-left">
                  <h4 className="font-montserrat font-black text-sm uppercase text-zinc-950 leading-tight group-hover:text-orange-500 transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 mt-1.5 leading-none">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        */}

      </div>
    </section>
  );
}
