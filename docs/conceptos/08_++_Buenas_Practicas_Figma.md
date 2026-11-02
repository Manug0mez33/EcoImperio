# 08++. Buenas Prácticas en Figma: Componentes, Variantes, Auto-Layout y Constraints

## 1. Fundamentación Teórica (Hassan Montero)
* **Diseño Modular y Sistemas de Componentes:** Diseñar mediante módulos autónomos y reutilizables gestiona la complejidad técnica y visual del software[cite: 116]. Cada elemento actúa como una pieza estandarizada que mantiene sus propiedades, estados y relaciones funcionales consistentes en todo el sistema[cite: 116, 149].
* **Ley de Fitts y Ergonomía del Control:** El tamaño y la proximidad física del área de interacción determinan el esfuerzo motor del usuario[cite: 83]. Establecer alturas mínimas táctiles (como botones de $48\text{px}$) y áreas clicables completas en tarjetas y controles previene errores y optimiza la velocidad de ejecución[cite: 48, 83, 149].
* **Visibilidad del Estado y Retroalimentación (Feedback):** Las interfaces deben proporcionar respuestas visuales directas ante eventos de interacción (reposo, sobrevuelo o desactivación) para evitar la brecha de evaluación y brindar certidumbre operativa inmediata[cite: 18, 98, 149].
* **Consistencia e Inteligibilidad Visual:** La estandarización tipográfica y cromática garantiza una lectura predecible y reduce la carga cognitiva, permitiendo al usuario reconocer funciones familiares en cualquier módulo[cite: 70, 80, 82, 149].

## 2. Enfoque y Criterio de la Cátedra (Clase 8++ del Profesor)
* **Estructura Mobile-First y Fundaciones:** Inicio de la maqueta a partir de un marco estándar para dispositivos móviles (`iPhone 14 / 390x844px`) con fondo neutro minimalista (`#FFFFFF`)[cite: 149].
* **Tokens Tipográficos y Estilos Globales:** Prohibición de valores sueltos e improvisados[cite: 145, 149]. Definición y aplicación de estilos globales guardados en Figma para sincronizar actualizaciones automáticas en todo el archivo[cite: 149]:
  * *Título:* `Inter Bold 24pt` | `#111827`[cite: 149].
  * *Subtítulo:* `Inter Medium 18pt` | `#374151`[cite: 149].
  * *Cuerpo:* `Inter Regular 16pt` | `#6B7280`[cite: 149].
* **Tokens de Color del Sistema:**
  * *Primario:* `#3B82F6` (azul brillante identitario)[cite: 149].
  * *Secundario / CTA:* `#10B981` (verde esmeralda para llamados a la acción)[cite: 149].
  * *Neutros:* `#F3F4F6` (fondos de tarjeta), `#E5E7EB` (bordes y separadores) y `#111827` (texto contrastado)[cite: 149].
* **Componentes y Variantes Interactivas:**
  * Botón principal (`width: 160px`, `height: 48px`, radio `8px`, texto centrado `Inter Medium 16pt` en blanco)[cite: 149].
  * Propiedades de variante para el estado: `Default` (`#10B981`), `Hover` (`#059669`) y `Disabled` (`#D1FAE5` con texto gris `#9CA3AF`)[cite: 149].
  * Microinteracción integrada: disparo `While hovering` $\rightarrow$ `Change to` estado `Hover` en la pestaña de prototipado[cite: 148, 149].
* **Auto-Layout Dinámico (`Shift + A`):** Construcción de contenedores elásticos sin posicionamiento absoluto[cite: 149].
  * Tarjeta de producto modular con dirección vertical, `gap: 8px`, `padding: 12px`, alineación superior-centrada y radio de esquina de `12px`[cite: 149].
* **Constraints y Responsividad:** Asignar restricciones de posición relativas (`Escala` horizontal, anclaje `Superior` o `Inferior`) para garantizar que las tarjetas y sus elementos internos se adapten fluidamente a cambios de ancho sin romperse[cite: 149].
* **Estructura de Pantalla Transaccional:**
  * Scroll vertical (`Vertical Overflow`) en el contenedor principal de la vista[cite: 149].
  * Disposición de tarjetas en pila mediante Auto-Layout vertical con separación de `16px`[cite: 149].
  * Barra de navegación inferior anclada fija (`Position: Fixed`) de `390x70px` con sombra difusa `#E5E7EB` e iconografía minimalista de acceso clave (Home, Categorías, Carrito, Perfil)[cite: 149].

## 3. Directrices de Implementación Técnica en el Proyecto
* **Traducción de Auto-Layout y Constraints a Código (Flexbox / Grid / Tailwind):**
  * Todo marco con Auto-Layout vertical con `padding: 12px` y `gap: 8px` se traduce de forma directa a clases utilitarias limpias (`flex flex-col p-3 gap-2 rounded-xl bg-gray-100`)[cite: 149].
  * Las constraints de escala y anclaje inferior del CTA se implementan mediante anchos relativos completos (`w-full`) o autoalineación (`mt-auto self-stretch`) para evitar desbordes visuales[cite: 149].
* **Arquitectura de Componentes con Estados Cerrados:**
  * Implementar el componente botón con soporte explícito de propiedades (`variant="primary"`, `state="default | hover | disabled"`) garantizando la altura de accesibilidad táctil de $48\text{px}$ según la Ley de Fitts[cite: 83, 149].
  * Respetar las transiciones suaves (`transition-colors duration-150`) para replicar el comportamiento interactivo configurado en las variantes de Figma[cite: 148, 149].
* **Persistencia del Menú Fijo (Bottom Navigation Bar):**
  * La barra inferior de acciones críticas debe fijarse en viewport móvil mediante posicionamiento sticky/fixed (`fixed bottom-0 left-0 w-full bg-white shadow-md z-50`), garantizando acceso con el pulgar a las funciones primarias del sistema[cite: 83, 149].

## 4. Trazabilidad para la Entrega y Defensa (Documento + Presentación)
* **Para el Documento de Investigación (Parte 1 de la Consigna):**
  * **Sistema de Diseño y Fundaciones:** Documentar los tokens globales tipográficos (Título, Subtítulo, Cuerpo) y cromáticos (Primario, Secundario CTA, Neutros) aplicados de forma consistente en Figma[cite: 1, 149].
  * **Ficha Técnica de Componentes y Auto-Layout:** Adjuntar capturas que exhiban la estructura del Auto-Layout de las tarjetas (espaciados internos, paddings y constraints) y la matriz de variantes del botón con sus tres estados[cite: 1, 116, 149].
* **Para la Presentación Prezi / Defensa Oral y Demo (Parte 2 de la Consigna):**
  * **Demostración de Responsividad y Microinteracciones:** Demostrar cómo las tarjetas se redimensionan sin deformar el contenido gracias a Auto-Layout y Constraints, y ejecutar en vivo el cambio interactivo de estado `:hover` sobre el botón CTA[cite: 1, 148, 149].
  * **Argumento técnico para el tribunal:** *"Implementamos las buenas prácticas avanzadas de diseño modular en Figma utilizando Auto-Layout dinámico y Constraints responsivas, lo que garantiza una correlación directa entre los componentes visuales y las propiedades flexbox del código final[cite: 116, 149]. Cada elemento fue concebido con estilos globales y variantes interactivas de tres estados para asegurar consistencia estética, feedback inmediato y cumplimiento de los estándares táctiles de la Ley de Fitts[cite: 80, 83, 98, 149]"*.