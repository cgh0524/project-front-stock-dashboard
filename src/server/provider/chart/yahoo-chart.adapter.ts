import dayjs from "dayjs";

import type { ChartQuery, ChartResult, OHLCV } from "@/entities/chart";
import { ERROR_SOURCE } from "@/server/errors/base-error";
import { ValidationError } from "@/server/errors/validation-error";

import type { YahooChartDTO, YahooChartQuery } from "./yahoo-chart.schema";
import { yahooChartQuerySchema } from "./yahoo-chart.schema";

export function toYahooChartQuery(query: ChartQuery): YahooChartQuery {
  const parsedOptions = yahooChartQuerySchema.safeParse({
    period1: query.fromDate,
    period2: query.toDate,
    interval: query.interval,
    includePrePost: query.includePrePost,
    return: "array",
  });

  if (!parsedOptions.success) {
    throw new ValidationError("Invalid chart options", {
      source: ERROR_SOURCE.CLIENT,
    });
  }

  return {
    ...parsedOptions.data,
    period2: parsedOptions.data.period2 ?? new Date().toISOString().slice(0, 10),
  };
}

export function toChartResult(dto: YahooChartDTO): ChartResult {
  return {
    meta: {
      symbol: dto.meta.symbol,
      currency: dto.meta.currency,
      exchangeName: dto.meta.exchangeName,
      instrumentType: dto.meta.instrumentType,
      timezone: dto.meta.timezone,
      regularMarketPrice: dto.meta.regularMarketPrice,
      regularMarketTime: dayjs(dto.meta.regularMarketTime).toISOString(),
      gmtoffset: dto.meta.gmtoffset,
    },
    data: dto.quotes.map(toOhlcv),
  };
}

function toOhlcv(quote: YahooChartDTO["quotes"][number]): OHLCV {
  return {
    time: dayjs(quote.date).toISOString(),
    open: quote.open,
    high: quote.high,
    low: quote.low,
    close: quote.close,
    volume: quote.volume,
    adjclose: quote.adjclose ?? undefined,
  };
}
