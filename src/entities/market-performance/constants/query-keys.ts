import type { MarketSectorPerformanceQuery } from "../types";

export type MarketSectorPerformanceKeyParams = MarketSectorPerformanceQuery;

export const marketPerformanceQueryKeys = {
  sector: ({ date, exchange, sector }: MarketSectorPerformanceKeyParams) =>
    ["market-sector-performance", date, exchange, sector ?? null] as const,
} as const;
