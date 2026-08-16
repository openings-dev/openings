export enum Theme {
  Light = "light",
  Dark = "dark",
  System = "system",
}

export enum ResolvedTheme {
  Light = "light",
  Dark = "dark",
}

export interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
}
