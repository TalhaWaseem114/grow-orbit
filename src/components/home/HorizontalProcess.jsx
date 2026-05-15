"use client";

export default function HorizontalProcess() {
  const steps = [
    { id: "01", label: "Research", title: "Niche & Strategy" },
    { id: "02", label: "Design", title: "Listing Creation" },
    { id: "03", label: "Launch", title: "Rank Optimization" },
    { id: "04", label: "Scale", title: "Reporting & Growth" },
  ];

  return (
    <section className="py-24 bg-white text-black rounded-[50px]">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-5xl font-semibold mb-20 text-center italic">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {/* Connecting Line (Hidden on mobile) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gray-200 -z-0"></div>

          {steps.map((step, i) => (
            <div key={i} className="relative z-10 text-center group">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                {step.id}
              </div>
              <p className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-2">{step.label}</p>
              <h4 className="text-xl font-medium">{step.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
