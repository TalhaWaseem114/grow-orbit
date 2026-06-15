"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Lock, Calculator, TrendingUp, 
  PieChart, Activity, DollarSign, Target, 
  Settings, Search, Sparkles, Shield, ArrowUpRight
} from 'lucide-react';

const toolsConfig = [
  {
    name: "Product Research Estimator",
    slug: "/amazon-tools/quick-estimator",
    status: "active",
    category: "Financial Intelligence",
    description: "Fast 15-second analysis of unit economics (margins, ROI, and FBA tier limits).",
    icon: <Search size={18} className="text-orange-500" />,
    features: [
      "Quick 4-field inputs",
      "Immediate margin & ROI math",
      "No advanced inputs needed"
    ]
  },
  {
    name: "Amazon Profit Calculator",
    slug: "/amazon-tools/profit-calculator",
    status: "active",
    category: "Financial Intelligence",
    description: "Full unit-economics analysis including forward, reverse, and VAT modes.",
    icon: <Calculator size={18} className="text-orange-500" />,
    features: [
      "VAT & PPC cost buffers",
      "Target margin reverse solver",
      "Dynamic stacked allocation bar"
    ]
  },
  {
    name: "Amazon Fee Calculator",
    slug: "/amazon-tools/fba-fee-calculator",
    status: "active",
    category: "Financial Intelligence",
    description: "Break down FBA fulfillment, storage, and referral category fees with precision.",
    icon: <DollarSign size={18} className="text-orange-500" />,
    features: [
      "Inbound placement line item",
      "Package dimension tiering",
      "US & UK fee schedule loaders"
    ]
  },
  {
    name: "FBA vs. FBM vs. 3PL Calculator",
    slug: "/amazon-tools/fba-vs-fbm-vs-3pl",
    status: "active",
    category: "Operational Forecasting",
    description: "Compare logistics net returns side-by-side between FBA, FBM, and 3PL networks.",
    icon: <Settings size={18} className="text-orange-500" />,
    features: [
      "3-way cost scorecard",
      "Mobile-stacked cost layouts",
      "Direct merchant shipping comparison"
    ]
  },
  {
    name: "Storage Fee Calculator",
    slug: "/amazon-tools/storage-fee-calculator",
    status: "active",
    category: "Operational Forecasting",
    description: "Forecast cumulative monthly storage fees, Q4 peaks, and long-term aged inventory surcharges.",
    icon: <PieChart size={18} className="text-orange-500" />,
    features: [
      "Peak Q4 fee forecasting",
      "Cubic foot volume math",
      "365-day aged fee warning"
    ]
  },
  {
    name: "Break-Even ACOS Calculator",
    slug: "#",
    status: "coming-soon",
    category: "Growth & PPC Systems",
    description: "Find your exact break-even advertising thresholds and target TACOS.",
    icon: <Target size={18} className="text-zinc-400" />,
    features: [
      "Target TACOS profit modeler",
      "Ad spend safety threshold",
      "Keyword bid ceiling finder"
    ]
  },
  {
    name: "PPC Budget Calculator",
    slug: "#",
    status: "coming-soon",
    category: "Growth & PPC Systems",
    description: "Forecast required ad spend based on target organic rank velocity.",
    icon: <TrendingUp size={18} className="text-zinc-400" />,
    features: [
      "Keyword traffic forecasting",
      "Category share simulators",
      "Velocity-based spend planning"
    ]
  },
  {
    name: "Amazon Growth Audit Tool",
    slug: "#",
    status: "coming-soon",
    category: "Growth & PPC Systems",
    description: "Automated analysis of your listing conversion rates and SEO weight.",
    icon: <Activity size={18} className="text-zinc-400" />,
    features: [
      "Conversion rate benchmarking",
      "Listing content weight score",
      "SEO density & index audit"
    ]
  }
];

