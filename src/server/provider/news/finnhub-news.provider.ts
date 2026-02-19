import type { NewsItem, NewsQuery } from "@/entities/news";
import { ERROR_SOURCE } from "@/server/errors/base-error";
import { fetcher } from "@/server/http/http-client";
import { parseOrFail } from "@/server/validation/zod-validate";

import type { ApiProviderConfig } from "../provider.config";
import { API_PROVIDER, getApiProviderConfig } from "../provider.config";
import { toQueryString } from "../query-string";
import { toNewsItems } from "./finnhub-news.adapter";
import { finnhubNewsSchema } from "./finnhub-news.schema";
import type { NewsProvider } from "./news.provider";

export class FinnhubNewsProvider implements NewsProvider {
  readonly name = API_PROVIDER.FINNHUB;
  private readonly apiConfig: ApiProviderConfig = getApiProviderConfig(
    this.name
  );

  async getNews(query: NewsQuery): Promise<NewsItem[]> {
    const queryString = toQueryString({
      category: query.category,
      minId: query.minId ?? 0,
    });
    const url = `${this.apiConfig.baseUrl}/news${queryString}`;

    const data = await fetcher(url, {
      provider: this.name,
      next: {
        revalidate: 1000 * 60 * 5,
        tags: [`news:${query.category}`, "news"],
      },
    });

    const dto = parseOrFail(finnhubNewsSchema, data, {
      source: ERROR_SOURCE.UPSTREAM,
      context: {
        provider: this.name,
        url,
      },
    });

    return toNewsItems(dto);
  }
}
