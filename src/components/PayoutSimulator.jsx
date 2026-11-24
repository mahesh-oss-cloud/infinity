import React, { useState } from 'react';
import { RATES } from '../data/mockRates';

// Simple utility to format currency
const formatAmt = (amt, currency) => {
  if (currency === 'INR') {
    return `₹ ${Number(amt).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `${currency} ${Number(amt).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const PayoutSimulator = ({ balance, onPayout }) => {
  const [amount, setAmount] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [converted, setConverted] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, processing, success, failure
  const [reference, setReference] = useState('');

  const convertAmount = () => {
    const amtNum = parseFloat(amount);
    if (isNaN(amtNum) || amtNum <= 0) {
      alert('Enter a valid amount in INR');
      return;
    }
    // Base is INR now
    const rate = targetCurrency === 'USD' ? RATES.INR_USD : (targetCurrency === 'EUR' ? RATES.INR_EUR : 1);
    setConverted(formatAmt(amtNum * rate, targetCurrency));
  };

  const initiatePayout = () => {
    if (!converted) {
      alert('Convert amount first');
      return;
    }
    setStatus('processing');
    // Process payout
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success
      if (success) {
        const ref = `UTR${Date.now()}`;
        setReference(ref);
        setStatus('success');
        // Notify parent to deduct balance in INR
        onPayout(parseFloat(amount));
      } else {
        setStatus('failure');
      }
    }, 2000);
  };

  return (
    <div style={{ border: '1px solid #e5e7eb', padding: '1.25rem', borderRadius: '1rem', marginTop: '1rem', backgroundColor: '#ffffff' }}>
      <h3 className="font-semibold text-gray-900 text-sm mb-1">Payout System</h3>
      <p className="text-xs text-gray-600 mb-3">Available Balance: {formatAmt(balance, 'INR')}</p>
      <div>
        <label className="text-xs text-gray-700 block mb-1">
          Amount (INR ₹):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 50000"
            className="w-full mt-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs"
          />
        </label>
      </div>
      <div style={{ marginTop: '0.75rem' }}>
        <label className="text-xs text-gray-700 block mb-1">
          Target Currency:
          <select
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
            className="w-full mt-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs bg-white"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="INR">INR (₹)</option>
          </select>
        </label>
        <button 
          onClick={convertAmount} 
          className="mt-2 w-full py-1.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-medium cursor-pointer transition-colors"
        >
          Convert at Market Rate
        </button>
      </div>
      {converted && (
        <p className="text-xs font-semibold text-gray-800 mt-2 bg-gray-50 p-2 rounded border border-gray-100">
          Converted: {converted}
        </p>
      )}
      <button
        onClick={initiatePayout}
        disabled={status === 'processing'}
        className="mt-3 w-full py-2 bg-gray-950 hover:bg-black text-white rounded-lg text-xs font-semibold cursor-pointer disabled:opacity-50 transition-colors"
      >
        {status === 'processing' ? 'Processing Settlement...' : 'Initiate Payout'}
      </button>
      {status === 'success' && (
        <p className="text-xs text-emerald-600 font-semibold mt-2">
          Success! Settlement UTR: {reference}
        </p>
      )}
      {status === 'failure' && (
        <p className="text-xs text-red-600 font-semibold mt-2">
          Payout failed. Please try again.
        </p>
      )}
    </div>
  );
};
