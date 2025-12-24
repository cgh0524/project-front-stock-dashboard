import { NextResponse } from "next/server";

import {
  API_PROVIDER,
  type ApiProvider,
} from "@/server/provider/provider.config";
import type { ApiSuccess } from "@/shared/api/api-success";

export const normalizeSuccess = <T>(
  provider: ApiProvider,
  data: T,
  requestId = crypto.randomUUID()
): ApiSuccess<T> => ({
  ok: true,
  provider,
  data,
  requestId,
  timestamp: new Date().toISOString(),
});

/** NextResponse.json 래퍼 */
export function ok<T>(
  data: T,
  provider: ApiProvider = API_PROVIDER.NONE
): NextResponse<ApiSuccess<T>> {
  return NextResponse.json(normalizeSuccess(provider, data), { status: 200 });
}
