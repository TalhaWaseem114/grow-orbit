"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, TrendingUp,
  Zap, Star, ChevronRight, Plus, Minus, Terminal, Activity,
  Search, Layers, Target, AlertCircle, Calendar, BarChart3,
  Layout, TrendingDown, DollarSign, Shield, SearchCode,
  MapPin, FileText, Users, Package, Award,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "./SectionLabel";
import CheckItem from "./CheckItem";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: "What exactly is an Orbit Diagnostic?",                        a: "The Orbit Diagnostic is a 72-hour deep-dive audit of your Amazon account. We analyze every active campaign, keyword, listing, and competitor in your category to identify where spend is wasted, where ranking opportunities are being missed, and where your organic and paid strategies are working against each other. You receive a complete technical blueprint for immediate deployment." },
    { q: "How is this different from a standard agency audit?",          a: "A standard agency audit typically takes 30 minutes and produces a generic report with basic metrics. The Orbit Diagnostic is a 72-hour systematic deconstruction — we analyze 5,000+ keywords, reverse-engineer your top 5 competitors, build a custom P&L forecast, and deliver a 24-month execution roadmap. The output is a board-level strategic document, not a templated PDF." },
    { q: "What's the guaranteed $10,000 minimum insight?",              a: "We are confident enough in our methodology to offer this: if we cannot identify at least $10,000 in wasted spend or untapped revenue growth from your account, the entire Orbit Diagnostic is free. In practice, we have never had to honor this guarantee — the average account has $4,200+ in immediately recoverable waste." },
    { q: "What do you need from us to get started?",                    a: "We need read-access to your Amazon Seller Central account (via Amazon's MWS or SP-API credentials), your current monthly ad budget, and a 30-minute onboarding call to understand your brand goals and target metrics. We handle everything else from there." },
    { q: "How quickly will we see results after implementation?",       a: "Clients typically see measurable ROAS improvement within 14–30 days of implementing the diagnostic recommendations. The keyword waste elimination is immediate (within the first week), while the organic ranking improvements from the semantic mapping build over 30–90 days." },
    { q: "Do you handle the implementation, or is it just a report?",   a: "The Diagnostic and Orbit packages deliver the full strategic blueprint — you or your team implement the recommendations. The Strategic package includes 90 days of hands-on implementation support with a dedicated strategist. For clients who need full management, we offer our ongoing Amazon PPC and Account Operations services." },
    { q: "Can you audit an account that's already being managed?",      a: "Absolutely. In fact, most of our Diagnostic clients have existing agency relationships or in-house teams. The audit acts as a second opinion and gives your team a strategic edge — we've found significant inefficiencies in accounts managed by every major Amazon agency." },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>FAQ</SectionLabel>
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-10 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Frequently<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>asked.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md mb-8 sm:mb-12">
              Everything you need to know about the Orbit Diagnostic before booking your session.
            </p>
            <div className="p-6 bg-[#fafafa] rounded-[24px] border border-zinc-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Guaranteed Insight</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                If we don't find $10,000+ in recoverable waste or growth, the diagnostic is free. Every client so far has found significantly more.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-orange-500 font-bold text-[10px] uppercase tracking-widest hover:gap-3 transition-all no-underline">
                Book Now — Risk Free <ChevronRight size={11} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className={`border transition-all duration-500 rounded-[20px] sm:rounded-[24px] overflow-hidden ${openIndex === i ? "bg-[#fafafa] border-orange-500/30 shadow-xl shadow-orange-500/5" : "bg-white border-zinc-100 hover:border-zinc-200"}`}>
                <button className="w-full flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 text-left" onClick={() => setOpenIndex(openIndex === i ? -1 : i)}>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className={`text-[10px] font-mono transition-colors shrink-0 ${openIndex === i ? "text-orange-500" : "text-zinc-300"}`}>0{i + 1}</span>
                    <span className="text-[13px] sm:text-[14px] font-bold text-zinc-900 tracking-tight pr-2">{faq.q}</span>
                  </div>
                  <div className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 ml-2 sm:ml-4 rounded-full flex items-center justify-center transition-all duration-500 ${openIndex === i ? "bg-orange-500 text-white rotate-180" : "bg-zinc-100 text-zinc-400"}`}>
                    {openIndex === i ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>
                <div className="transition-all duration-500 ease-in-out overflow-hidden" style={{ maxHeight: openIndex === i ? "400px" : "0", opacity: openIndex === i ? 1 : 0 }}>
                  <div className="px-5 sm:px-8 pb-5 sm:pb-8 pt-0 ml-6 sm:ml-10">
                    <div className="text-[13px] sm:text-[14px] text-zinc-500 leading-relaxed font-light border-l-2 border-orange-500/20 pl-4 sm:pl-6">{faq.a}</div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 sm:gap-0 px-6 sm:px-8 py-8 sm:py-6 bg-zinc-900 rounded-[20px] sm:rounded-[24px] text-white text-center sm:text-left">
              <div className="flex items-center gap-3 sm:gap-4 justify-center sm:justify-start">
                <Terminal size={14} className="text-orange-500" />
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] font-bold">More_Questions?</span>
              </div>
              <Link href="/contact" className="flex items-center gap-2 group no-underline justify-center sm:justify-start">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">Speak to a Strategist</span>
                <ChevronRight size={13} className="text-orange-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
