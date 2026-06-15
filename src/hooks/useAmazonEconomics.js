import { useState, useCallback, useMemo, useEffect } from 'react';
import { runEconomicsEngine } from '../utils/amazonEconomicsEngine';

const DEFAULT_INPUTS = {
  sellingPrice: '30.00',
  productCost: '8.00',
  shippingToAmazon: '1.50',
  length: '10.0',
  width: '8.0',
  height: '2.0',
  weight: '1.2',
  category: 'home-kitchen',
  prepCost: '0.50',
  packagingCost: '0.25',
  ppcPercent: '10', // ACOS %
  returnsPercent: '2', // Refund rate %
  vatToggle: false,
  marketplace: 'US',
  season: 'janSep',
  targetMargin: '30',
  desiredProfit: '5.00',
  fbmFulfillment: '4.50',
  tplFulfillment: '3.20',
  tplStorage: '0.50'
};

export function useAmazonEconomics(initialMarketplace, initialCategory) {
  const [inputs, setInputs] = useState(() => ({
    ...DEFAULT_INPUTS,
    ...(initialMarketplace ? { marketplace: initialMarketplace.toUpperCase() } : {}),
    ...(initialCategory ? { category: initialCategory } : {})
  }));
  const [errors, setErrors] = useState({});

  // Input change handler
  const handleInputChange = useCallback((name, value) => {
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));

    // Basic real-time validation
    let error = null;
    if (value !== '') {
      const num = parseFloat(value);
      if (isNaN(num)) {
        error = 'Must be a valid number';
      } else if (['sellingPrice', 'productCost', 'shippingToAmazon', 'prepCost', 'packagingCost', 'fbmFulfillment', 'tplFulfillment', 'tplStorage'].includes(name) && num < 0) {
        error = 'Value cannot be negative';
      } else if (['length', 'width', 'height', 'weight'].includes(name) && num <= 0) {
        error = 'Dimension must be greater than 0';
      } else if (['ppcPercent', 'returnsPercent', 'targetMargin'].includes(name) && (num < 0 || num > 100)) {
        error = 'Percentage must be between 0 and 100';
      }
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, []);

  // Set all inputs together (used during hydration)
  const setAllInputs = useCallback((newInputs) => {
    setInputs(prev => ({
      ...prev,
      ...newInputs
    }));
  }, []);

  const resetInputs = useCallback(() => {
    setInputs(DEFAULT_INPUTS);
    setErrors({});
  }, []);

  // Memoized live calculations
  const results = useMemo(() => {
    return runEconomicsEngine(inputs);
  }, [inputs]);

  // Sync state to URL params (only runs on client side when inputs change)
  const syncUrlParams = useCallback(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams();
      
      // Save primary economics
      if (inputs.sellingPrice) params.set('price', inputs.sellingPrice);
      if (inputs.productCost) params.set('cost', inputs.productCost);
      if (inputs.shippingToAmazon) params.set('shipping', inputs.shippingToAmazon);
      if (inputs.length) params.set('l', inputs.length);
      if (inputs.width) params.set('w', inputs.width);
      if (inputs.height) params.set('h', inputs.height);
      if (inputs.weight) params.set('wt', inputs.weight);
      if (inputs.category) params.set('cat', inputs.category);
      if (inputs.marketplace) params.set('mkt', inputs.marketplace);
      if (inputs.vatToggle) params.set('vat', '1');
      if (inputs.ppcPercent) params.set('ppc', inputs.ppcPercent);
      if (inputs.returnsPercent) params.set('ret', inputs.returnsPercent);

      const queryString = params.toString();
      const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
      window.history.replaceState(null, '', newUrl);
    }
  }, [inputs]);

  // Hydrate inputs from URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const hydrated = {};

      const price = params.get('price');
      const cost = params.get('cost');
      const shipping = params.get('shipping');
      const l = params.get('l');
      const w = params.get('w');
      const h = params.get('h');
      const wt = params.get('wt');
      const cat = params.get('cat');
      const mkt = params.get('mkt');
      const vat = params.get('vat');
      const ppc = params.get('ppc');
      const ret = params.get('ret');

      if (price !== null) hydrated.sellingPrice = price;
      if (cost !== null) hydrated.productCost = cost;
      if (shipping !== null) hydrated.shippingToAmazon = shipping;
      if (l !== null) hydrated.length = l;
      if (w !== null) hydrated.width = w;
      if (h !== null) hydrated.height = h;
      if (wt !== null) hydrated.weight = wt;
      if (cat !== null) hydrated.category = cat;
      if (mkt !== null) hydrated.marketplace = mkt;
      if (vat !== null) hydrated.vatToggle = vat === '1';
      if (ppc !== null) hydrated.ppcPercent = ppc;
      if (ret !== null) hydrated.returnsPercent = ret;

      if (Object.keys(hydrated).length > 0) {
        setInputs(prev => ({
          ...prev,
          ...hydrated
        }));
      }
    }
  }, []);

  return {
    inputs,
    errors,
    results,
    handleInputChange,
    setAllInputs,
    resetInputs,
    syncUrlParams
  };
}
