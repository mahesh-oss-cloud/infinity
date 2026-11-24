import React from 'react';
import { TrendingUp } from 'lucide-react';
import { MONTHLY_CHART_DATA } from '../data/savingsData';

export const BarChartCard = ({ totalDisplay = "₹4,64,50,000", growthRate = "25.7%" }) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
      
      {/* Top Stat in Instrument Serif */}
      <div className="mb-6">
        <h3 className="text-3xl sm:text-4xl font-normal text-gray-950 tracking-tight font-instrument">
          {totalDisplay}
        </h3>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mt-1 font-waldenburg">
          <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="font-instrument text-sm">{growthRate}</span>
          <span className="text-gray-500 font-medium ml-1 font-waldenburg">YC W27 Standard Investment Surge ($500k)</span>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="relative pt-2">
        
        {/* Y-Axis Labels & Grid Lines */}
        <div className="relative h-44 w-full flex flex-col justify-between text-[11px] text-gray-400 font-medium">
          
          <div className="flex items-center gap-3">
            <span className="w-12 text-right">₹4.64Cr</span>
            <div className="flex-1 border-b border-gray-100 border-dashed" />
          </div>

          <div className="flex items-center gap-3">
            <span className="w-12 text-right">₹3.50Cr</span>
            <div className="flex-1 border-b border-gray-100 border-dashed" />
          </div>

          <div className="flex items-center gap-3">
            <span className="w-12 text-right">₹2.00Cr</span>
            <div className="flex-1 border-b border-gray-100 border-dashed" />
          </div>

          <div className="flex items-center gap-3">
            <span className="w-12 text-right">0</span>
            <div className="flex-1 border-b border-gray-200" />
          </div>

          {/* Actual Bars Container positioned absolutely over grid */}
          <div className="absolute inset-0 left-16 right-2 bottom-3 flex items-end justify-between px-2 sm:px-4">
            {MONTHLY_CHART_DATA.map((item) => {
              const isJan = item.isCurrent;
              return (
                <div key={item.month} className="flex flex-col items-center gap-2 group cursor-pointer">
                  
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 text-[10px] bg-gray-900 text-white px-2 py-0.5 rounded-md pointer-events-none whitespace-nowrap z-10 font-waldenburg">
                    ₹{(item.value / 10000000).toFixed(2)} Cr
                  </div>

                  {/* The Bar */}
                  <div
                    style={{ height: `${item.heightPercent}%` }}
                    className={`w-5 sm:w-7 rounded-t-lg transition-all duration-300 ${
                      isJan 
                        ? 'bg-amber-400 hover:bg-amber-500 shadow-[0_2px_8px_rgba(245,158,11,0.25)]' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  />
                  
                  {/* Month Label */}
                  <span className={`text-[11px] font-medium font-waldenburg ${isJan ? 'text-gray-950 font-bold' : 'text-gray-400'}`}>
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};
