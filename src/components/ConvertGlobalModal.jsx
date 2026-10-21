import React, { useState } from 'react';
import { 
  X, 
  RefreshCw, 
  Globe2, 
  ArrowRight, 
  Building2, 
  ShieldCheck, 
  Sparkles,
  FileCheck2,
  TrendingUp,
  Percent
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatINR, formatCurrency, generateUTR } from '../utils/formatters';
import { playSoundboxAnnouncement } from '../utils/audio';

export const ConvertGlobalModal = ({ 
  isOpen, 
  onClose, 
  user, 
  selectedAccount, 
  onSettleGlobal 
}) => {
  const [currency, setCurrency] = useState('USD');
  const [foreignAmount, setForeignAmount] = useState('1000');
  const [isSettling, setIsSettling] = useState(false);

  if (!isOpen) return null;

  const rate = user.fxRates[currency] || 86.85;
  const maxAvailable = user.globalBalances[currency] || 0;
  const numForeign = parseFloat(foreignAmount) || 0;
  
  // Infinity transparent calculation: 0.5% flat fee, Zero FX markup
  const grossInr = numForeign * rate;
  const feeInr = grossInr * (user.feePercent / 100);
  const netInrSettlement = grossInr - feeInr;

  const handleSettle = (e) => {
    e.preventDefault();
    if (numForeign <= 0 || numForeign > maxAvailable) {
      alert(`Invalid amount or exceeds available ${currency} balance!`);
      return;
    }

    setIsSettling(true);
    setTimeout(() => {
      setIsSettling(false);
      const utr = generateUTR();
      const newTx = {
        id: `tx-${Date.now()}`,
        type: 'international_inward',
        title: `Infinity Global Settlement (${currency})`,
        subtitle: `Converted ${formatCurrency(numForeign, currency)} @ ₹${rate.toFixed(2)}`,
        amount: netInrSettlement,
        foreignAmount: numForeign,
        currency: currency,
        direction: 'credit',
        status: 'SUCCESS',
        utr: utr,
        date: new Date().toISOString(),
        category: 'International Inward',
        firaAvailable: true,
        firaId: `FIRA-IN-${Date.now().toString().slice(-6)}`,
        paymentMethod: `${selectedAccount.bankName} ${selectedAccount.accountNumber}`,
        note: `Infinity 24-hr settlement • 0.5% fee deducted`,
      };

      onSettleGlobal(newTx, currency, numForeign, netInrSettlement);
      onClose();

      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#10b981', '#3b82f6'],
      });

      playSoundboxAnnouncement(Math.round(netInrSettlement));
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#121624] border border-white/10 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Globe2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Settle Global Remittance</h3>
              <p className="text-[11px] text-gray-400">Instant INR payout to your linked bank account</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          
          {/* Currency Selector */}
          <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-white/5 border border-white/10 mb-5">
            {['USD', 'EUR', 'GBP'].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCurrency(c);
                  setForeignAmount(Math.min(1000, user.globalBalances[c]).toString());
                }}
                className={`py-2 px-1 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  currency === c
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {c === 'USD' ? '🇺🇸 USD' : c === 'EUR' ? '🇪🇺 EUR' : '🇬🇧 GBP'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSettle} className="space-y-4">
            
            {/* Foreign Currency Input */}
            <div>
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
                <span>Amount to Settle ({currency})</span>
                <span>Available: {formatCurrency(maxAvailable, currency)}</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  required
                  min="1"
                  max={maxAvailable}
                  value={foreignAmount}
                  onChange={(e) => setForeignAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-2xl font-extrabold text-white font-mono focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={() => setForeignAmount(maxAvailable.toString())}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] px-2 py-1 rounded bg-white/10 text-cyan-400 font-bold hover:bg-white/20 cursor-pointer"
                >
                  MAX
                </button>
              </div>
            </div>

            {/* Infinity Transparent Pricing Breakdown */}
            <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 space-y-2 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Live Mid-Market Rate</span>
                <span className="text-white font-mono font-semibold">1 {currency} = ₹{rate.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>FX Markup</span>
                <span className="text-emerald-400 font-bold">0.0% (Zero Hidden Markup)</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Infinity Flat Fee (0.5%)</span>
                <span className="text-gray-300 font-mono">- {formatINR(feeInr)}</span>
              </div>
              <div className="pt-2 border-t border-cyan-500/20 flex justify-between text-sm font-bold">
                <span className="text-cyan-300">You Receive in Bank:</span>
                <span className="text-white font-mono text-base">{formatINR(netInrSettlement)}</span>
              </div>
            </div>

            {/* Payout Destination Account */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>Credited to: <strong>{selectedAccount.bankName}</strong> ({selectedAccount.accountNumber})</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-medium">Instant</span>
            </div>

            <button
              type="submit"
              disabled={isSettling || numForeign <= 0 || numForeign > maxAvailable}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 text-black font-extrabold text-sm shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isSettling ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Processing Settlement...</span>
                </>
              ) : (
                <>
                  <span>Settle {formatINR(netInrSettlement)} into Bank</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-cyan-400/80">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Automated RBI-Compliant e-FIRA generated with this settlement</span>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
