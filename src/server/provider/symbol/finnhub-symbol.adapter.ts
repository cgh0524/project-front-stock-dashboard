import type { Symbol } from "@/entities/symbol";

import type { FinnhubSymbolResultDTO } from "./finnhub-symbol.schema";

/** Finnhub 응답을 도메인 심볼 리스트로 변환 */
export function toSymbols(payload: FinnhubSymbolResultDTO): Symbol[] {
  return payload.result.map((item) => ({
    description: item.description,
    displaySymbol: item.displaySymbol,
    symbol: item.symbol,
    type: item.type,
  }));
}
