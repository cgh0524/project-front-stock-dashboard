import type { MarketLeaderItem } from "@/entities/market-leader";
import { ERROR_SOURCE } from "@/server/errors/base-error";
import { fetcher } from "@/server/http/http-client";
import { parseOrFail } from "@/server/validation/zod-validate";

import type { ApiProviderConfig } from "../provider.config";
import { API_PROVIDER, getApiProviderConfig } from "../provider.config";
import { toMarketLeaderItem } from "./fmp-market-leader.adapter";
import {
  type FmpMarketLeaderItemDTO,
  fmpMarketLeaderItemSchema,
} from "./fmp-market-leader.schema";
import type { MarketLeaderProvider } from "./market-leader.provider";

export class FmpMarketLeaderProvider implements MarketLeaderProvider {
  readonly name = API_PROVIDER.FMP;
  private readonly apiConfig: ApiProviderConfig = getApiProviderConfig(
    this.name
  );

  async getBiggestGainers(): Promise<MarketLeaderItem[]> {
    const url = `${this.apiConfig.baseUrl}/stock/biggest-gainers`;
    const data = await fetcher<FmpMarketLeaderItemDTO[]>(url, {
      provider: this.name,
    });

    const dtos = data.map((dto) =>
      parseOrFail(fmpMarketLeaderItemSchema, dto, {
        source: ERROR_SOURCE.UPSTREAM,
        context: {
          provider: this.name,
          url,
        },
      })
    );

    return dtos.map(toMarketLeaderItem);
  }

  async getBiggestLosers(): Promise<MarketLeaderItem[]> {
    const url = `${this.apiConfig.baseUrl}/stock/biggest-losers`;
    const data = await fetcher<FmpMarketLeaderItemDTO[]>(url, {
      provider: this.name,
    });

    const dtos = data.map((dto) =>
      parseOrFail(fmpMarketLeaderItemSchema, dto, {
        source: ERROR_SOURCE.UPSTREAM,
        context: {
          provider: this.name,
          url,
        },
      })
    );

    return dtos.map(toMarketLeaderItem);
  }
  async getMostActives(): Promise<MarketLeaderItem[]> {
    const url = `${this.apiConfig.baseUrl}/stock/most-actives`;
    const data = await fetcher<FmpMarketLeaderItemDTO[]>(url, {
      provider: this.name,
    });

    const dtos = data.map((dto) =>
      parseOrFail(fmpMarketLeaderItemSchema, dto, {
        source: ERROR_SOURCE.UPSTREAM,
        context: {
          provider: this.name,
          url,
        },
      })
    );

    return dtos.map(toMarketLeaderItem);
  }
}
