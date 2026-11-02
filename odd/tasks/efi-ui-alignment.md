# Feature: EFI UI Complete Alignment (EcoImperio)

- **Repository-Relative Locator**: `odd/tasks/efi-ui-alignment.md`
- **Engram Topic Key**: `odd/efi-ui-alignment/tasks`
- **Branch**: `feat/efi-ui-alignment`
- **Delivery Strategy**: `ask-on-risk`
- **Forecast Authored Changed Lines**: ~1200 lines
- **Running Authored Changed Lines**: 1285
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
- Complete Phases 1, 2, 3, and 4 sequentially under user review.

## Actionable Checklist (Stable Task IDs)

- [x] **TASK-1 (Phase 1A — Contexto & Rules Alignment)** — Commit `c9899c9`
  - **Route**: `delegated` (touches 5 documentation files: `docs/contexto/arquitectura.md`, `docs/contexto/convenciones.md`, `docs/contexto/decisiones.md`, `docs/contexto/glosario.md`, `.agents/rules/antigravity_rules.md`).
  - **Trigger Evidence**: Writer trigger (5 files to update coherently).
  - **Scope**: Unify stack definition (`index.html` + `style.css` + `app.js` with Tailwind v3 CDN), align Mermaid navigation and component anatomy (`80%` width + `<h4>` on History cards, 50%/50% Comercios cards, dynamic progress bar, interactive map filters & route indicator), mandate `localStorage` persistence for `ecoPuntos` and `history` per account (`ADR-004`), and unify user personas (`Oscar Rodríguez` demo / `Tomás` young neighbor / `Vecino con visión reducida`).
  - **Checks**: Verified zero contradictions across all 6 `docs/contexto/*` files and `.agents/rules/antigravity_rules.md`.

- [x] **TASK-2 (Phase 1B — Part 1 Research Document Creation)** — Commit `c9899c9`
  - **Route**: `inline` (1 new file: `docs/investigacion_efi_ecoimperio.md`).
  - **Trigger Evidence**: Single cohesive document creation based on already-mapped `docs/consigna/` and `docs/conceptos/01..10`.
  - **Scope**: Create `docs/investigacion_efi_ecoimperio.md` covering all sections required by `docs/consigna/proyecto_de_efi_de_interfaz_de_usuario.md`:
    1. Resumen de la idea.
    2. Datos de la empresa (EcoImperio + Municipalidad de Río Cuarto, ícono de tienda/app, variantes de logo).
    3. Valor agregado frente a alternativas abiertas/gratuitas.
    4. Impacto en la comunidad local (Río Cuarto).
    5. Implementación detallada de los 10 conceptos de la cátedra (`01_UX` a `10_accesibilidad_aplicada`), incluyendo Personas, User Journey Map, Arquitectura de Información, Leyes de Gestalt, Patrón Z, Escala Tipográfica, 5 Estados UI y Accesibilidad WCAG AA/AAA.
    6. Estructura de Equipo (ficha de integrantes).
  - **Checks**: Verified every point of `docs/consigna/proyecto_de_efi_de_interfaz_de_usuario.md` and all 10 `docs/conceptos/*` files are addressed.

- [x] **TASK-3 (Phase 2A — Design System, Typography, 5 UI States & WCAG A11y in SPA)** — Commit `77f95e6`
  - **Route**: `delegated` (`index.html`, `style.css`, `app.js`).
  - **Scope**: Fix Drawer focus trap (`inert`/`visibility: hidden` + `Escape` key + `aria-expanded`), add `select:focus-visible`, enforce `>= 44x44px` touch targets (`.touch-target`), enforce `16px` minimum input font size & modular heading scale (`h1: 32px`, `h2: 24px`, `h3: 18px`, `h4: 16px`), complete 5 UI states on all interactive elements (Default, Hover, Active, Focus, Disabled), fix High Contrast Mode (`body.high-contrast` + `html.dark` compatibility with ratio $\ge 7:1$), add missing `id`/`name` on all inputs and `aria-hidden="true"` on all decorative icons.
  - **Checks**: Syntax checked with Node.js; verified 0 errors; verified focus trap and `:focus-visible` ring across all interactive controls.

- [x] **TASK-4 (Phase 2B — Components, Persistence & Interactive Flows in SPA)** — Commit `211520f`
  - **Route**: `delegated` (`index.html`, `style.css`, `app.js`).
  - **Scope**: History cards at `80%` width with `<h4>` points badge, dynamic Card Balance progress bar (with goal calculation towards 1,500 pts), persist `ecoPuntos` and `history` in `localStorage` per user account (`ecoimperio_user_data`), functional map search & filter pills (`Campanas Verdes` / `Puntos Limpios`), interactive scanner flash & material selector, recover Río Cuarto skyline silhouette in Splash and Recycling Guide / Schedule modal from Figma v1 (`#guide-dialog`).
  - **Checks**: Dynamic DOM updates tested, localStorage reading/writing verified per user email, and URL query parameter routing added for instant testability (`?screen=...`, `?theme=...`, `?demo=1`).

- [x] **TASK-5 (Phase 3 & 4 — Figma Sync Guide, Final Screenshots & DoD Verification)**
  - **Route**: `inline` (`docs/assets/screenshots/`, `docs/investigacion_efi_ecoimperio.md`, `docs/contexto/guia_sincronizacion_figma_v2.md`, `docs/contexto/flujo-de-trabajo.md`).
  - **Scope**: Verify all 5 DoD items in `docs/contexto/flujo-de-trabajo.md` with Chrome DevTools, capture 11 high-resolution screenshots for the 10 theoretical concepts into `docs/assets/screenshots/`, embed all screenshots in `docs/investigacion_efi_ecoimperio.md`, update team credentials (`Tomás Benavidez - ITEC Río Cuarto`), create comprehensive Figma v2 sync guide (`docs/contexto/guia_sincronizacion_figma_v2.md`), and normalize `.md` extensions in `docs/conceptos/`.
  - **Checks**: 11 PNG screenshots generated and embedded; DoD checklist 100% verified; zero pending placeholders or dead ends.

## Progress & Verification Evidence
- Branch `feat/efi-ui-alignment` updated with full Phase 1, Phase 2, Phase 3, and Phase 4 deliverables.
- `TASK-1` & `TASK-2`: Completed in commit `c9899c9`.
- `TASK-3`: Completed in commit `77f95e6`.
- `TASK-4`: Completed in commit `211520f`.
- `TASK-5`: Completed and verified with automated Chrome headless captures, complete Figma v2 sync documentation, and finalized research deliverable.
