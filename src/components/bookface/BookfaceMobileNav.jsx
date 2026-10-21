import React from 'react';
import { MessageSquare, Users, Sparkles, Landmark, User, Plus } from 'lucide-react';

export const BookfaceMobileNav = ({
  activeSubView,
  setActiveSubView,
  onOpenNewPost,
  onSwitchToTreasury
}) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/90 px-2 py-2 safe-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.04)] font-waldenburg">
      <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto text-[10px]">
        
        {/* 1. Forum */}
        <button
          onClick={() => setActiveSubView('forum')}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
            activeSubView === 'forum' ? 'text-gray-950 font-bold' : 'text-gray-400 hover:text-gray-700'
          }`}
        >
          <MessageSquare className="w-5 h-5 mb-0.5" />
          <span>Forum</span>
        </button>

        {/* 2. Directory */}
        <button
          onClick={() => setActiveSubView('directory')}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
            activeSubView === 'directory' ? 'text-gray-950 font-bold' : 'text-gray-400 hover:text-gray-700'
          }`}
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span>Founders</span>
        </button>

        {/* 3. Center Ask Action */}
        <button
          onClick={onOpenNewPost}
          className="flex flex-col items-center justify-center -mt-4 cursor-pointer group"
          title="Post to Bookface"
        >
          <div className="w-12 h-12 rounded-full bg-[#FB651E] text-white flex items-center justify-center shadow-md group-active:scale-95 transition-all">
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="text-[10px] mt-1 font-semibold text-gray-900">Ask</span>
        </button>

        {/* 4. Vault & Deals */}
        <button
          onClick={() => setActiveSubView('vault')}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
            activeSubView === 'vault' ? 'text-gray-950 font-bold' : 'text-gray-400 hover:text-gray-700'
          }`}
        >
          <Sparkles className="w-5 h-5 mb-0.5 text-amber-600" />
          <span>Vault</span>
        </button>

        {/* 5. Infinity Treasury */}
        <button
          onClick={onSwitchToTreasury}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-emerald-700 hover:text-emerald-950 transition-all cursor-pointer"
        >
          <Landmark className="w-5 h-5 mb-0.5" />
          <span className="font-semibold">Treasury</span>
        </button>

      </div>
    </nav>
  );
};
