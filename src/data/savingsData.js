// Authentic Y Combinator W27 Treasury Data for Blackbird Finance Inc.
// Converted to INR at current market conversion rate (1 USD = ₹92.90)

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
  
  // Account balance summary in INR (Converted from $500,000 YC W27 SAFE @ ₹92.90 / USD)
  checkingBalance: 46450000.00, // ₹4,64,50,000 (Full 500k USD in INR)
  treasuryYieldBalance: 0.00,
  treasuryApy: '4.75% APY',
  treasuryFundName: 'Liquid Treasury Reserve',
  monthlyTreasuryYieldEstimate: 183864.00,

  // ₹4,64,50,000 (exact equivalent of $500,000 USD at market rate ₹92.90)
  balance: 46450000.00,
  monthlyIncreaseRate: '1 credit',
  growthLabel: 'YC W27 Investment',
  cardBrand: 'mastercard',

  // YC Standard Deal Breakdown
  ycDeal: {
    batch: 'Winter 2027 (W27)',
    totalInvestmentUsd: 500000.00,
    totalInvestmentInr: 46450000.00,
    totalInvestment: 46450000.00,
    conversionRate: 92.90,
    tranche1: {
      amountUsd: 125000.00,
      amountInr: 11612500.00,
      amount: 11612500.00,
      instrument: 'Post-Money SAFE',
      equityPercent: '7.0%',
      valuationCap: 'Post-Money SAFE Cap',
    },
    tranche2: {
      amountUsd: 375000.00,
      amountInr: 34837500.00,
      amount: 34837500.00,
      instrument: 'Uncapped MFN SAFE',
      equityPercent: 'MFN (Takes best terms of next SAFE)',
      valuationCap: 'Uncapped',
    },
    agreementDate: 'January 15, 2027',
  }
};

// Authentic Startup Treasury Allocation Plans in INR
export const SAVINGS_PLANS = [
  {
    id: 'sp-1',
    name: 'Payroll & India Runway',
    allocated: 18580000.00, // ₹1,85,80,000 ($200,000 USD equivalent)
    target: 23225000.00,
    category: '12-Month Burn',
    iconType: 'building',
    note: 'Intercompany Service Fees for Bengaluru Engineering Team',
  },
  {
    id: 'sp-2',
    name: 'YC W27 Program & GTM',
    allocated: 6967500.00, // ₹69,67,500 ($75,000 USD equivalent)
    target: 9290000.00,
    category: 'Batch Program',
    iconType: 'rocket',
    note: 'SF batch attendance, investor meetings, and customer acquisition',
  },
  {
    id: 'sp-3',
    name: 'GPU & Cloud Compute',
    allocated: 4645000.00, // ₹46,45,000 ($50,000 USD equivalent)
    target: 6967500.00,
    category: 'Infrastructure',
    iconType: 'cpu',
    note: 'AWS, Google Cloud & GPU cluster inference runway',
  },
  {
    id: 'sp-4',
    name: 'Treasury High-Yield Reserve',
    allocated: 13935000.00, // ₹1,39,35,000 ($150,000 USD equivalent)
    target: 18580000.00,
    category: 'Yield (5.02% APY)',
    iconType: 'vault',
    note: 'Accrued overnight treasury liquidity reserve',
  },
  {
    id: 'sp-5',
    name: 'Legal, Tax & Corporate',
    allocated: 2322500.00, // ₹23,22,500 ($25,000 USD equivalent)
    target: 2787000.00,
    category: 'Compliance',
    iconType: 'scale',
    note: 'Delaware franchise tax, 83(b) elections & RBI/FEMA filing',
  },
];

// Single official incoming funding record: Y Combinator W27 SAFE ($500,000 -> ₹4,64,50,000)
export const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-yc-w27-500k',
    title: 'Y Combinator',
    subtitle: 'W27 Standard Deal · Fedwire received ($500,000 converted to INR)',
    category: 'Venture Capital',
    amount: 46450000.00,
    amountUsd: 500000.00,
    conversionRate: 92.90,
    type: 'FEDWIRE_INWARD',
    direction: 'credit',
    date: '10/07/26',
    timestamp: '2026-10-07T12:00:00Z',
    status: 'Transfer received',
    sender: {
      name: 'Y COMBINATOR LLC',
      address: '335 Pioneer Way, Mountain View, CA 94041, USA',
      bank: 'Silicon Valley Bank, a division of First Citizens Bank',
      swiftCode: 'SVBKUS6S',
      routingNumber: '121140399',
    },
    beneficiary: {
      name: 'Blackbird Finance Inc. / Subsidiary Account',
      account: '718940291845',
      bank: 'Choice Financial Group (Mercury)',
      swiftCode: 'MERCUS33XXX',
      routingNumber: '121000358',
    },
    transferMethod: 'Fedwire funds transfer (Converted to INR)',
    swiftReference: 'YC-W27-FEDWIRE-500K-89210',
    imad: '20270115B1Q8472900192',
    omad: '20270115B1Q8472900192',
    busFunctionCode: 'BTR',
    recordSource: 'Official YC W27 SAFE Agreement',
    memo: '$500,000 USD converted at market rate ₹92.90 = ₹4,64,50,000.',
    brandIcon: 'yc',
    isYCombinator: true,
  },
];

export const MONTHLY_CHART_DATA = [
  { month: 'Jan', value: 46450000, heightPercent: 100, isCurrent: true, label: '₹4.64 Cr YC W27' },
  { month: 'Feb', value: 45055000, heightPercent: 92 },
  { month: 'Mar', value: 43200000, heightPercent: 88 },
  { month: 'Apr', value: 40876000, heightPercent: 82 },
  { month: 'May', value: 38550000, heightPercent: 78 },
  { month: 'Jun', value: 36230000, heightPercent: 73 },
  { month: 'Jul', value: 33900000, heightPercent: 68 },
  { month: 'Aug', value: 31580000, heightPercent: 64 },
  { month: 'Sep', value: 29260000, heightPercent: 60 },
];

// Market Exchange Rates
export const CURRENCY_RATES = [
  {
    code: 'INR',
    name: 'Indian Rupee (Base Currency)',
    rate: 1.0,
    flag: 'in',
    symbol: '₹',
  },
  {
    code: 'USD',
    name: 'US Dollar',
    rate: 0.01076,
    flag: 'us',
    symbol: '$',
  },
  {
    code: 'EUR',
    name: 'Euro',
    rate: 0.01016,
    flag: 'eu',
    symbol: '€',
  },
  {
    code: 'GBP',
    name: 'British Pound',
    rate: 0.00845,
    flag: 'gb',
    symbol: '£',
  },
  {
    code: 'SGD',
    name: 'Singapore Dollar',
    rate: 0.0145,
    flag: 'sg',
    symbol: 'S$',
  },
];
