"use client";

import {
  KeyMarketIndiceItem,
  useKeyMarketIndicesQuery,
} from "@/entities/quote";
import { EmptyContent, ErrorMessage, LoadingSpinner } from "@/shared/components/fallback";
import { Section, Tile } from "@/shared/components/layout";

export function KeyMarketIndices() {
  const { data, isLoading, error, refetch } =
    useKeyMarketIndicesQuery();

  const items = data?.map((result, index) =>
    result.data ? (
      <KeyMarketIndiceItem key={result.data.symbol} data={result.data} />
    ) : (
      <Tile
        key={`key-market-indice-${index}`}
        className="flex flex-col justify-between gap-2 min-w-12 min-h-[100px] p-4 border border-border-default"
      >
        {result.errorMessage ?? "데이터를 불러오지 못했습니다."}
      </Tile>
    )
  ) ?? [];

  return (
    <Section title="Key Market Indices">
      {isLoading && (
        <div className="flex items-center justify-center w-full min-h-[120px] py-6 bg-surface-default rounded-lg">
          <LoadingSpinner message="Loading key market indices..." />
        </div>
      )}

      {error && (
        <div className="w-full min-h-[120px] py-6 bg-surface-default rounded-lg">
          <ErrorMessage message={error.message} retry={refetch} />
        </div>
      )}

      {!isLoading && !error && items.length === 0 && (
        <div className="flex items-center justify-center w-full min-h-[120px] py-6 bg-surface-default rounded-lg">
          <EmptyContent message="No key market indices found." size="lg" />
        </div>
      )}

      {!isLoading && !error && items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {items}
        </div>
      )}
    </Section>
  );
}
