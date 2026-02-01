import type { MarketLeaderItemModel } from "@/entities/market-leader";
import { formatDollarAmount } from "@/shared/lib/utils/format-dollar-amount";

export type MarketLeaderItemProps = {
  data: MarketLeaderItemModel;
  rank: number;
};

export const MarketLeaderItem = ({ rank, data }: MarketLeaderItemProps) => {
  const isPositive = data.change > 0;
  const isNegative = data.change < 0;

  const textColorStyles = isPositive
    ? "text-positive"
    : isNegative
      ? "text-negative"
      : "text-text-primary";

  return (
    <div
      className="
        grid
        grid-cols-[15%_1fr_20%_20%]
        items-center
        p-2
        hover:bg-surface-alt
      "
    >
      {/* Rank */}
      <span className="text-base font-bold">{rank}.</span>

      {/* Symbol */}
      <span className="text-base truncate">
        <strong>[{data.symbol}]</strong> {data.name}
      </span>

      {/* Current Price */}
      <span className={`text-sm font-bold text-center ${textColorStyles}`}>
        {formatDollarAmount(Number(data.price.toFixed(2)))}
      </span>

      {/* Change Percentage */}
      <span className={`text-sm font-bold text-right ${textColorStyles}`}>
        {data.changePercentage.toFixed(2)}%
      </span>
    </div>
  );
};
