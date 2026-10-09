import { round2 } from './money.js';
import { applyDiscount } from './discounts.js';

/**
 * Calcula el total de un carrito de compras.
 *
 * Reglas actuales:
 *  - El total es la suma de precio * cantidad de cada ítem.
 *  - Si se proporciona un código válido, se aplica el descuento al subtotal.
 *  - El resultado se redondea a 2 decimales.
 *  - Un carrito vacío vale 0.
 *
 * @param {Array<{price: number, quantity: number}>} items Ítems del carrito.
 * @param {Object} [options={}] Opciones del cálculo.
 * @param {string} [options.discountCode] Código de descuento.
 * @returns {number} Total del carrito.
 *
 * @example
 * calculateTotal([])                                   // 0
 * calculateTotal([{ price: 10, quantity: 2 }])         // 20
 * calculateTotal([
 *   { price: 25.5, quantity: 2 },
 *   { price: 40, quantity: 1 },
 * ])                                                   // 91
 * calculateTotal([{ price: 100, quantity: 1 }], { discountCode: 'SAVE10' }) // 90
 */
export function calculateTotal(items, { discountCode } = {}) {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return applyDiscount(round2(subtotal), discountCode);
}