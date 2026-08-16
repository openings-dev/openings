"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider/use-theme";
import { ResolvedTheme, Theme } from "@/components/providers/theme-provider/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind";
import type { ThemeToggleProps } from "../types";

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === ResolvedTheme.Dark;
  const nextTheme = isDark ? Theme.Light : Theme.Dark;
  const ariaLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

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
        className="size-9 rounded-md border-border/70 bg-transparent text-foreground/78 shadow-none hover:bg-muted/55 hover:text-foreground"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, scale: 0.7, rotate: -50 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.7, rotate: 50 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {isDark ? <MoonStar size={16} /> : <SunMedium size={16} />}
          </motion.span>
        </AnimatePresence>
      </Button>
    </motion.div>
  );
}
