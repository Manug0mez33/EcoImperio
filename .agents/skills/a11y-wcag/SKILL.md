---
name: a11y-wcag
description: Skill de accesibilidad y contraste WCAG AA/AAA para usuarios con visión reducida y navegación 100% por teclado.
---

# Skill: Accessibility & WCAG Standards

## Propósito
Asegurar que la aplicación EcoImperio sea accesible para personas con visión reducida y adaptable mediante los Modos Claro, Oscuro y Alto Contraste.

## Reglas de Accesibilidad
1. **Contraste Mínimo**:
   - Texto normal: Contraste $\ge 4.5:1$ (WCAG AA).
   - Modo Alto Contraste: Contraste $\ge 7:1$ (WCAG AAA).
2. **Navegación por Teclado**:
   - Elementos interactivos alcanzables vía `Tab`.
   - Indicador de foco `:focus-visible` claramente distinguible.
3. **Etiquetas y Semántica**:
   - Atributos `alt` descriptivos en todas las imágenes.
   - Atributos `aria-label` en botones que contienen solo iconos (ej. botón escáner QR o menú hamburguesa).
   - Uso de etiquetas `<button>` nativas en lugar de divs interactivos.
