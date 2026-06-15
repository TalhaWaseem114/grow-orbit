"use client";

import { useState, useEffect } from "react";
import ThemeOne from "./themes/ThemeOne";
import ThemeTwo from "./themes/ThemeTwo";
import ThemeThree from "./themes/ThemeThree";
import { subscribeToExperimentConfig } from "@/lib/experimentService";

export default function CampaignPage() {
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTheme, setActiveTheme] = useState("theme-1"); // default to full page
  const [activeSections, setActiveSections] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  // Fetch active theme from Firestore in real-time
  useEffect(() => {
    console.log("[CampaignPage] Subscribing to experiment config...");
    const unsubscribe = subscribeToExperimentConfig((config) => {
      console.log("[CampaignPage] Received theme update:", config.layoutId, config.activeSections);
      setActiveTheme(config.layoutId);
      setActiveSections(config.activeSections || {});
      setLoading(false);
    });
    
    return () => {
      console.log("[CampaignPage] Unsubscribing from experiment config...");
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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

      {activeTheme === "theme-1" && <ThemeOne scrolled={scrolled} activeSections={activeSections} />}
      {activeTheme === "theme-2" && <ThemeTwo scrolled={scrolled} activeSections={activeSections} />}
      {activeTheme === "theme-3" && <ThemeThree scrolled={scrolled} activeSections={activeSections} />}
    </main>
  );
}
