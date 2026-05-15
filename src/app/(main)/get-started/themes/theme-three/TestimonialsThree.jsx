"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "James Potter",
    role: "Alpha Athletics",
    text: "In 2024, we needed a trusted team to manage our Amazon expansion. Grow Orbit delivered. Their system, communication, and results have been outstanding.",
    stars: 5,
  },
  {
    name: "Sophie Lee",
    role: "Pampas Beauty",
    text: "We finally found a team that doesn't just run ads, but truly understands how to build a profitable, scalable brand on Amazon from the ground up.",
    stars: 5,
  },
  {
    name: "Mark D.",
    role: "Nutri Pure",
    text: "Their data-driven approach and creative execution helped us scale profitably every single month. The ROI speaks for itself.",
    stars: 5,
  },
];

export default function TestimonialsThree() {
  return (
    <section className="py-28" style={{ background: "#050505", fontFamily: "'Montserrat', sans-serif" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-8 h-[1px] bg-orange-500/30" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-orange-500">
              Clients Love Working With Us
            </span>
            <div className="w-8 h-[1px] bg-orange-500/30" />
          </div>
          <h2 className="text-3xl md:text-[44px] font-[900] text-white tracking-tight leading-[1.1]">
            What Our Clients Say
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group p-9 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-orange-500/20 transition-all duration-500 relative"
            >
              {/* Quote icon */}
              <Quote
                size={36}
                className="text-orange-500/10 absolute top-7 right-7 group-hover:text-orange-500/20 transition-colors"
              />

              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {[...Array(t.stars)].map((_, idx) => (
                  <Star key={idx} size={11} fill="#f97316" color="#f97316" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-[13px] text-zinc-300 leading-[1.8] mb-8 font-medium italic">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3.5 pt-7 border-t border-white/[0.04]">
                <div className="w-11 h-11 rounded-full bg-zinc-800 flex items-center justify-center text-[11px] font-[900] text-zinc-500">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="text-[12px] font-[900] text-white">{t.name}</div>
                  <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
