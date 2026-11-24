import React from 'react';
import { TrendingUp } from 'lucide-react';

export const AreaChartCard = ({ totalDisplay = "₹4,64,50,000", growthRate = "25.7%" }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)] mt-5">
      
      {/* Top Stat in Instrument Serif */}
      <div className="mb-4">
        <h3 className="text-3xl sm:text-4xl font-normal text-gray-950 tracking-tight font-instrument">
          {totalDisplay}
        </h3>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mt-1 font-waldenburg">
          <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="font-instrument text-sm">{growthRate}</span>
          <span className="text-gray-500 font-medium ml-1 font-waldenburg">Runway Projection (18+ Months in INR)</span>
        </div>
      </div>

      {/* Area Spline SVG Chart */}
      <div className="relative pt-2">
        
        {/* Y-Axis Grid labels on left */}
        <div className="relative h-40 w-full">
          
          <div className="absolute left-0 top-2 text-[11px] text-gray-400 font-medium font-mono">
            ₹4.6Cr
          </div>
          <div className="absolute left-0 top-16 text-[11px] text-gray-400 font-medium font-mono">
            ₹3.5Cr
          </div>
          <div className="absolute left-0 bottom-4 text-[11px] text-gray-400 font-medium font-mono">
            ₹2.0Cr
          </div>

          {/* SVG Smooth Area with warm amber gradient */}
          <div className="absolute inset-0 left-14 right-2 bottom-4">
            <svg viewBox="0 0 500 130" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="amberGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                  <stop offset="60%" stopColor="#fbbf24" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Filled Area */}
              <path
                d="M 0 10 
                   C 60 15, 100 28, 160 38 
                   C 220 48, 280 62, 340 78 
                   C 400 95, 450 110, 500 120 
                   L 500 130 
                   L 0 130 Z"
                fill="url(#amberGradient)"
              />

              {/* Top Smooth Spline Line */}
              <path
                d="M 0 10 
                   C 60 15, 100 28, 160 38 
                   C 220 48, 280 62, 340 78 
                   C 400 95, 450 110, 500 120"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Highlighting Pulse Point at Starting Peak */}
              <circle cx="0" cy="10" r="4.5" fill="#f59e0b" className="animate-pulse" />
              <circle cx="0" cy="10" r="2" fill="#ffffff" />
            </svg>
          </div>

        </div>

        {/* X-Axis Month Labels */}
        <div className="flex justify-between pl-14 pr-2 pt-2 text-[11px] text-gray-400 font-medium border-t border-gray-100 font-waldenburg">
          {months.map((m, idx) => (
            <span key={m} className={idx === 0 ? "text-gray-900 font-bold" : ""}>
              {m}
            </span>
          ))}
        </div>

      </div>

    </div>
  );
};
