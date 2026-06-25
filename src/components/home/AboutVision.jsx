"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, BarChart3, Camera, TrendingUp, Zap, Target, Shield, Rocket, Star, Package } from "lucide-react";

/* ─────────────────────────────────────────────
   DETERMINISTIC STARS
───────────────────────────────────────────── */
const STARS = Array.from({ length: 120 }, (_, i) => ({
  cx:  ((i * 173 + 41) % 950) + 25,
  cy:  ((i * 97  + 83) % 380) + 20,
  r:   [0.7, 0.7, 1.1, 0.7, 1.5, 0.7, 0.7, 0.9][i % 8],
  op:  [0.22, 0.42, 0.62, 0.28, 0.52, 0.18, 0.48, 0.35][i % 8],
  dur: [2.1, 3.4, 2.8, 4.2, 1.9, 3.1, 2.5, 2.9][i % 8],
  del: [0, 0.6, 1.2, 0.3, 1.8, 0.9, 1.5, 0.4][i % 8],
}));

/* ─────────────────────────────────────────────
   SHOOTING STARS — branded milestones
   Each comet carries a label that represents
   an Amazon brand launch milestone
───────────────────────────────────────────── */
const COMETS = [
  {
    label: "Brand Launch",
    sublabel: "Day 1",
    color: "#f97316",
    glowColor: "rgba(249,115,22,0.7)",
    trailColor: "rgba(249,115,22",
    tailLen: 160,
    speed: "28s",
    delay: "0s",
    angle: 16,
    startX: -340, startY: "11%",
    endX: 1400, endY: "65%",
    icon: <Rocket size={9} />,
    animName: "comet1",
  },
  {
    label: "Page 1 Rank",
    sublabel: "+168% CTR",
    color: "#22d3ee",
    glowColor: "rgba(34,211,238,0.7)",
    trailColor: "rgba(34,211,238",
    tailLen: 110,
    speed: "38s",
    delay: "9s",
    angle: 170,
    startX: 1400, startY: "18%",
    endX: -300, endY: "72%",
    icon: <TrendingUp size={9} />,
    animName: "comet2",
  },
  {
    label: "$28K Revenue",
    sublabel: "60 Days",
    color: "#4ade80",
    glowColor: "rgba(74,222,128,0.7)",
    trailColor: "rgba(74,222,128",
    tailLen: 130,
    speed: "45s",
    delay: "18s",
    angle: 12,
    startX: -300, startY: "55%",
    endX: 1400, endY: "22%",
    icon: <Star size={9} />,
    animName: "comet3",
  },
  {
    label: "#1 New Release",
    sublabel: "Day 58",
    color: "#a78bfa",
    glowColor: "rgba(167,139,250,0.7)",
    trailColor: "rgba(167,139,250",
    tailLen: 90,
    speed: "55s",
    delay: "28s",
    angle: 165,
    startX: 1400, startY: "62%",
    endX: -280, endY: "28%",
    icon: <Package size={9} />,
    animName: "comet4",
  },
  {
    label: "8.2x ROAS",
    sublabel: "ACoS 11%",
    color: "#fb923c",
    glowColor: "rgba(251,146,60,0.6)",
    trailColor: "rgba(251,146,60",
    tailLen: 75,
    speed: "34s",
    delay: "42s",
    angle: 14,
    startX: -280, startY: "35%",
    endX: 1400, endY: "80%",
    icon: <BarChart3 size={9} />,
    animName: "comet5",
  },
];

/* ─────────────────────────────────────────────
   ORBIT CONFIG
───────────────────────────────────────────── */
const ORBITS = [
  { icon: <Search size={15} />,     label: "SEO & Keywords",    tag: "01", r: 155, dur: 26, color: "#f97316", a0: 20,  ring: true  },
  { icon: <BarChart3 size={15} />,  label: "PPC & Ads",         tag: "02", r: 235, dur: 43, color: "#22d3ee", a0: 110, ring: false },
  { icon: <Camera size={15} />,     label: "Creative & Design", tag: "03", r: 315, dur: 62, color: "#a78bfa", a0: 200, ring: false },
  { icon: <TrendingUp size={15} />, label: "Scale & Authority", tag: "04", r: 400, dur: 82, color: "#4ade80", a0: 295, ring: false },
];

