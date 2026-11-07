# Glosario y Rotulado (Labeling) - EcoImperio

## 1. Términos Orientados al Usuario (Labeling de Interfaz)
Los rótulos de la aplicación siguen las reglas de inteligibilidad y mapeo natural (`04_arquitectura_de_la_informacion.md` y `10_accesibilidad_aplicada.md`), manteniendo consistencia estricta entre las pantallas de la SPA y el prototipo de Figma (`Reto 4`):
- **"Comenzar"**: CTA principal de la pantalla de inicio (Splash) para ingresar al flujo de autenticación.
- **"Iniciar Sesión"**: Acción de ingreso con correo electrónico y contraseña para vecinos registrados (o acceso rápido con Cuenta Demo).
- **"Registrarse" / "Crear cuenta"**: Alta de un nuevo vecino completando sus datos personales y barrio de Río Cuarto.
- **"Campanas Verdes" / "Puntos Limpios"**: Píldoras de filtrado en el encabezado del mapa interactivo para segmentar los puntos de reciclaje por categoría.
- **"Escáner QR"**: Botón central elevado de la barra inferior y acción en la tarjeta del mapa para abrir el visor de cámara y validar el código QR del contenedor.
- **"Depositar"**: Acción final del escáner (habilitada solo con GPS validado junto a la campana) que abre la compuerta; la campana detecta el material por sensor y acredita los EcoPuntos correspondientes. El vecino no elige el material.
- **"Mis EcoPuntos"**: Sección de billetera digital donde el vecino consulta su balance actual, su progreso hacia el próximo canje, el catálogo de comercios y su historial.
- **"Comercios Adheridos"**: Catálogo de negocios locales de Río Cuarto donde canjear EcoPuntos por descuentos directos.
- **"Historial de Reciclaje"**: Lista cronológica de depósitos verificados con detalle de material, punto verde, fecha/hora y EcoPuntos sumados.
- **"Guía de Reciclaje"**: Modal informativo accesible desde el menú lateral (Drawer) con el cronograma y clasificación de materiales reciclables.
- **"Configuración"**: Vista protegida donde el vecino edita su perfil, ajusta apariencia y accesibilidad (Modo Oscuro, Alto Contraste, Tamaño de texto, Reducir animaciones), administra notificaciones y gestiona la seguridad de su cuenta.

## 1.1 Términos Técnicos
- **Cuenta Demo**: `vecino@rc.com` / `eco12345` (**Oscar Rodríguez**, `1.250 EcoPuntos` iniciales). Permite evaluar todos los flujos autenticados de inmediato y persiste los nuevos depósitos/canjes en `localStorage`.

## 2. Definiciones del Dominio y Gamificación
- **Campana Verde**: Contenedor urbano de separación en origen ubicado en plazas y espacios públicos de Río Cuarto.
- **Punto Limpio**: Centro municipal de recepción de residuos reciclables de mayor volumen o múltiples fracciones.
- **Capacidad de Contenedor**: Estado operativo en tiempo real en el mapa (**Verde = Vacío / Disponible** con capacidad para recibir material; **Rojo = Lleno / Sin capacidad**, sugiriendo dirigirse a otro punto cercano).
- **Ruta Peatonal Sugerida**: Indicación visual trazada en el mapa y en la tarjeta flotante inferior que informa distancia y tiempo estimado a pie hasta la campana disponible más próxima.
- **EcoPuntos**: Unidad de recompensa ambiental acreditada en la billetera del vecino por cada depósito registrado (`+10 pts`, `+15 pts`, `+45 pts` según material/volumen) y canjeable por beneficios locales.

## 3. Arquetipos de Usuario (Personas)
Alineados con `decisiones.md` (ADR-002) y `docs/conceptos/06_DCU_Personas_y_Journey_Map.md`:
1. **Arquetipo 1 — Tomás / Oscar Rodríguez (Vecino Activo y Pragmático)**:
   - *Perfil*: Vecino de Río Cuarto (representado en la cuenta demo por Oscar Rodríguez y en el arquetipo joven por Tomás) motivado por el cuidado barrial y el ahorro mediante descuentos en comercios de cercanía.
   - *Necesidades UX/UI*: Flujo ágil en la vía pública con una sola mano, mapa que indique de un vistazo si la campana está vacía o llena antes de caminar hacia ella, escaneo QR rápido y acreditación inmediata de EcoPuntos.
