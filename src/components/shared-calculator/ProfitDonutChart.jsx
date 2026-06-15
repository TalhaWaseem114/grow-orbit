import React from 'react';

const formatCurrency = (val, symbol) => {
  return `${symbol}${val.toFixed(2)}`;
};

export default function ProfitDonutChart({ results }) {
  const {
    landedCost,
    referralFee,
    fbaFee,
    storageFee,
    netProfit,
    totalCosts,
    currencySymbol
  } = results;

  const sellingPrice = netProfit + totalCosts;

  // We are charting the breakdown of the SELLING PRICE
  // 1. Cost of Goods (landedCost)
  // 2. Amazon Fees (referralFee + fbaFee + storageFee)
  // 3. Net Profit
  // If there's a loss, we just cap profit at 0 for visual clarity.
  const totalAmazonFees = referralFee + fbaFee + storageFee;
  const clampedProfit = Math.max(0, netProfit);
  
  const total = landedCost + totalAmazonFees + clampedProfit;
  
  // Calculate percentages for the donut
  // We use 100% total circumference for SVG dasharray
  const c = 2 * Math.PI * 40; // Circumference of circle r=40
  
  const pctCost = total > 0 ? (landedCost / total) : 0;
  const pctFees = total > 0 ? (totalAmazonFees / total) : 0;
  const pctProfit = total > 0 ? (clampedProfit / total) : 0;

  // Stroke Dash Array formats: "segmentLength gapLength"
  // Offset moves the starting position around the circle
  const strokeCost = pctCost * c;
  const strokeFees = pctFees * c;
  const strokeProfit = pctProfit * c;

  const offsetCost = 0;
  const offsetFees = offsetCost - strokeCost;
  const offsetProfit = offsetFees - strokeFees;

  return (
    <div className="bg-white p-6 rounded-[24px] border border-zinc-200/60 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center gap-8">
      
      {/* Chart SVG */}
      <div className="relative w-48 h-48 shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f4f4f5" strokeWidth="12" />
          
          {/* Cost Segment (Indigo) */}
          {strokeCost > 0 && (
            <circle 
              cx="50" cy="50" r="40" 
              fill="transparent" 
              stroke="#6366f1" 
              strokeWidth="12" 
              strokeDasharray={`${strokeCost} ${c - strokeCost}`} 
              strokeDashoffset={offsetCost}
              className="transition-all duration-1000 ease-out"
            />
          )}

          {/* Fees Segment (Orange) */}
          {strokeFees > 0 && (
            <circle 
              cx="50" cy="50" r="40" 
              fill="transparent" 
              stroke="#f97316" 
              strokeWidth="12" 
              strokeDasharray={`${strokeFees} ${c - strokeFees}`} 
              strokeDashoffset={offsetFees}
              className="transition-all duration-1000 ease-out"
            />
          )}

          {/* Profit Segment (Emerald) */}
          {strokeProfit > 0 && (
            <circle 
              cx="50" cy="50" r="40" 
              fill="transparent" 
              stroke="#10b981" 
              strokeWidth="12" 
              strokeDasharray={`${strokeProfit} ${c - strokeProfit}`} 
              strokeDashoffset={offsetProfit}
              className="transition-all duration-1000 ease-out"
            />
          )}
        </svg>

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Total Price</span>
          <span className="text-xl font-black text-zinc-900 tracking-tight leading-none mt-1">
            {formatCurrency(sellingPrice, currencySymbol)}
          </span>
        </div>
      </div>

      {/* Legend & Breakdown */}
      <div className="flex-1 w-full space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900 pb-2 border-b border-zinc-100">
          COST & PROFIT BREAKDOWN
        </h3>

        <div className="space-y-3">
          {/* Net Profit */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800">Net Profit</span>
            </div>
            <span className="font-black text-emerald-600 text-sm">
              {formatCurrency(clampedProfit, currencySymbol)} <span className="text-[10px] text-emerald-500/70 ml-1">({(pctProfit * 100).toFixed(0)}%)</span>
            </span>
          </div>

          {/* Amazon Fees */}
          <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-50 transition-colors">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-orange-500 shadow-sm" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-600">Total Amazon Fees</span>
            </div>
            <span className="font-black text-zinc-900 text-sm">
              {formatCurrency(totalAmazonFees, currencySymbol)} <span className="text-[10px] text-zinc-400 ml-1">({(pctFees * 100).toFixed(0)}%)</span>
            </span>
          </div>

          {/* Product Cost */}
          <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-50 transition-colors">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-indigo-500 shadow-sm" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-600">Landed Sourcing Cost</span>
            </div>
            <span className="font-black text-zinc-900 text-sm">
              {formatCurrency(landedCost, currencySymbol)} <span className="text-[10px] text-zinc-400 ml-1">({(pctCost * 100).toFixed(0)}%)</span>
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
