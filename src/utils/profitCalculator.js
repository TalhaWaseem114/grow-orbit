/**
 * Calculates the total cost of selling a product on Amazon.
 */
export function calculateTotalCost(productCost, shippingCost, ppcCost, sellingPrice, amazonFeePercent) {
  const amazonFeeAmount = (sellingPrice * amazonFeePercent) / 100;
  return productCost + shippingCost + ppcCost + amazonFeeAmount;
}

/**
 * Calculates the net profit.
 */
export function calculateNetProfit(sellingPrice, totalCost) {
  return sellingPrice - totalCost;
}

/**
 * Calculates the profit margin percentage.
 */
export function calculateProfitMargin(netProfit, sellingPrice) {
  if (sellingPrice <= 0) return 0;
  return (netProfit / sellingPrice) * 100;
}

/**
 * Calculates the break-even price (the minimum price to make 0 profit).
 */
export function calculateBreakEvenPrice(productCost, shippingCost, ppcCost, amazonFeePercent) {
  const feeDecimal = amazonFeePercent / 100;
  if (feeDecimal >= 1) return 0; // Avoid divide by zero or negative if fee >= 100%
  const fixedCosts = productCost + shippingCost + ppcCost;
  return fixedCosts / (1 - feeDecimal);
}

/**
 * Calculates the Return on Investment (ROI) based on inventory costs.
 * ROI = (Net Profit / (Product Cost + Shipping Cost)) * 100
 */
export function calculateROI(netProfit, productCost, shippingCost) {
  const capitalInvested = productCost + shippingCost;
  if (capitalInvested <= 0) return 0;
  return (netProfit / capitalInvested) * 100;
}

/**
 * Generates a detailed percentage and absolute breakdown of the selling price.
 */
export function calculateBreakdown(productCost, shippingCost, ppcCost, sellingPrice, amazonFeePercent, netProfit) {
  if (sellingPrice <= 0) {
    return {
      sourcing: { value: 0, percentage: 0 },
      shipping: { value: 0, percentage: 0 },
      amazonFee: { value: 0, percentage: 0 },
      ppc: { value: 0, percentage: 0 },
      profit: { value: 0, percentage: 0 },
    };
  }

  const amazonFee = (sellingPrice * amazonFeePercent) / 100;
  const rawProfit = netProfit;
  
  // Percentages relative to selling price
  const pSourcing = (productCost / sellingPrice) * 100;
  const pShipping = (shippingCost / sellingPrice) * 100;
  const pAmazonFee = (amazonFee / sellingPrice) * 100;
  const pPpc = (ppcCost / sellingPrice) * 100;
  const pProfit = (rawProfit / sellingPrice) * 100;

  return {
    sourcing: { value: productCost, percentage: Math.max(0, pSourcing) },
    shipping: { value: shippingCost, percentage: Math.max(0, pShipping) },
    amazonFee: { value: amazonFee, percentage: Math.max(0, pAmazonFee) },
    ppc: { value: ppcCost, percentage: Math.max(0, pPpc) },
    profit: { value: Math.max(0, rawProfit), percentage: Math.max(0, pProfit) },
  };
}

