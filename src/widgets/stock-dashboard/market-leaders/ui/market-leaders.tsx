"use client";

import { useState } from "react";

import { MarketLeadersTabs } from "@/entities/market-leader";
import { Section } from "@/shared/components/layout";
import type { MarketLeadersOptionKey } from "@/shared/types";
import {
  MARKET_LEADERS_OPTION_KEY,
  MARKET_LEADERS_OPTION_LABEL,
  type Option,
} from "@/shared/types";
import { createOption } from "@/shared/utils/create-options";

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
    <Section title="Market Leaders">
      <MarketLeadersTabs
        selectedTab={selectedTab}
        onChangeTab={setSelectedTab}
      />

      {MARKET_LEADERS_LIST_MAP[selectedTab.value as MarketLeadersOptionKey]}
    </Section>
  );
};
