"use client";

import dayjs from "dayjs";
import { useParams } from "next/navigation";

import {
  type RecommendationTrend,
  useRecommendationTrendsQuery,
} from "@/entities/recommendation-trend";
import { RecommendationTrendChart } from "@/entities/recommendation-trend/ui";
import {
  EmptyContent,
  ErrorMessage,
  LoadingSpinner,
} from "@/shared/components/fallback";
import { Section } from "@/shared/components/layout";

function getLatestPeriod(data: RecommendationTrend[]): string | undefined {
  if (!data.length) return undefined;
  return data.reduce((latest, item) => {
    if (!latest) return item.period;
    return item.period > latest ? item.period : latest;
  }, "");
}

function formatPeriod(period: string): string {
  const date = dayjs(period);
  return date.isValid() ? `${date.format("MMM YYYY")} (${period})` : period;
}

export function RecommendationTrendSection() {
  const { symbol } = useParams();
  const normalizedSymbol = String(symbol ?? "");

  const { data, isLoading, error, refetch } = useRecommendationTrendsQuery({
    symbol: normalizedSymbol,
  });

  const trends = data ?? [];
  const latestPeriod = getLatestPeriod(trends);

  return (
    <Section
      title="Recommendation Trends"
      className="gap-12"
      actions={
        latestPeriod ? (
          <span className="text-sm text-text-secondary">
            Latest period: {formatPeriod(latestPeriod)}
          </span>
        ) : null
      }
    >
      {isLoading && (
        <div className="w-full py-6 rounded-lg">
          <LoadingSpinner message="Loading recommendation trends..." />
        </div>
      )}

      {error && (
        <div className="w-full py-6 rounded-lg">
          <ErrorMessage message={error.message} retry={refetch} />
        </div>
      )}

      {!isLoading && !error && trends.length === 0 && (
        <div className="w-full py-6 rounded-lg">
          <EmptyContent message="No recommendation trends found." size="lg" />
        </div>
      )}

      {!isLoading && !error && trends.length > 0 && (
        <RecommendationTrendChart data={trends} />
      )}
    </Section>
  );
}
