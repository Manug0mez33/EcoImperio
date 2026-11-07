/* ==========================================================================
   INTERACTIVIDAD Y LÓGICA DE APLICACIÓN - ECOIMPERIO (Gentle-AI Vanilla JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Pantallas que requieren una sesión iniciada
  const PROTECTED_SCREENS = ['comunidad', 'mapa', 'escaner', 'puntos', 'historial', 'config', 'eventos', 'mas'];
  const ACCOUNTS_KEY = 'ecoimperio_accounts';
  const USER_DATA_KEY = 'ecoimperio_user_data';
  const SESSION_EMAIL_KEY = 'ecoimperio_session_email';
  const NOTIFICATIONS_KEY = 'ecoimperio_notifications';
  const COMMUNITY_POSTS_KEY = 'ecoimperio_community_posts';
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
      {
        id: 1,
        title: 'Botellas Plásticas PET (6 unidades)',
        location: 'Campana Verde Alberdi',
        time: 'Hoy, 14:32 hs',
        points: 15,
        containerStatus: 'Con capacidad (25% ocupado)',
        impact: '0,4 kg recuperados • 0,6 kg CO₂ evitado',
        ticketCode: '#ECO-1048'
      },
      {
        id: 2,
        title: 'Cartón y Papel Seco (Cajas plegadas)',
        location: 'Punto Limpio Banda Norte',
        time: '24 Ene, 11:15 hs',
        points: 45,
        containerStatus: 'Operativo con atención municipal (35% ocupado)',
        impact: '1,2 kg recuperados • 1,1 kg CO₂ evitado',
        ticketCode: '#ECO-1039'
      },
      {
        id: 3,
        title: 'Envases de Vidrio Sano (4 frascos)',
        location: 'Punto Limpio Plaza Roca',
        time: '18 Ene, 17:40 hs',
        points: 30,
        containerStatus: 'Con capacidad amplia (20% ocupado)',
        impact: '0,9 kg recuperados • 0,5 kg CO₂ evitado',
        ticketCode: '#ECO-1024'
      },
      {
        id: 4,
        title: 'Latas de Aluminio Compactadas',
        location: 'Campana Verde Bimaco',
        time: '12 Ene, 10:20 hs',
        points: 15,
        containerStatus: 'Con capacidad media (55% ocupado)',
        impact: '0,3 kg recuperados • 0,5 kg CO₂ evitado',
        ticketCode: '#ECO-1011'
      },
      {
        id: 5,
        title: 'Botellas Plásticas PET (8 unidades)',
        location: 'Campana Verde Alberdi',
        time: '05 Ene, 18:05 hs',
        points: 20,
        containerStatus: 'Recién vaciada por camión recolector (10% ocupado)',
        impact: '0,5 kg recuperados • 0,5 kg CO₂ evitado',
        ticketCode: '#ECO-0998'
      }
    ]
  };
  const HISTORY_PAGE_SIZE = 4;

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
    selectedPoint: 'Campana Verde - B° Alberdi',
    selectedPointStatus: 'available',
    selectedPointBonus: 10,
    historyPage: 1,
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
    // Si el vecino ya inició sesión, tocar "Inicio" abre el Muro Comunitario (Red Social Barrial)
    if (screenId === 'splash' && state.user) {
      screenId = 'comunidad';
    } else if (PROTECTED_SCREENS.includes(screenId) && !state.user) {
      // Sin sesión no se entra a las vistas protegidas: se redirige al inicio de sesión
      screenId = 'login';
    } else if ((screenId === 'login' || screenId === 'registro') && state.user) {
      // Si ya inició sesión, no volver al formulario de login a menos que cierre sesión explícitamente
      screenId = 'comunidad';
    }

    const screens = document.querySelectorAll('.screen-view');
    screens.forEach(screen => screen.classList.remove('active'));

    const targetScreen = document.getElementById(`screen-${screenId}`);
    if (targetScreen) {
      targetScreen.classList.add('active');
      targetScreen.scrollTop = 0;
      const scrollableChild = targetScreen.querySelector('.overflow-y-auto');
      if (scrollableChild) scrollableChild.scrollTop = 0;
      state.currentScreen = screenId;
    }
    if (screenId === 'config') fillSettings();
    if (screenId === 'escaner') updateScannerMaterialUI();
    if (screenId === 'comunidad') renderCommunityFeed();
    if (screenId === 'eventos') renderMyEvents();
    if (screenId === 'mas') updateMyEventsBadges();

    // Actualizar navbars activos
    updateNavbars(screenId);
    closeDrawer();
  }

  function updateNavbars(activeScreen) {
    let normalizedActive = activeScreen;
    if (activeScreen === 'splash') normalizedActive = 'comunidad';
    if (activeScreen === 'historial') normalizedActive = 'puntos';
    if (activeScreen === 'config' || activeScreen === 'eventos') normalizedActive = 'mas';

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const itemTarget = item.getAttribute('data-target');
      if (itemTarget === activeScreen || itemTarget === normalizedActive) {
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
    } else {
      navigateTo('mas');
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
    btn.addEventListener('click', (e) => {
      if (drawerMenu && drawerMenu.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer(e);
      }
    });
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

  // Notificación Toast (reemplaza alert() para no bloquear la interfaz, con botón 'X' para cerrar)
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const closeToastBtn = document.getElementById('btn-close-toast');
  let toastTimer;

  function hideToast() {
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.classList.remove('show');
  }

  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 4000);
  }

  if (closeToastBtn) {
    closeToastBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hideToast();
    });
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

  function syncSplashCTA() {
    const splashBtn = document.getElementById('btn-splash-start');
    const splashLabel = document.getElementById('btn-splash-start-label');
    if (!splashBtn || !splashLabel) return;
    if (state.user) {
      splashBtn.setAttribute('data-navigate', 'mapa');
      splashLabel.textContent = `Ir al Mapa (${state.user.nombre})`;
    } else {
      splashBtn.setAttribute('data-navigate', 'login');
      splashLabel.textContent = 'Comenzar';
    }
  }

  function updateUserUI() {
    syncSplashCTA();
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
    state.historyPage = 1;
    try {
      localStorage.setItem(SESSION_EMAIL_KEY, account.email);
    } catch (e) {}
    saveUserWallet();
    updateUserUI();
    updatePointsUI();
  }

  // Al iniciar la app, se limpia cualquier sesión previa para comenzar siempre desde la portada sin auto-login
  (function clearCachedSessionOnBoot() {
    try {
      localStorage.removeItem(SESSION_EMAIL_KEY);
      localStorage.removeItem(USER_DATA_KEY);
      localStorage.removeItem(COMMUNITY_POSTS_KEY);
    } catch (e) {}
    syncSplashCTA();
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
    if ( !EMAIL_PATTERN.test(email)) {
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

  // Validación instantánea en tiempo real en el evento onBlur / onChange (Concepto 02)
  function validateSingleField(field) {
    if (!field || !field.id) return;
    const val = field.value || '';
    switch (field.id) {
      case 'email':
        setFieldError(field, EMAIL_PATTERN.test(val.trim().toLowerCase()) ? '' : 'Ingresá un correo electrónico válido.');
        break;
      case 'password':
        setFieldError(field, val ? '' : 'Ingresá tu contraseña.');
        break;
      case 'reg-nombre':
      case 'cfg-nombre':
        setFieldError(field, validators.nombre(val));
        break;
      case 'reg-apellido':
      case 'cfg-apellido':
        setFieldError(field, validators.apellido(val));
        break;
      case 'reg-email': {
        const email = val.trim().toLowerCase();
        const accounts = loadAccounts();
        if (!EMAIL_PATTERN.test(email)) {
          setFieldError(field, 'Ingresá un correo electrónico válido.');
        } else if (email === DEMO_ACCOUNT.email || accounts.some(acc => acc.email === email)) {
          setFieldError(field, 'Ya existe una cuenta con este correo. Iniciá sesión.');
        } else {
          setFieldError(field, '');
        }
        break;
      }
      case 'reg-telefono':
      case 'cfg-telefono':
        setFieldError(field, validators.telefono(val));
        break;
      case 'reg-barrio':
      case 'cfg-barrio':
        setFieldError(field, validators.barrio(val));
        break;
      case 'reg-password':
        setFieldError(field, validators.password(val));
        break;
      case 'reg-password-confirm': {
        const passEl = document.getElementById('reg-password');
        setFieldError(field, passEl && val === passEl.value ? '' : 'Las contraseñas no coinciden.');
        break;
      }
      case 'cfg-pass-actual':
        setFieldError(field, val ? '' : 'Ingresá tu contraseña actual.');
        break;
      case 'cfg-pass-nueva': {
        const actualEl = document.getElementById('cfg-pass-actual');
        const msg = validators.password(val) || (actualEl && val === actualEl.value ? 'La nueva contraseña tiene que ser distinta de la actual.' : '');
        setFieldError(field, msg);
        break;
      }
      case 'cfg-pass-confirm': {
        const nuevaEl = document.getElementById('cfg-pass-nueva');
        setFieldError(field, nuevaEl && val === nuevaEl.value ? '' : 'Las contraseñas no coinciden.');
        break;
      }
      default:
        break;
    }
  }

  document.querySelectorAll('#login-form, #register-form, #profile-form, #password-form').forEach(form => {
    form.querySelectorAll('input:not([type="checkbox"]), select').forEach(field => {
      field.addEventListener('blur', () => validateSingleField(field));
      if (field.tagName === 'SELECT') {
        field.addEventListener('change', () => validateSingleField(field));
      }
    });
  });

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
    syncSplashCTA();
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
  // MAPA INTERACTIVO: Buscador, Filtros, Zoom/Pan Fluido y Auto-Focus con Ruta Dinámica
  // ==========================================================================
  const mapSearchInput = document.getElementById('map-search-input');
  const mapFilterPills = document.querySelectorAll('.map-filter-pill');
  const mapMarkers = document.querySelectorAll('.map-marker');
  const mapRoutePath = document.getElementById('map-route-path');
  const mapRouteGlow = document.getElementById('map-route-glow');
  const mapRouteTargetRing = document.getElementById('map-route-target-ring');
  const mapRouteChip = document.getElementById('map-route-chip');
  const mapCanvas = document.getElementById('map-canvas');
  const mapViewportArea = document.getElementById('map-viewport-area');
  const btnMapZoomIn = document.getElementById('btn-map-zoom-in');
  const btnMapZoomOut = document.getElementById('btn-map-zoom-out');
  const btnMapReset = document.getElementById('btn-map-reset');
  const nearbyCardTitle = document.getElementById('nearby-card-title');
  const nearbyCardSubtitle = document.getElementById('nearby-card-subtitle');
  const nearbyCardStatusBadge = document.getElementById('nearby-card-status-badge');
  const nearbyCardBonusBadge = document.getElementById('nearby-card-bonus-badge');
  const nearbyCardMaterials = document.getElementById('nearby-card-materials');
  const nearbyCardIcon = document.getElementById('nearby-card-icon');
  const nearbyCardIconWrap = document.getElementById('nearby-card-icon-wrap');
  const nearbyActionBtn = document.getElementById('btn-nearby-action');
  const nearbyActionLabel = document.getElementById('btn-nearby-action-label');

  let mapScale = 1;
  let mapPanX = 0;
  let mapPanY = 0;
  let isDraggingMap = false;
  let dragStartX = 0;
  let dragStartY = 0;

  function applyMapTransform(animate = true) {
    if (!mapCanvas) return;
    mapCanvas.style.transition = animate ? 'transform 0.16s cubic-bezier(0.22, 1, 0.36, 1)' : 'none';
    const rect = mapViewportArea ? mapViewportArea.getBoundingClientRect() : { width: 412, height: 680 };
    const width = rect.width || 412;
    const height = rect.height || 680;
    // El lienzo #map-canvas mide 170% x 170% (-left-[35%] -top-[35%]), por lo que su borde dibujado
    // llega hasta (0.85 * mapScale - 0.5) del viewport en cada eje. Clampeamos a 0.84 para no mostrar área vacía jamás.
    const maxPanX = Math.max(0, Math.floor((0.84 * mapScale - 0.5) * width));
    const maxPanY = Math.max(0, Math.floor((0.84 * mapScale - 0.5) * height));
    mapPanX = Math.max(-maxPanX, Math.min(maxPanX, mapPanX));
    mapPanY = Math.max(-maxPanY, Math.min(maxPanY, mapPanY));
    mapCanvas.style.transform = `translate(${mapPanX}px, ${mapPanY}px) scale(${mapScale})`;
  }

  function focusMapOnMarker(marker) {
    if (!marker || !mapCanvas) return;
    const targetX = Number(marker.dataset.x) || 50;
    const targetY = Number(marker.dataset.y) || 50;
    const rect = mapViewportArea ? mapViewportArea.getBoundingClientRect() : { width: 412, height: 680 };
    const width = rect.width || 412;
    const height = rect.height || 680;

    // Encuadrar el punto medio entre "Vos" (50, 54) y el marcador seleccionado
    const focusX = (targetX * 0.65) + (50 * 0.35);
    const focusY = (targetY * 0.65) + (54 * 0.35);

    mapPanX = Math.round(((50 - focusX) / 100) * width * 1.35 * mapScale);
    mapPanY = Math.round(((50 - focusY) / 100) * height * 1.15 * mapScale);
    applyMapTransform(true);
  }

  if (btnMapZoomIn) {
    btnMapZoomIn.addEventListener('click', () => {
      mapScale = Math.min(1.85, +(mapScale + 0.25).toFixed(2));
      applyMapTransform(true);
    });
  }

  if (btnMapZoomOut) {
    btnMapZoomOut.addEventListener('click', () => {
      mapScale = Math.max(1, +(mapScale - 0.25).toFixed(2));
      if (mapScale === 1) {
        mapPanX = 0;
        mapPanY = 0;
      }
      applyMapTransform(true);
    });
  }

  if (btnMapReset) {
    btnMapReset.addEventListener('click', () => {
      mapScale = 1;
      mapPanX = 0;
      mapPanY = 0;
      applyMapTransform(true);
      const alberdiMarker = document.querySelector('.map-marker[data-point-id="alberdi"]');
      if (alberdiMarker) selectMapMarker(alberdiMarker, { focusCamera: false, focusElement: false });
      showToast('Mapa centrado en tu ubicación actual.');
    });
  }

  if (mapViewportArea && mapCanvas) {
    mapViewportArea.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button, input, article, header, nav')) return;
      isDraggingMap = true;
      dragStartX = e.clientX - mapPanX;
      dragStartY = e.clientY - mapPanY;
      mapViewportArea.setPointerCapture(e.pointerId);
    });

    mapViewportArea.addEventListener('pointermove', (e) => {
      if (!isDraggingMap) return;
      mapPanX = e.clientX - dragStartX;
      mapPanY = e.clientY - dragStartY;
      applyMapTransform(false);
    });

    const stopMapDrag = () => {
      if (!isDraggingMap) return;
      isDraggingMap = false;
      applyMapTransform(true);
    };
    mapViewportArea.addEventListener('pointerup', stopMapDrag);
    mapViewportArea.addEventListener('pointercancel', stopMapDrag);
  }

  function selectMapMarker(marker, options = {}) {
    if (!marker) return;
    const { focusCamera = false, focusElement = false } = options;

    mapMarkers.forEach(m => {
      const active = m === marker;
      m.classList.toggle('is-selected', active);
      m.setAttribute('aria-pressed', String(active));
    });

    const rawTitle = marker.dataset.title || 'Campana Verde - B° Alberdi';
    const cleanTitle = rawTitle.replace(/\s*\((Lleno|\d+%)\)/i, '');
    const subtitle = marker.dataset.subtitle || 'A 350m (4 min)';
    const status = marker.dataset.status || 'available';
    const capacity = marker.dataset.capacity || (status === 'full' ? '98% ocupado' : (status === 'warning' ? '75% ocupado' : '25% ocupado'));
    const bonus = Number(marker.dataset.bonus) || 0;
    const materials = marker.dataset.materials || '';
    const route = marker.dataset.route;
    const targetX = marker.dataset.x || '41';
    const targetY = marker.dataset.y || '43';
    const chipX = marker.dataset.chipX || '44';
    const chipY = marker.dataset.chipY || '48';
    const distanceChip = marker.dataset.distanceChip || '350m • 4 min';
    const isFull = status === 'full';
    const isWarning = status === 'warning';

    state.selectedPoint = cleanTitle;
    state.selectedPointStatus = status;
    state.selectedPointBonus = bonus;

    if (nearbyCardTitle) nearbyCardTitle.textContent = cleanTitle;
    if (nearbyCardSubtitle) {
      nearbyCardSubtitle.textContent = isFull
        ? subtitle
        : (materials ? `${subtitle} • ${materials}` : subtitle);
    }

    if (nearbyCardStatusBadge) {
      nearbyCardStatusBadge.textContent = capacity;
      nearbyCardStatusBadge.className = isFull
        ? 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-300'
        : isWarning
          ? 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300'
          : 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200';
    }

    if (nearbyCardBonusBadge) {
      if (!isFull && bonus > 0) {
        nearbyCardBonusBadge.textContent = `+${bonus} pts Bonus`;
        nearbyCardBonusBadge.className = 'text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300';
      } else {
        nearbyCardBonusBadge.className = 'hidden';
      }
    }

    if (nearbyCardIcon && nearbyCardIconWrap) {
      nearbyCardIcon.setAttribute('icon', isFull ? 'mynaui:ban' : (marker.dataset.category === 'punto-limpio' ? 'mynaui:sparkles' : 'mynaui:location'));
      nearbyCardIconWrap.className = isFull
        ? 'w-9 h-9 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 mt-0.5'
        : isWarning
          ? 'w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5'
          : 'w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5';
    }

    if (nearbyActionLabel && nearbyActionBtn) {
      nearbyActionLabel.textContent = isFull ? 'Ver cercano' : 'Escanear';
      nearbyActionBtn.className = isFull
        ? 'touch-target px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1 shadow-md shrink-0 cursor-pointer transition-all'
        : 'touch-target px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-md shrink-0 cursor-pointer transition-all';
    }

    if (route) {
      if (mapRoutePath) {
        mapRoutePath.setAttribute('d', route);
        mapRoutePath.setAttribute('stroke', isFull ? '#dc2626' : (isWarning ? '#d97706' : '#059669'));
      }
      if (mapRouteGlow) {
        mapRouteGlow.setAttribute('d', route);
      }
    }

    if (mapRouteTargetRing) {
      mapRouteTargetRing.setAttribute('cx', targetX);
      mapRouteTargetRing.setAttribute('cy', targetY);
      mapRouteTargetRing.setAttribute('fill', isFull ? '#ef4444' : (isWarning ? '#f59e0b' : '#10b981'));
    }

    if (mapRouteChip) {
      mapRouteChip.style.left = `${chipX}%`;
      mapRouteChip.style.top = `${chipY}%`;
      mapRouteChip.textContent = distanceChip;
      mapRouteChip.className = isFull
        ? 'absolute -translate-x-1/2 -translate-y-1/2 z-[8] pointer-events-none px-2 py-0.5 rounded-full bg-red-700/95 text-white text-[10px] font-extrabold shadow-md border border-red-300 whitespace-nowrap'
        : isWarning
          ? 'absolute -translate-x-1/2 -translate-y-1/2 z-[8] pointer-events-none px-2 py-0.5 rounded-full bg-amber-700/95 text-white text-[10px] font-extrabold shadow-md border border-amber-300 whitespace-nowrap'
          : 'absolute -translate-x-1/2 -translate-y-1/2 z-[8] pointer-events-none px-2 py-0.5 rounded-full bg-emerald-900/95 text-white text-[10px] font-extrabold shadow-md border border-emerald-400/80 whitespace-nowrap';
    }

    if (focusCamera) {
      focusMapOnMarker(marker);
    }
    if (focusElement) {
      try {
        marker.focus({ preventScroll: true });
      } catch (e) {}
    }
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
      selectMapMarker(firstVisible, { focusCamera: Boolean(query), focusElement: false });
      if (nearbyActionBtn) nearbyActionBtn.disabled = false;
    } else {
      if (nearbyCardTitle) nearbyCardTitle.textContent = 'Sin puntos encontrados';
      if (nearbyCardSubtitle) nearbyCardSubtitle.textContent = 'Probá otra búsqueda o activá los filtros superiores';
      if (nearbyActionBtn) nearbyActionBtn.disabled = true;
    }
  }

  function setMapFilterPillActive(targetPill, isActive) {
    targetPill.setAttribute('aria-pressed', String(isActive));
    targetPill.classList.toggle('bg-emerald-800', isActive);
    targetPill.classList.toggle('text-white', isActive);
    targetPill.classList.toggle('border-emerald-600', isActive);
    targetPill.classList.toggle('bg-white/95', !isActive);
    targetPill.classList.toggle('dark:bg-slate-800/95', !isActive);
    targetPill.classList.toggle('text-slate-700', !isActive);
    targetPill.classList.toggle('dark:text-slate-200', !isActive);
  }

  mapFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const nextPressed = pill.getAttribute('aria-pressed') !== 'true';
      if (!nextPressed) {
        const activeCount = [...mapFilterPills].filter(p => p.getAttribute('aria-pressed') === 'true').length;
        if (activeCount <= 1) {
          mapFilterPills.forEach(other => {
            if (other !== pill) setMapFilterPillActive(other, true);
          });
        }
      }
      setMapFilterPillActive(pill, nextPressed);
      filterMapMarkers();
    });
  });

  if (mapSearchInput) {
    mapSearchInput.addEventListener('input', filterMapMarkers);
  }

  let lastMarkerActivationAt = 0;
  function handleMarkerActivate(marker, e) {
    if (e) e.stopPropagation();
    const now = Date.now();
    const isDuplicate = now - lastMarkerActivationAt < 350;
    lastMarkerActivationAt = now;

    selectMapMarker(marker, { focusCamera: true, focusElement: true });
    if (!isDuplicate) {
      if (marker.dataset.status === 'full') {
        showToast('Punto sin lugar. Tocá "Ver cercano" abajo.');
      } else {
        showToast(`Ruta trazada a ${marker.dataset.title}.`);
      }
    }
  }

  mapMarkers.forEach(marker => {
    marker.addEventListener('pointerdown', (e) => {
      if (e.button && e.button !== 0) return;
      handleMarkerActivate(marker, e);
    });
    marker.addEventListener('click', (e) => {
      handleMarkerActivate(marker, e);
    });
  });

  if (nearbyActionBtn) {
    nearbyActionBtn.addEventListener('click', () => {
      if (state.selectedPointStatus === 'full') {
        const availableMarker = [...mapMarkers].find(m => !m.classList.contains('hidden') && m.dataset.status === 'available');
        if (availableMarker) {
          selectMapMarker(availableMarker, { focusCamera: true, focusElement: true });
          showToast(`Redirigido a ${availableMarker.dataset.title} (disponible).`);
        } else {
          showToast('Activá los filtros superiores para ver puntos con lugar disponible.');
        }
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

  function getPointBonus(pointTitle) {
    if (/alberdi|plaza roca|centro/i.test(pointTitle || '')) {
      return 10;
    }
    return 0;
  }

  function getTargetDepositLocation(materialKey) {
    const mat = MATERIALS[materialKey] || MATERIALS.pet;
    const currentPoint = state.selectedPoint || 'Campana Verde - B° Alberdi';
    if (mat.container === 'Punto Limpio' && !/punto limpio/i.test(currentPoint)) {
      return {
        targetPoint: 'Punto Limpio - Plaza Roca',
        redirected: true,
        bonusPoints: 10
      };
    }
    return {
      targetPoint: currentPoint,
      redirected: false,
      bonusPoints: getPointBonus(currentPoint)
    };
  }

  function updateScannerMaterialUI() {
    const mat = MATERIALS[state.selectedMaterial] || MATERIALS.pet;
    const codeEl = document.getElementById('scanner-material-code');
    const pointsEl = document.getElementById('scanner-material-points');
    const titleEl = document.getElementById('scanner-material-title');
    const descEl = document.getElementById('scanner-material-desc');
    const { targetPoint, redirected, bonusPoints } = getTargetDepositLocation(state.selectedMaterial);
    const totalPoints = mat.points + bonusPoints;

    if (codeEl) codeEl.textContent = mat.code;
    if (pointsEl) {
      pointsEl.textContent = bonusPoints > 0
        ? `+${totalPoints} pts (${mat.points} + ${bonusPoints} Bonus)`
        : `+${mat.points} EcoPuntos`;
    }
    if (titleEl) titleEl.textContent = mat.title;
    if (descEl) {
      if (redirected) {
        descEl.innerHTML = `El vidrio se recibe en <strong>${targetPoint} (15%)</strong>. Sumás <strong>+${mat.points} pts</strong> + <strong>${bonusPoints} pts Bonus</strong> por baja ocupación (Total: <strong>+${totalPoints} EcoPuntos</strong>).`;
      } else if (bonusPoints > 0) {
        descEl.innerHTML = `Depositá en <strong>${targetPoint}</strong> (baja ocupación) y sumá <strong>+${mat.points} pts</strong> + <strong>${bonusPoints} pts Bonus</strong> para equilibrar el llenado (Total: <strong>+${totalPoints} EcoPuntos</strong>).`;
      } else {
        descEl.innerHTML = `Depositá en <strong>${targetPoint} (75%)</strong> para sumar <strong>+${mat.points} EcoPuntos</strong>. <em>Tip: las campanas más vacías otorgan +10 pts bonus.</em>`;
      }
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
      const { targetPoint, bonusPoints } = getTargetDepositLocation(state.selectedMaterial);
      const totalPoints = mat.points + bonusPoints;
      state.ecoPuntos += totalPoints;

      const nowStr = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
      const selectedMarkerEl = [...document.querySelectorAll('.map-marker')].find(m => (m.dataset.title || '').includes(targetPoint));
      const capacityStr = selectedMarkerEl && selectedMarkerEl.dataset.capacity
        ? (bonusPoints > 0 ? `Baja ocupación (${selectedMarkerEl.dataset.capacity}) • +${bonusPoints} pts Bonus` : `Ocupación media-alta (${selectedMarkerEl.dataset.capacity})`)
        : (bonusPoints > 0 ? `Baja ocupación (25% ocupado) • +${bonusPoints} pts Bonus` : 'Ocupación media-alta (75% ocupado)');
      const co2Saved = (totalPoints * 0.04).toFixed(1).replace('.', ',');

      const newItem = {
        id: Date.now(),
        title: bonusPoints > 0 ? `${mat.title} (+${bonusPoints} pts Bonus vaciado parejo)` : `${mat.title} (${mat.code})`,
        location: targetPoint,
        time: `Hoy, ${nowStr} hs`,
        points: totalPoints,
        containerStatus: capacityStr,
        impact: `Material limpio verificado • ${co2Saved} kg CO₂ evitado`,
        ticketCode: `#ECO-${String(Date.now()).slice(-4)}`
      };
      state.history.unshift(newItem);
      state.historyPage = 1;

      saveUserWallet();
      updatePointsUI();
      showToast(
        bonusPoints > 0
          ? `¡Depósito registrado! Sumaste +${totalPoints} EcoPuntos (${mat.points} base + ${bonusPoints} bonus por campana con baja ocupación).`
          : `¡Depósito registrado! Sumaste +${totalPoints} EcoPuntos a tu billetera.`
      );
      navigateTo('puntos');

      setTimeout(() => {
        btnRegisterDeposit.disabled = false;
      }, 250);
    });
  }

  // ==========================================================================
  // MIS ECOPUNTOS: Progreso Dinámico, Carrusel Horizontal de Comercios e Historial
  // ==========================================================================
  const comerciosGrid = document.getElementById('comercios-grid');
  const btnHistoryPrev = document.getElementById('btn-history-prev');
  const btnHistoryNext = document.getElementById('btn-history-next');

  if (btnHistoryPrev) {
    btnHistoryPrev.addEventListener('click', () => {
      if (state.historyPage > 1) {
        state.historyPage -= 1;
        updatePointsUI();
      }
    });
  }

  if (btnHistoryNext) {
    btnHistoryNext.addEventListener('click', () => {
      const totalPages = Math.max(1, Math.ceil(state.history.length / HISTORY_PAGE_SIZE));
      if (state.historyPage < totalPages) {
        state.historyPage += 1;
        updatePointsUI();
      }
    });
  }

  // Soporte de desplazamiento horizontal intuitivo con rueda del mouse y drag en Comercios Adheridos
  if (comerciosGrid) {
    let isDraggingComercios = false;
    let startScrollX = 0;
    let initialScrollLeft = 0;

    comerciosGrid.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        comerciosGrid.scrollBy({ left: e.deltaY * 1.15, behavior: 'smooth' });
      }
    }, { passive: false });

    comerciosGrid.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch' || e.target.closest('button')) return;
      isDraggingComercios = true;
      startScrollX = e.clientX;
      initialScrollLeft = comerciosGrid.scrollLeft;
      comerciosGrid.style.scrollSnapType = 'none';
      comerciosGrid.setPointerCapture(e.pointerId);
    });

    comerciosGrid.addEventListener('pointermove', (e) => {
      if (!isDraggingComercios) return;
      const dx = e.clientX - startScrollX;
      comerciosGrid.scrollLeft = initialScrollLeft - dx;
    });

    const endComerciosDrag = () => {
      if (!isDraggingComercios) return;
      isDraggingComercios = false;
      comerciosGrid.style.scrollSnapType = '';
    };
    comerciosGrid.addEventListener('pointerup', endComerciosDrag);
    comerciosGrid.addEventListener('pointercancel', endComerciosDrag);
  }

  const redeemDialog = document.getElementById('redeem-dialog');
  const redeemDialogDesc = document.getElementById('redeem-dialog-desc');
  const confirmRedeemBtn = document.getElementById('btn-confirm-redeem');
  const cancelRedeemBtn = document.getElementById('btn-cancel-redeem');
  let pendingRedemption = null;

  document.querySelectorAll('.btn-redeem-comercio').forEach(btn => {
    btn.addEventListener('click', () => {
      const comercio = btn.dataset.comercio || 'Comercio Adherido';
      const discount = btn.dataset.discount || 'descuento';
      const cost = Number(btn.dataset.cost) || 150;

      if (state.ecoPuntos < cost) {
        const missing = cost - state.ecoPuntos;
        showToast(`Te faltan ${missing.toLocaleString('es-AR')} EcoPuntos para canjear en ${comercio}. ¡Escaneá reciclables para sumarlos!`);
        return;
      }

      pendingRedemption = { comercio, discount, cost, triggerBtn: btn };
      if (redeemDialog && redeemDialogDesc && typeof redeemDialog.showModal === 'function') {
        redeemDialogDesc.textContent = `Vas a canjear ${cost} EcoPuntos por un cupón de ${discount} en ${comercio}. Tu saldo quedará en ${(state.ecoPuntos - cost).toLocaleString('es-AR')} EcoPuntos.`;
        if (confirmRedeemBtn) confirmRedeemBtn.textContent = `Confirmar canje (-${cost} pts)`;
        redeemDialog.showModal();
        if (cancelRedeemBtn) cancelRedeemBtn.focus();
      } else {
        executeRedemption();
      }
    });
  });

  function executeRedemption() {
    if (!pendingRedemption) return;
    const { comercio, discount, cost, triggerBtn } = pendingRedemption;
    pendingRedemption = null;

    if (state.ecoPuntos < cost) return;
    state.ecoPuntos -= cost;

    const cleanPrefix = comercio.replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase() || 'ECO';
    const code = `ECO-${cleanPrefix}-2026`;

    const nowStr = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    state.history.unshift({
      id: Date.now(),
      type: 'redeem',
      title: `Beneficio canjeado: ${discount}`,
      location: comercio,
      time: `Hoy, ${nowStr} hs`,
      points: -cost,
      containerStatus: 'Comercio adherido activo • Cupón listo para usar',
      impact: `Descuento local sustentable • Código ${code}`,
      ticketCode: `#${code}`
    });
    state.historyPage = 1;

    saveUserWallet();
    updatePointsUI();
    if (redeemDialog && redeemDialog.open) redeemDialog.close();
    if (triggerBtn) triggerBtn.focus();
    showToast(`¡Cupón ${discount} en ${comercio}! Código: ${code} (-${cost} EcoPuntos).`);
  }

  if (confirmRedeemBtn) {
    confirmRedeemBtn.addEventListener('click', executeRedemption);
  }

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

    // Actualizar tarjeta de resumen hacia Historial en Mis EcoPuntos y KPIs en #screen-historial
    const historyListContainer = document.getElementById('history-list');
    const historyPagination = document.getElementById('history-pagination');
    const historyPageIndicator = document.getElementById('history-page-indicator');
    const historyTotalBadge = document.getElementById('history-total-badge');
    const puntosHistorySummary = document.getElementById('puntos-history-summary');
    const statCountEl = document.getElementById('history-stat-count');
    const statEarnedEl = document.getElementById('history-stat-earned');
    const statCo2El = document.getElementById('history-stat-co2');

    const totalItems = state.history.length;
    const earnedPoints = state.history.reduce((acc, it) => acc + (it.points > 0 ? it.points : 0), 0);
    const co2Total = (earnedPoints * 0.025).toFixed(1).replace('.', ',');

    if (puntosHistorySummary) {
      puntosHistorySummary.textContent = totalItems > 0
        ? `${totalItems} movimientos registrados • Tocá para ver detalles`
        : 'Sin movimientos aún • Escaneá tu primer reciclable';
    }
    if (statCountEl) statCountEl.textContent = String(totalItems);
    if (statEarnedEl) statEarnedEl.textContent = `+${earnedPoints}`;
    if (statCo2El) statCo2El.textContent = `${co2Total} kg`;

    const totalPages = Math.max(1, Math.ceil(totalItems / HISTORY_PAGE_SIZE));
    if (state.historyPage > totalPages) state.historyPage = totalPages;
    if (state.historyPage < 1) state.historyPage = 1;

    if (historyTotalBadge) {
      historyTotalBadge.textContent = totalItems > 0 ? `${totalItems} registros` : '';
    }

    if (historyListContainer && totalItems === 0) {
      if (historyPagination) historyPagination.classList.add('hidden');
      historyListContainer.innerHTML = `
        <div class="p-5 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 text-center space-y-3">
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
      const startIdx = (state.historyPage - 1) * HISTORY_PAGE_SIZE;
      const pageItems = state.history.slice(startIdx, startIdx + HISTORY_PAGE_SIZE);

      historyListContainer.innerHTML = pageItems.map((item, idx) => {
        const isRedeem = item.type === 'redeem' || item.points < 0;
        const iconName = isRedeem ? 'mynaui:gift' : 'mynaui:location';
        const iconWrapClass = isRedeem
          ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300'
          : 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300';
        const pointsClass = isRedeem
          ? 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800'
          : 'text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800';
        const pointsLabel = item.points > 0 ? `+${item.points} pts` : `${item.points} pts`;

        const materialText = item.title || 'Material reciclable separado en origen';
        const timeText = item.time || 'Recién';
        const statusText = item.containerStatus || (isRedeem ? 'Cupón verificado en comercio adherido' : 'Con capacidad (30% ocupado)');
        const impactText = item.impact || (isRedeem ? 'Canje sustentable en comercio local' : 'Material recuperado • 0,5 kg CO₂ evitado');
        const ticketText = item.ticketCode || `#ECO-10${40 + idx}`;

        return `
        <details name="history-accordion" class="history-card-item group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden transition-all open:border-emerald-500 dark:open:border-emerald-500 open:shadow-md">
          <summary class="px-3.5 py-3 cursor-pointer list-none flex items-center justify-between gap-2.5 select-none hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-9 h-9 rounded-xl ${iconWrapClass} flex items-center justify-center shrink-0" aria-hidden="true">
                <iconify-icon icon="${iconName}" class="text-xl" aria-hidden="true"></iconify-icon>
              </div>
              <div class="min-w-0">
                <h3 class="font-bold text-slate-900 dark:text-white text-sm leading-snug">${item.location}</h3>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">Tocá para ver detalle del registro</p>
              </div>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <span class="px-2.5 py-1 rounded-xl border text-xs font-black ${pointsClass}">${pointsLabel}</span>
              <iconify-icon icon="mynaui:chevron-down" class="text-lg text-slate-400 dark:text-slate-500 transition-transform duration-200 group-open:rotate-180 group-open:text-emerald-600" aria-hidden="true"></iconify-icon>
            </div>
          </summary>

          <div class="px-3.5 pb-3.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 space-y-2 text-xs">
            <div class="flex items-start justify-between gap-2">
              <span class="text-slate-500 dark:text-slate-400 font-semibold shrink-0">Qué se registró:</span>
              <span class="font-bold text-slate-900 dark:text-white text-right">${materialText}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-slate-500 dark:text-slate-400 font-semibold shrink-0">Fecha y hora:</span>
              <span class="font-semibold text-slate-800 dark:text-slate-200 text-right">${timeText}</span>
            </div>
            <div class="flex items-start justify-between gap-2">
              <span class="text-slate-500 dark:text-slate-400 font-semibold shrink-0">Estado en ese momento:</span>
              <span class="font-semibold text-emerald-700 dark:text-emerald-400 text-right">${statusText}</span>
            </div>
            <div class="pt-1.5 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-2 text-[11px]">
              <span class="font-semibold text-slate-600 dark:text-slate-300">${impactText}</span>
              <span class="px-2 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold shrink-0">${ticketText}</span>
            </div>
          </div>
        </details>
      `;
      }).join('');

      if (historyPagination) {
        historyPagination.classList.toggle('hidden', totalPages <= 1);
      }
      if (historyPageIndicator) {
        historyPageIndicator.textContent = `Página ${state.historyPage} de ${totalPages}`;
      }
      if (btnHistoryPrev) {
        btnHistoryPrev.disabled = state.historyPage <= 1;
      }
      if (btnHistoryNext) {
        btnHistoryNext.disabled = state.historyPage >= totalPages;
      }
    }
  }

  // ==========================================================================
  // GUÍA Y CRONOGRAMA CON PESTAÑAS + CENTRO DE AYUDA RÁPIDA (Modales <dialog>)
  // ==========================================================================
  const guideDialog = document.getElementById('guide-dialog');
  const openGuideBtn = document.getElementById('btn-open-guide');
  const closeGuideTopBtn = document.getElementById('btn-close-guide-top');
  const guideTabBtns = document.querySelectorAll('.guide-tab-btn');
  const guidePanelHorarios = document.getElementById('guide-panel-horarios');
  const guidePanelSeparacion = document.getElementById('guide-panel-separacion');
  const guideUserBarrioPill = document.getElementById('guide-user-barrio-pill');
  const helpDialog = document.getElementById('help-dialog');
  const closeHelpTopBtn = document.getElementById('btn-close-help-top');
  const btnHelpToGuide = document.getElementById('btn-help-to-guide');

  function setGuideTab(tabName) {
    const isHorarios = tabName !== 'separacion';
    guideTabBtns.forEach(btn => {
      const active = btn.dataset.guideTab === (isHorarios ? 'horarios' : 'separacion');
      btn.setAttribute('aria-selected', String(active));
      btn.setAttribute('aria-pressed', String(active));
      btn.classList.toggle('bg-emerald-800', active);
      btn.classList.toggle('text-white', active);
      btn.classList.toggle('shadow-sm', active);
      btn.classList.toggle('text-slate-700', !active);
      btn.classList.toggle('dark:text-slate-300', !active);
    });
    if (guidePanelHorarios) guidePanelHorarios.classList.toggle('hidden', !isHorarios);
    if (guidePanelSeparacion) guidePanelSeparacion.classList.toggle('hidden', isHorarios);
  }

  guideTabBtns.forEach(btn => {
    btn.addEventListener('click', () => setGuideTab(btn.dataset.guideTab));
  });

  function highlightUserZoneInGuide() {
    const userBarrio = (state.user && state.user.barrio ? state.user.barrio : 'Alberdi').toLowerCase();
    if (guideUserBarrioPill) {
      guideUserBarrioPill.textContent = `Tu barrio: ${state.user && state.user.barrio ? state.user.barrio : 'Alberdi'}`;
    }
    document.querySelectorAll('.schedule-zone-card').forEach(card => {
      const zones = (card.dataset.zones || '').toLowerCase();
      const isUserZone = zones.includes(userBarrio);
      card.classList.toggle('border-emerald-500', isUserZone);
      card.classList.toggle('ring-2', isUserZone);
      card.classList.toggle('ring-emerald-500/30', isUserZone);
    });
  }

  function openGuideModal() {
    closeDrawer();
    highlightUserZoneInGuide();
    setGuideTab('horarios');
    if (guideDialog && typeof guideDialog.showModal === 'function') {
      guideDialog.showModal();
    }
  }

  function openHelpModal() {
    closeDrawer();
    if (helpDialog && typeof helpDialog.showModal === 'function') {
      helpDialog.showModal();
    } else {
      openGuideModal();
    }
  }

  const btnDrawerHelp = document.getElementById('btn-drawer-help');
  const btnGuideToHelp = document.getElementById('btn-guide-to-help');
  if (openGuideBtn) openGuideBtn.addEventListener('click', openGuideModal);
  if (btnDrawerHelp) btnDrawerHelp.addEventListener('click', openHelpModal);
  if (closeGuideTopBtn && guideDialog) {
    closeGuideTopBtn.addEventListener('click', () => guideDialog.close());
  }
  if (closeHelpTopBtn && helpDialog) {
    closeHelpTopBtn.addEventListener('click', () => helpDialog.close());
  }
  if (btnHelpToGuide) {
    btnHelpToGuide.addEventListener('click', () => {
      if (helpDialog && helpDialog.open) helpDialog.close();
      openGuideModal();
    });
  }
  if (btnGuideToHelp) {
    btnGuideToHelp.addEventListener('click', () => {
      if (guideDialog && guideDialog.open) guideDialog.close();
      openHelpModal();
    });
  }
  document.querySelectorAll('.link-help').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openHelpModal();
    });
  });

  // Acordeón exclusivo para Centro de Ayuda (.help-faq-item), Historial (.history-card-item) y Menú Más (.mas-accordion-item):
  // Al desplegar un ítem <details>, cualquier otro ítem abierto del mismo grupo se cierra automáticamente.
  document.addEventListener('toggle', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLDetailsElement) || !target.open) return;
    if (target.classList.contains('help-faq-item')) {
      document.querySelectorAll('.help-faq-item').forEach(other => {
        if (other !== target && other.open) other.open = false;
      });
    } else if (target.classList.contains('history-card-item')) {
      document.querySelectorAll('.history-card-item').forEach(other => {
        if (other !== target && other.open) other.open = false;
      });
    } else if (target.classList.contains('mas-accordion-item')) {
      document.querySelectorAll('.mas-accordion-item').forEach(other => {
        if (other !== target && other.open) other.open = false;
      });
    }
  }, true);

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
  const resetDemoWrap = document.getElementById('reset-demo-wrap');
  const resetDemoBtn = document.getElementById('btn-reset-demo');

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
    if (resetDemoWrap) resetDemoWrap.classList.toggle('hidden', !demo);
  }

  if (resetDemoBtn) {
    resetDemoBtn.addEventListener('click', () => {
      state.ecoPuntos = DEMO_WALLET.ecoPuntos;
      state.history = DEMO_WALLET.history.slice();
      state.historyPage = 1;
      communityPosts = INITIAL_COMMUNITY_POSTS.map(cloneCommunityPost);
      saveCommunityPosts(communityPosts);
      saveUserWallet();
      updatePointsUI();
      renderCommunityFeed();
      renderMyEvents();
      showToast('Datos de demostración restablecidos (1.250 EcoPuntos, historial y muro comunitario).');
    });
  }

  // ==========================================================================
  // COMUNIDAD VERDE (MURO SOCIAL BARRIAL) Y MIS EVENTOS AGENDADOS
  // ==========================================================================
  const DEFAULT_EVENT_CHECKLIST = [
    { id: 'sep', label: 'Reciclables limpios, secos y aplastados', done: true },
    { id: 'bag', label: 'Bolsa reutilizable o caja plegada', done: false },
    { id: 'qr', label: 'Credencial QR de vecino en la app', done: false }
  ];

  const INITIAL_COMMUNITY_POSTS = [
    {
      id: 'evt-plaza-roca',
      type: 'evento',
      badge: 'ECOEVENTO MUNICIPAL • SÁB 15 NOV, 10:00 HS',
      title: 'Feria Circular y EcoCanje en Plaza Roca',
      location: 'Plaza Roca (Centro)',
      pointId: 'centro',
      bonusPoints: 50,
      reminder: '24h',
      checklist: DEFAULT_EVENT_CHECKLIST.map(item => ({ ...item })),
      caption: 'Acercate con tus reciclables limpios y secos: canjeamos por plantines nativos, compost municipal y +50 EcoPuntos extra en tu billetera.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
      attendees: 43,
      attending: true
    },
    {
      id: 'post-lucia-alberdi',
      type: 'deposito',
      author: 'Lucía Fernández',
      initials: 'LF',
      barrio: 'B° Alberdi',
      time: 'Hace 25 min',
      location: 'Campana Verde - B° Alberdi',
      pointId: 'alberdi',
      pointsBadge: '+20 EcoPuntos (+10 Bonus)',
      caption: '¡Dejando las botellas PET aplastadas de la semana! La campana de Alberdi estaba al 25% y me sumó +10 pts bonus por baja ocupación.',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
      likes: 18,
      liked: false
    },
    {
      id: 'post-martin-norte',
      type: 'deposito',
      author: 'Martín Sosa',
      initials: 'MS',
      barrio: 'B° Centro',
      time: 'Hace 2 horas',
      location: 'Punto Limpio - Plaza Roca (Centro)',
      pointId: 'centro',
      pointsBadge: '+30 EcoPuntos (+10 Bonus)',
      caption: 'Hoy llevamos todas las cajas de cartón plegadas y frascos de vidrio sano al Punto Limpio de Plaza Roca (15% ocupado). ¡Sumando para la panadería!',
      image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=600&q=80',
      likes: 24,
      liked: false
    },
    {
      id: 'evt-raee-sarmiento',
      type: 'evento',
      badge: 'JORNADA BARRIAL • DOM 23 NOV, 16:00 HS',
      title: 'Recolección de Electrónicos (RAEE) en Parque Sarmiento',
      location: 'Anfiteatro Parque Sarmiento (Banda Norte)',
      pointId: 'banda-norte',
      bonusPoints: 50,
      reminder: '24h',
      checklist: DEFAULT_EVENT_CHECKLIST.map(item => ({ ...item, done: false })),
      caption: 'Recibimos celulares, cables, teclados y pequeños electrodomésticos en desuso para recuperación segura de componentes.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
      attendees: 31,
      attending: false
    },
    {
      id: 'evt-compost-alberdi',
      type: 'evento',
      badge: 'TALLER VECINAL • SÁB 29 NOV, 17:30 HS',
      title: 'Taller de Compostaje Domiciliario y Canje Verde',
      location: 'Centro Cívico B° Alberdi',
      pointId: 'alberdi',
      bonusPoints: 50,
      reminder: '2h',
      checklist: DEFAULT_EVENT_CHECKLIST.map(item => ({ ...item, done: false })),
      caption: 'Aprendé a transformar tus residuos orgánicos en abono y llevate un núcleo de lombrices californianas + 50 EcoPuntos.',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
      attendees: 19,
      attending: false
    }
  ];

  function resolvePointIdFromLocation(location) {
    const loc = (location || '').toLowerCase();
    if (loc.includes('alberdi')) return 'alberdi';
    if (loc.includes('plaza roca') || loc.includes('centro')) return 'centro';
    if (loc.includes('bimaco')) return 'bimaco';
    if (loc.includes('norte') || loc.includes('sarmiento')) return 'banda-norte';
    return 'alberdi';
  }

  function cloneCommunityPost(post) {
    return {
      ...post,
      pointId: post.pointId || resolvePointIdFromLocation(post.location),
      checklist: Array.isArray(post.checklist)
        ? post.checklist.map(item => ({ ...item }))
        : (post.type === 'evento' ? DEFAULT_EVENT_CHECKLIST.map(item => ({ ...item })) : undefined)
    };
  }

  function loadCommunityPosts() {
    try {
      const raw = JSON.parse(localStorage.getItem(COMMUNITY_POSTS_KEY));
      if (Array.isArray(raw) && raw.length > 0) return raw.map(cloneCommunityPost);
    } catch (e) {}
    return INITIAL_COMMUNITY_POSTS.map(cloneCommunityPost);
  }

  function saveCommunityPosts(posts) {
    try {
      localStorage.setItem(COMMUNITY_POSTS_KEY, JSON.stringify(posts));
    } catch (e) {}
  }

  let communityPosts = loadCommunityPosts();
  let activeCommunityFilter = 'deposito';
  let selectedPostImage = 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80';

  const communityFeedList = document.getElementById('community-feed-list');
  const communityFilterBtns = document.querySelectorAll('.community-filter-btn');
  const postDialog = document.getElementById('post-dialog');
  const openPostDialogBtn = document.getElementById('btn-open-post-dialog');
  const composerCardBtn = document.getElementById('btn-composer-card');
  const communityMyEventsBtn = document.getElementById('btn-community-my-events');
  const myEventsList = document.getElementById('my-events-list');
  const closePostTopBtn = document.getElementById('btn-close-post-top');
  const cancelPostBtn = document.getElementById('btn-cancel-post');
  const communityPostForm = document.getElementById('community-post-form');
  const postPreviewImg = document.getElementById('post-preview-img');
  const postFileInput = document.getElementById('post-file-input');
  const postPresetImgBtns = document.querySelectorAll('.post-preset-img-btn');

  function updateMyEventsBadges() {
    const attendingEvents = communityPosts.filter(p => p.type === 'evento' && p.attending);
    const count = attendingEvents.length;
    const totalBonus = attendingEvents.reduce((acc, ev) => acc + (ev.bonusPoints || 50), 0);

    let totalTasks = 0;
    let doneTasks = 0;
    attendingEvents.forEach(ev => {
      const list = Array.isArray(ev.checklist) ? ev.checklist : DEFAULT_EVENT_CHECKLIST;
      totalTasks += list.length;
      doneTasks += list.filter(item => item.done).length;
    });
    const prepPct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

    document.querySelectorAll('.my-events-count-badge').forEach(el => {
      el.textContent = String(count);
    });
    document.querySelectorAll('.my-events-count-label').forEach(el => {
      el.textContent = count === 1 ? '1 evento confirmado' : `${count} eventos confirmados`;
    });

    const statCount = document.getElementById('events-stat-count');
    const statBonus = document.getElementById('events-stat-bonus');
    const statPrep = document.getElementById('events-stat-prep');
    if (statCount) statCount.textContent = String(count);
    if (statBonus) statBonus.textContent = `+${totalBonus}`;
    if (statPrep) statPrep.textContent = `${prepPct}%`;
  }

  function renderMyEvents() {
    updateMyEventsBadges();
    if (!myEventsList) return;

    const allEvents = communityPosts.filter(p => p.type === 'evento');
    const attendingEvents = allEvents.filter(p => p.attending);
    const availableEvents = allEvents.filter(p => !p.attending);

    const attendingHtml = attendingEvents.length > 0
      ? attendingEvents.map(ev => {
          const checklist = Array.isArray(ev.checklist) ? ev.checklist : DEFAULT_EVENT_CHECKLIST;
          const doneCount = checklist.filter(i => i.done).length;
          const reminderVal = ev.reminder || '24h';

          return `
          <article class="bg-white dark:bg-slate-900 rounded-2xl border-2 border-emerald-500/80 dark:border-emerald-600/80 shadow-sm overflow-hidden">
            <div class="px-3.5 py-2 bg-emerald-800 text-white flex items-center justify-between gap-2">
              <span class="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
                <iconify-icon icon="mynaui:calendar" class="text-sm" aria-hidden="true"></iconify-icon>
                <span>${ev.badge}</span>
              </span>
              <span class="px-2 py-0.5 rounded-full bg-amber-300 text-emerald-950 text-[10px] font-black shrink-0">+${ev.bonusPoints || 50} pts</span>
            </div>

            <div class="p-3.5 space-y-3">
              <div class="flex items-start gap-3">
                <img src="${ev.image}" alt="${ev.title}" class="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700">
                <div class="min-w-0 flex-1">
                  <h2 class="font-bold text-slate-900 dark:text-white text-sm leading-snug">${ev.title}</h2>
                  <p class="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                    <iconify-icon icon="mynaui:location" class="text-sm shrink-0" aria-hidden="true"></iconify-icon>
                    <span class="truncate">${ev.location}</span>
                  </p>
                  <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1">${ev.attendees} vecinos confirmados</p>
                </div>
              </div>

              <!-- Checklist interactivo de preparación para el EcoEvento -->
              <div class="p-3 rounded-xl bg-emerald-50/70 dark:bg-slate-800/70 border border-emerald-200/80 dark:border-slate-700 space-y-2">
                <div class="flex items-center justify-between gap-2">
                  <p class="text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 flex items-center gap-1">
                    <iconify-icon icon="mynaui:check-circle" class="text-sm" aria-hidden="true"></iconify-icon>
                    <span>Lista de preparación</span>
                  </p>
                  <span class="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">${doneCount}/${checklist.length} listos</span>
                </div>
                <div class="space-y-1.5">
                  ${checklist.map(item => `
                    <label class="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200 cursor-pointer select-none py-0.5">
                      <input type="checkbox" class="event-check-input w-4 h-4 rounded accent-emerald-700 cursor-pointer" data-event-id="${ev.id}" data-check-id="${item.id}" ${item.done ? 'checked' : ''}>
                      <span class="${item.done ? 'line-through text-slate-400 dark:text-slate-500' : 'font-medium'}">${item.label}</span>
                    </label>
                  `).join('')}
                </div>
              </div>

              <!-- Selector de recordatorio -->
              <div class="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
                <label for="rem-${ev.id}" class="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <iconify-icon icon="mynaui:bell" class="text-base text-amber-600 dark:text-amber-400" aria-hidden="true"></iconify-icon>
                  <span>Recordatorio:</span>
                </label>
                <select id="rem-${ev.id}" class="event-reminder-select text-xs font-bold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 cursor-pointer" data-event-id="${ev.id}">
                  <option value="24h" ${reminderVal === '24h' ? 'selected' : ''}>1 día antes</option>
                  <option value="2h" ${reminderVal === '2h' ? 'selected' : ''}>2 horas antes</option>
                  <option value="30m" ${reminderVal === '30m' ? 'selected' : ''}>30 min antes</option>
                </select>
              </div>

              <!-- Acciones del evento agendado -->
              <div class="grid grid-cols-2 gap-2 pt-0.5">
                <button type="button" class="btn-event-map touch-target px-3 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all" data-point-id="${ev.pointId || 'centro'}">
                  <iconify-icon icon="mynaui:map" class="text-base" aria-hidden="true"></iconify-icon>
                  <span>Ver en Mapa</span>
                </button>
                <button type="button" class="btn-event-cancel touch-target px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/50 text-slate-700 dark:text-slate-300 hover:text-red-700 dark:hover:text-red-300 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all" data-event-id="${ev.id}">
                  <iconify-icon icon="mynaui:x" class="text-base" aria-hidden="true"></iconify-icon>
                  <span>Cancelar</span>
                </button>
              </div>
            </div>
          </article>`;
        }).join('')
      : `
        <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-2.5">
          <div class="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center mx-auto">
            <iconify-icon icon="mynaui:calendar" class="text-2xl" aria-hidden="true"></iconify-icon>
          </div>
          <h2 class="font-bold text-slate-900 dark:text-white text-sm">Todavía no tenés eventos agendados</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Sumate a las jornadas barriales acá abajo o desde la pestaña <strong>EcoEventos</strong> en Comunidad para ganar EcoPuntos extra.</p>
        </div>`;

    const availableHtml = availableEvents.length > 0
      ? `
        <div class="pt-2 space-y-2.5">
          <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">Próximos EcoEventos para sumarte</h2>
          ${availableEvents.map(ev => `
            <article class="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3">
              <div class="min-w-0 flex-1">
                <span class="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">${ev.badge}</span>
                <h3 class="font-bold text-slate-900 dark:text-white text-xs leading-snug mt-0.5">${ev.title}</h3>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                  <iconify-icon icon="mynaui:location" class="text-xs text-emerald-700 dark:text-emerald-400 shrink-0" aria-hidden="true"></iconify-icon>
                  <span class="truncate">${ev.location}</span>
                </p>
              </div>
              <button type="button" class="btn-event-add touch-target px-3 py-2 rounded-xl bg-amber-100 dark:bg-amber-950/70 hover:bg-emerald-800 hover:text-white text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer transition-all" data-event-id="${ev.id}">
                <iconify-icon icon="mynaui:plus" class="text-sm" aria-hidden="true"></iconify-icon>
                <span>Agendar</span>
              </button>
            </article>
          `).join('')}
        </div>`
      : '';

    myEventsList.innerHTML = attendingHtml + availableHtml;
  }

  function renderCommunityFeed() {
    updateMyEventsBadges();
    if (composerCardBtn) {
      composerCardBtn.classList.toggle('hidden', activeCommunityFilter === 'evento');
    }
    if (communityMyEventsBtn) {
      communityMyEventsBtn.classList.toggle('hidden', activeCommunityFilter !== 'evento');
    }
    if (!communityFeedList) return;
    const visiblePosts = communityPosts.filter(post => post.type === activeCommunityFilter);

    communityFeedList.innerHTML = visiblePosts.map(post => {
      if (post.type === 'evento') {
        const rsvpClass = post.attending
          ? 'bg-emerald-800 text-white border-emerald-700'
          : 'bg-amber-50 dark:bg-slate-800 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700 hover:bg-amber-100';
        const rsvpLabel = post.attending
          ? `Agendado en Mis Eventos (${post.attendees} vecinos)`
          : `Agendar en Mis Eventos (${post.attendees} vecinos)`;

        return `
        <article class="bg-white dark:bg-slate-900 rounded-2xl border-2 border-amber-300/90 dark:border-amber-700/80 shadow-sm overflow-hidden">
          <div class="px-3.5 py-2 bg-amber-100/80 dark:bg-amber-950/60 flex items-center justify-between gap-2">
            <span class="text-[11px] font-black uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-1">
              <iconify-icon icon="mynaui:calendar" class="text-sm" aria-hidden="true"></iconify-icon>
              <span>${post.badge}</span>
            </span>
          </div>
          <img src="${post.image}" alt="${post.title}" class="w-full h-36 object-cover">
          <div class="p-3.5 space-y-2.5">
            <div>
              <h2 class="font-bold text-slate-900 dark:text-white text-base leading-snug">${post.title}</h2>
              <p class="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                <iconify-icon icon="mynaui:location" class="text-sm" aria-hidden="true"></iconify-icon>
                <span>${post.location}</span>
              </p>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">${post.caption}</p>
            <button type="button" class="btn-event-rsvp touch-target w-full px-3 py-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${rsvpClass}" data-post-id="${post.id}" aria-pressed="${String(Boolean(post.attending))}">
              <iconify-icon icon="${post.attending ? 'mynaui:check-circle' : 'mynaui:calendar'}" class="text-base" aria-hidden="true"></iconify-icon>
              <span>${rsvpLabel}</span>
            </button>
          </div>
        </article>`;
      }

      const likeClass = post.liked
        ? 'bg-emerald-800 text-white border-emerald-700'
        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-700';

      return `
      <article class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
        <div class="p-3.5 flex items-center justify-between gap-2">
          <div class="flex items-center gap-2.5 min-w-0">
            <div class="w-9 h-9 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center shrink-0" aria-hidden="true">
              <span>${post.initials || 'VC'}</span>
            </div>
            <div class="min-w-0">
              <h2 class="font-bold text-slate-900 dark:text-white text-sm leading-tight">${post.author}</h2>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">${post.barrio} • ${post.time}</p>
            </div>
          </div>
          <span class="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-[11px] font-bold shrink-0">${post.pointsBadge || '+15 EcoPuntos'}</span>
        </div>

        <img src="${post.image}" alt="Depósito de reciclaje de ${post.author} en ${post.location}" class="w-full h-40 object-cover border-y border-slate-100 dark:border-slate-800">

        <div class="p-3.5 space-y-2.5">
          <div class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold">
            <iconify-icon icon="mynaui:location" class="text-sm" aria-hidden="true"></iconify-icon>
            <span>${post.location}</span>
          </div>
          <p class="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">${post.caption}</p>
          <div class="pt-1 flex items-center justify-between gap-2">
            <button type="button" class="btn-post-like touch-target px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${likeClass}" data-post-id="${post.id}" aria-pressed="${String(Boolean(post.liked))}">
              <iconify-icon icon="mynaui:heart" class="text-base" aria-hidden="true"></iconify-icon>
              <span>Aplaudir (${post.likes || 0})</span>
            </button>
            <button type="button" class="btn-post-map touch-target px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 flex items-center gap-1 cursor-pointer" data-point-id="${post.pointId || resolvePointIdFromLocation(post.location)}">
              <span>Ver punto en mapa</span>
              <iconify-icon icon="mynaui:chevron-right" class="text-sm" aria-hidden="true"></iconify-icon>
            </button>
          </div>
        </div>
      </article>`;
    }).join('');
  }

  function navigateAndFocusMapPoint(pointId, toastPrefix = 'Ubicación en el mapa') {
    const targetMarker = [...mapMarkers].find(m => m.dataset.pointId === pointId) || mapMarkers[0];
    if (targetMarker) {
      const cat = targetMarker.dataset.category;
      const catPill = [...mapFilterPills].find(p => p.dataset.filter === cat);
      if (catPill && catPill.getAttribute('aria-pressed') !== 'true') {
        catPill.setAttribute('aria-pressed', 'true');
        catPill.classList.add('bg-emerald-800', 'text-white', 'border-emerald-600');
        catPill.classList.remove('bg-white/95', 'dark:bg-slate-800/95', 'text-slate-700', 'dark:text-slate-200');
        targetMarker.classList.remove('hidden');
      }
    }
    navigateTo('mapa');
    if (targetMarker) {
      requestAnimationFrame(() => {
        selectMapMarker(targetMarker, { focusCamera: true, focusElement: true });
        showToast(`${toastPrefix}: ${targetMarker.dataset.title}`);
      });
    }
  }

  communityFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeCommunityFilter = btn.dataset.feedFilter || 'deposito';
      communityFilterBtns.forEach(b => {
        const active = (b.dataset.feedFilter || 'deposito') === activeCommunityFilter;
        b.setAttribute('aria-selected', String(active));
        b.setAttribute('aria-pressed', String(active));
        b.classList.toggle('bg-emerald-800', active);
        b.classList.toggle('text-white', active);
        b.classList.toggle('shadow-sm', active);
        b.classList.toggle('text-slate-700', !active);
        b.classList.toggle('dark:text-slate-300', !active);
      });
      renderCommunityFeed();
      renderMyEvents();
    });
  });

  if (communityFeedList) {
    communityFeedList.addEventListener('click', (e) => {
      const mapBtn = e.target.closest('.btn-post-map');
      if (mapBtn) {
        e.preventDefault();
        e.stopPropagation();
        navigateAndFocusMapPoint(mapBtn.dataset.pointId || 'alberdi', 'Punto de la publicación');
        return;
      }
      const likeBtn = e.target.closest('.btn-post-like');
      if (likeBtn) {
        const post = communityPosts.find(p => p.id === likeBtn.dataset.postId);
        if (post) {
          post.liked = !post.liked;
          post.likes = Math.max(0, (post.likes || 0) + (post.liked ? 1 : -1));
          saveCommunityPosts(communityPosts);
          renderCommunityFeed();
          renderMyEvents();
        }
        return;
      }
      const rsvpBtn = e.target.closest('.btn-event-rsvp');
      if (rsvpBtn) {
        const evt = communityPosts.find(p => p.id === rsvpBtn.dataset.postId);
        if (evt) {
          evt.attending = !evt.attending;
          evt.attendees = Math.max(0, (evt.attendees || 0) + (evt.attending ? 1 : -1));
          saveCommunityPosts(communityPosts);
          renderCommunityFeed();
          renderMyEvents();
          showToast(evt.attending ? `¡Agendado en Mis Eventos: "${evt.title}"!` : 'Cancelaste tu asistencia al evento.');
        }
      }
    });
  }

  if (myEventsList) {
    myEventsList.addEventListener('click', (e) => {
      const cancelBtn = e.target.closest('.btn-event-cancel');
      if (cancelBtn) {
        const evt = communityPosts.find(p => p.id === cancelBtn.dataset.eventId);
        if (evt && evt.attending) {
          evt.attending = false;
          evt.attendees = Math.max(0, (evt.attendees || 1) - 1);
          saveCommunityPosts(communityPosts);
          renderMyEvents();
          renderCommunityFeed();
          showToast(`Quitaste "${evt.title}" de Mis Eventos.`);
        }
        return;
      }

      const addBtn = e.target.closest('.btn-event-add');
      if (addBtn) {
        const evt = communityPosts.find(p => p.id === addBtn.dataset.eventId);
        if (evt && !evt.attending) {
          evt.attending = true;
          evt.attendees = (evt.attendees || 0) + 1;
          if (!Array.isArray(evt.checklist)) {
            evt.checklist = DEFAULT_EVENT_CHECKLIST.map(item => ({ ...item, done: false }));
          }
          saveCommunityPosts(communityPosts);
          renderMyEvents();
          renderCommunityFeed();
          showToast(`¡Agendaste "${evt.title}" en Mis Eventos!`);
        }
        return;
      }

      const mapBtn = e.target.closest('.btn-event-map');
      if (mapBtn) {
        navigateAndFocusMapPoint(mapBtn.dataset.pointId || 'centro', 'Ubicación del evento');
      }
    });

    myEventsList.addEventListener('change', (e) => {
      const checkInput = e.target.closest('.event-check-input');
      if (checkInput) {
        const evt = communityPosts.find(p => p.id === checkInput.dataset.eventId);
        if (evt) {
          if (!Array.isArray(evt.checklist)) {
            evt.checklist = DEFAULT_EVENT_CHECKLIST.map(item => ({ ...item }));
          }
          const item = evt.checklist.find(i => i.id === checkInput.dataset.checkId);
          if (item) {
            item.done = checkInput.checked;
            saveCommunityPosts(communityPosts);
            renderMyEvents();
          }
        }
        return;
      }

      const reminderSelect = e.target.closest('.event-reminder-select');
      if (reminderSelect) {
        const evt = communityPosts.find(p => p.id === reminderSelect.dataset.eventId);
        if (evt) {
          evt.reminder = reminderSelect.value;
          saveCommunityPosts(communityPosts);
          const labels = { '24h': '1 día antes', '2h': '2 horas antes', '30m': '30 minutos antes' };
          showToast(`Recordatorio actualizado (${labels[evt.reminder] || 'activado'}).`);
        }
      }
    });
  }

  const exploreEventsBtn = document.getElementById('btn-events-explore-community');
  if (exploreEventsBtn) {
    exploreEventsBtn.addEventListener('click', () => {
      activeCommunityFilter = 'evento';
      communityFilterBtns.forEach(b => {
        const active = (b.dataset.feedFilter || 'all') === 'evento';
        b.setAttribute('aria-selected', String(active));
        b.setAttribute('aria-pressed', String(active));
        b.classList.toggle('bg-emerald-800', active);
        b.classList.toggle('text-white', active);
        b.classList.toggle('shadow-sm', active);
        b.classList.toggle('text-slate-700', !active);
        b.classList.toggle('dark:text-slate-300', !active);
      });
      navigateTo('comunidad');
    });
  }

  function openPostModal() {
    if (!postDialog || typeof postDialog.showModal !== 'function') return;
    const captionEl = document.getElementById('post-caption');
    if (captionEl) setFieldError(captionEl, '');
    postDialog.showModal();
  }

  if (openPostDialogBtn) openPostDialogBtn.addEventListener('click', openPostModal);
  if (composerCardBtn) composerCardBtn.addEventListener('click', openPostModal);
  if (closePostTopBtn && postDialog) closePostTopBtn.addEventListener('click', () => postDialog.close());
  if (cancelPostBtn && postDialog) cancelPostBtn.addEventListener('click', () => postDialog.close());

  postPresetImgBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedPostImage = btn.dataset.img || selectedPostImage;
      if (postPreviewImg) postPreviewImg.src = selectedPostImage;
      postPresetImgBtns.forEach(b => {
        const active = b === btn;
        b.setAttribute('aria-pressed', String(active));
        b.classList.toggle('border-emerald-500', active);
        b.classList.toggle('bg-emerald-50', active);
        b.classList.toggle('dark:bg-emerald-950/60', active);
        b.classList.toggle('text-emerald-800', active);
        b.classList.toggle('dark:text-emerald-200', active);
      });
    });
  });

  if (postFileInput) {
    postFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          selectedPostImage = reader.result;
          if (postPreviewImg) postPreviewImg.src = selectedPostImage;
        }
      };
      reader.readAsDataURL(file);
    });
  }

  if (communityPostForm) {
    communityPostForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const captionField = document.getElementById('post-caption');
      const locationField = document.getElementById('post-location');
      const caption = (captionField ? captionField.value : '').trim();

      if (caption.length < 4) {
        if (captionField) {
          setFieldError(captionField, 'Escribí un mensaje breve contando qué depositaste.');
          captionField.focus();
        }
        return;
      }
      if (captionField) setFieldError(captionField, '');

      const userName = state.user ? `${state.user.nombre} ${state.user.apellido}` : 'Oscar Rodríguez';
      const initials = state.user ? `${state.user.nombre[0]}${state.user.apellido[0]}`.toUpperCase() : 'OR';
      const barrio = state.user && state.user.barrio ? `B° ${state.user.barrio}` : 'B° Alberdi';
      const location = locationField ? locationField.value : 'Campana Verde - B° Alberdi';

      const newPost = {
        id: `post-${Date.now()}`,
        type: 'deposito',
        author: userName,
        initials,
        barrio,
        time: 'Recién',
        location,
        pointId: resolvePointIdFromLocation(location),
        pointsBadge: '+5 pts Comunidad',
        caption,
        image: selectedPostImage,
        likes: 1,
        liked: true
      };

      communityPosts.unshift(newPost);
      saveCommunityPosts(communityPosts);

      // Otorgar +5 EcoPuntos por publicar en la comunidad y registrar en el historial
      state.ecoPuntos += 5;
      const nowStr = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
      state.history.unshift({
        id: Date.now(),
        title: 'Publicación en Comunidad Verde (Foto de depósito)',
        location,
        time: `Hoy, ${nowStr} hs`,
        points: 5,
        containerStatus: 'Depósito compartido con vecinos del barrio',
        impact: 'Incentivo comunitario • +5 EcoPuntos bonus',
        ticketCode: `#COM-${String(Date.now()).slice(-4)}`
      });
      state.historyPage = 1;
      saveUserWallet();
      updatePointsUI();

      activeCommunityFilter = 'deposito';
      communityFilterBtns.forEach(b => {
        const active = (b.dataset.feedFilter || 'deposito') === 'deposito';
        b.setAttribute('aria-selected', String(active));
        b.setAttribute('aria-pressed', String(active));
        b.classList.toggle('bg-emerald-800', active);
        b.classList.toggle('text-white', active);
        b.classList.toggle('shadow-sm', active);
        b.classList.toggle('text-slate-700', !active);
        b.classList.toggle('dark:text-slate-300', !active);
      });
      renderCommunityFeed();
      renderMyEvents();
      communityPostForm.reset();
      if (postDialog && postDialog.open) postDialog.close();
      showToast('¡Publicación compartida en el muro! Sumaste +5 EcoPuntos.');
    });
  }

  renderCommunityFeed();
  renderMyEvents();

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
    document.querySelectorAll('.screen-view').forEach(s => { s.scrollTop = 0; });
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
      document.querySelectorAll('.screen-view').forEach(s => { s.scrollTop = 0; });
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
  document.querySelectorAll('.notification-toggle, .notif-toggle').forEach(toggle => {
    const prefKey = toggle.dataset.pref || toggle.dataset.setting;
    if (!prefKey) return;
    if (prefKey in notificationPrefs) {
      toggle.checked = Boolean(notificationPrefs[prefKey]);
    }
    toggle.addEventListener('change', (e) => {
      notificationPrefs[prefKey] = e.target.checked;
      try {
        localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notificationPrefs));
      } catch (err) {}
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
  // Inicialización mediante parámetros de URL (útil para inspección, pruebas y capturas de pantalla)
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('demo') === '1' || params.has('screen')) {
      if (!state.user) {
        startSession(DEMO_ACCOUNT, DEMO_WALLET);
      }
    }
    const themeParam = params.get('theme');
    if (themeParam === 'dark') {
      toggleDarkMode(true);
    } else if (themeParam === 'light') {
      toggleDarkMode(false);
    } else if (themeParam === 'contrast') {
      setHighContrast(true);
    }
    const matParam = params.get('material');
    if (matParam && MATERIALS[matParam]) {
      state.selectedMaterial = matParam;
    }
    const screenParam = params.get('screen');
    if (screenParam) {
      navigateTo(screenParam);
    }
    if (params.get('drawer') === '1') {
      openDrawer();
    }
    if (params.get('guide') === '1') {
      openGuideModal();
    }
  } catch (e) {}

  // Exponer API global para pruebas manuales y verificación
  window.EcoImperio = {
    state,
    navigateTo,
    openDrawer,
    closeDrawer,
    openGuideModal,
    toggleDarkMode,
    setHighContrast
  };
});
