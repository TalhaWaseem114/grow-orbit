"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const team = [
  { name: "Rahul Gupta", role: "Co-Founder & Growth Strategist" },
  { name: "Akash Sharma", role: "PPC & Performance Lead" },
  { name: "Vikram Singh", role: "Design & Listings Lead" },
  { name: "Neha Verma", role: "Brand & Account Manager" },
  { name: "Arjun Mehta", role: "Sales & Analytics Lead" },
];

export default function TeamThree() {
  return (
    <section className="py-28" style={{ background: "#050505", fontFamily: "'Montserrat', sans-serif" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-8 h-[1px] bg-orange-500/30" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-orange-500">
              The Team
            </span>
            <div className="w-8 h-[1px] bg-orange-500/30" />
          </div>
          <h2 className="text-3xl md:text-[44px] font-[900] text-white tracking-tight leading-[1.1]">
            Experts Behind Your Growth
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {team.map((member, i) => (
            <div key={i} className="group flex flex-col items-center text-center">
              {/* Photo placeholder */}
              <div className="w-full aspect-[3/4] rounded-[28px] bg-zinc-900 border border-white/[0.05] mb-5 overflow-hidden relative group-hover:border-orange-500/25 group-hover:shadow-[0_12px_30px_rgba(249,115,22,0.08)] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <div className="absolute inset-0 flex items-center justify-center text-zinc-800/30 font-[900] text-6xl italic uppercase select-none">
                  {member.name.split(" ")[0]}
                </div>
              </div>

              <h3 className="text-[12px] font-[900] text-white mb-1 group-hover:text-orange-500 transition-colors">
                {member.name}
              </h3>
              <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest leading-tight max-w-[140px]">
                {member.role}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <button className="px-8 py-3.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-white transition-all duration-300 active:scale-95 inline-flex items-center gap-2">
            Meet The Full Team <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </section>
  );
}
