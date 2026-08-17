"use client";

import * as React from "react";
import { cn } from "@/lib/utils/tailwind";

interface AvatarProps {
  src?: string;
  fallback: string;
  className?: string;
  width: number;
  height: number;
  loading?: "eager" | "lazy";
}

function firstVisibleCharacter(value: string): string {
  return Array.from(value.trim())[0]?.toLocaleUpperCase() ?? "•";
}

export function Avatar({
  src,
  fallback,
  className,
  width,
  height,
  loading = "lazy",
}: AvatarProps): React.ReactNode {
  const [failedSource, setFailedSource] = React.useState<string | null>(null);
  const showImage = Boolean(src) && failedSource !== src;

  return (
    <span
      data-slot="avatar"
      data-fallback={showImage ? undefined : "true"}
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-surface-muted font-display font-semibold text-primary-deep",
        className,
      )}
      aria-hidden="true"
    >
      {showImage ? (
        // The adjacent visible identity provides the accessible name.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          loading={loading}
          decoding="async"
          width={width}
          height={height}
          className="size-full object-cover"
          onError={() => setFailedSource(src ?? null)}
        />
      ) : (
        firstVisibleCharacter(fallback)
      )}
    </span>
  );
}
