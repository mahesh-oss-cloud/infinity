// Mock currency conversion rates for sandbox payout simulator
// Rates are defined as base currency -> target currency multiplier
// Example: 1 USD = 83.5 INR
export const RATES = {
  USD_INR: 83.5,
  INR_USD: 1 / 83.5,
  EUR_INR: 90.2,
  INR_EUR: 1 / 90.2,
};
