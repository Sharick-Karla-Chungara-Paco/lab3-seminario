import { calculateTotal } from './pricing.js';
import { formatPrice } from './format.js';

const LABEL_WIDTH = 28; // Ancho fijo de las etiquetas del recibo.

/**
 * Construye un recibo de varias líneas para los ítems indicados.
 *
 * @param {Array<{name: string, price: number, quantity: number}>} items Ítems del recibo.
 * @param {Object} [options={}] Opciones para descuento, IVA y moneda.
 * @param {string} [options.discountCode] Código de descuento para el total.
 * @param {boolean} [options.includeTax=false] Agrega IVA al total después del descuento.
 * @param {string} [options.currency='BOB'] Moneda en la que se muestra el recibo.
 * @returns {string} Recibo listo para imprimir.
 */
export function buildReceipt(items, { discountCode, includeTax = false, currency = 'BOB' } = {}) {
  const lines = ['=== MINI TIENDA ==='];

  for (const item of items) {
    const label = `${item.name} x${item.quantity}`.padEnd(LABEL_WIDTH);
    lines.push(`${label}${formatPrice(item.price * item.quantity, currency, { width: 12 })}`);
  }

  const total = calculateTotal(items, { discountCode, includeTax });
  lines.push(`${'TOTAL'.padEnd(LABEL_WIDTH)}${formatPrice(total, currency, { width: 12 })}`);
  return lines.join('\n');
}
