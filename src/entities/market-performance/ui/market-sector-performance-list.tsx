import type { MarketSectorPerformance } from "../model";
import { MarketSectorPerformanceItem } from "./market-sector-performance-item";

export type MarketSectorPerformanceListProps = {
  data: MarketSectorPerformance[];
};

export function MarketSectorPerformanceList({
  data,
}: MarketSectorPerformanceListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {data.map((performance) => (
        <MarketSectorPerformanceItem
          key={performance.sector}
          data={performance}
        />
      ))}
    </div>
  );
}
