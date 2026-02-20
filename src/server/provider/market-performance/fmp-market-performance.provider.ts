import type {
  IndustryPerformance,
  IndustryPerformanceQuery,
  MarketSectorPerformance,
  MarketSectorPerformanceQuery,
} from "@/entities/market-performance";
import { ERROR_SOURCE } from "@/server/errors/base-error";
import { fetcher } from "@/server/http/http-client";
import { parseOrFail } from "@/server/validation/zod-validate";
import { toQueryString } from "@/shared/utils/query-string";

import type { ApiProviderConfig } from "../provider.config";
import { API_PROVIDER, getApiProviderConfig } from "../provider.config";
import {
  toFmpIndustryPerformanceQuery,
  toFmpMarketSectorPerformanceQuery,
  toIndustryPerformance,
  toMarketSectorPerformance,
} from "./fmp-market-performance.adapter";
import type {
  FmpIndustryPerformanceDTO,
  FmpMarketSectorPerformanceDTO,
} from "./fmp-market-performance.schema";
import {
  fmpIndustryPerformanceSchema,
  fmpMarketSectorPerformanceSchema,
} from "./fmp-market-performance.schema";
import type { MarketPerformanceProvider } from "./market-performace.provider";

export class FmpMarketPerformanceProvider implements MarketPerformanceProvider {
  readonly name = API_PROVIDER.FMP;
  private readonly apiConfig: ApiProviderConfig = getApiProviderConfig(
    this.name
  );

  async getMarketSectorPerformance(
    query: MarketSectorPerformanceQuery
  ): Promise<MarketSectorPerformance[]> {
    const providerQuery = toFmpMarketSectorPerformanceQuery(query);
    const url = `${
      this.apiConfig.baseUrl
    }/sector-performance-snapshot${toQueryString(providerQuery)}`;
    const data = await fetcher<FmpMarketSectorPerformanceDTO[]>(url, {
      provider: this.name,
    });

    const dtos = data.map((dto) =>
      parseOrFail(fmpMarketSectorPerformanceSchema, dto, {
        source: ERROR_SOURCE.UPSTREAM,
        context: {
          provider: this.name,
          url,
        },
      })
    );

    return dtos.map(toMarketSectorPerformance);
  }

  async getIndustryPerformance(
    query: IndustryPerformanceQuery
  ): Promise<IndustryPerformance[]> {
    const providerQuery = toFmpIndustryPerformanceQuery(query);
    const url = `${
      this.apiConfig.baseUrl
    }/industry-performance-snapshot${toQueryString(providerQuery)}`;
    const data = await fetcher<FmpIndustryPerformanceDTO[]>(url, {
      provider: this.name,
    });

    const dtos = data.map((dto) =>
      parseOrFail(fmpIndustryPerformanceSchema, dto, {
        source: ERROR_SOURCE.UPSTREAM,
        context: {
          provider: this.name,
          url,
        },
      })
    );

    return dtos.map(toIndustryPerformance);
  }
}
