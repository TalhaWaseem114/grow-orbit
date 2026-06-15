import React from 'react';
import { Activity, ShieldAlert, ShieldCheck, Zap } from 'lucide-react';

export default function ProfitInsightsPanel({ classification, healthScore }) {
  
  // Mapping the classification level to visual styles
  const getBadgeStyle = (level) => {
    switch(level) {
      case 'red': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'yellow': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'green': return 'bg-green-500/10 text-green-600 border-green-500/20';
      default: return 'bg-zinc-100 text-zinc-600 border-zinc-200';
    }
  };

  const getRiskIcon = (level) => {
    switch(level) {
      case 'red': return <ShieldAlert size={14} />;
      case 'yellow': return <Zap size={14} />;
      case 'green': return <ShieldCheck size={14} />;
      default: return <Activity size={14} />;
    }
  };

  // Determine the gradient fill for the health meter based on the score
  const getMeterGradient = (score) => {
    if (score < 40) return 'from-red-500 to-orange-500';
    if (score < 70) return 'from-orange-500 to-yellow-500';
    return 'from-green-500 to-emerald-500';
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-zinc-100 shadow-[0_8px_25px_-6px_rgba(0,0,0,0.03)] transition-all duration-300">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 bg-zinc-50 rounded-lg flex items-center justify-center text-zinc-500 border border-zinc-100">
          <Activity size={16} />
        </div>
        <div>
          <h2 className="text-lg font-black uppercase tracking-tight text-zinc-900 leading-none">
            Product Intelligence
          </h2>
          <p className="text-[10px] font-bold text-zinc-400 tracking-widest mt-0.5">
            Automated Health Summary
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        
        {/* Classification Badge & Risk Level */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">
            Classification
          </p>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold tracking-wide transition-all duration-500 ${getBadgeStyle(classification.level)}`}>
            {getRiskIcon(classification.level)}
            {classification.label}
          </div>
        </div>

        {/* Health Score Meter */}
        <div>
          <div className="flex justify-between items-end mb-1.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Health Score
            </p>
            <p className="text-xl font-black tracking-tighter text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {healthScore}<span className="text-xs font-bold text-zinc-400">/100</span>
            </p>
          </div>
          
          <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden relative">
            <div 
              className={`absolute top-0 left-0 h-full bg-gradient-to-r transition-all duration-1000 ease-out rounded-full ${getMeterGradient(healthScore)}`}
              style={{ width: `${healthScore}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

