import type {
  IndustryPerformance,
  MarketSectorPerformance,
} from "@/entities/market-performance";

import type {
  FmpIndustryPerformanceDTO,
  FmpMarketSectorPerformanceDTO,
} from "./fmp-market-performance.schema";

export function toMarketSectorPerformance(
  payload: FmpMarketSectorPerformanceDTO
): MarketSectorPerformance {
  return {
    date: payload.date,
    sector: payload.sector,
    exchange: payload.exchange,
    averageChange: payload.averageChange,
  };
}

export function toIndustryPerformance(
  payload: FmpIndustryPerformanceDTO
): IndustryPerformance {
  return {
    date: payload.date,
    industry: payload.industry,
    exchange: payload.exchange,
    averageChange: payload.averageChange,
  };
}
