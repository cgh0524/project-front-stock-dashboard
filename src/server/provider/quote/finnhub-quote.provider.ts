import type { Quote } from "@/entities/quote";
import { ERROR_SOURCE } from "@/server/errors/base-error";
import { fetcher } from "@/server/http/http-client";
import { parseOrFail } from "@/server/validation/zod-validate";
import { CACHE_POLICY } from "@/shared/config/cache-policy";

import type { ApiProviderConfig } from "../provider.config";
import { API_PROVIDER, getApiProviderConfig } from "../provider.config";
import { toQuote } from "./finnhub-quote.adapter";
import { finnhubQuoteSchema } from "./finnhub-quote.schema";
import type { QuoteProvider } from "./quote.provider";

export class FinnhubQuoteProvider implements QuoteProvider {
  readonly name = API_PROVIDER.FINNHUB;
  private readonly apiConfig: ApiProviderConfig = getApiProviderConfig(
    this.name
  );

  async getQuote(symbol: string): Promise<Quote> {
    const symbolUpperCased = symbol.toUpperCase();
    const url = `${this.apiConfig.baseUrl}/quote?symbol=${symbolUpperCased}`;
    const data = await fetcher(url, {
      provider: this.name,
      next: {
        revalidate: CACHE_POLICY.quote.revalidateSeconds,
        tags: [symbolUpperCased, "quotes"],
      },
    });

    const dto = parseOrFail(finnhubQuoteSchema, data, {
      source: ERROR_SOURCE.UPSTREAM,
      context: {
        provider: this.name,
        url,
      },
    });

    return toQuote(dto, symbolUpperCased);
  }
}
