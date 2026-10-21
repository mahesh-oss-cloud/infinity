import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  Building2, 
  Globe2, 
  FileCheck2, 
  ShieldCheck, 
  Info,
  Scale
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const IntercompanyTransferModal = ({ 
  isOpen, 
  onClose, 
  account, 
  onCompleteIntercompanyRemittance 
}) => {
  const [remittanceType, setRemittanceType] = useState('service_fee'); // 'service_fee' or 'fdi_equity'
  const [usdAmount, setUsdAmount] = useState('25000'); // $25k monthly burn
  const [invoiceNumber, setInvoiceNumber] = useState('INV-IN-2026-10');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const numUsd = parseFloat(usdAmount) || 0;
  const inrRate = 86.85;
  const inrEquivalent = numUsd * inrRate;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (numUsd <= 0 || numUsd > account.checkingBalance) {
      alert(`Invalid amount or exceeds available US checking balance ($${Math.round(account.checkingBalance).toLocaleString()})`);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      const firaId = `FIRA-IN-${Date.now().toString().slice(-6)}`;
      const newTx = {
        id: `tx-remit-${Date.now()}`,
        title: 'Blackbird Finance India Pvt Ltd',
        subtitle: remittanceType === 'service_fee' 
          ? `Intercompany Service Fee (${invoiceNumber}) • Bengaluru`
          : 'FDI Equity Capital Subscription • Bengaluru',
        category: 'Subsidiary Transfer',
        amount: -numUsd,
        type: 'CROSS_BORDER_INTERCOMPANY',
        direction: 'debit',
        date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }) + ' - ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
        timestamp: new Date().toISOString(),
        status: 'Completed (FIRA Issued)',
        brandIcon: 'india',
        firaAvailable: true,
        firaId: firaId,
        note: remittanceType === 'service_fee'
          ? `Cost-Plus 10% Transfer Pricing MSA • Realized ₹${Math.round(inrEquivalent).toLocaleString('en-IN')}`
          : `Foreign Direct Investment Capital Injection • Form FC-GPR filing required`,
      };

      onCompleteIntercompanyRemittance(newTx, numUsd);
      onClose();

      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff9933', '#ffffff', '#138808', '#6c5ce7'],
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#ff9933]/15 text-[#ff6600] flex items-center justify-center text-sm font-bold">
              🇮🇳
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Remit Runway to Indian Subsidiary
              </h3>
              <p className="text-[11px] text-gray-500">
                US Parent (Delaware) ➔ Indian Operating Co. (Bengaluru)
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

        <div className="p-6">
          
          {/* Transfer Route Selector */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-gray-100 mb-5 text-xs">
            <button
              type="button"
              onClick={() => setRemittanceType('service_fee')}
              className={`py-2 px-3 rounded-xl font-bold transition-all cursor-pointer ${
                remittanceType === 'service_fee'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Route A: Service Fees (Cost-Plus)
            </button>
            <button
              type="button"
              onClick={() => setRemittanceType('fdi_equity')}
              className={`py-2 px-3 rounded-xl font-bold transition-all cursor-pointer ${
                remittanceType === 'fdi_equity'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Route B: FDI Equity Capital
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Beneficiary Entity Card */}
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-1">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold block">
                Receiving Indian Subsidiary Account
              </span>
              <div className="font-bold text-gray-900 text-sm">
                {account.indianSubsidiary.legalName}
              </div>
              <div className="text-gray-600 font-mono text-[11px]">
                {account.indianSubsidiary.bankName} • A/C: {account.indianSubsidiary.accountMasked} (IFSC: {account.indianSubsidiary.ifsc})
              </div>
              <div className="text-[10px] text-gray-400">
                CIN: {account.indianSubsidiary.cin} • PAN: {account.indianSubsidiary.pan}
              </div>
            </div>

            {/* USD Amount */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                <span>Remittance Amount (USD)</span>
                <span className="text-gray-400">
                  Checking Avail: ${Math.round(account.checkingBalance).toLocaleString()}
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  required
                  min="1"
                  max={account.checkingBalance}
                  value={usdAmount}
                  onChange={(e) => setUsdAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 text-xl font-bold font-sans text-gray-900 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Conversion calculation */}
            <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-gray-500 text-[11px] block">Estimated Inward INR in India (@ 86.85):</span>
                <span className="text-base font-extrabold text-purple-900 font-mono">
                  ₹{Math.round(inrEquivalent).toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                Auto FIRA Ready
              </span>
            </div>

            {remittanceType === 'service_fee' ? (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Intercompany Monthly Invoice Number
                </label>
                <input
                  type="text"
                  required
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-mono text-gray-900 focus:outline-none focus:border-purple-500"
                />
                <p className="text-[10px] text-gray-500 mt-1">
                  Compliant with Master Services Agreement (MSA) Transfer Pricing Cost-Plus 10%
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                <strong>FDI Filing Requirement:</strong> Must file Form FC-GPR on the RBI FIRMS portal within 30 days of share allotment with a Chartered Accountant (CA) valuation certificate.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !numUsd}
              className="w-full py-3.5 rounded-xl bg-[#6c5ce7] hover:bg-[#5b4bc4] disabled:opacity-50 text-white font-bold text-sm transition-all shadow-sm shadow-purple-500/25 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Executing Cross-Border Wire...</span>
              ) : (
                <>
                  <span>Remit ${numUsd ? numUsd.toLocaleString() : '0'} to Indian Co.</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Full compliance trail with automated e-FIRA generation</span>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
