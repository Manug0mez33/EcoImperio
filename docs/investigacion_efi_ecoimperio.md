# Documento de Investigación y Fundamentación UX/UI — EcoImperio

> **Asignatura**: Interfaz de Usuario — Examen Final Integrador (EFI)  
> **Proyecto**: EcoImperio — Red de Reciclaje Barrial y Gamificación Ciudadana (Río Cuarto, Córdoba)  
> **Versión del Prototipo**: v1.2 / v2.0 (Mobile-First Web SPA & Figma)

---

## 1. Resumen de la Idea

**EcoImperio** es una aplicación web progresiva (Mobile-First SPA) diseñada para incentivar, organizar y gamificar el reciclaje domiciliario en los barrios de la ciudad de **Río Cuarto**.

El problema central que aborda es la desconexión entre la intención del vecino de separar sus residuos reciclables (plástico PET, cartón, papel, vidrio y aluminio) y la incertidumbre cotidiana sobre:
1. **Dónde está la Campana Verde o Punto Limpio más cercano** a su domicilio.
2. **En qué estado de capacidad se encuentra el contenedor** en tiempo real (evitando que el vecino camine con bolsas de reciclables hasta una campana que ya está desbordada o llena).
3. **Qué beneficio tangible recibe** por sostener el hábito en el tiempo.

A través de un mapa barrial interactivo con estados de ocupación en tiempo real (`Vacío / Disponible` vs. `Lleno`), un escáner de códigos QR/materiales en el punto de depósito y una billetera digital de **EcoPuntos**, cada vecino suma puntos verificados que puede canjear por descuentos reales en **Comercios Adheridos de cercanía** (panaderías, librerías, cafeterías y almacenes de su propio barrio).

---

## 2. Datos de la Empresa / Organización

- **Nombre de la marca / producto**: **EcoImperio** (en articulación con la iniciativa de gestión ambiental de la *Municipalidad de Río Cuarto*, conocida históricamente como la *"Capital Alterna"* o *"El Imperio del Sur"*).
- **Eslogan**: *"Reciclá, sumá puntos, transformá tu ciudad — Unite a la comunidad verde de Río Cuarto"*.
- **Identidad Visual e Iconografía de Tienda (App Icon & Variantes de Logo)**:
  1. **App Icon / Store Badge (Formato Circular / Squircle 1:1)**: Círculo de fondo verde bosque profundo (`#1b4332` en claro / `#064e3b` con halo `#10b981` en oscuro), coronado en el borde superior por la **corona dorada (`#f59e0b`)** que alude al apodo de Río Cuarto (*"El Imperio"*), y en el centro el **brote orgánico de dos hojas (`#34d399` / `#d8f3dc`)** que simboliza regeneración ambiental.
  2. **Logotipo Tipográfico Principal (Horizontal / Vertical)**: Tipografía geométrica `Inter ExtraBold` / `Roboto Black` con alto peso visual, acompañada del isotipo de brote y corona.
  3. **Variante Monocromática / Alto Contraste (WCAG AAA)**: Versión en trazo amarillo puro (`#ffff00`) o blanco (`#ffffff`) sobre fondo negro absoluto (`#000000`) para máxima legibilidad en lectores con baja visión.

---

## 3. Valor Agregado (Diferenciación frente a Alternativas Abiertas o Gratuitas)

Frente a alternativas genéricas o gratuitas existentes (como mapas estáticos en Google My Maps publicados por municipios, folletos PDF en portales gubernamentales o planillas de horarios de recolección), **EcoImperio** aporta cuatro diferenciales concretos:

