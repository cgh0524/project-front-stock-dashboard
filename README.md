# Stock Watch

여러 금융 데이터 API를 통합해 주요 시장 지표, 섹터 성과, 종목 상세 데이터를 시각화하는 주식 대시보드 프로젝트다.

- 핵심 키워드: `Next.js App Router`, `FSD`, `BFF`, `React Query`, `Zod`
- 데이터 특성: 오픈 API Rate Limit 제약으로 실시간이 아닌 지연 데이터(약 10~15분) 기반

  <br />

## 배포

- URL: https://stock-watch-v1.vercel.app/stock-dashboard
- Base Path: `/stock-dashboard`

  <br />

## 목차

- [기술 스택](#기술-스택)
- [핵심 기능](#핵심-기능)
- [페이지/기능 맵](#페이지기능-맵)
- [아키텍처](#아키텍처)
- [Metadata 운영](#metadata-운영)
- [데이터 흐름 및 캐시 전략](#데이터-흐름-및-캐시-전략)
- [주요 설계 결정](#주요-설계-결정)
- [실행 방법](#실행-방법)
- [환경변수](#환경변수)
- [회고](#회고)

  <br />

## 기술 스택

### Framework

- Next.js `15.5.12`

### Language

- TypeScript `5.9.3`

### Server State

- React Query `v5`

### Styling

- Tailwind CSS `v4`

### Validation

- Zod `v4`

### Chart

- lightweight-charts `v5`

### API / Data Provider

- Finnhub
- Alphavantage
- Financial Modeling Prep (FMP)
- Yahoo Finance2 (SDK)

  <br />

## 핵심 기능

- 주요 시장 지표 조회/시각화 (`QQQ`, `SPY`, `DIA`, `GLD`)
- 섹터 성과 조회 및 비교
- Market Leaders 조회 (상승/하락/거래량)
- 종목 상세 페이지
  - 시세 정보
  - 캔들 차트(기간/인터벌)
  - 핵심 재무 지표
  - 애널리스트 매수 의견
- 뉴스 카테고리 필터 + 무한 스크롤
- 심볼 검색 자동완성

  <br />

## 페이지/기능 맵

아래 경로는 basePath(`/stock-dashboard`)를 제외한 내부 라우트 기준이다.

- `/` : 메인 대시보드
  - Key Market Indices
  - Market Sector Performance
  - Market Leaders
- `/news` : 카테고리별 뉴스 피드 + Infinite Scroll
- `/stock-dashboard/[symbol]` : 종목 상세

  - Symbol Quote / Stock Chart / Stock Metric / Recommendation Trend

    <br />

## 아키텍처

### 1) Client (FSD)

![Client FSD Flow](./docs/client-fsd-flow.png)

Layer는 의존성 방향을 정의하는 책임 경계다.

- `app`: 라우팅, 레이아웃, 전역 Provider/metadata 구성 책임
- `widgets`: 페이지를 구성하는 화면 블록 조합 책임
- `features`: 사용자 상호작용 중심 기능 책임
- `entities`: 도메인 모델/조회/표현 책임
- `shared`: 공통 UI, 유틸, 설정, 타입 제공 책임

Slice는 도메인/페이지 맥락 단위로 코드를 묶어 변경 영향 범위를 지역화하는 책임 단위다.
Layer의 `app, shared`의 경우, 구체적인 제약은 없으며 자유롭게 구성할 수 있다.

Segments는 Slice 내부 역할 분리를 위한 구조이며, 프로젝트 성격에 맞게 다음 구조를 사용했다.

- `api`: 데이터 조회 함수
- `constants`: 쿼리 키, 상수
- `hooks`: React Query 훅/뷰모델 훅
- `types`: 도메인 타입
- `ui`: 표현 컴포넌트
- `utils`: 순수 유틸리티

### 2) Server (BFF)

클라이언트에서 외부 금융 API를 직접 호출하지 않고, Next.js Route Handler를 BFF로 사용했다.  
또한 서버 컴포넌트 전용 데이터 패칭에서는 `server-only` API가 Service를 직접 호출한다.

![Server BFF Flow](./docs/server-bff-flow.png)

- DIP 적용: Service는 Provider 구현체가 아닌 인터페이스에 의존
- Adapter + Zod: Provider에서 `parseOrFail`로 외부 DTO 검증 후 도메인 모델로 정규화
- 에러 정규화: `normalizeError`로 `ApiError` 표준 포맷 매핑, Route Handler는 `ok`/`fail`만 반환
- 인증 세팅: `provider.config.ts`에서 환경변수 로드, `setAuthorization`에서 Provider별 인증 전략 적용
- SSR 경로: Server Page `prefetchQuery` -> `dehydrate` -> `HydrationBoundary`로 초기 캐시 전달

  <br />

## Metadata 운영

모든 메타데이터는 `src/app/metadata`에서 관리한다.

- `constant.ts`: 앱명, 설명, 페이지 이름 상수(`METADATA_PAGE_NAME`)
- `root-metadata.ts`: 루트 레이아웃 공통 메타(`getRootMetadata`)
- `page-metadata.ts`: 페이지 메타 조회 유틸(`getPageMetaData`)

호출 규칙:

- 페이지(`page.tsx`): `getPageMetaData(METADATA_PAGE_NAME.XXX)`
- 루트 레이아웃(`app/layout.tsx`): `getRootMetadata({ canonicalPath })`
- 문자열 리터럴로 페이지 키를 직접 작성하지 않고 `METADATA_PAGE_NAME` 상수를 사용

예시 코드:

```tsx
// 정적 페이지(page.tsx)
import { getPageMetaData, METADATA_PAGE_NAME } from "@/app";

export const metadata = getPageMetaData(METADATA_PAGE_NAME.STOCK_DASHBOARD);
```

```tsx
// 동적 페이지(page.tsx)
import type { Metadata } from "next";
import { getPageMetaData, METADATA_PAGE_NAME } from "@/app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ symbol: string }>;
}): Promise<Metadata> {
  const { symbol } = await params;
  return getPageMetaData(METADATA_PAGE_NAME.STOCK_DETAIL, symbol);
}
```

<br />

## 데이터 흐름 및 캐시 전략

### 데이터 흐름

1. 서버 컴포넌트 페이지에서 `prefetchQuery/prefetchInfiniteQuery`
2. `HydrationBoundary`로 초기 캐시 전달
3. 클라이언트에서 React Query로 동일 키 재사용
4. BFF 내부 fetch는 `next.revalidate` 기반 캐시 정책 적용

### 캐시 정책 단일 출처

모든 캐시 정책은 `src/shared/config/cache-policy.ts`에서 관리한다.

| 도메인              | staleTime | revalidate          |
| ------------------- | --------- | ------------------- |
| quote               | 1분       | 60초                |
| marketLeader        | 10분      | 10분                |
| marketPerformance   | 10분      | 10분                |
| news                | 5분       | 5분                 |
| stockMetric         | 60분      | 60분                |
| recommendationTrend | 60분      | 60분                |
| symbolSearch        | 2분       | 2분                 |
| stockChart          | 2분       | (fetch 재검증 없음) |

<br />

## 주요 설계 결정

### FSD

FSD는 UI 계층의 책임과 의존성 경계를 명확히 해, 페이지 컴포넌트에 비즈니스 로직과 UI 조합 로직이 과도하게 집중되는 문제를 줄이고 코드 변경 영향도와 중복 구현을 낮추기 위해 도입했다.

- 시도: `ui/lib/model` 관례를 엄격 적용
- 문제: `lib`에 상수/API/hook/util이 혼재되어 책임이 불분명
- 개선: `constants/hooks/utils/api/ui/types`로 분리해 역할 명확화
<br />

- 시도: 폴더 depth를 얕게 유지
- 문제: widget 슬라이스가 늘수록 페이지 맥락 파악이 어려움
- 개선: `widgets/stock-dashboard`, `widgets/stock-dashboard-symbol`, `widgets/news`처럼 페이지 맥락 단위로 구조화
<br />

- 시도: public API(barrel) 규칙 유지
- 문제: IDE 자동 import가 내부 파일 직접 경로를 제안
- 개선: ESLint 룰로 배럴 경로 import를 강제
- 적용: `no-restricted-imports`로 deep import를 제한해 배럴 경로 사용을 강제
<br />

### BFF

오픈 API를 사용하다 보니 하나의 API 서비스로 모든 요구사항을 충족시키기 어려웠고, 데이터 도메인별로 Finnhub / FMP / Yahoo 등 복수 API 서비스를 함께 사용하게 됐다. 이로 인해 아래와 같은 문제가 파생되었고, BFF를 도입하여 해결할 수 있었다.

- 문제: API 서비스마다 응답 및 에러 포맷이 서로 다름
- 결정: Provider Adapter + Zod 검증 + Service 레이어 정규화를 통해 외부 API 응답을 프론트엔드 도메인 모델로 변환
- 결과: 공급자별 응답 구조 인지 없이 일관된 API 응답 사용 가능
<br />

- 문제: 동일 API의 Provider 교체 가능성
- 결정: Service는 구현체가 아닌 Provider 인터페이스에 의존하도록 설계(DIP)
- 결과: Provider 내부 변경과 Provider 교체 모두 Service 경계에서 흡수되어 Adapter 레이어 중심 수정으로 대응 가능  
   프론트엔드 도메인은 외부 API 변화로부터 보호
<br />

- 문제: 외부 API Key 노출 위험
- 결정: 클라이언트 BFF 전용 호출, 외부 API Key 서버 전용 사용
- 결과: API Key 노출 방지 및 외부 API 호출 서버 통제

  <br />

## 실행 방법

```bash
npm install
npm run dev
```

기본 개발 서버는 `http://localhost:3000`이다.  
이 프로젝트는 basePath를 사용하므로 실제 앱 접근 경로는 `http://localhost:3000/stock-dashboard`이다.

### 주요 스크립트

```bash
npm run dev        # 개발 서버
npm run build      # 프로덕션 빌드
npm run start      # 프로덕션 실행
npm run lint       # ESLint
npm run typecheck  # TypeScript 타입 체크
npm run test       # Jest 테스트
```

<br />

## 환경변수

민감값(API Key)은 저장소에 커밋하지 않고, 변수명/용도만 문서화한다.

```bash
FINANCIAL_MODELING_PREP_API_BASE_URL=
FINANCIAL_MODELING_PREP_API_KEY=
FINNHUB_API_BASE_URL=
FINNHUB_API_KEY=
ALPHAVANTAGE_API_BASE_URL=
ALPHAVANTAGE_API_KEY=

NEXT_PUBLIC_APP_NAME=
NEXT_PUBLIC_BASE_PATH=
NEXT_PUBLIC_METADATA_DESCRIPTION=
NEXT_PUBLIC_SITE_URL=
```

<br />

## 회고

### FSD

FSD를 적용하면서 가장 크게 체감한 변화는 컴포넌트 계층의 책임과 추상화 수준이 맞춰졌다는 점이다.  
이전에는 하나의 컴포넌트 안에서 마크업, 화면 조합, 도메인 로직이 섞이는 경우가 많았는데, 적용 후에는 화면 조합 코드와 도메인 코드가 분리되어 변경 단위를 더 작게 가져갈 수 있었다.

특히 페이지에서 하위 컴포넌트를 조합할 때 구조가 평탄해져 변경 시 영향 범위를 파악하기 쉬웠고, 유사 기능을 복사해 붙여넣기하기보다 기존 책임 위치에서 수정/재사용하는 흐름이 자연스러워졌다.  
또한 도메인 컴포넌트와 UI 컴포넌트의 경계가 명확해져 코드 가독성과 탐색성이 좋아졌다.

프로젝트 성격이 정보 표시 중심 대시보드이다 보니, 사용자 액션 오케스트레이션이 큰 기능은 상대적으로 적었고 그만큼 `features` 레이어가 얇게 유지되는 경향도 확인할 수 있었다.

아쉬운 점도 있었다. FSD의 기본 세그먼트(`lib/model/ui`)는 실제 프론트엔드 작업과 1:1로 맞지 않아 `constants/hooks/utils/api/types`처럼 프로젝트에 맞춘 재구성이 필요했다.  
배럴 파일 규칙 역시 자동으로 지켜지지 않아 ESLint 커스텀 룰로 강제해야 했다.

또 레이어를 엄격히 나누다 보니, 실질 로직 없이 UI를 한 번 감싸는 중간 컴포넌트가 늘어나는 경향이 있었다.  
다만 이는 책임 분리와 가독성 향상 사이의 트레이드오프로 보고 있으며, 개인적으로는 유지보수성과 변경 대응 측면에서 얻는 이점이 더 컸다.

### BFF

사이드 프로젝트 기준으로 BFF를 적용해보니, 변경 가능성이 높은 외부 API 의존성으로부터 프론트엔드 도메인을 보호할 수 있었고 클라이언트의 인프라 복잡도도 낮출 수 있었다.

반면 응답/에러 정규화와 스키마 검증을 위한 계층이 추가되면서 API 하나를 붙일 때 필요한 보일러플레이트가 늘어나는 부담이 있었다.

이를 완화하기 위해 레이어별 구현 패턴을 표준화했고, AI이용하여 반복 패턴을 기반으로 신규 API를 비교적 빠르게 추가할 수 있었다.
