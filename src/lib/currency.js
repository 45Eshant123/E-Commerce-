/**
 * Currency formatter utility
 * Formats prices according to selected currency and locale
 */

const currencyConfig = {
  USD: {
    symbol: '$',
    locale: 'en-US',
    code: 'USD',
    conversionRate: 1,
  },
  EUR: {
    symbol: '€',
    locale: 'de-DE',
    code: 'EUR',
    conversionRate: 0.92, // Example rate - in production, use live rates
  },
  INR: {
    symbol: '₹',
    locale: 'hi-IN',
    code: 'INR',
    conversionRate: 83.12, // Example rate - in production, use live rates
  },
};

/**
 * Format a price value according to the selected currency
 * @param {number} amount - The base price in USD
 * @param {string} currency - The target currency code (USD, EUR, INR)
 * @param {boolean} showCode - Whether to show currency code (e.g., "USD 100.00")
 * @returns {string} Formatted price string
 */
export const formatPrice = (amount, currency = 'USD', showCode = false) => {
  const config = currencyConfig[currency] || currencyConfig.USD;
  const convertedAmount = amount * config.conversionRate;

  const formatted = new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedAmount);

  return formatted;
};

/**
 * Get currency symbol for display
 * @param {string} currency - The currency code
 * @returns {string} Currency symbol
 */
export const getCurrencySymbol = (currency = 'USD') => {
  return currencyConfig[currency]?.symbol || '$';
};

/**
 * Get currency configuration
 * @param {string} currency - The currency code
 * @returns {object} Currency configuration object
 */
export const getCurrencyConfig = (currency = 'USD') => {
  return currencyConfig[currency] || currencyConfig.USD;
};

/**
 * Convert amount from one currency to another
 * @param {number} amount - The amount to convert
 * @param {string} fromCurrency - Source currency code
 * @param {string} toCurrency - Target currency code
 * @returns {number} Converted amount
 */
export const convertCurrency = (amount, fromCurrency = 'USD', toCurrency = 'USD') => {
  const fromConfig = currencyConfig[fromCurrency] || currencyConfig.USD;
  const toConfig = currencyConfig[toCurrency] || currencyConfig.USD;
  
  // Convert to base currency (USD) first, then to target currency
  const baseAmount = amount / fromConfig.conversionRate;
  return baseAmount * toConfig.conversionRate;
};

export default {
  formatPrice,
  getCurrencySymbol,
  getCurrencyConfig,
  convertCurrency,
};