| Criterio | Alternativas Abiertas / Gratuitas (Google Maps, PDFs Municipales) | Valor Agregado de **EcoImperio** |
| :--- | :--- | :--- |
| **Estado del contenedor** | Estático: muestra la ubicación geográfica pero no si la campana está rebalsada o fuera de servicio. | **Semáforo de disponibilidad en tiempo real**: diferenciación por color + ícono + etiqueta textual (`Vacío` en verde vs. `Lleno` en rojo) para evitar viajes en vano. |
| **Motivación y retención** | Nula: depende exclusivamente del altruismo individual sin retroalimentación ni seguimiento. | **Economía circular barrial (EcoPuntos)**: gamificación con barra de progreso hacia metas claras y descuentos directos en comercios locales de Río Cuarto. |
| **Validación en sitio** | Inexistente: no registra el hábito ni orienta sobre qué material depositar frente al contenedor. | **Escáner QR y clasificador de materiales**: confirma qué tipo de residuo es reciclable (`PET 1`, `Cartón`, `Vidrio`) y acredita los puntos en el acto. |
| **Inclusión y Accesibilidad** | Mapas densos y PDFs no adaptados a pantallas móviles ni a personas mayores o con baja visión. | **Accesibilidad Universal (WCAG AA / AAA)**: 3 modos visuales (Claro, Oscuro, Alto Contraste), escalado tipográfico hasta `125%`, reducción de movimiento y navegación 100% por teclado/táctil con una sola mano. |

---

## 4. Impacto en la Comunidad Local (Río Cuarto)

1. **Impacto Ambiental Directo**: Reduce el volumen de residuos sólidos urbanos enterrados en el predio sanitario local y disminuye la basura dispersa alrededor de campanas verdes colapsadas (al redirigir a los vecinos hacia puntos con capacidad disponible en barrios como *Alberdi*, *Banda Norte*, *Centro*, *Bimaco*, *Abilene* y *Golf*).
2. **Impacto Económico Barrial**: A diferencia de los programas de fidelización de grandes cadenas comerciales, los **Comercios Adheridos** son emprendimientos locales de Río Cuarto (*Panadería El Imperio*, *Librería La Biblioteca*, *Café de la Plaza*), impulsando el consumo de cercanía.
3. **Inclusión Ciudadana Intergeneracional**: Su diseño contemplando personas mayores o con visión reducida permite que toda la familia participe del hábito sin barreras tecnológicas.

---

## 5. Implementación de los Conceptos Teóricos de la Cátedra

A continuación se detalla cómo se implementó técnicamente cada uno de los **10 bloques conceptuales** de la asignatura dentro de **EcoImperio**:

### 5.1. Concepto 01 — Experiencia de Usuario (UX vs. UI y los 5 Pilares)
- **Fundamento teórico**: Basado en Yusef Hassan Montero, el diseño no es decoración superficial (UI) sino resolución de problemas reales (UX) sostenida en 5 pilares: **Usabilidad, Accesibilidad, Utilidad, Desempeño y Emoción/Estética**.
- **Implementación en EcoImperio**:
  - **Desempeño percibido y cero parpadeo (FOUC)**: Un script crítico en el `<head>` lee las preferencias de tema y tamaño tipográfico desde `localStorage` antes del primer pintado de pantalla. Además, las acciones transaccionales muestran feedback inmediato mediante un componente Toast no bloqueante (`role="status" aria-live="polite"`).
  - **Prevención de errores sin culpar al usuario**: En Login, Registro y Configuración se eliminó el `alert()` nativo y se implementaron mensajes contextuales debajo de cada campo con instrucciones constructivas (ej. *"Ingresá los 10 dígitos sin 0 ni 15. Ej: 3584123456"*).
  - **Separación de acciones destructivas**: En `Configuración`, la acción *"Eliminar cuenta"* está aislada en una "Zona de peligro" al final de la vista y protegida por un modal `<dialog>` nativo donde el foco inicial recae en *"Cancelar"*.
- **Evidencia visual (Captura)**: `[Ver Captura 01: Validación constructiva en Registro y Modal de confirmación destructiva en Configuración]`.

