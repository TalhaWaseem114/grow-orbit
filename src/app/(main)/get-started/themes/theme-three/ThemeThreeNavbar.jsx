"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function ThemeThreeNavbar({ scrollToForm }) {
  const navLinks = [
    { name: "Services", hasDropdown: true },
    { name: "Our Methodology", hasDropdown: true },
    { name: "Results", hasDropdown: true },
    { name: "About Us", hasDropdown: true },
    { name: "Resources", hasDropdown: false },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <img src="/logo.png" alt="Grow Orbit" className="w-8 h-8 object-contain" />
          <span className="text-[13px] font-black text-white uppercase tracking-[0.08em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Grow <span className="text-orange-500">Orbit</span>
          </span>
        </Link>

        {/* Center Links */}
        <div className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => (
            <button
              key={link.name}
              className="flex items-center gap-1 text-[11px] font-semibold text-zinc-300 hover:text-white transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {link.name}
              {link.hasDropdown && <ChevronDown size={11} className="text-zinc-500" />}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={scrollToForm}
          className="px-6 py-3 bg-orange-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2.5 hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-orange-500/20"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Book a Strategy Call <ArrowRight size={13} />
        </button>
      </div>
    </nav>
  );
}
