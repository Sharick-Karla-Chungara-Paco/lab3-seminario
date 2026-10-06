import test from 'node:test';
import assert from 'node:assert/strict';
import { buildReceipt } from '../src/index.js';

test('buildReceipt genera líneas alineadas y el total', () => {
  assert.equal(
    buildReceipt([{ name: 'Mouse Inalámbrico', price: 25.5, quantity: 2 }]),
    [
      '=== MINI TIENDA ===',
      'Mouse Inalámbrico x2            Bs 51.00',
      'TOTAL                           Bs 51.00',
    ].join('\n'),
  );
});

test('buildReceipt suma todos los ítems', () => {
  const receipt = buildReceipt([
    { name: 'Mouse', price: 25.5, quantity: 2 },
    { name: 'Libro', price: 40, quantity: 1 },
  ]);

  assert.match(receipt, /TOTAL\s+Bs 91\.00$/);
});

test('buildReceipt combina moneda, alineación, descuento e IVA', () => {
  const receipt = buildReceipt(
    [{ name: 'Laptop', price: 100, quantity: 1 }],
    { discountCode: 'SAVE10', includeTax: true, currency: 'USD' },
  );

  assert.equal(
    receipt,
    [
      '=== MINI TIENDA ===',
      `${'Laptop x1'.padEnd(28)}${'$ 14.50'.padStart(12)}`,
      `${'TOTAL'.padEnd(28)}${'$ 14.75'.padStart(12)}`,
    ].join('\n'),
  );
});
