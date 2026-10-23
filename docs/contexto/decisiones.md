# Registro de Decisiones de Arquitectura (ADRs) - EcoImperio

## ADR-001: Arquitectura SPA Single-File en HTML5 Semántico + TailwindCSS v3 CDN
- **Estado**: Aceptado
- **Fecha**: 2026-09-23
- **Contexto**: Se requiere prototipar una aplicación web móvil (EcoImperio) limpia, rápida e interactiva basada en los conceptos de UX/UI y Figma sin sobre-ingeniería de frameworks ni backend.
- **Decisión**: Mantener todo en un único archivo `index.html` estructurado en HTML5 semántico con TailwindCSS v3 (vía CDN) y JavaScript limpio.
- **Límites Tecnológicos Strictos**:
  - NO utilizar React, Vue ni Angular.
  - NO crear backend en Node.js, Express ni Python.
  - NO conectar bases de datos SQL ni Firebase.
  - NO escribir estilos inline (`style="..."`).
- **Consecuencia**: Ejecución ultra-rápida, simplicidad pedagógica y facilidad de despliegue directo.

## ADR-002: Enfoque Exclusivamente Mobile-First y Tres Modos Visuales
- **Estado**: Aceptado
- **Fecha**: 2026-09-23
- **Contexto**: EcoImperio se utiliza principalmente en la calle mientras los vecinos caminan hacia las campanas verdes.
- **Decisión**: La aplicación se diseña con un layout centrado en pantalla móvil, mapa interactivo central, barra de navegación inferior con botón flotante de escáner y soporte para Modos Claro, Oscuro y Alto Contraste para la persona "Kevin" y usuarios con visión reducida.

## ADR-003: Modo Oscuro con Variantes `dark:` de Tailwind (estrategia `class`)
- **Estado**: Aceptado
- **Fecha**: 2026-10-23
- **Contexto**: El Modo Oscuro original se implementaba con overrides globales `body.dark-mode .bg-white { ... !important }` en `style.css`. Solo cubría algunas clases sueltas, dejaba pantallas sin tematizar (Splash, fondo del Mapa) y generaba texto invisible (título blanco sobre fondo claro). Cada clase nueva que se usara podía romperlo de nuevo.
- **Decisión**:
  - `tailwind.config.darkMode = 'class'`; el tema se activa con la clase `dark` en `<html>`.
  - Cada componente declara sus colores oscuros en el HTML con variantes `dark:` (incluidas las plantillas generadas desde `app.js`).
  - `style.css` solo tematiza sus clases propias (`.btn-primary`, `.btn-secondary`, `.drawer-menu`, `.toast`, `.mobile-viewport`) con selectores `html.dark`, sin `!important`.
  - Un script en el `<head>` aplica el tema antes del primer pintado: usa la preferencia guardada (`ecoimperio_dark_mode`) o, si no existe, `prefers-color-scheme`.
  - Controles sincronizados: toggle del Splash, botón del Login (`aria-pressed`, ícono luna/sol) y toggle "Modo Oscuro" del Drawer, accesible desde cualquier pantalla.
  - El estado activo de la navbar se expresa con `aria-current="page"` y variantes `aria-[current=page]:`.
  - El Modo Alto Contraste conserva prioridad sobre el oscuro (usa `!important`).
- **Consecuencia**: El tema oscuro es explícito y verificable por componente. Todo componente nuevo **debe** incluir sus variantes `dark:` (ver `convenciones.md`).

## ADR-004: Registro e Inicio de Sesión Locales (sin backend)
- **Estado**: Aceptado
- **Fecha**: 2026-10-23
- **Contexto**: El botón "Registrarse" llevaba directo al Mapa y el Login aceptaba cualquier dato, así que cualquiera entraba a la app sin cuenta. ADR-001 prohíbe backend y bases de datos.
- **Decisión**:
  - Nueva pantalla `screen-registro` con formulario estándar (nombre, apellido, email, teléfono, barrio, contraseña + confirmación, términos), validado en el cliente.
  - Las cuentas se guardan en `localStorage` (`ecoimperio_accounts`); la contraseña se guarda solo como hash SHA-256 (`crypto.subtle`), nunca en texto plano.
  - El Login valida email + contraseña contra las cuentas registradas. Se mantiene una cuenta demo hardcodeada para presentaciones.
  - `navigateTo()` protege `mapa`, `escaner` y `puntos`: sin sesión redirige al Login. "Cerrar Sesión" limpia la sesión.
  - Las cuentas nuevas arrancan con 0 EcoPuntos e historial vacío.
- **Consecuencias / Limitaciones conocidas**:
  - Es autenticación de prototipo: los datos viven en el navegador del usuario y no hay recuperación de contraseña.
  - La sesión no persiste al recargar (se vuelve al Splash) y los EcoPuntos de cuentas nuevas no se guardan entre sesiones.
  - `crypto.subtle` requiere contexto seguro (`file://`, `localhost` o HTTPS).

## ADR-005: Pantalla de Configuración y Preferencias de Accesibilidad
- **Estado**: Aceptado
- **Fecha**: 2026-10-23
- **Contexto**: El ítem "Configuración" del Drawer no hacía nada. La persona con visión reducida necesita adaptar la interfaz más allá del Alto Contraste, y las reglas de accesibilidad piden respetar `prefers-reduced-motion`.
- **Decisión**:
  - Nueva pantalla protegida `screen-config` con cuatro secciones: Mi perfil, Apariencia y accesibilidad, Notificaciones, Cuenta y seguridad.
  - El tamaño de texto escala el `font-size` de `<html>`; como Tailwind usa `rem`, toda la app crece de forma proporcional sin tocar componentes.
  - "Reducir animaciones" agrega la clase `reduce-motion` en `<html>`; además se respeta `prefers-reduced-motion` del sistema.
  - Las validaciones de Registro y Perfil comparten un único objeto `validators` en `app.js`.
  - El estado activo del Drawer pasa a `aria-current="page"` (igual que la navbar), en lugar de quedar fijo en "Mapa de Puntos".
  - Se corrigieron íconos inexistentes en Myna UI: `qr-code` → `scan` y `contrast` → `circle-half`.
- **Consecuencias**: Los cambios de perfil y contraseña de la cuenta demo duran solo mientras la página está abierta. Las notificaciones son simuladas: se guarda la preferencia, pero no se envían avisos.
