"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useAmazonEconomics } from '@/hooks/useAmazonEconomics';
import ResultExplanationBlock from '@/components/shared-calculator/ResultExplanationBlock';
import FbaSizeVisualizer from '@/components/shared-calculator/FbaSizeVisualizer';
import AssumptionsPanel from '@/components/shared-calculator/AssumptionsPanel';
import { ArrowLeft, Share2, Box, Home, Truck, Globe, Target } from 'lucide-react';

// Lazy-load below-fold resource hub
const CalculatorResourceHub = dynamic(() => import('@/components/shared-calculator/CalculatorResourceHub'), { ssr: false });

export default function FbaVsfbmVs3plPage({ market }) {
  const { inputs, errors, results, handleInputChange, syncUrlParams } = useAmazonEconomics(market);
  const [isCopied, setIsCopied] = useState(false);

  const formatCurrency = (val) => `${results.currencySymbol}${val.toFixed(2)}`;
  
  // Calculate FBM and 3PL margins/ROIs
  const fbmMargin = results.sellingPrice > 0 ? (results.fbmProfit / results.sellingPrice) * 100 : 0;
  const fbmRoi = results.landedCost > 0 ? (results.fbmProfit / results.landedCost) * 100 : 0;

  const tplMargin = results.sellingPrice > 0 ? (results.tplProfit / results.sellingPrice) * 100 : 0;
  const tplRoi = results.landedCost > 0 ? (results.tplProfit / results.landedCost) * 100 : 0;

  useEffect(() => {
    syncUrlParams();
  }, [inputs.sellingPrice, inputs.productCost, inputs.weight, inputs.length, inputs.width, inputs.height, inputs.fbmFulfillment, inputs.tplFulfillment, inputs.tplStorage, inputs.marketplace]);

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
    "name": `Grow Orbit FBA vs FBM vs 3PL Calculator - ${inputs.marketplace}`,
    "description": "Compare net profits and returns across Amazon FBA, FBM, and third-party logistics (3PL) side-by-side.",
    "url": "https://www.groworbitofficial.com/amazon-tools/fba-vs-fbm-vs-3pl"
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      
      {/* Glow Visuals */}
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
              FBA <span className="text-orange-500">VS FBM VS 3PL</span>
            </h1>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
              COMPARE LOGISTICS AND DETERMINE WHICH FULFILLMENT STRATEGY MAXIMIZES PROFIT.
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
          <div className="w-full lg:w-[35%] flex-shrink-0 space-y-4">
            
            {/* Core Product Input */}
            <div className="bg-white p-6 rounded-[24px] border border-zinc-200/60 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-100">
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900">
                  PRODUCT SPECS
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
                </div>

                {/* Landed Cost */}
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 mb-1.5">
                    <Target size={10} className="text-orange-500" /> LANDED COST
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-bold">{results.currencySymbol}</span>
                    <input
                      type="number"
                      value={inputs.productCost}
                      onChange={(e) => handleInputChange("productCost", e.target.value)}
                      placeholder="8.00"
                      className="w-full pl-7 pr-3 py-2.5 bg-zinc-50 border border-zinc-200/80 rounded-xl text-sm text-zinc-900 font-bold outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Pkg L (in)</label>
                    <input
                      type="number"
                      value={inputs.length}
                      onChange={(e) => handleInputChange("length", e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200/80 rounded-lg text-xs text-zinc-900 font-bold outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors text-center"
                    />
                  </div>
                  <div>
                    <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Pkg W (in)</label>
                    <input
                      type="number"
                      value={inputs.width}
                      onChange={(e) => handleInputChange("width", e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200/80 rounded-lg text-xs text-zinc-900 font-bold outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors text-center"
                    />
                  </div>
                  <div>
                    <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Pkg H (in)</label>
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

            {/* FBM Logistics Card */}
            <div className="bg-white p-6 rounded-[24px] border border-zinc-200/60 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.03)]">
              <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 mb-4 pb-2 border-b border-zinc-100 flex items-center gap-1.5">
                <Home size={14} className="text-indigo-500" />
                FBM (MERCHANT) LOGISTICS
              </h3>
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 mb-1.5">
                  Pick, Pack & Shipping ({results.currencySymbol}/unit)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-bold">{results.currencySymbol}</span>
                  <input
                    type="number"
                    value={inputs.fbmFulfillment}
                    onChange={(e) => handleInputChange("fbmFulfillment", e.target.value)}
                    placeholder="4.50"
                    className="w-full pl-7 pr-3 py-2.5 bg-zinc-50 border border-zinc-200/80 rounded-xl text-sm text-zinc-900 font-bold outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* 3PL Logistics Card */}
            <div className="bg-white p-6 rounded-[24px] border border-zinc-200/60 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.03)]">
              <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 mb-4 pb-2 border-b border-zinc-100 flex items-center gap-1.5">
                <Truck size={14} className="text-emerald-500" />
                3PL LOGISTICS
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Pick/Pack/Ship ({results.currencySymbol})</label>
                  <input
                    type="number"
                    value={inputs.tplFulfillment}
                    onChange={(e) => handleInputChange("tplFulfillment", e.target.value)}
                    className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200/80 rounded-xl text-sm text-zinc-900 font-bold outline-none focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Unit Storage ({results.currencySymbol})</label>
                  <input
                    type="number"
                    value={inputs.tplStorage}
                    onChange={(e) => handleInputChange("tplStorage", e.target.value)}
                    className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200/80 rounded-xl text-sm text-zinc-900 font-bold outline-none focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Outputs Section */}
          <div className="w-full lg:w-[65%] space-y-4">
            
            {/* 3-Way Grid comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* FBA Scorecard */}
              <div className="bg-white p-5 rounded-[20px] border-2 border-orange-500/30 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.02)] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-4 right-4 text-orange-500 bg-orange-500/10 p-1.5 rounded-lg">
                  <span className="text-[12px] leading-none block">FBA</span>
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-orange-500 block mb-1">AMAZON FBA NET</span>
                  <h3 className="text-[32px] leading-none font-black text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {formatCurrency(results.fbaProfit)}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-100 text-[10px] text-zinc-500 flex justify-between">
                  <span>Margin: <strong className="text-zinc-800">{results.profitMargin.toFixed(1)}%</strong></span>
                  <span>ROI: <strong className="text-zinc-800">{results.roi.toFixed(1)}%</strong></span>
                </div>
              </div>

              {/* FBM Scorecard */}
              <div className="bg-white p-5 rounded-[20px] border border-zinc-200/60 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.02)] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-4 right-4 text-indigo-500 bg-indigo-500/10 p-1.5 rounded-lg">
                  <span className="text-[12px] leading-none block">FBM</span>
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-indigo-500 block mb-1">FBM MERCHANT NET</span>
                  <h3 className="text-[32px] leading-none font-black text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {formatCurrency(results.fbmProfit)}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-100 text-[10px] text-zinc-500 flex justify-between">
                  <span>Margin: <strong className="text-zinc-800">{fbmMargin.toFixed(1)}%</strong></span>
                  <span>ROI: <strong className="text-zinc-800">{fbmRoi.toFixed(1)}%</strong></span>
                </div>
              </div>

              {/* 3PL Scorecard */}
              <div className="bg-white p-5 rounded-[20px] border border-zinc-200/60 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.02)] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-4 right-4 text-emerald-500 bg-emerald-500/10 p-1.5 rounded-lg">
                  <span className="text-[12px] leading-none block">3PL</span>
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 block mb-1">3PL OUTSOURCED NET</span>
                  <h3 className="text-[32px] leading-none font-black text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {formatCurrency(results.tplProfit)}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-100 text-[10px] text-zinc-500 flex justify-between">
                  <span>Margin: <strong className="text-zinc-800">{tplMargin.toFixed(1)}%</strong></span>
                  <span>ROI: <strong className="text-zinc-800">{tplRoi.toFixed(1)}%</strong></span>
                </div>
              </div>

            </div>

            {/* Explanations, Size details, and Assumptions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResultExplanationBlock results={results} />
              <FbaSizeVisualizer results={results} marketplace={inputs.marketplace} />
            </div>
            
            <AssumptionsPanel marketplace={inputs.marketplace} />

          </div>

        </div>

        {/* Topical Resource Hub */}
        <CalculatorResourceHub type="general" />

      </div>
    </div>
  );
}
