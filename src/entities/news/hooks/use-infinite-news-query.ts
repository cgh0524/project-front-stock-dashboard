import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";

import { CACHE_POLICY } from "@/shared/config/cache-policy";

import { getNews } from "../api";
import { newsQueryKeys } from "../constants";
import type { NewsCategory, NewsItem } from "../types";

const getMaxNewsId = (newsItems: NewsItem[]): number | undefined => {
  if (!newsItems.length) return undefined;
  return newsItems.reduce((maxId, item) => Math.max(maxId, item.id), 0);
};

export const useInfiniteNewsQuery = ({ category }: { category: NewsCategory }) => {
  return useInfiniteQuery<
    NewsItem[],
    Error,
    InfiniteData<NewsItem[]>,
    ReturnType<typeof newsQueryKeys.feed>,
    number
  >({
    queryKey: newsQueryKeys.feed({ category }),
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getNews({ category, minId: pageParam }),
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      const nextMinId = getMaxNewsId(lastPage);
      if (nextMinId === undefined) return undefined;
      return nextMinId > lastPageParam ? nextMinId : undefined;
    },
    staleTime: CACHE_POLICY.news.staleTimeMs,
    refetchOnWindowFocus: false,
  });
};
