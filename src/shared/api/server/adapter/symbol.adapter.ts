import type { FinnhubSymbolResult, Symbol } from "@/shared/domain/symbol";

import { ValidationError } from "../errors/base-error";

/** Finnhub 응답을 도메인 심볼 리스트로 변환 */
export const toSymbols = (payload: FinnhubSymbolResult): Symbol[] => {
  try {
    return payload.result.map((item) => ({
      description: item.description,
      displaySymbol: item.displaySymbol,
      symbol: item.symbol,
      type: item.type,
    }));
  } catch (error) {
    const originalMessage =
      error instanceof Error ? error.message : String(error);
    throw new ValidationError(originalMessage, { cause: originalMessage });
  }
};
