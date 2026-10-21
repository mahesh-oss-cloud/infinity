import React, { useEffect, useState } from 'react';
import {
  X,
  ArrowRight,
  Building2,
  ShieldCheck,
  AlertCircle,
  Landmark,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const INITIAL_FORM = {
  recipientName: '',
  recipientType: 'Individual',
  recipientBank: '',
  bankCountry: 'United States',
  routingOrSwift: '',
  accountNumber: '',
  amount: '',
  paymentPurpose: 'Legal services',
  memo: '',
};

const FIELD_CLASS = 'w-full min-w-0 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-900/5';

export const TransferModal = ({ isOpen, onClose, account, onCompleteTransfer }) => {
  const [wireType, setWireType] = useState('ach');
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm(INITIAL_FORM);
      setError('');
      setIsSubmitting(false);
      setWireType('ach');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const wireFee = wireType === 'swift' ? 35 : wireType === 'fedwire' ? 25 : 0;
  const numAmount = Number(form.amount);
  const availableBalance = Math.max(0, Number(account?.checkingBalance ?? account?.balance) || 0);
  const totalDeduction = (Number.isFinite(numAmount) ? numAmount : 0) + wireFee;
  const wireTypeLabel = wireType === 'swift' ? 'International SWIFT' : wireType === 'fedwire' ? 'Domestic wire (Fedwire)' : 'ACH transfer';
  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    const recipientName = form.recipientName.trim();
    const recipientBank = form.recipientBank.trim();
    const normalizedAccount = form.accountNumber.replace(/[\s-]/g, '');
    const normalizedRouting = form.routingOrSwift.replace(/\s/g, '').toUpperCase();

    if (!recipientName || !recipientBank) {
      setError('Enter the recipient name and bank name.');
      return;
    }
    if (!/^[A-Za-z0-9]{4,34}$/.test(normalizedAccount)) {
      setError('Enter an account number or IBAN between 4 and 34 letters/numbers. Spaces and hyphens are allowed.');
      return;
    }
    if (wireType === 'swift' && !/^[A-Z0-9]{8}(?:[A-Z0-9]{3})?$/.test(normalizedRouting)) {
      setError('Enter a valid-format SWIFT/BIC code (8 or 11 letters/numbers).');
      return;
    }
    if (wireType !== 'swift' && !/^\d{9}$/.test(normalizedRouting)) {
      setError('Enter a 9-digit ABA routing number for ACH or Fedwire.');
      return;
    }
    if (form.bankCountry !== 'United States' && wireType !== 'swift') {
      setError('For a bank outside the United States, select International SWIFT in this demo preview.');
      return;
    }
    if (!Number.isFinite(numAmount) || numAmount <= 0 || Math.abs(Math.round(numAmount * 100) / 100 - numAmount) > 0.000001) {
      setError('Enter a valid amount greater than $0, with no more than 2 decimal places.');
      return;
    }
    if (totalDeduction > availableBalance) {
      setError(`The amount plus the demo fee exceeds the available checking balance of $${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.`);
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      const now = new Date();
      const date = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })
        + ' - ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      const demoReference = `DEMO-${now.getTime().toString().slice(-8)}`;
      const newTx = {
        id: `tx-demo-out-${now.getTime()}`,
        title: recipientName,
        subtitle: `${wireTypeLabel} · ${recipientBank}`,
        category: form.paymentPurpose,
        amount: -Number(numAmount.toFixed(2)),
        type: 'DEMO_TRANSFER_OUT',
        direction: 'debit',
        date,
        timestamp: now.toISOString(),
        status: 'Demo preview · recorded locally',
        brandIcon: 'transfer',
        isDemoTransfer: true,
        demoReference,
        transferMethod: wireTypeLabel,
        fee: wireFee,
        recipientType: form.recipientType,
        recipient: {
          name: recipientName,
          bank: recipientBank,
          country: form.bankCountry,
          accountLast4: normalizedAccount.slice(-4),
          routingDisplay: normalizedRouting.length > 4
            ? `${normalizedRouting.slice(0, 2)}••••${normalizedRouting.slice(-2)}`
            : normalizedRouting,
        },
        paymentPurpose: form.paymentPurpose,
        memo: form.memo.trim(),
      };

      // Store only the last four account characters in local history, never the full account number.
      onCompleteTransfer(newTx, Number((numAmount + wireFee).toFixed(2)));
      setIsSubmitting(false);
      onClose();
      confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.6 },
        colors: ['#111827', '#6b7280', '#10b981'],
      });
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div role="dialog" aria-modal="true" aria-labelledby="send-money-title" className="relative w-full max-w-lg max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain rounded-3xl bg-white border border-gray-200 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-5 border-b border-gray-100 bg-white/95 backdrop-blur">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gray-100 text-gray-800 flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 id="send-money-title" className="text-base font-bold text-gray-900">Send money</h3>
              <p className="text-[11px] text-gray-500">Enter any beneficiary and bank account details</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close send money" className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3 text-xs leading-relaxed text-amber-950">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" />
              <div><strong>Demo preview only.</strong> Confirming records a simulated payment in this browser and updates the demo balance/activity. It does not contact a bank, verify account details, or move real money.</div>
            </div>
          </div>

          <div className="mb-4 rounded-2xl border border-gray-200 bg-gray-50 p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <Landmark className="w-4 h-4 text-gray-500 shrink-0" />
              <div>
                <div className="text-[11px] text-gray-500">Available checking balance</div>
                <div className="text-lg font-normal font-instrument text-gray-950">{'$' + availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[10px] text-gray-500">Demo fee</div>
              <div className="text-sm font-semibold text-gray-800">{'$' + wireFee.toFixed(2)}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-1 rounded-2xl bg-gray-100 mb-5">
            {[
              { value: 'ach', label: 'ACH', fee: 'No demo fee' },
              { value: 'fedwire', label: 'Fedwire', fee: '$25 demo fee' },
              { value: 'swift', label: 'SWIFT', fee: '$35 demo fee' },
            ].map((method) => (
              <button
                key={method.value}
                type="button"
                onClick={() => { setWireType(method.value); setError(''); }}
                aria-pressed={wireType === method.value}
                className={`min-w-0 py-2.5 px-1 rounded-xl transition-all ${wireType === method.value ? 'bg-white text-gray-950 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <span className="block text-xs font-semibold">{method.label}</span>
                <span className="block text-[10px] mt-0.5">{method.fee}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="recipient-name" className="block text-xs font-semibold text-gray-700 mb-1">Recipient / beneficiary name *</label>
                <input id="recipient-name" type="text" required autoComplete="off" maxLength={100} value={form.recipientName} onChange={(e) => update('recipientName', e.target.value)} placeholder="e.g. Jane Smith or Smith Legal LLC" className={FIELD_CLASS} />
              </div>
              <div>
                <label htmlFor="recipient-type" className="block text-xs font-semibold text-gray-700 mb-1">Recipient type</label>
                <select id="recipient-type" value={form.recipientType} onChange={(e) => update('recipientType', e.target.value)} className={FIELD_CLASS}>
                  <option>Individual</option>
                  <option>Business</option>
                  <option>Law firm</option>
                  <option>Vendor</option>
                  <option>Contractor</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="recipient-bank" className="block text-xs font-semibold text-gray-700 mb-1">Recipient bank name *</label>
                <input id="recipient-bank" type="text" required autoComplete="off" maxLength={100} value={form.recipientBank} onChange={(e) => update('recipientBank', e.target.value)} placeholder="e.g. Chase, Bank of America" className={FIELD_CLASS} />
              </div>
              <div>
                <label htmlFor="bank-country" className="block text-xs font-semibold text-gray-700 mb-1">Bank country</label>
                <select id="bank-country" value={form.bankCountry} onChange={(e) => {
                  const country = e.target.value;
                  update('bankCountry', country);
                  if (country !== 'United States') setWireType('swift');
                }} className={FIELD_CLASS}>
                  <option>United States</option>
                  <option>India</option>
                  <option>United Kingdom</option>
                  <option>Singapore</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="bank-routing" className="block text-xs font-semibold text-gray-700 mb-1">{wireType === 'swift' ? 'SWIFT / BIC code *' : 'ABA routing number *'}</label>
              <input id="bank-routing" type="text" required autoComplete="off" maxLength={11} value={form.routingOrSwift} onChange={(e) => update('routingOrSwift', e.target.value.toUpperCase())} placeholder={wireType === 'swift' ? '8 or 11 characters, e.g. CHASUS33XXX' : '9 digits, e.g. 021000021'} className={`${FIELD_CLASS} font-mono uppercase`} />
              <p className="mt-1 text-[10px] text-gray-400">{wireType === 'swift' ? 'Format is checked locally; the code is not verified against a bank.' : 'Enter a 9-digit US ABA routing number.'}</p>
            </div>

            <div>
              <label htmlFor="recipient-account" className="block text-xs font-semibold text-gray-700 mb-1">Recipient account number / IBAN *</label>
              <input id="recipient-account" type="text" required autoComplete="off" maxLength={40} value={form.accountNumber} onChange={(e) => update('accountNumber', e.target.value)} placeholder="Enter account number or IBAN" className={`${FIELD_CLASS} font-mono`} />
              <p className="mt-1 text-[10px] text-gray-400">Only the last four characters are kept in the local transaction preview.</p>
            </div>

            <div>
              <label htmlFor="transfer-amount" className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-1">
                <span>Amount (USD) *</span><span className="font-normal text-gray-400">Plus {'$' + wireFee.toFixed(2)} demo fee</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">$</span>
                <input id="transfer-amount" type="number" required min="0.01" max={Math.max(0, availableBalance - wireFee)} step="0.01" inputMode="decimal" value={form.amount} onChange={(e) => update('amount', e.target.value)} placeholder="0.00" className="w-full min-w-0 pl-8 pr-4 py-3 rounded-xl border border-gray-200 text-xl font-bold text-gray-900 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-900/5" />
              </div>
            </div>

            <div>
              <label htmlFor="payment-purpose" className="block text-xs font-semibold text-gray-700 mb-1">Payment purpose *</label>
              <select id="payment-purpose" required value={form.paymentPurpose} onChange={(e) => update('paymentPurpose', e.target.value)} className={FIELD_CLASS}>
                <option>Legal services</option>
                <option>Consulting services</option>
                <option>Contractor payment</option>
                <option>Vendor / supplier</option>
                <option>Invoice payment</option>
                <option>Software / cloud services</option>
                <option>Tax or government fee</option>
                <option>Other business expense</option>
              </select>
            </div>

            <div>
              <label htmlFor="transfer-memo" className="block text-xs font-semibold text-gray-700 mb-1">Memo / invoice reference (optional)</label>
              <input id="transfer-memo" type="text" maxLength={180} value={form.memo} onChange={(e) => update('memo', e.target.value)} placeholder="e.g. Legal engagement invoice #402" className={FIELD_CLASS} />
            </div>

            {error && (
              <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs leading-relaxed text-red-800">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between gap-3"><span className="text-gray-500">Demo payment amount</span><span className="font-semibold text-gray-900">{'$' + (Number.isFinite(numAmount) && numAmount > 0 ? numAmount : 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
              <div className="flex items-center justify-between gap-3"><span className="text-gray-500">Demo fee</span><span className="font-semibold text-gray-900">{'$' + wireFee.toFixed(2)}</span></div>
              <div className="flex items-center justify-between gap-3 border-t border-gray-200 pt-2"><span className="font-semibold text-gray-700">Total simulated deduction</span><span className="font-bold text-gray-950">{'$' + totalDeduction.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
            </div>

            <button type="submit" disabled={isSubmitting || !form.amount || availableBalance <= 0} className="w-full py-3.5 rounded-xl bg-gray-950 hover:bg-black disabled:opacity-50 text-white font-bold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              {isSubmitting ? <span>Recording demo transfer…</span> : <><span>Record demo transfer</span><ArrowRight className="w-4 h-4" /></>}
            </button>
            <p className="text-center text-[10px] text-gray-400">No external payment is initiated. Never enter real banking credentials in this preview.</p>
          </form>
        </div>
      </div>
    </div>
  );
};
