import { useQuery } from "@tanstack/react-query";

import { getRecommendationTrends } from "../api";
import { recommendationTrendQueryKeys } from "../constants";

export const useRecommendationTrendsQuery = ({
  symbol,
}: {
  symbol: string;
}) => {
  return useQuery({
    queryKey: recommendationTrendQueryKeys.detail({ symbol }),
    queryFn: () => getRecommendationTrends(symbol),
    staleTime: 1000 * 60 * 10,
  });
};
