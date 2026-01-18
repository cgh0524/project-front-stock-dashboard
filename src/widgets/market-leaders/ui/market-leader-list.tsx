import Link from "next/link";

import type { MarketLeaderItem as MarketLeaderItemEntity } from "@/entities/market-leader";
import { ErrorMessage, LoadingSpinner } from "@/shared/ui/fallback";

import { MarketLeaderItem } from "./market-leader-item";

type MarketLeaderListProps = {
  data: MarketLeaderItemEntity[];
  isLoading?: boolean;
  isError?: boolean;
  loadingMessage?: string;
  errorMessage?: string;
  onRetry?: () => void;
};

export const MarketLeaderList = ({
  data,
  isLoading,
  isError,
  loadingMessage = "Loading market leaders...",
  errorMessage = "Failed to load market leaders.",
  onRetry,
}: MarketLeaderListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-[500px] py-6 bg-surface-default rounded-md">
        <LoadingSpinner message={loadingMessage} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full min-h-44 py-6 bg-surface-default rounded-md">
        <ErrorMessage message={errorMessage} retry={onRetry} />
      </div>
    );
  }

  return (
    <div className="max-w-full">
      {/* Table Header */}
      <div
        className="grid
        grid-cols-[15%_1fr_20%_20%]
        items-center
        p-2
        bg-surface-alt
        "
      >
        <span className="text-base font-bold">Rank</span>
        <span className="text-base font-bold">Symbol</span>
        <span className="text-base font-bold text-center">Current Price</span>
        <span className="text-base font-bold text-right">
          Change Percentage
        </span>
      </div>

      {/* Table Body */}
      <ul className="flex flex-col py-2 px-2 bg-surface-default rounded-md max-h-[500px] overflow-y-auto">
        {data.map((item: MarketLeaderItemEntity, index: number) => (
          <li key={item.symbol}>
            <Link href={`/stock-dashboard/${item.symbol}`} title={item.name}>
              <MarketLeaderItem rank={index + 1} data={item} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
