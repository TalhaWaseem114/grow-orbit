import React from 'react';
import ProfitCard from './ProfitCard';
import ProfitInsightsPanel from './ProfitInsightsPanel';
import ProfitRecommendations from './ProfitRecommendations';
import ProfitBreakdownChart from './ProfitBreakdownChart';
import Link from 'next/link';
import { DollarSign, Percent, Scale, TrendingUp } from 'lucide-react';

// Formatter utilities
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const formatPercent = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
};

export default function ProfitResults({ results, sellingPrice, isCalculated }) {
  const { totalCost, netProfit, profitMargin, breakEvenPrice, roi, breakdown, insights } = results;

  // Determine status for Net Profit & Margin explicitly for the UI cards
  let profitStatus = "neutral";
  if (netProfit > 0) profitStatus = "positive";
  else if (netProfit < 0) profitStatus = "negative";

  let marginStatus = "neutral";
  if (profitMargin > 20) marginStatus = "positive";
  else if (profitMargin < 0) marginStatus = "negative";

  let roiStatus = "neutral";
  if (roi >= 100) roiStatus = "positive";
  else if (roi < 0) roiStatus = "negative";

  return (
    <div className="flex flex-col gap-4 sm:gap-5 w-full">
      
      {!isCalculated && (
        <div className="bg-orange-500/10 border border-orange-500/20 text-orange-700 rounded-[20px] p-4 text-xs font-bold text-center leading-relaxed no-print animate-pulse shadow-sm">
          ⚠️ Sourcing Analysis Pending: Enter metrics on the left and click &quot;Calculate Profitability&quot; to compile final results and unlock recommendations.
        </div>
      )}

      <div className={`flex flex-col gap-4 sm:gap-5 w-full transition-all duration-500 ${isCalculated ? 'opacity-100' : 'opacity-40 pointer-events-none filter blur-[0.3px]'}`}>
        
        {/* LAYER 1: CORE KPIs */}
        <div className="flex flex-col gap-4">
          
          {/* HERO CARD: Net Profit */}
          <div className="w-full">
            <ProfitCard
              title="Net Profit (Per Unit)"
              value={formatCurrency(netProfit)}
              subtext={`Total Costs: ${formatCurrency(totalCost)}`}
              icon={<DollarSign size={24} />}
              status={profitStatus}
              highlight={true}
            />
          </div>

          {/* SECOND ROW: Margin, ROI, Break-even (3-Col Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ProfitCard
              title="Profit Margin"
              value={formatPercent(profitMargin)}
              subtext="Net Margin %"
              icon={<Percent size={18} />}
              status={marginStatus}
            />
            <ProfitCard
              title="ROI (Inventory)"
              value={formatPercent(roi)}
              subtext="Capital Efficiency"
              icon={<TrendingUp size={18} />}
              status={roiStatus}
            />
            <ProfitCard
              title="Break-Even Price"
              value={formatCurrency(breakEvenPrice)}
              subtext="Min. selling price"
              icon={<Scale size={18} />}
              status="neutral"
            />
          </div>

        </div>

        {/* DYNAMIC CHART: Breakdown Analysis */}
        <div className="w-full no-print">
          <ProfitBreakdownChart 
            breakdown={breakdown} 
            netProfit={netProfit} 
            sellingPrice={sellingPrice} 
          />
        </div>

        {/* LAYER 2: BUSINESS INTERPRETATION (INTELLIGENCE BLOCK) */}
        <div className="w-full">
          <ProfitInsightsPanel 
            classification={insights.classification} 
            healthScore={insights.healthScore} 
          />
        </div>

        {/* LAYER 3: ACTIONABLE RECOMMENDATIONS */}
        <div className="w-full">
          <ProfitRecommendations 
            recommendations={insights.recommendations} 
          />
        </div>

        {/* LAYER 4: PRO FEATURE LOCK PANEL (SaaS Lead Magnet) */}
        <div className="w-full relative overflow-hidden bg-zinc-950/98 border border-zinc-850 rounded-2xl p-5 shadow-[0_12px_30px_rgba(0,0,0,0.15)] no-print">
          
          {/* Glowing gold visual effect in background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-2xl rounded-full pointer-events-none" />

          {/* Content with Blur */}
          <div className="filter blur-[2px] opacity-25 select-none pointer-events-none">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-black uppercase text-zinc-500 tracking-wider">Advanced Sim</span>
              <span className="text-xs font-black text-orange-500">$49/mo value</span>
            </div>
            <p className="text-sm font-bold text-white mb-2">Negotiation Buffer Finder</p>
            <div className="h-6 w-3/4 bg-zinc-800 rounded mb-2" />
            <div className="h-4 w-1/2 bg-zinc-800 rounded" />
          </div>

          {/* Floating Unlock Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-zinc-950/80 backdrop-blur-[1px]">
            <div className="w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500 mb-2 border border-orange-500/20">
              <TrendingUp size={14} />
            </div>
            <h3 className="text-xs font-black uppercase tracking-widest text-white mb-1">
              Unlock Advanced AI Sourcing
            </h3>
            <p className="text-[9px] font-semibold text-zinc-400 mb-3 max-w-[260px] leading-relaxed">
              Simulate seasonal storage fee volatility and target volume negotiation discounts.
            </p>
            <Link 
              href="/contact?ref=sourcing-pro"
              className="px-3.5 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-[9px] font-bold uppercase tracking-widest rounded-lg transition-all shadow-md cursor-pointer hover:scale-[1.03] inline-block text-center"
            >
              Upgrade to Pro
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}




