"server-only";

import { marketPerformanceService } from "@/server/service/market-performance.service";
import { quoteService } from "@/server/service/quote.service";

import {
  KeyMarketIndiceFallbackItem,
  KeyMarketIndiceItem,
} from "./key-market-indice-item";

/** 나스닥, S&P500, DOW&JONES, 금 추종 ETFs */
const KEY_MARKET_INDICES = ["QQQ", "SPY", "DIA", "GLD"];

const getKeyMarketIndices = async () => {
  const results = await Promise.allSettled(
    KEY_MARKET_INDICES.map((symbol) => quoteService.getQuote(symbol))
  );

  return results.map((result) => {
    if (result.status === "fulfilled") {
      return result.value.ok
        ? {
            data: result.value.data,
          }
        : {
            errorMessage: result.value.message,
          };
    }

    return {
      errorMessage: result.reason.toString(),
    };
  });
};

export async function KeyMarketIndices() {
  const results = await getKeyMarketIndices();

  return (
    <div className="flex flex-col gap-2 w-full">
      <h2 className="text-2xl font-bold">Key Market Indices</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {results.map((result, index) => {
          if (result.data) {
            return <KeyMarketIndiceItem key={index} data={result.data} />;
          }

          return (
            <KeyMarketIndiceFallbackItem
              key={index}
              message={result.errorMessage}
            />
          );
        })}
      </div>
    </div>
  );
}
