"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import * as React from "react";
import { MoonStar, SunMedium, SunMoon } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider/use-theme";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { ResolvedTheme, Theme } from "@/components/providers/theme-provider/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind";
import type { ThemeToggleProps } from "../types";

const subscribeToHydration = (): (() => void) => () => undefined;
const getClientHydrationSnapshot = (): boolean => true;
const getServerHydrationSnapshot = (): boolean => false;

export function ThemeToggle({ className }: ThemeToggleProps): React.ReactNode {
  const { resolvedTheme, setTheme } = useTheme();
  const { messages } = useI18n();
  const prefersReducedMotion = useReducedMotion();
  const hydrated = React.useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot,
  );
  const isDark = resolvedTheme === ResolvedTheme.Dark;
  const nextTheme = isDark ? Theme.Light : Theme.Dark;
  const ariaLabel = isDark
    ? messages.header.switchToLightMode
    : messages.header.switchToDarkMode;

  return (
    <div className={cn("flex items-center", className)}>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        aria-label={hydrated ? ariaLabel : messages.header.themeControlAriaLabel}
        disabled={!hydrated}
        onClick={() => setTheme(nextTheme)}
        className="rounded-control text-muted-foreground hover:text-foreground"
      >
        {hydrated ? <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, scale: 0.7, rotate: -50 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.7, rotate: 50 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.18, ease: "easeOut" }
            }
          >
            {isDark ? <MoonStar size={16} aria-hidden="true" /> : <SunMedium size={16} aria-hidden="true" />}
          </motion.span>
        </AnimatePresence> : <SunMoon size={16} aria-hidden="true" />}
      </Button>
    </div>
  );
}
