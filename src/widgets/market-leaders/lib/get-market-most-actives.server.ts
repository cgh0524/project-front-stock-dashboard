"server-only";

import type { MarketLeaderItem } from "@/entities/market-leader";
import { marketLeaderService } from "@/server/service/market-leader.service";

export const getMarketMostActives = async (): Promise<MarketLeaderItem[]> => {
  const result = await marketLeaderService.getMostActives();
  if (result.ok) {
    return result.data;
  }
  throw new Error(result.message);
};
