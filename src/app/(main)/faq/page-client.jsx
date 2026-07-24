"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus, Terminal, ArrowRight, TrendingUp, Users, Award, Clock } from "lucide-react";

/* ─────────────────────────────────────────
   FAQ DATA — specific, confident, no hedging
───────────────────────────────────────── */
const faqGroups = [
  {
    id: "results",
    label: "Results & Timeline",
    color: "bg-orange-500",
    dotColor: "#f97316",
    items: [
      {
        q: "When will I start seeing results?",
        bullets: [
          "PPC efficiency and ACoS improvements typically appear within 2 to 4 weeks of campaign restructuring.",
          "Organic keyword rank starts compounding from day 30 to 60 as Amazon registers improved listing conversion signals.",
          "Most brands see measurable revenue growth by month 2 rather than month 6.",
        ],
        close: "We set clear 30, 60, and 90-day targets on day one and send a performance report every Monday so you always know exactly where your account stands.",
      },
      {
        q: "What results can I realistically expect?",
        bullets: [
          "Average ACoS reduction of 38% across managed Amazon accounts.",
          "Average revenue lift of +38% within the first 90 days of full optimization.",
          "84% of new ASINs hit page 1 within 60 days of a correctly structured product launch.",
        ],
        close: "We will provide a custom growth projection for your brand on our strategy call based on your real category data and listing health.",
      },
      {
        q: "I've been burned by agencies before. Why is Grow Orbit different?",
        bullets: [
          "Most agencies manage channels in isolation (ads separately from listings or design), causing wasted ad spend.",
          "We run every system under one unified strategy so PPC data directly informs SEO decisions and drives organic rank.",
          "We operate on flexible month-to-month agreements so you can leave if results ever stop making sense.",
        ],
        close: "Our unified approach builds compounding momentum, and our month-to-month flexibility means we earn your partnership every single month.",
      },
    ],
  },
  {
    id: "starting",
    label: "Getting Started",
    color: "bg-violet-500",
    dotColor: "#a78bfa",
    items: [
      {
        q: "When is the right time to start selling on Amazon?",
        bullets: [
          "When you have at least 30% net margin after manufacturing, shipping, and Amazon referral fees.",
          "Starting with a minimum order quantity of 500 units to maintain inventory depth during initial launch spikes.",
          "Having a product with validated keyword search volume rather than relying on guesswork.",
        ],
        close: "If you are unsure whether your product qualifies, our strategy call will give you an honest 10-minute assessment before you spend a single dollar.",
      },
      {
        q: "I'm brand new to Amazon. Is it too early to work with an agency?",
        bullets: [
          "Amazon grants every new product a honeymoon window of elevated search algorithm visibility.",
          "If your listing and ads are not fully optimized during this window, that initial boost is lost.",
          "Products launched with professional optimization hit page 1 in 30 days, while fixing a bad launch can take months.",
        ],
        close: "Starting with a proven system from day one is far more profitable than attempting to repair a suppressed or poorly indexed listing later.",
      },
      {
        q: "My Amazon sales are flat. Can you help revive growth?",
        bullets: [
          "Flat sales usually trace back to specific broken bottlenecks like poor keyword indexing or weak CTR imagery.",
          "We audit your account to diagnose whether ad spend is bleeding without driving rank or if listings are losing conversions.",
          "Once the primary bottleneck is resolved, sales momentum quickly resumes.",
        ],
        close: "Most established accounts show positive movement within 30 days of fixing the core bottleneck. We diagnose first so every move is backed by data.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing & Commitment",
    color: "bg-emerald-500",
    dotColor: "#4ade80",
    items: [
      {
        q: "How much does Amazon account management cost?",
        bullets: [
          "Pricing is tailored specifically to your brand size, active catalog count, and overall growth goals.",
          "A brand generating $8K per month requires a different growth framework than a store doing $80K per month.",
          "We provide clear, transparent pricing on our strategy call with zero hidden fees or surprises.",
        ],
        close: "There is zero pressure or obligation. If our services do not align with your current stage, we will guide you toward the best alternative.",
      },
      {
        q: "Do I need to sign a long-term contract?",
        bullets: [
          "No long-term contracts. We operate strictly on flexible month-to-month agreements.",
          "You stay because the revenue growth justifies the investment, not because of a legal lock-in.",
          "Our clients stay long-term because compounding sales figures make the decision effortless.",
        ],
        close: "Complete confidence in our performance makes rigid long-term contracts unnecessary.",
      },
      {
        q: "Is an agency investment worth it for my current sales volume?",
        bullets: [
          "Under $5K/month: Standalone services like product launch or listing overhauls deliver the highest immediate ROI.",
          "$10K to $50K/month: PPC restructuring and listing SEO typically pay for themselves within 30 days via ad savings.",
          "Above $50K/month: Full account management pays for itself rapidly by eliminating wasted spend and scaling rank.",
        ],
        close: "We will transparently recommend the exact service tier that yields the highest return for your current monthly revenue.",
      },
    ],
  },
  {
    id: "services",
    label: "Services & Strategy",
    color: "bg-rose-500",
    dotColor: "#fb7185",
    items: [
      {
        q: "What specific Amazon services do you provide?",
        bullets: [
          "Amazon Operations: Account audits, brand launches, listing SEO, PPC management, repricing automation, and account health defense.",
          "Creative & Branding: Brand guidelines, A+ Content (EBC), Storefront design, main image CTR optimization, and full listing re-designs.",
          "Full Store Management: End-to-end operational execution run by a dedicated team of Amazon specialists.",
        ],
        close: "Most clients start with 2 or 3 core services and scale into full management as sales increase.",
      },
      {
        q: "Do you manage brands across international Amazon marketplaces?",
        bullets: [
          "We manage and scale accounts across Amazon US, UK, Europe, Canada, Mexico, Australia, and Japan.",
          "Global trademark registration guidance is provided across USPTO, EUIPO, UKIPO, and 4 other global registries.",
          "Marketplace expansion timing and logistics strategy are included in Full Management.",
        ],
        close: "Expanding into international markets at the right moment unlocks massive revenue while protecting your profit margins.",
      },
      {
        q: "What happens during the free 15-minute strategy call?",
        bullets: [
          "We perform a live audit of your current Amazon position to uncover your single biggest growth bottleneck.",
          "We outline a clear recommendation on which strategy and service structure fits your budget right now.",
          "We give an honest assessment of fit; if we cannot help you, we will direct you to the exact resources that can.",
        ],
        close: "No sales scripts or pressure. The call is designed to deliver actionable value whether you partner with us or not.",
      },
    ],
  },
  {
    id: "working",
    label: "Working Together",
    color: "bg-amber-500",
    dotColor: "#fbbf24",
    items: [
      {
        q: "What does the onboarding process look like?",
        bullets: [
          "Week 1: Comprehensive account & competitor audit to map category opportunities.",
          "Week 2: Customized strategy roadmap delivered with concrete 30, 60, and 90-day targets.",
          "Week 3: Full execution begins so your brand gains immediate momentum.",
        ],
        close: "You are assigned a dedicated account manager as your main contact alongside weekly performance reports every Monday.",
      },
      {
        q: "How do reporting and communication work?",
        bullets: [
          "Weekly Monday Reports: Clear tracking of ACoS, organic rank movements, total revenue, and completed actions.",
          "Monthly Strategy Sessions: Deep-dive calls to review targets, category shifts, and upcoming promotional pushes.",
          "Direct Communication: Fast response times within 1 business day from your dedicated account team.",
        ],
        close: "You will never have to guess what is happening with your store. Every decision and metric is documented and shared proactively.",
      },
      {
        q: "Can you take over an existing account that is already being managed?",
        bullets: [
          "Yes. Over 60% of our partners come to us with live accounts previously managed in-house or by other agencies.",
          "We conduct a seamless audit to preserve what works while repairing underperforming campaigns.",
          "Account handovers are executed with zero downtime or disruption to active sales and listings.",
        ],
        close: "We specialize in taking stagnant accounts and unlocking immediate growth without impacting ongoing operations.",
      },
    ],
  },
];

/* ─────────────────────────────────────────
   ANSWER RENDERER — proper bullet JSX
───────────────────────────────────────── */
function Answer({ bullets, close }) {
  return (
    <div className="relative text-[14px] text-zinc-500 font-light pl-6">
      {/* Gradient Line Accent */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-orange-500 via-orange-500/50 to-transparent rounded-full" />
      <ul className="space-y-2 mb-4">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-[7px]" />
            <span className="leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>
      <p className="text-zinc-400 text-[13px] font-light leading-relaxed italic border-t border-zinc-100 pt-4">
        {close}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────── */
function SL({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-[2px] bg-orange-500" />
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">{children}</span>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function FAQDedicatedPage() {
  const [activeGroup, setActiveGroup] = useState("results");
  const [openIndex,   setOpenIndex]   = useState(0);

  const current = faqGroups.find(g => g.id === activeGroup);

  const changeGroup = (id) => { setActiveGroup(id); setOpenIndex(0); };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.bullets.join(". ") + ". " + item.close,
        },
      }))
    ),
  };

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <style>{`
        @keyframes fade-up { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fade-up .35s ease both; }
      `}</style>

      {/* ── HERO ── */}
      <div className="bg-zinc-950 pt-32 pb-0 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
             style={{ backgroundImage:"radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize:"24px 24px" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_50%,rgba(249,115,22,0.10),transparent_55%)] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-[2px] bg-orange-500" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-400">FAQ</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-16 border-b border-white/5">
            <div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.88] text-white mb-5"
                  style={{ fontFamily:"'Montserrat',sans-serif" }}>
                Frequently<br />
                <span className="italic font-light text-zinc-600 lowercase tracking-normal"
                      style={{ fontFamily:"'Playfair Display',serif" }}>asked.</span>
              </h1>
              <p className="text-zinc-400 text-lg font-light max-w-lg leading-relaxed">
                Every question brands ask before, during, and after working with us — answered honestly, without the fluff.
              </p>
            </div>

            {/* Hero stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 shrink-0">
              {[
                { icon:<TrendingUp size={14}/>, val:"140+",  label:"Brands Managed"   },
                { icon:<Award size={14}/>,      val:"+38%",  label:"Avg Revenue Lift" },
                { icon:<Users size={14}/>,      val:"84%",   label:"Page 1 in 60d"   },
                { icon:<Clock size={14}/>,      val:"<2h",   label:"Response Time"    },
              ].map((s,i)=>(
                <div key={i} className="bg-white/[0.04] border border-white/8 rounded-2xl px-5 py-4">
                  <div className="text-orange-500/60 mb-1.5">{s.icon}</div>
                  <p className="text-2xl font-black text-white tracking-tighter" style={{fontFamily:"'Montserrat',sans-serif"}}>{s.val}</p>
                  <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── STICKY CATEGORY NAV ── */}
      <div className="bg-white border-b border-zinc-100 sticky top-0 z-40 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-1 overflow-x-auto py-4" style={{scrollbarWidth:"none"}}>
            {faqGroups.map(g=>(
              <button key={g.id} onClick={()=>changeGroup(g.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all duration-300 whitespace-nowrap shrink-0 ${
                        activeGroup===g.id ? "bg-zinc-900 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                      }`}>
                {activeGroup===g.id && <span className={`w-2 h-2 rounded-full ${g.color} shrink-0`}/>}
                {g.label}
                <span className={`text-[9px] font-black rounded-full w-5 h-5 flex items-center justify-center transition-colors ${
                  activeGroup===g.id ? "bg-orange-500 text-white" : "bg-zinc-100 text-zinc-500"
                }`}>
                  {g.items.length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">

            {/* Active group header */}
            <div className="mb-8">
              <div className="w-3 h-3 rounded-full mb-4" style={{background:current.dotColor}}/>
              <h2 className="text-4xl font-black tracking-tighter uppercase leading-[0.9] text-zinc-900 mb-2"
                  style={{fontFamily:"'Montserrat',sans-serif"}}>
                {current.label}
              </h2>
              <p className="text-zinc-400 text-sm font-light">
                {current.items.length} questions — specific, honest answers.
              </p>
            </div>

            {/* Other categories */}
            <div className="space-y-2 mb-8">
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-3">Other Categories</p>
              {faqGroups.filter(g=>g.id!==activeGroup).map(g=>(
                <button key={g.id} onClick={()=>changeGroup(g.id)}
                        className="group w-full flex items-center justify-between px-4 py-3 bg-[#fafafa] hover:bg-white rounded-xl border border-zinc-100 hover:border-orange-500/20 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{background:g.dotColor}}/>
                    <span className="font-bold text-[12px] uppercase tracking-tight text-zinc-600 group-hover:text-orange-500 transition-colors">{g.label}</span>
                  </div>
                  <span className="text-[10px] font-black text-zinc-400">{g.items.length}</span>
                </button>
              ))}
            </div>

            {/* CTA card */}
            <div className="bg-zinc-950 rounded-[28px] p-7 border border-orange-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none"/>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"/>
              <p className="font-black text-[14px] uppercase tracking-tight text-white mb-2 relative z-10">
                Still have questions?
              </p>
              <p className="text-zinc-500 text-[12px] font-light leading-relaxed mb-6 relative z-10">
                Book a free 15-minute call. We'll review your account before we speak and answer everything specific to your brand.
              </p>
              <Link href="/contact"
                    className="relative z-10 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-white hover:text-zinc-900 text-white font-black text-[10px] uppercase tracking-widest px-6 py-3.5 rounded-2xl transition-all duration-300 no-underline shadow-[0_8px_24px_rgba(249,115,22,0.3)]">
                Book Free Call <ArrowRight size={13}/>
              </Link>
            </div>
          </div>

          {/* RIGHT — ACCORDION */}
          <div className="lg:col-span-8 space-y-3">
            {current.items.map((faq, i) => (
              <div key={`${activeGroup}-${i}`}
                   className={`border transition-all duration-500 rounded-[24px] overflow-hidden fade-up ${
                     openIndex===i
                       ? "bg-white border-orange-500/30 shadow-xl shadow-orange-500/5"
                       : "bg-white border-zinc-100 hover:border-zinc-200"
                   }`}
                   style={{animationDelay:`${i*0.06}s`}}>

                <button
                  className="w-full flex items-center justify-between px-7 py-7 text-left group"
                  onClick={()=>setOpenIndex(openIndex===i ? null : i)}
                >
                  <div className="flex items-center gap-5">
                    <span className={`text-[11px] font-mono transition-colors shrink-0 ${openIndex===i?"text-orange-500":"text-zinc-300"}`}>
                      0{i+1}
                    </span>
                    <span className="text-[15px] font-bold text-zinc-900 tracking-tight leading-snug">
                      {faq.q}
                    </span>
                  </div>
                  <div className={`shrink-0 w-8 h-8 ml-4 rounded-full flex items-center justify-center transition-all duration-500 ${
                    openIndex===i ? "bg-orange-500 text-white rotate-180" : "bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200"
                  }`}>
                    {openIndex===i ? <Minus size={16}/> : <Plus size={16}/>}
                  </div>
                </button>

                <div className="transition-all duration-500 overflow-hidden"
                     style={{ maxHeight:openIndex===i?"600px":"0", opacity:openIndex===i?1:0 }}>
                  <div className="px-7 pb-8 pt-0 ml-[44px]">
                    <Answer bullets={faq.bullets} close={faq.close}/>
                  </div>
                </div>
              </div>
            ))}

            {/* Dark CTA bar */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-7 py-6 bg-zinc-950 rounded-[24px] text-white border border-white/5">
              <div className="flex items-center gap-4">
                <Terminal size={17} className="text-orange-500 shrink-0"/>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold text-zinc-400">More_Questions?</span>
              </div>
              <Link href="/contact" className="group flex items-center gap-2 no-underline shrink-0">
                <span className="text-[11px] font-black uppercase tracking-widest text-zinc-300 group-hover:text-white transition-colors">
                  Speak to a Strategist
                </span>
                <ArrowRight size={13} className="text-orange-500 group-hover:translate-x-1 transition-transform"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}