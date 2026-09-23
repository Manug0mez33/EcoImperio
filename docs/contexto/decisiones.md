# Registro de Decisiones de Arquitectura (ADRs) - EcoImperio

## ADR-001: Arquitectura SPA Single-File en HTML5 Semántico + TailwindCSS v3 CDN
- **Estado**: Aceptado
- **Fecha**: 2026-09-23
- **Contexto**: Se requiere prototipar una aplicación web móvil (EcoImperio) limpia, rápida e interactiva basada en los conceptos de UX/UI y Figma sin sobre-ingeniería de frameworks ni backend.
- **Decisión**: Mantener todo en un único archivo `index.html` estructurado en HTML5 semántico con TailwindCSS v3 (vía CDN) y JavaScript limpio.
- **Límites Tecnológicos Strictos**:
  - NO utilizar React, Vue ni Angular.
  - NO crear backend en Node.js, Express ni Python.
  - NO conectar bases de datos SQL ni Firebase.
  - NO escribir estilos inline (`style="..."`).
- **Consecuencia**: Ejecución ultra-rápida, simplicidad pedagógica y facilidad de despliegue directo.

## ADR-002: Enfoque Exclusivamente Mobile-First y Tres Modos Visuales
- **Estado**: Aceptado
- **Fecha**: 2026-09-23
- **Contexto**: EcoImperio se utiliza principalmente en la calle mientras los vecinos caminan hacia las campanas verdes.
- **Decisión**: La aplicación se diseña con un layout centrado en pantalla móvil, mapa interactivo central, barra de navegación inferior con botón flotante de escáner y soporte para Modos Claro, Oscuro y Alto Contraste para la persona "Kevin" y usuarios con visión reducida.
