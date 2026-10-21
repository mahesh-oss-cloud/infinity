import React from 'react';
import { ArrowUpRight, ArrowDownLeft, ChevronDown, TrendingUp, Landmark } from 'lucide-react';

export const MyBalanceCard = ({ 
  account, 
  onOpenTransfer, 
  onOpenReceive,
  onOpenAccountDetails,
  onOpenRemitToIndia 
}) => {
  // Format currency with commas: e.g. $524,324
  const formattedBalance = Math.round(account.balance).toLocaleString('en-US');

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
      
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-normal text-gray-500 uppercase tracking-wider block font-waldenburg">
            Total Liquid Balance
          </h3>
          <span className="text-[11px] text-gray-900 font-medium font-waldenburg">
            Delaware C-Corp • Mercury Treasury
          </span>
        </div>

        {/* Card Brand & Account Switcher Dropdown */}
        <button
          onClick={onOpenAccountDetails}
          className="flex items-center gap-2 px-2.5 py-1 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer group"
          title="View Blackbird Savings Account Details"
        >
          {/* Mastercard dual overlapping circle icon */}
          <div className="flex items-center -space-x-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-[#eb001b] inline-block" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#f79e1b] inline-block opacity-90" />
          </div>
          <span className="text-xs font-semibold text-gray-700 font-waldenburg">
            {account.accountNumberMasked}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700 transition-colors" />
        </button>
      </div>

      {/* Main Dollar Balance Display in Instrument Serif */}
      <div className="mb-2">
        <h2 className="text-4xl sm:text-5xl font-normal text-gray-950 tracking-tight font-instrument">
          ${formattedBalance}
        </h2>
      </div>

      {/* Monthly Growth Pill */}
      <div className="flex items-center gap-2 mb-5 font-waldenburg">
        <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <TrendingUp className="w-3 h-3 stroke-[2.5]" />
          <span className="font-instrument text-sm">{account.monthlyIncreaseRate}</span>
        </div>
        <span className="text-xs text-gray-500 font-waldenburg">
          YC W27 Inflow + Treasury Accrual
        </span>
      </div>

      {/* Idle Cash Treasury Breakdown Card (Clean Neutral, NO purple gradients!) */}
      <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80 mb-5 text-xs space-y-2 font-waldenburg">
        <div className="flex justify-between items-center text-gray-600">
          <span className="font-waldenburg">Checking Liquidity:</span>
          <span className="font-normal text-gray-900 font-instrument text-base">
            ${Math.round(account.checkingBalance).toLocaleString('en-US')}
          </span>
        </div>
        <div className="flex justify-between items-center pt-1.5 border-t border-gray-200/60">
          <span className="text-gray-900 font-medium flex items-center gap-1.5 font-waldenburg">
            <Landmark className="w-3.5 h-3.5 text-gray-700" />
            <span>Idle Cash Treasury (5.02% APY):</span>
          </span>
          <span className="font-normal text-gray-900 font-instrument text-base">
            ${Math.round(account.treasuryYieldBalance).toLocaleString('en-US')}
          </span>
        </div>
      </div>

      {/* Action Buttons: Transfer & Receive (Authoritative Clean Black / White styling) */}
      <div className="grid grid-cols-2 gap-2.5 mb-3">
        {/* Transfer Button */}
        <button
          onClick={onOpenTransfer}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-950 hover:bg-black text-white text-xs font-medium transition-all shadow-xs active:scale-[0.98] cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-[2.2]" fill="none" stroke="currentColor">
            <path d="M7 17l9.2-9.2M17 17V7.8H7.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Transfer Wire</span>
        </button>

        {/* Receive / Wire Instructions Button */}
        <button
          onClick={onOpenReceive}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 text-xs font-medium transition-all active:scale-[0.98] cursor-pointer shadow-xs"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-[2.2]" fill="none" stroke="currentColor">
            <path d="M17 7L7.8 16.2M7.8 7v9.2H17" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Wire Info</span>
        </button>
      </div>

      {/* Remit Runway to Indian Subsidiary Button */}
      <button
        onClick={onOpenRemitToIndia}
        className="w-full py-2.5 px-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-900 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>🇮🇳 Intercompany Remittance to India</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
      </button>

    </div>
  );
};
