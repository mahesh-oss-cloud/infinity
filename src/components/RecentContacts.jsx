import React from 'react';
import { ArrowUpRight, Plus, UserPlus } from 'lucide-react';

export const RecentContacts = ({ contacts, onSelectContact, onNewContact }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
          Frequent UPI Contacts
        </h2>
        <span className="text-xs text-gray-400">1-Tap Quick Pay</span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        
        {/* Add new payee button */}
        <button
          onClick={onNewContact}
          className="flex-shrink-0 flex flex-col items-center justify-center w-20 p-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-dashed border-white/20 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-1.5 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 text-gray-400 transition-colors">
            <UserPlus className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium text-gray-300 text-center">New Payee</span>
        </button>

        {/* Contacts carousel */}
        {contacts.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelectContact(c)}
            className="flex-shrink-0 flex flex-col items-center w-22 p-2 rounded-2xl bg-[#131622]/60 hover:bg-[#1a1f30] border border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer group active:scale-95"
          >
            <div className="relative mb-1.5">
              <img
                src={c.avatar}
                alt={c.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/10 group-hover:border-emerald-400 transition-colors"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow">
                <ArrowUpRight className="w-2.5 h-2.5 stroke-[3]" />
              </div>
            </div>

            <span className="text-[11px] font-semibold text-gray-200 group-hover:text-white truncate w-full text-center">
              {c.name.split(' ')[0]}
            </span>
            <span className="text-[10px] text-gray-500 truncate w-full text-center">
              {c.category}
            </span>
          </button>
        ))}

      </div>
    </div>
  );
};
