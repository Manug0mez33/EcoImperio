# 05. Estética Funcional: Color, Tipografía y Componentes UI

## 1. Fundamentación Teórica (Hassan Montero)
* **El Color como Recurso Comunicativo y Emocional:** El color trasciende lo puramente decorativo; impacta en la estética subjetiva (lo bello es percibido automáticamente como más fácil de usar) y desempeña una función crítica de codificación y organización de la información[cite: 41, 42, 54].
  * *Límite de procesamiento cognitivo:* Debe restringirse la paleta activa a un máximo aproximado de cinco colores para evitar saturar la capacidad de procesamiento visual del usuario[cite: 42].
  * *Teoría de los Procesos Oponentes y Combinación:* La visión humana procesa la luz por canales antagónicos (blanco-negro, rojo-verde, azul-amarillo)[cite: 44]. Deben evitarse combinaciones de colores saturados incompatibles (ej. texto azul sobre fondo amarillo o texto rojo sobre fondo azul) que producen vibración visual y fatiga inmediata[cite: 44].
  * *Saturación y Énfasis:* Los colores saturados atraen el foco visual fuertemente pero generan fatiga si se usan de forma extendida; deben reservarse para acentos críticos[cite: 44].
  * *Codificación Redundante (A11y Cromática):* Dado que cerca del 4% de la población general (8% de hombres y 1% de mujeres) presenta deficiencias en la percepción del color (daltonismo o visión monocromática), el color jamás debe ser el único medio para transmitir un mensaje o estado crítico[cite: 43, 44].
* **Legibilidad e Inteligibilidad Tipográfica:**
  * *Legibilidad (Accesibilidad visual):* Determinada por el contraste adecuado con el fondo, tamaño suficiente para diversas agudezas visuales, interlineado estándar (alrededor de 1,5), longitud de línea moderada y tipografías sin ornamentos superfluos[cite: 80, 81]. Evitar bloques de texto completos en mayúsculas sostenidas o cursiva excesiva[cite: 81].
  * *Inteligibilidad (Usabilidad semántica):* Mensajes breves, predecibles, consistentes y adaptados al vocabulario del usuario, utilizando formas verbales para acciones sin tecnicismos innecesarios[cite: 81, 82].
* **Diseño Modular y Estados de Componentes:** Diseñar en base a componentes discretos, modulares y reutilizables garantiza flexibilidad y consistencia en todo el ciclo de vida del software[cite: 115].

## 2. Enfoque y Criterio de la Cátedra (Clase 5 del Profesor)
* **La Interfaz como Sistema Lógico:** La estética visual no es una decisión artística subjetiva ni un gusto personal; es un sistema coherente de variables, tokens y reglas que guían el comportamiento del usuario[cite: 145].
* **Arquitectura de Color y Psicología Funcional:**
  * *Color Primario:* Tono identitario de marca y acción principal (CTA)[cite: 145]. Azules o celestes se prefieren para transmitir estabilidad, profesionalismo, calma y protección de datos[cite: 145].
  * *Color Secundario:* Tonos neutros o grises para acciones secundarias o de menor urgencia ("Ver más", "Cancelar") sin competir por la atención[cite: 145].
  * *Colores Semánticos de Alerta Inmediata:*
    * 🟢 **Success (Verde):** Aprobación, confirmación, éxito y alivio[cite: 145].
    * 🔴 **Danger (Rojo):** Alerta biológica crítica, error y freno a acciones destructivas[cite: 145].
    * 🟡 **Warning (Amarillo/Naranja):** Precaución moderada, límites y advertencias de estado intermedio[cite: 145].
    * 🔵 **Info (Azul claro/Cian):** Novedades, consejos y avisos contextuales no bloqueantes[cite: 145].
* **Escala Tipográfica Estandarizada:** Consistencia estricta en la jerarquía tipográfica sin improvisar valores en CSS[cite: 145]:
  * `h1`: `32px` (Título principal / contexto de pantalla)[cite: 145].
  * `h2`: `24px` (Subtítulos / encabezados de módulo)[cite: 145].
  * `body`: `16px` (Texto estándar de lectura confortable)[cite: 145].
  * `caption`: `12px` (Metadatos, fechas, notas aclaratorias)[cite: 145].
  * *Tipografía Sans-serif:* Uso de familias limpias y legibles en pantalla (`Inter`, `Roboto`, `system-ui`)[cite: 145].
