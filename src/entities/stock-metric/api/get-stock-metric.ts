import type { ApiSuccess } from "@/shared/api/api-success";
import { axiosClient } from "@/shared/api/axios";

import type { StockMetricSummary } from "../types";

export const getStockMetric = async (
  symbol: string
): Promise<StockMetricSummary> => {
  const { data } = await axiosClient.get<ApiSuccess<StockMetricSummary>>(
    `/api/stock-metric?symbol=${symbol}`
  );

  return data.data;
};
