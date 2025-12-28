import type { Quote } from "@/entities/quote";

import type { FinnhubQuoteDTO } from "./finnhub-quote.schema";

/** Finnhub 응답을 도메인 Quote 객체로 변환 */
export function toQuote(payload: FinnhubQuoteDTO, symbol: string): Quote {
  return {
    symbol,
    currentPrice: payload.c,
    changeAmount: payload.d,
    changePercentage: payload.dp,
    highPrice: payload.h,
    lowPrice: payload.l,
    openPrice: payload.o,
    closePrice: payload.pc,
  };
}
