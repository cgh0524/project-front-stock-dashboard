import type {
  IndustryPerformance,
  IndustryPerformanceQuery,
  MarketSectorPerformance,
  MarketSectorPerformanceQuery,
} from "@/entities/market-performance";

import type { ApiProvider } from "../provider.config";
import { FmpMarketPerformanceProvider } from "./fmp-market-performance.provider";

export interface MarketPerformanceProvider {
  readonly name: ApiProvider;
  getMarketSectorPerformance(
    query: MarketSectorPerformanceQuery
  ): Promise<MarketSectorPerformance[]>;
  getIndustryPerformance(
    query: IndustryPerformanceQuery
  ): Promise<IndustryPerformance[]>;
}

export const marketPerformanceProvider = new FmpMarketPerformanceProvider();
