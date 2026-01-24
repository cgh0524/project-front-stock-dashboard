import {
  formatDollarAmount,
  formatSignedDollarAmount,
} from "@/shared/lib/utils/format-dollar-amount";
import { Tile } from "@/shared/ui/layout";

import type { Quote } from "../model";

export type SymbolQuoteProps = {
  quote: Quote;
  name: string | null;
};

export const SymbolQuote = ({ quote, name }: SymbolQuoteProps) => {
  const { symbol, changePercentage, changeAmount, currentPrice } = quote;

  const textColorStyles =
    (changePercentage === undefined || changePercentage === 0)
      ? "text-text-primary"
      : changePercentage > 0
        ? "text-positive"
        : "text-negative";

  const changePercentageStyles =
    (changePercentage === undefined || changePercentage === 0)
      ? "text-text-secondary"
      : changePercentage > 0
        ? "text-positive"
        : "text-negative";

  return (
    <Tile className="flex items-center justify-between py-4 px-6">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">{symbol}</span>
          {name && <span className="text-md text-text-secondary">{name}</span>}
        </div>

        <span className={`text-sm ${changePercentageStyles}`}>
          {changePercentage?.toFixed(2)}%
        </span>
      </div>

      <div className="flex flex-col">
        <span className={`text-xl font-bold ${textColorStyles}`}>
          {formatDollarAmount(Number(currentPrice.toFixed(2)))}
        </span>
        {changeAmount !== undefined && (
          <span className={`text-sm font-bold ${textColorStyles}`}>
            ({formatSignedDollarAmount(Number(changeAmount.toFixed(2)))})
          </span>
        )}
      </div>
    </Tile>
  );
};
