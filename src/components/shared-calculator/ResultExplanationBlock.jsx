import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Info, ArrowRight } from 'lucide-react';

export default function ResultExplanationBlock({ results }) {
  const { explanation, warnings, score, profitMargin, totalAmazonFees, sellingPrice } = results;

  const getDynamicCta = () => {
    const feeRatio = sellingPrice > 0 ? (totalAmazonFees / sellingPrice) : 0;
    const hasProfitMetrics = typeof profitMargin === 'number' && profitMargin !== 0;

    if (hasProfitMetrics) {
      if (feeRatio > 0.40) {
        return {
          title: "Amazon Fees are Consuming Your Margin",
          description: `Amazon fees are taking ${(feeRatio * 100).toFixed(0)}% of your retail price. Let our creative team help you redesign packaging to shrink size tiers or audit your listings.`,
          buttonText: "Speak with our Creative Team",
          link: "/service/design-creative?ref=calc-high-fees",
          accent: "border-orange-500/20 bg-orange-500/[0.02]"
        };
      }
      if (profitMargin < 15) {
        return {
          title: "Your Net Margin is in the Danger Zone",
          description: "A net margin below 15% leaves no room for advertising overheads or return rate spikes. Let us audit your sourcing and PPC efficiency.",
          buttonText: "Optimize Sourcing & PPC",
          link: "/service/product-hunting-sourcing?ref=calc-low-margin",
          accent: "border-red-500/20 bg-red-500/[0.02]"
        };
      }
      return {
        title: "Strong Economics — Ready to Scale?",
        description: "Your unit economics look healthy and viable. Capitalize on this honeymoon margin by deploying high-impact listing systems and targeted advertising.",
        buttonText: "Schedule Free Strategy Audit",
        link: "/contact?ref=calc-healthy",
        accent: "border-emerald-500/20 bg-emerald-500/[0.02]"
      };
    }

    // Calculators without profit metrics (FBA Fee & Storage Fee)
    if (results.storageRates) {
      return {
        title: "FBA Storage Fees Eating Your Margin?",
        description: "Forecast cumulative monthly storage fees, Q4 peaks, and long-term aged inventory surcharges. Compare FBA costs to self-fulfillment or using a 3PL network.",
        buttonText: "Open Logistics Comparison",
        link: "/amazon-tools/fba-vs-fbm-vs-3pl?ref=storage-calc",
        accent: "border-indigo-500/20 bg-indigo-500/[0.02]"
      };
    }

    // Default fee calculator CTA
    return {
      title: "Evaluate Your Product Sourcing Costs",
      description: "Now that you know your resolved fee tier and estimated FBA fees, input your sourcing cost to calculate margins and ROI in the Pro Profit Calculator.",
      buttonText: "Go to Profit Calculator",
      link: "/amazon-tools/profit-calculator?ref=fee-calc",
      accent: "border-orange-500/20 bg-orange-500/[0.02]"
    };
  };

  const cta = getDynamicCta();

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Dynamic Summary Panel */}
      <div className="bg-white border border-zinc-200/60 rounded-[20px] p-5 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2 mb-3">
          <Info size={16} className="text-orange-500" />
          <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900">
            Economics Interpretation
          </h4>
          
          {/* Viability Rating */}
          <span className={`ml-auto text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border
            ${score.color === 'green' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/10' : ''}
            ${score.color === 'yellow' ? 'bg-amber-500/10 text-amber-600 border-amber-500/10' : ''}
            ${score.color === 'red' ? 'bg-red-500/10 text-red-600 border-red-500/10' : ''}
          `}>
            Product Viability: {score.label}
          </span>
        </div>

        <p className="text-xs font-light text-zinc-500 leading-relaxed mb-4">
          {explanation}
        </p>

        {/* Dynamic CTA Block */}
        <div className={`p-4 rounded-xl border ${cta.accent} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all duration-300`}>
          <div className="space-y-0.5">
            <h5 className="text-[10px] font-black uppercase tracking-wider text-zinc-900 flex items-center gap-1.5">
              <span className="text-orange-500">✦</span> {cta.title}
            </h5>
            <p className="text-[10px] text-zinc-500 font-medium leading-relaxed max-w-[420px]">
              {cta.description}
            </p>
          </div>
          <Link 
            href={cta.link}
            className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-black text-[9px] uppercase tracking-widest rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 hover:translate-x-0.5"
          >
            {cta.buttonText}
            <ArrowRight size={8} />
          </Link>
        </div>
      </div>

      {/* Warnings & Thresholds Panel */}
      {warnings.length > 0 && (
        <div className="bg-orange-500/5 border border-orange-500/15 rounded-[20px] p-4 flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-orange-700">
            <ShieldAlert size={14} className="shrink-0" />
            <h5 className="text-[10px] font-black uppercase tracking-wider">
              Fee Bracket Warnings
            </h5>
          </div>
          <div className="space-y-1.5 pl-5 list-disc text-[11px] text-orange-800/90 font-medium">
            {warnings.map((w, i) => (
              <div key={i} className="relative before:content-['•'] before:absolute before:-left-3.5 before:text-orange-500">
                {w}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
