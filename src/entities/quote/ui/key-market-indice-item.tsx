import type { Quote } from "../model";

export type KeyMarketIndiceItemProps = { data: Quote };

export function KeyMarketIndiceItem({ data }: KeyMarketIndiceItemProps) {
  const ZERO_CHANGE_PERCENTAGE = "0.00";

  const changePercentage =
    data.changePercentage?.toFixed(2) ?? ZERO_CHANGE_PERCENTAGE;
  const textColorStyles =
    changePercentage === ZERO_CHANGE_PERCENTAGE
      ? "text-text-primary"
      : changePercentage > ZERO_CHANGE_PERCENTAGE
      ? "text-positive"
      : "text-negative";

  return (
    <div className="flex flex-col justify-between gap-2 min-w-12 min-h-[100px] p-4 bg-surface-default rounded-lg border border-border-default shadow-sm">
      <span className="text-xl font-bold">{data.symbol}</span>
      <span className={`text-lg font-bold ${textColorStyles}`}>
        {data.currentPrice.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </span>
      <span className={textColorStyles}>
        {data.changePercentage?.toFixed(2)}%
      </span>
    </div>
  );
}
