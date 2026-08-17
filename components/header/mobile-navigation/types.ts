import type React from "react";
import type { HeaderNavItem } from "../header-nav/types";

export interface MobileNavigationProps {
  items: HeaderNavItem[];
  ariaLabel: string;
  openMenuAriaLabel: string;
  closeMenuAriaLabel: string;
  githubAriaLabel: string;
  children:
    | React.ReactNode
    | ((portalContainer: HTMLElement | null) => React.ReactNode);
}
