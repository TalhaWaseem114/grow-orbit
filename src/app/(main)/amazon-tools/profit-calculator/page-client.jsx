"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useAmazonEconomics } from '@/hooks/useAmazonEconomics';
import ResultExplanationBlock from '@/components/shared-calculator/ResultExplanationBlock';
import FbaSizeVisualizer from '@/components/shared-calculator/FbaSizeVisualizer';
import AssumptionsPanel from '@/components/shared-calculator/AssumptionsPanel';
import { ArrowLeft, Share2, FileDown, Box, Globe, Truck, Percent, Target } from 'lucide-react';
const ProfitDonutChart = dynamic(() => import('@/components/shared-calculator/ProfitDonutChart'), { ssr: false });
const ProductIntelligence = dynamic(() => import('@/components/shared-calculator/ProductIntelligence'), { ssr: false });
const CalculatorResourceHub = dynamic(() => import('@/components/shared-calculator/CalculatorResourceHub'), { ssr: false });

export default function ProfitCalculatorPage({ market }) {
  const { inputs, errors, results, handleInputChange, syncUrlParams, setAllInputs } = useAmazonEconomics(market);
  
  // Tabs for Forward vs Reverse Mode calculations
  const [calculationMode, setCalculationMode] = useState("forward"); // "forward" | "targetMargin" | "maxCost"
  const [isCopied, setIsCopied] = useState(false);

  // Parse values to print nicely
  const formatCurrency = (val) => `${results.currencySymbol}${val.toFixed(2)}`;
  const formatPercent = (val) => `${val.toFixed(1)}%`;

  // Trigger URL sync when primary parameters update
  useEffect(() => {
    syncUrlParams();
  }, [inputs.sellingPrice, inputs.productCost, inputs.weight, inputs.length, inputs.width, inputs.height, inputs.marketplace, inputs.ppcPercent]);

  // Sync calculations for reverse mode updates live
  useEffect(() => {
    if (calculationMode === "targetMargin") {
      handleInputChange("sellingPrice", results.targetPrice.toFixed(2));
    } else if (calculationMode === "maxCost") {
      // Landed cost = Sourcing + Shipping + Prep + Pack
      // Deduct shipping/prep/pack from resolved maxLandedCost to get target product cost
      const shipping = parseFloat(inputs.shippingToAmazon) || 0;
      const prep = parseFloat(inputs.prepCost) || 0;
      const pack = parseFloat(inputs.packagingCost) || 0;
      const resolvedProductCost = Math.max(0, results.maxLandedCost - shipping - prep - pack);
      handleInputChange("productCost", resolvedProductCost.toFixed(2));
    }
  }, [
    calculationMode,
    inputs.targetMargin,
    inputs.desiredProfit,
    results.targetPrice,
    results.maxLandedCost,
    inputs.shippingToAmazon,
    inputs.prepCost,
    inputs.packagingCost
  ]);

  // Share calculation handler
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
    "name": `Grow Orbit Amazon Profit & ROI Calculator - ${inputs.marketplace}`,
    "description": "Calculate FBA unit economics, margins, ROI, and break-even ad spends with forward and reverse calculators.",
    "url": "https://www.groworbitofficial.com/amazon-tools/profit-calculator"
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
              AMAZON <span className="text-orange-500">PROFIT CALCULATOR</span>
              <span className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ml-1">
                PRO
              </span>
            </h1>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
              OPTIMIZE PRICES, CALCULATE FORWARD ROI, AND SOLVE REVERSE TARGET COSTS.
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
            <button
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white transition-all font-black text-[9px] uppercase tracking-widest rounded-full shadow-sm cursor-pointer"
            >
              <FileDown size={10} className="text-orange-500" />
              EXPORT PDF REPORT
            </button>
          </div>
        </div>

        {/* 2-Column Split */}
        <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
          
          {/* Inputs Section */}
          <div className="w-full lg:w-[35%] space-y-5 flex-shrink-0">
            
            {/* Calculation Mode Tabs */}
            <div className="bg-white border border-zinc-200/60 p-1.5 rounded-2xl shadow-sm flex">
              <button
                onClick={() => setCalculationMode("forward")}
                className={`flex-1 py-2.5 text-center rounded-xl font-black text-[9px] uppercase tracking-widest transition-all cursor-pointer
                  ${calculationMode === "forward" ? "bg-zinc-900 text-white shadow-md" : "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50"}`}
              >
                Forward Profit
              </button>
              <button
                onClick={() => setCalculationMode("targetMargin")}
                className={`flex-1 py-2.5 text-center rounded-xl font-black text-[9px] uppercase tracking-widest transition-all cursor-pointer
                  ${calculationMode === "targetMargin" ? "bg-zinc-900 text-white shadow-md" : "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50"}`}
              >
                Target Price
              </button>
              <button
                onClick={() => setCalculationMode("maxCost")}
                className={`flex-1 py-2.5 text-center rounded-xl font-black text-[9px] uppercase tracking-widest transition-all cursor-pointer
                  ${calculationMode === "maxCost" ? "bg-zinc-900 text-white shadow-md" : "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50"}`}
              >
                Max Cost
              </button>
            </div>

            {/* Main Inputs Card */}
            <div className="bg-white p-6 rounded-[24px] border border-zinc-200/60 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between mb-4 border-b border-zinc-100 pb-2">
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900">
                  INPUT METRICS
                </h3>
                <div className="flex items-center gap-2.5">
                  {/* VAT Toggle */}
                  {(inputs.marketplace === "UK" || ["DE", "FR", "IT", "ES"].includes(inputs.marketplace)) && (
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inputs.vatToggle}
                        onChange={(e) => handleInputChange("vatToggle", e.target.checked)}
                        className="rounded border-zinc-350 accent-orange-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                      />
                      <span className="text-[9px] font-bold uppercase text-zinc-550">VAT ex.</span>
                    </label>
                  )}
                  {/* Marketplace */}
                  <select
                    value={inputs.marketplace}
                    onChange={(e) => handleInputChange("marketplace", e.target.value)}
                    className="text-[10px] bg-zinc-50 border border-zinc-200 rounded px-2 py-1 font-bold outline-none text-zinc-700 cursor-pointer focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors"
                  >
                    <option value="US">USA ($)</option>
                    <option value="UK">United Kingdom (£)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                
                {/* Selling Price - Disabled in Target Margin Mode */}
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 mb-1.5">
                    <Globe size={10} className="text-orange-500" /> SELLING PRICE
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-bold">{results.currencySymbol}</span>
                    <input
                      type="number"
                      disabled={calculationMode === "targetMargin"}
                      value={inputs.sellingPrice}
                      onChange={(e) => handleInputChange("sellingPrice", e.target.value)}
                      placeholder="30.00"
                      className="w-full pl-7 pr-3 py-2.5 bg-zinc-50 border border-zinc-200/80 rounded-xl text-sm text-zinc-900 font-bold outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed"
                    />
                  </div>
                  {calculationMode === "targetMargin" && (
                    <p className="text-[9px] text-orange-600 font-semibold mt-1">Computed live based on desired target margin %.</p>
                  )}
                </div>

                {/* Product Cost - Disabled in Max Cost Mode */}
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 mb-1.5">
                    <Box size={10} className="text-orange-500" /> PRODUCT SOURCING COST
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-bold">{results.currencySymbol}</span>
                    <input
                      type="number"
                      disabled={calculationMode === "maxCost"}
                      value={inputs.productCost}
                      onChange={(e) => handleInputChange("productCost", e.target.value)}
                      placeholder="8.00"
                      className="w-full pl-7 pr-3 py-2.5 bg-zinc-50 border border-zinc-200/80 rounded-xl text-sm text-zinc-900 font-bold outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed"
                    />
                  </div>
                  {calculationMode === "maxCost" && (
                    <p className="text-[9px] text-orange-600 font-semibold mt-1">Computed live based on desired target profit.</p>
                  )}
                </div>

                {/* Target Margin Input - Active only in Target Margin Tab */}
                {calculationMode === "targetMargin" && (
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 mb-1.5">
                      <Target size={10} className="text-orange-500" /> DESIRED TARGET MARGIN (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={inputs.targetMargin}
                        onChange={(e) => handleInputChange("targetMargin", e.target.value)}
                        placeholder="30"
                        className="w-full pl-3 pr-7 py-2.5 bg-zinc-50 border border-orange-500/30 rounded-xl text-sm text-zinc-900 font-bold outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-bold">%</span>
                    </div>
                  </div>
                )}

                {/* Desired Profit Input - Active only in Max Cost Tab */}
                {calculationMode === "maxCost" && (
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 mb-1.5">
                      <Target size={10} className="text-orange-500" /> DESIRED UNIT NET PROFIT
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-bold">{results.currencySymbol}</span>
                      <input
                        type="number"
                        value={inputs.desiredProfit}
                        onChange={(e) => handleInputChange("desiredProfit", e.target.value)}
                        placeholder="5.00"
                        className="w-full pl-7 pr-3 py-2.5 bg-zinc-50 border border-orange-500/30 rounded-xl text-sm text-zinc-900 font-bold outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* Shipping cost to Amazon */}
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 mb-1.5">
                    <Truck size={10} className="text-orange-500" /> SHIPPING TO AMAZON
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-bold">{results.currencySymbol}</span>
                    <input
                      type="number"
                      value={inputs.shippingToAmazon}
                      onChange={(e) => handleInputChange("shippingToAmazon", e.target.value)}
                      placeholder="1.50"
                      className="w-full pl-7 pr-3 py-2.5 bg-zinc-50 border border-zinc-200/80 rounded-xl text-sm text-zinc-900 font-bold outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 mb-1.5">
                    <Percent size={10} className="text-orange-500" /> FBA PRODUCT CATEGORY
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
                </div>

                {/* Advanced PPC / returns */}
                <div className="pt-4 border-t border-zinc-100 grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">PPC ACOS (%)</label>
                    <input
                      type="number"
                      value={inputs.ppcPercent}
                      onChange={(e) => handleInputChange("ppcPercent", e.target.value)}
                      placeholder="10"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200/80 rounded-lg text-xs text-zinc-900 font-bold outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Returns (%)</label>
                    <input
                      type="number"
                      value={inputs.returnsPercent}
                      onChange={(e) => handleInputChange("returnsPercent", e.target.value)}
                      placeholder="2"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200/80 rounded-lg text-xs text-zinc-900 font-bold outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:outline-none transition-colors"
                    />
                  </div>
                </div>

              </div>
            </div>
            
            <AssumptionsPanel marketplace={inputs.marketplace} />
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
                  NET PROFIT (PER UNIT)
                </span>
                <h3 className={`text-[40px] font-black ${results.netProfit >= 0 ? "text-emerald-500" : "text-red-500"} leading-none mb-1 tracking-tight`} style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {formatCurrency(results.netProfit)}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Total Costs: {formatCurrency(results.totalCosts)}</span>
                  <div className="flex items-center gap-0.5 ml-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  </div>
                </div>
              </div>

              {/* Smaller Stat Cards */}
              <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-3">
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

                <div className="bg-white border border-zinc-200/60 rounded-[16px] p-4 shadow-[0_4px_15px_-8px_rgba(0,0,0,0.02)] flex flex-col justify-between col-span-2 lg:col-span-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block w-16">BREAK-EVEN PRICE</span>
                    <span className="bg-zinc-100 text-zinc-500 p-1 rounded-md text-[10px]">⚖️</span>
                  </div>
                  <h3 className="text-xl font-black text-zinc-900 tracking-tight">{formatCurrency(results.breakEvenPrice)}</h3>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400 mt-1">MIN. SELLING PRICE</span>
                </div>
              </div>
            </div>

            {/* Visualizer & Breakdowns */}
            <div className="flex flex-col gap-4">
              <ProfitDonutChart results={results} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FbaSizeVisualizer results={results} marketplace={inputs.marketplace} />
                <ResultExplanationBlock results={results} />
              </div>
            </div>

            {/* Bottom Section: Intelligence & Sourcing */}
            <ProductIntelligence results={results} inputs={inputs} />

          </div>
        </div>

        {/* Topical Resource Hub */}
        <CalculatorResourceHub type="profit" />

      </div>
    </div>
  );
}
