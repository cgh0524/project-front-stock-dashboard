"use client";

import { useState } from "react";

import { MarketExchangeSelect } from "@/entities/market-performance";
import { DateStepper } from "@/shared/components/date-stepper";
import { Section } from "@/shared/components/layout";
import type { Option } from "@/shared/types";
import { MARKET_EXCHANGE } from "@/shared/types";
import { createOption } from "@/shared/utils/create-options";

import { MarketSectorPerformanceListContainer } from "./market-sector-performance-list-container";

type MarketSectorPerformanceProps = {
  today: string;
  minDate: string;
};

export function MarketSectorPerformance({
  today,
  minDate,
}: MarketSectorPerformanceProps) {

  const [exchange, setExchange] = useState<Option>(() =>
    createOption(MARKET_EXCHANGE.NASDAQ)
  );

  /** 선택된 날짜, YYYY-MM-DD 형식 */
  const [date, setDate] = useState<string>(today);

  return (
    <Section
      title="Market Sector Performance"
      actions={
        <DateStepper
          date={date}
          min={minDate}
          max={today}
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
