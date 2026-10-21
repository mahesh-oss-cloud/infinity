import React, { useState } from 'react';
import { Info, ChevronDown } from 'lucide-react';
import { CURRENCY_RATES } from '../data/savingsData';

export const CurrencyCard = () => {
  const [baseAmount, setBaseAmount] = useState('1');

  const numBase = parseFloat(baseAmount) || 0;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)] mt-5">
      
      {/* Header in Instrument Serif with Amount Input */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-normal text-gray-950 tracking-tight font-instrument">
            Treasury FX Rates
          </h3>
          <button 
            title="Real-Time Mid-Market Institutional FX Rates"
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Amount Input with USD pill */}
        <div className="flex items-center border border-gray-300 rounded-xl px-2.5 py-1 bg-white focus-within:border-gray-900 transition-colors">
          <input
            type="number"
            min="1"
            value={baseAmount}
            onChange={(e) => setBaseAmount(e.target.value)}
            className="w-12 text-xs font-bold text-gray-950 text-right focus:outline-none font-mono"
          />
          <span className="text-gray-300 mx-1.5 font-light">|</span>
          <div className="flex items-center gap-1 text-xs font-bold text-gray-800 cursor-pointer">
            <span>USD</span>
            <ChevronDown className="w-3 h-3 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Currency Conversion List with Updated Recent Real Rates */}
      <div className="space-y-3.5">
        {CURRENCY_RATES.map((curr) => {
          const converted = (numBase * curr.rate).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

          return (
            <div key={curr.code} className="flex items-center justify-between py-0.5">
              {/* Flag + Currency Name */}
              <div className="flex items-center gap-3">
                {/* Flag circle */}
                <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 border border-gray-200 text-xs">
                  {curr.flag === 'in' && <span>🇮🇳</span>}
                  {curr.flag === 'eu' && <span>🇪🇺</span>}
                  {curr.flag === 'gb' && <span>🇬🇧</span>}
                  {curr.flag === 'id' && <span>🇮🇩</span>}
                  {curr.flag === 'cn' && <span>🇨🇳</span>}
                  {curr.flag === 'sg' && <span>🇸🇬</span>}
                </div>

                <div>
                  <span className="text-xs font-semibold text-gray-900 block font-waldenburg">
                    {curr.name}
                  </span>
                  <span className="text-[10px] text-gray-400 font-waldenburg">
                    1 USD = <span className="font-instrument text-xs text-gray-700">{curr.rate}</span> {curr.code}
                  </span>
                </div>
              </div>

              {/* Converted Amount */}
              <div className="text-base font-normal text-gray-950 font-instrument text-right">
                {converted} <span className="text-gray-500 font-waldenburg text-xs">{curr.code}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
