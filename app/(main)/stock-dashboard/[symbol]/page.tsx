import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ symbol: string }>;
}): Promise<Metadata> {
  const { symbol } = await params;
  const normalizedSymbol = symbol.toUpperCase();

  return {
    title: `${normalizedSymbol} Stock Detail`,
    description: `Price, chart, financial metrics, and analyst recommendation trends for ${normalizedSymbol}.`,
  };
}

export default async function StockDetailPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const queryClient = new QueryClient();
  const { symbol } = await params;

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
        <StockChartWidget />
        <StockMetricSection />
        <RecommendationTrendSection />
      </div>
    </HydrationBoundary>
  );
}
