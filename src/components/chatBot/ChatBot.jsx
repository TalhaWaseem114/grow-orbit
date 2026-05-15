"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  MessageCircle, X, Zap, ArrowRight,
  ChevronRight, RotateCcw,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

/* ─────────────────────────────────────────────
   Q&A DATA — best conversion-critical questions
───────────────────────────────────────────── */
const QA = [
  {
    q: "When will I start seeing results?",
    a: "PPC and conversion improvements show within 2–4 weeks. Organic rank compounds from day 30–60. Most brands see clear revenue movement within 45 days.",
    tag: "Results",
  },
  {
    q: "What makes Grow Orbit different?",
    a: "Most agencies do one thing — ads OR listings OR creative. We run every system simultaneously under one strategy so each one compounds the others. One team, one goal.",
    tag: "About",
  },
  {
    q: "Do I need a long-term contract?",
    a: "No. We work month-to-month. You stay because the results justify it — not because you're locked in. Most clients stay long-term because the numbers make sense.",
    tag: "Pricing",
  },
  {
    q: "What size brand is this right for?",
    a: "Best fit: brands doing $10K–$5M+ on Amazon. If you're earlier, we'll tell you the right starting point on the free call. No guessing, no wasted budget.",
    tag: "Fit",
  },
  {
    q: "Can you take over my existing account?",
    a: "Yes — about 60% of our clients come with live accounts. We audit first, fix the biggest bottleneck, and transition without touching your active campaigns.",
    tag: "Services",
  },
  {
    q: "How much does it cost?",
    a: "Pricing is scoped to your brand size and the services needed. We share exact pricing on the free strategy call — no pressure, no surprise fees.",
    tag: "Pricing",
  },
  {
    q: "What services do you offer?",
    a: "20+ Amazon services: PPC, Listing SEO, Brand Launch, Listing Images, A+ Content, Brand Story, Brand Store, Trademark Registration, Amazon DSP, and Full Account Management.",
    tag: "Services",
  },
];

