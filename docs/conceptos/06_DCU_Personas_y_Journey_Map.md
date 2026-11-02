# 06. Diseñar para Humanos: DCU, Arquetipos (Personas) y User Journey Map

## 1. Fundamentación Teórica (Hassan Montero)
* **Diseño Centrado en el Usuario (DCU / UCD):** Filosofía y marco metodológico donde el proceso interactivo está conducido y respaldado por información empírica sobre la audiencia objetiva del producto[cite: 15, 16]. 
  * *Naturaleza Iterativa:* El DCU no es lineal ni secuencial; avanza en ciclos continuos de refinamiento que abarcan: **Planificación/Investigación** $\rightarrow$ **Diseño/Prototipado** $\rightarrow$ **Evaluación** $\rightarrow$ **Implementación** $\rightarrow$ **Monitorización**[cite: 15, 16, 17].
  * *Toma de Decisiones Profesional:* A diferencia del diseño participativo, en el DCU los usuarios no deciden la interfaz[cite: 16]; el equipo de diseño e ingeniería asume la responsabilidad de traducir los hallazgos empíricos en decisiones de software eficaces[cite: 16].
* **Personajes y Escenarios (Personas / Alan Cooper):** Técnica que elimina la brecha entre la investigación teórica y el desarrollo práctico mediante modelos arquetípicos de usuarios que reflejan patrones de conducta, hábitos, metas y frustraciones reales (no estereotipos imaginados)[cite: 122].
  * Se definen entre 2 y 5 personajes representativos acompañados por *escenarios*, narraciones creíbles que describen el contexto específico de uso[cite: 122].
* **Mapas de Experiencias (User Journey Maps):** Documentos cronológicos que grafican el recorrido completo del usuario en una línea temporal[cite: 123]. Integran puntos de contacto (*touchpoints*), metas intermedias, curvas emocionales/reacciones y las brechas de interacción detectadas[cite: 123].

## 2. Enfoque y Criterio de la Cátedra (Clase 6 del Profesor)
* **"Vos NO sos tu usuario":** Criterio central de la cátedra que desmantela el sesgo del desarrollador[cite: 146]. La facilidad técnica de una consola o formulario no es transferible a la audiencia real[cite: 146].
* **Las 4 Fases Prácticas del DCU en Desarrollo:**
  1. *Entender el contexto:* Investigar hábitos, limitaciones de hardware, conectividad y entorno físico del usuario[cite: 146].
  2. *Especificar requisitos:* Traducir las limitaciones del entorno en requerimientos de UI y lógica frontend/backend[cite: 146].
  3. *Producir soluciones:* Generar prototipos iterativos que resuelvan la fricción[cite: 146].
  4. *Evaluar:* Poner a prueba la solución con usuarios antes de desplegar; omitir la evaluación ocasiona colapsos en producción, retrabajo y soporte innecesario[cite: 146].
* **Construcción de Fichas de Personas Efectivas (Regla de los 5 Puntos):**
  1. *Basadas en datos reales:* Evitar suposiciones infundadas de oficina[cite: 146].
  2. *Contexto de uso detallado:* Dispositivo, luminosidad, estabilidad de red, movilidad[cite: 146].
  3. *Puntos de dolor (Frustraciones):* Las barreras que el código debe solucionar[cite: 146].
  4. *Objetivos y motivaciones concretas:* El éxito según el usuario, no el sistema[cite: 146].
  5. *Acotadas (2 a 4 arquetipos):* Síntesis manejable para todo el equipo de desarrollo[cite: 146].
* **Mapeo de la Curva Emocional (User Journey):** Identificar caídas emocionales durante el flujo (ansiedad, frustración) para transformarlas en oportunidades directas de desarrollo[cite: 146].

## 3. Directrices de Implementación Técnica en el Proyecto
* **Blindaje de Estados de Red y Carga (Prevención de Errores DCU):**
  * Manejo proactivo de desconexión o latencia: implementar persistencia local (LocalStorage o caché) y sincronización resiliente ante caídas de señal[cite: 146].
  * Deshabilitar botones de acción transaccional (`disabled={isSubmitting}`) acompañados de *spinners* o esqueletos visuales apenas se detecta el primer evento de click, evitando solicitudes duplicadas en el servidor[cite: 145, 146].
* **Mitigación Directa de Puntos de Dolor Identificados:**
  * Si el arquetipo sufre fricción por formularios repetitivos, programar atajos funcionales (ej. botón directo de "Reordenar último pedido" o "Repetir última reserva")[cite: 146].
  * Implementar detección/relleno automático de datos frecuentes mediante geolocalización o parámetros precargados[cite: 146].
* **Diseño UI Guiado por el Contexto Ergonómico:**
  * Si el usuario opera en movilidad o con motricidad reducida, definir objetivos táctiles amplios (mínimo $48\text{px}$ a $60\text{px}$) respetando la Ley de Fitts[cite: 83, 146].
  * Garantizar redundancia en la retroalimentación: confirmar acciones mediante estados visuales, mensajes accesibles y alertas sonoras o hápticas opcionales[cite: 44, 99, 146].

## 4. Trazabilidad para la Entrega y Defensa (Documento + Presentación)
* **Para el Documento de Investigación (Parte 1 de la Consigna):**
  * **Sección de Usuarios y Comunidad:** Incluir de 2 a 3 Fichas de Personas detalladas con nombre, arquetipo, contexto de uso, frustraciones principales y objetivos[cite: 1, 122, 146].
  * **User Journey Map del Proyecto:** Diagramar el recorrido del flujo clave de la app estructurado en: Etapa $\rightarrow$ Acción $\rightarrow$ Canal/Pantalla $\rightarrow$ Pensamientos $\rightarrow$ Emoción $\rightarrow$ Oportunidad de Implementación Técnica[cite: 123, 146].
  * **Ciclo DCU Aplicado:** Explicar una iteración real donde una prueba o evaluación temprana modificó una decisión de interfaz antes de codificar la versión final[cite: 15, 146].
* **Para la Presentación Prezi / Defensa Oral (Parte 2 de la Consigna):**
  * **Diapositiva de Arquetipos y Validación:** Mostrar la Persona central y explicar cómo su principal frustración fue resuelta por una funcionalidad concreta del software[cite: 1, 122, 146].
  * **Argumento oral para el tribunal:** *"No construimos una interfaz para el programador, sino para seres reales en contextos reales, aplicando las 4 fases del Diseño Centrado en el Usuario[cite: 16, 146]. El User Journey Map nos permitió localizar caídas críticas en la experiencia y convertirlas en soluciones técnicas como autoguardado, feedback inmediato y atajos transaccionales[cite: 53, 99, 146]"*.