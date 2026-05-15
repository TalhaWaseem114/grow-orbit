"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const HeroButton = ({ href = "/contact", children, className = "" }) => {
  return (
    <Link
      href={href}
      className={`group relative inline-flex justify-center px-6 sm:px-10 py-4 bg-zinc-950 text-white rounded-full font-bold text-[9px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] overflow-hidden transition-all active:scale-95 no-underline shadow-lg hover:shadow-xl shadow-zinc-950/10 ${className}`}


    >
      <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-4 w-full">
        <span className="text-center">{children}</span>
        <ArrowRight size={16} className="group-hover:translate-x-2 transition-all duration-300 text-orange-400 group-hover:text-white shrink-0" />
      </span>

      {/* Sliding Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-orange-400 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>

      {/* Glass Shine Pulse */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[horizontal-scan_2s_linear_infinite]"></div>
    </Link>
  );
};

export default HeroButton;
