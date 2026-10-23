/* ==========================================================================
   INTERACTIVIDAD Y LÓGICA DE APLICACIÓN - ECOIMPERIO (Gentle-AI Vanilla JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Pantallas que requieren una sesión iniciada
  const PROTECTED_SCREENS = ['mapa', 'escaner', 'puntos', 'config'];
  const ACCOUNTS_KEY = 'ecoimperio_accounts';
  const NOTIFICATIONS_KEY = 'ecoimperio_notifications';
  const DEFAULT_NOTIFICATIONS = { campanaCercana: true, campanaLlena: true, beneficios: false };
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const NAME_PATTERN = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]{2,}$/;

  // Cuenta de demostración para presentar el prototipo sin registrarse
  const DEMO_ACCOUNT = { nombre: 'Oscar', apellido: 'Rodríguez', email: 'vecino@rc.com', telefono: '3584123456', barrio: 'Alberdi', password: 'eco12345' };
  const DEMO_WALLET = {
    ecoPuntos: 1250,
    history: [
      { id: 1, title: 'Botellas Plásticas PET', location: 'Campana Verde Alberdi', time: 'Hoy, 14:32', points: 15 },
      { id: 2, title: 'Cartón y Papel Seco', location: 'Punto Limpio Banda Norte', time: '24 Ene, 11:15', points: 45 }
    ]
  };

  // Estado local de la aplicación
  const state = {
    currentScreen: 'splash',
    user: null,
    ecoPuntos: DEMO_WALLET.ecoPuntos,
    highContrast: false,
    history: DEMO_WALLET.history.slice()
  };

  // Router de Navegación de Pantallas
  function navigateTo(screenId) {
    // Sin sesión no se entra a la app: se redirige al inicio de sesión
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

    // Actualizar navbars activos
    updateNavbars(screenId);
    closeDrawer();
  }

  function updateNavbars(activeScreen) {
    const navItems = document.querySelectorAll('.nav-item');
    // El estilo activo sale de las variantes aria-[current=page]: (claro y oscuro)
    navItems.forEach(item => {
      if (item.getAttribute('data-target') === activeScreen) {
        item.setAttribute('aria-current', 'page');
      } else {
        item.removeAttribute('aria-current');
      }
    });
  }

  // Drawer Menu Slide-Over Controls
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerMenu = document.getElementById('drawer-menu');
  const openDrawerBtn = document.getElementById('btn-open-drawer');
  const closeDrawerBtn = document.getElementById('btn-close-drawer');

  function openDrawer() {
    if (drawerOverlay && drawerMenu) {
      drawerOverlay.classList.add('open');
      drawerMenu.classList.add('open');
    }
  }

  function closeDrawer() {
    if (drawerOverlay && drawerMenu) {
      drawerOverlay.classList.remove('open');
      drawerMenu.classList.remove('open');
    }
  }

  if (openDrawerBtn) openDrawerBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  document.querySelectorAll('.btn-trigger-drawer').forEach(btn => {
    btn.addEventListener('click', openDrawer);
  });

  // Modo Alto Contraste: toggles sincronizados en el Drawer y en Configuración
  function setHighContrast(enable) {
    state.highContrast = enable;
    document.body.classList.toggle('high-contrast', enable);
    localStorage.setItem('ecoimperio_high_contrast', String(enable));
    document.querySelectorAll('.contrast-toggle').forEach(sw => {
      sw.checked = enable;
    });
  }

  setHighContrast(localStorage.getItem('ecoimperio_high_contrast') === 'true');

  document.querySelectorAll('.contrast-toggle').forEach(sw => {
    sw.addEventListener('change', (e) => setHighContrast(e.target.checked));
  });

  // Modo Oscuro: la clase `dark` en <html> activa las variantes dark: de Tailwind.
  // El tema inicial ya lo aplicó el script del <head>; acá solo se sincronizan los controles.
  state.darkMode = document.documentElement.classList.contains('dark');

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
    localStorage.setItem('ecoimperio_dark_mode', String(enable));
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

  // Event Listeners para Navegación Global
  document.querySelectorAll('[data-navigate]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-navigate');
      navigateTo(target);
    });
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
  // CUENTAS DE USUARIO: Registro e Inicio de Sesión (persistencia en localStorage)
  // ==========================================================================
  function loadAccounts() {
    try {
      return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveAccounts(accounts) {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  }

  // La contraseña nunca se guarda en texto plano: solo su hash SHA-256
  async function hashPassword(password) {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
    return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
  }

  function setFieldError(field, message) {
    field.setAttribute('aria-invalid', String(Boolean(message)));
    const error = document.getElementById(`${field.id}-error`);
    if (error) {
      error.textContent = message;
      error.classList.toggle('hidden', !message);
    }
  }

  // Muestra los errores de un formulario y enfoca el primer campo inválido
  function applyFormErrors(form, errors) {
    const fields = [...form.querySelectorAll('input, select')];
    fields.forEach(field => setFieldError(field, errors[field.id] || ''));
    const firstInvalid = fields.find(field => errors[field.id]);
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  // Al corregir un campo se limpia su error
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

  function startSession(account, wallet) {
    state.user = {
      nombre: account.nombre,
      apellido: account.apellido,
      email: account.email,
      telefono: account.telefono,
      barrio: account.barrio
    };
    state.ecoPuntos = wallet.ecoPuntos;
    state.history = wallet.history.slice();
    updateUserUI();
    updatePointsUI();
  }

  // Reglas compartidas por Registro y Configuración (devuelven '' si el valor es válido)
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

  // Registro: la cuenta se crea solo si todos los datos son válidos; recién ahí se entra a la app
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
          createdAt: new Date().toISOString()
        };
        accounts.push(account);
        saveAccounts(accounts);

        // Las cuentas nuevas arrancan con la billetera vacía
        startSession(account, { ecoPuntos: 0, history: [] });
        registerForm.reset();
        showToast(`¡Cuenta creada! Te damos la bienvenida, ${account.nombre}.`);
        navigateTo('mapa');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  // Inicio de sesión: solo entra con una cuenta registrada (o la cuenta demo)
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
          startSession(account, { ecoPuntos: 0, history: [] });
        }
        navigateTo('mapa');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

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

  // Cerrar sesión (botones en el Drawer y en Configuración)
  function logout(message) {
    state.user = null;
    navigateTo('login');
    showToast(message);
  }

  document.querySelectorAll('.btn-logout').forEach(btn => {
    btn.addEventListener('click', () => logout('Cerraste sesión. ¡Hasta pronto!'));
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

  // La cuenta demo vive solo en memoria; las registradas se actualizan en localStorage
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

  // Carga los datos del usuario cada vez que se abre Configuración
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

  // Perfil: "Guardar cambios" solo se habilita si algo cambió
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

  // Tamaño de texto: escala el font-size raíz (las clases de Tailwind usan rem)
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
      localStorage.setItem('ecoimperio_text_size', e.target.value);
    });
  });

  // Reducir animaciones (el script del <head> ya aplicó la preferencia guardada)
  const reduceMotionToggle = document.getElementById('reduce-motion-toggle');
  if (reduceMotionToggle) {
    reduceMotionToggle.checked = document.documentElement.classList.contains('reduce-motion');
    reduceMotionToggle.addEventListener('change', (e) => {
      document.documentElement.classList.toggle('reduce-motion', e.target.checked);
      localStorage.setItem('ecoimperio_reduce_motion', String(e.target.checked));
    });
  }

  // Notificaciones (simuladas): se guardan las preferencias de cada aviso
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
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notificationPrefs));
    });
  });

  // Cambiar contraseña (panel desplegable)
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

  // Eliminar cuenta: confirmación con un diálogo propio (no el confirm() nativo)
  if (deleteAccountBtn && deleteDialog) {
    deleteAccountBtn.addEventListener('click', () => {
      if (!isDemoUser()) deleteDialog.showModal();
    });

    document.getElementById('btn-confirm-delete').addEventListener('click', () => {
      saveAccounts(loadAccounts().filter(acc => acc.email !== state.user.email));
      deleteDialog.close();
      logout('Tu cuenta fue eliminada.');
    });
  }

  // Simulación de Registro de Depósito QR
  const btnRegisterDeposit = document.getElementById('btn-register-deposit');
  if (btnRegisterDeposit) {
    btnRegisterDeposit.addEventListener('click', () => {
      // Sumar +10 EcoPuntos
      state.ecoPuntos += 10;
      
      // Agregar nuevo ítem al historial
      const newItem = {
        id: Date.now(),
        title: 'Botella de Plástico PET',
        location: 'Campana Verde Alberdi',
        time: 'Recién',
        points: 10
      };
      state.history.unshift(newItem);

      // Actualizar UI de puntos e historial
      updatePointsUI();

      // Notificación de éxito
      showToast('¡Depósito registrado! Sumaste +10 EcoPuntos a tu billetera.');

      // Navegar a la pantalla de puntos
      navigateTo('puntos');
    });
  }

  function updatePointsUI() {
    const balanceElements = document.querySelectorAll('.user-ecopuntos-val');
    balanceElements.forEach(el => {
      el.textContent = state.ecoPuntos.toLocaleString('es-AR');
    });

    // Renderizar lista de historial con Myna UI Icons
    const historyListContainer = document.getElementById('history-list');
    if (historyListContainer && state.history.length === 0) {
      historyListContainer.innerHTML = `
        <p class="p-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-sm text-center text-slate-500 dark:text-slate-400">
          Todavía no registraste depósitos. Escaneá tu primer reciclable para sumar EcoPuntos.
        </p>`;
    } else if (historyListContainer) {
      historyListContainer.innerHTML = state.history.map(item => `
        <article class="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between transition-all hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <iconify-icon icon="keyline-icons:recycle-duotone" class="text-2xl"></iconify-icon>
            </div>
            <div>
              <h3 class="font-bold text-slate-800 dark:text-slate-100 text-sm">${item.title}</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">${item.location} • ${item.time}</p>
            </div>
          </div>
          <span class="font-bold text-emerald-700 dark:text-emerald-400 text-sm">+${item.points} pts</span>
        </article>
      `).join('');
    }
  }

  // Inicializar UI de Puntos
  updatePointsUI();

  // Exponer API global para pruebas manuales en consola
  window.EcoImperio = {
    state,
    navigateTo,
    openDrawer,
    closeDrawer
  };
});
