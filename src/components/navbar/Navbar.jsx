"use client";


import { ChevronDown, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import MegaMenu from "./MegaMenu";
import "./Navbar.css";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileServiceExpanded, setMobileServiceExpanded] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const headerRef = useRef(null);
  const userDropdownRef = useRef(null);

  const lightPages = [
    "service",
    "contact",
    "case-study",
    "blog",
    "portfolio",
    "amazon-tools",
    "glossary",
    "faq",
    "privacy-policy",
    "terms-of-service"
  ];
  const darkThemedPages = [
    "/service", // Added the main services index because it has a dark header
    "/service/full/amazon-management",
    "/service/amazon-services",
    "/service/design-creative",
    "/case-study/li-01",
    "/case-study/li-02",
    "/case-study/li-03",
    "/portfolio"
  ];

  const isAboutPage = pathname.includes("about");
  const isLightPage = lightPages.some((path) => pathname.includes(path));
  // Removed the blanket startsWith("/service") check which was forcing white text on light service pages
  const isForcedDarkPage = darkThemedPages.some((path) => {
    // Exact match for the index or partial match for specific subpages
    if (path === "/service" || path === "/portfolio") return pathname === path || pathname === `${path}/`;
    return pathname.includes(path);
  });
  const isDarkTextNeeded = (isSticky && !isAboutPage) || (isLightPage && !isForcedDarkPage);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    let unsub;
    let timeoutId;
    const initAuth = async () => {
      try {
        const { auth, db } = await import("../../firebase/firebaseConfig");
        const { onAuthStateChanged } = await import("firebase/auth");
        const { doc, getDoc } = await import("firebase/firestore");

        unsub = onAuthStateChanged(auth, async (currentUser) => {
          setUser(currentUser);
          if (currentUser) {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            if (userDoc.exists()) setRole(userDoc.data().role?.trim() || "user");
          } else {
            setRole("user");
          }
        });
      } catch (error) {
        console.error("Failed to load Firebase Auth", error);
      }
    };
    timeoutId = setTimeout(initAuth, 2500);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (unsub) unsub();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMegaMenuOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const { auth } = await import("../../firebase/firebaseConfig");
      const { signOut } = await import("firebase/auth");
      await signOut(auth);
      router.push("/");
    } catch (e) {
      console.error("Logout error", e);
    }
  };

  const getUserInitial = () => {
    if (user?.displayName) return user.displayName[0].toUpperCase();
    if (user?.email) return user.email[0].toUpperCase();
    return "U";
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServiceExpanded(false);
  };

  const handleGetStartedClick = (e) => {
    closeMobileMenu();
    if (pathname === "/get-started" || pathname === "/get-started/") {
      e.preventDefault();
      const formEl = document.getElementById("lead-form");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

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

  const textColorClass = isDarkTextNeeded ? "text-gray-800" : "text-white";
  const hoverColorClass = isDarkTextNeeded ? "hover:text-orange-500" : "hover:text-white";
  const logoTextClass = isDarkTextNeeded ? "text-black" : "text-white";

  const navItems = ["Home", "Service", "About", "Portfolio", "Case Studies", "Tools", "Blog", "FAQ", "Contact"];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed z-50 transition-all duration-300 ${
          pathname.includes("get-started") ? "lg:hidden" : ""
        } ${
          isSticky
            ? `top-2.5 sm:top-3.5 inset-x-3 sm:inset-x-6 max-w-7xl mx-auto rounded-full ${
                isAboutPage ? "bg-zinc-950/95 border-white/10" : "bg-white/95 border-zinc-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.08)]"
              } backdrop-blur-md border py-2 sm:py-2.5`
            : "top-0 left-0 right-0 w-full bg-transparent border border-transparent py-3 sm:py-5"
        }`}
      >
        {/* ════════════════════════════════════════
            MOBILE NAVBAR (lg:hidden)
            Left: Bar icon (opens left drawer)
            Middle: Grow Orbit brand name & logo
            Right: Get Started button linked to form
        ════════════════════════════════════════ */}
        <div className={`lg:hidden w-full flex items-center justify-between transition-all duration-300 ${
          isSticky ? "px-3 sm:px-4" : "px-3.5 sm:px-6"
        }`}>
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
            <Link href="/" prefetch={false} className="inline-flex items-center gap-1.5 no-underline">
              <div className="relative flex items-center justify-center w-7 h-7 shrink-0">
                <Image
                  src="/logo.png"
                  alt="Grow Orbit Logo"
                  width={28}
                  height={28}
                  className="object-contain w-auto h-auto"
                />
              </div>
              <span className="text-[15px] sm:text-base font-black tracking-tight uppercase flex gap-1 transition-colors">
                <span className={isDarkTextNeeded ? "text-[#2B3036]" : "text-white"}>GROW</span>
                <span className={isDarkTextNeeded ? "text-orange-600" : "text-[#F1A52B]"}>ORBIT</span>
              </span>
            </Link>
          </div>

          {/* Right: Get Started Button (Links to form) */}
          <div className="flex items-center justify-end shrink-0 min-w-[68px]">
            <Link
              href="/get-started#lead-form"
              prefetch={false}
              onClick={handleGetStartedClick}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-wider px-2.5 sm:px-3 py-1.5 shadow-sm shadow-orange-500/20 active:scale-95 transition-all no-underline shrink-0"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* ════════════════════════════════════════
            DESKTOP NAVBAR (hidden lg:flex)
        ════════════════════════════════════════ */}
        <div className="hidden lg:flex w-full px-6 lg:px-8 xl:px-8 items-center justify-between">
          {/* Logo */}
          <div className="flex-1 flex justify-start">
            <Link href="/" prefetch={false} className="flex items-center gap-2.5 no-underline shrink-0 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-2 focus-visible:outline-none rounded-xl">
              <div className="relative flex items-center justify-center w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="Grow Orbit Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-black tracking-tight uppercase flex gap-1.5 transition-colors">
                <span className={isDarkTextNeeded ? "text-[#2B3036]" : "text-white"}>GROW</span>
                <span className={isDarkTextNeeded ? "text-orange-600" : "text-[#F1A52B]"}>ORBIT</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex lg:items-center gap-3.5 xl:gap-5 justify-center" aria-label="Desktop Navigation">
            {navItems.map((item) => {
              let path = `/${item.toLowerCase().replace(/\s+/g, "-")}`;
              if (item === "Home") path = "/";
              if (item === "Case Studies") path = "/case-study";
              if (item === "Tools") path = "/amazon-tools";

              const isActive = pathname.replace(/\/$/, "") === path.replace(/\/$/, "") || (path === "/" && pathname === "/");
              const isService = item === "Service";

              if (isService) {
                return (
                  <div key={item}>
                    <button
                      onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                      aria-expanded={megaMenuOpen}
                      aria-haspopup="true"
                      className={`nav-link flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer outline-none bg-transparent border-none p-0 focus-visible:text-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-2 focus-visible:outline-none rounded-sm
                        ${isActive || megaMenuOpen ? "text-orange-500 nav-link-active" : textColorClass}
                        ${!(isActive || megaMenuOpen) && hoverColorClass}`}
                    >
                      {item}
                      <ChevronDown
                        size={14}
                        className={`service-chevron ${megaMenuOpen ? "service-chevron-open" : ""}`}
                      />
                    </button>
                  </div>
                );
              }

              return (
                <Link
                  key={item}
                  href={path}
                  prefetch={false}
                  className={`nav-link text-[11px] font-bold uppercase tracking-wider transition-colors no-underline focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-2 focus-visible:outline-none rounded-sm
                    ${isActive ? "text-orange-500 nav-link-active" : textColorClass}
                    ${!isActive && hoverColorClass}`}
                >
                  {item}
                </Link>
              );
            })}
          </nav>

          {/* Auth section — desktop */}
          <div className="hidden lg:flex flex-1 items-center justify-end gap-3 xl:gap-4">
            {!user ? (
              <>
                <a href="/login/" className={`nav-link text-[11px] font-bold uppercase tracking-wider transition-colors no-underline focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-2 focus-visible:outline-none rounded-sm ${textColorClass} ${hoverColorClass}`}>
                  Sign In
                </a>
                <a href="/register/" className={`nav-link text-[11px] font-bold uppercase tracking-wider transition-colors no-underline focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-2 focus-visible:outline-none rounded-sm ${textColorClass} ${hoverColorClass}`}>
                  Register
                </a>
                <Link
                  href="/get-started"
                  prefetch={false}
                  className={`relative overflow-hidden px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all no-underline focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:outline-none
                    ${isDarkTextNeeded
                      ? "bg-black text-white hover:bg-orange-600 shadow-lg hover:shadow-orange-500/25"
                      : "bg-white text-black hover:bg-orange-500 hover:text-white shadow-lg hover:shadow-orange-500/25"
                    }`}
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3 lg:gap-4">
                <Link
                  href="/get-started"
                  prefetch={false}
                  className={`relative overflow-hidden px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all no-underline focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:outline-none
                    ${isDarkTextNeeded
                      ? "bg-black text-white hover:bg-orange-600 shadow-lg hover:shadow-orange-500/25"
                      : "bg-white text-black hover:bg-orange-500 hover:text-white shadow-lg hover:shadow-orange-500/25"
                    }`}
                >
                  Get Started
                </Link>
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(prev => !prev)}
                    className={`flex items-center gap-2 cursor-pointer bg-transparent border-none outline-none transition-opacity hover:opacity-80 ${textColorClass}`}
                  >
                    <div className="h-8.5 w-8.5 rounded-full overflow-hidden border border-white/20 relative shrink-0">
                      {user.photoURL ? (
                        <Image src={user.photoURL} alt="User" fill sizes="34px" className="object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="h-full w-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
                          {getUserInitial()}
                        </div>
                      )}
                    </div>
                    <div className="hidden xl:block text-left">
                      <p className={`text-xs font-semibold leading-none ${textColorClass}`}>
                        {user.displayName || "User"}
                      </p>
                      <p className="text-gray-400 text-[10px] font-medium mt-0.5">
                        {role === "admin" ? "Admin" : "Online"}
                      </p>
                    </div>
                    <ChevronDown size={14} className={`hidden xl:block transition-transform duration-200 ${userDropdownOpen ? "rotate-180" : ""} ${isDarkTextNeeded ? "text-gray-400" : "text-gray-400"}`} />
                  </button>

                  {/* User Dropdown */}
                  {userDropdownOpen && (
                    <div className={`absolute right-0 top-[calc(100%+10px)] w-52 rounded-xl border shadow-xl overflow-hidden z-[100] ${isDarkTextNeeded ? "bg-white border-zinc-200" : "bg-zinc-900 border-white/10"}`}>
                      <div className={`px-4 py-3 border-b ${isDarkTextNeeded ? "border-zinc-100" : "border-white/10"}`}>
                        <p className={`text-xs font-bold truncate ${isDarkTextNeeded ? "text-zinc-800" : "text-white"}`}>{user.displayName || user.email}</p>
                        <p className={`text-[10px] mt-0.5 truncate ${isDarkTextNeeded ? "text-zinc-400" : "text-zinc-500"}`}>{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href={role === "admin" ? "/admin-dashboard" : "/client-dashboard"}
                          prefetch={false}
                          onClick={() => setUserDropdownOpen(false)}
                          className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider no-underline transition-colors ${isDarkTextNeeded ? "text-zinc-700 hover:bg-zinc-50 hover:text-orange-600" : "text-zinc-300 hover:bg-white/5 hover:text-orange-400"}`}
                        >
                          <LayoutDashboard size={14} />
                          {role === "admin" ? "Admin Panel" : "Client Panel"}
                        </Link>
                        <button
                          onClick={() => { setUserDropdownOpen(false); handleLogout(); }}
                          className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider border-none bg-transparent cursor-pointer transition-colors ${isDarkTextNeeded ? "text-zinc-700 hover:bg-red-50 hover:text-red-600" : "text-zinc-300 hover:bg-white/5 hover:text-red-400"}`}
                        >
                          <LogOut size={14} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ════════════════════════════════════════
            MEGA MENU — click to open, header level
        ════════════════════════════════════════ */}
        {megaMenuOpen && (
          <div className="hidden lg:block absolute top-full left-0 w-full">
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-8 flex justify-center">
              <MegaMenu onClose={() => setMegaMenuOpen(false)} />
            </div>
          </div>
        )}
      </header>

      {/* ════════════════════════════════════════
          MOBILE DRAWER — Slides in from LEFT
      ════════════════════════════════════════ */}
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileMenu}
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
          <Link href="/" prefetch={false} onClick={closeMobileMenu} className="flex items-center gap-2.5 no-underline">
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
          </Link>
          <button
            onClick={closeMobileMenu}
            aria-label="Close Navigation Menu"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors border-none bg-transparent cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {navItems.map((item) => {
            let path = `/${item.toLowerCase().replace(/\s+/g, "-")}`;
            if (item === "Home") path = "/";
            if (item === "Case Studies") path = "/case-study";
            if (item === "Tools") path = "/amazon-tools";

            const isActive = pathname.replace(/\/$/, "") === path.replace(/\/$/, "") || (path === "/" && pathname === "/");
            const isService = item === "Service";

            if (isService) {
              return (
                <div key={item}>
                  <button
                    onClick={() => setMobileServiceExpanded(!mobileServiceExpanded)}
                    aria-expanded={mobileServiceExpanded}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[12px] font-bold uppercase tracking-widest transition-colors cursor-pointer border-none bg-transparent
                      ${isActive ? "text-orange-500 bg-orange-50" : "text-zinc-700 hover:bg-zinc-50"}`}
                  >
                    <span>{item}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 text-zinc-400 ${
                        mobileServiceExpanded ? "rotate-180 text-orange-500" : ""
                      }`}
                    />
                  </button>
                  {mobileServiceExpanded && (
                    <div className="mt-1 ml-2 pl-3 border-l-2 border-orange-500/20">
                      <MegaMenu isMobile onClose={closeMobileMenu} />
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item}
                href={path}
                prefetch={false}
                className={`block px-4 py-3 rounded-xl text-[12px] font-bold uppercase tracking-widest no-underline transition-colors
                  ${isActive ? "text-orange-500 bg-orange-50" : "text-zinc-700 hover:bg-zinc-50"}`}
                onClick={closeMobileMenu}
              >
                {item}
              </Link>
            );
          })}

          {/* Auth section in drawer */}
          <div className="pt-3 mt-3 border-t border-zinc-100 space-y-1.5">
            {!user ? (
              <>
                <a
                  href="/login/"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2.5 rounded-xl text-[12px] font-bold uppercase tracking-widest text-zinc-600 hover:bg-zinc-50 no-underline transition-colors"
                >
                  Sign In
                </a>
                <a
                  href="/register/"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2.5 rounded-xl text-[12px] font-bold uppercase tracking-widest text-zinc-600 hover:bg-zinc-50 no-underline transition-colors"
                >
                  Register
                </a>
              </>
            ) : (
              <>
                <Link
                  href={role === "admin" ? "/admin-dashboard" : "/client-dashboard"}
                  prefetch={false}
                  onClick={closeMobileMenu}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-orange-600 bg-orange-50 hover:bg-orange-100 text-[12px] font-bold uppercase tracking-widest transition-colors no-underline"
                >
                  <LayoutDashboard size={15} />
                  {role === "admin" ? "Admin Panel" : "Client Panel"}
                </Link>
                <button
                  onClick={() => { closeMobileMenu(); handleLogout(); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 text-[12px] font-bold uppercase tracking-widest transition-colors border-none bg-transparent cursor-pointer"
                >
                  <LogOut size={15} />
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>

        {/* Drawer Bottom CTA */}
        <div className="p-4 border-t border-zinc-100 bg-zinc-50/50">
          <Link
            href="/get-started#lead-form"
            prefetch={false}
            onClick={handleGetStartedClick}
            className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl text-[11px] font-black uppercase tracking-widest bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 no-underline shadow-md shadow-orange-500/20 active:scale-[0.98] transition-all"
          >
            Get Started Now
          </Link>
        </div>
      </aside>
    </>
  );
}
