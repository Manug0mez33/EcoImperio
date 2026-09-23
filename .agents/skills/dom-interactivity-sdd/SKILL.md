---
name: dom-interactivity-sdd
description: Skill de manipulación de DOM Vanilla JS, estado local y flujo Spec-Driven Development (SDD).
---

# Skill: DOM Interactivity & SDD Workflow

## Propósito
Guiar el dinamismo de la SPA EcoImperio utilizando JavaScript Vanilla limpio, control de modal de escáner QR, alternancia de modos (Claro/Oscuro/Alto Contraste) y persistencia en LocalStorage.

## Reglas de Implementación
- **Sin Frameworks Backend/JS**: No React/Vue/Angular ni backend Node.js/Express.
- **Manipulación Eficiente de DOM**: Uso de delegación de eventos y métodos nativos (`document.querySelector`, `classList.toggle`).
- **Persistencia de Puntos y Estado**:
  - Guardar el balance de EcoPuntos y el historial de reciclaje en `localStorage`.
  - Guardar la preferencia de tema (Claro/Oscuro/Alto Contraste) para persistir la selección del usuario.
- **Flujo SDD**: Aplicar cambios mediante el ciclo de 5 fases (`explore` ➔ `propose` ➔ `tasks` ➔ `apply` ➔ `verify`).
