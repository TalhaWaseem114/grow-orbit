import { useState, useCallback } from 'react';
import { isValidCost, isValidAmazonFee, isValidSellingPrice } from '../utils/validators';

const DEFAULT_INPUTS = {
  productCost: '',
  sellingPrice: '',
  shippingCost: '',
  amazonFeePercent: 15, // default 15%
  ppcCost: 0,           // default 0
};

export function useProfitInputs(initialState = DEFAULT_INPUTS) {
  const [inputs, setInputs] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleInputChange = useCallback((name, value) => {
    setInputs(prev => ({ ...prev, [name]: value }));
    
    // Optional immediate validation
    const numValue = parseFloat(value);
    let error = null;

    if (value !== '') {
      if (name === 'sellingPrice' && !isValidSellingPrice(numValue)) {
        error = 'Selling price must be greater than 0';
      } else if (name === 'amazonFeePercent' && !isValidAmazonFee(numValue)) {
        error = 'Fee must be between 0 and 100';
      } else if (['productCost', 'shippingCost', 'ppcCost'].includes(name) && !isValidCost(numValue)) {
        error = 'Cost cannot be negative';
      }
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

  }, []);

  const getParsedInputs = useCallback(() => {
    return {
      productCost: parseFloat(inputs.productCost) || 0,
      sellingPrice: parseFloat(inputs.sellingPrice) || 0,
      shippingCost: parseFloat(inputs.shippingCost) || 0,
      amazonFeePercent: parseFloat(inputs.amazonFeePercent) || 0,
      ppcCost: parseFloat(inputs.ppcCost) || 0,
    };
  }, [inputs]);

  const resetInputs = useCallback(() => {
    setInputs(DEFAULT_INPUTS);
    setErrors({});
  }, []);

  const setAllInputs = useCallback((newInputs) => {
    setInputs(prev => ({
      ...prev,
      ...newInputs
    }));
  }, []);

  return {
    inputs,
    errors,
    handleInputChange,
    getParsedInputs,
    resetInputs,
    setAllInputs
  };
}

