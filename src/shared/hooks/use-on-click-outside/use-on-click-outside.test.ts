import { fireEvent, renderHook } from "@testing-library/react";

import { useOnClickOutside } from "./use-on-click-outside";

describe("useOnClickOutside", () => {
  it("외부 영역을 클릭하면 콜백이 호출된다", () => {
    const onClickOutside = jest.fn();
    const container = document.createElement("div");
    const outside = document.createElement("button");
    document.body.append(container, outside);

    const ref = { current: container };

    renderHook(() =>
      useOnClickOutside({
        ref,
        onClickOutside,
      })
    );

    fireEvent.pointerDown(outside);

    expect(onClickOutside).toHaveBeenCalledTimes(1);

    container.remove();
    outside.remove();
  });

  it("내부 영역을 클릭하면 콜백이 호출되지 않는다", () => {
    const onClickOutside = jest.fn();
    const container = document.createElement("div");
    document.body.append(container);

    const ref = { current: container };

    renderHook(() =>
      useOnClickOutside({
        ref,
        onClickOutside,
      })
    );

    fireEvent.pointerDown(container);

    expect(onClickOutside).not.toHaveBeenCalled();

    container.remove();
  });

  it("enabled가 false이면 외부 클릭에도 콜백이 호출되지 않는다", () => {
    const onClickOutside = jest.fn();
    const container = document.createElement("div");
    const outside = document.createElement("button");
    document.body.append(container, outside);

    const ref = { current: container };

    renderHook(() =>
      useOnClickOutside({
        ref,
        onClickOutside,
        enabled: false,
      })
    );

    fireEvent.pointerDown(outside);

    expect(onClickOutside).not.toHaveBeenCalled();

    container.remove();
    outside.remove();
  });

  it("언마운트 이후에는 콜백이 호출되지 않는다", () => {
    const onClickOutside = jest.fn();
    const container = document.createElement("div");
    const outside = document.createElement("button");
    document.body.append(container, outside);

    const ref = { current: container };

    const { unmount } = renderHook(() =>
      useOnClickOutside({
        ref,
        onClickOutside,
      })
    );

    unmount();
    fireEvent.pointerDown(outside);

    expect(onClickOutside).not.toHaveBeenCalled();

    container.remove();
    outside.remove();
  });
});
