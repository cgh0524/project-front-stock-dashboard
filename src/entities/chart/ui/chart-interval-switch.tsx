import type { Option } from "@/shared/types";
import { Tabs } from "@/shared/ui/tabs";
import { createOption } from "@/shared/utils/create-options";

import type { ChartInterval } from "../model";
import { CHART_DEFAULT_INTERVAL_OPTIONS, CHART_INTERVAL_LABELS } from "../model";

export type ChartIntervalSwitchProps = {
  value: ChartInterval;
  onChange: (interval: ChartInterval) => void;
  intervals?: ChartInterval[];
};

export function ChartIntervalSwitch({
  value,
  onChange,
  intervals = CHART_DEFAULT_INTERVAL_OPTIONS,
}: ChartIntervalSwitchProps) {
  const options: Option[] = intervals.map((interval) =>
    createOption(interval, CHART_INTERVAL_LABELS[interval])
  );

  const selectedTab =
    options.find((option) => option.value === value) ?? options[0];

  return (
    <Tabs
      tabs={options}
      selectedTab={selectedTab}
      onChangeTab={(nextTab) => {
        const nextInterval = intervals.find(
          (interval) => interval === nextTab.value
        );

        if (!nextInterval) return;
        onChange(nextInterval);
      }}
    />
  );
}
