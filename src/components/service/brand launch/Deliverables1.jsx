import React from 'react'
import {
  Check,
  ArrowRight,
  Search,
  Layers,
  Zap,
  ShieldCheck,
  Globe,
  Compass,
  BarChart3,
  Layout,
  Package,
  Activity,
  Rocket
} from 'lucide-react';

export default function Deliverables1() {
  return (
   <section className="py-24 bg-white relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">

    {/* Section Header for the Grid */}
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
      <div className="max-w-xl">
        <span className="text-orange-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">
          Inventory
        </span>
        <h2 className="text-4xl font-bold tracking-tighter text-[#111]">
          Launch <span className="text-zinc-400 italic font-serif">Deliverables.</span>
        </h2>
      </div>
      <p className="text-zinc-500 text-sm font-light max-w-xs leading-relaxed">
        Every mission critical component required for a successful Tier-1 market entry, engineered to perfection.
      </p>
    </div>

    {/* The Grid Container */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-zinc-200 border border-zinc-200 rounded-[32px] overflow-hidden shadow-2xl shadow-zinc-200/50">
      {[
        { label: "Product Validation", icon: <Package size={20}/>, id: "PV-01" },
        { label: "Keyword Research", icon: <Search size={20}/>, id: "KR-02" },
        { label: "Listing SEO", icon: <Layers size={20}/>, id: "LS-03" },
        { label: "Image Strategy", icon: <Compass size={20}/>, id: "IS-04" },
        { label: "A+ Planning", icon: <Layout size={20}/>, id: "AP-05" },
        { label: "PPC Structure", icon: <Zap size={20}/>, id: "PS-06" },
        { label: "Brand Store", icon: <Globe size={20}/>, id: "BS-07" },
        { label: "FBA Planning", icon: <BarChart3 size={20}/>, id: "FP-08" }
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white p-8 lg:p-12 hover:bg-zinc-50 transition-all duration-500 group relative overflow-hidden"
        >
          {/* Decorative "Scanning" Line on Hover */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-orange-500 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out opacity-50"></div>

          <div className="relative z-10">
            {/* Top Row: Icon and ID */}
            <div className="flex justify-between items-start mb-10">
              <div className="text-zinc-300 group-hover:text-orange-500 group-hover:scale-110 transition-all duration-500">
                {item.icon}
              </div>
              <span className="text-[9px] font-mono text-zinc-300 tracking-tighter uppercase group-hover:text-zinc-500">
                {item.id}
              </span>
            </div>

            {/* Label */}
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-800 group-hover:translate-x-1 transition-transform duration-300">
              {item.label}
            </p>

            {/* Mini Progress Bar (Aesthetic only) */}
            <div className="mt-4 w-8 h-[1px] bg-zinc-100 group-hover:w-full group-hover:bg-orange-200 transition-all duration-700"></div>
          </div>

          {/* Bottom Right Corner Accent */}
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-r border-b border-zinc-100 group-hover:border-orange-300 transition-colors"></div>
        </div>
      ))}
    </div>
  </div>
</section>
  )
}
