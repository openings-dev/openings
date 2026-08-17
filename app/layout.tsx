import type { Metadata } from "next";
import { Figtree, Geist_Mono, Newsreader } from "next/font/google";
import { AppShell } from "@/app/_components/app-shell";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ThemeScript } from "@/components/providers/theme-provider/theme-script";
import { Theme } from "@/components/providers/theme-provider/types";
import { Toaster } from "@/components/ui/sonner";
import {
  createPageMetadata,
  SITE_DEFAULT_DESCRIPTION,
  SITE_ORIGIN,
} from "@/lib/metadata/site-metadata";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
  weight: "variable",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  axes: ["opsz"],
  preload: false,
});

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "openings.dev — Jobs from public GitHub communities",
    description: SITE_DEFAULT_DESCRIPTION,
    path: "/",
  }),
  metadataBase: SITE_ORIGIN,
  title: {
    default: "openings.dev — Jobs from public GitHub communities",
    template: "%s | openings.dev",
  },
  icons: {
    icon: [
      {
        url: "/light-mode-favicon.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/dark-mode-favicon.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/light-mode-favicon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: ["/light-mode-favicon.svg"],
    apple: [{ url: "/light-mode-favicon.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${figtree.variable} ${newsreader.variable} ${geistMono.variable} h-full antialiased`}
    >
      <ThemeScript />
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider defaultTheme={Theme.System} enableSystem>
          <I18nProvider>
            <AppShell>{children}</AppShell>
          </I18nProvider>
          <Toaster position="bottom-right" richColors={false} />
        </ThemeProvider>
      </body>
    </html>
  );
}
