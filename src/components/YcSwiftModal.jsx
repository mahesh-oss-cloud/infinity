import React from 'react';
import { X, CheckCircle2, Printer, FileText, CalendarDays } from 'lucide-react';

export const YcSwiftModal = ({ isOpen, onClose, transaction }) => {
  if (!isOpen || !transaction) return null;

  const amount = Math.abs(Number(transaction.amount) || 500000);
  const formatMoney = (value) => '$' + Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div role="dialog" aria-modal="true" aria-labelledby="yc-investment-title" className="relative w-full max-w-xl max-h-[calc(100dvh-2rem)] overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#ff6600] flex items-center justify-center p-1.5 shrink-0">
              <svg viewBox="0 0 256 256" className="w-full h-full" preserveAspectRatio="xMidYMid"><path d="M119.373653,144.745813 L75.43296,62.4315733 L95.5144533,62.4315733 L121.36192,114.52416 C121.759575,115.452022 122.2235,116.413008 122.753707,117.407147 C123.283914,118.401285 123.747838,119.428546 124.145493,120.48896 C124.410597,120.886615 124.609422,121.251127 124.741973,121.582507 C124.874525,121.913886 125.007075,122.212123 125.139627,122.477227 C125.802386,123.802744 126.39886,125.095105 126.929067,126.354347 C127.459274,127.613589 127.923198,128.773399 128.320853,129.833813 C129.381268,127.580433 130.541078,125.1614 131.80032,122.57664 C133.059562,119.99188 134.351922,117.307747 135.67744,114.52416 L161.92256,62.4315733 L180.612267,62.4315733 L136.27392,145.739947 L136.27392,198.826667 L119.373653,198.826667 L119.373653,144.745813 Z" fill="#fff" /></svg>
            </div>
            <div>
              <h3 id="yc-investment-title" className="text-xl font-normal text-gray-950 font-instrument">Y Combinator W27 Investment</h3>
              <p className="text-[11px] text-gray-500">Incoming investment record</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close investment details" className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto max-h-[calc(100dvh-6rem)] space-y-5">
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2"><CheckCircle2 className="w-6 h-6" /></div>
            <div className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Investment amount</div>
            <div className="text-4xl sm:text-5xl font-normal text-gray-950 mt-1 font-instrument">{formatMoney(amount)} <span className="text-sm font-sans font-semibold text-gray-500">USD</span></div>
            <p className="text-xs text-gray-600 mt-1">Beneficiary: <strong>Blackbird Finance Inc.</strong></p>
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-semibold"><CalendarDays className="w-3.5 h-3.5" /> Received date: {transaction.date || '10/07/26'}</div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
            <span className="text-[10px] text-amber-900 font-bold uppercase tracking-wider block">Y Combinator Standard Deal Structure</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-900">
              <div className="p-3 rounded-xl bg-white border border-amber-100"><div className="font-normal text-gray-950 font-instrument text-base">$125,000</div><div className="text-[11px] text-gray-600">Post-money SAFE for 7%</div></div>
              <div className="p-3 rounded-xl bg-white border border-amber-100"><div className="font-normal text-gray-950 font-instrument text-base">$375,000</div><div className="text-[11px] text-gray-600">Uncapped MFN SAFE</div></div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-sm space-y-3">
            <div className="flex items-start justify-between gap-4"><span className="text-gray-500">Status</span><span className="font-semibold text-gray-900 text-right">{transaction.status || 'Recorded'}</span></div>
            <div className="flex items-start justify-between gap-4"><span className="text-gray-500">Sender</span><span className="font-semibold text-gray-900 text-right">Y Combinator</span></div>
            <div className="flex items-start justify-between gap-4"><span className="text-gray-500">Beneficiary</span><span className="font-semibold text-gray-900 text-right">{transaction.beneficiary?.name || 'Blackbird Finance Inc.'}</span></div>
            <div className="flex items-start justify-between gap-4"><span className="text-gray-500">Sender bank</span><span className="font-semibold text-gray-900 text-right">{transaction.sender?.bank || '—'}</span></div>
            <div className="flex items-start justify-between gap-4"><span className="text-gray-500">Sender SWIFT / BIC</span><span className="font-mono text-xs text-gray-900 text-right">{transaction.sender?.swiftCode || '—'}</span></div>
            <div className="flex items-start justify-between gap-4"><span className="text-gray-500">Sender routing number</span><span className="font-mono text-xs text-gray-900 text-right">{transaction.sender?.routingNumber || '—'}</span></div>
            <div className="flex items-start justify-between gap-4"><span className="text-gray-500">Beneficiary bank</span><span className="font-semibold text-gray-900 text-right">{transaction.beneficiary?.bank || '—'}</span></div>
            <div className="flex items-start justify-between gap-4"><span className="text-gray-500">Beneficiary account</span><span className="font-mono text-xs text-gray-900 text-right">{transaction.beneficiary?.account || '—'}</span></div>
            <div className="flex items-start justify-between gap-4"><span className="text-gray-500">Beneficiary SWIFT / BIC</span><span className="font-mono text-xs text-gray-900 text-right">{transaction.beneficiary?.swiftCode || '—'}</span></div>
            <div className="flex items-start justify-between gap-4"><span className="text-gray-500">Beneficiary routing number</span><span className="font-mono text-xs text-gray-900 text-right">{transaction.beneficiary?.routingNumber || '—'}</span></div>
            <div className="flex items-start justify-between gap-4"><span className="text-gray-500">Fedwire / transfer reference</span><span className="font-mono text-xs text-gray-900 text-right break-all">{transaction.swiftReference || '—'}</span></div>
            <div className="flex items-start justify-between gap-4"><span className="text-gray-500">IMAD</span><span className="font-mono text-xs text-gray-900 text-right break-all">{transaction.imad || '—'}</span></div>
            <div className="flex items-start justify-between gap-4"><span className="text-gray-500">OMAD</span><span className="font-mono text-xs text-gray-900 text-right break-all">{transaction.omad || '—'}</span></div>
            <div className="flex items-start justify-between gap-4"><span className="text-gray-500">Fedwire function code</span><span className="font-mono text-xs text-gray-900 text-right">{transaction.busFunctionCode || '—'}</span></div>
            <div className="flex items-start justify-between gap-4"><span className="text-gray-500">Record source</span><span className="font-semibold text-gray-900 text-right">{transaction.recordSource || 'Previously saved investment record'}</span></div>
            {transaction.memo && <div className="pt-2 border-t border-gray-200"><div className="flex items-center gap-2 text-gray-500 mb-1"><FileText className="w-4 h-4" /> Investment terms</div><p className="text-gray-800">{transaction.memo}</p></div>}
          </div>

          <p className="text-[11px] leading-relaxed text-gray-500">Transfer details are restored from the previously saved investment record. Confirm them against the bank's transaction advice before using them for reconciliation.</p>
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => window.print()} className="col-span-2 sm:col-span-1 py-3 rounded-xl bg-gray-950 hover:bg-black text-white font-semibold text-xs flex items-center justify-center gap-2"><Printer className="w-4 h-4" /> Print details</button>
            <button type="button" onClick={onClose} className="py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold text-xs">Close details</button>
          </div>
        </div>
      </div>
    </div>
  );
};