### 5.2. Concepto 02 — Usabilidad y Accesibilidad (Principios POUR y WCAG 2.0/2.2)
- **Fundamento teórico**: La usabilidad es relativa al perfil del usuario, mientras que la accesibilidad es universal (Perceptible, Operable, Comprensible y Robusto — POUR).
- **Implementación en EcoImperio**:
  - **Prueba de la Mano Atada (100% Operable por Teclado)**: Todos los flujos (`Splash → Login → Mapa → Escáner → Mis EcoPuntos → Configuración`) son recorribles con `Tab`, `Shift+Tab`, `Enter`, `Espacio` y `Escape` (para cerrar el menú lateral o modales). El menú lateral (`#drawer-menu`) utiliza el atributo `inert` cuando está cerrado para evitar trampas de foco fuera de pantalla.
  - **Contraste Verificado (WCAG AA $\ge 4.5:1$ y WCAG AAA $\ge 7:1$)**: En Modo Claro y Oscuro se supera el ratio 4.5:1 (usando `#047857` para botones primarios con texto blanco a `5.48:1` y `slate-600`/`slate-300` para textos secundarios), mientras que el **Modo Alto Contraste** emplea fondo negro `#000000`, bordes blancos `#ffffff` y acentos amarillos `#ffff00` (`> 15:1`).
  - **Codificación Redundante**: En el mapa, el estado de las campanas nunca depende solo del color: combina **Color** (verde/rojo) + **Ícono distinto** (`location` vs `ban`) + **Etiqueta explícita entre paréntesis** (`Alberdi (Vacío)` vs `B° Norte (Lleno)`).
- **Evidencia visual (Captura)**: `[Ver Captura 02: Comparativa de los 3 modos visuales — Claro, Oscuro y Alto Contraste WCAG AAA]`.

### 5.3. Concepto 03 — Modelos Mentales, Affordance y Mapeo Natural
- **Fundamento teórico**: El usuario llega con modelos mentales previos (Leyes de Jakob) y necesita pistas visuales claras de cómo se opera cada objeto (**Affordance** de Norman) y correspondencia espacial (**Mapeo Natural**).
- **Implementación en EcoImperio**:
  - **Affordance táctil**: Los botones parecen botones reales gracias a su volumen, bordes redondeados, sombras y efecto de hundimiento físico al presionarlos (`transform: scale(0.98)` / `active:scale-95`). Jamás se usan textos ambiguos como *"Click aquí"*.
  - **Íconos acompañados de texto**: Tanto en la barra de navegación inferior (`Inicio`, `Mapa`, `Escáner`, `Puntos`, `Perfil`) como en el menú lateral y filtros del mapa, cada ícono va acompañado de su rótulo textual para evitar ambigüedad.
  - **Mapeo Natural**: Los toggles de Modo Oscuro, Alto Contraste, Tamaño de texto y Reducción de animaciones aplican el cambio en vivo en el mismo instante en que el usuario los acciona, sin obligarlo a presionar un botón de guardado.
- **Evidencia visual (Captura)**: `[Ver Captura 03: Affordance en Barra de Navegación Inferior, Filtros de Mapa y Controles en Vivo]`.

### 5.4. Concepto 04 — Psicología de la Gestalt y Jerarquía Visual
- **Fundamento teórico**: El cerebro agrupa estímulos visuales según las leyes de **Proximidad, Semejanza, Región Común, Continuidad y Cierre**, y escanea la pantalla siguiendo patrones **Z** y **F**.
- **Implementación en EcoImperio**:
  - **Ley de Proximidad**: En los formularios de Login, Registro y Perfil, cada `<label>` está a `4px` (`mb-1`) de su `<input>` correspondiente, mientras que los grupos de campos distintos están separados por `12px–16px` (`space-y-3` / `space-y-4`).
  - **Ley de Región Común**: La Card de Balance, las Cards de Comercios Adheridos, las Cards de Historial y las 4 secciones de Configuración están delimitadas por contenedores `<article>` y `<section>` con bordes, fondo diferenciado y `border-radius: 16px` (`rounded-2xl`).
  - **Patrón en Z (Splash y Mapa)**: El ojo inicia arriba a la izquierda (selector de tema / menú hamburguesa), cruza arriba a la derecha (badge de versión / avatar de perfil `OR`), baja en diagonal por el centro (identidad visual con silueta de Río Cuarto / marcadores del mapa) y remata abajo en el llamado a la acción principal (`"Comenzar"` / card flotante y botón central de Escáner).
  - **Prueba del Entrecerrar los Ojos (Squint Test)**: Al aplicar desenfoque sobre `Mis EcoPuntos`, el saldo `1.250 EcoPuntos` y el botón central destacan inmediatamente como primer nivel jerárquico.
