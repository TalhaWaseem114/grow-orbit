import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500"></div>
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-600/80">
      {children}
    </span>
  </div>
);

export default function FAQ() {
  const faqs = [
    {
      q: "What image formats and resolutions do you deliver?",
      a: "All images are delivered in JPEG, PNG, and PSD/AI source files. Standard resolution is 2000x2000px for Amazon compliance. We also provide mobile-optimized variants and A+ Content modules at the required dimensions."
    },
    {
      q: "How many revisions are included in a project?",
      a: "Every project includes 2 rounds of revisions. We find that with our thorough discovery and briefing process, most clients approve within the first revision. Additional revision rounds can be added if needed."
    },
    {
      q: "What's the typical turnaround time for a full image set?",
      a: "A standard 7-image sequence is delivered within 5 business days from approved concept. Rush delivery (48 hours) is available for time-sensitive launches at an additional cost."
    },
    {
      q: "Do you handle the A/B testing of images?",
      a: "Yes. We integrate image A/B testing into our deployment workflow. Using Amazon's Manage Your Experiments tool, we systematically test main images and infographic sequences to identify the highest-converting variants."
    },
    {
      q: "Can you work with existing product photography?",
      a: "Absolutely. We can enhance existing photography with background removal, retouching, and infographic overlays. However, for maximum impact, we recommend our full-service 3D rendering or studio photography packages."
    },
    {
      q: "Do you comply with Amazon's image requirements?",
      a: "100%. Every image we produce is compliant with Amazon's current image guidelines, including main image white background requirements, minimum resolution standards, and prohibited content policies."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-32 bg-[#fafafa] relative text-left">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          {/* Left: Heading */}
          <div className="lg:col-span-4">
            <SectionLabel>FAQ_Protocol</SectionLabel>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900">
              Common<br />
              <span className="italic font-serif lowercase tracking-normal text-zinc-300">questions.</span>
            </h2>
          </div>

          {/* Right: Accordion */}
          <div className="lg:col-span-8 space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === i ? 'border-orange-500/20 shadow-lg shadow-zinc-200/50' : 'border-zinc-100 hover:border-orange-500/10'}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-zinc-300 font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm font-bold text-zinc-900">{faq.q}</h3>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-zinc-400 shrink-0 ml-4 transition-transform duration-300 ${openIndex === i ? "rotate-180 text-orange-500" : ""}`}
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-64 pb-6' : 'max-h-0'}`}>
                  <div className="px-6 pl-[52px]">
                    <p className="text-zinc-500 text-sm font-light leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
