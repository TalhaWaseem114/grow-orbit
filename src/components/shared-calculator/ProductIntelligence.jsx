import React from 'react';
import { Activity, ShieldCheck, Zap, AlertTriangle } from 'lucide-react';

export default function ProductIntelligence({ results, inputs }) {
  // Determine health score out of 100
  let healthScore = 0;
  if (results.profitMargin >= 30) healthScore += 40;
  else if (results.profitMargin >= 20) healthScore += 30;
  else if (results.profitMargin >= 10) healthScore += 15;

  if (results.roi >= 100) healthScore += 40;
  else if (results.roi >= 50) healthScore += 30;
  else if (results.roi >= 25) healthScore += 15;

  // Penalty for over-sized items eating into margin
  const feeRatio = results.sellingPrice > 0 ? (results.totalAmazonFees / results.sellingPrice) : 0;
  if (feeRatio < 0.3) healthScore += 20;
  else if (feeRatio < 0.4) healthScore += 10;
  else if (feeRatio > 0.5) healthScore -= 10;

  // Cap at 100, min 0
  healthScore = Math.max(0, Math.min(100, healthScore));

  let healthColor = "text-emerald-500";
  let healthBg = "bg-emerald-500/10";
  let statusText = "EXCELLENT";
  if (healthScore < 50) {
    healthColor = "text-red-500";
    healthBg = "bg-red-500/10";
    statusText = "HIGH RISK";
  } else if (healthScore < 80) {
    healthColor = "text-orange-500";
    healthBg = "bg-orange-500/10";
    statusText = "AVERAGE";
  }

  return (
    <div className="bg-zinc-950 p-6 rounded-[24px] border border-zinc-800 shadow-2xl relative overflow-hidden mt-4">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-3xl rounded-full pointer-events-none" />
      
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-zinc-800/80">
        <Activity size={16} className="text-orange-500" />
        <h3 className="text-xs font-black uppercase tracking-widest text-white">
          Automated Health Summary
        </h3>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Health Score Column */}
        <div className="md:w-1/3 flex flex-col items-center justify-center text-center p-4 rounded-2xl border border-zinc-800 bg-zinc-900/50">
          <div className={`w-16 h-16 rounded-full ${healthBg} flex items-center justify-center mb-3 shadow-inner`}>
            <span className={`text-2xl font-black ${healthColor}`}>{healthScore}</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">
            SCORE (OUT OF 100)
          </span>
          <span className={`text-[11px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${healthBg} ${healthColor}`}>
            {statusText}
          </span>
        </div>

        {/* Intelligence Breakdown */}
        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-zinc-300 text-xs font-bold mb-2">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Margin Viability</span>
            </div>
            <p className="text-[10px] text-zinc-500 leading-relaxed">
              {results.profitMargin >= 30 
                ? "Excellent net margin. You have plenty of room to scale with PPC advertising while remaining profitable."
                : results.profitMargin >= 15
                ? "Acceptable margin. Watch your PPC ACOS closely as aggressive bidding may eat into profits."
                : "Dangerous margin. This product has very little room for error or advertising spend."}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-zinc-300 text-xs font-bold mb-2">
              <Zap size={14} className="text-orange-500" />
              <span>Capital Efficiency</span>
            </div>
            <p className="text-[10px] text-zinc-500 leading-relaxed">
              {results.roi >= 100
                ? "Exceptional ROI. For every $1 spent in inventory, you are doubling your capital."
                : results.roi >= 40
                ? "Standard ROI. You are seeing a healthy return on your sourcing capital."
                : "Low ROI. Capital might be tied up inefficiently. Consider negotiating lower sourcing costs."}
            </p>
          </div>

          <div className="space-y-1 sm:col-span-2">
            <div className="flex items-center gap-1.5 text-zinc-300 text-xs font-bold mb-2">
              <AlertTriangle size={14} className="text-indigo-400" />
              <span>Logistics Optimization</span>
            </div>
            <p className="text-[10px] text-zinc-500 leading-relaxed">
              {feeRatio > 0.4 
                ? `Amazon is taking ${(feeRatio * 100).toFixed(0)}% of the selling price in fees. Consider redesigning the packaging to drop a size tier or increasing the selling price to offset fulfillment costs.` 
                : "FBA fulfillment costs are within normal ranges for this price point."}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
