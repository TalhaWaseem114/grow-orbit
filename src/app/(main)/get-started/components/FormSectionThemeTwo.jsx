"use client";

import { forwardRef } from "react";
import { CheckCircle2, Shield, Clock, Users } from "lucide-react";
import LeadForm from "./LeadForm";

const FormSectionThemeTwo = forwardRef(function FormSectionThemeTwo(_, ref) {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  return (
    <section
      ref={ref}
      id="lead-form-theme-two"
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fafafa 0%, #f5f0eb 50%, #fafafa 100%)" }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-orange-600 font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.3em]">
              Only 2 spots remaining for {currentMonth}
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 mb-4 uppercase"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Ready to <span className="text-orange-500">Scale?</span>
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base font-light max-w-lg mx-auto leading-relaxed">
            Tell us where you are — we'll show you a clear path to grow. No pitch, just strategy.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left — Trust & value props */}
          <div className="flex-1 lg:pt-6">
            <h3
              className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 mb-8 uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Book Your Free<br />
              <span className="text-orange-500">15-Min</span> Strategy Call
            </h3>

            {/* Value propositions */}
            <div className="space-y-5 mb-10">
              {[
                {
                  icon: Shield,
                  title: "No Commitment Required",
                  desc: "Get a free roadmap with zero obligation. If we're a fit, great. If not, you still walk away with value.",
                },
                {
                  icon: Clock,
                  title: "Quick 15-Min Discovery",
                  desc: "We respect your time. In 15 minutes, we'll understand your goals and show you the path forward.",
                },
                {
                  icon: Users,
                  title: "80+ Brands Scaled",
                  desc: "From $0 to $200K/mo — we've built the systems that turn Amazon brands into revenue machines.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/15 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                    <item.icon size={18} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900 mb-1">{item.title}</p>
                    <p className="text-xs text-zinc-500 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {[
                "Amazon Ads Partner",
                "Amazon SPN",
                "Helium 10 Certified",
                "4.9★ on Clutch",
              ].map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 bg-white border border-zinc-200 rounded-full px-3 py-1.5"
                >
                  <CheckCircle2 size={10} className="text-orange-500" />
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form card */}
          <div className="w-full lg:w-[540px] flex-shrink-0">
            <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-[0_20px_60px_rgba(0,0,0,0.06)] px-5 py-8 sm:p-10">
              <div className="mb-6">
                <p className="text-orange-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                  Free Strategy Meeting
                </p>
                <h3
                  className="text-xl font-black tracking-tight text-zinc-900 uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Tell us your ASIN. <span className="text-orange-500">We'll tell you exactly what's holding it back.</span>
                </h3>
              </div>

              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default FormSectionThemeTwo;
