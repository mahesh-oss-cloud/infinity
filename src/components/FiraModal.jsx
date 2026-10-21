import React, { useState } from 'react';
import { 
  X, 
  FileCheck2, 
  Download, 
  Printer, 
  ShieldCheck, 
  Building2, 
  CheckCircle2, 
  Share2, 
  Check,
  Infinity as InfinityIcon
} from 'lucide-react';
import { formatINR, formatCurrency, formatDate } from '../utils/formatters';

export const FiraModal = ({ isOpen, onClose, transaction, user }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const tx = transaction || {
    id: 'tx-1001',
    firaId: 'FIRA-IN-2026-98124',
    title: 'Apex Labs Inc (San Francisco)',
    amount: 104220.0,
    foreignAmount: 1200.0,
    currency: 'USD',
    utr: '429188219043',
    date: '2026-10-13T09:15:00',
    note: 'Software Development & IT Export Services (Purpose Code: P0802)',
  };

  const handleCopyFiraNo = () => {
    navigator.clipboard.writeText(tx.firaId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-[#121624] border border-white/10 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Foreign Inward Remittance Advice (e-FIRA)</h3>
              <p className="text-[11px] text-gray-400">RBI & DGFT Authorized Export Compliance Document</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Body */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          
          <div className="p-6 rounded-2xl bg-white text-gray-900 shadow-xl border border-gray-200">
            
            {/* Certificate Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-black flex items-center justify-center">
                  <InfinityIcon className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-extrabold tracking-tight">INFINITY FINANCIAL TECHNOLOGIES</div>
                  <div className="text-[9px] text-gray-500 uppercase tracking-wider">In Partnership with AD-I Category Authorized Banks</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold uppercase">
                  VERIFIED e-FIRA
                </span>
                <div className="text-[9px] text-gray-500 font-mono mt-0.5">{tx.firaId}</div>
              </div>
            </div>

            {/* Title */}
            <div className="text-center my-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-900">
                FOREIGN INWARD REMITTANCE CERTIFICATE (FIRC / FIRA)
              </h4>
              <p className="text-[10px] text-gray-500">Issued under RBI Master Direction on Inward Remittances</p>
            </div>

            {/* Grid details */}
            <div className="grid grid-cols-2 gap-3 text-xs py-3 border-y border-gray-200 my-3">
              <div>
                <span className="text-[10px] text-gray-500 block">Beneficiary Name (Indian Exporter)</span>
                <strong className="text-gray-900">{user.name}</strong>
                <span className="text-[10px] text-gray-600 block">{user.businessName}</span>
                <span className="text-[10px] text-gray-600 font-mono block">PAN: {user.panNumber}</span>
              </div>

              <div>
                <span className="text-[10px] text-gray-500 block">Overseas Remitter (Client)</span>
                <strong className="text-gray-900">{tx.title}</strong>
                <span className="text-[10px] text-gray-600 block">United States / Global Wire</span>
              </div>

              <div>
                <span className="text-[10px] text-gray-500 block">Foreign Currency Amount</span>
                <strong className="text-gray-900 font-mono text-sm">
                  {formatCurrency(tx.foreignAmount, tx.currency)}
                </strong>
              </div>

              <div>
                <span className="text-[10px] text-gray-500 block">Net INR Realized in Bank</span>
                <strong className="text-emerald-700 font-mono text-sm">
                  {formatINR(tx.amount)}
                </strong>
              </div>

              <div>
                <span className="text-[10px] text-gray-500 block">NPCI / Bank UTR No.</span>
                <span className="font-mono text-gray-800 font-bold">{tx.utr}</span>
              </div>

              <div>
                <span className="text-[10px] text-gray-500 block">RBI Purpose Code</span>
                <span className="font-mono text-gray-800 font-bold">P0802 (Software & IT Services)</span>
              </div>
            </div>

            {/* Stamp & Verification */}
            <div className="pt-3 flex items-center justify-between text-[10px] text-gray-500">
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Digitally Certified for GST Zero-Rating (LUT)</span>
              </div>
              <div className="text-right">
                <span className="block font-mono">Date: {formatDate(tx.date)}</span>
                <span className="text-[9px] text-gray-400">Infinity e-FIRA System</span>
              </div>
            </div>

          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 mt-5">
            <button
              onClick={handleCopyFiraNo}
              className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied FIRA ID' : 'Copy FIRA ID'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shadow-cyan-500/20"
            >
              <Printer className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Print / Download FIRA</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
