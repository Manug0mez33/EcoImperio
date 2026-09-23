/* ==========================================================================
   INTERACTIVIDAD Y LÓGICA DE APLICACIÓN - ECOIMPERIO (Gentle-AI Vanilla JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Estado local de la aplicación
  const state = {
    currentScreen: 'splash',
    ecoPuntos: 1250,
    user: {
      name: 'Oscar Rodríguez',
      role: 'Vecino de Río Cuarto',
      email: 'vecino@rc.com'
    },
    highContrast: false,
    history: [
      { id: 1, title: 'Botellas Plásticas PET', location: 'Campana Verde Alberdi', time: 'Hoy, 14:32', points: 15 },
      { id: 2, title: 'Cartón y Papel Seco', location: 'Punto Limpio Banda Norte', time: '24 Ene, 11:15', points: 45 }
    ]
  };

  // Cargar preferencia de Alto Contraste desde LocalStorage
  const savedContrast = localStorage.getItem('ecoimperio_high_contrast');
  if (savedContrast === 'true') {
    state.highContrast = true;
    document.body.classList.add('high-contrast');
    const contrastToggle = document.getElementById('contrast-toggle');
    if (contrastToggle) contrastToggle.checked = true;
  }

  // Router de Navegación de Pantallas
  function navigateTo(screenId) {
    const screens = document.querySelectorAll('.screen-view');
    screens.forEach(screen => screen.classList.remove('active'));

    const targetScreen = document.getElementById(`screen-${screenId}`);
    if (targetScreen) {
      targetScreen.classList.add('active');
      state.currentScreen = screenId;
    }

    // Actualizar navbars activos
    updateNavbars(screenId);
    closeDrawer();
  }

  function updateNavbars(activeScreen) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const target = item.getAttribute('data-target');
      if (target === activeScreen) {
        item.classList.add('text-emerald-700', 'font-bold');
        item.classList.remove('text-slate-500');
      } else {
        item.classList.remove('text-emerald-700', 'font-bold');
        item.classList.add('text-slate-500');
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

  // Toggle Modo Alto Contraste
  const contrastToggle = document.getElementById('contrast-toggle');
  if (contrastToggle) {
    contrastToggle.addEventListener('change', (e) => {
      state.highContrast = e.target.checked;
      if (state.highContrast) {
        document.body.classList.add('high-contrast');
        localStorage.setItem('ecoimperio_high_contrast', 'true');
      } else {
        document.body.classList.remove('high-contrast');
        localStorage.setItem('ecoimperio_high_contrast', 'false');
      }
    });
  }

  // Event Listeners para Navegación Global
  document.querySelectorAll('[data-navigate]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-navigate');
      navigateTo(target);
    });
  });

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
      alert('¡Depósito Registrado con Éxito! 🎉\nHas sumado +10 EcoPuntos a tu billetera.');

      // Navegar a la pantalla de puntos
      navigateTo('puntos');
    });
  }

  function updatePointsUI() {
    const balanceElements = document.querySelectorAll('.user-ecopuntos-val');
    balanceElements.forEach(el => {
      el.textContent = state.ecoPuntos.toLocaleString('es-AR');
    });

    // Renderizar lista de historial
    const historyListContainer = document.getElementById('history-list');
    if (historyListContainer) {
      historyListContainer.innerHTML = state.history.map(item => `
        <article class="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md hover:border-emerald-200">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              ♻️
            </div>
            <div>
              <h3 class="font-bold text-slate-800 text-sm">${item.title}</h3>
              <p class="text-xs text-slate-500">${item.location} • ${item.time}</p>
            </div>
          </div>
          <span class="font-bold text-emerald-600 text-sm">+${item.points} pts</span>
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
