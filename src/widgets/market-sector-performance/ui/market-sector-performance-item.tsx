import type { MarketSectorPerformance } from "@/entities/market-performance";
import { Item } from "@/shared/ui/layout";

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
    <Item>
      <span className="text-base font-bold">{data.sector}</span>
      <span className={`text-sm font-bold ${textColorStyles}`}>
        {data.averageChange.toFixed(2)}%
      </span>
    </Item>
  );
}
