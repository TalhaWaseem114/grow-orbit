import React, { useEffect, useRef, useState } from 'react';
import { Check, ArrowRight, Rocket, Radio } from "lucide-react";
import gsap from 'gsap';
import Link from "next/link";

export default function StrategyCard() {
  const cardRef = useRef(null);
  const rocketRef = useRef(null);
  const starsRef = useRef(null);
  const glowRef = useRef(null);
  const [missionStatus, setMissionStatus] = useState("Standby");

  useEffect(() => {
    // Stage 1: Cold Space Floating
    gsap.to(rocketRef.current, {
      y: -15,
      rotation: -10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Create Starfield
    const stars = starsRef.current;
    for (let i = 0; i < 40; i++) {
      const star = document.createElement('div');
      star.className = 'absolute bg-white rounded-full pointer-events-none opacity-20 star-particle';
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      stars.appendChild(star);

      gsap.to(star, {
        opacity: Math.random(),
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  const handleMouseEnter = () => {
    setMissionStatus("Launching");
    const tl = gsap.timeline();

    // 1. IGNITION: Vibrate the entire Card
    tl.to(cardRef.current, {
      x: "random(-1, 1)",
      y: "random(-1, 1)",
      duration: 0.05,
      repeat: 15,
      yoyo: true,
      ease: "none",
    })
    // 2. LAUNCH AESTHETIC: Card turns "Hot"
    .to(cardRef.current, {
      backgroundColor: "#1a0d00", // Dark burnt orange tint
      borderColor: "rgba(249, 115, 22, 0.3)",
      duration: 0.3,
    }, 0)
    // 3. BLAST OFF
    .to(rocketRef.current, {
      y: -900,
      x: 400,
      scale: 0.2,
      opacity: 0,
      duration: 0.8,
      ease: "power4.in",
    }, 0.5)
    // 4. SONIC BOOM FLASH
    .fromTo(glowRef.current,
      { scale: 0.5, opacity: 0 },
      {
        scale: 2.5,
        opacity: 0.6,
        duration: 0.4,
        ease: "expo.out",
        onComplete: () => setMissionStatus("In Orbit")
      },
      "-=0.4"
    )
    // 5. POST-LAUNCH: Fade background to deep sleek black
    .to(cardRef.current, {
      backgroundColor: "#050505",
      duration: 1,
    });

    // Speed up stars into "Warp" effect
    gsap.to(".star-particle", {
      y: 400,
      scaleY: 10, // Stretch stars
      opacity: 0.8,
      duration: 0.6,
      stagger: 0.005,
      ease: "power2.in"
    });
  };

  const handleMouseLeave = () => {
    setMissionStatus("Standby");
    const tl = gsap.timeline();

    // RESET TO IDLE
    tl.to(cardRef.current, {
      backgroundColor: "#0a0a0a",
      x: 0, y: 0,
      borderColor: "rgba(255,255,255,0.05)",
      duration: 0.5
    });

    tl.to(rocketRef.current, {
      y: 0, x: 0, scale: 1, opacity: 0.05,
      duration: 1,
      ease: "back.out(1.2)",
    }, 0);

    gsap.to(".star-particle", {
      y: 0, scaleY: 1, opacity: 0.2,
      duration: 1,
      ease: "power2.out"
    });

    gsap.to(glowRef.current, { opacity: 0, duration: 0.5 });
  };

  return (
    <div className="w-full pb-16 bg-[#fafafa]">
      <section className="px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="bg-[#0a0a0a] rounded-[48px] py-16 px-8 lg:px-20 text-center relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] border border-white/5 cursor-pointer group transition-colors duration-500"
          >
            {/* DYNAMIC BACKGROUNDS */}
            <div ref={starsRef} className="absolute inset-0 z-0" />

            <div
              ref={glowRef}
              className="absolute inset-0 bg-gradient-radial from-orange-600/40 via-orange-900/10 to-transparent opacity-0 pointer-events-none"
            />

            {/* THE ROCKET */}
            <div
              ref={rocketRef}
              className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none z-0"
            >
              <Rocket size={500} strokeWidth={0.5} className="text-orange-500 -rotate-12 fill-orange-500/5" />
            </div>

            {/* CONTENT */}
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className={`w-2 h-2 rounded-full ${missionStatus === "Standby" ? 'bg-orange-500 animate-pulse' : 'bg-green-400'}`}></div>
                <span className="text-white font-bold text-[9px] uppercase tracking-[0.4em]">
                  {missionStatus === "Standby" ? "System: Ready" : `Mission: ${missionStatus}`}
                </span>
                {missionStatus === "In Orbit" && <Radio size={12} className="text-green-400 animate-bounce" />}
              </div>

              <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter mb-6 leading-[1.05] text-white">
                Start your <br />
                <span className={`italic font-serif block mt-2 tracking-tight transition-all duration-700
                  ${missionStatus === "In Orbit" ? "text-green-400 scale-110" : "text-orange-500"}`}>
                  Countdown.
                </span>
              </h2>

              <p className="text-gray-400 font-light mb-10 text-base lg:text-lg leading-relaxed max-w-lg mx-auto">
                Book a 15-minute introductory session. We’ll map out your market entry strategy and provide a clear roadmap to get your brand in orbit.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-4 px-10 py-5 bg-orange-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all duration-500 group shadow-[0_20px_50px_rgba(249,115,22,0.4)]"
              >
                Get Your Free Session
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>

              <div className="mt-12 pt-8 border-t border-white/8 flex flex-wrap justify-center gap-x-10 gap-y-4">
                {[
                  "Market Insights",
                  "Execution Roadmap",
                  "Zero Obligation"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 transition-all duration-500 group-hover:text-zinc-200">
                    <Check size={14} className="text-orange-500" strokeWidth={4} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .bg-gradient-radial {
          background-image: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 70%);
        }
      `}} />
    </div>
  )
}
