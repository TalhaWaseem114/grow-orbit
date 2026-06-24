"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ArrowRight } from "lucide-react";
import { caseStudyTestimonials } from "@/data/testimonials";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll(".testimonial-card");

    gsap.fromTo(
      cards,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* --- HEADING --- */}
        <div className="mb-16">
          <span className="text-orange-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-3 block">
            TESTIMONIALS
          </span>
          <h2 className="text-[48px] font-montserrat font-black leading-[1] tracking-tighter text-zinc-950 uppercase">
            Client{" "}
            <span
              className="italic font-light text-zinc-400 normal-case"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Feedback
            </span>
          </h2>
        </div>

        {/* --- HORIZONTAL SCROLL CARDS --- */}
        <div
          ref={containerRef}
          className="flex gap-8 overflow-x-auto pb-14 scrollbar-hide snap-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {caseStudyTestimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card flex-shrink-0 w-[340px] md:w-[470px] bg-[#f9f9f9] rounded-[40px] p-10 md:p-12 snap-start border border-gray-100 flex flex-col justify-between transition-all duration-500 hover:bg-white hover:border-orange-100 hover:shadow-xl hover:shadow-black/5"
            >
              <div>
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, starI) => (
                    <Star
                      key={starI}
                      size={14}
                      fill="#f97316"
                      className="text-orange-500"
                    />
                  ))}
                </div>
                <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-900 mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Key Stat */}
                <div className="flex items-center gap-4 mb-8 bg-zinc-950 rounded-2xl px-5 py-4">
                  <span className="text-[11px] font-black uppercase tracking-widest text-orange-500">
                    {t.badge}
                  </span>
                </div>
              </div>

              <div>
                {/* Author */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden relative grayscale brightness-110 shrink-0">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                      placeholder={typeof t.image === 'string' && t.image.includes('cloudinary.com/') ? "blur" : "empty"}
                      blurDataURL={typeof t.image === 'string' && t.image.includes('cloudinary.com/') ? t.image.replace('/upload/', '/upload/w_50,e_blur:1000,q_1,f_auto/') : undefined}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-xl leading-tight">
                      {t.name}
                    </h4>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                      {t.role}
                    </p>
                  </div>
                </div>

                {/* Case Study Link */}
                {t.caseStudyLink && (
                  <Link
                    href={t.caseStudyLink}
                    className="inline-flex items-center gap-2 text-orange-500 font-bold text-[10px] uppercase tracking-widest hover:gap-3 transition-all no-underline group"
                  >
                    Read Full Case Study
                    <ArrowRight
                      size={12}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                )}
              </div>
            </div>
          ))}

          {/* Edge spacing */}
          <div className="flex-shrink-0 w-10 md:w-20" />
        </div>

        {/* Navigation Indicator */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-[1px] bg-gray-200" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            Drag or Scroll to Explore
          </span>
        </div>
      </div>
    </section>
  );
}
