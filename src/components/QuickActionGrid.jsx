import React from 'react';
import { 
  Scan, 
  AtSign, 
  Smartphone, 
  Building2, 
  ArrowLeftRight, 
  ReceiptText, 
  QrCode, 
  Zap,
  Globe2,
  CreditCard,
  Tv,
  Coins
} from 'lucide-react';

export const QuickActionGrid = ({ 
  onScanQR, 
  onPayUpiId, 
  onPayMobile, 
  onPayBank, 
  onSelfTransfer, 
  onReceiveQR, 
  onBills, 
  onGlobalRemit 
}) => {
  const actions = [
    {
      id: 'scan-qr',
      title: 'Scan QR',
      subtitle: 'Any UPI QR',
      icon: Scan,
      color: 'from-emerald-500 to-teal-500',
      badge: 'Camera',
      onClick: onScanQR,
    },
    {
      id: 'upi-id',
      title: 'To UPI ID',
      subtitle: 'VPA / Handle',
      icon: AtSign,
      color: 'from-cyan-500 to-blue-500',
      onClick: onPayUpiId,
    },
    {
      id: 'mobile',
      title: 'To Mobile',
      subtitle: 'Contacts',
      icon: Smartphone,
      color: 'from-teal-500 to-emerald-400',
      onClick: onPayMobile,
    },
    {
      id: 'bank-ifsc',
      title: 'Bank / IFSC',
      subtitle: 'Direct A/C',
      icon: Building2,
      color: 'from-indigo-500 to-blue-500',
      onClick: onPayBank,
    },
    {
      id: 'self-transfer',
      title: 'Self Transfer',
      subtitle: 'Own accounts',
      icon: ArrowLeftRight,
      color: 'from-violet-500 to-purple-500',
      onClick: onSelfTransfer,
    },
    {
      id: 'my-qr',
      title: 'Receive / QR',
      subtitle: 'Payment Link',
      icon: QrCode,
      color: 'from-amber-500 to-orange-500',
      onClick: onReceiveQR,
    },
    {
      id: 'bills',
      title: 'Pay Bills',
      subtitle: 'BBPS Utilities',
      icon: Zap,
      color: 'from-rose-500 to-pink-500',
      badge: 'Recharge',
      onClick: onBills,
    },
    {
      id: 'global-remit',
      title: 'Global Inward',
      subtitle: '0.5% FX Fee',
      icon: Globe2,
      color: 'from-blue-500 to-cyan-500',
      badge: 'FIRA',
      onClick: onGlobalRemit,
    },
  ];

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>UPI Quick Actions</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              Instant 24x7
            </span>
          </h2>
          <p className="text-xs text-gray-400">NPCI interoperable with PhonePe, Google Pay, Paytm & Banks</p>
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 sm:gap-3">
        {actions.map((act) => {
          const IconComponent = act.icon;
          return (
            <button
              key={act.id}
              onClick={act.onClick}
              className="group relative flex flex-col items-center justify-center p-3 rounded-2xl bg-[#131622]/80 hover:bg-[#1a1f30] border border-white/5 hover:border-emerald-500/30 transition-all duration-200 active:scale-95 cursor-pointer text-center"
            >
              {act.badge && (
                <span className="absolute -top-1.5 -right-1 text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500 text-black font-bold uppercase tracking-wider">
                  {act.badge}
                </span>
              )}
              
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${act.color} p-[1.5px] mb-2 group-hover:scale-105 transition-transform duration-200`}>
                <div className="w-full h-full bg-[#0b0e17] rounded-[10px] flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-white group-hover:text-emerald-300 transition-colors" />
                </div>
              </div>

              <span className="text-xs font-semibold text-gray-200 group-hover:text-white line-clamp-1">
                {act.title}
              </span>
              <span className="text-[10px] text-gray-500 group-hover:text-gray-400 line-clamp-1 hidden sm:block">
                {act.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
