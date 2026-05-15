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

export default function OrbitWay() {
  return (
    <section className="py-32 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div>
            <SectionLabel>The Comparison</SectionLabel>
            <h2
              className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900 break-words"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Choose mathematical<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                certainty.
              </span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="w-full md:w-auto shrink-0 flex items-center justify-center gap-3 bg-black hover:bg-orange-500 transition-all duration-300 text-white font-bold text-[11px] uppercase tracking-widest px-8 py-4 rounded-full no-underline"
          >
            Compare Your Account Now <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 rounded-[30px] md:rounded-[40px] overflow-hidden border border-zinc-200">
          {/* Traditional */}
          <div className="bg-white p-6 sm:p-10 lg:p-14">
            <h4 className="text-red-500 font-black text-[10px] uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <AlertCircle size={14} /> Traditional Management
            </h4>
            <ul className="space-y-5">
              {[
                "Manual bid adjustments based on 7-day windows",
                "Generic SEO updates (title & bullet points only)",
                "Reporting focused on ACoS — ignores organic",
                "Reactionary strategy — fixing things after they break",
                "Monthly check-ins with templated recommendations",
              ].map((t, i) => (
                <li key={i} className="flex gap-4 text-sm text-zinc-400 font-light">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-300 mt-2 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Orbit Protocol */}
          <div className="bg-white p-6 sm:p-10 lg:p-14 relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-400" />
            <h4 className="text-orange-500 font-black text-[10px] uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <CheckCircle2 size={14} /> The Orbit Diagnostic Protocol
            </h4>
            <ul className="space-y-5">
              {[
                "Automated daily-parting bids for peak conversion hours",
                "Semantic mapping for niche long-tail keyword dominance",
                "Total Account Contribution Margin reporting",
                "Proactive market conquesting strategy — ahead of the curve",
                "72-hour diagnostic with a 24-month execution blueprint",
              ].map((t, i) => (
                <li key={i} className="flex gap-4 text-sm text-zinc-900 font-medium">
                  <CheckCircle2 size={15} className="text-orange-500 shrink-0 mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
