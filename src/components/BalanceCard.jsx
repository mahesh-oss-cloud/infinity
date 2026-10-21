import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus, 
  QrCode, 
  Building2, 
  RefreshCw, 
  Globe2, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  FileCheck2
} from 'lucide-react';
import { formatINR, formatCurrency } from '../utils/formatters';

export const BalanceCard = ({ 
  user, 
  linkedAccounts, 
  selectedAccount, 
  setSelectedAccount, 
  onOpenSend, 
  onOpenReceive, 
  onOpenAddMoney, 
  onOpenConvertGlobal,
  onOpenFira
}) => {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('INR'); // 'INR' or 'GLOBAL'

  const totalGlobalInInr = (
    user.globalBalances.USD * user.fxRates.USD +
    user.globalBalances.EUR * user.fxRates.EUR +
    user.globalBalances.GBP * user.fxRates.GBP
  );

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121624] via-[#0e111a] to-[#141829] border border-white/10 shadow-2xl p-6 sm:p-8">
      
      {/* Background ambient neon glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Selector & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
        
        {/* Currency Tab Selector */}
        <div className="inline-flex p-1 rounded-xl bg-white/5 border border-white/10">
          <button
            onClick={() => setActiveTab('INR')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'INR'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ₹ Domestic UPI Wallet
          </button>
          <button
            onClick={() => setActiveTab('GLOBAL')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'GLOBAL'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            Global Accounts (USD/EUR)
          </button>
        </div>

        {/* Linked Primary Bank Account Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
          <Building2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-medium">{selectedAccount.bankName}</span>
          <span className="text-gray-500">{selectedAccount.accountNumber}</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-mono">
            UPI Active
          </span>
        </div>

      </div>

      {/* Primary Balance Section */}
      {activeTab === 'INR' ? (
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            <span>Available UPI Balance</span>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              title={showBalance ? 'Hide Balance' : 'Show Balance'}
            >
              {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex flex-wrap items-baseline gap-4 mb-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-mono">
              {showBalance ? formatINR(user.inrBalance) : '₹ • • • • • •'}
            </h1>
            <div className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Instant NPCI Settlement</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 mb-8 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Linked with HDFC Bank (IFSC: HDFC0001234) • Instant 24/7 transfers
          </p>
        </div>
      ) : (
        /* Global Currency View (Infinity App International Inwards) */
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-cyan-400 uppercase tracking-wider mb-1">
                <span>International Client Balances</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
                {formatINR(totalGlobalInInr)}
                <span className="text-sm font-normal text-gray-400 ml-2">est. total</span>
              </h2>
            </div>
            
            <button
              onClick={onOpenFira}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-medium transition-all cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>View FIRA Advice</span>
            </button>
          </div>

          {/* Currency Sub-Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span className="font-semibold text-white">🇺🇸 USD Virtual A/C</span>
                <span className="text-[11px] text-cyan-400">@ 86.85</span>
              </div>
              <div className="text-xl font-bold text-white font-mono">
                {formatCurrency(user.globalBalances.USD, 'USD')}
              </div>
              <div className="text-[11px] text-gray-400 mt-1">
                ≈ {formatINR(user.globalBalances.USD * user.fxRates.USD)}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span className="font-semibold text-white">🇪🇺 EUR Virtual IBAN</span>
                <span className="text-[11px] text-cyan-400">@ 94.20</span>
              </div>
              <div className="text-xl font-bold text-white font-mono">
                {formatCurrency(user.globalBalances.EUR, 'EUR')}
              </div>
              <div className="text-[11px] text-gray-400 mt-1">
                ≈ {formatINR(user.globalBalances.EUR * user.fxRates.EUR)}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span className="font-semibold text-white">🇬🇧 GBP Sort Code</span>
                <span className="text-[11px] text-cyan-400">@ 111.45</span>
              </div>
              <div className="text-xl font-bold text-white font-mono">
                {formatCurrency(user.globalBalances.GBP, 'GBP')}
              </div>
              <div className="text-[11px] text-gray-400 mt-1">
                ≈ {formatINR(user.globalBalances.GBP * user.fxRates.GBP)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Action Buttons Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
        
        {/* Send Money Button */}
        <button
          onClick={onOpenSend}
          className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-semibold text-sm shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all cursor-pointer"
        >
          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          <span>Pay / Send</span>
        </button>

        {/* Receive / QR Button */}
        <button
          onClick={onOpenReceive}
          className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 active:scale-[0.98] transition-all cursor-pointer"
        >
          <QrCode className="w-4 h-4 text-emerald-400" />
          <span>My UPI QR</span>
        </button>

        {/* Add Money Button */}
        <button
          onClick={onOpenAddMoney}
          className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 text-cyan-400" />
          <span>Add Money</span>
        </button>

        {/* Convert Global FX / Settle */}
        <button
          onClick={onOpenConvertGlobal}
          className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-300 font-semibold text-sm border border-cyan-500/30 active:scale-[0.98] transition-all cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 text-cyan-400" />
          <span>Settle FX (0.5%)</span>
        </button>

      </div>

    </div>
  );
};
