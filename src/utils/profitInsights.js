/**
 * Classifies the profit margin into specific risk/health categories.
 */
export function classifyProfitMargin(margin) {
  if (margin < 10) return { label: "High Risk Product", level: "red" };
  if (margin < 20) return { label: "Low Margin Product", level: "yellow" };
  if (margin <= 35) return { label: "Healthy Product", level: "green" };
  return { label: "High Potential Product", level: "green" };
}

/**
 * Calculates a weighted health score (0-100) based on unit economics.
 */
export function calculateHealthScore(margin, netProfit, amazonFeePercent, ppcCost, sellingPrice) {
  let score = 0;

  // Margin Contribution (Max 40 points)
  // Target: 30%+ margin gets full points
  score += Math.min(40, Math.max(0, (margin / 30) * 40));

  // Net Profit Absolute Value Contribution (Max 30 points)
  // Target: $15+ net profit per unit gets full points
  score += Math.min(30, Math.max(0, (netProfit / 15) * 30));

  // Fee Efficiency Contribution (Max 20 points)
  // Target: Lower Amazon fee percentage is better (base 15% is standard)
  const feeScore = 20 - ((amazonFeePercent - 15) * 1.5);
  score += Math.min(20, Math.max(0, feeScore));

  // PPC Dependency Risk (Max 10 points)
  // Target: PPC cost should be < 15% of selling price for full points
  if (sellingPrice > 0) {
    const ppcRatio = (ppcCost / sellingPrice) * 100;
    const ppcScore = 10 - (Math.max(0, ppcRatio - 5) * 1);
    score += Math.min(10, Math.max(0, ppcScore));
  } else {
    score += 10;
  }

  return Math.round(Math.min(100, Math.max(0, score)));
}

/**
 * Generates actionable optimization recommendations based on inputs and KPIs.
 */
export function generateRecommendations(inputs, results) {
  const { productCost, shippingCost, ppcCost, sellingPrice, amazonFeePercent } = inputs;
  const { netProfit, profitMargin, breakEvenPrice, roi } = results;
  const recs = [];

  // Edge Case: Nothing entered yet
  if (sellingPrice <= 0) {
    return ["Enter your selling price to unlock actionable insights."];
  }

  // Risk 1: Unprofitable
  if (netProfit < 0) {
    recs.push(`Critical Risk: Product is operating at a loss. You must raise your price above $${breakEvenPrice.toFixed(2)} immediately.`);
  }

  // Risk 2: High Amazon Fee Dependency
  const feeAmount = (sellingPrice * amazonFeePercent) / 100;
  if (feeAmount > productCost + shippingCost) {
    recs.push(`Fee Alert: Amazon takes more in referral fees ($${feeAmount.toFixed(2)}) than your COGS. Verify you are in the correct fee category.`);
  }

  // Risk 3: Low Margin / Low ROI
  if (netProfit > 0 && profitMargin < 15) {
    const targetPrice = (productCost + shippingCost + ppcCost) / (1 - (amazonFeePercent/100) - 0.20); // Targeting 20% margin
    if (targetPrice > sellingPrice && isFinite(targetPrice)) {
      recs.push(`Increase selling price to $${targetPrice.toFixed(2)} to achieve a baseline 20% healthy margin.`);
    }
    recs.push("Investigate 3PL alternatives or negotiate with suppliers to reduce COGS and shipping.");
  } else if (netProfit > 0 && roi < 40) {
    recs.push(`Capital Warning: ROI is low (${roi.toFixed(1)}%). Consider optimizing unit sourcing or consolidation of shipments.`);
  }

  // Risk 4: High PPC Dependency
  if (sellingPrice > 0 && ppcCost / sellingPrice > 0.15) {
    recs.push("PPC dependency is high (>15% of price). Optimize ad campaigns for lower ACOS or rely more on organic ranking.");
  }

  // Positive Scaling & ROI
  if (roi >= 100 && netProfit > 0) {
    recs.push(`Excellent ROI (${roi.toFixed(0)}%): This product is highly capital efficient. Scale inventory and PPC budget aggressively.`);
  } else if (profitMargin >= 25 && netProfit > 5) {
    recs.push("Strong unit economics. Consider increasing PPC budget aggressively to capture market share.");
    recs.push("Healthy product profile. Ideal candidate for external traffic scaling (Google Ads/TikTok).");
  }

  if (recs.length === 0) {
    recs.push("Unit economics are stable. Focus on conversion rate optimization (CRO) to maximize volume.");
  }

  return recs.slice(0, 4); // Return max 4
}

