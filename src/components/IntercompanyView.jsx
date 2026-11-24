import React, { useState } from 'react';
import { 
  Building2, 
  Scale, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Download,
  AlertCircle
} from 'lucide-react';

export const IntercompanyView = ({ account, onOpenRemitToIndia }) => {
  return (
    <div className="space-y-6 font-waldenburg animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-normal text-gray-950 font-instrument">US-India Intercompany Structuring</h2>
          <p className="text-xs text-gray-500 mt-1">
            Compliant cross-border transfer pricing, IRS Form 5472, RBI Master Directions, and Form 15CA/15CB filings
          </p>
        </div>

        <button
          onClick={onOpenRemitToIndia}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-950 hover:bg-black text-white text-xs font-semibold shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <span>Intercompany Wire Remittance</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Structure Visual Flow */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs space-y-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
          Entity Relationship &amp; Transfer Pricing Model
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          
          {/* Delaware Entity */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span className="text-xs font-bold text-gray-900 uppercase">US Holding Entity (100% Parent)</span>
            </div>
            <h4 className="text-lg font-normal text-gray-950 font-instrument">
              {account.parentEntity?.legalName || 'Blackbird Finance Inc.'}
            </h4>
            <div className="text-xs text-gray-600 space-y-1">
              <div>Jurisdiction: <strong>Delaware C-Corp</strong></div>
              <div>EIN: <strong>{account.parentEntity?.ein || '93-8472910'}</strong></div>
              <div>File No: <strong>{account.parentEntity?.delawareFileNo || '7491028'}</strong></div>
            </div>
            <div className="pt-2 border-t border-gray-200 text-[11px] text-gray-500">
              Owns all global IP, receives investor SAFE capital ($500k YC W27).
            </div>
          </div>

          {/* Connection / Agreement */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-center space-y-2">
            <Scale className="w-6 h-6 text-amber-700 mx-auto" />
            <h5 className="text-xs font-bold text-amber-900">
              Cost-Plus 10% Intercompany MSA
            </h5>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Delaware Inc. contracts Bengaluru Pvt Ltd for R&amp;D engineering services under Indian Transfer Pricing Safe Harbour Rules.
            </p>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-white text-[10px] font-semibold text-amber-900 border border-amber-200">
              Arm's Length Compliant
            </span>
          </div>

          {/* Indian Subsidiary */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span className="text-xs font-bold text-gray-900 uppercase">Indian Operating Entity</span>
            </div>
            <h4 className="text-lg font-normal text-gray-950 font-instrument">
              {account.indianSubsidiary?.legalName || 'Blackbird Finance Private Limited'}
            </h4>
            <div className="text-xs text-gray-600 space-y-1">
              <div>Jurisdiction: <strong>Bengaluru, Karnataka</strong></div>
              <div>CIN: <strong>{account.indianSubsidiary?.cin || 'U72900KA2026PTC194821'}</strong></div>
              <div>PAN: <strong>{account.indianSubsidiary?.pan || 'AABCB9182F'}</strong></div>
            </div>
            <div className="pt-2 border-t border-gray-200 text-[11px] text-gray-500">
              Employs engineering &amp; product team; runs domestic UPI &amp; INR expenses.
            </div>
          </div>

        </div>
      </div>

      {/* Compliance Trackers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Tracker 1: Statutory Filings */}
        <div className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs space-y-3">
          <h4 className="text-base font-normal text-gray-950 font-instrument">Statutory Compliance Status</h4>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
              <div>
                <span className="font-semibold text-gray-900 block">Form 15CA &amp; Form 15CB</span>
                <span className="text-[11px] text-gray-500">Chartered Accountant Tax Certification for Outward Remittance</span>
              </div>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Filed
              </span>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
              <div>
                <span className="font-semibold text-gray-900 block">IRS Form 5472 / 1120</span>
                <span className="text-[11px] text-gray-500">25% Foreign-Owned US Corporation Disclosure</span>
              </div>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Compliant
              </span>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
              <div>
                <span className="font-semibold text-gray-900 block">Foreign Inward Remittance Certificate (FIRC)</span>
                <span className="text-[11px] text-gray-500">HDFC Bank EDPMS reporting to Reserve Bank of India</span>
              </div>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            </div>
          </div>
        </div>

        {/* Tracker 2: Monthly Service Invoicing */}
        <div className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs space-y-3">
          <h4 className="text-base font-normal text-gray-950 font-instrument">Monthly Cost-Plus Invoicing</h4>
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2.5 text-xs">
            <div className="flex justify-between items-center text-gray-600">
              <span>Operating Payroll Burn:</span>
              <span className="font-semibold text-gray-900">₹18,50,000 / month</span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span>Safe Harbour Markup (+10%):</span>
              <span className="font-semibold text-gray-900">₹1,85,000</span>
            </div>
            <div className="flex justify-between items-center text-gray-600 pt-1.5 border-t border-gray-200">
              <span>Intercompany Invoice Total:</span>
              <span className="font-instrument text-base font-normal text-gray-950">₹20,35,000 (~$21,900 USD)</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-gray-500">Next Scheduled Wire:</span>
            <span className="font-semibold text-gray-800">December 1, 2026</span>
          </div>
        </div>

      </div>

    </div>
  );
};
