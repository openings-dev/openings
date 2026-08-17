import * as React from "react";
import { ExternalLink, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind";

interface DrawerActionProps {
  openOriginalLabel: string;
  url: string;
  shareLabel?: string;
  shareSharedLabel?: string;
  shareCopiedLabel?: string;
  shareFailedLabel?: string;
  shareUrl?: string;
  className?: string;
  inert?: boolean;
}

export function DrawerAction({
  openOriginalLabel,
  url,
  shareLabel,
  shareSharedLabel,
  shareCopiedLabel,
  shareFailedLabel,
  shareUrl,
  className,
  inert = false,
}: DrawerActionProps): React.ReactNode {
  const [inlineAnnouncement, setInlineAnnouncement] = React.useState("");
  const shareButtonRef = React.useRef<HTMLButtonElement>(null);
  const isAbortError = (error: unknown) =>
    error instanceof DOMException && error.name === "AbortError";

  const announce = (message: string, tone: "error" | "success") => {
    const modalDialog = shareButtonRef.current?.closest("dialog");
    if (modalDialog?.open) {
      setInlineAnnouncement(message);
      return;
    }

    toast[tone](message);
  };

  const handleShare = async () => {
    if (!shareUrl) return;

    if (navigator.share) {
      try {
        await navigator.share({ url: shareUrl });
        if (shareSharedLabel) announce(shareSharedLabel, "success");
        return;
      } catch (error) {
        if (isAbortError(error)) return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      if (shareCopiedLabel) announce(shareCopiedLabel, "success");
    } catch {
      if (shareFailedLabel) announce(shareFailedLabel, "error");
    }
  };

  return (
    <div
      className={cn(
        "grid gap-2 sm:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]",
        className,
      )}
    >
      {inert ? (
        <Button type="button" className="w-full" disabled>
          <ExternalLink className="size-4" aria-hidden="true" />
          {openOriginalLabel}
        </Button>
      ) : (
        <Button asChild className="w-full">
          <a href={url} target="_blank" rel="noreferrer">
            <ExternalLink className="size-4" aria-hidden="true" />
            {openOriginalLabel}
          </a>
        </Button>
      )}
      {shareUrl && shareLabel ? (
        <Button
          ref={shareButtonRef}
          type="button"
          variant="outline"
          className="w-full"
          disabled={inert}
          onClick={inert ? undefined : handleShare}
        >
          <Share2 className="size-4" aria-hidden="true" />
          {shareLabel}
        </Button>
      ) : null}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {inlineAnnouncement}
      </p>
    </div>
  );
}
