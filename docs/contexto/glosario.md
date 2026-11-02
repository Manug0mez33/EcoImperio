# Glosario y Rotulado (Labeling) - EcoImperio

## 1. Términos Orientados al Usuario (Labeling de Interfaz)
Los rótulos de la aplicación siguen las reglas de inteligibilidad y mapeo natural (`04_arquitectura_de_la_informacion.md` y `10_accesibilidad_aplicada.md`), manteniendo consistencia estricta entre las pantallas de la SPA y el prototipo de Figma (`Reto 4`):
- **"Comenzar"**: CTA principal de la pantalla de inicio (Splash) para ingresar al flujo de autenticación.
- **"Iniciar Sesión"**: Acción de ingreso con correo electrónico y contraseña para vecinos registrados (o acceso rápido con Cuenta Demo).
- **"Registrarse" / "Crear cuenta"**: Alta de un nuevo vecino completando sus datos personales y barrio de Río Cuarto.
- **"Campanas Verdes" / "Puntos Limpios"**: Píldoras de filtrado en el encabezado del mapa interactivo para segmentar los puntos de reciclaje por categoría.
- **"Escáner QR"**: Botón central elevado de la barra inferior y acción en la tarjeta del mapa para abrir el visor de cámara y validar el código QR del contenedor.
- **"Registrar Depósito"**: Acción transaccional final del escáner para confirmar el material reciclable depositado y acreditar los EcoPuntos correspondientes.
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
