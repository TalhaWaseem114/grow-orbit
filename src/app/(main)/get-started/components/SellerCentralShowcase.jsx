"use client";

import Image from "next/image";

export default function SellerCentralShowcase() {
  return (
    <section
      className="py-16 sm:py-24 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/8 rounded-full blur-[180px]" />
      </div>

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2.5 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-orange-400 font-bold uppercase tracking-[0.2em] text-[10px]">
              Real Client Dashboards
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-white uppercase mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Numbers that{" "}
            <span
              className="italic font-light text-zinc-400 normal-case tracking-normal"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              speak volumes.
            </span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-light max-w-xl mx-auto leading-relaxed">
            Live Seller Central screenshots from brands we manage — growth you can see, not just hear about.
          </p>
        </div>

        {/* Screenshots row */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8">
          {/* Left screen — smaller */}
          <div className="w-[28%] sm:w-[26%] max-w-[220px] shrink-0">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:border-orange-500/30 transition-all duration-500 hover:-translate-y-1">
              <Image
                src="/images/saler centeral screens/1.jpg"
                alt="Amazon Seller Central — 61K units sold, 112% growth"
                width={390}
                height={844}
                className="w-full h-auto"
                quality={85}
                sizes="(max-width: 640px) 28vw, 220px"
              />
            </div>
          </div>

          {/* Center screen — bigger & elevated */}
          <div className="w-[36%] sm:w-[34%] max-w-[280px] shrink-0 -mt-4 sm:-mt-6">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-orange-500/30 shadow-[0_30px_80px_rgba(249,115,22,0.15),0_20px_60px_rgba(0,0,0,0.5)] hover:border-orange-500/50 transition-all duration-500 hover:-translate-y-2 relative">
              {/* Glow ring behind center card */}
              <div className="absolute -inset-px bg-gradient-to-b from-orange-500/20 via-transparent to-orange-500/10 rounded-3xl pointer-events-none" />
              <Image
                src="/images/saler centeral screens/2.jpg"
                alt="Amazon Seller Central — 88K units sold, 1.15M yearly, Outstanding performance"
                width={390}
                height={844}
                className="w-full h-auto relative z-10"
                quality={90}
                priority
                sizes="(max-width: 640px) 36vw, 280px"
              />
            </div>
          </div>

          {/* Right screen — smaller */}
          <div className="w-[28%] sm:w-[26%] max-w-[220px] shrink-0">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:border-orange-500/30 transition-all duration-500 hover:-translate-y-1">
              <Image
                src="/images/saler centeral screens/3.jpg"
                alt="Amazon Seller Central — 67K units sold, 812K yearly, Business thriving"
                width={390}
                height={844}
                className="w-full h-auto"
                quality={85}
                sizes="(max-width: 640px) 28vw, 220px"
              />
            </div>
          </div>
        </div>

        {/* Bottom stats callout */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-10 sm:mt-14">
          {[
            { stat: "1.15M+", label: "Units Sold (12mo)" },
            { stat: "135%", label: "Growth vs Last Year" },
            { stat: "99%", label: "Buy Box Rate" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-white tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {item.stat}
              </p>
              <p className="text-[9px] sm:text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
