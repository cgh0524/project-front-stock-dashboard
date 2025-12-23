import type { Quote } from "@/entities/quote";
import { type QuoteProvider, quoteProvider } from "@/server/provider/quote";

class QuoteService {
  constructor(private readonly provider: QuoteProvider) {}

  getQuote(symbol: string): Promise<Quote> {
    return this.provider.getQuote(symbol);
  }
}

export const quoteService = new QuoteService(quoteProvider);
