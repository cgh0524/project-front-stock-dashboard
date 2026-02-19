import type { NewsCategory, NewsItem } from "@/entities/news";
import { NEWS_CATEGORIES } from "@/entities/news";

import type { FinnhubNewsDTO } from "./finnhub-news.schema";

const FALLBACK_CATEGORY: NewsCategory = "general";

const toNewsCategory = (value: string): NewsCategory => {
  return NEWS_CATEGORIES.includes(value as NewsCategory)
    ? (value as NewsCategory)
    : FALLBACK_CATEGORY;
};

const toSafeText = (value: string | null | undefined): string => value ?? "";

export const toNewsItems = (payload: FinnhubNewsDTO): NewsItem[] => {
  return payload.map((item) => ({
    category: toNewsCategory(item.category),
    datetime: item.datetime,
    headline: item.headline,
    id: item.id,
    image: toSafeText(item.image),
    related: toSafeText(item.related),
    source: item.source,
    summary: toSafeText(item.summary),
    url: item.url,
  }));
};
