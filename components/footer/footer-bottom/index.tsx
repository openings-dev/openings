import * as React from "react";
import { motion } from "framer-motion";
import { Copy, Mail } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind";
import type { FooterBottomProps } from "../types";
import {
  footerBottomActionsStyles,
  footerBottomMetaStackStyles,
  footerBottomRootStyles,
  footerBottomTextStyles,
  footerSignatureStyles,
  footerSupportButtonStyles,
} from "../styles";

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
    resolvedTheme === "dark"
      ? "/brand-mark-dark.svg"
      : "/brand-mark-light.svg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(footerBottomRootStyles(), className)}
    >
      <div className={footerBottomMetaStackStyles()}>
        <p className={footerBottomTextStyles()}>{copyrightText}</p>
        <p className={footerBottomTextStyles()}>{supportText}</p>
      </div>

      <div className={footerBottomActionsStyles()}>
        {supportEmail ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleCopySupportEmail}
            className={footerSupportButtonStyles()}
            aria-label={supportEmailButtonLabel}
          >
            <Mail className="size-3.5" aria-hidden="true" />
            <span>{supportEmail}</span>
            <Copy className="size-3.5 opacity-70" aria-hidden="true" />
          </Button>
        ) : null}

        <div className="flex items-center gap-2">
          <p className={footerSignatureStyles()}>{signature}</p>
          <Image
            src={signatureLogoSrc}
            alt="openings.dev logo"
            width={18}
            height={18}
            className="rounded-[4px] border border-border/70 bg-card"
          />
          <span className="text-sm font-semibold tracking-[-0.01em] text-foreground">
            openings.dev
          </span>
        </div>
      </div>
    </motion.div>
  );
}
