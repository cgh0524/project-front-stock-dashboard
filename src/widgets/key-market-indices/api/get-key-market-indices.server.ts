"server-only";

import { KEY_MARKET_INDICES, type KeyMarketIndiceResult } from "@/entities/quote";
import { quoteService } from "@/server/service/quote.service";

/** (Server-side) 나스닥, S&P500, DOW&JONES, 금 추종 ETFs 조회 */
export const getKeyMarketIndices = async (): Promise<
  KeyMarketIndiceResult[]
> => {
  const results = await Promise.allSettled(
    KEY_MARKET_INDICES.map((symbol) => quoteService.getQuote(symbol))
  );

  return results.map((result) => {
    if (result.status === "fulfilled") {
      return result.value.ok
        ? {
            data: result.value.data,
          }
        : {
            errorMessage: result.value.message,
          };
    }

    return {
      errorMessage: result.reason instanceof Error
        ? result.reason.message
        : String(result.reason),
    };
  });
};
