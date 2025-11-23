import { toSymbols } from "@/shared/api/server/adapter/symbol.adapter";
import { fetcher } from "@/shared/api/server/http/http-client";
import {
  type ApiProvider,
  getApiProviderConfig,
} from "@/shared/api/server/provider/api-provider";
import type { FinnhubSymbolResult, Symbol } from "@/shared/domain/symbol";

import type { SymbolProvider } from "./symbol-provider";

export class FinnhubSymbolProvider implements SymbolProvider {
  private readonly baseUrl: string;

  constructor(private readonly provider: ApiProvider) {
    const { baseUrl } = getApiProviderConfig(provider);
    this.baseUrl = baseUrl;
  }

  async searchSymbols(query: string): Promise<Symbol[]> {
    const raw = await fetcher<FinnhubSymbolResult>(
      `${this.baseUrl}/search?q=${query}`,
      { provider: this.provider }
    );

    return toSymbols(raw);
  }
}
