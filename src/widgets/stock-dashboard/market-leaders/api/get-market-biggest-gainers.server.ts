"server-only";

import type { MarketLeaderItemModel } from "@/entities/market-leader";
import { marketLeaderService } from "@/server/service/market-leader.service";

/** (Server-side) 가장 많이 상승한 종목 조회 */
export const getMarketBiggestGainers = async (): Promise<
  MarketLeaderItemModel[]
> => {
  const result = await marketLeaderService.getBiggestGainers();
  if (result.ok) {
    return result.data;
  }
  throw new Error(result.message);
};
