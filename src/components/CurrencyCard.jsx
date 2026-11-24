import React, { useEffect, useState } from 'react';
import { Info, RefreshCw } from 'lucide-react';
import { CURRENCY_RATES } from '../data/savingsData';

const ACCOUNT_HOLDERS = [
  'Mahesh Bal',
  'Saharsh Keerthi',
  'Satwik Reddy',
  'Arhaan Rahil Mohammed',
];

export const CurrencyCard = () => {
  // Default to $500,000 USD to immediately show the full ₹4,64,50,000 INR conversion
  const [baseAmount, setBaseAmount] = useState('500000');
  const [rates, setRates] = useState(CURRENCY_RATES);
  const [rateDate, setRateDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [rateError, setRateError] = useState(false);

  const loadRates = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.frankfurter.dev/v1/latest?base=USD&symbols=INR,EUR,GBP,IDR,CNY,SGD', { cache: 'no-store' });
      if (!response.ok) throw new Error('Rate service unavailable');
      const data = await response.json();
      if (!data?.rates || !data.date) throw new Error('Invalid rate response');
      setRates(CURRENCY_RATES.map((currency) => ({
        ...currency,
        rate: Number(data.rates[currency.code] ?? (currency.code === 'INR' ? 92.90 : currency.rate)),
      })));
      setRateDate(data.date);
      setRateError(false);
    } catch (error) {
      console.error('Could not refresh FX rates:', error);
      // Fallback: Ensure INR is set to 92.90
      setRates(CURRENCY_RATES.map((currency) => ({
        ...currency,
        rate: currency.code === 'INR' ? 92.90 : currency.rate,
      })));
      setRateError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRates();
    const interval = setInterval(loadRates, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const numBase = Math.max(0, parseFloat(baseAmount) || 0);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)] mt-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-normal text-gray-950 tracking-tight font-instrument">Treasury FX Rates</h3>
          <button title="Daily reference exchange rates" className="text-gray-400 hover:text-gray-600 cursor-pointer" type="button">
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-2.5 py-2 bg-white focus-within:border-gray-900">
          <input
            type="number"
            min="0"
            step="any"
            inputMode="decimal"
            aria-label="Amount in US dollars"
            value={baseAmount}
            onChange={(e) => setBaseAmount(e.target.value)}
            className="w-24 max-w-[30vw] text-sm font-bold text-gray-950 text-right focus:outline-none font-mono"
          />
          <span className="text-gray-300 font-light">|</span>
          <span className="text-xs font-bold text-gray-800">USD</span>
        </div>
      </div>

      <div className="space-y-3.5">
        {rates.map((curr) => {
          const fractionDigits = curr.code === 'IDR' ? 0 : 2;
          const currRate = curr.code === 'INR' && curr.rate <= 1 ? 92.90 : curr.rate;
          const convertedVal = numBase * currRate;
          const converted = curr.code === 'INR' 
            ? convertedVal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : convertedVal.toLocaleString('en-US', { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits });
            
          const flags = { in: '🇮🇳', us: '🇺🇸', eu: '🇪🇺', gb: '🇬🇧', id: '🇮🇩', cn: '🇨🇳', sg: '🇸🇬' };
          return (
            <div key={curr.code} className={`flex items-center justify-between gap-3 py-1.5 px-2 rounded-xl transition-colors ${curr.code === 'INR' ? 'bg-amber-50/70 border border-amber-200/60' : ''}`}>
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 border border-gray-200 text-xs">
                  {flags[curr.flag] || '🌐'}
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-gray-900 block font-waldenburg">
                    {curr.code === 'INR' ? 'Indian Rupee (INR)' : curr.name}
                  </span>
                  <span className="text-[10px] text-gray-500 font-waldenburg">
                    1 USD = <span className="font-instrument text-xs text-gray-800 font-semibold">{currRate.toFixed(2)}</span> {curr.code}
                  </span>
                </div>
              </div>
              <div className="text-base font-medium text-gray-950 font-instrument text-right whitespace-nowrap">
                {curr.code === 'INR' && '₹'}{converted} <span className="text-gray-500 font-waldenburg text-xs">{curr.code}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-waldenburg">
        <span>Reference rate: 1 USD = ₹92.90 INR</span>
        <button 
          onClick={loadRates}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Account Holders */}
      <div className="mt-6 pt-5 border-t border-gray-100">
        <h4 className="text-sm font-normal text-gray-900 mb-3 font-instrument">Account holders</h4>
        <div className="grid grid-cols-2 gap-2 text-xs font-waldenburg">
          {ACCOUNT_HOLDERS.map((name) => {
            const initials = name.split(' ').map((n) => n[0]).join('');
            return (
              <div key={name} className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-[10px] font-bold">
                  {initials}
                </div>
                <span className="text-gray-800 truncate font-medium">{name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
