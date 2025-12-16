import { act, renderHook } from "@testing-library/react";

import { useDebouncedValue } from "./useDebouncedValue";

describe("useDebouncedValue", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("초기값은 입력값과 동일해야 한다.", () => {
    const { result } = renderHook(() => useDebouncedValue("initial"));
    expect(result.current).toBe("initial");
  });

  it("입력값이 변경되더라도 delay 이전에는 디바운스된 값이 변경되지 않아야 한다.", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 300),
      { initialProps: { value: "initial" } }
    );

    rerender({ value: "new value" });
    expect(result.current).toBe("initial");
  });

  it("delay 동안 입력값이 변경되지 않으면 delay 이후 최신 값으로 변경된다", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 300),
      { initialProps: { value: "initial" } }
    );

    rerender({ value: "new value" });
    expect(result.current).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe("new value");
  });

  it("입력값이 연속으로 변경되면 마지막 입력값만 반영된다", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 300),
      { initialProps: { value: "a" } }
    );

    rerender({ value: "b" });
    rerender({ value: "c" });
    rerender({ value: "d" });

    expect(result.current).toBe("a");

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe("d");
  });

  it("delay 값이 변경되면 새 delay 기준으로 동작한다", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      { initialProps: { value: "initial", delay: 300 } }
    );

    rerender({ value: "new value", delay: 500 });

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe("new value");
  });
});
