import { MainHeader } from "@/widgets/shared/main-header";
import { MainNavigation } from "@/widgets/shared/main-navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen min-h-screen">
      <MainNavigation />

      <main className="flex-1 overflow-auto w-full min-h-0 mx-auto">
        <MainHeader />
        <div className="max-w-6xl mx-auto p-5">{children}</div>
      </main>
    </div>
  );
}
