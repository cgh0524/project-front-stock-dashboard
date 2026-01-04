import { KeyMarketIndices } from "@/widgets/key-market-indices";
import { MarketSectorPerformance } from "@/widgets/market-sector-performance";

export default function StockDashboard() {
  return (
    <div className="flex flex-col gap-12">
      <KeyMarketIndices />
      <MarketSectorPerformance />
    </div>
  );
}