* **Anatomía y Ciclo de Vida de los Componentes UI (Los 5 Estados del Botón):**
  1. *Default:* Estado pasivo de reposo[cite: 145].
  2. *Hover:* Respuesta interactiva sutil (oscurecimiento o realce) que anticipa la acción[cite: 145].
  3. *Active:* Feedback kinestésico del click (sensación de hundimiento/contracción)[cite: 145].
  4. *Focus:* Indicador accesible visible (anillo perimetral para navegación con Tab)[cite: 145].
  5. *Disabled:* Atenuación visual en escala de grises con bloqueo de puntero[cite: 145].

## 3. Directrices de Implementación Técnica en el Proyecto
* **Tokens de Color Semántico y Contraste (Tailwind / CSS Variables):**
  * Configurar variables semánticas en el tema central:
    * `--color-primary`, `--color-secondary`
    * `--color-success`, `--color-danger`, `--color-warning`, `--color-info`
  * Cumplir estrictamente la relación de contraste mínima de **4.5:1** (WCAG AA) para todo texto visible sobre botones o fondos coloreados[cite: 142, 145].
  * Complementar todo aviso semántico con ícono y texto (nunca depender únicamente de que el borde o el texto se ponga rojo o verde) para dar soporte a usuarios con daltonismo[cite: 43, 44].
* **Tipografía Estructurada y Legible:**
  * Aplicar fuentes Sans-Serif sans-serif con `line-height: 1.5` en párrafos y longitud de línea contenida (máximo 65–75 caracteres por línea) para optimizar la lectura continua[cite: 80, 81, 145].
  * Apegar las clases de texto a la escala tipográfica predefinida (`text-2xl` para títulos, `text-base` para cuerpo, `text-xs` para leyendas)[cite: 145].
* **Componentización con Cobertura Total de Estados:**
  * Todo componente botón o input interactivo debe implementar explícitamente sus 5 pseudo-clases/estados: `:hover`, `:active`, `:focus-visible` (anillo de foco con alto contraste) y `:disabled` (`cursor-not-allowed`, opacidad reducida)[cite: 145].
  * Prevenir errores humanos aplicando el color de peligro (`danger`) exclusivamente a acciones destructivas irreversibles, separándolas de las acciones de confirmación[cite: 52, 53, 145].

## 4. Trazabilidad para la Entrega y Defensa (Documento + Presentación)
* **Para el Documento de Investigación (Parte 1 de la Consigna):**
  * **Sistema de Diseño (Tokens de Color e Identidad):** Mostrar la paleta del proyecto desglosada en Color Primario, Secundario y Semánticos, justificando la psicología de cada tono y adjuntando la matriz de contraste WCAG AA[cite: 1, 142, 145].
  * **Ficha de Componentes UI:** Incluir una tabla o captura con la anatomía visual de los componentes principales (botones, campos de formulario) exhibiendo los 5 estados interactivos[cite: 1, 145].
  * **Jerarquía Tipográfica:** Detallar la escala tipográfica adoptada y su justificación de legibilidad digital[cite: 1, 80, 145].
* **Para la Presentación Prezi / Defensa Oral (Parte 2 de la Consigna):**
  * **Demostración de Microinteracciones:** Demostrar en vivo cómo el botón primario responde a la interacción física (`hover`, `active`, `focus`), destacando el valor de la retroalimentación inmediata para evitar brechas de evaluación[cite: 1, 19, 98, 145].
  * **Argumento técnico para el tribunal:** *"Tratamos la UI no como un boceto estático, sino como un sistema de diseño funcional vivo[cite: 115, 145]. La paleta semántica responde a principios de psicología cognitiva y accesibilidad cromática WCAG AA, y cada componente cuenta con sus cinco estados programados para brindar certeza operativa continua[cite: 142, 145]"*.