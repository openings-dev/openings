import type { Metadata } from "next";
import { AppShell } from "@/app/_components/app-shell";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Theme } from "@/components/providers/theme-provider/types";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openings.dev"),
  title: {
    default: "openings.dev",
    template: "%s | openings.dev",
  },
  description:
    "Discover technology opportunities published by trusted GitHub communities.",
  openGraph: {
    type: "website",
    title: "openings.dev",
    description:
      "Technology opportunities shared by GitHub communities, gathered in one place.",
    url: "/",
    siteName: "openings.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "openings.dev",
    description:
      "Technology opportunities shared by GitHub communities, gathered in one place.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider defaultTheme={Theme.System} enableSystem>
          <I18nProvider>
            <AppShell>{children}</AppShell>
          </I18nProvider>
          <Toaster position="top-right" richColors={false} />
        </ThemeProvider>
      </body>
    </html>
  );
}