- **Evidencia visual (Captura)**: `[Ver Captura 04: Aplicación de Leyes de Gestalt en Mis EcoPuntos y Patrón Z en Splash/Mapa]`.

### 5.5. Concepto 05 — Estética Funcional: Color, Tipografía y los 5 Estados UI
- **Fundamento teórico**: El color comunica estados semánticos (límite de ~5 colores activos), la tipografía establece una escala modular legible y todo elemento interactivo debe responder a **5 estados obligatorios**.
- **Implementación en EcoImperio**:
  - **Paleta Semántica**:
    - *Primario (Acción y Éxito ambiental)*: Esmeralda (`#047857` / `#10b981`).
    - *Secundario (Recompensa y Progreso)*: Ámbar/Oro (`#f59e0b` / `#fbbf24`).
    - *Peligro / Contenedor Lleno / Error*: Rojo (`#dc2626` / `#ef4444`).
    - *Superficies Neutras*: `Slate-50`/`White` en Claro y `Slate-950`/`Slate-900` en Oscuro.
  - **Escala Tipográfica Modular**: Fuentes `Roboto` (cuerpo y lectura) e `Inter` (botones y navegación), con escala `h1: 32px (2rem)`, `h2: 24px (1.5rem)`, `h3: 18px (1.125rem)`, `h4: 16px (1rem)`, `body & inputs: 16px (1rem)` y `captions/badges: 12px–14px`.
  - **Los 5 Estados UI en todos los controles**:
    1. `Default`: Sombra suave y borde definido.
    2. `Hover`: Elevación (`translateY(-1px)` / `scale-105`) y cambio de luminosidad.
    3. `Active`: Hundimiento físico (`scale(0.98)` / `active:scale-95`).
    4. `Focus`: Anillo de alto contraste `:focus-visible` (`4px solid rgba(52, 211, 153, 0.4)`).
    5. `Disabled`: Opacidad reducida (`opacity: 0.55`), `cursor: not-allowed` y bloqueo de envío duplicado.
- **Evidencia visual (Captura)**: `[Ver Captura 05: Matriz de los 5 Estados Interactivos y Escala Tipográfica]`.

### 5.6. Concepto 06 — Diseño Centrado en el Usuario (DCU), Personas y Journey Map
- **Fundamento teórico**: Diseñar para arquetipos realistas documentando sus metas, frustraciones y el mapa de experiencia (User Journey Map) en contexto real de uso.
- **Implementación en EcoImperio**:
  - **User Persona 1 — Tomás / Oscar Rodríguez (Vecino Activo, 28–42 años, B° Alberdi)**: Camina hacia el trabajo llevando una bolsa con botellas PET en una mano y el celular en la otra. *Frustración*: llegar a la campana y encontrarla llena, o perder sus puntos al cerrar la app. *Solución en código*: navegación con una sola mano (Bottom Navbar al alcance del pulgar), filtro rápido de campanas vacías y persistencia automática de su saldo e historial en `localStorage`.
  - **User Persona 2 — Marta (Vecina con Visión Reducida, 64 años, B° Centro)**: Quiere participar del reciclaje barrial pero le cuestan los textos pequeños y el bajo contraste bajo el sol. *Solución en código*: selector de Tamaño de Texto (`Grande 112.5%` / `Extra grande 125%`), Modo Alto Contraste AAA y áreas táctiles mínimas de `44×44px` a `56×56px` (Ley de Fitts).
  - **User Journey Map cubierto de punta a punta**:
    1. *Descubrimiento*: Abre la app y entiende el propósito en el Splash.
    2. *Búsqueda*: Filtra `"Campanas Verdes"` en el Mapa y verifica cuál está `(Vacío)` a 350m con ruta peatonal sugerida.
    3. *Acción en calle*: Escanea el QR en la campana, verifica que su material (`PET 1`) es aceptado y presiona `"Registrar Depósito"`.
    4. *Recompensa*: Recibe confirmación instantánea (`+10 EcoPuntos`), ve avanzar su barra de progreso hacia el próximo beneficio y consulta sus descuentos en comercios del barrio.
