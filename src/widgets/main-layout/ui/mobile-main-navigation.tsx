import { MainNavigation } from "./main-navigation";

type MobileMainNavigationProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMainNavigation({
  isOpen,
  onClose,
}: MobileMainNavigationProps) {
  return (
    <>
      {/* 모바일 네비게이션이 열렸을 때 배경 클릭으로 닫기 위한 오버레이 */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* 모바일 전용 슬라이드 네비게이션 드로어 */}
      <aside
        aria-hidden={!isOpen}
        className={`fixed top-0 left-0 z-40 h-full transition-transform duration-200 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <MainNavigation onNavigate={onClose} />
      </aside>
    </>
  );
}
