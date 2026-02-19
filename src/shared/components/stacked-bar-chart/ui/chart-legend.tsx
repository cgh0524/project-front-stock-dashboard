import type { StackedBarChartSeries } from "../types";

type ChartLegendProps = {
  series: StackedBarChartSeries[];
};

export function ChartLegend({ series }: ChartLegendProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-4 text-sm text-text-secondary">
      {series.map((item) => (
        <div key={item.key} className="inline-flex items-center gap-2">
          <span
            className="inline-block h-3 w-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
