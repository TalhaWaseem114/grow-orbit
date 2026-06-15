import React from 'react';
import { ShieldAlert, Info, TrendingDown } from 'lucide-react';

export default function ResultExplanationBlock({ results }) {
  const { explanation, warnings, score, profitMargin } = results;

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

        <p className="text-xs font-light text-zinc-500 leading-relaxed">
          {explanation}
        </p>
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
