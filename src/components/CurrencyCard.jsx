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
  const [baseAmount, setBaseAmount] = useState('1');
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
        rate: Number(data.rates[currency.code] ?? currency.rate),
      })));
      setRateDate(data.date);
      setRateError(false);
    } catch (error) {
      console.error('Could not refresh FX rates:', error);
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
            className="w-16 max-w-[30vw] text-sm font-bold text-gray-950 text-right focus:outline-none font-mono"
          />
          <span className="text-gray-300 font-light">|</span>
          <span className="text-xs font-bold text-gray-800">USD</span>
        </div>
      </div>

      <div className="space-y-3.5">
        {rates.map((curr) => {
          const converted = (numBase * curr.rate).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: curr.code === 'IDR' ? 0 : 2,
          });
          const flags = { in: '🇮🇳', eu: '🇪🇺', gb: '🇬🇧', id: '🇮🇩', cn: '🇨🇳', sg: '🇸🇬' };
          return (
            <div key={curr.code} className="flex items-center justify-between gap-3 py-0.5">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 border border-gray-200 text-xs">
                  {flags[curr.flag]}
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-gray-900 block font-waldenburg">{curr.name}</span>
                  <span className="text-[10px] text-gray-400 font-waldenburg">
                    1 USD = <span className="font-instrument text-xs text-gray-700">{curr.rate.toLocaleString('en-US', { maximumFractionDigits: 4 })}</span> {curr.code}
                  </span>
                </div>
              </div>
              <div className="text-base font-normal text-gray-950 font-instrument text-right whitespace-nowrap">
                {converted} <span className="text-gray-500 font-waldenburg text-xs">{curr.code}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-[10px] text-gray-500">
        <span>{loading ? 'Refreshing reference rates…' : rateError ? 'Showing fallback rates · refresh unavailable' : `Reference rates dated ${rateDate}`}</span>
        <button type="button" onClick={loadRates} disabled={loading} className="inline-flex items-center gap-1.5 font-semibold text-gray-700 hover:text-black disabled:opacity-50">
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>
      <p className="mt-1 text-[10px] leading-relaxed text-gray-400">Daily reference rates, not a guaranteed execution quote. Banks and payment providers may apply spreads and fees.</p>

      <div className="mt-5 pt-4 border-t border-gray-200">
        <h4 className="text-lg font-normal text-gray-950 font-instrument">Account holders</h4>
        <p className="text-[11px] text-gray-500 mt-1 mb-3">Workspace account-holder list</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ACCOUNT_HOLDERS.map((name, index) => (
            <div key={name} className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50/70 px-3 py-2.5 min-w-0">
              <span className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0">{name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase()}</span>
              <span className="text-xs font-semibold text-gray-800 truncate">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
