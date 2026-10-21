import React from 'react';
import { Home, CreditCard, Send, Sparkles, Download } from 'lucide-react';

export const MobileBottomNav = ({
  activeTab,
  setActiveTab,
  onOpenCard,
  onOpenTransfer,
  onOpenYcWire,
  onOpenInstall
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/90 px-2 py-2 safe-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
      <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
        
        {/* 1. Home / Overview */}
        <button
          onClick={() => setActiveTab('Overview')}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'Overview' || activeTab === 'Treasury & Savings'
              ? 'text-gray-950 font-semibold'
              : 'text-gray-400 hover:text-gray-700'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-waldenburg">Overview</span>
        </button>

        {/* 2. Corporate Savings Card */}
        <button
          onClick={onOpenCard}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-gray-500 hover:text-gray-950 transition-all cursor-pointer"
        >
          <CreditCard className="w-5 h-5 mb-0.5 text-gray-700" />
          <span className="text-[10px] font-waldenburg">Card 7189</span>
        </button>

        {/* 3. Center Transfer Action */}
        <button
          onClick={onOpenTransfer}
          className="flex flex-col items-center justify-center -mt-4 cursor-pointer group"
          title="Send Wire Transfer"
        >
          <div className="w-12 h-12 rounded-full bg-gray-950 text-white flex items-center justify-center shadow-md group-active:scale-95 transition-all">
            <Send className="w-5 h-5 translate-x-0.5 -translate-y-0.5" />
          </div>
          <span className="text-[10px] font-waldenburg mt-1 font-semibold text-gray-900">Transfer</span>
        </button>

        {/* 4. YC W27 SAFE Wire */}
        <button
          onClick={onOpenYcWire}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-gray-500 hover:text-gray-950 transition-all cursor-pointer"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 mb-0.5 text-[#ff6600]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ff6600]" />
          </div>
          <span className="text-[10px] font-waldenburg">YC $500k</span>
        </button>

        {/* 5. Download / Install App */}
        <button
          onClick={onOpenInstall}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-emerald-700 hover:text-emerald-900 transition-all cursor-pointer"
        >
          <Download className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-waldenburg font-semibold">Install App</span>
        </button>

      </div>
    </nav>
  );
};
