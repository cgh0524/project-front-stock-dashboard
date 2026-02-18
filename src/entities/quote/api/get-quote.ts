import type { ApiSuccess } from "@/shared/api/api-success";
import { axiosClient } from "@/shared/api/axios";

import type { Quote } from "../types";

export const getQuote = async (symbol: string): Promise<Quote> => {
  const { data } = await axiosClient.get<ApiSuccess<Quote>>(
    `/api/quote?symbol=${symbol}`
  );

  return data.data;
};
