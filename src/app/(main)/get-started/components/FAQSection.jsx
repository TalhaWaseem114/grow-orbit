"use client";

import React, { useState } from "react";
import { Plus, Minus, ChevronRight, Terminal } from "lucide-react";

/* ─────────────────────────────────────────
   LANDING PAGE FAQ (Campaign Page)
   Exactly 6 questions.
   1–2 short sentences each.
   All closed by default.
───────────────────────────────────────── */
const faqs = [
  {
    q: "When will revenue start?",
    a: "We typically see measurable revenue growth within 30–60 days of execution. However, initial improvements in CTR and conversion rates usually start within the first 14 days."
  },
  {
    q: "What makes you different from other Amazon agencies?",
    a: "Most agencies focus on one piece. We handle everything together so your growth actually moves instead of staying stuck."
  },
  {
    q: "Do I need to commit long-term?",
    a: "No. We work month-to-month. You stay because it works, not because you're locked in."
  },
  {
    q: "Is this right for my brand right now?",
    a: "Best fit is brands already doing $10K+ per month. If you're earlier, we'll guide you on the right next step."
  },
  {
    q: "Can you take over my existing account?",
    a: "Yes. We audit first, fix what’s holding you back, and transition without disrupting your current sales."
  },
  {
    q: "What kind of budget do I need to get started?",
    a: "It depends on your stage. We’ll give you a clear recommendation on the call based on your numbers."
  }
];

export default function FAQSection({ scrollToForm }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="py-24 bg-white border-t border-zinc-100"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12">

        {/* Header — compact, centered */}
        <div className="text-center mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-orange-500/80 mb-3">06 / Quick Answers</p>
          <h2
            className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[1.1] text-zinc-900"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Frequently Asked <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
              questions.
            </span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3 mb-8">
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
                className="w-full flex items-center justify-between px-5 sm:px-7 py-6 text-left group"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center gap-4">
                  <span className={`text-[10px] font-mono transition-colors shrink-0 ${
                    openIndex === i ? "text-orange-500" : "text-zinc-300"
                  }`}>
                    0{i + 1}
                  </span>
                  <span className="text-[14px] font-bold text-zinc-900 tracking-tight leading-tight">
                    {faq.q}
                  </span>
                </div>
                <div className={`shrink-0 w-8 h-8 ml-4 rounded-full flex items-center justify-center transition-all duration-500 ${
                  openIndex === i
                    ? "bg-orange-500 text-white rotate-180"
                    : "bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200"
                }`}>
                  {openIndex === i ? <Minus size={15} /> : <Plus size={15} />}
                </div>
              </button>

              <div
                className="transition-all duration-500 ease-in-out overflow-hidden"
                style={{
                  maxHeight: openIndex === i ? "200px" : "0",
                  opacity: openIndex === i ? 1 : 0,
                }}
              >
                <div className="px-5 sm:px-5 pb-6 pt-0 ml-0 sm:ml-10">
                  <div className="relative pl-4 sm:pl-5">
                    <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-gradient-to-b from-orange-500 via-orange-400 to-transparent rounded-full" />
                    <div className="text-[13px] sm:text-[14px] text-zinc-500 leading-relaxed font-light">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-6 py-5 sm:px-7 sm:py-6 bg-zinc-950 rounded-[24px] text-white border border-white/5 gap-4">
          <div className="flex items-center gap-3">
            <Terminal size={15} className="text-orange-500 shrink-0" />
            <span className="text-[11px] font-bold text-zinc-300">
              Have a question not covered here?
            </span>
          </div>
          <button
            onClick={scrollToForm}
            className="flex items-center justify-center gap-2 group no-underline shrink-0 cursor-pointer pointer-events-auto bg-white/5 border border-white/10 hover:border-orange-500/30 rounded-xl px-4 py-2.5 sm:p-0 sm:bg-transparent sm:border-none"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
              Ask Us <span className="hidden sm:inline">Directly</span>
            </span>
            <ChevronRight size={14} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
