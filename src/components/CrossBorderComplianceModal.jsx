import React from 'react';
import { 
  X, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Globe2, 
  FileCheck2, 
  Scale, 
  TrendingUp, 
  AlertTriangle,
  FileText
} from 'lucide-react';

export const CrossBorderComplianceModal = ({ isOpen, onClose, account, onOpenRemitToIndia }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                US-India Cross-Border Entity & Banking Structure
              </h3>
              <p className="text-xs text-gray-500">
                Delaware Parent (Mercury/Brex) ➔ Indian Operating Subsidiary Route
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[75vh] space-y-6">
          
          {/* Critical CA / Legal Warning Box */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <strong className="block text-sm font-bold text-amber-950 mb-0.5">
                Indian Foreign Exchange (FEMA) Legal Notice
              </strong>
              Under Indian foreign-exchange regulations (RBI FEMA guidelines), inward funds from the foreign parent company must follow proper cross-border structuring with a licensed <strong>Chartered Accountant (CA)</strong> and legal counsel. Do not execute intercompany remittances purely from internet forums.
            </div>
          </div>

          {/* The 4-Step Proper Sequential Roadmap */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Standard YC Venture Capital Capital Pipeline
            </h4>

            <div className="space-y-3">
              
              {/* Step 1 */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-2">
                    <strong className="text-gray-900 font-bold text-sm">Form Delaware C-Corp Parent Company</strong>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800 font-bold">COMPLETED</span>
                  </div>
                  <p className="text-gray-600 mt-1">
                    <strong>Blackbird Finance Inc.</strong> registered in Delaware (File #7491028, EIN: 93-8472910). YC invests strictly into the US parent entity via standard Post-Money SAFE agreements.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-2">
                    <strong className="text-gray-900 font-bold text-sm">Open Startup Bank / Fintech Account (Mercury / Brex)</strong>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800 font-bold">ACTIVE</span>
                  </div>
                  <p className="text-gray-600 mt-1">
                    USD account opened with <strong>Mercury / Choice Financial Group</strong> (Sweep network with up to $5M FDIC insurance). Enables idle cash treasury products.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-2">
                    <strong className="text-gray-900 font-bold text-sm">Receive $500k from Y Combinator into US Account</strong>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800 font-bold">CLEARED</span>
                  </div>
                  <p className="text-gray-600 mt-1">
                    $500,000 received via SWIFT/Fedwire from Y Combinator LLC. <strong>$450,000</strong> allocated to Mercury Treasury Money Market Fund yielding <strong>5.02% APY (~$1,882/month passive income)</strong>, leaving $74,324 liquid in checking.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  4
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-2">
                    <strong className="text-gray-900 font-bold text-sm">Remit to Indian Subsidiary (Blackbird Finance Pvt Ltd)</strong>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-200 text-purple-800 font-bold">READY TO REMIT</span>
                  </div>
                  <p className="text-gray-600 mt-1">
                    Funds reach the Indian operating company via one of two compliant cross-border routes:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                    <div className="p-3 rounded-xl bg-white border border-purple-100">
                      <div className="font-bold text-gray-900 flex items-center gap-1.5 text-xs">
                        <span>Route A: Service Fees</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-100 text-purple-700 font-bold">RECOMMENDED</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1">
                        Master Services Agreement (MSA) on Cost-Plus 10-15% transfer pricing. Indian Co. bills monthly software export invoice. Automatic FIRA issued.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-purple-100">
                      <div className="font-bold text-gray-900 text-xs">
                        Route B: Foreign Direct Investment (FDI)
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1">
                        US Parent buys equity shares in Indian subsidiary. Requires filing Form FC-GPR via RBI FIRMS portal within 30 days + CA valuation certificate.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Action to Remit Runway to Indian Subsidiary */}
          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenRemitToIndia && onOpenRemitToIndia();
              }}
              className="w-full py-3.5 rounded-xl bg-[#6c5ce7] hover:bg-[#5b4bc4] text-white font-bold text-sm transition-all shadow-sm shadow-purple-500/20 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Remit Runway to Indian Subsidiary (Service Fees)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
