import type { ApiSuccess } from "@/shared/api/api-success";
import { axiosClient } from "@/shared/api/axios";

import type { NewsItem, NewsQuery } from "../types";

export const getNews = async ({
  category,
  minId = 0,
}: NewsQuery): Promise<NewsItem[]> => {
  const searchParams = new URLSearchParams({
    category,
    minId: String(minId),
  });

  const { data } = await axiosClient.get<ApiSuccess<NewsItem[]>>(
    `/api/news?${searchParams.toString()}`
  );

  return data.data;
};
