import { axiosClient } from "@/shared/api/axios";
import type { BffSuccess } from "@/shared/api/bff-success";

import type { Quote } from "../model";

export const getQuote = async (symbol: string): Promise<Quote> => {
  const { data } = await axiosClient.get<BffSuccess<Quote>>(
    `/api/quote?symbol=${symbol}`
  );

  return data.data;
};
