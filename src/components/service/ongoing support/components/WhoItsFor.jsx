import React from "react";
import Link from "next/link";
import { TrendingUp, Activity, Package, Star, CheckCircle2, Minus } from "lucide-react";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500" />
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
      {children}
    </span>
  </div>
);

export default function WhoItsFor() {
  const profiles = [
    {
      icon: <TrendingUp size={22} />,
      tag: "Established Sellers",
      headline: "You're growing. Now you need to stay ahead.",
      desc: "Revenue is consistent but plateaus are appearing. Without constant iteration and competitive intelligence, the next quarter can easily reverse the last one. You need a growth engine that never pauses.",
      signals: ["$500K–$5M annual revenue", "Consistent organic traffic", "No dedicated optimization team"],
      accent: "from-orange-500 to-amber-400",
    },
    {
      icon: <Activity size={22} />,
      tag: "Category Competitors",
      headline: "Top rankings demand constant defense.",
      desc: "Holding a category position is a full-time operation. Competitors constantly test your weak points. Algorithm shifts can undo months of SEO gains overnight. We keep you ahead so you never have to play catch-up.",
      signals: ["Top 5 BSR in category", "High branded search volume", "Active PPC investment"],
      accent: "from-rose-500 to-orange-500",
      featured: true,
    },
    {
      icon: <Package size={22} />,
      tag: "Multi-SKU Operators",
      headline: "Scale demands systematic optimization.",
      desc: "Managing 20+ ASINs means dozens of listings that need weekly attention — copy tests, ranking reviews, pricing adjustments. Our systems do it automatically, at scale, without missing a single SKU.",
      signals: ["20+ ASIN catalog", "Multi-category presence", "FBA + FBM complexity"],
      accent: "from-violet-500 to-orange-400",
    },
  ];

  return (
    <section className="py-32 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <SectionLabel>Ideal_Client_Profile</SectionLabel>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-6 text-zinc-900">
              Who this<br />
              <span className="text-zinc-300 italic font-serif lowercase tracking-normal">serves.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-sm pb-2">
            Ongoing Support isn't for every seller. It's built for brands at the stage where standing still is the most expensive strategy possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {profiles.map((p, i) => (
            <div
              key={i}
              className={`group relative rounded-[40px] overflow-hidden transition-all duration-500 hover:shadow-2xl ${
                p.featured ? "hover:shadow-orange-500/15 ring-1 ring-orange-500/20" : "hover:shadow-zinc-200/80"
              }`}
            >
              <div className={`h-1 w-full bg-gradient-to-r ${p.accent}`} />
              <div className={`h-full border border-t-0 rounded-b-[40px] p-8 lg:p-10 transition-all duration-500 ${
                p.featured ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-100 group-hover:border-orange-500/15"
              }`}>
                {p.featured && (
                  <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 px-3 py-1.5 rounded-full mb-6">
                    <Star size={9} className="text-orange-400 fill-orange-400" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-400">Most Common Fit</span>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    p.featured
                      ? "bg-orange-500/15 border border-orange-500/30 text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500"
                      : "bg-zinc-50 border border-zinc-200 text-orange-500 group-hover:border-orange-500/30 group-hover:shadow-lg group-hover:shadow-orange-500/10"
                  }`}>{p.icon}</div>
                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${p.featured ? "text-orange-400" : "text-orange-500"}`}>{p.tag}</span>
                </div>
                <h3 className={`text-xl font-black uppercase tracking-tight leading-tight mb-4 ${
                  p.featured ? "text-white" : "text-zinc-900 group-hover:text-orange-500 transition-colors"
                }`}>{p.headline}</h3>
                <p className={`text-sm font-light leading-relaxed mb-8 ${p.featured ? "text-zinc-400" : "text-zinc-500"}`}>{p.desc}</p>
                <div className="space-y-2">
                  <p className={`text-[9px] font-black uppercase tracking-[0.3em] mb-3 ${p.featured ? "text-zinc-600" : "text-zinc-400"}`}>You're likely this if —</p>
                  {p.signals.map((s, j) => (
                    <div key={j} className={`flex items-center gap-3 py-2 border-t ${p.featured ? "border-white/5" : "border-zinc-50"}`}>
                      <div className="w-1 h-1 rounded-full bg-orange-500 shrink-0" />
                      <span className={`text-xs font-light ${p.featured ? "text-zinc-500" : "text-zinc-400"}`}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] text-zinc-400 font-light mt-10">
          Not sure if Ongoing Support fits where you are?{" "}
          <Link href="/service/orbit-diagnostic" className="text-orange-500 font-bold hover:underline">Run an Orbit Diagnostic first →</Link>
        </p>

        {/* Not ideal for — conversion filter */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-[28px] border border-zinc-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center shrink-0">
                <CheckCircle2 size={14} className="text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-900">This Service Is Ideal For</span>
            </div>
            <div className="space-y-3">
              {[
                "Amazon sellers doing $20K+ monthly revenue",
                "Brands wanting consistent week-on-week growth",
                "Sellers with established listings needing optimization",
                "Multi-ASIN catalogs requiring systematic management",
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                  <span className="text-sm font-light text-zinc-600">{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#fafafa] rounded-[28px] border border-zinc-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-xl bg-zinc-200 flex items-center justify-center shrink-0">
                <Minus size={14} className="text-zinc-500" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Not the Right Fit If</span>
            </div>
            <div className="space-y-3">
              {[
                "New listings with no traction or reviews yet",
                "Sellers without stable inventory supply chains",
                "Brands looking for a one-time project or audit only",
                "Sellers not yet ready for systematic iteration",
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 mt-1.5 shrink-0" />
                  <span className="text-sm font-light text-zinc-400">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
