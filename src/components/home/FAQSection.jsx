"use client";

import React, { useState } from "react";
import { Plus, Minus, ChevronRight, Terminal } from "lucide-react";

/* ─────────────────────────────────────────
   HOMEPAGE FAQ
   Exactly 7 questions.
   2–3 short sentences max each.
   First question open by default.
───────────────────────────────────────── */
const faqs = [
  {
    q: "When will I start seeing results?",
    a: "Most brands see early improvements in ads and conversion within 2–4 weeks. Organic growth builds over the next 30–60 days. Clear revenue impact usually shows within the first 45 days."
  },
  {
    q: "What makes Grow Orbit different from other agencies?",
    a: "Most agencies handle one part of your account. We manage everything together so each improvement supports the next. That’s how brands actually grow instead of staying flat."
  },
  {
    q: "Do I need to commit long-term?",
    a: "No. We work month-to-month with no lock-in. You stay because the results make sense, not because you're tied into a contract."
  },
  {
    q: "Is this right for my brand’s current stage?",
    a: "Best fit is brands doing $10K–$5M+ per month on Amazon. If you're earlier, we’ll guide you toward the right starting point. We’ll be honest about what makes sense for you."
  },
  {
    q: "Can you take over my existing account?",
    a: "Yes — many of our clients come with live accounts. We audit first, identify what’s holding you back, and fix that before scaling. Your current sales stay stable during the transition."
  },
  {
    q: "I’ve been burned by agencies before. Why is this different?",
    a: "Most agencies make surface changes and send reports. We focus on what actually drives growth and show you exactly what’s being done. You’ll always know where your money is going."
  },
  {
    q: "What kind of budget do I need?",
    a: "It depends on your current stage and goals. Most brands we work with are already generating revenue. We’ll give you a clear recommendation based on your situation."
  }
];

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-6 h-[2px] bg-orange-500" />
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
        {children}
      </span>
    </div>
  );
}

export default function FAQSection({ scrollToForm }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="py-32 bg-white border-t border-zinc-100"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          {/* ── Left: sticky heading ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
            <SectionLabel>Frequently Asked</SectionLabel>
            <h2
              className="text-[48px] font-black tracking-tighter uppercase leading-[1] mb-8 text-zinc-950"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Frequently Asked<br />
              <span
                className="italic font-light text-zinc-300 lowercase tracking-normal"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                questions.
              </span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-sm mb-12">
              The questions every brand asks before working with us — answered honestly, without fluff.
            </p>

            {/* Support card */}
            <div className="p-8 bg-[#fafafa] rounded-3xl border border-zinc-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">
                  Still Have Questions?
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Every brand's situation is different. Book a free 15-minute call — we'll answer everything specific to your account.
              </p>
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 text-orange-500 font-bold text-[10px] uppercase tracking-widest hover:gap-3 transition-all no-underline text-left pointer-events-auto cursor-pointer"
              >
                Book Free Call <ChevronRight size={11} />
              </button>
            </div>
          </div>

          {/* ── Right: accordion ── */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border transition-all duration-500 rounded-[24px] overflow-hidden ${
                  openIndex === i
                    ? "bg-[#fafafa] border-orange-500/30 shadow-xl shadow-orange-500/5"
                    : "bg-white border-zinc-100 hover:border-zinc-200"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-5 sm:px-8 py-7 text-left group focus-visible:ring-2 focus-visible:ring-orange-500/50 outline-none"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-content-${i}`}
                >
                  <div className="flex items-center gap-5" id={`faq-button-${i}`}>
                    <span className={`text-[11px] font-mono transition-colors shrink-0 ${
                      openIndex === i ? "text-orange-500" : "text-zinc-300"
                    }`}>
                      0{i + 1}
                    </span>
                    <span className="text-[15px] font-bold text-zinc-900 tracking-tight leading-tight">
                      {faq.q}
                    </span>
                  </div>
                  <div className={`shrink-0 w-8 h-8 ml-4 rounded-full flex items-center justify-center transition-all duration-500 ${
                    openIndex === i
                      ? "bg-orange-500 text-white rotate-180"
                      : "bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200"
                  }`}>
                    {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <div
                  id={`faq-content-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  className="transition-all duration-500 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: openIndex === i ? "300px" : "0",
                    opacity: openIndex === i ? 1 : 0,
                  }}
                >
                  <div className="pb-8 pt-0 pr-6 sm:pr-2 ml-0 sm:ml-[44px]">
                    <div className="relative text-[13px] sm:text-[14px] text-zinc-500 leading-relaxed font-light pl-6 sm:pl-7">
                      {/* Gradient Line Accent */}
                      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-orange-500 via-orange-500/50 to-transparent rounded-full" />
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Dark CTA bar */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 px-6 sm:px-8 py-6 sm:py-7 bg-zinc-950 rounded-[24px] text-white border border-white/5">
              <div className="flex items-center gap-4">
                <Terminal size={18} className="text-orange-500 shrink-0" />
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold">
                  More_Questions?
                </span>
              </div>
              <button
                onClick={scrollToForm}
                className="flex items-center justify-center gap-2 group no-underline text-left pointer-events-auto cursor-pointer w-full sm:w-auto bg-white/5 sm:bg-transparent py-4 sm:py-0 rounded-xl"
              >
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                  Speak to a Strategist
                </span>
                <ChevronRight size={14} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}