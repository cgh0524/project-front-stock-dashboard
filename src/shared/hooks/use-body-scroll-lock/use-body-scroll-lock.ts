import { useEffect } from "react";

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const { style } = document.body;
    const previousOverflow = style.overflow;

    // 모바일 드로어/시트가 열린 동안 배경(body) 스크롤을 잠근다.
    // 메뉴 레이어 뒤쪽으로 스크롤이 전파되는 현상을 방지하기 위함.
    if (locked) {
      style.overflow = "hidden";
    } else {
      style.removeProperty("overflow");
    }

    // 정리 시점에 이전 overflow 값을 복원해
    // 다른 로직의 body overflow 설정을 덮어쓰지 않도록 한다.
    return () => {
      if (previousOverflow) {
        style.overflow = previousOverflow;
        return;
      }

      style.removeProperty("overflow");
    };
  }, [locked]);
}
