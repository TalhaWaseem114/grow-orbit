"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const portfolioItems = [
  {
    src: "https://images.pexels.com/photos/34787357/pexels-photo-34787357.jpeg",
    category: "Listing Images",
    title: "Supplements",
    badgeValue: "+52%",
    badgeLabel: "CTR LIFT",
    context: "after A/B testing hero images",
    tags: ["CTR OPT.", "A+ CONTENT"],
    materials: ["Recyclable Plastic"]
  },
  {
    src: "https://images.pexels.com/photos/35709465/pexels-photo-35709465.jpeg",
    category: "A+ Content",
    title: "Outdoor Gear",
    badgeValue: "+38%",
    badgeLabel: "REVENUE LIFT",
    context: "after redesigning buying decision",
    tags: ["FULL MGMT", "LAUNCH"],
    materials: ["Stainless Steel", "Nylon Fiber"]
  },
  {
    src: "https://images.pexels.com/photos/35846663/pexels-photo-35846663.jpeg",
    category: "Brand Story",
    title: "Pet Products",
    badgeValue: "+44%",
    badgeLabel: "CVR BOOST",
    context: "after clarifying product utility",
    tags: ["BRAND STORY", "PPC"],
    materials: ["Borosilicate Glass", "Organic Wood"]
  },

  {
    src: "https://images.pexels.com/photos/36004284/pexels-photo-36004284.jpeg",
    category: "A+ Content",
    title: "Beauty & Skin",
    badgeValue: "+61%",
    badgeLabel: "CTR IN 21 DAYS",
    context: "after market gap analysis",
    tags: ["MAIN IMAGE", "SEO"],
    materials: ["Frosted Glass", "PP Plastic"]
  },
   {
    src: "https://images.pexels.com/photos/35920053/pexels-photo-35920053.jpeg",
    category: "Listing Images",
    title: "Home & Kitchen",
    badgeValue: "+35%",
    badgeLabel: "SALES LIFT",
    context: "after premium lifestyle integration",
    tags: ["BRAND STORE", "IMAGES"],
    materials: ["Acacia Wood", "Brushed Steel"]
  },
  {
    src: "https://images.pexels.com/photos/35577122/pexels-photo-35577122.jpeg",
    category: "Brand Story",
    title: "Food & Beverage",
    badgeValue: "+29%",
    badgeLabel: "ORGANIC RANK",
    context: "after SEO-driven copy rewrite",
    tags: ["LISTING OPT.", "A+"],
    materials: ["Amber Glass", "Eco Cardboard"]
  },
];

