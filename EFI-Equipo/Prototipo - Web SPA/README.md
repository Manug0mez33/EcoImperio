# Prototipo Funcional Web SPA — EcoImperio (EFI 2026)

## Ejecución Rápida
El prototipo está construido como una **Single Page Application (SPA) modular** en HTML5 semántico, CSS3 + TailwindCSS v3 (CDN) y JavaScript Vanilla ES6+ (`index.html`, `style.css`, `app.js`), sin requerir compiladores ni servidores externos.

1. Abrí el archivo `index.html` directamente en cualquier navegador moderno (Chrome, Edge, Firefox, Safari) o mediante `Live Server`.
2. **Cuenta Demo Precargada**:
   - **Correo**: `vecino@rc.com`
   - **Contraseña**: `EcoImperio2026`
   - *(También podés presionar el botón **"Autocompletar cuenta de prueba (Vecino)"** en la pantalla de Iniciar Sesión).*

## Funcionalidades Principales Verificables
- **3 Modos Visuales en Vivo**: Modo Claro, Modo Oscuro y Modo Alto Contraste (`WCAG AAA >= 7:1` / `19.56:1`).
- **Escalado Tipográfico Accesible**: Normal (`100%`), Grande (`112.5%`) y Extra grande (`125%`) + opción de Reducir animaciones.
- **Mapa Interactivo de Río Cuarto**: Buscador en tiempo real, filtros por tipo de contenedor (`Campanas Verdes`, `Puntos Limpios`) con estado `aria-pressed` y codificación redundante (`(Vacío)` vs. `(Lleno)`).
- **Escáner QR y Clasificador de Residuos**: Selección de material (`PET 1`, `Cartón PAP 20`, `Vidrio GL 70`) con redirección inteligente al contenedor compatible y acreditación instantánea de **EcoPuntos**.
- **Billetera de EcoPuntos y Canje Real en Comercios**: Validación de saldo, modal `<dialog>` de confirmación, descuento real de puntos, generación de código de cupón (`ECO-XXXX`) y registro en el Historial persistido en `localStorage`.
- **Restablecimiento de Demo en 1 clic**: Botón *"Restablecer datos de demostración"* en Configuración para restaurar el saldo inicial (`1.250 EcoPuntos`) e historial base.
