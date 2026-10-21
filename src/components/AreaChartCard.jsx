import React from 'react';
import { TrendingUp } from 'lucide-react';

export const AreaChartCard = ({ totalDisplay = "$524,324", growthRate = "25.7%" }) => {
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
          <span className="text-gray-500 font-medium ml-1 font-waldenburg">Runway Projection (18+ Months)</span>
        </div>
      </div>

      {/* Area Spline SVG Chart */}
      <div className="relative pt-2">
        
        {/* Y-Axis Grid labels on left */}
        <div className="relative h-40 w-full">
          
          <div className="absolute left-0 top-2 text-[11px] text-gray-400 font-medium font-mono">
            $500k
          </div>
          <div className="absolute left-0 top-16 text-[11px] text-gray-400 font-medium font-mono">
            $350k
          </div>
          <div className="absolute left-0 bottom-4 text-[11px] text-gray-400 font-medium font-mono">
            $200k
          </div>

          {/* SVG Smooth Area with warm amber gradient */}
          <div className="absolute inset-0 left-12 right-2 bottom-4">
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
                d="M 10 30 
                   C 60 35, 100 45, 150 50 
                   C 200 55, 250 65, 300 70 
                   C 350 75, 400 85, 450 90 
                   L 485 95 
                   L 485 130 
                   L 10 130 Z"
                fill="url(#amberGradient)"
              />

              {/* The Golden Line */}
              <path
                d="M 10 30 
                   C 60 35, 100 45, 150 50 
                   C 200 55, 250 65, 300 70 
                   C 350 75, 400 85, 450 90 
                   L 485 95"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Peak node */}
              <circle cx="10" cy="30" r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
              <circle cx="150" cy="50" r="3" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="300" cy="70" r="3" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="485" cy="95" r="3" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
            </svg>
          </div>

        </div>

        {/* X-Axis Months */}
        <div className="flex justify-between pl-12 pr-2 pt-1 text-[11px] text-gray-500 font-medium">
          {months.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>

      </div>

    </div>
  );
};
