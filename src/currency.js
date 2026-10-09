import { round2 } from './money.js';

// Tasas de cambio relativas al boliviano (BOB = 1).
export const CURRENCIES = {
  BOB: { symbol: 'Bs', rate: 1 },
  USD: { symbol: '$', rate: 0.145 },
  EUR: { symbol: '€', rate: 0.133 },
};

export function getCurrency(code) {
  const key = typeof code === 'string' ? code.toUpperCase() : code;
  if (!Object.hasOwn(CURRENCIES, key)) {
    throw new Error(`Moneda no soportada: ${code}`);
  }
  return CURRENCIES[key];
}

export function convert(amount, code = 'BOB') {
  return round2(amount * getCurrency(code).rate);
}
