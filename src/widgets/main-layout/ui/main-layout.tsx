"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useBodyScrollLock } from "@/shared/hooks/use-body-scroll-lock";

import { MainHeader } from "./main-header";
import { MainNavigation } from "./main-navigation";
import { MobileMainNavigation } from "./mobile-main-navigation";

export function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  // 모바일 네비게이션(드로어) 오픈 시 body 스크롤 잠금
  useBodyScrollLock(isNavigationOpen);

  // 라우트가 변경되면 모바일 네비게이션을 자동으로 닫음
  useEffect(() => {
    setIsNavigationOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen min-h-screen">
      {/* 데스크톱 전용 사이드 내비게이션 */}
      <aside className="hidden md:block">
        <MainNavigation />
      </aside>

      <MobileMainNavigation
        isOpen={isNavigationOpen}
        onClose={() => setIsNavigationOpen(false)}
      />

      {/* 페이지 본문 스크롤 영역: 헤더 + 컨텐츠 */}
      <main className="flex-1 overflow-auto overscroll-none w-full min-h-0 mx-auto">
        <MainHeader onOpenNavigation={() => setIsNavigationOpen(true)} />
        <div className="max-w-6xl mx-auto p-5">{children}</div>
      </main>
    </div>
  );
}
