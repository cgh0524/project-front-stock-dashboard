import type { StackedBarChartItem } from "../types";

type XAxisLabelsProps = {
  data: StackedBarChartItem[];
};

export function XAxisLabels({ data }: XAxisLabelsProps) {
  return (
    <div className="mt-2 flex justify-between pl-13 text-xs text-text-secondary">
      {data.map((item, index) => (
        <div key={`${item.label}-${index}`} className="flex-1 min-w-0 text-center">
          {item.label}
        </div>
      ))}
    </div>
  );
}