2. **Arquetipo 2 — Marta / Vecino con Visión Reducida y Baja Alfabetización Digital**:
   - *Perfil*: Vecina mayor o usuario con disminución visual que desea participar del reciclaje urbano sin depender de terceros.
   - *Necesidades UX/UI*: Etiquetas en lenguaje llano y sin tecnicismos, soporte de **Modo Claro, Modo Oscuro y Modo Alto Contraste (WCAG AAA $\ge 7:1$)**, escalado tipográfico desde `16px` hasta `125%`, codificación redundante (color + ícono + texto) y botones táctiles amplios ($\ge 44\text{x}44\text{px}$ a $48\text{x}48\text{px}$).

## 4. Campana Inteligente IoT (ver ADR-006)
- **QR Dinámico de Campana**: Código QR que muestra la pantalla de cada campana y rota cada ~30 s. Contiene `id_campana + nonce + timestamp` firmados, por lo que una foto del QR no sirve después ni desde otro lugar.
- **Geovallado GPS (Geofencing)**: Validación de que el celular del vecino está a menos de 20 m de la campana. Fuera de ese radio, el botón `Escanear` no aparece en el mapa.
- **Sesión de Depósito**: Ventana corta (~60 s) que el servidor abre al validar QR + GPS + usuario. Vincula la campana con la cuenta del vecino: todo lo que la campana detecte en esa ventana se acredita a esa cuenta.
- **Detección Óptica/Gravimétrica de Material**: La campana identifica el material (PET, cartón, aluminio, vidrio) con cámara/sensor óptico y verifica el peso con una celda de carga. Si no detecta material válido, no se acreditan puntos.
- **Bonus por Baja Ocupación**: `+10 pts` extra al depositar en campanas con baja ocupación, para que las campanas se llenen de forma pareja.

## 5. Perfil del Vecino y Gamificación (XP y Niveles)
- **Perfil**: Pantalla accesible directamente desde la barra inferior (esquina inferior derecha). Muestra avatar personalizable, sello de vecino verificado, métricas de impacto ambiental, credencial QR, edición de datos personales y seguridad.
- **EcoPuntos canjeables**: Saldo disponible para canjear por descuentos en Comercios Adheridos. Disminuye con cada canje realizado.
- **Puntos de Experiencia (XP acumulados)**: Total histórico acumulado de puntos ganados por reciclajes y participación comunitaria. **Nunca disminuye al canjear cupones**; funciona como barra de progreso continuo hacia el siguiente nivel.
- **Escala de Niveles Vecinales (Metáfora Botánica y Propósito)**:
  - *Nivel 1: Semilla* (0 a 499 XP) • Desbloquea canjes básicos en comercios esenciales (panaderías y alimentos).
  - *Nivel 2: Brote* (500 a 999 XP) • Desbloquea canjes en librerías y papelerías barriales.
  - *Nivel 3: Planta* (1.000 a 1.999 XP) • Desbloquea cafeterías y espacios gastronómicos.
  - *Nivel 4: Árbol* (2.000 a 3.499 XP) • Desbloquea tiendas naturales, dietéticas y viveros.
  - *Nivel 5: Bosque* (≥ 3.500 XP) • Máximo nivel de ciudadanía ambiental; desbloquea beneficios exclusivos en electrónica, celulares y tecnología de alta gama (TecnoRío Celulares).
- **Utilidad de los Niveles en el Comercio**: Cada tarjeta de comercio exhibe un badge con el nivel requerido (`Req. Nivel X • Nombre`). Si el vecino aún no alcanzó dicho nivel, el canje permanece bloqueado y la app le informa mediante toast de advertencia cuánto le falta para desbloquearlo.
- **Identidad en Comunidad**: Las publicaciones en el muro vecinal muestran el avatar elegido por el usuario y su insignia de nivel, reconociendo el prestigio y trayectoria ecológica del vecino ante su barrio.
- **Impacto acumulado**: kg reciclados (peso medido por la celda de carga de la campana), cantidad de depósitos verificados y nivel de experiencia.
- **Credencial QR del vecino**: Código identificador personal (`#RC-XXXX`) para identificarse presencialmente en Puntos Limpios atendidos y EcoEventos sin dictar datos personales.
- **Avatar personalizable**: Permite elegir entre las iniciales del vecino o 4 íconos ecológicos (planta, gota de agua, sol, reciclaje), persistidos en `localStorage` (`ecoimperio_avatars`).
- **Menú Más opciones (Hamburguesa)**: Accesible desde la esquina superior izquierda de las pantallas principales, centralizando accesos secundarios (Mis Eventos, Historial de Reciclaje, Cronograma, Centro de Ayuda, Ajustes de Accesibilidad y Sesión).
