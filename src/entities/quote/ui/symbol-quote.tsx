import { Tile } from "@/shared/components/layout";
import {
  formatCurrency,
  formatPercent,
} from "@/shared/utils/format-number";

import type { Quote } from "../types";

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
          {changePercentage !== undefined
            ? formatPercent(changePercentage, { showSign: true })
            : "-"}
        </span>
      </div>

      <div className="flex flex-col">
        <span className={`text-xl font-bold ${textColorStyles}`}>
          {formatCurrency(currentPrice)}
        </span>
        {changeAmount !== undefined && (
          <span className={`text-sm font-bold ${textColorStyles}`}>
            ({formatCurrency(changeAmount, { showSign: true })})
          </span>
        )}
      </div>
    </Tile>
  );
};
