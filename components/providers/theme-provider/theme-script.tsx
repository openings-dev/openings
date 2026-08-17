import { THEME_STORAGE_KEY } from "./constants";

const themeScript = `
  (() => {
    const root = document.documentElement;
    let storedTheme = null;

    try {
      storedTheme = window.localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    } catch {
      storedTheme = null;
    }

    const theme = storedTheme === "light" || storedTheme === "dark" || storedTheme === "system"
      ? storedTheme
      : "system";
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = theme === "dark" || (theme === "system" && prefersDark);

    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
  })();
`;

export function ThemeScript(): React.ReactNode {
  return (
    // This is the App Router's server-rendered document head. Raw markup keeps
    // the pre-paint initializer out of React's client script reconciliation.
    // eslint-disable-next-line @next/next/no-head-element
    <head
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `<script id="openings-theme-init">${themeScript}</script>`,
      }}
    />
  );
}
