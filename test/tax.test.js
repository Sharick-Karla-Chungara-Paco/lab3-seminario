import test from 'node:test';
import assert from 'node:assert/strict';
import { TAX_RATE, calculateTax, addTax } from '../src/tax.js';
import { calculateTotal } from '../src/pricing.js';

test('el IVA es 13 %', () => {
  assert.equal(TAX_RATE, 0.13);
  assert.equal(calculateTax(100), 13);
  assert.equal(addTax(100), 113);
});

test('el impuesto y el monto final se redondean a dos decimales', () => {
  assert.equal(calculateTax(25.55), 3.32);
  assert.equal(addTax(25.55), 28.87);
});

test('el impuesto de cero y su total son cero', () => {
  assert.equal(calculateTax(0), 0);
  assert.equal(addTax(0), 0);
});

test('el carrito conserva su total sin solicitar IVA', () => {
  const items = [{ price: 25.55, quantity: 2 }];
  assert.equal(calculateTotal(items), 51.1);
  assert.equal(calculateTotal(items, { includeTax: false }), 51.1);
});

test('includeTax agrega IVA al total de varios ítems', () => {
  assert.equal(calculateTotal([{ price: 25.55, quantity: 2 }], { includeTax: true }), 57.74);
  assert.equal(calculateTotal([{ price: 100, quantity: 1 }], { includeTax: true }), 113);
});

test('un carrito vacío con IVA sigue valiendo cero', () => {
  assert.equal(calculateTotal([], { includeTax: true }), 0);
});

test('aplica el descuento antes del IVA', () => {
  assert.equal(calculateTotal([{ price: 100, quantity: 1 }], {
    discountCode: 'SAVE10', includeTax: true,
  }), 101.7);
});
