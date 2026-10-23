# Gotchas y Errores Conocidos - EcoImperio

## 1. Gotchas UX y Maquetado Prevenidos
1. **Desborde Horizontal en Celulares**:
   - *Riesgo*: Aparición de scroll horizontal no deseado al abrir paneles o utilizar tarjetas de 80% ancho.
   - *Prevención*: Regla estricta `overflow-x: hidden` en el contenedor `body` / `main`.

2. **Contraste de Texto Verde en Modo Claro**:
   - *Riesgo*: Texto verde o texto blanco sobre botones verdes que pierda contraste WCAG AA.
   - *Prevención*: Clase obligatoria `.force-text-white` o tonos de verde `#059669` / `#047857` que cumplan el ratio $\ge 4.5:1$.

3. **Imágenes sin Descripción (Accesibilidad)**:
   - *Riesgo*: Lectores de pantalla bloqueados en cards de comercios adheridos o comprobante de depósito.
   - *Prevención*: Atributos `alt` descriptivos obligatorios (ej. `alt="Fotografía del comercio verdulería Don Juan"`).

4. **Elementos Clicables sin Semántica Nativa**:
   - *Riesgo*: Utilizar `<div>` o `<span>` con evento `onClick` sin soporte de foco ni teclado.
   - *Prevención*: Obligatorio utilizar etiquetas `<button>` o `<a href="...">` reales para todos los componentes interactivos.

5. **Inputs `sr-only` que desplazan el marco del celular**:
   - *Riesgo*: Los toggles y radios ocultos con `sr-only` son `position: absolute`. Si su contenedor posicionado es `.mobile-viewport`, al enfocarlos el navegador desplaza ese marco (aunque tenga `overflow: hidden`) y la pantalla queda cortada por la mitad.
   - *Prevención*: `.screen-view` tiene `position: relative` y `.mobile-viewport` usa `overflow: clip`. No quitar ninguna de las dos reglas.

## 2. Historial de Post-Mortems
- *INC-001*: Configuración de ExecutionPolicy de PowerShell resulta resuelta en la máquina local (`RemoteSigned`).
- *INC-002*: Marcado HTML roto en `index.html` (toggle de modo oscuro del Splash con `</button>` huérfano y `<article>` de la Card de Balance sin cerrar). Se corrigió la estructura y se reemplazó `alert()` por un toast accesible (`role="status"`). *Prevención*: validar el balance de etiquetas antes de cada commit y no usar diálogos nativos bloqueantes.
- *INC-003*: En Configuración, tocar un toggle o un botón de tamaño de texto dejaba la mitad inferior de la pantalla en negro. *Causa*: el input `sr-only` tomaba como contenedor a `.mobile-viewport` (la pantalla solo lo contenía mientras duraba su animación de entrada, por el `transform`), y el foco desplazaba el marco 321px. *Solución*: `position: relative` en `.screen-view` + `overflow: clip` en `.mobile-viewport`. Reproducido y verificado en Chrome headless finalizando la animación antes de enfocar.
