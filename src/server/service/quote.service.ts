import type { Quote } from "@/entities/quote";
import { type QuoteProvider, quoteProvider } from "@/server/provider/quote";
import type { ApiSuccess } from "@/shared/api/api-success";

import type { ApiError } from "../errors/api-error";
import { normalizeError } from "../http/error-response";
import { normalizeSuccess } from "../http/success-response";

class QuoteService {
  constructor(private readonly provider: QuoteProvider) {}

  async getQuote(symbol: string): Promise<ApiSuccess<Quote> | ApiError> {
    try {
      const result = await this.provider.getQuote(symbol);
      return normalizeSuccess(this.provider.name, result);
    } catch (error) {
      return normalizeError(error, this.provider.name);
    }
  }
}

export const quoteService = new QuoteService(quoteProvider);
