import { fail } from "@/server/http/error-response";
import { ok } from "@/server/http/success-response";
import { marketLeaderService } from "@/server/service/market-leader.service";

export async function GET() {
  const result = await marketLeaderService.getMostActives();

  if (result.ok) return ok(result);
  return fail(result);
}
