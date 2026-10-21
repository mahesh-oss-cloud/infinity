import React, { useState, useRef } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  QrCode, 
  Sparkles, 
  Building2, 
  ShieldCheck,
  Infinity as InfinityIcon
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { formatINR } from '../utils/formatters';

export const ReceiveMoneyModal = ({ isOpen, onClose, user }) => {
  const [customAmount, setCustomAmount] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  // Construct valid Indian UPI intent link
  const upiIntentUrl = `upi://pay?pa=${user.primaryUpiId}&pn=${encodeURIComponent(user.name)}${
    customAmount ? `&am=${customAmount}` : ''
  }&cu=INR${customNote ? `&tn=${encodeURIComponent(customNote)}` : ''}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(user.primaryUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(upiIntentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const downloadQrCode = () => {
    const svg = document.getElementById('upi-qr-svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width + 40;
      canvas.height = img.height + 40;
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 20, 20);
      }
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `Infinity-UPI-QR-${user.name.replace(/\s+/g, '-')}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#121624] border border-white/10 shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Receive Money</h3>
              <p className="text-[11px] text-gray-400">Scan via GPay, PhonePe, Paytm, or BHIM</p>
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
          
          {/* Printable QR Card styled like PhonePe / Paytm / Infinity Standee */}
          <div className="relative p-5 rounded-3xl bg-white text-black shadow-xl text-center mb-5">
            
            {/* Standee Branding Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-200">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded bg-black flex items-center justify-center">
                  <InfinityIcon className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="font-extrabold text-sm tracking-tight text-gray-900">
                  INFINITY <span className="text-emerald-600 font-bold">UPI</span>
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                BHIM UPI 2.0
              </span>
            </div>

            <div className="text-xs font-semibold text-gray-800 mb-0.5">{user.name}</div>
            <div className="text-[11px] text-gray-500 font-mono mb-3">{user.primaryUpiId}</div>

            {/* Dynamic QR Code */}
            <div className="flex justify-center p-3 bg-gray-50 rounded-2xl border border-gray-100 mb-3 shadow-inner">
              <QRCodeSVG
                id="upi-qr-svg"
                value={upiIntentUrl}
                size={180}
                level="H"
                includeMargin={true}
              />
            </div>

            {/* If custom amount specified */}
            {customAmount ? (
              <div className="text-sm font-extrabold text-emerald-700 font-mono">
                Requesting: {formatINR(parseFloat(customAmount))}
              </div>
            ) : (
              <div className="text-[11px] text-gray-500 font-medium">
                Scan to pay any custom amount
              </div>
            )}

            {customNote && (
              <div className="text-[10px] text-gray-600 italic mt-0.5">
                "{customNote}"
              </div>
            )}

            {/* Footer Accepted Badges */}
            <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-center gap-2 text-[9px] text-gray-400 font-medium uppercase tracking-wider">
              <span>Google Pay</span> • <span>PhonePe</span> • <span>Paytm</span> • <span>BHIM</span>
            </div>
          </div>

          {/* Optional Amount & Remark Inputs */}
          <div className="space-y-3 mb-5">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Set Specific Amount (Optional)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">
                  ₹
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Leave empty for payer's choice"
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Add Note / Invoice Ref (Optional)
              </label>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Website Consulting Q4"
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Action Buttons: Copy ID, Copy Link, Download QR */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={handleCopyUpi}
              className="py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUpi ? 'Copied' : 'Copy ID'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Share Link'}</span>
            </button>

            <button
              onClick={downloadQrCode}
              className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-md shadow-emerald-500/20"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Download</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
