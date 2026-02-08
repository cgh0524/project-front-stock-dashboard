"use client";

import { MARKET_EXCHANGE, type Option } from "@/shared/types";
import { Select } from "@/shared/ui/select";
import { createOptions } from "@/shared/utils/create-options";

export type MarketExchangeSelectProps = {
  selectedOption: Option;
  onChangeOption: (option: Option) => void;
};

const MARKET_EXCHANGE_OPTIONS = createOptions(MARKET_EXCHANGE);

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
