import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  Building2, 
  FileCheck2, 
  Printer, 
  Infinity as InfinityIcon,
  ShieldCheck,
  Globe2
} from 'lucide-react';
import { formatINR, formatCurrency, formatDate } from '../utils/formatters';

export const TransactionReceiptModal = ({ 
  isOpen, 
  onClose, 
  transaction, 
  user, 
  onViewFira 
}) => {
  const [copiedUtr, setCopiedUtr] = useState(false);
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  if (!isOpen || !transaction) return null;

  const isCredit = transaction.direction === 'credit';

  const handleCopyUtr = () => {
    navigator.clipboard.writeText(transaction.utr);
    setCopiedUtr(true);
    setTimeout(() => setCopiedUtr(false), 2000);
  };

  const handleShareReceipt = () => {
    const text = `Infinity UPI Payment Receipt\nAmount: ₹${transaction.amount}\nUTR: ${transaction.utr}\nStatus: ${transaction.status}\nDate: ${formatDate(transaction.date)}`;
    navigator.clipboard.writeText(text);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#121624] border border-white/10 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-black border border-emerald-500/30 flex items-center justify-center">
              <InfinityIcon className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-sm font-bold text-white tracking-tight">
              Payment Receipt
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Receipt Body */}
        <div className="p-6">
          
          <div className="text-center pb-6 border-b border-white/10">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>

            <div className="text-xs uppercase tracking-wider font-semibold text-emerald-400 mb-1">
              Payment {transaction.status}
            </div>

            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono mb-2">
              {isCredit ? '+' : '-'}{formatINR(transaction.amount)}
            </div>

            <p className="text-sm font-medium text-gray-300">
              {transaction.title}
            </p>
            <p className="text-xs text-gray-400 font-mono">
              {transaction.subtitle}
            </p>
          </div>

          {/* Details list */}
          <div className="py-4 space-y-3 text-xs border-b border-white/10">
            
            {/* NPCI UTR */}
            <div className="flex items-center justify-between">
              <span className="text-gray-400">NPCI Reference (UTR)</span>
              <button
                onClick={handleCopyUtr}
                className="font-mono text-white font-bold flex items-center gap-1.5 hover:text-emerald-300 cursor-pointer"
              >
                <span>{transaction.utr}</span>
                {copiedUtr ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-gray-500" />
                )}
              </button>
            </div>

            {/* Date */}
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Transaction Time</span>
              <span className="text-gray-200">{formatDate(transaction.date)}</span>
            </div>

            {/* Payment Method */}
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Payment Channel</span>
              <span className="text-gray-200 font-medium">{transaction.paymentMethod}</span>
            </div>

            {/* Remark */}
            {transaction.note && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Remark / Note</span>
                <span className="text-gray-200 italic">{transaction.note}</span>
              </div>
            )}

            {/* If International Inward (Infinity App Feature) */}
            {transaction.type === 'international_inward' && (
              <div className="mt-3 p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 space-y-1.5 text-cyan-200">
                <div className="flex items-center justify-between font-semibold">
                  <span>Gross Foreign Inward</span>
                  <span className="font-mono">{formatCurrency(transaction.foreignAmount, transaction.currency)}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-cyan-300">
                  <span>Exchange Rate Applied</span>
                  <span className="font-mono">1 {transaction.currency} = ₹{(transaction.amount / transaction.foreignAmount).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-cyan-300">
                  <span>Infinity Transparent Fee</span>
                  <span>0.5% (Flat Zero FX Markup)</span>
                </div>
                {transaction.firaAvailable && (
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        onClose();
                        onViewFira(transaction);
                      }}
                      className="w-full py-1.5 rounded-lg bg-cyan-500 text-black font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:bg-cyan-400 transition-colors"
                    >
                      <FileCheck2 className="w-3.5 h-3.5" />
                      <span>Download FIRA Certificate</span>
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* NPCI Verified Badge */}
          <div className="pt-4 flex items-center justify-center gap-2 text-[11px] text-gray-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Authorized by National Payments Corporation of India</span>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
              onClick={handleShareReceipt}
              className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              {copiedReceipt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedReceipt ? 'Copied Receipt' : 'Share Receipt'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shadow-emerald-500/20"
            >
              <Printer className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Print / PDF</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
