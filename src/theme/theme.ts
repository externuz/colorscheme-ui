import { useSyncExternalStore } from 'react';

export type ThemeId = 'tokyo-night' | 'catppuccin-mocha' | 'gruvbox-dark' | 'gruvbox-light';
export type ColorSchemeId = ThemeId;

export interface ThemeMeta {
  id: ThemeId;
  name: string;
  subtitle: string;
  mode: 'dark' | 'light';
  canvasColor: string;
  surfaceColor: string;
  accentColor: string;
  secondaryColors: [string, string, string];
}

export const THEMES: readonly ThemeMeta[] = [
  {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    subtitle: 'Deep graphite & cool indigo (default)',
    mode: 'dark',
    canvasColor: '#1a1b26',
    surfaceColor: '#1f2335',
    accentColor: '#7aa2f7',
    secondaryColors: ['#bb9af7', '#9ece6a', '#f7768e'],
  },
  {
    id: 'catppuccin-mocha',
    name: 'Catppuccin Mocha',
    subtitle: 'Soft pastel dark editor palette',
    mode: 'dark',
    canvasColor: '#1e1e2e',
    surfaceColor: '#242538',
    accentColor: '#cba6f7',
    secondaryColors: ['#89b4fa', '#a6e3a1', '#fab387'],
  },
  {
    id: 'gruvbox-dark',
    name: 'Gruvbox Dark',
    subtitle: 'Warm retro contrast for long sessions',
    mode: 'dark',
    canvasColor: '#282828',
    surfaceColor: '#32302f',
    accentColor: '#fe8019',
    secondaryColors: ['#fabd2f', '#b8bb26', '#83a598'],
  },
  {
    id: 'gruvbox-light',
    name: 'Gruvbox Light',
    subtitle: 'Warm paper-like light editor palette',
    mode: 'light',
    canvasColor: '#fbf1c7',
    surfaceColor: '#f9f5d7',
    accentColor: '#d65d0e',
    secondaryColors: ['#b57614', '#79740e', '#076678'],
  },
] as const;

export const DEFAULT_THEME: ThemeId = 'tokyo-night';
export const DEFAULT_STORAGE_KEY = 'colorscheme-ui-theme';

let activeStorageKey = DEFAULT_STORAGE_KEY;
let currentTheme: ThemeId | null = null;
const listeners = new Set<() => void>();

export function isValidTheme(value: string | null | undefined): value is ThemeId {
  if (!value) return false;
  return THEMES.some((t) => t.id === value);
}

function readStoredTheme(storageKey: string, fallback: ThemeId): ThemeId {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (isValidTheme(saved)) return saved;
  } catch {
    // Ignore storage access errors in restricted environments
  }
  return fallback;
}

export function applyThemeToDom(themeId: ThemeId): void {
  if (typeof document === 'undefined') return;

  const meta = THEMES.find((t) => t.id === themeId) ?? THEMES[0];
  const root = document.documentElement;
  root.setAttribute('data-theme', meta.id);
  root.style.backgroundColor = meta.canvasColor;
  root.style.colorScheme = meta.mode;

  if (document.body) {
    document.body.style.backgroundColor = meta.canvasColor;
  }

  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', meta.canvasColor);
  }
}

export interface ColorSchemeConfig {
  storageKey?: string;
  defaultTheme?: ThemeId;
  applyImmediately?: boolean;
}

export function configureColorScheme(config: ColorSchemeConfig = {}): ThemeId {
  if (config.storageKey) {
    activeStorageKey = config.storageKey;
  }
  const fallback = config.defaultTheme ?? DEFAULT_THEME;
  currentTheme = readStoredTheme(activeStorageKey, fallback);

  if (config.applyImmediately !== false) {
    applyThemeToDom(currentTheme);
  }

  for (const listener of listeners) {
    listener();
  }
  return currentTheme;
}

export function getColorScheme(): ThemeId {
  if (currentTheme === null) {
    currentTheme = readStoredTheme(activeStorageKey, DEFAULT_THEME);
  }
  return currentTheme;
}

export function setColorScheme(themeId: ThemeId): void {
  if (!isValidTheme(themeId)) return;

  currentTheme = themeId;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(activeStorageKey, themeId);
    } catch {
      // Ignore storage quota / privacy errors
    }
  }
  applyThemeToDom(themeId);
  for (const listener of listeners) {
    listener();
  }
}

export function subscribeColorScheme(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useColorScheme() {
  const theme = useSyncExternalStore(subscribeColorScheme, getColorScheme, () => DEFAULT_THEME);
  const themeMeta = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return {
    theme,
    themeMeta,
    themes: THEMES,
    setTheme: setColorScheme,
  };
}

/**
 * Returns a synchronous inline script string for `<head>` to prevent FOUC on initial page load.
 */
export function getThemeInitScript(
  storageKey: string = DEFAULT_STORAGE_KEY,
  defaultTheme: ThemeId = DEFAULT_THEME,
): string {
  return `(function(){try{var m={'tokyo-night':{bg:'#1a1b26',s:'dark'},'catppuccin-mocha':{bg:'#1e1e2e',s:'dark'},'gruvbox-dark':{bg:'#282828',s:'dark'},'gruvbox-light':{bg:'#fbf1c7',s:'light'}};var k=localStorage.getItem(${JSON.stringify(storageKey)})||${JSON.stringify(defaultTheme)};var c=m[k]||m[${JSON.stringify(defaultTheme)}];var t=m[k]?k:${JSON.stringify(defaultTheme)};var d=document.documentElement;d.setAttribute('data-theme',t);d.style.backgroundColor=c.bg;d.style.colorScheme=c.s;var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute('content',c.bg);}catch(_){}})();`;
}
