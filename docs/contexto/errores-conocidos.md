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

## 2. Historial de Post-Mortems
- *INC-001*: Configuración de ExecutionPolicy de PowerShell resulta resuelta en la máquina local (`RemoteSigned`).
