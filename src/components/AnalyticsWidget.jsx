import React, { useMemo } from 'react';
import { 
  PieChart, 
  TrendingUp, 
  Percent, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight,
  Zap,
  Globe2
} from 'lucide-react';
import { formatINR } from '../utils/formatters';

export const AnalyticsWidget = ({ transactions, user }) => {
  const { categoryTotals, totalSpent, fxSavings } = useMemo(() => {
    const cats = {};
    let spent = 0;
    let foreignVolume = 0;

    transactions.forEach(t => {
      if (t.status === 'SUCCESS') {
        if (t.direction === 'debit') {
          spent += t.amount;
          cats[t.category] = (cats[t.category] || 0) + t.amount;
        } else if (t.type === 'international_inward') {
          foreignVolume += t.amount;
        }
      }
    });

    // Traditional banks charge ~3.5% FX markup. Infinity charges 0.5% flat.
    // Savings = 3.0% of foreign inward volume!
    const savings = foreignVolume * 0.03;

    return { categoryTotals: cats, totalSpent: spent, fxSavings: savings };
  }, [transactions]);

  const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      
      {/* Category Spending Breakdown */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#111420]/80 border border-white/10 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Spending Breakdown</h3>
            <p className="text-xs text-gray-400">Total Outflow: {formatINR(totalSpent)}</p>
          </div>
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <PieChart className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-3">
          {sortedCategories.slice(0, 4).map(([cat, amount]) => {
            const percent = totalSpent > 0 ? Math.round((amount / totalSpent) * 100) : 0;
            return (
              <div key={cat} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-medium">{cat}</span>
                  <span className="text-white font-mono">{formatINR(amount)} ({percent}%)</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Infinity FX Zero-Markup Savings Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-cyan-950/30 via-[#111420]/80 to-[#141829] border border-cyan-500/20 shadow-xl relative overflow-hidden flex flex-col justify-between">
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">Infinity FX Advantage</h3>
              <p className="text-[11px] text-cyan-300">Zero FX Markup vs Traditional Banks</p>
            </div>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold">
            0.5% Flat
          </span>
        </div>

        <div className="my-2">
          <div className="text-xs text-gray-400">Saved This Month</div>
          <div className="text-3xl font-extrabold text-cyan-300 font-mono my-0.5">
            {formatINR(fxSavings, false)}
          </div>
          <p className="text-xs text-gray-400">
            Compared to standard 3.5% bank wire markups. Plus instant FIRA for every payment.
          </p>
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            RBI Compliant Remittance
          </span>
          <span className="text-gray-300 font-mono">100% Transparency</span>
        </div>

      </div>

    </div>
  );
};
