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
      q: "How long does a full brand launch take?",
      a: "A typical launch takes 4–6 weeks from onboarding to Day 1 on Amazon. This includes market research (Week 1), content and creative production (Weeks 2–4), and launch execution with PPC activation (Weeks 5–6). Enterprise launches with multiple ASINs may extend to 8 weeks.",
    },
    {
      q: "What do I need to provide to get started?",
      a: "We need your product samples (or professional photography), brand assets (logos, brand guidelines), and access to Seller Central. If you don't have Brand Registry yet, we'll guide you through the enrollment process as part of onboarding.",
    },
    {
      q: "Do you handle FBA logistics and shipment?",
      a: "We provide full FBA logistics planning including labeling requirements, shipment creation, and inventory forecasting. We coordinate with your freight forwarder or 3PL to ensure your first shipment is received correctly and on time.",
    },
    {
      q: "What is the Amazon 'honeymoon period' and how do you leverage it?",
      a: "When a new listing goes live, Amazon temporarily boosts its visibility in search results — this is the 'honeymoon period' (typically 14–30 days). We time your PPC launch, promotional strategy, and review velocity tactics to maximize ranking gains during this critical window.",
    },
    {
      q: "Can you launch an existing product that isn't performing?",
      a: "Yes. We call this a 're-launch.' We rebuild the listing from scratch — new copy, images, A+ content, keyword targeting, and PPC strategy. Over 40% of our launch clients are re-launches that dramatically outperform the original listing.",
    },
    {
      q: "What happens after the launch is complete?",
      a: "Depending on your tier, you receive 30 days of post-launch optimization including PPC bid management, keyword harvesting, and ranking trajectory monitoring. After that, many clients transition to our Ongoing Support service for continued growth.",
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

          <div className="lg:col-span-5">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-zinc-900 leading-[0.9] mb-8 uppercase">
              Common <br />
              <span className="text-zinc-300 italic font-serif lowercase tracking-normal">
                questions.
              </span>
            </h2>
            <p className="text-lg text-zinc-500 font-light leading-relaxed max-w-sm mb-12">
              Everything you need to know about launching your brand on Amazon with Grow Orbit.
            </p>

            <div className="p-6 bg-white rounded-3xl border border-zinc-100 hidden lg:block">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">
                  Launch Team Online
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed italic">
                &ldquo;Your first 30 days on Amazon are the most important. Every decision — from keyword
                targeting to image sequencing — compounds. That&apos;s why we engineer every launch
                for maximum velocity.&rdquo;
              </p>
            </div>
          </div>

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

            <div className="mt-8 flex items-center justify-between px-8 py-6 bg-zinc-900 rounded-[24px] text-white">
              <div className="flex items-center gap-4">
                <Terminal size={16} className="text-orange-500" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold">
                  Query_Resolution_Complete
                </span>
              </div>
              <Link href="/contact" className="flex items-center gap-2 group cursor-pointer no-underline">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                  Talk to Launch Team
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
