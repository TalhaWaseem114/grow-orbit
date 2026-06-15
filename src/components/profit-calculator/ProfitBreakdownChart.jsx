import React, { useState } from 'react';

// Color map for segments
const COLORS = {
  sourcing: '#f97316',   // orange-500
  shipping: '#6366f1',   // indigo-500
  amazonFee: '#a855f7',  // purple-500
  ppc: '#ec4899',        // pink-500
  profit: '#10b981',     // emerald-500
  loss: '#ef4444',       // red-500
};

export default function ProfitBreakdownChart({ breakdown, netProfit, sellingPrice }) {
  const [activeSegment, setActiveSegment] = useState(null);

  const isLoss = netProfit < 0;
  const hasSellingPrice = sellingPrice > 0;

  // Format currency helper
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  // 1. Prepare data for the breakdown donut
  let segments = [];

  if (hasSellingPrice) {
    if (!isLoss) {
      // Normal profitable scenario: components sum to 100% of selling price
      segments = [
        { key: 'profit', label: 'Net Profit', ...breakdown.profit, color: COLORS.profit },
        { key: 'sourcing', label: 'Sourcing Cost', ...breakdown.sourcing, color: COLORS.sourcing },
        { key: 'shipping', label: 'Shipping Cost', ...breakdown.shipping, color: COLORS.shipping },
        { key: 'amazonFee', label: 'Amazon Fees', ...breakdown.amazonFee, color: COLORS.amazonFee },
        { key: 'ppc', label: 'Est. PPC ad spend', ...breakdown.ppc, color: COLORS.ppc },
      ];
    } else {
      // Loss scenario: normalize costs to represent 100% of total cost, highlighting operating loss
      const totalCost = breakdown.sourcing.value + breakdown.shipping.value + breakdown.amazonFee.value + breakdown.ppc.value;

      segments = [
        { key: 'sourcing', label: 'Sourcing Cost', value: breakdown.sourcing.value, percentage: totalCost > 0 ? (breakdown.sourcing.value / totalCost) * 100 : 0, color: COLORS.sourcing },
        { key: 'shipping', label: 'Shipping Cost', value: breakdown.shipping.value, percentage: totalCost > 0 ? (breakdown.shipping.value / totalCost) * 100 : 0, color: COLORS.shipping },
        { key: 'amazonFee', label: 'Amazon Fees', value: breakdown.amazonFee.value, percentage: totalCost > 0 ? (breakdown.amazonFee.value / totalCost) * 100 : 0, color: COLORS.amazonFee },
        { key: 'ppc', label: 'Est. PPC Cost', value: breakdown.ppc.value, percentage: totalCost > 0 ? (breakdown.ppc.value / totalCost) * 100 : 0, color: COLORS.ppc },
      ];
    }
  }

  // Filter out zero-value segments to prevent SVG glitches
  const activeSegments = segments.filter(s => s.value > 0);

  // SVG Geometry constants
  const size = 140;
  const radius = 52;
  const strokeWidth = 10;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius; // ~326.7

  // Calculate cumulative offsets for segments
  let currentOffset = 0;
  const renderedSegments = activeSegments.map((segment) => {
    const strokeLength = (segment.percentage / 100) * circumference;
    const strokeDash = `${strokeLength} ${circumference - strokeLength}`;
    const strokeOffset = currentOffset;

    // Accumulate for next segment
    currentOffset -= strokeLength;

    return {
      ...segment,
      strokeDash,
      strokeOffset,
    };
  });

  // Decide what to show in the center of the donut
  const getCenterLabel = () => {
    if (activeSegment) {
      return activeSegment.label;
    }
    return isLoss ? 'Operating Loss' : 'Sourcing Split';
  };

  const getCenterValue = () => {
    if (activeSegment) {
      return `${activeSegment.percentage.toFixed(0)}%`;
    }

    if (isLoss) {
      return formatCurrency(Math.abs(netProfit));
    }
    return '100%';
  };

  const getCenterSubtext = () => {
    if (activeSegment) {
      return formatCurrency(activeSegment.value);
    }
    return isLoss ? 'Per Unit' : 'Price Share';
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-zinc-100 shadow-[0_8px_25px_-6px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row gap-6 items-center w-full">

      {/* SVG Donut Chart */}
      <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90 filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.01)]"
        >
          {/* Background circle placeholder */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#f4f4f5"
            strokeWidth={strokeWidth}
          />

          {hasSellingPrice && renderedSegments.map((segment) => (
            <circle
              key={segment.key}
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={segment.color}
              strokeWidth={strokeWidth + (activeSegment?.key === segment.key ? 2 : 0)}
              strokeDasharray={segment.strokeDash}
              strokeDashoffset={segment.strokeOffset}
              strokeLinecap="round"
              className="transition-all duration-300 cursor-pointer origin-center hover:opacity-95"
              onMouseEnter={() => setActiveSegment(segment)}
              onMouseLeave={() => setActiveSegment(null)}
              style={{
                transformOrigin: '50% 50%',
              }}
            />
          ))}
        </svg>

        {/* Center Text Panel */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 pointer-events-none">
          <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-0.5 max-w-[85px] truncate leading-none">
            {getCenterLabel()}
          </p>
          <p className={`text-lg font-black tracking-tighter leading-none mb-0.5 ${isLoss && !activeSegment ? 'text-red-500' : 'text-zinc-900'}`}>
            {getCenterValue()}
          </p>
          <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest leading-none">
            {getCenterSubtext()}
          </p>
        </div>
      </div>

      {/* Interactive Legend */}
      <div className="flex flex-col gap-1.5 w-full">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
          Cost & Profit Breakdown
        </h4>

        {!hasSellingPrice ? (
          <p className="text-xs font-semibold text-zinc-400 italic">
            Enter pricing metrics to visualize share breakdown.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] font-semibold">
            {renderedSegments.map((seg) => (
              <div 
                key={seg.key}
                className={`flex flex-col gap-1 p-1.5 rounded-lg border transition-all duration-300 cursor-pointer
                  ${activeSegment?.key === seg.key 
                    ? 'bg-zinc-50 border-zinc-200/80 shadow-sm scale-[1.01]' 
                    : 'border-transparent hover:bg-zinc-50/50'
                  }
                `}
                onMouseEnter={() => setActiveSegment(seg)}
                onMouseLeave={() => setActiveSegment(null)}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
                    <span className="text-zinc-500 font-bold truncate">{seg.label}</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold">
                    <span className="text-zinc-800">{formatCurrency(seg.value)}</span>
                    <span className="text-zinc-400 text-[9px]">({seg.percentage.toFixed(0)}%)</span>
                  </div>
                </div>
                
                {/* Mini progress line indicator */}
                <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden relative">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${seg.percentage}%`,
                      backgroundColor: seg.color 
                    }}
                  />
                </div>
              </div>
            ))}

            {isLoss && (
              <div className="col-span-full mt-1.5 p-2 bg-red-50 rounded-xl border border-red-100 flex items-center justify-between text-[10px]">
                <span className="font-bold uppercase tracking-widest text-red-600">Cost Overrun</span>
                <span className="font-black text-red-600">{(( (breakdown.sourcing.value + breakdown.shipping.value + breakdown.amazonFee.value + breakdown.ppc.value) / sellingPrice) * 100).toFixed(0)}% of price</span>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

