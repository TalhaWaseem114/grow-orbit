"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, LayoutDashboard,
  Calendar, ShieldCheck, Truck, BarChart3, Settings2
} from "lucide-react";

// --- Sub-component: The Primary Gradient Button ---
const AuditCTAButton = ({ href = "/contact", children }) => (
  <Link
    href={href}
    className="group relative inline-flex justify-center w-full sm:w-auto px-6 sm:px-10 py-4 bg-orange-600 text-white rounded-full font-bold text-[9px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.3em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:scale-[1.02] active:scale-95 no-underline border-none"
  >
    <span className="relative z-10 flex items-center justify-center gap-3 sm:gap-4 w-full">
      {children}
      <ArrowRight size={16} className="group-hover:translate-x-2 transition-all duration-300 text-white" />
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-orange-400 transition-transform duration-500 ease-in-out"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[horizontal-scan_2s_linear_infinite]"></div>
  </Link>
);

export default function AccountOperationsCTA() {
  return (
    <div className="w-full pb-10 bg-[#fafafa]">
      <section className="px-4 md:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Main Container - Height locked to match Growth/PPC/Audit pages */}
          <div className="bg-[#0a0a0a] rounded-[40px] py-14 px-8 lg:px-20 text-left relative overflow-hidden border border-white/5 group shadow-none">

            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />

            {/* Background Large Icon Decor - Dashboard for Ops focus */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.05] translate-x-1/4">
              <LayoutDashboard size={600} strokeWidth={0.2} className="text-orange-500" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">

              {/* Left Column: Content */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-white font-bold text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.4em]">Account Health Check: Active</span>
                </div>

                <h2
                  className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tighter mb-6 md:mb-8 leading-[0.9] text-white uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Smooth Ops.<br />
                  <span className="italic font-light block mt-2 tracking-normal text-orange-500 lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                    zero friction.
                  </span>
                </h2>

                <p className="text-zinc-400 font-light mb-8 md:mb-10 text-sm md:text-lg leading-relaxed max-w-xl">
                  Most account problems are invisible until they cost you rank, revenue, or both. We watch everything so nothing slips.
                </p>

                <p className="text-[10px] md:text-[11px] italic text-zinc-500 mb-4 flex items-center gap-2">
                  <span className="text-orange-500 not-italic">★★★★★</span>
                  "Joined as Account Ops. Revenue up 38% in 60 days." — Electronics Brand
                </p>
                <div className="flex flex-col gap-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                    <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-[0.2em] font-bold">Issues flagged within 4 hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                    <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-[0.2em] font-bold">Cases opened same day</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-8 md:gap-14 mb-12 md:mb-16">
                  <div className="shrink-0">
                    <AuditCTAButton href="/get-started">
                      Get Free Strategy Call
                    </AuditCTAButton>
                  </div>
                </div>

                {/* Bottom Row Points */}
                <div className="pt-8 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                  {[
                    "IPI & Storage Audit",
                    "Shipment Reconciliation",
                    "Policy Compliance Scan"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-white whitespace-nowrap">
                      <CheckCircle2 size={12} className="text-orange-500/70" strokeWidth={3} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: 15-Minute Diagnostic Card - Fixed Height/Alignment */}
              <div className="lg:col-span-5 mt-12 lg:mt-0 relative group/card">
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-500 min-h-[440px] flex flex-col justify-between">

                  {/* Card Glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  {/* Header */}
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[8px] font-mono text-orange-500/80 uppercase tracking-widest">Ops Review</span>
                      </div>
                      <h4 className="text-2xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>Audit Agenda</h4>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-inner">
                      <Settings2 size={22} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Steps with FIXED Timeline Alignment */}
                  <div className="space-y-0 relative z-10 before:absolute before:inset-y-3 before:left-[19.5px] before:w-[1px] before:bg-white/10 py-6">
                    {[
                      {
                        icon: <ShieldCheck size={16} />,
                        title: "1. Health Scan",
                        desc: "Reviewing Account Health Rating and potential risks."
                      },
                      {
                        icon: <Truck size={16} />,
                        title: "2. Logistics Flow",
                        desc: "Identifying bottlenecks in shipment and inventory."
                      },
                      {
                        icon: <BarChart3 size={16} />,
                        title: "3. Margin Recovery",
                        desc: "Spotting overcharged fees and reconciliation gaps.",
                        active: true
                      }
                    ].map((step, i) => (
                      <div key={i} className={`relative flex gap-6 ${i !== 2 ? 'pb-8' : ''} group/step`}>
                        <div className={`w-10 h-10 shrink-0 rounded-full border flex items-center justify-center z-10 transition-all duration-300 ${
                          step.active
                          ? 'bg-orange-500/20 border-orange-500 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                          : 'bg-zinc-900 border-white/10 text-zinc-400 group-hover/step:border-orange-500/50'
                        }`}>
                          {step.icon}
                        </div>

                        <div className="pt-1">
                          <h5 className={`text-[13px] font-bold mb-1.5 uppercase tracking-wide ${step.active ? 'text-orange-400' : 'text-white'}`}>
                            {step.title}
                          </h5>
                          <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Meeting Context Footer */}
                  <div className="bg-black/40 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative z-10 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full border border-white/10 bg-zinc-800 flex items-center justify-center text-zinc-400">
                         <Calendar size={16} />
                       </div>
                       <div>
                         <p className="text-[11px] font-bold text-white uppercase tracking-widest mb-0.5">Rapid Ops Review</p>
                         <p className="text-[10px] text-zinc-500 font-mono">15 Mins • 1-on-1 Access</p>
                       </div>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-orange-500/10 text-orange-500 text-[10px] font-bold tracking-widest uppercase border border-orange-500/20 whitespace-nowrap self-start sm:self-auto">
                      $0.00 Free
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes horizontal-scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}