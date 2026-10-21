import React, { useState, useEffect } from 'react';
import { SavingsNavbar } from './components/SavingsNavbar';
import { MyBalanceCard } from './components/MyBalanceCard';
import { SavingsPlanCard } from './components/SavingsPlanCard';
import { BarChartCard } from './components/BarChartCard';
import { AreaChartCard } from './components/AreaChartCard';
import { RecentActivityCard } from './components/RecentActivityCard';
import { CurrencyCard } from './components/CurrencyCard';
import { YcSwiftModal } from './components/YcSwiftModal';
import { TransferModal } from './components/TransferModal';
import { TransactionDetailsModal } from './components/TransactionDetailsModal';
import { ReceiveModal } from './components/ReceiveModal';
import { SavingsPlanModal } from './components/SavingsPlanModal';
import { AccountDetailsModal } from './components/AccountDetailsModal';
import { CrossBorderComplianceModal } from './components/CrossBorderComplianceModal';
import { IntercompanyTransferModal } from './components/IntercompanyTransferModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileAppInstallModal } from './components/MobileAppInstallModal';
import { 
  INITIAL_ACCOUNT_DATA, 
  SAVINGS_PLANS, 
  INITIAL_TRANSACTIONS 
} from './data/savingsData';
import { playPaymentSuccessChime } from './utils/audio';
import { RotateCcw, Scale, Building2, Landmark, CheckCircle2 } from 'lucide-react';

// Browser storage can be unavailable (private browsing, storage restrictions) or contain
// damaged JSON. Treat storage as optional so it cannot prevent the dashboard from rendering.
const safeStorageGet = (key) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeStorageSet = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    console.warn('Infinity could not persist local app state:', error);
  }
};

const safeStorageRemove = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Storage is optional; the app should remain usable without it.
  }
};

const parseStoredJson = (key) => {
  const saved = safeStorageGet(key);
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
};

// Capacitor runs the bundled interface from the local Android WebView.
const isNativeOfflineApp = typeof window !== 'undefined' && (
  Boolean(window.Capacitor?.isNativePlatform?.())
  || (window.location.hostname === 'localhost' && /Android/i.test(window.navigator.userAgent))
);

