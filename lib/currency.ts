// CAD → USD exchange rate (update manually as needed)
export const USD_RATE = 0.73; // 1 CAD = 0.73 USD

export type Currency = 'CAD' | 'USD';

export const CURRENCY_COOKIE = 'artemis_currency';

export function convertPrice(cadPrice: number, currency: Currency): number {
  if (currency === 'USD') return Math.round(cadPrice * USD_RATE);
  return cadPrice;
}

export function formatPrice(amount: number, currency: Currency = 'CAD'): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
