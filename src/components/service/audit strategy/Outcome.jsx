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
export default function Outcome() {
  return (
    <section className="py-32 bg-[#F6F6F6] relative overflow-hidden">
          {/* Subliminal Dots Pattern (Left Anchor) */}
          <div
            className="absolute top-0 left-0 w-1/3 h-full opacity-[0.15] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
              maskImage: "linear-gradient(to right, black, transparent)",
            }}
          ></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-20 items-start">
              {/* LEFT COLUMN: THE OFFER */}
              <div className="lg:w-1/3 lg:sticky lg:top-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-orange-500"></span>
                  <span className="text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px]">
                    Deliverables
                  </span>
                </div>

                <h2 className="text-5xl font-bold tracking-tighter mb-6 text-black">
                  The <span className="italic font-serif">Outcome.</span>
                </h2>

                <p className="text-gray-500 font-light leading-relaxed mb-10 text-lg">
                  You don't just get a meeting. You receive a{" "}
                  <span className="text-black font-medium">
                    Technical Blueprint
                  </span>
                  —a high-fidelity execution roadmap for immediate deployment.
                </p>

                {/* The Guarantee Card (Enhanced) */}
                <div className="relative group p-10 bg-orange-500 rounded-[40px] text-white shadow-2xl shadow-orange-500/20 overflow-hidden transition-transform hover:-translate-y-1 duration-500">
                  {/* Decorative Circle */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                        <ShieldCheck size={20} />
                      </div>
                      <h4 className="font-bold text-xl">Guaranteed Insight</h4>
                    </div>

                    <p className="text-sm opacity-90 leading-relaxed mb-8 font-light">
                      If our diagnostic fails to identify at least{" "}
                      <span className="font-bold text-white">$10,000</span> in
                      wasted spend or untapped growth, the entire audit is on us.
                    </p>

                    <button className="w-full py-4 bg-white text-black rounded-[20px] font-black text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-lg">
                      Secure My Priority Spot
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: THE BLUEPRINTS */}
              <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    id: "DOC-24M",
                    title: "24-Month Roadmap",
                    desc: "A month-by-month execution plan detailing spend logic, product launches, and ranking targets.",
                    icon: <Calendar size={22} />,
                  },
                  {
                    id: "KWM-5K",
                    title: "Keyword Master-Map",
                    desc: "A comprehensive database of 5,000+ keywords categorized by purchase intent and competition.",
                    icon: <MapIcon size={22} />,
                  },
                  {
                    id: "P&L-FOR",
                    title: "Profit/Loss Forecast",
                    desc: "A technical financial model projecting contribution margins as we surgically scale your ROAS.",
                    icon: <TrendingUp size={22} />,
                  },
                  {
                    id: "CRV-WF",
                    title: "Creative Wireframes",
                    desc: "Structural blueprints for your A+ Content and Listing Images based on eye-tracking data.",
                    icon: <Layout size={22} />,
                  },
                ].map((doc, i) => (
                  <div
                    key={i}
                    className="relative p-10 bg-white rounded-[40px] border border-black/[0.03] group hover:border-orange-500/20 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-500"
                  >
                    {/* Document ID Tag */}
                    <div className="absolute top-8 right-10">
                      <span className="text-[9px] font-mono text-zinc-300 font-bold group-hover:text-orange-500 transition-colors">
                        {doc.id}
                      </span>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-[#F6F6F6] flex items-center justify-center text-zinc-400 group-hover:bg-orange-500/10 group-hover:text-orange-600 transition-all duration-500 mb-8">
                      {doc.icon}
                    </div>

                    <h4 className="text-xl font-bold mb-3 tracking-tight group-hover:text-black transition-colors">
                      {doc.title}
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed font-light group-hover:text-gray-600 transition-colors">
                      {doc.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
  )
}
