import { fetcher } from "@/server/http/http-client";
import type { ApiProviderConfig } from "@/server/provider/provider.config";
import {
  API_PROVIDER,
  getApiProviderConfig,
} from "@/server/provider/provider.config";
import { toSymbols } from "@/server/provider/symbol/finnhub-symbol.adapter";
import type { Symbol } from "@/entities/stock/model/symbol";

import { ERROR_SOURCE } from "../../errors/base-error";
import { parseOrFail } from "../../validation/zod-validate";
import { finnhubSymbolResultSchema } from "./finnhub-symbol.schema";
import type { SymbolProvider } from "./symbol.provider";

export class FinnhubSymbolProvider implements SymbolProvider {
  private readonly provider = API_PROVIDER.FINNHUB;
  private readonly apiConfig: ApiProviderConfig = getApiProviderConfig(
    this.provider
  );

  async searchSymbols(query: string): Promise<Symbol[]> {
    const url = `${this.apiConfig.baseUrl}/search?q=${query}`;
    const data = await fetcher(url, {
      provider: this.provider,
    });

    const dto = parseOrFail(finnhubSymbolResultSchema, data, {
      source: ERROR_SOURCE.UPSTREAM,
      context: {
        provider: this.provider,
        url,
      },
    });

    return toSymbols(dto);
  }
}
