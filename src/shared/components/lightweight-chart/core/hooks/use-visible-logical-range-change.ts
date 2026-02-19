import type { IChartApi, LogicalRange } from "lightweight-charts";
import { useEffect, useRef } from "react";

type VisibleLogicalRangeChangeParams = {
  onVisibleRangeChange?: (range: LogicalRange | null) => void;
};

export function useVisibleLogicalRangeChange({
  onVisibleRangeChange,
}: VisibleLogicalRangeChangeParams) {
  const callbackRef = useRef(onVisibleRangeChange);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    callbackRef.current = onVisibleRangeChange;
  }, [onVisibleRangeChange]);

  const attach = (chart: IChartApi) => {
    unsubscribeRef.current?.();
    unsubscribeRef.current = null;

    const handler = (range: LogicalRange | null) => {
      callbackRef.current?.(range);
    };

    const timeScale = chart.timeScale();
    timeScale.subscribeVisibleLogicalRangeChange(handler);
    unsubscribeRef.current = () => {
      timeScale.unsubscribeVisibleLogicalRangeChange(handler);
    };
  };

  useEffect(() => {
    return () => {
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
    };
  }, []);

  return { attach };
}
