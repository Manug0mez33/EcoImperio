# 09. Sistemas de Diseño, Diseño Atómico, Generación con IA y Microinteracciones

## 1. Fundamentación Teórica (Hassan Montero)
* **Diseño Modular y Escalabilidad de Interfaces:** Método estructural para gestionar la complejidad dividiendo sistemas amplios en subsistemas autónomos, pequeños y reutilizables[cite: 116, 150]. Pensar en componentes previene inconsistencias y optimiza los costos de mantenimiento visual y técnico[cite: 116, 150].
* **Visibilidad y Retroalimentación (Feedback Continuo):** Principio cardinal que exige informar al usuario del estado interno del sistema en tiempo real y mostrar el efecto inmediato de cada una de sus acciones, evitando la brecha de evaluación cognitiva[cite: 18, 98, 150].
* **Prevención del Error Humano mediante Feedback de Estado:** La presencia visual de estados activos, deshabilitados o en progreso previene acciones accidentales redundantes o destructivas[cite: 52, 98, 150].
* **Leyes de Gestalt y Jerarquía Visual en la Composición:** La integración de elementos aislados en módulos compuestos opera bajo las leyes de proximidad, similitud y región común, facilitando el escaneo visual y la comprensión instantánea[cite: 63, 64, 76].

## 2. Enfoque y Criterio de la Cátedra (Clase 9 del Profesor)
* **Sistemas de Diseño (Design Systems):** Colección estructurada y gobernada de componentes reutilizables con reglas coherentes de interacción y estilo visual[cite: 150]. Incluye tokens de color, escalas tipográficas, grillas/espaciados responsivos, iconografía y documentación funcional[cite: 150]. Referencia de estándar industrial: Material Design 3 (Google)[cite: 150].
* **Metodología de Diseño Atómico (Atomic Design - Brad Frost):**
  * 🧪 **Átomos:** Componentes indivisibles básicos (un botón, una etiqueta de texto, un campo de entrada, un ícono)[cite: 150].
  * ⚗️ **Moléculas:** Agrupaciones funcionales simples de átomos (buscador: input + ícono + botón; o tarjeta de ítem: imagen + título + botón)[cite: 150].
  * 🧬 **Organismos:** Estructuras complejas y autónomas compuestas por moléculas y átomos (header con logo + barra de búsqueda + perfil; o galería/grilla de tarjetas de productos)[cite: 150].
  * *Regla de Oro en Desarrollo:* "Si un elemento se reutiliza más de 2 veces, se convierte obligatoriamente en componente"[cite: 150].
* **Aceleración con IA y Agentes Autónomos (Google Stitch & MCP):**
  * *Google Stitch:* Agente de IA para transformar prompts textuales, bocetos o archivos de Figma en componentes y pantallas con código funcional (React, Tailwind, HTML)[cite: 150].
  * *Flujo MCP (Model Context Protocol) en Agentes:* Conexión del servidor MCP de Stitch con la suite del agente para importar el ADN de diseño (`DESIGN.md`), sincronizar tokens y generar componentes listos para producción de forma desatendida[cite: 150].
* **Microinteracciones y Animaciones con Propósito:**
  * No son ornamentos cosméticos; son disparadores de certeza: confirman clicks, expresan cambios de estado (toggles/switches) y guían la navegación[cite: 150].
  * *Smart Animate en Figma:* Interpolación automática de posición, volumen y color entre estados[cite: 150]. Construcción de componentes de interruptor (*Toggle Switch Off/On*) con dos variantes animadas mediante transiciones tipo *Ease In and Out*[cite: 150].
  * Patrones cinéticos: *Dissolve* para alertas/toasts, *Slide in/out* para cajones modales y *Push* para transiciones de pantalla[cite: 150].

## 3. Directrices de Implementación Técnica en el Proyecto
* **Estructura Atómica en el Código Frontend (React / Astro / Componentes):**
  * Organizar la arquitectura del proyecto siguiendo la jerarquía atómica:
    * `/components/atoms/`: Botones, inputs, badges, spinners, avatares[cite: 150].
    * `/components/molecules/`: SearchBar, FormField (label + input + error), CardItem[cite: 150].
    * `/components/organisms/`: Navbar, Footer, ProductGrid, ModalDialog[cite: 150].
* **Tokens y Consistencia Global (Design DNA):**
  * Configurar los tokens extraídos de Figma o del archivo `DESIGN.md` en el archivo de estilos central (Tailwind Config / CSS Variables) para que cualquier cambio en la base actualice todas las instancias hijas en cascada[cite: 150].
* **Programación de Microinteracciones y Estados Cinéticos:**
  * Implementar transiciones CSS fluidas (`transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`) en estados de sobrevuelo (`hover`), activación (`active`) y foco accesible (`focus-visible`)[cite: 145, 150].
  * Diseñar interruptores (toggles) y selecciones con feedback háptico o visual instantáneo antes de la persistencia asíncrona en backend[cite: 98, 150].
* **Blindaje de Operaciones Asíncronas (Loading & Feedback):**
  * Incorporar animaciones de carga contextuales (spinners o esqueletos animados) dentro del átomo botón mientras dure la llamada de red, impidiendo clicks duplicados y calmando la ansiedad del usuario[cite: 99, 146, 150].

## 4. Trazabilidad para la Entrega y Defensa (Documento + Presentación)
* **Para el Documento de Investigación (Parte 1 de la Consigna):**
  * **Sección de Sistema de Diseño y Diseño Atómico:** Diagramar la descomposición de la interfaz en Átomos, Moléculas y Organismos, justificando cómo garantiza consistencia y modularidad[cite: 1, 116, 150].
  * **Documentación de Microinteracciones:** Registrar la tabla de microinteracciones del sistema (Disparador $\rightarrow$ Estado $\rightarrow$ Respuesta visual/Smart Animate) con capturas de variantes en Figma[cite: 1, 150].
  * **Aceleración con IA (si se utilizó):** Reseñar brevemente el flujo de generación de UI asistida mediante IA/Stitch y el mantenimiento del archivo `DESIGN.md`[cite: 150].
* **Para la Presentación Prezi / Defensa Oral y Demo (Parte 2 de la Consigna):**
  * **Demostración de Microinteracciones en Vivo:** Activar un interruptor (*toggle* switch animado) o disparar un estado de validación con animación suave, explicando la función técnica del feedback[cite: 1, 98, 150].
  * **Argumento técnico para el tribunal:** *"Aplicamos la metodología de Diseño Atómico para concebir la interfaz como un sistema vivo escalable: cada átomo alimenta moléculas y organismos reutilizables en todo el frontend[cite: 116, 150]. Implementamos microinteracciones intencionales para brindar retroalimentación continua según los postulados de Norman y Hassan Montero, erradicando brechas de evaluación en cada cambio de estado del sistema[cite: 18, 98, 150]"*.