import Link from "next/link";

import type { MarketLeaderItem as MarketLeaderItemEntity } from "@/entities/market-leader";

import { MarketLeaderItem } from "./market-leader-item";

type MarketLeaderListProps = {
  data: MarketLeaderItemEntity[];
};

export const MarketLeaderList = ({ data }: MarketLeaderListProps) => {
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
            <Link href={`/stock-dashboard/${item.symbol}?name=${item.name}`} title={item.name}>
              <MarketLeaderItem rank={index + 1} data={item} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
