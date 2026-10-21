// Indian Number Format and Currency Formatters

export const formatINR = (amount, showDecimals = true) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0.00';
  
  const num = Number(amount);
  const isNegative = num < 0;
  const absNum = Math.abs(num);

  const formatted = absNum.toLocaleString('en-IN', {
    maximumFractionDigits: showDecimals ? 2 : 0,
    minimumFractionDigits: showDecimals ? 2 : 0,
  });

  return `${isNegative ? '-' : ''}₹${formatted}`;
};

export const formatCurrency = (amount, currency = 'INR') => {
  if (currency === 'INR') return formatINR(amount);
  
  const symbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    AUD: 'A$',
    CAD: 'C$',
    SGD: 'S$',
  };

  const symbol = symbols[currency] || currency + ' ';
  const num = Number(amount);
  return `${num < 0 ? '-' : ''}${symbol}${Math.abs(num).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const generateUTR = () => {
  // 12-digit Indian UPI / NPCI Reference Number
  const prefix = '4' + Math.floor(100 + Math.random() * 900);
  const middle = Math.floor(1000 + Math.random() * 9000);
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${middle}${suffix}`;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInHours < 48) return 'Yesterday';
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};
