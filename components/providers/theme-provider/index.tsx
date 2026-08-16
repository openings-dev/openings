"use client";

import * as React from "react";
import { THEME_CHANGE_EVENT, THEME_STORAGE_KEY } from "./constants";
import { ThemeContext } from "./context";
import {
  applyTheme,
  getStoredTheme,
  getSystemTheme,
  resolveTheme,
  subscribeSystemTheme,
  subscribeThemeStore,
} from "./helpers";
import {
  ResolvedTheme,
  Theme,
  type ThemeContextValue,
  type ThemeProviderProps,
} from "./types";

export function ThemeProvider({
  children,
  defaultTheme = Theme.System,
  enableSystem = true,
}: ThemeProviderProps): React.ReactNode {
  const theme = React.useSyncExternalStore(
    subscribeThemeStore,
    () => getStoredTheme(defaultTheme),
    () => defaultTheme,
  );
  const systemTheme = React.useSyncExternalStore(
    subscribeSystemTheme,
    getSystemTheme,
    () => ResolvedTheme.Light,
  );
  const resolvedTheme = React.useMemo(
    () => theme === Theme.System && enableSystem
      ? systemTheme
      : resolveTheme(theme, enableSystem),
    [enableSystem, systemTheme, theme],
  );

  React.useEffect(() => applyTheme(resolvedTheme), [resolvedTheme]);

  const setTheme = React.useCallback((nextTheme: Theme) => {
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  const value = React.useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme }),
    [resolvedTheme, setTheme, theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
