import { useQueries } from "@tanstack/react-query";

import type { Quote } from "../model";
import { getQuote } from "./get-quote";

export const useGetQuotes = ({
  queries,
  staleTime,
}: {
  queries: string[];
  staleTime: number;
}) => {
  return useQueries<Quote[]>({
    queries: queries.map((query) => ({
      queryKey: ["quote", query],
      queryFn: () => getQuote(query),
      staleTime,
    })),
  });
};
