import React from 'react';
import { 
  Info, 
  ArrowRight, 
  Building2, 
  Rocket, 
  Cpu, 
  Landmark, 
  Scale, 
  Layers 
} from 'lucide-react';

export const SavingsPlanCard = ({ plans, onSelectPlan, onSeeMore }) => {
  const getIcon = (iconType) => {
    switch (iconType) {
      case 'building':
        return <Building2 className="w-4 h-4 text-gray-800" />;
      case 'rocket':
        return <Rocket className="w-4 h-4 text-gray-800" />;
      case 'cpu':
        return <Cpu className="w-4 h-4 text-gray-800" />;
      case 'vault':
        return <Landmark className="w-4 h-4 text-gray-800" />;
      case 'scale':
        return <Scale className="w-4 h-4 text-gray-800" />;
      case 'layers':
        return <Layers className="w-4 h-4 text-gray-800" />;
      default:
        return <Building2 className="w-4 h-4 text-gray-800" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)] mt-5">
      
      {/* Header with Instrument Serif title */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-normal text-gray-950 tracking-tight font-instrument">
            Treasury Allocations
          </h3>
          <button 
            title="Capital Allocation Reserve Vaults"
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={onSeeMore}
          className="text-xs font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>See more</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* 2-Column Grid (No purple gradients, clean monochrome styling) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
        {plans.map((p) => {
          return (
            <div
              key={p.id}
              onClick={() => onSelectPlan && onSelectPlan(p)}
              className="p-3.5 sm:p-4 rounded-2xl bg-white border border-gray-200/70 hover:border-gray-400 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
            >
              {/* Icon badge: clean neutral gray/zinc */}
              <div className="w-8.5 h-8.5 rounded-xl bg-gray-100 border border-gray-200/80 flex items-center justify-center mb-3 group-hover:bg-gray-200 transition-colors">
                {getIcon(p.iconType)}
              </div>

              {/* Title & Amount */}
              <div>
                <h4 className="text-base font-normal text-gray-900 tracking-tight truncate group-hover:text-black transition-colors font-instrument">
                  {p.name}
                </h4>
                <p className="text-base font-normal text-gray-900 mt-0.5 font-instrument">
                  ${p.allocated.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <span className="text-[10px] text-gray-400 font-waldenburg block">
                  {p.yieldRate || 'Yield Account'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
