"use client";

import { useParams, useSearchParams } from "next/navigation";

import { SymbolQuote, useGetQuoteQuery } from "@/entities/quote";
import { ErrorMessage, LoadingSpinner } from "@/shared/ui/fallback";



export const SymbolQuoteSection = () => {
  const { symbol } = useParams();
  const name = useSearchParams().get("name");

  const { data, isLoading, error, refetch } = useGetQuoteQuery({ symbol: symbol as string });

  if (isLoading) return <div className="w-full py-6 px4"><LoadingSpinner message="Loading stock quote..." /></div>;
  if (error) return <div className="w-full py-6 px4"><ErrorMessage message={error.message} retry={refetch} /></div>;
  if (!data) return <div className="w-full py-6 px4"><ErrorMessage message="Quote not found" retry={refetch} /></div>;

  return <SymbolQuote quote={data} name={name} />;
};