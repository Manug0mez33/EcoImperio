# 04. Gestalt y Jerarquía Visual: El Orden del Caos

## 1. Fundamentación Teórica (Hassan Montero)
* **Leyes de la Gestalt aplicadas al Software:** Mecanismos perceptuales automáticos e inconscientes mediante los cuales el cerebro agrupa y organiza estímulos visuales en estructuras coherentes[cite: 63, 144]:
  * *Ley de Proximidad:* Elementos cercanos entre sí y distanciados del resto se perciben como una unidad funcional o semántica conjunta[cite: 63, 144].
  * *Ley de Semejanza / Similitud:* Elementos que comparten atributos visuales (forma, color, tamaño, orientación) se agrupan intuitivamente[cite: 63, 144].
  * *Ley de Cierre y Continuidad:* El sistema cognitivo tiende a completar contornos abiertos y sigue instintivamente senderos o alineaciones suaves[cite: 64, 144].
  * *Ley de Región Común:* Elementos contenidos dentro de un límite o caja cerrada comparten contexto común[cite: 64, 66].
* **Jerarquía Visual y Atención Selectiva:** La atención humana es un recurso limitado y selectivo[cite: 76]. Si todos los elementos compiten con igual intensidad visual, ninguno capta el foco de atención[cite: 76, 144].
  * *Propiedades determinantes del peso visual:* Tamaño[cite: 77, 144], color y contraste cromático[cite: 77, 144], posición espacial[cite: 77, 144], orientación y movimiento/animación[cite: 77].
  * *Espacio en Blanco / Negativo:* Lejos de ser un vacío decorativo, actúa activamente descomprimiendo la carga cognitiva, permitiendo una exploración visual fluida y otorgando elegancia estética[cite: 57, 58, 144].
* **Patrones de Exploración Visual:**
  * *Patrón en F (Jacob Nielsen):* Recorrido habitual en páginas o pantallas de alta densidad informativa o lectura de texto (lectura horizontal superior, desplazamiento vertical a la izquierda y segundo barrido más corto)[cite: 78, 144].
  * *Patrón en Z:* Barrido diagonal y angular característico de páginas de aterrizaje (landing pages) y pantallas de bienvenida con foco en llamados a la acción (CTA)[cite: 144].

## 2. Enfoque y Criterio de la Cátedra (Clase 4 del Profesor)
* **El usuario no lee, escanea:** El cerebro busca la ruta de menor resistencia cognitiva; si no identifica la opción deseada en 3 segundos, surge frustración[cite: 144].
* **Gestalt traducido a código de desarrollo:**
  * *Proximidad = Margin y Padding:* El espaciado no es cosmético; una etiqueta (`label`) debe estar pegada a su `input`, y el botón de acción debe permanecer adyacente a su tarjeta y separado de elementos de otra entidad para evitar compras o selecciones erróneas[cite: 47, 144].
  * *Semejanza = Consistencia de Componentes UI:* La persistencia de clases visuales (ej. `.btn-primary`, `.btn-danger`) es obligatoria; cambiar colores arbitrariamente obliga al usuario a reaprender los patrones en cada pantalla[cite: 144].
  * *Continuidad = Inducción al Scroll / Swipe:* En listas o carruseles horizontales, cortar intencionalmente la última tarjeta visible al borde de la pantalla comunica la existencia de más contenido sin requerir rótulos explícitos[cite: 144].
* **Control de Pesos Visuales y Diferenciación de Acciones:**
  * Separación tipográfica: El valor principal (ej. Total: $2.500 en `24px` / `h1`) debe dominar sobre información secundaria (costo de envío en `12px` / `span`)[cite: 144].
  * Codificación por color: Acciones primarias positivas con alto contraste; acciones destructivas o secundarias atenuadas o relegadas a bordes/grises[cite: 144].
* **El Test del Entrecerrar los Ojos (Squint Test):** Criterio de evaluación rápida para verificar que, al desenfocar la vista sobre la pantalla, lo único que domine sea el CTA principal del flujo[cite: 144].

## 3. Directrices de Implementación Técnica en el Proyecto
* **Estructura Espacial y Ley de Proximidad (CSS/Layout):**
  * Agrupar campos de formulario y tarjetas mediante clases de espaciado estricto (ej. `gap-2` interno entre label e input, `gap-6` entre grupos de campos no relacionados).
  * Envolver entidades independientes en contenedores con bordes o fondos sutiles aprovechando la Ley de Región Común (tarjetas o `cards` con `rounded-lg border bg-surface p-4`)[cite: 64, 66].
* **Semejanza y Consistencia en la Librería de Componentes:**
  * Estandarizar botones en un componente reutilizable (`<Button variant="primary | secondary | destructive">`), garantizando que todas las acciones análogas de la app mantengan idéntica paleta, padding y tipografía[cite: 144].
* **Diseño para Escaneo Visual (Patrones en F y en Z):**
  * Para pantallas transaccionales o landing: Ubicar el identificador/logo arriba a la izquierda, perfil/navegación a la derecha, propuesta de valor al centro y el CTA principal de máxima jerarquía antes del primer pliegue de scroll[cite: 144].
  * Para tablas de gestión o paneles de datos: Alinear identificadores clave a la izquierda en negrita, permitiendo escaneo vertical rápido según el patrón en F[cite: 144].
* **Validación mediante el Test del Entrecerrar los Ojos:**
  * Aplicar a nivel CSS un filtro de desenfoque temporal (`filter: blur(4px)`) para comprobar en desarrollo si el botón de acción principal y los encabezados sobresalen claramente sobre el fondo y elementos neutros[cite: 144].

## 4. Trazabilidad para la Entrega y Defensa (Documento + Presentación)
* **Para el Documento de Investigación (Parte 1 de la Consigna):**
  * **Sección de Principios de Gestalt:** Documentar con capturas de pantalla la aplicación de proximidad en formularios/listas de tarjetas, región común en contenedores modulares y continuidad en componentes con navegación horizontal o listas[cite: 1, 63, 64, 144].
  * **Sección de Jerarquía Visual:** Detallar la escala tipográfica adoptada (`h1`, `h2`, `body`, `caption`) y la escala de contraste de botones, argumentando cómo orientan la atención del usuario en menos de 3 segundos[cite: 76, 77, 144].
* **Para la Presentación Prezi / Defensa Oral (Parte 2 de la Consigna):**
  * **Demostración Gráfica:** Proyectar la pantalla principal de la aplicación aplicando el "Test del Entrecerrar los Ojos" (o mapa de calor visual) para justificar la jerarquía visual lograda[cite: 1, 144].
  * **Argumento oral para el tribunal:** *"Aplicamos las leyes de Gestalt para convertir código de estilos en claridad perceptual: cada espaciado de margen y padding obedece a la Ley de Proximidad, y la estandarización de componentes garantiza la Ley de Semejanza[cite: 63, 144]. La jerarquía visual fue construida mediante el Patrón en Z y pesos visuales diferenciados, asegurando que el objetivo principal del usuario sea identificable de un solo escaneo[cite: 76, 144]"*.