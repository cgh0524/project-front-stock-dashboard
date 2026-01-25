import type {
  IndustryPerformance,
  IndustryPerformanceQuery,
  MarketSectorPerformance,
  MarketSectorPerformanceQuery,
} from "@/entities/market-performance";

import type {
  FmpIndustryPerformanceDTO,
  FmpIndustryPerformanceQuery,
  FmpMarketSectorPerformanceDTO,
  FmpMarketSectorPerformanceQuery,
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

export function toFmpMarketSectorPerformanceQuery(
  query: MarketSectorPerformanceQuery
): FmpMarketSectorPerformanceQuery {
  return {
    date: query.date,
    sector: query.sector,
    exchange: query.exchange,
  };
}

export function toFmpIndustryPerformanceQuery(
  query: IndustryPerformanceQuery
): FmpIndustryPerformanceQuery {
  return {
    date: query.date,
    industry: query.industry,
    exchange: query.exchange,
  };
}
