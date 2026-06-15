import { getFeeTable, REFERRAL_CATEGORIES } from '../data/fees/amazonFeeTables';

/**
 * Standardizes dimensions (Length, Width, Height) by sorting them descending.
 * Longest side = Length, Median side = Width, Shortest side = Height.
 */
export function getStandardDimensions(l, w, h) {
  const sorted = [parseFloat(l) || 0, parseFloat(w) || 0, parseFloat(h) || 0].sort((a, b) => b - a);
  return {
    length: sorted[0],
    width: sorted[1],
    height: sorted[2]
  };
}

/**
 * Resolves FBA Size Tier, billable weight, and warning triggers based on package size and weight.
 */
export function resolveSizeTierAndWeight(inputs, feeTable) {
  const { length, width, height } = getStandardDimensions(inputs.length, inputs.width, inputs.height);
  const unitWeight = parseFloat(inputs.weight) || 0;

  // Calculate volumetric (dimensional) weight
  const volume = length * width * height;
  const dimWeight = volume / feeTable.meta.dimDivisor;

  // Resolve size tier
  let resolvedTier = null;
  for (const tier of feeTable.sizeTiers) {
    if (
      length <= tier.maxLongSide &&
      width <= tier.maxMedianSide &&
      height <= tier.maxShortSide &&
      unitWeight <= tier.maxWeight
    ) {
      resolvedTier = tier;
      break;
    }
  }

  // Fallback to XXL/Bulky default if no match
  const tierName = resolvedTier ? resolvedTier.name : "Extra Large Bulky";
  const isStandard = resolvedTier ? resolvedTier.isStandard : false;

  // Billable weight rule: Standard sizes use max(unit, dim) only if weight > 1 lb (or rather, Small Standard uses unit weight only)
  let billableWeight = unitWeight;
  if (tierName === "Small Standard") {
    billableWeight = unitWeight;
  } else {
    billableWeight = Math.max(unitWeight, dimWeight);
  }

  // Bracket warnings (check if within 5% of crossing to the next size or weight tier limits)
  const warnings = [];
  if (resolvedTier) {
    const boundaryBuffer = 0.95; // 5% buffer
    if (length >= resolvedTier.maxLongSide * boundaryBuffer) {
      warnings.push(`Length (${length.toFixed(1)}") is within 5% of the limit (${resolvedTier.maxLongSide}") for ${resolvedTier.name}. Exceeding this triggers a larger size tier.`);
    }
    if (width >= resolvedTier.maxMedianSide * boundaryBuffer) {
      warnings.push(`Width (${width.toFixed(1)}") is within 5% of the limit (${resolvedTier.maxMedianSide}") for ${resolvedTier.name}.`);
    }
    if (height >= resolvedTier.maxShortSide * boundaryBuffer) {
      warnings.push(`Height (${height.toFixed(1)}") is within 5% of the limit (${resolvedTier.maxShortSide}") for ${resolvedTier.name}.`);
    }
    if (unitWeight >= resolvedTier.maxWeight * boundaryBuffer) {
      warnings.push(`Weight (${unitWeight.toFixed(2)} lbs) is within 5% of the size limit (${resolvedTier.maxWeight} lbs) for ${resolvedTier.name}.`);
    }
  }

  return {
    tierName,
    isStandard,
    dimensions: { length, width, height, volume },
    unitWeight,
    dimWeight,
    billableWeight,
    warnings
  };
}

/**
 * Calculates FBA storage fees.
 */
export function calculateStorageFees(dimensions, isStandard, feeTable) {
  const cubicVolume = (dimensions.length * dimensions.width * dimensions.height) / 1728;
  const rates = isStandard ? feeTable.storageRates.standard : feeTable.storageRates.bulky;

  const storageJanSep = cubicVolume * rates.janSep;
  const storageOctDec = cubicVolume * rates.octDec;

  return {
    cubicVolume,
    storageJanSep,
    storageOctDec,
    storageStandard: storageJanSep, // default display rate
    storagePeak: storageOctDec
  };
}

/**
 * Calculates referral fees based on selling price and selected category.
 */
