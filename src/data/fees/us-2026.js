export const us2026 = {
  meta: {
    marketplace: "US",
    year: 2026,
    currencySymbol: "$",
    currencyCode: "USD",
    lastVerified: "2026-06-01",
    sourceUrl: "https://sellercentral.amazon.com/help/hub/reference/G201374540",
    dimDivisor: 139
  },
  
  // Size tier boundary limits (inches and lbs)
  sizeTiers: [
    {
      name: "Small Standard",
      maxLongSide: 15,
      maxMedianSide: 12,
      maxShortSide: 0.75,
      maxWeight: 1, // lb
      isStandard: true
    },
    {
      name: "Large Standard",
      maxLongSide: 18,
      maxMedianSide: 14,
      maxShortSide: 8,
      maxWeight: 20, // lb
      isStandard: true
    },
    {
      name: "Small Bulky",
      maxLongSide: 60,
      maxMedianSide: 30,
      maxShortSide: 30,
      maxWeight: 70, // lb
      isStandard: false
    },
    {
      name: "Large Bulky",
      maxLongSide: 108,
      maxMedianSide: 100, // relaxed
      maxShortSide: 100,  // relaxed
      maxWeight: 150, // lb
      isStandard: false
    }
  ],

  // Monthly storage rate per cubic foot
  storageRates: {
    standard: { janSep: 0.78, octDec: 2.40 },
    bulky: { janSep: 0.56, octDec: 1.40 }
  },

  // Inbound placement estimates
  inboundPlacement: {
    standard: [
      { maxWeight: 0.5, fee: 0.21 },
      { maxWeight: 1.0, fee: 0.27 },
      { maxWeight: 2.0, fee: 0.35 },
      { maxWeight: 999, fee: 0.45 }
    ],
    bulky: 1.20 // flat rate estimate
  },

  // Resolve fulfillment fee based on billable weight (lbs) and price
  getFulfillmentFee: (tierName, billableWeight, sellingPrice = 30) => {
    // If under $10, Amazon applies a low-price discount
    const isLowPrice = sellingPrice < 10;
    const discount = isLowPrice ? 0.77 : 0.00;

    if (tierName === "Small Standard") {
      if (billableWeight <= 0.5) return Math.max(1.50, 3.06 - discount);
      return Math.max(1.50, 3.25 - discount);
    }
    
    if (tierName === "Large Standard") {
      if (billableWeight <= 0.5) return Math.max(2.00, 3.85 - discount);
      if (billableWeight <= 1.0) return Math.max(2.00, 4.15 - discount);
      if (billableWeight <= 1.5) return Math.max(2.00, 4.55 - discount);
      if (billableWeight <= 2.0) return Math.max(2.00, 4.95 - discount);
      if (billableWeight <= 3.0) return Math.max(2.00, 5.80 - discount);
      
      // Above 3 lbs: $6.20 + $0.16 per half-lb or fraction thereof above 3 lbs
      const baseFee = 6.20;
      const extraWeight = billableWeight - 3.0;
      const halfPounds = Math.ceil(extraWeight / 0.5);
      return Math.max(2.50, baseFee + (halfPounds * 0.16) - discount);
    }

    if (tierName === "Small Bulky") {
      // Base $9.85 + $0.42 per lb above 1 lb
      const extraWeight = Math.max(0, billableWeight - 1.0);
      return 9.85 + extraWeight * 0.42;
    }

    if (tierName === "Large Bulky") {
      // Base $18.50 + $0.48 per lb above 1 lb
      const extraWeight = Math.max(0, billableWeight - 1.0);
      return 18.50 + extraWeight * 0.48;
    }

    // Default XXL/Extra Large
    const extraWeight = Math.max(0, billableWeight - 1.0);
    return 45.00 + extraWeight * 0.65;
  }
};
