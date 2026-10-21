import React from 'react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  TrendingUp, 
  Landmark, 
  ArrowUpRight, 
  Mail, 
  Briefcase, 
  Users, 
  ExternalLink 
} from 'lucide-react';
import { CURRENT_FOUNDER_USER } from '../../data/bookfaceData';

export const FounderProfileView = ({ onSwitchToTreasury }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 font-waldenburg">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-[0_2px_15px_rgba(0,0,0,0.02)] relative overflow-hidden">
        
        {/* Top Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FB651E] via-amber-500 to-gray-900" />

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 pt-2 mb-6">
          <div className="flex items-center gap-4">
            <img
              src={CURRENT_FOUNDER_USER.avatar}
              alt={CURRENT_FOUNDER_USER.name}
              className="w-20 h-20 rounded-3xl object-cover border-2 border-white shadow-md ring-1 ring-gray-200"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-3xl font-normal text-gray-950 font-instrument">
                  {CURRENT_FOUNDER_USER.name}
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#ff6600]/10 text-[#d95300] font-bold border border-[#ff6600]/20">
                  {CURRENT_FOUNDER_USER.batch}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-800 mt-0.5">
                {CURRENT_FOUNDER_USER.role} at <span className="font-instrument text-lg text-gray-950">{CURRENT_FOUNDER_USER.company}</span>
              </p>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>{CURRENT_FOUNDER_USER.location}</span>
                <span className="text-gray-300">•</span>
                <span className="font-medium text-gray-700">{CURRENT_FOUNDER_USER.industry}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onSwitchToTreasury}
            className="py-2.5 px-4 rounded-xl bg-gray-950 hover:bg-black text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
          >
            <Landmark className="w-3.5 h-3.5 text-emerald-400" />
            <span>Open Infinity Treasury ($524k)</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Founder & Company Bio
          </h4>
          <p className="text-sm text-gray-800 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-200/70">
            {CURRENT_FOUNDER_USER.bio}
          </p>
        </div>

        {/* 2-Column Pitch & Expertise Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1.5">
            <span className="text-[10px] text-amber-900 font-bold uppercase tracking-wider block">
              WHAT I AM LOOKING FOR
            </span>
            <p className="text-gray-800 leading-relaxed">
              {CURRENT_FOUNDER_USER.lookingFor}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1.5">
            <span className="text-[10px] text-emerald-900 font-bold uppercase tracking-wider block">
              HOW I CAN HELP FELLOW FOUNDERS
            </span>
            <p className="text-gray-800 leading-relaxed">
              {CURRENT_FOUNDER_USER.canHelpWith}
            </p>
          </div>
        </div>

        {/* Co-founders & Tags */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-gray-500">Co-founders:</span>
            <span className="font-semibold text-gray-900">{CURRENT_FOUNDER_USER.coFounders.join(', ')}</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {CURRENT_FOUNDER_USER.tags.map((t, idx) => (
              <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
