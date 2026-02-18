import { KEY_MARKET_INDICES } from "../constants/key-market-indices";
import type { Quote } from "../types";
import { getQuote } from "./get-quote";

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
