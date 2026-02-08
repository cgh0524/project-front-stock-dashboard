import type { IChartApi, ISeriesApi, MouseEventParams } from "lightweight-charts";
import { useEffect, useRef } from "react";

import type {
  CandleStickChartProps,
  CandleStickCrosshairPayload,
  CandleStickData,
} from "../type/candle-stick-chart.types";

type CandlestickCrosshairMoveParams = {
  onCrosshairMove?: CandleStickChartProps["onCrosshairMove"];
};

export function useCandlestickCrosshairMove({
  onCrosshairMove,
}: CandlestickCrosshairMoveParams) {
  const callbackRef = useRef(onCrosshairMove);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const attach = (chart: IChartApi, series: ISeriesApi<"Candlestick">) => {
    unsubscribeRef.current?.();
    unsubscribeRef.current = null;

    const handler = (param: MouseEventParams) => {
      const callback = callbackRef.current;
      if (!callback) return;

      if (!param || !param.point) {
        callback({ point: null, data: null });
        return;
      }

      const seriesData = param.seriesData?.get(series) as CandleStickData | undefined;
      const nextPayload: CandleStickCrosshairPayload = {
        point: param.point ?? null,
        data: seriesData ?? null,
      };
      callback(nextPayload);
    };

    chart.subscribeCrosshairMove(handler);
    unsubscribeRef.current = () => {
      chart.unsubscribeCrosshairMove(handler);
    };
  };

  useEffect(() => {
    callbackRef.current = onCrosshairMove;
  }, [onCrosshairMove]);

  useEffect(() => {
    return () => {
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
    };
  }, []);

  return { attach };
}
