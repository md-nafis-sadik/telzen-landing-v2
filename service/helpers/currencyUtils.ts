/**
 * Currency utility functions for managing currency code and symbols
 * Priority: Profile currency > Location currency > Default USD
 */

export interface CurrencyInfo {
  code: string;
  symbol: string;
}

/**
 * Get currency symbol for a given currency code
 */
export const getCurrencySymbol = (currencyCode: string): string => {
  const symbols: Record<string, string> = {
    USD: "$",
    BDT: "৳",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    INR: "₹",
  };

  return symbols[currencyCode] || "$";
};

/**
 * Get country code from localStorage (set by useLocation hook)
 */
const getLocationCountryCode = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("telzen_country_code");
};

/**
 * Get currency based on location
 */
const getCurrencyFromLocation = (): string => {
  const countryCode = getLocationCountryCode();
  return countryCode === "BD" ? "BDT" : "USD";
};

/**
 * Get currency from user profile
 * This function should be called with profile data from the auth state or API
 */
export const getCurrencyFromProfile = (profileCurrency?: string): string | null => {
  return profileCurrency || null;
};

/**
 * Main function to determine the currency code to use
 * Priority: Profile > Location > Default (USD)
 * 
 * @param profileCurrency - Currency from user profile (if logged in)
 * @returns Currency code (BDT or USD)
 */
export const getCurrencyCode = (profileCurrency?: string): string => {
  // Priority 1: Profile currency (if logged in)
  if (profileCurrency) {
    return profileCurrency;
  }

  // Priority 2: Location-based currency
  const locationCurrency = getCurrencyFromLocation();
  if (locationCurrency) {
    return locationCurrency;
  }

  // Priority 3: Default to USD
  return "USD";
};

/**
 * Get complete currency information (code + symbol)
 */
export const getCurrencyInfo = (profileCurrency?: string): CurrencyInfo => {
  const code = getCurrencyCode(profileCurrency);
  const symbol = getCurrencySymbol(code);
  
  return { code, symbol };
};

/**
 * Format price with currency symbol
 */
export const formatPrice = (
  price: number,
  currencyCode: string = "USD",
  decimals: number = 2
): string => {
  const symbol = getCurrencySymbol(currencyCode);
  return `${symbol}${price.toFixed(decimals)}`;
};
