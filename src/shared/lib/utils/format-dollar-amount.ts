export function formatDollarAmount(value: number): string {
  const abs = Math.abs(value);

  if (value < 0) {
    return `-$${abs}`;
  }

  return `$${abs}`;
}
