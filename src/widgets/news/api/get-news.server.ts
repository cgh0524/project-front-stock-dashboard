"server-only";

import type { NewsItem, NewsQuery } from "@/entities/news";
import { newsService } from "@/server/service/news.service";

export const getNews = async (query: NewsQuery): Promise<NewsItem[]> => {
  const result = await newsService.getNews(query);

  if (result.ok) {
    return result.data;
  }

  throw new Error(result.message);
};
