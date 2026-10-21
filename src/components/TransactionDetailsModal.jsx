import React from 'react';
import { X, ArrowDownLeft, ArrowUpRight, FileText, Landmark } from 'lucide-react';

const money = (value) => '$' + Math.abs(Number(value) || 0).toLocaleString('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const TransactionDetailsModal = ({ isOpen, onClose, transaction }) => {
  if (!isOpen || !transaction) return null;

  const isIncoming = Number(transaction.amount) > 0;
  const recipient = transaction.recipient || {};
  const isOutgoingTransfer = transaction.direction === 'debit' && Boolean(transaction.recipient);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div role="dialog" aria-modal="true" aria-labelledby="transaction-details-title" className="relative w-full max-w-lg max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain rounded-3xl bg-white border border-gray-200 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-5 border-b border-gray-100 bg-white/95 backdrop-blur">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
              {isIncoming ? <ArrowDownLeft className="w-4 h-4 text-emerald-700" /> : <ArrowUpRight className="w-4 h-4 text-gray-800" />}
            </div>
            <div className="min-w-0">
              <h3 id="transaction-details-title" className="text-base font-bold text-gray-900">Transaction details</h3>
              <p className="text-[11px] text-gray-500 truncate">{transaction.title}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close transaction details" className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-center">
            <p className="text-[11px] uppercase tracking-wide text-gray-500">{isIncoming ? 'Incoming transaction' : 'Outgoing payment'}</p>
            <div className={`mt-1 text-3xl font-normal font-instrument ${isIncoming ? 'text-emerald-700' : 'text-gray-950'}`}>
              {isIncoming ? '+' : '-'}{money(transaction.amount)}
            </div>
            <p className="text-xs text-gray-500 mt-1">{transaction.date || ''}</p>
          </div>


          <div className="rounded-2xl border border-gray-200 p-4 space-y-3 text-sm">
            <div className="flex items-start justify-between gap-4">
              <span className="text-gray-500">Status</span>
              <span className="font-semibold text-gray-900 text-right">{transaction.status || 'Pending'}</span>
            </div>
            {transaction.recordSource && <div className="flex items-start justify-between gap-4"><span className="text-gray-500">Record source</span><span className="font-medium text-gray-900 text-right">{transaction.recordSource}</span></div>}
            {transaction.bankReference && <div className="flex items-start justify-between gap-4"><span className="text-gray-500">Bank reference</span><span className="font-mono text-xs font-semibold text-gray-900 text-right break-all">{transaction.bankReference}</span></div>}
            {transaction.swiftReference && <div className="flex items-start justify-between gap-4"><span className="text-gray-500">Fedwire / transfer reference</span><span className="font-mono text-xs font-semibold text-gray-900 text-right break-all">{transaction.swiftReference}</span></div>}
            {transaction.imad && <div className="flex items-start justify-between gap-4"><span className="text-gray-500">IMAD</span><span className="font-mono text-xs text-gray-900 text-right break-all">{transaction.imad}</span></div>}
            {transaction.omad && <div className="flex items-start justify-between gap-4"><span className="text-gray-500">OMAD</span><span className="font-mono text-xs text-gray-900 text-right break-all">{transaction.omad}</span></div>}
            {transaction.busFunctionCode && <div className="flex items-start justify-between gap-4"><span className="text-gray-500">Fedwire function code</span><span className="font-mono text-xs text-gray-900 text-right">{transaction.busFunctionCode}</span></div>}
            <div className="flex items-start justify-between gap-4">
              <span className="text-gray-500">Payment type</span>
              <span className="font-semibold text-gray-900 text-right">{transaction.transferMethod || transaction.subtitle || transaction.category || 'Transaction'}</span>
            </div>
            {transaction.transferReference && (
              <div className="flex items-start justify-between gap-4">
                <span className="text-gray-500">Transfer reference</span>
                <span className="font-mono text-xs font-semibold text-gray-900 text-right">{transaction.transferReference}</span>
              </div>
            )}
          </div>

          {transaction.sender && (
            <div className="rounded-2xl border border-gray-200 p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900"><Landmark className="w-4 h-4 text-gray-500" /> Sender details</div>
              <div className="flex items-start justify-between gap-4 text-sm"><span className="text-gray-500">Name</span><span className="font-medium text-gray-900 text-right">{transaction.sender.name}</span></div>
              {transaction.sender.address && <div className="flex items-start justify-between gap-4 text-sm"><span className="text-gray-500">Address</span><span className="font-medium text-gray-900 text-right">{transaction.sender.address}</span></div>}
              {transaction.sender.bank && <div className="flex items-start justify-between gap-4 text-sm"><span className="text-gray-500">Bank</span><span className="font-medium text-gray-900 text-right">{transaction.sender.bank}</span></div>}
              {transaction.sender.swiftCode && <div className="flex items-start justify-between gap-4 text-sm"><span className="text-gray-500">SWIFT / BIC</span><span className="font-mono text-xs text-gray-900 text-right">{transaction.sender.swiftCode}</span></div>}
              {transaction.sender.routingNumber && <div className="flex items-start justify-between gap-4 text-sm"><span className="text-gray-500">Routing number</span><span className="font-mono text-xs text-gray-900 text-right">{transaction.sender.routingNumber}</span></div>}
            </div>
          )}
          {transaction.beneficiary && (
            <div className="rounded-2xl border border-gray-200 p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900"><Landmark className="w-4 h-4 text-gray-500" /> Beneficiary details</div>
              <div className="flex items-start justify-between gap-4 text-sm"><span className="text-gray-500">Name</span><span className="font-medium text-gray-900 text-right">{transaction.beneficiary.name}</span></div>
              {transaction.beneficiary.bank && <div className="flex items-start justify-between gap-4 text-sm"><span className="text-gray-500">Bank</span><span className="font-medium text-gray-900 text-right">{transaction.beneficiary.bank}</span></div>}
              {transaction.beneficiary.account && <div className="flex items-start justify-between gap-4 text-sm"><span className="text-gray-500">Account</span><span className="font-mono text-xs text-gray-900 text-right">{transaction.beneficiary.account}</span></div>}
              {transaction.beneficiary.swiftCode && <div className="flex items-start justify-between gap-4 text-sm"><span className="text-gray-500">SWIFT / BIC</span><span className="font-mono text-xs text-gray-900 text-right">{transaction.beneficiary.swiftCode}</span></div>}
              {transaction.beneficiary.routingNumber && <div className="flex items-start justify-between gap-4 text-sm"><span className="text-gray-500">Routing number</span><span className="font-mono text-xs text-gray-900 text-right">{transaction.beneficiary.routingNumber}</span></div>}
            </div>
          )}

          {transaction.recipient && (
            <div className="rounded-2xl border border-gray-200 p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <Landmark className="w-4 h-4 text-gray-500" /> Beneficiary details
              </div>
              <div className="flex items-start justify-between gap-4 text-sm">
                <span className="text-gray-500">Name</span><span className="font-medium text-gray-900 text-right">{recipient.name}</span>
              </div>
              <div className="flex items-start justify-between gap-4 text-sm">
                <span className="text-gray-500">Recipient type</span><span className="font-medium text-gray-900 text-right">{transaction.recipientType || 'Recipient'}</span>
              </div>
              <div className="flex items-start justify-between gap-4 text-sm">
                <span className="text-gray-500">Bank</span><span className="font-medium text-gray-900 text-right">{recipient.bank}</span>
              </div>
              <div className="flex items-start justify-between gap-4 text-sm">
                <span className="text-gray-500">Bank country</span><span className="font-medium text-gray-900 text-right">{recipient.country}</span>
              </div>
              <div className="flex items-start justify-between gap-4 text-sm">
                <span className="text-gray-500">Account</span><span className="font-mono text-xs text-gray-900 text-right">•••• {recipient.accountLast4}</span>
              </div>
              {recipient.routingDisplay && (
                <div className="flex items-start justify-between gap-4 text-sm">
                  <span className="text-gray-500">Routing / SWIFT</span><span className="font-mono text-xs text-gray-900 text-right">{recipient.routingDisplay}</span>
                </div>
              )}
            </div>
          )}

          {(transaction.paymentPurpose || transaction.memo) && (
            <div className="rounded-2xl border border-gray-200 p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <FileText className="w-4 h-4 text-gray-500" /> Payment information
              </div>
              {transaction.paymentPurpose && <div className="flex items-start justify-between gap-4 text-sm"><span className="text-gray-500">Purpose</span><span className="font-medium text-gray-900 text-right">{transaction.paymentPurpose}</span></div>}
              {transaction.memo && <div className="text-sm"><span className="block text-gray-500 mb-1">Memo / invoice reference</span><p className="text-gray-900 break-words">{transaction.memo}</p></div>}
            </div>
          )}

          {isOutgoingTransfer && (
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-3 space-y-2 text-xs">
              <div className="flex justify-between gap-3"><span className="text-gray-500">Payment amount</span><span className="font-semibold text-gray-900">{money(transaction.amount)}</span></div>
              <div className="flex justify-between gap-3"><span className="text-gray-500">Transfer fee</span><span className="font-semibold text-gray-900">{money(transaction.fee)}</span></div>
              <div className="pt-2 border-t border-gray-200 flex justify-between gap-3"><span className="font-semibold text-gray-700">Total debit</span><span className="font-bold text-gray-950">{money(Math.abs(Number(transaction.amount) || 0) + (Number(transaction.fee) || 0))}</span></div>
            </div>
          )}

          <button type="button" onClick={onClose} className="w-full py-3 rounded-xl bg-gray-950 hover:bg-black text-white font-semibold text-sm">Done</button>
        </div>
      </div>
    </div>
  );
};
