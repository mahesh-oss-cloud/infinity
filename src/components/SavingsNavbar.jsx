import React from 'react';
import '@fontsource-variable/orbitron/wght.css';
import { Search, Bell, Scale, Download } from 'lucide-react';

export const SavingsNavbar = ({ 
  activeTab = 'Treasury & Savings', 
  setActiveTab,
  onOpenComplianceRoadmap,
  onOpenInstall
}) => {
  const tabs = ['Overview', 'Accounts', 'Transactions', 'Treasury & Savings', 'Intercompany', 'Settings'];

  return (
    <header className="w-full bg-white border-b border-gray-200/80 px-4 sm:px-10 py-3.5 mb-4 sm:mb-6 sticky top-0 z-30 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        
        {/* Brand logo wordmark */}
        <div className="flex items-center gap-2.5 sm:gap-3 cursor-pointer">
          <img
            src="/infinity-logo.svg"
            alt="Infinity"
            className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl object-contain"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-normal text-gray-950 tracking-tight font-orbitron">
                Infinity
              </span>
              <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 font-semibold border border-gray-200 font-waldenburg">
                Blackbird Finance Inc.
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Minimalist Dark / Neutral styling) */}
        <nav className="hidden md:flex items-center gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer font-waldenburg ${
                  isActive
                    ? 'bg-gray-900 text-white font-medium shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 font-normal hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons & Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Website install prompt is hidden in the standalone APK. */}
          {onOpenInstall && (
            <button
              onClick={onOpenInstall}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-semibold transition-all cursor-pointer"
              title="Install Infinity"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-waldenburg">Install App</span>
            </button>
          )}

          {/* US-India Cross-border structuring button */}
          <button
            onClick={onOpenComplianceRoadmap}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-800 text-xs font-semibold transition-all cursor-pointer font-waldenburg"
            title="Delaware Parent & Indian Subsidiary Structure"
          >
            <Scale className="w-3.5 h-3.5 text-gray-700" />
            <span>US-India Structure</span>
          </button>

          {/* Search button */}
          <button 
            className="w-8.5 h-8.5 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Bell notification button */}
          <div className="relative">
            <button 
              className="w-8.5 h-8.5 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#ff6600]" />
          </div>


        </div>

      </div>
    </header>
  );
};
