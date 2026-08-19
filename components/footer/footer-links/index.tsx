import Link from "next/link";
import { cn } from "@/lib/utils/tailwind";
import type { FooterLinksProps } from "../types";
import { footerLinkStyles } from "../styles";

export function FooterLinks({
  className,
  groups,
}: FooterLinksProps): React.ReactNode {
  return (
    <div
      className={cn(
        "grid gap-x-8 gap-y-8 sm:grid-cols-3 lg:gap-x-12",
        className,
      )}
    >
      {groups.map((group) => (
        <nav
          key={group.id}
          className="space-y-3"
          aria-label={group.ariaLabel ?? group.title}
        >
          <h2 className="text-label font-semibold text-night-foreground">
            {group.title}
          </h2>
          <ul className="space-y-0.5">
            {group.links.map((linkItem) => (
              <li key={`${linkItem.label}-${linkItem.href}`}>
                <Link
                  href={linkItem.href}
                  target={linkItem.external ? "_blank" : undefined}
                  rel={linkItem.external ? "noreferrer" : undefined}
                  className={cn(
                    footerLinkStyles({
                      intent: group.id === "legal" ? "prominent" : "default",
                    }),
                  )}
                >
                  {linkItem.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>
  );
}
