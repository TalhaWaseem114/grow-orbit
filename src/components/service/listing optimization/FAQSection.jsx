"use client";

import React, { useState } from 'react';
import { Plus, Minus, Terminal, ChevronRight } from "lucide-react";
import Link from "next/link";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-8 h-[2px] bg-orange-500" />
    <span className="font-bold text-[10px] font-mono uppercase tracking-[0.4em] text-orange-500">
      {children}
    </span>
  </div>
);

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "How long before we see ranking improvements?",
      a: "Most clients observe measurable movement in keyword positions within 4–8 weeks of full implementation of the A10 Velocity Protocol. Success depends on category competitiveness and initial listing health.",
    },
    {
      q: "Do you manage PPC as part of this service?",
      a: "Our Listing Optimization service focuses purely on organic search foundations. However, we coordinate closing with your PPC strategy to ensure your paid traffic lands on a high-converting, logically mapped infrastructure.",
    },
    {
      q: "What data do you need from us to get started?",
      a: "We require read-only access to Seller Central and any existing keyword reports. Within 24 hours of onboarding, our first diagnostic scan is already identifying your primary ranking bottlenecks.",
    },
    {
      q: "Is this a one-time project or ongoing?",
      a: "The core Listing Optimization is a high-impact, phase-locked engagement. However, many brands transition into our ongoing Growth Automation or Strategy retainers to protect their new ranking positions.",
    },
    {
      q: "How do you handle multi-variation listings?",
      a: "We architect parent-child relationships specifically for 'review aggregation' and 'keyword spreading' logic, ensuring your entire variation family helps push the primary ranking drivers.",
    },
  ];

  return (
    <section id="faq" className="py-20 lg:py-32 bg-[#fafafa] relative text-left border-t border-zinc-100 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* LEFT AREA: HEADER & STATUS */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-zinc-900 leading-[0.9] mb-6 lg:mb-8 uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Common <br />
              <span className="text-zinc-300 italic font-light lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                questions.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-zinc-500 font-light leading-relaxed max-w-sm mb-8 lg:mb-12">
              Get clarity on the optimization process, technical requirements, and algorithmic performance expectations.
            </p>

            {/* Support Status Box */}
            <div className="p-6 bg-white rounded-3xl border border-zinc-100 hidden lg:block">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">
                  Strategy Team Online
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed italic">
                &ldquo;A great listing doesn&apos;t just describe a product — it engineers a conversion. If your specific technical question isn&apos;t here, our team is ready to assist.&rdquo;
              </p>
            </div>
          </div>

          {/* RIGHT AREA: ACCORDION */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map(({ q, a }, i) => (
              <div
                key={i}
                className={`border transition-all duration-500 rounded-[20px] sm:rounded-[24px] overflow-hidden ${
                  openFaq === i
                    ? "bg-white border-orange-500/30 shadow-xl shadow-orange-500/5"
                    : "bg-white/50 border-zinc-100 hover:border-zinc-200"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-6 sm:px-8 py-5 sm:py-7 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex items-start sm:items-center gap-3 sm:gap-5 flex-1 pr-2 sm:pr-4">
                    <span
                      className={`text-[9px] sm:text-[10px] font-mono transition-colors mt-1 sm:mt-0 shrink-0 ${
                        openFaq === i ? "text-orange-500" : "text-zinc-300"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span className="text-[13px] sm:text-[15px] font-bold text-zinc-900 tracking-tight flex-1 break-words leading-snug">
                      {q}
                    </span>
                  </div>
                  <div
                    className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                      openFaq === i
                        ? "bg-orange-500 text-white rotate-180"
                        : "bg-zinc-100 text-zinc-400"
                    }`}
                  >
                    {openFaq === i ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>
                <div
                  className="transition-all duration-500 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: openFaq === i ? "400px" : "0",
                    opacity: openFaq === i ? 1 : 0,
                  }}
                >
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 ml-0 sm:ml-10 mt-2 sm:mt-0">
                    <div className="text-[13px] sm:text-[14px] text-zinc-500 leading-relaxed font-light border-l-2 border-orange-500/20 pl-4 sm:pl-6">
                      {a}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA bottom - FIXED FOR MOBILE OVERFLOW */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 px-6 sm:px-8 py-6 bg-zinc-900 rounded-[20px] sm:rounded-[24px] text-white text-center sm:text-left">
              <div className="flex items-center gap-3 sm:gap-4">
                <Terminal size={14} className="text-orange-500 shrink-0" />
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold">
                  have any question?
                </span>
              </div>
              <Link href="/contact" className="flex items-center justify-center sm:justify-start gap-2 group cursor-pointer no-underline w-full sm:w-auto">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                  Ask to expert
                </span>
                <ChevronRight size={14} className="text-orange-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}