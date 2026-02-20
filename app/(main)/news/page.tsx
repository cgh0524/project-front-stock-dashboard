import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";

import { getNews, NEWS_CATEGORY, newsQueryKeys } from "@/entities/news";
import { NewsSection } from "@/widgets/news";

export const metadata: Metadata = {
  title: "Market News",
  description: "Explore category-based market news with infinite scrolling.",
};

export default async function NewsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: newsQueryKeys.feed({ category: NEWS_CATEGORY.GENERAL }),
    queryFn: ({ pageParam }) => getNews({ category: NEWS_CATEGORY.GENERAL, minId: pageParam }),
    initialPageParam: 0,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NewsSection />
      </HydrationBoundary>
    </div>
  );
}
