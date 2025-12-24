import type { Symbol } from "@/entities/symbol/model/symbol";
import { fetcher } from "@/server/http/http-client";
import type { ApiProviderConfig } from "@/server/provider/provider.config";
import {
  API_PROVIDER,
  getApiProviderConfig,
} from "@/server/provider/provider.config";
import { toSymbols } from "@/server/provider/symbol/finnhub-symbol.adapter";

import { ERROR_SOURCE } from "../../errors/base-error";
import { parseOrFail } from "../../validation/zod-validate";
import { finnhubSymbolResultSchema } from "./finnhub-symbol.schema";
import type { SymbolProvider } from "./symbol.provider";

export class FinnhubSymbolProvider implements SymbolProvider {
  readonly name = API_PROVIDER.FINNHUB;
  private readonly apiConfig: ApiProviderConfig = getApiProviderConfig(
    this.name
  );

  async searchSymbols(query: string): Promise<Symbol[]> {
    const url = `${this.apiConfig.baseUrl}/search?q=${query}&exchange=US`;
    const data = await fetcher(url, {
      provider: this.name,
    });

    const dto = parseOrFail(finnhubSymbolResultSchema, data, {
      source: ERROR_SOURCE.UPSTREAM,
      context: {
        provider: this.name,
        url,
      },
    });

    return toSymbols(dto);
  }
}
