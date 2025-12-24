import type { Quote } from "@/entities/quote";

import type { ApiProvider } from "../provider.config";
import { FinnhubQuoteProvider } from "./finnhub-quote.provider";

export interface QuoteProvider {
  readonly name: ApiProvider;
  getQuote(symbol: string): Promise<Quote>;
}

export const quoteProvider = new FinnhubQuoteProvider();
