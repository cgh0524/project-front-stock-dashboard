import type { Option } from "@/shared/types";

import { Tab } from "./tab";

export type TabSelectProps = {
  tabs: Option[];
  selectedTab: Option;
  onChangeTab: (tab: Option) => void;
};

export const Tabs = ({ tabs, selectedTab, onChangeTab }: TabSelectProps) => {
  return (
    <div className="flex gap-1 p-1 bg-surface-default rounded-md">
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          option={tab}
          selected={selectedTab.value === tab.value}
          onClick={onChangeTab}
        />
      ))}
    </div>
  );
};
