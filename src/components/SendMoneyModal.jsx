import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  CreditCard, 
  Delete, 
  Sparkles, 
  Download, 
  Share2, 
  AlertCircle,
  Lock,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatINR, generateUTR, formatDate } from '../utils/formatters';
import { playPaymentSuccessChime, playSoundboxAnnouncement } from '../utils/audio';

export const SendMoneyModal = ({ 
  isOpen, 
  onClose, 
  user, 
  linkedAccounts, 
  recentContacts, 
  initialContact, 
  initialMode = 'upi', 
  onCompletePayment 
}) => {
  // Steps: 1: Details, 2: Amount, 3: UPI PIN, 4: Success
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState(initialMode); // 'upi', 'phone', 'bank'
  
  // Form fields
  const [recipientName, setRecipientName] = useState('');
  const [recipientUpiId, setRecipientUpiId] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(linkedAccounts[0]?.id || 'acc-1');

  // UPI PIN state
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Success state
  const [completedTx, setCompletedTx] = useState(null);

  // Reset or initialize when modal opens or initialContact changes
  useEffect(() => {
    if (isOpen) {
      if (initialContact) {
        setRecipientName(initialContact.name);
        setRecipientUpiId(initialContact.upiId);
        setRecipientPhone(initialContact.phone);
        setStep(2); // Jump to amount
      } else {
        setStep(1);
        setRecipientName('');
        setRecipientUpiId('');
        setRecipientPhone('');
        setAccountNumber('');
        setIfscCode('HDFC0001234');
      }
      setAmount('');
      setNote('');
      setPin('');
      setPinError('');
      setIsProcessing(false);
      setCompletedTx(null);
    }
  }, [isOpen, initialContact, initialMode]);

  if (!isOpen) return null;

  const currentDebitAccount = linkedAccounts.find(a => a.id === selectedAccount) || linkedAccounts[0];

  const handleSelectRecent = (c) => {
    setRecipientName(c.name);
    setRecipientUpiId(c.upiId);
    setRecipientPhone(c.phone);
    setStep(2);
  };

  const handleProceedToAmount = (e) => {
    e.preventDefault();
    if (mode === 'upi' && !recipientUpiId) return;
    if (mode === 'phone' && !recipientPhone) return;
    if (mode === 'bank' && (!accountNumber || !ifscCode)) return;

    if (!recipientName) {
      if (mode === 'upi') setRecipientName(recipientUpiId.split('@')[0]);
      else if (mode === 'phone') setRecipientName(`Contact ${recipientPhone.slice(-4)}`);
      else setRecipientName(`A/C ${accountNumber.slice(-4)}`);
    }

    setStep(2);
  };

  const handleProceedToPin = (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) return;
    if (numAmount > user.inrBalance) {
      alert('Insufficient available UPI balance!');
      return;
    }
    setStep(3);
  };

  // Virtual Keypad handling for UPI PIN
  const handleKeypadPress = (val) => {
    if (pin.length < 4) {
      const newPin = pin + val;
      setPin(newPin);
      if (newPin.length === 4) {
        // Automatically verify PIN
        verifyPinAndPay(newPin);
      }
    }
  };

  const handleKeypadDelete = () => {
    setPin(prev => prev.slice(0, -1));
    setPinError('');
  };

  const verifyPinAndPay = (pinToVerify) => {
    setIsProcessing(true);
    setPinError('');

    setTimeout(() => {
      setIsProcessing(false);
      // Generate successful transaction
      const utr = generateUTR();
      const numAmount = parseFloat(amount);
      const newTx = {
        id: `tx-${Date.now()}`,
        type: 'upi_sent',
        title: recipientName,
        subtitle: recipientUpiId || `${currentDebitAccount.bankName} Transfer`,
        amount: numAmount,
        currency: 'INR',
        direction: 'debit',
        status: 'SUCCESS',
        utr: utr,
        date: new Date().toISOString(),
        category: 'Transfer',
        firaAvailable: false,
        paymentMethod: `${currentDebitAccount.bankName} ${currentDebitAccount.accountNumber}`,
        note: note || 'UPI Transfer via Infinity',
      };

      setCompletedTx(newTx);
      onCompletePayment(newTx, numAmount);
      setStep(4);

      // Trigger Celebration Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#8b5cf6', '#ffffff'],
      });

      // Soundbox / Chime announcement
      playSoundboxAnnouncement(numAmount);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#121624] border border-white/10 shadow-2xl transition-all">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            {step > 1 && step < 4 && (
              <button
                onClick={() => setStep(step - 1)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {step === 1 && 'Send Money via UPI'}
                {step === 2 && 'Enter Amount'}
                {step === 3 && 'NPCI UPI PIN'}
                {step === 4 && 'Payment Successful'}
              </h3>
              <p className="text-[11px] text-gray-400">Zero charges • Instant NPCI Transfer</p>
            </div>
          </div>

          {step !== 3 && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* STEP 1: Enter Recipient */}
        {step === 1 && (
          <div className="p-6">
            {/* Mode selection tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-white/5 border border-white/10 mb-5">
              <button
                type="button"
                onClick={() => setMode('upi')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  mode === 'upi' ? 'bg-emerald-500 text-black shadow' : 'text-gray-400 hover:text-white'
                }`}
              >
                UPI ID
              </button>
              <button
                type="button"
                onClick={() => setMode('phone')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  mode === 'phone' ? 'bg-emerald-500 text-black shadow' : 'text-gray-400 hover:text-white'
                }`}
              >
                Mobile No.
              </button>
              <button
                type="button"
                onClick={() => setMode('bank')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  mode === 'bank' ? 'bg-emerald-500 text-black shadow' : 'text-gray-400 hover:text-white'
                }`}
              >
                Bank A/C
              </button>
            </div>

            <form onSubmit={handleProceedToAmount} className="space-y-4">
              {mode === 'upi' && (
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    UPI ID / VPA
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientUpiId}
                    onChange={(e) => setRecipientUpiId(e.target.value)}
                    placeholder="e.g. priya@okhdfcbank or user@paytm"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500/50"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">Accepts any Indian UPI VPA or handle</p>
                </div>
              )}

              {mode === 'phone' && (
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    10-Digit Mobile Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl bg-white/10 border border-r-0 border-white/10 text-xs text-gray-400 font-mono">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="98765 43210"
                      className="w-full px-4 py-3 rounded-r-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500/50 font-mono"
                    />
                  </div>
                </div>
              )}

              {mode === 'bank' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Bank Account Number
                    </label>
                    <input
                      type="text"
                      required
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="Enter 9-18 digit account number"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500/50 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Bank IFSC Code
                    </label>
                    <input
                      type="text"
                      required
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                      placeholder="e.g. HDFC0001234"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500/50 font-mono uppercase"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Payee Name (Optional)
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Rohit Sharma"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              {/* Recent contacts shortcut list */}
              <div className="pt-2">
                <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Recent Payees
                </span>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {recentContacts.slice(0, 3).map((c) => (
                    <div
                      key={c.id}
                      onClick={() => handleSelectRecent(c)}
                      className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <div className="text-xs font-semibold text-white">{c.name}</div>
                          <div className="text-[10px] text-gray-400 font-mono">{c.upiId}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-sm shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: Amount & Remarks */}
        {step === 2 && (
          <div className="p-6">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 mb-5">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                {recipientName ? recipientName[0] : 'U'}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-white truncate">{recipientName}</div>
                <div className="text-xs text-gray-400 font-mono truncate">
                  {recipientUpiId || recipientPhone || accountNumber}
                </div>
              </div>
            </div>

            <form onSubmit={handleProceedToPin} className="space-y-5">
              {/* Amount input */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Enter Amount in INR
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-emerald-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    required
                    min="1"
                    max={user.inrBalance}
                    autoFocus
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full pl-10 pr-4 py-4 rounded-2xl bg-white/5 border border-white/15 text-3xl font-extrabold text-white font-mono placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Quick amount chips */}
              <div className="flex flex-wrap gap-2">
                {[100, 500, 1000, 2000, 5000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset.toString())}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-300 hover:text-white transition-all cursor-pointer"
                  >
                    +₹{preset}
                  </button>
                ))}
              </div>

              {/* Note / Message */}
              <div>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a remark (e.g. Dinner, Project fee)"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              {/* Debiting from Account Picker */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Debiting From
                </label>
                <div className="space-y-2">
                  {linkedAccounts.map((acc) => (
                    <label
                      key={acc.id}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedAccount === acc.id
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                          : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="debitAccount"
                          value={acc.id}
                          checked={selectedAccount === acc.id}
                          onChange={() => setSelectedAccount(acc.id)}
                          className="accent-emerald-500"
                        />
                        <div className="text-left">
                          <div className="text-xs font-bold text-white">{acc.bankName}</div>
                          <div className="text-[10px] text-gray-400 font-mono">{acc.accountNumber}</div>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-gray-300">
                        {acc.accountType}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!amount || parseFloat(amount) <= 0}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-black font-extrabold text-sm shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Proceed to Pay {amount ? `₹${parseFloat(amount).toLocaleString('en-IN')}` : ''}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: Authentic Indian UPI PIN Keypad */}
        {step === 3 && (
          <div className="p-6 text-center">
            
            {/* NPCI & Security Header */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-3">
              <Lock className="w-3.5 h-3.5" />
              <span>NPCI Secured UPI Gateway</span>
            </div>

            <p className="text-xs text-gray-400 mb-1">Paying to</p>
            <h4 className="text-base font-bold text-white mb-1">{recipientName}</h4>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono mb-4">
              {formatINR(parseFloat(amount))}
            </div>

            <div className="text-xs text-gray-400 mb-3">
              ENTER 4-DIGIT UPI PIN
            </div>

            {/* PIN Dots Display */}
            <div className="flex items-center justify-center gap-4 mb-6">
              {[0, 1, 2, 3].map((idx) => {
                const filled = pin.length > idx;
                return (
                  <div
                    key={idx}
                    className={`w-4 h-4 rounded-full transition-all duration-150 ${
                      filled
                        ? 'bg-emerald-400 scale-125 shadow-lg shadow-emerald-400/50'
                        : 'border-2 border-white/20 bg-white/5'
                    }`}
                  />
                );
              })}
            </div>

            {pinError && (
              <p className="text-xs text-red-400 mb-4">{pinError}</p>
            )}

            {isProcessing ? (
              <div className="py-12 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-sm font-semibold text-white">Contacting {currentDebitAccount.bankName}...</p>
                <p className="text-xs text-gray-400 mt-1">Please do not press back or refresh</p>
              </div>
            ) : (
              /* Virtual Numeric Keypad */
              <div className="grid grid-cols-3 gap-2.5 max-w-[260px] mx-auto mb-2">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                  <button
                    key={digit}
                    type="button"
                    onClick={() => handleKeypadPress(digit)}
                    className="h-14 rounded-2xl bg-white/5 hover:bg-white/15 active:bg-emerald-500/20 active:text-emerald-300 text-xl font-bold text-white transition-all cursor-pointer flex items-center justify-center font-mono shadow-sm"
                  >
                    {digit}
                  </button>
                ))}
                
                {/* Blank space */}
                <div className="h-14" />

                {/* Digit 0 */}
                <button
                  type="button"
                  onClick={() => handleKeypadPress('0')}
                  className="h-14 rounded-2xl bg-white/5 hover:bg-white/15 active:bg-emerald-500/20 active:text-emerald-300 text-xl font-bold text-white transition-all cursor-pointer flex items-center justify-center font-mono shadow-sm"
                >
                  0
                </button>

                {/* Backspace */}
                <button
                  type="button"
                  onClick={handleKeypadDelete}
                  className="h-14 rounded-2xl bg-white/5 hover:bg-white/15 active:bg-red-500/20 text-gray-400 hover:text-white transition-all cursor-pointer flex items-center justify-center shadow-sm"
                >
                  <Delete className="w-5 h-5" />
                </button>
              </div>
            )}

            <p className="text-[11px] text-gray-500 mt-4">
              UPI PIN is kept encrypted and processed via National Payments Corporation of India.
            </p>
          </div>
        )}

        {/* STEP 4: Success Screen */}
        {step === 4 && completedTx && (
          <div className="p-7 text-center">
            
            {/* Animated Green Checkmark Bubble */}
            <div className="relative mx-auto w-20 h-20 mb-4">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
              <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <CheckCircle2 className="w-10 h-10 text-black stroke-[2.5]" />
              </div>
            </div>

            <h3 className="text-xl font-extrabold text-white mb-1">
              Payment Successful!
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Transferred to <strong className="text-white">{completedTx.title}</strong>
            </p>

            <div className="text-4xl font-black text-emerald-400 font-mono mb-6">
              {formatINR(completedTx.amount)}
            </div>

            {/* Receipt Summary Card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-2.5 mb-6 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-gray-400">NPCI Ref (UTR):</span>
                <span className="text-white font-bold">{completedTx.utr}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Paid Via:</span>
                <span className="text-gray-200">{completedTx.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date & Time:</span>
                <span className="text-gray-200">{formatDate(completedTx.date)}</span>
              </div>
              {completedTx.note && (
                <div className="flex justify-between pt-1 border-t border-white/10">
                  <span className="text-gray-400">Remark:</span>
                  <span className="text-gray-300">{completedTx.note}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onClose}
                className="py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-all cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setStep(1);
                  setAmount('');
                  setNote('');
                }}
                className="py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
              >
                Pay Another
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
