/**
 * Three-state theme controller and layout helper for the Atlas Analytics Lab site.
 *
 * Theme states:
 *  - auto (default): mirror the OS preference and react to changes in real time
 *  - dark: force the dark palette regardless of OS setting
 *  - light: force the light palette regardless of OS setting
 *
 * The current choice is persisted in localStorage so subsequent visits reuse it.
 * The script also keeps the CSS `--atlas-nav-height` variable in sync with the
 * rendered navbar to prevent content overlap.
 */
(function () {
  const STORAGE_KEY = 'atlas-theme-mode';
  const ORDER = ['auto', 'dark', 'light'];
  const ICONS = {
    auto:
      '<svg viewBox="0 0 24 24" role="presentation" focusable="false" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9h-9z" fill="currentColor" opacity="0.4"></path><path d="M12 3v9h9a9 9 0 0 0-9-9z" fill="currentColor"></path><circle cx="12" cy="12" r="3.25" fill="currentColor"></circle></svg>',
    light:
      '<svg viewBox="0 0 24 24" role="presentation" focusable="false" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="currentColor"></circle><g stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="12" y1="2" x2="12" y2="4.5"></line><line x1="12" y1="19.5" x2="12" y2="22"></line><line x1="4.22" y1="4.22" x2="5.94" y2="5.94"></line><line x1="18.06" y1="18.06" x2="19.78" y2="19.78"></line><line x1="2" y1="12" x2="4.5" y2="12"></line><line x1="19.5" y1="12" x2="22" y2="12"></line><line x1="4.22" y1="19.78" x2="5.94" y2="18.06"></line><line x1="18.06" y1="5.94" x2="19.78" y2="4.22"></line></g></svg>',
    dark:
      '<svg viewBox="0 0 24 24" role="presentation" focusable="false" aria-hidden="true"><path d="M14.75 2.5a8.25 8.25 0 1 0 6.75 13.1A6.75 6.75 0 0 1 14.75 2.5z" fill="currentColor"></path></svg>',
  };
  const html = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');
  const label = toggle ? toggle.querySelector('.theme-toggle-label') : null;
  const navbar = document.querySelector('.navbar');
  const navCollapse = document.getElementById('mainNavbar');
  const navToggler = document.querySelector('.navbar-toggler');
  const icon = toggle ? toggle.querySelector('[data-theme-icon]') : null;
  let navResizeObserver = null;
  let baseNavHeight = null;

  /**
   * Keep the CSS nav-height variable in sync with the rendered navbar so the body never overlaps.
   */
  const updateNavHeight = (options = {}) => {
    if (!navbar) {
      return;
    }

    const measuredHeight = Math.round(navbar.getBoundingClientRect().height);
    const collapseVisible =
      navCollapse && (navCollapse.classList.contains('show') || navCollapse.classList.contains('collapsing'));

    if ((options.forceBase || !collapseVisible) && measuredHeight > 0) {
      baseNavHeight = measuredHeight;
    }

    const targetHeight = baseNavHeight || measuredHeight;

    if (targetHeight > 0) {
      html.style.setProperty('--atlas-nav-height', `${targetHeight}px`);
    }
  };

  // Helper to debounce nav-height writes so we sample after Bootstrap finishes injecting inline heights.
  const scheduleNavHeightUpdate = (delay = 200, options = {}) => {
    window.setTimeout(() => updateNavHeight(options), delay);
  };

  /**
   * Observe navbar height shifts caused by wrapping, font loading, or content changes.
   * Provides a reliable fallback when the window resize event is not fired (e.g. snapped windows).
   */
  const setupNavHeightObserver = () => {
    if (!navbar || typeof ResizeObserver !== 'function') {
      return;
    }

    if (navResizeObserver) {
      navResizeObserver.disconnect();
    }

    navResizeObserver = new ResizeObserver(() => updateNavHeight());
    navResizeObserver.observe(navbar);
  };

  const debounce = (fn, delay = 100) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(null, args), delay);
    };
  };

  window.addEventListener('load', () => {
    updateNavHeight({ forceBase: true });
    scheduleNavHeightUpdate(250, { forceBase: true });
  });
  window.addEventListener(
    'resize',
    debounce(() => {
      updateNavHeight({ forceBase: !navCollapse || !navCollapse.classList.contains('show') });
      scheduleNavHeightUpdate(200);
    }, 150)
  );

  if (navCollapse) {
    navCollapse.addEventListener('show.bs.collapse', () => {
      scheduleNavHeightUpdate(50);
    });
    navCollapse.addEventListener('shown.bs.collapse', () => {
      updateNavHeight();
      scheduleNavHeightUpdate(150);
    });
    navCollapse.addEventListener('hide.bs.collapse', () => {
      // While collapsing is in progress we only re-measure without persisting the base height.
      scheduleNavHeightUpdate(0);
      scheduleNavHeightUpdate(200);
    });
    navCollapse.addEventListener('hidden.bs.collapse', () => {
      // Once collapse finishes, lock the nav height back to its compact size.
      updateNavHeight({ forceBase: true });
      scheduleNavHeightUpdate(150, { forceBase: true });
      scheduleNavHeightUpdate(400, { forceBase: true });
    });
  }

  if (navToggler) {
    navToggler.addEventListener('click', () => {
      scheduleNavHeightUpdate(60);
      scheduleNavHeightUpdate(320);
    });
  }

  if (document.fonts && typeof document.fonts.addEventListener === 'function') {
    document.fonts.addEventListener('loadingdone', () => scheduleNavHeightUpdate(0, { forceBase: true }), {
      once: false,
    });
    document.fonts.addEventListener('loadingerror', () => scheduleNavHeightUpdate(0, { forceBase: true }), {
      once: false,
    });
  }

  setupNavHeightObserver();
  updateNavHeight({ forceBase: true });

  if (!toggle) {
    return; // Nothing else to do if the toggle button is missing.
  }

  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
  let mode = (localStorage.getItem(STORAGE_KEY) || 'auto').toLowerCase();
  if (!ORDER.includes(mode)) {
    mode = 'auto';
  }

  /** Determine the effective theme when auto-following the OS preference. */
  const resolveAuto = () => (systemPreference.matches ? 'dark' : 'light');

  /** Bootstrap 5.3 reads the `data-bs-theme` attribute to swap colour tokens. */
  const applyEffectiveTheme = (effective) => {
    const normalized = effective === 'dark' ? 'dark' : 'light';
    html.setAttribute('data-bs-theme', normalized);
  };

  /** Refresh button label + aria attributes to reflect the selected and effective modes. */
  const updateToggleLabel = (selectedMode, effectiveMode) => {
    const labelText = selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1);
    if (label) {
      label.textContent = labelText;
    } else {
      toggle.textContent = labelText;
    }
    toggle.setAttribute(
      'aria-label',
      `Theme preference: ${labelText}. Effective theme is ${effectiveMode}. Click to cycle options.`
    );
    html.setAttribute('data-theme-mode', selectedMode);
    toggle.setAttribute('data-theme-selected', selectedMode);
    if (icon) {
      icon.innerHTML = ICONS[selectedMode] || '';
    }
  };

  /** Apply a new selection, persist it, and sync UI + CSS. */
  const applyMode = (nextMode) => {
    mode = nextMode;
    localStorage.setItem(STORAGE_KEY, mode);
    const effective = mode === 'auto' ? resolveAuto() : mode;
    applyEffectiveTheme(effective);
    updateToggleLabel(mode, effective);
  };

  /** Advance to the next state in ORDER (Auto → Dark → Light → Auto). */
  const cycleMode = () => {
    const currentIndex = ORDER.indexOf(mode);
    const nextMode = ORDER[(currentIndex + 1) % ORDER.length];
    applyMode(nextMode);
  };

  /** React to OS-level colour scheme changes when we are in auto mode. */
  const handleSystemChange = () => {
    if (mode === 'auto') {
      applyMode('auto');
    }
  };

  toggle.addEventListener('click', cycleMode);

  if (typeof systemPreference.addEventListener === 'function') {
    systemPreference.addEventListener('change', handleSystemChange);
  } else if (typeof systemPreference.addListener === 'function') {
    // Safari < 14 fallback.
    systemPreference.addListener(handleSystemChange);
  }

  applyMode(mode);
})();
