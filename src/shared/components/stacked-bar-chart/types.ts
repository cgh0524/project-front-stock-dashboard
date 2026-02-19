export type StackedBarChartSeries = {
  color: string;
  key: string;
  label: string;
  textColor?: string;
};

export type StackedBarChartItem = {
  label: string;
  values: Record<string, number>;
};

export type StackedBarChartProps = {
  className?: string;
  data: StackedBarChartItem[];
  height?: number;
  maxBarWidth?: number;
  series: StackedBarChartSeries[];
  showLegend?: boolean;
  showSegmentValue?: boolean;
  valueFormatter?: (value: number) => string;
  yTickCount?: number;
};
