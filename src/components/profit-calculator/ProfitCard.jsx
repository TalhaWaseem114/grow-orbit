import React from 'react';

/**
 * Universal Metric Component for SaaS dashboard tools
 * @param {Object} props
 * @param {string} props.title - The title of the metric
 * @param {string|number} props.value - The main large value
 * @param {string} props.subtext - Optional subtext below the value
 * @param {React.ReactNode} props.icon - Lucide icon
 * @param {"positive" | "negative" | "neutral"} props.status - Determines color coding
 * @param {boolean} props.highlight - If true, adds extra visual weight
 */
export default function ProfitCard({ 
  title, 
  value, 
  subtext, 
  icon, 
  status = "neutral", 
  highlight = false 
}) {
  
  // Status colors mapping
  const statusConfig = {
    positive: {
      text: "text-green-600",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      icon: "text-green-500"
    },
    negative: {
      text: "text-red-600",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      icon: "text-red-500"
    },
    neutral: {
      text: "text-zinc-900",
      bg: "bg-zinc-100",
      border: "border-zinc-200",
      icon: "text-zinc-500"
    }
  };

  const currentStatus = statusConfig[status];

  return (
    <div className={`
      relative overflow-hidden p-4 sm:p-5 rounded-2xl border transition-all duration-300
      bg-white/90 backdrop-blur-md shadow-[0_8px_25px_-6px_rgba(0,0,0,0.03)]
      hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-0.5
      ${highlight 
        ? 'border-orange-500/30 bg-gradient-to-br from-white to-orange-50/10 shadow-[0_12px_30px_rgba(249,115,22,0.05)]' 
        : 'border-zinc-200/80'
      }
    `}>
      
      {/* Background Gradient Hover Effect */}
      <div className={`absolute inset-0 opacity-0 hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br from-transparent to-current ${currentStatus.text}`} />

      <div className="flex items-start justify-between mb-3 relative z-10">
        <h3 className="font-bold text-zinc-400 text-[11px] tracking-widest uppercase">
          {title}
        </h3>
        <div className={`p-1.5 rounded-lg ${currentStatus.bg} ${currentStatus.icon}`}>
          {React.cloneElement(icon, { size: 16 })}
        </div>
      </div>

      <div className="relative z-10">
        <p className={`text-2xl sm:text-3xl font-black tracking-tighter mb-0.5 transition-colors duration-300 ${currentStatus.text}`} style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {value}
        </p>
        {subtext && (
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}

