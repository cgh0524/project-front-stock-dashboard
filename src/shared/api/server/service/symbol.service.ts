import {
  type SymbolProvider,
  symbolProvider,
} from "@/shared/api/server/provider/symbol";
import type { Symbol } from "@/entities/stock/model/symbol";

class SymbolService {
  constructor(private readonly provider: SymbolProvider) {}

  /** 심볼 검색 */
  searchSymbols(query: string): Promise<Symbol[]> {
    return this.provider.searchSymbols(query);
  }
}

export const symbolService = new SymbolService(symbolProvider);
