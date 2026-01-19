import type { Quote } from "../model";
import { getQuote } from "./get-quote";
import { KEY_MARKET_INDICES } from "./key-market-indices";

export type KeyMarketIndiceResult = {
  data?: Quote;
  errorMessage?: string;
};

export const getKeyMarketIndices = async (): Promise<
  KeyMarketIndiceResult[]
> => {
  const results = await Promise.allSettled(
    KEY_MARKET_INDICES.map((symbol) => getQuote(symbol))
  );

  return results.map((result) => {
    if (result.status === "fulfilled") {
      return { data: result.value };
    }

    return {
      errorMessage: result.reason instanceof Error
        ? result.reason.message
        : String(result.reason),
    };
  });
};
