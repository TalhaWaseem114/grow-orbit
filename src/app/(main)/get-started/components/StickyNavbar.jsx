"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, ExternalLink, MessageCircle, X } from "lucide-react";
import "@/components/navbar/Navbar.css";

const NAV_ITEMS = [
  { label: "Home", targetId: "top" },
  { label: "Services", targetId: "services" },
  { label: "Case Studies", targetId: "testimonials" },
  { label: "Process", targetId: "process" },
  { label: "Portfolio", targetId: "portfolio" },
  { label: "FAQ", targetId: "faq" },
  { label: "Contact", targetId: "lead-form" },
];

export default function StickyNavbar({ scrolled, scrollToForm }) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("top");
  const headerRef = useRef(null);

  // Sync sticky state based on window scroll position (matching global navbar threshold of 20px)
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Track active section for underline highlighting
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    });

    NAV_ITEMS.forEach((item) => {
      if (item.targetId !== "top") {
        const el = document.getElementById(item.targetId);
        if (el) observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleNav = (targetId) => {
    setMobileMenuOpen(false);
    if (!targetId || targetId === "top") {
      setActiveId("top");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(targetId);
    if (el) {
      setActiveId(targetId);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCTAClick = () => {
    setMobileMenuOpen(false);
    if (scrollToForm) {
      scrollToForm();
    } else {
      const formEl = document.getElementById("lead-form");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleScrollToTop = () => {
    setMobileMenuOpen(false);
    setActiveId("top");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Dynamic styling matching the global navbar
  const isDarkTextNeeded = isSticky;
  const textColorClass = isDarkTextNeeded ? "text-gray-800" : "text-white";
  const hoverColorClass = isDarkTextNeeded ? "hover:text-orange-500" : "hover:text-white";
  const growColor = isDarkTextNeeded ? "text-[#2B3036]" : "text-white";
  const orbitColor = isDarkTextNeeded ? "text-orange-600" : "text-[#F1A52B]";

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          FLOATING PILL NAVBAR CONTAINER (Identical to Global Navbar)
          ════════════════════════════════════════════════════════════ */}
      <header
        ref={headerRef}
        className={`fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-300 ease-out border ${
          isSticky
            ? "top-1.5 sm:top-2.5 lg:top-3 w-[calc(100%-16px)] sm:w-[calc(100%-32px)] lg:w-[calc(100%-48px)] xl:w-[calc(100%-64px)] 2xl:w-[calc(100%-80px)] max-w-[1720px] rounded-full bg-white border-zinc-200 shadow-[0_10px_35px_rgba(0,0,0,0.08)] py-2"
            : "top-0 w-full max-w-[1720px] rounded-full bg-transparent border-transparent py-3 sm:py-5 lg:py-4 shadow-none"
        }`}
      >
        {/* ════════════════════════════════════════
            MOBILE NAVBAR (lg:hidden)
            Left: Bar icon (opens left drawer)
            Middle: Grow Orbit brand name & logo
            Right: Get Started button linked to form
        ════════════════════════════════════════ */}
        <div
          className={`lg:hidden w-full flex items-center justify-between transition-all duration-300 ${
            isSticky ? "px-3 sm:px-4" : "px-3.5 sm:px-6"
          }`}
        >
          {/* Left: Bar Icon (Hamburger) */}
          <div className="flex items-center justify-start shrink-0 min-w-[68px]">
            <button
              className={`p-1.5 -ml-1.5 rounded-xl transition-all duration-300 ${textColorClass} hover:text-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none flex flex-col justify-center items-start gap-[4.5px] w-9 h-9 cursor-pointer bg-transparent border-none`}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="block h-[2px] w-5.5 bg-current rounded-full transition-all duration-300" />
              <span className="block h-[2px] w-3.5 bg-current rounded-full transition-all duration-300" />
              <span className="block h-[2px] w-4.5 bg-current rounded-full transition-all duration-300" />
            </button>
          </div>

          {/* Middle: Logo & GROW ORBIT */}
          <div className="flex items-center justify-center flex-1 text-center">
            <button
              type="button"
              onClick={handleScrollToTop}
              className="inline-flex items-center gap-1.5 no-underline bg-transparent border-none cursor-pointer p-0"
            >
              <div className="relative flex items-center justify-center w-7 h-7 shrink-0">
                <Image
                  src="/logo.png"
                  alt="Grow Orbit Logo"
                  width={28}
                  height={28}
                  className="object-contain w-auto h-auto"
                />
              </div>
              <span className="text-[15px] sm:text-base font-black tracking-tight uppercase flex gap-1">
                <span className={`transition-colors duration-300 ${growColor}`}>GROW</span>
                <span className={`transition-colors duration-300 ${orbitColor}`}>ORBIT</span>
              </span>
            </button>
          </div>

          {/* Right: Get Started Button (Links to form) */}
          <div className="flex items-center justify-end shrink-0 min-w-[68px]">
            <button
              type="button"
              onClick={handleCTAClick}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-wider px-2.5 sm:px-3 py-1.5 shadow-sm shadow-orange-500/20 active:scale-95 transition-all no-underline shrink-0 border-none cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════════
            DESKTOP NAVBAR (hidden lg:flex)
            Left: Logo
            Middle: In-Page Navigation Links
            Right: CTA Button
        ════════════════════════════════════════ */}
        <div className="hidden lg:flex w-full px-[10px] items-center justify-between gap-4 xl:gap-6">
          {/* Logo */}
          <div className="shrink-0 flex items-center ml-[10px]">
            <button
              type="button"
              onClick={handleScrollToTop}
              className="flex items-center gap-2.5 xl:gap-3 no-underline shrink-0 bg-transparent border-none cursor-pointer p-0 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-2 focus-visible:outline-none rounded-xl"
            >
              <div className="relative flex items-center justify-center w-9 h-9 xl:w-10 xl:h-10">
                <Image
                  src="/logo.png"
                  alt="Grow Orbit Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-lg xl:text-xl font-black tracking-tight uppercase flex gap-1.5 whitespace-nowrap">
                <span className={`transition-colors duration-300 ${growColor}`}>GROW</span>
                <span className={`transition-colors duration-300 ${orbitColor}`}>ORBIT</span>
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links (In-Page Anchors) */}
          <nav
            className="hidden lg:flex items-center gap-2 lg:gap-2.5 xl:gap-3.5 2xl:gap-4 justify-center flex-1 min-w-0"
            aria-label="Desktop Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.targetId;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNav(item.targetId)}
                  className={`nav-link whitespace-nowrap shrink-0 text-[11px] xl:text-[11.5px] 2xl:text-[12px] font-bold uppercase tracking-wider transition-colors cursor-pointer bg-transparent border-none outline-none p-0 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-2 focus-visible:outline-none rounded-sm
                    ${isActive ? "text-orange-500 nav-link-active" : textColorClass}
                    ${!isActive && hoverColorClass}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Get Started Button */}
          <div className="hidden lg:flex shrink-0 items-center justify-end gap-3 xl:gap-4 2xl:gap-5">
            <button
              type="button"
              onClick={handleCTAClick}
              className={`whitespace-nowrap shrink-0 relative overflow-hidden px-5 xl:px-6 py-2.5 rounded-full text-[11px] xl:text-[11.5px] font-bold uppercase tracking-wider transition-all cursor-pointer border-none active:scale-95 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:outline-none
                ${
                  isDarkTextNeeded
                    ? "bg-black text-white hover:bg-orange-600 shadow-md hover:shadow-orange-500/25"
                    : "bg-white text-black hover:bg-orange-500 hover:text-white shadow-md hover:shadow-orange-500/25"
                }`}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════
          MOBILE DRAWER — Slides in from LEFT (Identical to Global Navbar)
      ════════════════════════════════════════ */}
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Left Drawer Panel */}
      <aside
        className={`fixed inset-y-0 left-0 w-[310px] sm:w-[350px] max-w-[85vw] bg-white z-[1000] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0 pointer-events-auto" : "-translate-x-full pointer-events-none"
        }`}
        aria-label="Mobile Navigation Drawer"
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleScrollToTop}
            className="flex items-center gap-2.5 no-underline bg-transparent border-none cursor-pointer p-0"
          >
            <div className="relative flex items-center justify-center w-8 h-8 shrink-0">
              <Image
                src="/logo.png"
                alt="Grow Orbit Logo"
                width={32}
                height={32}
                className="object-contain w-auto h-auto"
              />
            </div>
            <span className="text-base font-black tracking-tight uppercase flex gap-1">
              <span className="text-zinc-900">GROW</span>
              <span className="text-orange-600">ORBIT</span>
            </span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Navigation Menu"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors border-none bg-transparent cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.targetId;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNav(item.targetId)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-[12px] font-bold uppercase tracking-widest no-underline transition-colors border-none cursor-pointer
                  ${isActive ? "text-orange-500 bg-orange-50" : "text-zinc-700 hover:bg-zinc-50 hover:text-orange-500 bg-transparent"}`}
              >
                {item.label}
              </button>
            );
          })}

          {/* Connect & Explore: WhatsApp & Main Website */}
          <div className="pt-3.5 mt-3 border-t border-zinc-100 space-y-2">
            <a
              href="https://wa.me/19128205916?text=Hi%20Grow%20Orbit%2C%20I%20would%20like%20to%20learn%20more%20about%20scaling%20my%20Amazon%20brand."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/90 hover:bg-emerald-100/70 hover:border-emerald-300 transition-all group no-underline"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#25D366]/20">
                  <MessageCircle size={15} className="fill-white text-[#25D366]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900 leading-tight group-hover:text-emerald-700 transition-colors">
                    Chat on WhatsApp
                  </p>
                  <p className="text-[10px] text-zinc-500 font-medium">
                    +1 (912) 820-5916 &middot; Instant Access
                  </p>
                </div>
              </div>
              <ArrowRight size={13} className="text-emerald-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </a>

            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/80 transition-all group no-underline"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0">
                  <Globe size={15} />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900 leading-tight group-hover:text-orange-600 transition-colors">
                    Visit Main Website
                  </p>
                  <p className="text-[10px] text-zinc-500 font-medium">groworbitofficial.com</p>
                </div>
              </div>
              <ExternalLink size={13} className="text-zinc-400 group-hover:text-orange-500 transition-colors shrink-0" />
            </Link>
          </div>
        </div>

        {/* Drawer Bottom CTA */}
        <div className="p-4 border-t border-zinc-100 bg-zinc-50/60 pb-6 sm:pb-4">
          <button
            type="button"
            onClick={handleCTAClick}
            className="group flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl text-[11px] font-black uppercase tracking-widest bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 no-underline shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all border-none cursor-pointer"
          >
            <span>Get Started Now</span>
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </aside>
    </>
  );
}
