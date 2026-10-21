import React from 'react';
import { TrendingUp } from 'lucide-react';
import { MONTHLY_CHART_DATA } from '../data/savingsData';

export const BarChartCard = ({ totalDisplay = "$524,324", growthRate = "25.7%" }) => {
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
          <span className="text-gray-500 font-medium ml-1 font-waldenburg">YC W27 Standard Investment Surge</span>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="relative pt-2">
        
        {/* Y-Axis Labels & Grid Lines */}
        <div className="relative h-44 w-full flex flex-col justify-between text-[11px] text-gray-400 font-medium">
          
          <div className="flex items-center gap-3">
            <span className="w-9 text-right">$500K</span>
            <div className="flex-1 border-b border-gray-100 border-dashed" />
          </div>

          <div className="flex items-center gap-3">
            <span className="w-9 text-right">$350K</span>
            <div className="flex-1 border-b border-gray-100 border-dashed" />
          </div>

          <div className="flex items-center gap-3">
            <span className="w-9 text-right">$200K</span>
            <div className="flex-1 border-b border-gray-100 border-dashed" />
          </div>

          <div className="flex items-center gap-3">
            <span className="w-9 text-right">0</span>
            <div className="flex-1 border-b border-gray-200" />
          </div>

          {/* Actual Bars Container positioned absolutely over grid */}
          <div className="absolute inset-0 left-12 right-2 bottom-3 flex items-end justify-between px-2 sm:px-4">
            {MONTHLY_CHART_DATA.map((item) => {
              const isJan = item.isCurrent;
              return (
                <div key={item.month} className="flex flex-col items-center group relative cursor-pointer">
                  
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 px-2 py-0.5 rounded bg-gray-900 text-white text-[10px] whitespace-nowrap pointer-events-none z-10 shadow font-mono">
                    ${(item.value).toLocaleString()}
                  </div>

                  {/* The Bar: solid black/charcoal for active YC month, neutral gray for rest */}
                  <div
                    className={`w-5 sm:w-6.5 rounded-lg transition-all duration-300 ${
                      isJan
                        ? 'bg-gray-950 shadow-xs'
                        : 'bg-[#e5e7eb] group-hover:bg-gray-400'
                    }`}
                    style={{ height: `${item.heightPercent * 1.3}px` }}
                  />

                  {/* X-Axis Month Label */}
                  <span className={`text-[11px] font-medium mt-2.5 transition-colors ${
                    isJan ? 'text-gray-950 font-bold' : 'text-gray-500'
                  }`}>
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
