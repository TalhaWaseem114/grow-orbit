import React from 'react';
import { Lightbulb, ArrowRightCircle } from 'lucide-react';

export default function ProfitRecommendations({ recommendations }) {
  return (
    <div className="bg-zinc-950/95 border border-zinc-800/80 text-white p-5 sm:p-6 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.15)]">
      <div className="flex items-center gap-2.5 mb-4 border-b border-zinc-800/50 pb-3">
        <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500 border border-orange-500/20">
          <Lightbulb size={16} />
        </div>
        <div>
          <h2 className="text-lg font-black uppercase tracking-tight text-white leading-none">
            Optimization Insights
          </h2>
          <p className="text-[10px] font-medium text-zinc-400 mt-0.5">
            Actionable steps based on current unit economics
          </p>
        </div>
      </div>

      <ul className="space-y-3">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex gap-3 group">
            <div className="mt-0.5 text-orange-500 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300">
              <ArrowRightCircle size={14} />
            </div>
            <p className="text-xs sm:text-sm font-medium leading-relaxed text-zinc-300 group-hover:text-white transition-colors duration-300">
              {rec}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

