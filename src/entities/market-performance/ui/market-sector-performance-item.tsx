import type { MarketSectorPerformance } from "../model";

export type MarketSectorPerformanceItemProps = {
  data: MarketSectorPerformance;
};

export function MarketSectorPerformanceItem({
  data,
}: MarketSectorPerformanceItemProps) {
  const ZERO_CHANGE_PERCENTAGE = "0.00";

  const changePercentage =
    data.averageChange?.toFixed(2) ?? ZERO_CHANGE_PERCENTAGE;
  const textColorStyles =
    changePercentage === ZERO_CHANGE_PERCENTAGE
      ? "text-text-primary"
      : changePercentage > ZERO_CHANGE_PERCENTAGE
        ? "text-positive"
        : "text-negative";
  return (
    <div className="flex flex-col justify-between gap-2 min-w-12 min-h-[100px] p-4 bg-surface-default rounded-lg border border-border-default shadow-sm">
      <span className="text-base font-bold">{data.sector}</span>
      <span className={`text-sm font-bold ${textColorStyles}`}>
        {data.averageChange.toFixed(2)}%
      </span>
    </div>
  );
}
