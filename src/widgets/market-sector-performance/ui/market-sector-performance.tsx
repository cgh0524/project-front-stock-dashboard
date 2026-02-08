"use client";

import dayjs from "dayjs";
import { useState } from "react";

import { MarketExchangeSelect } from "@/entities/market-performance";
import type { Option } from "@/shared/types";
import { MARKET_EXCHANGE } from "@/shared/types";
import { DateStepper } from "@/shared/ui/date-stepper";
import { Section } from "@/shared/ui/layout";
import { createOption } from "@/shared/utils/create-options";

import { MarketSectorPerformanceListContainer } from "./market-sector-performance-list-container";

export function MarketSectorPerformance() {
  const TODAY = dayjs().format("YYYY-MM-DD");
  const ONCE_A_WEEK_AGO = dayjs().subtract(7, "day").format("YYYY-MM-DD");

  const [exchange, setExchange] = useState<Option>(() =>
    createOption(MARKET_EXCHANGE.NASDAQ)
  );

  /** 선택된 날짜, YYYY-MM-DD 형식 */
  const [date, setDate] = useState<string>(TODAY);

  return (
    <Section
      title="Market Sector Performance"
      actions={
        <DateStepper
          date={date}
          min={ONCE_A_WEEK_AGO}
          max={TODAY}
          onChangeDate={setDate}
        />
      }
    >

      <MarketExchangeSelect
        selectedOption={exchange}
        onChangeOption={setExchange}
      />

      <MarketSectorPerformanceListContainer
        date={date}
        exchange={exchange.value}
      />
    </Section>
  );
}
