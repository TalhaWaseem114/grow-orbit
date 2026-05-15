export default function ProofNumbers() {
  return (
    <section className="py-16 bg-zinc-950 border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {[
            { val: "$12M+",  label: "Revenue Managed"          },
            { val: "80+",    label: "Brands Scaled"             },
            { val: "+38%",   label: "Avg Revenue Lift"         },
            { val: "1,200+", label: "Listings Optimized"       },
            { val: "35+",    label: "Active Clients"           },
          ].map((s, i) => (
            <div key={i} className="group text-center">
              <p
                className="text-3xl md:text-4xl font-black text-white tracking-tighter group-hover:text-orange-400 transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {s.val}
              </p>
              <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
