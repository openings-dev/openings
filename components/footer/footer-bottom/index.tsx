import * as React from "react";
import { motion } from "framer-motion";
import { Copy, Mail } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useTheme } from "@/components/providers/theme-provider/use-theme";
import { ResolvedTheme } from "@/components/providers/theme-provider/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind";
import type { FooterBottomProps } from "../types";

export function FooterBottom({
  className,
  supportEmail,
  supportEmailButtonLabel,
  supportEmailCopiedMessage,
  supportEmailCopyErrorMessage,
  supportText,
  copyrightText,
  signature,
}: FooterBottomProps) {
  const { resolvedTheme } = useTheme();

  const handleCopySupportEmail = React.useCallback(async () => {
    if (!supportEmail) {
      return;
    }

    try {
      await navigator.clipboard.writeText(supportEmail);
      toast.success(supportEmailCopiedMessage);
    } catch {
      toast.error(supportEmailCopyErrorMessage);
    }
  }, [supportEmail, supportEmailCopiedMessage, supportEmailCopyErrorMessage]);

  const signatureLogoSrc =
    resolvedTheme === ResolvedTheme.Dark
      ? "/trebla-solid-white-logo-inline.svg"
      : "/trebla-solid-primary-logo-inline.svg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex flex-col gap-4 border-t-2 border-border pt-5 sm:flex-row sm:items-center sm:justify-between", className)}
    >
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{copyrightText}</p>
        <p className="text-sm text-muted-foreground">{supportText}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        {supportEmail ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopySupportEmail}
            className="h-10 rounded-lg px-3 text-xs"
            aria-label={supportEmailButtonLabel}
          >
            <Mail className="size-3.5" aria-hidden="true" />
            <span>{supportEmail}</span>
            <Copy className="size-3.5 opacity-70" aria-hidden="true" />
          </Button>
        ) : null}

        <a
          href="https://treb.la"
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-10 cursor-pointer items-center gap-2 rounded-md px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <p className="text-sm font-medium tracking-[-0.01em] text-foreground/90">{signature}</p>

          <Image
            src={signatureLogoSrc}
            alt="openings.dev logo"
            width={72}
            height={15}
            className="h-auto w-[72px]"
          />
        </a>
      </div>
    </motion.div>
  );
}
