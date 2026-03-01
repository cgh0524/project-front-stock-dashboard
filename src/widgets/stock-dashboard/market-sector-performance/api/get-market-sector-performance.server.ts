"server-only";

import type { MarketSectorPerformance } from "@/entities/market-performance";
import { marketPerformanceService } from "@/server/service/market-performance.service";

export const getMarketSectorPerformance = async ({
  date,
  exchange,
}: {
  date: string;
  exchange: string;
}): Promise<MarketSectorPerformance[]> => {
  const result = await marketPerformanceService.getMarketSectorPerformance({
    date,
    exchange,
  });

  if (result.ok) {
    return result.data;
  }

  throw new Error(result.message);
};
