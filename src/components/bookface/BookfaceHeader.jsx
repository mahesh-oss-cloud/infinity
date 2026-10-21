import React from 'react';
import { Search, Sparkles, Plus, Users, Bookmark, Landmark, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { CURRENT_FOUNDER_USER } from '../../data/bookfaceData';

export const BookfaceHeader = ({
  activeSubView,
  setActiveSubView,
  onOpenNewPost,
  onSwitchToTreasury,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-30 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
      
      {/* Top Banner: Confidential Founder Community Notice */}
      <div className="bg-gray-950 text-white px-4 py-1.5 text-[11px] font-waldenburg flex items-center justify-between">
        <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff6600] animate-pulse" />
            <span className="text-gray-300">
              <strong className="text-white">BOOKFACE CONFIDENTIAL</strong> • Y Combinator Private Founder Intranet • Batch W27 Active
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-gray-400">
              Logged in as <strong>{CURRENT_FOUNDER_USER.name}</strong> ({CURRENT_FOUNDER_USER.company})
            </span>
            <button
              onClick={onSwitchToTreasury}
              className="text-xs text-[#ff6600] hover:text-white flex items-center gap-1 font-semibold transition-colors cursor-pointer"
            >
              <span>Go to Infinity Treasury ($524k)</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        
        {/* Left: Official YC Bookface Logo in Instrument Serif */}
        <div className="flex items-center gap-3.5 shrink-0 cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-[#FB651E] flex items-center justify-center p-1.5 shadow-sm">
            <svg viewBox="0 0 256 256" className="w-full h-full" preserveAspectRatio="xMidYMid">
              <path 
                d="M119.373653,144.745813 L75.43296,62.4315733 L95.5144533,62.4315733 L121.36192,114.52416 C121.759575,115.452022 122.2235,116.413008 122.753707,117.407147 C123.283914,118.401285 123.747838,119.428546 124.145493,120.48896 C124.410597,120.886615 124.609422,121.251127 124.741973,121.582507 C124.874525,121.913886 125.007075,122.212123 125.139627,122.477227 C125.802386,123.802744 126.39886,125.095105 126.929067,126.354347 C127.459274,127.613589 127.923198,128.773399 128.320853,129.833813 C129.381268,127.580433 130.541078,125.1614 131.80032,122.57664 C133.059562,119.99188 134.351922,117.307747 135.67744,114.52416 L161.92256,62.4315733 L180.612267,62.4315733 L136.27392,145.739947 L136.27392,198.826667 L119.373653,198.826667 L119.373653,144.745813 Z" 
                fill="#FFFFFF" 
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-normal text-gray-950 tracking-tight font-instrument">
                Bookface
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#ff6600]/10 text-[#d95300] font-bold font-waldenburg border border-[#ff6600]/20">
                YC W27
              </span>
            </div>
            <span className="text-[10px] text-gray-400 block font-waldenburg -mt-0.5">
              Y Combinator Founder Community
            </span>
          </div>
        </div>

        {/* Center Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search founders, companies, playbooks, discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs font-waldenburg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 font-waldenburg text-xs">
          <button
            onClick={() => setActiveSubView('forum')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              activeSubView === 'forum'
                ? 'bg-gray-950 text-white font-medium shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            The Collective Brain
          </button>
          <button
            onClick={() => setActiveSubView('directory')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              activeSubView === 'directory'
                ? 'bg-gray-950 text-white font-medium shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Founder Directory
          </button>
          <button
            onClick={() => setActiveSubView('vault')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              activeSubView === 'vault'
                ? 'bg-gray-950 text-white font-medium shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Deals & Playbooks
          </button>
          <button
            onClick={onSwitchToTreasury}
            className="px-3.5 py-1.5 rounded-full text-gray-600 hover:text-gray-950 hover:bg-gray-100 transition-all cursor-pointer flex items-center gap-1 border border-gray-200"
          >
            <Landmark className="w-3.5 h-3.5 text-gray-700" />
            <span>Infinity Treasury</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenNewPost}
            className="flex items-center gap-1.5 py-2 px-3 sm:px-4 rounded-xl bg-[#FB651E] hover:bg-[#e05514] text-white text-xs font-semibold font-waldenburg shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Ask Bookface</span>
          </button>

          {/* User Profile Avatar */}
          <div 
            onClick={() => setActiveSubView('profile')}
            className="w-8.5 h-8.5 rounded-full overflow-hidden border border-gray-200 cursor-pointer hover:ring-2 hover:ring-[#ff6600] transition-all ml-1"
            title={`${CURRENT_FOUNDER_USER.name} (${CURRENT_FOUNDER_USER.company})`}
          >
            <img
              src={CURRENT_FOUNDER_USER.avatar}
              alt={CURRENT_FOUNDER_USER.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </header>
  );
};
