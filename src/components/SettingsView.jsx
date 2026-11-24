import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  RotateCcw, 
  Key, 
  Users, 
  CheckCircle2, 
  Check, 
  Copy,
  Lock
} from 'lucide-react';

export const SettingsView = ({ account, onResetData }) => {
  const [copiedKey, setCopiedKey] = useState(null);

  const copyText = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6 font-waldenburg max-w-4xl animate-fadeIn">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-normal text-gray-950 font-instrument">Workspace &amp; Treasury Settings</h2>
        <p className="text-xs text-gray-500 mt-1">
          Entity governance, authorized bank signatories, API keys, and workspace ledger configurations
        </p>
      </div>

      {/* Authorized Signatories Card */}
      <div className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-normal text-gray-950 font-instrument">Authorized Bank Signatories</h3>
            <p className="text-xs text-gray-500">Dual-authorization required for treasury payouts &gt; ₹50,00,000</p>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
            KYC Verified
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xs">
                MB
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-900">Mahesh Bai</h4>
                <p className="text-[11px] text-gray-500">Founder &amp; Director (A-Signatory)</p>
              </div>
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">Active</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xs">
                SK
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-900">Saharsh Keerthi</h4>
                <p className="text-[11px] text-gray-500">Co-Founder &amp; Director (A-Signatory)</p>
              </div>
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">Active</span>
          </div>
        </div>
      </div>

      {/* Connected Payment & Banking Gateway APIs */}
      <div className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs space-y-4">
        <h3 className="text-base font-normal text-gray-950 font-instrument">Gateway &amp; Webhook Credentials</h3>
        
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/60 flex items-center justify-between">
            <div>
              <span className="font-semibold text-gray-900 block">RazorpayX / NPCI Direct Route</span>
              <span className="font-mono text-[11px] text-gray-500">rzp_live_corporate_sec_****4918</span>
            </div>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Production Connected
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/60 flex items-center justify-between">
            <div>
              <span className="font-semibold text-gray-900 block">Mercury Bank API Gateway</span>
              <span className="font-mono text-[11px] text-gray-500">mercury_prod_key_****8912</span>
            </div>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Read/Write Access
            </span>
          </div>
        </div>
      </div>

      {/* Dangerous Zone / State Reset */}
      <div className="p-5 rounded-3xl bg-rose-50/50 border border-rose-200 shadow-xs space-y-3">
        <h3 className="text-base font-normal text-rose-950 font-instrument">Data Management &amp; State Reset</h3>
        <p className="text-xs text-rose-800">
          Restore initial clean state of ₹4,64,50,000 INR ($500k USD YC W27 allocation) and clear temporary test transactions.
        </p>

        <button
          onClick={onResetData}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All State to ₹4.64 Cr ($500k Pristine)</span>
        </button>
      </div>

    </div>
  );
};
