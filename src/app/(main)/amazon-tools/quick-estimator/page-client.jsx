"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAmazonEconomics } from '@/hooks/useAmazonEconomics';
import ResultExplanationBlock from '@/components/shared-calculator/ResultExplanationBlock';
import FbaSizeVisualizer from '@/components/shared-calculator/FbaSizeVisualizer';
import AssumptionsPanel from '@/components/shared-calculator/AssumptionsPanel';
import { ArrowLeft, Share2, Box, Globe, Truck, Percent, Target, ShieldAlert } from 'lucide-react';
import CalculatorResourceHub from '@/components/shared-calculator/CalculatorResourceHub';

export default function QuickEstimatorPage({ market }) {
  const { inputs, errors, results, handleInputChange, syncUrlParams } = useAmazonEconomics(market);
  const [isCopied, setIsCopied] = useState(false);

  // Parse values to print nicely
  const formatCurrency = (val) => `${results.currencySymbol}${val.toFixed(2)}`;
  const formatPercent = (val) => `${val.toFixed(1)}%`;

  // Trigger URL sync when calculations change
  useEffect(() => {
    syncUrlParams();
  }, [inputs.sellingPrice, inputs.productCost, inputs.weight, inputs.length, inputs.width, inputs.height, inputs.marketplace]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleClear = () => {
    handleInputChange("sellingPrice", "");
    handleInputChange("productCost", "");
  };

  // Schema generation
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": `Grow Orbit Quick Amazon Estimator - ${inputs.marketplace}`,
    "description": "Calculate estimated margins, FBA size tiers, and ROI in 15 seconds.",
    "url": "https://groworbit.com/amazon-tools/quick-estimator"
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
        
        {/* Header Section */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Link 
              href="/amazon-tools" 
              className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-orange-500 transition-colors mb-3"
            >
              <ArrowLeft size={10} /> BACK TO TOOLS HUB
            </Link>

            <h1 className="text-3xl md:text-[34px] font-black uppercase tracking-tighter text-zinc-900 mb-1 flex items-center gap-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              PRODUCT RESEARCH <span className="text-orange-500">ESTIMATOR</span>
              <span className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ml-1">
                15 SECONDS
              </span>
            </h1>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
              ESTIMATE NET PROFIT, MARGIN, AND SIZE TIERS INSTANTLY FROM 4 PARAMETERS.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-4 py-2 border bg-white border-zinc-200 hover:border-zinc-300 text-zinc-650 hover:text-zinc-950 transition-all font-black text-[9px] uppercase tracking-widest rounded-full shadow-sm cursor-pointer"
            >
              <Share2 size={10} className="text-orange-500" />
              {isCopied ? 'COPIED!' : 'SHARE CALCULATION'}
            </button>
          </div>
        </div>

        {/* 2-Column Split */}
        <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
          
          {/* Inputs Section */}
          <div className="w-full lg:w-[35%] flex-shrink-0">
            <div className="bg-white border border-zinc-200/60 rounded-[24px] p-6 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900">
                  CORE PARAMETERS
                </h3>
                <div className="flex items-center gap-2">
                  <select
                    value={inputs.marketplace}
                    onChange={(e) => handleInputChange("marketplace", e.target.value)}
                    className="text-[10px] bg-zinc-50 border border-zinc-200 rounded px-2 py-1 font-bold outline-none text-zinc-700 cursor-pointer focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors"
                  >
                    <option value="US">USA ($)</option>
                    <option value="UK">UK (£)</option>
                  </select>
                  <button onClick={handleClear} className="text-[9px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-100 hover:bg-zinc-200 px-3 py-1 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 relative after:absolute after:-inset-y-2 after:-inset-x-2">
                    CLEAR
                  </button>
                </div>
              </div>
              <p className="text-[10px] font-bold text-zinc-400 mb-6 pb-4 border-b border-zinc-100">
                Enter your basic inputs for a rapid estimation.
              </p>

              <div className="space-y-4">
                {/* Selling Price */}
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 mb-1.5">
                    <Globe size={10} className="text-orange-500" /> SELLING PRICE
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-bold">{results.currencySymbol}</span>
                    <input
                      type="number"
                      value={inputs.sellingPrice}
                      onChange={(e) => handleInputChange("sellingPrice", e.target.value)}
                      placeholder="30.00"
                      className="w-full pl-7 pr-3 py-2.5 bg-zinc-50 border border-zinc-200/80 rounded-xl text-sm text-zinc-900 font-bold outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors"
                    />
                  </div>
                  {errors.sellingPrice && <p className="text-red-500 text-[9px] mt-1 font-bold">{errors.sellingPrice}</p>}
                </div>

                {/* Product Cost */}
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 mb-1.5">
                    <Box size={10} className="text-orange-500" /> PRODUCT COST
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-bold">{results.currencySymbol}</span>
                    <input
                      type="number"
                      value={inputs.productCost}
                      onChange={(e) => handleInputChange("productCost", e.target.value)}
                      placeholder="8.00"
                      className="w-full pl-7 pr-3 py-2.5 bg-zinc-50 border border-zinc-205/80 rounded-xl text-sm text-zinc-900 font-bold outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors"
                    />
                  </div>
                  {errors.productCost && <p className="text-red-500 text-[9px] mt-1 font-bold">{errors.productCost}</p>}
                </div>

                {/* Dimensions */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Pkg Length (in)</label>
                    <input
                      type="number"
                      value={inputs.length}
                      onChange={(e) => handleInputChange("length", e.target.value)}
                      placeholder="10.0"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200/80 rounded-lg text-xs text-zinc-900 font-bold outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Pkg Width (in)</label>
                    <input
                      type="number"
                      value={inputs.width}
                      onChange={(e) => handleInputChange("width", e.target.value)}
                      placeholder="8.0"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200/80 rounded-lg text-xs text-zinc-900 font-bold outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Pkg Height (in)</label>
                    <input
                      type="number"
                      value={inputs.height}
                      onChange={(e) => handleInputChange("height", e.target.value)}
                      placeholder="2.0"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200/80 rounded-lg text-xs text-zinc-900 font-bold outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Weight */}
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 mb-1.5">
                     PACKAGED WEIGHT (LBS)
                  </label>
                  <input
                    type="number"
                    value={inputs.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    placeholder="1.2"
                    className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200/80 rounded-xl text-sm text-zinc-900 font-bold outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors"
                  />
                  {errors.weight && <p className="text-red-500 text-[9px] mt-1 font-bold">{errors.weight}</p>}
                </div>

              </div>

              <button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-widest text-[11px] py-4 rounded-[14px] transition-colors shadow-lg shadow-orange-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2">
                UPDATE ESTIMATE
              </button>
            </div>
            
            <div className="mt-4">
              <AssumptionsPanel marketplace={inputs.marketplace} />
            </div>
          </div>

          {/* Right Column: Output Dashboard */}
          <div className="w-full lg:w-[65%] space-y-4">
            
            {/* Top Stat Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Main Hero Card (Net Profit) */}
              <div className="flex-1 bg-white border border-zinc-200/60 rounded-[20px] p-5 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.02)] relative overflow-hidden">
                <div className="absolute top-4 right-4 text-emerald-500 bg-emerald-500/10 p-1.5 rounded-lg">
                  <span className="text-[14px] leading-none block">$</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-2">
                  ESTIMATED NET PROFIT
                </span>
                <h3 className={`text-[40px] font-black ${results.netProfit >= 0 ? "text-emerald-500" : "text-red-500"} leading-none mb-1 tracking-tight`} style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {formatCurrency(results.netProfit)}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Total FBA Fees: {formatCurrency(results.totalAmazonFees)}</span>
                </div>
              </div>

              {/* Smaller Stat Cards */}
              <div className="flex-1 grid grid-cols-2 lg:grid-cols-2 gap-3">
                <div className="bg-white border border-zinc-200/60 rounded-[16px] p-4 shadow-[0_4px_15px_-8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block w-14">PROFIT MARGIN</span>
                    <span className="bg-zinc-100 text-zinc-500 p-1 rounded-md text-[10px]">%</span>
                  </div>
                  <h3 className="text-xl font-black text-zinc-900 tracking-tight">{formatPercent(results.profitMargin)}</h3>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400 mt-1">NET MARGIN %</span>
                </div>

                <div className="bg-white border border-zinc-200/60 rounded-[16px] p-4 shadow-[0_4px_15px_-8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block w-14">ROI (INVENTORY)</span>
                    <span className="bg-zinc-100 text-zinc-500 p-1 rounded-md text-[10px]">📈</span>
                  </div>
                  <h3 className="text-xl font-black text-zinc-900 tracking-tight">{formatPercent(results.roi)}</h3>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400 mt-1">CAPITAL EFFICIENCY</span>
                </div>
              </div>
            </div>

            {/* Visualizer & Breakdowns */}
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
                Need Detailed Economics?
              </h4>
              <p className="text-[10px] font-medium text-zinc-400 leading-relaxed mb-4 max-w-[280px]">
                Head over to the Pro Calculator to factor in PPC spend, inbound shipping, and VAT thresholds.
              </p>
              
              <Link 
                href="/amazon-tools/profit-calculator"
                className="bg-orange-500 hover:bg-orange-600 text-white text-[9px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                Open Pro Calculator
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
