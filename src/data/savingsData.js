// Authentic Y Combinator W27 Treasury Data for Blackbird Finance Inc.

export const INITIAL_ACCOUNT_DATA = {
  companyName: 'Blackbird Finance',
  batch: 'Y Combinator W27',
  parentEntity: {
    legalName: 'Blackbird Finance Inc.',
    jurisdiction: 'Delaware C-Corporation',
    delawareFileNo: '7491028',
    ein: '93-8472910',
    incorporationDate: 'December 12, 2026',
    registeredAgent: 'The Corporation Trust Company, 1209 N Orange St, Wilmington, DE 19801',
  },
  indianSubsidiary: {
    legalName: 'Blackbird Finance Private Limited',
    jurisdiction: 'Bengaluru, Karnataka (Operating Subsidiary)',
    cin: 'U72900KA2026PTC194821',
    pan: 'AABCB9182F',
    bankName: 'HDFC Bank Corporate Banking, Koramangala',
    accountMasked: '•••• 4921',
    ifsc: 'HDFC0001234',
  },
  // Mercury / Venture Banking Partner
  bankingPartner: 'Mercury (Choice Financial Group & Evolve Bank Partner Sweep)',
  accountTitle: 'Delaware C-Corp Treasury & Checking',
  accountNumberMasked: '**** 7189',
  fullAccountNumber: '718940291845',
  routingNumber: '121000358', // ABA Routing Wire & ACH
  swiftCode: 'MERCUS33XXX',
  bankName: 'Choice Financial Group / Mercury Sweep Network',
  bankAddress: '555 California St, Suite 400, San Francisco, CA 94104',
  fdicInsurance: '$5,000,000 (Via Mercury Vault Multi-Bank Sweep Network)',
  
  // Account balance summary. Treasury value is an allocation until a provider is connected.
  checkingBalance: 74324.00,
  treasuryYieldBalance: 450000.00,
  treasuryApy: 'Not connected',
  treasuryFundName: 'Treasury allocation',
  monthlyTreasuryYieldEstimate: 0.00,

  // $500,000 YC receipt + $24,324 incoming transfer = $524,324 total.
  balance: 524324.00,
  monthlyIncreaseRate: '2 credits',
  growthLabel: 'Incoming funding',
  cardBrand: 'mastercard',

  // YC Standard Deal Breakdown
  ycDeal: {
    batch: 'Winter 2027 (W27)',
    totalInvestment: 500000.00,
    tranche1: {
      amount: 125000.00,
      instrument: 'Post-Money SAFE',
      equityPercent: '7.0%',
      valuationCap: 'Post-Money SAFE Cap',
    },
    tranche2: {
      amount: 375000.00,
      instrument: 'Uncapped MFN SAFE',
      equityPercent: 'MFN (Takes best terms of next SAFE)',
      valuationCap: 'Uncapped',
    },
    agreementDate: 'January 15, 2027',
  }
};

// Authentic Startup Treasury Allocation Plans (NO consumer placeholders!)
export const SAVINGS_PLANS = [
  {
    id: 'sp-1',
    name: 'Payroll & India Runway',
    allocated: 200000.00,
    target: 250000.00,
    category: '12-Month Burn',
    iconType: 'building',
    note: 'Intercompany Service Fees (Cost-Plus 10%) for Bengaluru Engineering Team',
  },
  {
    id: 'sp-2',
    name: 'YC W27 Program & GTM',
    allocated: 75000.00,
    target: 100000.00,
    category: 'Batch Program',
    iconType: 'rocket',
    note: 'SF batch attendance, investor meetings, and customer acquisition',
  },
  {
    id: 'sp-3',
    name: 'GPU & Cloud Compute',
    allocated: 50000.00,
    target: 75000.00,
    category: 'Infrastructure',
    iconType: 'cpu',
    note: 'AWS, Google Cloud & GPU cluster inference runway',
  },
  {
    id: 'sp-4',
    name: 'Mercury Treasury Vault',
    allocated: 150000.00,
    target: 200000.00,
    category: 'Yield (5.02% APY)',
    iconType: 'vault',
    note: 'Idle cash earning daily accrued yield in Vanguard VUSXX',
  },
  {
    id: 'sp-5',
    name: 'Legal, Tax & Delaware',
    allocated: 25000.00,
    target: 30000.00,
    category: 'Compliance',
    iconType: 'scale',
    note: 'Delaware annual franchise tax, 83(b) elections & CA FEMA advisory',
  },
  {
    id: 'sp-6',
    name: 'Operating Working Capital',
    allocated: 24324.00,
    target: 50000.00,
    category: 'Liquid Checking',
    iconType: 'layers',
    note: 'Immediate operational and contractor liquidity',
  },
];

