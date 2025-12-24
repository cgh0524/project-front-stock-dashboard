import type { ApiProvider } from "@/shared/api/provider";

export type ApiSuccess<T> = {
  ok: true;
  data: T;
  provider: ApiProvider;
  requestId: string;
  timestamp: string;
};
