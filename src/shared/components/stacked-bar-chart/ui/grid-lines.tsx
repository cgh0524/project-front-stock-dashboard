type GridLinesProps = {
  ticks: number[];
  yTickCount: number;
};

/** 
 * @description 그리드 라인 컴포넌트
 * @param ticks 그리드 라인 위치
 * @param yTickCount Y축 눈금 개수
 * @returns 그리드 라인 컴포넌트
 */
export function GridLines({ ticks, yTickCount }: GridLinesProps) {
  return (
    <>
      {ticks.map((_, index) => {
        const bottom = `${(index / yTickCount) * 100}%`;
        return (
          <div
            key={`grid-${index}`}
            className="absolute left-0 right-0 border-t border-border-default"
            style={{ bottom }}
          />
        );
      })}
    </>
  );
}
