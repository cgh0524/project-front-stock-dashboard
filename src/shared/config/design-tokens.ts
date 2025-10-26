export const shadeKeys = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
] as const;

export type ShadeKey = (typeof shadeKeys)[number];

export const createShades = (name: string) =>
  shadeKeys.reduce<Record<ShadeKey, string>>((acc, shade) => {
    acc[shade] = `var(--color-${name}-${shade})`;
    return acc;
  }, {} as Record<ShadeKey, string>);

export const primitiveColors = {
  gray: createShades("gray"),
  blue: createShades("blue"),
  green: createShades("green"),
  red: createShades("red"),
  yellow: createShades("yellow"),
  white: "var(--color-white)",
  black: "var(--color-black)",
} as const;

export type PrimitiveColor =
  (typeof primitiveColors)[keyof typeof primitiveColors];

export const semanticColors = {
  background: {
    DEFAULT: "var(--color-bg-default)",
    subtle: "var(--color-bg-subtle)",
  },
  surface: {
    DEFAULT: "var(--color-surface-default)",
    alt: "var(--color-surface-alt)",
  },
  border: {
    DEFAULT: "var(--color-border-default)",
    strong: "var(--color-border-strong)",
  },
  text: {
    primary: "var(--color-text-primary)",
    secondary: "var(--color-text-secondary)",
    muted: "var(--color-text-muted)",
    inverted: "var(--color-text-inverted)",
  },
  accent: {
    DEFAULT: "var(--color-accent-primary)",
    hover: "var(--color-accent-hover)",
    muted: "var(--color-accent-muted)",
  },
  positive: {
    DEFAULT: "var(--color-positive)",
    subtle: "var(--color-positive-subtle)",
  },
  negative: {
    DEFAULT: "var(--color-negative)",
    subtle: "var(--color-negative-subtle)",
  },
  warning: {
    DEFAULT: "var(--color-warning)",
    subtle: "var(--color-warning-subtle)",
  },
  focus: "var(--color-focus-ring)",
} as const;

export type SemanticColor =
  (typeof semanticColors)[keyof typeof semanticColors];
