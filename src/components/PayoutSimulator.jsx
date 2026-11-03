import React, { useState } from 'react';
import { RATES } from '../data/mockRates';

// Simple utility to format currency
const formatAmt = (amt, currency) => `${currency} ${Number(amt).toFixed(2)}`;

export const PayoutSimulator = ({ balance, onPayout }) => {
  const [amount, setAmount] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('INR');
  const [converted, setConverted] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, processing, success, failure
  const [reference, setReference] = useState('');

  const convertAmount = () => {
    const amtNum = parseFloat(amount);
    if (isNaN(amtNum) || amtNum <= 0) {
      alert('Enter a valid amount');
      return;
    }
    const rateKey = `USD_${targetCurrency}`; // assume base USD for simplicity
    const rate = RATES[rateKey] || 1;
    setConverted(formatAmt(amtNum * rate, targetCurrency));
  };

  const initiatePayout = () => {
    if (!converted) {
      alert('Convert amount first');
      return;
    }
    setStatus('processing');
    // Simulate async processing
    setTimeout(() => {
      // Random success/failure
      const success = Math.random() > 0.1; // 90% success
      if (success) {
        const ref = `UTR${Date.now()}`;
        setReference(ref);
        setStatus('success');
        // Notify parent to deduct balance (use USD amount)
        onPayout(parseFloat(amount));
      } else {
        setStatus('failure');
      }
    }, 2000);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
      <h3>Sandbox Payout Simulator</h3>
      <p>Current Balance: {formatAmt(balance, 'USD')}</p>
      <div>
        <label>
          Amount (USD):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        <label>
          Target Currency:
          <select
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          >
            <option value="INR">INR</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </label>
        <button onClick={convertAmount} style={{ marginLeft: '1rem' }}>
          Convert
        </button>
      </div>
      {converted && (
        <p style={{ marginTop: '0.5rem' }}>Converted Amount: {converted}</p>
      )}
      <button
        onClick={initiatePayout}
        disabled={status === 'processing'}
        style={{ marginTop: '0.5rem' }}
      >
        {status === 'processing' ? 'Processing...' : 'Initiate Payout'}
      </button>
      {status === 'success' && (
        <p style={{ color: 'green', marginTop: '0.5rem' }}>
          Success! Reference: {reference}
        </p>
      )}
      {status === 'failure' && (
        <p style={{ color: 'red', marginTop: '0.5rem' }}>
          Payout failed. Please try again.
        </p>
      )}
    </div>
  );
};