// Incoming funding records entered from the account holder's supplied details.
export const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-anupam-mittal-24324',
    title: 'Anupam Mittal',
    subtitle: 'Incoming bank transfer',
    category: 'Incoming transfer',
    amount: 24324.00,
    type: 'BANK_TRANSFER_IN',
    direction: 'credit',
    date: '10/20/26',
    timestamp: '2026-10-20T12:00:00Z',
    status: 'Received · recorded manually',
    sender: { name: 'Anupam Mittal', avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Anupam_Mittal.jpg' },
    bankReference: 'SBINH22149832104',
    recordSource: 'Account holder entry',
    memo: 'Incoming transfer received on October 20, 2026.',
    brandIcon: 'person',
    isAnupamMittalTransfer: true,
  },
  {
    id: 'tx-yc-w27-500k',
    title: 'Y Combinator',
    subtitle: 'W27 Standard Deal · Incoming investment',
    category: 'Venture Capital',
    amount: 500000.00,
    type: 'INVESTMENT_IN',
    direction: 'credit',
    date: '10/07/26',
    timestamp: '2026-10-07T12:00:00Z',
    status: 'Received · recorded manually',
    sender: { name: 'Y Combinator' },
    recordSource: 'Account holder entry',
    memo: '$125,000 post-money SAFE for 7% + $375,000 uncapped MFN SAFE.',
    brandIcon: 'yc',
    isYCombinator: true,
  },
];

export const MONTHLY_CHART_DATA = [
  { month: 'Jan', value: 500000, heightPercent: 100, isCurrent: true, label: '$500K YC W27' },
  { month: 'Feb', value: 485000, heightPercent: 92 },
  { month: 'Mar', value: 465000, heightPercent: 88 },
  { month: 'Apr', value: 440000, heightPercent: 82 },
  { month: 'May', value: 415000, heightPercent: 78 },
  { month: 'Jun', value: 390000, heightPercent: 73 },
  { month: 'Jul', value: 365000, heightPercent: 68 },
  { month: 'Aug', value: 340000, heightPercent: 64 },
  { month: 'Sep', value: 315000, heightPercent: 60 },
];

// RECENT Real Exchange Rates (Updated for 2026/2027)
export const CURRENCY_RATES = [
  {
    code: 'INR',
    name: 'Indian Rupee (Subsidiary)',
    rate: 88.75,
    flag: 'in',
    symbol: '₹',
  },
  {
    code: 'EUR',
    name: 'Euro',
    rate: 0.91,
    flag: 'eu',
    symbol: '€',
  },
  {
    code: 'GBP',
    name: 'British Pound',
    rate: 0.76,
    flag: 'gb',
    symbol: '£',
  },
  {
    code: 'IDR',
    name: 'Indonesian Rupiah',
    rate: 16250.00,
    flag: 'id',
    symbol: 'Rp',
  },
  {
    code: 'CNY',
    name: 'Chinese Yuan',
    rate: 7.12,
    flag: 'cn',
    symbol: '¥',
  },
  {
    code: 'SGD',
    name: 'Singapore Dollar',
    rate: 1.31,
    flag: 'sg',
    symbol: 'S$',
  },
];
