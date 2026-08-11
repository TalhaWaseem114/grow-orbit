"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight, BarChart3, Search, Target, Zap, Cpu, Settings, Activity,
  Camera, Sparkles, BookOpen, Layout, MousePointerClick, Palette, Layers,
  Award, FileText, HeartHandshake, Monitor, Radio, Gavel, ChevronRight
} from "lucide-react";
import PlanetIcon from "@/components/ui/PlanetIcon";

/* ─────────────────────────────────────────────
   SERVICE DATA
───────────────────────────────────────────── */
const serviceGroups = [
  {
    label: "Amazon Services",
    color: "orange",
    items: [
      { icon: <Search size={16} />,        title: "Product Hunting & Sourcing",       desc: "Discover high-margin, low-competition products.", href: "/service/product-hunting-sourcing" },
      { icon: <BarChart3 size={16} />,     title: "PPC Efficiency",        desc: "Lower ACoS, higher ROAS, zero wasted spend.", href: "/service/ppc-efficiency" },
      { icon: <Search size={16} />,        title: "Listing Optimization",  desc: "A9-optimized copy that indexes and converts.",  href: "/service/listing-optimization" },
      { icon: <Target size={16} />,        title: "Audit & Strategy",      desc: "72-hour audit. 24-month growth roadmap.",       href: "/service/audit-strategy" },
      { icon: <Zap size={16} />,           title: "Brand Launch Setup",    desc: "Listings, PPC, and Brand Registry built launch-ready.", href: "/service/brand-launch" },
      { icon: <Cpu size={16} />,           title: "Growth Automation",     desc: "Repricing, alerts, review workflows on autopilot.", href: "/service/growth-automation" },
      { icon: <Settings size={16} />,      title: "Account Ops",           desc: "Case management, suppression recovery, defense.", href: "/service/account-ops" },
      { icon: <Activity size={16} />,      title: "Ongoing Support",       desc: "Weekly optimization cycles, performance tracking.", href: "/service/ongoing-support" },
    ],
  },
  {
    label: "Design & Creative",
    color: "violet",
    items: [
      { icon: <Camera size={16} />,        title: "Listing Images",        desc: "Hero shots, lifestyle, and infographics built to convert.", href: "/service/design/listing-image-systems" },
      { icon: <Sparkles size={16} />,      title: "A+ Content (EBC)",      desc: "Below-the-fold modules that close the sale.",     href: "/service/design/enhanced-brand-content" },
      { icon: <BookOpen size={16} />,      title: "Brand Story",           desc: "Above-the-fold narrative + catalog cross-sell.",  href: "/service/design/brand-story" },
      { icon: <Layout size={16} />,        title: "Brand Store",           desc: "Custom storefront, sub-pages, vanity URL.",      href: "/service/design/brand-store" },
      { icon: <MousePointerClick size={16}/>,title: "Main Image CTR",     desc: "Engineered to win the click on the search grid.", href: "/service/design/main-image-ctr" },
      { icon: <Palette size={16} />,       title: "Brand Guidelines",      desc: "Logo, colors, and typography in one cohesive system.", href: "/service/design/brand-guidelines" },
      { icon: <Layers size={16} />,        title: "Full Overhaul",         desc: "All 7 image slots rebuilt as a conversion system.", href: "/service/design/full-listing-optimization" },
    ],
  },
  {
    label: "Full Service & Tech",
    color: "emerald",
    items: [
      { icon: <Award size={16} />,         title: "Full Account Management", desc: "One team. Every lever. Total ownership.",          href: "/service/full/amazon-management" },
      { icon: <FileText size={16} />,      title: "SOP Frameworks",        desc: "Documented workflows ready to delegate.",          href: "/service/sop" },
      { icon: <HeartHandshake size={16} />,title: "Direct Coaching",       desc: "1-on-1 strategy with senior operators.",           href: "/service/coaching-consultation" },
      { icon: <Monitor size={16} />,       title: "DTC Website",           desc: "Shopify or custom off-Amazon revenue channels.",  href: "/service/dtc-website" },
      { icon: <Radio size={16} />,         title: "Amazon DSP",            desc: "Programmatic ads on and off Amazon.",               href: "/service/amazon-dsp" },
      { icon: <Gavel size={16} />,         title: "Trademark Filing",      desc: "Brand Registry across 7 countries.",                href: "/service/trademark-registration" },
    ],
  },
];

