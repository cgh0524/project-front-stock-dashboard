import type { MarketLeaderItemModel } from "@/entities/market-leader";
import type { ApiSuccess } from "@/shared/api/api-success";

import type { ApiError } from "../errors/api-error";
import { normalizeError } from "../http/error-response";
import { normalizeSuccess } from "../http/success-response";
import {
  type MarketLeaderProvider,
  marketLeaderProvider,
} from "../provider/market-leader";

export class MarketLeaderService {
  constructor(private readonly provider: MarketLeaderProvider) {}

  /** 가장 많이 상승한 종목 조회 */
  async getBiggestGainers(): Promise<
    ApiSuccess<MarketLeaderItemModel[]> | ApiError
  > {
    try {
      const result = await this.provider.getBiggestGainers();
      return normalizeSuccess(this.provider.name, result);
    } catch (error) {
      return normalizeError(error, this.provider.name);
    }
  }

  /** 가장 많이 하락한 종목 조회 */
  async getBiggestLosers(): Promise<ApiSuccess<MarketLeaderItemModel[]> | ApiError> {
    try {
      const result = await this.provider.getBiggestLosers();
      return normalizeSuccess(this.provider.name, result);
    } catch (error) {
      return normalizeError(error, this.provider.name);
    }
  }

  /** 가장 거래가 활발한 종목 조회 */
  async getMostActives(): Promise<ApiSuccess<MarketLeaderItemModel[]> | ApiError> {
    try {
      const result = await this.provider.getMostActives();
      return normalizeSuccess(this.provider.name, result);
    } catch (error) {
      return normalizeError(error, this.provider.name);
    }
  }
}

export const marketLeaderService = new MarketLeaderService(
  marketLeaderProvider
);
