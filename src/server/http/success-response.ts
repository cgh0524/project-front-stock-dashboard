import { NextResponse } from "next/server";

import { type ApiProvider } from "@/server/provider/provider.config";
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
export function ok<T>(result: ApiSuccess<T>): NextResponse<ApiSuccess<T>> {
  return NextResponse.json(result, { status: 200 });
}
