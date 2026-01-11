import type { Option } from "@/shared/lib/types";
import { MARKET_LEADERS_TABS } from "@/shared/lib/types";
import { createOptions } from "@/shared/lib/utils/create-options";
import { Tabs } from "@/shared/ui/tabs";

export type MarketLeadersTabsProps = {
  selectedTab: Option;
  onChangeTab: (tab: Option) => void;
};

export function MarketLeadersTabs({
  selectedTab,
  onChangeTab,
}: MarketLeadersTabsProps) {
  const MARKET_LEADERS_TABS_OPTIONS = createOptions(MARKET_LEADERS_TABS);

  return (
    <Tabs
      tabs={MARKET_LEADERS_TABS_OPTIONS}
      selectedTab={selectedTab}
      onChangeTab={onChangeTab}
    />
  );
}
