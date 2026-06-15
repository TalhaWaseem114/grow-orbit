"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useAmazonEconomics } from '@/hooks/useAmazonEconomics';
import FbaSizeVisualizer from '@/components/shared-calculator/FbaSizeVisualizer';
import ResultExplanationBlock from '@/components/shared-calculator/ResultExplanationBlock';
import AssumptionsPanel from '@/components/shared-calculator/AssumptionsPanel';
import { ArrowLeft, Share2, Globe, Box, Target, Percent } from 'lucide-react';

// Lazy-load below-fold resource hub
const CalculatorResourceHub = dynamic(() => import('@/components/shared-calculator/CalculatorResourceHub'), { ssr: false });

export default function FbaFeeCalculatorPage({ market }) {
  const { inputs, errors, results, handleInputChange, syncUrlParams } = useAmazonEconomics(market);
  const [isCopied, setIsCopied] = React.useState(false);

  const formatCurrency = (val) => `${results.currencySymbol}${val.toFixed(2)}`;
  const formatPercent = (val) => `${val.toFixed(1)}%`;

  useEffect(() => {
    syncUrlParams();
  }, [inputs.sellingPrice, inputs.length, inputs.width, inputs.height, inputs.weight, inputs.marketplace, inputs.season]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleClear = () => {
    handleInputChange("sellingPrice", "");
  };

  // Schema generation
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": `Grow Orbit Amazon FBA Fee Calculator - ${inputs.marketplace}`,
    "description": "Determine your Amazon FBA size tier, fulfillment costs, storage fees, and referral commission fees.",
    "url": "https://groworbit.com/amazon-tools/fba-fee-calculator"
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
              AMAZON FBA <span className="text-orange-500">FEE CALCULATOR</span>
            </h1>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
              DETERMINE YOUR FBA SIZE TIER, FULFILLMENT, STORAGE, AND REFERRAL FEES.
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
                  PACKAGE PARAMETERS
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
                Enter your product dimensions to calculate FBA fees.
              </p>

              <div className="space-y-4">
                
                {/* Selling Price */}
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 mb-1.5">
                    <Globe size={10} className="text-orange-500" /> PRODUCT SELLING PRICE
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

                {/* Category */}
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 mb-1.5">
                    <Percent size={10} className="text-orange-500" /> CATEGORY (REFERRAL FEE)
                  </label>
                  <select
                    value={inputs.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200/80 rounded-xl text-[11px] text-zinc-900 font-bold outline-none cursor-pointer focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors"
                  >
                    <option value="home-kitchen">Home & Kitchen (15%)</option>
                    <option value="electronics">Consumer Electronics (8%)</option>
                    <option value="apparel">Apparel & Accessories (17%)</option>
                    <option value="toys-games">Toys & Games (15%)</option>
                    <option value="beauty-personal-care">Beauty & Personal Care (15%)</option>
                    <option value="books">Books & Media (15%)</option>
                    <option value="sports-outdoors">Sports & Outdoors (15%)</option>
                    <option value="office-products">Office Products (15%)</option>
                    <option value="grocery-gourmet">Grocery & Gourmet Food (15%)</option>
                    <option value="health-household">Health & Household (15%)</option>
                    <option value="automotive">Automotive (12%)</option>
                    <option value="tools-home-improvement">Tools & Home Improvement (15%)</option>
                  </select>
                </div>

                {/* Package Dimensions */}
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
                </div>

                {/* Storage Season Selector */}
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 mb-1.5 mt-2">
                    STORAGE CALENDAR SEASON
                  </label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      onClick={() => handleInputChange("season", "janSep")}
                      className={`py-2 px-3 text-center rounded-xl font-bold text-[9px] uppercase tracking-widest transition-all cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2
                        ${inputs.season === "janSep" ? "bg-zinc-900 border-zinc-900 text-white shadow-md" : "bg-white border-zinc-200/80 text-zinc-500 hover:bg-zinc-50"}`}
                    >
                      Standard (Jan-Sep)
                    </button>
                    <button
                      onClick={() => handleInputChange("season", "octDec")}
                      className={`py-2 px-3 text-center rounded-xl font-bold text-[9px] uppercase tracking-widest transition-all cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2
                        ${inputs.season === "octDec" ? "bg-zinc-900 border-zinc-900 text-white shadow-md" : "bg-white border-zinc-200/80 text-zinc-500 hover:bg-zinc-50"}`}
                    >
                      Peak Holiday (Oct-Dec)
                    </button>
                  </div>
                </div>

              </div>

              <button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-widest text-[11px] py-4 rounded-[14px] transition-colors shadow-lg shadow-orange-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2">
                CALCULATE FEES
              </button>
            </div>

            <div className="mt-4">
              <AssumptionsPanel marketplace={inputs.marketplace} />
            </div>
          </div>

          {/* Outputs Section */}
          <div className="w-full lg:w-[65%] space-y-4">
            
            {/* Main FBA Fee Scorecard Grid */}
            <div className="bg-white p-6 rounded-[24px] border border-zinc-200/60 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.03)] space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 pb-2 border-b border-zinc-100">
                FEE ALLOCATION BREAKDOWN
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Total Amazon Fees */}
                <div className="bg-zinc-50 p-5 rounded-[20px] border border-zinc-150 relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-orange-500 bg-orange-500/10 p-1.5 rounded-lg">
                    <span className="text-[14px] leading-none block">$</span>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-1">TOTAL AMAZON FEES</span>
                  <h4 className="text-[32px] font-black text-orange-500 leading-none tracking-tight mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {formatCurrency(results.totalAmazonFees)}
                  </h4>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    {formatPercent((results.totalAmazonFees / results.sellingPrice) * 100)} of selling price
                  </span>
                </div>

                {/* Size Tier Resolved */}
                <div className="bg-zinc-50 p-5 rounded-[20px] border border-zinc-150">
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-1">RESOLVED FBA TIER</span>
                  <h4 className="text-xl font-black text-zinc-900 uppercase tracking-tight mb-2">{results.tierName}</h4>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">
                    BILLABLE WEIGHT: {results.billableWeight.toFixed(2)} lbs
                  </span>
                </div>

              </div>

              {/* Sub-fees lists */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-xs text-zinc-650 py-2 border-b border-zinc-100/50">
                  <span className="font-bold">Referral Category Fee ({results.referralPercent}%)</span>
                  <span className="font-black text-zinc-900 text-sm">{formatCurrency(results.referralFee)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-zinc-650 py-2 border-b border-zinc-100/50">
                  <span className="font-bold">FBA Fulfillment Fee</span>
                  <span className="font-black text-zinc-900 text-sm">{formatCurrency(results.fbaFee)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-zinc-650 py-2 border-b border-zinc-100/50">
                  <span className="font-bold">Estimated Inbound Placement Fee</span>
                  <span className="font-black text-zinc-900 text-sm">{formatCurrency(results.inboundPlacementFee)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-zinc-650 py-2">
                  <span className="font-bold">Monthly Unit Storage Fee ({inputs.season === "octDec" ? "Peak" : "Standard"})</span>
                  <span className="font-black text-zinc-900 text-sm">{formatCurrency(results.storageFee)}</span>
                </div>
              </div>

            </div>

            {/* Visuals */}
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
                Evaluate Profitability
              </h4>
              <p className="text-[10px] font-medium text-zinc-400 leading-relaxed mb-4 max-w-[280px]">
                You know the fees, now input your sourcing cost to calculate margins and ROI in the Profit Calculator.
              </p>
              
              <Link 
                href="/amazon-tools/profit-calculator"
                className="bg-orange-500 hover:bg-orange-600 text-white text-[9px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                Go To Profit Calculator
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
