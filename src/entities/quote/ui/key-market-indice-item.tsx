import Link from "next/link";

import { Tile } from "@/shared/components/layout";
import { formatCurrency, formatPercent } from "@/shared/utils/format-number";

import type { Quote } from "../types";

export type KeyMarketIndiceItemProps = { data: Quote };

export function KeyMarketIndiceItem({ data }: KeyMarketIndiceItemProps) {
  const changePercentage = data.changePercentage ?? 0;
  const textColorStyles =
    changePercentage === 0
      ? "text-text-primary"
      : changePercentage > 0
        ? "text-positive"
        : "text-negative";

  return (
    <Link
      href={`/stock-dashboard/${data.symbol}`}
      title={data.symbol}
      aria-label={`View details for ${data.symbol}`}
    >
      <Tile className="flex flex-col justify-between gap-2 min-w-12 min-h-[100px] p-4 border border-border-default">
        <span className="text-xl font-bold">{data.symbol}</span>
        <span className={`text-lg font-bold ${textColorStyles}`}>
          {formatCurrency(data.currentPrice)}
        </span>
        <span className={textColorStyles}>
          {formatPercent(changePercentage, { showSign: true })}
        </span>
      </Tile>
    </Link>
  );
}
