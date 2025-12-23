import type { Quote } from "@/entities/quote";

import { FinnhubQuoteProvider } from "./finnhub-quote.provider";

export interface QuoteProvider {
  getQuote(symbol: string): Promise<Quote>;
}

export const quoteProvider = new FinnhubQuoteProvider();
