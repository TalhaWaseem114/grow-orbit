"use client";

import { useState, useEffect } from "react";
import ThemeTwo from "./themes/ThemeTwo";

import { ACTIVE_SECTIONS } from "@/lib/activeLandingConfig";

export default function CampaignPage() {
  const [scrolled, setScrolled] = useState(false);
  const activeSections = ACTIVE_SECTIONS;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(prev => {
            const next = window.scrollY > 100;
            return prev === next ? prev : next;
          });
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  return (
    <main
      className="min-h-screen bg-[#fafafa] text-zinc-900 selection:bg-orange-500 selection:text-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .fade-up { animation: fade-up 0.6s ease both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.45s; }
        @keyframes shimmer-btn {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      <ThemeTwo scrolled={scrolled} activeSections={activeSections} />
    </main>
  );
}
