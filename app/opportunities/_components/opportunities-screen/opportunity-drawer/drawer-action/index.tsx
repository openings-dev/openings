import { ExternalLink, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind";

interface DrawerActionProps {
  openOriginalLabel: string;
  url: string;
  shareLabel?: string;
  shareCopiedLabel?: string;
  shareFailedLabel?: string;
  shareUrl?: string;
  className?: string;
}

export function DrawerAction({
  openOriginalLabel,
  url,
  shareLabel,
  shareCopiedLabel,
  shareFailedLabel,
  shareUrl,
  className,
}: DrawerActionProps) {
  const handleShare = async () => {
    if (!shareUrl) return;

    try {
      if (navigator.share) {
        await navigator.share({ url: shareUrl });
      } else if (!navigator.clipboard) {
        window.open(shareUrl, "_blank", "noopener,noreferrer");
      } else {
        await navigator.clipboard.writeText(shareUrl);
      }
      if (shareCopiedLabel) toast.success(shareCopiedLabel);
    } catch {
      if (shareFailedLabel) toast.error(shareFailedLabel);
    }
  };

  return (
    <div className={cn("grid gap-2 pt-1 sm:grid-cols-2", className)}>
      <Button
        type="button"
        className="w-full rounded-md shadow-[0_14px_36px_-24px_rgb(0_0_0/0.75)]"
        onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
      >
        <ExternalLink className="size-4" />
        {openOriginalLabel}
      </Button>
      {shareUrl && shareLabel ? (
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-md border-primary/25 bg-background/45 text-foreground hover:bg-primary/8"
          onClick={handleShare}
        >
          <Share2 className="size-4" />
          {shareLabel}
        </Button>
      ) : null}
    </div>
  );
}
