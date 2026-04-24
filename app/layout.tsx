import type { Metadata } from "next";
import { AppShell } from "@/app/_components/app-shell";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
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

export const metadata: Metadata = {
  title: "openings.dev",
  description: "Modern jobs intelligence platform",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <AppShell>{children}</AppShell>
          </I18nProvider>
          <Toaster position="top-right" richColors={false} />
        </ThemeProvider>
      </body>
    </html>
  );
}
