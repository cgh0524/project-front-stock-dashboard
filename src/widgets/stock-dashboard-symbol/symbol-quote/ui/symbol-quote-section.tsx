"use client";

import { useParams } from "next/navigation";

import { SymbolQuote, useQuoteQuery } from "@/entities/quote";
import { useSearchSymbolsQuery } from "@/entities/symbol";
import { ErrorMessage, LoadingSpinner } from "@/shared/components/fallback";

export const SymbolQuoteSection = () => {
  const { symbol } = useParams();
  const normalizedSymbol = String(symbol ?? "");

  const {
    data: quote,
    isLoading,
    error,
    refetch,
  } = useQuoteQuery({ symbol: normalizedSymbol });

  const { data: symbols } = useSearchSymbolsQuery({
    query: normalizedSymbol,
    enabled: Boolean(normalizedSymbol),
  });

  const matchedSymbol = symbols?.find(
    (item) =>
      item.symbol.toUpperCase() === normalizedSymbol.toUpperCase() ||
      item.displaySymbol.toUpperCase() === normalizedSymbol.toUpperCase()
  );
  const name = matchedSymbol?.description ?? null;

  if (isLoading) {
    return (
      <div className="w-full py-6 px-4">
        <LoadingSpinner message="Loading stock quote..." />
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full py-6 px-4">
        <ErrorMessage message={error.message} retry={refetch} />
      </div>
    );
  }
  if (!quote) {
    return (
      <div className="w-full py-6 px-4">
        <ErrorMessage message="Quote not found" retry={refetch} />
      </div>
    );
  }

  return <SymbolQuote quote={quote} name={name} />;
};
