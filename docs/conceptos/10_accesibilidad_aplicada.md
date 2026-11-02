# 10. Accesibilidad Aplicada, UX Writing y Patrones Avanzados de Interacción

## 1. Fundamentación Teórica (Hassan Montero)
* **Accesibilidad como Responsabilidad Profesional:** No es diseñar para un colectivo aislado, sino reconocer la diversidad funcional de la audiencia y mitigar barreras derivadas de limitaciones permanentes, transitorias o impuestas por el entorno físico o tecnológico (iluminación solar, ruido, destreza motriz)[cite: 12, 151].
* **Legibilidad e Inteligibilidad Lingüística (Cap. III - Legibilidad e Inteligibilidad):**
  * *Legibilidad:* Propiedad del diseño tipográfico que permite percibir caracteres sin esfuerzo visual mediante contraste adecuado, tipografías no ornamentales, interlineado estándar ($\approx 1.5$) y longitud de línea contenida[cite: 80, 81, 151].
  * *Inteligibilidad:* Capacidad del usuario para comprender inequívocamente el sentido y alcance de los rótulos y mensajes[cite: 80, 81]. La mayoría de las brechas de interacción derivan de vocabulario técnico hermético o rótulos ambiguos[cite: 80, 81].
* **Mapeo Natural y Convenciones Semánticas:** La correspondencia entre acción y expectativa exige que los rótulos comuniquen con precisión el efecto de la acción (usar verbos directos que anticipen el resultado y erradicar textos genéricos como "Haga clic aquí")[cite: 81, 86, 87].
* **Prevención y Recuperación del Error Humano (Cap. III - Error Humano):**
  * Los mensajes de error nunca deben culpar al usuario de las limitaciones del sistema[cite: 52, 54].
  * Todo error debe presentarse en lenguaje humano comprensible, explicando la causa y ofreciendo la vía directa para rectificarlo o deshacer la acción[cite: 52, 54, 151].
* **Ergonomía Motriz y Ley de Fitts:** Reducir la precisión motriz exigida estableciendo dimensiones de control amplias y márgenes de separación suficientes para evitar pulsaciones erróneas involuntarias[cite: 83, 151].

## 2. Enfoque y Criterio de la Cátedra (Clase 10 del Profesor)
* **Accesibilidad Técnica (WCAG / W3C):**
  * *Ratio de Contraste Obligatorio:* Mínimo de **4.5:1** para texto normal (menor a 18px o 14px bold) según WCAG Nivel AA[cite: 151]. Rechazar gris claro (`#9CA3AF`) sobre blanco (`#FFFFFF`); favorecer negro/gris oscuro (`#111827`) sobre blanco[cite: 151].
  * *Tipografía Confortable:* Tamaño mínimo de **16px en dispositivos móviles** con `line-height` al 150% e Inter/Sans-serif limpias sin ornamentos[cite: 151].
  * *Áreas de Toque Táctiles (Targets):* Dimensión mínima de **44x44px** (Apple) o **48x48px** (Google) con padding perimetral para evitar activación accidental de elementos contiguos[cite: 151].
  * *Codificación Redundante (No depender solo del color o del icono):* Prohibido comunicar errores o estados críticos solo con cambio cromático o con un ícono aislado[cite: 151]. Exigir la tríada: color + ícono + texto descriptivo explícito (ej. ícono 🛒 + rótulo "Carrito", borde rojo + ícono ⚠️ + texto explicativo de solución)[cite: 151]. Enlaces siempre diferenciados por color más subrayado u otra pista visual[cite: 151].
* **UX Writing (Las palabras son diseño funcional):**
  * *Texto Funcional vs. Texto Decorativo:* El texto decorativo proviene de la retórica publicitaria ("¡Viví la experiencia más increíble!"); el texto funcional guía la acción y resuelve tres preguntas clave: *¿Qué debo hacer? ¿Qué pasó? ¿Qué viene después?*[cite: 151]
  * *Erradicación de Rótulos Ambiguos:* Reemplazar "OK", "Enviar", "Sí/No" por verbos de acción directos ("Guardar cambios", "Confirmar compra", "Cancelar reserva")[cite: 151].
* **Patrones Avanzados de Interacción:**
  * *Onboarding Empático:* Guía contextual en 2 o 3 pasos que evidencia beneficios tangibles inmediatos[cite: 151].
  * *Microcopys y Placeholders Instructivos:* Ejemplificar formatos esperados dentro del campo en vez de repetir el nombre del dato[cite: 151].
  * *Estados Vacíos (Empty States):* Eliminar mensajes secos ("Sin datos")[cite: 151]. Transformar el vacío en una oportunidad interactiva guiada (ilustración/ícono + explicación + botón de acción para crear o explorar)[cite: 151].
  * *Traducción Humana de Errores Técnicos:* Desterrar códigos HTTP ("Error 504", "Error 404") sustituyéndolos por explicaciones cotidianas con botón de reintento o retorno seguro[cite: 151].

