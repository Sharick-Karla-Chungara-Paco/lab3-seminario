import { round2 } from './money.js';

// IVA del 13 %.
export const TAX_RATE = 0.13;

export function calculateTax(amount) {
  return round2(amount * TAX_RATE);
}

export function addTax(amount) {
  return round2(amount + calculateTax(amount));
}
