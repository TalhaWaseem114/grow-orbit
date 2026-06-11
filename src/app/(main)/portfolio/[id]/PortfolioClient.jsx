"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Clock,
  Target, TrendingUp, Award, Star, ChevronRight,
  Layers, Camera, BookOpen, Store, Search, Sparkles,
  ExternalLink, BarChart3, Zap, CheckCircle2, XCircle,
  MousePointerClick,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_ITEMS, SERVICE_INFO } from "@/data/portfolioData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICE_ICONS = {
  "Listing Images":  Camera,
  "A+ Content":      Layers,
  "Brand Story":     BookOpen,
  "Brand Store":     Store,
  "Main Image CTR":  Search,
};

const SERVICE_GRADIENTS = {
  "Listing Images":  "from-orange-500 to-amber-400",
  "A+ Content":      "from-violet-500 to-purple-400",
  "Brand Story":     "from-rose-500 to-pink-400",
  "Brand Store":     "from-teal-500 to-emerald-400",
  "Main Image CTR":  "from-blue-500 to-cyan-400",
};

/* ─── LIGHTBOX ─── */
function Lightbox({ image, onClose }) {
  useLayoutEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[200] bg-black/96 backdrop-blur-xl flex items-center justify-center p-6" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
        <XCircle size={18} />
      </button>
      <img src={image.src} alt={image.label} className="max-w-full max-h-[88vh] object-contain rounded-2xl" onClick={e => e.stopPropagation()} />
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-[10px] font-mono uppercase tracking-widest">{image.label}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════
   SERVICE-SPECIFIC AMAZON-STYLE LAYOUTS
   ══════════════════════════════════════════════ */

/* 1 — LISTING IMAGES: 2 images in a row */
function ListingImagesDisplay({ details, onImageOpen }) {
  const imgs = details.images;
  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="bg-orange-500 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Listing Image Deliverables</div>
        <span className="text-zinc-400 text-[10px] font-mono">{imgs.length} images produced</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {imgs.map((img, i) => (
          <div key={i} className="group relative cursor-pointer rounded-[16px] overflow-hidden border border-zinc-100 bg-white" onClick={() => onImageOpen(img)}>
            <img src={img.src} alt={img.label} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" style={{ aspectRatio: "1/1" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* 2 — A+ CONTENT: full-width stacked modules */
function APlusDisplay({ details, onImageOpen }) {
  const imgs = details.images;
  return (
    <div className="rounded-[24px] overflow-hidden border border-zinc-200 bg-white">
      {/* Fake browser bar */}
      <div className="bg-zinc-50 border-b border-zinc-200 px-5 py-3 flex items-center gap-3">
        <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-zinc-300" /><div className="w-2.5 h-2.5 rounded-full bg-zinc-300" /><div className="w-2.5 h-2.5 rounded-full bg-zinc-300" /></div>
        <div className="flex-1 bg-white rounded-lg px-4 py-1.5 border border-zinc-200 flex items-center gap-2">
          <Search size={10} className="text-zinc-400" />
          <span className="text-[10px] font-mono text-zinc-400">amazon.com › dp · A+ Content section</span>
        </div>
        <span className="text-[8px] font-black text-violet-500 uppercase tracking-widest bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full">A+ Preview</span>
      </div>
      <div className="flex flex-col w-full">
        {imgs.map((img, i) => (
          <div key={i} className="w-full cursor-pointer group relative overflow-hidden" onClick={() => onImageOpen(img)}>
            <img src={img.src} alt={img.label} className="w-full h-auto block" />
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink size={9} /> Expand
            </div>
          </div>
        ))}
      </div>
      <div className="bg-violet-50 border-t border-violet-100 px-5 py-3 flex items-center gap-3">
        <Layers size={14} className="text-violet-500 shrink-0" />
        <p className="text-[10px] text-violet-700 font-light"><span className="font-bold">A+ Content</span> appears below bullet points on every Amazon PDP — exclusive to Brand Registry sellers.</p>
      </div>
    </div>
  );
}

/* 3 — BRAND STORY: cinematic horizontal scroll strip */
function BrandStoryDisplay({ details, onImageOpen }) {
  const imgs = details.images;
  const brandName = details.description?.split(" ")[0] || "The Brand";
  const scrollRef = useRef(null);

  return (
    <div className="rounded-[24px] overflow-hidden border border-zinc-200 bg-white shadow-lg">
      <div className="bg-zinc-50 border-b border-zinc-200 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-zinc-300" /><div className="w-2.5 h-2.5 rounded-full bg-zinc-300" /><div className="w-2.5 h-2.5 rounded-full bg-zinc-300" /></div>
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-tight">amazon.com › dp › brand-story-carousel</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[8px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full">Authentic Amazon Module</span>
        </div>
      </div>

      <div className="border-b border-zinc-100 px-5 py-2 bg-white flex items-center gap-2 text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" /> Standard A+ Slot · Carousel Foundation
      </div>

      {/* Cinematic Amazon Carousel Background */}
      <div className="relative bg-zinc-900 overflow-hidden" style={{ minHeight: "380px" }}>
        {imgs[0] && (
          <div className="absolute inset-0">
            <img src={imgs[0].src} alt="" className="w-full h-full object-cover scale-110 blur-md opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-zinc-950" />
          </div>
        )}

        <div className="relative z-10 p-5 sm:p-10 lg:p-14">
          {/* Scroll Track */}
          <div
            ref={scrollRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-6 pl-2 sm:pl-4 snap-x snap-mandatory"
          >
            {/* Card 1: Logo & About (Standard Amazon Square) */}
            <div className="shrink-0 w-[260px] sm:w-[315px] h-[260px] sm:h-[315px] bg-white rounded-xl shadow-2xl relative overflow-hidden group cursor-pointer" onClick={() => onImageOpen(imgs[0])}>
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                <img src={imgs[0]?.src} className="w-full h-full object-cover" />
              </div>
              <div className="relative h-full p-8 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-full bg-orange-500 shadow-xl flex items-center justify-center mb-6">
                    <span className="text-white font-black text-xl">{brandName[0]}</span>
                  </div>
                  <h4 className="text-zinc-900 font-black text-lg uppercase tracking-tight mb-2">About The Brand</h4>
                  <p className="text-zinc-500 text-xs font-light leading-relaxed mb-4">{details.description?.slice(0, 160) || "A category-defining brand built on trust and customer obsession."}</p>
                </div>
                <div className="flex items-center gap-2 pt-4 border-t border-zinc-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Amazon Brand Registered</span>
                </div>
              </div>
            </div>

            {/* Card 2: Media Asset (Standard Amazon Tall Rectangle) */}
            {imgs[1] && (
              <div className="shrink-0 w-[280px] sm:w-[360px] h-[360px] sm:h-[450px] bg-zinc-800 rounded-xl shadow-2xl overflow-hidden relative group cursor-pointer" onClick={() => onImageOpen(imgs[1])}>
                <img src={imgs[1].src} alt={imgs[1].label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white text-[10px] font-bold uppercase tracking-widest mb-3">Our Standards</span>
                  <p className="text-white font-black text-sm uppercase tracking-tight leading-tight">{imgs[1].label || "The Craftsmanship"}</p>
                </div>
              </div>
            )}

            {/* Card 3: Media Asset 2 */}
            {imgs[2] && (
              <div className="shrink-0 w-[280px] sm:w-[360px] h-[360px] sm:h-[450px] bg-zinc-800 rounded-xl shadow-2xl overflow-hidden relative group cursor-pointer" onClick={() => onImageOpen(imgs[2])}>
                <img src={imgs[2].src} alt={imgs[2].label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white text-[10px] font-bold uppercase tracking-widest mb-3">Innovation</span>
                  <p className="text-white font-black text-sm uppercase tracking-tight leading-tight">{imgs[2].label || "Built For Performance"}</p>
                </div>
              </div>
            )}

            {/* Card 4: Q&A / Mission Module (Image background + Text overlay) */}
            <div className="shrink-0 w-[280px] sm:w-[360px] h-[360px] sm:h-[450px] bg-zinc-900 rounded-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 opacity-40">
                <img src={imgs[imgs.length - 1]?.src} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-zinc-950/60" />
              </div>
              <div className="relative p-8 h-full flex flex-col justify-between">
                <div>
                  <Star size={24} className="text-orange-400 mb-6" />
                  <h4 className="text-white font-black text-xl uppercase tracking-tighter mb-4 leading-tight">What makes our products unique?</h4>
                  <p className="text-zinc-300 text-sm font-light leading-relaxed italic">"Quality is not an department. It is the baseline standard for every choice we make."</p>
                </div>
                <div className="space-y-3">
                  {["Ethically Sourced", "Community Focused", "Obsessively Tested"].map((val, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      </div>
                      <span className="text-white font-bold text-[10px] uppercase tracking-widest">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          <div className="flex items-center gap-4 mt-8 px-4">
            <div className="flex gap-1.5">
              {[...Array(4)].map((_, i) => <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-orange-500" : "bg-white/20"}`} />)}
            </div>
            <span className="text-zinc-600 text-[9px] font-mono uppercase tracking-[0.2em] flex items-center gap-2">
              <div className="w-8 h-px bg-zinc-800" /> Scroll to explore the brand mission
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-100 px-5 py-2 bg-white text-[9px] font-mono text-zinc-400 uppercase tracking-widest text-center">
        Generic A+ modules continue below ↓
      </div>
      <div className="bg-rose-50 border-t border-rose-100 px-5 py-3 flex items-center gap-3">
        <Sparkles size={14} className="text-rose-500 shrink-0" />
        <p className="text-[10px] text-rose-700 font-light"><span className="font-bold">Amazon Brand Story</span> is a mandatory carousel unit for Brand Registered sellers, appearing as the primary narrative strip on all listings.</p>
      </div>
    </div>
  );
}

/* 4 — BRAND STORE: Amazon storefront mini-UI with navigation */
function BrandStoreDisplay({ details, onImageOpen }) {
  const [activeStoreTab, setActiveStoreTab] = useState("Home");
  const imgs = details.images;
  const storeTabs = ["Home", "All Products", "Collections", "About"];
  return (
    <div className="rounded-[24px] overflow-hidden border border-zinc-200 bg-white">
      {/* Amazon dark nav bar */}
      <div className="bg-[#232F3E] px-5 py-3 flex items-center gap-3">
        <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-zinc-600" /><div className="w-2.5 h-2.5 rounded-full bg-zinc-600" /><div className="w-2.5 h-2.5 rounded-full bg-zinc-600" /></div>
        <div className="flex-1 bg-white/10 rounded-md px-4 py-1.5 flex items-center gap-2">
          <Search size={10} className="text-zinc-400" />
          <span className="text-[10px] font-mono text-zinc-400">amazon.com › stores › BrandName</span>
        </div>
        <span className="text-[8px] font-black text-teal-300 uppercase tracking-widest bg-teal-900/50 border border-teal-700 px-2 py-0.5 rounded-full">Store Preview</span>
      </div>

      {/* Store header */}
      <div className="bg-zinc-900 px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center"><span className="text-white font-black text-sm">G</span></div>
            <div><p className="text-white font-black text-sm uppercase tracking-tight">Brand Store</p><p className="text-zinc-500 text-[9px] font-mono uppercase">Official Amazon Store</p></div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full cursor-pointer">Follow ★</div>
        </div>
        {/* Store nav tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {storeTabs.map(tab => (
            <button key={tab} onClick={() => setActiveStoreTab(tab)}
              className={`shrink-0 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all rounded-t-md
                ${activeStoreTab === tab ? "bg-white text-zinc-900" : "text-zinc-400 hover:text-white"}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Store content */}
      <div className="bg-[#fafafa]">
        {activeStoreTab === "Home" && (
          <div>
            <div className="relative cursor-pointer group overflow-hidden" onClick={() => imgs[0] && onImageOpen(imgs[0])}>
              {imgs[0]
                ? <img src={imgs[0].src} alt="Store Hero" className="w-full object-cover group-hover:scale-[1.02] transition-transform duration-700" style={{ height: "220px" }} />
                : <div className="bg-zinc-200 flex items-center justify-center" style={{ height: "220px" }}><Store size={32} className="text-zinc-400" /></div>}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div><h3 className="text-white font-black text-2xl uppercase tracking-tight mb-1">Our Catalog</h3><p className="text-zinc-300 text-sm font-light">Discover our full range of products</p></div>
              </div>
            </div>
            <div className="p-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
               {imgs.slice(0, 3).map((img, i) => (
                 <div key={i} className="group cursor-pointer bg-white rounded-xl border border-zinc-200 overflow-hidden hover:shadow-md transition-all flex flex-col" onClick={() => onImageOpen(img)}>
                   <div className="w-full bg-white relative" style={{ aspectRatio: "1/1" }}>
                     <img src={img.src} alt={img.label} className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                   </div>
                   <div className="p-2.5 bg-white border-t border-zinc-100"><p className="text-[9px] font-bold uppercase tracking-wide text-zinc-700 truncate">{img.label}</p><p className="text-orange-500 text-[8px] font-black mt-0.5">View Product →</p></div>
                 </div>
               ))}
            </div>
          </div>
        )}
        {activeStoreTab !== "Home" && (
          <div className="p-10 text-center text-zinc-400">
            <Store size={32} className="mx-auto mb-3 text-zinc-300" />
            <p className="text-sm font-light">"{activeStoreTab}" page is configured in the full Brand Store build for this client.</p>
          </div>
        )}
      </div>

      <div className="bg-teal-50 border-t border-teal-100 px-5 py-3 flex items-center gap-3">
        <Store size={14} className="text-teal-600 shrink-0" />
        <p className="text-[10px] text-teal-700 font-light"><span className="font-bold">Brand Store</span> is a full branded microsite within Amazon — accessible from listings and all Sponsored Brand ad placements.</p>
      </div>
    </div>
  );
}

/* 5 — MAIN IMAGE CTR: Before/After with search result UI */
function MainImageCTRDisplay({ details, onImageOpen }) {
  const imgs = details.images;
  const after  = imgs[0];
  const before = imgs[imgs.length - 1];
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-blue-500 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full">CTR Optimisation · Before vs After</div>
      </div>
      {/* Simulated Amazon search results page */}
      <div className="rounded-[20px] border border-zinc-200 bg-white overflow-hidden mb-6">
        <div className="bg-zinc-50 border-b border-zinc-200 px-5 py-3 flex items-center gap-3">
          <div className="flex-1 bg-white rounded-lg px-4 py-1.5 border border-zinc-200 flex items-center gap-2">
            <Search size={10} className="text-zinc-400" />
            <span className="text-[10px] font-mono text-zinc-500">amazon.com › search · results · thumbnail comparison</span>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-zinc-200">
          {/* BEFORE */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3"><div className="w-2 h-2 rounded-full bg-red-400" /><span className="text-[9px] font-black uppercase tracking-widest text-red-500">Before · Original</span></div>
            <div className="relative bg-white rounded-xl overflow-hidden cursor-pointer group border-2 border-red-200 mb-3 aspect-square" style={{ aspectRatio: "1/1" }} onClick={() => before && onImageOpen(before)}>
              {before
                ? <img src={before.src} alt="Original" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                : <div className="flex items-center justify-center w-full h-full bg-zinc-200"><Camera size={24} className="text-zinc-400" /></div>}
              <div className="absolute inset-0 bg-red-500/10 pointer-events-none" />
            </div>
            <div className="bg-red-50 rounded-xl p-3 border border-red-100">
              <p className="text-[8px] font-mono text-red-400 uppercase tracking-widest mb-1">Search CTR</p>
              <div className="flex items-end gap-2"><span className="text-xl font-black text-red-500">3.2%</span><span className="text-red-400 text-[10px] font-bold mb-0.5">↓ Below avg</span></div>
              <div className="mt-2 h-1.5 bg-red-100 rounded-full overflow-hidden"><div className="h-full bg-red-400 rounded-full" style={{ width: "32%" }} /></div>
            </div>
          </div>
          {/* AFTER */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3"><div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /><span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">After · Optimised</span></div>
            <div className="relative bg-white rounded-xl overflow-hidden cursor-pointer group border-2 border-orange-400 mb-3 aspect-square" style={{ aspectRatio: "1/1" }} onClick={() => after && onImageOpen(after)}>
              {after
                ? <img src={after.src} alt="Optimised" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                : <div className="flex items-center justify-center w-full h-full bg-zinc-200"><Camera size={24} className="text-zinc-400" /></div>}
              <div className="absolute top-2 right-2 bg-orange-500 text-white text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full pointer-events-none">Winner</div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
              <p className="text-[8px] font-mono text-emerald-500 uppercase tracking-widest mb-1">Search CTR</p>
              <div className="flex items-end gap-2"><span className="text-xl font-black text-emerald-600">5.8%</span><span className="text-emerald-500 text-[10px] font-bold mb-0.5">↑ +81% lift</span></div>
              <div className="mt-2 h-1.5 bg-emerald-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-400 rounded-full" style={{ width: "58%" }} /></div>
            </div>
          </div>
        </div>
      </div>
      {/* All variants */}
      {imgs.length > 1 && (
        <div>
          <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest mb-3">All Variants Tested</p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {imgs.map((img, i) => (
              <div key={i} className="shrink-0 group cursor-pointer" onClick={() => onImageOpen(img)}>
                <div className={`w-20 h-20 bg-white rounded-xl overflow-hidden border-2 mb-1.5 ${i === 0 ? "border-orange-500" : "border-zinc-200"}`}>
                  <img src={img.src} alt={img.label} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                </div>
                <p className="text-[7px] font-mono text-center text-zinc-400 uppercase w-20 truncate">{i === 0 ? "Winner" : `V${i + 1}`}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-4 bg-blue-50 rounded-xl p-3.5 border border-blue-100 flex items-start gap-3">
        <MousePointerClick size={14} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-[10px] text-blue-700 font-light leading-relaxed"><span className="font-bold">Main Image CTR</span> is the highest-leverage single change on any listing — every optimisation depends on winning the click first.</p>
      </div>
    </div>
  );
}

/* ── ROUTER: picks the right layout per service ── */
function ServiceDisplay({ svc, details, onImageOpen }) {
  switch (svc) {
    case "Listing Images":  return <ListingImagesDisplay  details={details} onImageOpen={onImageOpen} />;
    case "A+ Content":      return <APlusDisplay          details={details} onImageOpen={onImageOpen} />;
    case "Brand Story":     return <BrandStoryDisplay     details={details} onImageOpen={onImageOpen} />;
    case "Brand Store":     return <BrandStoreDisplay     details={details} onImageOpen={onImageOpen} />;
    case "Main Image CTR":  return <MainImageCTRDisplay   details={details} onImageOpen={onImageOpen} />;
    default:
      return (
        <div className="grid grid-cols-2 gap-4">
          {details.images.map((img, i) => (
            <div key={i} className="group relative cursor-pointer rounded-[16px] overflow-hidden border border-zinc-100 bg-white" onClick={() => onImageOpen(img)}>
              <img src={img.src} alt={img.label} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" style={{ aspectRatio: "1/1" }} />
            </div>
          ))}
        </div>
      );
  }
}

/* ══════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════ */


export default function PortfolioDetailPage() {
  const { id } = useParams();
  const item = PORTFOLIO_ITEMS.find(p => p.id === id);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [activeGalleryImg, setActiveGalleryImg] = useState(null);
  const heroRef    = useRef(null);
  const contentRef = useRef(null);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-zinc-900 pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase mb-4">Project Not Found</h1>
          <p className="text-zinc-500 mb-8">The portfolio project you are looking for does not exist or has been removed.</p>
          <Link href="/portfolio" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-orange-500 text-white font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors">
            Return to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  // NORMALIZE SERVICE DATA: If serviceDetails is missing, synthesize from gallery
  const normalizedServices = (item.services || [])
    .filter(svc => svc !== "Brand Story" && svc !== "Brand Store")
    .map(svc => {
    const details = item.serviceDetails?.[svc] || {
      description: svc === "Listing Images" ? item.solution : item.challenge,
      images: item.gallery || []
    };
    return { name: svc, details };
  });

  const heroGallery = item?.serviceDetails?.["Listing Images"]?.images?.length
    ? item.serviceDetails["Listing Images"].images
    : (item?.gallery || []);

  useLayoutEffect(() => {
    if (heroGallery.length) setActiveGalleryImg(heroGallery[0]);
  }, [item]);

  useLayoutEffect(() => {
    if (!item || !heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".pdp-in",     { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.09, ease: "expo.out", delay: 0.1 });
      gsap.fromTo(".pdp-scroll", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 88%" }
      });
    }, heroRef);
    return () => ctx.revert();
  }, [item]);

  if (!item) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center gap-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        <div className="w-20 h-20 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500"><Search size={32} /></div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-zinc-900">Project Not Found</h1>
        <Link href="/portfolio" className="flex items-center gap-2 bg-zinc-900 text-white font-bold text-[10px] uppercase tracking-widest px-8 py-3.5 rounded-2xl no-underline hover:bg-orange-500 transition-all">
          <ArrowLeft size={14} /> Back to Portfolio
        </Link>
      </div>
    );
  }

  const related = [...PORTFOLIO_ITEMS]
    .filter(p => p.id !== item.id)
    .sort((a, b) => {
      // 1. Same exact primary category gets highest priority
      if (a.category === item.category && b.category !== item.category) return -1;
      if (b.category === item.category && a.category !== item.category) return 1;
      // 2. Otherwise prioritize overlapping services
      const aOverlap = a.services?.filter(s => item.services?.includes(s)).length || 0;
      const bOverlap = b.services?.filter(s => item.services?.includes(s)).length || 0;
      return bOverlap - aOverlap;
    })
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white" style={{ fontFamily: "'Montserrat', sans-serif" }} ref={heroRef}>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {lightboxImage && <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />}

      {/* BREADCRUMB */}
      <div className="bg-white border-b border-zinc-100 pt-24 pb-4">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
            <Link href="/portfolio" className="hover:text-orange-500 transition-colors flex items-center gap-1.5 no-underline"><ArrowLeft size={12} /> Portfolio</Link>
            <span>/</span><span className="text-zinc-500">{item.category}</span><span>/</span>
            <span className="text-zinc-900 font-bold">{item.brandName}</span>
          </div>
        </div>
      </div>

      {/* HERO — gallery left, buy-box right */}
      <section className="bg-white border-b border-zinc-100 py-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* LEFT: gallery */}
            <div className="lg:col-span-6 pdp-in relative">
              <div className="sticky top-[100px]">
              <div
                className="relative rounded-[24px] overflow-hidden bg-white border border-zinc-100 mb-4 cursor-pointer group aspect-square flex items-center justify-center"
                style={{ aspectRatio: "1/1", maxHeight: "600px" }}
                onClick={() => setLightboxImage(activeGalleryImg || heroGallery[0])}
              >
                <img
                  src={activeGalleryImg?.src || item.src}
                  alt={activeGalleryImg?.label || item.brandName}
                  className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"><ExternalLink size={10} /> Expand</div>
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="bg-orange-500 text-white rounded-xl px-3 py-1.5 flex flex-col items-center min-w-[60px] shadow-lg">
                    <span className="font-black text-[12px] leading-none">{item.badge.value}</span>
                    <span className="font-bold text-[6px] uppercase tracking-wider mt-[2px] opacity-90">{item.badge.label}</span>
                  </div>
                  <span className="bg-black/40 backdrop-blur-sm text-white text-[8px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-xl border border-white/10">{item.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
                {heroGallery.map((img, i) => (
                  <button key={i} onClick={() => setActiveGalleryImg(img)}
                    className={`shrink-0 relative rounded-[12px] overflow-hidden border-2 transition-all duration-300 bg-white
                      ${(activeGalleryImg?.src || heroGallery[0]?.src) === img.src ? "border-orange-500 shadow-[0_0_0_2px_rgba(249,115,22,0.2)]" : "border-zinc-200 hover:border-zinc-400"}`}>
                    <img src={img.src} alt={img.label} className="object-contain w-16 h-12 sm:w-20 sm:h-14" />
                    {(activeGalleryImg?.src || heroGallery[0]?.src) === img.src && <div className="absolute inset-0 bg-orange-500/10 pointer-events-none" />}
                  </button>
                ))}
              </div>
              </div>
            </div>

            {/* RIGHT: info panel */}
            <div className="lg:col-span-6 pdp-in">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-5 h-[2px] bg-orange-500" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.4em] text-orange-500/80">{item.category}</span>
                {item.services?.length > 1 && <span className="bg-orange-50 text-orange-500 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-orange-100">{item.services.length} Services</span>}
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tighter uppercase leading-[0.88] mb-2 text-zinc-900">{item.brandName}</h1>
              <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest mb-4 sm:mb-6">{item.niche}</p>

              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-zinc-100">
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-orange-500 fill-orange-500" />)}</div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Verified Client Project</span>
              </div>

              <div className="bg-[#fafafa] rounded-2xl p-4 sm:p-5 border border-zinc-100 mb-5">
                <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest mb-1">Primary Outcome</p>
                <span className="text-3xl sm:text-4xl font-black text-orange-500 tracking-tighter">{item.outcome}</span>
                <div className="flex items-center gap-2 mt-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /><span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Delivered in {item.timeline}</span></div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6">
                {item.metrics.map((m, i) => (
                  <div key={i} className="bg-white rounded-2xl p-3 sm:p-4 border border-zinc-100 hover:border-orange-500/20 transition-colors group">
                    <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest mb-1">{m.label}</p>
                    <span className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tighter group-hover:text-orange-500 transition-colors">{m.value}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest mb-3">Services Delivered</p>
                <div className="flex flex-wrap gap-2">
                  {item.services?.map((svc, i) => {
                    const Icon = SERVICE_ICONS[svc] || Sparkles;
                    const gradient = SERVICE_GRADIENTS[svc] || "from-orange-500 to-amber-400";
                    return (
                      <div key={i} className={`flex items-center gap-2 bg-gradient-to-r ${gradient} text-white px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest`}>
                        <Icon size={11} />{svc}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag, i) => <span key={i} className="text-[8px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-lg border border-zinc-200 text-zinc-400">{tag}</span>)}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="flex-1 flex items-center justify-center gap-3 bg-orange-500 hover:bg-zinc-900 text-white font-black text-[10px] sm:text-[11px] uppercase tracking-widest py-4 rounded-2xl no-underline transition-all duration-300 shadow-[0_8px_30px_rgba(249,115,22,0.3)]">
                  Get Similar Results <ArrowRight size={14} />
                </Link>
                <Link href="/portfolio" className="flex-1 flex items-center justify-center gap-3 bg-white hover:bg-[#fafafa] text-zinc-700 font-bold text-[10px] sm:text-[11px] uppercase tracking-widest py-4 rounded-2xl no-underline transition-all duration-300 border border-zinc-200">
                  View All Work
                </Link>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                {["Free audit included", "No long contracts", "Results in 30 days"].map((t, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-400 uppercase tracking-widest"><CheckCircle2 size={11} className="text-emerald-500" />{t}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div ref={contentRef}>

        {/* CHALLENGE + SOLUTION */}
        <section className="py-16 pdp-scroll">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-8"><div className="w-6 h-[2px] bg-orange-500" /><span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">The Story</span></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative bg-white rounded-[28px] p-8 border border-zinc-100 overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-400 to-red-200 rounded-l-[28px]" />
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center"><Target size={18} className="text-red-400" /></div>
                  <div><h3 className="text-[11px] font-black uppercase tracking-wider text-zinc-900">The Challenge</h3><p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Before Grow Orbit</p></div>
                </div>
                <p className="text-zinc-500 text-[15px] font-light leading-relaxed">{item.challenge}</p>
              </div>
              <div className="relative bg-zinc-950 rounded-[28px] p-8 border border-white/[0.06] overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-[60px] pointer-events-none" />
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 to-amber-400 rounded-l-[28px]" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center"><Zap size={18} className="text-orange-500" /></div>
                    <div><h3 className="text-[11px] font-black uppercase tracking-wider text-white">The Solution</h3><p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Grow Orbit Strategy</p></div>
                  </div>
                  <p className="text-zinc-400 text-[15px] font-light leading-relaxed">{item.solution}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICE SECTIONS — each gets its own Amazon-native layout */}
        {normalizedServices.map(({ name: svc, details }, idx) => {
          const Icon     = SERVICE_ICONS[svc] || Sparkles;
          const gradient = SERVICE_GRADIENTS[svc] || "from-orange-500 to-amber-400";
          const bgAlt    = idx % 2 === 0 ? "bg-[#fafafa]" : "bg-white";
          
          return (
            <section key={svc} className={`py-16 ${bgAlt} border-t border-zinc-100 pdp-scroll`}>
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white`}><Icon size={16} /></div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">Service {String(idx + 1).padStart(2, "0")} of {normalizedServices.length}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase text-zinc-900">
                      {svc}<span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal ml-3">· delivered.</span>
                    </h2>
                  </div>
                  <Link href="/service" className="hidden md:inline-flex items-center gap-2 text-zinc-400 hover:text-orange-500 font-bold text-[10px] uppercase tracking-widest transition-colors no-underline">
                    View this service <ChevronRight size={13} />
                  </Link>
                </div>
                <ServiceDisplay svc={svc} details={details} onImageOpen={setLightboxImage} />
              </div>
            </section>
          );
        })}


        {/* RESULTS: MISSION CONTROL */}
        <section className="bg-zinc-950 py-14 sm:py-24 relative overflow-hidden pdp-scroll">
          {/* High-fidelity background */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #fff 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_60%)]" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <div className="flex items-center gap-3 mb-4"><div className="w-10 h-[2px] bg-orange-500" /><span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-400">Project Performance</span></div>
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tighter uppercase text-white leading-none">
                  The numbers <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-600 lowercase tracking-normal">speak.</span>
                </h2>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-4 flex items-center gap-4 sm:gap-5">
                 <div className="flex flex-col"><span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Growth Index</span><span className="text-lg sm:text-xl font-black text-white">+8.4x</span></div>
                 <div className="w-px h-8 bg-white/10" />
                 <div className="flex flex-col"><span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Status</span><span className="text-[9px] sm:text-[10px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">Active Scale</span></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* PRIMARY IMPACT CARD */}
              <div className="md:col-span-12 lg:col-span-5 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 lg:p-10 relative overflow-hidden group hover:border-orange-500/30 transition-all duration-700 shadow-2xl">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-orange-500/20 transition-colors" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-8"><TrendingUp size={18} className="text-orange-400" /><span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">Core Revenue Trajectory</span></div>
                    <p className="text-zinc-500 text-xs font-mono uppercase tracking-[0.3em] mb-4">Baseline → Target</p>
                    <div className="flex items-end gap-3 mb-6 sm:mb-8">
                      <span className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none shadow-orange-500/20 drop-shadow-2xl">{item.outcome}</span>
                      <div className="h-10 w-[2px] bg-orange-500/50 mb-1" />
                    </div>
                    <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-sm mb-10">Systematic scale achieved through brand unification and conversion optimization across all verified ASINs.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-white/[0.08]">
                    <div><p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-2 text-center sm:text-left">Turnaround</p><p className="text-lg sm:text-xl font-black text-white tracking-tight text-center sm:text-left">{item.timeline}</p></div>
                    <div><p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-2 text-center sm:text-left">Project Rank</p><p className="text-lg sm:text-xl font-black text-white tracking-tight text-center sm:text-left">Top 1% <span className="text-[8px] text-zinc-600 font-bold ml-1">Niche Peak</span></p></div>
                  </div>
                </div>
              </div>

              {/* SECONDARY METRICS GRID */}
              <div className="md:col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {item.metrics.map((m, i) => {
                  const icons = [TrendingUp, Award, BarChart3, Star];
                  const Icon = icons[i % icons.length];
                  return (
                    <div key={i} className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-[20px] sm:rounded-[28px] p-5 sm:p-8 flex flex-col justify-between group hover:bg-white/[0.06] transition-all duration-500">
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                           <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-orange-500/20 group-hover:border-orange-500/30 transition-all">
                             <Icon size={18} className="text-zinc-500 group-hover:text-orange-500 transition-colors" />
                           </div>
                           <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-tight">{m.label}</span>
                        </div>
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter block group-hover:text-orange-400 transition-colors">{m.value}</span>
                      </div>
                      <div className="mt-6 flex items-center gap-2">
                        <div className="flex-grow h-1 bg-white/5 rounded-full overflow-hidden truncate">
                          <div className={`h-full bg-gradient-to-r from-orange-600 to-orange-400 w-[${60 + (i * 10)}%] shadow-[0_0_10px_rgba(249,115,22,0.4)] transition-all`} />
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* PERFORMANCE TRAJECTORY SUB-CARD */}
                <div className="sm:col-span-2 bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-xl border border-white/[0.08] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 mt-2 relative overflow-hidden group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
                    <div>
                      <h4 className="text-white font-black text-sm uppercase tracking-tight mb-1">Growth Trajectory</h4>
                      <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Scale Efficiency Index · Live Data</p>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                       <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Post-Optimization</span>
                    </div>
                  </div>

                  <div className="h-28 flex items-end gap-2 relative">
                    {/* Launch Marker Line */}
                    <div className="absolute left-[72%] top-0 bottom-0 w-px bg-orange-500/30 border-r border-dashed border-orange-500/50 z-10 flex items-start justify-center">
                       <div className="bg-orange-500 text-white text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full absolute -top-4 whitespace-nowrap">Orbit Launch</div>
                    </div>

                    {[12, 18, 15, 22, 19, 28, 25, 34, 32, 58, 74, 100].map((h, i) => (
                      <div key={i} className="flex-grow relative group/bar">
                        <div className={`w-full rounded-t-lg transition-all duration-700 delay-[${i * 50}ms]
                          ${i >= 9 ? "bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)]" : i >= 6 ? "bg-zinc-700" : "bg-zinc-800"}`}
                          style={{ height: `${h}%` }} />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-[7px] font-bold text-white opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20">
                          Month {i+1}: {h}%
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 border-t border-white/5 pt-4">
                    <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest">Base Phase</span>
                    <span className="text-[9px] font-mono text-orange-500 uppercase tracking-widest">Scaling Peak</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIAL */}
        {item.testimonial && (
          <section className="py-20 bg-[#fafafa] pdp-scroll">
            <div className="max-w-[900px] mx-auto px-6 lg:px-12 text-center">
              <div className="relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[120px] font-black text-zinc-100 leading-none select-none pointer-events-none" style={{ fontFamily: "'Playfair Display', serif" }}>"</div>
                <div className="relative z-10">
                  <div className="flex gap-1 justify-center mb-8">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-orange-500 fill-orange-500" />)}</div>
                  <blockquote className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-800 leading-relaxed mb-8 sm:mb-10 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>"{item.testimonial.quote}"</blockquote>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-black text-lg shadow-[0_8px_24px_rgba(249,115,22,0.3)]">{item.testimonial.author[0]}</div>
                    <div className="text-left"><p className="text-sm font-black text-zinc-900 uppercase tracking-tight">{item.testimonial.author}</p><p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest mt-0.5">{item.testimonial.role}</p></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* RELATED */}
        <section className="py-16 bg-white border-t border-zinc-100 pdp-scroll">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-4"><div className="w-6 h-[2px] bg-orange-500" /><span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">More Work</span></div>
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase text-zinc-900">Related <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-light text-zinc-300 lowercase tracking-normal">projects.</span></h2>
              <Link href="/portfolio" className="hidden sm:flex items-center gap-2 text-zinc-400 hover:text-zinc-900 font-bold text-[10px] uppercase tracking-widest transition-colors no-underline">View All <ArrowUpRight size={14} /></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(rel => (
                <Link key={rel.id} href={`/portfolio/${rel.id}`} className="group no-underline block">
                  <div className={`rounded-[24px] overflow-hidden border transition-all duration-500 shadow-[0_15px_45px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] hover:-translate-y-1 ${rel.isDark ? "bg-zinc-950 border-white/[0.07]" : "bg-white border-zinc-100"}`}>
                    <div className={`relative overflow-hidden flex items-center justify-center ${rel.category === "Listing Images" ? "aspect-square" : "aspect-video sm:aspect-[4/3]"}`}>
                      <img src={rel.src} alt={rel.brandName} className={`w-full h-full block group-hover:scale-105 transition-transform duration-700 ease-out ${rel.category === "Listing Images" ? "object-contain" : "object-cover"}`} />

                    </div>
                    <div className="p-4"><h4 className="text-orange-500 font-black text-xl uppercase tracking-tighter leading-none mb-1">{rel.outcome}</h4><p className={`text-[10px] font-black uppercase tracking-widest mb-0.5 ${rel.isDark ? "text-zinc-400" : "text-zinc-600"}`}>{rel.brandName}</p><p className={`text-[9px] font-bold uppercase tracking-widest ${rel.isDark ? "text-zinc-600" : "text-zinc-400"}`}>{rel.niche}</p></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <div className="bg-[#fafafa] border-t border-zinc-100 pb-16 pt-0 pdp-scroll">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="rounded-[32px] overflow-hidden border border-zinc-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
              <div className="bg-zinc-950 px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
                <div className="flex items-center gap-4 shrink-0"><span className="text-orange-500 font-black text-3xl tracking-tighter">{item.badge.value}</span><div><p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 leading-tight">{item.badge.label}</p><p className="text-[8px] text-zinc-700 font-mono uppercase tracking-widest mt-1">Delivered for {item.brandName}</p></div></div>
                <div className="w-px h-10 bg-white/[0.06] hidden sm:block shrink-0" />
                <p className="text-zinc-400 text-sm font-light leading-relaxed">Want results like <span className="text-white font-medium">{item.brandName}</span>? We build the same systems for brands in every Amazon niche.</p>
              </div>
              <div className="px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div><p className="font-black text-zinc-900 uppercase tracking-tight text-[15px] mb-1">Ready to add your brand to this list?</p><p className="text-zinc-400 text-sm font-light">Book a free 15-min audit — we'll show you exactly what's holding your listing back.</p></div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
                  <Link href="/portfolio" className="flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-black text-[10px] uppercase tracking-widest px-6 py-4 sm:py-3.5 rounded-2xl no-underline transition-all duration-300 whitespace-nowrap w-full sm:w-auto">More Case Studies <ArrowUpRight size={12} /></Link>
                  <Link href="/contact" className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-zinc-900 text-white font-black text-[10px] uppercase tracking-widest px-6 py-4 sm:py-3.5 rounded-2xl no-underline transition-all duration-300 whitespace-nowrap w-full sm:w-auto shadow-[0_10px_30px_-8px_rgba(249,115,22,0.3)]">Book Free Call <ArrowRight size={13} /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}