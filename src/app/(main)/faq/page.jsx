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
          "PPC efficiency and ACoS improvements appear within 2–4 weeks of campaign restructure",
          "Organic rank starts compounding from day 30–60 as the algorithm registers improved listing signals",
          "Most brands see clear revenue movement by month 2 — not month 6",
        ],
        close: "We set 30, 60, and 90-day targets on day one and send a performance report every Monday so you always know exactly where your account stands.",
      },
      {
        q: "What results can I realistically expect?",
        bullets: [
          "Average ACoS reduction of 38% across managed accounts",
          "Average revenue lift of +38% within the first 90 days",
          "84% of new ASINs hit page 1 within 60 days of a correctly structured launch",
        ],
        close: "We'll give you a specific projection for your brand on the strategy call — based on your category data and current listing health, not a generic promise.",
      },
      {
        q: "I've been burned by agencies before. Why is this different?",
        bullets: [
          "Most agencies manage one channel in isolation — ads OR listings OR creative, never coordinated",
          "We run every system under one strategy so PPC data improves SEO decisions, which builds organic rank, which reduces ad dependency",
          "We work month-to-month — you can leave the moment results stop making sense",
        ],
        close: "That compounding effect is impossible when services are fragmented. And the month-to-month agreement means we earn your business every single month.",
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
        q: "When is the right time to start on Amazon?",
        bullets: [
          "You need at least 30% net margin after manufacturing, shipping, and Amazon fees",
          "Minimum 500 units for a first shipment — below that the economics rarely work regardless of strategy",
          "A product with clear market demand validated by keyword volume, not just your gut feeling",
        ],
        close: "If you're unsure whether your product qualifies, the free strategy call will tell you within 10 minutes — honestly, not optimistically.",
      },
      {
        q: "I'm brand new to Amazon — is it too early to work with an agency?",
        bullets: [
          "Amazon gives every new ASIN a honeymoon window of elevated visibility at launch",
          "If your listing isn't fully optimised when that window opens, it closes permanently",
          "Brands that launch correctly hit page 1 in 30 days — those that fix a bad launch take 6+ months",
        ],
        close: "Starting with a professional system from day one is dramatically more effective than launching yourself and trying to fix a damaged listing later.",
      },
      {
        q: "My sales are flat. Can you help?",
        bullets: [
          "Flat sales almost always trace back to one or two broken systems — not everything at once",
          "Common causes: a listing not indexing correctly, ad campaigns bleeding spend without building rank, or a main image losing the click",
          "We audit first, find the single biggest bottleneck, and fix that before touching anything else",
        ],
        close: "Most existing accounts start moving within 30 days of the bottleneck being identified and addressed. We don't guess — we diagnose.",
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
        q: "How much does it cost?",
        bullets: [
          "Pricing is scoped to your brand size, the services required, and your growth targets",
          "A brand doing $8K/month needs a fundamentally different system than one doing $80K/month",
          "We share exact pricing on the strategy call after understanding your situation — no vague ranges, no surprises",
        ],
        close: "There is no pressure and no obligation on that call. If we can't help you, we'll say so directly.",
      },
      {
        q: "Do I need to commit long-term?",
        bullets: [
          "Month-to-month agreements only — no 6-month retainer traps, no exit penalties",
          "You stay because the results justify it, not because you signed something you regret",
          "Most clients stay long-term because the numbers make the decision easy",
        ],
        close: "Confidence in results makes lock-in unnecessary. If we're doing our job, you won't want to leave.",
      },
      {
        q: "Is this worth it at my current stage?",
        bullets: [
          "Under $5K/month: individual services (launch setup or listing optimisation) deliver better ROI than full management",
          "$10K–$50K/month and stuck: PPC restructuring typically pays for itself from ACoS savings alone within 30 days",
          "Past $50K/month: full account management generally pays for itself within 60 days from reduced wasted spend",
        ],
        close: "We'll tell you honestly which tier makes sense on the strategy call — even if that means recommending a smaller starting point.",
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
        q: "What services do you offer?",
        bullets: [
          "Amazon Operations: account audit, brand launch, listing SEO, PPC management, growth automation, account health, and trademark registration",
          "Brand & Creative: brand guidelines, brand story, brand storefront, listing images, A+ Content, and main image CTR optimisation",
          "Full management: one team running every service under one coordinated strategy",
        ],
        close: "Most clients start with 2–3 services and expand as their brand scales. We recommend the right starting point on the call.",
      },
      {
        q: "Do you work across multiple Amazon marketplaces?",
        bullets: [
          "We manage brands on Amazon US, UK, EU, Canada, Mexico, Australia, and Japan",
          "Trademark registration available in 7 countries including USPTO, EUIPO, and UKIPO",
          "International expansion strategy — which marketplace to enter next and when — is included in Full Management",
        ],
        close: "Entering the wrong marketplace at the wrong time destroys margins. We help you sequence expansion correctly.",
      },
      {
        q: "What does the free 15-minute strategy call actually cover?",
        bullets: [
          "A quick audit of your current Amazon position — your single biggest growth gap identified before the call ends",
          "A specific recommendation on which service tier fits your brand and budget right now",
          "An honest assessment of whether we're the right fit — if we can't help you, we'll say so and point you toward what will",
        ],
        close: "No sales script. No obligation. The call is designed to be useful whether or not you work with us.",
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
        q: "What does onboarding look like after I sign up?",
        bullets: [
          "Week 1: full account audit — we analyse your account, category, and competitors before recommending a single action",
          "Week 2: prioritised strategy roadmap delivered with explicit 30, 60, and 90-day targets",
          "Week 3: execution begins — you are not waiting 6 weeks to see the first action taken",
        ],
        close: "You get a dedicated account manager as your single point of contact and a weekly performance report every Monday from day one.",
      },
      {
        q: "How do you report and communicate?",
        bullets: [
          "Weekly performance report every Monday: ACoS, revenue, organic rank changes, and every action taken with reasoning",
          "Monthly strategy call to review trends, results vs targets, and adjust the plan",
          "Your account manager responds to all messages within 1 business day — no shared inbox, no ticketing system",
        ],
        close: "You'll never wonder what's happening with your account. Everything is documented, explained, and sent to you proactively.",
      },
      {
        q: "Can you take over an account already being managed?",
        bullets: [
          "Yes — about 60% of our clients come to us with live accounts currently managed by someone else or themselves",
          "We audit first to identify what's working and what isn't, then build a transition plan",
          "Handovers are managed with zero disruption to your active campaigns or listings",
        ],
        close: "The most common scenario we see is an account that has been managed for 12+ months with no clear improvement. That's exactly what we're built to fix.",
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

  return (
    <main className="min-h-screen bg-[#fafafa]">
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