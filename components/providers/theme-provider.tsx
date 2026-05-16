"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

interface ThemeProviderProps {
  attribute?: "class";
  children: React.ReactNode;
  defaultTheme?: Theme;
  disableTransitionOnChange?: boolean;
  enableSystem?: boolean;
}

const STORAGE_KEY = "openings-theme";
const THEME_CHANGE_EVENT = "openings-theme-change";
const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(theme: Theme, enableSystem: boolean): ResolvedTheme {
  if (theme === "system" && enableSystem) {
    return getSystemTheme();
  }

  return theme === "dark" ? "dark" : "light";
}

function applyTheme(theme: ResolvedTheme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

function storedThemeSnapshot(defaultTheme: Theme): Theme {
  if (typeof window === "undefined") {
    return defaultTheme;
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  return isTheme(storedTheme) ? storedTheme : defaultTheme;
}

function subscribeThemeStore(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
  };
}

function subscribeSystemTheme(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onStoreChange);

  return () => media.removeEventListener("change", onStoreChange);
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
}: ThemeProviderProps) {
  const theme = React.useSyncExternalStore(
    subscribeThemeStore,
    () => storedThemeSnapshot(defaultTheme),
    () => defaultTheme,
  );
  const systemTheme = React.useSyncExternalStore(
    subscribeSystemTheme,
    getSystemTheme,
    () => "light" as ResolvedTheme,
  );
  const resolvedTheme = React.useMemo<ResolvedTheme>(() => {
    if (theme === "system" && enableSystem) {
      return systemTheme;
    }

    return resolveTheme(theme, enableSystem);
  }, [enableSystem, systemTheme, theme]);

  React.useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = React.useCallback((nextTheme: Theme) => {
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [resolvedTheme, setTheme, theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
