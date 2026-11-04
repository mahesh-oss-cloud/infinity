import React, { useState } from 'react';
import { ShieldCheck, Coins, ArrowUpRight, ArrowDownLeft, FileText, CheckCircle, ExternalLink } from 'lucide-react';
import { TOKEN_CONFIG, calculateBackingStatus, executeReserveMint, executeTokenRedemption } from '../services/tokenizationEngine';

export function TokenizedAssetManager({ account, onTokenActionComplete }) {
  const [activeTab, setActiveTab] = useState('overview'); // overview, mint, redeem
  const [mintAmount, setMintAmount] = useState('');
  const [recipientWallet, setRecipientWallet] = useState('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
  const [redeemAmount, setRedeemAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const reserveBalance = account?.balance || 524324;
  const tokenSupply = 450000; // Audited tokenized tranche allocation
  const backing = calculateBackingStatus(reserveBalance, tokenSupply);

  const handleMint = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setFeedback(null);
    try {
      const res = await executeReserveMint({
        amountUsd: Number(mintAmount),
        recipientAddress: recipientWallet,
        wireConfirmationId: `FEDWIRE-ATT-${Date.now().toString().slice(-6)}`,
      });
      setFeedback({
        type: 'success',
        title: 'Tokenization Mint Completed',
        details: `Successfully minted ${Number(mintAmount).toLocaleString()} ${TOKEN_CONFIG.symbol} to ${recipientWallet.slice(0, 8)}...`,
        txHash: res.txHash,
      });
      setMintAmount('');
      if (onTokenActionComplete) onTokenActionComplete();
    } catch (err) {
      setFeedback({ type: 'error', title: 'Minting Failed', details: err.message });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRedeem = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setFeedback(null);
    try {
      const res = await executeTokenRedemption({
        tokenAmountBbusd: Number(redeemAmount),
        bankAccountMasked: account?.indianSubsidiary?.accountMasked || '**** 4921',
        ifscRouting: account?.indianSubsidiary?.ifsc || 'HDFC0001234',
      });
      setFeedback({
        type: 'success',
        title: 'Redemption & Burn Processed',
        details: `Burned ${Number(redeemAmount).toLocaleString()} ${TOKEN_CONFIG.symbol}. Outgoing Wire queued to clearing partner.`,
        txHash: res.burnTxHash,
      });
      setRedeemAmount('');
      if (onTokenActionComplete) onTokenActionComplete();
    } catch (err) {
      setFeedback({ type: 'error', title: 'Redemption Failed', details: err.message });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-[0_1px_6px_rgba(0,0,0,0.02)] p-5 font-waldenburg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            <Coins className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-gray-950 font-instrument">
                {TOKEN_CONFIG.name} ({TOKEN_CONFIG.symbol})
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                {backing.status}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Network: {TOKEN_CONFIG.network} • 1:1 Treasury Vault Backed
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex rounded-lg bg-gray-100 p-0.5 text-xs font-medium">
          <button
            onClick={() => { setActiveTab('overview'); setFeedback(null); }}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'overview' ? 'bg-white shadow-sm text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Ledger & Backing
          </button>
          <button
            onClick={() => { setActiveTab('mint'); setFeedback(null); }}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'mint' ? 'bg-white shadow-sm text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Tokenize Mint
          </button>
          <button
            onClick={() => { setActiveTab('redeem'); setFeedback(null); }}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'redeem' ? 'bg-white shadow-sm text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Redeem Fiat
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-[11px] text-gray-500 uppercase font-medium">Verified Reserve</p>
          <p className="text-sm font-semibold text-gray-900 mt-1 font-instrument">
            ${backing.reserveUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-[11px] text-gray-500 uppercase font-medium">Tokenized Supply</p>
          <p className="text-sm font-semibold text-gray-900 mt-1 font-instrument">
            {backing.supplyBbusd.toLocaleString('en-US')} {TOKEN_CONFIG.symbol}
          </p>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-[11px] text-gray-500 uppercase font-medium">Collateral Ratio</p>
          <p className="text-sm font-semibold text-emerald-600 mt-1 font-instrument">
            {backing.backingRatio}
          </p>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-[11px] text-gray-500 uppercase font-medium">Oracle Attestation</p>
          <p className="text-xs font-semibold text-gray-800 mt-1.5">
            {backing.lastAttestationDate} (Daily)
          </p>
        </div>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div className={`mb-4 p-3 rounded-xl border text-xs ${
          feedback.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
            : 'bg-red-50 border-red-200 text-red-900'
        }`}>
          <div className="font-semibold flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            {feedback.title}
          </div>
          <div className="mt-1">{feedback.details}</div>
          {feedback.txHash && (
            <div className="mt-1 font-mono text-[10px] break-all opacity-80">
              Tx: {feedback.txHash}
            </div>
          )}
        </div>
      )}

      {/* TAB: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/40 space-y-2">
            <div className="flex items-center gap-2 font-medium text-indigo-950">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              Institutional Asset Tokenization Specification
            </div>
            <p className="text-gray-600 leading-relaxed text-[11px]">
              Every issued unit of <strong>{TOKEN_CONFIG.symbol}</strong> is legally secured by USD fiat and short-term US Treasury Bills held in escrow under <strong>{TOKEN_CONFIG.custodianBank}</strong>. Transfers require registered KYC authorization on Polygon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600 text-[11px]">
            <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
              <span className="text-gray-400">Smart Contract:</span>{' '}
              <span className="font-mono text-gray-900 font-medium">{TOKEN_CONFIG.contractAddress.slice(0, 10)}...{TOKEN_CONFIG.contractAddress.slice(-8)}</span>
            </div>
            <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
              <span className="text-gray-400">Jurisdiction:</span>{' '}
              <span className="text-gray-900 font-medium">{TOKEN_CONFIG.custodianEscrowJurisdiction}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB: Mint */}
      {activeTab === 'mint' && (
        <form onSubmit={handleMint} className="space-y-3 text-xs">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Amount to Tokenize (USD)
            </label>
            <input
              type="number"
              required
              min="100"
              max={reserveBalance}
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
              placeholder="e.g. 50000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-instrument"
            />
            <p className="text-[10px] text-gray-400 mt-1">
              Available un-tokenized treasury reserve: ${(reserveBalance - tokenSupply > 0 ? reserveBalance - tokenSupply : 0).toLocaleString()} USD
            </p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Destination Custodial / Ledger Address
            </label>
            <input
              type="text"
              required
              value={recipientWallet}
              onChange={(e) => setRecipientWallet(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-[11px]"
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <ArrowUpRight className="w-4 h-4" />
            {isProcessing ? 'Verifying Reserve & Minting...' : `Mint ${TOKEN_CONFIG.symbol} Notes`}
          </button>
        </form>
      )}

      {/* TAB: Redeem */}
      {activeTab === 'redeem' && (
        <form onSubmit={handleRedeem} className="space-y-3 text-xs">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Amount to Redeem ({TOKEN_CONFIG.symbol})
            </label>
            <input
              type="number"
              required
              min="100"
              value={redeemAmount}
              onChange={(e) => setRedeemAmount(e.target.value)}
              placeholder="e.g. 25000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-instrument"
            />
          </div>

          <div className="p-2.5 bg-amber-50/60 border border-amber-200/80 rounded-lg text-[11px] text-amber-900">
            Redemption burns the on-chain notes and routes the underlying fiat through RTGS / Fedwire to <strong>{account?.indianSubsidiary?.legalName || 'Subsidiary Bank'}</strong>.
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-2.5 bg-gray-900 hover:bg-black text-white rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <ArrowDownLeft className="w-4 h-4" />
            {isProcessing ? 'Initiating Settlement...' : 'Redeem to Bank Wire'}
          </button>
        </form>
      )}
    </div>
  );
}
