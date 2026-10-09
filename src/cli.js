#!/usr/bin/env node
import {
  products,
  searchProducts,
  formatPrice,
  findProductBySku,
  buildReceipt,
} from './index.js';

const commands = {
  list() {
    for (const product of products) {
      console.log(`${product.sku}  ${product.name.padEnd(28)} ${formatPrice(product.price)}`);
    }
  },

  search(...terms) {
    const results = searchProducts(terms.join(' '));
    if (results.length === 0) {
      console.log('Sin resultados.');
      return;
    }
    for (const product of results) {
      console.log(`${product.sku}  ${product.name}`);
    }
  },

  receipt(...entries) {
    const items = entries.map((entry) => {
      const [sku, quantityText] = entry.split(':');
      const product = findProductBySku(sku);
      const quantity = Number(quantityText);

      if (!product || !Number.isInteger(quantity) || quantity <= 0) {
        throw new Error(`Ítem inválido: ${entry}. Usa SKU:CANTIDAD.`);
      }

      return { name: product.name, price: product.price, quantity };
    });

    console.log(buildReceipt(items));
  },

  // Los comandos nuevos se registran debajo de esta línea
};

const [, , name, ...args] = process.argv;

if (!name || !commands[name]) {
  console.log(`Uso: node src/cli.js <comando> [argumentos]`);
  console.log(`Comandos disponibles: ${Object.keys(commands).join(', ')}`);
  process.exit(name ? 1 : 0);
}

commands[name](...args);
