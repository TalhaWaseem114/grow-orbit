import React, { useState } from 'react';
import { getFeeTable } from '../../data/fees/amazonFeeTables';
import { ChevronDown, ChevronUp, HelpCircle, ExternalLink } from 'lucide-react';

export default function AssumptionsPanel({ marketplace = "US" }) {
  const [isOpen, setIsOpen] = useState(true);
  const feeTable = getFeeTable({ marketplace, year: 2026 });
  const { lastVerified, sourceUrl, dimDivisor } = feeTable.meta;

  return (
    <div className="w-full bg-white border border-zinc-200/60 rounded-[20px] overflow-hidden shadow-[0_4px_15px_-8px_rgba(0,0,0,0.01)] transition-all">
      {/* Header / Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3.5 flex items-center justify-between text-left cursor-pointer hover:bg-zinc-50/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <HelpCircle size={15} className="text-zinc-400" />
          <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-800">
            Calculation Assumptions ({marketplace})
          </h4>
        </div>
        <div className="text-zinc-400">
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {/* Expanded Details */}
      {isOpen && (
        <div className="px-5 pb-4 border-t border-zinc-100 pt-3.5 bg-zinc-50/20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px] leading-relaxed">
            <div>
              <span className="text-zinc-400 uppercase tracking-wider text-[9px] font-bold block mb-0.5">Fee Schedule</span>
              <span className="font-bold text-zinc-700">2026 Rates</span>
            </div>
            
            <div>
              <span className="text-zinc-400 uppercase tracking-wider text-[9px] font-bold block mb-0.5">Last Verified</span>
              <span className="font-bold text-zinc-700">{lastVerified}</span>
            </div>

            <div>
              <span className="text-zinc-400 uppercase tracking-wider text-[9px] font-bold block mb-0.5">Dim Divisor</span>
              <span className="font-bold text-zinc-700">{dimDivisor} (cu. in. / lb)</span>
            </div>

            <div>
              <span className="text-zinc-400 uppercase tracking-wider text-[9px] font-bold block mb-0.5">FBA Data Source</span>
              <a 
                href={sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-orange-500 hover:text-orange-600 font-bold inline-flex items-center gap-0.5"
              >
                Amazon Central <ExternalLink size={10} />
              </a>
            </div>
          </div>

          {marketplace === "UK" && (
            <p className="mt-3.5 pt-3.5 border-t border-zinc-150/40 text-[9px] font-semibold text-zinc-500 leading-normal uppercase">
              🇬🇧 UK VAT Assumption: The VAT toggle assumes a standard 20% VAT-registered seller status, deducting VAT from a VAT-inclusive price. Sellers below the £90,000 threshold who are not VAT-registered should leave the VAT toggle turned off to avoid incorrect margins.
            </p>
          )}

          <p className="mt-3.5 pt-3.5 border-t border-zinc-150/40 text-[9px] font-semibold text-zinc-400 leading-normal uppercase">
            ⚠️ Disclaimer: Fees shown are estimates based on standard Amazon schedules. Actual fees may vary in Seller Central based on specific shipping configurations.
          </p>
        </div>
      )}
    </div>
  );
}
