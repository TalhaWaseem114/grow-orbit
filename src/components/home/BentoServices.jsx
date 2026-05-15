"use client";

export default function BentoServices() {
  const services = [
    { title: "Brand Launch", desc: "From trademark to listing optimization.", size: "col-span-2" },
    { title: "PPC Tuning", desc: "Precision ads to maximize ROI.", size: "col-span-1" },
    { title: "Listing Images", desc: "High-conversion 3D and photography.", size: "col-span-1" },
    { title: "Growth Automation", desc: "AI-driven scale for your brand.", size: "col-span-2" },
  ];

  return (
    <section className="py-24 px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-5xl font-semibold leading-tight">Everything You Need <br/> To Win on Amazon</h2>
        <p className="text-gray-400 max-w-xs text-sm">We build systems that ensure ranked, high-conversion growth.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((s, i) => (
          <div key={i} className={`${s.size} bg-[#141416] p-10 rounded-3xl border border-white/5 hover:border-orange-500/30 transition-all group`}>
            <div className="w-12 h-12 bg-orange-500/10 rounded-full mb-6 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
               {/* Icon here */}
            </div>
            <h3 className="text-2xl font-medium mb-3">{s.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
