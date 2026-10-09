import test from 'node:test';
import assert from 'node:assert/strict';
import { CURRENCIES, getCurrency, convert, formatPrice } from '../src/index.js';

test('CURRENCIES define BOB, USD y EUR con símbolo y tasa', () => {
  assert.deepEqual(Object.keys(CURRENCIES).sort(), ['BOB', 'EUR', 'USD']);
  assert.equal(CURRENCIES.BOB.rate, 1);
});

test('getCurrency devuelve la moneda por su código', () => {
  assert.equal(getCurrency('USD').symbol, '$');
  assert.equal(getCurrency('EUR').symbol, '€');
});

test('getCurrency lanza error para una moneda no soportada', () => {
  assert.throws(() => getCurrency('XXX'), { message: 'Moneda no soportada: XXX' });
  assert.throws(() => getCurrency(undefined), /Moneda no soportada/);
  // claves heredadas de Object no deben contar como monedas
  assert.throws(() => getCurrency('toString'), /Moneda no soportada/);
});

test('getCurrency y formatPrice no distinguen mayúsculas', () => {
  assert.equal(getCurrency('usd').symbol, '$');
  assert.equal(convert(100, 'eur'), 13.3);
  assert.equal(formatPrice(100, 'Usd'), '$ 14.50');
});

test('formatPrice siempre muestra dos decimales tras redondear', () => {
  assert.equal(formatPrice(0.1, 'USD'), '$ 0.01'); // 0.0145 → 0.01
  assert.equal(formatPrice(20, 'USD'), '$ 2.90'); // 2.9 → '2.90'
  assert.equal(formatPrice(3.45, 'EUR'), '€ 0.46'); // 0.45885 → 0.46
});

test('convert aplica la tasa y redondea a 2 decimales', () => {
  assert.equal(convert(100, 'USD'), 14.5);
  assert.equal(convert(100, 'EUR'), 13.3);
  assert.equal(convert(25.5, 'USD'), 3.7); // 3.6975 → 3.70
  assert.equal(convert(10), 10); // BOB por defecto
});

test('formatPrice muestra el símbolo y el monto convertido', () => {
  assert.equal(formatPrice(100, 'USD'), '$ 14.50');
  assert.equal(formatPrice(100, 'EUR'), '€ 13.30');
  assert.equal(formatPrice(10, 'BOB'), 'Bs 10.00');
});

test('formatPrice conserva el comportamiento anterior sin moneda', () => {
  assert.equal(formatPrice(10), 'Bs 10.00');
  assert.equal(formatPrice(0), 'Bs 0.00');
});

test('formatPrice lanza error con una moneda desconocida', () => {
  assert.throws(() => formatPrice(10, 'JPY'), /Moneda no soportada: JPY/);
});
