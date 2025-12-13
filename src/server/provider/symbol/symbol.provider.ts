import type { Symbol } from "@/entities/stock/model/symbol";

import { FinnhubSymbolProvider } from "./finnhub-symbol.provider";

export interface SymbolProvider {
  searchSymbols(query: string): Promise<Symbol[]>;
}

/** 추후 다른 공급자 추가 시 병합 클래스 구현 등 변경 필요 (현재는 Finnhub 공급자만 사용) */
export const symbolProvider = new FinnhubSymbolProvider();
