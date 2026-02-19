import {  useRef, useState } from "react";

import type {
  CandleStickCrosshairPayload,
  ChartTooltipItem,
} from "@/shared/components/lightweight-chart";
import { formatFixed } from "@/shared/utils/format-number";

export type CandleStickTooltipState = {
  open: boolean;
  x: number;
  y: number;
  items: ChartTooltipItem[];
};

export function useCandlestickTooltip() {
  const [state, setState] = useState<CandleStickTooltipState>({
    open: false,
    x: 0,
    y: 0,
    items: [],
  });
  const lastRef = useRef<CandleStickTooltipState | null>(null);

  const onCrosshairMove = (payload: CandleStickCrosshairPayload) => {
    if (!payload.point || !payload.data) {
      const prev = lastRef.current;
      if (prev?.open === false) return;
      const next = { open: false, x: 0, y: 0, items: [] };
      lastRef.current = next;
      setState(next);
      return;
    }

    const { open, high, low, close } = payload.data;
    const items: ChartTooltipItem[] = [
      { label: "Opened", value: formatFixed(open) },
      { label: "High", value: formatFixed(high) },
      { label: "Low", value: formatFixed(low) },
      { label: "Closed", value: formatFixed(close) },
    ];

    const next = {
      open: true,
      x: payload.point.x,
      y: payload.point.y,
      items,
    };

    const prev = lastRef.current;
    const isSame =
      prev?.open === next.open &&
      prev?.x === next.x &&
      prev?.y === next.y &&
      prev?.items?.length === next.items.length &&
      prev?.items?.every(
        (item, index) =>
          item.label === next.items[index].label &&
          item.value === next.items[index].value
      );

    if (isSame) return;

    lastRef.current = next;
    setState(next);
  }

  return { tooltipState: state, onCrosshairMove };
}
