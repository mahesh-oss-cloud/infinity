import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Globe2, 
  Zap, 
  QrCode, 
  FileCheck2, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Copy,
  Check,
  ChevronRight,
  Download,
  Share2
} from 'lucide-react';
import { formatINR, formatCurrency, formatDate, formatRelativeTime } from '../utils/formatters';

export const TransactionList = ({ 
  transactions, 
  onSelectTransaction, 
  onViewFira 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [copiedUtr, setCopiedUtr] = useState(null);

  const handleCopyUtr = (e, utr) => {
    e.stopPropagation();
    navigator.clipboard.writeText(utr);
    setCopiedUtr(utr);
    setTimeout(() => setCopiedUtr(null), 2000);
  };

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Search match
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        tx.title.toLowerCase().includes(query) ||
        tx.subtitle.toLowerCase().includes(query) ||
        tx.utr.toLowerCase().includes(query) ||
        (tx.note && tx.note.toLowerCase().includes(query));

      if (!matchesSearch) return false;

      // Filter category
      if (activeFilter === 'ALL') return true;
      if (activeFilter === 'SENT') return tx.direction === 'debit';
      if (activeFilter === 'RECEIVED') return tx.direction === 'credit';
      if (activeFilter === 'UPI') return tx.type.startsWith('upi') || tx.type === 'qr_merchant';
      if (activeFilter === 'GLOBAL') return tx.type === 'international_inward';
      if (activeFilter === 'BILLS') return tx.type === 'bill_payment';

      return true;
    });
  }, [transactions, searchQuery, activeFilter]);

  // Monthly totals
  const { totalInward, totalOutward } = useMemo(() => {
    let inward = 0;
    let outward = 0;
    transactions.forEach(t => {
      if (t.status === 'SUCCESS') {
        if (t.direction === 'credit') inward += t.amount;
        else outward += t.amount;
      }
    });
    return { totalInward: inward, totalOutward: outward };
  }, [transactions]);

  const getTransactionIcon = (tx) => {
    if (tx.type === 'international_inward') {
      return (
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <Globe2 className="w-5 h-5" />
        </div>
      );
    }
    if (tx.type === 'bill_payment') {
      return (
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Zap className="w-5 h-5" />
        </div>
      );
    }
    if (tx.type === 'qr_merchant') {
      return (
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
          <QrCode className="w-5 h-5" />
        </div>
      );
    }
    if (tx.direction === 'credit') {
      return (
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <ArrowDownLeft className="w-5 h-5 stroke-[2.5]" />
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300">
        <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
      </div>
    );
  };

  return (
    <div className="rounded-3xl bg-[#111420]/80 border border-white/10 p-5 sm:p-7 shadow-xl">
      
      {/* Header & Stats Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>Transaction History</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/10 font-normal">
              {filteredTransactions.length} records
            </span>
          </h2>
          <p className="text-xs text-gray-400">Real-time NPCI UPI Statement & FIRA Inward Records</p>
        </div>

        {/* Quick In/Out Summary Chips */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
            <span className="text-gray-400 mr-1.5">In:</span>
            <span className="text-emerald-400 font-bold font-mono">+{formatINR(totalInward, false)}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs">
            <span className="text-gray-400 mr-1.5">Out:</span>
            <span className="text-gray-300 font-bold font-mono">-{formatINR(totalOutward, false)}</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Tabs */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, UPI ID, note, or UTR..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'ALL', label: 'All' },
            { id: 'SENT', label: 'Sent' },
            { id: 'RECEIVED', label: 'Received' },
            { id: 'UPI', label: 'UPI Direct' },
            { id: 'GLOBAL', label: 'Global (FIRA)' },
            { id: 'BILLS', label: 'Bills' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Transaction List Entries */}
      <div className="space-y-2.5">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl bg-white/[0.02] border border-dashed border-white/10">
            <AlertCircle className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-300">No transactions match your search</p>
            <p className="text-xs text-gray-500 mt-1">Try searching a different name, UPI ID, or filter</p>
          </div>
        ) : (
          filteredTransactions.map((tx) => {
            const isCredit = tx.direction === 'credit';
            return (
              <div
                key={tx.id}
                onClick={() => onSelectTransaction(tx)}
                className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-white/15 transition-all cursor-pointer active:scale-[0.99]"
              >
                {/* Left: Icon & Title info */}
                <div className="flex items-center gap-3.5 min-w-0">
                  {getTransactionIcon(tx)}
                  
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white truncate group-hover:text-emerald-300 transition-colors">
                        {tx.title}
                      </h4>

                      {/* FIRA Advice Available tag */}
                      {tx.firaAvailable && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewFira(tx);
                          }}
                          className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 cursor-pointer"
                        >
                          <FileCheck2 className="w-3 h-3" />
                          <span>FIRA</span>
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mt-0.5">
                      <span className="truncate max-w-[200px] sm:max-w-none">{tx.subtitle}</span>
                      <span className="text-gray-600 hidden sm:inline">•</span>
                      <span className="text-[11px] text-gray-500">{formatRelativeTime(tx.date)}</span>
                      <span className="text-gray-600 hidden sm:inline">•</span>
                      
                      {/* UTR Pill */}
                      <button
                        onClick={(e) => handleCopyUtr(e, tx.utr)}
                        className="text-[10px] font-mono text-gray-500 hover:text-gray-300 flex items-center gap-1 cursor-pointer"
                        title="Copy NPCI UTR"
                      >
                        UTR: {tx.utr.slice(0, 4)}...{tx.utr.slice(-4)}
                        {copiedUtr === tx.utr ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 opacity-60" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Amount & Status */}
                <div className="text-right flex-shrink-0 pl-3">
                  <div className={`text-sm sm:text-base font-bold font-mono ${
                    isCredit ? 'text-emerald-400' : 'text-gray-100'
                  }`}>
                    {isCredit ? '+' : '-'}{formatINR(tx.amount)}
                  </div>

                  {/* Foreign sub-amount if international inward */}
                  {tx.foreignAmount && (
                    <div className="text-[11px] text-cyan-400 font-mono">
                      {formatCurrency(tx.foreignAmount, tx.currency)}
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-1 text-[10px] text-gray-400 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Completed</span>
                    <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-gray-300 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
