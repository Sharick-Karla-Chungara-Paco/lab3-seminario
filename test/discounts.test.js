import test from 'node:test';
import assert from 'node:assert/strict';
import { applyDiscount } from '../src/discounts.js';
import { calculateTotal } from '../src/pricing.js';

test('aplica los descuentos disponibles', () => {
  assert.equal(applyDiscount(100, 'SAVE10'), 90);
  assert.equal(applyDiscount(100, 'SAVE20'), 80);
  assert.equal(applyDiscount(100, 'BLACKFRIDAY'), 70);
});

test('acepta códigos en minúsculas', () => {
  assert.equal(applyDiscount(100, 'save10'), 90);
});

test('conserva el monto con un código desconocido o undefined', () => {
  assert.equal(applyDiscount(100, 'OTRO'), 100);
  assert.equal(applyDiscount(100), 100);
});

test('redondea el descuento a dos decimales', () => {
  assert.equal(applyDiscount(25.55, 'SAVE10'), 23);
});

test('el descuento de un monto cero es cero', () => {
  assert.equal(applyDiscount(0, 'SAVE10'), 0);
});

test('calculateTotal aplica SAVE10 a un carrito de 100', () => {
  const items = [{ price: 25, quantity: 4 }];
  assert.equal(calculateTotal(items, { discountCode: 'SAVE10' }), 90);
});

test('calculateTotal conserva el total de 100 sin código', () => {
  const items = [{ price: 25, quantity: 4 }];
  assert.equal(calculateTotal(items), 100);
});
