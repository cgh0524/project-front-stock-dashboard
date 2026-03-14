import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getPageMetaData, METADATA_PAGE_NAME } from "@/app";
import { NEWS_CATEGORY, newsQueryKeys } from "@/entities/news";
import { CACHE_POLICY } from "@/shared/config/cache-policy";
import { NewsSection } from "@/widgets/news";
import { getNews } from "@/widgets/news/api";

export const metadata = getPageMetaData(METADATA_PAGE_NAME.MARKET_NEWS);

export default async function NewsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: newsQueryKeys.feed({ category: NEWS_CATEGORY.GENERAL }),
    queryFn: ({ pageParam }) => getNews({ category: NEWS_CATEGORY.GENERAL, minId: pageParam }),
    initialPageParam: 0,
    staleTime: CACHE_POLICY.news.staleTimeMs,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NewsSection />
      </HydrationBoundary>
    </div>
  );
}
