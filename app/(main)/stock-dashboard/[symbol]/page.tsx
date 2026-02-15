import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { quoteQueryKeys } from "@/entities/quote";
import { quoteService } from "@/server/service/quote.service";
import { StockChartWidget } from "@/widgets/stock-chart";
import { SymbolQuoteSection } from "@/widgets/symbol-quote";

const getQuote = async (symbol: string) => {
  const result = await quoteService.getQuote(symbol);

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

  await queryClient.prefetchQuery({
    queryKey: quoteQueryKeys.detail({ symbol }),
    queryFn: () => getQuote(symbol),
    staleTime: 1000 * 60 * 2,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-6">
        <SymbolQuoteSection />
        <StockChartWidget />
      </div>
    </HydrationBoundary>
  );
}
