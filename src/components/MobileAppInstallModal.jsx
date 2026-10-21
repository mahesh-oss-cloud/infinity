import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone, CheckCircle2, Globe, Share2, Sparkles, ShieldCheck } from 'lucide-react';

export const MobileAppInstallModal = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [copiedDomain, setCopiedDomain] = useState(false);
  const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // If native prompt isn't supported directly, prompt user or trigger browser install
      alert("To install Infinity on your device:\n\n• On iPhone/iPad: Tap the Share button ⎋ at bottom, then tap 'Add to Home Screen'\n• On Android/Chrome: Tap the 3 dots (⋮) menu, then tap 'Install app' or 'Add to Home screen'");
    }
  };

  const handleCopyYcDomain = () => {
    navigator.clipboard.writeText('127.0.0.1 infinity.yc');
    setCopiedDomain(true);
    setTimeout(() => setCopiedDomain(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag handle */}
        <div className="sm:hidden w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-1" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pt-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src="https://framerusercontent.com/images/NZCnVo54QATCSJPCjPXI4KFLZw.png"
              alt="Infinity"
              className="w-10 h-10 rounded-xl object-contain shadow-xs border border-gray-100"
            />
            <div>
              <h2 className="text-2xl font-normal text-gray-950 font-instrument">
                Infinity Mobile App
              </h2>
              <span className="text-[11px] text-gray-500 font-waldenburg block">
                Blackbird Finance Inc. (Delaware C-Corp • YC W27)
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-5 overflow-y-auto font-waldenburg">
          
          {/* Status Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-emerald-950 font-instrument">
                Downloadable Progressive Web App (PWA)
              </h4>
              <p className="text-xs text-emerald-800 mt-0.5 font-waldenburg leading-relaxed">
                Install Infinity directly onto your phone’s home screen with 0 App Store delay. Includes biometric security, offline caching, and instant access to your $500,000 YC treasury.
              </p>
            </div>
          </div>

          {/* Primary Install Button */}
          <div>
            <button
              onClick={handleInstallClick}
              className="w-full py-3.5 px-5 rounded-2xl bg-gray-950 hover:bg-black text-white font-medium text-sm flex items-center justify-center gap-2.5 shadow-md active:scale-[0.99] transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>{isInstalled ? 'App Already Installed' : 'Install / Download App to Home Screen'}</span>
            </button>
            <span className="text-[11px] text-gray-400 text-center block mt-1.5 font-waldenburg">
              Compatible with iOS (iPhone/iPad), Android, macOS & Windows
            </span>
          </div>

          {/* iOS / iPhone Guide */}
          {isIos && (
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-2">
              <div className="font-semibold text-gray-900 flex items-center gap-1.5 font-instrument text-base">
                <Share2 className="w-4 h-4 text-blue-600" />
                <span>iPhone / Safari Installation Steps</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-gray-600 pl-1">
                <li>Tap the <strong>Share</strong> icon (square with arrow ⎋) at bottom of Safari.</li>
                <li>Scroll down and tap <strong>"Add to Home Screen"</strong>.</li>
                <li>Tap <strong>"Add"</strong> in top-right corner. Infinity will appear as an app icon!</li>
              </ol>
            </div>
          )}

          {/* infinity.yc Domain Configuration */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-amber-950 flex items-center gap-1.5 font-instrument text-base">
                <Globe className="w-4 h-4 text-amber-700" />
                <span>Using Custom URL: http://infinity.yc</span>
              </span>
              <span className="text-[10px] bg-amber-200/60 text-amber-900 px-2 py-0.5 rounded-full font-mono font-bold">
                Local DNS
              </span>
            </div>
            <p className="text-amber-900 leading-relaxed font-waldenburg">
              Because <code>.yc</code> is an internal/non-ICANN TLD, you can map it directly on your machine or local Wi-Fi router. Add this 1-line entry to your <code>hosts</code> file:
            </p>
            <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-amber-200 font-mono text-[11px]">
              <code>127.0.0.1 infinity.yc</code>
              <button
                onClick={handleCopyYcDomain}
                className="text-amber-800 hover:text-black font-semibold text-xs ml-2 cursor-pointer"
              >
                {copiedDomain ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <span className="text-[10px] text-amber-800 block">
              Then navigate to <strong>http://infinity.yc:5173</strong> in your browser!
            </span>
          </div>

          {/* Features list */}
          <div className="space-y-2 pt-1 border-t border-gray-100">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-waldenburg">
              Mobile App Features
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Card 7189 Apple Pay / Google Pay</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>YC W27 Fedwire Receipt</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Offline Balance Verification</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>US-India RBI Remittance Flow</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-waldenburg">
            Version 2.7.0 (Build 2027)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
