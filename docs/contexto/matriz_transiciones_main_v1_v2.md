# Matriz Maestra de Transiciones y Mutaciones (Main Audit v1 a v2)

> **Materia**: Interfaz de Usuario — Examen Final Integrador (EFI 2026)  
> **Estado de Main**: Rama `main` actualizada con arquitectura modular de 11 Pantallas y 7 Modales.  
> **Objetivo**: Documentar la transición exacta entre los bocetos iniciales primitivos (Lo-Fi) y el software vivo final (Hi-Fi) considerando **Modo Claro**, **Modo Oscuro** y **Modo Alto Contraste (WCAG AAA)**.

---

## 1. El Por Qué (Why) del Salto Visual Notorio

Para que el tribunal docente evalúe el proceso de diseño y no solo la entrega cosmética:
1. **El Wireframe v1 (Baja Fidelidad)** debe ser deliberadamente **crudo, estructural y en escala de grises**:
   - Cajas con cruz (`[X]`), trazos manuales (`#333333`), fuentes informales tipo boceto (`Kalam` / `Patrick Hand`).
   - Muestra las **carencias y fricciones iniciales**: callejones sin salida, falta de propuesta de valor, ausencia de filtros y falta de redundancia informativa.
2. **El Software Vivo v2 (Alta Fidelidad)** debe evidenciar la **solución sistemática de cada problema**:
   - Sistema de Diseño Atómico con tokens esmeralda (`#047857`, `#065F46`, `#ECFDF5`).
   - Tipografía geométrica `Inter`, ergonomía de 56px al alcance del pulgar, matriz de los **5 Estados UI**, y soporte total de 3 temas (**Claro**, **Oscuro** `#020617` y **Alto Contraste AAA** `#000000` / `#FFFF00` ratio `19.56:1`).

---

## 2. Mapa Comparativo: Pantallas Viejas vs. Pantallas Actuales en Main

