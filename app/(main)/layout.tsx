import { Page } from "@/shared/ui/layout";
import { MainHeader } from "@/widgets/main-header";
import { MainNavigation } from "@/widgets/main-navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <MainHeader />

      <div className="flex min-h-0 flex-1 pt-[56px]">
        <MainNavigation />
        <main className="flex justify-center mx-auto min-h-0 flex-1 p-3 overflow-auto">
          <Page>{children}</Page>
        </main>
      </div>
    </div>
  );
}
