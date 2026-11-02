# 03. Modelos Mentales, Affordance y Mapeo Natural

## 1. Fundamentación Teórica (Hassan Montero)
* **Affordance (Norman):** Propiedades perceptibles de un objeto que determinan y hacen obvio cómo puede ser usado sin necesidad de instrucciones explicativas[cite: 27]. Si se requiere explicar verbalmente cómo accionar un elemento, el diseño presenta fallas de base[cite: 27].
  * *Riesgos del diseño plano (Flat Design):* Eliminar relieves, sombras y bordes volumétricos reduce el affordance, impidiendo distinguir controles interactivos de texto o contenedores estáticos[cite: 27, 28].
* **Modelos Mentales:** Representaciones conceptuales internas construidas por el usuario a partir de sus experiencias previas para predecir el resultado de sus acciones[cite: 29].
  * *Modelo del Diseñador vs. Modelo del Usuario:* El diseñador domina el funcionamiento técnico interno del sistema (modelo del sistema), mientras que el usuario domina la tarea cotidiana que intenta realizar (modelo de interacción)[cite: 29, 30]. La interfaz debe diseñarse adaptada al modelo mental del usuario, nunca al del creador[cite: 30].
  * *Convenciones e Íconos:* La correspondencia entre símbolo y significado puede ser literal, metafórica, metonímica o arbitraria-convencional[cite: 69, 70]. El ícono del disquete para guardar es una convención sociocultural que pierde sentido para nuevas generaciones o audiencias ajenas a dicho contexto histórico[cite: 70].
* **Mapeo Natural:** Correspondencia directa y lógica entre la acción ejecutada sobre un control y el resultado observable en el sistema, apoyada en analogías del mundo físico o convenciones espaciales[cite: 87].
  * Evita la *brecha de evaluación* y la *brecha de ejecución*, eliminando la duda sobre qué efecto provocará una acción[cite: 18, 19, 87].

## 2. Enfoque y Criterio de la Cátedra (Clase 3 del Profesor)
* **El botón que pide ser clickeado:** Prohibición explícita de depender de etiquetas redundantes como "Click aquí" o "Presione este botón"[cite: 87, 143]. La interactividad debe comunicarse por sí misma mediante volumen, contraste, cursor y microinteracciones[cite: 143].
* **Cuestionar las convenciones (El test del usuario no condicionado):** Evaluar si los íconos críticos (comprar, cancelar, perfil) son autoexplicativos o si dependen de metáforas obsoletas o de nicho[cite: 143]. Cuando una convención gráfica sea ambigua, debe complementarse obligatoriamente con una etiqueta textual descriptiva[cite: 143].
* **Mapeo Natural Espacial y Dinámico:** La interfaz debe replicar la disposición espacial y física de aquello que manipula[cite: 143]. Si un control numérico o deslizante aumenta hacia la derecha, el objeto representado debe escalar visualmente en la misma dirección sin demoras ni disonancias espaciales[cite: 143].

## 3. Directrices de Implementación Técnica en el Proyecto
* **Tratamiento Visual de Elementos Accionables (Affordance Real):**
  * Aplicar elevación sutil mediante sombras (`box-shadow`), bordes delimitados y cambios de cursor (`cursor-pointer`) en botones y tarjetas clickeables[cite: 143].
  * Definir estados visuales diferenciados y perceptibles para `:hover`, `:focus-visible`, `:active` y `:disabled`[cite: 143]. Un botón presionado debe contraerse levemente o simular profundidad para confirmar la interacción[cite: 27].
* **Convención Semántica e Iconografía Concurrente:**
  * No confiar el éxito de la navegación o de acciones irreversibles únicamente a un ícono suelto[cite: 143]. Acompañar los íconos de texto descriptivo (ej. ícono de tacho junto a la palabra "Eliminar", carrito junto a "Ver Carrito") o tooltips contextuales[cite: 53, 143].
  * Emplear íconos estándar de la industria (lupa para búsqueda, engranaje/ajustes para configuración, silueta para usuario) asegurando reconocimiento instantáneo por sobre la originalidad gráfica[cite: 70, 83].
* **Mapeo Espacial en Controles:**
  * Colocar las confirmaciones a la derecha y las cancelaciones a la izquierda en idiomas de lectura occidental[cite: 53, 87].
  * Posicionar controles de ajuste directo (como switches, toggles o contadores) inmediatamente adyacentes al elemento que modifican, evitando paneles de configuración distantes o desconectados[cite: 143].

## 4. Trazabilidad para la Entrega y Defensa (Documento + Presentación)
* **Para el Documento de Investigación (Parte 1 de la Consigna):**
  * **Sección de Affordance y Botonería:** Adjuntar capturas de los componentes atómicos (botones primarios, secundarios y tarjetas interactivas) demostrando cómo la elevación, bordes y estados `:hover` hacen evidente que son accionables sin necesidad de textos explicativos[cite: 1, 27, 143].
  * **Sección de Modelos Mentales y Mapeo Natural:** Explicar cómo la arquitectura y el lenguaje del sistema se alinean con la rutina diaria de la comunidad a la que sirve (evitando terminología técnica de base de datos o lógica interna)[cite: 1, 30, 82].
* **Para la Presentación Prezi / Defensa Oral (Parte 2 de la Consigna):**
  * **Caso de Demostración:** Proyectar la pantalla de manipulación directa de la app (un carrito interactivo, una reserva de turnos en calendario visual o un configurador de elementos)[cite: 24, 25, 143].
  * **Explicación frente al Tribunal:** *"Diseñamos la interfaz respetando el modelo mental de nuestros usuarios cotidianos, aplicando mapeo natural directo entre la selección del control y la respuesta inmediata en pantalla[cite: 29, 30, 87, 143]. Eliminamos brechas de ejecución dotando a cada componente de affordance físico real sin recurrir a instrucciones redundantes[cite: 19, 27, 143]"*.