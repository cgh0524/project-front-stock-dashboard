import { useQuery } from "@tanstack/react-query";

import type { Quote } from "../model";
import { getQuote } from "./get-quote";

export const useGetQuote = ({
  query,
  staleTime,
}: {
  query: string;
  staleTime: number;
}) => {
  return useQuery<Quote, Error>({
    queryKey: ["quote", query],
    queryFn: () => getQuote(query),
    staleTime,
  });
};
