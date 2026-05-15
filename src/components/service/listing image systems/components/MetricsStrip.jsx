import React from "react";

export default function MetricsStrip() {
  const metrics = [
    { value: "+32%", label: "Avg CVR Lift" },
    { value: "7", label: "Image Sequence" },
    { value: "<5", label: "Day Delivery" },
    { value: "100%", label: "Mobile-First" },
  ];

  return (
    <section className="bg-zinc-950 py-6 border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
          {metrics.map((m, i) => (
            <div key={i} className="group text-center py-6 px-4 hover:bg-white/[0.02] transition-colors cursor-default">
              <p className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-none">
                {m.value}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mt-2 group-hover:text-orange-500 transition-colors">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
