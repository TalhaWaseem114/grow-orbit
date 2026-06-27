"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Home, ArrowRight } from "lucide-react";
import Link from "next/link";


export default function ThankYouPage() {
  const [countdown, setCountdown] = useState(15);
  const router = useRouter();

  useEffect(() => {
    // 10 Second Countdown Timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup timer on unmount
    return () => clearInterval(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-[#0A0A0B] flex items-start md:items-center justify-center relative text-center pt-24 md:py-12" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* Background Ambient Orbits */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-40 overflow-hidden">
        <div className="w-[800px] h-[800px] rounded-full border border-orange-500/10 absolute animate-[spin_40s_linear_infinite]" />
        <div className="w-[600px] h-[600px] rounded-full border border-orange-500/20 absolute animate-[spin_25s_linear_infinite_reverse]" />
        <div className="w-[400px] h-[400px] rounded-full border border-orange-500/30 absolute animate-[spin_15s_linear_infinite]" />
        <div className="absolute w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[160px]" />
      </div>

      <div className="thank-you-content animate-fade-up relative z-10 max-w-2xl px-6 flex flex-col items-center">

        {/* Success Icon */}
        <div className="w-16 h-16 md:w-24 md:h-24 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
          <CheckCircle2 className="text-green-500 w-8 h-8 md:w-10 md:h-10" />
        </div>

        {/* Headlines */}
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Application <span className="italic font-light normal-case text-zinc-400" style={{ fontFamily: "'Playfair Display', serif" }}>Received</span>
        </h1>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-md mb-8 max-w-lg text-left w-full shadow-2xl">
          <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-2 border-b border-white/10 pb-2">What Happens Next?</h2>
          <ul className="space-y-4 mt-4">
            <li className="flex items-start gap-4">
              <div className="w-6 h-6 rounded bg-orange-500/10 text-orange-500 border border-orange-500/20 flex items-center justify-center font-black text-[11px] shrink-0">1</div>
              <p className="text-zinc-300 text-sm font-light leading-relaxed">
                A Senior Strategist is reviewing your brand&apos;s current positioning and the goals you outlined.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-6 h-6 rounded bg-orange-500/10 text-orange-500 border border-orange-500/20 flex items-center justify-center font-black text-[11px] shrink-0">2</div>
              <p className="text-zinc-300 text-sm font-light leading-relaxed">
                We will contact you via WhatsApp or Email <strong className="text-white font-bold">within 2 hours</strong> (during business hours) with a plan.
              </p>
            </li>
          </ul>
        </div>

        {/* Countdown Box */}
        <div className="flex flex-col items-center mb-8">
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mb-2 animate-pulse">Auto-returning to homepage in</p>
          <div className="text-4xl font-black text-white font-mono tracking-tighter transition-all opacity-80">
            00:{countdown.toString().padStart(2, '0')}
          </div>
        </div>

        {/* Manual Home Button */}
        <Link href="/" className="group inline-flex items-center justify-center gap-3 bg-orange-600 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-orange-500 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-orange-500/50 no-underline w-full max-w-xs">
          <Home size={16} /> Skip & Go Back <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </main>
  );
}
