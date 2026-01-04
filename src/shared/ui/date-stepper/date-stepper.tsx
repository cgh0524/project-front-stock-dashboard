import dayjs from "dayjs";

export type DateStepperProps = {
  date: string;
  min?: string;
  max?: string;
  onChangeDate: (date: string) => void;
};

export function DateStepper({
  date,
  min,
  max,
  onChangeDate,
}: DateStepperProps) {
  const currentDate = dayjs(date);

  const isMin = currentDate.isSame(min, "day");
  const isMax = currentDate.isSame(max, "day");

  const onClickPreviousDay = () => {
    if (isMin) return;

    const previousDay = currentDate.subtract(1, "day").format("YYYY-MM-DD");
    onChangeDate(previousDay);
  };

  const onClickNextDay = () => {
    if (isMax) return;

    const nextDay = currentDate.add(1, "day").format("YYYY-MM-DD");
    onChangeDate(nextDay);
  };

  return (
    <div className="flex items-center" role="group" aria-label="Select date">
      <button
        disabled={isMin}
        className="w-5 h-8 disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
        aria-label="Previous day"
        onClick={onClickPreviousDay}
      >
        ◀
      </button>

      <time
        className="min-w-24 border-border-default border-solid border px-2 py-1 rounded-md font outline-none focus:border-border-strong text-sm md:text-base"
        dateTime={date}
      >
        {date}
      </time>

      <button
        disabled={isMax}
        className="w-5 h-8 disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
        aria-label="Next day"
        onClick={onClickNextDay}
      >
        ▶
      </button>
    </div>
  );
}
