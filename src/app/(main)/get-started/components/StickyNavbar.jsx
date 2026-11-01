"use client";

import Image from "next/image";

export default function StickyNavbar({ scrolled, scrollToForm }) {
  return (
    <div className={`hidden lg:block fixed top-0 left-0 right-0 z-100 transition-all duration-500 transform ${scrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-3 flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          {/* Logo - Scroll to top */}
          <button
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
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
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors cursor-pointer outline-none bg-transparent border-none p-0"
            >
              Services
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors cursor-pointer outline-none bg-transparent border-none p-0"
            >
              Case Studies
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('process')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors cursor-pointer outline-none bg-transparent border-none p-0"
            >
              Process
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors cursor-pointer outline-none bg-transparent border-none p-0"
            >
              Portfolio
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors cursor-pointer outline-none bg-transparent border-none p-0"
            >
              FAQ
            </button>
          </nav>

          {/* CTA */}
          <button
            onClick={scrollToForm}
            className="px-6 py-2.5 bg-gradient-to-r from-[#FF5C00] via-[#FF7A00] to-[#FFA726] hover:brightness-110 text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-lg shadow-orange-500/20 active:scale-95 cursor-pointer border-none"
          >
            Book My Meeting
          </button>
        </div>
      </div>
    </div>
  );
}
