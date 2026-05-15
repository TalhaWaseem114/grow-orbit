"use client";

import React, { useState } from "react";
import { Plus, MessageSquare, ArrowRight } from "lucide-react";

const faqs = [
  {
    q: "How is Grow Orbit different from other Amazon agencies?",
    a: "Unlike traditional agencies that only focus on PPC or SEO, we provide a holistic growth engine. We integrate strategy, creative, operations, and advertising into a single compounding system that drives long-term, sustainable results.",
  },
  {
    q: "How long does it take to see results?",
    a: "While immediate improvements in ROAS and conversion rates often happen within 30 days, we typically look at a 90-day window for full system integration and significant scaling across all channels.",
  },
  {
    q: "Do you work with new or launching products?",
    a: "Absolutely. We have a specific 'Launch Protocol' designed to build authority, velocity, and keyword ranking for new brands entering the Amazon marketplace from day one.",
  },
  {
    q: "What is your pricing structure?",
    a: "We offer both performance-based models and flat-fee management tailored to the size and needs of your brand. Schedule a free growth audit and we'll create a custom proposal.",
  },
];

export default function FAQThree({ scrollToForm }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="py-28" style={{ background: "#050505", fontFamily: "'Montserrat', sans-serif" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-3 gap-14">
          {/* ── Left: Accordion ── */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-14">
              <div className="inline-flex items-center gap-2 mb-5">
                <div className="w-8 h-[1px] bg-orange-500/30" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-orange-500">
                  FAQ
                </span>
                <div className="w-8 h-[1px] bg-orange-500/30" />
              </div>
              <h2 className="text-3xl md:text-[44px] font-[900] text-white tracking-tight leading-[1.1]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => {
                const isOpen = openIdx === i;
                return (
                  <div
                    key={i}
                    className={`rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? "bg-white/[0.03] border-white/[0.08]"
                        : "bg-transparent border-white/[0.04] hover:border-white/[0.08]"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIdx(isOpen ? -1 : i)}
                      className="w-full px-7 py-6 flex items-center justify-between text-left gap-4"
                    >
                      <span className="text-[13px] font-bold text-white leading-snug">
                        {faq.q}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          isOpen
                            ? "rotate-45 text-orange-500 border-orange-500/30 bg-orange-500/10"
                            : "text-zinc-600 border-white/[0.08]"
                        }`}
                      >
                        <Plus size={14} />
                      </div>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-48" : "max-h-0"
                      }`}
                    >
                      <div className="px-7 pb-7 text-[13px] text-zinc-400 leading-[1.8] font-medium">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right: CTA card ── */}
          <div className="relative">
            <div className="sticky top-32 p-10 rounded-[36px] bg-zinc-900 border border-white/[0.06] overflow-hidden">
              {/* Glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-8">
                  <MessageSquare size={28} strokeWidth={1.8} />
                </div>

                <h3 className="text-xl font-[900] text-white mb-3">
                  Still have questions?
                </h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed mb-10 max-w-[200px]">
                  Let's talk about your brand and how we can engineer your growth.
                </p>

                <button
                  onClick={scrollToForm}
                  className="w-full py-4 bg-white/[0.04] border border-white/[0.08] rounded-xl font-black text-[10px] uppercase tracking-widest text-white hover:bg-orange-500 hover:border-orange-500 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  Book a Free Call <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
