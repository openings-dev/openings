"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider/use-theme";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { ResolvedTheme, Theme } from "@/components/providers/theme-provider/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind";
import type { ThemeToggleProps } from "../types";

export function ThemeToggle({ className }: ThemeToggleProps): React.ReactNode {
  const { resolvedTheme, setTheme } = useTheme();
  const { messages } = useI18n();
  const isDark = resolvedTheme === ResolvedTheme.Dark;
  const nextTheme = isDark ? Theme.Light : Theme.Dark;
  const ariaLabel = isDark
    ? messages.header.switchToLightMode
    : messages.header.switchToDarkMode;

  return (
    <motion.div
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      className={cn("flex items-center", className)}
    >
      <Button
        variant="outline"
        size="icon"
        type="button"
        aria-label={ariaLabel}
        onClick={() => setTheme(nextTheme)}
        className="size-9 rounded-lg border-transparent bg-transparent text-muted-foreground shadow-none hover:border-border/70 hover:bg-surface hover:text-foreground"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, scale: 0.7, rotate: -50 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.7, rotate: 50 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {isDark ? <MoonStar size={16} aria-hidden="true" /> : <SunMedium size={16} aria-hidden="true" />}
          </motion.span>
        </AnimatePresence>
      </Button>
    </motion.div>
  );
}
