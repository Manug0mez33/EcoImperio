# Convenciones de Diseño y Código - EcoImperio

## 1. Sistema de Colores Semánticos y Modos
- **Modo Claro (Default)**:
  - Fondo: Blanco puro `#ffffff` / Slate-50 `#f8fafc`.
  - Color Primario (Verde Reciclaje): `#10b981` / `#059669` (para botones, fondo de card de balance, hover, botón escáner, puntos y badges).
  - Color Secundario/Detalles (Amarillo Oro): `#f59e0b` / `#fbbf24` (para medalla de balance, estrellas de puntos y barra de progreso).
  - Texto forzado de alto contraste: `.force-text-white` en botones y badges verdes.
- **Modo Oscuro** (ver ADR-003):
  - Fondo: Slate-950 `#020617` / `#090713`.
  - Paneles/Tarjetas: Glassmorphism / Slate-900 con bordes verdes sutiles.
  - Implementación: clase `dark` en `<html>` + variantes `dark:` en cada componente. Prohibido volver a overrides globales con `!important`.
  - Mapeo base: `bg-white`/`bg-slate-50` → `dark:bg-slate-900`/`dark:bg-slate-950`; `text-slate-900` → `dark:text-white`; `text-slate-700` → `dark:text-slate-200`; `text-slate-500` → `dark:text-slate-400`; `border-slate-200` → `dark:border-slate-700`/`800`; `text-emerald-700` → `dark:text-emerald-400`; badges `bg-emerald-100 text-emerald-800` → `dark:bg-emerald-900/60 dark:text-emerald-200`.
  - Botón primario en oscuro: Emerald-700 `#047857` (texto blanco 5.5:1).
- **Texto secundario en claro**: mínimo `text-slate-500` sobre blanco; `text-slate-400` no alcanza WCAG AA (2.6:1).
- **Modo Alto Contraste**:
  - Ajustado con bordes definidos y contraste máximo para usuarios con visión reducida (WCAG AAA).

## 2. Tipografía y Escala Modular
- **Fuente Global**: `Roboto, sans-serif` (para cuerpos de texto, títulos, descripciones y datos).
- **Fuente de Botones y Acciones**: `Inter, sans-serif` (para botones de acción primaria, navbars y CTAs).
- **Escala de Tamaños**:
  - `h1`: 32px (bold)
  - `h2`: 24px (semibold)
  - `h3`: 18px (bold)
  - `body`: 16px (regular)
  - `caption / badges`: 12px-14px (semibold)

## 3. Los 5 Estados Obligatorios de Componentes UI
1. **Default**: Estado base con elevación y sombras suaves.
2. **Hover**: Elevación/agrandamiento gradual (`scale-105` o `translate-y-1`) y sombra verde proyectada.
3. **Active**: Efecto de hundimiento táctil (`scale-95`).
4. **Focus**: Anillo de foco con luz de alto contraste (`:focus-visible` con `ring-4 ring-emerald-400`).
5. **Disabled**: Opacidad al 50% (`opacity-50 cursor-not-allowed`).

## 4. Estándares Mobile-First y Accesibilidad
- Diseño exclusivamente **Mobile-First** centrado en navegación táctil con una sola mano.
- Zona de toque mínima para botones: 44px - 60px.
- Menú hamburguesa colapsable para navegación en dispositivos móviles.
- Atributos `alt` descriptivos obligatorios en todas las imágenes.
- Uso estricto de elementos HTML interactivos reales (`<button>`, `<a href="...">`, `<input>`).
