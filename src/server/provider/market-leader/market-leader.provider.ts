import type { MarketLeaderItem } from "@/entities/market-leader";

import type { ApiProvider } from "../provider.config";
import { FmpMarketLeaderProvider } from "./fmp-market-leader.provider";

export interface MarketLeaderProvider {
  readonly name: ApiProvider;
  getBiggestGainers(): Promise<MarketLeaderItem[]>;
  getBiggestLosers(): Promise<MarketLeaderItem[]>;
  getMostActives(): Promise<MarketLeaderItem[]>;
}

export const marketLeaderProvider = new FmpMarketLeaderProvider();
