"use client";

import { useState } from "react";

import type { Option } from "@/shared/lib/types";
import { Select } from "@/shared/ui/select";

const options = [
  { label: "NASDAQ", value: "NASDAQ" },
  { label: "NYSE", value: "NYSE" },
  { label: "AMEX", value: "AMEX" },
];

export function MarketSectorPerformance() {
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);

  const onChangeOption = (option: Option) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold">Market Sector Performance</h2>
      <Select
        options={options}
        selectedOption={options[0]}
        onChange={onChangeOption}
      />
    </div>
  );
}
