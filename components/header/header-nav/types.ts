export interface HeaderNavItem {
  label: string;
  href: string;
}

export interface HeaderNavProps {
  className?: string;
  items: HeaderNavItem[];
  ariaLabel: string;
}
