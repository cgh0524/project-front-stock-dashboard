import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import type { Metadata } from "next";

import { getPageMetaData, METADATA_PAGE_NAME } from "@/app";
import { quoteQueryKeys } from "@/entities/quote";
import { recommendationTrendQueryKeys } from "@/entities/recommendation-trend";
import { stockMetricQueryKeys } from "@/entities/stock-metric";
import { CACHE_POLICY } from "@/shared/config/cache-policy";
import { RecommendationTrendSection } from "@/widgets/stock-dashboard-symbol/recommendation-trend";
import { getRecommendationTrends } from "@/widgets/stock-dashboard-symbol/recommendation-trend/api";
import { StockChartWidget } from "@/widgets/stock-dashboard-symbol/stock-chart";
import { StockMetricSection } from "@/widgets/stock-dashboard-symbol/stock-metric";
import { getStockMetric } from "@/widgets/stock-dashboard-symbol/stock-metric/api";
import { SymbolQuoteSection } from "@/widgets/stock-dashboard-symbol/symbol-quote";
import { getQuote } from "@/widgets/stock-dashboard-symbol/symbol-quote/api";

// [symbol]은 동적 세그먼트라 정적 metadata 객체 대신 generateMetadata를 사용
export async function generateMetadata({
  params,
}: {
  params: Promise<{ symbol: string }>;
}): Promise<Metadata> {
  const { symbol } = await params;
  return getPageMetaData(METADATA_PAGE_NAME.STOCK_DETAIL, symbol);
}

export default async function StockDetailPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const queryClient = new QueryClient();
  const { symbol } = await params;
  const today = dayjs().format("YYYY-MM-DD");

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: quoteQueryKeys.detail({ symbol }),
      queryFn: () => getQuote(symbol),
      staleTime: CACHE_POLICY.quote.staleTimeMs,
    }),
    queryClient.prefetchQuery({
      queryKey: stockMetricQueryKeys.detail({ symbol }),
      queryFn: () => getStockMetric(symbol),
      staleTime: CACHE_POLICY.stockMetric.staleTimeMs,
    }),
    queryClient.prefetchQuery({
      queryKey: recommendationTrendQueryKeys.detail({ symbol }),
      queryFn: () => getRecommendationTrends(symbol),
      staleTime: CACHE_POLICY.recommendationTrend.staleTimeMs,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-6">
        <SymbolQuoteSection />
        <StockChartWidget today={today} />
        <StockMetricSection />
        <RecommendationTrendSection />
      </div>
    </HydrationBoundary>
  );
}
