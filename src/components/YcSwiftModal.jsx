import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  Printer, 
  ShieldCheck, 
  Building2, 
  FileText,
  Landmark
} from 'lucide-react';

export const YcSwiftModal = ({ isOpen, onClose, transaction }) => {
  const [copiedRef, setCopiedRef] = useState(false);

  if (!isOpen) return null;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(transaction?.swiftReference || 'YC-W27-FEDWIRE-500K-89210');
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-2xl">
        
        {/* Header with Instrument Serif title */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#ff6600] flex items-center justify-center p-1.5 shadow-xs flex-shrink-0">
              <svg viewBox="0 0 256 256" className="w-full h-full" preserveAspectRatio="xMidYMid">
                <path 
                  d="M119.373653,144.745813 L75.43296,62.4315733 L95.5144533,62.4315733 L121.36192,114.52416 C121.759575,115.452022 122.2235,116.413008 122.753707,117.407147 C123.283914,118.401285 123.747838,119.428546 124.145493,120.48896 C124.410597,120.886615 124.609422,121.251127 124.741973,121.582507 C124.874525,121.913886 125.007075,122.212123 125.139627,122.477227 C125.802386,123.802744 126.39886,125.095105 126.929067,126.354347 C127.459274,127.613589 127.923198,128.773399 128.320853,129.833813 C129.381268,127.580433 130.541078,125.1614 131.80032,122.57664 C133.059562,119.99188 134.351922,117.307747 135.67744,114.52416 L161.92256,62.4315733 L180.612267,62.4315733 L136.27392,145.739947 L136.27392,198.826667 L119.373653,198.826667 L119.373653,144.745813 Z" 
                  fill="#FFFFFF" 
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-normal text-gray-950 font-instrument">
                Fedwire Funds Transfer Confirmation (W27)
              </h3>
              <p className="text-[11px] text-gray-500">
                Official Y Combinator W27 Standard Deal SAFE Deposit
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SWIFT / Fedwire Advice Slip */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          
          {/* Main Status & Amount Banner in Instrument Serif */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 mb-6 text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="text-[11px] font-bold text-gray-700 uppercase tracking-wider font-mono">
              FUNDS SETTLED & CLEARED • Y COMBINATOR W27
            </div>
            <div className="text-4xl sm:text-5xl font-normal text-gray-950 mt-1 font-instrument">
              $500,000.00 <span className="text-sm font-sans font-semibold text-gray-500">USD</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Beneficiary: <strong>Blackbird Finance Inc. (Delaware C-Corp)</strong>
            </p>
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold">
              <Landmark className="w-3.5 h-3.5" />
              <span>$450k earning 5.02% APY in Vanguard US Treasury Money Market</span>
            </div>
          </div>

          {/* Actual YC Deal Legal Term Sheet Box */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs mb-5 space-y-2 font-waldenburg">
            <span className="text-[10px] text-amber-900 font-bold uppercase tracking-wider block font-waldenburg">
              Actual Y Combinator Standard Investment Structure
            </span>
            <div className="grid grid-cols-2 gap-2 text-gray-900">
              <div className="p-2.5 rounded-xl bg-white border border-amber-100">
                <div className="font-normal text-gray-950 font-instrument text-base">Tranche 1: $125,000 USD</div>
                <div className="text-[11px] text-gray-600 font-waldenburg">Post-Money SAFE for 7% Equity</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-amber-100">
                <div className="font-normal text-gray-950 font-instrument text-base">Tranche 2: $375,000 USD</div>
                <div className="text-[11px] text-gray-600 font-waldenburg">Uncapped MFN (Most Favored Nation) SAFE</div>
              </div>
            </div>
          </div>

          {/* Federal Reserve Wire Details */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-3 font-mono">
            
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Fedwire IMAD / OMAD</span>
              <span className="font-bold text-gray-900">{transaction?.imad || '20270115B1Q8472900192'}</span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Fedwire Ref Number</span>
              <button
                onClick={handleCopyRef}
                className="font-bold text-gray-900 hover:text-black flex items-center gap-1 cursor-pointer"
              >
                <span>{transaction?.swiftReference || 'YC-W27-FEDWIRE-500K-89210'}</span>
                {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
              </button>
            </div>

            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Originating Remitter</span>
              <span className="font-bold text-gray-900">Y COMBINATOR LLC (Mountain View, CA)</span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Sending Bank</span>
              <span className="font-bold text-gray-900">Silicon Valley Bank / First Citizens (ABA: 121140399)</span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Beneficiary Customer</span>
              <span className="font-bold text-gray-900">BLACKBIRD FINANCE INC. (A/C: 718940291845)</span>
            </div>

            <div>
              <span className="text-gray-500 block mb-0.5">Wire Memo / Purpose</span>
              <div className="font-bold text-gray-900">
                Y COMBINATOR W27 BATCH INVESTMENT (SAFE AGREEMENT) - BLACKBIRD FINANCE INC.
              </div>
            </div>

          </div>

          {/* Compliance & Security badge */}
          <div className="pt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Federal Reserve Bank Wire Network Settlement Verified</span>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
              onClick={handleCopyRef}
              className="py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {copiedRef ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedRef ? 'Copied Reference' : 'Copy Fedwire Ref'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="py-3 rounded-xl bg-gray-950 hover:bg-black text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download Slip</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
