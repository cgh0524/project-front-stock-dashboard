export const marketLeaderQueryKeys = {
  biggestGainers: () => ["market-biggest-gainers"] as const,
  biggestLosers: () => ["market-biggest-losers"] as const,
  mostActives: () => ["market-most-actives"] as const,
} as const;