| # | ID de Pantalla | Estado en Wireframe Antiguo (v1 Inicial) | Estado Actual en Main (v2 Final) | Qué Cambió / Transición Clave |
| :-: | :--- | :--- | :--- | :--- |
| **01** | `#screen-splash` | Pantalla aislada con logo `[X]`, texto genérico y un botón `"Ingresar"` obligatorio. | Onboarding estructurado en 3 bloques de valor, switch de tema Claro/Oscuro en cabecera, botón `"Iniciar Sesión"`, `"Crear cuenta"` y bypass `"Explorar mapa sin cuenta"`. | **Eliminación del dead-end**: El usuario ya no está forzado a autenticarse para conocer el servicio. |
| **02** | `#screen-login` | Formulario rígido sin validaciones dinámicas ni alternativas de prueba. | Validación constructiva `onBlur` con `aria-describedby`, revelador de clave (`eye/eye-off`) y botón de **Acceso Rápido Demo (1 clic)** para el tribunal. | **Heurística de Hassan Montero**: Prevención de errores y agilidad de evaluación sin fricción. |
| **03** | `#screen-registro` | Formulario genérico con campos desconectados de la realidad local. | Formulario contextualizado con selector de Barrios de Río Cuarto (`Alberdi`, `Centro`, `Banda Norte`, etc.) y bonificación de bienvenida (`+50 pts`). | **Anclaje Comunitario**: Personaliza la experiencia barrial desde el primer segundo. |
| **04** | `#screen-comunidad` *(NUEVA)* | **No existía en los primeros bocetos.** Solo había un mapa desconectado. | **Muro vecinal interactivo**: Pestañas `"Depósitos"` y `"EcoEventos"`, ordenamiento (*Recientes/Relevantes*), compositor de publicación y tarjeta de EcoCanje vecinal. | **Gamificación Social**: Transforma el reciclaje individual en un movimiento barrial visible. |
| **05** | `#screen-mapa` | Lienzo gris plano con 3 círculos idénticos. Sin estado de llenado ni distinción de residuos. | Mapa estilizado con codificación redundante triple (**Color** + **Ícono** + **Texto** `(Vacío)` / `(Lleno)`), alerta preventiva en campana desbordada y barra inferior integrada. | **Accesibilidad Universal (WCAG 2.2)**: Comprensible para personas con daltonismo y legible bajo el sol de Río Cuarto. |
| **06** | `#screen-escaner` | Visor cuadrado estático que requería lectura perfecta por cámara. | Visor asistido con selector manual de 4 materiales (`PET`, `Papel`, `Vidrio`, `Aluminio`), coherencia de punto destino (`Vidrio` → *Plaza Roca*) y alerta toast no intrusiva. | **Tolerancia a fallos**: Permite registrar el reciclaje aunque el código físico esté dañado o con poca luz. |
| **07** | `#screen-puntos` | Lista de puntos sin barra de meta ni comercios tangibles. | Billetera de nivel con barra de XP acumulados (los canjes no bajan de nivel), carrusel de comercios adheridos y generación instantánea de cupones barriales. | **Economía Circular y Refuerzo Positivo**: Modelo mental claro de recompensa tangible. |
| **08** | `#screen-historial` *(NUEVA)* | Estaba comprimido como un sub-bloque al final de puntos sin paginación. | Pantalla dedicada con selector de filtro por material, mini-cards desplegables (ubicación, fecha, peso e impacto en $CO_2$) y paginación accesible. | **Desglose de Arquitectura de Información**: Evita scroll infinito y mejora la carga cognitiva. |
| **09** | `#screen-config` | Panel saturado con opciones mezcladas sin separación de riesgo. | Pantalla de Perfil del Vecino con nivel de impacto ambiental, credencial QR, selector de avatares, y switches de accesibilidad con **Mapeo Natural**. | **Separación de Zona de Peligro**: Modal `<dialog>` protegido para acciones destructivas. |
| **10** | `#screen-eventos` *(NUEVA)* | No contemplada en v1. | Listado de eventos municipales de reciclaje y jornadas de voluntariado en las que el vecino se anota (`"Asistiré"`). | **Compromiso Ciudadano**: Participación directa con la Subsecretaría de Ambiente. |
| **11** | `#screen-mas` *(NUEVA)* | Antes era un menú lateral desplegable flotante (`drawer`). | Pantalla de pantalla completa (`#screen-mas`) con cabecera fija, botón `"Volver"`, accesos a Cronograma Barrial, Centro de Ayuda y Configuración. | **Ergonomía Mobile**: Elimina conflictos de gestos swipe en pantallas táctiles. |

---

## 3. Matriz de los 3 Temas Visuales (Claro, Oscuro y Alto Contraste AAA)

| Componente Clave | Modo Claro (Default) | Modo Oscuro (`html.dark`) | Modo Alto Contraste (`body.high-contrast`) | Ratio WCAG |
| :--- | :--- | :--- | :--- | :--- |
| **Fondo General** | `#F8FAFC` (Slate 50) | `#020617` (Slate 950) | `#000000` (Negro absoluto) | — |
| **Superficie de Tarjetas** | `#FFFFFF` (Borde `#E2E8F0`) | `#0F172A` (Borde `#1E293B`) | `#000000` (Borde `#FFFFFF` 2.5px) | $\ge 21:1$ |
| **Texto Principal** | `#0F172A` (Slate 900) | `#FFFFFF` | `#FFFFFF` | $\ge 19.5:1$ |
| **Acento / Éxito (Vacío)** | `#047857` (Esmeralda 700) | `#34D399` (Esmeralda 400) | `#FFFF00` (Amarillo puro) | **19.56:1 (AAA)** |
| **Alerta / Lleno** | `#DC2626` (Rojo 600) | `#F87171` (Rojo 400) | `#FFFFFF` + trazo discontinuo | $\ge 7:1$ (AAA) |
| **Foco por Teclado** | `:focus-visible` `#34D399` 3px | `:focus-visible` `#34D399` 3px | `:focus-visible` `#FFFF00` 4px sólido | AAA |
