"use client";


export default function TeamSection() {
  const team = [
    { name: "Alex Rivera", role: "Strategy", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" },
    { name: "Sarah Chen", role: "Design", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" },
    { name: "Marcus Vane", role: "PPC Specialist", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop" },
    { name: "Elena Ross", role: "Growth Lead", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1974&auto=format&fit=crop" }
  ];

  return (
    // ADJUSTED: Background #F6F6F6 to match previous section exactly
    <section className="bg-[#F6F6F6] py-16 sm:py-32 px-4 sm:px-10">

      {/* ADJUSTED: h-1400px and relative for watermark */}
      <div className="max-w-[1400px] mx-auto bg-white rounded-[40px] p-8 md:p-12 border border-gray-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row gap-12 lg:gap-20 items-center relative overflow-hidden">

        {/* Background Watermark */}
        <div
          className="absolute top-5 left-5 sm:top-10 sm:left-10 pointer-events-none select-none font-black text-[45px] xs:text-[60px] sm:text-[100px] md:text-[180px] uppercase tracking-tighter opacity-[0.05] z-0"
          style={{
            fontFamily: "'Oswald', sans-serif",
            WebkitTextStroke: "1px #000",
            color: "transparent"
          }}
        >
          TEAM
        </div>

        {/* Left Side: Content */}
        <div className="lg:w-1/2">
          {/* ADJUSTED: Updated tracking and text size to match 'About Us' header */}
          <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-xs mb-3 block">
            The Experts
          </span>
          <h2 className="text-[32px] sm:text-[48px] font-montserrat font-black leading-[1] tracking-tighter text-zinc-950 uppercase mb-6">
            Our team, <br/>
            <span className="italic text-zinc-400 font-light normal-case" style={{ fontFamily: "'Playfair Display', serif" }}>your strategists.</span>
          </h2>
          <p className="text-base text-gray-500 max-w-sm mb-8 leading-relaxed">
            We thrive on teamwork, <span className="text-black font-semibold">turning individual strengths into shared success.</span> We turn ideas into digital products.
          </p>
        </div>

        {/* Right Side: Team Grid */}
        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {team.map((m, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-50 rounded-[28px] overflow-hidden relative group"
            >
              <img
                src={m.img}
                alt={m.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                <p className="text-white font-bold text-base leading-none">{m.name}</p>
                <p className="text-orange-400 text-[10px] uppercase tracking-widest mt-2 font-semibold">
                  {m.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
