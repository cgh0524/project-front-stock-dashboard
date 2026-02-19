import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { quoteQueryKeys } from "@/entities/quote";
import { recommendationTrendQueryKeys } from "@/entities/recommendation-trend";
import { stockMetricQueryKeys } from "@/entities/stock-metric";
import { quoteService } from "@/server/service/quote.service";
import { recommendationTrendService } from "@/server/service/recommendation-trend.service";
import { stockMetricService } from "@/server/service/stock-metric.service";
import { RecommendationTrendSection } from "@/widgets/stock-dashboard-symbol/recommendation-trend";
import { StockChartWidget } from "@/widgets/stock-dashboard-symbol/stock-chart";
import { StockMetricSection } from "@/widgets/stock-dashboard-symbol/stock-metric";
import { SymbolQuoteSection } from "@/widgets/stock-dashboard-symbol/symbol-quote";

const getQuote = async (symbol: string) => {
  const result = await quoteService.getQuote(symbol);

  if (result.ok) {
    return result.data;
  }

  throw new Error(result.message);
};

const getStockMetric = async (symbol: string) => {
  const result = await stockMetricService.getStockMetric(symbol);

  if (result.ok) {
    return result.data;
  }

  throw new Error(result.message);
};

const getRecommendationTrends = async (symbol: string) => {
  const result = await recommendationTrendService.getRecommendationTrends(symbol);

  if (result.ok) {
    return result.data;
  }

  throw new Error(result.message);
};

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
      staleTime: 1000 * 60 * 5,
    }),
    queryClient.prefetchQuery({
      queryKey: stockMetricQueryKeys.detail({ symbol }),
      queryFn: () => getStockMetric(symbol),
      staleTime: 1000 * 60 * 10,
    }),
    queryClient.prefetchQuery({
      queryKey: recommendationTrendQueryKeys.detail({ symbol }),
      queryFn: () => getRecommendationTrends(symbol),
      staleTime: 1000 * 60 * 20,
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
