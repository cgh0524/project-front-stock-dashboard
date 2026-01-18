"use client";

import { useState } from "react";

import { MarketLeadersTabs } from "@/entities/market-leader";
import type { MarketLeadersOptionKey } from "@/shared/lib/types";
import {
  MARKET_LEADERS_OPTION_KEY,
  MARKET_LEADERS_OPTION_LABEL,
  type Option,
} from "@/shared/lib/types";
import { createOption } from "@/shared/lib/utils/create-options";

import { MarketBiggestGainerList } from "./market-biggest-gainer-list";
import { MarketBiggestLoserList } from "./market-biggest-loser-list";
import { MarketMostActiveList } from "./market-most-active-list";

export const MarketLeaders = () => {
  const [selectedTab, setSelectedTab] = useState<Option>(() =>
    createOption(
      MARKET_LEADERS_OPTION_KEY.BIGGEST_GAINERS,
      MARKET_LEADERS_OPTION_LABEL.BIGGEST_GAINERS
    )
  );

  const MARKET_LEADERS_LIST_MAP: Record<
    MarketLeadersOptionKey,
    React.ReactNode
  > = {
    [MARKET_LEADERS_OPTION_KEY.BIGGEST_GAINERS]: <MarketBiggestGainerList />,
    [MARKET_LEADERS_OPTION_KEY.BIGGEST_LOSERS]: <MarketBiggestLoserList />,
    [MARKET_LEADERS_OPTION_KEY.MOST_ACTIVES]: <MarketMostActiveList />,
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Market Leaders</h2>
      <MarketLeadersTabs
        selectedTab={selectedTab}
        onChangeTab={setSelectedTab}
      />

      {MARKET_LEADERS_LIST_MAP[selectedTab.value as MarketLeadersOptionKey]}
    </div>
  );
};
