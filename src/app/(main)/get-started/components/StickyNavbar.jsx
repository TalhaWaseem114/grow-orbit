"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";

export default function StickyNavbar({ scrolled, scrollToForm }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNav = (targetId) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCTAClick = () => {
    setMobileMenuOpen(false);
    scrollToForm();
  };

  const handleScrollToTop = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          1. DEDICATED MOBILE LANDING NAVBAR (100% Closed Funnel)
          ════════════════════════════════════════════════════════════ */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-zinc-950/90 backdrop-blur-xl border-b border-white/10 px-4 flex items-center justify-between">
        {/* Left: Logo (Scrolls to top) */}
        <button
          type="button"
          onClick={handleScrollToTop}
          className="flex items-center gap-2 group no-underline bg-transparent border-none cursor-pointer p-0"
        >
          <Image
            src="/logo.png"
            alt="Grow Orbit Logo"
            width={26}
            height={26}
            className="object-contain"
            priority
          />
          <span className="text-xs sm:text-sm font-black tracking-tight uppercase flex gap-1">
            <span className="text-white">GROW</span>
            <span className="text-[#F1A52B]">ORBIT</span>
          </span>
        </button>

        {/* Right: CTA Button + Hamburger Drawer Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCTAClick}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF5C00] via-[#FF7A00] to-[#FFA726] text-white font-black text-[10px] uppercase tracking-wider px-3.5 py-1.5 shadow-sm shadow-orange-500/20 active:scale-95 transition-transform border-none cursor-pointer"
          >
            Book Call
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation"
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white active:scale-95 transition-all cursor-pointer p-0"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer (100% On-Page Anchors — ZERO Exit Leaks) ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer Panel */}
          <div className="relative w-[82%] max-w-[320px] h-full bg-zinc-950 border-l border-white/10 shadow-2xl flex flex-col justify-between p-6 z-10 animate-in slide-in-from-right duration-300">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Image src="/logo.png" alt="Grow Orbit Logo" width={24} height={24} />
                  <span className="text-xs font-black uppercase text-white tracking-tight">
                    GROW <span className="text-[#F1A52B]">ORBIT</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close Navigation"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scarcity Pill */}
              <div className="mt-4 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                  Accepting 3-4 Brands &middot; 2 Spots Left
                </span>
              </div>

              {/* On-Page Navigation Links */}
              <nav className="mt-6 flex flex-col gap-1.5">
                {[
                  { id: "services", label: "Our Services", num: "01" },
                  { id: "testimonials", label: "Case Studies & Proof", num: "02" },
                  { id: "process", label: "How We Scale Brands", num: "03" },
                  { id: "portfolio", label: "Client Portfolio", num: "04" },
                  { id: "faq", label: "Frequently Asked Questions", num: "05" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNav(item.id)}
                    className="flex items-center justify-between px-3.5 py-3 rounded-xl hover:bg-white/5 text-left text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors border-none bg-transparent cursor-pointer w-full group"
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] font-mono text-zinc-600 group-hover:text-orange-400 transition-colors">
                      {item.num}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Drawer Bottom CTA */}
            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleCTAClick}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF5C00] via-[#FF7A00] to-[#FFA726] text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-orange-500/30 active:scale-95 transition-all border-none cursor-pointer"
              >
                <span>Claim Free Strategy Call</span>
                <ArrowRight size={14} />
              </button>
              <p className="text-center text-[10px] text-zinc-500 mt-2 font-medium">
                Fast 15-Min Call &middot; 100% Free Audit
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          2. DESKTOP STICKY NAVBAR (Slides down when scrolled > 100px)
          ════════════════════════════════════════════════════════════ */}
      <div className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform ${scrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-3 flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
            {/* Logo - Scroll to top */}
            <button
              type="button"
              onClick={handleScrollToTop}
              className="flex items-center gap-2 group no-underline bg-transparent border-none cursor-pointer p-0"
            >
              <Image
                src="/logo.png"
                alt="Grow Orbit Logo"
                width={28}
                height={28}
                className="object-contain group-hover:scale-110 transition-transform duration-300"
              />
              <span className="text-sm font-black tracking-tight uppercase flex gap-1 transition-colors">
                <span className="text-white">GROW</span>
                <span className="text-[#F1A52B]">ORBIT</span>
              </span>
            </button>

            {/* Nav - All on-page anchors */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                type="button"
                onClick={() => handleNav("services")}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors cursor-pointer outline-none bg-transparent border-none p-0"
              >
                Services
              </button>
              <button
                type="button"
                onClick={() => handleNav("testimonials")}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors cursor-pointer outline-none bg-transparent border-none p-0"
              >
                Case Studies
              </button>
              <button
                type="button"
                onClick={() => handleNav("process")}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors cursor-pointer outline-none bg-transparent border-none p-0"
              >
                Process
              </button>
              <button
                type="button"
                onClick={() => handleNav("portfolio")}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors cursor-pointer outline-none bg-transparent border-none p-0"
              >
                Portfolio
              </button>
              <button
                type="button"
                onClick={() => handleNav("faq")}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors cursor-pointer outline-none bg-transparent border-none p-0"
              >
                FAQ
              </button>
            </nav>

            {/* CTA */}
            <button
              type="button"
              onClick={handleCTAClick}
              className="px-6 py-2.5 bg-gradient-to-r from-[#FF5C00] via-[#FF7A00] to-[#FFA726] hover:brightness-110 text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-lg shadow-orange-500/20 active:scale-95 cursor-pointer border-none"
            >
              Book Strategy Call
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
