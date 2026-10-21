import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Filter, MessageSquare, Send, CheckCircle2, Sparkles, Building2 } from 'lucide-react';
import { FOUNDERS_DIRECTORY } from '../../data/bookfaceData';

export const FounderDirectory = ({ onSelectFounder, searchQuery, setSearchQuery }) => {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [messageTarget, setMessageTarget] = useState(null);
  const [sentMessage, setSentMessage] = useState(false);
  const [introText, setIntroText] = useState('');

  const industries = ['All', 'FinTech', 'AI/ML & Infrastructure', 'Biotech', 'B2B SaaS / Supply Chain', 'Developer Tools', 'Venture Capital'];
  const batches = ['All', 'W27 (Current Batch)', 'S26', 'W26', 'S25', 'YC Partner'];

  const filteredFounders = FOUNDERS_DIRECTORY.filter(fnd => {
    const matchesIndustry = selectedIndustry === 'All' || fnd.industry.toLowerCase().includes(selectedIndustry.toLowerCase());
    const matchesBatch = selectedBatch === 'All' || fnd.batch.includes(selectedBatch.replace(' (Current Batch)', ''));
    const matchesSearch = !searchQuery || 
      fnd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fnd.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fnd.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fnd.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesIndustry && matchesBatch && matchesSearch;
  });

  const handleSendIntro = () => {
    if (!introText.trim()) return;
    setSentMessage(true);
    setTimeout(() => {
      setSentMessage(false);
      setMessageTarget(null);
      setIntroText('');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Directory Header Banner */}
      <div className="p-5 rounded-3xl bg-white border border-gray-200/90 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff6600]" />
            <h2 className="text-2xl font-normal text-gray-950 font-instrument">
              The Ultimate Founder Directory
            </h2>
          </div>
          <p className="text-xs text-gray-600 font-waldenburg mt-1 max-w-xl leading-relaxed">
            Searchable directory of YC founders and alumni. Filter by batch, industry, expertise, and city to find founders who have solved your exact challenge.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-waldenburg text-gray-700">
          <span className="px-3 py-1.5 rounded-xl bg-gray-100 font-semibold border border-gray-200">
            Total Founders: <strong className="font-instrument text-sm text-gray-950">9,240+</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-[#ff6600]/10 text-[#d95300] font-semibold border border-[#ff6600]/20">
            W27 Batch: <strong className="font-instrument text-sm text-[#d95300]">260</strong>
          </span>
        </div>
      </div>

      {/* Multi-Filters Row */}
      <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-3 font-waldenburg text-xs">
        {/* Industry Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-gray-400 font-semibold shrink-0">Industry:</span>
          {industries.map(ind => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                selectedIndustry === ind
                  ? 'bg-gray-950 text-white font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>

        {/* Batch Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-gray-100">
          <span className="text-gray-400 font-semibold shrink-0">YC Batch:</span>
          {batches.map(b => (
            <button
              key={b}
              onClick={() => setSelectedBatch(b)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                selectedBatch === b
                  ? 'bg-[#FB651E] text-white font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Founder Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFounders.map(fnd => (
          <div
            key={fnd.id}
            className={`p-5 rounded-3xl border bg-white shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between transition-all hover:border-gray-400 ${
              fnd.isCurrentUser ? 'border-amber-300 bg-amber-50/20' : 'border-gray-200/90'
            }`}
          >
            <div>
              {/* Card Top: Avatar, Name & Batch Pill */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3.5">
                  <img
                    src={fnd.avatar}
                    alt={fnd.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-gray-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-xl font-normal text-gray-950 font-instrument">
                        {fnd.name}
                      </h3>
                      {fnd.verifiedYcPartner && (
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#FB651E] text-white font-bold">
                          Partner
                        </span>
                      )}
                      {fnd.isCurrentUser && (
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                          You (Current User)
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-gray-800 font-waldenburg">
                      {fnd.role} • <span className="font-instrument text-base text-gray-950">{fnd.company}</span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 font-bold font-waldenburg border border-gray-200 shrink-0">
                  {fnd.batch}
                </span>
              </div>

              {/* Bio & Location */}
              <p className="text-xs text-gray-600 font-waldenburg leading-relaxed mb-3">
                {fnd.bio}
              </p>

              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-waldenburg mb-3">
                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{fnd.location}</span>
                <span className="text-gray-300">•</span>
                <span className="font-medium text-gray-700">{fnd.industry}</span>
              </div>

              {/* Expertise tags */}
              <div className="flex items-center gap-1.5 flex-wrap mb-4 font-waldenburg">
                {fnd.expertise.map((exp, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-gray-50 border border-gray-200 text-gray-700 font-medium"
                  >
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Connect / Intro Button */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-400 font-waldenburg">
                YC Founder Verified
              </span>
              {fnd.isCurrentUser ? (
                <span className="text-xs text-gray-500 font-semibold font-waldenburg">
                  Active Profile
                </span>
              ) : (
                <button
                  onClick={() => setMessageTarget(fnd)}
                  className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-gray-950 hover:bg-black text-white text-xs font-semibold font-waldenburg transition-all cursor-pointer active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Request Intro / DM</span>
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Intro Modal */}
      {messageTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 font-waldenburg">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2.5">
                <img
                  src={messageTarget.avatar}
                  alt={messageTarget.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-normal text-gray-950 font-instrument">
                    Message {messageTarget.name}
                  </h4>
                  <span className="text-[11px] text-gray-500">
                    {messageTarget.company} ({messageTarget.batch})
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMessageTarget(null)}
                className="text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {sentMessage ? (
              <div className="py-8 text-center text-emerald-700 space-y-2">
                <CheckCircle2 className="w-10 h-10 mx-auto" />
                <p className="text-sm font-semibold">Message sent to {messageTarget.name} on Bookface!</p>
                <p className="text-xs text-gray-500">Delivered directly to their founder inbox with W27 verification.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-gray-600 leading-relaxed">
                  Bookface has a 94% reply rate because messages come verified from batch founders. Explain your context and how you can help each other.
                </p>
                <textarea
                  rows={4}
                  placeholder={`Hi ${messageTarget.name.split(' ')[0]}, saw your background in ${messageTarget.expertise[0]}...`}
                  value={introText}
                  onChange={(e) => setIntroText(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-gray-300 text-xs font-waldenburg focus:outline-none focus:border-gray-900 resize-none"
                />
                <button
                  onClick={handleSendIntro}
                  className="w-full py-3 rounded-xl bg-gray-950 hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Founder Message</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
