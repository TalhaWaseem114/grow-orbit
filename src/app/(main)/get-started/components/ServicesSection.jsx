import Link from "next/link";
import { ArrowUpRight, Search, Shield, Zap, Camera, BarChart3, Activity } from "lucide-react";

export default function ServicesSection() {
  const services = [
    { icon: <Search size={18} />,     title: "Product Hunting",        line: "Find products with 30%+ margin potential." },
    { icon: <Shield size={18} />,     title: "Sourcing & Setup",       line: "Secure factory-direct pricing & terms."   },
    { icon: <Zap size={18} />,        title: "Brand Launch",           line: "Hit page 1 for core keywords by day 30." },
    { icon: <Camera size={18} />,     title: "Creative & A+",          line: "Increase listing conversion by 25–40%."  },
    { icon: <BarChart3 size={18} />,  title: "PPC & Ranking",          line: "Reduce wasted ad spend by up to 40%."       },
    { icon: <Activity size={18} />,   title: "Full Account Mgmt",      line: "Scale past $100K/mo on auto-pilot."      },
  ];

  return (
    <section className="py-20 bg-white border-t border-zinc-100 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="relative">
          {/* Large Background Watermark */}
          <div
            className="absolute
              top-[30px] right-0 rotate-90 origin-center translate-x-[40%]
              sm:top-[20px] sm:left-0 sm:right-auto sm:rotate-0 sm:origin-center sm:-translate-y-[70%] sm:translate-x-0
              font-black text-[45px] sm:text-[80px] md:text-[140px] uppercase tracking-tighter opacity-[0.05] pointer-events-none select-none whitespace-nowrap"
            style={{
              fontFamily: "'Oswald', sans-serif",
              WebkitTextStroke: "1.5px #000",
              color: "transparent"
            }}
          >
            SERVICES
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-orange-500/80 mb-3">What We Do</p>
            <h2
              className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[1.1] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Every lever that <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>moves revenue.</span>
            </h2>
            <p className="text-zinc-500 text-sm font-light leading-relaxed mt-4 max-w-lg">
              Amazon growth doesn’t come from ads alone—it comes from fixing every layer that drives conversion.
            </p>
          </div>
          <Link href="/service" className="group shrink-0 flex items-center gap-2 text-orange-500 font-bold text-[10px] uppercase tracking-widest hover:gap-4 transition-all no-underline pb-1">
            All 18 Services <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {services.map((s, i) => (
            <div key={i} className="group bg-[#fafafa] hover:bg-orange-500 rounded-[24px] p-5 border border-zinc-100 hover:border-orange-500 transition-all duration-500 cursor-default">
              <div className="text-orange-500 group-hover:text-white transition-colors mb-4">{s.icon}</div>
              <p className="font-black text-[13px] uppercase tracking-tight text-zinc-900 group-hover:text-white transition-colors mb-1.5 leading-tight">{s.title}</p>
              <p className="text-zinc-400 group-hover:text-orange-100 text-[11px] font-light leading-snug transition-colors">{s.line}</p>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
