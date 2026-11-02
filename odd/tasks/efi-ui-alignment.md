# Feature: EFI UI Complete Alignment (EcoImperio)

- **Repository-Relative Locator**: `odd/tasks/efi-ui-alignment.md`
- **Engram Topic Key**: `odd/efi-ui-alignment/tasks`
- **Branch**: `feat/efi-ui-alignment`
- **Delivery Strategy**: `ask-on-risk`
- **Forecast Authored Changed Lines**: ~350 lines (Phase 1 docs; total feature across phases ~650 lines)
- **Running Authored Changed Lines**: 0
- **TDD Mode**: `disabled` (source: repository has no automated test runner / `package.json`; verification uses structural DOM/CSS/JS checks and live Chrome DevTools inspection)

## Objective
Align EcoImperio's architecture/context documentation (`docs/contexto/`), research deliverables (`docs/investigacion_efi_ecoimperio.md`), and SPA implementation (`index.html`, `style.css`, `app.js`) with 100% of the requirements in `docs/consigna/proyecto_de_efi_de_interfaz_de_usuario.md`, the 10 theoretical concepts (`docs/conceptos/01` to `10`), and the Figma prototype (`Reto 4`).

## Problem & Why
The audit identified:
1. Contradictions across `docs/contexto/*` and `.agents/rules/antigravity_rules.md` (stack definition, single-file vs 3-file structure, `localStorage` persistence of EcoPuntos/history, persona names, and Mermaid diagram vs actual UI).
2. Missing Part 1 Deliverable (`Documento con la investigación`) required by `docs/consigna/proyecto_de_efi_de_interfaz_de_usuario.md`.
3. Visual, functional, and WCAG AA/AAA accessibility gaps in `index.html`, `style.css`, and `app.js` compared to the concepts and Figma design.

## Authorized Scope & Constraints
- Work strictly on branch `feat/efi-ui-alignment` (do not push or merge to `main` without explicit user approval).
- Maintain Vanilla HTML5 + TailwindCSS v3 CDN + Vanilla JS (`index.html`, `style.css`, `app.js`) without external JS frameworks or backend servers.
- Phase 1 is explicitly authorized now; Phases 2, 3, and 4 follow sequentially under user review.

## Actionable Checklist (Stable Task IDs)

- [ ] **TASK-1 (Phase 1A — Contexto & Rules Alignment)**
  - **Route**: `delegated` (touches 5 documentation files: `docs/contexto/arquitectura.md`, `docs/contexto/convenciones.md`, `docs/contexto/decisiones.md`, `docs/contexto/glosario.md`, `.agents/rules/antigravity_rules.md`).
  - **Trigger Evidence**: Writer trigger (5 files to update coherently).
  - **Scope**: Unify stack definition (`index.html` + `style.css` + `app.js` with Tailwind v3 CDN), align Mermaid navigation and component anatomy (`80%` width + `<h4>` on History cards, 50%/50% Comercios cards, dynamic progress bar, interactive map filters & route indicator), mandate `localStorage` persistence for `ecoPuntos` and `history` per account (`ADR-004`), and unify user personas (`Oscar Rodríguez` demo / `Tomás` young neighbor / `Vecino con visión reducida`).
  - **Checks**: Verify zero contradictions across all 6 `docs/contexto/*` files and `.agents/rules/antigravity_rules.md`.

- [ ] **TASK-2 (Phase 1B — Part 1 Research Document Creation)**
  - **Route**: `inline` (1 new file: `docs/investigacion_efi_ecoimperio.md`).
  - **Trigger Evidence**: Single cohesive document creation based on already-mapped `docs/consigna/` and `docs/conceptos/01..10`.
  - **Scope**: Create `docs/investigacion_efi_ecoimperio.md` covering all sections required by `docs/consigna/proyecto_de_efi_de_interfaz_de_usuario.md`:
    1. Resumen de la idea.
    2. Datos de la empresa (EcoImperio + Municipalidad de Río Cuarto, ícono de tienda/app, variantes de logo).
    3. Valor agregado frente a alternativas abiertas/gratuitas.
    4. Impacto en la comunidad local (Río Cuarto).
    5. Implementación detallada de los 10 conceptos de la cátedra (`01_UX` a `10_accesibilidad_aplicada`), incluyendo Personas, User Journey Map, Arquitectura de Información, Leyes de Gestalt, Patrón Z, Escala Tipográfica, 5 Estados UI y Accesibilidad WCAG AA/AAA, con espacios marcados para las capturas definitivas de la Fase 4.
    6. Estructura de Equipo (plantilla lista con roles para completar fotos/bios).
  - **Checks**: Verify every point of `docs/consigna/proyecto_de_efi_de_interfaz_de_usuario.md` and all 10 `docs/conceptos/*` files are addressed.

- [ ] **TASK-3 (Phase 2A — Design System, Typography, 5 UI States & WCAG A11y in SPA)**
  - **Route**: `delegated` (`index.html`, `style.css`, `app.js`).
  - **Scope**: Fix Drawer focus trap (`inert`/`visibility: hidden` + `Escape` key + `aria-expanded`), add `select:focus-visible`, enforce `>= 44x44px` touch targets, enforce `16px` minimum input font size & modular heading scale, complete 5 UI states on all interactive elements, fix High Contrast Mode (`body.high-contrast` + `html.dark` compatibility), add missing `id`/`name` on inputs and `aria-hidden="true"` on decorative icons.

- [ ] **TASK-4 (Phase 2B — Components, Persistence & Interactive Flows in SPA)**
  - **Route**: `delegated` (`index.html`, `style.css`, `app.js`).
  - **Scope**: History cards at `80%` width with `<h4>` points badge, dynamic Card Balance progress bar, persist `ecoPuntos` and `history` in `localStorage` per user account, functional map search & filter pills (`Campanas Verdes` / `Puntos Limpios`), interactive scanner flash & material selector, recover Río Cuarto silhouette in Splash and Recycling Guide / Schedule modal from Figma v1.

- [ ] **TASK-5 (Phase 3 & 4 — Figma Sync Guide, Final Screenshots & DoD Verification)**
  - **Route**: `inline` / `delegated`.
  - **Scope**: Verify all 5 DoD items in `docs/contexto/flujo-de-trabajo.md` with Chrome DevTools, capture screenshots for `docs/investigacion_efi_ecoimperio.md`, and provide Figma v2 sync & prototyping instructions.

## Progress & Verification Evidence
- Branch `feat/efi-ui-alignment` created from `main`.
- Next Step: Execute `TASK-1` and `TASK-2` for Phase 1.
