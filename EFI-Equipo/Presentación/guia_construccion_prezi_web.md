# Guía de Construcción en Prezi Web — EcoImperio (EFI 2026)

> **Cátedra**: Interfaz de Usuario — Examen Final Integrador (ITEC Río Cuarto)  
> **Objetivo**: Estructurar el lienzo de Prezi Web paso a paso, insertando imágenes reales, paletas cromáticas, diagramas y ejemplos concretos de cómo EcoImperio aplica **cada uno de los conceptos de la materia**.

---

## 1. Configuración Inicial del Lienzo en Prezi Web

1. Entrá a [prezi.com](https://prezi.com) e iniciá sesión con tu cuenta.
2. Hacé clic en **"Crear a partir de plantilla"** o **"Lienzo en blanco"** (Blank Canvas).
3. **Fondo del Lienzo (Background)**:
   - Configurar un color oscuro profesional: `#020617` o `#0F172A` (Slate 950), o insertar como imagen de fondo una vista aérea sutil en escala de grises de **Río Cuarto** con un velo oscuro del 60% de opacidad.
4. **Paleta de Colores Oficial de la Presentación**:
   - Primario Esmeralda: `#047857` (Verde Identitario EcoImperio)
   - Acento Dorado/Sol: `#F59E0B` / `#FFFF00` (Corona del Imperio / WCAG AAA)
   - Neutros de Soporte: `#FFFFFF` (Texto principal) y `#94A3B8` (Texto secundario)
   - Alerta / Ocupado: `#DC2626` (Campana llena)

---

## 2. Los 7 Nodos Zoomables en el Lienzo de Prezi (Distribución Espacial)

Ubicá en el lienzo general **7 Círculos o Marcos Temáticos** conectados en sentido horario con una línea punteada que simula el recorrido del camión de reciclaje o el Río Cuarto:

```
                  [ NODO 2: DCU & IA ]
                 (Oscar/Marta, Card Sorting)
                         ↗         ↘
   [ NODO 1: PORTADA & PITCH ]      [ NODO 3: WIREFRAMES v1 ]
  (Hardware IoT, Logos, Paleta)    (Boceto crudo, Dead-ends)
          ↑                                 ↓
   [ NODO 7: DEMO EN VIVO ]         [ NODO 4: MODELOS MENTALES ]
   (Web SPA, Test Mano Atada)       (Affordance, Gestalt, Fitts)
          ↖                                 ↙
               [ NODO 6: ACCESIBILIDAD ] ← [ NODO 5: DISEÑO ATÓMICO ]
              (Modo AAA 19.56:1, 3 Temas)   (Tokens, AutoLayout, 5 Estados)
```

---

## 3. Contenido Paso a Paso de Cada Nodo (Textos e Imágenes a Subir)

---

### 🟢 NODO 1: Portada, Génesis del Proyecto e Identidad de Marca
**Duración**: `00:00 - 02:30` | **Orador**: *Juan Falco*

* **Título Principal**: EcoImperio — Software Vivo y Ecosistema de Reciclaje Inteligente
* **Subtítulo**: Examen Final Integrador de Interfaz de Usuario · ITEC Río Cuarto 2026
* **Equipo**: Manuel Gómez, Tomás Benavidez, Valentino Cambria, Juan Falco

#### Sub-nodo 1.1: El Problema Comunitario y la Solución IoT
* **Texto a pegar**:
  > *"¿Por qué los folletos PDF y Google Maps no funcionan? Porque son estáticos y no dicen si la campana del barrio está llena. EcoImperio sensoriza las campanas mediante IoT (LoRaWAN ultrasónico) y conecta a los vecinos con comercios locales en una red de economía circular."*
* **Imágenes a subir en Prezi**:
  - `assets/logos/logo_horizontal.svg` (Logotipo principal).
  - `assets/logos/logo_app_icon.svg` (Squircle 1:1: corona dorada + brote verde).

#### Sub-nodo 1.2: Tokens de la Paleta Cromática
* Crear 4 cajas de color con sus códigos hexadecimales y función:
  - 🟩 `#047857` (Esmeralda Base — Razón: Evoca ecología y transmite confianza institucional).
  - 🟨 `#F59E0B` (Oro del Imperio — Razón: Gamificación, medallas y EcoPuntos).
  - ⬛ `#020617` (Pizarra Oscura — Razón: Descanso visual y ahorro OLED en celulares).
  - 🟨 `#FFFF00` (Amarillo Flúor — Razón: Contraste puro para baja visión).

---

### 🔵 NODO 2: DCU, Modelos Mentales del Vecino y Arquitectura de Información
**Duración**: `02:30 - 05:30` | **Orador**: *Tomás Benavidez* | **Conceptos**: `06_DCU` y `07_Arquitectura_de_Informacion`

#### Sub-nodo 2.1: User Personas (Regla de los 5 Puntos)
* **Tarjeta 1**: **Oscar Rodríguez (34 años, B° Alberdi)**
  - *Contexto*: Camina apurado con la bolsa en una mano y el celular en la otra.
  - *Necesidad*: Todo accesible con el pulgar en menos de 2 segundos.
* **Tarjeta 2**: **Marta Quiroga (64 años, B° Centro)**
  - *Contexto*: Docente jubilada con visión disminuida y deslumbramiento por el sol.
  - *Necesidad*: Botones grandes, texto escalable al 125% y modo de alto contraste.

#### Sub-nodo 2.2: Card Sorting y Tabla de Rotulado Semántico
* **Explicar cómo se eliminó la jerga técnica**:
  - ❌ *Término Técnico*: `"Nodos de geolocalización RSU"` $\rightarrow$ ✔ *Rótulo Ganador*: `"Mapa de Puntos Verdes"`.
  - ❌ *Término Técnico*: `"Capacidad volumétrica residual"` $\rightarrow$ ✔ *Rótulo Ganador*: `"Estado: (Vacío) / (Lleno)"`.
  - ❌ *Término Técnico*: `"Redención de incentivos mercantiles"` $\rightarrow$ ✔ *Rótulo Ganador*: `"Canjear en Comercios"`.
* **Sitemap Plano**: Mostrar el diagrama con profundidad máxima $\le 2$ clics.

---

### ⚪ NODO 3: El Esqueleto: Wireframes v1 Lo-Fi y Fricciones Detectadas
**Duración**: `05:30 - 08:30` | **Orador**: *Valentino Cambria* | **Conceptos**: `08_wireframe` y `01_UX`

#### Sub-nodo 3.1: ¿Por qué empezar en escala de grises?
* **Texto a pegar**:
  > *"Construir primero wireframes crudos sin color ni tipografías decorativas nos permitió evaluar la jerarquía funcional y la relación espacial de cada componente sin el sesgo estético del 'se ve lindo'."*
* **Imágenes a subir en Prezi**:
  - `assets/figma/v1_prototipo_baja_calidad_12_pantallas.svg` (Mostrar las pantallas en gris con cruces `[X]`).
  - `assets/figma/panel_transiciones_lofi_vs_hifi.svg` (La comparativa del antes y después).

#### Sub-nodo 3.2: Las 3 Fricciones Críticas Descubiertas en el Boceto
1. **El Dead-End de Inicio**: El boceto inicial bloqueaba con login forzado. Se resolvió con los 3 bloques de propuesta y *"Explorar sin cuenta"*.
2. **El Mapa Ciego**: 3 círculos grises no informaban estado. Se solucionó con codificación redundante triple.
3. **El Drawer Flotante Roto**: El menú lateral chocaba con gestos móviles; se sustituyó por la pantalla dedicada `#screen-mas`.

---

### 🟣 NODO 4: Psicología Visual, Leyes de Gestalt, Affordance y Ley de Fitts
**Duración**: `08:30 - 11:30` | **Orador**: *Tomás Benavidez* | **Conceptos**: `03_Affordance`, `04_Gestalt` y `05_Estetica_Funcional`

#### Sub-nodo 4.1: Leyes de la Gestalt Aplicadas con Ejemplos Reales
* **Ley de Proximidad**: Etiquetas a 4px de los inputs, bloques a 16px.
* **Ley de Región Común**: Tarjetas con bordes nítidos para comercios e historial para que el usuario no mezcle un cupón con otro.
* **Patrón Z y Squint Test**: Al entrecerrar los ojos, el saldo grande (`1.250 pts`) y el botón central elevado de escáner dominan la vista.
* **Imagen a subir**: `assets/screenshots/captura_04_gestalt_ecopuntos.png`.

#### Sub-nodo 4.2: Affordance y Mapeo Natural
* **Affordance**: Botones con volumen y respuesta física (`active:scale-95`). Ningún ícono huérfano de texto.
* **Mapeo Natural**: Los switches de Modo Oscuro y Alto Contraste aplican el cambio al instante en la pantalla sin botón de "Guardar".
* **Ley de Fitts**: Áreas táctiles de $44\times 44\text{px}$ a $56\times 56\text{px}$ y Bottom Navbar anclada al alcance del pulgar.
* **Imagen a subir**: `assets/screenshots/captura_03_affordance_y_controles.png`.

---

### 🟡 NODO 5: De Wireframe a Software Vivo: Sistema de Diseño Atómico
**Duración**: `11:30 - 14:00` | **Orador**: *Valentino Cambria* | **Conceptos**: `08_++_Buenas_Practicas_Figma` y `09_Sistema_De_Disenio`

#### Sub-nodo 5.1: Jerarquía Atómica y Auto-Layout
* **Explicar la progresión**:
  - *Tokens*: Espaciados múltiplos de 4px, radios de esquina (Pill 9999px), paleta semántica.
  - *Átomos*: Botón de acción principal, input con validación, chips de filtro.
  - *Moléculas*: Tarjetas de comercios (50% imagen / 50% contenido).
  - *Organismos*: Barra de navegación de 5 pestañas y cabecera persistente.
* **Imagen a subir**: `assets/screenshots/captura_08_hifi_prototype.png` o `captura_09_sistema_disenio_escaner.png`.

#### Sub-nodo 5.2: La Matriz Obligatoria de los 5 Estados UI
* Mostrar la captura con los 5 estados de cada botón:
  1. `Default`: En reposo con ratio AA validado (5.48:1).
  2. `Hover`: Elevación visual al pasar cursor.
  3. `Active`: Presión táctil (scale-98%).
  4. `Focus`: Anillo verde esmeralda `:focus-visible` de 3px para teclado.
  5. `Disabled`: Bloqueo anti-doble clic involuntario.
* **Imagen a subir**: `assets/screenshots/captura_05_cinco_estados_ui.png`.

---

### 🟠 NODO 6: Accesibilidad Universal (WCAG 2.2 AAA) y los 3 Temas
**Duración**: `14:00 - 16:30` | **Orador**: *Manuel Gómez* | **Conceptos**: `02_Usabilidad_y_Accesibilidad` y `10_Accesibilidad_Aplicada`

#### Sub-nodo 6.1: Principios POUR y Codificación Redundante
* **Perceptible**: No depender del color. El mapa usa:
  - **Color**: Verde (Vacío) vs Rojo (Lleno).
  - **Ícono**: Pin de ubicación vs Ícono de alerta/prohibido.
  - **Texto Explícito**: `(Vacío)` vs `(Lleno)` siempre legible.
* **Operable**: Navegación 100% por teclado con atajos nativos (`Tab`, `Shift+Tab`, `Enter`, `Esc`).

#### Sub-nodo 6.2: Modo Alto Contraste AAA (19.56:1) y Temas
* Mostrar la comparativa de los 3 temas:
  - **Modo Claro**: Para oficinas y descanso interior.
  - **Modo Oscuro**: Para visualización nocturna en la vía pública (`#020617`).
  - **Modo Alto Contraste AAA**: Fondo `#000000`, trazo blanco y texto amarillo `#FFFF00` con **ratio de 19.56:1** (supera por mucho el ratio exigido de 7:1).
* **Imágenes a subir**:
  - `assets/screenshots/captura_02_modos_visuales_contraste.png`.
  - `assets/screenshots/captura_02_modos_visuales_oscuro.png`.
  - `assets/screenshots/captura_06_accesibilidad_config.png`.

---

### 🔴 NODO 7: Demostración Interactiva en Vivo de la Web SPA
**Duración**: `16:30 - 20:00` | **Guía de Demo**: *Manuel Gómez (Equipo completo)*

#### El Recorrido en Vivo frente al Tribunal:
1. **Paso 1: Splash & Acceso Rápido Demo**: Entrar con la cuenta de Oscar Rodríguez en 1 clic.
2. **Paso 2: Muro de Comunidad**: Filtrar entre depósitos y eventos comunitarios.
3. **Paso 3: Consulta en el Mapa**: Seleccionar B° Norte lleno (alerta preventiva) y desvío a Alberdi.
4. **Paso 4: Escáner QR Inteligente**: Elegir *Vidrio (GL 70)*, evidenciar cómo la app lo reasigna automáticamente al *Punto Limpio Plaza Roca* y sumar 15 pts.
5. **Paso 5: Billetera y Canje Real**: Abrir Historial, ver el ahorro de $CO_2$, canjear cupón en *Almacén Natural* y comprobar el descuento instantáneo en `LocalStorage`.
6. **Paso 6: La Prueba de la Mano Atada**: Activar Modo Alto Contraste, apagar el mouse y operar toda la app exclusivamente con teclado.

---

## 4. Checklist de Material Listo para Cargar en Prezi

| Archivo / Recurso | Dónde está en tu proyecto | En qué nodo va |
| :--- | :--- | :--- |
| **Logotipos Vectoriales** | `EFI-Equipo/Presentación/assets/logos/` | Nodo 1 (Portada e Identidad) |
| **Wireframes Lo-Fi Completos** | `EFI-Equipo/Presentación/assets/figma/v1_prototipo_baja_calidad_12_pantallas.svg` | Nodo 3 (Evolución de Wireframes) |
| **Panel Comparativo Lo-Fi vs Hi-Fi** | `EFI-Equipo/Presentación/assets/figma/panel_transiciones_lofi_vs_hifi.svg` | Nodo 3 (Transición antes/después) |
| **Captura Gestalt & Ecopuntos** | `EFI-Equipo/Presentación/assets/screenshots/captura_04_gestalt_ecopuntos.png` | Nodo 4 (Gestalt y Squint Test) |
| **Captura Affordance & Controles** | `EFI-Equipo/Presentación/assets/screenshots/captura_03_affordance_y_controles.png` | Nodo 4 (Affordance y Ley de Fitts) |
| **Captura Matriz 5 Estados UI** | `EFI-Equipo/Presentación/assets/screenshots/captura_05_cinco_estados_ui.png` | Nodo 5 (Diseño Atómico) |
| **Capturas Alto Contraste y Oscuro** | `EFI-Equipo/Presentación/assets/screenshots/captura_02_modos_visuales_contraste.png` | Nodo 6 (Accesibilidad WCAG AAA) |
| **Captura Mapa y Filtros Facetados** | `EFI-Equipo/Presentación/assets/screenshots/captura_07_mapa_buscador_filtros.png` | Nodo 6 (Codificación redundante) |
| **Presentación Local Interactiva** | `EFI-Equipo/Presentación/presentacion_prezi.html` | Backup 100% offline para el aula |
