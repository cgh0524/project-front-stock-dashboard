import { Page } from "@/shared/ui/layout";
import { MainHeader } from "@/widgets/main-header";
import { MainNavigation } from "@/widgets/main-navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <MainNavigation />

      <div className="flex-1 flex flex-col">
        <MainHeader />
        <Page>{children}</Page>
      </div>
    </div>
  );
}