const colorMap = {
  orange:  { dot: "bg-orange-500",  badge: "bg-orange-50 text-orange-800 border-orange-100/80", icon: "bg-orange-50 text-orange-800 group-hover:bg-orange-500", rgb: "249,115,22"  },
  violet:  { dot: "bg-violet-500",  badge: "bg-violet-50 text-violet-700 border-violet-100/80", icon: "bg-violet-50 text-violet-700 group-hover:bg-violet-500", rgb: "139,92,246"   },
  emerald: { dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700 border-emerald-100/80", icon: "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-500", rgb: "16,185,129" },
};

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function ServicesSection({ mode }) {
  const filteredGroups = React.useMemo(() => {
    if (mode === "amazon-services") {
      return serviceGroups.filter(g => g.label === "Amazon Services" || g.label === "Full Service & Tech");
    }
    if (mode === "design-creative") {
      return serviceGroups.filter(g => g.label === "Design & Creative" || g.label === "Full Service & Tech");
    }
    return serviceGroups;
  }, [mode]);
  return (
    <section id="services-grid" className="py-32 bg-white relative scroll-mt-24">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="home-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="currentColor" className="text-zinc-950" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#home-grid)" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 items-start">

          {/* Left Column: Sticky Heading */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 lg:self-start">
             <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-6 sm:w-8 h-[2px] bg-orange-500" />
                <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">The Ecosystem</span>
             </div>

             <h2
               className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-montserrat font-black tracking-tighter leading-[0.85] sm:leading-[0.88] mb-6 sm:mb-8 text-zinc-950 uppercase"
             >
               20+<br />
               SERVICES.<br />
               <span 
                 className="italic font-light lowercase tracking-tight text-zinc-300 block mt-2 leading-none"
                 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(48px, 8vw, 72px)' }}
               >
                 one unified strategy.
               </span>
             </h2>

             <p className="text-zinc-600 text-base sm:text-lg font-light leading-relaxed max-w-sm mb-8 sm:mb-10">
               Every layer moves revenue. Nothing decorative, nothing redundant, activated in the right order at the right time.
             </p>

             <div className="flex flex-col gap-4 sm:gap-5">
               <Link href="/contact" prefetch={false} className="group flex items-center gap-3 text-orange-500 font-bold text-[10px] sm:text-[11px] uppercase tracking-widest hover:gap-5 transition-all no-underline">
                 Build Your Custom Package
                 <ArrowRight size={14} />
               </Link>
               <Link href="/service" prefetch={false} className="group flex items-center gap-3 text-zinc-400 hover:text-zinc-900 font-bold text-[10px] sm:text-[11px] uppercase tracking-widest transition-all no-underline">
                 Explore All Services
                 <ChevronRight size={14} />
               </Link>
             </div>
          </div>

          {/* Right Column: Service Groups */}
          <div className="lg:col-span-7 space-y-5">
            {filteredGroups.map((group, gi) => {
              const c = colorMap[group.color];
              return (
                <div key={gi} className="bg-[#FAFAFA] rounded-[32px] border border-zinc-100 overflow-hidden hover:shadow-xl hover:shadow-zinc-200/40 transition-all duration-500">
                  <div className="px-8 py-5 border-b border-zinc-100 flex items-center gap-3 bg-white/40 backdrop-blur-sm">
                    <PlanetIcon baseColor={c.rgb} width="22" height="22" className="drop-shadow-sm" />
                    <span className="font-montserrat font-black text-[11px] uppercase tracking-[0.3em] text-zinc-900">{group.label}</span>
                    <span className={`ml-auto font-montserrat text-[9px] font-black uppercase tracking-widest border px-3 py-1 rounded-full ${c.badge}`}>
                      {group.items.length} items
                    </span>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-6 gap-px bg-zinc-100">
                    {group.items.map((item, ii) => {
                      const isLast = ii === group.items.length - 1;
                      const isLastRow2Cols = (group.items.length % 3 === 2) && (ii >= group.items.length - 2);
                      const isOrphan = isLast && (group.items.length % 2 !== 0 || group.items.length % 3 === 1);
                      
                      let colSpanClass = "col-span-1 lg:col-span-2";
                      if (isOrphan) colSpanClass = "col-span-2 lg:col-span-6 flex items-center gap-4 sm:gap-6";
                      else if (isLastRow2Cols) colSpanClass = "col-span-1 lg:col-span-3";

                      return (
                        <Link key={ii} href={item.href} prefetch={false} className={`group bg-[#FAFAFA] hover:bg-white p-4 sm:p-6 transition-all duration-300 no-underline block ${colSpanClass}`}>
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl border flex items-center justify-center ${isOrphan ? "" : "mb-3 sm:mb-4"} transition-all duration-500 group-hover:text-white ${c.icon} border-zinc-100 group-hover:border-transparent group-hover:scale-110 shrink-0`}>
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-montserrat font-black text-[12px] uppercase tracking-tight text-zinc-900 mb-1 group-hover:text-orange-500 transition-colors">{item.title}</h3>
                            <p className="text-zinc-600 text-[11px] font-light leading-relaxed">{item.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* CTA Box */}
            <div className="bg-zinc-950 rounded-[32px] p-8 border border-white/5 relative overflow-hidden group shadow-2xl shadow-zinc-950/20">
               <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-orange-500 to-amber-400 transition-opacity duration-500" />
               <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                 <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center shrink-0">
                       <Award size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-montserrat font-black text-[13px] uppercase tracking-widest leading-tight">Growth On Steroids</h3>
                      <p className="text-zinc-400 text-[11px] font-light mt-1">Ready for a full account takeover? Let's talk.</p>
                    </div>
                 </div>
                 <Link href="/contact" prefetch={false} className="px-8 py-3.5 bg-orange-700 text-white rounded-xl font-montserrat font-black text-sm uppercase tracking-[0.15em] hover:bg-orange-800 transition-all duration-300 no-underline whitespace-nowrap shadow-lg shadow-orange-700/25">
                   Get Custom Strategy Proposal
                 </Link>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
