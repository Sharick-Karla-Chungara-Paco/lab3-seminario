# Changelog

Todos los cambios relevantes de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/)
y el proyecto usa [Versionado Semántico](https://semver.org/lang/es/).

## [Unreleased]

### Added
- Soporte de monedas BOB, USD y EUR en `formatPrice` (`src/currency.js`).
- Impuesto IVA del 13 % opcional en el total del carrito.
- Códigos de descuento SAVE10, SAVE20 y BLACKFRIDAY para el total del carrito.
- Recibos imprimibles y comando CLI `receipt`.

### Changed

### Fixed

## [1.0.0] - 2026-10-01

### Added
- Catálogo de productos (`products`, `findProductBySku`, `searchProducts`).
- Cálculo del total de un carrito (`calculateTotal`).
- Formato de precios en bolivianos (`formatPrice`).
- CLI básica con los comandos `list` y `search`.
