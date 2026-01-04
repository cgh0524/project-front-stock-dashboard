"use client";

import dayjs from "dayjs";
import { useState } from "react";

import { MarketExchangeSelect } from "@/entities/market-performance";
import { useGetMarketSectorPerformanceQuery } from "@/entities/market-performance/lib";
import type { Option } from "@/shared/lib/types";
import { MARKET_EXCHANGE } from "@/shared/lib/types";
import { createSelectOption } from "@/shared/lib/utils/createSelectOption";

export function MarketSectorPerformance() {
  const TODAY = dayjs().subtract(2, "day").format("YYYY-MM-DD");

  const [exchange, setExchange] = useState<Option>(
    createSelectOption(MARKET_EXCHANGE.NASDAQ)
  );

  const { data } = useGetMarketSectorPerformanceQuery({
    date: TODAY,
    exchange: exchange.value,
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold">Market Sector Performance</h2>
      <MarketExchangeSelect
        selectedOption={exchange}
        onChangeOption={setExchange}
      />
    </div>
  );
}
