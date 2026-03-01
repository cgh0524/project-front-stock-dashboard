"server-only";

import type { Quote } from "@/entities/quote";
import { quoteService } from "@/server/service/quote.service";

export const getQuote = async (symbol: string): Promise<Quote> => {
  const result = await quoteService.getQuote(symbol);

  if (result.ok) {
    return result.data;
  }

  throw new Error(result.message);
};
