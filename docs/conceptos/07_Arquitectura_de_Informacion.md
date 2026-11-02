# 07. Arquitectura de Información y Card Sorting: Organizar el Caos

## 1. Fundamentación Teórica (Hassan Montero)
* **Definición de Arquitectura de Información (AI):** Disciplina, arte y técnica de organizar, estructurar, clasificar y etiquetar los contenidos y funcionalidades de un producto digital para permitir que el usuario encuentre su vía hacia el conocimiento y resuelva sus objetivos sin frustración[cite: 13, 14, 15, 147].
  * *Dimensiones de la AI:* Atributo del diseño, actividad profesional, objeto documental (árboles de contenido y especificaciones) y disciplina cognitiva interdisciplinar[cite: 13, 14, 111].
* **Búsqueda y Recuperación de Información:**
  * *Necesidades Sintácticas vs. Semánticas:* El usuario tiene una necesidad sintáctica cuando conoce de antemano el nombre o término exacto de lo que busca; tiene una necesidad semántica cuando posee una idea conceptual abstracta y debe explorar visualmente para reconocer la opción adecuada[cite: 30, 31, 32].
  * *Estrategias de Búsqueda:* Interrogación por buscador (*querying*) para necesidades sintácticas directas, y navegación/exploración (*browsing*) para necesidades semánticas y orientación general[cite: 31, 32].
* **Esquemas de Clasificación y Taxonomías:**
  * *Esquemas:* Clasificación orientada a la tarea (verbos/acciones), orientada a la audiencia (segmentada por perfil) o temática (sustantivos agrupados por afinidad conceptual)[cite: 38, 39, 40].
  * *Estructuras:* Taxonomía plana, jerárquica (equilibrio entre ancho y profundidad para evitar fatiga decisoria) y facetada/multijerárquica (filtrado dinámico para catálogos extensos)[cite: 92, 93, 94, 95, 96, 97].
* **Método de Card Sorting (Agrupación de Tarjetas):** Técnica empírica de investigación y evaluación destinada a descubrir el modelo mental semántico de los usuarios respecto a cómo relacionan conceptos[cite: 106, 147].
  * *Variantes:* Abierto (el usuario agrupa y bautiza categorías; ideal en investigación/planificación) y Cerrado (el usuario ubica tarjetas en categorías prefijadas; ideal en evaluación para validar taxonomías)[cite: 106, 107, 110, 147].
  * *Treejack (Pruebas de Árbol):* Método complementario para evaluar si los usuarios logran localizar un ítem navegando exclusivamente la jerarquía textual de contenidos[cite: 109, 110].

## 2. Enfoque y Criterio de la Cátedra (Clase 7 del Profesor)
* **El backend no define la interfaz:** Prohibición estricta de diagramar menús o vistas según la estructura de tablas de la base de datos o el organigrama corporativo[cite: 147]. Al usuario final no le interesa la lógica interna de los datos, sino su propia tarea[cite: 146, 147].
* **Los 4 Pilares Prácticos de la AI:**
  1. *Sistemas de Organización:* Criterios de agrupamiento (por categorías, frecuencia de uso, orden cronológico o tareas directas)[cite: 89, 147].
  2. *Sistemas de Etiquetado (Labeling / Rotulado):* Redacción centrada en vocabulario cotidiano ("Historial de Compras", "Eliminar cuenta"), erradicando nombres de métodos o variables de programación (`Execute_User_Termination`)[cite: 81, 147].
  3. *Sistemas de Navegación:* Rutas claras de movimiento (menú principal, barras laterales, pie de página y migas de pan / *breadcrumbs* contextuales: `Inicio > Productos > Ropa > Remeras`)[cite: 147].
  4. *Sistemas de Búsqueda:* Barras predictivas, autocompletado y filtros facetados cuando la navegación lineal es insuficiente[cite: 49, 94, 95, 147].
* **Card Sorting como Evidencia:** Herramienta obligatoria para definir la taxonomía sin caer en suposiciones de equipo[cite: 146, 147]:
  * *Abierto:* Para estructurar el mapa de navegación desde cero[cite: 106, 147].
  * *Cerrado:* Para testear la robustez de las categorías creadas[cite: 107, 147].
  * *Híbrido:* Categorías base con libertad para proponer nuevas clasificaciones[cite: 147].
* **Máxima de Localizabilidad:** "Si el usuario no encuentra una función en tu sistema, para él esa función no existe, por más perfecta que sea su implementación en código"[cite: 147].

## 3. Directrices de Implementación Técnica en el Proyecto
* **Estructura de Navegación Clara y Jerárquica:**
  * Implementar migas de pan (*breadcrumbs*) accesibles en rutas profundas para mantener ubicado al usuario y habilitar retorno en un click[cite: 147].
  * Balancear la profundidad de navegación: limitar a un máximo de 2 o 3 niveles de clics la ruta para completar tareas esenciales, equilibrando ancho y profundidad según Hick y Norman[cite: 48, 96, 97].
* **Rotulado Semántico y Humano en Componentes:**
  * Toda etiqueta de botón o ítem de menú debe utilizar verbos claros en infinitivo o términos descriptivos directos, evitando acrónimos técnicos y nomenclaturas internas de base de datos[cite: 81, 82, 147].
  * Alinear la rotulación del botón de navegación con el título exacto de la pantalla de destino (`Consistencia de Rótulos`)[cite: 82].
* **Sistemas de Búsqueda y Filtrado Facetado:**
  * En pantallas con listados o catálogos, implementar barra de búsqueda con autocompletado para resolver necesidades sintácticas[cite: 31, 49, 147].
  * Incorporar filtros facetados multijerárquicos (por categoría, estado o rango) para resolver necesidades semánticas mediante reducción progresiva de opciones[cite: 32, 94, 95, 147].

## 4. Trazabilidad para la Entrega y Defensa (Documento + Presentación)
* **Para el Documento de Investigación (Parte 1 de la Consigna):**
  * **Sitemap / Árbol de Contenidos:** Incluir el diagrama jerárquico del sistema, detallando los 4 sistemas (Organización, Rotulado, Navegación y Búsqueda)[cite: 1, 111, 147].
  * **Matriz de Card Sorting:** Documentar la prueba de Card Sorting realizada (sea abierta o cerrada) con la muestra de tarjetas, las categorías consolidadas y la justificación de cómo el resultado definió el menú definitivo[cite: 1, 106, 107, 147].
  * **Trazabilidad de Rotulado:** Presentar una tabla comparativa de etiquetas descartadas (sesgo de desarrollador/BD) vs. etiquetas implementadas (modelo mental del usuario)[cite: 29, 30, 147].
* **Para la Presentación Prezi / Defensa Oral (Parte 2 de la Consigna):**
  * **Demostración de Navegabilidad y Orientación:** Recorrer un flujo profundo mostrando las migas de pan (*breadcrumbs*) y los filtros dinámicos, demostrando cómo se previene la desorientación espacial[cite: 1, 147].
  * **Argumento oral para el tribunal:** *"Construimos la Arquitectura de Información validándola mediante Card Sorting con usuarios reales, garantizando que el rotulado y la navegación respondan a su modelo mental semántico y no a la estructura de nuestras tablas relacionales[cite: 30, 106, 147]. Con esto evitamos brechas de ejecución y aseguramos que cada funcionalidad esté disponible a menos de tres interacciones de distancia[cite: 18, 96, 147]"*.