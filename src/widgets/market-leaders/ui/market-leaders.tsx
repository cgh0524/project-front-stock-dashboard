"use client";

import { useState } from "react";

import { MarketLeadersTabs } from "@/entities/market-leader";
import type { Option } from "@/shared/lib/types";
import { MARKET_LEADERS_TABS } from "@/shared/lib/types";
import { createOption } from "@/shared/lib/utils/create-options";

import { MarketLeadersList } from "./market-leaders-list";

export const MarketLeaders = () => {
  const [selectedTab, setSelectedTab] = useState<Option>(() =>
    createOption(MARKET_LEADERS_TABS.BIGGEST_GAINERS)
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Market Leaders</h2>
      <MarketLeadersTabs
        selectedTab={selectedTab}
        onChangeTab={setSelectedTab}
      />

      <MarketLeadersList selectedTab={selectedTab} />
    </div>
  );
};
