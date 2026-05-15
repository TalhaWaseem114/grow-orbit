import React from "react";
import { ShieldAlert, Users, TrendingDown, EyeOff } from "lucide-react";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500"></div>
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-600/80">
      {children}
    </span>
  </div>
);

export default function TheProblem() {
  const problems = [
    {
      num: "01",
      icon: <ShieldAlert size={20} />,
      riskType: "EXISTENTIAL",
      title: "Platform Dependency",
      desc: "100% of your revenue flows through a single marketplace. One policy change, one suspension, one algorithm shift — and your entire business stalls overnight."
    },
    {
      num: "02",
      icon: <Users size={20} />,
      riskType: "STRATEGIC",
      title: "Zero Customer Ownership",
      desc: "Amazon owns the customer relationship. You can't retarget, you can't email, and you can't build a brand community. Every sale is a one-time transaction with no compounding value."
    },
    {
      num: "03",
      icon: <TrendingDown size={20} />,
      riskType: "FINANCIAL",
      title: "Margin Compression",
      desc: "Between referral fees, FBA costs, and PPC inflation, your margin shrinks every year. A DTC channel lets you recapture 15-30% of revenue lost to platform fees."
    },
    {
      num: "04",
      icon: <EyeOff size={20} />,
      riskType: "OPERATIONAL",
      title: "Data Blindness",
      desc: "Marketplaces gatekeep your customer data. Without purchase history, browsing behavior, or demographic insights, you can't optimize product development or marketing spend."
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-orange-50/60 via-orange-50/30 to-white relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* Left: Sticky Heading */}
          <div className="lg:sticky lg:top-32 text-left">
            <SectionLabel>The Diagnostic</SectionLabel>
            <h2 className="text-[42px] sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] sm:leading-[0.88] mb-6 sm:mb-8 text-zinc-900">
              THE SINGLE-<br />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light lowercase tracking-normal text-zinc-300">CHANNEL TRAP.</span>
            </h2>
            <p className="text-zinc-500 text-base sm:text-lg font-light leading-relaxed max-w-md mb-8">
              Most Amazon brands are one policy update away from catastrophe. <strong className="text-zinc-800 font-semibold">If Amazon suspends your account tomorrow, your DTC store keeps generating revenue.</strong> We build the insurance policy — a revenue channel you own, control, and can scale independently.
            </p>
            <div className="inline-flex items-center gap-2.5 bg-orange-500 text-white px-5 py-2.5 rounded-full">
              <ShieldAlert size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Diversification Required</span>
            </div>
          </div>

          {/* Right: Problem Cards */}
          <div className="space-y-4 sm:space-y-5 mt-10 lg:mt-0">
            {problems.map((p, i) => (
              <div key={i} className="group bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-7 border border-zinc-100/80 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:border-orange-500/20 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden">

                {/* Top row: risk type label */}
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <span className="font-mono text-[8px] font-bold tracking-widest text-zinc-300 uppercase">
                    RISK_TYPE: {p.riskType}
                  </span>
                  <span className="font-mono text-[9px] font-bold text-orange-500 tracking-widest">{p.num}</span>
                </div>

                {/* Icon + Title row */}
                <div className="flex items-start gap-3 sm:gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                    {p.icon}
                  </div>
                  <div className="pt-1.5">
                    <h3 className="font-black text-base sm:text-[17px] uppercase tracking-tight text-zinc-900 leading-tight">{p.title}</h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-500 text-xs sm:text-[13px] font-light leading-relaxed pl-13 sm:pl-14">{p.desc}</p>

                {/* Bottom hover accent */}
                <div className="absolute bottom-0 left-7 right-7 h-px bg-orange-500/0 group-hover:bg-orange-500/20 transition-colors duration-500" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
