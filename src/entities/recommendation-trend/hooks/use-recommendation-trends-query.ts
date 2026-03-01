import { useQuery } from "@tanstack/react-query";

import { CACHE_POLICY } from "@/shared/config/cache-policy";

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
    staleTime: CACHE_POLICY.recommendationTrend.staleTimeMs,
  });
};
