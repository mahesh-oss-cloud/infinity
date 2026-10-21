import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SavingsPlanModal = ({ isOpen, onClose, plan, onDepositIntoPlan, balance }) => {
  const [depositAmount, setDepositAmount] = useState('500');

  if (!isOpen || !plan) return null;

  const numDeposit = parseFloat(depositAmount) || 0;

  const handleDeposit = (e) => {
    e.preventDefault();
    if (numDeposit <= 0 || numDeposit > balance) {
      alert('Invalid deposit amount or exceeds current balance');
      return;
    }

    onDepositIntoPlan(plan.id, numDeposit);
    onClose();

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#6c5ce7', '#ec4899', '#f59e0b'],
    });
  };

  const progressPercent = Math.min(100, Math.round((plan.allocated / plan.target) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-gray-900">
              {plan.name} Savings Goal
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          
          <div className="text-center mb-6">
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1">
              Currently Saved
            </span>
            <div className="text-3xl font-extrabold text-gray-900 font-sans">
              ${plan.allocated.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Target: ${plan.target.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({progressPercent}% achieved)
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-6">
            <div
              className="bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <form onSubmit={handleDeposit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Deposit from Available Savings
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  required
                  min="1"
                  max={balance}
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-900 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#6c5ce7] hover:bg-[#5b4bc4] text-white font-bold text-sm transition-all shadow-sm shadow-purple-500/20 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Deposit ${numDeposit} to {plan.name}</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
