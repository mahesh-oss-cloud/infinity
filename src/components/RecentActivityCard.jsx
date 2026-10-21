import React from 'react';
import { Info, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BrandIcon } from './BrandIcons';

export const RecentActivityCard = ({ transactions, onSelectTransaction, onSeeMore }) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-1.5 min-w-0">
          <h3 className="text-xl font-normal text-gray-950 tracking-tight font-instrument">Recent Activity</h3>
          <button title="Account activity feed" type="button" className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
        <button type="button" onClick={onSeeMore} className="text-xs font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 shrink-0">
          <span>Statement</span><ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="space-y-3">
        {transactions.map((tx) => {
          const isCredit = Number(tx.amount) > 0;
          const isYCombinator = Boolean(tx.isYCombinator);
          const isDemoTransfer = Boolean(tx.isDemoTransfer);
          const formattedAmount = `${isCredit ? '+' : '-'}$${Math.abs(Number(tx.amount) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          const detailLabel = isYCombinator
            ? 'View demo investment details'
            : isDemoTransfer
              ? 'View payment preview'
              : 'View transaction details';

          return (
            <div
              key={tx.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectTransaction && onSelectTransaction(tx)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelectTransaction && onSelectTransaction(tx);
                }
              }}
              className="p-4 rounded-2xl bg-gray-50/70 hover:bg-gray-100 border border-gray-200/80 transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <BrandIcon type={tx.brandIcon} />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-normal text-gray-950 truncate group-hover:text-black font-instrument">{tx.title}</h4>
                      {isYCombinator ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#ff6600] text-white font-bold tracking-wider font-mono shrink-0">W27 BATCH</span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-gray-200 text-gray-700 font-semibold tracking-wide shrink-0">{isDemoTransfer ? 'DEMO PREVIEW' : (tx.category || 'ACTIVITY')}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5 break-words font-medium font-waldenburg">{tx.subtitle || tx.category || 'Account activity'}</p>
                  </div>
                </div>
                <div className="text-right shrink-0 pl-1">
                  <div className={`text-base sm:text-lg font-normal font-instrument ${isCredit ? 'text-gray-950' : 'text-rose-700'}`}>{formattedAmount}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5 font-medium">{tx.date}</div>
                </div>
              </div>

              {isYCombinator ? (
                <div className="mt-3 pt-2.5 border-t border-gray-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-600">
                  <span className="flex items-center gap-1.5 text-gray-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gray-500" />
                    <span>Demo investment record · not a bank confirmation</span>
                  </span>
                  <span className="text-gray-600 font-semibold group-hover:underline">{detailLabel} →</span>
                </div>
              ) : (
                <div className="mt-3 pt-2.5 border-t border-gray-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-600">
                  <span className="flex items-center gap-1.5 font-medium min-w-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="break-words">{tx.status || 'Recorded in local preview'}{tx.paymentPurpose ? ` · ${tx.paymentPurpose}` : ''}</span>
                  </span>
                  <span className="text-gray-600 font-semibold group-hover:underline shrink-0">{detailLabel} →</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
