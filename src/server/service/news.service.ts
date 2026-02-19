import type { NewsItem, NewsQuery } from "@/entities/news";
import { type NewsProvider, newsProvider } from "@/server/provider/news";
import type { ApiSuccess } from "@/shared/api/api-success";

import type { ApiError } from "../errors/api-error";
import { normalizeError } from "../http/error-response";
import { normalizeSuccess } from "../http/success-response";

class NewsService {
  constructor(private readonly provider: NewsProvider) {}

  async getNews(query: NewsQuery): Promise<ApiSuccess<NewsItem[]> | ApiError> {
    try {
      const result = await this.provider.getNews(query);
      return normalizeSuccess(this.provider.name, result);
    } catch (error) {
      return normalizeError(error, this.provider.name);
    }
  }
}

export const newsService = new NewsService(newsProvider);
