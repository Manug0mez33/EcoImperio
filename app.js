/* ==========================================================================
   INTERACTIVIDAD Y LÓGICA DE APLICACIÓN - ECOIMPERIO (Gentle-AI Vanilla JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Pantallas que requieren una sesión iniciada
  const PROTECTED_SCREENS = ['mapa', 'escaner', 'puntos', 'config'];
  const ACCOUNTS_KEY = 'ecoimperio_accounts';
  const USER_DATA_KEY = 'ecoimperio_user_data';
  const SESSION_EMAIL_KEY = 'ecoimperio_session_email';
  const NOTIFICATIONS_KEY = 'ecoimperio_notifications';
  const GOAL_POINTS = 1500;
  const DEFAULT_NOTIFICATIONS = { campanaCercana: true, campanaLlena: true, beneficios: false };
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const NAME_PATTERN = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]{2,}$/;

  // Cuenta de demostración para presentar el prototipo sin registrarse (ADR-004)
  const DEMO_ACCOUNT = {
    nombre: 'Oscar',
    apellido: 'Rodríguez',
    email: 'vecino@rc.com',
    telefono: '3584123456',
    barrio: 'Alberdi',
    password: 'eco12345'
  };

  const DEMO_WALLET = {
    ecoPuntos: 1250,
    history: [
      { id: 1, title: 'Botellas Plásticas PET', location: 'Campana Verde Alberdi', time: 'Hoy, 14:32', points: 15 },
      { id: 2, title: 'Cartón y Papel Seco', location: 'Punto Limpio Banda Norte', time: '24 Ene, 11:15', points: 45 },
      { id: 3, title: 'Envases de Vidrio', location: 'Punto Limpio Plaza Roca', time: '18 Ene, 17:40', points: 30 }
    ]
  };

  // Catálogo de materiales reciclables en el Escáner QR
  const MATERIALS = {
    pet: {
      code: 'PET 1 • Reciclable',
      title: 'Botella de Plástico PET',
      points: 10,
      container: 'Campana Verde'
    },
    carton: {
      code: 'PAP 20 • Reciclable',
      title: 'Cartón y Papel Seco',
      points: 15,
      container: 'Campana Verde'
    },
    vidrio: {
      code: 'GL 70 • Reciclable',
      title: 'Envase de Vidrio',
      points: 20,
      container: 'Punto Limpio'
    },
    aluminio: {
      code: 'ALU 41 • Reciclable',
      title: 'Lata de Aluminio',
      points: 15,
      container: 'Campana Verde'
    }
  };

  // ==========================================================================
  // PERSISTENCIA EN LOCALSTORAGE POR CUENTA (ecoimperio_accounts & ecoimperio_user_data)
  // ==========================================================================
  function loadAccounts() {
    try {
      return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveAccounts(accounts) {
    try {
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    } catch (e) {}
  }

  function loadAllUserData() {
    try {
      return JSON.parse(localStorage.getItem(USER_DATA_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveAllUserData(allData) {
    try {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(allData));
    } catch (e) {}
  }

  function loadUserWallet(email, fallbackWallet) {
    const normalizedEmail = (email || '').trim().toLowerCase();
    const allData = loadAllUserData();
    if (allData[normalizedEmail] && typeof allData[normalizedEmail].ecoPuntos === 'number') {
      return {
        ecoPuntos: allData[normalizedEmail].ecoPuntos,
        history: Array.isArray(allData[normalizedEmail].history) ? allData[normalizedEmail].history.slice() : []
      };
    }
    const account = loadAccounts().find(acc => acc.email === normalizedEmail);
    if (account && typeof account.ecoPuntos === 'number') {
      return {
        ecoPuntos: account.ecoPuntos,
        history: Array.isArray(account.history) ? account.history.slice() : []
      };
    }
    return {
      ecoPuntos: fallbackWallet.ecoPuntos,
      history: fallbackWallet.history.slice()
    };
  }

  // Estado local de la aplicación
  const initialDemoWallet = loadUserWallet(DEMO_ACCOUNT.email, DEMO_WALLET);
  const state = {
    currentScreen: 'splash',
    user: null,
    ecoPuntos: initialDemoWallet.ecoPuntos,
    highContrast: false,
    darkMode: document.documentElement.classList.contains('dark'),
    scannerFlash: false,
    selectedMaterial: 'pet',
    selectedPoint: 'Campana Verde Alberdi',
     selectedPointStatus: 'available',
    history: initialDemoWallet.history
  };

  function saveUserWallet() {
    const targetEmail = state.user ? state.user.email : DEMO_ACCOUNT.email;
    const allData = loadAllUserData();
    allData[targetEmail] = {
      ecoPuntos: state.ecoPuntos,
      history: state.history.slice(),
      updatedAt: new Date().toISOString()
    };
    saveAllUserData(allData);

    if (state.user && state.user.email !== DEMO_ACCOUNT.email) {
      const accounts = loadAccounts();
      const account = accounts.find(acc => acc.email === state.user.email);
      if (account) {
        account.ecoPuntos = state.ecoPuntos;
        account.history = state.history.slice();
        saveAccounts(accounts);
      }
    }
  }

  // Router de Navegación de Pantallas
  function navigateTo(screenId) {
    // Sin sesión no se entra a las vistas protegidas: se redirige al inicio de sesión
    if (PROTECTED_SCREENS.includes(screenId) && !state.user) {
      screenId = 'login';
    }

    const screens = document.querySelectorAll('.screen-view');
    screens.forEach(screen => screen.classList.remove('active'));

    const targetScreen = document.getElementById(`screen-${screenId}`);
    if (targetScreen) {
      targetScreen.classList.add('active');
      targetScreen.scrollTop = 0;
      state.currentScreen = screenId;
    }
    if (screenId === 'config') fillSettings();
    if (screenId === 'escaner') updateScannerMaterialUI();

    // Actualizar navbars activos
    updateNavbars(screenId);
    closeDrawer();
  }

  function updateNavbars(activeScreen) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      if (item.getAttribute('data-target') === activeScreen) {
        item.setAttribute('aria-current', 'page');
      } else {
        item.removeAttribute('aria-current');
      }
    });
  }

  // ==========================================================================
  // DRAWER MENU SLIDE-OVER (Accesibilidad: inert + aria-expanded + Escape + Focus Trap)
  // ==========================================================================
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerMenu = document.getElementById('drawer-menu');
  const openDrawerBtn = document.getElementById('btn-open-drawer');
  const closeDrawerBtn = document.getElementById('btn-close-drawer');
  let lastDrawerTrigger = null;

  function syncDrawerAria(isOpen) {
    if (openDrawerBtn) openDrawerBtn.setAttribute('aria-expanded', String(isOpen));
    document.querySelectorAll('.btn-trigger-drawer').forEach(btn => {
      btn.setAttribute('aria-expanded', String(isOpen));
    });
    if (drawerMenu) {
      drawerMenu.setAttribute('aria-hidden', String(!isOpen));
      if (isOpen) {
        drawerMenu.removeAttribute('inert');
      } else {
        drawerMenu.setAttribute('inert', '');
      }
    }
  }

  function openDrawer(e) {
    if (drawerOverlay && drawerMenu) {
      lastDrawerTrigger = (e && e.currentTarget) ? e.currentTarget : document.activeElement;
      drawerOverlay.classList.add('open');
      drawerMenu.classList.add('open');
      syncDrawerAria(true);
      if (closeDrawerBtn) {
        requestAnimationFrame(() => closeDrawerBtn.focus());
      }
    }
  }

  function closeDrawer() {
    if (drawerOverlay && drawerMenu) {
      const wasOpen = drawerMenu.classList.contains('open');
      const focusInsideDrawer = drawerMenu.contains(document.activeElement);
      drawerOverlay.classList.remove('open');
      drawerMenu.classList.remove('open');
      syncDrawerAria(false);
      if (wasOpen && focusInsideDrawer) {
        const targetToFocus = (lastDrawerTrigger && document.body.contains(lastDrawerTrigger)) ? lastDrawerTrigger : openDrawerBtn;
        if (targetToFocus) targetToFocus.focus();
      }
    }
  }

  if (openDrawerBtn) openDrawerBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  document.querySelectorAll('.btn-trigger-drawer').forEach(btn => {
    btn.addEventListener('click', openDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (!drawerMenu || !drawerMenu.classList.contains('open')) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDrawer();
      return;
    }
    if (e.key === 'Tab') {
      const focusables = [...drawerMenu.querySelectorAll('button:not(:disabled), input:not(:disabled), [href], select:not(:disabled), [tabindex]:not([tabindex="-1"])')];
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // ==========================================================================
  // TEMA Y ACCESIBILIDAD: Modo Alto Contraste y Modo Oscuro
  // ==========================================================================
  function setHighContrast(enable) {
    state.highContrast = enable;
    document.documentElement.classList.toggle('high-contrast', enable);
    document.body.classList.toggle('high-contrast', enable);
    try {
      localStorage.setItem('ecoimperio_high_contrast', String(enable));
    } catch (e) {}
    document.querySelectorAll('.contrast-toggle').forEach(sw => {
      sw.checked = enable;
    });
  }

  setHighContrast(localStorage.getItem('ecoimperio_high_contrast') === 'true');

  document.querySelectorAll('.contrast-toggle').forEach(sw => {
    sw.addEventListener('change', (e) => setHighContrast(e.target.checked));
  });

  function syncDarkModeControls() {
    document.querySelectorAll('.dark-mode-toggle').forEach(sw => {
      sw.checked = state.darkMode;
    });
    document.querySelectorAll('.dark-mode-btn').forEach(btn => {
      btn.setAttribute('aria-pressed', String(state.darkMode));
      const icon = btn.querySelector('iconify-icon');
      if (icon) icon.setAttribute('icon', state.darkMode ? 'mynaui:sun' : 'mynaui:moon');
    });
  }

  function toggleDarkMode(enable) {
    state.darkMode = enable;
    document.documentElement.classList.toggle('dark', enable);
    try {
      localStorage.setItem('ecoimperio_dark_mode', String(enable));
    } catch (e) {}
    syncDarkModeControls();
  }

  syncDarkModeControls();

  document.querySelectorAll('.dark-mode-toggle').forEach(sw => {
    sw.addEventListener('change', (e) => {
      toggleDarkMode(e.target.checked);
    });
  });

  document.querySelectorAll('.dark-mode-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleDarkMode(!state.darkMode);
    });
  });

  // Delegación global para botones [data-navigate] (incluye elementos dinámicos como Empty State)
  document.addEventListener('click', (e) => {
    const navTrigger = e.target.closest('[data-navigate]');
    if (!navTrigger) return;
    e.preventDefault();
    const target = navTrigger.getAttribute('data-navigate');
    navigateTo(target);
  });

  // Notificación Toast (reemplaza alert() para no bloquear la interfaz)
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer;

  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
  }

  // ==========================================================================
  // CUENTAS DE USUARIO: Registro, Inicio de Sesión y Restauración de Sesión
  // ==========================================================================
  async function hashPassword(password) {
    if (window.crypto && window.crypto.subtle) {
      const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
      return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
    }
    // Fallback determinista para entornos locales sin Web Crypto API (ADR-004)
    let hash = 2166136261;
    for (let i = 0; i < password.length; i++) {
      hash ^= password.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return `fnv1a-${(hash >>> 0).toString(16).padStart(8, '0')}`;
  }

  function setFieldError(field, message) {
    field.setAttribute('aria-invalid', String(Boolean(message)));
    const error = document.getElementById(`${field.id}-error`);
    if (error) {
      error.textContent = message;
      error.classList.toggle('hidden', !message);
    }
  }

  function applyFormErrors(form, errors) {
    const fields = [...form.querySelectorAll('input, select')];
    fields.forEach(field => setFieldError(field, errors[field.id] || ''));
    const firstInvalid = fields.find(field => errors[field.id]);
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  document.querySelectorAll('#login-form, #register-form, #profile-form, #password-form').forEach(form => {
    form.addEventListener('input', (e) => {
      if (e.target.getAttribute('aria-invalid') === 'true') setFieldError(e.target, '');
    });
  });

  function updateUserUI() {
    if (!state.user) return;
    const { nombre, apellido, barrio } = state.user;
    document.querySelectorAll('.user-initials').forEach(el => {
      el.textContent = `${nombre[0]}${apellido[0]}`.toUpperCase();
    });
    document.querySelectorAll('.user-fullname').forEach(el => {
      el.textContent = `${nombre} ${apellido}`;
    });
    document.querySelectorAll('.user-barrio').forEach(el => {
      el.textContent = barrio === 'Otro' ? 'Vecino de Río Cuarto' : `Vecino de B° ${barrio}`;
    });
    document.querySelectorAll('.user-email').forEach(el => {
      el.textContent = state.user.email;
    });
  }

  function startSession(account, fallbackWallet) {
    const wallet = loadUserWallet(account.email, fallbackWallet);
    state.user = {
      nombre: account.nombre,
      apellido: account.apellido,
      email: account.email,
      telefono: account.telefono,
      barrio: account.barrio
    };
    state.ecoPuntos = wallet.ecoPuntos;
    state.history = wallet.history.slice();
    try {
      localStorage.setItem(SESSION_EMAIL_KEY, account.email);
    } catch (e) {}
    saveUserWallet();
    updateUserUI();
    updatePointsUI();
  }

  // Restaurar sesión activa si se recarga la página
  (function restoreActiveSession() {
    let savedEmail = null;
    try {
      savedEmail = localStorage.getItem(SESSION_EMAIL_KEY);
    } catch (e) {}
    if (!savedEmail) return;
    if (savedEmail === DEMO_ACCOUNT.email) {
      startSession(DEMO_ACCOUNT, DEMO_WALLET);
    } else {
      const account = loadAccounts().find(acc => acc.email === savedEmail);
      if (account) {
        startSession(account, { ecoPuntos: 0, history: [] });
      }
    }
  })();

  const normalizePhone = value => value.replace(/[\s-]/g, '');
  const validators = {
    nombre: value => (NAME_PATTERN.test(value.trim()) ? '' : 'Ingresá tu nombre (solo letras).'),
    apellido: value => (NAME_PATTERN.test(value.trim()) ? '' : 'Ingresá tu apellido (solo letras).'),
    telefono: value => (/^\d{10}$/.test(normalizePhone(value)) ? '' : 'Ingresá 10 dígitos, por ejemplo 358 4123456.'),
    barrio: value => (value ? '' : 'Elegí tu barrio.'),
    password: value => (value.length >= 8 && /\d/.test(value) ? '' : 'La contraseña debe tener al menos 8 caracteres y un número.')
  };

  function validateRegistration(data, accounts) {
    const errors = {
      'reg-nombre': validators.nombre(data.nombre),
      'reg-apellido': validators.apellido(data.apellido),
      'reg-telefono': validators.telefono(data.telefono),
      'reg-barrio': validators.barrio(data.barrio),
      'reg-password': validators.password(data.password)
    };

    const email = data.email.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(email)) {
      errors['reg-email'] = 'Ingresá un correo electrónico válido.';
    } else if (email === DEMO_ACCOUNT.email || accounts.some(account => account.email === email)) {
      errors['reg-email'] = 'Ya existe una cuenta con este correo. Iniciá sesión.';
    }

    if (data.passwordConfirm !== data.password) {
      errors['reg-password-confirm'] = 'Las contraseñas no coinciden.';
    }
    if (!data.terminos) errors['reg-terminos'] = 'Tenés que aceptar los términos para crear la cuenta.';
    return errors;
  }

  // Registro: la cuenta se crea con billetera propia persistida en localStorage
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(registerForm));
      const accounts = loadAccounts();
      if (!applyFormErrors(registerForm, validateRegistration(data, accounts))) return;

      const submitBtn = registerForm.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      try {
        const account = {
          nombre: data.nombre.trim(),
          apellido: data.apellido.trim(),
          email: data.email.trim().toLowerCase(),
          telefono: normalizePhone(data.telefono),
          barrio: data.barrio,
          passwordHash: await hashPassword(data.password),
          ecoPuntos: 0,
          history: [],
          createdAt: new Date().toISOString()
        };
        accounts.push(account);
        saveAccounts(accounts);

        startSession(account, { ecoPuntos: 0, history: [] });
        registerForm.reset();
        showToast(`¡Cuenta creada! Te damos la bienvenida, ${account.nombre}.`);
        navigateTo('mapa');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  // Inicio de sesión: recupera puntos e historial guardados por cuenta
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');

  function setLoginError(message) {
    if (!loginError) return;
    loginError.textContent = message;
    loginError.classList.toggle('hidden', !message);
  }

  if (loginForm) {
    loginForm.addEventListener('input', () => setLoginError(''));
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value;

      setLoginError('');
      const errors = {};
      if (!EMAIL_PATTERN.test(email)) errors.email = 'Ingresá un correo electrónico válido.';
      if (!password) errors.password = 'Ingresá tu contraseña.';
      if (!applyFormErrors(loginForm, errors)) return;

      const submitBtn = loginForm.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      try {
        if (email === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password) {
          startSession(DEMO_ACCOUNT, DEMO_WALLET);
        } else {
          const passwordHash = await hashPassword(password);
          const account = loadAccounts().find(acc => acc.email === email && acc.passwordHash === passwordHash);
          if (!account) {
            setLoginError('El correo o la contraseña no son correctos. Revisalos o creá una cuenta.');
            passwordInput.focus();
            return;
          }
          startSession(account, { ecoPuntos: account.ecoPuntos || 0, history: account.history || [] });
        }
        navigateTo('mapa');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  // Botones de acceso social rápido y enlaces de ayuda en Login/Registro
  document.querySelectorAll('.social-login-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const provider = btn.dataset.provider || 'cuenta vinculada';
      startSession(DEMO_ACCOUNT, DEMO_WALLET);
      showToast(`Ingresaste con ${provider} como ${DEMO_ACCOUNT.nombre} ${DEMO_ACCOUNT.apellido}.`);
      navigateTo('mapa');
    });
  });

  const forgotPasswordLink = document.getElementById('link-forgot-password');
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Prototipo local: usá vecino@rc.com (clave: eco12345) o creá una cuenta nueva.');
    });
  }

  document.querySelectorAll('.link-legal').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Tus datos y EcoPuntos se resguardan localmente en tu navegador (Gobierno de Río Cuarto).');
    });
  });

  // Mostrar / ocultar contraseña
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.setAttribute('aria-pressed', String(show));
      const icon = btn.querySelector('iconify-icon');
      if (icon) icon.setAttribute('icon', show ? 'mynaui:eye-slash' : 'mynaui:eye');
    });
  });

  // Cerrar sesión (conservando los puntos e historial guardados de la cuenta)
  function logout(message) {
    state.user = null;
    try {
      localStorage.removeItem(SESSION_EMAIL_KEY);
    } catch (e) {}
    navigateTo('login');
    showToast(message);
  }

  document.querySelectorAll('.btn-logout').forEach(btn => {
    btn.addEventListener('click', () => logout('Cerraste sesión. Tus EcoPuntos quedaron guardados.'));
  });

  // ==========================================================================
  // MAPA INTERACTIVO: Buscador en tiempo real, Filtros de Categoría y Selección
  // ==========================================================================
  const mapSearchInput = document.getElementById('map-search-input');
  const mapFilterPills = document.querySelectorAll('.map-filter-pill');
  const mapMarkers = document.querySelectorAll('.map-marker');
  const mapRoutePath = document.getElementById('map-route-path');
  const nearbyCardTitle = document.getElementById('nearby-card-title');
  const nearbyCardSubtitle = document.getElementById('nearby-card-subtitle');
  const nearbyActionBtn = document.getElementById('btn-nearby-action');

  function selectMapMarker(marker) {
    if (!marker) return;
    const title = marker.dataset.title || 'Campana Verde - B° Alberdi';
    const subtitle = marker.dataset.subtitle || 'A solo 350m • Ruta peatonal: 4 min a pie';
    const status = marker.dataset.status || 'available';
    const route = marker.dataset.route;

    state.selectedPoint = title.replace(/\s*\(Lleno\)/i, '');
    state.selectedPointStatus = status;

    if (nearbyCardTitle) nearbyCardTitle.textContent = title;
    if (nearbyCardSubtitle) nearbyCardSubtitle.textContent = subtitle;
    if (mapRoutePath && route) mapRoutePath.setAttribute('d', route);
  }

  function filterMapMarkers() {
    const query = (mapSearchInput ? mapSearchInput.value : '').trim().toLowerCase();
    const activeCategories = [...mapFilterPills]
      .filter(pill => pill.getAttribute('aria-pressed') === 'true')
      .map(pill => pill.dataset.filter);

    let firstVisible = null;
    mapMarkers.forEach(marker => {
      const categoryMatch = activeCategories.includes(marker.dataset.category);
      const searchCorpus = `${marker.dataset.search || ''} ${marker.dataset.title || ''}`.toLowerCase();
      const queryMatch = !query || searchCorpus.includes(query);
      const visible = categoryMatch && queryMatch;
      marker.classList.toggle('hidden', !visible);
      if (visible && !firstVisible) firstVisible = marker;
    });

    if (firstVisible) {
      selectMapMarker(firstVisible);
      if (nearbyActionBtn) nearbyActionBtn.disabled = false;
    } else {
      if (nearbyCardTitle) nearbyCardTitle.textContent = 'Sin puntos encontrados';
      if (nearbyCardSubtitle) nearbyCardSubtitle.textContent = 'Probá otra búsqueda o activá los filtros superiores';
      if (nearbyActionBtn) nearbyActionBtn.disabled = true;
    }
  }

  mapFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const nextPressed = pill.getAttribute('aria-pressed') !== 'true';
      pill.setAttribute('aria-pressed', String(nextPressed));
      pill.classList.toggle('bg-emerald-800', nextPressed);
      pill.classList.toggle('text-white', nextPressed);
      pill.classList.toggle('border-emerald-600', nextPressed);
      pill.classList.toggle('bg-white/95', !nextPressed);
      pill.classList.toggle('dark:bg-slate-800/95', !nextPressed);
      pill.classList.toggle('text-slate-700', !nextPressed);
      pill.classList.toggle('dark:text-slate-200', !nextPressed);
      filterMapMarkers();
    });
  });

  if (mapSearchInput) {
    mapSearchInput.addEventListener('input', filterMapMarkers);
  }

  mapMarkers.forEach(marker => {
    marker.addEventListener('click', () => {
      selectMapMarker(marker);
      if (marker.dataset.status === 'full') {
        showToast('Esta campana está llena. Te sugerimos Campana Verde - B° Alberdi (a 350m).');
      } else {
        navigateTo('escaner');
      }
    });
  });

  if (nearbyActionBtn) {
    nearbyActionBtn.addEventListener('click', () => {
      if (state.selectedPointStatus === 'full') {
        showToast('Este punto está lleno. Seleccioná un contenedor vacío en el mapa.');
        return;
      }
      navigateTo('escaner');
    });
  }

  // ==========================================================================
  // ESCÁNER QR: Linterna / Flash, Selector de Material y Registro de Depósito
  // ==========================================================================
  const scannerFlashBtn = document.getElementById('btn-scanner-flash');
  const scannerViewfinder = document.getElementById('scanner-viewfinder');
  const scannerStatusHint = document.getElementById('scanner-status-hint');
  const materialBtns = document.querySelectorAll('.scanner-material-btn');

  if (scannerFlashBtn) {
    scannerFlashBtn.addEventListener('click', () => {
      state.scannerFlash = !state.scannerFlash;
      scannerFlashBtn.setAttribute('aria-pressed', String(state.scannerFlash));
      scannerFlashBtn.classList.toggle('bg-amber-400/20', state.scannerFlash);
      if (scannerViewfinder) scannerViewfinder.classList.toggle('scanner-flash-active', state.scannerFlash);
      if (scannerStatusHint) {
        scannerStatusHint.textContent = state.scannerFlash
          ? 'Linterna activa • Enfocá el código QR del contenedor'
          : 'Centrá el código QR de la campana o elegí el material a depositar';
      }
      showToast(state.scannerFlash ? 'Linterna de cámara activada.' : 'Linterna desactivada.');
    });
  }

  function updateScannerMaterialUI() {
    const mat = MATERIALS[state.selectedMaterial] || MATERIALS.pet;
    const codeEl = document.getElementById('scanner-material-code');
    const pointsEl = document.getElementById('scanner-material-points');
    const titleEl = document.getElementById('scanner-material-title');
    const descEl = document.getElementById('scanner-material-desc');

    if (codeEl) codeEl.textContent = mat.code;
    if (pointsEl) pointsEl.textContent = `+${mat.points} EcoPuntos`;
    if (titleEl) titleEl.textContent = mat.title;
    if (descEl) {
      descEl.innerHTML = `Depositá en <strong>${state.selectedPoint}</strong> para sumar <strong>+${mat.points} EcoPuntos</strong>.`;
    }

    materialBtns.forEach(btn => {
      const isSelected = btn.dataset.material === state.selectedMaterial;
      btn.setAttribute('aria-pressed', String(isSelected));
      btn.classList.toggle('bg-emerald-700', isSelected);
      btn.classList.toggle('text-white', isSelected);
      btn.classList.toggle('border-emerald-400', isSelected);
      btn.classList.toggle('bg-slate-800', !isSelected);
      btn.classList.toggle('text-slate-200', !isSelected);
      btn.classList.toggle('border-slate-700', !isSelected);
    });
  }

  materialBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedMaterial = btn.dataset.material;
      updateScannerMaterialUI();
    });
  });

  const btnRegisterDeposit = document.getElementById('btn-register-deposit');
  if (btnRegisterDeposit) {
    btnRegisterDeposit.addEventListener('click', () => {
      if (btnRegisterDeposit.disabled) return;
      btnRegisterDeposit.disabled = true;

      const mat = MATERIALS[state.selectedMaterial] || MATERIALS.pet;
      state.ecoPuntos += mat.points;

      const newItem = {
        id: Date.now(),
        title: mat.title,
        location: state.selectedPoint || 'Campana Verde Alberdi',
        time: 'Recién',
        points: mat.points
      };
      state.history.unshift(newItem);

      saveUserWallet();
      updatePointsUI();
      showToast(`¡Depósito registrado! Sumaste +${mat.points} EcoPuntos a tu billetera.`);
      navigateTo('puntos');

      setTimeout(() => {
        btnRegisterDeposit.disabled = false;
      }, 250);
    });
  }

  // ==========================================================================
  // MIS ECOPUNTOS: Progreso Dinámico, Comercios Adheridos e Historial (80% + h4)
  // ==========================================================================
  const toggleComerciosBtn = document.getElementById('btn-toggle-comercios');
  const extraComercioCard = document.getElementById('comercio-extra-card');

  if (toggleComerciosBtn && extraComercioCard) {
    toggleComerciosBtn.addEventListener('click', () => {
      const isHidden = extraComercioCard.classList.contains('hidden');
      extraComercioCard.classList.toggle('hidden', !isHidden);
      toggleComerciosBtn.setAttribute('aria-expanded', String(isHidden));
      toggleComerciosBtn.textContent = isHidden ? 'Ver menos' : 'Ver todos (4)';
    });
  }

  document.querySelectorAll('.btn-redeem-comercio').forEach(btn => {
    btn.addEventListener('click', () => {
      const comercio = btn.dataset.comercio || 'Comercio Adherido';
      const discount = btn.dataset.discount || 'descuento';
      const code = `ECO-${comercio.slice(0, 3).toUpperCase()}-2026`;
      showToast(`¡Cupón ${discount} en ${comercio}! Presentá el código ${code}.`);
    });
  });

  function updatePointsUI() {
    const balanceElements = document.querySelectorAll('.user-ecopuntos-val');
    balanceElements.forEach(el => {
      el.textContent = state.ecoPuntos.toLocaleString('es-AR');
    });

    // Actualizar barra de progreso dinámica hacia 1.500 pts
    const pct = Math.min(100, Math.round((state.ecoPuntos / GOAL_POINTS) * 100));
    const remaining = Math.max(0, GOAL_POINTS - state.ecoPuntos);
    const goalTextEl = document.getElementById('balance-goal-text');
    const progressPctEl = document.getElementById('balance-progress-pct');
    const progressFillEl = document.getElementById('balance-progress-fill');
    const progressBarEl = document.getElementById('balance-progressbar');

    if (goalTextEl) {
      goalTextEl.textContent = remaining === 0
        ? '¡Meta de 1.500 pts alcanzada! Beneficio desbloqueado'
        : `Próximo beneficio: 1.500 pts (faltan ${remaining.toLocaleString('es-AR')} pts)`;
    }
    if (progressPctEl) progressPctEl.textContent = `${pct}%`;
    if (progressFillEl) progressFillEl.style.width = `${pct}%`;
    if (progressBarEl) progressBarEl.setAttribute('aria-valuenow', String(Math.min(GOAL_POINTS, state.ecoPuntos)));

    // Renderizar lista de historial al 80% de ancho (w-4/5) con puntos en <h4> a la derecha
    const historyListContainer = document.getElementById('history-list');
    if (historyListContainer && state.history.length === 0) {
      historyListContainer.innerHTML = `
        <div class="w-4/5 mx-auto p-5 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 text-center space-y-3">
          <div class="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center" aria-hidden="true">
            <iconify-icon icon="keyline-icons:recycle-duotone" class="text-2xl" aria-hidden="true"></iconify-icon>
          </div>
          <p class="text-sm text-slate-600 dark:text-slate-300">
            Todavía no registraste depósitos. Escaneá tu primer reciclable para sumar EcoPuntos.
          </p>
          <button type="button" data-navigate="escaner" class="btn-primary text-xs px-4 py-2">
            <iconify-icon icon="mynaui:scan" class="text-lg" aria-hidden="true"></iconify-icon>
            <span>Escanear mi primer reciclable</span>
          </button>
        </div>`;
    } else if (historyListContainer) {
      historyListContainer.innerHTML = state.history.map(item => `
        <article class="w-4/5 mx-auto p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between gap-2 transition-all hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0" aria-hidden="true">
              <iconify-icon icon="keyline-icons:recycle-duotone" class="text-2xl" aria-hidden="true"></iconify-icon>
            </div>
            <div class="min-w-0">
              <h3 class="font-bold text-slate-800 dark:text-slate-100 text-lg truncate">${item.title}</h3>
              <p class="text-xs text-slate-600 dark:text-slate-400 truncate">${item.location} • ${item.time}</p>
            </div>
          </div>
          <h4 class="font-bold text-emerald-700 dark:text-emerald-400 text-base text-right shrink-0">+${item.points} pts</h4>
        </article>
      `).join('');
    }
  }

  // ==========================================================================
  // GUÍA Y CRONOGRAMA DE RECICLAJE (Modal <dialog>)
  // ==========================================================================
  const guideDialog = document.getElementById('guide-dialog');
  const openGuideBtn = document.getElementById('btn-open-guide');
  const closeGuideTopBtn = document.getElementById('btn-close-guide-top');

  function openGuideModal() {
    closeDrawer();
    if (guideDialog && typeof guideDialog.showModal === 'function') {
      guideDialog.showModal();
    }
  }

  if (openGuideBtn) openGuideBtn.addEventListener('click', openGuideModal);
  if (closeGuideTopBtn && guideDialog) {
    closeGuideTopBtn.addEventListener('click', () => guideDialog.close());
  }
  document.querySelectorAll('.link-help').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openGuideModal();
    });
  });

  // ==========================================================================
  // CONFIGURACIÓN: Perfil, Apariencia, Notificaciones y Cuenta
  // ==========================================================================
  const PROFILE_FIELDS = ['nombre', 'apellido', 'telefono', 'barrio'];
  const profileForm = document.getElementById('profile-form');
  const passwordForm = document.getElementById('password-form');
  const passwordFormToggle = document.getElementById('btn-toggle-password-form');
  const deleteAccountBtn = document.getElementById('btn-delete-account');
  const deleteAccountHint = document.getElementById('delete-account-hint');
  const deleteDialog = document.getElementById('delete-dialog');

  const isDemoUser = () => Boolean(state.user) && state.user.email === DEMO_ACCOUNT.email;

  function updateStoredAccount(changes) {
    if (isDemoUser()) {
      Object.assign(DEMO_ACCOUNT, changes);
      return;
    }
    const accounts = loadAccounts();
    const account = accounts.find(acc => acc.email === state.user.email);
    if (account) {
      Object.assign(account, changes);
      saveAccounts(accounts);
    }
  }

  function fillSettings() {
    if (!state.user || !profileForm) return;
    PROFILE_FIELDS.forEach(name => {
      profileForm.elements[name].value = state.user[name] || '';
    });
    profileForm.querySelectorAll('input, select').forEach(field => setFieldError(field, ''));
    profileForm.querySelector('[type="submit"]').disabled = true;
    setPasswordFormOpen(false);

    const demo = isDemoUser();
    deleteAccountBtn.disabled = demo;
    deleteAccountHint.classList.toggle('hidden', !demo);
  }

  if (profileForm) {
    const profileSubmit = profileForm.querySelector('[type="submit"]');
    const profileValue = name => {
      const value = profileForm.elements[name].value.trim();
      return name === 'telefono' ? normalizePhone(value) : value;
    };

    profileForm.addEventListener('input', () => {
      profileSubmit.disabled = !PROFILE_FIELDS.some(name => profileValue(name) !== (state.user[name] || ''));
    });

    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const errors = {};
      PROFILE_FIELDS.forEach(name => {
        errors[`cfg-${name}`] = validators[name](profileForm.elements[name].value);
      });
      if (!applyFormErrors(profileForm, errors)) return;

      const changes = {};
      PROFILE_FIELDS.forEach(name => {
        changes[name] = profileValue(name);
      });
      updateStoredAccount(changes);
      Object.assign(state.user, changes);
      updateUserUI();
      profileSubmit.disabled = true;
      showToast('Tus datos se guardaron correctamente.');
    });
  }

  function applyTextSize(size) {
    const root = document.documentElement;
    root.classList.remove('text-size-large', 'text-size-xlarge');
    if (size === 'large' || size === 'xlarge') root.classList.add(`text-size-${size}`);
    document.querySelectorAll('.text-size-option').forEach(option => {
      option.checked = option.value === size;
    });
  }

  applyTextSize(localStorage.getItem('ecoimperio_text_size') || 'normal');

  document.querySelectorAll('.text-size-option').forEach(option => {
    option.addEventListener('change', (e) => {
      applyTextSize(e.target.value);
      try {
        localStorage.setItem('ecoimperio_text_size', e.target.value);
      } catch (e) {}
    });
  });

  const reduceMotionToggle = document.getElementById('reduce-motion-toggle');
  if (reduceMotionToggle) {
    reduceMotionToggle.checked = document.documentElement.classList.contains('reduce-motion');
    reduceMotionToggle.addEventListener('change', (e) => {
      document.documentElement.classList.toggle('reduce-motion', e.target.checked);
      try {
        localStorage.setItem('ecoimperio_reduce_motion', String(e.target.checked));
      } catch (e) {}
    });
  }

  function loadNotificationPrefs() {
    try {
      return { ...DEFAULT_NOTIFICATIONS, ...JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY)) };
    } catch (e) {
      return { ...DEFAULT_NOTIFICATIONS };
    }
  }

  const notificationPrefs = loadNotificationPrefs();
  document.querySelectorAll('.notification-toggle').forEach(toggle => {
    toggle.checked = Boolean(notificationPrefs[toggle.dataset.pref]);
    toggle.addEventListener('change', (e) => {
      notificationPrefs[toggle.dataset.pref] = e.target.checked;
      try {
        localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notificationPrefs));
      } catch (e) {}
    });
  });

  function setPasswordFormOpen(open) {
    if (!passwordForm || !passwordFormToggle) return;
    passwordForm.classList.toggle('hidden', !open);
    passwordFormToggle.setAttribute('aria-expanded', String(open));
    passwordFormToggle.querySelector('.password-form-chevron').classList.toggle('rotate-180', open);
    if (open) {
      passwordForm.elements.actual.focus();
    } else {
      passwordForm.reset();
      passwordForm.querySelectorAll('input').forEach(field => {
        setFieldError(field, '');
        field.type = 'password';
      });
      passwordForm.querySelectorAll('.toggle-password').forEach(btn => {
        btn.setAttribute('aria-pressed', 'false');
        btn.querySelector('iconify-icon').setAttribute('icon', 'mynaui:eye');
      });
    }
  }

  async function isCurrentPassword(password) {
    if (isDemoUser()) return password === DEMO_ACCOUNT.password;
    const account = loadAccounts().find(acc => acc.email === state.user.email);
    return Boolean(account) && account.passwordHash === await hashPassword(password);
  }

  if (passwordForm && passwordFormToggle) {
    passwordFormToggle.addEventListener('click', () => {
      setPasswordFormOpen(passwordForm.classList.contains('hidden'));
    });

    passwordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const { actual, nueva, confirm } = Object.fromEntries(new FormData(passwordForm));
      const errors = {
        'cfg-pass-actual': actual ? '' : 'Ingresá tu contraseña actual.',
        'cfg-pass-nueva': validators.password(nueva) || (nueva === actual ? 'La nueva contraseña tiene que ser distinta de la actual.' : ''),
        'cfg-pass-confirm': confirm === nueva ? '' : 'Las contraseñas no coinciden.'
      };
      if (!applyFormErrors(passwordForm, errors)) return;

      const submitBtn = passwordForm.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      try {
        if (!(await isCurrentPassword(actual))) {
          applyFormErrors(passwordForm, { 'cfg-pass-actual': 'La contraseña actual no es correcta.' });
          return;
        }
        if (isDemoUser()) {
          DEMO_ACCOUNT.password = nueva;
        } else {
          updateStoredAccount({ passwordHash: await hashPassword(nueva) });
        }
        setPasswordFormOpen(false);
        passwordFormToggle.focus();
        showToast('Tu contraseña se actualizó.');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  if (deleteAccountBtn && deleteDialog) {
    deleteAccountBtn.addEventListener('click', () => {
      if (!isDemoUser()) {
        deleteDialog.showModal();
        const cancelBtn = deleteDialog.querySelector('button[value="cancel"]');
        if (cancelBtn) cancelBtn.focus();
      }
    });

    document.getElementById('btn-confirm-delete').addEventListener('click', () => {
      const emailToDelete = state.user.email;
      saveAccounts(loadAccounts().filter(acc => acc.email !== emailToDelete));
      const allData = loadAllUserData();
      delete allData[emailToDelete];
      saveAllUserData(allData);
      deleteDialog.close();
      logout('Tu cuenta fue eliminada.');
    });
  }

  // Inicializar UI de Puntos e Historial
  updatePointsUI();

  // Exponer API global para pruebas manuales y verificación
  window.EcoImperio = {
    state,
    navigateTo,
    openDrawer,
    closeDrawer,
    openGuideModal
  };
});
