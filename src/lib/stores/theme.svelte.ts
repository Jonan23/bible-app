import { browser } from '$app/environment';

export type ThemeMode = 'system' | 'light' | 'dark';

function createThemeStore() {
  let mode = $state<ThemeMode>('system');
  let resolved = $state<'light' | 'dark'>('light');

  function getSystemTheme(): 'light' | 'dark' {
    if (!browser) return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function resolveTheme(m: ThemeMode): 'light' | 'dark' {
    if (m === 'system') return getSystemTheme();
    return m;
  }

  function applyTheme(r: 'light' | 'dark') {
    if (!browser) return;
    document.documentElement.classList.toggle('dark', r === 'dark');
  }

  function loadPersisted(): ThemeMode {
    if (!browser) return 'system';
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
    } catch {}
    return 'system';
  }

  function persist(m: ThemeMode) {
    if (!browser) return;
    try {
      localStorage.setItem('theme', m);
    } catch {}
  }

  // Initialize
  mode = loadPersisted();
  resolved = resolveTheme(mode);
  applyTheme(resolved);

  // Listen for system theme changes
  if (browser) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (mode === 'system') {
        resolved = getSystemTheme();
        applyTheme(resolved);
      }
    });
  }

  return {
    get mode() { return mode; },
    get resolved() { return resolved; },
    setMode(m: ThemeMode) {
      mode = m;
      resolved = resolveTheme(m);
      applyTheme(resolved);
      persist(m);
    },
    toggle() {
      const next = resolved === 'dark' ? 'light' : 'dark';
      setMode(next);
    },
  };
}

export const theme = createThemeStore();
