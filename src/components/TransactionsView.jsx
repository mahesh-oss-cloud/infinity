import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FileText,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { BrandIcon } from './BrandIcons';

export const TransactionsView = ({ transactions, onSelectTransaction }) => {
  const [filterRail, setFilterRail] = useState('ALL'); // 'ALL', 'UPI', 'WIRE', 'TOKEN'
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = transactions.filter((tx) => {
    // Filter rail
    if (filterRail === 'UPI' && tx.type !== 'PAYOUT' && tx.brandIcon !== 'gpay' && !tx.vpa) return false;
    if (filterRail === 'WIRE' && !tx.isYCombinator && tx.type !== 'TRANSFER_OUT') return false;
    if (filterRail === 'TOKEN' && !tx.title?.toLowerCase().includes('token') && !tx.title?.toLowerCase().includes('bbusd')) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = tx.title?.toLowerCase().includes(q);
      const matchSubtitle = tx.subtitle?.toLowerCase().includes(q);
      const matchUtr = tx.bankReference?.toLowerCase().includes(q) || tx.utr?.toLowerCase().includes(q);
      const matchRecipient = tx.recipient?.name?.toLowerCase().includes(q);
      if (!matchTitle && !matchSubtitle && !matchUtr && !matchRecipient) return false;
    }

    return true;
  });

  const totalInflows = transactions
    .filter(t => Number(t.amount) > 0)
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const totalOutflows = transactions
    .filter(t => t.direction === 'debit' || Number(t.amount) < 0)
    .reduce((sum, t) => sum + Math.abs(Number(t.amount) || 0), 0);

  const handleExportCsv = () => {
    const headers = ['Date', 'Title', 'Type', 'Amount', 'Currency', 'Status', 'Reference / UTR'];
    const rows = filtered.map(t => [
      t.date || t.timestamp,
      `"${t.title || ''}"`,
      t.type || 'TX',
      t.amount,
      t.currency || 'INR',
      t.status || 'Settled',
      `"${t.bankReference || t.utr || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `blackbird_treasury_ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 font-waldenburg animate-fadeIn">
      
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-normal text-gray-950 font-instrument">Enterprise Transaction Ledger</h2>
          <p className="text-xs text-gray-500 mt-1">
            Real-time audit log of all domestic UPI settlements, Fedwires, FX swaps, and tokenized reserve mints
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 text-xs font-semibold shadow-xs transition-all cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-gray-600" />
          <span>Export Ledger (CSV)</span>
        </button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs">
          <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400 block">Total Treasury Inflow</span>
          <div className="mt-1 text-2xl font-normal font-instrument text-emerald-700">
            ₹{Math.round(totalInflows).toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-gray-500 mt-0.5 block">Includes $500k YC W27 Investment SAFE</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs">
          <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400 block">Total Settled Outflows</span>
          <div className="mt-1 text-2xl font-normal font-instrument text-gray-950">
            ₹{Math.round(totalOutflows).toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-gray-500 mt-0.5 block">Vendor payouts, payroll &amp; intercompany transfers</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs">
          <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400 block">Settlement Health</span>
          <div className="mt-1 flex items-center gap-2 text-emerald-700 font-semibold text-lg">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>100% Reconciled</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-0.5 block">All transactions cleared with NPCI / Fedwire</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by payee, UTR, reference, or purpose..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-gray-500 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Rail:
          </span>
          {[
            { id: 'ALL', label: 'All Rails' },
            { id: 'UPI', label: '⚡ UPI / GPay' },
            { id: 'WIRE', label: '🏛️ Fedwire' },
            { id: 'TOKEN', label: '🪙 BBUSD Escrow' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterRail(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                filterRail === tab.id
                  ? 'bg-gray-900 text-white font-semibold'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                <th className="py-3 px-5">Transaction</th>
                <th className="py-3 px-4">Payment Rail</th>
                <th className="py-3 px-4">Status &amp; Verification</th>
                <th className="py-3 px-4">UTR / Bank Ref</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filtered.map((tx) => {
                const isCredit = Number(tx.amount) > 0;
                const isINR = tx.currency === 'INR' || (!tx.currency && Math.abs(Number(tx.amount)) > 10000);
                const formattedAmount = isINR
                  ? `${isCredit ? '+' : '-'}₹${Math.round(Math.abs(Number(tx.amount) || 0)).toLocaleString('en-IN')}`
                  : `${isCredit ? '+' : '-'}$${Math.abs(Number(tx.amount) || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

                return (
                  <tr
                    key={tx.id}
                    onClick={() => onSelectTransaction && onSelectTransaction(tx)}
                    className="hover:bg-gray-50/80 transition-colors cursor-pointer group"
                  >
                    {/* Title & Date */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <BrandIcon type={tx.brandIcon} imageUrl={tx.sender?.avatarUrl} />
                        <div>
                          <div className="font-semibold text-gray-950 group-hover:text-black">
                            {tx.title}
                          </div>
                          <div className="text-[11px] text-gray-500">
                            {tx.date || new Date(tx.timestamp || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            {tx.paymentPurpose ? ` · ${tx.paymentPurpose}` : ''}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Rail */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[11px] font-medium">
                        {tx.isYCombinator ? 'Fedwire (Delaware)' : tx.vpa ? 'NPCI UPI' : tx.brandIcon === 'bank' ? 'IMPS Bank Wire' : 'Treasury Sweep'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{tx.status || 'Settled'}</span>
                      </span>
                    </td>

                    {/* UTR / Reference */}
                    <td className="py-3.5 px-4 font-mono text-[11px] text-gray-600">
                      {tx.bankReference || tx.utr || tx.transferReference || 'NPCI-AUTO-RECON'}
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4 text-right">
                      <div className={`font-instrument text-base font-normal ${isCredit ? 'text-gray-950' : 'text-rose-700'}`}>
                        {formattedAmount}
                      </div>
                      <span className="text-[10px] text-gray-400 block">
                        {isINR ? 'Indian Rupee' : 'US Dollar'}
                      </span>
                    </td>

                    {/* Receipt link */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-600 group-hover:text-black group-hover:underline">
                        Slip <ChevronRight className="w-3 h-3" />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
