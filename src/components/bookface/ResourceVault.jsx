import React, { useState } from 'react';
import { 
  Sparkles, 
  Bookmark, 
  TrendingUp, 
  Copy, 
  Check, 
  ExternalLink, 
  BookOpen, 
  ShieldCheck, 
  Users, 
  Building2,
  DollarSign,
  ArrowRight
} from 'lucide-react';
import { EXCLUSIVE_YC_DEALS, YC_PLAYBOOKS, INVESTOR_DIRECTORY } from '../../data/bookfaceData';

export const ResourceVault = () => {
  const [activeTab, setActiveTab] = useState('deals');
  const [copiedCode, setCopiedCode] = useState(null);
  const [selectedPlaybook, setSelectedPlaybook] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-5 rounded-3xl bg-white border border-gray-200/90 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff6600]" />
            <h2 className="text-2xl font-normal text-gray-950 font-instrument">
              Private Vault of Resources & Deals
            </h2>
          </div>
          <p className="text-xs text-gray-600 font-waldenburg mt-1 max-w-xl leading-relaxed">
            Over $500,000 in negotiated perks, battle-tested partner playbooks, and vetted seed investor directories reserved exclusively for YC batch founders.
          </p>
        </div>

        <div className="flex items-center gap-2 font-waldenburg text-xs">
          <button
            onClick={() => setActiveTab('deals')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer font-medium ${
              activeTab === 'deals'
                ? 'bg-gray-950 text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Exclusive Deals ($500k+)
          </button>
          <button
            onClick={() => setActiveTab('playbooks')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer font-medium ${
              activeTab === 'playbooks'
                ? 'bg-gray-950 text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            YC Playbooks
          </button>
          <button
            onClick={() => setActiveTab('investors')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer font-medium ${
              activeTab === 'investors'
                ? 'bg-gray-950 text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Investor Lists
          </button>
        </div>
      </div>

      {/* TAB 1: EXCLUSIVE DEALS */}
      {activeTab === 'deals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXCLUSIVE_YC_DEALS.map((deal) => (
            <div
              key={deal.id}
              className="p-5 rounded-3xl bg-white border border-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-gray-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 font-semibold font-waldenburg">
                    {deal.category}
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold font-waldenburg flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> YC Verified
                  </span>
                </div>

                <h3 className="text-xl font-normal text-gray-950 font-instrument mb-1">
                  {deal.provider}
                </h3>

                <div className="text-sm font-normal text-gray-900 font-instrument mb-2 bg-emerald-50/80 text-emerald-950 p-2.5 rounded-xl border border-emerald-200/60">
                  {deal.benefit}
                </div>

                <p className="text-xs text-gray-600 font-waldenburg leading-relaxed mb-4">
                  {deal.description}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between font-waldenburg">
                <div>
                  <span className="text-[9px] text-gray-400 uppercase tracking-wider block">CLAIM CODE</span>
                  <button
                    onClick={() => handleCopy(deal.code)}
                    className="font-mono text-xs font-bold text-gray-800 hover:text-black flex items-center gap-1 cursor-pointer"
                  >
                    <span>{deal.code}</span>
                    {copiedCode === deal.code ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-gray-400" />}
                  </button>
                </div>

                <button
                  onClick={() => handleCopy(deal.code)}
                  className="py-1.5 px-3 rounded-xl bg-gray-950 hover:bg-black text-white text-xs font-semibold cursor-pointer active:scale-95 transition-all"
                >
                  {copiedCode === deal.code ? 'Copied!' : 'Redeem Perk'}
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* TAB 2: YC PLAYBOOKS */}
      {activeTab === 'playbooks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {YC_PLAYBOOKS.map((pb) => (
            <div
              key={pb.id}
              className="p-6 rounded-3xl bg-white border border-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-gray-300 transition-all cursor-pointer group"
              onClick={() => setSelectedPlaybook(pb)}
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-waldenburg">
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 font-bold border border-amber-200">
                    {pb.category}
                  </span>
                  <span className="text-gray-400">{pb.readTime}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-normal text-gray-950 font-instrument tracking-tight group-hover:text-[#d95300] transition-colors mb-2">
                  {pb.title}
                </h3>

                <p className="text-xs text-gray-600 font-waldenburg leading-relaxed mb-4">
                  {pb.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-waldenburg">
                <span className="text-gray-500">By <strong>{pb.author}</strong></span>
                <span className="text-[#d95300] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: INVESTOR DIRECTORY */}
      {activeTab === 'investors' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INVESTOR_DIRECTORY.map((inv) => (
            <div
              key={inv.id}
              className="p-6 rounded-3xl bg-white border border-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-gray-300 transition-all font-waldenburg"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-normal text-gray-950 font-instrument">
                      {inv.name}
                    </h3>
                    <div className="text-xs font-semibold text-gray-700">
                      {inv.firm} • <span className="text-gray-500">{inv.location}</span>
                    </div>
                  </div>

                  <span className="text-[11px] px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 font-mono font-bold">
                    {inv.checkSize}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 text-xs mb-3 space-y-1">
                  <div className="text-gray-500 font-semibold">Focus Sectors:</div>
                  <div className="text-gray-900 font-medium">{inv.focus}</div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  <strong>Partner Notes:</strong> {inv.notes}
                </p>

                <div className="flex items-center gap-1.5 flex-wrap mb-4">
                  <span className="text-[10px] text-gray-400 font-semibold mr-1">Notable Bets:</span>
                  {inv.portfolio.map((p, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-800 font-medium">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-emerald-700 font-semibold">
                  ● Actively Investing in W27
                </span>
                <button
                  onClick={() => alert(`Intro request for ${inv.name} logged with YC Partner group. You will receive an email confirmation.`)}
                  className="py-1.5 px-3 rounded-xl bg-gray-950 hover:bg-black text-white text-xs font-semibold cursor-pointer active:scale-95 transition-all"
                >
                  Request Partner Warm Intro
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Playbook Reader Modal */}
      {selectedPlaybook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 font-waldenburg max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 font-bold border border-amber-200">
                  {selectedPlaybook.category}
                </span>
                <h3 className="text-2xl font-normal text-gray-950 font-instrument mt-1">
                  {selectedPlaybook.title}
                </h3>
                <span className="text-xs text-gray-500">By {selectedPlaybook.author} • {selectedPlaybook.readTime}</span>
              </div>
              <button
                onClick={() => setSelectedPlaybook(null)}
                className="text-gray-400 hover:text-gray-700 cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-gray-700 space-y-4 leading-relaxed">
              <p className="text-sm font-medium text-gray-900 bg-gray-50 p-3.5 rounded-2xl border border-gray-200">
                {selectedPlaybook.summary}
              </p>
              
              <h4 className="text-lg font-normal text-gray-950 font-instrument pt-2">
                Core Principles from YC Partners
              </h4>
              <p>
                1. <strong>Ruthless Prioritization:</strong> During the batch, the only two things that matter are talking to users and building the product. Everything else—fancy office spaces, early conferences, awards—is a distraction.
              </p>
              <p>
                2. <strong>Speed of Execution:</strong> The best founders ship daily. When an enterprise customer or design partner asks for a feature or integration, closing the loop within 24 hours creates unbeatable momentum.
              </p>
              <p>
                3. <strong>Capital Efficiency:</strong> Having $500k in the bank from YC does not mean you have an infinite runway. With Delaware C-Corp parent banking and strategic yield sweeps (earning ~5% APY), your runway extends from 12 to 18+ months.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedPlaybook(null)}
                className="px-4 py-2 rounded-xl bg-gray-950 text-white text-xs font-semibold hover:bg-black cursor-pointer"
              >
                Close Playbook
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
