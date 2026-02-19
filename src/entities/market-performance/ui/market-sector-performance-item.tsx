import { Tile } from "@/shared/components/layout";
import { formatPercent } from "@/shared/utils/format-number";

import type { MarketSectorPerformance } from "../types";

export type MarketSectorPerformanceItemProps = {
  data: MarketSectorPerformance;
};

export function MarketSectorPerformanceItem({
  data,
}: MarketSectorPerformanceItemProps) {
  const changePercentage = data.averageChange ?? 0;
  const textColorStyles =
    changePercentage === 0
      ? "text-text-primary"
      : changePercentage > 0
        ? "text-positive"
        : "text-negative";
  return (
    <Tile className="flex flex-col justify-between gap-2 min-w-12 min-h-[100px] p-4 border border-border-default">
      <span className="text-base font-bold">{data.sector}</span>
      <span className={`text-sm font-bold ${textColorStyles}`}>
        {formatPercent(changePercentage, { showSign: true })}
      </span>
    </Tile>
  );
}
