import type { Option } from "@/shared/types";
import {
  MARKET_LEADERS_OPTION_KEY,
  MARKET_LEADERS_OPTION_LABEL,
} from "@/shared/types";
import { Tabs } from "@/shared/ui/tabs";
import { createOptions } from "@/shared/utils/create-options";

export type MarketLeadersTabsProps = {
  selectedTab: Option;
  onChangeTab: (tab: Option) => void;
};

export function MarketLeadersTabs({
  selectedTab,
  onChangeTab,
}: MarketLeadersTabsProps) {
  const MARKET_LEADERS_TABS_OPTIONS = createOptions(
    MARKET_LEADERS_OPTION_KEY,
    MARKET_LEADERS_OPTION_LABEL
  );

  return (
    <Tabs
      tabs={MARKET_LEADERS_TABS_OPTIONS}
      selectedTab={selectedTab}
      onChangeTab={onChangeTab}
    />
  );
}