const TAG_COLORS = {
  Results:  "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  About:    "bg-orange-500/15  text-orange-400  border-orange-500/20",
  Pricing:  "bg-cyan-500/15    text-cyan-400    border-cyan-500/20",
  Fit:      "bg-violet-500/15  text-violet-400  border-violet-500/20",
  Services: "bg-amber-500/15   text-amber-400   border-amber-500/20",
};

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function ChatBot() {
  const [isOpen,       setIsOpen]      = useState(false);
  const [visible,      setVisible]     = useState(false);
  const [messages,     setMessages]    = useState([]);
  const [remaining,    setRemaining]   = useState(QA);
  const [isTyping,     setIsTyping]    = useState(false);
  const [showPulse,    setShowPulse]   = useState(true);
  const [hasGreeted,   setHasGreeted]  = useState(false);
  const [allAnswered,  setAllAnswered] = useState(false);
  const messagesEnd = useRef(null);

  /* show button after scroll */
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 500) {
        setVisible(true);
      } else {
        setVisible(false);
        setIsOpen(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* auto scroll */
  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* greeting on first open */
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      setShowPulse(false);
      setTimeout(() => {
        setMessages([{
          sender: "bot",
          text: (
            <span>
              Hey! 👋 I'm the Grow Orbit assistant. Pick a question below — or <span className="italic font-light lowercase text-orange-400" style={{ fontFamily: "'Playfair Display', serif" }}>book your free call</span> directly.
            </span>
          ),
          time: now(),
        }]);
      }, 300);
    }
  }, [isOpen, hasGreeted]);

  const now = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleQuestion = (item) => {
    setMessages(prev => [...prev, { sender: "user", text: item.q, time: now() }]);
    const next = remaining.filter(q => q.q !== item.q);
    setRemaining(next);
    if (next.length === 0) setAllAnswered(true);
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "bot", text: item.a, time: now() }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 400);
  };

  const handleReset = () => {
    setRemaining(QA);
    setAllAnswered(false);
    setMessages([{
      sender: "bot",
      text: "Questions reset! What else can I help you with?",
      time: now(),
    }]);
  };

  return (
    <>
      <style>{`
        @keyframes chat-slide-in {
          from { opacity:0; transform:translateX(20px) scale(.97); }
          to   { opacity:1; transform:translateX(0)    scale(1);   }
        }
        .chat-window { animation: chat-slide-in .25s cubic-bezier(.23,1,.32,1) both; }
        @keyframes msg-in {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0);   }
        }
        .msg { animation: msg-in .2s ease both; }
        @keyframes dot-bounce {
          0%,80%,100% { transform:translateY(0);    }
          40%          { transform:translateY(-5px); }
        }
        .dot:nth-child(1){ animation:dot-bounce 1.2s .0s infinite; }
        .dot:nth-child(2){ animation:dot-bounce 1.2s .2s infinite; }
        .dot:nth-child(3){ animation:dot-bounce 1.2s .4s infinite; }
      `}</style>

      {/* ── FLOATING BUTTON ── */}
      <div className={`fixed bottom-24 md:bottom-7 right-5 z-[9999] transition-all duration-500 ${
        visible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0 pointer-events-none"
      }`}>

        {/* Pulse ring when there's something new */}
        {showPulse && !isOpen && (
          <span className="absolute inset-0 rounded-full bg-orange-500 opacity-30 animate-ping" />
        )}

        {/* Notification dot */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center z-10">
            <span className="text-white font-black" style={{fontSize:8}}>!</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(o => !o)}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(249,115,22,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:ring-4 focus-visible:ring-orange-500/50 outline-none"
          style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}
          aria-label={isOpen ? "Close chat" : "Chat with Grow Orbit"}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        >
          {isOpen
            ? <X size={20} className="text-white" />
            : <MessageCircle size={22} className="text-white" />
          }
        </button>
      </div>

      {/* ── CHAT WINDOW ── */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Grow Orbit Chat Assistant"
          className="chat-window fixed bottom-44 md:bottom-28 right-5 z-[9998] flex flex-col overflow-hidden"
          style={{
            width: "min(380px, calc(100vw - 24px))",
            height: "min(560px, calc(100svh - 200px))",
            background: "#0a0a0f",
            borderRadius: 28,
            border: "1px solid rgba(249,115,22,0.2)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(249,115,22,0.08)",
            fontFamily: "'Montserrat',sans-serif",
          }}
        >
          {/* ── HEADER ── */}
          <div className="relative flex items-center gap-3 px-5 py-4 shrink-0"
               style={{ background:"linear-gradient(135deg,#111118,#18180d)", borderBottom:"1px solid rgba(249,115,22,0.15)" }}>
            {/* Orange glow */}
            <div className="absolute right-0 top-0 w-40 h-full opacity-20 pointer-events-none"
                 style={{ background:"radial-gradient(ellipse at right,rgba(249,115,22,.5),transparent 70%)" }}/>

            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                   style={{ background:"linear-gradient(135deg,#f97316,#ea580c)", boxShadow:"0 0 16px rgba(249,115,22,.5)" }}>
                <Zap size={16} className="text-white" fill="white"/>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2"
                   style={{ borderColor:"#0a0a0f" }}/>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-white font-black text-[13px] uppercase tracking-tight leading-none">Grow Orbit</p>
              <p className="text-[10px] font-mono text-emerald-400 mt-0.5 uppercase tracking-widest">● Online · Replies in &lt;2 hrs</p>
            </div>

            <button 
                    onClick={() => setIsOpen(false)}
                    aria-label="Close assistant"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-all shrink-0 focus-visible:bg-white/10 outline-none">
              <X size={15}/>
            </button>
          </div>

          {/* ── MESSAGES ── */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
               style={{ scrollbarWidth:"none" }}>
            {messages.map((m, i) => (
              <div key={i} className={`msg flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                {m.sender === "bot" && (
                  <div className="w-6 h-6 rounded-full mr-2 mt-1 flex items-center justify-center shrink-0"
                       style={{ background:"linear-gradient(135deg,#f97316,#ea580c)" }}>
                    <Zap size={10} className="text-white" fill="white"/>
                  </div>
                )}
                <div className="max-w-[82%]">
                  <div className="px-4 py-2.5 rounded-2xl text-[13px] font-light leading-relaxed"
                       style={m.sender === "bot"
                         ? { background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)", color:"#e4e4e7",
                             borderTopLeftRadius:4 }
                         : { background:"linear-gradient(135deg,#f97316,#ea580c)", color:"#fff",
                             borderTopRightRadius:4, boxShadow:"0 4px 15px rgba(249,115,22,.3)" }
                       }>
                    {m.text}
                  </div>
                  <p className={`text-[9px] font-mono text-zinc-700 mt-1 ${m.sender==="user"?"text-right":"text-left"}`}>
                    {m.time}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing */}
            {isTyping && (
              <div className="msg flex items-end gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                     style={{ background:"linear-gradient(135deg,#f97316,#ea580c)" }}>
                  <Zap size={10} className="text-white" fill="white"/>
                </div>
                <div className="px-4 py-3 rounded-2xl flex gap-1 items-center"
                     style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)", borderTopLeftRadius:4 }}>
                  {[0,1,2].map(i => (
                    <div key={i} className="dot w-1.5 h-1.5 bg-orange-500 rounded-full"/>
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEnd}/>
          </div>

          {/* ── QUESTIONS / CTA ── */}
          <div className="shrink-0 px-4 pb-4 pt-3 space-y-2"
               style={{ borderTop:"1px solid rgba(255,255,255,0.06)" }}>

            {!allAnswered ? (
              <>
                <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest px-1 mb-2">
                  Common questions
                </p>
                <div className="space-y-1.5 max-h-44 overflow-y-auto pr-0.5" style={{scrollbarWidth:"none"}}>
                  {remaining.map((item, i) => (
                    <button key={i} onClick={() => handleQuestion(item)}
                            aria-label={`Ask: ${item.q}`}
                            className="group w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl text-left transition-all duration-300 hover:border-orange-500/30 focus-visible:border-orange-500/50 outline-none"
                            style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)" }}>
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`shrink-0 text-[8px] font-black uppercase tracking-widest border px-1.5 py-0.5 rounded-md ${TAG_COLORS[item.tag]}`}>
                          {item.tag}
                        </span>
                        <span className="text-zinc-300 text-[12px] font-light truncate group-hover:text-white transition-colors">
                          {item.q}
                        </span>
                      </div>
                      <ChevronRight size={12} className="text-zinc-600 group-hover:text-orange-500 shrink-0 transition-colors"/>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest text-center mb-3">
                  Ready to go deeper?
                </p>
                <button onClick={handleReset}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-zinc-400 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-all"
                        style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)" }}>
                  <RotateCcw size={12}/> Ask more questions
                </button>
              </div>
            )}

            {/* ── CTA BUTTONS ── always visible at bottom ── */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer"
                 className="flex items-center justify-center gap-2 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-white transition-all duration-300 hover:opacity-90 active:scale-95"
                 style={{ background:"#25D366", boxShadow:"0 4px 15px rgba(37,211,102,.3)" }}>
                <FaWhatsapp size={14}/> WhatsApp
              </a>
              <a href="/contact"
                 className="flex items-center justify-center gap-2 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] text-white transition-all duration-300 hover:opacity-90 active:scale-95"
                 style={{ background:"linear-gradient(135deg,#f97316,#ea580c)", boxShadow:"0 4px 15px rgba(249,115,22,.3)" }}>
                Book Call <ArrowRight size={12}/>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}