# Flujo de Trabajo y Checklist DoD - EcoImperio

## 1. Ciclo de Desarrollo SDD (Spec-Driven Development)
1. **Explore**: Revisión de especificaciones UX/UI y maquetación mobile-first.
2. **Propose**: Planificación de estructura HTML5 semántica y TailwindCSS v3.
3. **Tasks**: Creación de componentes modulares (Mapa, Cards, Navbar, Modal Escáner, Formularios).
4. **Apply**: Maquetado en `index.html` con soporte para los 5 estados UI y 3 modos de pantalla (Claro, Oscuro, Alto Contraste).
5. **Verify**: Verificación con herramientas F12, pruebas con teclado y comprobación de contraste WCAG AA.

## 2. Checklist de Verificación (Definition of Done - DoD)
- [ ] **Fidelidad Visual**: Coincidencia estricta con el wireframe de Figma.
- [ ] **Prueba Mobile F12**: Verificado en emulador móvil sin desborde ni scroll horizontal (`overflow-x: hidden`).
- [ ] **Accesibilidad por Teclado**: Navegación operable al 100% únicamente con `Tab`, `Shift+Tab`, `Enter` y `Espacio`.
- [ ] **Verificación WCAG AA**: Contraste de texto mínimo de 4.5:1 verificado en Modos Claro, Oscuro y Alto Contraste.
- [ ] **Etiquetas Interactivas**: Elementos con respuesta táctil usando etiquetas nativas (`<button>`, `<a>`, `<input>`).
