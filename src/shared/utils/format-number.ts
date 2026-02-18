export function formatFixed(value: number, digits = 2): string {
  return value.toFixed(digits);
}

export function formatCurrency(
  value: number,
  options: { digits?: number; showSign?: boolean } = {}
): string {
  const { digits = 2, showSign = false } = options;
  const rounded = Number(value.toFixed(digits));
  const abs = Math.abs(rounded);

  if (!showSign) {
    return rounded < 0 ? `-$${abs}` : `$${abs}`;
  }

  if (rounded === 0) {
    return `$${abs}`;
  }

  return rounded > 0 ? `+$${abs}` : `-$${abs}`;
}

export function formatPercent(
  value: number,
  options: { digits?: number; showSign?: boolean } = {}
): string {
  const { digits = 2, showSign = false } = options;
  const rounded = Number(value.toFixed(digits));
  const abs = Math.abs(rounded);

  if (!showSign) {
    return `${formatFixed(rounded, digits)}%`;
  }

  if (rounded === 0) {
    return `${formatFixed(abs, digits)}%`;
  }

  return rounded > 0
    ? `+${formatFixed(abs, digits)}%`
    : `-${formatFixed(abs, digits)}%`;
}
