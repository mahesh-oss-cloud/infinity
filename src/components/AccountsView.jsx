import React, { useState } from 'react';
import { 
  Building2, 
  Landmark, 
  Coins, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownLeft,
  Lock,
  ChevronRight
} from 'lucide-react';

export const AccountsView = ({ account, onOpenTransfer, onOpenReceive }) => {
  const [copiedKey, setCopiedKey] = useState(null);

  const copyText = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6 font-waldenburg animate-fadeIn">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-normal text-gray-950 font-instrument">Corporate Bank &amp; Treasury Accounts</h2>
        <p className="text-xs text-gray-500 mt-1">
          Connected primary depositary accounts across US Delaware Parent, Bengaluru Operating Subsidiary, and Web3 Reserve
        </p>
      </div>

      {/* 3 Main Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Account 1: Delaware US Parent (Mercury Treasury Sweep) */}
        <div className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 font-bold border border-blue-200">
                US Delaware C-Corp Parent
              </span>
              <span className="text-xs font-mono text-gray-400">USD</span>
            </div>

            <h3 className="text-lg font-normal text-gray-950 font-instrument">
              Mercury Treasury &amp; Checking
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Choice Financial Group / Multi-Bank Sweep Network
            </p>

            <div className="mt-4 p-3 rounded-2xl bg-gray-50 border border-gray-200/60 space-y-2 text-xs">
              <div className="flex justify-between items-center text-gray-600">
                <span>Account Number:</span>
                <div className="flex items-center gap-1 font-mono font-medium text-gray-900">
                  <span>{account.fullAccountNumber || '718940291845'}</span>
                  <button onClick={() => copyText('mercury-acct', account.fullAccountNumber || '718940291845')}>
                    {copiedKey === 'mercury-acct' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-gray-400" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-gray-600">
                <span>Routing (ABA / Wire):</span>
                <span className="font-mono font-medium text-gray-900">{account.routingNumber || '121000358'}</span>
              </div>

              <div className="flex justify-between items-center text-gray-600">
                <span>SWIFT Code:</span>
                <span className="font-mono font-medium text-gray-900">{account.swiftCode || 'MERCUS33XXX'}</span>
              </div>

              <div className="flex justify-between items-center text-gray-600 pt-1.5 border-t border-gray-200/60">
                <span>FDIC Sweep Insurance:</span>
                <span className="font-semibold text-emerald-700">{account.fdicInsurance || '$5,000,000'}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-medium">Yield APY</span>
              <span className="text-sm font-semibold text-gray-900 font-instrument">{account.treasuryApy || '4.75% APY'}</span>
            </div>
            <button
              onClick={onOpenTransfer}
              className="px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-semibold cursor-pointer shadow-xs"
            >
              Transfer Funds
            </button>
          </div>
        </div>

        {/* Account 2: Indian Operating Co. (HDFC Bank Koramangala) */}
        <div className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                Indian Operating Subsidiary
              </span>
              <span className="text-xs font-mono text-gray-400">INR (₹)</span>
            </div>

            <h3 className="text-lg font-normal text-gray-950 font-instrument">
              HDFC Corporate Current Account
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Koramangala 4th Block Branch, Bengaluru 560034
            </p>

            <div className="mt-4 p-3 rounded-2xl bg-gray-50 border border-gray-200/60 space-y-2 text-xs">
              <div className="flex justify-between items-center text-gray-600">
                <span>Account Number:</span>
                <div className="flex items-center gap-1 font-mono font-medium text-gray-900">
                  <span>50200049219812</span>
                  <button onClick={() => copyText('hdfc-acct', '50200049219812')}>
                    {copiedKey === 'hdfc-acct' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-gray-400" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-gray-600">
                <span>IFSC Code:</span>
                <span className="font-mono font-medium text-gray-900">{account.indianSubsidiary?.ifsc || 'HDFC0001234'}</span>
              </div>

              <div className="flex justify-between items-center text-gray-600">
                <span>CIN:</span>
                <span className="font-mono text-[11px] text-gray-900">{account.indianSubsidiary?.cin || 'U72900KA2026PTC194821'}</span>
              </div>

              <div className="flex justify-between items-center text-gray-600 pt-1.5 border-t border-gray-200/60">
                <span>Primary Runway:</span>
                <span className="font-semibold text-gray-950 font-instrument text-sm">
                  ₹{Math.round(account.balance).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-medium">Payment Rails</span>
              <span className="text-xs font-semibold text-gray-900">UPI / IMPS / RTGS 24x7</span>
            </div>
            <button
              onClick={onOpenReceive}
              className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs font-semibold cursor-pointer"
            >
              Receive Details
            </button>
          </div>
        </div>

        {/* Account 3: BBUSD Tokenized Reserve Escrow (Polygon) */}
        <div className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 font-bold border border-purple-200">
                Web3 Institutional Vault
              </span>
              <span className="text-xs font-mono text-gray-400">ERC-20</span>
            </div>

            <h3 className="text-lg font-normal text-gray-950 font-instrument">
              Blackbird USD (BBUSD) Vault
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Polygon POS Network • 1:1 Fiat Escrow Backed
            </p>

            <div className="mt-4 p-3 rounded-2xl bg-purple-50/50 border border-purple-200/60 space-y-2 text-xs">
              <div className="flex justify-between items-center text-gray-600">
                <span>Contract Address:</span>
                <div className="flex items-center gap-1 font-mono font-medium text-purple-900">
                  <span>0x345CE5FB...C936f6bE</span>
                  <button onClick={() => copyText('contract', '0x345CE5FBa186E1879008988C1B7c69ff0C936f6bE')}>
                    {copiedKey === 'contract' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-gray-400" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-gray-600">
                <span>Reserve Backing Ratio:</span>
                <span className="font-semibold text-emerald-700">100.0% Fully Backed</span>
              </div>

              <div className="flex justify-between items-center text-gray-600">
                <span>Total Escrow Reserve:</span>
                <span className="font-medium text-gray-900">$500,000 USD (₹4.64 Cr)</span>
              </div>

              <div className="flex justify-between items-center text-gray-600 pt-1.5 border-t border-purple-200/60">
                <span>Independent Attestation:</span>
                <span className="font-semibold text-purple-900">Grant Thornton Verified</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-medium">Smart Contract</span>
              <span className="text-xs font-semibold text-gray-900">Audited OpenZeppelin v5</span>
            </div>
            <a
              href="https://polygonscan.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-xs font-semibold text-purple-700 hover:text-purple-900"
            >
              <span>PolygonScan</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};
