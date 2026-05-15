import React, { useEffect, useRef } from "react";
import { TrendingUp, Users, ShoppingCart, BarChart3, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500"></div>
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-600/80">
      {children}
    </span>
  </div>
);

/* Mini sparkline SVG — upward trend */
const Sparkline = () => (
  <svg width="48" height="20" viewBox="0 0 48 20" fill="none" className="inline-block ml-2 align-middle">
    <polyline
      points="0,18 8,14 16,16 24,10 32,8 40,4 48,1"
      stroke="#f97316"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="48" cy="1" r="2.5" fill="#f97316" />
  </svg>
);

export default function ExpectedOutcomes() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation for metric numbers
      const counters = sectionRef.current.querySelectorAll(".metric-counter");
      counters.forEach((el) => {
        const target = el.getAttribute("data-target");
        const isPercent = target.includes("%");
        const isX = target.includes("x");
        const isSlash = target.includes("/");
        const prefix = target.startsWith("+") ? "+" : "";
        const suffix = isPercent ? "%" : isX ? "x" : isSlash ? "" : "";

        // Extract numeric value
        let numStr = target.replace(/[+%x<>s]/g, "").replace("/7", "");
        const numVal = parseFloat(numStr);

        if (isNaN(numVal) || isSlash) {
          // Non-numeric like "24/7" or "0%" — just reveal
          gsap.from(el, {
            opacity: 0,
            y: 10,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            }
          });
          return;
        }

        const obj = { val: 0 };
        gsap.to(obj, {
          val: numVal,
          duration: 2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          onUpdate: () => {
            const isInt = Number.isInteger(numVal);
            el.textContent = prefix + (isInt ? Math.round(obj.val) : obj.val.toFixed(1)) + suffix;
          }
        });
      });

      // Card entrance
      gsap.fromTo(".outcome-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".outcome-card",
            start: "top 90%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const outcomes = [
    {
      icon: <TrendingUp size={16} />,
      metric: "+35%",
      label: "Amazon tax recaptured",
      title: "Margin Expansion",
      desc: "Eliminate the Amazon Tax — referral fees, FBA premiums, and ad inflation erode 30-40% of revenue. A DTC channel redirects that margin back into growth.",
      sparkline: true
    },
    {
      icon: <Users size={16} />,
      metric: "3x",
      label: "Customer lifetime value",
      title: "Customer Ownership",
      desc: "First-party data collection enables retargeting, lifecycle email, and cohort analysis — turning one-time marketplace buyers into repeat customers."
    },
    {
      icon: <ShoppingCart size={16} />,
      metric: "4.8%",
      label: "Target conversion rate",
      title: "Conversion Rate Lift",
      desc: "Conversion-optimized storefront architecture with A/B tested checkout flows, trust signals, and urgency mechanics."
    },
    {
      icon: <Zap size={16} />,
      metric: "24/7",
      label: "Automated lifecycle flows",
      title: "Revenue on Autopilot",
      desc: "Email and SMS automation generates revenue while you sleep — welcome series, abandoned cart, post-purchase, and win-back flows running continuously.",
      wide: true
    },
    {
      icon: <BarChart3 size={16} />,
      metric: "0%",
      label: "Data loss across channels",
      title: "Full Attribution Clarity",
      desc: "Server-side tracking and conversion API integration delivers a unified source of truth for every marketing dollar — zero data gaps, zero guessing.",
      wide: true
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 sm:py-32 bg-[#fafafa] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mb-12 sm:mb-24 text-left">
          <SectionLabel>Expected Outcomes</SectionLabel>
          <h2 className="text-[42px] sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] sm:leading-[0.88] mb-6 sm:mb-8 text-zinc-900">
            What Changes<br />
            <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light lowercase tracking-normal text-zinc-300">after launch.</span>
          </h2>
          <p className="text-zinc-500 text-base sm:text-lg font-light leading-relaxed">
            The primary outcome of a DTC storefront is channel independence — your brand owns
            its customer relationships, data, and margins. These are realistic operational
            improvements, not projected revenue claims.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
          {outcomes.map((o, i) => (
            <div
              key={i}
              className={`outcome-card group relative bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 border ${o.wide ? 'border-orange-500/20 shadow-xl shadow-zinc-200/50' : 'border-zinc-100'} hover:border-orange-500/20 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-500 overflow-hidden flex flex-col ${o.wide ? "lg:col-span-3" : "lg:col-span-2"} text-left`}
            >
              <div
                className={`absolute inset-0 rounded-[24px] sm:rounded-[32px] ${o.wide ? 'opacity-[0.06]' : 'opacity-[0.03]'} group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none`}
                style={{
                  backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)",
                  backgroundSize: "8px 8px",
                }}
              />

              <div className="flex items-start justify-between mb-6 sm:mb-8 relative z-10">
                <div className="text-orange-500">
                  {o.icon}
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end">
                    <p className="metric-counter text-3xl sm:text-4xl font-black text-zinc-900 tracking-tighter leading-none" data-target={o.metric}>
                      {o.metric}
                    </p>
                    {o.sparkline && <Sparkline />}
                  </div>
                  <p className="font-mono text-[8px] font-bold tracking-[0.2em] text-zinc-400 uppercase mt-2">{o.label}</p>
                </div>
              </div>

              <div className={`relative z-10 mt-auto pt-6 sm:pt-8 border-t ${o.wide ? 'border-orange-500/10' : 'border-zinc-100'} group-hover:border-orange-500/10 transition-colors`}>
                <h3 className={`font-black text-base sm:text-lg tracking-tight uppercase ${o.wide ? 'text-orange-500' : 'text-zinc-900'} group-hover:text-orange-500 transition-colors mb-2`}>{o.title}</h3>
                <p className="text-zinc-500 text-xs sm:text-sm font-light leading-relaxed">{o.desc}</p>
              </div>

              <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-500/0 ${o.wide ? 'via-orange-500/20' : 'via-orange-500/0'} to-orange-500/0 group-hover:via-orange-500/20 transition-all duration-700`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