export default function AmazonToolsDashboard() {
  const [activeTab, setActiveTab] = useState("All");

  // Group tools by category for structured dashboard layout
  const categories = useMemo(() => {
    const groups = {};
    toolsConfig.forEach(tool => {
      if (!groups[tool.category]) {
        groups[tool.category] = [];
      }
      groups[tool.category].push(tool);
    });
    return groups;
  }, []);

  const tabList = ["All", "Financial Intelligence", "Operational Forecasting", "Growth & PPC Systems"];

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative Grid Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      {/* Premium background glowing elements */}
      <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-orange-500/[0.03] blur-[100px] rounded-full pointer-events-none no-print" />
      <div className="absolute bottom-20 right-1/4 w-[600px] h-[600px] bg-indigo-500/[0.03] blur-[150px] rounded-full pointer-events-none no-print" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Breadcrumb back */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-orange-500 transition-colors mb-8"
        >
          ← Return to Home
        </Link>

        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full px-3.5 py-1.5 mb-6 shadow-xs">
            <Sparkles size={11} className="text-orange-600 animate-pulse" />
            <span className="text-orange-700 font-black uppercase tracking-[0.2em] text-[9px]">
              Orbit Advanced Suite
            </span>
          </div>

          <h1 
            className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-zinc-950 mb-4 leading-none" 
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Amazon <span className="text-orange-500">Intelligence</span> Hub
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 font-light leading-relaxed max-w-2xl">
            Enterprise-grade financial calculators, profit engineering systems, and unit-economic simulators designed to help high-scale Amazon brands audit and optimize margins.
          </p>

          {/* Quick stats banner */}
          <div className="flex items-center gap-6 sm:gap-8 mt-8 border border-zinc-200/50 bg-white/60 backdrop-blur-md rounded-2xl py-3 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
            <div className="text-left">
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 block mb-0.5">Calculators</span>
              <span className="text-xs sm:text-sm font-black text-zinc-950 uppercase">8 Systems</span>
            </div>
            <div className="w-px h-8 bg-zinc-200" />
            <div className="text-left">
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 block mb-0.5">Status</span>
              <span className="text-xs sm:text-sm font-black text-orange-500 flex items-center gap-1.5 uppercase">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping" />
                Active Pro
              </span>
            </div>
            <div className="w-px h-8 bg-zinc-200" />
            <div className="text-left">
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 block mb-0.5">Access</span>
              <span className="text-xs sm:text-sm font-black text-zinc-950 flex items-center gap-1 uppercase">
                <Shield size={11} className="text-zinc-950 shrink-0" />
                Unlimited
              </span>
            </div>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12 max-w-2xl mx-auto border-b border-zinc-200/40 pb-6">
          {tabList.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer border
                ${activeTab === tab 
                  ? "bg-zinc-950 border-zinc-950 text-white shadow-xs" 
                  : "bg-white border-zinc-200/80 text-zinc-450 hover:text-zinc-800 hover:border-zinc-300"
                }`}
            >
              {tab === "All" ? "All Systems" : tab}
            </button>
          ))}
        </div>

        {/* Tools Config categories rendering */}
        <div className="space-y-16">
          {Object.entries(categories).map(([categoryName, tools]) => {
            // If tab filters out this category, skip
            if (activeTab !== "All" && activeTab !== categoryName) return null;

            return (
              <div key={categoryName} className="space-y-6">
                
                {/* Category Header */}
                <div className="flex items-center gap-3 border-b border-zinc-200/50 pb-3">
                  <div className="w-1.5 h-5 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full" />
                  <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-850">
                    {categoryName}
                  </h2>
                  <span className="text-[9px] font-bold bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {tools.length} Tools
                  </span>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tools.map((tool) => {
                    const isActive = tool.status === "active";
                    
                    if (isActive) {
                      return (
                        <Link 
                          key={tool.name} 
                          href={tool.slug}
                          className="group relative bg-white p-6 rounded-[24px] border border-zinc-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-orange-500/30 transition-all duration-300 flex flex-col justify-between"
                        >
                          <div>
                            {/* Card top bar */}
                            <div className="flex items-center justify-between mb-6">
                              <div className="w-10 h-10 bg-orange-500/5 group-hover:bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 border border-orange-500/10 transition-colors">
                                {tool.icon}
                              </div>
                              
                              {/* Pulsing Active badge */}
                              <span className="bg-emerald-500/5 text-emerald-600 border border-emerald-500/10 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                Unlocked FBA
                              </span>
                            </div>

                            {/* Tool Name & Desc */}
                            <h3 className="text-[17px] font-extrabold uppercase tracking-tight text-zinc-900 mb-1.5 group-hover:text-orange-500 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                              {tool.name}
                            </h3>
                            <p className="text-xs text-zinc-400 font-medium leading-relaxed mb-5">
                              {tool.description}
                            </p>

                            {/* Enclosed Bullet features wrapper */}
                            <div className="space-y-2 mb-6 bg-zinc-50/50 p-4 rounded-2xl">
                              {tool.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                                  <span className="text-[10px] font-bold text-zinc-650 uppercase tracking-wider">
                                    {feature}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* CTA button with clean grey circle to orange hover animation */}
                          <div className="w-full pt-4 border-t border-zinc-100/80 flex items-center justify-between transition-colors">
                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-800 transition-colors">
                              Launch Calculator
                            </span>
                            <div className="w-7 h-7 rounded-full bg-zinc-50 group-hover:bg-orange-500 text-zinc-400 group-hover:text-white border border-zinc-200/80 group-hover:border-orange-500 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1.5 shadow-2xs">
                              <ArrowRight size={12} />
                            </div>
                          </div>

                        </Link>
                      );
                    } else {
                      // Coming soon locked card
                      return (
                        <div 
                          key={tool.name} 
                          className="group relative bg-white/40 p-6 rounded-[24px] border border-zinc-200/30 backdrop-blur-xs shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col justify-between select-none opacity-85 transition-all duration-300"
                        >
                          <div>
                            {/* Card top bar */}
                            <div className="flex items-center justify-between mb-6">
                              <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-450 border border-zinc-200/50">
                                {tool.icon}
                              </div>
                              
                              {/* Lock badge */}
                              <span className="bg-zinc-100 text-zinc-400 border border-zinc-200 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1">
                                <Lock size={8} /> Coming Soon
                              </span>
                            </div>

                            {/* Tool Name & Desc */}
                            <h3 className="text-[17px] font-extrabold uppercase tracking-tight text-zinc-400 mb-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                              {tool.name}
                            </h3>
                            <p className="text-xs text-zinc-400/80 font-medium leading-relaxed mb-5">
                              {tool.description}
                            </p>

                            {/* Enclosed Bullet features wrapper */}
                            <div className="space-y-2 mb-6 bg-zinc-100/30 p-4 rounded-2xl">
                              {tool.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" />
                                  <span className="text-[10px] font-bold text-zinc-400/80 uppercase tracking-wider">
                                    {feature}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* CTA button (Request Access Link) */}
                          <div className="w-full pt-4 border-t border-zinc-100/80 flex items-center justify-between">
                            <Link
                              href={`/contact?ref=request-access&tool=${encodeURIComponent(tool.name)}`}
                              className="text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-orange-500 transition-colors flex items-center gap-1 cursor-pointer hover:underline"
                            >
                              Request Access <ArrowUpRight size={10} />
                            </Link>
                            <div className="w-7 h-7 rounded-full bg-zinc-50 border border-zinc-150 text-zinc-300 flex items-center justify-center shadow-3xs">
                              <Lock size={10} />
                            </div>
                          </div>

                        </div>
                      );
                    }
                  })}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
