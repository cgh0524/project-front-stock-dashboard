import type { ApiSuccess } from "@/shared/api/api-success";
import { axiosClient } from "@/shared/api/axios";

import type { RecommendationTrend } from "../types";

export const getRecommendationTrends = async (
  symbol: string
): Promise<RecommendationTrend[]> => {
  const { data } = await axiosClient.get<ApiSuccess<RecommendationTrend[]>>(
    `/api/recommendation-trend?symbol=${symbol}`
  );

  return data.data;
};
