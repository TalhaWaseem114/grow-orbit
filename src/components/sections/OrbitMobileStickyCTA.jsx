"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function OrbitMobileStickyCTA() {
  const router = useRouter();
  const pathname = usePathname();
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;

      setScrollPercent(percent);
      setShowStickyCTA(scrollTop > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (pathname === "/get-started") {
      const formEl = document.getElementById("lead-form");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    router.push("/get-started#lead-form");
  };

  return (
    <>
      <style>{`
        @keyframes bounce-arrow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
      `}</style>

      <div
        className={`lg:hidden fixed bottom-6 left-4 right-4 z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${showStickyCTA ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-20 opacity-0 pointer-events-none'}`}
      >
        <button
          onClick={handleClick}
          className="w-full relative flex items-center justify-center gap-3 px-6 py-4 text-white rounded-2xl font-black text-[11px] sm:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.25em] shadow-[0_15px_40px_rgba(249,115,22,0.4)] isolate overflow-hidden outline-none ring-2 ring-orange-500/20"
          style={{ background: '#27272a' }}
        >
          {/* Scroll-driven fill — grows left-to-right based on page scroll % */}
          <div
            className="absolute inset-0 rounded-2xl transition-[width] duration-150 ease-out pointer-events-none"
            style={{
              width: `${scrollPercent}%`,
              background: 'linear-gradient(to right, #ea580c, #f97316)',
            }}
          />

          {/* Shimmer on the filled portion */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
            style={{
              width: `${scrollPercent}%`,
              animation: scrollPercent > 10 ? 'shimmer-fill 3s infinite' : 'none',
            }}
          />

          <span className="relative z-10 flex items-center justify-center gap-3">
            Book My Free Meeting
            <ArrowRight size={16} className="animate-[bounce-arrow_1.5s_ease-in-out_infinite]" />
          </span>
        </button>
      </div>

      <style>{`
        @keyframes shimmer-fill {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </>
  );
}
