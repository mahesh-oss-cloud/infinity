import React, { useState } from 'react';
import { 
  X, 
  Scan, 
  Camera, 
  Upload, 
  Store, 
  Coffee, 
  ShoppingBag, 
  Fuel, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ScanQRModal = ({ isOpen, onClose, onSelectMerchantForPayment }) => {
  const [scanning, setScanning] = useState(false);

  if (!isOpen) return null;

  // Merchant presets to simulate scanning in desktop/laptop environments
  const PRESET_MERCHANTS = [
    {
      id: 'm1',
      name: 'Chai Point Cyber Hub',
      upiId: 'chaipoint@paytm',
      suggestedAmount: 60,
      category: 'Food & Drinks',
      icon: Coffee,
      city: 'Gurugram',
    },
    {
      id: 'm2',
      name: 'Starbucks Coffee India',
      upiId: 'starbucks.koramangala@okhdfcbank',
      suggestedAmount: 380,
      category: 'Cafe',
      icon: Coffee,
      city: 'Bengaluru',
    },
    {
      id: 'm3',
      name: 'Nature\'s Basket Gourmet Store',
      upiId: 'naturesbasket@icici',
      suggestedAmount: 1450,
      category: 'Groceries',
      icon: ShoppingBag,
      city: 'Mumbai',
    },
    {
      id: 'm4',
      name: 'Indian Oil Petrol Pump',
      upiId: 'indianoil.fuel@okaxis',
      suggestedAmount: 2000,
      category: 'Fuel',
      icon: Fuel,
      city: 'Indiranagar',
    },
  ];

  const handleSimulateScan = (merchant) => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      onSelectMerchantForPayment({
        name: merchant.name,
        upiId: merchant.upiId,
        suggestedAmount: merchant.suggestedAmount,
        note: `Payment at ${merchant.name}`,
      });
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#121624] border border-white/10 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Scan className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Scan UPI QR</h3>
              <p className="text-[11px] text-gray-400">Point at any Bharat QR, PhonePe, or Paytm QR</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          
          {/* Scanner Viewfinder Box */}
          <div className="relative aspect-square max-w-[260px] mx-auto rounded-3xl bg-black/60 border-2 border-dashed border-emerald-500/40 flex items-center justify-center overflow-hidden mb-6 shadow-2xl">
            
            {/* Viewfinder Corners */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-emerald-400" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-emerald-400" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-emerald-400" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-emerald-400" />

            {/* Animated Laser Scanning Line */}
            <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-scan" />

            <div className="text-center p-4">
              <Camera className="w-10 h-10 text-emerald-400/50 mx-auto mb-2 animate-pulse" />
              <p className="text-xs text-gray-400">Align QR code inside this frame</p>
              {scanning && (
                <div className="mt-2 text-xs font-semibold text-emerald-400 animate-pulse">
                  Scanning QR & resolving NPCI VPA...
                </div>
              )}
            </div>

          </div>

          {/* Quick Preset Merchant Simulation */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-400 mb-2">
              <span>Quick Test Merchants</span>
              <span className="text-[10px] text-emerald-400">Tap to Simulate Scan</span>
            </div>

            <div className="space-y-2">
              {PRESET_MERCHANTS.map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => handleSimulateScan(m)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-300 group-hover:text-emerald-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-emerald-300">
                          {m.name}
                        </div>
                        <div className="text-[10px] text-gray-400 font-mono">
                          {m.upiId} • {m.city}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-400 font-mono">
                        ₹{m.suggestedAmount}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-emerald-400 ml-auto" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-center">
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 cursor-pointer transition-all">
              <Upload className="w-4 h-4 text-gray-400" />
              <span>Upload QR from Gallery / Photos</span>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={() => handleSimulateScan(PRESET_MERCHANTS[0])} 
              />
            </label>
          </div>

        </div>

      </div>
    </div>
  );
};
