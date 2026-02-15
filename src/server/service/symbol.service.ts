import type { Symbol } from "@/entities/symbol";
import { type SymbolProvider, symbolProvider } from "@/server/provider/symbol";
import type { ApiSuccess } from "@/shared/api/api-success";

import type { ApiError } from "../errors/api-error";
import { normalizeError } from "../http/error-response";
import { normalizeSuccess } from "../http/success-response";

class SymbolService {
  constructor(private readonly provider: SymbolProvider) {}

  /** 심볼 검색 */
  async searchSymbols(query: string): Promise<ApiSuccess<Symbol[]> | ApiError> {
    try {
      const result = await this.provider.searchSymbols(query);
      return normalizeSuccess(this.provider.name, result);
    } catch (error) {
      return normalizeError(error, this.provider.name);
    }
  }
}

export const symbolService = new SymbolService(symbolProvider);
