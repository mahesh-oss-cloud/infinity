import React from 'react';
import { X, ShieldCheck, Building2, CreditCard, ExternalLink } from 'lucide-react';

export const AccountDetailsModal = ({ isOpen, onClose, account }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Savings Account Overview
              </h3>
              <p className="text-[11px] text-gray-500">
                {account.companyName} Treasury Details
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

        <div className="p-6 space-y-4">
          
          {/* Card Preview */}
          <div className="p-5 rounded-2xl bg-gradient-to-tr from-gray-950 via-gray-900 to-zinc-900 text-white shadow-lg border border-gray-800">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] text-gray-400 font-waldenburg tracking-widest uppercase block">
                  BLACKBIRD FINANCE INC.
                </span>
                <div className="text-base font-normal mt-0.5 font-instrument">Corporate Savings Card</div>
              </div>
              <div className="flex items-center -space-x-2">
                <span className="w-6 h-6 rounded-full bg-[#eb001b]" />
                <span className="w-6 h-6 rounded-full bg-[#f79e1b] opacity-90" />
              </div>
            </div>

            <div className="text-xl sm:text-2xl tracking-widest mb-4 font-instrument text-white">
              6124 5643 7651 7189
            </div>

            <div className="flex justify-between items-end text-xs font-waldenburg">
              <div>
                <span className="text-[9px] text-gray-400 block font-waldenburg">ACCOUNT HOLDER</span>
                <span className="font-semibold font-waldenburg">{account.accountHolderName}</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-gray-400 block font-waldenburg">EXPIRES</span>
                <span className="font-semibold font-instrument text-sm">08/29</span>
              </div>
            </div>
          </div>

          {/* Key Specs */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2 text-xs font-waldenburg">
            <div className="flex justify-between">
              <span className="text-gray-500 font-waldenburg">Account Type</span>
              <span className="font-bold text-gray-900 font-instrument text-sm">{account.accountTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-waldenburg">Current Interest Rate</span>
              <span className="font-bold text-emerald-700 font-instrument text-sm">{account.apyRate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-waldenburg">FDIC Insurance Limit</span>
              <span className="font-bold text-gray-900 font-instrument text-sm">{account.fdicInsurance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-waldenburg">SWIFT / BIC</span>
              <span className="font-bold text-gray-900 font-mono text-xs">{account.swiftCode}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gray-900 text-white font-semibold text-xs cursor-pointer hover:bg-black transition-colors"
          >
            Done
          </button>

        </div>

      </div>
    </div>
  );
};
