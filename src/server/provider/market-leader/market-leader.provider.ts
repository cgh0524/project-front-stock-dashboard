import type { MarketLeaderItemModel } from "@/entities/market-leader";

import type { ApiProvider } from "../provider.config";
import { FmpMarketLeaderProvider } from "./fmp-market-leader.provider";

export interface MarketLeaderProvider {
  readonly name: ApiProvider;
  getBiggestGainers(): Promise<MarketLeaderItemModel[]>;
  getBiggestLosers(): Promise<MarketLeaderItemModel[]>;
  getMostActives(): Promise<MarketLeaderItemModel[]>;
}

export const marketLeaderProvider = new FmpMarketLeaderProvider();
