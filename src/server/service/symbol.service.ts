import type { Symbol } from "@/entities/stock/model/symbol";
import { type SymbolProvider, symbolProvider } from "@/server/provider/symbol";

class SymbolService {
  constructor(private readonly provider: SymbolProvider) {}

  /** 심볼 검색 */
  searchSymbols(query: string): Promise<Symbol[]> {
    return this.provider.searchSymbols(query);
  }
}

export const symbolService = new SymbolService(symbolProvider);
