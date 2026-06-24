"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useAmazonEconomics } from '@/hooks/useAmazonEconomics';
import ResultExplanationBlock from '@/components/shared-calculator/ResultExplanationBlock';
import FbaSizeVisualizer from '@/components/shared-calculator/FbaSizeVisualizer';
import AssumptionsPanel from '@/components/shared-calculator/AssumptionsPanel';
import { ArrowLeft, Share2, Box, Calendar, AlertTriangle, ShieldCheck } from 'lucide-react';

// Lazy-load below-fold resource hub
const CalculatorResourceHub = dynamic(() => import('@/components/shared-calculator/CalculatorResourceHub'), { ssr: false });

export default function StorageFeeCalculatorPage({ market }) {
  const { inputs, errors, results, handleInputChange, syncUrlParams } = useAmazonEconomics(market);
  const [isCopied, setIsCopied] = useState(false);

  // Batch specific states
  const [unitsCount, setUnitsCount] = useState("1000");
  const [monthsCount, setMonthsCount] = useState("6");

  const formatCurrency = (val) => `${results.currencySymbol}${val.toFixed(2)}`;

  // Calculate batch cumulative fees
  const units = parseInt(unitsCount) || 1;
  const months = parseInt(monthsCount) || 1;

  const unitStorageStandard = results.storageRates?.standard || 0;
  const unitStoragePeak = results.storageRates?.peak || 0;
  const volumeCuFt = results.storageRates?.volume || 0;

  const batchStorageStandard = unitStorageStandard * units * months;
  const batchStoragePeak = unitStoragePeak * units * months;

  // Aged Inventory warning check (365+ days / 12+ months)
  const isAgedWarning = months >= 12;

  useEffect(() => {
    syncUrlParams();
  }, [inputs.length, inputs.width, inputs.height, inputs.weight, inputs.marketplace]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Schema generation
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": `Grow Orbit Amazon Storage Fee Forecast Calculator - ${inputs.marketplace}`,
    "description": "Forecast monthly, seasonal (including Q4 peak), and 365-day aged long-term storage fees for your inventory.",
    "url": "https://www.groworbitofficial.com/amazon-tools/storage-fee-calculator"
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      
      {/* Background elements */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Link 
              href="/amazon-tools" 
              className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-orange-500 transition-colors mb-3"
            >
              <ArrowLeft size={10} /> BACK TO TOOLS HUB
            </Link>

            <h1 className="text-3xl md:text-[34px] font-black uppercase tracking-tighter text-zinc-900 mb-1 flex items-center gap-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              AMAZON <span className="text-orange-500">STORAGE FEE</span> FORECAST
            </h1>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
              PREDICT Q4 SEASONAL PEAKS, BATCH VOLUME REQUIREMENTS, AND LONG-TERM AGED SURCHARGES.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-4 py-2 border bg-white border-zinc-200 hover:border-zinc-300 text-zinc-650 hover:text-zinc-950 transition-all font-black text-[9px] uppercase tracking-widest rounded-full shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 relative after:absolute after:-inset-y-2 after:-inset-x-2"
            >
              <Share2 size={10} className="text-orange-500" />
              {isCopied ? 'COPIED!' : 'SHARE CALCULATION'}
            </button>
          </div>
        </div>

        {/* 2-Column Split */}
        <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
          
          {/* Inputs Section */}
          <div className="w-full lg:w-[35%] flex-shrink-0 space-y-4">
            
            {/* Box Dimensions Input Card */}
            <div className="bg-white p-6 rounded-[24px] border border-zinc-200/60 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-100">
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900">
                  UNIT SPECS
                </h3>
                <select
                  value={inputs.marketplace}
                  onChange={(e) => handleInputChange("marketplace", e.target.value)}
                  className="text-[10px] bg-zinc-50 border border-zinc-200 rounded px-2 py-1 font-bold outline-none text-zinc-700 cursor-pointer focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors"
                >
                  <option value="US">USA ($)</option>
                  <option value="UK">UK (£)</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Pkg Length (in)</label>
                    <input
                      type="number"
                      value={inputs.length}
                      onChange={(e) => handleInputChange("length", e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200/80 rounded-lg text-xs text-zinc-900 font-bold outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors text-center"
                    />
                  </div>
                  <div>
                    <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Pkg Width (in)</label>
                    <input
                      type="number"
                      value={inputs.width}
                      onChange={(e) => handleInputChange("width", e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200/80 rounded-lg text-xs text-zinc-900 font-bold outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors text-center"
                    />
                  </div>
                  <div>
                    <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Pkg Height (in)</label>
                    <input
                      type="number"
                      value={inputs.height}
                      onChange={(e) => handleInputChange("height", e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200/80 rounded-lg text-xs text-zinc-900 font-bold outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors text-center"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 mb-1.5">
                    PACKAGED WEIGHT (LBS)
                  </label>
                  <input
                    type="number"
                    value={inputs.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200/80 rounded-xl text-sm text-zinc-900 font-bold outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Inventory batch sizing */}
            <div className="bg-white p-6 rounded-[24px] border border-zinc-200/60 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.03)]">
              <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 mb-4 pb-2 border-b border-zinc-100 flex items-center gap-1.5">
                <Box size={14} className="text-orange-500" />
                BATCH INVENTORY DETAILS
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 mb-1.5">
                    Total Units Stored
                  </label>
                  <input
                    type="number"
                    value={unitsCount}
                    onChange={(e) => setUnitsCount(e.target.value)}
                    className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200/80 rounded-xl text-sm text-zinc-900 font-bold outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 mb-1.5">
                    Months in FBA Facility
                  </label>
                  <input
                    type="number"
                    value={monthsCount}
                    onChange={(e) => setMonthsCount(e.target.value)}
                    className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200/80 rounded-xl text-sm text-zinc-900 font-bold outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors"
                  />
                </div>

                {isAgedWarning && (
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl flex gap-2 items-start mt-2">
                    <AlertTriangle size={14} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-red-600 font-medium">
                      Inventory stored for over 365 days triggers severe aged inventory surcharges.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <AssumptionsPanel marketplace={inputs.marketplace} />
          </div>

          {/* Right Column: Output Dashboards */}
          <div className="w-full lg:w-[65%] space-y-4">
            
            {/* Batch Level Fee Scorecard Grid */}
            <div className="bg-white p-6 rounded-[24px] border border-zinc-200/60 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.03)] space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 pb-2 border-b border-zinc-100 flex items-center gap-1.5">
                <Calendar size={14} className="text-orange-500" /> CUMULATIVE BATCH FORECAST
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Standard Batch Storage */}
                <div className="bg-zinc-50 p-5 rounded-[20px] border border-zinc-150 relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-emerald-500 bg-emerald-500/10 p-1.5 rounded-lg">
                    <span className="text-[14px] leading-none block">$</span>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-1">TOTAL STANDARD MONTHS</span>
                  <h4 className="text-[32px] font-black text-emerald-500 leading-none tracking-tight mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {formatCurrency(batchStorageStandard)}
                  </h4>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    Based on Jan-Sep Rates
                  </span>
                </div>

                {/* Peak Batch Storage */}
                <div className="bg-zinc-50 p-5 rounded-[20px] border border-zinc-150 relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-orange-500 bg-orange-500/10 p-1.5 rounded-lg">
                    <span className="text-[14px] leading-none block">$</span>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-1">TOTAL PEAK HOLIDAY</span>
                  <h4 className="text-[32px] font-black text-orange-500 leading-none tracking-tight mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {formatCurrency(batchStoragePeak)}
                  </h4>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    Based on Oct-Dec Rates
                  </span>
                </div>

              </div>

              {/* Volume metrics */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex justify-between items-center text-xs text-zinc-650 py-2 border-b border-zinc-100/50">
                  <span className="font-bold">Single Unit Volume</span>
                  <span className="font-black text-zinc-900 text-sm">{volumeCuFt.toFixed(3)} cu ft</span>
                </div>
                <div className="flex justify-between items-center text-xs text-zinc-650 py-2 border-b border-zinc-100/50">
                  <span className="font-bold">Total Batch Volume</span>
                  <span className="font-black text-zinc-900 text-sm">{(volumeCuFt * units).toFixed(2)} cu ft</span>
                </div>
              </div>

            </div>

            {/* Per Unit Base Rates Details */}
            <div className="bg-white p-6 rounded-[24px] border border-zinc-200/60 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.03)] space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900 pb-2 border-b border-zinc-100">
                PER UNIT RATE CARD
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[11px] text-zinc-650 py-1.5">
                  <span className="font-bold">Standard (Jan - Sep) Per Unit / Month</span>
                  <span className="font-black text-zinc-900 text-sm">{formatCurrency(unitStorageStandard)}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-zinc-650 py-1.5">
                  <span className="font-bold">Peak (Oct - Dec) Per Unit / Month</span>
                  <span className="font-black text-zinc-900 text-sm">{formatCurrency(unitStoragePeak)}</span>
                </div>
              </div>

            </div>

            {/* Visualizer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FbaSizeVisualizer results={results} marketplace={inputs.marketplace} />
              <ResultExplanationBlock results={results} />
            </div>

            {/* Action Card */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-[20px] p-5 relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 blur-3xl rounded-full pointer-events-none" />
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3">
                <span className="text-[14px]">📊</span>
              </div>
              <h4 className="text-[11px] font-black uppercase tracking-widest text-white mb-2">
                Need To Compare 3PL vs Amazon?
              </h4>
              <p className="text-[10px] font-medium text-zinc-400 leading-relaxed mb-4 max-w-[280px]">
                Storage fees eating your margin? Compare Amazon FBA costs to self-fulfillment or using a 3PL network.
              </p>
              <Link 
                href="/amazon-tools/fba-vs-fbm-vs-3pl"
                className="bg-orange-500 hover:bg-orange-600 text-white text-[9px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                Open Comparison Tool
              </Link>
            </div>

          </div>

        </div>

        {/* Topical Resource Hub */}
        <CalculatorResourceHub type="general" />

      </div>
    </div>
  );
}
