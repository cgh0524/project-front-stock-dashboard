import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { QUOTE_QUERY_KEY } from "@/entities/quote/lib/use-get-quote-query";
import { quoteService } from "@/server/service/quote.service";
import { SymbolQuoteSection } from "@/widgets/symbol-quote/ui/symbol-quote-section";

const getQuote = async (symbol: string) => {
  const result = await quoteService.getQuote(symbol);

  if (result.ok) {
    return result.data;
  }

  throw new Error(result.message);
};

export default async function StockDetailPage({ params }: { params: { symbol: string } }) {
  const queryClient = new QueryClient();
  const { symbol } = params;

  await queryClient.prefetchQuery({
    queryKey: [QUOTE_QUERY_KEY, symbol],
    queryFn: () => getQuote(symbol),
    staleTime: 1000 * 60 * 2,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SymbolQuoteSection />
    </HydrationBoundary>
  );
}