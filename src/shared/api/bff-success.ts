import type { ApiProvider } from "@/shared/api/provider";

export type BffSuccess<T> = {
  ok: true;
  data: T;
  provider: ApiProvider;
  requestId: string;
  timestamp: string;
};
