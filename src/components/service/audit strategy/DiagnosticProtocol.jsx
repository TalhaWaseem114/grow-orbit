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
export default function DiagnosticProtocol() {
  return (
       <section className="py-32 bg-black text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <span className="text-orange-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">
              The Diagnostic Protocol
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
              Surgical Account <br />{" "}
              <span className="text-gray-600">Deconstruction.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-[40px] overflow-hidden">
            {[
              {
                icon: <SearchCode className="text-orange-500" />,
                title: "Semantic & SEO Indexing",
                desc: "We map your current keyword footprint against the top 2% of the category. We identify the 'Blind Spots' where your listing is not being indexed by the A9 algorithm, immediately widening your top-of-funnel reach.",
              },
              {
                icon: <Zap className="text-orange-500" />,
                title: "PPC Profitability Audit",
                desc: "We categorize every dollar of spend into 'Growth,' 'Maintenance,' and 'Waste.' By eliminating the waste and reallocating to growth keywords, we typically see a 20-30% ROAS lift in 30 days.",
              },
              {
                icon: <Target className="text-orange-500" />,
                title: "Competitor Market Share",
                desc: "We reverse-engineer the traffic sources of your top 5 competitors. We find out exactly where they are winning (External traffic, specific long-tail keywords, or Brand Defense) and create a conquesting roadmap.",
              },
              {
                icon: <ShieldCheck className="text-orange-500" />,
                title: "Backend Health & Ops",
                desc: "We audit your flat files, category nodes, and VoC (Voice of the Customer) data to ensure you aren't at risk of suppression. We look for the technical errors that lead to suppressed listings before they happen.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-16 bg-black hover:bg-zinc-900 transition-colors duration-500"
              >
                <div className="mb-10">{item.icon}</div>
                <h4 className="text-3xl font-bold mb-6 tracking-tight">
                  {item.title}
                </h4>
                <p className="text-gray-400 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}
