import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  ArrowRight, 
  CreditCard, 
  Building2, 
  ShieldCheck, 
  Sparkles,
  Wallet
} from 'lucide-react';
import { formatINR } from '../utils/formatters';

export const AddMoneyModal = ({ isOpen, onClose, onAddMoney }) => {
  const [amount, setAmount] = useState('5000');
  const [source, setSource] = useState('netbanking'); // 'netbanking', 'card', 'wire'

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (!num || num <= 0) return;
    onAddMoney(num, source);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#121624] border border-white/10 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Add Funds</h3>
              <p className="text-[11px] text-gray-400">Load money into your Infinity UPI Balance</p>
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
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Amount Input */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">
                Deposit Amount (INR)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-cyan-400 font-mono">
                  ₹
                </span>
                <input
                  type="number"
                  required
                  min="100"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-2xl font-extrabold text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Quick chips */}
            <div className="flex flex-wrap gap-2">
              {[1000, 2000, 5000, 10000, 25000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset.toString())}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-300 hover:text-white transition-all cursor-pointer"
                >
                  +₹{preset.toLocaleString('en-IN')}
                </button>
              ))}
            </div>

            {/* Funding Source Selector */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">
                Deposit Payment Channel
              </label>
              <div className="space-y-2">
                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  source === 'netbanking' ? 'bg-cyan-500/10 border-cyan-500/40 text-white' : 'bg-white/5 border-white/5 text-gray-400'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="source"
                      checked={source === 'netbanking'}
                      onChange={() => setSource('netbanking')}
                      className="accent-cyan-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">Net Banking / IMPS</div>
                      <div className="text-[10px] text-gray-400">HDFC, ICICI, SBI, Axis Bank</div>
                    </div>
                  </div>
                  <Building2 className="w-4 h-4 text-cyan-400" />
                </label>

                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  source === 'card' ? 'bg-cyan-500/10 border-cyan-500/40 text-white' : 'bg-white/5 border-white/5 text-gray-400'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="source"
                      checked={source === 'card'}
                      onChange={() => setSource('card')}
                      className="accent-cyan-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">Corporate Debit Card</div>
                      <div className="text-[10px] text-gray-400">Visa / Mastercard / RuPay</div>
                    </div>
                  </div>
                  <CreditCard className="w-4 h-4 text-cyan-400" />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-extrabold text-sm shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Deposit {amount ? formatINR(parseFloat(amount)) : ''}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <p className="text-[10px] text-gray-500 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              RBI Regulated Escrow Account • Instant credit to UPI balance
            </p>

          </form>
        </div>

      </div>
    </div>
  );
};