- **Evidencia visual (Captura)**: `[Ver Captura 06: Flujo del User Journey Map y Controles de Accesibilidad para Baja Visión]`.

### 5.7. Concepto 07 — Arquitectura de la Información (AI) y Rotulado
- **Fundamento teórico**: Los 4 pilares de Morville y Rosenfeld: **Organización, Etiquetado (Labeling) libre de jerga técnica, Navegación con profundidad máxima de 2–3 clics y Búsqueda/Filtrado**.
- **Implementación en EcoImperio**:
  - **Profundidad plana (máximo 2 clics)**: Cualquier pantalla principal (`Mapa`, `Escáner QR`, `Mis EcoPuntos`, `Configuración`) está a **1 clic** desde la barra de navegación inferior o el menú lateral.
  - **Consistencia de rotulado**: El botón `"Configuración"` lleva a la pantalla titulada `"Configuración"`; el tab `"Puntos"` lleva a `"Mis EcoPuntos"`; el botón `"Registrar Depósito"` ejecuta exactamente el alta del depósito.
  - **Búsqueda y Filtrado Facetado en el Mapa**: El buscador superior permite filtrar por nombre/barrio en vivo, y las píldoras superiores (`Campanas Verdes`, `Puntos Limpios`) filtran los marcadores visibles en el mapa con estado `aria-pressed`.
- **Evidencia visual (Captura)**: `[Ver Captura 07: Buscador y Filtros Facetados en el Mapa Interactivo]`.

### 5.8. Concepto 08 — Wireframing y Buenas Prácticas en Figma (Auto-Layout y Restricciones)
- **Fundamento teórico**: Evolución desde el wireframe de baja fidelidad (Lo-Fi) en escala de grises hacia el prototipo de alta fidelidad (Hi-Fi) aplicando Auto-Layout, Constraints y cero pantallas callejón sin salida (*dead-ends*).
- **Implementación en EcoImperio**:
  - **Evolución documentada en Figma**: El archivo cuenta con la página `Prototipo (Baja Calidad)` (wireframes estructurales con componentes maestros) y las páginas de alta fidelidad en Modo Claro y Modo Oscuro.
  - **Traducción a CSS Flexbox/Grid**: El contenedor `.mobile-viewport` implementa un layout vertical flexible (`display: flex; flex-direction: column`) donde el header y el bottom-nav permanecen fijos y el área central (`flex-1 overflow-y-auto`) absorbe el scroll vertical sin desborde horizontal (`overflow: clip`).
  - **Cero pantallas sin salida**: Todas las vistas secundarias (`Login`, `Registro`, `Escáner QR`, `Configuración`) cuentan con botón `"← Volver"` en la esquina superior izquierda, además de navegación inferior o lateral en las vistas internas.
- **Evidencia visual (Captura)**: `[Ver Captura 08: Comparativa Wireframe Lo-Fi vs. Implementación Final Hi-Fi]`.

