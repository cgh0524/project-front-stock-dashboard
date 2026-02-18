"use client";

import { useParams } from "next/navigation";

import {
  type StockMetricSummary,
  useGetStockMetricQuery,
} from "@/entities/stock-metric";
import { EmptyContent, ErrorMessage, LoadingSpinner } from "@/shared/ui/fallback";
import { Section, Tile } from "@/shared/ui/layout";
import {
  formatCurrency,
  formatFixed,
  formatPercent,
} from "@/shared/utils/format-number";

type MetricCard = {
  key: keyof StockMetricSummary;
  label: string;
  value: string;
};

const DASH = "-";

function toMetricCards(data: StockMetricSummary): MetricCard[] {
  return [
    {
      key: "week52High",
      label: "52 Week High",
      value: data.week52High !== undefined ? formatCurrency(data.week52High) : DASH,
    },
    {
      key: "week52Low",
      label: "52 Week Low",
      value: data.week52Low !== undefined ? formatCurrency(data.week52Low) : DASH,
    },
    {
      key: "week52LowDate",
      label: "52 Week Low Date",
      value: data.week52LowDate ?? DASH,
    },
    {
      key: "week52PriceReturnDaily",
      label: "52 Week Return",
      value:
        data.week52PriceReturnDaily !== undefined
          ? formatPercent(data.week52PriceReturnDaily)
          : DASH,
    },
    {
      key: "salesPerShare",
      label: "Sales Per Share",
      value:
        data.salesPerShare !== undefined ? formatFixed(data.salesPerShare, 2) : DASH,
    },
    {
      key: "netMargin",
      label: "Net Margin",
      value: data.netMargin !== undefined ? formatPercent(data.netMargin * 100) : DASH,
    },
    {
      key: "currentRatio",
      label: "Current Ratio",
      value:
        data.currentRatio !== undefined ? formatFixed(data.currentRatio, 2) : DASH,
    },
  ];
}

export function StockMetricSection() {
  const { symbol } = useParams();
  const normalizedSymbol = String(symbol ?? "");

  const { data, isLoading, error, refetch } = useGetStockMetricQuery({
    symbol: normalizedSymbol,
  });

  const cards = toMetricCards(data ?? {});


  const hasAnyValue = cards.some((card) => card.value !== DASH);

  return (
    <Section title="Fundamentals">
      {isLoading && (
        <div className="w-full py-6 rounded-lg">
          <LoadingSpinner message="Loading fundamentals..." />
        </div>
      )}

      {error && (
        <div className="w-full py-6 rounded-lg">
          <ErrorMessage message={error.message} retry={refetch} />
        </div>
      )}

      {!isLoading && !error && !data && (
        <div className="w-full py-6 rounded-lg">
          <EmptyContent message="No fundamentals found." size="lg" />
        </div>
      )}

      {!isLoading && !error && !!data && !hasAnyValue && (
        <div className="w-full py-6 rounded-lg">
          <EmptyContent message="No metric values available." size="lg" />
        </div>
      )}

      {!isLoading && !error && hasAnyValue && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {cards.map((card) => (
            <Tile
              key={card.key}
              className="p-4 border border-border-default flex flex-col gap-1 bg-surface-default"
            >
              <span className="text-sm text-text-secondary">{card.label}</span>
              <span className="text-lg font-semibold text-text-primary">
                {card.value}
              </span>
            </Tile>
          ))}
        </div>
      )}
    </Section>
  );
}
