/**
 * Validates the selling price to ensure it is greater than 0.
 * A product cannot be sold for 0 or negative values in our calculator context.
 */
export function isValidSellingPrice(price) {
  return typeof price === 'number' && price > 0;
}

/**
 * Validates the Amazon fee percentage to ensure it is within a logical bound.
 * It cannot be negative and should logically not exceed 100%.
 */
export function isValidAmazonFee(feePercent) {
  return typeof feePercent === 'number' && feePercent >= 0 && feePercent <= 100;
}

/**
 * Validates costs (product cost, shipping cost, ppc cost).
 * Costs cannot be negative.
 */
export function isValidCost(cost) {
  return typeof cost === 'number' && cost >= 0;
}

/**
 * Ensures a value is a valid safe number (not NaN or Infinity).
 */
export function isSafeNumber(val) {
  return typeof val === 'number' && !Number.isNaN(val) && Number.isFinite(val);
}
