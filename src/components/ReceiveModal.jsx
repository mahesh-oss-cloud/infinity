import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Building2, 
  ShieldCheck, 
  Globe2, 
  Download,
  Share2,
} from 'lucide-react';

export const ReceiveModal = ({ isOpen, onClose, account }) => {
  const [copiedField, setCopiedField] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);

  if (!isOpen) return null;

  const wireDetails = [
    { label: 'Beneficiary / Account Name', value: account.accountHolderName },
    { label: 'Account Number', value: account.fullAccountNumber },
    { label: 'Account Type', value: account.accountTitle },
    { label: 'SWIFT / BIC Code (International)', value: account.swiftCode },
    { label: 'ABA Routing Number (Domestic Wire & ACH)', value: account.routingNumber },
    { label: 'Receiving Bank Name', value: account.bankName },
    { label: 'Bank Address', value: account.bankAddress },
  ];

  const handleCopy = (field, val) => {
    navigator.clipboard.writeText(val);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCopyAll = () => {
    const text = `BLACKBIRD FINANCE WIRING INSTRUCTIONS\n\nBeneficiary Name: ${account.accountHolderName}\nAccount Number: ${account.fullAccountNumber}\nAccount Type: ${account.accountTitle}\nSWIFT/BIC Code: ${account.swiftCode}\nABA Routing (Wire/ACH): ${account.routingNumber}\nBank Name: ${account.bankName}\nBank Address: ${account.bankAddress}\nFDIC Insured: ${account.fdicInsurance}`;
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Globe2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                SWIFT Wire & ACH Deposit Details
              </h3>
              <p className="text-[11px] text-gray-500">
                Instructions for investors & partners (e.g. Y Combinator)
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

        {/* Body */}
        <div className="p-6">
          
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 mb-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">
                Official Account of
              </span>
              <h4 className="text-sm font-bold text-gray-900">
                {account.accountHolderName}
              </h4>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-white border border-purple-200 text-purple-700 font-bold font-mono">
              4.85% APY
            </span>
          </div>

          {/* Details list */}
          <div className="space-y-2.5 text-xs">
            {wireDetails.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50/80 border border-gray-100 hover:bg-gray-100 transition-colors"
              >
                <div>
                  <span className="text-[11px] text-gray-500 block font-medium">
                    {item.label}
                  </span>
                  <span className="font-bold text-gray-900 font-mono text-xs">
                    {item.value}
                  </span>
                </div>

                <button
                  onClick={() => handleCopy(item.label, item.value)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-purple-600 transition-colors cursor-pointer"
                  title="Copy"
                >
                  {copiedField === item.label ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-6">
            <button
              onClick={handleCopyAll}
              className="py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {copiedAll ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedAll ? 'Instructions Copied' : 'Copy All Wire Info'}</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
