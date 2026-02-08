import { toTitleCase } from "./format";
import type { SwatchGroup } from "./types";

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

const primitiveBases = ["gray", "blue", "green", "red", "yellow"] as const;

const toCssVarToken = (name: string) => `--color-${name}`;

const buildPrimitiveGroups = (): SwatchGroup[] => [
  ...primitiveBases.map((base) => ({
    title: toTitleCase(base),
    tokens: shadeKeys.map((shade) => ({
      label: `${toTitleCase(base)} ${shade}`,
      token: toCssVarToken(`${base}-${shade}`),
    })),
  })),
  {
    title: "Neutrals",
    tokens: [
      { label: "White", token: toCssVarToken("white") },
      { label: "Black", token: toCssVarToken("black") },
    ],
  },
];

const buildSemanticGroups = (): SwatchGroup[] => [
  {
    title: "Background",
    tokens: [
      { label: "Background / Default", token: toCssVarToken("bg-default") },
      { label: "Background / Subtle", token: toCssVarToken("bg-subtle") },
    ],
  },
  {
    title: "Surface",
    tokens: [
      { label: "Surface / Default", token: toCssVarToken("surface-default") },
      { label: "Surface / Alt", token: toCssVarToken("surface-alt") },
    ],
  },
  {
    title: "Border",
    tokens: [
      { label: "Border / Default", token: toCssVarToken("border-default") },
      { label: "Border / Strong", token: toCssVarToken("border-strong") },
    ],
  },
  {
    title: "Text",
    tokens: [
      { label: "Text / Primary", token: toCssVarToken("text-primary") },
      { label: "Text / Secondary", token: toCssVarToken("text-secondary") },
      { label: "Text / Muted", token: toCssVarToken("text-muted") },
      { label: "Text / Inverted", token: toCssVarToken("text-inverted") },
    ],
  },
  {
    title: "Accent",
    tokens: [
      { label: "Accent / Primary", token: toCssVarToken("accent-primary") },
      { label: "Accent / Hover", token: toCssVarToken("accent-hover") },
      { label: "Accent / Muted", token: toCssVarToken("accent-muted") },
    ],
  },
  {
    title: "Positive",
    tokens: [
      { label: "Positive / Default", token: toCssVarToken("positive") },
      { label: "Positive / Subtle", token: toCssVarToken("positive-subtle") },
    ],
  },
  {
    title: "Negative",
    tokens: [
      { label: "Negative / Default", token: toCssVarToken("negative") },
      { label: "Negative / Subtle", token: toCssVarToken("negative-subtle") },
    ],
  },
  {
    title: "Warning",
    tokens: [
      { label: "Warning / Default", token: toCssVarToken("warning") },
      { label: "Warning / Subtle", token: toCssVarToken("warning-subtle") },
    ],
  },
  {
    title: "Focus",
    tokens: [{ label: "Focus Ring", token: toCssVarToken("focus-ring") }],
  },
];

export const primitivePaletteGroups = buildPrimitiveGroups();
export const semanticPaletteGroups = buildSemanticGroups();
