# 08. De un Wireframe a un Software Vivo: Prototipado Interactivo y Figma

## 1. Fundamentación Teórica (Hassan Montero)
* **Wireframes (Bocetos de Interfaz):** Esquematizaciones de la interfaz que documentan la distribución espacial, ordenación jerárquica y comportamiento básico de los elementos y componentes de cada pantalla sin distracciones visuales[cite: 138]. Articulan la relación directa entre la Arquitectura de Información y el aspecto visual definitivo[cite: 138].
  * *Baja Fidelidad:* Representación estructural ("esqueleto") mediante bloques neutros y rótulos funcionales; prioriza la agilidad de iteración y la conceptualización rápida sobre el detalle[cite: 138].
  * *Alta Fidelidad:* Incorpora precisión visual, paleta cromática, tipografías reales y microinteracciones de alta fidelidad estética[cite: 138].
* **Diagramación de la Interacción y Prototipos Navegables:** Diseñar software trasciende las vistas estáticas; implica documentar cómo el sistema responde en tiempo real a las acciones del usuario[cite: 111, 148].
  * Los prototipos interactivos simulan el comportamiento del producto final, permitiendo evaluar secuencias completas, detectar brechas en la ejecución y mitigar errores de navegación antes de escribir código[cite: 18, 113, 114, 148].
* **Diseño Modular y Reutilización:** La interfaz debe estructurarse a partir de componentes discretos y reutilizables[cite: 116]. Cambiar un módulo en su definición central actualiza su consistencia en todas sus instancias de pantalla[cite: 116, 148].

## 2. Enfoque y Criterio de la Cátedra (Clase 8 del Profesor)
* **La Evolución Progresiva del Prototipado:**
  1. *Boceto en Papel:* Trazos manuales rápidos para validar ideas de flujo preliminares[cite: 148].
  2. *Wireframe de Baja Fidelidad (Figma/Grisáceo):* Jerarquía funcional y distribución sin colores, imágenes ni tipografías decorativas[cite: 148].
  3. *Prototipo Interactivo (Software Vivo):* Simulación funcional navegable con enlaces, microinteracciones, animaciones y diseño visual completo[cite: 148].
* **Valor Técnico para el Desarrollador:** Figma opera como el borrador visual y funcional previo al frontend[cite: 148]. Prototipar y validar el flujo con usuarios reales antes de programar evita refactorizaciones masivas y descarte de código[cite: 141, 146, 148].
* **Anatomía Básica del Wireframe:** Encabezado/barra superior, menú o navegación principal, área de contenido central, botones de acción claros, campos de entrada (`input fields`) y rótulos semánticos comprensibles[cite: 148].
* **La Lógica de Interacción en Figma:**
  * *Triggers (Disparadores):* `On click`, `While hovering` (microinteracciones de reposo/sobrevuelo) y `On drag` (gestos en carruseles y móviles)[cite: 148].
  * *Actions (Respuestas):* `Navigate to / Maps to` (cambio de pantalla), `Open overlay` (ventanas modales o desplegables contextuales), `Scroll to` (anclas) y `Back`[cite: 148].
  * *Animations (Transiciones):* `Instant`, `Dissolve` y `Smart Animate` para simular dinamismo y continuidad de estados visuales[cite: 148].

## 3. Directrices de Implementación Técnica en el Proyecto
* **Estructura Jerárquica y Modular (Figma a Código):**
  * Definir pantallas dentro de *Frames* estandarizados respetando resoluciones reales para desktop o mobile (según el enfoque de la entrega de la EFI)[cite: 1, 148].
  * Crear componentes base (`Master Components`) para botones, campos de entrada, tarjetas y barras de navegación, asegurando que las modificaciones de diseño se propaguen de forma sincronizada[cite: 116, 148].
* **Diseño de Interacción Funcional (Flujos sin callejones sin salida):**
  * Toda pantalla navegable en el prototipo debe tener un camino de regreso (`Back` o breadcrumbs) o retorno al panel principal[cite: 147, 148].
  * Implementar transiciones coherentes: cambios modales mediante `Open overlay` con fondo oscurecido para enfocar la atención, y cambios transaccionales mediante `Smart Animate` o `Dissolve`[cite: 148].
* **Buenas Prácticas Estructurales:**
  * Respetar el flujo de escaneo visual estándar: de arriba hacia abajo y de izquierda a derecha (o patrón en Z)[cite: 144, 148].
  * Priorizar el espacio en blanco para otorgar descanso visual y delimitar regiones funcionales claras sin saturación de cajas[cite: 57, 144, 148].

## 4. Trazabilidad para la Entrega y Defensa (Documento + Presentación)
* **Para el Documento de Investigación (Parte 1 de la Consigna):**
  * **Evolución del Prototipado:** Presentar la comparativa gráfica: boceto inicial / wireframe de baja fidelidad en escala de grises vs. prototipo navegable final de alta fidelidad[cite: 1, 138, 148].
  * **Mapa de Navegación del Prototipo:** Captura general del Canvas de Figma mostrando el grafo de conexiones interactivas ("noodling") entre frames para evidenciar los caminos de interacción modelados[cite: 1, 114, 148].
* **Para la Presentación Prezi / Defensa Oral y Demo (Parte 2 de la Consigna):**
  * **Demostración Navegable en Vivo (Figma / Web SPA):** Ejecutar el prototipo en modo presentación y recorrer el flujo principal de principio a fin sin usar atajos manuales de teclado ajenos a la interfaz[cite: 1, 148].
  * **Argumento técnico para el tribunal:** *"Antes de escribir la capa visual definitiva, construimos wireframes de baja fidelidad para validar la jerarquía funcional y la distribución de la información sin distracciones estéticas[cite: 138, 148]. Posteriormente evolucionamos el sistema a un prototipo interactivo en Figma con componentes reutilizables y microinteracciones precisas, permitiendo validar la usabilidad y navegación con usuarios finales antes de consolidar la arquitectura de software definitiva[cite: 113, 116, 148]"*.