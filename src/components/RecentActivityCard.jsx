import React from 'react';
import { Info, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BrandIcon } from './BrandIcons';

export const RecentActivityCard = ({ 
  transactions, 
  onSelectTransaction, 
  onSeeMore 
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
      
      {/* Header with Instrument Serif title */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <h3 className="text-xl font-normal text-gray-950 tracking-tight font-instrument">
            Recent Activity
          </h3>
          <button 
            title="Account Activity Feed"
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={onSeeMore}
          className="text-xs font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>Statement</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Transactions List - Strictly Y Combinator W27 as requested! */}
      <div className="space-y-3">
        {transactions.map((tx) => {
          const isCredit = tx.amount > 0;
          const formattedAmount = `${isCredit ? '+' : '-'}$${Math.abs(tx.amount).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`;

          return (
            <div
              key={tx.id}
              onClick={() => onSelectTransaction && onSelectTransaction(tx)}
              className="p-4 rounded-2xl bg-amber-50/40 hover:bg-amber-50 border border-amber-200/70 transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between">
                
                {/* Left: YC Brand Badge + Title & Subtitle */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <BrandIcon type={tx.brandIcon} />
                  
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-normal text-gray-950 truncate group-hover:text-black transition-colors font-instrument">
                        {tx.title}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#ff6600] text-white font-bold tracking-wider font-mono">
                        W27 BATCH
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 truncate mt-0.5 font-medium font-waldenburg">
                      {tx.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right: Amount & Date */}
                <div className="text-right flex-shrink-0 pl-3">
                  <div className="text-base sm:text-lg font-normal text-gray-950 font-instrument">
                    {formattedAmount}
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5 font-medium font-waldenburg">
                    {tx.date}
                  </div>
                </div>

              </div>

              {/* Verified SAFE Deal Memo Footer */}
              <div className="mt-3 pt-2.5 border-t border-amber-200/50 flex items-center justify-between text-[11px] text-gray-600">
                <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Standard Deal: $125k (7%) + $375k MFN SAFE</span>
                </span>
                <span className="text-amber-800 font-bold hover:underline">
                  View Fedwire MT103 →
                </span>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