### 5.9. Concepto 09 — Sistema de Diseño, Diseño Atómico y Microinteracciones
- **Fundamento teórico**: Construcción modular mediante **Átomos, Moléculas y Organismos** gobernados por Design Tokens (variables CSS) y microinteracciones con propósito.
- **Implementación en EcoImperio**:
  - **Design Tokens en `:root` (`style.css`)**: Variables centralizadas para colores semánticos (`--color-primary`, `--color-secondary`, `--focus-ring`), radios y sombras.
  - **Diseño Atómico**:
    - *Átomos*: Botones (`.btn-primary`, `.btn-secondary`), badges de descuento, íconos con `aria-hidden="true"`, inputs con tamaño base `16px`.
    - *Moléculas*: Campo de formulario con label + input + mensaje de error accesible; fila de switch de configuración; card de historial de reciclaje (al `80%` de ancho con `<h3>`, `<p>` y `<h4>`).
    - *Organismos*: Card de Balance con barra de progreso dinámica, grilla de Comercios Adheridos (50% imagen / 50% información), Barra de Navegación Inferior y Menú Lateral (`Drawer`).
  - **Microinteracciones**: Animación de láser de escaneo (`@keyframes scan`) que se desactiva automáticamente si el usuario activa `"Reducir animaciones"`, y transición suave del Toast y del Drawer (`cubic-bezier(0.4, 0, 0.2, 1)`).
- **Evidencia visual (Captura)**: `[Ver Captura 09: Átomos, Moléculas y Organismos del Sistema de Diseño de EcoImperio]`.

### 5.10. Concepto 10 — Accesibilidad Aplicada, UX Writing y Patrones Avanzados
- **Fundamento teórico**: Contraste real verificado, áreas táctiles $\ge 44\times44\text{px}$, formularios con `aria-invalid`/`aria-describedby`, enlaces diferenciados por subrayado, verbos específicos en diálogos y **Empty States** accionables.
- **Implementación en EcoImperio**:
  - **Áreas táctiles $\ge 44\times44\text{px}$**: Todos los botones de navegación, botones de volver, toggles de mostrar/ocultar contraseña, filtros del mapa y cierre de menú cumplen el área mínima de `44×44px`.
  - **Inputs móviles a `16px` (`1rem`)**: Evita el zoom forzado en navegadores móviles y garantiza lectura cómoda.
  - **Empty State accionable**: Cuando una cuenta recién creada ingresa a `"Mis EcoPuntos"`, en lugar de una lista vacía en blanco ve un estado informativo con ícono y llamado a la acción para escanear su primera campana verde.
  - **UX Writing en confirmaciones**: El diálogo de eliminación de cuenta evita el ambiguo *"Sí / No"* y utiliza *"Cancelar"* y *"Sí, eliminar"*.
- **Evidencia visual (Captura)**: `[Ver Captura 10: Empty State en cuentas nuevas, enlaces subrayados y áreas táctiles verificadas]`.

---

## 6. Equipo de Trabajo

> *(Completar con los datos finales de los integrantes del grupo para la entrega en `EFI-Equipo/`)*

| Foto / Avatar | Nombre y Apellido | Rol en el Proyecto | Breve Biografía / Enfoque |
| :---: | :--- | :--- | :--- |
| `[Foto Integrante 1]` | **Tomás** *(Completar Apellido)* | UX/UI Lead & Frontend Architect | Estudiante de la tecnicatura/carrera, enfocado en arquitectura de información, accesibilidad WCAG y desarrollo de interfaces web Mobile-First. |
| `[Foto Integrante 2]` | *(Completar si aplica)* | UX Researcher & Prototyping | *(Completar breve descripción del integrante o dejar fila única si el trabajo es individual)* |

---

## 7. Estructura de Entrega (`EFI-Equipo/`)

De acuerdo con la consigna oficial de la cátedra, el paquete final se organiza en:
1. **`Prototipo - Web SPA/`**: Código fuente ejecutable (`index.html`, `style.css`, `app.js`) + enlace al prototipo interactivo en Figma (`Reto 4`).
2. **`Documento con la investigación/`**: El presente documento técnico con capturas de pantalla de cada concepto implementado.
3. **`Presentación/`**: Guion estructurado para la defensa oral (máximo 20 minutos) y soporte visual en Prezi / video demostrativo.
