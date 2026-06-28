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
export default function Conversions() {
  return (
     <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#111] rounded-[50px] p-10 md:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500/10 blur-[120px] rounded-full translate-x-1/2" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-tight">
                  Stop burning spend. <br />
                  <span
                    className="text-orange-500 italic"
                    style={{ fontFamily: "serif" }}
                  >
                    Start Scaling.
                  </span>
                </h2>
                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="text-orange-500" size={20} />
                    <span className="text-gray-300">
                      Detailed TACOS & ROAS Breakdown
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="text-orange-500" size={20} />
                    <span className="text-gray-300">
                      Competitor Keyword Domination Report
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="text-orange-500" size={20} />
                    <span className="text-gray-300">
                      30-60-90 Day Execution Plan
                    </span>
                  </div>
                </div>
                <Link href="/contact/">
                  <button className="bg-orange-500 hover:bg-white hover:text-black transition-all px-10 py-5 rounded-2xl font-bold uppercase text-xs tracking-[0.2em] flex items-center gap-3">
                    Get Your Free Audit <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                <div className="mb-6">
                  <p className="text-orange-500 font-bold text-xs uppercase mb-1">
                    Success Metric
                  </p>
                  <h4 className="text-4xl font-bold">4.2x ROAS Lift</h4>
                  <p className="text-gray-500 text-sm mt-2">
                    Achieved for a Beauty Brand within 60 days of audit
                    implementation.
                  </p>
                </div>
                <div className="h-px bg-white/10 w-full mb-6" />
                <p className="text-gray-400 italic text-sm">
                  "The diagnostic revealed we were spending $12k/month on terms
                  we already ranked #1 for organically. Orbit's strategy saved
                  us $140k/year instantly."
                </p>
                <p className="text-white font-bold text-xs mt-4 uppercase">
                  — CEO, Purevibe Supplements
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

  )
}
