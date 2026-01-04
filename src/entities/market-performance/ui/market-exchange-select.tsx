"use client";

import { MARKET_EXCHANGE, type Option } from "@/shared/lib/types";
import { Select } from "@/shared/ui/select";

export type MarketExchangeSelectProps = {
  selectedOption: Option;
  onChangeOption: (option: Option) => void;
};

const MARKET_EXCHANGE_OPTIONS = [
  { label: MARKET_EXCHANGE.NASDAQ, value: MARKET_EXCHANGE.NASDAQ },
  { label: MARKET_EXCHANGE.NYSE, value: MARKET_EXCHANGE.NYSE },
  { label: MARKET_EXCHANGE.AMEX, value: MARKET_EXCHANGE.AMEX },
];

export function MarketExchangeSelect({
  selectedOption,
  onChangeOption,
}: MarketExchangeSelectProps) {
  return (
    <Select
      options={MARKET_EXCHANGE_OPTIONS}
      selectedOption={selectedOption}
      onChange={onChangeOption}
    />
  );
}
