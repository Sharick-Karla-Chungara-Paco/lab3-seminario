import { convert, getCurrency } from './currency.js';

/**
 * Da formato a un precio para mostrarlo al usuario.
 *
 * Reglas actuales:
 *  - El monto se recibe en bolivianos y se convierte a la moneda indicada.
 *  - Se muestra el símbolo de la moneda y siempre dos decimales.
 *  - Una moneda no soportada lanza un error.
 *
 * @param {number} amount Monto en bolivianos.
 * @param {string} [currency='BOB'] Código de moneda: 'BOB', 'USD' o 'EUR' (sin distinguir mayúsculas).
 * @param {{width?: number}} [options={}] Opciones de presentación.
 * @returns {string} Precio formateado.
 * @throws {Error} Si la moneda no está soportada.
 *
 * @example
 * formatPrice(10)          // 'Bs 10.00'
 * formatPrice(25.5)        // 'Bs 25.50'
 * formatPrice(100, 'USD')  // '$ 14.50'
 * formatPrice(100, 'EUR')  // '€ 13.30'
 * formatPrice(10, 'BOB', { width: 12 }) // '    Bs 10.00'
 */
export function formatPrice(amount, currency = 'BOB', { width = 0 } = {}) {
  const { symbol } = getCurrency(currency);
  return `${symbol} ${convert(amount, currency).toFixed(2)}`.padStart(width);
}
