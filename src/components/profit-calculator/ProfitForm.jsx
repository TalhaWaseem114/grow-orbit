import React from 'react';
import { DollarSign, Percent, Package, Truck, Target } from 'lucide-react';

export default function ProfitForm({ inputs, handleInputChange, errors, resetInputs, onCalculate }) {
  
  const inputFields = [
    {
      name: 'productCost',
      label: 'Product Cost / Unit',
      icon: <Package size={14} />,
      placeholder: 'e.g., 5.00',
      type: 'number',
      prefix: '$',
    },
    {
      name: 'sellingPrice',
      label: 'Selling Price',
      icon: <DollarSign size={14} />,
      placeholder: 'e.g., 29.99',
      type: 'number',
      prefix: '$',
    },
    {
      name: 'shippingCost',
      label: 'Shipping Cost (FBA + Inbound)',
      icon: <Truck size={14} />,
      placeholder: 'e.g., 3.50',
      type: 'number',
      prefix: '$',
    },
    {
      name: 'amazonFeePercent',
      label: 'Amazon Referral Fee %',
      icon: <Percent size={14} />,
      placeholder: '15',
      type: 'number',
      suffix: '%',
    },
    {
      name: 'ppcCost',
      label: 'Est. PPC Cost / Unit',
      icon: <Target size={14} />,
      placeholder: 'e.g., 2.00',
      type: 'number',
      prefix: '$',
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onCalculate) {
      onCalculate();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
      <div>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter text-zinc-900 mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Input Metrics
            </h2>
            <p className="text-xs font-semibold text-zinc-400">
              Enter your unit economics to calculate profitability.
            </p>
          </div>
          {resetInputs && (
            <button 
              type="button"
              onClick={resetInputs}
              className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-orange-500 transition-colors border border-zinc-200/60 rounded-lg px-2.5 py-1.5 bg-zinc-50 hover:bg-white cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inputFields.map((field) => (
            <div key={field.name} className={`flex flex-col gap-1.5 ${field.name === 'ppcCost' ? 'md:col-span-2' : ''}`}>
              <label htmlFor={field.name} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <span className="text-orange-500">{field.icon}</span>
                {field.label}
              </label>

              <div className="relative group">
                {field.prefix && (
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-medium">
                    {field.prefix}
                  </div>
                )}

                <input
                  id={field.name}
                  type={field.type}
                  value={inputs[field.name]}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className={`
                    w-full bg-zinc-50 border transition-all duration-300 rounded-xl outline-none text-sm font-semibold
                    ${field.prefix ? 'pl-7' : 'pl-3.5'}
                    ${field.suffix ? 'pr-7' : 'pr-3.5'}
                    py-2.5
                    ${errors[field.name]
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/10'
                      : 'border-zinc-200/80 hover:border-zinc-350 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/10'
                    }
                  `}
                />

                {field.suffix && (
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-medium">
                    {field.suffix}
                  </div>
                )}
              </div>

              {/* Error Message */}
              <div className={`text-[10px] font-bold text-red-500 transition-all duration-300 overflow-hidden ${errors[field.name] ? 'max-h-10 opacity-100 mt-0.5' : 'max-h-0 opacity-0'}`}>
                {errors[field.name]}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-100">
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-md shadow-orange-500/10 hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          Calculate Profitability
        </button>
      </div>
    </form>
  );
}


