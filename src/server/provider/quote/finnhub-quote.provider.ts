import type { Quote } from "@/entities/quote";
import { ERROR_SOURCE } from "@/server/errors/base-error";
import { fetcher } from "@/server/http/http-client";
import { parseOrFail } from "@/server/validation/zod-validate";

import type { ApiProviderConfig } from "../provider.config";
import { API_PROVIDER, getApiProviderConfig } from "../provider.config";
import { toQuote } from "./finnhub-quote.adapter";
import { finnhubQuoteSchema } from "./finnhub-quote.schema";
import type { QuoteProvider } from "./quote.provider";

export class FinnhubQuoteProvider implements QuoteProvider {
  private readonly provider = API_PROVIDER.FINNHUB;
  private readonly apiConfig: ApiProviderConfig = getApiProviderConfig(
    this.provider
  );

  async getQuote(symbol: string): Promise<Quote> {
    const url = `${
      this.apiConfig.baseUrl
    }/quote?symbol=${symbol.toUpperCase()}`;
    const data = await fetcher(url, {
      provider: this.provider,
    });

    const dto = parseOrFail(finnhubQuoteSchema, data, {
      source: ERROR_SOURCE.UPSTREAM,
      context: {
        provider: this.provider,
        url,
      },
    });

    return toQuote(dto);
  }
}
