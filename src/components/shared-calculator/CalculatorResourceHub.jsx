"use client";

import Link from "next/link";
import { BookOpen, TrendingUp, Zap, ArrowRight, ShieldCheck } from "lucide-react";

export default function CalculatorResourceHub({ type = "general" }) {
  // Define topical content based on context
  const resources = {
    profit: [
      {
        category: "Proven Case Study",
        icon: <TrendingUp size={16} className="text-orange-500" />,
        title: "How We Engineered an 8.2x Peak ROAS Scale",
        desc: "Read the exact listing re-design and PPC campaign structuring framework that scaled Kazvoo's Amazon division.",
        href: "/case-study/li-01",
        actionText: "View Case Study",
      },
      {
        category: "Actionable Guide",
        icon: <BookOpen size={16} className="text-orange-500" />,
        title: "The 12-Week ACoS Reduction Playbook",
        desc: "Ali's master guide on cutting campaign waste and restructuring bids from 52% down to a highly profitable 18% ACoS.",
        href: "/blog/acos-reduction-framework-ppc",
        actionText: "Read the Playbook",
      },
      {
        category: "Core Service",
        icon: <Zap size={16} className="text-orange-500" />,
        title: "PPC Efficiency Architecture",
        desc: "Deploy our 4-tier campaign structure and competitor conquest bidding templates to hit your margin targets in 8 weeks.",
        href: "/service/ppc-efficiency",
        actionText: "Explore PPC Service",
      },
    ],
    general: [
      {
        category: "Proven Case Study",
        icon: <TrendingUp size={16} className="text-orange-500" />,
        title: "Launching with Zero Reviews to $25K+/Mo",
        desc: "The complete visual authority stack showing how we launched 3 brands without a single review on day one.",
        href: "/case-study/li-02",
        actionText: "View Case Study",
      },
      {
        category: "Actionable Guide",
        icon: <BookOpen size={16} className="text-orange-500" />,
        title: "Re-Engineering Main Images for 168% CTR",
        desc: "Stop competing on price alone. Learn the exact visual hierarchy tricks that turn generic search results into high-converting clicks.",
        href: "/blog/main-image-ctr-amazon-2025",
        actionText: "Read CTR Blueprint",
      },
      {
        category: "Core Service",
        icon: <Zap size={16} className="text-orange-500" />,
        title: "Full-Listing Visual Optimization",
        desc: "Let our designers build CTR-tested main images, high-conversion A+ content comparison tables, and custom brand stories.",
        href: "/service/listing-optimization",
        actionText: "Optimize Listings",
      },
    ],
  };

  const selectedData = resources[type] || resources.general;

  return (
    <div className="mt-16 pt-12 border-t border-zinc-200/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={14} className="text-orange-500" />
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-zinc-400">
              Grow Orbit Topical Ecosystem
            </span>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Master Your <span className="text-orange-500">Amazon Margins</span>
          </h2>
        </div>
        <p className="text-zinc-500 font-light text-sm max-w-sm">
          Calculations are only the first step. Explore the verified playbooks, case results, and services to scale your seller account.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {selectedData.map((item, idx) => (
          <div
            key={idx}
            className="group bg-white border border-zinc-250/50 rounded-3xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:border-orange-500/30 hover:shadow-[0_20px_50px_rgba(249,115,22,0.06)] hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-400 bg-zinc-50 border border-zinc-100 rounded-full px-3 py-1">
                  {item.category}
                </span>
                <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center">
                  {item.icon}
                </div>
              </div>

              <h3 className="text-base font-black uppercase text-zinc-900 tracking-tight mb-2 group-hover:text-orange-500 transition-colors leading-snug">
                {item.title}
              </h3>
              <p className="text-zinc-500 text-xs font-light leading-relaxed mb-6">
                {item.desc}
              </p>
            </div>

            <Link
              href={item.href}
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-500 hover:text-zinc-900 transition-all no-underline w-fit"
            >
              {item.actionText} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