const categories = ["All", "Listing Images", "A+ Content", "Brand Story"];
const materialsList = ["All Materials", "Plastic", "Steel", "Glass", "Wood", "Cardboard"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeMaterial, setActiveMaterial] = useState("All Materials");
  const [isStuck, setIsStuck] = useState(false);
  const montserrat = { fontFamily: "'Montserrat', sans-serif" };

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("portfolio-section");
      if (section) {
        // top-24 is 96px. If the section bounds indicate the sticky element has reached top: 96, it's stuck.
        // We use a slight offset to trigger the background gracefully.
        const rect = section.getBoundingClientRect();
        if (rect.top <= 10) {
          setIsStuck(true);
        } else {
          setIsStuck(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredItems = portfolioItems.filter(item => {
    const matchCategory = activeCategory === "All" || item.category === activeCategory;
    const matchMaterial = activeMaterial === "All Materials" || item.materials.some(mat => mat.toLowerCase().includes(activeMaterial.toLowerCase()));
    return matchCategory && matchMaterial;
  });

  return (
    <section id="portfolio-section" className="bg-[#F6F6F6] py-32 px-10" style={montserrat}>
      <div className="max-w-[1400px] mx-auto">

        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-black/5 pb-10">
          <div className="max-w-xl">
            <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-xs">Featured Work</span>
            <h2 className="text-[48px] font-montserrat font-black leading-[1] tracking-tighter text-zinc-950 uppercase mt-4">
              Revenue <span className="italic font-light text-zinc-400 normal-case" style={{ fontFamily: "'Playfair Display', serif" }}>Systems</span>
            </h2>
          </div>
          <p className="text-gray-500 text-xl font-light max-w-sm mt-8 md:mt-0 leading-relaxed">
            <strong className="text-zinc-900 font-bold">Not designs. Not campaigns.</strong><br/>
            These are revenue systems we built that drive real-world Amazon conversions.
          </p>
        </div>

        {/* Sticky Filter Hub */}
        <div className="sticky top-[4.5rem] z-40 mb-16 flex flex-col items-center relative">
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 p-2 sm:p-2.5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex flex-col items-center transition-all duration-500">

            {/* Main Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-black outline-none ${
                    activeCategory === cat
                      ? "bg-black text-white shadow-lg"
                      : "text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Secondary Material Filter (Expands seamlessly inside the pill when sticky) */}
            <div className={`flex flex-wrap items-center justify-center gap-1.5 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden ${
              isStuck
                ? "max-h-20 opacity-100 mt-2"
                : "max-h-0 opacity-0 mt-0"
            }`}>
              {materialsList.map((mat) => (
                <button
                  key={mat}
                  onClick={() => setActiveMaterial(mat)}
                  aria-pressed={activeMaterial === mat}
                  className={`px-3 py-1 rounded-full text-[7.5px] font-bold uppercase tracking-widest transition-all duration-300 border focus-visible:ring-2 focus-visible:ring-orange-500/50 outline-none ${
                    activeMaterial === mat
                      ? "bg-white text-orange-500 border-orange-100 shadow-[0_4px_10px_rgba(249,115,22,0.1)]"
                      : "bg-transparent text-zinc-400 border-transparent hover:border-zinc-200 hover:text-zinc-600 hover:bg-white/50"
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Masonry Grid with New Card Alignment and Staggered Middle Column */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[600px] transition-all duration-500">

          {/* Helper to render a single card */}
          {(() => {
            const renderCard = (item, index) => {
              const isDark = item.category === "A+ Content";
              return (
                <div
                  key={`${item.title}-${index}`}
                  className="w-full animate-in fade-in zoom-in-95 duration-700"
                >
                  <div className={`group relative rounded-[32px] overflow-hidden flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 ${isDark ? 'bg-[#121212] text-white' : 'bg-white text-zinc-950 border border-zinc-100'}`}>

                    {/* Top Image Area */}
                    <div className="relative w-full overflow-hidden bg-zinc-100 aspect-[4/5] sm:aspect-auto">
                      <Image
                        src={item.src}
                        alt={`Portfolio showcase for ${item.title} - ${item.category}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-in-out sm:max-h-[500px]"
                        placeholder={typeof item.src === 'string' && item.src.includes('cloudinary.com/') ? "blur" : "empty"}
                        blurDataURL={typeof item.src === 'string' && item.src.includes('cloudinary.com/') ? item.src.replace('/upload/', '/upload/w_100,e_blur:1000,q_1,f_auto/') : undefined}
                      />

                      {/* Materials Badges (Top Right) */}
                      <div className="absolute top-5 right-5 flex flex-col gap-1.5 items-end z-10">
                        {item.materials.map((mat, i) => (
                          <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg px-2.5 py-1 text-[7.5px] font-bold uppercase tracking-widest shadow-sm">
                            {mat}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Panel */}
                    <div className={`p-6 flex flex-col gap-3 ${isDark ? 'bg-[#121212]' : 'bg-white'}`}>
                      <h4 className="font-montserrat font-black text-[13px] uppercase tracking-tight">
                        {item.title}
                      </h4>
                      <p className={`text-[12px] font-medium leading-relaxed mb-1 ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        <strong className={isDark ? "text-orange-400 font-bold" : "text-orange-600 font-bold"}>{item.badgeValue} {item.badgeLabel}</strong> {item.context}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, i) => (
                          <span key={i} className={`text-[8.5px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-lg border ${isDark ? 'border-white/10 text-zinc-400' : 'border-zinc-200 text-zinc-400'}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            };

            // Divide items into 3 columns
            const col1 = filteredItems.filter((_, i) => i % 3 === 0);
            const col2 = filteredItems.filter((_, i) => i % 3 === 1);
            const col3 = filteredItems.filter((_, i) => i % 3 === 2);

            return (
              <>
                <div className="flex flex-col gap-8">
                  {col1.map((item, i) => renderCard(item, i))}
                </div>
                <div className="flex flex-col gap-8 md:mt-16">
                  {col2.map((item, i) => renderCard(item, i))}
                </div>
                <div className="flex flex-col gap-8 md:-mt-4">
                  {col3.map((item, i) => renderCard(item, i))}
                </div>
              </>
            );
          })()}
        </div>

        {/* FIXED CTA BUTTON: Aligned and Corrected Arrow */}
        <div className="flex justify-center mt-20">
          <Link
            href="/portfolio"
            style={montserrat}
            className="group flex items-center gap-5 px-10 py-5 rounded-full bg-black text-white hover:bg-orange-500 transition-all duration-500 shadow-xl shadow-black/5 focus-visible:ring-4 focus-visible:ring-black/20 outline-none"
          >
            <span className="uppercase tracking-[0.2em] text-[11px] font-black">Explore All Work</span>
            {/* The wrapper is now a perfect square flexbox to prevent arrow tilting */}
            <div className="w-6 h-6 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
              <span className="text-2xl leading-none flex items-center">→</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
