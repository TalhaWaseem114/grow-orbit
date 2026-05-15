"use client";

import React, { useState } from "react";
import { Plus, Minus, Terminal, ChevronRight } from "lucide-react";
import Link from "next/link";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-8 h-[2px] bg-orange-500" />
    <span className="font-bold text-[10px] uppercase tracking-[0.4em] text-orange-500">
      {children}
    </span>
  </div>
);

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "What does the audit actually cover?",
      a: "Our audit is a comprehensive 360° analysis covering listing quality, keyword authority, search rank trends, PPC efficiency, competitor positioning, pricing strategy, brand registry utilisation, and operational health. You receive a prioritised action document with projected revenue impact.",
    },
    {
      q: "How long does an audit take to complete?",
      a: "A standard audit is delivered within 7–10 business days. Enterprise-level audits with multi-marketplace coverage may take up to 15 business days depending on catalog size and complexity.",
    },
    {
      q: "Do you implement the strategy recommendations?",
      a: "The audit delivers a complete, implementation-ready roadmap. You can execute internally using our documentation, or we can transition directly into an execution engagement where our team handles implementation end-to-end.",
    },
    {
      q: "What data do you need from us to get started?",
      a: "We need Seller Central access (read-only is sufficient), your product catalog spreadsheet, and any existing marketing assets. Within 24 hours of onboarding, our first diagnostic scan is already running.",
    },
    {
      q: "How is this different from an automated audit tool?",
      a: "Automated tools flag surface-level issues. Our audit is conducted by senior Amazon strategists who interpret data in the context of your category, competition, and growth stage. Every recommendation is specific, prioritised, and tied to a projected revenue outcome.",
    },
    {
      q: "Can you audit specific areas rather than the entire account?",
      a: "Yes. We offer focused audits for PPC, SEO/keyword authority, listing creative, and operational health independently. However, most brands get the highest ROI from a full-spectrum audit since issues are often interconnected.",
    },
  ];

  return (
    <section className="py-32 bg-[#fafafa] relative overflow-hidden text-left border-t border-zinc-100">
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* LEFT */}
          <div className="lg:col-span-5">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-zinc-900 leading-[0.9] mb-8 uppercase">
              Common <br />
              <span className="text-zinc-300 italic font-serif lowercase tracking-normal">
                questions.
              </span>
            </h2>
            <p className="text-lg text-zinc-500 font-light leading-relaxed max-w-sm mb-12">
              Get clarity on the audit process, deliverables, and what to expect at every stage.
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
                &ldquo;A great audit doesn&apos;t just tell you what&apos;s wrong — it shows you exactly
                what to do next and why. If your question isn&apos;t answered here, our team is ready.&rdquo;
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map(({ q, a }, i) => (
              <div
                key={i}
                className={`border transition-all duration-500 rounded-[24px] overflow-hidden ${
                  openFaq === i
                    ? "bg-white border-orange-500/30 shadow-xl shadow-orange-500/5"
                    : "bg-white/50 border-zinc-100 hover:border-zinc-200"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-8 py-7 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex items-center gap-5">
                    <span
                      className={`text-[10px] font-mono transition-colors ${
                        openFaq === i ? "text-orange-500" : "text-zinc-300"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span className="text-[15px] font-bold text-zinc-900 tracking-tight pr-4">
                      {q}
                    </span>
                  </div>
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                      openFaq === i
                        ? "bg-orange-500 text-white rotate-180"
                        : "bg-zinc-100 text-zinc-400"
                    }`}
                  >
                    {openFaq === i ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                <div
                  className="transition-all duration-500 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: openFaq === i ? "300px" : "0",
                    opacity: openFaq === i ? 1 : 0,
                  }}
                >
                  <div className="px-8 pb-8 pt-2 ml-10">
                    <div className="text-[14px] text-zinc-500 leading-relaxed font-light border-l-2 border-orange-500/20 pl-6">
                      {a}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA bottom */}
            <div className="mt-8 flex items-center justify-between px-8 py-6 bg-zinc-900 rounded-[24px] text-white">
              <div className="flex items-center gap-4">
                <Terminal size={16} className="text-orange-500" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold">
                  Query_Resolution_Complete
                </span>
              </div>
              <Link href="/contact" className="flex items-center gap-2 group cursor-pointer no-underline">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                  Speak to a Strategist
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