export function App() {
  const [activeNavTab, setActiveNavTab] = useState('Treasury & Savings');

  // Account State (Blackbird Finance Inc. - US Delaware Parent)
  const [account, setAccount] = useState(() => {
    // Merge valid saved data with defaults, and ignore malformed/stale browser state.
    const saved = parseStoredJson('blackbird_account_w27_pristine');
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return INITIAL_ACCOUNT_DATA;

    return {
      ...INITIAL_ACCOUNT_DATA,
      ...saved,
      parentEntity: { ...INITIAL_ACCOUNT_DATA.parentEntity, ...(saved.parentEntity || {}) },
      indianSubsidiary: { ...INITIAL_ACCOUNT_DATA.indianSubsidiary, ...(saved.indianSubsidiary || {}) },
      ycDeal: {
        ...INITIAL_ACCOUNT_DATA.ycDeal,
        ...(saved.ycDeal || {}),
        tranche1: { ...INITIAL_ACCOUNT_DATA.ycDeal.tranche1, ...(saved.ycDeal?.tranche1 || {}) },
        tranche2: { ...INITIAL_ACCOUNT_DATA.ycDeal.tranche2, ...(saved.ycDeal?.tranche2 || {}) },
      },
    };
  });

  // Transactions State (Strictly Y Combinator W27!)
  const [transactions, setTransactions] = useState(() => {
    const saved = safeStorageGet('blackbird_transactions_w27_pristine');
    if (!saved) return INITIAL_TRANSACTIONS;

    try {
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return INITIAL_TRANSACTIONS;

      const canonicalIds = new Set(INITIAL_TRANSACTIONS.map((tx) => tx.id));
      const savedAdditionalTransactions = parsed
        .filter((tx) => !canonicalIds.has(tx?.id))
        .map((tx) => {
          if (tx?.direction !== 'debit' || !tx?.recipient) return tx;

          const normalized = { ...tx };
          delete normalized.isDemoTransfer;
          delete normalized.demoReference;

          const timestamp = tx.timestamp ? new Date(tx.timestamp).getTime() : 0;
          return {
            ...normalized,
            id: String(tx.id || `tx-transfer-out-${timestamp || 1}`).replace('tx-demo-out-', 'tx-transfer-out-'),
            type: 'TRANSFER_OUT',
            status: 'Pending',
            isOutgoingTransfer: true,
            transferReference: tx.transferReference || `TRF-${String(timestamp || Date.now()).slice(-8)}`,
          };
        });

      // Always refresh the two canonical incoming funding records, even when this
      // browser already has an older saved activity list.
      return [...INITIAL_TRANSACTIONS, ...savedAdditionalTransactions]
        .sort((a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime());
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  // Savings Plans State (Startup Treasury Reserves)
  const [plans, setPlans] = useState(() => {
    const saved = parseStoredJson('blackbird_plans_w27_pristine');
    return Array.isArray(saved) ? saved : SAVINGS_PLANS;
  });

  // Modals
  const [isYcModalOpen, setIsYcModalOpen] = useState(false);
  const [isTransactionDetailsOpen, setIsTransactionDetailsOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isReceiveOpen, setIsReceiveOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isAccountDetailsOpen, setIsAccountDetailsOpen] = useState(false);
  const [isComplianceOpen, setIsComplianceOpen] = useState(false);
  const [isIntercompanyOpen, setIsIntercompanyOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // Revert any old accidental transactions on mount
  useEffect(() => {
    safeStorageRemove('blackbird_account_w27');
    safeStorageRemove('blackbird_transactions_w27');
    safeStorageRemove('blackbird_plans_w27');
  }, []);

  // Persistence
  useEffect(() => {
    safeStorageSet('blackbird_account_w27_pristine', JSON.stringify(account));
  }, [account]);

  useEffect(() => {
    safeStorageSet('blackbird_transactions_w27_pristine', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    safeStorageSet('blackbird_plans_w27_pristine', JSON.stringify(plans));
  }, [plans]);

  // Handlers
  const handleSelectTransaction = (tx) => {
    setSelectedTx(tx);
    if (tx?.isYCombinator) {
      setIsYcModalOpen(true);
    } else {
      setIsTransactionDetailsOpen(true);
    }
  };

  const handleCompleteTransfer = (newTx, totalDeducted) => {
    setAccount(prev => ({
      ...prev,
      balance: Math.max(0, prev.balance - totalDeducted),
      checkingBalance: Math.max(0, prev.checkingBalance - totalDeducted),
    }));
    const recordedTx = isNativeOfflineApp
      ? {
          ...newTx,
          status: 'Offline record only — not sent to a bank',
          recordSource: 'Created locally on this device',
          memo: [newTx.memo, 'This offline entry did not initiate a real payment.'].filter(Boolean).join(' '),
        }
      : newTx;
    setTransactions(prev => [recordedTx, ...prev]);
    playPaymentSuccessChime();
  };

  const handleCompleteIntercompanyRemittance = (newTx, numUsd) => {
    setAccount(prev => ({
      ...prev,
      balance: Math.max(0, prev.balance - numUsd),
      checkingBalance: Math.max(0, prev.checkingBalance - numUsd),
    }));
    const recordedTx = isNativeOfflineApp
      ? {
          ...newTx,
          status: 'Offline record only — remittance not sent',
          recordSource: 'Created locally on this device',
          firaAvailable: false,
          firaId: undefined,
          note: 'Local planning record only. No bank transfer or regulatory filing was submitted.',
        }
      : newTx;
    setTransactions(prev => [recordedTx, ...prev]);
    playPaymentSuccessChime();
  };

  const handleDepositIntoPlan = (planId, amount) => {
    setAccount(prev => ({
      ...prev,
      balance: Math.max(0, prev.balance - amount),
      checkingBalance: Math.max(0, prev.checkingBalance - amount),
    }));
    setPlans(prev => prev.map(p => {
      if (p.id === planId) {
        return { ...p, allocated: p.allocated + amount };
      }
      return p;
    }));
    playPaymentSuccessChime();
  };


  const handleResetData = () => {
    setAccount(INITIAL_ACCOUNT_DATA);
    setTransactions(INITIAL_TRANSACTIONS);
    setPlans(SAVINGS_PLANS);
    safeStorageRemove('blackbird_account_w27');
    safeStorageRemove('blackbird_transactions_w27');
    safeStorageRemove('blackbird_plans_w27');
    safeStorageRemove('blackbird_account_w27_pristine');
    safeStorageRemove('blackbird_transactions_w27_pristine');
    safeStorageRemove('blackbird_plans_w27_pristine');
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-gray-900 flex flex-col font-waldenburg antialiased pb-24 md:pb-12">
      {isNativeOfflineApp && (
        <div role="status" className="px-4 py-2.5 bg-amber-50 border-b border-amber-200 text-amber-950 text-[11px] leading-relaxed">
          <strong className="font-bold tracking-wide">OFFLINE LOCAL MODE</strong>
          <span className="mx-1.5">·</span>
          Balances and receipts are local records, not bank-verified. Transfers and remittances recorded here do not move money or submit regulatory filings.
        </div>
      )}

      {/* Top Navbar */}
      <SavingsNavbar
        activeTab={activeNavTab}
        setActiveTab={setActiveNavTab}
        onOpenComplianceRoadmap={() => setIsComplianceOpen(true)}
        onOpenInstall={isNativeOfflineApp ? undefined : () => setIsInstallModalOpen(true)}
      />

      {/* Main 3-Column Dashboard Container */}
      <main className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10 flex-1">
        
        {/* Real-world Corporate Structure Banner */}
        <div className="mb-4 sm:mb-6 p-3.5 sm:p-4 rounded-2xl bg-white border border-gray-200/80 shadow-[0_1px_6px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 font-waldenburg">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gray-100 border border-gray-200 text-gray-800 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-lg font-normal text-gray-950 font-instrument">
                  {account.parentEntity.legalName}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-800 font-semibold font-waldenburg border border-gray-200">
                  {account.parentEntity.jurisdiction}
                </span>
                <span className="text-gray-400 text-xs">➔</span>
                <span className="text-xs text-gray-600 font-medium font-waldenburg">
                  {account.indianSubsidiary.legalName} (Operating Co.)
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5 font-waldenburg">
                Venture Bank: <strong>{account.bankingPartner}</strong> • $500,000 YC W27 Investment Record • Treasury Yield: <strong className="font-instrument text-xs text-gray-900">{account.treasuryApy}</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsComplianceOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200 text-xs font-semibold transition-all cursor-pointer font-waldenburg"
            >
              <Scale className="w-3.5 h-3.5 text-gray-700" />
              <span>CA & Legal Structuring</span>
            </button>

            <button
              onClick={() => {
                const ycTx = transactions.find(t => t.isYCombinator) || transactions[0];
                setSelectedTx(ycTx);
                setIsYcModalOpen(true);
              }}
              className="flex items-center gap-1.5 text-gray-900 hover:text-black font-semibold text-xs cursor-pointer px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 font-waldenburg bg-amber-50/50"
            >
              <span className="w-2 h-2 rounded-full bg-[#ff6600]" />
              <span>YC W27 SAFE (<span className="font-instrument font-normal text-xs">$500k</span>)</span>
            </button>

            <button
              onClick={handleResetData}
              className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:text-gray-900 cursor-pointer rounded-full border border-gray-200 hover:bg-gray-100 text-xs font-semibold transition-all font-waldenburg"
              title="Revert accidental transactions and restore original $500k YC balance"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
              <span>Revert to $500k</span>
            </button>
          </div>
        </div>

        {/* 3-Column Grid matching reference screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          
          {/* LEFT COLUMN: My Balance & Savings Plan (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <MyBalanceCard
              account={account}
              onOpenTransfer={() => setIsTransferOpen(true)}
              onOpenReceive={() => setIsReceiveOpen(true)}
              onOpenAccountDetails={() => setIsAccountDetailsOpen(true)}
              onOpenRemitToIndia={() => setIsIntercompanyOpen(true)}
            />

            <SavingsPlanCard
              plans={plans}
              onSelectPlan={(p) => {
                setSelectedPlan(p);
              }}
              onSeeMore={() => setIsAccountDetailsOpen(true)}
            />
          </div>

          {/* MIDDLE COLUMN: Bar Chart & Golden Area Spline Chart (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <BarChartCard
              totalDisplay={`$${Math.round(account.balance).toLocaleString('en-US')}`}
              growthRate={account.monthlyIncreaseRate}
            />

            <AreaChartCard
              totalDisplay={`$${Math.round(account.balance).toLocaleString('en-US')}`}
              growthRate={account.monthlyIncreaseRate}
            />
          </div>

          {/* RIGHT COLUMN: Recent Activity & Currency Converter (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <RecentActivityCard
              transactions={transactions}
              onSelectTransaction={handleSelectTransaction}
              onSeeMore={() => setIsAccountDetailsOpen(true)}
            />

            <CurrencyCard />
          </div>

        </div>

      </main>

      {/* MODALS */}

      {/* 1. Y Combinator W27 Fedwire Funds Transfer Modal */}
      <YcSwiftModal
        isOpen={isYcModalOpen}
        onClose={() => setIsYcModalOpen(false)}
        transaction={selectedTx}
      />

      <TransactionDetailsModal
        isOpen={isTransactionDetailsOpen}
        onClose={() => setIsTransactionDetailsOpen(false)}
        transaction={selectedTx}
      />

      {/* 2. Transfer / Send Wire Modal */}
      <TransferModal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
        account={account}
        onCompleteTransfer={handleCompleteTransfer}
      />

      {/* 3. Receive / Wire Instructions Modal */}
      <ReceiveModal
        isOpen={isReceiveOpen}
        onClose={() => setIsReceiveOpen(false)}
        account={account}
      />

      {/* 4. Savings Plan Deposit Modal */}
      <SavingsPlanModal
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        plan={selectedPlan}
        onDepositIntoPlan={handleDepositIntoPlan}
        balance={account.checkingBalance}
      />

      {/* 5. Account Details Modal */}
      <AccountDetailsModal
        isOpen={isAccountDetailsOpen}
        onClose={() => setIsAccountDetailsOpen(false)}
        account={account}
      />

      {/* 6. US-India Cross-Border Compliance Roadmap Modal */}
      <CrossBorderComplianceModal
        isOpen={isComplianceOpen}
        onClose={() => setIsComplianceOpen(false)}
        account={account}
        onOpenRemitToIndia={() => setIsIntercompanyOpen(true)}
      />

      {/* 7. Intercompany Remittance to Indian Subsidiary Modal */}
      <IntercompanyTransferModal
        isOpen={isIntercompanyOpen}
        onClose={() => setIsIntercompanyOpen(false)}
        account={account}
        onCompleteIntercompanyRemittance={handleCompleteIntercompanyRemittance}
      />

      {/* 8. Downloadable Mobile App (PWA) Install Modal */}
      <MobileAppInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* Mobile Fixed Bottom Navigation Dock */}
      <MobileBottomNav
        activeTab={activeNavTab}
        setActiveTab={setActiveNavTab}
        onOpenCard={() => setIsAccountDetailsOpen(true)}
        onOpenTransfer={() => setIsTransferOpen(true)}
        onOpenYcWire={() => {
          const ycTx = transactions.find(t => t.isYCombinator) || transactions[0];
          setSelectedTx(ycTx);
          setIsYcModalOpen(true);
        }}
        onOpenInstall={isNativeOfflineApp ? undefined : () => setIsInstallModalOpen(true)}
      />

    </div>
  );
}

export default App;
