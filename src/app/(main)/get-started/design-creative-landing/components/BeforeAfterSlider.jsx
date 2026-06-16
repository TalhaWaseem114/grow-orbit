"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Eye, ShieldAlert, Award } from "lucide-react";

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full">
            Before vs After Overhaul
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-2">
            Conversion Design in Action
          </h3>
          <p className="text-zinc-500 text-xs sm:text-sm font-light mt-1 max-w-lg">
            Drag the slider handle to compare an amateur manufacturer-supplied photo against a Grow Orbit visually engineered conversion asset.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setSliderPos(15)}
            className="px-3 py-1 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg text-[10px] uppercase font-mono tracking-widest transition-all"
          >
            Show Before
          </button>
          <button
            onClick={() => setSliderPos(85)}
            className="px-3 py-1 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg text-[10px] uppercase font-mono tracking-widest transition-all"
          >
            Show After
          </button>
        </div>
      </div>

      {/* Slider Frame */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] max-h-[500px] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/40 select-none cursor-ew-resize"
        onMouseDown={(e) => {
          isDragging.current = true;
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          isDragging.current = true;
          if (e.touches && e.touches[0]) {
            handleMove(e.touches[0].clientX);
          }
        }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* BEFORE IMAGE (BACKGROUND) */}
        <div className="absolute inset-0 bg-[#161616] p-8 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1 bg-red-950/40 border border-red-500/20 text-red-400 rounded-lg text-[9px] font-mono uppercase tracking-wider">
              <ShieldAlert size={10} /> Amateur Listing (Amateur Photo)
            </div>
            <span className="text-zinc-700 font-mono text-[10px]">CONVERSION: ~1.2%</span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center py-6">
            <div className="w-48 h-48 bg-zinc-800/20 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center p-4 text-center opacity-70">
              <span className="text-4xl filter grayscale">🧴</span>
              <p className="text-[11px] text-zinc-500 font-semibold mt-3 uppercase tracking-wider">Stock Dropper Bottle</p>
              <p className="text-[9px] text-zinc-600 font-light mt-1">Harsh flash lighting, flat gray background, tiny features invisible.</p>
            </div>
            <div className="mt-4 max-w-sm text-center">
              <p className="text-[12px] text-zinc-500 font-bold uppercase tracking-wider">"Organic Serum for Face"</p>
              <p className="text-[10px] text-zinc-600 font-light leading-snug mt-1">Contains natural elements. Use daily. Great quality organic hydration skincare for men and women.</p>
            </div>
          </div>

          <div className="text-[9px] text-zinc-600 uppercase font-mono tracking-widest text-center">
            Amateur layout with zero benefits highlights
          </div>
        </div>

        {/* AFTER IMAGE (FOREGROUND, CLIPPED) */}
        <div
          className="absolute inset-0 bg-zinc-950 p-8 flex flex-col justify-between overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          {/* Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-650/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/[0.05] rounded-full blur-[80px] pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-lg text-[9px] font-mono uppercase tracking-wider">
              <Sparkles size={10} className="animate-pulse" /> Grow Orbit Visual Overhaul
            </div>
            <span className="text-orange-400 font-black font-mono text-[10px] bg-orange-500/10 px-2 py-0.5 rounded">CONVERSION: 3.4% (+183%)</span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center py-6 relative z-10">
            <div className="w-56 h-56 bg-zinc-900/60 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center p-6 text-center shadow-[0_12px_40px_rgba(249,115,22,0.15)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent" />
              <span className="text-6xl drop-shadow-[0_10px_20px_rgba(249,115,22,0.3)] animate-[bounce-slow_4s_ease-in-out_infinite]">✨🧴✨</span>
              <p className="text-[12px] text-orange-400 font-extrabold mt-4 uppercase tracking-widest">3D HYPER-RENDERED PACKAGING</p>
              <p className="text-[9px] text-zinc-400 font-light mt-1">Stunning studio lighting, water droplet textures, and photorealistic ambient occlusion.</p>
            </div>
            <div className="mt-4 max-w-sm text-center">
              <p className="text-[14px] text-white font-black uppercase tracking-tight">KOREAN BAMBOO GLOW EXTRACT</p>
              <div className="flex justify-center gap-4 mt-2">
                <span className="text-[9px] font-mono text-orange-300 uppercase tracking-widest border-r border-zinc-800 pr-4">💧 98% Hydration</span>
                <span className="text-[9px] font-mono text-orange-300 uppercase tracking-widest">🧬 Peptide Infused</span>
              </div>
            </div>
          </div>

          <div className="text-[9px] text-zinc-400 uppercase font-mono tracking-widest text-center flex items-center justify-center gap-2 relative z-10">
            <Award size={10} className="text-orange-400" /> Benefit-driven layout with custom iconography
          </div>
        </div>

        {/* SLIDER HANDLE */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-50 flex items-center justify-center"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-zinc-200">
            <Eye size={12} className="animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
