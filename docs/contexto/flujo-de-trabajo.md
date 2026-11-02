# Flujo de Trabajo y Checklist DoD - EcoImperio

## 1. Ciclo de Desarrollo SDD (Spec-Driven Development)
1. **Explore**: Revisión de especificaciones UX/UI y maquetación mobile-first.
2. **Propose**: Planificación de estructura HTML5 semántica y TailwindCSS v3.
3. **Tasks**: Creación de componentes modulares (Mapa, Cards, Navbar, Modal Escáner, Formularios).
4. **Apply**: Maquetado en `index.html` con soporte para los 5 estados UI y 3 modos de pantalla (Claro, Oscuro, Alto Contraste).
5. **Verify**: Verificación con herramientas F12, pruebas con teclado y comprobación de contraste WCAG AA/AAA.

## 2. Checklist de Verificación (Definition of Done - DoD)
- [x] **Fidelidad Visual**: Coincidencia estricta con el wireframe y prototipo Hi-Fi de Figma.
- [x] **Prueba Mobile F12**: Verificado en emulador móvil sin desborde ni scroll horizontal (`overflow: clip` / `overflow-x: hidden`).
- [x] **Accesibilidad por Teclado**: Navegación operable al 100% únicamente con `Tab`, `Shift+Tab`, `Enter`, `Espacio` y `Escape` (con `inert` en Drawer).
- [x] **Verificación WCAG AA y AAA**: Contraste de texto mínimo de 4.5:1 verificado en Modos Claro y Oscuro, y $\ge 7:1$ en Modo Alto Contraste.
- [x] **Etiquetas Interactivas**: Elementos con respuesta táctil usando etiquetas nativas (`<button>`, `<a>`, `<input>`, `<select>`) con áreas táctiles $\ge 44\times44\text{px}$.
