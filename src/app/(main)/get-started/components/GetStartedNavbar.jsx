"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import HeroMegaMenu from "./HeroMegaMenu";

export default function GetStartedNavbar({ scrolled }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const servicesRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-zinc-950/90 backdrop-blur-md border-b border-white/5 py-4 shadow-lg shadow-black/20"
          : "bg-transparent py-6 border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between relative">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2.5 group no-underline shrink-0">
          <Image
            src="/logo.png"
            alt="Grow Orbit Logo"
            width={32}
            height={32}
            className="object-contain group-hover:scale-110 transition-transform duration-300"
          />
          <span className="text-base sm:text-lg font-black tracking-tight uppercase flex gap-1.5 transition-colors">
            <span className="text-white">GROW</span>
            <span className="text-[#F1A52B]">ORBIT</span>
          </span>
        </Link>

        {/* Middle: Menu Items (Desktop Only) */}
        <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          <Link
            href="/"
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors no-underline"
          >
            Home
          </Link>
          <Link
            href="/case-study"
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors no-underline"
          >
            Case Study
          </Link>
          <div className="relative" ref={servicesRef}>
            <button
              onMouseEnter={() => setServicesOpen(true)}
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors outline-none bg-transparent border-none cursor-pointer"
            >
              Services
              <ChevronDown
                size={12}
                className={`transition-transform duration-300 ${
                  servicesOpen ? "rotate-180 text-orange-500" : ""
                }`}
              />
            </button>
            {servicesOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-[100]"
                onMouseLeave={() => setServicesOpen(false)}
              >
                <HeroMegaMenu onClose={() => setServicesOpen(false)} />
              </div>
            )}
          </div>
        </nav>

        {/* Right: Portfolio Button (Desktop Only) */}
        <div className="hidden lg:flex items-center shrink-0">
          <Link
            href="/portfolio"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-zinc-800 bg-zinc-900/60 backdrop-blur-md px-6 py-2.5 text-white font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:border-orange-500 hover:text-orange-500 hover:scale-[1.03] active:scale-95 no-underline"
          >
            Portfolio
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white transition-colors focus:outline-none bg-transparent border-none cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-900 py-6 px-6 shadow-2xl flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-5">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors no-underline py-2 border-b border-zinc-900/50"
            >
              Home
            </Link>
            <Link
              href="/case-study"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors no-underline py-2 border-b border-zinc-900/50"
            >
              Case Study
            </Link>
            <Link
              href="/service"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors no-underline py-2 border-b border-zinc-900/50"
            >
              Services
            </Link>
          </nav>

          <Link
            href="/portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-black text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-orange-500/25 no-underline"
          >
            Portfolio
          </Link>
        </div>
      )}
    </header>
  );
}
