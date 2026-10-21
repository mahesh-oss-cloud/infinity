import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  Building2, 
  Globe2, 
  Zap, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TransferModal = ({ isOpen, onClose, account, onCompleteTransfer }) => {
  const [wireType, setWireType] = useState('swift'); // 'swift', 'fedwire', 'ach'
  const [recipientName, setRecipientName] = useState('');
  const [recipientBank, setRecipientBank] = useState('');
  const [routingOrSwift, setRoutingOrSwift] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const wireFee = wireType === 'swift' ? 35 : wireType === 'fedwire' ? 25 : 0;
  const numAmount = parseFloat(amount) || 0;
  const totalDeduction = numAmount + wireFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (numAmount <= 0) return;
    if (totalDeduction > account.balance) {
      alert('Transfer amount exceeds available savings balance!');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      const newTx = {
        id: `tx-out-${Date.now()}`,
        title: recipientName,
        subtitle: `${wireType.toUpperCase()} Transfer • ${recipientBank || 'Wire Out'}`,
        category: 'Transfer',
        amount: -numAmount,
        type: 'WIRE_OUTWARD',
        direction: 'debit',
        date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }) + ' - ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
        timestamp: new Date().toISOString(),
        status: 'Completed',
        brandIcon: 'transfer',
        memo: memo || 'Outward Transfer from Blackbird Finance Savings',
      };

      onCompleteTransfer(newTx, totalDeduction);
      onClose();

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#6c5ce7', '#a855f7', '#3b82f6'],
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#6c5ce7]/10 text-[#6c5ce7] flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Send Money / Wire Transfer
              </h3>
              <p className="text-[11px] text-gray-500">
                Transfer from Blackbird Finance Savings A/C
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
          
          {/* Wire Type Selector */}
          <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-gray-100 mb-5">
            <button
              type="button"
              onClick={() => setWireType('swift')}
              className={`py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                wireType === 'swift'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              SWIFT Wire
            </button>
            <button
              type="button"
              onClick={() => setWireType('fedwire')}
              className={`py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                wireType === 'fedwire'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Fedwire ($25)
            </button>
            <button
              type="button"
              onClick={() => setWireType('ach')}
              className={`py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                wireType === 'ach'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              ACH (Free)
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Recipient Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Recipient / Beneficiary Name
              </label>
              <input
                type="text"
                required
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="e.g. Acme Corporation or Partner"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Routing or SWIFT */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {wireType === 'swift' ? 'SWIFT / BIC Code' : 'ABA Routing Number (9 Digits)'}
              </label>
              <input
                type="text"
                required
                value={routingOrSwift}
                onChange={(e) => setRoutingOrSwift(e.target.value.toUpperCase())}
                placeholder={wireType === 'swift' ? 'e.g. CHASUS33XXX' : '121000358'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-mono text-gray-900 focus:outline-none focus:border-purple-500 uppercase"
              />
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Recipient Account Number / IBAN
              </label>
              <input
                type="text"
                required
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter account number or IBAN"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-mono text-gray-900 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Amount in USD */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                <span>Transfer Amount (USD)</span>
                <span className="text-gray-400">Avail: ${Math.round(account.balance).toLocaleString()}</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  required
                  min="1"
                  max={account.balance}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 text-xl font-bold font-sans text-gray-900 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Memo */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Remittance Memo (Optional)
              </label>
              <input
                type="text"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="e.g. Consulting Services Invoice #402"
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Fee note */}
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500">Network Transfer Fee:</span>
              <span className="font-bold text-gray-800 font-mono">
                {wireFee > 0 ? `$${wireFee}.00` : 'Free ($0.00)'}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !numAmount}
              className="w-full py-3.5 rounded-xl bg-[#6c5ce7] hover:bg-[#5b4bc4] disabled:opacity-50 text-white font-bold text-sm transition-all shadow-sm shadow-purple-500/25 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Transmitting Wire...</span>
              ) : (
                <>
                  <span>Send ${numAmount ? numAmount.toLocaleString() : '0'}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};
