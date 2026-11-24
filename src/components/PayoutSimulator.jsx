import React, { useState, useEffect } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  QrCode, 
  Landmark, 
  Zap, 
  Coins, 
  Copy, 
  Check, 
  AlertCircle,
  Building2,
  ChevronRight
} from 'lucide-react';

const PRESET_AMOUNTS = [25000, 50000, 100000, 500000];

const SAMPLE_BENEFICIARIES = {
  'mahesh@okhdfcbank': { name: 'Mahesh Bai', bank: 'HDFC Bank Ltd.' },
  'saharsh@okaxis': { name: 'Saharsh Keerthi', bank: 'Axis Bank' },
  'blackbird@icici': { name: 'Blackbird Finance Pvt Ltd', bank: 'ICICI Bank' },
  'vendor@okhdfcbank': { name: 'Cloud Infrastructure Services', bank: 'HDFC Bank Ltd.' },
};

export const PayoutSimulator = ({ balance, onPayout }) => {
  const [activeRail, setActiveRail] = useState('UPI'); // 'UPI', 'BANK', 'BBUSD'
  const [amount, setAmount] = useState('50000');
  const [vpa, setVpa] = useState('saharsh@okaxis');
  const [verifiedName, setVerifiedName] = useState('Saharsh Keerthi');
  const [purpose, setPurpose] = useState('Vendor & Services Remittance');
  
  // Bank fields
  const [accountNumber, setAccountNumber] = useState('50100492817291');
  const [ifsc, setIfsc] = useState('HDFC0001234');
  const [accountHolder, setAccountHolder] = useState('Saharsh Keerthi');
  
  // Status states
  const [status, setStatus] = useState('idle'); // 'idle' | 'routing' | 'authorizing' | 'success' | 'failure'
  const [settlementDetails, setSettlementDetails] = useState(null);
  const [copiedUtr, setCopiedUtr] = useState(false);

  // Auto-verify VPA
  useEffect(() => {
    if (activeRail === 'UPI' && vpa.includes('@')) {
      const match = SAMPLE_BENEFICIARIES[vpa.toLowerCase().trim()];
      if (match) {
        setVerifiedName(match.name);
      } else {
        const handle = vpa.split('@')[0].replace(/[._-]/g, ' ').toUpperCase();
        setVerifiedName(handle.length > 2 ? handle : 'Verified UPI Payee');
      }
    }
  }, [vpa, activeRail]);

  const handleExecutePayout = () => {
    const numAmt = parseFloat(amount);
    if (isNaN(numAmt) || numAmt <= 0) {
      alert('Please specify a valid payout amount in INR.');
      return;
    }
    if (numAmt > balance) {
      alert(`Payout amount exceeds available treasury balance (₹${Math.round(balance).toLocaleString('en-IN')}).`);
      return;
    }

    setStatus('routing');
    
    // Simulate high-speed NPCI / Bank settlement
    setTimeout(() => {
      setStatus('authorizing');
      
      setTimeout(() => {
        const utrSuffix = Math.floor(100000000000 + Math.random() * 900000000000);
        const utr = activeRail === 'UPI' 
          ? `UPI/CR/${utrSuffix}/${verifiedName.split(' ')[0].toUpperCase()}`
          : activeRail === 'BANK'
            ? `CMS${utrSuffix}HDFC`
            : `0x7b4a...${utrSuffix.toString(16).slice(-8)}`;

        const details = {
          utr,
          rail: activeRail,
          amount: numAmt,
          vpa: activeRail === 'UPI' ? vpa : undefined,
          recipientName: activeRail === 'UPI' ? verifiedName : accountHolder,
          bankName: activeRail === 'BANK' ? 'HDFC Bank Corporate' : (SAMPLE_BENEFICIARIES[vpa.toLowerCase()]?.bank || 'NPCI Member Bank'),
          bankAccountMasked: activeRail === 'BANK' ? `•••• ${accountNumber.slice(-4)}` : undefined,
          purpose,
          timestamp: new Date().toISOString(),
          npciResponseCode: '00', // Approved
        };

        setSettlementDetails(details);
        setStatus('success');
        
        // Propagate to parent state
        if (onPayout) {
          onPayout(numAmt, details);
        }
      }, 900);
    }, 700);
  };

  const copyUtrToClipboard = () => {
    if (settlementDetails?.utr) {
      navigator.clipboard.writeText(settlementDetails.utr);
      setCopiedUtr(true);
      setTimeout(() => setCopiedUtr(false), 2000);
    }
  };

  const handleResetForNewPayout = () => {
    setStatus('idle');
    setSettlementDetails(null);
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)] font-waldenburg">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-gray-950 font-instrument">Payout System</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              NPCI 24x7 Live
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time domestic &amp; international settlement
          </p>
        </div>
      </div>

      {/* Available Liquid Balance Bar */}
      <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/70 mb-4 flex items-center justify-between">
        <div className="text-xs text-gray-600">
          <span className="text-[11px] uppercase tracking-wider text-gray-400 block font-medium">Available Treasury</span>
          <span className="font-instrument text-lg text-gray-950 font-normal">
            ₹{Math.round(balance).toLocaleString('en-IN')}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] px-2 py-1 rounded-md bg-white border border-gray-200 text-gray-700 font-mono">
            Reserve Bank of India RTGS/UPI
          </span>
        </div>
      </div>

      {/* Rail Selector Tabs */}
      <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-gray-100 border border-gray-200/60 mb-4 text-xs font-medium">
        <button
          type="button"
          onClick={() => { setActiveRail('UPI'); handleResetForNewPayout(); }}
          className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeRail === 'UPI' 
              ? 'bg-white text-gray-950 shadow-xs font-semibold' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-600" />
          <span>UPI / GPay</span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveRail('BANK'); handleResetForNewPayout(); }}
          className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeRail === 'BANK' 
              ? 'bg-white text-gray-950 shadow-xs font-semibold' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Landmark className="w-3.5 h-3.5 text-blue-600" />
          <span>IMPS / Bank</span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveRail('BBUSD'); handleResetForNewPayout(); }}
          className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeRail === 'BBUSD' 
              ? 'bg-white text-gray-950 shadow-xs font-semibold' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Coins className="w-3.5 h-3.5 text-purple-600" />
          <span>BBUSD Token</span>
        </button>
      </div>

      {/* Main Content Area */}
      {status === 'success' && settlementDetails ? (
        /* SUCCESS RECEIPT STATE */
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3.5 animate-fadeIn">
          <div className="flex items-center gap-2 text-emerald-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <h4 className="text-sm font-bold">Settlement Executed Successfully</h4>
              <p className="text-[11px] text-emerald-700">Funds credited immediately via RBI Clearing Net</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 border border-emerald-200/80 space-y-2 text-xs">
            <div className="flex justify-between items-center text-gray-600">
              <span>Settled Amount:</span>
              <span className="font-instrument text-base font-normal text-gray-950">
                ₹{settlementDetails.amount.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex justify-between items-center text-gray-600 pt-1.5 border-t border-gray-100">
              <span>Beneficiary:</span>
              <span className="font-medium text-gray-900 text-right">
                {settlementDetails.recipientName}
              </span>
            </div>

            {settlementDetails.vpa && (
              <div className="flex justify-between items-center text-gray-600">
                <span>UPI VPA:</span>
                <span className="font-mono text-gray-800">{settlementDetails.vpa}</span>
              </div>
            )}

            <div className="flex justify-between items-center text-gray-600 pt-1.5 border-t border-gray-100">
              <span>NPCI / Bank UTR:</span>
              <div className="flex items-center gap-1">
                <span className="font-mono text-[11px] font-semibold text-gray-900 break-all">
                  {settlementDetails.utr}
                </span>
                <button
                  type="button"
                  onClick={copyUtrToClipboard}
                  className="p-1 text-gray-400 hover:text-gray-800 transition-colors"
                  title="Copy UTR"
                >
                  {copiedUtr ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetForNewPayout}
            className="w-full py-2 px-3 rounded-xl bg-gray-950 hover:bg-black text-white text-xs font-semibold cursor-pointer transition-colors shadow-xs"
          >
            Initiate Another Settlement
          </button>
        </div>
      ) : (
        /* INPUT FORM STATE */
        <div className="space-y-3.5">
          {/* Amount Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-gray-700">Amount (INR ₹)</label>
              <span className="text-[11px] text-gray-400">Live Rate: 1 USD = ₹92.90</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm">₹</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 50000"
                className="w-full pl-8 pr-3 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50/50"
              />
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(String(amt))}
                  className={`text-[10px] px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                    amount === String(amt)
                      ? 'bg-gray-900 text-white border-gray-900 font-semibold'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200'
                  }`}
                >
                  ₹{(amt / 1000).toLocaleString()}k
                </button>
              ))}
              <button
                type="button"
                onClick={() => setAmount('1000000')}
                className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 cursor-pointer"
              >
                ₹10 Lakh
              </button>
            </div>
          </div>

          {/* Conditional Rail Inputs */}
          {activeRail === 'UPI' && (
            <div className="space-y-2.5">
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Recipient UPI ID / Google Pay
                </label>
                <input
                  type="text"
                  value={vpa}
                  onChange={(e) => setVpa(e.target.value)}
                  placeholder="e.g. founder@okhdfcbank or phone@upi"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50/50"
                />
              </div>

              {/* Verified Beneficiary Card */}
              {verifiedName && (
                <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div className="truncate">
                      <span className="text-[10px] uppercase text-emerald-800 font-bold block">NPCI Verified Beneficiary</span>
                      <span className="font-semibold text-gray-900 truncate">{verifiedName}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-mono font-medium">Ready</span>
                </div>
              )}
            </div>
          )}

          {activeRail === 'BANK' && (
            <div className="space-y-2 text-xs">
              <div>
                <label className="text-gray-700 font-medium block mb-0.5">Account Number</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-200 font-mono bg-gray-50/50 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-gray-700 font-medium block mb-0.5">IFSC Code</label>
                  <input
                    type="text"
                    value={ifsc}
                    onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 font-mono bg-gray-50/50 text-xs"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium block mb-0.5">Beneficiary Name</label>
                  <input
                    type="text"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50/50 text-xs"
                  />
                </div>
              </div>
              <p className="text-[11px] text-gray-500">
                Routed through: <strong>HDFC Bank Corporate Clearing</strong> (IMPS 24x7)
              </p>
            </div>
          )}

          {activeRail === 'BBUSD' && (
            <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-purple-900 font-semibold">
                <Coins className="w-4 h-4 text-purple-600" />
                <span>RWA Stablecoin Escrow Redemption</span>
              </div>
              <p className="text-[11px] text-purple-800 leading-relaxed">
                Redeem on-chain Blackbird USD (BBUSD) on Polygon back to Indian Rupee treasury reserve. Backed 1:1 by $500k cash escrow.
              </p>
              <div className="flex justify-between text-[11px] pt-1 border-t border-purple-200/60 font-mono text-purple-900">
                <span>Contract:</span>
                <span>0x345CE5FB...C936f6bE</span>
              </div>
            </div>
          )}

          {/* Purpose of Payment */}
          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">Purpose Code (RBI Compliant)</label>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="Vendor & Services Remittance">P0802 - Software &amp; IT Vendor Remittance</option>
              <option value="Payroll & Professional Fees">P0801 - Payroll &amp; Engineering Retainer</option>
              <option value="Intercompany Service Advance">P0803 - Intercompany Subsidiary Advance</option>
              <option value="General Corporate Settlement">P1006 - Corporate Expense Reimbursement</option>
            </select>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleExecutePayout}
            disabled={status === 'routing' || status === 'authorizing'}
            className="w-full py-2.5 px-4 rounded-xl bg-gray-950 hover:bg-black text-white text-xs font-semibold cursor-pointer transition-all shadow-xs disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {status === 'routing' ? (
              <>
                <Clock className="w-3.5 h-3.5 animate-spin" />
                <span>Connecting to NPCI Gateway...</span>
              </>
            ) : status === 'authorizing' ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                <span>Authorizing Bank Settlement...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>
                  {activeRail === 'UPI' ? 'Execute Instant UPI / GPay Payout' : activeRail === 'BANK' ? 'Execute Bank Settlement' : 'Burn & Redeem BBUSD'}
                </span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Footer Assurance */}
      <div className="mt-3.5 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
        <span>Protected by 256-Bit Mutual TLS &amp; HSM</span>
        <span className="font-semibold text-gray-600">Settled 24x7</span>
      </div>
    </div>
  );
};
