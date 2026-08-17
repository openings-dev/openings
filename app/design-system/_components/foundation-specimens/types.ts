export interface ColorRoleSpecimen {
  token: string;
  purposeKey: "canvas" | "paper" | "surface" | "elevated" | "overlay" | "foreground" | "muted" | "line" | "primary" | "lavender" | "mint" | "peach" | "status";
  swatchClassName: string;
  textClassName?: string;
  foregroundPair: string;
}

export interface ScaleSpecimen {
  label: string;
  className: string;
}

export interface TypographyRoleSpecimen {
  token: string;
  className: string;
  sample: "displaySample" | "bodySample" | "editorialSample";
}