## 3. Directrices de Implementación Técnica en el Proyecto
* **Tokens de Estilo y Accesibilidad (Tailwind / CSS):**
  * Garantizar en botones y enlaces la clase de dimensión mínima táctil: `min-h-[44px] min-w-[44px]` (o `h-12` / 48px)[cite: 151].
  * Configurar colores de texto de alto contraste: usar `text-gray-900` (`#111827`) para cuerpos y encabezados sobre fondos claros, asegurando contrastes superiores a 7:1[cite: 151].
  * Estilos de enlaces: aplicar `underline underline-offset-4 decoration-primary` para no depender exclusivamente del matiz azul[cite: 151].
* **Estandarización de UX Writing en Componentes:**
  * En modales de confirmación, nombrar los botones con el verbo de la consecuencia: `<Button variant="destructive">Eliminar cuenta</Button>` y `<Button variant="outline">Mantener cuenta</Button>`[cite: 151].
  * En campos con error, asociar semánticamente el mensaje mediante atributos ARIA (`aria-invalid="true" aria-describedby="error-id"`), mostrando el texto de asistencia inmediatamente debajo del input[cite: 13, 47, 151].
* **Empty States y Recuperación de Flujo:**
  * Programar componentes condicionales para colecciones vacías (favoritos, historial, carritos):
    ```tsx
    // Patrón de Estado Vacío Accionable
    <EmptyState aria-hidden="true" icon="{<HeartIcon"/>}
      title="Todavía no agregaste favoritos"
      description="Explorá nuestros productos y tocá el corazón para guardarlos acá."
      action={<Button href="/catalogo">Explorar catálogo</Button>}
    />
    ```[cite: 151]

## 4. Trazabilidad para la Entrega y Defensa (Documento + Presentación)
* **Para el Documento de Investigación (Parte 1 de la Consigna):**
  * **Matriz de Auditoría de UX Writing y WCAG:** Incorporar la tabla comparativa de 5 columnas requerida por la cátedra auditando los flujos clave del proyecto[cite: 1, 151]:
    | Elemento Original | Copy Mejorado (UX Writing) | Patrón de Interacción | Criterio WCAG Cumplido | Sugerencia UI / Visual Implementada |
    | :--- | :--- | :--- | :--- | :--- |
    | Botón: "OK"[cite: 151] | "Confirmar reserva" | Microcopy de Acción Directa[cite: 151] | Target táctil $\ge 44\text{px}$; Contraste $> 4.5:1$[cite: 151] | Botón primario `#10B981` con texto blanco a 16px bold[cite: 149, 151]. |
    | Error: "Error 500"[cite: 151] | "No pudimos procesar tu solicitud. Intentá de nuevo en unos segundos." | Mensaje de Error Humano con Solución[cite: 151] | No depender únicamente de color rojo; incluir ícono y texto descriptivo[cite: 151] | Banner con fondo tenue, borde rojo, ícono ⚠️ y botón "Reintentar"[cite: 151]. |
    | Carrito: Solo ícono 🛒[cite: 151] | Ícono 🛒 + "Carrito (2)" | Navegación con Codificación Redundante[cite: 151] | Perceptible y comprensible sin ambigüedad simbólica[cite: 12, 151] | Etiqueta de texto visible junto al símbolo en el header[cite: 151]. |
    | Pantalla: "Sin datos"[cite: 151] | "No tenés turnos programados. Reservá tu primera cita acá." | Estado Vacío (Empty State)[cite: 151] | Texto legible a 16px; jerarquía tipográfica clara[cite: 151] | Ilustración contextual con CTA destacado al flujo de reserva[cite: 151]. |
  * **Verificación de Accesibilidad Cromática:** Captura con herramienta de contraste certificando que todos los textos cumplen el ratio mínimo de 4.5:1 (AA) o 7:1 (AAA)[cite: 142, 151].
* **Para la Presentación Prezi / Defensa Oral y Demo (Parte 2 de la Consigna):**
  * **Demostración de Patrones Avanzados:** Mostrar en vivo una pantalla en estado vacío y provocar intencionalmente una validación de error para exhibir el feedback empático y comprensible[cite: 1, 151].
  * **Argumento técnico para el tribunal:** *"Aplicamos las directrices de UX Writing y accesibilidad avanzada entendiendo que el lenguaje y el microcopy son componentes de arquitectura y no adornos de marketing[cite: 151]. Eliminamos rótulos ambiguos, garantizamos áreas táctiles ergonómicas bajo la Ley de Fitts, respetamos el contraste mínimo de 4.5:1 de las WCAG y dotamos a cada estado del sistema de codificación redundante para no depender únicamente del color[cite: 83, 142, 151]"*.