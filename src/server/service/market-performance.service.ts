import type {
  IndustryPerformance,
  IndustryPerformanceQuery,
  MarketSectorPerformance,
  MarketSectorPerformanceQuery,
} from "@/entities/market-performance";
import type { ApiSuccess } from "@/shared/api/api-success";

import type { ApiError } from "../errors/api-error";
import { normalizeError } from "../http/error-response";
import { normalizeSuccess } from "../http/success-response";
import {
  type MarketPerformanceProvider,
  marketPerformanceProvider,
} from "../provider/market-performance";

class MarketPerformanceService {
  constructor(private readonly provider: MarketPerformanceProvider) {}

  /** 시장 섹터 성과 조회 */
  async getMarketSectorPerformance(
    query: MarketSectorPerformanceQuery
  ): Promise<ApiSuccess<MarketSectorPerformance[]> | ApiError> {
    try {
      const result = await this.provider.getMarketSectorPerformance(query);
      return normalizeSuccess(this.provider.name, result);
    } catch (error) {
      return normalizeError(error, this.provider.name);
    }
  }

  /** 산업군 성과 조회 */
  async getIndustryPerformance(
    query: IndustryPerformanceQuery
  ): Promise<ApiSuccess<IndustryPerformance[]> | ApiError> {
    try {
      const result = await this.provider.getIndustryPerformance(query);
      return normalizeSuccess(this.provider.name, result);
    } catch (error) {
      return normalizeError(error, this.provider.name);
    }
  }
}

export const marketPerformanceService = new MarketPerformanceService(
  marketPerformanceProvider
);
