export const uk2026 = {
  meta: {
    marketplace: "UK",
    year: 2026,
    currencySymbol: "£",
    currencyCode: "GBP",
    lastVerified: "2026-06-01",
    sourceUrl: "https://sellercentral.amazon.co.uk/help/hub/reference/G201867130",
    dimDivisor: 139 // UK FBA dim divisor is 139 (or 5000 in cm/kg equivalent)
  },
  
  // Size tier boundary limits in inches and lbs for uniform calculations
  sizeTiers: [
    {
      name: "Small Envelope",
      maxLongSide: 9.0, // 23 cm
      maxMedianSide: 6.2, // 16 cm
      maxShortSide: 0.15, // 0.4 cm
      maxWeight: 0.2, // 90g
      isStandard: true
    },
    {
      name: "Standard Envelope",
      maxLongSide: 13.0, // 33 cm
      maxMedianSide: 9.0, // 23 cm
      maxShortSide: 0.9, // 2.5 cm
      maxWeight: 1.1, // 500g
      isStandard: true
    },
    {
      name: "Standard Parcel",
      maxLongSide: 17.7, // 45 cm
      maxMedianSide: 13.7, // 35 cm
      maxShortSide: 7.8, // 20 cm
      maxWeight: 44.0, // 20kg
      isStandard: true
    },
    {
      name: "Bulky Parcel",
      maxLongSide: 47.2, // 120 cm
      maxMedianSide: 23.6, // 60 cm
      maxShortSide: 23.6, // 60 cm
      maxWeight: 66.0, // 30kg
      isStandard: false
    }
  ],

  // Monthly storage rate in GBP per cubic foot
  storageRates: {
    standard: { janSep: 0.65, octDec: 2.10 },
    bulky: { janSep: 0.45, octDec: 1.30 }
  },

  // UK Inbound placement estimate (converted to GBP)
  inboundPlacement: {
    standard: [
      { maxWeight: 0.5, fee: 0.15 },
      { maxWeight: 1.0, fee: 0.20 },
      { maxWeight: 2.0, fee: 0.28 },
      { maxWeight: 999, fee: 0.35 }
    ],
    bulky: 0.90
  },

  getFulfillmentFee: (tierName, billableWeight, sellingPrice = 30) => {
    // UK FBA fee rules in GBP
    if (tierName === "Small Envelope") {
      return 1.85;
    }
    if (tierName === "Standard Envelope") {
      if (billableWeight <= 0.5) return 2.15;
      return 2.50;
    }
    if (tierName === "Standard Parcel") {
      if (billableWeight <= 0.5) return 2.95;
      if (billableWeight <= 1.0) return 3.45;
      if (billableWeight <= 2.0) return 4.10;
      if (billableWeight <= 3.0) return 4.85;
      
      // Above 3 lbs: £4.85 + £0.12 per lb
      const extraWeight = Math.max(0, billableWeight - 3.0);
      return 4.85 + extraWeight * 0.12;
    }
    
    // Bulky Parcel / Heavy
    const extraWeight = Math.max(0, billableWeight - 1.0);
    return 7.95 + extraWeight * 0.35;
  }
};
