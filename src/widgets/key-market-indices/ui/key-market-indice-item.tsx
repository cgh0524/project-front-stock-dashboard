import type { Quote } from "@/entities/quote";
import { Item } from "@/shared/ui/layout";

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
    <Item>
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
    </Item>
  );
}

export type KeyMarketIndiceFallbackItemProps = { message?: string };

export function KeyMarketIndiceFallbackItem({
  message = "데이터를 불러오지 못했습니다.",
}: KeyMarketIndiceFallbackItemProps) {
  return <Item>{message}</Item>;
}
