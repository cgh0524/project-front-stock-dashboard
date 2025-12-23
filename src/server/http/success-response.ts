import { NextResponse } from "next/server";

import {
  API_PROVIDER,
  type ApiProvider,
} from "@/server/provider/provider.config";
import type { BffSuccess } from "@/shared/api/bff-success";

export const toBffSuccess = <T>(
  provider: ApiProvider,
  data: T,
  requestId = crypto.randomUUID()
): BffSuccess<T> => ({
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
): NextResponse<BffSuccess<T>> {
  return NextResponse.json(toBffSuccess(provider, data), { status: 200 });
}
