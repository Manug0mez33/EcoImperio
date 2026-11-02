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
- **Fuente Global**: `Roboto, sans-serif` (para cuerpos de texto, títulos, descripciones, formularios y datos).
- **Fuente de Botones y Acciones**: `Inter, sans-serif` (para botones de acción primaria/secundaria, navbars y CTAs).
- **Escala Modular de Tamaños (Unidades Relativas `rem` / Base `16px`)**:
  - `h1`: `32px` / `2rem` (`font-bold`, `line-height: 1.2`) — Títulos principales de pantalla (Splash, Login, Mis EcoPuntos).
  - `h2`: `24px` / `1.5rem` (`font-semibold` / `font-bold`, `line-height: 1.3`) — Encabezados de sección y modales.
  - `h3`: `18px` / `1.125rem` (`font-bold`, `line-height: 1.4`) — Títulos de tarjetas (Comercios Adheridos, ítem de Historial, Campana cercana).
  - `h4`: `16px` / `1rem` (`font-bold`, `line-height: 1.4`) — Subtítulos destacados y etiqueta de EcoPuntos ganados (`+15 pts`) en tarjetas de Historial.
  - `body` e `inputs` (`<input>`, `<select>`, `<textarea>`): `16px` / `1rem` mínimo (`font-normal`, `line-height: 1.5`) — Cumple el estándar de legibilidad de `10_accesibilidad_aplicada.md` y previene el auto-zoom forzado en navegadores móviles (iOS/Android).
  - `caption / badges`: `12px - 14px` / `0.75rem - 0.875rem` (`font-semibold`) — Etiquetas secundarias, estados de capacidad (`Vacío`/`Lleno`) y metadatos.

## 3. Los 5 Estados Obligatorios de Componentes UI
Todos los controles interactivos del sistema (botones primarios `.btn-primary`, botones secundarios `.btn-secondary`, botones de ícono, píldoras de filtro del mapa, ítems de navegación del Bottom Navbar y Drawer, campos `<input>` y desplegables `<select>`) deben implementar y evidenciar los 5 estados:
1. **Default**: Estado base en reposo con jerarquía cromática clara, bordes definidos y sombra suave.
2. **Hover**: Retroalimentación al pasar el puntero (`scale-[1.02]` o cambio de luminosidad/borde y sombra proyectada).
3. **Active**: Efecto táctil inmediato al presionar (`scale-95` / `scale-[0.98]` o inversión de tono).
4. **Focus**: Anillo de foco accesible por teclado mediante `:focus-visible` (`outline` / `ring` de alto contraste `#34d399` en modo estándar y `#facc15` en Modo Alto Contraste), incluyendo explícitamente `input:focus-visible` y `select:focus-visible`.
5. **Disabled**: Estado inactivo inequívoco (`opacity-50`, `cursor-not-allowed`, `pointer-events-none` y atributo nativo `disabled`).

## 4. Estándares Mobile-First y Accesibilidad (WCAG AA / AAA)
- Diseño exclusivamente **Mobile-First** centrado en navegación ergonómica con una sola mano (Ley de Fitts).
- **Área táctil mínima obligatoria**: `44x44px` (óptimo `48x48px`) en todos los botones, enlaces, switches, filtros y controles de formulario.
- **Menú lateral (Drawer) accesible**: Colapsable, con atributo `inert` cuando se encuentra cerrado (`aria-hidden="true"`), sincronización de `aria-expanded` en el botón hamburguesa y cierre mediante tecla `Escape` o clic en el backdrop.
- **Semántica en formularios e íconos**:
  - Todos los elementos `<input>`, `<select>` y `<textarea>` deben poseer atributos `id` y `name` únicos y estar vinculados a su `<label for="...">` o `aria-label`.
  - Todos los íconos decorativos (`<i>`, `<svg>`) deben incluir `aria-hidden="true"` para evitar ruido en lectores de pantalla.
  - Atributos `alt` descriptivos obligatorios en todas las imágenes informativas (`<img>`).
- Uso estricto de elementos HTML interactivos nativos (`<button>`, `<a href="...">`, `<input>`, `<select>`, `<dialog>`).
