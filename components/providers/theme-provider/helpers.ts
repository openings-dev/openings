import { THEME_CHANGE_EVENT, THEME_STORAGE_KEY } from "./constants";
import { ResolvedTheme, Theme } from "./types";

export function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return ResolvedTheme.Light;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? ResolvedTheme.Dark
    : ResolvedTheme.Light;
}

export function resolveTheme(theme: Theme, enableSystem: boolean): ResolvedTheme {
  if (theme === Theme.System && enableSystem) return getSystemTheme();
  return theme === Theme.Dark ? ResolvedTheme.Dark : ResolvedTheme.Light;
}

export function applyTheme(theme: ResolvedTheme): void {
  document.documentElement.classList.toggle("dark", theme === ResolvedTheme.Dark);
  document.documentElement.style.colorScheme = theme;
}

export function isTheme(value: string | null): value is Theme {
  return Object.values(Theme).some((theme) => theme === value);
}

export function getStoredTheme(defaultTheme: Theme): Theme {
  if (typeof window === "undefined") return defaultTheme;
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isTheme(storedTheme) ? storedTheme : defaultTheme;
}

export function subscribeThemeStore(onStoreChange: () => void): () => void {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
  };
}

export function subscribeSystemTheme(onStoreChange: () => void): () => void {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}
