import React, { useState } from 'react';
import { 
  X, 
  Zap, 
  Smartphone, 
  Wifi, 
  Car, 
  Tv, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  Building2
} from 'lucide-react';
import { formatINR } from '../utils/formatters';

export const BillPaymentModal = ({ isOpen, onClose, onPayBill }) => {
  const [category, setCategory] = useState('electricity'); // 'electricity', 'mobile', 'broadband', 'fastag'
  const [biller, setBiller] = useState('BESCOM Bangalore');
  const [consumerNumber, setConsumerNumber] = useState('1904882103');
  const [amount, setAmount] = useState('2450');

  if (!isOpen) return null;

  const BILL_PRESETS = {
    electricity: [
      { name: 'BESCOM Bangalore Electricity', defaultNum: '1904882103', defaultAmount: '2450' },
      { name: 'Tata Power Delhi', defaultNum: '3009481239', defaultAmount: '3820' },
      { name: 'Adani Electricity Mumbai', defaultNum: '1092849102', defaultAmount: '1980' },
    ],
    mobile: [
      { name: 'Reliance Jio Prepaid', defaultNum: '9876543210', defaultAmount: '399' },
      { name: 'Airtel Prepaid Recharge', defaultNum: '9845012345', defaultAmount: '479' },
      { name: 'Vodafone Idea (Vi)', defaultNum: '9711099887', defaultAmount: '299' },
    ],
    broadband: [
      { name: 'Airtel Xstream Fiber', defaultNum: '0804198234', defaultAmount: '1179' },
      { name: 'ACT Fibernet 150 Mbps', defaultNum: 'ACT9823412', defaultAmount: '943' },
      { name: 'JioFiber Unlimited', defaultNum: '0802938475', defaultAmount: '1178' },
    ],
    fastag: [
      { name: 'ICICI Bank FASTag', defaultNum: 'KA01MJ4920', defaultAmount: '1000' },
      { name: 'Paytm Payments Bank FASTag', defaultNum: 'DL3CA1029', defaultAmount: '500' },
    ],
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    const firstBiller = BILL_PRESETS[cat][0];
    setBiller(firstBiller.name);
    setConsumerNumber(firstBiller.defaultNum);
    setAmount(firstBiller.defaultAmount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPayBill({
      title: biller,
      subtitle: `BBPS • ${consumerNumber}`,
      amount: parseFloat(amount),
      category: 'Utilities',
      note: `Bill Payment for ${biller}`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#121624] border border-white/10 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Bharat Bill Payment (BBPS)</h3>
              <p className="text-[11px] text-gray-400">Instant UPI utility & recharge clearance</p>
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
          
          {/* Category Tabs */}
          <div className="grid grid-cols-4 gap-2 p-1 rounded-2xl bg-white/5 border border-white/10 mb-6">
            {[
              { id: 'electricity', label: 'Electricity', icon: Zap },
              { id: 'mobile', label: 'Mobile', icon: Smartphone },
              { id: 'broadband', label: 'Broadband', icon: Wifi },
              { id: 'fastag', label: 'FASTag', icon: Car },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleCategoryChange(tab.id)}
                  className={`flex flex-col items-center py-2.5 px-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    category === tab.id
                      ? 'bg-rose-500 text-black shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span className="text-[11px] truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Biller Select */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Select Service Provider / Biller
              </label>
              <select
                value={biller}
                onChange={(e) => {
                  const selected = BILL_PRESETS[category].find(b => b.name === e.target.value);
                  setBiller(e.target.value);
                  if (selected) {
                    setConsumerNumber(selected.defaultNum);
                    setAmount(selected.defaultAmount);
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-rose-500"
              >
                {BILL_PRESETS[category].map((b) => (
                  <option key={b.name} value={b.name} className="bg-[#121624] text-white">
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Consumer Number / Mobile */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                {category === 'mobile' ? 'Mobile Number' : category === 'fastag' ? 'Vehicle Registration Number' : 'Consumer Account ID'}
              </label>
              <input
                type="text"
                required
                value={consumerNumber}
                onChange={(e) => setConsumerNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Bill Due Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-rose-400 font-mono">
                  ₹
                </span>
                <input
                  type="number"
                  required
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xl font-bold text-white font-mono focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-black font-extrabold text-sm shadow-lg shadow-rose-500/20 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Pay {formatINR(parseFloat(amount))} via UPI</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            <p className="text-[10px] text-gray-500 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              NPCI BBPS Certified Transaction • Instant receipt generated
            </p>

          </form>

        </div>

      </div>
    </div>
  );
};
