import type { NewsCategory } from "../types";

export type NewsFeedKeyParams = {
  category: NewsCategory;
};

export const newsQueryKeys = {
  feed: ({ category }: NewsFeedKeyParams) => ["news", category] as const,
} as const;
