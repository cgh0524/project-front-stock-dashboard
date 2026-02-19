import type { NewsItem, NewsQuery } from "@/entities/news";

import type { ApiProvider } from "../provider.config";
import { FinnhubNewsProvider } from "./finnhub-news.provider";

export interface NewsProvider {
  readonly name: ApiProvider;
  getNews(query: NewsQuery): Promise<NewsItem[]>;
}

export const newsProvider = new FinnhubNewsProvider();
