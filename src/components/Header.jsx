import React, { useState } from 'react';
import { 
  Infinity as InfinityIcon, 
  ShieldCheck, 
  Copy, 
  Check, 
  Volume2, 
  Bell, 
  Moon, 
  Sun,
  Globe,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { playSoundboxAnnouncement } from '../utils/audio';

export const Header = ({ 
  user, 
  darkMode, 
  setDarkMode, 
  onOpenReceive, 
  onOpenSoundboxDemo 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(user.primaryUpiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const testQuickSoundbox = () => {
    playSoundboxAnnouncement(500);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090b12]/80 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Platform Title */}
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 p-[1.5px] shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300">
                <div className="w-full h-full bg-[#0b0e17] rounded-[10px] flex items-center justify-center">
                  <InfinityIcon className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#090b12] animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  INFINITY
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-400 font-medium">
                    UPI 2.0
                  </span>
                </span>
              </div>
              <p className="text-[11px] text-gray-400 hidden sm:block">
                Global Remittance & Indian UPI Operating System
              </p>
            </div>
          </div>

          {/* Center: Live FX & Network Status Ticker */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>NPCI Live</span>
            </div>
            <span className="text-gray-600">•</span>
            <div className="flex items-center gap-3 text-[11px]">
              <span>1 USD = <strong className="text-white">₹86.85</strong></span>
              <span className="text-gray-600">|</span>
              <span>1 EUR = <strong className="text-white">₹94.20</strong></span>
              <span className="text-gray-600">|</span>
              <span className="text-emerald-400">0.5% Flat FX Fee</span>
            </div>
          </div>

          {/* Right Actions & User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Soundbox audio simulator button */}
            <button
              onClick={testQuickSoundbox}
              title="Test Soundbox Audio Chime"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-medium transition-all cursor-pointer active:scale-95"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Soundbox</span>
            </button>

            {/* UPI ID Pill with copy */}
            <div 
              onClick={handleCopyUpi}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs cursor-pointer transition-all active:scale-95"
              title="Click to copy UPI ID"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-gray-300 font-mono text-[11px] sm:text-xs">
                {user.primaryUpiId}
              </span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
              )}
            </div>

            {/* User Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-cyan-600 p-[1.5px] cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
