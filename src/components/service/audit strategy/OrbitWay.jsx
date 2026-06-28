import React from 'react'
import {
  ClipboardCheck,
  BarChart4,
  Target,
  PieChart,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Zap,
  SearchCode,
  AlertCircle,
  CheckCircle2,
  TrendingDown,
  Activity,
  Search,
  Layers,
  Database,
  DollarSign,
  ArrowUpRight,
  Calendar,
  Layout,
  ChevronRight,
  MapIcon,
} from "lucide-react";
import Link from "next/link";

export default function OrbitWay() {
  return (
      <section className="py-32 bg-[#F6F6F6] px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <h2 
              className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.88] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Choose Mathematical <br className="hidden sm:block" />
              <span className="text-[1.35em] italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>certainty.</span>
            </h2>
            <Link
              href="/contact/"
              className="px-8 py-4 bg-black text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-orange-500 transition-colors"
            >
              Compare Your Account Now
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/5 rounded-[48px] overflow-hidden border border-black/5">
            <div className="bg-white p-12">
              <h4 className="text-red-500 font-bold uppercase tracking-widest text-[10px] mb-8 flex items-center gap-2">
                <AlertCircle size={14} /> Traditional Management
              </h4>
              <ul className="space-y-6">
                {[
                  "Manual bid adjustments based on 7-day windows.",
                  "Generic SEO updates (Title/Bullet points only).",
                  "Reporting focused on ACOS (ignores organic).",
                  "Reactionary strategy (fixing things after they break).",
                ].map((t, i) => (
                  <li key={i} className="flex gap-4 text-sm text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/30 mt-2 flex-shrink-0"></span>{" "}
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-12 relative group">
              <div className="absolute inset-0 bg-orange-500/[0.02] pointer-events-none"></div>
              <h4 className="text-orange-600 font-bold uppercase tracking-widest text-[10px] mb-8 flex items-center gap-2">
                <CheckCircle2 size={14} /> The Orbit Protocol
              </h4>
              <ul className="space-y-6">
                {[
                  "Automated daily-parting bids for peak conversion hours.",
                  "Semantic Mapping for niche keyword dominance.",
                  "Total Account Contribution Margin reporting.",
                  "Proactive market conquesting strategy.",
                ].map((t, i) => (
                  <li
                    key={i}
                    className="flex gap-4 text-sm text-black font-medium"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-orange-500 flex-shrink-0 mt-0.5"
                    />{" "}
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
  )
}
