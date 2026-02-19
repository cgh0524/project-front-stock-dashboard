"use client";

import { useRef, useState } from "react";

import {
  NewsCard,
  type NewsCategory,
  type NewsItem,
  useInfiniteNewsQuery,
} from "@/entities/news";
import {
  EmptyContent,
  ErrorMessage,
  LoadingSpinner,
} from "@/shared/components/fallback";
import { Section } from "@/shared/components/layout";
import { useInfiniteScrollObserver } from "@/shared/hooks/use-infinite-scroll-observer";

import { NewsCategoryActions } from "./news-category-actions";

const DEFAULT_CATEGORY: NewsCategory = "general";

const uniqueByNewsId = (newsItems: NewsItem[]): NewsItem[] => {
  const seen = new Set<number>();

  return newsItems.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
};

export function NewsSection() {
  const [selectedCategory, setSelectedCategory] =
    useState<NewsCategory>(DEFAULT_CATEGORY);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollRootRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
    refetch,
  } = useInfiniteNewsQuery({
    category: selectedCategory,
  });

  const flattenedItems = (data?.pages ?? []).flat();
  const newsItems = uniqueByNewsId(flattenedItems);

  const { onRootScroll } = useInfiniteScrollObserver({
    rootRef: scrollRootRef,
    targetRef: bottomRef,
    enabled: Boolean(hasNextPage) && !isFetchingNextPage,
    onIntersect: fetchNextPage,
    requireUserScroll: true,
  });

  return (
    <Section
      title="Market News"
      className="h-[calc(100dvh-90px)]"
      actions={
        <NewsCategoryActions
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      }
    >
      <div
        ref={scrollRootRef}
        className="min-h-0 flex-1 overflow-y-auto pr-1"
        onScroll={onRootScroll}
      >
        {isLoading && (
          <div className="py-8">
            <LoadingSpinner message="Loading market news..." />
          </div>
        )}

        {error && (
          <div className="py-8">
            <ErrorMessage message={error.message} retry={refetch} />
          </div>
        )}

        {!isLoading && !error && newsItems.length === 0 && (
          <div className="py-8">
            <EmptyContent message="No market news found." size="lg" />
          </div>
        )}

        {!isLoading && !error && newsItems.length > 0 && (
          <div className="flex flex-col gap-3">
            {newsItems.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        )}

        <div ref={bottomRef} className="h-8" />

        {!isLoading && isFetchingNextPage && (
          <div className="py-4">
            <LoadingSpinner message="Loading more news..." />
          </div>
        )}
      </div>
    </Section>
  );
}
