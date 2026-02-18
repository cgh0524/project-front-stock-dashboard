import { formatDollarAmount } from "./format-dollar-amount";

export function formatFixed(value: number, digits = 2): string {
  return value.toFixed(digits);
}

export function formatCurrency(value: number, digits = 2): string {
  return formatDollarAmount(Number(value.toFixed(digits)));
}

export function formatPercent(value: number, digits = 2): string {
  return `${formatFixed(value, digits)}%`;
}