const BLOCKS = [
  { icon: <Zap size={20} />,      title: "Algorithm-First Strategy", num: "01", dots: 1 },
  { icon: <Target size={20} />,   title: "Full-Funnel Execution",    num: "02", dots: 2 },
  { icon: <Shield size={20} />,   title: "Profitable Scaling",       num: "03", dots: 3 },
  { icon: <BarChart3 size={20} />,title: "Real-Time Metrics",        num: "04", dots: 4 },
];

function Block({ icon, title, num, dots }) {
  return (
    <div
      className="bg-white border border-zinc-100 rounded-3xl p-6 flex flex-col justify-between group hover:shadow-xl hover:border-orange-500/20 transition-all duration-500 cursor-pointer"
      style={{ height: 132, fontFamily: "'Montserrat',sans-serif" }}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-1.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-colors duration-300 ${i < dots ? "bg-zinc-900 group-hover:bg-orange-500" : "bg-zinc-200"}`} />
          ))}
        </div>
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">{num}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-zinc-400 group-hover:text-orange-500 transition-colors">{icon}</div>
        <h3 className="text-[15px] font-bold tracking-tight text-zinc-900">{title}</h3>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   3D PLANET
───────────────────────────────────────────── */
function Planet({ color: c, icon, hasRing = false }) {
  const s = 46;
  return (
    <div className="relative flex items-center justify-center" style={{ width: s + 44, height: s + 44 }}>
      {/* Atmosphere */}
      <div className="absolute rounded-full pointer-events-none"
        style={{ width: s, height: s,
          boxShadow: `0 0 40px 15px ${c}40, 0 0 80px 30px ${c}20, 0 0 120px 50px ${c}05` }} />
      {/* Ring back */}
      {hasRing && (
        <div className="absolute pointer-events-none" style={{ zIndex: 0 }}>
          <div style={{ width: s * 2.7, height: s * 0.55, borderRadius: "50%",
            border: `2.5px solid ${c}50`, boxShadow: `0 0 10px ${c}30`,
            clipPath: "inset(0 0 50% 0)" }} />
        </div>
      )}
      {/* Sphere */}
      <div className="relative rounded-full flex items-center justify-center"
        style={{ width: s, height: s, zIndex: 10,
          background: `radial-gradient(circle at 32% 27%,rgba(255,255,255,.28) 0%,transparent 38%),
            radial-gradient(circle at 67% 70%,rgba(0,0,0,.4) 0%,transparent 40%),
            radial-gradient(circle,${c}ff 0%,${c}cc 40%,${c}66 75%,${c}22 100%)`,
          boxShadow: `0 0 26px ${c}70,0 0 55px ${c}30,0 0 90px ${c}12,
            inset -5px -5px 14px rgba(0,0,0,.55),inset 3px 3px 8px rgba(255,255,255,.14)` }}>
        <div className="absolute pointer-events-none"
          style={{ width: "34%", height: "20%", top: "16%", left: "20%",
            background: "rgba(255,255,255,.22)", filter: "blur(4px)" }} />
        <div className="text-white/95 relative z-10">
          {React.cloneElement(icon, { size: 17, strokeWidth: 2.5 })}
        </div>
      </div>
      {/* Ring front */}
      {hasRing && (
        <div className="absolute pointer-events-none" style={{ zIndex: 20 }}>
          <div style={{ width: s * 2.7, height: s * 0.55, borderRadius: "50%",
            border: `2.5px solid ${c}80`, boxShadow: `0 0 12px ${c}55`,
            clipPath: "inset(50% 0 0 0)" }} />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   BRANDED COMET
───────────────────────────────────────────── */
function BrandedComet({ comet }) {
  const { label, sublabel, color, glowColor, trailColor, tailLen, speed, delay, angle, startX, startY, endX, endY, icon, animName } = comet;

  const keyframesId = `kf-${animName}`;
  const normalizedAngle = ((angle % 360) + 360) % 360;
  const isUpsideDown = normalizedAngle > 90 && normalizedAngle < 270;

  return (
    <>
      <style>{`
        @keyframes ${animName} {
          0%, 65%, 100% { transform: translate(${startX}px, ${(startX * Math.tan(angle * Math.PI / 180)).toFixed(2)}px) rotate(${angle}deg); opacity: 0; top: ${startY}; }
          66%  { opacity: 1; }
          99%  { transform: translate(${endX}px, ${(endX * Math.tan(angle * Math.PI / 180)).toFixed(2)}px) rotate(${angle}deg); opacity: 0; top: ${startY}; }
        }
      `}</style>
      <div
        className="absolute pointer-events-none"
        style={{
          left: 0,
          top: startY,
          animation: `${animName} ${speed} linear ${delay} infinite`,
          display: "flex",
          alignItems: "center",
          gap: 0,
          transform: `rotate(${angle}deg)`,
          transformOrigin: "left center",
          zIndex: 30,
        }}
      >
        {/* Tail gradient */}
        <div style={{
          width: tailLen,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${trailColor},0.08) 20%, ${trailColor},0.55) 65%, ${color} 100%)`,
          borderRadius: 2,
          filter: "blur(0.8px)",
        }} />

        {/* Head pill — branded label */}
        <div style={{
          display: "flex",
          alignItems: "center",
          flexDirection: isUpsideDown ? "row-reverse" : "row",
          gap: 5,
          background: "rgba(4,4,10,0.82)",
          border: `1px solid ${color}55`,
          borderRadius: 20,
          padding: "3px 8px 3px 6px",
          boxShadow: `0 0 14px ${glowColor}, 0 0 28px ${glowColor.replace("0.7","0.3")}`,
          backdropFilter: "blur(4px)",
          marginLeft: -1,
          transform: isUpsideDown ? "scale(-1, -1)" : "none",
        }}>
          {/* Dot glow */}
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: color,
            boxShadow: `0 0 8px ${color}, 0 0 16px ${glowColor}`,
            flexShrink: 0,
          }} />
          {/* Icon */}
          <span style={{ color, display: "flex", alignItems: "center" }}>{icon}</span>
          {/* Text */}
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              fontSize: 8,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#fff",
              whiteSpace: "nowrap",
            }}>{label}</span>
            <span style={{
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: 7,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color,
              whiteSpace: "nowrap",
              marginTop: 1,
            }}>{sublabel}</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function OrbitSection() {
  const ref = useRef(null);
  const tls = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      tls.current = [];
      ORBITS.forEach((o, i) => {
        tls.current.push(
          gsap.to(`.op-${i}`, { rotation: "+=360", duration: o.dur,      repeat: -1, ease: "none", transformOrigin: "center center" }),
          gsap.to(`.pc-${i}`, { rotation: "-=360", duration: o.dur,      repeat: -1, ease: "none", transformOrigin: "center center" }),
          gsap.to(`.da-${i}`, { rotation: "+=360", duration: o.dur * .96,  repeat: -1, ease: "none", transformOrigin: "center center" }),
          gsap.to(`.db-${i}`, { rotation: "+=360", duration: o.dur * 1.05, repeat: -1, ease: "none", transformOrigin: "center center" }),
        );
      });
      tls.current.push(
        gsap.to(".c-inner", { scale: 1.07, duration: 2.6, repeat: -1, yoyo: true, ease: "sine.inOut" }),
        gsap.to(".c-glow",  { scale: 1.18, opacity: .75, duration: 3.1, repeat: -1, yoyo: true, ease: "sine.inOut" }),
        gsap.to(".o-ring",  { opacity: .48, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: .65 }),
      );

      // Pause all tweens immediately — ScrollTrigger will play them on entry
      tls.current.forEach(t => t.pause());

      // Viewport-gated: play when section enters, pause when it leaves
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        onEnter:     () => tls.current.forEach(t => t.resume()),
        onEnterBack: () => tls.current.forEach(t => t.resume()),
        onLeave:     () => tls.current.forEach(t => t.pause()),
        onLeaveBack: () => tls.current.forEach(t => t.pause()),
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const speedUp = () => {
    tls.current.forEach(t => gsap.to(t, { timeScale: 2.6, duration: 1.1, ease: "power2.inOut" }));
    gsap.to(".c-glow", { opacity: 1, scale: 1.6, duration: .8, ease: "power2.out", overwrite: "auto" });
    gsap.to(".o-ring",  { opacity: .7,  duration: .4 });
    gsap.to(".p-lbl",   { opacity: 1,   duration: .4 });
    ORBITS.forEach((_, i) => gsap.to(`.pi-${i}`, { scale: 1.14, duration: .5, ease: "power2.out" }));
  };
  const slowDown = () => {
    tls.current.forEach(t => gsap.to(t, { timeScale: 1, duration: 1.5, ease: "power2.inOut" }));
    gsap.to(".c-glow", { opacity: .55, scale: 1, duration: 1.2, ease: "power2.inOut", overwrite: "auto" });
    gsap.to(".o-ring",  { opacity: .22, duration: .8 });
    gsap.to(".p-lbl",   { opacity: .32, duration: .8 });
    ORBITS.forEach((_, i) => gsap.to(`.pi-${i}`, { scale: 1, duration: .8, ease: "power2.inOut" }));
  };

  return (
    <section
      className="bg-[#fafafa] pt-16 pb-16 px-6 lg:px-10 border-t border-zinc-100"
      style={{ fontFamily: "'Montserrat',sans-serif" }}
    >
      <style>{`
        @keyframes twinkle {
          0%,100% { opacity: 0.45; }
          50%      { opacity: 0.06; }
        }
        @keyframes pulse-r {
          0%   { transform: scale(.8);  opacity: .8; }
          100% { transform: scale(3.2); opacity: 0;  }
        }
        @keyframes cspin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes scan {
          0%,100% { transform: translateX(-110%); opacity: 0; }
          10%,90% { opacity: 1; }
          50%      { transform: translateX(110%); }
        }
        @keyframes fadeup {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto">

        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-14 border-b border-zinc-100 pb-8 sm:pb-12 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[2px] bg-orange-500" />
              <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[9px] sm:text-[10px] font-mono">Our Methodology</span>
            </div>
            <h2
              className="text-[40px] xs:text-5xl md:text-[56px] font-black leading-[0.92] tracking-tighter text-zinc-950 uppercase"
              style={{ fontFamily: "'Montserrat',sans-serif" }}
            >
              Your brand,<br />
              <span className="italic font-light text-zinc-300 normal-case tracking-normal"
                    style={{ fontFamily: "'Playfair Display',serif" }}>built to scale.</span>
            </h2>
          </div>
          <div className="max-w-sm flex flex-col gap-3 md:text-right md:items-end">
            <p className="text-zinc-600 text-[15px] font-medium leading-relaxed">
              <strong className="text-zinc-900 font-bold tracking-tight">This is how your brand actually grows.</strong>
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
              <span>Not Linear</span>
              <span className="text-zinc-300">•</span>
              <span>Not Random</span>
            </div>
            <p className="text-orange-600 text-[15px] sm:text-[16px] italic font-medium mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              But as a system where every piece compounds the next.
            </p>
          </div>
        </div>

        {/* ── STAT BLOCKS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          {BLOCKS.map((b, i) => <Block key={i} {...b} />)}
        </div>

        {/* ════════════ SCI-FI CANVAS ════════════ */}
        <div
          ref={ref}
          onMouseEnter={speedUp}
          onMouseLeave={slowDown}
          className="w-full hidden md:flex items-center justify-center relative overflow-hidden cursor-pointer select-none"
          style={{
            aspectRatio: "2.2/1",
            borderRadius: 40,
            background: "#04040a",
            border: "1px solid rgba(249,115,22,0.12)",
            boxShadow: "0 40px 100px rgba(0,0,0,.65),inset 0 0 0 1px rgba(249,115,22,0.06)",
          }}
        >
          {/* Dot grid */}
          <div className="absolute inset-0 pointer-events-none opacity-[.022]"
               style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "26px 26px" }} />
          {/* Hex tint grid */}
          <div className="absolute inset-0 pointer-events-none opacity-[.012]"
               style={{ backgroundImage: "linear-gradient(rgba(249,115,22,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,.4) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />

          {/* Nebulae */}
          <div className="absolute pointer-events-none" style={{ width:550,height:420,top:"-15%",left:"-6%", background:"radial-gradient(ellipse,rgba(249,115,22,.13) 0%,rgba(249,115,22,.04) 45%,transparent 70%)",filter:"blur(45px)" }} />
          <div className="absolute pointer-events-none" style={{ width:440,height:380,bottom:"-18%",right:"4%", background:"radial-gradient(ellipse,rgba(34,211,238,.10) 0%,rgba(34,211,238,.03) 45%,transparent 70%)",filter:"blur(52px)" }} />
          <div className="absolute pointer-events-none" style={{ width:320,height:300,top:"8%",right:"18%", background:"radial-gradient(ellipse,rgba(167,139,250,.08) 0%,transparent 65%)",filter:"blur(42px)" }} />
          <div className="absolute pointer-events-none" style={{ width:260,height:260,bottom:"5%",left:"15%", background:"radial-gradient(ellipse,rgba(74,222,128,.06) 0%,transparent 65%)",filter:"blur(38px)" }} />

          {/* Deep center glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div style={{ width:700,height:700, background:"radial-gradient(circle,rgba(249,115,22,.055) 0%,transparent 62%)", filter:"blur(30px)" }} />
          </div>

          {/* ── STAR FIELD ── */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 430" preserveAspectRatio="xMidYMid slice">
            {STARS.map((s, i) => {
              const shouldTwinkle = i % 8 === 0;
              return (
                <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white"
                  style={{ opacity: s.op, ...(shouldTwinkle ? { animation: `twinkle ${s.dur}s ease-in-out ${s.del}s infinite` } : {}) }} />
              );
            })}
            {/* Bright cross-stars at corners / highlights */}
            {[[80,55],[920,330],[490,28],[740,390],[155,345],[820,80]].map(([cx,cy],i) => (
              <g key={i} style={{ opacity: .52, animation: `twinkle ${3+i*.7}s ease-in-out ${i*.9}s infinite` }}>
                <circle cx={cx} cy={cy} r="2.0" fill="white" />
                <line x1={cx-6} y1={cy} x2={cx+6} y2={cy} stroke="white" strokeWidth=".55" opacity=".32" />
                <line x1={cx} y1={cy-6} x2={cx} y2={cy+6} stroke="white" strokeWidth=".55" opacity=".32" />
              </g>
            ))}
          </svg>

          {/* ── BRANDED SHOOTING STARS ── */}
          {COMETS.map((c, i) => <BrandedComet key={i} comet={c} />)}

          {/* ── SCAN LINE ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div style={{ position:"absolute",width:"60%",height:"100%",top:0,left:0,
              background:"linear-gradient(90deg,transparent,rgba(249,115,22,.028) 50%,transparent)",
              animation:"scan 16s ease-in-out 4s infinite" }} />
          </div>

          {/* ── ORBIT RINGS ── */}
          {ORBITS.map((o, i) => (
            <div key={`r${i}`} className="o-ring absolute rounded-full pointer-events-none"
              style={{ width: o.r*2, height: o.r*2,
                border: `1px solid ${o.color}`, opacity: .22,
                boxShadow: `0 0 14px ${o.color}22,inset 0 0 14px ${o.color}10` }}>
              <div className="p-lbl absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2.5 py-0.5 rounded-full border"
                style={{ background:"#04040a", borderColor:`${o.color}30`, opacity:.32 }}>
                <span className="text-[8px] font-black uppercase tracking-[.35em] font-mono" style={{ color: o.color }}>{o.tag}</span>
              </div>
            </div>
          ))}

          {/* ── TRAIL DOTS (2 per orbit) ── */}
          {ORBITS.map((o, i) => (
            <React.Fragment key={`d${i}`}>
              <div className={`da-${i} absolute pointer-events-none`}
                style={{ width:o.r*2,height:o.r*2,transformOrigin:"center center",transform:`rotate(${o.a0+135}deg)` }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ width:i===0?5:4,height:i===0?5:4,background:o.color,boxShadow:`0 0 ${i===0?9:7}px ${o.color}`,opacity:.7 }} />
              </div>
              <div className={`db-${i} absolute pointer-events-none`}
                style={{ width:o.r*2,height:o.r*2,transformOrigin:"center center",transform:`rotate(${o.a0+255}deg)` }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ width:3,height:3,background:o.color,boxShadow:`0 0 6px ${o.color}`,opacity:.45 }} />
              </div>
            </React.Fragment>
          ))}

          {/* ── ORBITING PLANETS ── */}
          {ORBITS.map((o, i) => (
            <div key={`p${i}`} className={`op-${i} absolute`}
              style={{ width:o.r*2,height:o.r*2,transformOrigin:"center center",transform:`rotate(${o.a0}deg)` }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className={`pc-${i} flex flex-col items-center`} style={{ transform:`rotate(${-o.a0}deg)` }}>
                  <div className={`pi-${i}`}>
                    <Planet color={o.color} icon={o.icon} hasRing={i === 0} />
                  </div>
                  <div className="px-2.5 py-0.5 rounded-full border backdrop-blur-sm -mt-3 relative z-30"
                    style={{ background:"rgba(4,4,10,.88)", borderColor:`${o.color}30` }}>
                    <p className="text-[8px] font-bold uppercase tracking-[.2em] whitespace-nowrap font-mono" style={{ color: o.color }}>{o.label}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* ── CENTER STAR (Grow Orbit HQ) ── */}
          <div className="relative z-20 flex items-center justify-center">
            {/* Pulse rings */}
            {[0, .75, 1.5].map((d, i) => (
              <div key={i} className="absolute rounded-full pointer-events-none"
                style={{ width:88,height:88,border:"1px solid rgba(249,115,22,.55)",
                  animation:`pulse-r 3.6s ease-out ${d}s infinite` }} />
            ))}
            {/* Glow halo */}
            <div className="c-glow absolute rounded-full pointer-events-none"
              style={{ width:280,height:280,opacity:.55,
                background:"radial-gradient(circle,rgba(249,115,22,.62) 0%,rgba(249,115,22,.14) 38%,transparent 68%)",
                filter:"blur(38px)" }} />
            {/* Corona rays */}
            <div className="absolute pointer-events-none opacity-[.14]"
              style={{ width:165,height:165,animation:"cspin 22s linear infinite" }}>
              {[0,40,80,120,160].map((a, i) => (
                <div key={i} className="absolute inset-0 flex items-center justify-center">
                  <div style={{ width:1,height:"100%",
                    background:`linear-gradient(to bottom,transparent,rgba(249,115,22,.85) 28%,rgba(249,115,22,.85) 72%,transparent)`,
                    transform:`rotate(${a}deg)`,transformOrigin:"center" }} />
                </div>
              ))}
            </div>
            {/* Core */}
            <div className="c-inner relative flex flex-col items-center justify-center border border-white/10 overflow-hidden"
              style={{ width:155,height:155,borderRadius:"50%",
                background:`radial-gradient(circle at 36% 30%,rgba(255,255,255,.13) 0%,transparent 38%),
                  radial-gradient(circle,#2b1400 0%,#130a00 45%,#04040a 100%)`,
                boxShadow:`0 0 0 1px rgba(249,115,22,.35),0 0 38px rgba(249,115,22,.32),
                  0 0 80px rgba(249,115,22,.14),inset 0 0 30px rgba(249,115,22,.22),
                  inset 0 0 60px rgba(0,0,0,.7)` }}>
              <div className="absolute rounded-full border border-orange-500/18 pointer-events-none" style={{ width:"70%",height:"70%" }} />
              <div className="absolute rounded-full border border-orange-500/09 pointer-events-none" style={{ width:"86%",height:"86%" }} />
              <div className="flex flex-col items-center gap-0.5 z-10">
                <div className="w-9 h-9 rounded-[10px] flex items-center justify-center mb-0.5"
                  style={{ background:"linear-gradient(135deg,#f97316,#ea580c)", boxShadow:"0 0 22px rgba(249,115,22,.65),0 0 44px rgba(249,115,22,.3)" }}>
                  <span className="text-white font-black text-[12px] tracking-tighter" style={{ fontFamily:"'Montserrat',sans-serif" }}>GO</span>
                </div>
                <span className="text-white font-black text-[9px] uppercase tracking-[.22em]" style={{ fontFamily:"'Montserrat',sans-serif" }}>Grow Orbit</span>
                <span className="text-orange-400 text-[7px] font-bold uppercase tracking-[.3em] font-mono">Your Brand</span>
              </div>
              <div className="absolute inset-0 rounded-full opacity-[.03] pointer-events-none"
                style={{ backgroundImage:"radial-gradient(circle,#fff 1px,transparent 1px)",backgroundSize:"12px 12px" }} />
            </div>
          </div>

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none rounded-[40px]"
            style={{ boxShadow:"inset 0 0 130px rgba(4,4,10,.92)" }} />

          {/* Hover hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-25">
            <div className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[8px] font-bold uppercase tracking-[.4em] text-white font-mono">Hover to Accelerate</span>
          </div>

          {/* ── CORNER MILESTONE BADGES ── */}
          {/* Top-left */}
          <div className="absolute top-5 left-6 flex flex-col gap-2 pointer-events-none" style={{ zIndex: 40 }}>
            {[
              { label: "Brands Scaled", val: "80+", color: "#f97316" },
              { label: "Avg Revenue Lift", val: "+38%", color: "#4ade80" },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-sm"
                style={{ background:"rgba(4,4,10,0.72)", borderColor:`${b.color}25` }}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: b.color }} />
                <span className="font-black text-[10px] text-white">{b.val}</span>
                <span className="font-mono text-[8px] uppercase tracking-widest" style={{ color: b.color }}>{b.label}</span>
              </div>
            ))}
          </div>

          {/* Top-right */}
          <div className="absolute top-5 right-6 flex flex-col gap-2 items-end pointer-events-none" style={{ zIndex: 40 }}>
            {[
              { label: "Peak ROAS", val: "8.2x", color: "#22d3ee" },
              { label: "Avg ACoS",  val: "14%",   color: "#a78bfa" },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-sm"
                style={{ background:"rgba(4,4,10,0.72)", borderColor:`${b.color}25` }}>
                <span className="font-mono text-[8px] uppercase tracking-widest" style={{ color: b.color }}>{b.label}</span>
                <span className="font-black text-[10px] text-white">{b.val}</span>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: b.color }} />
              </div>
            ))}
          </div>
        </div>

        {/* ── MOBILE FALLBACK ── */}
        <div className="md:hidden mt-3 grid grid-cols-2 gap-3">
          {ORBITS.map((o, i) => (
            <div key={i} className="rounded-2xl p-5 border flex flex-col gap-3"
              style={{ background:"#04040a", borderColor:`${o.color}30` }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ background:`radial-gradient(circle at 35% 35%,${o.color} 0%,rgba(0,0,0,.9) 100%)`, boxShadow:`0 0 15px ${o.color}50` }}>
                {o.icon}
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest font-mono mb-1" style={{ color: o.color }}>{o.tag}</p>
                <p className="text-white font-black text-[13px] uppercase tracking-tight">{o.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}