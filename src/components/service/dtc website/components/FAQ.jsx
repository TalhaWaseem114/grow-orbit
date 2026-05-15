import React, { useState } from "react";
import { Plus, Minus, Terminal, ChevronRight } from "lucide-react";
import Link from "next/link";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="flex gap-1">
      <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
      <div className="w-4 h-px bg-orange-500 self-center"></div>
    </div>
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-600/80">
      {children}
    </span>
  </div>
);

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "How long does it take to build and launch a DTC storefront?",
      a: "A full Shopify Plus storefront — from discovery to live deployment — typically takes 8–12 weeks. This includes strategy, design, development, testing, and launch optimization."
    },
    {
      q: "Do we need to stop selling on Amazon to go DTC?",
      a: "Not at all. DTC is a complementary channel. Most of our clients maintain their Amazon presence while building direct sales. The goal is channel diversification, not replacement."
    },
    {
      q: "What platform do you build on?",
      a: "We build on Shopify Plus for most brands. For enterprise or custom needs, we also work with Shopify Hydrogen (headless). The technology decision is made during discovery based on your requirements."
    },
    {
      q: "Do you handle email and SMS automation too?",
      a: "Yes. Every DTC build includes lifecycle automation — welcome flows, abandoned cart recovery, post-purchase sequences, and win-back campaigns. We implement these in Klaviyo."
    },
    {
      q: "What makes Grow Orbit different from a Shopify agency?",
      a: "We're not a template shop. We build conversion-focused commerce architectures backed by data — with full analytics, attribution, and lifecycle automation built in from day one."
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-slate-50 relative text-left border-t border-slate-200/60">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* LEFT: HEADER */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start text-left">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-[42px] sm:text-5xl lg:text-7xl font-black tracking-tighter text-[#111] leading-[0.9] mb-6 sm:mb-8 uppercase">
              Common <br />
              <span className="text-zinc-300 italic font-light lowercase tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Questions.</span>
            </h2>
            <div className="text-base sm:text-lg text-zinc-500 font-light leading-relaxed max-w-sm mb-12">
              Get clarity on the technical requirements and expectations of a DTC storefront build.
            </div>

            {/* Support Status Box */}
            <div className="p-6 bg-white rounded-3xl hidden lg:block">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Support Logic Active</span>
              </div>
              <div className="text-xs text-zinc-400 leading-relaxed italic">
                "Building a DTC channel is the single most important infrastructure investment a marketplace brand can make. If your question isn't answered here, our team is ready."
              </div>
            </div>
          </div>

          {/* RIGHT: ACCORDION */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map(({ q, a }, i) => (
              <div
                key={i}
                className={`group border transition-all duration-500 rounded-[20px] sm:rounded-[24px] overflow-hidden ${
                  openFaq === i
                  ? "bg-white border-orange-500/30 shadow-xl shadow-orange-500/5"
                  : "bg-white/50 border-slate-200 hover:border-slate-300"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-5 sm:px-8 py-5 sm:py-7 text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex items-center gap-3 sm:gap-5">
                    <span className={`text-[10px] font-mono transition-colors ${openFaq === i ? "text-orange-500" : "text-slate-300"}`}>
                      0{i + 1}
                    </span>
                    <span className="text-[14px] sm:text-[15px] font-bold text-slate-900 tracking-tight">{q}</span>
                  </div>

                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                    openFaq === i ? "bg-orange-500 text-white rotate-180" : "bg-slate-100 text-slate-400"
                  }`}>
                    {openFaq === i ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                <div
                  className="transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: openFaq === i ? "300px" : "0",
                    opacity: openFaq === i ? 1 : 0,
                    overflow: "hidden"
                  }}
                >
                  <div className="px-5 sm:px-8 pb-6 sm:pb-8 pt-2 ml-8 sm:ml-10">
                    <div className="text-[13px] sm:text-[14px] text-zinc-500 leading-relaxed font-light border-l-2 border-orange-500/10 pl-5 sm:pl-6">
                      {a}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA BOTTOM TAG */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-8 py-5 sm:py-6 bg-zinc-900 rounded-[20px] sm:rounded-[24px] text-white">
              <div className="flex items-center gap-3 sm:gap-4">
                <Terminal size={14} className="text-orange-500" />
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold">Query_Resolution_Complete</span>
              </div>
              <Link href="/get-started" className="flex items-center gap-2 group cursor-pointer">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">Speak to an Expert</span>
                <ChevronRight size={14} className="text-orange-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
