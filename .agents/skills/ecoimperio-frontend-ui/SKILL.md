---
name: ecoimperio-frontend-ui
description: Skill de desarrollo frontend mobile-first para EcoImperio con HTML5 semántico, TailwindCSS v3 y los 5 estados de componentes UI.
---

# Skill: EcoImperio Frontend UI & TailwindCSS v3

## Propósito
Guiar la creación de componentes visuales en `index.html` para la aplicación móvil EcoImperio siguiendo el diseño mobile-first, patrón en Z, y la paleta de colores semánticos (Verde `#10b981`, Amarillo `#f59e0b`, Slate-950/Slate-50).

## Directrices Técnicas
- **Maquetado**: Exclusivamente HTML5 semántico (`<main>`, `<article>`, `<header>`, `<nav>`, `<aside>`, `<section>`, `<footer>`).
- **Framework CSS**: TailwindCSS v3 CDN.
- **5 Estados de Componentes**:
  - `Default`: `bg-emerald-600 text-white shadow-md rounded-2xl`
  - `Hover`: `hover:bg-emerald-500 hover:scale-105 hover:shadow-lg transition-all duration-300`
  - `Active`: `active:scale-95 active:bg-emerald-700`
  - `Focus`: `focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400`
  - `Disabled`: `disabled:opacity-50 disabled:cursor-not-allowed`

## Estructura de Componentes Clave
1. **Card Balance**: Saldo en EcoPuntos, medalla dorada y barra de progreso.
2. **Card Comercio Adherido**: 50% imagen, 50% info (`h3`, `p`, badge de descuento).
3. **Card Historial**: Ancho 80%, detalle en `h3`, ubicación/fecha en `p`, puntos en `h4` a la derecha.
