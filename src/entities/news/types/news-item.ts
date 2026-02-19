// export const NEWS_CATEGORIES = ["general", "forex", "crypto", "merger"] as const;
export const NEWS_CATEGORY = {
  GENERAL: "general",
  FOREX: "forex",
  CRYPTO: "crypto",
  MERGER: "merger",
} as const;

export type NewsCategory = (typeof NEWS_CATEGORY)[keyof typeof NEWS_CATEGORY];

export const NEWS_CATEGORIES = [NEWS_CATEGORY.GENERAL, NEWS_CATEGORY.FOREX, NEWS_CATEGORY.CRYPTO, NEWS_CATEGORY.MERGER] as const;

export type NewsItem = {
  category: NewsCategory;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
};

export type NewsQuery = {
  category: NewsCategory;
  minId?: number;
};
