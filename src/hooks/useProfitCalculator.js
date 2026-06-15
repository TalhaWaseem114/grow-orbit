import { useMemo } from 'react';
import {
  calculateTotalCost,
  calculateNetProfit,
  calculateProfitMargin,
  calculateBreakEvenPrice,
  calculateROI,
  calculateBreakdown
} from '../utils/profitCalculator';
import { 
  classifyProfitMargin, 
  calculateHealthScore, 
  generateRecommendations 
} from '../utils/profitInsights';
import { isSafeNumber } from '../utils/validators';

export function useProfitCalculator(parsedInputs) {
  const { productCost, sellingPrice, shippingCost, amazonFeePercent, ppcCost } = parsedInputs;

  const results = useMemo(() => {
    const totalCost = calculateTotalCost(productCost, shippingCost, ppcCost, sellingPrice, amazonFeePercent);
    const netProfit = calculateNetProfit(sellingPrice, totalCost);
    const profitMargin = calculateProfitMargin(netProfit, sellingPrice);
    const breakEvenPrice = calculateBreakEvenPrice(productCost, shippingCost, ppcCost, amazonFeePercent);
    const roi = calculateROI(netProfit, productCost, shippingCost);
    const breakdown = calculateBreakdown(productCost, shippingCost, ppcCost, sellingPrice, amazonFeePercent, netProfit);

    // Format safely
    const formattedResults = {
      totalCost: isSafeNumber(totalCost) ? totalCost : 0,
      netProfit: isSafeNumber(netProfit) ? netProfit : 0,
      profitMargin: isSafeNumber(profitMargin) ? profitMargin : 0,
      breakEvenPrice: isSafeNumber(breakEvenPrice) ? breakEvenPrice : 0,
      roi: isSafeNumber(roi) ? roi : 0,
      breakdown: breakdown,
    };

    // Intelligence Layer
    const classification = classifyProfitMargin(formattedResults.profitMargin);
    const healthScore = calculateHealthScore(
      formattedResults.profitMargin, 
      formattedResults.netProfit, 
      amazonFeePercent, 
      ppcCost, 
      sellingPrice
    );
    const recommendations = generateRecommendations(parsedInputs, formattedResults);

    return {
      ...formattedResults,
      insights: {
        classification,
        healthScore,
        recommendations
      }
    };
  }, [productCost, sellingPrice, shippingCost, amazonFeePercent, ppcCost]);

  return results;
}

