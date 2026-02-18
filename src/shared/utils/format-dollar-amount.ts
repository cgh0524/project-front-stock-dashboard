/** 금액 앞에 $를 붙이는 함수 */
export function formatDollarAmount(value: number): string {
  const abs = Math.abs(value);

  if (value < 0) {
    return `-$${abs}`;
  }

  return `$${abs}`;
}

/** 금액 앞에 +$ 또는 -$를 붙이는 함수 */
export function formatSignedDollarAmount(value: number): string {
  const abs = Math.abs(value);
  
  if(value === 0) return `$${abs}`;
  return value > 0 ? `+$${abs}` : `-$${abs}`;
}

