import {
  HistogramSeries,
  type HistogramSeriesOptions,
  type IChartApi,
  type ISeriesApi,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

import type { VolumeData } from "../type/candle-stick-chart.types";

export type UseVolumeSeriesParams = {
  volume?: VolumeData[];
  volumeSeriesOptions?: Partial<HistogramSeriesOptions>;
};

const DEFAULT_VOLUME_SERIES_OPTIONS: Partial<HistogramSeriesOptions> = {
  priceScaleId: "volume",
};

const DEFAULT_VOLUME_SCALE_OPTIONS = {
  scaleMargins: { top: 0.8, bottom: 0 },
  borderVisible: false,
  ticksVisible: false,
};

const DEFAULT_RIGHT_PRICE_SCALE = {
  scaleMargins: { top: 0.1, bottom: 0.3 },
};

export function useVolumeSeries({
  volume,
  volumeSeriesOptions,
}: UseVolumeSeriesParams) {
  const seriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  const attach = (chart: IChartApi) => {
    chart.priceScale("right").applyOptions(DEFAULT_RIGHT_PRICE_SCALE);

    if (!volume) return;

    seriesRef.current = chart.addSeries(HistogramSeries, {
      ...DEFAULT_VOLUME_SERIES_OPTIONS,
      ...(volumeSeriesOptions ?? {}),
    });
    seriesRef.current.setData(volume);
    chart.priceScale("volume").applyOptions(DEFAULT_VOLUME_SCALE_OPTIONS);
  };

  useEffect(() => {
    if (!seriesRef.current || !volume) return;
    seriesRef.current.setData(volume);
  }, [volume]);

  useEffect(() => {
    if (!seriesRef.current || !volumeSeriesOptions) return;
    seriesRef.current.applyOptions({
      ...DEFAULT_VOLUME_SERIES_OPTIONS,
      ...volumeSeriesOptions,
    });
  }, [volumeSeriesOptions]);

  useEffect(() => {
    return () => {
      seriesRef.current = null;
    };
  }, []);

  return { attach };
}
