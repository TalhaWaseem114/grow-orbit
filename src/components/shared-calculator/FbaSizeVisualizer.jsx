import React from 'react';
import { getFeeTable } from '../../data/fees/amazonFeeTables';
import { Scale } from 'lucide-react';

export default function FbaSizeVisualizer({ results, marketplace = "US" }) {
  const { dimensions, tierName, unitWeight } = results;
  const feeTable = getFeeTable({ marketplace, year: 2026 });

  // Find boundaries of the current matched size tier
  const tier = feeTable.sizeTiers.find(t => t.name === tierName) || feeTable.sizeTiers[1]; // fallback to Large Standard

  // Helper to compute percentage fill for progress bars
  const getPercentage = (val, max) => Math.min(100, Math.max(0, (val / max) * 100));

  const pLength = getPercentage(dimensions.length, tier.maxLongSide);
  const pWidth = getPercentage(dimensions.width, tier.maxMedianSide);
  const pHeight = getPercentage(dimensions.height, tier.maxShortSide);
  const pWeight = getPercentage(unitWeight, tier.maxWeight);

  // Helper to get color classes based on limit closeness
  const getBarColor = (pct) => {
    if (pct >= 95) return "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.3)]";
    if (pct >= 85) return "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.3)]";
    return "bg-zinc-800";
  };

  return (
    <div className="bg-white border border-zinc-200/60 rounded-[20px] p-5 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.02)]">
      <div className="flex items-center gap-2 mb-4">
        <Scale size={16} className="text-orange-500" />
        <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900">
          FBA Size Tier Boundaries
        </h4>
        <span className="ml-auto text-[9px] font-black uppercase tracking-widest text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md">
          {tierName}
        </span>
      </div>

      <div className="space-y-4">
        {/* Length */}
        <div>
          <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
            <span>Length: {dimensions.length.toFixed(1)}&quot;</span>
            <span className="text-zinc-400">Limit: {tier.maxLongSide}&quot;</span>
          </div>
          <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${getBarColor(pLength)}`}
              style={{ width: `${pLength}%` }}
            />
          </div>
        </div>

        {/* Width */}
        <div>
          <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
            <span>Width: {dimensions.width.toFixed(1)}&quot;</span>
            <span className="text-zinc-400">Limit: {tier.maxMedianSide}&quot;</span>
          </div>
          <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${getBarColor(pWidth)}`}
              style={{ width: `${pWidth}%` }}
            />
          </div>
        </div>

        {/* Height */}
        <div>
          <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
            <span>Height: {dimensions.height.toFixed(1)}&quot;</span>
            <span className="text-zinc-400">Limit: {tier.maxShortSide}&quot;</span>
          </div>
          <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${getBarColor(pHeight)}`}
              style={{ width: `${pHeight}%` }}
            />
          </div>
        </div>

        {/* Weight */}
        <div>
          <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
            <span>Weight: {unitWeight.toFixed(2)} lbs</span>
            <span className="text-zinc-400">Limit: {tier.maxWeight} lbs</span>
          </div>
          <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${getBarColor(pWeight)}`}
              style={{ width: `${pWeight}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
