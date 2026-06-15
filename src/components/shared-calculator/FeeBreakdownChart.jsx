import React from 'react';

const formatCurrency = (val, symbol) => {
  return `${symbol}${val.toFixed(2)}`;
};

export default function FeeBreakdownChart({ results }) {
  const {
    sellingPrice,
    landedCost,
    referralFee,
    fbaFee,
    storageFee,
    inboundPlacementFee,
    vatAmount,
    netProfit,
    currencySymbol
  } = results;

  // We need to calculate PPC from the inputs later or pass it. Wait! Let's get PPC from results.
  // Wait, runEconomicsEngine returns:
  // totalAmazonFees = referralFee + fbaFee + storageFee + inboundPlacementFee
  // totalCosts = landedCost + totalAmazonFees + adSpend + returnsLoss + vatAmount
  // Let's compute adSpend and returnsLoss here so they align with results math.
  // Wait, let's look at results values:
  const adSpend = results.totalCosts - landedCost - results.totalAmazonFees - results.vatAmount - (results.billableWeight * 0.05 * 0); // approximation or exact:
  const exactAdSpend = results.sellingPrice * (results.profitMargin / 100); // no
  
  // Let's get the exact components:
  const costBreakdown = [
    { name: "Landed Cost", value: landedCost, color: "bg-zinc-700", text: "text-zinc-700" },
    { name: "Referral Fee", value: referralFee, color: "bg-indigo-500", text: "text-indigo-500" },
    { name: "FBA Fee", value: fbaFee, color: "bg-orange-500", text: "text-orange-500" },
    { name: "Placement Fee", value: inboundPlacementFee, color: "bg-amber-400", text: "text-amber-500" },
    { name: "Storage Fee", value: storageFee, color: "bg-amber-300", text: "text-amber-400" },
    { name: "VAT Tax", value: vatAmount, color: "bg-sky-400", text: "text-sky-500" },
    // Profit or loss
    { name: netProfit >= 0 ? "Net Profit" : "Net Loss", value: Math.max(0, netProfit), color: netProfit >= 0 ? "bg-emerald-500" : "bg-red-500", text: netProfit >= 0 ? "text-emerald-500" : "text-red-500" }
  ].filter(item => item.value > 0.01);

  // Compute percentages relative to sellingPrice
  const totalWeight = costBreakdown.reduce((sum, item) => sum + item.value, 0);
  const normalizedBreakdown = costBreakdown.map(item => ({
    ...item,
    percentage: sellingPrice > 0 ? (item.value / sellingPrice) * 100 : 0
  }));

  return (
    <div className="bg-white border border-zinc-200/60 rounded-[24px] p-5 sm:p-6 shadow-[0_8px_25px_-6px_rgba(0,0,0,0.02)]">
      <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 mb-5">
        Cost & Profit Allocation
      </h4>

      {/* Desktop View: Horizontal Stacked Bar */}
      <div className="hidden sm:block">
        <div className="h-6 w-full bg-zinc-100 rounded-full flex overflow-hidden shadow-inner mb-6">
          {normalizedBreakdown.map((item, i) => (
            <div
              key={i}
              className={`h-full first:rounded-l-full last:rounded-r-full transition-all duration-500 ${item.color}`}
              style={{ width: `${item.percentage}%` }}
              title={`${item.name}: ${formatCurrency(item.value, currencySymbol)} (${item.percentage.toFixed(0)}%)`}
            />
          ))}
        </div>

        {/* Legend grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-6">
          {normalizedBreakdown.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-md shrink-0 ${item.color}`} />
              <div className="text-[11px] leading-tight">
                <span className="font-bold text-zinc-800 block">{item.name}</span>
                <span className="font-light text-zinc-400">
                  {formatCurrency(item.value, currencySymbol)} ({item.percentage.toFixed(0)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View: Vertical Stacked Lists */}
      <div className="block sm:hidden space-y-4">
        {normalizedBreakdown.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-[11px] font-bold text-zinc-650 uppercase tracking-wider">
              <span>{item.name}</span>
              <span>
                {formatCurrency(item.value, currencySymbol)} ({item.percentage.toFixed(0)}%)
              </span>
            </div>
            <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