export function calculateReferralFee(sellingPrice, categorySlug) {
  const category = REFERRAL_CATEGORIES.find(c => c.slug === categorySlug);
  const percent = category ? category.percentage : 15;
  const referralFee = sellingPrice * (percent / 100);
  return {
    referralPercent: percent,
    referralFee
  };
}

/**
 * Calculates inbound placement fees.
 */
export function calculateInboundPlacement(billableWeight, isStandard, feeTable) {
  if (!isStandard) {
    return feeTable.inboundPlacement.bulky;
  }
  
  const rules = feeTable.inboundPlacement.standard;
  for (const rule of rules) {
    if (billableWeight <= rule.maxWeight) {
      return rule.fee;
    }
  }
  return rules[rules.length - 1].fee;
}

/**
 * Main calculation engine function for Forward Profit, Reverse Profit, and Comparison.
 */
export function runEconomicsEngine(inputs) {
  const feeTable = getFeeTable({ marketplace: inputs.marketplace, year: 2026 });
  const { currencySymbol } = feeTable.meta;

  // 1. Resolve size tier & weights
  const sizeResolution = resolveSizeTierAndWeight(inputs, feeTable);
  const { tierName, isStandard, billableWeight, warnings, dimWeight, unitWeight } = sizeResolution;

  const sellingPrice = parseFloat(inputs.sellingPrice) || 0;
  const productCost = parseFloat(inputs.productCost) || 0;
  const shippingToAmazon = parseFloat(inputs.shippingToAmazon) || 0;
  const prepCost = parseFloat(inputs.prepCost) || 0;
  const packagingCost = parseFloat(inputs.packagingCost) || 0;
  const ppcPercent = parseFloat(inputs.ppcPercent) || 0;
  const returnsPercent = parseFloat(inputs.returnsPercent) || 0;
  const season = inputs.season || "janSep"; // "janSep" or "octDec"

  // 2. FBA Fees
  const fbaFee = feeTable.getFulfillmentFee(tierName, billableWeight, sellingPrice);
  const storageDetails = calculateStorageFees(sizeResolution.dimensions, isStandard, feeTable);
  const storageFee = season === "octDec" ? storageDetails.storagePeak : storageDetails.storageStandard;
  
  const inboundPlacementFee = calculateInboundPlacement(billableWeight, isStandard, feeTable);
  const { referralPercent, referralFee } = calculateReferralFee(sellingPrice, inputs.category);

  // 3. VAT Deduction
  const isVatActive = !!inputs.vatToggle && (inputs.marketplace === "UK" || ["DE", "FR", "IT", "ES"].includes(inputs.marketplace));
  const vatRate = isVatActive ? 20.0 : 0.0; // standard UK/EU vat approximation
  const vatAmount = isVatActive ? sellingPrice - (sellingPrice / (1 + vatRate / 100)) : 0;
  const priceExVat = sellingPrice - vatAmount;

  // 4. Landed cost & margins
  const landedCost = productCost + shippingToAmazon + prepCost + packagingCost;
  const totalAmazonFees = referralFee + fbaFee + storageFee + inboundPlacementFee;
  const adSpend = priceExVat * (ppcPercent / 100);
  const returnsLoss = (landedCost) * (returnsPercent / 100);

  const totalCosts = landedCost + totalAmazonFees + adSpend + returnsLoss + vatAmount;
  const netProfit = sellingPrice - totalCosts;

  const profitMargin = sellingPrice > 0 ? (netProfit / sellingPrice) * 100 : 0;
  const roi = landedCost > 0 ? (netProfit / landedCost) * 100 : 0;

  // 5. Break-Even Calculations
  const fixedCostsBeforeReferral = landedCost + fbaFee + storageFee + inboundPlacementFee + returnsLoss + vatAmount;
  const breakEvenPrice = fixedCostsBeforeReferral / (1 - (referralPercent / 100) - (ppcPercent / 100));

  // Max ACOS represents the maximum ad spend before going unprofitable
  // Max ACOS = Margin % before ad spend is applied
  const netProfitBeforeAds = priceExVat - landedCost - totalAmazonFees - returnsLoss;
  const breakEvenAcos = priceExVat > 0 ? (netProfitBeforeAds / priceExVat) * 100 : 0;

  // 6. Dynamic explanations block
  const amazonFeeFraction = sellingPrice > 0 ? ((totalAmazonFees + vatAmount) / sellingPrice) * 100 : 0;
  let explanation = `With a selling price of ${currencySymbol}${sellingPrice.toFixed(2)}, Amazon fees (referral, fulfillment, storage, and placement) consume ${amazonFeeFraction.toFixed(0)}% of your revenue. `;
  
  if (netProfit > 0) {
    explanation += `This leaves a healthy ${profitMargin.toFixed(1)}% profit margin (${currencySymbol}${netProfit.toFixed(2)} per unit). `;
  } else {
    explanation += `This results in a net loss of ${currencySymbol}${Math.abs(netProfit).toFixed(2)} per unit. Consider raising your price or lowering sourcing costs. `;
  }

  const largestFee = Math.max(referralFee, fbaFee, storageFee);
  if (largestFee === fbaFee) {
    explanation += `Your largest logistics expense is FBA Fulfillment (${currencySymbol}${fbaFee.toFixed(2)}), which is heavily determined by your package weight and dimensions.`;
  } else if (largestFee === referralFee) {
    explanation += `Your largest Amazon expense is the Referral Fee (${currencySymbol}${referralFee.toFixed(2)}), representing the ${referralPercent}% commission category fee.`;
  }

  // 7. Viability Score (Product Score Card)
  let scoreLabel = "Weak";
  let scoreColor = "red";
  if (profitMargin >= 25 && roi >= 50) {
    scoreLabel = "Strong";
    scoreColor = "green";
  } else if (profitMargin >= 15 && roi >= 30) {
    scoreLabel = "Marginal";
    scoreColor = "yellow";
  }

  // 8. FBA vs FBM vs 3PL comparison
  // FBM Cost: Referral Fee + shipping + warehousing
  const fbmFulfillmentCost = parseFloat(inputs.fbmFulfillment) || 3.50; // default estimated
  const fbmProfit = priceExVat - landedCost - referralFee - fbmFulfillmentCost - returnsLoss;
  
  // 3PL Cost: Referral Fee + warehouse fee + pick/pack shipping
  const tplFulfillmentCost = parseFloat(inputs.tplFulfillment) || 2.80; // default
  const tplStorageCost = parseFloat(inputs.tplStorage) || 0.40;
  const tplProfit = priceExVat - landedCost - referralFee - tplFulfillmentCost - tplStorageCost - returnsLoss;

  // 9. Reverse calculations
  // Target Margin Price: price where netProfit / price = targetMargin
  const targetMargin = parseFloat(inputs.targetMargin) || 30;
  // Solve iteratively for price because referral fee increases with price
  let targetPrice = landedCost + totalAmazonFees;
  for (let i = 0; i < 5; i++) {
    const tempReferral = calculateReferralFee(targetPrice, inputs.category).referralFee;
    targetPrice = (landedCost + tempReferral + fbaFee + storageFee + inboundPlacementFee + adSpend + returnsLoss) / (1 - (targetMargin / 100));
  }

  // Max Landed Cost: cost where net profit = desiredProfit
  const desiredProfit = parseFloat(inputs.desiredProfit) || 5;
  const maxLandedCost = priceExVat - desiredProfit - totalAmazonFees - adSpend - returnsLoss;

  return {
    tierName,
    isStandard,
    currencySymbol,
    dimensions: sizeResolution.dimensions,
    billableWeight,
    dimWeight,
    unitWeight,
    
    // Fee Breakdowns
    referralPercent,
    referralFee,
    fbaFee,
    storageFee,
    inboundPlacementFee,
    totalAmazonFees,
    vatAmount,
    vatRate,

    // Profit details
    landedCost,
    totalCosts,
    netProfit,
    profitMargin,
    roi,
    breakEvenPrice,
    breakEvenAcos,

    // Intelligence
    warnings,
    explanation,
    score: { label: scoreLabel, color: scoreColor },

    // Logistics Compare
    fbmProfit,
    tplProfit,
    fbaProfit: netProfit,

    // Reverse calculations
    targetPrice,
    maxLandedCost,

    // Storage detailed metrics
    storageRates: {
      volume: storageDetails.cubicVolume,
      standard: storageDetails.storageStandard,
      peak: storageDetails.storagePeak
    }
  };
}
