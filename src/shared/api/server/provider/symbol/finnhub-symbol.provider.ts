import { fetcher } from "@/shared/api/server/http/http-client";
import {
  type ApiProvider,
  getApiProviderConfig,
} from "@/shared/api/server/provider/api-provider";
import { toSymbols } from "@/shared/api/server/provider/symbol/finnhub-symbol.adapter";
import type { Symbol } from "@/shared/domain/symbol";

import { ERROR_SOURCE } from "../../errors/base-error";
import { parseOrFail } from "../../validation/zod-validate";
import { finnhubSymbolResultSchema } from "./finnhub-symbol.schema";
import type { SymbolProvider } from "./symbol-provider";

export class FinnhubSymbolProvider implements SymbolProvider {
  private readonly baseUrl: string;

  constructor(private readonly provider: ApiProvider) {
    const { baseUrl } = getApiProviderConfig(provider);
    this.baseUrl = baseUrl;
  }

  async searchSymbols(query: string): Promise<Symbol[]> {
    const url = `${this.baseUrl}/search?q=${query}`;
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
