import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils/tailwind";
import type { FooterLinksProps } from "../types";
import {
  footerLinkStyles,
} from "../styles";

export function FooterLinks({ className, groups }: FooterLinksProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:gap-x-12", className)}>
      {groups.map((group, groupIndex) => (
        <motion.nav
          key={group.id}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.3,
            delay: groupIndex * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="space-y-2.5"
          aria-label={`${group.title} footer links`}
        >
          <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-subtle-foreground">{group.title}</h3>
          <ul className="space-y-2">
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
        </motion.nav>
      ))}
    </div>
  );
}
