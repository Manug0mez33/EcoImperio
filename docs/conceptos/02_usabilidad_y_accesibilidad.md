# 02. Usabilidad y Accesibilidad: La Base del Software Real

## 1. Fundamentación Teórica (Hassan Montero)
* **Usabilidad como Atributo No Universal:** Un sistema no es usable "en abstracto", sino en relación con una **audiencia específica** y un **propósito determinado**[cite: 10].
* **Doble Dimensión de la Usabilidad:**
  * **Dimensión Objetiva (Inherente):** Medible cuantitativamente mediante la observación de tareas[cite: 10]:
    * *Facilidad de aprendizaje (Learnability):* Facilidad al interactuar por primera vez[cite: 10].
    * *Eficiencia:* Tiempo y recursos invertidos tras haber aprendido el funcionamiento básico[cite: 10].
    * *Cualidad de ser recordado (Memorability):* Facilidad para reanudar el uso tras un periodo de inactividad[cite: 10].
    * *Eficacia:* Tasa de error, gravedad de las equivocaciones y rapidez para recuperar el estado correcto[cite: 11].
  * **Dimensión Subjetiva (Aparente):** Nivel de *satisfacción* y percepción de comodidad/agrado expresada por el usuario[cite: 11].
* **Accesibilidad (Diversidad Funcional):** Diseñar asumiendo la diversidad funcional de la audiencia, ya sea por limitaciones físicas o sensoriales permanentes, temporales o contextuales (iluminación, ruido, conectividad, dispositivos de entrada)[cite: 12].
* **Los 4 Principios de Accesibilidad (WCAG 2.0 / W3C):**
  1. *Perceptible:* La información e interfaces deben presentarse en modos que todos puedan percibir (contraste cromático, alternativas textuales)[cite: 12].
  2. *Operable:* Los componentes de control deben poder manejarse sin barreras (navegación por teclado, áreas táctiles amplias)[cite: 12].
  3. *Comprensible:* El contenido y la operación deben ser claros, predecibles y sin ambigüedades[cite: 12].
  4. *Robusto:* Compatibilidad garantizada con múltiples agentes de usuario y tecnologías asistivas (lectores de pantalla)[cite: 13].
* **Relación Esfuerzo-Beneficio:** El usuario tolera el esfuerzo de interacción solo si percibe un beneficio que lo justifique[cite: 34]. La fricción innecesaria destruye la motivación y provoca abandono de la tarea[cite: 34].

## 2. Enfoque y Criterio de la Cátedra (Clase 2 del Profesor)
* **"Nada es obvio":** Desmitificar el argumento del desarrollador ("pero si el botón está ahí, es obvio"). Si el usuario no lo encuentra o no lo entiende, la interfaz falló[cite: 141, 142].
* **El Mantra de Usabilidad:**
  $$\text{Usabilidad} = \text{Eficacia} + \text{Eficiencia} + \text{Satisfacción}$$
  (Lograr el objetivo + hacerlo rápido + no generar frustración)[cite: 142].
* **A11y como Responsabilidad Técnica:** Comprender el acrónimo (A + 11 letras + y) y adoptar las WCAG como el estándar obligatorio de ingeniería frontend[cite: 142].
* **Test de la Mano Atada (Operabilidad por Teclado):** Comprobar que cualquier flujo crítico sea ejecutable únicamente con `Tab`, `Shift+Tab`, flechas y `Enter`/`Space`, con un foco visible y orden secuencial lógico (`tabindex`)[cite: 142].
* **Regla de Contraste Cromático:** Exigencia estricta de un ratio mínimo de contraste de texto/fondo de **4.5:1** (Nivel AA) según WCAG para garantizar legibilidad tanto en modo claro como oscuro[cite: 81, 142].
* **Optimización del Esfuerzo desde el Código:**
  * Uso de atributos de autocompletado en campos de entrada (`autocomplete`)[cite: 142].
  * Validación instantánea en tiempo real sin esperar al submit[cite: 49, 142].
  * Estados de respuesta y retroalimentación inmediata frente al click[cite: 99, 142].

## 3. Directrices de Implementación Técnica en el Proyecto
* **HTML Semántico y Accesible (A11y / Robusto y Perceptible):**
  * Emplear etiquetas nativas (`<button>`, `<main>`, `<nav>`, `<header>`, `<article>`) en lugar de `<div>` con manejadores de click, asegurando semántica directa para lectores de pantalla.
  * Todas las imágenes de contenido deben incluir atributo `alt` descriptivo; los íconos puramente decorativos deben llevar `aria-hidden="true"`[cite: 12].
  * Los botones con solo ícono deben contener una etiqueta accesible (`aria-label="Cerrar modal"` o similar).
* **Navegación por Teclado y Estados de Foco (Operable):**
  * Mantener siempre visible el anillo de foco (`focus-visible:ring-2` o `outline`), sin removerlo con `outline: none` a menos que se reemplace por un indicador de foco evidente[cite: 142].
  * Asegurar un orden de tabulación predecible coincidente con el orden visual de lectura[cite: 142].
* **Contraste y Colorimetría (Perceptible):**
  * Comprobar que los textos principales alcancen al menos un contraste de **4.5:1** respecto a sus fondos de tarjeta o pantalla[cite: 142].
  * No confiar únicamente en el color para comunicar estados críticos (ej. ante un error de validación, acompañar el borde rojo con un ícono y un texto explicativo)[cite: 44, 45].
* **Reducción de Esfuerzo en Formularios (Eficiencia):**
  * Implementar validaciones en tiempo real asociadas al evento `onBlur` o `onChange` con mensajes claros y no culpabilizadores[cite: 49, 54, 142].
  * Incorporar valores por defecto razonables y sugerencias automáticas cuando existan listas extensas[cite: 47, 50].

## 4. Trazabilidad para la Entrega y Defensa (Documento + Presentación)
* **Para el Documento de Investigación (Parte 1 de la Consigna):**
  * **Sección de Conceptos Implementados:** Crear dos apartados explícitos:
    * *Usabilidad:* Documentar cómo se optimizaron la facilidad de aprendizaje y la eficacia del sistema (ej. reducción de pasos para completar la tarea principal de la app)[cite: 10, 11].
    * *Accesibilidad (A11y):* Explicar el cumplimiento de los 4 principios WCAG, adjuntando capturas de la paleta con la medición del ratio de contraste (> 4.5:1) y el árbol accesible / etiquetas semánticas empleadas[cite: 1, 12, 13, 142].
* **Para la Presentación Prezi / Defensa Oral (Parte 2 de la Consigna):**
  * **Demostración de Accesibilidad en Vivo:** Mostrar cómo la aplicación se puede operar 100% mediante teclado ("Test de la mano atada") evidenciando el foco visual continuo[cite: 1, 142].
  * **Cálculo del Contraste:** Mostrar una diapositiva con el comprobador de contraste en los botones de acción principal (CTA) tanto en tema claro como oscuro[cite: 142].
  * **Frase de Impacto para el Tribunal:** *"Demostramos que un producto digital no puede ser considerado usable si no es primero accesible para toda la comunidad[cite: 1, 12, 142]. Redujimos la brecha de esfuerzo-beneficio implementando validaciones inmediatas, soporte total por teclado y estándares WCAG AA[cite: 12, 142]"*.