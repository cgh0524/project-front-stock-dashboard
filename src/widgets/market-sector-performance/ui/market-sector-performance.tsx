"use client";

import dayjs from "dayjs";
import { useState } from "react";

import { MarketExchangeSelect } from "@/entities/market-performance";
import { useGetMarketSectorPerformanceQuery } from "@/entities/market-performance/lib";
import type { Option } from "@/shared/lib/types";
import { MARKET_EXCHANGE } from "@/shared/lib/types";
import { createSelectOption } from "@/shared/lib/utils/createSelectOption";
import { DateStepper } from "@/shared/ui/date-stepper";

export function MarketSectorPerformance() {
  const TODAY = dayjs().format("YYYY-MM-DD");
  const ONCE_A_WEEK_AGO = dayjs().subtract(7, "day").format("YYYY-MM-DD");

  const [exchange, setExchange] = useState<Option>(
    createSelectOption(MARKET_EXCHANGE.NASDAQ)
  );

  /** 선택된 날짜, YYYY-MM-DD 형식 */
  const [date, setDate] = useState<string>(TODAY);

  const { data } = useGetMarketSectorPerformanceQuery({
    date: date,
    exchange: exchange.value,
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Market Sector Performance</h2>

        <DateStepper
          date={date}
          min={ONCE_A_WEEK_AGO}
          max={TODAY}
          onChangeDate={setDate}
        />
      </div>

      <MarketExchangeSelect
        selectedOption={exchange}
        onChangeOption={setExchange}
      />
    </div>
  );
}
